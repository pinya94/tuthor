// Invariantes de Caza la Función: el generador produce rondas resolubles y
// deterministas, la respuesta correcta cae dentro del rango de los steppers,
// y el estado inicial no arranca ya resuelto. Cazan erratas de rangos/params.
import { describe, it, expect } from 'vitest'
import { genRound, isCorrectParams, evalWith, evalFn, fnText } from '../funciones.js'

function seededRand(seed) {
  let s = seed
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
}

describe('fnText (formateo de la ecuación)', () => {
  it('formatea rectas y parábolas de forma legible', () => {
    expect(fnText('linear', { m: 2, b: 3 })).toBe('y = 2x + 3')
    expect(fnText('linear', { m: 1, b: 0 })).toBe('y = x')
    expect(fnText('linear', { m: -1, b: -4 })).toBe('y = −x − 4')
    expect(fnText('linear', { m: 0, b: 5 })).toBe('y = 5')
    expect(fnText('quad', { a: 1, b: 0, c: 0 })).toBe('y = x^2')
    expect(fnText('quad', { a: -2, b: 3, c: -1 })).toBe('y = −2x^2 + 3x − 1')
  })
})

describe('genRound (determinista y resoluble)', () => {
  it('cada dificultad produce rondas cuya respuesta es alcanzable y no arranca resuelta', () => {
    for (const diff of ['facil', 'medio', 'dificil']) {
      const rand = seededRand(diff.length + 7)
      for (let n = 0; n < 80; n++) {
        const r = genRound(diff, rand)
        // La respuesta oficial se valida como correcta.
        expect(isCorrectParams(r, r.target), `${diff}: target no válido`).toBe(true)
        // Cada parámetro objetivo cae dentro del rango del stepper.
        for (const c of r.controls) {
          expect(r.target[c.key], `${diff}: ${c.key} fuera de rango`).toBeGreaterThanOrEqual(c.min)
          expect(r.target[c.key]).toBeLessThanOrEqual(c.max)
          expect(r.params0[c.key], `${diff}: falta params0.${c.key}`).toBeTypeOf('number')
        }
        // No arranca ya resuelta.
        expect(isCorrectParams(r, r.params0), `${diff}: arranca resuelta`).toBe(false)
      }
    }
  })

  it('es determinista: misma semilla → misma ronda', () => {
    const a = genRound('dificil', seededRand(42))
    const b = genRound('dificil', seededRand(42))
    expect(a.target).toEqual(b.target)
    expect(a.kind).toBe(b.kind)
  })

  it('la curva del jugador con los params objetivo coincide con la objetivo', () => {
    const r = genRound('dificil', seededRand(99))
    for (const x of [-3, -1, 0, 2, 5]) {
      expect(evalWith(r, r.target, x)).toBe(evalFn(r, x))
    }
  })
})
