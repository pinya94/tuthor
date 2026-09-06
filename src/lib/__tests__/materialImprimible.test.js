// Invariantes de los imprimibles. Lo que de verdad importa: que una tarjeta
// nunca salga a imprimir sin las dos caras (un frente vacío o un dorso vacío
// es papel gastado en balde), que las variantes que se ofrecen tengan
// contenido de verdad detrás, y que un id inventado no tumbe el panel.
import { describe, it, expect } from 'vitest'
import { IMPRIMIBLES, IMPRIMIBLE_IDS, MAX_TARJETAS, tarjetasDe, intercalarPorDorso, imprimiblesDeTema } from '../materialImprimible'

describe('catálogo de imprimibles', () => {
  it('cada imprimible tiene título, descripción y cómo usarlo en los tres idiomas', () => {
    for (const id of IMPRIMIBLE_IDS) {
      const d = IMPRIMIBLES[id]
      for (const campo of ['asignatura', 'titulo', 'desc', 'comoUsarlo']) {
        for (const lang of ['es', 'en', 'ca']) {
          expect(d[campo][lang], `${id}.${campo}.${lang}`).toBeTruthy()
        }
      }
      expect(d.emoji).toBeTruthy()
    }
  })

  it('toda variante ofrecida tiene tarjetas de verdad detrás', () => {
    // Ofrecer un grupo vacío es prometer una hoja que sale en blanco.
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(v.n, `${id}/${v.id} dice tener ${v.n}`).toBeGreaterThan(0)
        expect(tarjetasDe(id, v.id).length, `${id}/${v.id} sin tarjetas`).toBeGreaterThan(0)
      }
    }
  })

  it('el recuento anunciado coincide con las tarjetas reales (hasta el tope)', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(tarjetasDe(id, v.id).length).toBe(Math.min(v.n, MAX_TARJETAS))
      }
    }
  })

  it('ninguna tarjeta sale con una cara vacía', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        for (const t of tarjetasDe(id, v.id)) {
          expect(String(t.frente ?? '').trim(), `${id}/${v.id} frente vacío`).not.toBe('')
          expect(String(t.dorso ?? '').trim(), `${id}/${v.id} dorso vacío`).not.toBe('')
        }
      }
    }
  })

  it('nunca pasa del tope de recorte', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(tarjetasDe(id, v.id).length).toBeLessThanOrEqual(MAX_TARJETAS)
      }
    }
  })

  it('en inglés y catalán también salen las dos caras', () => {
    for (const lang of ['en', 'ca']) {
      for (const id of IMPRIMIBLE_IDS) {
        const v = IMPRIMIBLES[id].variantes(lang)[0]
        expect(v.label, `${id} sin etiqueta en ${lang}`).toBeTruthy()
        for (const t of tarjetasDe(id, v.id, lang)) {
          expect(String(t.frente ?? '').trim()).not.toBe('')
          expect(String(t.dorso ?? '').trim()).not.toBe('')
        }
      }
    }
  })
})

describe('imprimiblesDeTema', () => {
  it('una página de historia ofrece el material de SU época, no uno genérico', () => {
    const r = imprimiblesDeTema('historia', 'edad-media')
    expect(r.map(x => x.id).sort()).toEqual(['historia-eventos', 'historia-portadas'].filter(
      id => IMPRIMIBLES[id].variantes('es').some(v => v.id === 'edad-media'),
    ).sort())
    for (const x of r) {
      expect(x.varianteId).toBe('edad-media')
      expect(tarjetasDe(x.id, x.varianteId).length).toBeGreaterThan(0)
    }
  })

  it('solo ofrece el imprimible si esa época tiene material dentro', () => {
    // roma tiene eventos pero no portadas: ofrecer las dos sería mandar al
    // profesor a una hoja vacía.
    for (const x of imprimiblesDeTema('historia', 'roma')) {
      expect(tarjetasDe(x.id, x.varianteId).length, `${x.id}/roma vacío`).toBeGreaterThan(0)
    }
  })

  it('fuera de historia el tema mapea al imprimible entero', () => {
    expect(imprimiblesDeTema('quimica', 'tabla-periodica')).toEqual([{ id: 'quimica-elementos', varianteId: null }])
    expect(imprimiblesDeTema('biologia', 'ecosistemas')).toEqual([{ id: 'biologia-cadena', varianteId: null }])
  })

  it('un tema sin material da lista vacía (la página no pinta nada)', () => {
    expect(imprimiblesDeTema('quimica', 'acidos-bases')).toEqual([])
    expect(imprimiblesDeTema('historia', 'tema-inventado')).toEqual([])
    expect(imprimiblesDeTema(null, null)).toEqual([])
    expect(imprimiblesDeTema('historia', undefined)).toEqual([])
  })
})

