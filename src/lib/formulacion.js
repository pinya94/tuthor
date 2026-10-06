// Nombra el compuesto (química · formulación inorgánica, 3.º-4.º ESO y 1.º
// Bach): de nombre a fórmula y de fórmula a nombre.
//
// Compuestos que se generan a partir de los elementos y sus valencias:
//   óxidos (M + O), hidruros metálicos (M + H), sales binarias (M + F, Cl,
//   Br, I, S) e hidróxidos (M + OH). Fórmula: se cruzan las valencias y se
//   simplifica.
// Y dos listas fijas: óxidos de no metales (CO₂, SO₃, N₂O₅…), que se nombran
// por prefijos, y oxoácidos con su nombre tradicional (H₂SO₄ ácido sulfúrico).
//
// Para que siempre haya UNA respuesta buena:
//   · la fórmula nunca es ambigua, por eso de nombre a fórmula sale en todos
//     los niveles;
//   · de fórmula a nombre se pide un sistema concreto: Stock (con el número
//     romano solo si el metal tiene más de una valencia) o prefijos;
//   · por prefijos solo se pregunta cuando hay 2 o más átomos del segundo
//     elemento (o en los óxidos de la lista): «óxido de calcio» y «monóxido
//     de calcio» se dan por buenos según el libro, y así no hay duda;
//   · nada de óxidos de cloro: desde 2005 la IUPAC los nombra al revés
//     (dicloruro de oxígeno) y los libros no se ponen de acuerdo.
//
// Niveles: facil → tipo, formula (de nombre de Stock a fórmula);
// medio → formula, nombre (de fórmula a Stock), con hidróxidos;
// dificil → nombre, prefijos, acido.

const T = (es, en, ca) => ({ es, en, ca })

// Metales con sus valencias (las de los libros de 3.º-4.º de ESO).
export const METALES = {
  Li: { v: [1], n: T('litio', 'lithium', 'liti') },
  Na: { v: [1], n: T('sodio', 'sodium', 'sodi') },
  K:  { v: [1], n: T('potasio', 'potassium', 'potassi') },
  Ag: { v: [1], n: T('plata', 'silver', 'plata') },
  Mg: { v: [2], n: T('magnesio', 'magnesium', 'magnesi') },
  Ca: { v: [2], n: T('calcio', 'calcium', 'calci') },
  Ba: { v: [2], n: T('bario', 'barium', 'bari') },
  Zn: { v: [2], n: T('cinc', 'zinc', 'zinc') },
  Al: { v: [3], n: T('aluminio', 'aluminium', 'alumini') },
  Fe: { v: [2, 3], n: T('hierro', 'iron', 'ferro') },
  Cu: { v: [1, 2], n: T('cobre', 'copper', 'coure') },
  Co: { v: [2, 3], n: T('cobalto', 'cobalt', 'cobalt') },
  Ni: { v: [2, 3], n: T('níquel', 'nickel', 'níquel') },
  Pb: { v: [2, 4], n: T('plomo', 'lead', 'plom') },
  Sn: { v: [2, 4], n: T('estaño', 'tin', 'estany') },
  Au: { v: [1, 3], n: T('oro', 'gold', 'or') },
  Cr: { v: [2, 3], n: T('cromo', 'chromium', 'crom') },
}

// La segunda parte del compuesto: carga y nombre.
export const ANIONES = {
  O:  { c: 2, tipo: 'oxido', n: T('óxido', 'oxide', 'òxid') },
  H:  { c: 1, tipo: 'hidruro', n: T('hidruro', 'hydride', 'hidrur') },
  F:  { c: 1, tipo: 'sal', n: T('fluoruro', 'fluoride', 'fluorur') },
  Cl: { c: 1, tipo: 'sal', n: T('cloruro', 'chloride', 'clorur') },
  Br: { c: 1, tipo: 'sal', n: T('bromuro', 'bromide', 'bromur') },
  I:  { c: 1, tipo: 'sal', n: T('yoduro', 'iodide', 'iodur') },
  S:  { c: 2, tipo: 'sal', n: T('sulfuro', 'sulfide', 'sulfur') },
  OH: { c: 1, tipo: 'hidroxido', n: T('hidróxido', 'hydroxide', 'hidròxid') },
}

