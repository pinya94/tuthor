// Novena tanda (16-nov-2026): siete páginas finas de historia (Roma, Guerra
// Civil, Edad Media, Edad Moderna, Revolución Francesa, Revolución Industrial
// y Primera Guerra Mundial). Se suman en AMPLIACION. Las fechas son las de
// los bancos de examen de cada tema (data/historia*.js).
const T = (es, en, ca) => ({ es, en, ca })
const L = T

const roma = {
  metaTitle: L('La antigua Roma: Monarquía, República e Imperio, Hispania romana y su legado — resumen y ejercicios', 'Ancient Rome: the Kingdom, the Republic and the Empire, Roman Hispania and its legacy — summary and practice', 'L’antiga Roma: Monarquia, República i Imperi, Hispània romana i el seu llegat — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las etapas de Roma', 'The stages of Rome', 'Les etapes de Roma'),
      tabla: {
        columnas: L(['Etapa', 'Fechas', 'Cómo se gobernaba'], ['Stage', 'Dates', 'How it was governed'], ['Etapa', 'Dates', 'Com es governava']),
        filas: [
          [L('Monarquía', 'Kingdom', 'Monarquia'), L('753-509 a. C.', '753-509 BC', '753-509 aC'), L('reyes, con un Senado de ancianos', 'kings, with a Senate of elders', 'reis, amb un Senat d’ancians')],
          [L('República', 'Republic', 'República'), L('509-27 a. C.', '509-27 BC', '509-27 aC'), L('dos cónsules elegidos cada año, el Senado y asambleas; Roma conquista todo el Mediterráneo', 'two consuls elected each year, the Senate and assemblies; Rome conquers the whole Mediterranean', 'dos cònsols elegits cada any, el Senat i assemblees; Roma conquereix tot el Mediterrani')],
          [L('Imperio', 'Empire', 'Imperi'), L('27 a. C.-476 d. C.', '27 BC-AD 476', '27 aC-476 dC'), L('un emperador con todo el poder, desde Augusto; en 395 se divide en Imperio de Occidente y de Oriente', 'an emperor with full power, from Augustus; in 395 it splits into a Western and an Eastern Empire', 'un emperador amb tot el poder, des d’August; el 395 es divideix en Imperi d’Occident i d’Orient')],
        ],
      },
      lista: L(
        ['El Imperio de Occidente cae en el 476, cuando el último emperador es depuesto: es el final de la Edad Antigua. El de Oriente (bizantino) dura hasta 1453.', 'Sociedad: patricios (las familias ricas), plebeyos (el resto de ciudadanos libres) y esclavos, sin derechos.', 'Hispania: la conquista empezó en el 218 a. C., durante la Segunda Guerra Púnica contra Cartago, y terminó en el 19 a. C. con las guerras contra cántabros y astures. La romanización trajo el latín, el derecho, las ciudades y las calzadas.', 'Legado: el latín (del que vienen el castellano, el catalán, el gallego…), el derecho romano, las calzadas, los acueductos (Segovia), los teatros (Mérida) y los puentes.'],
        ['The Western Empire falls in 476, when the last emperor is deposed: this is the end of ancient history. The Eastern (Byzantine) Empire lasts until 1453.', 'Society: patricians (the wealthy families), plebeians (the other free citizens) and slaves, with no rights.', 'Hispania: the conquest began in 218 BC, during the Second Punic War against Carthage, and ended in 19 BC with the wars against the Cantabrians and Astures. Romanisation brought Latin, law, cities and roads.', 'Legacy: Latin (the source of Spanish, Catalan, Galician…), Roman law, roads, aqueducts (Segovia), theatres (Mérida) and bridges.'],
        ['L’Imperi d’Occident cau el 476, quan l’últim emperador és deposat: és el final de l’Edat Antiga. El d’Orient (bizantí) dura fins al 1453.', 'Societat: patricis (les famílies riques), plebeus (la resta de ciutadans lliures) i esclaus, sense drets.', 'Hispània: la conquesta va començar el 218 aC, durant la Segona Guerra Púnica contra Cartago, i va acabar el 19 aC amb les guerres contra càntabres i àsturs. La romanització va portar el llatí, el dret, les ciutats i les calçades.', 'Llegat: el llatí (d’on vénen el castellà, el català, el gallec…), el dret romà, les calçades, els aqüeductes (Segòvia), els teatres (Mèrida) i els ponts.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Ordena: Imperio, Monarquía, República. ¿En qué año empieza cada una?', 'Put in order: Empire, Kingdom, Republic. When does each begin?', 'Ordena: Imperi, Monarquia, República. En quin any comença cadascuna?'),
      s: T('Monarquía (753 a. C.) → República (509 a. C.) → Imperio (27 a. C.).', 'Kingdom (753 BC) → Republic (509 BC) → Empire (27 BC).', 'Monarquia (753 aC) → República (509 aC) → Imperi (27 aC).') },
    { e: T('¿Cuántos años tardaron los romanos en conquistar Hispania (del 218 al 19 a. C.)?', 'How many years did the Romans take to conquer Hispania (from 218 to 19 BC)?', 'Quants anys van trigar els romans a conquerir Hispània (del 218 al 19 aC)?'),
      s: T('218 − 19 = 199 años, casi dos siglos.', '218 − 19 = 199 years, almost two centuries.', '218 − 19 = 199 anys, gairebé dos segles.') },
    { e: T('Di tres cosas que nos dejaron los romanos.', 'Name three things the Romans left us.', 'Digues tres coses que ens van deixar els romans.'),
      s: T('Por ejemplo: el latín, del que viene el castellano; el derecho; y obras públicas como el acueducto de Segovia o el teatro de Mérida.', 'For example: Latin, from which Spanish comes; law; and public works like the Segovia aqueduct or the Mérida theatre.', 'Per exemple: el llatí, d’on ve el castellà; el dret; i obres públiques com l’aqüeducte de Segòvia o el teatre de Mèrida.') },
  ],
}

