// El recurso de funciones resuelve ejercicios de verdad, así que se prueba con
// ejercicios de verdad: varios salen tal cual del examen de teoría de Tuthor
// (data/funciones.js), y el resultado tiene que coincidir con su respuesta.
import { describe, it, expect } from 'vitest'
import { prepararFuncion, analizarFuncion, cortarFunciones, rangoGrafica, raicesNumericas } from '../problemasFunciones'
import { rectaPorDosPuntos, rectaPendientePunto, puntoPertenece, leerNumero } from '../problemasRectas'
import { ErrorExpresion } from '../expresion'

const fn = prepararFuncion
const pt = (x, y) => ({ x: leerNumero(String(x)), y: leerNumero(String(y)) })
const textos = (puntos, clase) => puntos.filter(p => p.clase === clase).map(p => p.texto.es)
const cerca = (a, b) => Math.abs(a - b) < 1e-9

describe('analizar una función', () => {
  it('una parábola con raíces enteras: cortes y vértice exactos', () => {
    const r = analizarFuncion(fn('x² − 4x + 3'))
    expect(r.tipo).toBe('cuadratica')
    expect(r.exacta).toBe(true)
    expect(textos(r.puntos, 'ejeX')).toEqual(['(1, 0)', '(3, 0)'])
    expect(textos(r.puntos, 'ejeY')).toEqual(['(0, 3)'])
    expect(textos(r.puntos, 'vertice')).toEqual(['(2, −1)'])
  })

  it('raíces irracionales salen simplificadas, no en decimales', () => {
    const r = analizarFuncion(fn('x^2 - 8'))
    const x = textos(r.puntos, 'ejeX')
    expect(x[0]).toContain('−2√2')
    expect(x[1]).toContain('2√2')
    expect(r.puntos.filter(p => p.clase === 'ejeX').map(p => p.x).every(v => cerca(Math.abs(v), Math.sqrt(8)))).toBe(true)
  })

  it('una parábola que no corta el eje X lo dice', () => {
    const r = analizarFuncion(fn('x² + 1'))
    expect(textos(r.puntos, 'ejeX')).toEqual([])
    expect(r.secciones.flatMap(s => s.pasos).some(p => p.es.includes('negativo'))).toBe(true)
  })

  it('una recta: pendiente, ordenada y corte fraccionario', () => {
    // f31: "¿En qué punto corta al eje Y la recta y = 2x − 5?" → (0, −5)
    const r = analizarFuncion(fn('y = 2x − 5'))
    expect(textos(r.puntos, 'ejeY')).toEqual(['(0, −5)'])
    expect(textos(r.puntos, 'ejeX')).toEqual(['(5/2, 0)'])
    expect(r.datos[0].valor.es).toBe('2')
  })

  it('1/x: no está definida en 0 y el salto no cuenta como corte', () => {
    const r = analizarFuncion(fn('1/x'))
    expect(r.exacta).toBe(false)
    expect(textos(r.puntos, 'ejeY')).toEqual([])
    expect(textos(r.puntos, 'ejeX')).toEqual([])
    expect(raicesNumericas(x => 1 / x)).toEqual([])
  })
})

