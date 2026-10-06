// El Laboratorio (química · mezclas y separación, primaria y ESO): sale una
// mezcla dibujada en un vaso y hay que elegir cómo separarla.
//
// Tipos de pregunta:
//   metodo     ¿qué método usas? (filtrar, tamizar, imán, decantar,
//              evaporar, destilar, cromatografía)
//   propiedad  ¿en qué propiedad se basa esa separación?
//   tipo       ¿es una mezcla homogénea o heterogénea?
//   secuencia  mezclas de tres componentes: el orden de los pasos
//
// Las secuencias equivocadas están escritas a mano y son INVÁLIDAS de verdad
// (filtrar dos sólidos secos, evaporar antes de filtrar, decantar dos
// líquidos que se mezclan...): en el laboratorio a menudo hay más de un
// camino bueno, así que nunca se ofrece como distractor uno que también
// funcione (p. ej. «decantar la arena y destilar» en agua + arena + sal).
//
// Niveles: facil → metodo con los 5 métodos básicos; medio → metodo (+
// destilar y cromatografía), propiedad y tipo; dificil → secuencia, metodo y
// propiedad.

const T = (es, en, ca) => ({ es, en, ca })

export const METODOS = {
  filtrar:   { nombre: T('Filtrar', 'Filter', 'Filtrar'), emoji: '☕',
    propiedad: 'solubilidad',
    como: T('Se pasa por un papel de filtro: el líquido atraviesa y el sólido que no se ha disuelto se queda arriba.', 'It goes through filter paper: the liquid passes and the undissolved solid stays on top.', 'Es passa per un paper de filtre: el líquid el travessa i el sòlid que no s’ha dissolt es queda a dalt.') },
  tamizar:   { nombre: T('Tamizar', 'Sieve', 'Tamisar'), emoji: '🕸️',
    propiedad: 'tamano',
    como: T('Un tamiz (un colador) deja pasar los trozos pequeños y retiene los grandes.', 'A sieve lets the small bits through and keeps the big ones.', 'Un tamís (un colador) deixa passar els trossos petits i reté els grans.') },
  iman:      { nombre: T('Imán', 'Magnet', 'Imant'), emoji: '🧲',
    propiedad: 'magnetismo',
    como: T('El imán atrae el hierro y deja todo lo demás.', 'The magnet attracts the iron and leaves everything else.', 'L’imant atrau el ferro i deixa tota la resta.') },
  decantar:  { nombre: T('Decantar', 'Decant', 'Decantar'), emoji: '⚗️',
    propiedad: 'densidad',
    como: T('Se deja reposar: lo más denso queda abajo y se separa con un embudo de decantación.', 'It is left to settle: the denser part sinks and is run off with a separating funnel.', 'Es deixa reposar: el que és més dens queda a baix i se separa amb un embut de decantació.') },
  evaporar:  { nombre: T('Evaporar', 'Evaporate', 'Evaporar'), emoji: '🔥',
    propiedad: 'volatilidad',
    como: T('Se calienta o se deja al sol: el agua se va y el sólido disuelto queda en forma de cristales.', 'It is heated or left in the sun: the water goes and the dissolved solid is left as crystals.', 'S’escalfa o es deixa al sol: l’aigua se’n va i el sòlid dissolt queda en forma de cristalls.') },
  destilar:  { nombre: T('Destilar', 'Distil', 'Destil·lar'), emoji: '🌡️',
    propiedad: 'ebullicion',
    como: T('Se calienta: hierve primero el líquido con el punto de ebullición más bajo, su vapor se enfría en un tubo y se recoge aparte.', 'It is heated: the liquid with the lowest boiling point boils first, its vapour is cooled in a tube and collected separately.', 'S’escalfa: bull primer el líquid amb el punt d’ebullició més baix, el seu vapor es refreda en un tub i es recull a part.') },
  cromato:   { nombre: T('Cromatografía', 'Chromatography', 'Cromatografia'), emoji: '📄',
    propiedad: 'afinidad',
    como: T('Una tira de papel con la punta en un disolvente: cada sustancia sube a una velocidad distinta y quedan franjas de colores.', 'A paper strip dipped in a solvent: each substance climbs at a different speed, leaving bands of colour.', 'Una tira de paper amb la punta en un dissolvent: cada substància puja a una velocitat diferent i queden franges de colors.') },
  disolver:  { nombre: T('Disolver en agua', 'Dissolve in water', 'Dissoldre en aigua'), emoji: '💧',
    propiedad: 'solubilidad',
    como: T('Se añade agua y se remueve: lo soluble se disuelve y lo demás no.', 'Water is added and stirred: whatever is soluble dissolves and the rest does not.', 'S’hi afegeix aigua i es remou: el que és soluble es dissol i la resta no.') },
}

