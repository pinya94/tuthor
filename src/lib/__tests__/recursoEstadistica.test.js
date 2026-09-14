// El recurso de estadística: con datos de ejercicio típicos, cada parámetro
// tiene que dar lo que da el libro, y escrito como en el libro (6,2 y no
// 6.199999; 5/3 ≈ 1,67 y no 1.6666666).
import { describe, it, expect } from 'vitest'
import { resolverEstadistica, trocearLista, numTexto, EJEMPLOS_LISTA, EJEMPLOS_TABLA } from '../recursoEstadistica'
import { frac } from '../expresion'
import { MENSAJE_ERROR } from '../recursoFunciones'

const lista = t => resolverEstadistica({ modo: 'lista', lista: t })
const tabla = (valores, frecuencias) => resolverEstadistica({ modo: 'tabla', valores, frecuencias })
const res = (r, id) => r.resumen.find(x => x.id === id).valor.es

describe('leer datos con coma decimal', () => {
  it('la coma separa o es decimal según lo que la rodea', () => {
    expect(trocearLista('3, 5, 7')).toEqual(['3', '5', '7'])
    expect(trocearLista('3,5,7')).toEqual(['3', '5', '7'])
    expect(trocearLista('2,5; 3,1')).toEqual(['2,5', '3,1'])
    expect(trocearLista('2,5 3,1\n4')).toEqual(['2,5', '3,1', '4'])
  })

  it('los decimales se leen exactos', () => {
    const r = lista('1,5; 2; 2,5; 2; 3')
    expect(r.ok).toBe(true)
    expect(res(r, 'media')).toBe('2,2')
    expect(res(r, 'moda')).toBe('2')
  })

  it('números escritos como en el libro', () => {
    expect(numTexto(frac(31, 5), 'es')).toBe('6,2')
    expect(numTexto(frac(31, 5), 'en')).toBe('6.2')
    expect(numTexto(frac(5, 3), 'es')).toBe('5/3 ≈ 1,67')
    expect(numTexto(frac(-7, 4), 'es')).toBe('−1,75')
  })
})

describe('los parámetros', () => {
  it('número impar de datos', () => {
    const r = lista('3, 5, 7, 7, 9')
    expect(r.N).toBe(5)
    expect(res(r, 'media')).toBe('6,2')
    expect(res(r, 'mediana')).toBe('7')
    expect(res(r, 'moda')).toBe('7')
    expect(res(r, 'rango')).toBe('6')
    // σ² = 20,8 / 5 = 4,16 = 104/25 → σ = √104 / 5 = 2√26 / 5
    expect(res(r, 'desviacion')).toContain('2√26/5')
    expect(r.desviacion).toBeCloseTo(Math.sqrt(4.16), 10)
  })

  it('número par de datos: la mediana es la media de los dos centrales', () => {
    const r = lista('4 8 6 2')
    expect(res(r, 'mediana')).toBe('5')
    expect(r.secciones.find(s => s.id === 'mediana').pasos.at(-1).es).toBe('Me = (4 + 6) / 2 = 5')
  })

  it('media que no es decimal finito', () => {
    expect(res(lista('1 2 2'), 'media')).toBe('5/3 ≈ 1,67')
  })

  it('dos modas, y ninguna', () => {
    expect(lista('1 2 2 3 3').modas).toEqual([2, 3])
    expect(res(lista('1 2 3'), 'moda')).toBe('No hay')
    // Un solo valor repetido sí tiene moda: es ese valor.
    expect(lista('4 4 4').modas).toEqual([4])
  })

  it('una desviación típica exacta sale sin raíz', () => {
    // 2, 4, 4, 4, 5, 5, 7, 9: media 5, σ² = 4, σ = 2
    const r = lista('2 4 4 4 5 5 7 9')
    expect(res(r, 'media')).toBe('5')
    expect(res(r, 'desviacion')).toBe('2')
  })

  it('con datos negativos el rango se escribe con paréntesis', () => {
    const r = lista('−3 2 5')
    expect(r.secciones.find(s => s.id === 'rango').pasos[0].es).toContain('5 − (−3) = 8')
  })
})

describe('tabla de frecuencias', () => {
  it('media, mediana con la frecuencia acumulada y moda', () => {
    // N = 20, Σx·f = 28 → x̄ = 1,4. Posiciones 10 y 11: Fᵢ = 4, 10, 18, 20 → 1 y 2 → Me = 1,5
    const r = tabla(['0', '1', '2', '3'], ['4', '6', '8', '2'])
    expect(r.N).toBe(20)
    expect(res(r, 'media')).toBe('1,4')
    expect(res(r, 'mediana')).toBe('1,5')
    expect(res(r, 'moda')).toBe('2')
    expect(r.tabla.map(t => t.Fi)).toEqual([4, 10, 18, 20])
    expect(r.tabla.map(t => t.texto('es').pct)).toEqual(['20 %', '30 %', '40 %', '10 %'])
  })

  it('las filas vacías se ignoran y un valor repetido suma sus frecuencias', () => {
    const r = tabla(['1', '', '2', '1'], ['2', '', '3', '1'])
    expect(r.N).toBe(6)
    expect(r.tabla.map(t => t.fi)).toEqual([3, 3])
  })

  it('una frecuencia tiene que ser un entero no negativo, y se dice en qué fila', () => {
    const r = tabla(['1', '2'], ['3', '2,5'])
    expect(r.ok).toBe(false)
    expect(r.error.codigo).toBe('frecuencia')
    expect(r.error.campo).toBe('fila-1-frecuencia')
    expect(tabla(['1', 'a'], ['3', '2']).error.campo).toBe('fila-1-valor')
  })
})

describe('la página', () => {
  it('todos los ejemplos se resuelven', () => {
    for (const e of EJEMPLOS_LISTA) expect(lista(e).ok, e).toBe(true)
    for (const e of EJEMPLOS_TABLA) expect(tabla(e.valores, e.frecuencias).ok, JSON.stringify(e)).toBe(true)
  })

  it('un dato que no es número dice cuál', () => {
    const r = lista('3, a, 5')
    expect(r.error).toEqual({ campo: 'lista', codigo: 'dato', detalle: 'a' })
    for (const codigo of ['dato', 'frecuencia', 'demasiados']) {
      expect(MENSAJE_ERROR[codigo], codigo).toBeTypeOf('function')
    }
  })
})
