// Fuerza Neta — lógica pura (sin React). La usan la página del juego
// (src/pages/FuerzaNeta.jsx) y el reto diario (src/pages/PreguntaDiaria.jsx).
// Modelo: fuerzas cardinales y diagonales (45°) sobre una caja; la respuesta es
// la dirección de la fuerza neta (8 direcciones + equilibrio), por signo del neto.
// Una diagonal de F newtons empuja F·cos 45° ≈ 0,71·F en cada eje (NO F entera:
// así lo calculaba al principio y el nivel difícil daba respuestas falsas).

// Convención física: +x derecha, +y arriba.
export const DIRS = {
  E:  { dx: 1,  dy: 0,  arrow: '→', label: { es: 'Derecha', en: 'Right', ca: 'Dreta' } },
  W:  { dx: -1, dy: 0,  arrow: '←', label: { es: 'Izquierda', en: 'Left', ca: 'Esquerra' } },
  N:  { dx: 0,  dy: 1,  arrow: '↑', label: { es: 'Arriba', en: 'Up', ca: 'Amunt' } },
  S:  { dx: 0,  dy: -1, arrow: '↓', label: { es: 'Abajo', en: 'Down', ca: 'Avall' } },
  NE: { dx: 1,  dy: 1,  arrow: '↗', label: { es: 'Arriba-derecha', en: 'Up-right', ca: 'Amunt-dreta' } },
  NW: { dx: -1, dy: 1,  arrow: '↖', label: { es: 'Arriba-izquierda', en: 'Up-left', ca: 'Amunt-esquerra' } },
  SE: { dx: 1,  dy: -1, arrow: '↘', label: { es: 'Abajo-derecha', en: 'Down-right', ca: 'Avall-dreta' } },
  SW: { dx: -1, dy: -1, arrow: '↙', label: { es: 'Abajo-izquierda', en: 'Down-left', ca: 'Avall-esquerra' } },
  STILL: { dx: 0, dy: 0, arrow: '⚖️', label: { es: 'No se mueve (equilibrio)', en: 'It stays still (balanced)', ca: 'No es mou (equilibri)' } },
}

const CARDINAL = ['E', 'W', 'N', 'S']
const DIAGONAL = ['NE', 'NW', 'SE', 'SW']
const FULL_POOL = ['E', 'W', 'N', 'S', 'NE', 'NW', 'SE', 'SW', 'STILL']

export function answerFromNet(nx, ny) {
  const sx = Math.sign(nx), sy = Math.sign(ny)
  if (sx === 0 && sy === 0) return 'STILL'
  if (sx > 0 && sy === 0) return 'E'
  if (sx < 0 && sy === 0) return 'W'
  if (sx === 0 && sy > 0) return 'N'
  if (sx === 0 && sy < 0) return 'S'
  if (sx > 0 && sy > 0) return 'NE'
  if (sx < 0 && sy > 0) return 'NW'
  if (sx > 0 && sy < 0) return 'SE'
  return 'SW'
}

