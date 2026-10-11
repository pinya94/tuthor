import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, CONCEPTOS, G, enunciado, explicacion, textoOpcion, schemaQuestion } from '../newtonAccion'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}]/u
const rad = d => (d * Math.PI) / 180

function correcta(r) {
  switch (r.tipo) {
    case 'segunda': return { a: r.F / r.m, F: r.m * r.a, m: r.F / r.a }[r.despeje]
    case 'peso': return r.caso === 'tierra' ? r.m * G : r.caso === 'luna' ? Math.round(r.m * 1.6) : r.m
    case 'rozamiento': return r.F <= r.mu * r.m * G ? 0 : (r.F - r.mu * r.m * G) / r.m
    case 'plano': return r.pide === 'a' ? Math.round(G * Math.sin(rad(r.ang)) * 10) : Math.round(r.m * G * Math.cos(rad(r.ang)) * 10)
    case 'ascensor': return r.m * (G + ({ subeAcelera: 1, bajaAcelera: -1, subeFrena: -1, constante: 0 }[r.caso]) * r.a)
    default: return 0
  }
}

describe('Newton en Acción', () => {
  it('conceptos completos y sin emojis prohibidos', () => {
    for (const c of CONCEPTOS) {
      expect(c.emoji).not.toMatch(BANEADOS)
      for (const l of ['es', 'en', 'ca']) expect(new Set(c.ops.map(o => o[l])).size).toBe(4)
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien calculada`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 5501)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(correcta(r), JSON.stringify(r)).toBe(r.bueno)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
