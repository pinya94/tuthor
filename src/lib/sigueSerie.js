// Sigue la Serie (matemáticas · sucesiones y progresiones, ESO y Bachillerato).
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   siguiente  el término que sigue                 (sumar la razón en vez de multiplicar)
//   tipo       aritmética, geométrica o ninguna     (los cuadrados o Fibonacci no son ninguna)
//   figuras    figuras de puntos que crecen: ¿cuántos en la figura n?
//              (multiplicar el n por lo que hay en la figura 1)
//   termino    aₙ con n grande                     (n·d en vez de (n − 1)·d)
//   general    el término general                   (olvidar el «n − 1»)
//   suma       suma de los n primeros (aritmética)  (no dividir entre 2)
//
// Las progresiones aritméticas se describen como aₙ = d·n + c (c = a₁ − d),
// que es justo lo que enseñan las figuras: c puntos fijos y d más por paso.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es') => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES').replace('-', '−')

export const NIVELES = {
  facil:   { tipos: ['siguiente', 'siguiente', 'tipo', 'figuras', 'figuras'] },
  medio:   { tipos: ['siguiente', 'figuras', 'termino', 'termino', 'general'] },
  dificil: { tipos: ['termino', 'general', 'general', 'suma', 'suma', 'figuras'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
function opciones(rand, bueno, candidatos) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null || (typeof c === 'number' && !Number.isFinite(c)) || vistos.has(c)) continue
    vistos.add(c); out.push(c)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

// ── Fórmulas como texto ───────────────────────────────────────────────────
const SUP = { '-': '⁻', '+': '⁺', n: 'ⁿ', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
const sup = t => String(t).split('').map(c => SUP[c] ?? c).join('')
// «3n + 2», «3n − 1», «n + 4», «−2n + 10»
export function lineal(d, c) {
  const dn = d === 1 ? 'n' : d === -1 ? '−n' : `${String(d).replace('-', '−')}n`
  if (c === 0) return dn
  return `${dn} ${c > 0 ? '+' : '−'} ${Math.abs(c)}`
}
// «2 · 3ⁿ⁻¹», «5 · 2ⁿ», «3ⁿ⁻¹»
export function exponencial(a, r, desfase) {
  const pot = `${r}${sup(desfase === -1 ? 'n-1' : desfase === 1 ? 'n+1' : 'n')}`
  return a === 1 ? pot : `${a} · ${pot}`
}

export const terminosArit = (a1, d, k = 4) => Array.from({ length: k }, (_, i) => a1 + i * d)
export const terminosGeom = (a1, r, k = 4) => Array.from({ length: k }, (_, i) => a1 * r ** i)

// Sucesiones famosas que no son ni aritméticas ni geométricas.
const NINGUNA = [
  { id: 'cuadrados', t: [1, 4, 9, 16, 25] },
  { id: 'fibonacci', t: [1, 1, 2, 3, 5, 8] },
  { id: 'triangulares', t: [1, 3, 6, 10, 15] },
  { id: 'cubos', t: [1, 8, 27, 64] },
  { id: 'saltos', t: [2, 3, 5, 8, 12] },
]

let seq = 0

// El generador de preguntas de siempre: la ronda de un tipo, con sus opciones.
function genVieja(nivel, tipo, rand) {
  for (;;) {
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'siguiente') {
      if (rand() < 0.55) {
        const a1 = entre(rand, 1, 20), d = elige(rand, [2, 3, 4, 5, 6, 7, 9, 11, -3, -4])
        const t = terminosArit(a1, d, 5)
        const bueno = t[4]
        const ops = opciones(rand, bueno, [t[3] + d + 1, t[3] * 2, t[3] - d, t[3] + 2 * d, t[3] + d - 1])
        if (!ops) continue
        return { ...base, clase: 'arit', a1, d, terminos: t.slice(0, 4), bueno, opciones: ops }
      }
      const a1 = elige(rand, [1, 2, 3, 5]), r = elige(rand, [2, 3, 4])
      const t = terminosGeom(a1, r, 5)
      const dif = t[3] - t[2]
      const ops = opciones(rand, t[4], [t[3] + r, t[3] + dif, t[3] * (r + 1), t[3] + t[2]])
      if (!ops || t[4] > 2000) continue
      return { ...base, clase: 'geom', a1, r, terminos: t.slice(0, 4), bueno: t[4], opciones: ops }
    }

    if (tipo === 'tipo') {
      const caso = elige(rand, ['arit', 'geom', 'ninguna'])
      let t
      if (caso === 'arit') t = terminosArit(entre(rand, 1, 15), elige(rand, [2, 3, 5, 7, -2]), 5)
      else if (caso === 'geom') t = terminosGeom(elige(rand, [1, 2, 3]), elige(rand, [2, 3]), 5)
      else t = elige(rand, NINGUNA).t.slice(0, 5)
      return { ...base, clase: caso, terminos: t, bueno: caso, opciones: ['arit', 'geom', 'ninguna'] }
    }

    if (tipo === 'figuras') {
      // c puntos fijos (gris) y d más en cada figura (color).
      const c = entre(rand, 0, 4), d = entre(rand, 2, 5)
      if (c + d < 3) continue
      const n = nivel === 'facil' ? elige(rand, [5, 6, 8, 10]) : elige(rand, [10, 15, 20, 25, 50, 100])
      const bueno = d * n + c
      const a1 = d + c
      const ops = opciones(rand, bueno, [a1 * n, d * n, d * (n - 1) + c, d * n + c + d, (2 * d + c) + (n - 3) * (d + 1)])
      if (!ops) continue
      return { ...base, c, d, n, bueno, opciones: ops }
    }

    if (tipo === 'termino') {
      if (rand() < 0.6) {
        const a1 = entre(rand, -5, 20), d = elige(rand, [2, 3, 4, 5, 6, 7, -2, -3])
        const n = elige(rand, [10, 15, 20, 25, 30, 40, 50, 100])
        const bueno = a1 + (n - 1) * d
        const ops = opciones(rand, bueno, [a1 + n * d, n * d, a1 * n, a1 + (n - 2) * d])
        if (!ops) continue
        return { ...base, clase: 'arit', a1, d, n, terminos: terminosArit(a1, d, 3), bueno, opciones: ops }
      }
      const a1 = elige(rand, [1, 2, 3, 5]), r = elige(rand, [2, 3])
      const n = elige(rand, r === 2 ? [6, 7, 8, 9, 10] : [5, 6, 7])
      const bueno = a1 * r ** (n - 1)
      const ops = opciones(rand, bueno, [a1 * r ** n, a1 * r * (n - 1), (a1 * r) ** (n - 1), a1 + (n - 1) * r])
      if (!ops) continue
      return { ...base, clase: 'geom', a1, r, n, terminos: terminosGeom(a1, r, 3), bueno, opciones: ops }
    }

    if (tipo === 'general') {
      if (rand() < 0.6) {
        const a1 = entre(rand, -4, 15), d = elige(rand, [2, 3, 4, 5, 6, -2, -3])
        const c = a1 - d
        const bueno = lineal(d, c)
        // Olvidar el (n − 1), confundir d con a₁, cambiar el signo de c.
        const ops = opciones(rand, bueno, [lineal(d, a1), lineal(a1 === 0 ? d + 1 : a1, d), c !== 0 ? lineal(d, -c) : lineal(d, d), lineal(d + 1, c - 1)])
        if (!ops) continue
        return { ...base, clase: 'arit', a1, d, terminos: terminosArit(a1, d, 4), bueno, opciones: ops }
      }
      const a1 = elige(rand, [1, 2, 3, 5]), r = elige(rand, [2, 3, 4])
      if (a1 === r) continue
      const bueno = exponencial(a1, r, -1)
      const ops = opciones(rand, bueno, [exponencial(a1, r, 0), exponencial(r, a1, -1), lineal(r, a1 - r), exponencial(a1, r, 1)])
      if (!ops) continue
      return { ...base, clase: 'geom', a1, r, terminos: terminosGeom(a1, r, 4), bueno, opciones: ops }
    }

    // suma de los n primeros términos de una aritmética
    const a1 = entre(rand, 1, 20), d = elige(rand, [1, 2, 3, 4, 5])
    const n = elige(rand, [10, 12, 15, 20, 25, 30, 50, 100])
    const an = a1 + (n - 1) * d
    const bueno = ((a1 + an) * n) / 2
    if (!Number.isInteger(bueno)) continue
    const ops = opciones(rand, bueno, [(a1 + an) * n, an * n, ((a1 + an) * (n - 1)) / 2, ((a1 + a1 + n * d) * n) / 2].map(v => (Number.isInteger(v) ? v : null)))
    if (!ops) continue
    return { ...base, clase: 'arit', a1, d, n, an, terminos: terminosArit(a1, d, 3), bueno, opciones: ops }
  }
}


// ── Textos ────────────────────────────────────────────────────────────────
const CLASE = {
  arit: T('Aritmética', 'Arithmetic', 'Aritmètica'),
  geom: T('Geométrica', 'Geometric', 'Geomètrica'),
  ninguna: T('Ninguna de las dos', 'Neither', 'Cap de les dues'),
}
const lista = (t, l) => `${t.map(x => num(x, l)).join(', ')}…`

export function textoOpcion(o, r, l) {
  if (r.tipo === 'tipo') return CLASE[o][l] ?? CLASE[o].es
  if (r.tipo === 'general') return `aₙ = ${o}`
  return num(o, l)
}

function enunciadoViejo(r, l) {
  switch (r.tipo) {
    case 'siguiente': return s(l, `${lista(r.terminos, l)} ¿Qué número sigue?`, `${lista(r.terminos, l)} What comes next?`, `${lista(r.terminos, l)} Quin nombre segueix?`)
    case 'tipo': return s(l, `${lista(r.terminos, l)} ¿Qué tipo de sucesión es?`, `${lista(r.terminos, l)} What kind of sequence is this?`, `${lista(r.terminos, l)} Quin tipus de successió és?`)
    case 'figuras': return s(l, `¿Cuántos puntos tendrá la figura ${r.n}?`, `How many dots will figure ${r.n} have?`, `Quants punts tindrà la figura ${r.n}?`)
    case 'termino': return s(l, `${lista(r.terminos, l)} ¿Cuánto vale el término ${r.n}?`, `${lista(r.terminos, l)} What is term number ${r.n}?`, `${lista(r.terminos, l)} Quant val el terme ${r.n}?`)
    case 'general': return s(l, `${lista(r.terminos, l)} ¿Cuál es su término general?`, `${lista(r.terminos, l)} What is its general term?`, `${lista(r.terminos, l)} Quin és el seu terme general?`)
    default: return s(l, `${lista(r.terminos, l)} ¿Cuánto suman los ${r.n} primeros términos?`, `${lista(r.terminos, l)} What is the sum of the first ${r.n} terms?`, `${lista(r.terminos, l)} Quant sumen els ${r.n} primers termes?`)
  }
}

function explicacionVieja(r, l) {
  switch (r.tipo) {
    case 'siguiente': return r.clase === 'arit'
      ? s(l, `Cada término se obtiene SUMANDO ${num(r.d, l)} (la diferencia): es una progresión aritmética. ${num(r.terminos[3], l)} + ${num(r.d, l)} = ${num(r.bueno, l)}.`, `Each term is found by ADDING ${num(r.d, l)} (the common difference): it is an arithmetic sequence. ${num(r.terminos[3], l)} + ${num(r.d, l)} = ${num(r.bueno, l)}.`, `Cada terme s’obté SUMANT ${num(r.d, l)} (la diferència): és una progressió aritmètica. ${num(r.terminos[3], l)} + ${num(r.d, l)} = ${num(r.bueno, l)}.`)
      : s(l, `Cada término se obtiene MULTIPLICANDO por ${r.r} (la razón): es una progresión geométrica. Las diferencias crecen, así que sumar no funciona. ${num(r.terminos[3], l)} · ${r.r} = ${num(r.bueno, l)}.`, `Each term is found by MULTIPLYING by ${r.r} (the common ratio): it is a geometric sequence. The differences keep growing, so adding does not work. ${num(r.terminos[3], l)} × ${r.r} = ${num(r.bueno, l)}.`, `Cada terme s’obté MULTIPLICANT per ${r.r} (la raó): és una progressió geomètrica. Les diferències creixen, així que sumar no funciona. ${num(r.terminos[3], l)} · ${r.r} = ${num(r.bueno, l)}.`)
    case 'tipo':
      if (r.clase === 'arit') return s(l, `Entre cada término y el siguiente siempre se suma lo mismo (${num(r.terminos[1] - r.terminos[0], l)}): es aritmética.`, `The same amount (${num(r.terminos[1] - r.terminos[0], l)}) is always added from one term to the next: it is arithmetic.`, `Entre cada terme i el següent sempre se suma el mateix (${num(r.terminos[1] - r.terminos[0], l)}): és aritmètica.`)
      if (r.clase === 'geom') return s(l, `Cada término es el anterior multiplicado por lo mismo (${num(r.terminos[1] / r.terminos[0], l)}): es geométrica.`, `Each term is the previous one multiplied by the same number (${num(r.terminos[1] / r.terminos[0], l)}): it is geometric.`, `Cada terme és l’anterior multiplicat pel mateix (${num(r.terminos[1] / r.terminos[0], l)}): és geomètrica.`)
      return s(l, 'Ni la diferencia entre términos es siempre la misma ni el cociente: no es aritmética ni geométrica (aunque tenga su propia regla, como los cuadrados o Fibonacci).', 'Neither the difference between terms nor the ratio stays the same: it is neither arithmetic nor geometric (even if it has its own rule, like the squares or Fibonacci).', 'Ni la diferència entre termes és sempre la mateixa ni el quocient: no és aritmètica ni geomètrica (encara que tingui la seva pròpia regla, com els quadrats o Fibonacci).')
    case 'figuras': return s(l,
      `Hay ${r.c} puntos que no cambian (en gris) y cada figura añade ${r.d} más (en color). La figura n tiene ${r.d}·n + ${r.c} puntos: ${r.d} · ${r.n} + ${r.c} = ${num(r.bueno, l)}. Multiplicar ${r.n} por los puntos de la figura 1 (${r.c + r.d}) cuenta varias veces los fijos.`,
      `There are ${r.c} dots that never change (grey) and each figure adds ${r.d} more (coloured). Figure n has ${r.d}n + ${r.c} dots: ${r.d} × ${r.n} + ${r.c} = ${num(r.bueno, l)}. Multiplying ${r.n} by the dots in figure 1 (${r.c + r.d}) counts the fixed ones several times.`,
      `Hi ha ${r.c} punts que no canvien (en gris) i cada figura n’afegeix ${r.d} més (en color). La figura n té ${r.d}·n + ${r.c} punts: ${r.d} · ${r.n} + ${r.c} = ${num(r.bueno, l)}. Multiplicar ${r.n} pels punts de la figura 1 (${r.c + r.d}) compta diverses vegades els fixos.`)
    case 'termino': return r.clase === 'arit'
      ? s(l, `aₙ = a₁ + (n − 1)·d. Del primero al término ${r.n} hay ${r.n - 1} saltos, no ${r.n}: ${num(r.a1, l)} + ${r.n - 1} · ${num(r.d, l)} = ${num(r.bueno, l)}.`, `aₙ = a₁ + (n − 1)d. From the first term to term ${r.n} there are ${r.n - 1} steps, not ${r.n}: ${num(r.a1, l)} + ${r.n - 1} × ${num(r.d, l)} = ${num(r.bueno, l)}.`, `aₙ = a₁ + (n − 1)·d. Del primer al terme ${r.n} hi ha ${r.n - 1} salts, no ${r.n}: ${num(r.a1, l)} + ${r.n - 1} · ${num(r.d, l)} = ${num(r.bueno, l)}.`)
      : s(l, `aₙ = a₁ · rⁿ⁻¹. Del primero al término ${r.n} se multiplica ${r.n - 1} veces por ${r.r}: ${r.a1} · ${r.r}${sup(r.n - 1)} = ${num(r.bueno, l)}.`, `aₙ = a₁ × rⁿ⁻¹. From the first term to term ${r.n} you multiply by ${r.r} ${r.n - 1} times: ${r.a1} × ${r.r}${sup(r.n - 1)} = ${num(r.bueno, l)}.`, `aₙ = a₁ · rⁿ⁻¹. Del primer al terme ${r.n} es multiplica ${r.n - 1} vegades per ${r.r}: ${r.a1} · ${r.r}${sup(r.n - 1)} = ${num(r.bueno, l)}.`)
    case 'general': return r.clase === 'arit'
      ? s(l, `aₙ = a₁ + (n − 1)·d = ${num(r.a1, l)} + (n − 1)·${num(r.d, l)} = ${r.bueno}. Compruébalo: con n = 1 sale ${num(r.a1, l)} y con n = 2, ${num(r.a1 + r.d, l)}.`, `aₙ = a₁ + (n − 1)d = ${num(r.a1, l)} + (n − 1)·${num(r.d, l)} = ${r.bueno}. Check it: n = 1 gives ${num(r.a1, l)} and n = 2 gives ${num(r.a1 + r.d, l)}.`, `aₙ = a₁ + (n − 1)·d = ${num(r.a1, l)} + (n − 1)·${num(r.d, l)} = ${r.bueno}. Comprova-ho: amb n = 1 surt ${num(r.a1, l)} i amb n = 2, ${num(r.a1 + r.d, l)}.`)
      : s(l, `aₙ = a₁ · rⁿ⁻¹ = ${r.bueno}. Con n = 1 el exponente es 0 y sale ${r.a1}; con ${exponencial(r.a1, r.r, 0)} el primer término sería ${r.a1 * r.r}.`, `aₙ = a₁ × rⁿ⁻¹ = ${r.bueno}. With n = 1 the exponent is 0 and you get ${r.a1}; with ${exponencial(r.a1, r.r, 0)} the first term would be ${r.a1 * r.r}.`, `aₙ = a₁ · rⁿ⁻¹ = ${r.bueno}. Amb n = 1 l’exponent és 0 i surt ${r.a1}; amb ${exponencial(r.a1, r.r, 0)} el primer terme seria ${r.a1 * r.r}.`)
    default: return s(l,
      `Sₙ = (a₁ + aₙ)·n ÷ 2. El término ${r.n} es ${num(r.a1, l)} + ${r.n - 1}·${r.d} = ${num(r.an, l)}, así que S = (${num(r.a1, l)} + ${num(r.an, l)}) · ${r.n} ÷ 2 = ${num(r.bueno, l)}. Es el truco de Gauss: el primero más el último suma lo mismo que el segundo más el penúltimo.`,
      `Sₙ = (a₁ + aₙ) × n ÷ 2. Term ${r.n} is ${num(r.a1, l)} + ${r.n - 1}×${r.d} = ${num(r.an, l)}, so S = (${num(r.a1, l)} + ${num(r.an, l)}) × ${r.n} ÷ 2 = ${num(r.bueno, l)}. It is Gauss’s trick: the first plus the last adds up to the same as the second plus the second-to-last.`,
      `Sₙ = (a₁ + aₙ)·n ÷ 2. El terme ${r.n} és ${num(r.a1, l)} + ${r.n - 1}·${r.d} = ${num(r.an, l)}, així que S = (${num(r.a1, l)} + ${num(r.an, l)}) · ${r.n} ÷ 2 = ${num(r.bueno, l)}. És el truc de Gauss: el primer més l’últim suma el mateix que el segon més el penúltim.`)
  }
}

function schemaVieja(r, l) {
  const pre = r.tipo === 'figuras' ? s(l, `Figuras de puntos: ${r.c + r.d}, ${r.c + 2 * r.d}, ${r.c + 3 * r.d}… `, `Dot figures: ${r.c + r.d}, ${r.c + 2 * r.d}, ${r.c + 3 * r.d}… `, `Figures de punts: ${r.c + r.d}, ${r.c + 2 * r.d}, ${r.c + 3 * r.d}… `) : ''
  return {
    question: pre + enunciadoViejo(r, l),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Encima del generador de arriba (que sigue dando las opciones para el texto
// del examen y de los buscadores), cada ronda se juega sin elegir:
//   escribe    teclear el número: el siguiente, el término n, la suma o los
//              puntos de la figura n
//   dibuja     dibujar la figura 4 tocando casillas de una rejilla
//   formula    construir aₙ con − y + (d y c, o a y r), viendo los términos
//   clasifica  tres series a su caja: aritmética, geométrica o ninguna
const MECANICAS = {
  facil:   { tipos: ['escribe', 'escribe', 'dibuja', 'dibuja', 'clasifica'], escribe: ['siguiente'] },
  medio:   { tipos: ['escribe', 'escribe', 'dibuja', 'formula', 'clasifica'], escribe: ['siguiente', 'termino', 'figuras'] },
  dificil: { tipos: ['escribe', 'escribe', 'formula', 'formula'], escribe: ['termino', 'suma', 'figuras'] },
}
export const MECANICAS_DE = nivel => MECANICAS[nivel]?.tipos ?? MECANICAS.facil.tipos
export const FIGURA_DIBUJO = 4

let seqN = 0
const recientes = []
const temaDe = r => JSON.stringify(r.terminos ?? r.series ?? [r.c, r.d])
export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genNueva(nivel, opts)
    if (intento < 20 && recientes.includes(temaDe(r))) continue
    recientes.push(temaDe(r))
    if (recientes.length > 6) recientes.shift()
    return r
  }
}
function genNueva(nivel, { rand = Math.random } = {}) {
  const cfg = MECANICAS[nivel] ?? MECANICAS.facil
  const tipo = elige(rand, cfg.tipos)
  if (tipo === 'escribe') {
    const sub = elige(rand, cfg.escribe)
    return { ...genVieja(nivel, sub, rand), id: ++seqN, tipo, sub }
  }
  if (tipo === 'dibuja') return { ...genVieja(nivel, 'figuras', rand), id: ++seqN, tipo, sub: 'figuras' }
  if (tipo === 'formula') return { ...genVieja(nivel, 'general', rand), id: ++seqN, tipo, sub: 'general' }
  // clasifica: tres series de al menos dos clases distintas
  for (;;) {
    const series = [0, 1, 2].map(() => genVieja(nivel, 'tipo', rand))
    if (new Set(series.map(x => x.clase)).size < 2) continue
    if (new Set(series.map(x => x.terminos.join())).size < 3) continue
    return { id: ++seqN, nivel, tipo, sub: 'tipo', series, cajas: ['arit', 'geom', 'ninguna'], bueno: 'clasifica:0' }
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Los puntos de una figura: c fijos en la columna 0 y d en cada columna 1…k.
export const figura = (c, d, k) => {
  const out = []
  for (let i = 0; i < c; i++) out.push(`0:${i}`)
  for (let col = 1; col <= k; col++) for (let i = 0; i < d; i++) out.push(`${col}:${i}`)
  return out
}
// La fórmula que se construye: aritmética d·n + c, geométrica a · rⁿ⁻¹.
export const formulaDe = (r, x, y) => (r.clase === 'geom' ? exponencial(x, y, -1) : lineal(x, y))
export const terminosDe = (r, x, y, k = 4) => (r.clase === 'geom'
  ? Array.from({ length: k }, (_, i) => x * y ** i)
  : Array.from({ length: k }, (_, i) => x * (i + 1) + y))

const limpia = t => String(t).replace(/−/g, '-').replace(/[\s.]/g, '')
// Respuestas: escribe, el número tecleado; dibuja «dibuja:ok|no»; formula, el
// texto de la fórmula construida; clasifica «clasifica:fallos».
export function esCorrecta(r, o) {
  if (r.tipo === 'escribe') return limpia(o) !== '' && Number(limpia(o)) === r.bueno
  if (r.tipo === 'dibuja') return o === 'dibuja:ok'
  return o === r.bueno
}

export function enunciado(r, l) {
  if (r.tipo === 'dibuja') return s(l, `Dibuja la figura ${FIGURA_DIBUJO}: toca las casillas donde van los puntos`, `Draw figure ${FIGURA_DIBUJO}: tap the squares where the dots go`, `Dibuixa la figura ${FIGURA_DIBUJO}: toca les caselles on van els punts`)
  if (r.tipo === 'formula') return s(l, 'Construye su término general: ajusta los números hasta que tu fórmula dé los mismos términos', 'Build its general term: adjust the numbers until your formula gives the same terms', 'Construeix el seu terme general: ajusta els nombres fins que la teva fórmula doni els mateixos termes')
  if (r.tipo === 'clasifica') return s(l, '¿De qué tipo es cada sucesión?', 'What kind of sequence is each one?', 'De quin tipus és cada successió?')
  return enunciadoViejo({ ...r, tipo: r.sub }, l)
}
export function explicacion(r, l) {
  if (r.tipo === 'clasifica') return r.series.map(x => `${lista(x.terminos, l)} ${(CLASE[x.clase][l] ?? CLASE[x.clase].es).toLowerCase()}`).join(' · ')
  if (r.tipo === 'dibuja') return s(l,
    `Hay ${r.c} puntos que no cambian y cada figura añade ${r.d} más: la figura ${FIGURA_DIBUJO} tiene ${r.c} + ${FIGURA_DIBUJO} · ${r.d} = ${r.c + FIGURA_DIBUJO * r.d} puntos, y la figura n, ${r.d}·n${r.c ? ` + ${r.c}` : ''}.`,
    `There are ${r.c} dots that never change and each figure adds ${r.d} more: figure ${FIGURA_DIBUJO} has ${r.c} + ${FIGURA_DIBUJO} × ${r.d} = ${r.c + FIGURA_DIBUJO * r.d} dots, and figure n, ${r.d}n${r.c ? ` + ${r.c}` : ''}.`,
    `Hi ha ${r.c} punts que no canvien i cada figura n’afegeix ${r.d} més: la figura ${FIGURA_DIBUJO} té ${r.c} + ${FIGURA_DIBUJO} · ${r.d} = ${r.c + FIGURA_DIBUJO * r.d} punts, i la figura n, ${r.d}·n${r.c ? ` + ${r.c}` : ''}.`)
  return explicacionVieja({ ...r, tipo: r.sub }, l)
}
export function schemaQuestion(r, l) {
  if (r.tipo === 'clasifica') return schemaVieja(r.series[0], l)
  return schemaVieja({ ...r, tipo: r.sub }, l)
}
