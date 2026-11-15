// Segunda tanda de ampliaciones (15-nov-2026) de páginas de estudio que ya
// existían pero solo tenían resumen y puntos clave, para búsquedas con mucha
// demanda donde no salíamos: la materia y sus propiedades, vertebrados e
// invertebrados, el complemento directo e indirecto y los ríos de España.
// Se suman a AMPLIACION (temaAmpliado.js), que las fusiona sobre CONTENIDO_TEMA.
//
// En sintaxis el MATERIAL (las frases) va en castellano en los tres idiomas;
// solo se traduce la prosa (ver memoria «Español: material vs prosa»).
// Los ríos salen de lib/riosMontanas.js, los mismos datos del juego.
import { RIOS, VERTIENTES } from '../lib/riosMontanas.js'

const L = (es, en, ca) => ({ es, en, ca })
const T = L

// ── LA MATERIA ────────────────────────────────────────────────────────────

const estadosMateria = {
  metaTitle: L('La materia: propiedades, masa, volumen, densidad y estados (sólido, líquido y gas) — resumen y ejercicios', 'Matter: properties, mass, volume, density and the states of matter — summary and practice questions', 'La matèria: propietats, massa, volum, densitat i estats (sòlid, líquid i gas) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Propiedades de la materia', 'Properties of matter', 'Propietats de la matèria'),
      tabla: {
        columnas: L(['Tipo', 'Qué son', 'Ejemplos'], ['Type', 'What they are', 'Examples'], ['Tipus', 'Què són', 'Exemples']),
        filas: [
          [L('Generales', 'General', 'Generals'), L('Las tiene toda la materia; no sirven para saber de qué sustancia se trata', 'All matter has them; they do not tell you which substance it is', 'Les té tota la matèria; no serveixen per saber de quina substància es tracta'), L('masa, volumen, temperatura', 'mass, volume, temperature', 'massa, volum, temperatura')],
          [L('Específicas o características', 'Specific or characteristic', 'Específiques o característiques'), L('Tienen un valor propio en cada sustancia: sirven para identificarla', 'Each substance has its own value: they identify it', 'Tenen un valor propi en cada substància: serveixen per identificar-la'), L('densidad, punto de fusión, punto de ebullición, dureza, solubilidad, conductividad, color', 'density, melting point, boiling point, hardness, solubility, conductivity, colour', 'densitat, punt de fusió, punt d’ebullició, duresa, solubilitat, conductivitat, color')],
        ],
      },
      texto: L(
        ['Un kilo de hierro y un kilo de madera tienen la misma masa: la masa es una propiedad general y no dice de qué están hechos. Su densidad, en cambio, es muy distinta (unos 7,9 g/cm³ el hierro y menos de 1 g/cm³ la mayoría de las maderas), y por eso la madera flota y el hierro no.'],
        ['A kilo of iron and a kilo of wood have the same mass: mass is a general property and does not tell you what they are made of. Their density, on the other hand, is very different (about 7.9 g/cm³ for iron and under 1 g/cm³ for most woods), which is why wood floats and iron does not.'],
        ['Un quilo de ferro i un quilo de fusta tenen la mateixa massa: la massa és una propietat general i no diu de què estan fets. La densitat, en canvi, és molt diferent (uns 7,9 g/cm³ el ferro i menys d’1 g/cm³ la majoria de fustes), i per això la fusta sura i el ferro no.'],
      ),
    },
    {
      titulo: L('Masa, volumen y densidad', 'Mass, volume and density', 'Massa, volum i densitat'),
      tabla: {
        columnas: L(['Magnitud', 'Qué mide', 'Unidad (SI)', 'Cómo se mide'], ['Quantity', 'What it measures', 'Unit (SI)', 'How it is measured'], ['Magnitud', 'Què mesura', 'Unitat (SI)', 'Com es mesura']),
        filas: [
          [L('Masa', 'Mass', 'Massa'), L('la cantidad de materia', 'the amount of matter', 'la quantitat de matèria'), 'kg', L('con una balanza', 'with a balance', 'amb una balança')],
          [L('Volumen', 'Volume', 'Volum'), L('el espacio que ocupa', 'the space it takes up', 'l’espai que ocupa'), L('m³ (también L: 1 L = 1 dm³)', 'm³ (also L: 1 L = 1 dm³)', 'm³ (també L: 1 L = 1 dm³)'), L('líquidos, con una probeta; sólidos irregulares, por el agua que desplazan', 'liquids with a measuring cylinder; irregular solids by the water they displace', 'líquids, amb una proveta; sòlids irregulars, per l’aigua que desplacen')],
          [L('Densidad', 'Density', 'Densitat'), L('la masa que hay en cada unidad de volumen: d = m / V', 'the mass in each unit of volume: d = m / V', 'la massa que hi ha en cada unitat de volum: d = m / V'), L('kg/m³ (en clase, g/cm³)', 'kg/m³ (in class, g/cm³)', 'kg/m³ (a classe, g/cm³)'), L('se calcula dividiendo masa entre volumen', 'calculated by dividing mass by volume', 'es calcula dividint massa entre volum')],
        ],
      },
      lista: L(
        ['1 mL = 1 cm³ y 1 L = 1 dm³ = 1000 cm³.', 'El agua tiene una densidad de 1 g/cm³ = 1000 kg/m³: lo que es menos denso que el agua flota y lo que es más denso se hunde.', 'Para pasar de g/cm³ a kg/m³ se multiplica por 1000.'],
        ['1 mL = 1 cm³ and 1 L = 1 dm³ = 1000 cm³.', 'Water has a density of 1 g/cm³ = 1000 kg/m³: anything less dense than water floats and anything denser sinks.', 'To change g/cm³ into kg/m³, multiply by 1000.'],
        ['1 mL = 1 cm³ i 1 L = 1 dm³ = 1000 cm³.', 'L’aigua té una densitat d’1 g/cm³ = 1000 kg/m³: el que és menys dens que l’aigua sura i el que és més dens s’enfonsa.', 'Per passar de g/cm³ a kg/m³ es multiplica per 1000.'],
      ),
    },
    {
      titulo: L('Los tres estados', 'The three states', 'Els tres estats'),
      tabla: {
        columnas: L(['Estado', 'Forma', 'Volumen', 'Partículas'], ['State', 'Shape', 'Volume', 'Particles'], ['Estat', 'Forma', 'Volum', 'Partícules']),
        filas: [
          [L('Sólido', 'Solid', 'Sòlid'), L('propia', 'fixed', 'pròpia'), L('fijo', 'fixed', 'fix'), L('muy juntas y ordenadas; solo vibran', 'packed tightly in order; they only vibrate', 'molt juntes i ordenades; només vibren')],
          [L('Líquido', 'Liquid', 'Líquid'), L('la del recipiente', 'takes the shape of the container', 'la del recipient'), L('fijo', 'fixed', 'fix'), L('juntas pero se deslizan unas sobre otras', 'close together but sliding past each other', 'juntes però llisquen les unes sobre les altres')],
          [L('Gas', 'Gas', 'Gas'), L('la del recipiente', 'takes the shape of the container', 'la del recipient'), L('el del recipiente: lo llena entero y se puede comprimir', 'that of the container: it fills it and can be compressed', 'el del recipient: l’omple sencer i es pot comprimir'), L('muy separadas, moviéndose a gran velocidad', 'far apart, moving very fast', 'molt separades, movent-se a gran velocitat')],
        ],
      },
    },
    {
      titulo: L('Los cambios de estado', 'Changes of state', 'Els canvis d’estat'),
      tabla: {
        columnas: L(['Cambio', 'De… a…', 'Calor'], ['Change', 'From… to…', 'Heat'], ['Canvi', 'De… a…', 'Calor']),
        filas: [
          [L('Fusión', 'Melting', 'Fusió'), L('sólido → líquido', 'solid → liquid', 'sòlid → líquid'), L('absorbe', 'taken in', 'absorbeix')],
          [L('Solidificación', 'Freezing (solidification)', 'Solidificació'), L('líquido → sólido', 'liquid → solid', 'líquid → sòlid'), L('desprende', 'given out', 'desprèn')],
          [L('Vaporización (evaporación o ebullición)', 'Vaporisation (evaporation or boiling)', 'Vaporització (evaporació o ebullició)'), L('líquido → gas', 'liquid → gas', 'líquid → gas'), L('absorbe', 'taken in', 'absorbeix')],
          [L('Condensación', 'Condensation', 'Condensació'), L('gas → líquido', 'gas → liquid', 'gas → líquid'), L('desprende', 'given out', 'desprèn')],
          [L('Sublimación', 'Sublimation', 'Sublimació'), L('sólido → gas', 'solid → gas', 'sòlid → gas'), L('absorbe', 'taken in', 'absorbeix')],
          [L('Sublimación inversa (o deposición)', 'Deposition (reverse sublimation)', 'Sublimació inversa (o deposició)'), L('gas → sólido', 'gas → solid', 'gas → sòlid'), L('desprende', 'given out', 'desprèn')],
        ],
      },
      texto: L(
        ['Mientras una sustancia pura cambia de estado, su temperatura no varía: el hielo se funde siempre a 0 °C y el agua hierve a 100 °C al nivel del mar. Todo el calor se gasta en separar las partículas.'],
        ['While a pure substance is changing state, its temperature stays the same: ice always melts at 0 °C and water boils at 100 °C at sea level. All the heat goes into pulling the particles apart.'],
        ['Mentre una substància pura canvia d’estat, la temperatura no varia: el gel es fon sempre a 0 °C i l’aigua bull a 100 °C al nivell del mar. Tota la calor es fa servir per separar les partícules.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre evaporación y ebullición?', 'What is the difference between evaporation and boiling?', 'Quina diferència hi ha entre evaporació i ebullició?'),
      r: T('Las dos son el paso de líquido a gas. La evaporación ocurre solo en la superficie y a cualquier temperatura (la ropa tendida se seca); la ebullición ocurre en todo el líquido, a una temperatura fija (el punto de ebullición), y se ven burbujas.', 'Both are the change from liquid to gas. Evaporation happens only at the surface and at any temperature (washing on the line dries); boiling happens throughout the liquid, at a fixed temperature (the boiling point), and you can see bubbles.', 'Totes dues són el pas de líquid a gas. L’evaporació passa només a la superfície i a qualsevol temperatura (la roba estesa s’asseca); l’ebullició passa a tot el líquid, a una temperatura fixa (el punt d’ebullició), i es veuen bombolles.') },
    { p: T('¿Pesa más un kilo de plomo o un kilo de paja?', 'Which weighs more, a kilo of lead or a kilo of straw?', 'Què pesa més, un quilo de plom o un quilo de palla?'),
      r: T('Pesan lo mismo: un kilo. Lo que cambia es el volumen: como el plomo es mucho más denso, ese kilo ocupa muchísimo menos espacio que el de paja.', 'They weigh the same: a kilo. What changes is the volume: because lead is far denser, its kilo takes up much less space than the straw.', 'Pesen el mateix: un quilo. El que canvia és el volum: com que el plom és molt més dens, aquest quilo ocupa moltíssim menys espai que el de palla.') },
    { p: T('¿Por qué se puede comprimir un gas y un líquido no?', 'Why can a gas be squashed but a liquid cannot?', 'Per què es pot comprimir un gas i un líquid no?'),
      r: T('Porque entre las partículas de un gas hay mucho espacio vacío, y al empujar se acercan. En un líquido ya están casi tocándose, así que apenas se puede reducir su volumen.', 'Because there is lots of empty space between the particles of a gas, and pushing brings them closer. In a liquid they are already almost touching, so its volume can hardly be reduced.', 'Perquè entre les partícules d’un gas hi ha molt d’espai buit, i en empènyer s’acosten. En un líquid ja gairebé es toquen, així que gairebé no se’n pot reduir el volum.') },
  ],
  ejercicios: [
    { e: T('Un objeto tiene una masa de 200 g y un volumen de 250 cm³. ¿Cuál es su densidad? ¿Flota en agua?', 'An object has a mass of 200 g and a volume of 250 cm³. What is its density? Does it float in water?', 'Un objecte té una massa de 200 g i un volum de 250 cm³. Quina és la seva densitat? Sura a l’aigua?'),
      s: T('d = m / V = 200 ÷ 250 = 0,8 g/cm³. Es menos de 1 g/cm³ (el agua), así que flota.', 'd = m / V = 200 ÷ 250 = 0.8 g/cm³. That is less than 1 g/cm³ (water), so it floats.', 'd = m / V = 200 ÷ 250 = 0,8 g/cm³. És menys d’1 g/cm³ (l’aigua), així que sura.') },
    { e: T('En una probeta hay 50 mL de agua. Al meter una piedra, el agua sube hasta 65 mL. ¿Cuál es el volumen de la piedra?', 'A measuring cylinder holds 50 mL of water. When a stone is dropped in, the water rises to 65 mL. What is the volume of the stone?', 'En una proveta hi ha 50 mL d’aigua. En posar-hi una pedra, l’aigua puja fins a 65 mL. Quin és el volum de la pedra?'),
      s: T('El volumen de la piedra es lo que sube el agua: 65 − 50 = 15 mL = 15 cm³.', 'The stone’s volume is how much the water rises: 65 − 50 = 15 mL = 15 cm³.', 'El volum de la pedra és el que puja l’aigua: 65 − 50 = 15 mL = 15 cm³.') },
    { e: T('El aluminio tiene una densidad de 2,7 g/cm³. ¿Qué masa tiene un cubo de aluminio de 10 cm³?', 'Aluminium has a density of 2.7 g/cm³. What is the mass of a 10 cm³ aluminium cube?', 'L’alumini té una densitat de 2,7 g/cm³. Quina massa té un cub d’alumini de 10 cm³?'),
      s: T('m = d · V = 2,7 × 10 = 27 g.', 'm = d · V = 2.7 × 10 = 27 g.', 'm = d · V = 2,7 × 10 = 27 g.') },
    { e: T('Pasa 1,2 g/cm³ a kg/m³.', 'Convert 1.2 g/cm³ into kg/m³.', 'Passa 1,2 g/cm³ a kg/m³.'),
      s: T('Se multiplica por 1000: 1,2 g/cm³ = 1200 kg/m³.', 'Multiply by 1000: 1.2 g/cm³ = 1200 kg/m³.', 'Es multiplica per 1000: 1,2 g/cm³ = 1200 kg/m³.') },
    { e: T('Di el nombre de cada cambio: a) un charco desaparece al sol; b) se forman gotas en un vaso frío; c) el agua del congelador se hace hielo.', 'Name each change: a) a puddle disappears in the sun; b) drops form on a cold glass; c) water in the freezer turns to ice.', 'Digues el nom de cada canvi: a) un bassal desapareix al sol; b) es formen gotes en un got fred; c) l’aigua del congelador es fa gel.'),
      s: T('a) Evaporación (líquido → gas, solo en la superficie). b) Condensación (el vapor del aire pasa a líquido al enfriarse). c) Solidificación (líquido → sólido).', 'a) Evaporation (liquid → gas, only at the surface). b) Condensation (water vapour in the air turns to liquid as it cools). c) Freezing (liquid → solid).', 'a) Evaporació (líquid → gas, només a la superfície). b) Condensació (el vapor de l’aire passa a líquid en refredar-se). c) Solidificació (líquid → sòlid).') },
  ],
}

