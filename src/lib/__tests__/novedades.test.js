// Novedades (data/novedades.js): ordenadas de más reciente a más antigua, en
// los tres idiomas, y los juegos nombrados existen en el catálogo.
import { describe, it, expect } from 'vitest'
import { NOVEDADES } from '../../data/novedades'
import { GAMES } from '../../data/constants'

const SLUGS = new Set(GAMES.filter(g => g.ready && g.path).map(g => g.path.replace(/^\/juegos\//, '')))

describe('novedades', () => {
  it('fechas válidas y de más reciente a más antigua', () => {
    NOVEDADES.forEach((n, i) => {
      expect(n.fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      if (i > 0) expect(n.fecha <= NOVEDADES[i - 1].fecha, n.fecha).toBe(true)
    })
  })
  it('cada entrada es un juego que existe o una mejora completa en es, en y ca', () => {
    for (const n of NOVEDADES) {
      if (n.juego) { expect(SLUGS.has(n.juego), n.juego).toBe(true); continue }
      expect(['todos', 'profes']).toContain(n.para)
      expect(n.emoji).toBeTruthy()
      for (const l of ['es', 'en', 'ca']) {
        expect(n.titulo[l], `${n.titulo.es} [${l}]`).toBeTruthy()
        expect(n.texto[l], `${n.titulo.es} [${l}]`).toBeTruthy()
      }
      if (n.enlace) expect(n.enlace).toMatch(/^\//)
    }
  })
})
