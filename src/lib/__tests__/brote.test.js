import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ENFERMEDADES, NO_INFECCIOSAS, FORMAS, ASPECTO, NOMBRE_FORMA, DEFENSAS, CASOS_INMUNIDAD, VIAS, MICROBIOS, porcentajeGrupo, enunciado, explicacion, schemaQuestion, enfermedad, esCorrecta, contagio, infectados, mejorResultado, cajaDe, textoItem, textoCaja, LADO, MARGEN_UMBRAL } from '../brote'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('¡Brote!', () => {
  it('datos coherentes', () => {
    for (const e of ENFERMEDADES) {
      expect(Object.keys(MICROBIOS), e.id).toContain(e.mic)
      if (e.via) expect(Object.keys(VIAS), e.id).toContain(e.via)
      for (const l of ['es', 'en', 'ca']) expect(e.nombre[l], e.id).toBeTruthy()
    }
    // Ninguna enfermedad no infecciosa se llama igual que una infecciosa.
    const inf = new Set(ENFERMEDADES.map(e => e.nombre.es))
    for (const n of NO_INFECCIOSAS) expect(inf.has(n.es)).toBe(false)
    // Hechos de libro que no pueden cambiar.
    expect(enfermedad('gripe').mic).toBe('virus')
    expect(enfermedad('tuberculosis').mic).toBe('bacteria')
    expect(enfermedad('malaria').mic).toBe('protozoo')
    expect(enfermedad('pieatleta').mic).toBe('hongo')
    expect(enfermedad('vih').via).toBe('sangre')
    expect(enfermedad('colera').via).toBe('agua')
    expect(porcentajeGrupo(4)).toBe(75)
    expect(porcentajeGrupo(10)).toBe(90)
    for (const f of Object.keys(FORMAS)) { expect(ASPECTO[f]).toBeTruthy(); expect(NOMBRE_FORMA[f]).toBeTruthy() }
    expect(DEFENSAS.length).toBeGreaterThan(8)
    expect(new Set(CASOS_INMUNIDAD.map(c => c[0])).size).toBe(4)
  })

  it('el contagio va de vecino en vecino y las vacunas lo cortan', () => {
    // Sin protección, toda la cuadrícula enferma.
    expect(infectados(0, [])).toBe(LADO * LADO)
    // Una esquina se encierra con dos vacunas.
    expect(infectados(0, [1, LADO])).toBe(1)
    expect(contagio(0, [])[1].sort()).toEqual([1, LADO])
    expect(mejorResultado(0, [])).toBe(1)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 300 rondas bien formadas', { timeout: 60000 }, () => {
      const rand = semilla(nivel.length * 97)
      const tipos = new Set()
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno), r.tipo).toBe(true)
        if (r.tipo === 'cortafuegos') {
          // Sin vacunar no se llega a la meta; con las mejores vacunas, sí.
          expect(infectados(r.cero, r.inmunes)).toBeGreaterThan(r.meta)
          expect(r.mejor).toBeLessThanOrEqual(r.meta)
          expect(esCorrecta(r, 'cf:' + (r.meta + 1))).toBe(false)
        }
        if (r.tipo === 'umbral') {
          expect(esCorrecta(r, 'p:' + (r.umbral - 1))).toBe(false)
          expect(esCorrecta(r, 'p:' + (r.umbral + MARGEN_UMBRAL + 1))).toBe(false)
        }
        if (r.tipo === 'ficha') expect(esCorrecta(r, 'hongo|aire') && r.bueno !== 'hongo|aire').toBe(false)
        if (r.tipo === 'clasifica') {
          expect(r.items).toHaveLength(4)
          for (const it of r.items) expect(r.cajas).toContain(cajaDe(r, it))
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          if (r.tipo === 'clasifica') for (const it of r.items) { expect(textoItem(it, l)).toBeTruthy(); expect(textoCaja(r, cajaDe(r, it), l)).toBeTruthy() }
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(1)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
          // El texto del examen no delata un dibujo con su nombre.
          if (r.variante === 'microbios') expect(q.question).not.toMatch(/bacilo|bacillus|virus con|levadura|yeast|ameba|amoeba/i)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
