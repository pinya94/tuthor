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
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
