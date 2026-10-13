import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, OBRAS, EPOCAS, GENEROS, ORDEN_EPOCAS, esCorrecta, cajaDe, enunciado, explicacion, schemaQuestion } from '../laBiblioteca'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('La Biblioteca', () => {
  it('obras coherentes y épocas en orden cronológico', () => {
    for (const o of OBRAS) {
      expect(EPOCAS[o.epoca], o.titulo).toBeTruthy()
      if (o.genero) expect(GENEROS[o.genero]).toBeTruthy()
    }
    expect(new Set(OBRAS.map(o => o.titulo)).size).toBe(OBRAS.length)
    // Cada época va después de la anterior: la obra más moderna de una es anterior a la más antigua de la siguiente.
    for (let i = 1; i < ORDEN_EPOCAS.length; i++) {
      const antes = OBRAS.filter(o => o.epoca === ORDEN_EPOCAS[i - 1]).map(o => o.anyo)
      const despues = OBRAS.filter(o => o.epoca === ORDEN_EPOCAS[i]).map(o => o.anyo)
      expect(Math.max(...antes), ORDEN_EPOCAS[i]).toBeLessThan(Math.min(...despues))
    }
    for (const e of ORDEN_EPOCAS) expect(OBRAS.filter(o => o.epoca === e).length, e).toBeGreaterThanOrEqual(2)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 409)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'autores') expect(new Set(r.libros.map(k => OBRAS[k].autor)).size).toBe(3)
        if (r.tipo === 'generos') for (const k of r.libros) expect(OBRAS[k].genero).toBeTruthy()
        if (r.tipo === 'estanteria') {
          for (const k of r.libros) { expect(OBRAS[k].sinEpoca).toBe(false); expect(r.cajas).toContain(cajaDe(r, k)) }
          // Baldas en orden cronológico.
          const ix = r.cajas.map(c => ORDEN_EPOCAS.indexOf(c))
          expect([...ix].sort((a, b) => a - b)).toEqual(ix)
        }
        if (r.tipo === 'orden') {
          const o = r.bueno.split(',').map(Number)
          for (let k = 1; k < o.length; k++) expect(OBRAS[o[k]].anyo).toBeGreaterThan(OBRAS[o[k - 1]].anyo)
        }
        if (r.tipo === 'rasgos') for (const e of r.epocas) expect(EPOCAS[e].rasgos[0]).not.toMatch(/1[0-9]{3}/)
        expect(explicacion(r)).not.toMatch(/undefined/)
        expect(enunciado(r)).toBeTruthy()
        const q = schemaQuestion(r)
        expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
      expect(GENEROS).toBeTruthy()
    })
  }
})
