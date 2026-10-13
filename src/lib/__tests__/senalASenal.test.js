import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, SENALES, TIPOS, SITUACIONES, senal, enunciado, explicacion, textoOpcion, schemaQuestion } from '../senalASenal'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Señal a Señal', () => {
  it('señales y situaciones coherentes', () => {
    for (const x of SENALES) {
      expect(TIPOS[x.tipo], x.id).toBeTruthy()
      if (x.pareja) { expect(senal(x.pareja), x.pareja).toBeTruthy(); expect(senal(x.pareja).pareja).toBeTruthy() }
    }
    expect(new Set(SENALES.map(x => x.sig.es)).size).toBe(SENALES.length)
    for (const c of SITUACIONES) {
      expect(c.mal).toHaveLength(3)
      for (const l of ['es', 'en', 'ca']) expect(new Set([c.ok[l], ...c.mal.map(m => m[l])]).size).toBe(4)
    }
    // Las parejas que se confunden son de tipos distintos o se distinguen por la forma.
    expect(senal('maxima50').tipo).toBe('prohibicion')
    expect(senal('minima30').tipo).toBe('obligacion')
    expect(senal('peatonesPeligro').tipo).toBe('peligro')
    expect(senal('peatonesInd').tipo).toBe('indicacion')
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas`, { timeout: 60000 }, () => {
      const rand = semilla(nivel.length * 151)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        expect(r.opciones).toContain(r.bueno)
        if (r.tipo === 'tipo') expect(r.bueno).toBe(senal(r.senal).tipo)
        if (r.tipo === 'significado') expect(r.bueno).toBe(r.senal)
        for (const l of ['es', 'en', 'ca']) {
          expect(new Set(r.opciones.map(o => textoOpcion(o, r, l))).size).toBe(4)
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          expect(enunciado(r, l)).toBeTruthy()
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(3)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
