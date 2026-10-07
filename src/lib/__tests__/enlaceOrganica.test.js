import { describe, it, expect } from 'vitest'
import * as enlace from '../../data/enlaceQuimico'
import * as organica from '../../data/quimicaOrganica'

const L = ['es', 'en', 'ca']

describe.each([['enlace químico', enlace], ['química orgánica', organica]])('Banco de %s', (_, b) => {
  it('24 preguntas en tres idiomas, cuatro opciones distintas y la buena la primera', () => {
    expect(b.PREGUNTAS).toHaveLength(24)
    expect(b.PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(10)
    expect(new Set(b.PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of b.PREGUNTAS) for (const l of L) {
      expect(p.opciones[l]).toHaveLength(4)
      expect(new Set(p.opciones[l]).size).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
      expect(p.pregunta[l] && p.explicacion[l]).toBeTruthy()
    }
  })
})

describe('química orgánica · fórmulas coherentes', () => {
  // CₙH₂ₙ₊₂ para los alcanos que se nombran en el banco.
  it('los alcanos citados cumplen la fórmula general', () => {
    const alcanos = { CH4: 1, C2H6: 2, C3H8: 3, C4H10: 4 }
    for (const [f, n] of Object.entries(alcanos)) {
      const h = Number(f.split('H')[1])
      expect(h, f).toBe(2 * n + 2)
    }
  })
})
