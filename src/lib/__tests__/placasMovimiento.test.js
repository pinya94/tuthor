import { describe, it, expect } from 'vitest'
import { genRonda, esCorrecta, respuestaBuena, encaja, NIVELES, ESCENARIOS, IDS, FORMA, EJEMPLO, QUE, MOV, enunciado, explicacion, textoOpcion, schemaQuestion, dibujoAntes } from '../placasMovimiento'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Placas en Movimiento', () => {
  it('cada escenario tiene su forma, su ejemplo y su descripción en los tres idiomas', () => {
    for (const id of IDS) {
      for (const t of [FORMA, EJEMPLO, QUE]) for (const l of ['es', 'en', 'ca']) expect(t[id][l], `${id}/${l}`).toBeTruthy()
      expect(MOV[ESCENARIOS[id].mov]).toBeTruthy()
    }
    // Formas y ejemplos no se repiten: si no, una pregunta tendría dos respuestas.
    for (const t of [FORMA, EJEMPLO, QUE]) expect(new Set(IDS.map(id => t[id].es)).size).toBe(IDS.length)
  })

  it('solo se pregunta qué placa se hunde donde la respuesta es indiscutible', () => {
    const conSubduce = IDS.filter(id => ESCENARIOS[id].subduce)
    expect(conSubduce.sort()).toEqual(['contCont', 'ocCont'])
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas bien formadas`, () => {
      const rand = semilla(nivel.length * 104729)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(r.opciones.length).toBeGreaterThanOrEqual(3)
        expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
        if (r.mecanica === 'construye') {
          // cada combinación encaja con un solo escenario (o con la transformante)
          const combos = []
          for (const a of ['oc', 'cont']) for (const b of ['oc', 'cont']) for (const m of ['div', 'conv', 'transf']) combos.push([a, b, m])
          for (const c of combos) if (encaja(r.escenario, c)) expect(IDS.filter(id => encaja(id, c))).toEqual([r.escenario])
        }
        if (r.mecanica === 'clasifica') {
          expect(r.items).toHaveLength(3)
          expect(esCorrecta(r, 'clasifica:1')).toBe(false)
        }
        if (r.mecanica === 'subduce') expect(['oc', 'ninguna']).toContain(respuestaBuena(r))
        if (r.tipo === 'tipo') expect(r.bueno).toBe(ESCENARIOS[r.escenario].mov)
        if (['forma', 'ejemplo', 'lugar', 'pista'].includes(r.tipo)) expect(r.bueno).toBe(r.escenario)
        if (r.tipo !== 'hawai') expect(IDS).toContain(r.escenario)
        // El lugar se nombra sin pistas: «Rift», «fosa» o «dorsal» darían la respuesta.
        if (r.tipo === 'lugar') for (const l of ['es', 'en', 'ca']) expect(enunciado(r, l)).not.toMatch(/rift|fosa|fossa|trench|dorsal|ridge|falla|fault/i)
        // Las preguntas «de síntomas» no enseñan el dibujo antes de tiempo.
        expect(dibujoAntes(r)).toBe(!['lugar', 'pista', 'hawai'].includes(r.tipo))
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).toBeTruthy()
          expect(schemaQuestion(r, l).wrongAnswers.length).toBe(r.opciones.length - 1)
        }
      }
      // Hawái (no es un borde) ya no sale en el juego
      for (const t of NIVELES[nivel].tipos.filter(t => t !== 'hawai')) expect(tipos.has(t), t).toBe(true)
    })
  }
})
