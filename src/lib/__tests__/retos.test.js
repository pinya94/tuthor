// Retos de clase: los exámenes que se pueden mandar (deberes / en directo) y
// que sus preguntas sobreviven al viaje pizarra → móviles como texto JSON.
import { describe, it, expect, vi } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { EXAMS } from '../exams'
import { RETOS_EXAMENES, RETOS_TEST, RETOS_TODOS } from '../../data/retosExamenes'
import { generadorTest, esCorrectaTest, indiceCorrecto } from '../retoTest'
import { nivelDelReto, sugiereEmparejado, notaDe, csvResultados } from '../rankingClase'
import { puntosDirecto } from '../apodo'

const espia = vi.hoisted(() => ({ props: null }))
vi.mock('../../components/MechanicExam', () => ({ default: props => { espia.props = props; return null } }))
vi.mock('../../components/ExamenMC', () => ({ default: props => { espia.props = props; return null } }))

const PAGINAS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../pages')
const BASES = [
  { nombre: 'ExamenRios', ruta: path.resolve(PAGINAS, '../components/riosMontanas/ExamenRios.jsx') },
]
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
    if (Array.isArray(o)) o.forEach(v => { if (v === undefined) malos.add(`${ruta}[]: undefined`); else noJson(v, `${ruta}[]`, malos) })
    else for (const [k, v] of Object.entries(o)) noJson(v, `${ruta}.${k}`, malos)
  }
}

describe('Retos · exámenes que se pueden mandar', () => {
  it('cada uno existe, usa MechanicExam (o ExamenMC si es tipo test) y su gameId es su clave (el reto la compara)', () => {
    expect(new Set(RETOS_TODOS).size).toBe(RETOS_TODOS.length)
    for (const id of RETOS_TODOS) {
      expect(EXAMS[id], id).toBeTruthy()
      expect(EXAMS[id].retired, id).toBeFalsy()
      const s = fuente(id)
      expect(s, id).toBeTruthy()
      // Una página puede montar MechanicExam a través de una base común (varios
      // exámenes de un mismo juego, uno por región): la base tiene que montarlo.
      const base = BASES.find(b => s.includes(`<${b.nombre}`))
      if (base) expect(fs.readFileSync(base.ruta, 'utf8'), base.nombre).toContain('<MechanicExam')
      else expect(s, id).toContain(RETOS_TEST.includes(id) ? '<ExamenMC' : '<MechanicExam')
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

  it('las preguntas tipo test viajan como JSON y se corrigen con su índice', async () => {
    const TODOS = new Set()
    for (const id of RETOS_TEST) {
      const Pagina = (await EXAMS[id].page()).default
      espia.props = null
      renderToStaticMarkup(createElement(MemoryRouter, null, createElement(Pagina)))
      const { nivelInfo } = espia.props ?? {}
      expect(nivelInfo, id).toBeTruthy()
      for (const nivel of Object.keys(nivelInfo)) {
        // Un generador por nivel, como en un reto (que es de un solo nivel)
        const gen = generadorTest(nivelInfo)
        const n = nivelInfo[nivel].pool().length
        const vistas = new Set()
        for (let k = 0; k < Math.min(n, 12); k++) {
          const r = gen(nivel)
          const malos = new Set()
          noJson(r, 'ronda', malos)
          for (const m of malos) TODOS.add(`${id}: ${m}`)
          // La correcta existe entre las opciones y es la única que puntúa
          const buena = indiceCorrecto(r.q)
          expect(buena, `${id}: correcta fuera de las opciones`).toBeGreaterThanOrEqual(0)
          expect(esCorrectaTest(JSON.parse(JSON.stringify(r)), buena), id).toBe(true)
          expect(r.orden.filter(i => i !== buena).some(i => esCorrectaTest(r, i)), id).toBe(false)
          vistas.add(r.q.id ?? r.q.pregunta.es)
        }
        // Sin repetir mientras queden preguntas en el banco
        expect(vistas.size, `${id} · ${nivel}`).toBe(Math.min(n, 12))
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

describe('Retos · con la lista de clase', () => {
  const lista = [
    { id: 'u1', name: 'Lucía Pérez García' }, { id: 'u2', name: 'Marc Soler' },
    { id: 'ph_a', name: 'Hugo Gil', esFicha: true }, { id: 'u3', name: 'Ana Ruiz' }, { id: 'u4', name: 'Ana López' },
  ]
  it('sugiere solo lo que coincide sin dudas', () => {
    const gente = [{ pid: 'p1', apodo: 'lucia perez' }, { pid: 'p2', apodo: 'Marc' }, { pid: 'p3', apodo: 'Hugo Gil' }, { pid: 'p4', apodo: 'Ana' }, { pid: 'p5', apodo: 'Rayo' }]
    // «Ana» podría ser dos alumnas: no se sugiere; «Rayo» no es nadie
    expect(sugiereEmparejado(gente, lista)).toEqual({ p1: 'u1', p2: 'u2', p3: 'ph_a' })
  })
  it('quien entró con su cuenta de la clase va primero y seguro', () => {
    // «Rayo» entró con la cuenta de Ana Ruiz: es ella, aunque el apodo no se parezca
    expect(sugiereEmparejado([{ pid: 'p5', apodo: 'Rayo', uid: 'u3' }, { pid: 'p1', apodo: 'Lucía Pérez' }], lista)).toEqual({ p5: 'u3', p1: 'u1' })
    // Una cuenta que no está en la lista no cuenta
    expect(sugiereEmparejado([{ pid: 'p6', apodo: 'Rayo', uid: 'zz' }], lista)).toEqual({})
  })
  it('la nota de cada uno según el modo', () => {
    const entradas = [{ pid: 'p1', juego: 'rebajas-test', puntos: 70 }, { pid: 'p1', juego: 'otro', puntos: 100 }]
    const marcador = [{ pid: 'p1', aciertos: 7 }]
    expect(notaDe({ modo: 'deberes', examen: 'rebajas-test' }, 'p1', entradas, marcador)).toBe(7)
    expect(notaDe({ modo: 'deberes', examen: 'rebajas-test' }, 'p9', entradas, marcador)).toBe(null)
    expect(notaDe({ modo: 'directo', nPreguntas: 15 }, 'p1', entradas, marcador)).toBe(4.7)
    expect(notaDe({ modo: 'ranking' }, 'p1', entradas, marcador)).toBe(null)
  })
})

describe('Retos · resultados en CSV', () => {
  const tr = o => o.es
  it('deberes: nombre, nota con coma decimal e intentos, de mejor a peor', () => {
    const csv = csvResultados({ modo: 'deberes', examen: 'x' }, [{ apodo: 'Ana', juego: 'x', puntos: 75, intentos: 2 }, { apodo: 'Leo "el rápido"', juego: 'x', puntos: 90 }, { apodo: 'Otro', juego: 'y', puntos: 100 }], [], tr)
    const lineas = csv.replace('﻿', '').split('\r\n')
    expect(lineas).toEqual(['"Nombre";"Nota (sobre 10)";"Intentos"', '"Leo ""el rápido""";"9";"1"', '"Ana";"7,5";"2"'])
  })
  it('directo: puntos, aciertos y nota', () => {
    const csv = csvResultados({ modo: 'directo', nPreguntas: 10 }, [], [{ pid: 'a', apodo: 'Rayo', puntos: 2840, aciertos: 3 }, { pid: 'b', apodo: 'Mar', puntos: 5000, aciertos: 6 }], tr)
    expect(csv.split('\r\n').slice(1)).toEqual(['"Mar";"5000";"6";"6"', '"Rayo";"2840";"3";"3"'])
  })
})
