import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { GAMES, disponibleEn } from '../games'
import { FICHAS_ES, FICHAS_EN, FICHAS_CA } from '../../data/infoJuegosFichas'
import { buscarEnTuthor, relacionados } from '../descubre'

// Juegos que solo funcionan en algunos idiomas (games.js → idiomas): fuera de
// esos idiomas no se ofrecen en ningún sitio.
const LIMITADOS = Object.entries(GAMES).filter(([, g]) => g.idiomas)
const FICHAS = { es: FICHAS_ES, en: FICHAS_EN, ca: FICHAS_CA }

describe('juegos limitados a algunos idiomas', () => {
  it('los de ortografía, acentuación y métrica castellanas solo se ofrecen en castellano', () => {
    for (const id of ['que-letra', 'pon-la-tilde', 'mide-el-verso']) {
      expect(disponibleEn(id, 'es')).toBe(true)
      expect(disponibleEn(id, 'en')).toBe(false)
      expect(disponibleEn(`${id}-test`, 'ca')).toBe(false)
    }
    expect(disponibleEn('rebajas', 'en')).toBe(true)
  })

  it('no tienen ficha ni URL en los idiomas en que no funcionan', () => {
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8')
    for (const [id, g] of LIMITADOS) {
      const slug = g.route.replace('/juegos/', '')
      for (const l of ['es', 'en', 'ca']) {
        if (g.idiomas.includes(l)) continue
        expect(FICHAS[l][slug], `${id} tiene ficha en ${l}`).toBeUndefined()
        expect(sitemap.includes(`/${l}/info/juegos/${slug}<`), `${id} sigue en el sitemap en ${l}`).toBe(false)
      }
    }
  })

  it('no salen en el buscador ni en «Más para practicar» en otro idioma', () => {
    for (const [id, g] of LIMITADOS) {
      for (const l of ['en', 'ca']) {
        if (g.idiomas.includes(l)) continue
        expect(buscarEnTuthor(g.label[l] ?? g.label.es, l).some(r => r.ruta === g.route), `${id} en el buscador (${l})`).toBe(false)
        const rel = relacionados(`${id}-test`, l) ?? relacionados(id, l)
        if (rel) expect(rel.items.some(i => i.ruta === g.route || i.ruta.includes(`${id}-test`)), `${id} en relacionados (${l})`).toBe(false)
      }
    }
  })
})
