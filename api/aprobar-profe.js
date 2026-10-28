// Aprueba o rechaza una solicitud de acceso a la beta de profesores
// (src/lib/solicitudesProfe.js). Solo un administrador: la misma lista de
// correos que isAdmin() en firestore.rules (si cambia allí, cambiarla aquí).
//
// Aprobar escribe el teacherProfile de esa cuenta con el código de la beta,
// como si lo hubiera escrito él: es lo que ya reconocen hasTeacherAccess()
// (cliente) e isTeacher() (rules), así que no hace falta ningún otro cambio.
// En el servidor porque un admin no puede escribir el perfil de otra cuenta
// desde el cliente (las rules solo dejan a cada uno el suyo).
//
// POST { uid, accion: 'aprobar' | 'rechazar' }  con Authorization: Bearer <token>
import { getDb, getAdminAuth, fail } from './_admin.js'

const ADMINS = ['pinya1994@gmail.com', 'consiguetualgogratis@gmail.com', 'consiguetualgogratis@tuthor.app', 'manel.willx@gmail.com']
const CODIGO_BETA = 'BETATUTHOR'

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
    if (!uid || !['aprobar', 'rechazar'].includes(accion)) return res.status(400).json({ error: 'params' })

    const db = await getDb()
    const solRef = db.doc(`solicitudesProfe/${uid}`)
    const sol = await solRef.get()
    if (!sol.exists) return res.status(404).json({ error: 'no_existe' })
    const s = sol.data()

    if (accion === 'aprobar') {
      await db.doc(`users/${uid}`).set({
        teacherProfile: { active: true, schoolName: s.centro ?? '', stage: s.etapa ?? 'eso', promoCode: CODIGO_BETA, createdAt: new Date(), aprobadoPor: quien.email },
      }, { merge: true })
    }
    await solRef.update({ estado: accion === 'aprobar' ? 'aprobada' : 'rechazada', resueltaEn: new Date(), resueltaPor: quien.email })
    return res.status(200).json({ ok: true, estado: accion === 'aprobar' ? 'aprobada' : 'rechazada' })
  } catch (err) {
    return fail(res, err, 'aprobar-profe')
  }
}
