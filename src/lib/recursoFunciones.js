// ── /recursos/funciones: los cinco problemas y cómo se resuelve cada uno ─────
//
// Cada tipo de problema tiene su propia URL (/recursos/funciones/punto-de-corte…)
// porque cada uno es una búsqueda distinta: quien busca "recta que pasa por dos
// puntos" no quiere aterrizar en una calculadora genérica y buscar la pestaña.
//
// Este módulo es puro: dice qué campos pide cada tipo, qué ejemplos ofrece y
// cómo convertir lo escrito en un resultado que la página solo tiene que
// pintar. Así se puede probar entero sin montar React.

import { ErrorExpresion } from './expresion'
import { prepararFuncion, analizarFuncion, cortarFunciones, rangoGrafica, tri } from './problemasFunciones'
import { leerNumero, rectaPorDosPuntos, rectaPendientePunto, puntoPertenece } from './problemasRectas'

const T = (l, es, en, ca) => ({ es, en, ca })[l]

export const BASE = '/recursos/funciones'
export const COLORES = ['#7dd3fc', '#f472b6']

// Color de cada clase de punto, el mismo en el plano y en la leyenda.
export const COLOR_PUNTO = {
  ejeX: '#38bdf8',
  ejeY: '#a78bfa',
  vertice: '#EDAE49',
  corte: '#22c55e',
  dado: '#f472b6',
  imagen: '#fb923c',
}

const FUNCION = { es: 'Función', en: 'Function', ca: 'Funció' }

export const TIPOS = [
  {
    id: 'analizar', slug: '', emoji: '📈',
    titulo: { es: 'Dibujar y analizar una función', en: 'Graph and analyse a function', ca: 'Dibuixar i analitzar una funció' },
    corto: { es: 'Analizar', en: 'Analyse', ca: 'Analitzar' },
    intro: {
      es: 'Escribe la función y verás su gráfica con los cortes con los ejes, el vértice si es una parábola y la pendiente si es una recta, cada uno con sus pasos.',
      en: 'Type the function and see its graph with the axis crossings, the vertex if it is a parabola and the slope if it is a line, each with its steps.',
      ca: "Escriu la funció i veuràs la gràfica amb els talls amb els eixos, el vèrtex si és una paràbola i el pendent si és una recta, cadascun amb els seus passos.",
    },
    campos: [{ id: 'f', tipo: 'funcion', etiqueta: FUNCION }],
    ejemplos: [{ f: 'x² − 4x + 3' }, { f: '2x − 5' }, { f: '−x² + 2x + 3' }, { f: '1/x' }],
  },
  {
    id: 'corte', slug: 'punto-de-corte', emoji: '✖️',
    titulo: { es: 'Punto de corte de dos funciones', en: 'Where two functions cross', ca: 'Punt de tall de dues funcions' },
    corto: { es: 'Punto de corte', en: 'Crossing', ca: 'Punt de tall' },
    intro: {
      es: 'Dos rectas, o una recta y una parábola: dónde se cruzan, igualando las dos ecuaciones y resolviendo.',
      en: 'Two lines, or a line and a parabola: where they cross, by setting both equations equal and solving.',
      ca: 'Dues rectes, o una recta i una paràbola: on es creuen, igualant les dues equacions i resolent.',
    },
    campos: [
      { id: 'f', tipo: 'funcion', etiqueta: { es: 'Primera función', en: 'First function', ca: 'Primera funció' } },
      { id: 'g', tipo: 'funcion', etiqueta: { es: 'Segunda función', en: 'Second function', ca: 'Segona funció' } },
    ],
    ejemplos: [{ f: '2x + 3', g: '−x + 6' }, { f: 'x²', g: 'x + 2' }, { f: 'x²', g: '2x + 1' }, { f: '2x + 1', g: '2x + 5' }],
  },
  {
    id: 'dos-puntos', slug: 'recta-dos-puntos', emoji: '📍',
    titulo: { es: 'Recta que pasa por dos puntos', en: 'Line through two points', ca: 'Recta que passa per dos punts' },
    corto: { es: 'Dos puntos', en: 'Two points', ca: 'Dos punts' },
    intro: {
      es: 'Con dos puntos se saca la pendiente y, con ella, la ecuación de la recta. Luego se comprueba con el otro punto.',
      en: 'Two points give the slope and, from it, the equation of the line. Then it is checked against the other point.',
      ca: "Amb dos punts es treu el pendent i, amb ell, l'equació de la recta. Després es comprova amb l'altre punt.",
    },
    campos: [
      { id: 'a', tipo: 'punto', etiqueta: { es: 'Punto A', en: 'Point A', ca: 'Punt A' } },
      { id: 'b', tipo: 'punto', etiqueta: { es: 'Punto B', en: 'Point B', ca: 'Punt B' } },
    ],
    ejemplos: [{ ax: '0', ay: '2', bx: '3', by: '8' }, { ax: '1', ay: '1', bx: '3', by: '2' }, { ax: '−2', ay: '5', bx: '4', by: '−1' }],
  },
  {
    id: 'pendiente-punto', slug: 'recta-pendiente-punto', emoji: '📐',
    titulo: { es: 'Recta con pendiente y un punto', en: 'Line from a slope and a point', ca: 'Recta amb pendent i un punt' },
    corto: { es: 'Pendiente y punto', en: 'Slope and point', ca: 'Pendent i punt' },
    intro: {
      es: 'Si conoces la pendiente y un punto por el que pasa, la forma punto-pendiente da la ecuación de la recta.',
      en: 'If you know the slope and one point it passes through, point-slope form gives the equation of the line.',
      ca: "Si coneixes el pendent i un punt per on passa, la forma punt-pendent dona l'equació de la recta.",
    },
    campos: [
      { id: 'm', tipo: 'numero', etiqueta: { es: 'Pendiente (m)', en: 'Slope (m)', ca: 'Pendent (m)' } },
      { id: 'p', tipo: 'punto', etiqueta: { es: 'Punto', en: 'Point', ca: 'Punt' } },
    ],
    ejemplos: [{ m: '3', px: '0', py: '0' }, { m: '−1/2', px: '4', py: '1' }, { m: '2', px: '−1', py: '3' }],
  },
  {
    id: 'pertenece', slug: 'punto-pertenece', emoji: '🎯',
    titulo: { es: '¿Está el punto en la gráfica?', en: 'Is the point on the graph?', ca: 'És el punt a la gràfica?' },
    corto: { es: '¿Pasa por el punto?', en: 'On the graph?', ca: 'Passa pel punt?' },
    intro: {
      es: 'Se sustituye la x del punto en la función y se compara con su y. Si no coincide, verás qué punto de la gráfica tiene esa x.',
      en: "Substitute the point's x into the function and compare with its y. If they differ, you will see which point on the graph has that x.",
      ca: 'Se substitueix la x del punt a la funció i es compara amb la seva y. Si no coincideix, veuràs quin punt de la gràfica té aquesta x.',
    },
    campos: [
      { id: 'f', tipo: 'funcion', etiqueta: FUNCION },
      { id: 'p', tipo: 'punto', etiqueta: { es: 'Punto', en: 'Point', ca: 'Punt' } },
    ],
    ejemplos: [{ f: '−x + 4', px: '6', py: '−2' }, { f: 'x²', px: '3', py: '8' }, { f: '2x − 1', px: '1/2', py: '0' }],
  },
]

