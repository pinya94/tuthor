// Subconjunto curado de países con coordenadas (lat/lon de su capital) para
// el juego Coordenadas. Cruza por `iso` con PAISES (src/data/paises.js) para
// no duplicar nombre, bandera, capital ni los datos ya existentes — esto
// SOLO añade lat/lon. 40 países, repartidos por continente, elegidos entre
// los más conocidos de PAISES.js para que el listado tenga sentido en un
// mapamundi sin agobiar con países minúsculos difíciles de situar.
//
// Coordenadas ±0.1° (~11 km) — de sobra de precisión para las tolerancias
// del juego (perfecto ≤ 400 km, así que un margen de 11 km es irrelevante).
import { PAISES } from './paises'

// [iso, lat, lon]
const COORDS = [
  // Europa
  ['ESP', 40.4, -3.7], ['FRA', 48.9, 2.3], ['DEU', 52.5, 13.4], ['ITA', 41.9, 12.5],
  ['GBR', 51.5, -0.1], ['PRT', 38.7, -9.1], ['NLD', 52.4, 4.9], ['SWE', 59.3, 18.1],
  ['GRC', 38.0, 23.7], ['RUS', 55.8, 37.6], ['ISL', 64.1, -21.9],
  // Asia
  ['JPN', 35.7, 139.7], ['CHN', 39.9, 116.4], ['IND', 28.6, 77.2], ['KOR', 37.6, 127.0],
  ['TUR', 39.9, 32.9], ['SAU', 24.7, 46.7], ['THA', 13.8, 100.5], ['IDN', -6.2, 106.8], ['ISR', 31.8, 35.2],
  // África
  ['EGY', 30.0, 31.2], ['ZAF', -25.7, 28.2], ['NGA', 9.1, 7.5], ['KEN', -1.3, 36.8],
  ['MAR', 34.0, -6.8], ['ETH', 9.0, 38.7], ['DZA', 36.8, 3.1],
  // América
  ['USA', 38.9, -77.0], ['CAN', 45.4, -75.7], ['MEX', 19.4, -99.1], ['BRA', -15.8, -47.9],
  ['ARG', -34.6, -58.4], ['CHL', -33.4, -70.6], ['COL', 4.7, -74.1], ['PER', -12.0, -77.0],
  ['CUB', 23.1, -82.4], ['VEN', 10.5, -66.9], ['CRI', 9.9, -84.1],
  // Oceanía
  ['AUS', -35.3, 149.1], ['NZL', -41.3, 174.8],
]

export const PAISES_COORDS = COORDS
  .map(([iso, lat, lon]) => {
    const pais = PAISES.find(p => p.iso === iso)
    return pais ? { ...pais, lat, lon } : null
  })
  .filter(Boolean)
