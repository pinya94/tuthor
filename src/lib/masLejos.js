// ¿Más Lejos?: racha de distancias. Sale un trayecto con sus kilómetros y
// después otro: ¿está más lejos o más cerca? Al responder, el nuevo pasa a ser
// el que hay que superar. La gracia es mezclar escalas: Dublín → Londres
// contra Cataluña → Andalucía, EE. UU. → China contra Sídney → Tokio.
//
// Para que la respuesta no sea discutible:
//   · cada lugar es UN punto: las ciudades, el suyo; los países y las
//     comunidades se miden desde su capital, y la pantalla lo dice
//     («China · Pekín»);
//   · solo se comparan trayectos que se diferencian lo bastante (ver
//     NIVELES.margen): ninguna otra forma razonable de medir le da la vuelta;
//   · sin océanos como extremos: el Pacífico y el Índico se tocan.
// Distancia en línea recta sobre la Tierra (ortodrómica, R = 6371 km).

const T = (es, en, ca) => ({ es, en, ca })

// [id, nombre, lat, lon, tipo, capital (para países y comunidades)]
// tipo: 'ciudad' | 'pais' | 'region'
const L = (id, nombre, lat, lon, tipo = 'ciudad', capital = null) => ({ id, nombre, lat, lon, tipo, capital })
export const LUGARES = [
  // Comunidades autónomas (desde su capital)
  L('cataluna', T('Cataluña', 'Catalonia', 'Catalunya'), 41.39, 2.17, 'region', 'Barcelona'),
  L('andalucia', T('Andalucía', 'Andalusia', 'Andalusia'), 37.39, -5.98, 'region', T('Sevilla', 'Seville', 'Sevilla')),
  L('galicia', T('Galicia', 'Galicia', 'Galícia'), 42.88, -8.54, 'region', 'Santiago'),
  L('pais-vasco', T('País Vasco', 'Basque Country', 'País Basc'), 42.85, -2.67, 'region', 'Vitoria-Gasteiz'),
  L('canarias', T('Canarias', 'Canary Islands', 'Canàries'), 28.12, -15.43, 'region', 'Las Palmas'),
  L('baleares', T('Baleares', 'Balearic Islands', 'Balears'), 39.57, 2.65, 'region', 'Palma'),
  L('asturias', T('Asturias', 'Asturias', 'Astúries'), 43.36, -5.85, 'region', 'Oviedo'),
  L('murcia', T('Región de Murcia', 'Murcia', 'Regió de Múrcia'), 37.99, -1.13, 'region', T('Murcia', 'Murcia', 'Múrcia')),
  L('aragon', T('Aragón', 'Aragon', 'Aragó'), 41.65, -0.88, 'region', 'Zaragoza'),
  L('extremadura', T('Extremadura', 'Extremadura', 'Extremadura'), 38.92, -6.34, 'region', 'Mérida'),
  L('valencia', T('Comunidad Valenciana', 'Valencian Community', 'Comunitat Valenciana'), 39.47, -0.38, 'region', T('Valencia', 'Valencia', 'València')),
  // Ciudades
  L('madrid', T('Madrid', 'Madrid', 'Madrid'), 40.42, -3.70),
  L('dublin', T('Dublín', 'Dublin', 'Dublín'), 53.35, -6.26),
  L('londres', T('Londres', 'London', 'Londres'), 51.51, -0.13),
  L('paris', T('París', 'Paris', 'París'), 48.86, 2.35),
  L('roma', T('Roma', 'Rome', 'Roma'), 41.90, 12.50),
  L('berlin', T('Berlín', 'Berlin', 'Berlín'), 52.52, 13.40),
  L('lisboa', T('Lisboa', 'Lisbon', 'Lisboa'), 38.72, -9.14),
  L('amsterdam', T('Ámsterdam', 'Amsterdam', 'Amsterdam'), 52.37, 4.90),
  L('atenas', T('Atenas', 'Athens', 'Atenes'), 37.98, 23.73),
  L('reikiavik', T('Reikiavik', 'Reykjavík', 'Reykjavík'), 64.15, -21.94),
  L('estambul', T('Estambul', 'Istanbul', 'Istanbul'), 41.01, 28.98),
  L('marrakech', T('Marrakech', 'Marrakesh', 'Marràqueix'), 31.63, -8.00),
  L('el-cairo', T('El Cairo', 'Cairo', 'el Caire'), 30.04, 31.24),
  L('nairobi', T('Nairobi', 'Nairobi', 'Nairobi'), -1.29, 36.82),
  L('ciudad-del-cabo', T('Ciudad del Cabo', 'Cape Town', 'Ciutat del Cap'), -33.92, 18.42),
  L('nueva-york', T('Nueva York', 'New York', 'Nova York'), 40.71, -74.00),
  L('los-angeles', T('Los Ángeles', 'Los Angeles', 'Los Angeles'), 34.05, -118.24),
  L('toronto', T('Toronto', 'Toronto', 'Toronto'), 43.65, -79.38),
  L('honolulu', T('Honolulu', 'Honolulu', 'Honolulu'), 21.31, -157.86),
  L('ciudad-de-mexico', T('Ciudad de México', 'Mexico City', 'Ciutat de Mèxic'), 19.43, -99.13),
  L('rio', T('Río de Janeiro', 'Rio de Janeiro', 'Rio de Janeiro'), -22.91, -43.17),
  L('buenos-aires', T('Buenos Aires', 'Buenos Aires', 'Buenos Aires'), -34.60, -58.38),
  L('lima', T('Lima', 'Lima', 'Lima'), -12.05, -77.04),
  L('moscu', T('Moscú', 'Moscow', 'Moscou'), 55.76, 37.62),
  L('bombay', T('Bombay', 'Mumbai', 'Bombai'), 19.08, 72.88),
  L('bangkok', T('Bangkok', 'Bangkok', 'Bangkok'), 13.76, 100.50),
  L('singapur', T('Singapur', 'Singapore', 'Singapur'), 1.35, 103.82),
  L('tokio', T('Tokio', 'Tokyo', 'Tòquio'), 35.68, 139.69),
  L('sidney', T('Sídney', 'Sydney', 'Sydney'), -33.87, 151.21),
  // Países (desde su capital)
  L('eeuu', T('EE. UU.', 'USA', 'EUA'), 38.90, -77.04, 'pais', 'Washington'),
  L('china', T('China', 'China', 'Xina'), 39.90, 116.41, 'pais', T('Pekín', 'Beijing', 'Pequín')),
  L('australia', T('Australia', 'Australia', 'Austràlia'), -35.28, 149.13, 'pais', 'Canberra'),
  L('brasil', T('Brasil', 'Brazil', 'Brasil'), -15.79, -47.88, 'pais', T('Brasilia', 'Brasília', 'Brasília')),
  L('india', T('India', 'India', 'Índia'), 28.61, 77.21, 'pais', T('Nueva Delhi', 'New Delhi', 'Nova Delhi')),
  L('canada', T('Canadá', 'Canada', 'Canadà'), 45.42, -75.70, 'pais', 'Ottawa'),
  L('sudafrica', T('Sudáfrica', 'South Africa', 'Sud-àfrica'), -25.75, 28.19, 'pais', 'Pretoria'),
  L('noruega', T('Noruega', 'Norway', 'Noruega'), 59.91, 10.75, 'pais', 'Oslo'),
  L('nueva-zelanda', T('Nueva Zelanda', 'New Zealand', 'Nova Zelanda'), -41.29, 174.78, 'pais', 'Wellington'),
  L('marruecos', T('Marruecos', 'Morocco', 'el Marroc'), 34.02, -6.84, 'pais', 'Rabat'),
  L('turquia', T('Turquía', 'Turkey', 'Turquia'), 39.93, 32.86, 'pais', 'Ankara'),
  L('indonesia', T('Indonesia', 'Indonesia', 'Indonèsia'), -6.21, 106.85, 'pais', T('Yakarta', 'Jakarta', 'Jakarta')),
  L('chile', T('Chile', 'Chile', 'Xile'), -33.45, -70.67, 'pais', 'Santiago'),
  L('argentina', T('Argentina', 'Argentina', 'Argentina'), -34.60, -58.38, 'pais', 'Buenos Aires'),
  L('mexico', T('México', 'Mexico', 'Mèxic'), 19.43, -99.13, 'pais', T('Ciudad de México', 'Mexico City', 'Ciutat de Mèxic')),
  L('irlanda', T('Irlanda', 'Ireland', 'Irlanda'), 53.35, -6.26, 'pais', T('Dublín', 'Dublin', 'Dublín')),
  L('reino-unido', T('Reino Unido', 'United Kingdom', 'Regne Unit'), 51.51, -0.13, 'pais', T('Londres', 'London', 'Londres')),
  L('francia', T('Francia', 'France', 'França'), 48.86, 2.35, 'pais', T('París', 'Paris', 'París')),
]
export const POR_ID = Object.fromEntries(LUGARES.map(p => [p.id, p]))

