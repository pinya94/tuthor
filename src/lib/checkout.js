// Lado cliente del pago. Pide a /api/create-checkout una sesión de Stripe y
// manda al usuario allí.
//
// El acceso NO se concede al volver: la vuelta a /pago/gracias solo agradece.
// Quien lo concede es el webhook (api/stripe-webhook.js), porque la URL de
// vuelta se puede escribir a mano y sería regalar la suscripción.

import { auth } from './firebase'

export async function startCheckout(plan) {
  const user = auth.currentUser
  if (!user) throw new Error('not_signed_in')

  const idToken = await user.getIdToken()
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ plan }),
  })

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}))
    throw new Error(error ?? 'unknown')
  }

  const { url } = await res.json()
  if (!url) throw new Error('unknown')

  // Navegación completa, no un router push: Stripe Checkout es otro dominio.
  window.location.href = url
}
