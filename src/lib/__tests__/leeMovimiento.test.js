import { describe, it, expect } from 'vitest'
import { NIVELES, TRAMOS, genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado } from '../leeMovimiento'
import { PREGUNTAS, PREGUNTAS_ESO } from '../../data/movimiento'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

describe('Lee el movimiento · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: la respuesta sale de los puntos de la gráfica`, () => {
      const rand = semilla(nivel.length * 733)
      const tipos = new Set()
      for (let i = 0; i < 700; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.pts).toHaveLength(4)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        const [t0, y0] = r.pts[r.tramo], [t1, y1] = r.pts[r.tramo + 1]
        const pend = (y1 - y0) / (t1 - t0)
        if (r.tipo === 'velocidad' || r.tipo === 'aceleracion') expect(r.bueno).toBe(pend)
        if (r.tipo === 'que') {
          if (r.eje === 'x') expect(r.bueno).toBe(pend === 0 ? 'parado' : pend > 0 ? 'avanza' : 'retrocede')
          else expect(r.bueno).toBe(pend === 0 ? (y0 === 0 ? 'parado' : 'constante') : pend > 0 ? 'acelera' : 'frena')
        }
        if (r.tipo === 'rapido') {
          const v = [0, 1, 2].map(k => Math.abs((r.pts[k + 1][1] - r.pts[k][1]) / (r.pts[k + 1][0] - r.pts[k][0])))
          expect(r.bueno).toBe(TRAMOS[v.indexOf(Math.max(...v))])
        }
        if (r.tipo === 'recorrido') {
          const d = [0, 1, 2].reduce((s, k) => s + Math.abs(r.pts[k + 1][1] - r.pts[k][1]), 0)
          expect(r.bueno).toBe(d)
          expect(d).toBeGreaterThan(Math.abs(r.pts[3][1] - r.pts[0][1])) // hay vuelta atrás
        }
        if (r.tipo === 'area') {
          const area = k => ((r.pts[k][1] + r.pts[k + 1][1]) * (r.pts[k + 1][0] - r.pts[k][0])) / 2
          expect(r.bueno).toBe(r.total ? area(0) + area(1) + area(2) : area(r.tramo))
        }
        if (r.eje === 'v') for (const [, v] of r.pts) expect(v).toBeGreaterThanOrEqual(0)
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN|Infinity/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})

describe('El movimiento · banco de teoría', () => {
  it('24 preguntas en tres idiomas, cuatro opciones distintas y la buena la primera', () => {
    expect(PREGUNTAS).toHaveLength(24)
    expect(PREGUNTAS_ESO.length).toBeGreaterThanOrEqual(10)
    expect(new Set(PREGUNTAS.map(p => p.id)).size).toBe(PREGUNTAS.length)
    for (const p of PREGUNTAS) for (const l of L) {
      expect(p.opciones[l]).toHaveLength(4)
      expect(new Set(p.opciones[l]).size).toBe(4)
      expect(p.correcta[l]).toBe(p.opciones[l][0])
      expect(p.pregunta[l] && p.explicacion[l]).toBeTruthy()
    }
  })
})
