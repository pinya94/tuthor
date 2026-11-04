// ¿Qué Hora Es Allí?: husos horarios (Geografía de 1.º de ESO, «La
// representación de la Tierra»).
//
// Dos clases de hora y no se mezclan en una misma ronda:
//   · la HORA OFICIAL de una ciudad (su UTC±h en invierno, sin horario de
//     verano): rondas «hora» y «vuelo». Madrid va con UTC+1 aunque esté casi
//     en el meridiano de Greenwich, y Canarias una hora menos; por eso la
//     ronda da el UTC de cada ciudad y el mapa NO pinta franjas.
//   · la hora del HUSO TEÓRICO (franjas de 15°, el huso k va de 15k − 7,5° a
//     15k + 7,5°): rondas «huso» y «meridiano». Aquí sí se pintan las franjas.
//
// Las horas se guardan en minutos contados desde las 00:00 del día de la
// ciudad de salida (pueden ser negativos o pasar de 1440: otro día). La
// respuesta es esa cuenta exacta, así que el día también cuenta.
//
// Mecánicas:
//   hora       En A son las HH:MM. Gira el reloj de B.
//   vuelo      Sales de A a las HH:MM y el vuelo dura X: hora de B al llegar.
//   huso       En Greenwich son las HH:MM: toca la franja donde son las HH:MM.
//   meridiano  Un lugar a N° E/O: gira su reloj (hora de su huso).

export const tx = (o, l) => o[l] ?? o.es
// En catalán, apóstrofos y contracciones delante de los nombres de ciudad:
// «d’Atenes», «del Caire», «al Caire»
const ca = x => x.replace(/\bde El /g, 'del ').replace(/\ba El /g, 'al ').replace(/\bA El /g, 'Al ').replace(/\bde ([AEIOUÀÈÉÍÒÓÚH])/g, 'd’$1')
const s = (l, es, en, cat) => (l === 'ca' ? ca(cat) : ({ es, en })[l] ?? es)

const C = (id, utc, lon, lat, es, en = es, ca = es, extra = {}) => ({ id, utc, lon, lat, nombre: { es, en, ca }, ...extra })
// UTC en invierno (hora estándar, sin horario de verano). Nada de husos de
// media hora (India, Terranova, Adelaida…) ni países que cambian de hora en
// direcciones opuestas en los dos hemisferios (Chile, Paraguay).
export const CIUDADES = [
  C('madrid', 1, -3.7, 40.4, 'Madrid', 'Madrid', 'Madrid', { facil: true }),
  C('canarias', 0, -15.4, 28.1, 'Las Palmas de Gran Canaria', 'Las Palmas (Canary Islands)', 'Las Palmas de Gran Canària'),
  C('londres', 0, -0.13, 51.5, 'Londres', 'London', 'Londres', { facil: true }),
  C('lisboa', 0, -9.14, 38.7, 'Lisboa', 'Lisbon', 'Lisboa', { facil: true }),
  C('reikiavik', 0, -21.9, 64.15, 'Reikiavik', 'Reykjavik', 'Reykjavík'),
  C('paris', 1, 2.35, 48.86, 'París', 'Paris', 'París', { facil: true }),
  C('roma', 1, 12.5, 41.9, 'Roma', 'Rome', 'Roma', { facil: true }),
  C('atenas', 2, 23.7, 37.98, 'Atenas', 'Athens', 'Atenes', { facil: true }),
  C('cairo', 2, 31.24, 30.04, 'El Cairo', 'Cairo', 'El Caire', { facil: true }),
  C('johannesburgo', 2, 28.05, -26.2, 'Johannesburgo', 'Johannesburg', 'Johannesburg'),
  C('moscu', 3, 37.6, 55.75, 'Moscú', 'Moscow', 'Moscou', { facil: true }),
  C('nairobi', 3, 36.8, -1.29, 'Nairobi'),
  C('dubai', 4, 55.3, 25.2, 'Dubái', 'Dubai', 'Dubai'),
  C('bangkok', 7, 100.5, 13.75, 'Bangkok'),
  C('pekin', 8, 116.4, 39.9, 'Pekín', 'Beijing', 'Pequín', { facil: true }),
  C('tokio', 9, 139.7, 35.7, 'Tokio', 'Tokyo', 'Tòquio', { facil: true }),
  C('sidney', 10, 151.2, -33.87, 'Sídney', 'Sydney', 'Sydney', { facil: true }),
  C('auckland', 12, 174.8, -36.85, 'Auckland'),
  C('nuevaYork', -5, -74, 40.7, 'Nueva York', 'New York', 'Nova York', { facil: true }),
  C('chicago', -6, -87.6, 41.9, 'Chicago'),
  C('mexico', -6, -99.13, 19.43, 'Ciudad de México', 'Mexico City', 'Ciutat de Mèxic', { facil: true }),
  C('losAngeles', -8, -118.24, 34.05, 'Los Ángeles', 'Los Angeles', 'Los Angeles', { facil: true }),
  C('anchorage', -9, -149.9, 61.2, 'Anchorage'),
  C('honolulu', -10, -157.86, 21.3, 'Honolulu'),
  C('bogota', -5, -74.07, 4.71, 'Bogotá', 'Bogotá', 'Bogotà'),
  C('lima', -5, -77.04, -12.05, 'Lima'),
  C('buenosAires', -3, -58.38, -34.6, 'Buenos Aires', 'Buenos Aires', 'Buenos Aires', { facil: true }),
  C('rio', -3, -43.2, -22.9, 'Río de Janeiro', 'Rio de Janeiro', 'Rio de Janeiro'),
]
export const ciudad = id => CIUDADES.find(c => c.id === id)

