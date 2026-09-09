// ── Motor de "Lee el Gráfico" ────────────────────────────────────────────────
// Genera un gráfico con datos y una pregunta sobre ÉL, para el juego
// (src/pages/LeeElGrafico.jsx) y su examen. Igual que el motor de Estadístico
// Exprés, una sola fuente para que la pregunta signifique lo mismo en los dos.
//
// QUÉ LO DISTINGUE DE LO QUE YA HABÍA. Estadístico Exprés CALCULA una medida
// (media, mediana) y Caza la Función AJUSTA una fórmula a una curva. Aquí no se
// calcula ni se ajusta casi nada: se INTERPRETA una forma. "¿Está creciendo o
// decreciendo?", "¿entre qué dos años subió más?", "¿qué serie adelanta a cuál?"
// son preguntas cuya respuesta es un juicio sobre el dibujo, no una operación.
// Esa competencia —leer un gráfico— sale en matemáticas, en geografía, en
// economía y en ciencias, y no la entrenaba nada del sitio.
//
// EL CONTEXTO NO ES DECORADO. El mismo array de números se presenta como la
// población de un país, las ventas de una empresa o las temperaturas de una
// ciudad, y eso cambia las unidades, el enunciado y qué respuesta tiene
// sentido. Es a propósito: un gráfico sin saber de qué habla no se puede leer,
// y es justo el error que se quiere corregir.
//
// LA TRAMPA DEL EJE (dificultad media). Gráficos con el eje Y sin empezar en
// cero: visualmente la barra se dispara y numéricamente sube un 3 %. Es la
// manipulación más común de la prensa y de las presentaciones de empresa, y
// la única forma de aprender a verla es que te la hagan.
//
// LOS PARES (dificultad difícil). Ver PARES más abajo. Difícil no es lo mismo
// con más puntos: son dos series que se relacionan —ingresos y gastos,
// nacimientos y defunciones— y una pregunta sobre lo que sale de restarlas,
// que no está dibujado en ninguna parte.

export function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Los contextos ────────────────────────────────────────────────────────────
// `escala` multiplica los valores generados para que las cifras suenen reales
// (miles de habitantes, miles de euros). `formato` decide cómo se escribe un
// valor en el eje y en las opciones.
export const CONTEXTOS = {
  poblacion: {
    id: 'poblacion', emoji: '👥', grafico: 'linea', escala: 1000, decimales: 0,
    materia: { es: 'Demografía', en: 'Demography', ca: 'Demografia' },
    sujeto: { es: 'la población de Vallalta', en: "Vallalta's population", ca: 'la població de Vallalta' },
    magnitud: { es: 'habitantes', en: 'inhabitants', ca: 'habitants' },
    ejeX: { es: 'Año', en: 'Year', ca: 'Any' },
    unidad: { es: 'hab.', en: 'inhab.', ca: 'hab.' },
    etiquetas: años => años,
  },
  ventas: {
    id: 'ventas', emoji: '📈', grafico: 'barras', escala: 1000, decimales: 0,
    materia: { es: 'Economía', en: 'Economics', ca: 'Economia' },
    sujeto: { es: 'la facturación de una empresa', en: "a company's revenue", ca: 'la facturació d\'una empresa' },
    magnitud: { es: 'euros vendidos', en: 'euros of sales', ca: 'euros venuts' },
    ejeX: { es: 'Año', en: 'Year', ca: 'Any' },
    unidad: { es: '€', en: '€', ca: '€' },
    etiquetas: años => años,
  },
  temperatura: {
    id: 'temperatura', emoji: '🌡️', grafico: 'linea', escala: 1, decimales: 0,
    materia: { es: 'Geografía', en: 'Geography', ca: 'Geografia' },
    sujeto: { es: 'la temperatura media mensual', en: 'the monthly average temperature', ca: 'la temperatura mitjana mensual' },
    magnitud: { es: 'grados', en: 'degrees', ca: 'graus' },
    ejeX: { es: 'Mes', en: 'Month', ca: 'Mes' },
    unidad: { es: '°C', en: '°C', ca: '°C' },
    etiquetas: (_, n) => MESES.slice(0, n),
  },
  visitas: {
    id: 'visitas', emoji: '🌐', grafico: 'barras', escala: 100, decimales: 0,
    materia: { es: 'Tecnología', en: 'Technology', ca: 'Tecnologia' },
    sujeto: { es: 'el tráfico de una web', en: "a website's traffic", ca: "el trànsit d'un web" },
    magnitud: { es: 'visitas', en: 'visits', ca: 'visites' },
    ejeX: { es: 'Mes', en: 'Month', ca: 'Mes' },
    unidad: { es: '', en: '', ca: '' },
    etiquetas: (_, n) => MESES.slice(0, n),
  },
  residuos: {
    id: 'residuos', emoji: '♻️', grafico: 'barras', escala: 1, decimales: 0,
    materia: { es: 'Medio ambiente', en: 'Environment', ca: 'Medi ambient' },
    sujeto: { es: 'la basura reciclada en un municipio', en: 'the waste recycled in a town', ca: 'la brossa reciclada en un municipi' },
    magnitud: { es: 'toneladas', en: 'tonnes', ca: 'tones' },
    ejeX: { es: 'Año', en: 'Year', ca: 'Any' },
    unidad: { es: ' t', en: ' t', ca: ' t' },
    etiquetas: años => años,
  },
}

