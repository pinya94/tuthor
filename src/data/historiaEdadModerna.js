// Edad Moderna (Reyes Católicos, Imperio español, Ilustración) — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-edad-moderna.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('mo-01', 'primaria',
    { es: '¿En qué año llegó Cristóbal Colón a América?', en: 'In what year did Christopher Columbus reach America?', ca: 'En quin any va arribar Cristòfor Colom a Amèrica?' },
    { es: ['1492', '1789', '1517', '1215'], en: ['1492', '1789', '1517', '1215'], ca: ['1492', '1789', '1517', '1215'] },
    { es: '1492', en: '1492', ca: '1492' },
    '⛵',
    { es: 'Cristóbal Colón llegó a América en 1492, buscando una nueva ruta hacia Asia. Ese mismo año se considera el inicio de la Edad Moderna.', en: 'Christopher Columbus reached America in 1492, while searching for a new route to Asia. That same year is considered the start of the Early Modern period.', ca: 'Cristòfor Colom va arribar a Amèrica el 1492, buscant una nova ruta cap a Àsia. Aquell mateix any es considera l\'inici de l\'Edat Moderna.' }),

  q('mo-02', 'primaria',
    { es: '¿Quiénes eran los Reyes Católicos?', en: 'Who were the Catholic Monarchs?', ca: 'Qui eren els Reis Catòlics?' },
    { es: ['Isabel de Castilla y Fernando de Aragón', 'Carlos I y Felipe II', 'Napoleón y Josefina', 'Luis XIV y María Antonieta'], en: ['Isabella of Castile and Ferdinand of Aragon', 'Charles I and Philip II', 'Napoleon and Josephine', 'Louis XIV and Marie Antoinette'], ca: ['Isabel de Castella i Ferran d\'Aragó', 'Carles I i Felip II', 'Napoleó i Josefina', 'Lluís XIV i Maria Antonieta'] },
    { es: 'Isabel de Castilla y Fernando de Aragón', en: 'Isabella of Castile and Ferdinand of Aragon', ca: 'Isabel de Castella i Ferran d\'Aragó' },
    '👑',
    { es: 'Isabel de Castilla y Fernando de Aragón, los Reyes Católicos, unieron sus reinos y conquistaron Granada en 1492, terminando la Reconquista.', en: 'Isabella of Castile and Ferdinand of Aragon, the Catholic Monarchs, united their kingdoms and conquered Granada in 1492, ending the Reconquista.', ca: 'Isabel de Castella i Ferran d\'Aragó, els Reis Catòlics, van unir els seus regnes i van conquerir Granada el 1492, acabant la Reconquesta.' }),

  q('mo-03', 'primaria',
    { es: '¿Qué reino musulmán conquistaron los Reyes Católicos en 1492?', en: 'Which Muslim kingdom did the Catholic Monarchs conquer in 1492?', ca: 'Quin regne musulmà van conquerir els Reis Catòlics el 1492?' },
    { es: ['Granada', 'Córdoba', 'Sevilla', 'Toledo'], en: ['Granada', 'Córdoba', 'Seville', 'Toledo'], ca: ['Granada', 'Còrdova', 'Sevilla', 'Toledo'] },
    { es: 'Granada', en: 'Granada', ca: 'Granada' },
    '🏯',
    { es: 'Granada fue el último reino musulmán de la península ibérica, conquistado por los Reyes Católicos en 1492, el mismo año que Colón llegó a América.', en: 'Granada was the last Muslim kingdom on the Iberian Peninsula, conquered by the Catholic Monarchs in 1492, the same year Columbus reached America.', ca: 'Granada va ser l\'últim regne musulmà de la península ibèrica, conquerit pels Reis Catòlics el 1492, el mateix any que Colom va arribar a Amèrica.' }),

  q('mo-04', 'primaria',
    { es: '¿Qué movimiento artístico y cultural surgió en Europa tras la Edad Media?', en: 'What artistic and cultural movement emerged in Europe after the Middle Ages?', ca: 'Quin moviment artístic i cultural va sorgir a Europa després de l\'Edat Mitjana?' },
    { es: ['El Renacimiento', 'El Barroco', 'El Romanticismo', 'El Cubismo'], en: ['The Renaissance', 'The Baroque', 'Romanticism', 'Cubism'], ca: ['El Renaixement', 'El Barroc', 'El Romanticisme', 'El Cubisme'] },
    { es: 'El Renacimiento', en: 'The Renaissance', ca: 'El Renaixement' },
    '🎨',
    { es: 'El Renacimiento fue el gran movimiento artístico y cultural que renovó el arte y el pensamiento europeo al inicio de la Edad Moderna, inspirado en la Antigüedad clásica.', en: 'The Renaissance was the great artistic and cultural movement that renewed European art and thought at the start of the Early Modern period, inspired by classical Antiquity.', ca: 'El Renaixement va ser el gran moviment artístic i cultural que va renovar l\'art i el pensament europeu a l\'inici de l\'Edat Moderna, inspirat en l\'Antiguitat clàssica.' }),

  q('mo-05', 'primaria',
    { es: '¿De qué imperio se decía que "no se ponía el sol" en sus dominios?', en: 'Which empire was said to have dominions on which "the sun never set"?', ca: 'De quin imperi es deia que "no es ponia el sol" en els seus dominis?' },
    { es: ['El Imperio español', 'El Imperio romano', 'El Imperio egipcio', 'El Imperio persa'], en: ['The Spanish Empire', 'The Roman Empire', 'The Egyptian Empire', 'The Persian Empire'], ca: ['L\'Imperi espanyol', 'L\'Imperi romà', 'L\'Imperi egipci', 'L\'Imperi persa'] },
    { es: 'El Imperio español', en: 'The Spanish Empire', ca: 'L\'Imperi espanyol' },
    '🌍',
    { es: 'Con Carlos I y Felipe II, el Imperio español llegó a ser tan extenso, con territorios en América, Europa, África y Asia, que siempre era de día en alguna parte de él.', en: 'Under Charles I and Philip II, the Spanish Empire became so vast, with territories in America, Europe, Africa and Asia, that it was always daytime somewhere within it.', ca: 'Amb Carles I i Felip II, l\'Imperi espanyol va arribar a ser tan extens, amb territoris a Amèrica, Europa, Àfrica i Àsia, que sempre era de dia en alguna part d\'ell.' }),

  q('mo-06', 'primaria',
    { es: '¿Qué buscaban los barcos españoles y portugueses al explorar nuevas rutas marítimas?', en: 'What were Spanish and Portuguese ships looking for when exploring new sea routes?', ca: 'Què buscaven els vaixells espanyols i portuguesos en explorar noves rutes marítimes?' },
    { es: ['Una nueva ruta comercial hacia Asia', 'Nuevas especies de animales exóticos', 'Un lugar para construir castillos', 'Aliados para una guerra en Europa'], en: ['A new trade route to Asia', 'New species of exotic animals', 'A place to build castles', 'Allies for a war in Europe'], ca: ['Una nova ruta comercial cap a Àsia', 'Noves espècies d\'animals exòtics', 'Un lloc per construir castells', 'Aliats per a una guerra a Europa'] },
    { es: 'Una nueva ruta comercial hacia Asia', en: 'A new trade route to Asia', ca: 'Una nova ruta comercial cap a Àsia' },
    '🗺️',
    { es: 'Los navegantes españoles y portugueses buscaban nuevas rutas marítimas hacia Asia para comerciar con especias, y en ese intento llegaron, sin saberlo, a un continente nuevo para ellos: América.', en: 'Spanish and Portuguese sailors were looking for new sea routes to Asia to trade in spices, and in that attempt they unknowingly reached a continent new to them: America.', ca: 'Els navegants espanyols i portuguesos buscaven noves rutes marítimes cap a Àsia per comerciar amb espècies, i en aquell intent van arribar, sense saber-ho, a un continent nou per a ells: Amèrica.' }),

  q('mo-07', 'primaria',
    { es: '¿Cómo se llama el periodo histórico que va aproximadamente de 1492 a finales del siglo XVIII?', en: 'What is the historical period that runs roughly from 1492 to the late 18th century called?', ca: 'Com es diu el període històric que va aproximadament de 1492 a finals del segle XVIII?' },
    { es: ['La Edad Moderna', 'La Edad Media', 'La Edad Antigua', 'La Prehistoria'], en: ['The Early Modern period', 'The Middle Ages', 'Antiquity', 'Prehistory'], ca: ['L\'Edat Moderna', 'L\'Edat Mitjana', 'L\'Edat Antiga', 'La Prehistòria'] },
    { es: 'La Edad Moderna', en: 'The Early Modern period', ca: 'L\'Edat Moderna' },
    '📅',
    { es: 'La Edad Moderna va, a grandes rasgos, de 1492 (llegada de Colón a América) a 1789 (Revolución Francesa), que da paso a la Edad Contemporánea.', en: 'The Early Modern period broadly runs from 1492 (Columbus\'s arrival in America) to 1789 (the French Revolution), which gives way to the Contemporary Age.', ca: 'L\'Edat Moderna va, a grans trets, del 1492 (arribada de Colom a Amèrica) al 1789 (Revolució Francesa), que dóna pas a l\'Edat Contemporània.' }),

  q('mo-08', 'primaria',
    { es: '¿Qué gran movimiento religioso, liderado por Martín Lutero, dividió a los cristianos en el siglo XVI?', en: 'What great religious movement, led by Martin Luther, divided Christians in the 16th century?', ca: 'Quin gran moviment religiós, liderat per Martí Luter, va dividir els cristians al segle XVI?' },
    { es: ['La Reforma protestante', 'La Contrarreforma', 'El Cisma de Oriente', 'La Inquisición'], en: ['The Protestant Reformation', 'The Counter-Reformation', 'The Great Schism', 'The Inquisition'], ca: ['La Reforma protestant', 'La Contrareforma', 'El Cisma d\'Orient', 'La Inquisició'] },
    { es: 'La Reforma protestante', en: 'The Protestant Reformation', ca: 'La Reforma protestant' },
    '⛪',
    { es: 'Martín Lutero inició la Reforma protestante en 1517, criticando a la Iglesia católica y dando origen a nuevas ramas del cristianismo, dividiendo a los cristianos de Europa.', en: 'Martin Luther started the Protestant Reformation in 1517, criticising the Catholic Church and giving rise to new branches of Christianity, dividing Europe\'s Christians.', ca: 'Martí Luter va iniciar la Reforma protestant el 1517, criticant l\'Església catòlica i donant origen a noves branques del cristianisme, dividint els cristians d\'Europa.' }),

  // ── ESO: los Austrias, la Ilustración y el final de la Edad Moderna ──
  q('mo-09', 'eso',
    { es: '¿Qué dinastía gobernó España durante la mayor parte de la Edad Moderna, empezando con Carlos I?', en: 'Which dynasty ruled Spain for most of the Early Modern period, starting with Charles I?', ca: 'Quina dinastia va governar Espanya durant la major part de l\'Edat Moderna, començant amb Carles I?' },
    { es: ['Los Austrias', 'Los Borbones', 'Los Trastámara', 'Los Capeto'], en: ['The Habsburgs', 'The Bourbons', 'The Trastámaras', 'The Capetians'], ca: ['Els Àustries', 'Els Borbons', 'Els Trastàmara', 'Els Capet'] },
    { es: 'Los Austrias', en: 'The Habsburgs', ca: 'Els Àustries' },
    '👑',
    { es: 'La dinastía de los Austrias (o Habsburgo) gobernó España desde Carlos I hasta Carlos II, llevando al imperio español a su máximo esplendor y después a su decadencia.', en: 'The Habsburg dynasty ruled Spain from Charles I to Charles II, bringing the Spanish Empire to its height and later to its decline.', ca: 'La dinastia dels Àustries (o Habsburg) va governar Espanya des de Carles I fins a Carles II, portant l\'imperi espanyol al seu màxim esplendor i després a la seva decadència.' }),

  q('mo-10', 'eso',
    { es: '¿Quién fue el primer rey de la dinastía de los Austrias en España?', en: 'Who was the first king of the Habsburg dynasty in Spain?', ca: 'Qui va ser el primer rei de la dinastia dels Àustries a Espanya?' },
    { es: ['Carlos I', 'Felipe II', 'Fernando el Católico', 'Felipe V'], en: ['Charles I', 'Philip II', 'Ferdinand the Catholic', 'Philip V'], ca: ['Carles I', 'Felip II', 'Ferran el Catòlic', 'Felip V'] },
    { es: 'Carlos I', en: 'Charles I', ca: 'Carles I' },
    '🎖️',
    { es: 'Carlos I, nieto de los Reyes Católicos, fue el primer rey de la dinastía de los Austrias en España, y también emperador del Sacro Imperio Romano Germánico bajo el nombre de Carlos V.', en: 'Charles I, grandson of the Catholic Monarchs, was the first Habsburg king in Spain, and also Holy Roman Emperor under the name Charles V.', ca: 'Carles I, nét dels Reis Catòlics, va ser el primer rei de la dinastia dels Àustries a Espanya, i també emperador del Sacre Imperi Romanogermànic sota el nom de Carles V.' }),

  q('mo-11', 'eso',
    { es: '¿Qué movimiento intelectual del siglo XVIII, con pensadores como Voltaire y Rousseau, defendía la razón frente a la superstición?', en: 'What 18th-century intellectual movement, with thinkers such as Voltaire and Rousseau, championed reason over superstition?', ca: 'Quin moviment intel·lectual del segle XVIII, amb pensadors com Voltaire i Rousseau, defensava la raó davant la superstició?' },
    { es: ['La Ilustración', 'El Humanismo', 'El Romanticismo', 'El Existencialismo'], en: ['The Enlightenment', 'Humanism', 'Romanticism', 'Existentialism'], ca: ['La Il·lustració', 'L\'Humanisme', 'El Romanticisme', 'L\'Existencialisme'] },
    { es: 'La Ilustración', en: 'The Enlightenment', ca: 'La Il·lustració' },
    '💡',
    { es: 'La Ilustración fue el movimiento intelectual del siglo XVIII que defendía el uso de la razón, con pensadores como Voltaire, Rousseau y Montesquieu, y que preparó el terreno para la Revolución Francesa.', en: 'The Enlightenment was the 18th-century intellectual movement that championed the use of reason, with thinkers such as Voltaire, Rousseau and Montesquieu, and that paved the way for the French Revolution.', ca: 'La Il·lustració va ser el moviment intel·lectual del segle XVIII que defensava l\'ús de la raó, amb pensadors com Voltaire, Rousseau i Montesquieu, i que va preparar el terreny per a la Revolució Francesa.' }),

  q('mo-12', 'eso',
    { es: '¿Qué acontecimiento de 1789 se considera el final de la Edad Moderna y el inicio de la Edad Contemporánea?', en: 'What 1789 event is considered the end of the Early Modern period and the start of the Contemporary Age?', ca: 'Quin esdeveniment del 1789 es considera el final de l\'Edat Moderna i l\'inici de l\'Edat Contemporània?' },
    { es: ['La Revolución Francesa', 'La Revolución Industrial', 'La Reforma protestante', 'El Descubrimiento de América'], en: ['The French Revolution', 'The Industrial Revolution', 'The Protestant Reformation', 'The Discovery of America'], ca: ['La Revolució Francesa', 'La Revolució Industrial', 'La Reforma protestant', 'El Descobriment d\'Amèrica'] },
    { es: 'La Revolución Francesa', en: 'The French Revolution', ca: 'La Revolució Francesa' },
    '🇫🇷',
    { es: 'La Revolución Francesa de 1789 se considera tradicionalmente la frontera entre la Edad Moderna y la Edad Contemporánea, con la caída del Antiguo Régimen y el ascenso de las ideas de igualdad y libertad.', en: 'The French Revolution of 1789 is traditionally considered the boundary between the Early Modern period and the Contemporary Age, with the fall of the Ancien Régime and the rise of ideas of equality and liberty.', ca: 'La Revolució Francesa del 1789 es considera tradicionalment la frontera entre l\'Edat Moderna i l\'Edat Contemporània, amb la caiguda de l\'Antic Règim i l\'ascens de les idees d\'igualtat i llibertat.' }),

  q('mo-13', 'eso',
    { es: '¿Cómo se llamó la respuesta de la Iglesia Católica frente a la Reforma protestante?', en: 'What was the Catholic Church\'s response to the Protestant Reformation called?', ca: 'Com es va anomenar la resposta de l\'Església Catòlica davant la Reforma protestant?' },
    { es: ['La Contrarreforma', 'La Segunda Reforma', 'El Concilio de Nicea', 'La Restauración'], en: ['The Counter-Reformation', 'The Second Reformation', 'The Council of Nicaea', 'The Restoration'], ca: ['La Contrareforma', 'La Segona Reforma', 'El Concili de Nicea', 'La Restauració'] },
    { es: 'La Contrarreforma', en: 'The Counter-Reformation', ca: 'La Contrareforma' },
    '⛪',
    { es: 'La Contrarreforma fue la respuesta de la Iglesia católica a la Reforma protestante, reafirmando su doctrina y reformando algunas de sus prácticas, con el Concilio de Trento como pieza central.', en: 'The Counter-Reformation was the Catholic Church\'s response to the Protestant Reformation, reaffirming its doctrine and reforming some of its practices, with the Council of Trent as its centrepiece.', ca: 'La Contrareforma va ser la resposta de l\'Església catòlica a la Reforma protestant, reafirmant la seva doctrina i reformant algunes de les seves pràctiques, amb el Concili de Trento com a peça central.' }),

  q('mo-14', 'eso',
    { es: '¿Qué revolución, iniciada en Gran Bretaña a finales del siglo XVIII, transformó la producción con máquinas y fábricas?', en: 'What revolution, starting in Great Britain in the late 18th century, transformed production with machines and factories?', ca: 'Quina revolució, iniciada a la Gran Bretanya a finals del segle XVIII, va transformar la producció amb màquines i fàbriques?' },
    { es: ['La Revolución Industrial', 'La Revolución Francesa', 'La Revolución Rusa', 'La Revolución Científica'], en: ['The Industrial Revolution', 'The French Revolution', 'The Russian Revolution', 'The Scientific Revolution'], ca: ['La Revolució Industrial', 'La Revolució Francesa', 'La Revolució Russa', 'La Revolució Científica'] },
    { es: 'La Revolución Industrial', en: 'The Industrial Revolution', ca: 'La Revolució Industrial' },
    '🏭',
    { es: 'La Revolución Industrial comenzó en Gran Bretaña a finales del siglo XVIII, sustituyendo el trabajo manual por máquinas y fábricas, y ya forma parte de la Edad Contemporánea, justo después de donde termina la Edad Moderna.', en: 'The Industrial Revolution began in Great Britain in the late 18th century, replacing manual labour with machines and factories, and already belongs to the Contemporary Age, right after the end of the Early Modern period.', ca: 'La Revolució Industrial va començar a la Gran Bretanya a finals del segle XVIII, substituint el treball manual per màquines i fàbriques, i ja forma part de l\'Edat Contemporània, just després d\'on acaba l\'Edat Moderna.' }),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
