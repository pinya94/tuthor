import { describe, it, expect } from 'vitest'
import { nuevaRonda, denomsDe, formatoEuro, esCorrecta } from '../dinero'

describe('dinero', () => {
  it('formatoEuro muestra euros con dos decimales y coma', () => {
    expect(formatoEuro(150)).toBe('1,50 €')
    expect(formatoEuro(340)).toBe('3,40 €')
    expect(formatoEuro(2000)).toBe('20,00 €')
    expect(formatoEuro(5)).toBe('0,05 €')
  })

  it('esCorrecta compara la suma con lo pedido (en céntimos)', () => {
    expect(esCorrecta({ objetivo: 370 }, 370)).toBe(true)
    expect(esCorrecta({ objetivo: 370 }, 360)).toBe(false)
    expect(esCorrecta({ objetivo: 370 }, 375)).toBe(false)
  })

  it('nuevaRonda: rangos, pasos y modo por dificultad', () => {
    for (let i = 0; i < 60; i++) {
      const f = nuevaRonda('facil')
      expect(f.modo).toBe('forma')
      expect(f.objetivo % 10).toBe(0)
      expect(f.objetivo).toBeGreaterThanOrEqual(20)
      expect(f.objetivo).toBeLessThanOrEqual(200)

      const m = nuevaRonda('medio')
      expect(m.modo).toBe('forma')
      expect(m.objetivo % 5).toBe(0)
      expect(m.objetivo).toBeLessThanOrEqual(1000)

      const d = nuevaRonda('dificil')
      expect(d.modo).toBe('cambio')
      expect(d.objetivo).toBe(d.pago - d.precio) // el cambio
      expect(d.pago).toBeGreaterThan(d.precio)   // el billete llega
      expect(d.objetivo).toBeGreaterThan(0)
      expect(d.objetivo % 5).toBe(0)
    }
  })

  it('facil ofrece solo monedas hasta 2 €; medio/dificil, todo', () => {
    expect(denomsDe('facil').every(d => d.v <= 200)).toBe(true)
    expect(denomsDe('medio').some(d => d.v === 2000)).toBe(true)
  })
})
