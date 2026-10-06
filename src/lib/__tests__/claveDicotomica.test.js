import { describe, it, expect } from 'vitest'
import {
  GRUPOS, NODOS, NIVELES, SERES, gruposNivel, camino, genRonda, esCorrecta, explicacion, conclusion, schemaQuestion, esUn,
} from '../claveDicotomica'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']
const BANEADOS = /[\u{1FA70}-\u{1FAFF}]/u // tofu en Windows 10

describe('Clave dicotómica · la clave', () => {
  it('cada nodo lleva a nodos o grupos que existen, con la pregunta en tres idiomas', () => {
    for (const [id, n] of Object.entries(NODOS)) {
      for (const d of [n.si, n.no]) expect(NODOS[d] || GRUPOS[d], `${id} → ${d}`).toBeTruthy()
      for (const l of L) expect(n.q[l]).toMatch(/^¿?.+\?$/)
    }
  })

  it('desde la raíz de cada nivel se llega a cada uno de sus grupos por un solo camino', () => {
    for (const [nivel, cfg] of Object.entries(NIVELES)) {
      for (const g of gruposNivel(nivel)) {
        const c = camino(cfg.raiz, g)
        expect(c, `${nivel}/${g}`).not.toBeNull()
        // seguir el camino lleva de verdad al grupo
        let id = cfg.raiz
        for (const p of c) { expect(p.nodo).toBe(id); id = NODOS[id][p.resp] }
        expect(id).toBe(g)
      }
    }
  })

  it('todo grupo tiene seres vivos, y todo ser vivo nombre, rasgos y emoji seguro', () => {
    for (const g of Object.keys(GRUPOS)) expect(Object.values(SERES).some(s => s.grupo === g), g).toBe(true)
    for (const [id, s] of Object.entries(SERES)) {
      expect(GRUPOS[s.grupo], id).toBeTruthy()
      for (const l of L) { expect(s.nombre[l]).toBeTruthy(); expect(s.rasgos[l]).toBeTruthy(); if (s.nota) expect(s.nota[l]).toBeTruthy() }
      if (s.emoji) expect(s.emoji, id).not.toMatch(BANEADOS)
    }
  })

  it('los casos con trampa están donde deben', () => {
    expect(SERES.murcielago.grupo).toBe('mamifero')
    expect(SERES.delfin.grupo).toBe('mamifero')
    expect(SERES.pinguino.grupo).toBe('ave')
    expect(SERES.arana.grupo).toBe('aracnido')
    expect(SERES.cochinilla.grupo).toBe('crustaceo')
    expect(SERES.pulpo.grupo).toBe('molusco')
    expect(SERES.coral.grupo).toBe('cnidario')
    expect(SERES.erizo.grupo).toBe('mamifero')
    expect(SERES.erizomar.grupo).toBe('equinodermo')
  })

  it('el artículo del grupo concuerda en cada idioma', () => {
    expect(esUn('ave', 'es')).toBe('Es un ave.')
    expect(esUn('ave', 'ca')).toBe('És una au.')
    expect(esUn('angiosperma', 'es')).toBe('Es una angiosperma.')
    expect(esUn('insecto', 'en')).toBe('It is an insect.')
    expect(esUn('mamifero', 'en')).toBe('It is a mammal.')
  })
})

describe('Clave dicotómica · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas coherentes y todos los grupos del nivel salen`, () => {
      const rand = semilla(nivel.length * 4441)
      const grupos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        expect(gruposNivel(nivel)).toContain(r.grupo)
        expect(SERES[r.ser].grupo).toBe(r.grupo)
        expect(r.pasos.length).toBeGreaterThan(0)
        expect(esCorrecta(r, 'ok')).toBe(true)
        expect(esCorrecta(r, 0)).toBe(false)
        for (const l of L) {
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          expect(conclusion(r, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).toHaveLength(3)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
        grupos.add(r.grupo)
      }
      expect([...grupos].sort()).toEqual([...gruposNivel(nivel)].sort())
    })
  }
})
