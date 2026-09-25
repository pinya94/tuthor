// Redondeo — redondear al orden pedido (decena, centena, millar, unidad,
// décima, centésima). La mecánica: un número cae entre sus dos "redondos"
// vecinos sobre una recta y hay que elegir el más cercano (regla del ≥ 5).

export const PLACES = {
  '-2': { noun: { es: 'centésima', en: 'hundredth', ca: 'centèsima' }, frase: { es: 'a la centésima', en: 'to the nearest hundredth', ca: 'a la centèsima' } },
  '-1': { noun: { es: 'décima', en: 'tenth', ca: 'dècima' }, frase: { es: 'a la décima', en: 'to the nearest tenth', ca: 'a la dècima' } },
  '0':  { noun: { es: 'unidad', en: 'unit', ca: 'unitat' }, frase: { es: 'a la unidad', en: 'to the nearest unit', ca: 'a la unitat' } },
  '1':  { noun: { es: 'decena', en: 'ten', ca: 'desena' }, frase: { es: 'a la decena', en: 'to the nearest ten', ca: 'a la desena' } },
  '2':  { noun: { es: 'centena', en: 'hundred', ca: 'centena' }, frase: { es: 'a la centena', en: 'to the nearest hundred', ca: 'a la centena' } },
  '3':  { noun: { es: 'millar', en: 'thousand', ca: 'miler' }, frase: { es: 'al millar', en: 'to the nearest thousand', ca: 'al miler' } },
}

export function placeFrase(p, l) { const o = PLACES[String(p)]; return o?.frase?.[l] ?? o?.frase?.es }
export function placeNoun(p, l) { const o = PLACES[String(p)]; return o?.noun?.[l] ?? o?.noun?.es }

const P10 = p => Number(Math.pow(10, p).toPrecision(12))

// Redondeo al múltiplo de 10^p más cercano (medio hacia arriba)
export function roundToPow(n, p) {
  const f = P10(p)
  return Number((Math.round(n / f) * f).toPrecision(12))
}

function pick(arr, rand) { return arr[Math.floor(rand() * arr.length)] }
function randInt(rand, min, max) { return min + Math.floor(rand() * (max - min + 1)) }

// Devuelve { valor, valorStr, decimales, p, abajo, arriba, objetivo }
export function nuevaRonda(difId = 'facil', rand = Math.random) {
  let valor, p, decimales = 0

  if (difId === 'facil') {
    p = 1
    valor = randInt(rand, 11, 999)
  } else if (difId === 'medio') {
    p = pick([1, 2], rand)
    valor = randInt(rand, 100, 9999)
  } else if (rand() < 0.4) {
    // decimales: redondear a la unidad o a la décima
    p = pick([0, -1], rand)
    valor = Math.round((1 + rand() * 98) * 100) / 100 // 2 decimales
    decimales = 2
  } else {
    p = pick([1, 2, 3], rand)
    valor = randInt(rand, 1000, 99999)
  }

  const f = P10(p)
  // Cociente entero robusto (absorbe el error de coma de valor/f con decimales)
  const kDe = v => Math.floor(v / f + 1e-9)
  // Garantiza que haya decisión real: que el valor no caiga ya sobre un redondo.
  const yaRedondo = v => Math.abs(v - kDe(v) * f) < f * 1e-9
  let intentos = 0
  while (yaRedondo(valor) && intentos < 20) {
    if (decimales) valor = Math.round((1 + rand() * 98) * 100) / 100
    else if (difId === 'facil') valor = randInt(rand, 11, 999)
    else if (difId === 'medio') valor = randInt(rand, 100, 9999)
    else valor = randInt(rand, 1000, 99999)
    intentos++
  }

  const abajo = Number((kDe(valor) * f).toPrecision(12))
  const arriba = Number((abajo + f).toPrecision(12))
  const objetivo = roundToPow(valor, p)
  const valorStr = decimales ? valor.toFixed(decimales) : String(valor)

  return { valor, valorStr, decimales, p, abajo, arriba, objetivo }
}

export function esCorrecta(ronda, eleccion) {
  return Math.abs(Number(eleccion) - ronda.objetivo) <= 1e-9 * Math.max(1, Math.abs(ronda.objetivo))
}

// Número limpio a texto, con separador decimal según idioma
export function formatNum(n, l = 'es', decimales) {
  let s = decimales != null ? Number(n).toFixed(decimales) : String(n)
  if (s.includes('e') || s.includes('E')) s = Number(n).toFixed(12).replace(/0+$/, '').replace(/\.$/, '')
  return l === 'en' ? s : s.replace('.', ',')
}
