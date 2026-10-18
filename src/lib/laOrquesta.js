// La Orquesta (música · los instrumentos, Primaria y ESO).
//
// Instrumentos dibujados (components/laOrquesta) para sentar en el plano de la
// orquesta, unir con su nombre y clasificar (ver las mecánicas más abajo).
//
// La familia la decide CÓMO se produce el sonido, no el material: la flauta
// travesera y el saxofón son de metal pero de viento madera, y el piano es de
// cuerda percutida. Esas trampas son las del examen de instrumentos.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const tx = (o, l) => o[l] ?? o.es

export const FAMILIAS = {
  cuerda: T('Cuerda', 'Strings', 'Corda'),
  madera: T('Viento madera', 'Woodwind', 'Vent fusta'),
  metal: T('Viento metal', 'Brass', 'Vent metall'),
  percusion: T('Percusión', 'Percussion', 'Percussió'),
}
export const SUBFAMILIAS = {
  frotada: T('Cuerda frotada', 'Bowed strings', 'Corda fregada'),
  pulsada: T('Cuerda pulsada', 'Plucked strings', 'Corda pinçada'),
  percutida: T('Cuerda percutida', 'Struck strings', 'Corda percudida'),
  madera: T('Viento madera', 'Woodwind', 'Vent fusta'),
  metal: T('Viento metal', 'Brass', 'Vent metall'),
  afinada: T('Percusión afinada', 'Tuned percussion', 'Percussió afinada'),
  noAfinada: T('Percusión no afinada', 'Untuned percussion', 'Percussió no afinada'),
}
export const SONIDOS = {
  arco: T('Frotando las cuerdas con un arco', 'Rubbing the strings with a bow', 'Fregant les cordes amb un arc'),
  pulsar: T('Pulsando las cuerdas con los dedos', 'Plucking the strings with the fingers', 'Pinçant les cordes amb els dits'),
  macillos: T('Unos macillos golpean las cuerdas al tocar las teclas', 'Hammers strike the strings when the keys are played', 'Uns martellets colpegen les cordes en tocar les tecles'),
  bisel: T('Soplando contra un bisel, un borde afilado', 'Blowing against an edge', 'Bufant contra un bisell, una vora esmolada'),
  lengueta: T('Soplando: vibra una lengüeta de caña', 'Blowing: a single cane reed vibrates', 'Bufant: vibra una llengüeta de canya'),
  doble: T('Soplando: vibran dos lengüetas juntas', 'Blowing: a double reed vibrates', 'Bufant: vibren dues llengüetes juntes'),
  labios: T('Vibrando los labios en una boquilla', 'Buzzing the lips into a mouthpiece', 'Vibrant els llavis en un broquet'),
  membrana: T('Golpeando una membrana tensa (el parche)', 'Striking a stretched skin (the drumhead)', 'Colpejant una membrana tensa (el pegat)'),
  cuerpo: T('Vibra el propio cuerpo del instrumento al golpearlo', 'The body of the instrument itself vibrates when struck', 'Vibra el mateix cos de l’instrument en colpejar-lo'),
}
export const HS = {
  cordofono: T('Cordófono', 'Chordophone', 'Cordòfon'),
  aerofono: T('Aerófono', 'Aerophone', 'Aeròfon'),
  membranofono: T('Membranófono', 'Membranophone', 'Membranòfon'),
  idiofono: T('Idiófono', 'Idiophone', 'Idiòfon'),
}

