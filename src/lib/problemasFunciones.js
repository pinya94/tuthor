// ── Recurso de funciones: resolver como en la pizarra ───────────────────────
//
// Lo que hace el recurso /recursos/funciones con una función escrita por el
// alumno: dónde corta los ejes, dónde está el vértice, dónde se cruza con
// otra. No basta con dar el resultado: cada respuesta lleva los PASOS, porque
// quien usa esto tiene un ejercicio delante y lo que necesita es ver cómo se
// llega, no copiar "x = 1".
//
// Dos caminos, y el recurso dice siempre cuál ha tomado:
//   · Exacto — si la función es un polinomio (rectas, parábolas…), todo sale
//     en fracciones y raíces simplificadas: x = (3 + √5)/2, no x = 2,618.
//   · Aproximado — si no lo es (1/x, √x, |x|), se dibuja igual y los cortes se
//     buscan numéricamente, marcados con ≈. Mejor decir "≈ 1,41" que fingir
//     una exactitud que no hay.

import {
  leerExpresion, evaluar, aPolinomio, polinomioTexto, frac, fracTexto, sumar, restar,
  multiplicar, dividir, opuesto, esCero, valor, polRestar, polEvaluar, grado, CERO, MENOS,
} from './expresion'

// Un paso en los tres idiomas. Se construye con una función del idioma porque
// los decimales cambian de separador: 1,41 en castellano y catalán, 1.41 en inglés.
export const tri = f => ({ es: f('es'), en: f('en'), ca: f('ca') })
const T = (l, es, en, ca) => ({ es, en, ca })[l]

// ── Números ─────────────────────────────────────────────────────────────────

export function aprox(v, l = 'es') {
  if (Math.abs(v - Math.round(v)) < 1e-9) return `${v < -0.5 ? MENOS : ''}${Math.abs(Math.round(v))}`
  const s = Math.abs(v).toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
  return `${v < 0 ? MENOS : ''}${l === 'en' ? s : s.replace('.', ',')}`
}

// Entre paréntesis si es negativo o fraccionario: 4·(−2)·(1/2), no 4·−2·1/2.
export const par = a => (a.n < 0 || a.d !== 1 ? `(${fracTexto(a)})` : fracTexto(a))

// √k = fuera·√dentro, con dentro libre de cuadrados: √12 = 2√3.
function raizSimplificada(k) {
  let fuera = 1, dentro = k
  for (let p = 2; p * p <= dentro; p++) {
    while (dentro % (p * p) === 0) { dentro /= p * p; fuera *= p }
  }
  return { fuera, dentro }
}

// Un número de la forma p + q·√r (r = 1 si es racional). Así salen exactas las
// raíces de una parábola, y también la y de un corte con una recta.
const mcm = (a, b) => (a * b) / (function g(x, y) { return y ? g(y, x % y) : x }(a, b))
function surdTexto({ p, q, r }) {
  if (r === 1 || esCero(q)) return fracTexto(r === 1 ? sumar(p, q) : p)
  const den = mcm(p.d, q.d)
  const P = (p.n * den) / p.d
  const Q = (Math.abs(q.n) * den) / q.d
  const raiz = `${Q === 1 ? '' : Q}√${r}`
  const cuerpo = P === 0 ? `${q.n < 0 ? MENOS : ''}${raiz}` : `${P < 0 ? MENOS : ''}${Math.abs(P)} ${q.n < 0 ? MENOS : '+'} ${raiz}`
  return den === 1 ? cuerpo : `(${cuerpo})/${den}`
}
const surdValor = ({ p, q, r }) => valor(p) + valor(q) * Math.sqrt(r)

// ── Leer funciones ──────────────────────────────────────────────────────────

// Lanza ErrorExpresion si no se entiende: la página enseña el motivo.
export function prepararFuncion(texto) {
  const ast = leerExpresion(texto)
  const pol = aPolinomio(ast)
  return {
    texto: String(texto).trim(),
    pol,
    f: x => evaluar(ast, x),
    ecuacion: pol ? `y = ${polinomioTexto(pol)}` : `y = ${String(texto).trim().replace(/^(?:[a-zA-Z]\s*\(\s*x\s*\)|y)\s*=\s*/, '')}`,
  }
}

