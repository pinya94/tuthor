// Los exámenes de álgebra generados: ninguna ronda puede traer una respuesta
// mal calculada. Se generan cientos por nivel y cada respuesta se sustituye en
// sus ecuaciones con aritmética exacta.
import { describe, it, expect } from 'vitest'
import { genRound, comprobar, respuestaTexto, EXAMENES } from '../examenesAlgebra'
import { frac, sumar, multiplicar, iguales, fracTexto, esCero } from '../expresion'

const NIVELES = ['facil', 'medio', 'dificil']
const VECES = 300
const cadaRonda = (examen, fn) => {
  for (const nivel of NIVELES) {
    for (let i = 0; i < VECES; i++) fn(genRound(examen, nivel), nivel)
  }
}
// Respuesta correcta como la escribiría un alumno
const escrita = x => fracTexto(x).replace('−', '-')

describe('ecuaciones de segundo grado', () => {
  it('cada solución cumple la ecuación, y sin solución el discriminante es negativo', () => {
    cadaRonda('ecuaciones-segundo-grado-test', (r, nivel) => {
      const { a, b, c } = r.coeficientes
      expect(a, r.clave).not.toBe(0)
      for (const x of r.respuesta.soluciones) {
        const valor = sumar(sumar(multiplicar(frac(a), multiplicar(x, x)), multiplicar(frac(b), x)), frac(c))
        expect(esCero(valor), `${r.clave} con x = ${fracTexto(x)}`).toBe(true)
      }
      if (!r.respuesta.soluciones.length) {
        expect(b * b - 4 * a * c, r.clave).toBeLessThan(0)
        expect(nivel, 'sin solución solo en difícil').toBe('dificil')
      }
      if (nivel === 'facil') expect(a).toBe(1)
    })
  })

  it('acepta las soluciones en cualquier orden, repetidas o como decimal', () => {
    cadaRonda('ecuaciones-segundo-grado-test', r => {
      const s = r.respuesta.soluciones
      if (!s.length) {
        expect(comprobar(r, { sinSolucion: true })).toBe(true)
        expect(comprobar(r, { x1: '1' })).toBe(false)
        return
      }
      expect(comprobar(r, { x1: escrita(s[0]), x2: escrita(s[s.length - 1]) }), r.clave).toBe(true)
      expect(comprobar(r, { x1: escrita(s[s.length - 1]), x2: escrita(s[0]) }), r.clave).toBe(true)
      expect(comprobar(r, { sinSolucion: true }), r.clave).toBe(false)
      if (s.length === 2) expect(comprobar(r, { x1: escrita(s[0]) }), `${r.clave}: falta una`).toBe(false)
      if (s.length === 1) expect(comprobar(r, { x1: escrita(s[0]), x2: escrita(s[0]) }), r.clave).toBe(true)
    })
    const r = genRound('ecuaciones-segundo-grado-test', 'facil', () => 0.99)
    expect(comprobar(r, { x1: 'hola' })).toBe(false)
  })

  it('una solución fraccionaria se acepta también en decimal', () => {
    let probado = false
    cadaRonda('ecuaciones-segundo-grado-test', r => {
      const fraccion = r.respuesta.soluciones.find(x => x.d === 2)
      if (!fraccion || r.respuesta.soluciones.length !== 2) return
      const otra = r.respuesta.soluciones.find(x => x !== fraccion)
      expect(comprobar(r, { x1: String(fraccion.n / fraccion.d).replace('.', ','), x2: escrita(otra) }), r.clave).toBe(true)
      probado = true
    })
    expect(probado).toBe(true)
  })
})

