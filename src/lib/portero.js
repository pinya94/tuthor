// ── Motor de El Portero ─────────────────────────────────────────────────────
//
// Genera los tiros en vez de sacarlos de una lista. Antes había 36 niveles
// escritos a mano, 12 por dificultad, y una partida dura 90 segundos: daba
// tiempo a verlos todos, así que a la segunda ya no se calculaba f(3), se
// recordaba la respuesta. Y ampliar el juego costaba escribir una función de
// JavaScript más su explicación, o sea tiempo de programar y no de contenido.
//
// SE GENERA AL REVÉS, como en lecturaGraficos y estadisticoEngine: primero se
// elige la ZONA en la que tiene que caer el balón, luego un valor bonito
// dentro de ella, y solo entonces se busca una función que pase por ahí. Al
// derecho —sortear la función y ver dónde cae— la mayoría de los tiros se
// irían fuera de la portería y las cuatro zonas saldrían descompensadas.
//
// Tres cosas quedan garantizadas por construcción, y hay un test de cada una:
//
//   · f(3) cae al menos a media unidad de la frontera entre zonas. Un tiro que
//     acaba en y = 2 exacto es zona A por la regla, pero en la pantalla no hay
//     forma de distinguirlo del borde de la B: eso mide vista, no cálculo.
//   · el balón sale de un punto con coordenada exacta y visible en el campo,
//     nunca de 1,3333…
//   · las cuatro zonas salen con la misma frecuencia. Si una fuese rara, se
//     acertaría descartando en vez de calculando.
//
// La partida y el examen usan el MISMO generador, así que "difícil" significa
// lo mismo en los dos sitios.

export const GOAL_X = 3

// Las cuatro bandas de la portería, tal y como las pinta la página. La
// frontera pertenece a la banda de arriba: y = 2 es A, y = 0 es B, y = −2 es C.
export const ZONAS = [
  { id: 'A', min: 2, max: 4 },
  { id: 'B', min: 0, max: 2 },
  { id: 'C', min: -2, max: 0 },
  { id: 'D', min: -4, max: -2 },
]
export const ZONA_IDS = ZONAS.map(z => z.id)

export function zonaDe(y) {
  if (y >= 2) return 'A'
  if (y >= 0) return 'B'
  if (y >= -2) return 'C'
  return 'D'
}

// Dónde puede caer el balón en cada zona. No son todos los valores posibles:
// son los que quedan a media unidad o más de las fronteras (0, ±2) y dentro
// del hueco de la portería, que llega a ±4.
export const MARGEN_FRONTERA = 0.5
const DIANAS = {
  A: [2.5, 3, 3.5],
  B: [0.5, 1, 1.5],
  C: [-0.5, -1, -1.5],
  D: [-2.5, -3, -3.5],
}

// Desde dónde puede salir el balón. Nunca desde x = 3, que es la portería.
const SALIDAS = [-3, -2, -1, 0]
// Lo más alto que puede salir y seguir viéndose bien (el campo llega a y = ±5).
const ALTURA_MAX_SALIDA = 4.5

const pick = (arr, aleatorio = Math.random) => arr[Math.floor(aleatorio() * arr.length)]
const redondea = v => Math.round(v * 1e6) / 1e6
// "Exacto" = entero o mitad. Un balón que sale de y = 1,333 no se puede leer
// en una cuadrícula de unidades.
const exacto = v => Number.isFinite(v) && Math.abs(v * 2 - Math.round(v * 2)) < 1e-9

// ── Rectas: f(x) = (a/d)·x + b ──────────────────────────────────────────────
// Solo denominadores 1, 2, 3 y 6: son los que dejan 3·(a/d) en un entero o en
// una mitad, y por tanto los únicos que permiten que f(3) caiga en una diana.
// Con denominador 4 la cuenta sale en cuartos y deja de poder hacerse de
// cabeza. El 1/6 es la pendiente más suave que existe aquí: en x = 3 sube
// media unidad, y por eso vive en el nivel fácil.
const PENDIENTES = [
  { a: 1, d: 6 }, { a: -1, d: 6 },
  { a: 1, d: 3 }, { a: -1, d: 3 }, { a: 2, d: 3 }, { a: -2, d: 3 },
  { a: 1, d: 2 }, { a: -1, d: 2 }, { a: 3, d: 2 }, { a: -3, d: 2 },
  { a: 1, d: 1 }, { a: -1, d: 1 }, { a: 2, d: 1 }, { a: -2, d: 1 },
  { a: 4, d: 3 }, { a: -4, d: 3 },
]
const valor = m => m.a / m.d

