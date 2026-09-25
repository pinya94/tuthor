// Números Romanos — lógica del juego. La usan el juego
// (src/pages/NumerosRomanos.jsx) y su examen.
//
// El jugador construye el número romano de una cantidad tocando los símbolos
// (I V X L C D M). Se puntúa contra la forma CANÓNICA (el 4 es IV, no IIII), que
// es lo que hay que aprender.
//   · Fácil:   1–39   (I, V, X; con IV y IX).
//   · Medio:   1–399  (añade L, C; XL, XC, CD…).
//   · Difícil: 1–3999 (añade D, M).

// Símbolos sueltos de la paleta (el jugador compone IV, XL… tocando dos).
export const SIMBOLOS = [
  { s: 'I', v: 1 }, { s: 'V', v: 5 }, { s: 'X', v: 10 }, { s: 'L', v: 50 },
  { s: 'C', v: 100 }, { s: 'D', v: 500 }, { s: 'M', v: 1000 },
]

const PARES = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

// Número → romano canónico.
export function aRomano(n) {
  let r = ''
  let x = n
  for (const [val, sim] of PARES) {
    while (x >= val) { r += sim; x -= val }
  }
  return r
}

// Romano → número (suma, restando cuando un símbolo menor precede a uno mayor).
// Sirve para la vista previa mientras se construye; no valida que sea canónico.
export function valorRomano(str) {
  const VAL = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let total = 0
  for (let i = 0; i < str.length; i++) {
    const a = VAL[str[i]]
    const b = VAL[str[i + 1]]
    if (b && a < b) total -= a
    else total += a
  }
  return total
}

// Símbolos disponibles en la paleta según la dificultad.
export function simbolosDe(difId) {
  if (difId === 'facil') return SIMBOLOS.filter(s => s.v <= 10)
  if (difId === 'medio') return SIMBOLOS.filter(s => s.v <= 100)
  return SIMBOLOS
}

export function nuevoNumero(difId = 'facil', rand = Math.random) {
  const max = difId === 'dificil' ? 3999 : difId === 'medio' ? 399 : 39
  return 1 + Math.floor(rand() * max)
}

// ¿La cadena construida es el romano canónico del número?
export function esCorrecto(numero, construido) {
  return construido === aRomano(numero)
}
