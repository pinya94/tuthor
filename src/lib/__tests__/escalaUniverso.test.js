import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, OBJETOS, cientifica, decimal, deClave, valorDe, potencia, enunciado, explicacion, textoOpcion, schemaQuestion, esCorrecta, metaComa, conExponente, reglaBien } from '../escalaUniverso'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}]/u
const normalizada = k => { const m = Number(deClave(k).m); return m >= 1 && m < 10 }
const cerca = (a, b) => Math.abs(a - b) <= Math.abs(b) * 1e-9
const valPot = k => { const [b, e] = k.split('^').map(Number); return b ** e }

describe('Escala del Universo', () => {
  it('formatos exactos', () => {
    expect(cientifica('1.27e7')).toBe('1,27 · 10⁷')
    expect(decimal('1.27e7')).toBe('12 700 000')
    expect(decimal('8e-6')).toBe('0,000008')
    expect(decimal('8.85e3', 'en')).toBe('8 850')
    expect(potencia('-3^4')).toBe('(−3)⁴')
    for (const o of Object.values(OBJETOS)) {
      expect(o.emoji).not.toMatch(BANEADOS)
      expect(normalizada(`${o.m}e${o.e}`)).toBe(true)
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con una sola respuesta correcta`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 3301)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        // Las mecánicas nuevas van encima del generador de siempre: sus comprobaciones siguen.
        const t = r.tipo === 'coma' ? r.modo : r.tipo === 'exponente' ? r.sub : r.tipo
        if (t === 'regla') {
          expect(esCorrecta(r, 'regla:ok')).toBe(true)
          const bien = Object.fromEntries(r.objetos.map(id => [id, OBJETOS[id].e]))
          expect(reglaBien(r, bien)).toBe(true)
          expect(reglaBien(r, { ...bien, [r.objetos[0]]: OBJETOS[r.objetos[0]].e + r.tol + 1 })).toBe(false)
          for (const l of ['es', 'en', 'ca']) { expect(explicacion(r, l)).not.toMatch(/undefined|NaN/); expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(3) }
          continue
        }
        if (r.tipo === 'coma') {
          expect(esCorrecta(r, metaComa(r))).toBe(true)
          expect(conExponente(r, deClave(r.bueno).e)).toBe(r.bueno)
          expect(esCorrecta(r, conExponente(r, deClave(metaComa(r)).e + 1))).toBe(false)
        } else expect(esCorrecta(r, r.bueno)).toBe(true)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        if (t === 'escribir') {
          // Solo una opción está normalizada Y vale lo mismo.
          const ok = r.opciones.filter(o => normalizada(o) && cerca(valorDe(o), valorDe(r.bueno)))
          expect(ok).toEqual([r.bueno])
        }
        if (t === 'leer') expect(r.opciones.filter(o => cerca(valorDe(o), valorDe(r.bueno)))).toEqual([r.bueno])
        if (t === 'operar') {
          const v = r.div ? (r.a / r.b) * 10 ** (r.p - r.q) : r.a * r.b * 10 ** (r.p + r.q)
          expect(cerca(valorDe(r.bueno), v)).toBe(true)
          expect(normalizada(r.bueno)).toBe(true)
          expect(r.opciones.filter(o => normalizada(o) && cerca(valorDe(o), v))).toEqual([r.bueno])
        }
        if (r.tipo === 'comparar' && r.pide === 'mayor') {
          const [a, b] = r.objetos
          const may = valorDe(`${OBJETOS[a].m}e${OBJETOS[a].e}`) > valorDe(`${OBJETOS[b].m}e${OBJETOS[b].e}`) ? a : b
          expect(r.bueno).toBe(may)
        }
        if (t === 'propiedad') {
          const [b] = r.bueno.split('^').map(Number)
          // Las opciones distintas de la buena no valen lo mismo.
          for (const o of r.opciones) if (o !== r.bueno) expect(valPot(o)).not.toBe(valPot(r.bueno))
          expect(b).toBeGreaterThan(1)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, { ...r, tipo: t }, l)).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const m of NIVELES[nivel].mecanicas) expect(tipos.has(m), m).toBe(true)
    })
  }
})