describe('dónde se cortan dos funciones', () => {
  it('dos rectas', () => {
    const r = cortarFunciones(fn('2x + 3'), fn('−x + 6'))
    expect(r.relacion).toBe('corte')
    expect(textos(r.puntos, 'corte')).toEqual(['(1, 5)'])
  })

  it('rectas paralelas no se cortan, y se dice por qué', () => {
    // f11: "Dos funciones son paralelas. ¿Qué tienen en común?" → la pendiente
    const r = cortarFunciones(fn('2x + 1'), fn('2x + 5'))
    expect(r.relacion).toBe('nunca')
    expect(r.pasos.some(p => p.es.includes('paralelas'))).toBe(true)
  })

  it('la misma recta escrita de dos formas', () => {
    expect(cortarFunciones(fn('2(x + 1)'), fn('2x + 2')).relacion).toBe('iguales')
  })

  it('recta y parábola con cortes enteros', () => {
    const r = cortarFunciones(fn('x²'), fn('x + 2'))
    expect(textos(r.puntos, 'corte')).toEqual(['(−1, 1)', '(2, 4)'])
  })

  it('recta y parábola con cortes irracionales: la y también sale exacta', () => {
    // x² = 2x + 1 → x = 1 ± √2, y = 2x + 1 = 3 ± 2√2
    const r = cortarFunciones(fn('x²'), fn('2x + 1'))
    const [a, b] = textos(r.puntos, 'corte')
    expect(a).toContain('1 − √2')
    expect(a).toContain('3 − 2√2')
    expect(b).toContain('3 + 2√2')
    for (const p of r.puntos) expect(cerca(p.y, p.x * p.x)).toBe(true)
  })

  it('lo que no es polinomio se corta numéricamente', () => {
    const r = cortarFunciones(fn('1/x'), fn('x'))
    expect(r.exacta).toBe(false)
    expect(r.puntos.map(p => Math.round(p.x * 1e6) / 1e6)).toEqual([-1, 1])
  })
})

describe('rectas', () => {
  it('por dos puntos (f07: por (0, 2) y (3, 8), pendiente 2)', () => {
    const r = rectaPorDosPuntos(pt(0, 2), pt(3, 8))
    expect(r.ecuacion).toBe('y = 2x + 2')
  })

  it('por dos puntos con pendiente fraccionaria', () => {
    expect(rectaPorDosPuntos(pt(1, 1), pt(3, 2)).ecuacion).toBe('y = (1/2)x + 1/2')
  })

  it('dos puntos con la misma x: vertical, no es función', () => {
    expect(rectaPorDosPuntos(pt(2, 1), pt(2, 5)).tipo).toBe('vertical')
    expect(rectaPorDosPuntos(pt(2, 1), pt(2, 1)).tipo).toBe('mismoPunto')
  })

  it('dos puntos con la misma y: recta horizontal y = b', () => {
    expect(rectaPorDosPuntos(pt(-1, 4), pt(5, 4)).ecuacion).toBe('y = 4')
  })

  it('pendiente y punto (f10: pendiente 3 por el origen → y = 3x)', () => {
    expect(rectaPendientePunto(leerNumero('3'), pt(0, 0)).ecuacion).toBe('y = 3x')
    expect(rectaPendientePunto(leerNumero('-1/2'), pt(4, 1)).ecuacion).toBe('y = −(1/2)x + 3')
  })

  it('si un punto está en la gráfica (f13: y = −x + 4 en x = 6 vale −2)', () => {
    expect(puntoPertenece(fn('-x + 4'), pt(6, -2)).pertenece).toBe(true)
    const no = puntoPertenece(fn('-x + 4'), pt(6, 2))
    expect(no.pertenece).toBe(false)
    expect(no.puntos.find(p => p.clase === 'imagen').texto.es).toBe('(6, −2)')
  })

  it('una coordenada tiene que ser un número', () => {
    expect(leerNumero('0,75')).toEqual({ n: 3, d: 4 })
    expect(() => leerNumero('2x')).toThrow(ErrorExpresion)
  })
})

describe('la gráfica', () => {
  it('el rango enseña todos los puntos importantes', () => {
    const f = fn('x² − 30x + 200')
    const r = analizarFuncion(f)
    const rango = rangoGrafica([f], r.puntos)
    for (const p of r.puntos) {
      expect(p.x, p.texto.es).toBeGreaterThanOrEqual(rango.xmin)
      expect(p.x, p.texto.es).toBeLessThanOrEqual(rango.xmax)
      expect(p.y, p.texto.es).toBeGreaterThanOrEqual(rango.ymin)
      expect(p.y, p.texto.es).toBeLessThanOrEqual(rango.ymax)
    }
  })
})
