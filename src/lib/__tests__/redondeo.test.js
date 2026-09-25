import { describe, it, expect } from 'vitest'
import { nuevaRonda, esCorrecta, roundToPow, formatNum, placeFrase } from '../redondeo'

describe('roundToPow', () => {
  it('redondea al múltiplo de 10^p (medio hacia arriba)', () => {
    expect(roundToPow(3847, 2)).toBe(3800)
    expect(roundToPow(3850, 2)).toBe(3900)   // 5 sube
    expect(roundToPow(3849, 1)).toBe(3850)
    expect(roundToPow(47, 1)).toBe(50)
    expect(roundToPow(44, 1)).toBe(40)
    expect(roundToPow(3.47, -1)).toBe(3.5)
    expect(roundToPow(3.44, -1)).toBe(3.4)
    expect(roundToPow(3.5, 0)).toBe(4)
  })
})

describe('nuevaRonda', () => {
  it('el objetivo es siempre uno de los dos vecinos', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 300; i++) {
        const r = nuevaRonda(dif)
        const cerca = Math.abs(r.objetivo - r.abajo) < 1e-9 || Math.abs(r.objetivo - r.arriba) < 1e-9
        expect(cerca).toBe(true)
      }
    }
  })

  it('el valor cae dentro del intervalo [abajo, arriba] y no es ya redondo', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 300; i++) {
        const r = nuevaRonda(dif)
        expect(r.valor).toBeGreaterThanOrEqual(r.abajo)
        expect(r.valor).toBeLessThanOrEqual(r.arriba)
        expect(r.arriba).toBeGreaterThan(r.abajo)
        // no cae exactamente sobre un vecino (habría decisión trivial)
        expect(Math.abs(r.valor - r.abajo)).toBeGreaterThan(1e-9)
        expect(Math.abs(r.valor - r.arriba)).toBeGreaterThan(1e-9)
      }
    }
  })

  it('el objetivo coincide con roundToPow(valor, p)', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 200; i++) {
        const r = nuevaRonda(dif)
        expect(r.objetivo).toBe(roundToPow(r.valor, r.p))
      }
    }
  })

  it('fácil siempre redondea a la decena', () => {
    for (let i = 0; i < 100; i++) expect(nuevaRonda('facil').p).toBe(1)
  })

  it('difícil llega a usar millares o decimales', () => {
    let millar = false, decimal = false
    for (let i = 0; i < 800 && !(millar && decimal); i++) {
      const r = nuevaRonda('dificil')
      if (r.p === 3) millar = true
      if (r.p < 0) decimal = true
    }
    expect(millar).toBe(true)
    expect(decimal).toBe(true)
  })
})

describe('esCorrecta', () => {
  const r = { valor: 3847, valorStr: '3847', decimales: 0, p: 2, abajo: 3800, arriba: 3900, objetivo: 3800 }
  it('acepta el vecino correcto y rechaza el otro', () => {
    expect(esCorrecta(r, 3800)).toBe(true)
    expect(esCorrecta(r, 3900)).toBe(false)
  })
})

describe('formatNum y placeFrase', () => {
  it('formatea con coma en es/ca y punto en en', () => {
    expect(formatNum(3.5, 'es', 1)).toBe('3,5')
    expect(formatNum(3.5, 'en', 1)).toBe('3.5')
    expect(formatNum(3800, 'es')).toBe('3800')
  })
  it('da la frase del orden en cada idioma', () => {
    expect(placeFrase(2, 'es')).toBe('a la centena')
    expect(placeFrase(3, 'es')).toBe('al millar')
    expect(placeFrase(-1, 'en')).toBe('to the nearest tenth')
    expect(placeFrase(1, 'ca')).toBe('a la desena')
  })
})
