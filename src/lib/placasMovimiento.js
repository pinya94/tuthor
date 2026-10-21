// Placas en Movimiento (geología · placas tectónicas, ESO).
//
// Seis escenarios de borde de placa, los del temario, cada uno con UNA forma
// de relieve y UN ejemplo real, para que ninguna pregunta tenga dos
// respuestas defendibles:
//
//   divOc     dos oceánicas se separan        → dorsal oceánica      · Dorsal Atlántica (Islandia)
//   divCont   una continental se rompe        → valle de rift        · Rift de África oriental
//   ocCont    oceánica bajo continental        → fosa + cordillera volcánica · Andes
//   ocOc      oceánica bajo oceánica           → fosa + arco de islas · Japón
//   contCont  dos continentales chocan        → cordillera plegada sin volcanes · Himalaya
//   transf    se deslizan de lado              → falla con terremotos · Falla de San Andrés
//
// Tipos de pregunta (y lo que pone a prueba):
//   tipo      qué borde es por las flechas    (convergente / divergente / transformante)
//   forma     qué relieve se forma            (cada combinación de placas da uno)
//   corteza   ¿se crea, se destruye o ninguna? (solo donde los libros no discrepan)
//   subduce   ¿qué placa se hunde?            (la oceánica, por densa; la continental nunca)
//   ejemplo   qué lugar real es así
//   lugar     un lugar real → qué pasa allí  (sin dibujo hasta corregir)
//   pista     unos síntomas → qué borde es    (sin dibujo hasta corregir)
//   hawai     el punto caliente, lejos de los bordes

export const ESCENARIOS = {
  divOc:    { mov: 'div', placas: ['oc', 'oc'] },
  divCont:  { mov: 'div', placas: ['cont', 'cont'] },
  ocCont:   { mov: 'conv', placas: ['oc', 'cont'], subduce: 'oc' },
  ocOc:     { mov: 'conv', placas: ['oc', 'oc'] },
  contCont: { mov: 'conv', placas: ['cont', 'cont'], subduce: 'ninguna' },
  transf:   { mov: 'transf', placas: ['oc', 'oc'] },
}
export const IDS = Object.keys(ESCENARIOS)

const T = (es, en, ca) => ({ es, en, ca })

export const MOV = {
  conv: T('Convergente', 'Convergent', 'Convergent'),
  div: T('Divergente', 'Divergent', 'Divergent'),
  transf: T('Transformante', 'Transform', 'Transformant'),
}

export const FORMA = {
  divOc: T('Una dorsal oceánica: cordillera submarina con volcanes', 'A mid-ocean ridge: an underwater mountain range with volcanoes', 'Una dorsal oceànica: serralada submarina amb volcans'),
  divCont: T('Un valle de rift que puede abrir un océano nuevo', 'A rift valley that may open a new ocean', 'Una vall de rift que pot obrir un oceà nou'),
  ocCont: T('Una fosa y una cordillera con volcanes en el continente', 'A trench and a volcanic mountain range on the continent', 'Una fossa i una serralada amb volcans al continent'),
  ocOc: T('Una fosa y un arco de islas volcánicas', 'A trench and an arc of volcanic islands', 'Una fossa i un arc d’illes volcàniques'),
  contCont: T('Una gran cordillera plegada, casi sin volcanes', 'A great folded mountain range, with almost no volcanoes', 'Una gran serralada plegada, gairebé sense volcans'),
  transf: T('Una falla con muchos terremotos y sin volcanes', 'A fault with many earthquakes and no volcanoes', 'Una falla amb molts terratrèmols i sense volcans'),
}

export const EJEMPLO = {
  divOc: T('La dorsal atlántica (Islandia)', 'The Mid-Atlantic Ridge (Iceland)', 'La dorsal atlàntica (Islàndia)'),
  divCont: T('El Rift de África oriental', 'The East African Rift', 'El Rift de l’Àfrica oriental'),
  ocCont: T('La cordillera de los Andes', 'The Andes', 'La serralada dels Andes'),
  ocOc: T('Japón y la fosa de las Marianas', 'Japan and the Mariana Trench', 'El Japó i la fossa de les Marianes'),
  contCont: T('El Himalaya', 'The Himalayas', 'L’Himàlaia'),
  transf: T('La falla de San Andrés (California)', 'The San Andreas Fault (California)', 'La falla de Sant Andreu (Califòrnia)'),
}

