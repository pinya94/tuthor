import { describe, it, expect } from 'vitest'
import {
  NIVELES, genRonda, esCorrecta, prendaPara, sensacion, claveTraje, intensidadEn,
  KM_CASILLA, INTENSIDADES, LLUVIA_PARAGUAS, UV_SOL, explicacion, schemaQuestion, HORAS,
} from '../elTiempo'
import { CIUDADES_MAPA, MOJA } from '../elTiempoMapas'

// Generador con semilla: el test no depende de la suerte.
function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }

describe('El Tiempo · reglas', () => {
  it('prenda por temperatura y sensación con viento', () => {
    expect(prendaPara(5)).toBe('abrigo')
    expect(prendaPara(10)).toBe('chaqueta')
    expect(prendaPara(18)).toBe('chaqueta')
    expect(prendaPara(19)).toBe('camiseta')
    expect(sensacion(12, 40)).toBe(8)
    expect(sensacion(12, 20)).toBe(12)
  })
})

describe('El Tiempo · rondas generadas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 800 rondas coherentes`, () => {
      const rand = semilla(nivel.length * 7919)
      const tipos = {}, respuestas = {}
      for (let n = 0; n < 800; n++) {
        const r = genRonda(nivel, { rand })
        tipos[r.tipo] = (tipos[r.tipo] ?? 0) + 1
        expect(NIVELES[nivel].tipos).toContain(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'radar') {
          const { ahora, luego, ciudad, kmh, horas } = r.datos
          expect(intensidadEn(ahora, ciudad.x, ciudad.y)).toBe(0)
          expect(INTENSIDADES[intensidadEn(luego, ciudad.x, ciudad.y)]).toBe(r.bueno)
          expect((kmh / KM_CASILLA) * horas % 1).toBe(0)
          respuestas[r.bueno] = (respuestas[r.bueno] ?? 0) + 1
        } else if (r.tipo === 'mapa') {
          expect(r.opciones).toHaveLength(4)
          expect(new Set(r.opciones).size).toBe(4)
          expect(r.opciones).toContain(r.bueno)
          const t = r.datos.tiempo
          const ops = r.opciones.map(id => t[id])
          const p = r.datos.pregunta
          if (p === 'paraguas') expect(r.opciones.filter(id => MOJA.has(t[id].cielo))).toEqual([r.bueno])
          if (p === 'nieve') expect(r.opciones.filter(id => t[id].cielo === 'nieve')).toEqual([r.bueno])
          if (p === 'playa') expect(r.opciones.filter(id => CIUDADES_MAPA.find(c => c.id === id).costa && t[id].cielo === 'sol' && t[id].temp >= 24)).toEqual([r.bueno])
          if (p === 'frio') expect(Math.min(...ops.map(o => o.temp))).toBe(t[r.bueno].temp)
          if (p === 'calor') expect(Math.max(...ops.map(o => o.temp))).toBe(t[r.bueno].temp)
          if (p === 'frio' || p === 'calor') expect(ops.filter(o => o.temp === t[r.bueno].temp)).toHaveLength(1)
          // una sola estación por mapa: no nieva el mismo día que se va a la playa
          const cielos = Object.values(t).map(x => x.cielo)
          if (cielos.includes('nieve')) expect(r.datos.estacion).toBe('invierno')
          if (cielos.includes('tormenta')) expect(r.datos.estacion).toBe('verano')
          respuestas['mapa:' + r.bueno] = 1
        } else if (r.tipo === 'isobaras') {
          expect(r.opciones).toContain(r.bueno)
          expect(new Set(r.opciones).size).toBe(r.opciones.length)
          respuestas['iso:' + r.bueno] = 1
        } else {
          // la buena está entre 4 opciones distintas, y solo ella es correcta
          expect(r.opciones).toHaveLength(4)
          expect(new Set(r.opciones.map(claveTraje)).size).toBe(4)
          expect(r.opciones.filter(o => esCorrecta(r, o))).toHaveLength(1)
          const { temp, lluvia, uv } = r.datos
          expect(lluvia).not.toBe(LLUVIA_PARAGUAS)
          if (NIVELES[nivel].uv && r.tipo === 'simple') expect(uv).not.toBe(UV_SOL)
          expect([10, 18]).not.toContain(temp)
          if (r.tipo === 'simple') expect(temp <= 2 && lluvia >= 30).toBe(false)
          if (r.tipo === 'simple' && lluvia >= 60) expect(r.datos.cielo).toBe('lluvia')
          respuestas[claveTraje(r.bueno)] = (respuestas[claveTraje(r.bueno)] ?? 0) + 1
        }
        if (r.tipo === 'horas') {
          expect(r.datos.temps).toHaveLength(HORAS.length)
          expect(r.datos.fin).toBeGreaterThan(r.datos.inicio)
        }
        for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l).length).toBeGreaterThan(20)
        if (r.tipo === 'simple' || r.tipo === 'mapa') expect(schemaQuestion(r, 'es').wrongAnswers).toHaveLength(3)
      }
      // todos los formatos del nivel salen, y las respuestas no se repiten siempre
      expect(Object.keys(tipos).sort()).toEqual([...NIVELES[nivel].tipos].sort())
      expect(Object.keys(respuestas).length).toBeGreaterThan(4)
    })
  }

  it('el radar da las cuatro respuestas, también «no lloverá»', () => {
    const rand = semilla(42)
    const vistas = new Set()
    for (let n = 0; n < 300; n++) vistas.add(genRonda('medio', { rand, tipo: 'radar' }).bueno)
    expect([...vistas].sort()).toEqual([...INTENSIDADES].sort())
  })

  it('por horas: el paraguas depende de si la lluvia cae DURANTE la salida', () => {
    const rand = semilla(7)
    let con = 0, sin = 0, lluviaFuera = 0
    for (let n = 0; n < 300; n++) {
      const r = genRonda('medio', { rand, tipo: 'horas' })
      if (r.bueno.paraguas) con++; else sin++
      if (!r.bueno.paraguas && Math.max(...r.datos.lluvias) >= 60) lluviaFuera++
    }
    expect(con).toBeGreaterThan(60)
    expect(sin).toBeGreaterThan(60)
    expect(lluviaFuera).toBeGreaterThan(30) // llueve ese día, pero no mientras estás fuera
  })
})

