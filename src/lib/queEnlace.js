// ¿Qué Enlace? (química · el enlace químico, 3.º-4.º de ESO y Bachillerato).
//
// Una tabla periódica en miniatura (periodos 1-4, grupos principales y tres
// metales de transición) con los elementos de la pregunta marcados. Al
// corregir se colorea: metales, no metales y semimetales.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   enlace      dos elementos → iónico, covalente o metálico  (el H no es un metal aunque esté en el grupo 1)
//   sustancia   una sustancia real → iónica, molecular, red covalente o metálica
//               (el diamante y el cuarzo no son moleculares)
//   propiedades unas propiedades → qué tipo de sustancia     (la iónica solo conduce fundida o disuelta)
//   ion         qué ion forma un elemento                     (los metales pierden electrones: catión)
//   formula     la fórmula del compuesto iónico               (cruzar las cargas: MgCl₂, no MgCl)
//   enlaces     cuántos enlaces covalentes forma un átomo     (los que le faltan para el octeto)
//
// Solo casos indiscutibles en ESO: fuera los semimetales en las parejas y el
// AlCl₃ (con mucho carácter covalente).

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

// Elementos que se usan en las parejas (sin semimetales ni gases nobles).
const PAREJAS = ['H', 'Li', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'P', 'S', 'Cl', 'K', 'Ca', 'Fe', 'Cu', 'Zn', 'Br']

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

