// Climograma (geografía física, primaria alta, ESO y Bachillerato): un
// climograma dibujado —barras de precipitación y línea de temperatura, mes a
// mes— y preguntas para leerlo.
//
// Los climas se GENERAN desde los siete tipos de libro (ecuatorial, tropical,
// desértico, mediterráneo, oceánico, continental y polar): no son datos de
// una ciudad, así que no se quedan anticuados. Cada climograma generado se
// comprueba con `clasificar()`, que aplica umbrales fijos; si el ruido lo
// deja en tierra de nadie, se descarta y se genera otro. Así nunca sale un
// climograma que un profesor pudiera leer como otro clima.
//
// Escala de Gaussen: la precipitación va a doble escala que la temperatura
// (20 mm a la altura de 10 °C), así que un mes es SECO cuando su barra queda
// por debajo de la línea (P < 2T). Por encima de 100 mm la escala se reduce
// a la décima parte, como en los climogramas de Walter y Lieth. Ningún mes
// queda pegado a la línea: se exige un margen de 6 mm.
//
// Tipos de pregunta:
//   calido      el mes más cálido
//   lluvioso    el mes más lluvioso
//   clima       qué clima es (en el difícil, a veces del hemisferio sur)
//   amplitud    la amplitud térmica (máxima − mínima)
//   secos       cuántos meses secos hay (barra bajo la línea)
//   hemisferio  norte o sur, por cuándo hace calor

export const CLIMAS = ['ecuatorial', 'tropical', 'desertico', 'mediterraneo', 'oceanico', 'continental', 'polar']
export const NIVELES = {
  facil:   { tipos: ['calido', 'lluvioso', 'clima'] },
  medio:   { tipos: ['clima', 'clima', 'amplitud', 'secos', 'lluvioso'] },
  dificil: { tipos: ['clima', 'clima', 'secos', 'amplitud', 'hemisferio'] },
}
// Con qué se confunde cada clima: las otras tres opciones salen de aquí.
const PARECIDOS = {
  ecuatorial: ['tropical', 'oceanico', 'mediterraneo'],
  tropical: ['ecuatorial', 'mediterraneo', 'desertico'],
  desertico: ['mediterraneo', 'tropical', 'polar'],
  mediterraneo: ['oceanico', 'desertico', 'continental'],
  oceanico: ['mediterraneo', 'continental', 'ecuatorial'],
  continental: ['oceanico', 'polar', 'mediterraneo'],
  polar: ['continental', 'desertico', 'oceanico'],
}
// En el hemisferio sur no hay climas continentales (no hay masas de tierra
// tan grandes a esas latitudes).
const DEL_SUR = ['tropical', 'desertico', 'mediterraneo', 'oceanico', 'polar']

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + rand() * (b - a)
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const MARGEN_SECO = 6

export const esSeco = (P, T) => P < 2 * T
export const total = c => c.P.reduce((s, x) => s + x, 0)
export const amplitud = c => Math.max(...c.T) - Math.min(...c.T)
export const mesesSecos = c => c.P.filter((p, i) => esSeco(p, c.T[i])).length

// Los tres meses más cálidos (el verano, en cualquier hemisferio).
const verano = c => [...c.T.keys()].sort((a, b) => c.T[b] - c.T[a]).slice(0, 3)

// Clasificación por umbrales fijos. Devuelve el tipo o null si no encaja
// limpio en ninguno (entonces el generador lo descarta).
export function clasificar(c) {
  const tmax = Math.max(...c.T), tmin = Math.min(...c.T), pt = total(c)
  const pv = verano(c).map(i => c.P[i])
  const inv = [...c.T.keys()].sort((a, b) => c.T[a] - c.T[b]).slice(0, 3).map(i => c.P[i])
  const sec = mesesSecos(c)
  const cumple = []
  if (tmax < 10) cumple.push('polar')
  if (tmax >= 15 && pt < 250) cumple.push('desertico')
  if (tmin >= 18 && tmax - tmin <= 4 && c.P.every(p => p >= 60) && pt >= 1500) cumple.push('ecuatorial')
  if (tmin >= 18 && sec >= 3 && sec <= 7 && pt >= 700 && Math.min(...pv) >= 100) cumple.push('tropical')
  if (tmin >= 5 && tmin < 15 && tmax >= 21 && pv.every(p => p < 30) && pt >= 300 && pt <= 900) cumple.push('mediterraneo')
  if (tmin >= 3 && tmax <= 20 && tmax - tmin <= 14 && c.P.every(p => p >= 40)) cumple.push('oceanico')
  if (tmin < -2 && tmax >= 15 && tmax - tmin >= 22 && pt >= 300 && Math.min(...pv) > Math.max(...inv)) cumple.push('continental')
  return cumple.length === 1 ? cumple[0] : null
}

