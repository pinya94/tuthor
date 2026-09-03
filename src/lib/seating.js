// El plano de pupitres de una clase — lógica pura, sin React ni Firestore.
//
// Se guarda uid → índice de sitio (y no sitio → uid) porque así es imposible
// representar a un alumno sentado en dos mesas a la vez: el modelo no permite
// el estado inválido en vez de tener que comprobarlo.
//
//   índice = fila * cols + columna
//
// Todo lo de aquí devuelve un objeto NUEVO: el estado del plano se sube a
// Firestore tal cual, y mutar el que ya está pintado dejaría la pantalla y el
// servidor diciendo cosas distintas si la escritura falla.

export const FILAS_POR_DEFECTO = 4
export const COLUMNAS_POR_DEFECTO = 6
export const MAX_FILAS = 8
export const MAX_COLUMNAS = 10

export const PLANO_VACIO = { rows: FILAS_POR_DEFECTO, cols: COLUMNAS_POR_DEFECTO, spots: {} }

const acotar = (n, min, max) => Math.min(Math.max(Math.round(n) || min, min), max)

// Un plano guardado puede haber envejecido: alumnos que se fueron de la clase,
// o sitios que quedaron fuera de la cuadrícula al hacerla más pequeña. Se
// limpia AL LEER y no al escribir, para que un dato viejo nunca pinte una mesa
// fantasma aunque nadie haya vuelto a guardar el plano.
export function normalizar(seating, studentIds = []) {
  const rows = acotar(seating?.rows ?? FILAS_POR_DEFECTO, 1, MAX_FILAS)
  const cols = acotar(seating?.cols ?? COLUMNAS_POR_DEFECTO, 1, MAX_COLUMNAS)
  const total = rows * cols
  const validos = new Set(studentIds)
  const spots = {}
  const ocupados = new Set()
  for (const [uid, i] of Object.entries(seating?.spots ?? {})) {
    if (!validos.has(uid)) continue
    if (!Number.isInteger(i) || i < 0 || i >= total) continue
    if (ocupados.has(i)) continue // dos alumnos en la misma mesa: gana el primero
    spots[uid] = i
    ocupados.add(i)
  }
  return { rows, cols, spots }
}

// La cuadrícula lista para pintar: una entrada por mesa, en orden de lectura.
export function mesas(seating) {
  const porSitio = new Map(Object.entries(seating.spots).map(([uid, i]) => [i, uid]))
  return Array.from({ length: seating.rows * seating.cols }, (_, i) => ({
    index: i,
    fila: Math.floor(i / seating.cols),
    columna: i % seating.cols,
    uid: porSitio.get(i) ?? null,
  }))
}

// Quién no tiene sitio todavía, en el orden en que llegue la lista de alumnos.
export function sinSitio(seating, studentIds = []) {
  return studentIds.filter(uid => seating.spots[uid] === undefined)
}

// Sentar a alguien. Si la mesa está ocupada:
//   · si quien llega ya tenía sitio, los dos se intercambian (es lo que hace un
//     profesor cuando dice "vosotros dos, cambiaos");
//   · si venía de fuera del plano, el que estaba se levanta.
export function sentar(seating, uid, index) {
  const spots = { ...seating.spots }
  const anterior = spots[uid]
  const ocupante = Object.keys(spots).find(u => spots[u] === index && u !== uid)
  if (ocupante) {
    if (anterior === undefined) delete spots[ocupante]
    else spots[ocupante] = anterior
  }
  spots[uid] = index
  return { ...seating, spots }
}

export function levantar(seating, uid) {
  const spots = { ...seating.spots }
  delete spots[uid]
  return { ...seating, spots }
}

export function vaciar(seating) {
  return { ...seating, spots: {} }
}

// Sortear los sitios. Reparte a TODOS los alumnos, no solo a los que ya
// estaban sentados: el sorteo se usa justo para deshacer los grupitos de
// siempre, así que empezar de cero es lo que se espera.
export function sortear(seating, studentIds = [], rand = Math.random) {
  const libres = Array.from({ length: seating.rows * seating.cols }, (_, i) => i)
  for (let i = libres.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[libres[i], libres[j]] = [libres[j], libres[i]]
  }
  const spots = {}
  studentIds.slice(0, libres.length).forEach((uid, i) => { spots[uid] = libres[i] })
  return { ...seating, spots }
}

// Cambiar el tamaño del aula conservando lo que quepa. Los que se quedan fuera
// vuelven a la lista de sin sitio en vez de desaparecer.
export function redimensionar(seating, rows, cols) {
  return normalizar({ ...seating, rows, cols }, Object.keys(seating.spots))
}

// "Sale a la pizarra…". Evita repetir a los últimos elegidos mientras queden
// alumnos sin salir: sin esto, en una clase de 25 el azar puro repite al mismo
// dos veces seguidas más a menudo de lo que cualquier alumno acepta como justo.
export function alAzar(studentIds = [], { evitar = [], rand = Math.random } = {}) {
  if (studentIds.length === 0) return null
  const frescos = studentIds.filter(uid => !evitar.includes(uid))
  const pool = frescos.length ? frescos : studentIds
  return pool[Math.floor(rand() * pool.length)]
}
