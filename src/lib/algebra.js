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

// Quitar un término (restarlo a los dos lados). Devuelve {state, label}.
export function removeTerm(state, sideKey, kind) {
  const L = { ...state.L }, R = { ...state.R }
  const v = state[sideKey][kind === 'x' ? 'm' : 'k']
  if (kind === 'x') { L.m -= v; R.m -= v } else { L.k -= v; R.k -= v }
  const label = kind === 'x'
    ? `${v < 0 ? '+' : '−'} ${Math.abs(v)}x`
    : `${v < 0 ? '+' : '−'} ${Math.abs(v)}`
  return { state: { ...state, L, R }, label: `${label} (a los dos lados)` }
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
