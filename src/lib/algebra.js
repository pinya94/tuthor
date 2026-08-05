// Balanza Algebraica — resolver ecuaciones lineales con el "método de la balanza".
// Lógica pura (sin React), 100% determinista.
//
// La ecuación m_L·x + k_L = m_R·x + k_R es una balanza SIEMPRE equilibrada: el
// jugador aplica la MISMA operación a los dos lados (quitar un término, dividir)
// hasta dejar la x sola. Como toda operación se hace a ambos lados, la igualdad
// se conserva: llegar a x = n significa que n ES la solución (exacta).
//
// Se genera desde la solución entera x0, así siempre hay un camino con enteros:
// cancelar constantes y términos en x (restándolos a ambos lados) y una división
// final exacta por el coeficiente de la x.

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const nz = (a, b, rand) => { let v; do { v = rnd(a, b, rand) } while (v === 0); return v }

// ── Estado de la ecuación ──────────────────────────────────────────────────────
// { L:{m,k}, R:{m,k} }  →  m·x + k en cada lado.

// Texto de un lado: 2x + 3, −x, 5, 3x − 4 …
export function sideText({ m, k }) {
  if (m === 0) return String(k)
  const mx = m === 1 ? 'x' : m === -1 ? '−x' : `${m < 0 ? '−' : ''}${Math.abs(m)}x`
  if (k === 0) return mx
  return `${mx} ${k < 0 ? '−' : '+'} ${Math.abs(k)}`
}

export function eqText(state) {
  return `${sideText(state.L)} = ${sideText(state.R)}`
}

// Términos "tocables" de un lado (para pintar chips): x-term y/o constante ≠ 0.
export function sideTerms(side) {
  const terms = []
  if (side.m !== 0) terms.push({ kind: 'x', value: side.m })
  if (side.k !== 0) terms.push({ kind: 'k', value: side.k })
  return terms
}

// ¿Se puede dividir? Un lado es m·x puro (k=0) y el otro constante puro (m=0),
// y el coeficiente divide exacto a la constante.
export function canDivide(state) {
  const { L, R } = state
  // Forma m·x = k (un lado x puro, el otro constante). Se puede dividir salvo que
  // el coeficiente ya sea 1 (entonces la x ya está sola). El −1 sí divide: ÷(−1).
  if (L.m !== 0 && L.k === 0 && R.m === 0) return L.m !== 1 && R.k % L.m === 0
  if (R.m !== 0 && R.k === 0 && L.m === 0) return R.m !== 1 && L.k % R.m === 0
  return false
}

export function coefToDivide(state) {
  const { L, R } = state
  if (L.m !== 0 && L.k === 0 && R.m === 0) return L.m
  if (R.m !== 0 && R.k === 0 && L.m === 0) return R.m
  return null
}

export function divide(state) {
  const M = coefToDivide(state)
  if (!M) return { state, label: '' }
  const div = s => ({ m: s.m / M, k: s.k / M })
  return { state: { ...state, L: div(state.L), R: div(state.R) }, label: `÷ ${M} (a los dos lados)` }
}

// Resuelta: un lado es exactamente x (m=1, k=0) y el otro una constante.
export function isSolved(state) {
  const { L, R } = state
  return (L.m === 1 && L.k === 0 && R.m === 0) || (R.m === 1 && R.k === 0 && L.m === 0)
}

export function solvedValue(state) {
  const { L, R } = state
  if (L.m === 1 && L.k === 0 && R.m === 0) return R.k
  if (R.m === 1 && R.k === 0 && L.m === 0) return L.k
  return null
}

// ── Operaciones ofrecidas ─────────────────────────────────────────────────────
// El jugador NO toca los términos: elige la operación que aplica a los dos
// lados ("restar 4 a los dos lados"). Así tiene que leer la ecuación y nombrar
// el paso, en vez de ir tocando fichas hasta que salga.
//
// Todas las opciones son legales y mantienen enteros: la balanza sigue
// equilibrada elijas la que elijas, y la solución no cambia. Solo algunas
// acercan la x (`helps`), y elegir una que no ayuda enseña justamente eso —
// sumar lo que querías restar deja la ecuación peor, y se ve.

