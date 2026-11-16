// Séptima tanda (16-nov-2026): páginas finas con algo de tráfico en Search
// Console (rocas y minerales, mezclas, entreguerras, Prehistoria, historia de
// EE. UU.) y tres de biología muy buscadas (célula, genética, ecosistemas).
// Se suman en AMPLIACION (temaAmpliado.js). Mezclas sigue a El Laboratorio
// (separar sal y agua: evaporar o, si se quiere el agua, destilar).
const T = (es, en, ca) => ({ es, en, ca })
const L = T

const rocas = {
  metaTitle: L('Rocas y minerales: tipos de rocas (magmáticas, sedimentarias y metamórficas) y escala de Mohs — resumen', 'Rocks and minerals: igneous, sedimentary and metamorphic rocks and the Mohs scale — summary and practice', 'Roques i minerals: tipus de roques (magmàtiques, sedimentàries i metamòrfiques) i escala de Mohs — resum'),
  secciones: [
    {
      titulo: L('Los tres tipos de rocas', 'The three types of rock', 'Els tres tipus de roques'),
      tabla: {
        columnas: L(['Tipo', 'Cómo se forman', 'Ejemplos'], ['Type', 'How they form', 'Examples'], ['Tipus', 'Com es formen', 'Exemples']),
        filas: [
          [L('Magmáticas (ígneas) plutónicas', 'Igneous, intrusive', 'Magmàtiques (ígnies) plutòniques'), L('el magma se enfría despacio bajo tierra: cristales grandes', 'magma cools slowly underground: large crystals', 'el magma es refreda a poc a poc sota terra: cristalls grans'), L('granito', 'granite', 'granit')],
          [L('Magmáticas (ígneas) volcánicas', 'Igneous, extrusive', 'Magmàtiques (ígnies) volcàniques'), L('la lava se enfría deprisa en la superficie: cristales pequeños o ninguno', 'lava cools quickly at the surface: small crystals or none', 'la lava es refreda de pressa a la superfície: cristalls petits o cap'), L('basalto, piedra pómez, obsidiana', 'basalt, pumice, obsidian', 'basalt, pedra tosca, obsidiana')],
          [L('Sedimentarias', 'Sedimentary', 'Sedimentàries'), L('restos de otras rocas, conchas o sales se depositan en capas y se compactan', 'fragments of other rocks, shells or salts settle in layers and are compacted', 'restes d’altres roques, closques o sals es dipositen en capes i es compacten'), L('arenisca, conglomerado, caliza, yeso, carbón', 'sandstone, conglomerate, limestone, gypsum, coal', 'gres, conglomerat, calcària, guix, carbó')],
          [L('Metamórficas', 'Metamorphic', 'Metamòrfiques'), L('otras rocas cambian por presión y temperatura altas, sin fundirse', 'other rocks change under high pressure and temperature, without melting', 'altres roques canvien per pressió i temperatura altes, sense fondre’s'), L('pizarra (de arcilla), mármol (de caliza), gneis (de granito), cuarcita (de arenisca)', 'slate (from clay), marble (from limestone), gneiss (from granite), quartzite (from sandstone)', 'pissarra (d’argila), marbre (de calcària), gneis (de granit), quarsita (de gres)')],
        ],
      },
    },
    {
      titulo: L('Los minerales y la escala de Mohs', 'Minerals and the Mohs scale', 'Els minerals i l’escala de Mohs'),
      lista: L(
        ['Un mineral es una sustancia natural, sólida e inorgánica, con una composición química fija y, casi siempre, estructura de cristal. Una roca es una mezcla de uno o varios minerales: el granito lleva cuarzo, feldespato y mica.', 'Escala de dureza de Mohs (cada uno raya a los anteriores): 1 talco, 2 yeso, 3 calcita, 4 fluorita, 5 apatito, 6 ortosa (feldespato), 7 cuarzo, 8 topacio, 9 corindón, 10 diamante.', 'Otras propiedades para reconocerlos: color, brillo (metálico o no), raya (el color de su polvo), exfoliación (si se rompe en láminas) y densidad.'],
        ['A mineral is a natural, solid, inorganic substance with a fixed chemical composition and, almost always, a crystal structure. A rock is a mixture of one or more minerals: granite contains quartz, feldspar and mica.', 'Mohs hardness scale (each one scratches the ones before it): 1 talc, 2 gypsum, 3 calcite, 4 fluorite, 5 apatite, 6 orthoclase (feldspar), 7 quartz, 8 topaz, 9 corundum, 10 diamond.', 'Other properties used to identify them: colour, lustre (metallic or not), streak (the colour of their powder), cleavage (whether they split into sheets) and density.'],
        ['Un mineral és una substància natural, sòlida i inorgànica, amb una composició química fixa i, gairebé sempre, estructura de cristall. Una roca és una barreja d’un o diversos minerals: el granit porta quars, feldspat i mica.', 'Escala de duresa de Mohs (cadascun ratlla els anteriors): 1 talc, 2 guix, 3 calcita, 4 fluorita, 5 apatita, 6 ortosa (feldspat), 7 quars, 8 topazi, 9 corindó, 10 diamant.', 'Altres propietats per reconèixer-los: color, lluentor (metàl·lica o no), ratlla (el color de la seva pols), exfoliació (si es trenca en làmines) i densitat.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Por qué el granito tiene cristales grandes y el basalto no?', 'Why does granite have large crystals while basalt does not?', 'Per què el granit té cristalls grans i el basalt no?'),
      s: T('El granito es plutónico: el magma se enfrió muy despacio bajo tierra y los cristales tuvieron tiempo de crecer. El basalto es volcánico: la lava se enfrió deprisa.', 'Granite is intrusive: the magma cooled very slowly underground and the crystals had time to grow. Basalt is extrusive: the lava cooled quickly.', 'El granit és plutònic: el magma es va refredar molt a poc a poc sota terra i els cristalls van tenir temps de créixer. El basalt és volcànic: la lava es va refredar de pressa.') },
    { e: T('¿De qué roca viene el mármol y de qué tipo es?', 'Which rock does marble come from, and what type is it?', 'De quina roca ve el marbre i de quin tipus és?'),
      s: T('De la caliza, transformada por la presión y la temperatura: es metamórfica.', 'From limestone, changed by pressure and temperature: it is metamorphic.', 'De la calcària, transformada per la pressió i la temperatura: és metamòrfica.') },
    { e: T('Un mineral raya a la calcita pero lo raya la fluorita. ¿Qué dureza tiene, más o menos?', 'A mineral scratches calcite but is scratched by fluorite. Roughly how hard is it?', 'Un mineral ratlla la calcita però el ratlla la fluorita. Quina duresa té, més o menys?'),
      s: T('Entre 3 y 4 en la escala de Mohs.', 'Between 3 and 4 on the Mohs scale.', 'Entre 3 i 4 a l’escala de Mohs.') },
  ],
}

const mezclas = {
  metaTitle: L('Sustancias puras y mezclas: homogéneas y heterogéneas y métodos de separación — resumen y ejercicios', 'Pure substances and mixtures: homogeneous and heterogeneous, and separation methods — summary and practice', 'Substàncies pures i mescles: homogènies i heterogènies i mètodes de separació — resum i exercicis'),
  secciones: [
    {
      titulo: L('Cómo se clasifica la materia', 'How matter is classified', 'Com es classifica la matèria'),
      tabla: {
        columnas: L(['Tipo', 'Qué es', 'Ejemplos'], ['Type', 'What it is', 'Examples'], ['Tipus', 'Què és', 'Exemples']),
        filas: [
          [L('Elemento', 'Element', 'Element'), L('sustancia pura de un solo tipo de átomo', 'a pure substance made of one kind of atom', 'substància pura d’un sol tipus d’àtom'), L('oro, oxígeno, hierro', 'gold, oxygen, iron', 'or, oxigen, ferro')],
          [L('Compuesto', 'Compound', 'Compost'), L('sustancia pura de varios elementos unidos en proporción fija', 'a pure substance of several elements joined in a fixed ratio', 'substància pura de diversos elements units en proporció fixa'), L('agua, sal, dióxido de carbono', 'water, salt, carbon dioxide', 'aigua, sal, diòxid de carboni')],
          [L('Mezcla homogénea (disolución)', 'Homogeneous mixture (solution)', 'Mescla homogènia (dissolució)'), L('no se distinguen sus componentes', 'you cannot tell its parts apart', 'no se’n distingeixen els components'), L('agua con sal, aire, bronce', 'salt water, air, bronze', 'aigua amb sal, aire, bronze')],
          [L('Mezcla heterogénea', 'Heterogeneous mixture', 'Mescla heterogènia'), L('se ven sus componentes', 'you can see its parts', 'se’n veuen els components'), L('agua y aceite, arena y grava, ensalada', 'oil and water, sand and gravel, salad', 'aigua i oli, sorra i grava, amanida')],
        ],
      },
    },
    {
      titulo: L('Métodos de separación', 'Separation methods', 'Mètodes de separació'),
      tabla: {
        columnas: L(['Método', 'Sirve para', 'Ejemplo'], ['Method', 'Used for', 'Example'], ['Mètode', 'Serveix per', 'Exemple']),
        filas: [
          [L('Filtración', 'Filtering', 'Filtració'), L('un sólido que no se disuelve, de un líquido', 'an undissolved solid from a liquid', 'un sòlid que no es dissol, d’un líquid'), L('arena y agua', 'sand and water', 'sorra i aigua')],
          [L('Tamizado', 'Sieving', 'Tamisatge'), L('sólidos de distinto tamaño', 'solids of different sizes', 'sòlids de mida diferent'), L('arena y grava', 'sand and gravel', 'sorra i grava')],
          [L('Separación magnética', 'Magnetic separation', 'Separació magnètica'), L('el hierro de lo demás', 'iron from everything else', 'el ferro de la resta'), L('limaduras de hierro y arena', 'iron filings and sand', 'llimadures de ferro i sorra')],
          [L('Decantación', 'Decanting', 'Decantació'), L('líquidos que no se mezclan, o un sólido que se ha ido al fondo', 'liquids that do not mix, or a solid that has settled', 'líquids que no es barregen, o un sòlid que ha anat al fons'), L('agua y aceite (embudo de decantación)', 'oil and water (separating funnel)', 'aigua i oli (embut de decantació)')],
          [L('Evaporación y cristalización', 'Evaporation and crystallisation', 'Evaporació i cristal·lització'), L('recuperar un sólido disuelto', 'recovering a dissolved solid', 'recuperar un sòlid dissolt'), L('sal del agua de mar', 'salt from seawater', 'sal de l’aigua de mar')],
          [L('Destilación', 'Distillation', 'Destil·lació'), L('líquidos con distinto punto de ebullición, o recuperar el líquido de una disolución', 'liquids with different boiling points, or recovering the liquid from a solution', 'líquids amb punt d’ebullició diferent, o recuperar el líquid d’una dissolució'), L('agua y alcohol; agua pura del agua salada', 'water and alcohol; pure water from salt water', 'aigua i alcohol; aigua pura de l’aigua salada')],
          [L('Cromatografía', 'Chromatography', 'Cromatografia'), L('sustancias que avanzan a distinta velocidad por un papel', 'substances that travel at different speeds along paper', 'substàncies que avancen a velocitat diferent per un paper'), L('los colores de una tinta', 'the colours in an ink', 'els colors d’una tinta')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('¿Cómo separarías arena, sal y limaduras de hierro?', 'How would you separate sand, salt and iron filings?', 'Com separaries sorra, sal i llimadures de ferro?'),
      s: T('1) Con un imán, el hierro. 2) Se añade agua: la sal se disuelve. 3) Se filtra: la arena queda en el papel. 4) Se evapora el agua y queda la sal.', '1) A magnet takes out the iron. 2) Add water: the salt dissolves. 3) Filter: the sand stays on the paper. 4) Evaporate the water and the salt is left.', '1) Amb un imant, el ferro. 2) S’hi afegeix aigua: la sal es dissol. 3) Es filtra: la sorra queda al paper. 4) S’evapora l’aigua i queda la sal.') },
    { e: T('¿Homogénea o heterogénea? Leche con cacao bien disuelto, granito, aire, agua con aceite.', 'Homogeneous or heterogeneous? Well-mixed chocolate milk, granite, air, oil and water.', 'Homogènia o heterogènia? Llet amb cacau ben dissolt, granit, aire, aigua amb oli.'),
      s: T('Leche con cacao disuelto y aire: homogéneas. Granito y agua con aceite: heterogéneas (se ven sus partes).', 'Chocolate milk and air: homogeneous. Granite and oil with water: heterogeneous (you can see the parts).', 'Llet amb cacau dissolt i aire: homogènies. Granit i aigua amb oli: heterogènies (se’n veuen les parts).') },
    { e: T('Quieres beber agua de mar. ¿Sirve evaporar? ¿Qué harías?', 'You want to drink seawater. Does evaporating it work? What would you do?', 'Vols beure aigua de mar. Serveix evaporar? Què faries?'),
      s: T('Evaporando te quedas con la sal y pierdes el agua. Hay que destilar: el agua se evapora, se condensa aparte y la sal se queda.', 'Evaporating keeps the salt and loses the water. You need to distil: the water evaporates, condenses elsewhere and the salt stays behind.', 'Evaporant et quedes la sal i perds l’aigua. Cal destil·lar: l’aigua s’evapora, es condensa a part i la sal es queda.') },
  ],
}

const entreguerras = {
  metaTitle: L('El periodo de entreguerras: felices años 20, crac del 29, fascismo y nazismo — resumen y ejercicios', 'The interwar period: the Roaring Twenties, the 1929 crash, fascism and Nazism — summary and practice questions', 'El període d’entreguerres: feliços anys 20, crac del 29, feixisme i nazisme — resum i exercicis'),
  secciones: [
    {
      titulo: L('De una guerra a otra (1918-1939)', 'From one war to the next (1918-1939)', 'D’una guerra a l’altra (1918-1939)'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          ['1919', L('Tratado de Versalles: Alemania pierde territorios y paga reparaciones; nace la Sociedad de Naciones', 'Treaty of Versailles: Germany loses territory and pays reparations; the League of Nations is founded', 'Tractat de Versalles: Alemanya perd territoris i paga reparacions; neix la Societat de Nacions')],
          ['1922', L('Mussolini llega al poder en Italia tras la marcha sobre Roma: primer régimen fascista', 'Mussolini takes power in Italy after the March on Rome: the first fascist regime', 'Mussolini arriba al poder a Itàlia després de la marxa sobre Roma: primer règim feixista')],
          [L('años 20', '1920s', 'anys 20'), L('«felices años 20» en EE. UU.: crecimiento, consumo, radio, cine y jazz', 'the «Roaring Twenties» in the USA: growth, consumerism, radio, cinema and jazz', '«feliços anys 20» als EUA: creixement, consum, ràdio, cinema i jazz')],
          ['1929', L('crac de la Bolsa de Nueva York (jueves 24 de octubre) y Gran Depresión: paro y quiebras en todo el mundo', 'Wall Street Crash (Thursday 24 October) and the Great Depression: unemployment and bankruptcies worldwide', 'crac de la Borsa de Nova York (dijous 24 d’octubre) i Gran Depressió: atur i fallides a tot el món')],
          ['1933', L('Hitler, canciller de Alemania; en EE. UU., Roosevelt lanza el New Deal', 'Hitler becomes German chancellor; in the USA, Roosevelt launches the New Deal', 'Hitler, canceller d’Alemanya; als EUA, Roosevelt llança el New Deal')],
          [L('años 30', '1930s', 'anys 30'), L('Stalin en la URSS: planes quinquenales y represión', 'Stalin in the USSR: five-year plans and repression', 'Stalin a l’URSS: plans quinquennals i repressió')],
          ['1939', L('Alemania invade Polonia (1 de septiembre): empieza la Segunda Guerra Mundial', 'Germany invades Poland (1 September): the Second World War begins', 'Alemanya envaeix Polònia (1 de setembre): comença la Segona Guerra Mundial')],
        ],
      },
      lista: L(
        ['Los totalitarismos (fascismo, nazismo, estalinismo) tenían en común un partido único, el culto al líder, la propaganda, la represión de la oposición y el control de la sociedad.', 'La Gran Depresión ayudó a que creciera el nazismo: millones de parados alemanes y el rechazo a Versalles hicieron que muchos votaran a Hitler.'],
        ['The totalitarian regimes (fascism, Nazism, Stalinism) shared a single party, a cult of the leader, propaganda, repression of opponents and control of society.', 'The Great Depression helped Nazism grow: millions of unemployed Germans and resentment of Versailles led many to vote for Hitler.'],
        ['Els totalitarismes (feixisme, nazisme, estalinisme) tenien en comú un partit únic, el culte al líder, la propaganda, la repressió de l’oposició i el control de la societat.', 'La Gran Depressió va ajudar que creixés el nazisme: milions d’aturats alemanys i el rebuig a Versalles van fer que molts votessin Hitler.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Ordena: crac del 29, Tratado de Versalles, Hitler canciller, marcha sobre Roma, invasión de Polonia.', 'Put in order: the 1929 crash, the Treaty of Versailles, Hitler as chancellor, the March on Rome, the invasion of Poland.', 'Ordena: crac del 29, Tractat de Versalles, Hitler canceller, marxa sobre Roma, invasió de Polònia.'),
      s: T('Versalles (1919) → marcha sobre Roma (1922) → crac del 29 → Hitler canciller (1933) → invasión de Polonia (1939).', 'Versailles (1919) → March on Rome (1922) → 1929 crash → Hitler chancellor (1933) → invasion of Poland (1939).', 'Versalles (1919) → marxa sobre Roma (1922) → crac del 29 → Hitler canceller (1933) → invasió de Polònia (1939).') },
    { e: T('¿Qué fue el New Deal?', 'What was the New Deal?', 'Què va ser el New Deal?'),
      s: T('El programa del presidente Roosevelt (desde 1933) para salir de la Gran Depresión: obras públicas, ayudas a los parados y más control de los bancos y la Bolsa.', 'President Roosevelt’s programme (from 1933) to get out of the Great Depression: public works, help for the unemployed and more control of banks and the stock market.', 'El programa del president Roosevelt (des del 1933) per sortir de la Gran Depressió: obres públiques, ajudes als aturats i més control dels bancs i la Borsa.') },
    { e: T('Di tres rasgos comunes de los regímenes totalitarios.', 'Give three features shared by totalitarian regimes.', 'Digues tres trets comuns dels règims totalitaris.'),
      s: T('Por ejemplo: partido único, culto al líder y represión de la oposición (también propaganda y control de la economía y la educación).', 'For example: a single party, a cult of the leader and repression of opponents (also propaganda and control of the economy and education).', 'Per exemple: partit únic, culte al líder i repressió de l’oposició (també propaganda i control de l’economia i l’educació).') },
  ],
}

const prehistoria = {
  metaTitle: L('La Prehistoria: Paleolítico, Neolítico y Edad de los Metales, evolución humana y arte rupestre — resumen', 'Prehistory: the Palaeolithic, Neolithic and Metal Ages, human evolution and cave art — summary and practice', 'La Prehistòria: Paleolític, Neolític i Edat dels Metalls, evolució humana i art rupestre — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las etapas de la Prehistoria', 'The stages of prehistory', 'Les etapes de la Prehistòria'),
      tabla: {
        columnas: L(['Etapa', 'Cuándo (aprox.)', 'Cómo vivían', 'Qué nos dejaron'], ['Stage', 'When (approx.)', 'How people lived', 'What they left'], ['Etapa', 'Quan (aprox.)', 'Com vivien', 'Què ens van deixar']),
        filas: [
          [L('Paleolítico', 'Palaeolithic', 'Paleolític'), L('desde hace unos 2,5 millones de años hasta el 10.000 a. C.', 'from about 2.5 million years ago to 10,000 BC', 'des de fa uns 2,5 milions d’anys fins al 10.000 aC'), L('nómadas: cazadores, pescadores y recolectores; dominan el fuego', 'nomads: hunters, fishers and gatherers; they master fire', 'nòmades: caçadors, pescadors i recol·lectors; dominen el foc'), L('herramientas de piedra tallada; pinturas rupestres (Altamira, Lascaux)', 'chipped stone tools; cave paintings (Altamira, Lascaux)', 'eines de pedra tallada; pintures rupestres (Altamira, Lascaux)')],
          [L('Neolítico', 'Neolithic', 'Neolític'), L('desde el 10.000 a. C. en Oriente Próximo (más tarde en la península)', 'from 10,000 BC in the Near East (later in Iberia)', 'des del 10.000 aC al Pròxim Orient (més tard a la península)'), L('agricultura y ganadería: se hacen sedentarios y viven en poblados', 'farming and herding: people settle in villages', 'agricultura i ramaderia: es fan sedentaris i viuen en poblats'), L('piedra pulida, cerámica, tejidos', 'polished stone, pottery, weaving', 'pedra polida, ceràmica, teixits')],
          [L('Edad de los Metales', 'Metal Ages', 'Edat dels Metalls'), L('desde el 4000 a. C. aprox. hasta la escritura', 'from about 4000 BC until writing', 'des del 4000 aC aprox. fins a l’escriptura'), L('cobre, bronce y hierro; comercio, artesanos y primeras desigualdades', 'copper, bronze and iron; trade, craftspeople and early inequality', 'coure, bronze i ferro; comerç, artesans i primeres desigualtats'), L('armas y herramientas de metal; megalitos (menhir, dolmen, crómlech)', 'metal weapons and tools; megaliths (menhir, dolmen, cromlech)', 'armes i eines de metall; megàlits (menhir, dolmen, cromlec)')],
        ],
      },
      lista: L(
        ['La Prehistoria acaba con la invención de la escritura, hacia el 3000 a. C. en Mesopotamia y Egipto (más tarde en otros lugares).', 'Algunas especies humanas: Homo habilis (primeras herramientas), Homo erectus (fuego, sale de África), Homo neanderthalensis (Europa, enterraba a sus muertos) y Homo sapiens, la nuestra.', 'En Atapuerca (Burgos) se han encontrado algunos de los restos humanos más antiguos de Europa, como los del Homo antecessor.'],
        ['Prehistory ends with the invention of writing, around 3000 BC in Mesopotamia and Egypt (later elsewhere).', 'Some human species: Homo habilis (first tools), Homo erectus (fire, leaves Africa), Homo neanderthalensis (Europe, buried their dead) and Homo sapiens, our own.', 'At Atapuerca (Burgos) some of the oldest human remains in Europe have been found, such as those of Homo antecessor.'],
        ['La Prehistòria acaba amb la invenció de l’escriptura, cap al 3000 aC a Mesopotàmia i Egipte (més tard en altres llocs).', 'Algunes espècies humanes: Homo habilis (primeres eines), Homo erectus (foc, surt de l’Àfrica), Homo neanderthalensis (Europa, enterrava els morts) i Homo sapiens, la nostra.', 'A Atapuerca (Burgos) s’hi han trobat algunes de les restes humanes més antigues d’Europa, com les de l’Homo antecessor.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Paleolítico o Neolítico? a) Piedra pulida. b) Nómadas. c) Agricultura. d) Pinturas de Altamira.', 'Palaeolithic or Neolithic? a) Polished stone. b) Nomads. c) Farming. d) The Altamira paintings.', 'Paleolític o Neolític? a) Pedra polida. b) Nòmades. c) Agricultura. d) Pintures d’Altamira.'),
      s: T('a) Neolítico. b) Paleolítico. c) Neolítico. d) Paleolítico.', 'a) Neolithic. b) Palaeolithic. c) Neolithic. d) Palaeolithic.', 'a) Neolític. b) Paleolític. c) Neolític. d) Paleolític.') },
    { e: T('¿Por qué la agricultura cambió tanto la vida humana?', 'Why did farming change human life so much?', 'Per què l’agricultura va canviar tant la vida humana?'),
      s: T('Porque ya no hacía falta moverse para buscar comida: la gente se quedó a vivir en poblados, la población creció, sobraban alimentos para guardar e intercambiar y aparecieron oficios nuevos.', 'Because people no longer had to move around to find food: they settled in villages, the population grew, there was surplus food to store and trade, and new trades appeared.', 'Perquè ja no calia moure’s per buscar menjar: la gent es va quedar a viure en poblats, la població va créixer, sobraven aliments per guardar i intercanviar i van aparèixer oficis nous.') },
    { e: T('¿Qué es un dolmen?', 'What is a dolmen?', 'Què és un dolmen?'),
      s: T('Un monumento megalítico de grandes piedras verticales con una losa encima, que servía de tumba colectiva.', 'A megalithic monument of large upright stones with a slab on top, used as a collective tomb.', 'Un monument megalític de grans pedres verticals amb una llosa a sobre, que servia de tomba col·lectiva.') },
  ],
}

const usa = {
  metaTitle: L('Historia de Estados Unidos: independencia, Constitución, Guerra de Secesión y derechos civiles — resumen', 'US history: independence, the Constitution, the Civil War and civil rights — summary and practice questions', 'Història dels Estats Units: independència, Constitució, Guerra de Secessió i drets civils — resum i exercicis'),
  secciones: [
    {
      titulo: L('Fechas clave', 'Key dates', 'Dates clau'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          ['1607', L('Jamestown (Virginia), primera colonia inglesa estable', 'Jamestown (Virginia), the first permanent English colony', 'Jamestown (Virgínia), primera colònia anglesa estable')],
          ['1620', L('llega el Mayflower con los peregrinos a Nueva Inglaterra', 'the Mayflower brings the Pilgrims to New England', 'arriba el Mayflower amb els pelegrins a Nova Anglaterra')],
          ['1776', L('4 de julio: Declaración de Independencia de las trece colonias', '4 July: the thirteen colonies’ Declaration of Independence', '4 de juliol: Declaració d’Independència de les tretze colònies')],
          ['1783', L('Tratado de París: Gran Bretaña reconoce la independencia', 'Treaty of Paris: Britain recognises independence', 'Tractat de París: la Gran Bretanya reconeix la independència')],
          ['1787', L('Constitución de los Estados Unidos; George Washington, primer presidente (1789)', 'the US Constitution; George Washington, first president (1789)', 'Constitució dels Estats Units; George Washington, primer president (1789)')],
          ['1861-1865', L('Guerra de Secesión entre el Norte (la Unión) y el Sur (la Confederación); Lincoln; se abole la esclavitud (1865)', 'Civil War between the North (Union) and South (Confederacy); Lincoln; slavery is abolished (1865)', 'Guerra de Secessió entre el Nord (la Unió) i el Sud (la Confederació); Lincoln; s’aboleix l’esclavitud (1865)')],
          ['1929', L('crac de la Bolsa y Gran Depresión', 'Wall Street Crash and the Great Depression', 'crac de la Borsa i Gran Depressió')],
          ['1941', L('ataque japonés a Pearl Harbor: EE. UU. entra en la Segunda Guerra Mundial', 'Japanese attack on Pearl Harbor: the USA enters the Second World War', 'atac japonès a Pearl Harbor: els EUA entren a la Segona Guerra Mundial')],
          [L('1955-1968', '1955-1968', '1955-1968'), L('movimiento por los derechos civiles (Rosa Parks, Martin Luther King)', 'the civil rights movement (Rosa Parks, Martin Luther King)', 'moviment pels drets civils (Rosa Parks, Martin Luther King)')],
          ['1969', L('el Apolo 11 llega a la Luna', 'Apollo 11 lands on the Moon', 'l’Apol·lo 11 arriba a la Lluna')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('¿Por qué el 4 de julio es la fiesta nacional de Estados Unidos?', 'Why is 4 July the national holiday in the United States?', 'Per què el 4 de juliol és la festa nacional dels Estats Units?'),
      s: T('Porque el 4 de julio de 1776 las trece colonias aprobaron la Declaración de Independencia frente a Gran Bretaña.', 'Because on 4 July 1776 the thirteen colonies adopted the Declaration of Independence from Britain.', 'Perquè el 4 de juliol de 1776 les tretze colònies van aprovar la Declaració d’Independència davant la Gran Bretanya.') },
    { e: T('¿Quiénes se enfrentaron en la Guerra de Secesión y por qué?', 'Who fought in the Civil War, and why?', 'Qui es va enfrontar a la Guerra de Secessió i per què?'),
      s: T('Los estados del Norte (la Unión) contra los del Sur (la Confederación), sobre todo por la esclavitud, en la que se basaba la economía de las plantaciones del Sur. Ganó el Norte y la esclavitud se abolió en 1865.', 'The Northern states (the Union) against the Southern states (the Confederacy), mainly over slavery, on which the Southern plantation economy depended. The North won and slavery was abolished in 1865.', 'Els estats del Nord (la Unió) contra els del Sud (la Confederació), sobretot per l’esclavitud, en què es basava l’economia de les plantacions del Sud. Va guanyar el Nord i l’esclavitud es va abolir el 1865.') },
    { e: T('Ordena: Pearl Harbor, Declaración de Independencia, llegada a la Luna, Guerra de Secesión, crac del 29.', 'Put in order: Pearl Harbor, the Declaration of Independence, the Moon landing, the Civil War, the 1929 crash.', 'Ordena: Pearl Harbor, Declaració d’Independència, arribada a la Lluna, Guerra de Secessió, crac del 29.'),
      s: T('Declaración de Independencia (1776) → Guerra de Secesión (1861-1865) → crac del 29 → Pearl Harbor (1941) → llegada a la Luna (1969).', 'Declaration of Independence (1776) → Civil War (1861-1865) → 1929 crash → Pearl Harbor (1941) → Moon landing (1969).', 'Declaració d’Independència (1776) → Guerra de Secessió (1861-1865) → crac del 29 → Pearl Harbor (1941) → arribada a la Lluna (1969).') },
  ],
}

const celula = {
  metaTitle: L('La célula: partes y orgánulos, célula animal y vegetal, procariota y eucariota — resumen y ejercicios', 'The cell: parts and organelles, animal and plant cells, prokaryotes and eukaryotes — summary and practice', 'La cèl·lula: parts i orgànuls, cèl·lula animal i vegetal, procariota i eucariota — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los orgánulos y para qué sirven', 'The organelles and what they do', 'Els orgànuls i per a què serveixen'),
      tabla: {
        columnas: L(['Parte', 'Función', 'Animal', 'Vegetal'], ['Part', 'Job', 'Animal', 'Plant'], ['Part', 'Funció', 'Animal', 'Vegetal']),
        filas: [
          [L('Membrana plasmática', 'Cell membrane', 'Membrana plasmàtica'), L('envuelve la célula y controla lo que entra y sale', 'surrounds the cell and controls what goes in and out', 'embolcalla la cèl·lula i controla el que entra i surt'), '✓', '✓'],
          [L('Núcleo', 'Nucleus', 'Nucli'), L('guarda el ADN y dirige la célula', 'holds the DNA and controls the cell', 'guarda l’ADN i dirigeix la cèl·lula'), '✓', '✓'],
          [L('Citoplasma', 'Cytoplasm', 'Citoplasma'), L('el interior, donde están los orgánulos', 'the inside, where the organelles are', 'l’interior, on hi ha els orgànuls'), '✓', '✓'],
          [L('Mitocondria', 'Mitochondrion', 'Mitocondri'), L('respiración celular: saca energía de los nutrientes', 'cellular respiration: gets energy from nutrients', 'respiració cel·lular: treu energia dels nutrients'), '✓', '✓'],
          [L('Ribosomas', 'Ribosomes', 'Ribosomes'), L('fabrican proteínas', 'make proteins', 'fabriquen proteïnes'), '✓', '✓'],
          [L('Cloroplasto', 'Chloroplast', 'Cloroplast'), L('fotosíntesis', 'photosynthesis', 'fotosíntesi'), '—', '✓'],
          [L('Pared celular', 'Cell wall', 'Paret cel·lular'), L('capa rígida de celulosa que da forma y protege', 'rigid layer of cellulose that gives shape and protection', 'capa rígida de cel·lulosa que dona forma i protegeix'), '—', '✓'],
          [L('Vacuola', 'Vacuole', 'Vacúol'), L('almacena agua y sustancias', 'stores water and substances', 'emmagatzema aigua i substàncies'), L('pequeñas', 'small', 'petits'), L('una grande', 'one large', 'un de gran')],
        ],
      },
      lista: L(
        ['Célula procariota: sin núcleo (el ADN está suelto en el citoplasma) y sin orgánulos con membrana; son las bacterias.', 'Célula eucariota: con núcleo y orgánulos; la tienen animales, plantas, hongos y protoctistas.', 'Todos los seres vivos están formados por células, y toda célula procede de otra célula (teoría celular).'],
        ['Prokaryotic cell: no nucleus (the DNA lies free in the cytoplasm) and no membrane-bound organelles; these are bacteria.', 'Eukaryotic cell: with a nucleus and organelles; found in animals, plants, fungi and protoctists.', 'All living things are made of cells, and every cell comes from another cell (cell theory).'],
        ['Cèl·lula procariota: sense nucli (l’ADN és lliure al citoplasma) i sense orgànuls amb membrana; són els bacteris.', 'Cèl·lula eucariota: amb nucli i orgànuls; la tenen animals, plantes, fongs i protoctists.', 'Tots els éssers vius estan formats per cèl·lules, i tota cèl·lula prové d’una altra cèl·lula (teoria cel·lular).'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Di tres diferencias entre la célula animal y la vegetal.', 'Give three differences between animal and plant cells.', 'Digues tres diferències entre la cèl·lula animal i la vegetal.'),
      s: T('La vegetal tiene pared celular, cloroplastos y una vacuola grande; la animal no tiene pared ni cloroplastos y sus vacuolas son pequeñas.', 'Plant cells have a cell wall, chloroplasts and one large vacuole; animal cells have no wall or chloroplasts, and their vacuoles are small.', 'La vegetal té paret cel·lular, cloroplasts i un vacúol gran; l’animal no té paret ni cloroplasts i els seus vacúols són petits.') },
    { e: T('¿Qué orgánulo tienen tanto las células animales como las vegetales para obtener energía?', 'Which organelle do both animal and plant cells have to obtain energy?', 'Quin orgànul tenen tant les cèl·lules animals com les vegetals per obtenir energia?'),
      s: T('Las mitocondrias, donde se hace la respiración celular. Las plantas tienen además cloroplastos, pero también respiran.', 'Mitochondria, where cellular respiration happens. Plants also have chloroplasts, but they still respire.', 'Els mitocondris, on es fa la respiració cel·lular. Les plantes tenen a més cloroplasts, però també respiren.') },
    { e: T('Una célula no tiene núcleo y su ADN está en el citoplasma. ¿Qué tipo de célula es y qué ser vivo puede ser?', 'A cell has no nucleus and its DNA is in the cytoplasm. What type of cell is it, and what living thing could it be?', 'Una cèl·lula no té nucli i el seu ADN és al citoplasma. Quin tipus de cèl·lula és i quin ésser viu pot ser?'),
      s: T('Es procariota: una bacteria.', 'It is prokaryotic: a bacterium.', 'És procariota: un bacteri.') },
  ],
}

const genetica = {
  metaTitle: L('Genética: ADN, genes, cromosomas, leyes de Mendel y cuadros de Punnett — resumen y ejercicios', 'Genetics: DNA, genes, chromosomes, Mendel’s laws and Punnett squares — summary and practice questions', 'Genètica: ADN, gens, cromosomes, lleis de Mendel i quadres de Punnett — resum i exercicis'),
  secciones: [
    {
      titulo: L('Vocabulario básico', 'Key terms', 'Vocabulari bàsic'),
      tabla: {
        columnas: L(['Término', 'Qué es'], ['Term', 'What it is'], ['Terme', 'Què és']),
        filas: [
          [L('ADN', 'DNA', 'ADN'), L('la molécula que lleva la información hereditaria; forma una doble hélice', 'the molecule carrying hereditary information; it forms a double helix', 'la molècula que porta la informació hereditària; forma una doble hèlix')],
          [L('Gen', 'Gene', 'Gen'), L('un trozo de ADN con la información para un carácter (por ejemplo, el color de ojos)', 'a stretch of DNA with the information for one trait (e.g. eye colour)', 'un tros d’ADN amb la informació per a un caràcter (per exemple, el color dels ulls)')],
          [L('Cromosoma', 'Chromosome', 'Cromosoma'), L('ADN muy empaquetado; los humanos tenemos 46, en 23 parejas', 'tightly packed DNA; humans have 46, in 23 pairs', 'ADN molt empaquetat; els humans en tenim 46, en 23 parelles')],
          [L('Alelos', 'Alleles', 'Al·lels'), L('las versiones de un gen; el dominante (A) se impone al recesivo (a)', 'the versions of a gene; the dominant one (A) masks the recessive one (a)', 'les versions d’un gen; el dominant (A) s’imposa al recessiu (a)')],
          [L('Homocigoto / heterocigoto', 'Homozygous / heterozygous', 'Homozigot / heterozigot'), L('dos alelos iguales (AA, aa) / distintos (Aa)', 'two identical alleles (AA, aa) / different ones (Aa)', 'dos al·lels iguals (AA, aa) / diferents (Aa)')],
          [L('Genotipo / fenotipo', 'Genotype / phenotype', 'Genotip / fenotip'), L('los alelos que tiene / lo que se ve', 'the alleles it carries / what you can see', 'els al·lels que té / el que es veu')],
        ],
      },
      lista: L(
        ['1.ª ley de Mendel: al cruzar dos razas puras distintas (AA × aa), todos los hijos son iguales (Aa).', '2.ª ley: al cruzar dos híbridos (Aa × Aa), reaparece el carácter recesivo: 3 dominantes por cada recesivo (3 : 1).', '3.ª ley: dos caracteres distintos se heredan por separado (9 : 3 : 3 : 1 al cruzar dos dihíbridos).', 'Mitosis: una célula da dos iguales a ella (crecer, reparar). Meiosis: da cuatro células con la mitad de cromosomas (los gametos).'],
        ['Mendel’s 1st law: crossing two different pure lines (AA × aa), all the offspring are the same (Aa).', '2nd law: crossing two hybrids (Aa × Aa), the recessive trait reappears: 3 dominant for every recessive (3 : 1).', '3rd law: two different traits are inherited independently (9 : 3 : 3 : 1 when crossing two dihybrids).', 'Mitosis: one cell makes two identical cells (growth, repair). Meiosis: it makes four cells with half the chromosomes (the gametes).'],
        ['1a llei de Mendel: en creuar dues races pures diferents (AA × aa), tots els fills són iguals (Aa).', '2a llei: en creuar dos híbrids (Aa × Aa), reapareix el caràcter recessiu: 3 dominants per cada recessiu (3 : 1).', '3a llei: dos caràcters diferents s’hereten per separat (9 : 3 : 3 : 1 en creuar dos dihíbrids).', 'Mitosi: una cèl·lula en dona dues d’iguals a ella (créixer, reparar). Meiosi: en dona quatre amb la meitat de cromosomes (els gàmetes).'],
      ),
    },
  ],
  ejercicios: [
    { e: T('En los guisantes, liso (A) domina sobre rugoso (a). ¿Qué sale al cruzar Aa × Aa?', 'In peas, smooth (A) is dominant over wrinkled (a). What do you get from Aa × Aa?', 'En els pèsols, llis (A) domina sobre rugós (a). Què surt en creuar Aa × Aa?'),
      s: T('Cuadro de Punnett: 1 AA, 2 Aa y 1 aa. Fenotipos: 3 lisos por cada rugoso (75 % lisos, 25 % rugosos).', 'Punnett square: 1 AA, 2 Aa and 1 aa. Phenotypes: 3 smooth for every wrinkled (75 % smooth, 25 % wrinkled).', 'Quadre de Punnett: 1 AA, 2 Aa i 1 aa. Fenotips: 3 llisos per cada rugós (75 % llisos, 25 % rugosos).') },
    { e: T('¿Qué probabilidad hay de que un bebé sea niña? Razónalo con los cromosomas sexuales.', 'What is the probability that a baby is a girl? Explain using the sex chromosomes.', 'Quina probabilitat hi ha que un nadó sigui nena? Raona-ho amb els cromosomes sexuals.'),
      s: T('La madre es XX y solo da óvulos X; el padre es XY y da la mitad de espermatozoides X y la mitad Y. XX (niña) o XY (niño): 50 %.', 'The mother is XX and only makes X eggs; the father is XY and makes half X sperm and half Y. XX (girl) or XY (boy): 50 %.', 'La mare és XX i només dona òvuls X; el pare és XY i dona la meitat d’espermatozoides X i la meitat Y. XX (nena) o XY (nen): 50 %.') },
    { e: T('Una planta de flor roja (dominante) se cruza con una blanca (aa) y todos los hijos salen rojos. ¿Cuál era el genotipo de la roja?', 'A red-flowered plant (dominant) is crossed with a white one (aa) and all the offspring are red. What was the red plant’s genotype?', 'Una planta de flor vermella (dominant) es creua amb una de blanca (aa) i tots els fills surten vermells. Quin era el genotip de la vermella?'),
      s: T('AA. Si hubiera sido Aa, la mitad de los hijos habrían sido aa, blancos.', 'AA. If it had been Aa, half the offspring would have been aa, white.', 'AA. Si hagués estat Aa, la meitat dels fills haurien estat aa, blancs.') },
  ],
}

const ecosistemas = {
  metaTitle: L('Los ecosistemas: biotopo y biocenosis, cadenas tróficas y relaciones entre seres vivos — resumen y ejercicios', 'Ecosystems: habitat and community, food chains and relationships between living things — summary and practice', 'Els ecosistemes: biòtop i biocenosi, cadenes tròfiques i relacions entre éssers vius — resum i exercicis'),
  secciones: [
    {
      titulo: L('Niveles tróficos', 'Trophic levels', 'Nivells tròfics'),
      tabla: {
        columnas: L(['Nivel', 'Qué come', 'Ejemplos'], ['Level', 'What it eats', 'Examples'], ['Nivell', 'Què menja', 'Exemples']),
        filas: [
          [L('Productores', 'Producers', 'Productors'), L('fabrican su alimento (fotosíntesis)', 'make their own food (photosynthesis)', 'fabriquen el seu aliment (fotosíntesi)'), L('plantas, algas', 'plants, algae', 'plantes, algues')],
          [L('Consumidores primarios', 'Primary consumers', 'Consumidors primaris'), L('productores (herbívoros)', 'producers (herbivores)', 'productors (herbívors)'), L('conejo, saltamontes, vaca', 'rabbit, grasshopper, cow', 'conill, llagosta, vaca')],
          [L('Consumidores secundarios', 'Secondary consumers', 'Consumidors secundaris'), L('herbívoros (carnívoros)', 'herbivores (carnivores)', 'herbívors (carnívors)'), L('zorro, rana, araña', 'fox, frog, spider', 'guineu, granota, aranya')],
          [L('Consumidores terciarios', 'Tertiary consumers', 'Consumidors terciaris'), L('otros carnívoros', 'other carnivores', 'altres carnívors'), L('águila, lobo', 'eagle, wolf', 'àguila, llop')],
          [L('Descomponedores', 'Decomposers', 'Descomponedors'), L('restos y cadáveres, que devuelven al suelo como sales minerales', 'remains and dead bodies, returning them to the soil as minerals', 'restes i cadàvers, que retornen al sòl com a sals minerals'), L('hongos, bacterias', 'fungi, bacteria', 'fongs, bacteris')],
        ],
      },
      texto: L(
        ['Un ecosistema está formado por el biotopo (el medio físico: agua, suelo, clima) y la biocenosis (los seres vivos que viven en él). En cada paso de la cadena solo pasa alrededor del 10 % de la energía al nivel siguiente: por eso hay muchas más plantas que herbívoros, y muchos más herbívoros que carnívoros.'],
        ['An ecosystem is made up of the habitat (the physical environment: water, soil, climate) and the community (the living things in it). At each step of the food chain only about 10 % of the energy passes to the next level: that is why there are far more plants than herbivores, and far more herbivores than carnivores.'],
        ['Un ecosistema està format pel biòtop (el medi físic: aigua, sòl, clima) i la biocenosi (els éssers vius que hi viuen). A cada pas de la cadena només passa al voltant del 10 % de l’energia al nivell següent: per això hi ha moltes més plantes que herbívors, i molts més herbívors que carnívors.'],
      ),
    },
    {
      titulo: L('Relaciones entre especies', 'Relationships between species', 'Relacions entre espècies'),
      tabla: {
        columnas: L(['Relación', 'Qué pasa', 'Ejemplo'], ['Relationship', 'What happens', 'Example'], ['Relació', 'Què passa', 'Exemple']),
        filas: [
          [L('Depredación', 'Predation', 'Depredació'), L('uno caza y se come al otro', 'one hunts and eats the other', 'un caça i es menja l’altre'), L('lince y conejo', 'lynx and rabbit', 'linx i conill')],
          [L('Parasitismo', 'Parasitism', 'Parasitisme'), L('uno vive a costa del otro y lo perjudica', 'one lives off the other and harms it', 'un viu a costa de l’altre i el perjudica'), L('pulga y perro', 'flea and dog', 'puça i gos')],
          [L('Mutualismo', 'Mutualism', 'Mutualisme'), L('los dos salen ganando', 'both benefit', 'tots dos hi guanyen'), L('abeja y flor', 'bee and flower', 'abella i flor')],
          [L('Comensalismo', 'Commensalism', 'Comensalisme'), L('uno gana y al otro le da igual', 'one benefits and the other is unaffected', 'un hi guanya i a l’altre li és igual'), L('rémora y tiburón', 'remora and shark', 'rèmora i tauró')],
          [L('Competencia', 'Competition', 'Competència'), L('luchan por el mismo recurso', 'they compete for the same resource', 'lluiten pel mateix recurs'), L('dos plantas por la luz', 'two plants for light', 'dues plantes per la llum')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Ordena la cadena y di el nivel de cada uno: zorro, hierba, águila, conejo.', 'Order the chain and give each one’s level: fox, grass, eagle, rabbit.', 'Ordena la cadena i digues el nivell de cadascun: guineu, herba, àguila, conill.'),
      s: T('Hierba (productor) → conejo (consumidor primario) → zorro (secundario) → águila (terciario).', 'Grass (producer) → rabbit (primary consumer) → fox (secondary) → eagle (tertiary).', 'Herba (productor) → conill (consumidor primari) → guineu (secundari) → àguila (terciari).') },
    { e: T('Si las plantas de un ecosistema tienen 10.000 unidades de energía, ¿cuánta llega a los consumidores secundarios?', 'If the plants in an ecosystem hold 10,000 units of energy, how much reaches the secondary consumers?', 'Si les plantes d’un ecosistema tenen 10.000 unitats d’energia, quanta n’arriba als consumidors secundaris?'),
      s: T('Un 10 % en cada paso: 10.000 → 1.000 (herbívoros) → 100 (consumidores secundarios).', 'About 10 % at each step: 10,000 → 1,000 (herbivores) → 100 (secondary consumers).', 'Un 10 % a cada pas: 10.000 → 1.000 (herbívors) → 100 (consumidors secundaris).') },
    { e: T('¿Qué pasaría si desaparecieran los descomponedores?', 'What would happen if the decomposers disappeared?', 'Què passaria si desapareguessin els descomponedors?'),
      s: T('Los restos se acumularían y las sales minerales no volverían al suelo, así que las plantas se quedarían sin nutrientes y, con ellas, toda la cadena.', 'Remains would pile up and minerals would not return to the soil, so plants would run out of nutrients, and with them the whole chain.', 'Les restes s’acumularien i les sals minerals no tornarien al sòl, així que les plantes es quedarien sense nutrients i, amb elles, tota la cadena.') },
  ],
}

export const AMPLIACION_T7 = {
  'rocas-minerales': rocas, 'mezclas-separacion': mezclas, entreguerras, prehistoria, usa, celula, genetica, ecosistemas,
}
