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

  q('adv-11', 'primaria',
    { es: "¿Cuál de estas palabras es un adverbio?", en: "Which of these words is an adverb?", ca: "Quina d'aquestes paraules és un adverbi?" },
    { es: ["rápido","rápidamente","rapidez","rapidísimo"], en: ["rápido","rápidamente","rapidez","rapidísimo"], ca: ["ràpid","ràpidament","rapidesa","rapidíssim"] },
    1, '🏃',
    { es: "Los adverbios acabados en -mente dicen CÓMO se hace algo y no cambian de género ni número.", en: "Adverbs ending in -mente say HOW something is done and never change form.", ca: "Els adverbis acabats en -ment diuen COM es fa alguna cosa i no canvien." }),

  q('adv-12', 'primaria',
    { es: "En \"llegó tarde\", ¿qué tipo de adverbio es \"tarde\"?", en: "In \"llegó tarde\", what kind of adverb is \"tarde\"?", ca: "A \"va arribar tard\", quin tipus d'adverbi és \"tard\"?" },
    { es: ["De lugar","De tiempo","De modo","De cantidad"], en: ["De lugar","De tiempo","De modo","De cantidad"], ca: ["De lloc","De temps","De manera","De quantitat"] },
    1, '⏰',
    { es: "\"Tarde\" responde a cuándo: adverbio de tiempo, como ayer, hoy, siempre o pronto.", en: "\"Tarde\" answers when: an adverb of time.", ca: "\"Tard\" respon a quan: adverbi de temps." }),

  q('adv-13', 'primaria',
    { es: "¿Qué adverbio indica lugar?", en: "Which adverb shows place?", ca: "Quin adverbi indica lloc?" },
    { es: ["siempre","aquí","muy","bien"], en: ["siempre","aquí","muy","bien"], ca: ["sempre","aquí","molt","bé"] },
    1, '📍',
    { es: "\"Aquí\" dice dónde. \"Siempre\" es de tiempo, \"muy\" de cantidad y \"bien\" de modo.", en: "\"Aquí\" says where. The others are time, quantity and manner.", ca: "\"Aquí\" diu on. Els altres són de temps, quantitat i manera." }),

  q('adv-14', 'primaria',
    { es: "¿Cambia el adverbio según el género?", en: "Do adverbs change with gender?", ca: "Canvia l'adverbi segons el gènere?" },
    { es: ["Sí, siempre","No, es invariable","Solo en plural","Solo con verbos"], en: ["Sí, siempre","No, es invariable","Solo en plural","Solo con verbos"], ca: ["Sí, sempre","No, és invariable","Només en plural","Només amb verbs"] },
    1, '🔒',
    { es: "El adverbio es invariable: \"ellas corren rápidamente\", nunca \"rápidamentas\". Es lo que lo distingue del adjetivo.", en: "Adverbs are invariable: that is what separates them from adjectives.", ca: "L'adverbi és invariable: és el que el distingeix de l'adjectiu." }),

  q('adv-15', 'primaria',
    { es: "En \"come mucho\", ¿qué tipo de adverbio es \"mucho\"?", en: "In \"come mucho\", what kind of adverb is \"mucho\"?", ca: "A \"menja molt\", quin tipus d'adverbi és \"molt\"?" },
    { es: ["De cantidad","De lugar","De duda","De negación"], en: ["De cantidad","De lugar","De duda","De negación"], ca: ["De quantitat","De lloc","De dubte","De negació"] },
    0, '🍽️',
    { es: "\"Mucho\" dice cuánto: adverbio de cantidad, como poco, bastante o demasiado.", en: "\"Mucho\" says how much: an adverb of quantity.", ca: "\"Molt\" diu quant: adverbi de quantitat." }),

  q('adv-16', 'primaria',
    { es: "¿Cuál es el adverbio de \"lento\"?", en: "What is the adverb form of \"lento\"?", ca: "Quin és l'adverbi de \"lent\"?" },
    { es: ["lentos","lentamente","lentitud","lentísimo"], en: ["lentos","lentamente","lentitud","lentísimo"], ca: ["lents","lentament","lentitud","lentíssim"] },
    1, '🐌',
    { es: "Se forma con el femenino del adjetivo más -mente: lenta + mente → lentamente.", en: "It is formed from the feminine adjective plus -mente: lenta + mente.", ca: "Es forma amb el femení de l'adjectiu més -ment." }),

  q('adv-17', 'eso',
    { es: "¿A qué palabra puede complementar un adverbio?", en: "What can an adverb modify?", ca: "A quina paraula pot complementar un adverbi?" },
    { es: ["Solo al verbo","Al verbo, a un adjetivo o a otro adverbio","Solo al sustantivo","Solo al sujeto"], en: ["Solo al verbo","Al verbo, a un adjetivo o a otro adverbio","Solo al sustantivo","Solo al sujeto"], ca: ["Només al verb","Al verb, a un adjectiu o a un altre adverbi","Només al substantiu","Només al subjecte"] },
    1, '🔀',
    { es: "\"Corre rápido\" (verbo), \"muy alto\" (adjetivo), \"bastante bien\" (otro adverbio). Lo único que NO complementa es al sustantivo: de eso se encarga el adjetivo.", en: "It modifies verbs, adjectives or other adverbs — never nouns, which is the adjective's job.", ca: "Complementa verbs, adjectius o altres adverbis; mai el substantiu, que és feina de l'adjectiu." }),

  q('adv-18', 'eso',
    { es: "En \"quizá venga mañana\", ¿qué expresa \"quizá\"?", en: "In \"quizá venga mañana\", what does \"quizá\" express?", ca: "A \"potser vindrà demà\", què expressa \"potser\"?" },
    { es: ["Afirmación","Duda","Negación","Cantidad"], en: ["Afirmación","Duda","Negación","Cantidad"], ca: ["Afirmació","Dubte","Negació","Quantitat"] },
    1, '🤔',
    { es: "Los adverbios de duda (quizá, tal vez, acaso) marcan que lo dicho no es seguro, y suelen pedir subjuntivo.", en: "Adverbs of doubt (quizá, tal vez) mark uncertainty and usually take the subjunctive.", ca: "Els adverbis de dubte marquen que allò dit no és segur." }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
