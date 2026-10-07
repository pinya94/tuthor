import { describe, it, expect } from 'vitest'
import { silabear, medir, tipoRima, estrofa, acento } from '../metrica'
import { NIVELES, genRonda, esCorrecta, explicacion, textoOpcion, enunciado } from '../mideVerso'
import { FRAGMENTOS } from '../../data/versos'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

describe('métrica · separar en sílabas', () => {
  it.each([
    ['poesía', 'po-e-sí-a'], ['Violante', 'Vio-lan-te'], ['aprieto', 'a-prie-to'], ['concluyendo', 'con-clu-yen-do'],
    ['suavemente', 'sua-ve-men-te'], ['ruïdo', 'ru-ï-do'], ['aéreo', 'a-é-re-o'], ['guerra', 'gue-rra'], ['pingüino', 'pin-güi-no'],
    ['construir', 'cons-truir'], ['instante', 'ins-tan-te'], ['hombres', 'hom-bres'], ['acusáis', 'a-cu-sáis'], ['rey', 'rey'],
  ])('%s → %s', (p, s) => expect(silabear(p).silabas.join('-')).toBe(s))

  it('acento', () => {
    expect(acento('bergantín')).toBe('aguda')
    expect(acento('mar')).toBe('aguda')
    expect(acento('cabello')).toBe('llana')
    expect(acento('pálida')).toBe('esdrujula')
    expect(acento('árboles')).toBe('esdrujula')
  })
})

describe('métrica · los poemas', () => {
  it('cada verso mide exactamente su metro conocido', () => {
    for (const f of FRAGMENTOS) f.versos.forEach((v, i) => {
      const esperado = Array.isArray(f.metro) ? f.metro[i] : f.metro
      expect(medir(v).silabas, `${f.autor}: «${v}»`).toBe(esperado)
    })
  })
  it('las estrofas declaradas se reconocen, y las no declaradas no', () => {
    for (const f of FRAGMENTOS) expect(estrofa(f.versos), f.id).toBe(f.estrofa ?? null)
  })
  it('rimas de referencia', () => {
    expect(tipoRima('Pero ¡mal rayo me parta', 'si en concluyendo la carta')).toBe('consonante')
    expect(tipoRima('con su polisón de nardos.', 'El niño la está mirando.')).toBe('asonante')
    expect(tipoRima('he abierto muchas veredas;', 'y atracado en cien riberas.')).toBe('asonante')
    expect(tipoRima('Verde que te quiero verde.', 'El barco sobre la mar')).toBe('libre')
  })
  it('solo autores de dominio público y versos sin traducir', () => {
    const permitidos = ['José de Espronceda', 'José Zorrilla', 'Sor Juana Inés de la Cruz', 'Antonio Machado', 'Federico García Lorca', 'Luis de Góngora', 'Francisco de Quevedo', 'Lope de Vega', 'Garcilaso de la Vega', 'Gustavo Adolfo Bécquer', 'Rubén Darío', 'San Juan de la Cruz']
    for (const f of FRAGMENTOS) {
      expect(permitidos, f.autor).toContain(f.autor)
      for (const v of f.versos) expect(typeof v).toBe('string')
    }
  })
})

describe('Mide el verso · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: la respuesta sale de la medida`, () => {
      const rand = semilla(nivel.length * 97)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.pregunta)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.pregunta === 'silabas' || r.pregunta === 'nombre') {
          expect(r.bueno).toBe(medir(r.fragmento.versos[r.marcados[0]]).silabas)
          expect(NIVELES[nivel].metros).toContain(r.bueno)
        }
        if (r.pregunta === 'rima') expect(r.bueno).toBe(tipoRima(r.fragmento.versos[r.marcados[0]], r.fragmento.versos[r.marcados[1]]))
        for (const l of L) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined/)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})
