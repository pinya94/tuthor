// Caza la Raíz: ecuaciones de segundo grado. Se marcan las soluciones en el
// eje X (o se dice que no hay solución real) y, al corregir, se dibuja la
// parábola y = ax² + bx + c cortando el eje justo en esas raíces.
//
//   facil    incompletas: ax² + c = 0 (raíz con dos signos, o sin solución)
//            y ax² + bx = 0 (factor común: siempre sale x = 0)
//   medio    completas con a = 1 (fórmula); alguna con solución doble o
//            sin solución real
//   dificil  a ≠ 1 (también negativo) y la ecuación sin ordenar: hay que
//            pasar todo a un lado antes de usar la fórmula
//
// Todas las raíces son enteras y caben en el eje (−8…8), así que el
// discriminante es siempre un cuadrado perfecto cuando hay solución.

export const MIN = -8, MAX = 8

export const NIVELES = {
  facil: { tipos: ['sinB', 'sinC'] },
  medio: { tipos: ['completa'] },
  dificil: { tipos: ['completa'] },
}

const ent = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]
const noCero = (rand, a, b) => { for (;;) { const v = ent(rand, a, b); if (v !== 0) return v } }

// Raíces reales enteras de ax² + bx + c = 0, ordenadas y sin repetir
export function raicesDe({ a, b, c }) {
  const d = b * b - 4 * a * c
  if (d < 0) return []
  const s = Math.round(Math.sqrt(d))
  if (s * s !== d) return null // no entera: no debería salir nunca
  const r = [(-b - s) / (2 * a), (-b + s) / (2 * a)]
  if (!r.every(Number.isInteger)) return null
  return [...new Set(r)].sort((x, y) => x - y)
}
export const valor = ({ a, b, c }, x) => a * x * x + b * x + c

function generar(nivel, rand) {
  if (nivel === 'facil') {
    const a = elige(rand, [1, 1, 2, 3])
    const t = rand()
    if (t < 0.45) { // ax² + bx = 0 → x = 0 y x = r
      const r = noCero(rand, -8, 8)
      return { a, b: -a * r, c: 0, tipo: 'sinC' }
    }
    if (t < 0.9) { // ax² − a·r² = 0 → x = ±r
      const r = ent(rand, 1, a === 1 ? 8 : 6)
      return { a, b: 0, c: -a * r * r, tipo: 'sinB' }
    }
    const k = elige(rand, [1, 4, 9, 16, 25]) // ax² + c = 0 con c > 0: sin solución
    return { a, b: 0, c: a === 1 ? k : a * k, tipo: 'sinB' }
  }
  const a = nivel === 'medio' ? 1 : elige(rand, [2, 2, 3, -1, -2])
  const lim = nivel === 'medio' ? 8 : 6
  const t = rand()
  if (t < 0.12) { // sin solución real: b² < 4ac
    for (;;) {
      const b = ent(rand, -6, 6), c = ent(rand, 1, 20) * Math.sign(a)
      if (b !== 0 && b * b - 4 * a * c < 0) return { a, b, c, tipo: 'completa' }
    }
  }
  if (t < 0.27) { // solución doble
    const r = noCero(rand, -lim, lim)
    return { a, b: -2 * a * r, c: a * r * r, tipo: 'completa' }
  }
  for (;;) { // dos raíces distintas, sin que falte b ni c
    const r1 = noCero(rand, -lim, lim), r2 = noCero(rand, -lim, lim)
    if (r1 === r2 || r1 + r2 === 0) continue
    return { a, b: -a * (r1 + r2), c: a * r1 * r2, tipo: 'completa' }
  }
}

// En difícil, la ecuación aparece sin ordenar (términos al otro lado)
const FORMAS = ['estandar', 'pasaC', 'pasaBC', 'pasaB']

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  for (let i = 0; i < 200; i++) {
    const e = generar(nivel, rand)
    const raices = raicesDe(e)
    if (raices === null || raices.some(r => r < MIN || r > MAX)) continue
    let forma = 'estandar'
    if (nivel === 'dificil' && rand() < 0.7) forma = elige(rand, FORMAS.slice(1))
    const id = `${nivel}:${e.a},${e.b},${e.c}:${forma}`
    return { id, nivel, ...e, forma, raices }
  }
  throw new Error('caza-la-raiz: no se pudo generar')
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuesta: «r:2,3» (raíces marcadas, en cualquier orden) o «n» (sin solución real)
export const clave = r => (r.raices.length ? `r:${r.raices.join(',')}` : 'n')
export function respuesta(xs) {
  if (xs === 'n') return 'n'
  return `r:${[...new Set(xs)].sort((x, y) => x - y).join(',')}`
}
export function esCorrecta(r, x) {
  if (!x) return false
  return x === clave(r)
}

