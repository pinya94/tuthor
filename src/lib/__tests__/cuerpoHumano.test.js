import { describe, it, expect } from 'vitest'
import { PREGUNTAS_ESO, PREGUNTAS_PRIMARIA } from '../../data/cuerpoHumano'

const L = ['es', 'en', 'ca']

describe('Cuerpo humano · banco completo (con la ampliación de aparatos)', () => {
  it('ids únicos, cuatro opciones distintas y la buena entre ellas, en tres idiomas', () => {
    expect(new Set(PREGUNTAS_ESO.map(p => p.id)).size).toBe(PREGUNTAS_ESO.length)
    expect(PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(55)
    expect(PREGUNTAS_PRIMARIA.length).toBeGreaterThanOrEqual(20)
    for (const p of PREGUNTAS_ESO) for (const l of L) {
      expect(p.opciones[l], p.id).toHaveLength(4)
      expect(new Set(p.opciones[l]).size, p.id).toBe(4)
      expect(p.opciones[l], p.id).toContain(p.correcta[l])
      expect(p.pregunta[l] && p.explicacion[l], p.id).toBeTruthy()
    }
  })
  it('cubre los aparatos que faltaban', () => {
    for (const pre of ['ce-', 'cl-', 'cen-', 'crp-', 'cs-']) expect(PREGUNTAS_ESO.some(p => p.id.startsWith(pre)), pre).toBe(true)
  })
})
