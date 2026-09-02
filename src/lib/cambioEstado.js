// Cambio de Estado (química · estados de la materia) — lógica pura, sin React.
//
// UNA sola mecánica en el juego: sustancia + temperatura → ¿sólido, líquido o
// gas? El error que persigue es "sólido = frío, gas = caliente". El estado no
// depende de si una temperatura nos parece alta a NOSOTROS, sino de dónde cae
// respecto a los puntos de ESA sustancia: el hierro a 1000 °C sigue siendo
// sólido y el oxígeno a 20 °C ya es gas. Por eso las temperaturas se eligen a
// propósito entre las que suenan contradictorias.
//
// Los puntos de fusión y ebullición se ven en los dos primeros niveles: ahí no
// es un juego de memorizar temperaturas, es de saber leerlas. El nivel difícil
// los tapa, y entonces sí pide conocer la sustancia — por eso ese nivel solo
// pregunta por las CONOCIDAS y enseña los números al corregir.
//
// Las temperaturas se sortean en cada ronda, así que dos partidas seguidas no
// se parecen ni con la misma sustancia.
//
// El vocabulario de los cambios (fusión, condensación, sublimación…) NO está
// en el juego a propósito: es otra mecánica y mezclarlas en la misma partida
// la vuelve confusa. Vive en su propio examen, y `genRoundCambio` de abajo es
// lo que lo alimenta.

import { SUSTANCIAS, CAMBIOS, ESTADOS, CONOCIDAS } from '../data/sustancias'

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

// ¿Se puede preguntar por esta sustancia en este estado, en este nivel? No
// todas valen para los tres:
//   · el helio se funde a −272 °C, a un grado del cero absoluto: no queda
//     hueco para una temperatura sólida (de hecho, a presión normal el helio
//     NO llega a solidificar nunca);
//   · el nitrógeno o el helio tienen la franja líquida tan estrecha que no
//     admite margen a los dos lados.
// Sin esta comprobación el generador producía temperaturas por debajo del cero
// absoluto — lo cazó el test de invariantes, no la vista.
//
// rangoMin es lo que de verdad separa los niveles en el estado líquido: en una
// franja de 14 grados (el nitrógeno) no cabe ningún margen holgado, así que las
// sustancias así se reservan para medio y en fácil solo salen como sólido o
// gas. Sin esto, fácil y medio eran el mismo juego con otro nombre — y también
// lo cazó el test, no la vista.
function puedeEstar(s, estado, rangoMin = 0) {
  if (estado === 'solido') return s.fusion - MARGEN > CERO_ABSOLUTO
  if (estado === 'liquido') return s.ebullicion - s.fusion > Math.max(2 * MARGEN, rangoMin)
  return true
}

// Los tres niveles. Lo que cambia entre ellos NO es la regla —siempre es la
// misma comparación—, sino cuánto ayuda el enunciado:
//
//   holgura  franja del rango líquido que se descarta a cada lado. Con 0.30 la
//            temperatura cae en el centro (agua a 50 °C); con 0.05 puede caer
//            pegada al punto (agua a 96 °C), que es donde se falla.
//   fuera    grados de separación mínimos por debajo de la fusión o por encima
//            de la ebullición, para lo mismo fuera del rango líquido.
//   ocultar  tapa los dos puntos: hay que conocer la sustancia.
//   soloConocidas  restringe el sorteo a las de CONOCIDAS.
//   rangoMin franja líquida mínima para que la sustancia entre en el sorteo
//            como líquido (ver puedeEstar).
export const DIFICULTADES = {
  facil:   { holgura: 0.30, fuera: 60, rangoMin: 40, ocultar: false, soloConocidas: false },
  medio:   { holgura: 0.05, fuera: MARGEN, rangoMin: 0, ocultar: false, soloConocidas: false },
  dificil: { holgura: 0.25, fuera: 40, rangoMin: 40, ocultar: true, soloConocidas: true },
}
const DIF_POR_DEFECTO = 'medio'

// Las listas de cada nivel se calculan una vez al cargar: son fijas, no hay por
// qué rehacerlas en cada ronda.
const POOL = Object.fromEntries(Object.entries(DIFICULTADES).map(([clave, d]) => [clave,
  Object.fromEntries(ESTADO_IDS.map(estado => [estado, SUSTANCIAS.filter(s =>
    puedeEstar(s, estado, d.rangoMin) && (!d.soloConocidas || CONOCIDAS.has(s.id)))])),
]))

function tempPara(s, estado, dif, rand) {
  if (estado === 'liquido') {
    const rango = s.ebullicion - s.fusion
    // El margen nunca puede comerse el rango entero: como puedeEstar() ya
    // garantiza rango > 2·MARGEN, la mitad del rango siempre deja hueco.
    const m = Math.min(Math.max(MARGEN, Math.round(dif.holgura * rango)), Math.floor(rango / 2))
    return entero(s.fusion + m, s.ebullicion - m, rand)
  }
  if (estado === 'solido') {
    // El suelo es lo que impide bajar del cero absoluto; si el margen del
    // nivel no cabe por encima de él, manda el suelo.
    const suelo = Math.max(s.fusion - 300, CERO_ABSOLUTO + 1)
    return entero(suelo, Math.max(suelo, s.fusion - dif.fuera), rand)
  }
  const suelo = s.ebullicion + dif.fuera
  return entero(suelo, suelo + 300, rand)
}

// La ronda del juego y del examen de estados: una sustancia, una temperatura y
// —salvo en difícil— sus dos puntos a la vista.
export function genRound({ dificultad = DIF_POR_DEFECTO, rand = Math.random, evitar = [] } = {}) {
  // Una dificultad que no existe cae al nivel por defecto en vez de reventar:
  // la clave viene de la URL del examen y de la pantalla del juego.
  const clave = DIFICULTADES[dificultad] ? dificultad : DIF_POR_DEFECTO
  const dif = DIFICULTADES[clave]
  const estado = elegir(ESTADO_IDS, rand)
  const pool = POOL[clave][estado]
  const frescas = pool.filter(s => !evitar.includes(s.id))
  const s = elegir(frescas.length ? frescas : pool, rand)
  const temp = tempPara(s, estado, dif, rand)
  // ocultar viaja DENTRO de la ronda para que quien la pinta —el juego o el
  // examen— no tenga que saber en qué nivel está.
  return { tipo: 'estado', sustancia: s, temp, id: s.id, ocultar: dif.ocultar, respuesta: estadoA(s, temp) }
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
