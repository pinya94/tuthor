import { describe, it, expect } from 'vitest'
import {
  METODOS, PROPIEDADES, COMPONENTES, MEZCLAS, RECETAS, NIVELES, TAMBIEN_VALE,
  genRonda, esCorrecta, respuestaBuena, secuenciaValida, cajaDe, nombreDe, explicacion, schemaQuestion, textoOpcion, enunciado,
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
        expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
        if (r.mecanica === 'clasifica') {
          expect(esCorrecta(r, 'clasifica:1')).toBe(false)
          // Cada mezcla tiene su caja, y ninguna otra caja vale también para ella
          for (const i of r.items) {
            expect(r.cajas).toContain(cajaDe(r, i))
            if (r.tipo === 'metodo') for (const v of TAMBIEN_VALE.metodo[cajaDe(r, i)] ?? []) expect(r.cajas).not.toContain(v)
          }
        }
        if (r.mecanica === 'empareja') {
          expect(new Set(r.props).size).toBe(3)
          for (const m of r.metodos) for (const v of TAMBIEN_VALE.propiedad[m] ?? []) expect(r.props).not.toContain(v)
        }
        if (r.mecanica === 'ordena') {
          const rec = RECETAS.find(x => x.id === r.mezcla)
          expect(r.paleta.length).toBe(rec.buena.length + 2)
          for (const m of rec.buena) expect(r.paleta).toContain(m)
          // Ningún instrumento de más podría sustituir a uno bueno
          for (const m of rec.buena) for (const v of TAMBIEN_VALE.metodo[m] ?? []) expect(r.paleta).not.toContain(v)
          for (const mala of rec.malas) expect(esCorrecta(r, mala.join('>'))).toBe(false)
        }
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

  it('el objetivo lleva su artículo: «quieres la sal», «quieres el agua»', () => {
    for (const m of MEZCLAS.filter(x => x.objetivo)) expect(nombreDe(m.id, 'es')).toMatch(/\(quieres (la sal|el agua|el azúcar)\)$/)
  })
})

describe('El Laboratorio · el orden de los pasos', () => {
  it('vale cualquier orden que funcione, no solo el del libro', () => {
    expect(secuenciaValida('hierro-arena-sal', ['iman', 'disolver', 'filtrar', 'evaporar'])).toBe(true)
    expect(secuenciaValida('hierro-arena-sal', ['disolver', 'filtrar', 'iman', 'evaporar'])).toBe(true)
    expect(secuenciaValida('hierro-arena-sal', ['disolver', 'evaporar', 'filtrar', 'iman'])).toBe(false)
    expect(secuenciaValida('agua-alcohol-arena', ['destilar', 'filtrar'])).toBe(true)
    expect(secuenciaValida('arena-sal', ['filtrar', 'disolver', 'evaporar'])).toBe(false)
    for (const r of RECETAS) expect(secuenciaValida(r.id, r.buena), r.id).toBe(true)
  })
})