// Para `lugar`: el sitio dicho sin pistas (EJEMPLO lleva «rift» o «fosa» en
// el nombre, que ya dan la respuesta).
const LUGAR = {
  divOc: T('Islandia', 'Iceland', 'Islàndia'),
  divCont: T('El este de África (Etiopía, Kenia y Tanzania)', 'East Africa (Ethiopia, Kenya and Tanzania)', 'L’est d’Àfrica (Etiòpia, Kenya i Tanzània)'),
  ocCont: T('La costa de Chile y Perú', 'The coast of Chile and Peru', 'La costa de Xile i el Perú'),
  ocOc: T('Japón', 'Japan', 'El Japó'),
  contCont: T('El Himalaya y el Everest', 'The Himalayas and Everest', 'L’Himàlaia i l’Everest'),
  transf: T('California (San Francisco y Los Ángeles)', 'California (San Francisco and Los Angeles)', 'Califòrnia (San Francisco i Los Angeles)'),
}

// Qué ocurre, en una frase: las opciones de `lugar` y `pista`.
export const QUE = {
  divOc: T('Dos placas oceánicas que se separan', 'Two oceanic plates moving apart', 'Dues plaques oceàniques que se separen'),
  divCont: T('Una placa continental que se rompe y se separa', 'A continental plate splitting apart', 'Una placa continental que es trenca i se separa'),
  ocCont: T('Una placa oceánica que se hunde bajo una continental', 'An oceanic plate sinking under a continental one', 'Una placa oceànica que s’enfonsa sota una de continental'),
  ocOc: T('Una placa oceánica que se hunde bajo otra oceánica', 'An oceanic plate sinking under another oceanic one', 'Una placa oceànica que s’enfonsa sota una altra d’oceànica'),
  contCont: T('Dos placas continentales que chocan', 'Two continental plates colliding', 'Dues plaques continentals que xoquen'),
  transf: T('Dos placas que se deslizan de lado', 'Two plates sliding past each other', 'Dues plaques que llisquen de costat'),
}

// Los síntomas de cada borde, para `pista`.
const PISTA = {
  divOc: T('Sale lava por una grieta larguísima del fondo del océano y el fondo marino se va ensanchando.', 'Lava pours out of a very long crack in the ocean floor and the seafloor keeps getting wider.', 'Surt lava per una esquerda llarguíssima del fons de l’oceà i el fons marí es va eixamplant.'),
  divCont: T('Un continente se estira y se agrieta: aparece un valle larguísimo con volcanes y lagos alargados.', 'A continent stretches and cracks: a very long valley appears, with volcanoes and long narrow lakes.', 'Un continent s’estira i s’esquerda: apareix una vall llarguíssima amb volcans i llacs allargats.'),
  ocCont: T('Una fosa muy profunda junto a la costa, terremotos cada vez más profundos tierra adentro y una cordillera llena de volcanes.', 'A very deep trench along the coast, earthquakes getting deeper inland and a mountain range full of volcanoes.', 'Una fossa molt profunda al costat de la costa, terratrèmols cada vegada més profunds terra endins i una serralada plena de volcans.'),
  ocOc: T('Una fila de islas volcánicas en forma de arco, en mitad del océano, junto a una fosa muy profunda.', 'A curved line of volcanic islands in the middle of the ocean, next to a very deep trench.', 'Una filera d’illes volcàniques en forma d’arc, al mig de l’oceà, al costat d’una fossa molt profunda.'),
  contCont: T('Las montañas más altas del mundo, que todavía crecen; hay terremotos, pero casi ningún volcán.', 'The highest mountains in the world, still growing; there are earthquakes, but almost no volcanoes.', 'Les muntanyes més altes del món, que encara creixen; hi ha terratrèmols, però gairebé cap volcà.'),
  transf: T('Terremotos muy frecuentes, sin volcanes ni montañas nuevas; una carretera que cruza la falla acaba partida y desplazada.', 'Very frequent earthquakes, with no volcanoes or new mountains; a road crossing the fault ends up broken and shifted sideways.', 'Terratrèmols molt freqüents, sense volcans ni muntanyes noves; una carretera que travessa la falla acaba partida i desplaçada.'),
}

