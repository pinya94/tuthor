// La Orquesta (música · los instrumentos, Primaria y ESO).
//
// Instrumentos dibujados (components/laOrquesta). Se pregunta:
//   nombre     qué instrumento es
//   familia    cuerda, viento madera, viento metal o percusión
//   subfamilia cuerda frotada/pulsada/percutida, percusión afinada/no afinada…
//   sonido     cómo produce el sonido
//   sitio      dónde se sienta su familia en la orquesta (en el plano)
//   hs         clasificación de Hornbostel-Sachs (cordófono, aerófono…)
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
const SIN_SITIO = ['arpa', 'piano', 'guitarra', 'saxofon']

export const NIVELES = {
  facil:   { tipos: ['nombre', 'nombre', 'familia', 'familia'] },
  medio:   { tipos: ['nombre', 'familia', 'subfamilia', 'sonido', 'sitio'] },
  dificil: { tipos: ['subfamilia', 'sonido', 'sonido', 'hs', 'sitio'] },
}

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
    if (intento < 20 && recientes.includes(r.inst)) continue
    recientes.push(r.inst)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const pool = tipo === 'sitio' ? INSTRUMENTOS.filter(i => !SIN_SITIO.includes(i.id)) : INSTRUMENTOS
    // En fácil y medio, a menudo las trampas (flauta, saxofón, piano) en «familia».
    const it = elige(rand, pool)
    const base = { id: ++seq, nivel, tipo, inst: it.id }
    if (tipo === 'nombre') {
      // Opciones: primero los de su familia (lo difícil es distinguirlos).
      const misma = baraja(rand, INSTRUMENTOS.filter(x => x.id !== it.id && x.familia === it.familia))
      const otras = baraja(rand, INSTRUMENTOS.filter(x => x.familia !== it.familia))
      const ops = [...misma.slice(0, nivel === 'facil' ? 1 : 2), ...otras].slice(0, 3).map(x => x.id)
      return { ...base, bueno: it.id, opciones: baraja(rand, [it.id, ...ops]) }
    }
    if (tipo === 'familia') return { ...base, bueno: it.familia, opciones: Object.keys(FAMILIAS) }
    if (tipo === 'subfamilia') {
      const otras = baraja(rand, Object.keys(SUBFAMILIAS).filter(k => k !== it.sub))
      // Las de la misma familia primero (frotada ↔ pulsada ↔ percutida).
      otras.sort((a, b) => (SUB_FAM[b] === it.familia) - (SUB_FAM[a] === it.familia))
      return { ...base, bueno: it.sub, opciones: baraja(rand, [it.sub, ...otras.slice(0, 3)]) }
    }
    if (tipo === 'sonido') {
      const otras = baraja(rand, Object.keys(SONIDOS).filter(k => k !== it.sonido)).slice(0, 3)
      return { ...base, bueno: it.sonido, opciones: baraja(rand, [it.sonido, ...otras]) }
    }
    if (tipo === 'sitio') return { ...base, bueno: SITIOS[it.familia], opciones: ['A', 'B', 'C', 'D'] }
    return { ...base, bueno: it.hs, opciones: Object.keys(HS) }
  }
}
const SUB_FAM = { frotada: 'cuerda', pulsada: 'cuerda', percutida: 'cuerda', madera: 'madera', metal: 'metal', afinada: 'percusion', noAfinada: 'percusion' }

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'nombre': return tx(instrumento(o).nombre, l)
    case 'familia': return tx(FAMILIAS[o], l)
    case 'subfamilia': return tx(SUBFAMILIAS[o], l)
    case 'sonido': return tx(SONIDOS[o], l)
    case 'hs': return tx(HS[o], l)
    default: return o
  }
}
export function enunciado(r, l) {
  const n = tx(instrumento(r.inst).nombre, l).toLowerCase()
  switch (r.tipo) {
    case 'nombre': return s(l, '¿Qué instrumento es?', 'Which instrument is this?', 'Quin instrument és?')
    case 'familia': return s(l, '¿A qué familia pertenece?', 'Which family does it belong to?', 'A quina família pertany?')
    case 'subfamilia': return s(l, '¿De qué grupo es exactamente?', 'Which group exactly?', 'De quin grup és exactament?')
    case 'sonido': return s(l, '¿Cómo produce el sonido?', 'How does it make its sound?', 'Com produeix el so?')
    case 'sitio': return s(l, `¿En qué zona de la orquesta se sienta su familia (${n})?`, `In which area of the orchestra does its family (${n}) sit?`, `A quina zona de l’orquestra s’asseu la seva família (${n})?`)
    default: return s(l, '¿Qué es, según la clasificación de Hornbostel-Sachs?', 'What is it in the Hornbostel-Sachs classification?', 'Què és, segons la classificació de Hornbostel-Sachs?')
  }
}
export function explicacion(r, l) {
  const it = instrumento(r.inst)
  const base = s(l, `${tx(it.nombre, l)}: ${tx(SUBFAMILIAS[it.sub], l).toLowerCase()}. Suena así: ${tx(SONIDOS[it.sonido], l).toLowerCase()}.`, `${tx(it.nombre, l)}: ${tx(SUBFAMILIAS[it.sub], l).toLowerCase()}. It sounds like this: ${tx(SONIDOS[it.sonido], l).toLowerCase()}.`, `${tx(it.nombre, l)}: ${tx(SUBFAMILIAS[it.sub], l).toLowerCase()}. Sona així: ${tx(SONIDOS[it.sonido], l).toLowerCase()}.`)
  const nota = it.nota ? ' ' + tx(it.nota, l) : ''
  if (r.tipo === 'sitio') return base + ' ' + s(l, 'En la orquesta, de delante atrás: cuerda (A), viento madera (B), viento metal (C) y percusión (D). Los más potentes, detrás.', 'In the orchestra, from front to back: strings (A), woodwind (B), brass (C) and percussion (D). The loudest go at the back.', 'A l’orquestra, de davant cap enrere: corda (A), vent fusta (B), vent metall (C) i percussió (D). Els més potents, al darrere.')
  if (r.tipo === 'hs') return base + ' ' + s(l, `Hornbostel-Sachs: ${tx(HS[it.hs], l).toLowerCase()} (lo que vibra es ${{ cordofono: 'una cuerda', aerofono: 'el aire', membranofono: 'una membrana', idiofono: 'el propio instrumento' }[it.hs]}).`, `Hornbostel-Sachs: ${tx(HS[it.hs], l).toLowerCase()} (what vibrates is ${{ cordofono: 'a string', aerofono: 'the air', membranofono: 'a skin', idiofono: 'the instrument itself' }[it.hs]}).`, `Hornbostel-Sachs: ${tx(HS[it.hs], l).toLowerCase()} (el que vibra és ${{ cordofono: 'una corda', aerofono: 'l’aire', membranofono: 'una membrana', idiofono: 'el mateix instrument' }[it.hs]}).`)
  return base + nota
}
export function schemaQuestion(r, l) {
  const it = instrumento(r.inst)
  const q = r.tipo === 'nombre' ? `${tx(SONIDOS[it.sonido], l)}. ` : `${tx(it.nombre, l)}. `
  return {
    question: `${q}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
