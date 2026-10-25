import { describe, it, expect } from 'vitest'
import { genRonda, esCorrecta, respuestaBuena, letrasDe, NIVELES, PALABRAS, REGLAS, GRUPOS, hueco, enunciado, explicacion, schemaQuestion } from '../queLetra'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
// Parejas en las que las dos escrituras existen: no pueden entrar nunca.
const HOMOFONOS = ['vaca', 'baca', 'tubo', 'tuvo', 'echo', 'hecho', 'rayo', 'rallo', 'ola', 'hola', 'hierba', 'yerba', 'cebra', 'zebra', 'vaya', 'valla', 'baya', 'haya', 'aya', 'bello', 'vello', 'botar', 'votar', 'grabar', 'gravar', 'ay', 'hay', 'ahí']

describe('¿Qué Letra Va?', () => {
  it('banco limpio: sin homófonos, sin repetidas y cada palabra con su regla', () => {
    const vistas = new Set()
    for (const p of PALABRAS) {
      expect(vistas.has(p.ok), p.ok).toBe(false)
      vistas.add(p.ok)
      expect(REGLAS[p.r], p.ok).toBeTruthy()
      expect(GRUPOS[p.g]).toBeTruthy()
      expect(p.mal).not.toContain(p.ok)
      for (const w of [p.ok, ...p.mal]) expect(HOMOFONOS, w).not.toContain(w)
      // El hueco tiene que ser pequeño (una o dos letras): si no, no se ve qué se pregunta.
      expect(hueco(p.ok, p.mal[0]).letra.length, p.ok).toBeLessThanOrEqual(2)
    }
    for (const g of Object.keys(GRUPOS)) expect(PALABRAS.filter(p => p.g === g).length).toBeGreaterThanOrEqual(10)
  })

  it('el hueco señala la letra que cambia', () => {
    expect(hueco('escribir', 'escrivir')).toEqual({ antes: 'escri', letra: 'b', despues: 'ir' })
    expect(hueco('pasillo', 'pasiyo')).toEqual({ antes: 'pasi', letra: 'll', despues: 'o' })
    expect(hueco('hueso', 'ueso')).toEqual({ antes: '', letra: 'h', despues: 'ueso' })
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas bien formadas`, () => {
      const rand = semilla(nivel.length * 4441)
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand })
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          // La palabra va en castellano en cualquier idioma.
          for (const w of r.items) expect(explicacion(r, l)).toContain(`${w}:`)
          expect(schemaQuestion(r, l).wrongAnswers.length).toBe(r.opciones.length - 1)
        }
      }
    })
  }
})

describe('¿Qué Letra Va? · rondas de cuatro palabras', () => {
  it('cada hueco alterna entre la letra buena y la de su mala, y al ponerla sale la palabra', () => {
    for (const p of PALABRAS) {
      const x = letrasDe(p.ok)
      expect(x.letra).not.toBe(x.mala)
      expect(x.antes + x.letra + x.despues).toBe(p.ok)
      expect(x.antes + x.mala + x.despues).toBe(p.mal[0])
    }
    for (const nivel of Object.keys(NIVELES)) {
      const r = genRonda(nivel)
      expect(new Set(r.items).size).toBe(4)
      expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
      expect(esCorrecta(r, 'rellena:1')).toBe(false)
    }
  })
})
