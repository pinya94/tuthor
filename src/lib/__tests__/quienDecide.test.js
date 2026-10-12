import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ORGANOS, CASOS_ORGANO, CASOS_PODER, NUMEROS, CASOS_DERECHO, PASOS_LEY, enunciado, explicacion, textoOpcion, schemaQuestion } from '../quienDecide'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('¿Quién Decide?', () => {
  it('datos de la Constitución', () => {
    for (const [id] of CASOS_ORGANO) expect(Object.keys(ORGANOS)).toContain(id)
    // Cada órgano sale en algún caso.
    for (const id of Object.keys(ORGANOS)) expect(CASOS_ORGANO.some(c => c[0] === id), id).toBe(true)
    const n = id => NUMEROS.find(x => x.id === id).r
    expect(n('diputados')).toBe(350)
    expect(n('mayoria')).toBe(176)
    expect(n('articulos')).toBe(169)
    expect(n('anyo')).toBe(1978)
    expect(n('tc')).toBe(12)
    for (const x of NUMEROS) { expect(x.d).not.toContain(x.r); expect(new Set(x.d).size).toBe(3) }
    // Derechos fundamentales: artículos 14-29; principios rectores: 39-52.
    for (const [g, , a] of CASOS_DERECHO) {
      if (g === 'fundamental') expect(a >= 14 && a <= 29, String(a)).toBe(true)
      if (g === 'rector') expect(a >= 39 && a <= 52, String(a)).toBe(true)
    }
    expect(PASOS_LEY.map(p => p.id)).toEqual(['iniciativa', 'congreso', 'senado', 'vuelta', 'sancion', 'boe', 'vigor'])
    expect(new Set(CASOS_PODER.map(c => c[0])).size).toBe(3)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 5113)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(r.opciones.length).toBeGreaterThanOrEqual(3)
        if (r.tipo === 'organo') expect(r.bueno).toBe(CASOS_ORGANO[r.caso][0])
        if (r.tipo === 'poder') expect(r.bueno).toBe(CASOS_PODER[r.caso][0])
        if (r.tipo === 'derecho') expect(r.bueno).toBe(CASOS_DERECHO[r.caso][0])
        if (r.tipo === 'competencia') {
          const raros = r.opciones.filter(o => o.startsWith(r.alReves ? 'ccaa' : 'estado'))
          expect(raros).toEqual([r.bueno])
        }
        if (r.tipo === 'ley') {
          expect(r.bueno).toBe(PASOS_LEY[r.paso].id)
          // Tras el Senado, la sanción no puede ser opción (también sería «siguiente» sin cambios).
          if (r.bueno === 'vuelta') expect(r.opciones).not.toContain('sancion')
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const textos = r.opciones.map(o => textoOpcion(o, r, l))
          expect(new Set(textos).size).toBe(textos.length)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
