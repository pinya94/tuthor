// ¿Qué Enlace? (química · el enlace químico, 3.º-4.º de ESO y Bachillerato).
//
// Un juego de mover electrones, no de elegir respuestas:
//   ionico     un metal y un no metal con sus electrones de valencia: se pasan
//              electrones y se añaden átomos hasta que todos completan su capa.
//              La fórmula (MgCl₂, Al₂O₃) sale de lo construido.
//   covalente  el esqueleto de una molécula sin enlaces: se ponen enlaces
//              sencillos, dobles o triples hasta completar todos los octetos.
//   pinta      se pintan casillas de la tabla de metal, no metal o semimetal
//              (el H del grupo 1 es la trampa).
//   clasifica  sustancias (y en difícil, propiedades) a su tipo: iónica,
//              molecular, red covalente o metálica.
//
// Solo casos indiscutibles en ESO: fuera los semimetales en los compuestos y
// el AlCl₃ (con mucho carácter covalente).

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)

// tipo: m (metal), n (no metal), s (semimetal), g (gas noble).
// col: columna en la mini-tabla (0-10). carga: ion habitual. enlaces: covalentes.
export const ELEMENTOS = {
  H: { z: 1, p: 1, col: 0, tipo: 'n', carga: 1, enlaces: 1, n: T('Hidrógeno', 'Hydrogen', 'Hidrogen') },
  He: { z: 2, p: 1, col: 10, tipo: 'g', n: T('Helio', 'Helium', 'Heli') },
  Li: { z: 3, p: 2, col: 0, tipo: 'm', carga: 1, n: T('Litio', 'Lithium', 'Liti') },
  Be: { z: 4, p: 2, col: 1, tipo: 'm', n: T('Berilio', 'Beryllium', 'Beril·li') },
  B: { z: 5, p: 2, col: 5, tipo: 's', n: T('Boro', 'Boron', 'Bor') },
  C: { z: 6, p: 2, col: 6, tipo: 'n', enlaces: 4, n: T('Carbono', 'Carbon', 'Carboni') },
  N: { z: 7, p: 2, col: 7, tipo: 'n', carga: -3, enlaces: 3, n: T('Nitrógeno', 'Nitrogen', 'Nitrogen') },
  O: { z: 8, p: 2, col: 8, tipo: 'n', carga: -2, enlaces: 2, n: T('Oxígeno', 'Oxygen', 'Oxigen') },
  F: { z: 9, p: 2, col: 9, tipo: 'n', carga: -1, enlaces: 1, n: T('Flúor', 'Fluorine', 'Fluor') },
  Ne: { z: 10, p: 2, col: 10, tipo: 'g', n: T('Neón', 'Neon', 'Neó') },
  Na: { z: 11, p: 3, col: 0, tipo: 'm', carga: 1, n: T('Sodio', 'Sodium', 'Sodi') },
  Mg: { z: 12, p: 3, col: 1, tipo: 'm', carga: 2, n: T('Magnesio', 'Magnesium', 'Magnesi') },
  Al: { z: 13, p: 3, col: 5, tipo: 'm', carga: 3, n: T('Aluminio', 'Aluminium', 'Alumini') },
  Si: { z: 14, p: 3, col: 6, tipo: 's', n: T('Silicio', 'Silicon', 'Silici') },
  P: { z: 15, p: 3, col: 7, tipo: 'n', enlaces: 3, n: T('Fósforo', 'Phosphorus', 'Fòsfor') },
  S: { z: 16, p: 3, col: 8, tipo: 'n', carga: -2, enlaces: 2, n: T('Azufre', 'Sulfur', 'Sofre') },
  Cl: { z: 17, p: 3, col: 9, tipo: 'n', carga: -1, enlaces: 1, n: T('Cloro', 'Chlorine', 'Clor') },
  Ar: { z: 18, p: 3, col: 10, tipo: 'g', n: T('Argón', 'Argon', 'Argó') },
  K: { z: 19, p: 4, col: 0, tipo: 'm', carga: 1, n: T('Potasio', 'Potassium', 'Potassi') },
  Ca: { z: 20, p: 4, col: 1, tipo: 'm', carga: 2, n: T('Calcio', 'Calcium', 'Calci') },
  Fe: { z: 26, p: 4, col: 2, tipo: 'm', n: T('Hierro', 'Iron', 'Ferro') },
  Cu: { z: 29, p: 4, col: 3, tipo: 'm', n: T('Cobre', 'Copper', 'Coure') },
  Zn: { z: 30, p: 4, col: 4, tipo: 'm', n: T('Zinc', 'Zinc', 'Zinc') },
  Ga: { z: 31, p: 4, col: 5, tipo: 'm', n: T('Galio', 'Gallium', 'Gal·li') },
  Ge: { z: 32, p: 4, col: 6, tipo: 's', n: T('Germanio', 'Germanium', 'Germani') },
  As: { z: 33, p: 4, col: 7, tipo: 's', n: T('Arsénico', 'Arsenic', 'Arsènic') },
  Se: { z: 34, p: 4, col: 8, tipo: 'n', n: T('Selenio', 'Selenium', 'Seleni') },
  Br: { z: 35, p: 4, col: 9, tipo: 'n', carga: -1, enlaces: 1, n: T('Bromo', 'Bromine', 'Brom') },
  Kr: { z: 36, p: 4, col: 10, tipo: 'g', n: T('Kriptón', 'Krypton', 'Kripton') },
}
// Grupo de cada columna (las tres del centro son metales de transición).
export const GRUPO_COL = [1, 2, null, null, null, 13, 14, 15, 16, 17, 18]


