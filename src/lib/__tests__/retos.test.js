// Retos de clase: los exámenes que se pueden mandar (deberes / en directo) y
// que sus preguntas sobreviven al viaje pizarra → móviles como texto JSON.
import { describe, it, expect, vi } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import fs from 'fs'
import path from 'path'
import { EXAMS } from '../exams'
import { RETOS_EXAMENES } from '../../data/retosExamenes'
import { nivelDelReto } from '../rankingClase'
import { puntosDirecto } from '../apodo'

const espia = vi.hoisted(() => ({ props: null }))
vi.mock('../../components/MechanicExam', () => ({ default: props => { espia.props = props; return null } }))

const PAGINAS = path.resolve(__dirname, '../../pages')
const fuente = id => {
  const m = String(EXAMS[id].page).match(/pages\/([A-Za-z0-9]+)/)
  return m && fs.readFileSync(path.join(PAGINAS, `${m[1]}.jsx`), 'utf8')
}

// Lo que JSON pierde por el camino: objetos que no son planos (Set, Map,
// Date…), funciones, undefined dentro de listas, NaN e infinitos. (El -0
// pasa a 0, que no cambia ninguna cuenta.)
function noJson(o, ruta, malos) {
  if (typeof o === 'function') malos.add(`${ruta}: función`)
  else if (typeof o === 'number' && !Number.isFinite(o)) malos.add(`${ruta}: ${o}`)
  else if (o && typeof o === 'object') {
    if (!Array.isArray(o) && Object.getPrototypeOf(o) !== Object.prototype) malos.add(`${ruta}: ${o.constructor?.name}`)
    if (Array.isArray(o)) o.forEach((v, i) => { if (v === undefined) malos.add(`${ruta}[]: undefined`); else noJson(v, `${ruta}[]`, malos) })
    else for (const [k, v] of Object.entries(o)) noJson(v, `${ruta}.${k}`, malos)
  }
}

describe('Retos · exámenes que se pueden mandar', () => {
  it('cada uno existe, usa MechanicExam y su gameId es su clave (el reto la compara)', () => {
    expect(new Set(RETOS_EXAMENES).size).toBe(RETOS_EXAMENES.length)
    for (const id of RETOS_EXAMENES) {
      expect(EXAMS[id], id).toBeTruthy()
      expect(EXAMS[id].retired, id).toBeFalsy()
      const s = fuente(id)
      expect(s, id).toBeTruthy()
      expect(s, id).toContain('<MechanicExam')
      expect(s.match(/gameId="([^"]+)"/)?.[1], id).toBe(id)
    }
  })

  it('las preguntas viajan como JSON sin perder nada', async () => {
    // Cada página se monta con MechanicExam sustituido por un espía: así se
    // prueba el generador y los niveles que de verdad le pasa, monte como
    // los monte (importado, envuelto o definido en la propia página).
    const TODOS = new Set()
    for (const id of RETOS_EXAMENES) {
      const Pagina = (await EXAMS[id].page()).default
      espia.props = null
      renderToStaticMarkup(createElement(MemoryRouter, null, createElement(Pagina)))
      const { genRound, levels } = espia.props ?? {}
      expect(typeof genRound, id).toBe('function')
      for (let n = 0; n < (levels?.length ?? 1); n++) {
        const { difficulty } = nivelDelReto(levels, n)
        for (let k = 0; k < 10; k++) {
          const malos = new Set()
          noJson(genRound(difficulty), 'ronda', malos)
          // Única excepción: en Lee el gráfico, contexto.etiquetas es la
          // función que GENERA las etiquetas; la ronda ya las lleva calculadas
          // en round.etiquetas y nadie usa la función después.
          for (const m of malos) if (m !== 'ronda.contexto.etiquetas: función') TODOS.add(`${id}: ${m}`)
        }
      }
    }
    expect([...TODOS].sort()).toEqual([])
  }, 120000)
})

describe('Retos · nivel y puntos', () => {
  it('el nivel del reto cae dentro de los niveles del examen', () => {
    const levels = [{ key: 'a', difficulty: 'facil' }, { key: 'b', difficulty: 'medio' }]
    expect(nivelDelReto(levels, 0).difficulty).toBe('facil')
    expect(nivelDelReto(levels, 2).difficulty).toBe('medio')
    expect(nivelDelReto([{ key: 'facil' }], 1).difficulty).toBe('facil')
  })
  it('acertar rápido da más; fallar, nada', () => {
    expect(puntosDirecto(false, 1000, 30000)).toBe(0)
    expect(puntosDirecto(true, 0, 30000)).toBe(1000)
    expect(puntosDirecto(true, 30000, 30000)).toBe(500)
    expect(puntosDirecto(true, 32000, 30000)).toBe(500)
    expect(puntosDirecto(true, 15000, 30000)).toBe(750)
  })
})
