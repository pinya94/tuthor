// ── Exámenes de álgebra generados: 2º grado, sistemas y rectas ──────────────
//
// Tres exámenes de ESO que Tuthor no tenía: ecuaciones de segundo grado,
// sistemas de dos ecuaciones y problemas de rectas. No salen de un banco de
// preguntas escritas a mano sino de un generador, por dos razones:
//
//   · Cada examen es distinto. Un banco de 25 preguntas se aprende de memoria;
//     un generador no se acaba.
//   · Una respuesta no puede estar mal. Los datos se construyen AL REVÉS (se
//     eligen primero las soluciones y de ahí salen los coeficientes), todo en
//     fracciones exactas, y un test sustituye cada solución en sus ecuaciones.
//
// La explicación que ve el alumno al corregir sale de los motores de los
// recursos (/recursos/ecuaciones, /recursos/funciones), que ya resuelven con
// pasos: el examen y el recurso explican igual.

import { frac, fracTexto, iguales, polinomioTexto, MENOS } from './expresion'
import { tri, par, prepararFuncion, cortarFunciones } from './problemasFunciones'
import { leerNumero, rectaPorDosPuntos, rectaPendientePunto } from './problemasRectas'
import { resolverEcuacion } from './recursoEcuaciones'

const T = (l, es, en, ca) => ({ es, en, ca })[l]
const entero = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const noCero = (a, b, rand) => { let v; do { v = entero(a, b, rand) } while (v === 0); return v }
const elegir = (lista, rand) => lista[Math.floor(rand() * lista.length)]
const n = v => (v < 0 ? `${MENOS}${Math.abs(v)}` : String(v))

// Lee lo que escribe el alumno: "3", "−1/2", "0,5". null si no es un número.
const leer = texto => {
  const t = String(texto ?? '').trim()
  if (!t) return null
  try { return leerNumero(t) } catch { return null }
}

// ── Ecuaciones de segundo grado ─────────────────────────────────────────────

function segundoGrado(nivel, rand) {
  let a, b, c, raices
  if (nivel === 'facil') {
    const forma = rand()
    if (forma < 0.2) {
      // Incompleta sin b: x² − k² = 0
      const k = entero(1, 9, rand)
      ;[a, b, c, raices] = [1, 0, -k * k, [-k, k]]
    } else if (forma < 0.35) {
      // Incompleta sin c: x² − rx = 0 → x(x − r) = 0
      const r = noCero(-9, 9, rand)
      ;[a, b, c, raices] = [1, -r, 0, [0, r]]
    } else {
      const r1 = entero(-6, 6, rand), r2 = entero(-6, 6, rand)
      ;[a, b, c, raices] = [1, -(r1 + r2), r1 * r2, [r1, r2]]
    }
    raices = raices.map(r => frac(r))
  } else if (nivel === 'medio') {
    // a ≠ 1, y a veces raíz doble
    a = elegir([2, 3, -1, -2], rand)
    const r1 = entero(-5, 5, rand)
    const r2 = rand() < 0.2 ? r1 : entero(-5, 5, rand)
    ;[b, c, raices] = [-a * (r1 + r2), a * r1 * r2, [frac(r1), frac(r2)]]
  } else if (rand() < 0.25) {
    // Sin solución real: se elige c para que el discriminante sea negativo.
    a = elegir([1, 2, 3], rand)
    b = entero(-4, 4, rand)
    c = Math.floor((b * b) / (4 * a)) + entero(1, 5, rand)
    raices = []
  } else {
    // Una raíz fraccionaria p/q y otra entera r: s·(qx − p)(x − r)
    const q = elegir([2, 3], rand)
    let p
    do { p = noCero(-7, 7, rand) } while (p % q === 0)
    const r = entero(-4, 4, rand)
    const s = elegir([1, -1], rand)
    ;[a, b, c, raices] = [s * q, s * (-(q * r) - p), s * p * r, [frac(p, q), frac(r)]]
  }

  const soluciones = raices
    .filter((x, i) => raices.findIndex(y => iguales(x, y)) === i)
    .sort((x, y) => x.n / x.d - y.n / y.d)
  const ecuacion = `${polinomioTexto([frac(c), frac(b), frac(a)])} = 0`
  const resuelto = resolverEcuacion(ecuacion)

  return {
    tipo: 'segundo-grado',
    nivel,
    clave: ecuacion,
    enunciado: tri(l => T(l, 'Resuelve la ecuación:', 'Solve the equation:', "Resol l'equació:")),
    lineas: [ecuacion],
    coeficientes: { a, b, c },
    campos: [{ id: 'x1', etiqueta: tri(() => 'x₁') }, { id: 'x2', etiqueta: tri(() => 'x₂') }],
    // La opción "no tiene solución" sale en todos los niveles, también donde
    // nunca es la respuesta: si solo apareciera en difícil, su presencia
    // chivaría que esa ecuación puede no tenerla.
    permiteSinSolucion: true,
    respuesta: { soluciones },
    pasos: resuelto.secciones.filter(s => s.titulo.es !== 'En la gráfica').flatMap(s => s.pasos),
  }
}

