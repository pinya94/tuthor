import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, factoriza, esPrimo, mcdDe, mcmDe, clave, escribe, enunciado, explicacion, textoOpcion, schemaQuestion, columnas } from '../bloquesPrimos'

// Generador determinista para que un fallo se pueda reproducir.
function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const valor = k => k.split('*').reduce((v, t) => { const [p, e] = t.split('^').map(Number); return v * p ** e }, 1)

describe('Bloques Primos', () => {
  it('aritmética básica', () => {
    expect(factoriza(360)).toEqual({ 2: 3, 3: 2, 5: 1 })
    expect(escribe(factoriza(360))).toBe('2³ · 3² · 5')
    expect(esPrimo(97)).toBe(true)
    expect(esPrimo(91)).toBe(false)
    expect(mcdDe([24, 36])).toBe(12)
    expect(mcmDe([4, 6, 10])).toBe(60)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con una sola respuesta correcta`, () => {
      const rand = semilla(nivel.length * 7919)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        expect(r.opciones).toContain(r.bueno)
        // Solo UNA opción cumple lo que se pregunta.
        const cumple = o => {
          switch (r.tipo) {
            case 'divisible': return o % r.divisor === 0
            case 'primo': return esPrimo(o)
            case 'descomp': return o === clave(factoriza(r.n))
            default: return o === (r.op === 'mcd' ? mcdDe(r.nums) : mcmDe(r.nums))
          }
        }
        expect(r.opciones.filter(cumple), JSON.stringify(r)).toEqual([r.bueno])
        if (r.tipo === 'descomp') {
          expect(valor(r.bueno)).toBe(r.n)
          for (const o of r.opciones) expect(o).toMatch(/^\d+\^\d+(\*\d+\^\d+)*$/)
        }
        if (r.nums) expect(r.nums.every(n => !esPrimo(n))).toBe(true)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(3)
        }
      }
      // Cada nivel saca todos sus tipos.
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }

  it('la trampa del 4: descomposición con un compuesto vale lo mismo pero no es la buena', () => {
    const rand = semilla(42)
    let visto = false
    for (let i = 0; i < 400 && !visto; i++) {
      const r = genRonda('medio', { rand })
      if (r.tipo !== 'descomp') continue
      const trampa = r.opciones.find(o => /(^|\*)(4|9)\^/.test(o))
      if (trampa) { expect(valor(trampa)).toBe(r.n); visto = true }
    }
    expect(visto).toBe(true)
  })

  it('columnas alinea los primos de los números', () => {
    expect(columnas([12, 18])).toEqual([
      { p: 2, exps: [2, 1], max: 2, min: 1 },
      { p: 3, exps: [1, 2], max: 2, min: 1 },
    ])
  })
})
