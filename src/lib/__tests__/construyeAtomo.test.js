import { describe, it, expect } from 'vitest'
import {
  genRonda, NIVELES, A_COMUN, ISOTOPOS, IONES, SUBNIVELES, configDe, porCapa, textoConfig, notacion,
  posicion, el, esCorrecta, respuestaAtomo, respuestaConfig, enunciado, explicacion, pistaFallo, schemaQuestion, Z_MAX,
} from '../construyeAtomo'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const LANGS = ['es', 'en', 'ca']

describe('Construye el Átomo', () => {
  it('datos', () => {
    for (let z = 1; z <= Z_MAX; z++) {
      expect(el(z), `Z=${z}`).toBeTruthy()
      expect(A_COMUN[z]).toBeGreaterThanOrEqual(z)
    }
    for (const [z, a] of ISOTOPOS) expect(a, `${z}-${a}`).toBeGreaterThanOrEqual(z)
    for (const [z, q] of IONES) expect(z - q, `${z}${q}`).toBeGreaterThanOrEqual(0)
    expect(SUBNIVELES.reduce((t, x) => t + x.cap, 0)).toBe(36)
  })

  it('configuraciones de libro', () => {
    expect(textoConfig(configDe(11))).toBe('1s² 2s² 2p⁶ 3s¹')
    expect(textoConfig(configDe(26))).toBe('1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶')
    expect(textoConfig(configDe(35))).toBe('1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁵')
    expect(porCapa(26)).toEqual([2, 8, 14, 2])
    expect(porCapa(19)).toEqual([2, 8, 8, 1])
    expect(porCapa(0)).toEqual([])
    expect(notacion(17, 35, -1)).toBe('³⁵₁₇Cl⁻')
    expect(notacion(12, 24, 2)).toBe('²⁴₁₂Mg²⁺')
  })

  it('la posición sale de la configuración y coincide con la tabla', () => {
    for (let z = 1; z <= Z_MAX; z++) {
      const p = posicion(z)
      expect(p.periodo, `Z=${z}`).toBe(el(z).periodo)
      expect(p.grupo, `Z=${z}`).toBe(el(z).grupo)
    }
    expect(posicion(16).valencia).toBe(6)
  })

  it('rondas coherentes en todos los niveles', () => {
    const rand = semilla(7)
    for (const nivel of Object.keys(NIVELES)) {
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand })
        expect(NIVELES[nivel].tipos).toContain(r.tipo)
        expect(r.z).toBeLessThanOrEqual(NIVELES[nivel].zMax)
        if (['atomo', 'notacion', 'isotopo', 'ion'].includes(r.tipo)) {
          expect(esCorrecta(r, respuestaAtomo(r.z, r.a - r.z, r.z - r.q))).toBe(true)
          // cambiar los protones nunca es la buena
          expect(esCorrecta(r, respuestaAtomo(r.q ? r.z - r.q : r.z + 1, r.a - r.z, r.z))).toBe(false)
          if (r.tipo === 'isotopo') expect(ISOTOPOS.some(([z, a]) => z === r.z && a === r.a)).toBe(true)
        }
        if (r.tipo === 'config') {
          expect([24, 29]).not.toContain(r.z)
          expect(esCorrecta(r, respuestaConfig(configDe(r.z - r.q)))).toBe(true)
          if (r.q) expect(r.z).toBeLessThanOrEqual(20)
        }
        if (r.tipo === 'tabla') expect(esCorrecta(r, `z:${r.z}`)).toBe(true)
        for (const l of LANGS) {
          const txt = enunciado(r, l) + explicacion(r, l)
          expect(txt, `${r.tipo} ${r.z} ${l}`).not.toMatch(/undefined|NaN|null/)
          const sq = schemaQuestion(r, l)
          expect(sq.wrongAnswers.length, `${r.tipo} ${r.z}`).toBe(3)
          expect(sq.wrongAnswers).not.toContain(sq.correctAnswer)
          expect(new Set(sq.wrongAnswers).size).toBe(3)
        }
      }
    }
  })

  it('las pistas cazan las trampas típicas', () => {
    const cl = { tipo: 'ion', z: 17, a: 35, q: -1, bueno: 'p17n18e18' }
    expect(pistaFallo(cl, 'p17n35e18', 'es')).toMatch(/A − Z/)
    expect(pistaFallo(cl, 'p17n18e16', 'es')).toMatch(/Al revés/)
    expect(pistaFallo(cl, 'p18n18e17', 'es')).toMatch(/protones/)
    const fe = { tipo: 'config', z: 26, q: 0, bueno: respuestaConfig(configDe(26)) }
    expect(pistaFallo(fe, 'c:2,2,6,2,6,0,8,0', 'es')).toMatch(/4s/)
    expect(pistaFallo(fe, 'c:2,2,6,2,6,2,5,0', 'es')).toMatch(/25 electrones/)
    expect(explicacion({ tipo: 'notacion', z: 1, a: 2, q: 0 }, 'es')).toMatch(/deuterio/)
    expect(explicacion({ tipo: 'config', z: 11, q: 1 }, 'es')).toMatch(/neón/)
    expect(explicacion({ tipo: 'atomo', z: 8, a: 16, q: 0 }, 'ca')).not.toMatch(/de o/)
  })
})
