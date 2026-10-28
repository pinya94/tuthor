// Retos de clase sin cuenta (ranking libre, deberes y partida en directo):
// el alumno se une con el código que le da el profesor y un apodo, y sus
// puntos suben al reto de su clase.
//
// Por qué en el servidor: el alumno no tiene cuenta, así que Firestore no
// sabe quién es y no se le puede dejar escribir directamente (cualquiera
// podría poner puntos a nombre de otro). Las reglas cierran la escritura de
// lo del alumno y solo pasa por aquí, que comprueba el código, que el apodo
// esté libre y limpio, que el récord sea de verdad un récord y, en directo,
// que la respuesta llegue a tiempo y una sola vez.
//
// POST { accion: 'unirse', codigo, dispositivo, apodo }
// POST { accion: 'puntos', codigo, dispositivo, juego, puntos }      récord (ranking y deberes)
// POST { accion: 'responde', codigo, dispositivo, i, correcta }      respuesta en directo
//
// `dispositivo` es un id aleatorio que el navegador guarda en localStorage:
// identifica al alumno en ESE dispositivo sin saber nada de él. Es secreto:
// lo público (entradas, marcador, respuestas) lleva otro id (`pid`), así que
// leer el reto no da con qué mandar puntos en nombre de un compañero.
//
// En directo, el acierto lo calcula el móvil (la corrección de cada juego
// vive en el cliente) y aquí solo se comprueba el tiempo: en una clase, con
// el profe delante, es suficiente.
import { randomBytes } from 'node:crypto'
import { getDb, getAdminAuth, fail } from './_admin.js'
import { normalizaCodigo, codigoValido, validaApodo, claveApodo, juegoValido, puntosValidos, dispositivoValido, MAX_ALUMNOS, puntosDirecto } from '../src/lib/apodo.js'

