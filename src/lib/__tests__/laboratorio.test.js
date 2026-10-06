import { describe, it, expect } from 'vitest'
import {
  METODOS, PROPIEDADES, COMPONENTES, MEZCLAS, RECETAS, NIVELES, TAMBIEN_VALE,
  genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado,
} from '../laboratorio'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

describe('El Laboratorio · datos', () => {
  it('textos en tres idiomas y referencias que existen', () => {
    for (const m of Object.values(METODOS)) { for (const l of L) { expect(m.nombre[l]).toBeTruthy(); expect(m.como[l]).toBeTruthy() } expect(PROPIEDADES[m.propiedad]).toBeTruthy() }
    for (const c of Object.values(COMPONENTES)) for (const l of L) expect(c.nombre[l]).toBeTruthy()
    for (const m of MEZCLAS) { expect(METODOS[m.metodo], m.id).toBeTruthy(); for (const c of m.componentes) expect(COMPONENTES[c], m.id).toBeTruthy() }
  })

  it('cada método de cada nivel tiene al menos una mezcla', () => {
    for (const cfg of Object.values(NIVELES)) for (const m of cfg.metodos) expect(MEZCLAS.some(x => x.metodo === m), m).toBe(true)
  })

  it('recetas: la buena no coincide con ninguna mala, y las malas son distintas entre sí', () => {
    for (const r of RECETAS) {
      const claves = [r.buena, ...r.malas].map(x => x.join('>'))
      expect(new Set(claves).size, r.id).toBe(4)
      for (const paso of [...r.buena, ...r.malas.flat()]) expect(METODOS[paso], r.id).toBeTruthy()
    }
  })
})

describe('El Laboratorio · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas coherentes, sin «también vale» como distractor`, () => {
      const rand = semilla(nivel.length * 2111)
      const tipos = new Set()
      for (let i = 0; i < 700; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'metodo') {
          expect(NIVELES[nivel].metodos).toContain(r.bueno)
          for (const v of TAMBIEN_VALE.metodo[r.bueno] ?? []) expect(r.opciones).not.toContain(v)
        }
        if (r.tipo === 'propiedad') {
          expect(r.bueno).toBe(METODOS[r.metodo].propiedad)
          for (const v of TAMBIEN_VALE.propiedad[r.metodo] ?? []) expect(r.opciones).not.toContain(v)
        }
        if (r.tipo === 'secuencia') expect(r.bueno).toBe(RECETAS.find(x => x.id === r.mezcla).buena.join('>'))
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined/)
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined/)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }

  it('el objetivo lleva su artículo: «con la sal», «con el agua»', () => {
    const rand = semilla(9)
    const vistos = new Set()
    for (let i = 0; i < 400; i++) {
      const r = genRonda('medio', { rand })
      if (r.tipo === 'metodo' && r.objetivo) vistos.add(enunciado(r, 'es'))
    }
    for (const e of vistos) expect(e).toMatch(/con (la sal|el agua|el azúcar)\.$/)
    expect(vistos.size).toBeGreaterThan(0)
  })
})
