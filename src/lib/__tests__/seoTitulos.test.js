import { describe, it, expect } from 'vitest'
import { deTema, tituloExamenMC, descExamenMC, conEjercicios } from '../seoTitulos'

describe('títulos SEO de exámenes', () => {
  it('artículos y contracciones', () => {
    expect(deTema('La Unión Europea', 'es')).toBe('de la Unión Europea')
    expect(deTema('El Mercado', 'es')).toBe('del Mercado')
    expect(deTema('Los Textos', 'es')).toBe('de los Textos')
    expect(deTema('Edad Media', 'es')).toBe('de Edad Media')
    expect(deTema('Ácidos y Bases', 'es')).toBe('de Ácidos y Bases')
    expect(deTema('Lengua', 'es')).toBe('de Lengua')
    expect(deTema('La Constitució i l’Estat', 'ca')).toBe('de la Constitució i l’Estat')
    expect(deTema('El Mercat', 'ca')).toBe('del Mercat')
    expect(deTema('Àcids i Bases', 'ca')).toBe('d’Àcids i Bases')
    expect(deTema('L’Edat Mitjana', 'ca')).toBe('de l’Edat Mitjana')
    expect(deTema('Els Textos', 'ca')).toBe('dels Textos')
  })
  it('títulos', () => {
    expect(tituloExamenMC('La representación de la Tierra', 'es')).toBe('Examen de la representación de la Tierra: ejercicios tipo test con soluciones')
    expect(descExamenMC('La Unión Europea', 'es', ['ESO', 'Bachillerato'])).toMatch(/^Ejercicios tipo test de la Unión Europea con soluciones \(ESO, Bachillerato\)/)
    expect(conEjercicios('Examen de husos horarios con ejercicios resueltos', 'es')).toBe('Examen de husos horarios con ejercicios resueltos')
    expect(conEjercicios('Examen de engranajes: sentido de giro y rpm', 'es')).toBe('Examen de engranajes: sentido de giro y rpm — ejercicios con solución')
    for (const l of ['es', 'en', 'ca']) expect(descExamenMC('Nutrición', l, ['ESO']).length).toBeLessThanOrEqual(180)
  })
})
