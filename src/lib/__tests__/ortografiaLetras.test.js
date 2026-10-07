import { describe, it, expect } from 'vitest'
import { PREGUNTAS, PREGUNTAS_PRIMARIA } from '../../data/espanolOrtografiaLetras'

const L = ['es', 'en', 'ca']

describe('Ortografía H, LL/Y y C/Z · banco', () => {
  it('24 preguntas, cuatro opciones distintas y la buena entre ellas, en tres idiomas', () => {
    expect(PREGUNTAS).toHaveLength(24)
    expect(PREGUNTAS_PRIMARIA.length).toBeGreaterThanOrEqual(10)
    expect(new Set(PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of PREGUNTAS) for (const l of L) {
      expect(p.opciones[l], p.id).toHaveLength(4)
      expect(new Set(p.opciones[l]), p.id).toHaveProperty('size', 4)
      expect(p.opciones[l], p.id).toContain(p.correcta[l])
    }
  })
})
