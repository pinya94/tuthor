// La Receta Química (química · el mol y la estequiometría, 4.º de ESO y Bachillerato).
//
// Una reacción ajustada es una receta: los coeficientes dicen en qué
// proporción reaccionan los moles. El dibujo enseña la ecuación en fichas,
// con el dato debajo de cada sustancia y un «?» en la que se busca.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   masaMolar   la masa molar de un compuesto       (olvidar los subíndices)
//   moles       gramos ↔ moles                      (multiplicar por la masa molar en vez de dividir)
//   proporcion  moles de una sustancia → de otra    (no usar los coeficientes)
//   masa        gramos de reactivo → gramos de producto (creer que se conservan los gramos de cada sustancia)
//   limitante   cuál es el reactivo limitante        (el que hay en menor cantidad)
//   avogadro    número de moléculas                  (multiplicar por 6,02 sin la potencia)
//
// Masas atómicas redondas de los libros: H 1, C 12, N 14, O 16, Mg 24, S 32, Ca 40.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es') => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 2 })

export const MASA_ATOMICA = { H: 1, C: 12, N: 14, O: 16, Mg: 24, S: 32, Ca: 40 }

// Fórmula → composición. El texto lleva subíndices.
export const COMPUESTOS = {
  H2: { f: 'H₂', c: { H: 2 } },
  O2: { f: 'O₂', c: { O: 2 } },
  N2: { f: 'N₂', c: { N: 2 } },
  C: { f: 'C', c: { C: 1 } },
  S: { f: 'S', c: { S: 1 } },
  Mg: { f: 'Mg', c: { Mg: 1 } },
  H2O: { f: 'H₂O', c: { H: 2, O: 1 } },
  CO2: { f: 'CO₂', c: { C: 1, O: 2 } },
  CH4: { f: 'CH₄', c: { C: 1, H: 4 } },
  NH3: { f: 'NH₃', c: { N: 1, H: 3 } },
  MgO: { f: 'MgO', c: { Mg: 1, O: 1 } },
  CaCO3: { f: 'CaCO₃', c: { Ca: 1, C: 1, O: 3 } },
  CaO: { f: 'CaO', c: { Ca: 1, O: 1 } },
  SO2: { f: 'SO₂', c: { S: 1, O: 2 } },
  SO3: { f: 'SO₃', c: { S: 1, O: 3 } },
  C3H8: { f: 'C₃H₈', c: { C: 3, H: 8 } },
  H2SO4: { f: 'H₂SO₄', c: { H: 2, S: 1, O: 4 } },
  C6H12O6: { f: 'C₆H₁₂O₆', c: { C: 6, H: 12, O: 6 } },
}
export const masaMolar = id => Object.entries(COMPUESTOS[id].c).reduce((m, [el, k]) => m + MASA_ATOMICA[el] * k, 0)

// Reacciones ajustadas: [coeficiente, compuesto].
export const REACCIONES = [
  { id: 'agua', r: [[2, 'H2'], [1, 'O2']], p: [[2, 'H2O']], n: T('formación del agua', 'formation of water', 'formació de l’aigua') },
  { id: 'metano', r: [[1, 'CH4'], [2, 'O2']], p: [[1, 'CO2'], [2, 'H2O']], n: T('combustión del metano', 'combustion of methane', 'combustió del metà') },
  { id: 'amoniaco', r: [[1, 'N2'], [3, 'H2']], p: [[2, 'NH3']], n: T('síntesis del amoníaco', 'synthesis of ammonia', 'síntesi de l’amoníac') },
  { id: 'carbono', r: [[1, 'C'], [1, 'O2']], p: [[1, 'CO2']], n: T('combustión del carbono', 'combustion of carbon', 'combustió del carboni') },
  { id: 'magnesio', r: [[2, 'Mg'], [1, 'O2']], p: [[2, 'MgO']], n: T('oxidación del magnesio', 'oxidation of magnesium', 'oxidació del magnesi') },
  { id: 'caliza', r: [[1, 'CaCO3']], p: [[1, 'CaO'], [1, 'CO2']], n: T('descomposición de la caliza', 'decomposition of limestone', 'descomposició de la calcària') },
  { id: 'azufre', r: [[2, 'SO2'], [1, 'O2']], p: [[2, 'SO3']], n: T('oxidación del dióxido de azufre', 'oxidation of sulfur dioxide', 'oxidació del diòxid de sofre') },
  { id: 'propano', r: [[1, 'C3H8'], [5, 'O2']], p: [[3, 'CO2'], [4, 'H2O']], n: T('combustión del propano', 'combustion of propane', 'combustió del propà') },
]