// Fácil pide leer UNA cosa: una pendiente suave y un desplazamiento pequeño.
// Medio obliga a combinar pendiente e intercepto, y por eso el intercepto no
// puede ser cero: con b = 0 basta mirar la pendiente.
const RECTAS = {
  facil: { pendientes: PENDIENTES.filter(m => Math.abs(valor(m)) <= 1), bMin: -3, bMax: 3, bCero: true },
  medio: { pendientes: PENDIENTES, bMin: -4, bMax: 4, bCero: false },
}

// ── Parábolas (difícil) ─────────────────────────────────────────────────────
// En x = 3 el término cuadrático vale 9a y manda sobre todo lo demás, así que
// es lo primero que hay que mirar. Con a = ±1/2 vale ±4,5 y la diana cae en
// una mitad; con a = ±1, en un entero. Emparejarlos así deja el término
// independiente siempre entero.
const CUADRATICOS = [
  { num: 1, den: 1 }, { num: -1, den: 1 },
  { num: 1, den: 2 }, { num: -1, den: 2 },
]

// ── Formato ─────────────────────────────────────────────────────────────────
// El menos es U+2212, el signo matemático, no el guion del teclado: en la
// fuente del juego el guion queda demasiado corto al lado de un número.
const MENOS = '−'

function fmt(v) {
  const r = redondea(v)
  return String(r).replace('-', MENOS)
}

// El término (a/d)·t. `esVar` distingue "2x/3" de "2·3/3": con la variable no
// se escribe el punto de multiplicar, y con un número sí, o "23" se leería mal.
function cuerpoTermino(a, d, t, esVar) {
  const abs = Math.abs(a)
  const nucleo = abs === 1 ? String(t) : (esVar ? abs + String(t) : abs + '·' + t)
  return d === 1 ? nucleo : nucleo + '/' + d
}

// Primer término de la fórmula: el signo va pegado.
function terminoInicial(a, d, t, esVar) {
  if (a === 0) return ''
  return (a < 0 ? MENOS : '') + cuerpoTermino(a, d, t, esVar)
}

// Término que va detrás de otro: el signo va suelto, con espacios.
function terminoSiguiente(a, d, t, esVar) {
  if (a === 0) return ''
  return (a < 0 ? ` ${MENOS} ` : ' + ') + cuerpoTermino(a, d, t, esVar)
}

const constante = b => (b === 0 ? '' : (b < 0 ? ` ${MENOS} ` : ' + ') + Math.abs(b))

function formulaRecta({ a, d, b }, t, esVar) {
  return (terminoInicial(a, d, t, esVar) || '0') + constante(b)
}

function formulaParabola({ a2, a1, a0 }, t, esVar) {
  const base = esVar ? 'x²' : `${t}²`
  const cabeza = (a2.num < 0 ? MENOS : '') + base + (a2.den === 1 ? '' : '/' + a2.den)
  return cabeza + terminoSiguiente(a1, 1, t, esVar) + constante(a0)
}

const RANGO = {
  A: 'y ≥ 2',
  B: '0 ≤ y < 2',
  C: `${MENOS}2 ≤ y < 0`,
  D: `y < ${MENOS}2`,
}
const ZONA_PALABRA = { es: 'Zona', en: 'Zone', ca: 'Zona' }

// "f(3) = 2·3/3 + 1 = 3 → Zona A (y ≥ 2)". El paso intermedio solo aparece en
// las parábolas: ahí la sustitución por sí sola no se lee de un vistazo.
function explicar(sustituida, intermedia, y3, zona) {
  const resultado = fmt(y3)
  // Con f(x) = x la sustitución YA es el resultado: "f(3) = 3 = 3" sobra medio
  // renglón y parece un error de copiar y pegar.
  const pasos = [sustituida, intermedia, resultado]
    .filter(Boolean)
    .filter((p, i, todos) => p !== todos[i - 1])
  const out = {}
  for (const l of ['es', 'en', 'ca']) {
    out[l] = `f(3) = ${pasos.join(' = ')} → ${ZONA_PALABRA[l]} ${zona} (${RANGO[zona]})`
  }
  return out
}

// ── Generación ──────────────────────────────────────────────────────────────

// Salidas válidas: el balón tiene que empezar en un punto exacto y visible. Se
// devuelven todas y el llamante sortea, para que el mismo tiro no salga
// siempre del mismo sitio.
function salidasValidas(fn) {
  return SALIDAS.filter(x => {
    const y = redondea(fn(x))
    return exacto(y) && Math.abs(y) <= ALTURA_MAX_SALIDA
  })
}

