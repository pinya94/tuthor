import { describe, it, expect } from 'vitest'
import { nuevaConversion, esCorrecta, mulPow10, formatNum, MAGNITUDES } from '../escalera'

describe('mulPow10', () => {
  it('multiplica y divide potencias de 10 sin error de coma', () => {
    expect(mulPow10(3, 3)).toBe(3000)
    expect(mulPow10(250, -2)).toBe(2.5)
    expect(mulPow10(2.5, 2)).toBe(250)
    expect(mulPow10(7, 0)).toBe(7)
    expect(mulPow10(1, -3)).toBe(0.001)
  })
})

describe('nuevaConversion', () => {
  it('en fácil solo usa longitud y siempre baja (multiplica)', () => {
    for (let i = 0; i < 200; i++) {
      const c = nuevaConversion('facil')
      expect(c.magnitud).toBe('longitud')
      expect(c.aIdx).toBeGreaterThan(c.deIdx)      // baja => multiplica
      expect(Number.isInteger(c.valor)).toBe(true)
      expect(Number.isInteger(c.objetivo)).toBe(true) // resultado entero
    }
  })

  it('objetivo coincide con valor·10^(aIdx-deIdx)', () => {
    for (let i = 0; i < 300; i++) {
      const c = nuevaConversion('dificil')
      expect(c.objetivo).toBe(mulPow10(c.valor, c.aIdx - c.deIdx))
    }
  })

  it('los índices caen dentro de la escalera', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 200; i++) {
        const c = nuevaConversion(dif)
        const n = MAGNITUDES[c.magnitud].unidades.length
        expect(c.deIdx).toBeGreaterThanOrEqual(0)
        expect(c.aIdx).toBeGreaterThanOrEqual(0)
        expect(c.deIdx).toBeLessThan(n)
        expect(c.aIdx).toBeLessThan(n)
        expect(c.deIdx).not.toBe(c.aIdx)
      }
    }
  })

  it('medio y difícil pueden subir (dividir)', () => {
    for (const dif of ['medio', 'dificil']) {
      let subeAlguna = false
      for (let i = 0; i < 500 && !subeAlguna; i++) {
        if (nuevaConversion(dif).aIdx < nuevaConversion(dif).deIdx) subeAlguna = true
      }
      expect(subeAlguna).toBe(true)
    }
  })
})

describe('esCorrecta', () => {
  const conv = { magnitud: 'longitud', unidades: MAGNITUDES.longitud.unidades, deIdx: 0, aIdx: 3, valor: 3, objetivo: 3000, pasos: 3, abajo: true }

  it('acepta el valor exacto en cualquier separador decimal', () => {
    expect(esCorrecta(conv, '3000')).toBe(true)
    const subiendo = { ...conv, deIdx: 5, aIdx: 3, valor: 250, objetivo: 2.5 }
    expect(esCorrecta(subiendo, '2,5')).toBe(true)
    expect(esCorrecta(subiendo, '2.5')).toBe(true)
  })

  it('rechaza el valor equivocado, vacío o no numérico', () => {
    expect(esCorrecta(conv, '300')).toBe(false)
    expect(esCorrecta(conv, '')).toBe(false)
    expect(esCorrecta(conv, 'x')).toBe(false)
    expect(esCorrecta(conv, ',')).toBe(false)
  })
})

describe('formatNum', () => {
  it('usa coma en es/ca y punto en en', () => {
    expect(formatNum(2.5, 'es')).toBe('2,5')
    expect(formatNum(2.5, 'ca')).toBe('2,5')
    expect(formatNum(2.5, 'en')).toBe('2.5')
    expect(formatNum(3000, 'es')).toBe('3000')
    expect(formatNum(0.001, 'es')).toBe('0,001')
  })
})
