import { describe, it, expect } from 'vitest'
import { PRODUCTOS } from '../../data/etiquetas'
import { NIVELES, genRonda, esCorrecta, producto, enRacion, semaforo, explicacion, enunciado, textoOpcion, schemaQuestion, TERRON } from '../etiqueta'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }

describe('Lee la Etiqueta · datos', () => {
  it('etiquetas coherentes: saturadas ≤ grasas, azúcares ≤ hidratos, kcal plausibles', () => {
    const ids = new Set()
    for (const p of PRODUCTOS) {
      expect(ids.has(p.id)).toBe(false); ids.add(p.id)
      expect(p.saturadas).toBeLessThanOrEqual(p.grasas)
      expect(p.azucares).toBeLessThanOrEqual(p.hidratos)
      // energía ≈ 9·grasa + 4·hidratos + 4·proteína + 2·fibra (±20 %)
      const calc = 9 * p.grasas + 4 * p.hidratos + 4 * p.proteinas + 2 * p.fibra
      expect(Math.abs(calc - p.kcal) / p.kcal, p.id).toBeLessThan(0.2)
      for (const l of ['es', 'en', 'ca']) { expect(p.nombre[l]).toBeTruthy(); expect(p.nombreRacion[l]).toBeTruthy() }
    }
  })
})

describe('Lee la Etiqueta · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con respuesta única`, () => {
      const rand = semilla(nivel.length * 41)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        const ps = r.productos.map(producto)
        const n = r.nutriente
        if (r.tipo === 'mas') {
          const max = Math.max(...ps.map(p => p[n]))
          expect(producto(r.bueno)[n]).toBe(max)
          expect(ps.filter(p => p[n] === max)).toHaveLength(1)
        }
        if (r.tipo === 'terrones') expect(Math.abs(enRacion(ps[0], 'azucares') / TERRON - r.bueno)).toBeLessThanOrEqual(0.3)
        if (r.tipo === 'racion') expect(r.bueno).toBe(enRacion(ps[0], n))
        if (r.tipo === 'semaforo') expect(r.bueno).toBe(semaforo(ps[0], n))
        if (r.tipo === 'trampa') expect(enRacion(producto(r.bueno), n)).toBe(Math.max(...ps.map(p => enRacion(p, n))))
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l).length).toBeGreaterThan(15)
          expect(explicacion(r, l).length).toBeGreaterThan(20)
          for (const o of r.opciones) expect(textoOpcion(r, o, l)).toBeTruthy()
        }
        expect(schemaQuestion(r, 'es').wrongAnswers).toHaveLength(r.opciones.length - 1)
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }

  it('en difícil, la mayoría de las «trampas» lo son: gana por 100 g quien pierde en la ración', () => {
    const rand = semilla(9)
    let trampas = 0, inversas = 0
    for (let i = 0; i < 400; i++) {
      const r = genRonda('dificil', { rand })
      if (r.tipo !== 'trampa') continue
      trampas++
      const [a, b] = r.productos.map(producto)
      const gana100 = a[r.nutriente] > b[r.nutriente] ? a.id : b.id
      if (gana100 !== r.bueno) inversas++
    }
    expect(inversas / trampas).toBeGreaterThan(0.6)
  })
})