export const PROPIEDADES = {
  solubilidad: T('Solubilidad: un componente se disuelve y el otro no', 'Solubility: one part dissolves and the other does not', 'Solubilitat: un component es dissol i l’altre no'),
  tamano:      T('El tamaño de los trozos', 'The size of the pieces', 'La mida dels trossos'),
  magnetismo:  T('El magnetismo', 'Magnetism', 'El magnetisme'),
  densidad:    T('La densidad (y que no se mezclan)', 'Density (and that they do not mix)', 'La densitat (i que no es barregen)'),
  volatilidad: T('El líquido se evapora y el sólido no', 'The liquid evaporates and the solid does not', 'El líquid s’evapora i el sòlid no'),
  ebullicion:  T('Tienen puntos de ebullición distintos', 'They have different boiling points', 'Tenen punts d’ebullició diferents'),
  afinidad:    T('Cada sustancia avanza a distinta velocidad por el papel', 'Each substance moves at a different speed up the paper', 'Cada substància avança a velocitat diferent pel paper'),
}

// Cómo se dibuja cada componente en el vaso.
//   liquido: color de la capa (los inmiscibles, en capas por densidad)
//   grano:   [color, radio] de los trozos sólidos
//   disuelto: tiñe el líquido (no se ve como grano)
export const COMPONENTES = {
  agua:     { nombre: T('agua', 'water', 'aigua'), liquido: '#3B82F6', densidad: 1 },
  aceite:   { nombre: T('aceite', 'oil', 'oli'), liquido: '#EAB308', densidad: 0.92, inmiscible: true },
  alcohol:  { nombre: T('alcohol', 'alcohol', 'alcohol'), liquido: '#A78BFA', densidad: 0.79 },
  vinagre:  { nombre: T('vinagre', 'vinegar', 'vinagre'), liquido: '#FCD34D', densidad: 1.01 },
  arena:    { nombre: T('arena', 'sand', 'sorra'), grano: ['#D6B47A', 2.2] },
  piedras:  { nombre: T('piedras', 'stones', 'pedres'), grano: ['#94A3B8', 7] },
  garbanzos:{ nombre: T('garbanzos', 'chickpeas', 'cigrons'), grano: ['#E8C07D', 5.5] },
  arroz:    { nombre: T('arroz', 'rice', 'arròs'), grano: ['#F8FAFC', 2] },
  hierro:   { nombre: T('limaduras de hierro', 'iron filings', 'llimadures de ferro'), grano: ['#475569', 1.6] },
  clips:    { nombre: T('clips', 'paper clips', 'clips'), grano: ['#CBD5E1', 4] },
  azufre:   { nombre: T('azufre en polvo', 'sulphur powder', 'sofre en pols'), grano: ['#FDE047', 1.8] },
  cafe:     { nombre: T('café molido', 'ground coffee', 'cafè mòlt'), grano: ['#78350F', 2] },
  tiza:     { nombre: T('tiza en polvo', 'chalk dust', 'guix en pols'), grano: ['#F1F5F9', 1.6] },
  sal:      { nombre: T('sal', 'salt', 'sal'), disuelto: '#E2E8F0', grano: ['#F8FAFC', 1.8] },
  azucar:   { nombre: T('azúcar', 'sugar', 'sucre'), disuelto: '#FDE68A', grano: ['#FEF3C7', 1.8] },
  tinta:    { nombre: T('tintas de colores', 'coloured inks', 'tintes de colors'), disuelto: '#1F2937' },
  pigmentos:{ nombre: T('pigmentos de una hoja', 'leaf pigments', 'pigments d’una fulla'), disuelto: '#15803D' },
}

