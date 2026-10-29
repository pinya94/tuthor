import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, CONCEPTOS, ESCENAS, LADOS, FUERZAS, G, enunciado, explicacion, textoRespuesta, schemaQuestion, esCorrecta, diagramaBueno, rango } from '../newtonAccion'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const BANEADOS = /[\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F9CA}]/u
const rad = d => (d * Math.PI) / 180

// La respuesta, calculada aquí por separado
function correcta(r) {
  switch (r.tipo) {
    case 'segunda': return { a: r.F / r.m, F: r.m * r.a, m: r.F / r.a }[r.despeje]
    case 'peso': return r.caso === 'tierra' ? r.m * G : r.caso === 'luna' ? Math.round(r.m * 1.6) : r.m
    case 'rozamiento': return r.quieta ? 0 : r.mu * r.m * G + r.m * r.aObjetivo // la fuerza que hay que hacer
    case 'constante': return r.mu * r.m * G
    case 'reaccion': return r.F
    case 'plano': return r.pide === 'a' ? Math.round(G * Math.sin(rad(r.ang)) * 10) : Math.round(r.m * G * Math.cos(rad(r.ang)) * 10)
    case 'ascensor': return r.m * (G + ({ subeAcelera: 1, bajaAcelera: -1, subeFrena: -1, constante: 0 }[r.caso]) * r.a)
    default: return null
  }
}
// Cómo la daría el alumno con la mecánica de la ronda
const respuesta = r => r.mecanica === 'diagrama' ? diagramaBueno(r)
  : r.mecanica === 'teclea' ? String(r.tipo === 'plano' ? r.bueno / 10 : r.bueno).replace('.', ',')
  : r.bueno

describe('Newton en Acción', () => {
  it('escenas y conceptos completos y sin emojis prohibidos', () => {
    for (const c of [...CONCEPTOS, ...ESCENAS]) expect(c.emoji).not.toMatch(BANEADOS)
    for (const e of ESCENAS) for (const [lado, f] of Object.entries(e.fuerzas)) {
      expect(LADOS).toContain(lado)
      expect(FUERZAS).toContain(f)
    }
  })

  it('el diagrama: lo que se pide y las trampas típicas', () => {
    const r = id => ({ tipo: 'diagrama', escena: id, mecanica: 'diagrama' })
    // la pelota que sube: solo el peso; la «fuerza del lanzamiento» hacia arriba está mal
    expect(esCorrecta(r('lanzada'), { abajo: 'P' })).toBe(true)
    expect(esCorrecta(r('lanzada'), { abajo: 'P', arriba: 'F' })).toBe(false)
    // la caja que frena sola: ninguna fuerza hacia delante
    expect(esCorrecta(r('frena'), { arriba: 'N', abajo: 'P', izq: 'Fr' })).toBe(true)
    expect(esCorrecta(r('frena'), { arriba: 'N', abajo: 'P', izq: 'Fr', der: 'F' })).toBe(false)
    // la nave sin motores: ninguna fuerza
    expect(esCorrecta(r('nave'), {})).toBe(true)
    // tirar de una cuerda: vale llamarla T o F
    expect(esCorrecta(r('tira'), { arriba: 'N', abajo: 'P', izq: 'F', der: 'Fr' })).toBe(true)
    // la lámpara colgada no tiene normal
    expect(esCorrecta(r('colgada'), { arriba: 'N', abajo: 'P' })).toBe(false)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas bien calculadas, corregibles y que viajan en JSON`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 5501)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.mecanica, JSON.stringify(r)).toMatch(/^(teclea|empuja|bascula|diagrama)$/)
        if (r.tipo !== 'diagrama') expect(Math.abs(correcta(r) - r.bueno), JSON.stringify(r)).toBeLessThan(1e-9)
        // la respuesta buena se acepta y una vecina no
        expect(esCorrecta(r, respuesta(r)), JSON.stringify(r)).toBe(true)
        if (r.mecanica === 'teclea') expect(esCorrecta(r, String((r.tipo === 'plano' ? r.bueno / 10 : r.bueno) + 1))).toBe(false)
        if (r.mecanica === 'empuja' || r.mecanica === 'bascula') {
          const { max, paso } = rango(r)
          expect(r.bueno).toBeLessThanOrEqual(max)
          expect(r.bueno % paso).toBe(0)
          expect(esCorrecta(r, r.bueno + paso)).toBe(false)
        }
        // en un reto la ronda viaja como JSON
        expect(JSON.parse(JSON.stringify(r))).toEqual(r)
        for (const l of ['es', 'en', 'ca']) {
          for (const t of [enunciado(r, l), explicacion(r, l), textoRespuesta(r, l)]) expect(t).not.toMatch(/undefined|NaN|\[object/)
          const q = schemaQuestion(r, l)
          expect(q.question && q.correctAnswer).toBeTruthy()
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
