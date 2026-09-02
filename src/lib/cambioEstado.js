// Cambio de Estado (química · estados de la materia) — lógica pura, sin React.
//
// UNA sola mecánica en el juego: sustancia + temperatura → ¿sólido, líquido o
// gas? El error que persigue es "sólido = frío, gas = caliente". El estado no
// depende de si una temperatura nos parece alta a NOSOTROS, sino de dónde cae
// respecto a los puntos de ESA sustancia: el hierro a 1000 °C sigue siendo
// sólido y el oxígeno a 20 °C ya es gas. Por eso las temperaturas se eligen a
// propósito entre las que suenan contradictorias.
//
// Los puntos de fusión y ebullición se muestran SIEMPRE. No es un juego de
// memorizar temperaturas: es de saber leerlas.
//
// El vocabulario de los cambios (fusión, condensación, sublimación…) NO está
// en el juego a propósito: es otra mecánica y mezclarlas en la misma partida
// la vuelve confusa. Vive en su propio examen, y `genRoundCambio` de abajo es
// lo que lo alimenta.

import { SUSTANCIAS, CAMBIOS, ESTADOS } from '../data/sustancias'

export const ESTADO_IDS = Object.keys(ESTADOS)

export function estadoA(sustancia, temp) {
  if (temp < sustancia.fusion) return 'solido'
  if (temp < sustancia.ebullicion) return 'liquido'
  return 'gas'
}

const elegir = (arr, rand) => arr[Math.floor(rand() * arr.length)]
const entero = (min, max, rand) => Math.round(min + rand() * (max - min))

// Margen a los dos lados del punto: a 0 °C exactos el agua está CAMBIANDO de
// estado, no "en" uno, así que preguntarlo sería una trampa y no una pregunta.
const MARGEN = 5
const CERO_ABSOLUTO = -273

// ¿Se puede preguntar por esta sustancia en este estado? No todas valen para
// los tres:
//   · el helio se funde a −272 °C, a un grado del cero absoluto: no queda
//     hueco para una temperatura sólida (de hecho, a presión normal el helio
//     NO llega a solidificar nunca);
//   · el nitrógeno o el helio tienen la franja líquida tan estrecha que no
//     admite margen a los dos lados.
// Sin esta comprobación el generador producía temperaturas por debajo del cero
// absoluto — lo cazó el test de invariantes, no la vista.
function puedeEstar(s, estado) {
  if (estado === 'solido') return s.fusion - MARGEN > CERO_ABSOLUTO
  if (estado === 'liquido') return s.ebullicion - s.fusion > 2 * MARGEN
  return true
}

const POOL = {
  solido: SUSTANCIAS.filter(s => puedeEstar(s, 'solido')),
  liquido: SUSTANCIAS.filter(s => puedeEstar(s, 'liquido')),
  gas: SUSTANCIAS,
}

function tempPara(s, estado, rand) {
  if (estado === 'solido') return entero(Math.max(s.fusion - 300, CERO_ABSOLUTO + 1), s.fusion - MARGEN, rand)
  if (estado === 'liquido') return entero(s.fusion + MARGEN, s.ebullicion - MARGEN, rand)
  return entero(s.ebullicion + MARGEN, s.ebullicion + 300, rand)
}

// La ronda del juego y del examen de estados: una sustancia, una temperatura
// y sus dos puntos a la vista.
export function genRound({ rand = Math.random, evitar = [] } = {}) {
  const estado = elegir(ESTADO_IDS, rand)
  const pool = POOL[estado]
  const frescas = pool.filter(s => !evitar.includes(s.id))
  const s = elegir(frescas.length ? frescas : pool, rand)
  const temp = tempPara(s, estado, rand)
  return { tipo: 'estado', sustancia: s, temp, id: s.id, respuesta: estadoA(s, temp) }
}

// La ronda del examen de nombres: una escena cotidiana → cómo se llama ese
// cambio. Solo la usa el examen; el juego no la toca.
export function genRoundCambio({ rand = Math.random, evitar = [] } = {}) {
  const frescos = CAMBIOS.filter(c => !evitar.includes(c.id))
  const c = elegir(frescos.length ? frescos : CAMBIOS, rand)
  return { tipo: 'cambio', cambio: c, id: c.id, respuesta: c.id }
}

export const esCorrecta = (round, r) => round?.respuesta === r

// Opciones que se ofrecen en una ronda de 'cambio': la correcta y tres más,
// siempre las mismas seis barajadas para que no se pueda descartar por
// eliminación de las que "no salen nunca".
export function opcionesCambio(round, rand = Math.random) {
  const otras = CAMBIOS.filter(c => c.id !== round.cambio.id)
  const elegidas = [...otras].sort(() => rand() - 0.5).slice(0, 3)
  return [round.cambio, ...elegidas].sort(() => rand() - 0.5)
}
