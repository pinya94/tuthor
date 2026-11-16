import { describe, it, expect } from 'vitest'
import { BANCO, HABLANTES, partes, bandeja, genRonda, esCorrecta, fraseCorrecta, fraseCon, explicacion, schemaQuestion } from '../elMensajero'

const huecosDe = ps => ps.filter(p => typeof p !== 'string')

describe('El Mensajero', () => {
  it('cada frase del banco, con cada hablante, se puede resolver con las fichas y las trampas no valen', () => {
    for (const [nivel, frases] of Object.entries(BANCO)) {
      expect(frases.length, nivel).toBeGreaterThanOrEqual(12)
      frases.forEach((f, i) => {
        for (const h of HABLANTES) {
          const ps = partes(f.ind, h)
          const hs = huecosDe(ps)
          const id = `${nivel}#${i} ${h.n}`
          expect(hs.length, id).toBeGreaterThanOrEqual(1)
          expect(ps.join('')).not.toMatch(/\{|\}/) // todo sustituido
          for (const hu of hs) {
            expect(hu.trampas.length, id).toBeGreaterThanOrEqual(1)
            for (const t of hu.trampas) expect(hu.ok, `${id}: la trampa «${t}» es una respuesta buena`).not.toContain(t)
          }
          // Las fichas alcanzan para la respuesta buena (cuenta de repeticiones)
          const fichas = bandeja(ps).map(x => x.texto)
          const quedan = [...fichas]
          for (const hu of hs) {
            const j = quedan.indexOf(hu.ok[0])
            expect(j, `${id}: falta la ficha ${hu.ok[0]}`).toBeGreaterThanOrEqual(0)
            quedan.splice(j, 1)
          }
          const r = { partes: ps, notas: f.notas, directa: f.dir }
          expect(esCorrecta(r, hs.map(x => x.ok[0])), id).toBe(true)
          expect(esCorrecta(r, hs.map(x => x.trampas[0])), id).toBe(false)
          // Frase final bien escrita: sin dobles espacios ni espacio antes del punto
          const buena = fraseCon(r, hs.map(x => x.ok[0]))
          expect(buena, id).not.toMatch(/ {2}| \.|\(that\) \(/)
          expect(buena.endsWith('.'), id).toBe(true)
          for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length, id).toBeGreaterThan(40)
          const q = schemaQuestion(r, 'es')
          expect(q.wrongAnswers.length, id).toBe(3)
          expect(q.wrongAnswers, id).not.toContain(q.correctAnswer)
        }
      })
    }
  })

  it('genRonda trae directa, huecos y fichas, y no repite enseguida', () => {
    const ids = []
    for (let i = 0; i < 6; i++) {
      const r = genRonda('medio')
      expect(r.directa).toMatch(/^“/)
      expect(r.fichas.length).toBeGreaterThan(huecosDe(r.partes).length)
      ids.push(r.id.split(':').slice(0, 2).join(':'))
    }
    expect(new Set(ids).size).toBe(6)
  })

  it('ejemplos que dicen los libros', () => {
    const tom = HABLANTES[0], anna = HABLANTES[1]
    const r1 = { partes: partes(BANCO.facil[0].ind, anna), notas: ['afirma'] }
    expect(fraseCon(r1, ['she', 'was'])).toBe('Anna said (that) she was tired.')
    expect(explicacion(r1, 'es')).toContain('I → she · am → was')
    const pregunta = BANCO.dificil.find(f => f.dir.startsWith('“Where do you live?'))
    const r2 = { partes: partes(pregunta.ind, tom), notas: pregunta.notas }
    expect(fraseCon(r2, ['I', 'lived'])).toBe('Tom asked me where I lived.')
    expect(explicacion(r2, 'es')).toContain('you → I · live → lived')
    expect(esCorrecta(r2, ['did', 'lived'])).toBe(false)
    const siNo = BANCO.dificil[0]
    const r3 = { partes: partes(siNo.ind, tom), notas: siNo.notas }
    expect(esCorrecta(r3, ['whether', 'I', 'was coming'])).toBe(true)
    expect(esCorrecta(r3, ['if', 'I', 'was coming'])).toBe(true)
    expect(fraseCorrecta(r3)).toBe('Tom asked me if / whether I was coming to the party.')
  })
})
