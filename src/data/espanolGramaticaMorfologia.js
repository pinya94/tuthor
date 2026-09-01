function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('mor-01', 'primaria',
    { es: '¿Qué género tiene "el árbol"?', en: 'What gender does "el árbol" have?', ca: 'Quin gènere té "l\'arbre"?' },
    { es: ['Masculino', 'Femenino', 'Neutro', 'No tiene'], en: ['Masculine', 'Feminine', 'Neutral', 'None'], ca: ['Masculí', 'Femení', 'Neutre', 'No en té'] },
    0, '🌳',
    { es: 'Lleva el artículo "el" → masculino. El género se reconoce por el artículo: el (masculino), la (femenino).', en: 'It takes "el" → masculine. Gender is shown by the article: el / la.', ca: 'Porta l\'article masculí → masculí. El gènere es reconeix per l\'article.' }),

  q('mor-02', 'primaria',
    { es: '¿Cuál es el femenino de "niño"?', en: 'What is the feminine of "niño"?', ca: 'Quin és el femení de "nen"?' },
    { es: ['niña', 'niñe', 'niños', 'niñas'], en: ['niña', 'niñe', 'niños', 'niñas'], ca: ['nena', 'niñe', 'nens', 'nenes'] },
    0, '👧',
    { es: 'Muchos sustantivos forman el femenino cambiando la -o por -a: niño→niña, gato→gata, maestro→maestra.', en: 'Many nouns form the feminine by changing -o to -a: niño→niña.', ca: 'Molts substantius formen el femení canviant -o per -a: nen→nena.' }),

  q('mor-03', 'primaria',
    { es: '¿Cuál es el plural de "casa"?', en: 'What is the plural of "casa"?', ca: 'Quin és el plural de "casa"?' },
    { es: ['casas', 'cases', 'casaes', 'casos'], en: ['casas', 'cases', 'casaes', 'casos'], ca: ['cases', 'casas', 'casaes', 'casos'] },
    0, '🏠',
    { es: 'Las palabras acabadas en vocal forman el plural añadiendo -s: casa→casas, perro→perros, café→cafés.', en: 'Words ending in a vowel add -s: casa→casas.', ca: 'En català, "casa" → "cases".' }),

  q('mor-04', 'primaria',
    { es: '¿Cuál es el plural de "papel"?', en: 'What is the plural of "papel"?', ca: 'Quin és el plural de "paper"?' },
    { es: ['papels', 'papeles', 'papelas', 'papelses'], en: ['papels', 'papeles', 'papelas', 'papelses'], ca: ['papers', 'papeles', 'papelas', 'paperes'] },
    1, '📄',
    { es: 'Las palabras acabadas en consonante forman el plural añadiendo -es: papel→papeles, mes→meses, reloj→relojes.', en: 'Words ending in a consonant add -es: papel→papeles.', ca: 'En català, "paper" → "papers".' }),

  q('mor-05', 'primaria',
    { es: '¿Qué número tiene la palabra "flores"?', en: 'What number does the word "flores" have?', ca: 'Quin nombre té la paraula "flors"?' },
    { es: ['Singular', 'Plural', 'Ninguno', 'Los dos'], en: ['Singular', 'Plural', 'None', 'Both'], ca: ['Singular', 'Plural', 'Cap', 'Tots dos'] },
    1, '🌺',
    { es: '"Flores" nombra varias cosas → plural. El número puede ser singular (una) o plural (varias).', en: '"Flores" names several things → plural.', ca: '"Flors" anomena diverses coses → plural.' }),

  q('mor-06', 'primaria',
    { es: '¿Cuál es el femenino de "el gallo"?', en: 'What is the feminine of "el gallo"?', ca: 'Quin és el femení de "el gall"?' },
    { es: ['la galla', 'la gallina', 'la gallo', 'la galla'], en: ['la galla', 'la gallina', 'la gallo', 'la gaila'], ca: ['la galla', 'la gallina', 'la gallo', 'la gaila'] },
    1, '🐔',
    { es: '"Gallina" es el femenino irregular de "gallo": no sigue la regla -o/-a. Otros: caballo→yegua, toro→vaca, rey→reina.', en: '"Gallina" is the irregular feminine of "gallo".', ca: '"Gallina" és el femení irregular de "gall".' }),

  q('mor-07', 'eso',
    { es: '¿Qué género tiene "la mano"?', en: 'What gender does "la mano" have?', ca: 'Quin gènere té "la mà"?' },
    { es: ['Masculino', 'Femenino', 'Neutro', 'Ambiguo'], en: ['Masculine', 'Feminine', 'Neutral', 'Ambiguous'], ca: ['Masculí', 'Femení', 'Neutre', 'Ambigu'] },
    1, '✋',
    { es: '"La mano" es femenino aunque acabe en -o. La terminación no siempre marca el género: la mano, la foto, la moto, el día, el mapa.', en: '"La mano" is feminine despite ending in -o. The ending does not always mark gender.', ca: 'La terminació no sempre marca el gènere: "la mà" (femení).' }),

  q('mor-08', 'eso',
    { es: '¿Cuál es el plural de "el lunes"?', en: 'What is the plural of "el lunes"?', ca: 'Quin és el plural de "el dilluns"?' },
    { es: ['los luneses', 'los lunes', 'los luness', 'los lunas'], en: ['los luneses', 'los lunes', 'los luness', 'los lunas'], ca: ['els dillunses', 'els dilluns', 'els dillunss', 'els dillunes'] },
    1, '📆',
    { es: 'Las palabras llanas o esdrújulas acabadas en -s no cambian: el lunes / los lunes, la crisis / las crisis, el paraguas / los paraguas.', en: 'Words ending in -s (stressed before the last syllable) do not change: el lunes / los lunes.', ca: 'Les paraules planes acabades en -s no canvien: el dilluns / els dilluns.' }),

  q('mor-09', 'eso',
    { es: 'Un sustantivo "epiceno" (como "la víctima") es el que…', en: 'An "epicene" noun (like "la víctima") is one that…', ca: 'Un substantiu "epicè" (com "la víctima") és el que…' },
    { es: ['Tiene una sola forma para ambos sexos', 'Cambia con el artículo', 'No tiene plural', 'Es siempre masculino'], en: ['Has one form for both sexes', 'Changes with the article', 'Has no plural', 'Is always masculine'], ca: ['Té una sola forma per als dos sexes', 'Canvia amb l\'article', 'No té plural', 'És sempre masculí'] },
    0, '🦎',
    { es: 'Los epicenos tienen un solo género gramatical para macho y hembra: la víctima, el personaje, la jirafa. Se aclara con "macho/hembra" o el contexto.', en: 'Epicene nouns keep one grammatical gender for both sexes: la víctima, el personaje.', ca: 'Els epicens tenen un sol gènere gramatical per als dos sexes: la víctima, la girafa.' }),

  q('mor-10', 'eso',
    { es: '¿Cuál es el plural de "el rubí"?', en: 'What is the plural of "el rubí"?', ca: 'Quin és el plural de "el robí"?' },
    { es: ['los rubís', 'los rubíes', 'los rubises', 'los rubis'], en: ['los rubís', 'los rubíes', 'los rubises', 'los rubis'], ca: ['els robins', 'els robíes', 'els robises', 'els robis'] },
    1, '💎',
    { es: 'Las palabras acabadas en -í o -ú tónicas admiten -es (y a veces -s): rubí→rubíes, jabalí→jabalíes. Se prefiere la forma culta en -es.', en: 'Words ending in stressed -í add -es: rubí→rubíes.', ca: 'En català, "robí" → "robins".' }),

  q('mor-11', 'primaria',
    { es: "¿Qué parte de \"niños\" es la raíz?", en: "Which part of \"niños\" is the root?", ca: "Quina part de \"nens\" és l'arrel?" },
    { es: ["niñ-","-os","ni-","niños"], en: ["niñ-","-os","ni-","niños"], ca: ["nen-","-s","ne-","nens"] },
    0, '🌱',
    { es: "La raíz es la parte que guarda el significado y no cambia: niñ- en niño, niña, niñez.", en: "The root carries the meaning and does not change: niñ- in niño, niña, niñez.", ca: "L'arrel guarda el significat i no canvia." }),

  q('mor-12', 'primaria',
    { es: "En \"gatito\", ¿qué añade el sufijo \"-ito\"?", en: "In \"gatito\", what does the suffix \"-ito\" add?", ca: "A \"gatet\", què afegeix el sufix \"-et\"?" },
    { es: ["Que es grande","Que es pequeño","Que son varios","Que es femenino"], en: ["Que es grande","Que es pequeño","Que son varios","Que es femenino"], ca: ["Que és gran","Que és petit","Que són uns quants","Que és femení"] },
    1, '🐱',
    { es: "\"-ito\" e \"-illo\" son sufijos diminutivos: hacen pequeño lo que nombra la palabra.", en: "\"-ito\" is a diminutive suffix: it makes the thing small.", ca: "\"-et\" és un sufix diminutiu: fa petit allò que anomena la paraula." }),

  q('mor-13', 'primaria',
    { es: "¿Cuántas sílabas tiene \"ventana\"?", en: "How many syllables does \"ventana\" have?", ca: "Quantes síl·labes té \"finestra\"?" },
    { es: ["Dos","Tres","Cuatro","Una"], en: ["Dos","Tres","Cuatro","Una"], ca: ["Dues","Tres","Quatre","Una"] },
    1, '🔢',
    { es: "Ven-ta-na: tres sílabas. Cada sílaba es un golpe de voz.", en: "Ven-ta-na: three syllables, one beat each.", ca: "Fi-nes-tra: tres síl·labes. Cada síl·laba és un cop de veu." }),

  q('mor-14', 'primaria',
    { es: "¿Qué palabra lleva prefijo?", en: "Which word has a prefix?", ca: "Quina paraula porta prefix?" },
    { es: ["casita","deshacer","panadero","rápidamente"], en: ["casita","deshacer","panadero","rápidamente"], ca: ["caseta","desfer","forner","ràpidament"] },
    1, '⬅️',
    { es: "El prefijo va DELANTE de la raíz: des- + hacer. Los otros llevan sufijo, que va detrás.", en: "A prefix goes BEFORE the root: des- + hacer. The others take suffixes.", ca: "El prefix va DAVANT de l'arrel: des- + fer." }),

  q('mor-15', 'primaria',
    { es: "¿Qué indica la terminación \"-s\" en \"libros\"?", en: "What does the ending \"-s\" show in \"libros\"?", ca: "Què indica la terminació \"-s\" a \"llibres\"?" },
    { es: ["El género","El número plural","El tiempo","La persona"], en: ["El género","El número plural","El tiempo","La persona"], ca: ["El gènere","El nombre plural","El temps","La persona"] },
    1, '📚',
    { es: "La -s marca el número: un libro / varios libros. El género lo marca la -o o la -a.", en: "The -s marks number: one book / several books.", ca: "La -s marca el nombre: un llibre / uns quants llibres." }),

  q('mor-16', 'primaria',
    { es: "¿Cuál de estas palabras es compuesta?", en: "Which of these words is a compound?", ca: "Quina d'aquestes paraules és composta?" },
    { es: ["sacacorchos","corriendo","librería","pequeño"], en: ["sacacorchos","corriendo","librería","pequeño"], ca: ["llevataps","corrent","llibreria","petit"] },
    0, '🔧',
    { es: "Una palabra compuesta se forma juntando dos palabras: saca + corchos. \"Librería\" no: es raíz más sufijo.", en: "A compound joins two words: saca + corchos. \"Librería\" is root + suffix.", ca: "Una paraula composta ajunta dues paraules: lleva + taps." }),

  q('mor-17', 'eso',
    { es: "¿Qué son los morfemas flexivos?", en: "What are inflectional morphemes?", ca: "Què són els morfemes flexius?" },
    { es: ["Los que crean palabras nuevas","Los que marcan género, número, tiempo o persona sin crear una palabra nueva","Las raíces","Los prefijos"], en: ["Los que crean palabras nuevas","Los que marcan género, número, tiempo o persona sin crear una palabra nueva","Las raíces","Los prefijos"], ca: ["Els que creen paraules noves","Els que marquen gènere, nombre, temps o persona sense crear una paraula nova","Les arrels","Els prefixos"] },
    1, '🔁',
    { es: "\"Gato / gata / gatos\" es la misma palabra flexionada. \"Gatuno\" sí es una palabra nueva: eso es derivación.", en: "\"Gato/gata/gatos\" is the same word inflected; \"gatuno\" is a new word (derivation).", ca: "\"Gat / gata / gats\" és la mateixa paraula flexionada; \"gatí\" és una paraula nova." }),

  q('mor-18', 'eso',
    { es: "En \"panadería\", ¿cuál es el proceso de formación?", en: "In \"panadería\", which word-formation process is used?", ca: "A \"forneria\", quin és el procés de formació?" },
    { es: ["Composición","Derivación por sufijo","Acronimia","Flexión"], en: ["Composición","Derivación por sufijo","Acronimia","Flexión"], ca: ["Composició","Derivació per sufix","Acronímia","Flexió"] },
    1, '🥖',
    { es: "Pan + -adería: se añade un sufijo a la raíz y nace una palabra nueva. Eso es derivación, no composición (que junta dos palabras enteras).", en: "Pan + -adería: a suffix creates a new word — derivation, not composition.", ca: "S'afegeix un sufix a l'arrel i neix una paraula nova: derivació, no composició." }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
