import { describe, it, expect } from 'vitest'
import { PARTES, RUTAS, NIVELES, partesDe, genRonda, esCorrecta, enunciado, explicacion, schemaQuestion } from '../ojoOido'

describe('Ojo y Oído', () => {
  it('cada parte tiene nombre, artículo y función en los tres idiomas, y las funciones no se repiten', () => {
    for (const l of ['es', 'en', 'ca']) {
      const funciones = new Set()
      for (const [id, p] of Object.entries(PARTES)) {
        expect(p.nom[l], `${id}.${l}`).toBeTruthy()
        expect(p.art[l], `${id}.${l}`).toBeTruthy()
        expect(p.fun[l], `${id}.${l}`).toBeTruthy()
        funciones.add(p.fun[l])
      }
      expect(funciones.size).toBe(Object.keys(PARTES).length)
    }
  })

  it('los recorridos solo usan partes de su órgano', () => {
    for (const [organo, ruta] of Object.entries(RUTAS)) for (const p of ruta) expect(PARTES[p].organo, p).toBe(organo)
    expect(RUTAS.ojo).toEqual(['cornea', 'pupila', 'cristalino', 'retina', 'nervio-optico'])
    expect(RUTAS.oido[0]).toBe('pabellon')
    expect(RUTAS.oido.at(-1)).toBe('nervio-auditivo')
  })

  it('las rondas tienen solución y su texto, en los tres niveles', () => {
    for (const nivel of Object.keys(NIVELES)) {
      const tipos = new Set()
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel)
        tipos.add(r.tipo)
        if (r.tipo === 'ruta') {
          expect(esCorrecta(r, r.ruta)).toBe(true)
          expect(esCorrecta(r, [...r.ruta].reverse())).toBe(false)
          expect(esCorrecta(r, r.ruta.slice(0, -1))).toBe(false)
        } else {
          expect(partesDe(r.organo)).toContain(r.objetivo)
          expect(esCorrecta(r, r.objetivo)).toBe(true)
          for (const otra of partesDe(r.organo).filter(p => p !== r.objetivo)) expect(esCorrecta(r, otra)).toBe(false)
          if (r.tipo === 'siguiente' && r.tras) expect(RUTAS[r.organo].indexOf(r.objetivo)).toBe(RUTAS[r.organo].indexOf(r.tras) + 1)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l).length, r.id).toBeGreaterThan(8)
          expect(explicacion(r, l).length, r.id).toBeGreaterThan(30)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBe(3)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      if (nivel === 'facil') expect([...tipos]).toEqual(['nombre'])
      if (nivel === 'medio') expect([...tipos]).toEqual(['funcion'])
      if (nivel === 'dificil') expect([...tipos].sort()).toEqual(['ruta', 'siguiente'])
    }
  })

  it('la concordancia de las partes en plural es correcta', () => {
    const r = { tipo: 'funcion', organo: 'oido', objetivo: 'canales' }
    expect(enunciado(r, 'es')).toBe('Toca la parte que se encarga del equilibrio, no de oír')
    expect(explicacion(r, 'es')).toBe('Los canales semicirculares se encargan del equilibrio, no de oír.')
    expect(explicacion({ tipo: 'funcion', organo: 'oido', objetivo: 'huesecillos' }, 'es')).toMatch(/^Los huesecillos .* son /)
    expect(explicacion({ tipo: 'funcion', organo: 'ojo', objetivo: 'retina' }, 'es')).toBe('La retina tiene los conos y los bastones, las células que captan la luz.')
  })
})
