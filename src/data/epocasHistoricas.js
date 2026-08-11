// ¿Qué Época Es? — banco de imágenes reales (dominio público) para adivinar
// la época histórica que retratan.
//
// IMPORTANTE sobre lo que se pregunta: siempre la ÉPOCA QUE RETRATA la
// imagen, nunca cuándo se hizo la fotografía. Con Tutankamón, por ejemplo,
// la respuesta correcta es "Edad Antigua" aunque la foto la hiciera Harry
// Burton en 1922 durante la excavación — ese dato (fotógrafo, año de la
// foto) va solo en la explicación, como contexto, nunca como lo que hay
// que acertar.
//
// `fecha` es el momento o rango histórico real que retrata la imagen (con
// "hacia"/"c." cuando no hay certeza exacta, como en el Egipto faraónico) —
// no la fecha de la fotografía. Se guarda con precisión aunque hoy el juego
// solo pregunte por la época amplia: es la pieza que hará falta el día que
// haya examen específico de una época (ej. distinguir 1941 de 1945 dentro
// de la Segunda Guerra Mundial).
//
// `credito` recoge la procedencia y licencia de cada imagen — todas de
// dominio público, verificadas una a una en su página de Wikimedia Commons
// antes de subirlas (no vale fiarse de una categoría a ciegas).
function foto(id, src, epoca, tema, fecha, explicacion, credito, emoji) {
  return { id, src, epoca, tema, fecha, explicacion, credito, emoji }
}

// Las 5 épocas amplias — mismas que ya usa el resto de Historia en la
// plataforma (topicCatalog.js), así que a esto le siguen encajando los
// exámenes por tema que ya existen (Prehistoria, Edad Media, Antigua Roma,
// Edad Moderna, y dentro de la Contemporánea: Guerra Civil, 2GM, Franquismo).
export const EPOCAS = {
  prehistoria:    { es: 'Prehistoria',          en: 'Prehistory',            ca: 'Prehistòria' },
  antigua:        { es: 'Edad Antigua',         en: 'Antiquity',             ca: 'Edat Antiga' },
  'edad-media':   { es: 'Edad Media',           en: 'The Middle Ages',       ca: 'Edat Mitjana' },
  'edad-moderna': { es: 'Edad Moderna',         en: 'The Early Modern Period', ca: 'Edat Moderna' },
  contemporanea:  { es: 'Edad Contemporánea',   en: 'The Contemporary Age',  ca: 'Edat Contemporània' },
}

