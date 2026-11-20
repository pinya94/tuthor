// La imagen que sale al compartir una página (WhatsApp, redes): la del juego
// si la página es de un juego (su ficha, el juego o su examen «<slug>-test»)
// y la general de Tuthor si no. Las genera scripts/gen-og.mjs.
import { OG_JUEGOS } from '../data/ogJuegos.js'

export const BASE_OG = 'https://www.tuthor.es/og'

export function imagenOg(pathNeutro = '/') {
  const p = String(pathNeutro).replace(/^\/(en|ca)(?=\/|$)/, '').replace(/\/$/, '')
  const m = p.match(/^\/(?:juegos|info\/juegos)\/([^/?#]+)$/) || p.match(/^\/examen\/([^/?#]+?)-test$/)
  const slug = m?.[1]
  return `${BASE_OG}/${slug && OG_JUEGOS.has(slug) ? slug : 'tuthor'}.jpg`
}
