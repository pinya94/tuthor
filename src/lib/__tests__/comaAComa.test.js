import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, FRASES, REGLAS, conSigno, enunciado, explicacion, textoOpcion, schemaQuestion } from '../comaAComa'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Coma a Coma', () => {
  it('banco de frases coherente', () => {
    for (const f of FRASES) {
      expect(REGLAS[f.regla], f.t).toBeTruthy()
      const huecos = (f.t.match(/▢/g) || []).length
      expect(huecos, f.t).toBe(f.ok.includes('|') ? 2 : 1)
      expect(f.mal).toHaveLength(3)
      expect(new Set([f.ok, ...f.mal]).size, f.t).toBe(4)
      // Las parejas solo compiten con parejas, y los signos sueltos con signos sueltos.
      for (const m of f.mal) expect(m.includes('|'), f.t).toBe(f.ok.includes('|'))
      expect(['facil', 'medio', 'dificil']).toContain(f.nivel)
    }
    expect(conSigno('Ven aquí▢ Juan.', ',')).toBe('Ven aquí, Juan.')
    expect(conSigno('▢Vienes▢', '¿|?')).toBe('¿Vienes?')
    expect(conSigno('Compré pan, leche▢ y huevos.', '')).toBe('Compré pan, leche y huevos.')
    // Ninguna frase se repite.
    expect(new Set(FRASES.map(f => f.t)).size).toBe(FRASES.length)
    for (const n of ['facil', 'medio', 'dificil']) expect(FRASES.filter(f => f.nivel === n).length).toBeGreaterThanOrEqual(6)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 811)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        const f = FRASES[r.frase]
        expect(NIVELES[nivel].frases).toContain(f.nivel)
        expect(r.bueno).toBe(r.tipo === 'signo' ? f.ok : f.regla)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(4)
        expect(new Set(r.opciones.map(o => textoOpcion(o, r))).size).toBe(4)
        expect(enunciado(r)).not.toMatch(/undefined/)
        expect(explicacion(r)).not.toMatch(/undefined|▢/)
        expect(schemaQuestion(r).wrongAnswers).toHaveLength(3)
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
