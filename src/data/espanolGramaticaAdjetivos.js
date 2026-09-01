function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('adj-01', 'primaria',
    { es: '¿Cuál de estas palabras es un adjetivo?', en: 'Which of these words is an adjective?', ca: 'Quina d\'aquestes paraules és un adjectiu?' },
    { es: ['comer', 'verde', 'mesa', 'correr'], en: ['to eat', 'green', 'table', 'to run'], ca: ['menjar', 'verd', 'taula', 'córrer'] },
    1, '🟢',
    { es: 'El adjetivo dice cómo es el sustantivo (una cualidad). "Verde" es un color → adjetivo.', en: 'An adjective tells what the noun is like. "Verde" (green) is a colour → adjective.', ca: 'L\'adjectiu diu com és el substantiu. "Verd" és un color → adjectiu.' }),

  q('adj-02', 'primaria',
    { es: 'En "el perro grande ladra", ¿cuál es el adjetivo?', en: 'In "el perro grande ladra", which word is the adjective?', ca: 'A "el gos gran lladra", quina és l\'adjectiu?' },
    { es: ['perro', 'grande', 'ladra', 'el'], en: ['perro', 'grande', 'ladra', 'el'], ca: ['gos', 'gran', 'lladra', 'el'] },
    1, '🐕',
    { es: '"Grande" acompaña al sustantivo "perro" y dice cómo es → adjetivo. "Perro" es sustantivo y "ladra" es verbo.', en: '"Grande" (big) describes the noun "perro" → adjective.', ca: '"Gran" acompanya el substantiu "gos" i diu com és → adjectiu.' }),

  q('adj-03', 'primaria',
    { es: '¿Qué forma concuerda con "las casas"?', en: 'Which form agrees with "las casas"?', ca: 'Quina forma concorda amb "les cases"?' },
    { es: ['blanco', 'blanca', 'blancos', 'blancas'], en: ['blanco', 'blanca', 'blancos', 'blancas'], ca: ['blanc', 'blanca', 'blancs', 'blanques'] },
    3, '🏠',
    { es: 'El adjetivo concuerda en género y número con el sustantivo. "Casas" es femenino plural → "blancas".', en: 'The adjective agrees in gender and number. "Casas" is feminine plural → "blancas".', ca: 'L\'adjectiu concorda en gènere i nombre. "Cases" és femení plural → "blanques".' }),

  q('adj-04', 'primaria',
    { es: '¿Cuántos adjetivos hay en "un coche rojo y rápido"?', en: 'How many adjectives are in "un coche rojo y rápido"?', ca: 'Quants adjectius hi ha a "un cotxe vermell i ràpid"?' },
    { es: ['Ninguno', 'Uno', 'Dos', 'Tres'], en: ['None', 'One', 'Two', 'Three'], ca: ['Cap', 'Un', 'Dos', 'Tres'] },
    2, '🚗',
    { es: 'Hay dos adjetivos: "rojo" y "rápido", unidos por la conjunción "y". Ambos dicen cómo es el coche.', en: 'Two adjectives: "rojo" (red) and "rápido" (fast), joined by "y" (and).', ca: 'Dos adjectius: "vermell" i "ràpid", units per la conjunció "i".' }),

  q('adj-05', 'primaria',
    { es: '¿Cuál es el femenino de "trabajador"?', en: 'What is the feminine of "trabajador"?', ca: 'Quin és el femení de "treballador"?' },
    { es: ['trabajadora', 'trabajadera', 'trabajador', 'trabajadric'], en: ['trabajadora', 'trabajadera', 'trabajador', 'trabajadric'], ca: ['treballadora', 'treballadera', 'treballador', 'treballadric'] },
    0, '💪',
    { es: 'Los adjetivos terminados en -or forman el femenino añadiendo -a: trabajador → trabajadora, hablador → habladora.', en: 'Adjectives ending in -or add -a in the feminine: trabajador → trabajadora.', ca: 'Els adjectius acabats en -or afegeixen -a: treballador → treballadora.' }),

  q('adj-06', 'primaria',
    { es: '¿Qué forma concuerda con "las flores"?', en: 'Which form agrees with "las flores"?', ca: 'Quina forma concorda amb "les flors"?' },
    { es: ['bonito', 'bonitos', 'bonita', 'bonitas'], en: ['bonito', 'bonitos', 'bonita', 'bonitas'], ca: ['bonic', 'bonics', 'bonica', 'boniques'] },
    3, '🌸',
    { es: '"Flores" es femenino plural, así que el adjetivo también: "bonitas".', en: '"Flores" is feminine plural → "bonitas".', ca: '"Flors" és femení plural → "boniques".' }),

  q('adj-07', 'eso',
    { es: '¿Cuál es el grado superlativo de "alto"?', en: 'What is the superlative degree of "alto"?', ca: 'Quin és el grau superlatiu de "alt"?' },
    { es: ['más alto', 'altísimo', 'tan alto como', 'alto'], en: ['más alto', 'altísimo', 'tan alto como', 'alto'], ca: ['més alt', 'altíssim', 'tan alt com', 'alt'] },
    1, '📏',
    { es: 'El superlativo expresa la cualidad en su grado máximo: "altísimo" o "muy alto". "Más alto que" es comparativo.', en: 'The superlative expresses the quality at its maximum: "altísimo" (very tall). "Más alto que" is comparative.', ca: 'El superlatiu expressa la qualitat al grau màxim: "altíssim". "Més alt que" és comparatiu.' }),

  q('adj-08', 'eso',
    { es: 'Completa con la forma apocopada: "un ___ amigo" (bueno)', en: 'Complete with the shortened (apocope) form: "un ___ amigo" (bueno)', ca: 'Completa amb la forma apocopada: "un ___ amic" (bo)' },
    { es: ['bueno', 'buen', 'buena', 'bien'], en: ['bueno', 'buen', 'buena', 'bien'], ca: ['bo', 'bon', 'bona', 'bé'] },
    1, '✂️',
    { es: 'Ante un sustantivo masculino singular, "bueno" y "malo" se apocopan: "un buen amigo", "un mal día". También "grande" → "gran".', en: 'Before a masculine singular noun, "bueno" shortens to "buen": "un buen amigo".', ca: 'Davant d\'un substantiu masculí singular, "bo" s\'apocopa en "bon": "un bon amic".' }),

  q('adj-09', 'eso',
    { es: 'Comparativo de superioridad: "Ana es ___ alta ___ Luis"', en: 'Comparative of superiority: "Ana es ___ alta ___ Luis"', ca: 'Comparatiu de superioritat: "Anna és ___ alta ___ Lluís"' },
    { es: ['tan… como', 'más… que', 'menos… que', 'muy… que'], en: ['tan… como', 'más… que', 'menos… que', 'muy… que'], ca: ['tan… com', 'més… que', 'menys… que', 'molt… que'] },
    1, '⚖️',
    { es: 'La comparación de superioridad usa "más… que": "más alta que Luis". La de igualdad, "tan… como"; la de inferioridad, "menos… que".', en: 'Superiority comparison uses "más… que". Equality: "tan… como"; inferiority: "menos… que".', ca: 'La comparació de superioritat fa servir "més… que". Igualtat: "tan… com".' }),

  q('adj-10', 'eso',
    { es: 'En "la blanca nieve", el adjetivo "blanca" es un epíteto porque…', en: 'In "la blanca nieve", the adjective "blanca" is an epithet because…', ca: 'A "la blanca neu", l\'adjectiu "blanca" és un epítet perquè…' },
    { es: ['Distingue esa nieve de otra', 'Destaca una cualidad propia del sustantivo', 'Es un error de estilo', 'Cambia el significado del nombre'], en: ['It distinguishes that snow from another', 'It highlights a quality inherent to the noun', 'It is a style mistake', 'It changes the noun\'s meaning'], ca: ['Distingeix aquesta neu d\'una altra', 'Destaca una qualitat pròpia del substantiu', 'És un error d\'estil', 'Canvia el significat del nom'] },
    1, '❄️',
    { es: 'El epíteto es un adjetivo explicativo que resalta una cualidad ya propia del sustantivo (la nieve siempre es blanca). No sirve para distinguir.', en: 'An epithet is an explanatory adjective highlighting a quality the noun already has (snow is always white).', ca: 'L\'epítet és un adjectiu explicatiu que ressalta una qualitat ja pròpia del substantiu (la neu sempre és blanca).' }),

  q('adj-11', 'primaria',
    { es: "¿Cuál de estas palabras NO es un adjetivo?", en: "Which of these words is NOT an adjective?", ca: "Quina d'aquestes paraules NO és un adjectiu?" },
    { es: ["alto","feliz","ventana","azul"], en: ["alto","feliz","ventana","azul"], ca: ["alt","feliç","finestra","blau"] },
    2, '🔤',
    { es: "\"Ventana\" es un sustantivo: nombra una cosa. Los otros tres dicen cómo es algo.", en: "\"Ventana\" (window) is a noun. The other three describe what something is like.", ca: "\"Finestra\" és un substantiu: anomena una cosa. Els altres tres diuen com és alguna cosa." }),

  q('adj-12', 'primaria',
    { es: "¿Qué forma concuerda con \"el libro\"?", en: "Which form agrees with \"el libro\"?", ca: "Quina forma concorda amb \"el llibre\"?" },
    { es: ["nuevo","nueva","nuevos","nuevas"], en: ["nuevo","nueva","nuevos","nuevas"], ca: ["nou","nova","nous","noves"] },
    0, '📕',
    { es: "\"Libro\" es masculino singular, así que el adjetivo también: \"nuevo\".", en: "\"Libro\" is masculine singular → \"nuevo\".", ca: "\"Llibre\" és masculí singular, així que l'adjectiu també: \"nou\"." }),

  q('adj-13', 'primaria',
    { es: "En \"la casa vieja y oscura\", ¿cuántos adjetivos hay?", en: "In \"la casa vieja y oscura\", how many adjectives are there?", ca: "A \"la casa vella i fosca\", quants adjectius hi ha?" },
    { es: ["Uno","Dos","Tres","Ninguno"], en: ["Uno","Dos","Tres","Ninguno"], ca: ["Un","Dos","Tres","Cap"] },
    1, '🏚️',
    { es: "\"Vieja\" y \"oscura\" dicen cómo es la casa: dos adjetivos unidos por \"y\".", en: "\"Vieja\" (old) and \"oscura\" (dark) both describe the house: two adjectives.", ca: "\"Vella\" i \"fosca\" diuen com és la casa: dos adjectius units per \"i\"." }),

  q('adj-14', 'primaria',
    { es: "¿Cuál es el plural de \"feliz\"?", en: "What is the plural of \"feliz\"?", ca: "Quin és el plural de \"feliç\"?" },
    { es: ["felizes","felices","felizs","feliz"], en: ["felizes","felices","felizs","feliz"], ca: ["feliços","felices","feliçs","feliç"] },
    1, '😊',
    { es: "Las palabras acabadas en -z hacen el plural en -ces: feliz → felices, lápiz → lápices.", en: "Words ending in -z form the plural with -ces: feliz → felices.", ca: "Les paraules acabades en -z fan el plural en -ces: feliz → felices." }),

  q('adj-15', 'primaria',
    { es: "¿Qué adjetivo pega con \"el sol\"?", en: "Which adjective fits \"el sol\"?", ca: "Quin adjectiu va bé amb \"el sol\"?" },
    { es: ["brillante","brillantes","brillanta","brillantos"], en: ["brillante","brillantes","brillanta","brillantos"], ca: ["brillant","brillants","brillanta","brillantos"] },
    0, '☀️',
    { es: "\"Sol\" es singular, así que el adjetivo va en singular. \"Brillante\" vale para masculino y femenino.", en: "\"Sol\" is singular → \"brillante\", which works for both genders.", ca: "\"Sol\" és singular, així que l'adjectiu va en singular." }),

  q('adj-16', 'primaria',
    { es: "En \"un día frío\", ¿qué palabra es el adjetivo?", en: "In \"un día frío\", which word is the adjective?", ca: "A \"un dia fred\", quina paraula és l'adjectiu?" },
    { es: ["un","día","frío","ninguna"], en: ["un","día","frío","ninguna"], ca: ["un","dia","fred","cap"] },
    2, '🥶',
    { es: "\"Frío\" dice cómo es el día. \"Un\" es un determinante y \"día\" el sustantivo.", en: "\"Frío\" (cold) describes the day. \"Un\" is a determiner and \"día\" the noun.", ca: "\"Fred\" diu com és el dia. \"Un\" és un determinant i \"dia\" el substantiu." }),

  q('adj-17', 'eso',
    { es: "¿Qué grado expresa \"tan rápido como\"?", en: "Which degree does \"tan rápido como\" express?", ca: "Quin grau expressa \"tan ràpid com\"?" },
    { es: ["Comparativo de igualdad","Comparativo de superioridad","Superlativo","Positivo"], en: ["Comparativo de igualdad","Comparativo de superioridad","Superlativo","Positivo"], ca: ["Comparatiu d'igualtat","Comparatiu de superioritat","Superlatiu","Positiu"] },
    0, '⚖️',
    { es: "\"Tan… como\" compara dos cosas que están al mismo nivel: comparativo de igualdad.", en: "\"Tan… como\" compares two things at the same level: comparative of equality.", ca: "\"Tan… com\" compara dues coses al mateix nivell: comparatiu d'igualtat." }),

  q('adj-18', 'eso',
    { es: "¿Cuál es la forma apocopada de \"grande\" ante un sustantivo?", en: "What is the shortened form of \"grande\" before a noun?", ca: "Quina és la forma apocopada de \"gran\" davant d'un substantiu?" },
    { es: ["grand","gran","grandes","grando"], en: ["grand","gran","grandes","grando"], ca: ["grand","gran","grans","grando"] },
    1, '✂️',
    { es: "Ante un sustantivo singular, \"grande\" se apocopa: \"un gran hombre\", \"una gran idea\". Vale para los dos géneros.", en: "Before a singular noun, \"grande\" shortens to \"gran\": \"un gran hombre\".", ca: "Davant d'un substantiu singular, \"gran\" s'apocopa igual en tots dos gèneres." }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
