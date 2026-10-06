import { describe, it, expect } from 'vitest'
import { NIVELES, CLIMAS, genRonda, genClima, clasificar, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado } from '../climograma'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

describe('Climograma · climas generados', () => {
  it('cada tipo sale reconocible y sin meses pegados a la línea de Gaussen', () => {
    const rand = semilla(4242)
    for (const tipo of CLIMAS) for (const sur of [false, true]) {
      if (sur && tipo === 'continental') continue
      for (let i = 0; i < 150; i++) {
        const c = genClima(tipo, rand, sur)
        expect(clasificar(c)).toBe(tipo)
        expect(c.T).toHaveLength(12)
        for (let m = 0; m < 12; m++) {
          expect(Math.abs(c.P[m] - 2 * c.T[m])).toBeGreaterThanOrEqual(6)
          expect(c.P[m]).toBeGreaterThanOrEqual(0)
        }
        // En el sur, el mes más cálido cae entre noviembre y marzo.
        const iMax = c.T.indexOf(Math.max(...c.T))
        if (tipo !== 'ecuatorial') expect(sur ? [10, 11, 0, 1, 2].includes(iMax) : [4, 5, 6, 7, 8].includes(iMax)).toBe(true)
      }
    }
  })
})

describe('Climograma · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: la respuesta sale de los datos`, () => {
      const rand = semilla(nivel.length * 991)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.pregunta)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        const tmax = Math.max(...r.T), tmin = Math.min(...r.T)
        if (r.pregunta === 'clima') expect(r.bueno).toBe(clasificar(r))
        if (r.pregunta === 'calido') {
          expect(r.T[r.bueno]).toBe(tmax)
          for (const o of r.opciones) if (o !== r.bueno) expect(tmax - r.T[o]).toBeGreaterThanOrEqual(2)
        }
        if (r.pregunta === 'lluvioso') {
          expect(r.P[r.bueno]).toBe(Math.max(...r.P))
          for (const o of r.opciones) if (o !== r.bueno) expect(r.P[r.bueno] - r.P[o]).toBeGreaterThanOrEqual(12)
        }
        if (r.pregunta === 'amplitud') {
          expect(r.bueno).toBe(tmax - tmin)
          const ord = [...r.opciones].sort((a, b) => a - b)
          for (let k = 1; k < ord.length; k++) expect(ord[k] - ord[k - 1]).toBeGreaterThanOrEqual(4)
        }
        if (r.pregunta === 'secos') expect(r.bueno).toBe(r.P.filter((p, m) => p < 2 * r.T[m]).length)
        if (r.pregunta === 'hemisferio') {
          const iMax = r.T.indexOf(tmax)
          expect(r.bueno).toBe([10, 11, 0, 1, 2].includes(iMax) ? 'sur' : 'norte')
        }
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})
