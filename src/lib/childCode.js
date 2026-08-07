// Lado cliente del código de acceso del hijo. El código lo genera y lo guarda
// el servidor (api/child-code.js); aquí solo se pide y se presenta.
//
// El padre nunca escribe este campo directamente: firestore.rules trata
// `childCode` como campo de solo-Admin, igual que la suscripción. Si el cliente
// pudiera escribirlo, cualquiera podría apuntar un código a la cuenta de otro.

import { auth } from './firebase'

async function callChildCode(body) {
  const user = auth.currentUser
  if (!user) throw new Error('not_signed_in')

  const idToken = await user.getIdToken()
  const res = await fetch('/api/child-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}))
    throw new Error(error ?? 'unknown')
  }
  return (await res.json()).code
}

// Devuelve el código actual, creándolo la primera vez.
export function getChildCode() {
  return callChildCode({})
}

// Genera uno nuevo e invalida el anterior en el acto. Para cuando el niño se lo
// ha pasado a media clase.
export function rotateChildCode() {
  return callChildCode({ rotate: true })
}

// Se muestra en grupos de cuatro porque un bloque de doce caracteres es muy
// fácil de copiar mal. Al escribirlo da igual: el servidor normaliza y quita
// todo lo que no sea alfanumérico (normalizeCode en api/_admin.js).
export function formatChildCode(code) {
  if (!code) return ''
  return code.match(/.{1,4}/g).join('-')
}
