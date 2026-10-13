import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, INSTRUMENTOS, FAMILIAS, SUBFAMILIAS, SONIDOS, HS, SITIOS, instrumento, enunciado, explicacion, textoOpcion, schemaQuestion } from '../laOrquesta'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('La Orquesta', () => {
  it('datos y trampas del temario', () => {
    for (const i of INSTRUMENTOS) {
      expect(FAMILIAS[i.familia], i.id).toBeTruthy()
      expect(SUBFAMILIAS[i.sub], i.id).toBeTruthy()
      expect(SONIDOS[i.sonido], i.id).toBeTruthy()
      expect(HS[i.hs], i.id).toBeTruthy()
    }
    // La familia la decide cómo suena, no el material.
    expect(instrumento('flauta').familia).toBe('madera')
    expect(instrumento('saxofon').familia).toBe('madera')
    expect(instrumento('piano').familia).toBe('cuerda')
    expect(instrumento('timbal').sub).toBe('afinada')
    // Coherencia sonido ↔ Hornbostel-Sachs
    for (const i of INSTRUMENTOS) {
      if (['arco', 'pulsar', 'macillos'].includes(i.sonido)) expect(i.hs, i.id).toBe('cordofono')
      if (['bisel', 'lengueta', 'doble', 'labios'].includes(i.sonido)) expect(i.hs, i.id).toBe('aerofono')
      if (i.sonido === 'membrana') expect(i.hs, i.id).toBe('membranofono')
      if (i.sonido === 'cuerpo') expect(i.hs, i.id).toBe('idiofono')
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas`, { timeout: 60000 }, () => {
      const rand = semilla(nivel.length * 89)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        const it = instrumento(r.inst)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        const esperado = { nombre: it.id, familia: it.familia, subfamilia: it.sub, sonido: it.sonido, hs: it.hs, sitio: SITIOS[it.familia] }[r.tipo]
        expect(r.bueno).toBe(esperado)
        if (r.tipo === 'sitio') expect(['arpa', 'piano', 'guitarra', 'saxofon']).not.toContain(it.id)
        for (const l of ['es', 'en', 'ca']) {
          expect(new Set(r.opciones.map(o => textoOpcion(o, r, l))).size).toBe(r.opciones.length)
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          expect(enunciado(r, l)).toBeTruthy()
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