export const CONTEXTO_IDS = Object.keys(CONTEXTOS)

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export const RANGOS = {
  facil:   { n: 5, series: 1, ruido: 0,  ejeTruncado: false, tipos: ['tendencia', 'maximo', 'minimo'] },
  medio:   { n: 6, series: 1, ruido: 1,  ejeTruncado: true, tipos: ['tendencia', 'maximo', 'minimo', 'variacion', 'mayor-subida'] },
  // Difícil no es "lo mismo pero con más puntos": es otra cosa. Dos series
  // que se RELACIONAN (ingresos y gastos, nacimientos y defunciones) y una
  // pregunta sobre la magnitud que sale de relacionarlas. Ver PARES.
  dificil: { n: 5, pares: true, tipos: ['signo-año', 'derivada-valor', 'derivada-max', 'cambio-signo', 'derivada-tendencia'] },
}

// ── Los datos ────────────────────────────────────────────────────────────────
// Se generan por TENDENCIA y no al azar: una nube de puntos aleatorios no tiene
// forma, y sin forma no hay nada que leer. Se elige primero si crece, decrece o
// se mantiene, y el ruido se añade encima con un tope que nunca puede invertir
// el paso — así "está creciendo" sigue siendo verdad mirando el dibujo, que es
// lo que se le pide al alumno.
function serie(n, base, paso, ruido) {
  const vals = []
  for (let i = 0; i < n; i++) {
    const limite = Math.max(0, Math.floor(Math.abs(paso) / 2) - 1)
    const r = ruido > 0 && i > 0 && i < n - 1 ? rng(-Math.min(ruido, limite), Math.min(ruido, limite)) : 0
    vals.push(base + paso * i + r)
  }
  return vals
}

const TENDENCIAS = ['sube', 'baja', 'estable']

// Las tres tendencias NO salen a partes iguales. Una serie estable solo admite
// la pregunta de la tendencia (ver más abajo), así que con un tercio de series
// planas un tercio de la partida era la misma pregunta con la misma respuesta:
// jugando ocho rondas seguidas salieron cuatro "se mantiene estable". Sigue
// apareciendo —hace falta, porque es una de las tres respuestas posibles— pero
// una de cada seis veces en lugar de una de cada tres.
const SORTEO_TENDENCIA = ['sube', 'sube', 'baja', 'baja', 'estable']

// El suelo de la serie. No es cosmético: una población o unas ventas negativas
// no significan nada, y con base 20 y siete puntos bajando de 9 en 9 el motor
// las producía (2.154 de 21.000 en la prueba de estrés). El arranque se calcula
// desde el final para que el último punto no baje de aquí.
const MINIMO = 8

