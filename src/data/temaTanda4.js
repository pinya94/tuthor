// Cuarta tanda del autocompletado (16-nov-2026). Ampliaciones de páginas que
// ya existían (se suman en AMPLIACION, temaAmpliado.js): geometría con los
// volúmenes, el cuerpo humano con el aparato circulatorio, la Edad Antigua con
// Grecia; la oración compuesta, que se añade a la sintaxis
// (temaAmpliadoCiencias.js); y dos páginas: enteros y racionales
// (MATEMATICAS_AMPLIADO) y la descripción (ESTUDIO_EXTRA).
//
// En los temas de lengua el MATERIAL (frases y textos de ejemplo) va en
// castellano en los tres idiomas; solo se traduce la prosa.
const T = (es, en, ca) => ({ es, en, ca })
const L = T

// ── GEOMETRÍA: CUERPOS GEOMÉTRICOS ────────────────────────────────────────

const geometria = {
  metaTitle: L('Geometría: áreas, perímetros y volúmenes de figuras y cuerpos geométricos (fórmulas) — resumen y ejercicios', 'Geometry: area, perimeter and volume of shapes and solids (formulas) — summary and practice questions', 'Geometria: àrees, perímetres i volums de figures i cossos geomètrics (fórmules) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Áreas y volúmenes de los cuerpos geométricos', 'Surface area and volume of solids', 'Àrees i volums dels cossos geomètrics'),
      tabla: {
        columnas: L(['Cuerpo', 'Área total', 'Volumen'], ['Solid', 'Total surface area', 'Volume'], ['Cos', 'Àrea total', 'Volum']),
        filas: [
          [L('Cubo (arista a)', 'Cube (edge a)', 'Cub (aresta a)'), '6a²', 'a³'],
          [L('Prisma', 'Prism', 'Prisma'), L('área lateral + 2 · área de la base', 'lateral area + 2 · base area', 'àrea lateral + 2 · àrea de la base'), L('área de la base · altura', 'base area · height', 'àrea de la base · alçada')],
          [L('Cilindro (radio r, altura h)', 'Cylinder (radius r, height h)', 'Cilindre (radi r, alçada h)'), '2πr · h + 2πr²', 'πr² · h'],
          [L('Pirámide', 'Pyramid', 'Piràmide'), L('área de la base + área de las caras laterales', 'base area + area of the side faces', 'àrea de la base + àrea de les cares laterals'), L('(área de la base · altura) / 3', '(base area · height) / 3', '(àrea de la base · alçada) / 3')],
          [L('Cono (radio r, altura h, generatriz g)', 'Cone (radius r, height h, slant height g)', 'Con (radi r, alçada h, generatriu g)'), 'πr · g + πr²', '(πr² · h) / 3'],
          [L('Esfera (radio r)', 'Sphere (radius r)', 'Esfera (radi r)'), '4πr²', '(4/3) · πr³'],
        ],
      },
      lista: L(
        ['El volumen se mide en unidades cúbicas: cm³, dm³, m³.', 'Capacidad y volumen: 1 L = 1 dm³ = 1000 cm³, y 1 m³ = 1000 L.', 'Una pirámide o un cono tienen un tercio del volumen del prisma o el cilindro con la misma base y altura.'],
        ['Volume is measured in cubic units: cm³, dm³, m³.', 'Capacity and volume: 1 L = 1 dm³ = 1000 cm³, and 1 m³ = 1000 L.', 'A pyramid or cone has a third of the volume of the prism or cylinder with the same base and height.'],
        ['El volum es mesura en unitats cúbiques: cm³, dm³, m³.', 'Capacitat i volum: 1 L = 1 dm³ = 1000 cm³, i 1 m³ = 1000 L.', 'Una piràmide o un con tenen un terç del volum del prisma o el cilindre amb la mateixa base i alçada.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Un cubo tiene 3 cm de arista. Calcula su área total y su volumen.', 'A cube has 3 cm edges. Work out its total surface area and its volume.', 'Un cub té 3 cm d’aresta. Calcula’n l’àrea total i el volum.'),
      s: T('Área = 6 · 3² = 54 cm². Volumen = 3³ = 27 cm³.', 'Area = 6 · 3² = 54 cm². Volume = 3³ = 27 cm³.', 'Àrea = 6 · 3² = 54 cm². Volum = 3³ = 27 cm³.') },
    { e: T('¿Cuántos litros caben en una caja de 20 cm × 10 cm × 5 cm?', 'How many litres fit in a 20 cm × 10 cm × 5 cm box?', 'Quants litres hi caben en una capsa de 20 cm × 10 cm × 5 cm?'),
      s: T('V = 20 · 10 · 5 = 1000 cm³ = 1 dm³ = 1 L.', 'V = 20 · 10 · 5 = 1000 cm³ = 1 dm³ = 1 L.', 'V = 20 · 10 · 5 = 1000 cm³ = 1 dm³ = 1 L.') },
    { e: T('Calcula el volumen de un cilindro de radio 2 cm y altura 5 cm.', 'Work out the volume of a cylinder with radius 2 cm and height 5 cm.', 'Calcula el volum d’un cilindre de radi 2 cm i alçada 5 cm.'),
      s: T('V = π · 2² · 5 = 20π ≈ 62,8 cm³.', 'V = π · 2² · 5 = 20π ≈ 62.8 cm³.', 'V = π · 2² · 5 = 20π ≈ 62,8 cm³.') },
    { e: T('Un cono tiene radio 3 cm y altura 4 cm. Calcula su volumen y su área lateral.', 'A cone has radius 3 cm and height 4 cm. Work out its volume and its curved surface area.', 'Un con té radi 3 cm i alçada 4 cm. Calcula’n el volum i l’àrea lateral.'),
      s: T('V = π · 9 · 4 / 3 = 12π ≈ 37,7 cm³. La generatriz sale por Pitágoras: g = √(3² + 4²) = 5 cm. Área lateral = π · 3 · 5 = 15π ≈ 47,1 cm².', 'V = π · 9 · 4 / 3 = 12π ≈ 37.7 cm³. The slant height comes from Pythagoras: g = √(3² + 4²) = 5 cm. Curved area = π · 3 · 5 = 15π ≈ 47.1 cm².', 'V = π · 9 · 4 / 3 = 12π ≈ 37,7 cm³. La generatriu surt per Pitàgores: g = √(3² + 4²) = 5 cm. Àrea lateral = π · 3 · 5 = 15π ≈ 47,1 cm².') },
    { e: T('Calcula el volumen de una esfera de 3 cm de radio.', 'Work out the volume of a sphere with a 3 cm radius.', 'Calcula el volum d’una esfera de 3 cm de radi.'),
      s: T('V = (4/3) · π · 3³ = 36π ≈ 113,1 cm³.', 'V = (4/3) · π · 3³ = 36π ≈ 113.1 cm³.', 'V = (4/3) · π · 3³ = 36π ≈ 113,1 cm³.') },
  ],
}

