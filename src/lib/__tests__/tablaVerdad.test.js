import { describe, it, expect } from 'vitest'
import {
  genRonda, NIVELES, texto, lee, evalua, columna, clase, equivalentes, esValido, variables, filas,
  TAUTOLOGIAS, CONTRADICCIONES, REGLAS, FRASES_IDS, fraseDe, textoFrase, leyenda, lineasArgumento, cajaArgumento,
  esCorrecta, enunciado, explicacion, schemaQuestion, at, no, y, o, si, sii,
} from '../tablaVerdad'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const p = at('p'), q = at('q')

describe('Tabla de Verdad', () => {
  it('lógica de base', () => {
    // Tablas de los conectores, en el orden de los libros (VV, VF, FV, FF)
    expect(columna(y(p, q))).toEqual([true, false, false, false])
    expect(columna(o(p, q))).toEqual([true, true, true, false])
    expect(columna(si(p, q))).toEqual([true, false, true, true])
    expect(columna(sii(p, q))).toEqual([true, false, false, true])
    expect(columna(no(p))).toEqual([false, true])
    expect(filas(['p', 'q', 'r'])).toHaveLength(8)
    expect(filas(['p', 'q'])[1]).toEqual({ p: true, q: false })
    // Paréntesis solo donde hacen falta
    expect(texto(si(y(p, no(q)), p))).toBe('(p ∧ ¬q) → p')
    expect(texto(no(o(p, q)))).toBe('¬(p ∨ q)')
    // Lectura de fichas con precedencia y → por la derecha
    expect(texto(lee(['p', '∧', 'q', '→', 'p']))).toBe('(p ∧ q) → p')
    expect(texto(lee(['¬', 'p', '∨', 'q']))).toBe('¬p ∨ q')
    expect(texto(lee(['p', '→', 'q', '→', 'p']))).toBe('p → (q → p)')
    expect(lee(['p', '∧'])).toBeNull()
    expect(lee(['(', 'p'])).toBeNull()
    expect(lee(['p', 'q'])).toBeNull()
    expect(lee([])).toBeNull()
    expect(equivalentes(si(p, q), lee(['¬', 'q', '→', '¬', 'p']))).toBe(true)
    expect(equivalentes(si(p, q), si(q, p))).toBe(false)
  })

  it('clases y reglas calculadas, no escritas a mano', () => {
    for (const f of TAUTOLOGIAS) expect(clase(f), texto(f)).toBe('tautologia')
    for (const f of CONTRADICCIONES) expect(clase(f), texto(f)).toBe('contradiccion')
    for (const [id, g] of Object.entries(REGLAS)) expect(esValido(g.premisas, g.conclusion), id).toBe(g.valido)
  })

  it('cada frase dice lo que dice su fórmula', () => {
    expect(texto(fraseDe({ plantilla: 'siDetras' }).f)).toBe('q → p')
    expect(texto(fraseDe({ plantilla: 'soloSi' }).f)).toBe('p → q')
    for (const plantilla of FRASES_IDS) for (const l of ['es', 'en', 'ca']) {
      const r = { plantilla, atomos: [0, 1] }
      expect(textoFrase(r, l), plantilla + l).not.toMatch(/undefined/)
      expect(leyenda(r, l)).toHaveLength(2)
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 131)
      const cuenta = {}
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        cuenta[r.tipo] = (cuenta[r.tipo] ?? 0) + 1
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'tabla') {
          const nv = variables(r.formula).length
          expect(nv).toBe(nivel === 'dificil' ? 3 : nivel === 'medio' ? nv : 2)
          expect(lee(texto(r.formula).replace(/[()]/g, m => ` ${m} `).split(/\s+|(?=[¬])|(?<=[¬])/).filter(Boolean))).toBeTruthy()
        }
        if (r.tipo === 'formaliza') {
          // La fórmula de la plantilla, escrita con fichas, se lee y se da por buena
          const f = fraseDe(r).f
          expect(new Set(r.atomos).size).toBe(2)
          const fichas = texto(f).split('').filter(c => c.trim())
          expect(equivalentes(lee(fichas), f)).toBe(true)
        }
        if (r.tipo === 'clasifica') {
          expect(r.formulas.length).toBe(3)
          expect(new Set(r.formulas.map(clase)).size).toBeGreaterThanOrEqual(2)
        }
        if (r.tipo === 'argumento') {
          expect(new Set(r.args.map(a => a.regla)).size).toBe(r.args.length)
          expect(r.args.some(a => REGLAS[a.regla].valido)).toBe(true)
          expect(r.args.some(a => !REGLAS[a.regla].valido)).toBe(true)
          for (const a of r.args) expect(cajaArgumento(r, a)).toBeTruthy()
          for (const l of ['es', 'en', 'ca']) for (const a of r.args) {
            const ln = lineasArgumento(a, l)
            expect(ln.premisas.join(' ') + ln.conclusion).not.toMatch(/undefined/)
          }
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|null/)
          const qn = schemaQuestion(r, l)
          expect(qn.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(new Set(qn.wrongAnswers).size).toBe(qn.wrongAnswers.length)
          expect(qn.wrongAnswers).not.toContain(qn.correctAnswer)
        }
      }
      const tipos = NIVELES[nivel].tipos
      for (const t of new Set(tipos)) expect(cuenta[t] / 500, t).toBeGreaterThan(0.6 * tipos.filter(x => x === t).length / tipos.length)
    })
  }

  it('evalúa como los libros', () => {
    expect(evalua(si(p, q), { p: false, q: false })).toBe(true)
  })
})
