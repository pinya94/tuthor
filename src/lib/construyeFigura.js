// Construye la Figura: en una cuadrícula, el alumno pinta casillas hasta
// formar una figura que cumpla el encargo (área, perímetro, rectángulo…).
// Se corrige CALCULANDO la figura que ha hecho: cualquier figura que cumpla
// vale, así que nunca se marca mal una respuesta correcta.
//
//   facil    área A (contar cuadraditos) · rectángulo de área A
//   medio    área A y perímetro P · rectángulo de perímetro P
//   dificil  área A con el MAYOR / MENOR perímetro posible ·
//            misma área que la figura de muestra y otro perímetro
//
// La figura tiene que ser de una pieza (casillas unidas por un lado, no
// solo por una esquina) y sin agujeros: con un agujero, ¿el borde de
// dentro cuenta como perímetro? Los libros no se ponen de acuerdo, así que
// no entra en juego.
//
// Cada ronda trae un `ejemplo` que cumple (se enseña al fallar) y el
// generador lo comprueba con la misma `valida` que corrige al alumno.

export const NIVELES = { facil: { n: 6 }, medio: { n: 7 }, dificil: { n: 7 } }

const k = (r, c) => `${r},${c}`
const rc = s => s.split(',').map(Number)
const VEC = [[1, 0], [-1, 0], [0, 1], [0, -1]]

export function area(cells) { return new Set(cells).size }

export function perimetro(cells) {
  const S = new Set(cells)
  let p = 0
  for (const s of S) { const [r, c] = rc(s); for (const [dr, dc] of VEC) if (!S.has(k(r + dr, c + dc))) p++ }
  return p
}

// Lados del contorno, para dibujarlo al corregir: [x1, y1, x2, y2] en casillas.
export function bordes(cells) {
  const S = new Set(cells), out = []
  for (const s of S) {
    const [r, c] = rc(s)
    if (!S.has(k(r - 1, c))) out.push([c, r, c + 1, r])
    if (!S.has(k(r + 1, c))) out.push([c, r + 1, c + 1, r + 1])
    if (!S.has(k(r, c - 1))) out.push([c, r, c, r + 1])
    if (!S.has(k(r, c + 1))) out.push([c + 1, r, c + 1, r + 1])
  }
  return out
}

export function conexa(cells) {
  const S = new Set(cells)
  if (S.size === 0) return false
  const [ini] = S, vistos = new Set([ini]), cola = [ini]
  while (cola.length) {
    const [r, c] = rc(cola.pop())
    for (const [dr, dc] of VEC) { const v = k(r + dr, c + dc); if (S.has(v) && !vistos.has(v)) { vistos.add(v); cola.push(v) } }
  }
  return vistos.size === S.size
}

// ¿Queda alguna casilla vacía encerrada? Se inunda desde fuera del dibujo.
export function tieneHueco(cells) {
  const S = new Set(cells)
  if (!S.size) return false
  const ps = [...S].map(rc)
  const r0 = Math.min(...ps.map(p => p[0])) - 1, r1 = Math.max(...ps.map(p => p[0])) + 1
  const c0 = Math.min(...ps.map(p => p[1])) - 1, c1 = Math.max(...ps.map(p => p[1])) + 1
  const fuera = new Set([k(r0, c0)]), cola = [[r0, c0]]
  while (cola.length) {
    const [r, c] = cola.pop()
    for (const [dr, dc] of VEC) {
      const nr = r + dr, nc = c + dc, v = k(nr, nc)
      if (nr < r0 || nr > r1 || nc < c0 || nc > c1 || S.has(v) || fuera.has(v)) continue
      fuera.add(v); cola.push([nr, nc])
    }
  }
  return (r1 - r0 + 1) * (c1 - c0 + 1) - S.size - fuera.size > 0
}

