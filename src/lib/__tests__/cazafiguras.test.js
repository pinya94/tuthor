import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, FIGURAS, EJEMPLOS, trozos, enunciado, explicacion, textoOpcion, schemaQuestion } from '../cazafiguras'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Cazafiguras', () => {
  it('ejemplos coherentes', () => {
    for (const e of EJEMPLOS) {
      expect(FIGURAS[e.fig], e.t).toBeTruthy()
      for (const f of e.tambien) { expect(FIGURAS[f], f).toBeTruthy(); expect(f).not.toBe(e.fig) }
      // Todas las marcas están en el texto, en orden.
      const marcadas = trozos(e).filter(([, m]) => m).map(([t]) => t)
      expect(marcadas, e.t).toEqual(e.marca)
      expect(trozos(e).map(([t]) => t).join('')).toBe(e.t)
    }
    // Cada figura tiene al menos dos ejemplos.
    for (const f of Object.keys(FIGURAS)) expect(EJEMPLOS.filter(e => e.fig === f).length, f).toBeGreaterThanOrEqual(2)
    expect(new Set(EJEMPLOS.map(e => e.t)).size).toBe(EJEMPLOS.length)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas sin opciones falsas que también valgan`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 977)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        expect(r.opciones).toContain(r.bueno)
        if (r.tipo === 'figura') {
          const e = EJEMPLOS[r.ejemplo]
          expect(r.bueno).toBe(e.fig)
          for (const o of r.opciones) if (o !== r.bueno) expect(e.tambien, `${e.t} → ${o}`).not.toContain(o)
        }
        expect(explicacion(r)).not.toMatch(/undefined/)
        expect(enunciado(r)).toBeTruthy()
        expect(schemaQuestion(r).wrongAnswers).toHaveLength(3)
        expect(new Set(r.opciones.map(textoOpcion)).size).toBe(4)
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