// ── LOS SERES VIVOS: VERTEBRADOS E INVERTEBRADOS ──────────────────────────

const seresVivos = {
  metaTitle: L('Los seres vivos: los cinco reinos y los animales vertebrados e invertebrados — resumen y ejercicios', 'Living things: the five kingdoms and vertebrate and invertebrate animals — summary and practice questions', 'Els éssers vius: els cinc regnes i els animals vertebrats i invertebrats — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los cinco reinos', 'The five kingdoms', 'Els cinc regnes'),
      tabla: {
        columnas: L(['Reino', 'Células', 'Nutrición', 'Ejemplos'], ['Kingdom', 'Cells', 'Nutrition', 'Examples'], ['Regne', 'Cèl·lules', 'Nutrició', 'Exemples']),
        filas: [
          [L('Moneras', 'Monera', 'Moneres'), L('procariotas; unicelulares', 'prokaryotic; single-celled', 'procariotes; unicel·lulars'), L('autótrofa o heterótrofa', 'autotrophic or heterotrophic', 'autòtrofa o heteròtrofa'), L('las bacterias', 'bacteria', 'els bacteris')],
          [L('Protoctistas', 'Protoctista', 'Protoctists'), L('eucariotas; uni o pluricelulares', 'eukaryotic; single- or many-celled', 'eucariotes; uni o pluricel·lulars'), L('autótrofa (algas) o heterótrofa (protozoos)', 'autotrophic (algae) or heterotrophic (protozoa)', 'autòtrofa (algues) o heteròtrofa (protozous)'), L('ameba, paramecio, algas', 'amoeba, paramecium, algae', 'ameba, parameci, algues')],
          [L('Hongos', 'Fungi', 'Fongs'), L('eucariotas; uni o pluricelulares', 'eukaryotic; single- or many-celled', 'eucariotes; uni o pluricel·lulars'), L('heterótrofa (absorben el alimento)', 'heterotrophic (they absorb food)', 'heteròtrofa (absorbeixen l’aliment)'), L('levaduras, mohos, setas', 'yeasts, moulds, mushrooms', 'llevats, floridures, bolets')],
          [L('Plantas', 'Plants', 'Plantes'), L('eucariotas; pluricelulares', 'eukaryotic; many-celled', 'eucariotes; pluricel·lulars'), L('autótrofa: fabrican su alimento por fotosíntesis', 'autotrophic: they make their food by photosynthesis', 'autòtrofa: fabriquen el seu aliment per fotosíntesi'), L('musgos, helechos, pinos, rosales', 'mosses, ferns, pines, roses', 'molses, falgueres, pins, rosers')],
          [L('Animales', 'Animals', 'Animals'), L('eucariotas; pluricelulares', 'eukaryotic; many-celled', 'eucariotes; pluricel·lulars'), L('heterótrofa: se alimentan de otros seres vivos', 'heterotrophic: they feed on other living things', 'heteròtrofa: s’alimenten d’altres éssers vius'), L('esponjas, insectos, peces, mamíferos', 'sponges, insects, fish, mammals', 'esponges, insectes, peixos, mamífers')],
        ],
      },
    },
    {
      titulo: L('Los animales vertebrados', 'Vertebrate animals', 'Els animals vertebrats'),
      tabla: {
        columnas: L(['Grupo', 'Piel', 'Respiración', 'Reproducción', 'Temperatura', 'Ejemplos'], ['Group', 'Skin', 'Breathing', 'Reproduction', 'Body temperature', 'Examples'], ['Grup', 'Pell', 'Respiració', 'Reproducció', 'Temperatura', 'Exemples']),
        filas: [
          [L('Mamíferos', 'Mammals', 'Mamífers'), L('pelo', 'hair or fur', 'pèl'), L('pulmonar', 'lungs', 'pulmonar'), L('vivíparos (salvo el ornitorrinco y los equidnas); las crías maman', 'live young (except the platypus and echidnas); the young suckle', 'vivípars (excepte l’ornitorinc i els equidnes); les cries mamen'), L('constante', 'constant', 'constant'), L('perro, ballena, murciélago', 'dog, whale, bat', 'gos, balena, ratpenat')],
          [L('Aves', 'Birds', 'Ocells'), L('plumas', 'feathers', 'plomes'), L('pulmonar', 'lungs', 'pulmonar'), L('ovíparas', 'lay eggs', 'ovípars'), L('constante', 'constant', 'constant'), L('gallina, águila, pingüino', 'hen, eagle, penguin', 'gallina, àguila, pingüí')],
          [L('Reptiles', 'Reptiles', 'Rèptils'), L('escamas', 'scales', 'escates'), L('pulmonar', 'lungs', 'pulmonar'), L('la mayoría ovíparos', 'most lay eggs', 'la majoria ovípars'), L('variable', 'variable', 'variable'), L('lagarto, serpiente, tortuga', 'lizard, snake, tortoise', 'sargantana, serp, tortuga')],
          [L('Anfibios', 'Amphibians', 'Amfibis'), L('desnuda y húmeda', 'bare and moist', 'nua i humida'), L('branquial de larva; pulmonar y por la piel de adultos', 'gills as larvae; lungs and skin as adults', 'branquial de larva; pulmonar i per la pell d’adults'), L('ovíparos, con metamorfosis', 'lay eggs; metamorphosis', 'ovípars, amb metamorfosi'), L('variable', 'variable', 'variable'), L('rana, sapo, salamandra', 'frog, toad, salamander', 'granota, gripau, salamandra')],
          [L('Peces', 'Fish', 'Peixos'), L('escamas', 'scales', 'escates'), L('branquial', 'gills', 'branquial'), L('la mayoría ovíparos', 'most lay eggs', 'la majoria ovípars'), L('variable', 'variable', 'variable'), L('sardina, trucha, tiburón', 'sardine, trout, shark', 'sardina, truita, tauró')],
        ],
      },
    },
    {
      titulo: L('Los animales invertebrados', 'Invertebrate animals', 'Els animals invertebrats'),
      tabla: {
        columnas: L(['Grupo', 'Cómo son', 'Ejemplos'], ['Group', 'What they are like', 'Examples'], ['Grup', 'Com són', 'Exemples']),
        filas: [
          [L('Poríferos (esponjas)', 'Porifera (sponges)', 'Porífers (esponges)'), L('cuerpo lleno de poros; viven fijos en el agua', 'a body full of pores; they live fixed in water', 'cos ple de porus; viuen fixos a l’aigua'), L('esponja de mar', 'sea sponge', 'esponja de mar')],
          [L('Cnidarios', 'Cnidarians', 'Cnidaris'), L('cuerpo blando con tentáculos que pican', 'soft body with stinging tentacles', 'cos tou amb tentacles que piquen'), L('medusa, coral, anémona', 'jellyfish, coral, sea anemone', 'medusa, corall, anemone')],
          [L('Gusanos', 'Worms', 'Cucs'), L('cuerpo blando y alargado, sin patas', 'soft, long body with no legs', 'cos tou i allargat, sense potes'), L('lombriz de tierra, sanguijuela, tenia', 'earthworm, leech, tapeworm', 'cuc de terra, sangonera, tènia')],
          [L('Moluscos', 'Molluscs', 'Mol·luscs'), L('cuerpo blando; muchos con concha', 'soft body; many have a shell', 'cos tou; molts amb closca'), L('caracol, mejillón, pulpo', 'snail, mussel, octopus', 'cargol, musclo, pop')],
          [L('Equinodermos', 'Echinoderms', 'Equinoderms'), L('piel con espinas; cuerpo en forma de estrella o esfera, en cinco partes', 'spiny skin; star- or ball-shaped body in five parts', 'pell amb espines; cos en forma d’estrella o esfera, en cinc parts'), L('estrella de mar, erizo de mar', 'starfish, sea urchin', 'estrella de mar, eriçó de mar')],
          [L('Artrópodos', 'Arthropods', 'Artròpodes'), L('esqueleto externo y patas articuladas', 'an outer skeleton and jointed legs', 'esquelet extern i potes articulades'), L('insectos (6 patas), arácnidos (8 patas), crustáceos, miriápodos', 'insects (6 legs), arachnids (8 legs), crustaceans, myriapods', 'insectes (6 potes), aràcnids (8 potes), crustacis, miriàpodes')],
        ],
      },
      texto: L(
        ['Los vertebrados tienen columna vertebral y esqueleto interno de hueso o cartílago. Los invertebrados no tienen columna, y son la gran mayoría de los animales: alrededor del 95 % de las especies conocidas. El grupo más numeroso de todos es el de los artrópodos, y dentro de él, los insectos.'],
        ['Vertebrates have a backbone and an internal skeleton of bone or cartilage. Invertebrates have no backbone, and they are the vast majority of animals: around 95 % of known species. The largest group of all is the arthropods, and within them, the insects.'],
        ['Els vertebrats tenen columna vertebral i esquelet intern d’os o cartílag. Els invertebrats no tenen columna, i són la gran majoria dels animals: al voltant del 95 % de les espècies conegudes. El grup més nombrós de tots és el dels artròpodes, i dins d’aquest, els insectes.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿La ballena es un pez?', 'Is a whale a fish?', 'La balena és un peix?'),
      r: T('No: es un mamífero. Respira con pulmones (sale a la superficie a tomar aire), sus crías nacen vivas y maman, y mantiene la temperatura constante.', 'No: it is a mammal. It breathes with lungs (it comes up to the surface for air), its young are born alive and suckle, and it keeps a constant body temperature.', 'No: és un mamífer. Respira amb pulmons (surt a la superfície a agafar aire), les cries neixen vives i mamen, i manté la temperatura constant.') },
    { p: T('¿La araña es un insecto?', 'Is a spider an insect?', 'L’aranya és un insecte?'),
      r: T('No. Las dos son artrópodos, pero la araña es un arácnido: tiene 8 patas y el cuerpo en dos partes. Los insectos tienen 6 patas y el cuerpo en tres partes (cabeza, tórax y abdomen).', 'No. Both are arthropods, but the spider is an arachnid: it has 8 legs and a body in two parts. Insects have 6 legs and a body in three parts (head, thorax and abdomen).', 'No. Tots dos són artròpodes, però l’aranya és un aràcnid: té 8 potes i el cos en dues parts. Els insectes tenen 6 potes i el cos en tres parts (cap, tòrax i abdomen).') },
    { p: T('¿El murciélago es un ave?', 'Is a bat a bird?', 'El ratpenat és un ocell?'),
      r: T('No: es un mamífero que vuela. Tiene pelo y no plumas, y sus crías nacen vivas y maman.', 'No: it is a flying mammal. It has fur rather than feathers, and its young are born alive and suckle.', 'No: és un mamífer que vola. Té pèl i no plomes, i les cries neixen vives i mamen.') },
  ],
  ejercicios: [
    { e: T('Clasifica en su grupo de vertebrados: delfín, pingüino, tortuga, salamandra y tiburón.', 'Put each in its vertebrate group: dolphin, penguin, tortoise, salamander and shark.', 'Classifica en el seu grup de vertebrats: dofí, pingüí, tortuga, salamandra i tauró.'),
      s: T('Delfín: mamífero. Pingüino: ave (tiene plumas aunque no vuele). Tortuga: reptil. Salamandra: anfibio. Tiburón: pez.', 'Dolphin: mammal. Penguin: bird (it has feathers even though it cannot fly). Tortoise: reptile. Salamander: amphibian. Shark: fish.', 'Dofí: mamífer. Pingüí: ocell (té plomes encara que no voli). Tortuga: rèptil. Salamandra: amfibi. Tauró: peix.') },
    { e: T('Clasifica estos invertebrados: mosquito, pulpo, estrella de mar, lombriz de tierra y cangrejo.', 'Classify these invertebrates: mosquito, octopus, starfish, earthworm and crab.', 'Classifica aquests invertebrats: mosquit, pop, estrella de mar, cuc de terra i cranc.'),
      s: T('Mosquito: artrópodo (insecto). Pulpo: molusco (sin concha). Estrella de mar: equinodermo. Lombriz: gusano (anélido). Cangrejo: artrópodo (crustáceo).', 'Mosquito: arthropod (insect). Octopus: mollusc (with no shell). Starfish: echinoderm. Earthworm: worm (annelid). Crab: arthropod (crustacean).', 'Mosquit: artròpode (insecte). Pop: mol·lusc (sense closca). Estrella de mar: equinoderm. Cuc de terra: cuc (anèl·lid). Cranc: artròpode (crustaci).') },
    { e: T('Un animal tiene la piel desnuda y húmeda, pone huevos en el agua y sus crías respiran por branquias. ¿A qué grupo pertenece?', 'An animal has bare, moist skin, lays its eggs in water and its young breathe through gills. Which group is it?', 'Un animal té la pell nua i humida, pon ous a l’aigua i les cries respiren per brànquies. A quin grup pertany?'),
      s: T('Es un anfibio: de larva vive en el agua y respira por branquias, y tras la metamorfosis respira con pulmones y por la piel.', 'It is an amphibian: as a larva it lives in water and breathes through gills, and after metamorphosis it breathes with lungs and through its skin.', 'És un amfibi: de larva viu a l’aigua i respira per brànquies, i després de la metamorfosi respira amb pulmons i per la pell.') },
    { e: T('¿A qué reino pertenecen una seta, una bacteria y un alga?', 'Which kingdom do a mushroom, a bacterium and an alga belong to?', 'A quin regne pertanyen un bolet, un bacteri i una alga?'),
      s: T('La seta, a los hongos (no hace la fotosíntesis, aunque crezca en el suelo como una planta). La bacteria, a las moneras. El alga, a los protoctistas.', 'The mushroom is a fungus (it does not photosynthesise, even though it grows in the ground like a plant). The bacterium is in the Monera. The alga is a protoctist.', 'El bolet, als fongs (no fa la fotosíntesi, encara que creixi a terra com una planta). El bacteri, a les moneres. L’alga, als protoctists.') },
  ],
}

