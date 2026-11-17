import { describe, it, expect } from 'vitest'
import { HECHOS, TEMAS, NIVELES, SEPARACION, hecho, compatibles, genRonda, esCorrecta, casilla, explicacion, schemaQuestion } from '../porQuePaso'
import { TOPIC_CATALOG } from '../topicCatalog'

describe('¿Por Qué Pasó?', () => {
  it('cada hecho tiene título, 3 causas y 3 consecuencias en los tres idiomas', () => {
    expect(HECHOS.length).toBeGreaterThanOrEqual(25)
    expect(new Set(HECHOS.map(h => h.id)).size).toBe(HECHOS.length)
    for (const h of HECHOS) {
      expect(h.causas.length, h.id).toBe(3)
      expect(h.consecuencias.length, h.id).toBe(3)
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

  it('cada hecho tiene pareja posible para el nivel difícil', () => {
    for (const h of HECHOS) expect(HECHOS.some(x => compatibles(h, x)), h.id).toBe(true)
  })

  it('las rondas tienen las piezas que tocan y se corrigen bien', () => {
    for (const nivel of Object.keys(NIVELES)) for (let i = 0; i < 300; i++) {
      const r = genRonda(nivel)
      expect(r.piezas.length).toBe({ facil: 4, medio: 6, dificil: 8 }[nivel])
      if (nivel === 'dificil') {
        const [a, b] = r.hechos.map(hecho)
        expect(Math.abs(a.año - b.año), r.id).toBeGreaterThanOrEqual(SEPARACION)
        expect(a.tema).not.toBe(b.tema)
      }
      const buena = Object.fromEntries(r.piezas.map(p => [p.id, casilla(r, p)]))
      expect(esCorrecta(r, buena)).toBe(true)
      const p0 = r.piezas[0]
      const mala = { ...buena, [p0.id]: buena[p0.id].endsWith(':c') ? buena[p0.id].replace(':c', ':q') : buena[p0.id].replace(':q', ':c') }
      expect(esCorrecta(r, mala)).toBe(false)
      for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length).toBeGreaterThan(50)
      const q = schemaQuestion(r, 'es')
      expect(q.wrongAnswers).not.toContain(q.correctAnswer)
    }
  })

  it('con tema fijo solo salen hechos de ese tema', () => {
    for (let i = 0; i < 50; i++) {
      const r = genRonda('medio', { tema: 'edad-media' })
      expect(hecho(r.hechos[0]).tema).toBe('edad-media')
    }
  })
})
