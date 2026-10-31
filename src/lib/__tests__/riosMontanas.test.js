import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, REGIONES, ELEMENTOS, delNivel, elemento, elementosDe, medio, esCorrecta, enunciado, explicacion, textoRespuesta, schemaQuestion } from '../riosMontanas'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}
const dist = ([a, b], [c, d]) => Math.hypot(a - c, b - d)
const rios = g => REGIONES[g].rios
const rio = (g, id) => rios(g).find(r => r.id === id)

// Cada región: todo punto tiene que caer dentro de su recuadro (si no, la línea se sale del mapa)
const RECUADRO = {
  espana: ([lon, lat]) => lon > -9.6 && lon < 3.4 && lat > 36.0 && lat < 43.9,
  mundo: ([lon, lat]) => lon > -170 && lon < 180 && lat > -56 && lat < 76,
  eeuu: ([lon, lat]) => lon > -126 && lon < -66 && lat > 24 && lat < 51,
  europa: ([lon, lat]) => lon > -11 && lon < 66 && lat > 36 && lat < 70,
  'reino-unido': ([lon, lat]) => lon > -8 && lon < 2 && lat > 50 && lat < 59,
}

describe('Ríos y Montañas: datos', () => {
  it('ids únicos en todas las regiones, nombres en tres idiomas y puntos dentro de su mapa', () => {
    const ids = new Set()
    for (const e of ELEMENTOS) {
      expect(ids.has(e.id), e.id).toBe(false); ids.add(e.id)
      for (const l of ['es', 'en', 'ca']) expect(e.nombre[l], e.id).toBeTruthy()
      expect(e.puntos.length).toBeGreaterThanOrEqual(3)
      expect(RECUADRO[e.region], e.region).toBeTruthy()
      for (const p of e.puntos) expect(RECUADRO[e.region](p), `${e.id} ${p}`).toBe(true)
      if (e.clase === 'rio') {
        expect(e.vertiente === null || REGIONES[e.region].vertientes[e.vertiente], `${e.id} vertiente`).toBeTruthy()
        for (const l of ['es', 'en', 'ca']) expect(e.nace[l] && e.desemboca[l], e.id).toBeTruthy()
      }
    }
    for (const g of Object.values(REGIONES)) for (const v of g.vertientesFacil ?? []) expect(g.vertientes[v]).toBeTruthy()
  })

  describe('España', () => {
    it('vertientes de libro', () => {
      const v = Object.fromEntries(rios('espana').map(r => [r.id, r.vertiente]))
      expect(v).toMatchObject({ mino: 'atlantica', duero: 'atlantica', tajo: 'atlantica', guadiana: 'atlantica', guadalquivir: 'atlantica', ebro: 'mediterranea', jucar: 'mediterranea', turia: 'mediterranea', segura: 'mediterranea', nalon: 'cantabrica', nervion: 'cantabrica' })
    })
    it('cada río desemboca hacia su mar', () => {
      for (const r of rios('espana')) {
        const [lon, lat] = r.puntos.at(-1)
        if (r.vertiente === 'cantabrica') expect(lat, r.id).toBeGreaterThan(43.2)
        if (r.vertiente === 'mediterranea') expect(lon, r.id).toBeGreaterThan(-1)
        if (r.vertiente === 'atlantica') expect(lon, r.id).toBeLessThan(-6)
      }
    })
    it('la geografía cuadra: el Tajo entre el Sistema Central y los Montes de Toledo, el Guadalquivir entre Sierra Morena y los Béticos', () => {
      const tajoToledo = rio('espana', 'tajo').puntos.find(p => p[0] === -4.02)
      expect(tajoToledo[1]).toBeLessThan(40.2)
      expect(tajoToledo[1]).toBeGreaterThan(39.55)
      const sevilla = rio('espana', 'guadalquivir').puntos.find(p => p[0] === -5.99)
      expect(sevilla[1]).toBeLessThan(38.0)
      expect(sevilla[1]).toBeGreaterThan(36.9)
      const cant = REGIONES.espana.montes.find(m => m.id === 'cantabrica').puntos
      expect(Math.min(...cant.map(p => dist(p, rio('espana', 'ebro').puntos[0])))).toBeLessThan(0.5)
    })
  })

  describe('El mundo', () => {
    it('océanos de libro, y sin océano los que acaban en un mar cerrado o casi', () => {
      const v = Object.fromEntries(rios('mundo').map(r => [r.id, r.vertiente]))
      expect(v).toMatchObject({ amazonas: 'atlantico', misisipi: 'atlantico', congo: 'atlantico', niger: 'atlantico', yangtse: 'pacifico', ganges: 'indico', lena: 'artico', mackenzie: 'artico', nilo: null, danubio: null, volga: null })
    })
    it('cada río acaba donde debe', () => {
      const fin = id => rio('mundo', id).puntos.at(-1)
      expect(fin('nilo')[1]).toBeGreaterThan(31) // en el Mediterráneo, al norte de El Cairo
      expect(fin('amazonas')[1]).toBeCloseTo(0, 0) // en el ecuador
      expect(fin('lena')[1]).toBeGreaterThan(70) // en el Ártico
      expect(fin('mackenzie')[1]).toBeGreaterThan(68)
      expect(fin('ganges')[1]).toBeLessThan(23) // golfo de Bengala
      expect(fin('yangtse')[0]).toBeGreaterThan(121) // Shanghái
      // el Congo cruza el ecuador dos veces: hay puntos al norte y al sur
      const lat = rio('mundo', 'congo').puntos.map(p => p[1])
      expect(Math.max(...lat)).toBeGreaterThan(0)
      expect(lat[0]).toBeLessThan(0)
      expect(lat.at(-1)).toBeLessThan(0)
    })
    it('no se pregunta el nacimiento discutido del Nilo, el Amazonas y el Congo', () => {
      for (const id of ['nilo', 'amazonas', 'congo']) expect(rio('mundo', id).naceDiscutido).toBe(true)
    })
  })
})

