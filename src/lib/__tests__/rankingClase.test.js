import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validaApodo, claveApodo, generaCodigo, codigoValido, normalizaCodigo } from '../apodo'
import { porJuego, posiciones } from '../rankingClase'

// ── Firestore falsa en memoria, lo justo para api/ranking-clase.js ──────────
const datos = new Map()
const ts = v => (v instanceof Date ? { toMillis: () => v.getTime() } : v)
const snap = (path, d) => ({ id: path.split('/').pop(), exists: d !== undefined, data: () => d, ref: docRef(path) })
function docRef(path) {
  return {
    path, id: path.split('/').pop(),
    collection: n => colRef(`${path}/${n}`),
    get: async () => snap(path, datos.get(path)),
  }
}
function colRef(path, filtros = [], lim = Infinity) {
  const q = {
    path, doc: id => docRef(`${path}/${id}`),
    where: (f, op, v) => colRef(path, [...filtros, [f, v]], lim),
    limit: n => colRef(path, filtros, n),
    get: async () => {
      const docs = [...datos.entries()]
        .filter(([p]) => p.startsWith(`${path}/`) && !p.slice(path.length + 1).includes('/'))
        .filter(([, d]) => filtros.every(([f, v]) => d[f] === v))
        .slice(0, lim).map(([p, d]) => snap(p, d))
      return { docs, empty: !docs.length }
    },
  }
  return q
}
const guarda = (path, d) => datos.set(path, Object.fromEntries(Object.entries(d).map(([k, v]) => [k, ts(v)])))
const db = {
  doc: docRef,
  runTransaction: async fn => fn({
    get: r => r.get(),
    set: (r, d) => guarda(r.path, d),
    update: (r, d) => guarda(r.path, { ...datos.get(r.path), ...d }),
  }),
  batch: () => {
    const ops = []
    return { update: (r, d) => ops.push(() => guarda(r.path, { ...datos.get(r.path), ...d })), delete: r => ops.push(() => datos.delete(r.path)), commit: async () => ops.forEach(o => o()) }
  },
}
vi.mock('../../../api/_admin.js', () => ({
  getDb: async () => db,
  fail: (res, err) => { throw err },
}))
const { default: handler } = await import('../../../api/ranking-clase.js')

async function llama(body) {
  let status = 200, json
  const res = { status: s => { status = s; return res }, json: j => { json = j; return res } }
  await handler({ method: 'POST', body }, res)
  return { status, ...json }
}
const D1 = 'aaaaaaaaaaaaaaaa1111', D2 = 'bbbbbbbbbbbbbbbb2222'

describe('apodos y códigos', () => {
  it('limpia y valida apodos', () => {
    expect(validaApodo('  Luna   Roja ')).toEqual({ ok: true, apodo: 'Luna Roja' })
    expect(validaApodo('a').error).toBe('corto')
    expect(validaApodo('x'.repeat(17)).error).toBe('largo')
    expect(validaApodo('hola<script>').error).toBe('caracteres')
    expect(validaApodo('P3ne').error).toBe('vetado')
    expect(validaApodo('Gilip0llas').error).toBe('vetado')
    // Nombres normales que contienen una palabra corta vetada
    for (const ok of ['Penélope', 'Conor', 'Sexto B', 'Calculadora', 'Hancock', 'Ñandú', 'Àlex', 'Pol_22']) expect(validaApodo(ok).ok, ok).toBe(true)
    expect(claveApodo('ÁLEX')).toBe(claveApodo('alex'))
  })
  it('códigos de 6 sin letras confundibles', () => {
    for (let i = 0; i < 200; i++) {
      const c = generaCodigo()
      expect(codigoValido(c)).toBe(true)
      expect(c).not.toMatch(/[01ILO]/)
    }
    expect(normalizaCodigo(' ab-c 23x ')).toBe('ABC23X')
  })
  it('posiciones con empates y agrupado por juego', () => {
    expect(posiciones([{ puntos: 100 }, { puntos: 80 }, { puntos: 80 }, { puntos: 50 }])).toEqual([1, 2, 2, 4])
    const g = porJuego([{ juego: 'b', puntos: 1 }, { juego: 'a', puntos: 5 }, { juego: 'a', puntos: 9 }])
    expect(g[0].juego).toBe('a')
    expect(g[0].filas.map(f => f.puntos)).toEqual([9, 5])
  })
})

describe('api/ranking-clase', () => {
  beforeEach(() => {
    datos.clear()
    datos.set('rankingsClase/ABC234', { teacherId: 'profe', nombre: '3ºB', cerrado: false, nAlumnos: 0 })
  })

  it('unirse, subir récords y no bajar nunca', async () => {
    expect((await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: 50 })).error).toBe('no_unido')
    const u = await llama({ accion: 'unirse', codigo: 'abc-234', dispositivo: D1, apodo: ' Luna ' })
    expect(u).toMatchObject({ status: 200, apodo: 'Luna', nombre: '3ºB' })
    expect(u.pid).toBeTruthy()
    expect(datos.get('rankingsClase/ABC234').nAlumnos).toBe(1)

    expect(await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: 50 })).toMatchObject({ record: true, mejor: 50 })
    expect(await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: 30 })).toMatchObject({ record: false, mejor: 50 })
    // Un récord justo después: se frena
    expect((await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: 90 })).error).toBe('espera')

    // La entrada pública no lleva el id secreto del dispositivo
    const entrada = [...datos.entries()].find(([p]) => p.includes('/entradas/'))
    expect(entrada[0]).not.toContain(D1)
    expect(JSON.stringify(entrada[1])).not.toContain(D1)
    expect(entrada[1]).toMatchObject({ apodo: 'Luna', juego: 'rebajas', puntos: 50, pid: u.pid })
  })

  it('apodos únicos por clase (sin importar tildes ni mayúsculas) y cambio de apodo', async () => {
    await llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: D1, apodo: 'Álex' })
    expect((await llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: D2, apodo: 'alex' })).error).toBe('apodo_ocupado')
    expect((await llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: D2, apodo: 'Mierda' })).error).toBe('apodo_vetado')
    // El mismo dispositivo puede volver a entrar o cambiar de apodo, y sus récords lo siguen
    await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'engranajes', puntos: 70 })
    const otra = await llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: D1, apodo: 'Tigre' })
    expect(otra.status).toBe(200)
    expect(datos.get('rankingsClase/ABC234').nAlumnos).toBe(1)
    const e = [...datos.entries()].find(([p]) => p.includes('/entradas/'))[1]
    expect(e.apodo).toBe('Tigre')
  })

  it('código inexistente, cerrado o datos malos', async () => {
    expect((await llama({ accion: 'unirse', codigo: 'ZZZ999', dispositivo: D1, apodo: 'Luna' })).error).toBe('no_existe')
    expect((await llama({ accion: 'unirse', codigo: 'AB', dispositivo: D1, apodo: 'Luna' })).error).toBe('codigo')
    expect((await llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: 'corto', apodo: 'Luna' })).error).toBe('dispositivo')
    await llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: D1, apodo: 'Luna' })
    expect((await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'Rebajas!', puntos: 5 })).error).toBe('juego')
    expect((await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: -5 })).error).toBe('puntos')
    expect((await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: 2.5 })).error).toBe('puntos')
    datos.get('rankingsClase/ABC234').cerrado = true
    expect((await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: 5 })).error).toBe('cerrado')
    expect((await llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: D2, apodo: 'Sol' })).error).toBe('cerrado')
  })
})
