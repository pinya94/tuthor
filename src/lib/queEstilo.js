// ¿Qué estilo es? (Historia del Arte · arquitectura, primaria alta, ESO y
// Bachillerato): un edificio dibujado y la pregunta de a qué estilo
// pertenece, más preguntas sobre sus elementos (arcos y órdenes de columna)
// y sobre la época.
//
// Los edificios se DIBUJAN (components/queEstilo/Edificio.jsx) a partir de
// los rasgos de libro de cada estilo, con variantes (templo dórico o jónico,
// arco de triunfo, acueducto o anfiteatro…): no son fotos de obras
// concretas, así que no hay derechos de imagen y cada dibujo enseña justo
// los rasgos que lo identifican. Para que no haya dos respuestas posibles,
// cada estilo lleva un rasgo que lo separa de su vecino más parecido:
//   griego ↔ neoclásico   templo exento sobre gradas, sin ventanas ↔ pórtico
//                         como entrada de un edificio con filas de ventanas
//   románico ↔ gótico     medio punto, muros gruesos y ventanas pequeñas ↔
//                         arco apuntado, rosetón, agujas y arbotantes
//   renacimiento ↔ barroco  líneas rectas, frontón triangular, simetría
//                         tranquila ↔ columnas salomónicas, frontón partido y
//                         curvas
//   romano ↔ islámico     arco de medio punto ↔ arco de herradura y alfiz
//
// Tipos de pregunta:
//   estilo   ¿de qué estilo es este edificio?
//   arco     ¿qué tipo de arco es? (medio punto, apuntado, herradura, lobulado)
//   columna  ¿de qué orden es la columna? (dórico, jónico, corintio, salomónica)
//   epoca    ¿en qué época se construía así?

export const ESTILOS = ['griego', 'romano', 'islamico', 'romanico', 'gotico', 'renacimiento', 'barroco', 'neoclasico']
export const ARCOS = ['medio-punto', 'apuntado', 'herradura', 'lobulado']
export const COLUMNAS = ['dorica', 'jonica', 'corintia', 'salomonica']
// Variantes de dibujo de cada estilo (las pinta Edificio.jsx).
export const VARIANTES = {
  griego: ['dorico', 'jonico'],
  romano: ['triunfo', 'acueducto', 'anfiteatro'],
  islamico: ['arqueria', 'portada'],
  romanico: ['torre', 'sin-torre'],
  gotico: ['fachada', 'arbotantes'],
  renacimiento: ['palacio', 'iglesia'],
  barroco: ['torres', 'calle'],
  neoclasico: ['museo'],
}
// El vecino con el que más se confunde cada estilo.
const PARECIDO = {
  griego: ['neoclasico', 'romano'],
  romano: ['griego', 'islamico', 'romanico'],
  islamico: ['romano', 'romanico'],
  romanico: ['gotico', 'romano'],
  gotico: ['romanico', 'barroco'],
  renacimiento: ['barroco', 'neoclasico'],
  barroco: ['renacimiento', 'gotico'],
  neoclasico: ['griego', 'renacimiento'],
}
export const NIVELES = {
  facil:   { tipos: ['estilo', 'estilo', 'arco', 'columna'] },
  medio:   { tipos: ['estilo', 'estilo', 'arco', 'columna', 'epoca'] },
  dificil: { tipos: ['estilo', 'estilo', 'estilo', 'epoca', 'columna', 'arco'] },
}
// Orden cronológico (para la época).
export const EPOCA = {
  griego: 0, romano: 1, islamico: 2, romanico: 3, gotico: 4, renacimiento: 5, barroco: 6, neoclasico: 7,
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)