const gce = {
  metaTitle: L('La Guerra Civil Española (1936-1939): causas, bandos, batallas y consecuencias — resumen y ejercicios', 'The Spanish Civil War (1936-1939): causes, sides, battles and consequences — summary and practice questions', 'La Guerra Civil Espanyola (1936-1939): causes, bàndols, batalles i conseqüències — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los dos bandos', 'The two sides', 'Els dos bàndols'),
      tabla: {
        columnas: L(['', 'Republicano', 'Sublevado (nacional)'], ['', 'Republican', 'Rebel (Nationalist)'], ['', 'Republicà', 'Revoltat (nacional)']),
        filas: [
          [L('Quiénes', 'Who', 'Qui'), L('el gobierno legítimo de la República, partidos de izquierda, sindicatos, nacionalistas vascos y catalanes', 'the legitimate Republican government, left-wing parties, trade unions, Basque and Catalan nationalists', 'el govern legítim de la República, partits d’esquerra, sindicats, nacionalistes bascos i catalans'), L('la mayor parte del ejército, Falange, carlistas, monárquicos y buena parte de la Iglesia', 'most of the army, the Falange, Carlists, monarchists and much of the Church', 'la major part de l’exèrcit, Falange, carlins, monàrquics i bona part de l’Església')],
          [L('Líderes', 'Leaders', 'Líders'), L('Azaña, Largo Caballero, Negrín', 'Azaña, Largo Caballero, Negrín', 'Azaña, Largo Caballero, Negrín'), L('Franco (y Mola, al principio)', 'Franco (and Mola, at first)', 'Franco (i Mola, al principi)')],
          [L('Ayuda exterior', 'Foreign help', 'Ajuda exterior'), L('la URSS y las Brigadas Internacionales', 'the USSR and the International Brigades', 'l’URSS i les Brigades Internacionals'), L('la Alemania nazi y la Italia fascista', 'Nazi Germany and Fascist Italy', 'l’Alemanya nazi i la Itàlia feixista')],
        ],
      },
    },
    {
      titulo: L('Las fases de la guerra', 'The stages of the war', 'Les fases de la guerra'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          [L('17-18 de julio de 1936', '17-18 July 1936', '17-18 de juliol de 1936'), L('golpe de Estado militar: fracasa en parte y España queda dividida en dos', 'military coup: it partly fails and Spain is split in two', 'cop d’Estat militar: fracassa en part i Espanya queda dividida en dues')],
          [L('nov. 1936-1937', 'Nov 1936-1937', 'nov. 1936-1937'), L('batalla de Madrid: la capital resiste («¡No pasarán!»)', 'Battle of Madrid: the capital holds out («They shall not pass!»)', 'batalla de Madrid: la capital resisteix («No passaran!»)')],
          ['1937', L('campaña del Norte; bombardeo de Guernica (26 de abril) por la Legión Cóndor alemana', 'the Northern campaign; the bombing of Guernica (26 April) by the German Condor Legion', 'campanya del Nord; bombardeig de Guernica (26 d’abril) per la Legió Còndor alemanya')],
          [L('julio-nov. 1938', 'July-Nov 1938', 'juliol-nov. 1938'), L('batalla del Ebro, la más larga y sangrienta; la pierde la República', 'Battle of the Ebro, the longest and bloodiest; the Republic loses it', 'batalla de l’Ebre, la més llarga i sagnant; la perd la República')],
          [L('1 de abril de 1939', '1 April 1939', '1 d’abril de 1939'), L('fin de la guerra: comienza la dictadura de Franco', 'end of the war: Franco’s dictatorship begins', 'fi de la guerra: comença la dictadura de Franco')],
        ],
      },
      texto: L(
        ['Consecuencias: cientos de miles de muertos, cientos de miles de exiliados (muchos a Francia y a América), represión de los vencidos y casi cuarenta años de dictadura.'],
        ['Consequences: hundreds of thousands dead, hundreds of thousands in exile (many to France and the Americas), repression of the defeated and almost forty years of dictatorship.'],
        ['Conseqüències: centenars de milers de morts, centenars de milers d’exiliats (molts a França i a Amèrica), repressió dels vençuts i gairebé quaranta anys de dictadura.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Ordena: batalla del Ebro, golpe de Estado, bombardeo de Guernica, fin de la guerra.', 'Put in order: Battle of the Ebro, the coup, the bombing of Guernica, the end of the war.', 'Ordena: batalla de l’Ebre, cop d’Estat, bombardeig de Guernica, fi de la guerra.'),
      s: T('Golpe de Estado (julio de 1936) → Guernica (abril de 1937) → batalla del Ebro (1938) → fin de la guerra (abril de 1939).', 'Coup (July 1936) → Guernica (April 1937) → Battle of the Ebro (1938) → end of the war (April 1939).', 'Cop d’Estat (juliol de 1936) → Guernica (abril de 1937) → batalla de l’Ebre (1938) → fi de la guerra (abril de 1939).') },
    { e: T('¿Qué países ayudaron a cada bando?', 'Which countries helped each side?', 'Quins països van ajudar cada bàndol?'),
      s: T('A la República, la URSS y los voluntarios de las Brigadas Internacionales. A los sublevados, Alemania e Italia. Francia y Reino Unido promovieron la «no intervención».', 'The Republic: the USSR and the volunteers of the International Brigades. The rebels: Germany and Italy. France and Britain promoted «non-intervention».', 'La República, l’URSS i els voluntaris de les Brigades Internacionals. Els revoltats, Alemanya i Itàlia. França i el Regne Unit van promoure la «no-intervenció».') },
    { e: T('¿Cuánto duró la guerra?', 'How long did the war last?', 'Quant va durar la guerra?'),
      s: T('Casi tres años: del 18 de julio de 1936 al 1 de abril de 1939.', 'Almost three years: from 18 July 1936 to 1 April 1939.', 'Gairebé tres anys: del 18 de juliol de 1936 a l’1 d’abril de 1939.') },
  ],
}

