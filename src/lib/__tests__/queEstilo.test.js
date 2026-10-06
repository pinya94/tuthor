import { describe, it, expect } from 'vitest'
import { NIVELES, ESTILOS, ARCOS, COLUMNAS, VARIANTES, EPOCA, genRonda, esCorrecta, explicacion, textoOpcion, enunciado } from '../queEstilo'
import * as arq from '../../data/arteArquitectura'
import * as pin from '../../data/artePintura'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

describe('¿Qué estilo es? · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: opciones válidas y textos completos`, () => {
      const rand = semilla(nivel.length * 313)
      const tipos = new Set(), estilos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.pregunta)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.pregunta === 'estilo' || r.pregunta === 'epoca') {
          estilos.add(r.estilo)
          expect(VARIANTES[r.estilo]).toContain(r.variante)
          expect(r.opciones).toHaveLength(4)
        }
        if (r.pregunta === 'epoca') {
          // en orden cronológico, para que se lean como una línea del tiempo
          const ep = r.opciones.map(o => EPOCA[o])
          expect(ep).toEqual([...ep].sort((a, b) => a - b))
        }
        if (r.pregunta === 'arco') expect(ARCOS).toContain(r.bueno)
        if (r.pregunta === 'columna') expect(COLUMNAS).toContain(r.bueno)
        for (const l of L) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined/)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
      expect([...estilos].sort()).toEqual([...ESTILOS].sort())
    })
  }

  it('en el difícil, las opciones de estilo incluyen a los vecinos parecidos', () => {
    const rand = semilla(77)
    for (let i = 0; i < 300; i++) {
      const r = genRonda('dificil', { rand })
      if (r.pregunta !== 'estilo') continue
      if (r.estilo === 'romanico') expect(r.opciones).toContain('gotico')
      if (r.estilo === 'griego') expect(r.opciones).toContain('neoclasico')
      if (r.estilo === 'barroco') expect(r.opciones).toContain('renacimiento')
    }
  })
})

describe.each([['arquitectura', arq], ['pintura', pin]])('banco de %s', (_, b) => {
  it('24 preguntas en tres idiomas, cuatro opciones distintas y la buena la primera', () => {
    expect(b.PREGUNTAS).toHaveLength(24)
    expect(b.PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(10)
    expect(new Set(b.PREGUNTAS.map(p => p.id)).size).toBe(24)
    for (const p of b.PREGUNTAS) for (const l of L) {
      expect(p.opciones[l]).toHaveLength(4)
      expect(new Set(p.opciones[l]).size).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
      expect(p.pregunta[l] && p.explicacion[l]).toBeTruthy()
    }
  })
})
