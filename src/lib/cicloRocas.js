// Ciclo de las rocas (geología · rocas y minerales, primaria y ESO): el
// diagrama del ciclo y muestras de rocas reales.
//
// Tipos de pregunta:
//   proceso  una flecha del ciclo señalada: ¿qué proceso es?
//   tipo     una muestra con su descripción: ¿ígnea, sedimentaria o metamórfica?
//   origen   una roca metamórfica: ¿de qué roca viene? (mármol ← caliza…)
//   subtipo  ígnea plutónica o volcánica; sedimentaria detrítica, química u
//            orgánica
//   ruta     de una roca a otra: ¿qué procesos, en orden?
//
// Cada flecha del ciclo lleva UN proceso, y las rutas equivocadas son
// imposibles de verdad (p. ej. «compactación» sin sedimentos antes). La
// caliza no sale en `subtipo`: los libros la clasifican unos como química y
// otros como orgánica (bioquímica), y no habría una sola respuesta buena.
//
// Niveles: facil → proceso, tipo; medio → proceso, tipo, origen;
// dificil → subtipo, origen, ruta.

const T = (es, en, ca) => ({ es, en, ca })

export const PROCESOS = {
  enfriamiento: T('Enfriamiento y solidificación', 'Cooling and solidifying', 'Refredament i solidificació'),
  erosion:      T('Meteorización, erosión y transporte', 'Weathering, erosion and transport', 'Meteorització, erosió i transport'),
  litificacion: T('Compactación y cementación', 'Compaction and cementation', 'Compactació i cimentació'),
  metamorfismo: T('Presión y temperatura altas, sin fundirse', 'High pressure and temperature, without melting', 'Pressió i temperatura altes, sense fondre’s'),
  fusion:       T('Fusión', 'Melting', 'Fusió'),
}

export const NODOS = {
  magma:        T('Magma', 'Magma', 'Magma'),
  ignea:        T('Roca ígnea', 'Igneous rock', 'Roca ígnia'),
  sedimentos:   T('Sedimentos', 'Sediments', 'Sediments'),
  sedimentaria: T('Roca sedimentaria', 'Sedimentary rock', 'Roca sedimentària'),
  metamorfica:  T('Roca metamórfica', 'Metamorphic rock', 'Roca metamòrfica'),
}

// Las flechas del ciclo: [desde, hasta, proceso].
export const FLECHAS = [
  ['magma', 'ignea', 'enfriamiento'],
  ['ignea', 'sedimentos', 'erosion'],
  ['sedimentos', 'sedimentaria', 'litificacion'],
  ['sedimentaria', 'metamorfica', 'metamorfismo'],
  ['metamorfica', 'magma', 'fusion'],
  ['ignea', 'metamorfica', 'metamorfismo'],
  ['metamorfica', 'sedimentos', 'erosion'],
  ['sedimentaria', 'sedimentos', 'erosion'],
]

export const TIPOS = ['ignea', 'sedimentaria', 'metamorfica']
export const SUBTIPOS = {
  ignea: ['plutonica', 'volcanica'],
  sedimentaria: ['detritica', 'quimica', 'organica'],
}
export const NOMBRE_SUBTIPO = {
  plutonica: T('Plutónica: se enfrió despacio, bajo tierra', 'Plutonic: cooled slowly, underground', 'Plutònica: es va refredar a poc a poc, sota terra'),
  volcanica: T('Volcánica: se enfrió deprisa, en la superficie', 'Volcanic: cooled quickly, at the surface', 'Volcànica: es va refredar de pressa, a la superfície'),
  detritica: T('Detrítica: trozos de otras rocas pegados', 'Detrital: bits of other rocks stuck together', 'Detrítica: trossos d’altres roques enganxats'),
  quimica: T('Química: precipitó de agua con sales', 'Chemical: precipitated from salty water', 'Química: va precipitar d’aigua amb sals'),
  organica: T('Orgánica: restos de seres vivos', 'Organic: remains of living things', 'Orgànica: restes d’éssers vius'),
}

