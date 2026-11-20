// Etapas de los juegos (data/cursosJuegos.js): todo juego publicado tiene al
// menos una y el mapa cuadra con las listas de las páginas por curso.
import { describe, it, expect } from 'vitest'
import { ETAPAS, ETAPAS_JUEGO, esDeEtapa } from '../../data/cursosJuegos'
import { LANDINGS } from '../../data/landingsCurso'
import { GAMES } from '../../data/constants'

const SLUGS = GAMES.filter(g => g.ready && g.path).map(g => g.path.replace(/^\/juegos\//, ''))

describe('etapas de los juegos', () => {
  it('todo juego publicado tiene etapa', () => {
    expect(SLUGS.filter(s => !ETAPAS_JUEGO[s]), 'añádelos a data/cursosJuegos.js').toEqual([])
  })
  it('solo letras p/e/b y juegos que existen', () => {
    const existen = new Set(SLUGS)
    for (const [s, et] of Object.entries(ETAPAS_JUEGO)) {
      expect(existen.has(s), s).toBe(true)
      expect(et).toMatch(/^p?e?b?$/)
      expect(et.length, s).toBeGreaterThan(0)
    }
  })
  it('un juego listado en la página de un curso es de ese curso', () => {
    for (const l of LANDINGS) for (const s of l.juegos || []) expect(esDeEtapa(s, l.curso), `${s} en ${l.curso}`).toBe(true)
  })
  it('cada etapa tiene juegos de sobra', () => {
    for (const e of ETAPAS) expect(SLUGS.filter(s => esDeEtapa(s, e)).length, e).toBeGreaterThan(20)
  })
})
