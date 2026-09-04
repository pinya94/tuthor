// generateClassCode es la única parte pura/determinista de classes.js (el
// resto son lecturas/escrituras a Firestore, verificadas manualmente en
// preview). El regex aquí debe coincidir con el de firestore.rules
// (classes/{classId}.code) — si se cambia el alfabeto o la longitud, hay
// que actualizar ambos sitios.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { generateClassCode, hasTeacherAccess, TEACHER_BETA_CODE } from '../classes.js'

describe('generateClassCode', () => {
  it('genera códigos de 6 caracteres sin ambigüedades (sin 0/O ni 1/I)', () => {
    for (let i = 0; i < 200; i++) {
      const code = generateClassCode()
      expect(code).toMatch(/^[A-Z0-9]{6}$/)
      expect(code).not.toMatch(/[0O1I]/)
    }
  })
})

describe('hasTeacherAccess', () => {
  it('da acceso con el código de la beta', () => {
    expect(hasTeacherAccess({ active: true, promoCode: TEACHER_BETA_CODE })).toBe(true)
  })

  it('sin cuenta activa no hay acceso, aunque el código sea correcto', () => {
    expect(hasTeacherAccess({ active: false, promoCode: TEACHER_BETA_CODE })).toBe(false)
  })

  it('un código distinto no da acceso por sí solo', () => {
    expect(hasTeacherAccess({ active: true, promoCode: 'OTRO' })).toBe(false)
  })
})

// El código de la beta ahora lo manda el cliente automáticamente (Profesores.jsx),
// así que si este string y el de firestore.rules (hasValidPromoCode) divergen,
// cualquier profesor nuevo se queda fuera en silencio — sin este test, ese
// desajuste no lo cazaría nada hasta que alguien se quejara.
it('el código de la beta coincide con el que exige firestore.rules', () => {
  const rules = readFileSync(new URL('../../../firestore.rules', import.meta.url), 'utf8')
  expect(rules).toContain(`promoCode == '${TEACHER_BETA_CODE}'`)
})
