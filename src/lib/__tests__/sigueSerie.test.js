import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, lineal, exponencial, enunciado, explicacion, textoOpcion, schemaQuestion } from '../sigueSerie'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
// Evalúa «3n − 2» o «2 · 3ⁿ⁻¹» en n.
function evalua(f, n) {
  const SUPR = { '⁻': '-', '⁺': '+', 'ⁿ': 'n', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' }
  let t = f.replace(/[⁻⁺ⁿ⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => `**(${m.split('').map(c => SUPR[c]).join('')})`)
  t = t.replace(/−/g, '-').replace(/·/g, '*').replace(/(\d)n/g, '$1*n')
  return Function('n', `return ${t}`)(n)
}

describe('Sigue la Serie', () => {
  it('fórmulas', () => {
    expect(lineal(3, 2)).toBe('3n + 2')
    expect(lineal(1, -4)).toBe('n − 4')
    expect(lineal(-2, 10)).toBe('−2n + 10')
    expect(exponencial(2, 3, -1)).toBe('2 · 3ⁿ⁻¹')
    expect(evalua('2 · 3ⁿ⁻¹', 3)).toBe(18)
    expect(evalua('−2n + 10', 3)).toBe(4)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con una sola respuesta correcta`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 2203)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        if (r.tipo === 'general') {
          // Solo la buena genera los términos mostrados.
          const generan = r.opciones.filter(o => r.terminos.every((t, k) => evalua(o, k + 1) === t))
          expect(generan, JSON.stringify(r)).toEqual([r.bueno])
        }
        if (r.tipo === 'termino') expect(r.bueno).toBe(r.clase === 'arit' ? r.a1 + (r.n - 1) * r.d : r.a1 * r.r ** (r.n - 1))
        if (r.tipo === 'figuras') expect(r.bueno).toBe(r.d * r.n + r.c)
        if (r.tipo === 'suma') {
          let sum = 0
          for (let k = 0; k < r.n; k++) sum += r.a1 + k * r.d
          expect(r.bueno).toBe(sum)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
