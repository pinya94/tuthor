// ¡Brote! (biología · salud y enfermedad, ESO y Bachillerato).
//
// Microbios dibujados, enfermedades con su causa y su contagio, las defensas
// del cuerpo, los tipos de inmunidad y, en los niveles altos, cómo crece un
// brote y qué parte de la población hay que vacunar para frenarlo.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   microbio     qué microbio es el del dibujo          (confundir bacteria y virus)
//   celula       si el del dibujo es una célula, y cuál (creer que el virus es una célula)
//   agente       qué microbio causa una enfermedad      (la gripe «es una bacteria»)
//   contagio     cómo se contagia                       (todo «por el aire»)
//   antibiotico  si los antibióticos atacan su microbio (tomarlos para la gripe)
//   infecciosa   cuál es (o no es) infecciosa           (la diabetes «se pega»)
//   defensa      qué línea de defensa actúa             (barrera ↔ inespecífica)
//   inmunidad    activa/pasiva, natural/artificial      (vacuna ↔ suero)
//   generaciones contagios en la generación k = Rᵏ      (multiplicar R · k)
//   grupo        % a vacunar = 1 − 1/R₀                 (responder 1/R₀)
//
// Solo entran enfermedades de libro de texto con una respuesta indiscutible
// en cada pregunta: las que se contagian de varias formas no salen en
// «contagio», y los antibióticos solo se preguntan con virus y bacterias.

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const T = (es, en, ca) => ({ es, en, ca })
export const tx = (o, l) => o[l] ?? o.es

export const MICROBIOS = {
  virus:    T('Virus', 'Virus', 'Virus'),
  bacteria: T('Bacteria', 'Bacterium', 'Bacteri'),
  hongo:    T('Hongo', 'Fungus', 'Fong'),
  protozoo: T('Protozoo', 'Protozoan', 'Protozou'),
}
// Formas que se dibujan, y de qué microbio son.
export const FORMAS = {
  virus: 'virus', fago: 'virus',
  bacilo: 'bacteria', coco: 'bacteria', espirilo: 'bacteria',
  levadura: 'hongo', moho: 'hongo',
  ameba: 'protozoo', paramecio: 'protozoo',
}
export const NOMBRE_FORMA = {
  virus: T('un virus con su envoltura y sus espículas', 'a virus with its envelope and spikes', 'un virus amb l’embolcall i les espícules'),
  fago: T('un bacteriófago, un virus que infecta bacterias', 'a bacteriophage, a virus that infects bacteria', 'un bacteriòfag, un virus que infecta bacteris'),
  bacilo: T('un bacilo, una bacteria con forma de bastón y flagelo', 'a bacillus, a rod-shaped bacterium with a flagellum', 'un bacil, un bacteri en forma de bastó i amb flagel'),
  coco: T('cocos, bacterias redondas en cadena', 'cocci, round bacteria in a chain', 'cocs, bacteris rodons en cadena'),
  espirilo: T('un espirilo, una bacteria en espiral', 'a spirillum, a spiral bacterium', 'un espiril, un bacteri en espiral'),
  levadura: T('una levadura, un hongo unicelular que se reproduce por gemación', 'a yeast, a single-celled fungus that reproduces by budding', 'un llevat, un fong unicel·lular que es reprodueix per gemmació'),
  moho: T('un moho, un hongo de hifas con esporas', 'a mould, a fungus made of hyphae with spores', 'una floridura, un fong d’hifes amb espores'),
  ameba: T('una ameba, un protozoo que se mueve con pseudópodos', 'an amoeba, a protozoan that moves with pseudopodia', 'una ameba, un protozou que es mou amb pseudòpodes'),
  paramecio: T('un paramecio, un protozoo cubierto de cilios', 'a paramecium, a protozoan covered in cilia', 'un parameci, un protozou cobert de cilis'),
}
// Lo que se ve en el dibujo, sin decir qué es (para el texto del examen).
export const ASPECTO = {
  virus: T('Una bolita con espículas alrededor', 'A small ball covered in spikes', 'Una boleta amb espícules al voltant'),
  fago: T('Una cabeza geométrica con cola y patas', 'A geometric head with a tail and legs', 'Un cap geomètric amb cua i potes'),
  bacilo: T('Un bastón con un flagelo y sin núcleo', 'A rod with a flagellum and no nucleus', 'Un bastó amb un flagel i sense nucli'),
  coco: T('Bolitas en cadena, sin núcleo', 'Little balls in a chain, with no nucleus', 'Boletes en cadena, sense nucli'),
  espirilo: T('Una espiral sin núcleo', 'A spiral with no nucleus', 'Una espiral sense nucli'),
  levadura: T('Una célula ovalada con núcleo y una yema', 'An oval cell with a nucleus and a bud', 'Una cèl·lula ovalada amb nucli i una gemma'),
  moho: T('Filamentos con bolitas de esporas en la punta', 'Threads with balls of spores at the tips', 'Filaments amb boletes d’espores a la punta'),
  ameba: T('Una masa irregular con núcleo y prolongaciones', 'An irregular blob with a nucleus and extensions', 'Una massa irregular amb nucli i prolongacions'),
  paramecio: T('Una suela de zapato con núcleo, cubierta de pelillos', 'A slipper shape with a nucleus, covered in tiny hairs', 'Una sola de sabata amb nucli, coberta de pèls'),
}
export const CELULA = {
  no: T('No es una célula: solo se multiplica dentro de otras células', 'Not a cell: it can only multiply inside other cells', 'No és una cèl·lula: només es multiplica dins d’altres cèl·lules'),
  procariota: T('Una célula procariota: sin núcleo', 'A prokaryotic cell: no nucleus', 'Una cèl·lula procariota: sense nucli'),
  eucariota: T('Una célula eucariota: con núcleo', 'A eukaryotic cell: with a nucleus', 'Una cèl·lula eucariota: amb nucli'),
}
const celulaDe = m => (m === 'virus' ? 'no' : m === 'bacteria' ? 'procariota' : 'eucariota')

