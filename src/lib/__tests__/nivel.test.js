// Invariantes del curso del alumno (src/lib/nivel.js).
//
// Lo que más se vigila aquí es la REGLA DE ORO: sin nivel elegido no se
// esconde nada. Un fallo en ese sentido no se ve en pantalla —la rejilla
// simplemente sale con menos temas— y le quita contenido a quien no ha
// pedido nada.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Firestore entero simulado: aquí no se prueba la base de datos, se prueba
// que el nivel NO viaje a ella cuando no hay cuenta, y que cuando la hay
// viaje como campo plano con merge.
const setDocMock = vi.fn()
vi.mock('firebase/firestore', () => ({
  doc: (...args) => ({ path: args.slice(1).join('/') }),
  getDoc: vi.fn(async () => ({ exists: () => false, data: () => ({}) })),
  setDoc: (...args) => setDocMock(...args),
}))
vi.mock('../firebase.js', () => ({ db: {} }))

import {
  NIVEL_IDS, NIVELES, isNivel, nivelLabel, coincideNivel,
  setNivel, getNivel, yaPreguntado, marcarPreguntado,
} from '../nivel.js'
import { GRADOS, GRADO_IDS } from '../mathEngine.js'

// setNivel escribe en localStorage; en Node no existe, así que se simula uno
// mínimo. Comprobar que la app aguanta sin él tiene su propio test más abajo.
const almacen = new Map()
beforeEach(() => {
  almacen.clear()
  globalThis.window = {
    localStorage: {
      getItem: k => (almacen.has(k) ? almacen.get(k) : null),
      setItem: (k, v) => almacen.set(k, String(v)),
      removeItem: k => almacen.delete(k),
    },
  }
  setDocMock.mockClear()
  setNivel(null)
  setDocMock.mockClear()
})
afterEach(() => { delete globalThis.window })

describe('los tres niveles', () => {
  it('son exactamente los GRADOS del motor de cálculo', () => {
    expect(NIVEL_IDS).toEqual(GRADO_IDS)
    expect(NIVEL_IDS).toEqual(['primaria', 'eso', 'bachillerato'])
  })

  it('cada uno trae etiqueta en los tres idiomas, emoji y tramo de edad', () => {
    for (const n of NIVELES) {
      for (const lang of ['es', 'en', 'ca']) {
        expect(n.label[lang], `${n.id} sin label.${lang}`).toBeTruthy()
      }
      expect(n.emoji).toBeTruthy()
      expect(n.edades, `${n.id} sin tramo de edad`).toMatch(/^\d+-\d+$/)
    }
  })

  it('el catalán no cae al castellano: GRADOS trae labelCa propio', () => {
    // topicCatalog.js lee GRADOS[id].labelCa con `|| label`; sin labelCa un
    // alumno en catalán leía "Primaria" y "Bachillerato" en castellano.
    expect(GRADOS.primaria.labelCa).toBe('Primària')
    expect(GRADOS.bachillerato.labelCa).toBe('Batxillerat')
    expect(nivelLabel('bachillerato', 'ca')).toBe('Batxillerat')
  })
})

describe('isNivel', () => {
  it('acepta los tres ids y rechaza cualquier otra cosa', () => {
    for (const id of NIVEL_IDS) expect(isNivel(id)).toBe(true)
    for (const malo of [null, undefined, '', 'ESO', 'universidad', 0, {}]) {
      expect(isNivel(malo), `${JSON.stringify(malo)} no es un nivel`).toBe(false)
    }
  })
})

describe('coincideNivel — la regla de oro', () => {
  const temaEso = { id: 'gce', niveles: ['eso', 'bachillerato'] }
  const temaPrimaria = { id: 'hitos', niveles: ['primaria'] }
  const sinNiveles = { id: 'suelto' }

  it('sin nivel elegido pasa ABSOLUTAMENTE todo', () => {
    for (const item of [temaEso, temaPrimaria, sinNiveles, {}, null]) {
      expect(coincideNivel(item, null), 'null debe enseñarlo todo').toBe(true)
    }
  })

  it('un item sin niveles declarados vale para cualquier curso', () => {
    for (const nivel of NIVEL_IDS) {
      expect(coincideNivel(sinNiveles, nivel)).toBe(true)
      expect(coincideNivel({ niveles: [] }, nivel)).toBe(true)
    }
  })

  it('con nivel elegido filtra por la lista del item', () => {
    expect(coincideNivel(temaEso, 'eso')).toBe(true)
    expect(coincideNivel(temaEso, 'bachillerato')).toBe(true)
    expect(coincideNivel(temaEso, 'primaria')).toBe(false)
    expect(coincideNivel(temaPrimaria, 'primaria')).toBe(true)
    expect(coincideNivel(temaPrimaria, 'eso')).toBe(false)
  })
})

describe('setNivel / getNivel', () => {
  it('guarda, lee y persiste en localStorage', () => {
    setNivel('eso')
    expect(getNivel()).toBe('eso')
    expect(almacen.get('tuthor:nivel')).toBe('eso')
  })

  it('null borra la elección y vuelve a "enséñalo todo"', () => {
    setNivel('primaria')
    setNivel(null)
    expect(getNivel()).toBe(null)
    expect(almacen.has('tuthor:nivel')).toBe(false)
  })

  it('un valor inválido se trata como "sin elegir", nunca se guarda tal cual', () => {
    setNivel('universidad')
    expect(getNivel()).toBe(null)
    expect(almacen.has('tuthor:nivel')).toBe(false)
  })

  it('sin localStorage (Safari privado, cookies bloqueadas) no revienta', () => {
    globalThis.window = {
      localStorage: {
        getItem() { throw new Error('denied') },
        setItem() { throw new Error('denied') },
        removeItem() { throw new Error('denied') },
      },
    }
    expect(() => setNivel('eso')).not.toThrow()
    expect(getNivel()).toBe('eso') // en memoria sí, aunque no sobreviva a un recargar
  })

  it('no toca Firestore si no hay uid (visitante anónimo)', () => {
    setNivel('eso')
    expect(setDocMock).not.toHaveBeenCalled()
  })

  it('elegir curso cuenta como responder: no se vuelve a preguntar', () => {
    expect(yaPreguntado()).toBe(false)
    setNivel('eso')
    expect(yaPreguntado()).toBe(true)
  })

  it('cerrar la tarjeta sin elegir también se recuerda, y no inventa un nivel', () => {
    marcarPreguntado()
    expect(yaPreguntado()).toBe(true)
    // Lo importante: cerrar la pregunta NO es elegir un curso. Quien dijo
    // "prefiero verlo todo" tiene que seguir viéndolo todo.
    expect(getNivel()).toBe(null)
  })

  it('con uid sí lo sube a la cuenta', () => {
    setNivel('bachillerato', 'uid-123')
    expect(setDocMock).toHaveBeenCalledTimes(1)
    // El nivel viaja como campo plano y con merge: nunca pisa el resto del
    // doc del usuario (suscripción, teacherProfile, legacyFree…).
    const [, datos, opciones] = setDocMock.mock.calls[0]
    expect(datos).toEqual({ nivel: 'bachillerato' })
    expect(opciones).toEqual({ merge: true })
  })
})
