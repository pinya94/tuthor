// Arte propio (src/components/arte): toda miniatura de juego y todo curso
// llevan una ilustración SVG hecha para ellos, no un emoji. Un juego nuevo
// que no traiga su dibujo rompe este test.
import { describe, it, expect } from 'vitest'
import { GAMES } from '../../data/constants.js'
import { GRADO_IDS, MODO_IDS } from '../mathEngine.js'
import { TEMAS_MATEMATICAS_EXTRA } from '../../data/temasMatematicas.js'
import { GAMES as REGISTRO } from '../games.js'
import { ARTE_JUEGOS, slugDeRuta } from '../../components/arte/index.jsx'
import { ARTE_CURSOS, GLIFOS_CURSO } from '../../components/arte/cursos.jsx'
import { ARTE_MATERIAS } from '../../components/arte/materias.jsx'
import { MATERIAS_ESTUDIO } from '../../data/materiasEstudio.js'
import { ARTE_TEMAS } from '../../components/arte/temas.jsx'
import { topicIds } from '../topicCatalog.js'
import { TEMA_DISCIPLINA } from '../../data/ciencias.js'

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

describe('arte de los temas', () => {
  // Los temas con tarjeta propia: historia (topicCatalog) y ciencias
  // (data/ciencias.js). Un tema nuevo en esos hubs sin dibujo rompe esto.
  const esperadas = [
    ...topicIds('historia').map(id => `historia/${id}`),
    ...Object.entries(TEMA_DISCIPLINA).map(([id, disc]) => `${disc}/${id}`),
    ...topicIds('geografia').map(id => `geografia/${id}`),
    ...[...MODO_IDS, ...TEMAS_MATEMATICAS_EXTRA.map(t => t.id)].map(id => `matematicas/${id}`),
    // Lengua: las rejillas de EspanolGramaticaIndex, InglesGrammarIndex y
    // EspanolOrtografiaIndex (+ portadas). La gramática inglesa reutiliza los
    // conceptos de la castellana (CONCEPTO_INGLES).
    ...['sustantivos', 'adjetivos', 'determinantes', 'pronombres', 'verbos', 'adverbios', 'nexos', 'sintaxis', 'morfologia'].map(id => `gramatica/${id}`),
    ...['present-simple', 'past-simple', 'present-perfect', 'articles', 'passive'].map(id => `ingles/${id}`),
    ...['acentuacion', 'bv', 'gj', 'puntuacion', 'correccion'].map(id => `ortografia/${id}`),
    'lengua/gramatica', 'lengua/literatura', 'lengua/textos', 'lengua/figuras',
    // Música y Economía (MusicaIndex, EconomiaIndex).
    'musica/notas', 'musica/ritmo', 'musica/instrumentos', 'economia/finanzas-personales', 'economia/punto-equilibrio', 'economia/mercado',
  ]

  it('cada tema de historia y ciencias tiene su ilustración', () => {
    expect(esperadas.filter(k => !ARTE_TEMAS[k]), 'temas sin ilustración').toEqual([])
  })

  it('no sobra arte de temas que no existen, y todo se pinta', () => {
    expect(Object.keys(ARTE_TEMAS).filter(k => !esperadas.includes(k)), 'arte sin tema').toEqual([])
    for (const [k, Arte] of Object.entries(ARTE_TEMAS)) expect(() => Arte({}), k).not.toThrow()
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
