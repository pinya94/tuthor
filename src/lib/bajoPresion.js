// Bajo Presión (química · leyes de los gases, 3.º-4.º de ESO y 1.º de Bachillerato).
//
// Un gas en un cilindro con émbolo pasa de un estado a otro; se da todo menos
// una magnitud y hay que ajustarla con − / + (la presión en el manómetro, el
// volumen con el émbolo o la temperatura en el termómetro).
//   boyle      T constante: P₁·V₁ = P₂·V₂
//   charles    P constante: V₁/T₁ = V₂/T₂
//   gay        V constante: P₁/T₁ = P₂/T₂
//   combinada  P₁·V₁/T₁ = P₂·V₂/T₂
//   ideal      P·V = n·R·T, R = 0,082 atm·L/(mol·K)
// La temperatura en las fórmulas va SIEMPRE en kelvin; en medio y difícil el
// enunciado la da a veces en °C (la trampa de clase).
//
// Respuesta: `V:45` = magnitud y valor ×10 (4,5 L). Los datos se eligen para
// que la solución sea exacta a la décima (en el gas ideal, se redondea a la
// décima y se descartan los casos que caen cerca de la mitad).

const s = (l, es, en, ca) => ({ es, en, ca })[l] ?? es
export const R = 0.082

export const NIVELES = {
  facil: { tipos: ['boyle', 'boyle', 'charles', 'gay'], celsius: false, pideT: false },
  medio: { tipos: ['boyle', 'charles', 'charles', 'gay', 'gay', 'combinada'], celsius: true, pideT: true },
  dificil: { tipos: ['combinada', 'combinada', 'ideal', 'ideal', 'charles', 'boyle'], celsius: true, pideT: true },
}

// Temperaturas «redondas» en kelvin y en Celsius a la vez (300 K = 27 °C)
const TEMPS = [200, 250, 300, 350, 400, 450, 500, 600]
const P_IN = [1, 2, 3, 4, 6]
const V_IN = [2, 3, 4, 5, 6, 8, 10, 12]

let seq = 0
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const decima = x => Math.abs(x * 10 - Math.round(x * 10)) < 1e-6
const r1 = x => Math.round(x * 10) / 10
const recientes = []
function nuevo(clave) {
  if (recientes.includes(clave)) return false
  recientes.push(clave)
  if (recientes.length > 10) recientes.shift()
  return true
}

export const UNIDAD = { P: 'atm', V: 'L', T: 'K', n: 'mol' }
export const PASOS = { P: [1, 0.1], V: [1, 0.1], T: [100, 10] }
export const respuesta = (mag, x) => `${mag}:${Math.round(x * 10)}`
export const leeRespuesta = x => {
  const m = /^([PVT]):(-?\d+)$/.exec(x ?? '')
  return m ? { mag: m[1], v: Number(m[2]) / 10 } : null
}