// ── Raíces ──────────────────────────────────────────────────────────────────

// Raíces exactas de un polinomio de grado ≤ 2, con sus pasos. null si los
// números se salen de lo que se puede llevar exacto (entonces, numérico).
function raicesExactas(pol) {
  try {
    const g = grado(pol)
    const pasos = []
    if (g === 0) {
      return { raices: [], todas: esCero(pol[0]), pasos: [tri(l => esCero(pol[0])
        ? T(l, 'Queda 0 = 0: se cumple para cualquier x.', 'We get 0 = 0: it holds for every x.', 'Queda 0 = 0: es compleix per a qualsevol x.')
        : T(l, `Queda ${fracTexto(pol[0])} = 0, que es imposible: no hay solución.`, `We get ${fracTexto(pol[0])} = 0, which is impossible: no solution.`, `Queda ${fracTexto(pol[0])} = 0, que és impossible: no hi ha solució.`))] }
    }
    if (g === 1) {
      const [b, m] = pol
      const x = dividir(opuesto(b), m)
      pasos.push(
        tri(() => `${polinomioTexto(pol)} = 0`),
        tri(() => `${polinomioTexto([CERO, m])} = ${fracTexto(opuesto(b))}`),
        tri(() => `x = ${fracTexto(opuesto(b))} / ${par(m)} = ${fracTexto(x)}`),
      )
      return { raices: [{ p: x, q: CERO, r: 1 }], pasos }
    }
    if (g === 2) {
      const [c, b, a] = pol
      const D = restar(multiplicar(b, b), multiplicar(frac(4), multiplicar(a, c)))
      const dosA = multiplicar(frac(2), a)
      const p = dividir(opuesto(b), dosA)
      pasos.push(
        tri(() => `${polinomioTexto(pol)} = 0`),
        tri(l => T(l,
          `Fórmula de la ecuación de segundo grado con a = ${fracTexto(a)}, b = ${fracTexto(b)}, c = ${fracTexto(c)}: x = (−b ± √(b² − 4ac)) / 2a`,
          `Quadratic formula with a = ${fracTexto(a)}, b = ${fracTexto(b)}, c = ${fracTexto(c)}: x = (−b ± √(b² − 4ac)) / 2a`,
          `Fórmula de l'equació de segon grau amb a = ${fracTexto(a)}, b = ${fracTexto(b)}, c = ${fracTexto(c)}: x = (−b ± √(b² − 4ac)) / 2a`)),
        tri(l => `${T(l, 'Discriminante', 'Discriminant', 'Discriminant')}: b² − 4ac = ${par(b)}² − 4·${par(a)}·${par(c)} = ${fracTexto(D)}`),
      )
      if (D.n < 0) {
        pasos.push(tri(l => T(l, 'Es negativo: no hay soluciones reales.', 'It is negative: there are no real solutions.', 'És negatiu: no hi ha solucions reals.')))
        return { raices: [], pasos }
      }
      if (D.n === 0) {
        pasos.push(tri(l => T(l,
          `Es cero: hay una sola solución, x = −b / 2a = ${fracTexto(p)}`,
          `It is zero: there is a single solution, x = −b / 2a = ${fracTexto(p)}`,
          `És zero: hi ha una sola solució, x = −b / 2a = ${fracTexto(p)}`)))
        return { raices: [{ p, q: CERO, r: 1 }], pasos }
      }
      const { fuera, dentro } = raizSimplificada(D.n * D.d)
      const q = dividir(frac(fuera, D.d), dosA.n < 0 ? opuesto(dosA) : dosA)
      const raices = [{ p, q: opuesto(q), r: dentro }, { p, q, r: dentro }]
      pasos.push(tri(l => {
        const xs = raices.map((rz, k) => `x${k ? '₂' : '₁'} = ${surdTexto(rz)}${rz.r !== 1 ? ` ≈ ${aprox(surdValor(rz), l)}` : ''}`).join(T(l, '  y  ', '  and  ', '  i  '))
        return `x = (${fracTexto(opuesto(b))} ± √${par(D)}) / ${par(dosA)}  →  ${xs}`
      }))
      return { raices, pasos }
    }
    return null
  } catch {
    return null
  }
}