describe('Estados Unidos', () => {
  it('mares de libro', () => {
    const v = Object.fromEntries(rios('eeuu').map(r => [r.id, r.vertiente]))
    expect(v).toMatchObject({ 'misisipi-eeuu': 'golfo', misuri: 'golfo', ohio: 'golfo', bravo: 'golfo', colorado: 'pacifico', columbia: 'pacifico', hudson: 'atlantico', potomac: 'atlantico' })
  })
  it('cada río acaba donde debe y los afluentes tocan al Misisipi', () => {
    const misi = rio('eeuu', 'misisipi-eeuu').puntos
    for (const r of rios('eeuu')) {
      const [lon, lat] = r.puntos.at(-1)
      if (r.afluenteDe) expect(Math.min(...misi.map(p => dist(p, [lon, lat]))), r.id).toBeLessThan(0.5)
      else if (r.vertiente === 'golfo') expect(lat, r.id).toBeLessThan(30.5)
      if (r.vertiente === 'pacifico') expect(lon, r.id).toBeLessThan(-114)
      if (r.vertiente === 'atlantico') expect(lon, r.id).toBeGreaterThan(-77.5)
    }
  })
  it('las Rocosas reparten las aguas: lo que va al Pacífico nace al oeste de ellas o en ellas', () => {
    for (const r of rios('eeuu').filter(x => x.vertiente === 'pacifico')) expect(r.puntos[0][0], r.id).toBeLessThan(-105)
  })
})

describe('Europa', () => {
  it('vertientes como en los libros de ESO', () => {
    const v = Object.fromEntries(rios('europa').map(r => [r.id, r.vertiente]))
    expect(v).toMatchObject({ 'danubio-europa': 'mediterranea', rodano: 'mediterranea', po: 'mediterranea', dnieper: 'mediterranea', rin: 'atlantica', sena: 'atlantica', loira: 'atlantica', elba: 'atlantica', vistula: 'atlantica', tamesis: 'atlantica', 'volga-europa': 'caspio', ural: 'caspio', dvina: 'artica' })
  })
  it('cada río acaba en su mar', () => {
    const fin = id => rio('europa', id).puntos.at(-1)
    expect(fin('rin')[0]).toBeLessThan(5) // mar del Norte, en Róterdam
    expect(fin('vistula')[1]).toBeGreaterThan(54) // Báltico
    expect(fin('dvina')[1]).toBeGreaterThan(64) // mar Blanco
    for (const id of ['volga-europa', 'ural']) expect(fin(id)[1], id).toBeLessThan(47.2) // Caspio
    for (const id of ['danubio-europa', 'dnieper']) { const [lon, lat] = fin(id); expect(lon, id).toBeGreaterThan(29); expect(lat, id).toBeLessThan(46.7) } // mar Negro (su costa norte está a ~46,5°)
    for (const id of ['rodano', 'po']) expect(fin(id)[1], id).toBeLessThan(45.1) // Mediterráneo
    // el Loira nace en el Macizo Central
    const mc = REGIONES.europa.montes.find(m => m.id === 'macizo-central').puntos
    expect(Math.min(...mc.map(p => dist(p, rio('europa', 'loira').puntos[0])))).toBeLessThan(1)
  })
})

