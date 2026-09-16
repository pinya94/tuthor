// ── Las cifras del catálogo, derivadas ───────────────────────────────────────
// Cuántos juegos y cuántos exámenes hay, calculado de los registros en vez de
// escrito a mano.
//
// El motivo es una cicatriz: la landing anunciaba "34 juegos y 110 exámenes"
// en dos sitios distintos y un comentario del código hablaba de 32, cuando ya
// eran 38 y 137. Nadie miente a propósito — es que un número escrito en el
// copy no tiene forma de enterarse de que se ha añadido un juego. Así que o
// no se dan cifras, o se derivan. Esto es lo segundo.
//
// Qué se cuenta, y por qué así:
//
//   · JUEGOS — las tarjetas del catálogo visual (data/constants.js), no las
//     claves de lib/games.js. Ese registro tiene 41 ids porque algunos juegos
//     guardan stats por modo (Acércate clásico y roguelike son dos ids y una
//     sola página). Lo que un visitante puede contar con el dedo son las
//     tarjetas, que es lo que promete la cifra.
//   · EXÁMENES — las entradas vivas de lib/exams.js. Las `retired` quedan
//     fuera: existen solo para etiquetar stats antiguas y no se pueden jugar,
//     así que contarlas sería inflar el número.

import { GAMES as CATALOGO } from '../data/constants'
import { EXAMS } from './exams'

export const NUM_JUEGOS = CATALOGO.filter(g => g.ready !== false).length

export const NUM_EXAMENES = Object.values(EXAMS).filter(e => !e.retired).length

// Redondeo a la baja a la decena para el copy de venta ("más de 130
// exámenes"): una cifra redonda envejece mejor que una exacta y sigue siendo
// cierta mientras el catálogo solo crezca. La exacta se usa donde se está
// enumerando de verdad.
export function masDe(n) {
  return Math.floor(n / 10) * 10
}
