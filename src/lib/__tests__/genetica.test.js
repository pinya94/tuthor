// Invariantes de Genética. En un juego de ciencias lo grave no es que falle
// la UI, es enseñar biología incorrecta: estos tests comprueban que el cuadro
// de Punnett es el que toca, que la respuesta marcada como correcta se deduce
// del cuadro, y que los distractores son de verdad falsos.
import { describe, it, expect } from 'vitest'
import { genRound, punnett, esDominante, cuentaDominante, fenotipoDe, RASGOS } from '../genetica.js'

function seededRand(seed) {
  let s = seed
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
}

const NIVELES = ['facil', 'medio', 'dificil']
const dosis = g => [...g].filter(c => c === c.toUpperCase()).length

describe('punnett', () => {
  it('combina cada alelo del padre con cada uno de la madre', () => {
    expect(punnett('Aa', 'Aa')).toEqual(['AA', 'Aa', 'Aa', 'aa'])
    expect(punnett('AA', 'aa')).toEqual(['Aa', 'Aa', 'Aa', 'Aa'])
    // Filas = alelos del primer progenitor, columnas = los del segundo
    expect(punnett('Aa', 'aa')).toEqual(['Aa', 'Aa', 'aa', 'aa'])
    expect(punnett('aa', 'aa')).toEqual(['aa', 'aa', 'aa', 'aa'])
  })

  it('normaliza el orden: el alelo dominante va primero', () => {
    expect(punnett('aA', 'aa').every(g => g === 'Aa' || g === 'aa')).toBe(true)
  })

  it('3:1 en el cruce de dos heterocigotos (el caso de Mendel)', () => {
    expect(cuentaDominante(punnett('Aa', 'Aa'))).toBe(3)
  })
})

describe('genRound', () => {
  it('el cuadro corresponde siempre a los padres', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 13 + 3)
      for (let n = 0; n < 300; n++) {
        const r = genRound(level, rand)
        expect(r.cuadro, `${level}/${r.tipo}`).toEqual(punnett(r.padres[0], r.padres[1]))
        expect(r.cuadro.length).toBe(4)
      }
    }
  })

  it('la respuesta correcta se deduce del cuadro, y está entre las opciones', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 29 + 7)
      for (let n = 0; n < 300; n++) {
        const r = genRound(level, rand)
        const ids = r.opciones.map(o => o.id)
        expect(ids, `${r.tipo}: la correcta no está entre las opciones`).toContain(r.correcta)
        expect(new Set(ids).size, `${r.tipo}: opciones duplicadas`).toBe(ids.length)

        if (r.tipo === 'deduce') {
          // El genotipo marcado como correcto DEBE poder dar descendencia
          // recesiva; ninguno de los distractores puede.
          for (const o of r.opciones) {
            const [a, b] = o.id.split('x')
            const puede = punnett(a, b).some(g => dosis(g) === 0)
            expect(puede, `${r.tipo}: ${o.id} debería ${o.id === r.correcta ? '' : 'NO '}poder dar recesivo`)
              .toBe(o.id === r.correcta)
          }
        } else {
          // Contar en el cuadro las casillas del fenotipo preguntado
          const n2 = r.cuadro.filter(g => fenotipoDe(r, g) === r.fenotipoPreguntado).length
          expect(String(n2), `${r.tipo}: ${r.padres.join('×')} → esperado ${n2}`).toBe(r.correcta)
        }
      }
    }
  })

  it('nunca cruza dos homocigotos iguales (respuesta trivial 4:0)', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 5 + 11)
      for (let n = 0; n < 300; n++) {
        const r = genRound(level, rand)
        if (r.tipo !== 'predice') continue
        const [d1, d2] = r.padres.map(dosis)
        expect(!(d1 === d2 && d1 !== 1), `predice: ${r.padres.join('×')} es trivial`).toBe(true)
      }
    }
  })

  it('en dominancia incompleta el heterocigoto es un tercer fenotipo', () => {
    const rand = seededRand(99)
    let vistos = 0
    for (let n = 0; n < 400; n++) {
      const r = genRound('dificil', rand)
      if (r.tipo !== 'incompleta') continue
      vistos++
      const het = r.cuadro.find(g => dosis(g) === 1)
      if (het) {
        expect(fenotipoDe(r, het)).toBe(r.rasgo.het)
        expect(fenotipoDe(r, het)).not.toBe(r.rasgo.hom)
      }
    }
    expect(vistos, 'no salió ninguna ronda de dominancia incompleta').toBeGreaterThan(0)
  })

  it('toda ronda trae pregunta y explicación en los tres idiomas', () => {
    for (const level of NIVELES) {
      const rand = seededRand(level.length * 41 + 17)
      for (let n = 0; n < 120; n++) {
        const r = genRound(level, rand)
        for (const l of ['es', 'en', 'ca']) {
          expect(r.pregunta[l]?.length, `${r.tipo}: pregunta vacía en ${l}`).toBeGreaterThan(10)
          expect(r.explicacion[l]?.length, `${r.tipo}: explicación vacía en ${l}`).toBeGreaterThan(10)
        }
      }
    }
  })

  it('los rasgos tienen etiquetas completas en los tres idiomas', () => {
    for (const r of RASGOS) {
      for (const l of ['es', 'en', 'ca']) {
        expect(r.dom.label[l], `${r.id}: falta dom.label.${l}`).toBeTruthy()
        expect(r.rec.label[l], `${r.id}: falta rec.label.${l}`).toBeTruthy()
        expect(r.especie[l], `${r.id}: falta especie.${l}`).toBeTruthy()
      }
      expect(esDominante(r.alelo + r.alelo.toLowerCase())).toBe(true)
      expect(esDominante(r.alelo.toLowerCase() + r.alelo.toLowerCase())).toBe(false)
    }
  })
})