export const CORTEZA = {
  crea: T('Se crea corteza nueva', 'New crust is created', 'Es crea escorça nova'),
  destruye: T('Se destruye corteza', 'Crust is destroyed', 'Es destrueix escorça'),
  ninguna: T('Ni se crea ni se destruye', 'It is neither created nor destroyed', 'Ni es crea ni es destrueix'),
}
// Solo los casos en que todos los libros coinciden (el choque continental queda fuera).
const CORTEZA_DE = { divOc: 'crea', divCont: 'crea', ocCont: 'destruye', ocOc: 'destruye', transf: 'ninguna' }

export const SUBDUCE = {
  oc: T('La oceánica, porque es más densa', 'The oceanic one, because it is denser', 'L’oceànica, perquè és més densa'),
  cont: T('La continental, porque es más gruesa', 'The continental one, because it is thicker', 'La continental, perquè és més gruixuda'),
  ninguna: T('Ninguna: las dos son ligeras y se pliegan', 'Neither: both are light and they crumple up', 'Cap: totes dues són lleugeres i es pleguen'),
  ambas: T('Las dos se hunden a la vez', 'Both sink at the same time', 'Totes dues s’enfonsen alhora'),
}

export const HAWAI = {
  caliente: T('Un punto caliente: una columna de magma que sube del manto', 'A hotspot: a plume of magma rising from the mantle', 'Un punt calent: una columna de magma que puja del mantell'),
  dorsal: T('Está encima de una dorsal oceánica', 'It sits on top of a mid-ocean ridge', 'Està damunt d’una dorsal oceànica'),
  subduccion: T('Una placa se hunde bajo otra justo allí', 'One plate sinks under another right there', 'Una placa s’enfonsa sota una altra just allà'),
  falla: T('Una falla transformante cruza las islas', 'A transform fault crosses the islands', 'Una falla transformant travessa les illes'),
}

export const NIVELES = {
  facil:   { tipos: ['tipo', 'tipo', 'forma', 'forma', 'corteza'] },
  medio:   { tipos: ['tipo', 'forma', 'corteza', 'subduce', 'ejemplo', 'ejemplo'] },
  dificil: { tipos: ['forma', 'subduce', 'ejemplo', 'lugar', 'pista', 'pista', 'hawai'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
// La buena y tres de las demás, barajadas.
const cuatro = (rand, bueno, todas) => baraja(rand, [bueno, ...baraja(rand, todas.filter(x => x !== bueno)).slice(0, 3)])

let seq = 0

// La ronda clásica de un tipo (con opciones): la usan las mecánicas y el
// texto del schema (ver «Mecánicas» al final).
function genVieja(nivel, tipo, rand) {
  for (;;) {
    const base = { id: ++seq, nivel, tipo }
    if (tipo === 'hawai') return { ...base, escenario: null, bueno: 'caliente', opciones: baraja(rand, Object.keys(HAWAI)) }
    const pool = tipo === 'corteza' ? Object.keys(CORTEZA_DE)
      : tipo === 'subduce' ? IDS.filter(id => ESCENARIOS[id].subduce)
      : IDS
    const esc = elige(rand, pool)
    const e = ESCENARIOS[esc]
    switch (tipo) {
      case 'tipo': return { ...base, escenario: esc, bueno: e.mov, opciones: baraja(rand, Object.keys(MOV)) }
      case 'forma': return { ...base, escenario: esc, bueno: esc, opciones: cuatro(rand, esc, IDS) }
      case 'corteza': return { ...base, escenario: esc, bueno: CORTEZA_DE[esc], opciones: Object.keys(CORTEZA) }
      case 'subduce': return { ...base, escenario: esc, bueno: e.subduce, opciones: baraja(rand, Object.keys(SUBDUCE)) }
      case 'ejemplo': return { ...base, escenario: esc, bueno: esc, opciones: cuatro(rand, esc, IDS) }
      default: return { ...base, escenario: esc, bueno: esc, opciones: cuatro(rand, esc, IDS) } // lugar, pista
    }
  }
}


const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)

// ¿Se ve el dibujo antes de responder? En `lugar`, `pista` y `hawai` el
// dibujo daría la respuesta: solo aparece al corregir.
export const dibujoAntes = r => !['lugar', 'pista', 'hawai'].includes(r.tipo)

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'tipo': return tx(MOV[o], l)
    case 'forma': return tx(FORMA[o], l)
    case 'corteza': return tx(CORTEZA[o], l)
    case 'subduce': return tx(SUBDUCE[o], l)
    case 'ejemplo': return tx(EJEMPLO[o], l)
    case 'hawai': return tx(HAWAI[o], l)
    default: return tx(QUE[o], l)
  }
}

