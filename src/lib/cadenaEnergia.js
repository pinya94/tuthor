// Cadena de energía (física · la energía, primaria y ESO): formas de energía
// y cómo se transforman unas en otras.
//
// Tipos de pregunta:
//   forma        una situación: ¿qué forma de energía tiene o guarda?
//   transforma   un aparato: ¿en qué transforma la energía (o de cuál parte)?
//   cadena       una cadena de varios pasos con un eslabón en blanco
//   rendimiento  energía que entra, útil y perdida (en calor): rendimiento o pérdida
//   mgh          energía potencial Ep = m·g·h y su conservación al caer
//
// Respuestas sin ambigüedad: en `transforma`, la forma que también sale como
// pérdida (casi siempre la térmica) nunca se ofrece como distractor, porque
// en parte también sería verdad (una bombilla da luz… y calor).
//
// Niveles: facil → forma, transforma; medio → forma, transforma, cadena;
// dificil → cadena, rendimiento, mgh.

const T = (es, en, ca) => ({ es, en, ca })

export const FORMAS = {
  cinetica:  { emoji: '💨', color: '#38BDF8', nombre: T('Cinética', 'Kinetic', 'Cinètica') },
  potencial: { emoji: '⬆️', color: '#A78BFA', nombre: T('Potencial gravitatoria', 'Gravitational potential', 'Potencial gravitatòria') },
  elastica:  { emoji: '🏹', color: '#F472B6', nombre: T('Elástica', 'Elastic', 'Elàstica') },
  quimica:   { emoji: '🔋', color: '#4ADE80', nombre: T('Química', 'Chemical', 'Química') },
  electrica: { emoji: '⚡', color: '#FACC15', nombre: T('Eléctrica', 'Electrical', 'Elèctrica') },
  termica:   { emoji: '🔥', color: '#F97316', nombre: T('Térmica', 'Thermal', 'Tèrmica') },
  luminosa:  { emoji: '💡', color: '#FDE68A', nombre: T('Luminosa', 'Light', 'Lluminosa') },
  sonora:    { emoji: '🔊', color: '#94A3B8', nombre: T('Sonora', 'Sound', 'Sonora') },
  nuclear:   { emoji: '☢️', color: '#EF4444', nombre: T('Nuclear', 'Nuclear', 'Nuclear') },
}

// Situaciones: qué forma de energía tiene o guarda algo.
// `veta`: formas que también serían en parte verdad y no se ofrecen como
// distractor (un coche en marcha también lleva química en el depósito).
const SI = (emoji, texto, forma, veta = []) => ({ emoji, texto, forma, veta })
export const SITUACIONES = [
  SI('🔋', T('Una pila sin usar', 'An unused battery', 'Una pila sense fer servir'), 'quimica'),
  SI('🍎', T('La comida que te vas a comer', 'The food you are about to eat', 'El menjar que et menjaràs'), 'quimica'),
  SI('⚽', T('Un balón rodando por el césped', 'A ball rolling across the grass', 'Una pilota rodolant per la gespa'), 'cinetica', ['elastica']),
  SI('🚗', T('Un coche circulando por la autopista', 'A car driving along the motorway', 'Un cotxe circulant per l’autopista'), 'cinetica', ['quimica', 'termica', 'sonora']),
  SI('💧', T('El agua quieta en lo alto de una presa', 'Still water at the top of a dam', 'L’aigua quieta a dalt d’una presa'), 'potencial'),
  SI('🧗', T('Una escaladora quieta en lo alto de la pared', 'A climber resting at the top of the wall', 'Una escaladora quieta a dalt de la paret'), 'potencial', ['quimica', 'termica']),
  SI('🏹', T('Un arco tensado a punto de disparar', 'A drawn bow about to shoot', 'Un arc tensat a punt de disparar'), 'elastica'),
  SI('🎯', T('Un muelle comprimido dentro de un juguete', 'A compressed spring inside a toy', 'Una molla comprimida dins d’una joguina'), 'elastica'),
  SI('☕', T('Una taza de chocolate muy caliente', 'A very hot cup of chocolate', 'Una tassa de xocolata molt calenta'), 'termica', ['quimica']),
  SI('☀️', T('La luz que llega del Sol', 'The light arriving from the Sun', 'La llum que arriba del Sol'), 'luminosa', ['nuclear', 'termica']),
  SI('🥁', T('El sonido de un tambor', 'The sound of a drum', 'El so d’un tambor'), 'sonora'),
  SI('⚛️', T('El uranio del combustible de una central nuclear', 'The uranium in a nuclear power station’s fuel', 'L’urani del combustible d’una central nuclear'), 'nuclear', ['quimica']),
  SI('🔌', T('La corriente que llega por el cable del enchufe', 'The current coming through the plug’s cable', 'El corrent que arriba pel cable de l’endoll'), 'electrica'),
]