// Mezclas de dos componentes. `objetivo`: qué se quiere sacar, cuando el
// método depende de eso (agua salada: la sal se evapora, el agua se destila).
// `seco`: los sólidos están secos (sin líquido en el vaso).
const M = (id, componentes, metodo, tipo, extra = {}) => ({ id, componentes, metodo, tipo, ...extra })
export const MEZCLAS = [
  M('agua-arena', ['agua', 'arena'], 'filtrar', 'hetero'),
  M('agua-cafe', ['agua', 'cafe'], 'filtrar', 'hetero'),
  M('agua-tiza', ['agua', 'tiza'], 'filtrar', 'hetero'),
  M('arena-piedras', ['arena', 'piedras'], 'tamizar', 'hetero', { seco: true }),
  M('arroz-garbanzos', ['arroz', 'garbanzos'], 'tamizar', 'hetero', { seco: true }),
  M('hierro-arena', ['hierro', 'arena'], 'iman', 'hetero', { seco: true }),
  M('hierro-azufre', ['hierro', 'azufre'], 'iman', 'hetero', { seco: true }),
  M('clips-arroz', ['clips', 'arroz'], 'iman', 'hetero', { seco: true }),
  M('agua-aceite', ['agua', 'aceite'], 'decantar', 'hetero'),
  M('vinagre-aceite', ['vinagre', 'aceite'], 'decantar', 'hetero'),
  M('agua-sal', ['agua', 'sal'], 'evaporar', 'homo', { objetivo: 'sal', disuelto: true }),
  M('agua-azucar', ['agua', 'azucar'], 'evaporar', 'homo', { objetivo: 'azucar', disuelto: true }),
  M('agua-alcohol', ['agua', 'alcohol'], 'destilar', 'homo'),
  M('agua-mar', ['agua', 'sal'], 'destilar', 'homo', { objetivo: 'agua', disuelto: true }),
  M('tinta', ['agua', 'tinta'], 'cromato', 'homo', { disuelto: true }),
  M('hoja', ['alcohol', 'pigmentos'], 'cromato', 'homo', { disuelto: true }),
]

// Mezclas de tres componentes y el orden de los pasos. `malas`: secuencias
// que NO funcionan (comprobadas a mano, ver la cabecera).
const R = (id, componentes, buena, malas, extra = {}) => ({ id, componentes, buena, malas, ...extra })
export const RECETAS = [
  R('arena-sal', ['arena', 'sal'], ['disolver', 'filtrar', 'evaporar'],
    [['filtrar', 'evaporar'], ['disolver', 'evaporar', 'filtrar'], ['tamizar', 'evaporar']], { seco: true }),
  R('agua-arena-sal', ['agua', 'arena', 'sal'], ['filtrar', 'evaporar'],
    [['evaporar', 'filtrar'], ['iman', 'evaporar'], ['destilar', 'filtrar']], { disuelto: true }),
  R('hierro-arena-sal', ['hierro', 'arena', 'sal'], ['iman', 'disolver', 'filtrar', 'evaporar'],
    [['iman', 'filtrar', 'evaporar'], ['disolver', 'evaporar', 'filtrar', 'iman'], ['filtrar', 'iman', 'evaporar']], { seco: true }),
  R('agua-aceite-sal', ['agua', 'aceite', 'sal'], ['decantar', 'evaporar'],
    [['filtrar', 'evaporar'], ['iman', 'decantar'], ['tamizar', 'evaporar']], { disuelto: true }),
  R('agua-alcohol-arena', ['agua', 'alcohol', 'arena'], ['filtrar', 'destilar'],
    // (no vale «imán → destilar» como mala: destilando con la arena dentro también
    // salen los tres, la arena se queda en el matraz)
    [['decantar', 'filtrar'], ['evaporar', 'filtrar'], ['iman', 'filtrar']]),
  R('hierro-azufre-sal', ['hierro', 'azufre', 'sal'], ['iman', 'disolver', 'filtrar', 'evaporar'],
    [['iman', 'filtrar', 'evaporar'], ['disolver', 'iman', 'evaporar'], ['iman', 'disolver', 'evaporar', 'filtrar']], { seco: true }),
  R('garbanzos-arena-sal', ['garbanzos', 'arena', 'sal'], ['tamizar', 'disolver', 'filtrar', 'evaporar'],
    [['disolver', 'filtrar', 'evaporar'], ['tamizar', 'filtrar', 'evaporar'], ['iman', 'disolver', 'filtrar', 'evaporar']], { seco: true }),
]

