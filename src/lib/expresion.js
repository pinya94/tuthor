// ── Expresiones de funciones: leer lo que escribe un alumno ─────────────────
//
// El recurso de funciones deja escribir la función tal como sale en el libro:
// "2x + 3", "y = 0,5x − 1", "x(x − 1)", "(x − 1)²", "f(x) = −x² + 4". Nada de
// eval(): un parser pequeño de descenso recursivo que entiende exactamente lo
// que hace falta y dice qué no ha entendido.
//
// Dos salidas, porque sirven para cosas distintas:
//   · evaluar(ast, x) — un número, para DIBUJAR cualquier cosa que se escriba
//     (también 1/x o √x).
//   · aPolinomio(ast) — coeficientes EXACTOS en fracciones, o null si no es un
//     polinomio. Es lo que permite resolver "2x + 3 = −x + 6" como en la
//     pizarra, con x = 1 y no x = 0.9999999. Un alumno que ve 0,333333 donde
//     su libro pone 1/3 cree que se ha equivocado.

// ── Fracciones exactas ──────────────────────────────────────────────────────

const mcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1 }

export function frac(n, d = 1) {
  if (d === 0) throw new ErrorExpresion('division')
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d)) throw new ErrorExpresion('grande')
  const s = d < 0 ? -1 : 1
  const g = mcd(n, d)
  return { n: (s * n) / g || 0, d: (s * d) / g }
}

export const CERO = frac(0)
export const UNO = frac(1)
export const sumar = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d)
export const restar = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d)
export const multiplicar = (a, b) => frac(a.n * b.n, a.d * b.d)
export const dividir = (a, b) => frac(a.n * b.d, a.d * b.n)
export const opuesto = a => frac(-a.n, a.d)
export const esCero = a => a.n === 0
export const iguales = (a, b) => a.n === b.n && a.d === b.d
export const valor = a => a.n / a.d

export const MENOS = '−'
export function fracTexto(a) {
  const signo = a.n < 0 ? MENOS : ''
  return a.d === 1 ? `${signo}${Math.abs(a.n)}` : `${signo}${Math.abs(a.n)}/${a.d}`
}

// "2.5" → 5/2. Los decimales se leen exactos: 0,1 es 1/10 y no el
// 0.1000000000000000055 de la coma flotante.
function decimal(texto) {
  if (texto.replace('.', '').length > 12) throw new ErrorExpresion('grande')
  const [ent, dec = ''] = texto.split('.')
  return frac(Number(ent + dec || '0'), 10 ** dec.length)
}

// ── Errores con código: la página decide cómo decirlo en cada idioma ────────

export class ErrorExpresion extends Error {
  constructor(codigo, detalle = '') {
    super(`${codigo}${detalle ? `: ${detalle}` : ''}`)
    this.codigo = codigo   // vacia | caracter | variable | parentesis | incompleta | division | grande
    this.detalle = detalle
  }
}

// ── Lectura ─────────────────────────────────────────────────────────────────

// Lo que se escribe en un móvil o se copia de un PDF no es ASCII: menos
// tipográfico, punto medio, ², coma decimal. Todo se lleva a una forma única
// antes de trocear, para que el parser solo tenga que conocer una.
function normalizar(texto) {
  let s = String(texto ?? '')
    .replace(/²/g, '^2').replace(/³/g, '^3')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[−–—]/g, '-').replace(/[·×]/g, '*').replace(/÷/g, '/')
    .replace(/\*\*/g, '^').replace(/,/g, '.')
    .trim()
  // "y =", "f(x) =", "g(x)=" delante no son parte de la expresión.
  s = s.replace(/^(?:[a-z]\s*\(\s*x\s*\)|y)\s*=\s*/, '')
  return s.trim()
}

const RE_TOKEN = /\s+|(\d+(?:\.\d*)?|\.\d+)|(sqrt|raiz|abs|√)|(x)|([-+*/^()])|([a-z])|(.)/y

