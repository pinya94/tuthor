// Diagnóstico de solo lectura sobre la colección users/. Igual que diag.js:
// responde 404 salvo que DEBUG_API esté puesta, así que en operación normal
// es como si no existiera. Nunca devuelve datos de un usuario concreto (ni
// email, ni uid) — solo recuentos agregados.
//
// Existe para una comprobación puntual: confirmar si scripts/backfill-legacy
// -free.mjs llegó a ejecutarse antes de que el muro de pago se publicara. Sin
// credenciales de Admin en local no hay otra forma de saberlo sin arriesgar
// a mirar datos de usuarios reales a mano.
import { getDb, fail } from './_admin.js'

export default async function handler(req, res) {
  if (!process.env.DEBUG_API) return res.status(404).json({ error: 'not_found' })

  try {
    const db = await getDb()
    const usersRef = db.collection('users')

    // count() no descarga los documentos, solo el recuento — barato incluso
    // con muchos miles de usuarios.
    const [total, legacyFree, activeSub, teacherActive] = await Promise.all([
      usersRef.count().get(),
      usersRef.where('legacyFree', '==', true).count().get(),
      usersRef.where('subscription.status', 'in', ['active', 'trialing', 'past_due']).count().get(),
      usersRef.where('teacherProfile.active', '==', true).count().get(),
    ])

    return res.status(200).json({
      totalUsers: total.data().count,
      legacyFree: legacyFree.data().count,
      activeSubscription: activeSub.data().count,
      teacherActive: teacherActive.data().count,
    })
  } catch (err) {
    return fail(res, err, 'diag-users')
  }
}
