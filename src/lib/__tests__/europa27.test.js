import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, PAISES, MIEMBROS, AMPLIACIONES, INSTITUCIONES, pais, enunciado, explicacion, schemaQuestion, esCorrecta, tiene, SIN_TOCAR } from '../europa27'
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
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 307)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'busca') { expect(SIN_TOCAR).not.toContain(r.pais); if (nivel === 'facil') expect(pais(r.pais).entrada).toBeTruthy() }
        if (r.tipo === 'pinta') {
          expect(r.grupo).toHaveLength(6)
          const si = r.grupo.filter(iso => tiene(r.variante, iso)).length
          expect(si).toBeGreaterThanOrEqual(2); expect(6 - si).toBeGreaterThanOrEqual(2)
          for (const iso of r.grupo) expect(SIN_TOCAR).not.toContain(iso)
        }
        if (r.tipo === 'anyos') { expect(new Set(r.paises.map(iso => pais(iso).entrada)).size).toBe(3); for (const iso of r.paises) expect(r.cajas).toContain(pais(iso).entrada); for (const a of r.cajas) expect(AMPLIACIONES).toContain(a) }
        if (r.tipo === 'sedes') for (const id of r.insts) expect(INSTITUCIONES[id].sede).toBeTruthy()
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined/)
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
