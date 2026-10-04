import { describe, it, expect } from 'vitest'
import { NIVELES, genRonda, resolverTren, esCorrecta, explicacion, schemaQuestion, textoOpcion } from '../engranajes'
import { posiciones } from '../../components/engranajes/TrenEngranajes'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }

describe('Engranajes · física', () => {
  it('dos ruedas: sentido contrario y n1·z1 = n2·z2', () => {
    const t = resolverTren([{ z: 12 }, { z: 36, mueve: 0 }], 60, 1)
    expect(t[1].sentido).toBe(-1)
    expect(t[1].rpm).toBe(20)
  })
  it('una rueda loca no cambia la velocidad final, solo el sentido', () => {
    const t = resolverTren([{ z: 12 }, { z: 40, mueve: 0 }, { z: 36, mueve: 1 }], 60, 1)
    expect(t[2].rpm).toBe(20)
    expect(t[2].sentido).toBe(1)
  })
  it('una rueda doble multiplica la reducción y comparte giro', () => {
    const t = resolverTren([{ z: 10 }, { z: 40, mueve: 0 }, { z: 10, mueve: 1, mismoEje: true }, { z: 40, mueve: 2 }], 160, 1)
    expect(t[2].rpm).toBe(t[1].rpm)
    expect(t[2].sentido).toBe(t[1].sentido)
    expect(t[3].rpm).toBe(10)
  })
})

describe('Engranajes · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: 500 rondas coherentes y variadas`, () => {
      const rand = semilla(nivel.length * 313)
      const firmas = new Set(), preguntas = new Set()
      for (let n = 0; n < 500; n++) {
        const r = genRonda(nivel, { rand })
        firmas.add(r.tren.map(x => x.z + (x.mismoEje ? '=' : '')).join('-') + r.pregunta)
        preguntas.add(r.pregunta)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        const [a, b] = NIVELES[nivel].ruedas
        const ejes = r.tren.filter(x => !x.mismoEje).length
        expect(ejes).toBeGreaterThanOrEqual(a)
        expect(ejes).toBeLessThanOrEqual(b)
        if (NIVELES[nivel].doble) expect(r.tren.some(x => x.mismoEje)).toBe(true)
        expect(Number.isInteger(r.tren[r.tren.length - 1].rpm)).toBe(true)
        if (r.pregunta === 'rpm') expect(r.opciones.every(o => Number.isInteger(o) && o > 0)).toBe(true)
        for (const l of ['es', 'en', 'ca']) {
          expect(explicacion(r, l).length).toBeGreaterThan(30)
          for (const o of r.opciones) expect(textoOpcion(o, l)).toBeTruthy()
        }
        const q = schemaQuestion(r, 'es')
        if (q) expect(q.wrongAnswers).toHaveLength(r.opciones.length - 1)
        // el dibujo: ruedas engranadas, tocándose por su radio
        expect(posiciones(r.tren)).toHaveLength(r.tren.length)
      }
      expect([...preguntas].sort()).toEqual([...new Set(NIVELES[nivel].preguntas)].sort())
      expect(firmas.size).toBeGreaterThan(nivel === 'facil' ? 60 : 150)
    })
  }
})
