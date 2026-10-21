import { describe, it, expect } from 'vitest'
import { genRonda, esCorrecta, respuestaBuena, NIVELES, PROBLEMAS, NOTABLES, roles, razonDe, enunciado, explicacion, textoOpcion, schemaQuestion, etiquetaLado } from '../anguloRecto'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}]/u
const rad = d => (d * Math.PI) / 180

// Recalcula la respuesta sin mirar `bueno`.
function correcta(r) {
  const t = r.tri
  const R = t.vertice ? roles(t.vertice) : null
  switch (r.tipo) {
    case 'razon': {
      const op = t[R.opuesto], co = t[R.contiguo]
      return { sen: `${op}/${t.hip}`, cos: `${co}/${t.hip}`, tan: `${op}/${co}` }[r.f]
    }
    case 'cual': return razonDe(r.conocido, r.pedido)
    case 'pitagoras': return t[r.falta]
    case 'notable': return NOTABLES[r.f][r.a]
    case 'angulo': {
      const v = r.vals
      const f = razonDe(...r.roles2)
      const a = f === 'sen' ? Math.asin(v.opuesto / v.hip) : f === 'cos' ? Math.acos(v.contiguo / v.hip) : Math.atan(v.opuesto / v.contiguo)
      return Math.round((a * 180) / Math.PI)
    }
    default: {
      // lado / problema: rehace la cuenta con la razón que une los dos roles.
      const a = rad(t.angulo)
      const f = razonDe(r.conocido, r.pedido)
      const val = r.valor
      const sin = Math.sin(a), cos = Math.cos(a), tan = Math.tan(a)
      const x = {
        'sen:opuesto': val * sin, 'sen:hip': val / sin,
        'cos:contiguo': val * cos, 'cos:hip': val / cos,
        'tan:opuesto': val * tan, 'tan:contiguo': val / tan,
      }[`${f}:${r.pedido}`]
      return Math.round(x * 10)
    }
  }
}

describe('Ángulo Recto', () => {
  it('roles: el cateto opuesto cambia con el vértice', () => {
    expect(roles('abajo').opuesto).toBe('alto')
    expect(roles('arriba').opuesto).toBe('base')
    expect(razonDe('hip', 'opuesto')).toBe('sen')
    expect(razonDe('contiguo', 'hip')).toBe('cos')
    expect(razonDe('opuesto', 'contiguo')).toBe('tan')
    for (const p of Object.values(PROBLEMAS)) expect(p.emoji).not.toMatch(BANEADOS)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien calculada`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 4099)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(correcta(r), JSON.stringify(r)).toBe(r.bueno)
        // El triángulo es rectángulo de verdad.
        expect(Math.abs(r.tri.base ** 2 + r.tri.alto ** 2 - r.tri.hip ** 2)).toBeLessThan(1e-6 * r.tri.hip ** 2)
        if (r.tipo === 'angulo') expect(r.opciones).toContain(90 - r.bueno)
        // Mecánicas: la respuesta buena vale y los errores típicos (las
        // opciones de antes) no, ni siquiera con la tolerancia del redondeo.
        expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
        if (r.mecanica === 'teclea') {
          for (const o of r.opciones) if (o !== r.bueno) {
            const t = r.tipo === 'pitagoras' || r.tipo === 'angulo' ? String(o) : String(o / 10)
            expect(esCorrecta(r, t), `${r.tipo} ${o} vs ${r.bueno}`).toBe(false)
          }
        }
        if (r.mecanica === 'fraccion') for (const o of r.opciones) if (o !== r.bueno) expect(esCorrecta(r, o)).toBe(false)
        if (r.mecanica === 'tabla') {
          expect(r.huecos.some(([f, a]) => f === r.f && a === r.a)).toBe(true)
          for (const [f, a] of r.huecos) expect(r.fichas).toContain(NOTABLES[f][a])
          expect(esCorrecta(r, 'tabla:1')).toBe(false)
        }
        if (r.mecanica === 'nombra') expect(esCorrecta(r, 'nombra:1')).toBe(false)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined|NaN/)
          for (const ld of ['base', 'alto', 'hip']) for (const rev of [false, true]) expect(String(etiquetaLado(r, ld, rev, l))).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
