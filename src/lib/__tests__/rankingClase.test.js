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
    count: () => ({ get: async () => { const { docs } = await q.get(); return { data: () => ({ count: docs.length }) } } }),
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
  // Un token de prueba es el propio uid («tok-uid» → uid); otro cualquiera falla
  getAdminAuth: async () => ({ verifyIdToken: async t => { if (!t.startsWith('tok-')) throw new Error('token'); return { uid: t.slice(4) } } }),
  fail: (res, err) => { throw err },
}))
const { default: handler } = await import('../../../api/ranking-clase.js')

async function llama(body, token) {
  let status = 200, json
  const res = { status: s => { status = s; return res }, json: j => { json = j; return res } }
  await handler({ method: 'POST', body, headers: token ? { authorization: `Bearer ${token}` } : {} }, res)
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
    datos.set('rankingsClase/ABC234', { teacherId: 'profe', nombre: '3ºB', cerrado: false })
  })

  it('unirse, subir récords y no bajar nunca', async () => {
    expect((await llama({ accion: 'puntos', codigo: 'ABC234', dispositivo: D1, juego: 'rebajas', puntos: 50 })).error).toBe('no_unido')
    const u = await llama({ accion: 'unirse', codigo: 'abc-234', dispositivo: D1, apodo: ' Luna ' })
    expect(u).toMatchObject({ status: 200, apodo: 'Luna', nombre: '3ºB' })
    expect(u.pid).toBeTruthy()

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
    const e = [...datos.entries()].find(([p]) => p.includes('/entradas/'))[1]
    expect(e.apodo).toBe('Tigre')
  })

  it('toda la clase a la vez: 30 alumnos entran sin escribir en el doc del ranking', async () => {
    const antes = JSON.stringify(datos.get('rankingsClase/ABC234'))
    const disp = i => `alumno${String(i).padStart(12, '0')}xx`
    const rs = await Promise.all(Array.from({ length: 30 }, (_, i) => llama({ accion: 'unirse', codigo: 'ABC234', dispositivo: disp(i), apodo: `Jugador ${i}` })))
    expect(rs.every(r => r.status === 200)).toBe(true)
    expect(new Set(rs.map(r => r.pid)).size).toBe(30)
    // El documento del ranking no se toca al unirse: nada que haga chocar a los que entran a la vez
    expect(JSON.stringify(datos.get('rankingsClase/ABC234'))).toBe(antes)
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

describe('api/ranking-clase · retos', () => {
  const ahora = () => ({ toMillis: () => Date.now() })
  const hace = ms => ({ toMillis: () => Date.now() - ms })
  beforeEach(() => {
    datos.clear()
    datos.set('rankingsClase/DEB234', { teacherId: 'profe', nombre: 'Deberes', cerrado: false, modo: 'deberes', examen: 'rebajas-test', nivel: 1, nPreguntas: 10 })
    datos.set('rankingsClase/DRT234', { teacherId: 'profe', nombre: 'Directo', cerrado: false, modo: 'directo', examen: 'rebajas-test', segundos: 20, directo: { estado: 'sala', i: -1 } })
  })

  it('deberes: solo cuenta su examen, la mejor nota y todos los intentos', async () => {
    const u = await llama({ accion: 'unirse', codigo: 'DEB234', dispositivo: D1, apodo: 'Lucía Pérez' })
    expect(u).toMatchObject({ modo: 'deberes', examen: 'rebajas-test' })
    expect((await llama({ accion: 'puntos', codigo: 'DEB234', dispositivo: D1, juego: 'engranajes', puntos: 90 })).error).toBe('otro_juego')
    // Un 0 también se entrega: el profe tiene que verlo
    expect(await llama({ accion: 'puntos', codigo: 'DEB234', dispositivo: D1, juego: 'rebajas-test', puntos: 0 })).toMatchObject({ record: true, intentos: 1 })
    datos.get(`rankingsClase/DEB234/entradas/${u.pid}__rebajas-test`).actualizado = hace(10000)
    expect(await llama({ accion: 'puntos', codigo: 'DEB234', dispositivo: D1, juego: 'rebajas-test', puntos: 70 })).toMatchObject({ record: true, mejor: 70, intentos: 2 })
    expect(await llama({ accion: 'puntos', codigo: 'DEB234', dispositivo: D1, juego: 'rebajas-test', puntos: 40 })).toMatchObject({ record: false, mejor: 70, intentos: 3 })
  })

  it('directo: una respuesta por pregunta, a tiempo, con más puntos cuanto antes', async () => {
    const a = await llama({ accion: 'unirse', codigo: 'DRT234', dispositivo: D1, apodo: 'Rayo' })
    const b = await llama({ accion: 'unirse', codigo: 'DRT234', dispositivo: D2, apodo: 'Trueno' })
    // Antes de empezar no se puede responder
    expect((await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D1, i: 0, correcta: true })).error).toBe('cerrada')
    datos.get('rankingsClase/DRT234').directo = { estado: 'pregunta', i: 0, inicio: hace(2000) }
    const r1 = await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D1, i: 0, correcta: true })
    expect(r1.puntos).toBeGreaterThan(900)
    expect((await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D1, i: 0, correcta: true })).error).toBe('ya')
    expect((await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D1, i: 1, correcta: true })).error).toBe('cerrada')
    expect(await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D2, i: 0, correcta: false })).toMatchObject({ puntos: 0 })
    // Segunda pregunta: Trueno acierta tarde pero dentro del margen; Rayo, fuera de tiempo
    datos.get('rankingsClase/DRT234').directo = { estado: 'pregunta', i: 1, inicio: hace(21000) }
    expect(await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D2, i: 1, correcta: true })).toMatchObject({ puntos: 500 })
    datos.get('rankingsClase/DRT234').directo = { estado: 'pregunta', i: 1, inicio: hace(25000) }
    expect((await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D1, i: 1, correcta: true })).error).toBe('tarde')
    // El marcador: uno por alumno, con su apodo y sin el id del dispositivo
    const ma = datos.get(`rankingsClase/DRT234/marcador/${a.pid}`), mb = datos.get(`rankingsClase/DRT234/marcador/${b.pid}`)
    expect(ma).toMatchObject({ apodo: 'Rayo', aciertos: 1, puntos: r1.puntos })
    expect(mb).toMatchObject({ apodo: 'Trueno', aciertos: 1, puntos: 500 })
    expect(JSON.stringify([...datos.entries()].filter(([p]) => /marcador|respuestas/.test(p)))).not.toContain(D1)
    // Con la solución en pantalla ya no se acepta nada
    datos.get('rankingsClase/DRT234').directo = { estado: 'solucion', i: 1, inicio: ahora() }
    expect((await llama({ accion: 'responde', codigo: 'DRT234', dispositivo: D1, i: 1, correcta: true })).error).toBe('cerrada')
  })
})

