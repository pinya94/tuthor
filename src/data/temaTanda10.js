// Décima tanda (16-nov-2026): las seis últimas páginas finas (Segunda Guerra
// Mundial, Guerra Fría, historia de la ciencia, las edades de la historia,
// Europa y África). Se suman en AMPLIACION. Las capitales son las mismas que
// usan los juegos de mapas (data/paises.js); las edades, las de la propia
// página (1492 abre la Edad Moderna).
const T = (es, en, ca) => ({ es, en, ca })
const L = T

const wwii = {
  metaTitle: L('La Segunda Guerra Mundial (1939-1945): causas, bandos, fases, Holocausto y consecuencias — resumen', 'The Second World War (1939-1945): causes, sides, stages, the Holocaust and consequences — summary', 'La Segona Guerra Mundial (1939-1945): causes, bàndols, fases, Holocaust i conseqüències — resum i exercicis'),
  secciones: [
    {
      titulo: L('Fechas clave', 'Key dates', 'Dates clau'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          [L('1 de septiembre de 1939', '1 September 1939', '1 de setembre de 1939'), L('Alemania invade Polonia; Francia y Reino Unido le declaran la guerra', 'Germany invades Poland; France and Britain declare war', 'Alemanya envaeix Polònia; França i el Regne Unit li declaren la guerra')],
          ['1940', L('Alemania ocupa Francia; batalla de Inglaterra en el aire', 'Germany occupies France; the Battle of Britain in the air', 'Alemanya ocupa França; batalla d’Anglaterra a l’aire')],
          [L('junio de 1941', 'June 1941', 'juny de 1941'), L('Alemania invade la URSS (operación Barbarroja)', 'Germany invades the USSR (Operation Barbarossa)', 'Alemanya envaeix l’URSS (operació Barbarossa)')],
          [L('7 de diciembre de 1941', '7 December 1941', '7 de desembre de 1941'), L('Japón ataca Pearl Harbor: EE. UU. entra en la guerra', 'Japan attacks Pearl Harbor: the USA enters the war', 'el Japó ataca Pearl Harbor: els EUA entren a la guerra')],
          ['1942-1943', L('Stalingrado: primera gran derrota alemana (febrero de 1943)', 'Stalingrad: the first great German defeat (February 1943)', 'Stalingrad: primera gran derrota alemanya (febrer de 1943)')],
          [L('6 de junio de 1944', '6 June 1944', '6 de juny de 1944'), L('desembarco de Normandía (Día D)', 'the Normandy landings (D-Day)', 'desembarcament de Normandia (dia D)')],
          [L('8 de mayo de 1945', '8 May 1945', '8 de maig de 1945'), L('Alemania se rinde: fin de la guerra en Europa', 'Germany surrenders: the war in Europe ends', 'Alemanya es rendeix: fi de la guerra a Europa')],
          [L('agosto de 1945', 'August 1945', 'agost de 1945'), L('bombas atómicas sobre Hiroshima (6) y Nagasaki (9); Japón se rinde el 2 de septiembre', 'atomic bombs on Hiroshima (6th) and Nagasaki (9th); Japan surrenders on 2 September', 'bombes atòmiques sobre Hiroshima (6) i Nagasaki (9); el Japó es rendeix el 2 de setembre')],
        ],
      },
      lista: L(
        ['Eje: Alemania, Italia y Japón. Aliados: Reino Unido, Francia, la URSS (desde 1941) y EE. UU. (desde 1941). España no participó oficialmente, aunque envió voluntarios (la División Azul) a luchar contra la URSS.', 'El Holocausto: los nazis asesinaron a unos seis millones de judíos en campos de exterminio como Auschwitz, además de gitanos, discapacitados y opositores.', 'Consecuencias: entre 50 y 60 millones de muertos, Europa destruida, Alemania dividida, nace la ONU (1945) y empieza la Guerra Fría entre EE. UU. y la URSS.'],
        ['Axis: Germany, Italy and Japan. Allies: Britain, France, the USSR (from 1941) and the USA (from 1941). Spain did not officially take part, though it sent volunteers (the Blue Division) to fight the USSR.', 'The Holocaust: the Nazis murdered about six million Jews in extermination camps such as Auschwitz, as well as Roma, disabled people and opponents.', 'Consequences: between 50 and 60 million dead, Europe in ruins, Germany divided, the UN founded (1945) and the start of the Cold War between the USA and the USSR.'],
        ['Eix: Alemanya, Itàlia i el Japó. Aliats: el Regne Unit, França, l’URSS (des del 1941) i els EUA (des del 1941). Espanya no hi va participar oficialment, tot i que hi va enviar voluntaris (la Divisió Blava) a lluitar contra l’URSS.', 'L’Holocaust: els nazis van assassinar uns sis milions de jueus en camps d’extermini com Auschwitz, a més de gitanos, discapacitats i opositors.', 'Conseqüències: entre 50 i 60 milions de morts, Europa destruïda, Alemanya dividida, neix l’ONU (1945) i comença la Guerra Freda entre els EUA i l’URSS.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Ordena: Pearl Harbor, Día D, invasión de Polonia, Hiroshima, Stalingrado.', 'Put in order: Pearl Harbor, D-Day, the invasion of Poland, Hiroshima, Stalingrad.', 'Ordena: Pearl Harbor, dia D, invasió de Polònia, Hiroshima, Stalingrad.'),
      s: T('Polonia (1939) → Pearl Harbor (1941) → Stalingrado (1942-1943) → Día D (1944) → Hiroshima (1945).', 'Poland (1939) → Pearl Harbor (1941) → Stalingrad (1942-1943) → D-Day (1944) → Hiroshima (1945).', 'Polònia (1939) → Pearl Harbor (1941) → Stalingrad (1942-1943) → dia D (1944) → Hiroshima (1945).') },
    { e: T('¿Por qué entró Estados Unidos en la guerra?', 'Why did the United States enter the war?', 'Per què van entrar els Estats Units a la guerra?'),
      s: T('Porque Japón atacó por sorpresa su base de Pearl Harbor (Hawái) el 7 de diciembre de 1941.', 'Because Japan made a surprise attack on its base at Pearl Harbor (Hawaii) on 7 December 1941.', 'Perquè el Japó va atacar per sorpresa la seva base de Pearl Harbor (Hawaii) el 7 de desembre de 1941.') },
    { e: T('Di tres consecuencias de la guerra.', 'Give three consequences of the war.', 'Digues tres conseqüències de la guerra.'),
      s: T('Por ejemplo: decenas de millones de muertos, la creación de la ONU y el comienzo de la Guerra Fría (también la división de Alemania o la descolonización).', 'For example: tens of millions dead, the creation of the UN and the start of the Cold War (also Germany’s division or decolonisation).', 'Per exemple: desenes de milions de morts, la creació de l’ONU i el començament de la Guerra Freda (també la divisió d’Alemanya o la descolonització).') },
  ],
}

