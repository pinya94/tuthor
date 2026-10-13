// ¡Brote! (biología · salud y enfermedad, ESO y Bachillerato).
//
// Un juego de hacer, no de elegir respuestas:
//   cortafuegos  cuadrícula de personas: vacunar a 3 y simular el contagio
//                generación a generación (la meta siempre se puede alcanzar)
//   umbral       deslizador del % vacunado frente a R₀ (1 − 1/R₀), con el R
//                efectivo en vivo
//   ficha        completar la ficha de una enfermedad: microbio y contagio
//   clasifica    tarjetas a su caja: microbios dibujados, célula o no,
//                infecciosas, antibióticos, líneas de defensa, inmunidad
//
// Solo entran enfermedades de libro de texto con una respuesta indiscutible:
// las que se contagian de varias formas no tienen vía en la ficha, y los
// antibióticos solo se clasifican con virus y bacterias.

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

// ── Frena el brote (cortafuegos) ──────────────────────────────────────────
// Cuadrícula de personas; cada enfermo contagia a sus vecinos (arriba, abajo,
// izquierda, derecha) que no estén protegidos. Con VACUNAS vacunas hay que
// dejar el brote en la meta o menos. La meta sale de buscar el mejor
// resultado posible (fuerza bruta), así que siempre se puede.
export const LADO = 6
export const VACUNAS = 3
const vecinos = i => {
  const f = Math.floor(i / LADO), c = i % LADO, v = []
  if (f > 0) v.push(i - LADO)
  if (f < LADO - 1) v.push(i + LADO)
  if (c > 0) v.push(i - 1)
  if (c < LADO - 1) v.push(i + 1)
  return v
}
// Generaciones del contagio: [[cero], [los que contagia], …]
export function contagio(cero, protegidos) {
  const prot = new Set(protegidos)
  const visto = new Set([cero])
  const gens = [[cero]]
  for (;;) {
    const nueva = []
    for (const x of gens[gens.length - 1]) for (const v of vecinos(x)) if (!visto.has(v) && !prot.has(v)) { visto.add(v); nueva.push(v) }
    if (!nueva.length) return gens
    gens.push(nueva)
  }
}
export const infectados = (cero, protegidos) => contagio(cero, protegidos).flat().length
// El mínimo de infectados con VACUNAS vacunas (probando todas las combinaciones).
export function mejorResultado(cero, inmunes) {
  const libres = Array.from({ length: LADO * LADO }, (_, i) => i).filter(i => i !== cero && !inmunes.includes(i))
  let mejor = Infinity
  const n = libres.length
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) {
    const r = infectados(cero, [...inmunes, libres[a], libres[b], libres[c]])
    if (r < mejor) mejor = r
  }
  return mejor
}
const HOLGURA = { facil: 6, medio: 3, dificil: 0 }

// ── Inmunidad de grupo ────────────────────────────────────────────────────
export const porcentajeGrupo = R => Math.round((1 - 1 / R) * 100)
// Se acierta con el umbral o hasta 5 puntos más (vacunar de más también frena,
// pero la gracia es saber el mínimo).
export const MARGEN_UMBRAL = 5

// ── Clasificar ────────────────────────────────────────────────────────────
export const VARIANTES = {
  microbios: { cajas: Object.keys(MICROBIOS) },
  celulas: { cajas: ['no', 'procariota', 'eucariota'] },
  infecciosas: { cajas: ['si', 'no'] },
  antibioticos: { cajas: ['si', 'no'] },
  defensas: { cajas: Object.keys(LINEAS) },
  inmunidad: { cajas: Object.keys(INMUNIDADES) },
}