// Rocas: tipo, subtipo (null = no se pregunta), origen (metamórficas),
// textura (cómo se dibuja la muestra) y lo que se ve en ella.
const R = (tipo, subtipo, origen, textura, nombre, desc) => ({ tipo, subtipo, origen, textura, nombre, desc })
export const ROCAS = {
  granito: R('ignea', 'plutonica', null, 'cristales', T('Granito', 'Granite', 'Granit'), T('Cristales grandes y visibles: cuarzo gris, feldespato rosa o blanco y mica negra.', 'Large, visible crystals: grey quartz, pink or white feldspar and black mica.', 'Cristalls grans i visibles: quars gris, feldspat rosa o blanc i mica negra.')),
  basalto: R('ignea', 'volcanica', null, 'fino', T('Basalto', 'Basalt', 'Basalt'), T('Oscuro y de grano muy fino: sus cristales no se ven a simple vista. Sale de las coladas de lava.', 'Dark and very fine-grained: its crystals cannot be seen with the naked eye. It comes from lava flows.', 'Fosc i de gra molt fi: els seus cristalls no es veuen a simple vista. Surt de les colades de lava.')),
  pomez: R('ignea', 'volcanica', null, 'poros', T('Piedra pómez', 'Pumice', 'Pedra tosca'), T('Muy ligera y llena de agujeros de burbujas de gas: ¡flota en el agua!', 'Very light and full of gas-bubble holes: it floats on water!', 'Molt lleugera i plena de forats de bombolles de gas: sura a l’aigua!')),
  obsidiana: R('ignea', 'volcanica', null, 'vidrio', T('Obsidiana', 'Obsidian', 'Obsidiana'), T('Negra y brillante como el vidrio, sin cristales: la lava se enfrió de golpe.', 'Black and glassy, with no crystals: the lava cooled all at once.', 'Negra i brillant com el vidre, sense cristalls: la lava es va refredar de cop.')),
  caliza: R('sedimentaria', null, null, 'fosiles', T('Caliza', 'Limestone', 'Calcària'), T('Gris clara, a veces con conchas fósiles; hace burbujas si se le echa vinagre.', 'Light grey, sometimes with fossil shells; it fizzes if you pour vinegar on it.', 'Grisa clara, de vegades amb closques fòssils; fa bombolles si s’hi tira vinagre.')),
  arenisca: R('sedimentaria', 'detritica', null, 'granos', T('Arenisca', 'Sandstone', 'Gres'), T('Granos de arena pegados entre sí; raspa al tocarla.', 'Grains of sand stuck together; it feels rough.', 'Grans de sorra enganxats entre si; rasca en tocar-la.')),
  conglomerado: R('sedimentaria', 'detritica', null, 'cantos', T('Conglomerado', 'Conglomerate', 'Conglomerat'), T('Cantos redondeados de varios tamaños unidos por un cemento natural.', 'Rounded pebbles of various sizes held together by a natural cement.', 'Còdols arrodonits de diverses mides units per un ciment natural.')),
  carbon: R('sedimentaria', 'organica', null, 'carbon', T('Carbón', 'Coal', 'Carbó'), T('Negro y ligero, arde: se formó con restos de plantas enterradas hace millones de años.', 'Black and light, it burns: it formed from plant remains buried millions of years ago.', 'Negre i lleuger, crema: es va formar amb restes de plantes enterrades fa milions d’anys.')),
  yeso: R('sedimentaria', 'quimica', null, 'blanco', T('Yeso', 'Gypsum', 'Guix'), T('Blanco y tan blando que se raya con la uña; se formó al evaporarse agua salada.', 'White and so soft you can scratch it with a fingernail; it formed as salty water evaporated.', 'Blanc i tan tou que es ratlla amb l’ungla; es va formar en evaporar-se aigua salada.')),
  marmol: R('metamorfica', null, 'caliza', 'vetas', T('Mármol', 'Marble', 'Marbre'), T('Blanco o de colores, con vetas y cristales que brillan; también burbujea con vinagre.', 'White or coloured, with veins and sparkling crystals; it also fizzes with vinegar.', 'Blanc o de colors, amb vetes i cristalls que brillen; també fa bombolles amb vinagre.')),
  pizarra: R('metamorfica', null, 'arcilla', 'laminas', T('Pizarra', 'Slate', 'Pissarra'), T('Gris oscura, se separa en láminas planas y finas: se usa en tejados.', 'Dark grey, it splits into thin flat sheets: it is used on roofs.', 'Grisa fosca, se separa en làmines planes i fines: es fa servir a les teulades.')),
  cuarcita: R('metamorfica', null, 'arenisca', 'azucar', T('Cuarcita', 'Quartzite', 'Quarsita'), T('Muy dura y de aspecto azucarado: sus granos de arena se han soldado.', 'Very hard and sugary-looking: its sand grains have fused together.', 'Molt dura i d’aspecte ensucrat: els seus grans de sorra s’han soldat.')),
  gneis: R('metamorfica', null, 'granito', 'bandas', T('Gneis', 'Gneiss', 'Gneis'), T('Bandas claras y oscuras alternadas, como un granito aplastado.', 'Alternating light and dark bands, like a squashed granite.', 'Bandes clares i fosques alternades, com un granit aixafat.')),
}
export const ORIGENES = ['caliza', 'arenisca', 'granito', 'arcilla']
const NOMBRE_ORIGEN = { arcilla: T('Arcilla', 'Clay', 'Argila') }