// Un clima del hemisferio norte; el sur es el mismo desplazado seis meses.
function generar(tipo, rand) {
  const pico = elige(rand, [6, 6, 7]) // julio o agosto
  const s = m => Math.cos((2 * Math.PI * (m - pico)) / 12) // +1 en verano, −1 en invierno
  const ruido = a => entre(rand, -a, a)
  let tm, A, P
  switch (tipo) {
    case 'ecuatorial': {
      tm = entre(rand, 25.5, 27); A = entre(rand, 1, 2.5)
      const base = entre(rand, 170, 230), f = elige(rand, [3, 4])
      P = m => base + 70 * Math.cos((2 * Math.PI * (m - f)) / 6) + ruido(15)
      break
    }
    case 'tropical': {
      tm = entre(rand, 24, 26); A = entre(rand, 4, 6)
      const lluvia = entre(rand, 260, 330)
      P = m => (s(m) > 0.1 ? 15 + lluvia * Math.pow(s(m), 1.3) : entre(rand, 3, 22)) + ruido(8)
      break
    }
    case 'desertico':
      tm = entre(rand, 22, 26); A = entre(rand, 14, 18)
      P = () => entre(rand, 0, 12)
      break
    case 'mediterraneo': {
      tm = entre(rand, 15.5, 18); A = entre(rand, 13, 16)
      const otono = elige(rand, [9, 10])
      P = m => Math.max(3, 42 - 46 * s(m) + 25 * Math.max(0, Math.cos((2 * Math.PI * (m - otono)) / 12)) + ruido(6))
      break
    }
    case 'oceanico':
      tm = entre(rand, 11, 13.5); A = entre(rand, 8, 11)
      P = m => 95 - 32 * s(m) + ruido(10)
      break
    case 'continental':
      tm = entre(rand, 6, 9); A = entre(rand, 27, 32)
      P = m => 48 + 30 * s(m) + ruido(5)
      break
    default: // polar
      tm = entre(rand, -15, -10); A = entre(rand, 18, 22)
      P = m => 14 + 8 * s(m) + ruido(4)
  }
  const T = [], Pm = []
  for (let m = 0; m < 12; m++) {
    T.push(Math.round(tm + (A / 2) * s(m) + ruido(0.6)))
    Pm.push(Math.max(0, Math.round(P(m))))
  }
  return { T, P: Pm }
}

const girar = (xs, k) => xs.map((_, i) => xs[(i + k) % 12])

export function genClima(tipo, rand, sur = false) {
  for (;;) {
    let c = generar(tipo, rand)
    if (sur) c = { T: girar(c.T, 6), P: girar(c.P, 6) }
    // Ningún mes pegado a la línea de Gaussen: se vería seco y húmedo a la vez.
    if (c.P.some((p, i) => Math.abs(p - 2 * c.T[i]) < MARGEN_SECO)) continue
    if (clasificar(c) !== tipo) continue
    return { ...c, tipo, sur }
  }
}