// Aparatos: de qué forma a qué forma (útil) y qué se pierde.
// `pierde`: lo que también sale (no útil). Nunca se ofrece como distractor.
const AP = (emoji, nombre, entra, sale, pierde, nota = null) => ({ emoji, nombre, entra, sale, pierde: pierde ? [].concat(pierde) : [], nota })
export const APARATOS = [
  AP('💡', T('Bombilla', 'Light bulb', 'Bombeta'), 'electrica', 'luminosa', 'termica', T('Una bombilla antigua convierte en luz menos del 10 % de la energía; el resto se va en calor. Un LED aprovecha mucho más.', 'An old bulb turns less than 10% of the energy into light; the rest goes as heat. An LED uses much more of it.', 'Una bombeta antiga converteix en llum menys del 10 % de l’energia; la resta se’n va en calor. Un LED n’aprofita molta més.')),
  AP('🌀', T('Ventilador', 'Fan', 'Ventilador'), 'electrica', 'cinetica', ['termica', 'sonora']),
  AP('🔊', T('Altavoz', 'Loudspeaker', 'Altaveu'), 'electrica', 'sonora', 'termica'),
  AP('🍞', T('Tostadora', 'Toaster', 'Torradora'), 'electrica', 'termica', 'luminosa'),
  AP('🔋', T('Pila', 'Battery', 'Pila'), 'quimica', 'electrica', 'termica'),
  AP('🌞', T('Placa solar', 'Solar panel', 'Placa solar'), 'luminosa', 'electrica', 'termica'),
  AP('🚲', T('Dinamo de bicicleta', 'Bicycle dynamo', 'Dinamo de bicicleta'), 'cinetica', 'electrica', 'termica'),
  AP('🎤', T('Micrófono', 'Microphone', 'Micròfon'), 'sonora', 'electrica', null),
  AP('🚗', T('Motor de gasolina de un coche', 'Petrol car engine', 'Motor de gasolina d’un cotxe'), 'quimica', 'cinetica', ['termica', 'sonora'], T('El motor de gasolina se calienta muchísimo: más de dos tercios de la energía del combustible se pierden en calor.', 'A petrol engine gets very hot: more than two thirds of the fuel’s energy is lost as heat.', 'El motor de gasolina s’escalfa moltíssim: més de dos terços de l’energia del combustible es perden en calor.')),
  AP('🌿', T('Hoja de una planta (fotosíntesis)', 'Plant leaf (photosynthesis)', 'Fulla d’una planta (fotosíntesi)'), 'luminosa', 'quimica', null),
  AP('🏹', T('Arco al soltar la flecha', 'Bow as the arrow is released', 'Arc en deixar anar la fletxa'), 'elastica', 'cinetica', ['sonora', 'termica']),
  AP('🎢', T('Vagoneta de montaña rusa bajando', 'Roller-coaster car going down', 'Vagoneta de muntanya russa baixant'), 'potencial', 'cinetica', ['termica', 'sonora']),
  AP('🛑', T('Frenos de una bici al frenar', 'Bike brakes while braking', 'Frens d’una bici en frenar'), 'cinetica', 'termica', 'sonora', T('Por eso los frenos se calientan: la energía del movimiento se convierte en calor por el rozamiento.', 'That is why brakes get hot: the energy of motion turns into heat through friction.', 'Per això els frens s’escalfen: l’energia del moviment es converteix en calor pel fregament.')),
  AP('🏃', T('Tus músculos al correr', 'Your muscles when running', 'Els teus músculs en córrer'), 'quimica', 'cinetica', 'termica'),
]

