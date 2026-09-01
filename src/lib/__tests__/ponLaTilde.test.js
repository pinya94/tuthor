// Invariantes de Pon la Tilde. Lo que de verdad vigilan: que cada palabra
// cumpla la regla de acentuación que el propio juego enseña. Una palabra mal
// clasificada no rompe nada visible — el juego funciona igual — pero le enseña
// al alumno lo contrario de lo que dice la explicación que sale debajo.
import { it, expect } from 'vitest'
import { PALABRAS } from '../../data/palabrasTilde'
import { tipoDe, llevaTilde, tildeSegunRegla, genRound } from '../ponLaTilde'

// Quita las tildes para comparar la forma escrita con la forma sin acentuar.
const sinTildes = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')

it('los datos de cada palabra son coherentes', () => {
  const vistas = new Set()
  for (const p of PALABRAS) {
    expect(vistas.has(p.palabra), `palabra repetida: ${p.palabra}`).toBe(false)
    vistas.add(p.palabra)

    // La forma sin tilde tiene que ser exactamente la escrita sin acentos: si
    // no, el jugador vería una palabra y se le corregiría con otra distinta.
    expect(sinTildes(p.escrita), `${p.palabra}: no cuadra con "${p.escrita}"`).toBe(p.palabra)

    // Las sílabas, juntas, tienen que dar la palabra.
    expect(p.silabas.join(''), `${p.palabra}: las sílabas no reconstruyen la palabra`).toBe(p.palabra)

    expect(p.tonica, `${p.palabra}: tónica fuera de rango`).toBeGreaterThanOrEqual(0)
    expect(p.tonica, `${p.palabra}: tónica fuera de rango`).toBeLessThan(p.silabas.length)
    expect(p.silabas.length, `${p.palabra}: hace falta más de una sílaba`).toBeGreaterThan(1)
  }
})

it('cada palabra cumple la regla general, salvo los hiatos marcados', () => {
  for (const p of PALABRAS) {
    if (p.hiato) {
      // Un hiato que además cumpliera la regla general no sería una excepción:
      // estaría marcado sin motivo y confundiría al explicarlo.
      expect(llevaTilde(p), `${p.palabra}: marcada como hiato pero sin tilde`).toBe(true)
      continue
    }
    expect(
      tildeSegunRegla(p.palabra, p.silabas, p.tonica),
      `${p.palabra} (${tipoDe(p.silabas, p.tonica)}): la regla y la forma escrita "${p.escrita}" no coinciden`,
    ).toBe(llevaTilde(p))
  }
})

it('hay palabras de los cuatro tipos y de los dos resultados', () => {
  const tipos = new Set(PALABRAS.map(p => tipoDe(p.silabas, p.tonica)))
  expect([...tipos].sort()).toEqual(['aguda', 'esdrujula', 'llana', 'sobresdrujula'])
  expect(PALABRAS.filter(llevaTilde).length, 'pocas con tilde').toBeGreaterThan(20)
  expect(PALABRAS.filter(p => !llevaTilde(p)).length, 'pocas sin tilde').toBeGreaterThan(15)
})

it('genRound devuelve rondas jugables', () => {
  for (let i = 0; i < 300; i++) {
    const r = genRound()
    expect(r.silabas.length).toBeGreaterThan(1)
    expect(r.tipo).toBeTruthy()
    expect(typeof r.lleva).toBe('boolean')
  }
})
