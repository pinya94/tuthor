// Invariantes de Cambio de Estado. Lo que vigilan de verdad: que ninguna
// ronda pueda preguntar por una temperatura ambigua. Si el generador saca una
// temperatura justo en el punto de fusión, la sustancia está CAMBIANDO de
// estado y no está "en" uno: la pregunta no tendría respuesta correcta, y el
// alumno fallaría algo que en realidad sabe.
import { it, expect } from 'vitest'
import { SUSTANCIAS, CAMBIOS } from '../../data/sustancias'
import { estadoA, genRound, genRoundCambio, esCorrecta, opcionesCambio } from '../cambioEstado'

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

it('ninguna ronda cae justo en un punto de cambio', () => {
  for (let i = 0; i < 800; i++) {
    const r = genRound()
    const { sustancia: s, temp } = r
    expect(temp, `${s.id}: temperatura exactamente en la fusión`).not.toBe(s.fusion)
    expect(temp, `${s.id}: temperatura exactamente en la ebullición`).not.toBe(s.ebullicion)
    expect(temp, `${s.id}: temperatura bajo el cero absoluto`).toBeGreaterThan(-274)
    // Y la respuesta guardada tiene que ser la que sale de la regla.
    expect(esCorrecta(r, estadoA(s, temp))).toBe(true)
  }
})

it('el juego saca los tres estados', () => {
  const vistos = new Set()
  for (let i = 0; i < 600; i++) vistos.add(genRound().respuesta)
  expect([...vistos].sort()).toEqual(['gas', 'liquido', 'solido'])
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
