// Invariantes del cuaderno de observaciones. Lo que de verdad importa: que
// agrupar y ordenar por alumno no dependa de en qué orden llegaron los
// documentos de Firestore (nunca garantizado), y que el texto vacío no cuele
// como una nota válida.
import { describe, it, expect } from 'vitest'
import { TAGS, TAG_META, TEXTO_MAX, textoValido, porAlumno, masRecientes, puntosDe } from '../observations'

const nota = (uid, ms, texto = 'x', tag = 'neutra') => ({
  uid, text: texto, tag, createdAt: { toMillis: () => ms },
})

describe('textoValido', () => {
  it('rechaza vacío y solo espacios', () => {
    expect(textoValido('')).toBe(false)
    expect(textoValido('   ')).toBe(false)
    expect(textoValido(undefined)).toBe(false)
  })

  it('acepta texto normal', () => {
    expect(textoValido('Ha ayudado a un compañero')).toBe(true)
  })

  it('rechaza por encima del máximo', () => {
    expect(textoValido('a'.repeat(TEXTO_MAX))).toBe(true)
    expect(textoValido('a'.repeat(TEXTO_MAX + 1))).toBe(false)
  })
})

describe('TAG_META', () => {
  it('cada etiqueta tiene emoji y label en los tres idiomas', () => {
    for (const tag of TAGS) {
      expect(TAG_META[tag].emoji).toBeTruthy()
      for (const lang of ['es', 'en', 'ca']) expect(TAG_META[tag].label[lang]).toBeTruthy()
    }
  })
})

describe('porAlumno', () => {
  it('agrupa por uid', () => {
    const grupos = porAlumno([nota('a', 1), nota('b', 2), nota('a', 3)])
    expect([...grupos.keys()].sort()).toEqual(['a', 'b'])
    expect(grupos.get('a')).toHaveLength(2)
  })

  it('cada grupo queda de más reciente a más antigua, sin depender del orden de llegada', () => {
    const grupos = porAlumno([nota('a', 100), nota('a', 300), nota('a', 200)])
    expect(grupos.get('a').map(o => o.createdAt.toMillis())).toEqual([300, 200, 100])
  })

  it('sin observaciones da un mapa vacío, no revienta', () => {
    expect(porAlumno([]).size).toBe(0)
  })
})

describe('masRecientes', () => {
  it('mezcla alumnos y ordena solo por fecha', () => {
    const lista = masRecientes([nota('a', 1), nota('b', 3), nota('a', 2)])
    expect(lista.map(o => o.uid)).toEqual(['b', 'a', 'a'])
  })

  it('respeta el límite', () => {
    const muchas = Array.from({ length: 30 }, (_, i) => nota('a', i))
    expect(masRecientes(muchas, 5)).toHaveLength(5)
  })

  it('no muta la lista que recibe', () => {
    const original = [nota('a', 1), nota('b', 2)]
    masRecientes(original)
    expect(original.map(o => o.uid)).toEqual(['a', 'b'])
  })
})

describe('puntosDe', () => {
  it('positivas suman, negativas restan', () => {
    const obs = [nota('a', 1, 'x', 'positiva'), nota('a', 2, 'x', 'positiva'), nota('a', 3, 'x', 'negativa')]
    expect(puntosDe(obs, 'a')).toBe(1)
  })

  it('las neutras no cuentan para el marcador', () => {
    const obs = [nota('a', 1, 'x', 'positiva'), nota('a', 2, 'x', 'neutra'), nota('a', 3, 'x', 'neutra')]
    expect(puntosDe(obs, 'a')).toBe(1)
  })

  it('solo cuenta las notas del alumno pedido', () => {
    const obs = [nota('a', 1, 'x', 'positiva'), nota('b', 2, 'x', 'negativa')]
    expect(puntosDe(obs, 'a')).toBe(1)
    expect(puntosDe(obs, 'b')).toBe(-1)
  })

  it('sin notas, el marcador es 0, no null ni NaN', () => {
    expect(puntosDe([], 'a')).toBe(0)
  })
})
