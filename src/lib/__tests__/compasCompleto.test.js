import { describe, it, expect } from 'vitest'
import { genRonda, genVieja, esCorrecta, respuestaBuena, sumaHueco, paleta, NIVELES, FIGURAS, COMPASES, duracion, deClave, clave, tiemposTexto, enunciado, explicacion, textoOpcion, schemaQuestion } from '../compasCompleto'

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
        const r = genVieja(nivel, { rand })
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

describe('Compás Completo · mecánicas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: cada ronda se puede resolver tocando`, () => {
      const rand = semilla(nivel.length * 131)
      const pal = paleta(nivel)
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel, { rand })
        expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
        if (r.mecanica === 'empareja') {
          expect(new Set(r.items).size).toBe(3)
          expect([...r.nombres].sort()).toEqual([...r.items].sort())
          expect(esCorrecta(r, 'empareja:2')).toBe(false)
        }
        if (r.mecanica === 'mide') {
          expect(r.bueno).toBeGreaterThanOrEqual(1)
          expect(r.bueno).toBeLessThanOrEqual(16)
          expect(esCorrecta(r, String(r.bueno + 1))).toBe(false)
        }
        if (r.mecanica === 'construye') {
          // La figura que falta está en la paleta, y dos que sumen lo mismo también valen
          expect(pal).toContain(r.bueno)
          expect(sumaHueco(respuestaBuena(r))).toBe(r.falta)
          if (r.falta === 4) expect(esCorrecta(r, 'corchea+corchea')).toBe(true)
          expect(esCorrecta(r, `${r.bueno}+${r.bueno}`)).toBe(false)
        }
        if (r.mecanica === 'barra') {
          // La barra cae justo donde la cuenta llega al compás, y en ningún otro sitio
          const d = r.seguidas.map(k => duracion(deClave(k)))
          const sumas = d.map((_, k) => d.slice(0, k + 1).reduce((a, b) => a + b, 0))
          expect(sumas.filter(x => x === COMPASES[r.compas])).toHaveLength(1)
          expect(sumas[r.barra - 1]).toBe(COMPASES[r.compas])
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
        }
      }
    })
  }
})