// PRNG determinista (mulberry32) para el reto diario: misma semilla → misma
// ronda para todos ese día. El juego normal usa Math.random (rand por defecto).
export function makeRng(seed) {
  let t = (seed >>> 0) + 0x6D2B79F5
  return function () {
    t = (t + 0x6D2B79F5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const shuffle = (arr, rand) => [...arr].sort(() => rand() - 0.5)

function magFor(type, rand) {
  const max = { easy: 4, medium: 5, hard: 6, expert: 6, master: 7 }[type] ?? 5
  return rnd(1, max, rand) * 10
}

function buildOptions(answer, count, pool, rand) {
  const opts = new Set([answer])
  const rest = shuffle(pool.filter(x => x !== answer), rand)
  while (opts.size < count && rest.length) opts.add(rest.pop())
  return shuffle([...opts], rand)
}

// Cada nivel de la UI mezcla varios "tipos" de ronda al azar → variedad.
const TYPE_POOLS = {
  facil:   ['easy'],
  medio:   ['medium', 'hard'],
  dificil: ['expert', 'master'],
}

export function genRound(uiDiff, rand = Math.random) {
  const pool = TYPE_POOLS[uiDiff] || ['easy']
  return genByType(pool[rnd(0, pool.length - 1, rand)], rand)
}

// Componente de una fuerza en un eje: entera si es cardinal, ·cos 45° si es diagonal.
const DIAG = Math.SQRT1_2
const esDiagonal = dir => DIRS[dir].dx !== 0 && DIRS[dir].dy !== 0
export const componente = (f, axis) => (axis === 'H' ? DIRS[f.dir].dx : DIRS[f.dir].dy) * f.mag * (esDiagonal(f.dir) ? DIAG : 1)

function genByType(type, rand) {
  for (;;) {
    const r = intentaRonda(type, rand)
    if (r) return r
  }
}

function intentaRonda(type, rand) {
  const forces = []
  let pool = FULL_POOL
  if (type === 'easy') {
    const axis = rand() < 0.5 ? ['E', 'W'] : ['N', 'S']
    for (let i = 0; i < 2; i++) forces.push({ dir: axis[rnd(0, 1, rand)], mag: magFor('easy', rand) })
    pool = [...axis, 'STILL']
  } else if (type === 'medium') {
    const n = rnd(2, 3, rand)
    for (let i = 0; i < n; i++) forces.push({ dir: CARDINAL[rnd(0, 3, rand)], mag: magFor('medium', rand) })
  } else if (type === 'hard') {
    const n = rnd(3, 4, rand)
    for (let i = 0; i < n; i++) forces.push({ dir: CARDINAL[rnd(0, 3, rand)], mag: magFor('hard', rand) })
  } else if (type === 'expert') {
    const n = rnd(2, 3, rand)
    for (let i = 0; i < n; i++) forces.push({ dir: CARDINAL[rnd(0, 3, rand)], mag: magFor('expert', rand) })
    forces.push({ dir: DIAGONAL[rnd(0, 3, rand)], mag: magFor('expert', rand) })
  } else { // master
    const nc = rnd(2, 3, rand), nd = rnd(1, 2, rand)
    for (let i = 0; i < nc; i++) forces.push({ dir: CARDINAL[rnd(0, 3, rand)], mag: magFor('master', rand) })
    for (let i = 0; i < nd; i++) forces.push({ dir: DIAGONAL[rnd(0, 3, rand)], mag: magFor('master', rand) })
  }
  const shuffled = shuffle(forces, rand)
  // El neto de cada eje es exacto 0 solo si se anulan las cardinales entre sí
  // y las diagonales entre sí; si no, tiene que quedar claro (|neto| ≥ 3 N)
  // para que el redondeo no decida la respuesta.
  const neto = axis => {
    const card = shuffled.filter(f => !esDiagonal(f.dir)).reduce((a, f) => a + componente(f, axis), 0)
    const diag = shuffled.filter(f => esDiagonal(f.dir)).reduce((a, f) => a + (axis === 'H' ? DIRS[f.dir].dx : DIRS[f.dir].dy) * f.mag, 0)
    if (card === 0 && diag === 0) return 0
    const v = card + diag * DIAG
    return Math.abs(v) < 3 ? null : v
  }
  const nx = neto('H'), ny = neto('V')
  if (nx == null || ny == null) return null
  const answer = answerFromNet(nx, ny)
  const count = type === 'easy' ? 3 : type === 'medium' || type === 'hard' ? 4 : 5
  return { forces: shuffled, netX: nx, netY: ny, answer, options: buildOptions(answer, count, pool, rand) }
}

// Desglose de un eje ('H'|'V') para el feedback: "+40 −10 = +30". Las
// diagonales aportan a los dos ejes unas 7 décimas de su valor y van con «≈»:
// "+40 ≈−35 ≈ +5".
export function axisBreakdown(forces, axis) {
  const contribs = forces
    .map(f => ({ v: componente(f, axis), aprox: esDiagonal(f.dir) }))
    .filter(c => c.v !== 0)
  if (contribs.length === 0) return '0'
  const aprox = contribs.some(c => c.aprox)
  const fmt = (v, a) => `${a ? '≈' : ''}${v > 0 ? '+' : '−'}${Math.round(Math.abs(v))}`
  const sum = contribs.reduce((a, c) => a + c.v, 0)
  const r = Math.round(sum)
  const sumStr = Math.abs(sum) < 1e-9 ? '0' : r > 0 ? `+${r}` : `−${Math.abs(r)}`
  const parts = contribs.map(c => fmt(c.v, c.aprox))
  return parts.length > 1 ? `${parts.join(' ')} ${aprox && sumStr !== '0' ? '≈' : '='} ${sumStr}` : parts[0]
}
