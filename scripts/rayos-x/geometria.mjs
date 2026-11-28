// Geometría de máscaras para Rayos X: de una imagen de etiquetas (un número
// por píxel) a zonas de toque vectoriales. Sin dependencias.
//
//   crecer()     reparte el fondo cercano entre las piezas vecinas (toque generoso
//                sin que dos zonas se pisen: cada píxel es de UNA pieza)
//   rellenar()   tapa los huecos de fondo encerrados por una sola pieza
//   contornos()  marching squares → lazos cerrados (relleno evenodd)
//   simplificar() Ramer–Douglas–Peucker sobre un lazo cerrado
//   polos()      el punto más interior de cada trozo (para probar clics)

const N8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
const N4 = N8.slice(0, 4)

// lab: Int16Array W*H con >0 = pieza, -1 = arte neutro, 0 = fondo.
// Crece las piezas sobre el fondo hasta `radio` px (anillos alternando 4/8
// vecinos ≈ distancia octogonal). El arte neutro no se toca: frena el
// crecimiento, así tocar la mano no cuenta como muñeca.
export function crecer(lab, W, H, radio) {
  let frente = []
  for (let i = 0; i < lab.length; i++) if (lab[i] > 0) frente.push(i)
  for (let r = 1; r <= radio; r++) {
    const vec = r % 2 ? N4 : N8
    const nuevo = []
    const asign = new Map()
    for (const i of frente) {
      const x = i % W, y = (i / W) | 0
      for (const [dx, dy] of vec) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const j = ny * W + nx
        if (lab[j] !== 0 || asign.has(j)) continue
        asign.set(j, lab[i])
      }
    }
    for (const [j, v] of asign) { lab[j] = v; nuevo.push(j) }
    // los que no crecieron en anillo 4 pueden hacerlo en el 8 siguiente
    frente = r % 2 ? frente.concat(nuevo) : nuevo
    if (r % 2 === 0) frente = nuevo
  }
  return lab
}

// Las líneas finas del dibujo (contornos, fibras) entre dos trozos de la MISMA
// pieza pasan a esa pieza: así el recto del abdomen o el cuádriceps no quedan
// partidos por sus propias rayas. Solo arte neutro (-1), hasta `t` px a cada lado.
export function absorberLineas(lab, W, H, t = 3) {
  const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]]
  const cambios = []
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x
    if (lab[i] !== -1) continue
    for (const [dx, dy] of dirs) {
      let a = 0, b = 0
      for (let s = 1; s <= t && !a; s++) { const nx = x - dx * s, ny = y - dy * s; if (nx < 0 || ny < 0 || nx >= W || ny >= H) break; const v = lab[ny * W + nx]; if (v > 0) a = v; else if (v === 0) break }
      for (let s = 1; s <= t && !b; s++) { const nx = x + dx * s, ny = y + dy * s; if (nx < 0 || ny < 0 || nx >= W || ny >= H) break; const v = lab[ny * W + nx]; if (v > 0) b = v; else if (v === 0) break }
      if (a && a === b) { cambios.push([i, a]); break }
    }
  }
  for (const [i, v] of cambios) lab[i] = v
  return lab
}

// Componentes conexos (4-vecinos) de los píxeles que cumplen `f`.
export function componentes(W, H, f) {
  const comp = new Int32Array(W * H).fill(-1)
  const lista = []
  const pila = []
  for (let i = 0; i < W * H; i++) {
    if (comp[i] !== -1 || !f(i)) continue
    const id = lista.length
    const pix = []
    comp[i] = id; pila.push(i)
    while (pila.length) {
      const k = pila.pop(); pix.push(k)
      const x = k % W, y = (k / W) | 0
      for (const [dx, dy] of N4) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const j = ny * W + nx
        if (comp[j] === -1 && f(j)) { comp[j] = id; pila.push(j) }
      }
    }
    lista.push(pix)
  }
  return { comp, lista }
}

// Huecos de fondo (0) que no tocan el borde y solo lindan con UNA pieza → de esa pieza.
export function rellenar(lab, W, H, maxArea = Infinity) {
  const { lista } = componentes(W, H, i => lab[i] === 0)
  for (const pix of lista) {
    if (pix.length > maxArea) continue
    let borde = false
    const vecinos = new Set()
    for (const k of pix) {
      const x = k % W, y = (k / W) | 0
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) { borde = true; break }
      for (const [dx, dy] of N4) { const v = lab[(y + dy) * W + x + dx]; if (v !== 0) vecinos.add(v) }
    }
    if (borde || vecinos.size !== 1) continue
    const [v] = vecinos
    if (v > 0) for (const k of pix) lab[k] = v
  }
  return lab
}

