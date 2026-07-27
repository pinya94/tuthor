function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('adv-01', 'primaria',
    { es: '¿Cuál de estas palabras es un adverbio?', en: 'Which of these words is an adverb?', ca: 'Quina d\'aquestes paraules és un adverbi?' },
    { es: ['rápido', 'deprisa', 'perro', 'azul'], en: ['rápido', 'deprisa (quickly)', 'perro', 'azul'], ca: ['ràpid', 'de pressa', 'gos', 'blau'] },
    1, '💨',
    { es: 'El adverbio modifica al verbo y dice cómo, cuándo o dónde ocurre la acción: "corre deprisa". "Rápido" aquí es adjetivo.', en: 'An adverb modifies the verb (how, when, where): "corre deprisa" (runs quickly).', ca: 'L\'adverbi modifica el verb: "corre de pressa".' }),

  q('adv-02', 'primaria',
    { es: 'En "el niño corre mucho", ¿cuál es el adverbio?', en: 'In "el niño corre mucho", which word is the adverb?', ca: 'A "el nen corre molt", quin és l\'adverbi?' },
    { es: ['niño', 'corre', 'mucho', 'el'], en: ['niño', 'corre', 'mucho', 'el'], ca: ['nen', 'corre', 'molt', 'el'] },
    2, '🏃',
    { es: '"Mucho" modifica al verbo "corre" e indica cantidad → adverbio. No cambia de forma (es invariable).', en: '"Mucho" modifies the verb "corre" (quantity) → adverb.', ca: '"Molt" modifica el verb "corre" (quantitat) → adverbi.' }),

  q('adv-03', 'primaria',
    { es: '¿Qué tipo de adverbio es "aquí"?', en: 'What type of adverb is "aquí"?', ca: 'Quin tipus d\'adverbi és "aquí"?' },
    { es: ['De tiempo', 'De lugar', 'De modo', 'De cantidad'], en: ['Of time', 'Of place', 'Of manner', 'Of quantity'], ca: ['De temps', 'De lloc', 'De manera', 'De quantitat'] },
    1, '📍',
    { es: 'Los adverbios de lugar indican dónde: aquí, allí, cerca, lejos, arriba, abajo, dentro, fuera.', en: 'Adverbs of place say where: aquí, allí, cerca, lejos.', ca: 'Els adverbis de lloc indiquen on: aquí, allí, a prop, lluny.' }),

  q('adv-04', 'primaria',
    { es: '¿Qué tipo de adverbio es "ayer"?', en: 'What type of adverb is "ayer"?', ca: 'Quin tipus d\'adverbi és "ahir"?' },
    { es: ['De tiempo', 'De lugar', 'De modo', 'De negación'], en: ['Of time', 'Of place', 'Of manner', 'Of negation'], ca: ['De temps', 'De lloc', 'De manera', 'De negació'] },
    0, '📅',
    { es: 'Los adverbios de tiempo indican cuándo: ayer, hoy, mañana, ahora, siempre, nunca, pronto, tarde.', en: 'Adverbs of time say when: ayer, hoy, mañana, ahora, siempre.', ca: 'Els adverbis de temps indiquen quan: ahir, avui, demà, ara.' }),

  q('adv-05', 'primaria',
    { es: '¿Cuál es un adverbio de negación?', en: 'Which is an adverb of negation?', ca: 'Quin és un adverbi de negació?' },
    { es: ['sí', 'no', 'quizás', 'muy'], en: ['sí (yes)', 'no', 'quizás (maybe)', 'muy (very)'], ca: ['sí', 'no', 'potser', 'molt'] },
    1, '🚫',
    { es: '"No" es adverbio de negación. "Sí" es de afirmación, "quizás" de duda y "muy" de cantidad.', en: '"No" is an adverb of negation. "Sí" affirms, "quizás" expresses doubt, "muy" quantity.', ca: '"No" és adverbi de negació. "Sí" d\'afirmació, "potser" de dubte, "molt" de quantitat.' }),

  q('adv-06', 'primaria',
    { es: 'Los adverbios acabados en "-mente" suelen ser de…', en: 'Adverbs ending in "-mente" are usually of…', ca: 'Els adverbis acabats en "-ment" solen ser de…' },
    { es: ['Lugar', 'Modo', 'Tiempo', 'Duda'], en: ['Place', 'Manner', 'Time', 'Doubt'], ca: ['Lloc', 'Manera', 'Temps', 'Dubte'] },
    1, '🎯',
    { es: 'Muchos adverbios de modo se forman con el femenino del adjetivo + "-mente": rápida→rápidamente, lenta→lentamente, fácil→fácilmente.', en: 'Many manner adverbs form with adjective + "-mente": rápidamente, lentamente.', ca: 'Molts adverbis de manera es formen amb l\'adjectiu + "-ment": ràpidament.' }),

  q('adv-07', 'eso',
    { es: '¿Qué caracteriza a los adverbios?', en: 'What characterises adverbs?', ca: 'Què caracteritza els adverbis?' },
    { es: ['Concuerdan en género', 'Son invariables', 'Se conjugan', 'Tienen plural'], en: ['They agree in gender', 'They are invariable', 'They conjugate', 'They have plural'], ca: ['Concorden en gènere', 'Són invariables', 'Es conjuguen', 'Tenen plural'] },
    1, '🔒',
    { es: 'El adverbio es invariable: no cambia de género ni de número. "Corre rápido / corren rápido" (no *rápidos).', en: 'Adverbs are invariable: no gender or number change.', ca: 'L\'adverbi és invariable: no canvia de gènere ni de nombre.' }),

  q('adv-08', 'eso',
    { es: 'En "habla bastante bien", ¿qué modifica el adverbio "bastante"?', en: 'In "habla bastante bien", what does the adverb "bastante" modify?', ca: 'A "parla bastant bé", què modifica l\'adverbi "bastant"?' },
    { es: ['Al verbo "habla"', 'Al adverbio "bien"', 'A un sustantivo', 'A nada'], en: ['The verb "habla"', 'The adverb "bien"', 'A noun', 'Nothing'], ca: ['El verb "parla"', 'L\'adverbi "bé"', 'Un substantiu', 'Res'] },
    1, '🔁',
    { es: 'Un adverbio puede modificar a otro adverbio: "bastante" gradúa a "bien". También modifican a adjetivos: "muy alto".', en: 'An adverb can modify another adverb: "bastante" grades "bien". Also adjectives: "muy alto".', ca: 'Un adverbi pot modificar un altre adverbi: "bastant" gradua "bé".' }),

  q('adv-09', 'eso',
    { es: '"A menudo" es una…', en: '"A menudo" (often) is a…', ca: '"Sovint" és una…' },
    { es: ['Preposición', 'Locución adverbial', 'Conjunción', 'Interjección'], en: ['Preposition', 'Adverbial phrase', 'Conjunction', 'Interjection'], ca: ['Preposició', 'Locució adverbial', 'Conjunció', 'Interjecció'] },
    1, '🗣️',
    { es: 'Una locución adverbial es un grupo de palabras que funciona como un adverbio: a menudo, de repente, a veces, en seguida.', en: 'An adverbial phrase is a group of words working as an adverb: a menudo, de repente.', ca: 'Una locució adverbial és un grup de paraules que funciona com un adverbi: sovint, de sobte.' }),

  q('adv-10', 'eso',
    { es: 'En "llegó tarde", el adverbio "tarde" es un complemento…', en: 'In "llegó tarde", the adverb "tarde" is a(n)…', ca: 'A "va arribar tard", l\'adverbi "tard" és un complement…' },
    { es: ['Directo', 'Circunstancial', 'Indirecto', 'Atributo'], en: ['Direct object', 'Adverbial (circumstance)', 'Indirect object', 'Attribute'], ca: ['Directe', 'Circumstancial', 'Indirecte', 'Atribut'] },
    1, '⏰',
    { es: 'Los adverbios suelen funcionar como complemento circunstancial: indican una circunstancia (tiempo, lugar, modo…) del verbo.', en: 'Adverbs usually work as adverbials: they give a circumstance (time, place…) of the verb.', ca: 'Els adverbis solen funcionar com a complement circumstancial.' }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
