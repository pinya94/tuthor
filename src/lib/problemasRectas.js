// ── Recurso de funciones: los problemas de rectas ───────────────────────────
//
// Los tres enunciados que más se repiten en los ejercicios de funciones
// lineales de 3º y 4º de ESO, y los mismos que pregunta el examen de teoría de
// Tuthor (data/funciones.js):
//   · la recta que pasa por dos puntos,
//   · la recta con una pendiente dada que pasa por un punto,
//   · si un punto está o no en la gráfica de una función.
// Todo en fracciones exactas y con los pasos que se escriben en el cuaderno.

import {
  leerExpresion, aPolinomio, polinomioTexto, fracTexto, sumar, restar, multiplicar,
  dividir, opuesto, esCero, iguales, valor, polEvaluar, grado, ErrorExpresion,
} from './expresion'
import { tri, aprox, par } from './problemasFunciones'

const T = (l, es, en, ca) => ({ es, en, ca })[l]
const puntoTexto = P => `(${fracTexto(P.x)}, ${fracTexto(P.y)})`
const dado = (P, etiqueta) => ({ x: valor(P.x), y: valor(P.y), clase: 'dado', etiqueta, texto: tri(() => puntoTexto(P)) })

// "y − 2", "x + 3": restar un número negativo se escribe como suma.
const menos = v => (esCero(v) ? '' : v.n < 0 ? ` + ${fracTexto(opuesto(v))}` : ` − ${fracTexto(v)}`)

// Una coordenada o una pendiente: "3", "−1/2", "0,75". Una x suelta no vale.
export function leerNumero(texto) {
  const p = aPolinomio(leerExpresion(texto))
  if (!p || grado(p) !== 0) throw new ErrorExpresion('numero')
  return p[0]
}

// Con m = 0 la recta es y = b: se guarda como constante y no como "0x + b".
const recta = (m, b) => (esCero(m) ? [b] : [b, m])

export function rectaPorDosPuntos(A, B) {
  const puntos = [
    dado(A, tri(l => T(l, 'Punto A', 'Point A', 'Punt A'))),
    dado(B, tri(l => T(l, 'Punto B', 'Point B', 'Punt B'))),
  ]
  if (iguales(A.x, B.x) && iguales(A.y, B.y)) {
    return { tipo: 'mismoPunto', puntos, pasos: [tri(l => T(l,
      'Los dos puntos son el mismo. Por un solo punto pasan infinitas rectas: hace falta un segundo punto distinto.',
      'Both points are the same. Infinitely many lines pass through a single point: you need a second, different point.',
      'Els dos punts són el mateix. Per un sol punt hi passen infinites rectes: cal un segon punt diferent.'))] }
  }
  const dx = restar(B.x, A.x)
  const dy = restar(B.y, A.y)
  if (esCero(dx)) {
    return { tipo: 'vertical', ecuacion: `x = ${fracTexto(A.x)}`, puntos, pasos: [tri(l => T(l,
      `Los dos puntos tienen la misma x: la recta es vertical, x = ${fracTexto(A.x)}. No es una función, porque a ese valor de x le tocan infinitos valores de y. Por eso no tiene pendiente ni se puede escribir como y = mx + b.`,
      `Both points have the same x: the line is vertical, x = ${fracTexto(A.x)}. It is not a function, because that x value has infinitely many y values. That is why it has no slope and cannot be written as y = mx + b.`,
      `Els dos punts tenen la mateixa x: la recta és vertical, x = ${fracTexto(A.x)}. No és una funció, perquè a aquest valor de x li toquen infinits valors de y. Per això no té pendent ni es pot escriure com y = mx + b.`))] }
  }
  const m = dividir(dy, dx)
  const b = restar(A.y, multiplicar(m, A.x))
  const pol = recta(m, b)
  const ecuacion = `y = ${polinomioTexto(pol)}`
  const enB = sumar(multiplicar(m, B.x), b)
  return {
    tipo: 'recta', pol, ecuacion, puntos,
    pasos: [
      tri(l => T(l, 'La pendiente es lo que sube la y dividido entre lo que avanza la x:', 'The slope is the rise in y divided by the run in x:', 'El pendent és el que puja la y dividit pel que avança la x:')),
      tri(() => `m = (y₂ − y₁) / (x₂ − x₁) = (${fracTexto(B.y)} − ${par(A.y)}) / (${fracTexto(B.x)} − ${par(A.x)}) = ${fracTexto(dy)} / ${par(dx)} = ${fracTexto(m)}`),
      tri(l => T(l, 'Sustituimos el punto A en y = mx + b para hallar b:', 'Substitute point A into y = mx + b to find b:', 'Substituïm el punt A a y = mx + b per trobar b:')),
      tri(() => `${fracTexto(A.y)} = ${par(m)}·${par(A.x)} + b  →  b = ${fracTexto(A.y)} − ${par(multiplicar(m, A.x))} = ${fracTexto(b)}`),
      tri(l => T(l, `La recta es ${ecuacion}`, `The line is ${ecuacion}`, `La recta és ${ecuacion}`)),
      // La comprobación con el otro punto es lo que se pide en clase, y además
      // es lo que detecta un signo cambiado al copiar los puntos.
      tri(l => T(l,
        `Comprobación con B: ${par(m)}·${par(B.x)} + ${par(b)} = ${fracTexto(enB)} ✓`,
        `Check with B: ${par(m)}·${par(B.x)} + ${par(b)} = ${fracTexto(enB)} ✓`,
        `Comprovació amb B: ${par(m)}·${par(B.x)} + ${par(b)} = ${fracTexto(enB)} ✓`)),
    ],
  }
}

