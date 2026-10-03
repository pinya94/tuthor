// El Tiempo · segunda tanda: el mapa del tiempo de España (símbolos y
// temperaturas por ciudad) y el mapa de isobaras (borrasca y anticiclón).
//
// La Península está dibujada a mano con coordenadas reales (lon, lat) en una
// proyección equirectangular corregida por cos(40°): no hace falta descargar
// contornos para un mapa de símbolos, y así funciona igual sin conexión.
//
// Cada mapa del tiempo sigue UNA estación: sin nieve en León el mismo día que
// playa a 30 °C en Málaga. Las preguntas se construyen para que la respuesta
// sea única entre las cuatro ciudades que se ofrecen.

const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)

// ── Geografía ────────────────────────────────────────────────────────────
export const MAPA_W = 430, MAPA_H = 330
// Margen de mar alrededor, para que quepan los centros de presión del Atlántico.
export const VIEWBOX_ISOBARAS = '-80 -90 625 465'
const K = 40
export const proyecta = (lon, lat) => [Math.round((lon + 9.8) * 0.766 * K * 10) / 10, Math.round((44 - lat) * K * 10) / 10]

const COSTA = [
  [-9.3, 42.9], [-8.3, 43.55], [-7.0, 43.6], [-5.8, 43.65], [-4.0, 43.45], [-3.0, 43.4], [-1.8, 43.38],
  [-1.0, 43.0], [0.7, 42.8], [1.7, 42.5], [3.2, 42.4], [3.25, 41.95], [2.2, 41.4], [1.0, 41.05], [0.85, 40.7],
  [0.0, 40.05], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.35], [-2.1, 36.75], [-3.0, 36.75],
  [-4.4, 36.7], [-5.35, 36.05], [-6.3, 36.5], [-6.4, 36.85], [-7.4, 37.2], [-8.0, 37.0], [-8.9, 37.0], [-8.8, 38.0],
  [-9.4, 38.7], [-9.0, 39.5], [-8.8, 40.2], [-8.7, 41.2], [-8.9, 41.9],
]
const FRONTERA_PT = [[-8.9, 41.9], [-8.1, 42.0], [-6.6, 41.9], [-6.9, 41.0], [-7.0, 40.2], [-7.3, 39.6], [-7.0, 38.9], [-7.2, 38.2], [-7.4, 37.2]]
const ruta = pts => pts.map(([lon, lat], i) => `${i ? 'L' : 'M'}${proyecta(lon, lat).join(' ')}`).join('')
export const PATH_PENINSULA = ruta(COSTA) + 'Z'
export const PATH_PORTUGAL = ruta(FRONTERA_PT)
export const BALEARES = [[2.95, 39.62, 18, 10], [1.4, 38.98, 7, 5], [4.1, 39.95, 7, 4]].map(([lon, lat, rx, ry]) => ({ c: proyecta(lon, lat), rx, ry }))

// costa: sirve para playa. zona: norte (frío, lluvioso), meseta, sur, este.
export const CIUDADES_MAPA = [
  { id: 'coruna', nombre: 'A Coruña', lon: -8.41, lat: 43.36, costa: true, zona: 'norte' },
  { id: 'bilbao', nombre: 'Bilbao', lon: -2.93, lat: 43.26, costa: true, zona: 'norte' },
  { id: 'leon', nombre: 'León', lon: -5.57, lat: 42.6, costa: false, zona: 'meseta' },
  { id: 'zaragoza', nombre: 'Zaragoza', lon: -0.88, lat: 41.65, costa: false, zona: 'meseta' },
  { id: 'barcelona', nombre: 'Barcelona', lon: 2.17, lat: 41.39, costa: true, zona: 'este' },
  { id: 'madrid', nombre: 'Madrid', lon: -3.7, lat: 40.42, costa: false, zona: 'meseta' },
  { id: 'valencia', nombre: 'Valencia', lon: -0.38, lat: 39.47, costa: true, zona: 'este' },
  { id: 'palma', nombre: 'Palma', lon: 2.65, lat: 39.57, costa: true, zona: 'este' },
  { id: 'sevilla', nombre: 'Sevilla', lon: -5.98, lat: 37.39, costa: false, zona: 'sur' },
  { id: 'malaga', nombre: 'Málaga', lon: -4.42, lat: 36.72, costa: true, zona: 'sur' },
].map(c => ({ ...c, xy: proyecta(c.lon, c.lat) }))

