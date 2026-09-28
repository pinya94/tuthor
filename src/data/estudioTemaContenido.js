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
}