// Respuestas que un libro también daría por buenas: nunca se ofrecen como
// distractor de ese método. Agua + arena también se decanta; el agua salada
// también deja la sal al destilarla; agua y aceite también se destilarían; la
// filtración se explica a menudo por el tamaño de partícula, la evaporación
// por el punto de ebullición y la destilación por la volatilidad.
export const TAMBIEN_VALE = {
  metodo: { filtrar: ['decantar'], evaporar: ['destilar'], decantar: ['destilar'] },
  propiedad: { filtrar: ['tamano'], evaporar: ['ebullicion'], destilar: ['volatilidad'] },
}

const BASICOS = ['filtrar', 'tamizar', 'iman', 'decantar', 'evaporar']
const TODOS = [...BASICOS, 'destilar', 'cromato']

export const NIVELES = {
  facil:   { tipos: ['metodo'], metodos: BASICOS },
  medio:   { tipos: ['metodo', 'metodo', 'propiedad', 'tipo'], metodos: TODOS },
  dificil: { tipos: ['secuencia', 'secuencia', 'metodo', 'propiedad'], metodos: TODOS },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const clave = sec => sec.join('>')
let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }
    if (tipo === 'secuencia') {
      const r = elige(rand, RECETAS)
      if (r.id === evitar) continue
      const opciones = baraja(rand, [r.buena, ...r.malas].map(clave))
      return { ...base, mezcla: r.id, componentes: r.componentes, seco: !!r.seco, disuelto: !!r.disuelto, bueno: clave(r.buena), opciones }
    }
    // Primero el método y luego la mezcla, para que salgan todos parejos.
    const metodo = elige(rand, cfg.metodos)
    const m = elige(rand, MEZCLAS.filter(x => x.metodo === metodo))
    if (!m || m.id === evitar) continue
    const comun = { mezcla: m.id, componentes: m.componentes, seco: !!m.seco, disuelto: !!m.disuelto, objetivo: m.objetivo ?? null, metodo }
    if (tipo === 'metodo') {
      const vetados = TAMBIEN_VALE.metodo[metodo] ?? []
      const otros = baraja(rand, cfg.metodos.filter(x => x !== metodo && !vetados.includes(x))).slice(0, 3)
      return { ...base, ...comun, bueno: metodo, opciones: baraja(rand, [metodo, ...otros]) }
    }
    if (tipo === 'propiedad') {
      const p = METODOS[metodo].propiedad
      const vetadas = TAMBIEN_VALE.propiedad[metodo] ?? []
      const otras = baraja(rand, Object.keys(PROPIEDADES).filter(x => x !== p && !vetadas.includes(x))).slice(0, 3)
      return { ...base, ...comun, bueno: p, opciones: baraja(rand, [p, ...otras]) }
    }
    return { ...base, ...comun, bueno: m.tipo, opciones: ['homo', 'hetero'] }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (o, l) => o[l] ?? o.es
const y = l => ({ es: ' y ', en: ' and ', ca: ' i ' })[l] ?? ' y '
export const nombreMetodo = (id, l) => tx(METODOS[id].nombre, l)

