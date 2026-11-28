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
//
// Variedad (nov-2026): en el juego, cada partida saca los tipos de una BOLSA
// barajada (crearBolsa), nunca más de dos rondas seguidas de la misma
// mecánica, y genRonda respeta `evitar` (la ronda anterior). Antes el tipo se
// sorteaba a pelo y el nivel difícil era media partida de rutas.
//
// Ciencia: los nombres de proceso incluyen la sedimentación y la litificación;
// las descripciones evitan absolutos (la pómez suele flotar, el gneis puede
// venir de varias rocas, el vinagre apenas hace burbujas…) y las rutas solo
// dicen lo que PUEDE pasar con las condiciones adecuadas.

import { crearBolsaMecanicas, sacarDeBolsa, MAX_SEGUIDAS } from './bolsaMecanicas'

const T = (es, en, ca) => ({ es, en, ca })

export const PROCESOS = {
  enfriamiento: T('Enfriamiento y solidificación', 'Cooling and solidifying', 'Refredament i solidificació'),
  erosion:      T('Meteorización, erosión, transporte y sedimentación', 'Weathering, erosion, transport and deposition', 'Meteorització, erosió, transport i sedimentació'),
  litificacion: T('Compactación y cementación (litificación)', 'Compaction and cementation (lithification)', 'Compactació i cimentació (litificació)'),
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
  basalto: R('ignea', 'volcanica', null, 'fino', T('Basalto', 'Basalt', 'Basalt'), T('Oscuro y de grano muy fino: sus cristales no se ven a simple vista. Se forma sobre todo en coladas de lava.', 'Dark and very fine-grained: its crystals cannot be seen with the naked eye. It forms mainly in lava flows.', 'Fosc i de gra molt fi: els seus cristalls no es veuen a simple vista. Es forma sobretot en colades de lava.')),
  pomez: R('ignea', 'volcanica', null, 'poros', T('Piedra pómez', 'Pumice', 'Pedra tosca'), T('Muy ligera y llena de agujeros de burbujas de gas: a menudo flota en el agua, hasta que sus poros se llenan.', 'Very light and full of gas-bubble holes: it often floats on water until its pores fill up.', 'Molt lleugera i plena de forats de bombolles de gas: sovint sura a l’aigua, fins que se li omplen els porus.')),
  obsidiana: R('ignea', 'volcanica', null, 'vidrio', T('Obsidiana', 'Obsidian', 'Obsidiana'), T('Negra y brillante como el vidrio, sin cristales: la lava se enfrió tan deprisa que no les dio tiempo a formarse.', 'Black and glassy, with no crystals: the lava cooled so fast that they had no time to form.', 'Negra i brillant com el vidre, sense cristalls: la lava es va refredar tan de pressa que no van tenir temps de formar-se.')),
  caliza: R('sedimentaria', null, null, 'fosiles', T('Caliza', 'Limestone', 'Calcària'), T('Gris clara, a veces con conchas fósiles; con un ácido diluido (en el laboratorio, clorhídrico) hace efervescencia; con vinagre, solo unas burbujas lentas.', 'Light grey, sometimes with fossil shells; it fizzes with a dilute acid (in the lab, hydrochloric); with vinegar, only a few slow bubbles.', 'Grisa clara, de vegades amb closques fòssils; amb un àcid diluït (al laboratori, clorhídric) fa efervescència; amb vinagre, només unes bombolles lentes.')),
  arenisca: R('sedimentaria', 'detritica', null, 'granos', T('Arenisca', 'Sandstone', 'Gres'), T('Granos de arena pegados entre sí; raspa al tocarla.', 'Grains of sand stuck together; it feels rough.', 'Grans de sorra enganxats entre si; rasca en tocar-la.')),
  conglomerado: R('sedimentaria', 'detritica', null, 'cantos', T('Conglomerado', 'Conglomerate', 'Conglomerat'), T('Cantos redondeados de varios tamaños unidos por un cemento natural.', 'Rounded pebbles of various sizes held together by a natural cement.', 'Còdols arrodonits de diverses mides units per un ciment natural.')),
  carbon: R('sedimentaria', 'organica', null, 'carbon', T('Carbón', 'Coal', 'Carbó'), T('Negro y ligero, arde: se formó con restos de plantas enterradas hace millones de años.', 'Black and light, it burns: it formed from plant remains buried millions of years ago.', 'Negre i lleuger, crema: es va formar amb restes de plantes enterrades fa milions d’anys.')),
  yeso: R('sedimentaria', 'quimica', null, 'blanco', T('Yeso', 'Gypsum', 'Guix'), T('Roca formada casi solo por el mineral yeso: blanca y tan blanda que se raya con la uña. Se formó al evaporarse agua salada.', 'A rock made almost entirely of the mineral gypsum: white and so soft you can scratch it with a fingernail. It formed as salty water evaporated.', 'Roca formada gairebé només pel mineral guix: blanca i tan tova que es ratlla amb l’ungla. Es va formar en evaporar-se aigua salada.')),
  marmol: R('metamorfica', null, 'caliza', 'vetas', T('Mármol', 'Marble', 'Marbre'), T('Blanco o de colores, con vetas y cristales que brillan; como la caliza, hace efervescencia con un ácido diluido.', 'White or coloured, with veins and sparkling crystals; like limestone, it fizzes with a dilute acid.', 'Blanc o de colors, amb vetes i cristalls que brillen; com la calcària, fa efervescència amb un àcid diluït.')),
  pizarra: R('metamorfica', null, 'arcilla', 'laminas', T('Pizarra', 'Slate', 'Pissarra'), T('Gris oscura, se separa en láminas planas y finas: se usa en tejados. Viene de rocas de arcilla (lutitas) transformadas.', 'Dark grey, it splits into thin flat sheets: it is used on roofs. It comes from transformed clay rocks (shale).', 'Grisa fosca, se separa en làmines planes i fines: es fa servir a les teulades. Ve de roques d’argila (lutites) transformades.')),
  cuarcita: R('metamorfica', null, 'arenisca', 'azucar', T('Cuarcita', 'Quartzite', 'Quarsita'), T('Muy dura y de aspecto azucarado: es arenisca de cuarzo recristalizada, con los granos soldados entre sí.', 'Very hard and sugary-looking: it is recrystallised quartz sandstone, with the grains welded together.', 'Molt dura i d’aspecte ensucrat: és gres de quars recristal·litzat, amb els grans soldats entre si.')),
  gneis: R('metamorfica', null, 'granito', 'bandas', T('Gneis', 'Gneiss', 'Gneis'), T('Bandas claras y oscuras alternadas: roca muy transformada por la presión y la temperatura. Puede venir de un granito, pero también de otras rocas.', 'Alternating light and dark bands: a rock heavily transformed by pressure and temperature. It can come from granite, but also from other rocks.', 'Bandes clares i fosques alternades: roca molt transformada per la pressió i la temperatura. Pot venir d’un granit, però també d’altres roques.')),
}
export const ORIGENES = ['caliza', 'arenisca', 'granito', 'arcilla']
// La pizarra viene de rocas de grano muy fino ricas en arcilla (lutitas).
const NOMBRE_ORIGEN = { arcilla: T('Lutita (arcilla)', 'Shale (clay rock)', 'Lutita (argila)') }