// [id, nombre, familia, subfamilia, sonido, H-S, nota (la trampa, si la hay)]
const I = (id, nombre, familia, sub, sonido, hs, nota = null) => ({ id, nombre, familia, sub, sonido, hs, nota })
export const INSTRUMENTOS = [
  I('violin', T('Violín', 'Violin', 'Violí'), 'cuerda', 'frotada', 'arco', 'cordofono'),
  I('violonchelo', T('Violonchelo', 'Cello', 'Violoncel'), 'cuerda', 'frotada', 'arco', 'cordofono',
    T('Es como un violín grande que se toca sentado, apoyado en el suelo.', 'It is like a large violin played sitting down, resting on the floor.', 'És com un violí gran que es toca assegut, recolzat a terra.')),
  I('arpa', T('Arpa', 'Harp', 'Arpa'), 'cuerda', 'pulsada', 'pulsar', 'cordofono'),
  I('guitarra', T('Guitarra', 'Guitar', 'Guitarra'), 'cuerda', 'pulsada', 'pulsar', 'cordofono'),
  I('piano', T('Piano', 'Piano', 'Piano'), 'cuerda', 'percutida', 'macillos', 'cordofono',
    T('Tiene teclas, pero lo que suena son cuerdas: por eso es de la familia de cuerda.', 'It has keys, but what sounds are strings: that is why it belongs to the string family.', 'Té tecles, però el que sona són cordes: per això és de la família de corda.')),
  I('flauta', T('Flauta travesera', 'Flute', 'Flauta travessera'), 'madera', 'madera', 'bisel', 'aerofono',
    T('Hoy se fabrica de metal, pero es de viento madera: el sonido se produce soplando contra un bisel, no con los labios en una boquilla.', 'Today it is made of metal, but it is woodwind: the sound comes from blowing against an edge, not from buzzing lips in a mouthpiece.', 'Avui es fabrica de metall, però és de vent fusta: el so es produeix bufant contra un bisell, no amb els llavis en un broquet.')),
  I('clarinete', T('Clarinete', 'Clarinet', 'Clarinet'), 'madera', 'madera', 'lengueta', 'aerofono'),
  I('saxofon', T('Saxofón', 'Saxophone', 'Saxòfon'), 'madera', 'madera', 'lengueta', 'aerofono',
    T('Es de metal, pero de viento madera: suena con una lengüeta de caña, como el clarinete.', 'It is made of metal, but it is woodwind: it sounds with a cane reed, like the clarinet.', 'És de metall, però de vent fusta: sona amb una llengüeta de canya, com el clarinet.')),
  I('fagot', T('Fagot', 'Bassoon', 'Fagot'), 'madera', 'madera', 'doble', 'aerofono',
    T('Es el más grave de la madera y suena con doble lengüeta, como el oboe.', 'It is the lowest of the woodwind and sounds with a double reed, like the oboe.', 'És el més greu de la fusta i sona amb doble llengüeta, com l’oboè.')),
  I('trompeta', T('Trompeta', 'Trumpet', 'Trompeta'), 'metal', 'metal', 'labios', 'aerofono'),
  I('trombon', T('Trombón', 'Trombone', 'Trombó'), 'metal', 'metal', 'labios', 'aerofono',
    T('Cambia de nota moviendo una vara que alarga el tubo.', 'It changes note by moving a slide that lengthens the tube.', 'Canvia de nota movent una vara que allarga el tub.')),
  I('trompa', T('Trompa', 'French horn', 'Trompa'), 'metal', 'metal', 'labios', 'aerofono'),
  I('tuba', T('Tuba', 'Tuba', 'Tuba'), 'metal', 'metal', 'labios', 'aerofono'),
  I('timbal', T('Timbal', 'Timpani', 'Timbal'), 'percusion', 'afinada', 'membrana', 'membranofono',
    T('Es de percusión afinada: con un pedal se tensa el parche para dar notas concretas.', 'It is tuned percussion: a pedal tightens the skin to play definite notes.', 'És de percussió afinada: amb un pedal es tensa el pegat per fer notes concretes.')),
  I('xilofono', T('Xilófono', 'Xylophone', 'Xilòfon'), 'percusion', 'afinada', 'cuerpo', 'idiofono'),
  I('tambor', T('Tambor', 'Snare drum', 'Tambor'), 'percusion', 'noAfinada', 'membrana', 'membranofono'),
  I('platillos', T('Platillos', 'Cymbals', 'Plats'), 'percusion', 'noAfinada', 'cuerpo', 'idiofono'),
  I('triangulo', T('Triángulo', 'Triangle', 'Triangle'), 'percusion', 'noAfinada', 'cuerpo', 'idiofono'),
]
export const instrumento = id => INSTRUMENTOS.find(i => i.id === id)

// Plano de la orquesta: de delante atrás, cuerda, madera, metal y percusión.
// El arpa y el piano cambian de sitio según la obra: no salen en «sitio».
export const SITIOS = { cuerda: 'A', madera: 'B', metal: 'C', percusion: 'D' }
export const SIN_SITIO = ['arpa', 'piano', 'guitarra', 'saxofon']