// r.a = estado 1, r.b = estado 2 ({P, V, T}); r.pide = magnitud que falta en b.
// En «ideal» solo hay un estado (r.a con n) y r.pide es P o V.
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo, celsius: cfg.celsius && tipo !== 'boyle' && rand() < 0.6 }
    if (tipo === 'ideal') {
      const n = elige(rand, [0.5, 1, 2, 3, 4])
      const T = elige(rand, [273, 300, 350, 400, 500])
      const pide = rand() < 0.5 ? 'P' : 'V'
      const dato = pide === 'P' ? elige(rand, [5, 10, 20, 22.4, 25, 40]) : elige(rand, [1, 2, 3, 4, 5])
      const x = (n * R * T) / dato
      // lejos de la mitad entre dos décimas, para que redondear no sea discutible
      if (Math.abs(x * 10 - Math.round(x * 10)) > 0.3 || x > 60 || x < 0.3) continue
      const a = { n, T, P: pide === 'P' ? r1(x) : dato, V: pide === 'V' ? r1(x) : dato }
      if (!nuevo(`ideal${n}${T}${dato}${pide}`)) continue
      return { ...base, celsius: base.celsius && T !== 273 ? true : base.celsius, a, pide, bueno: respuesta(pide, a[pide]), exacto: x }
    }
    const a = { P: elige(rand, P_IN), V: elige(rand, V_IN), T: elige(rand, TEMPS) }
    const b = { ...a }
    let pide
    if (tipo === 'boyle') {
      const f = elige(rand, nivel === 'facil' ? [2, 3, 0.5] : [2, 3, 4, 0.5, 0.25, 1.5])
      b.V = a.V * f; b.P = a.P / f
      pide = rand() < 0.5 ? 'V' : 'P'
    } else if (tipo === 'charles' || tipo === 'gay') {
      const mag = tipo === 'charles' ? 'V' : 'P'
      b.T = elige(rand, TEMPS.filter(t => t !== a.T))
      b[mag] = (a[mag] * b.T) / a.T
      pide = cfg.pideT && rand() < 0.35 ? 'T' : mag
    } else {
      b.P = elige(rand, P_IN.filter(p => p !== a.P))
      b.T = elige(rand, TEMPS.filter(t => t !== a.T))
      b.V = (a.P * a.V * b.T) / (a.T * b.P)
      pide = 'V'
    }
    if (!['P', 'V'].every(m => decima(b[m]) && b[m] > 0 && b[m] <= 40)) continue
    if (!nuevo(`${tipo}${a.P}${a.V}${a.T}${b.P}${b.V}${b.T}${pide}`)) continue
    return { ...base, a, b, pide, bueno: respuesta(pide, b[pide]) }
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, x) => x === r.bueno
// Desde dónde arranca el control: el valor del estado inicial
export const inicial = r => (r.tipo === 'ideal' ? { P: 1, V: 10 }[r.pide] : r.a[r.pide])

// ── Textos ───────────────────────────────────────────────────────────────
export const num = (x, l) => {
  const t = String(r1(x)).replace('-', '−')
  return l === 'en' ? t : t.replace('.', ',')
}
export const tempTexto = (T, celsius, l) => (celsius ? `${num(T - 273, l)} °C` : `${num(T, l)} K`)
const val = (mag, x, l) => `${num(x, l)} ${UNIDAD[mag]}`

export const NOMBRE_LEY = {
  boyle: { es: 'Ley de Boyle', en: 'Boyle’s law', ca: 'Llei de Boyle' },
  charles: { es: 'Ley de Charles', en: 'Charles’s law', ca: 'Llei de Charles' },
  gay: { es: 'Ley de Gay-Lussac', en: 'Gay-Lussac’s law', ca: 'Llei de Gay-Lussac' },
  combinada: { es: 'Ley combinada de los gases', en: 'Combined gas law', ca: 'Llei combinada dels gasos' },
  ideal: { es: 'Ecuación de los gases ideales', en: 'Ideal gas equation', ca: 'Equació dels gasos ideals' },
}
export const FORMULA = {
  boyle: 'P₁·V₁ = P₂·V₂',
  charles: 'V₁/T₁ = V₂/T₂',
  gay: 'P₁/T₁ = P₂/T₂',
  combinada: 'P₁·V₁/T₁ = P₂·V₂/T₂',
  ideal: 'P·V = n·R·T',
}

