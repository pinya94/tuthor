// Páginas de estudio de ortografía: /estudiar/idiomas/espanol/ortografia/<slug>.
// Hasta nov-2026 ortografía solo tenía un índice con tarjetas de examen, y es
// de lo que más se busca (autocompletado de Google: «palabras agudas llanas y
// esdrújulas wordwall», «diptongo e hiato ejercicios», «uso de la b y la v
// primaria», «signos de puntuación ejercicios»).
//
// Se fusiona en CONTENIDO_TEMA (estudioTemaContenido.js) con la clave = slug.
// Material en castellano en los tres idiomas; la prosa se traduce.

const T = (es, en, ca) => ({ es, en, ca })
const L = T

const acentuacion = {
  metaTitle: L('Palabras agudas, llanas y esdrújulas: reglas de acentuación, diptongo e hiato — resumen y ejercicios', 'Spanish stress and accents: agudas, llanas and esdrújulas, diphthongs and hiatus — summary and practice questions', 'Paraules agudes, planes i esdrúixoles en castellà: regles d’accentuació, diftong i hiat — resum i exercicis'),
  metaDesc: L('Cuándo lleva tilde una palabra aguda, llana o esdrújula, diptongo e hiato y la tilde diacrítica (tú/tu, él/el), con tablas, ejemplos y ejercicios resueltos.', 'When Spanish agudas, llanas and esdrújulas take a written accent, diphthongs and hiatus, and the diacritic accent (tú/tu, él/el), with tables and solved exercises.', 'Quan porta accent una paraula aguda, plana o esdrúixola en castellà, diftong i hiat i l’accent diacrític (tú/tu, él/el), amb taules i exercicis resolts.'),
  resumen: L(
    ['Todas las palabras tienen una sílaba que se pronuncia con más fuerza: la sílaba tónica. Según dónde esté, las palabras son agudas (la última: ca-fé), llanas o graves (la penúltima: ár-bol), esdrújulas (la antepenúltima: mú-si-ca) o sobresdrújulas (antes de la antepenúltima: dí-ga-me-lo). La tilde es la rayita que, a veces, se escribe sobre la vocal tónica.', 'Que una palabra lleve tilde depende de dos cosas: qué tipo de palabra es y en qué letra acaba. Las agudas la llevan si acaban en vocal, n o s; las llanas, justo al revés; y las esdrújulas y sobresdrújulas, siempre. Además hay reglas para las vocales juntas (diptongo e hiato) y para distinguir palabras que se escriben igual (tú y tu).'],
    ['Every Spanish word has one syllable that is said more strongly: the stressed syllable. Depending on where it falls, words are agudas (the last one: ca-fé), llanas or graves (the second to last: ár-bol), esdrújulas (the third to last: mú-si-ca) or sobresdrújulas (earlier still: dí-ga-me-lo). The written accent (tilde) is the small mark sometimes placed over the stressed vowel.', 'Whether a word takes a written accent depends on two things: what type of word it is and which letter it ends in. Agudas take one if they end in a vowel, n or s; llanas, exactly the opposite; and esdrújulas and sobresdrújulas always do. There are also rules for vowels side by side (diphthongs and hiatus) and for telling apart words spelt the same (tú and tu).'],
    ['Totes les paraules tenen una síl·laba que es pronuncia amb més força: la síl·laba tònica. Segons on sigui, en castellà les paraules són agudes (l’última: ca-fé), planes o greus (la penúltima: ár-bol), esdrúixoles (l’antepenúltima: mú-si-ca) o sobreesdrúixoles (abans de l’antepenúltima: dí-ga-me-lo). L’accent gràfic (tilde) és la ratlleta que, de vegades, s’escriu sobre la vocal tònica.', 'Que una paraula porti accent depèn de dues coses: quin tipus de paraula és i en quina lletra acaba. Les agudes en porten si acaben en vocal, n o s; les planes, just al revés; i les esdrúixoles i sobreesdrúixoles, sempre. A més hi ha regles per a les vocals juntes (diftong i hiat) i per distingir paraules que s’escriuen igual (tú i tu).'],
  ),
  puntosClave: L(
    ['Agudas: tilde si acaban en vocal, n o s (café, camión, compás).', 'Llanas: tilde si NO acaban en vocal, n o s (árbol, lápiz, cárcel).', 'Esdrújulas y sobresdrújulas: tilde siempre (música, dígamelo).', 'Los monosílabos no llevan tilde (fue, dio, pie), salvo la diacrítica.', 'Hiato con vocal cerrada tónica: tilde siempre (día, baúl, reír).', 'Tilde diacrítica: tú/tu, él/el, mí/mi, sí/si, té/te, dé/de, sé/se, más/mas.'],
    ['Agudas: accent if they end in a vowel, n or s (café, camión, compás).', 'Llanas: accent if they do NOT end in a vowel, n or s (árbol, lápiz, cárcel).', 'Esdrújulas and sobresdrújulas: always an accent (música, dígamelo).', 'One-syllable words take no accent (fue, dio, pie), except the diacritic one.', 'Hiatus with a stressed closed vowel: always an accent (día, baúl, reír).', 'Diacritic accent: tú/tu, él/el, mí/mi, sí/si, té/te, dé/de, sé/se, más/mas.'],
    ['Agudes: accent si acaben en vocal, n o s (café, camión, compás).', 'Planes: accent si NO acaben en vocal, n o s (árbol, lápiz, cárcel).', 'Esdrúixoles i sobreesdrúixoles: accent sempre (música, dígamelo).', 'Els monosíl·labs no porten accent (fue, dio, pie), llevat del diacrític.', 'Hiat amb vocal tancada tònica: accent sempre (día, baúl, reír).', 'Accent diacrític: tú/tu, él/el, mí/mi, sí/si, té/te, dé/de, sé/se, más/mas.'],
  ),
  secciones: [
    {
      titulo: L('Agudas, llanas y esdrújulas: tabla de reglas', 'Agudas, llanas and esdrújulas: rules table', 'Agudes, planes i esdrúixoles: taula de regles'),
      tabla: {
        columnas: L(['Tipo', 'Sílaba tónica', 'Llevan tilde', 'Con tilde', 'Sin tilde'], ['Type', 'Stressed syllable', 'Accent when', 'With accent', 'Without'], ['Tipus', 'Síl·laba tònica', 'Porten accent', 'Amb accent', 'Sense accent']),
        filas: [
          [L('Agudas', 'Agudas', 'Agudes'), L('última', 'last', 'última'), L('si acaban en vocal, n o s', 'if they end in a vowel, n or s', 'si acaben en vocal, n o s'), 'café, camión, compás', 'reloj, papel, salir'],
          [L('Llanas o graves', 'Llanas (graves)', 'Planes o greus'), L('penúltima', 'second to last', 'penúltima'), L('si no acaban en vocal, n o s', 'if they do not end in a vowel, n or s', 'si no acaben en vocal, n o s'), 'árbol, lápiz, fácil', 'casa, examen, lunes'],
          [L('Esdrújulas', 'Esdrújulas', 'Esdrúixoles'), L('antepenúltima', 'third to last', 'antepenúltima'), L('siempre', 'always', 'sempre'), 'música, pájaro, teléfono', '—'],
          [L('Sobresdrújulas', 'Sobresdrújulas', 'Sobreesdrúixoles'), L('antes de la antepenúltima', 'before the third to last', 'abans de l’antepenúltima'), L('siempre', 'always', 'sempre'), 'dígamelo, cómetelo', '—'],
        ],
      },
      lista: L(
        ['Llanas acabadas en -s tras otra consonante llevan tilde: bíceps, cómics, fórceps. Y las agudas en ese caso no: robots, tictacs.', 'Al pasar al plural, algunas palabras ganan o pierden la tilde porque cambian de tipo: examen → exámenes (esdrújula), camión → camiones (llana).'],
        ['Llanas ending in -s after another consonant do take an accent: bíceps, cómics, fórceps. Agudas in that case do not: robots, tictacs.', 'In the plural some words gain or lose the accent because their type changes: examen → exámenes (esdrújula), camión → camiones (llana).'],
        ['Les planes acabades en -s després d’una altra consonant porten accent: bíceps, cómics, fórceps. I les agudes en aquest cas no: robots, tictacs.', 'En passar al plural, algunes paraules guanyen o perden l’accent perquè canvien de tipus: examen → exámenes (esdrúixola), camión → camiones (plana).'],
      ),
    },
    {
      titulo: L('Diptongo, triptongo e hiato', 'Diphthongs, triphthongs and hiatus', 'Diftong, triftong i hiat'),
      texto: L(
        ['Las vocales abiertas son a, e, o y las cerradas, i, u. Dos vocales juntas pueden ir en la misma sílaba (diptongo) o en sílabas distintas (hiato).'],
        ['The open vowels are a, e, o and the closed ones, i, u. Two vowels side by side can be in the same syllable (a diphthong) or in different syllables (hiatus).'],
        ['Les vocals obertes són a, e, o i les tancades, i, u. Dues vocals juntes poden anar a la mateixa síl·laba (diftong) o en síl·labes diferents (hiat).'],
      ),
      tabla: {
        columnas: L(['Caso', 'Cómo es', 'Ejemplos', 'Tilde'], ['Case', 'What it is', 'Examples', 'Accent'], ['Cas', 'Com és', 'Exemples', 'Accent']),
        filas: [
          [L('Diptongo', 'Diphthong', 'Diftong'), L('abierta + cerrada átona, o dos cerradas', 'open + unstressed closed, or two closed', 'oberta + tancada àtona, o dues tancades'), 'cie-lo, cau-sa, ciu-dad, aire', L('reglas generales (can-ción, des-pués)', 'general rules (can-ción, des-pués)', 'regles generals (can-ción, des-pués)')],
          [L('Triptongo', 'Triphthong', 'Triftong'), L('cerrada + abierta + cerrada', 'closed + open + closed', 'tancada + oberta + tancada'), 'buey, Uruguay, averiguáis', L('reglas generales', 'general rules', 'regles generals')],
          [L('Hiato de dos abiertas', 'Hiatus of two open vowels', 'Hiat de dues obertes'), L('dos vocales abiertas', 'two open vowels', 'dues vocals obertes'), 'le-ón, ca-er, po-e-ta, a-é-re-o', L('reglas generales', 'general rules', 'regles generals')],
          [L('Hiato con cerrada tónica', 'Hiatus with stressed closed vowel', 'Hiat amb tancada tònica'), L('i o u tónica junto a abierta', 'stressed i or u next to an open vowel', 'i o u tònica al costat d’oberta'), 'dí-a, pa-ís, ba-úl, re-ír, Ra-úl', L('siempre, aunque rompa las reglas', 'always, even against the rules', 'sempre, encara que trenqui les regles')],
        ],
      },
    },
    {
      titulo: L('La tilde diacrítica', 'The diacritic accent', 'L’accent diacrític'),
      texto: L(
        ['Sirve para distinguir palabras que se escriben igual pero tienen distinta función. Los interrogativos y exclamativos (qué, quién, cómo, cuándo, dónde, cuánto, cuál) la llevan siempre, también en preguntas indirectas: «No sé dónde vive». La norma general es escribir sin tilde solo y los demostrativos (este, ese, aquel).'],
        ['It tells apart words that are spelt the same but have a different function. Interrogatives and exclamatives (qué, quién, cómo, cuándo, dónde, cuánto, cuál) always take it, also in indirect questions: «No sé dónde vive». The general rule is to write solo and the demonstratives (este, ese, aquel) without an accent.'],
        ['Serveix per distingir paraules que s’escriuen igual però tenen una funció diferent. Els interrogatius i exclamatius (qué, quién, cómo, cuándo, dónde, cuánto, cuál) el porten sempre, també en preguntes indirectes: «No sé dónde vive». La norma general és escriure sense accent solo i els demostratius (este, ese, aquel).'],
      ),
      tabla: {
        columnas: L(['Con tilde', 'Sin tilde'], ['With accent', 'Without accent'], ['Amb accent', 'Sense accent']),
        filas: [
          ['tú (pronombre): «Tú lo sabes»', 'tu (posesivo): «tu casa»'],
          ['él (pronombre): «Él vino»', 'el (artículo): «el coche»'],
          ['mí (pronombre): «para mí»', 'mi (posesivo): «mi libro»'],
          ['sí (afirmación o pronombre): «Dijo que sí»', 'si (condición): «Si llueve, no voy»'],
          ['té (bebida): «un té»', 'te (pronombre): «Te llamo»'],
          ['más (cantidad): «quiero más»', 'mas (pero): «lo intentó, mas no pudo»'],
          ['sé (de saber o ser): «No lo sé»', 'se (pronombre): «Se fue»'],
          ['dé (de dar): «Que te dé la llave»', 'de (preposición): «la casa de Ana»'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cómo sé si una palabra es aguda, llana o esdrújula?', 'How do I know whether a word is aguda, llana or esdrújula?', 'Com sé si una paraula és aguda, plana o esdrúixola?'),
      r: T('Sepárala en sílabas, dila en voz alta como si llamaras a alguien desde lejos y fíjate en cuál suena más fuerte. Después cuenta desde el final: la última (aguda), la penúltima (llana) o la antepenúltima (esdrújula).', 'Split it into syllables, say it aloud as if calling someone from far away and notice which one sounds strongest. Then count from the end: the last (aguda), the second to last (llana) or the third to last (esdrújula).', 'Separa-la en síl·labes, digues-la en veu alta com si cridessis algú de lluny i fixa’t en quina sona més fort. Després compta des del final: l’última (aguda), la penúltima (plana) o l’antepenúltima (esdrúixola).') },
    { p: T('¿Por qué «examen» no lleva tilde y «exámenes» sí?', 'Why does «examen» have no accent but «exámenes» does?', 'Per què «examen» no porta accent i «exámenes» sí?'),
      r: T('Examen es llana y acaba en n, así que no la lleva. Al añadir -es, la sílaba tónica (xa) pasa a ser la antepenúltima: exámenes es esdrújula, y las esdrújulas siempre llevan tilde.', 'Examen is a llana ending in n, so it takes none. Adding -es makes the stressed syllable (xa) the third to last: exámenes is an esdrújula, and esdrújulas always take an accent.', 'Examen és plana i acaba en n, així que no en porta. En afegir -es, la síl·laba tònica (xa) passa a ser l’antepenúltima: exámenes és esdrúixola, i les esdrúixoles sempre porten accent.') },
    { p: T('¿«Guion», «fue» y «dio» llevan tilde?', 'Do «guion», «fue» and «dio» take an accent?', '«Guion», «fue» i «dio» porten accent?'),
      r: T('No. Son monosílabos (la ui y la ue e io son diptongos) y los monosílabos no llevan tilde, salvo los de la tilde diacrítica.', 'No. They are one-syllable words (ui, ue and io are diphthongs) and one-syllable words take no accent, except the diacritic ones.', 'No. Són monosíl·labs (ui, ue i io són diftongs) i els monosíl·labs no porten accent, llevat dels de l’accent diacrític.') },
  ],
  ejercicios: [
    { e: T('Pon la tilde donde haga falta y di de qué tipo es cada palabra: arbol, cafe, camion, examen, musica, reloj, lapiz.', 'Add the accent where needed and say what type each word is: arbol, cafe, camion, examen, musica, reloj, lapiz.', 'Posa l’accent on calgui i digues de quin tipus és cada paraula: arbol, cafe, camion, examen, musica, reloj, lapiz.'),
      s: T('Árbol (llana en l), café (aguda en vocal), camión (aguda en n), examen (llana en n: sin tilde), música (esdrújula), reloj (aguda en j: sin tilde), lápiz (llana en z).', 'Árbol (llana ending in l), café (aguda ending in a vowel), camión (aguda ending in n), examen (llana ending in n: no accent), música (esdrújula), reloj (aguda ending in j: no accent), lápiz (llana ending in z).', 'Árbol (plana en l), café (aguda en vocal), camión (aguda en n), examen (plana en n: sense accent), música (esdrúixola), reloj (aguda en j: sense accent), lápiz (plana en z).') },
    { e: T('¿Diptongo o hiato? ciudad, país, poeta, aire, río.', 'Diphthong or hiatus? ciudad, país, poeta, aire, río.', 'Diftong o hiat? ciudad, país, poeta, aire, río.'),
      s: T('Diptongo: ciu-dad, ai-re. Hiato: pa-ís, po-e-ta, rí-o (país y río llevan tilde por ser hiato con cerrada tónica).', 'Diphthong: ciu-dad, ai-re. Hiatus: pa-ís, po-e-ta, rí-o (país and río take an accent because the hiatus has a stressed closed vowel).', 'Diftong: ciu-dad, ai-re. Hiat: pa-ís, po-e-ta, rí-o (país i río porten accent perquè són hiat amb tancada tònica).') },
    { e: T('Corrige: «¿Tu sabes si el te quiere?».', 'Correct: «¿Tu sabes si el te quiere?».', 'Corregeix: «¿Tu sabes si el te quiere?».'),
      s: T('«¿Tú sabes si él te quiere?». Tú y él son pronombres; si (condición) y te (pronombre) van sin tilde.', '«¿Tú sabes si él te quiere?». Tú and él are pronouns; si (condition) and te (pronoun) take no accent.', '«¿Tú sabes si él te quiere?». Tú i él són pronoms; si (condició) i te (pronom) van sense accent.') },
    { e: T('Separa en sílabas y clasifica: teléfono, ordenador, cárcel.', 'Split into syllables and classify: teléfono, ordenador, cárcel.', 'Separa en síl·labes i classifica: teléfono, ordenador, cárcel.'),
      s: T('te-lé-fo-no (esdrújula), or-de-na-dor (aguda, acaba en r: sin tilde), cár-cel (llana, acaba en l: con tilde).', 'te-lé-fo-no (esdrújula), or-de-na-dor (aguda, ends in r: no accent), cár-cel (llana, ends in l: accent).', 'te-lé-fo-no (esdrúixola), or-de-na-dor (aguda, acaba en r: sense accent), cár-cel (plana, acaba en l: amb accent).') },
    { e: T('Escribe el plural y explica la tilde: joven, camión, lápiz.', 'Write the plural and explain the accent: joven, camión, lápiz.', 'Escriu el plural i explica l’accent: joven, camión, lápiz.'),
      s: T('Jóvenes (pasa a esdrújula: tilde), camiones (pasa a llana acabada en s: sin tilde), lápices (pasa a esdrújula: tilde).', 'Jóvenes (it becomes esdrújula: accent), camiones (it becomes a llana ending in s: no accent), lápices (it becomes esdrújula: accent).', 'Jóvenes (passa a esdrúixola: accent), camiones (passa a plana acabada en s: sense accent), lápices (passa a esdrúixola: accent).') },
    { e: T('¿Lleva tilde «donde» en estas frases? «La casa donde vivo» y «No sé donde vive».', 'Does «donde» take an accent here? «La casa donde vivo» and «No sé donde vive».', 'Porta accent «donde» en aquestes frases? «La casa donde vivo» i «No sé donde vive».'),
      s: T('En la primera no (es relativo: «la casa donde vivo»); en la segunda sí, porque es una pregunta indirecta: «No sé dónde vive».', 'Not in the first (it is a relative: «la casa donde vivo»); yes in the second, because it is an indirect question: «No sé dónde vive».', 'A la primera no (és relatiu: «la casa donde vivo»); a la segona sí, perquè és una pregunta indirecta: «No sé dónde vive».') },
  ],
}

const byv = {
  metaTitle: L('Uso de la b y la v: reglas, ejemplos y excepciones — resumen y ejercicios', 'Spanish spelling: when to use b and v — rules, examples and practice questions', 'Ús de la b i la v en castellà: regles, exemples i excepcions — resum i exercicis'),
  metaDesc: L('Cuándo se escribe b y cuándo v: -bir, -aba, bu-, bi-, -bilidad, mb; -ivo, -iva, nv, estuve, eva-. Con excepciones, homófonos (tubo/tuvo) y ejercicios resueltos.', 'When to write b and when v in Spanish: -bir, -aba, bu-, bi-, -bilidad, mb; -ivo, -iva, nv, estuve, eva-. With exceptions, homophones (tubo/tuvo) and solved exercises.', 'Quan s’escriu b i quan v en castellà: -bir, -aba, bu-, bi-, -bilidad, mb; -ivo, -iva, nv, estuve, eva-. Amb excepcions, homòfons (tubo/tuvo) i exercicis resolts.'),
  resumen: L(
    ['En español la b y la v suenan igual, así que no se puede saber cuál va «de oído». Por eso hay reglas que agrupan los casos más frecuentes: terminaciones de verbos, prefijos y letras que van delante o detrás.', 'Las reglas cubren muchas palabras, pero no todas: hay excepciones y palabras que hay que aprender de memoria. Lo que más ayuda es fijarse en la familia de la palabra: si se escribe con b «saber», también «sabio» y «sabiduría».'],
    ['In Spanish b and v sound the same, so you cannot tell which one goes «by ear». That is why there are rules grouping the most frequent cases: verb endings, prefixes and the letters before or after them.', 'The rules cover many words but not all: there are exceptions and words you simply have to learn. What helps most is looking at the word family: if «saber» is spelt with b, so are «sabio» and «sabiduría».'],
    ['En castellà la b i la v sonen igual, així que no es pot saber quina va «d’oïda». Per això hi ha regles que agrupen els casos més freqüents: terminacions de verbs, prefixos i lletres que van davant o darrere.', 'Les regles cobreixen moltes paraules, però no totes: hi ha excepcions i paraules que cal aprendre de memòria. El que més ajuda és fixar-se en la família de la paraula: si «saber» s’escriu amb b, també «sabio» i «sabiduría».'],
  ),
  puntosClave: L(
    ['Con b: verbos en -bir (escribir), salvo hervir, servir y vivir.', 'Con b: el pasado -aba, -abas… (cantaba, iba).', 'Con b: delante de consonante (blanco, obtener) y después de m (cambio).', 'Con v: después de n, d y b (enviar, adverbio, obvio).', 'Con v: adjetivos en -avo, -evo, -ivo (octavo, nuevo, activo).', 'Con v: estuve, anduve, tuve y las formas de ir (voy, vaya).'],
    ['With b: verbs ending in -bir (escribir), except hervir, servir and vivir.', 'With b: the past endings -aba, -abas… (cantaba, iba).', 'With b: before a consonant (blanco, obtener) and after m (cambio).', 'With v: after n, d and b (enviar, adverbio, obvio).', 'With v: adjectives in -avo, -evo, -ivo (octavo, nuevo, activo).', 'With v: estuve, anduve, tuve and the forms of ir (voy, vaya).'],
    ['Amb b: verbs en -bir (escribir), llevat d’hervir, servir i vivir.', 'Amb b: el passat -aba, -abas… (cantaba, iba).', 'Amb b: davant de consonant (blanco, obtener) i després de m (cambio).', 'Amb v: després de n, d i b (enviar, adverbio, obvio).', 'Amb v: adjectius en -avo, -evo, -ivo (octavo, nuevo, activo).', 'Amb v: estuve, anduve, tuve i les formes d’ir (voy, vaya).'],
  ),
  secciones: [
    {
      titulo: L('Cuándo se escribe b', 'When to write b', 'Quan s’escriu b'),
      tabla: {
        columnas: L(['Regla', 'Ejemplos', 'Excepciones'], ['Rule', 'Examples', 'Exceptions'], ['Regla', 'Exemples', 'Excepcions']),
        filas: [
          [L('Verbos acabados en -bir', 'Verbs ending in -bir', 'Verbs acabats en -bir'), 'escribir, recibir, subir', 'hervir, servir, vivir'],
          [L('Pasado en -aba, -abas, -ábamos…', 'Past endings -aba, -abas, -ábamos…', 'Passat en -aba, -abas, -ábamos…'), 'cantaba, jugábamos, iba', '—'],
          [L('Antes de consonante (bl, br…)', 'Before a consonant (bl, br…)', 'Davant de consonant (bl, br…)'), 'blanco, brazo, obtener, abdomen', '—'],
          [L('Después de m', 'After m', 'Després de m'), 'cambio, hombro, tambor', '—'],
          [L('Empiezan por bu-, bur-, bus-', 'Starting bu-, bur-, bus-', 'Comencen per bu-, bur-, bus-'), 'bueno, burla, buscar', 'vudú'],
          [L('Empiezan por bi-, bis-, biz- (dos)', 'Starting bi-, bis-, biz- (two)', 'Comencen per bi-, bis-, biz- (dos)'), 'bicicleta, bisabuelo, bizcocho', '—'],
          [L('Acabadas en -bilidad', 'Ending in -bilidad', 'Acabades en -bilidad'), 'amabilidad, posibilidad', 'movilidad, civilidad'],
          [L('Acabadas en -bundo, -bunda', 'Ending in -bundo, -bunda', 'Acabades en -bundo, -bunda'), 'vagabundo, nauseabunda', '—'],
        ],
      },
    },
    {
      titulo: L('Cuándo se escribe v', 'When to write v', 'Quan s’escriu v'),
      tabla: {
        columnas: L(['Regla', 'Ejemplos', 'Excepciones'], ['Rule', 'Examples', 'Exceptions'], ['Regla', 'Exemples', 'Excepcions']),
        filas: [
          [L('Después de n, d y b', 'After n, d and b', 'Després de n, d i b'), 'enviar, invierno, adverbio, obvio', '—'],
          [L('Adjetivos en -avo, -ava, -evo, -eva, -ivo, -iva', 'Adjectives in -avo, -ava, -evo, -eva, -ivo, -iva', 'Adjectius en -avo, -ava, -evo, -eva, -ivo, -iva'), 'octavo, nueva, activo, nociva', 'árabe, mancebo'],
          [L('Pasados de estar, andar y tener', 'Past forms of estar, andar and tener', 'Passats d’estar, andar i tener'), 'estuve, anduvo, tuviera', '—'],
          [L('Presente del verbo ir', 'Present of the verb ir', 'Present del verb ir'), 'voy, vas, vaya', '—'],
          [L('Empiezan por eva-, eve-, evi-, evo-', 'Starting eva-, eve-, evi-, evo-', 'Comencen per eva-, eve-, evi-, evo-'), 'evaluar, evento, evitar, evolución', 'ébano'],
          [L('Empiezan por vice-, villa-', 'Starting vice-, villa-', 'Comencen per vice-, villa-'), 'vicepresidente, villano', '—'],
        ],
      },
      lista: L(
        ['Homófonos que cambian de significado: tubo (cilindro) / tuvo (de tener); vaca (animal) / baca (del coche); votar (en unas elecciones) / botar (una pelota); bello (bonito) / vello (pelo).'],
        ['Homophones that change meaning: tubo (tube) / tuvo (from tener); vaca (cow) / baca (roof rack); votar (to vote) / botar (to bounce); bello (beautiful) / vello (body hair).'],
        ['Homòfons que canvien de significat: tubo (cilindre) / tuvo (de tener); vaca (animal) / baca (del cotxe); votar (en unes eleccions) / botar (una pilota); bello (bonic) / vello (pèl).'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Por qué «iba» se escribe con b si «ir» no tiene b?', 'Why is «iba» spelt with b when «ir» has no b?', 'Per què «iba» s’escriu amb b si «ir» no té b?'),
      r: T('Porque es pretérito imperfecto y esas terminaciones (-aba, -ba) van siempre con b. En cambio, el presente de ir va con v: voy, vas, va.', 'Because it is the imperfect past, and those endings (-aba, -ba) always take b. The present of ir, however, takes v: voy, vas, va.', 'Perquè és pretèrit imperfet i aquestes terminacions (-aba, -ba) van sempre amb b. En canvi, el present d’ir va amb v: voy, vas, va.') },
    { p: T('¿«Tubo» o «tuvo»?', '«Tubo» or «tuvo»?', '«Tubo» o «tuvo»?'),
      r: T('Tubo es un objeto (un tubo de pasta de dientes) y tuvo es el verbo tener (ayer tuvo fiebre).', 'Tubo is an object (a tube of toothpaste) and tuvo is the verb tener (ayer tuvo fiebre).', 'Tubo és un objecte (un tub de pasta de dents) i tuvo és el verb tener (ayer tuvo fiebre).') },
  ],
  ejercicios: [
    { e: T('Completa con b o v: escri_ir, i_a (de ir), o_tener, nue_o, en_iar, cam_io.', 'Fill in b or v: escri_ir, i_a (from ir), o_tener, nue_o, en_iar, cam_io.', 'Completa amb b o v: escri_ir, i_a (d’ir), o_tener, nue_o, en_iar, cam_io.'),
      s: T('Escribir (-bir), iba (-ba), obtener (b + consonante), nuevo (-evo), enviar (nv), cambio (mb).', 'Escribir (-bir), iba (-ba), obtener (b + consonant), nuevo (-evo), enviar (nv), cambio (mb).', 'Escribir (-bir), iba (-ba), obtener (b + consonant), nuevo (-evo), enviar (nv), cambio (mb).') },
    { e: T('¿Tubo o tuvo? «Ayer ___ un examen» y «Se rompió el ___ del agua».', 'Tubo or tuvo? «Ayer ___ un examen» and «Se rompió el ___ del agua».', 'Tubo o tuvo? «Ayer ___ un examen» i «Se rompió el ___ del agua».'),
      s: T('«Ayer tuvo un examen» (verbo tener) y «Se rompió el tubo del agua» (el objeto).', '«Ayer tuvo un examen» (verb tener) and «Se rompió el tubo del agua» (the object).', '«Ayer tuvo un examen» (verb tener) i «Se rompió el tubo del agua» (l’objecte).') },
    { e: T('Escribe el pasado (yo) de estar, andar y tener.', 'Write the past (yo) of estar, andar and tener.', 'Escriu el passat (yo) d’estar, andar i tener.'),
      s: T('Estuve, anduve y tuve: siempre con v.', 'Estuve, anduve and tuve: always with v.', 'Estuve, anduve i tuve: sempre amb v.') },
    { e: T('Estas palabras rompen una regla: ¿cuál? hervir, servir, vivir.', 'These words break a rule: which one? hervir, servir, vivir.', 'Aquestes paraules trenquen una regla: quina? hervir, servir, vivir.'),
      s: T('La de los verbos en -bir: son las tres excepciones, que se escriben con v.', 'The one for verbs ending in -bir: they are the three exceptions, spelt with v.', 'La dels verbs en -bir: són les tres excepcions, que s’escriuen amb v.') },
    { e: T('Completa: «Mi ___isabuelo era muy acti___o y ama___le».', 'Fill in: «Mi ___isabuelo era muy acti___o y ama___le».', 'Completa: «Mi ___isabuelo era muy acti___o y ama___le».'),
      s: T('«Mi bisabuelo era muy activo y amable»: bis- (dos), -ivo, y bl (b + consonante).', '«Mi bisabuelo era muy activo y amable»: bis- (two), -ivo, and bl (b + consonant).', '«Mi bisabuelo era muy activo y amable»: bis- (dos), -ivo, i bl (b + consonant).') },
  ],
}

const gyj = {
  metaTitle: L('Uso de la g y la j: reglas, ejemplos y excepciones — resumen y ejercicios', 'Spanish spelling: when to use g and j — rules, examples and practice questions', 'Ús de la g i la j en castellà: regles, exemples i excepcions — resum i exercicis'),
  metaDesc: L('Cuándo se escribe g y cuándo j: -ger, -gir, -gía, geo-, -logía; -aje, -jero, dije, traje. Gue, gui y la diéresis (pingüino), con excepciones y ejercicios resueltos.', 'When to write g and when j in Spanish: -ger, -gir, -gía, geo-, -logía; -aje, -jero, dije, traje. Gue, gui and the diaeresis (pingüino), with exceptions and solved exercises.', 'Quan s’escriu g i quan j en castellà: -ger, -gir, -gía, geo-, -logía; -aje, -jero, dije, traje. Gue, gui i la dièresi (pingüino), amb excepcions i exercicis resolts.'),
  resumen: L(
    ['Delante de e y de i, la g y la j suenan igual (gente, jefe; girar, jirafa). Delante de a, o, u no hay duda: ga, go, gu suenan suave y ja, jo, ju, fuerte. Las reglas sirven para el caso difícil, ge-gi o je-ji.', 'Para que la g suene suave delante de e o i se escribe una u que no se pronuncia: guerra, guitarra. Si esa u sí se pronuncia, lleva diéresis: pingüino, cigüeña.'],
    ['Before e and i, g and j sound the same in Spanish (gente, jefe; girar, jirafa). Before a, o, u there is no doubt: ga, go, gu sound soft and ja, jo, ju harsh. The rules are for the tricky case, ge-gi or je-ji.', 'To keep g soft before e or i, a silent u is written: guerra, guitarra. If that u is pronounced, it takes a diaeresis: pingüino, cigüeña.'],
    ['Davant de e i d’i, la g i la j sonen igual en castellà (gente, jefe; girar, jirafa). Davant d’a, o, u no hi ha dubte: ga, go, gu sonen suau i ja, jo, ju, fort. Les regles serveixen per al cas difícil, ge-gi o je-ji.', 'Perquè la g soni suau davant d’e o i s’escriu una u que no es pronuncia: guerra, guitarra. Si aquesta u sí que es pronuncia, porta dièresi: pingüino, cigüeña.'],
  ),
  puntosClave: L(
    ['Con g: verbos en -ger y -gir (coger, elegir), salvo tejer y crujir.', 'Con g: -gía, -gio, -gión (magia, colegio, religión).', 'Con g: geo- y -logía (geografía, biología).', 'Con j: palabras en -aje y -jero (viaje, cerrajero).', 'Con j: dije, traje, conduje (verbos sin g ni j en el infinitivo).', 'Güe, güi: la diéresis hace sonar la u (pingüino).'],
    ['With g: verbs in -ger and -gir (coger, elegir), except tejer and crujir.', 'With g: -gía, -gio, -gión (magia, colegio, religión).', 'With g: geo- and -logía (geografía, biología).', 'With j: words in -aje and -jero (viaje, cerrajero).', 'With j: dije, traje, conduje (verbs with no g or j in the infinitive).', 'Güe, güi: the diaeresis makes the u sound (pingüino).'],
    ['Amb g: verbs en -ger i -gir (coger, elegir), llevat de tejer i crujir.', 'Amb g: -gía, -gio, -gión (magia, colegio, religión).', 'Amb g: geo- i -logía (geografía, biología).', 'Amb j: paraules en -aje i -jero (viaje, cerrajero).', 'Amb j: dije, traje, conduje (verbs sense g ni j a l’infinitiu).', 'Güe, güi: la dièresi fa sonar la u (pingüino).'],
  ),
  secciones: [
    {
      titulo: L('Reglas de la g y la j', 'Rules for g and j', 'Regles de la g i la j'),
      tabla: {
        columnas: L(['Letra', 'Regla', 'Ejemplos', 'Excepciones'], ['Letter', 'Rule', 'Examples', 'Exceptions'], ['Lletra', 'Regla', 'Exemples', 'Excepcions']),
        filas: [
          ['g', L('Verbos en -ger, -gir', 'Verbs in -ger, -gir', 'Verbs en -ger, -gir'), 'coger, proteger, elegir, fingir', 'tejer, crujir'],
          ['g', L('-gía, -gio, -gión', '-gía, -gio, -gión', '-gía, -gio, -gión'), 'magia, colegio, región', 'lejía, herejía'],
          ['g', L('geo-, -logía, -gen', 'geo-, -logía, -gen', 'geo-, -logía, -gen'), 'geografía, biología, origen, gente', '—'],
          ['j', L('Acabadas en -aje, -eje', 'Ending in -aje, -eje', 'Acabades en -aje, -eje'), 'viaje, garaje, hereje', '—'],
          ['j', L('Acabadas en -jero, -jera, -jería', 'Ending in -jero, -jera, -jería', 'Acabades en -jero, -jera, -jería'), 'cerrajero, consejera, relojería', 'ligero'],
          ['j', L('Pasados de verbos sin g ni j (decir, traer, -ducir)', 'Past forms of verbs with no g or j (decir, traer, -ducir)', 'Passats de verbs sense g ni j (decir, traer, -ducir)'), 'dije, trajimos, condujo', '—'],
        ],
      },
    },
    {
      titulo: L('Gue, gui y la diéresis', 'Gue, gui and the diaeresis', 'Gue, gui i la dièresi'),
      tabla: {
        columnas: L(['Se escribe', 'Suena', 'Ejemplos'], ['Spelt', 'Sounds', 'Examples'], ['S’escriu', 'Sona', 'Exemples']),
        filas: [
          ['ge, gi', L('fuerte, como j', 'harsh, like j', 'fort, com la j'), 'gente, girar'],
          ['gue, gui', L('suave; la u no suena', 'soft; the u is silent', 'suau; la u no sona'), 'guerra, guitarra'],
          ['güe, güi', L('suave y la u sí suena', 'soft, and the u is pronounced', 'suau, i la u sí que sona'), 'pingüino, cigüeña, vergüenza'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Por qué «coger» lleva g pero «cojo» lleva j?', 'Why does «coger» have g but «cojo» has j?', 'Per què «coger» porta g però «cojo» porta j?'),
      r: T('Porque delante de o la g sonaría suave («cogo»). Para mantener el sonido fuerte se cambia a j: cojo, coja. Lo mismo pasa con elegir → elijo.', 'Because before o the g would sound soft («cogo»). To keep the harsh sound it changes to j: cojo, coja. The same happens with elegir → elijo.', 'Perquè davant d’o la g sonaria suau («cogo»). Per mantenir el so fort es canvia a j: cojo, coja. Passa el mateix amb elegir → elijo.') },
    { p: T('¿Cuándo se ponen los dos puntos de la diéresis?', 'When is the diaeresis used?', 'Quan es posa la dièresi?'),
      r: T('Solo en güe y güi, cuando la u se pronuncia: pingüino, lingüística. En gue y gui la u es muda y no lleva diéresis.', 'Only in güe and güi, when the u is pronounced: pingüino, lingüística. In gue and gui the u is silent and takes none.', 'Només a güe i güi, quan la u es pronuncia: pingüino, lingüística. A gue i gui la u és muda i no porta dièresi.') },
  ],
  ejercicios: [
    { e: T('Completa con g o j: co_er, ele_ir, via_e, reli_ión, te_er, di_e (de decir).', 'Fill in g or j: co_er, ele_ir, via_e, reli_ión, te_er, di_e (from decir).', 'Completa amb g o j: co_er, ele_ir, via_e, reli_ión, te_er, di_e (de decir).'),
      s: T('Coger (-ger), elegir (-gir), viaje (-aje), religión (-gión), tejer (excepción de -ger), dije (pasado de decir).', 'Coger (-ger), elegir (-gir), viaje (-aje), religión (-gión), tejer (exception to -ger), dije (past of decir).', 'Coger (-ger), elegir (-gir), viaje (-aje), religión (-gión), tejer (excepció de -ger), dije (passat de decir).') },
    { e: T('¿Lleva diéresis? pin_uino, gu_erra, ci_ueña, gu_itarra.', 'Does it take a diaeresis? pin_uino, gu_erra, ci_ueña, gu_itarra.', 'Porta dièresi? pin_uino, gu_erra, ci_ueña, gu_itarra.'),
      s: T('Pingüino y cigüeña sí (la u suena); guerra y guitarra no (la u es muda).', 'Pingüino and cigüeña do (the u is pronounced); guerra and guitarra do not (the u is silent).', 'Pingüino i cigüeña sí (la u sona); guerra i guitarra no (la u és muda).') },
    { e: T('Conjuga en presente (yo): proteger, dirigir, escoger.', 'Conjugate in the present (yo): proteger, dirigir, escoger.', 'Conjuga en present (yo): proteger, dirigir, escoger.'),
      s: T('Protejo, dirijo, escojo: delante de o la g pasa a j.', 'Protejo, dirijo, escojo: before o, g becomes j.', 'Protejo, dirijo, escojo: davant d’o la g passa a j.') },
    { e: T('Escribe el pasado (nosotros) de traer y de conducir.', 'Write the past (nosotros) of traer and conducir.', 'Escriu el passat (nosotros) de traer i de conducir.'),
      s: T('Trajimos y condujimos: con j, porque el infinitivo no tiene ni g ni j.', 'Trajimos and condujimos: with j, because the infinitive has neither g nor j.', 'Trajimos i condujimos: amb j, perquè l’infinitiu no té ni g ni j.') },
  ],
}

const letras = {
  metaTitle: L('Uso de la h, la ll y la y, y la c y la z: reglas y ejemplos — resumen y ejercicios', 'Spanish spelling: h, ll and y, c and z — rules, examples and practice questions', 'Ús de la h, la ll i la y, i la c i la z en castellà: regles i exemples — resum i exercicis'),
  metaDesc: L('Cuándo se escribe h (hie-, hue-, hum-), ll o y (-illo, cayó, hoy) y c o z (zapato, cero, peces). Con dudas frecuentes: a ver/haber, hay/ahí/ay, echo/hecho. Ejercicios.', 'When to write h (hie-, hue-, hum-), ll or y (-illo, cayó, hoy) and c or z (zapato, cero, peces) in Spanish. Plus common doubts: a ver/haber, hay/ahí/ay, echo/hecho.', 'Quan s’escriu h (hie-, hue-, hum-), ll o y (-illo, cayó, hoy) i c o z (zapato, cero, peces) en castellà. Amb dubtes freqüents: a ver/haber, hay/ahí/ay, echo/hecho.'),
  resumen: L(
    ['La h no suena nunca, así que es la letra que más dudas da. La ll y la y suenan igual para la mayoría de hablantes (yeísmo), y la c y la z también se confunden donde se sesea. Las reglas agrupan los casos más frecuentes.', 'Muchas de las dudas son de palabras que suenan igual y significan cosas distintas: a ver y haber, hay, ahí y ay, echo y hecho. Para estas, lo que funciona es entender qué es cada una.'],
    ['H is never pronounced in Spanish, so it causes the most doubts. Ll and y sound the same for most speakers (yeísmo), and c and z are also confused where people use seseo. The rules group the most frequent cases.', 'Many doubts come from words that sound the same and mean different things: a ver and haber, hay, ahí and ay, echo and hecho. For these, what works is understanding what each one is.'],
    ['La h no sona mai en castellà, així que és la lletra que més dubtes dona. La ll i la y sonen igual per a la majoria de parlants (ieisme), i la c i la z també es confonen on se sesseja. Les regles agrupen els casos més freqüents.', 'Molts dubtes vénen de paraules que sonen igual i signifiquen coses diferents: a ver i haber, hay, ahí i ay, echo i hecho. Per a aquestes, el que funciona és entendre què és cadascuna.'],
  ),
  puntosClave: L(
    ['Con h: hie-, hue-, hui- al principio (hielo, huevo, huir).', 'Con h: hidr-, hiper-, hipo-, hum- (hidratar, hipermercado, humo).', 'Con ll: -illo, -illa (pasillo, bombilla).', 'Con y: al final con i átona (rey, hoy, muy) y en cayó, oyó, leyendo.', 'Z delante de a, o, u; c delante de e, i (zapato, cero, cine).', 'Plural de z: -ces (lápiz → lápices, pez → peces).'],
    ['With h: hie-, hue-, hui- at the start (hielo, huevo, huir).', 'With h: hidr-, hiper-, hipo-, hum- (hidratar, hipermercado, humo).', 'With ll: -illo, -illa (pasillo, bombilla).', 'With y: at the end with an unstressed i (rey, hoy, muy) and in cayó, oyó, leyendo.', 'Z before a, o, u; c before e, i (zapato, cero, cine).', 'Plural of z: -ces (lápiz → lápices, pez → peces).'],
    ['Amb h: hie-, hue-, hui- al principi (hielo, huevo, huir).', 'Amb h: hidr-, hiper-, hipo-, hum- (hidratar, hipermercado, humo).', 'Amb ll: -illo, -illa (pasillo, bombilla).', 'Amb y: al final amb i àtona (rey, hoy, muy) i a cayó, oyó, leyendo.', 'Z davant d’a, o, u; c davant d’e, i (zapato, cero, cine).', 'Plural de z: -ces (lápiz → lápices, pez → peces).'],
  ),
  secciones: [
    {
      titulo: L('Reglas de la h, la ll y la y, y la c y la z', 'Rules for h, ll and y, and c and z', 'Regles de la h, la ll i la y, i la c i la z'),
      tabla: {
        columnas: L(['Letra', 'Regla', 'Ejemplos'], ['Letter', 'Rule', 'Examples'], ['Lletra', 'Regla', 'Exemples']),
        filas: [
          ['h', L('Empiezan por hie-, hue-, hui-', 'Starting hie-, hue-, hui-', 'Comencen per hie-, hue-, hui-'), 'hielo, hueso, huir'],
          ['h', L('hidr-, hiper-, hipo-, hum-', 'hidr-, hiper-, hipo-, hum-', 'hidr-, hiper-, hipo-, hum-'), 'hidratar, hipérbole, hipopótamo, humano'],
          ['h', L('Todas las formas de haber y hacer', 'Every form of haber and hacer', 'Totes les formes de haber i hacer'), 'hay, había, hizo, hecho'],
          ['ll', L('Acabadas en -illo, -illa', 'Ending in -illo, -illa', 'Acabades en -illo, -illa'), 'pasillo, bombilla, ardilla'],
          ['y', L('Al final de palabra con i átona', 'At the end of a word with an unstressed i', 'Al final de paraula amb i àtona'), 'rey, hoy, muy, ley (pero: bonsái)'],
          ['y', L('Formas de verbos sin ll ni y en el infinitivo', 'Forms of verbs with no ll or y in the infinitive', 'Formes de verbs sense ll ni y a l’infinitiu'), 'cayó (caer), oyó (oír), leyendo (leer)'],
          ['z / c', L('za, zo, zu / ce, ci', 'za, zo, zu / ce, ci', 'za, zo, zu / ce, ci'), 'zapato, zorro, zumo / cero, cine'],
          ['c', L('Plural de las acabadas en z', 'Plural of words ending in z', 'Plural de les acabades en z'), 'lápiz → lápices, pez → peces, voz → voces'],
        ],
      },
    },
    {
      titulo: L('Dudas frecuentes', 'Common doubts', 'Dubtes freqüents'),
      tabla: {
        columnas: L(['Duda', 'Cuál es cuál', 'Ejemplo'], ['Doubt', 'Which is which', 'Example'], ['Dubte', 'Quin és quin', 'Exemple']),
        filas: [
          ['a ver / haber', L('a ver = mirar; haber = verbo (o «hay que»)', 'a ver = let’s see; haber = the verb', 'a ver = mirar; haber = verb'), '«A ver qué pasa» / «Debe de haber un error»'],
          ['hay / ahí / ay', L('hay = existe; ahí = en ese lugar; ay = queja', 'hay = there is; ahí = there (place); ay = ouch', 'hay = existeix; ahí = en aquell lloc; ay = queixa'), '«Ahí hay un perro. ¡Ay!»'],
          ['echo / hecho', L('echo = de echar; hecho = de hacer', 'echo = from echar; hecho = from hacer', 'echo = d’echar; hecho = de hacer'), '«Te echo de menos» / «Lo he hecho»'],
          ['halla / haya / aya', L('halla = de hallar; haya = de haber (o el árbol); aya = niñera', 'halla = from hallar; haya = from haber (or the beech tree); aya = nanny', 'halla = de hallar; haya = de haber (o l’arbre); aya = mainadera'), '«Espero que haya llegado»'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿«A ver» o «haber»?', '«A ver» or «haber»?', '«A ver» o «haber»?'),
      r: T('Si se puede cambiar por «vamos a mirar», es a ver (separado): «A ver si llueve». Si es el verbo, es haber: «Tiene que haber más sillas».', 'If it can be replaced by «let’s look», it is a ver (two words): «A ver si llueve». If it is the verb, it is haber: «Tiene que haber más sillas».', 'Si es pot canviar per «anem a mirar», és a ver (separat): «A ver si llueve». Si és el verb, és haber: «Tiene que haber más sillas».') },
    { p: T('¿Por qué «lápiz» hace «lápices»?', 'Why does «lápiz» become «lápices»?', 'Per què «lápiz» fa «lápices»?'),
      r: T('Porque en español se escribe c, no z, delante de e: el plural -es convierte la z en c (pez → peces, luz → luces).', 'Because in Spanish c, not z, is written before e: the plural -es turns z into c (pez → peces, luz → luces).', 'Perquè en castellà s’escriu c, no z, davant d’e: el plural -es converteix la z en c (pez → peces, luz → luces).') },
  ],
  ejercicios: [
    { e: T('Completa con h o sin h: _uevo, _ielo, _ombre, _ola (saludo), _acer.', 'Fill in with or without h: _uevo, _ielo, _ombre, _ola (greeting), _acer.', 'Completa amb h o sense h: _uevo, _ielo, _ombre, _ola (salutació), _acer.'),
      s: T('Huevo (hue-), hielo (hie-), hombre, hola, hacer: las cinco llevan h.', 'Huevo (hue-), hielo (hie-), hombre, hola, hacer: all five take h.', 'Huevo (hue-), hielo (hie-), hombre, hola, hacer: totes cinc porten h.') },
    { e: T('¿A ver o haber? «Vamos ___ si viene» y «Debe ___ llegado ya».', 'A ver or haber? «Vamos ___ si viene» and «Debe ___ llegado ya».', 'A ver o haber? «Vamos ___ si viene» i «Debe ___ llegado ya».'),
      s: T('«Vamos a ver si viene» y «Debe de haber llegado ya» (también «Debe haber llegado»).', '«Vamos a ver si viene» and «Debe de haber llegado ya» (also «Debe haber llegado»).', '«Vamos a ver si viene» i «Debe de haber llegado ya» (també «Debe haber llegado»).') },
    { e: T('¿Hay, ahí o ay? «___ que estudiar», «Déjalo ___», «¡___, qué daño!».', 'Hay, ahí or ay? «___ que estudiar», «Déjalo ___», «¡___, qué daño!».', 'Hay, ahí o ay? «___ que estudiar», «Déjalo ___», «¡___, qué daño!».'),
      s: T('«Hay que estudiar», «Déjalo ahí», «¡Ay, qué daño!».', '«Hay que estudiar», «Déjalo ahí», «¡Ay, qué daño!».', '«Hay que estudiar», «Déjalo ahí», «¡Ay, qué daño!».') },
    { e: T('Completa con ll o y: pasi_o, ca_ó (de caer), re_, bombi_a, le_endo.', 'Fill in ll or y: pasi_o, ca_ó (from caer), re_, bombi_a, le_endo.', 'Completa amb ll o y: pasi_o, ca_ó (de caer), re_, bombi_a, le_endo.'),
      s: T('Pasillo (-illo), cayó (caer), rey (i final átona), bombilla (-illa), leyendo (leer).', 'Pasillo (-illo), cayó (caer), rey (final unstressed i), bombilla (-illa), leyendo (leer).', 'Pasillo (-illo), cayó (caer), rey (i final àtona), bombilla (-illa), leyendo (leer).') },
    { e: T('Escribe el plural: pez, voz, actriz, luz.', 'Write the plural: pez, voz, actriz, luz.', 'Escriu el plural: pez, voz, actriz, luz.'),
      s: T('Peces, voces, actrices, luces.', 'Peces, voces, actrices, luces.', 'Peces, voces, actrices, luces.') },
    { e: T('¿Echo o hecho? «Ya lo he ___» y «Siempre ___ sal a la sopa».', 'Echo or hecho? «Ya lo he ___» and «Siempre ___ sal a la sopa».', 'Echo o hecho? «Ya lo he ___» i «Siempre ___ sal a la sopa».'),
      s: T('«Ya lo he hecho» (de hacer) y «Siempre echo sal a la sopa» (de echar).', '«Ya lo he hecho» (from hacer) and «Siempre echo sal a la sopa» (from echar).', '«Ya lo he hecho» (de hacer) i «Siempre echo sal a la sopa» (d’echar).') },
  ],
}

const puntuacion = {
  metaTitle: L('Los signos de puntuación: punto, coma, punto y coma y dos puntos — resumen y ejercicios', 'Spanish punctuation: full stop, comma, semicolon, colon and ¿ ¡ — summary and practice questions', 'Els signes de puntuació en castellà: punt, coma, punt i coma i dos punts — resum i exercicis'),
  metaDesc: L('Cómo se usan el punto, la coma, el punto y coma, los dos puntos, los puntos suspensivos y los signos ¿? ¡!, con los errores típicos (coma entre sujeto y verbo) y ejercicios.', 'How to use the full stop, comma, semicolon, colon, ellipsis and ¿? ¡! in Spanish, with the classic mistakes (a comma between subject and verb) and solved exercises.', 'Com s’usen el punt, la coma, el punt i coma, els dos punts, els punts suspensius i els signes ¿? ¡! en castellà, amb els errors típics i exercicis resolts.'),
  resumen: L(
    ['Los signos de puntuación organizan el texto y marcan las pausas y la entonación. Un cambio de coma puede cambiar el sentido: «No, quiero ir» y «No quiero ir» dicen cosas opuestas.', 'En español las preguntas y las exclamaciones llevan signo de apertura y de cierre (¿…? ¡…!), y hay una regla que se rompe a menudo: nunca se pone coma entre el sujeto y el verbo, por largo que sea el sujeto.'],
    ['Punctuation marks organise a text and show pauses and intonation. Moving a comma can change the meaning: «No, quiero ir» and «No quiero ir» say opposite things.', 'In Spanish, questions and exclamations take an opening and a closing mark (¿…? ¡…!), and there is a rule that is often broken: never put a comma between the subject and the verb, however long the subject is.'],
    ['Els signes de puntuació organitzen el text i marquen les pauses i l’entonació. Canviar una coma pot canviar el sentit: «No, quiero ir» i «No quiero ir» diuen coses oposades.', 'En castellà les preguntes i les exclamacions porten signe d’obertura i de tancament (¿…? ¡…!), i hi ha una regla que es trenca sovint: mai no es posa coma entre el subjecte i el verb, per llarg que sigui el subjecte.'],
  ),
  puntosClave: L(
    ['Punto y seguido, punto y aparte y punto final.', 'Coma: enumeraciones, vocativos («Ana, ven») e incisos.', 'Coma delante de pero, sino, aunque (en oraciones cortas, opcional ante pero).', 'Nunca coma entre sujeto y verbo.', 'Dos puntos: antes de una enumeración anunciada, una cita o tras el saludo de una carta.', 'Preguntas y exclamaciones: ¿…? y ¡…!, siempre los dos signos.'],
    ['Full stop to continue, to start a new paragraph, and at the end.', 'Comma: lists, direct address («Ana, ven») and asides.', 'Comma before pero, sino, aunque (optional before pero in short sentences).', 'Never a comma between subject and verb.', 'Colon: before an announced list, a quotation or after the greeting in a letter.', 'Questions and exclamations: ¿…? and ¡…!, always both marks.'],
    ['Punt i seguit, punt i a part i punt final.', 'Coma: enumeracions, vocatius («Ana, ven») i incisos.', 'Coma davant de pero, sino, aunque (en oracions curtes, opcional davant de pero).', 'Mai coma entre subjecte i verb.', 'Dos punts: abans d’una enumeració anunciada, una cita o després de la salutació d’una carta.', 'Preguntes i exclamacions: ¿…? i ¡…!, sempre els dos signes.'],
  ),
  secciones: [
    {
      titulo: L('Para qué sirve cada signo', 'What each mark is for', 'Per a què serveix cada signe'),
      tabla: {
        columnas: L(['Signo', 'Uso', 'Ejemplo'], ['Mark', 'Use', 'Example'], ['Signe', 'Ús', 'Exemple']),
        filas: [
          [L('Punto (.)', 'Full stop (.)', 'Punt (.)'), L('Cierra una oración; y aparte, un párrafo', 'Ends a sentence; a new line ends a paragraph', 'Tanca una oració; i a part, un paràgraf'), '«Llovía. Nos quedamos en casa.»'],
          [L('Coma (,)', 'Comma (,)', 'Coma (,)'), L('Enumeraciones, vocativos e incisos', 'Lists, direct address and asides', 'Enumeracions, vocatius i incisos'), '«Compré pan, leche y huevos.» «Luis, ven.»'],
          [L('Punto y coma (;)', 'Semicolon (;)', 'Punt i coma (;)'), L('Separa partes que ya llevan comas, o ideas muy unidas', 'Separates parts that already have commas, or closely linked ideas', 'Separa parts que ja porten comes, o idees molt unides'), '«Ana trajo el pan; Luis, la fruta.»'],
          [L('Dos puntos (:)', 'Colon (:)', 'Dos punts (:)'), L('Anuncian una enumeración, una cita o una explicación', 'Introduce a list, a quotation or an explanation', 'Anuncien una enumeració, una cita o una explicació'), '«Tengo dos hermanos: Ana y Luis.» «Querido Juan:»'],
          [L('Puntos suspensivos (…)', 'Ellipsis (…)', 'Punts suspensius (…)'), L('Algo queda sin terminar; siempre tres', 'Something is left unfinished; always three', 'Alguna cosa queda sense acabar; sempre tres'), '«Si yo te contara…»'],
          ['¿? ¡!', L('Preguntas y exclamaciones, con apertura y cierre', 'Questions and exclamations, opening and closing', 'Preguntes i exclamacions, amb obertura i tancament'), '«¿Vienes?» «¡Qué frío!»'],
          [L('Raya (—)', 'Dash (—)', 'Guió llarg (—)'), L('Intervenciones en un diálogo', 'Speech in dialogue', 'Intervencions en un diàleg'), '«—¿Vienes? —preguntó Ana.»'],
        ],
      },
    },
    {
      titulo: L('Errores típicos con la coma', 'Classic comma mistakes', 'Errors típics amb la coma'),
      tabla: {
        columnas: L(['Mal', 'Bien', 'Por qué'], ['Wrong', 'Right', 'Why'], ['Malament', 'Bé', 'Per què']),
        filas: [
          ['«Los alumnos de tercero, aprobaron.»', '«Los alumnos de tercero aprobaron.»', L('No hay coma entre sujeto y verbo', 'No comma between subject and verb', 'No hi ha coma entre subjecte i verb')],
          ['«Hola Ana.»', '«Hola, Ana.»', L('El vocativo va entre comas', 'Direct address goes between commas', 'El vocatiu va entre comes')],
          ['«Querido Juan,»', '«Querido Juan:»', L('En español el saludo de una carta lleva dos puntos', 'In Spanish a letter greeting takes a colon', 'En castellà la salutació d’una carta porta dos punts')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Se pone coma antes de «y»?', 'Is there a comma before «y»?', 'Es posa coma abans de «y»?'),
      r: T('En una enumeración, no: «pan, leche y huevos». Sí se pone si cierra un inciso o si la y une algo distinto de lo anterior: «Pintó la puerta, la ventana y la fachada, y se fue a casa».', 'In a list, no: «pan, leche y huevos». It does go in if it closes an aside or if y joins something different from what came before: «Pintó la puerta, la ventana y la fachada, y se fue a casa».', 'En una enumeració, no: «pan, leche y huevos». Sí que es posa si tanca un incís o si la y uneix una cosa diferent de l’anterior: «Pintó la puerta, la ventana y la fachada, y se fue a casa».') },
    { p: T('¿Por qué en español se abren las preguntas con «¿»?', 'Why do Spanish questions open with «¿»?', 'Per què en castellà les preguntes s’obren amb «¿»?'),
      r: T('Porque el orden de las palabras no siempre indica que es una pregunta («¿Vienes?» y «Vienes» son iguales), y el signo de apertura avisa desde el principio de la entonación.', 'Because word order does not always show it is a question («¿Vienes?» and «Vienes» are identical), and the opening mark signals the intonation from the start.', 'Perquè l’ordre de les paraules no sempre indica que és una pregunta («¿Vienes?» i «Vienes» són iguals), i el signe d’obertura avisa des del principi de l’entonació.') },
  ],
  ejercicios: [
    { e: T('Puntúa: «Ana ven aquí».', 'Punctuate: «Ana ven aquí».', 'Puntua: «Ana ven aquí».'),
      s: T('«Ana, ven aquí.» Ana es un vocativo (se le habla a ella) y va separado por coma.', '«Ana, ven aquí.» Ana is direct address (she is being spoken to) and is set off by a comma.', '«Ana, ven aquí.» Ana és un vocatiu (se li parla a ella) i va separat per coma.') },
    { e: T('Puntúa: «Compré pan leche huevos y fruta».', 'Punctuate: «Compré pan leche huevos y fruta».', 'Puntua: «Compré pan leche huevos y fruta».'),
      s: T('«Compré pan, leche, huevos y fruta.» Comas entre los elementos, y sin coma antes de la y.', '«Compré pan, leche, huevos y fruta.» Commas between the items, and no comma before y.', '«Compré pan, leche, huevos y fruta.» Comes entre els elements, i sense coma abans de la y.') },
    { e: T('Corrige: «Los alumnos que estudiaron mucho, aprobaron el examen».', 'Correct: «Los alumnos que estudiaron mucho, aprobaron el examen».', 'Corregeix: «Los alumnos que estudiaron mucho, aprobaron el examen».'),
      s: T('«Los alumnos que estudiaron mucho aprobaron el examen.» Todo lo anterior a «aprobaron» es el sujeto, y entre sujeto y verbo no va coma.', '«Los alumnos que estudiaron mucho aprobaron el examen.» Everything before «aprobaron» is the subject, and no comma goes between subject and verb.', '«Los alumnos que estudiaron mucho aprobaron el examen.» Tot el que hi ha abans d’«aprobaron» és el subjecte, i entre subjecte i verb no hi va coma.') },
    { e: T('Corrige: «Qué hora es?» y «Qué bonito!».', 'Correct: «Qué hora es?» and «Qué bonito!».', 'Corregeix: «Qué hora es?» i «Qué bonito!».'),
      s: T('«¿Qué hora es?» y «¡Qué bonito!»: en español los dos signos son obligatorios.', '«¿Qué hora es?» and «¡Qué bonito!»: in Spanish both marks are compulsory.', '«¿Qué hora es?» i «¡Qué bonito!»: en castellà els dos signes són obligatoris.') },
    { e: T('Puntúa el comienzo de una carta: «Querida abuela Te escribo desde Roma».', 'Punctuate the start of a letter: «Querida abuela Te escribo desde Roma».', 'Puntua el començament d’una carta: «Querida abuela Te escribo desde Roma».'),
      s: T('«Querida abuela:» y, en la línea siguiente, «Te escribo desde Roma.»', '«Querida abuela:» and, on the next line, «Te escribo desde Roma.»', '«Querida abuela:» i, a la línia següent, «Te escribo desde Roma.»') },
    { e: T('Explica la diferencia: «No, quiero ir» y «No quiero ir».', 'Explain the difference: «No, quiero ir» and «No quiero ir».', 'Explica la diferència: «No, quiero ir» i «No quiero ir».'),
      s: T('En la primera se contesta «no» a algo y luego se dice que sí quiere ir; en la segunda, no quiere ir. La coma cambia el sentido.', 'In the first, «no» answers something and then the speaker says they do want to go; in the second, they do not want to go. The comma changes the meaning.', 'A la primera es contesta «no» a alguna cosa i després es diu que sí que vol anar-hi; a la segona, no hi vol anar. La coma canvia el sentit.') },
  ],
}

// slug de la URL → contenido. El id del tema (TEMAS_ORTOGRAFIA) lleva su slug.
export const ORTOGRAFIA_TEMA = {
  acentuacion,
  'b-y-v': byv,
  'g-y-j': gyj,
  'h-ll-y-c-z': letras,
  puntuacion,
}
