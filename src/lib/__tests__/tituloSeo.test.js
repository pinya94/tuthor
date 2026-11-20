import { describe, it, expect } from 'vitest'
import { tituloSeo, MAX_TITULO } from '../tituloSeo'

describe('tituloSeo', () => {
  it('la palabra clave va primero y la marca al final si cabe', () => {
    expect(tituloSeo('Medidor de pH')).toBe('Medidor de pH | Tuthor')
  })
  it('si no cabe, sin marca (Google ya pone el nombre del sitio)', () => {
    const largo = 'Pronombres: tipos, ejemplos y ejercicios con soluciones'
    expect(tituloSeo(largo)).toBe(largo)
    expect(tituloSeo('x'.repeat(50)).length).toBeLessThanOrEqual(MAX_TITULO)
  })
  it('no duplica la marca', () => {
    expect(tituloSeo('Tuthor — Estudia con juegos')).toBe('Tuthor — Estudia con juegos')
  })
})
