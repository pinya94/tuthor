import { describe, it, expect } from 'vitest'
import { nivelDeClave, esClaveDeNivel } from '../niveles.js'

describe('niveles de dificultad', () => {
  it('traduce las claves de dificultad a 1-3', () => {
    expect(['facil', 'medio', 'dificil'].map(k => nivelDeClave(k))).toEqual([1, 2, 3])
    expect(['primaria', 'eso', 'bachillerato'].map(k => nivelDeClave(k))).toEqual([1, 2, 3])
  })

  it('los modos no son dificultades (no llevan barras)', () => {
    for (const k of ['nombre', 'funcion', 'mixto', 'todos', 'unico']) expect(esClaveDeNivel(k), k).toBe(false)
    expect(esClaveDeNivel('dificil')).toBe(true)
  })
})
