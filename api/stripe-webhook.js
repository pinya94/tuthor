// Webhook de Stripe: confirma un pago y activa el acceso.
// Usa Firebase Admin (bypassa firestore.rules por diseño — un webhook es
// server-to-server, no un usuario autenticado con el SDK de cliente).
// Nunca te fíes de la redirección del navegador tras pagar para dar acceso:
// es trivial de falsificar. Esto es lo único que realmente lo confirma.
//
// Escribe dos cosas distintas según a quién sea el plan:
//   · familiar → users/{uid}.subscription, que es lo que lee hasAccess()
//   · profesor → además teacherProfile.subscriptionStatus, que es lo que lee
//     hasTeacherAccess() para el panel y las clases
// Ambos campos son de solo-Admin en firestore.rules (touchesPaidFields), o el
// propio usuario se los escribiría desde la consola del navegador.
import Stripe from 'stripe'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { PLANS } from './_plans.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

if (!getApps().length) {
  initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) })
}
const db = getFirestore()

// Necesitamos el body crudo para verificar la firma — si Vercel lo parsea a
// JSON antes, la verificación falla siempre (la firma se calcula sobre los
// bytes exactos recibidos, no sobre una re-serialización).
export const config = { api: { bodyParser: false } }

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  return Buffer.concat(chunks)
}

// De quién es este evento. El uid viaja en la metadata que pone
// create-checkout.js; la búsqueda por customer es el plan B para las
// suscripciones creadas antes de que existiera esa metadata (el Payment Link
// de profesor original).
async function findUserRef({ uid, customerId }) {
  if (uid) return db.doc(`users/${uid}`)
  if (!customerId) return null

  for (const field of ['stripeCustomerId', 'teacherProfile.stripeCustomerId']) {
    const snap = await db.collection('users').where(field, '==', customerId).limit(1).get()
    if (!snap.empty) return snap.docs[0].ref
  }
  return null
}

// Un timestamp de Stripe (segundos) a Date. Devuelve null si no viene, para no
// escribir un Date(NaN) en Firestore.
function toDate(seconds) {
  return typeof seconds === 'number' ? new Date(seconds * 1000) : null
}

async function applySubscription(ref, { plan, status, customerId, sub }) {
  const audience = PLANS[plan]?.audience ?? 'teacher' // sin metadata = flujo antiguo de profesor

  const payload = {
    stripeCustomerId: customerId,
    subscription: {
      status,
      plan: plan ?? null,
      ...(sub ? {
        priceId: sub.items?.data?.[0]?.price?.id ?? null,
        currentPeriodEnd: toDate(sub.current_period_end),
        cancelAtPeriodEnd: sub.cancel_at_period_end === true,
      } : {}),
    },
  }

  // El profesor necesita además el campo que mira hasTeacherAccess(). No se
  // toca `active`: eso lo pone el propio profesor al rellenar centro y ciclo,
  // y sobreescribirlo aquí borraría su alta.
  if (audience === 'teacher') {
    payload.teacherProfile = { active: true, subscriptionStatus: status, stripeCustomerId: customerId }
  }

  await ref.set(payload, { merge: true })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  let event
  try {
    const buf = await buffer(req)
    event = stripe.webhooks.constructEvent(buf, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const uid = session.metadata?.uid ?? session.client_reference_id
      const ref = await findUserRef({ uid, customerId: session.customer })

      if (ref) {
        // La sesión no trae el objeto de suscripción entero, solo su id: hay
        // que pedirlo para saber cuándo renueva y a qué precio.
        let sub = null
        if (session.subscription) {
          sub = await stripe.subscriptions.retrieve(session.subscription).catch(() => null)
        }
        await applySubscription(ref, {
          plan: session.metadata?.plan,
          status: sub?.status ?? 'active',
          customerId: session.customer,
          sub,
        })
      }
    }

    // created entra también: si un pago queda pendiente (SEPA, transferencia),
    // checkout.session.completed llega con la suscripción aún incompleta y es
    // este evento el que luego la pone en activa.
    if (['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'].includes(event.type)) {
      const sub = event.data.object
      const ref = await findUserRef({ uid: sub.metadata?.uid, customerId: sub.customer })
      if (ref) {
        await applySubscription(ref, {
          plan: sub.metadata?.plan,
          // En el evento de borrado Stripe manda status 'canceled', que es lo
          // que queremos guardar: hasAccess() lo rechaza.
          status: sub.status,
          customerId: sub.customer,
          sub,
        })
      }
    }
  } catch (err) {
    // Un fallo aquí no debe hacer que Stripe reintente indefinidamente con
    // el mismo error — lo registramos y respondemos 200 igualmente. Los
    // eventos quedan visibles en el Dashboard de Stripe para reintento manual.
    console.error('stripe-webhook error:', err)
  }

  res.status(200).json({ received: true })
}
