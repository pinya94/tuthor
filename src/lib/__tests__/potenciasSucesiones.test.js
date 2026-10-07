import { describe, it, expect } from 'vitest'
import * as pot from '../../data/potencias'
import * as suc from '../../data/sucesiones'

const L = ['es', 'en', 'ca']
const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' }

// Evalúa una opción numérica («4,5 · 10⁷», «2⁻³», «1/8», «10 000»); null si no es un número.
function valor(texto) {
  let s = texto.replace(/[€°]/g, '').replace(/(\d) (\d{3})/g, '$1$2').replace(/,/g, '.').replace(/·/g, '*').replace(/−/g, '-').trim()
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, m => '**(' + [...m].map(c => SUP[c]).join('') + ')')
  s = s.replace(/\^\((\d+)\/(\d+)\)/g, '**($1/$2)')
  if (!/^[-\d.*/() ]+$/.test(s)) return null
  try { return Function(`"use strict";return (${s})`)() } catch { return null }
}

describe.each([['potencias', pot, 'PREGUNTAS_PRIMARIA'], ['sucesiones', suc, 'PREGUNTAS_ESO']])('banco de %s', (_, b, basico) => {
  it('24 preguntas en tres idiomas, cuatro opciones distintas y la buena la primera', () => {
    expect(b.PREGUNTAS).toHaveLength(24)
    expect(b[basico].length).toBeGreaterThanOrEqual(10)
    expect(new Set(b.PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of b.PREGUNTAS) for (const l of L) {
      expect(p.opciones[l]).toHaveLength(4)
      expect(new Set(p.opciones[l]).size).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
      expect(p.pregunta[l] && p.explicacion[l]).toBeTruthy()
    }
  })
  it('ninguna opción numérica vale lo mismo que la buena', () => {
    for (const p of b.PREGUNTAS) {
      const vs = p.opciones.es.map(valor)
      if (vs[0] == null) continue
      for (let i = 1; i < 4; i++) if (vs[i] != null) expect(Math.abs(vs[i] - vs[0]), `${p.id}: ${p.opciones.es[i]}`).toBeGreaterThan(1e-9 * Math.max(1, Math.abs(vs[0])))
    }
  })
})

describe('las cuentas, rehechas', () => {
  const bueno = (b, id) => valor(b.PREGUNTAS.find(p => p.id === id).correcta.es)
  it('potencias', () => {
    expect(bueno(pot, 'po-01')).toBe(2 ** 3)
    expect(bueno(pot, 'po-03')).toBe(10 ** 4)
    expect(bueno(pot, 'po-11')).toBe(2 ** 3 * 2 ** 4)
    expect(bueno(pot, 'po-12')).toBe(5 ** 8 / 5 ** 3)
    expect(bueno(pot, 'po-13')).toBe((3 ** 2) ** 4)
    expect(bueno(pot, 'po-14')).toBe(2 ** -3)
    expect(bueno(pot, 'po-15')).toBe((-2) ** 4)
    expect(bueno(pot, 'po-16')).toBeCloseTo(45000000)
    expect(bueno(pot, 'po-17')).toBeCloseTo(0.00032, 10)
    expect(bueno(pot, 'po-18')).toBeCloseTo(3e4 * 2e5)
    expect(bueno(pot, 'po-19')).toBeCloseTo(8e6 / 2e2)
    expect(bueno(pot, 'po-20')).toBe(Math.sqrt(16 * 25))
    expect(bueno(pot, 'po-22')).toBeCloseTo(8 ** (2 / 3))
    const vs = pot.PREGUNTAS.find(p => p.id === 'po-24').opciones.es.map(valor)
    expect(vs[0]).toBe(Math.max(...vs))
  })
  it('sucesiones', () => {
    const arit = (a1, d, n) => a1 + (n - 1) * d
    const geo = (a1, r, n) => a1 * r ** (n - 1)
    expect(bueno(suc, 'su-08')).toBe(arit(4, 3, 10))
    expect(bueno(suc, 'su-10')).toBe(100 * 101 / 2)
    expect(bueno(suc, 'su-11')).toBe(geo(3, 2, 6))
    expect(bueno(suc, 'su-13')).toBe((5 + arit(5, 4, 10)) * 10 / 2)
    expect(bueno(suc, 'su-14')).toBe(2 + 6 + 18 + 54)
    expect(bueno(suc, 'su-15')).toBe(8 / (1 - 1 / 2))
    expect(bueno(suc, 'su-17')).toBeCloseTo(1000 * 1.05 ** 2)
    expect(bueno(suc, 'su-23')).toBe(Math.log2(384 / 3) + 1)
    expect(bueno(suc, 'su-24')).toBe((99 - 7) / 4 + 1)
  })
})
