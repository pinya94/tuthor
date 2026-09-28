// Contenido propio (resumen + puntos clave) de las páginas de estudio por tema
// de ciencias. Existe para que esas páginas NO sean una plantilla vacía
// (descripción de una línea + tarjetas de examen), sino una landing con
// contenido único que merece indexarse. La misma fuente la usan:
//   · QuimicaTema.jsx  → pinta el bloque de contenido
//   · scripts/seoMeta.mjs → resuelve title/description para el prerender
//
// La disciplina de cada tema (y por tanto su URL /estudiar/<disc>/<tema>) sale
// de src/data/ciencias.js (disciplinaDeTema). Ampliar = añadir aquí un tema
// más y su URL ×3 idiomas al sitemap; el test de invariantes obliga a ambas.

export const CONTENIDO_TEMA = {
  'celula': {
    metaTitle: {
      es: 'La Célula: partes, tipos y funciones — resumen para estudiar',
      en: 'The Cell: parts, types and functions — a study summary',
      ca: 'La Cèl·lula: parts, tipus i funcions — resum per estudiar',
    },
    metaDesc: {
      es: 'Qué es la célula, sus partes (núcleo, membrana, mitocondrias), la diferencia entre procariotas y eucariotas y entre célula animal y vegetal. Resumen y test.',
      en: 'What the cell is, its parts (nucleus, membrane, mitochondria), the difference between prokaryotes and eukaryotes and between animal and plant cells. Summary and test.',
      ca: 'Què és la cèl·lula, les seves parts (nucli, membrana, mitocondris), la diferència entre procariotes i eucariotes i entre cèl·lula animal i vegetal. Resum i test.',
    },
    resumen: {
      es: [
        'La célula es la unidad más pequeña que tiene vida: todos los seres vivos estamos formados por células, desde una bacteria de una sola célula hasta un ser humano, que tiene billones. Cada célula nace de otra célula, se alimenta, crece y se reproduce.',
        'Hay dos grandes tipos. Las células procariotas, como las de las bacterias, no tienen núcleo y son muy sencillas. Las eucariotas, como las de plantas y animales, guardan su ADN dentro de un núcleo y tienen orgánulos: pequeñas estructuras con una función cada una. Las mitocondrias obtienen energía, los cloroplastos (solo en las plantas) hacen la fotosíntesis y la membrana controla qué entra y qué sale.',
      ],
      en: [
        'The cell is the smallest unit that is alive: every living thing is made of cells, from a single-celled bacterium to a human being, which has trillions. Each cell comes from another cell, feeds, grows and reproduces.',
        'There are two main types. Prokaryotic cells, like those of bacteria, have no nucleus and are very simple. Eukaryotic cells, like those of plants and animals, keep their DNA inside a nucleus and have organelles: small structures each with a job. Mitochondria release energy, chloroplasts (only in plants) carry out photosynthesis, and the membrane controls what goes in and out.',
      ],
      ca: [
        'La cèl·lula és la unitat més petita que té vida: tots els éssers vius estem formats per cèl·lules, des d\'un bacteri d\'una sola cèl·lula fins a un ésser humà, que en té bilions. Cada cèl·lula neix d\'una altra cèl·lula, s\'alimenta, creix i es reprodueix.',
        'Hi ha dos grans tipus. Les cèl·lules procariotes, com les dels bacteris, no tenen nucli i són molt senzilles. Les eucariotes, com les de plantes i animals, guarden el seu ADN dins d\'un nucli i tenen orgànuls: petites estructures amb una funció cadascuna. Els mitocondris obtenen energia, els cloroplasts (només a les plantes) fan la fotosíntesi i la membrana controla què entra i què surt.',
      ],
    },
    puntosClave: {
      es: [
        'La célula es la unidad básica de la vida: todo ser vivo está hecho de células.',
        'Procariotas (sin núcleo, las bacterias) frente a eucariotas (con núcleo, plantas y animales).',
        'El núcleo guarda el ADN, que contiene las instrucciones de la célula.',
        'Las mitocondrias producen la energía; los cloroplastos hacen la fotosíntesis en las plantas.',
        'La membrana rodea la célula y decide qué sustancias entran y salen.',
        'La célula vegetal tiene pared celular y una vacuola grande; la animal, no.',
        'Las células se multiplican dividiéndose en dos (mitosis).',
      ],
      en: [
        'The cell is the basic unit of life: every living thing is made of cells.',
        'Prokaryotes (no nucleus, bacteria) versus eukaryotes (with a nucleus, plants and animals).',
        'The nucleus stores the DNA, which holds the cell\'s instructions.',
        'Mitochondria produce energy; chloroplasts carry out photosynthesis in plants.',
        'The membrane surrounds the cell and decides which substances enter and leave.',
        'The plant cell has a cell wall and a large vacuole; the animal cell does not.',
        'Cells multiply by dividing in two (mitosis).',
      ],
      ca: [
        'La cèl·lula és la unitat bàsica de la vida: tot ésser viu està fet de cèl·lules.',
        'Procariotes (sense nucli, els bacteris) davant d\'eucariotes (amb nucli, plantes i animals).',
        'El nucli guarda l\'ADN, que conté les instruccions de la cèl·lula.',
        'Els mitocondris produeixen l\'energia; els cloroplasts fan la fotosíntesi a les plantes.',
        'La membrana envolta la cèl·lula i decideix quines substàncies entren i surten.',
        'La cèl·lula vegetal té paret cel·lular i un vacúol gran; l\'animal, no.',
        'Les cèl·lules es multipliquen dividint-se en dues (mitosi).',
      ],
    },
  },

  'tabla-periodica': {
    metaTitle: {
      es: 'La Tabla Periódica: grupos, periodos y cómo se lee — resumen',
      en: 'The Periodic Table: groups, periods and how to read it — summary',
      ca: 'La Taula Periòdica: grups, períodes i com es llegeix — resum',
    },
    metaDesc: {
      es: 'Cómo se ordena la tabla periódica por número atómico, qué son los grupos y los periodos, y por qué los elementos de un mismo grupo se parecen. Resumen y test.',
      en: 'How the periodic table is ordered by atomic number, what groups and periods are, and why elements in the same group behave alike. Summary and test.',
      ca: 'Com s\'ordena la taula periòdica per nombre atòmic, què són els grups i els períodes, i per què els elements d\'un mateix grup s\'assemblen. Resum i test.',
    },
    resumen: {
      es: [
        'La tabla periódica es la manera de ordenar todos los elementos químicos que existen —el oxígeno, el hierro, el oro…— según su número atómico, es decir, el número de protones de su átomo. La ideó Dmitri Mendeléyev en 1869 al darse cuenta de que, colocados en orden, los elementos repetían sus propiedades cada cierto número: de ahí lo de "periódica".',
        'Se lee en filas y columnas. Las filas horizontales se llaman periodos y hay 7. Las columnas verticales se llaman grupos, hay 18, y los elementos de un mismo grupo se comportan de forma parecida: por ejemplo, los del grupo 1 son metales muy reactivos y los del 18 son gases nobles que casi no reaccionan. A grandes rasgos, a la izquierda están los metales y a la derecha, los no metales.',
      ],
      en: [
        'The periodic table is the way of ordering all the chemical elements that exist —oxygen, iron, gold…— by their atomic number, that is, the number of protons in their atom. Dmitri Mendeleev devised it in 1869 when he realised that, placed in order, the elements repeated their properties at regular intervals: hence "periodic".',
        'It is read in rows and columns. The horizontal rows are called periods and there are 7. The vertical columns are called groups, there are 18, and elements in the same group behave alike: for example, those in group 1 are very reactive metals and those in group 18 are noble gases that barely react. Broadly, metals are on the left and non-metals on the right.',
      ],
      ca: [
        'La taula periòdica és la manera d\'ordenar tots els elements químics que existeixen —l\'oxigen, el ferro, l\'or…— segons el seu nombre atòmic, és a dir, el nombre de protons del seu àtom. La va idear Dmitri Mendeléiev el 1869 en adonar-se que, col·locats en ordre, els elements repetien les seves propietats cada cert nombre: d\'aquí el nom de "periòdica".',
        'Es llegeix en files i columnes. Les files horitzontals s\'anomenen períodes i n\'hi ha 7. Les columnes verticals s\'anomenen grups, n\'hi ha 18, i els elements d\'un mateix grup es comporten de manera semblant: per exemple, els del grup 1 són metalls molt reactius i els del 18 són gasos nobles que gairebé no reaccionen. A grans trets, a l\'esquerra hi ha els metalls i a la dreta, els no metalls.',
      ],
    },
    puntosClave: {
      es: [
        'Ordena los elementos por número atómico (el número de protones).',
        'La ideó Mendeléyev en 1869; hoy la tabla tiene 118 elementos.',
        'Periodos = filas horizontales (7); grupos = columnas verticales (18).',
        'Los elementos de un mismo grupo tienen propiedades químicas parecidas.',
        'Metales (izquierda), no metales (derecha) y metaloides (en la frontera).',
        'Cada casilla indica el símbolo, el nombre, el número atómico y la masa atómica.',
        'Grupo 1: alcalinos, muy reactivos; grupo 18: gases nobles, casi inertes.',
      ],
      en: [
        'It orders the elements by atomic number (the number of protons).',
        'Mendeleev devised it in 1869; today the table has 118 elements.',
        'Periods = horizontal rows (7); groups = vertical columns (18).',
        'Elements in the same group have similar chemical properties.',
        'Metals (left), non-metals (right) and metalloids (on the border).',
        'Each box shows the symbol, the name, the atomic number and the atomic mass.',
        'Group 1: alkali metals, very reactive; group 18: noble gases, almost inert.',
      ],
      ca: [
        'Ordena els elements per nombre atòmic (el nombre de protons).',
        'La va idear Mendeléiev el 1869; avui la taula té 118 elements.',
        'Períodes = files horitzontals (7); grups = columnes verticals (18).',
        'Els elements d\'un mateix grup tenen propietats químiques semblants.',
        'Metalls (esquerra), no metalls (dreta) i metal·loides (a la frontera).',
        'Cada casella indica el símbol, el nom, el nombre atòmic i la massa atòmica.',
        'Grup 1: alcalins, molt reactius; grup 18: gasos nobles, gairebé inerts.',
      ],
    },
  },

  'sistema-solar': {
    metaTitle: {
      es: 'El Sistema Solar: planetas, el Sol y los movimientos — resumen',
      en: 'The Solar System: planets, the Sun and its motions — summary',
      ca: 'El Sistema Solar: planetes, el Sol i els moviments — resum',
    },
    metaDesc: {
      es: 'Los ocho planetas, los rocosos y los gaseosos, el Sol, la rotación y la traslación de la Tierra y por qué hay día, noche y estaciones. Resumen y test.',
      en: 'The eight planets, the rocky and gas ones, the Sun, Earth\'s rotation and orbit and why there is day, night and seasons. Summary and test.',
      ca: 'Els vuit planetes, els rocosos i els gasosos, el Sol, la rotació i la translació de la Terra i per què hi ha dia, nit i estacions. Resum i test.',
    },
    resumen: {
      es: [
        'El Sistema Solar es el conjunto formado por el Sol y todo lo que gira a su alrededor: ocho planetas, sus lunas, planetas enanos como Plutón, asteroides y cometas. El Sol es una estrella y concentra casi toda la masa; su gravedad es la que mantiene a todos los cuerpos girando en sus órbitas.',
        'Los planetas se ordenan por su distancia al Sol. Mercurio, Venus, la Tierra y Marte son los planetas rocosos: pequeños y cercanos. Júpiter, Saturno, Urano y Neptuno son los gigantes gaseosos: enormes y lejanos. La Tierra tarda un año en dar una vuelta al Sol (traslación) y un día en girar sobre sí misma (rotación); esa rotación es la que provoca el día y la noche, y la inclinación de su eje, las estaciones.',
      ],
      en: [
        'The Solar System is the Sun together with everything that orbits it: eight planets, their moons, dwarf planets like Pluto, asteroids and comets. The Sun is a star and holds almost all the mass; its gravity is what keeps every body turning in its orbit.',
        'The planets are ordered by their distance from the Sun. Mercury, Venus, Earth and Mars are the rocky planets: small and close. Jupiter, Saturn, Uranus and Neptune are the gas giants: huge and far away. Earth takes a year to go once around the Sun (its orbit) and a day to spin on itself (its rotation); that rotation causes day and night, and the tilt of its axis causes the seasons.',
      ],
      ca: [
        'El Sistema Solar és el conjunt format pel Sol i tot el que gira al seu voltant: vuit planetes, les seves llunes, planetes nans com Plutó, asteroides i cometes. El Sol és una estrella i concentra gairebé tota la massa; la seva gravetat és la que manté tots els cossos girant en les seves òrbites.',
        'Els planetes s\'ordenen per la distància al Sol. Mercuri, Venus, la Terra i Mart són els planetes rocosos: petits i propers. Júpiter, Saturn, Urà i Neptú són els gegants gasosos: enormes i llunyans. La Terra triga un any a fer una volta al Sol (translació) i un dia a girar sobre si mateixa (rotació); aquesta rotació és la que provoca el dia i la nit, i la inclinació del seu eix, les estacions.',
      ],
    },
    puntosClave: {
      es: [
        'El Sol es una estrella y contiene el 99 % de la masa del Sistema Solar.',
        'Ocho planetas: 4 rocosos (Mercurio, Venus, Tierra, Marte) y 4 gaseosos (Júpiter, Saturno, Urano, Neptuno).',
        'La rotación de la Tierra (24 horas) produce el día y la noche.',
        'La traslación (365 días) y la inclinación del eje producen el año y las estaciones.',
        'La Luna es el satélite de la Tierra y gira a su alrededor.',
        'Entre Marte y Júpiter está el cinturón de asteroides.',
        'Plutón se considera un planeta enano desde 2006.',
      ],
      en: [
        'The Sun is a star and holds 99% of the Solar System\'s mass.',
        'Eight planets: 4 rocky (Mercury, Venus, Earth, Mars) and 4 gas (Jupiter, Saturn, Uranus, Neptune).',
        'Earth\'s rotation (24 hours) produces day and night.',
        'The orbit (365 days) and the tilt of the axis produce the year and the seasons.',
        'The Moon is Earth\'s satellite and orbits around it.',
        'Between Mars and Jupiter lies the asteroid belt.',
        'Pluto has been considered a dwarf planet since 2006.',
      ],
      ca: [
        'El Sol és una estrella i conté el 99 % de la massa del Sistema Solar.',
        'Vuit planetes: 4 rocosos (Mercuri, Venus, Terra, Mart) i 4 gasosos (Júpiter, Saturn, Urà, Neptú).',
        'La rotació de la Terra (24 hores) produeix el dia i la nit.',
        'La translació (365 dies) i la inclinació de l\'eix produeixen l\'any i les estacions.',
        'La Lluna és el satèl·lit de la Terra i gira al seu voltant.',
        'Entre Mart i Júpiter hi ha el cinturó d\'asteroides.',
        'Plutó es considera un planeta nan des del 2006.',
      ],
    },
  },

  'cuerpo-humano': {
    metaTitle: {
      es: 'El Cuerpo Humano: aparatos y sistemas — resumen para estudiar',
      en: 'The Human Body: systems and how they work — a study summary',
      ca: 'El Cos Humà: aparells i sistemes — resum per estudiar',
    },
    metaDesc: {
      es: 'Los sistemas del cuerpo humano —digestivo, respiratorio, circulatorio, nervioso, excretor y locomotor— y qué hace cada uno. Resumen claro y test con explicación.',
      en: 'The systems of the human body —digestive, respiratory, circulatory, nervous, excretory and locomotor— and what each one does. Clear summary and explained test.',
      ca: 'Els sistemes del cos humà —digestiu, respiratori, circulatori, nerviós, excretor i locomotor— i què fa cadascun. Resum clar i test amb explicació.',
    },
    resumen: {
      es: [
        'El cuerpo humano funciona gracias a varios sistemas que trabajan coordinados. El sistema digestivo transforma la comida en nutrientes; el respiratorio toma oxígeno del aire y expulsa dióxido de carbono; y el circulatorio, con el corazón y la sangre, reparte esos nutrientes y ese oxígeno a todas las células.',
        'Otros sistemas completan el trabajo. El sistema nervioso, con el cerebro a la cabeza, recibe información de los sentidos y da órdenes; el excretor elimina los desechos a través de los riñones; y el aparato locomotor, formado por huesos y músculos, sostiene el cuerpo y permite el movimiento. Todos están hechos de órganos, y cada órgano, de tejidos y células.',
      ],
      en: [
        'The human body works thanks to several systems acting together. The digestive system turns food into nutrients; the respiratory system takes oxygen from the air and expels carbon dioxide; and the circulatory system, with the heart and blood, delivers those nutrients and that oxygen to every cell.',
        'Other systems complete the job. The nervous system, led by the brain, receives information from the senses and gives orders; the excretory system removes waste through the kidneys; and the locomotor system, made of bones and muscles, holds the body up and allows movement. All of them are made of organs, and each organ of tissues and cells.',
      ],
      ca: [
        'El cos humà funciona gràcies a diversos sistemes que treballen coordinats. El sistema digestiu transforma el menjar en nutrients; el respiratori pren oxigen de l\'aire i expulsa diòxid de carboni; i el circulatori, amb el cor i la sang, reparteix aquests nutrients i aquest oxigen a totes les cèl·lules.',
        'Altres sistemes completen la feina. El sistema nerviós, amb el cervell al capdavant, rep informació dels sentits i dona ordres; l\'excretor elimina els residus a través dels ronyons; i l\'aparell locomotor, format per ossos i músculs, sosté el cos i permet el moviment. Tots estan fets d\'òrgans, i cada òrgan, de teixits i cèl·lules.',
      ],
    },
    puntosClave: {
      es: [
        'El cuerpo se organiza en aparatos o sistemas, cada uno con una función.',
        'Digestivo: convierte los alimentos en nutrientes (boca, estómago, intestinos).',
        'Respiratorio: intercambia oxígeno y dióxido de carbono en los pulmones.',
        'Circulatorio: el corazón bombea la sangre, que reparte oxígeno y nutrientes.',
        'Nervioso: el cerebro coordina el cuerpo y procesa lo que captan los sentidos.',
        'Excretor: los riñones filtran la sangre y forman la orina.',
        'Locomotor: los huesos sostienen el cuerpo y los músculos lo mueven.',
      ],
      en: [
        'The body is organised into systems, each with a function.',
        'Digestive: turns food into nutrients (mouth, stomach, intestines).',
        'Respiratory: exchanges oxygen and carbon dioxide in the lungs.',
        'Circulatory: the heart pumps the blood, which delivers oxygen and nutrients.',
        'Nervous: the brain coordinates the body and processes what the senses pick up.',
        'Excretory: the kidneys filter the blood and form urine.',
        'Locomotor: bones hold the body up and muscles move it.',
      ],
      ca: [
        'El cos s\'organitza en aparells o sistemes, cadascun amb una funció.',
        'Digestiu: converteix els aliments en nutrients (boca, estómac, intestins).',
        'Respiratori: intercanvia oxigen i diòxid de carboni als pulmons.',
        'Circulatori: el cor bomba la sang, que reparteix oxigen i nutrients.',
        'Nerviós: el cervell coordina el cos i processa el que capten els sentits.',
        'Excretor: els ronyons filtren la sang i formen l\'orina.',
        'Locomotor: els ossos sostenen el cos i els músculs el mouen.',
      ],
    },
  },

  'estados-materia': {
    metaTitle: {
      es: 'Los Estados de la Materia: sólido, líquido y gas — resumen',
      en: 'States of Matter: solid, liquid and gas — a study summary',
      ca: 'Els Estats de la Matèria: sòlid, líquid i gas — resum',
    },
    metaDesc: {
      es: 'Sólido, líquido y gas, en qué se diferencian sus partículas y los cambios de estado (fusión, evaporación, condensación). Resumen para estudiar y test.',
      en: 'Solid, liquid and gas, how their particles differ and the changes of state (melting, evaporation, condensation). Study summary and test.',
      ca: 'Sòlid, líquid i gas, en què es diferencien les seves partícules i els canvis d\'estat (fusió, evaporació, condensació). Resum per estudiar i test.',
    },
    resumen: {
      es: [
        'La materia se presenta en tres estados principales: sólido, líquido y gas. Lo que los distingue es cómo están unidas sus partículas. En el sólido están muy juntas y ordenadas, así que tiene forma y volumen fijos. En el líquido están juntas pero pueden moverse: mantiene el volumen, pero adopta la forma del recipiente. En el gas están muy separadas y se mueven libres: ni forma ni volumen fijos, ocupa todo el espacio disponible.',
        'Un mismo material puede cambiar de estado si le damos o le quitamos calor. Al calentar, un sólido se funde y un líquido se evapora; al enfriar, un gas se condensa y un líquido se solidifica. Estos cambios ocurren a temperaturas concretas —la de fusión y la de ebullición— y, mientras dura el cambio, la temperatura no sube: todo el calor se emplea en separar las partículas. Existe un cuarto estado, el plasma, que forma las estrellas.',
      ],
      en: [
        'Matter comes in three main states: solid, liquid and gas. What tells them apart is how their particles are joined. In a solid they are close together and ordered, so it has a fixed shape and volume. In a liquid they are close but can move: it keeps its volume but takes the shape of its container. In a gas they are far apart and move freely: no fixed shape or volume, filling all the space available.',
        'The same material can change state if we add or remove heat. On heating, a solid melts and a liquid evaporates; on cooling, a gas condenses and a liquid solidifies. These changes happen at set temperatures —the melting point and the boiling point— and, while the change lasts, the temperature does not rise: all the heat goes into separating the particles. There is a fourth state, plasma, which makes up the stars.',
      ],
      ca: [
        'La matèria es presenta en tres estats principals: sòlid, líquid i gas. El que els distingeix és com estan unides les seves partícules. En el sòlid estan molt juntes i ordenades, així que té forma i volum fixos. En el líquid estan juntes però es poden moure: manté el volum, però adopta la forma del recipient. En el gas estan molt separades i es mouen lliures: ni forma ni volum fixos, ocupa tot l\'espai disponible.',
        'Un mateix material pot canviar d\'estat si li donem o li traiem calor. En escalfar, un sòlid es fon i un líquid s\'evapora; en refredar, un gas es condensa i un líquid es solidifica. Aquests canvis passen a temperatures concretes —la de fusió i la d\'ebullició— i, mentre dura el canvi, la temperatura no puja: tota la calor s\'empra a separar les partícules. Hi ha un quart estat, el plasma, que forma les estrelles.',
      ],
    },
    puntosClave: {
      es: [
        'Tres estados principales: sólido, líquido y gas (y el plasma, poco común).',
        'Lo que cambia es la unión y el movimiento de las partículas, no las partículas.',
        'Sólido: forma y volumen fijos. Líquido: volumen fijo, forma del recipiente. Gas: ninguno fijo.',
        'Fusión (sólido→líquido), evaporación (líquido→gas), condensación (gas→líquido), solidificación (líquido→sólido).',
        'La sublimación pasa directamente de sólido a gas (el hielo seco).',
        'Los cambios ocurren a temperaturas fijas: la de fusión y la de ebullición.',
        'Durante el cambio de estado, la temperatura se mantiene constante.',
      ],
      en: [
        'Three main states: solid, liquid and gas (plus plasma, uncommon).',
        'What changes is how the particles are joined and moving, not the particles.',
        'Solid: fixed shape and volume. Liquid: fixed volume, container\'s shape. Gas: neither fixed.',
        'Melting (solid→liquid), evaporation (liquid→gas), condensation (gas→liquid), freezing (liquid→solid).',
        'Sublimation goes straight from solid to gas (dry ice).',
        'The changes happen at set temperatures: the melting and boiling points.',
        'During a change of state, the temperature stays constant.',
      ],
      ca: [
        'Tres estats principals: sòlid, líquid i gas (i el plasma, poc comú).',
        'El que canvia és la unió i el moviment de les partícules, no les partícules.',
        'Sòlid: forma i volum fixos. Líquid: volum fix, forma del recipient. Gas: cap fix.',
        'Fusió (sòlid→líquid), evaporació (líquid→gas), condensació (gas→líquid), solidificació (líquid→sòlid).',
        'La sublimació passa directament de sòlid a gas (el gel sec).',
        'Els canvis passen a temperatures fixes: la de fusió i la d\'ebullició.',
        'Durant el canvi d\'estat, la temperatura es manté constant.',
      ],
    },
  },

  'fuerzas': {
    metaTitle: {
      es: 'Las Fuerzas y las Leyes de Newton — resumen para estudiar',
      en: 'Forces and Newton\'s Laws — a study summary',
      ca: 'Les Forces i les Lleis de Newton — resum per estudiar',
    },
    metaDesc: {
      es: 'Qué es una fuerza, cómo se mide (newtons), la fuerza neta y las tres leyes de Newton, el peso y el rozamiento. Resumen claro y test con explicación.',
      en: 'What a force is, how it is measured (newtons), net force and Newton\'s three laws, weight and friction. Clear summary and explained test.',
      ca: 'Què és una força, com es mesura (newtons), la força neta i les tres lleis de Newton, el pes i la fricció. Resum clar i test amb explicació.',
    },
    resumen: {
      es: [
        'Una fuerza es todo lo que puede cambiar el movimiento de un objeto o deformarlo: empujar, tirar, la gravedad, el rozamiento. Las fuerzas se miden en newtons (N) y tienen dirección y sentido, por eso se representan con flechas. Cuando sobre un cuerpo actúan varias fuerzas, lo que importa es su suma: la fuerza neta o resultante.',
        'Isaac Newton resumió cómo funcionan en tres leyes. La primera, la inercia: un cuerpo sigue quieto o a velocidad constante mientras no actúe una fuerza neta. La segunda: cuanta más fuerza, más aceleración, y cuanta más masa, menos (F = m · a). La tercera, acción y reacción: si un cuerpo empuja a otro, el otro le empuja con la misma fuerza en sentido contrario. Dos fuerzas muy cotidianas son la gravedad, que nos atrae hacia la Tierra (el peso), y el rozamiento, que se opone al movimiento.',
      ],
      en: [
        'A force is anything that can change an object\'s motion or deform it: pushing, pulling, gravity, friction. Forces are measured in newtons (N) and have direction, which is why they are drawn as arrows. When several forces act on a body, what matters is their sum: the net or resultant force.',
        'Isaac Newton summed up how they work in three laws. The first, inertia: a body stays still or moves at a constant speed as long as no net force acts. The second: the more force, the more acceleration, and the more mass, the less (F = m · a). The third, action and reaction: if one body pushes another, the other pushes back with an equal and opposite force. Two everyday forces are gravity, which pulls us towards the Earth (weight), and friction, which opposes motion.',
      ],
      ca: [
        'Una força és tot allò que pot canviar el moviment d\'un objecte o deformar-lo: empènyer, estirar, la gravetat, la fricció. Les forces es mesuren en newtons (N) i tenen direcció i sentit, per això es representen amb fletxes. Quan sobre un cos actuen diverses forces, el que importa és la seva suma: la força neta o resultant.',
        'Isaac Newton va resumir com funcionen en tres lleis. La primera, la inèrcia: un cos segueix quiet o a velocitat constant mentre no actuï una força neta. La segona: com més força, més acceleració, i com més massa, menys (F = m · a). La tercera, acció i reacció: si un cos empeny un altre, l\'altre l\'empeny amb la mateixa força en sentit contrari. Dues forces molt quotidianes són la gravetat, que ens atrau cap a la Terra (el pes), i la fricció, que s\'oposa al moviment.',
      ],
    },
    puntosClave: {
      es: [
        'Una fuerza cambia el movimiento de un objeto o lo deforma.',
        'Se mide en newtons (N) y tiene dirección y sentido (se dibuja con flechas).',
        'La fuerza neta es la suma de todas las fuerzas que actúan sobre un cuerpo.',
        '1ª ley (inercia): sin fuerza neta, el movimiento no cambia.',
        '2ª ley: fuerza = masa × aceleración (F = m · a).',
        '3ª ley: a toda acción le corresponde una reacción igual y contraria.',
        'El peso es la fuerza de la gravedad; el rozamiento se opone al movimiento.',
      ],
      en: [
        'A force changes an object\'s motion or deforms it.',
        'It is measured in newtons (N) and has direction (drawn as arrows).',
        'The net force is the sum of all the forces acting on a body.',
        '1st law (inertia): with no net force, motion does not change.',
        '2nd law: force = mass × acceleration (F = m · a).',
        '3rd law: every action has an equal and opposite reaction.',
        'Weight is the force of gravity; friction opposes motion.',
      ],
      ca: [
        'Una força canvia el moviment d\'un objecte o el deforma.',
        'Es mesura en newtons (N) i té direcció i sentit (es dibuixa amb fletxes).',
        'La força neta és la suma de totes les forces que actuen sobre un cos.',
        '1a llei (inèrcia): sense força neta, el moviment no canvia.',
        '2a llei: força = massa × acceleració (F = m · a).',
        '3a llei: a tota acció li correspon una reacció igual i contrària.',
        'El pes és la força de la gravetat; la fricció s\'oposa al moviment.',
      ],
    },
  },

  'electricidad': {
    metaTitle: {
      es: 'La Electricidad y los Circuitos — resumen para estudiar',
      en: 'Electricity and Circuits — a study summary',
      ca: 'L\'Electricitat i els Circuits — resum per estudiar',
    },
    metaDesc: {
      es: 'Qué es la corriente eléctrica, las partes de un circuito, tensión, intensidad y resistencia, la ley de Ohm y los circuitos en serie y en paralelo. Resumen y test.',
      en: 'What electric current is, the parts of a circuit, voltage, current and resistance, Ohm\'s law and series and parallel circuits. Summary and test.',
      ca: 'Què és el corrent elèctric, les parts d\'un circuit, tensió, intensitat i resistència, la llei d\'Ohm i els circuits en sèrie i en paral·lel. Resum i test.',
    },
    resumen: {
      es: [
        'La electricidad es el movimiento de cargas, normalmente electrones, a través de un material. Para que circule una corriente hacen falta tres cosas: una fuente que la impulse (una pila), un camino cerrado por donde ir (los cables) y algún aparato que la aproveche (una bombilla). Si el circuito se abre, por ejemplo con un interruptor, la corriente se detiene.',
        'En un circuito, la tensión (voltios) es el empuje que da la pila, la intensidad (amperios) es la cantidad de corriente que pasa, y la resistencia (ohmios) es lo que dificulta el paso. La ley de Ohm los relaciona: V = I · R. Los componentes se pueden conectar en serie, uno detrás de otro en un solo camino, o en paralelo, cada uno en su propio camino. En serie, si uno falla se apagan todos; en paralelo, no.',
      ],
      en: [
        'Electricity is the movement of charges, usually electrons, through a material. For a current to flow you need three things: a source to push it (a battery), a closed path to travel along (the wires) and a device that uses it (a bulb). If the circuit opens, for example with a switch, the current stops.',
        'In a circuit, voltage (volts) is the push the battery gives, current (amperes) is how much charge flows, and resistance (ohms) is what hinders it. Ohm\'s law links them: V = I · R. Components can be connected in series, one after another on a single path, or in parallel, each on its own path. In series, if one fails they all go out; in parallel, they do not.',
      ],
      ca: [
        'L\'electricitat és el moviment de càrregues, normalment electrons, a través d\'un material. Perquè circuli un corrent calen tres coses: una font que l\'impulsi (una pila), un camí tancat per on anar (els cables) i algun aparell que l\'aprofiti (una bombeta). Si el circuit s\'obre, per exemple amb un interruptor, el corrent s\'atura.',
        'En un circuit, la tensió (volts) és l\'empenta que dona la pila, la intensitat (ampers) és la quantitat de corrent que passa, i la resistència (ohms) és el que dificulta el pas. La llei d\'Ohm els relaciona: V = I · R. Els components es poden connectar en sèrie, un darrere l\'altre en un sol camí, o en paral·lel, cadascun en el seu propi camí. En sèrie, si un falla s\'apaguen tots; en paral·lel, no.',
      ],
    },
    puntosClave: {
      es: [
        'La corriente eléctrica es el movimiento de cargas (electrones).',
        'Un circuito necesita fuente (pila), camino cerrado (cables) y receptor (bombilla).',
        'Tensión (V, voltios), intensidad (I, amperios) y resistencia (R, ohmios).',
        'Ley de Ohm: V = I × R.',
        'Los materiales pueden ser conductores (metales) o aislantes (plástico).',
        'En serie, todo va en un camino: si uno falla, se apagan todos.',
        'En paralelo, cada uno tiene su camino: el resto sigue si uno falla.',
      ],
      en: [
        'Electric current is the movement of charges (electrons).',
        'A circuit needs a source (battery), a closed path (wires) and a device (bulb).',
        'Voltage (V, volts), current (I, amperes) and resistance (R, ohms).',
        'Ohm\'s law: V = I × R.',
        'Materials can be conductors (metals) or insulators (plastic).',
        'In series, everything is on one path: if one fails, all go out.',
        'In parallel, each has its own path: the rest keep working if one fails.',
      ],
      ca: [
        'El corrent elèctric és el moviment de càrregues (electrons).',
        'Un circuit necessita font (pila), camí tancat (cables) i receptor (bombeta).',
        'Tensió (V, volts), intensitat (I, ampers) i resistència (R, ohms).',
        'Llei d\'Ohm: V = I × R.',
        'Els materials poden ser conductors (metalls) o aïllants (plàstic).',
        'En sèrie, tot va en un camí: si un falla, s\'apaguen tots.',
        'En paral·lel, cadascun té el seu camí: la resta segueix si un falla.',
      ],
    },
  },

  'seres-vivos': {
    metaTitle: {
      es: 'Los Seres Vivos: funciones vitales y los cinco reinos — resumen',
      en: 'Living Things: life processes and the five kingdoms — summary',
      ca: 'Els Éssers Vius: funcions vitals i els cinc regnes — resum',
    },
    metaDesc: {
      es: 'Qué es un ser vivo, las funciones vitales (nutrición, relación y reproducción) y la clasificación en cinco reinos y en vertebrados e invertebrados. Resumen y test.',
      en: 'What a living thing is, the life processes (nutrition, interaction and reproduction) and the classification into five kingdoms and vertebrates and invertebrates. Summary and test.',
      ca: 'Què és un ésser viu, les funcions vitals (nutrició, relació i reproducció) i la classificació en cinc regnes i en vertebrats i invertebrats. Resum i test.',
    },
    resumen: {
      es: [
        'Un ser vivo es todo aquello que nace, se alimenta, crece, se relaciona con el entorno, se reproduce y muere. Cumple las tres funciones vitales —nutrición, relación y reproducción— y está formado por células, y esa es la gran diferencia con la materia inerte, como una piedra o el agua.',
        'Para ordenar la enorme variedad de seres vivos se clasifican en cinco reinos: animales, plantas, hongos, protoctistas y moneras (las bacterias). Los animales, a su vez, se dividen en vertebrados —con columna: mamíferos, aves, reptiles, anfibios y peces— e invertebrados —sin columna: insectos, moluscos…—. Según cómo se alimentan, unos fabrican su propio alimento, como las plantas mediante la fotosíntesis, y otros lo toman del exterior, como los animales.',
      ],
      en: [
        'A living thing is anything that is born, feeds, grows, interacts with its surroundings, reproduces and dies. It carries out the three life processes —nutrition, interaction and reproduction— and is made of cells, which is the big difference from non-living matter, like a stone or water.',
        'To organise the huge variety of living things, they are classified into five kingdoms: animals, plants, fungi, protists and monerans (the bacteria). Animals in turn split into vertebrates —with a backbone: mammals, birds, reptiles, amphibians and fish— and invertebrates —without one: insects, molluscs…—. By how they feed, some make their own food, like plants through photosynthesis, and others take it from outside, like animals.',
      ],
      ca: [
        'Un ésser viu és tot allò que neix, s\'alimenta, creix, es relaciona amb l\'entorn, es reprodueix i mor. Compleix les tres funcions vitals —nutrició, relació i reproducció— i està format per cèl·lules, i aquesta és la gran diferència amb la matèria inerta, com una pedra o l\'aigua.',
        'Per ordenar l\'enorme varietat d\'éssers vius es classifiquen en cinc regnes: animals, plantes, fongs, protoctists i mònera (els bacteris). Els animals, al seu torn, es divideixen en vertebrats —amb columna: mamífers, aus, rèptils, amfibis i peixos— i invertebrats —sense columna: insectes, mol·luscos…—. Segons com s\'alimenten, uns fabriquen el seu propi aliment, com les plantes mitjançant la fotosíntesi, i altres el prenen de fora, com els animals.',
      ],
    },
    puntosClave: {
      es: [
        'Un ser vivo nace, se nutre, se relaciona, se reproduce y muere.',
        'Tres funciones vitales: nutrición, relación y reproducción.',
        'Todos están formados por células (a diferencia de la materia inerte).',
        'Cinco reinos: animales, plantas, hongos, protoctistas y moneras (bacterias).',
        'Vertebrados (mamíferos, aves, reptiles, anfibios, peces) e invertebrados.',
        'Las plantas fabrican su alimento (fotosíntesis); los animales lo toman de fuera.',
        'La reproducción puede ser sexual (dos progenitores) o asexual (uno).',
      ],
      en: [
        'A living thing is born, feeds, interacts, reproduces and dies.',
        'Three life processes: nutrition, interaction and reproduction.',
        'They are all made of cells (unlike non-living matter).',
        'Five kingdoms: animals, plants, fungi, protists and monerans (bacteria).',
        'Vertebrates (mammals, birds, reptiles, amphibians, fish) and invertebrates.',
        'Plants make their own food (photosynthesis); animals take it from outside.',
        'Reproduction can be sexual (two parents) or asexual (one).',
      ],
      ca: [
        'Un ésser viu neix, es nodreix, es relaciona, es reprodueix i mor.',
        'Tres funcions vitals: nutrició, relació i reproducció.',
        'Tots estan formats per cèl·lules (a diferència de la matèria inerta).',
        'Cinc regnes: animals, plantes, fongs, protoctists i mònera (bacteris).',
        'Vertebrats (mamífers, aus, rèptils, amfibis, peixos) i invertebrats.',
        'Les plantes fabriquen el seu aliment (fotosíntesi); els animals el prenen de fora.',
        'La reproducció pot ser sexual (dos progenitors) o asexual (un).',
      ],
    },
  },

  'ecosistemas': {
    metaTitle: {
      es: 'Los Ecosistemas: cadena alimentaria y relaciones — resumen',
      en: 'Ecosystems: food chain and relationships — a study summary',
      ca: 'Els Ecosistemes: cadena alimentària i relacions — resum',
    },
    metaDesc: {
      es: 'Qué es un ecosistema (biocenosis y biotopo), la cadena alimentaria con productores, consumidores y descomponedores, y las relaciones entre especies. Resumen y test.',
      en: 'What an ecosystem is (biocenosis and biotope), the food chain with producers, consumers and decomposers, and the relationships between species. Summary and test.',
      ca: 'Què és un ecosistema (biocenosi i biòtop), la cadena alimentària amb productors, consumidors i descomponedors, i les relacions entre espècies. Resum i test.',
    },
    resumen: {
      es: [
        'Un ecosistema es el conjunto formado por los seres vivos de un lugar (la biocenosis) y el medio físico en el que viven (el biotopo: el suelo, el agua, el aire, la temperatura), junto con todas las relaciones entre ellos. Un bosque, una charca o un arrecife de coral son ecosistemas.',
        'La energía entra por las plantas, que captan la luz del Sol, y pasa de unos seres a otros formando cadenas alimentarias. En ellas hay productores (las plantas), consumidores (los animales: herbívoros y carnívoros) y descomponedores (hongos y bacterias, que reciclan la materia). Cuando varias cadenas se cruzan forman una red trófica. Los seres vivos, además, se relacionan entre sí: compiten por los recursos, unos son presa de otros o se ayudan (simbiosis).',
      ],
      en: [
        'An ecosystem is the set made up of the living things of a place (the biocenosis) and the physical environment they live in (the biotope: the soil, the water, the air, the temperature), together with all the relationships between them. A forest, a pond or a coral reef are ecosystems.',
        'Energy enters through plants, which capture the Sun\'s light, and passes from one organism to another forming food chains. In them there are producers (plants), consumers (animals: herbivores and carnivores) and decomposers (fungi and bacteria, which recycle matter). When several chains cross they form a food web. Living things also relate to each other: they compete for resources, some prey on others, or they help each other (symbiosis).',
      ],
      ca: [
        'Un ecosistema és el conjunt format pels éssers vius d\'un lloc (la biocenosi) i el medi físic on viuen (el biòtop: el sòl, l\'aigua, l\'aire, la temperatura), juntament amb totes les relacions entre ells. Un bosc, un bassal o un escull de corall són ecosistemes.',
        'L\'energia entra per les plantes, que capten la llum del Sol, i passa d\'uns éssers a altres formant cadenes alimentàries. Hi ha productors (les plantes), consumidors (els animals: herbívors i carnívors) i descomponedors (fongs i bacteris, que reciclen la matèria). Quan diverses cadenes es creuen formen una xarxa tròfica. Els éssers vius, a més, es relacionen entre si: competeixen pels recursos, uns són presa d\'altres o s\'ajuden (simbiosi).',
      ],
    },
    puntosClave: {
      es: [
        'Ecosistema = seres vivos (biocenosis) + medio físico (biotopo) + sus relaciones.',
        'La energía entra por las plantas, que captan la luz del Sol.',
        'Cadena alimentaria: productores → consumidores → descomponedores.',
        'Productores (plantas), consumidores (herbívoros y carnívoros), descomponedores (hongos, bacterias).',
        'Varias cadenas cruzadas forman una red trófica.',
        'Relaciones entre especies: competencia, depredación y simbiosis.',
        'Los descomponedores reciclan la materia y cierran el ciclo.',
      ],
      en: [
        'Ecosystem = living things (biocenosis) + physical environment (biotope) + their relationships.',
        'Energy enters through plants, which capture the Sun\'s light.',
        'Food chain: producers → consumers → decomposers.',
        'Producers (plants), consumers (herbivores and carnivores), decomposers (fungi, bacteria).',
        'Several crossing chains form a food web.',
        'Relationships between species: competition, predation and symbiosis.',
        'Decomposers recycle matter and close the cycle.',
      ],
      ca: [
        'Ecosistema = éssers vius (biocenosi) + medi físic (biòtop) + les seves relacions.',
        'L\'energia entra per les plantes, que capten la llum del Sol.',
        'Cadena alimentària: productors → consumidors → descomponedors.',
        'Productors (plantes), consumidors (herbívors i carnívors), descomponedors (fongs, bacteris).',
        'Diverses cadenes creuades formen una xarxa tròfica.',
        'Relacions entre espècies: competència, depredació i simbiosi.',
        'Els descomponedors reciclen la matèria i tanquen el cicle.',
      ],
    },
  },

  'genetica': {
    metaTitle: {
      es: 'La Genética: ADN, genes y las leyes de Mendel — resumen',
      en: 'Genetics: DNA, genes and Mendel\'s laws — a study summary',
      ca: 'La Genètica: ADN, gens i les lleis de Mendel — resum',
    },
    metaDesc: {
      es: 'Cómo se heredan los caracteres: el ADN, los genes y los cromosomas, los alelos dominantes y recesivos, las leyes de Mendel y el cuadro de Punnett. Resumen y test.',
      en: 'How traits are inherited: DNA, genes and chromosomes, dominant and recessive alleles, Mendel\'s laws and the Punnett square. Summary and test.',
      ca: 'Com s\'hereten els caràcters: l\'ADN, els gens i els cromosomes, els al·lels dominants i recessius, les lleis de Mendel i el quadre de Punnett. Resum i test.',
    },
    resumen: {
      es: [
        'La genética estudia cómo se transmiten los caracteres de padres a hijos: el color de los ojos, la forma de una semilla… La información está en el ADN, una molécula que se encuentra en el núcleo de las células y que se organiza en cromosomas. Cada trozo de ADN que lleva la instrucción de un carácter es un gen.',
        'Cada carácter viene de dos versiones del gen, los alelos: una del padre y otra de la madre. Un alelo puede ser dominante, que se manifiesta aunque haya solo uno, o recesivo, que solo se ve si están los dos. Gregor Mendel descubrió estas reglas en el siglo XIX cruzando guisantes, y hoy se predicen los resultados con el cuadro de Punnett. Un cambio en el ADN se llama mutación, y algunas se heredan.',
      ],
      en: [
        'Genetics studies how traits pass from parents to children: eye colour, the shape of a seed… The information is in DNA, a molecule found in the nucleus of cells and organised into chromosomes. Each piece of DNA that carries the instruction for a trait is a gene.',
        'Each trait comes from two versions of the gene, the alleles: one from the father and one from the mother. An allele can be dominant, showing up even with just one copy, or recessive, seen only when both are present. Gregor Mendel discovered these rules in the 19th century by crossing pea plants, and today results are predicted with the Punnett square. A change in the DNA is called a mutation, and some are inherited.',
      ],
      ca: [
        'La genètica estudia com es transmeten els caràcters de pares a fills: el color dels ulls, la forma d\'una llavor… La informació és a l\'ADN, una molècula que es troba al nucli de les cèl·lules i que s\'organitza en cromosomes. Cada tros d\'ADN que porta la instrucció d\'un caràcter és un gen.',
        'Cada caràcter ve de dues versions del gen, els al·lels: una del pare i una altra de la mare. Un al·lel pot ser dominant, que es manifesta encara que n\'hi hagi només un, o recessiu, que només es veu si hi són tots dos. Gregor Mendel va descobrir aquestes regles al segle XIX creuant pèsols, i avui es prediuen els resultats amb el quadre de Punnett. Un canvi a l\'ADN s\'anomena mutació, i algunes s\'hereten.',
      ],
    },
    puntosClave: {
      es: [
        'La genética estudia cómo se heredan los caracteres de padres a hijos.',
        'La información está en el ADN, dentro del núcleo, organizado en cromosomas.',
        'Un gen es el trozo de ADN con la instrucción de un carácter.',
        'Cada carácter tiene dos alelos, uno de cada progenitor.',
        'Alelo dominante (se manifiesta con uno) frente a recesivo (necesita los dos).',
        'Mendel formuló las leyes de la herencia cruzando guisantes.',
        'El cuadro de Punnett predice las proporciones de la descendencia.',
      ],
      en: [
        'Genetics studies how traits are inherited from parents to children.',
        'The information is in DNA, inside the nucleus, organised into chromosomes.',
        'A gene is the piece of DNA with the instruction for a trait.',
        'Each trait has two alleles, one from each parent.',
        'Dominant allele (shows with one) versus recessive (needs both).',
        'Mendel set out the laws of inheritance by crossing pea plants.',
        'The Punnett square predicts the ratios of the offspring.',
      ],
      ca: [
        'La genètica estudia com s\'hereten els caràcters de pares a fills.',
        'La informació és a l\'ADN, dins el nucli, organitzat en cromosomes.',
        'Un gen és el tros d\'ADN amb la instrucció d\'un caràcter.',
        'Cada caràcter té dos al·lels, un de cada progenitor.',
        'Al·lel dominant (es manifesta amb un) davant de recessiu (necessita tots dos).',
        'Mendel va formular les lleis de l\'herència creuant pèsols.',
        'El quadre de Punnett prediu les proporcions de la descendència.',
      ],
    },
  },

  'atomos-moleculas': {
    metaTitle: {
      es: 'Átomos y Moléculas: protones, electrones y enlaces — resumen',
      en: 'Atoms and Molecules: protons, electrons and bonds — summary',
      ca: 'Àtoms i Molècules: protons, electrons i enllaços — resum',
    },
    metaDesc: {
      es: 'Qué es un átomo, sus partículas (protones, neutrones y electrones), el número atómico y cómo se unen los átomos para formar moléculas. Resumen y test.',
      en: 'What an atom is, its particles (protons, neutrons and electrons), the atomic number and how atoms join to form molecules. Study summary and test.',
      ca: 'Què és un àtom, les seves partícules (protons, neutrons i electrons), el nombre atòmic i com s\'uneixen els àtoms per formar molècules. Resum i test.',
    },
    resumen: {
      es: [
        'Toda la materia está hecha de átomos, las piezas más pequeñas de cada elemento químico. Un átomo tiene un núcleo, con protones (carga positiva) y neutrones (sin carga), y a su alrededor giran los electrones (carga negativa). El número de protones, llamado número atómico, es lo que decide de qué elemento se trata: 1 protón es hidrógeno, 6 es carbono y 8 es oxígeno.',
        'Los átomos casi nunca están solos: se unen entre sí formando moléculas. Una molécula puede ser de un solo elemento, como el oxígeno que respiramos (O₂, dos átomos de oxígeno), o de varios, como el agua (H₂O, dos de hidrógeno y uno de oxígeno). Cuando muchos átomos o moléculas iguales se juntan forman una sustancia pura; si se mezclan de distintos tipos, una mezcla.',
      ],
      en: [
        'All matter is made of atoms, the smallest pieces of each chemical element. An atom has a nucleus, with protons (positive charge) and neutrons (no charge), and electrons (negative charge) around it. The number of protons, called the atomic number, is what decides which element it is: 1 proton is hydrogen, 6 is carbon and 8 is oxygen.',
        'Atoms are almost never alone: they join together forming molecules. A molecule can be of a single element, like the oxygen we breathe (O₂, two oxygen atoms), or of several, like water (H₂O, two hydrogen and one oxygen). When many identical atoms or molecules gather they form a pure substance; if different types mix, a mixture.',
      ],
      ca: [
        'Tota la matèria està feta d\'àtoms, les peces més petites de cada element químic. Un àtom té un nucli, amb protons (càrrega positiva) i neutrons (sense càrrega), i al seu voltant giren els electrons (càrrega negativa). El nombre de protons, anomenat nombre atòmic, és el que decideix de quin element es tracta: 1 protó és hidrogen, 6 és carboni i 8 és oxigen.',
        'Els àtoms gairebé mai estan sols: s\'uneixen entre si formant molècules. Una molècula pot ser d\'un sol element, com l\'oxigen que respirem (O₂, dos àtoms d\'oxigen), o de diversos, com l\'aigua (H₂O, dos d\'hidrogen i un d\'oxigen). Quan molts àtoms o molècules iguals s\'ajunten formen una substància pura; si es barregen de tipus diferents, una mescla.',
      ],
    },
    puntosClave: {
      es: [
        'Los átomos son las piezas más pequeñas de cada elemento.',
        'El átomo tiene núcleo (protones + neutrones) y electrones girando alrededor.',
        'Protones (+), electrones (−) y neutrones (sin carga).',
        'El número atómico (número de protones) determina el elemento.',
        'Los átomos se unen formando moléculas.',
        'Ejemplos: O₂ (oxígeno), H₂O (agua), CO₂ (dióxido de carbono).',
        'Un elemento tiene un solo tipo de átomo; un compuesto, varios unidos.',
      ],
      en: [
        'Atoms are the smallest pieces of each element.',
        'The atom has a nucleus (protons + neutrons) and electrons orbiting around it.',
        'Protons (+), electrons (−) and neutrons (no charge).',
        'The atomic number (number of protons) determines the element.',
        'Atoms join together forming molecules.',
        'Examples: O₂ (oxygen), H₂O (water), CO₂ (carbon dioxide).',
        'An element has one kind of atom; a compound, several joined.',
      ],
      ca: [
        'Els àtoms són les peces més petites de cada element.',
        'L\'àtom té nucli (protons + neutrons) i electrons girant al voltant.',
        'Protons (+), electrons (−) i neutrons (sense càrrega).',
        'El nombre atòmic (nombre de protons) determina l\'element.',
        'Els àtoms s\'uneixen formant molècules.',
        'Exemples: O₂ (oxigen), H₂O (aigua), CO₂ (diòxid de carboni).',
        'Un element té un sol tipus d\'àtom; un compost, diversos units.',
      ],
    },
  },

  'acidos-bases': {
    metaTitle: {
      es: 'Ácidos y Bases: la escala de pH y la neutralización — resumen',
      en: 'Acids and Bases: the pH scale and neutralisation — summary',
      ca: 'Àcids i Bases: l\'escala de pH i la neutralització — resum',
    },
    metaDesc: {
      es: 'Qué son los ácidos y las bases, la escala de pH del 0 al 14, los indicadores como el papel de tornasol y la neutralización. Resumen para estudiar y test.',
      en: 'What acids and bases are, the pH scale from 0 to 14, indicators like litmus paper and neutralisation. Study summary and test.',
      ca: 'Què són els àcids i les bases, l\'escala de pH del 0 al 14, els indicadors com el paper de tornassol i la neutralització. Resum per estudiar i test.',
    },
    resumen: {
      es: [
        'Muchas sustancias que usamos a diario son ácidos o bases. Los ácidos, como el zumo de limón o el vinagre, tienen sabor agrio. Las bases, como el jabón o el bicarbonato, son resbaladizas y de sabor amargo. Para saber cómo de ácida o básica es una sustancia se usa la escala de pH, que va del 0 al 14.',
        'En la escala de pH, el 7 es neutro (el agua pura). Por debajo de 7 la sustancia es ácida, y cuanto más baja, más fuerte; por encima de 7 es básica. Para medir el pH se usan indicadores, que cambian de color, como el papel de tornasol. Cuando se mezcla un ácido con una base en la cantidad justa, se neutralizan: el resultado es agua y una sal, y deja de ser corrosivo.',
      ],
      en: [
        'Many substances we use every day are acids or bases. Acids, like lemon juice or vinegar, taste sour. Bases, like soap or baking soda, feel slippery and taste bitter. To tell how acidic or basic a substance is, we use the pH scale, which runs from 0 to 14.',
        'On the pH scale, 7 is neutral (pure water). Below 7 the substance is acidic, and the lower it is, the stronger; above 7 it is basic. To measure pH we use indicators, which change colour, like litmus paper. When an acid is mixed with a base in the right amount, they neutralise: the result is water and a salt, and it stops being corrosive.',
      ],
      ca: [
        'Moltes substàncies que fem servir cada dia són àcids o bases. Els àcids, com el suc de llimona o el vinagre, tenen gust agre. Les bases, com el sabó o el bicarbonat, són relliscoses i de gust amarg. Per saber com d\'àcida o bàsica és una substància es fa servir l\'escala de pH, que va del 0 al 14.',
        'A l\'escala de pH, el 7 és neutre (l\'aigua pura). Per sota de 7 la substància és àcida, i com més baixa, més forta; per sobre de 7 és bàsica. Per mesurar el pH es fan servir indicadors, que canvien de color, com el paper de tornassol. Quan es barreja un àcid amb una base en la quantitat justa, es neutralitzen: el resultat és aigua i una sal, i deixa de ser corrosiu.',
      ],
    },
    puntosClave: {
      es: [
        'Los ácidos tienen sabor agrio (limón, vinagre); las bases, amargo y son resbaladizas (jabón).',
        'La escala de pH mide la acidez, del 0 al 14.',
        'pH 7 = neutro (agua); menos de 7 = ácido; más de 7 = básico.',
        'Cuanto más lejos del 7, más fuerte es el ácido o la base.',
        'Los indicadores (papel de tornasol) cambian de color según el pH.',
        'Un ácido y una base se neutralizan y forman agua y una sal.',
        'Ácidos y bases fuertes son corrosivos: hay que manejarlos con cuidado.',
      ],
      en: [
        'Acids taste sour (lemon, vinegar); bases taste bitter and feel slippery (soap).',
        'The pH scale measures acidity, from 0 to 14.',
        'pH 7 = neutral (water); below 7 = acid; above 7 = base.',
        'The further from 7, the stronger the acid or base.',
        'Indicators (litmus paper) change colour depending on the pH.',
        'An acid and a base neutralise and form water and a salt.',
        'Strong acids and bases are corrosive: handle them with care.',
      ],
      ca: [
        'Els àcids tenen gust agre (llimona, vinagre); les bases, amarg i són relliscoses (sabó).',
        'L\'escala de pH mesura l\'acidesa, del 0 al 14.',
        'pH 7 = neutre (aigua); menys de 7 = àcid; més de 7 = bàsic.',
        'Com més lluny del 7, més forta és l\'àcid o la base.',
        'Els indicadors (paper de tornassol) canvien de color segons el pH.',
        'Un àcid i una base es neutralitzen i formen aigua i una sal.',
        'Àcids i bases forts són corrosius: cal manejar-los amb cura.',
      ],
    },
  },

  'nutricion': {
    metaTitle: {
      es: 'La Nutrición: nutrientes y aparatos que intervienen — resumen',
      en: 'Nutrition: nutrients and the systems involved — a summary',
      ca: 'La Nutrició: nutrients i aparells que hi intervenen — resum',
    },
    metaDesc: {
      es: 'Qué es la nutrición, los nutrientes (hidratos, grasas, proteínas, vitaminas), los aparatos que intervienen y qué es una dieta sana. Resumen y test.',
      en: 'What nutrition is, the nutrients (carbohydrates, fats, proteins, vitamins), the systems involved and what a healthy diet is. Summary and test.',
      ca: 'Què és la nutrició, els nutrients (hidrats, greixos, proteïnes, vitamines), els aparells que hi intervenen i què és una dieta sana. Resum i test.',
    },
    resumen: {
      es: [
        'La nutrición es el conjunto de procesos por los que el cuerpo obtiene de los alimentos la energía y los materiales que necesita para vivir. Los alimentos aportan nutrientes: los hidratos de carbono y las grasas dan energía; las proteínas construyen y reparan el cuerpo; y las vitaminas y los minerales, en pequeñas cantidades, hacen que todo funcione. El agua y la fibra también son imprescindibles.',
        'En la nutrición humana trabajan juntos varios aparatos. El digestivo transforma la comida en nutrientes y los absorbe; el respiratorio aporta el oxígeno; el circulatorio los reparte por la sangre a todas las células; y el excretor elimina los desechos. Una dieta sana es variada y equilibrada, como la dieta mediterránea, con más fruta, verdura y legumbres que dulces y grasas.',
      ],
      en: [
        'Nutrition is the set of processes by which the body gets from food the energy and materials it needs to live. Food provides nutrients: carbohydrates and fats give energy; proteins build and repair the body; and vitamins and minerals, in small amounts, keep everything working. Water and fibre are essential too.',
        'In human nutrition several systems work together. The digestive system turns food into nutrients and absorbs them; the respiratory system supplies oxygen; the circulatory system delivers them through the blood to every cell; and the excretory system removes waste. A healthy diet is varied and balanced, like the Mediterranean diet, with more fruit, vegetables and pulses than sweets and fats.',
      ],
      ca: [
        'La nutrició és el conjunt de processos pels quals el cos obté dels aliments l\'energia i els materials que necessita per viure. Els aliments aporten nutrients: els hidrats de carboni i els greixos donen energia; les proteïnes construeixen i reparen el cos; i les vitamines i els minerals, en petites quantitats, fan que tot funcioni. L\'aigua i la fibra també són imprescindibles.',
        'En la nutrició humana treballen junts diversos aparells. El digestiu transforma el menjar en nutrients i els absorbeix; el respiratori aporta l\'oxigen; el circulatori els reparteix per la sang a totes les cèl·lules; i l\'excretor elimina els residus. Una dieta sana és variada i equilibrada, com la dieta mediterrània, amb més fruita, verdura i llegums que dolços i greixos.',
      ],
    },
    puntosClave: {
      es: [
        'La nutrición aporta energía y materiales a partir de los alimentos.',
        'Hidratos de carbono y grasas: energía. Proteínas: construir y reparar.',
        'Vitaminas y minerales: en poca cantidad, pero imprescindibles.',
        'El agua y la fibra también son necesarias.',
        'Colaboran los aparatos digestivo, respiratorio, circulatorio y excretor.',
        'El digestivo transforma y absorbe; el circulatorio reparte.',
        'Una dieta sana es variada y equilibrada (dieta mediterránea).',
      ],
      en: [
        'Nutrition provides energy and materials from food.',
        'Carbohydrates and fats: energy. Proteins: build and repair.',
        'Vitamins and minerals: in small amounts, but essential.',
        'Water and fibre are needed too.',
        'The digestive, respiratory, circulatory and excretory systems work together.',
        'The digestive system transforms and absorbs; the circulatory delivers.',
        'A healthy diet is varied and balanced (the Mediterranean diet).',
      ],
      ca: [
        'La nutrició aporta energia i materials a partir dels aliments.',
        'Hidrats de carboni i greixos: energia. Proteïnes: construir i reparar.',
        'Vitamines i minerals: en poca quantitat, però imprescindibles.',
        'L\'aigua i la fibra també són necessàries.',
        'Col·laboren els aparells digestiu, respiratori, circulatori i excretor.',
        'El digestiu transforma i absorbeix; el circulatori reparteix.',
        'Una dieta sana és variada i equilibrada (dieta mediterrània).',
      ],
    },
  },

  'evolucion': {
    metaTitle: {
      es: 'La Evolución: Darwin y la selección natural — resumen',
      en: 'Evolution: Darwin and natural selection — a study summary',
      ca: 'L\'Evolució: Darwin i la selecció natural — resum',
    },
    metaDesc: {
      es: 'Qué es la evolución, los antepasados comunes, la selección natural de Darwin, los pinzones de Galápagos, Lamarck y las pruebas fósiles. Resumen y test.',
      en: 'What evolution is, common ancestors, Darwin\'s natural selection, the Galápagos finches, Lamarck and fossil evidence. Study summary and test.',
      ca: 'Què és l\'evolució, els avantpassats comuns, la selecció natural de Darwin, els pinsans de Galápagos, Lamarck i les proves fòssils. Resum i test.',
    },
    resumen: {
      es: [
        'La evolución explica cómo los seres vivos han ido cambiando a lo largo de millones de años y por qué hay tanta variedad de especies. Todas descienden de antepasados comunes: los seres vivos de hoy no aparecieron tal cual, sino que proceden de otros más antiguos que se fueron transformando poco a poco.',
        'Charles Darwin propuso el mecanismo: la selección natural. Dentro de una especie los individuos son algo distintos entre sí; los que tienen características que les ayudan a sobrevivir en su ambiente viven más y dejan más descendencia, y esas características se van haciendo comunes. El ejemplo clásico son los pinzones de las Galápagos, con picos distintos según lo que comen. Antes, Lamarck había dado una explicación diferente que resultó incorrecta. Las pruebas de la evolución son los fósiles y los parecidos entre especies.',
      ],
      en: [
        'Evolution explains how living things have changed over millions of years and why there is such a variety of species. They all descend from common ancestors: today\'s living things did not appear as they are now, but come from older ones that gradually transformed.',
        'Charles Darwin proposed the mechanism: natural selection. Within a species individuals are slightly different from each other; those with features that help them survive in their environment live longer and leave more offspring, and those features become common. The classic example is the Galápagos finches, with different beaks depending on what they eat. Earlier, Lamarck had given a different explanation that turned out to be wrong. The evidence for evolution is fossils and the similarities between species.',
      ],
      ca: [
        'L\'evolució explica com els éssers vius han anat canviant al llarg de milions d\'anys i per què hi ha tanta varietat d\'espècies. Totes descendeixen d\'avantpassats comuns: els éssers vius d\'avui no van aparèixer tal com són, sinó que procedeixen d\'altres més antics que es van anar transformant a poc a poc.',
        'Charles Darwin va proposar el mecanisme: la selecció natural. Dins d\'una espècie els individus són una mica diferents entre si; els que tenen característiques que els ajuden a sobreviure en el seu ambient viuen més i deixen més descendència, i aquestes característiques es van fent comunes. L\'exemple clàssic són els pinsans de les Galápagos, amb becs diferents segons el que mengen. Abans, Lamarck havia donat una explicació diferent que va resultar incorrecta. Les proves de l\'evolució són els fòssils i les semblances entre espècies.',
      ],
    },
    puntosClave: {
      es: [
        'La evolución es el cambio de los seres vivos a lo largo de millones de años.',
        'Todas las especies descienden de antepasados comunes.',
        'Darwin propuso la selección natural como mecanismo.',
        'Sobreviven y se reproducen más los mejor adaptados a su ambiente.',
        'Los pinzones de las Galápagos son el ejemplo clásico.',
        'Lamarck dio antes una explicación distinta, que resultó incorrecta.',
        'Los fósiles son una de las pruebas de la evolución.',
      ],
      en: [
        'Evolution is the change in living things over millions of years.',
        'All species descend from common ancestors.',
        'Darwin proposed natural selection as the mechanism.',
        'Those best adapted to their environment survive and reproduce more.',
        'The Galápagos finches are the classic example.',
        'Lamarck earlier gave a different explanation, which proved wrong.',
        'Fossils are one of the pieces of evidence for evolution.',
      ],
      ca: [
        'L\'evolució és el canvi dels éssers vius al llarg de milions d\'anys.',
        'Totes les espècies descendeixen d\'avantpassats comuns.',
        'Darwin va proposar la selecció natural com a mecanisme.',
        'Sobreviuen i es reprodueixen més els més ben adaptats al seu ambient.',
        'Els pinsans de les Galápagos són l\'exemple clàssic.',
        'Lamarck va donar abans una explicació diferent, que va resultar incorrecta.',
        'Els fòssils són una de les proves de l\'evolució.',
      ],
    },
  },

  'rocas-minerales': {
    metaTitle: {
      es: 'Rocas y Minerales: los tres tipos de rocas — resumen',
      en: 'Rocks and Minerals: the three types of rock — a summary',
      ca: 'Roques i Minerals: els tres tipus de roques — resum',
    },
    metaDesc: {
      es: 'La diferencia entre roca y mineral y los tres tipos de rocas —ígneas, sedimentarias y metamórficas— y cómo se forman. Resumen para estudiar y test.',
      en: 'The difference between a rock and a mineral and the three types of rock —igneous, sedimentary and metamorphic— and how they form. Summary and test.',
      ca: 'La diferència entre roca i mineral i els tres tipus de roques —ígnies, sedimentàries i metamòrfiques— i com es formen. Resum per estudiar i test.',
    },
    resumen: {
      es: [
        'La parte sólida de la Tierra está hecha de rocas, y las rocas están formadas por minerales. Un mineral es una sustancia natural, sólida y con una composición fija, como el cuarzo, el yeso o la sal; una roca es una mezcla de uno o varios minerales, como el granito o la caliza.',
        'Según cómo se han formado, hay tres grandes tipos de rocas. Las magmáticas o ígneas se forman al enfriarse el magma (el granito, el basalto). Las sedimentarias se forman por acumulación de restos que se compactan a lo largo del tiempo (la arenisca, la caliza). Y las metamórficas se forman cuando otra roca cambia por el calor y la presión en el interior de la Tierra (el mármol, la pizarra). Con el tiempo, unas rocas se transforman en otras: es el ciclo de las rocas.',
      ],
      en: [
        'The solid part of the Earth is made of rocks, and rocks are made of minerals. A mineral is a natural, solid substance with a fixed composition, like quartz, gypsum or salt; a rock is a mixture of one or several minerals, like granite or limestone.',
        'By how they form, there are three main types of rock. Igneous rocks form when magma cools (granite, basalt). Sedimentary rocks form by the build-up of debris that compacts over time (sandstone, limestone). And metamorphic rocks form when another rock changes through heat and pressure inside the Earth (marble, slate). Over time, some rocks turn into others: this is the rock cycle.',
      ],
      ca: [
        'La part sòlida de la Terra està feta de roques, i les roques estan formades per minerals. Un mineral és una substància natural, sòlida i amb una composició fixa, com el quars, el guix o la sal; una roca és una mescla d\'un o diversos minerals, com el granit o la calcària.',
        'Segons com s\'han format, hi ha tres grans tipus de roques. Les magmàtiques o ígnies es formen en refredar-se el magma (el granit, el basalt). Les sedimentàries es formen per acumulació de restes que es compacten al llarg del temps (el gres, la calcària). I les metamòrfiques es formen quan una altra roca canvia pel calor i la pressió a l\'interior de la Terra (el marbre, la pissarra). Amb el temps, unes roques es transformen en altres: és el cicle de les roques.',
      ],
    },
    puntosClave: {
      es: [
        'Las rocas forman la parte sólida de la Tierra; están hechas de minerales.',
        'Un mineral es natural, sólido y de composición fija (cuarzo, sal, yeso).',
        'Una roca es una mezcla de uno o varios minerales (granito, caliza).',
        'Ígneas o magmáticas: al enfriarse el magma (granito, basalto).',
        'Sedimentarias: por acumulación y compactación de restos (arenisca, caliza).',
        'Metamórficas: por calor y presión (mármol, pizarra).',
        'Las rocas se transforman unas en otras: el ciclo de las rocas.',
      ],
      en: [
        'Rocks form the solid part of the Earth; they are made of minerals.',
        'A mineral is natural, solid and of fixed composition (quartz, salt, gypsum).',
        'A rock is a mixture of one or several minerals (granite, limestone).',
        'Igneous: form when magma cools (granite, basalt).',
        'Sedimentary: by build-up and compaction of debris (sandstone, limestone).',
        'Metamorphic: through heat and pressure (marble, slate).',
        'Rocks turn into one another: the rock cycle.',
      ],
      ca: [
        'Les roques formen la part sòlida de la Terra; estan fetes de minerals.',
        'Un mineral és natural, sòlid i de composició fixa (quars, sal, guix).',
        'Una roca és una mescla d\'un o diversos minerals (granit, calcària).',
        'Ígnies o magmàtiques: en refredar-se el magma (granit, basalt).',
        'Sedimentàries: per acumulació i compactació de restes (gres, calcària).',
        'Metamòrfiques: per calor i pressió (marbre, pissarra).',
        'Les roques es transformen unes en altres: el cicle de les roques.',
      ],
    },
  },

  'placas-tectonicas': {
    metaTitle: {
      es: 'Las Placas Tectónicas: capas de la Tierra y terremotos — resumen',
      en: 'Plate Tectonics: Earth\'s layers and earthquakes — a summary',
      ca: 'Les Plaques Tectòniques: capes de la Terra i terratrèmols — resum',
    },
    metaDesc: {
      es: 'Las capas de la Tierra, las placas tectónicas y su movimiento, y por qué en sus bordes hay montañas, volcanes y terremotos. Resumen y test.',
      en: 'The layers of the Earth, the tectonic plates and their movement, and why their edges have mountains, volcanoes and earthquakes. Summary and test.',
      ca: 'Les capes de la Terra, les plaques tectòniques i el seu moviment, i per què als seus límits hi ha muntanyes, volcans i terratrèmols. Resum i test.',
    },
    resumen: {
      es: [
        'La Tierra tiene tres capas principales: la corteza, la fina capa sólida de fuera; el manto, mucho más grueso y en parte fundido; y el núcleo, en el centro, muy caliente y de metal. La corteza no es una pieza entera: está partida en grandes trozos llamados placas tectónicas, que encajan como un puzle.',
        'Esas placas se mueven muy despacio, unos centímetros al año, sobre el manto. En sus bordes es donde pasa casi todo: cuando dos placas chocan se levantan montañas, cuando se separan sale magma y se crea suelo nuevo, y cuando rozan se producen terremotos. Los volcanes y los terremotos se concentran, por eso, en los bordes de las placas. Hace millones de años los continentes estaban unidos en uno solo, Pangea, y se han ido separando: es la deriva continental.',
      ],
      en: [
        'The Earth has three main layers: the crust, the thin solid layer on the outside; the mantle, much thicker and partly molten; and the core, at the centre, very hot and metallic. The crust is not a single piece: it is broken into large pieces called tectonic plates, which fit together like a jigsaw.',
        'These plates move very slowly, a few centimetres a year, over the mantle. Their edges are where almost everything happens: when two plates collide, mountains rise; when they pull apart, magma comes out and new ground is created; and when they rub past each other, earthquakes occur. Volcanoes and earthquakes therefore cluster at plate edges. Millions of years ago the continents were joined in a single one, Pangaea, and have been drifting apart: this is continental drift.',
      ],
      ca: [
        'La Terra té tres capes principals: l\'escorça, la fina capa sòlida de fora; el mantell, molt més gruixut i en part fos; i el nucli, al centre, molt calent i de metall. L\'escorça no és una peça sencera: està partida en grans trossos anomenats plaques tectòniques, que encaixen com un trencaclosques.',
        'Aquestes plaques es mouen molt a poc a poc, uns centímetres l\'any, sobre el mantell. Als seus límits és on passa gairebé tot: quan dues plaques xoquen s\'aixequen muntanyes, quan se separen surt magma i es crea sòl nou, i quan freguen es produeixen terratrèmols. Els volcans i els terratrèmols es concentren, per això, als límits de les plaques. Fa milions d\'anys els continents estaven units en un de sol, Pangea, i s\'han anat separant: és la deriva continental.',
      ],
    },
    puntosClave: {
      es: [
        'La Tierra tiene tres capas: corteza, manto y núcleo.',
        'La corteza está partida en placas tectónicas que encajan como un puzle.',
        'Las placas se mueven unos centímetros al año sobre el manto.',
        'Al chocar dos placas se forman montañas.',
        'Al separarse sale magma y se crea corteza nueva.',
        'Los terremotos y volcanes se concentran en los bordes de las placas.',
        'Los continentes estuvieron unidos (Pangea): deriva continental.',
      ],
      en: [
        'The Earth has three layers: crust, mantle and core.',
        'The crust is broken into tectonic plates that fit like a jigsaw.',
        'The plates move a few centimetres a year over the mantle.',
        'When two plates collide, mountains form.',
        'When they pull apart, magma comes out and new crust is created.',
        'Earthquakes and volcanoes cluster at the edges of the plates.',
        'The continents were once joined (Pangaea): continental drift.',
      ],
      ca: [
        'La Terra té tres capes: escorça, mantell i nucli.',
        'L\'escorça està partida en plaques tectòniques que encaixen com un trencaclosques.',
        'Les plaques es mouen uns centímetres l\'any sobre el mantell.',
        'En xocar dues plaques es formen muntanyes.',
        'En separar-se surt magma i es crea escorça nova.',
        'Els terratrèmols i volcans es concentren als límits de les plaques.',
        'Els continents van estar units (Pangea): deriva continental.',
      ],
    },
  },

  'mezclas-separacion': {
    metaTitle: {
      es: 'Mezclas y Métodos de Separación — resumen para estudiar',
      en: 'Mixtures and Separation Methods — a study summary',
      ca: 'Mescles i Mètodes de Separació — resum per estudiar',
    },
    metaDesc: {
      es: 'Mezclas homogéneas y heterogéneas y cómo separarlas: filtración, decantación, evaporación y destilación. Resumen para estudiar y test con explicación.',
      en: 'Homogeneous and heterogeneous mixtures and how to separate them: filtration, decanting, evaporation and distillation. Study summary and explained test.',
      ca: 'Mescles homogènies i heterogènies i com separar-les: filtració, decantació, evaporació i destil·lació. Resum per estudiar i test amb explicació.',
    },
    resumen: {
      es: [
        'No toda la materia es pura. Muchas cosas son mezclas: dos o más sustancias juntas que no reaccionan y que conservan sus propiedades, como el agua con sal o el aire. En una mezcla homogénea no se distinguen los componentes a simple vista (el agua con azúcar, el acero); en una heterogénea sí se ven (el agua con aceite, una ensalada).',
        'Como los componentes de una mezcla no están unidos químicamente, se pueden separar por métodos físicos, eligiendo el que aproveche una diferencia entre ellos. La filtración separa un sólido de un líquido (colar el café); la decantación separa dos líquidos que no se mezclan o un sólido que se posa; la evaporación deja el sólido disuelto cuando se va el líquido (la sal del agua de mar); y la destilación separa líquidos según su temperatura de ebullición.',
      ],
      en: [
        'Not all matter is pure. Many things are mixtures: two or more substances together that do not react and keep their properties, like salt water or air. In a homogeneous mixture the components cannot be told apart by eye (sugar water, steel); in a heterogeneous one they can (oil and water, a salad).',
        'Because the components of a mixture are not chemically joined, they can be separated by physical methods, choosing the one that uses a difference between them. Filtration separates a solid from a liquid (straining coffee); decanting separates two liquids that do not mix or a solid that settles; evaporation leaves the dissolved solid behind when the liquid goes (salt from seawater); and distillation separates liquids by their boiling point.',
      ],
      ca: [
        'No tota la matèria és pura. Moltes coses són mescles: dues o més substàncies juntes que no reaccionen i que conserven les seves propietats, com l\'aigua amb sal o l\'aire. En una mescla homogènia no es distingeixen els components a simple vista (l\'aigua amb sucre, l\'acer); en una heterogènia sí que es veuen (l\'aigua amb oli, una amanida).',
        'Com que els components d\'una mescla no estan units químicament, es poden separar per mètodes físics, triant el que aprofiti una diferència entre ells. La filtració separa un sòlid d\'un líquid (colar el cafè); la decantació separa dos líquids que no es mesclen o un sòlid que es diposita; l\'evaporació deixa el sòlid dissolt quan se\'n va el líquid (la sal de l\'aigua de mar); i la destil·lació separa líquids segons la seva temperatura d\'ebullició.',
      ],
    },
    puntosClave: {
      es: [
        'Una mezcla son dos o más sustancias juntas que conservan sus propiedades.',
        'Homogénea: no se ven los componentes (agua con azúcar). Heterogénea: sí (agua con aceite).',
        'Los componentes de una mezcla se separan por métodos físicos.',
        'Filtración: separa un sólido de un líquido (colar).',
        'Decantación: separa líquidos que no se mezclan o un sólido que se posa.',
        'Evaporación: el líquido se va y queda el sólido disuelto (la sal).',
        'Destilación: separa líquidos por su temperatura de ebullición.',
      ],
      en: [
        'A mixture is two or more substances together that keep their properties.',
        'Homogeneous: components not visible (sugar water). Heterogeneous: visible (oil and water).',
        'The components of a mixture are separated by physical methods.',
        'Filtration: separates a solid from a liquid (straining).',
        'Decanting: separates liquids that do not mix or a solid that settles.',
        'Evaporation: the liquid leaves and the dissolved solid remains (salt).',
        'Distillation: separates liquids by their boiling point.',
      ],
      ca: [
        'Una mescla són dues o més substàncies juntes que conserven les seves propietats.',
        'Homogènia: no es veuen els components (aigua amb sucre). Heterogènia: sí (aigua amb oli).',
        'Els components d\'una mescla es separen per mètodes físics.',
        'Filtració: separa un sòlid d\'un líquid (colar).',
        'Decantació: separa líquids que no es mesclen o un sòlid que es diposita.',
        'Evaporació: el líquid se\'n va i queda el sòlid dissolt (la sal).',
        'Destil·lació: separa líquids per la seva temperatura d\'ebullició.',
      ],
    },
  },

  'formulacion': {
    metaTitle: {
      es: 'Formulación Química: valencias y nomenclatura — resumen',
      en: 'Chemical Formulas: valencies and naming — a study summary',
      ca: 'Formulació Química: valències i nomenclatura — resum',
    },
    metaDesc: {
      es: 'Qué es formular y nombrar compuestos, las valencias, los subíndices y las familias (óxidos, hidruros, hidróxidos y sales) con la nomenclatura IUPAC. Resumen y test.',
      en: 'What formulating and naming compounds means, valencies, subscripts and the families (oxides, hydrides, hydroxides and salts) with IUPAC naming. Summary and test.',
      ca: 'Què és formular i anomenar compostos, les valències, els subíndexs i les famílies (òxids, hidrurs, hidròxids i sals) amb la nomenclatura IUPAC. Resum i test.',
    },
    resumen: {
      es: [
        'Formular es escribir con símbolos y números la composición de un compuesto químico, y nombrarlo es ponerle su nombre. Cada elemento aporta su valencia, el número de enlaces que puede hacer; combinando las valencias de los elementos se obtiene la fórmula, con subíndices que indican cuántos átomos de cada uno hay.',
        'Los compuestos se agrupan por familias. Los óxidos son un elemento con oxígeno (como el óxido de hierro); los hidruros, un elemento con hidrógeno; los hidróxidos llevan el grupo OH y son las bases; y las sales se forman al combinar un metal con un no metal. Hay unas reglas de nomenclatura, las de la IUPAC, que dicen cómo nombrar cada compuesto para que todo el mundo lo entienda igual.',
      ],
      en: [
        'Formulating is writing the composition of a chemical compound with symbols and numbers, and naming it is giving it its name. Each element brings its valency, the number of bonds it can make; by combining the elements\' valencies you get the formula, with subscripts showing how many atoms of each there are.',
        'Compounds are grouped into families. Oxides are an element with oxygen (like iron oxide); hydrides, an element with hydrogen; hydroxides carry the OH group and are the bases; and salts form when a metal combines with a non-metal. There are naming rules, the IUPAC ones, that state how to name each compound so everyone understands it the same way.',
      ],
      ca: [
        'Formular és escriure amb símbols i nombres la composició d\'un compost químic, i anomenar-lo és posar-li el nom. Cada element aporta la seva valència, el nombre d\'enllaços que pot fer; combinant les valències dels elements s\'obté la fórmula, amb subíndexs que indiquen quants àtoms de cadascun hi ha.',
        'Els compostos s\'agrupen per famílies. Els òxids són un element amb oxigen (com l\'òxid de ferro); els hidrurs, un element amb hidrogen; els hidròxids porten el grup OH i són les bases; i les sals es formen en combinar un metall amb un no metall. Hi ha unes regles de nomenclatura, les de la IUPAC, que diuen com anomenar cada compost perquè tothom l\'entengui igual.',
      ],
    },
    puntosClave: {
      es: [
        'Formular es escribir la fórmula de un compuesto; nombrarlo, darle nombre.',
        'La valencia es el número de enlaces que puede hacer un elemento.',
        'Los subíndices indican cuántos átomos de cada elemento hay (H₂O).',
        'Óxidos: elemento + oxígeno. Hidruros: elemento + hidrógeno.',
        'Hidróxidos: llevan el grupo OH; son las bases.',
        'Las sales se forman al combinar un metal con un no metal.',
        'La nomenclatura IUPAC fija cómo nombrar cada compuesto.',
      ],
      en: [
        'Formulating is writing a compound\'s formula; naming is giving it a name.',
        'Valency is the number of bonds an element can make.',
        'Subscripts show how many atoms of each element there are (H₂O).',
        'Oxides: element + oxygen. Hydrides: element + hydrogen.',
        'Hydroxides: carry the OH group; they are the bases.',
        'Salts form when a metal combines with a non-metal.',
        'IUPAC naming sets how to name each compound.',
      ],
      ca: [
        'Formular és escriure la fórmula d\'un compost; anomenar-lo, donar-li nom.',
        'La valència és el nombre d\'enllaços que pot fer un element.',
        'Els subíndexs indiquen quants àtoms de cada element hi ha (H₂O).',
        'Òxids: element + oxigen. Hidrurs: element + hidrogen.',
        'Hidròxids: porten el grup OH; són les bases.',
        'Les sals es formen en combinar un metall amb un no metall.',
        'La nomenclatura IUPAC fixa com anomenar cada compost.',
      ],
    },
  },

  'disoluciones': {
    metaTitle: {
      es: 'Las Disoluciones: soluto, disolvente y concentración — resumen',
      en: 'Solutions: solute, solvent and concentration — a summary',
      ca: 'Les Dissolucions: solut, dissolvent i concentració — resum',
    },
    metaDesc: {
      es: 'Qué es una disolución, la diferencia entre soluto y disolvente, las disoluciones saturadas y la concentración (g/L, % y molaridad). Resumen y test.',
      en: 'What a solution is, the difference between solute and solvent, saturated solutions and concentration (g/L, % and molarity). Summary and test.',
      ca: 'Què és una dissolució, la diferència entre solut i dissolvent, les dissolucions saturades i la concentració (g/L, % i molaritat). Resum i test.',
    },
    resumen: {
      es: [
        'Una disolución es una mezcla homogénea de dos sustancias: el soluto, que está en menor cantidad y se disuelve, y el disolvente, que está en mayor cantidad y lo disuelve. El agua con sal es una disolución: la sal es el soluto y el agua, el disolvente. El disolvente más habitual es el agua.',
        'Hay un límite para lo que se puede disolver: cuando el disolvente ya no admite más soluto, la disolución está saturada. La cantidad de soluto que hay en una disolución es la concentración, y se puede expresar de varias formas: en gramos por litro (g/L), en porcentaje o con la molaridad. La temperatura influye: en caliente, casi siempre se disuelve más soluto.',
      ],
      en: [
        'A solution is a homogeneous mixture of two substances: the solute, which is in the smaller amount and dissolves, and the solvent, which is in the larger amount and dissolves it. Salt water is a solution: salt is the solute and water the solvent. The most common solvent is water.',
        'There is a limit to what can be dissolved: when the solvent takes no more solute, the solution is saturated. The amount of solute in a solution is the concentration, and it can be expressed in several ways: in grams per litre (g/L), as a percentage or with molarity. Temperature matters: when hot, more solute usually dissolves.',
      ],
      ca: [
        'Una dissolució és una mescla homogènia de dues substàncies: el solut, que està en menor quantitat i es dissol, i el dissolvent, que està en major quantitat i el dissol. L\'aigua amb sal és una dissolució: la sal és el solut i l\'aigua, el dissolvent. El dissolvent més habitual és l\'aigua.',
        'Hi ha un límit per al que es pot dissoldre: quan el dissolvent ja no admet més solut, la dissolució està saturada. La quantitat de solut que hi ha en una dissolució és la concentració, i es pot expressar de diverses maneres: en grams per litre (g/L), en percentatge o amb la molaritat. La temperatura influeix: en calent, gairebé sempre es dissol més solut.',
      ],
    },
    puntosClave: {
      es: [
        'Una disolución es una mezcla homogénea de soluto y disolvente.',
        'Soluto: el que se disuelve (menor cantidad). Disolvente: el que disuelve (mayor).',
        'El disolvente más común es el agua.',
        'Una disolución saturada no admite más soluto.',
        'La concentración mide cuánto soluto hay: g/L, % o molaridad.',
        'La temperatura influye: en caliente suele disolverse más.',
        'Una disolución no se separa filtrando (el soluto está disuelto); hay que evaporar.',
      ],
      en: [
        'A solution is a homogeneous mixture of solute and solvent.',
        'Solute: what dissolves (smaller amount). Solvent: what dissolves it (larger).',
        'The most common solvent is water.',
        'A saturated solution takes no more solute.',
        'Concentration measures how much solute there is: g/L, % or molarity.',
        'Temperature matters: when hot, more usually dissolves.',
        'A solution is not separated by filtering (the solute is dissolved); you must evaporate.',
      ],
      ca: [
        'Una dissolució és una mescla homogènia de solut i dissolvent.',
        'Solut: el que es dissol (menor quantitat). Dissolvent: el que dissol (major).',
        'El dissolvent més comú és l\'aigua.',
        'Una dissolució saturada no admet més solut.',
        'La concentració mesura quant solut hi ha: g/L, % o molaritat.',
        'La temperatura influeix: en calent sol dissoldre\'s més.',
        'Una dissolució no se separa filtrant (el solut està dissolt); cal evaporar.',
      ],
    },
  },

  'energia': {
    metaTitle: {
      es: 'La Energía: formas, transformaciones y fuentes — resumen',
      en: 'Energy: forms, transformations and sources — a study summary',
      ca: 'L\'Energia: formes, transformacions i fonts — resum',
    },
    metaDesc: {
      es: 'Qué es la energía, sus formas (cinética, potencial, térmica…), la conservación de la energía y las fuentes renovables y no renovables. Resumen y test.',
      en: 'What energy is, its forms (kinetic, potential, thermal…), the conservation of energy and renewable and non-renewable sources. Summary and test.',
      ca: 'Què és l\'energia, les seves formes (cinètica, potencial, tèrmica…), la conservació de l\'energia i les fonts renovables i no renovables. Resum i test.',
    },
    resumen: {
      es: [
        'La energía es la capacidad de producir cambios: mover algo, calentarlo, encender una luz. Hay muchas formas de energía —cinética (la del movimiento), potencial (la almacenada por la posición o la altura), térmica, eléctrica, química, luminosa— y todas se miden en julios (J).',
        'La energía ni se crea ni se destruye, solo se transforma de una forma en otra: es el principio de conservación de la energía. Una bombilla convierte energía eléctrica en luz (y algo de calor); una persona, la energía química de los alimentos en movimiento. Las fuentes de energía pueden ser renovables, que no se agotan (el Sol, el viento, el agua), o no renovables, que sí (el petróleo, el carbón, el gas).',
      ],
      en: [
        'Energy is the ability to produce changes: to move something, heat it, light a lamp. There are many forms of energy —kinetic (that of motion), potential (stored by position or height), thermal, electrical, chemical, light— and all are measured in joules (J).',
        'Energy is neither created nor destroyed, it only changes from one form into another: this is the principle of conservation of energy. A bulb turns electrical energy into light (and some heat); a person turns the chemical energy of food into movement. Energy sources can be renewable, which do not run out (the Sun, wind, water), or non-renewable, which do (oil, coal, gas).',
      ],
      ca: [
        'L\'energia és la capacitat de produir canvis: moure alguna cosa, escalfar-la, encendre un llum. Hi ha moltes formes d\'energia —cinètica (la del moviment), potencial (l\'emmagatzemada per la posició o l\'alçada), tèrmica, elèctrica, química, lluminosa— i totes es mesuren en joules (J).',
        'L\'energia ni es crea ni es destrueix, només es transforma d\'una forma en una altra: és el principi de conservació de l\'energia. Una bombeta converteix energia elèctrica en llum (i una mica de calor); una persona, l\'energia química dels aliments en moviment. Les fonts d\'energia poden ser renovables, que no s\'esgoten (el Sol, el vent, l\'aigua), o no renovables, que sí (el petroli, el carbó, el gas).',
      ],
    },
    puntosClave: {
      es: [
        'La energía es la capacidad de producir cambios; se mide en julios (J).',
        'Formas: cinética, potencial, térmica, eléctrica, química, luminosa…',
        'Energía cinética: la del movimiento. Potencial: la almacenada (altura, posición).',
        'La energía ni se crea ni se destruye: se transforma (conservación).',
        'Los aparatos transforman una forma de energía en otra.',
        'Fuentes renovables (Sol, viento, agua) frente a no renovables (petróleo, carbón).',
        'El rendimiento mide cuánta energía se aprovecha y cuánta se pierde (calor).',
      ],
      en: [
        'Energy is the ability to produce changes; it is measured in joules (J).',
        'Forms: kinetic, potential, thermal, electrical, chemical, light…',
        'Kinetic energy: that of motion. Potential: stored (height, position).',
        'Energy is neither created nor destroyed: it transforms (conservation).',
        'Devices transform one form of energy into another.',
        'Renewable sources (Sun, wind, water) versus non-renewable (oil, coal).',
        'Efficiency measures how much energy is used and how much is lost (heat).',
      ],
      ca: [
        'L\'energia és la capacitat de produir canvis; es mesura en joules (J).',
        'Formes: cinètica, potencial, tèrmica, elèctrica, química, lluminosa…',
        'Energia cinètica: la del moviment. Potencial: l\'emmagatzemada (alçada, posició).',
        'L\'energia ni es crea ni es destrueix: es transforma (conservació).',
        'Els aparells transformen una forma d\'energia en una altra.',
        'Fonts renovables (Sol, vent, aigua) davant de no renovables (petroli, carbó).',
        'El rendiment mesura quanta energia s\'aprofita i quanta es perd (calor).',
      ],
    },
  },

  'ondas-luz': {
    metaTitle: {
      es: 'Ondas, Sonido y Luz: reflexión y refracción — resumen',
      en: 'Waves, Sound and Light: reflection and refraction — a summary',
      ca: 'Ones, So i Llum: reflexió i refracció — resum',
    },
    metaDesc: {
      es: 'Qué es una onda, la diferencia entre el sonido (onda mecánica) y la luz (onda electromagnética), y la reflexión y la refracción de la luz. Resumen y test.',
      en: 'What a wave is, the difference between sound (a mechanical wave) and light (an electromagnetic wave), and the reflection and refraction of light. Summary and test.',
      ca: 'Què és una ona, la diferència entre el so (ona mecànica) i la llum (ona electromagnètica), i la reflexió i la refracció de la llum. Resum i test.',
    },
    resumen: {
      es: [
        'Una onda es una perturbación que se propaga y transporta energía, pero no materia, de un sitio a otro. El sonido y la luz son ondas. Las ondas tienen amplitud, relacionada con la intensidad, y frecuencia, relacionada con el tono en el sonido y con el color en la luz.',
        'El sonido es una onda mecánica: necesita un medio (aire, agua) para viajar, por eso en el vacío no se oye nada. La luz es una onda electromagnética y sí viaja por el vacío, por eso nos llega la del Sol. La luz puede reflejarse, rebotar como en un espejo, o refractarse, cambiar de dirección al pasar de un medio a otro, como el lápiz que parece roto dentro del agua. La luz blanca está formada por todos los colores, como se ve en el arcoíris.',
      ],
      en: [
        'A wave is a disturbance that spreads and carries energy, but not matter, from one place to another. Sound and light are waves. Waves have amplitude, related to intensity, and frequency, related to pitch in sound and to colour in light.',
        'Sound is a mechanical wave: it needs a medium (air, water) to travel, which is why nothing is heard in a vacuum. Light is an electromagnetic wave and does travel through a vacuum, which is why the Sun\'s light reaches us. Light can be reflected, bouncing like in a mirror, or refracted, changing direction when passing from one medium to another, like the pencil that looks broken in water. White light is made of all the colours, as seen in the rainbow.',
      ],
      ca: [
        'Una ona és una pertorbació que es propaga i transporta energia, però no matèria, d\'un lloc a un altre. El so i la llum són ones. Les ones tenen amplitud, relacionada amb la intensitat, i freqüència, relacionada amb el to en el so i amb el color en la llum.',
        'El so és una ona mecànica: necessita un medi (aire, aigua) per viatjar, per això en el buit no se sent res. La llum és una ona electromagnètica i sí que viatja pel buit, per això ens arriba la del Sol. La llum es pot reflectir, rebotar com en un mirall, o refractar, canviar de direcció en passar d\'un medi a un altre, com el llapis que sembla trencat dins l\'aigua. La llum blanca està formada per tots els colors, com es veu a l\'arc de Sant Martí.',
      ],
    },
    puntosClave: {
      es: [
        'Una onda transporta energía, no materia.',
        'El sonido y la luz son ondas.',
        'Amplitud (intensidad) y frecuencia (tono en el sonido, color en la luz).',
        'El sonido es una onda mecánica: necesita un medio (no viaja en el vacío).',
        'La luz es una onda electromagnética: sí viaja en el vacío.',
        'La luz se refleja (rebota) y se refracta (se desvía al cambiar de medio).',
        'La luz blanca contiene todos los colores (el arcoíris).',
      ],
      en: [
        'A wave carries energy, not matter.',
        'Sound and light are waves.',
        'Amplitude (intensity) and frequency (pitch in sound, colour in light).',
        'Sound is a mechanical wave: it needs a medium (it does not travel in a vacuum).',
        'Light is an electromagnetic wave: it does travel in a vacuum.',
        'Light reflects (bounces) and refracts (bends when changing medium).',
        'White light contains all the colours (the rainbow).',
      ],
      ca: [
        'Una ona transporta energia, no matèria.',
        'El so i la llum són ones.',
        'Amplitud (intensitat) i freqüència (to en el so, color en la llum).',
        'El so és una ona mecànica: necessita un medi (no viatja en el buit).',
        'La llum és una ona electromagnètica: sí que viatja en el buit.',
        'La llum es reflecteix (rebota) i es refracta (es desvia en canviar de medi).',
        'La llum blanca conté tots els colors (l\'arc de Sant Martí).',
      ],
    },
  },

  'presion-fluidos': {
    metaTitle: {
      es: 'La Presión y los Fluidos: Pascal y Arquímedes — resumen',
      en: 'Pressure and Fluids: Pascal and Archimedes — a summary',
      ca: 'La Pressió i els Fluids: Pascal i Arquimedes — resum',
    },
    metaDesc: {
      es: 'Qué es la presión, cómo depende de la superficie, la presión en líquidos y la atmosférica, y los principios de Pascal y de Arquímedes. Resumen y test.',
      en: 'What pressure is, how it depends on area, pressure in liquids and atmospheric pressure, and the principles of Pascal and Archimedes. Summary and test.',
      ca: 'Què és la pressió, com depèn de la superfície, la pressió en líquids i l\'atmosfèrica, i els principis de Pascal i d\'Arquimedes. Resum i test.',
    },
    resumen: {
      es: [
        'La presión es la fuerza que se reparte sobre una superficie: la misma fuerza hace más presión cuanto menor es la superficie, por eso un cuchillo afilado corta mejor. Se mide en pascales (Pa). Los líquidos y los gases, es decir, los fluidos, ejercen presión sobre todo lo que tocan.',
        'Dentro de un líquido, la presión aumenta con la profundidad: por eso duelen los oídos al bucear. El aire también pesa y ejerce la presión atmosférica sobre nosotros. Hay dos principios importantes: el de Pascal, que explica cómo se transmite la presión dentro de un líquido (los frenos del coche), y el de Arquímedes, que explica por qué flotan los objetos: un cuerpo sumergido recibe un empuje hacia arriba igual al peso del líquido que desaloja.',
      ],
      en: [
        'Pressure is the force spread over an area: the same force makes more pressure the smaller the area, which is why a sharp knife cuts better. It is measured in pascals (Pa). Liquids and gases, that is, fluids, exert pressure on everything they touch.',
        'Inside a liquid, pressure increases with depth: that is why your ears hurt when diving. Air also has weight and exerts atmospheric pressure on us. There are two important principles: Pascal\'s, which explains how pressure is transmitted inside a liquid (a car\'s brakes), and Archimedes\', which explains why objects float: a submerged body receives an upward push equal to the weight of the liquid it displaces.',
      ],
      ca: [
        'La pressió és la força que es reparteix sobre una superfície: la mateixa força fa més pressió com més petita és la superfície, per això un ganivet esmolat talla millor. Es mesura en pascals (Pa). Els líquids i els gasos, és a dir, els fluids, exerceixen pressió sobre tot el que toquen.',
        'Dins d\'un líquid, la pressió augmenta amb la profunditat: per això fan mal les orelles en bussejar. L\'aire també pesa i exerceix la pressió atmosfèrica sobre nosaltres. Hi ha dos principis importants: el de Pascal, que explica com es transmet la pressió dins d\'un líquid (els frens del cotxe), i el d\'Arquimedes, que explica per què suren els objectes: un cos submergit rep una empenta cap amunt igual al pes del líquid que desallotja.',
      ],
    },
    puntosClave: {
      es: [
        'La presión es la fuerza repartida sobre una superficie; se mide en pascales (Pa).',
        'A menor superficie, más presión con la misma fuerza.',
        'Los fluidos (líquidos y gases) ejercen presión sobre lo que tocan.',
        'En un líquido, la presión aumenta con la profundidad.',
        'La presión atmosférica es la que ejerce el aire sobre nosotros.',
        'Principio de Pascal: la presión se transmite en un líquido (frenos hidráulicos).',
        'Principio de Arquímedes: un cuerpo sumergido recibe un empuje hacia arriba (flotación).',
      ],
      en: [
        'Pressure is force spread over an area; it is measured in pascals (Pa).',
        'The smaller the area, the more pressure with the same force.',
        'Fluids (liquids and gases) exert pressure on what they touch.',
        'In a liquid, pressure increases with depth.',
        'Atmospheric pressure is the pressure the air exerts on us.',
        'Pascal\'s principle: pressure is transmitted in a liquid (hydraulic brakes).',
        'Archimedes\' principle: a submerged body gets an upward push (floating).',
      ],
      ca: [
        'La pressió és la força repartida sobre una superfície; es mesura en pascals (Pa).',
        'A menor superfície, més pressió amb la mateixa força.',
        'Els fluids (líquids i gasos) exerceixen pressió sobre el que toquen.',
        'En un líquid, la pressió augmenta amb la profunditat.',
        'La pressió atmosfèrica és la que exerceix l\'aire sobre nosaltres.',
        'Principi de Pascal: la pressió es transmet en un líquid (frens hidràulics).',
        'Principi d\'Arquimedes: un cos submergit rep una empenta cap amunt (flotació).',
      ],
    },
  },

  'calor-temperatura': {
    metaTitle: {
      es: 'Calor y Temperatura: en qué se diferencian — resumen',
      en: 'Heat and Temperature: how they differ — a study summary',
      ca: 'Calor i Temperatura: en què es diferencien — resum',
    },
    metaDesc: {
      es: 'La diferencia entre calor y temperatura, las escalas Celsius y Kelvin, el equilibrio térmico y las tres formas de transmitir el calor. Resumen y test.',
      en: 'The difference between heat and temperature, the Celsius and Kelvin scales, thermal equilibrium and the three ways heat travels. Summary and test.',
      ca: 'La diferència entre calor i temperatura, les escales Celsius i Kelvin, l\'equilibri tèrmic i les tres formes de transmetre la calor. Resum i test.',
    },
    resumen: {
      es: [
        'El calor y la temperatura no son lo mismo. La temperatura mide lo caliente o frío que está un cuerpo, es decir, cómo de rápido se mueven sus partículas; se mide con el termómetro, en grados Celsius (°C) o en kelvin (K). El calor es la energía que pasa de un cuerpo más caliente a otro más frío.',
        'Cuando dos cuerpos a distinta temperatura se ponen en contacto, el calor pasa del caliente al frío hasta que los dos igualan su temperatura: es el equilibrio térmico. El calor se transmite de tres formas: por conducción (a través de un sólido, como la cuchara en la sopa), por convección (en líquidos y gases, que suben al calentarse) y por radiación (sin contacto, como el calor del Sol). Al calentarse, casi todos los cuerpos se dilatan.',
      ],
      en: [
        'Heat and temperature are not the same. Temperature measures how hot or cold a body is, that is, how fast its particles move; it is measured with a thermometer, in degrees Celsius (°C) or in kelvin (K). Heat is the energy that passes from a hotter body to a colder one.',
        'When two bodies at different temperatures come into contact, heat passes from the hot one to the cold one until both reach the same temperature: this is thermal equilibrium. Heat travels in three ways: by conduction (through a solid, like the spoon in the soup), by convection (in liquids and gases, which rise when heated) and by radiation (without contact, like the Sun\'s heat). When heated, almost all bodies expand.',
      ],
      ca: [
        'La calor i la temperatura no són el mateix. La temperatura mesura com de calent o fred està un cos, és a dir, com de ràpid es mouen les seves partícules; es mesura amb el termòmetre, en graus Celsius (°C) o en kelvin (K). La calor és l\'energia que passa d\'un cos més calent a un altre més fred.',
        'Quan dos cossos a diferent temperatura es posen en contacte, la calor passa del calent al fred fins que tots dos igualen la seva temperatura: és l\'equilibri tèrmic. La calor es transmet de tres formes: per conducció (a través d\'un sòlid, com la cullera a la sopa), per convecció (en líquids i gasos, que pugen en escalfar-se) i per radiació (sense contacte, com la calor del Sol). En escalfar-se, gairebé tots els cossos es dilaten.',
      ],
    },
    puntosClave: {
      es: [
        'La temperatura mide lo caliente o frío que está un cuerpo (termómetro).',
        'El calor es la energía que pasa de un cuerpo caliente a otro más frío.',
        'La temperatura se mide en grados Celsius (°C) o en kelvin (K).',
        'En contacto, el calor pasa del caliente al frío hasta el equilibrio térmico.',
        'Conducción (por un sólido), convección (líquidos y gases) y radiación (sin contacto).',
        'El calor del Sol nos llega por radiación, a través del vacío.',
        'Al calentarse, los cuerpos se dilatan (aumentan de tamaño).',
      ],
      en: [
        'Temperature measures how hot or cold a body is (thermometer).',
        'Heat is the energy that passes from a hot body to a colder one.',
        'Temperature is measured in degrees Celsius (°C) or in kelvin (K).',
        'In contact, heat passes from hot to cold until thermal equilibrium.',
        'Conduction (through a solid), convection (liquids and gases) and radiation (no contact).',
        'The Sun\'s heat reaches us by radiation, through the vacuum.',
        'When heated, bodies expand (grow in size).',
      ],
      ca: [
        'La temperatura mesura com de calent o fred està un cos (termòmetre).',
        'La calor és l\'energia que passa d\'un cos calent a un altre més fred.',
        'La temperatura es mesura en graus Celsius (°C) o en kelvin (K).',
        'En contacte, la calor passa del calent al fred fins a l\'equilibri tèrmic.',
        'Conducció (per un sòlid), convecció (líquids i gasos) i radiació (sense contacte).',
        'La calor del Sol ens arriba per radiació, a través del buit.',
        'En escalfar-se, els cossos es dilaten (augmenten de mida).',
      ],
    },
  },

  'europa': {
    metaTitle: {
      es: 'Europa: países, relieve y ríos — resumen para estudiar',
      en: 'Europe: countries, relief and rivers — a study summary',
      ca: 'Europa: països, relleu i rius — resum per estudiar',
    },
    metaDesc: {
      es: 'Dónde está Europa, sus casi 50 países, la Unión Europea, sus penínsulas, montañas (Alpes, Pirineos) y ríos (Volga, Danubio). Resumen y test de mapa.',
      en: 'Where Europe is, its almost 50 countries, the European Union, its peninsulas, mountains (Alps, Pyrenees) and rivers (Volga, Danube). Summary and map test.',
      ca: 'On és Europa, els seus gairebé 50 països, la Unió Europea, les seves penínsules, muntanyes (Alps, Pirineus) i rius (Volga, Danubi). Resum i test de mapa.',
    },
    resumen: {
      es: [
        'Europa es un continente pequeño en superficie pero muy poblado y con muchos países: unos 50. Se sitúa en el hemisferio norte y limita con el océano Atlántico al oeste, el Ártico al norte y Asia al este, de la que la separan los montes Urales. Está muy fragmentada en penínsulas —la ibérica, la itálica, la balcánica, la escandinava— y en islas.',
        'Políticamente, muchos de sus países forman la Unión Europea, y bastantes comparten una moneda, el euro. Entre sus accidentes destacan los Alpes y los Pirineos, y ríos como el Volga (el más largo), el Danubio y el Rin. Grandes ciudades europeas son París, Londres, Roma, Berlín y Madrid.',
      ],
      en: [
        'Europe is a continent small in area but densely populated and with many countries: around 50. It lies in the northern hemisphere and borders the Atlantic Ocean to the west, the Arctic to the north and Asia to the east, from which the Ural Mountains separate it. It is very fragmented into peninsulas —the Iberian, the Italian, the Balkan, the Scandinavian— and islands.',
        'Politically, many of its countries form the European Union, and several share a currency, the euro. Notable features include the Alps and the Pyrenees, and rivers such as the Volga (the longest), the Danube and the Rhine. Major European cities are Paris, London, Rome, Berlin and Madrid.',
      ],
      ca: [
        'Europa és un continent petit en superfície però molt poblat i amb molts països: uns 50. Se situa a l\'hemisferi nord i limita amb l\'oceà Atlàntic a l\'oest, l\'Àrtic al nord i Àsia a l\'est, de la qual la separen els monts Urals. Està molt fragmentada en penínsules —la ibèrica, la itàlica, la balcànica, l\'escandinava— i en illes.',
        'Políticament, molts dels seus països formen la Unió Europea, i uns quants comparteixen una moneda, l\'euro. Entre els seus accidents destaquen els Alps i els Pirineus, i rius com el Volga (el més llarg), el Danubi i el Rin. Grans ciutats europees són París, Londres, Roma, Berlín i Madrid.',
      ],
    },
    puntosClave: {
      es: [
        'Europa está en el hemisferio norte; limita con Asia por los montes Urales.',
        'Es pequeña en superficie pero tiene unos 50 países.',
        'Muy fragmentada: penínsulas (ibérica, itálica, balcánica, escandinava) e islas.',
        'Muchos países forman la Unión Europea; varios usan el euro.',
        'Montañas destacadas: los Alpes y los Pirineos.',
        'Ríos importantes: el Volga (el más largo), el Danubio y el Rin.',
        'Grandes ciudades: París, Londres, Roma, Berlín y Madrid.',
      ],
      en: [
        'Europe is in the northern hemisphere; it borders Asia at the Ural Mountains.',
        'It is small in area but has around 50 countries.',
        'Very fragmented: peninsulas (Iberian, Italian, Balkan, Scandinavian) and islands.',
        'Many countries form the European Union; several use the euro.',
        'Notable mountains: the Alps and the Pyrenees.',
        'Important rivers: the Volga (the longest), the Danube and the Rhine.',
        'Major cities: Paris, London, Rome, Berlin and Madrid.',
      ],
      ca: [
        'Europa és a l\'hemisferi nord; limita amb Àsia pels monts Urals.',
        'És petita en superfície però té uns 50 països.',
        'Molt fragmentada: penínsules (ibèrica, itàlica, balcànica, escandinava) i illes.',
        'Molts països formen la Unió Europea; uns quants fan servir l\'euro.',
        'Muntanyes destacades: els Alps i els Pirineus.',
        'Rius importants: el Volga (el més llarg), el Danubi i el Rin.',
        'Grans ciutats: París, Londres, Roma, Berlín i Madrid.',
      ],
    },
  },

  'america': {
    metaTitle: {
      es: 'América: del Norte, Central y del Sur — resumen para estudiar',
      en: 'The Americas: North, Central and South — a study summary',
      ca: 'Amèrica: del Nord, Central i del Sud — resum per estudiar',
    },
    metaDesc: {
      es: 'Las tres partes de América, los Andes, el Amazonas, los países más extensos y las lenguas que se hablan. Resumen para estudiar y test de mapa.',
      en: 'The three parts of the Americas, the Andes, the Amazon, the largest countries and the languages spoken. Study summary and map test.',
      ca: 'Les tres parts d\'Amèrica, els Andes, l\'Amazones, els països més extensos i les llengües que s\'hi parlen. Resum per estudiar i test de mapa.',
    },
    resumen: {
      es: [
        'América es el segundo continente más grande y se extiende de norte a sur por todo un hemisferio, desde el Ártico hasta cerca de la Antártida. Se divide en tres partes: América del Norte (Canadá, Estados Unidos y México), América Central (el istmo y las islas del Caribe) y América del Sur.',
        'Es un continente de contrastes enormes: la cordillera de los Andes recorre todo el oeste de Sudamérica, y en ese continente está el río Amazonas, el más caudaloso del mundo, con su gran selva. Se hablan sobre todo español, inglés y portugués (en Brasil). Entre sus países más extensos están Canadá, Estados Unidos y Brasil.',
      ],
      en: [
        'The Americas make up the second-largest continent and stretch from north to south across a whole hemisphere, from the Arctic to near Antarctica. They divide into three parts: North America (Canada, the United States and Mexico), Central America (the isthmus and the Caribbean islands) and South America.',
        'It is a continent of huge contrasts: the Andes run all along the west of South America, and there flows the Amazon, the world\'s largest river by volume, with its vast rainforest. The main languages are Spanish, English and Portuguese (in Brazil). Among its largest countries are Canada, the United States and Brazil.',
      ],
      ca: [
        'Amèrica és el segon continent més gran i s\'estén de nord a sud per tot un hemisferi, des de l\'Àrtic fins a prop de l\'Antàrtida. Es divideix en tres parts: Amèrica del Nord (Canadà, Estats Units i Mèxic), Amèrica Central (l\'istme i les illes del Carib) i Amèrica del Sud.',
        'És un continent de contrastos enormes: la serralada dels Andes recorre tot l\'oest de Sud-amèrica, i en aquest continent hi ha el riu Amazones, el més cabalós del món, amb la seva gran selva. S\'hi parlen sobretot espanyol, anglès i portuguès (al Brasil). Entre els seus països més extensos hi ha el Canadà, els Estats Units i el Brasil.',
      ],
    },
    puntosClave: {
      es: [
        'América se divide en América del Norte, Central y del Sur.',
        'América del Norte: Canadá, Estados Unidos y México.',
        'Es el segundo continente más grande; va del Ártico al extremo sur.',
        'La cordillera de los Andes recorre todo el oeste de Sudamérica.',
        'El Amazonas es el río más caudaloso del mundo.',
        'Se hablan sobre todo español, inglés y portugués (Brasil).',
        'Países muy extensos: Canadá, Estados Unidos y Brasil.',
      ],
      en: [
        'The Americas divide into North, Central and South America.',
        'North America: Canada, the United States and Mexico.',
        'It is the second-largest continent; it goes from the Arctic to the far south.',
        'The Andes run all along the west of South America.',
        'The Amazon is the world\'s largest river by volume.',
        'The main languages are Spanish, English and Portuguese (Brazil).',
        'Very large countries: Canada, the United States and Brazil.',
      ],
      ca: [
        'Amèrica es divideix en Amèrica del Nord, Central i del Sud.',
        'Amèrica del Nord: Canadà, Estats Units i Mèxic.',
        'És el segon continent més gran; va de l\'Àrtic a l\'extrem sud.',
        'La serralada dels Andes recorre tot l\'oest de Sud-amèrica.',
        'L\'Amazones és el riu més cabalós del món.',
        'S\'hi parlen sobretot espanyol, anglès i portuguès (Brasil).',
        'Països molt extensos: Canadà, Estats Units i Brasil.',
      ],
    },
  },

  'asia': {
    metaTitle: {
      es: 'Asia: el continente más grande y poblado — resumen',
      en: 'Asia: the largest and most populated continent — summary',
      ca: 'Àsia: el continent més gran i poblat — resum',
    },
    metaDesc: {
      es: 'Dónde está Asia, por qué es el continente más grande y poblado, el Himalaya y el Everest, sus grandes ríos y su diversidad. Resumen y test de mapa.',
      en: 'Where Asia is, why it is the largest and most populated continent, the Himalayas and Everest, its great rivers and its diversity. Summary and map test.',
      ca: 'On és Àsia, per què és el continent més gran i poblat, l\'Himàlaia i l\'Everest, els seus grans rius i la seva diversitat. Resum i test de mapa.',
    },
    resumen: {
      es: [
        'Asia es el continente más grande y más poblado del planeta: en él vive más de la mitad de la humanidad, con países como China y la India, los más poblados del mundo. Ocupa gran parte del hemisferio norte y limita con Europa (de la que la separan los montes Urales), con África por el istmo de Suez y con los océanos Pacífico, Índico y Ártico.',
        'Tiene los mayores relieves de la Tierra: la cordillera del Himalaya, con el Everest, la montaña más alta del mundo. También están el desierto de Arabia, la enorme llanura de Siberia y ríos como el Yangtsé y el Ganges. Es una región de gran diversidad de culturas, religiones e idiomas.',
      ],
      en: [
        'Asia is the largest and most populated continent on the planet: more than half of humanity lives there, with countries like China and India, the most populous in the world. It occupies much of the northern hemisphere and borders Europe (from which the Urals separate it), Africa at the Isthmus of Suez, and the Pacific, Indian and Arctic oceans.',
        'It has the greatest reliefs on Earth: the Himalayas, with Everest, the highest mountain in the world. There are also the Arabian Desert, the huge Siberian plain and rivers such as the Yangtze and the Ganges. It is a region of great diversity of cultures, religions and languages.',
      ],
      ca: [
        'Àsia és el continent més gran i més poblat del planeta: hi viu més de la meitat de la humanitat, amb països com la Xina i l\'Índia, els més poblats del món. Ocupa gran part de l\'hemisferi nord i limita amb Europa (de la qual la separen els monts Urals), amb Àfrica per l\'istme de Suez i amb els oceans Pacífic, Índic i Àrtic.',
        'Té els majors relleus de la Terra: la serralada de l\'Himàlaia, amb l\'Everest, la muntanya més alta del món. També hi ha el desert d\'Aràbia, l\'enorme plana de Sibèria i rius com el Iangtsé i el Ganges. És una regió de gran diversitat de cultures, religions i idiomes.',
      ],
    },
    puntosClave: {
      es: [
        'Asia es el continente más grande y el más poblado.',
        'En él están China y la India, los países más poblados del mundo.',
        'Limita con Europa por los montes Urales y con África por el istmo de Suez.',
        'El Himalaya es la cordillera más alta; el Everest, la mayor montaña del mundo.',
        'Grandes ríos: el Yangtsé y el Ganges.',
        'Enorme diversidad de culturas, religiones e idiomas.',
        'Incluye regiones muy distintas: Siberia, Arabia, el Sudeste asiático…',
      ],
      en: [
        'Asia is the largest continent and the most populated.',
        'It contains China and India, the most populous countries in the world.',
        'It borders Europe at the Urals and Africa at the Isthmus of Suez.',
        'The Himalayas are the highest range; Everest, the world\'s tallest mountain.',
        'Great rivers: the Yangtze and the Ganges.',
        'Huge diversity of cultures, religions and languages.',
        'It includes very different regions: Siberia, Arabia, Southeast Asia…',
      ],
      ca: [
        'Àsia és el continent més gran i el més poblat.',
        'Hi ha la Xina i l\'Índia, els països més poblats del món.',
        'Limita amb Europa pels monts Urals i amb Àfrica per l\'istme de Suez.',
        'L\'Himàlaia és la serralada més alta; l\'Everest, la muntanya més gran del món.',
        'Grans rius: el Iangtsé i el Ganges.',
        'Enorme diversitat de cultures, religions i idiomes.',
        'Inclou regions molt diferents: Sibèria, Aràbia, el Sud-est asiàtic…',
      ],
    },
  },

  'africa': {
    metaTitle: {
      es: 'África: el Sáhara, el Nilo y sus países — resumen',
      en: 'Africa: the Sahara, the Nile and its countries — summary',
      ca: 'Àfrica: el Sàhara, el Nil i els seus països — resum',
    },
    metaDesc: {
      es: 'Dónde está África, el Sáhara, las sabanas y selvas, el Nilo, el Kilimanjaro y por qué se la llama la cuna de la humanidad. Resumen y test de mapa.',
      en: 'Where Africa is, the Sahara, the savannahs and rainforests, the Nile, Kilimanjaro and why it is called the cradle of humanity. Summary and map test.',
      ca: 'On és Àfrica, el Sàhara, les sabanes i selves, el Nil, el Kilimanjaro i per què se l\'anomena el bressol de la humanitat. Resum i test de mapa.',
    },
    resumen: {
      es: [
        'África es el segundo continente más grande y está atravesado por el ecuador, así que tiene un clima mayoritariamente cálido. En el norte se extiende el Sáhara, el mayor desierto cálido del mundo; hacia el centro y el sur hay sabanas y selvas tropicales. Lo separan de Europa el mar Mediterráneo y el estrecho de Gibraltar.',
        'Es un continente de más de 50 países y una enorme variedad de pueblos e idiomas. Por él discurre el Nilo, uno de los ríos más largos del mundo, y en él está el Kilimanjaro, su montaña más alta. Se considera la cuna de la humanidad, porque allí aparecieron los primeros seres humanos.',
      ],
      en: [
        'Africa is the second-largest continent and is crossed by the equator, so its climate is mostly warm. In the north lies the Sahara, the largest hot desert in the world; towards the centre and south there are savannahs and tropical rainforests. The Mediterranean Sea and the Strait of Gibraltar separate it from Europe.',
        'It is a continent of more than 50 countries and a huge variety of peoples and languages. The Nile, one of the longest rivers in the world, runs through it, and there stands Kilimanjaro, its highest mountain. It is regarded as the cradle of humanity, because the first human beings appeared there.',
      ],
      ca: [
        'Àfrica és el segon continent més gran i està travessat per l\'equador, així que té un clima majoritàriament càlid. Al nord s\'estén el Sàhara, el desert càlid més gran del món; cap al centre i el sud hi ha sabanes i selves tropicals. El separen d\'Europa el mar Mediterrani i l\'estret de Gibraltar.',
        'És un continent de més de 50 països i una enorme varietat de pobles i idiomes. Hi discorre el Nil, un dels rius més llargs del món, i hi ha el Kilimanjaro, la seva muntanya més alta. Es considera el bressol de la humanitat, perquè allà van aparèixer els primers éssers humans.',
      ],
    },
    puntosClave: {
      es: [
        'África es el segundo continente más grande; el ecuador lo atraviesa.',
        'El Sáhara, en el norte, es el mayor desierto cálido del mundo.',
        'Hacia el centro y el sur: sabanas y selvas tropicales.',
        'El Nilo es uno de los ríos más largos del mundo.',
        'El Kilimanjaro es su montaña más alta.',
        'Tiene más de 50 países y muchísimos pueblos e idiomas.',
        'Se considera la cuna de la humanidad.',
      ],
      en: [
        'Africa is the second-largest continent; the equator crosses it.',
        'The Sahara, in the north, is the largest hot desert in the world.',
        'Towards the centre and south: savannahs and tropical rainforests.',
        'The Nile is one of the longest rivers in the world.',
        'Kilimanjaro is its highest mountain.',
        'It has more than 50 countries and a great many peoples and languages.',
        'It is regarded as the cradle of humanity.',
      ],
      ca: [
        'Àfrica és el segon continent més gran; l\'equador el travessa.',
        'El Sàhara, al nord, és el desert càlid més gran del món.',
        'Cap al centre i el sud: sabanes i selves tropicals.',
        'El Nil és un dels rius més llargs del món.',
        'El Kilimanjaro és la seva muntanya més alta.',
        'Té més de 50 països i moltíssims pobles i idiomes.',
        'Es considera el bressol de la humanitat.',
      ],
    },
  },

  'oceania': {
    metaTitle: {
      es: 'Oceanía: Australia y las islas del Pacífico — resumen',
      en: 'Oceania: Australia and the Pacific islands — a summary',
      ca: 'Oceania: Austràlia i les illes del Pacífic — resum',
    },
    metaDesc: {
      es: 'El continente más pequeño: Australia, Nueva Zelanda y las islas del Pacífico (Melanesia, Micronesia, Polinesia), sus animales y la Gran Barrera de Coral. Resumen y test.',
      en: 'The smallest continent: Australia, New Zealand and the Pacific islands (Melanesia, Micronesia, Polynesia), its animals and the Great Barrier Reef. Summary and test.',
      ca: 'El continent més petit: Austràlia, Nova Zelanda i les illes del Pacífic (Melanèsia, Micronèsia, Polinèsia), els seus animals i la Gran Barrera de Corall. Resum i test.',
    },
    resumen: {
      es: [
        'Oceanía es el continente más pequeño y el que menos población tiene. Está formado por Australia —que ocupa casi todo el territorio—, Nueva Zelanda y miles de islas repartidas por el océano Pacífico, agrupadas en tres regiones: Melanesia, Micronesia y Polinesia.',
        'Está casi entero en el hemisferio sur, muy alejado del resto de continentes. Australia es en gran parte un desierto, el llamado outback, y alberga animales únicos como el canguro y el koala. En su costa está la Gran Barrera de Coral, el mayor arrecife del mundo. Su ciudad más grande es Sídney, aunque la capital es Canberra.',
      ],
      en: [
        'Oceania is the smallest continent and the least populated. It is made up of Australia —which takes up almost all the land—, New Zealand and thousands of islands scattered across the Pacific Ocean, grouped into three regions: Melanesia, Micronesia and Polynesia.',
        'It is almost entirely in the southern hemisphere, far from the other continents. Australia is largely a desert, the so-called outback, and is home to unique animals like the kangaroo and the koala. Off its coast lies the Great Barrier Reef, the largest reef in the world. Its biggest city is Sydney, although the capital is Canberra.',
      ],
      ca: [
        'Oceania és el continent més petit i el que menys població té. Està format per Austràlia —que ocupa gairebé tot el territori—, Nova Zelanda i milers d\'illes repartides per l\'oceà Pacífic, agrupades en tres regions: Melanèsia, Micronèsia i Polinèsia.',
        'Està gairebé sencer a l\'hemisferi sud, molt allunyat de la resta de continents. Austràlia és en gran part un desert, l\'anomenat outback, i acull animals únics com el cangur i el coala. A la seva costa hi ha la Gran Barrera de Corall, l\'escull més gran del món. La seva ciutat més gran és Sydney, encara que la capital és Canberra.',
      ],
    },
    puntosClave: {
      es: [
        'Oceanía es el continente más pequeño y menos poblado.',
        'Lo forman Australia, Nueva Zelanda y miles de islas del Pacífico.',
        'Las islas se agrupan en Melanesia, Micronesia y Polinesia.',
        'Está casi entero en el hemisferio sur.',
        'Australia tiene un gran desierto interior, el outback.',
        'Alberga animales únicos: el canguro y el koala.',
        'La Gran Barrera de Coral es el mayor arrecife del mundo.',
      ],
      en: [
        'Oceania is the smallest continent and the least populated.',
        'It is made up of Australia, New Zealand and thousands of Pacific islands.',
        'The islands are grouped into Melanesia, Micronesia and Polynesia.',
        'It is almost entirely in the southern hemisphere.',
        'Australia has a large inland desert, the outback.',
        'It is home to unique animals: the kangaroo and the koala.',
        'The Great Barrier Reef is the largest reef in the world.',
      ],
      ca: [
        'Oceania és el continent més petit i menys poblat.',
        'El formen Austràlia, Nova Zelanda i milers d\'illes del Pacífic.',
        'Les illes s\'agrupen en Melanèsia, Micronèsia i Polinèsia.',
        'Està gairebé sencer a l\'hemisferi sud.',
        'Austràlia té un gran desert interior, l\'outback.',
        'Acull animals únics: el cangur i el coala.',
        'La Gran Barrera de Corall és l\'escull més gran del món.',
      ],
    },
  },

  'espana': {
    metaTitle: {
      es: 'España: las 17 comunidades autónomas — resumen para estudiar',
      en: 'Spain: the 17 autonomous communities — a study summary',
      ca: 'Espanya: les 17 comunitats autònomes — resum per estudiar',
    },
    metaDesc: {
      es: 'La organización de España en 17 comunidades autónomas, su situación en la península ibérica, las islas, la capital y su relieve. Resumen y test de mapa.',
      en: 'How Spain is organised into 17 autonomous communities, its place on the Iberian Peninsula, the islands, the capital and its relief. Summary and map test.',
      ca: 'L\'organització d\'Espanya en 17 comunitats autònomes, la seva situació a la península ibèrica, les illes, la capital i el relleu. Resum i test de mapa.',
    },
    resumen: {
      es: [
        'España se organiza en 17 comunidades autónomas y 2 ciudades autónomas, Ceuta y Melilla. Se sitúa en el suroeste de Europa, en la península ibérica, que comparte con Portugal, e incluye además las islas Baleares (en el Mediterráneo), las islas Canarias (en el Atlántico, frente a África) y las dos ciudades del norte de África.',
        'Su capital es Madrid, en el centro del país. El relieve es muy montañoso, con una gran meseta central rodeada de cordilleras, como los Pirineos, que la separan de Francia. Cada comunidad autónoma tiene su propio gobierno y sus competencias, y algunas tienen lengua propia, como el catalán, el gallego o el euskera.',
      ],
      en: [
        'Spain is organised into 17 autonomous communities and 2 autonomous cities, Ceuta and Melilla. It lies in south-western Europe, on the Iberian Peninsula, which it shares with Portugal, and it also includes the Balearic Islands (in the Mediterranean), the Canary Islands (in the Atlantic, off Africa) and the two cities in North Africa.',
        'Its capital is Madrid, in the centre of the country. The relief is very mountainous, with a large central plateau surrounded by mountain ranges, such as the Pyrenees, which separate it from France. Each autonomous community has its own government and powers, and some have their own language, such as Catalan, Galician or Basque.',
      ],
      ca: [
        'Espanya s\'organitza en 17 comunitats autònomes i 2 ciutats autònomes, Ceuta i Melilla. Se situa al sud-oest d\'Europa, a la península ibèrica, que comparteix amb Portugal, i inclou a més les illes Balears (al Mediterrani), les illes Canàries (a l\'Atlàntic, davant d\'Àfrica) i les dues ciutats del nord d\'Àfrica.',
        'La seva capital és Madrid, al centre del país. El relleu és molt muntanyós, amb una gran meseta central envoltada de serralades, com els Pirineus, que la separen de França. Cada comunitat autònoma té el seu propi govern i les seves competències, i algunes tenen llengua pròpia, com el català, el gallec o l\'èuscar.',
      ],
    },
    puntosClave: {
      es: [
        'España tiene 17 comunidades autónomas y 2 ciudades autónomas (Ceuta y Melilla).',
        'Está en la península ibérica, que comparte con Portugal.',
        'Incluye Baleares, Canarias y las ciudades del norte de África.',
        'Su capital es Madrid, en el centro.',
        'Los Pirineos la separan de Francia.',
        'El interior es una gran meseta rodeada de montañas.',
        'Hay lenguas propias: el catalán, el gallego y el euskera.',
      ],
      en: [
        'Spain has 17 autonomous communities and 2 autonomous cities (Ceuta and Melilla).',
        'It is on the Iberian Peninsula, which it shares with Portugal.',
        'It includes the Balearics, the Canaries and the cities in North Africa.',
        'Its capital is Madrid, in the centre.',
        'The Pyrenees separate it from France.',
        'The interior is a large plateau surrounded by mountains.',
        'It has its own languages: Catalan, Galician and Basque.',
      ],
      ca: [
        'Espanya té 17 comunitats autònomes i 2 ciutats autònomes (Ceuta i Melilla).',
        'És a la península ibèrica, que comparteix amb Portugal.',
        'Inclou les Balears, les Canàries i les ciutats del nord d\'Àfrica.',
        'La seva capital és Madrid, al centre.',
        'Els Pirineus la separen de França.',
        'L\'interior és una gran meseta envoltada de muntanyes.',
        'Hi ha llengües pròpies: el català, el gallec i l\'èuscar.',
      ],
    },
  },

  'eeuu': {
    metaTitle: {
      es: 'Estados Unidos: los 50 estados — resumen para estudiar',
      en: 'The United States: the 50 states — a study summary',
      ca: 'Estats Units: els 50 estats — resum per estudiar',
    },
    metaDesc: {
      es: 'Cómo se organiza Estados Unidos en 50 estados, su capital, Alaska y Hawái, su relieve y su sistema federal. Resumen para estudiar y test de mapa.',
      en: 'How the United States is organised into 50 states, its capital, Alaska and Hawaii, its relief and its federal system. Study summary and map test.',
      ca: 'Com s\'organitzen els Estats Units en 50 estats, la seva capital, Alaska i Hawaii, el relleu i el sistema federal. Resum per estudiar i test de mapa.',
    },
    resumen: {
      es: [
        'Estados Unidos es un país de América del Norte formado por 50 estados, además de la capital federal, Washington D. C. Cuarenta y ocho estados están juntos entre Canadá y México; los otros dos están aparte: Alaska, al noroeste, y Hawái, un archipiélago en el océano Pacífico.',
        'Es uno de los países más grandes y poblados del mundo. Su territorio es muy variado: la cadena de las Montañas Rocosas al oeste, las grandes llanuras en el centro, los Grandes Lagos al norte y ríos como el Misisipi. Cada estado tiene su propio gobierno y sus leyes, dentro de un sistema federal.',
      ],
      en: [
        'The United States is a country in North America made up of 50 states, plus the federal capital, Washington D.C. Forty-eight states are together between Canada and Mexico; the other two are apart: Alaska, in the north-west, and Hawaii, an archipelago in the Pacific Ocean.',
        'It is one of the largest and most populated countries in the world. Its territory is very varied: the Rocky Mountains to the west, the great plains in the centre, the Great Lakes to the north and rivers such as the Mississippi. Each state has its own government and laws, within a federal system.',
      ],
      ca: [
        'Els Estats Units són un país d\'Amèrica del Nord format per 50 estats, a més de la capital federal, Washington D. C. Quaranta-vuit estats estan junts entre el Canadà i Mèxic; els altres dos estan a part: Alaska, al nord-oest, i Hawaii, un arxipèlag a l\'oceà Pacífic.',
        'És un dels països més grans i poblats del món. El seu territori és molt variat: la serralada de les Muntanyes Rocoses a l\'oest, les grans planes al centre, els Grans Llacs al nord i rius com el Mississipí. Cada estat té el seu propi govern i les seves lleis, dins d\'un sistema federal.',
      ],
    },
    puntosClave: {
      es: [
        'Estados Unidos tiene 50 estados; su capital es Washington D. C.',
        '48 estados están juntos, entre Canadá y México.',
        'Alaska (noroeste) y Hawái (Pacífico) están separados del resto.',
        'Es uno de los países más grandes y poblados del mundo.',
        'Relieve variado: Montañas Rocosas, grandes llanuras y Grandes Lagos.',
        'El Misisipi es uno de sus grandes ríos.',
        'Es un país federal: cada estado tiene su gobierno y sus leyes.',
      ],
      en: [
        'The United States has 50 states; its capital is Washington D.C.',
        '48 states are together, between Canada and Mexico.',
        'Alaska (north-west) and Hawaii (Pacific) are separate from the rest.',
        'It is one of the largest and most populated countries in the world.',
        'Varied relief: the Rocky Mountains, the great plains and the Great Lakes.',
        'The Mississippi is one of its great rivers.',
        'It is a federal country: each state has its own government and laws.',
      ],
      ca: [
        'Els Estats Units tenen 50 estats; la seva capital és Washington D. C.',
        '48 estats estan junts, entre el Canadà i Mèxic.',
        'Alaska (nord-oest) i Hawaii (Pacífic) estan separats de la resta.',
        'És un dels països més grans i poblats del món.',
        'Relleu variat: Muntanyes Rocoses, grans planes i Grans Llacs.',
        'El Mississipí és un dels seus grans rius.',
        'És un país federal: cada estat té el seu govern i les seves lleis.',
      ],
    },
  },

  'prehistoria': {
    metaTitle: {
      es: 'La Prehistoria: Paleolítico y Neolítico — resumen para estudiar',
      en: 'Prehistory: Palaeolithic and Neolithic — a study summary',
      ca: 'La Prehistòria: Paleolític i Neolític — resum per estudiar',
    },
    metaDesc: {
      es: 'Qué es la Prehistoria, sus dos etapas (Paleolítico y Neolítico), el paso de nómada a sedentario y el descubrimiento de la agricultura. Resumen y test.',
      en: 'What Prehistory is, its two stages (Palaeolithic and Neolithic), the shift from nomadic to settled life and the discovery of farming. Summary and test.',
      ca: 'Què és la Prehistòria, les seves dues etapes (Paleolític i Neolític), el pas de nòmada a sedentari i el descobriment de l\'agricultura. Resum i test.',
    },
    resumen: {
      es: [
        'La Prehistoria es el largo periodo que va desde la aparición de los primeros seres humanos hasta la invención de la escritura, hace unos 5000 años. Se llama así, "antes de la historia", precisamente porque no hay documentos escritos: lo que sabemos viene de los restos que dejaron, como huesos, herramientas y pinturas.',
        'Se divide en dos grandes etapas. En el Paleolítico, la "edad de la piedra antigua", los humanos eran nómadas: se movían siguiendo la caza y la recolección, vivían en cuevas y dominaron el fuego. En el Neolítico, la "edad de la piedra nueva", descubrieron la agricultura y la ganadería, y eso lo cambió todo: se volvieron sedentarios, formaron los primeros poblados y aprendieron a fabricar cerámica y tejidos.',
      ],
      en: [
        'Prehistory is the long period from the appearance of the first human beings to the invention of writing, about 5,000 years ago. It is called so, "before history", precisely because there are no written documents: what we know comes from the remains they left, such as bones, tools and paintings.',
        'It is divided into two great stages. In the Palaeolithic, the "old stone age", humans were nomads: they moved following hunting and gathering, lived in caves and mastered fire. In the Neolithic, the "new stone age", they discovered farming and herding, and that changed everything: they became settled, formed the first villages and learned to make pottery and textiles.',
      ],
      ca: [
        'La Prehistòria és el llarg període que va des de l\'aparició dels primers éssers humans fins a la invenció de l\'escriptura, fa uns 5000 anys. S\'anomena així, "abans de la història", precisament perquè no hi ha documents escrits: el que sabem ve de les restes que van deixar, com ossos, eines i pintures.',
        'Es divideix en dues grans etapes. En el Paleolític, l\'"edat de la pedra antiga", els humans eren nòmades: es movien seguint la caça i la recol·lecció, vivien en coves i van dominar el foc. En el Neolític, l\'"edat de la pedra nova", van descobrir l\'agricultura i la ramaderia, i això ho va canviar tot: es van tornar sedentaris, van formar els primers poblats i van aprendre a fabricar ceràmica i teixits.',
      ],
    },
    puntosClave: {
      es: [
        'La Prehistoria va desde los primeros humanos hasta la invención de la escritura.',
        'Se llama así porque no hay documentos escritos; se estudia por los restos.',
        'Se divide en Paleolítico y Neolítico.',
        'Paleolítico: nómadas, caza y recolección, cuevas y dominio del fuego.',
        'Neolítico: agricultura y ganadería, vida sedentaria y primeros poblados.',
        'En el Neolítico aparecen la cerámica y los tejidos.',
        'La escritura marca el final de la Prehistoria y el inicio de la Historia.',
      ],
      en: [
        'Prehistory runs from the first humans to the invention of writing.',
        'It is called so because there are no written documents; it is studied from remains.',
        'It is divided into the Palaeolithic and the Neolithic.',
        'Palaeolithic: nomads, hunting and gathering, caves and mastery of fire.',
        'Neolithic: farming and herding, settled life and the first villages.',
        'In the Neolithic, pottery and textiles appear.',
        'Writing marks the end of Prehistory and the start of History.',
      ],
      ca: [
        'La Prehistòria va des dels primers humans fins a la invenció de l\'escriptura.',
        'S\'anomena així perquè no hi ha documents escrits; s\'estudia per les restes.',
        'Es divideix en Paleolític i Neolític.',
        'Paleolític: nòmades, caça i recol·lecció, coves i domini del foc.',
        'Neolític: agricultura i ramaderia, vida sedentària i primers poblats.',
        'En el Neolític apareixen la ceràmica i els teixits.',
        'L\'escriptura marca el final de la Prehistòria i l\'inici de la Història.',
      ],
    },
  },

  'antigua': {
    metaTitle: {
      es: 'La Edad Antigua: primeras civilizaciones — resumen para estudiar',
      en: 'The Ancient Age: the first civilisations — a study summary',
      ca: 'L\'Edat Antiga: primeres civilitzacions — resum per estudiar',
    },
    metaDesc: {
      es: 'Qué es la Edad Antigua, las primeras civilizaciones junto a los ríos (Mesopotamia, Egipto), y Grecia y Roma. De la escritura al año 476. Resumen y test.',
      en: 'What the Ancient Age is, the first civilisations by the rivers (Mesopotamia, Egypt), and Greece and Rome. From writing to the year 476. Summary and test.',
      ca: 'Què és l\'Edat Antiga, les primeres civilitzacions vora els rius (Mesopotàmia, Egipte), i Grècia i Roma. De l\'escriptura a l\'any 476. Resum i test.',
    },
    resumen: {
      es: [
        'La Edad Antigua empieza con la invención de la escritura, hace unos 5000 años, y termina con la caída del Imperio romano de Occidente, en el año 476. Es la época de las primeras civilizaciones, que surgieron junto a grandes ríos: Mesopotamia, entre el Tigris y el Éufrates, y Egipto, junto al Nilo.',
        'En estas sociedades aparecieron las ciudades, los reyes, los ejércitos, la religión organizada y la escritura. Más tarde destacaron dos grandes civilizaciones del Mediterráneo: Grecia, cuna de la democracia, la filosofía y los Juegos Olímpicos, y Roma, que llegó a dominar un imperio inmenso alrededor de todo el Mediterráneo.',
      ],
      en: [
        'The Ancient Age begins with the invention of writing, about 5,000 years ago, and ends with the fall of the Western Roman Empire in the year 476. It is the age of the first civilisations, which arose by great rivers: Mesopotamia, between the Tigris and the Euphrates, and Egypt, by the Nile.',
        'In these societies cities, kings, armies, organised religion and writing appeared. Later, two great Mediterranean civilisations stood out: Greece, the cradle of democracy, philosophy and the Olympic Games, and Rome, which came to rule a vast empire around the whole Mediterranean.',
      ],
      ca: [
        'L\'Edat Antiga comença amb la invenció de l\'escriptura, fa uns 5000 anys, i acaba amb la caiguda de l\'Imperi romà d\'Occident, l\'any 476. És l\'època de les primeres civilitzacions, que van sorgir vora grans rius: Mesopotàmia, entre el Tigris i l\'Eufrates, i Egipte, vora el Nil.',
        'En aquestes societats van aparèixer les ciutats, els reis, els exèrcits, la religió organitzada i l\'escriptura. Més tard van destacar dues grans civilitzacions del Mediterrani: Grècia, bressol de la democràcia, la filosofia i els Jocs Olímpics, i Roma, que va arribar a dominar un imperi immens al voltant de tot el Mediterrani.',
      ],
    },
    puntosClave: {
      es: [
        'La Edad Antigua va de la invención de la escritura (~3000 a. C.) al año 476.',
        'Termina con la caída del Imperio romano de Occidente.',
        'Las primeras civilizaciones surgieron junto a ríos: Mesopotamia y Egipto.',
        'Aparecen las ciudades, los reyes, los ejércitos y la escritura.',
        'Grecia: cuna de la democracia, la filosofía y los Juegos Olímpicos.',
        'Roma dominó un imperio alrededor de todo el Mediterráneo.',
        'La escritura permite, por fin, tener documentos escritos.',
      ],
      en: [
        'The Ancient Age runs from the invention of writing (~3000 BC) to the year 476.',
        'It ends with the fall of the Western Roman Empire.',
        'The first civilisations arose by rivers: Mesopotamia and Egypt.',
        'Cities, kings, armies and writing appear.',
        'Greece: cradle of democracy, philosophy and the Olympic Games.',
        'Rome ruled an empire around the whole Mediterranean.',
        'Writing finally allows for written documents.',
      ],
      ca: [
        'L\'Edat Antiga va de la invenció de l\'escriptura (~3000 aC) a l\'any 476.',
        'Acaba amb la caiguda de l\'Imperi romà d\'Occident.',
        'Les primeres civilitzacions van sorgir vora rius: Mesopotàmia i Egipte.',
        'Apareixen les ciutats, els reis, els exèrcits i l\'escriptura.',
        'Grècia: bressol de la democràcia, la filosofia i els Jocs Olímpics.',
        'Roma va dominar un imperi al voltant de tot el Mediterrani.',
        'L\'escriptura permet, per fi, tenir documents escrits.',
      ],
    },
  },

  'roma': {
    metaTitle: {
      es: 'La Antigua Roma: de la República al Imperio — resumen',
      en: 'Ancient Rome: from the Republic to the Empire — a summary',
      ca: 'L\'Antiga Roma: de la República a l\'Imperi — resum',
    },
    metaDesc: {
      es: 'Las etapas de Roma (Monarquía, República e Imperio), sus obras de ingeniería, el latín y su derecho, y la caída del Imperio en el 476. Resumen y test.',
      en: 'The stages of Rome (Monarchy, Republic and Empire), its engineering, Latin and its law, and the fall of the Empire in 476. Summary and test.',
      ca: 'Les etapes de Roma (Monarquia, República i Imperi), les seves obres d\'enginyeria, el llatí i el seu dret, i la caiguda de l\'Imperi el 476. Resum i test.',
    },
    resumen: {
      es: [
        'Roma nació como una pequeña ciudad en Italia y llegó a construir uno de los mayores imperios de la historia, que rodeaba todo el Mediterráneo. Pasó por tres etapas de gobierno: primero fue una Monarquía, luego una República —gobernada por el Senado y unos cónsules elegidos— y por último un Imperio, con un emperador al frente, desde Augusto.',
        'Los romanos fueron grandes ingenieros: construyeron calzadas, acueductos, puentes, teatros y anfiteatros como el Coliseo, muchos aún en pie. Nos dejaron su lengua, el latín, del que derivan el español, el catalán, el francés o el italiano, y su derecho, base de muchas leyes actuales. El Imperio de Occidente cayó en el año 476, y con él terminó la Edad Antigua.',
      ],
      en: [
        'Rome began as a small city in Italy and came to build one of the greatest empires in history, surrounding the whole Mediterranean. It went through three forms of government: first a Monarchy, then a Republic —governed by the Senate and elected consuls— and finally an Empire, led by an emperor, from Augustus onwards.',
        'The Romans were great engineers: they built roads, aqueducts, bridges, theatres and amphitheatres like the Colosseum, many still standing. They left us their language, Latin, from which Spanish, Catalan, French and Italian derive, and their law, the basis of many present-day laws. The Western Empire fell in the year 476, and with it the Ancient Age ended.',
      ],
      ca: [
        'Roma va néixer com una petita ciutat a Itàlia i va arribar a construir un dels majors imperis de la història, que envoltava tot el Mediterrani. Va passar per tres etapes de govern: primer va ser una Monarquia, després una República —governada pel Senat i uns cònsols elegits— i finalment un Imperi, amb un emperador al capdavant, des d\'August.',
        'Els romans van ser grans enginyers: van construir calçades, aqüeductes, ponts, teatres i amfiteatres com el Colosseu, molts encara drets. Ens van deixar la seva llengua, el llatí, del qual deriven l\'espanyol, el català, el francès o l\'italià, i el seu dret, base de moltes lleis actuals. L\'Imperi d\'Occident va caure l\'any 476, i amb ell va acabar l\'Edat Antiga.',
      ],
    },
    puntosClave: {
      es: [
        'Roma pasó de ser una ciudad a dominar todo el Mediterráneo.',
        'Tres etapas: Monarquía, República e Imperio.',
        'En la República gobernaban el Senado y los cónsules.',
        'El Imperio empezó con Augusto, el primer emperador.',
        'Grandes ingenieros: calzadas, acueductos y el Coliseo.',
        'El latín es el origen del español, el catalán, el francés y el italiano.',
        'El Imperio de Occidente cayó en el 476 (fin de la Edad Antigua).',
      ],
      en: [
        'Rome went from being a city to ruling the whole Mediterranean.',
        'Three stages: Monarchy, Republic and Empire.',
        'In the Republic the Senate and the consuls governed.',
        'The Empire began with Augustus, the first emperor.',
        'Great engineers: roads, aqueducts and the Colosseum.',
        'Latin is the origin of Spanish, Catalan, French and Italian.',
        'The Western Empire fell in 476 (the end of the Ancient Age).',
      ],
      ca: [
        'Roma va passar de ser una ciutat a dominar tot el Mediterrani.',
        'Tres etapes: Monarquia, República i Imperi.',
        'A la República governaven el Senat i els cònsols.',
        'L\'Imperi va començar amb August, el primer emperador.',
        'Grans enginyers: calçades, aqüeductes i el Colosseu.',
        'El llatí és l\'origen de l\'espanyol, el català, el francès i l\'italià.',
        'L\'Imperi d\'Occident va caure el 476 (fi de l\'Edat Antiga).',
      ],
    },
  },

  'gce': {
    metaTitle: {
      es: 'La Guerra Civil Española (1936–1939) — resumen para estudiar',
      en: 'The Spanish Civil War (1936–1939) — a study summary',
      ca: 'La Guerra Civil Espanyola (1936–1939) — resum per estudiar',
    },
    metaDesc: {
      es: 'Por qué empezó la Guerra Civil Española, los dos bandos, la intervención extranjera y el resultado: la dictadura de Franco. Resumen y test con explicación.',
      en: 'Why the Spanish Civil War began, the two sides, foreign intervention and the outcome: Franco\'s dictatorship. Summary and explained test.',
      ca: 'Per què va començar la Guerra Civil Espanyola, els dos bàndols, la intervenció estrangera i el resultat: la dictadura de Franco. Resum i test amb explicació.',
    },
    resumen: {
      es: [
        'La Guerra Civil Española (1936–1939) fue el conflicto que enfrentó a dos bandos de españoles. Empezó con un golpe de Estado militar contra el gobierno de la Segunda República. El país quedó partido en dos: el bando republicano, fiel al gobierno, y el bando sublevado o nacional, liderado por el general Francisco Franco.',
        'Fue una guerra muy dura, con episodios como el bombardeo de Guernica, y en ella intervinieron potencias extranjeras: la Alemania nazi y la Italia fascista ayudaron a los sublevados. Terminó en 1939 con la victoria de Franco, que impuso una dictadura que duró casi 40 años, hasta su muerte en 1975.',
      ],
      en: [
        'The Spanish Civil War (1936–1939) was the conflict that pitted two sides of Spaniards against each other. It began with a military coup against the government of the Second Republic. The country was split in two: the Republican side, loyal to the government, and the rebel or Nationalist side, led by General Francisco Franco.',
        'It was a very harsh war, with episodes like the bombing of Guernica, and foreign powers intervened: Nazi Germany and Fascist Italy helped the rebels. It ended in 1939 with Franco\'s victory, who imposed a dictatorship that lasted almost 40 years, until his death in 1975.',
      ],
      ca: [
        'La Guerra Civil Espanyola (1936–1939) va ser el conflicte que va enfrontar dos bàndols d\'espanyols. Va començar amb un cop d\'Estat militar contra el govern de la Segona República. El país va quedar partit en dos: el bàndol republicà, fidel al govern, i el bàndol revoltat o nacional, liderat pel general Francisco Franco.',
        'Va ser una guerra molt dura, amb episodis com el bombardeig de Guernica, i hi van intervenir potències estrangeres: l\'Alemanya nazi i la Itàlia feixista van ajudar els revoltats. Va acabar el 1939 amb la victòria de Franco, que va imposar una dictadura que va durar gairebé 40 anys, fins a la seva mort el 1975.',
      ],
    },
    puntosClave: {
      es: [
        'La Guerra Civil Española duró de 1936 a 1939.',
        'Empezó con un golpe de Estado contra la Segunda República.',
        'Dos bandos: el republicano y el sublevado (nacional), de Franco.',
        'El bombardeo de Guernica es uno de sus episodios más conocidos.',
        'Intervinieron la Alemania nazi y la Italia fascista.',
        'Terminó en 1939 con la victoria de Franco.',
        'Dio paso a una dictadura de casi 40 años.',
      ],
      en: [
        'The Spanish Civil War lasted from 1936 to 1939.',
        'It began with a coup against the Second Republic.',
        'Two sides: the Republican and the rebel (Nationalist), Franco\'s.',
        'The bombing of Guernica is one of its best-known episodes.',
        'Nazi Germany and Fascist Italy intervened.',
        'It ended in 1939 with Franco\'s victory.',
        'It gave way to a dictatorship of almost 40 years.',
      ],
      ca: [
        'La Guerra Civil Espanyola va durar de 1936 a 1939.',
        'Va començar amb un cop d\'Estat contra la Segona República.',
        'Dos bàndols: el republicà i el revoltat (nacional), de Franco.',
        'El bombardeig de Guernica és un dels seus episodis més coneguts.',
        'Hi van intervenir l\'Alemanya nazi i la Itàlia feixista.',
        'Va acabar el 1939 amb la victòria de Franco.',
        'Va donar pas a una dictadura de gairebé 40 anys.',
      ],
    },
  },

  'franquismo': {
    metaTitle: {
      es: 'El Franquismo y la Transición — resumen para estudiar',
      en: 'The Franco Era and the Transition — a study summary',
      ca: 'El Franquisme i la Transició — resum per estudiar',
    },
    metaDesc: {
      es: 'La dictadura de Franco (1939–1975) y la Transición a la democracia: elecciones libres, partidos y la Constitución de 1978. Resumen y test con explicación.',
      en: 'Franco\'s dictatorship (1939–1975) and the Transition to democracy: free elections, parties and the 1978 Constitution. Summary and explained test.',
      ca: 'La dictadura de Franco (1939–1975) i la Transició a la democràcia: eleccions lliures, partits i la Constitució de 1978. Resum i test amb explicació.',
    },
    resumen: {
      es: [
        'El franquismo fue la dictadura que gobernó España desde el final de la Guerra Civil, en 1939, hasta la muerte de Francisco Franco, en 1975. Fue un régimen sin democracia: no había elecciones libres ni partidos políticos, y se perseguía a la oposición y a las lenguas y culturas distintas de la castellana.',
        'Tras la muerte de Franco llegó la Transición, el proceso por el que España pasó de la dictadura a la democracia de forma pacífica. Se legalizaron los partidos, se convocaron elecciones libres y, en 1978, se aprobó la Constitución, que sigue vigente y que organiza España como una monarquía parlamentaria.',
      ],
      en: [
        'The Franco era was the dictatorship that ruled Spain from the end of the Civil War, in 1939, until the death of Francisco Franco, in 1975. It was a regime without democracy: there were no free elections or political parties, and the opposition and any languages and cultures other than Castilian were persecuted.',
        'After Franco\'s death came the Transition, the process by which Spain moved from dictatorship to democracy peacefully. Parties were legalised, free elections were called and, in 1978, the Constitution was passed, which is still in force and organises Spain as a parliamentary monarchy.',
      ],
      ca: [
        'El franquisme va ser la dictadura que va governar Espanya des del final de la Guerra Civil, el 1939, fins a la mort de Francisco Franco, el 1975. Va ser un règim sense democràcia: no hi havia eleccions lliures ni partits polítics, i es perseguia l\'oposició i les llengües i cultures diferents de la castellana.',
        'Després de la mort de Franco va arribar la Transició, el procés pel qual Espanya va passar de la dictadura a la democràcia de manera pacífica. Es van legalitzar els partits, es van convocar eleccions lliures i, el 1978, es va aprovar la Constitució, que segueix vigent i que organitza Espanya com una monarquia parlamentària.',
      ],
    },
    puntosClave: {
      es: [
        'El franquismo fue la dictadura de Franco, de 1939 a 1975.',
        'No había elecciones libres ni partidos políticos.',
        'Se perseguía a la oposición y a las lenguas y culturas no castellanas.',
        'La Transición llevó de la dictadura a la democracia de forma pacífica.',
        'Se legalizaron los partidos y se convocaron elecciones libres.',
        'En 1978 se aprobó la Constitución, que sigue vigente.',
        'España quedó organizada como una monarquía parlamentaria.',
      ],
      en: [
        'The Franco era was Franco\'s dictatorship, from 1939 to 1975.',
        'There were no free elections or political parties.',
        'The opposition and non-Castilian languages and cultures were persecuted.',
        'The Transition led from dictatorship to democracy peacefully.',
        'Parties were legalised and free elections were called.',
        'In 1978 the Constitution was passed, still in force today.',
        'Spain was organised as a parliamentary monarchy.',
      ],
      ca: [
        'El franquisme va ser la dictadura de Franco, de 1939 a 1975.',
        'No hi havia eleccions lliures ni partits polítics.',
        'Es perseguia l\'oposició i les llengües i cultures no castellanes.',
        'La Transició va portar de la dictadura a la democràcia de manera pacífica.',
        'Es van legalitzar els partits i es van convocar eleccions lliures.',
        'El 1978 es va aprovar la Constitució, que segueix vigent.',
        'Espanya va quedar organitzada com una monarquia parlamentària.',
      ],
    },
  },

  'wwii': {
    metaTitle: {
      es: 'La Segunda Guerra Mundial (1939–1945) — resumen para estudiar',
      en: 'World War II (1939–1945) — a study summary',
      ca: 'La Segona Guerra Mundial (1939–1945) — resum per estudiar',
    },
    metaDesc: {
      es: 'Los bandos de la Segunda Guerra Mundial (Eje y Aliados), cómo empezó, el Holocausto, las bombas atómicas y la creación de la ONU. Resumen y test.',
      en: 'The sides of World War II (Axis and Allies), how it began, the Holocaust, the atomic bombs and the creation of the UN. Summary and test.',
      ca: 'Els bàndols de la Segona Guerra Mundial (Eix i Aliats), com va començar, l\'Holocaust, les bombes atòmiques i la creació de l\'ONU. Resum i test.',
    },
    resumen: {
      es: [
        'La Segunda Guerra Mundial (1939–1945) fue el conflicto más grande y mortífero de la historia. Enfrentó a dos bloques: las potencias del Eje —la Alemania nazi de Hitler, Italia y Japón— y los Aliados —Reino Unido, Francia, la Unión Soviética y Estados Unidos—. Empezó cuando Alemania invadió Polonia.',
        'Fue una guerra global, con frentes en Europa, África, Asia y el Pacífico. Dejó episodios terribles como el Holocausto, el asesinato de millones de judíos por los nazis, y terminó en 1945: primero con la rendición de Alemania y después con la de Japón, tras el lanzamiento de dos bombas atómicas sobre Hiroshima y Nagasaki. De ella nació la ONU, para intentar evitar otra guerra así.',
      ],
      en: [
        'World War II (1939–1945) was the largest and deadliest conflict in history. It pitted two blocs against each other: the Axis powers —Hitler\'s Nazi Germany, Italy and Japan— and the Allies —the United Kingdom, France, the Soviet Union and the United States—. It began when Germany invaded Poland.',
        'It was a global war, with fronts in Europe, Africa, Asia and the Pacific. It left terrible episodes such as the Holocaust, the murder of millions of Jews by the Nazis, and ended in 1945: first with Germany\'s surrender and then Japan\'s, after two atomic bombs were dropped on Hiroshima and Nagasaki. Out of it the UN was born, to try to prevent another war like it.',
      ],
      ca: [
        'La Segona Guerra Mundial (1939–1945) va ser el conflicte més gran i mortífer de la història. Va enfrontar dos blocs: les potències de l\'Eix —l\'Alemanya nazi de Hitler, Itàlia i el Japó— i els Aliats —el Regne Unit, França, la Unió Soviètica i els Estats Units—. Va començar quan Alemanya va envair Polònia.',
        'Va ser una guerra global, amb fronts a Europa, Àfrica, Àsia i el Pacífic. Va deixar episodis terribles com l\'Holocaust, l\'assassinat de milions de jueus pels nazis, i va acabar el 1945: primer amb la rendició d\'Alemanya i després la del Japó, després del llançament de dues bombes atòmiques sobre Hiroshima i Nagasaki. D\'ella va néixer l\'ONU, per intentar evitar una altra guerra així.',
      ],
    },
    puntosClave: {
      es: [
        'La Segunda Guerra Mundial duró de 1939 a 1945.',
        'Dos bloques: el Eje (Alemania, Italia, Japón) y los Aliados.',
        'Empezó con la invasión alemana de Polonia.',
        'El Holocausto: el asesinato de millones de judíos por los nazis.',
        'Fue una guerra global, con frentes en varios continentes.',
        'Terminó con las bombas atómicas sobre Hiroshima y Nagasaki (1945).',
        'Tras la guerra se creó la ONU.',
      ],
      en: [
        'World War II lasted from 1939 to 1945.',
        'Two blocs: the Axis (Germany, Italy, Japan) and the Allies.',
        'It began with the German invasion of Poland.',
        'The Holocaust: the murder of millions of Jews by the Nazis.',
        'It was a global war, with fronts on several continents.',
        'It ended with the atomic bombs on Hiroshima and Nagasaki (1945).',
        'After the war the UN was created.',
      ],
      ca: [
        'La Segona Guerra Mundial va durar de 1939 a 1945.',
        'Dos blocs: l\'Eix (Alemanya, Itàlia, Japó) i els Aliats.',
        'Va començar amb la invasió alemanya de Polònia.',
        'L\'Holocaust: l\'assassinat de milions de jueus pels nazis.',
        'Va ser una guerra global, amb fronts a diversos continents.',
        'Va acabar amb les bombes atòmiques sobre Hiroshima i Nagasaki (1945).',
        'Després de la guerra es va crear l\'ONU.',
      ],
    },
  },

  'usa': {
    metaTitle: {
      es: 'La Independencia de Estados Unidos (1776) — resumen',
      en: 'The Independence of the United States (1776) — a summary',
      ca: 'La Independència dels Estats Units (1776) — resum',
    },
    metaDesc: {
      es: 'Por qué las trece colonias se independizaron de Gran Bretaña, la Declaración de 1776, la guerra y la primera constitución moderna. Resumen y test.',
      en: 'Why the thirteen colonies became independent from Great Britain, the 1776 Declaration, the war and the first modern constitution. Summary and test.',
      ca: 'Per què les tretze colònies es van independitzar de Gran Bretanya, la Declaració de 1776, la guerra i la primera constitució moderna. Resum i test.',
    },
    resumen: {
      es: [
        'La Independencia de los Estados Unidos fue el proceso por el que trece colonias británicas de Norteamérica se separaron de Gran Bretaña y formaron un país nuevo. Los colonos estaban descontentos porque debían pagar impuestos a Gran Bretaña sin tener representación en su Parlamento: "no hay impuestos sin representación".',
        'En 1776 firmaron la Declaración de Independencia, que proclamaba que todos los hombres nacen iguales y con derechos. Siguió una guerra contra Gran Bretaña, que ganaron con ayuda de Francia. En 1787 aprobaron su Constitución, la primera constitución escrita moderna, con la separación de poderes. George Washington fue su primer presidente.',
      ],
      en: [
        'The Independence of the United States was the process by which thirteen British colonies in North America broke away from Great Britain and formed a new country. The colonists were unhappy because they had to pay taxes to Great Britain without having representation in its Parliament: "no taxation without representation".',
        'In 1776 they signed the Declaration of Independence, which proclaimed that all men are born equal and with rights. A war against Great Britain followed, which they won with France\'s help. In 1787 they passed their Constitution, the first modern written constitution, with the separation of powers. George Washington was their first president.',
      ],
      ca: [
        'La Independència dels Estats Units va ser el procés pel qual tretze colònies britàniques de Nord-amèrica es van separar de Gran Bretanya i van formar un país nou. Els colons estaven descontents perquè havien de pagar impostos a Gran Bretanya sense tenir representació al seu Parlament: "no hi ha impostos sense representació".',
        'El 1776 van signar la Declaració d\'Independència, que proclamava que tots els homes neixen iguals i amb drets. Va seguir una guerra contra Gran Bretanya, que van guanyar amb l\'ajuda de França. El 1787 van aprovar la seva Constitució, la primera constitució escrita moderna, amb la separació de poders. George Washington va ser el seu primer president.',
      ],
    },
    puntosClave: {
      es: [
        'Trece colonias británicas se independizaron de Gran Bretaña.',
        'El motivo: pagar impuestos sin tener representación en el Parlamento.',
        'En 1776 firmaron la Declaración de Independencia.',
        'Ganaron la guerra contra Gran Bretaña con ayuda de Francia.',
        'En 1787 aprobaron su Constitución, con separación de poderes.',
        'George Washington fue el primer presidente.',
        'Fue un modelo para otras revoluciones posteriores.',
      ],
      en: [
        'Thirteen British colonies became independent from Great Britain.',
        'The reason: paying taxes without representation in Parliament.',
        'In 1776 they signed the Declaration of Independence.',
        'They won the war against Great Britain with France\'s help.',
        'In 1787 they passed their Constitution, with the separation of powers.',
        'George Washington was the first president.',
        'It was a model for later revolutions.',
      ],
      ca: [
        'Tretze colònies britàniques es van independitzar de Gran Bretanya.',
        'El motiu: pagar impostos sense tenir representació al Parlament.',
        'El 1776 van signar la Declaració d\'Independència.',
        'Van guanyar la guerra contra Gran Bretanya amb l\'ajuda de França.',
        'El 1787 van aprovar la seva Constitució, amb separació de poders.',
        'George Washington va ser el primer president.',
        'Va ser un model per a altres revolucions posteriors.',
      ],
    },
  },

  'primaria': {
    metaTitle: {
      es: 'Grandes Hitos de la Historia: las edades — resumen',
      en: 'Great Milestones of History: the ages — a study summary',
      ca: 'Grans Fites de la Història: les edats — resum',
    },
    metaDesc: {
      es: 'Las grandes edades de la historia (Prehistoria, Antigua, Media, Moderna y Contemporánea) y los hitos que las separan. Resumen para estudiar y test.',
      en: 'The great ages of history (Prehistory, Ancient, Medieval, Modern and Contemporary) and the milestones that separate them. Study summary and test.',
      ca: 'Les grans edats de la història (Prehistòria, Antiga, Mitjana, Moderna i Contemporània) i les fites que les separen. Resum per estudiar i test.',
    },
    resumen: {
      es: [
        'A lo largo de la historia ha habido momentos que lo cambiaron todo: los grandes hitos. Para ordenarlos, los historiadores dividen el tiempo en grandes edades: la Prehistoria, la Edad Antigua, la Edad Media, la Edad Moderna y la Edad Contemporánea, en la que vivimos.',
        'Cada edad empieza o termina con un acontecimiento importante: la invención de la escritura, la caída del Imperio romano en el 476, el descubrimiento de América en 1492, la Revolución Francesa en 1789… Conocer estos hitos y en qué orden ocurrieron ayuda a entender cómo hemos llegado hasta hoy.',
      ],
      en: [
        'Throughout history there have been moments that changed everything: the great milestones. To order them, historians divide time into great ages: Prehistory, the Ancient Age, the Middle Ages, the Modern Age and the Contemporary Age, in which we live.',
        'Each age begins or ends with an important event: the invention of writing, the fall of the Roman Empire in 476, the discovery of America in 1492, the French Revolution in 1789… Knowing these milestones and the order in which they happened helps to understand how we got to today.',
      ],
      ca: [
        'Al llarg de la història hi ha hagut moments que ho van canviar tot: les grans fites. Per ordenar-les, els historiadors divideixen el temps en grans edats: la Prehistòria, l\'Edat Antiga, l\'Edat Mitjana, l\'Edat Moderna i l\'Edat Contemporània, en la qual vivim.',
        'Cada edat comença o acaba amb un esdeveniment important: la invenció de l\'escriptura, la caiguda de l\'Imperi romà el 476, el descobriment d\'Amèrica el 1492, la Revolució Francesa el 1789… Conèixer aquestes fites i en quin ordre van passar ajuda a entendre com hem arribat fins avui.',
      ],
    },
    puntosClave: {
      es: [
        'La historia se divide en grandes edades para ordenar el tiempo.',
        'Las edades: Prehistoria, Antigua, Media, Moderna y Contemporánea.',
        'La escritura marca el paso de la Prehistoria a la Historia.',
        'La caída de Roma (476) separa la Edad Antigua de la Media.',
        'El descubrimiento de América (1492) abre la Edad Moderna.',
        'La Revolución Francesa (1789) abre la Edad Contemporánea.',
        'Ordenar los hitos ayuda a entender cómo hemos llegado a hoy.',
      ],
      en: [
        'History is divided into great ages to order time.',
        'The ages: Prehistory, Ancient, Medieval, Modern and Contemporary.',
        'Writing marks the shift from Prehistory to History.',
        'The fall of Rome (476) separates the Ancient Age from the Medieval.',
        'The discovery of America (1492) opens the Modern Age.',
        'The French Revolution (1789) opens the Contemporary Age.',
        'Ordering the milestones helps to understand how we got to today.',
      ],
      ca: [
        'La història es divideix en grans edats per ordenar el temps.',
        'Les edats: Prehistòria, Antiga, Mitjana, Moderna i Contemporània.',
        'L\'escriptura marca el pas de la Prehistòria a la Història.',
        'La caiguda de Roma (476) separa l\'Edat Antiga de la Mitjana.',
        'El descobriment d\'Amèrica (1492) obre l\'Edat Moderna.',
        'La Revolució Francesa (1789) obre l\'Edat Contemporània.',
        'Ordenar les fites ajuda a entendre com hem arribat a avui.',
      ],
    },
  },
}
