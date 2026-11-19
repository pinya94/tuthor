import { describe, it, expect } from 'vitest'
import { NIVELES, area, perimetro, bordes, conexa, tieneHueco, esRectangulo, perimetroMax, perimetroMin, valida, esCorrecta, genRonda, enunciado, pista, explicacion, schemaQuestion } from '../construyeFigura'

const fila = (r, c0, c1) => Array.from({ length: c1 - c0 + 1 }, (_, i) => `${r},${c0 + i}`)

describe('Construye la Figura', () => {
  it('área y perímetro de figuras conocidas', () => {
    const rect = [...fila(0, 0, 3), ...fila(1, 0, 3)] // 4 × 2
    expect(area(rect)).toBe(8)
    expect(perimetro(rect)).toBe(12)
    expect(bordes(rect)).toHaveLength(12)
    expect(esRectangulo(rect)).toEqual([4, 2])
    const L = ['0,0', '1,0', '2,0', '2,1'] // L de 4
    expect(perimetro(L)).toBe(10)
    expect(esRectangulo(L)).toBe(null)
    expect(perimetro(['0,0'])).toBe(4)
  })

  it('una pieza y sin agujeros', () => {
    expect(conexa(['0,0', '1,1'])).toBe(false) // solo por la esquina
    expect(conexa(['0,0', '0,1'])).toBe(true)
    const anillo = [...fila(0, 0, 2), '1,0', '1,2', ...fila(2, 0, 2)]
    expect(tieneHueco(anillo)).toBe(true)
    expect(tieneHueco([...fila(0, 0, 2), ...fila(1, 0, 2)])).toBe(false)
    expect(valida({ tipo: 'area', A: 8 }, anillo).motivo).toBe('hueco')
    expect(valida({ tipo: 'area', A: 2 }, ['0,0', '1,1']).motivo).toBe('separada')
    expect(valida({ tipo: 'area', A: 2 }, []).motivo).toBe('vacia')
  })

  it('perímetro mínimo y máximo coinciden con la fuerza bruta', () => {
    // Todas las figuras de área ≤ 7 en un 4×4 (sin agujeros, de una pieza)
    const N = 4, extremos = {}
    for (let m = 1; m < 1 << (N * N); m++) {
      const cells = []
      for (let i = 0; i < N * N; i++) if (m & (1 << i)) cells.push(`${Math.floor(i / N)},${i % N}`)
      if (cells.length > 7 || !conexa(cells) || tieneHueco(cells)) continue
      const a = cells.length, p = perimetro(cells)
      extremos[a] = { min: Math.min(extremos[a]?.min ?? 99, p), max: Math.max(extremos[a]?.max ?? 0, p) }
    }
    for (let a = 1; a <= 7; a++) {
      expect(perimetroMin(a), `min ${a}`).toBe(extremos[a].min)
      expect(perimetroMax(a), `max ${a}`).toBe(extremos[a].max)
    }
  })

  it('cada ronda tiene solución: su ejemplo cabe en la cuadrícula y la cumple', () => {
    for (const nivel of Object.keys(NIVELES)) {
      const tipos = new Set()
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel)
        tipos.add(r.tipo)
        expect(r.ejemplo, r.id).toBeTruthy()
        for (const s of r.ejemplo) {
          const [f, c] = s.split(',').map(Number)
          expect(f >= 0 && c >= 0 && f < r.n && c < r.n, `${r.id} ${s}`).toBe(true)
        }
        expect(valida(r, r.ejemplo), r.id).toEqual({ ok: true })
        expect(esCorrecta(r, [])).toBe(false)
        if (r.tipo === 'otra') {
          expect(area(r.muestra)).toBe(r.A)
          expect(perimetro(r.muestra)).toBe(r.P0)
          expect(r.P).not.toBe(r.P0)
          expect(esCorrecta(r, r.muestra)).toBe(false)
        }
        if (r.tipo === 'max' || r.tipo === 'min') expect(perimetroMax(r.A)).toBeGreaterThan(perimetroMin(r.A))
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r)[l]).toBeTruthy()
          expect(pista(r)[l]).toBeTruthy()
          expect(explicacion(r, r.ejemplo, l)).toBeTruthy()
          expect(explicacion(r, ['0,0'], l)).toBeTruthy()
        }
        const q = schemaQuestion(r, 'es')
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
      }
      expect(tipos.size).toBeGreaterThanOrEqual(2)
    }
  })

  it('acepta cualquier figura que cumpla, no solo la del ejemplo', () => {
    const r = { tipo: 'ap', A: 4, P: 10 }
    expect(esCorrecta(r, ['0,0', '1,0', '2,0', '2,1'])).toBe(true) // L
    expect(esCorrecta(r, ['0,0', '0,1', '0,2', '1,1'])).toBe(true) // T
    expect(esCorrecta(r, fila(0, 0, 3))).toBe(true) // palo
    expect(esCorrecta(r, ['0,0', '0,1', '1,0', '1,1'])).toBe(false) // cuadrado: perímetro 8
    expect(esCorrecta({ tipo: 'rectP', P: 10 }, fila(0, 0, 3))).toBe(true) // 4 × 1
    expect(esCorrecta({ tipo: 'rectP', P: 10 }, ['0,0', '1,0', '2,0', '2,1'])).toBe(false) // L de perímetro 10
  })
})
