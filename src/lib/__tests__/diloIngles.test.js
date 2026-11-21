// «Dilo en Inglés»: el comparador y los guiones. Las frases son las que
// devolvería el reconocedor de voz (sin comas, a veces con cifras).
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { normaliza, encaja, corrige, corrigeVarias } from '../diloIngles'
import { SITUACIONES } from '../../data/diloIngles'

const turno = (sit, i) => SITUACIONES.find(s => s.id === sit).turnos[i]
const nivel = (sit, i, texto) => corrige(turno(sit, i), texto).nivel

describe('normaliza y encaja', () => {
  it('deshace contracciones y pasa números a cifras', () => {
    expect(normaliza("I'd like twenty one, please!")).toEqual(['i', 'would', 'like', '21', 'please'])
    expect(normaliza('I’m fourteen')).toEqual(['i', 'am', '14'])
    expect(normaliza('the 2nd street')).toEqual(['the', '2', 'street'])
  })
  it('patrones: opciones, opcional, hueco, final y letras', () => {
    expect(encaja('(i would like|can i have) ... tea', normaliza("I'd like a cup of tea"))).toBe(true)
    expect(encaja('a [big] dog', normaliza('a dog'))).toBe(true)
    expect(encaja('i am {NUM} years$', normaliza('I am 13 years old'))).toBe(false)
    expect(encaja('i am {NUM} years$', normaliza('I am 13 years'))).toBe(true)
    expect(encaja('{LETRAS}', normaliza('M A R T A'))).toBe(true)
    expect(encaja('{LETRAS}', normaliza('Marta'))).toBe(false)
  })
})

describe('frases reales', () => {
  it('restaurante', () => {
    expect(nivel('restaurante', 0, 'a table for two please')).toBe('verde')
    expect(nivel('restaurante', 1, "I'd like an orange juice please")).toBe('verde')
    expect(nivel('restaurante', 1, 'I want a coke')).toBe('amarillo')
    expect(nivel('restaurante', 1, 'a glass of water please')).toBe('verde')
    expect(nivel('restaurante', 1, 'coke')).toBe('amarillo')
    expect(nivel('restaurante', 2, "I'll have the fish and chips")).toBe('verde')
    expect(nivel('restaurante', 3, 'no thanks')).toBe('verde')
    expect(nivel('restaurante', 3, 'no')).toBe('amarillo')
    expect(nivel('restaurante', 4, 'yes it is delicious could we have the bill please')).toBe('verde')
    expect(nivel('restaurante', 4, 'can I have the account')).toBe('rojo')
    expect(nivel('restaurante', 4, 'the check please')).toBe('amarillo')
  })
  it('campamento', () => {
    expect(nivel('campamento', 0, "I'm Marc")).toBe('verde')
    expect(nivel('campamento', 1, 'I have 13 years')).toBe('rojo')
    expect(nivel('campamento', 1, 'I am thirteen years old')).toBe('verde')
    expect(nivel('campamento', 1, "I'm 13")).toBe('verde')
    expect(nivel('campamento', 2, 'I am Spain')).toBe('rojo')
    expect(nivel('campamento', 2, "I'm from Spain")).toBe('verde')
    expect(nivel('campamento', 2, "I'm Spanish")).toBe('verde')
    expect(nivel('campamento', 3, 'I like play football')).toBe('rojo')
    expect(nivel('campamento', 3, 'I like playing football')).toBe('verde')
    expect(nivel('campamento', 3, 'I like to play football')).toBe('verde')
    expect(nivel('campamento', 3, 'I like football')).toBe('verde')
    expect(nivel('campamento', 4, "No I haven't I'm an only child")).toBe('verde')
    expect(nivel('campamento', 4, "I've got two brother")).toBe('rojo')
    expect(nivel('campamento', 4, "Yes I've got two brothers")).toBe('verde')
  })
  it('hotel y calle', () => {
    expect(nivel('hotel', 0, 'I have a reserve')).toBe('rojo')
    expect(nivel('hotel', 0, 'hello I have a booking')).toBe('verde')
    expect(nivel('hotel', 2, 'M A R T A')).toBe('verde')
    expect(nivel('hotel', 3, 'what hour is breakfast')).toBe('rojo')
    expect(nivel('hotel', 3, "where's the elevator")).toBe('amarillo')
    expect(nivel('hotel', 3, "what's the wifi password")).toBe('verde')
    expect(nivel('calle', 0, 'how I get to the station')).toBe('rojo')
    expect(nivel('calle', 0, 'excuse me how do I get to the train station')).toBe('verde')
    expect(nivel('calle', 0, 'can you tell me where the station is')).toBe('verde')
    expect(nivel('calle', 1, 'straight on second on the left and then on my right')).toBe('verde')
    expect(nivel('calle', 1, 'take the second one on the left')).toBe('amarillo')
    expect(nivel('calle', 1, 'first street on the left')).toBe('rojo')
    expect(nivel('calle', 2, 'is far')).toBe('rojo')
    expect(nivel('calle', 2, 'is it far')).toBe('verde')
  })
  it('con varias versiones se queda la mejor', () => {
    expect(corrigeVarias(turno('restaurante', 4), ['the bills please', 'the bill please']).nivel).toBe('verde')
    expect(corrige(turno('restaurante', 0), '').vacio).toBe(true)
  })
})

describe('guiones', () => {
  it('cada turno tiene lo necesario y el modelo sale en verde o amarillo', () => {
    for (const s of SITUACIONES) {
      expect(fs.existsSync(`public${s.img}`), s.id).toBe(true)
      for (const t of s.turnos) {
        expect(t.dice && t.ayuda && t.modelo && t.bien?.length, t.dice).toBeTruthy()
        for (const m of t.modelo.split(' / ')) expect(corrige(t, m).nivel, `${s.id}: ${m}`).not.toBe('rojo')
      }
    }
  })
})