const guerraFria = {
  metaTitle: L('La Guerra Fría (1947-1991): bloques, OTAN y Pacto de Varsovia, muro de Berlín y crisis — resumen', 'The Cold War (1947-1991): the blocs, NATO and the Warsaw Pact, the Berlin Wall and the crises — summary', 'La Guerra Freda (1947-1991): blocs, OTAN i Pacte de Varsòvia, mur de Berlín i crisis — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los dos bloques', 'The two blocs', 'Els dos blocs'),
      tabla: {
        columnas: L(['', 'Bloque occidental', 'Bloque soviético'], ['', 'Western bloc', 'Soviet bloc'], ['', 'Bloc occidental', 'Bloc soviètic']),
        filas: [
          [L('Líder', 'Leader', 'Líder'), L('Estados Unidos', 'United States', 'Estats Units'), L('la URSS', 'the USSR', 'l’URSS')],
          [L('Sistema', 'System', 'Sistema'), L('capitalismo y democracia liberal', 'capitalism and liberal democracy', 'capitalisme i democràcia liberal'), L('comunismo y partido único', 'communism and one-party rule', 'comunisme i partit únic')],
          [L('Alianza militar', 'Military alliance', 'Aliança militar'), L('OTAN (1949)', 'NATO (1949)', 'OTAN (1949)'), L('Pacto de Varsovia (1955)', 'Warsaw Pact (1955)', 'Pacte de Varsòvia (1955)')],
        ],
      },
    },
    {
      titulo: L('Fechas clave', 'Key dates', 'Dates clau'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          ['1947', L('doctrina Truman y Plan Marshall (ayuda de EE. UU. para reconstruir Europa)', 'the Truman Doctrine and the Marshall Plan (US aid to rebuild Europe)', 'doctrina Truman i Pla Marshall (ajuda dels EUA per reconstruir Europa)')],
          ['1948-1949', L('bloqueo de Berlín y puente aéreo', 'the Berlin Blockade and airlift', 'bloqueig de Berlín i pont aeri')],
          ['1950-1953', L('guerra de Corea', 'the Korean War', 'guerra de Corea')],
          ['1957', L('la URSS lanza el Sputnik: empieza la carrera espacial', 'the USSR launches Sputnik: the space race begins', 'l’URSS llança l’Sputnik: comença la cursa espacial')],
          ['1961', L('se levanta el muro de Berlín', 'the Berlin Wall goes up', 's’aixeca el mur de Berlín')],
          ['1962', L('crisis de los misiles de Cuba: el momento más cerca de una guerra nuclear', 'the Cuban Missile Crisis: the closest the world came to nuclear war', 'crisi dels míssils de Cuba: el moment més a prop d’una guerra nuclear')],
          ['1955-1975', L('guerra de Vietnam', 'the Vietnam War', 'guerra del Vietnam')],
          ['1969', L('EE. UU. llega a la Luna', 'the USA lands on the Moon', 'els EUA arriben a la Lluna')],
          [L('9 de noviembre de 1989', '9 November 1989', '9 de novembre de 1989'), L('cae el muro de Berlín', 'the Berlin Wall falls', 'cau el mur de Berlín')],
          [L('diciembre de 1991', 'December 1991', 'desembre de 1991'), L('desaparece la URSS: fin de la Guerra Fría', 'the USSR is dissolved: end of the Cold War', 'desapareix l’URSS: fi de la Guerra Freda')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('¿Por qué se llama «fría»?', 'Why is it called «cold»?', 'Per què es diu «freda»?'),
      s: T('Porque EE. UU. y la URSS nunca lucharon directamente: tenían armas nucleares y una guerra abierta habría sido una catástrofe. Se enfrentaron con propaganda, carrera de armamentos y espacial y guerras en otros países.', 'Because the USA and the USSR never fought each other directly: both had nuclear weapons and open war would have been a catastrophe. They competed through propaganda, the arms and space races, and wars in other countries.', 'Perquè els EUA i l’URSS mai no van lluitar directament: tenien armes nuclears i una guerra oberta hauria estat una catàstrofe. Es van enfrontar amb propaganda, cursa d’armaments i espacial i guerres en altres països.') },
    { e: T('¿Cuántos años estuvo en pie el muro de Berlín?', 'How many years did the Berlin Wall stand?', 'Quants anys va estar dret el mur de Berlín?'),
      s: T('De 1961 a 1989: 28 años.', 'From 1961 to 1989: 28 years.', 'Del 1961 al 1989: 28 anys.') },
    { e: T('Ordena: crisis de los misiles, caída del muro, Plan Marshall, fin de la URSS.', 'Put in order: the Cuban Missile Crisis, the fall of the Wall, the Marshall Plan, the end of the USSR.', 'Ordena: crisi dels míssils, caiguda del mur, Pla Marshall, fi de l’URSS.'),
      s: T('Plan Marshall (1947) → crisis de los misiles (1962) → caída del muro (1989) → fin de la URSS (1991).', 'Marshall Plan (1947) → Missile Crisis (1962) → fall of the Wall (1989) → end of the USSR (1991).', 'Pla Marshall (1947) → crisi dels míssils (1962) → caiguda del mur (1989) → fi de l’URSS (1991).') },
  ],
}

