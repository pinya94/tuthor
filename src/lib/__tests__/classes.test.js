// generateClassCode es la única parte pura/determinista de classes.js (el
// resto son lecturas/escrituras a Firestore, verificadas manualmente en
// preview). El regex aquí debe coincidir con el de firestore.rules
// (classes/{classId}.code) — si se cambia el alfabeto o la longitud, hay
// que actualizar ambos sitios.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { generateClassCode, hasTeacherAccess, TEACHER_BETA_CODE } from '../classes.js'

const RULES = readFileSync(new URL('../../../firestore.rules', import.meta.url), 'utf8')

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

  it('sigue aceptando el código antiguo de quien ya estaba dentro', () => {
    // Al cambiar la palabra de la beta, quien se registró con la anterior la
    // tiene guardada en su promoCode. Si solo se acepta la nueva, se queda
    // fuera sin ningún aviso: ni panel, ni lectura de sus propias clases.
    expect(hasTeacherAccess({ active: true, promoCode: 'L4FXL3' })).toBe(true)
  })
})

// El código de la beta ahora lo manda el cliente automáticamente (Profesores.jsx),
// así que si este string y el de firestore.rules (hasValidPromoCode) divergen,
// cualquier profesor nuevo se queda fuera en silencio — sin este test, ese
// desajuste no lo cazaría nada hasta que alguien se quejara.
it('el código de la beta coincide con el que exige firestore.rules', () => {
  expect(RULES).toContain(`promoCode == '${TEACHER_BETA_CODE}'`)
})

// isTeacher() de las rules es el MISMO criterio que hasTeacherAccess, duplicado
// porque las rules no pueden importar JS. Si una acepta un código y la otra no,
// el profesor ve su panel y acto seguido no puede leer ni una de sus clases.
it('isTeacher() de firestore.rules acepta los mismos códigos que hasTeacherAccess', () => {
  for (const codigo of [TEACHER_BETA_CODE, 'L4FXL3']) {
    expect(hasTeacherAccess({ active: true, promoCode: codigo })).toBe(true)
    expect(RULES, `isTeacher() no acepta ${codigo}`)
      .toMatch(new RegExp(String.raw`promoCode in \[[^\]]*'${codigo}'`))
  }
})

// La puerta de ENTRADA es lo contrario: ahí solo vale la palabra vigente. Si
// hasValidPromoCode() aceptara también las viejas, reabriríamos justo el hueco
// que se cerró al cambiarla (durante diez minutos cualquiera podía hacerse
// profesor, y el promoCode que se guardaba era L4FXL3).
it('registrarse de nuevas NO admite códigos antiguos', () => {
  const entrada = RULES.slice(RULES.indexOf('function hasValidPromoCode()'))
    .slice(0, RULES.slice(RULES.indexOf('function hasValidPromoCode()')).indexOf('}') + 1)
  expect(entrada).toContain(TEACHER_BETA_CODE)
  expect(entrada).not.toContain('L4FXL3')
})