function opcionesEstilo(estilo, nivel, rand) {
  const vecinos = PARECIDO[estilo]
  const lejanos = ESTILOS.filter(e => e !== estilo && !vecinos.includes(e))
  // Fácil: ningún vecino parecido. Medio: uno. Difícil: todos los vecinos.
  const nVecinos = nivel === 'facil' ? 0 : nivel === 'medio' ? 1 : vecinos.length
  const otros = [...baraja(rand, vecinos).slice(0, nVecinos), ...baraja(rand, lejanos)].slice(0, 3)
  return baraja(rand, [estilo, ...otros])
}

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random, evitar } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const pregunta = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, pregunta, semilla: Math.floor(rand() * 1e6) }
    if (pregunta === 'arco' || pregunta === 'columna') {
      const lista = pregunta === 'arco' ? ARCOS : COLUMNAS
      // La salomónica y el lobulado, desde el nivel medio.
      const posibles = nivel === 'facil' ? lista.slice(0, 3) : lista
      const bueno = elige(rand, posibles)
      if (bueno === evitar) continue
      return { ...base, clave: bueno, bueno, opciones: baraja(rand, nivel === 'facil' ? lista.slice(0, 3) : lista) }
    }
    const estilo = elige(rand, ESTILOS)
    if (estilo === evitar) continue
    const variante = elige(rand, VARIANTES[estilo])
    if (pregunta === 'estilo') {
      return { ...base, clave: estilo, estilo, variante, bueno: estilo, opciones: opcionesEstilo(estilo, nivel, rand) }
    }
    // epoca: la buena y tres de otros estilos, en orden cronológico.
    const otros = baraja(rand, ESTILOS.filter(e => e !== estilo)).slice(0, 3)
    return { ...base, clave: estilo, estilo, variante, bueno: estilo, opciones: [estilo, ...otros].sort((a, b) => EPOCA[a] - EPOCA[b]) }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es

export const NOMBRE_ESTILO = {
  griego: T('Griego', 'Greek', 'Grec'),
  romano: T('Romano', 'Roman', 'Romà'),
  islamico: T('Hispanomusulmán', 'Islamic (al-Andalus)', 'Hispanomusulmà'),
  romanico: T('Románico', 'Romanesque', 'Romànic'),
  gotico: T('Gótico', 'Gothic', 'Gòtic'),
  renacimiento: T('Renacimiento', 'Renaissance', 'Renaixement'),
  barroco: T('Barroco', 'Baroque', 'Barroc'),
  neoclasico: T('Neoclásico', 'Neoclassical', 'Neoclàssic'),
}
export const NOMBRE_EPOCA = {
  griego: T('Siglos VI-IV a. C.', '6th-4th centuries BC', 'Segles VI-IV aC'),
  romano: T('Siglo I a. C. - siglo IV', '1st century BC - 4th century AD', 'Segle I aC - segle IV'),
  islamico: T('Siglos VIII-XV', '8th-15th centuries', 'Segles VIII-XV'),
  romanico: T('Siglos XI-XII', '11th-12th centuries', 'Segles XI-XII'),
  gotico: T('Siglos XIII-XV', '13th-15th centuries', 'Segles XIII-XV'),
  renacimiento: T('Siglos XV-XVI', '15th-16th centuries', 'Segles XV-XVI'),
  barroco: T('Siglos XVII-XVIII', '17th-18th centuries', 'Segles XVII-XVIII'),
  neoclasico: T('Finales del XVIII y XIX', 'Late 18th and 19th centuries', 'Finals del XVIII i XIX'),
}
export const NOMBRE_ARCO = {
  'medio-punto': T('De medio punto', 'Round (semicircular)', 'De mig punt'),
  apuntado: T('Apuntado (ojival)', 'Pointed', 'Apuntat (ogival)'),
  herradura: T('De herradura', 'Horseshoe', 'De ferradura'),
  lobulado: T('Lobulado', 'Lobed (cusped)', 'Lobulat'),
}
export const NOMBRE_COLUMNA = {
  dorica: T('Dórica', 'Doric', 'Dòrica'),
  jonica: T('Jónica', 'Ionic', 'Jònica'),
  corintia: T('Corintia', 'Corinthian', 'Coríntia'),
  salomonica: T('Salomónica', 'Solomonic (twisted)', 'Salomònica'),
}