export function esRectangulo(cells) {
  const S = new Set(cells)
  if (!S.size) return null
  const ps = [...S].map(rc)
  const alto = Math.max(...ps.map(p => p[0])) - Math.min(...ps.map(p => p[0])) + 1
  const ancho = Math.max(...ps.map(p => p[1])) - Math.min(...ps.map(p => p[1])) + 1
  return alto * ancho === S.size ? [ancho, alto] : null
}

export const perimetroMax = a => 2 * a + 2
export const perimetroMin = a => 2 * Math.ceil(2 * Math.sqrt(a))

// Corrige una figura: { ok, motivo } con motivo en
// vacia | separada | hueco | area | perimetro | rectangulo
export function valida(r, cells) {
  const S = [...new Set(cells)]
  if (!S.length) return { ok: false, motivo: 'vacia' }
  if (!conexa(S)) return { ok: false, motivo: 'separada' }
  if (tieneHueco(S)) return { ok: false, motivo: 'hueco' }
  const A = area(S), P = perimetro(S)
  if (r.A != null && A !== r.A) return { ok: false, motivo: 'area' }
  if (r.P != null && P !== r.P) return { ok: false, motivo: 'perimetro' }
  if (r.tipo === 'max' && P !== perimetroMax(r.A)) return { ok: false, motivo: 'perimetro' }
  if (r.tipo === 'min' && P !== perimetroMin(r.A)) return { ok: false, motivo: 'perimetro' }
  if ((r.tipo === 'rect' || r.tipo === 'rectP') && !esRectangulo(S)) return { ok: false, motivo: 'rectangulo' }
  return { ok: true }
}

export const esCorrecta = (r, cells) => valida(r, cells ?? []).ok

// ── Generadores ────────────────────────────────────────────────────────────

const ent = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const elige = (xs, rand) => xs[Math.floor(rand() * xs.length)]

// Crece una figura casilla a casilla desde el centro. `arbol` = cada casilla
// nueva toca solo a una ya puesta (perímetro máximo).
function crece(A, n, rand, { arbol = false } = {}) {
  for (let intento = 0; intento < 400; intento++) {
    const m = Math.floor(n / 2), S = new Set([k(m, m)])
    let atasco = 0
    while (S.size < A && atasco < 500) {
      const [r, c] = rc(elige([...S], rand)), [dr, dc] = elige(VEC, rand)
      const nr = r + dr, nc = c + dc, v = k(nr, nc)
      atasco++
      if (nr < 0 || nc < 0 || nr >= n || nc >= n || S.has(v)) continue
      if (arbol && VEC.filter(([a, b]) => S.has(k(nr + a, nc + b))).length !== 1) continue
      S.add(v)
    }
    const cells = [...S]
    if (cells.length === A && !tieneHueco(cells)) return cells
  }
  return null
}

function rectangulo(ancho, alto, n) {
  const r0 = Math.floor((n - alto) / 2), c0 = Math.floor((n - ancho) / 2), out = []
  for (let r = 0; r < alto; r++) for (let c = 0; c < ancho; c++) out.push(k(r0 + r, c0 + c))
  return out
}

// La figura más «cuadrada» posible: filas completas y una incompleta.
function compacta(A, n) {
  const lado = Math.ceil(Math.sqrt(A)), out = []
  for (let i = 0; i < A; i++) out.push(k(Math.floor((n - lado) / 2) + Math.floor(i / lado), Math.floor((n - lado) / 2) + (i % lado)))
  return out
}