// Rutas entre dos rocas: la buena y tres imposibles.
const RU = (desde, hasta, buena, malas) => ({ desde, hasta, buena, malas })
export const RUTAS = [
  RU('granito', 'arenisca', ['erosion', 'litificacion'], [['metamorfismo'], ['fusion', 'enfriamiento'], ['litificacion', 'erosion']]),
  RU('pizarra', 'conglomerado', ['erosion', 'litificacion'], [['metamorfismo'], ['fusion', 'enfriamiento'], ['litificacion', 'erosion']]),
  RU('arenisca', 'cuarcita', ['metamorfismo'], [['erosion', 'litificacion'], ['fusion', 'enfriamiento'], ['enfriamiento']]),
  RU('caliza', 'marmol', ['metamorfismo'], [['erosion', 'litificacion'], ['fusion', 'enfriamiento'], ['litificacion']]),
  RU('granito', 'gneis', ['metamorfismo'], [['erosion', 'litificacion'], ['fusion', 'enfriamiento'], ['enfriamiento']]),
  // Fundir un gneis puede dar un magma granítico (no un basalto, ni fundir
  // mármol da granito: la composición no cuadra).
  RU('gneis', 'granito', ['fusion', 'enfriamiento'], [['erosion', 'litificacion'], ['metamorfismo'], ['enfriamiento', 'fusion']]),
  RU('cuarcita', 'conglomerado', ['erosion', 'litificacion'], [['metamorfismo'], ['fusion', 'enfriamiento'], ['litificacion', 'erosion']]),
]

