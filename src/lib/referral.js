// Lado cliente de "invita y gana un mes de Pro" (ver api/apply-referral.js,
// que es quien de verdad concede el mes — esto solo captura y dispara).
//
// El enlace de invitación lleva el uid de quien invita tal cual
// (?ref=<uid>), sin generar un código nuevo: un uid de Firebase ya es un
// identificador opaco que no hace falta esconder más (se usa igual en
// leaderboards, sponsoredByTeacher.teacherId...), y así no hace falta un
// endpoint ni una colección nuevos solo para fabricar un código.
import { auth } from './firebase'

const REF_STORAGE_KEY = 'tuthor_ref'

// Se llama una vez al arrancar la app (ver App.jsx). Primer toque gana: si ya
// hay un ref guardado, uno nuevo en la URL no lo pisa — cambiar de opinión a
// medio navegar no debe robarle la invitación a quien mandó el enlace
// primero.
export function captureReferralFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (!ref) return
    if (localStorage.getItem(REF_STORAGE_KEY)) return
    localStorage.setItem(REF_STORAGE_KEY, ref)
  } catch { /* localStorage puede fallar en privado/incógnito estricto */ }
}

// Se llama justo después de un registro nuevo de verdad (isNewUser, ver
// loginWithGoogle en AuthContext.jsx). Sin await deliberado por parte de
// quien llama: si falla, no debe romper ni retrasar el login — como mucho se
// pierde el mes de bonificación, nunca el acceso a la cuenta.
export async function applyPendingReferral() {
  let referrerUid
  try {
    referrerUid = localStorage.getItem(REF_STORAGE_KEY)
    if (!referrerUid) return
    localStorage.removeItem(REF_STORAGE_KEY) // un solo intento, éxito o no
  } catch { return }

  const user = auth.currentUser
  if (!user || referrerUid === user.uid) return

  try {
    const idToken = await user.getIdToken()
    await fetch('/api/apply-referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ referrerUid }),
    })
  } catch { /* mejor esfuerzo, ver arriba */ }
}

// Enlace que se comparte. `localPath` viene de useLang() — mantiene el
// prefijo de idioma de quien invita, no el de quien lo recibe (que aún no se
// sabe: no tiene sesión todavía).
export function getReferralLink(uid, localPath) {
  const path = localPath('/')
  return `${window.location.origin}${path}?ref=${uid}`
}
