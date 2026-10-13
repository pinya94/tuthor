// La Galería (arte · la pintura, ESO y Bachillerato).
//
// Dos fuentes, a elegir (como en Bajo el Microscopio):
//   real     cuadros auténticos (por defecto). Solo de pintores muertos antes
//            de 1946: en España sus obras ya son de dominio público (80 años
//            post mortem para quien murió antes de 1987). Por eso surrealismo
//            y pop art no tienen cuadro real: Dalí, Magritte, Miró, Warhol y
//            Lichtenstein siguen protegidos. Imágenes en public/galeria, con
//            su procedencia en PROCEDENCIA.md.
//   dibujo   cuadros dibujados «al estilo de» cada movimiento (SVG propios:
//            components/laGaleria), para ver el concepto exagerado.
//
// Se pregunta:
//   cuadro   un cuadro (real o dibujado) → qué estilo es
//   pintor   quién pintó esta obra famosa
//   estilo   a qué estilo pertenece esta obra
//   rasgo    qué estilo tiene estos rasgos
//   orden    cuál de cuatro obras es la más antigua
//
// Solo títulos, autores y fechas (datos). Las obras de clasificación
// discutida (Goya, El Greco, el Guernica) no están. Los estilos vecinos son
// las opciones falsas preferidas: es donde se confunden.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const tx = (o, l) => o[l] ?? o.es

export const ESTILOS = {
  gotico: { nombre: T('Gótico', 'Gothic', 'Gòtic'), dibujo: true,
    rasgo: T('Fondos dorados y planos, figuras alargadas y rígidas, y las más importantes, más grandes; temas religiosos.', 'Flat gold backgrounds, stiff elongated figures, the most important ones drawn largest; religious subjects.', 'Fons daurats i plans, figures allargades i rígides, i les més importants, més grans; temes religiosos.') },
  renacimiento: { nombre: T('Renacimiento', 'Renaissance', 'Renaixement'), dibujo: true,
    rasgo: T('Perspectiva con punto de fuga, composición en triángulo, proporción y equilibrio inspirados en la Antigüedad clásica.', 'Perspective with a vanishing point, triangular composition, proportion and balance inspired by classical antiquity.', 'Perspectiva amb punt de fuga, composició en triangle, proporció i equilibri inspirats en l’Antiguitat clàssica.') },
  barroco: { nombre: T('Barroco', 'Baroque', 'Barroc'), dibujo: true,
    rasgo: T('Claroscuro: fondos oscuros y luz intensa sobre las figuras, composiciones en diagonal, movimiento y realismo.', 'Chiaroscuro: dark backgrounds and strong light on the figures, diagonal compositions, movement and realism.', 'Clarobscur: fons foscos i llum intensa sobre les figures, composicions en diagonal, moviment i realisme.') },
  romanticismo: { nombre: T('Romanticismo', 'Romanticism', 'Romanticisme'), dibujo: true,
    rasgo: T('Emoción y drama: naturaleza salvaje, tormentas, mares embravecidos y el individuo pequeño frente a ella.', 'Emotion and drama: wild nature, storms, raging seas and the small individual facing them.', 'Emoció i drama: natura salvatge, tempestes, mars embravides i l’individu petit davant seu.') },
  realismo: { nombre: T('Realismo', 'Realism', 'Realisme'), dibujo: false,
    rasgo: T('Escenas de la vida cotidiana y del trabajo, campesinos y obreros, pintados tal como son, sin idealizar.', 'Scenes of everyday life and work, peasants and labourers, painted as they are, without idealising.', 'Escenes de la vida quotidiana i de la feina, pagesos i obrers, pintats tal com són, sense idealitzar.') },
  impresionismo: { nombre: T('Impresionismo', 'Impressionism', 'Impressionisme'), dibujo: true,
    rasgo: T('Pinceladas sueltas de colores puros, pintura al aire libre y la luz cambiante del momento; sin contornos.', 'Loose brushstrokes of pure colour, painting outdoors and the changing light of the moment; no outlines.', 'Pinzellades soltes de colors purs, pintura a l’aire lliure i la llum canviant del moment; sense contorns.') },
  postimpresionismo: { nombre: T('Postimpresionismo', 'Post-Impressionism', 'Postimpressionisme'), dibujo: false,
    rasgo: T('Parte del impresionismo pero busca más: pinceladas gruesas y ondulantes, color expresivo o formas geométricas sólidas.', 'It starts from Impressionism but goes further: thick swirling strokes, expressive colour or solid geometric forms.', 'Parteix de l’impressionisme però hi busca més: pinzellades gruixudes i ondulants, color expressiu o formes geomètriques sòlides.') },
  expresionismo: { nombre: T('Expresionismo', 'Expressionism', 'Expressionisme'), dibujo: true,
    rasgo: T('Colores violentos y figuras deformadas para expresar angustia y emociones intensas.', 'Violent colours and distorted figures to express anguish and intense emotions.', 'Colors violents i figures deformades per expressar angoixa i emocions intenses.') },
  cubismo: { nombre: T('Cubismo', 'Cubism', 'Cubisme'), dibujo: true,
    rasgo: T('Objetos descompuestos en formas geométricas y vistos desde varios puntos de vista a la vez, con colores apagados.', 'Objects broken into geometric shapes and seen from several viewpoints at once, in muted colours.', 'Objectes descompostos en formes geomètriques i vistos des de diversos punts de vista alhora, amb colors apagats.') },
  surrealismo: { nombre: T('Surrealismo', 'Surrealism', 'Surrealisme'), dibujo: true,
    rasgo: T('El mundo de los sueños: objetos imposibles o fuera de lugar, pintados con precisión en paisajes extraños.', 'The world of dreams: impossible or out-of-place objects, painted precisely in strange landscapes.', 'El món dels somnis: objectes impossibles o fora de lloc, pintats amb precisió en paisatges estranys.') },
  abstraccion: { nombre: T('Abstracción', 'Abstract art', 'Abstracció'), dibujo: true,
    rasgo: T('No representa nada reconocible: solo formas, líneas y colores puros.', 'It represents nothing recognisable: only pure shapes, lines and colours.', 'No representa res reconeixible: només formes, línies i colors purs.') },
  pop: { nombre: T('Pop art', 'Pop art', 'Pop art'), dibujo: true,
    rasgo: T('Imágenes de la publicidad, los cómics y el consumo, con colores planos, tramas de puntos y repetición.', 'Images from advertising, comics and consumer goods, with flat colours, dot patterns and repetition.', 'Imatges de la publicitat, els còmics i el consum, amb colors plans, trames de punts i repetició.') },
}
export const ORDEN_ESTILOS = Object.keys(ESTILOS)

