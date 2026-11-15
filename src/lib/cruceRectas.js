// Cruce de Rectas: sistemas de dos ecuaciones con dos incógnitas por el
// MÉTODO GRÁFICO. Cada ecuación es una recta; la solución es el punto donde
// se cortan.
//
//   facil    las dos rectas ya dibujadas: toca el punto de corte
//   medio    dibuja cada recta tocando dos puntos que cumplan su ecuación
//            (los que no la cumplen se rechazan y se explica por qué), y
//            después toca el corte
//   dificil  igual, pero el sistema puede no tener solución (rectas
//            paralelas) o tener infinitas (la misma recta escrita de otra
//            forma): hay que decirlo
//
// Todo es entero: la solución y al menos dos puntos de cada recta caen en
// la cuadrícula, así que dibujar con dos toques siempre es posible.

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b))

export const NIVELES = {
  facil: { min: 0, max: 8, rango: [1, 6], dibuja: false, especiales: false },
  medio: { min: -6, max: 6, rango: [-4, 4], dibuja: true, especiales: false },
  dificil: { min: -6, max: 6, rango: [-4, 4], dibuja: true, especiales: true },
}

const ent = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))

// Puntos de la cuadrícula que cumplen a·x + b·y = c
export function puntosDe({ a, b, c }, min, max) {
  const out = []
  for (let x = min; x <= max; x++) for (let y = min; y <= max; y++) if (a * x + b * y === c) out.push([x, y])
  return out
}
export const cumple = ({ a, b, c }, [x, y]) => a * x + b * y === c

// Coeficientes pequeños, primos entre sí, sin rectas verticales (b ≠ 0)
function coeficientes(rand, positivos) {
  for (;;) {
    const a = positivos ? ent(rand, -2, 3) : ent(rand, -3, 3)
    const b = positivos ? ent(rand, 1, 3) * (rand() < 0.25 ? -1 : 1) : ent(rand, -3, 3)
    if (b !== 0 && gcd(a, b) === 1 && !(a === 0 && b < 0)) return { a, b }
  }
}

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const N = NIVELES[nivel]
  for (let intento = 0; intento < 500; intento++) {
    const x0 = ent(rand, N.rango[0], N.rango[1]), y0 = ent(rand, N.rango[0], N.rango[1])
    const c1 = coeficientes(rand, nivel === 'facil')
    const e1 = { ...c1, c: c1.a * x0 + c1.b * y0 }
    if (puntosDe(e1, N.min, N.max).length < 2) continue
    const r = rand()
    let tipo = 'compatible', e2
    if (N.especiales && r < 0.22) {
      // Paralela: misma inclinación, otro punto de la cuadrícula que no está en la recta 1
      tipo = 'incompatible'
      const k = rand() < 0.5 ? 1 : 2
      const otros = []
      for (let x = N.min; x <= N.max; x++) for (let y = N.min; y <= N.max; y++) if (!cumple(e1, [x, y])) otros.push([x, y])
      const [px, py] = otros[Math.floor(rand() * otros.length)]
      e2 = { a: k * e1.a, b: k * e1.b, c: k * (e1.a * px + e1.b * py) }
      if (Math.abs(e2.c - k * e1.c) > 3 * k * Math.max(Math.abs(e1.a), Math.abs(e1.b))) continue // que se vean las dos
    } else if (N.especiales && r < 0.36) {
      // La misma recta multiplicada por 2, 3 o −1
      tipo = 'indeterminado'
      const k = [2, 3, -1][Math.floor(rand() * 3)]
      e2 = { a: k * e1.a, b: k * e1.b, c: k * e1.c }
    } else {
      const c2 = coeficientes(rand, nivel === 'facil')
      if (c1.a * c2.b === c2.a * c1.b) continue
      e2 = { ...c2, c: c2.a * x0 + c2.b * y0 }
    }
    if (puntosDe(e2, N.min, N.max).length < 2) continue
    return { id: `${nivel}:${e1.a},${e1.b},${e1.c}|${e2.a},${e2.b},${e2.c}`, nivel, tipo, e1, e2, sol: tipo === 'compatible' ? [x0, y0] : null, ...N }
  }
  throw new Error('cruce-rectas: no se pudo generar')
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuesta: «p:3,1» (punto de corte), «paralelas» o «coinciden»
export function esCorrecta(r, x) {
  if (!x) return false
  if (r.tipo === 'incompatible') return x === 'paralelas'
  if (r.tipo === 'indeterminado') return x === 'coinciden'
  return x === `p:${r.sol[0]},${r.sol[1]}`
}