export const NIVELES = {
  facil:   { tipos: ['enlace', 'enlace', 'enlace', 'sustancia'] },
  medio:   { tipos: ['enlace', 'sustancia', 'sustancia', 'propiedades', 'enlaces'] },
  dificil: { tipos: ['propiedades', 'ion', 'ion', 'formula', 'formula', 'enlaces'] },
}

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
// Fórmula del compuesto iónico entre un metal (carga +) y un no metal (carga −).
export function formulaIonica(metal, nometal) {
  const cm = ELEMENTOS[metal].carga, cn = -ELEMENTOS[nometal].carga
  const g = mcd(cm, cn)
  return `${metal}${SUB[cn / g]}${nometal}${SUB[cm / g]}`
}
export const textoCarga = c => (c > 0 ? `${c === 1 ? '' : c}+` : `${c === -1 ? '' : -c}−`)
const SUP = { 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', '+': '⁺', '−': '⁻' }
export const ionTexto = (el, c) => `${el}${textoCarga(c).split('').map(x => SUP[x] ?? x).join('')}`

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'enlace') {
      const a = elige(rand, PAREJAS), b = elige(rand, PAREJAS)
      // Casos dudosos fuera: Al con halógenos (AlCl₃ es casi covalente) y el H con metales (hidruros).
      if (a === 'Al' && ['Cl', 'Br', 'F'].includes(b)) continue
      if (b === 'Al' && ['Cl', 'Br', 'F'].includes(a)) continue
      if ((a === 'H' && ELEMENTOS[b].tipo === 'm') || (b === 'H' && ELEMENTOS[a].tipo === 'm')) continue
      // Los de transición, solo con otros metales o con O, S y Cl (Zn₃P₂ y compañía no son de ESO).
      const trans = ['Fe', 'Cu', 'Zn']
      if ((trans.includes(a) && ELEMENTOS[b].tipo === 'n' && !['O', 'S', 'Cl'].includes(b)) || (trans.includes(b) && ELEMENTOS[a].tipo === 'n' && !['O', 'S', 'Cl'].includes(a))) continue
      const bueno = enlaceDe(a, b)
      // Equilibrar: que no salgan casi siempre iónicos.
      if (bueno === 'ionico' && rand() < 0.35) continue
      return { ...base, elementos: a === b ? [a] : [a, b], bueno, opciones: ['ionico', 'covalente', 'metalico'] }
    }

    if (tipo === 'sustancia') {
      const sus = elige(rand, SUSTANCIAS)
      const ops = nivel === 'facil' && sus.clase === 'red' ? null : Object.keys(CLASES)
      if (!ops) continue
      return { ...base, sustancia: sus.f, bueno: sus.clase, opciones: ops }
    }

    if (tipo === 'propiedades') {
      const clase = elige(rand, Object.keys(PROPIEDADES))
      const i = Math.floor(rand() * PROPIEDADES[clase].length)
      return { ...base, clase, i, bueno: clase, opciones: Object.keys(CLASES) }
    }

    if (tipo === 'ion') {
      const el = elige(rand, Object.keys(ELEMENTOS).filter(k => ELEMENTOS[k].carga && k !== 'H'))
      const c = ELEMENTOS[el].carga
      const bueno = ionTexto(el, c)
      // El signo al revés (el error de fondo) y cargas vecinas.
      const cands = baraja(rand, [ionTexto(el, -c), ionTexto(el, c > 0 ? c + 1 : c - 1), ionTexto(el, c > 0 ? Math.max(1, c - 1) : Math.min(-1, c + 1)), ionTexto(el, c > 0 ? c + 2 : c - 2), ionTexto(el, c > 0 ? -(c + 1) : -c + 1)])
      const ops = [...new Set([bueno, ...cands])].slice(0, 4)
      if (ops.length < 4) continue
      return { ...base, elementos: [el], bueno, opciones: baraja(rand, ops) }
    }

    if (tipo === 'formula') {
      const metales = ['Li', 'Na', 'K', 'Mg', 'Ca', 'Al'], nometales = ['F', 'Cl', 'Br', 'O', 'S', 'N']
      const m = elige(rand, metales), n = elige(rand, nometales)
      if (m === 'Al' && ['F', 'Cl', 'Br'].includes(n)) continue
      const bueno = formulaIonica(m, n)
      const cm = ELEMENTOS[m].carga, cn = -ELEMENTOS[n].carga
      const cands = [`${m}${n}`, `${m}${SUB[cm] || ''}${n}${SUB[cn] || ''}`, `${m}${n}${SUB[cm + cn] || ''}`, `${m}${SUB[2]}${n}`, `${m}${n}${SUB[2]}`, `${m}${SUB[3]}${n}${SUB[2]}`]
      // Fuera los distractores neutros: «Ca₂S₂» cuadra las cargas aunque no esté simplificada.
      const neutra = f => [...f.matchAll(/([A-Z][a-z]?)([₂₃₄]?)/g)].reduce((t, [, el, sub]) => t + ELEMENTOS[el].carga * ({ '₂': 2, '₃': 3, '₄': 4 }[sub] ?? 1), 0) === 0
      const ops = [...new Set([bueno, ...baraja(rand, cands).filter(f => !neutra(f))])].slice(0, 4)
      if (ops.length < 4) continue
      return { ...base, elementos: [m, n], bueno, opciones: baraja(rand, ops) }
    }

    // enlaces covalentes
    const el = elige(rand, ['H', 'C', 'N', 'O', 'F', 'P', 'S', 'Cl', 'Br'])
    const bueno = ELEMENTOS[el].enlaces
    const grupo = GRUPO_COL[ELEMENTOS[el].col]
    const ops = [...new Set([bueno, 1, 2, 3, 4, el === 'H' ? null : grupo - 10].filter(x => x && x > 0 && x <= 7))]
    return { ...base, elementos: [el], bueno, opciones: baraja(rand, ops.slice(0, 4).includes(bueno) ? ops.slice(0, 4) : [bueno, ...ops.filter(o => o !== bueno).slice(0, 3)]) }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const nombre = (el, l) => tx(ELEMENTOS[el].n, l)
