import { describe, it, expect } from 'vitest'
import { nuevaPregunta, esCorrecta } from '../tablas'

describe('nuevaPregunta', () => {
  it('siempre ofrece 4 opciones únicas que incluyen el resultado', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 400; i++) {
        const p = nuevaPregunta(dif)
        expect(p.opciones).toHaveLength(4)
        expect(new Set(p.opciones).size).toBe(4)           // sin repetidos
        expect(p.opciones).toContain(p.resultado)          // la correcta está
        expect(p.opciones.every(x => x > 0)).toBe(true)    // nada negativo/cero
      }
    }
  })

  it('el resultado concuerda con la operación mostrada', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 300; i++) {
        const p = nuevaPregunta(dif)
        if (p.tipo === 'div') expect(p.resultado).toBe((p.a * p.b) / p.b)
        else expect(p.resultado).toBe(p.a * p.b)
      }
    }
  })

  it('fácil usa solo tablas del 2, 5 o 10', () => {
    for (let i = 0; i < 200; i++) {
      const p = nuevaPregunta('facil')
      expect(p.tipo).toBe('mult')
      expect([2, 5, 10].includes(p.a) || [2, 5, 10].includes(p.b)).toBe(true)
    }
  })

  it('difícil llega a incluir divisiones', () => {
    let div = false
    for (let i = 0; i < 500 && !div; i++) if (nuevaPregunta('dificil').tipo === 'div') div = true
    expect(div).toBe(true)
  })
})

describe('esCorrecta', () => {
  it('acepta el resultado y rechaza los distractores', () => {
    for (let i = 0; i < 100; i++) {
      const p = nuevaPregunta('medio')
      expect(esCorrecta(p, p.resultado)).toBe(true)
      for (const o of p.opciones) if (o !== p.resultado) expect(esCorrecta(p, o)).toBe(false)
    }
  })
})
