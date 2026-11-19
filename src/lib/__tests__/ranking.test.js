// Ranking general: el apodo automático es fijo por uid, cumple el formato que
// exigen las firestore.rules y se lee bien en los tres idiomas.
import { describe, it, expect } from 'vitest'
import { apodoDe, apodoTexto, periodos, ANIMALES, ADJETIVOS } from '../ranking'

const FORMATO_RULES = /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{2}$/ // igual que en firestore.rules

describe('apodo automático', () => {
  it('es el mismo para el mismo uid y cumple el formato de las rules', () => {
    for (let i = 0; i < 2000; i++) {
      const uid = 'u' + i.toString(36) + 'x'.repeat(i % 7)
      expect(apodoDe(uid)).toBe(apodoDe(uid))
      expect(apodoDe(uid)).toMatch(FORMATO_RULES)
    }
  })
  it('reparte bien: muchos apodos distintos', () => {
    const vistos = new Set(Array.from({ length: 1000 }, (_, i) => apodoDe('uid' + i)))
    expect(vistos.size).toBeGreaterThan(900)
  })
  it('todas las combinaciones se leen en es, en y ca sin huecos', () => {
    for (let a = 0; a < ANIMALES.length; a++) for (let j = 0; j < ADJETIVOS.length; j++) for (const l of ['es', 'en', 'ca']) {
      const { emoji, texto } = apodoTexto(`${a}-${j}-42`, l)
      expect(emoji).toBeTruthy()
      expect(texto).toMatch(/^\S+ \S+ 42$/)
    }
  })
  it('periodos en hora de España', () => {
    // 23:30 UTC del 31-dic ya es 1-ene en Madrid
    expect(periodos(new Date('2026-12-31T23:30:00Z'))).toEqual({ hoy: 'd-2027-01-01', mes: 'm-2027-01' })
    expect(periodos(new Date('2026-11-19T12:00:00Z'))).toEqual({ hoy: 'd-2026-11-19', mes: 'm-2026-11' })
  })
})