const RASGOS = {
  griego: T('un templo exento sobre gradas, rodeado de columnas, con arquitrabe y frontón triangular y sin ventanas ni arcos. Como el Partenón.', 'a free-standing temple on steps, surrounded by columns, with an architrave and a triangular pediment and no windows or arches. Like the Parthenon.', 'un temple exempt sobre graderies, envoltat de columnes, amb arquitrau i frontó triangular i sense finestres ni arcs. Com el Partenó.'),
  romano: T('el arco de medio punto usado a lo grande, en arcos de triunfo, acueductos y anfiteatros, muchas veces con columnas adosadas de adorno. Como el acueducto de Segovia o el Coliseo.', 'the round arch used on a grand scale, in triumphal arches, aqueducts and amphitheatres, often with decorative engaged columns. Like the Segovia aqueduct or the Colosseum.', 'l’arc de mig punt fet servir a gran escala, en arcs de triomf, aqüeductes i amfiteatres, sovint amb columnes adossades d’ornament. Com l’aqüeducte de Segòvia o el Colosseu.'),
  islamico: T('el arco de herradura (y el lobulado), las dovelas de dos colores, el alfiz que enmarca el arco y la decoración geométrica; las mezquitas tienen alminar. Como la Mezquita de Córdoba o la Alhambra.', 'the horseshoe arch (and the lobed arch), two-coloured voussoirs, the alfiz framing the arch and geometric decoration; mosques have a minaret. Like the Mosque of Córdoba or the Alhambra.', 'l’arc de ferradura (i el lobulat), les dovelles de dos colors, l’alfís que emmarca l’arc i la decoració geomètrica; les mesquites tenen minaret. Com la Mesquita de Còrdova o l’Alhambra.'),
  romanico: T('muros gruesos, ventanas pequeñas, arcos de medio punto y una portada con arquivoltas que se van estrechando; torres macizas. Es un edificio pesado y oscuro, como San Martín de Frómista.', 'thick walls, small windows, round arches and a doorway with archivolts that step inwards; solid towers. It is a heavy, dark building, like San Martín de Frómista.', 'murs gruixuts, finestres petites, arcs de mig punt i una portada amb arquivoltes que es van estrenyent; torres massisses. És un edifici pesant i fosc, com Sant Climent de Taüll.'),
  gotico: T('el arco apuntado, el rosetón, las agujas y pináculos y, por fuera, los arbotantes que permiten muros altos llenos de vidrieras. Como las catedrales de León o Burgos.', 'the pointed arch, the rose window, spires and pinnacles and, outside, flying buttresses that allow tall walls full of stained glass. Like the cathedrals of León or Burgos.', 'l’arc apuntat, la rosassa, les agulles i els pinacles i, per fora, els arcbotants que permeten murs alts plens de vitralls. Com les catedrals de Lleó o Burgos.'),
  renacimiento: T('vuelve a lo clásico con orden y simetría: líneas rectas, pilastras, frontón triangular, almohadillado en los palacios y cúpulas sobre tambor. Como el Palacio Medici o la cúpula de Florencia.', 'a return to the classical with order and symmetry: straight lines, pilasters, triangular pediments, rustication on palaces and domes on drums. Like the Palazzo Medici or Florence’s dome.', 'torna al clàssic amb ordre i simetria: línies rectes, pilastres, frontó triangular, encoixinat als palaus i cúpules sobre tambor. Com el Palau Mèdici o la cúpula de Florència.'),
  barroco: T('el movimiento: columnas salomónicas, frontones partidos y curvos, muros que se ondulan y mucha decoración. Como la fachada del Obradoiro en Santiago.', 'movement: Solomonic (twisted) columns, broken and curved pediments, walls that undulate and plenty of decoration. Like the Obradoiro façade in Santiago.', 'el moviment: columnes salomòniques, frontons partits i corbs, murs que s’ondulen i molta decoració. Com la façana de l’Obradoiro a Santiago.'),
  neoclasico: T('imita el templo griego, pero el pórtico con columnas y frontón es solo la entrada de un gran edificio con filas de ventanas, sobrio y sin curvas. Como el Museo del Prado.', 'it copies the Greek temple, but the portico with columns and pediment is only the entrance to a large building with rows of windows, plain and without curves. Like the Prado Museum.', 'imita el temple grec, però el pòrtic amb columnes i frontó és només l’entrada d’un gran edifici amb fileres de finestres, sobri i sense corbes. Com el Museu del Prado.'),
}
const SOBRE_ARCO = {
  'medio-punto': T('Es media circunferencia: la altura es la mitad de la anchura. Lo usan romanos, románicos y renacentistas.', 'It is half a circle: its height is half its width. Used by the Romans, in Romanesque and in the Renaissance.', 'És mitja circumferència: l’alçada és la meitat de l’amplada. El fan servir romans, romànics i renaixentistes.'),
  apuntado: T('Dos arcos de circunferencia que se cortan en punta. Empuja menos hacia los lados que el de medio punto y es el arco del gótico.', 'Two arcs of a circle meeting in a point. It pushes outwards less than a round arch and is the Gothic arch.', 'Dos arcs de circumferència que es tallen en punta. Empeny menys cap als costats que el de mig punt i és l’arc del gòtic.'),
  herradura: T('Es más de media circunferencia: se cierra por abajo como una herradura. Lo usaron los visigodos y, sobre todo, el arte hispanomusulmán.', 'It is more than half a circle: it closes in at the bottom like a horseshoe. Used by the Visigoths and, above all, in Islamic Spain.', 'És més de mitja circumferència: es tanca per baix com una ferradura. El van fer servir els visigots i, sobretot, l’art hispanomusulmà.'),
  lobulado: T('Su borde interior está hecho de pequeños arcos (lóbulos). Es típico del arte hispanomusulmán, como en la Aljafería o la Mezquita de Córdoba.', 'Its inner edge is made of small arcs (lobes). It is typical of Islamic Spain, as in the Aljafería or the Mosque of Córdoba.', 'La seva vora interior està feta de petits arcs (lòbuls). És típic de l’art hispanomusulmà, com a l’Aljaferia o la Mesquita de Còrdova.'),
}
const SOBRE_COLUMNA = {
  dorica: T('Sin basa, con fuste estriado y un capitel liso: un cojín y una losa. Es el orden más sencillo y robusto, el del Partenón.', 'No base, a fluted shaft and a plain capital: a cushion and a slab. It is the simplest, sturdiest order, the Parthenon’s.', 'Sense basa, amb fust estriat i un capitell llis: un coixí i una llosa. És l’ordre més senzill i robust, el del Partenó.'),
  jonica: T('Tiene basa y un capitel con dos volutas, espirales a los lados. Es más esbelta que la dórica.', 'It has a base and a capital with two volutes, spirals on either side. It is slimmer than the Doric.', 'Té basa i un capitell amb dues volutes, espirals als costats. És més esvelta que la dòrica.'),
  corintia: T('Su capitel tiene forma de cesta cubierta de hojas de acanto, con pequeñas volutas en las esquinas. Es la más decorada de los órdenes clásicos.', 'Its capital is shaped like a basket covered in acanthus leaves, with small volutes at the corners. It is the most decorated classical order.', 'El seu capitell té forma de cistella coberta de fulles d’acant, amb petites volutes a les cantonades. És la més decorada dels ordres clàssics.'),
  salomonica: T('El fuste se retuerce en espiral, como un tirabuzón. Es la columna del Barroco, sobre todo en los retablos.', 'The shaft twists in a spiral, like a corkscrew. It is the Baroque column, especially in altarpieces.', 'El fust es retorça en espiral, com un tirabuixó. És la columna del Barroc, sobretot als retaules.'),
}

