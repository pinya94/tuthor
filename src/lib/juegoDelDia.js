// ── El juego del día ─────────────────────────────────────────────────────────
// Cada día, un juego del catálogo. Sustituye a la vieja rotación de doce
// mini-retos (data/preguntasDiarias.js) como reto principal: aquella lista se
// escribió cuando había una docena de juegos y nunca creció, así que casi
// todo el catálogo se quedaba fuera. Esta sale del catálogo visual (el GAMES
// de data/constants.js, el de /juegos), de modo que un juego nuevo entra en la
// rotación solo, sin tocar nada aquí.
//
// El objetivo es DESCUBRIR: alguien que no sabe qué elegir recibe uno, y al
// cabo de N días (N = juegos del catálogo) ha pasado por todos. Por eso no es
// un índice al azar —un hash repetiría juegos a los pocos días y se dejaría
// otros meses—, sino un paso fijo coprimo con N: (día · paso) mod N recorre
// todos los juegos antes de repetir ninguno, y con un paso de ~0,38·N dos días
// seguidos caen lejos en la lista (que va ordenada por materia), así que no
// salen tres de historia seguidos.
//
// Se respeta el idioma: los juegos que solo funcionan en castellano
// (disponibleEn) no salen en en/ca.
import { GAMES as CATALOGO } from '../data/constants.js'
import { disponibleEn } from './games.js'

const slugDeRuta = path => (path || '').match(/^\/juegos\/([^/?#]+)/)?.[1] ?? null

const mcd = (a, b) => (b ? mcd(b, a % b) : a)

// Días desde una fecha fija, en hora LOCAL: el juego cambia a medianoche del
// alumno, no a la de Greenwich (en España serían la 1 o las 2 de la mañana).
export function numeroDeDia(fecha = new Date()) {
  const local = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
  return Math.floor(local / 86400000)
}

// Los juegos que pueden salir en ese idioma, en el orden del catálogo.
export function juegosDelDiaPosibles(lang = 'es') {
  return CATALOGO.filter(g => g.ready && slugDeRuta(g.path) && disponibleEn(slugDeRuta(g.path), lang))
}

export function pasoPara(n) {
  if (n <= 2) return 1
  let paso = Math.max(1, Math.round(n * 0.382))
  while (mcd(paso, n) !== 1) paso++
  return paso
}

// → la entrada del catálogo ({ title, titleEn, subtitle, emoji, path… }) más
//   su `slug`, o null si no hay ninguno (no pasa con el catálogo real).
export function juegoDelDia(lang = 'es', fecha = new Date()) {
  const lista = juegosDelDiaPosibles(lang)
  if (lista.length === 0) return null
  const juego = lista[(numeroDeDia(fecha) * pasoPara(lista.length)) % lista.length]
  return { ...juego, slug: slugDeRuta(juego.path) }
}