export const DIAS = {
  es: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  ca: ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte', 'diumenge'],
}
const mod = (a, n) => ((a % n) + n) % n
export const hhmm = m => `${String(Math.floor(mod(m, 1440) / 60)).padStart(2, '0')}:${String(mod(m, 60)).padStart(2, '0')}`
// Día de la semana de una cuenta de minutos, sabiendo qué día es el 0
export const diaDe = (m, dia0, l) => DIAS[l][mod(dia0 + Math.floor(m / 1440), 7)]
// «martes 02:00» (en las cuentas)
export const momento = (m, dia0, l) => `${diaDe(m, dia0, l)} ${hhmm(m)}`
// En frase: «son las 10:00 del lunes», «es la 01:00 del lunes», «it is 10:00 on Monday»
const una = m => Math.floor(mod(m, 1440) / 60) === 1
export const esLa = (m, dia0, l) => s(l,
  `${una(m) ? 'es la' : 'son las'} ${hhmm(m)} del ${diaDe(m, dia0, l)}`,
  `it is ${hhmm(m)} on ${diaDe(m, dia0, l)}`,
  `${una(m) ? 'és la' : 'són les'} ${hhmm(m)} de ${diaDe(m, dia0, l)}`)
// «a las 10:00 del lunes», «at 10:00 on Monday»
export const aLa = (m, dia0, l) => s(l,
  `a ${una(m) ? 'la' : 'las'} ${hhmm(m)} del ${diaDe(m, dia0, l)}`,
  `at ${hhmm(m)} on ${diaDe(m, dia0, l)}`,
  `a ${una(m) ? 'la' : 'les'} ${hhmm(m)} de ${diaDe(m, dia0, l)}`)
export const utc = h => (h === 0 ? 'UTC+0' : h > 0 ? `UTC+${h}` : `UTC−${-h}`)
export const duracion = (min, l) => {
  const h = Math.floor(min / 60), m = min % 60
  return m ? s(l, `${h} h ${m} min`, `${h} h ${m} min`, `${h} h ${m} min`) : `${h} h`
}
export const grados = lon => (lon === 0 ? '0°' : `${Math.abs(lon)}° ${lon > 0 ? 'E' : 'O'}`)
const gradosL = (lon, l) => (lon === 0 ? '0°' : `${String(Math.abs(lon)).replace('.', l === 'en' ? '.' : ',')}° ${lon > 0 ? 'E' : l === 'en' ? 'W' : 'O'}`)
export const husoDe = lon => Math.round(lon / 15)
// Mismo formato que la explicación: «+3», «−5», «0»
const conSigno = c => (c > 0 ? `+${c}` : c < 0 ? `−${-c}` : '0')