const TIPOS = { facil: ['area', 'rect'], medio: ['ap', 'ap', 'rectP'], dificil: ['max', 'min', 'otra', 'ap'] }

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const n = NIVELES[nivel]?.n ?? 6
  const tipo = elige(TIPOS[nivel] ?? TIPOS.facil, rand)
  let r
  if (tipo === 'area') {
    const A = ent(5, 12, rand)
    r = { tipo, A, ejemplo: crece(A, n, rand) }
  } else if (tipo === 'rect') {
    const pares = []
    for (let a = 2; a <= n; a++) for (let b = 2; b <= a; b++) if (a * b >= 6 && a * b <= 24) pares.push([a, b])
    const [a, b] = elige(pares, rand)
    r = { tipo, A: a * b, ejemplo: rectangulo(a, b, n) }
  } else if (tipo === 'ap') {
    const A = nivel === 'dificil' ? ent(10, 16, rand) : ent(6, 12, rand)
    const ejemplo = crece(A, n, rand)
    r = { tipo, A, P: perimetro(ejemplo), ejemplo }
  } else if (tipo === 'rectP') {
    const a = ent(2, n, rand), b = ent(1, a, rand)
    r = { tipo, P: 2 * (a + b), ejemplo: rectangulo(a, b, n) }
  } else if (tipo === 'max') {
    const A = ent(5, 10, rand)
    r = { tipo, A, ejemplo: crece(A, n, rand, { arbol: true }) }
  } else if (tipo === 'min') {
    const A = ent(7, 15, rand)
    r = { tipo, A, ejemplo: compacta(A, n) }
  } else {
    // «otra»: una figura de muestra y hay que hacer otra con la misma área
    // y el perímetro que se pide (distinto del de la muestra).
    const A = ent(6, 12, rand)
    const muestra = crece(A, n, rand)
    const P0 = perimetro(muestra)
    let ejemplo = null
    for (let i = 0; i < 60 && !ejemplo; i++) { const e = crece(A, n, rand); if (e && perimetro(e) !== P0) ejemplo = e }
    if (!ejemplo) ejemplo = perimetro(compacta(A, n)) !== P0 ? compacta(A, n) : crece(A, n, rand, { arbol: true })
    r = { tipo, A, P: perimetro(ejemplo), muestra, P0, ejemplo }
  }
  return { ...r, nivel, n, id: `${tipo}-${r.A ?? ''}-${r.P ?? ''}-${Math.floor(rand() * 1e6)}` }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// ── Textos ─────────────────────────────────────────────────────────────────

const T = (es, en, ca) => ({ es, en, ca })

export function enunciado(r) {
  switch (r.tipo) {
    case 'area': return T(`Pinta una figura de área ${r.A}`, `Paint a shape with an area of ${r.A}`, `Pinta una figura d’àrea ${r.A}`)
    case 'rect': return T(`Haz un rectángulo de área ${r.A}`, `Make a rectangle with an area of ${r.A}`, `Fes un rectangle d’àrea ${r.A}`)
    case 'ap': return T(`Área ${r.A} y perímetro ${r.P}`, `Area ${r.A} and perimeter ${r.P}`, `Àrea ${r.A} i perímetre ${r.P}`)
    case 'rectP': return T(`Haz un rectángulo de perímetro ${r.P}`, `Make a rectangle with a perimeter of ${r.P}`, `Fes un rectangle de perímetre ${r.P}`)
    case 'max': return T(`Área ${r.A} con el MAYOR perímetro posible`, `Area ${r.A} with the LONGEST possible perimeter`, `Àrea ${r.A} amb el MÉS GRAN perímetre possible`)
    case 'min': return T(`Área ${r.A} con el MENOR perímetro posible`, `Area ${r.A} with the SHORTEST possible perimeter`, `Àrea ${r.A} amb el MÉS PETIT perímetre possible`)
    default: return T(`Misma área que la muestra, pero perímetro ${r.P}`, `Same area as the sample, but perimeter ${r.P}`, `Mateixa àrea que la mostra, però perímetre ${r.P}`)
  }
}