// ── Textos ────────────────────────────────────────────────────────────────
const MENOS = '−'
export const num = n => (n < 0 ? `${MENOS}${-n}` : `${n}`)

// «2x² − 5x + 3», «−x² + 4», «3x² + 12x»; los términos se dan como [coef, grado]
export function poli(terminos) {
  const t = terminos.filter(([k]) => k !== 0)
  if (!t.length) return '0'
  return t.map(([k, g], i) => {
    const v = g === 2 ? 'x²' : g === 1 ? 'x' : ''
    const abs = Math.abs(k) === 1 && g > 0 ? v : `${Math.abs(k)}${v}`
    if (i === 0) return k < 0 ? `${MENOS}${abs}` : abs
    return k < 0 ? ` ${MENOS} ${abs}` : ` + ${abs}`
  }).join('')
}
export const ordenada = ({ a, b, c }) => `${poli([[a, 2], [b, 1], [c, 0]])} = 0`

// La ecuación tal como se enseña en la ronda
export function enunciado(r) {
  const { a, b, c } = r
  switch (r.forma) {
    case 'pasaC': return `${poli([[a, 2], [b, 1]])} = ${num(-c)}`
    case 'pasaBC': return `${poli([[a, 2]])} = ${poli([[-b, 1], [-c, 0]])}`
    case 'pasaB': return `${poli([[a, 2], [c, 0]])} = ${poli([[-b, 1]])}`
    default: return ordenada(r)
  }
}

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const lista = (rs, l) => rs.map(x => `x = ${num(x)}`).join(s(l, ' y ', ' and ', ' i '))