describe('El Tiempo · mapa e isobaras', () => {
  it('el mapa pregunta de todo, y las isobaras sus tres cosas', () => {
    const rand = semilla(99)
    const preg = new Set(), iso = new Set()
    for (let n = 0; n < 400; n++) {
      preg.add(genRonda('medio', { rand, tipo: 'mapa' }).datos.pregunta)
      const r = genRonda('dificil', { rand, tipo: 'isobaras' })
      iso.add(r.datos.pregunta + ':' + (r.datos.pregunta === 'viento' ? 'x' : r.bueno))
    }
    expect([...preg].sort()).toEqual(['calor', 'frio', 'nieve', 'paraguas', 'playa'])
    expect([...iso].sort()).toEqual(['concepto:A', 'concepto:B', 'tiempo:anticiclon', 'tiempo:borrasca', 'viento:x'])
  })
  it('en isobaras, la ciudad del viento fuerte es la más cercana a la borrasca', () => {
    const rand = semilla(5)
    for (let n = 0; n < 200; n++) {
      const r = genRonda('dificil', { rand, tipo: 'isobaras' })
      if (r.datos.pregunta !== 'viento') continue
      const d = (id, P) => { const c = CIUDADES_MAPA.find(x => x.id === id); return Math.hypot(c.xy[0] - P[0], c.xy[1] - P[1]) }
      const otra = r.datos.marcadas.find(id => id !== r.bueno)
      expect(d(r.bueno, r.datos.B)).toBeLessThan(d(otra, r.datos.B))
    }
  })
})
