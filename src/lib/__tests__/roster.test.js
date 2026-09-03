// Invariantes de las fichas de alumnos sin cuenta. Lo que de verdad importa:
// un id de ficha nunca puede confundirse con un uid real, porque de eso
// depende que el merge sepa a qué lado moverse.
import { describe, it, expect } from 'vitest'
import { PLACEHOLDER_PREFIX, esFicha, esCuentaReal, generarIdFicha, fichasDe, comoAlumno } from '../roster'

describe('esFicha / esCuentaReal', () => {
  it('un id de ficha se reconoce por el prefijo', () => {
    expect(esFicha('ph_abc123')).toBe(true)
    expect(esCuentaReal('ph_abc123')).toBe(false)
  })

  it('un uid real (sin el prefijo) es lo contrario', () => {
    expect(esFicha('AbCdEf123456')).toBe(false)
    expect(esCuentaReal('AbCdEf123456')).toBe(true)
  })

  it('no revienta con valores raros', () => {
    expect(esFicha(null)).toBe(false)
    expect(esFicha(undefined)).toBe(false)
    expect(esCuentaReal('')).toBe(false)
  })
})

describe('generarIdFicha', () => {
  it('siempre lleva el prefijo', () => {
    expect(generarIdFicha().startsWith(PLACEHOLDER_PREFIX)).toBe(true)
  })

  it('dos llamadas seguidas no coinciden (con el azar real)', () => {
    expect(generarIdFicha()).not.toBe(generarIdFicha())
  })

  it('es determinista si se le fija el azar, como los generadores de ronda del resto del proyecto', () => {
    const rand = () => 0
    expect(generarIdFicha(rand)).toBe(generarIdFicha(rand))
  })
})

describe('fichasDe', () => {
  it('sale en orden alfabético, no en el de creación', () => {
    const clase = { roster: { ph_2: { name: 'Zoe' }, ph_1: { name: 'Ana' } } }
    expect(fichasDe(clase).map(f => f.name)).toEqual(['Ana', 'Zoe'])
  })

  it('una clase sin roster da una lista vacía, no revienta', () => {
    expect(fichasDe({})).toEqual([])
    expect(fichasDe(null)).toEqual([])
  })
})

describe('comoAlumno', () => {
  it('tiene la misma forma que un alumno real, con las estadísticas a cero', () => {
    const a = comoAlumno({ id: 'ph_x', name: 'Nora' })
    expect(a).toEqual({
      uid: 'ph_x', name: 'Nora', coins: 0, streak: 0, totalTime: 0, examsTaken: 0,
      subjectEntries: [], esFicha: true,
    })
  })
})
