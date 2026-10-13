import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { genRonda, NIVELES, OBRAS, ESTILOS, FUENTES, MUERE, enunciado, explicacion, textoOpcion, schemaQuestion } from '../laGaleria'

function semilla(s) {
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 }
}

describe('La Galería', () => {
  it('obras y estilos coherentes', () => {
    for (const o of OBRAS) {
      expect(ESTILOS[o.estilo], o.titulo.es).toBeTruthy()
      for (const l of ['es', 'en', 'ca']) expect(o.titulo[l]).toBeTruthy()
    }
    expect(new Set(OBRAS.map(o => o.titulo.es)).size).toBe(OBRAS.length)
    // Años distintos: «la más antigua» nunca empata.
    expect(new Set(OBRAS.map(o => o.anyo)).size).toBe(OBRAS.length)
    for (const [k, e] of Object.entries(ESTILOS)) {
      expect(OBRAS.filter(o => o.estilo === k).length, k).toBeGreaterThanOrEqual(2)
      for (const l of ['es', 'en', 'ca']) { expect(e.nombre[l]).toBeTruthy(); expect(e.rasgo[l]).toBeTruthy() }
    }
  })

  it('cuadros reales: solo dominio público, con su imagen y su procedencia', () => {
    const proc = fs.readFileSync('public/galeria/PROCEDENCIA.md', 'utf8')
    for (const o of OBRAS.filter(x => x.img)) {
      expect(MUERE[o.pintor], o.pintor).toBeLessThan(1946)
      expect(fs.existsSync(`public/galeria/${o.img}.webp`), o.img).toBe(true)
      expect(proc, o.img).toContain(`${o.img}.webp`)
    }
    // Cada estilo con cuadro real tiene al menos dos, para no reconocer «la foto».
    for (const e of Object.keys(ESTILOS)) {
      const n = OBRAS.filter(o => o.estilo === e && o.img).length
      if (n) expect(n, e).toBeGreaterThanOrEqual(2)
    }
    for (const nom of ['Salvador Dalí', 'René Magritte', 'Joan Miró', 'Andy Warhol', 'Roy Lichtenstein', 'Pablo Picasso', 'Georges Braque'])
      expect(OBRAS.filter(o => o.pintor === nom && o.img), nom).toHaveLength(0)
  })

  for (const nivel of Object.keys(NIVELES)) for (const fuente of FUENTES) {
    it(`${nivel} · ${fuente}: 400 rondas`, { timeout: 60000 }, () => {
      const rand = semilla(nivel.length * 53 + fuente.length)
      const tipos = new Set()
      for (let i = 0; i < 400; i++) {
        const r = genRonda(nivel, { rand, fuente })
        tipos.add(r.tipo)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        expect(r.opciones).toContain(r.bueno)
        if (r.tipo === 'cuadro' && fuente === 'dibujo') { expect(ESTILOS[r.bueno].dibujo).toBe(true); for (const o of r.opciones) expect(ESTILOS[o].dibujo).toBe(true) }
        if (r.tipo === 'cuadro' && fuente === 'real') { expect(OBRAS[r.obra].img).toBeTruthy(); expect(OBRAS[r.obra].estilo).toBe(r.bueno) }
        if (r.tipo === 'pintor') expect(r.bueno).toBe(OBRAS[r.obra].pintor)
        if (r.tipo === 'estilo') expect(r.bueno).toBe(OBRAS[r.obra].estilo)
        if (r.tipo === 'orden') expect(OBRAS[r.bueno].anyo).toBe(Math.min(...r.opciones.map(k => OBRAS[k].anyo)))
        for (const l of ['es', 'en', 'ca']) {
          expect(new Set(r.opciones.map(o => textoOpcion(o, r, l))).size).toBe(4)
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          expect(enunciado(r, l)).toBeTruthy()
          expect(schemaQuestion(r, l).wrongAnswers).toHaveLength(3)
        }
      }
      for (const t of NIVELES[nivel].tipos) expect(tipos.has(t), t).toBe(true)
    })
  }
})

// Cada estilo marcado `dibujo` tiene su cuadro en components/laGaleria/Cuadro.jsx.
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import Cuadro from '../../components/laGaleria/Cuadro'
it('todos los estilos con dibujo pintan algo, y los demás no', () => {
  for (const [k, e] of Object.entries(ESTILOS)) {
    const html = renderToStaticMarkup(createElement(Cuadro, { estilo: k, semilla: 3 }))
    expect(html.length > 0, k).toBe(e.dibujo)
  }
})
