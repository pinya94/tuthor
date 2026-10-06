import { describe, it, expect } from 'vitest'
import { NOTICIAS, EFECTO, NIVELES, genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado } from '../ofertaDemanda'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

describe('Oferta y demanda · datos', () => {
  it('cada noticia en tres idiomas, con una sola curva (o ninguna) y su porqué', () => {
    for (const n of NOTICIAS) {
      for (const l of L) { expect(n.bien[l]).toBeTruthy(); expect(n.texto[l]).toBeTruthy(); expect(n.porque[l]).toBeTruthy() }
      expect([null, 'D', 'S']).toContain(n.curva)
      if (n.curva) expect([1, -1]).toContain(n.dir)
    }
  })
  it('hay noticias de los cuatro desplazamientos y de movimiento a lo largo', () => {
    const k = new Set(NOTICIAS.map(n => (n.curva ? n.curva + (n.dir > 0 ? '+' : '-') : 'ninguna')))
    expect([...k].sort()).toEqual(['D+', 'D-', 'S+', 'S-', 'ninguna'])
  })
  it('los efectos son los de libro', () => {
    expect(EFECTO['D+']).toEqual([1, 1])
    expect(EFECTO['D-']).toEqual([-1, -1])
    expect(EFECTO['S+']).toEqual([-1, 1])
    expect(EFECTO['S-']).toEqual([1, -1])
  })
})

describe('Oferta y demanda · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas coherentes`, () => {
      const rand = semilla(nivel.length * 389)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'curva' && !NIVELES[nivel].ninguna) expect(r.bueno).not.toBe('ninguna')
        if (r.tipo === 'efecto') expect(NOTICIAS[r.noticia].curva).not.toBeNull()
        if (r.tipo === 'equilibrio') {
          const e = r.ec
          // el equilibrio de verdad: Qd = Qs en P*
          expect(e.a - e.b * e.P).toBe(e.c + e.d * e.P)
          expect(e.a - e.b * e.P).toBe(e.Q)
          expect(r.bueno).toBe(r.pide === 'P' ? e.P : e.Q)
        }
        if (r.tipo === 'exceso') {
          const e = r.ec
          expect(r.qd).toBe(e.a - e.b * r.p0)
          expect(r.qs).toBe(e.c + e.d * r.p0)
          expect(r.bueno).toBe(`${r.p0 < e.P ? 'demanda' : 'oferta'}:${Math.abs(r.qd - r.qs)}`)
        }
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN|\+ -/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...tipos].sort()).toEqual([...NIVELES[nivel].tipos].sort())
    })
  }
})
