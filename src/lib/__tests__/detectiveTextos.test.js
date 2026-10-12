import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, TIPOS, FRAGMENTOS, ESCENAS, ELEMENTOS, FUNCIONES, FRASES, enunciado, explicacion, textoOpcion, schemaQuestion } from '../detectiveTextos'

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
    it(`${nivel}: 600 rondas`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 613)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        expect(r.opciones).toContain(r.bueno)
        if (r.tipo === 'tipo') expect(r.bueno).toBe(FRAGMENTOS[r.k][0])
        if (r.tipo === 'funcion') {
          expect(r.bueno).toBe(FRASES[r.k][0])
          for (const o of r.opciones) if (o !== r.bueno) expect(FRASES[r.k][3]).not.toContain(o)
        }
        expect(new Set(r.opciones.map(o => textoOpcion(o, r))).size).toBe(4)
        expect(explicacion(r)).not.toMatch(/undefined/)
        expect(enunciado(r)).toBeTruthy()
        expect(schemaQuestion(r).wrongAnswers).toHaveLength(3)
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