// Raíces de cualquier función, buscando cambios de signo y afinando con
// bisección. Se descartan los cambios de signo que no son un cero (el salto de
// 1/x en x = 0 cambia de signo y no corta nada).
export function raicesNumericas(f, desde = -100, hasta = 100, pasos = 8000) {
  const out = []
  const h = (hasta - desde) / pasos
  let xa = desde, ya = f(xa)
  for (let k = 1; k <= pasos && out.length < 8; k++) {
    const xb = desde + k * h, yb = f(xb)
    if (Number.isFinite(ya) && Number.isFinite(yb)) {
      if (ya === 0) out.push(xa)
      else if (ya * yb < 0) {
        let lo = xa, hi = xb, flo = ya
        for (let it = 0; it < 80; it++) {
          const mid = (lo + hi) / 2, fm = f(mid)
          if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm }
        }
        const x = (lo + hi) / 2
        if (Math.abs(f(x)) < 1e-6) out.push(x)
      }
    }
    xa = xb; ya = yb
  }
  return out.filter((x, k) => k === 0 || Math.abs(x - out[k - 1]) > 1e-6)
}

// ── Una función ─────────────────────────────────────────────────────────────

const punto = (x, y, clase, etiqueta, texto) => ({ x, y, clase, etiqueta, texto })

