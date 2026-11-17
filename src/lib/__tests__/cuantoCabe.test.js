import { describe, it, expect } from 'vitest'
import { NIVELES, genRonda, esCorrecta, enunciado, explicacion, schemaQuestion, usaPi } from '../cuantoCabe'

describe('¿Cuánto Cabe?', () => {
  it('las fórmulas dan los valores del libro', () => {
    const r = (cuerpo, m, magnitud, exacto) => ({ cuerpo, m, magnitud, exacto })
    // casos de los ejercicios de la página de estudio
    expect(esCorrecta(r('ortoedro', { a: 6, b: 4, c: 5 }, 'V', 120), '120')).toBe(true)
    expect(esCorrecta(r('ortoedro', { a: 6, b: 4, c: 5 }, 'V', 120), '121')).toBe(false)
    const lata = r('cilindro', { r: 4, h: 10 }, 'V', Math.PI * 16 * 10) // 502,65
    expect(esCorrecta(lata, '502')).toBe(true) // con 3,14
    expect(esCorrecta(lata, '503')).toBe(true) // con el π de la calculadora
    expect(esCorrecta(lata, '480')).toBe(false)
    expect(esCorrecta(lata, '')).toBe(false)
  })

  it('cada ronda es coherente: medidas enteras, resultado positivo y π solo donde toca', () => {
    for (const nivel of Object.keys(NIVELES)) for (let i = 0; i < 400; i++) {
      const r = genRonda(nivel)
      for (const v of Object.values(r.m)) expect(Number.isInteger(v) && v > 0, r.id).toBe(true)
      expect(r.exacto).toBeGreaterThan(0)
      // sin π, el resultado es entero (las pirámides tienen h múltiplo de 3)
      if (!usaPi(r)) expect(Number.isInteger(r.exacto), r.id).toBe(true)
      expect(esCorrecta(r, String(Math.round(r.exacto))), r.id).toBe(true)
      expect(esCorrecta(r, String(Math.round(r.exacto) + 50)), r.id).toBe(false)
      if (r.cuerpo === 'cono' && r.magnitud === 'AL') expect(r.m.g ** 2).toBe(r.m.r ** 2 + r.m.h ** 2)
      for (const l of ['es', 'en', 'ca']) {
        expect(enunciado(r, l).length).toBeGreaterThan(20)
        expect(explicacion(r, l)).toContain(String(Math.round(r.exacto)))
      }
      const q = schemaQuestion(r, 'es')
      expect(q.wrongAnswers.length).toBe(3)
      expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      if (nivel === 'facil') expect(r.cuerpo).toBe('cubitos')
    }
  })

  it('con 3,14 se acepta en todos los cuerpos redondos', () => {
    for (let i = 0; i < 300; i++) {
      const r = genRonda(i % 2 ? 'medio' : 'dificil')
      if (!usaPi(r)) continue
      const con314 = r.exacto * 3.14 / Math.PI
      expect(esCorrecta(r, String(Math.round(con314))), r.id).toBe(true)
    }
  })
})
