import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, PAISES, MIEMBROS, AMPLIACIONES, INSTITUCIONES, pais, enunciado, explicacion, textoOpcion, schemaQuestion } from '../europa27'
import { A3_TO_NUM } from '../../data/isoNumerico'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Europa a 27', () => {
  it('datos de la UE a octubre de 2026', () => {
    expect(MIEMBROS).toHaveLength(27)
    expect(MIEMBROS.filter(p => p.euro)).toHaveLength(21)
    expect(MIEMBROS.filter(p => !p.schengen).map(p => p.iso).sort()).toEqual(['CYP', 'IRL'])
    expect(MIEMBROS.filter(p => !p.euro).map(p => p.iso).sort()).toEqual(['CZE', 'DNK', 'HUN', 'POL', 'ROU', 'SWE'])
    expect(MIEMBROS.filter(p => p.entrada === 1957)).toHaveLength(6)
    expect(MIEMBROS.filter(p => p.entrada === 2004)).toHaveLength(10)
    for (const p of MIEMBROS) expect(AMPLIACIONES, p.iso).toContain(p.entrada)
    for (const iso of ['NOR', 'CHE', 'ISL']) expect(pais(iso).schengen).toBe(true)
    expect(pais('GBR').entrada).toBe(0)
    // Todos se pueden pintar en el mapa (código numérico ISO).
    for (const p of PAISES) expect(A3_TO_NUM[p.iso], p.iso).toBeTruthy()
    expect(new Set(PAISES.map(p => p.nombre.es)).size).toBe(PAISES.length)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 4441)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        const ps = r.opciones.map(o => (typeof o === 'string' ? pais(o) : null))
        if (r.tipo === 'miembro') for (const [k, p] of ps.entries()) expect(!p.entrada, p.iso).toBe(r.opciones[k] === r.bueno)
        if (r.tipo === 'euro') for (const [k, p] of ps.entries()) { expect(p.entrada).toBeGreaterThan(0); expect(p.euro === r.alReves, p.iso).toBe(r.opciones[k] === r.bueno) }
        if (r.tipo === 'schengen') for (const [k, p] of ps.entries()) expect(!p.schengen, p.iso).toBe(r.opciones[k] === r.bueno)
        if (r.tipo === 'ampliacion') expect(r.bueno).toBe(pais(r.pais).entrada)
        if (r.tipo === 'sede') expect(r.bueno).toBe(INSTITUCIONES[r.inst].sede)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const textos = r.opciones.map(o => textoOpcion(o, r, l))
          expect(new Set(textos).size).toBe(4)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(3)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