// Distancia en km por el círculo máximo (para la duración de los vuelos)
export function distancia(a, b) {
  const r = Math.PI / 180, R = 6371
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export const NIVELES = {
  facil:   { tipos: ['hora', 'hora', 'huso'], minutos: false, cambiaDia: false },
  medio:   { tipos: ['hora', 'vuelo', 'huso', 'meridiano'], minutos: false, cambiaDia: true },
  dificil: { tipos: ['hora', 'vuelo', 'vuelo', 'meridiano'], minutos: true, cambiaDia: true },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
let seq = 0
// Memoria anti-repetición: las últimas ciudades salen del sorteo (no se
// descartan rondas enteras, que dejaría sin salir a algún tipo)
const recientes = []
const recuerda = (...ids) => { recientes.push(...ids); while (recientes.length > 6) recientes.shift() }

function parCiudades(rand, cfg, condicion) {
  const pool = CIUDADES.filter(c => (cfg.minutos || cfg.cambiaDia || c.facil))
  for (let i = 0; i < 400; i++) {
    const libres = i < 200 ? pool.filter(c => !recientes.includes(c.id)) : pool
    const a = elige(rand, libres), b = elige(rand, libres)
    if (a.id === b.id || a.utc === b.utc) continue
    if (!condicion(a, b)) continue
    return [a, b]
  }
  throw new Error('sin par de ciudades')
}

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const dia = entre(rand, 0, 6)
  const base = { id: ++seq, nivel, tipo, dia, minutos: cfg.minutos }
  const salida = () => entre(rand, 0, 23) * 60 + (cfg.minutos ? elige(rand, [0, 15, 30, 45]) : 0)

  if (tipo === 'hora') {
    for (;;) {
      const [a, b] = parCiudades(rand, cfg, (x, y) => cfg.cambiaDia || Math.abs(x.utc - y.utc) <= 9)
      const t0 = salida()
      const t = t0 + (b.utc - a.utc) * 60
      const cambia = Math.floor(t / 1440) !== 0
      if (!cfg.cambiaDia && cambia) continue
      recuerda(a.id, b.id)
      return { ...base, a: a.id, b: b.id, t0, bueno: `t:${t}` }
    }
  }
  if (tipo === 'vuelo') {
    const [a, b] = parCiudades(rand, cfg, (x, y) => distancia(x, y) > 1500)
    // ~850 km/h más media hora de despegue y aterrizaje, redondeado a horas
    // enteras (a 15 min en difícil, que es lo que avanza su reloj)
    const paso = cfg.minutos ? 15 : 60
    const dur = Math.max(2 * 60, Math.round((distancia(a, b) / 850 * 60 + 30) / paso) * paso)
    const t0 = salida()
    recuerda(a.id, b.id)
    return { ...base, a: a.id, b: b.id, t0, dur, bueno: `t:${t0 + dur + (b.utc - a.utc) * 60}` }
  }
  if (tipo === 'huso') {
    // En Greenwich son las g; ¿dónde son las g + k h? Sin ±12 (el antimeridiano
    // corta esa franja en dos) y, en fácil, sin cambiar de día.
    for (;;) {
      const k = entre(rand, -11, 11)
      if (k === 0) continue
      const g = entre(rand, 0, 23) * 60
      if (!cfg.cambiaDia && Math.floor((g + k * 60) / 1440) !== 0) continue
      return { ...base, g, k, bueno: `huso:${k}` }
    }
  }
  // meridiano: en medio, meridianos centrales (múltiplos de 15°); en difícil,
  // cualquiera que no caiga a menos de 2° de un borde entre husos
  for (;;) {
    const lon = cfg.minutos ? entre(rand, -170, 170) : entre(rand, -11, 11) * 15
    if (husoDe(lon) === 0) continue
    const resto = Math.abs(lon / 15 - Math.round(lon / 15)) * 15
    if (cfg.minutos && (resto > 5.5 || resto === 0)) continue
    const g = salida()
    return { ...base, lon, g, bueno: `t:${g + husoDe(lon) * 60}` }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, x) => x === r.bueno
// Hora de partida que enseña el reloj al empezar la ronda
export const relojInicial = r => (r.tipo === 'meridiano' ? r.g : r.t0 ?? 0)
export const respuesta = m => `t:${m}`

// ── Textos ────────────────────────────────────────────────────────────────
const nom = (id, l) => tx(ciudad(id).nombre, l)

export function enunciado(r, l) {
  if (r.tipo === 'hora') {
    const a = ciudad(r.a), b = ciudad(r.b)
    return s(l,
      `En ${nom(r.a, l)} (${utc(a.utc)}) ${esLa(r.t0, r.dia, l)}. ¿Qué día y hora es en ${nom(r.b, l)} (${utc(b.utc)})?`,
      `In ${nom(r.a, l)} (${utc(a.utc)}) ${esLa(r.t0, r.dia, l)}. What day and time is it in ${nom(r.b, l)} (${utc(b.utc)})?`,
      `A ${nom(r.a, l)} (${utc(a.utc)}) ${esLa(r.t0, r.dia, l)}. Quin dia i hora és a ${nom(r.b, l)} (${utc(b.utc)})?`)
  }
  if (r.tipo === 'vuelo') {
    const a = ciudad(r.a), b = ciudad(r.b)
    return s(l,
      `Sales de ${nom(r.a, l)} (${utc(a.utc)}) ${aLa(r.t0, r.dia, l)}, hora local. El vuelo a ${nom(r.b, l)} (${utc(b.utc)}) dura ${duracion(r.dur, l)}. ¿Qué día y hora es allí al aterrizar?`,
      `You leave ${nom(r.a, l)} (${utc(a.utc)}) ${aLa(r.t0, r.dia, l)}, local time. The flight to ${nom(r.b, l)} (${utc(b.utc)}) takes ${duracion(r.dur, l)}. What day and time is it there when you land?`,
      `Surts de ${nom(r.a, l)} (${utc(a.utc)}) ${aLa(r.t0, r.dia, l)}, hora local. El vol a ${nom(r.b, l)} (${utc(b.utc)}) dura ${duracion(r.dur, l)}. Quin dia i hora és allà quan aterres?`)
  }
  if (r.tipo === 'huso') {
    const m = r.g + r.k * 60
    const sig = m >= 1440, ant = m < 0
    return s(l,
      `En Greenwich (0°) son las ${hhmm(r.g)}. Toca el huso donde son las ${hhmm(m)}${sig ? ' del día siguiente' : ant ? ' del día anterior' : ''}.`,
      `In Greenwich (0°) it is ${hhmm(r.g)}. Tap the time zone where it is ${hhmm(m)}${sig ? ' the next day' : ant ? ' the day before' : ''}.`,
      `A Greenwich (0°) són les ${hhmm(r.g)}. Toca el fus on són les ${hhmm(m)}${sig ? ' de l’endemà' : ant ? ' del dia anterior' : ''}.`)
  }
  return s(l,
    `En Greenwich (0°) ${esLa(r.g, r.dia, l)}. ¿Qué día y hora es en un lugar a ${gradosL(r.lon, l)}, según su huso?`,
    `In Greenwich (0°) ${esLa(r.g, r.dia, l)}. What day and time is it at a place at ${gradosL(r.lon, l)}, by its time zone?`,
    `A Greenwich (0°) ${esLa(r.g, r.dia, l)}. Quin dia i hora és en un lloc a ${gradosL(r.lon, l)}, segons el seu fus?`)
}

function cuentaDia(m, l) {
  const d = Math.floor(m / 1440)
  if (!d) return ''
  return d > 0 ? s(l, ' (ya es el día siguiente)', ' (it is already the next day)', ' (ja és l’endemà)') : s(l, ' (todavía es el día anterior)', ' (it is still the day before)', ' (encara és el dia anterior)')
}

// Notas solo cuando son verdad en ESTA ronda
function notas(ids, l) {
  const out = []
  if (ids.includes('madrid') && ids.some(id => ['londres', 'lisboa', 'canarias', 'reikiavik'].includes(id))) {
    out.push(s(l, 'Madrid está casi en el meridiano de Greenwich, pero usa la hora de Europa central (UTC+1).', 'Madrid lies almost on the Greenwich meridian, but uses Central European Time (UTC+1).', 'Madrid és gairebé al meridià de Greenwich, però fa servir l’hora d’Europa central (UTC+1).'))
  }
  if (ids.includes('canarias')) out.push(s(l, 'Canarias va una hora por detrás de la Península.', 'The Canary Islands are one hour behind mainland Spain.', 'Canàries va una hora per darrere de la Península.'))
  return out.length ? ' ' + out.join(' ') : ''
}

export function explicacion(r, l) {
  if (r.tipo === 'hora' || r.tipo === 'vuelo') {
    const a = ciudad(r.a), b = ciudad(r.b)
    const d = b.utc - a.utc
    const dif = d > 0
      ? s(l, `${nom(r.b, l)} va ${d} h por delante de ${nom(r.a, l)}`, `${nom(r.b, l)} is ${d} h ahead of ${nom(r.a, l)}`, `${nom(r.b, l)} va ${d} h per davant de ${nom(r.a, l)}`)
      : s(l, `${nom(r.b, l)} va ${-d} h por detrás de ${nom(r.a, l)}`, `${nom(r.b, l)} is ${-d} h behind ${nom(r.a, l)}`, `${nom(r.b, l)} va ${-d} h per darrere de ${nom(r.a, l)}`)
    // «−5 − (+1) = −6 h», «0 − (+8) = −8 h», «+9 − 0 = +9 h»
    const calc = `${conSigno(b.utc)} − ${a.utc ? `(${conSigno(a.utc)})` : '0'} = ${conSigno(d)} h`
    const fin = r.tipo === 'hora' ? r.t0 + d * 60 : r.t0 + r.dur + d * 60
    if (r.tipo === 'hora') {
      const op = `${hhmm(r.t0)} ${d > 0 ? '+' : '−'} ${Math.abs(d)} h = ${momento(fin, r.dia, l)}${cuentaDia(fin, l)}.`
      return s(l, `${dif} (${calc}). ${op}`, `${dif} (${calc}). ${op}`, `${dif} (${calc}). ${op}`) + notas([r.a, r.b], l)
    }
    const llegaA = r.t0 + r.dur
    return s(l,
      `Al aterrizar, en ${nom(r.a, l)} ${esLa(llegaA, r.dia, l)} (${hhmm(r.t0)} + ${duracion(r.dur, l)}). ${dif} (${calc}), así que allí ${esLa(fin, r.dia, l)}.`,
      `When you land, in ${nom(r.a, l)} ${esLa(llegaA, r.dia, l)} (${hhmm(r.t0)} + ${duracion(r.dur, l)}). ${dif} (${calc}), so there ${esLa(fin, r.dia, l)}.`,
      `Quan aterres, a ${nom(r.a, l)} ${esLa(llegaA, r.dia, l)} (${hhmm(r.t0)} + ${duracion(r.dur, l)}). ${dif} (${calc}), així que allà ${esLa(fin, r.dia, l)}.`) + notas([r.a, r.b], l)
  }
  const regla = s(l, 'La Tierra da una vuelta (360°) en 24 h: cada huso mide 15°. Hacia el este se suma una hora por huso y hacia el oeste se resta.', 'The Earth turns 360° in 24 h, so each time zone is 15° wide. Going east you add an hour per zone; going west you take one away.', 'La Terra fa una volta (360°) en 24 h: cada fus fa 15°. Cap a l’est se suma una hora per fus i cap a l’oest se’n resta.')
  if (r.tipo === 'huso') {
    const n = Math.abs(r.k)
    return s(l,
      `${n} h ${r.k > 0 ? 'más' : 'menos'} que en Greenwich: ${husos(n, l)} ${lado(r.k, l)}, el que va de ${gradosL(r.k * 15 - 7.5, l)} a ${gradosL(r.k * 15 + 7.5, l)} (huso ${conSigno(r.k)}). `,
      `${n} h ${r.k > 0 ? 'later' : 'earlier'} than Greenwich: ${husos(n, l)} ${lado(r.k, l)}, the one from ${gradosL(r.k * 15 - 7.5, l)} to ${gradosL(r.k * 15 + 7.5, l)} (zone ${conSigno(r.k)}). `,
      `${n} h ${r.k > 0 ? 'més' : 'menys'} que a Greenwich: ${husos(n, l)} ${lado(r.k, l)}, el que va de ${gradosL(r.k * 15 - 7.5, l)} a ${gradosL(r.k * 15 + 7.5, l)} (fus ${conSigno(r.k)}). `) + regla
  }
  const k = husoDe(r.lon)
  const n = Math.abs(k)
  const fin = r.g + k * 60
  const loc = l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES'
  // «135° ÷ 15° = 9» o, si no es exacto, «50° ÷ 15° ≈ 3,3 → huso +3»
  const cuenta = r.lon % 15 === 0
    ? `${Math.abs(r.lon)}° ÷ 15° = ${n}`
    : `${Math.abs(r.lon)}° ÷ 15° ≈ ${(Math.abs(r.lon) / 15).toLocaleString(loc, { maximumFractionDigits: 1 })} → ${s(l, 'huso', 'zone', 'fus')} ${conSigno(k)}`
  return s(l,
    `${cuenta}: ${husos(n, l)} ${lado(k, l)} → ${hhmm(r.g)} ${k > 0 ? '+' : '−'} ${n} h = ${momento(fin, r.dia, l)}${cuentaDia(fin, l)}. `,
    `${cuenta}: ${husos(n, l)} ${lado(k, l)} → ${hhmm(r.g)} ${k > 0 ? '+' : '−'} ${n} h = ${momento(fin, r.dia, l)}${cuentaDia(fin, l)}. `,
    `${cuenta}: ${husos(n, l)} ${lado(k, l)} → ${hhmm(r.g)} ${k > 0 ? '+' : '−'} ${n} h = ${momento(fin, r.dia, l)}${cuentaDia(fin, l)}. `) + regla + s(l, ' Es la hora del huso: la oficial de cada país puede ser otra.', ' This is the time-zone time: each country’s official time may differ.', ' És l’hora del fus: l’oficial de cada país pot ser una altra.')
}

// «1 huso», «3 husos»; «al este», «al oeste»
const husos = (n, l) => (n === 1 ? s(l, '1 huso', '1 zone', '1 fus') : s(l, `${n} husos`, `${n} zones`, `${n} fusos`))
const lado = (k, l) => (k > 0 ? s(l, 'al este', 'east', 'a l’est') : s(l, 'al oeste', 'west', 'a l’oest'))

// Para los buscadores y el examen en texto: diferencia de horas
export function schemaQuestion(r, l) {
  if (r.tipo === 'huso' || r.tipo === 'meridiano') {
    const k = r.tipo === 'huso' ? r.k : husoDe(r.lon)
    const q = s(l, `En Greenwich son las ${hhmm(r.g)}. ¿Qué hora es ${husos(Math.abs(k), l)} ${lado(k, l)}?`, `It is ${hhmm(r.g)} in Greenwich. What time is it ${husos(Math.abs(k), l)} ${lado(k, l)}?`, `A Greenwich són les ${hhmm(r.g)}. Quina hora és ${husos(Math.abs(k), l)} ${lado(k, l)}?`)
    return { question: q, correctAnswer: hhmm(r.g + k * 60), wrongAnswers: [hhmm(r.g - k * 60), hhmm(r.g + k * 60 + 60), hhmm(r.g + k * 60 - 60)] }
  }
  const a = ciudad(r.a), b = ciudad(r.b)
  const d = b.utc - a.utc
  const t = r.tipo === 'hora' ? r.t0 : r.t0 + r.dur
  const q = r.tipo === 'hora'
    ? s(l, `En ${nom(r.a, l)} (${utc(a.utc)}) son las ${hhmm(t)}. ¿Qué hora es en ${nom(r.b, l)} (${utc(b.utc)})?`, `It is ${hhmm(t)} in ${nom(r.a, l)} (${utc(a.utc)}). What time is it in ${nom(r.b, l)} (${utc(b.utc)})?`, `A ${nom(r.a, l)} (${utc(a.utc)}) són les ${hhmm(t)}. Quina hora és a ${nom(r.b, l)} (${utc(b.utc)})?`)
    : s(l, `Sales de ${nom(r.a, l)} (${utc(a.utc)}) a las ${hhmm(r.t0)} y el vuelo dura ${duracion(r.dur, l)}. ¿Qué hora es en ${nom(r.b, l)} (${utc(b.utc)}) al llegar?`, `You leave ${nom(r.a, l)} (${utc(a.utc)}) at ${hhmm(r.t0)} and the flight takes ${duracion(r.dur, l)}. What time is it in ${nom(r.b, l)} (${utc(b.utc)}) when you land?`, `Surts de ${nom(r.a, l)} (${utc(a.utc)}) a les ${hhmm(r.t0)} i el vol dura ${duracion(r.dur, l)}. Quina hora és a ${nom(r.b, l)} (${utc(b.utc)}) en arribar?`)
  const buena = hhmm(t + d * 60)
  const malas = [...new Set([hhmm(t - d * 60), hhmm(t + d * 60 + 60), hhmm(t + d * 60 - 60), hhmm(t)])].filter(x => x !== buena).slice(0, 3)
  return { question: q, correctAnswer: buena, wrongAnswers: malas }
}
