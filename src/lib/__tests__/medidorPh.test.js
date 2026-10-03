import { describe, it, expect } from 'vitest'
import { SUSTANCIAS } from '../../data/sustanciasPh'
import { NIVELES, categoria, evaluar, genRonda, sustanciasDe, isCorrect, colorPh } from '../medidorPh'

describe('Medidor de pH', () => {
  it('los datos están completos y en rango', () => {
    const ids = new Set()
    for (const s of SUSTANCIAS) {
      expect(ids.has(s.id)).toBe(false); ids.add(s.id)
      expect(s.ph).toBeGreaterThanOrEqual(0)
      expect(s.ph).toBeLessThanOrEqual(14)
      for (const l of ['es', 'en', 'ca']) {
        expect(s.nombre[l]).toBeTruthy()
        expect(s.dato[l]).toBeTruthy()
      }
    }
    // hay de las tres zonas
    for (const z of ['acido', 'neutro', 'basico']) expect(SUSTANCIAS.some(s => categoria(s.ph) === z)).toBe(true)
  })

  it('fácil puntúa por zona y no pregunta sustancias en el borde', () => {
    const limon = SUSTANCIAS.find(s => s.id === 'limon')
    expect(evaluar(limon, 5, 'facil')).toBe('bien')
    expect(evaluar(limon, 7, 'facil')).toBe('fallo')
    const ids = sustanciasDe('facil').map(s => s.id)
    expect(ids).toContain('agua')
    expect(ids).not.toContain('sangre')
    expect(ids).not.toContain('leche')
    expect(sustanciasDe('medio')).toHaveLength(SUSTANCIAS.length)
  })

  it('medio y difícil miden la distancia', () => {
    const lejia = SUSTANCIAS.find(s => s.id === 'lejia') // 12.5
    expect(evaluar(lejia, 12.5, 'medio')).toBe('exacto')
    expect(evaluar(lejia, 11, 'medio')).toBe('bien')
    expect(evaluar(lejia, 11, 'dificil')).toBe('fallo')
    expect(evaluar(lejia, 13.5, 'dificil')).toBe('bien')
    expect(NIVELES.dificil.colores).toBe(false)
  })

  it('genRonda evita las recientes y el examen acepta exacto y cerca', () => {
    const evitar = SUSTANCIAS.slice(1).map(s => s.id)
    expect(genRonda('medio', { evitar }).sustancia.id).toBe(SUSTANCIAS[0].id)
    const r = genRonda('medio')
    expect(isCorrect(r, r.sustancia.ph)).toBe(true)
    expect(isCorrect(r, null)).toBe(false)
  })

  it('el color sale de la escala para cualquier valor', () => {
    for (let v = 0; v <= 14; v += 0.5) expect(colorPh(v)).toMatch(/^#/)
  })
})
