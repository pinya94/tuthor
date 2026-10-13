import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, empresa, SENSIBILIDAD, enunciado, explicacion, textoOpcion, schemaQuestion } from '../puntoMuerto'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Punto Muerto', () => {
  it('las empresas generadas tienen el punto muerto exacto', () => {
    const rand = semilla(7)
    for (let i = 0; i < 500; i++) {
      const e = empresa(rand)
      expect(e.P).toBeGreaterThan(e.CVu)
      expect(e.CF / (e.P - e.CVu)).toBe(e.Qe)
    }
    // Sensibilidad recalculada: Q* = CF / (P − CVu)
    const base = { CF: 1000, P: 15, CVu: 5 }
    const Q = b => b.CF / (b.P - b.CVu)
    for (const [que, dir, efecto] of SENSIBILIDAD) {
      const otra = { ...base, [que]: base[que] + dir }
      expect(Q(otra) > Q(base) ? 'sube' : 'baja', `${que} ${dir}`).toBe(efecto)
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la cuenta bien`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 271)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        const m = r.P - r.CVu
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        if (r.tipo === 'leer' || r.tipo === 'calcular') expect(r.bueno).toBe(r.CF / m)
        if (r.tipo === 'beneficio') expect(r.bueno).toBe(m * r.q - r.CF)
        if (r.tipo === 'precio') expect(r.bueno).toBe(r.CVu + r.CF / r.Qe)
        if (r.tipo === 'zona') expect(r.bueno).toBe(r.q < r.Qe ? 'perdidas' : r.q > r.Qe ? 'beneficio' : 'equilibrio')
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const textos = r.opciones.map(o => textoOpcion(o, r, l))
          expect(new Set(textos).size).toBe(textos.length)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
