// Páginas de estudio de la fotosíntesis (/estudiar/biologia/fotosintesis) y
// del ciclo del agua (/estudiar/geografia/ciclo-del-agua): dos búsquedas muy
// frecuentes de Primaria y ESO donde no salíamos (nov-2026). Se suman a
// ESTUDIO_EXTRA (temaEstudioExtra.js) y las pinta TemaEstudioExtra.jsx.
const T = (es, en, ca) => ({ es, en, ca })
const L = T

export const fotosintesis = {
  metaTitle: L('La fotosíntesis: qué es, fórmula, fases y diferencia con la respiración — resumen y ejercicios', 'Photosynthesis: what it is, the equation, its stages and how it differs from respiration — summary and practice', 'La fotosíntesi: què és, fórmula, fases i diferència amb la respiració — resum i exercicis'),
  metaDesc: L('Qué es la fotosíntesis, su ecuación, qué necesita la planta y qué produce, la fase luminosa y la oscura, y en qué se diferencia de la respiración. Con ejercicios resueltos.', 'What photosynthesis is, its equation, what the plant needs and makes, the light and dark stages, and how it differs from respiration. With worked exercises.', 'Què és la fotosíntesi, la seva equació, què necessita la planta i què produeix, la fase lluminosa i la fosca, i en què es diferencia de la respiració. Amb exercicis resolts.'),
  resumen: L(
    ['La fotosíntesis es el proceso con el que las plantas, las algas y algunas bacterias fabrican su propio alimento usando la energía de la luz. Toman agua del suelo y dióxido de carbono del aire, y con la luz que capta la clorofila los convierten en glucosa, un azúcar que les da energía y materia para crecer. Como resto, liberan oxígeno.', 'Ocurre en los cloroplastos, sobre todo en las células de las hojas, y es la base de casi toda la vida del planeta: los productores fabrican la materia orgánica que luego comen los demás seres vivos, y el oxígeno que respiramos sale de ella.'],
    ['Photosynthesis is the process by which plants, algae and some bacteria make their own food using the energy in light. They take water from the soil and carbon dioxide from the air and, with the light captured by chlorophyll, turn them into glucose, a sugar that gives them energy and material to grow. Oxygen is released as a by-product.', 'It happens in the chloroplasts, mostly in leaf cells, and it is the basis of almost all life on the planet: producers make the organic matter that other living things then eat, and the oxygen we breathe comes from it.'],
    ['La fotosíntesi és el procés amb què les plantes, les algues i alguns bacteris fabriquen el seu propi aliment fent servir l’energia de la llum. Prenen aigua del sòl i diòxid de carboni de l’aire, i amb la llum que capta la clorofil·la els converteixen en glucosa, un sucre que els dona energia i matèria per créixer. Com a residu, alliberen oxigen.', 'Té lloc als cloroplasts, sobretot a les cèl·lules de les fulles, i és la base de gairebé tota la vida del planeta: els productors fabriquen la matèria orgànica que després mengen els altres éssers vius, i l’oxigen que respirem en surt.'],
  ),
  puntosClave: L(
    ['Fórmula: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ (glucosa) + 6 O₂.', 'Necesita agua, dióxido de carbono y luz; produce glucosa y oxígeno.', 'Se hace en los cloroplastos, gracias a la clorofila, el pigmento verde.', 'El agua entra por las raíces; el CO₂ y el O₂ entran y salen por los estomas de las hojas.', 'Las plantas también respiran, de día y de noche, en las mitocondrias.', 'Las plantas son productores: son autótrofas.'],
    ['Equation: 6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ (glucose) + 6 O₂.', 'It needs water, carbon dioxide and light; it makes glucose and oxygen.', 'It happens in the chloroplasts, thanks to chlorophyll, the green pigment.', 'Water comes in through the roots; CO₂ and O₂ go in and out through the stomata in the leaves.', 'Plants also respire, day and night, in their mitochondria.', 'Plants are producers: they are autotrophs.'],
    ['Fórmula: 6 CO₂ + 6 H₂O + llum → C₆H₁₂O₆ (glucosa) + 6 O₂.', 'Necessita aigua, diòxid de carboni i llum; produeix glucosa i oxigen.', 'Es fa als cloroplasts, gràcies a la clorofil·la, el pigment verd.', 'L’aigua entra per les arrels; el CO₂ i l’O₂ entren i surten pels estomes de les fulles.', 'Les plantes també respiren, de dia i de nit, als mitocondris.', 'Les plantes són productors: són autòtrofes.'],
  ),
  secciones: [
    {
      titulo: L('Qué entra y qué sale', 'What goes in and what comes out', 'Què entra i què surt'),
      tabla: {
        columnas: L(['', 'Sustancia', 'De dónde viene o adónde va'], ['', 'Substance', 'Where it comes from or goes'], ['', 'Substància', 'D’on ve o on va']),
        filas: [
          [L('Entra', 'In', 'Entra'), L('agua (H₂O)', 'water (H₂O)', 'aigua (H₂O)'), L('del suelo, por las raíces, y sube por el xilema (savia bruta)', 'from the soil, through the roots, up the xylem (raw sap)', 'del sòl, per les arrels, i puja pel xilema (saba bruta)')],
          [L('Entra', 'In', 'Entra'), L('dióxido de carbono (CO₂)', 'carbon dioxide (CO₂)', 'diòxid de carboni (CO₂)'), L('del aire, por los estomas de las hojas', 'from the air, through the stomata in the leaves', 'de l’aire, pels estomes de les fulles')],
          [L('Entra', 'In', 'Entra'), L('energía de la luz', 'light energy', 'energia de la llum'), L('del Sol; la capta la clorofila', 'from the Sun; chlorophyll captures it', 'del Sol; la capta la clorofil·la')],
          [L('Sale', 'Out', 'Surt'), L('glucosa (C₆H₁₂O₆)', 'glucose (C₆H₁₂O₆)', 'glucosa (C₆H₁₂O₆)'), L('se reparte por la planta por el floema (savia elaborada); se guarda como almidón', 'carried round the plant in the phloem (processed sap); stored as starch', 'es reparteix per la planta pel floema (saba elaborada); es guarda com a midó')],
          [L('Sale', 'Out', 'Surt'), L('oxígeno (O₂)', 'oxygen (O₂)', 'oxigen (O₂)'), L('al aire, por los estomas', 'into the air, through the stomata', 'a l’aire, pels estomes')],
        ],
      },
    },
    {
      titulo: L('Fotosíntesis y respiración', 'Photosynthesis and respiration', 'Fotosíntesi i respiració'),
      tabla: {
        columnas: L(['', 'Fotosíntesis', 'Respiración'], ['', 'Photosynthesis', 'Respiration'], ['', 'Fotosíntesi', 'Respiració']),
        filas: [
          [L('Dónde', 'Where', 'On'), L('cloroplastos', 'chloroplasts', 'cloroplasts'), L('mitocondrias', 'mitochondria', 'mitocondris')],
          [L('Cuándo', 'When', 'Quan'), L('solo con luz', 'only in light', 'només amb llum'), L('siempre, de día y de noche', 'all the time, day and night', 'sempre, de dia i de nit')],
          [L('Toma', 'Takes in', 'Pren'), L('CO₂, agua y luz', 'CO₂, water and light', 'CO₂, aigua i llum'), L('glucosa y O₂', 'glucose and O₂', 'glucosa i O₂')],
          [L('Produce', 'Gives out', 'Produeix'), L('glucosa y O₂', 'glucose and O₂', 'glucosa i O₂'), L('CO₂, agua y energía', 'CO₂, water and energy', 'CO₂, aigua i energia')],
          [L('Quién', 'Who', 'Qui'), L('plantas, algas y algunas bacterias', 'plants, algae and some bacteria', 'plantes, algues i alguns bacteris'), L('casi todos los seres vivos, plantas incluidas', 'almost all living things, plants included', 'gairebé tots els éssers vius, plantes incloses')],
        ],
      },
      texto: L(
        ['De día, una planta hace fotosíntesis y respira a la vez, pero fabrica mucho más oxígeno del que gasta, así que en conjunto lo libera. De noche solo respira: toma oxígeno y suelta CO₂.'],
        ['During the day a plant photosynthesises and respires at the same time, but it makes far more oxygen than it uses, so overall it gives oxygen out. At night it only respires: it takes in oxygen and gives out CO₂.'],
        ['De dia, una planta fa la fotosíntesi i respira alhora, però fabrica molt més oxigen del que gasta, així que en conjunt l’allibera. De nit només respira: pren oxigen i deixa anar CO₂.'],
      ),
    },
    {
      titulo: L('Las dos fases (ESO y Bachillerato)', 'The two stages (secondary school)', 'Les dues fases (ESO i Batxillerat)'),
      tabla: {
        columnas: L(['Fase', 'Dónde', 'Qué pasa'], ['Stage', 'Where', 'What happens'], ['Fase', 'On', 'Què passa']),
        filas: [
          [L('Luminosa', 'Light-dependent', 'Lluminosa'), L('membranas de los tilacoides', 'thylakoid membranes', 'membranes dels tilacoides'), L('la clorofila capta la luz, se rompen moléculas de agua y se libera O₂; se obtienen ATP y NADPH', 'chlorophyll captures light, water molecules are split and O₂ is released; ATP and NADPH are made', 'la clorofil·la capta la llum, es trenquen molècules d’aigua i s’allibera O₂; s’obtenen ATP i NADPH')],
          [L('Oscura (ciclo de Calvin)', 'Light-independent (Calvin cycle)', 'Fosca (cicle de Calvin)'), L('estroma del cloroplasto', 'stroma of the chloroplast', 'estroma del cloroplast'), L('con el ATP y el NADPH se fija el CO₂ y se fabrica glucosa; no necesita luz directamente, aunque ocurre de día', 'the ATP and NADPH are used to fix CO₂ and make glucose; it does not need light directly, though it happens in the daytime', 'amb l’ATP i el NADPH es fixa el CO₂ i es fabrica glucosa; no necessita llum directament, tot i que passa de dia')],
        ],
      },
      texto: L(
        ['El oxígeno que se libera viene del agua, no del CO₂: se descubrió marcando el oxígeno del agua y viendo que era el que salía.'],
        ['The oxygen given out comes from the water, not from the CO₂: this was found by labelling the oxygen in water and seeing that it was the oxygen released.'],
        ['L’oxigen que s’allibera ve de l’aigua, no del CO₂: es va descobrir marcant l’oxigen de l’aigua i veient que era el que sortia.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Por qué las hojas son verdes?', 'Why are leaves green?', 'Per què les fulles són verdes?'),
      r: T('Por la clorofila. Absorbe sobre todo la luz roja y la azul, que son las que usa para la fotosíntesis, y refleja la verde, que es la que llega a nuestros ojos.', 'Because of chlorophyll. It mainly absorbs red and blue light, which it uses for photosynthesis, and reflects green, which is what reaches our eyes.', 'Per la clorofil·la. Absorbeix sobretot la llum vermella i la blava, que són les que fa servir per a la fotosíntesi, i reflecteix la verda, que és la que arriba als nostres ulls.') },
    { p: T('¿Las plantas respiran?', 'Do plants respire?', 'Les plantes respiren?'),
      r: T('Sí, siempre, como casi todos los seres vivos: usan oxígeno para sacar energía de la glucosa y sueltan CO₂. La fotosíntesis no sustituye a la respiración: la planta hace las dos.', 'Yes, all the time, like almost all living things: they use oxygen to get energy from glucose and give out CO₂. Photosynthesis does not replace respiration: the plant does both.', 'Sí, sempre, com gairebé tots els éssers vius: fan servir oxigen per treure energia de la glucosa i deixen anar CO₂. La fotosíntesi no substitueix la respiració: la planta fa les dues coses.') },
    { p: T('¿De dónde saca la planta la materia para crecer?', 'Where does a plant get the material to grow?', 'D’on treu la planta la matèria per créixer?'),
      r: T('Sobre todo del CO₂ del aire: el carbono de la glucosa viene de ahí. El agua y las sales minerales del suelo aportan el resto, pero un árbol no está hecho de «tierra».', 'Mostly from CO₂ in the air: the carbon in glucose comes from there. Water and mineral salts from the soil provide the rest, but a tree is not made of «soil».', 'Sobretot del CO₂ de l’aire: el carboni de la glucosa ve d’allà. L’aigua i les sals minerals del sòl aporten la resta, però un arbre no està fet de «terra».') },
  ],
  ejercicios: [
    { e: T('Completa la ecuación: 6 CO₂ + 6 H₂O + luz → ___ + ___', 'Complete the equation: 6 CO₂ + 6 H₂O + light → ___ + ___', 'Completa l’equació: 6 CO₂ + 6 H₂O + llum → ___ + ___'),
      s: T('C₆H₁₂O₆ (glucosa) + 6 O₂ (oxígeno). Se comprueba contando átomos: 6 C, 12 H y 18 O a cada lado.', 'C₆H₁₂O₆ (glucose) + 6 O₂ (oxygen). Check by counting atoms: 6 C, 12 H and 18 O on each side.', 'C₆H₁₂O₆ (glucosa) + 6 O₂ (oxigen). Es comprova comptant àtoms: 6 C, 12 H i 18 O a cada costat.') },
    { e: T('Una planta acuática bajo una lámpara suelta burbujas. ¿De qué gas son? ¿Qué pasa si se aleja la lámpara?', 'A water plant under a lamp gives off bubbles. Which gas are they? What happens if the lamp is moved away?', 'Una planta aquàtica sota un llum deixa anar bombolles. De quin gas són? Què passa si s’allunya el llum?'),
      s: T('Son de oxígeno, que sale de la fotosíntesis. Al alejar la lámpara llega menos luz, la fotosíntesis va más despacio y salen menos burbujas.', 'They are oxygen, produced by photosynthesis. Moving the lamp away means less light, photosynthesis slows down and fewer bubbles come out.', 'Són d’oxigen, que surt de la fotosíntesi. En allunyar el llum arriba menys llum, la fotosíntesi va més a poc a poc i surten menys bombolles.') },
    { e: T('¿Qué gas toma y qué gas suelta una planta por la noche?', 'Which gas does a plant take in and which does it give out at night?', 'Quin gas pren i quin gas deixa anar una planta a la nit?'),
      s: T('Sin luz no hay fotosíntesis, solo respiración: toma oxígeno y suelta dióxido de carbono.', 'Without light there is no photosynthesis, only respiration: it takes in oxygen and gives out carbon dioxide.', 'Sense llum no hi ha fotosíntesi, només respiració: pren oxigen i deixa anar diòxid de carboni.') },
    { e: T('Di por dónde entra o sale cada sustancia: agua, CO₂, oxígeno y glucosa.', 'Say where each substance goes in or out: water, CO₂, oxygen and glucose.', 'Digues per on entra o surt cada substància: aigua, CO₂, oxigen i glucosa.'),
      s: T('El agua entra por las raíces y sube por el xilema. El CO₂ entra por los estomas. El oxígeno sale por los estomas. La glucosa no sale de la planta: se reparte por el floema y se guarda como almidón.', 'Water goes in through the roots and up the xylem. CO₂ comes in through the stomata. Oxygen goes out through the stomata. Glucose does not leave the plant: it is carried round in the phloem and stored as starch.', 'L’aigua entra per les arrels i puja pel xilema. El CO₂ entra pels estomes. L’oxigen surt pels estomes. La glucosa no surt de la planta: es reparteix pel floema i es guarda com a midó.') },
  ],
}

export const cicloAgua = {
  metaTitle: L('El ciclo del agua: fases (evaporación, condensación, precipitación…) explicadas paso a paso — resumen y ejercicios', 'The water cycle: its stages (evaporation, condensation, precipitation…) — summary and practice questions', 'El cicle de l’aigua: fases (evaporació, condensació, precipitació…) — resum i exercicis'),
  metaDesc: L('Qué es el ciclo del agua, sus fases explicadas paso a paso, qué cambios de estado hay en cada una, cuánta agua dulce hay en la Tierra y ejercicios resueltos.', 'What the water cycle is, its stages step by step, the changes of state in each, how much fresh water there is on Earth, and worked exercises.', 'Què és el cicle de l’aigua, les seves fases pas a pas, quins canvis d’estat hi ha en cadascuna, quanta aigua dolça hi ha a la Terra i exercicis resolts.'),
  resumen: L(
    ['El ciclo del agua es el viaje continuo del agua entre el mar, el aire y la tierra. El Sol calienta el agua de mares, ríos y lagos, que se evapora y sube como vapor; al subir se enfría, se condensa en gotitas y forma las nubes; las gotas se juntan y caen como lluvia, nieve o granizo; y esa agua corre por los ríos o se filtra en el suelo hasta volver, tarde o temprano, al mar.', 'El agua de la Tierra no se gasta ni se crea: es siempre la misma y va cambiando de estado y de lugar. El motor del ciclo es la energía del Sol, y la gravedad hace que el agua caiga y baje hacia el mar.'],
    ['The water cycle is the continuous journey of water between the sea, the air and the land. The Sun warms the water in seas, rivers and lakes, which evaporates and rises as vapour; as it rises it cools, condenses into tiny droplets and forms clouds; the droplets join together and fall as rain, snow or hail; and that water runs off in rivers or soaks into the ground until, sooner or later, it returns to the sea.', 'The Earth’s water is neither used up nor created: it is always the same water, changing state and place. The cycle is driven by the Sun’s energy, and gravity makes water fall and flow down towards the sea.'],
    ['El cicle de l’aigua és el viatge continu de l’aigua entre el mar, l’aire i la terra. El Sol escalfa l’aigua de mars, rius i llacs, que s’evapora i puja com a vapor; en pujar es refreda, es condensa en gotetes i forma els núvols; les gotes s’ajunten i cauen com a pluja, neu o calamarsa; i aquesta aigua corre pels rius o s’infiltra al sòl fins que torna, tard o d’hora, al mar.', 'L’aigua de la Terra no es gasta ni es crea: és sempre la mateixa i va canviant d’estat i de lloc. El motor del cicle és l’energia del Sol, i la gravetat fa que l’aigua caigui i baixi cap al mar.'],
  ),
  puntosClave: L(
    ['Fases: evaporación, condensación, precipitación, escorrentía e infiltración.', 'Las plantas también sueltan vapor: es la transpiración.', 'El motor del ciclo es el Sol; la gravedad hace caer el agua.', 'Alrededor del 97 % del agua es salada; solo un 3 % es dulce.', 'La mayor parte del agua dulce está helada en glaciares y casquetes polares.', 'El agua de lluvia no es salada: al evaporarse, la sal se queda en el mar.'],
    ['Stages: evaporation, condensation, precipitation, run-off and infiltration.', 'Plants give off vapour too: this is transpiration.', 'The cycle is driven by the Sun; gravity makes the water fall.', 'About 97 % of water is salty; only 3 % is fresh.', 'Most fresh water is frozen in glaciers and ice caps.', 'Rainwater is not salty: when water evaporates, the salt stays in the sea.'],
    ['Fases: evaporació, condensació, precipitació, escolament i infiltració.', 'Les plantes també deixen anar vapor: és la transpiració.', 'El motor del cicle és el Sol; la gravetat fa caure l’aigua.', 'Un 97 % de l’aigua és salada; només un 3 % és dolça.', 'La major part de l’aigua dolça està glaçada en glaceres i casquets polars.', 'L’aigua de pluja no és salada: en evaporar-se, la sal es queda al mar.'],
  ),
  secciones: [
    {
      titulo: L('Las fases, paso a paso', 'The stages, step by step', 'Les fases, pas a pas'),
      tabla: {
        columnas: L(['Fase', 'Qué pasa', 'Cambio de estado'], ['Stage', 'What happens', 'Change of state'], ['Fase', 'Què passa', 'Canvi d’estat']),
        filas: [
          [L('Evaporación (y transpiración)', 'Evaporation (and transpiration)', 'Evaporació (i transpiració)'), L('el Sol calienta mares, ríos y lagos, y las plantas sueltan vapor por las hojas', 'the Sun warms seas, rivers and lakes, and plants give off vapour through their leaves', 'el Sol escalfa mars, rius i llacs, i les plantes deixen anar vapor per les fulles'), L('líquido → gas', 'liquid → gas', 'líquid → gas')],
          [L('Condensación', 'Condensation', 'Condensació'), L('el vapor sube, se enfría y forma gotitas: las nubes y la niebla', 'the vapour rises, cools and forms droplets: clouds and fog', 'el vapor puja, es refreda i forma gotetes: els núvols i la boira'), L('gas → líquido', 'gas → liquid', 'gas → líquid')],
          [L('Precipitación', 'Precipitation', 'Precipitació'), L('las gotas se juntan, pesan y caen como lluvia, nieve o granizo', 'the droplets join, get heavy and fall as rain, snow or hail', 'les gotes s’ajunten, pesen i cauen com a pluja, neu o calamarsa'), L('(la nieve y el granizo, ya sólidos)', '(snow and hail are already solid)', '(la neu i la calamarsa, ja sòlides)')],
          [L('Escorrentía', 'Run-off', 'Escolament'), L('el agua corre por la superficie, forma arroyos y ríos y baja hasta el mar', 'water flows over the surface, forms streams and rivers and runs down to the sea', 'l’aigua corre per la superfície, forma rierols i rius i baixa fins al mar'), L('—', '—', '—')],
          [L('Infiltración', 'Infiltration', 'Infiltració'), L('parte del agua entra en el suelo y forma aguas subterráneas (acuíferos), que salen en fuentes o llegan al mar', 'some water soaks into the ground and forms groundwater (aquifers), which comes out in springs or reaches the sea', 'part de l’aigua entra al sòl i forma aigües subterrànies (aqüífers), que surten en fonts o arriben al mar'), L('—', '—', '—')],
          [L('Fusión de la nieve y el hielo', 'Melting of snow and ice', 'Fusió de la neu i el gel'), L('en primavera la nieve de las montañas se derrite y alimenta los ríos', 'in spring the snow on the mountains melts and feeds the rivers', 'a la primavera la neu de les muntanyes es fon i alimenta els rius'), L('sólido → líquido', 'solid → liquid', 'sòlid → líquid')],
        ],
      },
    },
    {
      titulo: L('¿Cuánta agua hay y dónde?', 'How much water is there, and where?', 'Quanta aigua hi ha i on?'),
      tabla: {
        columnas: L(['Dónde', 'Parte del total'], ['Where', 'Share of the total'], ['On', 'Part del total']),
        filas: [
          [L('Mares y océanos (agua salada)', 'Seas and oceans (salt water)', 'Mars i oceans (aigua salada)'), L('alrededor del 97 %', 'around 97 %', 'al voltant del 97 %')],
          [L('Agua dulce', 'Fresh water', 'Aigua dolça'), L('alrededor del 3 %', 'around 3 %', 'al voltant del 3 %')],
          [L('· de ella, helada en glaciares y casquetes polares', '· of which frozen in glaciers and ice caps', '· d’aquesta, glaçada en glaceres i casquets polars'), L('unos dos tercios', 'about two thirds', 'uns dos terços')],
          [L('· de ella, bajo tierra (aguas subterráneas)', '· of which underground (groundwater)', '· d’aquesta, sota terra (aigües subterrànies)'), L('casi un tercio', 'almost a third', 'gairebé un terç')],
          [L('· de ella, en ríos, lagos y la atmósfera', '· of which in rivers, lakes and the air', '· d’aquesta, en rius, llacs i l’atmosfera'), L('alrededor del 1 %', 'around 1 %', 'al voltant de l’1 %')],
        ],
      },
      texto: L(
        ['Por eso el agua dulce que podemos usar con facilidad, la de ríos y lagos, es una parte diminuta del total, y conviene no malgastarla ni contaminarla.'],
        ['That is why the fresh water we can easily use, in rivers and lakes, is a tiny part of the total, and it should not be wasted or polluted.'],
        ['Per això l’aigua dolça que podem fer servir fàcilment, la de rius i llacs, és una part minúscula del total, i convé no malbaratar-la ni contaminar-la.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Se puede acabar el agua de la Tierra?', 'Can the Earth run out of water?', 'Es pot acabar l’aigua de la Terra?'),
      r: T('La cantidad total no cambia: el agua se recicla una y otra vez en el ciclo. Lo que sí puede faltar es agua dulce y limpia en un lugar y en un momento concretos, por sequías, por gastarla más deprisa de lo que llueve o por contaminarla.', 'The total amount does not change: water is recycled again and again in the cycle. What can run short is clean fresh water in a particular place and time, because of droughts, using it faster than it rains, or pollution.', 'La quantitat total no canvia: l’aigua es recicla una vegada i una altra en el cicle. El que sí que pot faltar és aigua dolça i neta en un lloc i un moment concrets, per sequeres, per gastar-la més de pressa del que plou o per contaminar-la.') },
    { p: T('¿Por qué el agua de lluvia no es salada si viene del mar?', 'Why is rainwater not salty if it comes from the sea?', 'Per què l’aigua de pluja no és salada si ve del mar?'),
      r: T('Porque al evaporarse solo sube el agua: la sal no se evapora y se queda en el mar. Es lo mismo que pasa en las salinas.', 'Because only the water rises when it evaporates: the salt does not evaporate and stays in the sea. It is the same thing that happens in salt pans.', 'Perquè en evaporar-se només puja l’aigua: la sal no s’evapora i es queda al mar. És el mateix que passa a les salines.') },
  ],
  ejercicios: [
    { e: T('Ordena las fases empezando por el mar: precipitación, evaporación, escorrentía, condensación.', 'Put the stages in order starting from the sea: precipitation, evaporation, run-off, condensation.', 'Ordena les fases començant pel mar: precipitació, evaporació, escolament, condensació.'),
      s: T('Evaporación → condensación → precipitación → escorrentía (y el agua vuelve al mar).', 'Evaporation → condensation → precipitation → run-off (and the water returns to the sea).', 'Evaporació → condensació → precipitació → escolament (i l’aigua torna al mar).') },
    { e: T('¿Qué fase del ciclo es cada una? a) Se forman nubes. b) Un charco se seca al sol. c) Nieva en la montaña. d) El agua de lluvia se mete en la tierra.', 'Which stage is each one? a) Clouds form. b) A puddle dries in the sun. c) It snows in the mountains. d) Rainwater soaks into the ground.', 'Quina fase del cicle és cadascuna? a) Es formen núvols. b) Un bassal s’asseca al sol. c) Neva a la muntanya. d) L’aigua de pluja entra a la terra.'),
      s: T('a) Condensación. b) Evaporación. c) Precipitación (en forma sólida). d) Infiltración.', 'a) Condensation. b) Evaporation. c) Precipitation (as a solid). d) Infiltration.', 'a) Condensació. b) Evaporació. c) Precipitació (en forma sòlida). d) Infiltració.') },
    { e: T('Si en la Tierra hay unos 1.400 millones de km³ de agua y el 3 % es dulce, ¿cuánta agua dulce hay?', 'If there are about 1,400 million km³ of water on Earth and 3 % is fresh, how much fresh water is there?', 'Si a la Terra hi ha uns 1.400 milions de km³ d’aigua i el 3 % és dolça, quanta aigua dolça hi ha?'),
      s: T('1.400 × 3 ÷ 100 = 42 millones de km³ de agua dulce, y la mayor parte está helada.', '1,400 × 3 ÷ 100 = 42 million km³ of fresh water, most of it frozen.', '1.400 × 3 ÷ 100 = 42 milions de km³ d’aigua dolça, i la major part està glaçada.') },
    { e: T('¿Qué es lo que mueve el ciclo del agua?', 'What drives the water cycle?', 'Què mou el cicle de l’aigua?'),
      s: T('La energía del Sol, que evapora el agua, y la gravedad, que la hace caer como precipitación y bajar por los ríos hasta el mar.', 'The Sun’s energy, which evaporates the water, and gravity, which makes it fall as precipitation and flow down the rivers to the sea.', 'L’energia del Sol, que evapora l’aigua, i la gravetat, que la fa caure com a precipitació i baixar pels rius fins al mar.') },
  ],
}
