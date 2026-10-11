// Ángulo Recto (matemáticas · trigonometría, 4.º de ESO y Bachillerato).
//
// Un triángulo rectángulo dibujado a escala, con el ángulo marcado unas veces
// en el vértice de abajo y otras en el de arriba: así el cateto opuesto no es
// siempre «el vertical», que es justo lo que se aprende mal.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   razon      sen, cos o tan como fracción de lados   (confundir opuesto y contiguo)
//   cual       qué razón relaciona los dos lados        (usar el seno «por defecto»)
//   pitagoras  el tercer lado                           (sumar los catetos)
//   notable    sen/cos/tan de 30°, 45° y 60°            (cruzar sen 30° con sen 60°)
//   lado       calcular un lado con calculadora          (multiplicar cuando hay que dividir)
//   angulo     calcular el ángulo (sen⁻¹, cos⁻¹, tan⁻¹)  (dar el complementario)
//   problema   escalera, sombra, cometa, rampa          (elegir mal la razón)
//
// Las medidas con decimales se guardan en décimas enteras (×10) para
// compararlas sin errores de coma flotante.

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es', dec = 1) => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: dec })

export const NIVELES = {
  facil:   { tipos: ['razon', 'razon', 'cual', 'pitagoras'] },
  medio:   { tipos: ['razon', 'cual', 'lado', 'lado', 'notable', 'pitagoras'] },
  dificil: { tipos: ['lado', 'angulo', 'angulo', 'problema', 'problema', 'notable'] },
}

const TERNAS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]
const ANGULOS = [20, 25, 30, 35, 40, 50, 55, 60, 65, 70]
const rad = d => (d * Math.PI) / 180
const grados = r => (r * 180) / Math.PI

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
function opciones(rand, bueno, candidatos, ok = v => v > 0) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null || (typeof c === 'number' && (!Number.isFinite(c) || !ok(c)))) continue
    if (vistos.has(c)) continue
    vistos.add(c); out.push(c)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

// ── El triángulo ──────────────────────────────────────────────────────────
// base (horizontal), alto (vertical) e hip. El ángulo marcado está abajo (entre
// la base y la hipotenusa) o arriba (entre el alto y la hipotenusa).
// Devuelve qué lado es el opuesto y cuál el contiguo para ese ángulo.
export function roles(vertice) {
  return vertice === 'abajo' ? { opuesto: 'alto', contiguo: 'base', hip: 'hip' } : { opuesto: 'base', contiguo: 'alto', hip: 'hip' }
}
const lado = (tri, rol) => tri[roles(tri.vertice)[rol]]

// Qué razón une dos roles.
export function razonDe(r1, r2) {
  const set = new Set([r1, r2])
  if (set.has('opuesto') && set.has('hip')) return 'sen'
  if (set.has('contiguo') && set.has('hip')) return 'cos'
  return 'tan'
}

export const RAZONES = { sen: T('Seno', 'Sine', 'Sinus'), cos: T('Coseno', 'Cosine', 'Cosinus'), tan: T('Tangente', 'Tangent', 'Tangent') }
const ABREV = { sen: { es: 'sen', en: 'sin', ca: 'sin' }, cos: { es: 'cos', en: 'cos', ca: 'cos' }, tan: { es: 'tan', en: 'tan', ca: 'tg' } }
export const abrev = (f, l) => ABREV[f][l] ?? ABREV[f].es

export const NOTABLES = {
  sen: { 30: '1/2', 45: '√2/2', 60: '√3/2' },
  cos: { 30: '√3/2', 45: '√2/2', 60: '1/2' },
  tan: { 30: '√3/3', 45: '1', 60: '√3' },
}

