// Revisa el alta de un profesor (src/lib/solicitudesProfe.js). Solo un
// administrador: la misma lista de correos que isAdmin() en firestore.rules (si
// cambia allí, cambiarla aquí).
//
// Desde el 31-oct-2026 la cuenta de profe se abre al momento, sin palabra de la
// beta: el profe la usa entera mientras su solicitud está «pendiente» y aquí se
// revisa después.
//   validar    → estado 'aprobada' (y la cuenta queda de profe, por si aún no lo era)
//   rectificar → estado 'rectificar' con una nota de qué falta; el profe la ve
//                en su panel y corrige los datos (vuelve a 'pendiente')
//   rechazar   → estado 'rechazada' y se le quita el acceso de profe (spam)
// 'aprobar' es el nombre antiguo de 'validar' y se sigue aceptando.
// En el servidor porque un admin no puede escribir el perfil de otra cuenta
// desde el cliente (las rules solo dejan a cada uno el suyo).
//
// POST { uid, accion, nota? }  con Authorization: Bearer <token>
import { getDb, getAdminAuth, fail } from './_admin.js'

const ADMINS = ['pinya1994@gmail.com', 'consiguetualgogratis@gmail.com', 'consiguetualgogratis@tuthor.app', 'manel.willx@gmail.com']
const CODIGO_BETA = 'BETATUTHOR'
const ESTADO = { validar: 'aprobada', aprobar: 'aprobada', rectificar: 'rectificar', rechazar: 'rechazada' }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  const cabecera = String(req.headers?.authorization ?? '')
  if (!cabecera.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' })
  try {
    let quien
    try { quien = await (await getAdminAuth()).verifyIdToken(cabecera.slice(7)) } catch { return res.status(401).json({ error: 'unauthorized' }) }
    if (!ADMINS.includes(quien.email) || quien.childMode) return res.status(403).json({ error: 'forbidden' })

    const uid = String(req.body?.uid ?? '')
    const accion = req.body?.accion
    const nota = String(req.body?.nota ?? '').trim().slice(0, 600)
    if (!uid || !ESTADO[accion]) return res.status(400).json({ error: 'params' })
    if (accion === 'rectificar' && nota.length < 3) return res.status(400).json({ error: 'nota' })

    const db = await getDb()
    const solRef = db.doc(`solicitudesProfe/${uid}`)
    const sol = await solRef.get()
    if (!sol.exists) return res.status(404).json({ error: 'no_existe' })
    const s = sol.data()

    if (ESTADO[accion] === 'aprobada') {
      await db.doc(`users/${uid}`).set({
        teacherProfile: { active: true, schoolName: s.centro ?? '', stage: s.etapa ?? 'eso', promoCode: CODIGO_BETA, validadoPor: quien.email, validadoEn: new Date() },
      }, { merge: true })
    }
    if (accion === 'rechazar') {
      await db.doc(`users/${uid}`).set({ teacherProfile: { active: false } }, { merge: true })
    }
    await solRef.update({
      estado: ESTADO[accion],
      nota: accion === 'rectificar' ? nota : '',
      resueltaEn: new Date(), resueltaPor: quien.email,
    })
    return res.status(200).json({ ok: true, estado: ESTADO[accion] })
  } catch (err) {
    return fail(res, err, 'aprobar-profe')
  }
}
