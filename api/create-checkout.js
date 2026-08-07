// Arranca el pago de una suscripción y devuelve la URL de Stripe Checkout.
//
// Nunca se da acceso aquí, por muy bien que salga: quien confirma el cobro es
// api/stripe-webhook.js. La vuelta del navegador a success_url es trivial de
// falsificar (basta con escribir la URL a mano), así que esa página solo dice
// "gracias", no desbloquea nada.
import Stripe from 'stripe'
import { db, adminAuth } from './_admin.js'
import { PLANS, priceIdFor } from './_plans.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Origen permitido para las URLs de vuelta. Se valida contra esta lista en vez
// de confiar en la cabecera Origin tal cual: si no, cualquiera podría hacer que
// Stripe devolviese al usuario a un dominio que él controle.
const ALLOWED_ORIGINS = [
  'https://www.tuthor.es',
  'https://tuthor.es',
  'http://localhost:5173',
]

function baseUrl(req) {
  const origin = String(req.headers.origin ?? '')
  if (ALLOWED_ORIGINS.includes(origin)) return origin
  // Los previews de Vercel tienen dominio distinto en cada despliegue, así que
  // no pueden ir en una lista fija.
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return origin
  return ALLOWED_ORIGINS[0]
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })

  const authHeader = String(req.headers.authorization ?? '')
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' })

  let decoded
  try {
    decoded = await adminAuth.verifyIdToken(authHeader.slice(7))
  } catch {
    return res.status(401).json({ error: 'unauthorized' })
  }

  // El hijo comparte uid con el padre: sin esto podría contratar o cambiar la
  // suscripción de la familia.
  if (decoded.childMode === true) return res.status(403).json({ error: 'child_session' })

  const plan = req.body?.plan
  if (!PLANS[plan]) return res.status(400).json({ error: 'unknown_plan' })

  const uid = decoded.uid

  try {
    const userSnap = await db.doc(`users/${uid}`).get()
    const userData = userSnap.exists ? userSnap.data() : {}

    // Si ya fue cliente (renovación, cambio de plan, tarjeta caducada), se
    // reutiliza su customer. Si no, Stripe crea uno nuevo y el webhook lo
    // guarda. Sin esto se acumulan clientes duplicados y el historial de pagos
    // de una misma familia queda repartido entre varios.
    const existingCustomer = userData.stripeCustomerId
    const email = decoded.email && !String(decoded.email).endsWith('@tuthor.app')
      ? decoded.email
      : undefined

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceIdFor(plan), quantity: 1 }],
      ...(existingCustomer ? { customer: existingCustomer } : email ? { customer_email: email } : {}),
      client_reference_id: uid,
      // En el objeto de la sesión (para checkout.session.completed)…
      metadata: { uid, plan },
      // …y en el de la suscripción, que es el que viaja en los eventos
      // customer.subscription.* posteriores. Sin esto, una renovación o una
      // baja meses después llegan sin saber de quién son.
      subscription_data: { metadata: { uid, plan } },
      allow_promotion_codes: true,
      success_url: `${baseUrl(req)}/pago/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl(req)}/precios`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('create-checkout error:', err)
    return res.status(500).json({ error: 'unknown' })
  }
}