export const VIAS = {
  aire:     { emoji: '💨', t: T('Por el aire: gotitas al toser, estornudar o hablar', 'Through the air: droplets from coughs, sneezes or talking', 'Per l’aire: gotetes en tossir, esternudar o parlar') },
  agua:     { emoji: '🚰', t: T('Agua o alimentos contaminados', 'Contaminated water or food', 'Aigua o aliments contaminats') },
  contacto: { emoji: '✋', t: T('Contacto: piel, heridas u objetos', 'Contact: skin, wounds or objects', 'Contacte: pell, ferides o objectes') },
  sangre:   { emoji: '💉', t: T('Relaciones sexuales o sangre', 'Sexual contact or blood', 'Relacions sexuals o sang') },
  animal:   { emoji: '🦟', t: T('Picadura o mordedura de un animal', 'The bite of an animal or insect', 'Picada o mossegada d’un animal') },
}

// [id, nombre, microbio, vía de contagio (null = varias: no se pregunta), nota]
const E = (id, nombre, mic, via, nota) => ({ id, nombre, mic, via, nota })
export const ENFERMEDADES = [
  E('gripe', T('Gripe', 'Flu', 'Grip'), 'virus', 'aire'),
  E('sarampion', T('Sarampión', 'Measles', 'Xarampió'), 'virus', 'aire'),
  E('covid', T('COVID-19', 'COVID-19', 'COVID-19'), 'virus', 'aire'),
  E('tuberculosis', T('Tuberculosis', 'Tuberculosis', 'Tuberculosi'), 'bacteria', 'aire'),
  E('tosferina', T('Tos ferina', 'Whooping cough', 'Tos ferina'), 'bacteria', 'aire'),
  E('colera', T('Cólera', 'Cholera', 'Còlera'), 'bacteria', 'agua'),
  E('salmonelosis', T('Salmonelosis', 'Salmonella food poisoning', 'Salmonel·losi'), 'bacteria', 'agua'),
  E('hepatitisA', T('Hepatitis A', 'Hepatitis A', 'Hepatitis A'), 'virus', 'agua'),
  E('polio', T('Poliomielitis', 'Polio', 'Poliomielitis'), 'virus', 'agua'),
  E('giardiasis', T('Giardiasis', 'Giardiasis', 'Giardiosi'), 'protozoo', 'agua'),
  E('amebiasis', T('Disentería amebiana', 'Amoebic dysentery', 'Disenteria amebiana'), 'protozoo', 'agua'),
  E('tetanos', T('Tétanos', 'Tetanus', 'Tètanus'), 'bacteria', 'contacto', T('No se contagia de persona a persona: la bacteria entra por una herida sucia.', 'It does not pass from person to person: the bacterium gets in through a dirty wound.', 'No es contagia de persona a persona: el bacteri entra per una ferida bruta.')),
  E('pieatleta', T('Pie de atleta', 'Athlete’s foot', 'Peu d’atleta'), 'hongo', 'contacto'),
  E('sifilis', T('Sífilis', 'Syphilis', 'Sífilis'), 'bacteria', 'sangre'),
  E('gonorrea', T('Gonorrea', 'Gonorrhoea', 'Gonorrea'), 'bacteria', 'sangre'),
  E('vih', T('VIH (sida)', 'HIV (AIDS)', 'VIH (sida)'), 'virus', 'sangre'),
  E('hepatitisB', T('Hepatitis B', 'Hepatitis B', 'Hepatitis B'), 'virus', 'sangre'),
  E('malaria', T('Malaria', 'Malaria', 'Malària'), 'protozoo', 'animal', T('La transmite la picadura del mosquito Anopheles.', 'It is spread by the bite of the Anopheles mosquito.', 'La transmet la picada del mosquit Anopheles.')),
  E('dengue', T('Dengue', 'Dengue', 'Dengue'), 'virus', 'animal', T('Lo transmite la picadura de mosquitos Aedes, como el mosquito tigre.', 'It is spread by the bite of Aedes mosquitoes, such as the tiger mosquito.', 'El transmet la picada de mosquits Aedes, com el mosquit tigre.')),
  E('rabia', T('Rabia', 'Rabies', 'Ràbia'), 'virus', 'animal', T('Se contagia por la mordedura de un animal infectado, como un perro o un murciélago.', 'It is caught from the bite of an infected animal, such as a dog or a bat.', 'S’encomana per la mossegada d’un animal infectat, com un gos o un ratpenat.')),
  E('lyme', T('Enfermedad de Lyme', 'Lyme disease', 'Malaltia de Lyme'), 'bacteria', 'animal', T('La transmite la picadura de una garrapata.', 'It is spread by a tick bite.', 'La transmet la picada d’una paparra.')),
  E('sueno', T('Enfermedad del sueño', 'Sleeping sickness', 'Malaltia de la son'), 'protozoo', 'animal', T('La transmite la picadura de la mosca tse-tse.', 'It is spread by the bite of the tsetse fly.', 'La transmet la picada de la mosca tse-tse.')),
  E('leishmaniasis', T('Leishmaniasis', 'Leishmaniasis', 'Leishmaniosi'), 'protozoo', 'animal', T('La transmite la picadura de un mosquito flebótomo; en España, el perro es el reservorio.', 'It is spread by the bite of a sandfly; in Spain, dogs are the reservoir.', 'La transmet la picada d’un mosquit flebòtom; a Espanya, el gos n’és el reservori.')),
  E('varicela', T('Varicela', 'Chickenpox', 'Varicel·la'), 'virus', null),
  E('resfriado', T('Resfriado común', 'Common cold', 'Refredat comú'), 'virus', null),
  E('paperas', T('Paperas', 'Mumps', 'Galteres'), 'virus', null),
  E('tina', T('Tiña', 'Ringworm', 'Tinya'), 'hongo', null, T('Es un hongo de la piel, aunque deja manchas en forma de anillo.', 'Despite its name, it is not a worm: it is a skin fungus.', 'És un fong de la pell, encara que deixa taques en forma d’anell.')),
  E('candidiasis', T('Candidiasis', 'Thrush (candidiasis)', 'Candidiasi'), 'hongo', null),
  E('toxoplasmosis', T('Toxoplasmosis', 'Toxoplasmosis', 'Toxoplasmosi'), 'protozoo', null),
]
export const NO_INFECCIOSAS = [
  T('Diabetes tipo 2', 'Type 2 diabetes', 'Diabetis tipus 2'),
  T('Infarto de miocardio', 'Heart attack', 'Infart de miocardi'),
  T('Hipertensión', 'High blood pressure', 'Hipertensió'),
  T('Cáncer de pulmón', 'Lung cancer', 'Càncer de pulmó'),
  T('Alergia al polen', 'Hay fever (pollen allergy)', 'Al·lèrgia al pol·len'),
  T('Alzhéimer', 'Alzheimer’s disease', 'Alzheimer'),
  T('Osteoporosis', 'Osteoporosis', 'Osteoporosi'),
  T('Hemofilia', 'Haemophilia', 'Hemofília'),
  T('Ictus', 'Stroke', 'Ictus'),
  T('Artrosis', 'Osteoarthritis', 'Artrosi'),
]

