import { describe, it, expect } from 'vitest'
import * as P from '../../data/personajes'
import { RASGOS } from '../../data/rostros'

const POOLS = ['PERSONAJES_GCE', 'PERSONAJES_WWII', 'PERSONAJES_GLOBAL', 'PERSONAJES_USA', 'PERSONAJES_FRANQUISMO', 'PERSONAJES_EDADMEDIA', 'PERSONAJES_EDADMODERNA', 'PERSONAJES_CIENCIA']
const MUJER = ['melena', 'largo', 'corto_m', 'moño', 'recogido']

describe('¿Quién es Quién? · personajes y retratos', () => {
  it('cada personaje tiene su retrato dibujado y un pelo acorde con su género', () => {
    for (const pool of POOLS) for (const p of P[pool]) {
      const r = RASGOS[p.id]
      expect(r, p.id).toBeTruthy()
      // Un hombre no lleva melena de mujer (se confundiría al mirar el tablero)
      if (p.atributos.genero === 'hombre') expect(MUJER, p.id).not.toContain(r.pelo)
      if (p.atributos.genero === 'mujer') { expect(r.barba, p.id).toBeUndefined(); expect(r.bigote, p.id).toBeUndefined() }
    }
  })

  it('la tanda de ciencia llena un tablero, sin ids repetidos y con las pistas en los tres idiomas', () => {
    expect(P.PERSONAJES_CIENCIA.length).toBeGreaterThanOrEqual(12)
    const ids = POOLS.flatMap(k => P[k].map(p => p.id))
    expect(new Set(ids).size).toBe(ids.length)
    for (const p of P.PERSONAJES_CIENCIA) {
      expect(p.atributos.rol).toBe('científico')
      for (const k of ['pistaUnica', 'pistaUnicaEn', 'pistaUnicaCa']) expect(p[k], p.id).toBeTruthy()
      for (const l of ['es', 'en', 'ca']) {
        const pistas = P.generarPistas(p, P.montarTablero(P.PERSONAJES_CIENCIA), l)
        for (const c of pistas) expect(c.texto, p.id).toBeTruthy()
      }
    }
  })
})
