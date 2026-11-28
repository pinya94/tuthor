// Ilustraciones de la célula de «Bajo el Microscopio» y sus zonas táctiles
// (src/data/celulaZonas.js, generadas por scripts/celula-arte.mjs).
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CELULA_ARTE } from '../../data/celulaZonas'
import { ORGANULOS, organulosDe } from '../../data/organulos'

const CARPETA = fileURLToPath(new URL('../../../public/microscopio/celula', import.meta.url))
const manifiesto = JSON.parse(fs.readFileSync(path.join(CARPETA, 'creditos.json'), 'utf8'))

// "M x yL x y…Z…" → lazos de puntos
const lazos = d => d.split('Z').filter(Boolean).map(l => l.replace(/^M/, '').split('L').map(p => p.trim().split(/\s+/).map(Number)))
// Regla evenodd: cuántos lazos cruza un rayo horizontal
function dentro(d, [x, y]) {
  let n = 0
  for (const l of lazos(d)) for (let i = 0, j = l.length - 1; i < l.length; j = i++) {
    const [xi, yi] = l[i], [xj, yj] = l[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) n++
  }
  return n % 2 === 1
}

describe.each(['animal', 'vegetal'])('Célula %s', tipo => {
  const arte = CELULA_ARTE[tipo]
  const ids = arte.zonas.map(z => z.id)

  it('cada orgánulo del banco de esta célula tiene su zona, y ninguno de la otra', () => {
    for (const o of organulosDe(tipo)) expect(ids, o.id).toContain(o.id)
    const delBanco = ids.filter(id => !id.startsWith('otro-'))
    expect(delBanco.sort()).toEqual(organulosDe(tipo).map(o => o.id).sort())
    for (const id of ids) expect(ORGANULOS.some(o => o.id === id) || /^otro-\d+$/.test(id), id).toBe(true)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('zonas dentro del lienzo', () => {
    const [vx, vy, vw, vh] = arte.vista
    for (const z of arte.zonas) {
      for (const l of lazos(z.d)) for (const [x, y] of l) {
        expect(x).toBeGreaterThanOrEqual(vx - 0.01); expect(x).toBeLessThanOrEqual(vx + vw + 0.01)
        expect(y).toBeGreaterThanOrEqual(vy - 0.01); expect(y).toBeLessThanOrEqual(vy + vh + 0.01)
      }
    }
  })

  it('el centro de cada zona cae en ella y en ninguna otra (no hay zonas escondidas)', () => {
    for (const z of arte.zonas) {
      expect(dentro(z.d, z.centro), `${z.id} no contiene su centro`).toBe(true)
      for (const o of arte.zonas) if (o !== z) expect(dentro(o.d, z.centro), `${o.id} tapa el centro de ${z.id}`).toBe(false)
    }
  })

  it('hasta lo más pequeño deja un blanco tocable (radio libre ≥ 3 unidades del dibujo)', () => {
    for (const z of arte.zonas) if (!z.id.startsWith('otro-')) expect(z.hondo, z.id).toBeGreaterThanOrEqual(3)
  })

  it('la imagen existe y es la del manifiesto', () => {
    const f = path.basename(arte.img)
    expect(fs.existsSync(path.join(CARPETA, f))).toBe(true)
    const m = manifiesto.ficheros.find(x => x.fichero === f)
    expect(m, f).toBeTruthy()
    expect(m.ids.sort()).toEqual(organulosDe(tipo).map(o => o.id).sort())
  })
})

describe('Créditos de las ilustraciones', () => {
  it('el manifiesto cubre cada fichero publicado, con fuente, autor y licencia libre', () => {
    const publicados = fs.readdirSync(CARPETA).filter(f => !['CREDITOS.md', 'creditos.json'].includes(f))
    expect(publicados.length).toBeGreaterThan(0)
    for (const f of publicados) {
      const m = manifiesto.ficheros.find(x => x.fichero === f)
      expect(m, `${f} sin entrada en creditos.json`).toBeTruthy()
      expect(m.fuente).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:|^https:\/\/smart\.servier\.com\//)
      expect(m.autor).toBeTruthy()
      expect(m.licencia).toMatch(/^(Dominio público|CC BY 4\.0|CC BY-SA [\d.]+)$/)
      expect(m.modificaciones.length).toBeGreaterThan(0)
      expect(m.fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(m.validacion).toBeTruthy()
    }
    for (const m of manifiesto.ficheros) expect(publicados, m.fichero).toContain(m.fichero)
    const md = fs.readFileSync(path.join(CARPETA, 'CREDITOS.md'), 'utf8')
    for (const f of publicados) expect(md).toContain(f)
  })
})