function enunciadoViejo(r, l) {
  switch (r.tipo) {
    case 'tipo': return s(l, '¿Qué tipo de borde de placa es?', 'What type of plate boundary is this?', 'Quin tipus de vora de placa és?')
    case 'forma': return s(l, '¿Qué se forma en este borde?', 'What forms at this boundary?', 'Què es forma en aquesta vora?')
    case 'corteza': return s(l, '¿Qué le pasa a la corteza en este borde?', 'What happens to the crust at this boundary?', 'Què li passa a l’escorça en aquesta vora?')
    case 'subduce': return s(l, 'Las placas chocan. ¿Cuál se hunde bajo la otra?', 'The plates collide. Which one sinks under the other?', 'Les plaques xoquen. Quina s’enfonsa sota l’altra?')
    case 'ejemplo': return s(l, '¿Qué lugar real es un borde como este?', 'Which real place is a boundary like this?', 'Quin lloc real és una vora com aquesta?')
    case 'lugar': return s(l, `${tx(LUGAR[r.escenario], l)}: ¿qué ocurre bajo sus pies?`, `${tx(LUGAR[r.escenario], l)}: what is happening beneath it?`, `${tx(LUGAR[r.escenario], l)}: què hi passa a sota?`)
    case 'pista': return `${tx(PISTA[r.escenario], l)} ${s(l, '¿Qué ocurre allí?', 'What is happening there?', 'Què hi passa?')}`
    default: return s(l, 'Hawái tiene volcanes activos en mitad de la placa del Pacífico, a miles de kilómetros de cualquier borde. ¿Por qué?', 'Hawaii has active volcanoes in the middle of the Pacific Plate, thousands of kilometres from any boundary. Why?', 'Hawaii té volcans actius al mig de la placa del Pacífic, a milers de quilòmetres de qualsevol vora. Per què?')
  }
}

// La explicación de cada escenario: qué se mueve, qué se forma y dónde pasa.
const POR_QUE = {
  divOc: T(
    'Las dos placas oceánicas se separan; por la grieta sube magma del manto, se enfría y forma fondo marino nuevo. Así nace una dorsal, una cordillera submarina con volcanes: la atlántica asoma en Islandia y hace que el Atlántico se ensanche unos centímetros al año.',
    'The two oceanic plates move apart; magma from the mantle rises through the crack, cools and forms new seafloor. That builds a ridge, an underwater mountain range with volcanoes: the Atlantic one breaks the surface in Iceland and widens the Atlantic by a few centimetres a year.',
    'Les dues plaques oceàniques se separen; per l’esquerda puja magma del mantell, es refreda i forma fons marí nou. Així neix una dorsal, una serralada submarina amb volcans: l’atlàntica treu el cap a Islàndia i fa que l’Atlàntic s’eixampli uns centímetres l’any.'),
  divCont: T(
    'Un continente se estira y se rompe: el bloque del centro se hunde y forma un valle de rift, con volcanes como el Kilimanjaro. Si sigue abriéndose, entra el mar y nace un océano nuevo, como pasa en el Rift de África oriental.',
    'A continent stretches and breaks: the central block drops and forms a rift valley, with volcanoes such as Kilimanjaro. If it keeps opening, the sea floods in and a new ocean is born, as is happening in the East African Rift.',
    'Un continent s’estira i es trenca: el bloc del centre s’enfonsa i forma una vall de rift, amb volcans com el Kilimanjaro. Si continua obrint-se, hi entra el mar i neix un oceà nou, com passa al Rift de l’Àfrica oriental.'),
  ocCont: T(
    'La placa oceánica es más densa y se hunde bajo la continental (subducción): junto a la costa queda una fosa profunda y, al hundirse, la placa se funde y el magma sube formando una cordillera llena de volcanes, como los Andes.',
    'The oceanic plate is denser and sinks under the continental one (subduction): a deep trench forms along the coast and, as the plate sinks, it melts and the magma rises to build a mountain range full of volcanoes, like the Andes.',
    'La placa oceànica és més densa i s’enfonsa sota la continental (subducció): al costat de la costa queda una fossa profunda i, en enfonsar-se, la placa es fon i el magma puja formant una serralada plena de volcans, com els Andes.'),
  ocOc: T(
    'Una placa oceánica se hunde bajo la otra: se forma una fosa muy profunda (la de las Marianas pasa de 10 km) y el magma sube formando una fila de islas volcánicas en arco, como Japón.',
    'One oceanic plate sinks under the other: a very deep trench forms (the Mariana Trench is over 10 km deep) and magma rises to build a curved line of volcanic islands, like Japan.',
    'Una placa oceànica s’enfonsa sota l’altra: es forma una fossa molt profunda (la de les Marianes passa de 10 km) i el magma puja formant una filera d’illes volcàniques en arc, com el Japó.'),
  contCont: T(
    'Las dos placas continentales son ligeras y ninguna se hunde del todo: chocan, se pliegan y se amontonan hacia arriba. Así se forman las cordilleras más altas, como el Himalaya (India contra Asia), con terremotos pero casi sin volcanes, porque no hay placa fundiéndose debajo.',
    'Both continental plates are light, so neither sinks fully: they collide, crumple and pile upwards. That is how the highest ranges form, like the Himalayas (India against Asia), with earthquakes but almost no volcanoes, because no plate is melting underneath.',
    'Les dues plaques continentals són lleugeres i cap no s’enfonsa del tot: xoquen, es pleguen i s’amunteguen cap amunt. Així es formen les serralades més altes, com l’Himàlaia (l’Índia contra l’Àsia), amb terratrèmols però gairebé sense volcans, perquè no hi ha cap placa fonent-se a sota.'),
  transf: T(
    'Las placas se deslizan una junto a otra sin separarse ni chocar: la corteza ni se crea ni se destruye. Se enganchan, acumulan tensión y se sueltan de golpe: por eso hay terremotos y no volcanes, como en la falla de San Andrés.',
    'The plates slide past each other without separating or colliding: crust is neither created nor destroyed. They lock, build up stress and slip suddenly: that is why there are earthquakes and no volcanoes, as on the San Andreas Fault.',
    'Les plaques llisquen l’una al costat de l’altra sense separar-se ni xocar: l’escorça ni es crea ni es destrueix. S’enganxen, acumulen tensió i es deixen anar de cop: per això hi ha terratrèmols i no volcans, com a la falla de Sant Andreu.'),
}