// Índice de un máximo que se vea a simple vista: supera a todos los meses no
// contiguos en `margen`. Devuelve -1 si no lo hay.
function maximoClaro(xs, margen) {
  const i = xs.indexOf(Math.max(...xs))
  if (xs.filter(x => x === xs[i]).length > 1) return -1
  const lejos = xs.filter((_, j) => Math.abs(j - i) > 1 && Math.abs(j - i) < 11)
  return lejos.every(x => xs[i] - x >= margen) ? i : -1
}
// Tres meses de distracción: ni el bueno ni sus vecinos.
const otrosMeses = (rand, i) => baraja(rand, [...Array(12).keys()].filter(j => Math.abs(j - i) > 1 && Math.abs(j - i) < 11)).slice(0, 3)

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random, evitar } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const pregunta = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, pregunta }
    if (pregunta === 'clima') {
      const sur = nivel === 'dificil' && rand() < 0.4
      const tipo = elige(rand, sur ? DEL_SUR : CLIMAS)
      if (tipo === evitar) continue
      const c = genClima(tipo, rand, sur)
      const otros = PARECIDOS[tipo]
      return { ...base, ...c, clave: tipo, bueno: tipo, opciones: baraja(rand, [tipo, ...otros]) }
    }
    if (pregunta === 'calido') {
      const c = genClima(elige(rand, ['mediterraneo', 'oceanico', 'continental', 'desertico', 'polar']), rand, rand() < 0.3)
      const i = maximoClaro(c.T, 2)
      if (i < 0) continue
      return { ...base, ...c, bueno: i, opciones: [i, ...otrosMeses(rand, i)].sort((a, b) => a - b) }
    }
    if (pregunta === 'lluvioso') {
      const c = genClima(elige(rand, ['tropical', 'mediterraneo', 'oceanico', 'continental', 'ecuatorial']), rand, rand() < 0.3)
      const i = maximoClaro(c.P, c.P[c.P.indexOf(Math.max(...c.P))] > 100 ? 25 : 12)
      if (i < 0) continue
      return { ...base, ...c, bueno: i, opciones: [i, ...otrosMeses(rand, i)].sort((a, b) => a - b) }
    }
    if (pregunta === 'amplitud') {
      const c = genClima(elige(rand, ['mediterraneo', 'oceanico', 'continental', 'desertico', 'polar', 'tropical']), rand, rand() < 0.3)
      const a = amplitud(c), tmax = Math.max(...c.T), tmin = Math.min(...c.T)
      // Fallos típicos: dar la máxima, sumar en vez de restar (con mínimas
      // negativas, restar el signo mal) y quedarse corto o largo.
      const cand = [tmax, tmax + tmin, Math.abs(tmax + tmin), a + 8, a - 8, a + 15]
      const ops = [a]
      for (const x of cand) if (x > 0 && ops.every(o => Math.abs(o - x) >= 4)) ops.push(x)
      if (ops.length < 4) continue
      return { ...base, ...c, bueno: a, opciones: ops.slice(0, 4).sort((x, y) => x - y) }
    }
    if (pregunta === 'secos') {
      const c = genClima(elige(rand, ['mediterraneo', 'mediterraneo', 'tropical', 'desertico', 'oceanico', 'continental']), rand, rand() < 0.3)
      const n = mesesSecos(c)
      const ops = [n]
      for (const d of baraja(rand, [-2, -1, 1, 2, 3, -3])) if (ops.length < 4 && n + d >= 0 && n + d <= 12) ops.push(n + d)
      return { ...base, ...c, bueno: n, opciones: ops.sort((x, y) => x - y) }
    }
    // hemisferio: solo climas con estaciones claras.
    const sur = rand() < 0.5
    const c = genClima(elige(rand, sur ? ['mediterraneo', 'oceanico', 'desertico', 'polar'] : ['mediterraneo', 'oceanico', 'desertico', 'polar', 'continental']), rand, sur)
    return { ...base, ...c, bueno: sur ? 'sur' : 'norte', opciones: ['norte', 'sur'] }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es