export const TIPOS = {
  oxido: T('Óxido', 'Oxide', 'Òxid'),
  hidruro: T('Hidruro metálico', 'Metal hydride', 'Hidrur metàl·lic'),
  sal: T('Sal binaria', 'Binary salt', 'Sal binària'),
  hidroxido: T('Hidróxido', 'Hydroxide', 'Hidròxid'),
}

// Óxidos de no metales: se nombran por prefijos. [fórmula, prefijo del O,
// átomos del no metal, no metal]
const NM = { C: T('carbono', 'carbon', 'carboni'), S: T('azufre', 'sulfur', 'sofre'), N: T('nitrógeno', 'nitrogen', 'nitrogen'), Si: T('silicio', 'silicon', 'silici') }
export const OXIDOS_NM = [
  { f: 'CO', el: 'C', a: 1, o: 1 }, { f: 'CO2', el: 'C', a: 1, o: 2 },
  { f: 'SO2', el: 'S', a: 1, o: 2 }, { f: 'SO3', el: 'S', a: 1, o: 3 },
  { f: 'NO', el: 'N', a: 1, o: 1 }, { f: 'NO2', el: 'N', a: 1, o: 2 },
  { f: 'N2O', el: 'N', a: 2, o: 1 }, { f: 'N2O3', el: 'N', a: 2, o: 3 }, { f: 'N2O5', el: 'N', a: 2, o: 5 },
  { f: 'SiO2', el: 'Si', a: 1, o: 2 },
]

// Oxoácidos con nombre tradicional, por familias (las otras de la familia
// son los distractores naturales: sulfúrico/sulfuroso).
export const ACIDOS = [
  { f: 'H2SO4', fam: 'S', n: T('ácido sulfúrico', 'sulfuric acid', 'àcid sulfúric') },
  { f: 'H2SO3', fam: 'S', n: T('ácido sulfuroso', 'sulfurous acid', 'àcid sulfurós') },
  { f: 'HNO3', fam: 'N', n: T('ácido nítrico', 'nitric acid', 'àcid nítric') },
  { f: 'HNO2', fam: 'N', n: T('ácido nitroso', 'nitrous acid', 'àcid nitrós') },
  { f: 'H2CO3', fam: 'C', n: T('ácido carbónico', 'carbonic acid', 'àcid carbònic') },
  { f: 'H3PO4', fam: 'P', n: T('ácido fosfórico', 'phosphoric acid', 'àcid fosfòric') },
  { f: 'HClO4', fam: 'Cl', n: T('ácido perclórico', 'perchloric acid', 'àcid perclòric') },
  { f: 'HClO3', fam: 'Cl', n: T('ácido clórico', 'chloric acid', 'àcid clòric') },
  { f: 'HClO2', fam: 'Cl', n: T('ácido cloroso', 'chlorous acid', 'àcid clorós') },
  { f: 'HClO', fam: 'Cl', n: T('ácido hipocloroso', 'hypochlorous acid', 'àcid hipoclorós') },
]

export const NIVELES = {
  facil:   { tipos: ['tipo', 'formula', 'formula'], aniones: ['O', 'H', 'Cl', 'F', 'S'] },
  medio:   { tipos: ['formula', 'nombre', 'nombre'], aniones: ['O', 'H', 'F', 'Cl', 'Br', 'I', 'S', 'OH'] },
  dificil: { tipos: ['nombre', 'prefijos', 'prefijos', 'acido'], aniones: ['O', 'H', 'F', 'Cl', 'Br', 'I', 'S', 'OH'] },
}

