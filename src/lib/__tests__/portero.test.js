// Invariantes de El Portero.
//
// Aquí lo que se genera es una FÓRMULA, y una fórmula mal formada no rompe
// nada: se pinta igual, la curva se dibuja igual, y el alumno se queda mirando
// un enunciado que no cuadra. Por eso casi todos estos tests comprueban lo
// mismo desde ángulos distintos: que lo que dice el texto sea lo que hace la
// función.
import { describe, it, expect } from 'vitest'
import {
  GOAL_X, ZONA_IDS, MARGEN_FRONTERA,
  zonaDe, generarNivel, generarTanda,
} from '../portero'

const NIVELES = ['facil', 'medio', 'dificil']
const MUESTRA = 600
const FRONTERAS = [2, 0, -2]

function cada(fn) {
  for (const dif of NIVELES) {
    for (let i = 0; i < MUESTRA; i++) fn(generarNivel(dif), dif)
  }
}

describe('el tiro siempre se puede contestar', () => {
  it('el balón entra por la portería, nunca fuera', () => {
    cada((n, dif) => {
      const y = n.fn(GOAL_X)
      expect(Math.abs(y), `${dif}: ${n.label} → f(3)=${y}`).toBeLessThanOrEqual(4)
    })
  })

  it('nunca cae pegado a la frontera entre dos zonas', () => {
    // y = 2 es zona A por la regla, pero en pantalla es indistinguible del
    // borde de la B. Contestar eso es adivinar.
    cada((n, dif) => {
      const y = n.fn(GOAL_X)
      for (const f of FRONTERAS) {
        expect(Math.abs(y - f), `${dif}: ${n.label} cae en ${y}, pegado a ${f}`)
          .toBeGreaterThanOrEqual(MARGEN_FRONTERA - 1e-9)
      }
    })
  })

  it('el balón sale de un punto exacto y visible del campo', () => {
    // Una salida en y = 1,333 no se puede situar en una cuadrícula de
    // unidades, y el alumno no sabría desde dónde está tirando.
    cada((n, dif) => {
      const y = n.fn(n.startX)
      expect(Number.isFinite(y)).toBe(true)
      expect(Math.abs(y * 2 - Math.round(y * 2)), `${dif}: ${n.label} sale de y=${y}`).toBeLessThan(1e-9)
      expect(Math.abs(y), `${dif}: ${n.label} sale fuera del campo`).toBeLessThanOrEqual(4.5)
      expect(n.startX).toBeLessThan(GOAL_X)
    })
  })

  it('la explicación dice el mismo resultado que devuelve la función', () => {
    // El fallo silencioso de generar texto: la fórmula se sustituye a mano en
    // el enunciado y deja de coincidir con lo que calcula fn.
    cada((n, dif) => {
      const y = n.fn(GOAL_X)
      const esperado = String(Math.round(y * 1e6) / 1e6).replace('-', '−')
      expect(n.explanation.es, `${dif}: ${n.label} vale ${y}`).toContain(` = ${esperado} →`)
    })
  })

  it('la explicación nombra la zona en la que de verdad cae', () => {
    cada((n, dif) => {
      const zona = zonaDe(n.fn(GOAL_X))
      expect(n.explanation.es, `${dif}: ${n.label}`).toContain(`Zona ${zona}`)
      expect(n.explanation.en, `${dif}: ${n.label}`).toContain(`Zone ${zona}`)
    })
  })

  it('la explicación está en los tres idiomas', () => {
    cada(n => {
      for (const l of ['es', 'en', 'ca']) expect(n.explanation[l]).toBeTruthy()
    })
  })
})

