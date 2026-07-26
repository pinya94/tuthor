// Analiza la Frase — datos (español). Cada frase está tokenizada en palabras y
// anotada: para cada "tarea" gramatical, los índices de las palabras correctas.
// Una frase da para muchas rondas (distintas tareas). Determinista y exacto.
//
// nivel de la frase / min de la tarea: primaria(0) < eso(1) < bach(2).
// La ronda de un nivel usa frases y tareas de rango <= ese nivel.

export const RANK = { primaria: 0, eso: 1, bach: 2 }

export const TASKS = {
  // ── Clases de palabras ──
  sustantivo:  { min: 0, label: { es: 'los sustantivos', en: 'the nouns', ca: 'els substantius' },
    explica: { es: 'Los sustantivos nombran personas, animales, cosas o ideas.', en: 'Nouns name people, animals, things or ideas.', ca: 'Els substantius anomenen persones, animals, coses o idees.' } },
  adjetivo:    { min: 0, label: { es: 'los adjetivos', en: 'the adjectives', ca: 'els adjectius' },
    explica: { es: 'El adjetivo dice cómo es el sustantivo (una cualidad).', en: 'The adjective tells what the noun is like (a quality).', ca: 'L’adjectiu diu com és el substantiu (una qualitat).' } },
  verbo:       { min: 0, label: { es: 'el verbo', en: 'the verb', ca: 'el verb' },
    explica: { es: 'El verbo expresa la acción o el estado. Es el núcleo del predicado.', en: 'The verb expresses the action or state. It is the head of the predicate.', ca: 'El verb expressa l’acció o l’estat. És el nucli del predicat.' } },
  articulo:    { min: 0, label: { es: 'los artículos', en: 'the articles', ca: 'els articles' },
    explica: { es: 'Artículos: el, la, los, las (determinados) y un, una, unos, unas (indeterminados).', en: 'Articles: el, la, los, las (definite) and un, una, unos, unas (indefinite).', ca: 'Articles: el, la, els, les (determinats) i un, una, uns, unes (indeterminats).' } },
  pronombre:   { min: 1, label: { es: 'los pronombres', en: 'the pronouns', ca: 'els pronoms' },
    explica: { es: 'El pronombre sustituye a un sustantivo (yo, tú, ella, te, lo, se…).', en: 'A pronoun replaces a noun (I, you, she, it…).', ca: 'El pronom substitueix un substantiu (jo, tu, ella, et, ho…).' } },
  adverbio:    { min: 1, label: { es: 'los adverbios', en: 'the adverbs', ca: 'els adverbis' },
    explica: { es: 'El adverbio modifica al verbo, a un adjetivo u otro adverbio (cómo, cuándo, dónde…).', en: 'An adverb modifies a verb, adjective or another adverb (how, when, where…).', ca: 'L’adverbi modifica el verb, un adjectiu o un altre adverbi (com, quan, on…).' } },
  preposicion: { min: 1, label: { es: 'las preposiciones', en: 'the prepositions', ca: 'les preposicions' },
    explica: { es: 'Preposiciones: a, de, en, con, por, para, sobre… Enlazan palabras.', en: 'Prepositions: a, de, en, con, por… They link words.', ca: 'Preposicions: a, de, en, amb, per, sobre… Enllacen paraules.' } },
  conjuncion:  { min: 0, label: { es: 'las conjunciones', en: 'the conjunctions', ca: 'les conjuncions' },
    explica: { es: 'Las conjunciones enlazan palabras u oraciones: y, o, pero, porque, aunque…', en: 'Conjunctions link words or clauses: and, or, but, because…', ca: 'Les conjuncions enllacen paraules o oracions: i, o, però, perquè…' } },
  determinante:{ min: 1, label: { es: 'los determinantes', en: 'the determiners', ca: 'els determinants' },
    explica: { es: 'Determinantes: artículos, posesivos (mi, su), demostrativos (este, aquel), indefinidos (muchos)…', en: 'Determiners: articles, possessives, demonstratives, indefinites…', ca: 'Determinants: articles, possessius, demostratius, indefinits…' } },
  // ── Sintaxis ──
  sujeto:      { min: 0, label: { es: 'el sujeto', en: 'the subject', ca: 'el subjecte' },
    explica: { es: 'El sujeto es de quien se dice algo; concuerda con el verbo. Su núcleo es un sustantivo o pronombre.', en: 'The subject is what the sentence is about; it agrees with the verb.', ca: 'El subjecte és de qui es diu alguna cosa; concorda amb el verb.' } },
  predicado:   { min: 0, label: { es: 'el predicado', en: 'the predicate', ca: 'el predicat' },
    explica: { es: 'El predicado es lo que se dice del sujeto; su núcleo es el verbo.', en: 'The predicate is what is said about the subject; its head is the verb.', ca: 'El predicat és el que es diu del subjecte; el seu nucli és el verb.' } },
  'nucleo-sujeto': { min: 1, label: { es: 'el núcleo del sujeto', en: 'the head of the subject', ca: 'el nucli del subjecte' },
    explica: { es: 'El núcleo del sujeto es el sustantivo (o pronombre) principal del grupo del sujeto.', en: 'The head of the subject is the main noun (or pronoun) of the subject group.', ca: 'El nucli del subjecte és el substantiu (o pronom) principal del grup del subjecte.' } },
  cd:          { min: 1, label: { es: 'el complemento directo (CD)', en: 'the direct object (DO)', ca: 'el complement directe (CD)' },
    explica: { es: 'El CD recibe directamente la acción. Se puede sustituir por lo, la, los, las.', en: 'The direct object directly receives the action (it/them).', ca: 'El CD rep directament l’acció. Es pot substituir per el, la, els, les.' } },
  ci:          { min: 1, label: { es: 'el complemento indirecto (CI)', en: 'the indirect object (IO)', ca: 'el complement indirecte (CI)' },
    explica: { es: 'El CI recibe el provecho o daño de la acción. Suele ir con "a" y se sustituye por le/les.', en: 'The indirect object receives the benefit of the action (to/for whom).', ca: 'El CI rep el profit o dany de l’acció. Sol anar amb "a" i se substitueix per li/els.' } },
  cc:          { min: 1, label: { es: 'los complementos circunstanciales (CC)', en: 'the adverbials (CC)', ca: 'els complements circumstancials (CC)' },
    explica: { es: 'El CC indica una circunstancia: lugar, tiempo, modo, cantidad… (dónde, cuándo, cómo).', en: 'An adverbial gives a circumstance: place, time, manner… (where, when, how).', ca: 'El CC indica una circumstància: lloc, temps, manera… (on, quan, com).' } },
  atributo:    { min: 1, label: { es: 'el atributo', en: 'the attribute', ca: 'l’atribut' },
    explica: { es: 'El atributo dice una cualidad o estado del sujeto con los verbos ser, estar o parecer.', en: 'The attribute states a quality/state of the subject with be/seem verbs.', ca: 'L’atribut diu una qualitat o estat del subjecte amb els verbs ser, estar o semblar.' } },
}

