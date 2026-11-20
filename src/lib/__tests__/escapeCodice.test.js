// «El Códice Robado»: el misterio tiene UNA solución y se puede resolver en
// cualquier orden de salas; los datos de cada sala son coherentes.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import {
  SOSPECHOSOS, CULPABLE, PISTAS_LADRON, SALAS, CARAS, OBJETOS_CRIPTA, ETAPAS_CRIPTA, CIUDADES, VIAJE, PALABRA_MAPA,
  PALABRAS, CARTA, REYES, SUCESOS, INTRO, FINAL, FINAL_COFRE,
} from '../../data/escape/codiceRobado'

describe('El Códice Robado', () => {
  it('el culpable cumple todas las pistas y cada inocente falla exactamente una', () => {
    const culpable = SOSPECHOSOS.find(s => s.id === CULPABLE)
    for (const [sala, p] of Object.entries(PISTAS_LADRON)) expect(p.cumple(culpable.hechos), sala).toBe(true)
    for (const s of SOSPECHOSOS.filter(x => x.id !== CULPABLE)) {
      const falla = Object.values(PISTAS_LADRON).filter(p => !p.cumple(s.hechos)).length
      expect(falla, s.id).toBe(1)
    }
  })
  it('cada sala tiene pista del ladrón, tres pistas y diálogos', () => {
    expect(SALAS.map(s => s.orden).sort()).toEqual([1, 2, 3, 4, 5, 6])
    for (const s of SALAS) {
      expect(PISTAS_LADRON[s.id], s.id).toBeTruthy()
      expect(s.pistas).toHaveLength(3)
      expect(s.antes.length).toBeGreaterThan(0)
      expect(s.despues.length).toBeGreaterThan(0)
    }
  })
  it('las caras de los diálogos existen como imagen', () => {
    const lineas = [...INTRO, ...FINAL, ...FINAL_COFRE, ...SALAS.flatMap(s => [...s.antes, ...s.despues])]
    for (const [cara] of lineas) expect(CARAS).toContain(cara)
    for (const c of CARAS) expect(fs.existsSync(`public/escape/monje-${c}.webp`), c).toBe(true)
  })
  it('cripta: tres objetos por etapa', () => {
    for (const e of ETAPAS_CRIPTA) expect(OBJETOS_CRIPTA.filter(o => o.etapa === e.id)).toHaveLength(3)
  })
  it('mapa: el viaje deletrea la palabra y las letras no se repiten', () => {
    expect(VIAJE.map(id => CIUDADES.find(c => c.id === id).letra).join('')).toBe(PALABRA_MAPA)
    expect(new Set(CIUDADES.map(c => c.letra)).size).toBe(CIUDADES.length)
  })
  it('palabras, carta, reyes y sucesos', () => {
    expect(PALABRAS.filter(p => p.arabe)).toHaveLength(6)
    expect(CARTA.frases.filter(f => f.mal).every(f => f.por)).toBe(true)
    expect(new Set(REYES.map(r => r.id)).size).toBe(6)
    expect(SUCESOS.map(s => s.anio)).toEqual([...SUCESOS.map(s => s.anio)].sort((a, b) => a - b))
  })
})