const ciencia = {
  metaTitle: L('Historia de la ciencia: grandes científicos y sus descubrimientos, de Arquímedes al ADN — resumen', 'History of science: great scientists and their discoveries, from Archimedes to DNA — summary and practice', 'Història de la ciència: grans científics i els seus descobriments, d’Arquimedes a l’ADN — resum i exercicis'),
  secciones: [
    {
      titulo: L('Científicos y descubrimientos', 'Scientists and discoveries', 'Científics i descobriments'),
      tabla: {
        columnas: L(['Quién', 'Cuándo', 'Qué aportó'], ['Who', 'When', 'What they contributed'], ['Qui', 'Quan', 'Què va aportar']),
        filas: [
          [L('Arquímedes', 'Archimedes', 'Arquimedes'), L('s. III a. C.', '3rd c. BC', 's. III aC'), L('el principio de flotación y la ley de la palanca', 'the principle of buoyancy and the law of the lever', 'el principi de flotació i la llei de la palanca')],
          [L('Copérnico', 'Copernicus', 'Copèrnic'), '1543', L('el Sol, y no la Tierra, en el centro (heliocentrismo)', 'the Sun, not the Earth, at the centre (heliocentrism)', 'el Sol, i no la Terra, al centre (heliocentrisme)')],
          [L('Galileo', 'Galileo', 'Galileu'), L('s. XVII', '17th c.', 's. XVII'), L('el telescopio para observar el cielo; estudió la caída de los cuerpos', 'used the telescope to study the sky; studied falling bodies', 'el telescopi per observar el cel; va estudiar la caiguda dels cossos')],
          [L('Newton', 'Newton', 'Newton'), '1687', L('las leyes del movimiento y la gravitación universal', 'the laws of motion and universal gravitation', 'les lleis del moviment i la gravitació universal')],
          [L('Lavoisier', 'Lavoisier', 'Lavoisier'), L('s. XVIII', '18th c.', 's. XVIII'), L('la conservación de la masa: padre de la química moderna', 'conservation of mass: father of modern chemistry', 'la conservació de la massa: pare de la química moderna')],
          [L('Darwin', 'Darwin', 'Darwin'), '1859', L('la evolución por selección natural', 'evolution by natural selection', 'l’evolució per selecció natural')],
          [L('Mendel', 'Mendel', 'Mendel'), '1866', L('las leyes de la herencia', 'the laws of inheritance', 'les lleis de l’herència')],
          [L('Marie Curie', 'Marie Curie', 'Marie Curie'), L('1903 y 1911', '1903 and 1911', '1903 i 1911'), L('la radiactividad; dos premios Nobel, de Física y de Química', 'radioactivity; two Nobel Prizes, in Physics and Chemistry', 'la radioactivitat; dos premis Nobel, de Física i de Química')],
          [L('Ramón y Cajal', 'Ramón y Cajal', 'Ramón y Cajal'), '1906', L('las neuronas; premio Nobel de Medicina', 'neurons; Nobel Prize in Medicine', 'les neurones; premi Nobel de Medicina')],
          [L('Einstein', 'Einstein', 'Einstein'), L('1905 y 1915', '1905 and 1915', '1905 i 1915'), L('la teoría de la relatividad', 'the theory of relativity', 'la teoria de la relativitat')],
          [L('Fleming', 'Fleming', 'Fleming'), '1928', L('la penicilina, el primer antibiótico', 'penicillin, the first antibiotic', 'la penicil·lina, el primer antibiòtic')],
          [L('Franklin, Watson y Crick', 'Franklin, Watson and Crick', 'Franklin, Watson i Crick'), '1953', L('la estructura en doble hélice del ADN', 'the double-helix structure of DNA', 'l’estructura en doble hèlix de l’ADN')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Ordena de más antiguo a más moderno: Newton, Darwin, Copérnico, Einstein.', 'Put in order from oldest to newest: Newton, Darwin, Copernicus, Einstein.', 'Ordena del més antic al més modern: Newton, Darwin, Copèrnic, Einstein.'),
      s: T('Copérnico (1543) → Newton (1687) → Darwin (1859) → Einstein (1905).', 'Copernicus (1543) → Newton (1687) → Darwin (1859) → Einstein (1905).', 'Copèrnic (1543) → Newton (1687) → Darwin (1859) → Einstein (1905).') },
    { e: T('¿Qué científico relacionas con cada cosa? Penicilina, neuronas, radiactividad, leyes de la herencia.', 'Which scientist goes with each? Penicillin, neurons, radioactivity, laws of inheritance.', 'Quin científic relaciones amb cada cosa? Penicil·lina, neurones, radioactivitat, lleis de l’herència.'),
      s: T('Penicilina: Fleming. Neuronas: Ramón y Cajal. Radiactividad: Marie Curie. Herencia: Mendel.', 'Penicillin: Fleming. Neurons: Ramón y Cajal. Radioactivity: Marie Curie. Inheritance: Mendel.', 'Penicil·lina: Fleming. Neurones: Ramón y Cajal. Radioactivitat: Marie Curie. Herència: Mendel.') },
    { e: T('¿Por qué es especial Marie Curie entre los premios Nobel?', 'Why does Marie Curie stand out among Nobel laureates?', 'Per què és especial Marie Curie entre els premis Nobel?'),
      s: T('Fue la primera mujer en ganar un Nobel y la primera persona en ganar dos, y en dos ciencias distintas: Física (1903) y Química (1911).', 'She was the first woman to win a Nobel Prize and the first person to win two, in two different sciences: Physics (1903) and Chemistry (1911).', 'Va ser la primera dona a guanyar un Nobel i la primera persona a guanyar-ne dos, i en dues ciències diferents: Física (1903) i Química (1911).') },
  ],
}

const primaria = {
  metaTitle: L('Las edades de la historia: Prehistoria, Edad Antigua, Media, Moderna y Contemporánea (con fechas) — resumen', 'The ages of history: Prehistory, Ancient, Middle Ages, Early Modern and Modern (with dates) — summary', 'Les edats de la història: Prehistòria, Edat Antiga, Mitjana, Moderna i Contemporània (amb dates) — resum'),
  secciones: [
    {
      titulo: L('Las cinco edades', 'The five ages', 'Les cinc edats'),
      tabla: {
        columnas: L(['Edad', 'Empieza', 'Termina'], ['Age', 'Begins', 'Ends'], ['Edat', 'Comença', 'Acaba']),
        filas: [
          [L('Prehistoria', 'Prehistory', 'Prehistòria'), L('con los primeros seres humanos, hace millones de años', 'with the first humans, millions of years ago', 'amb els primers éssers humans, fa milions d’anys'), L('con la escritura (hacia el 3000 a. C.)', 'with writing (around 3000 BC)', 'amb l’escriptura (cap al 3000 aC)')],
          [L('Edad Antigua', 'Ancient history', 'Edat Antiga'), L('3000 a. C.', '3000 BC', '3000 aC'), L('caída de Roma (476)', 'fall of Rome (476)', 'caiguda de Roma (476)')],
          [L('Edad Media', 'Middle Ages', 'Edat Mitjana'), '476', L('descubrimiento de América (1492)', 'discovery of America (1492)', 'descobriment d’Amèrica (1492)')],
          [L('Edad Moderna', 'Early modern age', 'Edat Moderna'), '1492', L('Revolución Francesa (1789)', 'French Revolution (1789)', 'Revolució Francesa (1789)')],
          [L('Edad Contemporánea', 'Modern age', 'Edat Contemporània'), '1789', L('hasta hoy', 'up to today', 'fins avui')],
        ],
      },
      lista: L(
        ['a. C. significa «antes de Cristo» y d. C., «después de Cristo». Antes de Cristo los años se cuentan hacia atrás: el 500 a. C. es más antiguo que el 100 a. C.', 'No existe el año 0: del 1 a. C. se pasa al 1 d. C.', 'Un siglo son 100 años. Para saber el siglo de un año, se quitan las dos últimas cifras y se suma 1 (si no acaba en 00): 1492 → 14 + 1 = siglo XV; 1900 → siglo XIX. Los siglos se escriben con números romanos.'],
        ['BC means «before Christ» and AD «anno Domini» (after Christ). Before Christ, years count backwards: 500 BC is older than 100 BC.', 'There is no year 0: 1 BC is followed by AD 1.', 'A century is 100 years. To find a year’s century, remove the last two digits and add 1 (unless it ends in 00): 1492 → 14 + 1 = 15th century; 1900 → 19th century. In Spain, centuries are written in Roman numerals.'],
        ['aC vol dir «abans de Crist» i dC, «després de Crist». Abans de Crist els anys es compten cap enrere: el 500 aC és més antic que el 100 aC.', 'No existeix l’any 0: de l’1 aC es passa a l’1 dC.', 'Un segle són 100 anys. Per saber el segle d’un any, es treuen les dues últimes xifres i se suma 1 (si no acaba en 00): 1492 → 14 + 1 = segle XV; 1900 → segle XIX. Els segles s’escriuen amb nombres romans.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿En qué siglo fueron 476, 1492 y 1789?', 'Which century were 476, 1492 and 1789 in?', 'En quin segle van ser el 476, el 1492 i el 1789?'),
      s: T('476: siglo V. 1492: siglo XV. 1789: siglo XVIII.', '476: 5th century. 1492: 15th century. 1789: 18th century.', '476: segle V. 1492: segle XV. 1789: segle XVIII.') },
    { e: T('¿En qué edad ocurrió cada hecho? Descubrimiento de América, construcción de las pirámides, Revolución Francesa, pinturas de Altamira.', 'Which age did each event happen in? Discovery of America, building the pyramids, French Revolution, Altamira cave paintings.', 'En quina edat va passar cada fet? Descobriment d’Amèrica, construcció de les piràmides, Revolució Francesa, pintures d’Altamira.'),
      s: T('Descubrimiento de América: abre la Edad Moderna (1492). Pirámides: Edad Antigua. Revolución Francesa: abre la Contemporánea (1789). Altamira: Prehistoria.', 'Discovery of America: opens the early modern age (1492). Pyramids: ancient history. French Revolution: opens the modern age (1789). Altamira: prehistory.', 'Descobriment d’Amèrica: obre l’Edat Moderna (1492). Piràmides: Edat Antiga. Revolució Francesa: obre la Contemporània (1789). Altamira: Prehistòria.') },
    { e: T('¿Cuántos años duró la Edad Moderna?', 'How long did the early modern age last?', 'Quants anys va durar l’Edat Moderna?'),
      s: T('De 1492 a 1789: 1789 − 1492 = 297 años.', 'From 1492 to 1789: 1789 − 1492 = 297 years.', 'Del 1492 al 1789: 1789 − 1492 = 297 anys.') },
  ],
}

const europa = {
  metaTitle: L('Europa: países y capitales, relieve y ríos (con tabla) — resumen y ejercicios', 'Europe: countries and capitals, mountains and rivers (with a table) — summary and practice questions', 'Europa: països i capitals, relleu i rius (amb taula) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Países y capitales', 'Countries and capitals', 'Països i capitals'),
      tabla: {
        columnas: L(['Zona', 'Países y capitales'], ['Area', 'Countries and capitals'], ['Zona', 'Països i capitals']),
        filas: [
          [L('Sur', 'South', 'Sud'), L('España (Madrid), Portugal (Lisboa), Italia (Roma), Grecia (Atenas), Malta (La Valeta), Croacia (Zagreb), Serbia (Belgrado), Bulgaria (Sofía)', 'Spain (Madrid), Portugal (Lisbon), Italy (Rome), Greece (Athens), Malta (Valletta), Croatia (Zagreb), Serbia (Belgrade), Bulgaria (Sofia)', 'Espanya (Madrid), Portugal (Lisboa), Itàlia (Roma), Grècia (Atenes), Malta (la Valletta), Croàcia (Zagreb), Sèrbia (Belgrad), Bulgària (Sofia)')],
          [L('Oeste y centro', 'West and centre', 'Oest i centre'), L('Francia (París), Reino Unido (Londres), Irlanda (Dublín), Bélgica (Bruselas), Países Bajos (Ámsterdam), Luxemburgo (Luxemburgo), Alemania (Berlín), Suiza (Berna), Austria (Viena)', 'France (Paris), United Kingdom (London), Ireland (Dublin), Belgium (Brussels), Netherlands (Amsterdam), Luxembourg (Luxembourg), Germany (Berlin), Switzerland (Bern), Austria (Vienna)', 'França (París), Regne Unit (Londres), Irlanda (Dublín), Bèlgica (Brussel·les), Països Baixos (Amsterdam), Luxemburg (Luxemburg), Alemanya (Berlín), Suïssa (Berna), Àustria (Viena)')],
          [L('Norte', 'North', 'Nord'), L('Islandia (Reikiavik), Noruega (Oslo), Suecia (Estocolmo), Finlandia (Helsinki), Dinamarca (Copenhague), Lituania (Vilna)', 'Iceland (Reykjavík), Norway (Oslo), Sweden (Stockholm), Finland (Helsinki), Denmark (Copenhagen), Lithuania (Vilnius)', 'Islàndia (Reykjavík), Noruega (Oslo), Suècia (Estocolm), Finlàndia (Hèlsinki), Dinamarca (Copenhaguen), Lituània (Vílnius)')],
          [L('Este', 'East', 'Est'), L('Polonia (Varsovia), República Checa (Praga), Eslovaquia (Bratislava), Hungría (Budapest), Rumanía (Bucarest), Ucrania (Kiev), Rusia (Moscú, entre Europa y Asia)', 'Poland (Warsaw), Czech Republic (Prague), Slovakia (Bratislava), Hungary (Budapest), Romania (Bucharest), Ukraine (Kyiv), Russia (Moscow, between Europe and Asia)', 'Polònia (Varsòvia), República Txeca (Praga), Eslovàquia (Bratislava), Hongria (Budapest), Romania (Bucarest), Ucraïna (Kíiv), Rússia (Moscou, entre Europa i Àsia)')],
        ],
      },
    },
    {
      titulo: L('Relieve y ríos', 'Mountains and rivers', 'Relleu i rius'),
      lista: L(
        ['Montañas: los Alpes (el Mont Blanc, en la frontera entre Francia e Italia, unos 4.800 m), los Pirineos, los Cárpatos, los Apeninos, los Balcanes y los Urales, que la separan de Asia. Al este, la gran llanura europea, de Francia a Rusia.', 'Ríos: el Volga es el más largo de Europa (unos 3.500 km, desemboca en el mar Caspio); el Danubio, el segundo, cruza diez países y desemboca en el mar Negro. Otros: el Rin, el Sena, el Loira, el Támesis, el Elba y el Tajo.', 'Mares: Mediterráneo, del Norte, Báltico y Negro; y los océanos Atlántico y Ártico.'],
        ['Mountains: the Alps (Mont Blanc, on the France-Italy border, about 4,800 m), the Pyrenees, the Carpathians, the Apennines, the Balkans and the Urals, which separate it from Asia. To the east, the great European plain, from France to Russia.', 'Rivers: the Volga is Europe’s longest (about 3,500 km, flowing into the Caspian Sea); the Danube, second, crosses ten countries and flows into the Black Sea. Others: the Rhine, Seine, Loire, Thames, Elbe and Tagus.', 'Seas: the Mediterranean, North, Baltic and Black Seas; and the Atlantic and Arctic Oceans.'],
        ['Muntanyes: els Alps (el Mont Blanc, a la frontera entre França i Itàlia, uns 4.800 m), els Pirineus, els Carpats, els Apenins, els Balcans i els Urals, que la separen d’Àsia. A l’est, la gran plana europea, de França a Rússia.', 'Rius: el Volga és el més llarg d’Europa (uns 3.500 km, desemboca al mar Caspi); el Danubi, el segon, travessa deu països i desemboca al mar Negre. Altres: el Rin, el Sena, el Loira, el Tàmesi, l’Elba i el Tajo.', 'Mars: Mediterrani, del Nord, Bàltic i Negre; i els oceans Atlàntic i Àrtic.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Cuál es la capital de Países Bajos, Suiza y Ucrania?', 'What are the capitals of the Netherlands, Switzerland and Ukraine?', 'Quina és la capital dels Països Baixos, Suïssa i Ucraïna?'),
      s: T('Ámsterdam, Berna y Kiev. Ojo: el gobierno neerlandés está en La Haya, pero la capital es Ámsterdam; y la de Suiza es Berna, no Zúrich ni Ginebra.', 'Amsterdam, Bern and Kyiv. Note: the Dutch government sits in The Hague, but the capital is Amsterdam; and Switzerland’s is Bern, not Zurich or Geneva.', 'Amsterdam, Berna i Kíiv. Compte: el govern neerlandès és a la Haia, però la capital és Amsterdam; i la de Suïssa és Berna, no Zúric ni Ginebra.') },
    { e: T('¿Qué montañas separan Europa de Asia?', 'Which mountains separate Europe from Asia?', 'Quines muntanyes separen Europa d’Àsia?'),
      s: T('Los montes Urales, en Rusia.', 'The Ural Mountains, in Russia.', 'Els monts Urals, a Rússia.') },
    { e: T('¿Cuál es el río más largo de Europa y dónde desemboca?', 'What is Europe’s longest river and where does it end?', 'Quin és el riu més llarg d’Europa i on desemboca?'),
      s: T('El Volga, en el mar Caspio.', 'The Volga, in the Caspian Sea.', 'El Volga, al mar Caspi.') },
  ],
}

const africa = {
  metaTitle: L('África: países y capitales, el Sáhara, el Nilo y su relieve (con tabla) — resumen y ejercicios', 'Africa: countries and capitals, the Sahara, the Nile and its landforms (with a table) — summary and practice', 'Àfrica: països i capitals, el Sàhara, el Nil i el relleu (amb taula) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Países y capitales', 'Countries and capitals', 'Països i capitals'),
      tabla: {
        columnas: L(['Zona', 'Países y capitales'], ['Area', 'Countries and capitals'], ['Zona', 'Països i capitals']),
        filas: [
          [L('Norte', 'North', 'Nord'), L('Marruecos (Rabat), Argelia (Argel), Túnez (Túnez), Libia (Trípoli), Egipto (El Cairo), Sudán (Jartum)', 'Morocco (Rabat), Algeria (Algiers), Tunisia (Tunis), Libya (Tripoli), Egypt (Cairo), Sudan (Khartoum)', 'el Marroc (Rabat), Algèria (Alger), Tunísia (Tunis), Líbia (Trípoli), Egipte (el Caire), Sudan (Khartum)')],
          [L('Oeste', 'West', 'Oest'), L('Senegal (Dakar), Ghana (Acra), Costa de Marfil (Yamusukro), Nigeria (Abuya), Camerún (Yaundé)', 'Senegal (Dakar), Ghana (Accra), Ivory Coast (Yamoussoukro), Nigeria (Abuja), Cameroon (Yaoundé)', 'Senegal (Dakar), Ghana (Accra), Costa d’Ivori (Yamoussoukro), Nigèria (Abuja), Camerun (Yaoundé)')],
          [L('Este', 'East', 'Est'), L('Etiopía (Adís Abeba), Kenia (Nairobi), Uganda (Kampala), Ruanda (Kigali), Tanzania (Dodoma)', 'Ethiopia (Addis Ababa), Kenya (Nairobi), Uganda (Kampala), Rwanda (Kigali), Tanzania (Dodoma)', 'Etiòpia (Addis Abeba), Kenya (Nairobi), Uganda (Kampala), Ruanda (Kigali), Tanzània (Dodoma)')],
          [L('Centro y sur', 'Centre and south', 'Centre i sud'), L('R. D. del Congo (Kinsasa), Angola (Luanda), Zimbabue (Harare), Mozambique (Maputo), Madagascar (Antananarivo), Sudáfrica (Pretoria)', 'DR Congo (Kinshasa), Angola (Luanda), Zimbabwe (Harare), Mozambique (Maputo), Madagascar (Antananarivo), South Africa (Pretoria)', 'R. D. del Congo (Kinshasa), Angola (Luanda), Zimbàbue (Harare), Moçambic (Maputo), Madagascar (Antananarivo), Sud-àfrica (Pretòria)')],
        ],
      },
      texto: L(
        ['Algunas capitales no son la ciudad más grande: en Nigeria es Abuya (no Lagos), en Costa de Marfil Yamusukro (no Abiyán) y en Tanzania Dodoma (no Dar es-Salam). Sudáfrica tiene tres capitales: Pretoria (el gobierno), Ciudad del Cabo (el parlamento) y Bloemfontein (los tribunales). África tiene 54 países reconocidos por la ONU.'],
        ['Some capitals are not the biggest city: Nigeria’s is Abuja (not Lagos), Ivory Coast’s is Yamoussoukro (not Abidjan) and Tanzania’s is Dodoma (not Dar es Salaam). South Africa has three capitals: Pretoria (government), Cape Town (parliament) and Bloemfontein (courts). Africa has 54 UN-recognised countries.'],
        ['Algunes capitals no són la ciutat més gran: a Nigèria és Abuja (no Lagos), a Costa d’Ivori Yamoussoukro (no Abidjan) i a Tanzània Dodoma (no Dar es Salaam). Sud-àfrica té tres capitals: Pretòria (el govern), Ciutat del Cap (el parlament) i Bloemfontein (els tribunals). Àfrica té 54 països reconeguts per l’ONU.'],
      ),
    },
    {
      titulo: L('Relieve, ríos y desiertos', 'Landforms, rivers and deserts', 'Relleu, rius i deserts'),
      lista: L(
        ['Desiertos: el Sáhara, en el norte, el mayor desierto cálido del mundo; en el sur, el Kalahari y el Namib.', 'Montañas: el Atlas (Marruecos, Argelia y Túnez) y el Kilimanjaro (Tanzania, unos 5.895 m), el punto más alto de África. Al este, el valle del Rift, una gran grieta donde se separan dos placas.', 'Ríos y lagos: el Nilo, el más largo de África (unos 6.650 km), desemboca en el Mediterráneo; el Congo, el más caudaloso; también el Níger y el Zambeze (con las cataratas Victoria). El lago Victoria es el más grande del continente.'],
        ['Deserts: the Sahara, in the north, the largest hot desert in the world; in the south, the Kalahari and the Namib.', 'Mountains: the Atlas (Morocco, Algeria and Tunisia) and Kilimanjaro (Tanzania, about 5,895 m), Africa’s highest point. To the east, the Rift Valley, a huge crack where two plates are pulling apart.', 'Rivers and lakes: the Nile, Africa’s longest (about 6,650 km), flows into the Mediterranean; the Congo carries the most water; also the Niger and the Zambezi (with Victoria Falls). Lake Victoria is the continent’s largest.'],
        ['Deserts: el Sàhara, al nord, el desert càlid més gran del món; al sud, el Kalahari i el Namib.', 'Muntanyes: l’Atles (el Marroc, Algèria i Tunísia) i el Kilimanjaro (Tanzània, uns 5.895 m), el punt més alt d’Àfrica. A l’est, la vall del Rift, una gran esquerda on se separen dues plaques.', 'Rius i llacs: el Nil, el més llarg d’Àfrica (uns 6.650 km), desemboca a la Mediterrània; el Congo, el més cabalós; també el Níger i el Zambezi (amb les cascades Victòria). El llac Victòria és el més gran del continent.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Cuál es la capital de Nigeria, Kenia y Egipto?', 'What are the capitals of Nigeria, Kenya and Egypt?', 'Quina és la capital de Nigèria, Kenya i Egipte?'),
      s: T('Abuya (no Lagos), Nairobi y El Cairo.', 'Abuja (not Lagos), Nairobi and Cairo.', 'Abuja (no Lagos), Nairobi i el Caire.') },
    { e: T('¿Cuál es la montaña más alta de África y en qué país está?', 'What is Africa’s highest mountain and which country is it in?', 'Quina és la muntanya més alta d’Àfrica i a quin país és?'),
      s: T('El Kilimanjaro, en Tanzania, de unos 5.895 m.', 'Kilimanjaro, in Tanzania, about 5,895 m.', 'El Kilimanjaro, a Tanzània, d’uns 5.895 m.') },
    { e: T('¿Qué separa África de Europa y a cuánta distancia están en el punto más estrecho?', 'What separates Africa from Europe, and how far apart are they at the narrowest point?', 'Què separa Àfrica d’Europa i a quina distància són al punt més estret?'),
      s: T('El mar Mediterráneo; en el estrecho de Gibraltar, entre España y Marruecos, solo unos 14 km.', 'The Mediterranean Sea; at the Strait of Gibraltar, between Spain and Morocco, only about 14 km.', 'El mar Mediterrani; a l’estret de Gibraltar, entre Espanya i el Marroc, només uns 14 km.') },
  ],
}

export const AMPLIACION_T10 = { wwii, 'guerra-fria': guerraFria, ciencia, primaria, europa, africa }
