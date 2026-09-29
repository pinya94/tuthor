// Preferencia de fondo (lib/fondo.js). Los tests corren en Node sin DOM, así
// que se simula lo justo de `window`: un EventTarget con un localStorage.
import { describe, it, expect, beforeEach } from 'vitest'

const store = new Map()
let rompeGuardar = false
globalThis.window = Object.assign(new EventTarget(), {
  localStorage: {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => {
      if (rompeGuardar) throw new Error('QuotaExceeded')
      store.set(k, String(v))
    },
  },
})

const { getFondo, setFondo, FONDO_POR_DEFECTO, FONDOS } = await import('../fondo.js')

describe('preferencia de fondo', () => {
  beforeEach(() => { store.clear(); rompeGuardar = false })

  it('por defecto es liso', () => {
    expect(FONDO_POR_DEFECTO).toBe('liso')
    expect(getFondo()).toBe('liso')
  })

  it('se puede cambiar a bosque y volver, y se guarda', () => {
    setFondo('bosque')
    expect(getFondo()).toBe('bosque')
    expect(store.get('tuthor-fondo')).toBe('bosque')
    setFondo('liso')
    expect(getFondo()).toBe('liso')
  })

  it('ignora valores que no existen y lo guardado corrupto', () => {
    setFondo('neón')
    expect(getFondo()).toBe(FONDO_POR_DEFECTO)
    store.set('tuthor-fondo', 'basura')
    expect(getFondo()).toBe(FONDO_POR_DEFECTO)
  })

  it('avisa del cambio para que la app se repinte', () => {
    let avisos = 0
    const cb = () => { avisos++ }
    window.addEventListener('tuthor-fondo-cambio', cb)
    setFondo('bosque')
    window.removeEventListener('tuthor-fondo-cambio', cb)
    expect(avisos).toBe(1)
  })

  it('si no se puede guardar, lo recuerda en memoria', () => {
    rompeGuardar = true
    setFondo('bosque')
    expect(getFondo()).toBe('bosque')
  })

  it('solo hay dos fondos', () => {
    expect(FONDOS).toEqual(['liso', 'bosque'])
  })
})