// Frases anotadas. tokens = palabras (sin puntuación). ann = { tarea: [índices] }.
export const SENTENCES = [
  // ── PRIMARIA ──
  { id: 'p1', nivel: 'primaria', tokens: ['El', 'perro', 'negro', 'ladra'],
    ann: { articulo: [0], sustantivo: [1], adjetivo: [2], verbo: [3], sujeto: [0, 1, 2], predicado: [3], 'nucleo-sujeto': [1] } },
  { id: 'p2', nivel: 'primaria', tokens: ['María', 'come', 'una', 'manzana'],
    ann: { sustantivo: [0, 3], verbo: [1], articulo: [2], sujeto: [0], predicado: [1, 2, 3], 'nucleo-sujeto': [0], cd: [2, 3] } },
  { id: 'p3', nivel: 'primaria', tokens: ['Los', 'niños', 'juegan', 'en', 'el', 'parque'],
    ann: { articulo: [0, 4], sustantivo: [1, 5], verbo: [2], preposicion: [3], sujeto: [0, 1], predicado: [2, 3, 4, 5], 'nucleo-sujeto': [1], cc: [3, 4, 5] } },
  { id: 'p4', nivel: 'primaria', tokens: ['El', 'sol', 'brilla', 'mucho'],
    ann: { articulo: [0], sustantivo: [1], verbo: [2], adverbio: [3], sujeto: [0, 1], predicado: [2, 3], 'nucleo-sujeto': [1], cc: [3] } },
  { id: 'p5', nivel: 'primaria', tokens: ['Ana', 'y', 'Luis', 'corren', 'rápido'],
    ann: { sustantivo: [0, 2], conjuncion: [1], verbo: [3], adverbio: [4], sujeto: [0, 1, 2], predicado: [3, 4], 'nucleo-sujeto': [0, 2], cc: [4] } },
  { id: 'p6', nivel: 'primaria', tokens: ['La', 'niña', 'pequeña', 'dibuja', 'una', 'flor'],
    ann: { articulo: [0, 4], sustantivo: [1, 5], adjetivo: [2], verbo: [3], sujeto: [0, 1, 2], predicado: [3, 4, 5], 'nucleo-sujeto': [1], cd: [4, 5] } },

  // ── ESO ──
  { id: 'e1', nivel: 'eso', tokens: ['Ella', 'escribió', 'una', 'carta', 'a', 'su', 'amigo'],
    ann: { pronombre: [0], verbo: [1], articulo: [2], sustantivo: [3, 6], preposicion: [4], determinante: [0, 2, 5], sujeto: [0], predicado: [1, 2, 3, 4, 5, 6], 'nucleo-sujeto': [0], cd: [2, 3], ci: [4, 5, 6] } },
  { id: 'e2', nivel: 'eso', tokens: ['Nosotros', 'compramos', 'pan', 'en', 'la', 'tienda'],
    ann: { pronombre: [0], verbo: [1], sustantivo: [2, 5], preposicion: [3], articulo: [4], determinante: [4], sujeto: [0], predicado: [1, 2, 3, 4, 5], 'nucleo-sujeto': [0], cd: [2], cc: [3, 4, 5] } },
  { id: 'e3', nivel: 'eso', tokens: ['El', 'profesor', 'explicó', 'la', 'lección', 'ayer'],
    ann: { articulo: [0, 3], sustantivo: [1, 4], verbo: [2], adverbio: [5], determinante: [0, 3], sujeto: [0, 1], predicado: [2, 3, 4, 5], 'nucleo-sujeto': [1], cd: [3, 4], cc: [5] } },
  { id: 'e4', nivel: 'eso', tokens: ['Vosotros', 'leéis', 'muchos', 'libros', 'hoy'],
    ann: { pronombre: [0], verbo: [1], determinante: [2], sustantivo: [3], adverbio: [4], sujeto: [0], predicado: [1, 2, 3, 4], 'nucleo-sujeto': [0], cd: [2, 3], cc: [4] } },
  { id: 'e5', nivel: 'eso', tokens: ['Mi', 'abuelo', 'regaló', 'un', 'reloj', 'a', 'mi', 'hermano'],
    ann: { determinante: [0, 3, 6], sustantivo: [1, 4, 7], verbo: [2], articulo: [3], preposicion: [5], sujeto: [0, 1], predicado: [2, 3, 4, 5, 6, 7], 'nucleo-sujeto': [1], cd: [3, 4], ci: [5, 6, 7] } },

  // ── BACHILLERATO ──
  { id: 'b1', nivel: 'bach', tokens: ['El', 'cartero', 'entregó', 'la', 'carta', 'a', 'su', 'vecino', 'por', 'la', 'mañana'],
    ann: { articulo: [0, 3, 9], sustantivo: [1, 4, 7, 10], verbo: [2], preposicion: [5, 8], determinante: [0, 3, 6, 9], sujeto: [0, 1], predicado: [2, 3, 4, 5, 6, 7, 8, 9, 10], 'nucleo-sujeto': [1], cd: [3, 4], ci: [5, 6, 7], cc: [8, 9, 10] } },
  { id: 'b2', nivel: 'bach', tokens: ['Aquel', 'actor', 'famoso', 'recibió', 'un', 'premio', 'importante'],
    ann: { determinante: [0, 4], sustantivo: [1, 5], adjetivo: [2, 6], verbo: [3], articulo: [4], sujeto: [0, 1, 2], predicado: [3, 4, 5, 6], 'nucleo-sujeto': [1], cd: [4, 5, 6] } },
  { id: 'b3', nivel: 'bach', tokens: ['Los', 'estudiantes', 'estaban', 'muy', 'cansados'],
    ann: { articulo: [0], sustantivo: [1], verbo: [2], adverbio: [3], adjetivo: [4], determinante: [0], sujeto: [0, 1], predicado: [2, 3, 4], 'nucleo-sujeto': [1], atributo: [3, 4] } },
  { id: 'b4', nivel: 'bach', tokens: ['La', 'casa', 'de', 'mi', 'abuela', 'es', 'muy', 'antigua'],
    ann: { articulo: [0], sustantivo: [1, 4], preposicion: [2], determinante: [0, 3], verbo: [5], adverbio: [6], adjetivo: [7], sujeto: [0, 1, 2, 3, 4], predicado: [5, 6, 7], 'nucleo-sujeto': [1], atributo: [6, 7] } },
]
