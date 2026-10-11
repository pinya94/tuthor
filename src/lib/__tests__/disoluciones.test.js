import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, MEZCLAS, COMPONENTES, SOLUBLES, SOLUTOS_MOL, enunciado, explicacion, textoOpcion, schemaQuestion } from '../disoluciones'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}]/u

// Recalcula la respuesta sin mirar `bueno`.
function correcta(r) {
  switch (r.tipo) {
    case 'partes': return MEZCLAS.find(m => m.id === r.mezcla)[r.pide]
    case 'gL': return r.despeje === 'c' ? (r.g * 1000) / r.mL : r.despeje === 'm' ? (r.c * r.mL) / 1000 : (r.g / r.c) * 1000
    case 'comparar': { const cs = r.vasos.map(v => v.g / v.mL); return cs.indexOf(Math.max(...cs)) }
    case 'pct': return (r.soluto / (r.soluto + r.disolvente)) * 100
    case 'solubilidad': return Math.max(0, r.echas - (SOLUBLES[r.soluble].s * r.agua) / 100)
    case 'diluir': return (r.c1 * r.v1) / r.v2
    default: return Math.round(((r.g / SOLUTOS_MOL[r.soluto].mm) / (r.mL / 1000)) * 100)
  }
}

describe('Prepara la Disolución', () => {
  it('cada mezcla tiene soluto y disolvente distintos y con nombre', () => {
    for (const m of MEZCLAS) {
      expect(m.soluto).not.toBe(m.disolvente)
      expect(COMPONENTES[m.soluto]).toBeTruthy()
      expect(COMPONENTES[m.disolvente]).toBeTruthy()
      expect(m.emoji).not.toMatch(BANEADOS)
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien calculada`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 6007)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(correcta(r), JSON.stringify(r)).toBe(r.bueno)
        if (r.tipo === 'comparar') {
          // El vaso con más soluto no es el más concentrado (si no, no hay trampa).
          const gs = r.vasos.map(v => v.g)
          expect(gs.indexOf(Math.max(...gs))).not.toBe(r.bueno)
        }
        if (r.tipo === 'partes') expect(r.opciones).toHaveLength(4)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
