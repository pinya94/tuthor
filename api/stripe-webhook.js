// Webhook de Stripe: confirma un pago y activa la capacidad de profesor.
// Usa Firebase Admin (bypassa firestore.rules por diseño — un webhook es
// server-to-server, no un usuario autenticado con el SDK de cliente).
// Nunca te fíes de la redirección del navegador tras pagar para dar acceso:
// es trivial de falsificar. Esto es lo único que realmente lo confirma.
import Stripe from 'stripe'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

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
      if (session.client_reference_id) {
        await db.doc(`users/${session.client_reference_id}`).set({
          teacherProfile: {
            active: true,
            subscriptionStatus: 'active',
            stripeCustomerId: session.customer,
          },
        }, { merge: true })
      }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const sub = event.data.object
      const snap = await db.collection('users').where('teacherProfile.stripeCustomerId', '==', sub.customer).limit(1).get()
      if (!snap.empty) {
        await snap.docs[0].ref.set({ teacherProfile: { subscriptionStatus: sub.status } }, { merge: true })
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
