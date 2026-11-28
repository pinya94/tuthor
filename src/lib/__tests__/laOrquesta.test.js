import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, INSTRUMENTOS, FAMILIAS, SUBFAMILIAS, SONIDOS, HS, SIN_SITIO, instrumento, esCorrecta, cajaDe, textoCaja, enunciado, explicacion, schemaQuestion, correccion, porQue, bienDe, REGLA_PLANO, crearBolsa } from '../laOrquesta'
import { MAX_SEGUIDAS } from '../bolsaMecanicas'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('La Orquesta', () => {
  it('datos y trampas del temario', () => {
    for (const i of INSTRUMENTOS) {
      expect(FAMILIAS[i.familia], i.id).toBeTruthy()
      expect(SUBFAMILIAS[i.sub], i.id).toBeTruthy()
      expect(SONIDOS[i.sonido], i.id).toBeTruthy()
      expect(HS[i.hs], i.id).toBeTruthy()
    }
    // La familia la decide cómo suena, no el material.
    expect(instrumento('flauta').familia).toBe('madera')
    expect(instrumento('saxofon').familia).toBe('madera')
    expect(instrumento('piano').familia).toBe('cuerda')
    expect(instrumento('timbal').sub).toBe('afinada')
    // Coherencia sonido ↔ Hornbostel-Sachs
    for (const i of INSTRUMENTOS) {
      if (['arco', 'pulsar', 'macillos'].includes(i.sonido)) expect(i.hs, i.id).toBe('cordofono')
      if (['bisel', 'lengueta', 'doble', 'labios'].includes(i.sonido)) expect(i.hs, i.id).toBe('aerofono')
      if (i.sonido === 'membrana') expect(i.hs, i.id).toBe('membranofono')
      if (i.sonido === 'cuerpo') expect(i.hs, i.id).toBe('idiofono')
    }
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 211)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(esCorrecta(r, r.bueno)).toBe(true)
        expect(new Set(r.inst).size).toBe(r.inst.length)
        if (r.tipo === 'sienta') for (const id of r.inst) { expect(SIN_SITIO).not.toContain(id); expect(FAMILIAS[instrumento(id).familia]).toBeTruthy() }
        if (r.tipo === 'empareja') expect([...r.nombres].sort()).toEqual([...r.inst].sort())
        if (r.tipo === 'clasifica') {
          expect(new Set(r.cajas).size).toBe(r.cajas.length)
          for (const id of r.inst) expect(r.cajas).toContain(cajaDe(r, id))
          for (const l of ['es', 'en', 'ca']) for (const c of r.cajas) expect(textoCaja(r, c, l)).toBeTruthy()
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).toBeTruthy()
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
      expect(SUBFAMILIAS && SONIDOS && HS && INSTRUMENTOS.length).toBeTruthy()
    })
  }
})

describe('La Orquesta · bolsa de mecánicas y evitar', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: mecánicas repartidas, nunca 3 seguidas, sin repetir la ronda anterior`, () => {
      const mecs = [...new Set(NIVELES[nivel].tipos)]
      const cuenta = Object.fromEntries(mecs.map(m => [m, 0]))
      let total = 0
      for (let sem = 1; sem <= 200; sem++) {
        const rand = semilla(sem * 7919)
        const bolsa = crearBolsa(nivel, { rand })
        let prev = null, racha = 0
        for (let i = 0; i < 12; i++) {
          const r = genRonda(nivel, { rand, bolsa, evitar: prev?.clave })
          expect(r.clave).toBeTruthy()
          if (prev) {
            expect(r.clave, `semilla ${sem} ronda ${i}`).not.toBe(prev.clave)
            // en «clasifica» con varias variantes, nunca la misma dos veces seguidas
            if (r.tipo === 'clasifica' && prev.tipo === 'clasifica' && NIVELES[nivel].clasifica.length > 1) expect(r.variante).not.toBe(prev.variante)
          }
          racha = prev && r.tipo === prev.tipo ? racha + 1 : 1
          expect(racha, `semilla ${sem}: ${r.tipo} ${racha} seguidas`).toBeLessThanOrEqual(MAX_SEGUIDAS)
          cuenta[r.tipo]++; total++
          prev = r
        }
      }
      for (const m of mecs) {
        const peso = NIVELES[nivel].tipos.filter(t => t === m).length / NIVELES[nivel].tipos.length
        expect(Math.abs(cuenta[m] / total - peso), `${nivel} ${m}: ${cuenta[m]}/${total}`).toBeLessThan(0.08)
      }
    })
  }
  it('la bolsa es de cada partida y en las primeras rondas salen todas las mecánicas', () => {
    for (let sem = 1; sem <= 50; sem++) {
      const rand = semilla(sem * 131)
      const bolsa = crearBolsa('medio', { rand })
      expect(bolsa.historial).toHaveLength(0)
      const vistas = new Set([0, 1, 2].map(() => genRonda('medio', { rand, bolsa }).tipo))
      expect(vistas.size, `semilla ${sem}`).toBe(3)
    }
  })
})

describe('La Orquesta · corrección concreta', () => {
  it('una línea por instrumento: lo que pusiste y lo bueno, no un texto genérico', () => {
    const rand = semilla(99)
    for (let i = 0; i < 300; i++) {
      const r = genRonda(['facil', 'medio', 'dificil'][i % 3], { rand })
      const bien = Object.fromEntries(r.inst.map(id => [id, bienDe(r, id)]))
      for (const l of ['es', 'en', 'ca']) {
        const c = correccion(r, bien, l)
        expect(c).toHaveLength(r.inst.length)
        expect(c.every(x => x.ok)).toBe(true)
        for (const x of c) expect(x.texto).not.toMatch(/undefined|null/)
        expect(porQue(r, l)).not.toMatch(/undefined/)
      }
      // Un instrumento mal puesto: solo su línea sale ✗ y nombra lo elegido y lo bueno.
      const id = r.inst[0]
      const opciones = r.tipo === 'sienta' ? Object.keys(FAMILIAS) : r.tipo === 'empareja' ? r.inst : r.cajas
      const malo = opciones.find(o => o !== bien[id])
      const c = correccion(r, { ...bien, [id]: malo }, 'es')
      expect(c[0].ok).toBe(false)
      expect(c.slice(1).every(x => x.ok)).toBe(true)
      if (r.tipo === 'sienta') expect(c[0].texto).toMatch(/no es de .+, sino de /)
      if (r.tipo === 'clasifica') expect(c[0].texto).toMatch(/no es «.+», sino «.+»/)
      if (r.tipo === 'empareja') expect(c[0].texto).toMatch(/uniste su dibujo con «/)
      // El «por qué» de una ronda con un fallo habla del fallado (si tiene trampa)
      const pq = porQue(r, 'es', [id])
      if (instrumento(id).nota) expect(pq).toContain(instrumento(id).nota.es)
    }
  })
  it('sin absolutos: el fagot no es «el más grave» y el plano dice «normalmente»', () => {
    expect(instrumento('fagot').nota.es).not.toMatch(/el más grave/)
    expect(instrumento('fagot').nota.es).toMatch(/contrafagot/)
    for (const l of ['es', 'en', 'ca']) expect(REGLA_PLANO[l]).toMatch(/Normalmente|Usually|Normalment/)
  })
})
