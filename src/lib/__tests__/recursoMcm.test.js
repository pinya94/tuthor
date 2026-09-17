import { describe, it, expect } from 'vitest'
import { resolver, factorizar } from '../recursoMcm'

describe('recursoMcm', () => {
  it('factoriza en primos', () => {
    expect(factorizar(12)).toEqual([{ p: 2, e: 2 }, { p: 3, e: 1 }])
    expect(factorizar(18)).toEqual([{ p: 2, e: 1 }, { p: 3, e: 2 }])
    expect(factorizar(97)).toEqual([{ p: 97, e: 1 }]) // primo
    expect(factorizar(1)).toEqual([])
  })

  it('m.c.m. y m.c.d. de 12 y 18', () => {
    const r = resolver('12, 18')
    expect(r.ok).toBe(true)
    expect(r.mcm).toBe(36)
    expect(r.mcd).toBe(6)
    expect(r.factorTexto).toEqual(['12 = 2² · 3', '18 = 2 · 3²'])
    expect(r.mcmTexto).toBe('2² · 3² = 36')
    expect(r.mcdTexto).toBe('2 · 3 = 6')
    expect(r.coprimos).toBe(false)
  })

  it('números primos entre sí → m.c.d. 1', () => {
    const r = resolver('8 9')
    expect(r.mcm).toBe(72)
    expect(r.mcd).toBe(1)
    expect(r.coprimos).toBe(true)
  })

  it('tres números', () => {
    const r = resolver('6, 9, 15')
    expect(r.mcm).toBe(90) // 2·3²·5
    expect(r.mcd).toBe(3)  // solo el 3 es común a los tres
  })

  it('el 1 no aporta factores', () => {
    const r = resolver('1, 5')
    expect(r.mcm).toBe(5)
    expect(r.mcd).toBe(1)
    expect(r.factorTexto).toEqual(['1 = 1', '5 = 5'])
  })

  it('errores', () => {
    expect(resolver('7').error).toBe('pocos')
    expect(resolver('12, abc').error).toBe('invalido')
    expect(resolver('12, 3.5').error).toBe('invalido')
    expect(resolver('12, 0').error).toBe('rango')
    expect(resolver('1 2 3 4 5 6 7 8 9').error).toBe('muchos')
  })
})
