// Rayo de Luz (física · ondas y luz): un láser, espejos a 45° y un sensor.
// El jugador gira los espejos (dos posiciones: / y \) hasta que el rayo llega
// al sensor. Lo que se aprende es la ley de la reflexión: el rayo sale del
// espejo con el mismo ángulo con el que llega (a 45°, gira 90°).
//
// Tableros GENERADOS, siempre resolubles: primero se traza un camino del
// láser al sensor y se ponen los espejos en sus giros con la orientación
// buena; luego se añaden espejos señuelo y paredes FUERA del camino, y por
// último se desordenan las orientaciones. La solución construida siempre
// existe (puede haber otras: vale cualquiera que lleve la luz al sensor).
//
// Coordenadas: columnas c (0…cols-1, izquierda→derecha) y filas r
// (0…rows-1, arriba→abajo). Direcciones: E, W, N (arriba), S (abajo).

export const DIRS = {
  E: { dc: 1, dr: 0 },
  W: { dc: -1, dr: 0 },
  N: { dc: 0, dr: -1 },
  S: { dc: 0, dr: 1 },
}

// '/' va de abajo-izquierda a arriba-derecha; '\' de arriba-izquierda a
// abajo-derecha. Los espejos reflejan por las dos caras.
const REFLEJO = {
  '/': { E: 'N', N: 'E', W: 'S', S: 'W' },
  '\\': { E: 'S', S: 'E', W: 'N', N: 'W' },
}

export function reflejar(tipo, dir) {
  return REFLEJO[tipo][dir]
}

// Qué espejo hace falta para ir de `entra` a `sale` (perpendiculares).
export function espejoPara(entra, sale) {
  return REFLEJO['/'][entra] === sale ? '/' : '\\'
}

export const NIVELES = {
  facil:   { cols: 5, rows: 6, giros: [2, 2], senuelos: 0, paredes: 0, tramo: 3 },
  medio:   { cols: 6, rows: 7, giros: [3, 3], senuelos: 2, paredes: 2, tramo: 3 },
  dificil: { cols: 6, rows: 7, giros: [4, 5], senuelos: 3, paredes: 4, tramo: 2 },
}

const clave = (c, r) => `${c},${r}`

function entero(min, max, rand) {
  return min + Math.floor(rand() * (max - min + 1))
}

function barajar(arr, rand) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Simulación ───────────────────────────────────────────────────────────────
// Sigue el rayo casilla a casilla. Devuelve las casillas recorridas (con los
// espejos en los que rebota) y cómo termina:
//   'sensor' → llega al sensor · 'pared' → choca · 'fuera' → sale del tablero
//   'bucle'  → vuelve a pasar igual por el mismo sitio (no debería darse con
//              espejos de dos caras, pero se corta por seguridad)
// `salida`: si sale del tablero, por qué borde ({ c, r, dir } de la última
// casilla y la dirección con la que sale).
export function simular(tablero, orient) {
  const { cols, rows, laser, sensor, espejos = [], paredes = [] } = tablero
  const espejoEn = new Map(espejos.map(e => [clave(e.c, e.r), e]))
  const paredEn = new Set(paredes.map(p => clave(p.c, p.r)))
  let { c, r, dir } = laser // primera casilla DENTRO del tablero
  const camino = []
  const vistos = new Set()
  for (let paso = 0; paso < cols * rows * 4 + 4; paso++) {
    if (c < 0 || r < 0 || c >= cols || r >= rows) {
      const ultima = camino[camino.length - 1]
      return { camino, fin: 'fuera', salida: ultima ? { c: ultima.c, r: ultima.r, dir } : null }
    }
    const k = clave(c, r)
    if (paredEn.has(k)) return { camino, fin: 'pared', choque: { c, r } }
    if (sensor && sensor.c === c && sensor.r === r) {
      camino.push({ c, r, dir })
      return { camino, fin: 'sensor' }
    }
    const estado = `${k}|${dir}`
    if (vistos.has(estado)) return { camino, fin: 'bucle' }
    vistos.add(estado)
    const e = espejoEn.get(k)
    if (e) {
      const nuevo = reflejar(orient[e.id], dir)
      camino.push({ c, r, dir, espejo: e.id, sale: nuevo })
      dir = nuevo
    } else {
      camino.push({ c, r, dir })
    }
    c += DIRS[dir].dc
    r += DIRS[dir].dr
  }
  return { camino, fin: 'bucle' }
}

export const resuelto = (tablero, orient) => simular(tablero, orient).fin === 'sensor'

