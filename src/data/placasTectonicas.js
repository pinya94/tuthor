// Placas Tectónicas — primaria + ESO. Mismos hechos que la ficha de estudio
// (src/data/fichasEstudiar/placas-tectonicas.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('pt-01', 'primaria',
    { es: '¿Cuántas capas principales tiene la Tierra?', en: 'How many main layers does the Earth have?', ca: 'Quantes capes principals té la Terra?' },
    { es: ['2', '3', '4', '6'], en: ['2', '3', '4', '6'], ca: ['2', '3', '4', '6'] },
    { es: '4', en: '4', ca: '4' },
    '🌍',
    { es: 'La Tierra tiene cuatro capas principales: corteza, manto, núcleo externo y núcleo interno.', en: 'The Earth has four main layers: crust, mantle, outer core and inner core.', ca: 'La Terra té quatre capes principals: escorça, mantell, nucli extern i nucli intern.' }),

  q('pt-02', 'primaria',
    { es: '¿Cómo se llama la capa más externa de la Tierra, donde vivimos?', en: 'What is the outermost layer of the Earth, where we live, called?', ca: 'Com es diu la capa més externa de la Terra, on vivim?' },
    { es: ['La corteza', 'El manto', 'El núcleo externo', 'El núcleo interno'], en: ['The crust', 'The mantle', 'The outer core', 'The inner core'], ca: ['L\'escorça', 'El mantell', 'El nucli extern', 'El nucli intern'] },
    { es: 'La corteza', en: 'The crust', ca: 'L\'escorça' },
    '🏔️',
    { es: 'La corteza es la capa más fina y externa de la Tierra, donde están los continentes y los océanos.', en: 'The crust is the thinnest, outermost layer of the Earth, where the continents and oceans are.', ca: 'L\'escorça és la capa més prima i externa de la Terra, on hi ha els continents i els oceans.' }),

  q('pt-03', 'primaria',
    { es: '¿Qué son las placas tectónicas?', en: 'What are tectonic plates?', ca: 'Què són les plaques tectòniques?' },
    { es: ['Grandes trozos de la corteza terrestre que se mueven muy despacio', 'Rocas que caen del espacio', 'Capas de hielo en los polos', 'Instrumentos para medir terremotos'], en: ['Large pieces of the Earth\'s crust that move very slowly', 'Rocks that fall from space', 'Layers of ice at the poles', 'Instruments for measuring earthquakes'], ca: ['Grans trossos de l\'escorça terrestre que es mouen molt a poc a poc', 'Roques que cauen de l\'espai', 'Capes de gel als pols', 'Instruments per mesurar terratrèmols'] },
    { es: 'Grandes trozos de la corteza terrestre que se mueven muy despacio', en: 'Large pieces of the Earth\'s crust that move very slowly', ca: 'Grans trossos de l\'escorça terrestre que es mouen molt a poc a poc' },
    '🧩',
    { es: 'Las placas tectónicas son grandes trozos rígidos en los que está dividida la corteza terrestre. Flotan sobre el manto y se mueven solo unos centímetros al año.', en: 'Tectonic plates are large rigid pieces that make up the Earth\'s crust. They float on the mantle and move just a few centimetres a year.', ca: 'Les plaques tectòniques són grans trossos rígids en què està dividida l\'escorça terrestre. Floten sobre el mantell i es mouen només uns centímetres a l\'any.' }),

  q('pt-04', 'primaria',
    { es: '¿Qué produce un terremoto?', en: 'What causes an earthquake?', ca: 'Què produeix un terratrèmol?' },
    { es: ['El movimiento repentino de las placas tectónicas', 'La lluvia intensa', 'El viento fuerte', 'Las mareas del mar'], en: ['The sudden movement of tectonic plates', 'Heavy rain', 'Strong wind', 'Sea tides'], ca: ['El moviment sobtat de les plaques tectòniques', 'La pluja intensa', 'El vent fort', 'Les marees del mar'] },
    { es: 'El movimiento repentino de las placas tectónicas', en: 'The sudden movement of tectonic plates', ca: 'El moviment sobtat de les plaques tectòniques' },
    '📳',
    { es: 'Un terremoto ocurre cuando la energía acumulada entre dos placas se libera de golpe, haciendo vibrar el suelo.', en: 'An earthquake happens when the energy built up between two plates is suddenly released, making the ground shake.', ca: 'Un terratrèmol passa quan l\'energia acumulada entre dues plaques s\'allibera de cop, fent vibrar el terra.' }),

  q('pt-05', 'primaria',
    { es: '¿Dónde suelen formarse los volcanes?', en: 'Where do volcanoes usually form?', ca: 'On solen formar-se els volcans?' },
    { es: ['Donde el magma sale a la superficie, muchas veces en los bordes de placas', 'Solo en el fondo del mar', 'Solo en los polos', 'En cualquier lugar al azar'], en: ['Where magma reaches the surface, often at plate boundaries', 'Only on the seafloor', 'Only at the poles', 'Anywhere at random'], ca: ['On el magma surt a la superfície, moltes vegades a les vores de plaques', 'Només al fons del mar', 'Només als pols', 'A qualsevol lloc a l\'atzar'] },
    { es: 'Donde el magma sale a la superficie, muchas veces en los bordes de placas', en: 'Where magma reaches the surface, often at plate boundaries', ca: 'On el magma surt a la superfície, moltes vegades a les vores de plaques' },
    '🌋',
    { es: 'La mayoría de los volcanes se forman en los bordes de las placas tectónicas, donde el magma del interior de la Tierra encuentra un camino hacia la superficie.', en: 'Most volcanoes form at the boundaries of tectonic plates, where magma from inside the Earth finds a path to the surface.', ca: 'La majoria dels volcans es formen a les vores de les plaques tectòniques, on el magma de l\'interior de la Terra troba un camí cap a la superfície.' }),

  q('pt-06', 'primaria',
    { es: '¿Con qué escala se mide la fuerza de un terremoto?', en: 'What scale is used to measure the strength of an earthquake?', ca: 'Amb quina escala es mesura la força d\'un terratrèmol?' },
    { es: ['La escala de Richter', 'La escala Celsius', 'La escala de Beaufort', 'La escala de pH'], en: ['The Richter scale', 'The Celsius scale', 'The Beaufort scale', 'The pH scale'], ca: ['L\'escala de Richter', 'L\'escala Celsius', 'L\'escala de Beaufort', 'L\'escala de pH'] },
    { es: 'La escala de Richter', en: 'The Richter scale', ca: 'L\'escala de Richter' },
    '📏',
    { es: 'La escala de Richter mide la magnitud (la fuerza) de un terremoto. Cuanto más alto el número, más fuerte el terremoto.', en: 'The Richter scale measures the magnitude (strength) of an earthquake. The higher the number, the stronger the earthquake.', ca: 'L\'escala de Richter mesura la magnitud (la força) d\'un terratrèmol. Com més alt el número, més fort el terratrèmol.' }),

  q('pt-07', 'primaria',
    { es: '¿Cómo se llama el supercontinente que existió hace millones de años antes de separarse en los continentes actuales?', en: 'What was the supercontinent that existed millions of years ago before splitting into today\'s continents called?', ca: 'Com es diu el supercontinent que va existir fa milions d\'anys abans de separar-se en els continents actuals?' },
    { es: ['Pangea', 'Atlántida', 'Gondwana Oceánica', 'Eurasia'], en: ['Pangaea', 'Atlantis', 'Oceanic Gondwana', 'Eurasia'], ca: ['Pangea', 'Atlàntida', 'Gondwana Oceànica', 'Euràsia'] },
    { es: 'Pangea', en: 'Pangaea', ca: 'Pangea' },
    '🗺️',
    { es: 'Pangea fue el supercontinente que existió hace unos 300 millones de años, antes de fragmentarse poco a poco en los continentes que conocemos hoy.', en: 'Pangaea was the supercontinent that existed around 300 million years ago, before slowly breaking apart into the continents we know today.', ca: 'Pangea va ser el supercontinent que va existir fa uns 300 milions d\'anys, abans de fragmentar-se a poc a poc en els continents que coneixem avui.' }),

  q('pt-08', 'primaria',
    { es: '¿Qué científico propuso que los continentes estuvieron unidos y se fueron separando con el tiempo?', en: 'Which scientist proposed that the continents were once joined and drifted apart over time?', ca: 'Quin científic va proposar que els continents havien estat units i es van anar separant amb el temps?' },
    { es: ['Alfred Wegener', 'Charles Darwin', 'Isaac Newton', 'Galileo Galilei'], en: ['Alfred Wegener', 'Charles Darwin', 'Isaac Newton', 'Galileo Galilei'], ca: ['Alfred Wegener', 'Charles Darwin', 'Isaac Newton', 'Galileu Galilei'] },
    { es: 'Alfred Wegener', en: 'Alfred Wegener', ca: 'Alfred Wegener' },
    '🧑‍🔬',
    { es: 'Alfred Wegener propuso la teoría de la deriva continental: la idea de que los continentes se mueven lentamente sobre la superficie terrestre.', en: 'Alfred Wegener proposed the theory of continental drift: the idea that continents move slowly across the Earth\'s surface.', ca: 'Alfred Wegener va proposar la teoria de la deriva continental: la idea que els continents es mouen lentament sobre la superfície terrestre.' }),

  // ── ESO: bordes de placa, epicentro y contexto histórico de la teoría ──
  q('pt-09', 'eso',
    { es: '¿Cómo se llama el punto en la superficie justo encima de donde se origina un terremoto?', en: 'What is the point on the surface directly above where an earthquake originates called?', ca: 'Com es diu el punt a la superfície just a sobre d\'on s\'origina un terratrèmol?' },
    { es: ['El epicentro', 'El ecuador', 'El meridiano', 'El polo'], en: ['The epicentre', 'The equator', 'The meridian', 'The pole'], ca: ['L\'epicentre', 'L\'equador', 'El meridià', 'El pol'] },
    { es: 'El epicentro', en: 'The epicentre', ca: 'L\'epicentre' },
    '📍',
    { es: 'El epicentro es el punto de la superficie terrestre situado justo encima del foco (el lugar real, en profundidad, donde se origina el terremoto).', en: 'The epicentre is the point on the Earth\'s surface located directly above the focus (the actual place, at depth, where the earthquake originates).', ca: 'L\'epicentre és el punt de la superfície terrestre situat just a sobre del focus (el lloc real, en profunditat, on s\'origina el terratrèmol).' }),

  q('pt-10', 'eso',
    { es: '¿Qué ocurre en un borde de placas convergente?', en: 'What happens at a convergent plate boundary?', ca: 'Què passa en una vora de plaques convergent?' },
    { es: ['Las placas chocan entre sí', 'Las placas se separan', 'Las placas se deslizan lateralmente', 'Las placas desaparecen'], en: ['The plates collide with each other', 'The plates move apart', 'The plates slide sideways past each other', 'The plates disappear'], ca: ['Les plaques xoquen entre elles', 'Les plaques se separen', 'Les plaques llisquen lateralment', 'Les plaques desapareixen'] },
    { es: 'Las placas chocan entre sí', en: 'The plates collide with each other', ca: 'Les plaques xoquen entre elles' },
    '⛰️',
    { es: 'En un borde convergente las placas chocan: el resultado puede ser la formación de cordilleras (como el Himalaya) o una zona de subducción, donde una placa se hunde bajo la otra.', en: 'At a convergent boundary the plates collide: the result can be the formation of mountain ranges (like the Himalayas) or a subduction zone, where one plate sinks beneath the other.', ca: 'En una vora convergent les plaques xoquen: el resultat pot ser la formació de serralades (com l\'Himàlaia) o una zona de subducció, on una placa s\'enfonsa sota l\'altra.' }),

  q('pt-11', 'eso',
    { es: '¿Qué ocurre en un borde de placas divergente?', en: 'What happens at a divergent plate boundary?', ca: 'Què passa en una vora de plaques divergent?' },
    { es: ['Las placas se separan y se crea nueva corteza', 'Las placas chocan y forman montañas', 'Las placas se deslizan lateralmente', 'No pasa nada, las placas están quietas'], en: ['The plates move apart and new crust is created', 'The plates collide and form mountains', 'The plates slide sideways', 'Nothing happens, the plates are still'], ca: ['Les plaques se separen i es crea nova escorça', 'Les plaques xoquen i formen muntanyes', 'Les plaques llisquen lateralment', 'No passa res, les plaques estan quietes'] },
    { es: 'Las placas se separan y se crea nueva corteza', en: 'The plates move apart and new crust is created', ca: 'Les plaques se separen i es crea nova escorça' },
    '🌊',
    { es: 'En un borde divergente las placas se separan, y el magma que sube para rellenar el hueco crea corteza nueva — así se forman las dorsales oceánicas.', en: 'At a divergent boundary the plates move apart, and magma rising to fill the gap creates new crust — this is how ocean ridges form.', ca: 'En una vora divergent les plaques se separen, i el magma que puja per omplir el buit crea escorça nova — així es formen les dorsals oceàniques.' }),

  q('pt-12', 'eso',
    { es: '¿Qué ocurre en un borde de placas transformante?', en: 'What happens at a transform plate boundary?', ca: 'Què passa en una vora de plaques transformant?' },
    { es: ['Las placas se deslizan lateralmente una junto a otra', 'Las placas se separan creando corteza nueva', 'Las placas chocan formando montañas', 'Una placa se derrite por completo'], en: ['The plates slide sideways past each other', 'The plates move apart creating new crust', 'The plates collide forming mountains', 'One plate melts completely'], ca: ['Les plaques llisquen lateralment una al costat de l\'altra', 'Les plaques se separen creant escorça nova', 'Les plaques xoquen formant muntanyes', 'Una placa es fon completament'] },
    { es: 'Las placas se deslizan lateralmente una junto a otra', en: 'The plates slide sideways past each other', ca: 'Les plaques llisquen lateralment una al costat de l\'altra' },
    '↔️',
    { es: 'En un borde transformante las placas se rozan deslizándose lateralmente, sin crear ni destruir corteza — es el caso de la famosa falla de San Andrés, en California.', en: 'At a transform boundary the plates grind past each other sideways, without creating or destroying crust — this is the case of the famous San Andreas Fault in California.', ca: 'En una vora transformant les plaques es freguen lliscant lateralment, sense crear ni destruir escorça — és el cas de la famosa falla de San Andreas, a Califòrnia.' }),

  q('pt-13', 'eso',
    { es: '¿Cómo se llama la zona del planeta donde se concentran la mayoría de volcanes y terremotos del mundo?', en: 'What is the region of the planet where most of the world\'s volcanoes and earthquakes are concentrated called?', ca: 'Com es diu la zona del planeta on es concentren la majoria de volcans i terratrèmols del món?' },
    { es: ['El Cinturón de Fuego del Pacífico', 'El Triángulo de las Bermudas', 'La Falla de San Andrés', 'El Círculo Polar Ártico'], en: ['The Pacific Ring of Fire', 'The Bermuda Triangle', 'The San Andreas Fault', 'The Arctic Circle'], ca: ['El Cinturó de Foc del Pacífic', 'El Triangle de les Bermudes', 'La Falla de San Andreas', 'El Cercle Polar Àrtic'] },
    { es: 'El Cinturón de Fuego del Pacífico', en: 'The Pacific Ring of Fire', ca: 'El Cinturó de Foc del Pacífic' },
    '🔥',
    { es: 'El Cinturón de Fuego del Pacífico es una franja en forma de herradura alrededor del océano Pacífico donde se concentran numerosos bordes de placas, y con ellos, la mayoría de terremotos y volcanes del planeta.', en: 'The Pacific Ring of Fire is a horseshoe-shaped belt around the Pacific Ocean where numerous plate boundaries are concentrated, and with them, most of the planet\'s earthquakes and volcanoes.', ca: 'El Cinturó de Foc del Pacífic és una franja en forma de ferradura al voltant de l\'oceà Pacífic on es concentren nombroses vores de plaques, i amb elles, la majoria de terratrèmols i volcans del planeta.' }),

  q('pt-14', 'eso',
    { es: '¿En qué año propuso Wegener la teoría de la deriva continental?', en: 'In what year did Wegener propose the theory of continental drift?', ca: 'En quin any va proposar Wegener la teoria de la deriva continental?' },
    { es: ['1912', '1859', '1969', '1492'], en: ['1912', '1859', '1969', '1492'], ca: ['1912', '1859', '1969', '1492'] },
    { es: '1912', en: '1912', ca: '1912' },
    '📅',
    { es: 'Wegener presentó su teoría de la deriva continental en 1912. En su época no fue aceptada por falta de un mecanismo que la explicara, pero décadas después dio origen a la tectónica de placas moderna.', en: 'Wegener presented his theory of continental drift in 1912. It was not accepted at the time due to the lack of a mechanism to explain it, but decades later it gave rise to modern plate tectonics.', ca: 'Wegener va presentar la seva teoria de la deriva continental el 1912. En la seva època no va ser acceptada per manca d\'un mecanisme que l\'expliqués, però dècades després va donar origen a la tectònica de plaques moderna.' }),


  q('pt-16', 'primaria',
    { es: "¿Qué ocurre cuando dos placas chocan?", en: "What happens when two plates collide?", ca: "Què passa quan dues plaques xoquen?" },
    { es: ["Nada","Se forman montañas y hay terremotos","Se crea un desierto","Se enfría la Tierra"], en: ["Nothing","Mountains form and earthquakes happen","A desert is created","The Earth cools"], ca: ["Res","Es formen muntanyes i hi ha terratrèmols","Es crea un desert","La Terra es refreda"] },
    { es: "Se forman montañas y hay terremotos", en: "Mountains form and earthquakes happen", ca: "Es formen muntanyes i hi ha terratrèmols" },
    '🏔️',
    { es: "El choque arruga la corteza y levanta cordilleras. El Himalaya sigue creciendo hoy porque la India sigue empujando contra Asia.", en: "Collisions crumple the crust into mountain ranges: the Himalayas are still growing.", ca: "El xoc arruga l'escorça i aixeca serralades: l'Himàlaia encara creix." }),

  q('pt-17', 'primaria',
    { es: "¿Qué es un terremoto?", en: "What is an earthquake?", ca: "Què és un terratrèmol?" },
    { es: ["Una erupción","Una vibración del suelo por la liberación brusca de energía","Una ola gigante","Un hundimiento del mar"], en: ["An eruption","Ground shaking from a sudden release of energy","A giant wave","A sinking of the sea"], ca: ["Una erupció","Una vibració del sòl per l'alliberament brusc d'energia","Una ona gegant","Un enfonsament del mar"] },
    { es: "Una vibración del suelo por la liberación brusca de energía", en: "Ground shaking from a sudden release of energy", ca: "Una vibració del sòl per l'alliberament brusc d'energia" },
    '📳',
    { es: "Las placas se enganchan, acumulan tensión y de golpe se sueltan. Esa energía viaja en forma de ondas y hace temblar el suelo.", en: "Plates lock, build up stress and suddenly slip, sending out waves.", ca: "Les plaques s'enganxen, acumulen tensió i de cop es deixen anar." }),

  q('pt-18', 'primaria',
    { es: "¿Dónde hay más volcanes y terremotos?", en: "Where are most volcanoes and earthquakes?", ca: "On hi ha més volcans i terratrèmols?" },
    { es: ["En el centro de los continentes","En los bordes de las placas","En los desiertos","En los polos"], en: ["In the middle of continents","At plate boundaries","In deserts","At the poles"], ca: ["Al centre dels continents","Als límits de les plaques","Als deserts","Als pols"] },
    { es: "En los bordes de las placas", en: "At plate boundaries", ca: "Als límits de les plaques" },
    '🌋',
    { es: "Casi toda la actividad se concentra en los bordes. El \"Cinturón de Fuego\" del Pacífico reúne el 75% de los volcanes activos del planeta.", en: "Almost all activity is at plate edges: the Pacific Ring of Fire holds 75% of active volcanoes.", ca: "Gairebé tota l'activitat es concentra als límits de les plaques." }),

  q('pt-19', 'primaria',
    { es: "¿Qué fue Pangea?", en: "What was Pangaea?", ca: "Què va ser Pangea?" },
    { es: ["Un volcán gigante","Un supercontinente que reunía toda la tierra firme","Un océano","Una era glacial"], en: ["A giant volcano","A supercontinent holding all land together","An ocean","An ice age"], ca: ["Un volcà gegant","Un supercontinent que reunia tota la terra ferma","Un oceà","Una era glacial"] },
    { es: "Un supercontinente que reunía toda la tierra firme", en: "A supercontinent holding all land together", ca: "Un supercontinent que reunia tota la terra ferma" },
    '🗺️',
    { es: "Hace unos 300 millones de años los continentes estaban unidos en uno solo. Al separarse quedaron las costas que hoy encajan como un puzle, como África y Sudamérica.", en: "Around 300 million years ago all land was joined; that is why Africa and South America still fit together.", ca: "Fa uns 300 milions d'anys els continents estaven units en un de sol." }),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
