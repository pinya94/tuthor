// Historia de la ciencia — Historia, ESO + Bachillerato. De Arquímedes y
// Copérnico a Newton, Lavoisier, Darwin, Mendel, Curie, Einstein, la
// penicilina y el ADN: quién descubrió qué y por qué cambió el mundo.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  // La correcta se guarda como TEXTO (lo que leen ExamenMC y las tarjetas
  // imprimibles de lib/tarjetasExamen.js): el de la primera opción.
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('hc-01', 'eso', '🛁',
    T("¿Qué descubrió Arquímedes, según la leyenda, al meterse en el baño?", "What did Archimedes discover, according to legend, when he got into the bath?", "Què va descobrir Arquimedes, segons la llegenda, quan es va ficar al bany?"),
    O(["El empuje que sufre un cuerpo sumergido en un líquido", "La ley de la gravedad", "La circulación de la sangre", "Que la Tierra es redonda"],
      ["The upthrust on a body immersed in a liquid", "The law of gravity", "The circulation of the blood", "That the Earth is round"],
      ["L'empenta que rep un cos submergit en un líquid", "La llei de la gravetat", "La circulació de la sang", "Que la Terra és rodona"]),
    T("Al ver subir el agua de la bañera entendió que un cuerpo sumergido desaloja su volumen de agua y recibe un empuje hacia arriba igual al peso de esa agua. Cuenta la leyenda que salió gritando «¡Eureka!» («¡Lo encontré!»).",
      "Seeing the bath water rise, he understood that a submerged body displaces its own volume of water and is pushed upwards by a force equal to the weight of that water. Legend says he ran out shouting \"Eureka!\" (\"I've found it!\").",
      "En veure pujar l'aigua de la banyera va entendre que un cos submergit desallotja el seu volum d'aigua i rep una empenta cap amunt igual al pes d'aquesta aigua. Diu la llegenda que va sortir cridant «Eureka!» («Ho he trobat!»).")),

  q('hc-02', 'eso', '☀️',
    T("¿Qué defendió Nicolás Copérnico en 1543?", "What did Nicolaus Copernicus argue in 1543?", "Què va defensar Nicolau Copèrnic el 1543?"),
    O(["Que la Tierra y los planetas giran alrededor del Sol", "Que el Sol gira alrededor de la Tierra", "Que la Tierra es plana", "Que la Luna tiene luz propia"],
      ["That the Earth and the planets go round the Sun", "That the Sun goes round the Earth", "That the Earth is flat", "That the Moon gives off its own light"],
      ["Que la Terra i els planetes giren al voltant del Sol", "Que el Sol gira al voltant de la Terra", "Que la Terra és plana", "Que la Lluna té llum pròpia"]),
    T("Es el heliocentrismo (el Sol en el centro). Hasta entonces se aceptaba el modelo geocéntrico de Ptolomeo, con la Tierra quieta en el centro del universo.",
      "This is heliocentrism (the Sun at the centre). Until then Ptolemy's geocentric model, with a motionless Earth at the centre of the universe, was accepted.",
      "És l'heliocentrisme (el Sol al centre). Fins aleshores s'acceptava el model geocèntric de Ptolemeu, amb la Terra quieta al centre de l'univers.")),

  q('hc-03', 'eso', '🔭',
    T("¿Qué vio Galileo al apuntar su telescopio a Júpiter en 1610?", "What did Galileo see when he pointed his telescope at Jupiter in 1610?", "Què va veure Galileu quan va apuntar el telescopi a Júpiter el 1610?"),
    O(["Cuatro lunas que giraban a su alrededor", "Anillos como los de Saturno", "Que era una estrella", "Agua líquida"],
      ["Four moons going round it", "Rings like Saturn's", "That it was a star", "Liquid water"],
      ["Quatre llunes que giraven al seu voltant", "Anells com els de Saturn", "Que era una estrella", "Aigua líquida"]),
    T("Si había cuerpos que giraban alrededor de Júpiter, no todo giraba alrededor de la Tierra: era una prueba a favor de Copérnico. Defenderlo le costó a Galileo un juicio de la Inquisición en 1633.",
      "If there were bodies going round Jupiter, not everything went round the Earth: it was evidence for Copernicus. Defending this cost Galileo a trial by the Inquisition in 1633.",
      "Si hi havia cossos que giraven al voltant de Júpiter, no tot girava al voltant de la Terra: era una prova a favor de Copèrnic. Defensar-ho li va costar a Galileu un judici de la Inquisició el 1633.")),

  q('hc-04', 'eso', '🍎',
    T("¿Qué ley explica a la vez por qué cae una manzana y por qué la Luna gira alrededor de la Tierra?", "Which law explains both why an apple falls and why the Moon goes round the Earth?", "Quina llei explica alhora per què cau una poma i per què la Lluna gira al voltant de la Terra?"),
    O(["La ley de la gravitación universal de Newton", "El principio de Arquímedes", "La ley de conservación de la masa", "La teoría de la evolución"],
      ["Newton's law of universal gravitation", "Archimedes' principle", "The law of conservation of mass", "The theory of evolution"],
      ["La llei de la gravitació universal de Newton", "El principi d'Arquimedes", "La llei de conservació de la massa", "La teoria de l'evolució"]),
    T("Newton la publicó en 1687, en los Principia: todos los cuerpos se atraen con una fuerza que depende de sus masas y de la distancia. La misma fuerza que tira de la manzana mantiene a la Luna en su órbita.",
      "Newton published it in 1687, in the Principia: all bodies attract each other with a force that depends on their masses and the distance between them. The same force that pulls the apple keeps the Moon in its orbit.",
      "Newton la va publicar el 1687, als Principia: tots els cossos s'atreuen amb una força que depèn de les seves masses i de la distància. La mateixa força que estira la poma manté la Lluna a la seva òrbita.")),

  q('hc-05', 'eso', '⚗️',
    T("¿A quién se considera el padre de la química moderna?", "Who is considered the father of modern chemistry?", "A qui es considera el pare de la química moderna?"),
    O(["A Antoine Lavoisier", "A Isaac Newton", "A Charles Darwin", "A Galileo Galilei"],
      ["Antoine Lavoisier", "Isaac Newton", "Charles Darwin", "Galileo Galilei"],
      ["A Antoine Lavoisier", "A Isaac Newton", "A Charles Darwin", "A Galileu Galilei"]),
    T("Lavoisier pesó con mucho cuidado lo que entraba y salía de las reacciones y enunció que la masa se conserva: «nada se pierde, nada se crea, todo se transforma». Murió guillotinado en 1794, durante la Revolución francesa.",
      "Lavoisier carefully weighed what went into and came out of reactions and stated that mass is conserved: \"nothing is lost, nothing is created, everything is transformed\". He was guillotined in 1794, during the French Revolution.",
      "Lavoisier va pesar amb molta cura el que entrava i sortia de les reaccions i va enunciar que la massa es conserva: «res no es perd, res no es crea, tot es transforma». Va morir guillotinat el 1794, durant la Revolució francesa.")),

  q('hc-06', 'eso', '🐢',
    T("¿Qué viaje inspiró a Charles Darwin su teoría de la evolución?", "Which voyage inspired Charles Darwin's theory of evolution?", "Quin viatge va inspirar a Charles Darwin la seva teoria de l'evolució?"),
    O(["La vuelta al mundo en el barco Beagle", "El primer viaje de Colón", "La expedición de Magallanes", "Un viaje en globo"],
      ["The round-the-world voyage on HMS Beagle", "Columbus's first voyage", "Magellan's expedition", "A balloon trip"],
      ["La volta al món al vaixell Beagle", "El primer viatge de Colom", "L'expedició de Magalhães", "Un viatge en globus"]),
    T("En las islas Galápagos vio que los pinzones de cada isla tenían el pico adaptado a lo que comían. En 1859 publicó El origen de las especies: sobreviven y se reproducen más los individuos mejor adaptados (selección natural).",
      "On the Galápagos Islands he saw that the finches on each island had beaks suited to what they ate. In 1859 he published On the Origin of Species: the best-adapted individuals survive and reproduce more (natural selection).",
      "A les illes Galápagos va veure que els pinsans de cada illa tenien el bec adaptat al que menjaven. El 1859 va publicar L'origen de les espècies: sobreviuen i es reprodueixen més els individus més ben adaptats (selecció natural).")),

  q('hc-07', 'eso', '🌱',
    T("¿Con qué planta descubrió Gregor Mendel las leyes de la herencia?", "Which plant did Gregor Mendel use to discover the laws of inheritance?", "Amb quina planta va descobrir Gregor Mendel les lleis de l'herència?"),
    O(["El guisante", "El trigo", "La rosa", "El maíz"],
      ["The pea", "Wheat", "The rose", "Maize"],
      ["El pèsol", "El blat", "La rosa", "El blat de moro"]),
    T("Mendel, un monje del actual Chequia, cruzó miles de plantas de guisante en el huerto de su monasterio y contó cómo se heredaban el color o la forma de las semillas. Publicó sus leyes en 1866, pero nadie le hizo caso hasta 1900.",
      "Mendel, a monk in what is now Czechia, crossed thousands of pea plants in his monastery garden and counted how seed colour and shape were inherited. He published his laws in 1866, but no one paid attention until 1900.",
      "Mendel, un monjo de l'actual Txèquia, va creuar milers de plantes de pèsol a l'hort del seu monestir i va comptar com s'heretaven el color o la forma de les llavors. Va publicar les seves lleis el 1866, però ningú no en va fer cas fins al 1900.")),

  q('hc-08', 'eso', '🧪',
    T("¿Qué hizo Dmitri Mendeléiev en 1869?", "What did Dmitri Mendeleev do in 1869?", "Què va fer Dmitri Mendeléiev el 1869?"),
    O(["Ordenó los elementos químicos en la tabla periódica", "Descubrió el electrón", "Inventó la bombilla", "Descubrió la radiactividad"],
      ["He arranged the chemical elements in the periodic table", "He discovered the electron", "He invented the light bulb", "He discovered radioactivity"],
      ["Va ordenar els elements químics a la taula periòdica", "Va descobrir l'electró", "Va inventar la bombeta", "Va descobrir la radioactivitat"]),
    T("Los ordenó por su masa y agrupó los que se parecían. Su gran acierto fue dejar huecos para elementos que aún no se conocían y predecir cómo serían; cuando se descubrieron (el galio, el germanio), encajaban.",
      "He ordered them by mass and grouped similar ones. His great insight was to leave gaps for elements not yet known and predict what they would be like; when they were found (gallium, germanium), they fitted.",
      "Els va ordenar per la massa i va agrupar els que s'assemblaven. El seu gran encert va ser deixar buits per a elements que encara no es coneixien i predir com serien; quan es van descobrir (el gal·li, el germani), encaixaven.")),

  q('hc-09', 'eso', '☢️',
    T("¿Qué científica fue la primera persona en ganar dos premios Nobel?", "Which scientist was the first person to win two Nobel Prizes?", "Quina científica va ser la primera persona a guanyar dos premis Nobel?"),
    O(["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Margarita Salas"],
      ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Margarita Salas"],
      ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Margarita Salas"]),
    T("Marie Curie ganó el de Física en 1903 (por la radiactividad) y el de Química en 1911 (por descubrir el polonio y el radio). Es la única persona con Nobel en dos ciencias distintas.",
      "Marie Curie won the Physics prize in 1903 (for radioactivity) and the Chemistry prize in 1911 (for discovering polonium and radium). She is the only person with Nobels in two different sciences.",
      "Marie Curie va guanyar el de Física el 1903 (per la radioactivitat) i el de Química el 1911 (per descobrir el poloni i el radi). És l'única persona amb Nobel en dues ciències diferents.")),

  q('hc-10', 'eso', '🍄',
    T("¿Qué descubrió Alexander Fleming en 1928 en una placa con moho?", "What did Alexander Fleming discover in 1928 on a mouldy dish?", "Què va descobrir Alexander Fleming el 1928 en una placa amb floridura?"),
    O(["La penicilina, el primer antibiótico", "La vacuna de la viruela", "La insulina", "Los rayos X"],
      ["Penicillin, the first antibiotic", "The smallpox vaccine", "Insulin", "X-rays"],
      ["La penicil·lina, el primer antibiòtic", "La vacuna de la verola", "La insulina", "Els raigs X"]),
    T("Al volver de vacaciones vio que alrededor de un moho no crecían las bacterias. Esa sustancia, la penicilina, empezó a fabricarse en masa en la Segunda Guerra Mundial y ha salvado millones de vidas.",
      "Back from holiday, he saw that bacteria did not grow around a mould. That substance, penicillin, began to be mass-produced in the Second World War and has saved millions of lives.",
      "En tornar de vacances va veure que al voltant d'una floridura no hi creixien bacteris. Aquesta substància, la penicil·lina, es va començar a fabricar en massa a la Segona Guerra Mundial i ha salvat milions de vides.")),

  q('hc-11', 'eso', '🧠',
    T("¿Por qué ganó Santiago Ramón y Cajal el Nobel de Medicina en 1906?", "Why did Santiago Ramón y Cajal win the Nobel Prize in Medicine in 1906?", "Per què va guanyar Santiago Ramón y Cajal el Nobel de Medicina el 1906?"),
    O(["Por demostrar que el sistema nervioso está formado por neuronas separadas", "Por descubrir la penicilina", "Por inventar el microscopio", "Por la vacuna de la rabia"],
      ["For showing that the nervous system is made of separate neurons", "For discovering penicillin", "For inventing the microscope", "For the rabies vaccine"],
      ["Per demostrar que el sistema nerviós està format per neurones separades", "Per descobrir la penicil·lina", "Per inventar el microscopi", "Per la vacuna de la ràbia"]),
    T("Con el microscopio y unos dibujos que aún se usan, vio que las neuronas son células independientes que se comunican sin tocarse. Es el padre de la neurociencia y el científico español más importante.",
      "With the microscope and drawings still used today, he saw that neurons are independent cells that communicate without touching. He is the father of neuroscience and Spain's most important scientist.",
      "Amb el microscopi i uns dibuixos que encara es fan servir, va veure que les neurones són cèl·lules independents que es comuniquen sense tocar-se. És el pare de la neurociència i el científic espanyol més important.")),

  q('hc-12', 'eso', '💻',
    T("¿Por qué se recuerda a Ada Lovelace?", "Why is Ada Lovelace remembered?", "Per què es recorda Ada Lovelace?"),
    O(["Por escribir el primer programa de ordenador", "Por descubrir el radio", "Por fotografiar el ADN", "Por viajar al espacio"],
      ["For writing the first computer program", "For discovering radium", "For photographing DNA", "For travelling into space"],
      ["Per escriure el primer programa d'ordinador", "Per descobrir el radi", "Per fotografiar l'ADN", "Per viatjar a l'espai"]),
    T("Hacia 1843 escribió las instrucciones para que la máquina analítica de Charles Babbage calculase unos números. La máquina nunca se llegó a construir, pero sus notas son el primer programa de la historia.",
      "Around 1843 she wrote the instructions for Charles Babbage's analytical engine to calculate a series of numbers. The machine was never built, but her notes are the first program in history.",
      "Cap al 1843 va escriure les instruccions perquè la màquina analítica de Charles Babbage calculés uns nombres. La màquina no es va arribar a construir, però les seves notes són el primer programa de la història.")),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('hc-13', 'bachillerato', '🌍',
    T("¿Cómo se llama el modelo del universo que puso la Tierra en el centro y duró hasta el siglo XVI?", "What is the name of the model of the universe that put the Earth at the centre and lasted until the 16th century?", "Com es diu el model de l'univers que posava la Terra al centre i va durar fins al segle XVI?"),
    O(["El modelo geocéntrico de Ptolomeo", "El modelo heliocéntrico", "El big bang", "El modelo atómico de Dalton"],
      ["Ptolemy's geocentric model", "The heliocentric model", "The Big Bang", "Dalton's atomic model"],
      ["El model geocèntric de Ptolemeu", "El model heliocèntric", "El big bang", "El model atòmic de Dalton"]),
    T("Ptolomeo (siglo II) lo explicó con círculos dentro de círculos para cuadrar el movimiento de los planetas. La Iglesia lo aceptó y se mantuvo casi 1.400 años, hasta Copérnico.",
      "Ptolemy (2nd century) explained it with circles within circles to make the planets' motion fit. The Church accepted it and it lasted almost 1,400 years, until Copernicus.",
      "Ptolemeu (segle II) el va explicar amb cercles dins de cercles per quadrar el moviment dels planetes. L'Església el va acceptar i es va mantenir gairebé 1.400 anys, fins a Copèrnic.")),

  q('hc-14', 'bachillerato', '📐',
    T("¿Qué se entiende por «Revolución científica» de los siglos XVI y XVII?", "What is meant by the \"Scientific Revolution\" of the 16th and 17th centuries?", "Què s'entén per «Revolució científica» dels segles XVI i XVII?"),
    O(["El paso a explicar la naturaleza con observación, experimentos y matemáticas", "La invención de la máquina de vapor", "La llegada de la electricidad a las ciudades", "La creación de las primeras universidades"],
      ["The shift to explaining nature through observation, experiments and mathematics", "The invention of the steam engine", "The arrival of electricity in cities", "The founding of the first universities"],
      ["El pas a explicar la natura amb observació, experiments i matemàtiques", "La invenció de la màquina de vapor", "L'arribada de l'electricitat a les ciutats", "La creació de les primeres universitats"]),
    T("De Copérnico (1543) a Newton (1687), dejó de bastar la autoridad de Aristóteles o de la Biblia: había que comprobar las ideas con experimentos y expresarlas con matemáticas. Es el nacimiento del método científico.",
      "From Copernicus (1543) to Newton (1687), the authority of Aristotle or the Bible was no longer enough: ideas had to be tested by experiment and expressed in mathematics. It is the birth of the scientific method.",
      "De Copèrnic (1543) a Newton (1687), va deixar de bastar l'autoritat d'Aristòtil o de la Bíblia: calia comprovar les idees amb experiments i expressar-les amb matemàtiques. És el naixement del mètode científic.")),

  q('hc-15', 'bachillerato', '⚖️',
    T("¿Por qué juzgó la Inquisición a Galileo en 1633?", "Why did the Inquisition put Galileo on trial in 1633?", "Per què la Inquisició va jutjar Galileu el 1633?"),
    O(["Por defender que la Tierra se mueve alrededor del Sol", "Por inventar el telescopio", "Por negar la existencia de Dios", "Por practicar la alquimia"],
      ["For arguing that the Earth moves round the Sun", "For inventing the telescope", "For denying the existence of God", "For practising alchemy"],
      ["Per defensar que la Terra es mou al voltant del Sol", "Per inventar el telescopi", "Per negar l'existència de Déu", "Per practicar l'alquímia"]),
    T("Lo obligaron a retractarse y pasó el resto de su vida en arresto domiciliario. La Iglesia no reconoció su error hasta 1992. Galileo no inventó el telescopio: lo mejoró y fue el primero en usarlo para mirar el cielo con método.",
      "He was forced to recant and spent the rest of his life under house arrest. The Church did not admit its mistake until 1992. Galileo did not invent the telescope: he improved it and was the first to use it methodically to study the sky.",
      "El van obligar a retractar-se i va passar la resta de la seva vida en arrest domiciliari. L'Església no va reconèixer el seu error fins al 1992. Galileu no va inventar el telescopi: el va millorar i va ser el primer a fer-lo servir per mirar el cel amb mètode.")),

  q('hc-16', 'bachillerato', '💉',
    T("¿Qué demostró Louis Pasteur con sus experimentos con matraces de cuello de cisne?", "What did Louis Pasteur show with his swan-neck flask experiments?", "Què va demostrar Louis Pasteur amb els seus experiments amb matrassos de coll de cigne?"),
    O(["Que los microbios no nacen solos: vienen de otros microbios", "Que la luz es una onda", "Que la sangre circula", "Que los átomos se pueden dividir"],
      ["That microbes do not arise by themselves: they come from other microbes", "That light is a wave", "That blood circulates", "That atoms can be split"],
      ["Que els microbis no neixen sols: venen d'altres microbis", "Que la llum és una ona", "Que la sang circula", "Que els àtoms es poden dividir"]),
    T("Así acabó con la idea de la generación espontánea. Pasteur explicó que muchas enfermedades las causan microbios, inventó la pasteurización y creó la vacuna contra la rabia (1885).",
      "That ended the idea of spontaneous generation. Pasteur explained that many diseases are caused by microbes, invented pasteurisation and created the rabies vaccine (1885).",
      "Així va acabar amb la idea de la generació espontània. Pasteur va explicar que moltes malalties les causen microbis, va inventar la pasteurització i va crear la vacuna contra la ràbia (1885).")),

  q('hc-17', 'bachillerato', '⚡',
    T("¿Qué significa la famosa ecuación de Einstein E = mc²?", "What does Einstein's famous equation E = mc² mean?", "Què significa la famosa equació d'Einstein E = mc²?"),
    O(["Que la masa se puede convertir en energía, y mucha", "Que la energía siempre se pierde en calor", "Que la velocidad de la luz cambia", "Que el tiempo no existe"],
      ["That mass can be turned into energy, and a lot of it", "That energy is always lost as heat", "That the speed of light changes", "That time does not exist"],
      ["Que la massa es pot convertir en energia, i molta", "Que l'energia sempre es perd en calor", "Que la velocitat de la llum canvia", "Que el temps no existeix"]),
    T("La c es la velocidad de la luz, un número enorme, y al cuadrado aún más: una masa diminuta equivale a muchísima energía. Por eso funcionan el Sol, las centrales nucleares y la bomba atómica. Einstein la publicó en 1905.",
      "c is the speed of light, a huge number, and squared it is even bigger: a tiny mass is equivalent to an enormous amount of energy. That is why the Sun, nuclear power stations and the atomic bomb work. Einstein published it in 1905.",
      "La c és la velocitat de la llum, un nombre enorme, i al quadrat encara més: una massa diminuta equival a moltíssima energia. Per això funcionen el Sol, les centrals nuclears i la bomba atòmica. Einstein la va publicar el 1905.")),

  q('hc-18', 'bachillerato', '🧬',
    T("¿Qué papel tuvo Rosalind Franklin en el descubrimiento de la estructura del ADN?", "What part did Rosalind Franklin play in discovering the structure of DNA?", "Quin paper va tenir Rosalind Franklin en el descobriment de l'estructura de l'ADN?"),
    O(["Su «fotografía 51» con rayos X mostró la forma de doble hélice", "Ganó el Nobel junto a Watson y Crick", "Descubrió que el ADN está en el núcleo", "Inventó el microscopio electrónico"],
      ["Her \"Photograph 51\" with X-rays showed the double-helix shape", "She won the Nobel with Watson and Crick", "She discovered that DNA is in the nucleus", "She invented the electron microscope"],
      ["La seva «fotografia 51» amb raigs X va mostrar la forma de doble hèlix", "Va guanyar el Nobel amb Watson i Crick", "Va descobrir que l'ADN és al nucli", "Va inventar el microscopi electrònic"]),
    T("Watson y Crick vieron su foto sin que ella lo supiera y en 1953 publicaron el modelo de doble hélice. Ganaron el Nobel en 1962; Franklin había muerto en 1958, con 37 años, y el Nobel no se da a título póstumo.",
      "Watson and Crick saw her photo without her knowing and in 1953 published the double-helix model. They won the Nobel in 1962; Franklin had died in 1958, aged 37, and the Nobel is not awarded posthumously.",
      "Watson i Crick van veure la seva foto sense que ella ho sabés i el 1953 van publicar el model de doble hèlix. Van guanyar el Nobel el 1962; Franklin havia mort el 1958, amb 37 anys, i el Nobel no es dona a títol pòstum.")),

  q('hc-19', 'bachillerato', '🔬',
    T("¿Qué descubrió Margarita Salas, una de las científicas españolas más importantes?", "What did Margarita Salas, one of Spain's most important scientists, discover?", "Què va descobrir Margarita Salas, una de les científiques espanyoles més importants?"),
    O(["La ADN polimerasa del virus phi29, que permite copiar ADN", "La penicilina", "El bosón de Higgs", "La vacuna de la polio"],
      ["The DNA polymerase of the phi29 virus, which lets DNA be copied", "Penicillin", "The Higgs boson", "The polio vaccine"],
      ["L'ADN polimerasa del virus phi29, que permet copiar ADN", "La penicil·lina", "El bosó de Higgs", "La vacuna de la pòlio"]),
    T("Esa enzima copia ADN de forma muy rápida y fiable, y se usa en todo el mundo para analizar pequeñas muestras de ADN (en medicina o en investigación forense). Fue discípula de Severo Ochoa, Nobel de Medicina en 1959.",
      "That enzyme copies DNA very quickly and reliably, and it is used worldwide to analyse tiny DNA samples (in medicine or forensic science). She was a student of Severo Ochoa, Nobel laureate in Medicine in 1959.",
      "Aquest enzim copia ADN de manera molt ràpida i fiable, i es fa servir a tot el món per analitzar mostres petites d'ADN (en medicina o en investigació forense). Va ser deixebla de Severo Ochoa, Nobel de Medicina el 1959.")),

  q('hc-20', 'bachillerato', '📜',
    T("¿Por qué se ve la teoría de Darwin como una revolución también fuera de la biología?", "Why is Darwin's theory seen as a revolution beyond biology too?", "Per què es veu la teoria de Darwin com una revolució també fora de la biologia?"),
    O(["Porque explicaba el origen de las especies, incluido el ser humano, sin un acto de creación", "Porque demostró que la Tierra gira alrededor del Sol", "Porque inventó la genética", "Porque acabó con las enfermedades infecciosas"],
      ["Because it explained the origin of species, humans included, without an act of creation", "Because it proved the Earth goes round the Sun", "Because it invented genetics", "Because it ended infectious diseases"],
      ["Perquè explicava l'origen de les espècies, inclòs l'ésser humà, sense un acte de creació", "Perquè va demostrar que la Terra gira al voltant del Sol", "Perquè va inventar la genètica", "Perquè va acabar amb les malalties infeccioses"]),
    T("Que los seres humanos compartieran antepasados con los simios chocó con la lectura literal de la Biblia y provocó grandes debates. Darwin no conocía la genética: el mecanismo de la herencia lo había descrito Mendel, pero no se conoció hasta 1900.",
      "That humans shared ancestors with apes clashed with a literal reading of the Bible and sparked great debates. Darwin did not know about genetics: Mendel had described how inheritance works, but it was not known until 1900.",
      "Que els éssers humans compartissin avantpassats amb els simis va xocar amb la lectura literal de la Bíblia i va provocar grans debats. Darwin no coneixia la genètica: el mecanisme de l'herència l'havia descrit Mendel, però no es va conèixer fins al 1900.")),

  q('hc-21', 'bachillerato', '🏛️',
    T("¿Quién fue Hipatia de Alejandría?", "Who was Hypatia of Alexandria?", "Qui va ser Hipàtia d'Alexandria?"),
    O(["Una matemática y astrónoma de la Antigüedad", "Una reina de Egipto", "Una poeta griega", "Una médica medieval"],
      ["A mathematician and astronomer of Antiquity", "A queen of Egypt", "A Greek poet", "A medieval doctor"],
      ["Una matemàtica i astrònoma de l'Antiguitat", "Una reina d'Egipte", "Una poeta grega", "Una metgessa medieval"]),
    T("Enseñó matemáticas, astronomía y filosofía en Alejandría hacia el año 400. En 415 la asesinó una turba en medio de luchas políticas y religiosas. Es una de las primeras mujeres científicas conocidas por su nombre.",
      "She taught mathematics, astronomy and philosophy in Alexandria around the year 400. In 415 she was murdered by a mob amid political and religious strife. She is one of the first women scientists known by name.",
      "Va ensenyar matemàtiques, astronomia i filosofia a Alexandria cap a l'any 400. El 415 la va assassinar una torba enmig de lluites polítiques i religioses. És una de les primeres dones científiques conegudes pel seu nom.")),

  q('hc-22', 'bachillerato', '🧫',
    T("¿Qué descubrió Rita Levi-Montalcini, a pesar de tener que investigar escondida durante la Segunda Guerra Mundial?", "What did Rita Levi-Montalcini discover, despite having to do her research in hiding during the Second World War?", "Què va descobrir Rita Levi-Montalcini, tot i haver d'investigar amagada durant la Segona Guerra Mundial?"),
    O(["El factor de crecimiento nervioso", "La estructura del ADN", "El neutrón", "La insulina"],
      ["Nerve growth factor", "The structure of DNA", "The neutron", "Insulin"],
      ["El factor de creixement nerviós", "L'estructura de l'ADN", "El neutró", "La insulina"]),
    T("Las leyes racistas de Mussolini le impedían trabajar por ser judía, así que montó un laboratorio en su dormitorio. Más tarde descubrió la sustancia que hace crecer las neuronas y ganó el Nobel de Medicina en 1986.",
      "Mussolini's racial laws barred her from working because she was Jewish, so she set up a laboratory in her bedroom. Later she discovered the substance that makes neurons grow and won the Nobel Prize in Medicine in 1986.",
      "Les lleis racistes de Mussolini li impedien treballar per ser jueva, així que va muntar un laboratori al seu dormitori. Més tard va descobrir la substància que fa créixer les neurones i va guanyar el Nobel de Medicina el 1986.")),

  q('hc-23', 'bachillerato', '🧲',
    T("Antes de Lavoisier, ¿cómo se explicaba que las cosas ardieran?", "Before Lavoisier, how was burning explained?", "Abans de Lavoisier, com s'explicava que les coses cremessin?"),
    O(["Con el flogisto, una sustancia que los cuerpos soltaban al arder", "Con el oxígeno del aire", "Con la electricidad", "Con los átomos de fuego de Dalton"],
      ["With phlogiston, a substance that bodies gave off when burning", "With oxygen in the air", "With electricity", "With Dalton's fire atoms"],
      ["Amb el flogist, una substància que els cossos deixaven anar en cremar", "Amb l'oxigen de l'aire", "Amb l'electricitat", "Amb els àtoms de foc de Dalton"]),
    T("Lavoisier pesó los metales antes y después de calentarlos y vio que ganaban masa: no perdían nada, sino que se combinaban con un gas del aire, al que llamó oxígeno. Así cayó la teoría del flogisto.",
      "Lavoisier weighed metals before and after heating them and saw that they gained mass: they lost nothing, but combined with a gas from the air, which he named oxygen. That brought down the phlogiston theory.",
      "Lavoisier va pesar els metalls abans i després d'escalfar-los i va veure que guanyaven massa: no perdien res, sinó que es combinaven amb un gas de l'aire, que va anomenar oxigen. Així va caure la teoria del flogist.")),

  q('hc-24', 'bachillerato', '🕰️',
    T("¿Cuál de estos descubrimientos es el más antiguo?", "Which of these discoveries is the oldest?", "Quin d'aquests descobriments és el més antic?"),
    O(["La ley de la gravitación universal de Newton", "La tabla periódica de Mendeléiev", "La teoría de la evolución de Darwin", "La penicilina de Fleming"],
      ["Newton's law of universal gravitation", "Mendeleev's periodic table", "Darwin's theory of evolution", "Fleming's penicillin"],
      ["La llei de la gravitació universal de Newton", "La taula periòdica de Mendeléiev", "La teoria de l'evolució de Darwin", "La penicil·lina de Fleming"]),
    T("Newton, 1687; Darwin, 1859; Mendeléiev, 1869; Fleming, 1928. La gravitación es casi dos siglos anterior a la evolución.",
      "Newton, 1687; Darwin, 1859; Mendeleev, 1869; Fleming, 1928. Gravitation came almost two centuries before evolution.",
      "Newton, 1687; Darwin, 1859; Mendeléiev, 1869; Fleming, 1928. La gravitació és gairebé dos segles anterior a l'evolució.")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