export function analizarFuncion(fn) {
  const { pol, f } = fn
  const secciones = []
  const puntos = []
  const datos = []
  const g = pol ? grado(pol) : null
  const tipo = g === 0 ? 'constante' : g === 1 ? 'lineal' : g === 2 ? 'cuadratica' : pol ? 'polinomio' : 'otra'

  // Qué función es, con lo que se lee directamente de la ecuación.
  if (tipo === 'lineal' || tipo === 'constante') {
    const m = pol[1] ?? CERO, b = pol[0]
    datos.push({ etiqueta: tri(l => T(l, 'Pendiente (m)', 'Slope (m)', 'Pendent (m)')), valor: tri(() => fracTexto(m)) })
    datos.push({ etiqueta: tri(l => T(l, 'Ordenada en el origen (b)', 'Y-intercept (b)', "Ordenada a l'origen (b)")), valor: tri(() => fracTexto(b)) })
    datos.push({ etiqueta: tri(l => T(l, 'Crecimiento', 'Behaviour', 'Creixement')), valor: tri(l => m.n > 0
      ? T(l, 'Creciente', 'Increasing', 'Creixent') : m.n < 0 ? T(l, 'Decreciente', 'Decreasing', 'Decreixent') : T(l, 'Constante', 'Constant', 'Constant')) })
  }

  // Corte con el eje Y: x = 0.
  const y0 = f(0)
  if (Number.isFinite(y0)) {
    const yT = pol ? fracTexto(pol[0]) : null
    puntos.push(punto(0, y0, 'ejeY', tri(l => T(l, 'Corte con el eje Y', 'Y-axis crossing', "Tall amb l'eix Y")), tri(l => `(0, ${yT ?? `≈ ${aprox(y0, l)}`})`)))
    secciones.push({ titulo: tri(l => T(l, 'Corte con el eje Y', 'Where it crosses the Y axis', "Tall amb l'eix Y")), pasos: [
      tri(l => T(l, 'En el eje Y, x vale 0. Sustituimos:', 'On the Y axis, x is 0. Substitute:', "A l'eix Y, x val 0. Substituïm:")),
      tri(l => `y = f(0) = ${yT ?? `≈ ${aprox(y0, l)}`}  →  (0, ${yT ?? `≈ ${aprox(y0, l)}`})`),
    ] })
  } else {
    secciones.push({ titulo: tri(l => T(l, 'Corte con el eje Y', 'Where it crosses the Y axis', "Tall amb l'eix Y")), pasos: [
      tri(l => T(l, 'La función no está definida en x = 0: no corta el eje Y.', 'The function is not defined at x = 0: it does not cross the Y axis.', "La funció no està definida a x = 0: no talla l'eix Y.")),
    ] })
  }

  // Cortes con el eje X: y = 0.
  const tituloX = tri(l => T(l, 'Cortes con el eje X', 'Where it crosses the X axis', "Talls amb l'eix X"))
  // Cada punto se etiqueta en singular: el título de la sección es plural.
  const corteX = tri(l => T(l, 'Corte con el eje X', 'X-axis crossing', "Tall amb l'eix X"))
  const exactas = pol && g <= 2 ? raicesExactas(pol) : null
  if (exactas) {
    const pasos = [tri(l => T(l, 'En el eje X, y vale 0. Resolvemos:', 'On the X axis, y is 0. Solve:', "A l'eix X, y val 0. Resolem:")), ...exactas.pasos]
    for (const rz of exactas.raices) {
      const x = surdValor(rz)
      puntos.push(punto(x, 0, 'ejeX', corteX, tri(l => `(${surdTexto(rz)}${rz.r !== 1 ? ` ≈ ${aprox(x, l)}` : ''}, 0)`)))
    }
    if (exactas.todas) pasos.push(tri(l => T(l, 'La función es y = 0: coincide con el eje X.', 'The function is y = 0: it is the X axis itself.', "La funció és y = 0: coincideix amb l'eix X.")))
    else if (!exactas.raices.length) pasos.push(tri(l => T(l, 'No corta el eje X.', 'It does not cross the X axis.', "No talla l'eix X.")))
    secciones.push({ titulo: tituloX, pasos })
  } else {
    const xs = raicesNumericas(f)
    for (const x of xs) puntos.push(punto(x, 0, 'ejeX', corteX, tri(l => `(≈ ${aprox(x, l)}, 0)`)))
    secciones.push({ titulo: tituloX, pasos: [
      tri(l => T(l,
        'Esta función no se resuelve con la fórmula de las rectas ni la de las parábolas, así que los cortes se buscan numéricamente (entre x = −100 y x = 100) y son aproximados.',
        'This function cannot be solved with the line or parabola formulas, so the crossings are found numerically (between x = −100 and x = 100) and are approximate.',
        'Aquesta funció no es resol amb la fórmula de les rectes ni la de les paràboles, així que els talls es busquen numèricament (entre x = −100 i x = 100) i són aproximats.')),
      tri(l => xs.length
        ? xs.map(x => `x ≈ ${aprox(x, l)}`).join('   ')
        : T(l, 'No se ha encontrado ningún corte con el eje X en ese intervalo.', 'No X-axis crossing was found in that range.', "No s'ha trobat cap tall amb l'eix X en aquest interval.")),
    ] })
  }

  // Vértice de la parábola.
  if (tipo === 'cuadratica') {
    const [, b, a] = pol
    const xv = dividir(opuesto(b), multiplicar(frac(2), a))
    const yv = polEvaluar(pol, xv)
    const abre = a.n > 0
    puntos.push(punto(valor(xv), valor(yv), 'vertice', tri(l => T(l, 'Vértice', 'Vertex', 'Vèrtex')), tri(() => `(${fracTexto(xv)}, ${fracTexto(yv)})`)))
    datos.push({ etiqueta: tri(l => T(l, 'Eje de simetría', 'Axis of symmetry', 'Eix de simetria')), valor: tri(() => `x = ${fracTexto(xv)}`) })
    datos.push({ etiqueta: tri(l => T(l, 'Abre hacia', 'Opens', 'Obre cap a')), valor: tri(l => abre ? T(l, 'arriba (a > 0)', 'upwards (a > 0)', 'amunt (a > 0)') : T(l, 'abajo (a < 0)', 'downwards (a < 0)', 'avall (a < 0)')) })
    secciones.push({ titulo: tri(l => T(l, 'Vértice', 'Vertex', 'Vèrtex')), pasos: [
      tri(() => `xᵥ = −b / 2a = ${fracTexto(opuesto(b))} / ${par(multiplicar(frac(2), a))} = ${fracTexto(xv)}`),
      tri(() => `yᵥ = f(${fracTexto(xv)}) = ${fracTexto(yv)}`),
      tri(l => abre
        ? T(l, `a = ${fracTexto(a)} es positivo: la parábola abre hacia arriba y el vértice es el punto más bajo (mínimo).`, `a = ${fracTexto(a)} is positive: the parabola opens upwards and the vertex is its lowest point (minimum).`, `a = ${fracTexto(a)} és positiu: la paràbola obre cap amunt i el vèrtex és el punt més baix (mínim).`)
        : T(l, `a = ${fracTexto(a)} es negativo: la parábola abre hacia abajo y el vértice es el punto más alto (máximo).`, `a = ${fracTexto(a)} is negative: the parabola opens downwards and the vertex is its highest point (maximum).`, `a = ${fracTexto(a)} és negatiu: la paràbola obre cap avall i el vèrtex és el punt més alt (màxim).`)),
    ] })
  }

  return { tipo, exacta: !!(pol && g <= 2), ecuacion: fn.ecuacion, datos, puntos, secciones }
}

