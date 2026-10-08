import { describe, it, expect } from 'vitest'
import { FICHAS_ES, FICHAS_EN, FICHAS_CA } from '../../data/infoJuegosFichas'
import { GAMES } from '../games'
import { EXAMS, examRoute } from '../exams'
import { rutaDeAlternativa, relacionados, buscarEnTuthor } from '../descubre'

// Rutas a las que puede llevar un enlace de «descubrir»: juegos, exámenes,
// páginas de estudio y hubs de materia.
const RUTAS_JUEGO = new Set(Object.values(GAMES).map(g => g.route).filter(Boolean))
const RUTAS_EXAMEN = new Set(Object.keys(EXAMS).map(examRoute).filter(Boolean))
const valida = r => RUTAS_JUEGO.has(r) || RUTAS_EXAMEN.has(r) || /^\/(estudiar|examen)\//.test(r)

describe('alternativas de las fichas', () => {
  for (const [lang, F] of [['es', FICHAS_ES], ['en', FICHAS_EN], ['ca', FICHAS_CA]]) {
    it(`${lang}: cada alternativa enlazada lleva a una ruta real`, () => {
      for (const [slug, f] of Object.entries(F)) {
        for (const a of f.alternativas || []) {
          const r = rutaDeAlternativa(a.nombre, lang)
          if (r) expect(valida(r), `${slug} → «${a.nombre}» → ${r}`).toBe(true)
        }
      }
    })
  }

  it('un examen nombrado lleva al examen, no a un juego del tema', () => {
    expect(rutaDeAlternativa('El examen de Finanzas Personales', 'es')).toBe('/examen/finanzas-personales')
    expect(rutaDeAlternativa("L'examen de Primers Auxilis", 'ca')).toBe('/examen/primeros-auxilios')
  })

  it('las actividades en papel no se enlazan', () => {
    for (const n of ['Mapa mudo', 'Balanza real con pesas', 'Tiras de fracciones de papel']) {
      expect(rutaDeAlternativa(n, 'es')).toBeNull()
    }
  })
})

describe('relacionados y buscador', () => {
  it('un juego del catálogo encuentra su tema y enlaza a rutas reales', () => {
    const rel = relacionados('climograma', 'es')
    expect(rel).not.toBeNull()
    for (const i of rel.items) expect(valida(i.ruta) || /^\/estudiar/.test(i.ruta), i.ruta).toBe(true)
  })

  it('el buscador ignora tildes', () => {
    expect(buscarEnTuthor('celula', 'es').length).toBeGreaterThan(0)
  })
})