export const ENLACES = {
  ionico: T('Iónico', 'Ionic', 'Iònic'),
  covalente: T('Covalente', 'Covalent', 'Covalent'),
  metalico: T('Metálico', 'Metallic', 'Metàl·lic'),
}
export const CLASES = {
  ionica: T('Iónica', 'Ionic', 'Iònica'),
  molecular: T('Covalente molecular', 'Molecular covalent', 'Covalent molecular'),
  red: T('Red covalente (cristal covalente)', 'Giant covalent (network)', 'Xarxa covalent (cristall covalent)'),
  metalica: T('Metálica', 'Metallic', 'Metàl·lica'),
}

// Sustancias reales, con su clase indiscutible.
export const SUSTANCIAS = [
  { f: 'NaCl', clase: 'ionica', n: T('la sal común', 'table salt', 'la sal comuna') },
  { f: 'KBr', clase: 'ionica', n: T('el bromuro de potasio', 'potassium bromide', 'el bromur de potassi') },
  { f: 'CaO', clase: 'ionica', n: T('la cal viva', 'quicklime', 'la calç viva') },
  { f: 'MgCl₂', clase: 'ionica', n: T('el cloruro de magnesio', 'magnesium chloride', 'el clorur de magnesi') },
  { f: 'H₂O', clase: 'molecular', n: T('el agua', 'water', 'l’aigua') },
  { f: 'CO₂', clase: 'molecular', n: T('el dióxido de carbono', 'carbon dioxide', 'el diòxid de carboni') },
  { f: 'CH₄', clase: 'molecular', n: T('el metano', 'methane', 'el metà') },
  { f: 'O₂', clase: 'molecular', n: T('el oxígeno del aire', 'the oxygen in air', 'l’oxigen de l’aire') },
  { f: 'NH₃', clase: 'molecular', n: T('el amoníaco', 'ammonia', 'l’amoníac') },
  { f: 'C', clase: 'red', n: T('el diamante', 'diamond', 'el diamant') },
  { f: 'SiO₂', clase: 'red', n: T('el cuarzo (sílice)', 'quartz (silica)', 'el quars (sílice)') },
  { f: 'Cu', clase: 'metalica', n: T('el cobre de los cables', 'the copper in wires', 'el coure dels cables') },
  { f: 'Fe', clase: 'metalica', n: T('el hierro', 'iron', 'el ferro') },
  { f: 'Al', clase: 'metalica', n: T('el aluminio de una lata', 'the aluminium in a can', 'l’alumini d’una llauna') },
]

