import { describe, it, expect } from 'vitest'
import { NIVELES, TEMAS, ACCIONES, MASCOTAS, GRUPOS, genRonda, genEscena, esCorrecta, fraseCorrecta, fraseCon, explicacion, schemaQuestion } from '../queVes'

const huecos = r => r.partes.filter(p => typeof p !== 'string')
const NUM = ['no', 'one', 'two', 'three', 'four', 'five']

describe('¿Qué Ves?', () => {
  it('las escenas tienen un chico y una chica, y acciones y mascotas sin repetir', () => {
    for (let i = 0; i < 300; i++) {
      const e = genEscena()
      expect(e.ninos.length).toBeGreaterThanOrEqual(2)
      expect(e.ninos.some(n => n.he === 'he') && e.ninos.some(n => n.he === 'she')).toBe(true)
      expect(new Set(e.ninos.map(n => n.accion)).size).toBe(e.ninos.length)
      expect(new Set(e.ninos.map(n => n.mascota)).size).toBe(e.ninos.length)
      for (const c of Object.values(e.grupos)) expect(c >= 0 && c <= 5).toBe(true)
    }
  })

  it('cada ronda se resuelve con sus fichas, ninguna trampa vale y la frase buena es VERDAD en el dibujo', () => {
    for (const nivel of Object.keys(NIVELES)) for (const tema of TEMAS) for (let i = 0; i < 80; i++) {
      const r = genRonda(nivel, { tema })
      const hs = huecos(r)
      expect(hs.length).toBeGreaterThanOrEqual(1)
      if (nivel === 'medio' && tema !== 'can' && !fraseCorrecta(r).includes("aren't")) expect(hs.length, r.id).toBe(2)
      const fichas = r.fichas.map(f => f.texto)
      for (const h of hs) {
        expect(fichas, r.id).toContain(h.ok[0])
        for (const t of h.trampas) expect(h.ok, `${r.id}: trampa ${t}`).not.toContain(t)
      }
      expect(esCorrecta(r, hs.map(h => h.ok[0]))).toBe(true)
      expect(esCorrecta(r, hs.map(h => h.trampas[0]))).toBe(false)
      const frase = fraseCorrecta(r), esc = r.escena
      // Comprobaciones de verdad contra la escena
      for (const n of esc.ninos) {
        const A = ACCIONES[n.accion], M = MASCOTAS[n.mascota]
        if (frase.includes(`${n.n} has got `)) expect(frase, r.id).toContain(`${n.n} has got ${M.a}.`)
        if (frase.startsWith(`${n.n} is `)) expect(frase, r.id).toBe(`${n.n} is ${A.ing}.`)
        if (frase.includes(` is ${n.n}’s.`)) expect(frase, r.id).toContain(`The ${M.a.slice(2)} is ${n.n}’s.`)
        if (frase.includes(`Look at ${n.n}’s `)) expect(frase, r.id).toContain(`Look at ${n.n}’s ${M.a.slice(2)}.`)
        if (frase.includes(` ${n.n} got `)) expect(frase, r.id).not.toContain(M.a) // Has Anna got X? — No → X no es suyo
      }
      for (const [g, G] of Object.entries(GRUPOS)) {
        const c = esc.grupos[g]
        if (frase.includes(` ${G.varios} ${G.donde}`) || frase.includes(` ${G.uno} ${G.donde}`) || frase.includes(`many ${G.varios}`)) {
          if (c === 0) expect(frase, r.id).toMatch(/aren't/)
          else if (!frase.startsWith('How many')) expect(frase, r.id).toMatch(c === 1 ? /There is (a|one) / : new RegExp(`There are ${NUM[c]} `))
          else expect(frase, r.id).toMatch(new RegExp(`There (is|are) ${NUM[c]}\\.$`))
        }
      }
      expect(frase).not.toMatch(/ {2}/)
      for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length).toBeGreaterThan(40)
      const q = schemaQuestion(r, 'es')
      expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('el tema fijo se respeta y sin tema salen los cinco', () => {
    expect(genRonda('medio', { tema: 'can' }).tema).toBe('can')
    expect(new Set(Array.from({ length: 300 }, () => genRonda('facil').tema))).toEqual(new Set(TEMAS))
  })

  it('las frases se escriben bien', () => {
    const r = { partes: ['There ', { ok: ['are'], trampas: ['is'] }, ' ', { ok: ['three'], trampas: ['two'] }, ' birds in the sky.'] }
    expect(fraseCon(r, ['are', 'three'])).toBe('There are three birds in the sky.')
  })
})
