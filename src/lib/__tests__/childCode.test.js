// El código de acceso del hijo es una credencial: entra directo en la cuenta
// del padre sin contraseña. Lo que se vigila aquí es que el alfabeto no tenga
// caracteres confundibles (un niño lo teclea a mano) y que cliente y servidor
// normalicen igual — si no coinciden, un código válido se rechaza.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { formatChildCode } from '../childCode.js'

const adminSrc = readFileSync(new URL('../../../api/_admin.js', import.meta.url), 'utf8')
const ALPHABET = adminSrc.match(/CODE_ALPHABET = '([^']+)'/)[1]
const LENGTH = Number(adminSrc.match(/CODE_LENGTH = (\d+)/)[1])

describe('alfabeto del código', () => {
  it('no contiene caracteres que un niño confunda al teclear', () => {
    // 0/O y 1/I/L son el clásico "me lo has dado mal, papá".
    for (const c of ['0', 'O', '1', 'I', 'L']) {
      expect(ALPHABET.includes(c), `el alfabeto no debería incluir "${c}"`).toBe(false)
    }
  })

  it('no repite ningún carácter', () => {
    expect(new Set(ALPHABET).size).toBe(ALPHABET.length)
  })

  it('tiene entropía de sobra para ser una credencial', () => {
    // El endpoint no puede limitar la fuerza bruta de forma fiable (el freno
    // es por instancia de lambda), así que la defensa real es esta: con 31^12
    // no se acierta probando.
    const bits = LENGTH * Math.log2(ALPHABET.length)
    expect(bits).toBeGreaterThan(55)
  })
})

describe('formatChildCode', () => {
  it('agrupa de cuatro en cuatro para poder copiarlo sin fallar', () => {
    expect(formatChildCode('ABCDEFGH2345')).toBe('ABCD-EFGH-2345')
  })

  it('la longitud real se parte en grupos exactos', () => {
    const code = 'A'.repeat(LENGTH)
    const groups = formatChildCode(code).split('-')
    expect(groups.length).toBe(Math.ceil(LENGTH / 4))
    expect(groups.join('')).toBe(code)
  })

  it('no revienta sin código', () => {
    expect(formatChildCode(null)).toBe('')
    expect(formatChildCode('')).toBe('')
  })
})

describe('normalización cliente ↔ servidor', () => {
  // Reimplementación literal de normalizeCode() en api/_admin.js. Si allí
  // cambia, este test falla y obliga a mirar los dos lados: el niño escribe el
  // código como le da la gana y el servidor tiene que reconocerlo igual.
  const normalize = raw => String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '')

  it('el formato que se le enseña al padre sobrevive al viaje de vuelta', () => {
    const code = 'ABCDEFGH2345'
    expect(normalize(formatChildCode(code))).toBe(code)
  })

  it('da igual cómo lo teclee el niño', () => {
    for (const typed of ['abcd-efgh-2345', 'ABCD EFGH 2345', 'abcdefgh2345', '  ABCD-efgh-2345  ']) {
      expect(normalize(typed)).toBe('ABCDEFGH2345')
    }
  })

  it('la regex del servidor sigue siendo la que este test asume', () => {
    expect(adminSrc).toContain("replace(/[^A-Z0-9]/g, '')")
  })
})
