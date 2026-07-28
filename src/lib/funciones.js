// Caza la Función — matemáticas, lógica pura (sin React), 100% determinista.
//
// Se dibuja una función OBJETIVO en la cuadrícula y el jugador ajusta los
// parámetros (m, b en una recta; a, b, c en una parábola) hasta que su curva
// encaja exactamente sobre la objetivo. Como cada conjunto de parámetros da
// una curva distinta dentro de su familia, "encajar la curva" equivale a
// "acertar los parámetros": correcto = todos los parámetros coinciden.
//
// La función objetivo se genera desde parámetros enteros, así que la respuesta
// correcta siempre existe y es exacta (no hay curvas ambiguas ni redondeos).

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]
const pickNonZero = (a, b, rand) => { let v; do { v = rnd(a, b, rand) } while (v === 0); return v }

// Valor de la función objetivo en x.
export function evalFn(round, x) {
  const t = round.target
  return round.kind === 'linear' ? t.m * x + t.b : t.a * x * x + (t.b || 0) * x + t.c
}

// Valor de la curva del jugador (con sus parámetros actuales) en x.
export function evalWith(round, p, x) {
  return round.kind === 'linear' ? p.m * x + p.b : (p.a || 0) * x * x + (p.b || 0) * x + (p.c || 0)
}

// Correcto: todos los parámetros ajustables coinciden con la función objetivo.
export function isCorrectParams(round, p) {
  return round.controls.every(c => p[c.key] === round.target[c.key])
}

// Cuántos parámetros ha acertado ya (para el feedback / marcador).
export function matchInfo(round, p) {
  return round.controls.map(c => ({ key: c.key, ok: p[c.key] === round.target[c.key] }))
}

// ── Formateo de la ecuación: y = 2x − 3, y = −x, y = x² − 2x + 1 … ────────────
const MINUS = '−'
function firstTerm(coef, suffix) {
  if (coef === 0) return ''
  const mag = Math.abs(coef) === 1 && suffix ? '' : String(Math.abs(coef))
  return `${coef < 0 ? MINUS : ''}${mag}${suffix}`
}
function nextTerm(coef, suffix) {
  if (coef === 0) return ''
  const mag = Math.abs(coef) === 1 && suffix ? '' : String(Math.abs(coef))
  return ` ${coef < 0 ? MINUS : '+'} ${mag}${suffix}`
}

// Devuelve las partes de la ecuación (para render con superíndice del x²).
export function fnParts(kind, p) {
  if (kind === 'linear') {
    if (p.m === 0) return [{ text: `y = ${p.b}` }]
    let s = firstTerm(p.m, 'x')
    if (p.b !== 0) s += nextTerm(p.b, '')
    return [{ text: `y = ${s}` }]
  }
  // Cuadrática: construir con el x² como parte marcable.
  const a = p.a || 0, b = p.b || 0, c = p.c || 0
  const seg = []
  if (a !== 0) {
    const aCoef = `${a < 0 ? MINUS : ''}${Math.abs(a) === 1 ? '' : Math.abs(a)}`
    seg.push({ text: `y = ${aCoef}` }, { text: 'x', sup: '2' })
    if (b !== 0) seg.push({ text: nextTerm(b, 'x') })
    if (c !== 0) seg.push({ text: nextTerm(c, '') })
    return seg
  }
  // a = 0 → es una recta
  if (b !== 0) {
    let s = `y = ${firstTerm(b, 'x')}`
    if (c !== 0) s += nextTerm(c, '')
    return [{ text: s }]
  }
  return [{ text: `y = ${c}` }]
}

// Texto plano de la ecuación (para aria / tests).
export function fnText(kind, p) {
  return fnParts(kind, p).map(s => s.text + (s.sup ? `^${s.sup}` : '')).join('')
}

// ── Generador ─────────────────────────────────────────────────────────────────
// Rango del plano dibujado (x, y ∈ [-VIEW, VIEW]).
export const VIEW = 7

function linearRound(tier, mRange, bRange, rand) {
  return {
    kind: 'linear', tier,
    target: { m: pickNonZero(-mRange, mRange, rand), b: rnd(-bRange, bRange, rand) },
    params0: { m: 0, b: 0 },
    controls: [
      { key: 'm', label: { es: 'm · pendiente', en: 'm · slope', ca: 'm · pendent' }, min: -(mRange + 1), max: mRange + 1 },
      { key: 'b', label: { es: 'b · ordenada', en: 'b · intercept', ca: 'b · ordenada' }, min: -(bRange + 1), max: bRange + 1 },
    ],
  }
}

function quadRound(tier, withB, rand) {
  const target = { a: pick([-2, -1, 1, 2], rand), b: withB ? rnd(-3, 3, rand) : 0, c: rnd(-4, 4, rand) }
  const controls = [
    { key: 'a', label: { es: 'a · abertura', en: 'a · opening', ca: 'a · obertura' }, min: -3, max: 3 },
  ]
  if (withB) controls.push({ key: 'b', label: { es: 'b · inclinación', en: 'b · tilt', ca: 'b · inclinació' }, min: -4, max: 4 })
  controls.push({ key: 'c', label: { es: 'c · altura', en: 'c · height', ca: 'c · alçada' }, min: -5, max: 5 })
  return { kind: 'quad', tier, target, params0: { a: 0, b: 0, c: 0 }, controls }
}

const POOLS = {
  facil:   ['lin1'],
  medio:   ['lin2', 'quadC'],
  dificil: ['quad'],
}

export function genRound(uiDiff = 'facil', rand = Math.random) {
  const kind = pick(POOLS[uiDiff] || POOLS.facil, rand)
  if (kind === 'lin1') return linearRound('facil', 3, 5, rand)
  if (kind === 'lin2') return linearRound('medio', 4, 6, rand)
  if (kind === 'quadC') return quadRound('medio', false, rand)
  return quadRound('dificil', true, rand)
}