describe('api/ranking-clase · con amigos y con sesión', () => {
  beforeEach(() => {
    datos.clear()
    datos.set('classes/C1', { teacherId: 'profe', studentIds: ['alu1', 'alu2'] })
    datos.set('rankingsClase/CMS234', { teacherId: 'profe', nombre: '3ºB', cerrado: false, modo: 'directo', examen: 'rebajas-test', classId: 'C1', directo: { estado: 'sala', i: -1 } })
  })

  it('quien entra con su cuenta de la clase queda apuntado; quien no, no', async () => {
    await llama({ accion: 'unirse', codigo: 'CMS234', dispositivo: D1, apodo: 'Lucía' }, 'tok-alu1')
    await llama({ accion: 'unirse', codigo: 'CMS234', dispositivo: D2, apodo: 'Intruso' }, 'tok-otro')
    const alumnos = [...datos.entries()].filter(([k]) => k.includes('/alumnos/')).map(([, v]) => v)
    expect(alumnos.find(a => a.apodo === 'Lucía').uid).toBe('alu1')
    expect(alumnos.find(a => a.apodo === 'Intruso').uid).toBeUndefined()
    // Un token falso no impide entrar: entra como cualquiera
    expect((await llama({ accion: 'unirse', codigo: 'CMS234', dispositivo: 'cccccccccccccccc3333', apodo: 'Pol' }, 'falso')).status).toBe(200)
  })

  it('una partida con amigos caduca a las 24 horas', async () => {
    datos.set('rankingsClase/AMG234', { teacherId: 'cualquiera', nombre: 'Con amigos', cerrado: false, modo: 'directo', amigos: true, examen: 'rebajas-test', createdAt: { toMillis: () => Date.now() - 25 * 3600 * 1000 } })
    expect((await llama({ accion: 'unirse', codigo: 'AMG234', dispositivo: D1, apodo: 'Leo' })).error).toBe('caducado')
    datos.get('rankingsClase/AMG234').createdAt = { toMillis: () => Date.now() - 3600 * 1000 }
    expect((await llama({ accion: 'unirse', codigo: 'AMG234', dispositivo: D1, apodo: 'Leo' })).status).toBe(200)
  })
})
