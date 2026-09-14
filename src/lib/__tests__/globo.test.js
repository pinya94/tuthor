// El globo terráqueo: que cada país del mapa lleve la ficha que le toca, y que
// el Sol esté donde está.
//
// La unión mapa ↔ ficha depende de una tabla de códigos ISO copiada a mano
// (data/isoNumerico.js). Un código cambiado no da error: pinta la ficha de un
// país sobre otro. Por eso se comprueba con geografía: la capital de cada país
// con coordenadas tiene que caer dentro (o al lado, en capitales costeras que la
// resolución 1:110 millones deja en el mar) del polígono que se le asigna.
import { describe, it, expect } from 'vitest'
import { geoContains } from 'd3-geo'
import {
  PAISES_GLOBO, paisEn, buscarPaises, puntoSubsolar, zonaNoche, coordTexto, nombrePais, INCLINACION_EJE,
} from '../globo'
import { PAISES } from '../../data/paises'
import { PAISES_COORDS } from '../../data/coordenadasPaises'

const globoDe = iso => PAISES_GLOBO.find(g => g.pais?.iso === iso)

describe('mapa y fichas', () => {
  it('los países grandes están todos, y solo faltan microestados que el mapa no dibuja', () => {
    const faltan = PAISES.filter(p => !globoDe(p.iso)).map(p => p.iso)
    for (const iso of ['ESP', 'FRA', 'BRA', 'USA', 'CHN', 'IND', 'AUS', 'ZAF', 'EGY', 'MEX', 'JPN', 'ARG', 'RUS', 'CAN']) {
      expect(faltan, iso).not.toContain(iso)
    }
    expect(faltan.length, `faltan: ${faltan.join(' ')}`).toBeLessThanOrEqual(12)
  })

  it('cada capital con coordenadas cae en el país que le asigna la tabla ISO', () => {
    const cerca = (f, lon, lat) => [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
      .some(([dx, dy]) => geoContains(f, [lon + dx, lat + dy]))
    const mal = PAISES_COORDS.filter(p => {
      const g = globoDe(p.iso)
      return g && !cerca(g.feature, p.lon, p.lat)
    }).map(p => p.iso)
    expect(mal).toEqual([])
  })

  it('un punto en tierra da su país, y uno en el mar, ninguno', () => {
    expect(paisEn(-3.7, 40.4)?.pais?.iso).toBe('ESP')
    expect(paisEn(139.7, 35.7)?.pais?.iso).toBe('JPN')
    expect(paisEn(-30, 0)).toBeNull() // Atlántico
  })

  it('los centros de los países están donde deben', () => {
    const [lon, lat] = globoDe('ESP').centro
    expect(lat).toBeGreaterThan(36)
    expect(lat).toBeLessThan(44)
    expect(lon).toBeGreaterThan(-9)
    expect(lon).toBeLessThan(3)
  })

  it('se busca sin tildes y en castellano o en inglés', () => {
    expect(nombrePais(buscarPaises('espa')[0])).toBe('España')
    expect(nombrePais(buscarPaises('japon')[0])).toBe('Japón')
    expect(nombrePais(buscarPaises('germany')[0])).toBe('Alemania')
    expect(buscarPaises('')).toEqual([])
  })
})

describe('el Sol', () => {
  it('en los solsticios está sobre los trópicos, y en el equinoccio sobre el ecuador', () => {
    expect(puntoSubsolar(new Date('2025-06-21T02:42:00Z')).lat).toBeCloseTo(INCLINACION_EJE, 1)
    expect(puntoSubsolar(new Date('2024-12-21T09:20:00Z')).lat).toBeCloseTo(-INCLINACION_EJE, 1)
    expect(Math.abs(puntoSubsolar(new Date('2025-03-20T09:01:00Z')).lat)).toBeLessThan(0.05)
  })

  it('a mediodía UTC está sobre Greenwich, con la ecuación del tiempo de margen', () => {
    // El Sol se adelanta o se retrasa hasta ~16 minutos a lo largo del año: 4°.
    for (const dia of ['2025-02-11', '2025-05-14', '2025-07-26', '2025-11-03']) {
      expect(Math.abs(puntoSubsolar(new Date(`${dia}T12:00:00Z`)).lon), dia).toBeLessThan(4.5)
    }
    // Seis horas después, 90° más al oeste
    expect(puntoSubsolar(new Date('2025-03-20T18:00:00Z')).lon).toBeGreaterThan(-95)
    expect(puntoSubsolar(new Date('2025-03-20T18:00:00Z')).lon).toBeLessThan(-85)
  })

  it('la noche es la mitad opuesta al Sol', () => {
    const fecha = new Date('2025-09-14T15:00:00Z')
    const s = puntoSubsolar(fecha)
    const noche = zonaNoche(fecha)
    expect(geoContains(noche, [s.lon, s.lat])).toBe(false)
    expect(geoContains(noche, [s.lon + 180, -s.lat])).toBe(true)
  })
})

describe('coordenadas', () => {
  it('con N/S y E/O en castellano, W en inglés', () => {
    expect(coordTexto(40.4, -3.7, 'es')).toBe('40,4° N · 3,7° O')
    expect(coordTexto(40.4, -3.7, 'en')).toBe('40.4° N · 3.7° W')
    expect(coordTexto(-33.9, 151.2, 'ca')).toBe('33,9° S · 151,2° E')
  })
})
