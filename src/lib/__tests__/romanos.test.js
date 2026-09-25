import { describe, it, expect } from 'vitest'
import { aRomano, valorRomano, simbolosDe, nuevoNumero, esCorrecto } from '../romanos'

describe('romanos', () => {
  it('aRomano da la forma canónica (con IV, IX, XL…)', () => {
    expect(aRomano(4)).toBe('IV')
    expect(aRomano(9)).toBe('IX')
    expect(aRomano(14)).toBe('XIV')
    expect(aRomano(40)).toBe('XL')
    expect(aRomano(90)).toBe('XC')
    expect(aRomano(2024)).toBe('MMXXIV')
    expect(aRomano(3888)).toBe('MMMDCCCLXXXVIII')
  })

  it('valorRomano interpreta la resta (menor antes de mayor)', () => {
    expect(valorRomano('IV')).toBe(4)
    expect(valorRomano('XiV'.toUpperCase())).toBe(14)
    expect(valorRomano('MMXXIV')).toBe(2024)
    expect(valorRomano('IIII')).toBe(4) // suma, aunque no sea canónico
  })

  it('esCorrecto exige la forma canónica', () => {
    expect(esCorrecto(4, 'IV')).toBe(true)
    expect(esCorrecto(4, 'IIII')).toBe(false)   // suma bien, pero no es canónico
    expect(esCorrecto(14, 'XIV')).toBe(true)
    expect(esCorrecto(14, 'XIIII')).toBe(false)
  })

  it('ida y vuelta: aRomano y valorRomano son coherentes en todo el rango', () => {
    for (let n = 1; n <= 3999; n += 7) {
      expect(valorRomano(aRomano(n))).toBe(n)
    }
  })

  it('nuevoNumero respeta el máximo; la paleta crece con la dificultad', () => {
    for (let i = 0; i < 40; i++) {
      expect(nuevoNumero('facil')).toBeLessThanOrEqual(39)
      expect(nuevoNumero('medio')).toBeLessThanOrEqual(399)
      expect(nuevoNumero('dificil')).toBeLessThanOrEqual(3999)
    }
    expect(simbolosDe('facil').map(s => s.s)).toEqual(['I', 'V', 'X'])
    expect(simbolosDe('dificil').length).toBe(7)
  })
})