export const MESES = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ca: ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'],
}
export const INICIALES = {
  es: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  en: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  ca: ['G', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
}
const mes = (i, l) => { const m = (MESES[l] ?? MESES.es)[i]; return l === 'en' ? m : m[0].toUpperCase() + m.slice(1) }

export const NOMBRE_CLIMA = {
  ecuatorial: T('Ecuatorial', 'Equatorial', 'Equatorial'),
  tropical: T('Tropical (con estación seca)', 'Tropical (wet and dry)', 'Tropical (amb estació seca)'),
  desertico: T('Desértico', 'Desert', 'Desèrtic'),
  mediterraneo: T('Mediterráneo', 'Mediterranean', 'Mediterrani'),
  oceanico: T('Oceánico', 'Oceanic', 'Oceànic'),
  continental: T('Continental', 'Continental', 'Continental'),
  polar: T('Polar', 'Polar', 'Polar'),
}
// Rasgos de cada clima, para la explicación.
const RASGOS = {
  ecuatorial: T('calor todo el año casi sin cambios y lluvia abundante todos los meses. Es el de la selva: Amazonía, Congo, Singapur.', 'heat all year with hardly any change and plenty of rain every month. It is the rainforest climate: the Amazon, the Congo, Singapore.', 'calor tot l’any gairebé sense canvis i pluja abundant tots els mesos. És el de la selva: Amazònia, Congo, Singapur.'),
  tropical: T('calor todo el año, una estación de lluvias muy intensas en verano y otra seca. Es el de la sabana: el Sahel, la India, el norte de Australia.', 'heat all year, a season of very heavy rain in summer and a dry one. It is the savanna climate: the Sahel, India, northern Australia.', 'calor tot l’any, una estació de pluges molt intenses a l’estiu i una altra de seca. És el de la sabana: el Sahel, l’Índia, el nord d’Austràlia.'),
  desertico: T('casi no llueve en todo el año y las temperaturas son altas: todos los meses son secos. Sáhara, Arabia, Atacama.', 'it hardly rains all year and temperatures are high: every month is dry. The Sahara, Arabia, the Atacama.', 'gairebé no plou en tot l’any i les temperatures són altes: tots els mesos són secs. Sàhara, Aràbia, Atacama.'),
  mediterraneo: T('inviernos suaves, veranos calurosos y, sobre todo, verano SECO: llueve en otoño e invierno. Valencia, Atenas, Ciudad del Cabo.', 'mild winters, hot summers and, above all, a DRY summer: it rains in autumn and winter. Valencia, Athens, Cape Town.', 'hiverns suaus, estius calorosos i, sobretot, estiu SEC: plou a la tardor i a l’hivern. València, Atenes, Ciutat del Cap.'),
  oceanico: T('temperaturas suaves todo el año, sin inviernos fríos ni veranos calurosos, y lluvia en todos los meses. Santander, Londres, Nueva Zelanda.', 'mild temperatures all year, with no cold winters or hot summers, and rain every month. Santander, London, New Zealand.', 'temperatures suaus tot l’any, sense hiverns freds ni estius calorosos, i pluja tots els mesos. Santander, Londres, Nova Zelanda.'),
  continental: T('inviernos muy fríos, bajo cero, y veranos cálidos: una amplitud térmica enorme. Llueve más en verano. Moscú, Varsovia, el interior de Canadá.', 'very cold winters, below freezing, and warm summers: a huge temperature range. It rains more in summer. Moscow, Warsaw, inland Canada.', 'hiverns molt freds, sota zero, i estius càlids: una amplitud tèrmica enorme. Plou més a l’estiu. Moscou, Varsòvia, l’interior del Canadà.'),
  polar: T('frío todo el año: ni el mes más cálido llega a 10 °C. Llueve (o nieva) muy poco. Groenlandia, el norte de Siberia, la Antártida.', 'cold all year: not even the warmest month reaches 10 °C. Very little rain (or snow). Greenland, northern Siberia, Antarctica.', 'fred tot l’any: ni el mes més càlid arriba a 10 °C. Plou (o neva) molt poc. Groenlàndia, el nord de Sibèria, l’Antàrtida.'),
}

export function textoOpcion(o, ronda, l) {
  switch (ronda.pregunta) {
    case 'clima': return tx(NOMBRE_CLIMA[o], l)
    case 'calido': case 'lluvioso': return mes(o, l)
    case 'amplitud': return `${o} °C`
    case 'secos': return `${o}`
    default: return tx(o === 'norte' ? T('Hemisferio norte', 'Northern hemisphere', 'Hemisferi nord') : T('Hemisferio sur', 'Southern hemisphere', 'Hemisferi sud'), l)
  }
}

export function enunciado(ronda, l) {
  return tx({
    clima: T('¿A qué clima corresponde este climograma?', 'Which climate does this climate graph show?', 'A quin clima correspon aquest climograma?'),
    calido: T('¿Cuál es el mes más cálido?', 'Which is the warmest month?', 'Quin és el mes més càlid?'),
    lluvioso: T('¿Cuál es el mes más lluvioso?', 'Which is the wettest month?', 'Quin és el mes més plujós?'),
    amplitud: T('¿Cuál es la amplitud térmica anual?', 'What is the annual temperature range?', 'Quina és l’amplitud tèrmica anual?'),
    secos: T('¿Cuántos meses secos hay? (la barra queda por debajo de la línea)', 'How many dry months are there? (the bar is below the line)', 'Quants mesos secs hi ha? (la barra queda per sota de la línia)'),
    hemisferio: T('¿En qué hemisferio está este lugar?', 'Which hemisphere is this place in?', 'En quin hemisferi és aquest lloc?'),
  }[ronda.pregunta], l)
}

export function explicacion(ronda, l) {
  const r = ronda
  const tmax = Math.max(...r.T), tmin = Math.min(...r.T)
  const iMax = r.T.indexOf(tmax), iMin = r.T.indexOf(tmin)
  switch (r.pregunta) {
    case 'clima': {
      const sur = r.sur ? tx(T(' Ojo: es del hemisferio sur, el verano cae en diciembre-febrero.', ' Careful: it is in the southern hemisphere, summer falls in December-February.', ' Compte: és de l’hemisferi sud, l’estiu cau al desembre-febrer.'), l) : ''
      return tx(T(`Temperaturas de ${tmin} a ${tmax} °C y ${total(r)} mm al año: ${tx(RASGOS[r.tipo], 'es')}`, `Temperatures from ${tmin} to ${tmax} °C and ${total(r)} mm a year: ${tx(RASGOS[r.tipo], 'en')}`, `Temperatures de ${tmin} a ${tmax} °C i ${total(r)} mm l’any: ${tx(RASGOS[r.tipo], 'ca')}`), l) + sur
    }
    case 'calido': return tx(T(`La línea roja llega más alto en ${mes(r.bueno, 'es').toLowerCase()}: ${tmax} °C.`, `The red line is highest in ${mes(r.bueno, 'en')}: ${tmax} °C.`, `La línia vermella arriba més amunt al ${mes(r.bueno, 'ca').toLowerCase()}: ${tmax} °C.`), l)
    case 'lluvioso': return tx(T(`La barra azul más alta es la de ${mes(r.bueno, 'es').toLowerCase()}: ${r.P[r.bueno]} mm.`, `The tallest blue bar is ${mes(r.bueno, 'en')}: ${r.P[r.bueno]} mm.`, `La barra blava més alta és la del ${mes(r.bueno, 'ca').toLowerCase()}: ${r.P[r.bueno]} mm.`), l)
    case 'amplitud': {
      const resta = tmin < 0 ? `${tmax} − (${tmin}) = ${tmax} + ${-tmin}` : `${tmax} − ${tmin}`
      return tx(T(`Amplitud = mes más cálido − mes más frío = ${resta} = ${r.bueno} °C (${mes(iMax, 'es').toLowerCase()} y ${mes(iMin, 'es').toLowerCase()}).`, `Range = warmest month − coldest month = ${resta} = ${r.bueno} °C (${mes(iMax, 'en')} and ${mes(iMin, 'en')}).`, `Amplitud = mes més càlid − mes més fred = ${resta} = ${r.bueno} °C (${mes(iMax, 'ca').toLowerCase()} i ${mes(iMin, 'ca').toLowerCase()}).`), l)
    }
    case 'secos': return tx(T(`Un mes es seco cuando llueve menos del doble de su temperatura (P < 2T): en el climograma, cuando la barra no llega a la línea. Aquí son ${r.bueno}, marcados en naranja.`, `A month is dry when its rainfall is less than twice its temperature (P < 2T): on the graph, when the bar does not reach the line. Here there are ${r.bueno}, marked in orange.`, `Un mes és sec quan plou menys del doble de la seva temperatura (P < 2T): al climograma, quan la barra no arriba a la línia. Aquí són ${r.bueno}, marcats en taronja.`), l)
    default: return r.bueno === 'sur'
      ? tx(T(`Hace más calor en ${mes(iMax, 'es').toLowerCase()} y más frío en ${mes(iMin, 'es').toLowerCase()}: el verano cae a final y principio de año, así que es el hemisferio sur.`, `It is hottest in ${mes(iMax, 'en')} and coldest in ${mes(iMin, 'en')}: summer falls at the end and start of the year, so it is the southern hemisphere.`, `Fa més calor al ${mes(iMax, 'ca').toLowerCase()} i més fred al ${mes(iMin, 'ca').toLowerCase()}: l’estiu cau a final i principi d’any, així que és l’hemisferi sud.`), l)
      : tx(T(`Hace más calor en ${mes(iMax, 'es').toLowerCase()} y más frío en ${mes(iMin, 'es').toLowerCase()}: el verano cae a mitad de año, así que es el hemisferio norte.`, `It is hottest in ${mes(iMax, 'en')} and coldest in ${mes(iMin, 'en')}: summer falls in the middle of the year, so it is the northern hemisphere.`, `Fa més calor al ${mes(iMax, 'ca').toLowerCase()} i més fred al ${mes(iMin, 'ca').toLowerCase()}: l’estiu cau a meitat d’any, així que és l’hemisferi nord.`), l)
  }
}

export function schemaQuestion(ronda, l) {
  // Sin el dibujo, se da la tabla de datos.
  const datos = ronda.T.map((t, i) => `${(INICIALES[l] ?? INICIALES.es)[i]} ${t}°C/${ronda.P[i]}mm`).join(', ')
  return {
    question: `${datos}. ${enunciado(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}
