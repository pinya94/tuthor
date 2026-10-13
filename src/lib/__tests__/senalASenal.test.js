import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, SENALES, MARCOS, SIMBOLOS, TIPOS, senal, senalDe, senalesDe, esCorrecta, enunciado, explicacion, schemaQuestion } from '../senalASenal'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const LS = ['es', 'en', 'ca']

describe('Señal a Señal', () => {
  it('cada señal es una combinación única de marco y símbolo', () => {
    const claves = SENALES.map(x => `${x.marco}:${x.simbolo}`)
    expect(new Set(claves).size).toBe(SENALES.length)
    for (const x of SENALES) {
      expect(MARCOS[x.marco], x.id).toBeTruthy()
      expect(SIMBOLOS[x.simbolo], x.id).toBeTruthy()
      expect(TIPOS[x.tipo], x.id).toBeTruthy()
      expect(senalDe(x.marco, x.simbolo).id).toBe(x.id)
      for (const l of LS) expect(x.sig[l]).toBeTruthy()
    }
    // La bici con tres marcos y el peatón con dos: lo que decide es la forma.
    expect(SENALES.filter(x => x.simbolo === 'bici').map(x => x.tipo).sort()).toEqual(['obligacion', 'peligro', 'prohibicion'])
    expect(SENALES.filter(x => x.simbolo === 'peaton').map(x => x.tipo).sort()).toEqual(['indicacion', 'peligro'])
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 400 rondas`, { timeout: 30000 }, () => {
      const cfg = NIVELES[nivel]
      const rand = semilla(nivel.length * 41)
      const vistas = new Set(), tipos = new Set()
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        if (r.tipo === 'monta') {
          vistas.add(r.senal)
          const sn = senal(r.senal)
          // La buena se puede montar con lo que se ofrece, y es la única con ese significado.
          expect(r.marcos).toContain(sn.marco)
          expect(r.simbolos).toContain(sn.simbolo)
          expect(r.simbolos).toHaveLength(cfg.simbolos)
          expect(new Set(r.simbolos).size).toBe(r.simbolos.length)
          expect(esCorrecta(r, `${sn.marco}:${sn.simbolo}`)).toBe(true)
          for (const m of r.marcos) if (m !== sn.marco) expect(esCorrecta(r, `${m}:${sn.simbolo}`)).toBe(false)
        } else {
          expect(r.senales).toHaveLength(4)
          expect(new Set(r.senales).size).toBe(4)
          for (const id of r.senales) expect(r.clases).toContain(senal(id).tipo)
          expect(new Set(r.senales.map(id => senal(id).tipo)).size).toBeGreaterThanOrEqual(3)
          expect(esCorrecta(r, 'clasifica:0')).toBe(true)
          expect(esCorrecta(r, 'clasifica:1')).toBe(false)
        }
        for (const l of LS) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l, r.bueno)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(3)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of cfg.tipos) expect(tipos.has(t), t).toBe(true)
      expect(vistas.size).toBe(senalesDe(nivel).length)
    })
  }
})
