// «Física: 4 de 12 temas» del perfil: un tema cuenta solo si se jugó una
// combinación suya del catálogo (juego Y category), nunca por arrastre.
import { describe, it, expect } from 'vitest'
import { temasTocados } from '../statsAggregation.js'
import { TOPIC_CATALOG, topicIds, topicFormats, topicTask } from '../topicCatalog.js'

describe('temas tocados', () => {
  it('sin partidas, cero de todo y el total es el del catálogo', () => {
    const r = temasTocados({})
    for (const m of Object.keys(TOPIC_CATALOG)) {
      expect(r[m]).toEqual({ tocados: 0, total: topicIds(m).length })
    }
  })

  it('jugar una combinación concreta marca ese tema y solo ese en su materia', () => {
    const tema = topicIds('historia').find(t => topicFormats('historia', t).some(f => f.id === 'teoria'))
    const t = topicTask('historia', tema, 'teoria')
    const r = temasTocados({ statsByGame: { [t.gameId]: { plays: 1 } }, statsByCategory: { [t.category]: { plays: 1 } } })
    expect(r.historia.tocados).toBe(1)
  })

  it('la category sola, sin partidas de ese juego, no cuenta', () => {
    const tema = topicIds('historia')[0]
    const t = topicTask('historia', tema, 'teoria')
    const r = temasTocados({ statsByCategory: { [t.category]: { plays: 3 } } })
    expect(r.historia.tocados).toBe(0)
  })
})
