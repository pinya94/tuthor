import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, FILOSOFOS, CORRIENTES, TAMBIEN_CORRIENTE, filosofo, enunciado, explicacion, schemaQuestion, esCorrecta, textoItem } from '../quienLoPenso'

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
    it(nivel + ' ' + (epoca ?? 'todo') + ': 300 rondas', { timeout: 60000 }, () => {
      const rand = semilla(nivel.length * 101 + (epoca?.length ?? 0))
      const tipos = new Set()
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand, epoca })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        expect(new Set(r.fils).size).toBe(r.fils.length)
        if (epoca) for (const id of r.fils) expect(filosofo(id).epoca).toBe(epoca)
        if (r.tipo === 'linea') {
          const ord = r.bueno.split(',').map(filosofo)
          for (let k = 1; k < ord.length; k++) expect(ord[k].nace).toBeGreaterThanOrEqual(ord[k - 1].muere)
        }
        if (r.tipo === 'empareja') {
          // Ninguna idea la defendió también otro filósofo de la ronda.
          for (const it of r.items) if (it.idea != null) for (const x of r.items) if (x.fil !== it.fil) expect(filosofo(it.fil).ideas[it.idea][1]).not.toContain(x.fil)
          expect([...r.nombres].sort()).toEqual([...r.fils].sort())
        }
        if (r.tipo === 'escuelas') {
          for (const id of r.fils) {
            expect(r.cajas).toContain(filosofo(id).corriente)
            for (const c of TAMBIEN_CORRIENTE[id] ?? []) expect(r.cajas).not.toContain(c)
          }
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          expect(enunciado(r, l)).toBeTruthy()
          if (r.items) for (const it of r.items) expect(textoItem(it, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(1)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
