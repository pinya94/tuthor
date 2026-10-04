import { describe, it, expect } from 'vitest'
import { ORGANOS } from '../../data/organos.js'
import { PIEZAS_ORGANOS, PIEZAS_HUESOS, PIEZAS_MUSCULOS, PIEZAS_ESPALDA } from '../../components/rayosX/CuerpoSVG.jsx'
import { NIVELES, genRonda, capaDe, BASICAS } from '../rayosX.js'

// Rayos X: cada parte del banco es una forma que se toca en el dibujo, y en
// la capa que le toca (hueso → esqueleto, resto → órganos).
describe('Rayos X', () => {
  it('toda parte del banco tiene su forma en la capa que le toca', () => {
    for (const p of ORGANOS) {
      const piezas = { huesos: PIEZAS_HUESOS, organos: PIEZAS_ORGANOS, musculos: PIEZAS_MUSCULOS, espalda: PIEZAS_ESPALDA }[capaDe(p)]
      expect(piezas, `${p.id} sin forma en la capa ${capaDe(p)}`).toContain(p.id)
    }
  })

  it('y no hay formas de partes que no existen', () => {
    const ids = ORGANOS.map(p => p.id)
    for (const id of [...PIEZAS_ORGANOS, ...PIEZAS_HUESOS, ...PIEZAS_MUSCULOS, ...PIEZAS_ESPALDA]) expect(ids).toContain(id)
  })

  it('las básicas existen y los niveles no están vacíos', () => {
    const ids = ORGANOS.map(p => p.id)
    for (const id of BASICAS) expect(ids).toContain(id)
    for (const n of Object.values(NIVELES)) expect(n.partes.length).toBeGreaterThanOrEqual(10)
  })

  it('no repite lo que se pide que evite', () => {
    const evitar = NIVELES.facil.partes.slice(0, 5).map(p => p.id)
    for (let i = 0; i < 50; i++) expect(evitar).not.toContain(genRonda('facil', { evitar }).parte.id)
  })
})
