import { describe, it, expect } from 'vitest'
import { nuevoTablero, rondaExamen, simular, resuelto, minimoGiros, reflejar, espejoPara, NIVELES } from '../rayoLuz.js'

// Generador con semilla: los tests recorren muchos tableros y deben ser
// reproducibles si fallan.
function semilla(s) {
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
}

describe('Rayo de Luz · ley de la reflexión', () => {
  it('un espejo a 45° gira el rayo 90° y es reversible', () => {
    expect(reflejar('/', 'E')).toBe('N')
    expect(reflejar('/', 'N')).toBe('E')
    expect(reflejar('\\', 'E')).toBe('S')
    expect(reflejar('\\', 'S')).toBe('E')
    for (const [a, b] of [['E', 'N'], ['E', 'S'], ['W', 'N'], ['N', 'W'], ['S', 'E']]) {
      expect(reflejar(espejoPara(a, b), a)).toBe(b)
    }
  })
})

describe('Rayo de Luz · tableros del juego', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: siempre resoluble, nunca empieza resuelto`, () => {
      const rand = semilla(nivel.length * 97)
      for (let i = 0; i < 150; i++) {
        const { tablero, orient, minimo } = nuevoTablero(nivel, rand)
        expect(resuelto(tablero, orient)).toBe(false)
        expect(minimo).toBeGreaterThan(0)
        expect(minimoGiros(tablero, orient)).toBe(minimo)
        // La solución construida lleva la luz al sensor
        const sol = { ...orient }
        for (const e of tablero.espejos) if (e.solucion) sol[e.id] = e.solucion
        expect(resuelto(tablero, sol)).toBe(true)
      }
    })
  }

  it('nada se pisa, y en la casilla del láser no hay pared ni sensor (un espejo sí puede)', () => {
    const rand = semilla(7)
    for (let i = 0; i < 150; i++) {
      const { tablero } = nuevoTablero('dificil', rand)
      const casillas = [...tablero.espejos, ...tablero.paredes, tablero.sensor].map(p => `${p.c},${p.r}`)
      expect(new Set(casillas).size).toBe(casillas.length)
      const bloqueos = [...tablero.paredes, tablero.sensor].map(p => `${p.c},${p.r}`)
      expect(bloqueos).not.toContain(`${tablero.laser.c},${tablero.laser.r}`)
    }
  })

  it('más difícil = más espejos en el camino', () => {
    const media = nivel => {
      const rand = semilla(3)
      let n = 0
      for (let i = 0; i < 60; i++) n += nuevoTablero(nivel, rand).tablero.espejos.filter(e => e.solucion).length
      return n / 60
    }
    expect(media('medio')).toBeGreaterThan(media('facil'))
    expect(media('dificil')).toBeGreaterThan(media('medio'))
  })
})

describe('Rayo de Luz · examen', () => {
  for (const nivel of ['facil', 'medio', 'dificil']) {
    it(`${nivel}: el rayo sale por la salida marcada como correcta, y solo por una`, () => {
      const rand = semilla(nivel.length * 31)
      for (let i = 0; i < 150; i++) {
        const { tablero, orient, salidas, correcta } = rondaExamen(nivel, rand)
        expect(salidas).toHaveLength(4)
        const sim = simular(tablero, orient)
        expect(sim.fin).toBe('fuera')
        const buenas = salidas.filter(s => s.c === sim.salida.c && s.r === sim.salida.r && s.dir === sim.salida.dir)
        expect(buenas).toHaveLength(1)
        expect(buenas[0].letra).toBe(correcta)
      }
    })
  }
})