describe('Reino Unido', () => {
  it('cada río va a su mar: al este, al mar del Norte; al oeste, al Atlántico o al mar de Irlanda', () => {
    const v = Object.fromEntries(rios('reino-unido').map(r => [r.id, r.vertiente]))
    expect(v).toMatchObject({ 'tamesis-uk': 'norte', trent: 'norte', tyne: 'norte', tweed: 'norte', tay: 'norte', severn: 'atlantico', clyde: 'atlantico', mersey: 'irlanda' })
    for (const r of rios('reino-unido')) {
      const [lon] = r.puntos.at(-1)
      if (r.vertiente === 'norte') expect(lon, r.id).toBeGreaterThan(-3.1)
      else expect(lon, r.id).toBeLessThan(-2.9)
    }
  })
  it('el Severn nace en los Montes Cámbricos', () => {
    const mc = REGIONES['reino-unido'].montes.find(m => m.id === 'cambricos').puntos
    expect(Math.min(...mc.map(p => dist(p, rio('reino-unido', 'severn').puntos[0])))).toBeLessThan(0.4)
  })
})

describe('Ríos y Montañas: rondas', () => {
  for (const region of Object.keys(REGIONES)) {
    for (const nivel of Object.keys(NIVELES)) {
      it(`${region} · ${nivel}: 400 rondas corregibles, sin puntos juntos y que viajan en JSON`, () => {
        const g = REGIONES[region]
        const rand = semilla(nivel.length * 7919 + region.length)
        const tipos = new Set()
        const visibles = new Set(delNivel(nivel, region).map(e => e.id))
        for (let i = 0; i < 400; i++) {
          const r = genRonda(nivel, { rand, region })
          expect(r.region).toBe(region)
          tipos.add(r.tipo)
          expect(JSON.parse(JSON.stringify(r))).toEqual(r)
          let buena
          if (r.tipo === 'busca') { buena = r.objetivo; expect(visibles.has(r.objetivo)).toBe(true) }
          if (r.tipo === 'etiqueta') {
            buena = r.marcados
            expect(r.fichas).toHaveLength(4)
            for (const id of r.marcados) { expect(r.fichas).toContain(id); expect(visibles.has(id)).toBe(true) }
            expect(esCorrecta(r, [...r.marcados].reverse())).toBe(false)
            const m = r.marcados.map(id => medio(elemento(id)))
            for (let a = 0; a < 3; a++) for (let c = a + 1; c < 3; c++) expect(dist(m[a], m[c])).toBeGreaterThanOrEqual(g.sepNumeros)
          }
          if (r.tipo === 'vertiente') {
            buena = Object.fromEntries(r.rios.map(id => [id, elemento(id).vertiente]))
            for (const id of r.rios) { expect(elemento(id).vertiente).toBeTruthy(); expect(r.vertientes).toContain(elemento(id).vertiente) }
            const mal = { ...buena, [r.rios[0]]: r.vertientes.find(v => v !== buena[r.rios[0]]) }
            expect(esCorrecta(r, mal)).toBe(false)
          }
          if (r.tipo === 'extremos') {
            buena = r.objetivo
            expect(r.puntos).toHaveLength(4)
            expect(r.puntos).toContain(r.objetivo)
            if (r.que === 'nace') for (const id of r.puntos) expect(elemento(id).naceDiscutido).toBeFalsy()
            const p = id => (r.que === 'nace' ? elemento(id).puntos[0] : elemento(id).puntos.at(-1))
            for (const a of r.puntos) for (const b of r.puntos) if (a !== b) expect(dist(p(a), p(b))).toBeGreaterThan(g.sepPuntos)
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
  }

  it('el recorrido del juego cubre cada mapa entero en pocas rondas, prefiriendo lo que aún no ha salido', () => {
    for (const region of Object.keys(REGIONES)) {
      for (const nivel of Object.keys(NIVELES)) {
        const todos = delNivel(nivel, region).map(e => e.id)
        const rand = semilla(todos.length * 31 + nivel.length)
        const vistos = new Set()
        let rondas = 0
        while (vistos.size < todos.length && rondas < 200) {
          const r = genRonda(nivel, { rand, region, prefiere: todos.filter(id => !vistos.has(id)) })
          for (const id of elementosDe(r)) vistos.add(id)
          rondas++
        }
        expect(vistos.size, `${region} · ${nivel}`).toBe(todos.length)
        // cada ronda saca al menos un elemento nuevo: nunca más rondas que elementos
        expect(rondas, `${region} · ${nivel}`).toBeLessThanOrEqual(todos.length)
      }
    }
  })

  it('el juego mezcla regiones según los pesos', () => {
    const rand = semilla(42)
    const cuenta = {}
    for (let i = 0; i < 600; i++) { const r = genRonda('medio', { rand, pesos: { espana: 3, mundo: 1 } }); cuenta[r.region] = (cuenta[r.region] ?? 0) + 1 }
    expect(cuenta.espana).toBeGreaterThan(cuenta.mundo * 2)
    expect(cuenta.mundo).toBeGreaterThan(60)
  })
})
