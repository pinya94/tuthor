import { describe, it, expect } from 'vitest'
import {
  genRonda, NIVELES, R, PASOS, esCorrecta, respuesta, inicial, enunciado, explicacion, pistaFallo, schemaQuestion,
} from '../bajoPresion'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const LANGS = ['es', 'en', 'ca']
const cerca = (x, y) => Math.abs(x - y) < 1e-9

describe('Bajo Presión', () => {
  it('las rondas cumplen su ley y la respuesta se alcanza con los pasos del control', () => {
    const rand = semilla(11)
    for (const nivel of Object.keys(NIVELES)) {
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel, { rand })
        expect(NIVELES[nivel].tipos).toContain(r.tipo)
        if (r.tipo === 'ideal') {
          expect(Math.abs(r.a.P * r.a.V - r.a.n * R * r.a.T)).toBeLessThan(0.06 * Math.max(r.a.P, r.a.V))
        } else {
          const { a, b } = r
          expect(cerca((a.P * a.V) / a.T, (b.P * b.V) / b.T), `${r.tipo}`).toBe(true)
          if (r.tipo === 'boyle') expect(b.T).toBe(a.T)
          if (r.tipo === 'charles') expect(b.P).toBe(a.P)
          if (r.tipo === 'gay') expect(b.V).toBe(a.V)
          if (nivel === 'facil') { expect(r.celsius).toBe(false); expect(r.pide).not.toBe('T') }
        }
        // alcanzable desde el valor inicial con el paso fino
        const objetivo = r.tipo === 'ideal' ? r.a[r.pide] : r.b[r.pide]
        const fino = PASOS[r.pide][1]
        const pasos = (objetivo - inicial(r)) / fino
        expect(Math.abs(pasos - Math.round(pasos)), `${r.tipo} ${r.pide}`).toBeLessThan(1e-6)
        expect(esCorrecta(r, respuesta(r.pide, objetivo))).toBe(true)
        for (const l of LANGS) {
          const t = enunciado(r, l) + explicacion(r, l)
          expect(t, `${r.tipo} ${l}`).not.toMatch(/undefined|NaN|null|Infinity/)
          if (l !== 'en') expect(t).not.toMatch(/\d\.\d/)
          const sq = schemaQuestion(r, l)
          expect(sq.wrongAnswers.length).toBe(3)
          expect(sq.wrongAnswers).not.toContain(sq.correctAnswer)
        }
      }
    }
  })

  it('las pistas cazan las trampas', () => {
    // 4 L a 27 °C → 127 °C: V₂ = 4 · 400/300 = 5,3…; elegimos datos exactos: 3 L, 300 K → 400 K = 4 L
    const ch = { tipo: 'charles', celsius: true, pide: 'V', a: { P: 1, V: 3, T: 300 }, b: { P: 1, V: 4, T: 400 } }
    ch.bueno = respuesta('V', 4)
    expect(pistaFallo(ch, respuesta('V', 3 * 127 / 27), 'es')).toMatch(/kelvin/)
    expect(pistaFallo(ch, respuesta('V', 2.3), 'es')).toMatch(/Al revés/)
    const bo = { tipo: 'boyle', celsius: false, pide: 'V', a: { P: 2, V: 6, T: 300 }, b: { P: 4, V: 3, T: 300 } }
    expect(pistaFallo(bo, respuesta('V', 12), 'es')).toMatch(/Al revés/)
    const id = { tipo: 'ideal', celsius: true, pide: 'P', a: { n: 2, T: 300, V: 10, P: 4.9 } }
    expect(pistaFallo(id, respuesta('P', 0.4), 'es')).toMatch(/°C/)
    expect(explicacion(ch, 'es')).toMatch(/27 °C \+ 273 = 300 K/)
    expect(explicacion(id, 'es')).toMatch(/0,082/)
    expect(explicacion(id, 'en')).toMatch(/0\.082/)
    // Boyle no usa la temperatura: nunca pide pasar a kelvin
    const rand = semilla(3)
    for (let i = 0; i < 200; i++) {
      const r = genRonda('dificil', { rand })
      if (r.tipo === 'boyle') expect(explicacion(r, 'es')).not.toMatch(/kelvin/)
    }
  })
})
