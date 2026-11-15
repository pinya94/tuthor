import { describe, it, expect } from 'vitest'
import { feature } from 'topojson-client'
import { geoContains } from 'd3-geo'
import mundo from 'world-atlas/countries-110m.json'
import {
  CONTINENTES, OCEANOS, MARES, PAISES, RUTAS, NIVELES, SIN_CONTINENTE,
  continentesDe, nombresMapeados, genRonda, esCorrecta, enunciado, explicacion, schemaQuestion,
} from '../continentesOceanos'

const paises = feature(mundo, mundo.objects.countries).features

describe('Continentes y Océanos', () => {
  it('cada país del mapa tiene continente (o está apartado a propósito)', () => {
    const mapeados = new Set([...nombresMapeados(), ...SIN_CONTINENTE])
    expect(paises.map(f => f.properties.name).filter(n => !mapeados.has(n))).toEqual([])
  })

  it('los puntos de océanos y mares caen en el agua, no sobre un país', () => {
    const puntos = [
      ...Object.entries(OCEANOS).flatMap(([k, o]) => o.puntos.map(p => [k, p])),
      ...Object.entries(MARES).map(([k, m]) => [k, m.punto]),
    ]
    for (const [k, p] of puntos) {
      const encima = paises.filter(f => geoContains(f, p)).map(f => f.properties.name)
      expect(encima, `${k} ${p}`).toEqual([])
    }
  })

  it('los países de las preguntas existen en el mapa con ese continente y uno solo', () => {
    // Coordenada aproximada de cada país preguntado: comprueba que el
    // continente pedido es el único que da el mapa al tocarlo.
    const enMapa = { kenia: 'Kenya', nigeria: 'Nigeria', marruecos: 'Morocco', sudafrica: 'South Africa', etiopia: 'Ethiopia', madagascar: 'Madagascar', argentina: 'Argentina', peru: 'Peru', canada: 'Canada', mexico: 'Mexico', cuba: 'Cuba', colombia: 'Colombia', japon: 'Japan', india: 'India', tailandia: 'Thailand', 'arabia-saudi': 'Saudi Arabia', vietnam: 'Vietnam', mongolia: 'Mongolia', filipinas: 'Philippines', noruega: 'Norway', polonia: 'Poland', islandia: 'Iceland', finlandia: 'Finland', grecia: 'Greece', australia: 'Australia', 'nueva-zelanda': 'New Zealand', 'papua-nueva-guinea': 'Papua New Guinea', fiyi: 'Fiji' }
    expect(Object.keys(enMapa).sort()).toEqual(Object.keys(PAISES).sort())
    const nombres = new Set(paises.map(f => f.properties.name))
    for (const [id, n] of Object.entries(enMapa)) {
      expect(nombres.has(n), n).toBe(true)
      expect(continentesDe(n, 0, 0), id).toEqual([PAISES[id].c])
    }
  })

  it('los transcontinentales valen para los dos continentes; Rusia se parte en los Urales', () => {
    expect(continentesDe('Turkey', 33, 39)).toEqual(['europa', 'asia'])
    expect(continentesDe('Russia', 38, 55)).toEqual(['europa'])
    expect(continentesDe('Russia', 100, 60)).toEqual(['asia'])
    expect(continentesDe('Russia', -175, 66)).toEqual(['asia']) // Chukotka, al otro lado del antimeridiano
    expect(continentesDe('France', -53, 4)).toEqual(['america'])
    expect(continentesDe('France', 2, 47)).toEqual(['europa'])
    expect(continentesDe('Spain', -15.5, 28)).toEqual(['europa', 'africa'])
    expect(continentesDe('Indonesia', 138, -4)).toEqual(['asia', 'oceania'])
    expect(continentesDe('Fr. S. Antarctic Lands', 69, -49)).toEqual([])
  })

  it('las rondas de cada nivel se corrigen bien y tienen textos en los tres idiomas', () => {
    for (const nivel of Object.keys(NIVELES)) {
      for (let i = 0; i < 60; i++) {
        const r = genRonda(nivel)
        expect(NIVELES[nivel].tipos).toContain(r.tipo)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l).length, r.id).toBeGreaterThan(5)
          expect(explicacion(r, l).length, r.id).toBeGreaterThan(20)
        }
        if (r.tipo === 'continente' || r.tipo === 'pais') {
          expect(esCorrecta(r, `c:${r.objetivo}`)).toBe(true)
          expect(esCorrecta(r, `c:europa+asia`)).toBe(r.objetivo === 'europa' || r.objetivo === 'asia')
          expect(esCorrecta(r, `o:${r.objetivo}`)).toBe(false)
        } else if (r.tipo === 'oceano' || r.tipo === 'ruta') {
          expect(OCEANOS[r.objetivo]).toBeTruthy()
          expect(esCorrecta(r, `o:${r.objetivo}`)).toBe(true)
          expect(esCorrecta(r, 'o:otro')).toBe(false)
        } else {
          expect(MARES[r.objetivo]).toBeTruthy()
          expect(esCorrecta(r, `m:${r.objetivo}`)).toBe(true)
        }
        expect(esCorrecta(r, null)).toBe(false)
      }
    }
  })

  it('el schema solo publica las preguntas que se entienden sin mapa, con la buena entre las opciones', () => {
    for (const ruta of RUTAS) {
      const q = schemaQuestion({ tipo: 'ruta', a: ruta.a, b: ruta.b, objetivo: ruta.o }, 'es')
      expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      expect(q.wrongAnswers).toHaveLength(3)
    }
    expect(schemaQuestion({ tipo: 'continente', objetivo: 'asia' }, 'es')).toBeNull()
    expect(Object.keys(CONTINENTES)).toHaveLength(6)
    expect(Object.keys(OCEANOS)).toHaveLength(5)
  })
})
