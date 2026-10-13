import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, TIPOS, FRAGMENTOS, ESCENAS, ELEMENTOS, FUNCIONES, FRASES, enunciado, explicacion, schemaQuestion, esCorrecta, cajaDe } from '../detectiveTextos'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Detective de Textos', () => {
  it('banco coherente', () => {
    for (const [t] of FRAGMENTOS) expect(TIPOS[t]).toBeTruthy()
    for (const t of Object.keys(TIPOS)) expect(FRAGMENTOS.filter(f => f[0] === t).length, t).toBeGreaterThanOrEqual(3)
    for (const e of ESCENAS) {
      // En cada escena los cinco elementos son distintos: si no, dos opciones serían la misma.
      const vals = Object.keys(ELEMENTOS).map(k => e[k])
      expect(vals.every(Boolean), e.t).toBe(true)
      expect(new Set(vals).size, e.t).toBe(vals.length)
    }
    for (const [f, , , tambien] of FRASES) {
      expect(FUNCIONES[f]).toBeTruthy()
      for (const x of tambien) { expect(FUNCIONES[x]).toBeTruthy(); expect(x).not.toBe(f) }
    }
    for (const f of Object.keys(FUNCIONES)) expect(FRASES.filter(x => x[0] === f).length, f).toBeGreaterThanOrEqual(3)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 613)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'esquema') {
          for (const h of r.huecos) expect(r.fichas).toContain(h)
          expect(ESCENAS[r.k]).toBeTruthy()
        } else {
          expect(r.items).toHaveLength(3)
          // Cajas sin repetir, y cada texto tiene la suya.
          expect(new Set(r.cajas).size).toBe(r.cajas.length)
          for (const it of r.items) expect(r.cajas).toContain(cajaDe(r, it))
          expect(new Set(r.items.map(it => cajaDe(r, it))).size).toBe(3)
          // Ninguna frase podría ir también en otra caja de la ronda.
          if (r.tipo === 'funciones') for (const it of r.items) for (const c of r.cajas) if (c !== cajaDe(r, it)) expect(FRASES[it][3]).not.toContain(c)
        }
        expect(explicacion(r)).not.toMatch(/undefined/)
        expect(enunciado(r)).toBeTruthy()
        const q = schemaQuestion(r)
        expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