// ── SINTAXIS: COMPLEMENTO DIRECTO E INDIRECTO ─────────────────────────────

const sintaxis = {
  metaTitle: L('Sintaxis: sujeto, predicado y complementos (directo, indirecto, circunstancial…) — resumen y ejercicios', 'Spanish syntax: subject, predicate and objects (direct, indirect, adverbial…) — summary and practice questions', 'Sintaxi castellana: subjecte, predicat i complements (directe, indirecte, circumstancial…) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Cómo encontrar el sujeto', 'How to find the subject', 'Com trobar el subjecte'),
      lista: L(
        ['El sujeto concuerda con el verbo en número y persona. Truco: pon el verbo en plural y mira qué otra palabra tiene que cambiar. En «Me gusta el chocolate» → «Me gustan los chocolates»: el sujeto es «el chocolate», no «me».', 'Puede no aparecer (sujeto omitido o elíptico): en «Llegamos tarde» el sujeto es «nosotros».', 'Nunca lleva preposición: «a mi hermano» no puede ser sujeto.'],
        ['The subject agrees with the verb in number and person. Tip: make the verb plural and see which other word has to change. In «Me gusta el chocolate» → «Me gustan los chocolates», the subject is «el chocolate», not «me».', 'It may be left out (omitted or elliptical subject): in «Llegamos tarde» the subject is «nosotros».', 'It never takes a preposition: «a mi hermano» cannot be a subject.'],
        ['El subjecte concorda amb el verb en nombre i persona. Truc: posa el verb en plural i mira quina altra paraula ha de canviar. A «Me gusta el chocolate» → «Me gustan los chocolates», el subjecte és «el chocolate», no «me».', 'Pot no aparèixer (subjecte omès o el·líptic): a «Llegamos tarde» el subjecte és «nosotros».', 'Mai no porta preposició: «a mi hermano» no pot ser subjecte.'],
      ),
    },
    {
      titulo: L('Los complementos del verbo', 'The complements of the verb', 'Els complements del verb'),
      tabla: {
        columnas: L(['Complemento', 'Qué indica', 'Cómo reconocerlo', 'Ejemplo'], ['Complement', 'What it shows', 'How to spot it', 'Example'], ['Complement', 'Què indica', 'Com reconèixer-lo', 'Exemple']),
        filas: [
          [L('Directo (CD)', 'Direct object (CD)', 'Directe (CD)'), L('quién o qué recibe la acción', 'who or what receives the action', 'qui o què rep l’acció'), L('se sustituye por lo, la, los, las', 'it can be replaced by lo, la, los, las', 'se substitueix per lo, la, los, las'), 'Juan compra el pan → Juan lo compra'],
          [L('Indirecto (CI)', 'Indirect object (CI)', 'Indirecte (CI)'), L('a quién o para quién es la acción', 'to or for whom the action is done', 'a qui o per a qui és l’acció'), L('se sustituye por le, les (o se delante de lo, la)', 'it can be replaced by le, les (or se before lo, la)', 'se substitueix per le, les (o se davant de lo, la)'), 'Doy un regalo a mi madre → Le doy un regalo / Se lo doy'],
          [L('Circunstancial (CC)', 'Adverbial (CC)', 'Circumstancial (CC)'), L('lugar, tiempo, modo, cantidad, causa, compañía, instrumento…', 'place, time, manner, amount, cause, company, instrument…', 'lloc, temps, mode, quantitat, causa, companyia, instrument…'), L('responde a dónde, cuándo, cómo…; suele poder quitarse', 'answers where, when, how…; it can usually be removed', 'respon a on, quan, com…; normalment es pot treure'), 'Comemos en casa a las dos'],
          [L('Atributo', 'Subject complement (atributo)', 'Atribut'), L('una cualidad del sujeto con ser, estar o parecer', 'a quality of the subject with ser, estar or parecer', 'una qualitat del subjecte amb ser, estar o parecer'), L('se sustituye por lo, que no cambia', 'it can be replaced by lo, which never changes', 'se substitueix per lo, que no canvia'), 'Ana es simpática → Ana lo es'],
          [L('De régimen (suplemento)', 'Prepositional object (suplemento)', 'De règim (suplement)'), L('lo que pide el verbo con una preposición fija', 'what the verb needs with a fixed preposition', 'el que demana el verb amb una preposició fixa'), L('preposición + eso: no se puede quitar', 'preposition + eso: it cannot be removed', 'preposició + eso: no es pot treure'), 'Hablamos de fútbol → Hablamos de eso'],
          [L('Predicativo', 'Predicative complement', 'Predicatiu'), L('una cualidad del sujeto o del CD con un verbo que no es ser, estar ni parecer', 'a quality of the subject or object with a verb other than ser, estar or parecer', 'una qualitat del subjecte o del CD amb un verb que no és ser, estar ni parecer'), L('concuerda con el sujeto o el CD', 'agrees with the subject or object', 'concorda amb el subjecte o el CD'), 'Los niños llegaron cansados'],
          [L('Agente', 'Agent', 'Agent'), L('quién hace la acción en una oración pasiva', 'who does the action in a passive sentence', 'qui fa l’acció en una oració passiva'), L('por + quien la hace', 'por + whoever does it', 'por + qui la fa'), 'El libro fue escrito por Cervantes'],
        ],
      },
    },
    {
      titulo: L('CD o CI: la duda de la «a»', 'Direct or indirect object: the «a» problem', 'CD o CI: el dubte de la «a»'),
      texto: L(
        ['El CD de persona también lleva «a», y por eso se confunde con el CI. La prueba es sustituir: en «Vi a Luis» se dice «Lo vi», así que «a Luis» es CD; en «Escribí a Luis» se dice «Le escribí», así que es CI. Otra prueba: el CD pasa a ser sujeto en la pasiva («Luis fue visto»), el CI no. Ojo: la RAE acepta también «Le vi» cuando el CD es un hombre (leísmo de persona), así que en ese caso concreto el pronombre «le» no basta para decidir.'],
        ['A direct object that is a person also takes «a», which is why it gets mixed up with the indirect object. The test is to replace it: «Vi a Luis» becomes «Lo vi», so «a Luis» is the direct object; «Escribí a Luis» becomes «Le escribí», so it is indirect. Another test: the direct object becomes the subject in the passive («Luis fue visto»); the indirect object does not. Note: the RAE also accepts «Le vi» when the direct object is a man (leísmo de persona), so in that particular case the pronoun «le» is not enough to decide.'],
        ['El CD de persona també porta «a», i per això es confon amb el CI. La prova és substituir: a «Vi a Luis» es diu «Lo vi», així que «a Luis» és CD; a «Escribí a Luis» es diu «Le escribí», així que és CI. Una altra prova: el CD passa a ser subjecte en la passiva («Luis fue visto»), el CI no. Compte: la RAE accepta també «Le vi» quan el CD és un home (leísmo de persona), així que en aquest cas concret el pronom «le» no n’hi ha prou per decidir.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre el atributo y el complemento predicativo?', 'What is the difference between the atributo and the predicative complement?', 'Quina diferència hi ha entre l’atribut i el complement predicatiu?'),
      r: T('Los dos dicen una cualidad del sujeto, pero el atributo va con ser, estar o parecer («Ana está cansada», se sustituye por «lo») y el predicativo con cualquier otro verbo («Ana llegó cansada»).', 'Both describe a quality of the subject, but the atributo goes with ser, estar or parecer («Ana está cansada», replaceable by «lo») and the predicative complement with any other verb («Ana llegó cansada»).', 'Tots dos diuen una qualitat del subjecte, però l’atribut va amb ser, estar o parecer («Ana está cansada», se substitueix per «lo») i el predicatiu amb qualsevol altre verb («Ana llegó cansada»).') },
    { p: T('¿Puede haber CD y CI en la misma oración?', 'Can a sentence have both a direct and an indirect object?', 'Hi pot haver CD i CI en la mateixa oració?'),
      r: T('Sí, y es muy común con verbos como dar, regalar, contar o enviar: en «Conté un cuento a los niños», «un cuento» es CD y «a los niños» es CI. Si se sustituyen los dos, «le» pasa a «se»: «Se lo conté».', 'Yes, and it is very common with verbs like dar, regalar, contar or enviar: in «Conté un cuento a los niños», «un cuento» is the direct object and «a los niños» the indirect object. If both are replaced, «le» becomes «se»: «Se lo conté».', 'Sí, i és molt comú amb verbs com dar, regalar, contar o enviar: a «Conté un cuento a los niños», «un cuento» és CD i «a los niños» és CI. Si se substitueixen tots dos, «le» passa a «se»: «Se lo conté».') },
  ],
  ejercicios: [
    { e: T('Analiza: «María regaló flores a su abuela».', 'Analyse: «María regaló flores a su abuela».', 'Analitza: «María regaló flores a su abuela».'),
      s: T('Sujeto: María. Predicado: regaló flores a su abuela. CD: flores («las regaló»). CI: a su abuela («le regaló flores»).', 'Subject: María. Predicate: regaló flores a su abuela. Direct object: flores («las regaló»). Indirect object: a su abuela («le regaló flores»).', 'Subjecte: María. Predicat: regaló flores a su abuela. CD: flores («las regaló»). CI: a su abuela («le regaló flores»).') },
    { e: T('Analiza: «Mañana compraremos la tarta en el centro».', 'Analyse: «Mañana compraremos la tarta en el centro».', 'Analitza: «Mañana compraremos la tarta en el centro».'),
      s: T('Sujeto omitido: nosotros. CC de tiempo: mañana. CD: la tarta («la compraremos»). CC de lugar: en el centro.', 'Omitted subject: nosotros. Adverbial of time: mañana. Direct object: la tarta («la compraremos»). Adverbial of place: en el centro.', 'Subjecte omès: nosotros. CC de temps: mañana. CD: la tarta («la compraremos»). CC de lloc: en el centro.') },
    { e: T('Analiza: «El examen fue corregido por la profesora».', 'Analyse: «El examen fue corregido por la profesora».', 'Analitza: «El examen fue corregido por la profesora».'),
      s: T('Es una oración pasiva. Sujeto (paciente): el examen. Complemento agente: por la profesora. En activa sería «La profesora corrigió el examen».', 'It is a passive sentence. Subject (patient): el examen. Agent: por la profesora. In the active it would be «La profesora corrigió el examen».', 'És una oració passiva. Subjecte (pacient): el examen. Complement agent: por la profesora. En activa seria «La profesora corrigió el examen».') },
    { e: T('Analiza: «Mis hermanos están muy contentos».', 'Analyse: «Mis hermanos están muy contentos».', 'Analitza: «Mis hermanos están muy contentos».'),
      s: T('Sujeto: mis hermanos. Verbo copulativo: están. Atributo: muy contentos («lo están»).', 'Subject: mis hermanos. Linking verb: están. Atributo: muy contentos («lo están»).', 'Subjecte: mis hermanos. Verb copulatiu: están. Atribut: muy contentos («lo están»).') },
    { e: T('Analiza: «Les envié una carta ayer».', 'Analyse: «Les envié una carta ayer».', 'Analitza: «Les envié una carta ayer».'),
      s: T('Sujeto omitido: yo. CI: les. CD: una carta («se la envié»). CC de tiempo: ayer.', 'Omitted subject: yo. Indirect object: les. Direct object: una carta («se la envié»). Adverbial of time: ayer.', 'Subjecte omès: yo. CI: les. CD: una carta («se la envié»). CC de temps: ayer.') },
    { e: T('Analiza: «Siempre pienso en ti».', 'Analyse: «Siempre pienso en ti».', 'Analitza: «Siempre pienso en ti».'),
      s: T('Sujeto omitido: yo. CC de tiempo: siempre. Complemento de régimen: en ti («pienso en eso»): el verbo pensar pide la preposición «en» y no se puede quitar.', 'Omitted subject: yo. Adverbial of time: siempre. Prepositional object: en ti («pienso en eso»): the verb pensar needs the preposition «en» and it cannot be removed.', 'Subjecte omès: yo. CC de temps: siempre. Complement de règim: en ti («pienso en eso»): el verb pensar demana la preposició «en» i no es pot treure.') },
  ],
}

