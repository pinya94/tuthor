import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, FILOSOFOS, CORRIENTES, TAMBIEN_CORRIENTE, filosofo, enunciado, explicacion, textoOpcion, schemaQuestion } from '../quienLoPenso'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('¿Quién lo Pensó?', () => {
  it('filósofos coherentes', () => {
    for (const f of FILOSOFOS) {
      expect(f.nace).toBeLessThan(f.muere)
      expect(CORRIENTES[f.corriente], f.id).toBeTruthy()
      expect(f.ideas.length, f.id).toBeGreaterThanOrEqual(1)
      for (const [idea, tambien] of f.ideas) {
        for (const l of ['es', 'en', 'ca']) expect(idea[l], f.id).toBeTruthy()
        for (const t of tambien) expect(filosofo(t), t).toBeTruthy()
      }
      for (const l of ['es', 'en', 'ca']) { expect(f.nombre[l]).toBeTruthy(); expect(f.concepto[l]).toBeTruthy() }
    }
    for (const [id, cs] of Object.entries(TAMBIEN_CORRIENTE)) for (const c of cs) { expect(CORRIENTES[c]).toBeTruthy(); expect(filosofo(id).corriente).not.toBe(c) }
    expect(new Set(FILOSOFOS.map(f => f.concepto.es)).size).toBe(FILOSOFOS.length)
  })

  for (const nivel of Object.keys(NIVELES)) for (const epoca of [null, 'antigua', 'moderna']) {
    it(`${nivel} ${epoca ?? 'todo'}: 300 rondas`, { timeout: 60000 }, () => {
      const rand = semilla(nivel.length * 101 + (epoca?.length ?? 0))
      const tipos = new Set()
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand, epoca })
        tipos.add(r.tipo)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        expect(r.opciones).toContain(r.bueno)
        if (epoca && r.tipo !== 'corriente') for (const o of r.opciones) expect(filosofo(o).epoca).toBe(epoca)
        if (r.tipo === 'idea') {
          const tambien = filosofo(r.fil).ideas[r.idea][1]
          for (const o of r.opciones) if (o !== r.bueno) expect(tambien).not.toContain(o)
        }
        if (r.tipo === 'corriente') {
          expect(r.bueno).toBe(filosofo(r.fil).corriente)
          for (const o of r.opciones) if (o !== r.bueno) expect(TAMBIEN_CORRIENTE[r.fil] ?? []).not.toContain(o)
        }
        if (r.tipo === 'orden') {
          const ord = r.opciones.map(filosofo).sort((a, b) => a.nace - b.nace)
          expect(r.bueno).toBe(ord[0].id)
          for (let k = 1; k < 4; k++) expect(ord[k].nace).toBeGreaterThanOrEqual(ord[k - 1].muere)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          expect(enunciado(r, l)).toBeTruthy()
          expect(new Set(r.opciones.map(o => textoOpcion(o, r, l))).size).toBe(4)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(3)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
