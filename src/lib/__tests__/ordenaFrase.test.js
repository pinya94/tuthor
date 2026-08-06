// Invariantes de Ordena la Frase: toda ronda es resoluble (el orden correcto
// se puede formar con las fichas que se dan), nunca sale ya ordenada, y las
// alternativas aceptadas son coherentes. Cazan patrones mal construidos, que
// en un juego de idiomas se traducen en enseñar inglés incorrecto.
import { describe, it, expect } from 'vitest'
import { genRound, isCorrectOrder, sentenceText } from '../ordenaFrase.js'

function seededRand(seed) {
  let s = seed
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
}

const NIVELES = ['facil', 'medio', 'dificil']
const sorted = a => [...a].map(t => t.toLowerCase()).sort()

describe('genRound', () => {
  it('las fichas son exactamente las palabras de la solución, en los 3 niveles', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 17 + 5)
      for (let n = 0; n < 200; n++) {
        const r = genRound(level, rand)
        // Se puede formar la solución con las fichas dadas (mismo multiconjunto)
        expect(sorted(r.chips), `${level}/${r.id}: fichas ≠ solución`).toEqual(sorted(r.solution))
        // Y toda alternativa aceptada usa esas mismas fichas
        for (const ans of r.answers) {
          expect(sorted(ans), `${level}/${r.id}: alternativa con otras palabras`).toEqual(sorted(r.chips))
        }
      }
    }
  })

  it('nunca se entrega ya ordenada', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 31 + 7)
      for (let n = 0; n < 200; n++) {
        const r = genRound(level, rand)
        expect(isCorrectOrder(r, r.chips), `${level}/${r.id}: sale resuelta`).toBe(false)
      }
    }
  })

  it('la solución se acepta y una permutación cualquiera no', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 11 + 3)
      for (let n = 0; n < 120; n++) {
        const r = genRound(level, rand)
        for (const ans of r.answers) {
          expect(isCorrectOrder(r, ans), `${level}/${r.id}: no acepta su propia solución`).toBe(true)
        }
        // Invertir la solución no debe colar (salvo que sea una alternativa real)
        const inv = [...r.solution].reverse()
        if (!r.answers.some(a => a.join(' ') === inv.join(' '))) {
          expect(isCorrectOrder(r, inv), `${level}/${r.id}: acepta el orden invertido`).toBe(false)
        }
      }
    }
  })

  it('toda ronda trae su regla en los tres idiomas', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 23 + 9)
      for (let n = 0; n < 60; n++) {
        const r = genRound(level, rand)
        for (const l of ['es', 'en', 'ca']) {
          expect(typeof r.rule[l], `${r.id}: falta la regla en ${l}`).toBe('string')
          expect(r.rule[l].length, `${r.id}: regla vacía en ${l}`).toBeGreaterThan(10)
        }
      }
    }
  })

  it('no genera concordancias imposibles (doesn’t + verbo con -s, etc.)', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 41 + 13)
      for (let n = 0; n < 200; n++) {
        const r = genRound(level, rand)
        const s = r.solution.join(' ').toLowerCase()
        // Tras don't/doesn't y tras do/does el verbo va en infinitivo
        expect(s, `${r.id}: ${s}`).not.toMatch(/\b(don’t|doesn’t|do|does)\s+\w+(s|es)\b/)
        // "She play" / "They plays" nunca en afirmativa. Tras do/does/don't/
        // doesn't el infinitivo SÍ es correcto ("Does he study maths?"), así
        // que ese caso se excluye.
        expect(s, `${r.id}: ${s}`).not.toMatch(/(?<!\b(?:do|does|don’t|doesn’t)\s)\b(she|he)\s+(play|read|watch|eat|drink|study)\b/)
        expect(s, `${r.id}: ${s}`).not.toMatch(/\b(they|we)\s+(plays|reads|watches|eats|drinks|studies)\b/)
      }
    }
  })
})

describe('sentenceText', () => {
  it('pone mayúscula y el signo final que toca', () => {
    expect(sentenceText(['she', 'plays', 'tennis'])).toBe('She plays tennis.')
    expect(sentenceText(['Do', 'you', 'like', 'coffee'])).toBe('Do you like coffee?')
    expect(sentenceText(['Where', 'does', 'she', 'live'])).toBe('Where does she live?')
    expect(sentenceText([])).toBe('')
  })
})
