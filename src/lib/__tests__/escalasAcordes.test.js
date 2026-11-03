import { describe, it, expect } from 'vitest'
import {
  genRonda, NIVELES, nota, nombre, altura, sube, notasEscala, notasAcorde, listaNotas, alteraciones, nombreIntervalo, INTERVALOS,
  objetivo, dadas, mismasAlturas, esCorrecta, enunciado, explicacion, schemaQuestion, tono,
} from '../escalasAcordes'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const Do = nota(0), Re = nota(1), Mi = nota(2), Fa = nota(3), Sol = nota(4), La = nota(5)

describe('Escalas y Acordes', () => {
  it('teoría de los libros', () => {
    // Escalas mayores con sus alteraciones de verdad (nombres, no solo teclas)
    expect(listaNotas(notasEscala(Do, 'mayor'), 'es')).toBe('Do – Re – Mi – Fa – Sol – La – Si – Do')
    expect(listaNotas(notasEscala(Re, 'mayor'), 'es')).toBe('Re – Mi – Fa♯ – Sol – La – Si – Do♯ – Re')
    expect(listaNotas(notasEscala(Fa, 'mayor'), 'es')).toBe('Fa – Sol – La – Si♭ – Do – Re – Mi – Fa')
    expect(listaNotas(notasEscala(nota(2, -1), 'mayor'), 'en')).toBe('E♭ – F – G – A♭ – B♭ – C – D – E♭')
    expect(listaNotas(notasEscala(La, 'menor'), 'es')).toBe('La – Si – Do – Re – Mi – Fa – Sol – La')
    expect(listaNotas(notasEscala(Mi, 'menor'), 'es')).toBe('Mi – Fa♯ – Sol – La – Si – Do – Re – Mi')
    // Armaduras: Sol 1♯, Re 2♯, La 3♯, Mi 4♯, Fa 1♭, Si♭ 2♭, Mi♭ 3♭, La♭ 4♭
    const arm = [[Sol, 1], [Re, 2], [La, 3], [Mi, 4], [Fa, 1], [nota(6, -1), 2], [nota(2, -1), 3], [nota(5, -1), 4]]
    for (const [n, k] of arm) expect(alteraciones(notasEscala(n, 'mayor')), nombre(n, 'es')).toBe(k)
    // Acordes
    expect(listaNotas(notasAcorde(Re, 'M'), 'es')).toBe('Re – Fa♯ – La')
    expect(listaNotas(notasAcorde(Re, 'm'), 'es')).toBe('Re – Fa – La')
    expect(listaNotas(notasAcorde(nota(6), 'd'), 'es')).toBe('Si – Re – Fa')
    expect(listaNotas(notasAcorde(Do, 'A'), 'es')).toBe('Do – Mi – Sol♯')
    // Intervalos: la letra sale de contar
    expect(nombre(sube(Re, '3M'), 'es')).toBe('Fa♯')
    expect(nombre(sube(Mi, '3m'), 'es')).toBe('Sol')
    expect(nombre(sube(Fa, '4A'), 'es')).toBe('Si')
    expect(nombre(sube(nota(6), '5d'), 'es')).toBe('Fa')
    expect(sube(nota(6, 1), '3M')).toBeNull() // Si♯ → Re𝄪: fuera
    expect(altura(sube(La, '8J'))).toBe(altura(La) + 12)
    for (const [id, [, , st]] of Object.entries(INTERVALOS)) expect(altura(sube(Do, id)) - altura(Do), id).toBe(st)
    expect(nombreIntervalo('3M', 'es')).toBe('3ª mayor')
    expect(nombreIntervalo('5J', 'en')).toBe('perfect 5th')
    expect(nombreIntervalo('6m', 'ca')).toBe('6a menor')
    expect(tono(0)).toBe('C4')
    expect(tono(13)).toBe('C#5')
    expect(mismasAlturas([4, 7], [7, 4])).toBe(true)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 191)
      const cuenta = {}
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        cuenta[r.tipo] = (cuenta[r.tipo] ?? 0) + 1
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo !== 'clasifica') {
          // Todo cabe en el teclado de dos octavas (Do4–Si5)
          for (const h of [...objetivo(r), ...dadas(r)]) { expect(h).toBeGreaterThanOrEqual(0); expect(h).toBeLessThanOrEqual(23) }
          for (const h of objetivo(r)) expect(dadas(r)).not.toContain(h)
        }
        if (r.tipo === 'escala') expect(r.notas).toHaveLength(8)
        if (r.tipo === 'acorde') expect(r.notas).toHaveLength(3)
        if (r.tipo === 'clasifica') {
          for (const x of r.items) { expect(r.cajas).toContain(x.intervalo); expect(altura(x.meta) - altura(x.raiz)).toBe(INTERVALOS[x.intervalo][2]) }
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined/)
          expect(explicacion(r, l)).not.toMatch(/undefined|null|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.question).not.toMatch(/undefined/)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(new Set(q.wrongAnswers).size).toBe(q.wrongAnswers.length)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      const tipos = NIVELES[nivel].tipos
      for (const t of new Set(tipos)) expect(cuenta[t] / 500, t).toBeGreaterThan(0.6 * tipos.filter(x => x === t).length / tipos.length)
    })
  }
})
