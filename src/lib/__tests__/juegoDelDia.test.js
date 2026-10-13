// El juego del día: sale del catálogo entero, respeta el idioma y recorre
// todos los juegos antes de repetir ninguno.
import { describe, it, expect } from 'vitest'
import { juegoDelDia, juegosDelDiaPosibles, pasoPara, numeroDeDia } from '../juegoDelDia.js'
import { GAMES as CATALOGO } from '../../data/constants.js'
import { disponibleEn } from '../games.js'

const diaN = n => new Date(2026, 0, 1 + n) // días locales consecutivos

describe('el juego del día', () => {
  it('puede salir cualquier juego publicado del catálogo, no una lista aparte', () => {
    const publicados = CATALOGO.filter(g => g.ready && g.path?.startsWith('/juegos/'))
    expect(juegosDelDiaPosibles('es')).toHaveLength(publicados.length)
  })

  for (const lang of ['es', 'en', 'ca']) {
    it(`en ${lang}: N días seguidos = los N juegos, sin repetir`, () => {
      const n = juegosDelDiaPosibles(lang).length
      const vistos = new Set()
      for (let d = 0; d < n; d++) vistos.add(juegoDelDia(lang, diaN(d)).slug)
      expect(vistos.size).toBe(n)
    })

    it(`en ${lang}: nunca propone un juego que no existe en ese idioma`, () => {
      for (let d = 0; d < 400; d++) {
        expect(disponibleEn(juegoDelDia(lang, diaN(d)).slug, lang)).toBe(true)
      }
    })
  }

  it('dos días seguidos no dan el mismo juego', () => {
    for (let d = 0; d < 200; d++) {
      expect(juegoDelDia('es', diaN(d)).slug).not.toBe(juegoDelDia('es', diaN(d + 1)).slug)
    }
  })

  it('cambia a medianoche local, no a la UTC', () => {
    expect(numeroDeDia(new Date(2026, 5, 10, 0, 30))).toBe(numeroDeDia(new Date(2026, 5, 10, 23, 30)))
    expect(numeroDeDia(new Date(2026, 5, 11, 0, 30))).toBe(numeroDeDia(new Date(2026, 5, 10, 12)) + 1)
  })

  it('el paso es coprimo con el número de juegos', () => {
    const mcd = (a, b) => (b ? mcd(b, a % b) : a)
    for (let n = 1; n < 300; n++) expect(mcd(pasoPara(n), n)).toBe(1)
  })
})