function trocear(src) {
  const toks = []
  RE_TOKEN.lastIndex = 0
  while (RE_TOKEN.lastIndex < src.length) {
    const m = RE_TOKEN.exec(src)
    if (m[1]) toks.push({ tipo: 'num', v: m[1] })
    else if (m[2]) toks.push({ tipo: 'fn', v: m[2] === 'abs' ? 'abs' : 'sqrt' })
    else if (m[3]) toks.push({ tipo: 'x', v: 'x' })
    else if (m[4]) toks.push({ tipo: 'op', v: m[4] })
    // Otra letra casi siempre es "y = 2t + 1" o una t de tiempo: se dice que
    // la variable es x, que es más útil que "carácter no válido".
    else if (m[5]) throw new ErrorExpresion('variable', m[5])
    else if (m[6]) throw new ErrorExpresion('caracter', m[6])
  }
  return toks
}

// Gramática, de menos a más prioridad:
//   expr     := termino (('+' | '-') termino)*
//   termino  := unario (('*' | '/' | [producto implícito]) unario)*
//   unario   := '-' unario | '+' unario | potencia
//   potencia := atomo ('^' unario)?
//   atomo    := número | x | '(' expr ')' | función atomo
//
// El menos unario va POR ENCIMA de la potencia a propósito: −x² es −(x²), como
// en cualquier libro, y no (−x)², que es lo que haría una calculadora mal hecha.
export function leerExpresion(texto) {
  const src = normalizar(texto)
  if (!src) throw new ErrorExpresion('vacia')
  const toks = trocear(src)
  let i = 0
  const tomar = v => (toks[i]?.v === v ? (i++, true) : false)
  // "2x", "3(x + 1)", "x(x − 1)": un factor pegado a otro multiplica.
  const empiezaFactor = t => t && (t.tipo === 'num' || t.tipo === 'x' || t.tipo === 'fn' || t.v === '(')

  function expr() {
    let a = termino()
    for (;;) {
      if (tomar('+')) a = { t: 'add', a, b: termino() }
      else if (tomar('-')) a = { t: 'sub', a, b: termino() }
      else return a
    }
  }
  function termino() {
    let a = unario()
    for (;;) {
      if (tomar('*')) a = { t: 'mul', a, b: unario() }
      else if (tomar('/')) a = { t: 'div', a, b: unario() }
      else if (empiezaFactor(toks[i])) a = { t: 'mul', a, b: potencia() }
      else return a
    }
  }
  function unario() {
    if (tomar('-')) return { t: 'neg', a: unario() }
    if (tomar('+')) return unario()
    return potencia()
  }
  function potencia() {
    const base = atomo()
    return tomar('^') ? { t: 'pow', a: base, b: unario() } : base
  }
  function entreParentesis() {
    const e = expr()
    if (!tomar(')')) throw new ErrorExpresion('parentesis')
    return e
  }
  function atomo() {
    const t = toks[i]
    if (!t) throw new ErrorExpresion('incompleta')
    if (t.tipo === 'num') { i++; return { t: 'num', v: decimal(t.v) } }
    if (t.tipo === 'x') { i++; return { t: 'x' } }
    if (tomar('(')) return entreParentesis()
    if (t.tipo === 'fn') { i++; return { t: 'fn', f: t.v, a: tomar('(') ? entreParentesis() : potencia() } }
    throw new ErrorExpresion(t.v === ')' ? 'parentesis' : 'incompleta', t.v)
  }

  const ast = expr()
  if (i < toks.length) throw new ErrorExpresion(toks[i].v === ')' ? 'parentesis' : 'incompleta', toks[i].v)
  return ast
}

// ── Evaluar (para dibujar) ──────────────────────────────────────────────────

export function evaluar(n, x) {
  switch (n.t) {
    case 'num': return valor(n.v)
    case 'x': return x
    case 'neg': return -evaluar(n.a, x)
    case 'add': return evaluar(n.a, x) + evaluar(n.b, x)
    case 'sub': return evaluar(n.a, x) - evaluar(n.b, x)
    case 'mul': return evaluar(n.a, x) * evaluar(n.b, x)
    case 'div': return evaluar(n.a, x) / evaluar(n.b, x)
    case 'pow': return Math.pow(evaluar(n.a, x), evaluar(n.b, x))
    case 'fn': { const v = evaluar(n.a, x); return n.f === 'abs' ? Math.abs(v) : Math.sqrt(v) }
    default: return NaN
  }
}