export function generarDatos(dif) {
  const tendencia = pick(SORTEO_TENDENCIA)
  const n = dif.n
  const paso = tendencia === 'sube' ? rng(4, 9) : tendencia === 'baja' ? -rng(4, 9) : 0
  const caida = paso < 0 ? -paso * (n - 1) : 0
  const base = rng(MINIMO + caida + dif.ruido, MINIMO + caida + 45)
  const valores = serie(n, base, paso, tendencia === 'estable' ? 1 : dif.ruido)

  // La segunda serie corta a la primera a propósito cuando la dificultad la
  // pide: si no se cruzaran nunca, "¿en qué año adelanta B a A?" no existiría.
  let segunda = null
  if (dif.series === 2) {
    const cruce = rng(1, n - 2)
    const pasoB = paso >= 0 ? -rng(3, 7) : rng(3, 7)
    const baseB = valores[cruce] - pasoB * cruce
    segunda = serie(n, baseB, pasoB, 0).map(v => Math.max(1, v))
  }
  return { tendencia, valores, segunda }
}


// ── Pares de series con una relación real (dificultad difícil) ──────────────
// La primera versión de la dificultad alta pintaba dos series llamadas A y B
// y preguntaba cuándo se cruzaban. Era difícil de mirar y no significaba
// nada: dos líneas sin relación entre ellas no producen ninguna pregunta que
// un profesor haría. Aquí las dos series son las dos mitades de una misma
// cuenta, y la pregunta va siempre sobre la magnitud DERIVADA:
//
//   ingresos y gastos        → beneficio (¿en qué año hubo pérdidas?)
//   nacimientos y defunciones → crecimiento vegetativo (¿cuándo empieza a
//                               perder población?)
//
// Eso es lo que hace difícil una lectura de gráfico de verdad: no que haya
// más puntos, sino que la respuesta no esté dibujada y haya que sacarla
// relacionando dos cosas. Y trae de propina la trampa buena: el año de más
// ingresos casi nunca es el de más beneficio.
export const PARES = {
  empresa: {
    id: 'empresa', emoji: '💶', escala: 1000, unidad: { es: '€', en: '€', ca: '€' },
    materia: { es: 'Economía', en: 'Economics', ca: 'Economia' },
    sujeto: { es: 'una empresa', en: 'a company', ca: 'una empresa' },
    a: { es: 'Ingresos', en: 'Revenue', ca: 'Ingressos' },
    b: { es: 'Gastos', en: 'Costs', ca: 'Despeses' },
    derivada: { es: 'beneficio', en: 'profit', ca: 'benefici' },
    genero: 'm',
    positivo: { es: 'ganó dinero', en: 'made money', ca: 'va guanyar diners' },
    negativo: { es: 'tuvo pérdidas', en: 'made a loss', ca: 'va tenir pèrdues' },
    ejeX: 'año',
  },
  demografia: {
    id: 'demografia', emoji: '👥', escala: 100, unidad: { es: 'pers.', en: 'people', ca: 'pers.' },
    materia: { es: 'Demografía', en: 'Demography', ca: 'Demografia' },
    sujeto: { es: 'un municipio', en: 'a town', ca: 'un municipi' },
    a: { es: 'Nacimientos', en: 'Births', ca: 'Naixements' },
    b: { es: 'Defunciones', en: 'Deaths', ca: 'Defuncions' },
    derivada: { es: 'crecimiento vegetativo', en: 'natural growth', ca: 'creixement vegetatiu' },
    genero: 'm',
    positivo: { es: 'ganó población', en: 'gained people', ca: 'va guanyar població' },
    negativo: { es: 'perdió población', en: 'lost people', ca: 'va perdre població' },
    ejeX: 'año',
  },
  comercio: {
    id: 'comercio', emoji: '🚢', escala: 1000, unidad: { es: 'M€', en: '€M', ca: 'M€' },
    materia: { es: 'Economía', en: 'Economics', ca: 'Economia' },
    sujeto: { es: 'un país', en: 'a country', ca: 'un país' },
    a: { es: 'Exportaciones', en: 'Exports', ca: 'Exportacions' },
    b: { es: 'Importaciones', en: 'Imports', ca: 'Importacions' },
    derivada: { es: 'saldo comercial', en: 'trade balance', ca: 'saldo comercial' },
    genero: 'm',
    positivo: { es: 'vendió más de lo que compró', en: 'sold more than it bought', ca: 'va vendre més del que va comprar' },
    negativo: { es: 'compró más de lo que vendió', en: 'bought more than it sold', ca: 'va comprar més del que va vendre' },
    ejeX: 'año',
  },
  embalse: {
    id: 'embalse', emoji: '💧', escala: 1, unidad: { es: 'hm³', en: 'hm³', ca: 'hm³' },
    materia: { es: 'Medio ambiente', en: 'Environment', ca: 'Medi ambient' },
    sujeto: { es: 'un embalse', en: 'a reservoir', ca: 'un embassament' },
    a: { es: 'Agua que entra', en: 'Water in', ca: "Aigua que entra" },
    b: { es: 'Agua consumida', en: 'Water used', ca: 'Aigua consumida' },
    derivada: { es: 'balance de agua', en: 'water balance', ca: "balanç d'aigua" },
    genero: 'm',
    positivo: { es: 'el embalse subió', en: 'the reservoir rose', ca: "l'embassament va pujar" },
    negativo: { es: 'el embalse bajó', en: 'the reservoir fell', ca: "l'embassament va baixar" },
    ejeX: 'año',
  },
  club: {
    id: 'club', emoji: '🎫', escala: 10, unidad: { es: 'socios', en: 'members', ca: 'socis' },
    materia: { es: 'Estadística', en: 'Statistics', ca: 'Estadística' },
    sujeto: { es: 'un club', en: 'a club', ca: 'un club' },
    a: { es: 'Altas', en: 'Joined', ca: 'Altes' },
    b: { es: 'Bajas', en: 'Left', ca: 'Baixes' },
    derivada: { es: 'variación de socios', en: 'net change in members', ca: 'variació de socis' },
    genero: 'f',
    positivo: { es: 'ganó socios', en: 'gained members', ca: 'va guanyar socis' },
    negativo: { es: 'perdió socios', en: 'lost members', ca: 'va perdre socis' },
    ejeX: 'año',
  },
}

