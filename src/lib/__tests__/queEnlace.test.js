import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ELEMENTOS, SUSTANCIAS, MOLECULAS, MAX_ATOMOS, enlaceDe, formulaIonica, proporcion, soluciones, completa, molecula, claseDe, esCorrecta, enunciado, explicacion, schemaQuestion } from '../queEnlace'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const LS = ['es', 'en', 'ca']

describe('¿Qué Enlace?', () => {
  it('reglas básicas', () => {
    expect(enlaceDe('Na', 'Cl')).toBe('ionico')
    expect(enlaceDe('C', 'O')).toBe('covalente')
    expect(enlaceDe('Cu', 'Zn')).toBe('metalico')
    expect(enlaceDe('H', 'Cl')).toBe('covalente')
    expect(formulaIonica('Mg', 'Cl')).toBe('MgCl₂')
    expect(formulaIonica('Al', 'O')).toBe('Al₂O₃')
    expect(formulaIonica('Ca', 'O')).toBe('CaO')
    expect(formulaIonica('Mg', 'N')).toBe('Mg₃N₂')
    for (const s of SUSTANCIAS) expect(['ionica', 'molecular', 'red', 'metalica']).toContain(s.clase)
  })

  it('cada molécula tiene una sola forma de completar los octetos', () => {
    for (const m of MOLECULAS) {
      for (const [el] of m.atomos) expect(ELEMENTOS[el].enlaces, `${m.id} ${el}`).toBeTruthy()
      expect(soluciones(m), m.id).toHaveLength(1)
    }
    expect(soluciones(molecula('CO2'))[0]).toBe('2,2')
    expect(soluciones(molecula('N2'))[0]).toBe('3')
    expect(soluciones(molecula('HCN'))[0]).toBe('1,3')
  })

  it('los compuestos iónicos caben en la bandeja', () => {
    for (const cfg of Object.values(NIVELES)) for (const m of cfg.metales) for (const n of cfg.nometales) {
      const p = proporcion(m, n)
      expect(p.m, `${m}${n}`).toBeLessThanOrEqual(MAX_ATOMOS)
      expect(p.n, `${m}${n}`).toBeLessThanOrEqual(MAX_ATOMOS)
      // Y la proporción es neutra.
      expect(p.m * ELEMENTOS[m].carga + p.n * ELEMENTOS[n].carga).toBe(0)
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas`, { timeout: 30000 }, () => {
      const rand = semilla(nivel.length * 9173)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'ionico') {
          expect(r.metal === 'Al' && ['F', 'Cl', 'Br'].includes(r.nometal)).toBe(false)
          expect(esCorrecta(r, `${r.m}:${r.n}:0`)).toBe(false)
          expect(esCorrecta(r, `${r.m * 2}:${r.n * 2}:1`)).toBe(false)
        }
        if (r.tipo === 'covalente') expect(completa(molecula(r.molecula), r.bueno.split(',').map(Number))).toBe(true)
        if (r.tipo === 'pinta') {
          expect(new Set(r.elementos).size).toBe(5)
          for (const e of r.elementos) expect(r.colores).toContain(ELEMENTOS[e].tipo)
        }
        if (r.tipo === 'clasifica') {
          expect(r.items).toHaveLength(4)
          expect(new Set(r.items.map(claseDe)).size).toBeGreaterThanOrEqual(3)
        }
        for (const l of LS) {
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