export const LINEAS = {
  barrera:     T('Primera línea: barreras', 'First line: barriers', 'Primera línia: barreres'),
  inespecifica: T('Segunda línea: defensa inespecífica', 'Second line: non-specific defence', 'Segona línia: defensa inespecífica'),
  especifica:  T('Tercera línea: defensa específica (linfocitos)', 'Third line: specific defence (lymphocytes)', 'Tercera línia: defensa específica (limfòcits)'),
}
export const DEFENSAS = [
  ['barrera', '🧴', T('La piel, intacta, no deja pasar a los microbios.', 'Unbroken skin does not let microbes through.', 'La pell, intacta, no deixa passar els microbis.')],
  ['barrera', '😢', T('Las lágrimas arrastran los microbios del ojo y llevan lisozima, que los ataca.', 'Tears wash microbes out of the eye and contain lysozyme, which attacks them.', 'Les llàgrimes arrosseguen els microbis de l’ull i porten lisozim, que els ataca.')],
  ['barrera', '🤧', T('El moco de la nariz atrapa el polvo y los microbios del aire que respiras.', 'Mucus in the nose traps dust and microbes from the air you breathe.', 'El moc del nas atrapa la pols i els microbis de l’aire que respires.')],
  ['barrera', '🍽️', T('El ácido del estómago destruye muchos microbios que llegan con la comida.', 'Stomach acid destroys many microbes that arrive with food.', 'L’àcid de l’estómac destrueix molts microbis que arriben amb el menjar.')],
  ['barrera', '🌬️', T('Los cilios de la tráquea empujan el moco con los microbios hacia fuera.', 'Cilia in the windpipe sweep mucus and microbes back out.', 'Els cilis de la tràquea empenyen el moc amb els microbis cap a fora.')],
  ['inespecifica', '🔥', T('Alrededor de una herida infectada la piel se pone roja, caliente e hinchada.', 'The skin around an infected wound goes red, hot and swollen.', 'Al voltant d’una ferida infectada la pell es posa vermella, calenta i inflada.')],
  ['inespecifica', '🍽️', T('Unos glóbulos blancos, los fagocitos, se tragan a cualquier microbio que haya entrado.', 'White blood cells called phagocytes swallow any microbe that has got in.', 'Uns glòbuls blancs, els fagòcits, s’empassen qualsevol microbi que hagi entrat.')],
  ['inespecifica', '🌡️', T('Te sube la fiebre: el calor frena a muchos microbios y acelera las defensas.', 'You get a fever: the heat slows many microbes and speeds up your defences.', 'Et puja la febre: la calor frena molts microbis i accelera les defenses.')],
  ['especifica', '🎯', T('Unos linfocitos fabrican anticuerpos que solo reconocen al virus del sarampión.', 'Lymphocytes make antibodies that only recognise the measles virus.', 'Uns limfòcits fabriquen anticossos que només reconeixen el virus del xarampió.')],
  ['especifica', '🧠', T('No vuelves a pasar la varicela porque tus linfocitos de memoria la recuerdan.', 'You do not catch chickenpox again because your memory lymphocytes remember it.', 'No tornes a passar la varicel·la perquè els teus limfòcits de memòria la recorden.')],
  ['especifica', '💉', T('Una vacuna enseña a tu cuerpo a reconocer un microbio concreto antes de encontrárselo.', 'A vaccine teaches your body to recognise one particular microbe before it meets it.', 'Una vacuna ensenya al teu cos a reconèixer un microbi concret abans de trobar-se’l.')],
]

