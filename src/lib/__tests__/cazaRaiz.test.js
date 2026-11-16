import { describe, it, expect } from 'vitest'
import { NIVELES, MIN, MAX, genRonda, esCorrecta, respuesta, clave, valor, poli, enunciado, ordenada, explicacion, schemaQuestion } from '../cazaRaiz'

describe('Caza la Raíz', () => {
  it('cada ronda tiene raíces enteras que cumplen la ecuación y caben en el eje', () => {
    for (const nivel of Object.keys(NIVELES)) {
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel)
        expect(r.a, r.id).not.toBe(0)
        for (const x of r.raices) {
          expect(Number.isInteger(x), r.id).toBe(true)
          expect(x >= MIN && x <= MAX, r.id).toBe(true)
          expect(valor(r, x), r.id).toBe(0)
        }
        // Ninguna otra x entera del eje es solución (no se puede marcar una «de más» y acertar)
        for (let x = MIN; x <= MAX; x++) if (!r.raices.includes(x)) expect(valor(r, x), r.id).not.toBe(0)
        const d = r.b * r.b - 4 * r.a * r.c
        expect(r.raices.length, r.id).toBe(d > 0 ? 2 : d === 0 ? 1 : 0)
        expect(esCorrecta(r, clave(r))).toBe(true)
        expect(esCorrecta(r, respuesta([...r.raices].reverse().length ? [...r.raices].reverse() : 'n'))).toBe(true)
        for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length, r.id).toBeGreaterThan(40)
        const q = schemaQuestion(r, 'es')
        expect(q.wrongAnswers.length).toBe(3)
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
    }
  })

  it('cada nivel saca lo que promete', () => {
    const muestra = n => Array.from({ length: 600 }, () => genRonda(n))
    const facil = muestra('facil')
    expect(facil.every(r => r.b === 0 || r.c === 0)).toBe(true)
    expect(new Set(facil.map(r => r.tipo))).toEqual(new Set(['sinB', 'sinC']))
    expect(facil.some(r => r.raices.length === 0)).toBe(true)
    const medio = muestra('medio')
    expect(medio.every(r => r.a === 1 && r.b !== 0 && r.c !== 0)).toBe(true)
    expect(new Set(medio.map(r => r.raices.length))).toEqual(new Set([0, 1, 2]))
    const dificil = muestra('dificil')
    expect(dificil.every(r => r.a !== 1)).toBe(true)
    expect(dificil.some(r => r.a < 0)).toBe(true)
    expect(new Set(dificil.map(r => r.forma)).size).toBe(4)
  })

  it('una sola raíz marcada en una ecuación de dos no vale, ni marcar dos en una doble', () => {
    const r = { a: 1, b: -5, c: 6, raices: [2, 3] }
    expect(esCorrecta(r, respuesta([3, 2]))).toBe(true)
    expect(esCorrecta(r, respuesta([3]))).toBe(false)
    expect(esCorrecta(r, 'n')).toBe(false)
    const doble = { a: 1, b: -6, c: 9, raices: [3] }
    expect(esCorrecta(doble, respuesta([3]))).toBe(true)
    expect(esCorrecta(doble, respuesta([3, -3]))).toBe(false)
    expect(esCorrecta({ a: 1, b: 2, c: 5, raices: [] }, 'n')).toBe(true)
  })

  it('las ecuaciones se escriben como en el libro, y la forma sin ordenar es equivalente', () => {
    expect(poli([[1, 2], [-5, 1], [6, 0]])).toBe('x² − 5x + 6')
    expect(poli([[-1, 2], [0, 1], [4, 0]])).toBe('−x² + 4')
    expect(poli([[3, 2], [12, 1], [0, 0]])).toBe('3x² + 12x')
    expect(ordenada({ a: 2, b: -10, c: 12 })).toBe('2x² − 10x + 12 = 0')
    const base = { a: 2, b: -10, c: 12, raices: [2, 3], nivel: 'dificil', tipo: 'completa' }
    expect(enunciado({ ...base, forma: 'pasaC' })).toBe('2x² − 10x = −12')
    expect(enunciado({ ...base, forma: 'pasaBC' })).toBe('2x² = 10x − 12')
    expect(enunciado({ ...base, forma: 'pasaB' })).toBe('2x² + 12 = 10x')
  })

  it('la explicación da la cuenta del discriminante y las raíces', () => {
    const e = explicacion({ a: 1, b: -5, c: 6, raices: [2, 3], tipo: 'completa', forma: 'estandar' }, 'es')
    expect(e).toContain('Δ = b² − 4ac = (−5)² − 4·1·6 = 1')
    expect(e).toContain('x = 2 y x = 3')
    const inc = explicacion({ a: 2, b: 0, c: -18, raices: [-3, 3], tipo: 'sinB', forma: 'estandar' }, 'es')
    expect(inc).toContain('x² = 9')
    const fc = explicacion({ a: 3, b: 12, c: 0, raices: [-4, 0], tipo: 'sinC', forma: 'estandar' }, 'es')
    expect(fc).toContain('x(3x + 12) = 0')
    expect(fc).toContain('x = −4')
  })
})