export const NIVELES = {
  facil:   { tipos: ['masaMolar', 'masaMolar', 'moles', 'moles', 'proporcion'] },
  medio:   { tipos: ['masaMolar', 'moles', 'proporcion', 'proporcion', 'avogadro', 'masa'] },
  dificil: { tipos: ['proporcion', 'masa', 'masa', 'limitante', 'limitante', 'avogadro'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const exacto = x => Math.abs(x - Math.round(x * 100) / 100) < 1e-9
// Opciones numéricas (pueden tener decimales: se guardan ×100 enteras).
function opciones(rand, buenoCrudo, candidatos) {
  const bueno = Math.round(buenoCrudo) // ×100 con decimales flotantes: 1759,9999 → 1760
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null || !Number.isFinite(c) || c <= 0 || !exacto(c / 100)) continue
    const v = Math.round(c)
    if (vistos.has(v)) continue
    vistos.add(v); out.push(v)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}
const especies = rx => [...rx.r, ...rx.p]

let seq = 0

// La ronda clásica de un tipo (con opciones): la usan las mecánicas y el
// texto del schema (ver «Mecánicas» al final).
function genVieja(nivel, tipo, rand) {
  for (;;) {
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'masaMolar') {
      const id = elige(rand, ['H2O', 'CO2', 'CH4', 'NH3', 'CaCO3', 'SO2', 'H2SO4', 'C6H12O6', 'C3H8', 'MgO', 'SO3'])
      const M = masaMolar(id)
      const c = COMPUESTOS[id].c
      const sinSub = Object.keys(c).reduce((m, el) => m + MASA_ATOMICA[el], 0)
      const ops = opciones(rand, M * 100, [sinSub * 100, (M + 16) * 100, (M - (c.H ?? 1)) * 100, (M * 2) * 100, (M + 1) * 100])
      if (!ops) continue
      return { ...base, compuesto: id, bueno: M * 100, opciones: ops }
    }

    if (tipo === 'moles') {
      const id = elige(rand, ['H2O', 'CO2', 'CH4', 'NH3', 'CaCO3', 'O2', 'MgO', 'SO2'])
      const M = masaMolar(id)
      const n = elige(rand, [0.5, 1, 2, 3, 4, 5, 0.25])
      const g = n * M
      const ops = opciones(rand, n * 100, [g * M * 100, (M / g) * 100, n * 2 * 100, (n / 2) * 100, (g / 10) * 100])
      if (!ops || !exacto(g)) continue
      return { ...base, compuesto: id, g, bueno: Math.round(n * 100), opciones: ops }
    }

    if (tipo === 'proporcion' || tipo === 'masa') {
      const rx = elige(rand, REACCIONES)
      const sp = especies(rx)
      const [a, b] = baraja(rand, sp).slice(0, 2)
      if (!a || !b || a[1] === b[1]) continue
      const [ca, ida] = a, [cb, idb] = b
      if (ca === cb && tipo === 'proporcion') continue // con 1:1 no hay nada que pensar
      const na = elige(rand, [1, 2, 3, 4, 5, 6, 0.5])
      const nb = (na * cb) / ca
      if (tipo === 'proporcion') {
        const ops = opciones(rand, nb * 100, [na * 100, ((na * ca) / cb) * 100, na * cb * 100, (na + cb) * 100])
        if (!ops || !exacto(nb)) continue
        return { ...base, reaccion: rx.id, dato: ida, nA: na, pide: idb, bueno: Math.round(nb * 100), opciones: ops }
      }
      const Ma = masaMolar(ida), Mb = masaMolar(idb)
      const gA = na * Ma, gB = nb * Mb
      if (!exacto(gB) || gB > 2000) continue
      const ops = opciones(rand, gB * 100, [gA * 100, na * Mb * 100, ((gA * Mb) / Ma) * 100 === gB * 100 ? null : ((gA * Mb) / Ma) * 100, (gB * 2) * 100, (gA + Mb) * 100])
      if (!ops) continue
      return { ...base, reaccion: rx.id, dato: ida, nA: na, gA, pide: idb, bueno: Math.round(gB * 100), opciones: ops }
    }

    if (tipo === 'limitante') {
      const rx = elige(rand, REACCIONES.filter(x => x.r.length === 2))
      const [[c1, id1], [c2, id2]] = rx.r
      const n1 = elige(rand, [1, 2, 3, 4, 5, 6, 8, 10]), n2 = elige(rand, [1, 2, 3, 4, 5, 6, 8, 10])
      const q1 = n1 / c1, q2 = n2 / c2
      const bueno = q1 < q2 ? id1 : q2 < q1 ? id2 : 'ninguno'
      // La trampa: que el limitante NO sea el que hay en menor cantidad (si no, sale solo).
      if (bueno !== 'ninguno' && ((bueno === id1 && n1 < n2) || (bueno === id2 && n2 < n1)) && rand() < 0.7) continue
      return { ...base, reaccion: rx.id, cantidades: { [id1]: n1, [id2]: n2 }, bueno, opciones: [id1, id2, 'ninguno'] }
    }

    // avogadro: n moles → moléculas, como «1,2 · 10²⁴»
    const n = elige(rand, [0.5, 1, 2, 3, 5, 10])
    const id = elige(rand, ['H2O', 'CO2', 'O2', 'NH3', 'CH4'])
    const bueno = cientifica(n * 6.02)
    const cands = [cientifica(6.02 * n, 22), cientifica(6.02 / n), cientifica(n * 6.02, 24), cientifica(n + 6.02)]
    const ops = [...new Set([bueno, ...cands])].filter(Boolean).slice(0, 4)
    if (ops.length < 4) continue
    return { ...base, compuesto: id, n, bueno, opciones: baraja(rand, ops) }
  }
}

// x · 10²³ normalizado: «1,2 · 10²⁴» (texto en clave neutra con punto decimal).
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
function cientifica(x, e = 23) {
  let m = x, k = e
  while (m >= 10) { m /= 10; k++ }
  while (m < 1) { m *= 10; k-- }
  m = Math.round(m * 1000) / 1000
  return `${m}·10^${k}`
}
const verCientifica = (k, l) => { const [m, e] = k.split('·10^'); return `${num(Number(m), l)} · 10${String(e).split('').map(c => SUP[c]).join('')}` }


// ── Textos ────────────────────────────────────────────────────────────────
export const reaccion = r => REACCIONES.find(x => x.id === r.reaccion)
const f = id => COMPUESTOS[id].f

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'masaMolar': return `${num(o / 100, l)} g/mol`
    case 'moles': case 'proporcion': return `${num(o / 100, l)} mol`
    case 'masa': return `${num(o / 100, l)} g`
    case 'limitante': return o === 'ninguno' ? s(l, 'Ninguno: están en la proporción justa', 'Neither: they are in exact proportion', 'Cap: estan en la proporció justa') : f(o)
    default: return verCientifica(o, l)
  }
}

