import { describe, it, expect } from 'vitest'
import {
  NIVELES, LIQUIDOS, OBJETOS, MARGEN, genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, fraccionSumergida,
} from '../flotaHunde'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

describe('¿Flota o se hunde? · datos', () => {
  it('cada objeto y líquido tiene nombre en los tres idiomas y densidad positiva', () => {
    for (const o of [...Object.values(OBJETOS), ...Object.values(LIQUIDOS)]) {
      expect(o.rho).toBeGreaterThan(0)
      for (const l of L) expect(o.nombre[l]).toBeTruthy()
    }
    for (const q of Object.values(LIQUIDOS)) for (const l of L) expect(q.conArticulo[l]).toBeTruthy()
  })
  it('las densidades de referencia se mantienen (las usan las explicaciones)', () => {
    expect(OBJETOS.hielo.rho).toBeLessThan(LIQUIDOS.agua.rho)
    expect(OBJETOS.huevo.rho).toBeGreaterThan(LIQUIDOS.agua.rho)
    expect(OBJETOS.huevo.rho).toBeLessThan(LIQUIDOS.muerto.rho)
    expect(OBJETOS.ebano.rho).toBeGreaterThan(LIQUIDOS.agua.rho)
    expect(OBJETOS.plomo.rho).toBeLessThan(LIQUIDOS.mercurio.rho)
    expect(OBJETOS.oro.rho).toBeGreaterThan(LIQUIDOS.mercurio.rho)
  })
})

describe('¿Flota o se hunde? · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas coherentes, con margen y variadas`, () => {
      const rand = semilla(nivel.length * 977)
      const buenos = new Set(), objetos = new Set(), liquidos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        const rl = LIQUIDOS[r.liquido].rho
        expect(NIVELES[nivel].liquidos).toContain(r.liquido)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        // La respuesta sale de la física, no de una tabla aparte
        if (r.masa !== null) expect(r.rho).toBeCloseTo(r.masa / r.V, 9)
        if (r.pregunta === 'flota') {
          expect(r.bueno).toBe(r.rho < rl ? 'flota' : 'hunde')
          expect(Math.abs(r.rho / rl - 1)).toBeGreaterThanOrEqual(MARGEN - 1e-9)
          if (r.masa !== null) expect(Number.isInteger(r.masa)).toBe(true)
        } else {
          expect(Number.isInteger(r.masa)).toBe(true)
          expect(r.opciones).toHaveLength(4)
          expect(r.rho * 100).toBeCloseTo(Math.round(r.rho * 100), 9) // cuenta exacta en la explicación
          if (r.bueno === 'hunde') expect(r.rho).toBeGreaterThan(rl)
          else expect(r.bueno).toBe(Math.round((r.rho / rl) * 100))
        }
        expect(fraccionSumergida(r)).toBeGreaterThan(0)
        expect(fraccionSumergida(r)).toBeLessThanOrEqual(1)
        if (nivel === 'facil') expect(r.masa).toBe(null)
        for (const l of L) {
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.question).not.toMatch(/undefined|NaN/)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
          for (const o of r.opciones) expect(textoOpcion(o, l)).not.toMatch(/undefined|NaN/)
        }
        buenos.add(String(r.bueno)); objetos.add(r.objeto); liquidos.add(r.liquido)
      }
      expect(buenos.has('flota') || buenos.size > 3).toBe(true)
      expect(buenos.has('hunde')).toBe(true)
      if (nivel !== 'dificil') expect(objetos.size).toBeGreaterThan(10)
      expect(liquidos.size).toBe(NIVELES[nivel].liquidos.length)
    })
  }

  it('flota y se hunde salen parejos', () => {
    const rand = semilla(42)
    let flota = 0
    for (let i = 0; i < 1000; i++) if (genRonda('medio', { rand }).bueno === 'flota') flota++
    expect(flota).toBeGreaterThan(400)
    expect(flota).toBeLessThan(600)
  })

  it('el género del líquido no se rompe: «más densidad que la miel»', () => {
    const r = { nivel: 'facil', liquido: 'miel', objeto: 'oro', rho: 19.3, masa: null, V: null, pregunta: 'flota', bueno: 'hunde', opciones: ['flota', 'hunde'] }
    expect(explicacion(r, 'es')).toContain('más densidad que la miel')
    expect(explicacion(r, 'ca')).toContain('més densitat que la mel')
  })
})
