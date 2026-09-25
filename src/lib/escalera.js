// La Escalera de Unidades — conversión de unidades del sistema métrico
// (longitud, masa, capacidad). Cada escalón hacia abajo multiplica ×10;
// hacia arriba divide ÷10. La mecánica es la misma para las tres magnitudes.

export const MAGNITUDES = {
  longitud: {
    nombre: { es: 'longitud', en: 'length', ca: 'longitud' },
    emoji: '📏',
    unidades: ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'],
  },
  masa: {
    nombre: { es: 'masa', en: 'mass', ca: 'massa' },
    emoji: '⚖️',
    unidades: ['kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg'],
  },
  capacidad: {
    nombre: { es: 'capacidad', en: 'capacity', ca: 'capacitat' },
    emoji: '🥤',
    unidades: ['kL', 'hL', 'daL', 'L', 'dL', 'cL', 'mL'],
  },
}

// valor · 10^p sin arrastrar error de coma flotante
export function mulPow10(valor, p) {
  if (p === 0) return valor
  return Number((valor * Math.pow(10, p)).toPrecision(12))
}

function pick(arr, rand) { return arr[Math.floor(rand() * arr.length)] }

// Devuelve { magnitud, unidades, deIdx, aIdx, valor, objetivo, pasos, abajo }
export function nuevaConversion(difId = 'facil', rand = Math.random) {
  let magKeys, maxStep, permiteArriba, permiteDecimal
  if (difId === 'facil') {
    magKeys = ['longitud']; maxStep = 3; permiteArriba = false; permiteDecimal = false
  } else if (difId === 'medio') {
    magKeys = ['longitud', 'masa', 'capacidad']; maxStep = 2; permiteArriba = true; permiteDecimal = false
  } else {
    magKeys = ['longitud', 'masa', 'capacidad']; maxStep = 3; permiteArriba = true; permiteDecimal = true
  }

  const magKey = pick(magKeys, rand)
  const unidades = MAGNITUDES[magKey].unidades
  const n = unidades.length
  const pasos = 1 + Math.floor(rand() * maxStep)
  const abajo = permiteArriba ? rand() < 0.5 : true

  let deIdx, aIdx
  if (abajo) {
    deIdx = Math.floor(rand() * (n - pasos))   // 0 .. n-1-pasos
    aIdx = deIdx + pasos
  } else {
    deIdx = pasos + Math.floor(rand() * (n - pasos)) // pasos .. n-1
    aIdx = deIdx - pasos
  }

  let valor
  if (permiteDecimal && rand() < 0.5) {
    valor = Math.round((1 + rand() * 98) * 10) / 10   // un decimal, 1.0 .. 99.8
  } else {
    valor = 1 + Math.floor(rand() * (difId === 'facil' ? 9 : 99))
  }

  const objetivo = mulPow10(valor, aIdx - deIdx)
  return { magnitud: magKey, unidades, deIdx, aIdx, valor, objetivo, pasos, abajo }
}

export function factorTexto(conv) {
  const factor = Math.pow(10, conv.pasos)
  return `${conv.abajo ? '×' : '÷'} ${factor.toLocaleString('es-ES')}`
}

export function parseNum(txt) {
  if (txt == null) return NaN
  const t = String(txt).replace(',', '.').trim()
  if (t === '' || t === '.' || t === '-') return NaN
  return parseFloat(t)
}

export function esCorrecta(conv, txt) {
  const n = parseNum(txt)
  if (Number.isNaN(n)) return false
  return Math.abs(n - conv.objetivo) <= 1e-9 * Math.max(1, Math.abs(conv.objetivo))
}

// Número limpio a texto, con separador decimal según idioma
export function formatNum(n, l = 'es') {
  let s = String(n)
  if (s.includes('e') || s.includes('E')) {
    s = n.toFixed(12).replace(/0+$/, '').replace(/\.$/, '')
  }
  return l === 'en' ? s : s.replace('.', ',')
}