// ── Sistemas de dos ecuaciones con dos incógnitas ───────────────────────────

const termino = (coef, v, primero) => {
  if (coef === 0) return ''
  const cuerpo = `${Math.abs(coef) === 1 ? '' : Math.abs(coef)}${v}`
  return primero ? `${coef < 0 ? MENOS : ''}${cuerpo}` : ` ${coef < 0 ? MENOS : '+'} ${cuerpo}`
}
const ecuacionXY = (a, b, c) => `${termino(a, 'x', true)}${termino(b, 'y', a === 0)} = ${n(c)}`

function sistema(nivel, rand) {
  const R = nivel === 'facil' ? 3 : nivel === 'medio' ? 5 : 9
  const x0 = entero(-6, 6, rand), y0 = entero(-6, 6, rand)
  let a1, b1, a2, b2
  do {
    // En fácil la x de la primera va sola (coeficiente 1): se puede despejar
    // sin fracciones, que es por donde se empieza a hacer sistemas.
    a1 = nivel === 'facil' ? 1 : noCero(-R, R, rand)
    b1 = noCero(-R, R, rand)
    a2 = noCero(-R, R, rand)
    b2 = noCero(-R, R, rand)
  } while (a1 * b2 - a2 * b1 === 0)
  const c1 = a1 * x0 + b1 * y0
  const c2 = a2 * x0 + b2 * y0

  // Reducción: la 1ª por a2 y la 2ª por a1 igualan el coeficiente de x.
  const [A1, B1, C1] = [a1 * a2, b1 * a2, c1 * a2]
  const [A2, B2, C2] = [a2 * a1, b2 * a1, c2 * a1]
  const By = B1 - B2, Cy = C1 - C2
  const mismaX = a1 === a2
  const e1 = ecuacionXY(a1, b1, c1), e2 = ecuacionXY(a2, b2, c2)

  const pasos = [
    tri(l => (mismaX
      ? T(l, 'Método de reducción. La x ya tiene el mismo coeficiente en las dos ecuaciones.', 'Elimination method. x already has the same coefficient in both equations.', 'Mètode de reducció. La x ja té el mateix coeficient a les dues equacions.')
      : T(l, `Método de reducción: multiplicamos la 1ª ecuación por ${par(frac(a2))} y la 2ª por ${par(frac(a1))}, para que la x tenga el mismo coeficiente.`, `Elimination method: multiply the 1st equation by ${par(frac(a2))} and the 2nd by ${par(frac(a1))}, so x has the same coefficient.`, `Mètode de reducció: multipliquem la 1a equació per ${par(frac(a2))} i la 2a per ${par(frac(a1))}, perquè la x tingui el mateix coeficient.`))),
    ...(mismaX ? [] : [tri(() => ecuacionXY(A1, B1, C1)), tri(() => ecuacionXY(A2, B2, C2))]),
    tri(l => T(l, 'Restamos la segunda a la primera y la x desaparece:', 'Subtract the second from the first and x disappears:', 'Restem la segona a la primera i la x desapareix:')),
    tri(() => `${termino(By, 'y', true)} = ${n(Cy)}  →  y = ${n(Cy)} / ${par(frac(By))} = ${n(y0)}`),
    tri(l => T(l, `Sustituimos y = ${n(y0)} en la 1ª ecuación (${e1}):`, `Substitute y = ${n(y0)} into the 1st equation (${e1}):`, `Substituïm y = ${n(y0)} a la 1a equació (${e1}):`)),
    tri(() => `${termino(a1, 'x', true)} ${b1 < 0 ? MENOS : '+'} ${Math.abs(b1)}·${par(frac(y0))} = ${n(c1)}  →  ${termino(a1, 'x', true)} = ${n(c1 - b1 * y0)}  →  x = ${n(x0)}`),
    tri(l => T(l,
      `Comprobación en la 2ª: ${n(a2)}·${par(frac(x0))} ${b2 < 0 ? MENOS : '+'} ${Math.abs(b2)}·${par(frac(y0))} = ${n(c2)} ✓`,
      `Check in the 2nd: ${n(a2)}·${par(frac(x0))} ${b2 < 0 ? MENOS : '+'} ${Math.abs(b2)}·${par(frac(y0))} = ${n(c2)} ✓`,
      `Comprovació a la 2a: ${n(a2)}·${par(frac(x0))} ${b2 < 0 ? MENOS : '+'} ${Math.abs(b2)}·${par(frac(y0))} = ${n(c2)} ✓`)),
  ]

  return {
    tipo: 'sistema',
    nivel,
    clave: `${e1} | ${e2}`,
    enunciado: tri(l => T(l, 'Resuelve el sistema:', 'Solve the system:', 'Resol el sistema:')),
    lineas: [e1, e2],
    coeficientes: { a1, b1, c1, a2, b2, c2 },
    campos: [{ id: 'x', etiqueta: tri(() => 'x') }, { id: 'y', etiqueta: tri(() => 'y') }],
    permiteSinSolucion: false,
    respuesta: { x: frac(x0), y: frac(y0) },
    pasos,
  }
}