// ── Mapa del tiempo ──────────────────────────────────────────────────────
const ESTACIONES = {
  invierno: { base: { norte: 9, meseta: 5, este: 13, sur: 15 }, var: 4 },
  primavera: { base: { norte: 15, meseta: 18, este: 20, sur: 23 }, var: 4 },
  verano: { base: { norte: 23, meseta: 33, este: 29, sur: 33 }, var: 3 },
}
// Cielos posibles: lluvia y tormenta mojan; nube NO (es el distractor de
// «¿dónde hace falta paraguas?»).
export const MOJA = new Set(['lluvia', 'tormenta', 'nieve'])

export const PREGUNTAS_MAPA = {
  playa: { es: '¿Dónde hará mejor día de playa?', en: 'Where will be the best beach day?', ca: 'On farà millor dia de platja?' },
  paraguas: { es: '¿En qué ciudad hará falta paraguas?', en: 'In which city will you need an umbrella?', ca: 'A quina ciutat caldrà paraigua?' },
  nieve: { es: '¿Dónde puede nevar?', en: 'Where might it snow?', ca: 'On pot nevar?' },
  frio: { es: '¿Qué ciudad tendrá la temperatura más baja?', en: 'Which city will have the lowest temperature?', ca: 'Quina ciutat tindrà la temperatura més baixa?' },
  calor: { es: '¿Qué ciudad tendrá la temperatura más alta?', en: 'Which city will have the highest temperature?', ca: 'Quina ciutat tindrà la temperatura més alta?' },
}

export function genMapa(rand) {
  for (;;) {
    const estacion = elige(rand, Object.keys(ESTACIONES))
    const tipo = elige(rand, estacion === 'verano' ? ['playa', 'calor', 'paraguas', 'frio'] : estacion === 'invierno' ? ['nieve', 'frio', 'paraguas', 'calor'] : ['playa', 'paraguas', 'frio', 'calor'])
    const E = ESTACIONES[estacion]
    const tiempo = {}
    for (const c of CIUDADES_MAPA) {
      let temp = E.base[c.zona] + entre(rand, -E.var, E.var)
      let cielo
      const r = rand()
      if (c.zona === 'norte') cielo = r < 0.35 ? 'lluvia' : r < 0.7 ? 'nube' : 'solNube'
      else cielo = r < 0.45 ? 'sol' : r < 0.7 ? 'solNube' : r < 0.85 ? 'nube' : 'lluvia'
      if (estacion === 'verano' && cielo === 'lluvia' && rand() < 0.5) cielo = 'tormenta'
      if (cielo === 'lluvia' || cielo === 'tormenta') temp -= 2
      if (estacion === 'invierno' && c.zona === 'meseta' && rand() < 0.3) { cielo = 'nieve'; temp = entre(rand, -3, 1) }
      tiempo[c.id] = { cielo, temp }
    }
    const pregunta = construyePregunta(tipo, tiempo, rand)
    if (!pregunta) continue
    return { tipo: 'mapa', datos: { estacion, tiempo, pregunta: tipo }, ...pregunta }
  }
}

function construyePregunta(tipo, tiempo, rand) {
  const ids = CIUDADES_MAPA.map(c => c.id)
  const de = id => tiempo[id]
  let bueno, resto
  if (tipo === 'playa') {
    const buenos = CIUDADES_MAPA.filter(c => c.costa && de(c.id).cielo === 'sol' && de(c.id).temp >= 24)
    if (buenos.length !== 1) return null
    bueno = buenos[0].id
    // Las demás opciones, costeras sin playa (nubes, lluvia o fresco) y como mucho una de interior.
    resto = CIUDADES_MAPA.filter(c => c.id !== bueno && (c.costa ? (de(c.id).cielo !== 'sol' || de(c.id).temp < 22) : de(c.id).temp >= 28)).map(c => c.id)
  } else if (tipo === 'paraguas') {
    const moja = ids.filter(id => MOJA.has(de(id).cielo) && de(id).cielo !== 'nieve')
    if (moja.length < 1) return null
    bueno = elige(rand, moja)
    // los distractores no mojan, y al menos uno está nublado (nube ≠ lluvia)
    resto = ids.filter(id => !MOJA.has(de(id).cielo))
    if (!resto.some(id => de(id).cielo === 'nube')) return null
    resto = [resto.find(id => de(id).cielo === 'nube'), ...baraja(rand, resto.filter(id => de(id).cielo !== 'nube'))]
    return { bueno, opciones: baraja(rand, [bueno, ...resto.slice(0, 3)]) }
  } else if (tipo === 'nieve') {
    const nieve = ids.filter(id => de(id).cielo === 'nieve')
    if (nieve.length !== 1) return null
    bueno = nieve[0]
    resto = ids.filter(id => id !== bueno && de(id).cielo !== 'nieve')
    // que haya alguna ciudad fría sin nieve, o con lluvia, como despiste
    if (!resto.some(id => de(id).temp <= 6 || MOJA.has(de(id).cielo))) return null
  } else {
    const orden = [...ids].sort((a, b) => (tipo === 'frio' ? de(a).temp - de(b).temp : de(b).temp - de(a).temp))
    if (de(orden[0]).temp === de(orden[1]).temp) return null
    bueno = orden[0]
    resto = orden.slice(1, 6) // las más cercanas: hay que leer los números, no adivinar por la zona
  }
  if (resto.length < 3) return null
  return { bueno, opciones: baraja(rand, [bueno, ...baraja(rand, resto).slice(0, 3)]) }
}

