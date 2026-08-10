// Rocas y Minerales — primaria + ESO. Mismos hechos que la ficha de estudio
// (src/data/fichasEstudiar/rocas-minerales.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('rm-01', 'primaria',
    { es: '¿Cuántos tipos principales de roca hay?', en: 'How many main rock types are there?', ca: 'Quants tipus principals de roca hi ha?' },
    { es: ['2', '3', '4', '5'], en: ['2', '3', '4', '5'], ca: ['2', '3', '4', '5'] },
    { es: '3', en: '3', ca: '3' },
    '⛰️',
    { es: 'Hay tres grandes tipos de roca: ígneas, sedimentarias y metamórficas. Cada una se forma de una manera distinta.', en: 'There are three main rock types: igneous, sedimentary and metamorphic. Each forms in a different way.', ca: 'Hi ha tres grans tipus de roca: ígnies, sedimentàries i metamòrfiques. Cadascuna es forma d\'una manera diferent.' }),

  q('rm-02', 'primaria',
    { es: '¿De dónde vienen las rocas ígneas?', en: 'Where do igneous rocks come from?', ca: 'D\'on vénen les roques ígnies?' },
    { es: ['Del magma o la lava enfriados', 'De restos acumulados en capas', 'De otra roca transformada por calor', 'De los fósiles marinos'], en: ['From cooled magma or lava', 'From remains piled up in layers', 'From another rock transformed by heat', 'From marine fossils'], ca: ['Del magma o la lava refredats', 'De restes acumulades en capes', 'D\'una altra roca transformada per calor', 'Dels fòssils marins'] },
    { es: 'Del magma o la lava enfriados', en: 'From cooled magma or lava', ca: 'Del magma o la lava refredats' },
    '🌋',
    { es: 'Las rocas ígneas se forman cuando el magma o la lava se enfrían y se solidifican. "Ígnea" viene de "ignición", fuego.', en: 'Igneous rocks form when magma or lava cools and solidifies. "Igneous" comes from "ignis", fire.', ca: 'Les roques ígnies es formen quan el magma o la lava es refreden i es solidifiquen. "Ígnia" ve d\'"ignició", foc.' }),

  q('rm-03', 'primaria',
    { es: '¿Qué roca ígnea tiene cristales grandes porque se enfrió despacio?', en: 'Which igneous rock has large crystals because it cooled slowly?', ca: 'Quina roca ígnia té cristalls grans perquè es va refredar a poc a poc?' },
    { es: ['El granito', 'El basalto', 'La caliza', 'La pizarra'], en: ['Granite', 'Basalt', 'Limestone', 'Slate'], ca: ['El granit', 'El basalt', 'La calcària', 'La pissarra'] },
    { es: 'El granito', en: 'Granite', ca: 'El granit' },
    '⛰️',
    { es: 'El granito se enfría despacio bajo tierra, lo que le da tiempo a formar cristales grandes y visibles.', en: 'Granite cools slowly underground, giving it time to form large, visible crystals.', ca: 'El granit es refreda a poc a poc sota terra, la qual cosa li dóna temps a formar cristalls grans i visibles.' }),

  q('rm-04', 'primaria',
    { es: '¿Qué roca ígnea tiene cristales pequeños porque se enfrió rápido?', en: 'Which igneous rock has tiny crystals because it cooled fast?', ca: 'Quina roca ígnia té cristalls petits perquè es va refredar ràpid?' },
    { es: ['El basalto', 'El granito', 'El mármol', 'La arenisca'], en: ['Basalt', 'Granite', 'Marble', 'Sandstone'], ca: ['El basalt', 'El granit', 'El marbre', 'El gres'] },
    { es: 'El basalto', en: 'Basalt', ca: 'El basalt' },
    '🌑',
    { es: 'El basalto se forma de lava que se enfría muy rápido en la superficie, por lo que no da tiempo a formar cristales grandes.', en: 'Basalt forms from lava that cools very quickly on the surface, so there is no time for large crystals to form.', ca: 'El basalt es forma de lava que es refreda molt ràpid a la superfície, per la qual cosa no dóna temps a formar cristalls grans.' }),

  q('rm-05', 'primaria',
    { es: '¿Cómo se forman las rocas sedimentarias?', en: 'How do sedimentary rocks form?', ca: 'Com es formen les roques sedimentàries?' },
    { es: ['Por acumulación de restos y partículas, capa a capa', 'Por enfriamiento del magma', 'Por calor y presión sobre otra roca', 'Por erupciones volcánicas'], en: ['By build-up of remains and particles, layer by layer', 'By magma cooling', 'By heat and pressure on another rock', 'By volcanic eruptions'], ca: ['Per acumulació de restes i partícules, capa a capa', 'Pel refredament del magma', 'Per calor i pressió sobre una altra roca', 'Per erupcions volcàniques'] },
    { es: 'Por acumulación de restos y partículas, capa a capa', en: 'By build-up of remains and particles, layer by layer', ca: 'Per acumulació de restes i partícules, capa a capa' },
    '🏖️',
    { es: 'Las rocas sedimentarias, como la caliza o la arenisca, se forman capa a capa por la acumulación de sedimentos, muchas veces en el fondo del mar.', en: 'Sedimentary rocks, like limestone or sandstone, form layer by layer as sediments build up, often on the seafloor.', ca: 'Les roques sedimentàries, com la calcària o el gres, es formen capa a capa per l\'acumulació de sediments, moltes vegades al fons del mar.' }),

  q('rm-06', 'primaria',
    { es: '¿El cuarzo es una roca o un mineral?', en: 'Is quartz a rock or a mineral?', ca: 'El quars és una roca o un mineral?' },
    { es: ['Un mineral', 'Una roca', 'Ninguna de las dos cosas', 'Un tipo de fósil'], en: ['A mineral', 'A rock', 'Neither', 'A type of fossil'], ca: ['Un mineral', 'Una roca', 'Cap de les dues coses', 'Un tipus de fòssil'] },
    { es: 'Un mineral', en: 'A mineral', ca: 'Un mineral' },
    '💎',
    { es: 'El cuarzo es un mineral: una sustancia pura con su propia composición. Una roca, en cambio, suele ser una mezcla de varios minerales.', en: 'Quartz is a mineral: a pure substance with its own composition. A rock, by contrast, is usually a mixture of several minerals.', ca: 'El quars és un mineral: una substància pura amb la seva pròpia composició. Una roca, en canvi, sol ser una barreja de diversos minerals.' }),

  q('rm-07', 'primaria',
    { es: '¿Qué roca metamórfica se forma a partir de la caliza?', en: 'Which metamorphic rock forms from limestone?', ca: 'Quina roca metamòrfica es forma a partir de la calcària?' },
    { es: ['El mármol', 'La pizarra', 'El granito', 'El basalto'], en: ['Marble', 'Slate', 'Granite', 'Basalt'], ca: ['El marbre', 'La pissarra', 'El granit', 'El basalt'] },
    { es: 'El mármol', en: 'Marble', ca: 'El marbre' },
    '🏛️',
    { es: 'El mármol nace cuando la caliza (una roca sedimentaria) se transforma por el calor y la presión — un proceso llamado metamorfismo.', en: 'Marble forms when limestone (a sedimentary rock) is transformed by heat and pressure — a process called metamorphism.', ca: 'El marbre neix quan la calcària (una roca sedimentària) es transforma per la calor i la pressió — un procés anomenat metamorfisme.' }),

  q('rm-08', 'primaria',
    { es: '¿Qué palabra describe el proceso por el que una roca se transforma en otra con calor y presión?', en: 'What word describes the process by which one rock is transformed into another by heat and pressure?', ca: 'Quina paraula descriu el procés pel qual una roca es transforma en una altra amb calor i pressió?' },
    { es: ['Metamorfismo', 'Erosión', 'Sedimentación', 'Cristalización'], en: ['Metamorphism', 'Erosion', 'Sedimentation', 'Crystallisation'], ca: ['Metamorfisme', 'Erosió', 'Sedimentació', 'Cristal·lització'] },
    { es: 'Metamorfismo', en: 'Metamorphism', ca: 'Metamorfisme' },
    '🔥',
    { es: 'El metamorfismo ("metamorfosis", cambio) es el proceso por el que el calor y la presión transforman una roca en otra: la caliza se vuelve mármol, la arcilla se vuelve pizarra.', en: 'Metamorphism ("metamorphosis", change) is the process by which heat and pressure transform one rock into another: limestone becomes marble, clay becomes slate.', ca: 'El metamorfisme ("metamorfosi", canvi) és el procés pel qual la calor i la pressió transformen una roca en una altra: la calcària es torna marbre, l\'argila es torna pissarra.' }),

  // ── ESO: además de lo anterior, más matices sobre origen y composición ──
  q('rm-09', 'eso',
    { es: '¿Cuál es la diferencia esencial entre un mineral y una roca?', en: 'What is the essential difference between a mineral and a rock?', ca: 'Quina és la diferència essencial entre un mineral i una roca?' },
    { es: ['El mineral es una sustancia pura; la roca suele ser una mezcla de minerales', 'El mineral es blando y la roca es dura', 'El mineral viene del mar y la roca de la tierra', 'No hay ninguna diferencia real'], en: ['A mineral is a pure substance; a rock is usually a mixture of minerals', 'Minerals are soft and rocks are hard', 'Minerals come from the sea and rocks from land', 'There is no real difference'], ca: ['El mineral és una substància pura; la roca sol ser una barreja de minerals', 'El mineral és tou i la roca és dura', 'El mineral ve del mar i la roca de la terra', 'No hi ha cap diferència real'] },
    { es: 'El mineral es una sustancia pura; la roca suele ser una mezcla de minerales', en: 'A mineral is a pure substance; a rock is usually a mixture of minerals', ca: 'El mineral és una substància pura; la roca sol ser una barreja de minerals' },
    '🧩',
    { es: 'Un mineral tiene una composición química propia y definida (como el cuarzo); una roca es, casi siempre, una mezcla de varios minerales distintos.', en: 'A mineral has its own defined chemical composition (like quartz); a rock is almost always a mixture of several different minerals.', ca: 'Un mineral té una composició química pròpia i definida (com el quars); una roca és, gairebé sempre, una barreja de diversos minerals diferents.' }),

  q('rm-10', 'eso',
    { es: '¿Qué roca sedimentaria suele contener fósiles?', en: 'Which sedimentary rock often contains fossils?', ca: 'Quina roca sedimentària sol contenir fòssils?' },
    { es: ['La caliza', 'El granito', 'El basalto', 'El mármol'], en: ['Limestone', 'Granite', 'Basalt', 'Marble'], ca: ['La calcària', 'El granit', 'El basalt', 'El marbre'] },
    { es: 'La caliza', en: 'Limestone', ca: 'La calcària' },
    '🐚',
    { es: 'La caliza, formada por acumulación de sedimentos en el fondo del mar, contiene con frecuencia fósiles de organismos marinos.', en: 'Limestone, formed by sediment build-up on the seafloor, frequently contains fossils of marine organisms.', ca: 'La calcària, formada per acumulació de sediments al fons del mar, conté sovint fòssils d\'organismes marins.' }),

  q('rm-11', 'eso',
    { es: '¿De qué roca sedimentaria se origina la pizarra por metamorfismo?', en: 'Which sedimentary rock does slate originate from through metamorphism?', ca: 'De quina roca sedimentària s\'origina la pissarra per metamorfisme?' },
    { es: ['De la arcilla', 'De la caliza', 'Del granito', 'Del basalto'], en: ['From clay', 'From limestone', 'From granite', 'From basalt'], ca: ['De l\'argila', 'De la calcària', 'Del granit', 'Del basalt'] },
    { es: 'De la arcilla', en: 'From clay', ca: 'De l\'argila' },
    '📚',
    { es: 'La pizarra se forma cuando la arcilla se ve sometida a calor y presión — el mismo proceso de metamorfismo que convierte la caliza en mármol.', en: 'Slate forms when clay is subjected to heat and pressure — the same metamorphic process that turns limestone into marble.', ca: 'La pissarra es forma quan l\'argila se sotmet a calor i pressió — el mateix procés de metamorfisme que converteix la calcària en marbre.' }),

  q('rm-12', 'eso',
    { es: '¿Qué indica que una roca ígnea tenga cristales grandes y visibles?', en: 'What does it indicate when an igneous rock has large, visible crystals?', ca: 'Què indica que una roca ígnia tingui cristalls grans i visibles?' },
    { es: ['Que se enfrió despacio, normalmente bajo tierra', 'Que se formó en el fondo del mar', 'Que contiene fósiles', 'Que es un mineral puro'], en: ['That it cooled slowly, usually underground', 'That it formed on the seafloor', 'That it contains fossils', 'That it is a pure mineral'], ca: ['Que es va refredar a poc a poc, normalment sota terra', 'Que es va formar al fons del mar', 'Que conté fòssils', 'Que és un mineral pur'] },
    { es: 'Que se enfrió despacio, normalmente bajo tierra', en: 'That it cooled slowly, usually underground', ca: 'Que es va refredar a poc a poc, normalment sota terra' },
    '🔍',
    { es: 'Cuanto más despacio se enfría el magma, más tiempo tienen los cristales para crecer: por eso el granito, que se enfría bajo tierra, tiene cristales grandes, y el basalto, que se enfría en superficie, los tiene diminutos.', en: 'The slower magma cools, the more time crystals have to grow: that is why granite, which cools underground, has large crystals, while basalt, which cools at the surface, has tiny ones.', ca: 'Com més a poc a poc es refreda el magma, més temps tenen els cristalls per créixer: per això el granit, que es refreda sota terra, té cristalls grans, i el basalt, que es refreda en superfície, els té diminuts.' }),

  q('rm-13', 'eso',
    { es: '¿Por qué el cuarzo es uno de los minerales más comunes de la corteza terrestre?', en: 'Why is quartz one of the most common minerals in the Earth\'s crust?', ca: 'Per què el quars és un dels minerals més comuns de l\'escorça terrestre?' },
    { es: ['Es muy duro y resistente a la erosión', 'Se forma solo en volcanes', 'Solo existe en el fondo del mar', 'Es el mineral más blando que existe'], en: ['It is very hard and resistant to erosion', 'It only forms in volcanoes', 'It only exists on the seafloor', 'It is the softest mineral there is'], ca: ['És molt dur i resistent a l\'erosió', 'Només es forma en volcans', 'Només existeix al fons del mar', 'És el mineral més tou que existeix'] },
    { es: 'Es muy duro y resistente a la erosión', en: 'It is very hard and resistant to erosion', ca: 'És molt dur i resistent a l\'erosió' },
    '💠',
    { es: 'El cuarzo es uno de los minerales más duros y resistentes que existen, lo que hace que perdure mucho tiempo en la corteza terrestre en vez de erosionarse y desaparecer.', en: 'Quartz is one of the hardest and most resistant minerals there is, which means it endures for a long time in the Earth\'s crust instead of eroding away.', ca: 'El quars és un dels minerals més durs i resistents que existeixen, la qual cosa fa que perduri molt de temps a l\'escorça terrestre en lloc d\'erosionar-se i desaparèixer.' }),

  q('rm-14', 'eso',
    { es: '¿Qué tienen en común el granito y el basalto?', en: 'What do granite and basalt have in common?', ca: 'Què tenen en comú el granit i el basalt?' },
    { es: ['Los dos son rocas ígneas', 'Los dos son rocas sedimentarias', 'Los dos contienen fósiles', 'Los dos son minerales puros'], en: ['Both are igneous rocks', 'Both are sedimentary rocks', 'Both contain fossils', 'Both are pure minerals'], ca: ['Els dos són roques ígnies', 'Els dos són roques sedimentàries', 'Els dos contenen fòssils', 'Els dos són minerals purs'] },
    { es: 'Los dos son rocas ígneas', en: 'Both are igneous rocks', ca: 'Els dos són roques ígnies' },
    '🌋',
    { es: 'Granito y basalto son ambos rocas ígneas: se diferencian en la velocidad de enfriamiento (lenta y bajo tierra el granito, rápida y en superficie el basalto), no en su origen.', en: 'Granite and basalt are both igneous rocks: they differ in cooling speed (slow and underground for granite, fast and at the surface for basalt), not in their origin.', ca: 'Granit i basalt són tots dos roques ígnies: es diferencien en la velocitat de refredament (lenta i sota terra el granit, ràpida i en superfície el basalt), no en el seu origen.' }),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