export const INMUNIDADES = {
  activaNatural:     T('Activa natural', 'Natural active', 'Activa natural'),
  activaArtificial:  T('Activa artificial', 'Artificial active', 'Activa artificial'),
  pasivaNatural:     T('Pasiva natural', 'Natural passive', 'Passiva natural'),
  pasivaArtificial:  T('Pasiva artificial', 'Artificial passive', 'Passiva artificial'),
}
export const CASOS_INMUNIDAD = [
  ['activaNatural', '🤒', T('Pasas la varicela y ya no vuelves a cogerla.', 'You have chickenpox and never catch it again.', 'Passes la varicel·la i ja no la tornes a agafar.')],
  ['activaNatural', '🛌', T('Te recuperas del sarampión y quedas protegido para siempre.', 'You recover from measles and are protected for life.', 'Et recuperes del xarampió i quedes protegit per sempre.')],
  ['activaArtificial', '💉', T('Te ponen la vacuna del tétanos.', 'You are given the tetanus vaccine.', 'Et posen la vacuna del tètanus.')],
  ['activaArtificial', '💉', T('Te vacunas contra la gripe en otoño.', 'You get a flu vaccine in autumn.', 'Et vacunes contra la grip a la tardor.')],
  ['pasivaNatural', '🤱', T('Un bebé recibe anticuerpos de su madre a través de la placenta.', 'A baby receives antibodies from its mother through the placenta.', 'Un nadó rep anticossos de la seva mare a través de la placenta.')],
  ['pasivaNatural', '🍼', T('Un bebé recibe anticuerpos con la leche materna.', 'A baby receives antibodies in breast milk.', 'Un nadó rep anticossos amb la llet materna.')],
  ['pasivaArtificial', '🐍', T('Tras la mordedura de una víbora te inyectan un suero con anticuerpos ya fabricados.', 'After a viper bite you are injected with a serum of ready-made antibodies.', 'Després de la mossegada d’un escurçó t’injecten un sèrum amb anticossos ja fabricats.')],
  ['pasivaArtificial', '🏥', T('Te inyectan suero antitetánico: anticuerpos contra el tétanos hechos fuera de tu cuerpo.', 'You are injected with tetanus antitoxin: antibodies against tetanus made outside your body.', 'T’injecten sèrum antitetànic: anticossos contra el tètanus fets fora del teu cos.')],
]