const edadMedia = {
  metaTitle: L('La Edad Media: feudalismo, estamentos, Islam, románico y gótico y Al-Ándalus — resumen y ejercicios', 'The Middle Ages: feudalism, the three estates, Islam, Romanesque and Gothic, and al-Andalus — summary', 'L’Edat Mitjana: feudalisme, estaments, Islam, romànic i gòtic i Al-Andalus — resum i exercicis'),
  secciones: [
    {
      titulo: L('El feudalismo y los estamentos', 'Feudalism and the estates', 'El feudalisme i els estaments'),
      tabla: {
        columnas: L(['Estamento', 'Quiénes', 'Qué hacían'], ['Estate', 'Who', 'What they did'], ['Estament', 'Qui', 'Què feien']),
        filas: [
          [L('Nobleza', 'Nobility', 'Noblesa'), L('el rey, los nobles y los caballeros', 'the king, nobles and knights', 'el rei, els nobles i els cavallers'), L('guerreaban y protegían; eran señores de feudos (privilegiados)', 'fought and protected; they were lords of fiefs (privileged)', 'guerrejaven i protegien; eren senyors de feus (privilegiats)')],
          [L('Clero', 'Clergy', 'Clergat'), L('obispos, abades, monjes, sacerdotes', 'bishops, abbots, monks, priests', 'bisbes, abats, monjos, sacerdots'), L('rezaban y guardaban la cultura en los monasterios (privilegiados)', 'prayed and kept learning alive in monasteries (privileged)', 'resaven i guardaven la cultura als monestirs (privilegiats)')],
          [L('Campesinos y siervos', 'Peasants and serfs', 'Pagesos i serfs'), L('la gran mayoría', 'the vast majority', 'la gran majoria'), L('trabajaban la tierra y pagaban tributos al señor (no privilegiados)', 'worked the land and paid dues to the lord (unprivileged)', 'treballaven la terra i pagaven tributs al senyor (no privilegiats)')],
        ],
      },
      texto: L(
        ['El feudalismo se basaba en el vasallaje: un vasallo juraba fidelidad y ayuda militar a un señor a cambio de protección y de un feudo (tierras). En la Baja Edad Media crecieron las ciudades y apareció la burguesía (comerciantes y artesanos organizados en gremios).'],
        ['Feudalism was based on vassalage: a vassal swore loyalty and military help to a lord in exchange for protection and a fief (land). In the Late Middle Ages towns grew and the bourgeoisie appeared (merchants and craftsmen organised in guilds).'],
        ['El feudalisme es basava en el vassallatge: un vassall jurava fidelitat i ajuda militar a un senyor a canvi de protecció i d’un feu (terres). A la Baixa Edat Mitjana van créixer les ciutats i va aparèixer la burgesia (comerciants i artesans organitzats en gremis).'],
      ),
    },
    {
      titulo: L('Románico y gótico', 'Romanesque and Gothic', 'Romànic i gòtic'),
      tabla: {
        columnas: L(['', 'Románico (s. XI-XII)', 'Gótico (s. XII-XV)'], ['', 'Romanesque (11th-12th c.)', 'Gothic (12th-15th c.)'], ['', 'Romànic (s. XI-XII)', 'Gòtic (s. XII-XV)']),
        filas: [
          [L('Arcos', 'Arches', 'Arcs'), L('de medio punto', 'round', 'de mig punt'), L('apuntados', 'pointed', 'apuntats')],
          [L('Muros y luz', 'Walls and light', 'Murs i llum'), L('gruesos, ventanas pequeñas: interior oscuro', 'thick, small windows: dark inside', 'gruixuts, finestres petites: interior fosc'), L('finos, grandes vidrieras y rosetones: mucha luz', 'thin, large stained-glass windows and rose windows: lots of light', 'prims, grans vidrieres i rosasses: molta llum')],
          [L('Dónde', 'Where', 'On'), L('monasterios e iglesias rurales', 'monasteries and country churches', 'monestirs i esglésies rurals'), L('catedrales de las ciudades', 'city cathedrals', 'catedrals de les ciutats')],
          [L('Ejemplos', 'Examples', 'Exemples'), L('catedral de Santiago, San Clemente de Taüll', 'Santiago Cathedral, Sant Climent de Taüll', 'catedral de Santiago, Sant Climent de Taüll'), L('catedrales de León, Burgos y Toledo', 'León, Burgos and Toledo cathedrals', 'catedrals de Lleó, Burgos i Toledo')],
        ],
      },
      lista: L(
        ['Empieza en el 476 (caída de Roma) y acaba en 1453 (caída de Constantinopla) o en 1492, según el libro.', 'En la península, los musulmanes llegan en el 711 y forman Al-Ándalus (Córdoba fue su gran capital); los reinos cristianos del norte avanzan hacia el sur hasta la toma de Granada en 1492.', 'La peste negra (1348) mató a un tercio de la población de Europa.'],
        ['It begins in 476 (fall of Rome) and ends in 1453 (fall of Constantinople) or in 1492, depending on the textbook.', 'In Iberia, Muslims arrive in 711 and form al-Andalus (Córdoba was its great capital); the Christian kingdoms of the north push south until Granada falls in 1492.', 'The Black Death (1348) killed a third of Europe’s population.'],
        ['Comença el 476 (caiguda de Roma) i acaba el 1453 (caiguda de Constantinoble) o el 1492, segons el llibre.', 'A la península, els musulmans arriben el 711 i formen Al-Andalus (Còrdova en va ser la gran capital); els regnes cristians del nord avancen cap al sud fins a la presa de Granada el 1492.', 'La pesta negra (1348) va matar un terç de la població d’Europa.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Románico o gótico? a) Arco apuntado. b) Muros gruesos y poca luz. c) Grandes vidrieras. d) Arco de medio punto.', 'Romanesque or Gothic? a) Pointed arch. b) Thick walls and little light. c) Large stained-glass windows. d) Round arch.', 'Romànic o gòtic? a) Arc apuntat. b) Murs gruixuts i poca llum. c) Grans vidrieres. d) Arc de mig punt.'),
      s: T('a) Gótico. b) Románico. c) Gótico. d) Románico.', 'a) Gothic. b) Romanesque. c) Gothic. d) Romanesque.', 'a) Gòtic. b) Romànic. c) Gòtic. d) Romànic.') },
    { e: T('¿Qué recibía un vasallo de su señor y qué le daba a cambio?', 'What did a vassal get from his lord, and what did he give in return?', 'Què rebia un vassall del seu senyor i què li donava a canvi?'),
      s: T('Recibía protección y un feudo (tierras); a cambio le juraba fidelidad y le prestaba ayuda militar y consejo.', 'He got protection and a fief (land); in return he swore loyalty and gave military help and advice.', 'Rebia protecció i un feu (terres); a canvi li jurava fidelitat i li prestava ajuda militar i consell.') },
    { e: T('¿Cuántos años duró Al-Ándalus, del 711 a 1492?', 'How long did al-Andalus last, from 711 to 1492?', 'Quants anys va durar Al-Andalus, del 711 al 1492?'),
      s: T('1492 − 711 = 781 años.', '1492 − 711 = 781 years.', '1492 − 711 = 781 anys.') },
  ],
}

const edadModerna = {
  metaTitle: L('La Edad Moderna: descubrimientos, Renacimiento, Reforma, Austrias y Borbones e Ilustración — resumen', 'The early modern age: voyages of discovery, the Renaissance, the Reformation, absolutism and the Enlightenment', 'L’Edat Moderna: descobriments, Renaixement, Reforma, Àustries i Borbons i Il·lustració — resum i exercicis'),
  secciones: [
    {
      titulo: L('Fechas y hechos clave', 'Key dates and events', 'Dates i fets clau'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          ['1492', L('Colón llega a América; los Reyes Católicos toman Granada', 'Columbus reaches America; the Catholic Monarchs take Granada', 'Colom arriba a Amèrica; els Reis Catòlics prenen Granada')],
          ['1517', L('Lutero publica sus 95 tesis: empieza la Reforma protestante', 'Luther publishes his 95 theses: the Protestant Reformation begins', 'Luter publica les seves 95 tesis: comença la Reforma protestant')],
          ['1519-1522', L('Magallanes y Elcano dan la primera vuelta al mundo', 'Magellan and Elcano complete the first circumnavigation', 'Magallanes i Elcano fan la primera volta al món')],
          ['1545-1563', L('Concilio de Trento: Contrarreforma católica', 'Council of Trent: the Catholic Counter-Reformation', 'Concili de Trento: Contrareforma catòlica')],
          [L('s. XVI-XVII', '16th-17th c.', 's. XVI-XVII'), L('los Austrias reinan en España (Carlos I, Felipe II…): el imperio más grande del momento', 'the Habsburgs rule Spain (Charles I, Philip II…): the largest empire of its time', 'els Àustries regnen a Espanya (Carles I, Felip II…): l’imperi més gran del moment')],
          ['1700-1714', L('Guerra de Sucesión: llegan los Borbones con Felipe V', 'War of the Spanish Succession: the Bourbons arrive with Philip V', 'Guerra de Successió: arriben els Borbons amb Felip V')],
          [L('s. XVIII', '18th c.', 's. XVIII'), L('la Ilustración: razón, ciencia y crítica al absolutismo', 'the Enlightenment: reason, science and criticism of absolutism', 'la Il·lustració: raó, ciència i crítica a l’absolutisme')],
          ['1789', L('Revolución Francesa: fin de la Edad Moderna', 'French Revolution: the end of the early modern age', 'Revolució Francesa: fi de l’Edat Moderna')],
        ],
      },
      lista: L(
        ['Renacimiento (s. XV-XVI): se recupera la cultura de Grecia y Roma y el ser humano pasa al centro (humanismo). Artistas: Leonardo, Miguel Ángel, Rafael.', 'Barroco (s. XVII): arte de movimiento, contraste de luz y sombra y emoción. Pintores: Velázquez, Rubens, Caravaggio.', 'Monarquía absoluta: el rey concentra todo el poder, «por la gracia de Dios»; el ejemplo es Luis XIV de Francia.'],
        ['Renaissance (15th-16th c.): the culture of Greece and Rome is revived and human beings move to the centre (humanism). Artists: Leonardo, Michelangelo, Raphael.', 'Baroque (17th c.): art of movement, contrast of light and shade, and emotion. Painters: Velázquez, Rubens, Caravaggio.', 'Absolute monarchy: the king holds all power, «by the grace of God»; the example is Louis XIV of France.'],
        ['Renaixement (s. XV-XVI): es recupera la cultura de Grècia i Roma i l’ésser humà passa al centre (humanisme). Artistes: Leonardo, Miquel Àngel, Rafael.', 'Barroc (s. XVII): art de moviment, contrast de llum i ombra i emoció. Pintors: Velázquez, Rubens, Caravaggio.', 'Monarquia absoluta: el rei concentra tot el poder, «per la gràcia de Déu»; l’exemple és Lluís XIV de França.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Ordena: Ilustración, descubrimiento de América, Reforma de Lutero, llegada de los Borbones.', 'Put in order: the Enlightenment, the discovery of America, Luther’s Reformation, the arrival of the Bourbons.', 'Ordena: Il·lustració, descobriment d’Amèrica, Reforma de Luter, arribada dels Borbons.'),
      s: T('Descubrimiento de América (1492) → Reforma (1517) → Borbones (1700) → Ilustración (s. XVIII).', 'Discovery of America (1492) → Reformation (1517) → Bourbons (1700) → Enlightenment (18th c.).', 'Descobriment d’Amèrica (1492) → Reforma (1517) → Borbons (1700) → Il·lustració (s. XVIII).') },
    { e: T('¿Qué fue la Contrarreforma?', 'What was the Counter-Reformation?', 'Què va ser la Contrareforma?'),
      s: T('La respuesta de la Iglesia católica a la Reforma protestante, sobre todo con el Concilio de Trento (1545-1563): fijó sus doctrinas y reforzó su organización.', 'The Catholic Church’s response to the Protestant Reformation, above all through the Council of Trent (1545-1563): it fixed its doctrines and strengthened its organisation.', 'La resposta de l’Església catòlica a la Reforma protestant, sobretot amb el Concili de Trento (1545-1563): en va fixar les doctrines i en va reforçar l’organització.') },
    { e: T('¿Renacimiento o Barroco? Las Meninas de Velázquez y la Gioconda de Leonardo.', 'Renaissance or Baroque? Velázquez’s Las Meninas and Leonardo’s Mona Lisa.', 'Renaixement o Barroc? Les Menines de Velázquez i la Gioconda de Leonardo.'),
      s: T('Las Meninas, Barroco (1656). La Gioconda, Renacimiento (principios del s. XVI).', 'Las Meninas: Baroque (1656). The Mona Lisa: Renaissance (early 16th century).', 'Les Menines, Barroc (1656). La Gioconda, Renaixement (principis del s. XVI).') },
  ],
}

const revFrancesa = {
  metaTitle: L('La Revolución Francesa: causas, etapas (1789-1799), Bastilla, Terror y Napoleón — resumen y ejercicios', 'The French Revolution: causes, stages (1789-1799), the Bastille, the Terror and Napoleon — summary and practice', 'La Revolució Francesa: causes, etapes (1789-1799), Bastilla, Terror i Napoleó — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las etapas', 'The stages', 'Les etapes'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          [L('mayo-junio de 1789', 'May-June 1789', 'maig-juny de 1789'), L('se reúnen los Estados Generales; el Tercer Estado se proclama Asamblea Nacional', 'the Estates-General meet; the Third Estate declares itself the National Assembly', 'es reuneixen els Estats Generals; el Tercer Estat es proclama Assemblea Nacional')],
          [L('14 de julio de 1789', '14 July 1789', '14 de juliol de 1789'), L('toma de la Bastilla', 'storming of the Bastille', 'presa de la Bastilla')],
          [L('agosto de 1789', 'August 1789', 'agost de 1789'), L('Declaración de los Derechos del Hombre y del Ciudadano; fin de los privilegios', 'Declaration of the Rights of Man and of the Citizen; end of privileges', 'Declaració dels Drets de l’Home i del Ciutadà; fi dels privilegis')],
          ['1791', L('monarquía constitucional', 'constitutional monarchy', 'monarquia constitucional')],
          ['1792', L('se proclama la República', 'the Republic is proclaimed', 'es proclama la República')],
          ['1793-1794', L('ejecución de Luis XVI; el Terror de Robespierre', 'execution of Louis XVI; Robespierre’s Terror', 'execució de Lluís XVI; el Terror de Robespierre')],
          ['1795-1799', L('el Directorio, un gobierno más moderado', 'the Directory, a more moderate government', 'el Directori, un govern més moderat')],
          ['1799', L('golpe de Estado de Napoleón: fin de la Revolución', 'Napoleon’s coup: the end of the Revolution', 'cop d’Estat de Napoleó: fi de la Revolució')],
        ],
      },
      lista: L(
        ['Causas: el Estado estaba arruinado, el pan era caro, el Tercer Estado (el 98 % de la población) pagaba los impuestos sin tener privilegios, y las ideas de la Ilustración criticaban el absolutismo.', 'Lema: «Libertad, igualdad, fraternidad». Marca el paso de la Edad Moderna a la Contemporánea y extiende por Europa la soberanía nacional y los derechos de los ciudadanos.'],
        ['Causes: the state was bankrupt, bread was expensive, the Third Estate (98 % of the population) paid the taxes without privileges, and Enlightenment ideas criticised absolutism.', 'Motto: «Liberty, equality, fraternity». It marks the shift from the early modern to the modern age and spreads national sovereignty and citizens’ rights across Europe.'],
        ['Causes: l’Estat estava arruïnat, el pa era car, el Tercer Estat (el 98 % de la població) pagava els impostos sense tenir privilegis, i les idees de la Il·lustració criticaven l’absolutisme.', 'Lema: «Llibertat, igualtat, fraternitat». Marca el pas de l’Edat Moderna a la Contemporània i estén per Europa la sobirania nacional i els drets dels ciutadans.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Por qué el 14 de julio es la fiesta nacional de Francia?', 'Why is 14 July France’s national holiday?', 'Per què el 14 de juliol és la festa nacional de França?'),
      s: T('Porque ese día de 1789 el pueblo de París tomó la Bastilla, una prisión que simbolizaba el poder absoluto del rey.', 'Because on that day in 1789 the people of Paris stormed the Bastille, a prison that symbolised the king’s absolute power.', 'Perquè aquell dia del 1789 el poble de París va prendre la Bastilla, una presó que simbolitzava el poder absolut del rei.') },
    { e: T('Ordena: ejecución de Luis XVI, toma de la Bastilla, golpe de Napoleón, proclamación de la República.', 'Put in order: Louis XVI’s execution, the storming of the Bastille, Napoleon’s coup, the proclamation of the Republic.', 'Ordena: execució de Lluís XVI, presa de la Bastilla, cop de Napoleó, proclamació de la República.'),
      s: T('Bastilla (1789) → República (1792) → ejecución de Luis XVI (1793) → golpe de Napoleón (1799).', 'Bastille (1789) → Republic (1792) → Louis XVI executed (1793) → Napoleon’s coup (1799).', 'Bastilla (1789) → República (1792) → execució de Lluís XVI (1793) → cop de Napoleó (1799).') },
    { e: T('¿Por qué estaba descontento el Tercer Estado?', 'Why was the Third Estate unhappy?', 'Per què estava descontent el Tercer Estat?'),
      s: T('Era casi toda la población y pagaba los impuestos, mientras la nobleza y el clero tenían privilegios y no pagaban; además, en 1788-1789 hubo malas cosechas y el pan se encareció.', 'It was nearly the whole population and paid the taxes, while the nobility and clergy had privileges and did not pay; on top of that, the 1788-1789 harvests were bad and bread became dearer.', 'Era gairebé tota la població i pagava els impostos, mentre la noblesa i el clergat tenien privilegis i no en pagaven; a més, el 1788-1789 hi va haver males collites i el pa es va encarir.') },
  ],
}

