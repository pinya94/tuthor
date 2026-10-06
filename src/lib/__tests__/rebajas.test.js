import { describe, it, expect } from 'vitest'
import { NIVELES, OFERTAS, IVA, genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, eur } from '../rebajas'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

// La respuesta recalculada por otro camino (en euros y redondeando al final),
// para que un fallo del generador no se valide a sí mismo.
function esperado(r) {
  const e = c => c / 100
  switch (r.tipo) {
    case 'final': return e(r.antes) * (1 + r.pct / 100)
    case 'ahorro': return e(r.antes) * (-r.pct / 100)
    case 'quePct': return ((e(r.antes) - e(r.ahora)) / e(r.antes)) * 100
    case 'iva': return e(r.sinIva) * (1 + IVA / 100)
    case 'sinIva': return e(r.conIva) / (1 + IVA / 100)
    case 'original': return e(r.ahora) / (1 + r.pct / 100)
    case 'encadenado': case 'doble': return r.pasos.reduce((v, p) => v * (1 + p / 100), e(r.antes))
    default: return null
  }
}

describe('Rebajas · formato', () => {
  it('euros sin decimales si son enteros y con dos si no', () => {
    expect(eur(1500, 'es')).toMatch(/^15\s?€$/)
    expect(eur(1575, 'es')).toMatch(/^15,75\s?€$/)
    expect(eur(1550, 'en')).toBe('€15.50')
  })
})

describe('Rebajas · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 800 rondas con la respuesta correcta y distractores distintos`, () => {
      const rand = semilla(nivel.length * 7919)
      const tipos = new Set()
      for (let i = 0; i < 800; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(NIVELES[nivel].tipos).toContain(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.unidad === 'eur') {
          // céntimos enteros y positivos: nada de 14,999999 €
          for (const o of r.opciones) { expect(Number.isInteger(o)).toBe(true); expect(o).toBeGreaterThan(0) }
          expect(r.bueno / 100).toBeCloseTo(esperado(r), 6)
          expect(r.opciones).toHaveLength(4)
        } else if (r.unidad === 'pct') {
          expect(r.bueno).toBeCloseTo(esperado(r), 6)
          expect(r.opciones).toHaveLength(4)
        } else {
          // comparar: los costes salen de las ofertas
          const [a, b] = r.ofertas.map(id => OFERTAS[id].paga(r.n) * r.precioUnidad)
          expect(r.costes[0]).toBeCloseTo(a, 6)
          expect(r.costes[1]).toBeCloseTo(b, 6)
          expect(r.bueno).toBe(a < b ? 'A' : b < a ? 'B' : 'igual')
          expect(r.ofertas.some(id => !id.startsWith('p'))).toBe(true)
        }
        if (nivel === 'facil' && r.unidad === 'eur') expect(r.bueno % 50).toBe(0)
        for (const l of L) {
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN|Infinity/)
          const q = schemaQuestion(r, l)
          expect(q.question).not.toMatch(/undefined|NaN/)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
        }
      }
      // todos los tipos del nivel salen
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }

  it('las trampas clásicas están entre las opciones', () => {
    const rand = semilla(5)
    let original = 0, doble = 0
    for (let i = 0; i < 600; i++) {
      const r = genRonda('dificil', { rand })
      if (r.tipo === 'original') {
        // sumar el % al precio rebajado
        if (r.opciones.includes(Math.round((r.ahora * (100 - r.pct)) / 100))) original++
      }
      if (r.tipo === 'doble') {
        // sumar los dos descuentos
        if (r.opciones.includes(Math.round((r.antes * (100 + r.pasos[0] + r.pasos[1])) / 100))) doble++
      }
    }
    expect(original).toBeGreaterThan(30)
    expect(doble).toBeGreaterThan(30)
  })
})