// Contextos de problema: qué lado se conoce, cuál se pide y dónde está el ángulo.
export const PROBLEMAS = {
  escalera: { emoji: '🏠', conocido: 'hip', pedido: 'opuesto', rango: [3, 10], angulos: [55, 60, 65, 70, 75],
    t: (L, a) => T(`Una escalera de ${L} m se apoya en una pared formando un ángulo de ${a}° con el suelo. ¿A qué altura llega?`, `A ${L} m ladder leans against a wall at an angle of ${a}° to the ground. How high up the wall does it reach?`, `Una escala de ${L} m es recolza en una paret formant un angle de ${a}° amb el terra. A quina alçada arriba?`) },
  sombra: { emoji: '🌳', conocido: 'contiguo', pedido: 'opuesto', rango: [4, 20], angulos: [25, 30, 35, 40, 50, 55, 60],
    t: (L, a) => T(`Un árbol proyecta una sombra de ${L} m cuando los rayos del sol llegan con una inclinación de ${a}°. ¿Cuánto mide el árbol?`, `A tree casts a shadow ${L} m long when the sun’s rays come in at ${a}°. How tall is the tree?`, `Un arbre fa una ombra de ${L} m quan els raigs del sol arriben amb una inclinació de ${a}°. Quant fa l’arbre?`) },
  cometa: { emoji: '🌬️', conocido: 'hip', pedido: 'opuesto', rango: [20, 60], angulos: [30, 35, 40, 45, 50, 55, 60],
    t: (L, a) => T(`Una cometa está atada a una cuerda tensa de ${L} m que forma ${a}° con el suelo. ¿A qué altura vuela?`, `A kite is on a taut string ${L} m long at ${a}° to the ground. How high is it flying?`, `Un estel està lligat a una corda tensa de ${L} m que forma ${a}° amb el terra. A quina alçada vola?`) },
  rampa: { emoji: '♿', conocido: 'hip', pedido: 'opuesto', rango: [4, 12], angulos: [5, 6, 8, 10, 12, 15],
    t: (L, a) => T(`Una rampa de ${L} m de largo sube con una inclinación de ${a}°. ¿Qué altura salva?`, `A ramp ${L} m long rises at an angle of ${a}°. How much height does it gain?`, `Una rampa de ${L} m de llarg puja amb una inclinació de ${a}°. Quina alçada salva?`) },
}

