import { describe, it, expect } from 'vitest'
import {
  AFIJOS, PALABRAS, SINONIMOS, ANTONIMOS, NIVELES, genRonda, montar, palabra, esCorrecta,
  respuestaPalabra, respuestaParejas, enunciado, explicacion, pistaFallo, schemaQuestion,
} from '../fabricaPalabras'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('La Fábrica de Palabras', () => {
  it('cada palabra se monta con sus piezas y usa afijos conocidos', () => {
    for (const w of PALABRAS) {
      expect(montar(w.pre, w.base, w.suf), w.id).toBe(w.palabra)
      if (w.pre) expect(AFIJOS[w.pre]?.tipo, w.id).toBe('pre')
      if (w.suf) expect(AFIJOS[w.suf]?.tipo, w.id).toBe('suf')
      expect(Boolean(w.pre) !== Boolean(w.suf), `${w.id}: un solo afijo`).toBe(true)
    }
    expect(new Set(PALABRAS.map(w => w.id)).size).toBe(PALABRAS.length)
  })

  it('la ortografía de in-/im-/i- es coherente', () => {
    for (const w of PALABRAS.filter(x => ['in-', 'im-', 'i-'].includes(x.pre))) {
      const ini = w.base[0]
      if (w.pre === 'im-') expect('pb', w.id).toContain(ini)
      if (w.pre === 'i-') expect('lr', w.id).toContain(ini)
      if (w.pre === 'in-') expect('pblr', w.id).not.toContain(ini)
    }
  })

  it('los pares no se repiten ni chocan de grupo dentro de una ronda', () => {
    const rand = semilla(5)
    for (const nivel of Object.keys(NIVELES)) {
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand })
        if (r.pares) {
          expect(r.pares).toHaveLength(4)
          const lista = r.tipo === 'sinonimos' ? SINONIMOS : ANTONIMOS
          const grupos = r.pares.map(([a, b]) => lista.find(p => (p.a === a && p.b === b) || (p.a === b && p.b === a)).grupo)
          expect(new Set(grupos).size, grupos.join()).toBe(4)
          expect(new Set(r.pares.flat()).size).toBe(8)
          expect(esCorrecta(r, respuestaParejas(r.pares))).toBe(true)
          // cruzar dos pares nunca es la buena
          const [p0, p1, ...resto] = r.pares
          expect(esCorrecta(r, respuestaParejas([[p0[0], p1[1]], [p1[0], p0[1]], ...resto]))).toBe(false)
        } else {
          const w = palabra(r.w)
          const buena = w.suf ?? w.pre
          expect(r.piezas).toContain(buena)
          expect(new Set(r.piezas).size).toBe(r.piezas.length)
          expect(r.piezas.length).toBe(4)
          expect(esCorrecta(r, respuestaPalabra(r, w.pre, w.suf))).toBe(true)
          for (const p of r.piezas.filter(p => p !== buena)) {
            const otra = w.suf ? respuestaPalabra(r, null, p) : respuestaPalabra(r, p, null)
            expect(esCorrecta(r, otra), `${w.id} con ${p}`).toBe(false)
            // la trampa nunca es del mismo grupo de significado (salvo en negación)
            if (r.tipo !== 'negacion') expect(AFIJOS[p].grupo).not.toBe(AFIJOS[buena].grupo)
          }
          expect(w.nivel).toBeLessThanOrEqual(NIVELES[nivel].max)
        }
        const t = enunciado(r) + explicacion(r)
        expect(t).not.toMatch(/undefined|null/)
        const sq = schemaQuestion(r)
        expect(sq.wrongAnswers.length).toBe(3)
        expect(sq.wrongAnswers).not.toContain(sq.correctAnswer)
      }
    }
  })

  it('las pistas cazan la ortografía del prefijo', () => {
    const r = { tipo: 'negacion', w: 'imposible', bueno: 'w:imposible' }
    expect(pistaFallo(r, 'w:inposible')).toMatch(/im-/)
    const r2 = { tipo: 'negacion', w: 'ilegal', bueno: 'w:ilegal' }
    expect(pistaFallo(r2, 'w:inlegal')).toMatch(/i-/)
    expect(explicacion({ tipo: 'sufijo', w: 'zapatero' })).toMatch(/zapat- \+ -ero = zapatero/)
  })
})