// Marching squares de la máscara binaria m (Uint8Array W*H) → lazos de puntos
// en coordenadas de píxel (el píxel i ocupa [i, i+1]).
export function contornos(m, W, H) {
  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : m[y * W + x])
  const OFF = 4
  const clave = (X, Y) => (X + OFF) * 100000 + (Y + OFF)
  const adj = new Map()
  const une = (a, b) => {
    if (!adj.has(a)) adj.set(a, []); if (!adj.has(b)) adj.set(b, [])
    adj.get(a).push(b); adj.get(b).push(a)
  }
  for (let y = -1; y < H; y++) for (let x = -1; x < W; x++) {
    const c = at(x, y) * 8 + at(x + 1, y) * 4 + at(x + 1, y + 1) * 2 + at(x, y + 1)
    if (c === 0 || c === 15) continue
    const T = clave(2 * x + 1, 2 * y), R = clave(2 * x + 2, 2 * y + 1), B = clave(2 * x + 1, 2 * y + 2), L = clave(2 * x, 2 * y + 1)
    switch (c) {
      case 1: une(L, B); break
      case 2: une(B, R); break
      case 3: une(L, R); break
      case 4: une(T, R); break
      case 5: une(T, R); une(L, B); break
      case 6: une(T, B); break
      case 7: une(T, L); break
      case 8: une(T, L); break
      case 9: une(T, B); break
      case 10: une(T, L); une(B, R); break
      case 11: une(T, R); break
      case 12: une(L, R); break
      case 13: une(R, B); break
      case 14: une(L, B); break
    }
  }
  const visto = new Set()
  const lazos = []
  for (const ini of adj.keys()) {
    if (visto.has(ini)) continue
    const lazo = []
    let prev = null, cur = ini
    while (cur !== undefined && !visto.has(cur)) {
      visto.add(cur)
      const X = Math.floor(cur / 100000) - OFF, Y = (cur % 100000) - OFF
      lazo.push([X / 2 + 0.5, Y / 2 + 0.5])
      const [a, b] = adj.get(cur)
      const sig = a !== prev && !visto.has(a) ? a : (b !== prev && !visto.has(b) ? b : undefined)
      prev = cur; cur = sig
    }
    if (lazo.length >= 3) lazos.push(lazo)
  }
  return lazos
}

function rdp(pts, eps) {
  if (pts.length < 3) return pts
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1
  const pila = [[0, pts.length - 1]]
  while (pila.length) {
    const [a, b] = pila.pop()
    const [x1, y1] = pts[a], [x2, y2] = pts[b]
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1
    let dmax = 0, imax = -1
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / L
      if (d > dmax) { dmax = d; imax = i }
    }
    if (dmax > eps) { keep[imax] = 1; pila.push([a, imax], [imax, b]) }
  }
  return pts.filter((_, i) => keep[i])
}

// Lazo cerrado: se corta por el punto más lejano al primero y se simplifica cada mitad.
export function simplificar(lazo, eps) {
  if (lazo.length < 8) return lazo
  let far = 0, dmax = -1
  for (let i = 0; i < lazo.length; i++) { const d = Math.hypot(lazo[i][0] - lazo[0][0], lazo[i][1] - lazo[0][1]); if (d > dmax) { dmax = d; far = i } }
  const a = rdp(lazo.slice(0, far + 1), eps)
  const b = rdp(lazo.slice(far).concat([lazo[0]]), eps)
  return a.slice(0, -1).concat(b.slice(0, -1))
}

export const aPath = (lazos, k = 1) => lazos.map(l => 'M' + l.map(([x, y]) => `${+(x * k).toFixed(1)} ${+(y * k).toFixed(1)}`).join('L') + 'Z').join('')

// Para cada trozo conexo de la máscara: el píxel más alejado del borde
// (distancia de chaflán 1/√2 por dos pasadas) → [x, y, distancia].
export function polos(m, W, H) {
  const D = new Float32Array(W * H)
  for (let i = 0; i < W * H; i++) D[i] = m[i] ? 1e9 : 0
  const S = Math.SQRT2
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!D[i]) continue
    let d = D[i]
    if (x > 0) d = Math.min(d, D[i - 1] + 1); else d = Math.min(d, 1)
    if (y > 0) d = Math.min(d, D[i - W] + 1); else d = Math.min(d, 1)
    if (x > 0 && y > 0) d = Math.min(d, D[i - W - 1] + S)
    if (x < W - 1 && y > 0) d = Math.min(d, D[i - W + 1] + S)
    D[i] = d
  }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x; if (!D[i]) continue
    let d = D[i]
    if (x < W - 1) d = Math.min(d, D[i + 1] + 1); else d = Math.min(d, 1)
    if (y < H - 1) d = Math.min(d, D[i + W] + 1); else d = Math.min(d, 1)
    if (x < W - 1 && y < H - 1) d = Math.min(d, D[i + W + 1] + S)
    if (x > 0 && y < H - 1) d = Math.min(d, D[i + W - 1] + S)
    D[i] = d
  }
  const { lista } = componentes(W, H, i => m[i] === 1)
  return lista.map(pix => {
    let best = pix[0]
    for (const k of pix) if (D[k] > D[best]) best = k
    return { x: (best % W) + 0.5, y: ((best / W) | 0) + 0.5, d: D[best], area: pix.length }
  })
}
