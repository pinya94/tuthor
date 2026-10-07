import { describe, it, expect } from 'vitest'
import { PREGUNTAS, PREGUNTAS_ESO } from '../../data/constitucion'

const L = ['es', 'en', 'ca']

describe('La Constitución y el Estado · banco', () => {
  it('24 preguntas en tres idiomas, cuatro opciones distintas y la buena la primera', () => {
    expect(PREGUNTAS).toHaveLength(24)
    expect(PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(10)
    expect(new Set(PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of PREGUNTAS) for (const l of L) {
      expect(p.opciones[l]).toHaveLength(4)
      expect(new Set(p.opciones[l]).size).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
      expect(p.pregunta[l] && p.explicacion[l]).toBeTruthy()
    }
  })
})