export function explicacion(r, l) {
  const { a, b, c, raices } = r
  const partes = []
  if (r.forma !== 'estandar') partes.push(s(l,
    `Primero se pasa todo a un lado: ${ordenada(r)}.`,
    `First move everything to one side: ${ordenada(r)}.`,
    `Primer es passa tot a un costat: ${ordenada(r)}.`))
  if (r.tipo === 'sinB') {
    const q = -c / a
    const paso = a === 1 ? `x² = ${num(q)}` : `${poli([[a, 2]])} = ${num(-c)} → x² = ${num(q)}`
    if (q < 0) partes.push(s(l,
      `Es incompleta (falta el término en x): ${paso}. Ningún número al cuadrado da negativo, así que no tiene solución real: la parábola no toca el eje X.`,
      `It is incomplete (no x term): ${paso}. No number squared is negative, so there is no real solution: the parabola never touches the x-axis.`,
      `És incompleta (falta el terme en x): ${paso}. Cap nombre al quadrat dona negatiu, així que no té solució real: la paràbola no toca l’eix X.`))
    else partes.push(s(l,
      `Es incompleta (falta el término en x): ${paso} → x = ±√${q} = ±${raices[1]}. Hay dos soluciones: ${lista(raices, l)}. No olvides la negativa.`,
      `It is incomplete (no x term): ${paso} → x = ±√${q} = ±${raices[1]}. There are two solutions: ${lista(raices, l)}. Do not forget the negative one.`,
      `És incompleta (falta el terme en x): ${paso} → x = ±√${q} = ±${raices[1]}. Hi ha dues solucions: ${lista(raices, l)}. No oblidis la negativa.`))
    return partes.join(' ')
  }
  if (r.tipo === 'sinC') {
    const r0 = -b / a
    partes.push(s(l,
      `Es incompleta (falta el término independiente): se saca factor común, x(${poli([[a, 1], [b, 0]])}) = 0. Un producto vale 0 si uno de los factores vale 0: x = 0 o ${poli([[a, 1], [b, 0]])} = 0 → x = ${num(r0)}.`,
      `It is incomplete (no constant term): factorise, x(${poli([[a, 1], [b, 0]])}) = 0. A product is 0 when one factor is 0: x = 0 or ${poli([[a, 1], [b, 0]])} = 0 → x = ${num(r0)}.`,
      `És incompleta (falta el terme independent): es treu factor comú, x(${poli([[a, 1], [b, 0]])}) = 0. Un producte val 0 si un dels factors val 0: x = 0 o ${poli([[a, 1], [b, 0]])} = 0 → x = ${num(r0)}.`))
    return partes.join(' ')
  }
  const d = b * b - 4 * a * c
  const cuenta = `Δ = b² − 4ac = ${b < 0 ? `(${num(b)})` : b}² − 4·${a < 0 ? `(${num(a)})` : a}·${c < 0 ? `(${num(c)})` : c} = ${num(d)}`
  if (d < 0) partes.push(s(l,
    `${cuenta}. El discriminante es negativo: no hay solución real y la parábola no corta el eje X.`,
    `${cuenta}. The discriminant is negative: there is no real solution and the parabola does not cross the x-axis.`,
    `${cuenta}. El discriminant és negatiu: no hi ha solució real i la paràbola no talla l’eix X.`))
  else if (d === 0) partes.push(s(l,
    `${cuenta}. Con Δ = 0 hay una sola solución (doble): x = −b / 2a = ${num(-b)} / ${num(2 * a)} = ${num(raices[0])}. La parábola toca el eje X en un único punto, su vértice.`,
    `${cuenta}. With Δ = 0 there is one (repeated) solution: x = −b / 2a = ${num(-b)} / ${num(2 * a)} = ${num(raices[0])}. The parabola touches the x-axis at a single point, its vertex.`,
    `${cuenta}. Amb Δ = 0 hi ha una sola solució (doble): x = −b / 2a = ${num(-b)} / ${num(2 * a)} = ${num(raices[0])}. La paràbola toca l’eix X en un únic punt, el vèrtex.`))
  else {
    const raiz = Math.round(Math.sqrt(d))
    const formula = `x = (${num(-b)} ± ${raiz}) / ${num(2 * a)}`
    partes.push(s(l,
      `${cuenta} → √${d} = ${raiz}. ${formula} → ${lista(raices, l)}. Son los dos puntos donde la parábola corta el eje X.`,
      `${cuenta} → √${d} = ${raiz}. ${formula} → ${lista(raices, l)}. These are the two points where the parabola crosses the x-axis.`,
      `${cuenta} → √${d} = ${raiz}. ${formula} → ${lista(raices, l)}. Són els dos punts on la paràbola talla l’eix X.`))
  }
  return partes.join(' ')
}

// Para el examen tipo test (schema) y los imprimibles
export function textoSolucion(rs, l) {
  if (!rs.length) return s(l, 'No tiene solución real', 'No real solution', 'No té solució real')
  if (rs.length === 1) return s(l, `x = ${num(rs[0])} (doble)`, `x = ${num(rs[0])} (repeated)`, `x = ${num(rs[0])} (doble)`)
  return rs.map(x => `x = ${num(x)}`).join(', ')
}
export function schemaQuestion(r, l) {
  const question = s(l, `Resuelve: ${enunciado(r)}`, `Solve: ${enunciado(r)}`, `Resol: ${enunciado(r)}`)
  const correctAnswer = textoSolucion(r.raices, l)
  const cand = []
  if (r.raices.length) {
    cand.push(textoSolucion([...new Set(r.raices.map(x => -x))].sort((x, y) => x - y), l))
    cand.push(textoSolucion([], l))
    cand.push(textoSolucion([r.raices[r.raices.length - 1] + 1], l))
    if (r.raices.length === 2) cand.push(textoSolucion([r.raices[1]], l))
    else cand.push(textoSolucion([r.raices[0], -r.raices[0]].sort((x, y) => x - y), l))
  } else {
    cand.push(textoSolucion([1, 2], l), textoSolucion([-1, 1], l), textoSolucion([0], l), textoSolucion([2, 3], l))
  }
  const wrongAnswers = [...new Set(cand)].filter(x => x !== correctAnswer).slice(0, 3)
  return { question, correctAnswer, wrongAnswers }
}
