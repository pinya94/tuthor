// Invariantes del mapa del temario.
//
// El mapa es la única página que promete enseñar TODO lo que hay. Un fallo
// aquí no se ve —simplemente falta una materia, o un tema sale con su id
// crudo— así que lo que más se vigila es la cobertura: que no se pierda nada
// por el camino y que nada llegue a pantalla sin traducir.
import { describe, it, expect } from 'vitest'
import {
  construirTemario, filtrarPorNivel, contarTemario, temasTocados,
} from '../temario.js'
import { TOPIC_SUBJECT_IDS, topicIds, topicFormats } from '../topicCatalog.js'
import { NIVEL_IDS } from '../nivel.js'

const TEMARIO_ES = construirTemario('es')

describe('cobertura: no se pierde nada', () => {
  it('están todas las materias del catálogo que tienen algo jugable', () => {
    const conActividades = TOPIC_SUBJECT_IDS.filter(m =>
      topicIds(m).some(t => topicFormats(m, t).length > 0))
    expect(TEMARIO_ES.map(m => m.id).sort()).toEqual([...conActividades].sort())
  })

  it('cada materia trae todos sus temas jugables', () => {
    for (const m of TEMARIO_ES) {
      const esperados = topicIds(m.id).filter(t => topicFormats(m.id, t).length > 0)
      expect(m.temas.map(t => t.id).sort(), `materia ${m.id}`).toEqual([...esperados].sort())
    }
  })

  it('el recuento de actividades coincide con el catálogo, una a una', () => {
    let esperadas = 0
    for (const m of TOPIC_SUBJECT_IDS) {
      for (const t of topicIds(m)) esperadas += topicFormats(m, t).length
    }
    expect(contarTemario(TEMARIO_ES).actividades).toBe(esperadas)
  })
})

describe('nada llega a pantalla sin traducir', () => {
  for (const lang of ['es', 'en', 'ca']) {
    it(`en ${lang}, ninguna etiqueta cae al id crudo`, () => {
      const temario = construirTemario(lang)
      for (const m of temario) {
        // Una etiqueta igual al id (kebab-case) delata que faltó la
        // traducción y el usuario vería "tabla-periodica" en pantalla.
        expect(m.label, `materia ${m.id}`).not.toBe(m.id)
        for (const t of m.temas) {
          expect(t.label, `tema ${m.id}/${t.id}`).not.toBe(t.id)
          expect(t.label.trim(), `tema ${m.id}/${t.id} vacío`).not.toBe('')
          for (const f of t.formatos) {
            expect(f.label, `formato ${m.id}/${t.id}/${f.id}`).not.toBe(f.id)
            expect(f.emoji, `formato ${m.id}/${t.id}/${f.id} sin emoji`).toBeTruthy()
          }
        }
      }
    })
  }
})

describe('cada actividad lleva a algún sitio', () => {
  it('toda ruta es /examen/<materia>/<tema>/<formato>', () => {
    for (const m of TEMARIO_ES) {
      for (const t of m.temas) {
        for (const f of t.formatos) {
          expect(f.ruta, `${m.id}/${t.id}/${f.id}`).toBe(`/examen/${m.id}/${t.id}/${f.id}`)
        }
      }
    }
  })

  it('no hay temas sin actividades (filas que no llevan a nada)', () => {
    for (const m of TEMARIO_ES) {
      for (const t of m.temas) {
        expect(t.formatos.length, `${m.id}/${t.id}`).toBeGreaterThan(0)
      }
    }
  })
})