// ── Isobaras ─────────────────────────────────────────────────────────────
// Una borrasca (B, presión baja en el centro, isobaras juntas → viento) y un
// anticiclón (A, presión alta, isobaras separadas → calma y cielo despejado).
export const PREGUNTAS_ISOBARAS = ['tiempo', 'viento', 'concepto']
const POS_B = [[-10.5, 44], [-10.5, 41.5], [-6, 44.6], [-10.5, 39], [1.5, 44.4]]
const POS_A = [[3.5, 37.5], [-1, 36], [-5, 38.5], [0.5, 39.5], [-3, 40]]

export const RESP_TIEMPO = {
  borrasca: { es: 'Nubes, lluvia y viento', en: 'Clouds, rain and wind', ca: 'Núvols, pluja i vent' },
  anticiclon: { es: 'Cielo despejado y poco viento', en: 'Clear skies and little wind', ca: 'Cel serè i poc vent' },
  nieblaCalor: { es: 'Calor extremo y polvo', en: 'Extreme heat and dust', ca: 'Calor extrema i pols' },
  igual: { es: 'Igual que en el resto del mapa', en: 'The same as the rest of the map', ca: 'Igual que a la resta del mapa' },
}
export const RESP_CONCEPTO = {
  B: { es: 'Una borrasca: bajas presiones', en: 'A depression: low pressure', ca: 'Una borrasca: baixes pressions' },
  A: { es: 'Un anticiclón: altas presiones', en: 'An anticyclone: high pressure', ca: 'Un anticicló: altes pressions' },
  frente: { es: 'Un frente frío', en: 'A cold front', ca: 'Un front fred' },
  tormenta: { es: 'Una tormenta de arena', en: 'A sandstorm', ca: 'Una tempesta de sorra' },
}

export function genIsobaras(rand) {
  for (;;) {
    const [blon, blat] = elige(rand, POS_B)
    const [alon, alat] = elige(rand, POS_A)
    const B = proyecta(blon, blat), A = proyecta(alon, alat)
    if (Math.hypot(B[0] - A[0], B[1] - A[1]) < 210) continue
    const dB = c => Math.hypot(c.xy[0] - B[0], c.xy[1] - B[1])
    const dA = c => Math.hypot(c.xy[0] - A[0], c.xy[1] - A[1])
    const pregunta = elige(rand, PREGUNTAS_ISOBARAS)
    const cercaB = [...CIUDADES_MAPA].sort((a, b) => dB(a) - dB(b))[0]
    const cercaA = [...CIUDADES_MAPA].sort((a, b) => dA(a) - dA(b))[0]
    if (cercaA.id === cercaB.id || dB(cercaB) > 100 || dA(cercaA) > 95) continue
    const datos = { B, A, pregunta, marcadas: [] }
    if (pregunta === 'tiempo') {
      const enB = rand() < 0.5
      const c = enB ? cercaB : cercaA
      datos.marcadas = [c.id]
      datos.ciudad = c.id
      return { tipo: 'isobaras', datos, bueno: enB ? 'borrasca' : 'anticiclon', opciones: baraja(rand, Object.keys(RESP_TIEMPO)) }
    }
    if (pregunta === 'viento') {
      datos.marcadas = baraja(rand, [cercaB.id, cercaA.id])
      return { tipo: 'isobaras', datos, bueno: cercaB.id, opciones: [...datos.marcadas, 'igual'] }
    }
    datos.letra = rand() < 0.5 ? 'B' : 'A'
    return { tipo: 'isobaras', datos, bueno: datos.letra, opciones: baraja(rand, Object.keys(RESP_CONCEPTO)) }
  }
}

// Anillos de cada centro: presión y radio. La borrasca, juntos; el anticiclón, separados.
export const ANILLOS_B = [[996, 22], [1000, 42], [1004, 62], [1008, 82]]
export const ANILLOS_A = [[1028, 26], [1024, 58], [1020, 92]]

export const nombreCiudad = id => CIUDADES_MAPA.find(c => c.id === id)?.nombre ?? id
