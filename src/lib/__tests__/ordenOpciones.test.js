// Las opciones de un examen tipo test no pueden salir en el orden del banco:
// en más de la mitad de las preguntas la correcta está escrita la primera.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { ordenOpciones } from '../ordenOpciones'

describe('orden de las opciones', () => {
  it('es una permutación: cada opción sale una vez', () => {
    for (const n of [2, 3, 4, 5]) {
      for (let k = 0; k < 50; k++) {
        expect([...ordenOpciones(n)].sort()).toEqual(Array.from({ length: n }, (_, i) => i))
      }
    }
  })

  it('la primera opción del banco no se queda siempre arriba', () => {
    const primeras = Array.from({ length: 400 }, () => ordenOpciones(4)[0])
    const veces = primeras.filter(i => i === 0).length
    // Esperado ≈ 100 de 400 (una de cada cuatro)
    expect(veces).toBeGreaterThan(50)
    expect(veces).toBeLessThan(160)
  })

  it('ExamenMC pinta las opciones en ese orden y no en el del banco', () => {
    // Se comprueba sobre el fuente para no montar el componente entero (auth,
    // router, Firebase) solo para leer el orden de cuatro botones.
    const src = readFileSync('src/components/ExamenMC.jsx', 'utf8')
    expect(src).toContain("import { ordenOpciones } from '../lib/ordenOpciones'")
    expect(src).toMatch(/const opciones\s*=\s*q\.orden\.map\(/)
    expect(src).not.toMatch(/const opciones\s*=\s*get\(q\.opciones, lang\)\s*$/m)
  })
})
