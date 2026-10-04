import { describe, it, expect } from 'vitest'
import { resolver, conduce, atajo, genRound, isCorrect, explicacion, firma } from '../circuito'
import { trazado } from '../../components/CircuitoDiagrama'

const B = id => ({ t: 'b', id }), S = (id, c) => ({ t: 's', id, cerrado: c }), F = id => ({ t: 'f', id })
const ser = (...h) => ({ t: 'ser', hijos: h }), par = (...h) => ({ t: 'par', hijos: h })
function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }

describe('Circuito · solver', () => {
  it('serie: un interruptor abierto lo apaga todo', () => {
    expect(resolver(ser(S('i1', false), B('b1'), B('b2'))).estados).toEqual({ b1: 'apagada', b2: 'apagada' })
    expect(resolver(ser(S('i1', true), B('b1'), B('b2'))).estados).toEqual({ b1: 'encendida', b2: 'encendida' })
  })
  it('paralelo: cada rama por su cuenta', () => {
    const r = resolver(par(ser(S('i1', true), B('b1')), ser(S('i2', false), B('b2'))))
    expect(r.estados).toEqual({ b1: 'encendida', b2: 'apagada' })
    expect(r.causas.b2).toBe('abierto')
  })
  it('un atajo cerrado cortocircuita las ramas de al lado', () => {
    const r = resolver(ser(S('i1', true), B('b1'), par(B('b2'), S('i2', true))))
    expect(r.estados).toEqual({ b1: 'encendida', b2: 'apagada' })
    expect(r.causas.b2).toBe('corto')
    expect(resolver(ser(S('i1', true), B('b1'), par(B('b2'), S('i2', false)))).estados.b2).toBe('encendida')
  })
  it('una fundida corta su camino, no el de las otras ramas', () => {
    const r = resolver(par(ser(S('i1', true), B('b1'), F('f1')), ser(S('i2', true), B('b2'))))
    expect(r.estados).toEqual({ b1: 'apagada', b2: 'encendida' })
  })
  it('atajo y conduce', () => {
    expect(atajo(ser(S('a', true), S('b', true)))).toBe(true)
    expect(atajo(ser(S('a', true), B('b')))).toBe(false)
    expect(conduce(par(F('f'), S('a', false)))).toBe(false)
  })
})

describe('Circuito · generador', () => {
  for (const nivel of ['facil', 'medio', 'dificil']) {
    it(`${nivel}: variado, coherente y dibujable`, () => {
      const rand = semilla(nivel.length * 101)
      const firmas = new Set()
      for (let n = 0; n < 400; n++) {
        const r = genRound(nivel, rand)
        firmas.add(firma(r.arbol))
        expect(atajo(r.arbol)).toBe(false) // nunca la pila en cortocircuito
        const pred = new Map(r.bombillas.map(b => [b.id, b.estado]))
        expect(isCorrect(r, pred)).toBe(true)
        expect(explicacion(r, 'es')).toHaveLength(r.bombillas.length)
        // el dibujo tiene sitio para cada pieza, y numera las bombillas en orden
        const t = trazado(r.arbol)
        expect(t.bombillas.map(b => b.id)).toEqual(r.bombillas.map(b => b.id))
        expect(t.bombillas.map(b => b.id)).toEqual(r.bombillas.map((_, i) => `b${i + 1}`))
        expect(t.interruptores).toHaveLength(r.interruptores.length)
        expect(t.W).toBeLessThan(720)
        if (nivel === 'facil') expect(r.fundidas).toHaveLength(0)
      }
      // muchos circuitos distintos (antes: 3 esquemas por nivel)
      expect(firmas.size).toBeGreaterThan(nivel === 'facil' ? 25 : 80)
    })
  }
})
