// Invariantes de api/merge-placeholder.js — no se puede ejecutar en un test de
// unidad (necesita Firebase Admin de verdad), así que aquí se inspecciona el
// código fuente. Lo que de verdad importa: que nunca pueda mover el historial
// de una ficha a un uid sin haber comprobado antes que ese uid es un miembro
// real de la clase, y que un placeholderId con forma rara no llegue a tocar
// Firestore.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { PLACEHOLDER_PREFIX } from '../roster'

const src = readFileSync(new URL('../../../api/merge-placeholder.js', import.meta.url), 'utf8')

describe('api/merge-placeholder.js', () => {
  it('exige Bearer token antes de tocar nada', () => {
    expect(src).toMatch(/authHeader\.startsWith\('Bearer '\)/)
  })

  it('rechaza una sesión de hijo, como el resto de endpoints que actúan a nombre del usuario', () => {
    expect(src).toMatch(/decoded\.childMode === true/)
  })

  it('comprueba que el uid ya está en studentIds antes de fusionar nada', () => {
    expect(src).toContain('studentIds ?? []).includes(uid)')
  })

  it('rechaza un placeholderId que no lleva el prefijo real de una ficha', () => {
    // Si esta comprobación se quitara, cualquier id llegaría hasta la
    // transacción — inofensivo hoy (roster.<id> no existiría), pero es la
    // única frontera explícita entre "esto es una ficha" y "esto es un uid".
    expect(src).toContain(`placeholderId.startsWith('${PLACEHOLDER_PREFIX}')`)
  })

  it('no se apunta un valor por encima de uno que el destino ya tenía', () => {
    // Las dos fusiones (asistencia y notas) comparten esta forma: borrar
    // siempre la clave de la ficha, pero escribir la del uid real SOLO si no
    // existía ya. Sin el `if`, fusionar pisaría una falta o una nota que el
    // alumno ya tuviera puesta con su cuenta real antes de reclamar la ficha.
    const apariciones = src.match(/if \(!\(uid in \w+\)\)/g) ?? []
    expect(apariciones.length).toBeGreaterThanOrEqual(2) // seating + el bucle de attendance/gradeColumns
  })

  it('quitar la ficha del roster y comprobar que existe pasan por la misma transacción', () => {
    const zona = src.slice(src.indexOf('runTransaction'), src.indexOf('resultado.ok'))
    expect(zona).toContain('roster?.[placeholderId]')
    expect(zona).toContain(`roster.${'${placeholderId}'}`)
  })

  it('recorre asistencia y notas con el mismo mecanismo de lotes', () => {
    expect(src).toContain("['attendance', 'marks']")
    expect(src).toContain("['gradeColumns', 'values']")
  })
})
