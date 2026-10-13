import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, OBRAS, EPOCAS, ORDEN_EPOCAS, GENEROS, enunciado, explicacion, textoOpcion, schemaQuestion } from '../laBiblioteca'

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
    it(`${nivel}: 600 rondas`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 389)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(r.opciones.length).toBeGreaterThanOrEqual(3)
        if (r.tipo === 'autor') expect(r.bueno).toBe(OBRAS[r.obra].autor)
        if (r.tipo === 'genero') expect(r.bueno).toBe(OBRAS[r.obra].genero)
        if (r.tipo === 'epoca') { expect(OBRAS[r.obra].sinEpoca).toBe(false); expect(r.bueno).toBe(OBRAS[r.obra].epoca) }
        if (r.tipo === 'orden') {
          const anyos = r.opciones.map(k => OBRAS[k].anyo)
          expect(OBRAS[r.bueno].anyo).toBe(Math.min(...anyos))
          expect(anyos.filter(a => a === Math.min(...anyos))).toHaveLength(1)
        }
        expect(new Set(r.opciones.map(o => textoOpcion(o, r))).size).toBe(r.opciones.length)
        expect(explicacion(r)).not.toMatch(/undefined/)
        expect(enunciado(r)).toBeTruthy()
        expect(schemaQuestion(r).wrongAnswers).toHaveLength(r.opciones.length - 1)
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