// Distancia ortodrómica en km
export function km(a, b) {
  const rad = x => (x * Math.PI) / 180
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

// margen: cuánto más largo tiene que ser un trayecto que el otro (cociente
// mínimo). En difícil se aprieta, pero solo entre ciudades y comunidades, que
// son puntos exactos; con países por medio nunca baja de 1,3.
export const NIVELES = {
  facil: { margen: 1.8, maxMargen: Infinity, tipos: ['ciudad', 'pais', 'region'] },
  medio: { margen: 1.3, maxMargen: 1.9, tipos: ['ciudad', 'pais', 'region'] },
  dificil: { margen: 1.12, maxMargen: 1.35, tipos: ['ciudad', 'region'] },
}
const MIN_KM = 250

const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]

// Un trayecto: dos lugares distintos que no sean el mismo punto
function trayecto(rand, tipos, escala) {
  const pool = LUGARES.filter(p => tipos.includes(p.tipo))
  for (;;) {
    let a = elige(rand, pool), b = elige(rand, pool)
    // A veces, los dos de España, para que salgan trayectos cortos
    if (escala === 'cerca') {
      const esp = pool.filter(p => p.tipo === 'region' || p.id === 'madrid' || p.id === 'lisboa' || p.id === 'paris' || p.id === 'londres' || p.id === 'dublin' || p.id === 'roma' || p.id === 'marrakech')
      a = elige(rand, esp); b = elige(rand, esp)
    }
    const d = km(a, b)
    if (a.id !== b.id && d >= MIN_KM) return { a: a.id, b: b.id, km: d }
  }
}

