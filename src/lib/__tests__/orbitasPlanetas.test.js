// Las posiciones del recurso de sistema solar, comprobadas contra el cielo.
//
// Los elementos orbitales se copiaron de las tablas del JPL, y un dígito mal
// copiado no se ve en la pantalla: el planeta sale igual de redondo, solo que en
// otro sitio. Por eso cada planeta se comprueba con un evento que ya ocurrió:
//   · OPOSICIÓN (planeta exterior): la Tierra pasa entre el Sol y el planeta,
//     así que sus longitudes heliocéntricas coinciden.
//   · CONJUNCIÓN INFERIOR (Venus): Venus pasa entre el Sol y la Tierra, y
//     también coinciden.
//   · EQUINOCCIO DE MARZO: desde la Tierra el Sol está en longitud 0°, así que
//     la Tierra, vista desde el Sol, está en 180°.
// Tolerancia de 2°: las fechas son de un día y los elementos, aproximados.
import { describe, it, expect } from 'vitest'
import {
  IDS, posicion, longitud, distanciaAlSol, resolverKepler, proyectar, factorDistancia, apsides,
  ORBITAS, FISICOS,
} from '../orbitasPlanetas'

const fecha = iso => new Date(`${iso}T12:00:00Z`)
const difAngulo = (a, b) => Math.abs(((a - b + 540) % 360) - 180)
const lon = (id, iso) => longitud(posicion(id, fecha(iso)))

describe('posiciones contra eventos con fecha', () => {
  it('equinoccio de marzo de 2024: la Tierra está a 180° vista desde el Sol', () => {
    const l = longitud(posicion('tierra', new Date('2024-03-20T03:06:00Z')))
    expect(difAngulo(l, 180)).toBeLessThan(1)
  })

  const OPOSICIONES = [
    ['marte', '2025-01-16'],
    ['jupiter', '2023-11-03'],
    ['saturno', '2024-09-08'],
    ['urano', '2024-11-17'],
    ['neptuno', '2024-09-21'],
  ]
  for (const [id, dia] of OPOSICIONES) {
    it(`oposición de ${id} el ${dia}: alineado con la Tierra`, () => {
      expect(difAngulo(lon(id, dia), lon('tierra', dia))).toBeLessThan(2)
    })
  }

  it('conjunción inferior de Venus el 2025-03-23: alineada con la Tierra', () => {
    expect(difAngulo(lon('venus', '2025-03-23'), lon('tierra', '2025-03-23'))).toBeLessThan(2)
  })

  it('la Tierra está más cerca del Sol en enero que en julio', () => {
    // Perihelio a primeros de enero (≈ 0,983 UA) y afelio a primeros de julio (≈ 1,017 UA)
    expect(distanciaAlSol(posicion('tierra', fecha('2025-01-04')))).toBeLessThan(0.9845)
    expect(distanciaAlSol(posicion('tierra', fecha('2025-07-03')))).toBeGreaterThan(1.0155)
  })
})

describe('coherencia de los datos', () => {
  it('el periodo de cada planeta cuadra con su velocidad orbital', () => {
    // Si Lr (grados por siglo) y el periodo (días) vienen de fuentes distintas y
    // uno está mal copiado, aquí no casan.
    for (const id of IDS) {
      const periodoDeLr = (360 * 36525) / ORBITAS[id].Lr
      expect(Math.abs(periodoDeLr - FISICOS[id].periodo) / FISICOS[id].periodo, id).toBeLessThan(0.01)
    }
  })

  it('cada planeta está a la distancia de su órbita', () => {
    for (const id of IDS) {
      const r = distanciaAlSol(posicion(id, fecha('2026-01-01')))
      const { a, e } = ORBITAS[id]
      expect(r, id).toBeGreaterThanOrEqual(a * (1 - e) - 1e-9)
      expect(r, id).toBeLessThanOrEqual(a * (1 + e) + 1e-9)
    }
  })

  it('perihelio y afelio: a sus distancias, en lados opuestos, y la Tierra pasa por el suyo en enero', () => {
    for (const id of IDS) {
      const { perihelio, afelio, q, Q } = apsides(id)
      expect(distanciaAlSol(perihelio), id).toBeCloseTo(q, 9)
      expect(distanciaAlSol(afelio), id).toBeCloseTo(Q, 9)
      expect(difAngulo(longitud(perihelio), longitud(afelio)), id).toBeCloseTo(180, 0)
    }
    // Perihelio de la Tierra: 4 de enero de 2025
    const tierra = posicion('tierra', fecha('2025-01-04'))
    expect(difAngulo(longitud(tierra), longitud(apsides('tierra').perihelio))).toBeLessThan(2)
  })

  it('están en orden desde el Sol, y hay datos de los ocho', () => {
    expect(IDS).toEqual(['mercurio', 'venus', 'tierra', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno'])
    const as = IDS.map(id => ORBITAS[id].a)
    expect([...as].sort((x, y) => x - y)).toEqual(as)
    for (const id of IDS) expect(FISICOS[id], id).toBeTruthy()
  })
})

describe('matemáticas del dibujo', () => {
  it('Kepler: la solución cumple la ecuación', () => {
    for (const e of [0, 0.0167, 0.2056]) {
      for (const M of [0.1, 1, 2.5, -2]) {
        const E = resolverKepler(M, e)
        expect(E - e * Math.sin(E)).toBeCloseTo(M, 10)
      }
    }
  })

  it('desde arriba se ve el plano de las órbitas de frente', () => {
    const p = { x: 0.5, y: 0.3, z: 0 }
    const arriba = proyectar(p, { az: 0, el: 90 })
    expect(arriba.sx).toBeCloseTo(0.5 * arriba.escala, 10)
    expect(arriba.sy).toBeCloseTo(0.3 * arriba.escala, 10)
    // De canto, todo el plano queda en una línea (sy = 0).
    expect(proyectar(p, { az: 0, el: 0 }).sy).toBeCloseTo(0, 10)
  })

  it('comprimido, las distancias siguen en orden y Neptuno sigue en el borde', () => {
    const d = IDS.map(id => ORBITAS[id].a * factorDistancia(id, 'comprimida'))
    expect([...d].sort((x, y) => x - y)).toEqual(d)
    expect(d.at(-1)).toBeCloseTo(1, 10)
    expect(ORBITAS.neptuno.a * factorDistancia('neptuno', 'real')).toBeCloseTo(1, 10)
  })
})