function rectasQueCaenEn(y3, cfg) {
  const out = []
  for (const m of cfg.pendientes) {
    const b = redondea(y3 - GOAL_X * valor(m))
    if (!Number.isInteger(b)) continue
    if (b < cfg.bMin || b > cfg.bMax) continue
    if (!cfg.bCero && b === 0) continue
    out.push({ a: m.a, d: m.d, b })
  }
  return out
}

function parabolasQueCaenEn(y3) {
  const out = []
  for (const a2 of CUADRATICOS) {
    const cuad = (9 * a2.num) / a2.den
    for (let a1 = -2; a1 <= 2; a1++) {
      const a0 = redondea(y3 - cuad - GOAL_X * a1)
      if (!Number.isInteger(a0) || Math.abs(a0) > 9) continue
      out.push({ a2, a1, a0 })
    }
  }
  return out
}

function nivelDeRecta(r, aleatorio) {
  const fn = x => (r.a / r.d) * x + r.b
  const salidas = salidasValidas(fn)
  if (salidas.length === 0) return null
  const y3 = redondea(fn(GOAL_X))
  return {
    id: `r:${r.a}/${r.d}:${r.b}`,
    fn,
    label: 'f(x) = ' + formulaRecta(r, 'x', true),
    startX: pick(salidas, aleatorio),
    goalX: GOAL_X,
    explanation: explicar(formulaRecta(r, '3', false), null, y3, zonaDe(y3)),
  }
}

function nivelDeParabola(p, aleatorio) {
  const fn = x => (p.a2.num / p.a2.den) * x * x + p.a1 * x + p.a0
  const salidas = salidasValidas(fn)
  if (salidas.length === 0) return null
  const y3 = redondea(fn(GOAL_X))
  // El paso intermedio cambia 3² por 9 y deja la suma a la vista.
  const cuad = redondea((9 * p.a2.num) / p.a2.den)
  const intermedia = fmt(cuad) + constante(GOAL_X * p.a1) + constante(p.a0)
  return {
    id: `p:${p.a2.num}/${p.a2.den}:${p.a1}:${p.a0}`,
    fn,
    label: 'f(x) = ' + formulaParabola(p, 'x', true),
    startX: pick(salidas, aleatorio),
    goalX: GOAL_X,
    explanation: explicar(formulaParabola(p, '3', false), intermedia, y3, zonaDe(y3)),
  }
}

// Un tiro nuevo. `zona` fuerza dónde cae —lo usa generarTanda para repartir las
// cuatro por igual—; sin ella se sortea, que a la larga es lo mismo.
const ALIAS = {
  facil: 'facil', medio: 'medio', dificil: 'dificil',
  easy: 'facil', medium: 'medio', hard: 'dificil',
}

export function generarNivel(dificultad = 'facil', { evitar = [], zona = null, aleatorio = Math.random } = {}) {
  const dif = ALIAS[dificultad] ?? 'facil'
  for (let intento = 0; intento < 60; intento++) {
    const z = zona ?? pick(ZONA_IDS, aleatorio)
    const y3 = pick(DIANAS[z], aleatorio)
    const candidatos = dif === 'dificil'
      ? parabolasQueCaenEn(y3).map(p => nivelDeParabola(p, aleatorio))
      : rectasQueCaenEn(y3, RECTAS[dif]).map(r => nivelDeRecta(r, aleatorio))
    const usables = candidatos.filter(n => n && !evitar.includes(n.id))
    if (usables.length > 0) return pick(usables, aleatorio)
  }
  // Red de seguridad CONSTRUIDA, no una lista fija: f(x) = x/3 + 2 pasa por
  // (3, 3) —zona A, lejos de la frontera— y sale de (−3, 1), dentro del campo.
  return nivelDeRecta({ a: 1, d: 3, b: 2 }, aleatorio)
}

// Varios tiros seguidos repartiendo las cuatro zonas antes de repetir ninguna.
// Lo usa el examen: diez preguntas con la misma zona tres veces se contestarían
// por costumbre y no por la cuenta.
export function generarTanda(dificultad, n, { evitar = [], aleatorio = Math.random } = {}) {
  const out = []
  // Copia: el que llama pasa su lista y no espera que se la modifiquen por
  // debajo. Es la clase de efecto que luego cuesta media hora encontrar.
  const memoria = [...evitar]
  let bolsa = []
  for (let i = 0; i < n; i++) {
    if (bolsa.length === 0) bolsa = [...ZONA_IDS].sort(() => aleatorio() - 0.5)
    const nivel = generarNivel(dificultad, { evitar: memoria, zona: bolsa.pop(), aleatorio })
    memoria.push(nivel.id)
    out.push(nivel)
  }
  return out
}