describe('la fórmula escrita es la función que se ejecuta', () => {
  it('sustituir la x por 3 en la etiqueta da el mismo número', () => {
    // Se evalúa la ETIQUETA, no la función: si el generador escribiera
    // "2x/3 + 1" para una función que en realidad es 2x/3 − 1, esto lo caza.
    cada((n, dif) => {
      const expr = n.label
        .replace('f(x) = ', '')
        .replace(/x²/g, '(X*X)')
        .replace(/x/g, 'X')
        .replace(/−/g, '-')
        .replace(/·/g, '*')
        // "2x" y "2x²" se escriben sin punto porque así se leen; JavaScript
        // necesita el asterisco.
        .replace(/(\d)(?=[X(])/g, '$1*')
      // eslint-disable-next-line no-new-func
      const evaluada = new Function('X', `return ${expr}`)(GOAL_X)
      expect(evaluada, `${dif}: "${n.label}" no vale lo que fn(3)`).toBeCloseTo(n.fn(GOAL_X), 6)
    })
  })

  it('la etiqueta no deja restos de formato', () => {
    cada((n, dif) => {
      expect(n.label, dif).not.toMatch(/undefined|NaN|\+ -|--|\/1\b/)
      expect(n.label, dif).toMatch(/^f\(x\) = /)
    })
  })
})

describe('el reparto de zonas', () => {
  it('las cuatro salen con frecuencia parecida', () => {
    // Si una zona fuese rara, se acertaría descartando en vez de calculando.
    for (const dif of NIVELES) {
      const cuenta = { A: 0, B: 0, C: 0, D: 0 }
      const n = 2000
      for (let i = 0; i < n; i++) cuenta[zonaDe(generarNivel(dif).fn(GOAL_X))]++
      for (const z of ZONA_IDS) {
        expect(cuenta[z] / n, `${dif}: zona ${z} sale el ${(cuenta[z] / n * 100).toFixed(1)} %`)
          .toBeGreaterThan(0.15)
      }
    }
  })

  it('una tanda reparte las cuatro zonas antes de repetir', () => {
    for (const dif of NIVELES) {
      const tanda = generarTanda(dif, 4)
      const zonas = tanda.map(n => zonaDe(n.fn(GOAL_X)))
      expect(new Set(zonas).size, `${dif}: ${zonas.join(',')}`).toBe(4)
    }
  })

  it('el evitar se puede compartir entre tandas', () => {
    // Es lo que hace el examen: tres tandas seguidas que no pueden repetir
    // fórmula entre ellas. Una recta suave vale para fácil y para medio.
    const uno = generarTanda('facil', 3)
    const evitar = uno.map(t => t.id)
    const dos = generarTanda('medio', 3, { evitar })
    for (const t of dos) expect(evitar).not.toContain(t.id)
  })

  it('una tanda no repite el mismo tiro', () => {
    for (const dif of NIVELES) {
      const ids = generarTanda(dif, 10).map(n => n.id)
      expect(new Set(ids).size, dif).toBe(ids.length)
    }
  })
})

describe('hay tiros de sobra: es lo que motivó el cambio', () => {
  it('cada dificultad da muchas fórmulas distintas', () => {
    // Antes eran 12 por dificultad y una partida de 90 s las agotaba.
    for (const dif of NIVELES) {
      const vistos = new Set()
      for (let i = 0; i < 3000; i++) vistos.add(generarNivel(dif).id)
      expect(vistos.size, `${dif} solo da ${vistos.size} fórmulas`).toBeGreaterThan(30)
    }
  })

  it('difícil son parábolas y fácil y medio, rectas', () => {
    for (let i = 0; i < 200; i++) {
      expect(generarNivel('dificil').label).toContain('x²')
      expect(generarNivel('facil').label).not.toContain('x²')
      expect(generarNivel('medio').label).not.toContain('x²')
    }
  })

  it('en medio siempre hay término independiente', () => {
    // Con b = 0 basta mirar la pendiente, y eso ya es el nivel fácil.
    for (let i = 0; i < 400; i++) {
      const n = generarNivel('medio')
      expect(n.id.endsWith(':0'), `${n.label}`).toBe(false)
    }
  })

  it('evitar deja fuera los tiros que se le pasan', () => {
    const primero = generarNivel('facil')
    for (let i = 0; i < 200; i++) {
      expect(generarNivel('facil', { evitar: [primero.id] }).id).not.toBe(primero.id)
    }
  })
})
