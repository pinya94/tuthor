// ¿Por Qué Pasó?: causas y consecuencias de hechos históricos. Se clasifican
// piezas como causa o consecuencia de un hecho (datos en data/causasHistoria).
//
//   facil    un hecho, 4 piezas (2 causas y 2 consecuencias)
//   medio    un hecho, sus 6 piezas
//   dificil  dos hechos mezclados (8 piezas): de qué hecho es cada una y si es
//            causa o consecuencia. Los dos hechos se separan al menos SEPARACION
//            años y son de temas distintos, para que ninguna pieza pueda
//            valer para los dos (la IGM y el crac del 29 nunca salen juntos:
//            Versalles es consecuencia de uno y causa del otro).
import { HECHOS } from '../data/causasHistoria.js'

export { HECHOS }
export const SEPARACION = 300
export const NIVELES = { facil: {}, medio: {}, dificil: {} }
export const TEMAS = [...new Set(HECHOS.map(h => h.tema))]
export const hecho = id => HECHOS.find(h => h.id === id)

const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]
const baraja = (arr, rand) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

// Piezas de un hecho: id «hecho:c:0» (causa) o «hecho:q:1» (consecuencia)
function piezas(h, n, rand) {
  const c = baraja([0, 1, 2], rand).slice(0, n).map(i => ({ id: `${h.id}:c:${i}`, hecho: h.id, tipo: 'c', texto: h.causas[i] }))
  const q = baraja([0, 1, 2], rand).slice(0, n).map(i => ({ id: `${h.id}:q:${i}`, hecho: h.id, tipo: 'q', texto: h.consecuencias[i] }))
  return [...c, ...q]
}

export const compatibles = (a, b) => a.id !== b.id && a.tema !== b.tema && Math.abs(a.año - b.año) >= SEPARACION

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random, tema = null } = {}) {
  const pool = tema && TEMAS.includes(tema) ? HECHOS.filter(h => h.tema === tema) : HECHOS
  let h = elige(rand, pool)
  for (let k = 0; k < 10 && recientes.includes(h.id) && pool.length > 2; k++) h = elige(rand, pool)
  recientes.push(h.id); if (recientes.length > 6) recientes.shift()
  if (nivel === 'dificil') {
    const otro = elige(rand, HECHOS.filter(x => compatibles(h, x)))
    const [A, B] = rand() < 0.5 ? [h, otro] : [otro, h]
    return { id: `${nivel}:${A.id}+${B.id}`, nivel, hechos: [A.id, B.id], piezas: baraja([...piezas(A, 2, rand), ...piezas(B, 2, rand)], rand) }
  }
  const n = nivel === 'facil' ? 2 : 3
  return { id: `${nivel}:${h.id}`, nivel, hechos: [h.id], piezas: baraja(piezas(h, n, rand), rand) }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuesta: { [piezaId]: 'A:c' | 'A:q' | 'B:c' | 'B:q' } (A y B = 1.º y 2.º hecho)
export const casilla = (r, p) => `${r.hechos[0] === p.hecho ? 'A' : 'B'}:${p.tipo}`
export function esCorrecta(r, resp) {
  if (!resp) return false
  return r.piezas.every(p => resp[p.id] === casilla(r, p))
}

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export function explicacion(r, l) {
  const base = s(l,
    'Una causa ocurrió antes y ayudó a provocar el hecho; una consecuencia vino después, como resultado de él. Truco: pregúntate «¿esto pasó por culpa del hecho, o el hecho pasó por culpa de esto?».',
    'A cause happened before and helped bring the event about; a consequence came after, as a result of it. Tip: ask yourself «did this happen because of the event, or did the event happen because of this?».',
    'Una causa va passar abans i va ajudar a provocar el fet; una conseqüència va venir després, com a resultat d’ell. Truc: pregunta’t «això va passar per culpa del fet, o el fet va passar per culpa d’això?».')
  if (r.hechos.length < 2) return base
  return base + s(l, ' Con dos hechos, fíjate en las fechas y los nombres de cada pieza.', ' With two events, look at the dates and names in each piece.', ' Amb dos fets, fixa’t en les dates i els noms de cada peça.')
}

// Examen tipo test (schema): «¿Cuál fue una causa / consecuencia de X?»
export function schemaQuestion(r, l) {
  const h = hecho(r.hechos[0])
  const pide = r.piezas.find(p => p.hecho === h.id)
  const buena = pide.texto[l]
  const malas = [...h[pide.tipo === 'c' ? 'consecuencias' : 'causas'].slice(0, 2).map(t => t[l]),
    elige(Math.random, HECHOS.filter(x => compatibles(h, x))).causas[0][l]]
  const question = pide.tipo === 'c'
    ? s(l, `¿Cuál fue una causa de: ${h.titulo.es}?`, `Which was a cause of: ${h.titulo.en}?`, `Quina va ser una causa de: ${h.titulo.ca}?`)
    : s(l, `¿Cuál fue una consecuencia de: ${h.titulo.es}?`, `Which was a consequence of: ${h.titulo.en}?`, `Quina va ser una conseqüència de: ${h.titulo.ca}?`)
  return { question, correctAnswer: buena, wrongAnswers: malas }
}