function enunciadoViejo(r, l) {
  switch (r.tipo) {
    case 'masaMolar': return s(l, `¿Cuál es la masa molar del ${f(r.compuesto)}?`, `What is the molar mass of ${f(r.compuesto)}?`, `Quina és la massa molar del ${f(r.compuesto)}?`)
    case 'moles': return s(l, `¿Cuántos moles hay en ${num(r.g, l)} g de ${f(r.compuesto)}?`, `How many moles are there in ${num(r.g, l)} g of ${f(r.compuesto)}?`, `Quants mols hi ha en ${num(r.g, l)} g de ${f(r.compuesto)}?`)
    case 'proporcion': case 'masa': {
      // El verbo según el papel: los reactivos «reaccionan», los productos «se forman».
      const prod = id => reaccion(r).p.some(([, x]) => x === id)
      const cant = r.tipo === 'masa' ? `${num(r.gA, l)} g` : `${num(r.nA, l)} mol`
      const que = r.tipo === 'masa' ? s(l, 'gramos', 'grams', 'grams') : s(l, 'moles', 'moles', 'mols')
      const dato = prod(r.dato)
        ? s(l, `Se forman ${cant} de ${f(r.dato)}.`, `${cant} of ${f(r.dato)} are formed.`, `Es formen ${cant} de ${f(r.dato)}.`)
        : s(l, `Reaccionan ${cant} de ${f(r.dato)}.`, `${cant} of ${f(r.dato)} react.`, `Reaccionen ${cant} de ${f(r.dato)}.`)
      const pide = prod(r.pide)
        ? s(l, `¿Cuántos ${que} de ${f(r.pide)} se forman?`, `How many ${que} of ${f(r.pide)} are formed?`, `Quants ${que} de ${f(r.pide)} es formen?`)
        : s(l, `¿Cuántos ${que} de ${f(r.pide)} hacen falta?`, `How many ${que} of ${f(r.pide)} are needed?`, `Quants ${que} de ${f(r.pide)} calen?`)
      return `${dato} ${pide}`
    }
    case 'limitante': return s(l, '¿Cuál es el reactivo limitante?', 'Which is the limiting reactant?', 'Quin és el reactiu limitant?')
    default: return s(l, `¿Cuántas moléculas hay en ${num(r.n, l)} mol de ${f(r.compuesto)}? (Nₐ = 6,02 · 10²³)`, `How many molecules are there in ${num(r.n, l)} mol of ${f(r.compuesto)}? (Nₐ = 6.02 × 10²³)`, `Quantes molècules hi ha en ${num(r.n, l)} mol de ${f(r.compuesto)}? (Nₐ = 6,02 · 10²³)`)
  }
}

