// ── Motor de Salta la Recta ──────────────────────────────────────────────
// Generación de rondas para el juego (src/pages/SaltaRecta.jsx) y su examen
// (src/pages/SaltaRectaExamen.jsx) — misma fuente, para que "saltar +4" o
// "adivina qué operación fue" signifiquen exactamente lo mismo en los dos.

export const RANGOS = {
  facil:   { rango: 10, magMax: 6,  dobleSigno: 0 },
  medio:   { rango: 15, magMax: 9,  dobleSigno: 0.3 },
  dificil: { rango: 20, magMax: 12, dobleSigno: 0.6 },
}

export function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// Texto de una operación de valor d. A veces con doble signo (equivalente,
// pero hay que aplicar la regla de signos para leerlo: −(−n) = +n).
export function textoOperacion(d, conDobleSigno) {
  if (!conDobleSigno) return d >= 0 ? `+${d}` : `−${Math.abs(d)}`
  return d >= 0 ? `−(−${d})` : `+(−${Math.abs(d)})`
}

export function generarBase(dif) {
  const min = -dif.rango, max = dif.rango
  const S = rng(min + dif.magMax, max - dif.magMax) // deja hueco para que el salto quepa
  const mag = rng(1, dif.magMax)
  const d = pick([1, -1]) * mag
  const conDobleSigno = Math.random() < dif.dobleSigno
  return { S, d, min, max, conDobleSigno }
}

export function candidatosSalta(S, d, min, max) {
  const correcto = S + d
  const salto = Math.max(1, Math.round(Math.abs(d) * 0.4))
  const posibles = [S - d, correcto + salto, correcto - salto, S, correcto + 1, correcto - 1]
  const candidatos = new Set([correcto])
  for (const c of posibles) {
    if (candidatos.size >= 4) break
    if (c >= min && c <= max && !candidatos.has(c)) candidatos.add(c)
  }
  let bump = 2
  while (candidatos.size < 4) {
    const up = correcto + bump, down = correcto - bump
    if (up <= max && !candidatos.has(up)) candidatos.add(up)
    else if (down >= min && !candidatos.has(down)) candidatos.add(down)
    bump++
  }
  return [...candidatos].sort((a, b) => a - b)
}

export function opcionesAdivina(d, magMax, conDobleSigno) {
  const candidatos = new Set([d])
  const posibles = [-d, d + Math.max(1, Math.round(magMax * 0.3)), d - Math.max(1, Math.round(magMax * 0.3))]
  for (const c of posibles) {
    if (candidatos.size >= 4 || c === 0) continue
    candidatos.add(c)
  }
  let bump = 2
  while (candidatos.size < 4) {
    const c = d + bump
    if (c !== 0 && !candidatos.has(c)) candidatos.add(c)
    else { const c2 = d - bump; if (c2 !== 0 && !candidatos.has(c2)) candidatos.add(c2) }
    bump++
  }
  const valores = [...candidatos]
  // mismo estilo (doble signo o no) para las 4 opciones, si no se notaría cuál es la rara
  const opciones = valores.map(v => ({ valor: v, texto: textoOperacion(v, conDobleSigno) }))
  for (let i = opciones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[opciones[i], opciones[j]] = [opciones[j], opciones[i]]
  }
  return opciones
}

export function generarRonda(dif) {
  const tipo = pick(['salta', 'adivina'])
  const { S, d, min, max, conDobleSigno } = generarBase(dif)
  const E = S + d
  if (tipo === 'salta') {
    return { tipo, S, d, E, min, max, conDobleSigno, opTexto: textoOperacion(d, conDobleSigno), candidatos: candidatosSalta(S, d, min, max) }
  }
  return { tipo, S, d, E, min, max, conDobleSigno, opciones: opcionesAdivina(d, dif.magMax, conDobleSigno) }
}
