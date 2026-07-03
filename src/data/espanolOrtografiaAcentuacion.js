function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('ac-01', 'primaria',
    { es: '¿Cuántas sílabas tiene "murciélago"?', en: 'How many syllables does "murciélago" have?', ca: 'Quantes síl·labes té "murciélago"?' },
    { es: ['3', '4', '5', '6'], en: ['3', '4', '5', '6'], ca: ['3', '4', '5', '6'] },
    1, '🦇',
    { es: 'Mur-cié-la-go = 4 sílabas. Es esdrújula (acento en la antepenúltima sílaba) → siempre lleva tilde.', en: 'Mur-cié-la-go = 4 syllables. It is esdrújula (stress on antepenultimate) → always takes an accent.', ca: 'Mur-cié-la-go = 4 síl·labes. És esdrúixola (accent en l\'antepenúltima síl·laba) → sempre porta accent.' }),

  q('ac-02', 'primaria',
    { es: '¿Cuál de estas palabras lleva tilde?', en: 'Which of these words takes an accent mark?', ca: 'Quina d\'aquestes paraules porta accent?' },
    { es: ['cafe', 'mesa', 'árbol', 'libro'], en: ['cafe', 'mesa', 'árbol', 'libro'], ca: ['cafe', 'taula', 'arbre', 'llibre'] },
    2, '´',
    { es: '"Árbol" es esdrújula (ÁR-bol) → siempre lleva tilde. "Café" lleva tilde por ser aguda acabada en vocal.', en: '"Árbol" is esdrújula → always takes accent. "Mesa" and "libro" are llanas ending in vowel/s/n → no accent.', ca: '"Àrbre" en català porta accent. "Árbol" en castellà és esdrúixola → sempre porta tilde.' }),

  q('ac-03', 'primaria',
    { es: '¿Qué son las palabras agudas?', en: 'What are "palabras agudas"?', ca: 'Què són les paraules agudes?' },
    { es: ['Las que tienen el acento en la última sílaba', 'Las que tienen el acento en la penúltima sílaba', 'Las que tienen el acento en la antepenúltima sílaba', 'Las que nunca llevan tilde'], en: ['Words stressed on the last syllable', 'Words stressed on the penultimate syllable', 'Words stressed on the antepenultimate syllable', 'Words that never take an accent'], ca: ['Les que tenen l\'accent a l\'última síl·laba', 'Les que tenen l\'accent a la penúltima síl·laba', 'Les que tenen l\'accent a l\'antepenúltima síl·laba', 'Les que mai porten accent'] },
    0, '⬆️',
    { es: 'Agudas: acento en la ÚLTIMA sílaba. Llevan tilde si terminan en vocal, -n o -s: café, camión, compás. No llevan: reloj, ciudad, papel.', en: 'Agudas: stress on the LAST syllable. Take accent if they end in vowel, -n or -s: café, camión, compás.', ca: 'Agudes: accent a l\'ÚLTIMA síl·laba. Porten accent si acaben en vocal, -n o -s: cafè, camió, compàs.' }),

  q('ac-04', 'primaria',
    { es: '¿Cuál de estas palabras llanas NO lleva tilde?', en: 'Which of these "llana" words does NOT take an accent?', ca: 'Quina d\'aquestes paraules planes NO porta accent?' },
    { es: ['fácil', 'árbol', 'casa', 'útil'], en: ['fácil', 'árbol', 'casa', 'útil'], ca: ['fàcil', 'àrbol', 'casa', 'útil'] },
    2, '🏠',
    { es: '"Casa" es llana (CA-sa) y termina en -a (vocal) → NO lleva tilde. Las llanas solo llevan tilde si NO terminan en vocal, -n o -s: fácil, árbol, útil.', en: '"Casa" is llana and ends in a vowel → no accent. Llanas only take accent if they do NOT end in vowel, -n or -s.', ca: '"Casa" és plana i acaba en -a (vocal) → NO porta accent. Les planes només porten accent si NO acaben en vocal, -n o -s.' }),

  q('ac-05', 'primaria',
    { es: '¿Llevan tilde todas las palabras esdrújulas?', en: 'Do all esdrújulas take an accent mark?', ca: 'Porten accent totes les paraules esdrúixoles?' },
    { es: ['Solo las que terminan en vocal', 'Solo las que terminan en consonante', 'Sí, siempre', 'No, nunca'], en: ['Only those ending in a vowel', 'Only those ending in a consonant', 'Yes, always', 'No, never'], ca: ['Només les que acaben en vocal', 'Només les que acaben en consonant', 'Sí, sempre', 'No, mai'] },
    2, '✅',
    { es: 'Las palabras esdrújulas y sobreesdrújulas SIEMPRE llevan tilde, sin excepción: cámara, música, pájaro, médico, teléfono.', en: 'Esdrújulas and sobreesdrújulas ALWAYS take an accent, no exceptions: cámara, música, médico.', ca: 'Les esdrúixoles SEMPRE porten accent, sense excepcions: càmera, música, metge (metge no, però sí: mèdic).' }),

  q('ac-06', 'primaria',
    { es: '¿Cuál de estos monosílabos lleva tilde diacrítica?', en: 'Which of these monosyllables takes a diacritic accent?', ca: 'Quin d\'aquests monosíl·labs porta accent diacrític?' },
    { es: ['el (artículo)', 'tu (posesivo)', 'tú (pronombre)', 'mi (posesivo)'], en: ['el (article)', 'tu (possessive)', 'tú (pronoun)', 'mi (possessive)'], ca: ['el (article)', 'tu (possessiu)', 'tú (pronom)', 'mi (possessiu)'] },
    2, '🔤',
    { es: '"Tú" (pronombre personal) lleva tilde para diferenciarse de "tu" (adjetivo posesivo). La tilde diacrítica distingue palabras iguales con distinto significado.', en: '"Tú" (pronoun) takes accent to distinguish from "tu" (possessive adjective). Diacritic accent distinguishes identical words with different meanings.', ca: '"Tu" (pronom) porta accent per diferenciar-se de "tu" (possessiu) en castellà. En català no s\'usa l\'accent diacrític en aquest cas.' }),

  q('ac-07', 'eso',
    { es: '¿Cuándo lleva tilde "mas"?', en: 'When does "mas" take an accent?', ca: 'Quan porta accent "mas"?' },
    { es: ['Siempre', 'Cuando es conjunción adversativa (=pero)', 'Cuando es adverbio de cantidad (=más)', 'Nunca lleva tilde'], en: ['Always', 'When it is an adversative conjunction (=but)', 'When it is a quantity adverb (=more)', 'Never takes accent'], ca: ['Sempre', 'Quan és conjunció adversativa (=però)', 'Quan és adverbi de quantitat (=més)', 'Mai porta accent'] },
    2, '⚖️',
    { es: '"Más" (adverbio de cantidad, comparativo: "quiero más") lleva tilde. "Mas" (conjunción adversativa, sinónimo de "pero", literario) no lleva tilde.', en: '"Más" (adverb of quantity: "I want more") takes accent. "Mas" (literary conjunction = "but") does not.', ca: '"Més" (adverbi de quantitat) porta accent. "Mas" (conjunció = però, literari) no en porta.' }),

  q('ac-08', 'eso',
    { es: '"Solo" como adverbio (=solamente), ¿lleva tilde?', en: 'Does "solo" as an adverb (=only) take an accent mark?', ca: '"Solo" com a adverbi (=solament), porta accent?' },
    { es: ['Sí, siempre', 'No, nunca', 'Solo cuando haya ambigüedad', 'Solo en textos literarios'], en: ['Yes, always', 'No, never', 'Only when there is ambiguity', 'Only in literary texts'], ca: ['Sí, sempre', 'No, mai', 'Només quan hi hagi ambigüitat', 'Només en textos literaris'] },
    1, '1️⃣',
    { es: 'Según la RAE (2010), "solo" ya NO lleva tilde en ningún caso. Antes se ponía tilde cuando era adverbio para diferenciarlo del adjetivo, pero ahora el contexto es suficiente.', en: 'According to the RAE (2010), "solo" no longer takes an accent in any case. Context is considered sufficient to distinguish adverb from adjective.', ca: 'Segons la RAE (2010), "solo" ja no porta accent en cap cas. El context és suficient per distingir adverbi d\'adjectiu.' }),

  q('ac-09', 'eso',
    { es: '¿Qué es un diptongo?', en: 'What is a diphthong?', ca: 'Què és un diftong?' },
    { es: ['Dos consonantes juntas', 'Dos vocales que forman una sola sílaba', 'Dos vocales que forman dos sílabas distintas', 'Una vocal fuerte sola'], en: ['Two consonants together', 'Two vowels forming a single syllable', 'Two vowels forming two separate syllables', 'A strong vowel alone'], ca: ['Dues consonants juntes', 'Dues vocals que formen una sola síl·laba', 'Dues vocals que formen dues síl·labes', 'Una vocal forta sola'] },
    1, '🔗',
    { es: 'Diptongo: dos vocales en la misma sílaba (vocal fuerte+débil o débil+débil): ai-re, ciu-dad, bue-no. Hiato: dos vocales en sílabas distintas: pa-ís, po-e-ta.', en: 'Diphthong: two vowels in the same syllable (strong+weak or weak+weak): ai-re, ciu-dad, bue-no. Hiatus: two vowels in separate syllables.', ca: 'Diftong: dues vocals en la mateixa síl·laba: ai-re, ciu-tat, bo-na. Hiat: dues vocals en síl·labes separades: pa-ís, po-e-ta.' }),

  q('ac-10', 'eso',
    { es: '¿Cuál de estas palabras tiene un hiato con tilde?', en: 'Which of these words has a hiatus with an accent?', ca: 'Quina d\'aquestes paraules té un hiat amb accent?' },
    { es: ['bueno', 'ciudad', 'país', 'aire'], en: ['bueno', 'ciudad', 'país', 'aire'], ca: ['bo', 'ciutat', 'país', 'aire'] },
    2, '🌍',
    { es: '"País" tiene hiato (pa-ís): vocal débil tónica junto a vocal fuerte → siempre lleva tilde para romper el diptongo. Otros: baúl, maíz, raíz, oír.', en: '"País" has a hiatus (pa-ís): stressed weak vowel next to strong vowel → always takes accent to break the diphthong. Others: baúl, maíz, raíz.', ca: '"País" té hiat (pa-ís): vocal dèbil tònica + vocal forta → sempre porta accent per trencar el diftong.' }),

  q('ac-11', 'eso',
    { es: '¿Cuál de estas palabras lleva tilde diacrítica correctamente?', en: 'Which of these correctly uses a diacritic accent?', ca: 'Quina d\'aquestes paraules usa correctament l\'accent diacrític?' },
    { es: ['"él" (artículo)', '"sé" (verbo saber/ser)', '"de" (preposición)', '"se" (pronombre reflexivo)'], en: ['"él" (article)', '"sé" (verb saber/ser)', '"de" (preposition)', '"se" (reflexive pronoun)'], ca: ['"él" (article)', '"sé" (verb saber/ser)', '"de" (preposició)', '"se" (pronom reflexiu)'] },
    1, '📖',
    { es: '"Sé" lleva tilde cuando es verbo (sé = yo sé / sé tú [imperativo de ser]). "Se" sin tilde = pronombre reflexivo. Pares: él/el, tú/tu, mí/mi, más/mas, sí/si, té/te, dé/de.', en: '"Sé" (verb: I know / be!) takes accent. "Se" (reflexive pronoun) does not. Diacritic pairs: él/el, tú/tu, mí/mi, más/mas, sí/si.', ca: '"Sé" porta accent quan és verb (jo sé / sigues). "Se" sense accent = pronom reflexiu.' }),

  q('ac-12', 'eso',
    { es: '¿Cuál es la sílaba tónica de "teléfono"?', en: 'What is the stressed syllable of "teléfono"?', ca: 'Quina és la síl·laba tònica de "teléfono"?' },
    { es: ['te-', 'lé-', '-fo-', '-no'], en: ['te-', 'lé-', '-fo-', '-no'], ca: ['te-', 'lè-', '-fo-', '-no'] },
    1, '📱',
    { es: 'Te-LÉ-fo-no: la sílaba tónica es "lé" (la tercera contando desde el final = antepenúltima) → palabra esdrújula → lleva tilde.', en: 'Te-LÉ-fo-no: the stressed syllable is "lé" (3rd from end = antepenultimate) → esdrújula → takes accent.', ca: 'Te-LÈ-fo-no: la síl·laba tònica és "lè" → paraula esdrúixola → porta accent.' }),

  q('ac-13', 'eso',
    { es: '¿Cuál de estas interrogativas/exclamativas lleva tilde?', en: 'Which of these interrogatives/exclamatives takes an accent?', ca: 'Quina d\'aquestes interrogatives/exclamatives porta accent?' },
    { es: ['"cuando" en "cuando quieras"', '"donde" en "donde estés"', '"qué" en "¿qué quieres?"', '"que" en "creo que sí"'], en: ['"cuando" in "cuando quieras"', '"donde" in "donde estés"', '"qué" in "¿qué quieres?"', '"que" in "creo que sí"'], ca: ['"cuando" en "cuando quieras"', '"donde" en "donde estés"', '"qué" en "¿qué quieres?"', '"que" en "creo que sí"'] },
    2, '❓',
    { es: 'Los pronombres y adverbios interrogativos y exclamativos llevan tilde: qué, quién, cuándo, dónde, cómo, cuánto, cuál. En oraciones enunciativas, sin tilde: que, quien, cuando, donde.', en: 'Interrogative/exclamative pronouns and adverbs take accent: qué, quién, cuándo, dónde, cómo. In statements, no accent: que, quien, cuando, donde.', ca: 'Els pronoms i adverbis interrogatius i exclamatius porten accent: qué, quién, cuándo, dónde, cómo. En oracions enunciatives, sense accent.' }),

  q('ac-14', 'eso',
    { es: '"Aun" y "aún", ¿cuándo llevan tilde?', en: 'When does "aún" take an accent (vs "aun")?', ca: 'Quan porta accent "aún" (vs "aun")?' },
    { es: ['Siempre', '"Aún" lleva tilde cuando significa "todavía"', '"Aun" lleva tilde cuando significa "incluso"', 'Nunca llevan tilde'], en: ['Always', '"Aún" takes accent when it means "still/yet"', '"Aun" takes accent when it means "even"', 'Never take accent'], ca: ['Sempre', '"Aún" porta accent quan significa "encara"', '"Aun" porta accent quan significa "fins i tot"', 'Mai porten accent'] },
    1, '🎯',
    { es: '"Aún" (con tilde) = todavía: "Aún no ha llegado". "Aun" (sin tilde) = incluso: "Aun así, no quiero ir". La tilde diacrítica los distingue.', en: '"Aún" (with accent) = still: "Aún no ha llegado". "Aun" (no accent) = even: "Aun así, no quiero ir".', ca: '"Aún" (amb accent) = encara: "Aún no ha llegat". "Aun" (sense accent) = fins i tot: "Aun así, no vull anar-hi".' }),

  q('ac-15', 'eso',
    { es: '"Este" como demostrativo, ¿lleva tilde?', en: 'Does "este" as a demonstrative take an accent?', ca: '"Este" com a demostratiu, porta accent?' },
    { es: ['Sí, siempre', 'No, según la RAE (2010), nunca', 'Solo cuando es pronombre, no cuando es adjetivo', 'Solo en textos ambiguos'], en: ['Yes, always', 'No, according to RAE (2010), never', 'Only as a pronoun, not as an adjective', 'Only in ambiguous texts'], ca: ['Sí, sempre', 'No, segons la RAE (2010), mai', 'Només quan és pronom, no quan és adjectiu', 'Només en textos ambigus'] },
    1, '📚',
    { es: 'Según la RAE (2010), los demostrativos (este, ese, aquel y sus variantes) ya NO llevan tilde en ningún caso, ni cuando funcionan como pronombres.', en: 'According to RAE (2010), demonstratives (este, ese, aquel) no longer take accent marks in any case, not even as pronouns.', ca: 'Segons la RAE (2010), els demostratius (este, ese, aquel) ja no porten accent mai, ni quan funcionen com a pronoms.' }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