export function genRonda(nivel = 'facil', { rand = Math.random, anterior = null } = {}) {
  const N = NIVELES[nivel]
  const prev = anterior ?? trayecto(rand, N.tipos, rand() < 0.4 ? 'cerca' : 'lejos')
  for (let i = 0; i < 4000; i++) {
    const t = trayecto(rand, N.tipos, rand() < 0.4 ? 'cerca' : 'lejos')
    if ([t.a, t.b].sort().join() === [prev.a, prev.b].sort().join()) continue
    const conPais = [t.a, t.b, prev.a, prev.b].some(id => POR_ID[id].tipo === 'pais')
    const min = conPais ? Math.max(N.margen, 1.3) : N.margen
    const c = Math.max(t.km, prev.km) / Math.min(t.km, prev.km)
    if (c >= min && c <= N.maxMargen) {
      return { id: `${nivel}:${prev.a}-${prev.b}:${t.a}-${t.b}`, nivel, anterior: prev, actual: t, respuesta: t.km > prev.km ? 'lejos' : 'cerca' }
    }
  }
  // Si con este anterior no hay pareja (muy raro), se empieza de cero
  return genRonda(nivel, { rand })
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, x) => x === r.respuesta

// ── Textos ────────────────────────────────────────────────────────────────
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const tx = (v, l) => (typeof v === 'string' ? v : v[l] ?? v.es)
export const nombre = (id, l) => tx(POR_ID[id].nombre, l)
export const capital = (id, l) => (POR_ID[id].capital ? tx(POR_ID[id].capital, l) : null)
export const etiqueta = (id, l) => (capital(id, l) ? `${nombre(id, l)} · ${capital(id, l)}` : nombre(id, l))
export const fmtKm = (n, l) => `${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, l === 'en' ? ',' : '.') + ' km'
export const ruta = (t, l) => `${nombre(t.a, l)} → ${nombre(t.b, l)}`

export function explicacion(r, l) {
  const { anterior: p, actual: t } = r
  const veces = Math.max(t.km, p.km) / Math.min(t.km, p.km)
  const vx = veces >= 2 ? s(l, ` (unas ${Math.round(veces)} veces)`, ` (about ${Math.round(veces)} times)`, ` (unes ${Math.round(veces)} vegades)`) : ''
  const comp = r.respuesta === 'lejos'
    ? s(l, `más lejos${vx}`, `further${vx}`, `més lluny${vx}`)
    : s(l, `más cerca${vx}`, `closer${vx}`, `més a prop${vx}`)
  const capitales = [p.a, p.b, t.a, t.b].some(id => POR_ID[id].capital)
    ? s(l, ' Países y comunidades se miden desde su capital.', ' Countries and regions are measured from their capital.', ' Països i comunitats es mesuren des de la capital.')
    : ''
  return s(l,
    `${ruta(t, l)}: ${fmtKm(t.km, l)}, ${comp} que ${ruta(p, l)} (${fmtKm(p.km, l)}). Distancia en línea recta.${capitales}`,
    `${ruta(t, l)}: ${fmtKm(t.km, l)}, ${comp} than ${ruta(p, l)} (${fmtKm(p.km, l)}). Straight-line distance.${capitales}`,
    `${ruta(t, l)}: ${fmtKm(t.km, l)}, ${comp} que ${ruta(p, l)} (${fmtKm(p.km, l)}). Distància en línia recta.${capitales}`)
}

export function schemaQuestion(r, l) {
  const question = s(l,
    `${ruta(r.anterior, l)} son ${fmtKm(r.anterior.km, l)}. ¿${ruta(r.actual, l)} está más lejos o más cerca?`,
    `${ruta(r.anterior, l)} is ${fmtKm(r.anterior.km, l)}. Is ${ruta(r.actual, l)} further or closer?`,
    `${ruta(r.anterior, l)} són ${fmtKm(r.anterior.km, l)}. ${ruta(r.actual, l)} és més lluny o més a prop?`)
  const lejos = s(l, 'Más lejos', 'Further', 'Més lluny'), cerca = s(l, 'Más cerca', 'Closer', 'Més a prop')
  const igual = s(l, 'A la misma distancia', 'The same distance', 'A la mateixa distància')
  const noSe = s(l, 'No se puede saber', 'It cannot be known', 'No es pot saber')
  return r.respuesta === 'lejos'
    ? { question, correctAnswer: lejos, wrongAnswers: [cerca, igual, noSe] }
    : { question, correctAnswer: cerca, wrongAnswers: [lejos, igual, noSe] }
}
