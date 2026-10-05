// Exámenes del profesor (v2): el modelo, la validación y la corrección.
// Lógica pura, sin Firestore (eso vive en examenesProfesor.js), para que la
// usen igual el editor, la vista del alumno, la corrección y la impresión.
//
// Un examen vive en la BIBLIOTECA del profesor (examenesProfesor/{id}) y se
// reutiliza de un curso a otro. Al asignarlo a una clase se copia dentro de
// la tarea (assignments/{id}.quiz, con quizV: 2): así, si el profesor lo
// retoca el año que viene, las notas de este año siguen correspondiendo a
// las preguntas que de verdad se hicieron.
//
// Tipos de pregunta:
//   test       una opción correcta entre 2-6
//   multiple   varias correctas; puntúa entera solo si marca exactamente esas
//   vf         verdadero / falso
//   numerica   un número, con margen (± tolerancia) y unidad opcional
//   corta      texto breve; vale cualquiera de las respuestas aceptadas
//              (sin mayúsculas, tildes ni espacios de más)
//   desarrollo respuesta larga que corrige el profesor (con criterios)
//
// Las soluciones NO viajan con la tarea: al asignar se separan
// (separarSoluciones) y van a assignments/{id}/privado/soluciones, que el
// alumno solo puede leer después de entregar. El alumno escribe únicamente sus
// respuestas; la nota la calcula y la guarda el panel del profesor
// (examenesProfesor.js → autocorregir). Así no se ven las respuestas con las
// herramientas del navegador ni uno se puede poner un 10.

export const TIPOS = ['test', 'multiple', 'vf', 'numerica', 'corta', 'desarrollo']
export const MAX_PREGUNTAS = 50
export const MAX_OPCIONES = 6
export const MIN_OPCIONES = 2
export const ENUNCIADO_MAX = 2000
export const OPCION_MAX = 300
export const TITULO_MAX = 120
export const INSTRUCCIONES_MAX = 1500

let contador = 0
export const nuevoId = () => `p${Date.now().toString(36)}${(contador++).toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`

export function preguntaNueva(tipo = 'test') {
  const base = { id: nuevoId(), tipo, enunciado: '', imagen: null, puntos: 1 }
  switch (tipo) {
    case 'test': return { ...base, opciones: ['', ''], correctas: [0] }
    case 'multiple': return { ...base, opciones: ['', '', ''], correctas: [] }
    case 'vf': return { ...base, correcta: true }
    case 'numerica': return { ...base, valor: null, tolerancia: 0, unidad: '' }
    case 'corta': return { ...base, aceptadas: [''] }
    default: return { ...base, puntos: 2, criterios: '', lineas: 6 }
  }
}

// Cambiar el tipo conserva el enunciado, la imagen y los puntos; lo demás se
// rehace (las opciones de un test no significan nada en una numérica).
export function cambiarTipo(p, tipo) {
  const nueva = preguntaNueva(tipo)
  const conservar = { id: p.id, enunciado: p.enunciado, imagen: p.imagen, puntos: p.puntos }
  // test ↔ multiple sí comparten opciones
  if ((p.tipo === 'test' || p.tipo === 'multiple') && (tipo === 'test' || tipo === 'multiple')) {
    return { ...nueva, ...conservar, opciones: p.opciones, correctas: tipo === 'test' ? [p.correctas?.[0] ?? 0] : p.correctas ?? [] }
  }
  return { ...nueva, ...conservar }
}

export function examenNuevo() {
  return { titulo: '', materia: '', curso: '', cursoEscolar: cursoEscolarActual(), instrucciones: '', preguntas: [preguntaNueva('test')] }
}

// Curso escolar «2026-2027»: de septiembre a agosto.
export function cursoEscolarActual(fecha = new Date()) {
  const y = fecha.getFullYear()
  return fecha.getMonth() >= 8 ? `${y}-${y + 1}` : `${y - 1}-${y}`
}
export function cursoSiguiente(curso) {
  const m = /^(\d{4})-(\d{4})$/.exec(curso || '')
  return m ? `${+m[1] + 1}-${+m[2] + 1}` : cursoEscolarActual()
}

