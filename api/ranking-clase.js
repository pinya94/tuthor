// Ranking de clase sin cuenta: el alumno se une con el código que le da el
// profesor y un apodo, y sus récords suben al ranking de su clase.
//
// Por qué en el servidor: el alumno no tiene cuenta, así que Firestore no
// sabe quién es y no se le puede dejar escribir directamente (cualquiera
// podría poner puntos a nombre de otro). Las reglas cierran la escritura de
// las entradas y solo pasa por aquí, que comprueba el código, que el apodo
// esté libre y limpio, y que el récord sea de verdad un récord.
//
// POST { accion: 'unirse', codigo, dispositivo, apodo }
// POST { accion: 'puntos', codigo, dispositivo, juego, puntos }
//
// `dispositivo` es un id aleatorio que el navegador guarda en localStorage:
// identifica al alumno en ESE dispositivo sin saber nada de él. Es secreto:
// las entradas públicas del ranking llevan otro id (`pid`), así que leer el
// ranking no da con qué mandar puntos en nombre de un compañero.
import { randomBytes } from 'node:crypto'
import { getDb, fail } from './_admin.js'
import { normalizaCodigo, codigoValido, validaApodo, claveApodo, juegoValido, puntosValidos, dispositivoValido, MAX_ALUMNOS } from '../src/lib/apodo.js'

const ESPERA_MS = 5000 // entre dos récords del mismo juego, contra envíos en bucle

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  const b = req.body ?? {}
  const codigo = normalizaCodigo(b.codigo)
  const dispositivo = String(b.dispositivo ?? '')
  if (!codigoValido(codigo)) return res.status(400).json({ error: 'codigo' })
  if (!dispositivoValido(dispositivo)) return res.status(400).json({ error: 'dispositivo' })

  try {
    const db = await getDb()
    const rankingRef = db.doc(`rankingsClase/${codigo}`)
    const alumnoRef = rankingRef.collection('alumnos').doc(dispositivo)

    if (b.accion === 'unirse') {
      const v = validaApodo(b.apodo)
      if (!v.ok) return res.status(400).json({ error: `apodo_${v.error}` })
      const key = claveApodo(v.apodo)
      // Límite de alumnos contado aparte, sin contador en el doc del ranking:
      // si 30 alumnos entran en el mismo segundo, escribir todos en el mismo
      // documento haría chocar las transacciones. Bajo esa carrera el límite
      // puede pasarse por unos pocos; da igual, es solo un tope contra abusos.
      const yaDentro = (await alumnoRef.get()).exists
      if (!yaDentro && (await rankingRef.collection('alumnos').count().get()).data().count >= MAX_ALUMNOS) {
        return res.status(403).json({ error: 'lleno' })
      }
      const r = await db.runTransaction(async tx => {
        const ranking = await tx.get(rankingRef)
        if (!ranking.exists) return { status: 404, error: 'no_existe' }
        if (ranking.data().cerrado) return { status: 403, error: 'cerrado' }
        const yo = await tx.get(alumnoRef)
        const mismo = await tx.get(rankingRef.collection('alumnos').where('apodoKey', '==', key).limit(2))
        if (mismo.docs.some(d => d.id !== dispositivo)) return { status: 409, error: 'apodo_ocupado' }
        const pid = yo.exists ? yo.data().pid : randomBytes(9).toString('base64url')
        tx.set(alumnoRef, { apodo: v.apodo, apodoKey: key, pid, unidoEn: yo.exists ? yo.data().unidoEn : new Date() })
        return { status: 200, nombre: ranking.data().nombre, pid, cambia: yo.exists && yo.data().apodo !== v.apodo }
      })
      if (r.status !== 200) return res.status(r.status).json({ error: r.error })
      // Si cambia de apodo, sus récords ya subidos lo cambian también
      if (r.cambia) {
        const suyas = await rankingRef.collection('entradas').where('pid', '==', r.pid).get()
        const lote = db.batch()
        suyas.docs.forEach(d => lote.update(d.ref, { apodo: v.apodo }))
        await lote.commit()
      }
      return res.status(200).json({ ok: true, apodo: v.apodo, nombre: r.nombre, pid: r.pid })
    }

    if (b.accion === 'puntos') {
      const juego = String(b.juego ?? '')
      const puntos = Number(b.puntos)
      if (!juegoValido(juego)) return res.status(400).json({ error: 'juego' })
      if (!puntosValidos(puntos)) return res.status(400).json({ error: 'puntos' })
      const r = await db.runTransaction(async tx => {
        const [ranking, yo] = await Promise.all([tx.get(rankingRef), tx.get(alumnoRef)])
        if (!ranking.exists) return { status: 404, error: 'no_existe' }
        if (ranking.data().cerrado) return { status: 403, error: 'cerrado' }
        if (!yo.exists) return { status: 403, error: 'no_unido' }
        const pid = yo.data().pid
        const entradaRef = rankingRef.collection('entradas').doc(`${pid}__${juego}`)
        const antes = await tx.get(entradaRef)
        if (antes.exists) {
          const a = antes.data()
          if (puntos <= a.puntos) return { status: 200, mejor: a.puntos, record: false }
          if (Date.now() - a.actualizado.toMillis() < ESPERA_MS) return { status: 429, error: 'espera' }
        }
        tx.set(entradaRef, { pid, apodo: yo.data().apodo, juego, puntos, actualizado: new Date() })
        return { status: 200, mejor: puntos, record: true }
      })
      if (r.status !== 200) return res.status(r.status).json({ error: r.error })
      return res.status(200).json({ ok: true, mejor: r.mejor, record: r.record })
    }

    return res.status(400).json({ error: 'accion' })
  } catch (err) {
    return fail(res, err, 'ranking-clase')
  }
}
