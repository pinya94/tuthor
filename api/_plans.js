// Mapa plan → precio de Stripe.
//
// Los price IDs van en variables de entorno, no aquí, por un motivo muy
// concreto: los de modo test y los de modo real son distintos, y la clave
// (STRIPE_SECRET_KEY) también. Si los precios estuvieran en el código y la
// clave en el entorno, sería cuestión de tiempo acabar con una clave de test
// apuntando a un precio real (o al revés) y un "No such price" en producción.
// Atados los dos al mismo entorno, no se pueden desincronizar.
//
// En Vercel → Settings → Environment Variables:
//   STRIPE_PRICE_FAMILY_MONTHLY   plan familiar mensual
//   STRIPE_PRICE_FAMILY_ANNUAL    plan familiar anual
//   STRIPE_PRICE_TEACHER          plan de profesor
//
// `interval` es solo informativo (logs y metadata). Quien manda de verdad es
// la configuración del precio en Stripe: si ahí pone mensual, se cobra
// mensual, diga lo que diga este fichero.
export const PLANS = {
  family_monthly: { env: 'STRIPE_PRICE_FAMILY_MONTHLY', interval: 'month', audience: 'family' },
  family_annual:  { env: 'STRIPE_PRICE_FAMILY_ANNUAL',  interval: 'year',  audience: 'family' },
  teacher:        { env: 'STRIPE_PRICE_TEACHER',        interval: 'month', audience: 'teacher' },
}

// Falla ruidosamente si falta la variable. Un checkout que arranca con un
// precio vacío se lleva al usuario a una pantalla rota de Stripe después de
// haber pulsado "pagar": mejor un 500 aquí y un error en los logs.
export function priceIdFor(plan) {
  const def = PLANS[plan]
  if (!def) throw new Error(`plan desconocido: ${plan}`)
  const priceId = process.env[def.env]
  if (!priceId) throw new Error(`falta la variable de entorno ${def.env}`)
  return priceId
}
