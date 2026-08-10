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
    const { error, detail } = await res.json().catch(() => ({}))
    const err = new Error(error ?? 'unknown')
    // El servidor solo manda `detail` si DEBUG_API está puesta, así que esto
    // no filtra nada en operación normal: es el operador quien decide
    // enseñarlo, y sirve para depurar sin rebuscar en los logs.
    err.detail = detail
    throw err
  }

  const { url } = await res.json()
  if (!url) throw new Error('unknown')

  // Navegación completa, no un router push: Stripe Checkout es otro dominio.
  window.location.href = url
}

// Abre el Customer Portal de Stripe (cambiar tarjeta, ver facturas, cancelar).
// `returnPath` es la ruta a la que Stripe devuelve al terminar — se manda con
// el prefijo de idioma ya puesto (localPath('/perfil')) porque el servidor no
// sabe en qué idioma estaba el usuario.
export async function openBillingPortal(returnPath) {
  const user = auth.currentUser
  if (!user) throw new Error('not_signed_in')

  const idToken = await user.getIdToken()
  const res = await fetch('/api/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ returnPath }),
  })

  if (!res.ok) {
    const { error, detail } = await res.json().catch(() => ({}))
    const err = new Error(error ?? 'unknown')
    err.detail = detail
    throw err
  }

  const { url } = await res.json()
  if (!url) throw new Error('unknown')

  window.location.href = url
}
