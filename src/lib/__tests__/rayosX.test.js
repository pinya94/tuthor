import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ORGANOS } from '../../data/organos.js'
import { LAMINAS } from '../../data/rayosXZonas.js'
import { PIEZAS_ORGANOS, PIEZAS_HUESOS, PIEZAS_MUSCULOS, PIEZAS_ESPALDA, PIEZAS } from '../../components/rayosX/CuerpoSVG.jsx'
import { NIVELES, genRonda, capaDe, BASICAS } from '../rayosX.js'

// Zonas "M x y L x y … Z" → lazos de puntos
const lazos = d => d.split('M').filter(Boolean).map(s => s.replace(/Z$/, '').split('L').map(p => p.trim().split(/\s+/).map(Number)))
// Punto dentro con la regla evenodd (la que usa el SVG)
function dentro(d, x, y) {
  let c = false
  for (const pol of lazos(d)) {
    for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) {
      const [xi, yi] = pol[i], [xj, yj] = pol[j]
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
    }
  }
  return c
}

const PUB = fileURLToPath(new URL('../../../public/rayos-x', import.meta.url))

// Rayos X: cada parte del banco es una zona que se toca en la lámina que le
// toca (hueso → esqueleto, músculo → de frente o de espalda, resto → órganos).
describe('Rayos X', () => {
  it('toda parte del banco tiene su zona en la capa que le toca', () => {
    for (const p of ORGANOS) {
      const piezas = { huesos: PIEZAS_HUESOS, organos: PIEZAS_ORGANOS, musculos: PIEZAS_MUSCULOS, espalda: PIEZAS_ESPALDA }[capaDe(p)]
      expect(piezas, `${p.id} sin forma en la capa ${capaDe(p)}`).toContain(p.id)
      expect(LAMINAS[capaDe(p)].zonas[p.id], `${p.id} sin zona generada`).toBeTruthy()
    }
  })

  it('y no hay formas de partes que no existen', () => {
    const ids = ORGANOS.map(p => p.id)
    for (const id of [...PIEZAS_ORGANOS, ...PIEZAS_HUESOS, ...PIEZAS_MUSCULOS, ...PIEZAS_ESPALDA]) expect(ids).toContain(id)
    for (const [capa, lam] of Object.entries(LAMINAS)) expect(Object.keys(lam.zonas).sort()).toEqual([...PIEZAS[capa]].sort())
  })

  it('cada lámina tiene su imagen y las zonas caen dentro de ella', () => {
    for (const [capa, lam] of Object.entries(LAMINAS)) {
      expect(fs.existsSync(path.join(PUB, path.basename(lam.img))), `${capa}: falta ${lam.img}`).toBe(true)
      for (const [id, z] of Object.entries(lam.zonas)) {
        for (const pol of lazos(z.d)) for (const [x, y] of pol) {
          expect(x >= 0 && x <= lam.w && y >= 0 && y <= lam.h, `${capa}/${id}: punto ${x},${y} fuera`).toBe(true)
        }
      }
    }
  })

  it('el centro de cada zona es de esa zona y de ninguna otra (no hay zonas tapadas)', () => {
    for (const [capa, lam] of Object.entries(LAMINAS)) {
      for (const [id, z] of Object.entries(lam.zonas)) {
        expect(z.centros.length, `${capa}/${id} sin centro`).toBeGreaterThan(0)
        for (const [x, y] of z.centros) {
          expect(dentro(z.d, x, y), `${capa}/${id}: su centro no cae dentro`).toBe(true)
          for (const [otro, z2] of Object.entries(lam.zonas)) if (otro !== id) expect(dentro(z2.d, x, y), `${capa}: el centro de ${id} cae en ${otro}`).toBe(false)
        }
        // Holgura mínima: el centro está al menos a 6 px de la lámina del borde de su zona
        expect(z.holgura, `${capa}/${id}: zona demasiado estrecha`).toBeGreaterThanOrEqual(6)
      }
    }
  })

  it('lo que existe a los dos lados se puede tocar a los dos lados', () => {
    for (const p of ORGANOS.filter(o => o.bilateral)) {
      expect(LAMINAS[capaDe(p)].zonas[p.id].centros.length, `${p.id}: solo un lado`).toBeGreaterThanOrEqual(2)
    }
    for (const id of ['ojos', 'rinones']) expect(LAMINAS.organos.zonas[id].centros.length).toBe(2)
  })

  it('lateralidad de los órganos asimétricos (vista frontal: la derecha del paciente a la izquierda)', () => {
    const z = LAMINAS.organos.zonas, mitad = LAMINAS.organos.w / 2
    expect(z.higado.centros[0][0]).toBeLessThan(mitad)
    expect(z.estomago.centros[0][0]).toBeGreaterThan(mitad)
    expect(z.corazon.centros[0][0]).toBeGreaterThan(mitad - 20)
  })

  it('créditos: todo fichero publicado en public/rayos-x tiene su entrada completa', () => {
    const man = JSON.parse(fs.readFileSync(path.join(PUB, 'manifest.json'), 'utf8'))
    const creditos = fs.readFileSync(path.join(PUB, 'CREDITOS.md'), 'utf8')
    const ficheros = fs.readdirSync(PUB).filter(f => !['manifest.json', 'CREDITOS.md'].includes(f))
    expect(ficheros.length).toBeGreaterThan(0)
    for (const f of ficheros) {
      const m = man.find(e => path.basename(e.fichero) === f)
      expect(m, `${f} sin entrada en manifest.json`).toBeTruthy()
      expect(m.ids.length).toBeGreaterThan(0)
      expect(m.licencia && m.modificaciones && m.fecha && m.validacion).toBeTruthy()
      for (const s of m.fuentes) {
        expect(s.url, `${f}: fuente sin URL`).toMatch(/^https:\/\//)
        expect(s.pagina).toMatch(/^https:\/\//)
        expect(s.autor && s.licencia, `${f}: fuente sin autor o licencia`).toBeTruthy()
        expect(s.licencia).toMatch(/^(Dominio público|CC0 1\.0|CC BY 4\.0|CC BY-SA 4\.0)$/)
      }
      expect(creditos, `${f} no sale en CREDITOS.md`).toContain(f)
    }
  })

  it('las básicas existen y los niveles no están vacíos', () => {
    const ids = ORGANOS.map(p => p.id)
    for (const id of BASICAS) expect(ids).toContain(id)
    for (const n of Object.values(NIVELES)) expect(n.partes.length).toBeGreaterThanOrEqual(10)
  })

  it('no repite lo que se pide que evite', () => {
    const evitar = NIVELES.facil.partes.slice(0, 5).map(p => p.id)
    for (let i = 0; i < 50; i++) expect(evitar).not.toContain(genRonda('facil', { evitar }).parte.id)
  })
})
