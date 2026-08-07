// Diagnóstico de configuración. Responde 404 salvo que DEBUG_API esté puesta,
// así que en operación normal es como si no existiera.
//
// Existe porque depurar este despliegue cuesta ~17 minutos por intento (el
// prerender de 312 páginas), y adivinar a ese precio sale caro. Esto contesta
// de una sola llamada las preguntas que si no hay que sacar de los logs:
// qué variables faltan, en qué modo está la clave de Stripe y si los precios
// configurados existen de verdad en ese modo.
//
// NO devuelve ningún secreto: de la clave solo se deduce el modo por su
// prefijo (sk_test / sk_live), nunca el valor. Los price IDs sí se muestran
// enteros porque son identificadores públicos que acaban en el navegador de
// cualquier visitante.
import Stripe from 'stripe'
import { PLANS } from './_plans.js'

const REQUIRED = [
  'FIREBASE_SERVICE_ACCOUNT',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_FAMILY_MONTHLY',
  'STRIPE_PRICE_FAMILY_ANNUAL',
  'STRIPE_PRICE_TEACHER',
]

function keyMode(key) {
  if (!key) return null
  if (key.startsWith('sk_test_') || key.startsWith('rk_test_')) return 'test'
  if (key.startsWith('sk_live_') || key.startsWith('rk_live_')) return 'live'
  return 'desconocido'
}

export default async function handler(req, res) {
  if (!process.env.DEBUG_API) return res.status(404).json({ error: 'not_found' })

  const env = Object.fromEntries(REQUIRED.map(name => [name, Boolean(process.env[name])]))
  const secretKey = process.env.STRIPE_SECRET_KEY
  const out = { env, stripeKeyMode: keyMode(secretKey), plans: {} }

  // Resolver cada precio contra Stripe es lo que distingue de verdad un
  // desajuste de modo: un price de test con una clave de live (o al revés) da
  // "No such price", que es justo el error que el usuario vería como un 500
  // genérico al pulsar el botón de pagar.
  for (const [plan, def] of Object.entries(PLANS)) {
    const priceId = process.env[def.env]
    if (!priceId) { out.plans[plan] = { configured: false, envVar: def.env }; continue }
    if (!secretKey) { out.plans[plan] = { configured: true, priceId, checked: false }; continue }

    try {
      const stripe = new Stripe(secretKey)
      const price = await stripe.prices.retrieve(priceId)
      out.plans[plan] = {
        configured: true,
        priceId,
        exists: true,
        livemode: price.livemode,
        amount: price.unit_amount != null ? price.unit_amount / 100 : null,
        currency: price.currency,
        // Lo que más importa comprobar: que el plan anual sea de verdad anual.
        // Un precio "anual" con intervalo mensual cobraría doce veces al año.
        interval: price.recurring?.interval ?? null,
        intervalCount: price.recurring?.interval_count ?? null,
        active: price.active,
      }
    } catch (err) {
      out.plans[plan] = { configured: true, priceId, exists: false, error: err?.message ?? String(err) }
    }
  }

  return res.status(200).json(out)
}
