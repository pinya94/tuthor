// Octava tanda (16-nov-2026): las páginas finas de ciencias que quedaban
// (evolución, nutrición, salud y enfermedad, placas tectónicas, ácidos y
// bases, fuerzas, electricidad, ondas y luz). Se suman en AMPLIACION. Los pH
// son los mismos que usa Medidor de pH (data/sustanciasPh.js).
const T = (es, en, ca) => ({ es, en, ca })
const L = T

const evolucion = {
  metaTitle: L('La evolución: Lamarck y Darwin, selección natural y pruebas de la evolución — resumen y ejercicios', 'Evolution: Lamarck and Darwin, natural selection and the evidence for evolution — summary and practice', 'L’evolució: Lamarck i Darwin, selecció natural i proves de l’evolució — resum i exercicis'),
  secciones: [
    {
      titulo: L('Lamarck frente a Darwin', 'Lamarck versus Darwin', 'Lamarck davant de Darwin'),
      tabla: {
        columnas: L(['', 'Lamarck (1809)', 'Darwin y Wallace (1859)'], ['', 'Lamarck (1809)', 'Darwin and Wallace (1859)'], ['', 'Lamarck (1809)', 'Darwin i Wallace (1859)']),
        filas: [
          [L('Idea', 'Idea', 'Idea'), L('los seres vivos cambian por el uso o desuso de sus órganos, y esos cambios se heredan', 'living things change by using or not using their organs, and those changes are inherited', 'els éssers vius canvien per l’ús o el desús dels òrgans, i aquests canvis s’hereten'), L('dentro de una especie hay variedad; sobreviven y se reproducen más los mejor adaptados (selección natural)', 'within a species there is variation; the best adapted survive and reproduce more (natural selection)', 'dins d’una espècie hi ha varietat; sobreviuen i es reprodueixen més els més ben adaptats (selecció natural)')],
          [L('La jirafa', 'The giraffe', 'La girafa'), L('estiraba el cuello para llegar a las hojas altas y sus crías nacían con el cuello más largo', 'it stretched its neck to reach high leaves and its young were born with longer necks', 'estirava el coll per arribar a les fulles altes i les cries naixien amb el coll més llarg'), L('las jirafas que por azar nacían con el cuello más largo comían mejor, vivían más y tenían más crías', 'giraffes that happened to be born with longer necks ate better, lived longer and had more young', 'les girafes que per atzar naixien amb el coll més llarg menjaven millor, vivien més i tenien més cries')],
        ],
      },
      texto: L(
        ['Hoy sabemos que los caracteres adquiridos (un músculo entrenado, una cicatriz) no se heredan, así que la idea de Lamarck se descartó. La de Darwin, completada con la genética (las variaciones vienen de mutaciones en el ADN), es la base de la teoría actual.'],
        ['We now know that acquired characteristics (a trained muscle, a scar) are not inherited, so Lamarck’s idea was rejected. Darwin’s, completed by genetics (variation comes from mutations in DNA), is the basis of the current theory.'],
        ['Avui sabem que els caràcters adquirits (un múscul entrenat, una cicatriu) no s’hereten, així que la idea de Lamarck es va descartar. La de Darwin, completada amb la genètica (les variacions vénen de mutacions a l’ADN), és la base de la teoria actual.'],
      ),
    },
    {
      titulo: L('Pruebas de la evolución', 'Evidence for evolution', 'Proves de l’evolució'),
      lista: L(
        ['Fósiles: restos de especies que ya no existen y formas intermedias (Archaeopteryx, entre reptiles y aves).', 'Anatomía comparada: órganos homólogos, con el mismo origen y distinta función (el brazo humano, el ala del murciélago y la aleta de la ballena).', 'Embriología: los embriones de vertebrados se parecen mucho al principio.', 'ADN: cuanto más emparentadas están dos especies, más se parece su ADN.'],
        ['Fossils: remains of species that no longer exist, and intermediate forms (Archaeopteryx, between reptiles and birds).', 'Comparative anatomy: homologous organs, with the same origin and different jobs (the human arm, the bat’s wing and the whale’s flipper).', 'Embryology: vertebrate embryos look very alike at first.', 'DNA: the more closely related two species are, the more alike their DNA is.'],
        ['Fòssils: restes d’espècies que ja no existeixen i formes intermèdies (Archaeopteryx, entre rèptils i ocells).', 'Anatomia comparada: òrgans homòlegs, amb el mateix origen i funció diferent (el braç humà, l’ala del ratpenat i l’aleta de la balena).', 'Embriologia: els embrions de vertebrats s’assemblen molt al principi.', 'ADN: com més emparentades són dues espècies, més s’assembla el seu ADN.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Por qué hay bacterias resistentes a los antibióticos? Explícalo con la selección natural.', 'Why are there bacteria resistant to antibiotics? Explain using natural selection.', 'Per què hi ha bacteris resistents als antibiòtics? Explica-ho amb la selecció natural.'),
      s: T('Entre millones de bacterias, algunas tienen por azar una mutación que las protege. El antibiótico mata a las demás, esas sobreviven y se multiplican: la población pasa a ser resistente.', 'Among millions of bacteria, a few happen to have a mutation that protects them. The antibiotic kills the rest, those survive and multiply: the population becomes resistant.', 'Entre milions de bacteris, alguns tenen per atzar una mutació que els protegeix. L’antibiòtic mata els altres, aquests sobreviuen i es multipliquen: la població esdevé resistent.') },
    { e: T('¿Homólogos o análogos? El ala de un ave y el ala de una mariposa.', 'Homologous or analogous? A bird’s wing and a butterfly’s wing.', 'Homòlegs o anàlegs? L’ala d’un ocell i l’ala d’una papallona.'),
      s: T('Análogos: hacen lo mismo (volar), pero tienen un origen distinto (huesos en el ave, quitina en el insecto).', 'Analogous: they do the same job (flying) but have a different origin (bones in the bird, chitin in the insect).', 'Anàlegs: fan el mateix (volar), però tenen un origen diferent (ossos a l’ocell, quitina a l’insecte).') },
    { e: T('Un culturista con mucho músculo tiene hijos. ¿Nacerán más musculosos? ¿Quién acertaba, Lamarck o Darwin?', 'A bodybuilder with big muscles has children. Will they be born more muscular? Who was right, Lamarck or Darwin?', 'Un culturista amb molt de múscul té fills. Naixeran més musculosos? Qui l’encertava, Lamarck o Darwin?'),
      s: T('No: el músculo ganado entrenando es un carácter adquirido y no está en el ADN de sus células reproductoras. Esto contradice a Lamarck.', 'No: muscle built by training is an acquired characteristic and is not in the DNA of their sex cells. This goes against Lamarck.', 'No: el múscul guanyat entrenant és un caràcter adquirit i no és a l’ADN de les cèl·lules reproductores. Això contradiu Lamarck.') },
  ],
}

const nutricion = {
  metaTitle: L('La nutrición: nutrientes (hidratos, grasas, proteínas, vitaminas) y dieta equilibrada — resumen y ejercicios', 'Nutrition: nutrients (carbohydrates, fats, proteins, vitamins) and a balanced diet — summary and practice', 'La nutrició: nutrients (hidrats, greixos, proteïnes, vitamines) i dieta equilibrada — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los nutrientes', 'Nutrients', 'Els nutrients'),
      tabla: {
        columnas: L(['Nutriente', 'Para qué sirve', 'Energía', 'Dónde está'], ['Nutrient', 'What it is for', 'Energy', 'Found in'], ['Nutrient', 'Per a què serveix', 'Energia', 'On és']),
        filas: [
          [L('Hidratos de carbono', 'Carbohydrates', 'Hidrats de carboni'), L('energía rápida', 'quick energy', 'energia ràpida'), '4 kcal/g', L('pan, pasta, arroz, patata, fruta', 'bread, pasta, rice, potatoes, fruit', 'pa, pasta, arròs, patata, fruita')],
          [L('Grasas (lípidos)', 'Fats (lipids)', 'Greixos (lípids)'), L('reserva de energía, aislar, formar membranas', 'energy store, insulation, building membranes', 'reserva d’energia, aïllar, formar membranes'), '9 kcal/g', L('aceite, mantequilla, frutos secos', 'oil, butter, nuts', 'oli, mantega, fruits secs')],
          [L('Proteínas', 'Proteins', 'Proteïnes'), L('construir y reparar el cuerpo (músculos, piel)', 'building and repairing the body (muscle, skin)', 'construir i reparar el cos (músculs, pell)'), '4 kcal/g', L('carne, pescado, huevos, legumbres', 'meat, fish, eggs, pulses', 'carn, peix, ous, llegums')],
          [L('Vitaminas y minerales', 'Vitamins and minerals', 'Vitamines i minerals'), L('regulan el funcionamiento del cuerpo (calcio para los huesos, hierro para la sangre)', 'regulate how the body works (calcium for bones, iron for blood)', 'regulen el funcionament del cos (calci per als ossos, ferro per a la sang)'), L('no dan', 'none', 'no en donen'), L('fruta, verdura, lácteos', 'fruit, vegetables, dairy', 'fruita, verdura, làctics')],
          [L('Agua y fibra', 'Water and fibre', 'Aigua i fibra'), L('el agua transporta y regula la temperatura; la fibra ayuda al intestino', 'water carries substances and controls temperature; fibre helps the gut', 'l’aigua transporta i regula la temperatura; la fibra ajuda l’intestí'), L('no dan', 'none', 'no en donen'), L('agua, verduras, legumbres, cereales integrales', 'water, vegetables, pulses, wholegrains', 'aigua, verdures, llegums, cereals integrals')],
        ],
      },
      texto: L(
        ['Alimentación y nutrición no son lo mismo: alimentarse es elegir y comer alimentos (es voluntario); la nutrición son los procesos del cuerpo para aprovecharlos (digestión, respiración, circulación y excreción), y no se controlan. Una dieta equilibrada lleva sobre todo verduras, frutas y cereales integrales, proteínas variadas (legumbres, pescado, huevos), grasas saludables como el aceite de oliva, poco azúcar y agua como bebida.'],
        ['Eating and nutrition are not the same: eating is choosing and consuming food (it is voluntary); nutrition is the body’s processes for using it (digestion, respiration, circulation and excretion), which you do not control. A balanced diet is mainly vegetables, fruit and wholegrains, varied proteins (pulses, fish, eggs), healthy fats such as olive oil, little sugar, and water to drink.'],
        ['Alimentació i nutrició no són el mateix: alimentar-se és triar i menjar aliments (és voluntari); la nutrició són els processos del cos per aprofitar-los (digestió, respiració, circulació i excreció), i no es controlen. Una dieta equilibrada porta sobretot verdures, fruites i cereals integrals, proteïnes variades (llegums, peix, ous), greixos saludables com l’oli d’oliva, poc sucre i aigua com a beguda.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Un alimento tiene 20 g de hidratos, 10 g de grasa y 5 g de proteína. ¿Cuántas kilocalorías aporta?', 'A food has 20 g of carbohydrate, 10 g of fat and 5 g of protein. How many kilocalories does it provide?', 'Un aliment té 20 g d’hidrats, 10 g de greix i 5 g de proteïna. Quantes quilocalories aporta?'),
      s: T('20 · 4 + 10 · 9 + 5 · 4 = 80 + 90 + 20 = 190 kcal.', '20 · 4 + 10 · 9 + 5 · 4 = 80 + 90 + 20 = 190 kcal.', '20 · 4 + 10 · 9 + 5 · 4 = 80 + 90 + 20 = 190 kcal.') },
    { e: T('¿Qué nutriente predomina en cada alimento? Lentejas, aceite de oliva, arroz.', 'Which nutrient is main in each food? Lentils, olive oil, rice.', 'Quin nutrient predomina en cada aliment? Llenties, oli d’oliva, arròs.'),
      s: T('Lentejas: proteínas (y también hidratos y fibra). Aceite de oliva: grasas. Arroz: hidratos de carbono.', 'Lentils: protein (plus carbohydrate and fibre). Olive oil: fat. Rice: carbohydrate.', 'Llenties: proteïnes (i també hidrats i fibra). Oli d’oliva: greixos. Arròs: hidrats de carboni.') },
    { e: T('¿Por qué la grasa engorda más que el azúcar a igual peso?', 'Why does fat put on more weight than sugar, gram for gram?', 'Per què el greix engreixa més que el sucre a igual pes?'),
      s: T('Porque cada gramo de grasa da 9 kcal y cada gramo de azúcar (un hidrato) da 4: más del doble de energía.', 'Because each gram of fat gives 9 kcal and each gram of sugar (a carbohydrate) gives 4: more than twice the energy.', 'Perquè cada gram de greix dona 9 kcal i cada gram de sucre (un hidrat) en dona 4: més del doble d’energia.') },
  ],
}

