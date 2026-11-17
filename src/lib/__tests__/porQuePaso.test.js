import { describe, it, expect } from 'vitest'
import { HECHOS, TEMAS, NIVELES, SEPARACION, hecho, compatibles, genRonda, esCorrecta, casilla, explicacion, schemaQuestion } from '../porQuePaso'
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

  it('cada hecho tiene pareja posible para el nivel difícil', () => {
    for (const h of HECHOS) expect(HECHOS.some(x => compatibles(h, x)), h.id).toBe(true)
  })

  it('las rondas tienen las piezas que tocan y se corrigen bien', () => {
    for (const nivel of Object.keys(NIVELES)) for (let i = 0; i < 300; i++) {
      const r = genRonda(nivel)
      expect(r.piezas.length).toBe({ facil: 5, medio: 8, dificil: 9 }[nivel])
      // intrusas: de otro tema y lejos en el tiempo de todos los hechos de la ronda
      const intr = r.piezas.filter(p => p.tipo === 'x')
      expect(intr.length, r.id).toBe({ facil: 1, medio: 2, dificil: 1 }[nivel])
      for (const p of intr) for (const id of r.hechos) expect(compatibles(hecho(id), hecho(p.de)), `${r.id} intrusa de ${p.de}`).toBe(true)
      expect(new Set(r.piezas.map(p => p.id)).size).toBe(r.piezas.length)
      if (nivel === 'dificil') {
        const [a, b] = r.hechos.map(hecho)
        expect(Math.abs(a.año - b.año), r.id).toBeGreaterThanOrEqual(SEPARACION)
        expect(a.tema).not.toBe(b.tema)
      }
      const buena = Object.fromEntries(r.piezas.map(p => [p.id, casilla(r, p)]))
      expect(esCorrecta(r, buena)).toBe(true)
      const p0 = r.piezas[0]
      const cambia = v => (v === 'x' ? 'A:c' : v.endsWith(':c') ? v.replace(':c', ':q') : v.replace(':q', ':c'))
      const mala = { ...buena, [p0.id]: cambia(buena[p0.id]) }
      expect(esCorrecta(r, mala)).toBe(false)
      for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length).toBeGreaterThan(50)
      const q = schemaQuestion(r, 'es')
      expect(q.wrongAnswers).not.toContain(q.correctAnswer)
    }
  })

  it('al repetirse un hecho salen piezas distintas', () => {
    const vistas = new Set()
    for (let i = 0; i < 40; i++) {
      const r = genRonda('facil', { tema: 'revolucion-francesa' })
      r.piezas.filter(p => p.tipo !== 'x').forEach(p => vistas.add(p.id))
    }
    expect(vistas.size).toBeGreaterThan(6)
  })

  it('con tema fijo solo salen hechos de ese tema', () => {
    for (let i = 0; i < 50; i++) {
      const r = genRonda('medio', { tema: 'edad-media' })
      expect(hecho(r.hechos[0]).tema).toBe('edad-media')
    }
  })
})
