// Invariantes de los imprimibles. Lo que de verdad importa: que una tarjeta
// nunca salga a imprimir sin las dos caras (un frente vacío o un dorso vacío
// es papel gastado en balde), que las variantes que se ofrecen tengan
// contenido de verdad detrás, y que un id inventado no tumbe el panel.
import { describe, it, expect } from 'vitest'
import { IMPRIMIBLES, IMPRIMIBLE_IDS, MAX_TARJETAS, tarjetasDe } from '../materialImprimible'

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