export function enunciado(r, l) {
  const T = x => tempTexto(x, r.celsius, l)
  const { a, b } = r
  if (r.tipo === 'ideal') {
    const rr = s(l, '(R = 0,082 atm·L/(mol·K))', '(R = 0.082 atm·L/(mol·K))', '(R = 0,082 atm·L/(mol·K))')
    return r.pide === 'P'
      ? s(l, `Hay ${num(a.n, l)} mol de gas a ${T(a.T)} en un recipiente de ${val('V', a.V, l)}. ¿Qué presión tiene? ${rr}`, `There ${a.n === 1 ? 'is' : 'are'} ${num(a.n, l)} mol of gas at ${T(a.T)} in a ${val('V', a.V, l)} container. What is its pressure? ${rr}`, `Hi ha ${num(a.n, l)} mol de gas a ${T(a.T)} en un recipient de ${val('V', a.V, l)}. Quina pressió té? ${rr}`)
      : s(l, `¿Qué volumen ocupa${a.n === 1 ? '' : 'n'} ${num(a.n, l)} mol de gas a ${T(a.T)} y ${val('P', a.P, l)}? ${rr}`, `What volume do${a.n === 1 ? 'es' : ''} ${num(a.n, l)} mol of gas take up at ${T(a.T)} and ${val('P', a.P, l)}? ${rr}`, `Quin volum ocupa${a.n === 1 ? '' : 'n'} ${num(a.n, l)} mol de gas a ${T(a.T)} i ${val('P', a.P, l)}? ${rr}`)
  }
  if (r.tipo === 'boyle') {
    if (r.pide === 'V') return s(l, `Un gas ocupa ${val('V', a.V, l)} a ${val('P', a.P, l)}. Si la presión pasa a ${val('P', b.P, l)} sin cambiar la temperatura, ¿qué volumen ocupa?`, `A gas takes up ${val('V', a.V, l)} at ${val('P', a.P, l)}. If the pressure changes to ${val('P', b.P, l)} at the same temperature, what volume does it take up?`, `Un gas ocupa ${val('V', a.V, l)} a ${val('P', a.P, l)}. Si la pressió passa a ${val('P', b.P, l)} sense canviar la temperatura, quin volum ocupa?`)
    return s(l, `Un gas ocupa ${val('V', a.V, l)} a ${val('P', a.P, l)}. Si se lleva a ${val('V', b.V, l)} sin cambiar la temperatura, ¿qué presión tendrá?`, `A gas takes up ${val('V', a.V, l)} at ${val('P', a.P, l)}. If it is brought to ${val('V', b.V, l)} at the same temperature, what will its pressure be?`, `Un gas ocupa ${val('V', a.V, l)} a ${val('P', a.P, l)}. Si es porta a ${val('V', b.V, l)} sense canviar la temperatura, quina pressió tindrà?`)
  }
  if (r.tipo === 'charles') {
    if (r.pide === 'V') return s(l, `Un globo tiene ${val('V', a.V, l)} a ${T(a.T)}. Si pasa a ${T(b.T)} a presión constante, ¿qué volumen tendrá?`, `A balloon holds ${val('V', a.V, l)} at ${T(a.T)}. If it goes to ${T(b.T)} at constant pressure, what will its volume be?`, `Un globus té ${val('V', a.V, l)} a ${T(a.T)}. Si passa a ${T(b.T)} a pressió constant, quin volum tindrà?`)
    return s(l, `Un gas ocupa ${val('V', a.V, l)} a ${T(a.T)}. ¿A qué temperatura (en K) ocupará ${val('V', b.V, l)}, a presión constante?`, `A gas takes up ${val('V', a.V, l)} at ${T(a.T)}. At what temperature (in K) will it take up ${val('V', b.V, l)}, at constant pressure?`, `Un gas ocupa ${val('V', a.V, l)} a ${T(a.T)}. A quina temperatura (en K) ocuparà ${val('V', b.V, l)}, a pressió constant?`)
  }
  if (r.tipo === 'gay') {
    if (r.pide === 'P') return s(l, `Un bote cerrado tiene gas a ${val('P', a.P, l)} y ${T(a.T)}. Si pasa a ${T(b.T)}, ¿qué presión tendrá?`, `A sealed can holds gas at ${val('P', a.P, l)} and ${T(a.T)}. If it goes to ${T(b.T)}, what will its pressure be?`, `Un pot tancat té gas a ${val('P', a.P, l)} i ${T(a.T)}. Si passa a ${T(b.T)}, quina pressió tindrà?`)
    return s(l, `Un bote cerrado tiene gas a ${val('P', a.P, l)} y ${T(a.T)}. ¿A qué temperatura (en K) llegará a ${val('P', b.P, l)}?`, `A sealed can holds gas at ${val('P', a.P, l)} and ${T(a.T)}. At what temperature (in K) will it reach ${val('P', b.P, l)}?`, `Un pot tancat té gas a ${val('P', a.P, l)} i ${T(a.T)}. A quina temperatura (en K) arribarà a ${val('P', b.P, l)}?`)
  }
  return s(l, `Un gas ocupa ${val('V', a.V, l)} a ${val('P', a.P, l)} y ${T(a.T)}. Si pasa a ${val('P', b.P, l)} y ${T(b.T)}, ¿qué volumen ocupa?`, `A gas takes up ${val('V', a.V, l)} at ${val('P', a.P, l)} and ${T(a.T)}. If it changes to ${val('P', b.P, l)} and ${T(b.T)}, what volume does it take up?`, `Un gas ocupa ${val('V', a.V, l)} a ${val('P', a.P, l)} i ${T(a.T)}. Si passa a ${val('P', b.P, l)} i ${T(b.T)}, quin volum ocupa?`)
}

