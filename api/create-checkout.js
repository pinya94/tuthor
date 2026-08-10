// Arranca el pago de una suscripción y devuelve la URL de Stripe Checkout.
//
// Nunca se da acceso aquí, por muy bien que salga: quien confirma el cobro es
// api/stripe-webhook.js. La vuelta del navegador a success_url es trivial de
// falsificar (basta con escribir la URL a mano), así que esa página solo dice
// "gracias", no desbloquea nada.
import Stripe from 'stripe'
import { getDb, getAdminAuth, baseUrl, fail } from './_admin.js'
import { PLANS, priceIdFor } from './_plans.js'

// Perezoso, igual que Firebase Admin: `new Stripe(undefined)` lanza, y hacerlo
// en el cuerpo del módulo convierte una variable de entorno ausente en un
// FUNCTION_INVOCATION_FAILED opaco en vez de un error que se pueda leer.
function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('falta la variable de entorno STRIPE_SECRET_KEY')
  return new Stripe(key)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })

  const authHeader = String(req.headers.authorization ?? '')
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' })

  let decoded
  try {
    const adminAuth = await getAdminAuth()
    try {
      decoded = await adminAuth.verifyIdToken(authHeader.slice(7))
    } catch {
      return res.status(401).json({ error: 'unauthorized' })
    }
  } catch (err) {
    // Fallo de infraestructura, no del token: no puede confundirse con un 401.
    return fail(res, err, 'create-checkout/init')
  }

  // El hijo comparte uid con el padre: sin esto podría contratar o cambiar la
  // suscripción de la familia.
  if (decoded.childMode === true) return res.status(403).json({ error: 'child_session' })

  const plan = req.body?.plan
  if (!PLANS[plan]) return res.status(400).json({ error: 'unknown_plan' })

  const uid = decoded.uid

  try {
    const db = await getDb()
    const stripe = stripeClient()
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
      // Vuelve a la sección de precios de la landing, no a una página aparte:
      // quien cancela suele querer mirar el otro plan, no empezar de cero.
      cancel_url: `${baseUrl(req)}/#precios`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return fail(res, err, 'create-checkout')
  }
}