// ── Niveles ───────────────────────────────────────────────────────────────
export const NIVELES = {
  facil:   { tipos: ['microbio', 'microbio', 'agente', 'contagio', 'antibiotico', 'infecciosa'] },
  medio:   { tipos: ['celula', 'agente', 'contagio', 'antibiotico', 'defensa', 'defensa', 'generaciones'] },
  dificil: { tipos: ['celula', 'contagio', 'defensa', 'inmunidad', 'inmunidad', 'generaciones', 'grupo', 'grupo'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
export const enfermedad = id => ENFERMEDADES.find(e => e.id === id)
export const porcentajeGrupo = R => Math.round((1 - 1 / R) * 100)

// Lo que salió en las últimas rondas (enfermedad, microbio, caso), para no repetirlo seguido.
const recientes = []
const tema = r => r.enf ?? r.forma ?? (r.caso != null ? `${r.tipo}${r.caso}` : `${r.tipo}${r.R}`)

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    if (intento < 20 && recientes.includes(tema(r))) continue
    recientes.push(tema(r))
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'microbio' || tipo === 'celula') {
      const forma = elige(rand, Object.keys(FORMAS))
      const m = FORMAS[forma]
      if (tipo === 'microbio') return { ...base, forma, bueno: m, opciones: baraja(rand, Object.keys(MICROBIOS)) }
      return { ...base, forma, bueno: celulaDe(m), opciones: ['no', 'procariota', 'eucariota'] }
    }

    if (tipo === 'agente') {
      const e = elige(rand, ENFERMEDADES)
      return { ...base, enf: e.id, bueno: e.mic, opciones: baraja(rand, Object.keys(MICROBIOS)) }
    }

    if (tipo === 'contagio') {
      const e = elige(rand, ENFERMEDADES.filter(x => x.via))
      const otras = baraja(rand, Object.keys(VIAS).filter(v => v !== e.via)).slice(0, 3)
      return { ...base, enf: e.id, bueno: e.via, opciones: baraja(rand, [e.via, ...otras]) }
    }

    if (tipo === 'antibiotico') {
      const e = elige(rand, ENFERMEDADES.filter(x => x.mic === 'virus' || x.mic === 'bacteria'))
      return { ...base, enf: e.id, bueno: e.mic === 'bacteria' ? 'si-bacteria' : 'no-virus', opciones: ['si-bacteria', 'no-virus', 'si-virus', 'no-bacteria'] }
    }

    if (tipo === 'infecciosa') {
      // Una infecciosa entre tres que no lo son, o al revés.
      const alReves = rand() < 0.4
      const inf = baraja(rand, ENFERMEDADES).slice(0, alReves ? 3 : 1).map(e => `e:${e.id}`)
      const no = baraja(rand, NO_INFECCIOSAS.map((_, i) => `n:${i}`)).slice(0, alReves ? 1 : 3)
      return { ...base, alReves, bueno: alReves ? no[0] : inf[0], opciones: baraja(rand, [...inf, ...no]) }
    }

    if (tipo === 'defensa') {
      const k = Math.floor(rand() * DEFENSAS.length)
      return { ...base, caso: k, bueno: DEFENSAS[k][0], opciones: Object.keys(LINEAS) }
    }

    if (tipo === 'inmunidad') {
      const k = Math.floor(rand() * CASOS_INMUNIDAD.length)
      return { ...base, caso: k, bueno: CASOS_INMUNIDAD[k][0], opciones: Object.keys(INMUNIDADES) }
    }

    if (tipo === 'generaciones') {
      const R = elige(rand, [2, 3, 4])
      const k = elige(rand, R === 4 ? [2, 3] : [2, 3, 4])
      const bueno = R ** k
      const cands = [R * k, R ** (k - 1), R ** (k + 1), R + k, bueno * 2].filter(x => x !== bueno && x > 1)
      const ops = [...new Set(cands)].slice(0, 3)
      if (ops.length < 3) continue
      return { ...base, R, k, bueno, opciones: baraja(rand, [bueno, ...ops]) }
    }

    // grupo: inmunidad de grupo
    const R = elige(rand, [2, 3, 4, 5, 10, 20])
    const bueno = porcentajeGrupo(R)
    const cands = [Math.round(100 / R), 100, ...[2, 3, 4, 5, 10, 20].filter(x => x !== R).map(porcentajeGrupo)]
    const ops = [...new Set(cands.filter(x => x !== bueno))]
    const elegidas = [ops[0], ops[1], ...baraja(rand, ops.slice(2)).slice(0, 1)]
    return { ...base, R, bueno, opciones: baraja(rand, [bueno, ...elegidas]) }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const ANTIBIOTICO = {
  'si-bacteria': T('Sí: la causa una bacteria', 'Yes: it is caused by a bacterium', 'Sí: la causa un bacteri'),
  'no-virus': T('No: la causa un virus', 'No: it is caused by a virus', 'No: la causa un virus'),
  'si-virus': T('Sí: la causa un virus', 'Yes: it is caused by a virus', 'Sí: la causa un virus'),
  'no-bacteria': T('No: la causa una bacteria', 'No: it is caused by a bacterium', 'No: la causa un bacteri'),
}
const nombreEnf = (o, l) => (o.startsWith('e:') ? tx(enfermedad(o.slice(2)).nombre, l) : tx(NO_INFECCIOSAS[+o.slice(2)], l))

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'microbio': case 'agente': return tx(MICROBIOS[o], l)
    case 'celula': return tx(CELULA[o], l)
    case 'contagio': return `${VIAS[o].emoji} ${tx(VIAS[o].t, l)}`
    case 'antibiotico': return tx(ANTIBIOTICO[o], l)
    case 'infecciosa': return nombreEnf(o, l)
    case 'defensa': return tx(LINEAS[o], l)
    case 'inmunidad': return tx(INMUNIDADES[o], l)
    case 'generaciones': return String(o)
    default: return `${o} %`
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'microbio': return s(l, '¿Qué tipo de microbio es?', 'What type of microbe is this?', 'Quin tipus de microbi és?')
    case 'celula': return s(l, '¿Es una célula? ¿De qué tipo?', 'Is it a cell? What kind?', 'És una cèl·lula? De quin tipus?')
    case 'agente': return s(l, '¿Qué tipo de microbio la causa?', 'What type of microbe causes it?', 'Quin tipus de microbi la causa?')
    case 'contagio': return s(l, '¿Cómo se contagia?', 'How is it spread?', 'Com s’encomana?')
    case 'antibiotico': return s(l, '¿Pueden los antibióticos atacar al microbio que la causa?', 'Can antibiotics attack the microbe that causes it?', 'Poden els antibiòtics atacar el microbi que la causa?')
    case 'infecciosa': return r.alReves
      ? s(l, '¿Cuál de estas enfermedades NO es infecciosa?', 'Which of these diseases is NOT infectious?', 'Quina d’aquestes malalties NO és infecciosa?')
      : s(l, '¿Cuál de estas enfermedades es infecciosa?', 'Which of these diseases is infectious?', 'Quina d’aquestes malalties és infecciosa?')
    case 'defensa': return s(l, '¿Qué línea de defensa está actuando?', 'Which line of defence is at work?', 'Quina línia de defensa està actuant?')
    case 'inmunidad': return s(l, '¿Qué tipo de inmunidad es?', 'What type of immunity is this?', 'Quin tipus d’immunitat és?')
    case 'generaciones': return s(l,
      `Cada enfermo contagia a ${r.R} personas antes de curarse. Si empieza uno, ¿cuántos contagios nuevos hay en la generación ${r.k}?`,
      `Each sick person infects ${r.R} people before recovering. If it starts with one, how many new infections are there in generation ${r.k}?`,
      `Cada malalt n’encomana ${r.R} persones abans de curar-se. Si en comença un, quants contagis nous hi ha a la generació ${r.k}?`)
    default: return s(l,
      `Una enfermedad tiene R₀ = ${r.R}: cada enfermo contagia a ${r.R} personas si nadie está protegido. ¿Qué parte de la población hay que vacunar para frenar el brote?`,
      `A disease has R₀ = ${r.R}: each sick person infects ${r.R} people if nobody is protected. What share of the population must be vaccinated to stop the outbreak?`,
      `Una malaltia té R₀ = ${r.R}: cada malalt n’encomana ${r.R} persones si ningú no està protegit. Quina part de la població cal vacunar per frenar el brot?`)
  }
}

