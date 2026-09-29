// Registro del arte de juegos: slug del juego (el de /juegos/<slug>) → su
// ilustración SVG. Lo usan el catálogo (Thumbnail), el hub de fichas y la
// ficha de cada juego. El test de registros exige que todo juego del catálogo
// tenga aquí su dibujo: un juego nuevo no puede volver al emoji.
import { ARTE_MATES } from './juegosMates'
import { ARTE_HISTORIA_GEO } from './juegosHistoriaGeo'
import { ARTE_LENGUA } from './juegosLengua'
import { ARTE_CIENCIAS } from './juegosCiencias'
import { ARTE_VIDA } from './juegosVida'

export const ARTE_JUEGOS = {
  ...ARTE_MATES,
  ...ARTE_HISTORIA_GEO,
  ...ARTE_LENGUA,
  ...ARTE_CIENCIAS,
  ...ARTE_VIDA,
}

// '/juegos/reloj-horas' (con o sin prefijo de idioma) → 'reloj-horas'
export function slugDeRuta(path) {
  const m = (path || '').match(/\/juegos\/([^/?#]+)/)
  return m ? m[1] : null
}

export function ArteJuego({ slug, className }) {
  const Arte = slug ? ARTE_JUEGOS[slug] : null
  return Arte ? <Arte className={className} /> : null
}
