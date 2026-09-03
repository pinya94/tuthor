// Invariantes del cuaderno de notas. Lo que de verdad importa: "sin nota" y
// "un 0" son cosas distintas, y eso tiene que sobrevivir a parsear el input,
// a promediar y a lo que se guarda en Firestore.
import { describe, it, expect } from 'vitest'
import { NOTA_MIN, NOTA_MAX, APROBADO, notaValida, parseNota, promedioColumna, promedioAlumno, suspenso } from '../grades'

describe('notaValida', () => {
  it('acepta el rango 0-10', () => {
    expect(notaValida(0)).toBe(true)
    expect(notaValida(10)).toBe(true)
    expect(notaValida(7.5)).toBe(true)
  })

  it('rechaza fuera de rango y no-números', () => {
    expect(notaValida(-1)).toBe(false)
    expect(notaValida(11)).toBe(false)
    expect(notaValida(NaN)).toBe(false)
    expect(notaValida('7')).toBe(false)
    expect(notaValida(null)).toBe(false)
    expect(notaValida(undefined)).toBe(false)
  })
})

describe('parseNota', () => {
  it('un campo vacío es "borra la nota" (null), no un 0', () => {
    expect(parseNota('')).toBe(null)
    expect(parseNota('   ')).toBe(null)
  })

  it('acepta coma decimal, como se escribe en España', () => {
    expect(parseNota('7,5')).toBe(7.5)
  })

  it('recorta al rango 0-10', () => {
    expect(parseNota('15')).toBe(NOTA_MAX)
    expect(parseNota('-3')).toBe(NOTA_MIN)
  })

  it('redondea a un decimal', () => {
    expect(parseNota('7.666')).toBe(7.7)
  })

  it('una entrada no numérica no se guarda ni se confunde con un 0', () => {
    expect(parseNota('siete')).toBe(undefined)
  })

  it('el propio 0 se distingue de un campo vacío', () => {
    expect(parseNota('0')).toBe(0)
    expect(parseNota('0')).not.toBe(null)
  })
})

describe('promedioColumna', () => {
  it('promedia solo a quien tiene nota', () => {
    expect(promedioColumna({ values: { a: 6, b: 8 } })).toBe(7)
  })

  it('ignora a quien no tiene nota todavía, no lo cuenta como 0', () => {
    expect(promedioColumna({ values: { a: 10 } })).toBe(10)
  })

  it('una columna sin ninguna nota da null, no NaN ni 0', () => {
    expect(promedioColumna({ values: {} })).toBe(null)
    expect(promedioColumna({})).toBe(null)
  })
})

describe('promedioAlumno', () => {
  const columnas = [
    { values: { a: 4, b: 8 } },
    { values: { a: 6 } },      // b no tiene nota en esta columna
    { values: {} },
  ]

  it('promedia solo las columnas donde el alumno tiene nota', () => {
    expect(promedioAlumno(columnas, 'a')).toBe(5)   // (4+6)/2
    expect(promedioAlumno(columnas, 'b')).toBe(8)   // solo una nota
  })

  it('un alumno sin ninguna nota da null', () => {
    expect(promedioAlumno(columnas, 'c')).toBe(null)
  })
})

describe('suspenso', () => {
  it('por debajo del aprobado', () => {
    expect(suspenso(APROBADO - 0.1)).toBe(true)
    expect(suspenso(APROBADO)).toBe(false)
  })

  it('sin nota no está suspenso: no hay nota que suspender', () => {
    expect(suspenso(null)).toBe(false)
    expect(suspenso(undefined)).toBe(false)
  })
})
