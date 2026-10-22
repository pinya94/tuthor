import { describe, it, expect } from 'vitest'
import { genRound, answerFromNet, axisBreakdown, componente, makeRng } from '../fuerzaNeta'

const neto = (r, axis) => r.forces.reduce((a, f) => a + componente(f, axis), 0)

describe('Fuerza Neta · física', () => {
  it('una diagonal de 45° empuja 0,71 de su valor en cada eje, no el valor entero', () => {
    expect(componente({ dir: 'NE', mag: 50 }, 'H')).toBeCloseTo(35.36, 1)
    expect(componente({ dir: 'NE', mag: 50 }, 'V')).toBeCloseTo(35.36, 1)
    // 50 N en diagonal arriba-derecha contra 40 N a la izquierda: gana la izquierda
    const r = { forces: [{ dir: 'NE', mag: 50 }, { dir: 'W', mag: 40 }] }
    expect(Math.sign(neto(r, 'H'))).toBe(-1)
    expect(axisBreakdown(r.forces, 'H')).toBe('≈+35 −40 ≈ −5')
  })

  for (const nivel of ['facil', 'medio', 'dificil']) {
    it(`${nivel}: la respuesta es la dirección del neto real, sin casos dudosos`, () => {
      const rand = makeRng(nivel.length * 77)
      for (let i = 0; i < 2000; i++) {
        const r = genRound(nivel, rand)
        const nx = neto(r, 'H'), ny = neto(r, 'V')
        for (const v of [nx, ny]) expect(Math.abs(v) < 1e-9 || Math.abs(v) >= 3).toBe(true)
        expect(answerFromNet(Math.abs(nx) < 1e-9 ? 0 : nx, Math.abs(ny) < 1e-9 ? 0 : ny)).toBe(r.answer)
        expect(r.options).toContain(r.answer)
      }
    })
  }
})