const salud = {
  metaTitle: L('Salud y enfermedad: enfermedades infecciosas y no infecciosas, sistema inmunitario y vacunas — resumen', 'Health and disease: infectious and non-infectious diseases, the immune system and vaccines — summary', 'Salut i malaltia: malalties infeccioses i no infeccioses, sistema immunitari i vacunes — resum i exercicis'),
  secciones: [
    {
      titulo: L('Tipos de enfermedades', 'Types of disease', 'Tipus de malalties'),
      tabla: {
        columnas: L(['Tipo', 'Causa', 'Ejemplos'], ['Type', 'Cause', 'Examples'], ['Tipus', 'Causa', 'Exemples']),
        filas: [
          [L('Infecciosa vírica', 'Viral infection', 'Infecciosa vírica'), L('virus', 'viruses', 'virus'), L('gripe, resfriado, sarampión', 'flu, common cold, measles', 'grip, refredat, xarampió')],
          [L('Infecciosa bacteriana', 'Bacterial infection', 'Infecciosa bacteriana'), L('bacterias', 'bacteria', 'bacteris'), L('tuberculosis, salmonelosis, tétanos', 'tuberculosis, salmonella, tetanus', 'tuberculosi, salmonel·losi, tètanus')],
          [L('Infecciosa por hongos o protozoos', 'Fungal or protozoan infection', 'Infecciosa per fongs o protozous'), L('hongos; protozoos', 'fungi; protozoa', 'fongs; protozous'), L('pie de atleta; malaria', 'athlete’s foot; malaria', 'peu d’atleta; malària')],
          [L('No infecciosa', 'Non-infectious', 'No infecciosa'), L('genética, hábitos, ambiente o edad; no se contagia', 'genes, habits, environment or age; not catching', 'genètica, hàbits, ambient o edat; no s’encomana'), L('diabetes, infarto, cáncer, asma', 'diabetes, heart attack, cancer, asthma', 'diabetis, infart, càncer, asma')],
        ],
      },
    },
    {
      titulo: L('Cómo nos defendemos', 'How the body defends itself', 'Com ens defensem'),
      lista: L(
        ['Barreras: la piel, las mucosas, las lágrimas y el ácido del estómago impiden que entren los microbios.', 'Defensa inespecífica: si entran, la inflamación y los fagocitos (glóbulos blancos) atacan a cualquier invasor.', 'Defensa específica: los linfocitos fabrican anticuerpos contra ese microbio concreto y lo «recuerdan»: si vuelve, la respuesta es rápida (inmunidad).', 'Las vacunas enseñan al cuerpo a reconocer un microbio sin pasar la enfermedad. Los antibióticos solo matan bacterias: no sirven contra virus como la gripe.'],
        ['Barriers: skin, mucous membranes, tears and stomach acid keep microbes out.', 'Non-specific defence: if they get in, inflammation and phagocytes (white blood cells) attack any invader.', 'Specific defence: lymphocytes make antibodies against that particular microbe and «remember» it: if it returns, the response is fast (immunity).', 'Vaccines teach the body to recognise a microbe without having the disease. Antibiotics only kill bacteria: they do not work against viruses such as flu.'],
        ['Barreres: la pell, les mucoses, les llàgrimes i l’àcid de l’estómac impedeixen que entrin els microbis.', 'Defensa inespecífica: si entren, la inflamació i els fagòcits (glòbuls blancs) ataquen qualsevol invasor.', 'Defensa específica: els limfòcits fabriquen anticossos contra aquest microbi concret i el «recorden»: si torna, la resposta és ràpida (immunitat).', 'Les vacunes ensenyen el cos a reconèixer un microbi sense passar la malaltia. Els antibiòtics només maten bacteris: no serveixen contra virus com la grip.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Sirve un antibiótico para curar la gripe?', 'Will an antibiotic cure flu?', 'Serveix un antibiòtic per curar la grip?'),
      s: T('No. La gripe la causa un virus, y los antibióticos solo actúan contra bacterias. Tomarlos sin necesidad ayuda a que aparezcan bacterias resistentes.', 'No. Flu is caused by a virus, and antibiotics only work against bacteria. Taking them needlessly helps resistant bacteria appear.', 'No. La grip la causa un virus, i els antibiòtics només actuen contra bacteris. Prendre’ls sense necessitat ajuda que apareguin bacteris resistents.') },
    { e: T('¿Cómo funciona una vacuna?', 'How does a vaccine work?', 'Com funciona una vacuna?'),
      s: T('Introduce el microbio debilitado, muerto o una parte de él. Los linfocitos fabrican anticuerpos y guardan memoria, así que si llega el microbio de verdad, el cuerpo lo frena antes de enfermar.', 'It introduces a weakened or dead microbe, or part of one. Lymphocytes make antibodies and keep a memory, so if the real microbe arrives, the body stops it before you fall ill.', 'Introdueix el microbi debilitat, mort o una part d’ell. Els limfòcits fabriquen anticossos i en guarden memòria, així que si arriba el microbi de veritat, el cos el frena abans d’emmalaltir.') },
    { e: T('Clasifica: diabetes, tuberculosis, gripe, pie de atleta.', 'Classify: diabetes, tuberculosis, flu, athlete’s foot.', 'Classifica: diabetis, tuberculosi, grip, peu d’atleta.'),
      s: T('Diabetes: no infecciosa. Tuberculosis: bacteriana. Gripe: vírica. Pie de atleta: por hongos.', 'Diabetes: non-infectious. Tuberculosis: bacterial. Flu: viral. Athlete’s foot: fungal.', 'Diabetis: no infecciosa. Tuberculosi: bacteriana. Grip: vírica. Peu d’atleta: per fongs.') },
  ],
}

const placas = {
  metaTitle: L('Las placas tectónicas: capas de la Tierra, tipos de bordes, terremotos y volcanes — resumen y ejercicios', 'Tectonic plates: the Earth’s layers, plate boundaries, earthquakes and volcanoes — summary and practice', 'Les plaques tectòniques: capes de la Terra, tipus de límits, terratrèmols i volcans — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los bordes de las placas', 'Plate boundaries', 'Els límits de les plaques'),
      tabla: {
        columnas: L(['Borde', 'Qué hacen las placas', 'Qué forma', 'Ejemplo'], ['Boundary', 'What the plates do', 'What it forms', 'Example'], ['Límit', 'Què fan les plaques', 'Què forma', 'Exemple']),
        filas: [
          [L('Divergente', 'Divergent', 'Divergent'), L('se separan; sube magma y se crea corteza nueva', 'move apart; magma rises and new crust forms', 'se separen; puja magma i es crea escorça nova'), L('dorsales oceánicas, volcanes', 'mid-ocean ridges, volcanoes', 'dorsals oceàniques, volcans'), L('dorsal atlántica (Islandia)', 'Mid-Atlantic Ridge (Iceland)', 'dorsal atlàntica (Islàndia)')],
          [L('Convergente con subducción', 'Convergent with subduction', 'Convergent amb subducció'), L('chocan y una se hunde bajo la otra', 'collide and one sinks beneath the other', 'xoquen i una s’enfonsa sota l’altra'), L('fosas, cordilleras volcánicas, terremotos fuertes', 'trenches, volcanic mountain ranges, strong earthquakes', 'fosses, serralades volcàniques, terratrèmols forts'), L('los Andes', 'the Andes', 'els Andes')],
          [L('Convergente de colisión', 'Convergent collision', 'Convergent de col·lisió'), L('chocan dos continentes y se arrugan', 'two continents collide and crumple', 'xoquen dos continents i s’arruguen'), L('grandes cordilleras', 'great mountain ranges', 'grans serralades'), L('el Himalaya', 'the Himalayas', 'l’Himàlaia')],
          [L('Transformante', 'Transform', 'Transformant'), L('se deslizan una junto a otra', 'slide past each other', 'llisquen l’una al costat de l’altra'), L('fallas y terremotos', 'faults and earthquakes', 'falles i terratrèmols'), L('falla de San Andrés (California)', 'San Andreas Fault (California)', 'falla de Sant Andreu (Califòrnia)')],
        ],
      },
      texto: L(
        ['La Tierra tiene corteza, manto y núcleo. La litosfera (la corteza y la parte de arriba del manto) está rota en placas que flotan sobre la astenosfera, una capa más blanda, y se mueven unos centímetros al año. Alfred Wegener propuso en 1912 que los continentes habían estado unidos en uno solo, Pangea: lo apoyaban el encaje de las costas de África y América y los mismos fósiles a los dos lados del océano.'],
        ['The Earth has a crust, a mantle and a core. The lithosphere (the crust and the top of the mantle) is broken into plates that float on the asthenosphere, a softer layer, and move a few centimetres a year. In 1912 Alfred Wegener suggested the continents had once been joined in one, Pangaea: the way the coasts of Africa and South America fit together and the same fossils on both sides of the ocean supported him.'],
        ['La Terra té escorça, mantell i nucli. La litosfera (l’escorça i la part de dalt del mantell) està trencada en plaques que suren sobre l’astenosfera, una capa més tova, i es mouen uns centímetres l’any. Alfred Wegener va proposar el 1912 que els continents havien estat units en un de sol, Pangea: ho recolzaven l’encaix de les costes d’Àfrica i Amèrica i els mateixos fòssils als dos costats de l’oceà.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Qué tipo de borde formó el Himalaya y cuál los Andes?', 'What kind of boundary formed the Himalayas, and what kind the Andes?', 'Quin tipus de límit va formar l’Himàlaia i quin els Andes?'),
      s: T('El Himalaya, una colisión entre dos continentes (India y Asia). Los Andes, una subducción: la placa oceánica de Nazca se hunde bajo América del Sur.', 'The Himalayas: a collision between two continents (India and Asia). The Andes: subduction, as the oceanic Nazca plate sinks beneath South America.', 'L’Himàlaia, una col·lisió entre dos continents (l’Índia i Àsia). Els Andes, una subducció: la placa oceànica de Nazca s’enfonsa sota Amèrica del Sud.') },
    { e: T('¿Por qué Islandia tiene tantos volcanes?', 'Why does Iceland have so many volcanoes?', 'Per què Islàndia té tants volcans?'),
      s: T('Porque está sobre la dorsal atlántica, un borde divergente donde las placas se separan y sube magma.', 'Because it sits on the Mid-Atlantic Ridge, a divergent boundary where the plates move apart and magma rises.', 'Perquè és sobre la dorsal atlàntica, un límit divergent on les plaques se separen i puja magma.') },
    { e: T('Si una placa se mueve 5 cm al año, ¿cuánto se habrá movido en un millón de años?', 'If a plate moves 5 cm a year, how far will it have moved in a million years?', 'Si una placa es mou 5 cm l’any, quant s’haurà mogut en un milió d’anys?'),
      s: T('5 cm · 1.000.000 = 5.000.000 cm = 50 km.', '5 cm · 1,000,000 = 5,000,000 cm = 50 km.', '5 cm · 1.000.000 = 5.000.000 cm = 50 km.') },
  ],
}