// Mínimo de espejos que hay que girar desde `orient` para resolverlo (fuerza
// bruta: como mucho 2^8 combinaciones). Sirve para dar el bonus de "a la
// primera" y para asegurarse de que el tablero no empieza resuelto.
export function minimoGiros(tablero, orient) {
  const ids = tablero.espejos.map(e => e.id)
  let mejor = Infinity
  for (let m = 0; m < 1 << ids.length; m++) {
    const o = { ...orient }
    let giros = 0
    ids.forEach((id, i) => {
      if (m & (1 << i)) { o[id] = o[id] === '/' ? '\\' : '/'; giros++ }
    })
    if (giros < mejor && resuelto(tablero, o)) mejor = giros
  }
  return mejor
}

// ── Generación ───────────────────────────────────────────────────────────────
// Traza un camino desde el láser con `giros` cambios de dirección. Devuelve
// las casillas del camino y dónde van los espejos, o null si se atasca (se
// reintenta desde fuera).
function trazarCamino(cols, rows, giros, tramoMax, rand, terminarFuera) {
  // El láser entra por el borde izquierdo (hacia E) o por el de abajo (hacia N)
  const porIzquierda = rand() < 0.6
  const laser = porIzquierda
    ? { c: 0, r: entero(0, rows - 1, rand), dir: 'E' }
    : { c: entero(0, cols - 1, rand), r: rows - 1, dir: 'N' }
  const usadas = new Set()
  const camino = []
  const espejos = []
  let { c, r, dir } = laser
  const dentro = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows

  for (let g = 0; g <= giros; g++) {
    const ultimo = g === giros
    // Casillas libres en línea recta a partir de la actual
    const libres = []
    let x = c, y = r
    while (dentro(x, y) && !usadas.has(clave(x, y))) {
      libres.push([x, y])
      x += DIRS[dir].dc; y += DIRS[dir].dr
    }
    if (!libres.length) return null
    if (ultimo && terminarFuera) {
      // Examen: el rayo recorre todas las libres y sale por el borde… salvo
      // que choque con una casilla ya usada: entonces no vale.
      if (dentro(x, y)) return null
      libres.forEach(([a, b]) => { usadas.add(clave(a, b)); camino.push({ c: a, r: b }) })
      return { laser, camino, espejos, salida: { c: x - DIRS[dir].dc, r: y - DIRS[dir].dr, dir } }
    }
    // Longitud del tramo: se para en un espejo (o en el sensor si es el último)
    const largo = entero(1, Math.min(tramoMax, libres.length), rand)
    const tramo = libres.slice(0, largo)
    tramo.forEach(([a, b]) => { usadas.add(clave(a, b)); camino.push({ c: a, r: b }) })
    const [fc, fr] = tramo[tramo.length - 1]
    if (ultimo) return { laser, camino, espejos, sensor: { c: fc, r: fr } }
    // Giro a izquierda o derecha (perpendicular), hacia donde haya hueco
    const opciones = dir === 'E' || dir === 'W' ? ['N', 'S'] : ['E', 'W']
    const validas = barajar(opciones, rand).filter(d => {
      const nx = fc + DIRS[d].dc, ny = fr + DIRS[d].dr
      return dentro(nx, ny) && !usadas.has(clave(nx, ny))
    })
    if (!validas.length) return null
    const sale = validas[0]
    espejos.push({ c: fc, r: fr, tipo: espejoPara(dir, sale) })
    dir = sale
    c = fc + DIRS[sale].dc; r = fr + DIRS[sale].dr
  }
  return null
}

function rellenar(cols, rows, ocupadas, n, rand) {
  const libres = []
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) if (!ocupadas.has(clave(c, r))) libres.push({ c, r })
  return barajar(libres, rand).slice(0, n)
}

