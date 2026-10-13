import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, PLANTILLAS, TRAMPAS, VEREDICTOS, plantillasDe, esCorrecta, respuesta, enunciado, explicacion, schemaQuestion } from '../ojoAlMensaje'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const LS = ['es', 'en', 'ca']

describe('Ojo al Mensaje', () => {
  it('plantillas coherentes', () => {
    expect(new Set(PLANTILLAS.map(p => p.id)).size).toBe(PLANTILLAS.length)
    for (const p of PLANTILLAS) {
      expect(VEREDICTOS[p.veredicto], p.id).toBeTruthy()
      const tr = p.segs.filter(x => x.trampa)
      // De fiar: nada que tocar. Timo o peligro: al menos dos trampas y algo normal que no tocar.
      if (p.veredicto === 'fiar') expect(tr, p.id).toHaveLength(0)
      else { expect(tr.length, p.id).toBeGreaterThanOrEqual(p.nivel === 'dificil' ? 1 : 2); expect(p.segs.length - tr.length, p.id).toBeGreaterThanOrEqual(1) }
      for (const x of tr) expect(TRAMPAS[x.trampa], `${p.id}: ${x.trampa}`).toBeTruthy()
      // Un timo y un peligro no se mezclan.
      const TIMO = ['remitente', 'enlace', 'dinero', 'premio', 'adjunto', 'datos']
      const PELIGRO = ['desconocido', 'personal', 'secreto', 'quedar', 'amenaza', 'burla', 'riesgo']
      if (p.veredicto === 'timo') for (const x of tr) expect(PELIGRO, p.id).not.toContain(x.trampa)
      if (p.veredicto === 'ayuda') for (const x of tr) expect(TIMO, p.id).not.toContain(x.trampa)
      for (const x of p.segs) for (const a of x.alts) for (const l of LS) expect(a[l], p.id).toBeTruthy()
      for (const l of LS) expect(p.porque[l]).toBeTruthy()
    }
    // Fácil: sin mensajes de fiar (se ve la cuenta de trampas: 0 lo delataría).
    expect(plantillasDe('facil').some(p => p.veredicto === 'fiar')).toBe(false)
    for (const n of ['medio', 'dificil']) for (const v of Object.keys(VEREDICTOS))
      expect(plantillasDe(n).some(p => p.veredicto === v), `${n} ${v}`).toBe(true)
  })

  it('corrección: veredicto, trampas que faltan y fallos', () => {
    const r = genRonda('facil', { rand: semilla(3) })
    expect(esCorrecta(r, respuesta(r.veredicto, 0, 0))).toBe(true)
    expect(esCorrecta(r, respuesta(r.veredicto, 0, 1))).toBe(true)
    expect(esCorrecta(r, respuesta(r.veredicto, 0, 2))).toBe(false)
    expect(esCorrecta(r, respuesta(r.veredicto, 1, 0))).toBe(false)
    expect(esCorrecta(r, respuesta(r.veredicto === 'timo' ? 'ayuda' : 'timo', 0, 0))).toBe(false)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 300 rondas`, { timeout: 30000 }, () => {
      const rand = semilla(nivel.length * 31)
      const vistos = new Set()
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand })
        vistos.add(r.plantilla)
        expect(r.trampas).toBe(r.segs.filter(x => x.trampa).length)
        for (const l of LS) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(2)
        }
      }
      expect(vistos.size).toBe(plantillasDe(nivel).length)
    })
  }
})