function explicacionVieja(r, l) {
  switch (r.tipo) {
    case 'masaMolar': {
      const c = COMPUESTOS[r.compuesto].c
      const suma = Object.entries(c).map(([el, k]) => (k > 1 ? `${k} · ${MASA_ATOMICA[el]}` : `${MASA_ATOMICA[el]}`)).join(' + ')
      return s(l, `Se suman las masas atómicas de todos los átomos, multiplicadas por su subíndice: ${suma} = ${num(r.bueno / 100, l)} g/mol. Olvidar los subíndices es el error más común.`, `Add up the atomic masses of all the atoms, multiplied by their subscript: ${suma} = ${num(r.bueno / 100, l)} g/mol. Forgetting the subscripts is the most common mistake.`, `Se sumen les masses atòmiques de tots els àtoms, multiplicades pel subíndex: ${suma} = ${num(r.bueno / 100, l)} g/mol. Oblidar els subíndexs és l’error més comú.`)
    }
    case 'moles': return s(l, `n = masa ÷ masa molar = ${num(r.g, l)} ÷ ${masaMolar(r.compuesto)} = ${num(r.bueno / 100, l)} mol.`, `n = mass ÷ molar mass = ${num(r.g, l)} ÷ ${masaMolar(r.compuesto)} = ${num(r.bueno / 100, l)} mol.`, `n = massa ÷ massa molar = ${num(r.g, l)} ÷ ${masaMolar(r.compuesto)} = ${num(r.bueno / 100, l)} mol.`)
    case 'proporcion': case 'masa': {
      const rx = reaccion(r)
      const ca = especies(rx).find(([, id]) => id === r.dato)[0], cb = especies(rx).find(([, id]) => id === r.pide)[0]
      const nB = (r.nA * cb) / ca
      const paso = s(l, `Los coeficientes dicen que ${ca} mol de ${f(r.dato)} van con ${cb} mol de ${f(r.pide)}: ${num(r.nA, l)} · ${cb} ÷ ${ca} = ${num(nB, l)} mol.`, `The coefficients say ${ca} mol of ${f(r.dato)} go with ${cb} mol of ${f(r.pide)}: ${num(r.nA, l)} × ${cb} ÷ ${ca} = ${num(nB, l)} mol.`, `Els coeficients diuen que ${ca} mol de ${f(r.dato)} van amb ${cb} mol de ${f(r.pide)}: ${num(r.nA, l)} · ${cb} ÷ ${ca} = ${num(nB, l)} mol.`)
      if (r.tipo === 'proporcion') return paso
      return s(l,
        `Primero a moles: ${num(r.gA, l)} g ÷ ${masaMolar(r.dato)} g/mol = ${num(r.nA, l)} mol de ${f(r.dato)}. ${paso} Y a gramos: ${num(nB, l)} · ${masaMolar(r.pide)} = ${num(r.bueno / 100, l)} g. Los gramos no se conservan sustancia a sustancia: lo que manda son los moles.`,
        `First to moles: ${num(r.gA, l)} g ÷ ${masaMolar(r.dato)} g/mol = ${num(r.nA, l)} mol of ${f(r.dato)}. ${paso} Then to grams: ${num(nB, l)} × ${masaMolar(r.pide)} = ${num(r.bueno / 100, l)} g. Grams are not kept substance by substance: moles are what count.`,
        `Primer a mols: ${num(r.gA, l)} g ÷ ${masaMolar(r.dato)} g/mol = ${num(r.nA, l)} mol de ${f(r.dato)}. ${paso} I a grams: ${num(nB, l)} · ${masaMolar(r.pide)} = ${num(r.bueno / 100, l)} g. Els grams no es conserven substància a substància: el que mana són els mols.`)
    }
    case 'limitante': {
      const rx = reaccion(r)
      const [[c1, id1], [c2, id2]] = rx.r
      const n1 = r.cantidades[id1], n2 = r.cantidades[id2]
      const necesita = (n1 * c2) / c1
      const fin = r.bueno === 'ninguno'
        ? s(l, 'Justo lo que hay: los dos se gastan a la vez.', 'Exactly what there is: both run out at the same time.', 'Just el que hi ha: tots dos s’esgoten alhora.')
        : r.bueno === id1
          ? s(l, `Hay más (${n2} mol), así que sobra ${f(id2)} y el ${f(id1)} se acaba antes: es el limitante.`, `There is more (${n2} mol), so ${f(id2)} is left over and ${f(id1)} runs out first: it is the limiting reactant.`, `N’hi ha més (${n2} mol), així que sobra ${f(id2)} i el ${f(id1)} s’acaba abans: és el limitant.`)
          : s(l, `Solo hay ${n2} mol: falta ${f(id2)}, así que se acaba antes y es el limitante.`, `There is only ${n2} mol: ${f(id2)} runs short, so it runs out first and is the limiting reactant.`, `Només n’hi ha ${n2} mol: falta ${f(id2)}, així que s’acaba abans i és el limitant.`)
      return s(l, `Según la ecuación, ${n1} mol de ${f(id1)} necesitan ${n1} · ${c2} ÷ ${c1} = ${num(necesita, l)} mol de ${f(id2)}. ${fin} El limitante no es el que hay en menor cantidad, sino el que se acaba primero según la receta.`, `According to the equation, ${n1} mol of ${f(id1)} need ${n1} × ${c2} ÷ ${c1} = ${num(necesita, l)} mol of ${f(id2)}. ${fin} The limiting reactant is not the one there is least of, but the one that runs out first according to the recipe.`, `Segons l’equació, ${n1} mol de ${f(id1)} necessiten ${n1} · ${c2} ÷ ${c1} = ${num(necesita, l)} mol de ${f(id2)}. ${fin} El limitant no és el que hi ha en menys quantitat, sinó el que s’acaba primer segons la recepta.`)
    }
    default: return s(l, `Moléculas = moles · Nₐ = ${num(r.n, l)} · 6,02 · 10²³ = ${verCientifica(r.bueno, l)}. Al multiplicar, la potencia de 10 se mantiene (y se ajusta si la mantisa pasa de 10).`, `Molecules = moles × Nₐ = ${num(r.n, l)} × 6.02 × 10²³ = ${verCientifica(r.bueno, l)}. When multiplying, the power of 10 stays (and is adjusted if the leading number goes over 10).`, `Molècules = mols · Nₐ = ${num(r.n, l)} · 6,02 · 10²³ = ${verCientifica(r.bueno, l)}. En multiplicar, la potència de 10 es manté (i s’ajusta si la mantissa passa de 10).`)
  }
}

