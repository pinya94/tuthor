// Invariantes de la Balanza Algebraica: toda ronda generada es resoluble
// USANDO SOLO las opciones que se le ofrecen al jugador, la solución hallada
// coincide con la real, y ninguna opción puede romper la igualdad ni sacar la
// ecuación de los enteros. Cazan generaciones sin salida (p. ej. coeficiente
// −1 no divisible) y opciones que dejarían la ronda impracticable.
import { describe, it, expect } from 'vitest'
import { genRound, availableOps, applyOp, isSolved, solvedValue, sideText } from '../algebra.js'

function seededRand(seed) {
  let s = seed
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
}

// Valor de un lado en x (para comprobar que las operaciones conservan la igualdad).
const evalSide = (side, x) => side.m * x + side.k

// ¿Puede el jugador ganar SOLO con las opciones que se le ofrecen? Se explora
// en anchura porque hay caminos que se pisan (cancelar 4x y volver a sumarlo
// es legal, pero da vueltas): lo que importa es que exista un camino, no que
// el primero que se pruebe acierte.
const keyOf = s => `${s.L.m},${s.L.k},${s.R.m},${s.R.k}`

function solve(round) {
  const start = { L: { ...round.L }, R: { ...round.R } }
  const seen = new Set([keyOf(start)])
  let frontier = [start]
  for (let depth = 0; depth < 8 && frontier.length; depth++) {
    const next = []
    for (const st of frontier) {
      if (isSolved(st)) return st
      for (const op of availableOps(st)) {
        const ns = applyOp(st, op).state
        const k = keyOf(ns)
        if (seen.has(k)) continue
        seen.add(k)
        if (isSolved(ns)) return ns
        next.push(ns)
      }
    }
    frontier = next
  }
  return frontier[0] ?? start
}

describe('sideText', () => {
  it('formatea lados legibles', () => {
    expect(sideText({ m: 2, k: 3 })).toBe('2x + 3')
    expect(sideText({ m: 1, k: 0 })).toBe('x')
    expect(sideText({ m: -1, k: -4 })).toBe('−x − 4')
    expect(sideText({ m: 0, k: 7 })).toBe('7')
  })
})

describe('genRound + método de la balanza', () => {
  it('toda ronda se resuelve con las opciones ofrecidas, en las 3 dificultades', () => {
    for (const diff of ['facil', 'medio', 'dificil']) {
      const rand = seededRand(diff.length * 13 + 1)
      for (let n = 0; n < 120; n++) {
        const r = genRound(diff, rand)
        const eq0 = `${sideText(r.L)} = ${sideText(r.R)}`
        // No arranca resuelta.
        expect(isSolved({ L: r.L, R: r.R }), `${diff}: ${eq0} arranca resuelta`).toBe(false)
        // La ecuación es cierta en x0 (generación coherente).
        expect(evalSide(r.L, r.solution), `${diff}: ${eq0} no cuadra en x0`).toBe(evalSide(r.R, r.solution))
        // Resoluble solo con lo que ve el jugador, y la solución coincide con x0.
        const st = solve(r)
        expect(isSolved(st), `${diff}: ${eq0} no se resuelve con las opciones dadas`).toBe(true)
        expect(solvedValue(st), `${diff}: ${eq0} solución incorrecta`).toBe(r.solution)
      }
    }
  })

  it('nunca se ofrece una pantalla sin salida (siempre hay alguna opción)', () => {
    for (const diff of ['facil', 'medio', 'dificil']) {
      const rand = seededRand(diff.length * 7 + 3)
      for (let n = 0; n < 60; n++) {
        let st = (({ L, R }) => ({ L: { ...L }, R: { ...R } }))(genRound(diff, rand))
        for (let guard = 0; guard < 6 && !isSolved(st); guard++) {
          const ops = availableOps(st)
          expect(ops.length, `${sideText(st.L)} = ${sideText(st.R)}: sin opciones`).toBeGreaterThan(0)
          expect(ops.some(o => o.helps), `${sideText(st.L)} = ${sideText(st.R)}: sin salida`).toBe(true)
          st = applyOp(st, ops.find(o => o.helps)).state
        }
      }
    }
  })

  it('ninguna opción rompe la igualdad ni saca la ecuación de los enteros', () => {
    // También las que no ayudan: elegir mal debe dejar la balanza equilibrada
    // (es álgebra legal), solo que sin acercar la x.
    for (const diff of ['facil', 'medio', 'dificil']) {
      const rand = seededRand(diff.length * 5 + 11)
      for (let n = 0; n < 40; n++) {
        const r = genRound(diff, rand)
        const st = { L: { ...r.L }, R: { ...r.R } }
        for (const op of availableOps(st)) {
          const ns = applyOp(st, op).state
          const eq = `${sideText(st.L)} = ${sideText(st.R)} · ${op.label.es}`
          expect(evalSide(ns.L, r.solution), `${eq}: rompe la igualdad`).toBe(evalSide(ns.R, r.solution))
          for (const v of [ns.L.m, ns.L.k, ns.R.m, ns.R.k]) {
            expect(Number.isInteger(v), `${eq}: saca decimales`).toBe(true)
          }
        }
      }
    }
  })

  it('cada opción tiene id y etiqueta únicos en los 3 idiomas', () => {
    const rand = seededRand(99)
    for (let n = 0; n < 40; n++) {
      const r = genRound('dificil', rand)
      const ops = availableOps({ L: { ...r.L }, R: { ...r.R } })
      expect(new Set(ops.map(o => o.id)).size, 'ids duplicados').toBe(ops.length)
      for (const l of ['es', 'en', 'ca']) {
        expect(new Set(ops.map(o => o.label[l])).size, `etiquetas duplicadas en ${l}`).toBe(ops.length)
      }
    }
  })
})