export const PAR_IDS = Object.keys(PARES)

// Se genera al revés, como el motor de Estadístico Exprés: primero la forma
// que tiene que tener la DERIVADA —que es de lo que se pregunta— y luego se
// reparte en las dos series. Así "hubo pérdidas en 2021" es exacto por
// construcción y no algo que salga por casualidad del sorteo.
//
// Todo va en múltiplos de 5 para que las barras caigan en la cuadrícula y se
// puedan leer; sin eso, "¿cuál fue el beneficio?" sería medir píxeles.
const PASO = 5

// Las tres historias que puede contar una serie de estas. Son las tres que se
// cuentan de verdad, y las tres A LA MISMA FRECUENCIA a propósito: la primera
// versión solo generaba "iba mal y empezó a ir bien", así que el 83 % de las
// respuestas a "¿qué le pasa al beneficio?" eran "mejora" y se podía acertar
// sin mirar el gráfico.
//
//   un-negativo · un año malo suelto en medio de años buenos
//   a-mejor     · perdía y pasa a ganar (empresa que remonta)
//   a-peor      · ganaba y pasa a perder (empresa en crisis, pueblo que
//                 empieza a perder población — que es la historia demográfica
//                 de media España)
const FORMAS = ['un-negativo', 'a-mejor', 'a-peor']

