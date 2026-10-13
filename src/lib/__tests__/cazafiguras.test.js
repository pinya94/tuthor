import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, FIGURAS, EJEMPLOS, trozos, palabras, marcadas, cazaBien, esCorrecta, enunciado, explicacion, schemaQuestion } from '../cazafiguras'

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

  it('cazar: las palabras de cada figura existen, y tocarlas vale', () => {
    for (const e of EJEMPLOS) {
      const T = marcadas(e)
      expect(T.length, e.t).toBeGreaterThan(0)
      expect(cazaBien(e, T), e.t).toBe(true)
      // Tocar todo el texto no vale (salvo que la figura sea casi todo el texto).
      const todas = palabras(e).map((p, k) => (p.verso ? null : k)).filter(k => k != null)
      if (todas.length - T.length > 2) expect(cazaBien(e, todas), e.t).toBe(false)
      // Tocar solo palabras que no son de la figura, tampoco.
      const fuera = todas.filter(k => !T.includes(k)).slice(0, 1)
      if (fuera.length) expect(cazaBien(e, fuera)).toBe(false)
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 977)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'empareja') {
          expect(r.ejemplos).toHaveLength(NIVELES[nivel].parejas)
          // Ningún texto tiene también la figura de otro: la unión es única.
          for (const a of r.ejemplos) for (const b of r.ejemplos) if (a !== b) {
            expect(EJEMPLOS[a].fig).not.toBe(EJEMPLOS[b].fig)
            expect(EJEMPLOS[a].tambien).not.toContain(EJEMPLOS[b].fig)
          }
        }
        expect(explicacion(r)).not.toMatch(/undefined/)
        expect(enunciado(r)).toBeTruthy()
        const q = schemaQuestion(r)
        expect(q.wrongAnswers).toHaveLength(3)
        for (const w of q.wrongAnswers) expect(EJEMPLOS[r.ejemplos[0]].tambien.map(f => FIGURAS[f].nombre)).not.toContain(w)
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
