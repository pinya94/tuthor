// Fusiona una ficha de alumno sin cuenta (roster) con la cuenta real del
// alumno que la reclama: le traslada su sitio en el plano, sus faltas y sus
// notas, y quita la ficha de la clase.
//
// Por qué en el servidor con Admin: el alumno no tiene NINGÚN permiso de
// escritura sobre attendance ni gradeColumns —son teacher-only en
// firestore.rules, y con razón: si un alumno pudiera escribir ahí, podría
// cambiarse sus propias faltas o notas—. Mover el historial de una ficha a su
// uid exige por tanto saltarse esas reglas desde el servidor, igual que
// apply-referral.js salta touchesPaidFields() para dar meses de Pro.
//
// Disparador: el alumno, tras unirse a la clase con el código normal de
// SIEMPRE (joinClassByCode, sin cambios), ve en el roster las fichas sin
// reclamar —ya puede leerlas: está en studentIds— y elige "esa soy yo". Este
// endpoint no une a la clase, eso ya lo hizo el código; solo traslada.
//
// Confianza: nada aquí comprueba que quien reclama "Marta Ruiz" sea de verdad
// Marta Ruiz, más allá de que conozca el código de la clase. Es el mismo
// modelo de confianza que ya tiene unirse a la clase (cualquiera con el
// código entra como alumno): no se introduce un riesgo nuevo, solo se
// extiende el que ya existía.
import { getDb, getAdminAuth, getFieldValue, fail } from './_admin.js'

const MAX_OPS_POR_LOTE = 400 // margen bajo el límite de 500 de un batch de Firestore

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })

  const authHeader = String(req.headers.authorization ?? '')
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' })

  let db, decoded, FieldValue
  try {
    db = await getDb()
    FieldValue = await getFieldValue()
    const adminAuth = await getAdminAuth()
    try {
      decoded = await adminAuth.verifyIdToken(authHeader.slice(7))
    } catch {
      return res.status(401).json({ error: 'unauthorized' })
    }
  } catch (err) {
    return fail(res, err, 'merge-placeholder/init')
  }

  // Igual que apply-referral.js: una sesión de hijo comparte uid con el
  // padre, y esto es una acción que decide el propio alumno.
  if (decoded.childMode === true) return res.status(403).json({ error: 'child_session' })

  const uid = decoded.uid
  const classId = String(req.body?.classId ?? '')
  const placeholderId = String(req.body?.placeholderId ?? '')
  if (!classId || !placeholderId) return res.status(400).json({ error: 'missing_params' })
  if (!placeholderId.startsWith('ph_')) return res.status(400).json({ error: 'bad_placeholder' })

  try {
    const classRef = db.doc(`classes/${classId}`)

    // Transacción solo para el doc de la clase: confirma que el alumno ya es
    // miembro y que la ficha sigue sin reclamar, y la quita del roster en el
    // mismo paso. Es lo que hace idempotente al endpoint entero — una
    // segunda llamada con el mismo par ya no encuentra la ficha (alguien se
    // le adelantó, o el cliente reintentó) y responde "nada que hacer" en
    // vez de repetir el traslado de faltas y notas.
    const resultado = await db.runTransaction(async tx => {
      const snap = await tx.get(classRef)
      if (!snap.exists) return { ok: false, reason: 'class_not_found' }
      const data = snap.data()
      if (!(data.studentIds ?? []).includes(uid)) return { ok: false, reason: 'not_a_member' }
      const ficha = data.roster?.[placeholderId]
      if (!ficha) return { ok: false, reason: 'placeholder_not_found' }

      const updates = { [`roster.${placeholderId}`]: FieldValue.delete(), updatedAt: new Date() }
      // El sitio del plano se hereda solo si el alumno todavía no tenía uno
      // propio: si ya se había sentado antes de fusionarse (poco probable,
      // pero posible), no se le mueve de donde está.
      const spots = data.seating?.spots ?? {}
      if (placeholderId in spots) {
        updates[`seating.spots.${placeholderId}`] = FieldValue.delete()
        if (!(uid in spots)) updates[`seating.spots.${uid}`] = spots[placeholderId]
      }
      tx.update(classRef, updates)
      return { ok: true, name: ficha.name }
    })

    if (!resultado.ok) {
      const codigo = resultado.reason === 'not_a_member' ? 403 : 404
      return res.status(codigo).json({ error: resultado.reason })
    }

    // Fuera de la transacción a propósito: puede ser un curso entero de
    // documentos, y no hace falta que sea atómico con el paso anterior. Si
    // esto fallara a mitad, la ficha ya no está en el roster (no se puede
    // reclamar dos veces) y lo movido hasta ese punto se queda movido — no
    // hay un estado a medias que confunda a nadie, solo un traslado parcial
    // que una segunda llamada no podría reintentar (porque ya no encontraría
    // la ficha). Es la parte que peor degrada de este endpoint, y se acepta
    // porque el caso real (decenas de documentos, no miles) casi nunca falla
    // a mitad.
    for (const [coleccion, campo] of [['attendance', 'marks'], ['gradeColumns', 'values']]) {
      const snap = await db.collection(`classes/${classId}/${coleccion}`).get()
      let lote = db.batch()
      let enLote = 0
      for (const docSnap of snap.docs) {
        const valores = docSnap.data()[campo] ?? {}
        if (!(placeholderId in valores)) continue
        const cambios = { [`${campo}.${placeholderId}`]: FieldValue.delete() }
        if (!(uid in valores)) cambios[`${campo}.${uid}`] = valores[placeholderId]
        lote.update(docSnap.ref, cambios)
        enLote++
        if (enLote >= MAX_OPS_POR_LOTE) { await lote.commit(); lote = db.batch(); enLote = 0 }
      }
      if (enLote > 0) await lote.commit()
    }

    return res.status(200).json({ ok: true, name: resultado.name })
  } catch (err) {
    return fail(res, err, 'merge-placeholder')
  }
}