const MIC_UN = { virus: ['un virus', 'a virus', 'un virus'], bacteria: ['una bacteria', 'a bacterium', 'un bacteri'], hongo: ['un hongo', 'a fungus', 'un fong'], protozoo: ['un protozoo', 'a protozoan', 'un protozou'] }
const ix = l => (l === 'en' ? 1 : l === 'ca' ? 2 : 0)

export function explicacion(r, l) {
  const i = ix(l)
  switch (r.tipo) {
    case 'microbio': return s(l, `Es ${tx(NOMBRE_FORMA[r.forma], l)}.`, `It is ${tx(NOMBRE_FORMA[r.forma], l)}.`, `És ${tx(NOMBRE_FORMA[r.forma], l)}.`) + ' ' + PISTAS[FORMAS[r.forma]][i]
    case 'celula': return s(l, `Es ${tx(NOMBRE_FORMA[r.forma], l)}.`, `It is ${tx(NOMBRE_FORMA[r.forma], l)}.`, `És ${tx(NOMBRE_FORMA[r.forma], l)}.`) + ' ' + PISTAS_CELULA[r.bueno][i]
    case 'agente': case 'contagio': {
      const e = enfermedad(r.enf)
      const via = e.via ? s(l, ` Se contagia así: ${tx(VIAS[e.via].t, l).toLowerCase()}.`, ` It spreads like this: ${tx(VIAS[e.via].t, l).toLowerCase()}.`, ` S’encomana així: ${tx(VIAS[e.via].t, l).toLowerCase()}.`) : ''
      const nota = e.nota ? ' ' + tx(e.nota, l) : ''
      return s(l, `${tx(e.nombre, l)}: la causa ${MIC_UN[e.mic][0]}.`, `${tx(e.nombre, l)}: it is caused by ${MIC_UN[e.mic][1]}.`, `${tx(e.nombre, l)}: la causa ${MIC_UN[e.mic][2]}.`) + via + nota
    }
    case 'antibiotico': {
      const e = enfermedad(r.enf)
      return e.mic === 'bacteria'
        ? s(l, `${tx(e.nombre, l)}: la causa una bacteria, y los antibióticos actúan contra bacterias. Hay que tomarlos como diga el médico y hasta el final, para no crear bacterias resistentes.`, `${tx(e.nombre, l)}: it is caused by a bacterium, and antibiotics act against bacteria. They must be taken as the doctor says, to the end, so as not to breed resistant bacteria.`, `${tx(e.nombre, l)}: la causa un bacteri, i els antibiòtics actuen contra bacteris. Cal prendre’ls com digui el metge i fins al final, per no crear bacteris resistents.`)
        : s(l, `${tx(e.nombre, l)}: la causa un virus, y los antibióticos no hacen nada contra los virus: solo atacan bacterias. Tomarlos sin necesidad ayuda a que aparezcan bacterias resistentes.`, `${tx(e.nombre, l)}: it is caused by a virus, and antibiotics do nothing against viruses: they only attack bacteria. Taking them needlessly helps resistant bacteria appear.`, `${tx(e.nombre, l)}: la causa un virus, i els antibiòtics no fan res contra els virus: només ataquen bacteris. Prendre’ls sense necessitat ajuda que apareguin bacteris resistents.`)
    }
    case 'infecciosa': {
      const b = nombreEnf(r.bueno, l)
      return r.alReves
        ? s(l, `${b}: no la causa ningún microbio, así que no es infecciosa: influyen los genes, la edad o los hábitos. Las otras las causan microbios.`, `${b}: it is not caused by any microbe, so it is not infectious: genes, age or lifestyle play a part. The others are caused by microbes.`, `${b}: no la causa cap microbi, així que no és infecciosa: hi influeixen els gens, l’edat o els hàbits. Les altres les causen microbis.`)
        : s(l, `${b}: la causa ${MIC_UN[enfermedad(r.bueno.slice(2)).mic][0]}: es infecciosa. Las otras no las causa ningún microbio: influyen los genes, la edad o los hábitos.`, `${b}: it is caused by ${MIC_UN[enfermedad(r.bueno.slice(2)).mic][1]}: it is infectious. The others are not caused by microbes: genes, age or lifestyle play a part.`, `${b}: la causa ${MIC_UN[enfermedad(r.bueno.slice(2)).mic][2]}: és infecciosa. Les altres no les causa cap microbi: hi influeixen els gens, l’edat o els hàbits.`)
    }
    case 'defensa': return PISTAS_LINEA[r.bueno][i]
    case 'inmunidad': return PISTAS_INMUNIDAD[r.bueno][i]
    case 'generaciones': {
      const serie = Array.from({ length: r.k + 1 }, (_, g) => r.R ** g).join(' → ')
      return s(l,
        `Cada generación multiplica por ${r.R}: ${serie}. Son ${r.R}${sup(r.k)} = ${r.bueno}, no ${r.R} · ${r.k}. Por eso un brote crece tan deprisa al principio.`,
        `Each generation multiplies by ${r.R}: ${serie}. That is ${r.R}${sup(r.k)} = ${r.bueno}, not ${r.R} × ${r.k}. That is why an outbreak grows so fast at first.`,
        `Cada generació multiplica per ${r.R}: ${serie}. Són ${r.R}${sup(r.k)} = ${r.bueno}, no ${r.R} · ${r.k}. Per això un brot creix tan de pressa al principi.`)
    }
    default: return s(l,
      `Para que cada enfermo contagie a menos de una persona, de cada ${r.R} contactos solo puede quedar 1 sin proteger: hay que vacunar 1 − 1/${r.R} ≈ ${r.bueno} %. Es la inmunidad de grupo (en un modelo sencillo): cuanto más contagiosa es la enfermedad, más alto el porcentaje.`,
      `For each sick person to infect fewer than one other, only 1 in every ${r.R} contacts can be left unprotected: you must vaccinate 1 − 1/${r.R} ≈ ${r.bueno} %. That is herd immunity (in a simple model): the more contagious the disease, the higher the percentage.`,
      `Perquè cada malalt n’encomani menys d’una persona, de cada ${r.R} contactes només en pot quedar 1 sense protegir: cal vacunar 1 − 1/${r.R} ≈ ${r.bueno} %. És la immunitat de grup (en un model senzill): com més contagiosa és la malaltia, més alt el percentatge.`)
  }
}
const SUPS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵' }
const sup = k => SUPS[k]