// Medidas de un triángulo con el ángulo `a` (grados) en `vertice` y un lado conocido.
function triangulo(a, vertice, rolConocido, valor) {
  const r = rad(a)
  let opuesto, contiguo, hip
  if (rolConocido === 'hip') { hip = valor; opuesto = hip * Math.sin(r); contiguo = hip * Math.cos(r) }
  else if (rolConocido === 'contiguo') { contiguo = valor; opuesto = contiguo * Math.tan(r); hip = contiguo / Math.cos(r) }
  else { opuesto = valor; contiguo = opuesto / Math.tan(r); hip = opuesto / Math.sin(r) }
  const R = roles(vertice)
  const t = { vertice, angulo: a, hip }
  t[R.opuesto] = opuesto
  t[R.contiguo] = contiguo
  return t
}

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const vertice = rand() < 0.5 ? 'abajo' : 'arriba'
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'razon') {
      const [p, q, h] = elige(rand, TERNAS)
      const k = elige(rand, [1, 1, 2])
      // base y alto en cualquier orden: el triángulo no siempre es «tumbado».
      const [b, al] = rand() < 0.5 ? [p * k, q * k] : [q * k, p * k]
      const tri = { vertice, base: b, alto: al, hip: h * k, angulo: Math.round(grados(Math.atan2(vertice === 'abajo' ? al : b, vertice === 'abajo' ? b : al))) }
      const f = elige(rand, ['sen', 'cos', 'tan'])
      const op = lado(tri, 'opuesto'), co = lado(tri, 'contiguo'), hi = tri.hip
      const frac = (n, d) => `${n}/${d}`
      const bueno = { sen: frac(op, hi), cos: frac(co, hi), tan: frac(op, co) }[f]
      const ops = opciones(rand, bueno, baraja(rand, [frac(op, hi), frac(co, hi), frac(op, co), frac(co, op), frac(hi, op)]))
      if (!ops) continue
      return { ...base, tri, f, etiquetas: { base: 'v', alto: 'v', hip: 'v' }, bueno, opciones: ops }
    }

    if (tipo === 'cual') {
      const a = elige(rand, ANGULOS)
      const [conocido, pedido] = baraja(rand, ['opuesto', 'contiguo', 'hip']).slice(0, 2)
      const valor = entre(rand, 4, 20)
      const tri = triangulo(a, vertice, conocido, valor)
      const R = roles(vertice)
      const etiquetas = { base: null, alto: null, hip: null }
      etiquetas[R[conocido]] = 'v'
      etiquetas[R[pedido]] = 'x'
      return { ...base, tri, conocido, pedido, valor, etiquetas, bueno: razonDe(conocido, pedido), opciones: ['sen', 'cos', 'tan'] }
    }

    if (tipo === 'pitagoras') {
      const [p, q, h] = elige(rand, TERNAS)
      const k = elige(rand, [1, 2, 3])
      const [b, al] = rand() < 0.5 ? [p * k, q * k] : [q * k, p * k]
      const tri = { vertice: null, base: b, alto: al, hip: h * k, angulo: null }
      const falta = elige(rand, ['hip', 'base', 'alto'])
      const etiquetas = { base: 'v', alto: 'v', hip: 'v' }
      etiquetas[falta] = 'x'
      const bueno = tri[falta]
      const otros = ['base', 'alto', 'hip'].filter(x => x !== falta).map(x => tri[x])
      const cands = falta === 'hip'
        ? [otros[0] + otros[1], Math.abs(otros[1] - otros[0]), bueno + k, bueno - k]
        : [Math.round(Math.sqrt(otros[0] ** 2 + otros[1] ** 2)), otros[1] - otros[0], bueno + k, bueno - k, otros[0] + otros[1]]
      const ops = opciones(rand, bueno, cands.map(Math.abs))
      if (!ops) continue
      return { ...base, tri, falta, etiquetas, bueno, opciones: ops }
    }

    if (tipo === 'notable') {
      const a = elige(rand, [30, 45, 60])
      const f = elige(rand, ['sen', 'cos', 'tan'])
      const bueno = NOTABLES[f][a]
      const pool = ['1/2', '√2/2', '√3/2', '√3/3', '√3', '1', '2']
      const ops = opciones(rand, bueno, baraja(rand, pool))
      if (!ops) continue
      const tri = triangulo(a, 'abajo', 'hip', 10)
      return { ...base, tri, a, f, etiquetas: { base: null, alto: null, hip: null }, bueno, opciones: ops }
    }

    if (tipo === 'lado') {
      const a = elige(rand, ANGULOS)
      const [conocido, pedido] = baraja(rand, ['opuesto', 'contiguo', 'hip']).slice(0, 2)
      const valor = entre(rand, 4, 20)
      const tri = triangulo(a, vertice, conocido, valor)
      const R = roles(vertice)
      const x = tri[R[pedido]]
      const bueno = Math.round(x * 10)
      // Con la razón equivocada o la operación al revés.
      const r = rad(a)
      const malos = [
        valor * Math.sin(r), valor * Math.cos(r), valor * Math.tan(r),
        valor / Math.sin(r), valor / Math.cos(r), valor / Math.tan(r),
        valor * Math.sin(rad(90 - a)),
      ].map(v => Math.round(v * 10))
      const ops = opciones(rand, bueno, baraja(rand, malos).filter(v => v !== bueno))
      if (!ops || bueno < 5 || bueno > 999) continue
      const etiquetas = { base: null, alto: null, hip: null }
      etiquetas[R[conocido]] = 'v'
      etiquetas[R[pedido]] = 'x'
      return { ...base, tri, conocido, pedido, valor, etiquetas, bueno, opciones: ops }
    }

    if (tipo === 'angulo') {
      // Dos lados enteros; el ángulo, en grados redondeados.
      const [r1, r2] = baraja(rand, ['opuesto', 'contiguo', 'hip']).slice(0, 2)
      let v1 = entre(rand, 3, 20), v2 = entre(rand, 3, 20)
      // La hipotenusa siempre es el lado más largo.
      if (r1 === 'hip' && v1 <= v2) v1 = v2 + entre(rand, 1, 6)
      if (r2 === 'hip' && v2 <= v1) v2 = v1 + entre(rand, 1, 6)
      const vals = { [r1]: v1, [r2]: v2 }
      const f = razonDe(r1, r2)
      const ang = f === 'sen' ? Math.asin(vals.opuesto / vals.hip) : f === 'cos' ? Math.acos(vals.contiguo / vals.hip) : Math.atan(vals.opuesto / vals.contiguo)
      const g = Math.round(grados(ang))
      if (g < 10 || g > 80 || g === 45) continue
      const tri = triangulo(grados(ang), vertice, r1, v1)
      const R = roles(vertice)
      const etiquetas = { base: null, alto: null, hip: null }
      etiquetas[R[r1]] = 'v'
      etiquetas[R[r2]] = 'v'
      const cociente = f === 'sen' ? vals.opuesto / vals.hip : f === 'cos' ? vals.contiguo / vals.hip : vals.opuesto / vals.contiguo
      const otraFn = f === 'tan' ? Math.atan(1 / cociente) : f === 'sen' ? Math.acos(cociente) : Math.asin(cociente)
      const ops = opciones(rand, g, [90 - g, Math.round(grados(otraFn)), g + 10, g - 10, Math.round(cociente * 100)], v => v > 0 && v < 90)
      if (!ops) continue
      return { ...base, tri: { ...tri, angulo: g }, roles2: [r1, r2], vals, f, etiquetas, bueno: g, opciones: ops }
    }

    // problema
    const pId = elige(rand, Object.keys(PROBLEMAS))
    const P = PROBLEMAS[pId]
    const a = elige(rand, P.angulos)
    const L = entre(rand, P.rango[0], P.rango[1])
    const tri = triangulo(a, 'abajo', P.conocido, L)
    const R = roles('abajo')
    const bueno = Math.round(tri[R[P.pedido]] * 10)
    const r = rad(a)
    const malos = [L * Math.sin(r), L * Math.cos(r), L * Math.tan(r), L / Math.tan(r), L / Math.sin(r), L / Math.cos(r)].map(v => Math.round(v * 10))
    const ops = opciones(rand, bueno, baraja(rand, malos).filter(v => v !== bueno))
    if (!ops) continue
    const etiquetas = { base: null, alto: null, hip: null }
    etiquetas[R[P.conocido]] = 'v'
    etiquetas[R[P.pedido]] = 'x'
    return { ...base, problema: pId, L, tri, conocido: P.conocido, pedido: P.pedido, valor: L, etiquetas, bueno, opciones: ops }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export const NOMBRE_ROL = {
  opuesto: T('cateto opuesto', 'opposite side', 'catet oposat'),
  contiguo: T('cateto contiguo', 'adjacent side', 'catet contigu'),
  hip: T('hipotenusa', 'hypotenuse', 'hipotenusa'),
}
const rol = (x, l) => tx(NOMBRE_ROL[x], l)
// Con artículo: «la hipotenusa», «el cateto opuesto».
const ART = { es: { opuesto: 'el', contiguo: 'el', hip: 'la' }, ca: { opuesto: 'el', contiguo: 'el', hip: 'la' }, en: { opuesto: 'the', contiguo: 'the', hip: 'the' } }
const conArt = (x, l) => `${(ART[l] ?? ART.es)[x]} ${rol(x, l)}`
const dec = (v, l) => num(v / 10, l)

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'cual': return tx(RAZONES[o], l)
    case 'razon': case 'notable': return o
    case 'pitagoras': return num(o, l)
    case 'angulo': return `${o}°`
    case 'problema': return `${dec(o, l)} m`
    default: return dec(o, l)
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'razon': return s(l, `¿Cuánto vale ${abrev(r.f, l)} α?`, `What is ${abrev(r.f, l)} α?`, `Quant val ${abrev(r.f, l)} α?`)
    case 'cual': return s(l, `Conoces un lado y quieres el lado x. ¿Qué razón de α los relaciona?`, `You know one side and want side x. Which ratio of α links them?`, `Coneixes un costat i vols el costat x. Quina raó d’α els relaciona?`)
    case 'pitagoras': return s(l, '¿Cuánto mide el lado x?', 'How long is side x?', 'Quant fa el costat x?')
    case 'notable': return s(l, `¿Cuánto vale ${abrev(r.f, l)} ${r.a}°?`, `What is ${abrev(r.f, l)} ${r.a}°?`, `Quant val ${abrev(r.f, l)} ${r.a}°?`)
    case 'lado': return s(l, `¿Cuánto mide x? (redondea a una décima)`, `How long is x? (round to one decimal place)`, `Quant fa x? (arrodoneix a una dècima)`)
    case 'angulo': return s(l, '¿Cuánto mide el ángulo α? (redondea a grados)', 'What is angle α? (round to the nearest degree)', 'Quant fa l’angle α? (arrodoneix a graus)')
    default: return tx(PROBLEMAS[r.problema].t(r.L, r.tri.angulo), l)
  }
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'razon': {
      const def = { sen: s(l, 'opuesto ÷ hipotenusa', 'opposite ÷ hypotenuse', 'oposat ÷ hipotenusa'), cos: s(l, 'contiguo ÷ hipotenusa', 'adjacent ÷ hypotenuse', 'contigu ÷ hipotenusa'), tan: s(l, 'opuesto ÷ contiguo', 'opposite ÷ adjacent', 'oposat ÷ contigu') }[r.f]
      const op = lado(r.tri, 'opuesto'), co = lado(r.tri, 'contiguo')
      return s(l,
        `${abrev(r.f, l)} α = ${def} = ${r.bueno}. Para el ángulo α, el cateto opuesto es el que está enfrente (${op}) y el contiguo, el que lo toca sin ser la hipotenusa (${co}). Si α estuviera en el otro vértice, se intercambiarían.`,
        `${abrev(r.f, l)} α = ${def} = ${r.bueno}. For angle α, the opposite side is the one facing it (${op}) and the adjacent side is the one touching it that is not the hypotenuse (${co}). If α were at the other corner, they would swap.`,
        `${abrev(r.f, l)} α = ${def} = ${r.bueno}. Per a l’angle α, el catet oposat és el que hi ha al davant (${op}) i el contigu, el que el toca sense ser la hipotenusa (${co}). Si α fos a l’altre vèrtex, s’intercanviarien.`)
    }
    case 'cual': return s(l,
      `Tienes ${conArt(r.conocido, l)} y buscas ${conArt(r.pedido, l)}: la razón que une esos dos es ${tx(RAZONES[r.bueno], l).toLowerCase()}. Seno = opuesto/hipotenusa; coseno = contiguo/hipotenusa; tangente = opuesto/contiguo.`,
      `You have ${conArt(r.conocido, l)} and want ${conArt(r.pedido, l)}: the ratio linking those two is ${tx(RAZONES[r.bueno], l).toLowerCase()}. Sine = opposite/hypotenuse; cosine = adjacent/hypotenuse; tangent = opposite/adjacent.`,
      `Tens ${conArt(r.conocido, l)} i busques ${conArt(r.pedido, l)}: la raó que uneix aquests dos és ${tx(RAZONES[r.bueno], l).toLowerCase()}. Sinus = oposat/hipotenusa; cosinus = contigu/hipotenusa; tangent = oposat/contigu.`)
    case 'pitagoras': {
      const { base: b, alto: a, hip: h } = r.tri
      return r.falta === 'hip'
        ? s(l, `Pitágoras: hipotenusa² = cateto² + cateto². x² = ${b}² + ${a}² = ${b * b + a * a}, x = ${h}. Sumar los catetos (${b + a}) es el error típico.`, `Pythagoras: hypotenuse² = leg² + leg². x² = ${b}² + ${a}² = ${b * b + a * a}, x = ${h}. Adding the legs (${b + a}) is the usual mistake.`, `Pitàgores: hipotenusa² = catet² + catet². x² = ${b}² + ${a}² = ${b * b + a * a}, x = ${h}. Sumar els catets (${b + a}) és l’error típic.`)
        : s(l, `Falta un cateto, así que se resta: x² = ${h}² − ${r.falta === 'base' ? a : b}² = ${h * h - (r.falta === 'base' ? a : b) ** 2}, x = ${r.bueno}.`, `A leg is missing, so subtract: x² = ${h}² − ${r.falta === 'base' ? a : b}² = ${h * h - (r.falta === 'base' ? a : b) ** 2}, x = ${r.bueno}.`, `Falta un catet, així que es resta: x² = ${h}² − ${r.falta === 'base' ? a : b}² = ${h * h - (r.falta === 'base' ? a : b) ** 2}, x = ${r.bueno}.`)
    }
    case 'notable': return s(l,
      `Tabla de ángulos notables: sen 30° = cos 60° = 1/2; sen 45° = cos 45° = √2/2; sen 60° = cos 30° = √3/2; tan 30° = √3/3, tan 45° = 1, tan 60° = √3. El seno de un ángulo es el coseno de su complementario.`,
      `Special angles table: sin 30° = cos 60° = 1/2; sin 45° = cos 45° = √2/2; sin 60° = cos 30° = √3/2; tan 30° = √3/3, tan 45° = 1, tan 60° = √3. The sine of an angle is the cosine of its complement.`,
      `Taula d’angles notables: sin 30° = cos 60° = 1/2; sin 45° = cos 45° = √2/2; sin 60° = cos 30° = √3/2; tg 30° = √3/3, tg 45° = 1, tg 60° = √3. El sinus d’un angle és el cosinus del seu complementari.`)
    case 'lado': case 'problema': {
      const f = razonDe(r.conocido, r.pedido)
      const a = r.tri.angulo
      // ¿El pedido va arriba (multiplicar) o abajo (dividir) en la razón?
      const arriba = (f === 'sen' && r.pedido === 'opuesto') || (f === 'cos' && r.pedido === 'contiguo') || (f === 'tan' && r.pedido === 'opuesto')
      const cuenta = arriba ? `x = ${num(r.valor, l)} · ${abrev(f, l)} ${a}°` : `x = ${num(r.valor, l)} ÷ ${abrev(f, l)} ${a}°`
      return s(l,
        `Se conoce ${conArt(r.conocido, l)} y se busca ${conArt(r.pedido, l)}: los une ${tx(RAZONES[f], l).toLowerCase()}. ${cuenta} ≈ ${dec(r.bueno, l)}.`,
        `You know ${conArt(r.conocido, l)} and want ${conArt(r.pedido, l)}: they are linked by ${tx(RAZONES[f], l).toLowerCase()}. ${cuenta} ≈ ${dec(r.bueno, l)}.`,
        `Es coneix ${conArt(r.conocido, l)} i es busca ${conArt(r.pedido, l)}: els uneix ${tx(RAZONES[f], l).toLowerCase()}. ${cuenta} ≈ ${dec(r.bueno, l)}.`)
    }
    default: {
      const [r1, r2] = r.roles2
      const inv = `${abrev(r.f, l)}⁻¹`
      const q = r.f === 'sen' ? `${r.vals.opuesto}/${r.vals.hip}` : r.f === 'cos' ? `${r.vals.contiguo}/${r.vals.hip}` : `${r.vals.opuesto}/${r.vals.contiguo}`
      return s(l,
        `Tienes ${conArt(r1, l)} y ${conArt(r2, l)}: usa ${tx(RAZONES[r.f], l).toLowerCase()}. ${abrev(r.f, l)} α = ${q}, así que α = ${inv}(${q}) ≈ ${r.bueno}°. El complementario, ${90 - r.bueno}°, es el otro ángulo agudo.`,
        `You have ${conArt(r1, l)} and ${conArt(r2, l)}: use ${tx(RAZONES[r.f], l).toLowerCase()}. ${abrev(r.f, l)} α = ${q}, so α = ${inv}(${q}) ≈ ${r.bueno}°. Its complement, ${90 - r.bueno}°, is the other acute angle.`,
        `Tens ${conArt(r1, l)} i ${conArt(r2, l)}: fes servir ${tx(RAZONES[r.f], l).toLowerCase()}. ${abrev(r.f, l)} α = ${q}, així que α = ${inv}(${q}) ≈ ${r.bueno}°. El complementari, ${90 - r.bueno}°, és l’altre angle agut.`)
    }
  }
}