// Cadenas de varios pasos: [formas en orden] con el aparato de cada paso.
const CA = (nombre, emoji, formas) => ({ nombre, emoji, formas })
export const CADENAS = [
  CA(T('Central hidroeléctrica', 'Hydroelectric power station', 'Central hidroelèctrica'), '🏞️', ['potencial', 'cinetica', 'electrica']),
  CA(T('Linterna', 'Torch', 'Llanterna'), '🔦', ['quimica', 'electrica', 'luminosa']),
  CA(T('Central nuclear', 'Nuclear power station', 'Central nuclear'), '🏭', ['nuclear', 'termica', 'cinetica', 'electrica']),
  CA(T('Bici con dinamo y faro', 'Bike with dynamo and lamp', 'Bici amb dinamo i far'), '🚴', ['quimica', 'cinetica', 'electrica', 'luminosa']),
  CA(T('Parque eólico', 'Wind farm', 'Parc eòlic'), '💨', ['cinetica', 'electrica']),
  CA(T('Radio con pilas', 'Battery radio', 'Ràdio amb piles'), '📻', ['quimica', 'electrica', 'sonora']),
  CA(T('Del núcleo del Sol a una placa solar', 'From the Sun’s core to a solar panel', 'Del nucli del Sol a una placa solar'), '☀️', ['nuclear', 'luminosa', 'electrica']),
]