export const FOTOS = [
  foto(
    'wwii-dday-omaha',
    '/games/epocas/wwii-dday-omaha.jpg',
    'contemporanea',
    { es: 'Desembarco de Normandía (Día D)', en: 'D-Day landings', ca: 'Desembarcament de Normandia (Dia D)' },
    { es: '6 de junio de 1944', en: '6 June 1944', ca: '6 de juny de 1944' },
    {
      es: 'Soldados estadounidenses vadeando hacia la playa de Omaha durante el desembarco de Normandía, el 6 de junio de 1944 — el mayor desembarco militar de la historia y el inicio de la liberación de la Europa ocupada por la Alemania nazi.',
      en: 'American soldiers wading ashore at Omaha Beach during the Normandy landings on 6 June 1944 — the largest military landing in history and the start of the liberation of Nazi-occupied Europe.',
      ca: 'Soldats nord-americans vadejant cap a la platja d\'Omaha durant el desembarcament de Normandia, el 6 de juny de 1944 — el desembarcament militar més gran de la història i l\'inici de l\'alliberament de l\'Europa ocupada per l\'Alemanya nazi.',
    },
    'Robert F. Sargent, Guardia Costera de EE. UU. — Archivos Nacionales de EE. UU. (NARA), dominio público',
    '⚓',
  ),
  foto(
    'wwii-pow-ruhr',
    '/games/epocas/wwii-pow-ruhr.jpg',
    'contemporanea',
    { es: 'Frente occidental europeo', en: 'The Western European Front', ca: 'Front occidental europeu' },
    { es: '1945', en: '1945', ca: '1945' },
    {
      es: 'Prisioneros de guerra alemanes capturados por tropas aerotransportadas estadounidenses en la región del Ruhr, en la fase final de la guerra en Europa, en 1945.',
      en: 'German prisoners of war captured by American airborne troops in the Ruhr region, during the final phase of the war in Europe, in 1945.',
      ca: 'Presoners de guerra alemanys capturats per tropes aerotransportades nord-americanes a la regió del Ruhr, en la fase final de la guerra a Europa, el 1945.',
    },
    'Fotógrafo del Ejército de EE. UU. — Archivos Nacionales de EE. UU. (NARA), dominio público',
    '🎖️',
  ),
  foto(
    'egipto-tutankamon-mascara',
    '/games/epocas/egipto-tutankamon-mascara.jpg',
    'antigua',
    { es: 'Antiguo Egipto', en: 'Ancient Egypt', ca: 'Antic Egipte' },
    { es: 'hacia 1332–1323 a. C. (reinado de Tutankamón)', en: 'c. 1332–1323 BC (Tutankhamun\'s reign)', ca: 'cap al 1332–1323 aC (regnat de Tutankamon)' },
    {
      es: 'La máscara funeraria de Tutankamón, dentro de su sarcófago, fotografiada durante la excavación de su tumba en el Valle de los Reyes. El faraón reinó en el Antiguo Egipto hacia el 1332–1323 a. C. — la fotografía en sí es de 1925, pero lo que retrata es mucho más antiguo.',
      en: 'Tutankhamun\'s funerary mask inside his sarcophagus, photographed during the excavation of his tomb in the Valley of the Kings. The pharaoh reigned in Ancient Egypt around 1332–1323 BC — the photograph itself dates from 1925, but what it shows is far older.',
      ca: 'La màscara funerària de Tutankamon, dins del seu sarcòfag, fotografiada durant l\'excavació de la seva tomba a la Vall dels Reis. El faraó va regnar a l\'Antic Egipte cap al 1332–1323 aC — la fotografia en si és del 1925, però el que retrata és molt més antic.',
    },
    'Harry Burton, 1925 — Griffith Institute / Archivo Howard Carter, dominio público',
    '👑',
  ),
  foto(
    'egipto-tutankamon-tumba',
    '/games/epocas/egipto-tutankamon-tumba.jpg',
    'antigua',
    { es: 'Antiguo Egipto', en: 'Ancient Egypt', ca: 'Antic Egipte' },
    { es: 'hacia 1332–1323 a. C. (reinado de Tutankamón)', en: 'c. 1332–1323 BC (Tutankhamun\'s reign)', ca: 'cap al 1332–1323 aC (regnat de Tutankamon)' },
    {
      es: 'Objetos funerarios hallados en la tumba de Tutankamón, en el Valle de los Reyes. La tumba se descubrió casi intacta en 1922, pero los objetos y el propio faraón pertenecen al Antiguo Egipto, más de tres mil años antes.',
      en: 'Funerary objects found in Tutankhamun\'s tomb, in the Valley of the Kings. The tomb was discovered almost intact in 1922, but the objects and the pharaoh himself belong to Ancient Egypt, more than three thousand years earlier.',
      ca: 'Objectes funeraris trobats a la tomba de Tutankamon, a la Vall dels Reis. La tomba es va descobrir gairebé intacta el 1922, però els objectes i el mateix faraó pertanyen a l\'Antic Egipte, més de tres mil anys abans.',
    },
    'Harry Burton, 1922 — Griffith Institute / Archivo Howard Carter, dominio público',
    '⚱️',
  ),
  foto(
    'prehistoria-stonehenge',
    '/games/epocas/stonehenge-1877.jpg',
    'prehistoria',
    { es: 'Stonehenge (Neolítico/Edad del Bronce)', en: 'Stonehenge (Neolithic/Bronze Age)', ca: 'Stonehenge (Neolític/Edat del Bronze)' },
    { es: 'hacia 3000–1500 a. C. (construcción por fases)', en: 'c. 3000–1500 BC (built in phases)', ca: 'cap al 3000–1500 aC (construcció per fases)' },
    {
      es: 'El monumento de Stonehenge, en Inglaterra, se construyó por fases entre el 3000 y el 1500 a. C., en el tránsito del Neolítico a la Edad del Bronce. Esta fotografía es de 1877 —ya entonces el monumento tenía miles de años—, así que lo que hay que marcar es cuándo se levantaron las piedras, no cuándo se hizo la foto.',
      en: 'Stonehenge, in England, was built in phases between 3000 and 1500 BC, spanning the transition from the Neolithic to the Bronze Age. This photograph dates from 1877 — the monument was already thousands of years old by then — so what counts is when the stones were raised, not when the photo was taken.',
      ca: 'El monument de Stonehenge, a Anglaterra, es va construir per fases entre el 3000 i el 1500 aC, en el trànsit del Neolític a l\'Edat del Bronze. Aquesta fotografia és del 1877 —ja aleshores el monument tenia milers d\'anys—, així que el que cal marcar és quan es van aixecar les pedres, no pas quan es va fer la foto.',
    },
    'Fotografía de 1877 — dominio público (obra de más de 145 años, marca Public Domain Mark 1.0 en Wikimedia Commons)',
    '🗿',
  ),
  foto(
    'prehistoria-lascaux',
    '/games/epocas/lascaux-pintura.jpg',
    'prehistoria',
    { es: 'Pinturas rupestres de Lascaux (Paleolítico)', en: 'Lascaux cave paintings (Paleolithic)', ca: 'Pintures rupestres de Lascaux (Paleolític)' },
    { es: 'hacia 15300 a. C. (Paleolítico superior)', en: 'c. 15300 BC (Upper Paleolithic)', ca: 'cap al 15300 aC (Paleolític superior)' },
    {
      es: 'Pinturas de caballos y otros animales en la cueva de Lascaux (Francia), pintadas hace unos 17.300 años durante el Paleolítico superior. Es de las pruebas más antiguas de arte humano que existen.',
      en: 'Paintings of horses and other animals in the Lascaux cave (France), painted around 17,300 years ago during the Upper Paleolithic. It is among the oldest surviving evidence of human art.',
      ca: 'Pintures de cavalls i altres animals a la cova de Lascaux (França), pintades fa uns 17.300 anys durant el Paleolític superior. És una de les proves més antigues d\'art humà que existeixen.',
    },
    'Fotografía del fotógrafo (usuario Prof saxx), 2006 — publicada en dominio público en Wikimedia Commons',
    '🎨',
  ),
  foto(
    'antigua-pompeya',
    '/games/epocas/pompeya-sommer-1865.jpg',
    'antigua',
    { es: 'Pompeya, Imperio Romano', en: 'Pompeii, Roman Empire', ca: 'Pompeia, Imperi Romà' },
    { es: '79 d. C. (destrucción por la erupción del Vesubio)', en: 'AD 79 (destroyed by the eruption of Vesuvius)', ca: '79 dC (destrucció per l\'erupció del Vesuvi)' },
    {
      es: 'El foro de Pompeya, con el Vesubio al fondo. La ciudad romana quedó sepultada por la erupción del volcán en el año 79 d. C. Esta fotografía la tomó Giorgio Sommer en 1865, durante las primeras grandes excavaciones —casi 1800 años después de la erupción que retrata.',
      en: 'The forum of Pompeii, with Vesuvius in the background. The Roman city was buried by the volcano\'s eruption in AD 79. This photograph was taken by Giorgio Sommer in 1865, during the first major excavations — almost 1,800 years after the eruption it depicts.',
      ca: 'El fòrum de Pompeia, amb el Vesuvi al fons. La ciutat romana va quedar sepultada per l\'erupció del volcà l\'any 79 dC. Aquesta fotografia la va fer Giorgio Sommer el 1865, durant les primeres grans excavacions —gairebé 1800 anys després de l\'erupció que retrata.',
    },
    'Giorgio Sommer, 1865 — Städel Museum, dominio público (fotógrafo fallecido en 1914, obra publicada antes de 1931)',
    '🏛️',
  ),
  foto(
    'edad-media-bayeux',
    '/games/epocas/tapiz-bayeux-eduardo.jpg',
    'edad-media',
    { es: 'Tapiz de Bayeux — Eduardo el Confesor', en: 'Bayeux Tapestry — Edward the Confessor', ca: 'Tapís de Bayeux — Eduard el Confessor' },
    { es: 'hacia 1064–1066 (escena); tapiz bordado hacia 1070–1080', en: 'c. 1064–1066 (scene); tapestry embroidered c. 1070–1080', ca: 'cap al 1064–1066 (escena); tapís brodat cap al 1070–1080' },
    {
      es: 'Escena inicial del Tapiz de Bayeux: el rey Eduardo el Confesor, sentado en el trono, recibe a Harold Godwinson. Narra los hechos que llevaron a la conquista normanda de Inglaterra en 1066. El tapiz se bordó pocos años después, hacia 1070–1080, en pleno inicio de la Edad Media feudal.',
      en: 'Opening scene of the Bayeux Tapestry: King Edward the Confessor, enthroned, receives Harold Godwinson. It narrates the events leading to the Norman conquest of England in 1066. The tapestry was embroidered a few years later, around 1070–1080, at the start of the feudal Middle Ages.',
      ca: 'Escena inicial del Tapís de Bayeux: el rei Eduard el Confessor, assegut al tron, rep Harold Godwinson. Narra els fets que van portar a la conquesta normanda d\'Anglaterra el 1066. El tapís es va brodar pocs anys després, cap al 1070–1080, en ple inici de l\'Edat Mitjana feudal.',
    },
    'Fotografía de Myrabella, 2013 — publicada en dominio público en Wikimedia Commons',
    '🧵',
  ),
  foto(
    'edad-media-tres-ricas-horas',
    '/games/epocas/tres-ricas-horas-junio.jpg',
    'edad-media',
    { es: 'Vida campesina medieval — Très Riches Heures', en: 'Medieval peasant life — Très Riches Heures', ca: 'Vida pagesa medieval — Très Riches Heures' },
    { es: 'hacia 1412–1416', en: 'c. 1412–1416', ca: 'cap al 1412–1416' },
    {
      es: 'Página del mes de junio del "Très Riches Heures du Duc de Berry": campesinos siegan heno junto al Sena, con el Palacio de la Cité y la Sainte-Chapelle de París al fondo. Es una miniatura pintada hacia 1412–1416, en la Baja Edad Media.',
      en: 'The June page of the "Très Riches Heures du Duc de Berry": peasants harvesting hay by the Seine, with the Palais de la Cité and Sainte-Chapelle in Paris in the background. It is a miniature painted around 1412–1416, in the late Middle Ages.',
      ca: 'Pàgina del mes de juny del "Très Riches Heures du Duc de Berry": pagesos dallant fenc vora el Sena, amb el Palau de la Cité i la Sainte-Chapelle de París al fons. És una miniatura pintada cap al 1412–1416, a la Baixa Edat Mitjana.',
    },
    'Hermanos Limbourg, hacia 1412–1416 — Museo Condé, Chantilly, dominio público',
    '🌾',
  ),
  foto(
    'edad-moderna-colon',
    '/games/epocas/colon-desembarco-1847.jpg',
    'edad-moderna',
    { es: 'Llegada de Colón a América', en: "Columbus's arrival in America", ca: 'Arribada de Colom a Amèrica' },
    { es: '12 de octubre de 1492', en: '12 October 1492', ca: '12 d\'octubre de 1492' },
    {
      es: 'Cristóbal Colón desembarca en Guanahaní (San Salvador) el 12 de octubre de 1492, el año que abre la Edad Moderna. El cuadro en sí lo pintó John Vanderlyn en 1847 —más de 350 años después—, así que lo que hay que marcar es cuándo ocurrió la escena, no cuándo se pintó el cuadro.',
      en: "Christopher Columbus lands at Guanahani (San Salvador) on 12 October 1492, the year that opens the Early Modern period. The painting itself was made by John Vanderlyn in 1847 — more than 350 years later — so what counts is when the scene happened, not when the painting was made.",
      ca: 'Cristòfor Colom desembarca a Guanahani (San Salvador) el 12 d\'octubre de 1492, l\'any que obre l\'Edat Moderna. El quadre en si el va pintar John Vanderlyn el 1847 —més de 350 anys després—, així que el que cal marcar és quan va passar l\'escena, no pas quan es va pintar el quadre.',
    },
    'John Vanderlyn, 1847 — Rotonda del Capitolio de EE. UU. (Architect of the Capitol), dominio público',
    '🚢',
  ),
  foto(
    'edad-moderna-isabel',
    '/games/epocas/isabel-catolica-retrato.jpg',
    'edad-moderna',
    { es: 'Isabel la Católica, reina de Castilla', en: 'Isabella I of Castile', ca: 'Isabel la Catòlica, reina de Castella' },
    { es: 'hacia 1500–1504 (retrato pintado en vida de la reina)', en: "c. 1500–1504 (portrait painted during the queen's lifetime)", ca: 'cap al 1500–1504 (retrat pintat en vida de la reina)' },
    {
      es: 'Retrato de Isabel la Católica pintado por Juan de Flandes, pintor de corte de la reina, hacia 1500–1504 —en vida de la propia reina—. Isabel y Fernando, los Reyes Católicos, gobernaron en los años en que arrancó la Edad Moderna, con la toma de Granada y la llegada de Colón a América en 1492.',
      en: "Portrait of Isabella I of Castile painted by Juan de Flandes, the queen's court painter, around 1500–1504 — during the queen's own lifetime. Isabella and Ferdinand, the Catholic Monarchs, ruled in the years that opened the Early Modern period, with the fall of Granada and Columbus's arrival in America in 1492.",
      ca: 'Retrat d\'Isabel la Catòlica pintat per Joan de Flandes, pintor de cort de la reina, cap al 1500–1504 —en vida de la mateixa reina—. Isabel i Ferran, els Reis Catòlics, van governar en els anys que van obrir l\'Edat Moderna, amb la presa de Granada i l\'arribada de Colom a Amèrica el 1492.',
    },
    'Juan de Flandes, hacia 1500–1504 — Palacio Real de Madrid, dominio público',
    '👑',
  ),
  foto(
    'contemporanea-bastilla',
    '/games/epocas/toma-bastilla-1789.jpg',
    'contemporanea',
    { es: 'Toma de la Bastilla — Revolución Francesa', en: 'Storming of the Bastille — French Revolution', ca: 'Presa de la Bastilla — Revolució Francesa' },
    { es: '14 de julio de 1789', en: '14 July 1789', ca: '14 de juliol de 1789' },
    {
      es: 'La toma de la Bastilla, en París, el 14 de julio de 1789: el inicio de la Revolución Francesa y, con ella, de la Edad Contemporánea. Esta acuarela la pintó el propio Jean-Pierre Houël en 1789, el mismo año de los hechos.',
      en: 'The storming of the Bastille, in Paris, on 14 July 1789: the start of the French Revolution and, with it, of the Contemporary Age. This watercolour was painted by Jean-Pierre Houël himself in 1789, the very year of the events.',
      ca: 'La presa de la Bastilla, a París, el 14 de juliol de 1789: l\'inici de la Revolució Francesa i, amb ella, de l\'Edat Contemporània. Aquesta aquarel·la la va pintar el mateix Jean-Pierre Houël el 1789, el mateix any dels fets.',
    },
    'Jean-Pierre Houël, 1789 — Bibliothèque nationale de France, dominio público',
    '🏰',
  ),
  foto(
    'antigua-anfora-exekias',
    '/games/epocas/antigua-anfora-exekias.jpg',
    'antigua',
    { es: 'Cerámica griega — Grecia Arcaica', en: 'Greek pottery — Archaic Greece', ca: 'Ceràmica grega — Grècia Arcaica' },
    { es: 'hacia 540 a. C.', en: 'c. 540 BC', ca: 'cap al 540 aC' },
    {
      es: 'Ánfora ática de figuras negras, con una escena de un carro tirado por caballos. La técnica de "figuras negras" —siluetas oscuras sobre el barro anaranjado— fue la forma dominante de decorar cerámica en la Grecia Arcaica, antes de que los griegos pasaran a las "figuras rojas" a finales del siglo VI a. C.',
      en: 'Attic black-figure amphora, showing a horse-drawn chariot scene. The "black-figure" technique — dark silhouettes over the orange clay — was the dominant way of decorating pottery in Archaic Greece, before Greek potters switched to "red-figure" in the late 6th century BC.',
      ca: 'Àmfora àtica de figures negres, amb una escena d\'un carro tirat per cavalls. La tècnica de "figures negres" —siluetes fosques sobre el fang taronja— va ser la forma dominant de decorar ceràmica a la Grècia Arcaica, abans que els grecs passessin a les "figures roges" a finals del segle VI aC.',
    },
    'Atribuida a Exekias, hacia 540 a. C. — The Metropolitan Museum of Art, Open Access (CC0)',
    '🏺',
  ),
  foto(
    'antigua-augusto',
    '/games/epocas/antigua-augusto-busto.jpg',
    'antigua',
    { es: 'Retrato del emperador Augusto — Imperio Romano', en: 'Portrait of the emperor Augustus — Roman Empire', ca: 'Retrat de l\'emperador August — Imperi Romà' },
    { es: 'hacia 14–37 d. C.', en: 'c. AD 14–37', ca: 'cap al 14–37 dC' },
    {
      es: 'Retrato en mármol del emperador Augusto, el primer emperador romano, tallado poco después de su muerte, durante el reinado de su sucesor Tiberio. Estos retratos oficiales —siempre con el mismo rostro idealizado y joven— se repetían por todo el imperio para que la gente supiera quién gobernaba, aunque nunca lo hubiera visto en persona.',
      en: 'Marble portrait of the emperor Augustus, the first Roman emperor, carved shortly after his death, during the reign of his successor Tiberius. These official portraits — always with the same idealised, youthful face — were repeated across the empire so people would know who ruled, even if they never saw him in person.',
      ca: 'Retrat en marbre de l\'emperador August, el primer emperador romà, tallat poc després de la seva mort, durant el regnat del seu successor Tiberi. Aquests retrats oficials —sempre amb el mateix rostre idealitzat i jove— es repetien per tot l\'imperi perquè la gent sabés qui governava, encara que mai no l\'hagués vist en persona.',
    },
    'Escultor romano, hacia 14–37 d. C. — The Metropolitan Museum of Art, Open Access (CC0)',
    '🦅',
  ),
  foto(
    'antigua-piramide-giza',
    '/games/epocas/antigua-piramide-giza.jpg',
    'antigua',
    { es: 'Gran Pirámide de Guiza — Antiguo Egipto', en: 'Great Pyramid of Giza — Ancient Egypt', ca: 'Gran Piràmide de Giza — Antic Egipte' },
    { es: 'hacia 2560 a. C. (construcción)', en: 'c. 2560 BC (construction)', ca: 'cap al 2560 aC (construcció)' },
    {
      es: 'La Gran Pirámide de Guiza, construida hacia el 2560 a. C. como tumba del faraón Keops —más de mil años antes que Tutankamón—. Es la única de las Siete Maravillas del Mundo Antiguo que sigue en pie hoy. Esta fotografía es de 1912, pero la pirámide misma es del Antiguo Egipto, no del siglo XX.',
      en: 'The Great Pyramid of Giza, built around 2560 BC as the tomb of pharaoh Khufu — more than a thousand years before Tutankhamun. It is the only one of the Seven Wonders of the Ancient World still standing today. This photograph dates from 1912, but the pyramid itself belongs to Ancient Egypt, not the 20th century.',
      ca: 'La Gran Piràmide de Giza, construïda cap al 2560 aC com a tomba del faraó Kheops —més de mil anys abans que Tutankamon—. És l\'única de les Set Meravelles del Món Antic que encara es manté dreta avui. Aquesta fotografia és del 1912, però la piràmide mateixa és de l\'Antic Egipte, no pas del segle XX.',
    },
    'Underwood & Underwood, 1912 — Library of Congress, dominio público',
    '🐫',
  ),
  foto(
    'antigua-coliseo',
    '/games/epocas/antigua-coliseo-roma.jpg',
    'antigua',
    { es: 'Coliseo de Roma — Imperio Romano', en: 'Colosseum, Rome — Roman Empire', ca: 'Colosseu de Roma — Imperi Romà' },
    { es: 'hacia 70–80 d. C. (construcción)', en: 'c. AD 70–80 (construction)', ca: 'cap al 70–80 dC (construcció)' },
    {
      es: 'El Coliseo de Roma, construido entre los años 70 y 80 d. C. bajo los emperadores Vespasiano y Tito, el mayor anfiteatro jamás construido en el Imperio Romano. Esta fotografía en color es de entre 1890 y 1900, pero el edificio que retrata lleva en pie casi dos mil años.',
      en: 'The Colosseum in Rome, built between AD 70 and 80 under the emperors Vespasian and Titus, the largest amphitheatre ever built in the Roman Empire. This colour photograph dates from between 1890 and 1900, but the building it shows has been standing for nearly two thousand years.',
      ca: 'El Colosseu de Roma, construït entre els anys 70 i 80 dC sota els emperadors Vespasià i Titus, el més gran amfiteatre mai construït a l\'Imperi Romà. Aquesta fotografia en color és d\'entre el 1890 i el 1900, però l\'edifici que retrata fa gairebé dos mil anys que està dret.',
    },
    'Photochrom Print Collection, hacia 1890–1900 — Library of Congress, dominio público',
    '🏟️',
  ),
  foto(
    'edad-media-alhambra',
    '/games/epocas/edad-media-alhambra.jpg',
    'edad-media',
    { es: 'La Alhambra de Granada — Reino nazarí', en: 'The Alhambra, Granada — Nasrid Kingdom', ca: 'L\'Alhambra de Granada — Regne nassarita' },
    { es: 'hacia 1238–1358 (construcción del palacio nazarí)', en: 'c. 1238–1358 (construction of the Nasrid palace)', ca: 'cap al 1238–1358 (construcció del palau nassarita)' },
    {
      es: 'La Alhambra de Granada, palacio y fortaleza del reino nazarí, el último reino musulmán de la península ibérica, construido entre los siglos XIII y XIV. Esta fotografía es de hacia 1890, pero el edificio es de la Edad Media, siglos antes de que los Reyes Católicos tomaran Granada en 1492.',
      en: 'The Alhambra of Granada, palace and fortress of the Nasrid kingdom, the last Muslim kingdom on the Iberian Peninsula, built between the 13th and 14th centuries. This photograph dates from around 1890, but the building is medieval, centuries before the Catholic Monarchs took Granada in 1492.',
      ca: 'L\'Alhambra de Granada, palau i fortalesa del regne nassarita, l\'últim regne musulmà de la península Ibèrica, construït entre els segles XIII i XIV. Aquesta fotografia és d\'aproximadament el 1890, però l\'edifici és medieval, segles abans que els Reis Catòlics prenguessin Granada el 1492.',
    },
    'Rafael Garzón, hacia 1890 — Library of Congress, dominio público',
    '🕌',
  ),
  foto(
    'edad-media-krak',
    '/games/epocas/edad-media-krak-castillo.jpg',
    'edad-media',
    { es: 'Krak de los Caballeros — Castillo cruzado', en: 'Krak des Chevaliers — Crusader Castle', ca: 'Krak dels Cavallers — Castell croat' },
    { es: 'hacia 1142–1170 (construcción por los cruzados)', en: 'c. 1142–1170 (built by the Crusaders)', ca: 'cap al 1142–1170 (construcció pels croats)' },
    {
      es: 'El Krak de los Caballeros, en la actual Siria, uno de los castillos cruzados mejor conservados del mundo, construido por la Orden de los Hospitalarios a partir de 1142. Esta fotografía es de 1936, pero el castillo es de plena Edad Media, de las Cruzadas.',
      en: 'Krak des Chevaliers, in present-day Syria, one of the best-preserved Crusader castles in the world, built by the Knights Hospitaller from 1142 onward. This photograph dates from 1936, but the castle itself belongs to the height of the Middle Ages, the age of the Crusades.',
      ca: 'El Krak dels Cavallers, a l\'actual Síria, un dels castells croats més ben conservats del món, construït per l\'Orde dels Hospitalers a partir del 1142. Aquesta fotografia és del 1936, però el castell és de plena Edat Mitjana, de les Croades.',
    },
    'Matson Photograph Collection, 1936 — Library of Congress, dominio público',
    '🛡️',
  ),
  foto(
    'edad-moderna-vermeer',
    '/games/epocas/edad-moderna-vermeer.jpg',
    'edad-moderna',
    { es: 'Escena doméstica holandesa — Siglo de Oro neerlandés', en: 'Dutch domestic scene — Dutch Golden Age', ca: 'Escena domèstica holandesa — Segle d\'Or neerlandès' },
    { es: 'hacia 1662', en: 'c. 1662', ca: 'cap al 1662' },
    {
      es: 'Una joven junto a una ventana, pintada por Johannes Vermeer hacia 1662 en Delft. La luz suave, el interior burgués y la ropa de la mujer son típicos del Siglo de Oro neerlandés, cuando las Provincias Unidas eran una potencia comercial y sus pintores retrataban escenas cotidianas de la vida burguesa.',
      en: 'A young woman by a window, painted by Johannes Vermeer around 1662 in Delft. The soft light, bourgeois interior and the woman\'s clothing are typical of the Dutch Golden Age, when the United Provinces were a trading power and their painters depicted everyday scenes of bourgeois life.',
      ca: 'Una jove al costat d\'una finestra, pintada per Johannes Vermeer cap al 1662 a Delft. La llum suau, l\'interior burgès i la roba de la dona són típics del Segle d\'Or neerlandès, quan les Províncies Unides eren una potència comercial i els seus pintors retrataven escenes quotidianes de la vida burgesa.',
    },
    'Johannes Vermeer, hacia 1662 — The Metropolitan Museum of Art, Open Access (CC0)',
    '🖼️',
  ),
  foto(
    'edad-moderna-rembrandt',
    '/games/epocas/edad-moderna-rembrandt.jpg',
    'edad-moderna',
    { es: 'Autorretrato — Siglo de Oro neerlandés', en: 'Self-portrait — Dutch Golden Age', ca: 'Autoretrat — Segle d\'Or neerlandès' },
    { es: '1638', en: '1638', ca: '1638' },
    {
      es: 'Autorretrato de Rembrandt van Rijn, grabado al aguafuerte en 1638, con un gorro de terciopelo y una pluma. Rembrandt se autorretrató casi cien veces a lo largo de su vida —en pintura, grabado y dibujo—, dejando el registro visual más completo que existe de una sola persona en toda la Edad Moderna.',
      en: 'Self-portrait of Rembrandt van Rijn, etched in 1638, wearing a velvet cap and a plume. Rembrandt portrayed himself almost a hundred times over his lifetime — in paintings, etchings and drawings — leaving the most complete visual record of a single person from the entire Early Modern period.',
      ca: 'Autoretrat de Rembrandt van Rijn, gravat a l\'aiguafort el 1638, amb una gorra de vellut i una ploma. Rembrandt es va autoretratar gairebé cent vegades al llarg de la seva vida —en pintura, gravat i dibuix—, deixant el registre visual més complet que existeix d\'una sola persona en tota l\'Edat Moderna.',
    },
    'Rembrandt van Rijn, 1638 — The Metropolitan Museum of Art, Open Access (CC0)',
    '🖌️',
  ),
  foto(
    'contemporanea-migrant-mother',
    '/games/epocas/contemporanea-migrant-mother.jpg',
    'contemporanea',
    { es: 'La Gran Depresión — Estados Unidos', en: 'The Great Depression — United States', ca: 'La Gran Depressió — Estats Units' },
    { es: 'marzo de 1936', en: 'March 1936', ca: 'març de 1936' },
    {
      es: 'Florence Owens Thompson, madre de siete hijos, en un campamento de temporeros en Nipomo, California, durante la Gran Depresión. La fotografió Dorothea Lange en marzo de 1936 para el gobierno de EE. UU., y se convirtió en el retrato más conocido de la pobreza rural de aquellos años.',
      en: 'Florence Owens Thompson, mother of seven, at a migrant farm workers camp in Nipomo, California, during the Great Depression. Photographed by Dorothea Lange in March 1936 for the US government, it became the best-known portrait of rural poverty from those years.',
      ca: 'Florence Owens Thompson, mare de set fills, en un campament de temporers a Nipomo, Califòrnia, durant la Gran Depressió. La va fotografiar Dorothea Lange el març de 1936 per al govern dels EUA, i es va convertir en el retrat més conegut de la pobresa rural d\'aquells anys.',
    },
    'Dorothea Lange, 1936 — Farm Security Administration / Library of Congress, dominio público',
    '😔',
  ),
]