export const NIVELES = {
  facil:   { tipos: ['ficha', 'ficha', 'clasifica', 'clasifica', 'cortafuegos'], clasifica: ['microbios', 'infecciosas', 'antibioticos'] },
  medio:   { tipos: ['ficha', 'clasifica', 'clasifica', 'cortafuegos', 'cortafuegos'], clasifica: ['celulas', 'antibioticos', 'defensas'] },
  dificil: { tipos: ['ficha', 'clasifica', 'cortafuegos', 'cortafuegos', 'umbral', 'umbral'], clasifica: ['defensas', 'inmunidad', 'celulas'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
export const enfermedad = id => ENFERMEDADES.find(e => e.id === id)

const recientes = []
export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    if (intento < 20 && recientes.includes(r.clave)) continue
    recientes.push(r.clave)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'ficha') {
      const e = elige(rand, ENFERMEDADES)
      return { ...base, clave: e.id, enf: e.id, bueno: `${e.mic}|${e.via ?? '-'}` }
    }

    if (tipo === 'cortafuegos') {
      // El primer enfermo cerca de un borde o de un grupo de inmunes: así
      // tres vacunas pueden encerrarlo.
      const cero = Math.floor(rand() * LADO * LADO)
      const inmunes = baraja(rand, Array.from({ length: LADO * LADO }, (_, i) => i).filter(i => i !== cero)).slice(0, 4 + Math.floor(rand() * 4))
      const mejor = mejorResultado(cero, inmunes)
      if (mejor > 10 || mejor < 3) continue
      const sinNada = infectados(cero, inmunes)
      if (sinNada < 18) continue
      const meta = Math.min(sinNada - 1, mejor + HOLGURA[nivel])
      return { ...base, clave: `cf${cero}`, cero, inmunes, meta, mejor, bueno: `cf:${mejor}` }
    }

    if (tipo === 'umbral') {
      const R = elige(rand, [2, 3, 4, 5, 10])
      const u = porcentajeGrupo(R)
      return { ...base, clave: `u${R}`, R, umbral: u, bueno: `p:${u}` }
    }

    // clasifica
    const variante = elige(rand, cfg.clasifica)
    let items
    if (variante === 'microbios' || variante === 'celulas') items = baraja(rand, Object.keys(FORMAS)).slice(0, 4).map(f => `f:${f}`)
    else if (variante === 'infecciosas') items = baraja(rand, [...baraja(rand, ENFERMEDADES).slice(0, 2).map(e => `e:${e.id}`), ...baraja(rand, NO_INFECCIOSAS.map((_, i) => `n:${i}`)).slice(0, 2)])
    else if (variante === 'antibioticos') items = baraja(rand, ENFERMEDADES.filter(e => e.mic === 'virus' || e.mic === 'bacteria')).slice(0, 4).map(e => `e:${e.id}`)
    else if (variante === 'defensas') items = baraja(rand, DEFENSAS.map((_, i) => `d:${i}`)).slice(0, 4)
    else items = baraja(rand, CASOS_INMUNIDAD.map((_, i) => `i:${i}`)).slice(0, 4)
    const r = { ...base, variante, items, cajas: VARIANTES[variante].cajas, bueno: 'clasifica:0' }
    if (new Set(items.map(it => cajaDe(r, it))).size < 2) continue
    return { ...r, clave: `cl${items.join()}` }
  }
}