// ── Validación ─────────────────────────────────────────────────────────────
// Devuelve la lista de problemas de una pregunta (vacía = válida), para que
// el editor diga QUÉ falta y no solo «no se puede guardar».
export function problemas(p) {
  const out = []
  const enunciado = (p.enunciado ?? '').trim()
  if (!enunciado && !p.imagen) out.push('enunciado')
  if (enunciado.length > ENUNCIADO_MAX) out.push('enunciadoLargo')
  if (!(Number(p.puntos) > 0) || Number(p.puntos) > 100) out.push('puntos')
  if (p.tipo === 'test' || p.tipo === 'multiple') {
    const ops = p.opciones ?? []
    if (ops.length < MIN_OPCIONES || ops.length > MAX_OPCIONES) out.push('numOpciones')
    if (ops.some(o => !(o ?? '').trim())) out.push('opcionVacia')
    if (ops.some(o => (o ?? '').length > OPCION_MAX)) out.push('opcionLarga')
    const c = p.correctas ?? []
    if (!c.length || c.some(i => !Number.isInteger(i) || i < 0 || i >= ops.length)) out.push('sinCorrecta')
    if (p.tipo === 'test' && c.length !== 1) out.push('sinCorrecta')
  }
  if (p.tipo === 'vf' && typeof p.correcta !== 'boolean') out.push('sinCorrecta')
  if (p.tipo === 'numerica') {
    if (p.valor === null || p.valor === '' || !Number.isFinite(Number(p.valor))) out.push('sinValor')
    if (!(Number(p.tolerancia) >= 0)) out.push('tolerancia')
  }
  if (p.tipo === 'corta' && !(p.aceptadas ?? []).some(a => (a ?? '').trim())) out.push('sinAceptadas')
  return [...new Set(out)]
}

export function problemasExamen(ex) {
  const out = []
  if (!(ex.titulo ?? '').trim()) out.push('titulo')
  if ((ex.titulo ?? '').length > TITULO_MAX) out.push('tituloLargo')
  if ((ex.instrucciones ?? '').length > INSTRUCCIONES_MAX) out.push('instruccionesLargas')
  if (!ex.preguntas?.length) out.push('sinPreguntas')
  if ((ex.preguntas?.length ?? 0) > MAX_PREGUNTAS) out.push('demasiadas')
  return out
}

export const examenValido = ex => !problemasExamen(ex).length && ex.preguntas.every(p => !problemas(p).length)

// Antes de guardar: espacios de sobra fuera, números como números y sin
// campos de otros tipos colgando.
export function limpiarPregunta(p) {
  const base = { id: p.id || nuevoId(), tipo: p.tipo, enunciado: (p.enunciado ?? '').trim(), imagen: p.imagen ?? null, puntos: Number(p.puntos) || 1 }
  switch (p.tipo) {
    case 'test':
    case 'multiple': return { ...base, opciones: p.opciones.map(o => o.trim()), correctas: [...new Set(p.correctas)].sort((a, b) => a - b) }
    case 'vf': return { ...base, correcta: !!p.correcta }
    case 'numerica': return { ...base, valor: Number(p.valor), tolerancia: Math.abs(Number(p.tolerancia) || 0), unidad: (p.unidad ?? '').trim() }
    case 'corta': return { ...base, aceptadas: p.aceptadas.map(a => a.trim()).filter(Boolean) }
    default: return { ...base, criterios: (p.criterios ?? '').trim(), lineas: Math.min(30, Math.max(1, Number(p.lineas) || 6)) }
  }
}

export function limpiarExamen(ex) {
  return {
    titulo: ex.titulo.trim(),
    materia: (ex.materia ?? '').trim(),
    curso: (ex.curso ?? '').trim(),
    cursoEscolar: (ex.cursoEscolar ?? '').trim() || cursoEscolarActual(),
    instrucciones: (ex.instrucciones ?? '').trim(),
    preguntas: ex.preguntas.map(limpiarPregunta),
  }
}

export const puntosTotales = preguntas => Math.round(preguntas.reduce((s, p) => s + (Number(p.puntos) || 0), 0) * 100) / 100
export const esManual = p => p.tipo === 'desarrollo'

