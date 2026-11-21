import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { OBRAS } from '../../data/tocaOrquesta/obras'
import { INSTRUMENTOS, parte, quintasEscritas, deletrea, nombreNota, musicXML, notasParte, corrige, detectaNota, hzAMidi, TECLAS, numCompases } from '../tocaOrquesta'

const NOMBRE = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

describe('Toca con la Orquesta: arreglos', () => {
  for (const [id, o] of Object.entries(OBRAS)) {
    it(`${id}: todas las voces con los mismos compases y cada compás completo`, () => {
      const n = numCompases(id)
      const negras = o.compas[0] * 4 / o.compas[1]
      for (const [v, voz] of Object.entries(o.voces)) {
        expect(voz.compases, v).toHaveLength(n)
        voz.compases.forEach((c, i) => expect(c.reduce((s, [, d]) => s + d, 0), `${v} c.${i + 1}`).toBe(negras))
      }
    })
    it(`${id}: hay muestra de sonido para cada nota de la orquesta`, () => {
      for (const voz of Object.values(o.voces)) {
        for (const c of voz.compases) for (const [m] of c) {
          if (m == null) continue
          const f = `public/toca-orquesta/sf/${voz.timbre}/${NOMBRE[m % 12]}${Math.floor(m / 12) - 1}.mp3`
          expect(fs.existsSync(f), f).toBe(true)
        }
      }
    })
  }
})

describe('Toca con la Orquesta: transposición', () => {
  it('armadura escrita de cada instrumento (concierto en Fa mayor)', () => {
    expect(quintasEscritas(-1, 0)).toBe(-1) // Fa
    expect(quintasEscritas(-1, 2)).toBe(1)  // Si♭ → Sol mayor
    expect(quintasEscritas(-1, 9)).toBe(2)  // Mi♭ → Re mayor
    expect(quintasEscritas(-1, 7)).toBe(0)  // Fa → Do mayor
    expect(quintasEscritas(-1, -2)).toBe(-3) // un tono abajo → Mi♭ mayor
  })
  it('deletrea con la armadura: Si♭ en Fa, Fa♯ en Sol, Mi♭ en Mi♭', () => {
    expect(deletrea(70, -1)).toEqual({ letra: 'B', alter: -1, octava: 4 })
    expect(deletrea(66, 1)).toEqual({ letra: 'F', alter: 1, octava: 4 })
    expect(deletrea(63, -3)).toEqual({ letra: 'E', alter: -1, octava: 4 })
    expect(deletrea(72, 0)).toEqual({ letra: 'C', alter: 0, octava: 5 })
    expect(nombreNota(70, -1, 'es')).toBe('Si♭')
    expect(nombreNota(70, -1, 'en')).toBe('B♭')
  })
  it('cada voz cae en la zona cómoda de cada instrumento y la partitura tiene todos los compases', () => {
    const o = OBRAS['himno-alegria']
    for (const inst of [...Object.keys(INSTRUMENTOS), 'piano']) {
      for (const voz of Object.keys(o.voces)) {
        const p = parte('himno-alegria', voz, inst)
        const rango = inst === 'piano' ? [48, 84] : INSTRUMENTOS[inst].rango
        const ns = notasParte(p)
        if (rango) for (const n of ns) expect(n.suena >= rango[0] && n.suena <= rango[1], `${inst} ${voz} ${n.suena}`).toBe(true)
        const xml = musicXML(p)
        expect(xml.match(/<measure /g)).toHaveLength(16)
        expect(xml.match(/<pitch>/g)).toHaveLength(ns.length)
        expect(xml).toContain(`<fifths>${p.quintas}</fifths>`)
      }
    }
  })
  it('el clarinete lee la melodía un tono más alta, en Sol mayor, y el violonchelo una octava más grave en clave de Fa', () => {
    const cl = parte('himno-alegria', 'melodia', 'clarinete')
    expect(cl.quintas).toBe(1)
    expect(notasParte(cl)[0].escrita).toBe(69 + 2) // La4 suena → Si4 escrito
    const ch = parte('himno-alegria', 'melodia', 'chelo')
    expect(ch.clave).toBe('fa')
    expect(notasParte(ch)[0].suena).toBe(69 - 12)
    expect(parte('himno-alegria', 'melodia', 'viola').clave).toBe('do')
    const otro = parte('himno-alegria', 'melodia', 'otro', { semitonos: 9, clave: 'sol' })
    expect(otro.quintas).toBe(2)
  })
})

