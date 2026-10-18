import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, INSTRUMENTOS, FAMILIAS, SUBFAMILIAS, SONIDOS, HS, SIN_SITIO, instrumento, esCorrecta, cajaDe, textoCaja, enunciado, explicacion, schemaQuestion } from '../laOrquesta'

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
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 211)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        expect(new Set(r.inst).size).toBe(r.inst.length)
        if (r.tipo === 'sienta') for (const id of r.inst) { expect(SIN_SITIO).not.toContain(id); expect(FAMILIAS[instrumento(id).familia]).toBeTruthy() }
        if (r.tipo === 'empareja') expect([...r.nombres].sort()).toEqual([...r.inst].sort())
        if (r.tipo === 'clasifica') {
          expect(new Set(r.cajas).size).toBe(r.cajas.length)
          for (const id of r.inst) expect(r.cajas).toContain(cajaDe(r, id))
          for (const l of ['es', 'en', 'ca']) for (const c of r.cajas) expect(textoCaja(r, c, l)).toBeTruthy()
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
      expect(SUBFAMILIAS && SONIDOS && HS && INSTRUMENTOS.length).toBeTruthy()
    })
  }
})
