// ── /recursos/ecuaciones: resolver una ecuación como en el cuaderno ─────────
//
// El segundo recurso interactivo, y el ejercicio que más repite un alumno de
// ESO: "2x + 3 = x − 1", "3(x − 2) = x + 4", "x² − 5x + 6 = 0". Usa el mismo
// lector y las mismas raíces exactas que el recurso de funciones, y añade lo
// que en una ecuación no puede faltar: la COMPROBACIÓN, sustituyendo la
// solución en los dos lados.
//
// Y un puente con funciones que en clase casi nunca se hace explícito: cada
// lado de la ecuación es una función, y las soluciones son las x donde se
// cruzan sus gráficas. Por eso se dibujan los dos lados.

import { ErrorExpresion, polinomioTexto, polRestar, polEvaluar, grado, sumar, fracTexto, iguales } from './expresion'
import { prepararFuncion, raicesExactas, raicesNumericas, surdTexto, surdValor, aprox, tri } from './problemasFunciones'
import { completar } from './recursoFunciones'

const T = (l, es, en, ca) => ({ es, en, ca })[l]

export const RUTA = '/recursos/ecuaciones'

export const EJEMPLOS = ['2x + 3 = x − 1', '3(x − 2) = x + 4', 'x/2 + 1/3 = 1', 'x² − 5x + 6 = 0', 'x² = 2x + 1']

// "2x + 3 = x − 1" → [lado izquierdo, lado derecho]. Sin "=", se entiende
// "= 0", que es como se escriben casi todas las de segundo grado.
export function leerEcuacion(texto) {
  const partes = String(texto ?? '').split('=')
  if (partes.length > 2) throw new ErrorExpresion('igual')
  const [izq, der] = partes
  if (!izq.trim()) throw new ErrorExpresion('vacia')
  if (der !== undefined && !der.trim()) throw new ErrorExpresion('incompleta', '=')
  return [prepararFuncion(izq), prepararFuncion(der ?? '0')]
}

const lado = fn => (fn.pol ? polinomioTexto(fn.pol) : fn.texto)

function solucionExacta(A, B) {
  const h = polRestar(A.pol, B.pol)
  if (grado(h) > 2) return null
  const ex = raicesExactas(h)
  if (!ex) return null

  const g = grado(h)
  const pasos = [
    tri(l => T(l, 'Pasamos todo al lado izquierdo y agrupamos términos:', 'Move everything to the left and collect like terms:', "Passem tot al costat esquerre i agrupem termes:")),
    ...ex.pasos,
  ]
  if (ex.todas) {
    pasos.push(tri(l => T(l,
      'Los dos lados son la misma expresión: la ecuación se cumple para cualquier x (es una identidad).',
      'Both sides are the same expression: the equation holds for every x (it is an identity).',
      'Els dos costats són la mateixa expressió: l\'equació es compleix per a qualsevol x (és una identitat).')))
  } else if (!ex.raices.length) {
    pasos.push(tri(l => T(l, 'La ecuación no tiene solución.', 'The equation has no solution.', "L'equació no té solució.")))
  }

  // Comprobación: solo con soluciones racionales, que son las que se
  // sustituyen a mano. Con una raíz irracional el cálculo sería más largo que
  // la propia ecuación.
  const comprobacion = ex.raices.filter(rz => rz.r === 1).map(rz => {
    const x = sumar(rz.p, rz.q)
    const i = polEvaluar(A.pol, x), d = polEvaluar(B.pol, x)
    return tri(l => T(l,
      `Con x = ${fracTexto(x)}: izquierda = ${fracTexto(i)}, derecha = ${fracTexto(d)} ${iguales(i, d) ? '✓' : '✗'}`,
      `With x = ${fracTexto(x)}: left = ${fracTexto(i)}, right = ${fracTexto(d)} ${iguales(i, d) ? '✓' : '✗'}`,
      `Amb x = ${fracTexto(x)}: esquerra = ${fracTexto(i)}, dreta = ${fracTexto(d)} ${iguales(i, d) ? '✓' : '✗'}`))
  })

  return {
    grado: g,
    todas: !!ex.todas,
    soluciones: ex.raices.map(rz => ({ x: surdValor(rz), texto: l => `${surdTexto(rz)}${rz.r !== 1 ? ` ≈ ${aprox(surdValor(rz), l)}` : ''}` })),
    pasos,
    comprobacion,
  }
}

