import { describe, it, expect } from 'vitest'
import * as antigua from '../../data/filosofiaAntigua'
import * as moderna from '../../data/filosofiaModerna'

const L = ['es', 'en', 'ca']

describe.each([['antigua y medieval', antigua], ['moderna y contemporánea', moderna]])('Filosofía %s · banco', (_, b) => {
  it('24 preguntas en tres idiomas, cuatro opciones distintas y la buena la primera', () => {
    expect(b.PREGUNTAS).toHaveLength(24)
    expect(b.PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(10)
    expect(new Set(b.PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of b.PREGUNTAS) for (const l of L) {
      expect(p.opciones[l]).toHaveLength(4)
      expect(new Set(p.opciones[l]).size).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
      expect(p.pregunta[l] && p.explicacion[l]).toBeTruthy()
    }
  })
})