// ── Dos funciones: dónde se cruzan ──────────────────────────────────────────

export function cortarFunciones(fa, fb) {
  const puntos = []
  const pasos = [tri(l => T(l,
    `Donde se cortan, las dos dan la misma y. Igualamos: ${fa.ecuacion.slice(4)} = ${fb.ecuacion.slice(4)}`,
    `Where they cross, both give the same y. Set them equal: ${fa.ecuacion.slice(4)} = ${fb.ecuacion.slice(4)}`,
    `On es tallen, les dues donen la mateixa y. Igualem: ${fa.ecuacion.slice(4)} = ${fb.ecuacion.slice(4)}`))]
  let relacion = 'corte' // corte | iguales | nunca

  const h = fa.pol && fb.pol ? polRestar(fa.pol, fb.pol) : null
  const exactas = h && grado(h) <= 2 ? raicesExactas(h) : null

  if (exactas) {
    pasos.push(tri(l => T(l, 'Pasamos todo a un lado:', 'Move everything to one side:', "Passem tot a un costat:")), ...exactas.pasos)
    if (exactas.todas) relacion = 'iguales'
    else if (!exactas.raices.length) relacion = 'nunca'
    // La y se calcula con la función de menor grado: si una es recta, la y de
    // un corte con raíz sale exacta (m·(p + q√r) + b sigue siendo p' + q'√r).
    const base = grado(fa.pol) <= grado(fb.pol) ? fa : fb
    for (const rz of exactas.raices) {
      const x = surdValor(rz)
      let yTexto
      if (rz.r === 1) yTexto = () => fracTexto(polEvaluar(base.pol, sumar(rz.p, rz.q)))
      else if (grado(base.pol) <= 1) {
        const m = base.pol[1] ?? CERO, b = base.pol[0]
        const ys = { p: sumar(multiplicar(m, rz.p), b), q: multiplicar(m, rz.q), r: rz.r }
        yTexto = l => `${surdTexto(ys)} ≈ ${aprox(surdValor(ys), l)}`
      } else yTexto = l => `≈ ${aprox(base.f(x), l)}`
      const xTexto = l => `${surdTexto(rz)}${rz.r !== 1 ? ` ≈ ${aprox(x, l)}` : ''}`
      puntos.push(punto(x, base.f(x), 'corte', tri(l => T(l, 'Punto de corte', 'Crossing point', 'Punt de tall')), tri(l => `(${xTexto(l)}, ${yTexto(l)})`)))
      pasos.push(tri(l => T(l,
        `Sustituimos x = ${xTexto(l)} en ${base.ecuacion}: y = ${yTexto(l)}`,
        `Substitute x = ${xTexto(l)} into ${base.ecuacion}: y = ${yTexto(l)}`,
        `Substituïm x = ${xTexto(l)} a ${base.ecuacion}: y = ${yTexto(l)}`)))
    }
    if (relacion === 'nunca' && grado(fa.pol) === 1 && grado(fb.pol) === 1) {
      pasos.push(tri(l => T(l, 'Las dos rectas tienen la misma pendiente y distinta ordenada: son paralelas.', 'Both lines have the same slope and a different intercept: they are parallel.', 'Les dues rectes tenen el mateix pendent i diferent ordenada: són paral·leles.')))
    }
  } else {
    const d = x => fa.f(x) - fb.f(x)
    const xs = raicesNumericas(d)
    if (!xs.length) relacion = 'nunca'
    for (const x of xs) {
      puntos.push(punto(x, fa.f(x), 'corte', tri(l => T(l, 'Punto de corte', 'Crossing point', 'Punt de tall')), tri(l => `(≈ ${aprox(x, l)}, ≈ ${aprox(fa.f(x), l)})`)))
    }
    pasos.push(tri(l => T(l,
      'La ecuación que queda no es de primer ni de segundo grado, así que los cortes se buscan numéricamente (entre x = −100 y x = 100) y son aproximados.',
      'The resulting equation is neither linear nor quadratic, so the crossings are found numerically (between x = −100 and x = 100) and are approximate.',
      "L'equació que queda no és de primer ni de segon grau, així que els talls es busquen numèricament (entre x = −100 i x = 100) i són aproximats.")),
      tri(l => xs.length ? xs.map(x => `x ≈ ${aprox(x, l)}`).join('   ') : T(l, 'No se ha encontrado ningún corte en ese intervalo.', 'No crossing was found in that range.', "No s'ha trobat cap tall en aquest interval.")))
  }

  return { relacion, exacta: !!exactas, puntos, pasos }
}

