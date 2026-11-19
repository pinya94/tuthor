import { describe, it, expect } from 'vitest'
import { NIVELES, PERSONAS, REGULARES, IRREGULARES, TIEMPOS, tabla, forma, genRonda, esCorrecta, explicacion, schemaQuestion } from '../montaVerbo'

const conjuga = (inf, t) => tabla(inf, t).map(forma)

describe('Monta el Verbo', () => {
  it('las reglas dan las formas que trae cualquier gramática', () => {
    expect(conjuga('cantar', 'presente')).toEqual(['canto', 'cantas', 'canta', 'cantamos', 'cantáis', 'cantan'])
    expect(conjuga('comer', 'presente')).toEqual(['como', 'comes', 'come', 'comemos', 'coméis', 'comen'])
    expect(conjuga('vivir', 'presente')).toEqual(['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'])
    expect(conjuga('cantar', 'indefinido')).toEqual(['canté', 'cantaste', 'cantó', 'cantamos', 'cantasteis', 'cantaron'])
    expect(conjuga('comer', 'indefinido')).toEqual(['comí', 'comiste', 'comió', 'comimos', 'comisteis', 'comieron'])
    expect(conjuga('cantar', 'imperfecto')).toEqual(['cantaba', 'cantabas', 'cantaba', 'cantábamos', 'cantabais', 'cantaban'])
    expect(conjuga('vivir', 'imperfecto')).toEqual(['vivía', 'vivías', 'vivía', 'vivíamos', 'vivíais', 'vivían'])
    expect(conjuga('comer', 'futuro')).toEqual(['comeré', 'comerás', 'comerá', 'comeremos', 'comeréis', 'comerán'])
    expect(conjuga('vivir', 'condicional')).toEqual(['viviría', 'vivirías', 'viviría', 'viviríamos', 'viviríais', 'vivirían'])
    expect(conjuga('cantar', 'perfecto')).toEqual(['he cantado', 'has cantado', 'ha cantado', 'hemos cantado', 'habéis cantado', 'han cantado'])
    expect(conjuga('comer', 'pluscuamperfecto')[3]).toBe('habíamos comido')
    expect(conjuga('vivir', 'futuroPerfecto')[5]).toBe('habrán vivido')
    expect(conjuga('cantar', 'subjPresente')).toEqual(['cante', 'cantes', 'cante', 'cantemos', 'cantéis', 'canten'])
    expect(conjuga('comer', 'subjPresente')).toEqual(['coma', 'comas', 'coma', 'comamos', 'comáis', 'coman'])
    expect(conjuga('vivir', 'subjImperfecto')).toEqual(['viviera', 'vivieras', 'viviera', 'viviéramos', 'vivierais', 'vivieran'])
    expect(conjuga('cantar', 'subjImperfecto')[3]).toBe('cantáramos')
  })

  it('los verbos regulares no tienen cambios ortográficos ni participio irregular', () => {
    const todos = Object.values(REGULARES).flat()
    expect(new Set(todos).size).toBe(todos.length)
    for (const v of todos) {
      expect(v, v).not.toMatch(/(car|gar|zar|ger|gir|cer|cir|guir|uir|eer)$/)
      expect(['escribir', 'abrir', 'romper', 'cubrir', 'volver', 'poner', 'hacer', 'decir', 'ver'], v).not.toContain(v)
    }
  })

  it('cada irregular trae sus 6 formas y trampas que no son la forma buena', () => {
    for (const v of IRREGULARES) for (const t of ['presente', 'indefinido']) {
      expect(v[t], `${v.inf} ${t}`).toHaveLength(6)
      const buenas = v[t]
      expect(v.trampas[t].filter(x => !buenas.includes(x)).length, `${v.inf} ${t}`).toBeGreaterThanOrEqual(2)
    }
    const tener = IRREGULARES.find(v => v.inf === 'tener')
    expect(tener.indefinido[2]).toBe('tuvo')
  })

  it('cada ronda: 6 casillas, fichas = buenas + trampas, nunca una trampa que valga en su casilla', () => {
    for (const nivel of Object.keys(NIVELES)) {
      const tiempos = new Set()
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel)
        tiempos.add(r.tiempo + (r.irregular ? '*' : ''))
        expect(TIEMPOS[r.tiempo]).toBeTruthy()
        expect(r.casillas).toHaveLength(PERSONAS.length)
        expect(r.trampas.length).toBeGreaterThanOrEqual(2)
        const buenas = r.casillas.map(c => c.ok)
        for (const t of r.trampas) expect(buenas, `${r.id}: ${t}`).not.toContain(t)
        expect(r.fichas).toHaveLength(6 + r.trampas.length)
        expect(esCorrecta(r, buenas)).toBe(true)
        expect(esCorrecta(r, [r.trampas[0], ...buenas.slice(1)])).toBe(false)
        expect(esCorrecta(r, buenas.slice(0, 5))).toBe(false)
        expect(explicacion(r).length).toBeGreaterThan(20)
        const q = schemaQuestion(r)
        expect(q.wrongAnswers).toHaveLength(3)
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
      expect(tiempos.size, nivel).toBeGreaterThanOrEqual(3)
    }
  })
})
