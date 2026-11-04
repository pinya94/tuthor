import { describe, it, expect } from 'vitest'
import PREGUNTAS, { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../../data/representacionTierra'

const L = ['es', 'en', 'ca']

describe('La representación de la Tierra · banco', () => {
  it('preguntas en tres idiomas, cuatro opciones distintas y la buena la primera', () => {
    expect(PREGUNTAS_PRIMARIA.length).toBeGreaterThanOrEqual(10)
    expect(PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(20)
    expect(new Set(PREGUNTAS.map(p => p.id)).size).toBe(PREGUNTAS.length)
    for (const p of PREGUNTAS) for (const l of L) {
      expect(p.opciones[l], p.id).toHaveLength(4)
      expect(new Set(p.opciones[l]).size, p.id).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
      expect(p.pregunta[l] && p.explicacion[l]).toBeTruthy()
    }
    // En inglés, oeste es W y los decimales van con punto
    for (const p of PREGUNTAS) expect(p.opciones.en.join(' ') + p.explicacion.en, p.id).not.toMatch(/\d° O\b|\d,\d°/)
  })
})
