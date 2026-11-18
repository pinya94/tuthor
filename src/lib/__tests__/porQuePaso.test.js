import { describe, it, expect } from 'vitest'
import { HECHOS, TEMAS, NIVELES, PIEZAS, hecho, compatibles, genRonda, esCorrecta, explicacion, schemaQuestion } from '../porQuePaso'
import { TOPIC_CATALOG } from '../topicCatalog'

describe('¿Por Qué Pasó?', () => {
  it('cada hecho tiene título, 5 causas y 5 consecuencias en los tres idiomas', () => {
    expect(HECHOS.length).toBeGreaterThanOrEqual(25)
    expect(new Set(HECHOS.map(h => h.id)).size).toBe(HECHOS.length)
    for (const h of HECHOS) {
      expect(h.causas.length, h.id).toBe(5)
      expect(h.consecuencias.length, h.id).toBe(5)
      for (const t of [h.titulo, ...h.causas, ...h.consecuencias]) for (const l of ['es', 'en', 'ca']) expect(t[l], `${h.id}.${l}`).toBeTruthy()
    }
  })

  it('ninguna pieza se repite entre hechos ni entre causas y consecuencias', () => {
    const vistas = new Map()
    for (const h of HECHOS) for (const t of [...h.causas, ...h.consecuencias]) {
      expect(vistas.has(t.es), `«${t.es}» en ${h.id} y ${vistas.get(t.es)}`).toBe(false)
      vistas.set(t.es, h.id)
    }
  })

  it('los temas existen en el catálogo de historia y el formato los cubre todos', () => {
    const temasHistoria = Object.keys(TOPIC_CATALOG.historia.temas)
    for (const t of TEMAS) expect(temasHistoria, t).toContain(t)
    expect([...TOPIC_CATALOG.historia.formatos['por-que-paso'].temas].sort()).toEqual([...TEMAS].sort())
  })

  it('cada hecho tiene de dónde sacar piezas que no tienen que ver', () => {
    for (const h of HECHOS) expect(HECHOS.some(x => compatibles(h, x)), h.id).toBe(true)
  })

  it('1 pieza en fácil, 2 en medio y 3 en difícil; como mucho una intrusa, siempre lejana', () => {
    for (const nivel of Object.keys(NIVELES)) {
      const tipos = new Set()
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel)
        expect(r.piezas.length).toBe(PIEZAS[nivel])
        expect(new Set(r.piezas.map(p => p.id)).size).toBe(r.piezas.length)
        const intr = r.piezas.filter(p => p.tipo === 'x')
        expect(intr.length).toBeLessThanOrEqual(1)
        if (PIEZAS[nivel] > 1) expect(intr.length).toBeLessThan(r.piezas.length)
        for (const p of intr) expect(compatibles(hecho(r.hecho), hecho(p.de)), `${r.id}`).toBe(true)
        for (const p of r.piezas) {
          tipos.add(p.tipo)
          if (p.tipo !== 'x') expect(p.hecho).toBe(r.hecho)
        }
        const buena = Object.fromEntries(r.piezas.map(p => [p.id, p.tipo]))
        expect(esCorrecta(r, buena)).toBe(true)
        const p0 = r.piezas[0]
        expect(esCorrecta(r, { ...buena, [p0.id]: p0.tipo === 'c' ? 'q' : 'c' })).toBe(false)
        for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length).toBeGreaterThan(40)
        const q = schemaQuestion(r, 'es')
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
      expect([...tipos].sort()).toEqual(['c', 'q', 'x'])
    }
  })

  it('al repetirse un hecho salen piezas distintas', () => {
    const vistas = new Set()
    for (let i = 0; i < 40; i++) genRonda('dificil', { tema: 'revolucion-francesa' }).piezas.forEach(p => vistas.add(p.id))
    expect(vistas.size).toBeGreaterThan(8)
  })

  it('con tema fijo solo salen hechos de ese tema', () => {
    for (let i = 0; i < 50; i++) expect(hecho(genRonda('medio', { tema: 'edad-media' }).hecho).tema).toBe('edad-media')
  })
})