// Propiedades de cada clase (para el tipo «propiedades»).
export const PROPIEDADES = {
  ionica: [
    T('Sólida y dura, funde a temperatura muy alta, no conduce en estado sólido pero sí disuelta en agua o fundida.', 'Solid and hard, melts at a very high temperature, does not conduct as a solid but does when dissolved in water or molten.', 'Sòlida i dura, es fon a temperatura molt alta, no condueix en estat sòlid però sí dissolta en aigua o fosa.'),
    T('Cristales frágiles que se rompen al golpearlos y se disuelven en agua; la disolución conduce la electricidad.', 'Brittle crystals that shatter when struck and dissolve in water; the solution conducts electricity.', 'Cristalls fràgils que es trenquen en colpejar-los i es dissolen en aigua; la dissolució condueix l’electricitat.'),
  ],
  molecular: [
    T('A temperatura ambiente es un gas o un líquido, hierve a poca temperatura y no conduce la electricidad.', 'At room temperature it is a gas or a liquid, boils at a low temperature and does not conduct electricity.', 'A temperatura ambient és un gas o un líquid, bull a poca temperatura i no condueix l’electricitat.'),
    T('Sólido blando que funde enseguida (como la cera o el azúcar) y no conduce ni sólido ni fundido.', 'A soft solid that melts easily (like wax or sugar) and does not conduct either solid or molten.', 'Sòlid tou que es fon de seguida (com la cera o el sucre) i no condueix ni sòlid ni fos.'),
  ],
  red: [
    T('Durísimo, con un punto de fusión altísimo, insoluble en agua y no conduce la electricidad.', 'Extremely hard, with a very high melting point, insoluble in water and does not conduct electricity.', 'Duríssim, amb un punt de fusió altíssim, insoluble en aigua i no condueix l’electricitat.'),
  ],
  metalica: [
    T('Conduce muy bien la electricidad y el calor en estado sólido, tiene brillo y se puede estirar en hilos y láminas.', 'Conducts electricity and heat very well as a solid, is shiny and can be drawn into wires and sheets.', 'Condueix molt bé l’electricitat i la calor en estat sòlid, té brillantor i es pot estirar en fils i làmines.'),
  ],
}

// ── Moléculas para unir (esqueleto fijo: el alumno pone los enlaces) ──────
// [símbolo, x, y] en un lienzo de 200 × 120; enlaces: parejas de índices.
// Cada esqueleto tiene UNA sola forma de completar todos los octetos (test).
const M = (id, f, n, atomos, enlaces) => ({ id, f, n, atomos, enlaces })
export const MOLECULAS = [
  M('H2', 'H₂', T('hidrógeno', 'hydrogen', 'hidrogen'), [['H', 65, 60], ['H', 135, 60]], [[0, 1]]),
  M('Cl2', 'Cl₂', T('cloro', 'chlorine', 'clor'), [['Cl', 65, 60], ['Cl', 135, 60]], [[0, 1]]),
  M('HCl', 'HCl', T('cloruro de hidrógeno', 'hydrogen chloride', 'clorur d’hidrogen'), [['H', 65, 60], ['Cl', 135, 60]], [[0, 1]]),
  M('H2O', 'H₂O', T('agua', 'water', 'aigua'), [['O', 100, 45], ['H', 50, 90], ['H', 150, 90]], [[0, 1], [0, 2]]),
  M('H2S', 'H₂S', T('sulfuro de hidrógeno', 'hydrogen sulfide', 'sulfur d’hidrogen'), [['S', 100, 45], ['H', 50, 90], ['H', 150, 90]], [[0, 1], [0, 2]]),
  M('CH4', 'CH₄', T('metano', 'methane', 'metà'), [['C', 100, 60], ['H', 100, 14], ['H', 40, 60], ['H', 160, 60], ['H', 100, 106]], [[0, 1], [0, 2], [0, 3], [0, 4]]),
  M('O2', 'O₂', T('oxígeno', 'oxygen', 'oxigen'), [['O', 65, 60], ['O', 135, 60]], [[0, 1]]),
  M('NH3', 'NH₃', T('amoníaco', 'ammonia', 'amoníac'), [['N', 100, 42], ['H', 45, 82], ['H', 100, 104], ['H', 155, 82]], [[0, 1], [0, 2], [0, 3]]),
  M('PH3', 'PH₃', T('fosfina', 'phosphine', 'fosfina'), [['P', 100, 42], ['H', 45, 82], ['H', 100, 104], ['H', 155, 82]], [[0, 1], [0, 2], [0, 3]]),
  M('CO2', 'CO₂', T('dióxido de carbono', 'carbon dioxide', 'diòxid de carboni'), [['O', 35, 60], ['C', 100, 60], ['O', 165, 60]], [[0, 1], [1, 2]]),
  M('CCl4', 'CCl₄', T('tetracloruro de carbono', 'carbon tetrachloride', 'tetraclorur de carboni'), [['C', 100, 60], ['Cl', 100, 14], ['Cl', 40, 60], ['Cl', 160, 60], ['Cl', 100, 106]], [[0, 1], [0, 2], [0, 3], [0, 4]]),
  M('N2', 'N₂', T('nitrógeno', 'nitrogen', 'nitrogen'), [['N', 65, 60], ['N', 135, 60]], [[0, 1]]),
  M('HCN', 'HCN', T('cianuro de hidrógeno', 'hydrogen cyanide', 'cianur d’hidrogen'), [['H', 30, 60], ['C', 95, 60], ['N', 165, 60]], [[0, 1], [1, 2]]),
  M('CH2O', 'CH₂O', T('formaldehído', 'formaldehyde', 'formaldehid'), [['C', 85, 60], ['O', 160, 60], ['H', 40, 22], ['H', 40, 98]], [[0, 1], [0, 2], [0, 3]]),
]
export const molecula = id => MOLECULAS.find(m => m.id === id)
// Electrones de valencia y los que completan la capa (el H, dos).
export const valencia = el => (el === 'H' ? 1 : 8 - ELEMENTOS[el].enlaces)
export const objetivo = el => (el === 'H' ? 2 : 8)
// Enlaces que suma cada átomo con unos órdenes de enlace dados.
export function enlacesPorAtomo(mol, ordenes) {
  const t = mol.atomos.map(() => 0)
  mol.enlaces.forEach(([a, b], i) => { t[a] += ordenes[i]; t[b] += ordenes[i] })
  return t
}
export const completa = (mol, ordenes) => enlacesPorAtomo(mol, ordenes).every((n, i) => n === ELEMENTOS[mol.atomos[i][0]].enlaces)
// Todas las formas de completar los octetos (órdenes 1-3); debe haber una.
export function soluciones(mol) {
  const out = []
  const rec = (i, acc) => {
    if (i === mol.enlaces.length) { if (completa(mol, acc)) out.push(acc.join(',')); return }
    for (let o = 1; o <= 3; o++) rec(i + 1, [...acc, o])
  }
  rec(0, [])
  return out
}

