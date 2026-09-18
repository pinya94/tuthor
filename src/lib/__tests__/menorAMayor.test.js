import { describe, it, expect } from 'vitest'
import { nuevoMazo, posicionCorrecta, decimalExacto, DIFICULTADES } from '../menorAMayor'

describe('menorAMayor', () => {
  it('posicionCorrecta inserta manteniendo el orden ascendente', () => {
    const recta = [{ valor: 0.25 }, { valor: 0.5 }, { valor: 0.95 }]
    expect(posicionCorrecta({ valor: 0.1 }, recta)).toBe(0)   // el menor, al principio
    expect(posicionCorrecta({ valor: 0.42 }, recta)).toBe(1)  // entre 0,25 y 0,5
    expect(posicionCorrecta({ valor: 0.7 }, recta)).toBe(2)   // entre 0,5 y 0,95
    expect(posicionCorrecta({ valor: 2 }, recta)).toBe(3)     // el mayor, al final
    expect(posicionCorrecta({ valor: 0.3 }, [])).toBe(0)      // recta vacía
  })

  it('decimalExacto usa coma y marca los no exactos con ≈', () => {
    expect(decimalExacto(0.75)).toBe('0,75')
    expect(decimalExacto(0.5)).toBe('0,5')
    expect(decimalExacto(3)).toBe('3')
    expect(decimalExacto(-0.25)).toBe('−0,25')      // signo menos U+2212
    expect(decimalExacto(1 / 3)).toBe('≈ 0,33')     // periódico → aproximado
  })

  for (const dif of Object.keys(DIFICULTADES)) {
    it(`nuevoMazo(${dif}) da cartas con valores distintos y separados`, () => {
      const mazo = nuevoMazo(dif, 12)
      expect(mazo.length).toBe(12)
      const gap = DIFICULTADES[dif].gap
      const valores = mazo.map(c => c.valor).sort((a, b) => a - b)
      for (let i = 1; i < valores.length; i++) {
        expect(Math.abs(valores[i] - valores[i - 1])).toBeGreaterThanOrEqual(gap)
      }
      // cada carta trae lo que necesita el tablero
      for (const c of mazo) {
        expect(typeof c.expr).toBe('string')
        expect(typeof c.decimal).toBe('string')
        expect(Number.isFinite(c.valor)).toBe(true)
        expect(c.id).toBeTruthy()
      }
    })
  }
})
