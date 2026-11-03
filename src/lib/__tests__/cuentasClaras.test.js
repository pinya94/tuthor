import { describe, it, expect } from 'vitest'
import { genRonda, NIVELES, GASTOS, CAJAS, compuesto, simple, deuda, leeNumero, cerca, vale, finalPlan, ordenBueno, esCorrecta, enunciado, explicacion, schemaQuestion, textoPlan, respuesta } from '../cuentasClaras'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('Cuentas Claras', () => {
  it('cuentas', () => {
    expect(simple(1000, 5, 3)).toBe(1150)
    expect(compuesto(1000, 5, 3)).toBe(1157.63)
    expect(compuesto(1000, 10, 2)).toBe(1210)
    // A más de un año, el compuesto siempre gana al simple
    for (const n of [2, 5, 10]) expect(compuesto(1000, 4, n)).toBeGreaterThan(simple(1000, 4, n))
    // Tarjeta: 100 € al 1 % mensual pagando 60: 101 − 60 = 41; 41,41 − 60 < 0 → 2 pagos
    expect(deuda(100, 1, 60).pagos).toBe(2)
    expect(deuda(1000, 2, 20)).toBeNull() // la cuota no cubre el interés
    // Lectura de números en los tres formatos
    expect(leeNumero('1.157')).toBe(1157)
    expect(leeNumero('1157,63')).toBe(1157.63)
    expect(leeNumero('1,157.6')).toBe(1157.6)
    expect(leeNumero('1 157 €')).toBe(1157)
    expect(leeNumero('abc')).toBeNull()
    expect(leeNumero('')).toBeNull()
    expect(cerca('1158', 1157.63)).toBe(true)
    expect(cerca('1157', 1157.63)).toBe(true)
    expect(cerca('1150', 1157.63)).toBe(false)
    for (const g of GASTOS) expect(CAJAS[g.caja]).toBeTruthy()
  })

  for (const nivel of Object.keys(NIVELES)) {
    it(nivel + ': 500 rondas', { timeout: 20000 }, () => {
      const rand = semilla(nivel.length * 173)
      const cuenta = {}
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        cuenta[r.tipo] = (cuenta[r.tipo] ?? 0) + 1
        expect(esCorrecta(r, r.bueno)).toBe(true)
        if (r.tipo === 'presupuesto') {
          expect(new Set(r.gastos).size).toBe(r.gastos.length)
          expect(new Set(r.gastos.map(g => GASTOS[g].caja)).size).toBe(3)
        }
        if (r.tipo === 'regla') {
          for (const p of Object.values(r.partes)) expect(Number.isInteger(p)).toBe(true)
          expect(r.partes.necesidad + r.partes.deseo + r.partes.ahorro).toBe(r.sueldo)
          expect(vale(r, String(r.partes.ahorro), 'ahorro')).toBe(true)
        }
        if (r.tipo === 'interes' || r.tipo === 'inflacion') {
          expect(r.fin).toBeGreaterThan(r.tipo === 'interes' ? r.c : r.precio)
          expect(vale(r, String(Math.round(r.fin)))).toBe(true)
          expect(vale(r, String(Math.round(r.fin) + 5))).toBe(false)
          if (r.tipo === 'interes' && nivel !== 'facil') expect(Math.abs(compuesto(r.c, r.pct, r.anios) - simple(r.c, r.pct, r.anios))).toBeGreaterThanOrEqual(3)
        }
        if (r.tipo === 'ordena') {
          const fins = ordenBueno(r).map(i => finalPlan(r.planes[i], r.anios))
          for (let k = 1; k < fins.length; k++) expect(fins[k - 1] - fins[k]).toBeGreaterThanOrEqual(10)
        }
        if (r.tipo === 'deuda') {
          expect(r.pagos).toBeGreaterThan(1)
          expect(r.pagos).toBeLessThanOrEqual(48)
          expect(vale(r, String(r.pagos))).toBe(true)
          expect(vale(r, String(r.pagos + 1))).toBe(false)
          expect(respuesta(r)).toBe(r.pagos)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l)).not.toMatch(/undefined|NaN/)
          expect(explicacion(r, l)).not.toMatch(/undefined|NaN|null/)
          if (r.planes) for (const p of r.planes) expect(textoPlan(p, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBeGreaterThanOrEqual(2)
          expect(new Set(q.wrongAnswers).size).toBe(q.wrongAnswers.length)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      const tipos = NIVELES[nivel].tipos
      for (const t of new Set(tipos)) expect(cuenta[t] / 500, t).toBeGreaterThan(0.6 * tipos.filter(x => x === t).length / tipos.length)
    })
  }
})
