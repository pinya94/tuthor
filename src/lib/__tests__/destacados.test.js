// La portada (destacado del mes y «los más jugados») solo puede nombrar
// juegos que existen en el catálogo visual. Ver data/destacados.js.
import { describe, it, expect } from 'vitest'
import { DESTACADO, MAS_JUGADOS } from '../../data/destacados'
import { GAMES } from '../../data/constants'

const SLUGS = new Set(GAMES.filter(g => g.ready && g.path).map(g => g.path.replace(/^\/juegos\//, '')))

describe('destacados de la portada', () => {
  it('el destacado del mes existe y tiene mes', () => {
    expect(SLUGS.has(DESTACADO.slug), DESTACADO.slug).toBe(true)
    expect(DESTACADO.mes).toMatch(/^\d{4}-\d{2}$/)
    for (const l of ['es', 'en', 'ca']) expect(DESTACADO.motivo[l]).toBeTruthy()
  })
  it('los más jugados existen y no se repiten', () => {
    expect(MAS_JUGADOS.filter(s => !SLUGS.has(s))).toEqual([])
    expect(new Set(MAS_JUGADOS).size).toBe(MAS_JUGADOS.length)
  })
})
