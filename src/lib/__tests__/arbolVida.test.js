import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ARBOLES, SERES, ESCENARIOS, APARICION, hojas, masCercanos, enunciado, explicacion, textoOpcion, schemaQuestion } from '../arbolVida'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
// Tofu en Windows 10: Extended-A, círculos de color, y los de Unicode 12 que usamos por error alguna vez.
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}\u{1F9CD}\u{1F9A7}\u{200D}]/u

describe('Árbol de la Vida', () => {
  it('los parentescos clásicos salen bien', () => {
    const t = ARBOLES.find(a => hojas(a).includes('ballena'))
    expect(masCercanos(t, 'ballena')).toEqual(['humano'])
    const r = ARBOLES.find(a => hojas(a).includes('cocodrilo'))
    expect(masCercanos(r, 'cocodrilo')).toEqual(['ave'])
    for (const a of ARBOLES) for (const h of hojas(a)) expect(SERES[h]).toBeTruthy()
    for (const x of [...Object.values(SERES), ...ESCENARIOS, ...Object.values(APARICION)]) expect(x.e).not.toMatch(BANEADOS)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas bien formadas`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 8191)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        if (r.tipo === 'arbol') expect(masCercanos(ARBOLES[r.arbol], r.x)).toEqual([r.bueno])
        if (r.tipo === 'tiempo') expect(Math.max(...r.grupo.map(g => APARICION[g].ma))).toBe(APARICION[r.bueno].ma)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
