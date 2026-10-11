import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ELEMENTOS, SUSTANCIAS, enlaceDe, formulaIonica, enunciado, explicacion, textoOpcion, schemaQuestion } from '../queEnlace'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
// Carga total de una fórmula iónica «Mg₃N₂».
const SUBN = { '₂': 2, '₃': 3, '₄': 4 }
function cargaTotal(f) {
  let total = 0
  for (const [, el, sub] of f.matchAll(/([A-Z][a-z]?)([₂₃₄]?)/g)) total += (ELEMENTOS[el].carga ?? 0) * (SUBN[sub] ?? 1)
  return total
}

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

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con una sola respuesta correcta`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 9173)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(r.opciones.length).toBeGreaterThanOrEqual(3)
        if (r.tipo === 'enlace') expect(r.bueno).toBe(enlaceDe(r.elementos[0], r.elementos[1] ?? r.elementos[0]))
        if (r.tipo === 'formula') {
          // Solo la buena es neutra.
          expect(r.opciones.filter(o => cargaTotal(o) === 0)).toEqual([r.bueno])
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(r.tipo === 'formula' ? /undefined/ : /undefined|NaN/)
          // Las fórmulas se muestran tal cual (y «NaN₃», sodio y nitrógeno, no es un NaN de JavaScript).
          for (const o of r.opciones) {
            if (r.tipo === 'formula') expect(textoOpcion(o, r, l)).toBe(o)
            else expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          }
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