function aKelvin(r, l) {
  if (!r.celsius) return ''
  const ts = r.tipo === 'ideal' ? [r.a.T] : [...new Set([r.a.T, r.b.T])]
  const lista = ts.map(t => `${num(t - 273, l)} °C + 273 = ${num(t, l)} K`).join(s(l, ' y ', ' and ', ' i '))
  return s(l, `Primero, a kelvin: ${lista}. `, `First, to kelvin: ${lista}. `, `Primer, a kelvin: ${lista}. `)
}

export function explicacion(r, l) {
  const ley = `${NOMBRE_LEY[r.tipo][l] ?? NOMBRE_LEY[r.tipo].es} (${FORMULA[r.tipo]})`
  const k = aKelvin(r, l)
  const n = x => num(x, l)
  const { a, b } = r
  let cuenta, idea = ''
  if (r.tipo === 'ideal') {
    cuenta = r.pide === 'P'
      ? `P = n·R·T ÷ V = ${n(a.n)} · ${l === 'en' ? '0.082' : '0,082'} · ${n(a.T)} ÷ ${n(a.V)} ≈ ${n(a.P)} atm.`
      : `V = n·R·T ÷ P = ${n(a.n)} · ${l === 'en' ? '0.082' : '0,082'} · ${n(a.T)} ÷ ${n(a.P)} ≈ ${n(a.V)} L.`
    if (a.T === 273 && a.P === 1 && a.n === 1) idea = s(l, ' Es el famoso 22,4 L: un mol de cualquier gas a 0 °C y 1 atm.', ' It is the famous 22.4 L: one mole of any gas at 0 °C and 1 atm.', ' És el famós 22,4 L: un mol de qualsevol gas a 0 °C i 1 atm.')
    return `${s(l, 'Ecuación', 'Equation', 'Equació')} P·V = n·R·T. ${k}${cuenta}${idea}`
  }
  if (r.tipo === 'boyle') {
    cuenta = r.pide === 'V'
      ? `V₂ = P₁·V₁ ÷ P₂ = ${n(a.P)} · ${n(a.V)} ÷ ${n(b.P)} = ${n(b.V)} L.`
      : `P₂ = P₁·V₁ ÷ V₂ = ${n(a.P)} · ${n(a.V)} ÷ ${n(b.V)} = ${n(b.P)} atm.`
    idea = s(l, ' Presión y volumen son inversamente proporcionales: si uno se multiplica, el otro se divide.', ' Pressure and volume are inversely proportional: if one is multiplied, the other is divided.', ' Pressió i volum són inversament proporcionals: si un es multiplica, l’altre es divideix.')
  } else if (r.tipo === 'charles' || r.tipo === 'gay') {
    const m = r.tipo === 'charles' ? 'V' : 'P'
    cuenta = r.pide === 'T'
      ? `T₂ = T₁·${m}₂ ÷ ${m}₁ = ${n(a.T)} · ${n(b[m])} ÷ ${n(a[m])} = ${n(b.T)} K.`
      : `${m}₂ = ${m}₁·T₂ ÷ T₁ = ${n(a[m])} · ${n(b.T)} ÷ ${n(a.T)} = ${n(b[m])} ${UNIDAD[m]}.`
    idea = r.tipo === 'charles'
      ? s(l, ' A presión constante, volumen y temperatura (en K) van en proporción directa.', ' At constant pressure, volume and temperature (in K) are directly proportional.', ' A pressió constant, volum i temperatura (en K) van en proporció directa.')
      : s(l, ' A volumen constante, presión y temperatura (en K) van en proporción directa: por eso no se calienta un aerosol.', ' At constant volume, pressure and temperature (in K) are directly proportional: that is why you never heat an aerosol can.', ' A volum constant, pressió i temperatura (en K) van en proporció directa: per això no s’escalfa un esprai.')
  } else {
    cuenta = `V₂ = P₁·V₁·T₂ ÷ (T₁·P₂) = ${n(a.P)} · ${n(a.V)} · ${n(b.T)} ÷ (${n(a.T)} · ${n(b.P)}) = ${n(b.V)} L.`
  }
  return `${ley}. ${k}${cuenta}${idea}`
}

