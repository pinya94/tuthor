// Invariantes de la Balanza Algebraica: toda ronda generada es resoluble con el
// método de la balanza (cancelar términos + dividir), la solución hallada
// coincide con la real, y las operaciones conservan la igualdad. Cazan
// generaciones sin salida (p. ej. coeficiente −1 no divisible).
import { describe, it, expect } from 'vitest'
import { genRound, removeTerm, divide, canDivide, isSolved, solvedValue, sideText } from '../algebra.js'

function seededRand(seed) {
  let s = seed
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
}

// Valor de un lado en x (para comprobar que las operaciones conservan la igualdad).
const evalSide = (side, x) => side.m * x + side.k

// Resuelve una ronda siguiendo la estrategia canónica del método de la balanza.
function solve(round) {
  let st = { L: { ...round.L }, R: { ...round.R } }
  let guard = 0
  // 1. Cancelar la x del lado derecho (restarla a los dos lados).
  if (st.R.m !== 0) st = removeTerm(st, 'R', 'x').state
  // 2. Cancelar la constante del lado izquierdo.
  if (st.L.k !== 0) st = removeTerm(st, 'L', 'k').state
  // 3. Si aún hay constante a la derecha con x a la izquierda, ya está m·x = k.
  //    Dividir hasta resolver.
  while (!isSolved(st) && canDivide(st) && guard++ < 5) st = divide(st).state
  return st
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
  it('toda ronda es resoluble y da la solución correcta, en las 3 dificultades', () => {
    for (const diff of ['facil', 'medio', 'dificil']) {
      const rand = seededRand(diff.length * 13 + 1)
      for (let n = 0; n < 120; n++) {
        const r = genRound(diff, rand)
        const eq0 = `${sideText(r.L)} = ${sideText(r.R)}`
        // No arranca resuelta.
        expect(isSolved({ L: r.L, R: r.R }), `${diff}: ${eq0} arranca resuelta`).toBe(false)
        // La ecuación es cierta en x0 (generación coherente).
        expect(evalSide(r.L, r.solution), `${diff}: ${eq0} no cuadra en x0`).toBe(evalSide(r.R, r.solution))
        // Resoluble con el método, y la solución coincide con x0.
        const st = solve(r)
        expect(isSolved(st), `${diff}: ${eq0} no se resuelve`).toBe(true)
        expect(solvedValue(st), `${diff}: ${eq0} solución incorrecta`).toBe(r.solution)
      }
    }
  })

  it('las operaciones conservan la igualdad (misma solución en cada paso)', () => {
    const r = genRound('dificil', seededRand(77))
    let st = { L: { ...r.L }, R: { ...r.R } }
    const holds = s => evalSide(s.L, r.solution) === evalSide(s.R, r.solution)
    expect(holds(st)).toBe(true)
    st = removeTerm(st, 'R', 'x').state; expect(holds(st)).toBe(true)
    if (st.L.k !== 0) { st = removeTerm(st, 'L', 'k').state; expect(holds(st)).toBe(true) }
    if (canDivide(st)) { st = divide(st).state; expect(holds(st)).toBe(true) }
  })
})