const gcd = (a, b) => (b ? gcd(b, a % b) : a)
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const ROMANO = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

// Fórmula de un compuesto metal + anión con la valencia v: se cruzan y se
// simplifican. Devuelve { f, nM, nA } (f en texto plano: «Fe2O3», «Fe(OH)3»).
export function formula(metal, v, anion) {
  const c = ANIONES[anion].c
  const g = gcd(v, c)
  const nM = c / g, nA = v / g
  return { f: escribe(metal, nM, anion, nA), nM, nA }
}
export function escribe(metal, nM, anion, nA) {
  const a = anion === 'OH' ? (nA > 1 ? `(OH)${nA}` : 'OH') : `${anion}${nA > 1 ? nA : ''}`
  return `${metal}${nM > 1 ? nM : ''}${a}`
}

// ── Nombres ──────────────────────────────────────────────────────────────
const vocal = s => /^[aeiouàèéíòóúh]/i.test(s)
const deCa = s => (vocal(s) ? `d’${s}` : `de ${s}`)
const tx = (o, l) => o[l] ?? o.es

export function nombreStock(metal, v, anion, l) {
  const m = METALES[metal]
  const num = m.v.length > 1 ? `(${ROMANO[v]})` : ''
  const nm = tx(m.n, l), na = tx(ANIONES[anion].n, l)
  if (l === 'en') return `${nm}${num} ${na}`
  if (l === 'ca') return `${na} ${deCa(nm)}${num}`
  return `${na} de ${nm}${num}`
}

const PREF = {
  es: ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta'],
  ca: ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta'],
  en: ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta'],
}
// «monóxido» (la o se funde); el resto conserva la vocal: «pentaóxido».
function conPrefijo(n, palabra, l, primero) {
  if (n === 1 && !primero) return palabra
  const p = PREF[l][n] ?? ''
  if (p === 'mono' && /^[oóò]/.test(palabra)) return 'mon' + palabra
  return p + palabra
}
// Nombre por prefijos: nA átomos del segundo elemento, nM del primero.
export function nombrePrefijos(nm, nM, na, nA, l) {
  if (l === 'en') {
    // «diiron trioxide», «carbon monoxide», «dinitrogen pentaoxide»
    const primero = nM > 1 ? PREF.en[nM] + nm : nm
    return `${primero} ${conPrefijo(nA, na, 'en', true)}`
  }
  const segundo = conPrefijo(nA, na, l, true)
  const primero = nM > 1 ? PREF[l][nM] + nm : nm
  return l === 'ca' ? `${segundo} ${deCa(primero)}` : `${segundo} de ${primero}`
}
const prefijosDe = (c, l) => (c.nm
  ? nombrePrefijos(tx(NM[c.el], l), c.a, tx(ANIONES.O.n, l), c.o, l)
  : nombrePrefijos(tx(METALES[c.metal].n, l), c.nM, tx(ANIONES[c.anion].n, l), c.nA, l))

// ── Rondas ───────────────────────────────────────────────────────────────
let seq = 0

function compuesto(rand, aniones) {
  const metal = elige(rand, Object.keys(METALES))
  const v = elige(rand, METALES[metal].v)
  const anion = elige(rand, aniones)
  return { metal, v, anion, ...formula(metal, v, anion) }
}

// Fórmulas equivocadas de libro: la otra valencia, los subíndices al revés,
// sin simplificar y (en hidróxidos) sin paréntesis.
function formulasMalas(c) {
  const m = METALES[c.metal], out = []
  for (const v2 of m.v) if (v2 !== c.v) out.push(formula(c.metal, v2, c.anion).f)
  out.push(escribe(c.metal, c.nA, c.anion, c.nM)) // al revés
  const cc = ANIONES[c.anion].c
  out.push(escribe(c.metal, cc, c.anion, c.v)) // sin simplificar
  if (c.anion === 'OH' && c.nA > 1) out.push(`${c.metal}${c.nM > 1 ? c.nM : ''}OH${c.nA}`)
  out.push(escribe(c.metal, 1, c.anion, c.v + 1))
  out.push(escribe(c.metal, c.nM + 1, c.anion, c.nA))
  out.push(escribe(c.metal, c.nM, c.anion, c.nA + 1))
  out.push(escribe(c.metal, 1, c.anion, 1))
  return out
}