// ── Textos ────────────────────────────────────────────────────────────────
const MENOS = '−'
const num = n => (n < 0 ? `${MENOS}${-n}` : `${n}`)
// «2x + y = 7», «x − 3y = −2», «−x + 2y = 4»
export function ecuacion({ a, b, c }) {
  const t = (k, v, primero) => {
    if (k === 0) return ''
    const abs = Math.abs(k) === 1 ? v : `${Math.abs(k)}${v}`
    if (primero) return k < 0 ? `${MENOS}${abs}` : abs
    return k < 0 ? ` ${MENOS} ${abs}` : ` + ${abs}`
  }
  const izq = a === 0 ? t(b, 'y', true) : `${t(a, 'x', true)}${t(b, 'y', false)}`
  return `${izq} = ${num(c)}`
}
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const par = ([x, y]) => `(${num(x)}, ${num(y)})`
// «2·3 + 1·(−1) = 5»
function sustitucion({ a, b }, [x, y]) {
  const f = (k, v) => `${Math.abs(k) === 1 ? '' : `${Math.abs(k)}·`}${v < 0 ? `(${num(v)})` : v}`
  const ta = a === 0 ? '' : `${a < 0 ? MENOS : ''}${f(a, x)}`
  const tb = b === 0 ? '' : `${ta ? (b < 0 ? ` ${MENOS} ` : ' + ') : b < 0 ? MENOS : ''}${f(b, y)}`
  return `${ta}${tb} = ${num(a * x + b * y)}`
}

export function explicacion(r, l) {
  if (r.tipo === 'incompatible') return s(l,
    `Las dos rectas tienen la misma inclinación y no pasan por el mismo punto: son paralelas y nunca se cortan. El sistema no tiene solución (sistema incompatible). Se nota en los números: la segunda ecuación tiene los coeficientes de x e y proporcionales a la primera, pero no el término independiente.`,
    `The two lines have the same slope and do not pass through the same point: they are parallel and never meet. The system has no solution (inconsistent). You can see it in the numbers: the x and y coefficients of the second equation are in proportion to the first, but the constant is not.`,
    `Les dues rectes tenen la mateixa inclinació i no passen pel mateix punt: són paral·leles i mai no es tallen. El sistema no té solució (sistema incompatible). Es nota en els nombres: la segona equació té els coeficients de x i y proporcionals als de la primera, però no el terme independent.`)
  if (r.tipo === 'indeterminado') {
    const k = r.e2.a / r.e1.a || r.e2.b / r.e1.b
    return s(l,
      `La segunda ecuación es la primera multiplicada por ${num(k)}: son la misma recta. Todos sus puntos son solución, así que el sistema tiene infinitas soluciones (compatible indeterminado).`,
      `The second equation is the first multiplied by ${num(k)}: they are the same line. Every point on it is a solution, so the system has infinitely many solutions (dependent).`,
      `La segona equació és la primera multiplicada per ${num(k)}: són la mateixa recta. Tots els seus punts són solució, així que el sistema té infinites solucions (compatible indeterminat).`)
  }
  const [x, y] = r.sol
  return s(l,
    `Las rectas se cortan en ${par(r.sol)}: x = ${num(x)}, y = ${num(y)}. Comprobación en las dos ecuaciones: ${sustitucion(r.e1, r.sol)} ✓ y ${sustitucion(r.e2, r.sol)} ✓.`,
    `The lines cross at ${par(r.sol)}: x = ${num(x)}, y = ${num(y)}. Check in both equations: ${sustitucion(r.e1, r.sol)} ✓ and ${sustitucion(r.e2, r.sol)} ✓.`,
    `Les rectes es tallen a ${par(r.sol)}: x = ${num(x)}, y = ${num(y)}. Comprovació a les dues equacions: ${sustitucion(r.e1, r.sol)} ✓ i ${sustitucion(r.e2, r.sol)} ✓.`)
}

// Por qué un punto tocado no está en la recta: «2·1 + 3 = 5, no 7»
export function porQueNo(e, p, l) {
  return s(l, `${par(p)} no cumple ${ecuacion(e)}: ${sustitucion(e, p)}, no ${num(e.c)}.`,
    `${par(p)} does not satisfy ${ecuacion(e)}: ${sustitucion(e, p)}, not ${num(e.c)}.`,
    `${par(p)} no compleix ${ecuacion(e)}: ${sustitucion(e, p)}, no ${num(e.c)}.`)
}

export function schemaQuestion(r, l) {
  const q = s(l, `Resuelve el sistema: ${ecuacion(r.e1)} ; ${ecuacion(r.e2)}`, `Solve the system: ${ecuacion(r.e1)} ; ${ecuacion(r.e2)}`, `Resol el sistema: ${ecuacion(r.e1)} ; ${ecuacion(r.e2)}`)
  const sinSol = s(l, 'No tiene solución (rectas paralelas)', 'No solution (parallel lines)', 'No té solució (rectes paral·leles)')
  const inf = s(l, 'Infinitas soluciones (la misma recta)', 'Infinitely many solutions (the same line)', 'Infinites solucions (la mateixa recta)')
  if (r.tipo === 'incompatible') return { question: q, correctAnswer: sinSol, wrongAnswers: [inf, 'x = 0, y = 0', 'x = 1, y = 1'] }
  if (r.tipo === 'indeterminado') return { question: q, correctAnswer: inf, wrongAnswers: [sinSol, 'x = 0, y = 0', 'x = 1, y = 1'] }
  const [x, y] = r.sol
  const f = (a, b) => `x = ${num(a)}, y = ${num(b)}`
  const malas = [...new Set([f(y, x), f(x + 1, y), f(x, y - 1), f(-x, y)])].filter(m => m !== f(x, y)).slice(0, 3)
  return { question: q, correctAnswer: f(x, y), wrongAnswers: malas }
}