// A qué caja va cada tarjeta.
export function cajaDe(r, item) {
  const [k, v] = [item.slice(0, 1), item.slice(2)]
  if (r.variante === 'microbios') return FORMAS[v]
  if (r.variante === 'celulas') return celulaDe(FORMAS[v])
  if (r.variante === 'infecciosas') return k === 'e' ? 'si' : 'no'
  if (r.variante === 'antibioticos') return enfermedad(v).mic === 'bacteria' ? 'si' : 'no'
  if (r.variante === 'defensas') return DEFENSAS[+v][0]
  return CASOS_INMUNIDAD[+v][0]
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: ficha «microbio|vía»; cortafuegos «cf:infectados»; umbral
// «p:porcentaje»; clasifica «clasifica:fallos».
export function esCorrecta(r, o) {
  const t = String(o)
  if (r.tipo === 'cortafuegos') return t.startsWith('cf:') && +t.slice(3) <= r.meta
  if (r.tipo === 'umbral') { const p = +t.slice(2); return t.startsWith('p:') && p >= r.umbral && p <= r.umbral + MARGEN_UMBRAL }
  return t === r.bueno
}

// ── Textos ────────────────────────────────────────────────────────────────
const CAJAS_TXT = {
  infecciosas: { si: T('Infecciosa: la causa un microbio', 'Infectious: caused by a microbe', 'Infecciosa: la causa un microbi'), no: T('No infecciosa', 'Not infectious', 'No infecciosa') },
  antibioticos: { si: T('Los antibióticos sirven (bacteria)', 'Antibiotics work (bacterium)', 'Els antibiòtics serveixen (bacteri)'), no: T('No sirven (virus)', 'They don’t work (virus)', 'No serveixen (virus)') },
}
export function textoCaja(r, c, l) {
  if (r.variante === 'microbios') return tx(MICROBIOS[c], l)
  if (r.variante === 'celulas') return tx(CELULA[c], l).split(':')[0]
  if (r.variante === 'defensas') return tx(LINEAS[c], l)
  if (r.variante === 'inmunidad') return tx(INMUNIDADES[c], l)
  return tx(CAJAS_TXT[r.variante][c], l)
}
export function textoItem(item, l) {
  const [k, v] = [item.slice(0, 1), item.slice(2)]
  if (k === 'f') return tx(ASPECTO[v], l)
  if (k === 'e') return tx(enfermedad(v).nombre, l)
  if (k === 'n') return tx(NO_INFECCIOSAS[+v], l)
  if (k === 'd') return `${DEFENSAS[+v][1]} ${tx(DEFENSAS[+v][2], l)}`
  return `${CASOS_INMUNIDAD[+v][1]} ${tx(CASOS_INMUNIDAD[+v][2], l)}`
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'ficha': return s(l, 'Completa la ficha: ¿qué microbio la causa y cómo se contagia?', 'Complete the card: which microbe causes it and how does it spread?', 'Completa la fitxa: quin microbi la causa i com s’encomana?')
    case 'cortafuegos': return s(l, `Vacuna a ${VACUNAS} personas y luego simula: que no enfermen más de ${r.meta}`, `Vaccinate ${VACUNAS} people, then run it: no more than ${r.meta} may fall ill`, `Vacuna ${VACUNAS} persones i després simula: que no emmalalteixin més de ${r.meta}`)
    case 'umbral': return s(l, `Una enfermedad tiene R₀ = ${r.R}. ¿Qué parte de la población hay que vacunar, como mínimo, para frenarla?`, `A disease has R₀ = ${r.R}. What is the smallest share of the population to vaccinate to stop it?`, `Una malaltia té R₀ = ${r.R}. Quina part de la població cal vacunar, com a mínim, per frenar-la?`)
    default: return {
      microbios: s(l, '¿Qué tipo de microbio es cada uno?', 'What type of microbe is each one?', 'Quin tipus de microbi és cadascun?'),
      celulas: s(l, '¿Es una célula? ¿De qué tipo?', 'Is it a cell? What kind?', 'És una cèl·lula? De quin tipus?'),
      infecciosas: s(l, '¿Cuáles son infecciosas?', 'Which ones are infectious?', 'Quines són infeccioses?'),
      antibioticos: s(l, '¿Sirven los antibióticos contra cada una?', 'Do antibiotics work against each one?', 'Serveixen els antibiòtics contra cadascuna?'),
      defensas: s(l, '¿Qué línea de defensa actúa en cada caso?', 'Which line of defence is at work in each case?', 'Quina línia de defensa actua en cada cas?'),
      inmunidad: s(l, '¿Qué tipo de inmunidad es cada caso?', 'What type of immunity is each case?', 'Quin tipus d’immunitat és cada cas?'),
    }[r.variante]
  }
}

const MIC_UN = { virus: ['un virus', 'a virus', 'un virus'], bacteria: ['una bacteria', 'a bacterium', 'un bacteri'], hongo: ['un hongo', 'a fungus', 'un fong'], protozoo: ['un protozoo', 'a protozoan', 'un protozou'] }
const ix = l => (l === 'en' ? 1 : l === 'ca' ? 2 : 0)