export const NIVELES = {
  facil:   { tipos: ['forma', 'transforma', 'transforma'] },
  medio:   { tipos: ['forma', 'transforma', 'cadena', 'cadena'] },
  dificil: { tipos: ['cadena', 'rendimiento', 'mgh'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const G = 10
let seq = 0

function distractores(rand, bueno, vetadas = []) {
  return baraja(rand, Object.keys(FORMAS).filter(f => f !== bueno && !vetadas.includes(f))).slice(0, 3)
}
function opNum(rand, bueno, cands) {
  const u = [...new Set(cands.map(x => Math.round(x * 100) / 100))].filter(x => x > 0 && x !== bueno).slice(0, 3)
  return u.length === 3 ? [bueno, ...u].sort((a, b) => a - b) : null
}

export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }
    if (tipo === 'forma') {
      const i = Math.floor(rand() * SITUACIONES.length)
      if (`s${i}` === evitar) continue
      const bueno = SITUACIONES[i].forma
      return { ...base, situacion: i, clave: `s${i}`, bueno, opciones: baraja(rand, [bueno, ...distractores(rand, bueno, SITUACIONES[i].veta)]) }
    }
    if (tipo === 'transforma') {
      const i = Math.floor(rand() * APARATOS.length)
      if (`a${i}` === evitar) continue
      const a = APARATOS[i]
      // Se pregunta lo que sale (más a menudo) o lo que entra.
      const pide = rand() < 0.7 ? 'sale' : 'entra'
      const bueno = a[pide]
      const vetadas = [...a.pierde, pide === 'sale' ? a.entra : a.sale]
      return { ...base, aparato: i, clave: `a${i}`, pide, bueno, opciones: baraja(rand, [bueno, ...distractores(rand, bueno, vetadas)]) }
    }
    if (tipo === 'cadena') {
      const i = Math.floor(rand() * CADENAS.length)
      const c = CADENAS[i]
      const hueco = Math.floor(rand() * c.formas.length)
      if (`c${i}-${hueco}` === evitar) continue
      const bueno = c.formas[hueco]
      // Las demás formas de la cadena tampoco se ofrecen: ya están a la vista.
      return { ...base, cadena: i, hueco, clave: `c${i}-${hueco}`, bueno, opciones: baraja(rand, [bueno, ...distractores(rand, bueno, c.formas)]) }
    }
    if (tipo === 'rendimiento') {
      const i = elige(rand, [0, 8, 1, 13]) // bombilla, motor, ventilador, músculos
      const entra = elige(rand, [100, 200, 250, 400, 500, 1000])
      const pct = i === 0 ? elige(rand, [5, 10, 20]) : i === 8 ? elige(rand, [20, 25, 30]) : elige(rand, [20, 25, 40, 50, 75])
      const util = (entra * pct) / 100
      const pide = rand() < 0.5 ? 'rendimiento' : 'perdida'
      const bueno = pide === 'rendimiento' ? pct : entra - util
      const ops = pide === 'rendimiento'
        ? opNum(rand, pct, [100 - pct, util / entra, util, pct * 2, pct + 10].filter(x => x < 100)) // util/entra: olvidar el ×100
        : opNum(rand, entra - util, [util, entra, entra + util, (entra - util) / 2])
      if (!ops) continue
      return { ...base, aparato: i, clave: `r${i}`, entra, util, pct, pide, bueno, opciones: ops }
    }
    // mgh: Ep = m·g·h (g = 10 m/s²) o su conservación al caer sin rozamiento.
    const m = elige(rand, [1, 2, 3, 4, 5, 10, 20, 50])
    const h = elige(rand, [2, 3, 5, 8, 10, 12, 20, 25])
    const ep = m * G * h
    const pide = elige(rand, ['ep', 'ec-suelo', 'ec-mitad'])
    const bueno = pide === 'ec-mitad' ? ep / 2 : ep
    const ops = opNum(rand, bueno, [m * h, ep * 2, ep / 2, ep + m * G, m * G, ep / 4].filter(x => Number.isInteger(x)))
    if (!ops) continue
    return { ...base, clave: `m${m}-${h}`, m, h, ep, pide, bueno, opciones: ops }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (o, l) => o[l] ?? o.es
export const nombreForma = (f, l) => tx(FORMAS[f].nombre, l)
const num = (x, l) => (l === 'en' ? String(x) : String(x).replace('.', ','))
const pct = (x, l) => (l === 'en' ? `${x}%` : `${x} %`)

export function textoOpcion(o, ronda, l) {
  if (ronda.tipo === 'rendimiento') return ronda.pide === 'rendimiento' ? pct(num(o, l), l) : `${num(o, l)} J`
  if (ronda.tipo === 'mgh') return `${num(o, l)} J`
  return `${FORMAS[o].emoji} ${nombreForma(o, l)}`
}

export function enunciado(ronda, l) {
  const r = ronda
  switch (r.tipo) {
    case 'forma': return tx(T('¿Qué forma de energía tiene o guarda?', 'What form of energy does it have or store?', 'Quina forma d’energia té o guarda?'), l)
    case 'transforma': return r.pide === 'sale'
      ? tx(T('¿En qué forma de energía útil la transforma?', 'Into which useful form of energy does it turn it?', 'En quina forma d’energia útil la transforma?'), l)
      : tx(T('¿Qué forma de energía recibe para funcionar?', 'Which form of energy does it take in to work?', 'Quina forma d’energia rep per funcionar?'), l)
    case 'cadena': return tx(T('¿Qué forma de energía falta en la cadena?', 'Which form of energy is missing from the chain?', 'Quina forma d’energia falta a la cadena?'), l)
    case 'rendimiento': return r.pide === 'rendimiento'
      ? tx(T(`Entran ${r.entra} J y solo ${r.util} J son útiles. ¿Cuál es su rendimiento?`, `${r.entra} J go in and only ${r.util} J are useful. What is its efficiency?`, `Entren ${r.entra} J i només ${r.util} J són útils. Quin és el seu rendiment?`), l)
      : tx(T(`Entran ${r.entra} J y ${r.util} J son útiles. ¿Cuánta energía se pierde en calor?`, `${r.entra} J go in and ${r.util} J are useful. How much energy is lost as heat?`, `Entren ${r.entra} J i ${r.util} J són útils. Quanta energia es perd en calor?`), l)
    default: {
      const dato = tx(T(`Una piedra de ${r.m} kg está a ${r.h} m de altura (g = 10 m/s²).`, `A ${r.m} kg stone is ${r.h} m up (g = 10 m/s²).`, `Una pedra de ${r.m} kg és a ${r.h} m d’altura (g = 10 m/s²).`), l)
      const q = r.pide === 'ep'
        ? T('¿Cuánta energía potencial tiene?', 'How much potential energy does it have?', 'Quanta energia potencial té?')
        : r.pide === 'ec-suelo'
          ? T('Cae sin rozamiento. ¿Con cuánta energía cinética llega al suelo?', 'It falls without friction. How much kinetic energy does it have when it reaches the ground?', 'Cau sense fregament. Amb quanta energia cinètica arriba a terra?')
          : T('Cae sin rozamiento. ¿Cuánta energía cinética lleva a mitad de altura?', 'It falls without friction. How much kinetic energy does it have halfway down?', 'Cau sense fregament. Quanta energia cinètica porta a mitja altura?')
      return `${dato} ${tx(q, l)}`
    }
  }
}

export function explicacion(ronda, l) {
  const r = ronda
  switch (r.tipo) {
    case 'forma': {
      const f = r.bueno
      const por = {
        cinetica: T('Todo lo que se mueve tiene energía cinética.', 'Everything that moves has kinetic energy.', 'Tot el que es mou té energia cinètica.'),
        potencial: T('Lo que está en alto guarda energía potencial gravitatoria: al caer se convierte en movimiento.', 'Anything high up stores gravitational potential energy: as it falls it turns into motion.', 'El que és a dalt guarda energia potencial gravitatòria: en caure es converteix en moviment.'),
        elastica: T('Un objeto deformado que recupera su forma (arco, muelle, goma) guarda energía elástica.', 'A deformed object that springs back (bow, spring, rubber band) stores elastic energy.', 'Un objecte deformat que recupera la forma (arc, molla, goma) guarda energia elàstica.'),
        quimica: T('La energía química está guardada en las sustancias y se libera en reacciones: al quemar, al digerir o en una pila.', 'Chemical energy is stored in substances and released in reactions: burning, digesting or in a battery.', 'L’energia química és guardada a les substàncies i s’allibera en reaccions: en cremar, en digerir o en una pila.'),
        termica: T('La energía térmica es la de las partículas que se agitan: cuanto más caliente, más tiene.', 'Thermal energy is that of jiggling particles: the hotter, the more it has.', 'L’energia tèrmica és la de les partícules que s’agiten: com més calent, més en té.'),
        luminosa: T('La luz transporta energía luminosa (radiante): con ella crecen las plantas y funcionan las placas solares.', 'Light carries light (radiant) energy: plants grow with it and solar panels run on it.', 'La llum transporta energia lluminosa (radiant): amb ella creixen les plantes i funcionen les plaques solars.'),
        sonora: T('El sonido es energía que viaja como vibración del aire.', 'Sound is energy travelling as a vibration of the air.', 'El so és energia que viatja com a vibració de l’aire.'),
        nuclear: T('La energía nuclear está en el núcleo de los átomos y se libera al romperlos (fisión) o al unirlos (fusión).', 'Nuclear energy is in the nucleus of atoms and is released by splitting them (fission) or joining them (fusion).', 'L’energia nuclear és al nucli dels àtoms i s’allibera en trencar-los (fissió) o unir-los (fusió).'),
        electrica: T('La corriente eléctrica es energía que viaja por los cables.', 'Electric current is energy travelling along wires.', 'El corrent elèctric és energia que viatja pels cables.'),
      }[f]
      return tx(por, l)
    }
    case 'transforma': {
      const a = APARATOS[r.aparato]
      const base = `${tx(a.nombre, l)}: ${nombreForma(a.entra, l).toLowerCase()} → ${nombreForma(a.sale, l).toLowerCase()}.`
      const y = { es: ' y ', en: ' and ', ca: ' i ' }[l] ?? ' y '
      const lista = lng => a.pierde.map(p => nombreForma(p, lng).toLowerCase()).join(lng === l ? y : ' y ')
      const pierde = a.pierde.length ? ' ' + tx(T(`Parte se va como energía ${lista('es')}, que no se aprovecha.`, `Some goes as ${lista('en')} energy, which is not used.`, `Una part se’n va com a energia ${lista('ca')}, que no s’aprofita.`), l) : ''
      return base + pierde + (a.nota ? ' ' + tx(a.nota, l) : '')
    }
    case 'cadena': {
      const c = CADENAS[r.cadena]
      return `${tx(c.nombre, l)}: ${c.formas.map(f => nombreForma(f, l).toLowerCase()).join(' → ')}. ` + tx(T('La energía no se crea ni se destruye: solo se transforma, paso a paso.', 'Energy is neither created nor destroyed: it is only transformed, step by step.', 'L’energia no es crea ni es destrueix: només es transforma, pas a pas.'), l)
    }
    case 'rendimiento': {
      const perdida = r.entra - r.util
      return r.pide === 'rendimiento'
        ? tx(T(`Rendimiento = útil ÷ total × 100 = ${r.util} ÷ ${r.entra} × 100 = ${pct(r.pct, 'es')}. Los otros ${perdida} J se van en calor.`, `Efficiency = useful ÷ total × 100 = ${r.util} ÷ ${r.entra} × 100 = ${pct(r.pct, 'en')}. The other ${perdida} J go as heat.`, `Rendiment = útil ÷ total × 100 = ${r.util} ÷ ${r.entra} × 100 = ${pct(r.pct, 'ca')}. Els altres ${perdida} J se’n van en calor.`), l)
        : tx(T(`La energía se conserva: lo que entra = útil + perdida, así que se pierden ${r.entra} − ${r.util} = ${perdida} J.`, `Energy is conserved: what goes in = useful + lost, so ${r.entra} − ${r.util} = ${perdida} J are lost.`, `L’energia es conserva: el que entra = útil + perduda, així que es perden ${r.entra} − ${r.util} = ${perdida} J.`), l)
    }
    default: {
      const calc = `Ep = m·g·h = ${r.m} · 10 · ${r.h} = ${r.ep} J`
      if (r.pide === 'ep') return `${calc}.`
      if (r.pide === 'ec-suelo') return `${calc}. ` + tx(T(`Sin rozamiento, toda se convierte en cinética: llega con ${r.ep} J.`, `Without friction, all of it becomes kinetic: it arrives with ${r.ep} J.`, `Sense fregament, tota es converteix en cinètica: arriba amb ${r.ep} J.`), l)
      return `${calc}. ` + tx(T(`A mitad de altura le queda la mitad de potencial (${r.ep / 2} J); la otra mitad ya es cinética: ${r.ep / 2} J.`, `Halfway down it has half its potential energy left (${r.ep / 2} J); the other half is now kinetic: ${r.ep / 2} J.`, `A mitja altura li queda la meitat de potencial (${r.ep / 2} J); l’altra meitat ja és cinètica: ${r.ep / 2} J.`), l)
    }
  }
}

export function schemaQuestion(ronda, l) {
  const r = ronda
  let pre = ''
  if (r.tipo === 'forma') pre = tx(SITUACIONES[r.situacion].texto, l) + '. '
  if (r.tipo === 'transforma') pre = tx(APARATOS[r.aparato].nombre, l) + '. '
  if (r.tipo === 'cadena') {
    const c = CADENAS[r.cadena]
    pre = `${tx(c.nombre, l)}: ${c.formas.map((f, i) => (i === r.hueco ? '?' : nombreForma(f, l).toLowerCase())).join(' → ')}. `
  }
  if (r.tipo === 'rendimiento') pre = tx(APARATOS[r.aparato].nombre, l) + '. '
  return {
    question: `${pre}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