export function nombreMezcla(ronda, l) {
  const ns = ronda.componentes.map(c => tx(COMPONENTES[c].nombre, l))
  const lista = ns.length > 2 ? ns.slice(0, -1).join(', ') + y(l) + ns.at(-1) : ns.join(y(l))
  return lista.charAt(0).toUpperCase() + lista.slice(1)
}

export function textoOpcion(o, ronda, l) {
  if (ronda.tipo === 'secuencia') return o.split('>').map(m => nombreMetodo(m, l)).join(' → ')
  if (ronda.tipo === 'propiedad') return tx(PROPIEDADES[o], l)
  if (ronda.tipo === 'tipo') return o === 'homo' ? tx(T('Homogénea', 'Homogeneous', 'Homogènia'), l) : tx(T('Heterogénea', 'Heterogeneous', 'Heterogènia'), l)
  return nombreMetodo(o, l)
}

// Lo que se quiere sacar, con su artículo (el género no se adivina).
const OBJETIVO = { sal: T('la sal', 'the salt', 'la sal'), azucar: T('el azúcar', 'the sugar', 'el sucre'), agua: T('el agua', 'the water', 'l’aigua') }

export function enunciado(ronda, l) {
  const obj = ronda.objetivo ? tx(T(` Quieres quedarte con ${OBJETIVO[ronda.objetivo].es}.`, ` You want to keep ${OBJETIVO[ronda.objetivo].en}.`, ` Vols quedar-te amb ${OBJETIVO[ronda.objetivo].ca}.`), l) : ''
  switch (ronda.tipo) {
    case 'secuencia': return tx(T('¿Qué pasos sigues para separarla, y en qué orden?', 'Which steps do you follow to separate it, and in what order?', 'Quins passos segueixes per separar-la, i en quin ordre?'), l)
    case 'propiedad': return tx(T(`Se separa con «${nombreMetodo(ronda.metodo, 'es')}». ¿En qué propiedad se basa?`, `It is separated by «${nombreMetodo(ronda.metodo, 'en').toLowerCase()}». Which property is it based on?`, `Se separa amb «${nombreMetodo(ronda.metodo, 'ca')}». En quina propietat es basa?`), l)
    case 'tipo': return tx(T('¿Qué tipo de mezcla es?', 'What kind of mixture is it?', 'Quin tipus de mescla és?'), l)
    default: return tx(T('¿Cómo la separas?', 'How do you separate it?', 'Com la separes?'), l) + obj
  }
}

export function explicacion(ronda, l) {
  if (ronda.tipo === 'secuencia') {
    const r = RECETAS.find(x => x.id === ronda.mezcla)
    const pasos = r.buena.map((m, i) => `${i + 1}. ${nombreMetodo(m, l)}: ${tx(METODOS[m].como, l)}`).join(' ')
    return pasos
  }
  if (ronda.tipo === 'tipo') {
    return ronda.bueno === 'homo'
      ? tx(T('Homogénea: no se distinguen sus componentes, ni siquiera con lupa (una disolución).', 'Homogeneous: you cannot tell its parts apart, even with a magnifying glass (a solution).', 'Homogènia: no se’n distingeixen els components, ni tan sols amb lupa (una dissolució).'), l)
      : tx(T('Heterogénea: se ven sus componentes por separado (granos, capas o trozos).', 'Heterogeneous: you can see its parts separately (grains, layers or pieces).', 'Heterogènia: se’n veuen els components per separat (grans, capes o trossos).'), l)
  }
  const m = METODOS[ronda.metodo]
  return `${nombreMetodo(ronda.metodo, l)}: ${tx(m.como, l)} ${tx(T('Se basa en:', 'It relies on:', 'Es basa en:'), l)} ${tx(PROPIEDADES[m.propiedad], l).charAt(0).toLowerCase() + tx(PROPIEDADES[m.propiedad], l).slice(1)}.`
}

export function schemaQuestion(ronda, l) {
  return {
    question: `${nombreMezcla(ronda, l)}. ${enunciado(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}
