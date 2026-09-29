// Páginas de entrada por curso (data/landingsCurso.js): que todo lo que
// enlazan exista, que el texto esté completo en los tres idiomas y que estén
// en el sitemap con la meta resuelta (sin eso no las encuentra nadie).
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { CURSOS_LANDING, LANDINGS } from '../../data/landingsCurso.js'
import { GAMES as CATALOGO } from '../../data/constants.js'
import { ARTE_JUEGOS, slugDeRuta } from '../../components/arte/index.jsx'
import { ARTE_TEMAS } from '../../components/arte/temas.jsx'
import { ARTE_MATERIAS } from '../../components/arte/materias.jsx'
import { resolveMeta } from '../../../scripts/seoMeta.mjs'

const IDIOMAS = ['es', 'en', 'ca']
const sitemap = fs.readFileSync(new URL('../../../public/sitemap.xml', import.meta.url), 'utf8')
const slugsCatalogo = new Set(CATALOGO.filter(g => g.ready !== false).map(g => slugDeRuta(g.path)))

describe('páginas por curso', () => {
  it('cada juego enlazado existe en el catálogo y tiene su dibujo', () => {
    for (const l of LANDINGS) {
      for (const slug of l.juegos) {
        expect(slugsCatalogo.has(slug), `${l.curso}/${l.materia}: ${slug} no está en el catálogo`).toBe(true)
        expect(ARTE_JUEGOS[slug], `${slug} sin arte`).toBeTruthy()
      }
    }
  })

  it('cada tema tiene dibujo y cada materia su portada', () => {
    for (const l of LANDINGS) {
      expect(ARTE_MATERIAS[l.arteMateria], l.materia).toBeTruthy()
      for (const t of l.temas) expect(ARTE_TEMAS[t.arte], `${l.materia}: ${t.arte}`).toBeTruthy()
    }
  })

  it('los textos están completos en es/en/ca', () => {
    const paginas = [...Object.values(CURSOS_LANDING), ...LANDINGS]
    for (const p of paginas) {
      for (const lang of IDIOMAS) {
        expect(p.titulo[lang], `titulo ${lang}`).toBeTruthy()
        expect(p.metaDesc[lang], `metaDesc ${lang}`).toBeTruthy()
        expect(p.intro[lang]?.length, `intro ${lang}`).toBeGreaterThan(0)
        if (p.practica) expect(p.practica[lang]?.length, `practica ${lang}`).toBeGreaterThan(0)
      }
    }
  })

  it('están en el sitemap en los tres idiomas, con meta propia', () => {
    const rutas = [
      ...Object.keys(CURSOS_LANDING).map(c => `/juegos/${c}`),
      ...LANDINGS.map(l => `/juegos/${l.curso}/${l.materia}`),
    ]
    for (const r of rutas) {
      for (const pre of ['', '/en', '/ca']) {
        expect(sitemap.includes(`<loc>https://www.tuthor.es${pre}${r}</loc>`), `${pre}${r} fuera del sitemap`).toBe(true)
      }
      const meta = resolveMeta(r, 'es')
      expect(meta?.title, `${r} sin meta`).toBeTruthy()
    }
  })
})