export const NIVELES = {
  facil:   { tipos: ['proceso', 'tipo'] },
  medio:   { tipos: ['proceso', 'tipo', 'origen'] },
  dificil: { tipos: ['subtipo', 'origen', 'ruta'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
let seq = 0

// La ronda clásica de un tipo (con opciones): la usan las mecánicas y el
// texto del schema (ver «Mecánicas» al final).
function genVieja(nivel, tipo, rand, evitar = null) {
  for (;;) {
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


// ── Textos ───────────────────────────────────────────────────────────────
const tx = (o, l) => o[l] ?? o.es
export const nombreRoca = (id, l) => (ROCAS[id] ? tx(ROCAS[id].nombre, l) : tx(NOMBRE_ORIGEN[id], l))
export const nombreNodo = (id, l) => tx(NODOS[id], l)
export const nombreProceso = (id, l) => tx(PROCESOS[id], l)
// Nombre corto para escribirlo SOBRE el diagrama (el largo no cabe en móvil).
const PROCESO_CORTO = {
  enfriamiento: T('Enfriamiento', 'Cooling', 'Refredament'),
  erosion: T('Erosión', 'Erosion', 'Erosió'),
  litificacion: T('Litificación', 'Lithification', 'Litificació'),
  metamorfismo: T('Metamorfismo', 'Metamorphism', 'Metamorfisme'),
  fusion: T('Fusión', 'Melting', 'Fusió'),
}
export const nombreProcesoCorto = (id, l) => tx(PROCESO_CORTO[id], l)
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

function enunciadoViejo(ronda, l) {
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
  enfriamiento: T('El magma o la lava se enfrían y se solidifican: se forma una roca ígnea (despacio bajo tierra, cristales grandes; deprisa en la superficie, grano fino o vidrio).', 'Magma or lava cools and solidifies: an igneous rock forms (slowly underground, large crystals; quickly at the surface, fine grain or glass).', 'El magma o la lava es refreden i se solidifiquen: es forma una roca ígnia (a poc a poc sota terra, cristalls grans; de pressa a la superfície, gra fi o vidre).'),
  erosion: T('La meteorización rompe y altera la roca; la erosión arranca los trozos, el agua, el viento o el hielo los transportan y al final se depositan (sedimentación): son los sedimentos.', 'Weathering breaks down and alters the rock; erosion removes the pieces, water, wind or ice transport them and finally they are deposited: these are the sediments.', 'La meteorització trenca i altera la roca; l’erosió n’arrenca els trossos, l’aigua, el vent o el gel els transporten i al final es dipositen (sedimentació): són els sediments.'),
  litificacion: T('Las capas de sedimentos depositadas se compactan con el peso de las de encima y un cemento natural une los granos (litificación): se forma una roca sedimentaria.', 'Deposited layers of sediment are compacted by the weight of those above and a natural cement binds the grains (lithification): a sedimentary rock forms.', 'Les capes de sediments dipositades es compacten amb el pes de les de sobre i un ciment natural uneix els grans (litificació): es forma una roca sedimentària.'),
  metamorfismo: T('Enterrada a gran profundidad o junto a un magma, la roca cambia en estado sólido por la presión y la temperatura, sin llegar a fundirse.', 'Buried deep down or next to a magma, the rock changes in the solid state through pressure and temperature, without melting.', 'Enterrada a gran profunditat o al costat d’un magma, la roca canvia en estat sòlid per la pressió i la temperatura, sense arribar a fondre’s.'),
  fusion: T('Si la temperatura sube lo bastante en el interior de la Tierra, la roca se funde (a menudo solo en parte) y forma magma.', 'If the temperature rises enough deep in the Earth, the rock melts (often only partly) and forms magma.', 'Si la temperatura puja prou a l’interior de la Terra, la roca es fon (sovint només en part) i forma magma.'),
}

function explicacionVieja(ronda, l) {
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
        ? T('Sin fundirse ni deshacerse: con la presión y la temperatura adecuadas, cambia en estado sólido.', 'Without melting or breaking down: with the right pressure and temperature, it changes in the solid state.', 'Sense fondre’s ni desfer-se: amb la pressió i la temperatura adequades, canvia en estat sòlid.')
        : ru.buena[0] === 'erosion'
          ? T('Primero hay que romperla en sedimentos; luego esos sedimentos se compactan y cementan.', 'First it has to be broken into sediments; then those sediments are compacted and cemented.', 'Primer cal trencar-la en sediments; després aquests sediments es compacten i es cimenten.')
          : T('Primero se funde (al menos en parte) y se hace magma; luego el magma se enfría y forma una roca ígnea: cuál, depende de la composición del magma y de dónde se enfríe.', 'First it melts (at least partly) into magma; then the magma cools and forms an igneous rock: which one depends on the magma’s composition and where it cools.', 'Primer es fon (almenys en part) i es fa magma; després el magma es refreda i forma una roca ígnia: quina, depèn de la composició del magma i d’on es refredi.'), l)
    }
  }
}

function schemaVieja(ronda, l) {
  const pre = ronda.roca && ronda.tipo !== 'ruta' ? `${nombreRoca(ronda.roca, l)}: ${tx(ROCAS[ronda.roca].desc, l)} ` : ''
  return {
    question: `${pre}${enunciadoViejo(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda y el texto del schema):
//   etiqueta  (proceso)  tres flechas del ciclo con «?»: se les pone su proceso
//   clasifica (tipo, subtipo)  tres muestras de roca a la caja de su tipo/subtipo
//   empareja  (origen)  las cuatro metamórficas con su roca de origen
//   traza     (ruta)  tocar las flechas del ciclo, en orden, de una roca a otra
// Respuestas: «etiqueta|clasifica|empareja:fallos» o la ruta «p1>p2».
export const MECANICA_DE_TIPO = { proceso: 'etiqueta', tipo: 'clasifica', subtipo: 'clasifica', origen: 'empareja', ruta: 'traza' }
export const METAMORFICAS = Object.keys(ROCAS).filter(id => ROCAS[id].origen)

// Bolsa de mecánicas de UNA partida (ver lib/bolsaMecanicas): los tipos del
// nivel barajados, máx. dos seguidos de la misma mecánica. Se crea al empezar
// cada partida (no se arrastra).
export { MAX_SEGUIDAS }
export function crearBolsa(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  return { nivel, ...crearBolsaMecanicas(cfg.tipos, { rand, mecanica: t => MECANICA_DE_TIPO[t] }) }
}
export const sacarTipo = sacarDeBolsa

// Piezas que se colocan en la ronda (el bonus de tiempo es por pieza).
export function accionesDe(r) {
  if (r.mecanica === 'etiqueta') return r.flechas.length
  if (r.mecanica === 'clasifica' || r.mecanica === 'empareja') return r.items.length
  if (r.mecanica === 'traza') return RUTAS[r.ruta].buena.length
  return 1
}

// opts: rand; evitar = la clave de la ronda anterior (no se repite);
// bolsa = la de la partida (crearBolsa): si no hay, el tipo se sortea.
const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null, bolsa = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const fijo = bolsa ? sacarTipo(bolsa) : null
  for (let intento = 0; ; intento++) {
    const tipo = fijo ?? elige(rand, cfg.tipos)
    const r = genVieja(nivel, tipo, rand)
    const out = { ...r, mecanica: MECANICA_DE_TIPO[tipo] }
    if (tipo === 'proceso') {
      // tres flechas distintas, con al menos dos procesos distintos
      const fl = baraja(rand, FLECHAS.map((_, i) => i)).slice(0, 3)
      if (new Set(fl.map(i => FLECHAS[i][2])).size < 2) continue
      out.flechas = fl
    }
    if (tipo === 'tipo') {
      // tres rocas cualesquiera (pueden repetir tipo): con una de cada, la
      // última iría a la caja que queda libre sin pensar
      const items = baraja(rand, Object.keys(ROCAS)).slice(0, 3)
      if (new Set(items.map(id => ROCAS[id].tipo)).size < 2) continue
      out.items = items
      out.cajas = TIPOS
    }
    if (tipo === 'subtipo') {
      const clase = ROCAS[r.roca].tipo
      const pool = Object.keys(ROCAS).filter(id => ROCAS[id].tipo === clase && ROCAS[id].subtipo)
      const items = baraja(rand, pool).slice(0, 3)
      if (new Set(items.map(id => ROCAS[id].subtipo)).size < 2) continue
      out.items = items
      out.cajas = SUBTIPOS[clase]
    }
    if (tipo === 'origen') {
      out.items = baraja(rand, METAMORFICAS)
      out.origenes = baraja(rand, ORIGENES)
    }
    const tema = `${tipo}:${(out.items ?? out.flechas ?? [r.clave]).join()}`
    out.clave = tema
    if (intento < 30 && (tema === evitar || (intento < 20 && recientes.includes(tema)))) continue
    recientes.push(tema)
    if (recientes.length > 5) recientes.shift()
    return out
  }
}
export const genRound = difficulty => genRonda(difficulty)

// La caja buena de una roca en «clasifica».
export const cajaDe = (r, id) => (r.tipo === 'subtipo' ? ROCAS[id].subtipo : ROCAS[id].tipo)

export function respuestaBuena(r) {
  if (r.mecanica === 'traza') return r.bueno
  return `${r.mecanica}:0`
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  return o === respuestaBuena(r)
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  switch (r.mecanica) {
    case 'etiqueta': return tx(T('Pon a cada flecha numerada su proceso: toca una flecha y luego el proceso', 'Give each numbered arrow its process: tap an arrow, then the process', 'Posa a cada fletxa numerada el seu procés: toca una fletxa i després el procés'), l)
    case 'clasifica': return r.tipo === 'subtipo'
      ? tx(T(`Pon cada roca ${ROCAS[r.items[0]].tipo === 'ignea' ? 'ígnea' : 'sedimentaria'} en la caja de su origen`, `Put each ${ROCAS[r.items[0]].tipo === 'ignea' ? 'igneous' : 'sedimentary'} rock in the box for how it formed`, `Posa cada roca ${ROCAS[r.items[0]].tipo === 'ignea' ? 'ígnia' : 'sedimentària'} a la caixa del seu origen`), l)
      : tx(T('Pon cada roca en la caja de su tipo', 'Put each rock in the box for its type', 'Posa cada roca a la caixa del seu tipus'), l)
    case 'empareja': return tx(T('Une cada roca metamórfica con la roca de la que se formó', 'Match each metamorphic rock with the rock it formed from', 'Uneix cada roca metamòrfica amb la roca de la qual es va formar'), l)
    case 'traza': {
      const ru = RUTAS[r.ruta]
      return tx(T(`De ${nombreRoca(ru.desde, l).toLowerCase()} a ${nombreRoca(ru.hasta, l).toLowerCase()}: toca en orden las flechas del camino más corto`, `From ${nombreRoca(ru.desde, l).toLowerCase()} to ${nombreRoca(ru.hasta, l).toLowerCase()}: tap the arrows of the shortest path, in order`, `De ${nombreRoca(ru.desde, l).toLowerCase()} a ${nombreRoca(ru.hasta, l).toLowerCase()}: toca en ordre les fletxes del camí més curt`), l)
    }
    default: return enunciadoViejo(r, l)
  }
}

export function explicacion(r, l) {
  if (r.mecanica === 'etiqueta') return [...new Set(r.flechas.map(i => FLECHAS[i][2]))].map(p => tx(POR_QUE_PROCESO[p], l)).join(' ')
  if (r.mecanica === 'clasifica') {
    if (r.tipo === 'subtipo') return [...new Set(r.items.map(id => ROCAS[id].subtipo))].map(st => tx(NOMBRE_SUBTIPO[st], l)).join('. ') + '.'
    return [...new Set(r.items.map(id => ROCAS[id].tipo))].map(t => tx(POR_QUE_TIPO[t], l)).join(' ')
  }
  if (r.mecanica === 'empareja') return r.items.map(id => `${nombreRoca(id, l)} ← ${nombreRoca(ROCAS[id].origen, l).toLowerCase()}`).join(' · ') + '. ' + tx(T('La roca de origen se transforma por la presión y la temperatura, sin llegar a fundirse. El gneis también puede venir de otras rocas, no solo del granito.', 'The parent rock is transformed by pressure and temperature, without melting. Gneiss can also come from other rocks, not just granite.', 'La roca d’origen es transforma per la pressió i la temperatura, sense arribar a fondre’s. El gneis també pot venir d’altres roques, no només del granit.'), l)
  return explicacionVieja(r, l)
}

// Corrección concreta, una línea por pieza (lo que puso el alumno y lo bueno).
// puestas: etiqueta {k: proceso}, clasifica {roca: caja}, empareja {roca:
// origen}; traza: la ruta elegida «p1>p2».
export function correccion(r, puestas = {}, l = 'es') {
  const t = (es, en, ca) => tx(T(es, en, ca), l)
  if (r.mecanica === 'etiqueta') return r.flechas.map((i, k) => {
    const [a, b, p] = FLECHAS[i]
    const q = puestas[k]
    const cab = `${k + 1}. ${nombreNodo(a, l)} → ${nombreNodo(b, l).toLowerCase()}`
    const P = nombreProceso(p, l).toLowerCase(), Q = q ? nombreProceso(q, l).toLowerCase() : '—'
    return { ok: q === p, texto: q === p ? `${cab}: ${P}` : t(`${cab}: pusiste «${Q}»; es «${P}»`, `${cab}: you put «${Q}»; it is «${P}»`, `${cab}: hi vas posar «${Q}»; és «${P}»`) }
  })
  if (r.mecanica === 'clasifica') {
    const caja = c => (r.tipo === 'subtipo' ? tx(NOMBRE_SUBTIPO[c], l).split(':')[0] : tx(NOMBRE_TIPO[c], l)).toLowerCase()
    return r.items.map(id => {
      const b = cajaDe(r, id), q = puestas[id], n = nombreRoca(id, l)
      return { ok: q === b, texto: q === b ? `${n}: ${caja(b)}` : t(`${n}: no es ${q ? caja(q) : '—'}, sino ${caja(b)}`, `${n}: not ${q ? caja(q) : '—'} but ${caja(b)}`, `${n}: no és ${q ? caja(q) : '—'}, sinó ${caja(b)}`) }
    })
  }
  if (r.mecanica === 'empareja') return r.items.map(id => {
    const b = ROCAS[id].origen, q = puestas[id], n = nombreRoca(id, l)
    const B = nombreRoca(b, l).toLowerCase(), Q = q ? nombreRoca(q, l).toLowerCase() : '—'
    return { ok: q === b, texto: q === b ? `${n} ← ${B}` : t(`${n}: no viene de ${Q}, sino de ${B}`, `${n}: it did not form from ${Q} but from ${B}`, `${n}: no ve de ${Q}, sinó de ${B}`) }
  })
  if (r.mecanica === 'traza') {
    const camino = x => String(x).split('>').map(p => nombreProceso(p, l).toLowerCase()).join(' → ')
    const ok = esCorrecta(r, puestas)
    return ok ? [{ ok, texto: camino(r.bueno) }] : [
      { ok: false, texto: t(`Tu camino: ${camino(puestas)}`, `Your path: ${camino(puestas)}`, `El teu camí: ${camino(puestas)}`) },
      { ok: true, texto: t(`Camino más corto: ${camino(r.bueno)}`, `Shortest path: ${camino(r.bueno)}`, `Camí més curt: ${camino(r.bueno)}`) },
    ]
  }
  return []
}

export function schemaQuestion(r, l) {
  return schemaVieja(r, l)
}
