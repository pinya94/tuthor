// ── Globo terráqueo: países, líneas, coordenadas y día y noche ──────────────
//
// Lógica pura del recurso /recursos/globo-terraqueo. La geometría de los países
// sale de world-atlas (1:110 millones, dentro del proyecto: sin CDN) y se une con
// los datos de Tuthor (data/paises.js) por el código ISO numérico.
//
// Lo que el recurso enseña y que un mapa plano no puede:
//   · la forma y el tamaño reales (Groenlandia no es como África),
//   · qué son la latitud y la longitud, leyéndolas en cualquier punto,
//   · el ecuador, los trópicos y los círculos polares, y por qué están ahí,
//   · dónde es de día y de noche AHORA, con el Sol en su sitio.

import { feature } from 'topojson-client'
import { geoCentroid, geoContains, geoCircle } from 'd3-geo'
import mundo from 'world-atlas/countries-110m.json'
import { PAISES } from '../data/paises'
import { PAISES_COORDS } from '../data/coordenadasPaises'
import { A3_TO_NUM } from '../data/isoNumerico'

const RAD = Math.PI / 180

const PAIS_POR_NUMERO = new Map(PAISES.map(p => [A3_TO_NUM[p.iso], p]))
const CAPITAL_POR_ISO = new Map(PAISES_COORDS.map(p => [p.iso, { lat: p.lat, lon: p.lon }]))

// Un elemento por país del mapa. `pais` es null en los que Tuthor no tiene
// ficha (Kosovo, Chipre del Norte, algunos territorios): se dibujan y se pueden
// tocar, pero solo con el nombre que trae el mapa.
export const PAISES_GLOBO = feature(mundo, mundo.objects.countries).features.map(f => {
  const pais = PAIS_POR_NUMERO.get(f.id) ?? null
  return {
    id: f.id ?? f.properties.name,
    nombreMapa: f.properties.name,
    pais,
    capital: pais ? CAPITAL_POR_ISO.get(pais.iso) ?? null : null,
    feature: f,
    centro: geoCentroid(f),
  }
})

export const CONTINENTES = {
  'América': { es: 'América', en: 'America', ca: 'Amèrica' },
  'Asia': { es: 'Asia', en: 'Asia', ca: 'Àsia' },
  'Europa': { es: 'Europa', en: 'Europe', ca: 'Europa' },
  'Europa/Asia': { es: 'Europa y Asia', en: 'Europe and Asia', ca: 'Europa i Àsia' },
  'Oceanía': { es: 'Oceanía', en: 'Oceania', ca: 'Oceania' },
  'África': { es: 'África', en: 'Africa', ca: 'Àfrica' },
}

// Los datos de Tuthor tienen nombre en castellano y en inglés; en catalán se usa
// el castellano, que para nombres de país coincide casi siempre.
export const nombrePais = (g, l = 'es') => (g.pais ? (l === 'en' ? g.pais.nombreEn ?? g.pais.nombre : g.pais.nombre) : g.nombreMapa)
export const capitalPais = (g, l = 'es') => (g.pais ? (l === 'en' ? g.pais.capitalEn ?? g.pais.capital : g.pais.capital) : null)

// Qué país hay en un punto [lon, lat], o null si es mar.
export const paisEn = (lon, lat) => PAISES_GLOBO.find(g => geoContains(g.feature, [lon, lat])) ?? null

const sinTildes = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Búsqueda por nombre sin tildes, en castellano o en inglés: primero los que
// empiezan por lo escrito, luego los que lo contienen.
export function buscarPaises(texto, max = 6) {
  const t = sinTildes(String(texto ?? '').trim())
  if (!t) return []
  const puntos = g => {
    const nombres = [g.pais?.nombre, g.pais?.nombreEn, g.nombreMapa].filter(Boolean).map(sinTildes)
    if (nombres.some(n => n.startsWith(t))) return 2
    if (nombres.some(n => n.includes(t))) return 1
    return 0
  }
  return PAISES_GLOBO.map(g => [g, puntos(g)]).filter(([, p]) => p > 0).sort((a, b) => b[1] - a[1]).slice(0, max).map(([g]) => g)
}