function schemaVieja(r, l) {
  const rx = r.reaccion ? reaccion(r) : null
  const ec = rx ? `${rx.r.map(([c, id]) => `${c > 1 ? c : ''}${f(id)}`).join(' + ')} → ${rx.p.map(([c, id]) => `${c > 1 ? c : ''}${f(id)}`).join(' + ')}. ` : ''
  const extra = r.tipo === 'limitante' ? ` ${Object.entries(r.cantidades).map(([id, n]) => `${n} mol ${f(id)}`).join(', ')}.` : ''
  return {
    question: `${ec}${enunciadoViejo(r, l)}${extra}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda y el texto del schema):
//   teclea      (masaMolar, moles, proporcion, masa)  el número
//   cientifica  (avogadro)   la mantisa y el exponente de 10
//   limitante   (limitante)  tocar el reactivo que se acaba (o «ninguno») y
//                            teclear cuántos moles sobran del otro
export const MECANICA_DE_TIPO = { masaMolar: 'teclea', moles: 'teclea', proporcion: 'teclea', masa: 'teclea', avogadro: 'cientifica', limitante: 'limitante' }

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  for (;;) {
    const r = { ...genVieja(nivel, tipo, rand), mecanica: MECANICA_DE_TIPO[tipo] }
    // Lo que sobra se teclea: tiene que salir exacto (nada de 5,333… mol)
    if (tipo === 'limitante' && !exacto(sobra(r))) continue
    return r
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Números tecleados: «12,5», «12.5» o «12».
export const leeNumero = t => {
  const x = String(t ?? '').trim().replace(',', '.')
  return /^\d+(\.\d+)?$/.test(x) ? Number(x) : null
}
const centesimas = x => Math.round(x * 100)

// Moles que sobran del reactivo en exceso (0 si están en proporción justa).
export function sobra(r) {
  const [[c1, id1], [c2, id2]] = reaccion(r).r
  const n1 = r.cantidades[id1], n2 = r.cantidades[id2]
  if (r.bueno === 'ninguno') return 0
  return r.bueno === id1 ? n2 - (n1 * c2) / c1 : n1 - (n2 * c1) / c2
}
export const valorAvogadro = r => r.n * 6.02e23

export function respuestaBuena(r) {
  if (r.mecanica === 'teclea') return String(r.bueno / 100)
  if (r.mecanica === 'cientifica') return r.bueno.replace('·10^', '|')
  if (r.mecanica === 'limitante') return `${r.bueno}|${sobra(r)}`
  return r.bueno
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  if (r.mecanica === 'teclea') { const x = leeNumero(o); return x != null && centesimas(x) === r.bueno }
  if (r.mecanica === 'cientifica') {
    // Vale cualquier forma equivalente: 1,806 · 10²⁴ o 18,06 · 10²³
    const [m, e] = String(o).split('|')
    const x = leeNumero(m)
    if (x == null || !/^\d+$/.test(e ?? '')) return false
    const valor = x * 10 ** Number(e)
    return Math.abs(valor - valorAvogadro(r)) <= valorAvogadro(r) * 1e-6
  }
  const [id, n] = String(o).split('|')
  const x = leeNumero(n)
  return id === r.bueno && x != null && centesimas(x) === centesimas(sobra(r))
}
export const isCorrect = esCorrecta

// Unidad del número que se teclea.
export const unidad = r => ({ masaMolar: 'g/mol', moles: 'mol', proporcion: 'mol', masa: 'g' })[r.tipo] ?? ''

export function enunciado(r, l) {
  if (r.mecanica === 'limitante') return s(l, 'Toca el reactivo que se acaba primero (o «ninguno») y escribe cuántos moles sobran del otro', 'Tap the reactant that runs out first (or “neither”) and type how many moles of the other are left over', 'Toca el reactiu que s’acaba primer (o «cap») i escriu quants mols sobren de l’altre')
  if (r.mecanica === 'cientifica') return `${enunciadoViejo(r, l)} ${s(l, 'Escribe la cifra y el exponente.', 'Type the number and the exponent.', 'Escriu la xifra i l’exponent.')}`
  return `${enunciadoViejo(r, l)} ${s(l, 'Escribe el resultado.', 'Type the answer.', 'Escriu el resultat.')}`
}

export function explicacion(r, l) {
  const base = explicacionVieja(r, l)
  if (r.mecanica !== 'limitante' || r.bueno === 'ninguno') return base
  const otro = Object.keys(r.cantidades).find(id => id !== r.bueno)
  return `${base} ${s(l, `Sobran ${num(sobra(r), l)} mol de ${f(otro)}.`, `${num(sobra(r), l)} mol of ${f(otro)} are left over.`, `Sobren ${num(sobra(r), l)} mol de ${f(otro)}.`)}`
}

export function schemaQuestion(r, l) {
  return schemaVieja(r, l)
}