export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'acido') {
      const a = elige(rand, ACIDOS)
      if (a.f === evitar) continue
      const deNombre = rand() < 0.5
      const fam = ACIDOS.filter(x => x.fam === a.fam && x.f !== a.f)
      const otros = baraja(rand, ACIDOS.filter(x => x.fam !== a.fam))
      const malos = [...baraja(rand, fam), ...otros].slice(0, 3)
      const ops = baraja(rand, [a, ...malos]).map(x => x.f)
      return { ...base, acido: a.f, clave: a.f, pide: deNombre ? 'formula' : 'nombre', bueno: a.f, opciones: ops }
    }

    if (tipo === 'prefijos') {
      // La mitad, óxidos de no metales; la otra mitad, compuestos de metal
      // con 2 o más átomos del segundo elemento.
      let c
      if (rand() < 0.5) {
        const o = elige(rand, OXIDOS_NM)
        c = { nm: true, el: o.el, a: o.a, o: o.o, f: o.f }
      } else {
        c = compuesto(rand, cfg.aniones.filter(x => x !== 'OH'))
        if (c.nA < 2) continue
      }
      if (c.f === evitar) continue
      // Distractores: prefijos cambiados de sitio, uno de más o de menos.
      const [p1, p2] = c.nm ? [c.a, c.o] : [c.nM, c.nA]
      const variantes = [[p2, p1], [p1, p2 + 1], [p1 + 1, p2], [p1, Math.max(1, p2 - 1)], [p1 + 1, p2 + 1]]
        .filter(([x, y]) => !(x === p1 && y === p2) && x >= 1 && y >= 1 && x <= 7 && y <= 7)
      const clave = (x, y) => `${x}:${y}`
      const vistos = new Set([clave(p1, p2)]), malos = []
      for (const [x, y] of variantes) if (!vistos.has(clave(x, y))) { vistos.add(clave(x, y)); malos.push(clave(x, y)) }
      if (malos.length < 3) continue
      return { ...base, comp: c, clave: c.f, bueno: clave(p1, p2), opciones: baraja(rand, [clave(p1, p2), ...malos.slice(0, 3)]) }
    }

    const c = compuesto(rand, cfg.aniones)
    if (c.f === evitar) continue
    if (tipo === 'tipo') {
      return { ...base, comp: c, clave: c.f, bueno: ANIONES[c.anion].tipo, opciones: Object.keys(TIPOS) }
    }
    if (tipo === 'formula') {
      const malas = [...new Set(formulasMalas(c))].filter(f => f !== c.f)
      if (malas.length < 3) continue
      return { ...base, comp: c, clave: c.f, bueno: c.f, opciones: baraja(rand, [c.f, ...baraja(rand, malas).slice(0, 3)]) }
    }
    // nombre (Stock): la buena es «v»; los distractores, valencias que no son.
    // Se guardan como «anion:v» para poder escribirlos en cada idioma.
    const m = METALES[c.metal]
    const buena = `${c.anion}:${c.v}`
    const cands = [
      ...m.v.filter(v => v !== c.v).map(v => `${c.anion}:${v}`),
      // el subíndice leído como valencia (solo con metales de varias valencias:
      // en los de una, sin número romano, saldría el mismo nombre que la buena)
      ...(m.v.length > 1 && c.nM > 1 && c.nM !== c.v && c.nM <= 4 ? [`${c.anion}:${c.nM}`] : []),
      ...Object.keys(ANIONES).filter(a => a !== c.anion && cfg.aniones.includes(a)).map(a => `${a}:${c.v}`),
    ]
    // un número romano en un metal de una sola valencia también es un error típico
    if (m.v.length === 1) cands.unshift(`${c.anion}:${c.v + 1}#num`)
    const malos = [...new Set(cands)].filter(x => x !== buena)
    if (malos.length < 3) continue
    return { ...base, comp: c, clave: c.f, bueno: buena, opciones: baraja(rand, [buena, ...baraja(rand, malos.slice(0, 5)).slice(0, 3)]) }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
