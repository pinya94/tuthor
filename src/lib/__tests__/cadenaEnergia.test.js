import { describe, it, expect } from 'vitest'
import { FORMAS, SITUACIONES, APARATOS, CADENAS, NIVELES, genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado } from '../cadenaEnergia'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']
const BANEADOS = /[\u{1FA70}-\u{1FAFF}]/u

describe('Cadena de energía · datos', () => {
  it('formas, situaciones, aparatos y cadenas usan formas que existen', () => {
    for (const f of Object.values(FORMAS)) { expect(f.emoji).not.toMatch(BANEADOS); for (const l of L) expect(f.nombre[l]).toBeTruthy() }
    for (const s of SITUACIONES) { expect(FORMAS[s.forma]).toBeTruthy(); for (const v of s.veta) expect(FORMAS[v]).toBeTruthy(); expect(s.veta).not.toContain(s.forma) }
    for (const a of APARATOS) {
      expect(FORMAS[a.entra] && FORMAS[a.sale]).toBeTruthy()
      expect(a.entra).not.toBe(a.sale)
      expect(a.pierde).not.toContain(a.sale)
    }
    for (const c of CADENAS) for (const f of c.formas) expect(FORMAS[f]).toBeTruthy()
  })
})

describe('Cadena de energía · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas coherentes, sin «también vale» entre los distractores`, () => {
      const rand = semilla(nivel.length * 5003)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'forma') for (const v of SITUACIONES[r.situacion].veta) expect(r.opciones).not.toContain(v)
        if (r.tipo === 'transforma') {
          const a = APARATOS[r.aparato]
          expect(r.bueno).toBe(a[r.pide])
          for (const v of a.pierde) expect(r.opciones).not.toContain(v)
        }
        if (r.tipo === 'cadena') {
          const c = CADENAS[r.cadena]
          expect(r.bueno).toBe(c.formas[r.hueco])
          for (const f of c.formas) if (f !== r.bueno) expect(r.opciones).not.toContain(f)
        }
        if (r.tipo === 'rendimiento') {
          expect(r.util).toBe((r.entra * r.pct) / 100)
          expect(r.bueno).toBe(r.pide === 'rendimiento' ? r.pct : r.entra - r.util)
        }
        if (r.tipo === 'mgh') {
          expect(r.ep).toBe(r.m * 10 * r.h)
          expect(r.bueno).toBe(r.pide === 'ec-mitad' ? r.ep / 2 : r.ep)
        }
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})
