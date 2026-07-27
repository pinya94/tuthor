// Tareas gramaticales de "Analiza la Frase". Etiquetas + explicación trilingües.
// min = nivel mínimo (0 primaria, 1 eso, 2 bach). Las de género/número no aplican
// al inglés (sin género); el generador simplemente no las produce en EN.
export const RANK = { primaria: 0, eso: 1, bach: 2 }

// Niveles reutilizables por los exámenes. Los de morfología/complementos empiezan
// en ESO (esas tareas no existen en Primaria).
export const LEVELS_ALL = [
  { key: 'primaria', emoji: '🟢', difficulty: 'primaria', label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, hint: { es: 'Clases de palabras y sujeto/predicado', en: 'Word classes and subject/predicate', ca: 'Classes de paraules i subjecte/predicat' } },
  { key: 'eso', emoji: '🟡', difficulty: 'eso', label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' }, hint: { es: 'Frases con complementos y morfología', en: 'Sentences with objects and morphology', ca: 'Frases amb complements i morfologia' } },
  { key: 'bach', emoji: '🔴', difficulty: 'bach', label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, hint: { es: 'Frases largas y análisis completo', en: 'Long sentences, full analysis', ca: 'Frases llargues i anàlisi completa' } },
]
export const LEVELS_ESO = LEVELS_ALL.filter(l => l.key !== 'primaria')

export const TASKS = {
  // ── Clases de palabras ──
  sustantivo:  { min: 0, cat: 'clases', label: { es: 'los sustantivos', en: 'the nouns', ca: 'els substantius' },
    explica: { es: 'Los sustantivos nombran personas, animales, cosas o ideas.', en: 'Nouns name people, animals, things or ideas.', ca: 'Els substantius anomenen persones, animals, coses o idees.' } },
  adjetivo:    { min: 0, cat: 'clases', label: { es: 'los adjetivos', en: 'the adjectives', ca: 'els adjectius' },
    explica: { es: 'El adjetivo dice cómo es el sustantivo (una cualidad).', en: 'The adjective tells what the noun is like.', ca: 'L’adjectiu diu com és el substantiu.' } },
  verbo:       { min: 0, cat: 'clases', label: { es: 'el verbo', en: 'the verb', ca: 'el verb' },
    explica: { es: 'El verbo expresa la acción o el estado. Es el núcleo del predicado.', en: 'The verb expresses the action or state.', ca: 'El verb expressa l’acció o l’estat.' } },
  articulo:    { min: 0, cat: 'clases', label: { es: 'los artículos', en: 'the articles', ca: 'els articles' },
    explica: { es: 'Artículos: el, la, los, las (determinados) y un, una… (indeterminados).', en: 'Articles: the, a, an.', ca: 'Articles: el, la, els, les i un, una…' } },
  pronombre:   { min: 1, cat: 'clases', label: { es: 'los pronombres', en: 'the pronouns', ca: 'els pronoms' },
    explica: { es: 'El pronombre sustituye a un sustantivo (yo, tú, ella, lo, se…).', en: 'A pronoun replaces a noun (I, you, she, it…).', ca: 'El pronom substitueix un substantiu.' } },
  adverbio:    { min: 1, cat: 'clases', label: { es: 'los adverbios', en: 'the adverbs', ca: 'els adverbis' },
    explica: { es: 'El adverbio modifica al verbo, a un adjetivo u otro adverbio (cómo, cuándo, dónde).', en: 'An adverb modifies a verb, adjective or another adverb.', ca: 'L’adverbi modifica el verb, un adjectiu o un altre adverbi.' } },
  preposicion: { min: 1, cat: 'clases', label: { es: 'las preposiciones', en: 'the prepositions', ca: 'les preposicions' },
    explica: { es: 'Preposiciones: a, de, en, con, por, para, sobre… Enlazan palabras.', en: 'Prepositions: to, of, in, with, on…', ca: 'Preposicions: a, de, en, amb, per, sobre…' } },
  conjuncion:  { min: 0, cat: 'clases', label: { es: 'las conjunciones', en: 'the conjunctions', ca: 'les conjuncions' },
    explica: { es: 'Las conjunciones enlazan palabras u oraciones: y, o, pero, porque…', en: 'Conjunctions link words or clauses: and, or, but…', ca: 'Les conjuncions enllacen paraules o oracions: i, o, però…' } },
  determinante:{ min: 1, cat: 'clases', label: { es: 'los determinantes', en: 'the determiners', ca: 'els determinants' },
    explica: { es: 'Determinantes: artículos, posesivos (mi, su), demostrativos (este, aquel)…', en: 'Determiners: articles, possessives, demonstratives…', ca: 'Determinants: articles, possessius, demostratius…' } },
  // ── Morfología (género y número) — no aplica al inglés ──
  femenino:  { min: 1, cat: 'morfo', label: { es: 'las palabras en femenino', en: 'the feminine words', ca: 'les paraules en femení' },
    explica: { es: 'Palabras de género femenino (la, una, niña, roja…).', en: 'Feminine-gender words.', ca: 'Paraules de gènere femení.' } },
  masculino: { min: 1, cat: 'morfo', label: { es: 'las palabras en masculino', en: 'the masculine words', ca: 'les paraules en masculí' },
    explica: { es: 'Palabras de género masculino (el, un, niño, rojo…).', en: 'Masculine-gender words.', ca: 'Paraules de gènere masculí.' } },
  singular:  { min: 1, cat: 'morfo', label: { es: 'las palabras en singular', en: 'the singular words', ca: 'les paraules en singular' },
    explica: { es: 'Palabras en número singular (una sola cosa).', en: 'Words in the singular (one thing).', ca: 'Paraules en nombre singular.' } },
  plural:    { min: 1, cat: 'morfo', label: { es: 'las palabras en plural', en: 'the plural words', ca: 'les paraules en plural' },
    explica: { es: 'Palabras en número plural (varias cosas).', en: 'Words in the plural (several things).', ca: 'Paraules en nombre plural.' } },
  // ── Sintaxis ──
  sujeto:      { min: 0, cat: 'sintaxis', label: { es: 'el sujeto', en: 'the subject', ca: 'el subjecte' },
    explica: { es: 'El sujeto es de quien se dice algo; concuerda con el verbo.', en: 'The subject is what the sentence is about; it agrees with the verb.', ca: 'El subjecte és de qui es diu alguna cosa; concorda amb el verb.' } },
  predicado:   { min: 0, cat: 'sintaxis', label: { es: 'el predicado', en: 'the predicate', ca: 'el predicat' },
    explica: { es: 'El predicado es lo que se dice del sujeto; su núcleo es el verbo.', en: 'The predicate is what is said about the subject; its head is the verb.', ca: 'El predicat és el que es diu del subjecte; el seu nucli és el verb.' } },
  'nucleo-sujeto': { min: 1, cat: 'sintaxis', label: { es: 'el núcleo del sujeto', en: 'the head of the subject', ca: 'el nucli del subjecte' },
    explica: { es: 'El núcleo del sujeto es el sustantivo o pronombre principal del sujeto.', en: 'The head of the subject is the main noun or pronoun.', ca: 'El nucli del subjecte és el substantiu o pronom principal.' } },
  cd:          { min: 1, cat: 'sintaxis', label: { es: 'el complemento directo (CD)', en: 'the direct object (DO)', ca: 'el complement directe (CD)' },
    explica: { es: 'El CD recibe directamente la acción. Se sustituye por lo, la, los, las.', en: 'The direct object directly receives the action (it/them).', ca: 'El CD rep directament l’acció (el, la, els, les).' } },
  ci:          { min: 1, cat: 'sintaxis', label: { es: 'el complemento indirecto (CI)', en: 'the indirect object (IO)', ca: 'el complement indirecte (CI)' },
    explica: { es: 'El CI recibe el provecho o daño; suele ir con "a" y se sustituye por le/les.', en: 'The indirect object is who benefits (to/for whom).', ca: 'El CI rep el profit o dany; sol anar amb "a" (li/els).' } },
  cc:          { min: 1, cat: 'sintaxis', label: { es: 'los complementos circunstanciales (CC)', en: 'the adverbials (CC)', ca: 'els complements circumstancials (CC)' },
    explica: { es: 'El CC indica una circunstancia: lugar, tiempo, modo… (dónde, cuándo, cómo).', en: 'An adverbial gives a circumstance: place, time, manner…', ca: 'El CC indica una circumstància: lloc, temps, manera…' } },
  atributo:    { min: 1, cat: 'sintaxis', label: { es: 'el atributo', en: 'the attribute', ca: 'l’atribut' },
    explica: { es: 'El atributo dice una cualidad del sujeto con ser, estar o parecer.', en: 'The attribute states a quality of the subject with be/seem.', ca: 'L’atribut diu una qualitat del subjecte amb ser, estar o semblar.' } },
}
