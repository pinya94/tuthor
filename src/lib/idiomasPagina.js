// Idiomas en que existe de verdad una página (según el sitemap, ver
// scripts/gen-alternates.mjs). Lo usan SEOHead (hreflang en el navegador) y
// scripts/prerender.mjs (HTML servido). Antes se anunciaba /en/ en todas las
// páginas, y Google rastreaba páginas inglesas que no existen (soft 404);
// y el catalán, que sí existe en muchas, no se anunciaba nunca.
import { PATHS_EN, PATHS_CA } from '../data/alternatesIdioma.js'

// path SIN prefijo de idioma («/juegos/georush», «/»)
export function idiomasDe(path) {
  const p = path || '/'
  return ['es', ...(PATHS_EN.has(p) ? ['en'] : []), ...(PATHS_CA.has(p) ? ['ca'] : [])]
}
