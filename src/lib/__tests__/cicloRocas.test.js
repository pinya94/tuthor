import { describe, it, expect } from 'vitest'
import {
  PROCESOS, NODOS, FLECHAS, ROCAS, RUTAS, ORIGENES, SUBTIPOS, NIVELES,
  genRonda, esCorrecta, respuestaBuena, cajaDe, METAMORFICAS, explicacion, schemaQuestion, textoOpcion, enunciado,
  crearBolsa, sacarTipo, MAX_SEGUIDAS, MECANICA_DE_TIPO, accionesDe, correccion,
} from '../cicloRocas'

function semilla(s) { return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 }
const L = ['es', 'en', 'ca']

// A qué nodo del ciclo lleva cada proceso, y desde dónde se puede aplicar.
const LLEGA = { enfriamiento: 'ignea', erosion: 'sedimentos', litificacion: 'sedimentaria', metamorfismo: 'metamorfica', fusion: 'magma' }
const DESDE = {
  enfriamiento: ['magma'],
  erosion: ['ignea', 'sedimentaria', 'metamorfica'],
  litificacion: ['sedimentos'],
  metamorfismo: ['ignea', 'sedimentaria', 'metamorfica'],
  fusion: ['ignea', 'sedimentaria', 'metamorfica'],
}
// Recorre una secuencia de procesos desde un nodo: el nodo final o null si
// algún paso es imposible.
function recorrer(nodo, procesos) {
  for (const p of procesos) {
    if (!DESDE[p].includes(nodo)) return null
    nodo = LLEGA[p]
  }
  return nodo
}

describe('Ciclo de las rocas · datos', () => {
  it('cada flecha une nodos que existen con el proceso que lleva a su destino', () => {
    for (const [a, b, p] of FLECHAS) {
      expect(NODOS[a] && NODOS[b] && PROCESOS[p]).toBeTruthy()
      expect(LLEGA[p], `${a}→${b}`).toBe(b)
      expect(DESDE[p]).toContain(a)
    }
  })
  it('las metamórficas tienen su roca de origen entre las opciones; las demás, no', () => {
    for (const [id, r] of Object.entries(ROCAS)) {
      if (r.tipo === 'metamorfica') expect(ORIGENES, id).toContain(r.origen)
      else expect(r.origen, id).toBeNull()
      if (r.subtipo) expect(SUBTIPOS[r.tipo], id).toContain(r.subtipo)
      for (const l of L) { expect(r.nombre[l]).toBeTruthy(); expect(r.desc[l]).toBeTruthy() }
    }
    expect(ROCAS.caliza.subtipo).toBeNull() // química u orgánica según el libro
  })
  it('rutas: la buena lleva de verdad de una roca a la otra y las malas no', () => {
    for (const r of RUTAS) {
      const desde = ROCAS[r.desde].tipo, hasta = ROCAS[r.hasta].tipo
      expect(recorrer(desde, r.buena), `${r.desde}→${r.hasta}`).toBe(hasta)
      for (const m of r.malas) expect(recorrer(desde, m), `${r.desde}→${r.hasta}: ${m}`).not.toBe(hasta)
    }
  })
})

