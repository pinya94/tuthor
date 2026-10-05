import { describe, it, expect } from 'vitest'
import {
  TIPOS, preguntaNueva, cambiarTipo, problemas, examenValido, examenNuevo, limpiarExamen,
  puntosAuto, corregirExamen, normalizar, leerNumero, cursoEscolarActual, cursoSiguiente, textoSolucion,
  CAMPOS_SOLUCION, separarSoluciones, unirSoluciones, conSolucion, calificar, sinCalificar,
} from '../examenModelo'

const tr = o => o.es

describe('examenModelo · preguntas', () => {
  it('cada tipo nuevo nace incompleto y dice qué le falta', () => {
    for (const t of TIPOS) expect(problemas(preguntaNueva(t)).length, t).toBeGreaterThan(0)
  })
  it('un test completo es válido', () => {
    const p = { ...preguntaNueva('test'), enunciado: '¿2+2?', opciones: ['4', '5'], correctas: [0] }
    expect(problemas(p)).toEqual([])
  })
  it('una pregunta solo con imagen (sin texto) vale', () => {
    const p = { ...preguntaNueva('vf'), imagen: { id: 'img1' } }
    expect(problemas(p)).toEqual([])
  })
  it('cambiar de test a varias correctas conserva las opciones', () => {
    const p = { ...preguntaNueva('test'), enunciado: 'x', opciones: ['a', 'b', 'c'], correctas: [2] }
    const m = cambiarTipo(p, 'multiple')
    expect(m.opciones).toEqual(['a', 'b', 'c'])
    expect(m.correctas).toEqual([2])
    expect(m.id).toBe(p.id)
    expect(cambiarTipo(p, 'numerica').opciones).toBeUndefined()
  })
})

describe('examenModelo · corrección automática', () => {
  const test = { id: 'a', tipo: 'test', puntos: 1, opciones: ['x', 'y'], correctas: [1] }
  const mult = { id: 'b', tipo: 'multiple', puntos: 2, opciones: ['x', 'y', 'z'], correctas: [0, 2] }
  const vf = { id: 'c', tipo: 'vf', puntos: 1, correcta: false }
  const num = { id: 'd', tipo: 'numerica', puntos: 1, valor: 9.8, tolerancia: 0.1, unidad: 'm/s²' }
  const corta = { id: 'e', tipo: 'corta', puntos: 1, aceptadas: ['Fotosíntesis'] }
  const des = { id: 'f', tipo: 'desarrollo', puntos: 4, criterios: 'Explica el ciclo' }
  const todas = [test, mult, vf, num, corta, des]

  it('cada tipo puntúa lo que debe', () => {
    expect(puntosAuto(test, 1)).toBe(1)
    expect(puntosAuto(test, 0)).toBe(0)
    expect(puntosAuto(mult, [2, 0])).toBe(2)
    expect(puntosAuto(mult, [0])).toBe(0)
    expect(puntosAuto(mult, [0, 1, 2])).toBe(0)
    expect(puntosAuto(vf, false)).toBe(1)
    expect(puntosAuto(num, '9,85')).toBe(1)
    expect(puntosAuto(num, '10')).toBe(0)
    expect(puntosAuto(corta, '  fotosintesis. ')).toBe(1)
    expect(puntosAuto(des, 'bla')).toBeNull()
  })

  it('la nota espera al profesor en el desarrollo, y luego cuenta lo que pone', () => {
    const r = { a: 1, b: [0, 2], c: false, d: '9.8', e: 'fotosíntesis', f: 'texto largo' }
    const sin = corregirExamen(todas, r)
    expect(sin.max).toBe(10)
    expect(sin.obtenidos).toBe(6)
    expect(sin.pendientes).toBe(1)
    const con = corregirExamen(todas, r, { f: 3 })
    expect(con.obtenidos).toBe(9)
    expect(con.nota).toBe(9)
    expect(con.pendientes).toBe(0)
    expect(con.aprobado).toBe(true)
  })

  it('el profesor puede ajustar una automática, sin pasarse del máximo', () => {
    const c = corregirExamen([num], { d: '11' }, { d: 0.5 })
    expect(c.obtenidos).toBe(0.5)
    expect(corregirExamen([num], { d: '11' }, { d: 7 }).obtenidos).toBe(1)
  })

  it('en blanco puntúa cero', () => {
    expect(corregirExamen(todas, {}, { f: 0 }).obtenidos).toBe(0)
  })
})

