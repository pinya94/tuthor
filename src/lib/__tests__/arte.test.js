// Arte propio (src/components/arte): toda miniatura de juego y todo curso
// llevan una ilustración SVG hecha para ellos, no un emoji. Un juego nuevo
// que no traiga su dibujo rompe este test.
import { describe, it, expect } from 'vitest'
import { GAMES } from '../../data/constants.js'
import { GRADO_IDS } from '../mathEngine.js'
import { GAMES as REGISTRO } from '../games.js'
import { ARTE_JUEGOS, slugDeRuta } from '../../components/arte/index.jsx'
import { ARTE_CURSOS, GLIFOS_CURSO } from '../../components/arte/cursos.jsx'
import { ARTE_MATERIAS } from '../../components/arte/materias.jsx'
import { MATERIAS_ESTUDIO } from '../../data/materiasEstudio.js'

describe('arte de los juegos', () => {
  it('todo juego del catálogo tiene su ilustración', () => {
    const sinArte = GAMES.filter(g => g.ready).map(g => slugDeRuta(g.path)).filter(s => !ARTE_JUEGOS[s])
    expect(sinArte, `juegos sin ilustración en src/components/arte: ${sinArte.join(', ')}`).toEqual([])
  })

  it('no hay ilustraciones huérfanas de juegos que ya no existen', () => {
    const slugs = new Set(GAMES.map(g => slugDeRuta(g.path)))
    const huerfanas = Object.keys(ARTE_JUEGOS).filter(s => !slugs.has(s))
    expect(huerfanas, `arte sin juego: ${huerfanas.join(', ')}`).toEqual([])
  })

  it('cada ilustración se puede pintar sin errores', () => {
    // Son componentes puros sin hooks: llamarlos en seco ejecuta sus bucles y
    // helpers (estrellas, flechas…) y caza cualquier error de ejecución.
    for (const [slug, Arte] of Object.entries(ARTE_JUEGOS)) {
      expect(() => Arte({}), slug).not.toThrow()
    }
  })

  it('la pantalla final encuentra el arte de cada juego del registro', () => {
    // GameEndScreen busca el dibujo por la ruta del juego en src/lib/games.js.
    const sinArte = Object.entries(REGISTRO)
      .filter(([, g]) => slugDeRuta(g.route))
      .filter(([, g]) => !ARTE_JUEGOS[slugDeRuta(g.route)])
      .map(([id, g]) => `${id} (${g.route})`)
    expect(sinArte, `juegos del registro sin arte: ${sinArte.join(', ')}`).toEqual([])
  })

  it('slugDeRuta saca el slug con o sin idioma', () => {
    expect(slugDeRuta('/juegos/reloj-horas')).toBe('reloj-horas')
    expect(slugDeRuta('/en/juegos/el-cambio')).toBe('el-cambio')
    expect(slugDeRuta('/estudiar')).toBe(null)
  })
})

describe('arte de las materias', () => {
  it('cada materia de /estudiar tiene su ilustración, y ninguna sobra', () => {
    const ids = MATERIAS_ESTUDIO.map(m => m.id)
    expect(ids.filter(id => !ARTE_MATERIAS[id]), 'materias sin ilustración').toEqual([])
    expect(Object.keys(ARTE_MATERIAS).filter(id => !ids.includes(id)), 'arte sin materia').toEqual([])
    for (const [id, Arte] of Object.entries(ARTE_MATERIAS)) expect(() => Arte({}), id).not.toThrow()
  })
})

describe('arte de los cursos', () => {
  it('cada curso tiene ilustración y glifo, y "todas" su glifo', () => {
    for (const id of GRADO_IDS) {
      expect(ARTE_CURSOS[id], `sin ilustración: ${id}`).toBeTruthy()
      expect(GLIFOS_CURSO[id], `sin glifo: ${id}`).toBeTruthy()
    }
    expect(GLIFOS_CURSO.todas).toBeTruthy()
  })
})