// Por qué ha fallado (null si no hay una causa clara)
export function pistaFallo(r, x, l) {
  const v = leeRespuesta(x)
  if (!v) return null
  const cerca = (y, z) => Math.abs(y - z) < 0.051 + Math.abs(z) * 0.02
  if (r.tipo === 'ideal') {
    const a = r.a
    if (r.celsius && a.T !== 273) {
      const conC = r.pide === 'P' ? (a.n * R * (a.T - 273)) / a.V : (a.n * R * (a.T - 273)) / a.P
      if (cerca(v.v, conC)) return s(l, 'Has usado los °C: en la fórmula la temperatura va en kelvin.', 'You used °C: the temperature goes in kelvin in the formula.', 'Has fet servir els °C: a la fórmula la temperatura va en kelvin.')
    }
    return s(l, `Despeja ${r.pide} de P·V = n·R·T.`, `Rearrange P·V = n·R·T for ${r.pide}.`, `Aïlla ${r.pide} de P·V = n·R·T.`)
  }
  const { a, b } = r
  // ¿Lo ha hecho con °C?
  if (r.celsius && r.tipo !== 'boyle') {
    const ac = { ...a, T: a.T - 273 }, bc = { ...b, T: b.T - 273 }
    let conC
    if (r.tipo === 'combinada') conC = (ac.P * ac.V * bc.T) / (ac.T * bc.P)
    else if (r.pide === 'T') { const m = r.tipo === 'charles' ? 'V' : 'P'; conC = (ac.T * b[m]) / a[m] + 273 }
    else { const m = r.pide; conC = (a[m] * bc.T) / ac.T }
    if (conC !== null && Number.isFinite(conC) && cerca(v.v, conC)) return s(l, 'Has calculado con °C: en las leyes de los gases la temperatura va en kelvin (°C + 273).', 'You worked in °C: in the gas laws temperature goes in kelvin (°C + 273).', 'Has calculat amb °C: a les lleis dels gasos la temperatura va en kelvin (°C + 273).')
  }
  // ¿Proporción al revés?
  if (r.tipo === 'boyle') {
    const otra = r.pide === 'V' ? a.V * b.P / a.P : a.P * b.V / a.V
    if (cerca(v.v, otra)) return s(l, 'Al revés: a temperatura constante, si la presión sube el volumen baja (P·V no cambia).', 'The other way round: at constant temperature, if pressure goes up the volume goes down (P·V stays the same).', 'Al revés: a temperatura constant, si la pressió puja el volum baixa (P·V no canvia).')
  } else if (r.tipo !== 'combinada' && r.pide !== 'T') {
    const otra = (a[r.pide] * a.T) / b.T
    if (cerca(v.v, otra)) return s(l, 'Al revés: al calentar, el gas se expande o aprieta más; la proporción es directa.', 'The other way round: when heated, a gas expands or pushes harder; the proportion is direct.', 'Al revés: en escalfar-se, el gas s’expandeix o pressiona més; la proporció és directa.')
  }
  if (cerca(v.v, b[r.pide])) return s(l, 'Casi: revisa la última cifra.', 'Close: check the last digit.', 'Gairebé: revisa l’última xifra.')
  return null
}

export function schemaQuestion(r, l) {
  const mag = r.pide
  const bueno = r.tipo === 'ideal' ? r.a[mag] : r.b[mag]
  const u = UNIDAD[mag]
  const cand = [bueno * 2, bueno / 2, bueno + (mag === 'T' ? 100 : 1), bueno - (mag === 'T' ? 100 : 1), bueno * 3]
    .filter(x => x > 0).map(x => `${num(x, l)} ${u}`)
  const buena = `${num(bueno, l)} ${u}`
  return { question: enunciado(r, l), correctAnswer: buena, wrongAnswers: [...new Set(cand)].filter(x => x !== buena).slice(0, 3) }
}