function explicacionVieja(r, l) {
  if (r.tipo === 'hawai') {
    return s(l,
      'Hawái no está en ningún borde: debajo hay un punto caliente, una columna de magma que sube desde muy hondo en el manto y se queda quieta. La placa del Pacífico se mueve por encima y cada isla se forma al pasar sobre él; por eso las más viejas, ya sin volcanes activos, están más al noroeste.',
      'Hawaii is not on any boundary: beneath it is a hotspot, a plume of magma rising from deep in the mantle that stays in place. The Pacific Plate moves over it and each island forms as it passes; that is why the older islands, with no active volcanoes, lie further north-west.',
      'Hawaii no és a cap vora: a sota hi ha un punt calent, una columna de magma que puja des de molt endins del mantell i es queda quieta. La placa del Pacífic es mou per sobre i cada illa es forma en passar-hi; per això les més velles, ja sense volcans actius, són més al nord-oest.')
  }
  const mov = tx(MOV[ESCENARIOS[r.escenario].mov], l).toLowerCase()
  const pre = r.tipo === 'tipo'
    ? s(l, `Es un borde ${mov}: `, `It is a ${mov} boundary: `, `És una vora ${mov}: `)
    : ''
  return `${pre}${tx(POR_QUE[r.escenario], l)}`
}

