// ¿Por Qué Pasó?: causas y consecuencias de hechos históricos, en plan juego
// rápido. Sale un hecho y una pieza (o 2 o 3, según el nivel) y se toca:
// Causa, Consecuencia o No tiene que ver.
//
//   facil    1 pieza por ronda
//   medio    2 piezas
//   dificil  3 piezas
//
// Una pieza «no tiene que ver» (intrusa) sale de un hecho de otro tema y
// separado al menos SEPARACION años, para que no pueda valer (la IGM y el crac
// del 29 nunca se cruzan: Versalles es consecuencia de uno y causa del otro).
// Como mucho una intrusa por ronda, y siempre al menos una pieza del hecho.
// Cada hecho tiene 5 causas y 5 consecuencias: al repetirse, cambian las piezas.
import { HECHOS } from '../data/causasHistoria.js'

export { HECHOS }
export const SEPARACION = 300
export const NIVELES = { facil: {}, medio: {}, dificil: {} }
export const PIEZAS = { facil: 1, medio: 2, dificil: 3 }
export const PROB_INTRUSA = 0.3
export const TEMAS = [...new Set(HECHOS.map(h => h.tema))]
export const hecho = id => HECHOS.find(h => h.id === id)

const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]
const baraja = (arr, rand) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

export const compatibles = (a, b) => a.id !== b.id && a.tema !== b.tema && Math.abs(a.año - b.año) >= SEPARACION

// Todas las piezas propias de un hecho: id «hecho:c:0» (causa) o «hecho:q:1»
const propias = h => [
  ...h.causas.map((texto, i) => ({ id: `${h.id}:c:${i}`, hecho: h.id, tipo: 'c', texto })),
  ...h.consecuencias.map((texto, i) => ({ id: `${h.id}:q:${i}`, hecho: h.id, tipo: 'q', texto })),
]
function intrusa(h, rand) {
  const o = elige(rand, HECHOS.filter(x => compatibles(h, x)))
  const tipo = rand() < 0.5 ? 'causas' : 'consecuencias', i = Math.floor(rand() * o[tipo].length)
  return { id: `${o.id}:${tipo[0]}:${i}:x`, hecho: null, de: o.id, tipo: 'x', texto: o[tipo][i] }
}

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random, tema = null } = {}) {
  const pool = tema && TEMAS.includes(tema) ? HECHOS.filter(h => h.tema === tema) : HECHOS
  let h = elige(rand, pool)
  for (let k = 0; k < 10 && recientes.includes(h.id) && pool.length > 2; k++) h = elige(rand, pool)
  recientes.push(h.id); if (recientes.length > 6) recientes.shift()
  const n = PIEZAS[nivel] ?? 1
  const mias = baraja(propias(h), rand)
  const piezas = []
  let conIntrusa = false
  for (let i = 0; i < n; i++) {
    // la intrusa nunca es la única pieza propia que falta: siempre hay al menos una del hecho
    const puede = !conIntrusa && (n === 1 ? true : i > 0 || piezas.length > 0)
    if (puede && rand() < PROB_INTRUSA) { piezas.push(intrusa(h, rand)); conIntrusa = true } else piezas.push(mias.pop())
  }
  return { id: `${nivel}:${h.id}:${piezas.map(p => p.id).join('|')}`, nivel, hecho: h.id, piezas: baraja(piezas, rand) }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuesta: { [piezaId]: 'c' | 'q' | 'x' } (x = no tiene que ver)
export const casilla = p => p.tipo
export function esCorrecta(r, resp) {
  if (!resp) return false
  return r.piezas.every(p => resp[p.id] === p.tipo)
}

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export function explicacion(r, l) {
  return s(l,
    'Causa: pasó antes y ayudó a provocarlo. Consecuencia: vino después, por su culpa. Si es de otra época, no tiene que ver.',
    'Cause: it happened before and helped bring it about. Consequence: it came after, because of it. If it is from another time, it is not related.',
    'Causa: va passar abans i va ajudar a provocar-lo. Conseqüència: va venir després, per culpa seva. Si és d’una altra època, no hi té res a veure.')
}

// Examen tipo test (schema): «¿Cuál fue una causa / consecuencia de X?»
export function schemaQuestion(r, l) {
  const h = hecho(r.hecho)
  const tipo = r.piezas.find(p => p.tipo !== 'x')?.tipo ?? 'c'
  const buena = (tipo === 'c' ? h.causas : h.consecuencias)[0][l]
  const malas = [...(tipo === 'c' ? h.consecuencias : h.causas).slice(0, 2).map(t => t[l]),
    elige(Math.random, HECHOS.filter(x => compatibles(h, x))).causas[0][l]]
  const question = tipo === 'c'
    ? s(l, `¿Cuál fue una causa de: ${h.titulo.es}?`, `Which was a cause of: ${h.titulo.en}?`, `Quina va ser una causa de: ${h.titulo.ca}?`)
    : s(l, `¿Cuál fue una consecuencia de: ${h.titulo.es}?`, `Which was a consequence of: ${h.titulo.en}?`, `Quina va ser una conseqüència de: ${h.titulo.ca}?`)
  return { question, correctAnswer: buena, wrongAnswers: malas }
}