describe('intercalarPorDorso', () => {
  it('los titulares no salen en bloques de la misma respuesta', () => {
    // PORTADAS trae primero los verdaderos y luego los falsos: sin
    // intercalar, recortar la hoja y repartir por bloques le daba a un grupo
    // entero solo VERDAD, y ahí no hay nada que decidir.
    for (const v of IMPRIMIBLES['historia-portadas'].variantes('es')) {
      const dorsos = tarjetasDe('historia-portadas', v.id).map(t => t.dorso)
      const cuenta = {}
      for (const d of dorsos) cuenta[d] = (cuenta[d] ?? 0) + 1
      const [mayor, menor] = Object.values(cuenta).sort((a, b) => b - a)

      let racha = 1, peor = 1
      for (let i = 1; i < dorsos.length; i++) {
        racha = dorsos[i] === dorsos[i - 1] ? racha + 1 : 1
        peor = Math.max(peor, racha)
      }
      // El tope no es fijo: con 10 verdades y 3 bulos es imposible bajar de
      // rachas de ~3, y exigir menos sería exigir algo que no existe. Lo que
      // sí se puede exigir es que la racha no pase de lo que impone la
      // proporción — que es justo lo que el intercalado tiene que lograr.
      const techo = Math.ceil(mayor / (menor + 1)) + 1
      expect(peor, `${v.id}: racha de ${peor} (techo ${techo}, ${mayor}/${menor})`).toBeLessThanOrEqual(techo)
    }
  })

  it('no pierde ni duplica tarjetas', () => {
    const original = [
      { frente: 'a', dorso: 'X' }, { frente: 'b', dorso: 'X' }, { frente: 'c', dorso: 'X' },
      { frente: 'd', dorso: 'Y' }, { frente: 'e', dorso: 'Y' },
    ]
    const salida = intercalarPorDorso(original)
    expect(salida).toHaveLength(original.length)
    expect(salida.map(t => t.frente).sort()).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  it('es determinista: dos llamadas dan el mismo orden', () => {
    // Reimprimir una hoja tiene que dar exactamente la misma hoja.
    const a = tarjetasDe('historia-portadas', 'gce').map(t => t.frente)
    const b = tarjetasDe('historia-portadas', 'gce').map(t => t.frente)
    expect(a).toEqual(b)
  })
})

describe('tarjetasDe', () => {
  it('un id o una variante que no existen dan lista vacía, no un error', () => {
    expect(tarjetasDe('no-existe', 'nada')).toEqual([])
    expect(tarjetasDe('historia-eventos', 'epoca-inventada')).toEqual([])
    expect(tarjetasDe('historia-eventos', null)).toEqual([])
    expect(tarjetasDe(undefined, undefined)).toEqual([])
  })

  it('las tarjetas de historia llevan el año como dorso', () => {
    const edadMedia = tarjetasDe('historia-eventos', 'edad-media')
    expect(edadMedia.length).toBeGreaterThan(0)
    for (const t of edadMedia) expect(t.dorso).toMatch(/^-?\d{1,4}$/)
  })
})

// ── Los tres sets con datos ya estructurados ─────────────────────────────────
// Estos no inventan contenido: reparten datos que ya usaban los juegos. Lo que
// hay que vigilar es justo eso — que sigan cuadrando con su fuente cuando la
// fuente cambie, y que ningún grupo quede tan pequeño que la hoja no sirva.
describe('orgánulos, órganos y planetas', () => {
  it('el número que anuncia el botón es el que se imprime de verdad', () => {
    // `n` sale en el botón antes de abrir la hoja: si miente, el profesor
    // imprime otra cosa distinta de la que le habíamos dicho.
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(tarjetasDe(id, v.id, 'es').length, `${id}/${v.id}`).toBe(v.n)
      }
    }
  })

  it('ningún grupo ofrecido se queda por debajo de lo que llena una hoja', () => {
    // Un botón que imprime una sola tarjeta (le pasaba al Sistema
    // Circulatorio, que en la silueta de Rayos X tiene solo el corazón) es
    // peor que no ofrecer el botón.
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        expect(v.n, `${id}/${v.id} solo da ${v.n}`).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('los orgánulos exclusivos avisan de en qué célula van, y los comunes no', () => {
    // Sin la pista, quien tiene el cloroplasto en la mano no puede saber si le
    // tocaba estar en la célula animal: es lo que hace comprobable el juego.
    const vegetal = tarjetasDe('biologia-organulos', 'vegetal', 'es')
    const cloroplasto = vegetal.find(t => t.frente.toLowerCase().includes('cloroplasto'))
    expect(cloroplasto?.pista).toBe('Solo en la vegetal')
    expect(vegetal.find(t => t.frente === 'Núcleo')?.pista).toBe(null)

    // Y ninguna célula ofrece un orgánulo que no le toca.
    const animal = tarjetasDe('biologia-organulos', 'animal', 'es')
    expect(animal.some(t => t.frente.toLowerCase().includes('cloroplasto'))).toBe(false)
  })

  it('"todos los sistemas" incluye los órganos que no tienen botón propio', () => {
    const todos = tarjetasDe('biologia-organos', 'todos', 'es')
    expect(todos.some(t => t.pista === 'Sistema Circulatorio')).toBe(true)
    expect(todos.some(t => t.pista === 'Sistema Nervioso')).toBe(true)
  })

  it('los planetas se parten por el cinturón de asteroides, sin perder ninguno', () => {
    const rocosos = tarjetasDe('geologia-planetas', 'rocosos', 'es')
    const gigantes = tarjetasDe('geologia-planetas', 'gigantes', 'es')
    expect(rocosos).toHaveLength(4)
    expect(gigantes).toHaveLength(4)
    expect(rocosos.some(t => t.frente.includes('Marte'))).toBe(true)
    expect(gigantes.some(t => t.frente.includes('Júpiter'))).toBe(true)
  })

  it('las hojas con dorso largo van en formato plegable', () => {
    // En el reparto de tira el dorso ocupa un tercio de columna: una frase
    // entera ahí sale en una tira de palabras sueltas ilegible.
    for (const id of IMPRIMIBLE_IDS) {
      const d = IMPRIMIBLES[id]
      const largo = d.variantes('es')
        .flatMap(v => tarjetasDe(id, v.id, 'es'))
        .reduce((max, t) => Math.max(max, String(t.dorso).length), 0)
      if (largo > 40) expect(d.formato, `${id}: dorsos de ${largo} caracteres`).toBe('plegable')
    }
  })

  it('los tres idiomas dan la misma cantidad de tarjetas y ninguna vacía', () => {
    for (const id of IMPRIMIBLE_IDS) {
      for (const v of IMPRIMIBLES[id].variantes('es')) {
        for (const lang of ['es', 'en', 'ca']) {
          const t = tarjetasDe(id, v.id, lang)
          expect(t.length, `${id}/${v.id}/${lang}`).toBe(v.n)
          for (const c of t) {
            expect(String(c.frente).trim(), `${id}/${v.id}/${lang} frente vacío`).not.toBe('')
            expect(String(c.dorso).trim(), `${id}/${v.id}/${lang} dorso vacío`).not.toBe('')
          }
        }
      }
    }
  })
})
