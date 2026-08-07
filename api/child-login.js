// Login del hijo con el código que le da el padre.
//
// Firebase Auth no sabe iniciar sesión con una cadena cualquiera: hace falta
// que alguien de confianza mintee un token. Eso es lo que pasa aquí — se busca
// de quién es el código y se emite un custom token para ESE uid.
//
// El niño entra en la MISMA cuenta que el padre (mismo uid, mismos stats: es
// justo lo que se quiere, la cuenta es del hijo y el padre la supervisa). La
// diferencia va en el claim `childMode: true`, que viaja dentro del token y
// que firestore.rules sí puede leer (request.auth.token.childMode). Sin ese
// claim, "el niño no entra a los ajustes" sería un display:none que se salta
// escribiendo la URL: para el servidor sería exactamente la misma persona.
import { db, adminAuth, normalizeCode } from './_admin.js'

// Freno de fuerza bruta. Es por instancia de lambda y se pierde en cada frío,
// así que no es una defensa seria — la defensa seria es la entropía del código
// (31^12 ≈ 8·10^17 combinaciones). Esto solo corta el script tonto que prueba
// mil códigos desde una IP.
const MAX_ATTEMPTS = 10
const WINDOW_MS = 60_000
const attempts = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const hits = (attempts.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  hits.push(now)
  attempts.set(ip, hits)
  // El Map crece con cada IP nueva; se poda cuando se va de tamaño para que
  // una lambda de vida larga no acumule memoria indefinidamente.
  if (attempts.size > 5000) attempts.clear()
  return hits.length > MAX_ATTEMPTS
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })

  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return res.status(429).json({ error: 'too_many' })

  const code = normalizeCode(req.body?.code)
  // Se comprueba la longitud antes de ir a Firestore: así un formulario vacío
  // no cuesta una lectura.
  if (code.length < 8) return res.status(400).json({ error: 'not_found' })

  try {
    const snap = await db.doc(`childCodes/${code}`).get()
    // Mismo error que un código mal escrito, a propósito: distinguir
    // "no existe" de "existe pero algo falla" solo ayudaría a quien esté
    // probando códigos a ciegas.
    if (!snap.exists) return res.status(404).json({ error: 'not_found' })

    const { uid, revoked } = snap.data()
    if (!uid || revoked === true) return res.status(404).json({ error: 'not_found' })

    const token = await adminAuth.createCustomToken(uid, { childMode: true })
    return res.status(200).json({ token })
  } catch (err) {
    console.error('child-login error:', err)
    return res.status(500).json({ error: 'unknown' })
  }
}