describe('examenModelo · utilidades', () => {
  it('normaliza y lee números', () => {
    expect(normalizar('  ÁRBOL!! ')).toBe('arbol')
    expect(leerNumero('3,5')).toBe(3.5)
    expect(leerNumero('abc')).toBeNull()
  })
  it('curso escolar de septiembre a agosto', () => {
    expect(cursoEscolarActual(new Date(2026, 9, 4))).toBe('2026-2027')
    expect(cursoEscolarActual(new Date(2027, 2, 1))).toBe('2026-2027')
    expect(cursoSiguiente('2026-2027')).toBe('2027-2028')
  })
  it('limpia antes de guardar y valida el examen entero', () => {
    const ex = examenNuevo()
    expect(examenValido(ex)).toBe(false)
    ex.titulo = '  Examen tema 3 '
    ex.preguntas = [{ ...preguntaNueva('numerica'), enunciado: ' ¿g? ', valor: '9.8', tolerancia: '-0.2' }]
    const l = limpiarExamen(ex)
    expect(l.titulo).toBe('Examen tema 3')
    expect(l.preguntas[0].valor).toBe(9.8)
    expect(l.preguntas[0].tolerancia).toBe(0.2)
    expect(examenValido(l)).toBe(true)
    expect(textoSolucion(l.preguntas[0], tr)).toBe('9.8 (± 0.2)')
  })
})

describe('examenModelo · soluciones aparte', () => {
  const examen = [
    { id: 'a', tipo: 'test', enunciado: 'x', imagen: null, puntos: 1, opciones: ['s', 'n'], correctas: [0] },
    { id: 'b', tipo: 'multiple', enunciado: 'x', imagen: null, puntos: 2, opciones: ['1', '2', '3'], correctas: [0, 2] },
    { id: 'c', tipo: 'vf', enunciado: 'x', imagen: null, puntos: 1, correcta: false },
    { id: 'd', tipo: 'numerica', enunciado: 'x', imagen: null, puntos: 2, valor: 75, tolerancia: 0.5, unidad: 'km/h' },
    { id: 'e', tipo: 'corta', enunciado: 'x', imagen: null, puntos: 1, aceptadas: ['fotosíntesis'] },
    { id: 'f', tipo: 'desarrollo', enunciado: 'x', imagen: null, puntos: 3, criterios: '1 pt por fase', lineas: 6 },
  ]

  it('cubre todos los tipos', () => {
    expect(Object.keys(CAMPOS_SOLUCION).sort()).toEqual([...TIPOS].sort())
  })

  it('lo que va a la tarea no lleva ninguna solución, pero sí lo necesario para contestar', () => {
    const { publicas } = separarSoluciones(examen)
    for (const p of publicas) {
      for (const k of CAMPOS_SOLUCION[p.tipo]) expect(p, `${p.tipo}.${k}`).not.toHaveProperty(k)
      expect(conSolucion(p)).toBe(false)
    }
    expect(publicas[0].opciones).toEqual(['s', 'n'])
    expect(publicas[3].unidad).toBe('km/h')
    expect(publicas[5].lineas).toBe(6)
    // Ni rastro en el JSON (lo que de verdad viaja al navegador del alumno)
    const json = JSON.stringify(publicas)
    expect(json).not.toMatch(/fotos|1 pt por fase|correcta|valor|tolerancia/)
  })

  it('separar y unir devuelve el examen original y corrige igual', () => {
    const { publicas, soluciones } = separarSoluciones(examen)
    const unido = unirSoluciones(publicas, soluciones)
    expect(unido).toEqual(examen)
    const resp = { a: 0, b: [0, 2], c: false, d: '75,3', e: 'Fotosintesis', f: 'bla' }
    expect(corregirExamen(unido, resp)).toEqual(corregirExamen(examen, resp))
  })

  it('sin soluciones aparte (tareas antiguas) las preguntas quedan como están', () => {
    expect(unirSoluciones(examen, null)).toBe(examen)
  })

  it('calificar da los campos que se guardan en la entrega', () => {
    const resp = { a: 0, b: [0, 2], c: false, d: '75', e: 'fotosintesis' }
    const sinDesarrollo = calificar(examen, resp)
    expect(sinDesarrollo).toMatchObject({ escala: 100, obtenidos: 7, max: 10, nota: 7, pendientes: 1, revisado: false, passed: true })
    expect(calificar(examen, resp, { f: 3 })).toMatchObject({ obtenidos: 10, nota: 10, pendientes: 0, revisado: true })
  })

  it('sinCalificar: entregada por el alumno (solo respuestas) y aún sin nota', () => {
    expect(sinCalificar({ done: true, respuestas: {} })).toBe(true)
    expect(sinCalificar({ done: true, respuestas: {}, nota: 0 })).toBe(false)
    expect(sinCalificar({ done: false })).toBe(false)
    expect(sinCalificar(undefined)).toBe(false)
  })
})
