// Nombra el compuesto (química · formulación inorgánica, 3.º-4.º ESO y 1.º
// Bach): de nombre a fórmula y de fórmula a nombre.
//
// Compuestos que se generan a partir de los elementos y sus valencias:
//   óxidos (M + O), hidruros metálicos (M + H), sales binarias (M + F, Cl,
//   Br, I, S) e hidróxidos (M + OH). Fórmula: se cruzan las valencias y se
//   simplifica.
// Oxisales (M + anión de un oxoácido: SO₄²⁻, NO₃⁻, CO₃²⁻, PO₄³⁻…) con el
// mismo cruce de valencias y paréntesis si hace falta: Fe₂(SO₄)₃, Ca₃(PO₄)₂.
// Y listas fijas: óxidos de no metales (CO₂, SO₃, N₂O₅…), que se nombran por
// prefijos; oxoácidos con su nombre tradicional (H₂SO₄ ácido sulfúrico); y
// ESPECIALES (de nombre a fórmula): hidrácidos (HCl, H₂S), amoniaco y metano,
// y peróxidos (H₂O₂, Na₂O₂: el O₂ no se simplifica).
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
// medio → formula, nombre (de fórmula a Stock), con hidróxidos, las oxisales
// más comunes (sulfato, nitrato, carbonato) e hidrácidos;
// dificil → nombre, prefijos, acido, todas las oxisales y peróxidos.

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
  OH: { c: 1, tipo: 'hidroxido', poli: true, n: T('hidróxido', 'hydroxide', 'hidròxid') },
  // Oxoaniones: la sal del ácido -ico acaba en -ato y la del -oso en -ito
  SO4: { c: 2, tipo: 'oxisal', poli: true, n: T('sulfato', 'sulfate', 'sulfat') },
  SO3: { c: 2, tipo: 'oxisal', poli: true, n: T('sulfito', 'sulfite', 'sulfit') },
  NO3: { c: 1, tipo: 'oxisal', poli: true, n: T('nitrato', 'nitrate', 'nitrat') },
  NO2: { c: 1, tipo: 'oxisal', poli: true, n: T('nitrito', 'nitrite', 'nitrit') },
  CO3: { c: 2, tipo: 'oxisal', poli: true, n: T('carbonato', 'carbonate', 'carbonat') },
  PO4: { c: 3, tipo: 'oxisal', poli: true, n: T('fosfato', 'phosphate', 'fosfat') },
  ClO4: { c: 1, tipo: 'oxisal', poli: true, n: T('perclorato', 'perchlorate', 'perclorat') },
  ClO3: { c: 1, tipo: 'oxisal', poli: true, n: T('clorato', 'chlorate', 'clorat') },
  ClO: { c: 1, tipo: 'oxisal', poli: true, n: T('hipoclorito', 'hypochlorite', 'hipoclorit') },
}
export const esPoli = anion => !!ANIONES[anion]?.poli

export const TIPOS = {
  oxido: T('Óxido', 'Oxide', 'Òxid'),
  hidruro: T('Hidruro metálico', 'Metal hydride', 'Hidrur metàl·lic'),
  sal: T('Sal binaria', 'Binary salt', 'Sal binària'),
  hidroxido: T('Hidróxido', 'Hydroxide', 'Hidròxid'),
  oxisal: T('Oxisal', 'Oxosalt', 'Oxisal'),
}
// Las cajas de clasificar: solo los tipos que salen en el nivel
export const tiposDelNivel = nivel => Object.keys(TIPOS).filter(t => (NIVELES[nivel] ?? NIVELES.facil).aniones.some(a => ANIONES[a].tipo === t))

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