function solucionNumerica(A, B) {
  const xs = raicesNumericas(x => A.f(x) - B.f(x))
  return {
    grado: null,
    todas: false,
    soluciones: xs.map(x => ({ x, texto: l => `≈ ${aprox(x, l)}` })),
    pasos: [
      tri(l => T(l,
        'No es de primer ni de segundo grado, así que las soluciones se buscan numéricamente (entre x = −100 y x = 100) y son aproximadas.',
        'It is neither linear nor quadratic, so the solutions are found numerically (between x = −100 and x = 100) and are approximate.',
        "No és de primer ni de segon grau, així que les solucions es busquen numèricament (entre x = −100 i x = 100) i són aproximades.")),
      tri(l => (xs.length ? xs.map(x => `x ≈ ${aprox(x, l)}`).join('   ') : T(l, 'No se ha encontrado ninguna solución en ese intervalo.', 'No solution was found in that range.', "No s'ha trobat cap solució en aquest interval."))),
    ],
    comprobacion: [],
  }
}

const TIPO = {
  1: { es: 'Primer grado', en: 'Linear', ca: 'Primer grau' },
  2: { es: 'Segundo grado', en: 'Quadratic', ca: 'Segon grau' },
  0: { es: 'Sin x (identidad o imposible)', en: 'No x (identity or impossible)', ca: 'Sense x (identitat o impossible)' },
}

// Mismo contrato que resolver() de recursoFunciones: { ok, … } o
// { ok: false, error: { campo: 'e', codigo, detalle } }.
export function resolverEcuacion(texto) {
  let A, B
  try {
    [A, B] = leerEcuacion(texto)
  } catch (e) {
    if (e instanceof ErrorExpresion) return { ok: false, error: { campo: 'e', codigo: e.codigo, detalle: e.detalle } }
    throw e
  }

  const s = (A.pol && B.pol && solucionExacta(A, B)) || solucionNumerica(A, B)
  const exacta = s.grado !== null

  // Se empieza por la ecuación TAL COMO SE ESCRIBIÓ. Si operar cada lado la
  // cambia (quitar paréntesis, agrupar), ese es un paso más y se enseña: con
  // "3(x − 2) = x + 4" el alumno tiene que ver de dónde sale "3x − 6". Si solo
  // cambia la forma de escribir (x^2 por x², espacios), no se repite.
  const original = `${A.texto} = ${B.texto}`
  const operada = `${lado(A)} = ${lado(B)}`
  const compacta = t => t.replace(/\s+/g, '').replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/[−–]/g, '-').replace(/[*·]/g, '')
  const inicio = [tri(() => original)]
  if (compacta(original) !== compacta(operada)) {
    inicio.push(
      tri(l => T(l, 'Operamos en cada lado (quitamos paréntesis y agrupamos):', 'Simplify each side (expand brackets and collect terms):', 'Operem a cada costat (traiem parèntesis i agrupem):')),
      tri(() => operada),
    )
  }

  const secciones = [
    { titulo: tri(l => T(l, 'Resolución', 'Solving', 'Resolució')), pasos: [...inicio, ...s.pasos] },
  ]
  if (s.comprobacion.length) {
    secciones.push({ titulo: tri(l => T(l, 'Comprobación', 'Check', 'Comprovació')), pasos: [
      tri(l => T(l, 'Sustituimos cada solución en los dos lados: tienen que dar lo mismo.', 'Substitute each solution into both sides: they must match.', 'Substituïm cada solució als dos costats: han de donar el mateix.')),
      ...s.comprobacion,
    ] })
  }
  secciones.push({ titulo: tri(l => T(l, 'En la gráfica', 'On the graph', 'A la gràfica')), pasos: [
    tri(l => T(l,
      `Cada lado es una función: y = ${lado(A)} (azul) e y = ${lado(B)} (rosa). Las soluciones son las x donde se cruzan las dos gráficas.`,
      `Each side is a function: y = ${lado(A)} (blue) and y = ${lado(B)} (pink). The solutions are the x values where the two graphs cross.`,
      `Cada costat és una funció: y = ${lado(A)} (blau) i y = ${lado(B)} (rosa). Les solucions són les x on es creuen les dues gràfiques.`)),
  ] })

  const datos = []
  if (exacta) datos.push({ etiqueta: tri(l => T(l, 'Tipo', 'Type', 'Tipus')), valor: tri(l => T(l, TIPO[s.grado].es, TIPO[s.grado].en, TIPO[s.grado].ca)) })
  datos.push({ etiqueta: tri(l => T(l, 'Soluciones', 'Solutions', 'Solucions')), valor: tri(l => (s.todas
    ? T(l, 'Infinitas', 'Infinitely many', 'Infinites')
    : String(s.soluciones.length))) })

  return completar({
    exacta,
    ecuaciones: [`y = ${lado(A)}`, `y = ${lado(B)}`],
    funciones: [A, B],
    datos,
    secciones,
    soluciones: s.soluciones.map(x => ({ x: x.x, texto: tri(l => `x = ${x.texto(l)}`) })),
    puntos: s.soluciones.map(x => ({
      x: x.x, y: A.f(x.x), clase: 'corte',
      etiqueta: tri(l => T(l, 'Solución', 'Solution', 'Solució')),
      texto: tri(l => `x = ${x.texto(l)}`),
    })),
  })
}
