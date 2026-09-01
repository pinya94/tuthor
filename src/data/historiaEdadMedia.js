// Edad Media (feudalismo, Al-Ándalus, Reconquista) — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-edad-media.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('em-01', 'primaria',
    { es: '¿Qué imperio cayó en el año 476 d.C., marcando el inicio de la Edad Media?', en: 'Which empire fell in AD 476, marking the start of the Middle Ages?', ca: 'Quin imperi va caure l\'any 476 dC, marcant l\'inici de l\'Edat Mitjana?' },
    { es: ['El Imperio Romano de Occidente', 'El Imperio Egipcio', 'El Imperio Griego', 'El Imperio Persa'], en: ['The Western Roman Empire', 'The Egyptian Empire', 'The Greek Empire', 'The Persian Empire'], ca: ['L\'Imperi Romà d\'Occident', 'L\'Imperi Egipci', 'L\'Imperi Grec', 'L\'Imperi Persa'] },
    { es: 'El Imperio Romano de Occidente', en: 'The Western Roman Empire', ca: 'L\'Imperi Romà d\'Occident' },
    '🏛️',
    { es: 'La caída del Imperio Romano de Occidente en el 476 d.C. marca tradicionalmente el final de la Edad Antigua y el comienzo de la Edad Media.', en: 'The fall of the Western Roman Empire in AD 476 traditionally marks the end of Antiquity and the start of the Middle Ages.', ca: 'La caiguda de l\'Imperi Romà d\'Occident el 476 dC marca tradicionalment el final de l\'Edat Antiga i el començament de l\'Edat Mitjana.' }),

  q('em-02', 'primaria',
    { es: '¿Cómo se llama el sistema en el que un señor daba tierras a un vasallo a cambio de fidelidad?', en: 'What is the system called in which a lord gave land to a vassal in exchange for loyalty?', ca: 'Com es diu el sistema en què un senyor donava terres a un vassall a canvi de fidelitat?' },
    { es: ['El feudalismo', 'La democracia', 'La república', 'El imperialismo'], en: ['Feudalism', 'Democracy', 'The republic', 'Imperialism'], ca: ['El feudalisme', 'La democràcia', 'La república', 'L\'imperialisme'] },
    { es: 'El feudalismo', en: 'Feudalism', ca: 'El feudalisme' },
    '🏰',
    { es: 'El feudalismo fue el sistema social y político típico de la Europa medieval: los reyes y nobles daban tierras a cambio de fidelidad y servicio militar.', en: 'Feudalism was the typical social and political system of medieval Europe: kings and nobles granted land in exchange for loyalty and military service.', ca: 'El feudalisme va ser el sistema social i polític típic de l\'Europa medieval: els reis i nobles donaven terres a canvi de fidelitat i servei militar.' }),

  q('em-03', 'primaria',
    { es: '¿Cómo se llamaba la tierra que un señor feudal daba a su vasallo?', en: 'What was the land a feudal lord gave to his vassal called?', ca: 'Com es deia la terra que un senyor feudal donava al seu vassall?' },
    { es: ['Un feudo', 'Un imperio', 'Una república', 'Una colonia'], en: ['A fief', 'An empire', 'A republic', 'A colony'], ca: ['Un feu', 'Un imperi', 'Una república', 'Una colònia'] },
    { es: 'Un feudo', en: 'A fief', ca: 'Un feu' },
    '🌾',
    { es: 'El feudo era la tierra que un señor cedía a su vasallo. A cambio, el vasallo le debía fidelidad y ayuda militar cuando hiciera falta.', en: 'A fief was the land a lord granted to his vassal. In exchange, the vassal owed him loyalty and military help when needed.', ca: 'El feu era la terra que un senyor cedia al seu vassall. A canvi, el vassall li devia fidelitat i ajuda militar quan calgués.' }),

  q('em-04', 'primaria',
    { es: '¿Quiénes trabajaban la tierra de los señores feudales, sin ser del todo libres?', en: 'Who worked the land of feudal lords, without being fully free?', ca: 'Qui treballava la terra dels senyors feudals, sense ser del tot lliures?' },
    { es: ['Los siervos', 'Los reyes', 'Los caballeros', 'Los obispos'], en: ['The serfs', 'The kings', 'The knights', 'The bishops'], ca: ['Els serfs', 'Els reis', 'Els cavallers', 'Els bisbes'] },
    { es: 'Los siervos', en: 'The serfs', ca: 'Els serfs' },
    '🌾',
    { es: 'Los siervos eran campesinos que trabajaban la tierra de los señores feudales sin tener libertad plena, en el escalón más bajo de la pirámide feudal.', en: 'Serfs were peasants who worked the land of feudal lords without full freedom, at the bottom of the feudal pyramid.', ca: 'Els serfs eren camperols que treballaven la terra dels senyors feudals sense tenir llibertat plena, a l\'esglaó més baix de la piràmide feudal.' }),

  q('em-05', 'primaria',
    { es: '¿Cómo se llamaba el territorio de la península ibérica bajo dominio musulmán?', en: 'What was the territory of the Iberian Peninsula under Muslim rule called?', ca: 'Com es deia el territori de la península ibèrica sota domini musulmà?' },
    { es: ['Al-Ándalus', 'Hispania', 'Tartesos', 'Numancia'], en: ['Al-Andalus', 'Hispania', 'Tartessos', 'Numantia'], ca: ['Al-Àndalus', 'Hispània', 'Tartessos', 'Numància'] },
    { es: 'Al-Ándalus', en: 'Al-Andalus', ca: 'Al-Àndalus' },
    '🕌',
    { es: 'Al-Ándalus era el nombre del territorio de la península ibérica gobernado por los musulmanes desde el 711 hasta 1492.', en: 'Al-Andalus was the name of the territory of the Iberian Peninsula ruled by Muslims from 711 to 1492.', ca: 'Al-Àndalus era el nom del territori de la península ibèrica governat pels musulmans des del 711 fins al 1492.' }),

  q('em-06', 'primaria',
    { es: '¿Qué ciudad fue la capital del Califato de Al-Ándalus?', en: 'Which city was the capital of the Caliphate of Al-Andalus?', ca: 'Quina ciutat va ser la capital del Califat d\'Al-Àndalus?' },
    { es: ['Córdoba', 'Madrid', 'Barcelona', 'Sevilla'], en: ['Córdoba', 'Madrid', 'Barcelona', 'Seville'], ca: ['Còrdova', 'Madrid', 'Barcelona', 'Sevilla'] },
    { es: 'Córdoba', en: 'Córdoba', ca: 'Còrdova' },
    '🕌',
    { es: 'Córdoba fue la capital del Califato de Al-Ándalus y una de las ciudades más avanzadas y pobladas de toda Europa en su época.', en: 'Córdoba was the capital of the Caliphate of Al-Andalus and one of the most advanced and populous cities in all of Europe at the time.', ca: 'Còrdova va ser la capital del Califat d\'Al-Àndalus i una de les ciutats més avançades i poblades de tota Europa en la seva època.' }),

  q('em-07', 'primaria',
    { es: '¿Cómo se llama el proceso por el que los reinos cristianos fueron reconquistando territorio a Al-Ándalus?', en: 'What is the process called by which the Christian kingdoms gradually reconquered territory from Al-Andalus?', ca: 'Com es diu el procés pel qual els regnes cristians van anar reconquerint territori a Al-Àndalus?' },
    { es: ['La Reconquista', 'La Cruzada', 'La Colonización', 'La Independencia'], en: ['The Reconquista', 'The Crusade', 'The Colonisation', 'The Independence'], ca: ['La Reconquesta', 'La Croada', 'La Colonització', 'La Independència'] },
    { es: 'La Reconquista', en: 'The Reconquista', ca: 'La Reconquesta' },
    '⚔️',
    { es: 'La Reconquista fue el largo proceso, de casi 800 años, por el que los reinos cristianos del norte peninsular fueron recuperando el territorio de Al-Ándalus.', en: 'The Reconquista was the long process, lasting almost 800 years, by which the Christian kingdoms of the northern peninsula gradually recovered the territory of Al-Andalus.', ca: 'La Reconquesta va ser el llarg procés, de gairebé 800 anys, pel qual els regnes cristians del nord peninsular van anar recuperant el territori d\'Al-Àndalus.' }),

  q('em-08', 'primaria',
    { es: '¿En qué año terminó la Reconquista con la toma de Granada?', en: 'In what year did the Reconquista end with the capture of Granada?', ca: 'En quin any va acabar la Reconquesta amb la presa de Granada?' },
    { es: ['1492', '711', '1085', '1212'], en: ['1492', '711', '1085', '1212'], ca: ['1492', '711', '1085', '1212'] },
    { es: '1492', en: '1492', ca: '1492' },
    '👑',
    { es: 'En 1492, los Reyes Católicos conquistaron Granada, el último reino musulmán de la península, poniendo fin a la Reconquista el mismo año que Colón llegó a América.', en: 'In 1492, the Catholic Monarchs conquered Granada, the last Muslim kingdom on the peninsula, ending the Reconquista the same year Columbus reached America.', ca: 'El 1492, els Reis Catòlics van conquerir Granada, l\'últim regne musulmà de la península, posant fi a la Reconquesta el mateix any que Colom va arribar a Amèrica.' }),

  // ── ESO: Covadonga, El Cid, el Camino de Santiago y la Peste Negra ──
  q('em-09', 'eso',
    { es: '¿Qué batalla se considera tradicionalmente el inicio de la Reconquista?', en: 'What battle is traditionally considered the start of the Reconquista?', ca: 'Quina batalla es considera tradicionalment l\'inici de la Reconquesta?' },
    { es: ['La Batalla de Covadonga', 'La Batalla de las Navas de Tolosa', 'La Batalla de Guadalete', 'La Batalla de Lepanto'], en: ['The Battle of Covadonga', 'The Battle of Las Navas de Tolosa', 'The Battle of Guadalete', 'The Battle of Lepanto'], ca: ['La Batalla de Covadonga', 'La Batalla de les Navas de Tolosa', 'La Batalla de Guadalete', 'La Batalla de Lepant'] },
    { es: 'La Batalla de Covadonga', en: 'The Battle of Covadonga', ca: 'La Batalla de Covadonga' },
    '⛰️',
    { es: 'La Batalla de Covadonga (722) se considera tradicionalmente el primer paso de la Reconquista, con la victoria cristiana de Don Pelayo sobre las tropas musulmanas.', en: 'The Battle of Covadonga (722) is traditionally considered the first step of the Reconquista, with the Christian victory of Don Pelayo over Muslim forces.', ca: 'La Batalla de Covadonga (722) es considera tradicionalment el primer pas de la Reconquesta, amb la victòria cristiana de Don Pelai sobre les tropes musulmanes.' }),

  q('em-10', 'eso',
    { es: '¿Quién lideró la victoria cristiana en la Batalla de Covadonga?', en: 'Who led the Christian victory at the Battle of Covadonga?', ca: 'Qui va liderar la victòria cristiana a la Batalla de Covadonga?' },
    { es: ['Don Pelayo', 'El Cid Campeador', 'Fernando el Católico', 'Alfonso X'], en: ['Don Pelayo', 'El Cid', 'Ferdinand the Catholic', 'Alfonso X'], ca: ['Don Pelai', 'El Cid Campeador', 'Ferran el Catòlic', 'Alfons X'] },
    { es: 'Don Pelayo', en: 'Don Pelayo', ca: 'Don Pelai' },
    '🗡️',
    { es: 'Don Pelayo lideró la victoria cristiana en Covadonga en el año 722, considerada el punto de partida simbólico de la Reconquista.', en: 'Don Pelayo led the Christian victory at Covadonga in the year 722, considered the symbolic starting point of the Reconquista.', ca: 'Don Pelai va liderar la victòria cristiana a Covadonga l\'any 722, considerada el punt de partida simbòlic de la Reconquesta.' }),

  q('em-11', 'eso',
    { es: '¿Qué figura legendaria de la Reconquista conquistó la ciudad de Valencia?', en: 'Which legendary figure of the Reconquista conquered the city of Valencia?', ca: 'Quina figura llegendària de la Reconquesta va conquerir la ciutat de València?' },
    { es: ['El Cid Campeador', 'Don Pelayo', 'Fernando III', 'Jaime I'], en: ['El Cid', 'Don Pelayo', 'Ferdinand III', 'James I'], ca: ['El Cid Campeador', 'Don Pelai', 'Ferran III', 'Jaume I'] },
    { es: 'El Cid Campeador', en: 'El Cid', ca: 'El Cid Campeador' },
    '🐎',
    { es: 'El Cid Campeador, Rodrigo Díaz de Vivar, es una de las figuras más legendarias de la Reconquista, famoso por conquistar la ciudad de Valencia.', en: 'El Cid, Rodrigo Díaz de Vivar, is one of the most legendary figures of the Reconquista, famous for conquering the city of Valencia.', ca: 'El Cid Campeador, Rodrigo Díaz de Vivar, és una de les figures més llegendàries de la Reconquesta, famós per conquerir la ciutat de València.' }),

  q('em-12', 'eso',
    { es: '¿Cómo se llama la ruta de peregrinación cristiana medieval que aún hoy se recorre en el norte de España?', en: 'What is the medieval Christian pilgrimage route still walked today in northern Spain called?', ca: 'Com es diu la ruta de pelegrinatge cristiana medieval que encara avui es recorre al nord d\'Espanya?' },
    { es: ['El Camino de Santiago', 'La Ruta de la Seda', 'La Vía de la Plata romana', 'El Camino Real'], en: ['The Camino de Santiago', 'The Silk Road', 'The Roman Silver Route', 'The Camino Real'], ca: ['El Camí de Sant Jaume', 'La Ruta de la Seda', 'La Via de la Plata romana', 'El Camí Reial'] },
    { es: 'El Camino de Santiago', en: 'The Camino de Santiago', ca: 'El Camí de Sant Jaume' },
    '🥾',
    { es: 'El Camino de Santiago es la ruta de peregrinación medieval hacia la tumba del apóstol Santiago en Compostela, que sigue recorriéndose hoy en día.', en: 'The Camino de Santiago is the medieval pilgrimage route to the tomb of the Apostle James in Compostela, still walked today.', ca: 'El Camí de Sant Jaume és la ruta de pelegrinatge medieval cap a la tomba de l\'apòstol Jaume a Compostel·la, que encara es recorre avui dia.' }),

  q('em-13', 'eso',
    { es: '¿Qué epidemia mató a gran parte de la población europea en el siglo XIV?', en: 'What epidemic killed a large part of the European population in the 14th century?', ca: 'Quina epidèmia va matar gran part de la població europea al segle XIV?' },
    { es: ['La Peste Negra', 'La Viruela', 'El Cólera', 'La Gripe Española'], en: ['The Black Death', 'Smallpox', 'Cholera', 'The Spanish Flu'], ca: ['La Pesta Negra', 'La Verola', 'El Còlera', 'La Grip Espanyola'] },
    { es: 'La Peste Negra', en: 'The Black Death', ca: 'La Pesta Negra' },
    '☠️',
    { es: 'La Peste Negra (1347-1351) fue una epidemia devastadora que acabó con gran parte de la población europea, uno de los hitos más importantes de la Baja Edad Media.', en: 'The Black Death (1347-1351) was a devastating epidemic that wiped out a large part of the European population, one of the most important milestones of the Late Middle Ages.', ca: 'La Pesta Negra (1347-1351) va ser una epidèmia devastadora que va acabar amb gran part de la població europea, una de les fites més importants del Baix Edat Mitjana.' }),

  q('em-14', 'eso',
    { es: '¿Qué tres religiones convivieron, con matices, en la Al-Ándalus medieval?', en: 'What three religions coexisted, with nuances, in medieval Al-Andalus?', ca: 'Quines tres religions van conviure, amb matisos, a l\'Al-Àndalus medieval?' },
    { es: ['Cristianismo, islam y judaísmo', 'Budismo, hinduismo e islam', 'Cristianismo, budismo y judaísmo', 'Solo el islam'], en: ['Christianity, Islam and Judaism', 'Buddhism, Hinduism and Islam', 'Christianity, Buddhism and Judaism', 'Only Islam'], ca: ['Cristianisme, islam i judaisme', 'Budisme, hinduisme i islam', 'Cristianisme, budisme i judaisme', 'Només l\'islam'] },
    { es: 'Cristianismo, islam y judaísmo', en: 'Christianity, Islam and Judaism', ca: 'Cristianisme, islam i judaisme' },
    '🕊️',
    { es: 'En Al-Ándalus, especialmente durante el Califato de Córdoba, convivieron —con distintos grados de tolerancia según la época— cristianos, musulmanes y judíos.', en: 'In Al-Andalus, especially during the Caliphate of Córdoba, Christians, Muslims and Jews coexisted — with varying degrees of tolerance depending on the period.', ca: 'A Al-Àndalus, especialment durant el Califat de Còrdova, van conviure —amb diferents graus de tolerància segons l\'època— cristians, musulmans i jueus.' }),

  q('em-15', 'primaria',
    { es: "¿Qué suceso marca el inicio de la Edad Media?", en: "Which event marks the start of the Middle Ages?", ca: "Quin fet marca l'inici de l'Edat Mitjana?" },
    { es: ["El descubrimiento de América","La caída del Imperio romano de Occidente","La Revolución Francesa","La invención de la imprenta"], en: ["The discovery of America","The fall of the Western Roman Empire","The French Revolution","The invention of printing"], ca: ["El descobriment d'Amèrica","La caiguda de l'Imperi romà d'Occident","La Revolució Francesa","La invenció de la impremta"] },
    { es: "La caída del Imperio romano de Occidente", en: "The fall of the Western Roman Empire", ca: "La caiguda de l'Imperi romà d'Occident" },
    '🏛️',
    { es: "En el año 476 cae el Imperio romano de Occidente y arranca la Edad Media, que dura hasta 1492.", en: "In 476 the Western Roman Empire fell and the Middle Ages began, lasting until 1492.", ca: "L'any 476 cau l'Imperi romà d'Occident i arrenca l'Edat Mitjana." }),

  q('em-16', 'primaria',
    { es: "¿Quién estaba en lo más alto de la sociedad feudal?", en: "Who was at the top of feudal society?", ca: "Qui era a dalt de tot de la societat feudal?" },
    { es: ["Los campesinos","El rey","Los comerciantes","Los artesanos"], en: ["The peasants","The king","The merchants","The craftsmen"], ca: ["Els pagesos","El rei","Els comerciants","Els artesans"] },
    { es: "El rey", en: "The king", ca: "El rei" },
    '👑',
    { es: "La pirámide feudal: el rey arriba, después la nobleza y el clero, y abajo del todo los campesinos, que eran la inmensa mayoría.", en: "The feudal pyramid: king, then nobility and clergy, and peasants at the bottom.", ca: "La piràmide feudal: el rei a dalt, després la noblesa i el clergat, i a baix els pagesos." }),

  q('em-17', 'primaria',
    { es: "¿Qué era un castillo medieval?", en: "What was a medieval castle?", ca: "Què era un castell medieval?" },
    { es: ["Una iglesia","La fortaleza y vivienda del señor feudal","Un mercado","Una escuela"], en: ["A church","The fortress and home of the feudal lord","A market","A school"], ca: ["Una església","La fortalesa i habitatge del senyor feudal","Un mercat","Una escola"] },
    { es: "La fortaleza y vivienda del señor feudal", en: "The fortress and home of the feudal lord", ca: "La fortalesa i habitatge del senyor feudal" },
    '🏰',
    { es: "Era casa y fortaleza a la vez: desde allí el señor controlaba sus tierras, y los campesinos se refugiaban dentro cuando había peligro.", en: "It was both home and fortress: peasants sheltered inside when danger came.", ca: "Era casa i fortalesa alhora: els pagesos s'hi refugiaven quan hi havia perill." }),

  q('em-18', 'primaria',
    { es: "¿Qué tres religiones convivieron en la Península Ibérica medieval?", en: "Which three religions coexisted in medieval Iberia?", ca: "Quines tres religions van conviure a la Península Ibèrica medieval?" },
    { es: ["Cristiana, judía y musulmana","Cristiana, budista e hindú","Solo la cristiana","Musulmana y budista"], en: ["Christian, Jewish and Muslim","Christian, Buddhist and Hindu","Only Christian","Muslim and Buddhist"], ca: ["Cristiana, jueva i musulmana","Cristiana, budista i hindú","Només la cristiana","Musulmana i budista"] },
    { es: "Cristiana, judía y musulmana", en: "Christian, Jewish and Muslim", ca: "Cristiana, jueva i musulmana" },
    '🕌',
    { es: "Durante siglos convivieron las tres, con épocas de convivencia y otras de conflicto. Toledo fue un centro famoso de traductores de las tres culturas.", en: "The three coexisted for centuries, with periods of tolerance and of conflict.", ca: "Durant segles hi van conviure les tres, amb èpoques de convivència i d'altres de conflicte." }),

  q('em-19', 'primaria',
    { es: "¿Qué fue la peste negra?", en: "What was the Black Death?", ca: "Què va ser la pesta negra?" },
    { es: ["Una guerra","Una epidemia que mató a un tercio de Europa","Una hambruna","Un impuesto"], en: ["A war","An epidemic that killed a third of Europe","A famine","A tax"], ca: ["Una guerra","Una epidèmia que va matar un terç d'Europa","Una fam","Un impost"] },
    { es: "Una epidemia que mató a un tercio de Europa", en: "An epidemic that killed a third of Europe", ca: "Una epidèmia que va matar un terç d'Europa" },
    '🐀',
    { es: "Llegó en 1348 y en pocos años mató a un tercio de la población europea. Cambió la sociedad entera: al faltar mano de obra, los campesinos ganaron poder.", en: "It arrived in 1348 and killed a third of Europe, giving surviving peasants more bargaining power.", ca: "Va arribar el 1348 i va matar un terç de la població europea." }),

  q('em-20', 'primaria',
    { es: "¿Qué eran los gremios?", en: "What were the guilds?", ca: "Què eren els gremis?" },
    { es: ["Ejércitos del rey","Asociaciones de artesanos del mismo oficio","Órdenes religiosas","Tribunales"], en: ["The king's armies","Associations of craftsmen of the same trade","Religious orders","Courts"], ca: ["Exèrcits del rei","Associacions d'artesans del mateix ofici","Ordes religiosos","Tribunals"] },
    { es: "Asociaciones de artesanos del mismo oficio", en: "Associations of craftsmen of the same trade", ca: "Associacions d'artesans del mateix ofici" },
    '🔨',
    { es: "Los artesanos de un mismo oficio se agrupaban para fijar precios, controlar la calidad y formar aprendices. Eran el germen de los sindicatos.", en: "Craftsmen of one trade grouped to set prices, control quality and train apprentices.", ca: "Els artesans d'un mateix ofici s'agrupaven per fixar preus i formar aprenents." }),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