// Texto plano de una opción de «nombre» («O:3», «O:2#num» = con número
// romano aunque el metal tenga una sola valencia: un error típico).
function nombreOpcion(o, c, l) {
  const [anion, resto] = o.split(':')
  const forzar = resto.endsWith('#num')
  const v = parseInt(resto, 10)
  if (!forzar) return nombreStock(c.metal, v, anion, l)
  const nm = tx(METALES[c.metal].n, l), na = tx(ANIONES[anion].n, l)
  if (l === 'en') return `${nm}(${ROMANO[v]}) ${na}`
  if (l === 'ca') return `${na} ${deCa(nm)}(${ROMANO[v]})`
  return `${na} de ${nm}(${ROMANO[v]})`
}

export function textoOpcion(o, ronda, l) {
  const r = ronda
  switch (r.tipo) {
    case 'tipo': return tx(TIPOS[o], l)
    case 'formula': return o
    case 'nombre': return nombreOpcion(o, r.comp, l)
    case 'prefijos': {
      const [x, y] = o.split(':').map(Number)
      const c = r.comp
      return c.nm
        ? nombrePrefijos(tx(NM[c.el], l), x, tx(ANIONES.O.n, l), y, l)
        : nombrePrefijos(tx(METALES[c.metal].n, l), x, tx(ANIONES[c.anion].n, l), y, l)
    }
    default: {
      const a = ACIDOS.find(x => x.f === o)
      return r.pide === 'formula' ? o : tx(a.n, l)
    }
  }
}

// ¿La opción es una fórmula (para pintarla con subíndices)?
export const esFormula = ronda => ronda.tipo === 'formula' || (ronda.tipo === 'acido' && ronda.pide === 'formula')

// Lo que se enseña como enunciado: un nombre (para escribir la fórmula) o
// una fórmula (para nombrarla).
export function dato(ronda, l) {
  const r = ronda
  if (r.tipo === 'formula') return { nombre: nombreStock(r.comp.metal, r.comp.v, r.comp.anion, l) }
  if (r.tipo === 'acido') return r.pide === 'formula' ? { nombre: tx(ACIDOS.find(x => x.f === r.acido).n, l) } : { formula: r.acido }
  return { formula: r.comp.f }
}

export function enunciado(ronda, l) {
  switch (ronda.tipo) {
    case 'tipo': return tx(T('¿Qué tipo de compuesto es?', 'What type of compound is it?', 'Quin tipus de compost és?'), l)
    case 'formula': return tx(T('¿Cuál es su fórmula?', 'What is its formula?', 'Quina és la seva fórmula?'), l)
    case 'nombre': return tx(T('¿Cómo se llama? (nomenclatura de Stock)', 'What is it called? (Stock nomenclature)', 'Com es diu? (nomenclatura de Stock)'), l)
    case 'prefijos': return tx(T('¿Cómo se llama? (por prefijos)', 'What is it called? (with prefixes)', 'Com es diu? (amb prefixos)'), l)
    default: return ronda.pide === 'formula'
      ? tx(T('¿Cuál es su fórmula?', 'What is its formula?', 'Quina és la seva fórmula?'), l)
      : tx(T('¿Cómo se llama?', 'What is it called?', 'Com es diu?'), l)
  }
}

// Subíndices de verdad en los textos: Fe2O3 → Fe₂O₃.
export const sub = f => f.replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d])

