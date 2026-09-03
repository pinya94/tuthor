// Fusiona una ficha de alumno sin cuenta (roster) con la cuenta real de un
// alumno de la clase: le traslada su sitio en el plano, sus faltas y sus
// notas, y quita la ficha.
//
// Lo decide el PROFESOR, no el alumno. La primera versión de esto dejaba que
// el propio alumno dijera "esa ficha soy yo" al unirse — y el fallo de ese
// diseño es que nada comprobaba que "Marta Ruiz" fuera de verdad Marta Ruiz,
// solo que quien lo decía conocía el código de la clase. Con el profesor
// emparejando desde su panel, es él quien reconoce a sus propios alumnos: la
// misma garantía que ya tiene al pasar lista en persona.
//
// Por qué en el servidor con Admin, aun siendo el profesor quien llama: el
// profesor sí puede escribir seating (ver firestore.rules), pero NO puede
// escribir directamente en `values`/`marks` de OTRO documento por su cuenta
// sin pasar por MechanicExam/ExamenMC ni recorrer un curso entero de
// documentos desde el cliente sin arriesgarse a dejarlo a medias si se cierra
// la pestaña. Server-side es, además, lo único que puede ser una transacción
// más un batch grande de forma fiable.
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

  // Una sesión de hijo comparte uid con el padre — esto lo decide quien es
  // profesor de verdad, no una sesión prestada.
  if (decoded.childMode === true) return res.status(403).json({ error: 'child_session' })

  const callerUid = decoded.uid
  const classId = String(req.body?.classId ?? '')
  const placeholderId = String(req.body?.placeholderId ?? '')
  const targetUid = String(req.body?.targetUid ?? '')
  if (!classId || !placeholderId || !targetUid) return res.status(400).json({ error: 'missing_params' })
  if (!placeholderId.startsWith('ph_')) return res.status(400).json({ error: 'bad_placeholder' })

  try {
    const classRef = db.doc(`classes/${classId}`)

    // Transacción solo para el doc de la clase: confirma que quien llama es
    // el profesor de ESTA clase, que el alumno elegido ya es miembro y que la
    // ficha sigue sin vincular, y la quita del roster en el mismo paso. Es lo
    // que hace idempotente al endpoint entero — una segunda llamada con el
    // mismo par ya no encuentra la ficha y responde "nada que hacer" en vez
    // de repetir el traslado.
    const resultado = await db.runTransaction(async tx => {
      const snap = await tx.get(classRef)
      if (!snap.exists) return { ok: false, reason: 'class_not_found' }
      const data = snap.data()
      if (data.teacherId !== callerUid) return { ok: false, reason: 'not_the_teacher' }
      if (!(data.studentIds ?? []).includes(targetUid)) return { ok: false, reason: 'not_a_member' }
      const ficha = data.roster?.[placeholderId]
      if (!ficha) return { ok: false, reason: 'placeholder_not_found' }

      const updates = { [`roster.${placeholderId}`]: FieldValue.delete(), updatedAt: new Date() }
      // El sitio del plano se hereda solo si el alumno todavía no tenía uno
      // propio: si el profesor ya lo había sentado con su cuenta real antes
      // de vincular la ficha, no se le mueve de donde está.
      const spots = data.seating?.spots ?? {}
      if (placeholderId in spots) {
        updates[`seating.spots.${placeholderId}`] = FieldValue.delete()
        if (!(targetUid in spots)) updates[`seating.spots.${targetUid}`] = spots[placeholderId]
      }
      tx.update(classRef, updates)
      return { ok: true, name: ficha.name }
    })

    if (!resultado.ok) {
      const codigo = resultado.reason === 'not_the_teacher' ? 403 : resultado.reason === 'not_a_member' ? 400 : 404
      return res.status(codigo).json({ error: resultado.reason })
    }

    // Fuera de la transacción a propósito: puede ser un curso entero de
    // documentos, y no hace falta que sea atómico con el paso anterior. Si
    // esto fallara a mitad, la ficha ya no está en el roster (no se puede
    // vincular dos veces) y lo movido hasta ese punto se queda movido — no
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
        if (!(targetUid in valores)) cambios[`${campo}.${targetUid}`] = valores[placeholderId]
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
