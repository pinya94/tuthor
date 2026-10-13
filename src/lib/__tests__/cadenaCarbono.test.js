import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, TODAS, nombre, condensada, atomos, formulaClave, hDelDibujo, valida, clave, canon, claveConstruida, deConstruida, isomerosDe, carbonos, esCorrecta, molecula, enunciado, explicacion, schemaQuestion, PIEZAS, PIEZA_FAM, DONDE } from '../cadenaCarbono'

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

  it('el constructor puede montar todas las moléculas, y al revés también vale', () => {
    // Todo lo que se puede construir, con su clave normalizada.
    const construibles = new Set()
    for (let n = 1; n <= 6; n++) {
      construibles.add(claveConstruida({ n, extra: null }))
      for (const t of PIEZAS) {
        const posiciones = DONDE[t] === 'extremo' ? [undefined] : DONDE[t] === 'enlace' ? Array.from({ length: n - 1 }, (_, k) => k + 1) : DONDE[t] === 'interior' ? Array.from({ length: Math.max(0, n - 2) }, (_, k) => k + 2) : Array.from({ length: n }, (_, k) => k + 1)
        for (const pos of posiciones) construibles.add(claveConstruida({ n, extra: { t, pos } }))
      }
    }
    for (const m of TODAS) expect(construibles.has(clave(m)), nombre(m)).toBe(true)
    // Montar but-3-eno (el doble enlace en el enlace 3) es but-1-eno: la misma molécula.
    expect(claveConstruida({ n: 4, extra: { t: 'doble', pos: 3 } })).toBe('alqueno|4|1|0')
    expect(claveConstruida({ n: 5, extra: { t: 'rama', pos: 4 } })).toBe('alcano|5|0|2')
    for (const m of TODAS) expect(clave(canon(m))).toBe(clave(m))
    expect(Object.keys(PIEZA_FAM).sort()).toEqual([...PIEZAS].sort())
    expect(deConstruida({ n: 3, extra: null }).fam).toBe('alcano')
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas`, { timeout: 30000 }, () => {
      const rand = semilla(nivel.length * 77)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        const m = molecula(r)
        expect(valida(m)).toBe(true)
        expect(esCorrecta(r, r.bueno), r.tipo).toBe(true)
        if (r.tipo === 'construye') expect(esCorrecta(r, 'invalido')).toBe(false)
        if (r.tipo === 'numera') {
          // El otro extremo es la trampa: su número no es 1.
          const cs = carbonos(m)
          expect(esCorrecta(r, String(cs[cs.length - 1].num))).toBe(false)
        }
        if (r.tipo === 'isomero') {
          expect(isomerosDe(m).length).toBeGreaterThan(0)
          expect(esCorrecta(r, clave(m))).toBe(false)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined/)
          expect(explicacion(r, l, r.bueno)).not.toMatch(/undefined|NaN/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(1)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