// ── Polinomios exactos ──────────────────────────────────────────────────────
// Un polinomio es la lista de coeficientes por grado: 2x² − 3 = [−3, 0, 2].

export const GRADO_MAX = 6

const recortar = p => { const c = [...p]; while (c.length > 1 && esCero(c[c.length - 1])) c.pop(); return c }
export const polSumar = (p, q) => recortar(Array.from({ length: Math.max(p.length, q.length) }, (_, k) => sumar(p[k] ?? CERO, q[k] ?? CERO)))
export const polRestar = (p, q) => polSumar(p, q.map(opuesto))
export function polMultiplicar(p, q) {
  const r = Array.from({ length: p.length + q.length - 1 }, () => CERO)
  p.forEach((a, k) => q.forEach((b, j) => { r[k + j] = sumar(r[k + j], multiplicar(a, b)) }))
  return recortar(r)
}
export const grado = p => p.length - 1
export const polEvaluar = (p, x) => p.reduceRight((acc, c) => sumar(multiplicar(acc, x), c), CERO)

function pol(n) {
  switch (n.t) {
    case 'num': return [n.v]
    case 'x': return [CERO, UNO]
    case 'neg': { const a = pol(n.a); return a && a.map(opuesto) }
    case 'add': case 'sub': {
      const a = pol(n.a), b = pol(n.b)
      return a && b && (n.t === 'add' ? polSumar(a, b) : polRestar(a, b))
    }
    case 'mul': { const a = pol(n.a), b = pol(n.b); return a && b && polMultiplicar(a, b) }
    // Solo se divide entre una CONSTANTE: x/2 es un polinomio, 1/x no.
    case 'div': {
      const a = pol(n.a), b = pol(n.b)
      if (!a || !b || b.length !== 1 || esCero(b[0])) return null
      return recortar(a.map(c => dividir(c, b[0])))
    }
    // Exponente natural y constante: (x − 1)² sí; x^½ o 2^x no.
    case 'pow': {
      const a = pol(n.a), b = pol(n.b)
      if (!a || !b || b.length !== 1 || b[0].d !== 1 || b[0].n < 0 || b[0].n > GRADO_MAX) return null
      let r = [UNO]
      for (let k = 0; k < b[0].n; k++) {
        r = polMultiplicar(r, a)
        if (grado(r) > GRADO_MAX) return null
      }
      return r
    }
    default: return null
  }
}

// null si la expresión no es un polinomio de grado ≤ GRADO_MAX o si los
// números se salen de lo que se puede llevar exacto.
export function aPolinomio(ast) {
  try {
    const p = pol(ast)
    return p && grado(p) <= GRADO_MAX ? p : null
  } catch {
    return null
  }
}

const SUPER = ['', '', '²', '³', '⁴', '⁵', '⁶']

// [3, −2, 1] → "x² − 2x + 3". Un coeficiente fraccionario va entre paréntesis,
// "(1/2)x", porque "1/2x" se lee como 1/(2x).
export function polinomioTexto(p) {
  const partes = []
  for (let g = p.length - 1; g >= 0; g--) {
    const c = p[g]
    if (esCero(c) && !(g === 0 && partes.length === 0)) continue
    const abs = frac(Math.abs(c.n), c.d)
    const potenciaX = g === 0 ? '' : g === 1 ? 'x' : `x${SUPER[g]}`
    let coef = g > 0 && abs.n === 1 && abs.d === 1 ? '' : fracTexto(abs)
    if (g > 0 && abs.d !== 1) coef = `(${coef})`
    const termino = coef + potenciaX
    partes.push(partes.length === 0 ? `${c.n < 0 ? MENOS : ''}${termino}` : `${c.n < 0 ? MENOS : '+'} ${termino}`)
  }
  return partes.join(' ')
}