// ── Rectas ──────────────────────────────────────────────────────────────────

const rectaTexto = (m, b) => `y = ${polinomioTexto([b, m])}`
const puntoTexto = (x, y) => `(${fracTexto(x)}, ${fracTexto(y)})`

function recta(nivel, rand) {
  const tipos = nivel === 'facil' ? ['dos-puntos', 'pendiente-punto'] : ['dos-puntos', 'pendiente-punto', 'corte']
  const tipo = elegir(tipos, rand)
  // En difícil la pendiente puede ser fraccionaria. Los puntos se toman en
  // múltiplos del denominador para que las coordenadas sigan siendo enteras:
  // el ejercicio va de rectas, no de operar con fracciones de fracciones.
  const pendiente = () => {
    const q = nivel === 'dificil' && rand() < 0.6 ? elegir([2, 3], rand) : 1
    let p
    do { p = noCero(-5, 5, rand) } while (q > 1 && p % q === 0)
    return { m: frac(p, q), q }
  }
  const enRecta = (m, b, x) => frac(m.n * x + b * m.d, m.d)

  if (tipo === 'dos-puntos') {
    const { m, q } = pendiente()
    const b = entero(-6, 6, rand)
    const xA = q * entero(-3, 3, rand)
    const xB = xA + q * noCero(-3, 3, rand)
    const A = { x: frac(xA), y: enRecta(m, b, xA) }
    const B = { x: frac(xB), y: enRecta(m, b, xB) }
    return {
      tipo: 'dos-puntos', nivel,
      clave: `${puntoTexto(A.x, A.y)} ${puntoTexto(B.x, B.y)}`,
      enunciado: tri(l => T(l,
        `Halla la recta que pasa por A${puntoTexto(A.x, A.y)} y B${puntoTexto(B.x, B.y)}, escrita como y = mx + b.`,
        `Find the line through A${puntoTexto(A.x, A.y)} and B${puntoTexto(B.x, B.y)}, written as y = mx + b.`,
        `Troba la recta que passa per A${puntoTexto(A.x, A.y)} i B${puntoTexto(B.x, B.y)}, escrita com y = mx + b.`)),
      lineas: [],
      campos: [{ id: 'm', etiqueta: tri(() => 'm') }, { id: 'b', etiqueta: tri(() => 'b') }],
      permiteSinSolucion: false,
      ecuacion: rectaTexto(m, frac(b)),
      respuesta: { m, b: frac(b) },
      pasos: rectaPorDosPuntos(A, B).pasos,
    }
  }

  if (tipo === 'pendiente-punto') {
    const { m, q } = pendiente()
    const b = entero(-6, 6, rand)
    const x0 = q * entero(-3, 3, rand)
    const P = { x: frac(x0), y: enRecta(m, b, x0) }
    return {
      tipo: 'pendiente-punto', nivel,
      clave: `${fracTexto(m)} ${puntoTexto(P.x, P.y)}`,
      enunciado: tri(l => T(l,
        `Una recta tiene pendiente m = ${fracTexto(m)} y pasa por P${puntoTexto(P.x, P.y)}. Escrita como y = mx + b, ¿cuánto vale b?`,
        `A line has slope m = ${fracTexto(m)} and passes through P${puntoTexto(P.x, P.y)}. Written as y = mx + b, what is b?`,
        `Una recta té pendent m = ${fracTexto(m)} i passa per P${puntoTexto(P.x, P.y)}. Escrita com y = mx + b, quant val b?`)),
      lineas: [],
      campos: [{ id: 'b', etiqueta: tri(() => 'b') }],
      permiteSinSolucion: false,
      ecuacion: rectaTexto(m, frac(b)),
      respuesta: { b: frac(b) },
      pasos: rectaPendientePunto(m, P).pasos,
    }
  }

  // Punto de corte de dos rectas, con el punto elegido primero.
  const x0 = (nivel === 'dificil' ? 6 : 1) * entero(-2, 2, rand)
  const y0 = entero(-6, 6, rand)
  const r1 = pendiente()
  let r2
  do { r2 = pendiente() } while (iguales(r1.m, r2.m))
  const b1 = frac(y0 * r1.m.d - r1.m.n * x0, r1.m.d)
  const b2 = frac(y0 * r2.m.d - r2.m.n * x0, r2.m.d)
  const t1 = rectaTexto(r1.m, b1), t2 = rectaTexto(r2.m, b2)
  return {
    tipo: 'corte', nivel,
    clave: `${t1} | ${t2}`,
    enunciado: tri(l => T(l, '¿En qué punto se cortan estas dos rectas?', 'Where do these two lines cross?', 'En quin punt es tallen aquestes dues rectes?')),
    lineas: [t1, t2],
    campos: [{ id: 'x', etiqueta: tri(() => 'x') }, { id: 'y', etiqueta: tri(() => 'y') }],
    permiteSinSolucion: false,
    respuesta: { x: frac(x0), y: frac(y0) },
    pasos: cortarFunciones(prepararFuncion(t1), prepararFuncion(t2)).pasos,
  }
}

