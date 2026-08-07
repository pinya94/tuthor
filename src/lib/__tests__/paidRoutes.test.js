// El muro se define en un solo sitio, así que un fallo aquí es o bien regalar
// el producto o bien cerrar una página que alimenta el funnel. Los casos se
// escriben con URLs reales del sitemap, no inventadas.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { requiresAccess, normalizePath } from '../paidRoutes.js'

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

describe('rutas gratuitas', () => {
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
    it(`${path} no pide acceso`, () => {
      expect(requiresAccess(path)).toBe(false)
    })
  }
})

describe('rutas de pago', () => {
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
    it(`${path} pide acceso`, () => {
      expect(requiresAccess(path)).toBe(true)
    })
  }
})

describe('el idioma no abre ninguna puerta', () => {
  it('la versión en inglés y catalana se gatean igual', () => {
    for (const path of ['/juegos/portero', '/examen/algebra']) {
      expect(requiresAccess(path)).toBe(true)
      expect(requiresAccess(`/en${path}`)).toBe(true)
      expect(requiresAccess(`/ca${path}`)).toBe(true)
    }
  })

  it('y tampoco cierra las gratuitas', () => {
    for (const path of ['/estudiar/historia', '/info/juegos', '/juegos']) {
      expect(requiresAccess(`/en${path}`)).toBe(false)
      expect(requiresAccess(`/ca${path}`)).toBe(false)
    }
  })
})

describe('cobertura real del sitemap', () => {
  const sitemap = readFileSync(new URL('../../../public/sitemap.xml', import.meta.url), 'utf8')
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => new URL(m[1]).pathname)
    .map(normalizePath)

  it('todas las URLs de /juegos/* y /examen/* del sitemap quedan detrás del muro', () => {
    const shouldBePaid = paths.filter(p => p !== '/juegos' && (p.startsWith('/juegos/') || p.startsWith('/examen')))
    expect(shouldBePaid.length).toBeGreaterThan(50)
    for (const p of shouldBePaid) {
      expect(requiresAccess(p), `${p} debería pedir acceso`).toBe(true)
    }
  })

  it('ninguna ficha de /info/* ni hub de /estudiar/* se cierra por error', () => {
    const shouldBeFree = paths.filter(p => p.startsWith('/info') || p === '/estudiar' || /^\/estudiar\/[^/]+$/.test(p))
    expect(shouldBeFree.length).toBeGreaterThan(20)
    for (const p of shouldBeFree) {
      expect(requiresAccess(p), `${p} debería ser gratis`).toBe(false)
    }
  })
})