const revIndustrial = {
  metaTitle: L('La Revolución Industrial: causas, máquina de vapor, ferrocarril, burguesía y movimiento obrero — resumen', 'The Industrial Revolution: causes, the steam engine, railways, the middle class and the labour movement', 'La Revolució Industrial: causes, màquina de vapor, ferrocarril, burgesia i moviment obrer — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las dos revoluciones industriales', 'The two industrial revolutions', 'Les dues revolucions industrials'),
      tabla: {
        columnas: L(['', 'Primera', 'Segunda'], ['', 'First', 'Second'], ['', 'Primera', 'Segona']),
        filas: [
          [L('Cuándo y dónde', 'When and where', 'Quan i on'), L('desde la segunda mitad del s. XVIII, en Gran Bretaña', 'from the second half of the 18th century, in Britain', 'des de la segona meitat del s. XVIII, a la Gran Bretanya'), L('desde 1870, en Alemania, EE. UU. y otros países', 'from 1870, in Germany, the USA and elsewhere', 'des del 1870, a Alemanya, els EUA i altres països')],
          [L('Energía', 'Energy', 'Energia'), L('carbón y máquina de vapor (mejorada por James Watt)', 'coal and the steam engine (improved by James Watt)', 'carbó i màquina de vapor (millorada per James Watt)'), L('electricidad y petróleo', 'electricity and oil', 'electricitat i petroli')],
          [L('Industrias', 'Industries', 'Indústries'), L('textil del algodón y siderurgia (hierro)', 'cotton textiles and iron', 'tèxtil del cotó i siderúrgia (ferro)'), L('acero, química, automóvil', 'steel, chemicals, cars', 'acer, química, automòbil')],
          [L('Transporte', 'Transport', 'Transport'), L('ferrocarril y barco de vapor', 'railways and steamships', 'ferrocarril i vaixell de vapor'), L('automóvil y, después, avión', 'cars and, later, aeroplanes', 'automòbil i, després, avió')],
        ],
      },
      lista: L(
        ['Causas: la revolución agrícola (más comida y mano de obra libre), el crecimiento de la población, el carbón y el hierro abundantes, el dinero del comercio y las colonias como mercado.', 'Sociedad de clases: la burguesía, dueña de fábricas y bancos, y el proletariado, obreros con jornadas de 12-14 horas, trabajo infantil y barrios insalubres.', 'Movimiento obrero: primero el ludismo (romper máquinas), después los sindicatos y las ideas socialistas (Marx) y anarquistas, que pedían mejores condiciones.', 'En España llegó más tarde y en pocas zonas: el textil en Cataluña y la siderurgia en el País Vasco.'],
        ['Causes: the agricultural revolution (more food and free labour), population growth, plenty of coal and iron, money from trade, and the colonies as a market.', 'Class society: the bourgeoisie, who owned factories and banks, and the proletariat, workers with 12-14-hour days, child labour and unhealthy slums.', 'Labour movement: first Luddism (breaking machines), then trade unions and socialist (Marx) and anarchist ideas, demanding better conditions.', 'In Spain it came later and to few areas: textiles in Catalonia and iron and steel in the Basque Country.'],
        ['Causes: la revolució agrícola (més menjar i mà d’obra lliure), el creixement de la població, el carbó i el ferro abundants, els diners del comerç i les colònies com a mercat.', 'Societat de classes: la burgesia, propietària de fàbriques i bancs, i el proletariat, obrers amb jornades de 12-14 hores, treball infantil i barris insalubres.', 'Moviment obrer: primer el luddisme (trencar màquines), després els sindicats i les idees socialistes (Marx) i anarquistes, que demanaven millors condicions.', 'A Espanya va arribar més tard i a poques zones: el tèxtil a Catalunya i la siderúrgia al País Basc.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Por qué empezó la Revolución Industrial en Gran Bretaña?', 'Why did the Industrial Revolution start in Britain?', 'Per què va començar la Revolució Industrial a la Gran Bretanya?'),
      s: T('Porque reunía todo lo necesario: más comida y gente gracias a la revolución agrícola, mucho carbón y hierro, dinero del comercio, colonias donde vender y un gobierno favorable a los negocios.', 'Because it had everything needed: more food and people thanks to the agricultural revolution, plenty of coal and iron, money from trade, colonies to sell to, and a business-friendly government.', 'Perquè ho reunia tot: més menjar i gent gràcies a la revolució agrícola, molt de carbó i ferro, diners del comerç, colònies on vendre i un govern favorable als negocis.') },
    { e: T('¿Primera o segunda revolución industrial? Electricidad, máquina de vapor, automóvil, ferrocarril.', 'First or second industrial revolution? Electricity, the steam engine, the car, the railway.', 'Primera o segona revolució industrial? Electricitat, màquina de vapor, automòbil, ferrocarril.'),
      s: T('Primera: máquina de vapor y ferrocarril. Segunda: electricidad y automóvil.', 'First: the steam engine and the railway. Second: electricity and the car.', 'Primera: màquina de vapor i ferrocarril. Segona: electricitat i automòbil.') },
    { e: T('¿Qué pedía el movimiento obrero?', 'What did the labour movement demand?', 'Què demanava el moviment obrer?'),
      s: T('Jornadas más cortas (la de 8 horas), mejores salarios, prohibir el trabajo infantil, seguridad en las fábricas y derecho a formar sindicatos y hacer huelga.', 'Shorter hours (the 8-hour day), better pay, a ban on child labour, factory safety and the right to form unions and strike.', 'Jornades més curtes (la de 8 hores), millors salaris, prohibir el treball infantil, seguretat a les fàbriques i dret a formar sindicats i fer vaga.') },
  ],
}