const PINTABLES = ['H', 'Li', 'Na', 'K', 'Mg', 'Ca', 'Al', 'C', 'N', 'O', 'F', 'P', 'S', 'Cl', 'Br', 'Fe', 'Cu', 'Zn']
const SEMIMETALES = ['B', 'Si', 'Ge', 'As']

export const NIVELES = {
  facil: {
    tipos: ['pinta', 'ionico', 'ionico', 'covalente', 'covalente'],
    metales: ['Li', 'Na', 'K'], nometales: ['F', 'Cl', 'Br'],
    moleculas: ['H2', 'Cl2', 'HCl', 'H2O', 'H2S', 'CH4'], semimetales: false, propiedades: false,
  },
  medio: {
    tipos: ['pinta', 'ionico', 'ionico', 'covalente', 'covalente', 'clasifica'],
    metales: ['Li', 'Na', 'K', 'Mg', 'Ca'], nometales: ['F', 'Cl', 'Br', 'O', 'S'],
    moleculas: ['H2O', 'H2S', 'CH4', 'O2', 'NH3', 'PH3', 'CO2', 'CCl4'], semimetales: true, propiedades: false,
  },
  dificil: {
    tipos: ['ionico', 'ionico', 'covalente', 'covalente', 'clasifica', 'pinta'],
    metales: ['Li', 'Na', 'K', 'Mg', 'Ca', 'Al'], nometales: ['F', 'Cl', 'Br', 'O', 'S', 'N'],
    moleculas: ['O2', 'NH3', 'CO2', 'N2', 'HCN', 'CH2O', 'CCl4'], semimetales: true, propiedades: true,
  },
}
// Máximo de átomos de cada clase en la bandeja del compuesto iónico.
export const MAX_ATOMOS = 3

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const mcd = (a, b) => (b ? mcd(b, a % b) : a)

export function enlaceDe(a, b) {
  const ta = ELEMENTOS[a].tipo, tb = ELEMENTOS[b].tipo
  if (ta === 'm' && tb === 'm') return 'metalico'
  if (ta === 'm' || tb === 'm') return 'ionico'
  return 'covalente'
}

