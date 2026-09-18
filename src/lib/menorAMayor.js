// De Menor a Mayor — motor del juego de ordenar números.
//
// Genera un mazo de "cartas", cada una un número escrito de una forma distinta
// (fracción, decimal, porcentaje o entero) pero con un VALOR real con el que se
// ordena. El jugador ve la expresión (p. ej. "3/4") y decide dónde va en la
// recta; al colocarla se revela su decimal exacto ("0,75") — ese es el momento
// de aprender. Reutiliza el tablero compartido TimelineBoard.
//
// Distintos por construcción: no metemos dos cartas con valores casi iguales
// (según el `gap` de la dificultad), para que comparar no sea una trampa.

const MENOS = '−' // U+2212, el mismo signo que usa el resto de la plataforma

const pick = arr => arr[Math.floor(Math.random() * arr.length)]
const rnd = (a, b) => a + Math.random() * (b - a)
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b] } return a || 1 }

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Decimal con coma; añade "≈" si no es exacto en dos decimales (p. ej. 1/3).
export function decimalExacto(v) {
  const neg = v < 0
  const a = Math.abs(v)
  const r = Math.round(a * 100) / 100
  const exacto = Math.abs(a - r) < 1e-9
  let s = r.toFixed(2).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',')
  return (exacto ? '' : '≈ ') + (neg ? MENOS : '') + s
}

// Decimal "limpio" para MOSTRAR una carta que ya es decimal (sin "≈").
function decimalLimpio(v) {
  const neg = v < 0
  const a = Math.abs(v)
  const s = a.toFixed(2).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',')
  return (neg ? MENOS : '') + s
}

// ── Generadores de una carta ─────────────────────────────────────────────────
function carta(tipo, valor, expr) {
  return { tipo, valor, expr, decimal: decimalExacto(valor) }
}

// Fracción propia o impropia por debajo de `maxVal`. `neg` permite negativas.
function genFraccion(neg, maxVal) {
  const dens = [2, 3, 4, 5, 6, 8, 10]
  for (let intento = 0; intento < 12; intento++) {
    const d = pick(dens)
    const n = 1 + Math.floor(Math.random() * (d * maxVal - 1))
    if (n % d === 0) continue // sería un entero, no una fracción
    const g = gcd(n, d)
    const nn = n / g, dd = d / g
    if (dd === 1) continue
    const signo = neg && Math.random() < 0.5 ? -1 : 1
    const valor = signo * nn / dd
    const expr = (signo < 0 ? MENOS : '') + `${nn}/${dd}`
    return carta('fraccion', valor, expr)
  }
  return null
}

function genDecimal(neg, max) {
  const dosDecimales = Math.random() < 0.5
  const f = dosDecimales ? 100 : 10
  const v = Math.max(1, Math.round(rnd(0.1, max) * f)) / f
  const signo = neg && Math.random() < 0.5 ? -1 : 1
  const valor = signo * v
  return { tipo: 'decimal', valor, expr: decimalLimpio(valor), decimal: decimalExacto(valor) }
}

function genPorcentaje() {
  const p = 5 * (1 + Math.floor(Math.random() * 19)) // 5 … 95
  return carta('porcentaje', p / 100, `${p} %`)
}

function genEntero(max) {
  let v = 0
  while (v === 0) v = Math.round(rnd(-max, max))
  return carta('entero', v, v < 0 ? MENOS + Math.abs(v) : `${v}`)
}

// ── Dificultades ─────────────────────────────────────────────────────────────
// `gen()` devuelve una carta (o null si el intento no cuaja). `gap` es la
// distancia mínima entre valores para que no aparezcan dos casi iguales.
export const DIFICULTADES = {
  facil: {
    gap: 0.2,
    gen: () => (Math.random() < 0.5 ? genDecimal(false, 10) : genFraccion(false, 4)),
  },
  medio: {
    gap: 0.05,
    gen: () => pick([() => genFraccion(false, 1), () => genDecimal(false, 1), () => genPorcentaje()])(),
  },
  dificil: {
    gap: 0.07,
    gen: () => pick([() => genFraccion(true, 2), () => genDecimal(true, 2), () => genPorcentaje(), () => genEntero(3)])(),
  },
}

// Un mazo de `n` cartas con valores suficientemente separados.
export function nuevoMazo(difId = 'medio', n = 12) {
  const dif = DIFICULTADES[difId] ?? DIFICULTADES.medio
  const cartas = []
  let intentos = 0
  while (cartas.length < n && intentos < 500) {
    intentos++
    const c = dif.gen()
    if (!c) continue
    if (cartas.some(x => Math.abs(x.valor - c.valor) < dif.gap)) continue
    c.id = `n${cartas.length}_${Math.round(c.valor * 1000)}`
    cartas.push(c)
  }
  return shuffle(cartas)
}

// Posición correcta de `carta` en la recta ya ordenada de menor a mayor.
// Como todos los valores son distintos, el índice es único.
export function posicionCorrecta(carta, recta) {
  let i = 0
  while (i < recta.length && recta[i].valor < carta.valor) i++
  return i
}
