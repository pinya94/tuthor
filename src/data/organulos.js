// Orgánulos de la célula, para el juego Bajo el Microscopio y su examen.
//
// A diferencia de Rayos X —que mide la distancia del clic a un punto con su
// radio de tolerancia sobre una silueta fotográfica— aquí cada orgánulo ES una
// forma del SVG y se pulsa directamente. Una célula se puede dibujar; un cuerpo
// humano reconocible, no. Eso quita de en medio toda la calibración de radios
// y, de paso, hace que el dibujo sea el mismo que ve el alumno en el libro.
//
// `donde` es la parte que de verdad se examina en clase: qué tiene una célula
// vegetal que no tenga la animal (pared, cloroplastos, vacuola grande) y al
// revés (centriolos, lisosomas). Por eso el juego pregunta sobre las dos.

export const CELULAS = {
  animal: { label: { es: 'Célula animal', en: 'Animal cell', ca: 'Cèl·lula animal' }, emoji: '🐾' },
  vegetal: { label: { es: 'Célula vegetal', en: 'Plant cell', ca: 'Cèl·lula vegetal' }, emoji: '🌱' },
}

export const ORGANULOS = [
  {
    id: 'membrana',
    donde: 'ambas',
    nombre: { es: 'Membrana plasmática', en: 'Plasma membrane', ca: 'Membrana plasmàtica' },
    funcion: {
      es: 'Rodea la célula y decide qué entra y qué sale',
      en: 'Surrounds the cell and decides what goes in and out',
      ca: 'Envolta la cèl·lula i decideix què entra i què surt',
    },
    detalle: {
      es: 'Es una doble capa de lípidos con proteínas incrustadas. No es un muro: es un filtro que deja pasar unas cosas y bloquea otras, y eso es lo que mantiene el interior distinto del exterior.',
      en: 'A double layer of lipids with embedded proteins. Not a wall but a filter: it lets some things through and blocks others, which is what keeps the inside different from the outside.',
      ca: 'És una doble capa de lípids amb proteïnes incrustades. No és un mur: és un filtre que deixa passar unes coses i en bloqueja d\'altres.',
    },
  },
  {
    id: 'citoplasma',
    donde: 'ambas',
    nombre: { es: 'Citoplasma', en: 'Cytoplasm', ca: 'Citoplasma' },
    funcion: {
      es: 'El medio interno donde flotan los orgánulos',
      en: 'The inner medium where the organelles float',
      ca: 'El medi intern on suren els orgànuls',
    },
    detalle: {
      es: 'No es agua sin más: es un gel con sales, proteínas y azúcares donde ocurren muchísimas reacciones químicas. Los orgánulos no están fijos, se mueven por él.',
      en: 'Not just water: a gel with salts, proteins and sugars where a great many chemical reactions happen. Organelles are not fixed — they move through it.',
      ca: 'No és aigua i prou: és un gel amb sals, proteïnes i sucres on passen moltíssimes reaccions químiques.',
    },
  },
  {
    id: 'nucleo',
    donde: 'ambas',
    nombre: { es: 'Núcleo', en: 'Nucleus', ca: 'Nucli' },
    funcion: {
      es: 'Guarda el ADN y dirige la célula',
      en: 'Stores the DNA and directs the cell',
      ca: 'Guarda l\'ADN i dirigeix la cèl·lula',
    },
    detalle: {
      es: 'Dentro está toda la información para fabricar cualquier proteína de ese ser vivo. Tener el ADN encerrado en un núcleo es lo que separa a las células eucariotas de las bacterias.',
      en: 'It holds all the information for making any protein of that organism. Enclosing the DNA in a nucleus is what separates eukaryotic cells from bacteria.',
      ca: 'A dins hi ha tota la informació per fabricar qualsevol proteïna. Tenir l\'ADN tancat en un nucli separa les cèl·lules eucariotes dels bacteris.',
    },
  },
  {
    id: 'nucleolo',
    donde: 'ambas',
    nombre: { es: 'Nucléolo', en: 'Nucleolus', ca: 'Nuclèol' },
    funcion: {
      es: 'La zona densa del núcleo donde se fabrican los ribosomas',
      en: 'The dense area of the nucleus where ribosomes are made',
      ca: 'La zona densa del nucli on es fabriquen els ribosomes',
    },
    detalle: {
      es: 'Está dentro del núcleo y se ve al microscopio como una mancha más oscura. Ahí se montan las piezas de los ribosomas, que luego salen al citoplasma a trabajar.',
      en: 'Inside the nucleus, it looks like a darker spot under the microscope. Ribosome parts are assembled there and then leave for the cytoplasm.',
      ca: 'És dins del nucli i es veu al microscopi com una taca més fosca. Allà es munten les peces dels ribosomes.',
    },
  },
  {
    id: 'mitocondria',
    donde: 'ambas',
    nombre: { es: 'Mitocondria', en: 'Mitochondrion', ca: 'Mitocondri' },
    funcion: {
      es: 'Saca energía de los nutrientes: la respiración celular',
      en: 'Gets energy out of nutrients: cellular respiration',
      ca: 'Treu energia dels nutrients: la respiració cel·lular',
    },
    detalle: {
      es: 'Es la central energética. Quema glucosa con oxígeno y produce ATP, que es la moneda de energía que gasta el resto de la célula. Las células musculares tienen muchísimas.',
      en: 'The power plant. It burns glucose with oxygen to make ATP, the energy currency the rest of the cell spends. Muscle cells have huge numbers of them.',
      ca: 'És la central energètica. Crema glucosa amb oxigen i produeix ATP, la moneda d\'energia que gasta la resta de la cèl·lula.',
    },
  },
  {
    id: 'ribosoma',
    donde: 'ambas',
    nombre: { es: 'Ribosomas', en: 'Ribosomes', ca: 'Ribosomes' },
    funcion: {
      es: 'Fabrican las proteínas siguiendo las instrucciones del ADN',
      en: 'Build proteins following the DNA instructions',
      ca: 'Fabriquen les proteïnes seguint les instruccions de l\'ADN',
    },
    detalle: {
      es: 'Son los únicos orgánulos que también tienen las bacterias, porque hacer proteínas es imprescindible para cualquier ser vivo. Unos flotan sueltos y otros están pegados al retículo.',
      en: 'The only organelle bacteria also have, because making proteins is essential for any living thing. Some float free and some are stuck to the reticulum.',
      ca: 'Són els únics orgànuls que també tenen els bacteris, perquè fer proteïnes és imprescindible per a qualsevol ésser viu.',
    },
  },
  {
    id: 'reticulo',
    donde: 'ambas',
    nombre: { es: 'Retículo endoplasmático', en: 'Endoplasmic reticulum', ca: 'Reticle endoplasmàtic' },
    funcion: {
      es: 'Red de canales que transporta y procesa lo que fabrica la célula',
      en: 'A network of channels that transports and processes what the cell makes',
      ca: 'Xarxa de canals que transporta i processa el que fabrica la cèl·lula',
    },
    detalle: {
      es: 'El rugoso lleva ribosomas pegados y se ocupa de las proteínas; el liso no tiene y fabrica lípidos. Sale del propio núcleo, como una prolongación de su envoltura.',
      en: 'The rough one has ribosomes attached and handles proteins; the smooth one makes lipids. It extends out of the nucleus itself.',
      ca: 'El rugós porta ribosomes enganxats i s\'ocupa de les proteïnes; el llis fabrica lípids.',
    },
  },
  {
    id: 'golgi',
    donde: 'ambas',
    nombre: { es: 'Aparato de Golgi', en: 'Golgi apparatus', ca: 'Aparell de Golgi' },
    funcion: {
      es: 'Empaqueta y reparte lo que la célula va a exportar',
      en: 'Packages and ships what the cell is going to export',
      ca: 'Empaqueta i reparteix el que la cèl·lula exportarà',
    },
    detalle: {
      es: 'Recibe las proteínas del retículo, las termina de preparar y las mete en vesículas con su destino. Es literalmente el almacén de envíos de la célula.',
      en: 'It receives proteins from the reticulum, finishes them and packs them into vesicles with a destination. Literally the cell\'s dispatch warehouse.',
      ca: 'Rep les proteïnes del reticle, les acaba de preparar i les fica en vesícules amb el seu destí.',
    },
  },
  {
    id: 'lisosoma',
    donde: 'animal',
    nombre: { es: 'Lisosomas', en: 'Lysosomes', ca: 'Lisosomes' },
    funcion: {
      es: 'Digieren lo que sobra o lo que entra de fuera',
      en: 'Digest waste and whatever comes in from outside',
      ca: 'Digereixen el que sobra o el que entra de fora',
    },
    detalle: {
      es: 'Llevan dentro enzimas que rompen moléculas. Son el sistema de reciclaje: deshacen orgánulos viejos y destruyen bacterias que la célula haya engullido.',
      en: 'They carry enzymes that break molecules apart: the recycling system, taking apart old organelles and destroying engulfed bacteria.',
      ca: 'Porten enzims que trenquen molècules. Són el sistema de reciclatge de la cèl·lula.',
    },
  },
  {
    id: 'centriolo',
    donde: 'animal',
    nombre: { es: 'Centriolos', en: 'Centrioles', ca: 'Centríols' },
    funcion: {
      es: 'Organizan el reparto de cromosomas cuando la célula se divide',
      en: 'Organise chromosome sharing when the cell divides',
      ca: 'Organitzen el repartiment de cromosomes quan la cèl·lula es divideix',
    },
    detalle: {
      es: 'Van en pareja y perpendiculares entre sí. Al dividirse la célula tiran de los cromosomas hacia cada lado con unos filamentos, el huso acromático.',
      en: 'They come in perpendicular pairs. When the cell divides they pull chromosomes to each side with filaments, the mitotic spindle.',
      ca: 'Van en parella i perpendiculars entre ells. En dividir-se la cèl·lula estiren els cromosomes cap a cada costat.',
    },
  },
  {
    id: 'pared',
    donde: 'vegetal',
    nombre: { es: 'Pared celular', en: 'Cell wall', ca: 'Paret cel·lular' },
    funcion: {
      es: 'Capa rígida de celulosa que da forma y sostiene la planta',
      en: 'A rigid cellulose layer that gives shape and holds the plant up',
      ca: 'Capa rígida de cel·lulosa que dona forma i sosté la planta',
    },
    detalle: {
      es: 'Está POR FUERA de la membrana y es lo que hace que una célula vegetal tenga esquinas en vez de ser redondeada. Sin ella, un árbol no podría sostenerse de pie.',
      en: 'It sits OUTSIDE the membrane and is why a plant cell has corners instead of being round. Without it a tree could not stand up.',
      ca: 'És PER FORA de la membrana i és el que fa que una cèl·lula vegetal tingui cantonades en comptes de ser rodona.',
    },
  },
  {
    id: 'cloroplasto',
    donde: 'vegetal',
    nombre: { es: 'Cloroplastos', en: 'Chloroplasts', ca: 'Cloroplasts' },
    funcion: {
      es: 'Hacen la fotosíntesis: fabrican alimento con la luz',
      en: 'Do photosynthesis: they make food out of light',
      ca: 'Fan la fotosíntesi: fabriquen aliment amb la llum',
    },
    detalle: {
      es: 'Llevan clorofila, que es lo que da el color verde a las plantas. Con luz, agua y CO2 fabrican glucosa y sueltan oxígeno: por eso las plantas no necesitan comerse a nadie.',
      en: 'They carry chlorophyll, which makes plants green. With light, water and CO2 they build glucose and release oxygen.',
      ca: 'Porten clorofil·la, que és el que dona el color verd a les plantes. Amb llum, aigua i CO2 fabriquen glucosa.',
    },
  },
  {
    id: 'vacuola',
    donde: 'vegetal',
    nombre: { es: 'Vacuola', en: 'Vacuole', ca: 'Vacúol' },
    funcion: {
      es: 'Gran bolsa de agua que mantiene la planta firme',
      en: 'A large water sac that keeps the plant firm',
      ca: 'Gran bossa d\'aigua que manté la planta ferma',
    },
    detalle: {
      es: 'Ocupa casi toda la célula vegetal y empuja hacia fuera. Cuando se queda sin agua, la planta se marchita: eso es exactamente lo que estás viendo en una lechuga mustia.',
      en: 'It takes up most of a plant cell and pushes outwards. When it runs out of water the plant wilts — exactly what you see in limp lettuce.',
      ca: 'Ocupa gairebé tota la cèl·lula vegetal i empeny cap enfora. Quan es queda sense aigua, la planta es marceix.',
    },
  },
]

export const porId = id => ORGANULOS.find(o => o.id === id)

// Los que se dibujan (y por tanto se pueden preguntar) en cada tipo de célula.
export const organulosDe = tipo =>
  ORGANULOS.filter(o => o.donde === 'ambas' || o.donde === tipo)
