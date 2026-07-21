// Ciclos y procesos científicos para el examen de orden (antes/después).
// Mismo mecanismo que la Línea Temporal de Historia, pero en vez de años se
// ordena por `orden` (posición 1..N dentro del ciclo/proceso).
//
// Cada ciclo vive DENTRO de un tema existente de Ciencias (no tiene sección
// propia): `home` es el id del tema de QuimicaIndex/QuimicaTema que lo aloja
// (p. ej. 'estados-materia', 'celula'...). `niveles` es para qué cursos tiene
// sentido este ciclo — se usa para el chip informativo en QuimicaTema y para
// que el tema anfitrión declare el nivel más alto que ofrece.
//
// Los ciclos no tienen un "inicio" real (son un bucle), así que fijamos un
// punto de corte convencional: `orden: 1` es el paso que los libros de texto
// suelen usar como arranque, y el examen representa una única vuelta lineal
// desde ahí. Eso evita la ambigüedad de "¿esto va antes o después?" sin
// necesidad de aceptar dos posiciones como válidas para la misma carta.
//
// `cerrado: true` marca los procesos que de verdad se repiten en bucle (agua,
// Krebs, Calvin, nitrógeno, rocas, célula) — ahí el examen avisa de que
// empezamos a contar convencionalmente desde el paso 1. Los que no son un
// bucle real (p. ej. la metamorfosis) van con `cerrado: false` y no necesitan
// ese aviso.
//
// Cada ciclo: { label, emoji, gradient, descripcion, home, niveles, cerrado, pasos: [...] }
// Cada paso:  { id, orden, dificultad, nombre, descripcion }
// nombre/descripcion siguen el patrón nuevo: tr({ es, en, ca }).

