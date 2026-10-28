import { describe, it, expect, vi, beforeEach } from 'vitest'

// Firestore falsa mínima para api/aprobar-profe.js
const datos = new Map()
const db = {
  doc: path => ({
    get: async () => ({ exists: datos.has(path), data: () => datos.get(path) }),
    set: async (d, { merge } = {}) => datos.set(path, merge ? { ...datos.get(path), ...d } : d),
    update: async d => datos.set(path, { ...datos.get(path), ...d }),
  }),
}
vi.mock('../../../api/_admin.js', () => ({
  getDb: async () => db,
  // El token de prueba es el propio correo
  getAdminAuth: async () => ({ verifyIdToken: async t => ({ email: t }) }),
  fail: (res, err) => { throw err },
}))
const { default: handler } = await import('../../../api/aprobar-profe.js')

async function llama(body, token) {
  let status = 200, json
  const res = { status: s => { status = s; return res }, json: j => { json = j; return res } }
  await handler({ method: 'POST', body, headers: token ? { authorization: `Bearer ${token}` } : {} }, res)
  return { status, ...json }
}

describe('api/aprobar-profe', () => {
  beforeEach(() => {
    datos.clear()
    datos.set('solicitudesProfe/u1', { uid: 'u1', email: 'profe@cole.es', nombre: 'Marta', centro: 'IES Ejemplo', etapa: 'eso', estado: 'pendiente' })
    datos.set('users/u1', { name: 'Marta' })
  })

  it('solo un administrador', async () => {
    expect((await llama({ uid: 'u1', accion: 'aprobar' })).status).toBe(401)
    expect((await llama({ uid: 'u1', accion: 'aprobar' }, 'alguien@gmail.com')).status).toBe(403)
    expect(datos.get('users/u1').teacherProfile).toBeUndefined()
  })

  it('aprobar convierte la cuenta en profe, sin tocar lo demás', async () => {
    expect(await llama({ uid: 'u1', accion: 'aprobar' }, 'pinya1994@gmail.com')).toMatchObject({ status: 200, estado: 'aprobada' })
    const u = datos.get('users/u1')
    expect(u.name).toBe('Marta')
    expect(u.teacherProfile).toMatchObject({ active: true, promoCode: 'BETATUTHOR', schoolName: 'IES Ejemplo', stage: 'eso' })
    expect(datos.get('solicitudesProfe/u1').estado).toBe('aprobada')
  })

  it('rechazar no da acceso', async () => {
    expect(await llama({ uid: 'u1', accion: 'rechazar' }, 'pinya1994@gmail.com')).toMatchObject({ estado: 'rechazada' })
    expect(datos.get('users/u1').teacherProfile).toBeUndefined()
    expect((await llama({ uid: 'nadie', accion: 'aprobar' }, 'pinya1994@gmail.com')).status).toBe(404)
  })
})
