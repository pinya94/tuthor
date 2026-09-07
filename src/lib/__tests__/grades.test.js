// Invariantes del cuaderno de notas. Lo que de verdad importa: "sin nota" y
// "un 0" son cosas distintas, y eso tiene que sobrevivir a parsear el input,
// a promediar y a lo que se guarda en Firestore.
import { describe, it, expect } from 'vitest'
import {
  NOTA_MIN, NOTA_MAX, APROBADO, notaValida, parseNota, promedioColumna, promedioAlumno, suspenso,
  PESO_POR_DEFECTO, PESO_MAX, pesoValido, pesoDe, porcentajeDeColumna,
} from '../grades'

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

// ── Ponderaciones ────────────────────────────────────────────────────────────
// Aquí un fallo no da un error: da una nota distinta de la que el profesor
// puso, y nadie se entera hasta que alguien reclama. De ahí que se compruebe
// también lo que NO debe cambiar.
describe('pesos de las columnas', () => {
  it('una columna sin peso pesa 1, como antes de que existieran los pesos', () => {
    // Es lo que hace que no haga falta migrar ni un solo cuaderno antiguo.
    expect(pesoDe({})).toBe(PESO_POR_DEFECTO)
    expect(pesoDe(undefined)).toBe(PESO_POR_DEFECTO)
    expect(pesoDe({ peso: null })).toBe(PESO_POR_DEFECTO)
    expect(pesoDe({ peso: 'dos' })).toBe(PESO_POR_DEFECTO)
  })

  it('acepta el cero y rechaza lo que no es un peso', () => {
    expect(pesoValido(0)).toBe(true)      // "no cuenta para la media"
    expect(pesoValido(PESO_MAX)).toBe(true)
    expect(pesoValido(-1)).toBe(false)
    expect(pesoValido(PESO_MAX + 1)).toBe(false)
    expect(pesoValido(NaN)).toBe(false)
    expect(pesoValido('3')).toBe(false)
  })

  it('el porcentaje que se enseña es el reparto real del peso', () => {
    const cols = [{ id: 'a', peso: 3 }, { id: 'b', peso: 1 }]
    expect(porcentajeDeColumna(cols, 'a')).toBe(75)
    expect(porcentajeDeColumna(cols, 'b')).toBe(25)
  })

  it('si todo pesa 0 no se divide entre cero', () => {
    const cols = [{ id: 'a', peso: 0 }, { id: 'b', peso: 0 }]
    expect(porcentajeDeColumna(cols, 'a')).toBe(0)
  })
})

describe('promedioAlumno ponderado', () => {
  it('sin pesos da exactamente lo mismo que la media de siempre', () => {
    // El cambio no puede mover ni una nota de los cuadernos que ya existen.
    const cols = [{ values: { a: 4 } }, { values: { a: 6 } }, { values: { a: 8 } }]
    expect(promedioAlumno(cols, 'a')).toBe(6)
  })

  it('un examen que pesa el triple arrastra la media', () => {
    const cols = [
      { peso: 3, values: { a: 4 } },   // examen
      { peso: 1, values: { a: 8 } },   // libreta
    ]
    expect(promedioAlumno(cols, 'a')).toBe(5)   // (4*3 + 8*1) / 4
  })

  it('una columna con peso 0 no cuenta, pero su nota sigue estando', () => {
    const cols = [
      { peso: 1, values: { a: 10 } },
      { peso: 0, values: { a: 0 } },   // informativa: no debe hundir la media
    ]
    expect(promedioAlumno(cols, 'a')).toBe(10)
  })

  it('las columnas sin nota no gastan su peso', () => {
    // A quien le falta el examen que pesa 3, la media se le calcula con lo que
    // sí ha hecho. Tratar la falta como un cero es decisión del profesor.
    const cols = [
      { peso: 3, values: {} },         // no lo ha hecho
      { peso: 1, values: { a: 7 } },
    ]
    expect(promedioAlumno(cols, 'a')).toBe(7)
  })

  it('si todo lo que tiene nota pesa 0, no hay media', () => {
    expect(promedioAlumno([{ peso: 0, values: { a: 9 } }], 'a')).toBe(null)
  })

  it('un peso inválido no rompe la media: la columna cuenta como 1', () => {
    const cols = [{ peso: -5, values: { a: 4 } }, { peso: 1, values: { a: 8 } }]
    expect(promedioAlumno(cols, 'a')).toBe(6)
  })
})
