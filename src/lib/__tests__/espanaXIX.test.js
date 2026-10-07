import { describe, it, expect } from 'vitest'
import { PREGUNTAS, PREGUNTAS_ESO } from '../../data/historiaEspanaXIX'
import { EVENTOS_HISTORIA, EXAMENES_HISTORIA } from '../../data/historiaEvents'

const L = ['es', 'en', 'ca']

describe('España en el siglo XIX', () => {
  it('banco: 24 preguntas, cuatro opciones distintas y la buena la primera', () => {
    expect(PREGUNTAS).toHaveLength(24)
    expect(PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(10)
    expect(new Set(PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of PREGUNTAS) for (const l of L) {
      expect(p.opciones[l]).toHaveLength(4)
      expect(new Set(p.opciones[l]).size).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
    }
  })
  it('eventos del siglo, en orden y con su examen de fechas registrado', () => {
    const ev = EVENTOS_HISTORIA.filter(e => e.categoria === 'espana-xix')
    expect(ev.length).toBeGreaterThanOrEqual(15)
    for (const e of ev) {
      expect(e.año).toBeGreaterThanOrEqual(1808)
      expect(e.año).toBeLessThanOrEqual(1898)
      expect(e.nombreEn && e.nombreCa && e.descripcionEn && e.descripcionCa).toBeTruthy()
    }
    // Sin esta entrada, el Juego de Fechas cae en silencio en el examen de Primaria.
    expect(EXAMENES_HISTORIA.some(x => x.id === 'espana-xix')).toBe(true)
  })
})
