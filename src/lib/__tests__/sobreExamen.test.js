import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { SOBRE_EXAMEN } from '../../data/sobreExamen'
import { SOBRE_PAGINA } from '../../data/sobrePagina'

// Los textos de «Sobre este examen» van por URL: si la URL cambia o se
// retira, el bloque deja de salir sin avisar. Y un idioma vacío pinta un hueco.
describe('«Sobre este examen» (data/sobreExamen.js)', () => {
  const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8')
  const TODO = { ...SOBRE_EXAMEN, ...Object.fromEntries(Object.entries(SOBRE_PAGINA).map(([k, v]) => [k, v.parrafos])) }
  it('cada URL existe en el sitemap', () => {
    for (const ruta of Object.keys(TODO)) {
      expect(sitemap.includes(`https://www.tuthor.es${ruta}<`), ruta).toBe(true)
    }
  })
  it('cada párrafo está en los tres idiomas', () => {
    for (const [ruta, ps] of Object.entries(TODO)) {
      expect(ps.length, ruta).toBeGreaterThan(0)
      for (const p of ps) for (const l of ['es', 'en', 'ca']) expect(p[l]?.length, `${ruta} ${l}`).toBeGreaterThan(80)
    }
  })
})
