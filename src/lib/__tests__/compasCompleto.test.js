import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, FIGURAS, COMPASES, duracion, deClave, clave, tiemposTexto, enunciado, explicacion, textoOpcion, schemaQuestion } from '../compasCompleto'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Compás Completo', () => {
  it('duraciones', () => {
    expect(FIGURAS.negra.dur).toBe(4)
    expect(duracion({ f: 'blanca', puntillo: true })).toBe(12)
    expect(tiemposTexto(12, 'es')).toBe('3 tiempos')
    expect(tiemposTexto(2, 'es')).toBe('½ tiempo')
    expect(tiemposTexto(6, 'en')).toBe('1½ beats')
    expect(clave(deClave('corchea.S'))).toBe('corchea.S')
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas`, { timeout: 60000 }, () => {
      const rand = semilla(nivel.length * 47)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        if (r.tipo === 'tiempos') expect(r.bueno).toBe(duracion(deClave(r.figura)))
        if (r.tipo === 'hueco') {
          const total = COMPASES[r.compas]
          const notas = r.notas.map(deClave)
          expect(notas.reduce((a, n) => a + duracion(n), 0)).toBe(total)
          const resto = total - notas.filter((_, k) => k !== r.hueco).reduce((a, n) => a + duracion(n), 0)
          // Solo una opción completa el compás.
          expect(r.opciones.filter(o => duracion(deClave(o)) === resto)).toEqual([r.bueno])
        }
        if (r.tipo === 'compas') {
          const partes = r.notas.join(',').split(',|,').map(p => p.split(',').map(deClave))
          for (const p of partes) expect(p.reduce((a, n) => a + duracion(n), 0)).toBe(COMPASES[r.bueno])
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(new Set(r.opciones.map(o => textoOpcion(o, r, l))).size).toBe(r.opciones.length)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          expect(enunciado(r, l)).toBeTruthy()
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(r.opciones.length - 1)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
