// El recurso /recursos/funciones: cada tipo de problema resuelve sus propios
// ejemplos (son lo primero que ve quien entra), los errores señalan la casilla
// que falla, y cada tipo tiene su URL publicada con meta propia.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { TIPOS, resolver, rutaDe, tipoPorSlug, clavesDe, MENSAJE_ERROR } from '../recursoFunciones'
import { STATIC_META } from '../staticMeta'

const sitemap = readFileSync('public/sitemap.xml', 'utf8')

describe('los cinco tipos de problema', () => {
  it('todos los ejemplos se resuelven y dan algo que dibujar', () => {
    for (const tipo of TIPOS) {
      for (const ej of tipo.ejemplos) {
        const r = resolver(tipo, ej)
        const donde = `${tipo.id} ${JSON.stringify(ej)}`
        expect(r.ok, donde).toBe(true)
        expect(r.funciones.length + r.verticales.length, donde).toBeGreaterThan(0)
        expect(r.secciones.flatMap(s => s.pasos).length, donde).toBeGreaterThan(0)
        for (const k of ['xmin', 'xmax', 'ymin', 'ymax']) expect(Number.isFinite(r.rango[k]), `${donde} ${k}`).toBe(true)
        // Cada ejemplo usa exactamente las casillas de su tipo: si no, la página
        // lo cargaría con huecos.
        expect(Object.keys(ej).sort(), donde).toEqual(clavesDe(tipo).sort())
      }
    }
  })

  it('un error dice qué casilla falla y tiene mensaje', () => {
    const corte = tipoPorSlug('punto-de-corte')
    const r = resolver(corte, { f: '2x + 3', g: '2x +' })
    expect(r.ok).toBe(false)
    expect(r.error.campo).toBe('g')
    expect(MENSAJE_ERROR[r.error.codigo]).toBeTypeOf('function')

    const dos = tipoPorSlug('recta-dos-puntos')
    expect(resolver(dos, { ax: '1', ay: 'x', bx: '2', by: '3' }).error.campo).toBe('ay')
  })

  it('todo código de error del lector tiene mensaje en los tres idiomas', () => {
    for (const [codigo, fn] of Object.entries(MENSAJE_ERROR)) {
      const m = fn('?')
      for (const l of ['es', 'en', 'ca']) expect(m[l], `${codigo}/${l}`).toBeTruthy()
    }
  })

  it('una recta vertical se dibuja aunque no sea función', () => {
    const r = resolver(tipoPorSlug('recta-dos-puntos'), { ax: '2', ay: '1', bx: '2', by: '5' })
    expect(r.ok).toBe(true)
    expect(r.verticales).toHaveLength(1)
    expect(r.funciones).toHaveLength(0)
  })
})

describe('publicación', () => {
  it('cada tipo tiene meta propia y está en el sitemap en los tres idiomas', () => {
    for (const tipo of TIPOS) {
      const path = rutaDe(tipo)
      expect(STATIC_META[path], path).toBeTruthy()
      for (const prefijo of ['', '/en', '/ca']) {
        expect(sitemap, `${prefijo}${path}`).toContain(`<loc>https://www.tuthor.es${prefijo}${path}</loc>`)
      }
    }
  })

  it('los slugs no se repiten y el vacío es la portada del recurso', () => {
    expect(new Set(TIPOS.map(t => t.slug)).size).toBe(TIPOS.length)
    expect(tipoPorSlug(undefined).id).toBe('analizar')
    expect(tipoPorSlug('no-existe')).toBeNull()
  })
})
