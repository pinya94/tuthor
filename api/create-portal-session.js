// Abre el Customer Portal de Stripe: ahí es donde el usuario cambia de
// tarjeta, ve sus facturas y cancela. Stripe aloja la pantalla entera, así que
// esto no construye ningún flujo de baja propio — solo crea la sesión y
// devuelve la URL.
//
// Existe porque el copy de venta (Landing.jsx, Profesores.jsx) promete
// "cancela cuando quieras desde tu perfil con un solo clic" y hasta ahora eso
// no existía: no había forma de darse de baja sin escribirnos.
import Stripe from 'stripe'
import { getDb, getAdminAuth, baseUrl, fail } from './_admin.js'

function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('falta la variable de entorno STRIPE_SECRET_KEY')
  return new Stripe(key)
}

// Solo rutas propias del sitio: nada de esquema, nada de "//" (que el
// navegador interpreta como protocol-relative a otro host). Si algo no
// encaja, se vuelve al perfil por defecto — nunca a lo que mande el cliente
// tal cual.
function safeReturnPath(raw) {
  const path = String(raw ?? '')
  return path.startsWith('/') && !path.startsWith('//') ? path : '/perfil'
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
    return fail(res, err, 'create-portal-session/init')
  }

  // Mismo motivo que en create-checkout.js: el hijo comparte uid con el padre
  // y sin esto podría entrar a cancelar o cambiar la tarjeta de la familia.
  if (decoded.childMode === true) return res.status(403).json({ error: 'child_session' })

  const uid = decoded.uid

  try {
    const db = await getDb()
    const stripe = stripeClient()
    const userSnap = await db.doc(`users/${uid}`).get()
    const customerId = userSnap.exists ? userSnap.data().stripeCustomerId : null

    // Sin stripeCustomerId no ha pasado nunca por Checkout (cuenta legacyFree,
    // patrocinada por un profesor, o profesor de alta por código promo): no
    // hay nada que gestionar en Stripe para esta cuenta.
    if (!customerId) return res.status(404).json({ error: 'no_customer' })

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl(req)}${safeReturnPath(req.body?.returnPath)}`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return fail(res, err, 'create-portal-session')
  }
}