describe('los niveles del tema salen del catálogo, no de sus formatos', () => {
  // Regresión de un bug real: derivar los niveles de los formatos hacía que
  // casi ningún tema se filtrara nunca. `niveles: []` en un formato significa
  // "este formato no tiene DIFICULTAD" (los tipo test, ¿Quién es quién?), no
  // "este tema vale para cualquier curso". Son dos ejes distintos, y como casi
  // todos los temas tienen al menos un formato sin dificultad, confundirlos
  // dejaba el filtro sin efecto.
  const gce = TEMARIO_ES.find(m => m.id === 'historia').temas.find(t => t.id === 'gce')

  it('la Guerra Civil es de ESO y Bachillerato, pese a tener formatos sin dificultad', () => {
    expect(gce.formatos.some(f => f.niveles.length === 0), 'el caso solo prueba algo si hay un formato sin dificultad').toBe(true)
    expect(gce.niveles).toEqual(['eso', 'bachillerato'])
  })

  it('y por tanto no aparece si el curso elegido es Primaria', () => {
    const enPrimaria = filtrarPorNivel(TEMARIO_ES, 'primaria')
    const historia = enPrimaria.find(m => m.id === 'historia')
    expect(historia?.temas.map(t => t.id) ?? []).not.toContain('gce')
  })
})

describe('filtrarPorNivel — la regla de oro', () => {
  it('sin curso elegido devuelve el temario intacto', () => {
    expect(filtrarPorNivel(TEMARIO_ES, null)).toBe(TEMARIO_ES)
    expect(contarTemario(filtrarPorNivel(TEMARIO_ES, null)))
      .toEqual(contarTemario(TEMARIO_ES))
  })

  it('con curso elegido nunca añade nada, solo quita', () => {
    const total = contarTemario(TEMARIO_ES)
    for (const nivel of NIVEL_IDS) {
      const c = contarTemario(filtrarPorNivel(TEMARIO_ES, nivel))
      expect(c.temas, `${nivel} no puede añadir temas`).toBeLessThanOrEqual(total.temas)
      expect(c.actividades, `${nivel}`).toBeLessThanOrEqual(total.actividades)
    }
  })

  it('cada curso deja contenido de verdad: ninguno se queda a cero', () => {
    // Si un curso vaciara el mapa, el filtro estaría roto y el alumno de ese
    // curso vería una página en blanco donde se le prometía todo.
    for (const nivel of NIVEL_IDS) {
      const c = contarTemario(filtrarPorNivel(TEMARIO_ES, nivel))
      expect(c.materias, `${nivel} se queda sin materias`).toBeGreaterThan(0)
      expect(c.temas, `${nivel} se queda sin temas`).toBeGreaterThan(0)
    }
  })

  it('un tema sin restricción de nivel sobrevive a los tres cursos', () => {
    const libres = TEMARIO_ES.flatMap(m =>
      m.temas.filter(t => t.niveles.length === 0).map(t => `${m.id}/${t.id}`))
    for (const nivel of NIVEL_IDS) {
      const vivos = new Set(filtrarPorNivel(TEMARIO_ES, nivel)
        .flatMap(m => m.temas.map(t => `${m.id}/${t.id}`)))
      for (const id of libres) {
        expect(vivos.has(id), `${id} debería valer para ${nivel}`).toBe(true)
      }
    }
  })
})

describe('temasTocados', () => {
  it('sin stats no marca nada, y no revienta', () => {
    expect(temasTocados(null).size).toBe(0)
    expect(temasTocados(undefined).size).toBe(0)
    expect(temasTocados({}).size).toBe(0)
  })

  it('una partida con category de un tema marca ese tema', () => {
    const tocados = temasTocados({ statsByCategory: { gce: { plays: 3 } } })
    expect(tocados.has('historia/gce')).toBe(true)
  })

  it('cero partidas no cuenta como tocado', () => {
    expect(temasTocados({ statsByCategory: { gce: { plays: 0 } } }).has('historia/gce')).toBe(false)
  })

  it('solo marca lo jugado: no contamina temas vecinos de la misma materia', () => {
    const tocados = temasTocados({ statsByCategory: { gce: { plays: 1 } } })
    expect(tocados.has('historia/gce')).toBe(true)
    expect(tocados.has('historia/roma')).toBe(false)
  })
})
