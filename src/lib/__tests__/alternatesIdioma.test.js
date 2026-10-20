import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { moduloAlternates } from '../../../scripts/gen-alternates.mjs'
import { idiomasDe } from '../idiomasPagina'

const sitemap = readFileSync('public/sitemap.xml', 'utf8')

describe('hreflang: solo los idiomas que existen', () => {
  it('src/data/alternatesIdioma.js está al día con el sitemap (si falla: node scripts/gen-alternates.mjs)', () => {
    const actual = readFileSync('src/data/alternatesIdioma.js', 'utf8').split('\r\n').join('\n')
    expect(actual).toBe(moduloAlternates(sitemap))
  })

  it('cada idioma anunciado tiene su URL en el sitemap', () => {
    const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname.replace(/\/$/, '') || '/'))
    for (const loc of locs) {
      const neutral = loc.replace(/^\/(en|ca)(?=\/|$)/, '') || '/'
      for (const l of idiomasDe(neutral)) {
        const url = l === 'es' ? neutral : neutral === '/' ? `/${l}` : `/${l}${neutral}`
        expect(locs.has(url), `${neutral} anuncia ${l}`).toBe(true)
      }
    }
  })

  it('un examen solo en castellano no anuncia inglés; uno traducido sí', () => {
    expect(idiomasDe('/examen/frases-sintaxis-test')).toEqual(['es'])
    expect(idiomasDe('/')).toEqual(['es', 'en', 'ca'])
  })
})
