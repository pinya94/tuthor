import { describe, it, expect } from 'vitest'
import {
  METALES, ANIONES, ACIDOS, OXIDOS_NM, NIVELES, formula, nombreStock, nombrePrefijos,
  genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado, dato,
} from '../formulacion'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

// Cuenta los átomos de una fórmula en texto («Fe2O3», «Ca(OH)2»).
function atomos(f) {
  const out = {}
  const sumar = (el, n) => { out[el] = (out[el] ?? 0) + n }
  const re = /\(([^)]+)\)(\d*)|([A-Z][a-z]?)(\d*)/g
  let m
  while ((m = re.exec(f))) {
    if (m[1]) { const k = Number(m[2] || 1); for (const [el, n] of Object.entries(atomos(m[1]))) sumar(el, n * k) } else sumar(m[3], Number(m[4] || 1))
  }
  return out
}

describe('Formulación · fórmulas y nombres de libro', () => {
  it('las cargas cuadran: valencia × metales = carga × aniones', () => {
    for (const [m, d] of Object.entries(METALES)) for (const v of d.v) for (const [a, da] of Object.entries(ANIONES)) {
      const { f, nM, nA } = formula(m, v, a)
      expect(v * nM, f).toBe(da.c * nA)
      const at = atomos(f)
      expect(at[m]).toBe(nM)
      if (a === 'OH') { expect(at.O).toBe(nA); expect(at.H).toBe(nA) } else expect(at[a]).toBe(nA)
    }
  })
  it('ejemplos de libro', () => {
    expect(formula('Fe', 3, 'O').f).toBe('Fe2O3')
    expect(formula('Ca', 2, 'O').f).toBe('CaO')
    expect(formula('Pb', 4, 'O').f).toBe('PbO2')
    expect(formula('Al', 3, 'S').f).toBe('Al2S3')
    expect(formula('Ca', 2, 'OH').f).toBe('Ca(OH)2')
    expect(formula('Na', 1, 'OH').f).toBe('NaOH')
    expect(nombreStock('Fe', 3, 'O', 'es')).toBe('óxido de hierro(III)')
    expect(nombreStock('Na', 1, 'Cl', 'es')).toBe('cloruro de sodio')
    expect(nombreStock('Fe', 3, 'O', 'en')).toBe('iron(III) oxide')
    expect(nombreStock('Al', 3, 'Cl', 'ca')).toBe('clorur d’alumini')
    expect(nombrePrefijos('carbono', 1, 'óxido', 1, 'es')).toBe('monóxido de carbono')
    expect(nombrePrefijos('nitrógeno', 2, 'óxido', 5, 'es')).toBe('pentaóxido de dinitrógeno')
    expect(nombrePrefijos('hierro', 2, 'óxido', 3, 'es')).toBe('trióxido de dihierro')
    expect(nombrePrefijos('carboni', 1, 'òxid', 1, 'ca')).toBe('monòxid de carboni')
    expect(nombrePrefijos('iron', 2, 'oxide', 3, 'en')).toBe('diiron trioxide')
  })
  it('óxidos de no metales y ácidos: la fórmula cuadra con los datos', () => {
    for (const o of OXIDOS_NM) { const at = atomos(o.f); expect(at[o.el]).toBe(o.a); expect(at.O).toBe(o.o) }
    for (const a of ACIDOS) { expect(atomos(a.f).H).toBeGreaterThan(0); for (const l of L) expect(a.n[l]).toBeTruthy() }
    expect(OXIDOS_NM.some(o => o.el === 'Cl')).toBe(false) // óxidos de cloro: nomenclatura discutida
  })
})

describe('Formulación · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: una sola respuesta buena`, () => {
      const rand = semilla(nivel.length * 1201)
      const tipos = new Set()
      for (let i = 0; i < 700; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'formula') {
          // ninguna fórmula equivocada tiene la misma composición que la buena
          const buena = JSON.stringify(atomos(r.bueno))
          for (const o of r.opciones) if (o !== r.bueno) expect(JSON.stringify(atomos(o))).not.toBe(buena)
          // ni es otra forma válida del mismo compuesto con otra valencia del metal
          for (const o of r.opciones) if (o !== r.bueno) expect(o).not.toBe(formula(r.comp.metal, r.comp.v, r.comp.anion).f)
        }
        if (r.tipo === 'nombre') expect(r.bueno).toBe(`${r.comp.anion}:${r.comp.v}`)
        for (const l of L) {
          // los textos de las opciones son todos distintos (nada de dos nombres iguales)
          const textos = r.opciones.map(o => textoOpcion(o, r, l))
          expect(new Set(textos).size, textos.join(' | ')).toBe(textos.length)
          expect(enunciado(r, l)).not.toMatch(/undefined/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          expect(JSON.stringify(dato(r, l))).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})
