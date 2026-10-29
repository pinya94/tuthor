import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, RIOS, MONTES, ELEMENTOS, VERTIENTES, delNivel, elemento, medio, esCorrecta, enunciado, explicacion, textoRespuesta, schemaQuestion } from '../riosMontanas'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
// La península: todo punto tiene que caer dentro (si no, la línea sale al mar o a Francia)
const dentro = ([lon, lat]) => lon > -9.6 && lon < 3.4 && lat > 36.0 && lat < 43.9
const dist = ([a, b], [c, d]) => Math.hypot(a - c, b - d)

describe('Ríos y Montañas: datos', () => {
  it('cada elemento con nombre en los tres idiomas y puntos en la península', () => {
    const ids = new Set()
    for (const e of ELEMENTOS) {
      expect(ids.has(e.id), e.id).toBe(false); ids.add(e.id)
      for (const l of ['es', 'en', 'ca']) expect(e.nombre[l], e.id).toBeTruthy()
      expect(e.puntos.length).toBeGreaterThanOrEqual(3)
      for (const p of e.puntos) expect(dentro(p), `${e.id} ${p}`).toBe(true)
    }
  })

  it('vertientes de libro', () => {
    const v = Object.fromEntries(RIOS.map(r => [r.id, r.vertiente]))
    expect(v).toMatchObject({ mino: 'atlantica', duero: 'atlantica', tajo: 'atlantica', guadiana: 'atlantica', guadalquivir: 'atlantica', ebro: 'mediterranea', jucar: 'mediterranea', turia: 'mediterranea', segura: 'mediterranea', nalon: 'cantabrica', nervion: 'cantabrica' })
    for (const r of RIOS) expect(Object.keys(VERTIENTES)).toContain(r.vertiente)
  })

  it('cada río desemboca hacia su mar', () => {
    const fin = id => RIOS.find(r => r.id === id).puntos.at(-1)
    // atlánticos: al oeste o al sur-oeste; mediterráneos: al este; cantábricos: al norte
    for (const r of RIOS) {
      const [lon, lat] = fin(r.id)
      if (r.vertiente === 'cantabrica') expect(lat, r.id).toBeGreaterThan(43.2)
      if (r.vertiente === 'mediterranea') expect(lon, r.id).toBeGreaterThan(-1)
      if (r.vertiente === 'atlantica') expect(lon, r.id).toBeLessThan(-6)
    }
  })

  it('la geografía cuadra: el Tajo entre el Sistema Central y los Montes de Toledo, el Guadalquivir entre Sierra Morena y los Béticos', () => {
    const tajoToledo = RIOS.find(r => r.id === 'tajo').puntos.find(p => p[0] === -4.02)
    expect(tajoToledo[1]).toBeLessThan(40.2) // al sur del Sistema Central
    expect(tajoToledo[1]).toBeGreaterThan(39.55) // al norte de los Montes de Toledo
    const sevilla = RIOS.find(r => r.id === 'guadalquivir').puntos.find(p => p[0] === -5.99)
    expect(sevilla[1]).toBeLessThan(38.0) // al sur de Sierra Morena
    expect(sevilla[1]).toBeGreaterThan(36.9) // al norte de los Béticos
    // El Ebro nace en la Cordillera Cantábrica
    const cant = MONTES.find(m => m.id === 'cantabrica').puntos
    expect(Math.min(...cant.map(p => dist(p, RIOS.find(r => r.id === 'ebro').puntos[0])))).toBeLessThan(0.5)
  })
})

describe('Ríos y Montañas: rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas corregibles, sin repetir puntos juntos y que viajan en JSON`, () => {
      const rand = semilla(nivel.length * 7919)
      const tipos = new Set()
      const visibles = new Set(delNivel(nivel).map(e => e.id))
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(JSON.parse(JSON.stringify(r))).toEqual(r)
        let buena
        if (r.tipo === 'busca') { buena = r.objetivo; expect(visibles.has(r.objetivo)).toBe(true) }
        if (r.tipo === 'etiqueta') {
          buena = r.marcados
          expect(r.fichas).toHaveLength(4)
          for (const id of r.marcados) expect(r.fichas).toContain(id)
          expect(esCorrecta(r, [...r.marcados].reverse())).toBe(false)
          // los tres números no se pisan en el mapa
          const m = r.marcados.map(id => medio(elemento(id)))
          for (let a = 0; a < 3; a++) for (let c = a + 1; c < 3; c++) expect(dist(m[a], m[c])).toBeGreaterThanOrEqual(1.8)
        }
        if (r.tipo === 'vertiente') {
          buena = Object.fromEntries(r.rios.map(id => [id, elemento(id).vertiente]))
          for (const id of r.rios) expect(r.vertientes).toContain(elemento(id).vertiente)
          const mal = { ...buena, [r.rios[0]]: r.vertientes.find(v => v !== buena[r.rios[0]]) }
          expect(esCorrecta(r, mal)).toBe(false)
        }
        if (r.tipo === 'extremos') {
          buena = r.objetivo
          expect(r.puntos).toHaveLength(4)
          expect(r.puntos).toContain(r.objetivo)
          if (r.que === 'nace') expect(elemento(r.objetivo).naceDiscutido).toBeFalsy()
          const p = id => (r.que === 'nace' ? elemento(id).puntos[0] : elemento(id).puntos.at(-1))
          for (const a of r.puntos) for (const b of r.puntos) if (a !== b) expect(dist(p(a), p(b))).toBeGreaterThan(0.9)
        }
        expect(esCorrecta(r, buena), JSON.stringify(r)).toBe(true)
        for (const l of ['es', 'en', 'ca']) {
          for (const t of [enunciado(r, l), explicacion(r, l), textoRespuesta(r, l)]) expect(t).not.toMatch(/undefined|NaN|\[object/)
          const q = schemaQuestion(r, l)
          expect(q.question && q.correctAnswer).toBeTruthy()
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})
