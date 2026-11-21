// «Dilo en Inglés»: el comparador y las misiones. Las frases son como las que
// devolvería el reconocedor de voz (sin comas, a veces con cifras). Muchas
// vienen de pruebas del usuario: cualquier forma correcta de cumplir la
// misión tiene que pasar, la diga como la diga.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { normaliza, encaja, corrige, corrigeVarias } from '../diloIngles'
import { SITUACIONES } from '../../data/diloIngles'

const turno = (sit, i) => SITUACIONES.find(s => s.id === sit).turnos[i]
const nivel = (sit, i, texto) => corrige(turno(sit, i), texto).nivel

describe('normaliza y encaja', () => {
  it('deshace contracciones, quita acentos y pasa números a cifras', () => {
    expect(normaliza("I'd like twenty one, please!")).toEqual(['i', 'would', 'like', '21', 'please'])
    expect(normaliza('I’m fourteen')).toEqual(['i', 'am', '14'])
    expect(normaliza('the 2nd street')).toEqual(['the', '2', 'street'])
    expect(normaliza('García')).toEqual(['garcia'])
  })
  it('patrones: opciones, opcional, hueco, principio, final y letras', () => {
    expect(encaja('(i would like|can i have) ... tea', normaliza("I'd like a cup of tea"))).toBe(true)
    expect(encaja('a [big] dog', normaliza('a dog'))).toBe(true)
    expect(encaja('i am {NUM} years$', normaliza('I am 13 years old'))).toBe(false)
    expect(encaja('i am {NUM} years$', normaliza('I am 13 years'))).toBe(true)
    expect(encaja('^you have', normaliza('you have vegetarian food'))).toBe(true)
    expect(encaja('^you have', normaliza('do you have vegetarian food'))).toBe(false)
    expect(encaja('{LETRAS}', normaliza('G A R C I A'))).toBe(true)
    expect(encaja('{LETRAS}', normaliza('Garcia'))).toBe(false)
  })
})

describe('misiones: cualquier forma correcta pasa', () => {
  it('restaurante: la mesa, se diga como se diga', () => {
    for (const f of [
      'could we have a table for five by the window please',
      'a table for five people near the window please',
      'can you make room for a table of five next to the window',
      'hello we are five could we sit by the window',
      'I would like to sit next to the windows we are five people',
      'I need a table for five people please by the window',
    ]) expect(nivel('restaurante', 0, f), f).toBe('verde')
    expect(nivel('restaurante', 0, 'a table for five by the window')).toBe('amarillo') // seco: sin please ni could
    expect(nivel('restaurante', 0, 'a table for five persons by the window please')).toBe('amarillo')
    expect(nivel('restaurante', 0, 'a table for five please')).toBe('falta') // falta la ventana
    expect(corrige(turno('restaurante', 0), 'a table for five please').faltan[0]).toMatch(/ventana/)
  })
  it('restaurante: bebida, comida, cuenta y pago', () => {
    expect(nivel('restaurante', 1, 'could you give me a lemonade please')).toBe('verde')
    expect(nivel('restaurante', 1, "I'd like a lemonade")).toBe('verde')
    expect(nivel('restaurante', 1, 'I want a lemonade')).toBe('amarillo')
    expect(nivel('restaurante', 2, 'do you have anything vegetarian')).toBe('verde')
    expect(nivel('restaurante', 2, 'is there a vegetarian option')).toBe('verde')
    expect(nivel('restaurante', 2, 'you have vegetarian food')).toBe('rojo')
    expect(nivel('restaurante', 3, 'no thanks could we have the bill please')).toBe('verde')
    expect(nivel('restaurante', 3, 'no thank you can I have the account')).toBe('rojo')
    expect(nivel('restaurante', 3, 'no thanks the check please')).toBe('amarillo')
    expect(nivel('restaurante', 4, "I'll pay by card")).toBe('verde')
    expect(nivel('restaurante', 4, 'with card')).toBe('rojo')
  })
  it('campamento', () => {
    expect(nivel('campamento', 0, "I'm Marc")).toBe('verde')
    expect(nivel('campamento', 1, 'I have 13 years')).toBe('rojo')
    expect(nivel('campamento', 1, 'I am thirteen years old')).toBe('verde')
    expect(nivel('campamento', 1, "I'm 13")).toBe('verde')
    expect(nivel('campamento', 2, 'I am Spain')).toBe('rojo')
    expect(nivel('campamento', 2, "I'm Spanish I live in Valencia")).toBe('verde')
    expect(nivel('campamento', 2, "I'm from Valencia")).toBe('falta')
    expect(nivel('campamento', 3, 'I like play football and read')).toBe('rojo')
    expect(nivel('campamento', 3, 'I love playing football and reading books')).toBe('verde')
    expect(nivel('campamento', 3, 'football and reading')).toBe('verde')
    expect(nivel('campamento', 4, "I've got two sister")).toBe('rojo')
    expect(nivel('campamento', 4, 'yes I have two sisters')).toBe('verde')
  })
  it('hotel y calle', () => {
    expect(nivel('hotel', 0, 'I have a reserve for Garcia')).toBe('rojo')
    expect(nivel('hotel', 0, 'hello we booked a room under the name García')).toBe('verde')
    expect(nivel('hotel', 1, 'G A R C I A')).toBe('verde')
    expect(nivel('hotel', 2, 'what hour is breakfast')).toBe('rojo')
    expect(nivel('hotel', 2, 'when is breakfast')).toBe('verde')
    expect(nivel('hotel', 3, "what's the wifi password please")).toBe('verde')
    expect(nivel('hotel', 3, 'give me the wifi password')).toBe('amarillo')
    expect(nivel('calle', 0, 'how I get to the station')).toBe('rojo')
    expect(nivel('calle', 0, 'excuse me can you tell me where the station is')).toBe('verde')
    expect(nivel('calle', 1, 'straight on second on the left and then on my right')).toBe('verde')
    expect(nivel('calle', 1, 'take the second one on the left')).toBe('falta')
    expect(nivel('calle', 1, 'first street on the left')).toBe('rojo')
    expect(nivel('calle', 2, 'is far')).toBe('rojo')
    expect(nivel('calle', 2, 'is it far from here')).toBe('verde')
    expect(nivel('calle', 3, 'thanks a lot bye')).toBe('verde')
  })
  it('con varias versiones se queda la mejor', () => {
    expect(corrigeVarias(turno('restaurante', 3), ['no thanks the bills please', 'no thanks the bill please']).nivel).toBe('verde')
    expect(corrige(turno('restaurante', 0), '').vacio).toBe(true)
  })
})

describe('guiones', () => {
  it('cada turno tiene lo necesario y el modelo sale en verde', () => {
    for (const s of SITUACIONES) {
      expect(fs.existsSync(`public${s.img}`), s.id).toBe(true)
      for (const t of s.turnos) {
        expect(t.dice && t.mision && t.modelo && Array.isArray(t.claves), t.dice).toBeTruthy()
        for (const c of t.claves) expect(c.falta, t.dice).toBeTruthy()
        for (const m of t.modelo.split(' / ')) expect(corrige(t, m).nivel, `${s.id}: ${m}`).toBe('verde')
      }
    }
  })
})
