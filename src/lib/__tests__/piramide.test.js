import { describe, it, expect } from 'vitest'
import { NIVELES, GRUPOS, TIPOS, construir, genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado } from '../piramide'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']
const total = p => p.h.map((x, i) => x + p.m[i])

describe('Pirámide de población · formas', () => {
  it('cada tipo tiene la forma de libro', () => {
    const rand = semilla(3)
    for (let n = 0; n < 50; n++) {
      const pro = total(construir('progresiva', null, rand))
      expect(pro[0]).toBe(Math.max(...pro)) // base, lo más ancho
      const reg = total(construir('regresiva', null, rand))
      expect(Math.max(...reg.slice(6, 12))).toBeGreaterThan(reg[0] * 1.3) // centro más ancho que la base
      const est = total(construir('estacionaria', null, rand))
      expect(est[8] / est[0]).toBeGreaterThan(0.8) // casi igual hasta los 40
    }
  })

  it('arriba siempre hay más mujeres; la inmigración solo engorda a los hombres de 20-44', () => {
    const rand = semilla(4)
    for (const t of TIPOS) {
      const p = construir(t, null, rand)
      for (const i of [15, 16, 17]) expect(p.m[i]).toBeGreaterThan(p.h[i] * 1.2)
      const q = construir(t, 'inmigracion', rand)
      for (const i of [4, 5, 6, 7, 8]) expect(q.h[i]).toBeGreaterThan(q.m[i] * 1.5)
      expect(q.h[2]).toBeLessThan(q.m[2] * 1.1)
    }
  })
})

describe('Pirámide de población · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas coherentes`, () => {
      const rand = semilla(nivel.length * 613)
      const preguntas = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        preguntas.add(r.pregunta)
        expect(r.h).toHaveLength(GRUPOS)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        const tot = total(r)
        if (r.pregunta === 'grupo') {
          expect(tot[r.bueno]).toBe(Math.max(...tot))
          for (const o of r.opciones) if (o !== r.bueno) expect(tot[r.bueno]).toBeGreaterThan(tot[o] * 1.06)
        }
        if (r.pregunta === 'sexo') {
          const [a, b] = r.franja
          const h = r.h.slice(a, b + 1).reduce((x, y) => x + y), m = r.m.slice(a, b + 1).reduce((x, y) => x + y)
          expect(r.bueno).toBe(h > m * 1.15 ? 'hombres' : m > h * 1.15 ? 'mujeres' : 'igual')
        }
        if (r.pregunta === 'cuando') {
          const [d, h] = r.bueno.split('-').map(Number)
          expect(h - d).toBe(4)
          expect(r.censo - h).toBe(r.marca[0] * 5) // edad del grupo
        }
        if (r.pregunta === 'rasgo' && (r.rasgo === 'hueco' || r.rasgo === 'boom')) {
          const k = r.marca[0]
          // el grupo marcado se sale de la línea de sus vecinos
          const vecinos = (tot[k - 1] + tot[k + 1]) / 2
          if (r.rasgo === 'hueco') expect(tot[k]).toBeLessThan(vecinos * 0.8)
          else expect(tot[k]).toBeGreaterThan(vecinos * 1.1)
        }
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          if (q) expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...preguntas].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})
