// El lector de expresiones del recurso de funciones. Lo que se prueba es lo
// que escribe de verdad un alumno: con coma decimal, con ², con "y =" delante
// y con el menos tipográfico que sale al copiar de un PDF.
import { describe, it, expect } from 'vitest'
import {
  leerExpresion, evaluar, aPolinomio, polinomioTexto, frac, fracTexto, ErrorExpresion,
} from '../expresion'

const pol = texto => {
  const p = aPolinomio(leerExpresion(texto))
  return p && p.map(c => fracTexto(c).replace('−', '-'))
}
const codigoDe = texto => {
  try { leerExpresion(texto); return null } catch (e) { return e instanceof ErrorExpresion ? e.codigo : 'otro' }
}

describe('leer lo que escribe un alumno', () => {
  it('rectas y parábolas escritas de mil maneras dan el mismo polinomio', () => {
    expect(pol('2x+3')).toEqual(['3', '2'])
    expect(pol('y = 2·x + 3')).toEqual(['3', '2'])
    expect(pol('f(x) = 3 + 2x')).toEqual(['3', '2'])
    expect(pol('x²−4x+3')).toEqual(['3', '-4', '1'])
    expect(pol('x^2 - 4*x + 3')).toEqual(['3', '-4', '1'])
    expect(pol('(x−1)(x−3)')).toEqual(['3', '-4', '1'])
  })

  it('coma decimal y fracciones salen exactas', () => {
    expect(pol('0,5x − 1')).toEqual(['-1', '1/2'])
    expect(pol('x/3 + 1/2')).toEqual(['1/2', '1/3'])
    expect(pol('0.1x')).toEqual(['0', '1/10'])
  })

  it('el menos va por encima de la potencia: −x² es −(x²)', () => {
    expect(pol('-x^2')).toEqual(['0', '0', '-1'])
    expect(pol('(-x)^2')).toEqual(['0', '0', '1'])
    expect(evaluar(leerExpresion('-x^2'), 3)).toBe(-9)
  })

  it('producto implícito: 2x, 3(x + 1), x(x − 1)', () => {
    expect(pol('3(x+1)')).toEqual(['3', '3'])
    expect(pol('x(x-1)')).toEqual(['0', '-1', '1'])
    expect(pol('2x^2')).toEqual(['0', '0', '2'])
  })

  it('lo que no es polinomio se dibuja igual, pero no se resuelve exacto', () => {
    for (const t of ['1/x', 'sqrt(x)', '√x', 'abs(x)', '2^x']) {
      expect(aPolinomio(leerExpresion(t)), t).toBeNull()
    }
    expect(evaluar(leerExpresion('1/x'), 4)).toBe(0.25)
    expect(evaluar(leerExpresion('raíz(x)'), 9)).toBe(3)
    expect(evaluar(leerExpresion('abs(x)'), -2)).toBe(2)
  })

  it('cada error dice qué pasa, no solo que algo falla', () => {
    expect(codigoDe('')).toBe('vacia')
    expect(codigoDe('2x+')).toBe('incompleta')
    expect(codigoDe('(x+1')).toBe('parentesis')
    expect(codigoDe('x+1)')).toBe('parentesis')
    expect(codigoDe('2t+1')).toBe('variable')
    expect(codigoDe('2x # 1')).toBe('caracter')
  })
})

describe('escribir un polinomio', () => {
  it('como en el libro: sin 1x, sin + −, con x²', () => {
    expect(polinomioTexto([frac(3), frac(-4), frac(1)])).toBe('x² − 4x + 3')
    expect(polinomioTexto([frac(0), frac(-1)])).toBe('−x')
    expect(polinomioTexto([frac(-5)])).toBe('−5')
    expect(polinomioTexto([frac(0)])).toBe('0')
  })

  it('un coeficiente fraccionario va entre paréntesis', () => {
    // "1/2x" se lee como 1/(2x): con paréntesis no hay duda.
    expect(polinomioTexto([frac(-1), frac(1, 2)])).toBe('(1/2)x − 1')
  })
})