export function pista(r) {
  switch (r.tipo) {
    case 'area': case 'rect': return T('Área = cuántos cuadraditos hay dentro.', 'Area = how many squares are inside.', 'Àrea = quants quadradets hi ha a dins.')
    case 'rectP': return T('Perímetro de un rectángulo = 2 × (base + altura).', 'Perimeter of a rectangle = 2 × (base + height).', 'Perímetre d’un rectangle = 2 × (base + altura).')
    case 'max': return T('Cuanto más estirada y con más ramas, más perímetro.', 'The more stretched out and branching, the longer the perimeter.', 'Com més estirada i amb més branques, més perímetre.')
    case 'min': return T('Cuanto más parecida a un cuadrado, menos perímetro.', 'The closer to a square, the shorter the perimeter.', 'Com més semblant a un quadrat, menys perímetre.')
    default: return T('Perímetro = cuántos lados de cuadradito hay en el borde.', 'Perimeter = how many square edges are on the outline.', 'Perímetre = quants costats de quadradet hi ha a la vora.')
  }
}

export function explicacion(r, cells, l = 'es') {
  const v = valida(r, cells ?? [])
  const A = area(cells ?? []), P = perimetro(cells ?? [])
  const t = {
    vacia: T('No has pintado ninguna casilla.', 'You haven’t painted any squares.', 'No has pintat cap casella.'),
    separada: T('La figura tiene que ser de una sola pieza: casillas unidas por un lado, no solo por una esquina.', 'The shape must be one piece: squares joined by a side, not just at a corner.', 'La figura ha de ser d’una sola peça: caselles unides per un costat, no només per una cantonada.'),
    hueco: T('La figura no puede tener agujeros dentro.', 'The shape can’t have holes inside.', 'La figura no pot tenir forats a dins.'),
    area: T(`Tu figura tiene área ${A} y se pedía ${r.A}.`, `Your shape has an area of ${A}; ${r.A} was needed.`, `La teva figura té àrea ${A} i se’n demanava ${r.A}.`),
    rectangulo: T('Tiene el área justa, pero no es un rectángulo: le sobran o le faltan esquinas.', 'The area is right, but it isn’t a rectangle.', 'Té l’àrea justa, però no és un rectangle.'),
  }
  if (v.ok) return T(`Área ${A} y perímetro ${P}. ¡Bien!`, `Area ${A} and perimeter ${P}. Well done!`, `Àrea ${A} i perímetre ${P}. Molt bé!`)[l]
  if (v.motivo === 'perimetro') {
    if (r.tipo === 'max') return T(`Tu perímetro es ${P}, pero con área ${r.A} se puede llegar a ${perimetroMax(r.A)}: que cada casilla nueva toque solo a una.`, `Your perimeter is ${P}, but with area ${r.A} it can reach ${perimetroMax(r.A)}: make each new square touch only one other.`, `El teu perímetre és ${P}, però amb àrea ${r.A} es pot arribar a ${perimetroMax(r.A)}: que cada casella nova en toqui només una.`)[l]
    if (r.tipo === 'min') return T(`Tu perímetro es ${P}, pero con área ${r.A} basta con ${perimetroMin(r.A)}: júntala en forma de cuadrado.`, `Your perimeter is ${P}, but with area ${r.A} you only need ${perimetroMin(r.A)}: pack it into a square shape.`, `El teu perímetre és ${P}, però amb àrea ${r.A} n’hi ha prou amb ${perimetroMin(r.A)}: ajunta-la en forma de quadrat.`)[l]
    return T(`El área está bien, pero tu perímetro es ${P} y se pedía ${r.P}.`, `The area is right, but your perimeter is ${P}; ${r.P} was needed.`, `L’àrea està bé, però el teu perímetre és ${P} i se’n demanava ${r.P}.`)[l]
  }
  return t[v.motivo][l]
}

export function schemaQuestion(r, l = 'es') {
  const A = area(r.ejemplo), P = perimetro(r.ejemplo)
  const q = enunciado(r)[l]
  const f = (a, p) => T(`Área ${a}, perímetro ${p}`, `Area ${a}, perimeter ${p}`, `Àrea ${a}, perímetre ${p}`)[l]
  return { question: q, correctAnswer: f(A, P), wrongAnswers: [f(A, P + 2), f(A + 1, P), f(A - 1, P + 2)] }
}
