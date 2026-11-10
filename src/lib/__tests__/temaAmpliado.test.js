import { describe, it, expect } from 'vitest'
import { AMPLIACION, ESTADOS_EEUU } from '../../data/temaAmpliado'
import { ORTOGRAFIA_TEMA } from '../../data/temaOrtografia'
import { CONTENIDO_TEMA } from '../../data/estudioTemaContenido'

const LANGS = ['es', 'en', 'ca']
const texto = x => (typeof x === 'string' ? [x] : LANGS.map(l => x[l]))

describe('ampliaciones de las páginas de estudio', () => {
  it('cada tema existe y todo está en los tres idiomas', () => {
    for (const [tema, a] of Object.entries({ ...AMPLIACION, ...ORTOGRAFIA_TEMA })) {
      expect(CONTENIDO_TEMA[tema], tema).toBeTruthy()
      if (a.metaTitle) for (const l of LANGS) expect(a.metaTitle[l], `${tema} ${l}`).toBeTruthy()
      for (const s of a.secciones ?? []) {
        for (const l of LANGS) expect(s.titulo[l], `${tema} sección ${l}`).toBeTruthy()
        if (s.tabla) {
          const n = s.tabla.columnas.es.length
          for (const l of LANGS) expect(s.tabla.columnas[l].length).toBe(n)
          for (const f of s.tabla.filas) {
            expect(f.length, `${tema}: fila de ${n} columnas`).toBe(n)
            for (const c of f) for (const t of texto(c)) expect(t, `${tema}: celda vacía`).toBeTruthy()
          }
        }
        for (const k of ['texto', 'lista']) if (s[k]) for (const l of LANGS) expect(s[k][l]?.length, `${tema} ${k} ${l}`).toBe(s[k].es.length)
      }
      for (const q of [...(a.preguntas ?? []), ...(a.ejercicios ?? [])]) {
        for (const x of Object.values(q)) for (const t of texto(x)) expect(t, tema).toBeTruthy()
      }
    }
  })

  it('los 50 estados, sin repetir', () => {
    expect(ESTADOS_EEUU).toHaveLength(50)
    expect(new Set(ESTADOS_EEUU.map(e => e[1])).size).toBe(50)
  })
})

describe('páginas de ortografía', () => {
  it('cada tema trae meta, resumen y puntos clave en los tres idiomas, del mismo largo', () => {
    for (const [slug, c] of Object.entries(ORTOGRAFIA_TEMA)) {
      for (const l of LANGS) {
        expect(c.metaDesc[l].length, `${slug} metaDesc ${l}`).toBeLessThanOrEqual(180)
        expect(c.resumen[l].length, slug).toBe(c.resumen.es.length)
        expect(c.puntosClave[l].length, slug).toBe(c.puntosClave.es.length)
      }
      expect(c.ejercicios.length, slug).toBeGreaterThanOrEqual(4)
    }
  })
})
