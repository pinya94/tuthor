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