// De nombre a fórmula, con su nombre propio. [primer elemento, cuántos,
// segundo, cuántos]. Los hidrácidos salen con su nombre de gas o con el de
// ácido (en agua), los dos de libro y con la misma fórmula.
const E = (f, a, x, b, y, fam, nivel, nombres) => ({ f, a, x, b, y, fam, nivel, nombres })
const H = (f, b, y, gas, acido) => E(f, 'H', y === 1 ? 1 : 2, b, 1, 'hidracido', 'medio', [gas, acido])
const PEROX = { Li: 1, Na: 1, K: 1, Mg: 2, Ca: 2, Ba: 2, Zn: 2 }
// El error típico con un peróxido: tratarlo como un óxido (Na₂O₂ → NaO, BaO₂ → BaO)
const malPeroxido = e => (e.x === 1 ? escribe(e.a, 1, 'O', 1) : escribe(e.a, e.x / 2, 'O', 1))
export const ESPECIALES = [
  H('HF', 'F', 1, T('fluoruro de hidrógeno', 'hydrogen fluoride', 'fluorur d’hidrogen'), T('ácido fluorhídrico', 'hydrofluoric acid', 'àcid fluorhídric')),
  H('HCl', 'Cl', 1, T('cloruro de hidrógeno', 'hydrogen chloride', 'clorur d’hidrogen'), T('ácido clorhídrico', 'hydrochloric acid', 'àcid clorhídric')),
  H('HBr', 'Br', 1, T('bromuro de hidrógeno', 'hydrogen bromide', 'bromur d’hidrogen'), T('ácido bromhídrico', 'hydrobromic acid', 'àcid bromhídric')),
  H('HI', 'I', 1, T('yoduro de hidrógeno', 'hydrogen iodide', 'iodur d’hidrogen'), T('ácido yodhídrico', 'hydroiodic acid', 'àcid iodhídric')),
  H('H2S', 'S', 2, T('sulfuro de hidrógeno', 'hydrogen sulfide', 'sulfur d’hidrogen'), T('ácido sulfhídrico', 'hydrosulfuric acid', 'àcid sulfhídric')),
  E('NH3', 'N', 1, 'H', 3, 'comun', 'medio', [T('amoniaco', 'ammonia', 'amoníac')]),
  E('CH4', 'C', 1, 'H', 4, 'comun', 'medio', [T('metano', 'methane', 'metà')]),
  E('H2O2', 'H', 2, 'O', 2, 'peroxido', 'dificil', [T('peróxido de hidrógeno', 'hydrogen peroxide', 'peròxid d’hidrogen')]),
  ...Object.entries(PEROX).map(([m, v]) => E(`${m}${v === 1 ? '2' : ''}O2`, m, v === 1 ? 2 : 1, 'O', 2, 'peroxido', 'dificil',
    [T(`peróxido de ${METALES[m].n.es}`, `${METALES[m].n.en} peroxide`, `peròxid ${/^[aeiouh]/.test(METALES[m].n.ca) ? 'd’' : 'de '}${METALES[m].n.ca}`)])),
]

export const NIVELES = {
  facil:   { tipos: ['tipo', 'formula', 'formula'], aniones: ['O', 'H', 'Cl', 'F', 'S'] },
  medio:   { tipos: ['formula', 'formula', 'nombre', 'nombre', 'especial', 'tipo'], aniones: ['O', 'H', 'F', 'Cl', 'Br', 'I', 'S', 'OH', 'SO4', 'NO3', 'CO3'] },
  dificil: { tipos: ['nombre', 'nombre', 'formula', 'prefijos', 'prefijos', 'acido', 'especial'], aniones: ['O', 'H', 'F', 'Cl', 'Br', 'I', 'S', 'OH', 'SO4', 'SO3', 'NO3', 'NO2', 'CO3', 'PO4', 'ClO4', 'ClO3', 'ClO'] },
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
  const a = esPoli(anion) && nA > 1 ? `(${anion})${nA}` : `${anion}${nA > 1 ? nA : ''}`
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
  if (esPoli(c.anion) && c.nA > 1) out.push(`${c.metal}${c.nM > 1 ? c.nM : ''}${c.anion}${c.nA}`) // sin paréntesis
  out.push(escribe(c.metal, 1, c.anion, c.v + 1))
  out.push(escribe(c.metal, c.nM + 1, c.anion, c.nA))
  out.push(escribe(c.metal, c.nM, c.anion, c.nA + 1))
  out.push(escribe(c.metal, 1, c.anion, 1))
  return out
}

