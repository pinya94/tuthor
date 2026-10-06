import { describe, it, expect } from 'vitest'
import {
  PROCESOS, NODOS, FLECHAS, ROCAS, RUTAS, ORIGENES, SUBTIPOS, NIVELES,
  genRonda, esCorrecta, explicacion, schemaQuestion, textoOpcion, enunciado,
} from '../cicloRocas'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

// A qué nodo del ciclo lleva cada proceso, y desde dónde se puede aplicar.
const LLEGA = { enfriamiento: 'ignea', erosion: 'sedimentos', litificacion: 'sedimentaria', metamorfismo: 'metamorfica', fusion: 'magma' }
const DESDE = {
  enfriamiento: ['magma'],
  erosion: ['ignea', 'sedimentaria', 'metamorfica'],
  litificacion: ['sedimentos'],
  metamorfismo: ['ignea', 'sedimentaria', 'metamorfica'],
  fusion: ['ignea', 'sedimentaria', 'metamorfica'],
}
// Recorre una secuencia de procesos desde un nodo: el nodo final o null si
// algún paso es imposible.
function recorrer(nodo, procesos) {
  for (const p of procesos) {
    if (!DESDE[p].includes(nodo)) return null
    nodo = LLEGA[p]
  }
  return nodo
}

describe('Ciclo de las rocas · datos', () => {
  it('cada flecha une nodos que existen con el proceso que lleva a su destino', () => {
    for (const [a, b, p] of FLECHAS) {
      expect(NODOS[a] && NODOS[b] && PROCESOS[p]).toBeTruthy()
      expect(LLEGA[p], `${a}→${b}`).toBe(b)
      expect(DESDE[p]).toContain(a)
    }
  })
  it('las metamórficas tienen su roca de origen entre las opciones; las demás, no', () => {
    for (const [id, r] of Object.entries(ROCAS)) {
      if (r.tipo === 'metamorfica') expect(ORIGENES, id).toContain(r.origen)
      else expect(r.origen, id).toBeNull()
      if (r.subtipo) expect(SUBTIPOS[r.tipo], id).toContain(r.subtipo)
      for (const l of L) { expect(r.nombre[l]).toBeTruthy(); expect(r.desc[l]).toBeTruthy() }
    }
    expect(ROCAS.caliza.subtipo).toBeNull() // química u orgánica según el libro
  })
  it('rutas: la buena lleva de verdad de una roca a la otra y las malas no', () => {
    for (const r of RUTAS) {
      const desde = ROCAS[r.desde].tipo, hasta = ROCAS[r.hasta].tipo
      expect(recorrer(desde, r.buena), `${r.desde}→${r.hasta}`).toBe(hasta)
      for (const m of r.malas) expect(recorrer(desde, m), `${r.desde}→${r.hasta}: ${m}`).not.toBe(hasta)
    }
  })
})

describe('Ciclo de las rocas · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas coherentes`, () => {
      const rand = semilla(nivel.length * 271)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined/)
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})
