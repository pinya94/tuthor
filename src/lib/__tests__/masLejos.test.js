import { describe, it, expect } from 'vitest'
import { LUGARES, POR_ID, NIVELES, km, genRonda, esCorrecta, explicacion, schemaQuestion, etiqueta, fmtKm } from '../masLejos'

const d = (a, b) => km(POR_ID[a], POR_ID[b])

describe('¿Más Lejos?', () => {
  it('las distancias coinciden con las de referencia (±2 %)', () => {
    // Distancias ortodrómicas conocidas
    const ref = [['madrid', 'londres', 1264], ['dublin', 'londres', 464], ['nueva-york', 'los-angeles', 3936], ['tokio', 'sidney', 7826], ['madrid', 'buenos-aires', 10040]]
    for (const [a, b, k] of ref) expect(Math.abs(d(a, b) - k) / k, `${a}-${b}: ${d(a, b)}`).toBeLessThan(0.02)
  })

  it('los lugares tienen nombre en los tres idiomas, coordenadas válidas e ids únicos', () => {
    expect(new Set(LUGARES.map(p => p.id)).size).toBe(LUGARES.length)
    for (const p of LUGARES) {
      for (const l of ['es', 'en', 'ca']) expect(p.nombre[l], p.id).toBeTruthy()
      expect(Math.abs(p.lat)).toBeLessThanOrEqual(90)
      expect(Math.abs(p.lon)).toBeLessThanOrEqual(180)
      // países y comunidades llevan su capital, que es desde donde se mide
      if (p.tipo !== 'ciudad') expect(p.capital, p.id).toBeTruthy()
    }
    expect(etiqueta('china', 'es')).toBe('China · Pekín')
  })

  it('cada ronda respeta el margen del nivel: nunca una comparación discutible', () => {
    for (const [nivel, N] of Object.entries(NIVELES)) {
      let anterior = null
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel, { anterior })
        const { anterior: p, actual: t } = r
        const c = Math.max(t.km, p.km) / Math.min(t.km, p.km)
        const conPais = [p.a, p.b, t.a, t.b].some(id => POR_ID[id].tipo === 'pais')
        expect(c, r.id).toBeGreaterThanOrEqual(conPais ? Math.max(N.margen, 1.3) : N.margen)
        expect(c, r.id).toBeLessThanOrEqual(N.maxMargen)
        for (const id of [t.a, t.b]) expect(N.tipos).toContain(POR_ID[id].tipo)
        expect(t.km).toBeGreaterThanOrEqual(250)
        expect(esCorrecta(r, t.km > p.km ? 'lejos' : 'cerca')).toBe(true)
        expect(esCorrecta(r, t.km > p.km ? 'cerca' : 'lejos')).toBe(false)
        for (const l of ['es', 'en', 'ca']) expect(explicacion(r, l)).toContain(fmtKm(t.km, l))
        const q = schemaQuestion(r, 'es')
        expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        anterior = t // encadenadas, como en el juego
      }
    }
  })

  it('en difícil no hay países: solo puntos exactos', () => {
    for (let i = 0; i < 200; i++) {
      const r = genRonda('dificil')
      for (const id of [r.anterior.a, r.anterior.b, r.actual.a, r.actual.b]) expect(POR_ID[id].tipo).not.toBe('pais')
    }
  })

  it('salen las dos respuestas y trayectos cortos y largos', () => {
    const rs = Array.from({ length: 300 }, () => genRonda('medio'))
    expect(new Set(rs.map(r => r.respuesta))).toEqual(new Set(['lejos', 'cerca']))
    expect(rs.some(r => r.actual.km < 1000)).toBe(true)
    expect(rs.some(r => r.actual.km > 8000)).toBe(true)
  })
})