// [título, pintor, estilo, año, imagen en public/galeria (solo dominio público)]
const O = (titulo, pintor, estilo, anyo, img = null) => ({ titulo, pintor, estilo, anyo, img })

// Año de muerte de cada pintor con imagen: el test exige que sea anterior a
// 1946 (regla de dominio público, la misma que para los poemas).
export const MUERE = {
  'Jan van Eyck': 1441, 'El Bosco': 1516, 'Simone Martini': 1344, 'Sandro Botticelli': 1510, 'Leonardo da Vinci': 1519,
  'Rafael': 1520, 'Miguel Ángel': 1564, 'Caravaggio': 1610, 'Rembrandt': 1669, 'Diego Velázquez': 1660, 'Johannes Vermeer': 1675,
  'Caspar David Friedrich': 1840, 'Théodore Géricault': 1824, 'Eugène Delacroix': 1863, 'Gustave Courbet': 1877,
  'Jean-François Millet': 1875, 'Claude Monet': 1926, 'Edgar Degas': 1917, 'Pierre-Auguste Renoir': 1919,
  'Vincent van Gogh': 1890, 'Paul Cézanne': 1906, 'Edvard Munch': 1944, 'Franz Marc': 1916, 'Ernst Ludwig Kirchner': 1938,
  'Juan Gris': 1927, 'Kazimir Malévich': 1935, 'Vasili Kandinsky': 1944, 'Piet Mondrian': 1944,
}
export const OBRAS = [
  O(T('El matrimonio Arnolfini', 'The Arnolfini Portrait', 'El matrimoni Arnolfini'), 'Jan van Eyck', 'gotico', 1434, 'arnolfini'),
  O(T('El jardín de las delicias', 'The Garden of Earthly Delights', 'El jardí de les delícies'), 'El Bosco', 'gotico', 1500, 'jardin-delicias'),
  O(T('La Anunciación', 'The Annunciation', 'L’Anunciació'), 'Simone Martini', 'gotico', 1333, 'anunciacion-martini'),
  O(T('El nacimiento de Venus', 'The Birth of Venus', 'El naixement de Venus'), 'Sandro Botticelli', 'renacimiento', 1485, 'nacimiento-venus'),
  O(T('La Gioconda', 'Mona Lisa', 'La Gioconda'), 'Leonardo da Vinci', 'renacimiento', 1503, 'gioconda'),
  O(T('La escuela de Atenas', 'The School of Athens', 'L’escola d’Atenes'), 'Rafael', 'renacimiento', 1511, 'escuela-atenas'),
  O(T('La creación de Adán', 'The Creation of Adam', 'La creació d’Adam'), 'Miguel Ángel', 'renacimiento', 1512, 'creacion-adan'),
  O(T('La vocación de san Mateo', 'The Calling of Saint Matthew', 'La vocació de sant Mateu'), 'Caravaggio', 'barroco', 1600, 'vocacion-san-mateo'),
  O(T('La ronda de noche', 'The Night Watch', 'La ronda de nit'), 'Rembrandt', 'barroco', 1642, 'ronda-noche'),
  O(T('Las meninas', 'Las Meninas', 'Les menines'), 'Diego Velázquez', 'barroco', 1656, 'meninas'),
  O(T('La joven de la perla', 'Girl with a Pearl Earring', 'La noia de la perla'), 'Johannes Vermeer', 'barroco', 1665, 'joven-perla'),
  O(T('El caminante sobre el mar de nubes', 'Wanderer above the Sea of Fog', 'El caminant sobre un mar de boira'), 'Caspar David Friedrich', 'romanticismo', 1818, 'caminante'),
  O(T('La balsa de la Medusa', 'The Raft of the Medusa', 'El rai de la Medusa'), 'Théodore Géricault', 'romanticismo', 1819, 'balsa-medusa'),
  O(T('La libertad guiando al pueblo', 'Liberty Leading the People', 'La llibertat guiant el poble'), 'Eugène Delacroix', 'romanticismo', 1830, 'libertad-pueblo'),
  O(T('Entierro en Ornans', 'A Burial at Ornans', 'Enterrament a Ornans'), 'Gustave Courbet', 'realismo', 1850, 'entierro-ornans'),
  O(T('Las espigadoras', 'The Gleaners', 'Les espigolaires'), 'Jean-François Millet', 'realismo', 1857, 'espigadoras'),
  O(T('Impresión, sol naciente', 'Impression, Sunrise', 'Impressió, sol naixent'), 'Claude Monet', 'impresionismo', 1872, 'impresion-sol'),
  O(T('La clase de danza', 'The Dance Class', 'La classe de dansa'), 'Edgar Degas', 'impresionismo', 1874, 'clase-danza'),
  O(T('Baile en el Moulin de la Galette', 'Bal du moulin de la Galette', 'Ball al Moulin de la Galette'), 'Pierre-Auguste Renoir', 'impresionismo', 1876, 'moulin-galette'),
  O(T('La noche estrellada', 'The Starry Night', 'La nit estelada'), 'Vincent van Gogh', 'postimpresionismo', 1889, 'noche-estrellada'),
  O(T('Los jugadores de cartas', 'The Card Players', 'Els jugadors de cartes'), 'Paul Cézanne', 'postimpresionismo', 1892, 'jugadores-cartas'),
  O(T('Los girasoles', 'Sunflowers', 'Els gira-sols'), 'Vincent van Gogh', 'postimpresionismo', 1888, 'girasoles'),
  O(T('El grito', 'The Scream', 'El crit'), 'Edvard Munch', 'expresionismo', 1893, 'grito'),
  O(T('Los grandes caballos azules', 'The Large Blue Horses', 'Els grans cavalls blaus'), 'Franz Marc', 'expresionismo', 1911, 'caballos-azules'),
  O(T('Calle, Berlín', 'Street, Berlin', 'Carrer, Berlín'), 'Ernst Ludwig Kirchner', 'expresionismo', 1913, 'calle-berlin'),
  O(T('Las señoritas de Avignon', 'Les Demoiselles d’Avignon', 'Les senyoretes d’Avinyó'), 'Pablo Picasso', 'cubismo', 1907),
  O(T('Casas en L’Estaque', 'Houses at L’Estaque', 'Cases a L’Estaque'), 'Georges Braque', 'cubismo', 1908),
  O(T('Retrato de Picasso', 'Portrait of Picasso', 'Retrat de Picasso'), 'Juan Gris', 'cubismo', 1912, 'retrato-picasso-gris'),
  O(T('La persiana', 'The Sunblind', 'La persiana'), 'Juan Gris', 'cubismo', 1914, 'persiana-gris'),
  O(T('Cuadrado negro', 'Black Square', 'Quadrat negre'), 'Kazimir Malévich', 'abstraccion', 1915, 'cuadrado-negro'),
  O(T('Composición VIII', 'Composition VIII', 'Composició VIII'), 'Vasili Kandinsky', 'abstraccion', 1923, 'composicion-8'),
  O(T('Composición con rojo, amarillo y azul', 'Composition with Red, Yellow and Blue', 'Composició amb vermell, groc i blau'), 'Piet Mondrian', 'abstraccion', 1930, 'mondrian-rab'),
  O(T('Broadway Boogie Woogie', 'Broadway Boogie Woogie', 'Broadway Boogie Woogie'), 'Piet Mondrian', 'abstraccion', 1942, 'broadway'),
  O(T('El carnaval de Arlequín', 'The Harlequin’s Carnival', 'El carnaval d’Arlequí'), 'Joan Miró', 'surrealismo', 1925),
  O(T('La traición de las imágenes', 'The Treachery of Images', 'La traïció de les imatges'), 'René Magritte', 'surrealismo', 1929),
  O(T('La persistencia de la memoria', 'The Persistence of Memory', 'La persistència de la memòria'), 'Salvador Dalí', 'surrealismo', 1931),
  O(T('Latas de sopa Campbell', 'Campbell’s Soup Cans', 'Llaunes de sopa Campbell'), 'Andy Warhol', 'pop', 1962),
  O(T('Whaam!', 'Whaam!', 'Whaam!'), 'Roy Lichtenstein', 'pop', 1963),
]