// Rutas entre dos rocas: la buena y tres imposibles.
const RU = (desde, hasta, buena, malas) => ({ desde, hasta, buena, malas })
export const RUTAS = [
  RU('granito', 'arenisca', ['erosion', 'litificacion'], [['metamorfismo'], ['fusion', 'enfriamiento'], ['litificacion', 'erosion']]),
  RU('pizarra', 'conglomerado', ['erosion', 'litificacion'], [['metamorfismo'], ['fusion', 'enfriamiento'], ['litificacion', 'erosion']]),
  RU('arenisca', 'cuarcita', ['metamorfismo'], [['erosion', 'litificacion'], ['fusion', 'enfriamiento'], ['enfriamiento']]),
  RU('caliza', 'marmol', ['metamorfismo'], [['erosion', 'litificacion'], ['fusion', 'enfriamiento'], ['litificacion']]),
  RU('granito', 'gneis', ['metamorfismo'], [['erosion', 'litificacion'], ['fusion', 'enfriamiento'], ['enfriamiento']]),
  RU('marmol', 'granito', ['fusion', 'enfriamiento'], [['erosion', 'litificacion'], ['metamorfismo'], ['enfriamiento', 'fusion']]),
  RU('gneis', 'basalto', ['fusion', 'enfriamiento'], [['erosion', 'litificacion'], ['metamorfismo'], ['enfriamiento', 'fusion']]),
]