// ── Corrección ─────────────────────────────────────────────────────────────
// Texto normalizado para comparar respuestas cortas: sin mayúsculas, tildes,
// signos de puntuación del borde ni espacios de más.
export const normalizar = s => String(s ?? '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/\s+/g, ' ').replace(/^[\s.,;:¡!¿?"'«»()]+|[\s.,;:¡!¿?"'«»()]+$/g, '')

// Acepta «3,5» y «3.5».
export const leerNumero = r => {
  if (r === null || r === undefined || r === '') return null
  const n = Number(String(r).trim().replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

// Puntos automáticos de UNA pregunta; null si la corrige el profesor.
export function puntosAuto(p, r) {
  const max = Number(p.puntos) || 0
  if (esManual(p)) return null
  if (r === null || r === undefined || r === '' || (Array.isArray(r) && !r.length)) return 0
  switch (p.tipo) {
    case 'test': return r === p.correctas[0] ? max : 0
    case 'multiple': {
      const a = [...new Set(r)].sort((x, y) => x - y), b = [...p.correctas].sort((x, y) => x - y)
      return a.length === b.length && a.every((x, i) => x === b[i]) ? max : 0
    }
    case 'vf': return r === p.correcta ? max : 0
    case 'numerica': {
      const n = leerNumero(r)
      return n !== null && Math.abs(n - p.valor) <= (p.tolerancia || 0) + 1e-9 ? max : 0
    }
    case 'corta': return p.aceptadas.some(a => normalizar(a) === normalizar(r)) ? max : 0
    default: return 0
  }
}

// Corrige un intento entero. `manual`: { [idPregunta]: puntos } que pone el
// profesor (en desarrollo, y también para ajustar una automática).
// Devuelve la nota sobre 10 y en %, y cuántas preguntas faltan por revisar.
export function corregirExamen(preguntas, respuestas = {}, manual = {}) {
  const max = puntosTotales(preguntas)
  let obtenidos = 0, pendientes = 0
  const detalle = {}
  for (const p of preguntas) {
    const auto = puntosAuto(p, respuestas[p.id])
    const m = manual?.[p.id]
    let pts
    if (m !== undefined && m !== null && m !== '') pts = Math.min(Number(p.puntos), Math.max(0, Number(m)))
    else if (auto === null) { pts = 0; pendientes++ }
    else pts = auto
    detalle[p.id] = { auto, puntos: pts, max: Number(p.puntos) }
    obtenidos += pts
  }
  obtenidos = Math.round(obtenidos * 100) / 100
  const nota = max > 0 ? Math.round((obtenidos / max) * 100) / 10 : 0
  return { obtenidos, max, nota, score: max > 0 ? Math.round((obtenidos / max) * 100) : 0, aprobado: nota >= 5, pendientes, detalle }
}

// ¿El alumno ha contestado algo en esta pregunta?
export function contestada(p, r) {
  if (r === null || r === undefined) return false
  if (Array.isArray(r)) return r.length > 0
  if (typeof r === 'boolean' || typeof r === 'number') return true
  return String(r).trim() !== ''
}

// Texto de la respuesta correcta, para la corrección y las soluciones impresas.
export function textoSolucion(p, tr) {
  switch (p.tipo) {
    case 'test':
    case 'multiple': return p.correctas.map(i => `${String.fromCharCode(97 + i)}) ${p.opciones[i]}`).join(' · ')
    case 'vf': return p.correcta ? tr({ es: 'Verdadero', en: 'True', ca: 'Vertader' }) : tr({ es: 'Falso', en: 'False', ca: 'Fals' })
    case 'numerica': return `${p.valor}${p.unidad ? ' ' + p.unidad : ''}${p.tolerancia ? ` (± ${p.tolerancia})` : ''}`
    case 'corta': return p.aceptadas.join(' / ')
    default: return p.criterios || '—'
  }
}

// ── Soluciones aparte ──────────────────────────────────────────────────────
// Qué campos de cada tipo delatan la respuesta. Lo demás (enunciado, opciones,
// unidad, líneas) es lo que el alumno necesita para contestar.
export const CAMPOS_SOLUCION = {
  test: ['correctas'],
  multiple: ['correctas'],
  vf: ['correcta'],
  numerica: ['valor', 'tolerancia'],
  corta: ['aceptadas'],
  desarrollo: ['criterios'],
}

export function separarSoluciones(preguntas) {
  const publicas = [], soluciones = {}
  for (const p of preguntas) {
    const campos = CAMPOS_SOLUCION[p.tipo] ?? []
    const pub = { ...p }, sol = {}
    for (const k of campos) { if (k in pub) sol[k] = pub[k]; delete pub[k] }
    publicas.push(pub)
    soluciones[p.id] = sol
  }
  return { publicas, soluciones }
}

// La inversa. Sin soluciones (null) devuelve las preguntas tal cual: así
// siguen funcionando las tareas que se asignaron con las soluciones dentro.
export function unirSoluciones(publicas, soluciones) {
  if (!soluciones) return publicas
  return publicas.map(p => ({ ...p, ...(soluciones[p.id] ?? {}) }))
}

// ¿Lleva la pregunta su solución? (si no, no se puede corregir sola)
export const conSolucion = p => (CAMPOS_SOLUCION[p.tipo] ?? []).every(k => k in p)

// Los campos de nota de una entrega, a partir de sus respuestas y de los
// puntos que haya puesto el profesor. Es lo que se guarda en completions.
export function calificar(preguntas, respuestas = {}, manual = {}) {
  const c = corregirExamen(preguntas, respuestas, manual)
  return {
    escala: 100, score: c.score, passed: c.aprobado, nota: c.nota,
    obtenidos: c.obtenidos, max: c.max, pendientes: c.pendientes, revisado: c.pendientes === 0,
  }
}

// Entregada pero aún sin nota guardada (el alumno ya no escribe la nota).
export const sinCalificar = c => !!c?.done && typeof c.nota !== 'number'