const PISTAS = {
  virus: ['Los virus no son células: son material genético dentro de una cápsula, y son mucho más pequeños que una bacteria.', 'Viruses are not cells: they are genetic material inside a capsule, and much smaller than a bacterium.', 'Els virus no són cèl·lules: són material genètic dins d’una càpsula, i molt més petits que un bacteri.'],
  bacteria: ['Las bacterias son células sin núcleo; su forma (bacilo, coco, espirilo) sirve para clasificarlas.', 'Bacteria are cells with no nucleus; their shape (bacillus, coccus, spirillum) is used to classify them.', 'Els bacteris són cèl·lules sense nucli; la forma (bacil, coc, espiril) serveix per classificar-los.'],
  hongo: ['Los hongos tienen células con núcleo y pared; unos son unicelulares (levaduras) y otros forman hifas (mohos).', 'Fungi have cells with a nucleus and a wall; some are single-celled (yeasts) and others form hyphae (moulds).', 'Els fongs tenen cèl·lules amb nucli i paret; uns són unicel·lulars (llevats) i altres formen hifes (floridures).'],
  protozoo: ['Los protozoos son seres unicelulares con núcleo que se mueven: con pseudópodos, cilios o flagelos.', 'Protozoa are single-celled organisms with a nucleus that move: with pseudopodia, cilia or flagella.', 'Els protozous són éssers unicel·lulars amb nucli que es mouen: amb pseudòpodes, cilis o flagels.'],
}
const PISTAS_CELULA = {
  no: ['Un virus no es una célula: no tiene metabolismo propio y solo se multiplica dentro de las células que infecta.', 'A virus is not a cell: it has no metabolism of its own and only multiplies inside the cells it infects.', 'Un virus no és una cèl·lula: no té metabolisme propi i només es multiplica dins de les cèl·lules que infecta.'],
  procariota: ['Las bacterias son células procariotas: su ADN está suelto en el citoplasma, sin núcleo.', 'Bacteria are prokaryotic cells: their DNA floats free in the cytoplasm, with no nucleus.', 'Els bacteris són cèl·lules procariotes: el seu ADN és lliure al citoplasma, sense nucli.'],
  eucariota: ['Hongos y protozoos tienen células eucariotas, con el ADN dentro de un núcleo, como las nuestras.', 'Fungi and protozoa have eukaryotic cells, with the DNA inside a nucleus, like ours.', 'Fongs i protozous tenen cèl·lules eucariotes, amb l’ADN dins d’un nucli, com les nostres.'],
}
const PISTAS_LINEA = {
  barrera: ['Es una barrera: impide que los microbios entren, sin atacar a ninguno en concreto. Piel, mucosas, moco, lágrimas y ácido del estómago.', 'It is a barrier: it stops microbes getting in, without targeting any particular one. Skin, mucous membranes, mucus, tears and stomach acid.', 'És una barrera: impedeix que els microbis entrin, sense atacar-ne cap en concret. Pell, mucoses, moc, llàgrimes i àcid de l’estómac.'],
  inespecifica: ['Es la defensa inespecífica: actúa cuando el microbio ya ha entrado, igual contra todos. Inflamación, fiebre y fagocitos.', 'It is the non-specific defence: it acts once the microbe is inside, the same against all of them. Inflammation, fever and phagocytes.', 'És la defensa inespecífica: actua quan el microbi ja ha entrat, igual contra tots. Inflamació, febre i fagòcits.'],
  especifica: ['Es la defensa específica: los linfocitos reconocen un microbio concreto, fabrican anticuerpos contra él y lo recuerdan. En eso se basan las vacunas.', 'It is the specific defence: lymphocytes recognise one particular microbe, make antibodies against it and remember it. Vaccines rely on this.', 'És la defensa específica: els limfòcits reconeixen un microbi concret, fabriquen anticossos contra ell i el recorden. Les vacunes s’hi basen.'],
}
const PISTAS_INMUNIDAD = {
  activaNatural: ['Activa, porque tu cuerpo fabrica los anticuerpos y la memoria; natural, porque fue al pasar la enfermedad. Dura mucho.', 'Active, because your body makes the antibodies and memory; natural, because it came from having the disease. It lasts a long time.', 'Activa, perquè el teu cos fabrica els anticossos i la memòria; natural, perquè va ser en passar la malaltia. Dura molt.'],
  activaArtificial: ['Activa, porque tu cuerpo fabrica los anticuerpos y la memoria; artificial, porque la provoca una vacuna, sin pasar la enfermedad.', 'Active, because your body makes the antibodies and memory; artificial, because a vaccine triggers it, without having the disease.', 'Activa, perquè el teu cos fabrica els anticossos i la memòria; artificial, perquè la provoca una vacuna, sense passar la malaltia.'],
  pasivaNatural: ['Pasiva, porque los anticuerpos llegan ya hechos (de la madre); natural, porque es así como nacemos y nos alimentamos. Dura poco: no deja memoria.', 'Passive, because the antibodies arrive ready-made (from the mother); natural, because that is how we are born and fed. It is short-lived: there is no memory.', 'Passiva, perquè els anticossos arriben ja fets (de la mare); natural, perquè és així com naixem i ens alimentem. Dura poc: no deixa memòria.'],
  pasivaArtificial: ['Pasiva, porque te inyectan anticuerpos ya fabricados (un suero); artificial, porque es un tratamiento médico. Protege enseguida pero dura poco.', 'Passive, because you are injected with ready-made antibodies (a serum); artificial, because it is a medical treatment. It protects at once but does not last.', 'Passiva, perquè t’injecten anticossos ja fabricats (un sèrum); artificial, perquè és un tractament mèdic. Protegeix de seguida però dura poc.'],
}

export function schemaQuestion(r, l) {
  const extra = r.enf ? `${tx(enfermedad(r.enf).nombre, l)}. `
    : r.tipo === 'defensa' ? `${tx(DEFENSAS[r.caso][2], l)} `
    : r.tipo === 'inmunidad' ? `${tx(CASOS_INMUNIDAD[r.caso][2], l)} `
    : r.forma ? `${tx(ASPECTO[r.forma], l)}. ` : ''
  return {
    question: `${extra}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