// ── Líneas que se estudian ──────────────────────────────────────────────────
//
// Los trópicos están a 23,44°, que es la inclinación del eje de la Tierra: son
// las latitudes más al norte y más al sur donde el Sol llega a estar en vertical.
// Los círculos polares, a 90° − 23,44°: desde ahí hacia el polo hay al menos un
// día al año sin sol y otro sin noche.
export const INCLINACION_EJE = 23.44

// Un paralelo se dibuja con un punto por grado: d3 une los puntos con arcos de
// círculo máximo, y con dos puntos un paralelo saldría como una línea recta.
const paralelo = lat => ({ type: 'LineString', coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, lat]) })

export const LINEAS = [
  { id: 'ecuador', geo: paralelo(0), lat: 0, color: '#facc15', nombre: { es: 'Ecuador', en: 'Equator', ca: 'Equador' } },
  { id: 'cancer', geo: paralelo(INCLINACION_EJE), lat: INCLINACION_EJE, color: '#fb923c', nombre: { es: 'Trópico de Cáncer', en: 'Tropic of Cancer', ca: 'Tròpic de Càncer' } },
  { id: 'capricornio', geo: paralelo(-INCLINACION_EJE), lat: -INCLINACION_EJE, color: '#fb923c', nombre: { es: 'Trópico de Capricornio', en: 'Tropic of Capricorn', ca: 'Tròpic de Capricorn' } },
  { id: 'artico', geo: paralelo(90 - INCLINACION_EJE), lat: 90 - INCLINACION_EJE, color: '#7dd3fc', nombre: { es: 'Círculo polar ártico', en: 'Arctic Circle', ca: 'Cercle polar àrtic' } },
  { id: 'antartico', geo: paralelo(INCLINACION_EJE - 90), lat: INCLINACION_EJE - 90, color: '#7dd3fc', nombre: { es: 'Círculo polar antártico', en: 'Antarctic Circle', ca: 'Cercle polar antàrtic' } },
  { id: 'greenwich', geo: { type: 'LineString', coordinates: Array.from({ length: 181 }, (_, i) => [0, i - 90]) }, lon: 0, color: '#f472b6', nombre: { es: 'Meridiano de Greenwich', en: 'Greenwich meridian', ca: 'Meridià de Greenwich' } },
]

// ── El Sol ──────────────────────────────────────────────────────────────────
//
// Punto subsolar: donde el Sol está justo en vertical en una fecha y hora. Con
// las fórmulas de baja precisión del Almanaque Náutico (error de centésimas de
// grado), de sobra para dibujar dónde es de día.
export function puntoSubsolar(fecha) {
  const n = fecha.getTime() / 86400000 + 2440587.5 - 2451545
  const L = 280.46 + 0.9856474 * n
  const g = (357.528 + 0.9856003 * n) * RAD
  const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD
  const eps = (23.439 - 0.0000004 * n) * RAD
  const declinacion = Math.asin(Math.sin(eps) * Math.sin(lambda))
  const ascension = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda))
  const tiempoSidereo = 280.46061837 + 360.98564736629 * n
  // El Sol pasa por el meridiano donde el tiempo sidéreo local iguala su
  // ascensión recta: longitud = ascensión recta − tiempo sidéreo de Greenwich.
  const lon = ((((ascension / RAD - tiempoSidereo) % 360) + 540) % 360) - 180
  return { lat: declinacion / RAD, lon }
}

// La mitad de la Tierra donde es de noche: el hemisferio centrado en el punto
// opuesto al Sol.
export function zonaNoche(fecha) {
  const s = puntoSubsolar(fecha)
  return geoCircle().center([s.lon + 180, -s.lat]).radius(90)()
}

// ── Coordenadas ─────────────────────────────────────────────────────────────

// 40,4° N · 3,7° O. Oeste es "O" en castellano y catalán y "W" en inglés.
export function coordTexto(lat, lon, l = 'es') {
  const f = v => new Intl.NumberFormat(l, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Math.abs(v))
  const oeste = l === 'en' ? 'W' : 'O'
  return `${f(lat)}° ${lat >= 0 ? 'N' : 'S'} · ${f(lon)}° ${lon >= 0 ? 'E' : oeste}`
}

// Rotación de la proyección ortográfica de d3 que deja [lon, lat] en el centro.
export const rotacionHacia = (lon, lat) => [-lon, -lat]