// Solo las fórmulas (empiezan por mayúscula y llevan algún número): «Fe2O3»,
// «Ca(OH)2». Los números sueltos («valencia 3», «(III)») no se tocan.
export function explicacion(ronda, l) {
  return explicacionPlana(ronda, l).replace(/\b[A-Z][A-Za-z()]*\d[A-Za-z()\d]*/g, m => sub(m))
}

function explicacionPlana(ronda, l) {
  const r = ronda
  if (r.tipo === 'acido') {
    const a = ACIDOS.find(x => x.f === r.acido)
    return tx(T(
      `${r.acido} = ${a.n.es}. En los oxoácidos, -ico es la valencia mayor del no metal y -oso la menor; con cuatro (el cloro): hipo…oso < …oso < …ico < per…ico.`,
      `${r.acido} = ${a.n.en}. In oxoacids, -ic is the non-metal’s higher valency and -ous the lower; with four (chlorine): hypo…ous < …ous < …ic < per…ic.`,
      `${r.acido} = ${a.n.ca}. En els oxoàcids, -ic és la valència més gran del no-metall i -ós la menor; amb quatre (el clor): hipo…ós < …ós < …ic < per…ic.`), l)
  }
  const c = r.comp
  if (r.tipo === 'prefijos') {
    const nombre = prefijosDe(c, l)
    return tx(T(
      `${c.f} = ${nombre}. Por prefijos se cuentan los átomos de cada elemento (di-, tri-, tetra-, penta-…); el primero no lleva «mono-».`,
      `${c.f} = ${nombre}. With prefixes you count the atoms of each element (di-, tri-, tetra-, penta-…); the first one never takes “mono-”.`,
      `${c.f} = ${nombre}. Amb prefixos es compten els àtoms de cada element (di-, tri-, tetra-, penta-…); el primer no porta «mono-».`), l)
  }
  if (r.tipo === 'tipo') {
    return tx(T(
      'Metal + oxígeno = óxido; metal + hidrógeno = hidruro; metal + no metal (F, Cl, Br, I, S) = sal binaria; metal + grupo OH = hidróxido.',
      'Metal + oxygen = oxide; metal + hydrogen = hydride; metal + non-metal (F, Cl, Br, I, S) = binary salt; metal + OH group = hydroxide.',
      'Metall + oxigen = òxid; metall + hidrogen = hidrur; metall + no-metall (F, Cl, Br, I, S) = sal binària; metall + grup OH = hidròxid.'), l)
  }
  const m = METALES[c.metal], ca = ANIONES[c.anion].c
  const nombre = nombreStock(c.metal, c.v, c.anion, l)
  const unaSola = m.v.length === 1
  return tx(T(
    `${nombre} = ${c.f}. El ${c.metal} actúa con valencia ${c.v} y el ${c.anion} con ${ca}: se cruzan (${c.metal}${ca > 1 ? ca : ''}${c.anion === 'OH' ? '(OH)' : c.anion}${c.v > 1 ? c.v : ''}) y se simplifica si se puede.${unaSola ? ' Como el ' + m.n.es + ' solo tiene una valencia, no lleva número romano.' : ''}`,
    `${nombre} = ${c.f}. ${c.metal} has valency ${c.v} and ${c.anion} has ${ca}: swap them over and simplify if possible.${unaSola ? ' As ' + m.n.en + ' has only one valency, it takes no Roman numeral.' : ''}`,
    `${nombre} = ${c.f}. El ${c.metal} actua amb valència ${c.v} i el ${c.anion} amb ${ca}: s’encreuen i se simplifica si es pot.${unaSola ? ' Com que el ' + m.n.ca + ' només té una valència, no porta nombre romà.' : ''}`), l)
}

export function schemaQuestion(ronda, l) {
  const d = dato(ronda, l)
  return {
    question: `${d.nombre ?? d.formula}. ${enunciado(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}