export const CICLOS = {
  'ciclo-agua': {
    label: { es: 'Ciclo del Agua', en: 'Water Cycle', ca: "Cicle de l'Aigua" },
    emoji: '💧',
    gradient: 'from-blue-500 to-cyan-600',
    home: 'estados-materia',
    niveles: ['primaria', 'eso'],
    cerrado: true,
    descripcion: {
      es: 'El agua circula sin parar entre la atmósfera, la superficie y el subsuelo.',
      en: 'Water keeps circulating between the atmosphere, the surface and the ground.',
      ca: "L'aigua circula sense parar entre l'atmosfera, la superfície i el subsòl.",
    },
    pasos: [
      { id: 'agua_01', orden: 1, dificultad: 'fácil',
        nombre: { es: 'Evaporación', en: 'Evaporation', ca: 'Evaporació' },
        descripcion: { es: 'El calor del Sol convierte el agua de mares, ríos y lagos en vapor que sube a la atmósfera.', en: "The Sun's heat turns water from seas, rivers and lakes into vapour that rises into the atmosphere.", ca: "La calor del Sol converteix l'aigua de mars, rius i llacs en vapor que puja a l'atmosfera." } },
      { id: 'agua_02', orden: 2, dificultad: 'fácil',
        nombre: { es: 'Condensación', en: 'Condensation', ca: 'Condensació' },
        descripcion: { es: 'El vapor de agua se enfría al subir y se convierte en pequeñas gotas que forman las nubes.', en: 'Water vapour cools as it rises and turns into tiny droplets that form clouds.', ca: "El vapor d'aigua es refreda en pujar i es converteix en petites gotes que formen els núvols." } },
      { id: 'agua_03', orden: 3, dificultad: 'fácil',
        nombre: { es: 'Precipitación', en: 'Precipitation', ca: 'Precipitació' },
        descripcion: { es: 'Cuando las gotas de las nubes pesan demasiado, caen en forma de lluvia, nieve o granizo.', en: 'When the droplets in the clouds get too heavy, they fall as rain, snow or hail.', ca: 'Quan les gotes dels núvols pesen massa, cauen en forma de pluja, neu o calamarsa.' } },
      { id: 'agua_04', orden: 4, dificultad: 'medio',
        nombre: { es: 'Escorrentía', en: 'Runoff', ca: 'Escolament' },
        descripcion: { es: 'El agua que ha caído corre por la superficie del terreno hasta llegar a ríos, lagos y mares.', en: 'The water that has fallen flows over the land until it reaches rivers, lakes and seas.', ca: "L'aigua que ha caigut corre per la superfície del terreny fins arribar a rius, llacs i mars." } },
      { id: 'agua_05', orden: 5, dificultad: 'medio',
        nombre: { es: 'Infiltración', en: 'Infiltration', ca: 'Infiltració' },
        descripcion: { es: 'Otra parte del agua se filtra por el suelo y alimenta los acuíferos subterráneos, que devuelven agua a ríos y mares.', en: 'Another part of the water seeps into the ground and feeds underground aquifers, which return water to rivers and seas.', ca: "Una altra part de l'aigua es filtra pel sòl i alimenta els aqüífers subterranis, que retornen aigua a rius i mars." } },
    ],
  },

  'ciclo-krebs': {
    label: { es: 'Ciclo de Krebs', en: 'Krebs Cycle', ca: 'Cicle de Krebs' },
    emoji: '🧬',
    gradient: 'from-rose-500 to-red-700',
    home: 'celula',
    niveles: ['bachillerato'],
    cerrado: true,
    descripcion: {
      es: 'La ruta metabólica que extrae energía del Acetil-CoA en la mitocondria.',
      en: 'The metabolic pathway that extracts energy from Acetyl-CoA in the mitochondria.',
      ca: 'La ruta metabòlica que extreu energia de l\'Acetil-CoA al mitocondri.',
    },
    pasos: [
      { id: 'krebs_01', orden: 1, dificultad: 'difícil',
        nombre: { es: 'Formación de citrato', en: 'Citrate formation', ca: 'Formació de citrat' },
        descripcion: { es: 'El Acetil-CoA se une al oxalacetato (4C) para formar citrato (6C), el punto de partida del ciclo.', en: 'Acetyl-CoA joins oxaloacetate (4C) to form citrate (6C), the starting point of the cycle.', ca: "L'Acetil-CoA s'uneix a l'oxalacetat (4C) per formar citrat (6C), el punt de partida del cicle." } },
      { id: 'krebs_02', orden: 2, dificultad: 'difícil',
        nombre: { es: 'Isomerización a isocitrato', en: 'Isomerisation to isocitrate', ca: 'Isomerització a isocitrat' },
        descripcion: { es: 'El citrato se reordena en isocitrato, una forma más fácil de oxidar en el siguiente paso.', en: 'Citrate rearranges into isocitrate, a form that is easier to oxidise in the next step.', ca: 'El citrat es reordena en isocitrat, una forma més fàcil d\'oxidar en el pas següent.' } },
      { id: 'krebs_03', orden: 3, dificultad: 'difícil',
        nombre: { es: 'Primera descarboxilación oxidativa', en: 'First oxidative decarboxylation', ca: 'Primera descarboxilació oxidativa' },
        descripcion: { es: 'El isocitrato pierde un CO2 y se transforma en α-cetoglutarato, generando la primera molécula de NADH.', en: 'Isocitrate loses a CO2 and becomes α-ketoglutarate, generating the first NADH molecule.', ca: "L'isocitrat perd un CO2 i es transforma en α-cetoglutarat, generant la primera molècula de NADH." } },
      { id: 'krebs_04', orden: 4, dificultad: 'difícil',
        nombre: { es: 'Segunda descarboxilación oxidativa', en: 'Second oxidative decarboxylation', ca: 'Segona descarboxilació oxidativa' },
        descripcion: { es: 'El α-cetoglutarato pierde otro CO2 y forma succinil-CoA, generando una segunda molécula de NADH.', en: 'α-Ketoglutarate loses another CO2 and forms succinyl-CoA, generating a second NADH molecule.', ca: "L'α-cetoglutarat perd un altre CO2 i forma succinil-CoA, generant una segona molècula de NADH." } },
      { id: 'krebs_05', orden: 5, dificultad: 'difícil',
        nombre: { es: 'Formación de succinato y GTP', en: 'Succinate and GTP formation', ca: 'Formació de succinat i GTP' },
        descripcion: { es: 'El succinil-CoA se convierte en succinato, liberando energía que se guarda como GTP (equivalente a ATP).', en: 'Succinyl-CoA converts into succinate, releasing energy stored as GTP (equivalent to ATP).', ca: 'El succinil-CoA es converteix en succinat, alliberant energia que es guarda com a GTP (equivalent a ATP).' } },
      { id: 'krebs_06', orden: 6, dificultad: 'difícil',
        nombre: { es: 'Regeneración del oxalacetato', en: 'Oxaloacetate regeneration', ca: "Regeneració de l'oxalacetat" },
        descripcion: { es: 'El succinato pasa por fumarato y malato hasta regenerar el oxalacetato inicial, listo para un nuevo ciclo.', en: 'Succinate passes through fumarate and malate until the original oxaloacetate is regenerated, ready for a new turn.', ca: "El succinat passa per fumarat i malat fins regenerar l'oxalacetat inicial, a punt per a un nou cicle." } },
    ],
  },

  'ciclo-calvin': {
    label: { es: 'Ciclo de Calvin', en: 'Calvin Cycle', ca: 'Cicle de Calvin' },
    emoji: '🌿',
    gradient: 'from-green-500 to-emerald-700',
    home: 'celula',
    niveles: ['bachillerato'],
    cerrado: true,
    descripcion: {
      es: 'La fase oscura de la fotosíntesis, donde el CO2 se convierte en azúcares.',
      en: 'The light-independent phase of photosynthesis, where CO2 becomes sugar.',
      ca: 'La fase fosca de la fotosíntesi, on el CO2 es converteix en sucres.',
    },
    pasos: [
      { id: 'calvin_01', orden: 1, dificultad: 'difícil',
        nombre: { es: 'Fijación del CO2', en: 'CO2 fixation', ca: 'Fixació del CO2' },
        descripcion: { es: 'La enzima RuBisCO une el CO2 del aire a la RuBP (5C), formando un compuesto inestable de 6C.', en: 'The enzyme RuBisCO attaches CO2 from the air to RuBP (5C), forming an unstable 6C compound.', ca: "L'enzim RuBisCO uneix el CO2 de l'aire a la RuBP (5C), formant un compost inestable de 6C." } },
      { id: 'calvin_02', orden: 2, dificultad: 'difícil',
        nombre: { es: 'Formación de 3-fosfoglicerato', en: '3-phosphoglycerate formation', ca: 'Formació de 3-fosfoglicerat' },
        descripcion: { es: 'El compuesto inestable se rompe enseguida en dos moléculas de 3-fosfoglicerato (3-PGA), de 3 carbonos.', en: 'The unstable compound immediately splits into two 3-carbon molecules of 3-phosphoglycerate (3-PGA).', ca: "El compost inestable es trenca de seguida en dues molècules de 3-fosfoglicerat (3-PGA), de 3 carbonis." } },
      { id: 'calvin_03', orden: 3, dificultad: 'difícil',
        nombre: { es: 'Fase de reducción', en: 'Reduction phase', ca: 'Fase de reducció' },
        descripcion: { es: 'El ATP y el NADPH de la fase luminosa aportan energía para transformar el 3-PGA en gliceraldehído-3-fosfato (G3P).', en: 'ATP and NADPH from the light reactions provide the energy to turn 3-PGA into glyceraldehyde-3-phosphate (G3P).', ca: "L'ATP i el NADPH de la fase lluminosa aporten energia per transformar el 3-PGA en gliceraldehid-3-fosfat (G3P)." } },
      { id: 'calvin_04', orden: 4, dificultad: 'difícil',
        nombre: { es: 'Salida de azúcares', en: 'Sugar export', ca: 'Sortida de sucres' },
        descripcion: { es: 'Una parte del G3P sale del ciclo y se usa para fabricar glucosa y otros azúcares de la planta.', en: 'Some of the G3P leaves the cycle and is used to make glucose and other plant sugars.', ca: 'Una part del G3P surt del cicle i s\'usa per fabricar glucosa i altres sucres de la planta.' } },
      { id: 'calvin_05', orden: 5, dificultad: 'difícil',
        nombre: { es: 'Regeneración de la RuBP', en: 'RuBP regeneration', ca: 'Regeneració de la RuBP' },
        descripcion: { es: 'El resto del G3P, con ayuda de más ATP, se transforma de nuevo en RuBP para que el ciclo pueda repetirse.', en: 'The rest of the G3P, helped by more ATP, turns back into RuBP so the cycle can repeat.', ca: "La resta del G3P, amb ajuda de més ATP, es transforma novament en RuBP perquè el cicle es pugui repetir." } },
    ],
  },

  'ciclo-nitrogeno': {
    label: { es: 'Ciclo del Nitrógeno', en: 'Nitrogen Cycle', ca: 'Cicle del Nitrogen' },
    emoji: '🍃',
    gradient: 'from-teal-500 to-cyan-700',
    home: 'ecosistemas',
    niveles: ['eso', 'bachillerato'],
    cerrado: true,
    descripcion: {
      es: 'Cómo viaja el nitrógeno entre la atmósfera, el suelo y los seres vivos.',
      en: 'How nitrogen travels between the atmosphere, the soil and living things.',
      ca: 'Com viatja el nitrogen entre l\'atmosfera, el sòl i els éssers vius.',
    },
    pasos: [
      { id: 'nitro_01', orden: 1, dificultad: 'medio',
        nombre: { es: 'Fijación del nitrógeno', en: 'Nitrogen fixation', ca: 'Fixació del nitrogen' },
        descripcion: { es: 'Bacterias fijadoras del suelo (o los rayos) convierten el nitrógeno gaseoso (N2) del aire en amoníaco (NH3).', en: 'Nitrogen-fixing soil bacteria (or lightning) convert gaseous nitrogen (N2) from the air into ammonia (NH3).', ca: "Bacteris fixadors del sòl (o els llamps) converteixen el nitrogen gasós (N2) de l'aire en amoníac (NH3)." } },
      { id: 'nitro_02', orden: 2, dificultad: 'medio',
        nombre: { es: 'Nitrificación', en: 'Nitrification', ca: 'Nitrificació' },
        descripcion: { es: 'Otras bacterias del suelo oxidan el amoníaco, primero a nitritos y después a nitratos, aprovechables por las plantas.', en: 'Other soil bacteria oxidise the ammonia, first into nitrites and then into nitrates, which plants can use.', ca: "Altres bacteris del sòl oxiden l'amoníac, primer a nitrits i després a nitrats, aprofitables per les plantes." } },
      { id: 'nitro_03', orden: 3, dificultad: 'medio',
        nombre: { es: 'Asimilación', en: 'Assimilation', ca: 'Assimilació' },
        descripcion: { es: 'Las plantas absorben los nitratos por la raíz y los usan para fabricar proteínas y ácidos nucleicos.', en: 'Plants absorb the nitrates through their roots and use them to build proteins and nucleic acids.', ca: "Les plantes absorbeixen els nitrats per l'arrel i els fan servir per fabricar proteïnes i àcids nucleics." } },
      { id: 'nitro_04', orden: 4, dificultad: 'medio',
        nombre: { es: 'Paso por la cadena alimentaria', en: 'Passage through the food chain', ca: "Pas per la cadena alimentària" },
        descripcion: { es: 'Los animales obtienen el nitrógeno al comer plantas u otros animales, y lo incorporan a su propio cuerpo.', en: 'Animals get nitrogen by eating plants or other animals, incorporating it into their own bodies.', ca: "Els animals obtenen el nitrogen en menjar plantes o altres animals, i l'incorporen al seu propi cos." } },
      { id: 'nitro_05', orden: 5, dificultad: 'medio',
        nombre: { es: 'Amonificación', en: 'Ammonification', ca: 'Amonificació' },
        descripcion: { es: 'Al morir plantas y animales, bacterias descomponedoras liberan de nuevo su nitrógeno al suelo en forma de amoníaco.', en: 'When plants and animals die, decomposer bacteria release their nitrogen back into the soil as ammonia.', ca: "Quan moren plantes i animals, bacteris descomponedors alliberen de nou el seu nitrogen al sòl en forma d'amoníac." } },
      { id: 'nitro_06', orden: 6, dificultad: 'difícil',
        nombre: { es: 'Desnitrificación', en: 'Denitrification', ca: 'Desnitrificació' },
        descripcion: { es: 'Bacterias desnitrificantes transforman los nitratos del suelo de nuevo en nitrógeno gaseoso, que vuelve a la atmósfera.', en: 'Denitrifying bacteria turn the nitrates in the soil back into gaseous nitrogen, which returns to the atmosphere.', ca: "Bacteris desnitrificants transformen els nitrats del sòl de nou en nitrogen gasós, que torna a l'atmosfera." } },
    ],
  },

  'ciclo-rocas': {
    label: { es: 'Ciclo de las Rocas', en: 'Rock Cycle', ca: 'Cicle de les Roques' },
    emoji: '🪨',
    gradient: 'from-amber-600 to-orange-800',
    home: 'estados-materia',
    niveles: ['primaria', 'eso'],
    cerrado: true,
    descripcion: {
      es: 'Cómo se transforma la roca entre sus tres grandes tipos a lo largo de millones de años.',
      en: 'How rock transforms between its three great types over millions of years.',
      ca: 'Com es transforma la roca entre els seus tres grans tipus al llarg de milions d\'anys.',
    },
    pasos: [
      { id: 'roca_01', orden: 1, dificultad: 'medio',
        nombre: { es: 'Magma', en: 'Magma', ca: 'Magma' },
        descripcion: { es: 'En el interior de la Tierra, el calor mantiene la roca fundida en forma de magma.', en: "Deep inside the Earth, heat keeps rock molten in the form of magma.", ca: "A l'interior de la Terra, la calor manté la roca fosa en forma de magma." } },
      { id: 'roca_02', orden: 2, dificultad: 'medio',
        nombre: { es: 'Roca ígnea', en: 'Igneous rock', ca: 'Roca ígnia' },
        descripcion: { es: 'El magma se enfría y se solidifica, en la superficie o en profundidad, formando roca ígnea.', en: 'Magma cools and solidifies, at the surface or underground, forming igneous rock.', ca: 'El magma es refreda i es solidifica, a la superfície o en profunditat, formant roca ígnia.' } },
      { id: 'roca_03', orden: 3, dificultad: 'medio',
        nombre: { es: 'Meteorización y erosión', en: 'Weathering and erosion', ca: 'Meteorització i erosió' },
        descripcion: { es: 'El viento, el agua y el hielo desgastan la roca ígnea y la fragmentan poco a poco en sedimentos.', en: 'Wind, water and ice wear down the igneous rock and gradually break it into sediment.', ca: "El vent, l'aigua i el gel desgasten la roca ígnia i la fragmenten a poc a poc en sediments." } },
      { id: 'roca_04', orden: 4, dificultad: 'medio',
        nombre: { es: 'Sedimentación y compactación', en: 'Sedimentation and compaction', ca: 'Sedimentació i compactació' },
        descripcion: { es: 'Los sedimentos se depositan en capas y, con el tiempo y el peso, se compactan en roca sedimentaria.', en: 'Sediment settles in layers and, over time and under pressure, compacts into sedimentary rock.', ca: "Els sediments es dipositen en capes i, amb el temps i el pes, es compacten en roca sedimentària." } },
      { id: 'roca_05', orden: 5, dificultad: 'difícil',
        nombre: { es: 'Metamorfismo', en: 'Metamorphism', ca: 'Metamorfisme' },
        descripcion: { es: 'El calor y la presión en las profundidades transforman la roca sedimentaria en roca metamórfica.', en: 'Heat and pressure deep underground transform the sedimentary rock into metamorphic rock.', ca: 'La calor i la pressió en profunditat transformen la roca sedimentària en roca metamòrfica.' } },
      { id: 'roca_06', orden: 6, dificultad: 'difícil',
        nombre: { es: 'Fusión', en: 'Melting', ca: 'Fusió' },
        descripcion: { es: 'Si la roca metamórfica se hunde lo bastante, vuelve a fundirse en magma y el ciclo empieza de nuevo.', en: 'If the metamorphic rock sinks deep enough, it melts back into magma and the cycle starts again.', ca: "Si la roca metamòrfica s'enfonsa prou, torna a fondre's en magma i el cicle comença de nou." } },
    ],
  },

  'ciclo-celular': {
    label: { es: 'Ciclo Celular', en: 'Cell Cycle', ca: 'Cicle Cel·lular' },
    emoji: '🔬',
    gradient: 'from-violet-500 to-purple-700',
    home: 'celula',
    niveles: ['eso', 'bachillerato'],
    cerrado: true,
    descripcion: {
      es: 'Las fases que atraviesa una célula desde que nace hasta que se divide en dos.',
      en: 'The phases a cell goes through from birth until it divides into two.',
      ca: 'Les fases que travessa una cèl·lula des que neix fins que es divideix en dues.',
    },
    pasos: [
      { id: 'cel_01', orden: 1, dificultad: 'medio',
        nombre: { es: 'Fase G1', en: 'G1 phase', ca: 'Fase G1' },
        descripcion: { es: 'La célula crece y fabrica las proteínas y orgánulos que necesitará para poder dividirse.', en: 'The cell grows and produces the proteins and organelles it will need in order to divide.', ca: 'La cèl·lula creix i fabrica les proteïnes i orgànuls que necessitarà per poder dividir-se.' } },
      { id: 'cel_02', orden: 2, dificultad: 'medio',
        nombre: { es: 'Fase S', en: 'S phase', ca: 'Fase S' },
        descripcion: { es: 'Se duplica todo el ADN: cada cromosoma pasa a tener dos cromátidas hermanas idénticas.', en: 'All the DNA is duplicated: each chromosome ends up with two identical sister chromatids.', ca: "Es duplica tot l'ADN: cada cromosoma passa a tenir dues cromàtides germanes idèntiques." } },
      { id: 'cel_03', orden: 3, dificultad: 'medio',
        nombre: { es: 'Fase G2', en: 'G2 phase', ca: 'Fase G2' },
        descripcion: { es: 'La célula termina de crecer y fabrica las últimas proteínas necesarias antes de entrar en mitosis.', en: 'The cell finishes growing and makes the last proteins it needs before entering mitosis.', ca: 'La cèl·lula acaba de créixer i fabrica les últimes proteïnes necessàries abans d\'entrar en mitosi.' } },
      { id: 'cel_04', orden: 4, dificultad: 'difícil',
        nombre: { es: 'Profase', en: 'Prophase', ca: 'Profase' },
        descripcion: { es: 'La cromatina se condensa en cromosomas visibles y la membrana nuclear empieza a desaparecer.', en: 'Chromatin condenses into visible chromosomes and the nuclear membrane starts to disappear.', ca: 'La cromatina es condensa en cromosomes visibles i la membrana nuclear comença a desaparèixer.' } },
      { id: 'cel_05', orden: 5, dificultad: 'difícil',
        nombre: { es: 'Metafase', en: 'Metaphase', ca: 'Metafase' },
        descripcion: { es: 'Los cromosomas se alinean en el centro de la célula, sujetos por los husos acromáticos.', en: 'The chromosomes line up in the middle of the cell, attached to the spindle fibres.', ca: "Els cromosomes s'alineen al centre de la cèl·lula, subjectats pels fusos acromàtics." } },
      { id: 'cel_06', orden: 6, dificultad: 'difícil',
        nombre: { es: 'Anafase', en: 'Anaphase', ca: 'Anafase' },
        descripcion: { es: 'Las cromátidas hermanas se separan y son arrastradas hacia polos opuestos de la célula.', en: 'The sister chromatids separate and are pulled towards opposite poles of the cell.', ca: 'Les cromàtides germanes se separen i són arrossegades cap a pols oposats de la cèl·lula.' } },
      { id: 'cel_07', orden: 7, dificultad: 'medio',
        nombre: { es: 'Telofase y citocinesis', en: 'Telophase and cytokinesis', ca: 'Telofase i citocinesi' },
        descripcion: { es: 'Se forman dos nuevos núcleos y el citoplasma se divide, dando lugar a dos células hijas idénticas.', en: 'Two new nuclei form and the cytoplasm splits, producing two identical daughter cells.', ca: 'Es formen dos nous nuclis i el citoplasma es divideix, donant lloc a dues cèl·lules filles idèntiques.' } },
    ],
  },

  'metamorfosis-rana': {
    label: { es: 'Metamorfosis de la Rana', en: "Frog's Metamorphosis", ca: 'Metamorfosi de la Granota' },
    emoji: '🐸',
    gradient: 'from-lime-500 to-green-700',
    home: 'seres-vivos',
    niveles: ['primaria', 'eso'],
    descripcion: {
      es: 'El camino que recorre una rana desde el huevo hasta convertirse en adulta.',
      en: 'The journey a frog goes through from egg to adult.',
      ca: 'El camí que recorre una granota des de l\'ou fins a convertir-se en adulta.',
    },
    pasos: [
      { id: 'rana_01', orden: 1, dificultad: 'fácil',
        nombre: { es: 'Huevo', en: 'Egg', ca: 'Ou' },
        descripcion: { es: 'La rana pone los huevos en el agua, protegidos por una capa gelatinosa.', en: 'The frog lays its eggs in the water, protected by a jelly-like coating.', ca: "La granota pon els ous a l'aigua, protegits per una capa gelatinosa." } },
      { id: 'rana_02', orden: 2, dificultad: 'fácil',
        nombre: { es: 'Renacuajo', en: 'Tadpole', ca: 'Cullerot' },
        descripcion: { es: 'Del huevo nace un renacuajo con cola y branquias, que nada y respira como un pez.', en: 'A tadpole with a tail and gills hatches from the egg, swimming and breathing like a fish.', ca: "De l'ou neix un cullerot amb cua i brànquies, que neda i respira com un peix." } },
      { id: 'rana_03', orden: 3, dificultad: 'medio',
        nombre: { es: 'Renacuajo con patas traseras', en: 'Tadpole with hind legs', ca: 'Cullerot amb potes posteriors' },
        descripcion: { es: 'Al renacuajo le empiezan a crecer las primeras patas, las traseras.', en: 'The tadpole starts to grow its first legs, the hind ones.', ca: 'Al cullerot li comencen a créixer les primeres potes, les posteriors.' } },
      { id: 'rana_04', orden: 4, dificultad: 'medio',
        nombre: { es: 'Renacuajo con las cuatro patas', en: 'Tadpole with all four legs', ca: 'Cullerot amb les quatre potes' },
        descripcion: { es: 'Le crecen también las patas delanteras mientras la cola se va acortando poco a poco.', en: 'The front legs grow in too, while the tail gradually gets shorter.', ca: "Li creixen també les potes davanteres mentre la cua es va escurçant a poc a poc." } },
      { id: 'rana_05', orden: 5, dificultad: 'medio',
        nombre: { es: 'Rana joven', en: 'Young frog', ca: 'Granota jove' },
        descripcion: { es: 'Pierde la cola casi por completo, le crecen los pulmones y ya puede salir del agua.', en: 'It loses almost all of its tail, its lungs develop and it can now leave the water.', ca: "Perd la cua gairebé del tot, li creixen els pulmons i ja pot sortir de l'aigua." } },
      { id: 'rana_06', orden: 6, dificultad: 'fácil',
        nombre: { es: 'Rana adulta', en: 'Adult frog', ca: 'Granota adulta' },
        descripcion: { es: 'Completa su desarrollo con pulmones y piel adaptados a tierra firme, y ya puede reproducirse.', en: 'It completes its development with lungs and skin adapted to dry land, and can now reproduce.', ca: 'Completa el seu desenvolupament amb pulmons i pell adaptats a terra ferma, i ja pot reproduir-se.' } },
    ],
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getPasos(categoriaId) {
  return CICLOS[categoriaId]?.pasos ?? []
}

export function listCiclos() {
  return Object.entries(CICLOS).map(([id, c]) => ({ id, ...c, total: c.pasos.length }))
}

// Ciclos alojados dentro de un tema concreto de Ciencias (p. ej. 'celula').
export function ciclosPorTema(temaId) {
  return listCiclos().filter(c => c.home === temaId)
}

// Posición correcta donde insertar `card` en la línea `tl` (ya ordenada por `orden`).
export function getCorrectPosCiclo(card, tl) {
  const idx = tl.findIndex(e => e.orden > card.orden)
  return idx === -1 ? tl.length : idx
}