const ESPERA_MS = 5000 // entre dos récords del mismo juego, contra envíos en bucle
const MARGEN_MS = 2500 // en directo: lo que tarda en llegar una respuesta dada en el último segundo
const VIDA_AMIGOS_MS = 24 * 3600 * 1000 // una partida con amigos dura un día
const caducado = d => d.amigos === true && d.createdAt?.toMillis && Date.now() - d.createdAt.toMillis() > VIDA_AMIGOS_MS

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
      // Límite de alumnos contado aparte, sin contador en el doc del reto:
      // si 30 alumnos entran en el mismo segundo, escribir todos en el mismo
      // documento haría chocar las transacciones. Bajo esa carrera el límite
      // puede pasarse por unos pocos; da igual, es solo un tope contra abusos.
      const yaDentro = (await alumnoRef.get()).exists
      if (!yaDentro && (await rankingRef.collection('alumnos').count().get()).data().count >= MAX_ALUMNOS) {
        return res.status(403).json({ error: 'lleno' })
      }
      // Si entra con su sesión de Tuthor, quién es (verificado). Solo se apunta
      // si es alumno de la clase del reto: así el profe lo ve emparejado solo,
      // y de quien no es de la clase no se guarda nada.
      let uidSesion = null
      const cabecera = String(req.headers?.authorization ?? '')
      if (cabecera.startsWith('Bearer ')) {
        try { const t = await (await getAdminAuth()).verifyIdToken(cabecera.slice(7)); if (!t.childMode) uidSesion = t.uid } catch { /* token caducado o falso: entra como cualquiera */ }
      }
      const r = await db.runTransaction(async tx => {
        const ranking = await tx.get(rankingRef)
        if (!ranking.exists) return { status: 404, error: 'no_existe' }
        if (ranking.data().cerrado) return { status: 403, error: 'cerrado' }
        if (caducado(ranking.data())) return { status: 403, error: 'caducado' }
        let uid = null
        if (uidSesion && ranking.data().classId) {
          const clase = await tx.get(db.doc(`classes/${ranking.data().classId}`))
          if (clase.exists && (clase.data().studentIds ?? []).includes(uidSesion)) uid = uidSesion
        }
        const yo = await tx.get(alumnoRef)
        const mismo = await tx.get(rankingRef.collection('alumnos').where('apodoKey', '==', key).limit(2))
        if (mismo.docs.some(d => d.id !== dispositivo)) return { status: 409, error: 'apodo_ocupado' }
        const pid = yo.exists ? yo.data().pid : randomBytes(9).toString('base64url')
        tx.set(alumnoRef, { apodo: v.apodo, apodoKey: key, pid, unidoEn: yo.exists ? yo.data().unidoEn : new Date(), ...(uid ? { uid } : yo.exists && yo.data().uid ? { uid: yo.data().uid } : {}) })
        const d = ranking.data()
        return { status: 200, nombre: d.nombre, modo: d.modo ?? 'ranking', examen: d.examen ?? null, pid, cambia: yo.exists && yo.data().apodo !== v.apodo }
      })
      if (r.status !== 200) return res.status(r.status).json({ error: r.error })
      // Si cambia de apodo, lo suyo ya subido lo cambia también
      if (r.cambia) {
        const lote = db.batch()
        for (const col of ['entradas', 'marcador']) {
          const suyas = await rankingRef.collection(col).where('pid', '==', r.pid).get()
          suyas.docs.forEach(d => lote.update(d.ref, { apodo: v.apodo }))
        }
        await lote.commit()
      }
      return res.status(200).json({ ok: true, apodo: v.apodo, nombre: r.nombre, modo: r.modo, examen: r.examen, pid: r.pid })
    }

    if (b.accion === 'puntos') {
      const juego = String(b.juego ?? '')
      const puntos = Number(b.puntos)
      if (!juegoValido(juego)) return res.status(400).json({ error: 'juego' })
      if (!puntosValidos(puntos)) return res.status(400).json({ error: 'puntos' })
      const r = await db.runTransaction(async tx => {
        const [ranking, yo] = await Promise.all([tx.get(rankingRef), tx.get(alumnoRef)])
        if (!ranking.exists) return { status: 404, error: 'no_existe' }
        const d = ranking.data()
        if (d.cerrado) return { status: 403, error: 'cerrado' }
        if (!yo.exists) return { status: 403, error: 'no_unido' }
        // Un reto de deberes o en directo es de UN examen: lo demás no cuenta
        if (d.examen && juego !== d.examen) return { status: 400, error: 'otro_juego' }
        const pid = yo.data().pid
        const entradaRef = rankingRef.collection('entradas').doc(`${pid}__${juego}`)
        const antes = await tx.get(entradaRef)
        const intentos = (antes.exists ? antes.data().intentos ?? 1 : 0) + 1
        if (antes.exists) {
          const a = antes.data()
          if (puntos <= a.puntos) {
            tx.update(entradaRef, { intentos })
            return { status: 200, mejor: a.puntos, record: false, intentos }
          }
          if (Date.now() - a.actualizado.toMillis() < ESPERA_MS) return { status: 429, error: 'espera' }
        }
        tx.set(entradaRef, { pid, apodo: yo.data().apodo, juego, puntos, intentos, actualizado: new Date() })
        return { status: 200, mejor: puntos, record: true, intentos }
      })
      if (r.status !== 200) return res.status(r.status).json({ error: r.error })
      return res.status(200).json({ ok: true, mejor: r.mejor, record: r.record, intentos: r.intentos })
    }

    if (b.accion === 'responde') {
      const i = Number(b.i)
      if (!Number.isInteger(i) || i < 0 || i > 99) return res.status(400).json({ error: 'pregunta' })
      const correcta = b.correcta === true
      const r = await db.runTransaction(async tx => {
        const [ranking, yo] = await Promise.all([tx.get(rankingRef), tx.get(alumnoRef)])
        if (!ranking.exists) return { status: 404, error: 'no_existe' }
        if (!yo.exists) return { status: 403, error: 'no_unido' }
        if (caducado(ranking.data())) return { status: 403, error: 'caducado' }
        const dir = ranking.data().directo
        if (!dir || dir.estado !== 'pregunta' || dir.i !== i || !dir.inicio) return { status: 409, error: 'cerrada' }
        const T = (ranking.data().segundos ?? 30) * 1000
        const t = Date.now() - dir.inicio.toMillis()
        if (t > T + MARGEN_MS) return { status: 409, error: 'tarde' }
        const { pid, apodo } = yo.data()
        const respRef = rankingRef.collection('respuestas').doc(`${pid}__${i}`)
        const marcRef = rankingRef.collection('marcador').doc(pid)
        const [ya, marc] = await Promise.all([tx.get(respRef), tx.get(marcRef)])
        if (ya.exists) return { status: 409, error: 'ya' }
        const pts = puntosDirecto(correcta, t, T)
        tx.set(respRef, { pid, i, correcta, puntos: pts, en: new Date() })
        const m = marc.exists ? marc.data() : { puntos: 0, aciertos: 0 }
        tx.set(marcRef, { pid, apodo, puntos: m.puntos + pts, aciertos: m.aciertos + (correcta ? 1 : 0) })
        return { status: 200, puntos: pts, total: m.puntos + pts }
      })
      if (r.status !== 200) return res.status(r.status).json({ error: r.error })
      return res.status(200).json({ ok: true, puntos: r.puntos, total: r.total })
    }

    return res.status(400).json({ error: 'accion' })
  } catch (err) {
    return fail(res, err, 'ranking-clase')
  }
}
