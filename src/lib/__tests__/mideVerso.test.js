import { describe, it, expect } from 'vitest'
import { silabear, medir, tipoRima, estrofa, acento } from '../metrica'
import { NIVELES, genRonda, esCorrecta, respuestaBuena, explicacion, enunciado, cajaDe, normaliza, ESQUEMA } from '../mideVerso'
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
        expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
        if (r.mecanica === 'clasifica') {
          // Cada elemento tiene su caja, y no hay dos en la misma
          expect(r.items.length).toBeGreaterThanOrEqual(2)
          const cajas = r.items.map(it => cajaDe(r, it))
          for (const c of cajas) expect(r.cajas).toContain(c)
          expect(new Set(cajas).size).toBe(cajas.length)
          expect(esCorrecta(r, 'clasifica:1')).toBe(false)
        }
        if (r.mecanica === 'tonica') {
          expect(r.silabasUltima.length).toBeGreaterThanOrEqual(2)
          expect(esCorrecta(r, String((r.tonica + 1) % r.silabasUltima.length))).toBe(false)
        }
        if (r.mecanica === 'teclea') expect(esCorrecta(r, String(r.bueno + 1))).toBe(false)
        if (r.pregunta === 'silabas') {
          expect(r.bueno).toBe(medir(r.fragmento.versos[r.marcados[0]]).silabas)
          expect(NIVELES[nivel].metros).toContain(r.bueno)
        }
        if (r.pregunta === 'rima') expect(r.bueno).toBe(tipoRima(r.fragmento.versos[r.marcados[0]], r.fragmento.versos[r.marcados[1]]))
        for (const l of L) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})

describe('Mide el verso · esquema de rima', () => {
  it('las letras cuentan por orden de aparición', () => {
    expect(normaliza('baab')).toBe('abba')
    expect(normaliza('-b-b')).toBe('-a-a')
    expect(normaliza('abab')).toBe(ESQUEMA.cuarteta)
    expect(normaliza('aaaa')).not.toBe(ESQUEMA.redondilla)
  })
})