// ── EL CUERPO HUMANO ──────────────────────────────────────────────────────

const cuerpoHumano = {
  metaTitle: L('El cuerpo humano: aparatos digestivo, respiratorio, circulatorio, excretor y nervioso — resumen y ejercicios', 'The human body: digestive, respiratory, circulatory, excretory and nervous systems — summary and practice questions', 'El cos humà: aparells digestiu, respiratori, circulatori, excretor i nerviós — resum i exercicis'),
  secciones: [
    {
      titulo: L('Funciones, aparatos y órganos', 'Functions, systems and organs', 'Funcions, aparells i òrgans'),
      tabla: {
        columnas: L(['Función', 'Aparato o sistema', 'Qué hace', 'Órganos principales'], ['Function', 'System', 'What it does', 'Main organs'], ['Funció', 'Aparell o sistema', 'Què fa', 'Òrgans principals']),
        filas: [
          [L('Nutrición', 'Nutrition', 'Nutrició'), L('Digestivo', 'Digestive', 'Digestiu'), L('transforma los alimentos en nutrientes y los absorbe', 'breaks food down into nutrients and absorbs them', 'transforma els aliments en nutrients i els absorbeix'), L('boca, esófago, estómago, intestinos, hígado, páncreas', 'mouth, oesophagus, stomach, intestines, liver, pancreas', 'boca, esòfag, estómac, intestins, fetge, pàncrees')],
          [L('Nutrición', 'Nutrition', 'Nutrició'), L('Respiratorio', 'Respiratory', 'Respiratori'), L('toma oxígeno del aire y expulsa dióxido de carbono', 'takes oxygen from the air and gets rid of carbon dioxide', 'pren oxigen de l’aire i expulsa diòxid de carboni'), L('fosas nasales, faringe, laringe, tráquea, bronquios, pulmones', 'nasal passages, pharynx, larynx, trachea, bronchi, lungs', 'fosses nasals, faringe, laringe, tràquea, bronquis, pulmons')],
          [L('Nutrición', 'Nutrition', 'Nutrició'), L('Circulatorio', 'Circulatory', 'Circulatori'), L('lleva nutrientes y oxígeno a las células y recoge sus desechos', 'carries nutrients and oxygen to the cells and collects their waste', 'porta nutrients i oxigen a les cèl·lules i en recull els residus'), L('corazón, arterias, venas, capilares, sangre', 'heart, arteries, veins, capillaries, blood', 'cor, artèries, venes, capil·lars, sang')],
          [L('Nutrición', 'Nutrition', 'Nutrició'), L('Excretor', 'Excretory', 'Excretor'), L('filtra la sangre y elimina los desechos en la orina', 'filters the blood and removes waste in urine', 'filtra la sang i elimina els residus en l’orina'), L('riñones, uréteres, vejiga, uretra (y la piel, con el sudor)', 'kidneys, ureters, bladder, urethra (and the skin, through sweat)', 'ronyons, urèters, bufeta, uretra (i la pell, amb la suor)')],
          [L('Relación', 'Interaction', 'Relació'), L('Nervioso', 'Nervous', 'Nerviós'), L('recibe la información de los sentidos y da órdenes', 'receives information from the senses and sends out orders', 'rep la informació dels sentits i dona ordres'), L('encéfalo, médula espinal, nervios', 'brain, spinal cord, nerves', 'encèfal, medul·la espinal, nervis')],
          [L('Relación', 'Interaction', 'Relació'), L('Locomotor', 'Musculoskeletal', 'Locomotor'), L('sostiene el cuerpo y permite moverse', 'supports the body and lets it move', 'sosté el cos i permet moure’s'), L('huesos, músculos, articulaciones', 'bones, muscles, joints', 'ossos, músculs, articulacions')],
          [L('Reproducción', 'Reproduction', 'Reproducció'), L('Reproductor', 'Reproductive', 'Reproductor'), L('produce las células sexuales y permite tener descendencia', 'makes sex cells and makes it possible to have children', 'produeix les cèl·lules sexuals i permet tenir descendència'), L('ovarios, útero / testículos, pene', 'ovaries, uterus / testes, penis', 'ovaris, úter / testicles, penis')],
        ],
      },
    },
    {
      titulo: L('El aparato circulatorio', 'The circulatory system', 'L’aparell circulatori'),
      tabla: {
        columnas: L(['Parte', 'Cómo es', 'Para qué sirve'], ['Part', 'What it is like', 'What it is for'], ['Part', 'Com és', 'Per a què serveix']),
        filas: [
          [L('Corazón', 'Heart', 'Cor'), L('un músculo con cuatro cavidades: dos aurículas arriba y dos ventrículos abajo', 'a muscle with four chambers: two atria above and two ventricles below', 'un múscul amb quatre cavitats: dues aurícules a dalt i dos ventricles a baix'), L('bombea la sangre (unas 70 veces por minuto en reposo)', 'pumps the blood (about 70 times a minute at rest)', 'bombeja la sang (unes 70 vegades per minut en repòs)')],
          [L('Arterias', 'Arteries', 'Artèries'), L('vasos de pared gruesa y elástica', 'thick-walled, elastic vessels', 'vasos de paret gruixuda i elàstica'), L('llevan la sangre desde el corazón al cuerpo', 'carry blood away from the heart', 'porten la sang des del cor al cos')],
          [L('Venas', 'Veins', 'Venes'), L('vasos de pared más fina, con válvulas', 'thinner-walled vessels with valves', 'vasos de paret més fina, amb vàlvules'), L('devuelven la sangre al corazón', 'bring blood back to the heart', 'retornen la sang al cor')],
          [L('Capilares', 'Capillaries', 'Capil·lars'), L('vasos finísimos entre arterias y venas', 'very fine vessels between arteries and veins', 'vasos finíssims entre artèries i venes'), L('allí la sangre deja oxígeno y nutrientes y recoge desechos', 'where blood drops off oxygen and nutrients and picks up waste', 'allà la sang deixa oxigen i nutrients i recull residus')],
          [L('Sangre', 'Blood', 'Sang'), L('plasma con glóbulos rojos, glóbulos blancos y plaquetas', 'plasma with red cells, white cells and platelets', 'plasma amb glòbuls vermells, glòbuls blancs i plaquetes'), L('los rojos llevan el oxígeno; los blancos defienden; las plaquetas taponan las heridas', 'red cells carry oxygen; white cells defend; platelets plug wounds', 'els vermells porten l’oxigen; els blancs defensen; les plaquetes tapen les ferides')],
        ],
      },
      texto: L(
        ['La circulación es doble y cerrada. En la circulación menor o pulmonar, la sangre va del ventrículo derecho a los pulmones, se carga de oxígeno y vuelve a la aurícula izquierda. En la mayor o general, sale del ventrículo izquierdo por la arteria aorta, recorre todo el cuerpo y vuelve por las venas cavas a la aurícula derecha.'],
        ['Circulation is double and closed. In the pulmonary circuit, blood goes from the right ventricle to the lungs, picks up oxygen and returns to the left atrium. In the systemic circuit, it leaves the left ventricle through the aorta, travels round the whole body and comes back through the venae cavae to the right atrium.'],
        ['La circulació és doble i tancada. En la circulació menor o pulmonar, la sang va del ventricle dret als pulmons, es carrega d’oxigen i torna a l’aurícula esquerra. En la major o general, surt del ventricle esquerre per l’artèria aorta, recorre tot el cos i torna per les venes caves a l’aurícula dreta.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Las arterias llevan siempre sangre rica en oxígeno?', 'Do arteries always carry oxygen-rich blood?', 'Les artèries porten sempre sang rica en oxigen?'),
      r: T('No. Lo que define una arteria es que sale del corazón. La arteria pulmonar lleva a los pulmones sangre pobre en oxígeno, y las venas pulmonares traen de vuelta sangre ya oxigenada.', 'No. What makes a vessel an artery is that it leaves the heart. The pulmonary artery carries oxygen-poor blood to the lungs, and the pulmonary veins bring back oxygenated blood.', 'No. El que defineix una artèria és que surt del cor. L’artèria pulmonar porta als pulmons sang pobra en oxigen, i les venes pulmonars en tornen sang ja oxigenada.') },
    { p: T('¿Dónde pasan los nutrientes a la sangre?', 'Where do nutrients pass into the blood?', 'On passen els nutrients a la sang?'),
      r: T('En el intestino delgado, que tiene la pared llena de pliegues y vellosidades para tener mucha superficie. Lo que no se absorbe pasa al intestino grueso, donde se recupera agua y se forman las heces.', 'In the small intestine, whose wall is full of folds and villi to give a large surface. Whatever is not absorbed goes to the large intestine, where water is taken back and faeces form.', 'A l’intestí prim, que té la paret plena de plecs i vellositats per tenir molta superfície. El que no s’absorbeix passa a l’intestí gros, on es recupera aigua i es formen els excrements.') },
  ],
  ejercicios: [
    { e: T('Ordena el camino del aire al respirar: bronquios, fosas nasales, alvéolos, tráquea, faringe, laringe.', 'Put the path of air when breathing in order: bronchi, nasal passages, alveoli, trachea, pharynx, larynx.', 'Ordena el camí de l’aire en respirar: bronquis, fosses nasals, alvèols, tràquea, faringe, laringe.'),
      s: T('Fosas nasales → faringe → laringe → tráquea → bronquios → alvéolos (en los pulmones), donde el oxígeno pasa a la sangre.', 'Nasal passages → pharynx → larynx → trachea → bronchi → alveoli (in the lungs), where oxygen passes into the blood.', 'Fosses nasals → faringe → laringe → tràquea → bronquis → alvèols (als pulmons), on l’oxigen passa a la sang.') },
    { e: T('¿Qué aparato se encarga de cada cosa? a) Eliminar la urea. b) Absorber los nutrientes. c) Llevar el oxígeno a las células. d) Tomar el oxígeno del aire.', 'Which system does each job? a) Getting rid of urea. b) Absorbing nutrients. c) Taking oxygen to the cells. d) Taking oxygen from the air.', 'Quin aparell s’encarrega de cada cosa? a) Eliminar la urea. b) Absorbir els nutrients. c) Portar l’oxigen a les cèl·lules. d) Prendre l’oxigen de l’aire.'),
      s: T('a) Excretor. b) Digestivo. c) Circulatorio. d) Respiratorio. Los cuatro trabajan juntos en la función de nutrición.', 'a) Excretory. b) Digestive. c) Circulatory. d) Respiratory. All four work together in nutrition.', 'a) Excretor. b) Digestiu. c) Circulatori. d) Respiratori. Tots quatre treballen junts en la funció de nutrició.') },
    { e: T('Describe la circulación menor empezando por el corazón.', 'Describe the pulmonary circuit starting from the heart.', 'Descriu la circulació menor començant pel cor.'),
      s: T('Ventrículo derecho → arteria pulmonar → pulmones (la sangre deja CO₂ y toma O₂) → venas pulmonares → aurícula izquierda.', 'Right ventricle → pulmonary artery → lungs (blood drops CO₂ and picks up O₂) → pulmonary veins → left atrium.', 'Ventricle dret → artèria pulmonar → pulmons (la sang deixa CO₂ i pren O₂) → venes pulmonars → aurícula esquerra.') },
    { e: T('Si el corazón late 70 veces por minuto, ¿cuántas veces late en una hora?', 'If the heart beats 70 times a minute, how many times does it beat in an hour?', 'Si el cor batega 70 vegades per minut, quantes vegades batega en una hora?'),
      s: T('70 × 60 = 4.200 latidos por hora (unos 100.000 al día).', '70 × 60 = 4,200 beats an hour (about 100,000 a day).', '70 × 60 = 4.200 batecs per hora (uns 100.000 al dia).') },
  ],
}

// ── LA EDAD ANTIGUA ───────────────────────────────────────────────────────

const antigua = {
  metaTitle: L('La Edad Antigua: Mesopotamia, Egipto, la antigua Grecia y Roma — resumen y ejercicios', 'Ancient history: Mesopotamia, Egypt, ancient Greece and Rome — summary and practice questions', 'L’Edat Antiga: Mesopotàmia, Egipte, l’antiga Grècia i Roma — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las grandes civilizaciones', 'The great civilisations', 'Les grans civilitzacions'),
      tabla: {
        columnas: L(['Civilización', 'Dónde', 'Cuándo (aprox.)', 'Qué nos dejó'], ['Civilisation', 'Where', 'When (approx.)', 'What it left us'], ['Civilització', 'On', 'Quan (aprox.)', 'Què ens va deixar']),
        filas: [
          [L('Mesopotamia', 'Mesopotamia', 'Mesopotàmia'), L('entre los ríos Tigris y Éufrates (actual Irak)', 'between the Tigris and Euphrates (today’s Iraq)', 'entre els rius Tigris i Eufrates (l’actual Iraq)'), L('desde el 3500 a. C.', 'from 3500 BC', 'des del 3500 aC'), L('la escritura cuneiforme, el Código de Hammurabi, las primeras ciudades', 'cuneiform writing, the Code of Hammurabi, the first cities', 'l’escriptura cuneïforme, el Codi d’Hammurabi, les primeres ciutats')],
          [L('Egipto', 'Egypt', 'Egipte'), L('el valle del Nilo', 'the Nile valley', 'la vall del Nil'), L('del 3000 al 30 a. C.', '3000 to 30 BC', 'del 3000 al 30 aC'), L('los jeroglíficos, las pirámides, el calendario de 365 días', 'hieroglyphs, the pyramids, the 365-day calendar', 'els jeroglífics, les piràmides, el calendari de 365 dies')],
          [L('Grecia', 'Greece', 'Grècia'), L('la península de los Balcanes, las islas del Egeo y sus colonias', 'the Balkan peninsula, the Aegean islands and Greek colonies', 'la península dels Balcans, les illes de l’Egeu i les colònies'), L('del siglo VIII al II a. C.', '8th to 2nd century BC', 'del segle VIII al II aC'), L('la democracia, la filosofía, el teatro, los Juegos Olímpicos', 'democracy, philosophy, theatre, the Olympic Games', 'la democràcia, la filosofia, el teatre, els Jocs Olímpics')],
          [L('Roma', 'Rome', 'Roma'), L('la península itálica y luego todo el Mediterráneo', 'the Italian peninsula and later the whole Mediterranean', 'la península itàlica i després tot el Mediterrani'), L('del 753 a. C. (fundación según la leyenda) al 476 d. C.', 'from 753 BC (legendary founding) to AD 476', 'del 753 aC (fundació segons la llegenda) al 476 dC'), L('el latín, el derecho, las calzadas, los acueductos', 'Latin, Roman law, roads, aqueducts', 'el llatí, el dret, les calçades, els aqüeductes')],
        ],
      },
      texto: L(
        ['La Edad Antigua empieza con la invención de la escritura, hacia el 3000 a. C., y termina con la caída del Imperio romano de Occidente, en el 476 d. C.'],
        ['Ancient history begins with the invention of writing, around 3000 BC, and ends with the fall of the Western Roman Empire in AD 476.'],
        ['L’Edat Antiga comença amb la invenció de l’escriptura, cap al 3000 aC, i acaba amb la caiguda de l’Imperi romà d’Occident, el 476 dC.'],
      ),
    },
    {
      titulo: L('La antigua Grecia', 'Ancient Greece', 'L’antiga Grècia'),
      tabla: {
        columnas: L(['Época', 'Fechas', 'Qué pasó'], ['Period', 'Dates', 'What happened'], ['Època', 'Dates', 'Què va passar']),
        filas: [
          [L('Arcaica', 'Archaic', 'Arcaica'), L('siglos VIII-VI a. C.', '8th-6th century BC', 'segles VIII-VI aC'), L('nacen las polis y los griegos fundan colonias por el Mediterráneo, como Emporion (Ampurias)', 'the poleis arise and Greeks found colonies round the Mediterranean, such as Emporion (Empúries)', 'neixen les polis i els grecs funden colònies pel Mediterrani, com Emporion (Empúries)')],
          [L('Clásica', 'Classical', 'Clàssica'), L('siglos V-IV a. C.', '5th-4th century BC', 'segles V-IV aC'), L('Guerras Médicas contra Persia; esplendor de Atenas con Pericles; Guerra del Peloponeso entre Atenas y Esparta', 'the Persian Wars; Athens at its height under Pericles; the Peloponnesian War between Athens and Sparta', 'Guerres Mèdiques contra Pèrsia; esplendor d’Atenes amb Pèricles; Guerra del Peloponès entre Atenes i Esparta')],
          [L('Helenística', 'Hellenistic', 'Hel·lenística'), L('del 323 a. C. a la conquista romana', 'from 323 BC to the Roman conquest', 'del 323 aC a la conquesta romana'), L('tras el imperio de Alejandro Magno, la cultura griega se extiende hasta Egipto y la India', 'after Alexander the Great’s empire, Greek culture spreads as far as Egypt and India', 'després de l’imperi d’Alexandre el Gran, la cultura grega s’estén fins a Egipte i l’Índia')],
        ],
      },
      lista: L(
        ['Una polis era una ciudad-estado: una ciudad con su territorio, sus leyes y su propio gobierno. Grecia no era un país unido, sino muchas polis independientes.', 'Atenas: democracia, comercio por mar, filosofía y arte. Esparta: gobierno de pocos (oligarquía) y una sociedad organizada para la guerra.', 'La democracia ateniense no era como la actual: solo votaban los varones libres nacidos en Atenas; no las mujeres, los esclavos ni los extranjeros (metecos).'],
        ['A polis was a city-state: a city with its land, its laws and its own government. Greece was not one country but many independent poleis.', 'Athens: democracy, sea trade, philosophy and art. Sparta: rule by a few (oligarchy) and a society organised for war.', 'Athenian democracy was not like today’s: only free men born in Athens could vote; not women, slaves or foreigners (metics).'],
        ['Una polis era una ciutat estat: una ciutat amb el seu territori, les seves lleis i el seu propi govern. Grècia no era un país unit, sinó moltes polis independents.', 'Atenes: democràcia, comerç per mar, filosofia i art. Esparta: govern de pocs (oligarquia) i una societat organitzada per a la guerra.', 'La democràcia atenesa no era com l’actual: només votaven els homes lliures nascuts a Atenes; no les dones, els esclaus ni els estrangers (meteques).'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Por qué las primeras civilizaciones nacieron junto a grandes ríos?', 'Why did the first civilisations grow up beside big rivers?', 'Per què les primeres civilitzacions van néixer al costat de grans rius?'),
      r: T('Porque los ríos daban agua para regar y sus crecidas dejaban tierra fértil. Con más cosechas, la población creció, aparecieron las ciudades y hizo falta organizarse: gobierno, leyes y escritura.', 'Because rivers gave water for irrigation and their floods left fertile soil. With bigger harvests, population grew, cities appeared and people needed organising: government, laws and writing.', 'Perquè els rius donaven aigua per regar i les crescudes deixaven terra fèrtil. Amb més collites, la població va créixer, van aparèixer les ciutats i calia organitzar-se: govern, lleis i escriptura.') },
  ],
  ejercicios: [
    { e: T('Ordena de más antigua a más moderna: Roma, Mesopotamia, Grecia, Egipto.', 'Put in order from oldest to newest: Rome, Mesopotamia, Greece, Egypt.', 'Ordena de més antiga a més moderna: Roma, Mesopotàmia, Grècia, Egipte.'),
      s: T('Mesopotamia, Egipto, Grecia y Roma.', 'Mesopotamia, Egypt, Greece and Rome.', 'Mesopotàmia, Egipte, Grècia i Roma.') },
    { e: T('¿Atenas o Esparta? a) Gobierno democrático. b) Educación dedicada a la guerra. c) Gran flota comercial. d) Gobierno de unos pocos.', 'Athens or Sparta? a) Democratic government. b) Education focused on war. c) A large merchant fleet. d) Rule by a few.', 'Atenes o Esparta? a) Govern democràtic. b) Educació dedicada a la guerra. c) Gran flota comercial. d) Govern d’uns pocs.'),
      s: T('a) Atenas. b) Esparta. c) Atenas. d) Esparta (oligarquía).', 'a) Athens. b) Sparta. c) Athens. d) Sparta (oligarchy).', 'a) Atenes. b) Esparta. c) Atenes. d) Esparta (oligarquia).') },
    { e: T('Si el Imperio romano empezó con Augusto en el 27 a. C. y el de Occidente cayó en el 476 d. C., ¿cuántos años duró?', 'If the Roman Empire began with Augustus in 27 BC and the Western Empire fell in AD 476, how long did it last?', 'Si l’Imperi romà va començar amb August el 27 aC i el d’Occident va caure el 476 dC, quants anys va durar?'),
      s: T('27 + 476 − 1 = 502 años. Se resta 1 porque no existe el año 0: del 1 a. C. se pasa directamente al 1 d. C.', '27 + 476 − 1 = 502 years. You subtract 1 because there is no year 0: 1 BC is followed directly by AD 1.', '27 + 476 − 1 = 502 anys. Es resta 1 perquè no existeix l’any 0: de l’1 aC es passa directament a l’1 dC.') },
    { e: T('Relaciona cada civilización con algo que inventó o nos dejó: escritura cuneiforme, democracia, pirámides, derecho.', 'Match each civilisation with something it invented or left us: cuneiform, democracy, pyramids, law.', 'Relaciona cada civilització amb alguna cosa que va inventar o ens va deixar: escriptura cuneïforme, democràcia, piràmides, dret.'),
      s: T('Escritura cuneiforme: Mesopotamia. Democracia: Grecia (Atenas). Pirámides: Egipto. Derecho: Roma.', 'Cuneiform: Mesopotamia. Democracy: Greece (Athens). Pyramids: Egypt. Law: Rome.', 'Escriptura cuneïforme: Mesopotàmia. Democràcia: Grècia (Atenes). Piràmides: Egipte. Dret: Roma.') },
  ],
}

// ── LA ORACIÓN COMPUESTA (se suma a la sintaxis) ──────────────────────────

export const oracionCompuesta = {
  seccion: {
    titulo: L('La oración compuesta: coordinadas, yuxtapuestas y subordinadas', 'Compound and complex sentences: coordinate, juxtaposed and subordinate clauses', 'L’oració composta: coordinades, juxtaposades i subordinades'),
    tabla: {
      columnas: L(['Tipo', 'Cómo se unen', 'Ejemplo'], ['Type', 'How they are joined', 'Example'], ['Tipus', 'Com s’uneixen', 'Exemple']),
      filas: [
        [L('Yuxtapuestas', 'Juxtaposed', 'Juxtaposades'), L('sin nexo, con un signo de puntuación', 'with no linking word, just punctuation', 'sense nexe, amb un signe de puntuació'), 'Llegué tarde; no había nadie.'],
        [L('Coordinadas copulativas', 'Coordinate (copulative)', 'Coordinades copulatives'), L('suman: y, e, ni', 'add: y, e, ni', 'sumen: y, e, ni'), 'Leo un libro y escucho música.'],
        [L('Coordinadas adversativas', 'Coordinate (adversative)', 'Coordinades adversatives'), L('se oponen: pero, sino, mas', 'contrast: pero, sino, mas', 's’oposen: pero, sino, mas'), 'Quería ir, pero estaba enfermo.'],
        [L('Coordinadas disyuntivas', 'Coordinate (disjunctive)', 'Coordinades disjuntives'), L('dan a elegir: o, u', 'offer a choice: o, u', 'donen a triar: o, u'), '¿Vienes o te quedas?'],
        [L('Subordinadas sustantivas', 'Noun clauses', 'Subordinades substantives'), L('hacen de sustantivo (sujeto, CD…); suelen empezar por «que»', 'act as a noun (subject, object…); they often start with «que»', 'fan de substantiu (subjecte, CD…); solen començar per «que»'), 'Quiero que vengas. → Lo quiero.'],
        [L('Subordinadas adjetivas (de relativo)', 'Relative (adjective) clauses', 'Subordinades adjectives (de relatiu)'), L('hacen de adjetivo de un sustantivo: que, quien, cuyo, donde…', 'act as an adjective for a noun: que, quien, cuyo, donde…', 'fan d’adjectiu d’un substantiu: que, quien, cuyo, donde…'), 'El libro que me prestaste es genial.'],
        [L('Subordinadas adverbiales', 'Adverbial clauses', 'Subordinades adverbials'), L('indican tiempo, lugar, modo, causa, condición, finalidad…', 'show time, place, manner, cause, condition, purpose…', 'indiquen temps, lloc, mode, causa, condició, finalitat…'), 'Si llueve, no saldremos.'],
      ],
    },
    texto: L(
      ['Una oración compuesta tiene más de un verbo conjugado. En las coordinadas y yuxtapuestas, las dos partes están al mismo nivel y cada una podría ir sola; en las subordinadas, una depende de la otra y hace dentro de ella el papel de un sustantivo, un adjetivo o un adverbio. La clasificación de las adverbiales cambia un poco según el libro (la gramática de la RAE de 2009 agrupa algunas de otra forma), así que conviene seguir la del tuyo.'],
      ['A compound or complex sentence has more than one conjugated verb. In coordinate and juxtaposed sentences, both parts are on the same level and each could stand alone; in subordinate ones, one part depends on the other and plays the role of a noun, an adjective or an adverb inside it. The classification of adverbial clauses varies a little between textbooks (the RAE’s 2009 grammar groups some differently), so follow the one in yours.'],
      ['Una oració composta té més d’un verb conjugat. En les coordinades i juxtaposades, les dues parts són al mateix nivell i cadascuna podria anar sola; en les subordinades, una depèn de l’altra i hi fa el paper d’un substantiu, un adjectiu o un adverbi. La classificació de les adverbials canvia una mica segons el llibre (la gramàtica de la RAE del 2009 n’agrupa algunes d’una altra manera), així que convé seguir la del teu.'],
    ),
  },
  ejercicios: [
    { e: T('Clasifica: a) «No vino ni llamó». b) «Me dijo que estaba cansado». c) «La casa donde vivo es antigua». d) «Hace frío; abrígate».', 'Classify: a) «No vino ni llamó». b) «Me dijo que estaba cansado». c) «La casa donde vivo es antigua». d) «Hace frío; abrígate».', 'Classifica: a) «No vino ni llamó». b) «Me dijo que estaba cansado». c) «La casa donde vivo es antigua». d) «Hace frío; abrígate».'),
      s: T('a) Coordinada copulativa (ni). b) Subordinada sustantiva de CD («me lo dijo»). c) Subordinada adjetiva o de relativo (complementa a «casa»). d) Yuxtapuesta (punto y coma, sin nexo).', 'a) Coordinate, copulative (ni). b) Noun clause acting as direct object («me lo dijo»). c) Relative clause (it describes «casa»). d) Juxtaposed (semicolon, no linking word).', 'a) Coordinada copulativa (ni). b) Subordinada substantiva de CD («me lo dijo»). c) Subordinada adjectiva o de relatiu (complementa «casa»). d) Juxtaposada (punt i coma, sense nexe).') },
  ],
}

// ── NÚMEROS ENTEROS Y RACIONALES (página de mates, sin texto hasta ahora) ──

export const enterosRacionales = {
  metaTitle: L('Números enteros y racionales: suma, resta, multiplicación, división y regla de los signos — resumen y ejercicios', 'Integers and rational numbers: the four operations and the sign rules — summary and practice questions', 'Nombres enters i racionals: suma, resta, multiplicació, divisió i regla dels signes — resum i exercicis'),
  metaDesc: L('Qué son los números enteros, cómo ordenarlos, sumarlos, restarlos, multiplicarlos y dividirlos, la regla de los signos, la jerarquía de operaciones y los racionales.', 'What integers are, how to order, add, subtract, multiply and divide them, the sign rules, the order of operations and rational numbers.', 'Què són els nombres enters, com ordenar-los, sumar-los, restar-los, multiplicar-los i dividir-los, la regla dels signes, la jerarquia d’operacions i els racionals.'),
  resumen: L(
    ['Los números enteros son los naturales (1, 2, 3…), el cero y los negativos (−1, −2, −3…). Sirven para todo lo que tiene un «por debajo de cero»: temperaturas, deudas, plantas de un sótano o años antes de Cristo. En la recta numérica, los negativos van a la izquierda del cero, y cuanto más a la izquierda, menor es el número: −8 es menor que −2.', 'Los números racionales son los que se pueden escribir como una fracción de enteros: incluyen los enteros (5 = 5/1), las fracciones y los decimales exactos y periódicos. Para operar con ellos se usan las mismas reglas de los signos que con los enteros.'],
    ['Integers are the natural numbers (1, 2, 3…), zero and the negative numbers (−1, −2, −3…). They are used for anything that goes «below zero»: temperatures, debts, basement floors or years BC. On the number line, negatives are to the left of zero, and the further left, the smaller: −8 is less than −2.', 'Rational numbers are those that can be written as a fraction of integers: they include the integers (5 = 5/1), fractions, and terminating and recurring decimals. They follow the same sign rules as integers.'],
    ['Els nombres enters són els naturals (1, 2, 3…), el zero i els negatius (−1, −2, −3…). Serveixen per a tot el que té un «per sota de zero»: temperatures, deutes, plantes d’un soterrani o anys abans de Crist. A la recta numèrica, els negatius van a l’esquerra del zero, i com més a l’esquerra, més petit és el nombre: −8 és menor que −2.', 'Els nombres racionals són els que es poden escriure com una fracció d’enters: inclouen els enters (5 = 5/1), les fraccions i els decimals exactes i periòdics. Per operar-hi es fan servir les mateixes regles dels signes que amb els enters.'],
  ),
  puntosClave: L(
    ['Valor absoluto: la distancia al cero, sin signo: |−7| = 7.', 'Opuesto: el mismo número con el signo cambiado: el opuesto de −4 es 4.', 'Sumar con el mismo signo: se suman y se deja el signo. Con distinto signo: se restan y se pone el signo del de mayor valor absoluto.', 'Restar es sumar el opuesto: 5 − (−3) = 5 + 3 = 8.', 'Multiplicar y dividir: signos iguales dan +; signos distintos dan −.', 'Jerarquía: paréntesis, potencias, multiplicaciones y divisiones, sumas y restas.'],
    ['Absolute value: the distance from zero, without a sign: |−7| = 7.', 'Opposite: the same number with the sign changed: the opposite of −4 is 4.', 'Adding with the same sign: add and keep the sign. With different signs: subtract and use the sign of the one with the larger absolute value.', 'Subtracting is adding the opposite: 5 − (−3) = 5 + 3 = 8.', 'Multiplying and dividing: like signs give +; unlike signs give −.', 'Order of operations: brackets, powers, multiplication and division, addition and subtraction.'],
    ['Valor absolut: la distància al zero, sense signe: |−7| = 7.', 'Oposat: el mateix nombre amb el signe canviat: l’oposat de −4 és 4.', 'Sumar amb el mateix signe: se sumen i es deixa el signe. Amb signe diferent: es resten i es posa el signe del de més valor absolut.', 'Restar és sumar l’oposat: 5 − (−3) = 5 + 3 = 8.', 'Multiplicar i dividir: signes iguals donen +; signes diferents donen −.', 'Jerarquia: parèntesis, potències, multiplicacions i divisions, sumes i restes.'],
  ),
  secciones: [
    {
      titulo: L('La regla de los signos', 'The sign rules', 'La regla dels signes'),
      tabla: {
        columnas: L(['Operación', 'Signos', 'Resultado', 'Ejemplo'], ['Operation', 'Signs', 'Result', 'Example'], ['Operació', 'Signes', 'Resultat', 'Exemple']),
        filas: [
          [L('Multiplicar o dividir', 'Multiply or divide', 'Multiplicar o dividir'), '+ y +', '+', '(+3) · (+4) = +12'],
          [L('Multiplicar o dividir', 'Multiply or divide', 'Multiplicar o dividir'), '− y −', '+', '(−3) · (−4) = +12'],
          [L('Multiplicar o dividir', 'Multiply or divide', 'Multiplicar o dividir'), '+ y −', '−', '(+12) : (−4) = −3'],
          [L('Sumar, mismo signo', 'Add, same sign', 'Sumar, mateix signe'), '− y −', L('se suman, signo −', 'add them, sign −', 'se sumen, signe −'), '(−5) + (−3) = −8'],
          [L('Sumar, distinto signo', 'Add, different signs', 'Sumar, signe diferent'), '− y +', L('se restan, signo del mayor', 'subtract, sign of the larger', 'es resten, signe del més gran'), '(−7) + (+4) = −3'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Por qué menos por menos es más?', 'Why is minus times minus plus?', 'Per què menys per menys és més?'),
      r: T('Multiplicar por −1 es dar la vuelta al número en la recta: cambiarlo de lado. Si lo haces dos veces, vuelve a donde estaba. Por eso (−1) · (−1) = 1, y en general dos signos negativos se anulan.', 'Multiplying by −1 flips the number to the other side of the number line. Do it twice and it ends up where it started. That is why (−1) · (−1) = 1, and in general two negative signs cancel out.', 'Multiplicar per −1 és girar el nombre a la recta: canviar-lo de costat. Si ho fas dues vegades, torna on era. Per això (−1) · (−1) = 1, i en general dos signes negatius s’anul·len.') },
  ],
  ejercicios: [
    { e: T('Calcula: a) (−7) + 4. b) (−5) − (−8). c) (−3) · 4 · (−2). d) (−24) : 6.', 'Work out: a) (−7) + 4. b) (−5) − (−8). c) (−3) · 4 · (−2). d) (−24) : 6.', 'Calcula: a) (−7) + 4. b) (−5) − (−8). c) (−3) · 4 · (−2). d) (−24) : 6.'),
      s: T('a) −3. b) −5 + 8 = 3. c) (−12) · (−2) = 24. d) −4.', 'a) −3. b) −5 + 8 = 3. c) (−12) · (−2) = 24. d) −4.', 'a) −3. b) −5 + 8 = 3. c) (−12) · (−2) = 24. d) −4.') },
    { e: T('Ordena de menor a mayor: 3, −5, 0, −1, −8.', 'Order from smallest to largest: 3, −5, 0, −1, −8.', 'Ordena de menor a major: 3, −5, 0, −1, −8.'),
      s: T('−8 < −5 < −1 < 0 < 3.', '−8 < −5 < −1 < 0 < 3.', '−8 < −5 < −1 < 0 < 3.') },
    { e: T('Por la mañana había −4 °C y a mediodía 7 °C. ¿Cuántos grados subió la temperatura?', 'In the morning it was −4 °C and at midday 7 °C. By how many degrees did the temperature rise?', 'Al matí hi havia −4 °C i al migdia 7 °C. Quants graus va pujar la temperatura?'),
      s: T('7 − (−4) = 7 + 4 = 11 °C.', '7 − (−4) = 7 + 4 = 11 °C.', '7 − (−4) = 7 + 4 = 11 °C.') },
    { e: T('Calcula respetando la jerarquía: 3 − 2 · (−4) + (−6) : 2.', 'Work out using the order of operations: 3 − 2 · (−4) + (−6) : 2.', 'Calcula respectant la jerarquia: 3 − 2 · (−4) + (−6) : 2.'),
      s: T('Primero la multiplicación y la división: 2 · (−4) = −8 y (−6) : 2 = −3. Queda 3 − (−8) + (−3) = 3 + 8 − 3 = 8.', 'First multiplication and division: 2 · (−4) = −8 and (−6) : 2 = −3. That leaves 3 − (−8) + (−3) = 3 + 8 − 3 = 8.', 'Primer la multiplicació i la divisió: 2 · (−4) = −8 i (−6) : 2 = −3. Queda 3 − (−8) + (−3) = 3 + 8 − 3 = 8.') },
  ],
}

// ── LA DESCRIPCIÓN (página nueva de lengua) ───────────────────────────────

export const laDescripcion = {
  metaTitle: L('La descripción: qué es, tipos (prosopografía, etopeya, retrato…), características y ejemplos — resumen y ejercicios', 'Description: what it is, its types (prosopografía, etopeya, retrato…), features and examples — summary and practice', 'La descripció: què és, tipus (prosopografia, etopeia, retrat…), característiques i exemples — resum i exercicis'),
  metaDesc: L('Qué es una descripción, sus tipos (de personas, lugares y objetos; objetiva y subjetiva), sus rasgos lingüísticos, cómo ordenarla y ejemplos con ejercicios resueltos.', 'What a description is, its types (people, places and objects; objective and subjective), its language features, how to organise it, and examples with worked exercises.', 'Què és una descripció, els seus tipus (de persones, llocs i objectes; objectiva i subjectiva), els trets lingüístics, com ordenar-la i exemples amb exercicis resolts.'),
  resumen: L(
    ['Describir es explicar cómo es algo o alguien —una persona, un lugar, un objeto, un animal o un momento— para que quien lee se lo imagine. A diferencia de la narración, que cuenta lo que pasa, la descripción detiene la acción y se fija en los rasgos: el aspecto, el carácter, los colores, los sonidos o el ambiente.', 'Una buena descripción sigue un orden (de lo general a lo particular, de arriba abajo, de lo cercano a lo lejano) y elige los detalles que importan. Puede ser objetiva, si cuenta los rasgos tal como son, o subjetiva, si deja ver lo que siente quien describe.'],
    ['To describe is to explain what something or someone is like —a person, a place, an object, an animal or a moment— so the reader can picture it. Unlike narration, which tells what happens, description pauses the action and focuses on features: appearance, character, colours, sounds or atmosphere.', 'A good description follows an order (from general to particular, top to bottom, near to far) and picks the details that matter. It can be objective, giving the features as they are, or subjective, showing what the writer feels.'],
    ['Descriure és explicar com és alguna cosa o algú —una persona, un lloc, un objecte, un animal o un moment— perquè qui llegeix s’ho imagini. A diferència de la narració, que explica el que passa, la descripció atura l’acció i es fixa en els trets: l’aspecte, el caràcter, els colors, els sons o l’ambient.', 'Una bona descripció segueix un ordre (del general al particular, de dalt a baix, del més proper al més llunyà) i tria els detalls que importen. Pot ser objectiva, si explica els trets tal com són, o subjectiva, si deixa veure el que sent qui descriu.'],
  ),
  puntosClave: L(
    ['Prosopografía: rasgos físicos. Etopeya: carácter. Retrato: las dos cosas.', 'Caricatura: exagera los rasgos para hacer reír o criticar.', 'Topografía: describe un lugar o paisaje.', 'Objetiva: precisa y neutra (un informe, un diccionario). Subjetiva: con impresiones y figuras literarias.', 'Muchos adjetivos y sustantivos; verbos como ser, estar, tener y parecer, en presente o pretérito imperfecto.', 'Hay que seguir un orden para que no parezca una lista sin más.'],
    ['Prosopografía: physical features. Etopeya: character. Retrato (portrait): both.', 'Caricature: exaggerates features to amuse or criticise.', 'Topografía: describes a place or landscape.', 'Objective: precise and neutral (a report, a dictionary). Subjective: with impressions and figures of speech.', 'Lots of adjectives and nouns; verbs such as ser, estar, tener and parecer, in the present or imperfect.', 'Follow an order so it does not read like a mere list.'],
    ['Prosopografia: trets físics. Etopeia: caràcter. Retrat: totes dues coses.', 'Caricatura: exagera els trets per fer riure o criticar.', 'Topografia: descriu un lloc o paisatge.', 'Objectiva: precisa i neutra (un informe, un diccionari). Subjectiva: amb impressions i figures literàries.', 'Molts adjectius i substantius; verbs com ser, estar, tener i parecer, en present o pretèrit imperfet.', 'Cal seguir un ordre perquè no sembli una llista i prou.'],
  ),
  secciones: [
    {
      titulo: L('Tipos de descripción', 'Types of description', 'Tipus de descripció'),
      tabla: {
        columnas: L(['Tipo', 'Qué describe', 'Ejemplo'], ['Type', 'What it describes', 'Example'], ['Tipus', 'Què descriu', 'Exemple']),
        filas: [
          [L('Prosopografía', 'Prosopografía', 'Prosopografia'), L('el aspecto físico de una persona', 'a person’s physical appearance', 'l’aspecte físic d’una persona'), 'Era alto y delgado, de pelo canoso y ojos pequeños.'],
          [L('Etopeya', 'Etopeya', 'Etopeia'), L('el carácter y la forma de ser', 'character and personality', 'el caràcter i la manera de ser'), 'Era generoso, aunque un poco despistado.'],
          [L('Retrato', 'Portrait (retrato)', 'Retrat'), L('el físico y el carácter a la vez', 'both appearance and character', 'el físic i el caràcter alhora'), 'Alta, de mirada viva, siempre tenía una broma preparada.'],
          [L('Caricatura', 'Caricature', 'Caricatura'), L('exagera los rasgos con humor o con crítica', 'exaggerates features with humour or criticism', 'exagera els trets amb humor o amb crítica'), 'Tenía una nariz tan grande que llegaba antes que él.'],
          [L('Topografía', 'Topografía (place)', 'Topografia'), L('un lugar o un paisaje', 'a place or landscape', 'un lloc o un paisatge'), 'El pueblo se asomaba a un valle verde, cruzado por un río.'],
          [L('Cronografía', 'Cronografía (time)', 'Cronografia'), L('una época o un momento', 'a period or a moment', 'una època o un moment'), 'Era una tarde de agosto, de esas en que hasta las moscas duermen.'],
        ],
      },
    },
    {
      titulo: L('Objetiva o subjetiva', 'Objective or subjective', 'Objectiva o subjectiva'),
      tabla: {
        columnas: L(['', 'Objetiva', 'Subjetiva'], ['', 'Objective', 'Subjective'], ['', 'Objectiva', 'Subjectiva']),
        filas: [
          [L('Qué busca', 'What it aims to do', 'Què busca'), L('informar con exactitud', 'to inform accurately', 'informar amb exactitud'), L('transmitir una impresión o un sentimiento', 'to convey an impression or a feeling', 'transmetre una impressió o un sentiment')],
          [L('Lenguaje', 'Language', 'Llenguatge'), L('preciso, con datos y tecnicismos', 'precise, with facts and technical words', 'precís, amb dades i tecnicismes'), L('con adjetivos valorativos, comparaciones y metáforas', 'with evaluative adjectives, similes and metaphors', 'amb adjectius valoratius, comparacions i metàfores')],
          [L('Dónde se usa', 'Where it is used', 'On es fa servir'), L('enciclopedias, informes, anuncios de pisos', 'encyclopaedias, reports, property adverts', 'enciclopèdies, informes, anuncis de pisos'), L('novelas, poemas, cartas personales', 'novels, poems, personal letters', 'novel·les, poemes, cartes personals')],
          [L('Ejemplo', 'Example', 'Exemple'), 'La encina es un árbol de hoja perenne que mide hasta 25 metros.', 'La vieja encina, como un abuelo cansado, daba sombra a todo el patio.'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre describir y narrar?', 'What is the difference between describing and narrating?', 'Quina diferència hi ha entre descriure i narrar?'),
      r: T('Narrar es contar hechos que pasan uno tras otro (acciones en el tiempo); describir es decir cómo es algo, como si se hiciera una foto. En los cuentos suelen ir mezcladas: la narración avanza y la descripción la detiene para presentar a un personaje o un lugar.', 'Narrating tells events that happen one after another (actions over time); describing says what something is like, as if taking a photo. In stories they are usually mixed: the narration moves forward and description pauses it to present a character or a place.', 'Narrar és explicar fets que passen l’un rere l’altre (accions en el temps); descriure és dir com és alguna cosa, com si es fes una foto. Als contes solen anar barrejades: la narració avança i la descripció l’atura per presentar un personatge o un lloc.') },
  ],
  ejercicios: [
    { e: T('¿Qué tipo de descripción es? a) «Tenía la cara redonda y las mejillas sonrosadas». b) «Era tímido, pero leal con sus amigos». c) «La plaza estaba rodeada de soportales y en el centro había una fuente».', 'Which type of description is it? a) «Tenía la cara redonda y las mejillas sonrosadas». b) «Era tímido, pero leal con sus amigos». c) «La plaza estaba rodeada de soportales y en el centro había una fuente».', 'Quin tipus de descripció és? a) «Tenía la cara redonda y las mejillas sonrosadas». b) «Era tímido, pero leal con sus amigos». c) «La plaza estaba rodeada de soportales y en el centro había una fuente».'),
      s: T('a) Prosopografía (rasgos físicos). b) Etopeya (carácter). c) Topografía (un lugar).', 'a) Prosopografía (physical features). b) Etopeya (character). c) Topografía (a place).', 'a) Prosopografia (trets físics). b) Etopeia (caràcter). c) Topografia (un lloc).') },
    { e: T('¿Objetiva o subjetiva? a) «El móvil pesa 180 gramos y tiene una pantalla de 6 pulgadas». b) «Su sonrisa iluminaba la habitación como un sol de invierno».', 'Objective or subjective? a) «El móvil pesa 180 gramos y tiene una pantalla de 6 pulgadas». b) «Su sonrisa iluminaba la habitación como un sol de invierno».', 'Objectiva o subjectiva? a) «El móvil pesa 180 gramos y tiene una pantalla de 6 pulgadas». b) «Su sonrisa iluminaba la habitación como un sol de invierno».'),
      s: T('a) Objetiva: datos medibles y lenguaje neutro. b) Subjetiva: una impresión personal con una comparación («como un sol de invierno»).', 'a) Objective: measurable facts and neutral language. b) Subjective: a personal impression with a simile («como un sol de invierno»).', 'a) Objectiva: dades mesurables i llenguatge neutre. b) Subjectiva: una impressió personal amb una comparació («como un sol de invierno»).') },
    { e: T('Ordena esta descripción de lo general a lo particular: «Tenía una cicatriz pequeña en la ceja». «Era un hombre corpulento». «Su cara era ancha y morena».', 'Order this description from general to particular: «Tenía una cicatriz pequeña en la ceja». «Era un hombre corpulento». «Su cara era ancha y morena».', 'Ordena aquesta descripció del general al particular: «Tenía una cicatriz pequeña en la ceja». «Era un hombre corpulento». «Su cara era ancha y morena».'),
      s: T('«Era un hombre corpulento» (el conjunto) → «Su cara era ancha y morena» (una parte) → «Tenía una cicatriz pequeña en la ceja» (un detalle).', '«Era un hombre corpulento» (the whole) → «Su cara era ancha y morena» (one part) → «Tenía una cicatriz pequeña en la ceja» (a detail).', '«Era un hombre corpulento» (el conjunt) → «Su cara era ancha y morena» (una part) → «Tenía una cicatriz pequeña en la ceja» (un detall).') },
    { e: T('Señala los rasgos de la descripción en: «La cocina era pequeña y luminosa; olía a pan recién hecho».', 'Point out the features of description in: «La cocina era pequeña y luminosa; olía a pan recién hecho».', 'Assenyala els trets de la descripció a: «La cocina era pequeña y luminosa; olía a pan recién hecho».'),
      s: T('Verbos en pretérito imperfecto (era, olía), adjetivos (pequeña, luminosa, recién hecho) y una sensación de olfato. Es una topografía subjetiva: transmite una impresión agradable.', 'Verbs in the imperfect (era, olía), adjectives (pequeña, luminosa, recién hecho) and a sense of smell. It is a subjective description of a place: it conveys a pleasant impression.', 'Verbs en pretèrit imperfet (era, olía), adjectius (pequeña, luminosa, recién hecho) i una sensació d’olfacte. És una topografia subjectiva: transmet una impressió agradable.') },
  ],
}

export const AMPLIACION_T4 = { geometria, 'cuerpo-humano': cuerpoHumano, antigua }