const igm = {
  metaTitle: L('La Primera Guerra Mundial (1914-1918): causas, alianzas, fases y consecuencias — resumen y ejercicios', 'The First World War (1914-1918): causes, alliances, stages and consequences — summary and practice questions', 'La Primera Guerra Mundial (1914-1918): causes, aliances, fases i conseqüències — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los dos bloques', 'The two blocs', 'Els dos blocs'),
      tabla: {
        columnas: L(['Bloque', 'Países principales'], ['Bloc', 'Main countries'], ['Bloc', 'Països principals']),
        filas: [
          [L('Triple Entente (aliados)', 'Triple Entente (Allies)', 'Triple Entesa (aliats)'), L('Francia, Reino Unido y Rusia; después Italia (1915) y EE. UU. (1917)', 'France, Britain and Russia; later Italy (1915) and the USA (1917)', 'França, el Regne Unit i Rússia; després Itàlia (1915) i els EUA (1917)')],
          [L('Imperios centrales', 'Central Powers', 'Imperis centrals'), L('Alemania y Austria-Hungría, con el Imperio otomano y Bulgaria', 'Germany and Austria-Hungary, with the Ottoman Empire and Bulgaria', 'Alemanya i Àustria-Hongria, amb l’Imperi otomà i Bulgària')],
        ],
      },
      lista: L(
        ['Causas: la rivalidad por las colonias (imperialismo), los nacionalismos, la carrera de armamentos y el sistema de alianzas. El detonante fue el asesinato del archiduque Francisco Fernando de Austria en Sarajevo (28 de junio de 1914).', 'Fases: guerra de movimientos (1914), guerra de trincheras (1915-1917, con batallas como Verdún, 1916) y 1917, cuando entra EE. UU. y sale Rusia tras su revolución. El 11 de noviembre de 1918 Alemania firma el armisticio.', 'Consecuencias: unos 10 millones de soldados muertos, desaparecen cuatro imperios (alemán, austrohúngaro, ruso y otomano), Alemania es castigada en el Tratado de Versalles (1919) y nace la Sociedad de Naciones.'],
        ['Causes: rivalry over colonies (imperialism), nationalism, the arms race and the system of alliances. The trigger was the assassination of Archduke Franz Ferdinand of Austria in Sarajevo (28 June 1914).', 'Stages: a war of movement (1914), trench warfare (1915-1917, with battles such as Verdun, 1916), and 1917, when the USA joins and Russia leaves after its revolution. On 11 November 1918 Germany signs the armistice.', 'Consequences: about 10 million soldiers dead, four empires disappear (German, Austro-Hungarian, Russian and Ottoman), Germany is punished in the Treaty of Versailles (1919) and the League of Nations is founded.'],
        ['Causes: la rivalitat per les colònies (imperialisme), els nacionalismes, la cursa d’armaments i el sistema d’aliances. El detonant va ser l’assassinat de l’arxiduc Francesc Ferran d’Àustria a Sarajevo (28 de juny de 1914).', 'Fases: guerra de moviments (1914), guerra de trinxeres (1915-1917, amb batalles com Verdun, 1916) i 1917, quan entren els EUA i en surt Rússia després de la seva revolució. L’11 de novembre de 1918 Alemanya signa l’armistici.', 'Conseqüències: uns 10 milions de soldats morts, desapareixen quatre imperis (alemany, austrohongarès, rus i otomà), Alemanya és castigada al Tractat de Versalles (1919) i neix la Societat de Nacions.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Qué hecho desencadenó la guerra y dónde ocurrió?', 'What event triggered the war, and where did it happen?', 'Quin fet va desencadenar la guerra i on va passar?'),
      s: T('El asesinato del archiduque Francisco Fernando, heredero de Austria-Hungría, en Sarajevo, el 28 de junio de 1914.', 'The assassination of Archduke Franz Ferdinand, heir to Austria-Hungary, in Sarajevo on 28 June 1914.', 'L’assassinat de l’arxiduc Francesc Ferran, hereu d’Àustria-Hongria, a Sarajevo, el 28 de juny de 1914.') },
    { e: T('¿Por qué fue tan importante el año 1917?', 'Why was 1917 so important?', 'Per què va ser tan important l’any 1917?'),
      s: T('Porque EE. UU. entró en la guerra con los aliados y Rusia salió de ella tras la revolución. La entrada de EE. UU. inclinó la balanza.', 'Because the USA entered the war with the Allies and Russia left it after the revolution. American entry tipped the balance.', 'Perquè els EUA van entrar a la guerra amb els aliats i Rússia en va sortir després de la revolució. L’entrada dels EUA va decantar la balança.') },
    { e: T('¿Qué imperios desaparecieron tras la guerra?', 'Which empires disappeared after the war?', 'Quins imperis van desaparèixer després de la guerra?'),
      s: T('El alemán, el austrohúngaro, el ruso y el otomano.', 'The German, Austro-Hungarian, Russian and Ottoman empires.', 'L’alemany, l’austrohongarès, el rus i l’otomà.') },
  ],
}

export const AMPLIACION_T9 = {
  roma, gce, 'edad-media': edadMedia, 'edad-moderna': edadModerna,
  'revolucion-francesa': revFrancesa, 'revolucion-industrial': revIndustrial, 'primera-guerra-mundial': igm,
}