function generarPar(dif) {
  const par = PARES[pick(PAR_IDS)]
  const n = dif.n
  const forma = pick(FORMAS)
  const corte = rng(1, n - 2)      // último índice del tramo inicial
  const negativoEn = rng(1, n - 2)

  const derivada = Array.from({ length: n }, (_, i) => {
    if (forma === 'un-negativo') return i === negativoEn ? -rng(1, 4) * PASO : rng(1, 6) * PASO
    const enElPrimerTramo = i <= corte
    const bueno = forma === 'a-mejor' ? !enElPrimerTramo : enElPrimerTramo
    return bueno ? rng(1, 6) * PASO : -rng(1, 4) * PASO
  })

  // El máximo tiene que ser ÚNICO: "¿en qué año fue mayor el beneficio?" con
  // dos años empatados tiene dos respuestas buenas y solo una puntúa (pasaba
  // 405 veces de cada 8.000). Se sube el primero de los empatados hasta que
  // destaque, que además deja una gráfica con un pico claro.
  let tope = Math.max(...derivada)
  while (derivada.filter(v => v === tope).length > 1) {
    derivada[derivada.indexOf(tope)] = tope + PASO
    tope = Math.max(...derivada)
  }

  // Los gastos (o las defunciones) son la base: van holgados por encima de la
  // derivada negativa más grande para que los ingresos nunca salgan negativos.
  const suelo = Math.max(0, -Math.min(...derivada))
  const b = Array.from({ length: n }, () => (rng(6, 12) * PASO) + suelo)
  const a = b.map((v, i) => v + derivada[i])
  return { par, a, b, derivada, forma, corte, negativoEn }
}
// ── Las preguntas ────────────────────────────────────────────────────────────
const T = {
  tendencia: {
    es: '¿Qué está haciendo {sujeto}?', en: 'What is {sujeto} doing?', ca: 'Què està fent {sujeto}?',
  },
  maximo: {
    es: '¿Cuándo alcanzó su valor MÁS ALTO?', en: 'When did it reach its HIGHEST value?', ca: 'Quan va assolir el seu valor MÉS ALT?',
  },
  minimo: {
    es: '¿Cuándo alcanzó su valor MÁS BAJO?', en: 'When did it reach its LOWEST value?', ca: 'Quan va assolir el seu valor MÉS BAIX?',
  },
  variacion: {
    es: '¿Cuánto cambió entre {a} y {b}?', en: 'How much did it change between {a} and {b}?', ca: 'Quant va canviar entre {a} i {b}?',
  },
  'mayor-subida': {
    es: '¿Entre qué dos puntos consecutivos hubo el MAYOR aumento?', en: 'Between which two consecutive points was the BIGGEST rise?', ca: 'Entre quins dos punts consecutius hi va haver el MAJOR augment?',
  },
  cruce: {
    es: '¿En qué punto la serie B supera por primera vez a la A?', en: 'At which point does series B first overtake A?', ca: 'En quin punt la sèrie B supera per primera vegada la A?',
  },
  'serie-mayor': {
    es: '¿Qué serie tiene el valor más alto en {a}?', en: 'Which series has the highest value at {a}?', ca: 'Quina sèrie té el valor més alt a {a}?',
  },
  porcentaje: {
    es: 'Aproximadamente, ¿qué porcentaje cambió entre {a} y {b}?', en: 'Roughly, what percentage did it change between {a} and {b}?', ca: 'Aproximadament, quin percentatge va canviar entre {a} i {b}?',
  },
}

const T_PAR = {
  'signo-año': {
    es: '¿En qué año {negativo}?', en: 'In which year did it {negativo}?', ca: 'En quin any {negativo}?',
  },
  'derivada-valor': {
    es: '¿Cuál fue {el} {derivada} en {a}?', en: 'What was the {derivada} in {a}?', ca: 'Quin va ser {el} {derivada} el {a}?',
  },
  'derivada-max': {
    es: '¿En qué año fue MAYOR {el} {derivada}?', en: 'In which year was the {derivada} HIGHEST?', ca: 'En quin any va ser MAJOR {el} {derivada}?',
  },
  // Dos plantillas y no una: la serie puede pasar de mal a bien o de bien a
  // mal, y preguntar siempre "¿desde cuándo va bien?" delataría la forma.
  'cambio-signo': {
    es: '¿A partir de qué año {positivo}?', en: 'From which year on did it {positivo}?', ca: 'A partir de quin any {positivo}?',
  },
  'cambio-signo-peor': {
    es: '¿A partir de qué año {negativo}?', en: 'From which year on did it {negativo}?', ca: 'A partir de quin any {negativo}?',
  },
  'derivada-tendencia': {
    es: 'Mirando todo el periodo, ¿qué le pasa {al} {derivada}?', en: 'Over the whole period, what happens to the {derivada}?', ca: 'Mirant tot el període, què li passa {al} {derivada}?',
  },
}

