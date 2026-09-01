// Prehistoria (Paleolítico y Neolítico) — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-prehistoria.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('pr-01', 'primaria',
    { es: '¿Cuál es el periodo más largo de la Prehistoria?', en: 'Which is the longest period of Prehistory?', ca: 'Quin és el període més llarg de la Prehistòria?' },
    { es: ['El Paleolítico', 'El Neolítico', 'La Edad del Hierro', 'La Edad Media'], en: ['The Palaeolithic', 'The Neolithic', 'The Iron Age', 'The Middle Ages'], ca: ['El Paleolític', 'El Neolític', 'L\'Edat del Ferro', 'L\'Edat Mitjana'] },
    { es: 'El Paleolítico', en: 'The Palaeolithic', ca: 'El Paleolític' },
    '🦴',
    { es: 'El Paleolítico ("piedra antigua") es, con diferencia, el periodo más largo de la Prehistoria: casi toda la historia humana transcurrió como cazadores-recolectores nómadas.', en: 'The Palaeolithic ("old stone") is, by far, the longest period of Prehistory: almost all of human history was spent as nomadic hunter-gatherers.', ca: 'El Paleolític ("pedra antiga") és, de llarg, el període més llarg de la Prehistòria: gairebé tota la història humana va transcórrer com a caçadors-recol·lectors nòmades.' }),

  q('pr-02', 'primaria',
    { es: '¿Cómo vivían los seres humanos en el Paleolítico?', en: 'How did humans live during the Palaeolithic?', ca: 'Com vivien els éssers humans al Paleolític?' },
    { es: ['Como nómadas, cazando y recolectando', 'En ciudades con edificios de piedra', 'Cultivando la tierra en granjas', 'Viajando en barco por el mar'], en: ['As nomads, hunting and gathering', 'In cities with stone buildings', 'Farming the land', 'Travelling by boat across the sea'], ca: ['Com a nòmades, caçant i recol·lectant', 'En ciutats amb edificis de pedra', 'Conreant la terra en granges', 'Viatjant en vaixell pel mar'] },
    { es: 'Como nómadas, cazando y recolectando', en: 'As nomads, hunting and gathering', ca: 'Com a nòmades, caçant i recol·lectant' },
    '🏕️',
    { es: 'En el Paleolítico, los humanos eran nómadas: se movían de un lugar a otro cazando animales y recolectando frutos, sin asentarse en un sitio fijo.', en: 'During the Palaeolithic, humans were nomadic: they moved from place to place hunting animals and gathering fruit, without settling in a fixed spot.', ca: 'Al Paleolític, els humans eren nòmades: es movien d\'un lloc a un altre caçant animals i recol·lectant fruits, sense assentar-se en un lloc fix.' }),

  q('pr-03', 'primaria',
    { es: '¿Qué gran descubrimiento controlaron los humanos durante el Paleolítico?', en: 'What great discovery did humans control during the Palaeolithic?', ca: 'Quin gran descobriment van controlar els humans durant el Paleolític?' },
    { es: ['El fuego', 'La electricidad', 'La rueda de vapor', 'El imán'], en: ['Fire', 'Electricity', 'The steam wheel', 'The magnet'], ca: ['El foc', 'L\'electricitat', 'La roda de vapor', 'L\'imant'] },
    { es: 'El fuego', en: 'Fire', ca: 'El foc' },
    '🔥',
    { es: 'El control del fuego fue uno de los grandes avances del Paleolítico: sirvió para calentarse, cocinar y ahuyentar a los animales peligrosos.', en: 'The control of fire was one of the great advances of the Palaeolithic: it was used for warmth, cooking and scaring off dangerous animals.', ca: 'El control del foc va ser un dels grans avenços del Paleolític: va servir per escalfar-se, cuinar i espantar els animals perillosos.' }),

  q('pr-04', 'primaria',
    { es: '¿Qué son las pinturas rupestres?', en: 'What are cave paintings?', ca: 'Què són les pintures rupestres?' },
    { es: ['Dibujos hechos por los humanos prehistóricos en las paredes de las cuevas', 'Cuadros que se venden en museos modernos', 'Mapas de carreteras antiguas', 'Escritos en tablillas de arcilla'], en: ['Drawings made by prehistoric humans on cave walls', 'Paintings sold in modern museums', 'Maps of ancient roads', 'Writings on clay tablets'], ca: ['Dibuixos fets pels humans prehistòrics a les parets de les coves', 'Quadres que es venen en museus moderns', 'Mapes de carreteres antigues', 'Escrits en tauletes d\'argila'] },
    { es: 'Dibujos hechos por los humanos prehistóricos en las paredes de las cuevas', en: 'Drawings made by prehistoric humans on cave walls', ca: 'Dibuixos fets pels humans prehistòrics a les parets de les coves' },
    '🎨',
    { es: 'Las pinturas rupestres son dibujos, muchas veces de animales, que los humanos del Paleolítico pintaron en las paredes de las cuevas donde se refugiaban.', en: 'Cave paintings are drawings, often of animals, that Palaeolithic humans painted on the walls of the caves where they took shelter.', ca: 'Les pintures rupestres són dibuixos, moltes vegades d\'animals, que els humans del Paleolític van pintar a les parets de les coves on es refugiaven.' }),

  q('pr-05', 'primaria',
    { es: '¿Qué cueva española es famosa por sus pinturas rupestres del Paleolítico?', en: 'Which Spanish cave is famous for its Palaeolithic cave paintings?', ca: 'Quina cova espanyola és famosa per les seves pintures rupestres del Paleolític?' },
    { es: ['Altamira', 'Atapuerca', 'La Alhambra', 'Las Médulas'], en: ['Altamira', 'Atapuerca', 'The Alhambra', 'Las Médulas'], ca: ['Altamira', 'Atapuerca', 'L\'Alhambra', 'Las Médulas'] },
    { es: 'Altamira', en: 'Altamira', ca: 'Altamira' },
    '🦬',
    { es: 'La cueva de Altamira, en Cantabria, es mundialmente famosa por sus pinturas rupestres del Paleolítico superior, sobre todo por sus bisontes.', en: 'The cave of Altamira, in Cantabria, is world-famous for its Upper Palaeolithic cave paintings, especially its bison.', ca: 'La cova d\'Altamira, a Cantàbria, és mundialment famosa per les seves pintures rupestres del Paleolític superior, sobretot pels seus bisons.' }),

  q('pr-06', 'primaria',
    { es: '¿Qué cambio importante trajo el Neolítico?', en: 'What important change did the Neolithic bring?', ca: 'Quin canvi important va portar el Neolític?' },
    { es: ['La agricultura y la ganadería', 'La invención del automóvil', 'La llegada del ser humano a la Luna', 'La aparición de internet'], en: ['Agriculture and farming', 'The invention of the car', 'Humans reaching the Moon', 'The appearance of the internet'], ca: ['L\'agricultura i la ramaderia', 'La invenció de l\'automòbil', 'L\'arribada de l\'ésser humà a la Lluna', 'L\'aparició d\'internet'] },
    { es: 'La agricultura y la ganadería', en: 'Agriculture and farming', ca: 'L\'agricultura i la ramaderia' },
    '🌾',
    { es: 'En el Neolítico, los humanos aprendieron a cultivar plantas y a domesticar animales — un cambio tan grande que se conoce como la Revolución Neolítica.', en: 'In the Neolithic, humans learned to grow plants and domesticate animals — a change so big it is known as the Neolithic Revolution.', ca: 'Al Neolític, els humans van aprendre a conrear plantes i a domesticar animals — un canvi tan gran que es coneix com la Revolució Neolítica.' }),

  q('pr-07', 'primaria',
    { es: '¿Qué significa que los humanos se volvieran "sedentarios" en el Neolítico?', en: 'What does it mean that humans became "settled" in the Neolithic?', ca: 'Què significa que els humans es tornessin "sedentaris" al Neolític?' },
    { es: ['Que dejaron de moverse constantemente y se asentaron en un lugar fijo', 'Que empezaron a viajar más que nunca', 'Que se volvieron todos artistas', 'Que dejaron de comer carne'], en: ['That they stopped moving constantly and settled in a fixed place', 'That they started travelling more than ever', 'That they all became artists', 'That they stopped eating meat'], ca: ['Que van deixar de moure\'s constantment i es van assentar en un lloc fix', 'Que van començar a viatjar més que mai', 'Que es van tornar tots artistes', 'Que van deixar de menjar carn'] },
    { es: 'Que dejaron de moverse constantemente y se asentaron en un lugar fijo', en: 'That they stopped moving constantly and settled in a fixed place', ca: 'Que van deixar de moure\'s constantment i es van assentar en un lloc fix' },
    '🏘️',
    { es: 'Gracias a la agricultura, los humanos ya no necesitaban moverse buscando comida, así que se asentaron en poblados fijos: eso es ser sedentarios.', en: 'Thanks to agriculture, humans no longer needed to move around looking for food, so they settled in fixed villages: that is what being settled means.', ca: 'Gràcies a l\'agricultura, els humans ja no necessitaven moure\'s buscant menjar, així que es van assentar en poblats fixos: això és ser sedentaris.' }),

  q('pr-08', 'primaria',
    { es: '¿Qué objetos de barro empezaron a fabricarse en el Neolítico?', en: 'What clay objects began to be made in the Neolithic?', ca: 'Quins objectes de fang van començar a fabricar-se al Neolític?' },
    { es: ['Vasijas de cerámica', 'Espadas de hierro', 'Ruedas de carro', 'Monedas de oro'], en: ['Pottery vessels', 'Iron swords', 'Cart wheels', 'Gold coins'], ca: ['Gerros de ceràmica', 'Espases de ferro', 'Rodes de carro', 'Monedes d\'or'] },
    { es: 'Vasijas de cerámica', en: 'Pottery vessels', ca: 'Gerros de ceràmica' },
    '🏺',
    { es: 'En el Neolítico apareció la cerámica: los humanos aprendieron a moldear el barro y cocerlo para fabricar vasijas donde guardar agua y alimentos.', en: 'In the Neolithic, pottery appeared: humans learned to shape and fire clay to make vessels for storing water and food.', ca: 'Al Neolític va aparèixer la ceràmica: els humans van aprendre a modelar el fang i coure\'l per fabricar gerros on guardar aigua i aliments.' }),

  // ── ESO: la Revolución Neolítica, Atapuerca y la frontera con la Historia ──
  q('pr-09', 'eso',
    { es: '¿Con qué acontecimiento termina la Prehistoria y empieza la Historia?', en: 'What event marks the end of Prehistory and the start of History?', ca: 'Amb quin esdeveniment acaba la Prehistòria i comença la Història?' },
    { es: ['La aparición de la escritura', 'La invención de la rueda', 'El descubrimiento del fuego', 'La construcción de las pirámides'], en: ['The appearance of writing', 'The invention of the wheel', 'The discovery of fire', 'The building of the pyramids'], ca: ['L\'aparició de l\'escriptura', 'La invenció de la roda', 'El descobriment del foc', 'La construcció de les piràmides'] },
    { es: 'La aparición de la escritura', en: 'The appearance of writing', ca: 'L\'aparició de l\'escriptura' },
    '📜',
    { es: 'La Prehistoria termina, por definición, con la invención de la escritura, hace unos 5.000 años en Mesopotamia. A partir de ahí, al haber documentos escritos, empieza la Historia.', en: 'Prehistory ends, by definition, with the invention of writing, about 5,000 years ago in Mesopotamia. From then on, with written documents available, History begins.', ca: 'La Prehistòria acaba, per definició, amb la invenció de l\'escriptura, fa uns 5.000 anys a Mesopotàmia. A partir d\'aquí, en haver-hi documents escrits, comença la Història.' }),

  q('pr-10', 'eso',
    { es: '¿En qué región del mundo comenzó la Revolución Neolítica?', en: 'In which region of the world did the Neolithic Revolution begin?', ca: 'En quina regió del món va començar la Revolució Neolítica?' },
    { es: ['El Creciente Fértil (Oriente Próximo)', 'La península ibérica', 'El norte de Europa', 'Australia'], en: ['The Fertile Crescent (the Near East)', 'The Iberian Peninsula', 'Northern Europe', 'Australia'], ca: ['El Creixent Fèrtil (Orient Pròxim)', 'La península ibèrica', 'El nord d\'Europa', 'Austràlia'] },
    { es: 'El Creciente Fértil (Oriente Próximo)', en: 'The Fertile Crescent (the Near East)', ca: 'El Creixent Fèrtil (Orient Pròxim)' },
    '🌍',
    { es: 'La Revolución Neolítica comenzó hace unos 10.000 años en el Creciente Fértil, una región de Oriente Próximo con tierras muy fértiles para la agricultura temprana.', en: 'The Neolithic Revolution began about 10,000 years ago in the Fertile Crescent, a region of the Near East with land very fertile for early agriculture.', ca: 'La Revolució Neolítica va començar fa uns 10.000 anys al Creixent Fèrtil, una regió de l\'Orient Pròxim amb terres molt fèrtils per a l\'agricultura primerenca.' }),

  q('pr-11', 'eso',
    { es: '¿Cuál es la diferencia entre la piedra tallada del Paleolítico y la piedra pulida del Neolítico?', en: 'What is the difference between the chipped stone of the Palaeolithic and the polished stone of the Neolithic?', ca: 'Quina és la diferència entre la pedra tallada del Paleolític i la pedra polida del Neolític?' },
    { es: ['Tallada = golpeada para dar forma; pulida = alisada con más precisión', 'Son exactamente lo mismo', 'Tallada es del Neolítico y pulida del Paleolítico', 'La piedra pulida no existió nunca'], en: ['Chipped = struck into shape; polished = smoothed with more precision', 'They are exactly the same', 'Chipped is from the Neolithic and polished from the Palaeolithic', 'Polished stone never existed'], ca: ['Tallada = colpejada per donar forma; polida = allisada amb més precisió', 'Són exactament el mateix', 'Tallada és del Neolític i polida del Paleolític', 'La pedra polida no va existir mai'] },
    { es: 'Tallada = golpeada para dar forma; pulida = alisada con más precisión', en: 'Chipped = struck into shape; polished = smoothed with more precision', ca: 'Tallada = colpejada per donar forma; polida = allisada amb més precisió' },
    '🔨',
    { es: 'En el Paleolítico la piedra se tallaba golpeándola para darle una forma útil. En el Neolítico se aprendió a pulirla, alisándola con más tiempo y precisión, lo que dio herramientas más eficaces.', en: 'In the Palaeolithic, stone was chipped by striking it into a useful shape. In the Neolithic, people learned to polish it, smoothing it with more time and precision, producing more effective tools.', ca: 'Al Paleolític la pedra es tallava colpejant-la per donar-li una forma útil. Al Neolític es va aprendre a polir-la, allisant-la amb més temps i precisió, la qual cosa va donar eines més eficaces.' }),

  q('pr-12', 'eso',
    { es: '¿Cómo se llama el importante yacimiento español donde se han encontrado restos humanos de más de 800.000 años?', en: 'What is the important Spanish site where human remains over 800,000 years old have been found called?', ca: 'Com es diu l\'important jaciment espanyol on s\'han trobat restes humanes de més de 800.000 anys?' },
    { es: ['Atapuerca', 'Altamira', 'Numancia', 'Itálica'], en: ['Atapuerca', 'Altamira', 'Numantia', 'Italica'], ca: ['Atapuerca', 'Altamira', 'Numància', 'Itálica'] },
    { es: 'Atapuerca', en: 'Atapuerca', ca: 'Atapuerca' },
    '⛏️',
    { es: 'Atapuerca, en Burgos, es uno de los yacimientos arqueológicos más importantes del mundo, con restos humanos de más de 800.000 años de antigüedad.', en: 'Atapuerca, in Burgos, is one of the most important archaeological sites in the world, with human remains more than 800,000 years old.', ca: 'Atapuerca, a Burgos, és un dels jaciments arqueològics més importants del món, amb restes humanes de més de 800.000 anys d\'antiguitat.' }),

  q('pr-13', 'eso',
    { es: '¿Qué especie humana se identificó gracias a los restos de Atapuerca?', en: 'What human species was identified thanks to the remains at Atapuerca?', ca: 'Quina espècie humana es va identificar gràcies a les restes d\'Atapuerca?' },
    { es: ['Homo antecessor', 'Homo sapiens sapiens', 'Australopithecus afarensis', 'Homo habilis'], en: ['Homo antecessor', 'Homo sapiens sapiens', 'Australopithecus afarensis', 'Homo habilis'], ca: ['Homo antecessor', 'Homo sapiens sapiens', 'Australopithecus afarensis', 'Homo habilis'] },
    { es: 'Homo antecessor', en: 'Homo antecessor', ca: 'Homo antecessor' },
    '🧬',
    { es: 'Los restos hallados en Atapuerca permitieron identificar el Homo antecessor, una especie humana antigua que vivió en la península ibérica hace más de 800.000 años.', en: 'The remains found at Atapuerca made it possible to identify Homo antecessor, an ancient human species that lived on the Iberian Peninsula more than 800,000 years ago.', ca: 'Les restes trobades a Atapuerca van permetre identificar l\'Homo antecessor, una espècie humana antiga que va viure a la península ibèrica fa més de 800.000 anys.' }),

  q('pr-14', 'eso',
    { es: '¿En qué orden se sucedieron las edades de los metales tras el Neolítico?', en: 'In what order did the Metal Ages follow the Neolithic?', ca: 'En quin ordre es van succeir les edats dels metalls després del Neolític?' },
    { es: ['Edad del Cobre → Edad del Bronce → Edad del Hierro', 'Edad del Hierro → Edad del Bronce → Edad del Cobre', 'Edad del Bronce → Edad del Cobre → Edad del Hierro', 'Todas ocurrieron al mismo tiempo'], en: ['Copper Age → Bronze Age → Iron Age', 'Iron Age → Bronze Age → Copper Age', 'Bronze Age → Copper Age → Iron Age', 'They all happened at the same time'], ca: ['Edat del Coure → Edat del Bronze → Edat del Ferro', 'Edat del Ferro → Edat del Bronze → Edat del Coure', 'Edat del Bronze → Edat del Coure → Edat del Ferro', 'Totes van passar alhora'] },
    { es: 'Edad del Cobre → Edad del Bronce → Edad del Hierro', en: 'Copper Age → Bronze Age → Iron Age', ca: 'Edat del Coure → Edat del Bronze → Edat del Ferro' },
    '⚒️',
    { es: 'Tras el Neolítico llegó la Edad de los Metales, en este orden: primero el cobre, después el bronce (una aleación de cobre y estaño, más resistente) y por último el hierro, el metal más duro de trabajar pero también el más resistente.', en: 'After the Neolithic came the Metal Ages, in this order: first copper, then bronze (an alloy of copper and tin, stronger), and finally iron, the hardest metal to work but also the toughest.', ca: 'Després del Neolític va arribar l\'Edat dels Metalls, en aquest ordre: primer el coure, després el bronze (un aliatge de coure i estany, més resistent) i finalment el ferro, el metall més dur de treballar però també el més resistent.' }),

  q('pr-15', 'primaria',
    { es: "¿Qué material da nombre a la Edad de Piedra?", en: "Which material gives the Stone Age its name?", ca: "Quin material dona nom a l'Edat de Pedra?" },
    { es: ["El bronce","La piedra","El hierro","La madera"], en: ["Bronze","Stone","Iron","Wood"], ca: ["El bronze","La pedra","El ferro","La fusta"] },
    { es: "La piedra", en: "Stone", ca: "La pedra" },
    '⛏️',
    { es: "Los periodos de la Prehistoria se nombran por el material de las herramientas: piedra primero, y luego bronce y hierro.", en: "Prehistoric periods are named after tool materials: stone first, then bronze and iron.", ca: "Els períodes de la Prehistòria es nomenen pel material de les eines." }),

  q('pr-16', 'primaria',
    { es: "¿Qué gran cambio trajo el Neolítico?", en: "What big change did the Neolithic bring?", ca: "Quin gran canvi va portar el Neolític?" },
    { es: ["El uso del fuego","La agricultura y la ganadería","La escritura","La rueda de coche"], en: ["The use of fire","Farming and livestock","Writing","The car wheel"], ca: ["L'ús del foc","L'agricultura i la ramaderia","L'escriptura","La roda de cotxe"] },
    { es: "La agricultura y la ganadería", en: "Farming and livestock", ca: "L'agricultura i la ramaderia" },
    '🌾',
    { es: "Con la agricultura la gente dejó de ir detrás de la comida y empezó a producirla. De ahí vienen los poblados fijos y, con el tiempo, las ciudades.", en: "With farming, people stopped chasing food and started producing it — hence permanent villages.", ca: "Amb l'agricultura la gent va deixar de perseguir el menjar i va començar a produir-lo." }),

  q('pr-17', 'primaria',
    { es: "¿Cómo conseguían la comida en el Paleolítico?", en: "How did people get food in the Palaeolithic?", ca: "Com aconseguien el menjar al Paleolític?" },
    { es: ["Cultivando","Cazando y recolectando","Comprándola","Criando ganado"], en: ["By farming","By hunting and gathering","By buying it","By raising livestock"], ca: ["Conreant","Caçant i recol·lectant","Comprant-lo","Criant bestiar"] },
    { es: "Cazando y recolectando", en: "By hunting and gathering", ca: "Caçant i recol·lectant" },
    '🏹',
    { es: "Eran cazadores-recolectores nómadas: se movían siguiendo a los animales y buscando frutos, porque no sabían producir alimento.", en: "They were nomadic hunter-gatherers, moving after animals and fruit.", ca: "Eren caçadors-recol·lectors nòmades: es movien seguint els animals." }),

  q('pr-18', 'primaria',
    { es: "¿Para qué servía el fuego en la Prehistoria?", en: "What was fire used for in Prehistory?", ca: "Per a què servia el foc a la Prehistòria?" },
    { es: ["Solo para ver de noche","Para calentarse, cocinar y protegerse de los animales","Para fabricar metal desde el principio","No se usaba"], en: ["Only to see at night","To keep warm, cook and keep animals away","To make metal from the start","It was not used"], ca: ["Només per veure-hi de nit","Per escalfar-se, cuinar i protegir-se dels animals","Per fabricar metall des del principi","No es feia servir"] },
    { es: "Para calentarse, cocinar y protegerse de los animales", en: "To keep warm, cook and keep animals away", ca: "Per escalfar-se, cuinar i protegir-se dels animals" },
    '🔥',
    { es: "El fuego cambió la vida: cocinar hizo la comida más fácil de digerir y más segura, y ahuyentaba a los depredadores por la noche.", en: "Fire changed everything: cooking made food easier to digest and kept predators away.", ca: "El foc va canviar la vida: cuinar feia el menjar més fàcil de digerir i allunyava els depredadors." }),

  q('pr-19', 'primaria',
    { es: "¿Qué son las pinturas rupestres?", en: "What is cave art?", ca: "Què són les pintures rupestres?" },
    { es: ["Pinturas hechas en cuevas","Un tipo de herramienta","Casas de piedra","Enterramientos"], en: ["Paintings made in caves","A kind of tool","Stone houses","Burials"], ca: ["Pintures fetes a les coves","Un tipus d'eina","Cases de pedra","Enterraments"] },
    { es: "Pinturas hechas en cuevas", en: "Paintings made in caves", ca: "Pintures fetes a les coves" },
    '🎨',
    { es: "Son pinturas en las paredes de las cuevas, casi siempre de animales. Altamira, en Cantabria, es una de las más famosas del mundo.", en: "Paintings on cave walls, usually of animals. Altamira in Spain is world famous.", ca: "Són pintures a les parets de les coves, gairebé sempre d'animals. Altamira n'és una de les més famoses." }),

  q('pr-20', 'primaria',
    { es: "¿Qué marca el final de la Prehistoria?", en: "What marks the end of Prehistory?", ca: "Què marca el final de la Prehistòria?" },
    { es: ["La llegada del fuego","La invención de la escritura","El fin de los dinosaurios","La agricultura"], en: ["The arrival of fire","The invention of writing","The end of the dinosaurs","Farming"], ca: ["L'arribada del foc","La invenció de l'escriptura","La fi dels dinosaures","L'agricultura"] },
    { es: "La invención de la escritura", en: "The invention of writing", ca: "La invenció de l'escriptura" },
    '📜',
    { es: "Prehistoria significa \"antes de la historia escrita\". En cuanto aparece la escritura empieza la Historia, porque ya hay documentos que contarla.", en: "Prehistory means \"before written history\": once writing appears, History begins.", ca: "Prehistòria vol dir \"abans de la història escrita\": quan apareix l'escriptura comença la Història." }),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