export function rectaPendientePunto(m, P) {
  const b = restar(P.y, multiplicar(m, P.x))
  const pol = recta(m, b)
  const ecuacion = `y = ${polinomioTexto(pol)}`
  return {
    tipo: 'recta', pol, ecuacion,
    puntos: [dado(P, tri(l => T(l, 'Punto dado', 'Given point', 'Punt donat')))],
    pasos: [
      tri(l => T(l, 'Forma punto-pendiente:', 'Point-slope form:', 'Forma punt-pendent:')),
      tri(() => 'y − y₀ = m(x − x₀)'),
      tri(() => `y${menos(P.y)} = ${par(m)}(x${menos(P.x)})`),
      tri(l => T(l, 'Despejamos la y:', 'Solve for y:', 'Aïllem la y:')),
      tri(() => `y = ${par(m)}x + ${par(P.y)} − ${par(m)}·${par(P.x)} = ${polinomioTexto(pol)}`),
      tri(l => T(l, `La recta es ${ecuacion}`, `The line is ${ecuacion}`, `La recta és ${ecuacion}`)),
    ],
  }
}

// `fn` sale de prepararFuncion (problemasFunciones.js).
export function puntoPertenece(fn, P) {
  const puntos = [dado(P, tri(l => T(l, 'Punto dado', 'Given point', 'Punt donat')))]
  const x0 = fracTexto(P.x)
  const pasos = [tri(l => T(l, `Sustituimos x = ${x0} en ${fn.ecuacion}:`, `Substitute x = ${x0} into ${fn.ecuacion}:`, `Substituïm x = ${x0} a ${fn.ecuacion}:`))]

  let pertenece, yTexto, y
  if (fn.pol) {
    const exacta = polEvaluar(fn.pol, P.x)
    y = valor(exacta)
    pertenece = iguales(exacta, P.y)
    yTexto = () => fracTexto(exacta)
  } else {
    y = fn.f(valor(P.x))
    // Sin polinomio no hay igualdad exacta posible: se compara con tolerancia
    // y se dice que es aproximado.
    pertenece = Number.isFinite(y) && Math.abs(y - valor(P.y)) < 1e-9 * Math.max(1, Math.abs(y))
    yTexto = l => (Number.isFinite(y) ? `≈ ${aprox(y, l)}` : T(l, 'no definida', 'undefined', 'no definida'))
  }

  pasos.push(tri(l => `f(${x0}) = ${yTexto(l)}`))
  if (pertenece) {
    pasos.push(tri(l => T(l,
      `Da lo mismo que la y del punto: ${puntoTexto(P)} SÍ está en la gráfica.`,
      `It matches the point's y: ${puntoTexto(P)} IS on the graph.`,
      `Dona el mateix que la y del punt: ${puntoTexto(P)} SÍ que és a la gràfica.`)))
  } else {
    pasos.push(tri(l => T(l,
      `El punto tiene y = ${fracTexto(P.y)}, así que ${puntoTexto(P)} NO está en la gráfica.`,
      `The point has y = ${fracTexto(P.y)}, so ${puntoTexto(P)} is NOT on the graph.`,
      `El punt té y = ${fracTexto(P.y)}, així que ${puntoTexto(P)} NO és a la gràfica.`)))
    if (Number.isFinite(y)) {
      puntos.push({ x: valor(P.x), y, clase: 'imagen', etiqueta: tri(l => T(l, 'Punto de la gráfica con esa x', 'Point on the graph with that x', 'Punt de la gràfica amb aquesta x')), texto: tri(l => `(${x0}, ${yTexto(l)})`) })
      pasos.push(tri(l => T(l,
        `El punto de la gráfica con esa x es (${x0}, ${yTexto(l)}).`,
        `The point on the graph with that x is (${x0}, ${yTexto(l)}).`,
        `El punt de la gràfica amb aquesta x és (${x0}, ${yTexto(l)}).`)))
    }
  }
  return { pertenece, exacta: !!fn.pol, puntos, pasos }
}