function schemaVieja(r, l) {
  const desc = r.escenario ? `${tx(QUE[r.escenario], l)}. ` : ''
  return {
    question: ['lugar', 'pista', 'hawai'].includes(r.tipo) ? enunciadoViejo(r, l) : `${desc}${enunciadoViejo(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda y el texto del schema):
//   clasifica  (tipo, corteza)  tres bordes dibujados, cada uno a su caja
//   construye  (forma, ejemplo, lugar, pista)  montar el borde: tipo de cada
//              placa (oceánica / continental) y movimiento (se separan,
//              chocan, se deslizan) — «a,b,mov»
//   subduce    tocar la placa que se hunde, o «ninguna»
// El punto caliente de Hawái (no es un borde) queda fuera del juego.
export const MECANICA_DE_TIPO = { tipo: 'clasifica', corteza: 'clasifica', forma: 'construye', ejemplo: 'construye', lugar: 'construye', pista: 'construye', subduce: 'subduce' }
export const MOVS = ['div', 'conv', 'transf']

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipos = cfg.tipos.filter(t => t !== 'hawai')
  for (let intento = 0; ; intento++) {
    const tipo = elige(rand, tipos)
    const r = genVieja(nivel, tipo, rand)
    const tema = `${tipo}${r.escenario}`
    if (intento < 20 && recientes.includes(tema)) continue
    const out = { ...r, mecanica: MECANICA_DE_TIPO[tipo] }
    if (out.mecanica === 'clasifica') {
      const pool = tipo === 'corteza' ? Object.keys(CORTEZA_DE) : IDS
      const items = baraja(rand, pool).slice(0, 3)
      const caja = id => (tipo === 'corteza' ? CORTEZA_DE[id] : ESCENARIOS[id].mov)
      if (new Set(items.map(caja)).size < 2) continue
      out.items = items
      out.cajas = tipo === 'corteza' ? Object.keys(CORTEZA) : MOVS
    }
    recientes.push(tema)
    if (recientes.length > 5) recientes.shift()
    return out
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// La caja buena de un borde en «clasifica».
export const cajaDe = (r, id) => (r.tipo === 'corteza' ? CORTEZA_DE[id] : ESCENARIOS[id].mov)

// ¿El borde montado es el del escenario? En la transformante da igual el tipo
// de placa (San Andrés junta una oceánica y una continental).
export function encaja(esc, [a, b, mov]) {
  const e = ESCENARIOS[esc]
  if (e.mov === 'transf') return mov === 'transf'
  return mov === e.mov && [a, b].sort().join() === [...e.placas].sort().join()
}

export function respuestaBuena(r) {
  if (r.mecanica === 'clasifica') return 'clasifica:0'
  if (r.mecanica === 'subduce') return r.bueno
  const e = ESCENARIOS[r.escenario]
  return `${e.placas[0]},${e.placas[1]},${e.mov}`
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  if (r.mecanica === 'construye') return encaja(r.escenario, String(o).split(','))
  return o === respuestaBuena(r)
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  const pide = s(l, 'Monta el borde: toca cada placa para elegir su tipo y las flechas para el movimiento.', 'Build the boundary: tap each plate to choose its type and the arrows for the movement.', 'Munta la vora: toca cada placa per triar-ne el tipus i les fletxes per al moviment.')
  switch (r.mecanica) {
    case 'clasifica': return r.tipo === 'corteza'
      ? s(l, 'Pon cada borde en su caja: ¿se crea o se destruye corteza?', 'Put each boundary in its box: is crust created or destroyed?', 'Posa cada vora a la seva caixa: es crea o es destrueix escorça?')
      : s(l, 'Pon cada borde en la caja de su tipo', 'Put each boundary in the box for its type', 'Posa cada vora a la caixa del seu tipus')
    case 'subduce': return s(l, 'Las placas chocan. Toca la que se hunde bajo la otra', 'The plates collide. Tap the one that sinks under the other', 'Les plaques xoquen. Toca la que s’enfonsa sota l’altra')
    default: {
      const que = r.tipo === 'forma' ? s(l, `Se forma: ${tx(FORMA[r.escenario], l).toLowerCase()}.`, `What forms: ${tx(FORMA[r.escenario], l).toLowerCase()}.`, `Es forma: ${tx(FORMA[r.escenario], l).toLowerCase()}.`)
        : r.tipo === 'ejemplo' ? `${tx(EJEMPLO[r.escenario], l)}.`
        : r.tipo === 'lugar' ? `${tx(LUGAR[r.escenario], l)}.`
        : tx(PISTA[r.escenario], l)
      return `${que} ${pide}`
    }
  }
}

export function explicacion(r, l) {
  if (r.mecanica === 'clasifica') {
    const nombre = id => (r.tipo === 'corteza' ? tx(CORTEZA[CORTEZA_DE[id]], l) : tx(MOV[ESCENARIOS[id].mov], l))
    return r.items.map(id => `${tx(QUE[id], l)} → ${nombre(id).toLowerCase()}`).join('. ') + '.'
  }
  return explicacionVieja(r, l)
}

export function schemaQuestion(r, l) {
  return schemaVieja(r, l)
}
