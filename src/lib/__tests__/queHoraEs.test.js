import { describe, it, expect } from 'vitest'
import {
  genRonda, NIVELES, CIUDADES, ciudad, hhmm, momento, esLa, utc, husoDe, distancia,
  esCorrecta, relojInicial, respuesta, enunciado, explicacion, schemaQuestion,
} from '../queHoraEs'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('¿Qué Hora Es Allí?', () => {
  it('datos y cuentas', () => {
    // Hora estándar (invierno), fijada: si un país cambia de huso, tocar datos y test
    const fijo = { madrid: 1, canarias: 0, londres: 0, lisboa: 0, moscu: 3, pekin: 8, tokio: 9, sidney: 10, nuevaYork: -5, mexico: -6, losAngeles: -8, buenosAires: -3, honolulu: -10, auckland: 12 }
    for (const [id, h] of Object.entries(fijo)) expect(ciudad(id).utc, id).toBe(h)
    for (const c of CIUDADES) expect(Number.isInteger(c.utc), c.id).toBe(true)
    expect(new Set(CIUDADES.map(c => c.id)).size).toBe(CIUDADES.length)
    expect(hhmm(0)).toBe('00:00')
    expect(hhmm(-60)).toBe('23:00')
    expect(hhmm(1440 + 135)).toBe('02:15')
    expect(momento(-60, 0, 'es')).toBe('domingo 23:00')
    expect(momento(1500, 6, 'en')).toBe('Monday 01:00')
    expect(esLa(60, 0, 'es')).toBe('es la 01:00 del lunes')
    expect(esLa(600, 0, 'ca')).toBe('són les 10:00 de dilluns')
    expect(utc(-5)).toBe('UTC−5')
    expect(husoDe(-75)).toBe(-5)
    expect(husoDe(50)).toBe(3)
    expect(Math.round(distancia(ciudad('madrid'), ciudad('nuevaYork')))).toBeGreaterThan(5500)
  })

  it('ejemplos de libro', () => {
    // Madrid 10:00 lunes → Tokio 18:00 lunes; → Nueva York 04:00 lunes
    const r = { tipo: 'hora', a: 'madrid', b: 'tokio', t0: 600, dia: 0, bueno: 't:1080' }
    expect(esCorrecta(r, respuesta(600 + 8 * 60))).toBe(true)
    expect(explicacion(r, 'es')).toMatch(/8 h por delante/)
    expect(explicacion(r, 'es')).toContain('+9 − (+1) = +8 h')
    expect(explicacion({ tipo: 'hora', a: 'pekin', b: 'lisboa', t0: 600, dia: 0 }, 'en')).toContain('(0 − (+8) = −8 h)')
    expect(explicacion({ tipo: 'hora', a: 'atenas', b: 'tokio', t0: 600, dia: 0 }, 'ca')).toMatch(/d’Atenes/)
    // Madrid 23:00 → Tokio 07:00 del día siguiente
    const r2 = { tipo: 'hora', a: 'madrid', b: 'tokio', t0: 23 * 60, dia: 0 }
    expect(explicacion(r2, 'es')).toMatch(/07:00 del martes|martes 07:00/)
    expect(explicacion(r2, 'es')).toMatch(/día siguiente/)
    // Madrid–Londres: la nota del meridiano; Canarias: la de la hora menos
    expect(explicacion({ tipo: 'hora', a: 'madrid', b: 'londres', t0: 600, dia: 0 }, 'es')).toMatch(/Europa central/)
    expect(explicacion({ tipo: 'hora', a: 'tokio', b: 'pekin', t0: 600, dia: 0 }, 'es')).not.toMatch(/Europa central|Canarias/)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 600 rondas', () => {
      const rand = semilla(nivel.length * 313)
      const cuenta = {}
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        cuenta[r.tipo] = (cuenta[r.tipo] ?? 0) + 1
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'huso') {
          expect(Math.abs(r.k)).toBeGreaterThan(0)
          expect(Math.abs(r.k)).toBeLessThan(12)
        } else {
          const t = Number(r.bueno.slice(2))
          // La respuesta se alcanza desde el reloj inicial con pasos de 15 min
          // (60 si el nivel no tiene minutos)
          expect(Math.abs((t - relojInicial(r)) % (NIVELES[nivel].minutos ? 15 : 60))).toBe(0)
          if (!NIVELES[nivel].cambiaDia) { expect(t).toBeGreaterThanOrEqual(0); expect(t).toBeLessThan(1440) }
          if (r.tipo !== 'meridiano') expect(ciudad(r.a).utc).not.toBe(ciudad(r.b).utc)
          if (r.tipo === 'meridiano') {
            // nunca en el borde entre dos husos
            const resto = Math.abs(r.lon / 15 - Math.round(r.lon / 15)) * 15
            expect(resto).toBeLessThan(6)
          }
        }
        if (nivel === 'facil' && r.a) expect(ciudad(r.a).facil && ciudad(r.b).facil).toBe(true)
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN|null/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN|null|\b1 (husos|zones|fusos)|[+−]\d+ (husos|zones|fusos)/)
          const q = schemaQuestion(r, l)
          expect(q.question).not.toMatch(/undefined|NaN/)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(new Set(q.wrongAnswers).size).toBe(q.wrongAnswers.length)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
        if (l_en(r)) expect(enunciado(r, 'en')).not.toMatch(/ O\b|°O/)
      }
      const tipos = NIVELES[nivel].tipos
      for (const t of new Set(tipos)) expect(cuenta[t] / 600, t).toBeGreaterThan(0.6 * tipos.filter(x => x === t).length / tipos.length)
    })
  }
})

// En inglés el oeste es W, no O
const l_en = r => r.tipo === 'meridiano'
