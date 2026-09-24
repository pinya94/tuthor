import { describe, it, expect } from 'vitest'
import { nuevaHora, formatoDigital, enPalabras, esCorrecta, anguloHora } from '../reloj'

describe('reloj', () => {
  it('formatoDigital rellena los minutos a dos cifras', () => {
    expect(formatoDigital(3, 5)).toBe('3:05')
    expect(formatoDigital(12, 0)).toBe('12:00')
    expect(formatoDigital(1, 30)).toBe('1:30')
  })

  it('enPalabras (es): en punto, cuartos, media, y/menos, la una', () => {
    expect(enPalabras(3, 0, 'es')).toBe('las 3 en punto')
    expect(enPalabras(3, 15, 'es')).toBe('las 3 y cuarto')
    expect(enPalabras(3, 30, 'es')).toBe('las 3 y media')
    expect(enPalabras(3, 45, 'es')).toBe('las 4 menos cuarto')
    expect(enPalabras(3, 20, 'es')).toBe('las 3 y 20')
    expect(enPalabras(3, 50, 'es')).toBe('las 4 menos 10')
    expect(enPalabras(1, 0, 'es')).toBe('la una en punto')
    expect(enPalabras(12, 45, 'es')).toBe('la una menos cuarto') // 12→1
    expect(enPalabras(12, 30, 'es')).toBe('las 12 y media')
  })

  it('enPalabras (en): o\'clock, quarter/half past, quarter to', () => {
    expect(enPalabras(3, 0, 'en')).toBe("3 o'clock")
    expect(enPalabras(3, 15, 'en')).toBe('quarter past 3')
    expect(enPalabras(3, 30, 'en')).toBe('half past 3')
    expect(enPalabras(3, 45, 'en')).toBe('quarter to 4')
    expect(enPalabras(3, 20, 'en')).toBe('20 past 3')
    expect(enPalabras(3, 50, 'en')).toBe('10 to 4')
    expect(enPalabras(12, 45, 'en')).toBe('quarter to 1')
  })

  it('enPalabras (ca): en punt, i quart/mitja, menys quart', () => {
    expect(enPalabras(3, 0, 'ca')).toBe('les 3 en punt')
    expect(enPalabras(3, 15, 'ca')).toBe('les 3 i quart')
    expect(enPalabras(3, 30, 'ca')).toBe('les 3 i mitja')
    expect(enPalabras(3, 45, 'ca')).toBe('les 4 menys quart')
    expect(enPalabras(1, 0, 'ca')).toBe('la una en punt')
  })

  it('anguloHora avanza medio grado por minuto (aguja realista)', () => {
    expect(anguloHora({ hora: 3, minuto: 0 })).toBe(90)     // en el 3
    expect(anguloHora({ hora: 3, minuto: 30 })).toBe(105)   // entre el 3 y el 4
    expect(anguloHora({ hora: 12, minuto: 0 })).toBe(0)     // 12 → 0
    expect(anguloHora({ hora: 11, minuto: 20 })).toBeCloseTo(340, 5) // adelantada del 11
  })

  it('esCorrecta: minuto exacto y la aguja de la hora ADELANTADA dentro del margen', () => {
    const obj = { hora: 11, minuto: 20 }
    const bien = anguloHora(obj) // ~340, adelantada del 11 (330)
    expect(esCorrecta(obj, { minuto: 20, horaAng: bien })).toBe(true)
    expect(esCorrecta(obj, { minuto: 20, horaAng: bien + 6 })).toBe(true)  // dentro del margen
    expect(esCorrecta(obj, { minuto: 20, horaAng: 330 })).toBe(false)       // clavada en el 11 → mal
    expect(esCorrecta(obj, { minuto: 15, horaAng: bien })).toBe(false)      // minuto mal
    // en punto: la aguja va en el número justo
    expect(esCorrecta({ hora: 4, minuto: 0 }, { minuto: 0, horaAng: 120 })).toBe(true)
    expect(esCorrecta({ hora: 4, minuto: 0 }, { minuto: 0, horaAng: 150 })).toBe(false)
  })

  it('nuevaHora respeta el rango y la granularidad de la dificultad', () => {
    for (const [dif, permitidos] of [['facil', [0, 30]], ['medio', [0, 15, 30, 45]]]) {
      for (let i = 0; i < 40; i++) {
        const { hora, minuto } = nuevaHora(dif)
        expect(hora).toBeGreaterThanOrEqual(1)
        expect(hora).toBeLessThanOrEqual(12)
        expect(permitidos).toContain(minuto)
      }
    }
    for (let i = 0; i < 40; i++) {
      expect(nuevaHora('dificil').minuto % 5).toBe(0)
    }
  })
})