const acidosBases = {
  metaTitle: L('Ácidos y bases: la escala de pH, indicadores y neutralización (con ejemplos) — resumen y ejercicios', 'Acids and bases: the pH scale, indicators and neutralisation (with examples) — summary and practice', 'Àcids i bases: l’escala de pH, indicadors i neutralització (amb exemples) — resum i exercicis'),
  secciones: [
    {
      titulo: L('La escala de pH', 'The pH scale', 'L’escala de pH'),
      tabla: {
        columnas: L(['pH', 'Tipo', 'Ejemplos (pH aproximado)'], ['pH', 'Type', 'Examples (approx. pH)'], ['pH', 'Tipus', 'Exemples (pH aproximat)']),
        filas: [
          [L('0 a 7', '0 to 7', '0 a 7'), L('ácido (más ácido cuanto más bajo)', 'acidic (the lower, the more acidic)', 'àcid (més àcid com més baix)'), L('jugo gástrico 1,5; limón 2,2; vinagre 2,8; café 5', 'stomach acid 1.5; lemon 2.2; vinegar 2.8; coffee 5', 'suc gàstric 1,5; llimona 2,2; vinagre 2,8; cafè 5')],
          ['7', L('neutro', 'neutral', 'neutre'), L('agua pura', 'pure water', 'aigua pura')],
          [L('7 a 14', '7 to 14', '7 a 14'), L('básico o alcalino (más cuanto más alto)', 'basic or alkaline (the higher, the more basic)', 'bàsic o alcalí (més com més alt)'), L('sangre 7,4; agua de mar 8,1; bicarbonato, jabón, lejía', 'blood 7.4; seawater 8.1; bicarbonate, soap, bleach', 'sang 7,4; aigua de mar 8,1; bicarbonat, sabó, lleixiu')],
        ],
      },
      lista: L(
        ['Los ácidos tienen sabor agrio, reaccionan con los metales y con la caliza; las bases tienen sabor amargo, tacto jabonoso y disuelven las grasas. (¡Nunca se prueban en el laboratorio!)', 'Cada punto de pH es una acidez diez veces mayor o menor: un pH 3 es diez veces más ácido que un pH 4.', 'Un indicador cambia de color según el pH: el papel indicador universal, el tornasol (rojo en ácido, azul en base) o la fenolftaleína (rosa en base).', 'Neutralización: ácido + base → sal + agua. Por ejemplo, HCl + NaOH → NaCl + H₂O; o un antiácido que calma el ardor de estómago.'],
        ['Acids taste sour and react with metals and limestone; bases taste bitter, feel soapy and dissolve grease. (They are never tasted in the lab!)', 'Each pH point is ten times more or less acidic: pH 3 is ten times more acidic than pH 4.', 'An indicator changes colour with pH: universal indicator paper, litmus (red in acid, blue in base) or phenolphthalein (pink in base).', 'Neutralisation: acid + base → salt + water. For example, HCl + NaOH → NaCl + H₂O; or an antacid that soothes heartburn.'],
        ['Els àcids tenen gust agre i reaccionen amb els metalls i amb la calcària; les bases tenen gust amarg, tacte sabonós i dissolen els greixos. (Mai no es tasten al laboratori!)', 'Cada punt de pH és una acidesa deu vegades més gran o més petita: un pH 3 és deu vegades més àcid que un pH 4.', 'Un indicador canvia de color segons el pH: el paper indicador universal, el tornassol (vermell en àcid, blau en base) o la fenolftaleïna (rosa en base).', 'Neutralització: àcid + base → sal + aigua. Per exemple, HCl + NaOH → NaCl + H₂O; o un antiàcid que calma l’ardor d’estómac.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Ordena de más ácido a más básico: agua de mar, limón, agua pura, vinagre, sangre.', 'Order from most acidic to most basic: seawater, lemon, pure water, vinegar, blood.', 'Ordena de més àcid a més bàsic: aigua de mar, llimona, aigua pura, vinagre, sang.'),
      s: T('Limón (2,2) → vinagre (2,8) → agua pura (7) → sangre (7,4) → agua de mar (8,1).', 'Lemon (2.2) → vinegar (2.8) → pure water (7) → blood (7.4) → seawater (8.1).', 'Llimona (2,2) → vinagre (2,8) → aigua pura (7) → sang (7,4) → aigua de mar (8,1).') },
    { e: T('¿Cuántas veces más ácido es un pH 2 que un pH 4?', 'How many times more acidic is pH 2 than pH 4?', 'Quantes vegades més àcid és un pH 2 que un pH 4?'),
      s: T('Dos puntos de diferencia: 10 · 10 = 100 veces más ácido.', 'Two points apart: 10 · 10 = 100 times more acidic.', 'Dos punts de diferència: 10 · 10 = 100 vegades més àcid.') },
    { e: T('¿Por qué un antiácido alivia el ardor de estómago?', 'Why does an antacid relieve heartburn?', 'Per què un antiàcid alleuja l’ardor d’estómac?'),
      s: T('Porque es una base: neutraliza parte del ácido clorhídrico del estómago y sube su pH.', 'Because it is a base: it neutralises some of the hydrochloric acid in the stomach and raises the pH.', 'Perquè és una base: neutralitza part de l’àcid clorhídric de l’estómac i n’apuja el pH.') },
  ],
}

const fuerzas = {
  metaTitle: L('Las fuerzas: qué son, cómo se miden, ley de Hooke y cómo se suman — resumen y ejercicios', 'Forces: what they are, how to measure them, Hooke’s law and adding forces — summary and practice questions', 'Les forces: què són, com es mesuren, llei de Hooke i com se sumen — resum i exercicis'),
  secciones: [
    {
      titulo: L('Qué hacen las fuerzas y cómo se miden', 'What forces do and how to measure them', 'Què fan les forces i com es mesuren'),
      lista: L(
        ['Una fuerza puede deformar un cuerpo o cambiar su movimiento (ponerlo en marcha, frenarlo o desviarlo).', 'Se mide en newtons (N) con un dinamómetro, que lleva un muelle dentro. 1 kg pesa unos 9,8 N en la Tierra.', 'Ley de Hooke: el alargamiento de un muelle es proporcional a la fuerza: F = k · Δx (k es la constante del muelle, en N/m).', 'De contacto (empujar, rozamiento) o a distancia (la gravedad, la fuerza magnética y la eléctrica).'],
        ['A force can change an object’s shape or its motion (start it, stop it or turn it).', 'It is measured in newtons (N) with a newton meter, which has a spring inside. 1 kg weighs about 9.8 N on Earth.', 'Hooke’s law: the extension of a spring is proportional to the force: F = k · Δx (k is the spring constant, in N/m).', 'Contact forces (pushing, friction) or non-contact forces (gravity, magnetism and electric force).'],
        ['Una força pot deformar un cos o canviar-ne el moviment (posar-lo en marxa, frenar-lo o desviar-lo).', 'Es mesura en newtons (N) amb un dinamòmetre, que porta una molla a dins. 1 kg pesa uns 9,8 N a la Terra.', 'Llei de Hooke: l’allargament d’una molla és proporcional a la força: F = k · Δx (k és la constant de la molla, en N/m).', 'De contacte (empènyer, fregament) o a distància (la gravetat, la força magnètica i l’elèctrica).'],
      ),
    },
    {
      titulo: L('Cómo se suman las fuerzas', 'How forces add up', 'Com se sumen les forces'),
      tabla: {
        columnas: L(['Caso', 'Fuerza resultante', 'Ejemplo'], ['Case', 'Resultant force', 'Example'], ['Cas', 'Força resultant', 'Exemple']),
        filas: [
          [L('Misma dirección y sentido', 'Same direction', 'Mateixa direcció i sentit'), L('se suman', 'add them', 'se sumen'), '30 N + 20 N = 50 N'],
          [L('Misma dirección, sentidos contrarios', 'Opposite directions', 'Mateixa direcció, sentits contraris'), L('se restan, hacia el lado de la mayor', 'subtract, towards the larger one', 'es resten, cap al costat de la més gran'), L('30 N − 20 N = 10 N hacia la de 30', '30 N − 20 N = 10 N towards the 30 N', '30 N − 20 N = 10 N cap a la de 30')],
          [L('Perpendiculares', 'At right angles', 'Perpendiculars'), L('Pitágoras: R = √(F₁² + F₂²)', 'Pythagoras: R = √(F₁² + F₂²)', 'Pitàgores: R = √(F₁² + F₂²)'), L('30 N y 40 N → 50 N', '30 N and 40 N → 50 N', '30 N i 40 N → 50 N')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Un muelle de constante 200 N/m se estira 5 cm. ¿Qué fuerza se le aplica?', 'A spring with constant 200 N/m stretches by 5 cm. What force is applied?', 'Una molla de constant 200 N/m s’estira 5 cm. Quina força s’hi aplica?'),
      s: T('5 cm = 0,05 m. F = 200 · 0,05 = 10 N.', '5 cm = 0.05 m. F = 200 · 0.05 = 10 N.', '5 cm = 0,05 m. F = 200 · 0,05 = 10 N.') },
    { e: T('Dos niños tiran de una caja: uno con 30 N hacia el norte y otro con 40 N hacia el este. ¿Cuánto vale la fuerza resultante?', 'Two children pull a box: one with 30 N north and the other with 40 N east. How big is the resultant force?', 'Dos nens estiren una caixa: un amb 30 N cap al nord i l’altre amb 40 N cap a l’est. Quant val la força resultant?'),
      s: T('Son perpendiculares: R = √(30² + 40²) = √2.500 = 50 N, en diagonal entre el norte y el este.', 'They are at right angles: R = √(30² + 40²) = √2,500 = 50 N, diagonally between north and east.', 'Són perpendiculars: R = √(30² + 40²) = √2.500 = 50 N, en diagonal entre el nord i l’est.') },
    { e: T('En un tira y afloja, un equipo tira con 500 N y el otro con 450 N. ¿Qué pasa?', 'In a tug of war, one team pulls with 500 N and the other with 450 N. What happens?', 'En un estirabot, un equip estira amb 500 N i l’altre amb 450 N. Què passa?'),
      s: T('Resultante: 500 − 450 = 50 N hacia el primer equipo, que va ganando.', 'Resultant: 500 − 450 = 50 N towards the first team, which is winning.', 'Resultant: 500 − 450 = 50 N cap al primer equip, que va guanyant.') },
  ],
}

const electricidad = {
  metaTitle: L('La electricidad: circuitos en serie y en paralelo, ley de Ohm y potencia — resumen y ejercicios', 'Electricity: series and parallel circuits, Ohm’s law and power — summary and practice questions', 'L’electricitat: circuits en sèrie i en paral·lel, llei d’Ohm i potència — resum i exercicis'),
  secciones: [
    {
      titulo: L('Magnitudes y fórmulas', 'Quantities and formulas', 'Magnituds i fórmules'),
      tabla: {
        columnas: L(['Magnitud', 'Unidad', 'Se mide con', 'Fórmula'], ['Quantity', 'Unit', 'Measured with', 'Formula'], ['Magnitud', 'Unitat', 'Es mesura amb', 'Fórmula']),
        filas: [
          [L('Intensidad (I)', 'Current (I)', 'Intensitat (I)'), L('amperio (A)', 'ampere (A)', 'ampere (A)'), L('amperímetro, en serie', 'ammeter, in series', 'amperímetre, en sèrie'), 'I = V / R'],
          [L('Voltaje (V)', 'Voltage (V)', 'Voltatge (V)'), L('voltio (V)', 'volt (V)', 'volt (V)'), L('voltímetro, en paralelo', 'voltmeter, in parallel', 'voltímetre, en paral·lel'), 'V = I · R'],
          [L('Resistencia (R)', 'Resistance (R)', 'Resistència (R)'), L('ohmio (Ω)', 'ohm (Ω)', 'ohm (Ω)'), L('óhmetro', 'ohmmeter', 'ohmímetre'), 'R = V / I'],
          [L('Potencia (P)', 'Power (P)', 'Potència (P)'), L('vatio (W)', 'watt (W)', 'watt (W)'), '—', 'P = V · I'],
          [L('Energía (E)', 'Energy (E)', 'Energia (E)'), L('julio (J) o kWh', 'joule (J) or kWh', 'joule (J) o kWh'), L('contador de la luz', 'electricity meter', 'comptador de la llum'), 'E = P · t'],
        ],
      },
    },
    {
      titulo: L('En serie o en paralelo', 'Series or parallel', 'En sèrie o en paral·lel'),
      tabla: {
        columnas: L(['', 'En serie', 'En paralelo'], ['', 'Series', 'Parallel'], ['', 'En sèrie', 'En paral·lel']),
        filas: [
          [L('Cómo se conectan', 'How they are connected', 'Com es connecten'), L('uno detrás de otro, en un solo camino', 'one after another, in a single path', 'un darrere l’altre, en un sol camí'), L('en ramas distintas', 'on separate branches', 'en branques diferents')],
          [L('Intensidad', 'Current', 'Intensitat'), L('la misma en todos', 'the same through all of them', 'la mateixa en tots'), L('se reparte entre las ramas', 'it divides between the branches', 'es reparteix entre les branques')],
          [L('Voltaje', 'Voltage', 'Voltatge'), L('se reparte', 'it divides', 'es reparteix'), L('el mismo en todos', 'the same across all of them', 'el mateix en tots')],
          [L('Resistencia total', 'Total resistance', 'Resistència total'), 'R = R₁ + R₂', '1/R = 1/R₁ + 1/R₂'],
          [L('Si se funde una bombilla', 'If a bulb blows', 'Si es fon una bombeta'), L('se apagan todas', 'they all go out', 's’apaguen totes'), L('las demás siguen encendidas (como en casa)', 'the others stay lit (as at home)', 'les altres continuen enceses (com a casa)')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Una bombilla de 6 Ω está conectada a una pila de 12 V. ¿Qué intensidad pasa y qué potencia tiene?', 'A 6 Ω bulb is connected to a 12 V battery. What current flows and what is its power?', 'Una bombeta de 6 Ω està connectada a una pila de 12 V. Quina intensitat hi passa i quina potència té?'),
      s: T('I = 12 / 6 = 2 A. P = 12 · 2 = 24 W.', 'I = 12 / 6 = 2 A. P = 12 · 2 = 24 W.', 'I = 12 / 6 = 2 A. P = 12 · 2 = 24 W.') },
    { e: T('Dos resistencias de 10 Ω: ¿cuánto vale la resistencia total en serie y en paralelo?', 'Two 10 Ω resistors: what is the total resistance in series and in parallel?', 'Dues resistències de 10 Ω: quant val la resistència total en sèrie i en paral·lel?'),
      s: T('En serie: 10 + 10 = 20 Ω. En paralelo: 1/R = 1/10 + 1/10 = 2/10 → R = 5 Ω.', 'In series: 10 + 10 = 20 Ω. In parallel: 1/R = 1/10 + 1/10 = 2/10 → R = 5 Ω.', 'En sèrie: 10 + 10 = 20 Ω. En paral·lel: 1/R = 1/10 + 1/10 = 2/10 → R = 5 Ω.') },
    { e: T('Un horno de 2.000 W funciona media hora. ¿Cuántos kWh gasta?', 'A 2,000 W oven runs for half an hour. How many kWh does it use?', 'Un forn de 2.000 W funciona mitja hora. Quants kWh gasta?'),
      s: T('E = 2 kW · 0,5 h = 1 kWh.', 'E = 2 kW · 0.5 h = 1 kWh.', 'E = 2 kW · 0,5 h = 1 kWh.') },
  ],
}

const ondasLuz = {
  metaTitle: L('Ondas, sonido y luz: tipos de ondas, velocidad, eco, reflexión y refracción — resumen y ejercicios', 'Waves, sound and light: types of wave, speed, echoes, reflection and refraction — summary and practice', 'Ones, so i llum: tipus d’ones, velocitat, eco, reflexió i refracció — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las ondas y sus magnitudes', 'Waves and their quantities', 'Les ones i les seves magnituds'),
      tabla: {
        columnas: L(['Magnitud', 'Qué es', 'Unidad'], ['Quantity', 'What it is', 'Unit'], ['Magnitud', 'Què és', 'Unitat']),
        filas: [
          [L('Amplitud', 'Amplitude', 'Amplitud'), L('la altura de la onda (en el sonido, el volumen)', 'the height of the wave (for sound, the loudness)', 'l’alçada de l’ona (en el so, el volum)'), 'm'],
          [L('Longitud de onda (λ)', 'Wavelength (λ)', 'Longitud d’ona (λ)'), L('distancia entre dos crestas', 'distance between two crests', 'distància entre dues crestes'), 'm'],
          [L('Frecuencia (f)', 'Frequency (f)', 'Freqüència (f)'), L('ondas por segundo (en el sonido, el tono: agudo o grave)', 'waves per second (for sound, the pitch: high or low)', 'ones per segon (en el so, el to: agut o greu)'), L('hercio (Hz)', 'hertz (Hz)', 'hertz (Hz)')],
          [L('Velocidad (v)', 'Speed (v)', 'Velocitat (v)'), 'v = λ · f', 'm/s'],
        ],
      },
    },
    {
      titulo: L('Sonido y luz', 'Sound and light', 'So i llum'),
      tabla: {
        columnas: L(['', 'Sonido', 'Luz'], ['', 'Sound', 'Light'], ['', 'So', 'Llum']),
        filas: [
          [L('Tipo de onda', 'Type of wave', 'Tipus d’ona'), L('mecánica: necesita un medio (no viaja por el vacío)', 'mechanical: it needs a medium (it cannot travel through a vacuum)', 'mecànica: necessita un medi (no viatja pel buit)'), L('electromagnética: viaja también por el vacío', 'electromagnetic: it also travels through a vacuum', 'electromagnètica: viatja també pel buit')],
          [L('Velocidad', 'Speed', 'Velocitat'), L('unos 340 m/s en el aire (más rápido en agua y sólidos)', 'about 340 m/s in air (faster in water and solids)', 'uns 340 m/s a l’aire (més ràpid en aigua i sòlids)'), L('unos 300.000 km/s en el vacío', 'about 300,000 km/s in a vacuum', 'uns 300.000 km/s en el buit')],
          [L('Rebota (reflexión)', 'Bouncing back (reflection)', 'Rebota (reflexió)'), L('el eco', 'echoes', 'l’eco'), L('los espejos: el ángulo de salida es igual al de llegada', 'mirrors: the angle out equals the angle in', 'els miralls: l’angle de sortida és igual al d’arribada')],
          [L('Cambia de medio (refracción)', 'Changing medium (refraction)', 'Canvia de medi (refracció)'), L('se desvía al pasar a otro medio', 'it bends when entering another medium', 'es desvia en passar a un altre medi'), L('el lápiz que parece roto en un vaso de agua; el arcoíris', 'the pencil that looks broken in a glass of water; rainbows', 'el llapis que sembla trencat dins un got d’aigua; l’arc de Sant Martí')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Ves un relámpago y oyes el trueno 3 segundos después. ¿A qué distancia está la tormenta?', 'You see lightning and hear the thunder 3 seconds later. How far away is the storm?', 'Veus un llamp i sents el tro 3 segons després. A quina distància és la tempesta?'),
      s: T('La luz llega casi al instante; el sonido tarda: d = 340 · 3 = 1.020 m, más o menos 1 km.', 'Light arrives almost instantly; sound takes time: d = 340 · 3 = 1,020 m, roughly 1 km.', 'La llum arriba gairebé a l’instant; el so triga: d = 340 · 3 = 1.020 m, més o menys 1 km.') },
    { e: T('Gritas frente a una pared y oyes el eco 2 segundos después. ¿A qué distancia está la pared?', 'You shout towards a wall and hear the echo 2 seconds later. How far away is the wall?', 'Crides davant d’una paret i sents l’eco 2 segons després. A quina distància és la paret?'),
      s: T('El sonido va y vuelve: recorre 340 · 2 = 680 m, así que la pared está a 340 m.', 'The sound goes there and back: it travels 340 · 2 = 680 m, so the wall is 340 m away.', 'El so va i torna: recorre 340 · 2 = 680 m, així que la paret és a 340 m.') },
    { e: T('Un sonido de 340 Hz viaja por el aire. ¿Cuál es su longitud de onda?', 'A 340 Hz sound travels through air. What is its wavelength?', 'Un so de 340 Hz viatja per l’aire. Quina és la seva longitud d’ona?'),
      s: T('λ = v / f = 340 / 340 = 1 m.', 'λ = v / f = 340 / 340 = 1 m.', 'λ = v / f = 340 / 340 = 1 m.') },
  ],
}

export const AMPLIACION_T8 = {
  evolucion, nutricion, 'salud-enfermedad': salud, 'placas-tectonicas': placas,
  'acidos-bases': acidosBases, fuerzas, electricidad, 'ondas-luz': ondasLuz,
}