// Mecánicas (nada de elegir entre cuatro):
//   sienta     el plano de la orquesta en semicírculos: cada instrumento
//              dibujado, a la zona de su familia (sin los de sitio variable)
//   empareja   unir cada dibujo con su nombre
//   clasifica  instrumentos a cajas de subfamilia, de cómo suenan o de
//              Hornbostel-Sachs (las cajas: las suyas y alguna más)
export const NIVELES = {
  facil:   { tipos: ['empareja', 'sienta', 'sienta'], clasifica: [] },
  medio:   { tipos: ['empareja', 'sienta', 'clasifica', 'clasifica'], clasifica: ['subfamilia'] },
  dificil: { tipos: ['sienta', 'clasifica', 'clasifica', 'clasifica'], clasifica: ['sonido', 'hs', 'subfamilia'] },
}
const CAMPO = { subfamilia: 'sub', sonido: 'sonido', hs: 'hs' }
const CAJAS = { subfamilia: SUBFAMILIAS, sonido: SONIDOS, hs: HS }

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    if (intento < 20 && r.inst.filter(i => recientes.includes(i)).length > 1) continue
    recientes.push(...r.inst)
    while (recientes.length > 8) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'sienta') {
      const inst = baraja(rand, INSTRUMENTOS.filter(i => !SIN_SITIO.includes(i.id))).slice(0, 4).map(i => i.id)
      if (new Set(inst.map(i => instrumento(i).familia)).size < 3) continue
      return { ...base, inst, bueno: 'sienta:0' }
    }

    if (tipo === 'empareja') {
      const inst = baraja(rand, INSTRUMENTOS).slice(0, nivel === 'facil' ? 3 : 4).map(i => i.id)
      return { ...base, inst, nombres: baraja(rand, inst), bueno: 'empareja:0' }
    }

    // clasifica
    const variante = elige(rand, cfg.clasifica)
    const campo = CAMPO[variante]
    const inst = baraja(rand, INSTRUMENTOS).slice(0, 4).map(i => i.id)
    const suyas = [...new Set(inst.map(i => instrumento(i)[campo]))]
    if (suyas.length < 2) continue
    const extra = baraja(rand, Object.keys(CAJAS[variante]).filter(c => !suyas.includes(c)))
    const cajas = baraja(rand, [...suyas, ...extra.slice(0, Math.max(0, 4 - suyas.length))])
    return { ...base, inst, variante, cajas, bueno: 'clasifica:0' }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «sienta:fallos», «empareja:fallos», «clasifica:fallos».
export const esCorrecta = (r, o) => o === r.bueno
export const cajaDe = (r, id) => instrumento(id)[CAMPO[r.variante]]
export const textoCaja = (r, c, l) => tx(CAJAS[r.variante][c], l)

// ── Textos ────────────────────────────────────────────────────────────────
export function enunciado(r, l) {
  if (r.tipo === 'sienta') return s(l, 'Sienta a cada músico en su sitio de la orquesta', 'Seat each musician in their place in the orchestra', 'Seu cada músic al seu lloc de l’orquestra')
  if (r.tipo === 'empareja') return s(l, 'Une cada instrumento con su nombre', 'Match each instrument with its name', 'Uneix cada instrument amb el seu nom')
  return {
    subfamilia: s(l, '¿De qué subfamilia es cada uno?', 'Which subfamily is each one?', 'De quina subfamília és cadascun?'),
    sonido: s(l, '¿Cómo produce el sonido cada uno?', 'How does each one make its sound?', 'Com produeix el so cadascun?'),
    hs: s(l, 'Clasifícalos según Hornbostel-Sachs', 'Classify them by Hornbostel-Sachs', 'Classifica’ls segons Hornbostel-Sachs'),
  }[r.variante]
}
export function explicacion(r, l) {
  const notas = r.inst.map(instrumento).filter(i => i.nota).map(i => `${tx(i.nombre, l)}: ${tx(i.nota, l)}`).join(' ')
  let base
  if (r.tipo === 'sienta') base = s(l, 'De delante atrás: la cuerda junto al director, luego el viento madera, el viento metal y al fondo la percusión. Los que suenan más fuerte van más lejos.', 'From front to back: strings beside the conductor, then woodwind, brass and percussion at the back. The loudest sit furthest away.', 'De davant a darrere: la corda al costat del director, després el vent fusta, el vent metall i al fons la percussió. Els que sonen més fort van més lluny.') + ' ' + r.inst.map(id => `${tx(instrumento(id).nombre, l)}: ${tx(FAMILIAS[instrumento(id).familia], l).toLowerCase()}`).join(' · ') + '.'
  else if (r.tipo === 'empareja') base = r.inst.map(id => `${tx(instrumento(id).nombre, l)} (${tx(FAMILIAS[instrumento(id).familia], l).toLowerCase()})`).join(' · ') + '.'
  else base = r.inst.map(id => `${tx(instrumento(id).nombre, l)}: ${textoCaja(r, cajaDe(r, id), l).toLowerCase()}`).join(' · ') + '.'
  return notas ? `${base} ${notas}` : base
}
// Para los buscadores y el examen en texto: una pregunta de cada mecánica.
export function schemaQuestion(r, l) {
  const i = instrumento(r.inst[0])
  if (r.tipo === 'sienta' || r.tipo === 'empareja') return { question: s(l, `${tx(i.nombre, l)}: ¿a qué familia pertenece?`, `${tx(i.nombre, l)}: which family does it belong to?`, `${tx(i.nombre, l)}: a quina família pertany?`), correctAnswer: tx(FAMILIAS[i.familia], l), wrongAnswers: Object.keys(FAMILIAS).filter(f => f !== i.familia).map(f => tx(FAMILIAS[f], l)) }
  const c = cajaDe(r, i.id)
  return { question: `${tx(i.nombre, l)}. ${enunciado(r, l)}`, correctAnswer: textoCaja(r, c, l), wrongAnswers: r.cajas.filter(x => x !== c).map(x => textoCaja(r, x, l)) }
}
