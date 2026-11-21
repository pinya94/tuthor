import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { PARTES, RUTAS, NIVELES, partesDe, genRonda, esCorrecta, enunciado, explicacion, schemaQuestion, tiempoPartida, tiempoVuelta, SEG_POR_ACIERTO } from '../ojoOido'

describe('Ojo y Oído', () => {
  it('cada parte tiene nombre, artículo y función en los tres idiomas, y las funciones no se repiten', () => {
    for (const l of ['es', 'en', 'ca']) {
      const funciones = new Set()
      for (const [id, p] of Object.entries(PARTES)) {
        expect(p.nom[l], `${id}.${l}`).toBeTruthy()
        expect(p.art[l], `${id}.${l}`).toBeTruthy()
        expect(p.fun[l], `${id}.${l}`).toBeTruthy()
        funciones.add(p.fun[l])
      }
      expect(funciones.size).toBe(Object.keys(PARTES).length)
    }
  })

  it('los recorridos solo usan partes de su órgano', () => {
    for (const [organo, ruta] of Object.entries(RUTAS)) for (const p of ruta) expect(PARTES[p].organo, p).toBe(organo)
    expect(RUTAS.ojo).toEqual(['cornea', 'pupila', 'cristalino', 'retina', 'nervio-optico'])
    expect(RUTAS.oido[0]).toBe('pabellon')
    expect(RUTAS.oido.at(-1)).toBe('nervio-auditivo')
  })

  it('las rondas tienen solución y su texto, en los tres niveles', () => {
    for (const nivel of Object.keys(NIVELES)) {
      const tipos = new Set()
      for (let i = 0; i < 300; i++) {
        const r = genRonda(nivel)
        tipos.add(r.tipo)
        if (r.tipo === 'ruta') {
          expect(esCorrecta(r, r.ruta)).toBe(true)
          expect(esCorrecta(r, [...r.ruta].reverse())).toBe(false)
          expect(esCorrecta(r, r.ruta.slice(0, -1))).toBe(false)
        } else {
          expect(partesDe(r.organo)).toContain(r.objetivo)
          expect(esCorrecta(r, r.objetivo)).toBe(true)
          for (const otra of partesDe(r.organo).filter(p => p !== r.objetivo)) expect(esCorrecta(r, otra)).toBe(false)
          if (r.tipo === 'siguiente' && r.tras) expect(RUTAS[r.organo].indexOf(r.objetivo)).toBe(RUTAS[r.organo].indexOf(r.tras) + 1)
        }
        for (const l of ['es', 'en', 'ca']) {
          expect(enunciado(r, l).length, r.id).toBeGreaterThan(8)
          expect(explicacion(r, l).length, r.id).toBeGreaterThan(30)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers.length).toBe(3)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      if (nivel === 'facil') expect([...tipos]).toEqual(['nombre'])
      if (nivel === 'medio') expect([...tipos]).toEqual(['funcion'])
      if (nivel === 'dificil') expect([...tipos].sort()).toEqual(['ruta', 'siguiente'])
    }
  })

  it('la concordancia de las partes en plural es correcta', () => {
    const r = { tipo: 'funcion', organo: 'oido', objetivo: 'canales' }
    expect(enunciado(r, 'es')).toBe('Toca la parte que se encarga del equilibrio, no de oír')
    expect(explicacion(r, 'es')).toBe('Los canales semicirculares se encargan del equilibrio, no de oír.')
    expect(explicacion({ tipo: 'funcion', organo: 'oido', objetivo: 'huesecillos' }, 'es')).toMatch(/^Los huesecillos .* son /)
    expect(explicacion({ tipo: 'funcion', organo: 'ojo', objetivo: 'retina' }, 'es')).toBe('La retina tiene los conos y los bastones, que captan la luz y la convierten en señales nerviosas.')
  })

  // Revisión 21-nov-2026: la luz no viaja por el nervio óptico, ni el sonido por el auditivo
  it('distingue luz, vibración y señal nerviosa en los tres idiomas', () => {
    for (const l of ['es', 'en', 'ca']) {
      const tras = t => enunciado({ tipo: 'siguiente', organo: t === 'retina' ? 'ojo' : 'oido', tras: t }, l)
      expect(tras('retina'), l).toMatch(/señales nerviosas|nerve signals|senyals nerviosos/)
      expect(tras('coclea'), l).toMatch(/señales nerviosas|nerve signals|senyals nerviosos/)
      expect(tras('timpano'), l).toMatch(/vibración|vibration|vibració/)
      for (const organo of ['ojo', 'oido']) {
        const ruta = enunciado({ tipo: 'ruta', organo }, l)
        expect(ruta, l).toMatch(/señal nerviosa|nerve signal|senyal nerviós/)
        expect(explicacion({ tipo: 'ruta', organo }, l), l).toMatch(/(cerebro|brain|cervell)\./)
      }
      expect(enunciado({ tipo: 'ruta', organo: 'ojo' }, l)).not.toMatch(/partes por las que pasa la luz, hasta el cerebro/)
    }
  })

  it('las respuestas y los recorridos no cambian', () => {
    expect(RUTAS.oido).toEqual(['pabellon', 'conducto', 'timpano', 'huesecillos', 'coclea', 'nervio-auditivo'])
    expect(genRonda('dificil', { rand: () => 0.1 }).organo).toBeTruthy()
  })
})

describe('tiempo de partida', () => {
  it('menos tiempo que una vuelta entera, para acabar perdiendo (petición del usuario, 21-nov)', () => {
    expect(tiempoVuelta('facil')).toBe(Object.keys(PARTES).length * 5)
    expect(tiempoPartida('facil')).toBe(40)
    expect(tiempoPartida('medio')).toBe(40)
    expect(tiempoPartida('dificil')).toBe(45)
    for (const n of ['facil', 'medio', 'dificil']) expect(tiempoPartida(n)).toBeLessThan(tiempoVuelta(n) * 0.7)
    expect(SEG_POR_ACIERTO).toBe(1)
  })
})

describe('zonas de la ilustración', () => {
  it('cada parte tiene su zona, está en el orden de toque y su etiqueta cae dentro de la imagen', async () => {
    const { ZONAS, ORDEN } = await import('../../components/ojoOido/PreguntaOjoOido.jsx')
    for (const organo of ['ojo', 'oido']) {
      expect([...ORDEN[organo]].sort()).toEqual(partesDe(organo).sort())
      for (const id of ORDEN[organo]) {
        const z = ZONAS[id]
        expect(z.d, id).toMatch(/^M[\d.\- ]+/)
        const [x, y, ax, ay] = z.lab
        for (const v of [x, ax]) expect(v >= 0 && v <= 1672, id).toBe(true)
        for (const v of [y, ay]) expect(v >= 0 && v <= 941, id).toBe(true)
      }
    }
    expect(fs.existsSync('public/ojo-oido/ojo.webp') && fs.existsSync('public/ojo-oido/oido.webp')).toBe(true)
  })
})