// ── ESPAÑA: LOS RÍOS ──────────────────────────────────────────────────────

const COMO_SON = {
  cantabrica: L('cortos, con mucha pendiente y caudalosos todo el año', 'short, steep and full all year round', 'curts, amb molt de pendent i cabalosos tot l’any'),
  atlantica: L('largos, de curso tranquilo; caudal abundante pero irregular (salvo el Miño, más regular)', 'long and slow-flowing; plenty of water but irregular (except the Miño, which is steadier)', 'llargs, de curs tranquil; cabal abundant però irregular (excepte el Miño, més regular)'),
  mediterranea: L('cortos e irregulares, con estiaje en verano y crecidas fuertes; el Ebro es la excepción por su longitud y caudal', 'short and irregular, low in summer and prone to flash floods; the Ebro is the exception for its length and flow', 'curts i irregulars, amb estiatge a l’estiu i crescudes fortes; l’Ebre és l’excepció per la llargada i el cabal'),
}
const sinEn = o => ({ es: o.es.replace(/^en /, ''), en: o.en.replace(/^(in|into) /, ''), ca: o.ca.replace(/^(a|al|als) /, '') })

const espana = {
  metaTitle: L('España: comunidades autónomas, ríos y vertientes hidrográficas — resumen y ejercicios', 'Spain: autonomous communities, rivers and drainage basins — summary and practice questions', 'Espanya: comunitats autònomes, rius i vessants hidrogràfics — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las tres vertientes', 'The three drainage basins', 'Els tres vessants'),
      tabla: {
        columnas: L(['Vertiente', 'Cómo son sus ríos', 'Ríos principales'], ['Basin', 'What its rivers are like', 'Main rivers'], ['Vessant', 'Com són els rius', 'Rius principals']),
        filas: Object.keys(VERTIENTES).map(v => [
          VERTIENTES[v], COMO_SON[v],
          L(...['es', 'en', 'ca'].map(l => RIOS.filter(r => r.vertiente === v).map(r => r.nombre[l]).join(', '))),
        ]),
      },
      texto: L(
        ['La Meseta está inclinada hacia el oeste y la mayoría de las montañas que dividen las aguas están cerca del Mediterráneo. Por eso los ríos más largos (Duero, Tajo, Guadiana) cruzan la península de este a oeste y desembocan en el Atlántico.'],
        ['The Meseta tilts towards the west and most of the mountains that divide the waters are close to the Mediterranean. That is why the longest rivers (Douro, Tagus, Guadiana) cross the peninsula from east to west and flow into the Atlantic.'],
        ['La Meseta està inclinada cap a l’oest i la majoria de muntanyes que divideixen les aigües són a prop de la Mediterrània. Per això els rius més llargs (Duero, Tajo, Guadiana) travessen la península d’est a oest i desemboquen a l’Atlàntic.'],
      ),
    },
    {
      titulo: L('Dónde nacen y dónde desembocan', 'Where they rise and where they reach the sea', 'On neixen i on desemboquen'),
      tabla: {
        columnas: L(['Río', 'Vertiente', 'Nace', 'Desemboca'], ['River', 'Basin', 'Source', 'Mouth'], ['Riu', 'Vessant', 'Neix', 'Desemboca']),
        filas: RIOS.map(r => [r.nombre, VERTIENTES[r.vertiente], sinEn(r.nace), sinEn(r.desemboca)]),
      },
    },
  ],
  preguntas: [
    { p: T('¿Cuál es el río más largo de España?', 'Which is the longest river in Spain?', 'Quin és el riu més llarg d’Espanya?'),
      r: T('El Tajo es el más largo de la península (unos 1.000 km), pero su último tramo está en Portugal. El río más largo que corre entero por España es el Ebro (unos 910 km).', 'The Tagus is the longest in the peninsula (about 1,000 km), but its last stretch is in Portugal. The longest river that flows entirely within Spain is the Ebro (about 910 km).', 'El Tajo és el més llarg de la península (uns 1.000 km), però l’últim tram és a Portugal. El riu més llarg que corre sencer per Espanya és l’Ebre (uns 910 km).') },
    { p: T('¿Qué es el estiaje?', 'What is estiaje?', 'Què és l’estiatge?'),
      r: T('Es la época en que un río lleva menos agua, en verano, porque llueve poco y hace calor. Es muy marcado en los ríos mediterráneos, que a veces casi se secan.', 'It is the time of year when a river carries least water, in summer, because there is little rain and it is hot. It is very marked in Mediterranean rivers, which sometimes almost dry up.', 'És l’època en què un riu porta menys aigua, a l’estiu, perquè plou poc i fa calor. És molt marcat als rius mediterranis, que de vegades gairebé s’assequen.') },
  ],
  ejercicios: [
    { e: T('¿A qué vertiente pertenece el Guadalquivir y dónde desemboca?', 'Which basin does the Guadalquivir belong to and where does it reach the sea?', 'A quin vessant pertany el Guadalquivir i on desemboca?'),
      s: T('A la atlántica. Nace en la Sierra de Cazorla (Jaén) y desemboca en Sanlúcar de Barrameda (Cádiz), junto a Doñana.', 'The Atlantic. It rises in the Sierra de Cazorla (Jaén) and reaches the sea at Sanlúcar de Barrameda (Cádiz), next to Doñana.', 'A l’atlàntic. Neix a la Sierra de Cazorla (Jaén) i desemboca a Sanlúcar de Barrameda (Cadis), al costat de Doñana.') },
    { e: T('Ordena de norte a sur: Tajo, Guadalquivir, Duero y Guadiana.', 'Put them in order from north to south: Tagus, Guadalquivir, Douro and Guadiana.', 'Ordena de nord a sud: Tajo, Guadalquivir, Duero i Guadiana.'),
      s: T('Duero, Tajo, Guadiana y Guadalquivir.', 'Douro, Tagus, Guadiana and Guadalquivir.', 'Duero, Tajo, Guadiana i Guadalquivir.') },
    { e: T('¿Qué gran río forma un delta y en qué mar?', 'Which great river forms a delta, and in which sea?', 'Quin gran riu forma un delta i a quin mar?'),
      s: T('El Ebro, en el Mediterráneo (Tarragona). Es el gran río de la vertiente mediterránea.', 'The Ebro, in the Mediterranean (Tarragona). It is the great river of the Mediterranean basin.', 'L’Ebre, a la Mediterrània (Tarragona). És el gran riu del vessant mediterrani.') },
    { e: T('¿Qué ríos hacen frontera con Portugal?', 'Which rivers form part of the border with Portugal?', 'Quins rius fan frontera amb Portugal?'),
      s: T('El Miño, en su desembocadura, y el Guadiana, en su tramo final. También el Duero (en los Arribes) y un tramo corto del Tajo.', 'The Miño, at its mouth, and the Guadiana, in its final stretch. The Douro (in the Arribes) and a short stretch of the Tagus do too.', 'El Miño, a la desembocadura, i el Guadiana, al tram final. També el Duero (als Arribes) i un tram curt del Tajo.') },
    { e: T('¿En qué sistema montañoso nacen el Tajo, el Júcar y el Turia?', 'In which mountain system do the Tagus, Júcar and Turia rise?', 'En quin sistema muntanyós neixen el Tajo, el Xúquer i el Túria?'),
      s: T('En el Sistema Ibérico, en la zona de los Montes Universales. Allí cerca nace también el Duero, en los Picos de Urbión.', 'In the Iberian System, in the Montes Universales area. The Douro also rises nearby, in the Picos de Urbión.', 'Al Sistema Ibèric, a la zona dels Montes Universales. A prop també hi neix el Duero, als Picos de Urbión.') },
  ],
}

export const AMPLIACION_CIENCIAS = { 'estados-materia': estadosMateria, 'seres-vivos': seresVivos, sintaxis, espana }