describe('Ciclo de las rocas · rondas', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: rondas coherentes`, () => {
      const rand = semilla(nivel.length * 271)
      const tipos = new Set()
      for (let i = 0; i < 500; i++) {
        const r = genRonda(nivel, { rand })
        tipos.add(r.tipo)
        expect(r.opciones).toContain(r.bueno)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        expect(esCorrecta(r, respuestaBuena(r))).toBe(true)
        if (r.mecanica === 'etiqueta') {
          expect(new Set(r.flechas).size).toBe(3)
          expect(new Set(r.flechas.map(i => FLECHAS[i][2])).size).toBeGreaterThan(1)
        }
        if (r.mecanica === 'clasifica') {
          expect(r.items).toHaveLength(3)
          for (const id of r.items) expect(r.cajas).toContain(cajaDe(r, id))
          expect(new Set(r.items.map(id => cajaDe(r, id))).size).toBeGreaterThan(1)
        }
        if (r.mecanica === 'empareja') {
          expect([...r.items].sort()).toEqual([...METAMORFICAS].sort())
          for (const id of r.items) expect(r.origenes).toContain(ROCAS[id].origen)
        }
        if (r.mecanica === 'traza') for (const o of r.opciones) if (o !== r.bueno) expect(esCorrecta(r, o)).toBe(false)
        for (const l of L) {
          expect(enunciado(r, l)).not.toMatch(/undefined/)
          expect(explicacion(r, l)).not.toMatch(/undefined/)
          for (const o of r.opciones) expect(textoOpcion(o, r, l)).not.toMatch(/undefined/)
          const q = schemaQuestion(r, l)
          expect(q.wrongAnswers).not.toContain(q.correctAnswer)
        }
      }
      expect([...tipos].sort()).toEqual([...new Set(NIVELES[nivel].tipos)].sort())
    })
  }
})

describe('Ciclo de las rocas · bolsa de mecánicas y evitar', () => {
  for (const nivel of Object.keys(NIVELES)) {
    it(`${nivel}: mecánicas repartidas, nunca 3 seguidas, sin repetir la ronda anterior`, () => {
      const mecs = [...new Set(NIVELES[nivel].tipos.map(t => MECANICA_DE_TIPO[t]))]
      const cuenta = Object.fromEntries(mecs.map(m => [m, 0]))
      let total = 0
      for (let sem = 1; sem <= 200; sem++) {
        const rand = semilla(sem * 7919)
        const bolsa = crearBolsa(nivel, { rand })
        let prev = null, racha = 0, ultima = null
        for (let i = 0; i < 12; i++) {
          const r = genRonda(nivel, { rand, bolsa, evitar: prev?.clave })
          expect(r.clave).toBeTruthy()
          if (prev) expect(r.clave, `semilla ${sem} ronda ${i}`).not.toBe(prev.clave)
          racha = r.mecanica === ultima ? racha + 1 : 1
          ultima = r.mecanica
          expect(racha, `semilla ${sem}: ${r.mecanica} ${racha} seguidas`).toBeLessThanOrEqual(MAX_SEGUIDAS)
          cuenta[r.mecanica]++; total++
          expect(accionesDe(r)).toBeGreaterThan(0)
          prev = r
        }
      }
      // Reparto: cada mecánica del nivel, cerca de su peso en la bolsa (±8 puntos).
      for (const m of mecs) {
        const peso = NIVELES[nivel].tipos.filter(t => MECANICA_DE_TIPO[t] === m).length / NIVELES[nivel].tipos.length
        expect(Math.abs(cuenta[m] / total - peso), `${nivel} ${m}: ${cuenta[m]}/${total}`).toBeLessThan(0.08)
      }
    })
  }
  it('la bolsa es de cada partida: una nueva empieza de cero', () => {
    const a = crearBolsa('dificil', { rand: semilla(3) })
    for (let i = 0; i < 5; i++) sacarTipo(a)
    expect(a.historial).toHaveLength(5)
    const b = crearBolsa('dificil', { rand: semilla(3) })
    expect(b.historial).toHaveLength(0)
    expect(b.saco).toHaveLength(0)
  })
  it('en las 3 primeras rondas de difícil salen las 3 mecánicas', () => {
    for (let sem = 1; sem <= 50; sem++) {
      const rand = semilla(sem * 131)
      const bolsa = crearBolsa('dificil', { rand })
      const vistas = new Set([0, 1, 2].map(() => genRonda('dificil', { rand, bolsa }).mecanica))
      expect(vistas.size, `semilla ${sem}`).toBe(3)
    }
  })
})

describe('Ciclo de las rocas · corrección y ciencia', () => {
  it('una línea por pieza con lo puesto y lo bueno', () => {
    const rand = semilla(11)
    for (let i = 0; i < 300; i++) {
      const r = genRonda(['facil', 'medio', 'dificil'][i % 3], { rand })
      const bien = r.mecanica === 'etiqueta' ? Object.fromEntries(r.flechas.map((f, k) => [k, FLECHAS[f][2]]))
        : r.mecanica === 'clasifica' ? Object.fromEntries(r.items.map(id => [id, cajaDe(r, id)]))
          : r.mecanica === 'empareja' ? Object.fromEntries(r.items.map(id => [id, ROCAS[id].origen]))
            : r.bueno
      for (const l of L) {
        const ok = correccion(r, bien, l)
        expect(ok.length).toBeGreaterThan(0)
        expect(ok.every(x => x.ok)).toBe(true)
        for (const x of ok) expect(x.texto).not.toMatch(/undefined|null/)
      }
      if (r.mecanica === 'etiqueta') {
        const mal = { ...bien, 0: Object.keys(PROCESOS).find(p => p !== bien[0]) }
        const c = correccion(r, mal, 'es')
        expect(c[0].ok).toBe(false)
        expect(c[0].texto).toContain('pusiste')
        expect(c.slice(1).every(x => x.ok)).toBe(true)
      }
      if (r.mecanica === 'traza') {
        const malo = r.opciones.find(o => o !== r.bueno)
        expect(correccion(r, malo, 'es').map(x => x.ok)).toEqual([false, true])
      }
    }
  })
  it('sin absolutos falsos en las descripciones', () => {
    const rutas = L.map(l => RUTAS.map((ru, i) => explicacion({ tipo: 'ruta', ruta: i, mecanica: 'traza', bueno: ru.buena.join('>') }, l)).join(' ')).join(' ')
    const todo = JSON.stringify({ ROCAS, PROCESOS }) + rutas
    expect(todo).not.toMatch(/¡flota en el agua!|se enfrió de golpe|granito aplastado|burbujea con vinagre/)
    expect(ROCAS.gneis.desc.es).toMatch(/también de otras rocas/)
    expect(ROCAS.cuarcita.desc.es).toMatch(/recristalizada/)
    expect(PROCESOS.erosion.es).toMatch(/sedimentación/)
    // Fundir mármol no da granito ni fundir gneis da basalto
    expect(RUTAS.some(r => r.desde === 'marmol' && r.hasta === 'granito')).toBe(false)
    expect(RUTAS.some(r => r.desde === 'gneis' && r.hasta === 'basalto')).toBe(false)
  })
})
