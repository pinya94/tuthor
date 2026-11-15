import { describe, it, expect } from 'vitest'
import { NIVELES, genRonda, esCorrecta, puntosDe, cumple, ecuacion, explicacion, schemaQuestion } from '../cruceRectas'

describe('Cruce de Rectas', () => {
  it('cada ronda es resoluble en la cuadrícula: solución entera dentro y dos puntos por recta', () => {
    for (const nivel of Object.keys(NIVELES)) {
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel)
        const { min, max } = NIVELES[nivel]
        expect(puntosDe(r.e1, min, max).length, r.id).toBeGreaterThanOrEqual(2)
        expect(puntosDe(r.e2, min, max).length, r.id).toBeGreaterThanOrEqual(2)
        const det = r.e1.a * r.e2.b - r.e2.a * r.e1.b
        if (r.tipo === 'compatible') {
          expect(det, r.id).not.toBe(0)
          expect(cumple(r.e1, r.sol) && cumple(r.e2, r.sol), r.id).toBe(true)
          expect(r.sol.every(v => v >= min && v <= max)).toBe(true)
          expect(esCorrecta(r, `p:${r.sol[0]},${r.sol[1]}`)).toBe(true)
          expect(esCorrecta(r, 'paralelas')).toBe(false)
        } else {
          expect(nivel).toBe('dificil')
          expect(det, r.id).toBe(0)
          // Paralelas: ningún punto común; la misma recta: todos
          const comunes = puntosDe(r.e1, min, max).filter(p => cumple(r.e2, p))
          if (r.tipo === 'incompatible') { expect(comunes).toEqual([]); expect(esCorrecta(r, 'paralelas')).toBe(true) }
          else { expect(comunes.length).toBe(puntosDe(r.e1, min, max).length); expect(esCorrecta(r, 'coinciden')).toBe(true) }
        }
        for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length).toBeGreaterThan(30)
        const q = schemaQuestion(r, 'es')
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
    }
  })

  it('el nivel difícil saca los tres tipos de sistema', () => {
    const tipos = new Set(Array.from({ length: 400 }, () => genRonda('dificil').tipo))
    expect([...tipos].sort()).toEqual(['compatible', 'incompatible', 'indeterminado'])
  })

  it('las ecuaciones se escriben como en el libro', () => {
    expect(ecuacion({ a: 2, b: 1, c: 7 })).toBe('2x + y = 7')
    expect(ecuacion({ a: 1, b: -3, c: -2 })).toBe('x − 3y = −2')
    expect(ecuacion({ a: -1, b: 2, c: 4 })).toBe('−x + 2y = 4')
    expect(ecuacion({ a: 0, b: 1, c: 3 })).toBe('y = 3')
  })
})
