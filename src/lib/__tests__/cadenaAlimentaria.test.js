// Invariantes de Cadena Alimentaria. El bug real que motivó este test: la
// cadena 'manzanal' referenciaba el id 'oruga' en sus eslabones sin que
// existiera ningún organismo con ese id en ORGANISMOS — nada más en la
// suite lo detectaba, así que ORGANISMOS_POR_ID['oruga'] habría sido
// undefined y el juego habría roto (ficha sin emoji/nombre) la primera vez
// que le tocara a un jugador esa cadena en concreto.
import { describe, it, expect } from 'vitest'
import { ORGANISMOS, CADENAS, ROLES, ROLE_ORDER } from '../../data/cadenaTrofica'
import { genRound, isCorrect, genCadena, isNextEslabon, rolesDisponibles } from '../cadenaAlimentaria'

describe('cadenaTrofica: integridad de datos', () => {
  const idsOrganismos = new Set(ORGANISMOS.map(o => o.id))

  it('todo id de ORGANISMOS es único', () => {
    expect(idsOrganismos.size).toBe(ORGANISMOS.length)
  })

  it('todo eslabón de toda cadena referencia un organismo real', () => {
    const huerfanos = []
    for (const c of CADENAS) {
      for (const eslabon of c.eslabones) {
        if (!idsOrganismos.has(eslabon)) huerfanos.push(`${c.id} → '${eslabon}'`)
      }
    }
    expect(huerfanos, `eslabones sin organismo: ${huerfanos.join(', ')}`).toEqual([])
  })

  it('toda cadena tiene al menos 3 eslabones y empieza por un productor', () => {
    for (const c of CADENAS) {
      expect(c.eslabones.length, c.id).toBeGreaterThanOrEqual(3)
      const primero = ORGANISMOS.find(o => o.id === c.eslabones[0])
      expect(primero?.rol, `${c.id}: el primer eslabón debería ser un productor`).toBe('productor')
    }
  })

  it('todo id de CADENAS es único', () => {
    const ids = new Set(CADENAS.map(c => c.id))
    expect(ids.size).toBe(CADENAS.length)
  })

  it('todo organismo tiene un rol real declarado en ROLES', () => {
    for (const o of ORGANISMOS) {
      expect(ROLES[o.rol], `${o.id} tiene un rol desconocido: '${o.rol}'`).toBeDefined()
    }
  })

  it('ROLE_ORDER cubre exactamente las claves de ROLES', () => {
    expect(new Set(ROLE_ORDER)).toEqual(new Set(Object.keys(ROLES)))
  })
})

describe('cadenaAlimentaria: modo clasificación (examen)', () => {
  it('genRound siempre devuelve un organismo con rol válido', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 20; i++) {
        const round = genRound(dif, Math.random)
        expect(round.organismo).toBeDefined()
        expect(isCorrect(round, round.organismo.rol)).toBe(true)
        expect(isCorrect(round, 'un-rol-que-no-existe')).toBe(false)
      }
    }
  })
})

describe('cadenaAlimentaria: modo construir la cadena (juego)', () => {
  it('genCadena da tantas fichas como eslabones tiene la cadena, sin duplicados', () => {
    for (const dif of ['facil', 'medio', 'dificil']) {
      for (let i = 0; i < 20; i++) {
        const round = genCadena(dif, Math.random)
        expect(round.fichas.length).toBe(round.secuencia.length)
        expect(new Set(round.fichas.map(f => f.id)).size).toBe(round.fichas.length)
      }
    }
  })

  it('dificil invierte el orden de la misma cadena que medio ofrecería', () => {
    // Con un rand fijo (siempre 0), genCadena elige siempre la primera
    // cadena del pool y no baraja (sort estable con comparador que nunca
    // dice "cambia"), así que medio y dificil deberían dar la misma
    // secuencia de organismos pero en orden inverso.
    const fijo = () => 0
    const rondaMedio = genCadena('medio', fijo)
    const rondaDificil = genCadena('dificil', fijo)
    expect(rondaDificil.cadena.id).toBe(rondaMedio.cadena.id)
    expect(rondaDificil.secuencia.map(o => o.id)).toEqual([...rondaMedio.secuencia.map(o => o.id)].reverse())
  })

  it('isNextEslabon solo da por bueno el siguiente organismo real de la secuencia, en orden', () => {
    const round = genCadena('medio', () => 0)
    const colocados = []
    for (const esperado of round.secuencia) {
      // cualquier otro organismo de la ficha, si lo hay, debe fallar
      const otro = round.fichas.find(f => f.id !== esperado.id && !colocados.some(c => c.id === f.id))
      if (otro) expect(isNextEslabon(round, colocados, otro.id)).toBe(false)
      expect(isNextEslabon(round, colocados, esperado.id)).toBe(true)
      colocados.push(esperado)
    }
  })

  it('rolesDisponibles solo incluye consumidor-terciario a partir de medio', () => {
    expect(rolesDisponibles('facil')).not.toContain('consumidor-terciario')
    expect(rolesDisponibles('medio')).toContain('consumidor-terciario')
    expect(rolesDisponibles('dificil')).toContain('consumidor-terciario')
  })
})