const SUB = { 1: '', 2: '₂', 3: '₃', 4: '₄' }
// Cuántos átomos de metal y de no metal lleva el compuesto iónico (simplificado).
export function proporcion(metal, nometal) {
  const cm = ELEMENTOS[metal].carga, cn = -ELEMENTOS[nometal].carga
  const g = mcd(cm, cn)
  return { m: cn / g, n: cm / g }
}
export function formulaIonica(metal, nometal) {
  const { m, n } = proporcion(metal, nometal)
  return `${metal}${SUB[m]}${nometal}${SUB[n]}`
}
export const textoCarga = c => (c > 0 ? `${c === 1 ? '' : c}+` : `${c === -1 ? '' : -c}−`)
const SUP = { 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', '+': '⁺', '−': '⁻' }
export const ionTexto = (el, c) => `${el}${textoCarga(c).split('').map(x => SUP[x] ?? x).join('')}`

let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, cfg, rand)
    const clave = r.clave
    if (intento < 20 && recientes.includes(clave)) continue
    recientes.push(clave)
    if (recientes.length > 5) recientes.shift()
    return r
  }
}

function genUna(nivel, cfg, rand) {
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'ionico') {
      const metal = elige(rand, cfg.metales), nometal = elige(rand, cfg.nometales)
      // AlCl₃ y compañía tienen mucho carácter covalente: fuera.
      if (metal === 'Al' && ['F', 'Cl', 'Br'].includes(nometal)) continue
      const { m, n } = proporcion(metal, nometal)
      // En difícil, sobre todo los que necesitan más de un átomo de algo.
      if (nivel === 'dificil' && m === 1 && n === 1 && rand() < 0.6) continue
      return { ...base, clave: `${metal}${nometal}`, metal, nometal, m, n, bueno: `${m}:${n}:1` }
    }

    if (tipo === 'covalente') {
      const mol = molecula(elige(rand, cfg.moleculas))
      return { ...base, clave: mol.id, molecula: mol.id, bueno: soluciones(mol)[0] }
    }

    if (tipo === 'pinta') {
      const pool = cfg.semimetales ? [...PINTABLES, ...SEMIMETALES] : PINTABLES
      const els = baraja(rand, pool).slice(0, 5)
      const tipos = els.map(e => ELEMENTOS[e].tipo)
      if (tipos.filter(t => t === 'm').length < 2 || tipos.filter(t => t === 'n').length < 2) continue
      // El H, que está con los metales en la tabla, sale a menudo: es la trampa.
      if (!els.includes('H') && rand() < 0.4) continue
      return { ...base, clave: els.join(''), elementos: els, colores: cfg.semimetales ? ['m', 'n', 's'] : ['m', 'n'], bueno: 'pinta:0' }
    }

    // clasifica: cuatro sustancias (o propiedades) de al menos tres clases
    const items = []
    const sus = baraja(rand, SUSTANCIAS.map(x => `s:${x.f}`))
    if (cfg.propiedades) {
      const props = baraja(rand, Object.entries(PROPIEDADES).flatMap(([c, ps]) => ps.map((_, i) => `p:${c}:${i}`)))
      items.push(...sus.slice(0, 2), ...props.slice(0, 2))
    } else items.push(...sus.slice(0, 4))
    const clases = items.map(claseDe)
    if (new Set(clases).size < 3) continue
    return { ...base, clave: items.join('|'), items: baraja(rand, items), clases: Object.keys(CLASES), bueno: 'clasifica:0' }
  }
}
export const claseDe = item => (item.startsWith('s:') ? SUSTANCIAS.find(x => x.f === item.slice(2)).clase : item.split(':')[1])

export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuestas que manda la pantalla:
//   ionico     «átomosMetal:átomosNoMetal:1 si todos completos»
//   covalente  órdenes de enlace «2,2»
//   pinta / clasifica  «pinta:fallos» / «clasifica:fallos»
export function esCorrecta(r, o) {
  return String(o) === r.bueno
}

