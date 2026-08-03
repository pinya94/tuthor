// generateClassCode es la única parte pura/determinista de classes.js (el
// resto son lecturas/escrituras a Firestore, verificadas manualmente en
// preview). El regex aquí debe coincidir con el de firestore.rules
// (classes/{classId}.code) — si se cambia el alfabeto o la longitud, hay
// que actualizar ambos sitios.
import { describe, it, expect } from 'vitest'
import { generateClassCode } from '../classes.js'

describe('generateClassCode', () => {
  it('genera códigos de 6 caracteres sin ambigüedades (sin 0/O ni 1/I)', () => {
    for (let i = 0; i < 200; i++) {
      const code = generateClassCode()
      expect(code).toMatch(/^[A-Z0-9]{6}$/)
      expect(code).not.toMatch(/[0O1I]/)
    }
  })
})