export const FUENTES = ['real', 'dibujo']
// Estilos con al menos un cuadro real.
export const ESTILOS_REALES = ORDEN_ESTILOS.filter(e => OBRAS.some(o => o.estilo === e && o.img))

export const NIVELES = {
  facil:   { tipos: ['cuadro', 'cuadro', 'pintor'] },
  medio:   { tipos: ['cuadro', 'pintor', 'estilo', 'rasgo'] },
  dificil: { tipos: ['cuadro', 'estilo', 'rasgo', 'orden'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const idx = e => ORDEN_ESTILOS.indexOf(e)
const cercanos = (e, lista) => lista.filter(x => x !== e).sort((a, b) => Math.abs(idx(a) - idx(e)) - Math.abs(idx(b) - idx(e)))

let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    const tema = r.obra != null ? `obra:${r.obra}` : `${r.tipo}:${r.bueno}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random, fuente = 'real' } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo, fuente }

  if (tipo === 'cuadro' && fuente === 'real') {
    // Primero el estilo (así todos salen igual de a menudo), luego una obra suya.
    const e = elige(rand, ESTILOS_REALES)
    const k = elige(rand, OBRAS.map((o, i) => i).filter(i => OBRAS[i].estilo === e && OBRAS[i].img))
    const pool = cercanos(e, ORDEN_ESTILOS)
    const otros = nivel === 'facil' ? baraja(rand, pool.slice(2)).slice(0, 3) : baraja(rand, pool.slice(0, 4)).slice(0, 3)
    return { ...base, obra: k, estilo: e, bueno: e, opciones: baraja(rand, [e, ...otros]) }
  }
  if (tipo === 'cuadro') {
    const dibujables = ORDEN_ESTILOS.filter(e => ESTILOS[e].dibujo)
    const e = elige(rand, dibujables)
    // En fácil, estilos lejanos; en difícil, los vecinos.
    const pool = cercanos(e, dibujables)
    const otros = nivel === 'facil' ? baraja(rand, pool.slice(2)).slice(0, 3) : baraja(rand, pool.slice(0, 4)).slice(0, 3)
    return { ...base, estilo: e, semilla: Math.floor(rand() * 1e6), bueno: e, opciones: baraja(rand, [e, ...otros]) }
  }
  if (tipo === 'pintor') {
    const k = Math.floor(rand() * OBRAS.length)
    const o = OBRAS[k]
    const otros = [...new Set(OBRAS.filter(x => x.pintor !== o.pintor).sort((a, b) => Math.abs(a.anyo - o.anyo) - Math.abs(b.anyo - o.anyo)).slice(0, 7).map(x => x.pintor))]
    return { ...base, obra: k, bueno: o.pintor, opciones: baraja(rand, [o.pintor, ...baraja(rand, otros).slice(0, 3)]) }
  }
  if (tipo === 'estilo') {
    const k = Math.floor(rand() * OBRAS.length)
    const e = OBRAS[k].estilo
    const otros = baraja(rand, cercanos(e, ORDEN_ESTILOS).slice(0, 4)).slice(0, 3)
    return { ...base, obra: k, bueno: e, opciones: [e, ...otros].sort((a, b) => idx(a) - idx(b)) }
  }
  if (tipo === 'rasgo') {
    const e = elige(rand, ORDEN_ESTILOS)
    const otros = baraja(rand, cercanos(e, ORDEN_ESTILOS).slice(0, 4)).slice(0, 3)
    return { ...base, bueno: e, opciones: [e, ...otros].sort((a, b) => idx(a) - idx(b)) }
  }
  // orden: cuatro obras de cuatro estilos distintos (los estilos no se solapan en años)
  const estilos = baraja(rand, ORDEN_ESTILOS).slice(0, 4)
  const ks = estilos.map(e => elige(rand, OBRAS.map((o, i) => i).filter(i => OBRAS[i].estilo === e)))
  const bueno = ks.reduce((a, b) => (OBRAS[a].anyo <= OBRAS[b].anyo ? a : b))
  return { ...base, bueno, opciones: baraja(rand, ks) }
}

export const genRound = (difficulty = 'facil', fuente = 'real') => genRonda(difficulty, { fuente })
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export const obra = r => (r.obra != null ? OBRAS[r.obra] : null)
export function textoOpcion(o, r, l) {
  if (r.tipo === 'pintor') return o
  if (r.tipo === 'orden') return tx(OBRAS[o].titulo, l)
  return tx(ESTILOS[o].nombre, l)
}
export function enunciado(r, l) {
  return {
    cuadro: s(l, '¿De qué estilo es este cuadro?', 'What style is this painting?', 'De quin estil és aquest quadre?'),
    pintor: s(l, '¿Quién pintó esta obra?', 'Who painted this work?', 'Qui va pintar aquesta obra?'),
    estilo: s(l, '¿A qué estilo pertenece esta obra?', 'Which style does this work belong to?', 'A quin estil pertany aquesta obra?'),
    rasgo: s(l, '¿Qué estilo tiene estos rasgos?', 'Which style has these features?', 'Quin estil té aquests trets?'),
    orden: s(l, '¿Cuál de estas obras es la más antigua?', 'Which of these works is the oldest?', 'Quina d’aquestes obres és la més antiga?'),
  }[r.tipo]
}
export function explicacion(r, l) {
  if (r.tipo === 'orden') {
    const ord = [...r.opciones].sort((a, b) => OBRAS[a].anyo - OBRAS[b].anyo)
    return s(l, 'De más antigua a más moderna: ', 'From oldest to newest: ', 'De més antiga a més moderna: ') + ord.map(k => `${tx(OBRAS[k].titulo, l)} (${OBRAS[k].anyo})`).join(' → ') + '.'
  }
  if ((r.tipo === 'cuadro' && r.obra == null) || r.tipo === 'rasgo') return `${tx(ESTILOS[r.bueno].nombre, l)}: ${tx(ESTILOS[r.bueno].rasgo, l)}`
  const o = obra(r)
  return s(l, `«${tx(o.titulo, l)}», de ${o.pintor} (${o.anyo}): ${tx(ESTILOS[o.estilo].nombre, l).toLowerCase()}. `, `“${tx(o.titulo, l)}”, by ${o.pintor} (${o.anyo}): ${tx(ESTILOS[o.estilo].nombre, l)}. `, `«${tx(o.titulo, l)}», de ${o.pintor} (${o.anyo}): ${tx(ESTILOS[o.estilo].nombre, l).toLowerCase()}. `) + tx(ESTILOS[o.estilo].rasgo, l)
}
export function schemaQuestion(r, l) {
  const o = obra(r)
  // En «cuadro» el dibujo no se puede escribir: se da el rasgo, que es lo que se ve.
  const q = r.tipo === 'cuadro' || r.tipo === 'rasgo' ? `${tx(ESTILOS[r.bueno].rasgo, l)} ` : o ? `«${tx(o.titulo, l)}»${r.tipo === 'estilo' ? `, ${o.pintor}` : ''}. ` : ''
  return {
    question: `${q}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o2 => o2 !== r.bueno).map(o2 => textoOpcion(o2, r, l)),
  }
}
