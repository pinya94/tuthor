// Invariantes de la asistencia. Las dos que de verdad importan:
//
//  · el día se calcula en hora LOCAL. Con toISOString() una clase de tarde se
//    guardaría en el día siguiente, y el profesor vería la lista de ayer en
//    blanco sin entender por qué;
//  · 'presente' NO se guarda. Si alguna vez se guardara, un alumno que se une
//    en marzo heredaría las faltas de todo febrero.
import { describe, it, expect } from 'vitest'
import {
  ESTADOS, ESTADO_META, diaISO, diasDelMes, estadoDe, siguienteEstado, conMarca,
  resumenDelDia, totalesPorAlumno,
} from '../attendance'

const ALUMNOS = ['a', 'b', 'c']

describe('diaISO', () => {
  it('usa la fecha local, no la UTC', () => {
    // 23:30 del 31 de diciembre en hora local: en UTC+1 esto ya es el 1 de
    // enero en Greenwich, y toISOString() daría 2025-01-01.
    expect(diaISO(new Date(2024, 11, 31, 23, 30))).toBe('2024-12-31')
  })

  it('rellena mes y día con cero', () => {
    expect(diaISO(new Date(2025, 0, 5))).toBe('2025-01-05')
  })
})

describe('diasDelMes', () => {
  it('de un mes pasado devuelve el mes entero', () => {
    expect(diasDelMes(new Date(2024, 1, 15))).toHaveLength(29) // 2024 es bisiesto
  })

  it('no devuelve días que todavía no han pasado', () => {
    const hoy = new Date()
    const dias = diasDelMes(hoy)
    expect(dias).toHaveLength(hoy.getDate())
    expect(dias[dias.length - 1]).toBe(diaISO(hoy))
  })
})

describe('estados', () => {
  it('sin marca se está presente', () => {
    expect(estadoDe({}, 'a')).toBe('presente')
    expect(estadoDe(undefined, 'a')).toBe('presente')
  })

  it('el ciclo pasa por todos los estados y vuelve al principio', () => {
    let e = 'presente'
    const vistos = []
    for (let i = 0; i < ESTADOS.length; i++) { e = siguienteEstado(e); vistos.push(e) }
    expect(vistos).toEqual([...ESTADOS.slice(1), 'presente'])
  })

  it('cada estado tiene etiqueta en los tres idiomas', () => {
    for (const e of ESTADOS) {
      for (const lang of ['es', 'en', 'ca']) {
        expect(ESTADO_META[e]?.label?.[lang], `${e}: falta label.${lang}`).toBeTruthy()
      }
    }
  })
})

describe('conMarca', () => {
  it('marcar presente borra la marca en vez de guardarla', () => {
    expect(conMarca({ a: 'ausente' }, 'a', 'presente')).toEqual({})
  })

  it('guarda el resto de estados', () => {
    expect(conMarca({}, 'a', 'retraso')).toEqual({ a: 'retraso' })
  })

  it('no muta el mapa que recibe', () => {
    const antes = { a: 'ausente' }
    conMarca(antes, 'b', 'retraso')
    expect(antes).toEqual({ a: 'ausente' })
  })
})

describe('resumenDelDia', () => {
  it('cuenta como presentes a los que no tienen marca', () => {
    expect(resumenDelDia({ a: 'ausente' }, ALUMNOS))
      .toEqual({ presente: 2, ausente: 1, retraso: 0, justificada: 0 })
  })

  it('un día sin pasar no cuenta faltas a nadie', () => {
    expect(resumenDelDia({}, ALUMNOS).ausente).toBe(0)
  })
})

describe('totalesPorAlumno', () => {
  const dias = {
    '2025-03-03': { a: 'ausente' },
    '2025-03-04': { a: 'retraso', b: 'ausente' },
    '2025-03-05': { a: 'ausente' },
  }

  it('suma por alumno y por tipo', () => {
    const t = totalesPorAlumno(dias, ALUMNOS)
    expect(t.a).toEqual({ ausente: 2, retraso: 1, justificada: 0 })
    expect(t.b).toEqual({ ausente: 1, retraso: 0, justificada: 0 })
  })

  it('quien nunca ha faltado sale a cero, no ausente de la lista', () => {
    expect(totalesPorAlumno(dias, ALUMNOS).c).toEqual({ ausente: 0, retraso: 0, justificada: 0 })
  })

  it('ignora marcas de alumnos que ya no están en la clase', () => {
    const t = totalesPorAlumno({ '2025-03-03': { fantasma: 'ausente' } }, ALUMNOS)
    expect(t.fantasma).toBeUndefined()
  })
})
