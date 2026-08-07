// authErrorKey traduce códigos de Firebase Y de nuestros endpoints a una clave
// única. Si una clave nueva no tiene mensaje en AuthModal, el usuario ve un
// hueco: por eso el test cruza ambos lados.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { authErrorKey } from '../authErrors.js'

describe('authErrorKey', () => {
  it('traduce los errores propios de /api/child-login', () => {
    expect(authErrorKey({ code: 'not_found' })).toBe('bad_code')
    expect(authErrorKey({ code: 'too_many' })).toBe('too_many')
  })

  it('traduce los de Firebase que sí pueden darse con Google', () => {
    expect(authErrorKey({ code: 'auth/too-many-requests' })).toBe('too_many')
    expect(authErrorKey({ code: 'auth/network-request-failed' })).toBe('network')
  })

  it('cae en unknown ante cualquier cosa rara, sin lanzar', () => {
    expect(authErrorKey(null)).toBe('unknown')
    expect(authErrorKey(undefined)).toBe('unknown')
    expect(authErrorKey({})).toBe('unknown')
    expect(authErrorKey({ code: 'auth/algo-que-no-existe' })).toBe('unknown')
  })

  it('toda clave que devuelve tiene mensaje en AuthModal', () => {
    const modal = readFileSync(new URL('../../components/AuthModal.jsx', import.meta.url), 'utf8')
    const declared = modal.slice(modal.indexOf('const ERRORS'), modal.indexOf('export default'))

    const codes = [
      'auth/too-many-requests', 'auth/network-request-failed',
      'not_found', 'too_many', 'lo-que-sea',
    ]
    for (const code of codes) {
      const key = authErrorKey({ code })
      expect(declared, `falta el mensaje de "${key}" en ERRORS`).toContain(`${key}:`)
    }
    // 'google' no sale de authErrorKey (lo pone la UI a mano al fallar el
    // popup), pero tiene que existir igualmente.
    expect(declared).toContain('google:')
  })
})
