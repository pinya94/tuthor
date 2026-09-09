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
// LA TRAMPA DEL EJE. En dificultad alta aparecen gráficos con el eje Y sin
// empezar en cero. Visualmente la barra se dispara; numéricamente sube un 3 %.
// Es la manipulación más común de la prensa y de las presentaciones de
// empresa, y la única forma de aprender a verla es que te la hagan.

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
  medio:   { n: 6, series: 1, ruido: 1,  tipos: ['tendencia', 'maximo', 'minimo', 'variacion', 'mayor-subida'] },
  dificil: { n: 7, series: 2, ruido: 2,  ejeTruncado: true, tipos: ['tendencia', 'variacion', 'mayor-subida', 'cruce', 'serie-mayor', 'porcentaje'] },
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

export function generarPregunta(dif, lang = 'es', ctxId = null) {
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
