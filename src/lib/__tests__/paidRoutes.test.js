// El muro se define en un solo sitio, así que un fallo aquí es o bien regalar
// el producto (cuando se reactive) o bien cerrar una página que alimenta el
// funnel. Los casos se escriben con URLs reales del sitemap, no inventadas.
//
// Desde 2026-08 el muro está apagado (PAYWALL_ENABLED = false en
// paidRoutes.js): `requiresAccess` es siempre false. La tabla de qué
// PEDIRÍA acceso si se reactivase sigue viva en `wouldRequireAccessIfEnabled`
// y sigue teniendo sus propios tests, para que el día que se reactive el
// muro se sepa que la tabla sigue siendo correcta.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { requiresAccess, wouldRequireAccessIfEnabled, normalizePath } from '../paidRoutes.js'

describe('normalizePath', () => {
  it('quita el prefijo de idioma', () => {
    expect(normalizePath('/en/juegos/portero')).toBe('/juegos/portero')
    expect(normalizePath('/ca/examen/algebra')).toBe('/examen/algebra')
  })

  it('la raíz de cada idioma es la raíz', () => {
    for (const p of ['/', '/en', '/ca', '/en/', '/ca/']) {
      expect(normalizePath(p)).toBe('/')
    }
  })

  it('la barra final no cambia la página', () => {
    expect(normalizePath('/juegos/portero/')).toBe('/juegos/portero')
  })

  it('no confunde un idioma con el principio de otra palabra', () => {
    // /entrenar empieza por "en" pero no es el prefijo de inglés.
    expect(normalizePath('/entrenar')).toBe('/entrenar')
  })
})

describe('muro apagado: requiresAccess no pide acceso a nada', () => {
  const anywhere = [
    '/', '/app', '/juegos', '/juegos/portero', '/juegos/georush',
    '/examen/historia', '/examen/algebra', '/examen/diagnostico',
    '/estudiar/matematicas/sumas/jugar', '/estudiar/matematicas/sumas/examen',
    '/en/juegos/portero', '/ca/examen/algebra',
  ]

  for (const path of anywhere) {
    it(`${path} no pide acceso`, () => {
      expect(requiresAccess(path)).toBe(false)
    })
  }

  it('tampoco pide acceso a ninguna URL de pago del sitemap', () => {
    const sitemap = readFileSync(new URL('../../../public/sitemap.xml', import.meta.url), 'utf8')
    const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(m => new URL(m[1]).pathname)
      .map(normalizePath)
    const wouldBePaid = paths.filter(p => p !== '/juegos' && (p.startsWith('/juegos/') || p.startsWith('/examen')))
    expect(wouldBePaid.length).toBeGreaterThan(50) // hay bastantes o el test no prueba nada
    for (const p of wouldBePaid) {
      expect(requiresAccess(p), `${p} no debería pedir acceso (muro apagado)`).toBe(false)
    }
  })
})

describe('la tabla dormida (wouldRequireAccessIfEnabled) sigue siendo correcta', () => {
  const free = [
    '/', '/app',
    '/juegos',                       // el catálogo es el escaparate
    '/estudiar', '/estudiar/historia', '/estudiar/matematicas',
    '/estudiar/idiomas/espanol/gramatica',
    '/estudiar/matematicas/funciones',
    '/info/juegos', '/info/estudiar', '/info/estudiar/fuerzas',
    '/privacidad', '/contacto', '/profesores', '/pago/gracias',
  ]

  for (const path of free) {
    it(`${path} no pediría acceso`, () => {
      expect(wouldRequireAccessIfEnabled(path)).toBe(false)
    })
  }

  const paid = [
    '/juegos/portero', '/juegos/georush', '/juegos/tuthor-time',
    '/juegos/acercate/clasico',
    '/examen/historia', '/examen/algebra', '/examen/fuerza-neta-test',
    '/examen/matematicas/funciones/portero',
    '/examen/diagnostico',
    // La puerta trasera: cuelgan de /estudiar pero son juego y examen.
    '/estudiar/matematicas/sumas/jugar',
    '/estudiar/matematicas/sumas/examen',
  ]

  for (const path of paid) {
    it(`${path} pediría acceso`, () => {
      expect(wouldRequireAccessIfEnabled(path)).toBe(true)
    })
  }

  it('el idioma no cambia el resultado, ni para abrir ni para cerrar', () => {
    for (const path of ['/juegos/portero', '/examen/algebra']) {
      expect(wouldRequireAccessIfEnabled(path)).toBe(true)
      expect(wouldRequireAccessIfEnabled(`/en${path}`)).toBe(true)
      expect(wouldRequireAccessIfEnabled(`/ca${path}`)).toBe(true)
    }
    for (const path of ['/estudiar/historia', '/info/juegos', '/juegos']) {
      expect(wouldRequireAccessIfEnabled(`/en${path}`)).toBe(false)
      expect(wouldRequireAccessIfEnabled(`/ca${path}`)).toBe(false)
    }
  })

  it('todas las URLs de /juegos/* y /examen/* del sitemap pedirían acceso', () => {
    const sitemap = readFileSync(new URL('../../../public/sitemap.xml', import.meta.url), 'utf8')
    const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(m => new URL(m[1]).pathname)
      .map(normalizePath)
    const shouldBePaid = paths.filter(p => p !== '/juegos' && (p.startsWith('/juegos/') || p.startsWith('/examen')))
    expect(shouldBePaid.length).toBeGreaterThan(50)
    for (const p of shouldBePaid) {
      expect(wouldRequireAccessIfEnabled(p), `${p} debería pedir acceso`).toBe(true)
    }
  })

  it('ninguna ficha de /info/* ni hub de /estudiar/* se cerraría por error', () => {
    const sitemap = readFileSync(new URL('../../../public/sitemap.xml', import.meta.url), 'utf8')
    const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(m => new URL(m[1]).pathname)
      .map(normalizePath)
    const shouldBeFree = paths.filter(p => p.startsWith('/info') || p === '/estudiar' || /^\/estudiar\/[^/]+$/.test(p))
    expect(shouldBeFree.length).toBeGreaterThan(20)
    for (const p of shouldBeFree) {
      expect(wouldRequireAccessIfEnabled(p), `${p} debería ser gratis`).toBe(false)
    }
  })
})
