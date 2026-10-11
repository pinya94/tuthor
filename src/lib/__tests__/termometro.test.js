import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ESCENAS, MATERIALES, CONCEPTOS, SUSTANCIAS, aK, aF, escalaDe, enunciado, explicacion, textoOpcion, schemaQuestion } from '../termometro'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}]/u // tofu en Windows 10

// Recalcula la respuesta de una ronda sin mirar `bueno`.
function correcta(r) {
  switch (r.tipo) {
    case 'escala': {
      const [de, a] = escalaDe(r)
      const c = de === 'C' ? r.dato : de === 'K' ? r.dato - 273 : ((r.dato - 32) * 5) / 9
      return a === 'C' ? c : a === 'K' ? aK(c) : aF(c)
    }
    case 'mezcla': { const [[m1, t1], [m2, t2]] = r.vasos; return (m1 * t1 + m2 * t2) / (m1 + m2) }
    case 'calor': return r.m * SUSTANCIAS[r.sustancia].c * (r.tf - r.t0)
    default: return r.bueno
  }
}

describe('Termómetro', () => {
  it('conversiones', () => {
    expect(aK(0)).toBe(273)
    expect(aF(100)).toBe(212)
    expect(aF(-40)).toBe(-40)
  })

  it('bancos completos en los tres idiomas y sin emojis prohibidos', () => {
    for (const e of ESCENAS) { for (const l of ['es', 'en', 'ca']) expect(e.texto[l]).toBeTruthy(); expect(e.emoji).not.toMatch(BANEADOS) }
    for (const m of Object.values(MATERIALES)) expect(m.emoji).not.toMatch(BANEADOS)
    for (const c of CONCEPTOS) {
      expect(c.emoji).not.toMatch(BANEADOS)
      expect(c.ops).toHaveLength(4)
      for (const l of ['es', 'en', 'ca']) { expect(c.q[l]).toBeTruthy(); expect(c.exp[l]).toBeTruthy(); expect(new Set(c.ops.map(o => o[l])).size).toBe(4) }
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien calculada`, () => {
      const rand = semilla(nivel.length * 7477)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(correcta(r), JSON.stringify(r)).toBe(r.bueno)
        if (['escala', 'mezcla', 'calor'].includes(r.tipo)) {
          expect(r.opciones).toHaveLength(4)
          for (const o of r.opciones) expect(Number.isInteger(o)).toBe(true)
        }
        if (r.tipo === 'escala' && escalaDe(r)[1] === 'K') expect(r.bueno).toBeGreaterThan(0)
        if (r.tipo === 'mezcla') {
          const [[, t1], [, t2]] = r.vasos
          expect(r.bueno).toBeGreaterThan(Math.min(t1, t2))
          expect(r.bueno).toBeLessThan(Math.max(t1, t2))
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