const RESP_DERIVADA = {
  mejora:  { es: 'Mejora con los años', en: 'It improves over the years', ca: 'Millora amb els anys' },
  empeora: { es: 'Empeora con los años', en: 'It gets worse over the years', ca: 'Empitjora amb els anys' },
}
const RESP_TENDENCIA = {
  sube:    { es: 'Creciendo', en: 'Growing', ca: 'Creixent' },
  baja:    { es: 'Decreciendo', en: 'Shrinking', ca: 'Decreixent' },
  estable: { es: 'Se mantiene estable', en: 'Staying stable', ca: 'Es manté estable' },
}

const tr3 = (o, lang) => o?.[lang] ?? o?.es ?? ''

// Formatea un valor con su escala y unidad: 45 → "45.000 hab." o "23 °C".
export function formatear(v, ctx, lang = 'es') {
  const n = v * ctx.escala
  const loc = lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES'
  return `${n.toLocaleString(loc)}${tr3(ctx.unidad, lang) ? ' ' + tr3(ctx.unidad, lang).trim() : ''}`
}

// Tres distractores distintos del correcto y entre sí. Se piden a una función
// para no repetir en cada tipo de pregunta el bucle de "genera hasta que no
// choque", que es donde salen los duplicados y las opciones repetidas.
function distractores(correcta, candidatos, n = 3) {
  const fuera = []
  for (const c of candidatos) {
    if (c !== correcta && !fuera.includes(c) && fuera.length < n) fuera.push(c)
  }
  return fuera
}

// Las preguntas de par. Todas van sobre la DERIVADA, que es lo que no está
// dibujado: el alumno tiene que restar las dos barras de un año para saber si
// hubo pérdidas, o comparar las restas de varios años para ver dónde fue
// mayor el beneficio. Ese es el salto de dificultad — no más puntos, más
// razonamiento.
function preguntaDePar(dif, lang) {
  const { par, a, b, derivada, forma, corte, negativoEn } = generarPar(dif)
  const n = a.length
  const añoBase = rng(2016, 2020)
  const etiquetas = Array.from({ length: n }, (_, i) => String(añoBase + i))

  // No todas las formas admiten todas las preguntas: "¿a partir de qué año
  // empezó a ganar dinero?" solo tiene respuesta si hay UN cambio de signo, y
  // "¿en qué año tuvo pérdidas?" solo si hay un único año en negativo.
  const permitidos = dif.tipos.filter(t =>
    (t !== 'cambio-signo' || forma !== 'un-negativo')
    && (t !== 'signo-año' || forma === 'un-negativo'))
  const tipo = pick(permitidos)

  // La misma pregunta con las dos redacciones según hacia dónde vaya la
  // serie: "¿desde cuándo ganó dinero?" o "¿desde cuándo tuvo pérdidas?".
  const plantilla = tipo === 'cambio-signo' && forma === 'a-peor' ? 'cambio-signo-peor' : tipo

  const base = {
    par, contexto: par, etiquetas, valores: a, segunda: b, derivada, tipo,
    leyenda: [tr3(par.a, lang), tr3(par.b, lang)],
    grafico: 'barras', ejeTruncado: false, etiquetarValores: true,
  }
  // El artículo se calcula, no se escribe en la plantilla: "el variación de
  // socios" es lo que salía antes. En inglés los dos casos son "the".
  const f = par.genero === 'f'
  const EL = { es: f ? 'la' : 'el', ca: f ? 'la' : 'el', en: 'the' }
  const AL = { es: f ? 'a la' : 'al', ca: f ? 'a la' : 'al', en: 'the' }
  const rellena = (txt, extra = {}) => txt
    .replace('{el}', EL[lang] ?? EL.es)
    .replace('{al}', AL[lang] ?? AL.es)
    .replace('{derivada}', tr3(par.derivada, lang))
    .replace('{negativo}', tr3(par.negativo, lang))
    .replace('{positivo}', tr3(par.positivo, lang))
    .replace('{a}', extra.a ?? '')
  const q = extra => rellena(tr3(T_PAR[plantilla], lang), extra)

  if (tipo === 'signo-año') {
    const correcta = etiquetas[negativoEn]
    return { ...base, pregunta: q(), correcta,
      opciones: shuffle([correcta, ...distractores(correcta, shuffle(etiquetas))]) }
  }

  if (tipo === 'derivada-valor') {
    const i = rng(0, n - 1)
    // El cero no lleva signo: "+0 M€" se lee como un error de formato, no
    // como "ni ganó ni perdió".
    const signo = d => (d === 0 ? '' : d > 0 ? '+' : '−') + formatearPar(Math.abs(d), par, lang)
    const correcta = signo(derivada[i])
    const otros = [derivada[i] + 5, derivada[i] - 5, -derivada[i], derivada[i] + 10, derivada[i] - 10, a[i]].map(signo)
    return { ...base, pregunta: q({ a: etiquetas[i] }), marcar: [i], correcta, bruto: derivada[i],
      opciones: shuffle([correcta, ...distractores(correcta, otros)]) }
  }

  if (tipo === 'derivada-max') {
    // La trampa buena y la razón de ser de esta pregunta: el año de más
    // ingresos casi nunca es el de más beneficio, y el distractor natural es
    // justo el año de la barra más alta.
    const mejor = derivada.indexOf(Math.max(...derivada))
    const masAlto = a.indexOf(Math.max(...a))
    const correcta = etiquetas[mejor]
    const otros = [etiquetas[masAlto], ...shuffle(etiquetas)]
    return { ...base, pregunta: q(), correcta,
      opciones: shuffle([correcta, ...distractores(correcta, otros)]) }
  }

  if (tipo === 'cambio-signo') {
    const correcta = etiquetas[corte + 1]
    return { ...base, pregunta: q(), correcta,
      opciones: shuffle([correcta, ...distractores(correcta, shuffle(etiquetas))]) }
  }

  // derivada-tendencia
  const mejora = derivada.at(-1) > derivada[0]
  return { ...base, pregunta: q(),
    correcta: tr3(mejora ? RESP_DERIVADA.mejora : RESP_DERIVADA.empeora, lang),
    opciones: shuffle([tr3(RESP_DERIVADA.mejora, lang), tr3(RESP_DERIVADA.empeora, lang)]) }
}

