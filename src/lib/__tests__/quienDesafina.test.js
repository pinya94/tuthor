import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, NOTAS, centsDe, conCents, centsEntre, hz, frecuencias, notaDe, afinado, esCorrecta, enunciado, explicacion, schemaQuestion } from '../quienDesafina'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('¿Quién Desafina?', () => {
  it('física de la afinación', () => {
    expect(conCents(440, 1200)).toBeCloseTo(880, 6) // una octava
    expect(conCents(440, 100)).toBeCloseTo(466.16, 2) // un semitono: La♯
    expect(conCents(440, -100)).toBeCloseTo(415.30, 2)
    expect(centsEntre(conCents(392, 37), 392)).toBeCloseTo(37, 6)
    // Las notas base están afinadas respecto a La 440 (temperamento igual)
    for (const n of NOTAS) expect(Math.abs(centsEntre(n.f, 440) - Math.round(centsEntre(n.f, 440) / 100) * 100), n.id).toBeLessThan(0.1)
    expect(hz(440, 'es')).toBe('440,0 Hz')
    expect(hz(452.9, 'en')).toBe('452.9 Hz')
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', () => {
      const rand = semilla(nivel.length * 223)
      const cfg = NIVELES[nivel]
      const cuenta = {}
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        cuenta[r.tipo] = (cuenta[r.tipo] ?? 0) + 1
        expect(esCorrecta(r, r.bueno)).toBe(true)
        expect(Math.abs(r.cents)).toBeGreaterThanOrEqual(cfg.cents[0])
        expect(Math.abs(r.cents)).toBeLessThanOrEqual(cfg.cents[1])
        expect(Math.abs(r.cents)).toBeGreaterThanOrEqual(12) // por debajo no se oye
        if (r.tipo === 'cual') {
          expect(new Set(r.inst).size).toBe(3)
          const fs = frecuencias(r)
          // Solo uno distinto, y en el sentido que dice la respuesta
          expect(fs.filter(f => f !== notaDe(r).f)).toHaveLength(1)
          expect(fs[r.malo] > notaDe(r).f).toBe(r.cents > 0)
          if (cfg.direccion) expect(r.bueno).toBe(`cual:${r.malo}:${r.cents > 0 ? 'sube' : 'baja'}`)
        } else {
          expect(afinado(r, 0)).toBe(true)
          expect(afinado(r, r.cents)).toBe(false)
          expect(afinado(r, r.tolerancia + 1)).toBe(false)
          // El punto afinado cabe en el deslizador y no está en el centro siempre
          const v = r.inicio - r.cents
          expect(Math.abs(v)).toBeLessThanOrEqual(90)
          expect(centsDe(r, v)).toBe(0)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|  /)
          expect(explicacion(r, l, ['X', 'Y', 'Z'], 3)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
          expect(new Set(q.wrongAnswers).size).toBe(3)
        }
      }
      for (const t of new Set(cfg.tipos)) expect(cuenta[t]).toBeGreaterThan(50)
    })
  }
})
