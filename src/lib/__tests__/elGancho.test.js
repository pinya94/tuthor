import { describe, it, expect } from 'vitest'
import { BANCO, TEMAS, NIVELES, OPCIONES, REGLAS, genRonda, esCorrecta, explicacion, schemaQuestion, fraseCon } from '../elGancho'
import { TOPIC_CATALOG } from '../topicCatalog'

describe('El Gancho', () => {
  it('cada frase tiene un hueco, una buena, 3 trampas distintas y su regla', () => {
    expect(new Set(BANCO.map(f => f.id)).size).toBe(BANCO.length)
    expect(new Set(BANCO.map(f => f.frase)).size).toBe(BANCO.length)
    for (const f of BANCO) {
      expect(f.frase.split('___').length, f.id).toBe(2)
      expect(f.trampas.length, f.id).toBe(3)
      expect(new Set([f.ok, ...f.trampas]).size, f.id).toBe(4)
      expect(REGLAS[f.regla], `${f.id}: regla ${f.regla}`).toBeTruthy()
    }
    for (const r of Object.values(REGLAS)) for (const l of ['es', 'en', 'ca']) expect(r[l]).toBeTruthy()
  })

  it('hay al menos 20 frases por tema y nivel', () => {
    for (const t of TEMAS) for (const n of [1, 2, 3]) expect(BANCO.filter(f => f.tema === t && f.n === n).length, `${t} ${n}`).toBeGreaterThanOrEqual(20)
  })

  it('nunca es trampa algo que un libro aceptaría', () => {
    for (const f of BANCO) {
      // that solo puede ser trampa entre comas o donde no cabe (what, whose, where)
      if (f.trampas.some(t => t.toLowerCase() === 'that')) expect(f.frase.includes(',') || ['what', 'whose', 'where'].includes(f.ok.toLowerCase()), f.id).toBe(true)
      for (const t of f.trampas) expect(['whom', 'am I not?'], f.id).not.toContain(t)
      if (f.tema === 'question-tags') {
        // frase afirmativa: ninguna trampa puede ser la misma coletilla en positivo (las «same-way tags» existen)
        const neg = s => /n’t/.test(s)
        const aux = s => s.replace(/n’t/, '').split(' ')[0].replace(/^wo$/, 'will').replace(/^ca$/, 'can').replace(/^sha$/, 'shall')
        for (const t of f.trampas) if (neg(f.ok) && !neg(t)) expect(aux(t) === aux(f.ok) && t.split(' ')[1] === f.ok.split(' ')[1], `${f.id}: ${t}`).toBe(false)
      }
    }
  })

  it('el número de botones y el nivel de cada ronda', () => {
    for (const nivel of Object.keys(NIVELES)) {
      const temas = new Set()
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel)
        temas.add(r.tema)
        expect(r.opciones.length).toBe(OPCIONES[nivel])
        expect(r.opciones).toContain(r.ok)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.ok)).toBe(true)
        expect(esCorrecta(r, r.opciones.find(o => o !== r.ok))).toBe(false)
        expect(fraseCon(r, r.ok)).not.toContain('___')
        for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length).toBeGreaterThan(10)
        const q = schemaQuestion(r, 'es')
        expect(q.wrongAnswers).toHaveLength(3)
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
      expect([...temas].sort()).toEqual([...TEMAS].sort())
    }
  })

  it('con tema fijo solo sale ese tema y no repite frases seguidas', () => {
    const vistas = []
    for (let i = 0; i < 20; i++) {
      const r = genRonda('medio', { tema: 'question-tags' })
      expect(r.tema).toBe('question-tags')
      vistas.push(r.id)
    }
    expect(new Set(vistas).size).toBe(20)
  })

  it('los dos temas están en el catálogo de inglés con el juego', () => {
    for (const t of TEMAS) expect(TOPIC_CATALOG.ingles.temas[t], t).toBeTruthy()
    expect([...TOPIC_CATALOG.ingles.formatos.gancho.temas].sort()).toEqual([...TEMAS].sort())
  })
})
