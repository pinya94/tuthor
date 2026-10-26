// Ranking de clase sin cuenta: lo que comparten el navegador y el servidor
// (api/ranking-clase.js importa este mismo fichero), para que la misma regla
// no viva escrita dos veces.
//
// Los alumnos son menores: en el ranking solo hay un APODO que eligen ellos,
// nunca nombre real ni correo. El apodo se limpia y se rechazan palabrotas
// obvias; lo que se cuele lo borra el profesor desde su ranking.

// Sin 0/O ni 1/I/L: un código que se dicta en clase y se copia de la pizarra
export const ALFABETO_CODIGO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
export const LARGO_CODIGO = 6
export const MAX_ALUMNOS = 200
export const MAX_PUNTOS = 1_000_000

export function generaCodigo(rand = Math.random) {
  let c = ''
  for (let i = 0; i < LARGO_CODIGO; i++) c += ALFABETO_CODIGO[Math.floor(rand() * ALFABETO_CODIGO.length)]
  return c
}
export const normalizaCodigo = raw => String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '')
export const codigoValido = c => c.length === LARGO_CODIGO && [...c].every(x => ALFABETO_CODIGO.includes(x))

// Palabrotas e insultos frecuentes (es/ca/en), comparados sin tildes ni
// números «disfrazados» (put0 → puto). No pretende ser completa.
const VETADAS = [
  'puta', 'puto', 'mierda', 'cabron', 'gilipollas', 'idiota', 'imbecil', 'subnormal', 'maricon', 'polla', 'coño', 'cono', 'joder', 'follar', 'zorra', 'pene', 'culo', 'tonto', 'tonta', 'retrasad', 'mongol', 'nazi', 'hitler', 'facha', 'negrata', 'sudaca', 'moro',
  'merda', 'collons', 'fill de puta', 'capullo', 'cabro', 'gilipolles',
  'fuck', 'shit', 'bitch', 'dick', 'cock', 'pussy', 'whore', 'slut', 'nigg', 'fag', 'retard', 'cunt', 'sex', 'porn', 'xxx',
]
const DESDISFRAZA = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', 7: 't', '@': 'a', $: 's' }
export function claveApodo(a) {
  return String(a).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[013457@$]/g, c => DESDISFRAZA[c]).replace(/[^a-zñç]/g, '')
}

// Devuelve { ok, apodo } con el apodo limpio, o { ok: false, error }:
//   corto | largo | caracteres | vetado
export function validaApodo(raw) {
  const apodo = String(raw ?? '').replace(/\s+/g, ' ').trim()
  if (apodo.length < 2) return { ok: false, error: 'corto' }
  if (apodo.length > 16) return { ok: false, error: 'largo' }
  if (!/^[\p{L}\p{N} ._-]+$/u.test(apodo)) return { ok: false, error: 'caracteres' }
  const k = claveApodo(apodo)
  if (k.length < 2) return { ok: false, error: 'caracteres' }
  // Las largas, en cualquier parte; las cortas, solo como palabra entera
  // (si no, «Penélope», «Conor» o «Sexto» se quedarían fuera)
  const palabras = apodo.split(/[ ._-]+/).map(claveApodo)
  if (VETADAS.some(v => { const c = claveApodo(v); return c.length >= 5 ? k.includes(c) : palabras.includes(c) })) return { ok: false, error: 'vetado' }
  return { ok: true, apodo }
}

export const juegoValido = g => /^[a-z0-9-]{2,40}$/.test(String(g ?? ''))
export const puntosValidos = p => Number.isInteger(p) && p >= 0 && p <= MAX_PUNTOS
export const dispositivoValido = d => /^[a-zA-Z0-9-]{16,40}$/.test(String(d ?? ''))