// Un tablero de juego: láser, sensor, espejos (con la solución) y paredes.
export function nuevoTablero(nivel = 'facil', rand = Math.random) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (let intento = 0; intento < 400; intento++) {
    const giros = entero(cfg.giros[0], cfg.giros[1], rand)
    const traza = trazarCamino(cfg.cols, cfg.rows, giros, cfg.tramo, rand, false)
    if (!traza) continue
    // El sensor no puede estar pegado al láser: al menos 3 casillas de camino
    if (traza.camino.length < 3) continue
    const ocupadas = new Set(traza.camino.map(p => clave(p.c, p.r)))
    const senuelos = rellenar(cfg.cols, cfg.rows, ocupadas, cfg.senuelos, rand)
    senuelos.forEach(p => ocupadas.add(clave(p.c, p.r)))
    // Las paredes tampoco pueden ir en la casilla por la que entra el láser
    const paredes = rellenar(cfg.cols, cfg.rows, ocupadas, cfg.paredes, rand)
    const espejos = [
      ...traza.espejos.map(e => ({ c: e.c, r: e.r, solucion: e.tipo })),
      ...senuelos.map(p => ({ c: p.c, r: p.r, solucion: null })),
    ].map((e, i) => ({ ...e, id: `m${i}` }))
    const tablero = { cols: cfg.cols, rows: cfg.rows, laser: traza.laser, sensor: traza.sensor, espejos, paredes }
    // Orientación inicial desordenada, y que NO empiece resuelto
    const orient = Object.fromEntries(espejos.map(e => [e.id, rand() < 0.5 ? '/' : '\\']))
    if (resuelto(tablero, orient)) {
      const e = espejos.find(m => m.solucion)
      orient[e.id] = e.solucion === '/' ? '\\' : '/'
      if (resuelto(tablero, orient)) continue
    }
    const minimo = minimoGiros(tablero, orient)
    if (!Number.isFinite(minimo) || minimo === 0) continue
    return { tablero, orient, minimo }
  }
  throw new Error('rayoLuz: no se pudo generar un tablero')
}

// ── Examen: ¿por qué salida sale el rayo? ────────────────────────────────────
// Espejos fijos y cuatro salidas marcadas A-D en el borde; una es la buena.
export const NIVELES_EXAMEN = {
  facil:   { cols: 5, rows: 5, giros: [1, 2], senuelos: 0, tramo: 3 },
  medio:   { cols: 5, rows: 6, giros: [2, 3], senuelos: 2, tramo: 3 },
  dificil: { cols: 6, rows: 6, giros: [3, 4], senuelos: 3, tramo: 2 },
}

// Todas las salidas posibles del tablero: cada casilla del borde, con la
// dirección que la saca fuera.
function salidasDelBorde(cols, rows) {
  const s = []
  for (let c = 0; c < cols; c++) { s.push({ c, r: 0, dir: 'N' }); s.push({ c, r: rows - 1, dir: 'S' }) }
  for (let r = 0; r < rows; r++) { s.push({ c: 0, r, dir: 'W' }); s.push({ c: cols - 1, r, dir: 'E' }) }
  return s
}

const mismaSalida = (a, b) => a.c === b.c && a.r === b.r && a.dir === b.dir

export function rondaExamen(nivel = 'facil', rand = Math.random) {
  const cfg = NIVELES_EXAMEN[nivel] ?? NIVELES_EXAMEN.facil
  for (let intento = 0; intento < 400; intento++) {
    const giros = entero(cfg.giros[0], cfg.giros[1], rand)
    const traza = trazarCamino(cfg.cols, cfg.rows, giros, cfg.tramo, rand, true)
    if (!traza || traza.camino.length < 3) continue
    const ocupadas = new Set(traza.camino.map(p => clave(p.c, p.r)))
    const senuelos = rellenar(cfg.cols, cfg.rows, ocupadas, cfg.senuelos, rand)
    const espejos = [
      ...traza.espejos.map(e => ({ c: e.c, r: e.r, tipo: e.tipo })),
      ...senuelos.map(p => ({ c: p.c, r: p.r, tipo: rand() < 0.5 ? '/' : '\\' })),
    ].map((e, i) => ({ ...e, id: `m${i}` }))
    const tablero = { cols: cfg.cols, rows: cfg.rows, laser: traza.laser, sensor: null, espejos, paredes: [] }
    const orient = Object.fromEntries(espejos.map(e => [e.id, e.tipo]))
    const sim = simular(tablero, orient)
    if (sim.fin !== 'fuera' || !mismaSalida(sim.salida, traza.salida)) continue
    // Tres salidas señuelo: ni la buena ni la del láser (por donde entra)
    const entradaLaser = { c: traza.laser.c, r: traza.laser.r, dir: traza.laser.dir === 'E' ? 'W' : 'S' }
    const otras = barajar(salidasDelBorde(cfg.cols, cfg.rows)
      .filter(s => !mismaSalida(s, traza.salida) && !mismaSalida(s, entradaLaser)), rand).slice(0, 3)
    const letras = ['A', 'B', 'C', 'D']
    const salidas = barajar([traza.salida, ...otras], rand).map((s, i) => ({ ...s, letra: letras[i] }))
    const correcta = salidas.find(s => mismaSalida(s, traza.salida)).letra
    return { tablero, orient, salidas, correcta }
  }
  throw new Error('rayoLuz: no se pudo generar la ronda de examen')
}