// ── Textos ────────────────────────────────────────────────────────────────
const nombre = (el, l) => tx(ELEMENTOS[el].n, l)
const TIPO_EL = { m: T('metal', 'metal', 'metall'), n: T('no metal', 'non-metal', 'no metall'), s: T('semimetal', 'metalloid', 'semimetall'), g: T('gas noble', 'noble gas', 'gas noble') }
export const nombreTipo = (t, l) => tx(TIPO_EL[t], l)
export const textoItem = (item, l) => {
  if (item.startsWith('s:')) { const x = SUSTANCIAS.find(y => y.f === item.slice(2)); return `${x.f} · ${tx(x.n, l)}` }
  const [, c, i] = item.split(':')
  return tx(PROPIEDADES[c][+i], l)
}
// Texto de un enlace: «C=O», con el símbolo según el orden.
const RAYA = { 1: '–', 2: '=', 3: '≡' }
export function dibujoEnlaces(mol, ordenes) {
  return mol.enlaces.map(([a, b], i) => `${mol.atomos[a][0]}${RAYA[ordenes[i]]}${mol.atomos[b][0]}`).join(', ')
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'ionico': return s(l, `Pasa electrones del ${nombre(r.metal, l).toLowerCase()} al ${nombre(r.nometal, l).toLowerCase()} hasta que todos completen su capa`, `Move electrons from ${nombre(r.metal, l).toLowerCase()} to ${nombre(r.nometal, l).toLowerCase()} until every atom has a full shell`, `Passa electrons del ${nombre(r.metal, l).toLowerCase()} al ${nombre(r.nometal, l).toLowerCase()} fins que tots completin la capa`)
    case 'covalente': { const m = molecula(r.molecula); return s(l, `Une los átomos del ${tx(m.n, l)} (${m.f}): que todos completen su octeto`, `Join the atoms of ${tx(m.n, l)} (${m.f}): every atom must complete its octet`, `Uneix els àtoms del ${tx(m.n, l)} (${m.f}): que tots completin l’octet`) }
    case 'pinta': return s(l, 'Pinta cada casilla marcada: ¿metal o no metal?', 'Paint each marked square: metal or non-metal?', 'Pinta cada casella marcada: metall o no metall?')
    default: return s(l, 'Coloca cada una en su tipo de sustancia', 'Put each one in its type of substance', 'Col·loca cadascuna al seu tipus de substància')
  }
}


export function explicacion(r, l) {
  switch (r.tipo) {
    case 'ionico': {
      const cm = ELEMENTOS[r.metal].carga, cn = ELEMENTOS[r.nometal].carga
      return s(l,
        `El ${nombre(r.metal, l).toLowerCase()} es un metal: le sobran ${cm} electrón(es) y los cede (${ionTexto(r.metal, cm)}). Al ${nombre(r.nometal, l).toLowerCase()} le faltan ${-cn} y los gana (${ionTexto(r.nometal, cn)}). Hacen falta ${r.m} de uno y ${r.n} de otro para que no sobre ni falte ninguno: ${formulaIonica(r.metal, r.nometal)}. Enlace iónico.`,
        `${nombre(r.metal, l)} is a metal: it has ${cm} spare electron(s) and gives them up (${ionTexto(r.metal, cm)}). ${nombre(r.nometal, l)} is ${-cn} short and gains them (${ionTexto(r.nometal, cn)}). You need ${r.m} of one and ${r.n} of the other so none are left over or missing: ${formulaIonica(r.metal, r.nometal)}. Ionic bond.`,
        `El ${nombre(r.metal, l).toLowerCase()} és un metall: li sobren ${cm} electró(ns) i els cedeix (${ionTexto(r.metal, cm)}). Al ${nombre(r.nometal, l).toLowerCase()} li’n falten ${-cn} i els guanya (${ionTexto(r.nometal, cn)}). Calen ${r.m} d’un i ${r.n} de l’altre perquè no en sobri ni en falti cap: ${formulaIonica(r.metal, r.nometal)}. Enllaç iònic.`)
    }
    case 'covalente': {
      const m = molecula(r.molecula)
      const ords = r.bueno.split(',').map(Number)
      const lista = [...new Set(m.atomos.map(a => a[0]))].map(el => `${el} ${ELEMENTOS[el].enlaces}`).join(', ')
      return s(l,
        `Son no metales: comparten electrones (enlace covalente). Cada átomo forma tantos enlaces como electrones le faltan para el octeto (el H, para tener dos): ${lista}. Así queda ${dibujoEnlaces(m, ords)}.`,
        `They are non-metals: they share electrons (covalent bond). Each atom forms as many bonds as electrons it is short of an octet (H, to have two): ${lista}. So: ${dibujoEnlaces(m, ords)}.`,
        `Són no metalls: comparteixen electrons (enllaç covalent). Cada àtom forma tants enllaços com electrons li falten per a l’octet (l’H, per tenir-ne dos): ${lista}. Així queda ${dibujoEnlaces(m, ords)}.`)
    }
    case 'pinta': {
      const lista = r.elementos.map(e => `${e}: ${nombreTipo(ELEMENTOS[e].tipo, l)}`).join(' · ')
      const h = r.elementos.includes('H') ? s(l, ' Ojo: el hidrógeno está en el grupo 1, pero es un no metal.', ' Careful: hydrogen is in group 1 but it is a non-metal.', ' Compte: l’hidrogen és al grup 1, però és un no metall.') : ''
      return `${lista}.${h} ${s(l, 'La escalera que baja desde el boro separa los metales (izquierda) de los no metales (derecha).', 'The staircase going down from boron separates metals (left) from non-metals (right).', 'L’escala que baixa des del bor separa els metalls (esquerra) dels no metalls (dreta).')}`
    }
    default:
      return r.items.map(it => `${it.startsWith('s:') ? it.slice(2) : '«…»'} → ${tx(CLASES[claseDe(it)], l).toLowerCase()}`).join(' · ')
  }
}