export function explicacion(r, l) {
  const i = ix(l)
  switch (r.tipo) {
    case 'ficha': {
      const e = enfermedad(r.enf)
      const via = e.via ? s(l, ` Se contagia así: ${tx(VIAS[e.via].t, l).toLowerCase()}.`, ` It spreads like this: ${tx(VIAS[e.via].t, l).toLowerCase()}.`, ` S’encomana així: ${tx(VIAS[e.via].t, l).toLowerCase()}.`) : s(l, ' Se contagia de varias formas.', ' It spreads in several ways.', ' S’encomana de diverses maneres.')
      const nota = e.nota ? ' ' + tx(e.nota, l) : ''
      return s(l, `${tx(e.nombre, l)}: la causa ${MIC_UN[e.mic][0]}.`, `${tx(e.nombre, l)}: it is caused by ${MIC_UN[e.mic][1]}.`, `${tx(e.nombre, l)}: la causa ${MIC_UN[e.mic][2]}.`) + via + nota + ' ' + PISTAS[e.mic][i]
    }
    case 'cortafuegos': return s(l,
      `Cada enfermo contagia a sus vecinos sin proteger, generación tras generación. Las vacunas sirven de cortafuegos: si rodean al brote junto a los bordes y a los que ya son inmunes, el virus no tiene a quién pasar. Lo mejor posible eran ${r.mejor} enfermos. Es la idea de la inmunidad de grupo: los protegidos también protegen a los demás.`,
      `Each sick person infects their unprotected neighbours, generation after generation. Vaccines act as a firebreak: if they surround the outbreak along with the edges and those already immune, the virus has nobody to pass to. The best possible was ${r.mejor} ill. That is the idea behind herd immunity: protected people also protect others.`,
      `Cada malalt encomana els veïns sense protegir, generació rere generació. Les vacunes fan de tallafoc: si envolten el brot juntament amb les vores i els que ja són immunes, el virus no té a qui passar. El millor possible eren ${r.mejor} malalts. És la idea de la immunitat de grup: els protegits també protegeixen els altres.`)
    case 'umbral': return s(l,
      `Con R₀ = ${r.R}, si se vacuna una fracción p, cada enfermo contagia de media a ${r.R} · (1 − p). Para que sea menos de 1 hace falta p ≥ 1 − 1/${r.R} ≈ ${r.umbral} %. Por debajo, el brote crece; por encima, se apaga. Cuanto más contagiosa, más alto el porcentaje (el sarampión, con R₀ ≈ 15, pide más del 90 %).`,
      `With R₀ = ${r.R}, if a fraction p is vaccinated, each sick person infects on average ${r.R} × (1 − p). For that to be below 1 you need p ≥ 1 − 1/${r.R} ≈ ${r.umbral} %. Below it the outbreak grows; above it, it dies out. The more contagious, the higher the share (measles, with R₀ ≈ 15, needs over 90 %).`,
      `Amb R₀ = ${r.R}, si es vacuna una fracció p, cada malalt n’encomana de mitjana ${r.R} · (1 − p). Perquè sigui menys d’1 cal p ≥ 1 − 1/${r.R} ≈ ${r.umbral} %. Per sota, el brot creix; per sobre, s’apaga. Com més contagiosa, més alt el percentatge (el xarampió, amb R₀ ≈ 15, en demana més del 90 %).`)
    default: {
      if (r.variante === 'microbios') return PISTAS[FORMAS[r.items[0].slice(2)]][i] + ' ' + s(l, 'Las formas: virus (sin célula), bacterias sin núcleo (bastón, bolitas, espiral), hongos (levaduras, mohos) y protozoos que se mueven.', 'The shapes: viruses (no cell), bacteria with no nucleus (rod, balls, spiral), fungi (yeasts, moulds) and protozoa that move.', 'Les formes: virus (sense cèl·lula), bacteris sense nucli (bastó, boletes, espiral), fongs (llevats, floridures) i protozous que es mouen.')
      if (r.variante === 'celulas') return `${PISTAS_CELULA.no[i]} ${PISTAS_CELULA.procariota[i]} ${PISTAS_CELULA.eucariota[i]}`
      if (r.variante === 'infecciosas') return s(l, 'Una enfermedad es infecciosa si la causa un microbio que pasa de unos a otros. Las demás dependen de los genes, la edad o los hábitos.', 'A disease is infectious if a microbe that passes between people causes it. The others depend on genes, age or lifestyle.', 'Una malaltia és infecciosa si la causa un microbi que passa d’uns a altres. Les altres depenen dels gens, l’edat o els hàbits.')
      if (r.variante === 'antibioticos') return s(l, 'Los antibióticos solo atacan bacterias: contra un virus no hacen nada, y tomarlos sin necesidad crea bacterias resistentes.', 'Antibiotics only attack bacteria: against a virus they do nothing, and taking them needlessly breeds resistant bacteria.', 'Els antibiòtics només ataquen bacteris: contra un virus no fan res, i prendre’ls sense necessitat crea bacteris resistents.') + ' ' + r.items.map(it => `${tx(enfermedad(it.slice(2)).nombre, l)}: ${tx(MICROBIOS[enfermedad(it.slice(2)).mic], l).toLowerCase()}`).join(' · ')
      if (r.variante === 'defensas') return `${PISTAS_LINEA.barrera[i]} ${PISTAS_LINEA.inespecifica[i]} ${PISTAS_LINEA.especifica[i]}`
      return s(l, 'Activa: tu cuerpo fabrica los anticuerpos (al pasar la enfermedad o con una vacuna). Pasiva: los anticuerpos llegan hechos (de la madre o en un suero). Natural o artificial: si pasa sola o por un tratamiento médico.', 'Active: your body makes the antibodies (from the disease or a vaccine). Passive: the antibodies arrive ready-made (from the mother or in a serum). Natural or artificial: whether it happens by itself or through medical treatment.', 'Activa: el teu cos fabrica els anticossos (en passar la malaltia o amb una vacuna). Passiva: els anticossos arriben fets (de la mare o en un sèrum). Natural o artificial: si passa sola o per un tractament mèdic.') + ' ' + PISTAS_INMUNIDAD[cajaDe(r, r.items[0])][i]
    }
  }
}