// Los pares no usan la escala de CONTEXTOS, tienen la suya.
export function formatearPar(v, par, lang = 'es') {
  const loc = lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES'
  return `${(v * par.escala).toLocaleString(loc)} ${tr3(par.unidad, lang)}`.trim()
}
export function generarPregunta(dif, lang = 'es', ctxId = null) {
  if (dif.pares) return preguntaDePar(dif, lang)
  const ctx = CONTEXTOS[ctxId] ?? CONTEXTOS[pick(CONTEXTO_IDS)]
  const { tendencia, valores, segunda } = generarDatos(dif)
  const n = valores.length
  const añoBase = rng(2010, 2018)
  const etiquetas = ctx.etiquetas(Array.from({ length: n }, (_, i) => String(añoBase + i)), n)

  // Una serie ESTABLE es plana, y sobre una recta horizontal casi ninguna
  // pregunta tiene una respuesta única: el máximo empata con el mínimo, el
  // tramo de mayor subida empata con todos los demás y la variación entre
  // dos años es "+0 hab.", que además de inútil parece un error. Cuando la
  // serie no se mueve, lo único que se puede preguntar de verdad es
  // justamente eso: qué está haciendo.
  const posibles = tendencia === 'estable'
    ? ['tendencia']
    : dif.tipos.filter(t => segunda || (t !== 'cruce' && t !== 'serie-mayor'))

  // "¿Entre qué dos puntos subió más?" solo se puede preguntar si UNO sube
  // más que todos los demás. El ruido puede hacer que dos tramos suban
  // exactamente lo mismo, y entonces hay dos respuestas buenas y solo una
  // cuenta. Cuando pasa, se pregunta otra cosa sobre estos mismos datos en
  // vez de rehacerlos: los datos están bien, la pregunta era la que no valía.
  const saltos = valores.slice(1).map((v, i) => v - valores[i])
  const subidaAmbigua = saltos.filter(d => d === Math.max(...saltos)).length > 1
  const elegibles = subidaAmbigua ? posibles.filter(t => t !== 'mayor-subida') : posibles
  const tipo = pick(elegibles.length > 0 ? elegibles : ['tendencia'])
  const q = t => tr3(T[tipo], lang).replace('{sujeto}', tr3(ctx.sujeto, lang)).replace('{a}', t?.a ?? '').replace('{b}', t?.b ?? '')

  const base = {
    contexto: ctx, etiquetas, valores, segunda, tendencia, tipo,
    ejeTruncado: Boolean(dif.ejeTruncado),
  }

  if (tipo === 'tendencia') {
    return { ...base, pregunta: q(), correcta: tr3(RESP_TENDENCIA[tendencia], lang),
      opciones: shuffle(TENDENCIAS.map(t => tr3(RESP_TENDENCIA[t], lang))) }
  }

  if (tipo === 'maximo' || tipo === 'minimo') {
    const objetivo = tipo === 'maximo' ? Math.max(...valores) : Math.min(...valores)
    const i = valores.indexOf(objetivo)
    return { ...base, pregunta: q(), correcta: etiquetas[i],
      opciones: shuffle([etiquetas[i], ...distractores(etiquetas[i], shuffle(etiquetas))]) }
  }

  if (tipo === 'variacion') {
    const a = rng(0, n - 2), b = rng(a + 1, n - 1)
    const dif2 = valores[b] - valores[a]
    const signo = d => (d >= 0 ? '+' : '−') + formatear(Math.abs(d), ctx, lang)
    const correcta = signo(dif2)
    // Pool ancho a propósito: con solo tres candidatos, un dif2 de 0 o un
    // sorteo desafortunado hacía que dos coincidieran y la pregunta salía con
    // tres opciones en vez de cuatro (910 veces de 21.000 en la prueba).
    const otros = [dif2 + 2, dif2 - 2, -dif2, dif2 + 5, dif2 - 5, dif2 * 2, dif2 + 9, dif2 - 9]
      .map(signo)
    return { ...base, pregunta: q({ a: etiquetas[a], b: etiquetas[b] }), marcar: [a, b], correcta, bruto: dif2,
      opciones: shuffle([correcta, ...distractores(correcta, otros)]) }
  }

  if (tipo === 'mayor-subida') {
    // El tramo de mayor PENDIENTE, que no es el del valor más alto: es el
    // error más común al leer una gráfica y por eso los distractores son
    // justamente otros tramos reales.
    let mejor = 0, mejorD = -Infinity
    for (let i = 0; i < n - 1; i++) {
      const d = valores[i + 1] - valores[i]
      if (d > mejorD) { mejorD = d; mejor = i }
    }
    const tramo = i => `${etiquetas[i]} → ${etiquetas[i + 1]}`
    const todos = shuffle(Array.from({ length: n - 1 }, (_, i) => tramo(i)))
    return { ...base, pregunta: q(), correcta: tramo(mejor),
      opciones: shuffle([tramo(mejor), ...distractores(tramo(mejor), todos)]) }
  }

  if (tipo === 'cruce') {
    let i = segunda.findIndex((v, k) => v > valores[k])
    if (i < 0) i = n - 1
    return { ...base, pregunta: q(), correcta: etiquetas[i],
      opciones: shuffle([etiquetas[i], ...distractores(etiquetas[i], shuffle(etiquetas))]) }
  }

  if (tipo === 'serie-mayor') {
    const a = rng(0, n - 1)
    const correcta = valores[a] >= segunda[a] ? 'A' : 'B'
    return { ...base, pregunta: q({ a: etiquetas[a] }), marcar: [a], correcta,
      opciones: ['A', 'B'] }
  }

  // porcentaje: se redondea a un múltiplo de 5 y la pregunta dice
  // "aproximadamente", porque exigir el decimal exacto convertiría un
  // ejercicio de lectura en uno de calculadora.
  const a = 0, b = n - 1
  const pct = Math.round(((valores[b] - valores[a]) / valores[a]) * 100 / 5) * 5
  const etiqueta = p => (p >= 0 ? '+' : '−') + Math.abs(p) + ' %'
  const otros = [pct + 10, pct - 10, -pct, pct + 25].map(etiqueta)
  return { ...base, pregunta: q({ a: etiquetas[a], b: etiquetas[b] }), marcar: [a, b], correcta: etiqueta(pct), bruto: pct,
    opciones: shuffle([etiqueta(pct), ...distractores(etiqueta(pct), otros)]) }
}
