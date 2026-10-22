import { describe, it, expect } from 'vitest'
import { genRonda, esCorrecta, respuestaBuena, sobra, NIVELES, REACCIONES, COMPUESTOS, MASA_ATOMICA, masaMolar, reaccion, enunciado, explicacion, textoOpcion, schemaQuestion } from '../recetaQuimica'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('La Receta Química', () => {
  it('masas molares y reacciones ajustadas', () => {
    expect(masaMolar('H2O')).toBe(18)
    expect(masaMolar('CaCO3')).toBe(100)
    expect(masaMolar('C6H12O6')).toBe(180)
    // Cada reacción conserva los átomos de cada elemento.
    for (const rx of REACCIONES) {
      const cuenta = lado => {
        const t = {}
        for (const [c, id] of lado) for (const [el, k] of Object.entries(COMPUESTOS[id].c)) t[el] = (t[el] ?? 0) + c * k
        return t
      }
      expect(cuenta(rx.p), rx.id).toEqual(cuenta(rx.r))
    }
    expect(Object.keys(MASA_ATOMICA).length).toBeGreaterThan(5)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien calculada`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 3889)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        if (r.tipo === 'masaMolar') expect(r.bueno).toBe(masaMolar(r.compuesto) * 100)
        if (r.tipo === 'moles') expect(r.bueno).toBe(Math.round((r.g / masaMolar(r.compuesto)) * 100))
        if (r.tipo === 'proporcion' || r.tipo === 'masa') {
          const sp = [...reaccion(r).r, ...reaccion(r).p]
          const ca = sp.find(([, id]) => id === r.dato)[0], cb = sp.find(([, id]) => id === r.pide)[0]
          const nB = (r.nA * cb) / ca
          expect(r.bueno).toBe(Math.round((r.tipo === 'masa' ? nB * masaMolar(r.pide) : nB) * 100))
        }
        if (r.tipo === 'limitante') {
          const [[c1, id1], [c2, id2]] = reaccion(r).r
          const q1 = r.cantidades[id1] / c1, q2 = r.cantidades[id2] / c2
          expect(r.bueno).toBe(q1 < q2 ? id1 : q2 < q1 ? id2 : 'ninguno')
        }
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

describe('La Receta Química · respuestas tecleadas', () => {
  it('la buena vale, con coma o con punto; un paso saltado no', { timeout: 20000 }, () => {
    for (const nivel of Object.keys(NIVELES)) {
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel)
        expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
        if (r.mecanica === 'teclea') {
          expect(esCorrecta(r, respuestaBuena(r).replace('.', ','))).toBe(true)
          expect(esCorrecta(r, String(r.bueno / 100 + 1))).toBe(false)
        }
        if (r.mecanica === 'cientifica') {
          // la misma cantidad escrita con otro exponente también vale
          const [m, e] = respuestaBuena(r).split('|')
          expect(esCorrecta(r, `${Number(m) * 10}|${Number(e) - 1}`)).toBe(true)
          expect(esCorrecta(r, `${m}|${Number(e) + 1}`)).toBe(false)
        }
        if (r.mecanica === 'limitante') {
          // lo que sobra sale exacto (se teclea)
          expect(Math.abs(sobra(r) * 100 - Math.round(sobra(r) * 100))).toBeLessThan(1e-9)
          const otro = Object.keys(r.cantidades).find(id => id !== r.bueno)
          if (r.bueno !== 'ninguno') expect(esCorrecta(r, `${otro}|${sobra(r)}`)).toBe(false)
        }
      }
    }
  })
})