export const rutaDe = tipo => (tipo.slug ? `${BASE}/${tipo.slug}` : BASE)
export const tipoPorSlug = slug => TIPOS.find(t => t.slug === (slug ?? '')) ?? null

// Las claves de valor que usa un tipo: un punto son dos casillas, "px" y "py".
export const clavesDe = tipo => tipo.campos.flatMap(c => (c.tipo === 'punto' ? [`${c.id}x`, `${c.id}y`] : [c.id]))

// Lo que la página pinta: ecuaciones con su color, curvas, puntos, datos
// sueltos (pendiente, eje de simetría…), secciones de pasos y el rango. Se
// exporta porque el recurso de ecuaciones pinta con el mismo componente.
export function completar(r) {
  const funciones = (r.funciones ?? []).map((fn, i) => ({ f: fn.f, color: COLORES[i] }))
  const verticales = (r.verticales ?? []).map((v, i) => ({ ...v, color: COLORES[i] }))
  const puntos = r.puntos ?? []
  return {
    datos: [], secciones: [], exacta: true,
    ...r,
    ok: true,
    puntos,
    funciones,
    verticales,
    ecuaciones: (r.ecuaciones ?? []).map((texto, i) => ({ texto, color: COLORES[i] })),
    rango: rangoGrafica(funciones, [...puntos, ...verticales.map(v => ({ x: v.x, y: 0 }))]),
  }
}

const mismoSitio = (p, q) => Math.abs(p.x - q.x) < 1e-9 && Math.abs(p.y - q.y) < 1e-9

