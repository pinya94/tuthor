// Invariantes del examen propio del profesor. Lo que de verdad importa: que
// una pregunta mal formada (sin texto, correctIndex fuera de rango) nunca
// pueda considerarse válida, y que corregir un intento cuente exactamente
// los aciertos reales — un desajuste aquí falsearía la nota de un alumno.
import { describe, it, expect } from 'vitest'
import {
  MIN_OPCIONES, MAX_OPCIONES, MAX_PREGUNTAS, TEXTO_PREGUNTA_MAX,
  preguntaVacia, preguntaValida, quizValido, limpiarQuiz, corregirQuiz,
} from '../quiz'

const pregunta = (correctIndex = 0, options = ['a', 'b']) => ({ text: '¿Cuál es?', options, correctIndex })

describe('preguntaValida', () => {
  it('acepta una pregunta normal', () => {
    expect(preguntaValida(pregunta())).toBe(true)
  })

  it('rechaza texto vacío o solo espacios', () => {
    expect(preguntaValida({ ...pregunta(), text: '' })).toBe(false)
    expect(preguntaValida({ ...pregunta(), text: '   ' })).toBe(false)
  })

  it('rechaza texto por encima del máximo', () => {
    expect(preguntaValida({ ...pregunta(), text: 'a'.repeat(TEXTO_PREGUNTA_MAX + 1) })).toBe(false)
  })

  it('rechaza menos opciones que el mínimo o más que el máximo', () => {
    expect(preguntaValida({ ...pregunta(), options: ['sola'] })).toBe(false)
    expect(preguntaValida({ ...pregunta(0, Array(MAX_OPCIONES + 1).fill('x')) })).toBe(false)
  })

  it('rechaza una opción vacía', () => {
    expect(preguntaValida({ ...pregunta(), options: ['a', ''] })).toBe(false)
  })

  it('rechaza correctIndex fuera de rango o no entero', () => {
    expect(preguntaValida({ ...pregunta(), correctIndex: 2 })).toBe(false)
    expect(preguntaValida({ ...pregunta(), correctIndex: -1 })).toBe(false)
    expect(preguntaValida({ ...pregunta(), correctIndex: 1.5 })).toBe(false)
    expect(preguntaValida({ ...pregunta(), correctIndex: null })).toBe(false)
  })

  it('el mínimo de opciones es aceptable', () => {
    expect(preguntaValida({ ...pregunta(), options: Array(MIN_OPCIONES).fill('x') })).toBe(true)
  })
})

describe('quizValido', () => {
  it('acepta una lista de preguntas válidas', () => {
    expect(quizValido([pregunta(), pregunta(1)])).toBe(true)
  })

  it('rechaza una lista vacía', () => {
    expect(quizValido([])).toBe(false)
  })

  it('rechaza más preguntas que el máximo', () => {
    expect(quizValido(Array(MAX_PREGUNTAS + 1).fill(pregunta()))).toBe(false)
  })

  it('una sola pregunta inválida invalida todo el examen', () => {
    expect(quizValido([pregunta(), { ...pregunta(), text: '' }])).toBe(false)
  })

  it('no revienta con algo que no es un array', () => {
    expect(quizValido(null)).toBe(false)
    expect(quizValido(undefined)).toBe(false)
  })
})

describe('preguntaVacia', () => {
  it('empieza sin ser válida (hay que rellenarla)', () => {
    expect(preguntaValida(preguntaVacia())).toBe(false)
  })

  it('tiene el mínimo de opciones ya puesto', () => {
    expect(preguntaVacia().options).toHaveLength(MIN_OPCIONES)
  })
})

describe('limpiarQuiz', () => {
  it('recorta espacios de texto y opciones', () => {
    const sucio = [{ text: '  ¿Qué es?  ', options: [' a ', 'b  '], correctIndex: 0 }]
    expect(limpiarQuiz(sucio)).toEqual([{ text: '¿Qué es?', options: ['a', 'b'], correctIndex: 0 }])
  })
})

describe('corregirQuiz', () => {
  const quiz = [pregunta(0), pregunta(1), pregunta(0)]

  it('cuenta los aciertos reales, no una aproximación', () => {
    expect(corregirQuiz(quiz, [0, 1, 1])).toEqual({ aciertos: 2, total: 3, score: 67, passed: true })
  })

  it('todo correcto da 100 y aprobado', () => {
    expect(corregirQuiz(quiz, [0, 1, 0])).toEqual({ aciertos: 3, total: 3, score: 100, passed: true })
  })

  it('sin ningún acierto da 0 y suspenso', () => {
    expect(corregirQuiz(quiz, [1, 0, 1])).toEqual({ aciertos: 0, total: 3, score: 0, passed: false })
  })

  it('una respuesta en blanco (null) nunca cuenta como acierto', () => {
    expect(corregirQuiz(quiz, [null, null, null]).aciertos).toBe(0)
  })

  it('con un número par de preguntas, acertar justo la mitad aprueba', () => {
    const par = [pregunta(0), pregunta(0), pregunta(0), pregunta(0)] // 4 preguntas
    expect(corregirQuiz(par, [0, 0, 1, 1]).passed).toBe(true) // 2 de 4 = la mitad exacta
  })

  it('con un número impar, la mitad redondeada hacia arriba no basta si se queda corto', () => {
    const impar = [pregunta(0), pregunta(0), pregunta(0)] // 3 preguntas, hacen falta 2
    expect(corregirQuiz(impar, [0, 1, 1]).passed).toBe(false) // solo 1 acierto
  })
})
