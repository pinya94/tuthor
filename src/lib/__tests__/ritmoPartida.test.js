import { describe, it, expect } from 'vitest'
import { PERFILES, RelojPartida, bonusAcierto, duracionMaxima, simularPartida } from '../ritmoPartida'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }

describe('ritmo de partida', () => {
  it('perfiles coherentes', () => {
    for (const [id, p] of Object.entries(PERFILES)) {
      expect(p.base, id).toBeGreaterThan(0)
      expect(p.bonusMax, id).toBeGreaterThanOrEqual(0)
      expect(p.porFallo, id).toBeGreaterThan(0)
      expect(p.revelarOkMs, id).toBeLessThanOrEqual(1500) // confirmación breve, no una espera
    }
  })

  it('el bonus por acierto tiene tope por partida', () => {
    expect(bonusAcierto('construccion', 4, 0)).toBe(4)
    expect(bonusAcierto('construccion', 4, 28)).toBe(2)
    expect(bonusAcierto('construccion', 4, 30)).toBe(0)
    expect(bonusAcierto('rapido', 1, 0)).toBe(1)
    const r = new RelojPartida('construccion').empezar(0)
    let t = 0, total = 0
    for (let i = 0; i < 50; i++) { t += 100; total += r.acierto(t, 4); r.seguir(t) }
    expect(total).toBe(PERFILES.construccion.bonusMax)
  })

  it('las partidas se acaban siempre, por rápido que juegues', () => {
    for (const id of Object.keys(PERFILES)) {
      for (const segPorRonda of [0.2, 0.5, 1, 2, 4, 8]) {
        for (const pAcierto of [0, 0.5, 0.8, 1]) {
          const res = simularPartida(id, { segPorRonda, acciones: 4, pAcierto, rand: semilla(7 + segPorRonda * 10) })
          expect(res.termino, `${id} ${segPorRonda}s ${pAcierto}`).toBe(true)
          expect(res.jugado).toBeLessThanOrEqual(duracionMaxima(id) + 1e-9)
        }
      }
    }
  })

  it('el tiempo jugado no cuenta las pausas de lectura', () => {
    const r = new RelojPartida('construccion').empezar(0)
    r.fallo(10_000)          // 10 s jugados, −5 s
    r.seguir(70_000)         // 60 s leyendo: no cuentan
    expect(r.jugado(75_000)).toBeCloseTo(15)
    expect(r.restante(75_000)).toBeCloseTo(60 - 10 - 5 - 5)
    r.acierto(80_000, 3)     // +3 s, confirmación
    r.seguir(81_100)
    expect(r.jugado(81_100)).toBeCloseTo(20)
    r.terminar(90_000)
    expect(r.jugado(999_999)).toBeCloseTo(28.9)
    expect(r.estado).toBe('fin')
  })

  it('un fallo que deja el reloj a 0 acaba la partida al seguir', () => {
    const r = new RelojPartida('rapido').empezar(0)
    r.fallo(42_000) // quedaban 3 s, el fallo quita 5
    expect(r.restante(42_000)).toBe(0)
    r.seguir(50_000)
    expect(r.estado).toBe('fin')
    expect(r.jugado(60_000)).toBeCloseTo(42)
  })

  it('el reloj se agota solo mientras corre', () => {
    const r = new RelojPartida('rapido').empezar(0)
    expect(r.agotado(44_999)).toBe(false)
    expect(r.agotado(45_000)).toBe(true)
    r.terminar(50_000)
    expect(r.jugado(50_000)).toBeCloseTo(45)
  })
})