// La ronda clásica de un tipo (con opciones): la usan las mecánicas y el
// texto del schema (ver «Mecánicas» al final).
function genVieja(nivel, tipo, rand, evitar = null) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
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

    if (tipo === 'especial') {
      const lista = ESPECIALES.filter(e => nivel === 'dificil' || e.nivel === 'medio')
      const e = elige(rand, lista)
      if (e.f === evitar) continue
      const variante = Math.floor(rand() * e.nombres.length)
      const comp = { metal: e.a, nM: e.x, anion: e.b, nA: e.y, f: e.f, nm: true, especial: true }
      // Distractores: al revés, simplificada (el error del peróxido), uno de más
      const malas = [...new Set([escribe(e.a, e.y, e.b, e.x), escribe(e.a, e.x / gcd(e.x, e.y), e.b, e.y / gcd(e.x, e.y)), escribe(e.a, e.x + 1, e.b, e.y), escribe(e.a, e.x, e.b, e.y + 1), escribe(e.a, 1, e.b, 1)])].filter(f => f !== e.f)
      return { ...base, comp, especial: e.f, variante, clave: e.f, bueno: e.f, opciones: baraja(rand, [e.f, ...malas.slice(0, 3)]) }
    }

    if (tipo === 'prefijos') {
      // La mitad, óxidos de no metales; la otra mitad, compuestos de metal
      // con 2 o más átomos del segundo elemento.
      let c
      if (rand() < 0.5) {
        const o = elige(rand, OXIDOS_NM)
        c = { nm: true, el: o.el, a: o.a, o: o.o, f: o.f }
      } else {
        c = compuesto(rand, cfg.aniones.filter(x => !esPoli(x)))
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
    case 'formula': case 'especial': return o
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
export const esFormula = ronda => ronda.tipo === 'formula' || ronda.tipo === 'especial' || (ronda.tipo === 'acido' && ronda.pide === 'formula')

// Lo que se enseña como enunciado: un nombre (para escribir la fórmula) o
// una fórmula (para nombrarla).
export function dato(ronda, l) {
  const r = ronda
  if (r.tipo === 'formula') return { nombre: nombreStock(r.comp.metal, r.comp.v, r.comp.anion, l) }
  if (r.tipo === 'especial') return { nombre: tx(ESPECIALES.find(e => e.f === r.especial).nombres[r.variante], l) }
  if (r.tipo === 'acido') return r.pide === 'formula' ? { nombre: tx(ACIDOS.find(x => x.f === r.acido).n, l) } : { formula: r.acido }
  return { formula: r.comp.f }
}

function enunciadoViejo(ronda, l) {
  switch (ronda.tipo) {
    case 'tipo': return tx(T('¿Qué tipo de compuesto es?', 'What type of compound is it?', 'Quin tipus de compost és?'), l)
    case 'formula': case 'especial': return tx(T('¿Cuál es su fórmula?', 'What is its formula?', 'Quina és la seva fórmula?'), l)
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
function explicacionVieja(ronda, l) {
  return explicacionPlana(ronda, l).replace(/\b[A-Z][A-Za-z()]*\d[A-Za-z()\d]*/g, m => sub(m))
}

function explicacionPlana(ronda, l) {
  const r = ronda
  if (r.tipo === 'especial') {
    const e = ESPECIALES.find(x => x.f === r.especial)
    const nombre = tx(e.nombres[r.variante], l)
    if (e.fam === 'hidracido') {
      const [gas, acido] = e.nombres.map(n => tx(n, l))
      return tx(T(
        `${nombre} = ${e.f}. Es un hidrácido: hidrógeno (valencia 1) con un halógeno (F, Cl, Br, I, valencia 1) o con el azufre (valencia 2). En gas se llama «${gas}»; disuelto en agua, «${acido}».`,
        `${nombre} = ${e.f}. It is a hydracid: hydrogen (valency 1) with a halogen (F, Cl, Br, I, valency 1) or with sulfur (valency 2). As a gas it is “${gas}”; dissolved in water, “${acido}”.`,
        `${nombre} = ${e.f}. És un hidràcid: hidrogen (valència 1) amb un halogen (F, Cl, Br, I, valència 1) o amb el sofre (valència 2). En gas es diu «${gas}»; dissolt en aigua, «${acido}».`), l)
    }
    if (e.fam === 'comun') {
      return tx(T(
        `${nombre} = ${e.f}. Conserva su nombre común, admitido por la IUPAC. El ${e.a} actúa con valencia ${e.y} y cada H con 1.`,
        `${nombre} = ${e.f}. It keeps its common name, accepted by IUPAC. ${e.a} has valency ${e.y} and each H has 1.`,
        `${nombre} = ${e.f}. Conserva el nom comú, admès per la IUPAC. El ${e.a} actua amb valència ${e.y} i cada H amb 1.`), l)
    }
    return tx(T(
      `${nombre} = ${e.f}. En los peróxidos el oxígeno va de dos en dos (el ion O₂²⁻), así que el O₂ no se simplifica: ${e.f}, no ${malPeroxido(e)}.`,
      `${nombre} = ${e.f}. In peroxides oxygen comes in pairs (the O₂²⁻ ion), so O₂ is never simplified: ${e.f}, not ${malPeroxido(e)}.`,
      `${nombre} = ${e.f}. En els peròxids l’oxigen va de dos en dos (l’ió O₂²⁻), així que l’O₂ no se simplifica: ${e.f}, no ${malPeroxido(e)}.`), l)
  }
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
      'Metal + oxígeno = óxido; metal + hidrógeno = hidruro; metal + no metal (F, Cl, Br, I, S) = sal binaria; metal + grupo OH = hidróxido; metal + anión de un oxoácido (SO₄, NO₃, CO₃, PO₄, ClO…) = oxisal.',
      'Metal + oxygen = oxide; metal + hydrogen = hydride; metal + non-metal (F, Cl, Br, I, S) = binary salt; metal + OH group = hydroxide; metal + an oxoacid anion (SO₄, NO₃, CO₃, PO₄, ClO…) = oxosalt.',
      'Metall + oxigen = òxid; metall + hidrogen = hidrur; metall + no-metall (F, Cl, Br, I, S) = sal binària; metall + grup OH = hidròxid; metall + anió d’un oxoàcid (SO₄, NO₃, CO₃, PO₄, ClO…) = oxisal.'), l)
  }
  const m = METALES[c.metal], ca = ANIONES[c.anion].c
  const nombre = nombreStock(c.metal, c.v, c.anion, l)
  const unaSola = m.v.length === 1
  // En las oxisales, de qué ácido viene el anión (-ico → -ato, -oso → -ito)
  const ac = ACIDO_DE[c.anion] && ACIDOS.find(a => a.f === ACIDO_DE[c.anion])
  const sal = ac ? tx(T(
    ` El ${ANIONES[c.anion].n.es} viene del ${ac.n.es} (${ac.f}): el ácido en -ico da sales en -ato y el ácido en -oso, en -ito.`,
    ` ${ANIONES[c.anion].n.en.replace(/^./, x => x.toUpperCase())} comes from ${ac.n.en} (${ac.f}): -ic acids give -ate salts and -ous acids give -ite salts.`,
    ` El ${ANIONES[c.anion].n.ca} ve de l’${ac.n.ca} (${ac.f}): l’àcid en -ic dona sals en -at i l’àcid en -ós, en -it.`), l) : ''
  return tx(T(
    `${nombre} = ${c.f}. El ${c.metal} actúa con valencia ${c.v} y el ${c.anion} con ${ca}: se cruzan (${escribe(c.metal, ca, c.anion, c.v)}) y se simplifica si se puede.${unaSola ? ' Como el ' + m.n.es + ' solo tiene una valencia, no lleva número romano.' : ''}${sal}`,
    `${nombre} = ${c.f}. ${c.metal} has valency ${c.v} and ${c.anion} has ${ca}: swap them over and simplify if possible.${unaSola ? ' As ' + m.n.en + ' has only one valency, it takes no Roman numeral.' : ''}${sal}`,
    `${nombre} = ${c.f}. El ${c.metal} actua amb valència ${c.v} i el ${c.anion} amb ${ca}: s’encreuen i se simplifica si es pot.${unaSola ? ' Com que el ' + m.n.ca + ' només té una valència, no porta nombre romà.' : ''}${sal}`), l)
}

function schemaVieja(ronda, l) {
  const d = dato(ronda, l)
  return {
    question: `${d.nombre ?? d.formula}. ${enunciadoViejo(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda y el texto del schema):
//   clasifica  (tipo)      cuatro fórmulas, cada una a la caja de su tipo
//   construye  (formula)   los subíndices de la fórmula, con + y −
//   compone    (nombre)    la primera palabra y el número romano (o ninguno)
//   prefija    (prefijos)  los prefijos de cada elemento, con + y −
//   acido      (acido)     de nombre: H y O de la fórmula; de fórmula:
//                          hipo-/per- y -oso/-ico
// Ácido del que viene cada oxoanión
const ACIDO_DE = { SO4: 'H2SO4', SO3: 'H2SO3', NO3: 'HNO3', NO2: 'HNO2', CO3: 'H2CO3', PO4: 'H3PO4', ClO4: 'HClO4', ClO3: 'HClO3', ClO: 'HClO' }

export const MECANICA_DE_TIPO = { tipo: 'clasifica', formula: 'construye', especial: 'construye', nombre: 'compone', prefijos: 'prefija', acido: 'acido' }
export const ROMANOS = ['', 'I', 'II', 'III', 'IV']

// Prefijo y terminación de un oxoácido, leídos de su nombre.
export function partesAcido(f) {
  const n = ACIDOS.find(x => x.f === f).n.es
  return { pre: /hipo/.test(n) ? 'hipo' : /per/.test(n) ? 'per' : '', suf: /oso$/.test(n) ? 'oso' : 'ico' }
}
export const RAIZ = {
  S: T('sulfur', 'sulfur', 'sulfur'), N: T('nitr', 'nitr', 'nitr'), C: T('carbon', 'carbon', 'carbon'),
  P: T('fosfor', 'phosphor', 'fosfor'), Cl: T('clor', 'chlor', 'clor'),
}
export const SUFIJO = { oso: T('oso', 'ous', 'ós'), ico: T('ico', 'ic', 'ic') }
export const escribeAcido = (h, el, o) => `H${h > 1 ? h : ''}${el}O${o > 1 ? o : ''}`

// Cómo queda el nombre que se está montando: el de verdad si existe y, si no,
// las piezas pegadas (para que se vea qué se ha elegido).
export function nombreAcidoMontado(fam, pre, suf, l) {
  const real = ACIDOS.find(a => a.fam === fam && partesAcido(a.f).pre === pre && partesAcido(a.f).suf === suf)
  if (real) return tx(real.n, l)
  const palabra = `${pre === 'hipo' && l === 'en' ? 'hypo' : pre}${tx(RAIZ[fam], l)}${tx(SUFIJO[suf], l)}`
  return l === 'en' ? `${palabra} acid` : l === 'ca' ? `àcid ${palabra}` : `ácido ${palabra}`
}

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  let tipo = elige(rand, cfg.tipos)
  for (let intento = 0; ; intento++) {
    if (intento % 40 === 39) tipo = elige(rand, cfg.tipos)
    const r = genVieja(nivel, tipo, rand, evitar)
    const out = { ...r, mecanica: MECANICA_DE_TIPO[tipo] }
    if (tipo === 'tipo') {
      const items = []
      for (let k = 0; k < 30 && items.length < 4; k++) {
        const c = compuesto(rand, cfg.aniones)
        if (!items.some(x => x.f === c.f)) items.push(c)
      }
      if (new Set(items.map(c => ANIONES[c.anion].tipo)).size < 2) continue
      out.items = items
    }
    if (tipo === 'nombre') {
      // La primera palabra se elige entre la buena y otras tres del nivel
      const otras = baraja(rand, cfg.aniones.filter(a => a !== r.comp.anion)).slice(0, 3)
      out.palabras = baraja(rand, [r.comp.anion, ...otras])
    }
    const tema = `${tipo}${r.clave}${(out.items ?? []).map(c => c.f).join()}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return out
  }
}
export const genRound = difficulty => genRonda(difficulty)

export function respuestaBuena(r) {
  switch (r.mecanica) {
    case 'clasifica': return 'clasifica:0'
    case 'construye': return r.comp.f
    case 'compone': return `${r.comp.anion}|${METALES[r.comp.metal].v.length > 1 ? ROMANOS[r.comp.v] : ''}`
    case 'prefija': return r.bueno
    case 'acido': {
      if (r.pide === 'formula') return r.acido
      const p = partesAcido(r.acido)
      return `${p.pre}|${p.suf}`
    }
    default: return r.bueno
  }
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  return o === respuestaBuena(r)
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  switch (r.mecanica) {
    case 'clasifica': return tx(T('Lleva cada fórmula a la caja de su tipo de compuesto', 'Put each formula in the box for its type of compound', 'Porta cada fórmula a la caixa del seu tipus de compost'), l)
    case 'construye': return tx(T('Escribe su fórmula: ajusta los subíndices', 'Write its formula: set the subscripts', 'Escriu la fórmula: ajusta els subíndexs'), l)
    case 'compone': return tx(T('Nómbralo (Stock): elige la primera palabra y el número romano, si lleva', 'Name it (Stock): choose the first word and the Roman numeral, if any', 'Anomena’l (Stock): tria la primera paraula i el nombre romà, si en porta'), l)
    case 'prefija': return tx(T('Nómbralo por prefijos: cuántos átomos de cada elemento', 'Name it with prefixes: how many atoms of each element', 'Anomena’l amb prefixos: quants àtoms de cada element'), l)
    case 'acido': return r.pide === 'formula'
      ? tx(T('Escribe su fórmula: ¿cuántos H y cuántos O?', 'Write its formula: how many H and how many O?', 'Escriu la fórmula: quants H i quants O?'), l)
      : tx(T('Nómbralo: ¿lleva hipo- o per-, y acaba en -oso o en -ico?', 'Name it: does it take hypo- or per-, and end in -ous or -ic?', 'Anomena’l: porta hipo- o per-, i acaba en -ós o en -ic?'), l)
    default: return enunciadoViejo(r, l)
  }
}

export function explicacion(r, l) {
  if (r.mecanica === 'clasifica') {
    return r.items.map(c => `${sub(c.f)} → ${tx(TIPOS[ANIONES[c.anion].tipo], l).toLowerCase()}`).join('. ') + '. ' + explicacionVieja({ ...r, tipo: 'tipo' }, l)
  }
  return explicacionVieja(r, l)
}

export function schemaQuestion(r, l) {
  return schemaVieja(r, l)
}

// El nombre que se está montando en la pantalla (Stock con el número romano
// elegido, o ninguno; y por prefijos con los números elegidos).
export function nombreMontado(metal, anion, rom, l) {
  const nm = tx(METALES[metal].n, l), na = tx(ANIONES[anion].n, l)
  const num = rom ? `(${rom})` : ''
  if (l === 'en') return `${nm}${num} ${na}`
  if (l === 'ca') return `${na} ${deCa(nm)}${num}`
  return `${na} de ${nm}${num}`
}
export const nombrePrefijosDe = (c, x, y, l) => (c.nm
  ? nombrePrefijos(tx(NM[c.el], l), x, tx(ANIONES.O.n, l), y, l)
  : nombrePrefijos(tx(METALES[c.metal].n, l), x, tx(ANIONES[c.anion].n, l), y, l))
