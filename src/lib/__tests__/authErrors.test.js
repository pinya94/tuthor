// authErrorKey traduce códigos de Firebase Y de nuestros endpoints a una clave
// única. Si una clave nueva no tiene mensaje en AuthModal, el usuario ve un
// hueco: por eso el test cruza ambos lados.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { authErrorKey, hasRealEmail } from '../authErrors.js'

describe('authErrorKey', () => {
  it('agrupa los tres códigos de credencial en un mensaje ambiguo', () => {
    // No debe distinguirse "ese email no existe" de "esa contraseña está mal":
    // sería confirmar qué emails hay registrados.
    for (const code of ['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential']) {
      expect(authErrorKey({ code })).toBe('bad_credentials')
    }
  })

  it('traduce los errores propios de /api/child-login', () => {
    expect(authErrorKey({ code: 'not_found' })).toBe('bad_code')
    expect(authErrorKey({ code: 'too_many' })).toBe('too_many')
  })

  it('cae en unknown ante cualquier cosa rara, sin lanzar', () => {
    expect(authErrorKey(null)).toBe('unknown')
    expect(authErrorKey(undefined)).toBe('unknown')
    expect(authErrorKey({})).toBe('unknown')
    expect(authErrorKey({ code: 'auth/algo-que-no-existe' })).toBe('unknown')
  })

  it('toda clave que devuelve tiene mensaje en AuthModal', () => {
    const modal = readFileSync(new URL('../../components/AuthModal.jsx', import.meta.url), 'utf8')
    const declared = modal.slice(modal.indexOf('const ERRORS'), modal.indexOf('const INPUT'))

    const codes = [
      'auth/email-already-in-use', 'auth/invalid-email', 'auth/weak-password',
      'auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential',
      'auth/too-many-requests', 'auth/network-request-failed',
      'not_found', 'too_many', 'lo-que-sea',
    ]
    for (const code of codes) {
      const key = authErrorKey({ code })
      expect(declared, `falta el mensaje de "${key}" en ERRORS`).toContain(`${key}:`)
    }
  })
})

describe('hasRealEmail', () => {
  it('rechaza los emails internos de las cuentas de username', () => {
    // Estas cuentas no pueden recibir factura ni enlace de recuperación.
    expect(hasRealEmail({ email: 'pepito@tuthor.app' })).toBe(false)
  })

  it('acepta un email de verdad', () => {
    expect(hasRealEmail({ email: 'madre@gmail.com' })).toBe(true)
  })

  it('sin email no hay email real', () => {
    // Una sesión de hijo (custom token) no lleva email: no debe colarse como
    // cuenta facturable.
    expect(hasRealEmail({ email: null })).toBe(false)
    expect(hasRealEmail({})).toBe(false)
    expect(hasRealEmail(null)).toBe(false)
  })
})