describe('Toca con la Orquesta: corrección', () => {
  const p = parte('himno-alegria', 'melodia', 'violin')
  const spq = 0.6
  const notas = notasParte(p).map(n => ({ ...n, s0: n.inicio * spq, ds: n.dur * spq }))
  const total = notas.at(-1).s0 + notas.at(-1).ds
  // Frames a 60 por segundo, con ruido de fondo durante la cuenta
  const frames = (fn) => {
    const fs2 = []
    for (let t = -2; t < total + 0.3; t += 1 / 60) {
      const n = notas.find(x => t >= x.s0 && t < x.s0 + x.ds * 0.9)
      fs2.push(fn(t, n))
    }
    return fs2
  }
  it('tocarlo todo bien da 100 % y todo en verde', () => {
    const r = corrige(notas, frames((t, n) => (n ? { t, rms: 0.2, m: n.suena } : { t, rms: 0.003, m: null })))
    expect(r.pct).toBe(100)
    expect(Object.values(r.porCompas).every(e => e === 'ok')).toBe(true)
  })
  it('en silencio, 0 % y «no se oye»', () => {
    const r = corrige(notas, frames(t => ({ t, rms: 0.003, m: null })))
    expect(r.pct).toBe(0)
    expect(r.fallos[0].tipo).toBe('silencio')
  })
  it('una octava más arriba vale; un semitono, no; medio semitono es «un poco alto»', () => {
    expect(corrige(notas, frames((t, n) => (n ? { t, rms: 0.2, m: n.suena + 12 } : { t, rms: 0.003, m: null }))).pct).toBe(100)
    const mal = corrige(notas, frames((t, n) => (n ? { t, rms: 0.2, m: n.suena + 1 } : { t, rms: 0.003, m: null })))
    expect(mal.pct).toBe(0)
    expect(mal.fallos[0].tipo).toBe('nota')
    const alto = corrige(notas, frames((t, n) => (n ? { t, rms: 0.2, m: n.suena + 0.5 } : { t, rms: 0.003, m: null })))
    expect(alto.fallos[0].tipo).toBe('alta')
  })
  it('entrar 200 ms tarde cuenta solo si se corrige el tiempo', () => {
    const tarde = frames((t, n) => {
      const x = notas.find(y => t >= y.s0 + 0.2 && t < y.s0 + y.ds * 0.9)
      return x ? { t, rms: 0.2, m: x.suena } : { t, rms: 0.003, m: null }
    })
    expect(corrige(notas, tarde, { tiempo: true }).fallos.some(f => f.tipo === 'tarde')).toBe(true)
    expect(corrige(notas, tarde, { tiempo: false }).fallos.some(f => f.tipo === 'tarde')).toBe(false)
  })
})

describe('Toca con la Orquesta: detección y teclado', () => {
  it('detecta un La 440 y un Do grave de violonchelo', () => {
    for (const hz of [440, 65.41]) {
      const sr = 48000, buf = new Float32Array(2048)
      for (let i = 0; i < buf.length; i++) buf[i] = 0.3 * Math.sin((2 * Math.PI * hz * i) / sr)
      const { f } = detectaNota(buf, sr, 55)
      expect(Math.abs(hzAMidi(f) - hzAMidi(hz))).toBeLessThan(0.2)
    }
  })
  it('cada tecla del ordenador da una nota distinta (salvo ; y ñ, que son la misma)', () => {
    const notas = Object.entries(TECLAS).filter(([k]) => k !== ';').map(([, m]) => m)
    expect(new Set(notas).size).toBe(notas.length)
  })
})
