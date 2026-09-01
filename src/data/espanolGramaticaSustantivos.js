function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('sn-01', 'primaria',
    { es: '¿Cuál de estas palabras es un sustantivo?', en: 'Which of these words is a noun?', ca: 'Quina d\'aquestes paraules és un substantiu?' },
    { es: ['correr', 'azul', 'casa', 'rápido'], en: ['to run', 'blue', 'house', 'fast'], ca: ['córrer', 'blau', 'casa', 'ràpid'] },
    2, '🏠',
    { es: 'Los sustantivos nombran personas, animales, lugares o cosas. "Casa" es una cosa → sustantivo.', en: 'Nouns name people, animals, places or things. "Casa" (house) is a thing → noun.', ca: 'Els substantius anomenen persones, animals, llocs o coses. "Casa" és una cosa → substantiu.' }),

  q('sn-02', 'primaria',
    { es: '¿Cuál es el plural de "árbol"?', en: 'What is the plural of "árbol"?', ca: 'Quin és el plural de "árbol"?' },
    { es: ['árboles', 'árbols', 'arbolses', 'árboles'], en: ['árboles', 'árbols', 'arbolses', 'arboleses'], ca: ['arbres', 'árbols', 'arbolses', 'árbolos'] },
    0, '🌳',
    { es: 'Las palabras terminadas en consonante forman el plural añadiendo -es: árbol → árboles, papel → papeles, mes → meses.', en: 'Words ending in a consonant form the plural by adding -es: árbol→árboles.', ca: 'Les paraules acabades en consonant formen el plural afegint -es: árbol→árboles.' }),

  q('sn-03', 'primaria',
    { es: '¿Cuál es el plural de "pez"?', en: 'What is the plural of "pez"?', ca: 'Quin és el plural de "pez"?' },
    { es: ['pezs', 'peces', 'pezas', 'pezos'], en: ['pezs', 'peces', 'pezas', 'pezos'], ca: ['pezs', 'peces', 'pezas', 'pezos'] },
    1, '🐟',
    { es: 'Las palabras terminadas en -z forman el plural cambiando z→c y añadiendo -es: pez→peces, vez→veces, luz→luces.', en: 'Words ending in -z change to -ces in plural: pez→peces.', ca: 'Les paraules acabades en -z canvien a -ces: pez→peces.' }),

  q('sn-04', 'primaria',
    { es: '¿Qué género tiene la palabra "mano"?', en: 'What gender does the word "mano" have?', ca: 'Quin gènere té la paraula "mano"?' },
    { es: ['Masculino', 'Femenino', 'Neutro', 'Variable'], en: ['Masculine', 'Feminine', 'Neutral', 'Variable'], ca: ['Masculí', 'Femení', 'Neutre', 'Variable'] },
    1, '✋',
    { es: '"La mano" es femenino aunque termina en -o. Excepciones conocidas: la mano, la foto, la moto, la radio, la disco.', en: '"La mano" is feminine despite ending in -o. Exceptions: la mano, la foto, la moto.', ca: '"La mano" és femení tot i acabar en -o. Excepcions: la mano, la foto, la moto.' }),

  q('sn-05', 'primaria',
    { es: '¿Cuál de estos es un sustantivo propio?', en: 'Which of these is a proper noun?', ca: 'Quin d\'aquests és un substantiu propi?' },
    { es: ['ciudad', 'perro', 'Madrid', 'libro'], en: ['city', 'dog', 'Madrid', 'book'], ca: ['ciutat', 'gos', 'Madrid', 'llibre'] },
    2, '🏙️',
    { es: 'Los sustantivos propios nombran personas, ciudades o lugares concretos y se escriben con mayúscula: Madrid, Pedro, España.', en: 'Proper nouns name specific people or places and are capitalised: Madrid, Pedro, Spain.', ca: 'Els substantius propis nomenen persones o llocs concrets i s\'escriuen amb majúscula: Madrid, Pere, Espanya.' }),

  q('sn-06', 'primaria',
    { es: '¿Cuál es el femenino de "actor"?', en: 'What is the feminine of "actor"?', ca: 'Quin és el femení de "actor"?' },
    { es: ['actora', 'actriz', 'actra', 'actoressa'], en: ['actora', 'actress', 'actra', 'actoressa'], ca: ['actora', 'actriu', 'actra', 'actoressa'] },
    1, '🎭',
    { es: '"Actriz" es el femenino irregular de "actor". Otros irregulares: rey→reina, héroe→heroína, gallo→gallina, caballo→yegua.', en: '"Actriz" is the irregular feminine of "actor". Other irregulars: rey→reina.', ca: '"Actriu" és el femení irregular de "actor". Altres irregulars: rei→reina.' }),

  q('sn-07', 'primaria',
    { es: '¿Cuál de estos es un sustantivo colectivo?', en: 'Which of these is a collective noun?', ca: 'Quin d\'aquests és un substantiu col·lectiu?' },
    { es: ['árbol', 'bosque', 'hoja', 'rama'], en: ['tree', 'forest', 'leaf', 'branch'], ca: ['arbre', 'bosc', 'fulla', 'branca'] },
    1, '🌲',
    { es: 'Los sustantivos colectivos nombran un conjunto de seres en singular: bosque (árboles), rebaño (ovejas), cardumen (peces), enjambre (abejas).', en: '"Bosque" (forest) = collective noun for trees. Colectivos: rebaño, cardumen, enjambre.', ca: '"Bosc" = substantiu col·lectiu per als arbres. Col·lectius: ramat, banc (de peixos), eixam.' }),

  q('sn-08', 'primaria',
    { es: '¿Cuál de estos es un sustantivo abstracto?', en: 'Which of these is an abstract noun?', ca: 'Quin d\'aquests és un substantiu abstracte?' },
    { es: ['mesa', 'perro', 'amor', 'ciudad'], en: ['table', 'dog', 'love', 'city'], ca: ['taula', 'gos', 'amor', 'ciutat'] },
    2, '❤️',
    { es: 'Los sustantivos abstractos no se pueden tocar ni ver: amor, odio, felicidad, libertad, justicia. Los concretos sí: mesa, perro, ciudad.', en: 'Abstract nouns cannot be seen or touched: amor (love), felicidad (happiness). Concrete nouns can.', ca: 'Els substantius abstractes no es poden tocar: amor, odi, felicitat, llibertat, justícia.' }),

  q('sn-09', 'eso',
    { es: '¿Cuál es el aumentativo de "casa"?', en: 'What is the augmentative of "casa"?', ca: 'Quin és l\'augmentatiu de "casa"?' },
    { es: ['casita', 'casucha', 'casona', 'caserón'], en: ['casita', 'casucha', 'casona', 'caserón'], ca: ['caseta', 'casucha', 'casona', 'caserón'] },
    2, '🏰',
    { es: 'Los aumentativos indican tamaño grande: casona, cochazo, golazo. Los diminutivos, tamaño pequeño o cariño: casita, cochito. Los despectivos, desprecio: casucha.', en: 'Augmentatives indicate large size: casona (big house). Diminutives: casita (small house). Pejoratives: casucha (dump).', ca: 'Augmentatius (mida gran): casona. Diminutius (mida petita): caseta. Pejoratius (menyspreu): casucha.' }),

  q('sn-10', 'eso',
    { es: '¿Cuál es el plural de "hipótesis"?', en: 'What is the plural of "hipótesis"?', ca: 'Quin és el plural de "hipótesis"?' },
    { es: ['hipótesises', 'hipótesiss', 'hipótesis', 'hipótesies'], en: ['hipótesises', 'hipótesiss', 'hipótesis', 'hipótesies'], ca: ['hipótesises', 'hipótesiss', 'hipótesis', 'hipótesies'] },
    2, '🔬',
    { es: 'Las palabras esdrújulas y llanas terminadas en -s son invariables en plural: la hipótesis / las hipótesis, la crisis / las crisis, el virus / los virus.', en: 'Words ending in -s (already stressed on the penultimate syllable) do not change in plural: la hipótesis / las hipótesis.', ca: 'Les paraules acabades en -s (planes o esdrúixoles) no canvien en plural: la hipòtesi / les hipòtesis.' }),

  q('sn-11', 'eso',
    { es: '¿Qué género tiene la palabra "el calor"?', en: 'What gender does "el calor" have?', ca: 'Quin gènere té "el calor"?' },
    { es: ['Siempre femenino', 'Siempre masculino', 'Puede ser masculino o femenino', 'No tiene género'], en: ['Always feminine', 'Always masculine', 'Can be either', 'Has no gender'], ca: ['Sempre femení', 'Sempre masculí', 'Pot ser masculí o femení', 'No té gènere'] },
    2, '🌡️',
    { es: '"El calor" se usa normalmente en masculino, pero en algunas zonas y registros también se dice "la calor" (femenino). En estándar: masculino.', en: '"Calor" is standard masculine (el calor) but feminine in some regions (la calor). Standard: masculine.', ca: '"La calor" és femení en català. En castellà estàndard és masculí: el calor.' }),

  q('sn-12', 'eso',
    { es: '¿Cuál de estos sustantivos es epiceno?', en: 'Which of these nouns is epicene (same form for both genders)?', ca: 'Quin d\'aquests substantius és epicè?' },
    { es: ['actor', 'juez', 'serpiente', 'médico'], en: ['actor', 'judge', 'snake', 'doctor'], ca: ['actor', 'jutge', 'serp', 'metge'] },
    2, '🐍',
    { es: 'Los sustantivos epicenos tienen una sola forma para los dos géneros: la serpiente (macho/hembra), el águila, la jirafa. Para distinguir: "la serpiente macho / hembra".', en: 'Epicene nouns have one form for both sexes: la serpiente (male/female snake). Add macho/hembra to specify.', ca: 'Els substantius epicens tenen una sola forma per als dos sexes: la serp (mascle/femella).' }),

  q('sn-13', 'eso',
    { es: '¿Cuál es el plural de "régimen"?', en: 'What is the plural of "régimen"?', ca: 'Quin és el plural de "régimen"?' },
    { es: ['régimens', 'régimenez', 'regímenes', 'régimenes'], en: ['régimens', 'régimenez', 'regímenes', 'régimenes'], ca: ['régimens', 'régimenez', 'regímenes', 'régimenes'] },
    2, '📋',
    { es: '"Régimen" forma el plural "regímenes" y desplaza el acento: RÉ-gi-men → re-GÍ-me-nes. Igual que "espécimen" → "especímenes", "carácter" → "caracteres".', en: '"Régimen" → "regímenes" — the stress shifts in the plural. Same with espécimen→especímenes.', ca: '"Règim" → "règims" en català. En castellà: "régimen" → "regímenes" (l\'accent es desplaça).' }),

  q('sn-14', 'eso',
    { es: 'El sustantivo "mar" puede ser:',  en: 'The noun "mar" can be:', ca: 'El substantiu "mar" pot ser:' },
    { es: ['Solo masculino', 'Solo femenino', 'Masculino o femenino según el contexto', 'Neutro'], en: ['Only masculine', 'Only feminine', 'Masculine or feminine depending on context', 'Neutral'], ca: ['Només masculí', 'Només femení', 'Masculí o femení segons el context', 'Neutre'] },
    2, '🌊',
    { es: '"Mar" es ambiguo en género: "el mar" (general) / "la mar" (en poesía, náutica y expresiones: "la mar de bien", "alta mar").', en: '"Mar" is gender-ambiguous: "el mar" (general use) / "la mar" (poetry, nautical, idioms: "alta mar").', ca: '"Mar" és ambigu en gènere: "el mar" (general) / "la mar" (poesia, nàutica, expressions).' }),

  q('sn-15', 'eso',
    { es: '¿Cuál es el plural correcto de "fax"?', en: 'What is the correct plural of "fax"?', ca: 'Quin és el plural correcte de "fax"?' },
    { es: ['faxes', 'faxs', 'fax', 'facess'], en: ['faxes', 'faxs', 'fax', 'facess'], ca: ['faxos', 'faxs', 'fax', 'faxes'] },
    0, '📠',
    { es: 'Las palabras terminadas en -x añaden -es para formar el plural: fax→faxes, relax→relaxes. Aunque en el uso coloquial se tiende a la forma invariable.', en: 'Words ending in -x add -es: fax→faxes, relax→relaxes.', ca: 'Les paraules acabades en -x: en català "faxos"; en castellà "faxes".' }),

  q('sn-16', 'primaria',
    { es: "¿Qué es un sustantivo común?", en: "What is a common noun?", ca: "Què és un substantiu comú?" },
    { es: ["El que nombra a un ser concreto con nombre propio","El que nombra a cualquier ser de una clase","El que acompaña al verbo","El que indica cantidad"], en: ["One naming a specific being by its own name","One naming any being of a class","One accompanying the verb","One showing quantity"], ca: ["El que anomena un ésser concret amb nom propi","El que anomena qualsevol ésser d'una classe","El que acompanya el verb","El que indica quantitat"] },
    1, '🏷️',
    { es: "\"Perro\" vale para cualquier perro: es común. \"Toby\" nombra a uno concreto: es propio, y por eso va en mayúscula.", en: "\"Perro\" (dog) names any dog: common. \"Toby\" names one: proper, hence the capital letter.", ca: "\"Gos\" val per a qualsevol gos: és comú. \"Toby\" n'anomena un de concret: és propi." }),

  q('sn-17', 'primaria',
    { es: "¿Cuál es el plural de \"lápiz\"?", en: "What is the plural of \"lápiz\"?", ca: "Quin és el plural de \"lápiz\"?" },
    { es: ["lápizes","lápices","lápizs","lápiz"], en: ["lápizes","lápices","lápizs","lápiz"], ca: ["lápizes","lápices","lápizs","lápiz"] },
    1, '✏️',
    { es: "Las palabras acabadas en -z cambian la z por c y añaden -es: lápiz → lápices, pez → peces.", en: "Words ending in -z change z to c and add -es: lápiz → lápices.", ca: "Les paraules acabades en -z canvien la z per c i afegeixen -es." }),

  q('sn-18', 'primaria',
    { es: "¿Qué género tiene \"el mapa\"?", en: "What gender is \"el mapa\"?", ca: "Quin gènere té \"el mapa\"?" },
    { es: ["Femenino","Masculino","Neutro","Los dos"], en: ["Feminine","Masculine","Neuter","Both"], ca: ["Femení","Masculí","Neutre","Tots dos"] },
    1, '🗺️',
    { es: "Acaba en -a pero es masculino: el mapa, el día, el problema. La terminación no siempre marca el género, y por eso conviene fijarse en el artículo.", en: "It ends in -a but is masculine: el mapa, el día, el problema. The ending does not always mark gender.", ca: "Acaba en -a però és masculí: el mapa, el día, el problema." }),

  q('sn-19', 'primaria',
    { es: "¿Cuál de estas palabras es un sustantivo colectivo?", en: "Which of these is a collective noun?", ca: "Quina d'aquestes és un substantiu col·lectiu?" },
    { es: ["árbol","rebaño","correr","alto"], en: ["árbol","rebaño","correr","alto"], ca: ["arbre","ramat","córrer","alt"] },
    1, '🐑',
    { es: "Un colectivo nombra en singular a un conjunto: rebaño (ovejas), enjambre (abejas), arboleda (árboles).", en: "A collective noun names a group in the singular: rebaño (flock), enjambre (swarm).", ca: "Un col·lectiu anomena en singular un conjunt: ramat, eixam, arbreda." }),

  q('sn-20', 'primaria',
    { es: "¿Qué tipo de sustantivo es \"alegría\"?", en: "What kind of noun is \"alegría\"?", ca: "Quin tipus de substantiu és \"alegria\"?" },
    { es: ["Concreto","Abstracto","Propio","Colectivo"], en: ["Concrete","Abstract","Proper","Collective"], ca: ["Concret","Abstracte","Propi","Col·lectiu"] },
    1, '💭',
    { es: "Los abstractos nombran lo que no se puede tocar ni ver: alegría, amistad, libertad. Los concretos sí: mesa, perro, agua.", en: "Abstract nouns name what cannot be touched: joy, friendship, freedom.", ca: "Els abstractes anomenen allò que no es pot tocar: alegria, amistat, llibertat." }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
