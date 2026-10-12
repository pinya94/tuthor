import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, TODAS, nombre, condensada, atomos, formulaClave, hDelDibujo, deClave, valida, enunciado, explicacion, textoOpcion, schemaQuestion } from '../cadenaCarbono'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const M = (fam, n, loc = 0, rama = 0) => ({ fam, n, loc, rama })

describe('Cadena de Carbono', () => {
  it('nombres y fórmulas de los libros', () => {
    const casos = [
      [M('alcano', 1), 'metano', 'methane', 'metà', 'CH₄'],
      [M('alcano', 4), 'butano', 'butane', 'butà', 'CH₃–CH₂–CH₂–CH₃'],
      [M('alcano', 3, 0, 2), '2-metilpropano', '2-methylpropane', '2-metilpropà', 'CH₃–CH(CH₃)–CH₃'],
      [M('alqueno', 2, 1), 'eteno', 'ethene', 'etè', 'CH₂=CH₂'],
      [M('alqueno', 4, 2), 'but-2-eno', 'but-2-ene', 'but-2-è', 'CH₃–CH=CH–CH₃'],
      [M('alquino', 2, 1), 'etino', 'ethyne', 'etí', 'CH≡CH'],
      [M('alcohol', 1, 1), 'metanol', 'methanol', 'metanol', 'CH₃OH'],
      [M('alcohol', 2, 1), 'etanol', 'ethanol', 'etanol', 'CH₃–CH₂OH'],
      [M('alcohol', 3, 2), 'propan-2-ol', 'propan-2-ol', 'propan-2-ol', 'CH₃–CH(OH)–CH₃'],
      [M('aldehido', 1, 1), 'metanal', 'methanal', 'metanal', 'HCHO'],
      [M('aldehido', 2, 1), 'etanal', 'ethanal', 'etanal', 'CH₃–CHO'],
      [M('cetona', 3, 2), 'propanona', 'propanone', 'propanona', 'CH₃–CO–CH₃'],
      [M('cetona', 5, 3), 'pentan-3-ona', 'pentan-3-one', 'pentan-3-ona', 'CH₃–CH₂–CO–CH₂–CH₃'],
      [M('acido', 2, 1), 'ácido etanoico', 'ethanoic acid', 'àcid etanoic', 'CH₃–COOH'],
      [M('acido', 1, 1), 'ácido metanoico', 'methanoic acid', 'àcid metanoic', 'HCOOH'],
      [M('amina', 1, 1), 'metanamina', 'methanamine', 'metanamina', 'CH₃NH₂'],
    ]
    for (const [m, es, en, ca, cond] of casos) {
      expect(valida(m), es).toBe(true)
      expect([nombre(m, 'es'), nombre(m, 'en'), nombre(m, 'ca')]).toEqual([es, en, ca])
      expect(condensada(m)).toBe(cond)
    }
    expect(formulaClave(atomos(M('alcohol', 2, 1)))).toBe('C2H6O1N0')
    expect(formulaClave(atomos(M('alcano', 4, 0, 2)))).toBe('C5H12O0N0')
    // La numeración buena es la más baja: but-3-eno o propan-3-ol no existen.
    expect(valida(M('alqueno', 4, 3))).toBe(false)
    expect(valida(M('alcohol', 3, 3))).toBe(false)
  })

  it('cada carbono forma 4 enlaces: los H del dibujo cuadran con la fórmula', () => {
    for (const m of TODAS) expect(hDelDibujo(m), nombre(m)).toBe(atomos(m).H)
    // Ninguna molécula repite nombre ni fórmula semidesarrollada.
    for (const l of ['es', 'en', 'ca']) expect(new Set(TODAS.map(m => nombre(m, l))).size).toBe(TODAS.length)
    expect(new Set(TODAS.map(condensada)).size).toBe(TODAS.length)
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 600 rondas con la respuesta bien`, { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 7919)
      const tipos = new Set()
      for (let i = 0; i < 600; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        const m = deClave(r.mol)
        expect(valida(m)).toBe(true)
        expect(r.opciones).toContain(r.bueno)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        if (r.tipo === 'familia') expect(r.bueno).toBe(m.fam)
        if (r.tipo === 'nombre' || r.tipo === 'estructura') expect(r.bueno).toBe(r.mol)
        if (r.tipo === 'formula') expect(r.bueno).toBe(formulaClave(atomos(m)))
        if (r.tipo === 'isomero') {
          const f = formulaClave(atomos(m))
          for (const o of r.opciones) expect(formulaClave(atomos(deClave(o))) === f, o).toBe(o === r.bueno)
          expect(r.bueno).not.toBe(r.mol)
        }
        // Las opciones que nombran moléculas: solo la buena es esa molécula.
        if (r.tipo === 'nombre') for (const o of r.opciones) if (o !== r.bueno) expect(nombre(deClave(o))).not.toBe(nombre(m))
        if (r.tipo === 'estructura') for (const o of r.opciones) if (o !== r.bueno) { expect(valida(deClave(o))).toBe(true); expect(condensada(deClave(o))).not.toBe(condensada(m)) }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN/)
          const textos = r.opciones.map(o => textoOpcion(o, r, l))
          expect(new Set(textos).size).toBe(4)
          for (const t of textos) expect(t).not.toMatch(/undefined|NaN/)
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(3)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