export const NIVELES = {
  facil:   { tipos: ['proceso', 'tipo'] },
  medio:   { tipos: ['proceso', 'tipo', 'origen'] },
  dificil: { tipos: ['subtipo', 'origen', 'ruta', 'ruta'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }
    if (tipo === 'proceso') {
      const i = Math.floor(rand() * FLECHAS.length)
      if (`f${i}` === evitar) continue
      const bueno = FLECHAS[i][2]
      const otros = baraja(rand, Object.keys(PROCESOS).filter(p => p !== bueno)).slice(0, 3)
      return { ...base, flecha: i, clave: `f${i}`, bueno, opciones: baraja(rand, [bueno, ...otros]) }
    }
    if (tipo === 'ruta') {
      const i = Math.floor(rand() * RUTAS.length)
      if (`r${i}` === evitar) continue
      const r = RUTAS[i]
      const bueno = r.buena.join('>')
      return { ...base, ruta: i, clave: `r${i}`, roca: r.desde, bueno, opciones: baraja(rand, [r.buena, ...r.malas].map(x => x.join('>'))) }
    }
    const pool = Object.keys(ROCAS).filter(id => (tipo === 'origen' ? ROCAS[id].origen : tipo === 'subtipo' ? ROCAS[id].subtipo : true))
    // tipo: primero la clase de roca, para que salgan las tres parejas
    const roca = tipo === 'tipo' ? elige(rand, pool.filter(id => ROCAS[id].tipo === elige(rand, TIPOS))) : elige(rand, pool)
    if (!roca || roca === evitar) continue
    const R0 = ROCAS[roca]
    if (tipo === 'tipo') return { ...base, roca, clave: roca, bueno: R0.tipo, opciones: TIPOS }
    if (tipo === 'origen') return { ...base, roca, clave: roca, bueno: R0.origen, opciones: ORIGENES }
    return { ...base, roca, clave: roca, bueno: R0.subtipo, opciones: SUBTIPOS[R0.tipo] }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (o, l) => o[l] ?? o.es
export const nombreRoca = (id, l) => (ROCAS[id] ? tx(ROCAS[id].nombre, l) : tx(NOMBRE_ORIGEN[id], l))
export const nombreNodo = (id, l) => tx(NODOS[id], l)
export const nombreProceso = (id, l) => tx(PROCESOS[id], l)
const NOMBRE_TIPO = { ignea: T('Ígnea', 'Igneous', 'Ígnia'), sedimentaria: T('Sedimentaria', 'Sedimentary', 'Sedimentària'), metamorfica: T('Metamórfica', 'Metamorphic', 'Metamòrfica') }

export function textoOpcion(o, ronda, l) {
  switch (ronda.tipo) {
    case 'proceso': return nombreProceso(o, l)
    case 'tipo': return tx(NOMBRE_TIPO[o], l)
    case 'origen': return nombreRoca(o, l)
    case 'subtipo': return tx(NOMBRE_SUBTIPO[o], l)
    default: return o.split('>').map(p => nombreProceso(p, l)).join(' → ')
  }
}

export function enunciado(ronda, l) {
  switch (ronda.tipo) {
    case 'proceso': {
      const [a, b] = FLECHAS[ronda.flecha]
      return tx(T(`¿Qué proceso convierte «${nombreNodo(a, 'es').toLowerCase()}» en «${nombreNodo(b, 'es').toLowerCase()}»?`, `Which process turns «${nombreNodo(a, 'en').toLowerCase()}» into «${nombreNodo(b, 'en').toLowerCase()}»?`, `Quin procés converteix «${nombreNodo(a, 'ca').toLowerCase()}» en «${nombreNodo(b, 'ca').toLowerCase()}»?`), l)
    }
    case 'tipo': return tx(T('¿Qué tipo de roca es?', 'What type of rock is it?', 'Quin tipus de roca és?'), l)
    case 'origen': return tx(T('Es una roca metamórfica. ¿De qué roca se formó?', 'It is a metamorphic rock. Which rock did it form from?', 'És una roca metamòrfica. De quina roca es va formar?'), l)
    case 'subtipo': return ROCAS[ronda.roca].tipo === 'ignea'
      ? tx(T('Es una roca ígnea. ¿De qué clase?', 'It is an igneous rock. Which kind?', 'És una roca ígnia. De quina mena?'), l)
      : tx(T('Es una roca sedimentaria. ¿De qué clase?', 'It is a sedimentary rock. Which kind?', 'És una roca sedimentària. De quina mena?'), l)
    default: {
      const r = RUTAS[ronda.ruta]
      return tx(T(`Un trozo de ${nombreRoca(r.desde, 'es').toLowerCase()} acaba convertido en ${nombreRoca(r.hasta, 'es').toLowerCase()}. ¿Por qué procesos ha pasado?`, `A piece of ${nombreRoca(r.desde, 'en').toLowerCase()} ends up as ${nombreRoca(r.hasta, 'en').toLowerCase()}. Which processes has it gone through?`, `Un tros de ${nombreRoca(r.desde, 'ca').toLowerCase()} acaba convertit en ${nombreRoca(r.hasta, 'ca').toLowerCase()}. Per quins processos ha passat?`), l)
    }
  }
}

const POR_QUE_TIPO = {
  ignea: T('Las rocas ígneas se forman cuando el magma o la lava se enfrían y solidifican.', 'Igneous rocks form when magma or lava cools and solidifies.', 'Les roques ígnies es formen quan el magma o la lava es refreden i se solidifiquen.'),
  sedimentaria: T('Las rocas sedimentarias se forman al compactarse y cementarse sedimentos: trozos de rocas, sales o restos de seres vivos.', 'Sedimentary rocks form when sediments are compacted and cemented: bits of rock, salts or remains of living things.', 'Les roques sedimentàries es formen en compactar-se i cimentar-se sediments: trossos de roques, sals o restes d’éssers vius.'),
  metamorfica: T('Las rocas metamórficas son otras rocas transformadas por la presión y la temperatura, sin llegar a fundirse.', 'Metamorphic rocks are other rocks transformed by pressure and temperature, without melting.', 'Les roques metamòrfiques són altres roques transformades per la pressió i la temperatura, sense arribar a fondre’s.'),
}

const POR_QUE_PROCESO = {
  enfriamiento: T('El magma o la lava se enfrían y se solidifican: se forma una roca ígnea.', 'Magma or lava cools and solidifies: an igneous rock forms.', 'El magma o la lava es refreden i se solidifiquen: es forma una roca ígnia.'),
  erosion: T('El agua, el viento y el hielo rompen la roca en trozos y se los llevan: son los sedimentos.', 'Water, wind and ice break the rock into pieces and carry them away: these are the sediments.', 'L’aigua, el vent i el gel trenquen la roca en trossos i se’ls emporten: són els sediments.'),
  litificacion: T('Las capas de sedimentos se aprietan con el peso de las de encima y se pegan entre sí: se forma una roca sedimentaria.', 'Layers of sediment are squeezed by the weight of those above and stick together: a sedimentary rock forms.', 'Les capes de sediments s’estrenyen amb el pes de les de sobre i s’enganxen entre si: es forma una roca sedimentària.'),
  metamorfismo: T('Enterrada a gran profundidad, la roca se transforma por la presión y el calor, sin llegar a fundirse.', 'Buried deep down, the rock is transformed by pressure and heat, without melting.', 'Enterrada a gran profunditat, la roca es transforma per la pressió i la calor, sense arribar a fondre’s.'),
  fusion: T('Si la temperatura sube muchísimo, la roca se funde y vuelve a ser magma.', 'If the temperature rises a great deal, the rock melts and becomes magma again.', 'Si la temperatura puja moltíssim, la roca es fon i torna a ser magma.'),
}

export function explicacion(ronda, l) {
  const r = ronda
  switch (r.tipo) {
    case 'proceso': {
      const [a, b, p] = FLECHAS[r.flecha]
      return `${nombreNodo(a, l)} → ${nombreNodo(b, l).toLowerCase()}: ${nombreProceso(p, l).toLowerCase()}. ${tx(POR_QUE_PROCESO[p], l)}`
    }
    case 'tipo': return `${tx(ROCAS[r.roca].desc, l)} ${tx(POR_QUE_TIPO[r.bueno], l)}`
    // Sin artículo delante del nombre: «el pizarra» / «la gneis» no se adivinan.
    case 'origen': return `${nombreRoca(r.roca, l)} ← ${nombreRoca(r.bueno, l).toLowerCase()}: ${tx(T('la roca de origen se transformó por la presión y la temperatura, sin llegar a fundirse.', 'the parent rock was transformed by pressure and temperature, without melting.', 'la roca d’origen es va transformar per la pressió i la temperatura, sense arribar a fondre’s.'), l)}`
    case 'subtipo': return `${tx(ROCAS[r.roca].desc, l)} → ${tx(NOMBRE_SUBTIPO[r.bueno], l)}.`
    default: {
      const ru = RUTAS[r.ruta]
      return ru.buena.map((p, i) => `${i + 1}. ${nombreProceso(p, l)}`).join(' · ') + '. ' + tx(ru.buena.length === 1
        ? T('Sin fundirse ni deshacerse: solo cambia por la presión y la temperatura.', 'Without melting or breaking down: it only changes through pressure and temperature.', 'Sense fondre’s ni desfer-se: només canvia per la pressió i la temperatura.')
        : ru.buena[0] === 'erosion'
          ? T('Primero hay que romperla en sedimentos; luego esos sedimentos se compactan y cementan.', 'First it has to be broken into sediments; then those sediments are compacted and cemented.', 'Primer cal trencar-la en sediments; després aquests sediments es compacten i es cimenten.')
          : T('Primero se funde y se hace magma; luego el magma se enfría y forma una roca ígnea.', 'First it melts into magma; then the magma cools and forms an igneous rock.', 'Primer es fon i es fa magma; després el magma es refreda i forma una roca ígnia.'), l)
    }
  }
}

export function schemaQuestion(ronda, l) {
  const pre = ronda.roca && ronda.tipo !== 'ruta' ? `${nombreRoca(ronda.roca, l)}: ${tx(ROCAS[ronda.roca].desc, l)} ` : ''
  return {
    question: `${pre}${enunciado(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}
