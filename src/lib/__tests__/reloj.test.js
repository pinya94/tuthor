import { describe, it, expect } from 'vitest'
import { nuevaHora, formatoDigital, enPalabras, esCorrecta } from '../reloj'

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

  it('esCorrecta compara hora y minuto', () => {
    expect(esCorrecta({ hora: 4, minuto: 30 }, { hora: 4, minuto: 30 })).toBe(true)
    expect(esCorrecta({ hora: 4, minuto: 30 }, { hora: 4, minuto: 15 })).toBe(false)
    expect(esCorrecta({ hora: 4, minuto: 30 }, { hora: 5, minuto: 30 })).toBe(false)
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
