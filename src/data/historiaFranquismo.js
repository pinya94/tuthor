// Franquismo y Transición — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-franquismo.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('fr-01', 'eso',
    { es: '¿Cuándo murió Francisco Franco?', en: 'When did Francisco Franco die?', ca: 'Quan va morir Francisco Franco?' },
    { es: ['20 de noviembre de 1975', '1 de abril de 1939', '23 de febrero de 1981', '6 de diciembre de 1978'], en: ['20 November 1975', '1 April 1939', '23 February 1981', '6 December 1978'], ca: ['20 de novembre de 1975', '1 d\'abril de 1939', '23 de febrer de 1981', '6 de desembre de 1978'] },
    { es: '20 de noviembre de 1975', en: '20 November 1975', ca: '20 de novembre de 1975' },
    '🕊️',
    { es: 'Francisco Franco murió el 20 de noviembre de 1975, poniendo fin a casi cuarenta años de dictadura y abriendo la Transición a la democracia.', en: 'Francisco Franco died on 20 November 1975, ending almost forty years of dictatorship and opening the Transition to democracy.', ca: 'Francisco Franco va morir el 20 de novembre de 1975, posant fi a gairebé quaranta anys de dictadura i obrint la Transició a la democràcia.' }),

  q('fr-02', 'eso',
    { es: '¿Durante qué años se extendió la dictadura franquista?', en: 'What years did the Francoist dictatorship span?', ca: 'Durant quins anys es va estendre la dictadura franquista?' },
    { es: ['Desde 1939 hasta 1975', 'Desde 1931 hasta 1936', 'Desde 1978 hasta 1982', 'Desde 1898 hasta 1931'], en: ['From 1939 to 1975', 'From 1931 to 1936', 'From 1978 to 1982', 'From 1898 to 1931'], ca: ['Des del 1939 fins al 1975', 'Des del 1931 fins al 1936', 'Des del 1978 fins al 1982', 'Des del 1898 fins al 1931'] },
    { es: 'Desde 1939 hasta 1975', en: 'From 1939 to 1975', ca: 'Des del 1939 fins al 1975' },
    '📅',
    { es: 'El franquismo comenzó al terminar la Guerra Civil, en 1939, y se prolongó casi cuarenta años hasta la muerte de Franco en 1975.', en: 'Francoism began at the end of the Civil War, in 1939, and lasted almost forty years until Franco\'s death in 1975.', ca: 'El franquisme va començar en acabar la Guerra Civil, el 1939, i es va prolongar gairebé quaranta anys fins a la mort de Franco el 1975.' }),

  q('fr-03', 'eso',
    { es: '¿Quién fue proclamado Rey de España tras la muerte de Franco?', en: 'Who was proclaimed King of Spain after Franco\'s death?', ca: 'Qui va ser proclamat Rei d\'Espanya després de la mort de Franco?' },
    { es: ['Juan Carlos I', 'Alfonso XIII', 'Felipe VI', 'Alfonso XII'], en: ['Juan Carlos I', 'Alfonso XIII', 'Felipe VI', 'Alfonso XII'], ca: ['Joan Carles I', 'Alfons XIII', 'Felip VI', 'Alfons XII'] },
    { es: 'Juan Carlos I', en: 'Juan Carlos I', ca: 'Joan Carles I' },
    '👑',
    { es: 'Juan Carlos I fue proclamado Rey de España pocos días después de la muerte de Franco, y tuvo un papel clave en la Transición a la democracia.', en: 'Juan Carlos I was proclaimed King of Spain just days after Franco\'s death, and played a key role in the Transition to democracy.', ca: 'Joan Carles I va ser proclamat Rei d\'Espanya pocs dies després de la mort de Franco, i va tenir un paper clau en la Transició a la democràcia.' }),

  q('fr-04', 'eso',
    { es: '¿Quién fue el presidente del gobierno que lideró la reforma política de la Transición?', en: 'Who was the Prime Minister who led the political reform of the Transition?', ca: 'Qui va ser el president del govern que va liderar la reforma política de la Transició?' },
    { es: ['Adolfo Suárez', 'Felipe González', 'Manuel Azaña', 'Francisco Franco'], en: ['Adolfo Suárez', 'Felipe González', 'Manuel Azaña', 'Francisco Franco'], ca: ['Adolfo Suárez', 'Felipe González', 'Manuel Azaña', 'Francisco Franco'] },
    { es: 'Adolfo Suárez', en: 'Adolfo Suárez', ca: 'Adolfo Suárez' },
    '🎙️',
    { es: 'Adolfo Suárez, nombrado presidente del gobierno en 1976, impulsó la reforma política que llevó a las primeras elecciones democráticas y a la Constitución de 1978.', en: 'Adolfo Suárez, appointed Prime Minister in 1976, drove the political reform that led to the first democratic elections and the 1978 Constitution.', ca: 'Adolfo Suárez, nomenat president del govern el 1976, va impulsar la reforma política que va portar a les primeres eleccions democràtiques i a la Constitució del 1978.' }),

  q('fr-05', 'eso',
    { es: '¿En qué año se celebraron las primeras elecciones democráticas tras la dictadura?', en: 'In what year were the first democratic elections after the dictatorship held?', ca: 'En quin any es van celebrar les primeres eleccions democràtiques després de la dictadura?' },
    { es: ['1977', '1975', '1978', '1982'], en: ['1977', '1975', '1978', '1982'], ca: ['1977', '1975', '1978', '1982'] },
    { es: '1977', en: '1977', ca: '1977' },
    '🗳️',
    { es: 'En 1977 se celebraron las primeras elecciones democráticas desde 1936, ganadas por la UCD de Adolfo Suárez.', en: 'In 1977 the first democratic elections since 1936 were held, won by Adolfo Suárez\'s UCD.', ca: 'El 1977 es van celebrar les primeres eleccions democràtiques des del 1936, guanyades per la UCD d\'Adolfo Suárez.' }),

  q('fr-06', 'eso',
    { es: '¿En qué año se aprobó la Constitución Española actual?', en: 'In what year was the current Spanish Constitution adopted?', ca: 'En quin any es va aprovar la Constitució Espanyola actual?' },
    { es: ['1978', '1975', '1931', '1982'], en: ['1978', '1975', '1931', '1982'], ca: ['1978', '1975', '1931', '1982'] },
    { es: '1978', en: '1978', ca: '1978' },
    '📘',
    { es: 'La Constitución Española se aprobó en referéndum el 6 de diciembre de 1978, y sigue vigente hoy en día.', en: 'The Spanish Constitution was approved by referendum on 6 December 1978, and it is still in force today.', ca: 'La Constitució Espanyola es va aprovar en referèndum el 6 de desembre del 1978, i encara és vigent avui dia.' }),

  q('fr-07', 'eso',
    { es: '¿Qué intento de golpe de estado ocurrió el 23 de febrero de 1981?', en: 'What coup attempt took place on 23 February 1981?', ca: 'Quin intent de cop d\'estat va passar el 23 de febrer del 1981?' },
    { es: ['El asalto al Congreso liderado por el teniente coronel Tejero', 'Un golpe militar liderado por Franco', 'Una revuelta obrera en Asturias', 'Un motín en la Armada'], en: ['The storming of Congress led by Lieutenant Colonel Tejero', 'A military coup led by Franco', 'A workers\' uprising in Asturias', 'A mutiny in the Navy'], ca: ['L\'assalt al Congrés liderat pel tinent coronel Tejero', 'Un cop militar liderat per Franco', 'Una revolta obrera a Astúries', 'Un motí a l\'Armada'] },
    { es: 'El asalto al Congreso liderado por el teniente coronel Tejero', en: 'The storming of Congress led by Lieutenant Colonel Tejero', ca: 'L\'assalt al Congrés liderat pel tinent coronel Tejero' },
    '🏛️',
    { es: 'El 23-F fue el intento de golpe de estado en el que el teniente coronel Tejero asaltó el Congreso de los Diputados. Fracasó, en parte gracias a la intervención del Rey.', en: '23-F was the coup attempt in which Lieutenant Colonel Tejero stormed the Congress of Deputies. It failed, partly thanks to the King\'s intervention.', ca: 'El 23-F va ser l\'intent de cop d\'estat en què el tinent coronel Tejero va assaltar el Congrés dels Diputats. Va fracassar, en part gràcies a la intervenció del Rei.' }),

  q('fr-08', 'eso',
    { es: '¿Qué tipo de gobierno tenía España durante el franquismo?', en: 'What kind of government did Spain have during Francoism?', ca: 'Quin tipus de govern tenia Espanya durant el franquisme?' },
    { es: ['Una dictadura, sin elecciones democráticas libres', 'Una monarquía parlamentaria', 'Una república federal', 'Una democracia con varios partidos'], en: ['A dictatorship, with no free democratic elections', 'A parliamentary monarchy', 'A federal republic', 'A democracy with multiple parties'], ca: ['Una dictadura, sense eleccions democràtiques lliures', 'Una monarquia parlamentària', 'Una república federal', 'Una democràcia amb diversos partits'] },
    { es: 'Una dictadura, sin elecciones democráticas libres', en: 'A dictatorship, with no free democratic elections', ca: 'Una dictadura, sense eleccions democràtiques lliures' },
    '🚫',
    { es: 'Durante el franquismo España fue una dictadura: sin elecciones democráticas libres, sin partidos políticos y con fuerte represión de la disidencia.', en: 'During Francoism Spain was a dictatorship: no free democratic elections, no political parties, and strong repression of dissent.', ca: 'Durant el franquisme Espanya va ser una dictadura: sense eleccions democràtiques lliures, sense partits polítics i amb forta repressió de la dissidència.' }),

  // ── Bachillerato: autarquía, desarrollismo y el papel del Rey en el 23-F ──
  q('fr-09', 'bachillerato',
    { es: '¿Cómo se llamó el periodo de aislamiento económico de España en los años 40?', en: 'What was Spain\'s period of economic isolation in the 1940s called?', ca: 'Com es va anomenar el període d\'aïllament econòmic d\'Espanya en els anys 40?' },
    { es: ['Autarquía', 'Desarrollismo', 'Transición', 'Restauración'], en: ['Autarky', 'Developmentalism', 'Transition', 'Restoration'], ca: ['Autarquia', 'Desenvolupisme', 'Transició', 'Restauració'] },
    { es: 'Autarquía', en: 'Autarky', ca: 'Autarquia' },
    '📉',
    { es: 'La autarquía fue la política de aislamiento económico de los primeros años del franquismo, que llevó a los llamados "años del hambre" y las cartillas de racionamiento.', en: 'Autarky was the economic isolation policy of the early years of Francoism, which led to the so-called "years of hunger" and rationing cards.', ca: 'L\'autarquia va ser la política d\'aïllament econòmic dels primers anys del franquisme, que va portar als anomenats "anys de la fam" i les cartilles de racionament.' }),

  q('fr-10', 'bachillerato',
    { es: '¿Qué acuerdos de 1953 ayudaron a sacar a España de su aislamiento internacional?', en: 'What 1953 agreements helped bring Spain out of its international isolation?', ca: 'Quins acords del 1953 van ajudar a treure Espanya del seu aïllament internacional?' },
    { es: ['Los Pactos con Estados Unidos y el Concordato con la Santa Sede', 'La entrada en la Unión Europea', 'El Tratado de Versalles', 'La firma de la Constitución'], en: ['The Pacts with the United States and the Concordat with the Holy See', 'Joining the European Union', 'The Treaty of Versailles', 'Signing the Constitution'], ca: ['Els Pactes amb els Estats Units i el Concordat amb la Santa Seu', 'L\'entrada a la Unió Europea', 'El Tractat de Versalles', 'La signatura de la Constitució'] },
    { es: 'Los Pactos con Estados Unidos y el Concordato con la Santa Sede', en: 'The Pacts with the United States and the Concordat with the Holy See', ca: 'Els Pactes amb els Estats Units i el Concordat amb la Santa Seu' },
    '🤝',
    { es: 'En 1953, los Pactos con Estados Unidos (que dieron paso a bases militares americanas en España) y el Concordato con la Santa Sede marcaron el inicio de la salida del aislamiento internacional del régimen.', en: 'In 1953, the Pacts with the United States (which led to American military bases in Spain) and the Concordat with the Holy See marked the beginning of the regime\'s emergence from international isolation.', ca: 'El 1953, els Pactes amb els Estats Units (que van donar pas a bases militars nord-americanes a Espanya) i el Concordat amb la Santa Seu van marcar l\'inici de la sortida de l\'aïllament internacional del règim.' }),

  q('fr-11', 'bachillerato',
    { es: '¿Cómo se llamó el fuerte crecimiento económico español de los años 60?', en: 'What was Spain\'s strong economic growth in the 1960s called?', ca: 'Com es va anomenar el fort creixement econòmic espanyol dels anys 60?' },
    { es: ['Desarrollismo', 'Autarquía', 'Reconstrucción', 'Transición'], en: ['Developmentalism', 'Autarky', 'Reconstruction', 'Transition'], ca: ['Desenvolupisme', 'Autarquia', 'Reconstrucció', 'Transició'] },
    { es: 'Desarrollismo', en: 'Developmentalism', ca: 'Desenvolupisme' },
    '🏗️',
    { es: 'El desarrollismo fue el periodo de fuerte crecimiento económico de los años 60, impulsado por el turismo, la industrialización y la emigración de trabajadores a Europa.', en: 'Developmentalism was the period of strong economic growth in the 1960s, driven by tourism, industrialisation and the emigration of workers to Europe.', ca: 'El desenvolupisme va ser el període de fort creixement econòmic dels anys 60, impulsat pel turisme, la industrialització i l\'emigració de treballadors a Europa.' }),

  q('fr-12', 'bachillerato',
    { es: '¿Qué ley, aprobada en referéndum en 1976, abrió el camino legal de la dictadura a la democracia?', en: 'What law, approved in a 1976 referendum, opened the legal path from dictatorship to democracy?', ca: 'Quina llei, aprovada en referèndum el 1976, va obrir el camí legal de la dictadura a la democràcia?' },
    { es: ['La Ley para la Reforma Política', 'La Constitución Española', 'La Ley de Sucesión', 'La Ley Orgánica del Estado'], en: ['The Law for Political Reform', 'The Spanish Constitution', 'The Law of Succession', 'The Organic Law of the State'], ca: ['La Llei per a la Reforma Política', 'La Constitució Espanyola', 'La Llei de Successió', 'La Llei Orgànica de l\'Estat'] },
    { es: 'La Ley para la Reforma Política', en: 'The Law for Political Reform', ca: 'La Llei per a la Reforma Política' },
    '📜',
    { es: 'La Ley para la Reforma Política, aprobada en referéndum en 1976, fue la pieza legal clave que permitió desmontar las instituciones franquistas desde dentro y abrir paso a elecciones democráticas.', en: 'The Law for Political Reform, approved in a 1976 referendum, was the key legal piece that allowed Francoist institutions to be dismantled from within and paved the way for democratic elections.', ca: 'La Llei per a la Reforma Política, aprovada en referèndum el 1976, va ser la peça legal clau que va permetre desmuntar les institucions franquistes des de dins i obrir pas a eleccions democràtiques.' }),

  q('fr-13', 'bachillerato',
    { es: '¿Qué papel jugó el Rey Juan Carlos I durante el intento de golpe del 23-F?', en: 'What role did King Juan Carlos I play during the 23-F coup attempt?', ca: 'Quin paper va jugar el Rei Joan Carles I durant l\'intent de cop del 23-F?' },
    { es: ['Pidió lealtad a la Constitución por televisión, ayudando a frenar el golpe', 'Apoyó a los golpistas desde el primer momento', 'Abandonó el país esa misma noche', 'No tuvo ningún papel relevante'], en: ['He called for loyalty to the Constitution on television, helping to stop the coup', 'He supported the coup plotters from the start', 'He left the country that same night', 'He played no significant role'], ca: ['Va demanar lleialtat a la Constitució per televisió, ajudant a frenar el cop', 'Va donar suport als colpistes des del primer moment', 'Va abandonar el país aquella mateixa nit', 'No va tenir cap paper rellevant'] },
    { es: 'Pidió lealtad a la Constitución por televisión, ayudando a frenar el golpe', en: 'He called for loyalty to the Constitution on television, helping to stop the coup', ca: 'Va demanar lleialtat a la Constitució per televisió, ajudant a frenar el cop' },
    '📺',
    { es: 'Durante la noche del 23-F, el Rey Juan Carlos I se dirigió a la nación por televisión pidiendo lealtad a la Constitución, un gesto decisivo para que el golpe de estado fracasara.', en: 'During the night of 23-F, King Juan Carlos I addressed the nation on television calling for loyalty to the Constitution, a decisive gesture that helped the coup fail.', ca: 'Durant la nit del 23-F, el Rei Joan Carles I es va dirigir a la nació per televisió demanant lleialtat a la Constitució, un gest decisiu perquè el cop d\'estat fracassés.' }),

  q('fr-14', 'bachillerato',
    { es: '¿Con qué victoria electoral de 1982 se suele marcar el final simbólico de la Transición?', en: 'What 1982 election victory is often seen as the symbolic end of the Transition?', ca: 'Amb quina victòria electoral del 1982 se sol marcar el final simbòlic de la Transició?' },
    { es: ['La victoria del PSOE de Felipe González', 'La victoria de la UCD de Adolfo Suárez', 'La victoria de Alianza Popular', 'La victoria del Partido Comunista'], en: ['The victory of Felipe González\'s PSOE', 'The victory of Adolfo Suárez\'s UCD', 'The victory of Alianza Popular', 'The victory of the Communist Party'], ca: ['La victòria del PSOE de Felipe González', 'La victòria de la UCD d\'Adolfo Suárez', 'La victòria d\'Aliança Popular', 'La victòria del Partit Comunista'] },
    { es: 'La victoria del PSOE de Felipe González', en: 'The victory of Felipe González\'s PSOE', ca: 'La victòria del PSOE de Felipe González' },
    '🌹',
    { es: 'La victoria del PSOE de Felipe González en 1982 trajo la primera alternancia real en el gobierno desde la dictadura, y suele considerarse el cierre simbólico del periodo de la Transición.', en: 'The victory of Felipe González\'s PSOE in 1982 brought the first real change of government since the dictatorship, and is often considered the symbolic close of the Transition period.', ca: 'La victòria del PSOE de Felipe González el 1982 va portar la primera alternança real en el govern des de la dictadura, i sol considerar-se el tancament simbòlic del període de la Transició.' }),

  q('fr-15', 'eso',
    { es: "¿Cuántos años duró la dictadura de Franco?", en: "How long did Franco's dictatorship last?", ca: "Quants anys va durar la dictadura de Franco?" },
    { es: ["Unos 10 años","Casi 40 años (1939-1975)","Unos 20 años","Más de 60 años"], en: ["About 10 years","Almost 40 years (1939-1975)","About 20 years","Over 60 years"], ca: ["Uns 10 anys","Gairebé 40 anys (1939-1975)","Uns 20 anys","Més de 60 anys"] },
    { es: "Casi 40 años (1939-1975)", en: "Almost 40 years (1939-1975)", ca: "Gairebé 40 anys (1939-1975)" },
    '📅',
    { es: "Desde el final de la Guerra Civil en 1939 hasta la muerte de Franco en noviembre de 1975.", en: "From the end of the Civil War in 1939 to Franco's death in November 1975.", ca: "Des del final de la Guerra Civil el 1939 fins a la mort de Franco el novembre de 1975." }),

  q('fr-16', 'eso',
    { es: "¿Qué caracterizó la etapa de la autarquía?", en: "What characterised the autarky period?", ca: "Què va caracteritzar l'etapa de l'autarquia?" },
    { es: ["Apertura al comercio mundial","Aislamiento económico, racionamiento y hambre","Crecimiento turístico","Democracia limitada"], en: ["Opening to world trade","Economic isolation, rationing and hunger","Tourist growth","Limited democracy"], ca: ["Obertura al comerç mundial","Aïllament econòmic, racionament i fam","Creixement turístic","Democràcia limitada"] },
    { es: "Aislamiento económico, racionamiento y hambre", en: "Economic isolation, rationing and hunger", ca: "Aïllament econòmic, racionament i fam" },
    '🍞',
    { es: "En los años 40 España quiso bastarse a sí misma y quedó aislada. Fueron los \"años del hambre\", con cartillas de racionamiento y mercado negro.", en: "In the 1940s Spain tried to be self-sufficient and ended up isolated: the \"hunger years\".", ca: "Als anys 40 Espanya va voler bastar-se a si mateixa i va quedar aïllada." }),

  q('fr-17', 'eso',
    { es: "¿Qué fue el \"desarrollismo\" de los años 60?", en: "What was the 1960s \"desarrollismo\"?", ca: "Què va ser el \"desarrollisme\" dels anys 60?" },
    { es: ["Una reforma agraria","Un fuerte crecimiento económico basado en turismo, industria y emigración","Una guerra colonial","Un plan educativo"], en: ["An agrarian reform","Strong economic growth from tourism, industry and emigration","A colonial war","An education plan"], ca: ["Una reforma agrària","Un fort creixement econòmic basat en turisme, indústria i emigració","Una guerra colonial","Un pla educatiu"] },
    { es: "Un fuerte crecimiento económico basado en turismo, industria y emigración", en: "Strong economic growth from tourism, industry and emigration", ca: "Un fort creixement econòmic basat en turisme, indústria i emigració" },
    '🏗️',
    { es: "España creció mucho gracias al turismo, la industria y el dinero que enviaban los emigrantes. Pero el crecimiento económico no trajo libertades.", en: "Spain grew fast on tourism, industry and emigrant remittances — but growth brought no freedoms.", ca: "Espanya va créixer molt gràcies al turisme, la indústria i els diners dels emigrants." }),

  q('fr-18', 'eso',
    { es: "¿Quién fue nombrado sucesor de Franco a título de rey?", en: "Who was named Franco's successor as king?", ca: "Qui va ser nomenat successor de Franco a títol de rei?" },
    { es: ["Juan de Borbón","Juan Carlos I","Adolfo Suárez","Carrero Blanco"], en: ["Juan de Borbón","Juan Carlos I","Adolfo Suárez","Carrero Blanco"], ca: ["Joan de Borbó","Joan Carles I","Adolfo Suárez","Carrero Blanco"] },
    { es: "Juan Carlos I", en: "Juan Carlos I", ca: "Joan Carles I" },
    '👑',
    { es: "Franco designó en 1969 a Juan Carlos, saltándose a su padre. Al morir Franco fue proclamado rey, y acabó impulsando la democracia.", en: "Franco named Juan Carlos in 1969, skipping his father; he later drove the transition to democracy.", ca: "Franco va designar Joan Carles el 1969, saltant-se el seu pare." }),

  q('fr-19', 'eso',
    { es: "¿Qué fue la Transición española?", en: "What was the Spanish Transition?", ca: "Què va ser la Transició espanyola?" },
    { es: ["Una guerra civil","El paso de la dictadura a la democracia entre 1975 y 1978","Un golpe de Estado","Una crisis económica"], en: ["A civil war","The move from dictatorship to democracy between 1975 and 1978","A coup","An economic crisis"], ca: ["Una guerra civil","El pas de la dictadura a la democràcia entre 1975 i 1978","Un cop d'Estat","Una crisi econòmica"] },
    { es: "El paso de la dictadura a la democracia entre 1975 y 1978", en: "The move from dictatorship to democracy between 1975 and 1978", ca: "El pas de la dictadura a la democràcia entre 1975 i 1978" },
    '🕊️',
    { es: "Tras la muerte de Franco se legalizaron los partidos, se celebraron elecciones en 1977 y se aprobó la Constitución en 1978.", en: "After Franco's death, parties were legalised, elections held in 1977 and the Constitution approved in 1978.", ca: "Després de la mort de Franco es van legalitzar els partits i es va aprovar la Constitució el 1978." }),

  q('fr-20', 'eso',
    { es: "¿Qué ocurrió el 23 de febrero de 1981?", en: "What happened on 23 February 1981?", ca: "Què va passar el 23 de febrer de 1981?" },
    { es: ["Se aprobó la Constitución","Un intento de golpe de Estado en el Congreso","Murió Franco","España entró en la Unión Europea"], en: ["The Constitution was approved","An attempted coup in Congress","Franco died","Spain joined the EU"], ca: ["Es va aprovar la Constitució","Un intent de cop d'Estat al Congrés","Va morir Franco","Espanya va entrar a la Unió Europea"] },
    { es: "Un intento de golpe de Estado en el Congreso", en: "An attempted coup in Congress", ca: "Un intent de cop d'Estat al Congrés" },
    '🏛️',
    { es: "El teniente coronel Tejero asaltó el Congreso con guardias civiles. El golpe fracasó esa misma noche y la democracia salió reforzada.", en: "Lieutenant Colonel Tejero stormed Congress; the coup failed that night and democracy came out stronger.", ca: "El tinent coronel Tejero va assaltar el Congrés; el cop va fracassar aquella mateixa nit." }),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