export function schemaQuestion(r, l) {
  switch (r.tipo) {
    case 'ficha': {
      const e = enfermedad(r.enf)
      return { question: s(l, `${tx(e.nombre, l)}: ¿qué tipo de microbio la causa?`, `${tx(e.nombre, l)}: what type of microbe causes it?`, `${tx(e.nombre, l)}: quin tipus de microbi la causa?`), correctAnswer: tx(MICROBIOS[e.mic], l), wrongAnswers: Object.keys(MICROBIOS).filter(m => m !== e.mic).map(m => tx(MICROBIOS[m], l)) }
    }
    case 'cortafuegos': return { question: s(l, 'Para frenar un brote, ¿a quién conviene vacunar primero?', 'To stop an outbreak, who is best vaccinated first?', 'Per frenar un brot, a qui convé vacunar primer?'), correctAnswer: s(l, 'A quienes rodean al enfermo, para cortar el contagio', 'Those around the sick person, to cut off the spread', 'Els qui envolten el malalt, per tallar el contagi'), wrongAnswers: [s(l, 'A los que viven más lejos', 'Those who live furthest away', 'Els que viuen més lluny'), s(l, 'A los que ya pasaron la enfermedad', 'Those who already had the disease', 'Els que ja van passar la malaltia')] }
    case 'umbral': {
      const malas = [Math.round(100 / r.R), 100, ...[2, 3, 4, 5, 10].filter(x => x !== r.R).map(porcentajeGrupo)].filter(x => x !== r.umbral)
      return { question: enunciado(r, l), correctAnswer: `${r.umbral} %`, wrongAnswers: [...new Set(malas)].slice(0, 3).map(x => `${x} %`) }
    }
    default: {
      const it = r.items[0]
      const c = cajaDe(r, it)
      return { question: `${textoItem(it, l)}. ${enunciado(r, l)}`, correctAnswer: textoCaja(r, c, l), wrongAnswers: r.cajas.filter(x => x !== c).map(x => textoCaja(r, x, l)) }
    }
  }
}

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

