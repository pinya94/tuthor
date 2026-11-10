// Páginas de estudio de vocabulario (gramática española):
//   /estudiar/idiomas/espanol/gramatica/sinonimos-antonimos
//   /estudiar/idiomas/espanol/gramatica/prefijos-sufijos
// Mucha demanda escolar (autocompletado: «sinónimos y antónimos wordwall»,
// «prefijos y sufijos 6 primaria») y ninguna página hasta nov-2026. Debajo, el
// examen de La Fábrica de Palabras. Material en castellano en los tres idiomas.

const T = (es, en, ca) => ({ es, en, ca })
const L = T

const sinonimosAntonimos = {
  metaTitle: L('Sinónimos y antónimos: qué son, tipos y ejemplos — resumen y ejercicios', 'Spanish synonyms and antonyms: what they are, types and examples — summary and practice questions', 'Sinònims i antònims en castellà: què són, tipus i exemples — resum i exercicis'),
  metaDesc: L('Qué son los sinónimos y los antónimos, los tres tipos de antónimos, por qué el contexto importa y antónimos con prefijo (feliz/infeliz). Con tablas y ejercicios resueltos.', 'What Spanish synonyms and antonyms are, the three kinds of antonym, why context matters and antonyms made with a prefix (feliz/infeliz). With tables and solved exercises.', 'Què són els sinònims i els antònims en castellà, els tres tipus d’antònims, per què importa el context i antònims amb prefix (feliz/infeliz). Amb taules i exercicis.'),
  resumen: L(
    ['Los sinónimos son palabras con el mismo significado o uno muy parecido: alegre y contento, empezar y comenzar. Los antónimos son palabras de significado contrario: alto y bajo, abrir y cerrar. Sirven para no repetir palabras y para decir las cosas con más precisión.', 'Muchas palabras tienen varios significados, así que el sinónimo depende de la frase: en «Está listo para salir», listo es preparado; en «Es muy listo», es inteligente. Algunos antónimos se forman con un prefijo de negación: feliz → infeliz, ordenado → desordenado.'],
    ['Synonyms are words with the same or a very similar meaning: alegre and contento, empezar and comenzar. Antonyms are words with opposite meanings: alto and bajo, abrir and cerrar. They help you avoid repeating words and say things more precisely.', 'Many words have several meanings, so the synonym depends on the sentence: in «Está listo para salir», listo means preparado (ready); in «Es muy listo», it means inteligente (clever). Some antonyms are formed with a negative prefix: feliz → infeliz, ordenado → desordenado.'],
    ['Els sinònims són paraules amb el mateix significat o un de molt semblant: alegre i contento, empezar i comenzar. Els antònims són paraules de significat contrari: alto i bajo, abrir i cerrar. Serveixen per no repetir paraules i per dir les coses amb més precisió.', 'Moltes paraules tenen diversos significats, així que el sinònim depèn de la frase: a «Está listo para salir», listo és preparado; a «Es muy listo», és inteligente. Alguns antònims es formen amb un prefix de negació: feliz → infeliz, ordenado → desordenado.'],
  ),
  puntosClave: L(
    ['Sinónimos: significado igual o parecido (bonito = hermoso).', 'Antónimos: significado contrario (día ≠ noche).', 'El sinónimo correcto depende del contexto de la frase.', 'Antónimos graduales (frío–caliente), complementarios (vivo–muerto) y recíprocos (comprar–vender).', 'Se pueden formar antónimos con prefijos: in-, im-, i-, des-.'],
    ['Synonyms: same or similar meaning (bonito = hermoso).', 'Antonyms: opposite meaning (día ≠ noche).', 'The right synonym depends on the context of the sentence.', 'Gradable (frío–caliente), complementary (vivo–muerto) and reciprocal (comprar–vender) antonyms.', 'Antonyms can be made with prefixes: in-, im-, i-, des-.'],
    ['Sinònims: significat igual o semblant (bonito = hermoso).', 'Antònims: significat contrari (día ≠ noche).', 'El sinònim correcte depèn del context de la frase.', 'Antònims graduals (frío–caliente), complementaris (vivo–muerto) i recíprocs (comprar–vender).', 'Es poden formar antònims amb prefixos: in-, im-, i-, des-.'],
  ),
  secciones: [
    {
      titulo: L('Ejemplos de sinónimos', 'Examples of synonyms', 'Exemples de sinònims'),
      tabla: {
        columnas: L(['Palabra', 'Sinónimos', 'En una frase'], ['Word', 'Synonyms', 'In a sentence'], ['Paraula', 'Sinònims', 'En una frase']),
        filas: [
          ['alegre', 'contento, feliz', '«Hoy estoy muy contento.»'],
          ['bonito', 'hermoso, precioso', '«Qué paisaje tan hermoso.»'],
          ['empezar', 'comenzar, iniciar', '«La clase comienza a las nueve.»'],
          ['rápido', 'veloz, ligero', '«El guepardo es muy veloz.»'],
          ['miedo', 'temor, susto', '«Sentía temor en la oscuridad.»'],
          ['casa', 'vivienda, hogar', '«Viven en una vivienda antigua.»'],
        ],
      },
    },
    {
      titulo: L('Los tres tipos de antónimos', 'The three kinds of antonym', 'Els tres tipus d’antònims'),
      tabla: {
        columnas: L(['Tipo', 'Cómo son', 'Ejemplos'], ['Type', 'What they are like', 'Examples'], ['Tipus', 'Com són', 'Exemples']),
        filas: [
          [L('Graduales', 'Gradable', 'Graduals'), L('hay grados entre los dos', 'there are degrees in between', 'hi ha graus entre tots dos'), 'frío – (templado) – caliente; grande – pequeño'],
          [L('Complementarios', 'Complementary', 'Complementaris'), L('si es uno, no puede ser el otro', 'if it is one, it cannot be the other', 'si és l’un, no pot ser l’altre'), 'vivo – muerto; verdadero – falso'],
          [L('Recíprocos', 'Reciprocal', 'Recíprocs'), L('uno implica al otro', 'one implies the other', 'l’un implica l’altre'), 'comprar – vender; padre – hijo; dar – recibir'],
          [L('Con prefijo', 'With a prefix', 'Amb prefix'), L('se niega la palabra con in-, im-, i- o des-', 'the word is negated with in-, im-, i- or des-', 'es nega la paraula amb in-, im-, i- o des-'), 'feliz – infeliz; posible – imposible; hacer – deshacer'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre sinónimo y antónimo?', 'What is the difference between a synonym and an antonym?', 'Quina diferència hi ha entre sinònim i antònim?'),
      r: T('Un sinónimo significa lo mismo (o casi): cara y rostro. Un antónimo significa lo contrario: limpio y sucio.', 'A synonym means the same (or nearly): cara and rostro. An antonym means the opposite: limpio and sucio.', 'Un sinònim vol dir el mateix (o gairebé): cara i rostro. Un antònim vol dir el contrari: limpio i sucio.') },
    { p: T('¿Dos sinónimos se pueden cambiar siempre?', 'Can two synonyms always be swapped?', 'Dos sinònims es poden canviar sempre?'),
      r: T('No siempre. Dependen del contexto y del registro: «viejo» y «antiguo» valen para un mueble, pero a una persona mayor no se le suele llamar «antigua».', 'Not always. They depend on context and register: «viejo» and «antiguo» both work for a piece of furniture, but an older person is not usually called «antigua».', 'No sempre. Depenen del context i del registre: «viejo» i «antiguo» valen per a un moble, però a una persona gran no se l’anomena «antigua».') },
  ],
  ejercicios: [
    { e: T('Escribe un sinónimo de comenzar, rostro y veloz.', 'Write a synonym for comenzar, rostro and veloz.', 'Escriu un sinònim de comenzar, rostro i veloz.'), s: 'empezar (o iniciar), cara, rápido' },
    { e: T('Escribe un antónimo de valiente, encender y lleno.', 'Write an antonym for valiente, encender and lleno.', 'Escriu un antònim de valiente, encender i lleno.'), s: 'cobarde, apagar, vacío' },
    { e: T('¿Qué sinónimo de «listo» va en cada frase? «Ya estoy listo para salir» y «Es un chico muy listo».', 'Which synonym of «listo» fits each sentence? «Ya estoy listo para salir» and «Es un chico muy listo».', 'Quin sinònim de «listo» va a cada frase? «Ya estoy listo para salir» i «Es un chico muy listo».'),
      s: T('Preparado en la primera; inteligente en la segunda.', 'Preparado in the first; inteligente in the second.', 'Preparado a la primera; inteligente a la segona.') },
    { e: T('Clasifica estos antónimos: comprar–vender, frío–caliente, vivo–muerto.', 'Classify these antonyms: comprar–vender, frío–caliente, vivo–muerto.', 'Classifica aquests antònims: comprar–vender, frío–caliente, vivo–muerto.'),
      s: T('Recíprocos, graduales y complementarios.', 'Reciprocal, gradable and complementary.', 'Recíprocs, graduals i complementaris.') },
    { e: T('Forma el antónimo con un prefijo: posible, ordenado, legal.', 'Form the antonym with a prefix: posible, ordenado, legal.', 'Forma l’antònim amb un prefix: posible, ordenado, legal.'), s: 'imposible, desordenado, ilegal' },
    { e: T('Cambia la palabra repetida por un sinónimo: «El parque es bonito y la fuente también es bonita».', 'Replace the repeated word with a synonym: «El parque es bonito y la fuente también es bonita».', 'Canvia la paraula repetida per un sinònim: «El parque es bonito y la fuente también es bonita».'),
      s: '«El parque es bonito y la fuente también es preciosa» (o hermosa).' },
  ],
}

const prefijosSufijos = {
  metaTitle: L('Prefijos y sufijos: qué son, significado y ejemplos (con tabla) — resumen y ejercicios', 'Spanish prefixes and suffixes: what they mean, with examples (table) — summary and practice questions', 'Prefixos i sufixos en castellà: què són, significat i exemples (amb taula) — resum i exercicis'),
  metaDesc: L('Qué son los prefijos y los sufijos, una tabla con su significado y ejemplos (des-, re-, pre-, -ero, -ería, -mente…), diminutivos, aumentativos y familias de palabras.', 'What Spanish prefixes and suffixes are, a table of their meanings with examples (des-, re-, pre-, -ero, -ería, -mente…), diminutives, augmentatives and word families.', 'Què són els prefixos i els sufixos, una taula amb el significat i exemples (des-, re-, pre-, -ero, -ería, -mente…), diminutius, augmentatius i famílies de paraules.'),
  resumen: L(
    ['Muchas palabras se forman añadiendo piezas a una palabra base o lexema. El prefijo va delante y cambia el significado: hacer → deshacer, rehacer. El sufijo va detrás y puede cambiar el significado o la clase de palabra: zapato → zapatero (oficio), feliz → felizmente (adverbio), tranquilo → tranquilidad (nombre).', 'Las palabras que comparten el mismo lexema forman una familia de palabras: flor, florero, florista, florecer, floral. Conocer el significado de los prefijos y sufijos más frecuentes ayuda a entender palabras nuevas sin diccionario.'],
    ['Many Spanish words are formed by adding pieces to a base word or lexeme. The prefix goes in front and changes the meaning: hacer → deshacer, rehacer. The suffix goes at the end and can change the meaning or the word class: zapato → zapatero (a job), feliz → felizmente (an adverb), tranquilo → tranquilidad (a noun).', 'Words sharing the same lexeme make up a word family: flor, florero, florista, florecer, floral. Knowing what the most frequent prefixes and suffixes mean helps you understand new words without a dictionary.'],
    ['Moltes paraules es formen afegint peces a una paraula base o lexema. El prefix va davant i canvia el significat: hacer → deshacer, rehacer. El sufix va darrere i pot canviar el significat o la classe de paraula: zapato → zapatero (ofici), feliz → felizmente (adverbi), tranquilo → tranquilidad (nom).', 'Les paraules que comparteixen el mateix lexema formen una família de paraules: flor, florero, florista, florecer, floral. Conèixer el significat dels prefixos i sufixos més freqüents ajuda a entendre paraules noves sense diccionari.'],
  ),
  puntosClave: L(
    ['Prefijo: delante del lexema (des-hacer, pre-historia).', 'Sufijo: detrás del lexema (zapat-ero, feliz-mente).', 'El prefijo cambia el significado; el sufijo puede cambiar también la clase de palabra.', 'Diminutivos (-ito, -illo) y aumentativos (-ón, -azo, -ote).', 'Familia de palabras: todas las que comparten lexema (pan, panadero, empanada).'],
    ['Prefix: in front of the lexeme (des-hacer, pre-historia).', 'Suffix: after the lexeme (zapat-ero, feliz-mente).', 'A prefix changes the meaning; a suffix can also change the word class.', 'Diminutives (-ito, -illo) and augmentatives (-ón, -azo, -ote).', 'Word family: all the words sharing a lexeme (pan, panadero, empanada).'],
    ['Prefix: davant del lexema (des-hacer, pre-historia).', 'Sufix: darrere del lexema (zapat-ero, feliz-mente).', 'El prefix canvia el significat; el sufix també pot canviar la classe de paraula.', 'Diminutius (-ito, -illo) i augmentatius (-ón, -azo, -ote).', 'Família de paraules: totes les que comparteixen lexema (pan, panadero, empanada).'],
  ),
  secciones: [
    {
      titulo: L('Tabla de prefijos con su significado', 'Table of prefixes and their meaning', 'Taula de prefixos amb el significat'),
      tabla: {
        columnas: L(['Prefijo', 'Significa', 'Ejemplos'], ['Prefix', 'Means', 'Examples'], ['Prefix', 'Significa', 'Exemples']),
        filas: [
          ['a-, an-', L('sin, no', 'without, not', 'sense, no'), 'anormal, analfabeto'],
          ['anti-', L('contra', 'against', 'contra'), 'antiniebla, antivirus'],
          ['bi-', L('dos', 'two', 'dos'), 'bicicleta, bilingüe'],
          ['des-', L('negación o lo contrario', 'negation or the opposite', 'negació o el contrari'), 'deshacer, desordenado'],
          ['ex-', L('que fue', 'former', 'que va ser'), 'expresidente, exalumno'],
          ['in-, im-, i-', L('no', 'not', 'no'), 'inútil, imposible, ilegal'],
          ['inter-', L('entre', 'between', 'entre'), 'internacional, intercambiar'],
          ['multi-', L('muchos', 'many', 'molts'), 'multicolor, multinacional'],
          ['pos-', L('después de', 'after', 'després de'), 'posguerra, posponer'],
          ['pre-', L('antes de', 'before', 'abans de'), 'prehistoria, prever'],
          ['re-', L('volver a hacer', 'again', 'tornar a fer'), 'releer, rehacer'],
          ['semi-', L('medio', 'half', 'mig'), 'semicírculo, semifinal'],
          ['sub-', L('debajo de', 'under', 'sota'), 'submarino, subrayar'],
          ['super-', L('encima o muy', 'above or very', 'damunt o molt'), 'supermercado, superhéroe'],
          ['tri-', L('tres', 'three', 'tres'), 'triciclo, triángulo'],
          ['vice-', L('en lugar de', 'deputy', 'en lloc de'), 'vicepresidente, vicedirector'],
        ],
      },
    },
    {
      titulo: L('Tabla de sufijos con su significado', 'Table of suffixes and their meaning', 'Taula de sufixos amb el significat'),
      tabla: {
        columnas: L(['Sufijo', 'Significa', 'Ejemplos'], ['Suffix', 'Means', 'Examples'], ['Sufix', 'Significa', 'Exemples']),
        filas: [
          ['-ero, -era', L('oficio o recipiente', 'job or container', 'ofici o recipient'), 'zapatero, florero, panadera'],
          ['-ería', L('tienda o lugar', 'shop or place', 'botiga o lloc'), 'frutería, librería'],
          ['-ista', L('profesión, oficio', 'profession', 'professió, ofici'), 'dentista, pianista'],
          ['-dor, -dora', L('persona que hace la acción', 'person who does the action', 'persona que fa l’acció'), 'nadador, trabajadora'],
          ['-ito, -illo', L('diminutivo (pequeño)', 'diminutive (small)', 'diminutiu (petit)'), 'casita, pajarillo'],
          ['-ón, -azo, -ote', L('aumentativo (grande)', 'augmentative (big)', 'augmentatiu (gran)'), 'casona, perrazo, grandote'],
          ['-oso, -osa', L('que tiene mucho de algo', 'full of something', 'que té molt d’alguna cosa'), 'cariñoso, miedosa'],
          ['-able, -ible', L('que se puede', 'that can be done', 'que es pot'), 'lavable, comestible'],
          ['-mente', L('de modo (forma adverbios)', 'in a way (forms adverbs)', 'de manera (forma adverbis)'), 'rápidamente, felizmente'],
          ['-ción, -miento', L('acción o efecto', 'action or result', 'acció o efecte'), 'explicación, crecimiento'],
          ['-dad, -eza', L('cualidad', 'quality', 'qualitat'), 'bondad, tranquilidad, belleza'],
          ['-eda, -al, -ar', L('lugar con muchos', 'place with many', 'lloc amb molts'), 'arboleda, trigal, pinar'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre prefijo y sufijo?', 'What is the difference between a prefix and a suffix?', 'Quina diferència hi ha entre prefix i sufix?'),
      r: T('El prefijo va delante del lexema (re-leer) y el sufijo detrás (lect-or). Los dos forman palabras nuevas, llamadas derivadas.', 'The prefix goes in front of the lexeme (re-leer) and the suffix after it (lect-or). Both form new words, called derived words.', 'El prefix va davant del lexema (re-leer) i el sufix darrere (lect-or). Tots dos formen paraules noves, anomenades derivades.') },
    { p: T('¿Qué es una familia de palabras?', 'What is a word family?', 'Què és una família de paraules?'),
      r: T('El grupo de palabras que comparten el mismo lexema: mar, marino, marinero, submarino, marea.', 'The group of words that share the same lexeme: mar, marino, marinero, submarino, marea.', 'El grup de paraules que comparteixen el mateix lexema: mar, marino, marinero, submarino, marea.') },
  ],
  ejercicios: [
    { e: T('Separa el prefijo o el sufijo: zapatería, releer, felizmente, submarino.', 'Separate the prefix or suffix: zapatería, releer, felizmente, submarino.', 'Separa el prefix o el sufix: zapatería, releer, felizmente, submarino.'),
      s: 'zapat- + -ería, re- + leer, feliz + -mente, sub- + marino' },
    { e: T('¿Qué significa el prefijo de bicicleta, prehistoria y antiniebla?', 'What does the prefix mean in bicicleta, prehistoria and antiniebla?', 'Què significa el prefix de bicicleta, prehistoria i antiniebla?'),
      s: T('bi- = dos (dos ruedas), pre- = antes de, anti- = contra.', 'bi- = two (two wheels), pre- = before, anti- = against.', 'bi- = dos (dues rodes), pre- = abans de, anti- = contra.') },
    { e: T('Escribe cuatro palabras de la familia de «flor».', 'Write four words from the family of «flor».', 'Escriu quatre paraules de la família de «flor».'), s: 'florero, florista, florecer, floral (también floristería, florido)' },
    { e: T('Escribe el diminutivo y el aumentativo de casa y de perro.', 'Write the diminutive and the augmentative of casa and perro.', 'Escriu el diminutiu i l’augmentatiu de casa i de perro.'), s: 'casita – casona; perrito – perrazo' },
    { e: T('Convierte en adverbio con -mente: tranquilo, fácil, alegre.', 'Turn into an adverb with -mente: tranquilo, fácil, alegre.', 'Converteix en adverbi amb -mente: tranquilo, fácil, alegre.'),
      s: T('tranquilamente, fácilmente, alegremente: -mente se añade al femenino del adjetivo y la tilde se conserva.', 'tranquilamente, fácilmente, alegremente: -mente is added to the feminine form of the adjective and the accent is kept.', 'tranquilamente, fácilmente, alegremente: -mente s’afegeix al femení de l’adjectiu i l’accent es conserva.') },
    { e: T('Forma la palabra: «persona que vende fruta» y «lugar con muchos árboles».', 'Make the word: «persona que vende fruta» and «lugar con muchos árboles».', 'Forma la paraula: «persona que vende fruta» i «lugar con muchos árboles».'), s: 'frutero (frut- + -ero), arboleda (arbol- + -eda)' },
  ],
}

export const VOCABULARIO_TEMA = {
  'sinonimos-antonimos': sinonimosAntonimos,
  'prefijos-sufijos': prefijosSufijos,
}