describe('sistemas de ecuaciones', () => {
  it('la solución cumple las dos ecuaciones y el sistema tiene solución única', () => {
    cadaRonda('sistemas-ecuaciones-test', (r, nivel) => {
      const { a1, b1, c1, a2, b2, c2 } = r.coeficientes
      const { x, y } = r.respuesta
      expect(iguales(sumar(multiplicar(frac(a1), x), multiplicar(frac(b1), y)), frac(c1)), r.clave).toBe(true)
      expect(iguales(sumar(multiplicar(frac(a2), x), multiplicar(frac(b2), y)), frac(c2)), r.clave).toBe(true)
      expect(a1 * b2 - a2 * b1, r.clave).not.toBe(0)
      if (nivel === 'facil') expect(a1).toBe(1)
      expect(comprobar(r, { x: escrita(x), y: escrita(y) }), r.clave).toBe(true)
      expect(comprobar(r, { x: escrita(y), y: escrita(x) }) === iguales(x, y), r.clave).toBe(true)
    })
  })

  it('los pasos terminan en la solución', () => {
    cadaRonda('sistemas-ecuaciones-test', r => {
      const texto = r.pasos.map(p => p.es).join('\n')
      expect(texto, r.clave).toContain(`x = ${fracTexto(r.respuesta.x)}`)
      expect(texto, r.clave).toContain(`y = ${fracTexto(r.respuesta.y)}`)
      expect(texto, r.clave).toContain('✓')
    })
  })
})

describe('rectas', () => {
  it('la respuesta es la de la recta del enunciado', () => {
    const tipos = new Set()
    cadaRonda('rectas-test', r => {
      tipos.add(r.tipo)
      const respuesta = Object.fromEntries(r.campos.map(c => [c.id, escrita(r.respuesta[c.id])]))
      expect(comprobar(r, respuesta), r.clave).toBe(true)
      // Cambiar cualquier campo en una unidad la vuelve incorrecta
      for (const c of r.campos) {
        const mal = { ...respuesta, [c.id]: escrita(sumar(r.respuesta[c.id], frac(1))) }
        expect(comprobar(r, mal), `${r.clave} ${c.id}`).toBe(false)
      }
      // La explicación llega a la respuesta. No se busca "b = −1" suelto: en la
      // ecuación b sale como resta ("y = 5x − 1"), así que se busca la
      // ecuación entera, que es lo que el alumno tiene que ver.
      const texto = r.pasos.map(p => p.es).join('\n')
      if (r.tipo === 'corte') expect(texto, r.clave).toContain(`y = ${fracTexto(r.respuesta.y)}`)
      else expect(texto, r.clave).toContain(r.ecuacion)
    })
    expect([...tipos].sort()).toEqual(['corte', 'dos-puntos', 'pendiente-punto'])
  })

  it('en fácil no hay punto de corte ni pendientes fraccionarias', () => {
    for (let i = 0; i < VECES; i++) {
      const r = genRound('rectas-test', 'facil')
      expect(r.tipo).not.toBe('corte')
      if (r.respuesta.m) expect(r.respuesta.m.d).toBe(1)
    }
  })
})

describe('los tres exámenes', () => {
  it('cada ronda tiene enunciado en tres idiomas, casillas y explicación', () => {
    for (const examen of Object.keys(EXAMENES)) {
      cadaRonda(examen, r => {
        for (const l of ['es', 'en', 'ca']) expect(r.enunciado[l], `${examen} ${l}`).toBeTruthy()
        expect(r.campos.length).toBeGreaterThan(0)
        expect(r.pasos.length, r.clave).toBeGreaterThan(2)
        expect(respuestaTexto(r, 'es')).toBeTruthy()
      })
    }
  })

  it('diez rondas seguidas no se repiten casi nunca', () => {
    // El examen sirve diez: con un espacio de preguntas pequeño saldrían
    // repetidas. La página evita repetir, pero el generador tiene que dar para
    // ello.
    for (const examen of Object.keys(EXAMENES)) {
      for (const nivel of NIVELES) {
        const claves = new Set(Array.from({ length: 200 }, () => genRound(examen, nivel).clave))
        expect(claves.size, `${examen}/${nivel}`).toBeGreaterThan(40)
      }
    }
  })
})
