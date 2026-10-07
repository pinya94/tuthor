import { describe, it, expect } from 'vitest'
import { PREGUNTAS, PREGUNTAS_ESO } from '../../data/trigonometria'

const L = ['es', 'en', 'ca']
const rad = g => g * Math.PI / 180
const num = id => Number(PREGUNTAS.find(p => p.id === id).correcta.es.replace(',', '.').match(/\d+(\.\d+)?/)[0])
const cerca = (a, b) => expect(Math.abs(a - b)).toBeLessThan(0.006 * Math.max(1, Math.abs(b)))

describe('Trigonometría · banco', () => {
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
  it('las cuentas, rehechas con Math', () => {
    cerca(num('tr-03'), 3 / 5)
    cerca(num('tr-08'), 180 / Math.PI)
    cerca(num('tr-09'), 10 * Math.tan(rad(45)))
    cerca(num('tr-10'), 4 * Math.sin(rad(60)))
    cerca(num('tr-11'), Math.sqrt(1 - 0.6 ** 2))
    cerca(num('tr-12'), 20 * Math.tan(rad(30)))
    cerca(num('tr-19'), Math.sqrt(25 + 64 - 2 * 5 * 8 * Math.cos(rad(60))))
    cerca(num('tr-23'), (3 * Math.PI / 4) * 180 / Math.PI)
    cerca(Math.sin(rad(120)), Math.sqrt(3) / 2)
    cerca(Math.sin(rad(150)), 0.5)
    expect(Math.cos(rad(180))).toBeCloseTo(-1)
  })
})