const sus = f => SUSTANCIAS.find(x => x.f === f)
const TIPO_EL = { m: T('metal', 'metal', 'metall'), n: T('no metal', 'non-metal', 'no metall') }

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'enlace': return tx(ENLACES[o], l)
    case 'sustancia': case 'propiedades': return tx(CLASES[o], l)
    case 'enlaces': return s(l, `${o} ${o === 1 ? 'enlace' : 'enlaces'}`, `${o} ${o === 1 ? 'bond' : 'bonds'}`, `${o} ${o === 1 ? 'enllaç' : 'enllaços'}`)
    default: return o
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'enlace': {
      const [a, b] = r.elementos
      return b
        ? s(l, `¿Qué tipo de enlace se forma entre el ${nombre(a, l).toLowerCase()} (${a}) y el ${nombre(b, l).toLowerCase()} (${b})?`, `What type of bond forms between ${nombre(a, l).toLowerCase()} (${a}) and ${nombre(b, l).toLowerCase()} (${b})?`, `Quin tipus d’enllaç es forma entre el ${nombre(a, l).toLowerCase()} (${a}) i el ${nombre(b, l).toLowerCase()} (${b})?`)
        : s(l, `¿Qué tipo de enlace une los átomos de ${nombre(a, l).toLowerCase()} (${a}) entre sí?`, `What type of bond holds ${nombre(a, l).toLowerCase()} (${a}) atoms together?`, `Quin tipus d’enllaç uneix els àtoms de ${nombre(a, l).toLowerCase()} (${a}) entre ells?`)
    }
    case 'sustancia': { const x = sus(r.sustancia); return s(l, `¿Qué tipo de sustancia es ${tx(x.n, l)} (${x.f})?`, `What kind of substance is ${tx(x.n, l)} (${x.f})?`, `Quin tipus de substància és ${tx(x.n, l)} (${x.f})?`) }
    case 'propiedades': return `${tx(PROPIEDADES[r.clase][r.i], l)} ${s(l, '¿Qué tipo de sustancia es?', 'What kind of substance is it?', 'Quin tipus de substància és?')}`
    case 'ion': return s(l, `¿Qué ion forma el ${nombre(r.elementos[0], l).toLowerCase()} para cumplir la regla del octeto?`, `What ion does ${nombre(r.elementos[0], l).toLowerCase()} form to complete its octet?`, `Quin ió forma el ${nombre(r.elementos[0], l).toLowerCase()} per complir la regla de l’octet?`)
    case 'formula': return s(l, `¿Cuál es la fórmula del compuesto iónico que forman el ${nombre(r.elementos[0], l).toLowerCase()} y el ${nombre(r.elementos[1], l).toLowerCase()}?`, `What is the formula of the ionic compound formed by ${nombre(r.elementos[0], l).toLowerCase()} and ${nombre(r.elementos[1], l).toLowerCase()}?`, `Quina és la fórmula del compost iònic que formen el ${nombre(r.elementos[0], l).toLowerCase()} i el ${nombre(r.elementos[1], l).toLowerCase()}?`)
    default: return s(l, `¿Cuántos enlaces covalentes forma normalmente un átomo de ${nombre(r.elementos[0], l).toLowerCase()} (${r.elementos[0]})?`, `How many covalent bonds does a ${nombre(r.elementos[0], l).toLowerCase()} (${r.elementos[0]}) atom usually form?`, `Quants enllaços covalents forma normalment un àtom de ${nombre(r.elementos[0], l).toLowerCase()} (${r.elementos[0]})?`)
  }
}