export function textoOpcion(o, ronda, l) {
  switch (ronda.pregunta) {
    case 'arco': return tx(NOMBRE_ARCO[o], l)
    case 'columna': return tx(NOMBRE_COLUMNA[o], l)
    case 'epoca': return tx(NOMBRE_EPOCA[o], l)
    default: return tx(NOMBRE_ESTILO[o], l)
  }
}

export function enunciado(ronda, l) {
  return tx({
    estilo: T('¿De qué estilo es este edificio?', 'What style is this building?', 'De quin estil és aquest edifici?'),
    arco: T('¿Qué tipo de arco es?', 'What type of arch is this?', 'Quin tipus d’arc és?'),
    columna: T('¿De qué orden es esta columna?', 'What order is this column?', 'De quin ordre és aquesta columna?'),
    epoca: T('¿En qué época se construía con este estilo?', 'In which period was this style built?', 'En quina època es construïa amb aquest estil?'),
  }[ronda.pregunta], l)
}

export function explicacion(ronda, l) {
  const r = ronda
  if (r.pregunta === 'arco') return tx(SOBRE_ARCO[r.bueno], l)
  if (r.pregunta === 'columna') return tx(SOBRE_COLUMNA[r.bueno], l)
  const nombre = tx(NOMBRE_ESTILO[r.estilo], l)
  const rasgos = tx(RASGOS[r.estilo], l)
  if (r.pregunta === 'epoca') {
    return tx(T(`Es ${nombre.toLowerCase()}: ${tx(NOMBRE_EPOCA[r.estilo], 'es').toLowerCase()}. Se reconoce por ${rasgos}`, `It is ${nombre}: ${tx(NOMBRE_EPOCA[r.estilo], 'en')}. You can tell by ${rasgos}`, `És ${nombre.toLowerCase()}: ${tx(NOMBRE_EPOCA[r.estilo], 'ca').toLowerCase()}. Es reconeix per ${rasgos}`), l)
  }
  return tx(T(`${nombre}: ${rasgos}`, `${nombre}: ${rasgos}`, `${nombre}: ${rasgos}`), l)
}

// Sin el dibujo no hay pregunta: describir el arco o la columna ya daría su
// nombre (herradura, lóbulos, espiral…).
export function schemaQuestion() {
  return null
}
