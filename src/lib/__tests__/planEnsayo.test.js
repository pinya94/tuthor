import { describe, it, expect } from 'vitest'
import { planEnsayo } from '../planEnsayo'
import { OBRAS } from '../../data/tocaOrquesta/obras'

describe('plan de ensayo guiado', () => {
  it('escuchar → cada voz por partes y entera → conjuntos → todos con guía → concierto', () => {
    const p = planEnsayo('himno-alegria-escuela', ['melodia', 'laminas', 'acordes', 'percusion'])
    expect(p[0].fase).toBe('escuchar')
    expect(p.map(x => x.fase)).toEqual(['escuchar', ...Array(12).fill('voz'), 'conjunto', 'conjunto', 'todos', 'todos'])
    // Cada voz: parte A y parte B despacio y en bucle, y la obra entera
    const flautas = p.filter(x => x.fase === 'voz' && x.tocan[0] === 'melodia')
    expect(flautas.map(x => [x.desde, x.hasta, x.tempo, x.bucle])).toEqual([[1, 8, 60, true], [9, 16, 60, true], [1, 16, 80, false]])
    expect(flautas.every(x => x.suenan.join() === 'melodia')).toBe(true) // su voz de guía
    // En el concierto la clase toca todo y el altavoz solo el metrónomo
    expect(p.at(-1)).toMatchObject({ tocan: ['melodia', 'laminas', 'acordes', 'percusion'], suenan: [], tempo: 100, metronomo: true })
  })
  it('si la clase solo toca flautas y percusión, la orquesta pone el resto y no hay conjuntos incompletos', () => {
    const p = planEnsayo('himno-alegria-escuela', ['percusion', 'melodia'])
    expect(p.some(x => x.fase === 'conjunto')).toBe(false)
    expect(p.filter(x => x.fase === 'voz')[0].tocan).toEqual(['melodia']) // en el orden de la partitura
    expect(p.at(-1).suenan).toEqual(['laminas', 'acordes'])
  })
  it('todos los pasos tienen texto en los tres idiomas y compases válidos, en las dos obras', () => {
    for (const obraId of Object.keys(OBRAS)) {
      const p = planEnsayo(obraId, Object.keys(OBRAS[obraId].voces))
      for (const x of p) {
        for (const l of ['es', 'en', 'ca']) { expect(x.titulo[l], x.id).toBeTruthy(); expect(x.consejo[l], x.id).toBeTruthy() }
        expect(x.desde >= 1 && x.hasta <= 16 && x.desde <= x.hasta).toBe(true)
      }
      for (const v of Object.values(OBRAS[obraId].voces)) for (const l of ['es', 'en', 'ca']) expect(v.grupo[l]).toBeTruthy()
    }
  })
})