const POR_CLASE = {
  ionica: T('Iónica: iones positivos y negativos ordenados en una red cristalina. Son sólidos duros con punto de fusión alto; no conducen en sólido porque los iones están quietos, pero sí fundidos o disueltos, cuando los iones se pueden mover.', 'Ionic: positive and negative ions ordered in a crystal lattice. They are hard solids with high melting points; they do not conduct as solids because the ions are fixed, but they do when molten or dissolved, when the ions can move.', 'Iònica: ions positius i negatius ordenats en una xarxa cristal·lina. Són sòlids durs amb punt de fusió alt; no condueixen en sòlid perquè els ions estan quiets, però sí fosos o dissolts, quan els ions es poden moure.'),
  molecular: T('Covalente molecular: moléculas sueltas con enlaces covalentes dentro y fuerzas débiles entre ellas. Por eso muchas son gases o líquidos, funden y hierven a poca temperatura y no conducen.', 'Molecular covalent: separate molecules with covalent bonds inside and weak forces between them. That is why many are gases or liquids, melt and boil at low temperatures and do not conduct.', 'Covalent molecular: molècules soltes amb enllaços covalents a dins i forces febles entre elles. Per això moltes són gasos o líquids, es fonen i bullen a poca temperatura i no condueixen.'),
  red: T('Red covalente: millones de átomos unidos todos por enlaces covalentes en una red gigante, sin moléculas sueltas. Para fundirla hay que romper esos enlaces: son durísimas, funden a temperaturas altísimas y no conducen. Diamante y cuarzo son los ejemplos clásicos.', 'Giant covalent: millions of atoms all joined by covalent bonds in a huge network, with no separate molecules. To melt it you must break those bonds: they are extremely hard, melt at very high temperatures and do not conduct. Diamond and quartz are the classic examples.', 'Xarxa covalent: milions d’àtoms units tots per enllaços covalents en una xarxa gegant, sense molècules soltes. Per fondre-la cal trencar aquests enllaços: són duríssimes, es fonen a temperatures altíssimes i no condueixen. El diamant i el quars en són els exemples clàssics.'),
  metalica: T('Metálica: cationes metálicos en un «mar» de electrones que se mueven libremente. Esos electrones libres explican que conduzcan la electricidad y el calor en sólido, que brillen y que se puedan estirar en hilos y láminas.', 'Metallic: metal cations in a “sea” of electrons that move freely. Those free electrons explain why they conduct electricity and heat as solids, why they shine and why they can be drawn into wires and sheets.', 'Metàl·lica: cations metàl·lics en un «mar» d’electrons que es mouen lliurement. Aquests electrons lliures expliquen que condueixin l’electricitat i la calor en sòlid, que brillin i que es puguin estirar en fils i làmines.'),
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'enlace': {
      const [a, b] = r.elementos
      const ta = tx(TIPO_EL[ELEMENTOS[a].tipo], l), tb = b ? tx(TIPO_EL[ELEMENTOS[b].tipo], l) : ta
      const regla = {
        ionico: s(l, 'metal con no metal → iónico: el metal cede electrones y el no metal los gana; se forman iones que se atraen.', 'metal with non-metal → ionic: the metal gives up electrons and the non-metal gains them; the ions formed attract each other.', 'metall amb no metall → iònic: el metall cedeix electrons i el no metall els guanya; es formen ions que s’atrauen.'),
        covalente: s(l, 'no metal con no metal → covalente: los dos quieren ganar electrones, así que los comparten.', 'non-metal with non-metal → covalent: both want to gain electrons, so they share them.', 'no metall amb no metall → covalent: tots dos volen guanyar electrons, així que els comparteixen.'),
        metalico: s(l, 'metal con metal → metálico: los átomos sueltan sus electrones de valencia, que quedan libres entre los cationes.', 'metal with metal → metallic: the atoms release their outer electrons, which move freely among the cations.', 'metall amb metall → metàl·lic: els àtoms deixen anar els electrons de valència, que queden lliures entre els cations.'),
      }[r.bueno]
      const h = [a, b].includes('H') ? s(l, ' Ojo: el hidrógeno está en el grupo 1, pero es un no metal.', ' Careful: hydrogen is in group 1 but it is a non-metal.', ' Compte: l’hidrogen és al grup 1, però és un no metall.') : ''
      return `${b ? `${a}: ${ta}; ${b}: ${tb}.` : `${a}: ${ta}.`} ${regla.charAt(0).toUpperCase()}${regla.slice(1)}${h}`
    }
    case 'sustancia': case 'propiedades': return tx(POR_CLASE[r.bueno], l)
    case 'ion': {
      const el = r.elementos[0], c = ELEMENTOS[el].carga
      return c > 0
        ? s(l, `El ${nombre(el, l).toLowerCase()} es un metal con ${c} electrón(es) en la última capa: le resulta más fácil perderlos que ganar los que le faltan. Al perder ${c}, queda con carga ${textoCarga(c)}: ${r.bueno}.`, `${nombre(el, l)} is a metal with ${c} electron(s) in its outer shell: it is easier to lose them than to gain the rest. Losing ${c} leaves a charge of ${textoCarga(c)}: ${r.bueno}.`, `El ${nombre(el, l).toLowerCase()} és un metall amb ${c} electró(ns) a l’última capa: li resulta més fàcil perdre’ls que guanyar els que li falten. En perdre’n ${c}, queda amb càrrega ${textoCarga(c)}: ${r.bueno}.`)
        : s(l, `El ${nombre(el, l).toLowerCase()} tiene ${8 + c} electrones en la última capa: le faltan ${-c} para el octeto, así que los gana y queda con carga ${textoCarga(c)}: ${r.bueno}.`, `${nombre(el, l)} has ${8 + c} electrons in its outer shell: it is ${-c} short of an octet, so it gains them and ends with a charge of ${textoCarga(c)}: ${r.bueno}.`, `El ${nombre(el, l).toLowerCase()} té ${8 + c} electrons a l’última capa: n’hi falten ${-c} per a l’octet, així que els guanya i queda amb càrrega ${textoCarga(c)}: ${r.bueno}.`)
    }
    case 'formula': {
      const [m, n] = r.elementos
      const cm = ELEMENTOS[m].carga, cn = ELEMENTOS[n].carga
      return s(l,
        `Los iones son ${ionTexto(m, cm)} y ${ionTexto(n, cn)}. El compuesto tiene que ser neutro: se toman tantos de cada uno como para que las cargas se anulen (se «cruzan» las cargas y se simplifica). Resultado: ${r.bueno}.`,
        `The ions are ${ionTexto(m, cm)} and ${ionTexto(n, cn)}. The compound must be neutral: take enough of each so the charges cancel (“cross over” the charges and simplify). Result: ${r.bueno}.`,
        `Els ions són ${ionTexto(m, cm)} i ${ionTexto(n, cn)}. El compost ha de ser neutre: se’n prenen tants de cadascun com calgui perquè les càrregues s’anul·lin (es «creuen» les càrregues i se simplifica). Resultat: ${r.bueno}.`)
    }
    default: {
      const el = r.elementos[0]
      return el === 'H'
        ? s(l, 'El hidrógeno solo tiene un electrón y se completa con dos (como el helio): forma 1 enlace.', 'Hydrogen has just one electron and is complete with two (like helium): it forms 1 bond.', 'L’hidrogen només té un electró i es completa amb dos (com l’heli): forma 1 enllaç.')
        : s(l, `El ${nombre(el, l).toLowerCase()} tiene ${8 - r.bueno} electrones de valencia: le faltan ${r.bueno} para el octeto, y cada enlace covalente le aporta uno compartido. Por eso forma ${r.bueno}.`, `${nombre(el, l)} has ${8 - r.bueno} valence electrons: it is ${r.bueno} short of an octet, and each covalent bond gives it one shared electron. So it forms ${r.bueno}.`, `El ${nombre(el, l).toLowerCase()} té ${8 - r.bueno} electrons de valència: n’hi falten ${r.bueno} per a l’octet, i cada enllaç covalent n’hi aporta un de compartit. Per això en forma ${r.bueno}.`)
    }
  }
}

export function schemaQuestion(r, l) {
  return {
    question: enunciado(r, l),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