export function schemaQuestion(r, l) {
  switch (r.tipo) {
    case 'ionico': {
      const bueno = formulaIonica(r.metal, r.nometal)
      const malas = [`${r.metal}${r.nometal}`, `${r.metal}${r.nometal}₂`, `${r.metal}₂${r.nometal}`, `${r.metal}₂${r.nometal}₃`, `${r.metal}₃${r.nometal}₂`].filter(f => f !== bueno).slice(0, 3)
      return { question: s(l, `¿Cuál es la fórmula del compuesto iónico de ${nombre(r.metal, l).toLowerCase()} y ${nombre(r.nometal, l).toLowerCase()}?`, `What is the formula of the ionic compound of ${nombre(r.metal, l).toLowerCase()} and ${nombre(r.nometal, l).toLowerCase()}?`, `Quina és la fórmula del compost iònic de ${nombre(r.metal, l).toLowerCase()} i ${nombre(r.nometal, l).toLowerCase()}?`), correctAnswer: bueno, wrongAnswers: malas }
    }
    case 'covalente': {
      const m = molecula(r.molecula)
      const ords = r.bueno.split(',').map(Number)
      const malas = [ords.map(() => 1), ords.map(o => Math.min(3, o + 1)), ords.map(() => 2), ords.map(() => 3)].map(x => dibujoEnlaces(m, x)).filter((t, i, a) => t !== dibujoEnlaces(m, ords) && a.indexOf(t) === i).slice(0, 3)
      return { question: s(l, `¿Cómo se unen los átomos en la molécula de ${m.f}?`, `How are the atoms joined in the ${m.f} molecule?`, `Com s’uneixen els àtoms a la molècula de ${m.f}?`), correctAnswer: dibujoEnlaces(m, ords), wrongAnswers: malas }
    }
    case 'pinta': {
      const e = r.elementos[0]
      return { question: s(l, `¿El ${nombre(e, l).toLowerCase()} (${e}) es un metal, un no metal o un semimetal?`, `Is ${nombre(e, l).toLowerCase()} (${e}) a metal, a non-metal or a metalloid?`, `El ${nombre(e, l).toLowerCase()} (${e}) és un metall, un no metall o un semimetall?`), correctAnswer: nombreTipo(ELEMENTOS[e].tipo, l), wrongAnswers: ['m', 'n', 's'].filter(t => t !== ELEMENTOS[e].tipo).map(t => nombreTipo(t, l)) }
    }
    default: {
      const it = r.items.find(x => x.startsWith('s:'))
      const c = claseDe(it)
      return { question: s(l, `¿Qué tipo de sustancia es ${textoItem(it, l)}?`, `What kind of substance is ${textoItem(it, l)}?`, `Quin tipus de substància és ${textoItem(it, l)}?`), correctAnswer: tx(CLASES[c], l), wrongAnswers: Object.keys(CLASES).filter(x => x !== c).map(x => tx(CLASES[x], l)) }
    }
  }
}