// Una recta obtenida de un problema se analiza además como función: lo que el
// alumno quiere saber después de la ecuación es por dónde pasa. Los cortes que
// coinciden con un punto dado no se repiten en el dibujo.
function deRecta(r, titulo) {
  const base = { puntos: r.puntos, secciones: [{ titulo, pasos: r.pasos }] }
  if (r.tipo === 'vertical') return completar({ ...base, ecuaciones: [r.ecuacion], verticales: [{ x: r.puntos[0].x }] })
  if (r.tipo !== 'recta') return completar(base)
  const fn = prepararFuncion(r.ecuacion)
  const a = analizarFuncion(fn)
  return completar({
    ...base,
    ecuaciones: [r.ecuacion],
    funciones: [fn],
    datos: a.datos,
    puntos: [...r.puntos, ...a.puntos.filter(p => !r.puntos.some(q => mismoSitio(p, q)))],
    secciones: [...base.secciones, ...a.secciones],
  })
}

const TITULO_RECTA = tri(l => T(l, 'Ecuación de la recta', 'Equation of the line', 'Equació de la recta'))

// Devuelve { ok: true, … } o { ok: false, error: { campo, codigo, detalle } }.
// `campo` es la clave de la casilla que no se ha entendido, para marcarla.
export function resolver(tipo, valores) {
  const leer = (clave, fn) => {
    try {
      return fn(valores[clave] ?? '')
    } catch (e) {
      if (e instanceof ErrorExpresion) throw Object.assign(new Error(e.codigo), { campo: clave, codigo: e.codigo, detalle: e.detalle })
      throw e
    }
  }
  const punto = id => ({ x: leer(`${id}x`, leerNumero), y: leer(`${id}y`, leerNumero) })

  try {
    switch (tipo.id) {
      case 'analizar': {
        const fn = leer('f', prepararFuncion)
        const a = analizarFuncion(fn)
        return completar({ ...a, ecuaciones: [fn.ecuacion], funciones: [fn] })
      }
      case 'corte': {
        const fa = leer('f', prepararFuncion)
        const fb = leer('g', prepararFuncion)
        const c = cortarFunciones(fa, fb)
        return completar({
          ecuaciones: [fa.ecuacion, fb.ecuacion], funciones: [fa, fb],
          puntos: c.puntos, exacta: c.exacta, relacion: c.relacion,
          secciones: [{ titulo: tri(l => T(l, 'Punto de corte', 'Crossing point', 'Punt de tall')), pasos: c.pasos }],
        })
      }
      case 'dos-puntos':
        return deRecta(rectaPorDosPuntos(punto('a'), punto('b')), TITULO_RECTA)
      case 'pendiente-punto':
        return deRecta(rectaPendientePunto(leer('m', leerNumero), punto('p')), TITULO_RECTA)
      case 'pertenece': {
        const fn = leer('f', prepararFuncion)
        const r = puntoPertenece(fn, punto('p'))
        return completar({
          ecuaciones: [fn.ecuacion], funciones: [fn],
          puntos: r.puntos, exacta: r.exacta, pertenece: r.pertenece,
          secciones: [{ titulo: tri(l => T(l, 'Comprobación', 'Check', 'Comprovació')), pasos: r.pasos }],
        })
      }
      default:
        return { ok: false, error: { campo: null, codigo: 'tipo', detalle: tipo.id } }
    }
  } catch (e) {
    if (e.campo) return { ok: false, error: { campo: e.campo, codigo: e.codigo, detalle: e.detalle } }
    throw e
  }
}

// Mensaje de cada error, en el idioma de la página.
export const MENSAJE_ERROR = {
  vacia: () => ({ es: 'Escribe algo aquí', en: 'Type something here', ca: 'Escriu alguna cosa aquí' }),
  caracter: d => ({ es: `No entiendo el símbolo «${d}»`, en: `I don't understand the symbol "${d}"`, ca: `No entenc el símbol «${d}»` }),
  variable: d => ({ es: `La variable es x (has escrito «${d}»)`, en: `The variable is x (you typed "${d}")`, ca: `La variable és x (has escrit «${d}»)` }),
  parentesis: () => ({ es: 'Falta abrir o cerrar un paréntesis', en: 'A bracket is missing', ca: 'Falta obrir o tancar un parèntesi' }),
  incompleta: () => ({ es: 'La expresión está incompleta', en: 'The expression is incomplete', ca: "L'expressió està incompleta" }),
  division: () => ({ es: 'Hay una división entre cero', en: 'There is a division by zero', ca: 'Hi ha una divisió entre zero' }),
  grande: () => ({ es: 'Los números son demasiado grandes', en: 'The numbers are too large', ca: 'Els nombres són massa grans' }),
  numero: () => ({ es: 'Aquí va un número, sin x', en: 'A number goes here, without x', ca: 'Aquí va un nombre, sense x' }),
  igual: () => ({ es: 'Una ecuación lleva un solo signo =', en: 'An equation has a single = sign', ca: 'Una equació porta un sol signe =' }),
}