// ── API común de los tres exámenes ──────────────────────────────────────────

export const EXAMENES = {
  'ecuaciones-segundo-grado-test': segundoGrado,
  'sistemas-ecuaciones-test': sistema,
  'rectas-test': recta,
}

export function genRound(examen, nivel = 'facil', rand = Math.random) {
  const generar = EXAMENES[examen]
  if (!generar) throw new Error(`examen desconocido: ${examen}`)
  return generar(nivel, rand)
}

// ¿Es correcta la respuesta? `ans` = { [campo]: texto, sinSolucion: bool }.
// Acepta la respuesta escrita de cualquier forma equivalente (1/2 = 0,5) y, en
// segundo grado, las soluciones en cualquier orden, y una raíz doble puesta una
// vez o dos.
export function comprobar(round, ans = {}) {
  if (round.tipo === 'segundo-grado') {
    const esperadas = round.respuesta.soluciones
    if (!esperadas.length) return ans.sinSolucion === true
    if (ans.sinSolucion) return false
    const leidas = []
    for (const c of round.campos) {
      const t = String(ans[c.id] ?? '').trim()
      if (!t) continue
      const v = leer(t)
      if (!v) return false
      leidas.push(v)
    }
    const unicas = leidas.filter((x, i) => leidas.findIndex(y => iguales(x, y)) === i)
    return unicas.length === esperadas.length && esperadas.every(e => unicas.some(u => iguales(u, e)))
  }
  if (ans.sinSolucion) return false
  return round.campos.every(c => {
    const v = leer(ans[c.id])
    return v !== null && iguales(v, round.respuesta[c.id])
  })
}

// La respuesta correcta, para enseñarla al corregir.
export function respuestaTexto(round, l = 'es') {
  if (round.tipo === 'segundo-grado') {
    const s = round.respuesta.soluciones
    if (!s.length) return T(l, 'No tiene solución real', 'No real solution', 'No té solució real')
    return s.map((x, i) => `x${s.length > 1 ? (i ? '₂' : '₁') : ''} = ${fracTexto(x)}`).join(' · ')
  }
  return round.campos.map(c => `${c.id} = ${fracTexto(round.respuesta[c.id])}`).join(' · ')
}

// Pregunta de ejemplo para el JSON-LD del examen.
export function schemaPregunta(round, l = 'es') {
  const partes = [round.enunciado[l] ?? round.enunciado.es, ...round.lineas]
  return { question: partes.join(' '), correctAnswer: respuestaTexto(round, l) }
}
