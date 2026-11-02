import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, VERBOS, PATRONES, verbo, patron, ejemploPatron, regular, vale, esCorrecta, enunciado, explicacion, schemaQuestion } from '../verbosIrregulares'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Verbos Irregulares', () => {
  it('datos', () => {
    expect(new Set(VERBOS.map(v => v.id)).size).toBe(VERBOS.length)
    for (const v of VERBOS) {
      for (const f of [v.inf, v.past, v.pp]) expect(f, v.id).toMatch(/^[a-z]+$/)
      // Un verbo irregular de verdad: alguna forma no es la regular
      expect(v.past === regular(v.inf) && v.pp === regular(v.inf), v.id).toBe(false)
      for (const f of v.falsas ?? []) expect([v.past, v.pp], `${v.id}: ${f}`).not.toContain(f)
      expect(v.sig.es && v.sig.ca, v.id).toBeTruthy()
      expect([1, 2, 3]).toContain(v.nivel)
    }
    // Patrones de referencia
    expect(patron(verbo('cut'))).toBe('AAA')
    expect(patron(verbo('buy'))).toBe('ABB')
    expect(patron(verbo('go'))).toBe('ABC')
    expect(patron(verbo('come'))).toBe('ABA')
    for (const p of Object.keys(PATRONES)) expect(VERBOS.filter(v => v.nivel === 1 && !v.sinPatron && patron(v) === p).length, p).toBeGreaterThanOrEqual(2)
    // Formas regulares inventadas
    expect(regular('go')).toBe('goed')
    expect(regular('run')).toBe('runned')
    expect(regular('make')).toBe('maked')
    expect(regular('fly')).toBe('flied')
    // Teclear: mayúsculas y espacios no cuentan; gotten vale en «get»
    expect(vale(verbo('go'), 'pp', ' Gone ')).toBe(true)
    expect(vale(verbo('go'), 'pp', 'went')).toBe(false)
    expect(vale(verbo('get'), 'pp', 'gotten')).toBe(true)
    expect(vale(verbo('get'), 'past', 'gotten')).toBe(false)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 97)
      const tipos = new Set()
      const cuenta = {}
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        cuenta[r.tipo] = (cuenta[r.tipo] ?? 0) + 1
        expect(esCorrecta(r, r.bueno)).toBe(true)
        for (const id of r.verbos) expect(verbo(id).nivel).toBeLessThanOrEqual(NIVELES[nivel].maxNivel)
        if (r.tipo === 'forja') {
          const v = verbo(r.verbos[0])
          expect(r.fichas.length).toBeGreaterThanOrEqual(4)
          expect(r.fichas).toContain(v.past)
          expect(r.fichas).toContain(v.pp)
          // Las falsas no son formas buenas; si pasado = participio, la ficha sale dos veces
          expect(r.fichas.filter(f => f !== v.past && f !== v.pp).length).toBe(r.fichas.length - 2)
        }
        if (r.tipo === 'patrones') {
          expect(new Set(r.verbos).size).toBe(4)
          for (const id of r.verbos) expect(verbo(id).sinPatron).toBeFalsy()
          // El ejemplo de la caja es de su patrón y no es un verbo de la ronda
          for (const p of Object.keys(PATRONES)) {
            const inf = ejemploPatron(p, r.verbos).split(' · ')[0]
            expect(r.verbos).not.toContain(inf)
            expect(patron(verbo(inf))).toBe(p)
          }
        }
        if (r.tipo === 'frase') {
          const v = verbo(r.verbos[0])
          expect(v.past).not.toBe(v.pp)
          expect(r.frases.map(f => f.forma).sort()).toEqual(['past', 'pp'])
          for (const f of r.frases) expect(f.texto).toMatch(/___/)
          expect(r.fichas).toContain(v.past)
          expect(r.fichas).toContain(v.pp)
          expect(r.fichas.length).toBe(3)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|null/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
      // Cada tipo sale más o menos con su peso: el antirrepetición no puede
      // dejar sin rondas de patrones (cuatro verbos) a base de descartarlas.
      const tiposN = NIVELES[nivel].tipos
      for (const t of new Set(tiposN)) expect(cuenta[t] / 500, t).toBeGreaterThan(0.6 * tiposN.filter(x => x === t).length / tiposN.length)
    })
  }
})
