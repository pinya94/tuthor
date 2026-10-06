import { describe, it, expect } from 'vitest'
import * as esteq from '../../data/estequiometria'
import * as dina from '../../data/dinamica'

const L = ['es', 'en', 'ca']
const num = s => Number(String(s).replace(/\s/g, '').replace(',', '.').match(/\d[\d.]*/)?.[0])

describe.each([['estequiometria', esteq], ['dinamica', dina]])('banco %s', (_, b) => {
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

// Las cuentas, rehechas aparte: si alguien toca un dato del enunciado sin
// cambiar la respuesta, falla aquí.
const buena = (b, id) => num(b.PREGUNTAS.find(p => p.id === id).correcta.es)
const cerca = (a, b) => expect(Math.abs(a - b)).toBeLessThan(0.006 * Math.max(1, Math.abs(b)))

describe('cuentas de estequiometría', () => {
  const M = { H: 1, C: 12, O: 16, Na: 23, Cl: 35.5, Ca: 40 }
  it('salen de los datos', () => {
    cerca(buena(esteq, 'eq-02'), 2 * M.H + M.O)
    cerca(buena(esteq, 'eq-03'), 88 / (M.C + 2 * M.O))
    cerca(buena(esteq, 'eq-08'), 20 / 0.5)
    cerca(buena(esteq, 'eq-10'), 0.5 * (M.Na + M.Cl))
    cerca(buena(esteq, 'eq-12'), 0.2 / 0.5)
    cerca(buena(esteq, 'eq-13'), 0.082 * 273)
    cerca(buena(esteq, 'eq-14'), 2 * 0.082 * (27 + 273) / 10)
    cerca(buena(esteq, 'eq-16'), M.C + 2 * M.O) // 1 mol de CaCO₃ → 1 mol de CO₂
    expect(M.Ca + M.C + 3 * M.O).toBe(100)
    cerca(buena(esteq, 'eq-17'), 40 / 50 * 100)
    cerca(buena(esteq, 'eq-18'), 200 * 0.75 / 100)
    cerca(buena(esteq, 'eq-20'), 0.1 * 2 / 0.5)
    cerca(buena(esteq, 'eq-21'), 3 / 5 * 10)
    cerca(buena(esteq, 'eq-22'), 16 / (M.C + 4 * M.H) * 2 * 2 * M.O)
    cerca(buena(esteq, 'eq-23'), 4 * 8)
    cerca(buena(esteq, 'eq-24'), 1 / (1 + 9))
    // fórmula empírica: 75 % C y 25 % H → 1 C : 4 H
    expect((25 / M.H) / (75 / M.C)).toBe(4)
  })
})

describe('cuentas de dinámica', () => {
  const g = 10, rad = d => d * Math.PI / 180
  it('salen de los datos', () => {
    cerca(buena(dina, 'di-02'), 6 / 2)
    cerca(buena(dina, 'di-04'), 5 * 9.8)
    cerca(buena(dina, 'di-06'), Math.hypot(3, 4))
    cerca(buena(dina, 'di-07'), 0.2 * 50)
    cerca(buena(dina, 'di-09'), (50 - 20) / 10)
    cerca(buena(dina, 'di-11'), g * Math.sin(rad(30)))
    cerca(buena(dina, 'di-12'), 4 * g * Math.cos(rad(60)))
    cerca(buena(dina, 'di-13'), 2 * 3)
    cerca(buena(dina, 'di-14'), 60 * 2 / 40)
    cerca(buena(dina, 'di-15'), 20 * 0.5)
    cerca(buena(dina, 'di-16'), 1 * 4 ** 2 / 2)
    cerca(buena(dina, 'di-20'), 3 * g)
    cerca(buena(dina, 'di-21'), 50 * (g + 2))
    cerca(buena(dina, 'di-22'), 10 / (2 + 3))
    cerca(buena(dina, 'di-23'), 3 * 10 / (2 + 3))
  })
})