function opText(op) {
  const n = Math.abs(op.amount)
  const t = op.isX ? `${n}x` : `${n}`
  if (op.op === 'div') return {
    es: `Dividir entre ${op.amount} los dos lados`,
    en: `Divide both sides by ${op.amount}`,
    ca: `Dividir entre ${op.amount} els dos costats`,
  }
  if (op.op === 'sub') return {
    es: `Restar ${t} a los dos lados`,
    en: `Subtract ${t} from both sides`,
    ca: `Restar ${t} als dos costats`,
  }
  return {
    es: `Sumar ${t} a los dos lados`,
    en: `Add ${t} to both sides`,
    ca: `Sumar ${t} als dos costats`,
  }
}

const mkOp = (op, amount, isX, helps) => {
  const o = { id: `${op}:${amount}:${isX ? 'x' : 'k'}`, op, amount: Math.abs(amount), isX, helps }
  return { ...o, label: opText({ ...o, amount: op === 'div' ? amount : Math.abs(amount) }) }
}

// Hash estable: el orden de las opciones no puede cambiar entre renders, pero
// tampoco debe salir siempre la correcta la primera.
function hash(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function availableOps(state) {
  const { L, R } = state
  // Valores distintos presentes en la ecuación (un término por valor y tipo)
  const seen = new Set()
  const terms = []
  for (const side of [L, R]) {
    for (const [isX, v] of [[true, side.m], [false, side.k]]) {
      const key = `${isX}:${v}`
      if (v === 0 || seen.has(key)) continue
      seen.add(key)
      terms.push({ isX, v })
    }
  }

  const ops = []
  for (const { isX, v } of terms) {
    // Cancelar el término: restarlo si es positivo, sumarlo si es negativo
    ops.push(mkOp(v > 0 ? 'sub' : 'add', v, isX, true))
    // El error clásico: hacer la operación contraria (lo duplica)
    ops.push(mkOp(v > 0 ? 'add' : 'sub', v, isX, false))
  }
  if (canDivide(state)) ops.push(mkOp('div', coefToDivide(state), false, true))

  // Todas las que ayudan + distractores hasta 4, en orden estable pero variado
  const sig = eqText(state)
  const by = a => hash(a.id + sig)
  const utiles = ops.filter(o => o.helps).sort((a, b) => by(a) - by(b))
  const otras = ops.filter(o => !o.helps).sort((a, b) => by(a) - by(b))
  const total = Math.max(4, utiles.length)
  return [...utiles, ...otras.slice(0, Math.max(0, total - utiles.length))]
    .sort((a, b) => by(a) - by(b))
}

export function applyOp(state, op) {
  const { L, R } = state
  if (op.op === 'div') return divide(state)
  const d = op.op === 'sub' ? -op.amount : op.amount
  const nl = { ...L }, nr = { ...R }
  if (op.isX) { nl.m += d; nr.m += d } else { nl.k += d; nr.k += d }
  return { state: { ...state, L: nl, R: nr }, label: `${op.op === 'sub' ? '−' : '+'} ${op.amount}${op.isX ? 'x' : ''} (a los dos lados)` }
}

// ── Generador ─────────────────────────────────────────────────────────────────
const POOLS = { facil: ['simple'], medio: ['simple', 'both'], dificil: ['both', 'bothNeg'] }

function build(tier, L, R, x0) {
  return { tier, L: { ...L }, R: { ...R }, start: { L: { ...L }, R: { ...R } }, solution: x0 }
}

export function genRound(uiDiff = 'facil', rand = Math.random) {
  const kind = POOLS[uiDiff] ? POOLS[uiDiff][rnd(0, POOLS[uiDiff].length - 1, rand)] : 'simple'
  const x0 = nz(-6, 6, rand)

  if (kind === 'simple') {
    // a·x + b = c   (una sola x; hay que cancelar b y dividir por a)
    const a = rnd(2, 5, rand)
    const b = nz(-8, 8, rand)
    return build(uiDiff, { m: a, k: b }, { m: 0, k: a * x0 + b }, x0)
  }
  if (kind === 'both') {
    // a·x + b = c·x + d   con a > c (x a ambos lados)
    const a = rnd(3, 6, rand)
    const c = rnd(1, a - 1, rand)
    const b = nz(-8, 8, rand)
    const d = a * x0 + b - c * x0
    return build(uiDiff, { m: a, k: b }, { m: c, k: d }, x0)
  }
  // bothNeg: c > a (al cancelar la x queda en el otro lado); constantes mayores
  const a = rnd(1, 4, rand)
  const c = rnd(a + 1, 7, rand)
  const b = nz(-10, 10, rand)
  const d = a * x0 + b - c * x0
  return build(uiDiff, { m: a, k: b }, { m: c, k: d }, x0)
}
