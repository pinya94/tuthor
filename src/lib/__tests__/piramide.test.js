import { describe, it, expect } from 'vitest'
import { NIVELES, GRUPOS, TIPOS, construir, genRonda, esCorrecta, explicacion, schemaQuestion, enunciado, MECANICAS_DE } from '../piramide'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']
const total = p => p.h.map((x, i) => x + p.m[i])

describe('Pirámide de población · formas', () => {
  it('cada tipo tiene la forma de libro', () => {
    const rand = semilla(3)
    for (let n = 0; n < 50; n++) {
      const pro = total(construir('progresiva', null, rand))
      expect(pro[0]).toBe(Math.max(...pro)) // base, lo más ancho
      const reg = total(construir('regresiva', null, rand))
      expect(Math.max(...reg.slice(6, 12))).toBeGreaterThan(reg[0] * 1.3) // centro más ancho que la base
      const est = total(construir('estacionaria', null, rand))
      expect(est[8] / est[0]).toBeGreaterThan(0.8) // casi igual hasta los 40
    }
  })

  it('arriba siempre hay más mujeres; la inmigración solo engorda a los hombres de 20-44', () => {
    const rand = semilla(4)
    for (const t of TIPOS) {
      const p = construir(t, null, rand)
      for (const i of [15, 16, 17]) expect(p.m[i]).toBeGreaterThan(p.h[i] * 1.2)
      const q = construir(t, 'inmigracion', rand)
      for (const i of [4, 5, 6, 7, 8]) expect(q.h[i]).toBeGreaterThan(q.m[i] * 1.5)
      expect(q.h[2]).toBeLessThan(q.m[2] * 1.1)
    }
  })
})

describe('Pirámide de población · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: lo que se toca sale de los datos`, () => {
      const rand = semilla(nivel.length * 613)
      const mecanicas = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        mecanicas.add(r.mecanica)
        expect(r.h).toHaveLength(GRUPOS)
        const tot = total(r)
        if (r.mecanica === 'clasifica') {
          expect(esCorrecta(r, 'clasifica:0')).toBe(true)
          expect(esCorrecta(r, 'clasifica:1')).toBe(false)
          expect(new Set(r.piramides.map(x => x.tipo)).size).toBeGreaterThan(1)
          for (const x of r.piramides) expect(TIPOS).toContain(x.tipo)
        } else {
          for (const v of r.validos) expect(esCorrecta(r, String(v))).toBe(true)
          const fuera = [...Array(GRUPOS).keys()].filter(k => !r.validos.includes(k))
          for (const k of fuera) expect(esCorrecta(r, String(k))).toBe(false)
        }
        if (r.mecanica === 'mayor') {
          const [k] = r.validos
          for (const o of fuera(r)) expect(tot[k]).toBeGreaterThan(tot[o] * 1.06)
        }
        if (r.mecanica === 'anomalia') {
          const [k] = r.validos
          const vecinos = (tot[k - 1] + tot[k + 1]) / 2
          if (r.rasgo === 'hueco') expect(tot[k]).toBeLessThan(vecinos * 0.8)
          else expect(tot[k]).toBeGreaterThan(vecinos * 1.1)
        }
        if (r.mecanica === 'nacidos') {
          expect(r.hasta - r.desde).toBe(4)
          expect(r.censo - r.hasta).toBe(r.validos[0] * 5)
        }
        if (r.mecanica === 'lado') {
          for (const k of r.validos) {
            if (r.caso === 'hombres') expect(r.h[k]).toBeGreaterThan(r.m[k] * 1.4)
            else expect(r.m[k]).toBeGreaterThan(r.h[k] * 1.15)
          }
          // y ningún otro grupo se le parece
          for (const k of fuera(r)) {
            if (r.caso === 'hombres') expect(r.h[k]).toBeLessThan(r.m[k] * 1.1)
            else expect(r.m[k]).toBeLessThan(r.h[k] * 1.08)
          }
        }
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          if (q) {
            expect(q.wrongAnswers).not.toContain(q.correctAnswer)
            expect(q.wrongAnswers).toHaveLength(2)
          }
        }
      }
      expect([...mecanicas].sort()).toEqual([...new Set(MECANICAS_DE(nivel))].sort())
    })
  }
})

function fuera(r) { return [...Array(GRUPOS).keys()].filter(k => !r.validos.includes(k)) }
