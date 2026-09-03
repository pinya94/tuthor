// Invariantes del plano de pupitres. Lo que vigilan de verdad: que nunca se
// pueda dibujar un aula imposible —dos alumnos en la misma mesa, alguien
// sentado fuera de la cuadrícula, un alumno que ya no está en la clase— porque
// eso el profesor lo ve proyectado delante de treinta personas.
import { describe, it, expect } from 'vitest'
import {
  PLANO_VACIO, MAX_FILAS, MAX_COLUMNAS,
  normalizar, mesas, sinSitio, sentar, levantar, vaciar, sortear, redimensionar, alAzar,
} from '../seating'

const ALUMNOS = ['a', 'b', 'c', 'd']
const plano = (spots, rows = 2, cols = 3) => normalizar({ rows, cols, spots }, ALUMNOS)

describe('normalizar', () => {
  it('tira a quien ya no está en la clase', () => {
    expect(plano({ a: 0, fantasma: 1 }).spots).toEqual({ a: 0 })
  })

  it('tira los sitios que caen fuera de la cuadrícula', () => {
    // 2×3 son 6 mesas: el índice 6 ya no existe.
    expect(plano({ a: 6, b: 5 }).spots).toEqual({ b: 5 })
  })

  it('no deja dos alumnos en la misma mesa', () => {
    const spots = plano({ a: 2, b: 2 }).spots
    expect(Object.values(spots)).toEqual([2])
  })

  it('acota el tamaño del aula', () => {
    const grande = normalizar({ rows: 99, cols: 99, spots: {} }, [])
    expect(grande.rows).toBe(MAX_FILAS)
    expect(grande.cols).toBe(MAX_COLUMNAS)
    const cero = normalizar({ rows: 0, cols: -3, spots: {} }, [])
    expect(cero.rows).toBe(1)
    expect(cero.cols).toBe(1)
  })

  it('un plano ausente es el plano vacío', () => {
    expect(normalizar(undefined, ALUMNOS)).toEqual(PLANO_VACIO)
  })
})

describe('mesas', () => {
  it('devuelve una entrada por mesa, en orden de lectura', () => {
    const m = mesas(plano({ a: 4 }))
    expect(m).toHaveLength(6)
    expect(m[4]).toEqual({ index: 4, fila: 1, columna: 1, uid: 'a' })
    expect(m[0].uid).toBe(null)
  })
})

describe('sentar', () => {
  it('sienta a quien no tenía sitio', () => {
    expect(sentar(plano({}), 'a', 3).spots).toEqual({ a: 3 })
  })

  it('levanta al que estaba si quien llega venía de fuera del plano', () => {
    expect(sentar(plano({ a: 3 }), 'b', 3).spots).toEqual({ b: 3 })
  })

  it('intercambia si los dos ya tenían sitio', () => {
    expect(sentar(plano({ a: 3, b: 1 }), 'b', 3).spots).toEqual({ a: 1, b: 3 })
  })

  it('sentar a alguien en su propia mesa no lo levanta', () => {
    expect(sentar(plano({ a: 3 }), 'a', 3).spots).toEqual({ a: 3 })
  })

  it('no muta el plano que recibe', () => {
    const antes = plano({ a: 0 })
    sentar(antes, 'b', 1)
    expect(antes.spots).toEqual({ a: 0 })
  })
})

describe('levantar y vaciar', () => {
  it('levantar deja al alumno sin sitio', () => {
    const p = levantar(plano({ a: 0, b: 1 }), 'a')
    expect(p.spots).toEqual({ b: 1 })
    expect(sinSitio(p, ALUMNOS)).toContain('a')
  })

  it('vaciar conserva el tamaño del aula', () => {
    const p = vaciar(plano({ a: 0 }))
    expect(p.spots).toEqual({})
    expect([p.rows, p.cols]).toEqual([2, 3])
  })
})

describe('sortear', () => {
  it('sienta a todos y a cada uno en una mesa distinta', () => {
    const p = sortear(plano({}), ALUMNOS)
    expect(Object.keys(p.spots).sort()).toEqual([...ALUMNOS].sort())
    expect(new Set(Object.values(p.spots)).size).toBe(ALUMNOS.length)
  })

  it('si hay más alumnos que mesas, los que sobran se quedan sin sitio', () => {
    const muchos = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    const p = sortear(normalizar({ rows: 2, cols: 3, spots: {} }, muchos), muchos)
    expect(Object.keys(p.spots)).toHaveLength(6)
    expect(sinSitio(p, muchos)).toHaveLength(1)
  })

  it('reparte de cero: nadie conserva su sitio por haberlo tenido antes', () => {
    // Con rand fijo el reparto es determinista, así que la comprobación mira
    // que el resultado dependa del sorteo y no del plano previo.
    const rand = () => 0
    expect(sortear(plano({ a: 5 }), ALUMNOS, rand).spots)
      .toEqual(sortear(plano({}), ALUMNOS, rand).spots)
  })
})

describe('redimensionar', () => {
  it('conserva lo que cabe y suelta lo que no', () => {
    const p = redimensionar(plano({ a: 0, b: 5 }), 2, 2)
    expect(p.spots).toEqual({ a: 0 })
    expect([p.rows, p.cols]).toEqual([2, 2])
  })
})

describe('alAzar', () => {
  it('sin alumnos no devuelve a nadie', () => {
    expect(alAzar([])).toBe(null)
  })

  it('no repite a los últimos elegidos mientras queden otros', () => {
    for (let i = 0; i < 50; i++) {
      expect(alAzar(ALUMNOS, { evitar: ['a', 'b', 'c'] })).toBe('d')
    }
  })

  it('cuando ya han salido todos vuelve a empezar en vez de no devolver nada', () => {
    expect(ALUMNOS).toContain(alAzar(ALUMNOS, { evitar: ALUMNOS }))
  })
})
