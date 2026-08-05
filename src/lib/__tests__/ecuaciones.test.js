// Invariantes del pool de la Átomos en Equilibrio. Cazan la clase de bug que
// el build no ve: una reacción mal escrita (no cuadra) o con coeficientes que no
// son la forma mínima, o una respuesta que el stepper no puede alcanzar.
import { describe, it, expect } from 'vitest'
import { allRounds, isCorrectCoefs, isBalanced, parseFormula, genRound } from '../ecuaciones.js'

describe('parseFormula', () => {
  it('cuenta átomos de fórmulas sin paréntesis', () => {
    expect(parseFormula('H2O')).toEqual({ H: 2, O: 1 })
    expect(parseFormula('C6H12O6')).toEqual({ C: 6, H: 12, O: 6 })
    expect(parseFormula('C2H5OH')).toEqual({ C: 2, H: 6, O: 1 })
    expect(parseFormula('NaCl')).toEqual({ Na: 1, Cl: 1 })
    expect(parseFormula('Fe2O3')).toEqual({ Fe: 2, O: 3 })
  })
})

describe('pool de ecuaciones (directas e inversas)', () => {
  const rounds = allRounds()

  it('hay un pool razonable de rondas', () => {
    expect(rounds.length).toBeGreaterThan(50)
  })

  it.each(rounds.map((r, i) => [i, r]))('ronda %i está equilibrada, es mínima y alcanzable', (_i, r) => {
    const eq = `${r.left.map(s => s.f).join('+')}->${r.right.map(s => s.f).join('+')}`
    // La respuesta oficial equilibra de verdad y en forma mínima (mcd 1).
    expect(isBalanced(r, r.answer), `${eq}: la respuesta no equilibra`).toBe(true)
    expect(isCorrectCoefs(r, r.answer), `${eq}: la respuesta no es la forma mínima`).toBe(true)
    // Todos los coeficientes correctos caben en el rango del stepper (1..maxCoef).
    for (const c of r.answer) {
      expect(c, `${eq}: coeficiente ${c} > maxCoef ${r.maxCoef}`).toBeLessThanOrEqual(r.maxCoef)
      expect(c).toBeGreaterThanOrEqual(1)
    }
    // El estado inicial (todo a 1) no debe considerarse ya resuelto salvo que la
    // respuesta sea realmente todo unos (reacciones triviales tipo C+O2->CO2).
    const allOnes = r.answer.every(c => c === 1)
    if (!allOnes) expect(isCorrectCoefs(r, r.initial), `${eq}: arranca ya resuelta`).toBe(false)
  })

  it('genRound produce rondas resolubles en las tres dificultades', () => {
    let seed = 1
    const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
    for (const diff of ['facil', 'medio', 'dificil']) {
      for (let n = 0; n < 60; n++) {
        const r = genRound(diff, rand)
        expect(isCorrectCoefs(r, r.answer), `${diff}: ronda no resoluble`).toBe(true)
        expect(r.initial.length).toBe(r.left.length + r.right.length)
      }
    }
  })
})
