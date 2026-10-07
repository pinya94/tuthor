import { describe, it, expect } from 'vitest'
import * as cond from '../../data/inglesGrammarConditionals'
import * as mod from '../../data/inglesGrammarModals'

const L = ['es', 'en', 'ca']

describe.each([['conditionals', cond, 'PREGUNTAS_ESO'], ['modals', mod, 'PREGUNTAS_PRIMARIA']])('English · %s', (_, b, basico) => {
  it('24 preguntas, cuatro opciones distintas, la buena la primera, todo en inglés igual en los tres idiomas', () => {
    expect(b.PREGUNTAS).toHaveLength(24)
    expect(b[basico].length).toBeGreaterThanOrEqual(10)
    expect(new Set(b.PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of b.PREGUNTAS) {
      for (const l of L) {
        expect(p.opciones[l]).toHaveLength(4)
        expect(new Set(p.opciones[l]).size).toBe(4)
        expect(p.correcta[l]).toBe(p.opciones[l][0])
      }
      // material en inglés: no se traduce
      expect(p.opciones.es).toEqual(p.opciones.en)
      expect(p.pregunta.es).toBe(p.pregunta.en)
    }
  })
})
