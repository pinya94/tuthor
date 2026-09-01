// Bajo el Microscopio (biología · la célula) — tocar el orgánulo que se pide
// sobre el dibujo de una célula animal o vegetal.
//
// Lógica pura, sin React. Dos formas de preguntar, que no son adorno:
//   · por NOMBRE    ("toca la mitocondria") — reconocer el dibujo
//   · por FUNCIÓN   ("toca el que saca energía de los nutrientes") — que es lo
//     que de verdad se pregunta en un examen, y lo que obliga a saber para qué
//     sirve cada parte y no solo dónde cae en el esquema.
//
// El tipo de célula se sortea en cada ronda a propósito: así aparecen mezcladas
// las dos y el alumno tiene que fijarse en si lo que le piden EXISTE en la que
// le ha tocado. Preguntar por un cloroplasto en una célula animal no tendría
// respuesta, así que genRound solo elige entre los orgánulos de esa célula.

import { ORGANULOS, organulosDe } from '../data/organulos'

const TIPOS = ['animal', 'vegetal']

export const MODOS = {
  nombre: { label: { es: 'Por su nombre', en: 'By name', ca: 'Pel seu nom' } },
  funcion: { label: { es: 'Por su función', en: 'By function', ca: 'Per la seva funció' } },
  mixto: { label: { es: 'Mezclado', en: 'Mixed', ca: 'Barrejat' } },
}

const elegir = (arr, rand) => arr[Math.floor(rand() * arr.length)]

// `evitar` son los ids de las últimas rondas. Con 13 orgánulos y 10 u 11
// dibujados por célula, sin memoria se repite constantemente.
export function genRound(modo = 'mixto', { rand = Math.random, evitar = [] } = {}) {
  const tipo = elegir(TIPOS, rand)
  const pool = organulosDe(tipo)
  const frescos = pool.filter(o => !evitar.includes(o.id))
  const org = elegir(frescos.length ? frescos : pool, rand)
  const preguntaPor = modo === 'mixto' ? elegir(['nombre', 'funcion'], rand) : modo
  return { tipo, organulo: org, preguntaPor }
}

export const esCorrecta = (round, id) => round?.organulo.id === id

// El enunciado de la ronda, ya resuelto al idioma.
export function enunciado(round, l) {
  const o = round.organulo
  return round.preguntaPor === 'nombre'
    ? (o.nombre[l] ?? o.nombre.es)
    : (o.funcion[l] ?? o.funcion.es)
}

// Cuántos orgánulos hay en total, para la ficha y los textos de la intro.
export const TOTAL_ORGANULOS = ORGANULOS.length
