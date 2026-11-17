import { describe, it, expect } from 'vitest'
import { CATEGORIAS, NIVELES, item, genRonda, esCorrecta, explicacion, schemaQuestion, valor } from '../masOMenos'

describe('¿Más o Menos?', () => {
  it('cada lugar tiene nombre en los tres idiomas, valor positivo e id único dentro de su magnitud', () => {
    for (const [cat, C] of Object.entries(CATEGORIAS)) {
      expect(new Set(C.items.map(x => x.id)).size, cat).toBe(C.items.length)
      for (const x of C.items) {
        for (const l of ['es', 'en', 'ca']) expect(x.nombre[l], `${cat}/${x.id}`).toBeTruthy()
        expect(x.v).toBeGreaterThan(0)
      }
    }
  })

  it('quedan fuera los casos discutidos', () => {
    const ids = cat => CATEGORIAS[cat].items.map(x => x.id)
    // ciudades en población (municipio vs área metropolitana)
    for (const id of ids('poblacion')) expect(['madrid', 'barcelona', 'paris', 'londres', 'nueva-york']).not.toContain(id)
    // países con dos superficies «oficiales»
    for (const id of ['francia', 'noruega', 'marruecos', 'dinamarca']) expect(ids('superficie')).not.toContain(id)
    // el Misisipi (con o sin el Misuri)
    expect(ids('rios')).not.toContain('misisipi')
  })

  it('cada ronda respeta el margen de su magnitud y de su nivel, también encadenada', () => {
    for (const [nivel, N] of Object.entries(NIVELES)) {
      let anterior = null
      const cats = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { anterior })
        const a = item(r.cat, r.anterior), b = item(r.cat, r.actual)
        const c = Math.max(a.v, b.v) / Math.min(a.v, b.v)
        expect(c, r.id).toBeGreaterThanOrEqual(Math.max(N.min, CATEGORIAS[r.cat].margen))
        expect(c, r.id).toBeLessThanOrEqual(N.max)
        expect(esCorrecta(r, b.v > a.v ? 'mas' : 'menos')).toBe(true)
        expect(esCorrecta(r, b.v > a.v ? 'menos' : 'mas')).toBe(false)
        for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l)).toContain(valor(r.cat, b.v, l))
        const q = schemaQuestion(r, 'es')
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        cats.add(r.cat)
        anterior = { cat: r.cat, id: r.actual }
      }
      expect([...cats].sort()).toEqual(Object.keys(CATEGORIAS).sort())
    }
  })

  it('los ejemplos de la ficha y de la página son ciertos', () => {
    const p = id => item('poblacion', id).v
    expect(p('c-madrid')).toBeGreaterThan(p('irlanda') * 1.25)
    expect(p('c-madrid')).toBeGreaterThan(p('noruega') * 1.25)
    expect(p('portugal')).toBeGreaterThan(p('c-cataluna') * 1.25) // Cataluña → Portugal: más habitantes
    expect(item('altura', 'kilimanjaro').v).toBeGreaterThan(item('altura', 'teide').v)
    expect(valor('poblacion', 8.0e6, 'es')).toBe('8,0 millones de habitantes')
    expect(valor('poblacion', 1410e6, 'es')).toBe('1.410 millones de habitantes')
    expect(valor('poblacion', 8.0e6, 'en')).toBe('8.0 million people')
    expect(valor('superficie', 87599, 'es')).toBe('87.599 km²')
  })
})