export function schemaQuestion(r, l) {
  const { base: b, alto: a, hip: h } = r.tri
  const lados = r.tipo === 'razon' || r.tipo === 'pitagoras'
    ? s(l, ` Catetos ${num(b, l)} y ${num(a, l)}, hipotenusa ${num(h, l)}.`, ` Legs ${num(b, l)} and ${num(a, l)}, hypotenuse ${num(h, l)}.`, ` Catets ${num(b, l)} i ${num(a, l)}, hipotenusa ${num(h, l)}.`)
    : ''
  return {
    question: enunciado(r, l) + (r.tipo === 'pitagoras' || r.tipo === 'problema' || r.tipo === 'notable' ? '' : lados),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// Texto de cada lado en el dibujo: el valor, «x» o nada.
export function etiquetaLado(r, ladoId, revelado, l) {
  const e = r.etiquetas[ladoId]
  if (!e) return null
  const v = r.tri[ladoId]
  if (e === 'x') {
    if (!revelado || r.tipo === 'cual') return 'x'
    if (r.tipo === 'pitagoras') return num(r.bueno, l)
    return dec(r.bueno, l)
  }
  if (r.tipo === 'lado' || r.tipo === 'problema' || r.tipo === 'cual') return num(r.valor ?? Math.round(v), l)
  return num(v, l)
}
