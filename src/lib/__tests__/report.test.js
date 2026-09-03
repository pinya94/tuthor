// Invariantes del boletín. Lo que de verdad importa: que el rango de fechas
// filtre de verdad (una nota o una falta de fuera del trimestre no debe
// colarse) y que el % de asistencia cuente los retrasos y las justificadas
// como "sí vino", que es lo que le importa a una familia leyéndolo.
import { describe, it, expect } from 'vitest'
import { trimestresDelCurso, generarBoletin } from '../report'

const ts = iso => ({ toMillis: () => new Date(iso).getTime() })

describe('trimestresDelCurso', () => {
  it('en octubre, el curso empezó este septiembre', () => {
    const [t1] = trimestresDelCurso(new Date(2026, 9, 15)) // 15 oct 2026
    expect(t1.desde).toBe('2026-09-01')
  })

  it('en marzo, el curso empezó el septiembre ANTERIOR', () => {
    const [t1] = trimestresDelCurso(new Date(2027, 2, 15)) // 15 mar 2027
    expect(t1.desde).toBe('2026-09-01')
  })

  it('los tres trimestres no se solapan y van en orden', () => {
    const [t1, t2, t3] = trimestresDelCurso(new Date(2026, 9, 1))
    expect(t1.hasta < t2.desde).toBe(true)
    expect(t2.hasta < t3.desde).toBe(true)
  })

  it('"curso completo" cubre a los tres', () => {
    const [t1, , t3, curso] = trimestresDelCurso(new Date(2026, 9, 1))
    expect(curso.desde <= t1.desde).toBe(true)
    expect(curso.hasta >= t3.hasta).toBe(true)
  })
})

describe('generarBoletin', () => {
  const columnas = [
    { name: 'Examen 1', values: { a: 7 }, createdAt: ts('2026-10-01') },
    { name: 'Examen 2', values: { a: 5 }, createdAt: ts('2026-11-01') },
    { name: 'Examen 3 (2º trim.)', values: { a: 9 }, createdAt: ts('2027-02-01') },
  ]
  const dias = {
    '2026-10-05': {},              // a presente (sin marca)
    '2026-10-06': { a: 'ausente' },
    '2026-10-07': { a: 'retraso' },
    '2026-11-20': { a: 'justificada' },
  }
  const observaciones = [
    { uid: 'a', text: 'Bien', tag: 'positiva', createdAt: ts('2026-10-10') },
    { uid: 'a', text: 'Fuera de rango', tag: 'neutra', createdAt: ts('2027-05-01') },
    { uid: 'b', text: 'De otro alumno', tag: 'neutra', createdAt: ts('2026-10-10') },
  ]

  it('solo incluye notas del rango pedido', () => {
    const b = generarBoletin({ uid: 'a', columnas, dias, observaciones, desde: '2026-09-01', hasta: '2026-12-22' })
    expect(b.notas.lista.map(n => n.nombre)).toEqual(['Examen 1', 'Examen 2'])
    expect(b.notas.media).toBe(6) // (7+5)/2
  })

  it('cuenta presentes, retrasos y justificadas como asistencia, y calcula el porcentaje', () => {
    const b = generarBoletin({ uid: 'a', columnas, dias, observaciones, desde: '2026-09-01', hasta: '2026-12-22' })
    expect(b.asistencia).toEqual({ total: 4, presente: 1, ausente: 1, retraso: 1, justificada: 1, porcentaje: 75 })
  })

  it('solo trae observaciones del alumno y del rango', () => {
    const b = generarBoletin({ uid: 'a', columnas, dias, observaciones, desde: '2026-09-01', hasta: '2026-12-22' })
    expect(b.observaciones).toHaveLength(1)
    expect(b.observaciones[0].text).toBe('Bien')
  })

  it('un alumno sin ningún dato en el periodo da un boletín vacío, no revienta', () => {
    const b = generarBoletin({ uid: 'z', columnas, dias, observaciones, desde: '2026-09-01', hasta: '2026-12-22' })
    expect(b.notas.lista).toEqual([])
    expect(b.notas.media).toBe(null)
    expect(b.observaciones).toEqual([])
  })

  it('sin ningún día registrado, el porcentaje es null y no 0/0', () => {
    const b = generarBoletin({ uid: 'a', columnas, dias: {}, observaciones, desde: '2026-09-01', hasta: '2026-12-22' })
    expect(b.asistencia.porcentaje).toBe(null)
  })
})
