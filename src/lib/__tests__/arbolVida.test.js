import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ARBOLES, SERES, PLANTAS, ESCENARIOS, APARICION, ESCALERAS, RASGOS, hojas, masCercanos, ancestroComun, claveNodo, cajaDe, esCorrecta, enunciado, explicacion, schemaQuestion } from '../arbolVida'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
// Tofu en Windows 10: Extended-A, círculos de color, y los de Unicode 12 que usamos por error alguna vez.
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}\u{1F9CD}\u{1F9A7}\u{200D}]/u

describe('Árbol de la Vida', () => {
  it('los parentescos clásicos salen bien', () => {
    const t = ARBOLES.find(a => hojas(a).includes('ballena'))
    expect(masCercanos(t, 'ballena')).toEqual(['humano'])
    expect(claveNodo(ancestroComun(t, 'ballena', 'humano'))).toBe('ballena+humano')
    const r = ARBOLES.find(a => hojas(a).includes('cocodrilo'))
    expect(masCercanos(r, 'cocodrilo')).toEqual(['ave'])
    for (const a of ARBOLES) for (const h of hojas(a)) expect(SERES[h]).toBeTruthy()
    for (const x of [...Object.values(SERES), ...Object.values(PLANTAS), ...ESCENARIOS, ...Object.values(APARICION)]) expect(x.e).not.toMatch(BANEADOS)
  })

  it('escaleras: un rasgo por tramo, y cada taxón existe', () => {
    for (const e of ESCALERAS) {
      expect(e.rasgos).toHaveLength(e.taxa.length)
      expect(new Set(e.rasgos).size).toBe(e.rasgos.length)
      for (const g of e.rasgos) expect(RASGOS[g], g).toBeTruthy()
      for (const t of e.taxa) expect(SERES[t] ?? PLANTAS[t], t).toBeTruthy()
    }
    // El cocodrilo comparte con las aves un rasgo que no tiene el lagarto.
    const a = ESCALERAS.find(e => e.id === 'arcosaurios')
    expect(a.taxa.indexOf('cocodrilo')).toBeLessThan(a.taxa.indexOf('ave'))
    expect(a.taxa.indexOf('lagarto')).toBe(0)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas bien formadas`, { timeout: 30000 }, () => {
      const rand = semilla(nivel.length * 8191)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'ancestro') {
          const t = ARBOLES[r.arbol]
          expect(r.a).not.toBe(r.b)
          expect(r.bueno).toBe(claveNodo(ancestroComun(t, r.a, r.b)))
          // Tocar la raíz cuando el antepasado es otro nodo es un fallo.
          if (r.bueno !== claveNodo(t)) expect(esCorrecta(r, claveNodo(t))).toBe(false)
        }
        if (r.tipo === 'ordena') {
          const o = r.bueno.split(',')
          for (let k = 1; k < o.length; k++) expect(APARICION[o[k - 1]].ma).toBeGreaterThan(APARICION[o[k]].ma)
        }
        if (r.tipo === 'clasifica') {
          expect(r.items).toHaveLength(4)
          for (const it of r.items) expect(r.cajas).toContain(cajaDe(it))
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(1)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