// ── Rango de la gráfica ─────────────────────────────────────────────────────

// Qué trozo del plano dibujar: el que enseña los puntos importantes y la
// forma de la curva. Las y se recortan por percentiles para que una asíntota
// (1/x cerca de 0) no aplaste todo lo demás contra el eje.
//
// Las x se centran en los puntos, y no en un ±10 fijo: con ±10 (y redondeado
// a ±20) la parábola x² − 4x + 3 subía hasta 400 en los bordes, y el vértice y
// los dos cortes, que son lo único que interesa, quedaban en un rincón. El
// origen entra siempre para que se vean los dos ejes.
export function rangoGrafica(funciones, puntos = []) {
  const px = puntos.map(p => p.x).filter(Number.isFinite)
  const py = puntos.map(p => p.y).filter(Number.isFinite)
  const lo = Math.min(0, ...px)
  const hi = Math.max(0, ...px)
  const semi = Math.max(((hi - lo) / 2) * 1.35, 5)
  const xmin = (lo + hi) / 2 - semi
  const xmax = (lo + hi) / 2 + semi
  const ys = []
  for (const fn of funciones) {
    for (let k = 0; k <= 200; k++) {
      const y = fn.f(xmin + ((xmax - xmin) * k) / 200)
      if (Number.isFinite(y)) ys.push(y)
    }
  }
  ys.sort((a, b) => a - b)
  const q = t => (ys.length ? ys[Math.floor((ys.length - 1) * t)] : 0)
  let ymin = Math.min(q(0.05), ...py, 0)
  let ymax = Math.max(q(0.95), ...py, 0)
  // Una recta casi horizontal daría un rango de milésimas: mínimo 6 de alto.
  if (ymax - ymin < 6) { const c = (ymax + ymin) / 2; ymin = c - 3; ymax = c + 3 }
  const margen = (ymax - ymin) * 0.12
  ymin -= margen; ymax += margen
  return { xmin, xmax, ymin, ymax }
}
