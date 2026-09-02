// Invariantes de Cambio de Estado. Lo que vigilan de verdad: que ninguna
// ronda pueda preguntar por una temperatura ambigua. Si el generador saca una
// temperatura justo en el punto de fusión, la sustancia está CAMBIANDO de
// estado y no está "en" uno: la pregunta no tendría respuesta correcta, y el
// alumno fallaría algo que en realidad sabe.
import { it, expect } from 'vitest'
import { SUSTANCIAS, CAMBIOS, CONOCIDAS } from '../../data/sustancias'
import { estadoA, DIFICULTADES, genRound, genRoundCambio, esCorrecta, opcionesCambio } from '../cambioEstado'

const NIVELES = Object.keys(DIFICULTADES)

it('los datos de cada sustancia son coherentes', () => {
  const ids = new Set()
  for (const s of SUSTANCIAS) {
    expect(ids.has(s.id), `sustancia repetida: ${s.id}`).toBe(false)
    ids.add(s.id)
    expect(s.fusion, `${s.id}: se funde por encima de donde hierve`).toBeLessThan(s.ebullicion)
    // Nada puede fundirse por debajo del cero absoluto.
    expect(s.fusion, `${s.id}: fusión bajo el cero absoluto`).toBeGreaterThan(-274)
    expect(s.nombre?.es && s.nombre?.en && s.nombre?.ca, `${s.id}: nombre incompleto`).toBeTruthy()
    expect(s.nota?.es && s.nota?.en && s.nota?.ca, `${s.id}: nota incompleta`).toBeTruthy()
  }
})

it('los seis cambios de estado están y no se repiten', () => {
  expect(CAMBIOS).toHaveLength(6)
  const pares = CAMBIOS.map(c => `${c.de}→${c.a}`)
  expect(new Set(pares).size, 'hay dos cambios con el mismo par de estados').toBe(6)
  for (const c of CAMBIOS) {
    expect(c.de).not.toBe(c.a)
    expect(c.nombre?.es && c.ejemplo?.es, `${c.id}: falta nombre o ejemplo`).toBeTruthy()
  }
})

it.each(NIVELES)('en nivel %s ninguna ronda cae justo en un punto de cambio', nivel => {
  for (let i = 0; i < 800; i++) {
    const r = genRound({ dificultad: nivel })
    const { sustancia: s, temp } = r
    expect(temp, `${s.id}: temperatura exactamente en la fusión`).not.toBe(s.fusion)
    expect(temp, `${s.id}: temperatura exactamente en la ebullición`).not.toBe(s.ebullicion)
    expect(temp, `${s.id}: temperatura bajo el cero absoluto`).toBeGreaterThan(-274)
    // Y la respuesta guardada tiene que ser la que sale de la regla.
    expect(esCorrecta(r, estadoA(s, temp))).toBe(true)
  }
})

it.each(NIVELES)('el nivel %s saca los tres estados', nivel => {
  const vistos = new Set()
  for (let i = 0; i < 600; i++) vistos.add(genRound({ dificultad: nivel }).respuesta)
  expect([...vistos].sort()).toEqual(['gas', 'liquido', 'solido'])
})

// El nivel difícil tapa los puntos, así que la pregunta solo se sostiene si la
// sustancia es de las que se pueden razonar sin verlos. Si alguien mete una
// sustancia rara en ese sorteo, el examen pasa a medir memoria.
it('el nivel difícil oculta los datos y solo usa sustancias conocidas', () => {
  for (let i = 0; i < 400; i++) {
    const r = genRound({ dificultad: 'dificil' })
    expect(r.ocultar).toBe(true)
    expect(CONOCIDAS.has(r.id), `${r.id} no es una sustancia de libro`).toBe(true)
  }
})

it('los niveles con los datos a la vista no los ocultan', () => {
  for (const nivel of ['facil', 'medio']) {
    expect(genRound({ dificultad: nivel }).ocultar).toBe(false)
  }
})

// La diferencia entre fácil y medio no es cosmética: en fácil la temperatura se
// mantiene lejos del punto de cambio y en medio puede rozarlo. Si esto se
// rompiera, los tres niveles serían el mismo juego con otro nombre.
it('fácil deja más margen que medio', () => {
  const margen = nivel => {
    let peor = Infinity
    for (let i = 0; i < 600; i++) {
      const { sustancia: s, temp } = genRound({ dificultad: nivel })
      peor = Math.min(peor, Math.abs(temp - s.fusion), Math.abs(temp - s.ebullicion))
    }
    return peor
  }
  expect(margen('facil')).toBeGreaterThan(margen('medio'))
})

it('una dificultad desconocida no rompe el juego', () => {
  const r = genRound({ dificultad: 'inventada' })
  expect(r.respuesta).toBe(estadoA(r.sustancia, r.temp))
})

// El vocabulario de los cambios ya NO está en el juego: vive en su propio
// examen y se alimenta de genRoundCambio.
it('las opciones del examen de nombres incluyen siempre la correcta', () => {
  for (let i = 0; i < 200; i++) {
    const r = genRoundCambio()
    const ops = opcionesCambio(r)
    expect(ops).toHaveLength(4)
    expect(ops.map(o => o.id)).toContain(r.cambio.id)
    expect(new Set(ops.map(o => o.id)).size, 'opciones repetidas').toBe(4)
  }
})
