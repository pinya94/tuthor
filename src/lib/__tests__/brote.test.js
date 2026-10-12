import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, ENFERMEDADES, NO_INFECCIOSAS, FORMAS, ASPECTO, NOMBRE_FORMA, DEFENSAS, CASOS_INMUNIDAD, VIAS, MICROBIOS, porcentajeGrupo, enunciado, explicacion, textoOpcion, schemaQuestion, enfermedad } from '../brote'

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

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 6007)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(r.opciones.length).toBeGreaterThanOrEqual(3)
        if (r.tipo === 'microbio') expect(r.bueno).toBe(FORMAS[r.forma])
        if (r.tipo === 'agente') expect(r.bueno).toBe(enfermedad(r.enf).mic)
        if (r.tipo === 'contagio') expect(r.bueno).toBe(enfermedad(r.enf).via)
        if (r.tipo === 'antibiotico') expect(r.bueno).toBe(enfermedad(r.enf).mic === 'bacteria' ? 'si-bacteria' : 'no-virus')
        if (r.tipo === 'infecciosa') {
          // Exactamente una opción distinta de las demás.
          const infecciosas = r.opciones.filter(o => o.startsWith('e:'))
          expect(infecciosas.length).toBe(r.alReves ? 3 : 1)
          expect(r.bueno.startsWith(r.alReves ? 'n:' : 'e:')).toBe(true)
        }
        if (r.tipo === 'generaciones') expect(r.bueno).toBe(r.R ** r.k)
        if (r.tipo === 'grupo') expect(r.bueno).toBe(Math.round((1 - 1 / r.R) * 100))
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const textos = r.opciones.map(o => textoOpcion(o, r, l))
          expect(new Set(textos).size).toBe(textos.length)
          for (const t of textos) expect(t).not.toMatch(/undefined|NaN/)
          const sq = schemaQuestion(r, l)
          expect(sq.wrongAnswers).toHaveLength(r.opciones.length - 1)
          // El texto del examen no delata la respuesta del dibujo.
          if (r.tipo === 'microbio') expect(sq.question.toLowerCase()).not.toContain(textoOpcion(r.bueno, r, l).toLowerCase())
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
