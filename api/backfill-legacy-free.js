// Endpoint de UN SOLO USO. Existe porque el backfill de legacyFree
// (scripts/backfill-legacy-free.mjs) tenía que correr ANTES de publicar el
// muro de pago y no llegó a ejecutarse — se confirmó con api/diag-users.js
// (legacyFree: 0 de 15 usuarios). Sin credenciales de Admin en local para
// correr el script normal, esto hace lo mismo vía las credenciales que ya
// tiene Vercel.
//
// Marca TODOS los usuarios existentes como legacyFree, sin filtro de fecha:
// el muro estuvo funcionalmente caído la mayor parte del tiempo que llevaba
// "publicado" (varios despliegues seguidos fallaron), así que prácticamente
// toda la base de usuarios actual es anterior a que el muro funcionara de
// verdad. Idempotente — si se llama dos veces, la segunda no hace nada nuevo.
//
// GET  -> simulacro, cuenta cuántos se marcarían, no escribe.
// POST -> aplica de verdad.
// Los dos exigen DEBUG_API (igual que diag.js/diag-users.js) y este fichero
// se borra en cuanto se confirme el resultado — no tiene sentido dejar un
// endpoint que escribe en producción más tiempo del necesario.
import { getDb, fail } from './_admin.js'

export default async function handler(req, res) {
  if (!process.env.DEBUG_API) return res.status(404).json({ error: 'not_found' })

  try {
    const db = await getDb()
    const snap = await db.collection('users').get()

    let alreadyMarked = 0
    let toMark = 0
    const batch = db.batch()

    for (const doc of snap.docs) {
      if (doc.data().legacyFree === true) { alreadyMarked++; continue }
      toMark++
      if (req.method === 'POST') {
        batch.set(doc.ref, { legacyFree: true, legacyFreeAt: new Date() }, { merge: true })
      }
    }

    if (req.method === 'POST' && toMark > 0) await batch.commit()

    return res.status(200).json({
      applied: req.method === 'POST',
      totalUsers: snap.size,
      alreadyMarked,
      marked: req.method === 'POST' ? toMark : 0,
      wouldMark: req.method === 'GET' ? toMark : undefined,
    })
  } catch (err) {
    return fail(res, err, 'backfill-legacy-free')
  }
}
