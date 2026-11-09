// Ampliación de las páginas de estudio que Google ya enseña en la posición
// 10-15 con poco texto (Search Console, 7-nov-2026). Ampliar adverbios el
// 21-oct la subió de la posición 43 a la 13: aquí se hace lo mismo con
// tablas, ejemplos, dudas frecuentes y ejercicios resueltos.
//
// Se fusiona sobre CONTENIDO_TEMA (estudioTemaContenido.js): lo que hay aquí
// AÑADE secciones/preguntas/ejercicios y, si trae metaTitle, lo sustituye.
//
// En los temas de gramática española el MATERIAL (palabras y frases de
// ejemplo) va en castellano en los tres idiomas; solo se traduce la prosa.
// Celdas y ejercicios: string = igual en todos los idiomas, o {es, en, ca}.

const T = (es, en, ca) => ({ es, en, ca })
const L = (es, en, ca) => ({ es, en, ca })

// ── GRAMÁTICA ─────────────────────────────────────────────────────────────

const pronombres = {
  metaTitle: L('Los pronombres: qué son, tipos, ejemplos y ejercicios (con tabla)', 'Spanish pronouns: what they are, types, examples and practice questions (with table)', 'Els pronoms en castellà: què són, tipus, exemples i exercicis (amb taula)'),
  ejercicios: [
    { e: T('Subraya los pronombres de esta frase: «Ella me lo contó ayer».', 'Underline the pronouns in this sentence: «Ella me lo contó ayer».', 'Subratlla els pronoms d’aquesta frase: «Ella me lo contó ayer».'),
      s: T('Ella, me y lo, los tres personales. «Ayer» es un adverbio.', 'Ella, me and lo, all three personal pronouns. «Ayer» is an adverb.', 'Ella, me i lo, tots tres personals. «Ayer» és un adverbi.') },
    { e: T('¿Pronombre o determinante? «Quiero ese» y «Quiero ese pastel».', 'Pronoun or determiner? «Quiero ese» and «Quiero ese pastel».', 'Pronom o determinant? «Quiero ese» i «Quiero ese pastel».'),
      s: T('En «Quiero ese», ese es pronombre demostrativo: va solo y sustituye al nombre. En «Quiero ese pastel» es determinante, porque acompaña a «pastel».', 'In «Quiero ese», ese is a demonstrative pronoun: it stands alone and replaces the noun. In «Quiero ese pastel» it is a determiner, because it goes with «pastel».', 'A «Quiero ese», ese és pronom demostratiu: va sol i substitueix el nom. A «Quiero ese pastel» és determinant, perquè acompanya «pastel».') },
    { e: T('Sustituye el complemento directo por un pronombre: «Compré las entradas».', 'Replace the direct object with a pronoun: «Compré las entradas».', 'Substitueix el complement directe per un pronom: «Compré las entradas».'),
      s: T('«Las compré». Las entradas es femenino plural, así que el pronombre es las.', '«Las compré». Las entradas is feminine plural, so the pronoun is las.', '«Las compré». Las entradas és femení plural, així que el pronom és las.') },
    { e: T('Sustituye los dos complementos por pronombres: «Di el regalo a Luis».', 'Replace both objects with pronouns: «Di el regalo a Luis».', 'Substitueix els dos complements per pronoms: «Di el regalo a Luis».'),
      s: T('«Se lo di». A Luis sería le y el regalo, lo; pero «le lo» no existe: delante de lo, la, los, las, le se convierte en se.', '«Se lo di». A Luis would be le and el regalo, lo; but «le lo» does not exist: before lo, la, los, las, le becomes se.', '«Se lo di». A Luis seria le i el regalo, lo; però «le lo» no existeix: davant de lo, la, los, las, le es converteix en se.') },
    { e: T('Corrige la frase: «La dije a mi hermana que viniera».', 'Correct the sentence: «La dije a mi hermana que viniera».', 'Corregeix la frase: «La dije a mi hermana que viniera».'),
      s: T('«Le dije a mi hermana que viniera». A mi hermana es complemento indirecto, que se sustituye por le aunque sea femenino; usar la es laísmo.', '«Le dije a mi hermana que viniera». A mi hermana is the indirect object, which takes le even when feminine; using la is laísmo.', '«Le dije a mi hermana que viniera». A mi hermana és complement indirecte, que se substitueix per le encara que sigui femení; fer servir la és laísmo.') },
    { e: T('Di de qué tipo es cada pronombre: «¿Quién ha venido?», «Nadie lo sabe», «El chico que vino es mi primo».', 'Say what type each pronoun is: «¿Quién ha venido?», «Nadie lo sabe», «El chico que vino es mi primo».', 'Digues de quin tipus és cada pronom: «¿Quién ha venido?», «Nadie lo sabe», «El chico que vino es mi primo».'),
      s: T('Quién: interrogativo. Nadie: indefinido. Lo: personal. Que: relativo (une «vino» con «el chico»).', 'Quién: interrogative. Nadie: indefinite. Lo: personal. Que: relative (it links «vino» to «el chico»).', 'Quién: interrogatiu. Nadie: indefinit. Lo: personal. Que: relatiu (uneix «vino» amb «el chico»).') },
    { e: T('Coloca te y lo con el verbo: «Voy a decir…».', 'Place te and lo with the verb: «Voy a decir…».', 'Col·loca te i lo amb el verb: «Voy a decir…».'),
      s: T('Valen las dos: «Voy a decírtelo» (pegados al infinitivo, con tilde) o «Te lo voy a decir» (delante del verbo conjugado).', 'Both work: «Voy a decírtelo» (attached to the infinitive, with an accent) or «Te lo voy a decir» (before the conjugated verb).', 'Valen totes dues: «Voy a decírtelo» (enganxats a l’infinitiu, amb accent) o «Te lo voy a decir» (davant del verb conjugat).') },
  ],
}

const morfologia = {
  metaTitle: L('La morfología: qué es, morfemas y clases de palabras — resumen y ejercicios', 'Spanish morphology: what it is, morphemes and word classes — summary and practice questions', 'La morfologia: què és, morfemes i classes de paraules — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las partes de una palabra: lexema y morfemas', 'The parts of a word: lexeme and morphemes', 'Les parts d’una paraula: lexema i morfemes'),
      texto: L(
        ['El lexema (o raíz) lleva el significado y se repite en toda la familia de palabras: pan- en pan, panadero, empanada. Los morfemas se le añaden y son de dos clases: los flexivos, que dan género y número al nombre y al adjetivo, o persona, número, tiempo y modo al verbo, y los derivativos (prefijos y sufijos), que forman palabras nuevas.'],
        ['The lexeme (or root) carries the meaning and is repeated across the whole word family: pan- in pan, panadero, empanada. Morphemes are added to it and come in two kinds: inflectional ones, which give gender and number to nouns and adjectives, or person, number, tense and mood to verbs, and derivational ones (prefixes and suffixes), which form new words.'],
        ['El lexema (o arrel) porta el significat i es repeteix a tota la família de paraules: pan- a pan, panadero, empanada. Els morfemes s’hi afegeixen i són de dues classes: els flexius, que donen gènere i nombre al nom i a l’adjectiu, o persona, nombre, temps i mode al verb, i els derivatius (prefixos i sufixos), que formen paraules noves.'],
      ),
      tabla: {
        columnas: L(['Palabra', 'Lexema', 'Morfemas', 'Qué aportan'], ['Word', 'Lexeme', 'Morphemes', 'What they add'], ['Paraula', 'Lexema', 'Morfemes', 'Què aporten']),
        filas: [
          ['niñas', 'niñ-', '-a, -s', L('femenino y plural (flexivos)', 'feminine and plural (inflectional)', 'femení i plural (flexius)')],
          ['panaderos', 'pan-', '-ader-, -o, -s', L('sufijo de oficio (derivativo); masculino y plural', 'job suffix (derivational); masculine and plural', 'sufix d’ofici (derivatiu); masculí i plural')],
          ['deshacer', 'hac-', 'des-, -er', L('prefijo de negación (derivativo); infinitivo', 'negative prefix (derivational); infinitive', 'prefix de negació (derivatiu); infinitiu')],
          ['gatitos', 'gat-', '-it-, -o, -s', L('diminutivo (derivativo); masculino y plural', 'diminutive (derivational); masculine and plural', 'diminutiu (derivatiu); masculí i plural')],
          ['cantábamos', 'cant-', '-á-, -ba-, -mos', L('1.ª conjugación; pretérito imperfecto; 1.ª persona del plural', '1st conjugation; imperfect past; 1st person plural', '1a conjugació; pretèrit imperfet; 1a persona del plural')],
        ],
      },
    },
    {
      titulo: L('Cómo se forman las palabras', 'How words are formed', 'Com es formen les paraules'),
      tabla: {
        columnas: L(['Tipo', 'Cómo es', 'Ejemplos'], ['Type', 'What it is', 'Examples'], ['Tipus', 'Com és', 'Exemples']),
        filas: [
          [L('Simple', 'Simple', 'Simple'), L('Un solo lexema, sin prefijos ni sufijos', 'A single lexeme, no prefixes or suffixes', 'Un sol lexema, sense prefixos ni sufixos'), 'mar, sol, pan'],
          [L('Derivada', 'Derived', 'Derivada'), L('Lexema + prefijo o sufijo', 'Lexeme + prefix or suffix', 'Lexema + prefix o sufix'), 'marinero, soleado, deshacer'],
          [L('Compuesta', 'Compound', 'Composta'), L('Dos o más lexemas', 'Two or more lexemes', 'Dos o més lexemes'), 'girasol, sacacorchos, bocacalle'],
          [L('Parasintética', 'Parasynthetic', 'Parasintètica'), L('Prefijo y sufijo a la vez (sin uno de ellos la palabra no existe), o composición más derivación', 'Prefix and suffix at once (without one of them the word does not exist), or compounding plus derivation', 'Prefix i sufix alhora (sense un d’ells la paraula no existeix), o composició més derivació'), 'enrojecer, entristecer, quinceañero'],
        ],
      },
    },
    {
      titulo: L('Género y número', 'Gender and number', 'Gènere i nombre'),
      texto: L(
        ['El nombre tiene género (masculino o femenino) y número (singular o plural). El plural se forma con -s tras vocal átona (casa, casas) y con -es tras consonante (árbol, árboles). Algunas palabras no cambian (la crisis, las crisis; el lunes, los lunes) y otras solo se usan en plural (gafas, tijeras).'],
        ['Nouns have gender (masculine or feminine) and number (singular or plural). The plural takes -s after an unstressed vowel (casa, casas) and -es after a consonant (árbol, árboles). Some words do not change (la crisis, las crisis; el lunes, los lunes) and others are only used in the plural (gafas, tijeras).'],
        ['El nom té gènere (masculí o femení) i nombre (singular o plural). El plural es forma amb -s després de vocal àtona (casa, casas) i amb -es després de consonant (árbol, árboles). Algunes paraules no canvien (la crisis, las crisis; el lunes, los lunes) i altres només s’usen en plural (gafas, tijeras).'],
      ),
      tabla: {
        columnas: L(['Caso de género', 'Cómo funciona', 'Ejemplos'], ['Gender case', 'How it works', 'Examples'], ['Cas de gènere', 'Com funciona', 'Exemples']),
        filas: [
          [L('Con morfema', 'With a morpheme', 'Amb morfema'), L('Cambia la terminación', 'The ending changes', 'Canvia la terminació'), 'niño / niña, león / leona, actor / actriz'],
          [L('Heterónimos', 'Heteronyms', 'Heterònims'), L('Una palabra distinta para cada sexo', 'A different word for each sex', 'Una paraula diferent per a cada sexe'), 'padre / madre, toro / vaca, caballo / yegua'],
          [L('Comunes en cuanto al género', 'Common gender', 'Comuns quant al gènere'), L('Solo cambia el determinante', 'Only the determiner changes', 'Només canvia el determinant'), 'el / la estudiante, el / la artista'],
          [L('Epicenos', 'Epicene', 'Epicens'), L('Una forma para los dos sexos; se añade macho o hembra', 'One form for both sexes; macho or hembra is added', 'Una forma per als dos sexes; s’hi afegeix macho o hembra'), 'la jirafa, el búho, la ballena'],
          [L('Ambiguos', 'Ambiguous', 'Ambigus'), L('Valen los dos géneros sin cambiar el significado', 'Both genders work without changing the meaning', 'Valen els dos gèneres sense canviar el significat'), 'el / la mar, el / la azúcar'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué es la morfología?', 'What is morphology?', 'Què és la morfologia?'),
      r: T('Es la parte de la gramática que estudia la forma de las palabras: sus partes (lexema y morfemas), cómo se forman y a qué clase pertenecen.', 'It is the part of grammar that studies the form of words: their parts (lexeme and morphemes), how they are formed and which class they belong to.', 'És la part de la gramàtica que estudia la forma de les paraules: les seves parts (lexema i morfemes), com es formen i a quina classe pertanyen.') },
    { p: T('¿Qué diferencia hay entre lexema y morfema?', 'What is the difference between a lexeme and a morpheme?', 'Quina diferència hi ha entre lexema i morfema?'),
      r: T('El lexema lleva el significado (gat- en gatito) y el morfema añade información gramatical (-o, -s) o forma una palabra nueva (-it-).', 'The lexeme carries the meaning (gat- in gatito) and the morpheme adds grammatical information (-o, -s) or forms a new word (-it-).', 'El lexema porta el significat (gat- a gatito) i el morfema hi afegeix informació gramatical (-o, -s) o forma una paraula nova (-it-).') },
    { p: T('¿Cuáles son las palabras variables y las invariables?', 'Which words are variable and which are invariable?', 'Quines paraules són variables i quines invariables?'),
      r: T('Variables (cambian de forma): sustantivo, adjetivo, determinante, pronombre y verbo. Invariables: adverbio, preposición, conjunción e interjección.', 'Variable (they change form): noun, adjective, determiner, pronoun and verb. Invariable: adverb, preposition, conjunction and interjection.', 'Variables (canvien de forma): substantiu, adjectiu, determinant, pronom i verb. Invariables: adverbi, preposició, conjunció i interjecció.') },
  ],
  ejercicios: [
    { e: T('Separa el lexema y los morfemas de «gatitos».', 'Split «gatitos» into lexeme and morphemes.', 'Separa el lexema i els morfemes de «gatitos».'),
      s: T('gat- (lexema) + -it- (sufijo diminutivo) + -o (masculino) + -s (plural).', 'gat- (lexeme) + -it- (diminutive suffix) + -o (masculine) + -s (plural).', 'gat- (lexema) + -it- (sufix diminutiu) + -o (masculí) + -s (plural).') },
    { e: T('Clasifica estas palabras en simples, derivadas, compuestas o parasintéticas: luz, florero, girasol, enrojecer.', 'Classify these words as simple, derived, compound or parasynthetic: luz, florero, girasol, enrojecer.', 'Classifica aquestes paraules en simples, derivades, compostes o parasintètiques: luz, florero, girasol, enrojecer.'),
      s: T('Luz: simple. Florero: derivada (flor + -ero). Girasol: compuesta (gira + sol). Enrojecer: parasintética (en- + roj- + -ecer; no existen «enrojo» ni «rojecer»).', 'Luz: simple. Florero: derived (flor + -ero). Girasol: compound (gira + sol). Enrojecer: parasynthetic (en- + roj- + -ecer; neither «enrojo» nor «rojecer» exists).', 'Luz: simple. Florero: derivada (flor + -ero). Girasol: composta (gira + sol). Enrojecer: parasintètica (en- + roj- + -ecer; no existeixen «enrojo» ni «rojecer»).') },
    { e: T('Escribe el plural de: lápiz, autobús, crisis, menú.', 'Write the plural of: lápiz, autobús, crisis, menú.', 'Escriu el plural de: lápiz, autobús, crisis, menú.'),
      s: T('Lápices (la z pasa a c), autobuses (pierde la tilde), crisis (no cambia) y menús.', 'Lápices (z becomes c), autobuses (it loses the accent), crisis (it does not change) and menús.', 'Lápices (la z passa a c), autobuses (perd l’accent), crisis (no canvia) i menús.') },
    { e: T('¿Qué tipo de género tienen «la jirafa», «el estudiante» y «caballo / yegua»?', 'What kind of gender do «la jirafa», «el estudiante» and «caballo / yegua» have?', 'Quin tipus de gènere tenen «la jirafa», «el estudiante» i «caballo / yegua»?'),
      s: T('La jirafa: epiceno (la jirafa macho). El estudiante: común en cuanto al género (la estudiante). Caballo / yegua: heterónimos.', 'La jirafa: epicene (la jirafa macho). El estudiante: common gender (la estudiante). Caballo / yegua: heteronyms.', 'La jirafa: epicè (la jirafa macho). El estudiante: comú quant al gènere (la estudiante). Caballo / yegua: heterònims.') },
    { e: T('¿Qué aporta el prefijo de «inmoral», «imposible» e «ilegal»?', 'What does the prefix add in «inmoral», «imposible» and «ilegal»?', 'Què aporta el prefix d’«inmoral», «imposible» i «ilegal»?'),
      s: T('Negación: es el mismo prefijo in-, que se escribe im- delante de p y b e i- delante de l.', 'Negation: it is the same prefix in-, written im- before p and b and i- before l.', 'Negació: és el mateix prefix in-, que s’escriu im- davant de p i b i i- davant de l.') },
    { e: T('Analiza la forma verbal «cantábamos»: lexema y morfemas.', 'Analyse the verb form «cantábamos»: lexeme and morphemes.', 'Analitza la forma verbal «cantábamos»: lexema i morfemes.'),
      s: T('cant- (lexema) + -á- (vocal temática, 1.ª conjugación) + -ba- (pretérito imperfecto de indicativo) + -mos (1.ª persona del plural).', 'cant- (lexeme) + -á- (theme vowel, 1st conjugation) + -ba- (imperfect indicative) + -mos (1st person plural).', 'cant- (lexema) + -á- (vocal temàtica, 1a conjugació) + -ba- (pretèrit imperfet d’indicatiu) + -mos (1a persona del plural).') },
  ],
}

const adjetivos = {
  metaTitle: L('Los adjetivos: qué son, tipos, grados y ejemplos — resumen y ejercicios', 'Spanish adjectives: what they are, types, degrees and examples — summary and practice questions', 'Els adjectius: què són, tipus, graus i exemples — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los grados del adjetivo', 'Degrees of the adjective', 'Els graus de l’adjectiu'),
      tabla: {
        columnas: L(['Grado', 'Cómo se forma', 'Ejemplo'], ['Degree', 'How it is formed', 'Example'], ['Grau', 'Com es forma', 'Exemple']),
        filas: [
          [L('Positivo', 'Positive', 'Positiu'), L('El adjetivo tal cual', 'The adjective as it is', 'L’adjectiu tal qual'), 'Ana es alta.'],
          [L('Comparativo de superioridad', 'Comparative of superiority', 'Comparatiu de superioritat'), 'más … que', 'Ana es más alta que Luis.'],
          [L('Comparativo de igualdad', 'Comparative of equality', 'Comparatiu d’igualtat'), 'tan … como', 'Ana es tan alta como Luis.'],
          [L('Comparativo de inferioridad', 'Comparative of inferiority', 'Comparatiu d’inferioritat'), 'menos … que', 'Ana es menos alta que Luis.'],
          [L('Superlativo absoluto', 'Absolute superlative', 'Superlatiu absolut'), L('-ísimo o muy', '-ísimo or muy', '-ísimo o muy'), 'Ana es altísima / muy alta.'],
          [L('Superlativo relativo', 'Relative superlative', 'Superlatiu relatiu'), 'el más … de', 'Ana es la más alta de la clase.'],
        ],
      },
      lista: L(
        ['Comparativos y superlativos especiales: bueno → mejor → óptimo; malo → peor → pésimo; grande → mayor → máximo; pequeño → menor → mínimo.', 'Por eso «más mejor» o «más peor» son incorrectos: mejor y peor ya son comparativos.'],
        ['Special comparatives and superlatives: bueno → mejor → óptimo; malo → peor → pésimo; grande → mayor → máximo; pequeño → menor → mínimo.', 'That is why «más mejor» or «más peor» are wrong: mejor and peor are already comparatives.'],
        ['Comparatius i superlatius especials: bueno → mejor → óptimo; malo → peor → pésimo; grande → mayor → máximo; pequeño → menor → mínimo.', 'Per això «más mejor» o «más peor» són incorrectes: mejor i peor ja són comparatius.'],
      ),
    },
    {
      titulo: L('Tipos y posición del adjetivo', 'Types and position of the adjective', 'Tipus i posició de l’adjectiu'),
      tabla: {
        columnas: L(['Tipo', 'Qué hace', 'Ejemplo'], ['Type', 'What it does', 'Example'], ['Tipus', 'Què fa', 'Exemple']),
        filas: [
          [L('Especificativo', 'Restrictive', 'Especificatiu'), L('Distingue al sustantivo de otros; suele ir detrás', 'It sets the noun apart from others; it usually goes after it', 'Distingeix el substantiu d’altres; sol anar darrere'), 'Quiero el jersey rojo (no el azul).'],
          [L('Explicativo (epíteto)', 'Non-restrictive (epithet)', 'Explicatiu (epítet)'), L('Destaca una cualidad que ya tiene; suele ir delante', 'It highlights a quality it already has; it usually goes before it', 'Destaca una qualitat que ja té; sol anar davant'), 'la blanca nieve, el verde prado'],
          [L('De una terminación', 'One ending', 'D’una terminació'), L('Igual en masculino y femenino', 'Same in masculine and feminine', 'Igual en masculí i femení'), 'feliz, verde, amable'],
          [L('De dos terminaciones', 'Two endings', 'De dues terminacions'), L('Cambia para el femenino', 'It changes for the feminine', 'Canvia per al femení'), 'alto / alta, trabajador / trabajadora'],
        ],
      },
      lista: L(
        ['Algunos se acortan delante de un sustantivo singular (apócope): bueno → buen día, malo → mal momento, grande → gran casa, primero → primer piso.'],
        ['Some are shortened before a singular noun (apocope): bueno → buen día, malo → mal momento, grande → gran casa, primero → primer piso.'],
        ['Alguns s’escurcen davant d’un substantiu singular (apòcope): bueno → buen día, malo → mal momento, grande → gran casa, primero → primer piso.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué es un adjetivo?', 'What is an adjective?', 'Què és un adjectiu?'),
      r: T('Es la palabra que acompaña al sustantivo para decir cómo es o cómo está, y concuerda con él en género y número: la casa blanca, los coches nuevos.', 'It is the word that goes with a noun to say what it is like or how it is, and it agrees with it in gender and number: la casa blanca, los coches nuevos.', 'És la paraula que acompanya el substantiu per dir com és o com està, i hi concorda en gènere i nombre: la casa blanca, los coches nuevos.') },
    { p: T('¿En qué se diferencia del determinante?', 'How is it different from a determiner?', 'En què es diferencia del determinant?'),
      r: T('Los dos acompañan al sustantivo, pero el adjetivo expresa una cualidad (casa grande) y el determinante solo lo presenta o lo concreta (esta casa, mi casa, dos casas).', 'Both go with the noun, but the adjective expresses a quality (casa grande) and the determiner only introduces it or makes it specific (esta casa, mi casa, dos casas).', 'Tots dos acompanyen el substantiu, però l’adjectiu expressa una qualitat (casa grande) i el determinant només el presenta o el concreta (esta casa, mi casa, dos casas).') },
    { p: T('¿«Habla alto» lleva un adjetivo?', 'Does «Habla alto» contain an adjective?', '«Habla alto» porta un adjectiu?'),
      r: T('No: ahí alto es un adverbio, porque modifica al verbo (cómo habla) y no cambia de forma (ella habla alto, no «alta»).', 'No: there alto is an adverb, because it modifies the verb (how she speaks) and does not change form (ella habla alto, not «alta»).', 'No: aquí alto és un adverbi, perquè modifica el verb (com parla) i no canvia de forma (ella habla alto, no «alta»).') },
  ],
  ejercicios: [
    { e: T('Busca los adjetivos: «La casa vieja tenía unas ventanas enormes y un jardín precioso».', 'Find the adjectives: «La casa vieja tenía unas ventanas enormes y un jardín precioso».', 'Busca els adjectius: «La casa vieja tenía unas ventanas enormes y un jardín precioso».'),
      s: T('Vieja, enormes y precioso. «La» y «unas» son determinantes.', 'Vieja, enormes and precioso. «La» and «unas» are determiners.', 'Vieja, enormes i precioso. «La» i «unas» són determinants.') },
    { e: T('¿En qué grado está cada adjetivo? «buenísimo», «tan listo como», «el más rápido del equipo».', 'What degree is each adjective in? «buenísimo», «tan listo como», «el más rápido del equipo».', 'En quin grau està cada adjectiu? «buenísimo», «tan listo como», «el más rápido del equipo».'),
      s: T('Superlativo absoluto, comparativo de igualdad y superlativo relativo.', 'Absolute superlative, comparative of equality and relative superlative.', 'Superlatiu absolut, comparatiu d’igualtat i superlatiu relatiu.') },
    { e: T('Corrige: «Este examen me ha salido más mejor que el otro».', 'Correct: «Este examen me ha salido más mejor que el otro».', 'Corregeix: «Este examen me ha salido más mejor que el otro».'),
      s: T('«Este examen me ha salido mejor que el otro». Mejor ya es comparativo y no lleva más.', '«Este examen me ha salido mejor que el otro». Mejor is already a comparative and does not take más.', '«Este examen me ha salido mejor que el otro». Mejor ja és comparatiu i no porta más.') },
    { e: T('Escribe el superlativo absoluto de: fácil, rápido, feliz.', 'Write the absolute superlative of: fácil, rápido, feliz.', 'Escriu el superlatiu absolut de: fácil, rápido, feliz.'),
      s: T('Facilísimo, rapidísimo y felicísimo (o muy fácil, muy rápido, muy feliz).', 'Facilísimo, rapidísimo and felicísimo (or muy fácil, muy rápido, muy feliz).', 'Facilísimo, rapidísimo i felicísimo (o muy fácil, muy rápido, muy feliz).') },
    { e: T('¿Especificativo o explicativo? «la fría nieve» y «el agua fría».', 'Restrictive or non-restrictive? «la fría nieve» and «el agua fría».', 'Especificatiu o explicatiu? «la fría nieve» i «el agua fría».'),
      s: T('La fría nieve: explicativo (toda nieve es fría). El agua fría: especificativo (no la caliente).', 'La fría nieve: non-restrictive (all snow is cold). El agua fría: restrictive (not the hot water).', 'La fría nieve: explicatiu (tota neu és freda). El agua fría: especificatiu (no la calenta).') },
    { e: T('Completa con la forma correcta de «grande»: «Fue un ___ día» y «Vive en una casa ___».', 'Fill in the right form of «grande»: «Fue un ___ día» and «Vive en una casa ___».', 'Completa amb la forma correcta de «grande»: «Fue un ___ día» i «Vive en una casa ___».'),
      s: T('«Fue un gran día» (delante del sustantivo se acorta) y «Vive en una casa grande».', '«Fue un gran día» (before the noun it is shortened) and «Vive en una casa grande».', '«Fue un gran día» (davant del substantiu s’escurça) i «Vive en una casa grande».') },
  ],
}

const nexos = {
  metaTitle: L('Los nexos: conjunciones y preposiciones, tipos y ejemplos — resumen y ejercicios', 'Spanish connectors: conjunctions and prepositions, types and examples — summary and practice questions', 'Els nexes: conjuncions i preposicions, tipus i exemples — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las preposiciones', 'Prepositions', 'Les preposicions'),
      texto: L(
        ['Las preposiciones introducen un complemento y lo unen a otra palabra: el libro de Ana, voy a casa, café con leche. Son invariables y forman una lista cerrada.'],
        ['Prepositions introduce a complement and link it to another word: el libro de Ana, voy a casa, café con leche. They are invariable and form a closed list.'],
        ['Les preposicions introdueixen un complement i l’uneixen a una altra paraula: el libro de Ana, voy a casa, café con leche. Són invariables i formen una llista tancada.'],
      ),
      lista: L(
        ['a, ante, bajo, con, contra, de, desde, durante, en, entre, hacia, hasta, mediante, para, por, según, sin, sobre, tras (y las menos usadas versus y vía; cabe y so ya no se usan).', 'También hay locuciones preposicionales, de varias palabras que funcionan como una: delante de, encima de, a causa de, gracias a.'],
        ['a, ante, bajo, con, contra, de, desde, durante, en, entre, hacia, hasta, mediante, para, por, según, sin, sobre, tras (plus the less common versus and vía; cabe and so are no longer used).', 'There are also prepositional phrases, several words that work as one: delante de, encima de, a causa de, gracias a.'],
        ['a, ante, bajo, con, contra, de, desde, durante, en, entre, hacia, hasta, mediante, para, por, según, sin, sobre, tras (i les menys usades versus i vía; cabe i so ja no s’usen).', 'També hi ha locucions preposicionals, de diverses paraules que funcionen com una: delante de, encima de, a causa de, gracias a.'],
      ),
    },
    {
      titulo: L('Las conjunciones: tipos y ejemplos', 'Conjunctions: types and examples', 'Les conjuncions: tipus i exemples'),
      tabla: {
        columnas: L(['Tipo', 'Conjunciones', 'Ejemplo'], ['Type', 'Conjunctions', 'Example'], ['Tipus', 'Conjuncions', 'Exemple']),
        filas: [
          [L('Coordinante copulativa (suma)', 'Coordinating copulative (adds)', 'Coordinant copulativa (suma)'), 'y, e, ni', 'Canta y baila. No come ni bebe.'],
          [L('Coordinante disyuntiva (elige)', 'Coordinating disjunctive (chooses)', 'Coordinant disjuntiva (tria)'), 'o, u', '¿Vienes o te quedas?'],
          [L('Coordinante adversativa (opone)', 'Coordinating adversative (contrasts)', 'Coordinant adversativa (oposa)'), 'pero, mas, sino', 'Es caro, pero bueno. No es azul, sino verde.'],
          [L('Subordinante causal', 'Subordinating causal', 'Subordinant causal'), 'porque, ya que, puesto que', 'No vino porque estaba enfermo.'],
          [L('Subordinante condicional', 'Subordinating conditional', 'Subordinant condicional'), 'si', 'Si llueve, nos quedamos.'],
          [L('Subordinante concesiva', 'Subordinating concessive', 'Subordinant concessiva'), 'aunque', 'Saldré aunque llueva.'],
          [L('Subordinante final', 'Subordinating final (purpose)', 'Subordinant final'), 'para que', 'Te lo explico para que lo entiendas.'],
          [L('Subordinante completiva', 'Subordinating completive', 'Subordinant completiva'), 'que, si', 'Dice que vendrá. No sé si vendrá.'],
        ],
      },
      lista: L(
        ['Y pasa a e delante de i- o hi- (padre e hijo), pero no delante de hie- (agua y hielo). O pasa a u delante de o- u ho- (siete u ocho).', 'Las coordinantes unen elementos del mismo nivel; las subordinantes hacen que una oración dependa de la otra.'],
        ['Y becomes e before i- or hi- (padre e hijo), but not before hie- (agua y hielo). O becomes u before o- or ho- (siete u ocho).', 'Coordinating conjunctions join elements of the same level; subordinating ones make one clause depend on the other.'],
        ['Y passa a e davant d’i- o hi- (padre e hijo), però no davant de hie- (agua y hielo). O passa a u davant d’o- o ho- (siete u ocho).', 'Les coordinants uneixen elements del mateix nivell; les subordinants fan que una oració depengui de l’altra.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué son los nexos?', 'What are connectors?', 'Què són els nexes?'),
      r: T('Son las palabras que unen otras palabras u oraciones. Los principales son las preposiciones (a, de, con) y las conjunciones (y, pero, porque).', 'They are the words that join other words or clauses. The main ones are prepositions (a, de, con) and conjunctions (y, pero, porque).', 'Són les paraules que uneixen altres paraules o oracions. Els principals són les preposicions (a, de, con) i les conjuncions (y, pero, porque).') },
    { p: T('¿«Sino» o «si no»?', '«Sino» or «si no»?', '«Sino» o «si no»?'),
      r: T('Sino, junto, opone: «No es rojo, sino azul». Si no, separado, es «si» + «no» y pone una condición: «Si no vienes, me voy».', 'Sino, as one word, contrasts: «No es rojo, sino azul». Si no, as two words, is «si» + «no» and sets a condition: «Si no vienes, me voy».', 'Sino, junt, oposa: «No es rojo, sino azul». Si no, separat, és «si» + «no» i posa una condició: «Si no vienes, me voy».') },
    { p: T('¿«Porque», «por que», «porqué» o «por qué»?', '«Porque», «por que», «porqué» or «por qué»?', '«Porque», «por que», «porqué» o «por qué»?'),
      r: T('Porque da la causa (vino porque quiso); por qué pregunta (¿por qué vino?); el porqué es un sustantivo (no sé el porqué); por que es preposición + relativo (la razón por que vino).', 'Porque gives the cause (vino porque quiso); por qué asks (¿por qué vino?); el porqué is a noun (no sé el porqué); por que is preposition + relative (la razón por que vino).', 'Porque dona la causa (vino porque quiso); por qué pregunta (¿por qué vino?); el porqué és un substantiu (no sé el porqué); por que és preposició + relatiu (la razón por que vino).') },
  ],
  ejercicios: [
    { e: T('Subraya las preposiciones: «Salí de casa con mi hermano hacia el parque».', 'Underline the prepositions: «Salí de casa con mi hermano hacia el parque».', 'Subratlla les preposicions: «Salí de casa con mi hermano hacia el parque».'),
      s: T('De, con y hacia.', 'De, con and hacia.', 'De, con i hacia.') },
    { e: T('Completa con y / e, o / u: «padre ___ hijo», «agua ___ hielo», «siete ___ ocho», «plata ___ oro».', 'Fill in y / e, o / u: «padre ___ hijo», «agua ___ hielo», «siete ___ ocho», «plata ___ oro».', 'Completa amb y / e, o / u: «padre ___ hijo», «agua ___ hielo», «siete ___ ocho», «plata ___ oro».'),
      s: T('Padre e hijo, agua y hielo (hie- no cambia), siete u ocho, plata u oro.', 'Padre e hijo, agua y hielo (hie- does not change it), siete u ocho, plata u oro.', 'Padre e hijo, agua y hielo (hie- no canvia), siete u ocho, plata u oro.') },
    { e: T('Di el tipo de conjunción: «No vino porque estaba enfermo», «¿Vienes o te quedas?», «Es caro, pero bueno».', 'Say the type of conjunction: «No vino porque estaba enfermo», «¿Vienes o te quedas?», «Es caro, pero bueno».', 'Digues el tipus de conjunció: «No vino porque estaba enfermo», «¿Vienes o te quedas?», «Es caro, pero bueno».'),
      s: T('Porque: subordinante causal. O: coordinante disyuntiva. Pero: coordinante adversativa.', 'Porque: subordinating causal. O: coordinating disjunctive. Pero: coordinating adversative.', 'Porque: subordinant causal. O: coordinant disjuntiva. Pero: coordinant adversativa.') },
    { e: T('¿Sino o si no? «No quiero té, ___ café» y «___ estudias, no aprobarás».', 'Sino or si no? «No quiero té, ___ café» and «___ estudias, no aprobarás».', 'Sino o si no? «No quiero té, ___ café» i «___ estudias, no aprobarás».'),
      s: T('«No quiero té, sino café» (opone) y «Si no estudias, no aprobarás» (condición).', '«No quiero té, sino café» (contrast) and «Si no estudias, no aprobarás» (condition).', '«No quiero té, sino café» (oposa) i «Si no estudias, no aprobarás» (condició).') },
    { e: T('Une las dos oraciones con un nexo de causa: «Me abrigué. Hacía frío».', 'Join the two clauses with a causal connector: «Me abrigué. Hacía frío».', 'Uneix les dues oracions amb un nexe de causa: «Me abrigué. Hacía frío».'),
      s: T('«Me abrigué porque hacía frío» (también ya que o puesto que).', '«Me abrigué porque hacía frío» (ya que or puesto que also work).', '«Me abrigué porque hacía frío» (també ya que o puesto que).') },
  ],
}

const verbos = {
  metaTitle: L('Los verbos: qué son, conjugación, tiempos y modos — resumen y ejercicios', 'Spanish verbs: what they are, conjugation, tenses and moods — summary and practice questions', 'Els verbs: què són, conjugació, temps i modes — resum i exercicis'),
  secciones: [
    {
      titulo: L('Cómo se analiza una forma verbal', 'How to analyse a verb form', 'Com s’analitza una forma verbal'),
      texto: L(
        ['Analizar un verbo es decir cinco cosas: persona, número, tiempo, modo y conjugación, y si es simple o compuesto (el compuesto lleva haber + participio).'],
        ['Analysing a verb means saying five things: person, number, tense, mood and conjugation, and whether it is simple or compound (the compound one uses haber + past participle).'],
        ['Analitzar un verb és dir cinc coses: persona, nombre, temps, mode i conjugació, i si és simple o compost (el compost porta haber + participi).'],
      ),
      tabla: {
        columnas: L(['Forma', 'Persona y número', 'Tiempo', 'Modo', 'Conjugación'], ['Form', 'Person and number', 'Tense', 'Mood', 'Conjugation'], ['Forma', 'Persona i nombre', 'Temps', 'Mode', 'Conjugació']),
        filas: [
          ['cantábamos', L('1.ª plural', '1st plural', '1a plural'), L('pretérito imperfecto', 'imperfect past', 'pretèrit imperfet'), L('indicativo', 'indicative', 'indicatiu'), '1.ª (-ar)'],
          ['comerán', L('3.ª plural', '3rd plural', '3a plural'), L('futuro simple', 'simple future', 'futur simple'), L('indicativo', 'indicative', 'indicatiu'), '2.ª (-er)'],
          ['hayas vivido', L('2.ª singular', '2nd singular', '2a singular'), L('pretérito perfecto', 'present perfect', 'pretèrit perfet'), L('subjuntivo', 'subjunctive', 'subjuntiu'), '3.ª (-ir)'],
          ['salió', L('3.ª singular', '3rd singular', '3a singular'), L('pretérito perfecto simple', 'preterite', 'pretèrit perfet simple'), L('indicativo', 'indicative', 'indicatiu'), '3.ª (-ir)'],
          ['estudiad', L('2.ª plural', '2nd plural', '2a plural'), '—', L('imperativo', 'imperative', 'imperatiu'), '1.ª (-ar)'],
        ],
      },
    },
    {
      titulo: L('El presente de las tres conjugaciones', 'The present tense of the three conjugations', 'El present de les tres conjugacions'),
      tabla: {
        columnas: L(['Persona', 'amar (-ar)', 'temer (-er)', 'partir (-ir)'], ['Person', 'amar (-ar)', 'temer (-er)', 'partir (-ir)'], ['Persona', 'amar (-ar)', 'temer (-er)', 'partir (-ir)']),
        filas: [
          ['yo', 'amo', 'temo', 'parto'],
          ['tú', 'amas', 'temes', 'partes'],
          ['él / ella / usted', 'ama', 'teme', 'parte'],
          ['nosotros', 'amamos', 'tememos', 'partimos'],
          ['vosotros', 'amáis', 'teméis', 'partís'],
          ['ellos / ustedes', 'aman', 'temen', 'parten'],
        ],
      },
    },
    {
      titulo: L('Tiempos de indicativo y formas no personales', 'Indicative tenses and non-finite forms', 'Temps d’indicatiu i formes no personals'),
      tabla: {
        columnas: L(['Tiempo simple', 'Ejemplo', 'Tiempo compuesto', 'Ejemplo'], ['Simple tense', 'Example', 'Compound tense', 'Example'], ['Temps simple', 'Exemple', 'Temps compost', 'Exemple']),
        filas: [
          [L('Presente', 'Present', 'Present'), 'canto', L('Pretérito perfecto compuesto', 'Present perfect', 'Pretèrit perfet compost'), 'he cantado'],
          [L('Pretérito imperfecto', 'Imperfect', 'Pretèrit imperfet'), 'cantaba', L('Pretérito pluscuamperfecto', 'Pluperfect', 'Pretèrit plusquamperfet'), 'había cantado'],
          [L('Pretérito perfecto simple', 'Preterite', 'Pretèrit perfet simple'), 'canté', L('Pretérito anterior', 'Past anterior', 'Pretèrit anterior'), 'hube cantado'],
          [L('Futuro simple', 'Simple future', 'Futur simple'), 'cantaré', L('Futuro compuesto', 'Future perfect', 'Futur compost'), 'habré cantado'],
          [L('Condicional simple', 'Simple conditional', 'Condicional simple'), 'cantaría', L('Condicional compuesto', 'Conditional perfect', 'Condicional compost'), 'habría cantado'],
        ],
      },
      lista: L(
        ['Formas no personales (no indican persona): infinitivo (cantar, comer, vivir), gerundio (cantando, comiendo, viviendo) y participio (cantado, comido, vivido).'],
        ['Non-finite forms (they do not show person): infinitive (cantar, comer, vivir), gerund (cantando, comiendo, viviendo) and past participle (cantado, comido, vivido).'],
        ['Formes no personals (no indiquen persona): infinitiu (cantar, comer, vivir), gerundi (cantando, comiendo, viviendo) i participi (cantado, comido, vivido).'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué es un verbo?', 'What is a verb?', 'Què és un verb?'),
      r: T('Es la palabra que expresa una acción, un estado o un proceso y que se conjuga: cambia de forma según la persona, el número, el tiempo y el modo.', 'It is the word that expresses an action, a state or a process and that is conjugated: it changes form with person, number, tense and mood.', 'És la paraula que expressa una acció, un estat o un procés i que es conjuga: canvia de forma segons la persona, el nombre, el temps i el mode.') },
    { p: T('¿Cuáles son los modos verbales?', 'What are the verb moods?', 'Quins són els modes verbals?'),
      r: T('Tres: indicativo (hechos: canto), subjuntivo (deseos, dudas: ojalá cante) e imperativo (órdenes: canta).', 'Three: indicative (facts: canto), subjunctive (wishes, doubts: ojalá cante) and imperative (orders: canta).', 'Tres: indicatiu (fets: canto), subjuntiu (desitjos, dubtes: ojalá cante) i imperatiu (ordres: canta).') },
    { p: T('¿Qué es un verbo irregular?', 'What is an irregular verb?', 'Què és un verb irregular?'),
      r: T('El que cambia la raíz o no sigue las terminaciones de su modelo: tener → tengo, poder → puedo, ir → voy.', 'One that changes its root or does not follow the endings of its model: tener → tengo, poder → puedo, ir → voy.', 'El que canvia l’arrel o no segueix les terminacions del seu model: tener → tengo, poder → puedo, ir → voy.') },
  ],
  ejercicios: [
    { e: T('Analiza «comerán»: persona, número, tiempo, modo y conjugación.', 'Analyse «comerán»: person, number, tense, mood and conjugation.', 'Analitza «comerán»: persona, nombre, temps, mode i conjugació.'),
      s: T('3.ª persona del plural, futuro simple de indicativo, 2.ª conjugación (comer).', '3rd person plural, simple future indicative, 2nd conjugation (comer).', '3a persona del plural, futur simple d’indicatiu, 2a conjugació (comer).') },
    { e: T('Analiza «hubiéramos salido».', 'Analyse «hubiéramos salido».', 'Analitza «hubiéramos salido».'),
      s: T('1.ª persona del plural, pretérito pluscuamperfecto de subjuntivo (tiempo compuesto), 3.ª conjugación (salir).', '1st person plural, pluperfect subjunctive (a compound tense), 3rd conjugation (salir).', '1a persona del plural, pretèrit plusquamperfet de subjuntiu (temps compost), 3a conjugació (salir).') },
    { e: T('Escribe las formas no personales de «vivir».', 'Write the non-finite forms of «vivir».', 'Escriu les formes no personals de «vivir».'),
      s: T('Infinitivo: vivir. Gerundio: viviendo. Participio: vivido.', 'Infinitive: vivir. Gerund: viviendo. Past participle: vivido.', 'Infinitiu: vivir. Gerundi: viviendo. Participi: vivido.') },
    { e: T('Conjuga «partir» en presente de subjuntivo, 1.ª persona del plural.', 'Conjugate «partir» in the present subjunctive, 1st person plural.', 'Conjuga «partir» en present de subjuntiu, 1a persona del plural.'),
      s: T('(que nosotros) partamos.', '(que nosotros) partamos.', '(que nosotros) partamos.') },
    { e: T('Di el modo de cada verbo: «Ojalá llueva», «Cierra la puerta», «Mañana viajo».', 'Give the mood of each verb: «Ojalá llueva», «Cierra la puerta», «Mañana viajo».', 'Digues el mode de cada verb: «Ojalá llueva», «Cierra la puerta», «Mañana viajo».'),
      s: T('Llueva: subjuntivo. Cierra: imperativo. Viajo: indicativo (presente con valor de futuro).', 'Llueva: subjunctive. Cierra: imperative. Viajo: indicative (present used for the future).', 'Llueva: subjuntiu. Cierra: imperatiu. Viajo: indicatiu (present amb valor de futur).') },
    { e: T('¿De qué verbo es «fuimos»?', 'Which verb does «fuimos» come from?', 'De quin verb és «fuimos»?'),
      s: T('Puede ser de ser o de ir, que comparten el pretérito perfecto simple: «Fuimos al cine» (ir) y «Fuimos los primeros» (ser). Lo decide la frase.', 'It can be ser or ir, which share the preterite: «Fuimos al cine» (ir) and «Fuimos los primeros» (ser). The sentence decides.', 'Pot ser de ser o d’ir, que comparteixen el pretèrit perfet simple: «Fuimos al cine» (ir) i «Fuimos los primeros» (ser). Ho decideix la frase.') },
  ],
}

// ── CIENCIAS ──────────────────────────────────────────────────────────────

const disoluciones = {
  metaTitle: L('Las disoluciones: soluto, disolvente y concentración (g/L, % y molaridad) — resumen y ejercicios', 'Solutions: solute, solvent and concentration (g/L, % and molarity) — summary and practice questions', 'Les dissolucions: solut, dissolvent i concentració (g/L, % i molaritat) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Fórmulas de la concentración', 'Concentration formulas', 'Fórmules de la concentració'),
      tabla: {
        columnas: L(['Forma', 'Fórmula', 'Unidad'], ['Measure', 'Formula', 'Unit'], ['Forma', 'Fórmula', 'Unitat']),
        filas: [
          [L('Masa por volumen', 'Mass per volume', 'Massa per volum'), L('masa de soluto ÷ volumen de disolución', 'mass of solute ÷ volume of solution', 'massa de solut ÷ volum de dissolució'), 'g/L'],
          [L('Tanto por ciento en masa', 'Percentage by mass', 'Tant per cent en massa'), L('masa de soluto ÷ masa de disolución × 100', 'mass of solute ÷ mass of solution × 100', 'massa de solut ÷ massa de dissolució × 100'), '%'],
          [L('Tanto por ciento en volumen', 'Percentage by volume', 'Tant per cent en volum'), L('volumen de soluto ÷ volumen de disolución × 100', 'volume of solute ÷ volume of solution × 100', 'volum de solut ÷ volum de dissolució × 100'), L('% (vol)', '% (vol)', '% (vol)')],
          [L('Molaridad', 'Molarity', 'Molaritat'), L('moles de soluto ÷ litros de disolución', 'moles of solute ÷ litres of solution', 'mols de solut ÷ litres de dissolució'), 'mol/L = M'],
        ],
      },
      lista: L(
        ['La masa de la disolución es soluto + disolvente: 10 g de sal en 90 g de agua son 100 g de disolución.', 'Para diluir se añade disolvente y el soluto no cambia: C₁ · V₁ = C₂ · V₂.', 'Los moles de soluto son su masa entre su masa molar: 58,5 g de NaCl son 1 mol.'],
        ['The mass of the solution is solute + solvent: 10 g of salt in 90 g of water make 100 g of solution.', 'To dilute, you add solvent and the solute does not change: C₁ · V₁ = C₂ · V₂.', 'The moles of solute are its mass divided by its molar mass: 58.5 g of NaCl is 1 mol.'],
        ['La massa de la dissolució és solut + dissolvent: 10 g de sal en 90 g d’aigua són 100 g de dissolució.', 'Per diluir s’hi afegeix dissolvent i el solut no canvia: C₁ · V₁ = C₂ · V₂.', 'Els mols de solut són la seva massa entre la massa molar: 58,5 g de NaCl són 1 mol.'],
      ),
    },
    {
      titulo: L('Tipos de disoluciones', 'Types of solution', 'Tipus de dissolucions'),
      tabla: {
        columnas: L(['Según…', 'Tipos', 'Ejemplo'], ['By…', 'Types', 'Example'], ['Segons…', 'Tipus', 'Exemple']),
        filas: [
          [L('La cantidad de soluto', 'The amount of solute', 'La quantitat de solut'), L('diluida, concentrada, saturada (ya no admite más) y sobresaturada', 'dilute, concentrated, saturated (it takes no more) and supersaturated', 'diluïda, concentrada, saturada (ja no n’admet més) i sobresaturada'), L('agua con una pizca de sal / agua del mar Muerto', 'water with a pinch of salt / Dead Sea water', 'aigua amb un pessic de sal / aigua del mar Mort')],
          [L('El estado del disolvente', 'The state of the solvent', 'L’estat del dissolvent'), L('sólida, líquida y gaseosa', 'solid, liquid and gas', 'sòlida, líquida i gasosa'), L('bronce (aleación) / agua con sal / aire', 'bronze (alloy) / salt water / air', 'bronze (aliatge) / aigua amb sal / aire')],
        ],
      },
      texto: L(
        ['La solubilidad es lo máximo que se puede disolver en una cantidad de disolvente a una temperatura: unos 36 g de sal en 100 g de agua a 20 °C. Para la mayoría de los sólidos aumenta con la temperatura; para los gases, al revés: por eso un refresco caliente pierde el gas.'],
        ['Solubility is the most that can dissolve in a given amount of solvent at a given temperature: about 36 g of salt in 100 g of water at 20 °C. For most solids it rises with temperature; for gases it is the other way round: that is why a warm fizzy drink goes flat.'],
        ['La solubilitat és el màxim que es pot dissoldre en una quantitat de dissolvent a una temperatura: uns 36 g de sal en 100 g d’aigua a 20 °C. Per a la majoria de sòlids augmenta amb la temperatura; per als gasos, al revés: per això un refresc calent perd el gas.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué es el soluto y qué es el disolvente?', 'What are the solute and the solvent?', 'Què és el solut i què és el dissolvent?'),
      r: T('El soluto es lo que se disuelve, en menor cantidad (la sal), y el disolvente lo que disuelve, en mayor cantidad (el agua). En el aire, el disolvente es el nitrógeno, que es el que más hay.', 'The solute is what dissolves, the smaller amount (salt), and the solvent is what dissolves it, the larger amount (water). In air, the solvent is nitrogen, as there is most of it.', 'El solut és el que es dissol, en menor quantitat (la sal), i el dissolvent el que dissol, en més quantitat (l’aigua). A l’aire, el dissolvent és el nitrogen, que és el que més hi ha.') },
    { p: T('¿Qué diferencia hay entre g/L y molaridad?', 'What is the difference between g/L and molarity?', 'Quina diferència hi ha entre g/L i molaritat?'),
      r: T('Las dos son por litro de disolución, pero g/L cuenta gramos de soluto y la molaridad cuenta moles. Para pasar de una a otra se divide entre la masa molar.', 'Both are per litre of solution, but g/L counts grams of solute and molarity counts moles. To go from one to the other you divide by the molar mass.', 'Totes dues són per litre de dissolució, però g/L compta grams de solut i la molaritat compta mols. Per passar de l’una a l’altra es divideix entre la massa molar.') },
  ],
  ejercicios: [
    { e: T('Se disuelven 20 g de sal hasta tener 500 mL de disolución. ¿Cuál es la concentración en g/L?', '20 g of salt are dissolved to make 500 mL of solution. What is the concentration in g/L?', 'Es dissolen 20 g de sal fins a tenir 500 mL de dissolució. Quina és la concentració en g/L?'),
      s: T('500 mL = 0,5 L. Concentración = 20 g ÷ 0,5 L = 40 g/L.', '500 mL = 0.5 L. Concentration = 20 g ÷ 0.5 L = 40 g/L.', '500 mL = 0,5 L. Concentració = 20 g ÷ 0,5 L = 40 g/L.') },
    { e: T('Se disuelven 10 g de azúcar en 90 g de agua. ¿Cuál es el tanto por ciento en masa?', '10 g of sugar are dissolved in 90 g of water. What is the percentage by mass?', 'Es dissolen 10 g de sucre en 90 g d’aigua. Quin és el tant per cent en massa?'),
      s: T('La disolución pesa 10 + 90 = 100 g. % = 10 ÷ 100 × 100 = 10 %. Dividir entre 90 (solo el agua) es el error típico.', 'The solution weighs 10 + 90 = 100 g. % = 10 ÷ 100 × 100 = 10 %. Dividing by 90 (just the water) is the classic mistake.', 'La dissolució pesa 10 + 90 = 100 g. % = 10 ÷ 100 × 100 = 10 %. Dividir entre 90 (només l’aigua) és l’error típic.') },
    { e: T('Hay 0,5 mol de NaCl en 250 mL de disolución. ¿Cuál es la molaridad?', 'There are 0.5 mol of NaCl in 250 mL of solution. What is the molarity?', 'Hi ha 0,5 mol de NaCl en 250 mL de dissolució. Quina és la molaritat?'),
      s: T('250 mL = 0,25 L. M = 0,5 ÷ 0,25 = 2 mol/L (2 M).', '250 mL = 0.25 L. M = 0.5 ÷ 0.25 = 2 mol/L (2 M).', '250 mL = 0,25 L. M = 0,5 ÷ 0,25 = 2 mol/L (2 M).') },
    { e: T('Se disuelven 117 g de NaCl (masa molar 58,5 g/mol) hasta 2 L. ¿Molaridad?', '117 g of NaCl (molar mass 58.5 g/mol) are dissolved to 2 L. Molarity?', 'Es dissolen 117 g de NaCl (massa molar 58,5 g/mol) fins a 2 L. Molaritat?'),
      s: T('Moles = 117 ÷ 58,5 = 2 mol. M = 2 mol ÷ 2 L = 1 M.', 'Moles = 117 ÷ 58.5 = 2 mol. M = 2 mol ÷ 2 L = 1 M.', 'Mols = 117 ÷ 58,5 = 2 mol. M = 2 mol ÷ 2 L = 1 M.') },
    { e: T('Se diluyen 100 mL de una disolución 2 M añadiendo agua hasta 400 mL. ¿Qué concentración queda?', '100 mL of a 2 M solution are diluted with water up to 400 mL. What is the new concentration?', 'Es dilueixen 100 mL d’una dissolució 2 M afegint aigua fins a 400 mL. Quina concentració queda?'),
      s: T('C₁ · V₁ = C₂ · V₂ → 2 · 100 = C₂ · 400 → C₂ = 0,5 M. El volumen se ha multiplicado por 4 y la concentración se ha dividido entre 4.', 'C₁ · V₁ = C₂ · V₂ → 2 · 100 = C₂ · 400 → C₂ = 0.5 M. The volume has been multiplied by 4 and the concentration divided by 4.', 'C₁ · V₁ = C₂ · V₂ → 2 · 100 = C₂ · 400 → C₂ = 0,5 M. El volum s’ha multiplicat per 4 i la concentració s’ha dividit entre 4.') },
    { e: T('¿Cuántos gramos de azúcar hay en 250 mL de un zumo de 40 g/L?', 'How many grams of sugar are there in 250 mL of a juice at 40 g/L?', 'Quants grams de sucre hi ha en 250 mL d’un suc de 40 g/L?'),
      s: T('Masa = concentración × volumen = 40 g/L × 0,25 L = 10 g.', 'Mass = concentration × volume = 40 g/L × 0.25 L = 10 g.', 'Massa = concentració × volum = 40 g/L × 0,25 L = 10 g.') },
  ],
}

const movimiento = {
  metaTitle: L('El movimiento: MRU, MRUA, caída libre y gráficas x-t y v-t — resumen y ejercicios', 'Motion: uniform and accelerated motion, free fall and x-t and v-t graphs — summary and practice questions', 'El moviment: MRU, MRUA, caiguda lliure i gràfiques x-t i v-t — resum i exercicis'),
  secciones: [
    {
      titulo: L('Ecuaciones del movimiento', 'Equations of motion', 'Equacions del moviment'),
      tabla: {
        columnas: L(['Movimiento', 'Ecuaciones', 'Qué no cambia'], ['Motion', 'Equations', 'What stays the same'], ['Moviment', 'Equacions', 'Què no canvia']),
        filas: [
          ['MRU', 'x = x₀ + v · t', L('la velocidad (a = 0)', 'the velocity (a = 0)', 'la velocitat (a = 0)')],
          ['MRUA', 'v = v₀ + a · t;  x = x₀ + v₀ · t + ½ · a · t²;  v² = v₀² + 2 · a · Δx', L('la aceleración', 'the acceleration', 'l’acceleració')],
          [L('Caída libre', 'Free fall', 'Caiguda lliure'), 'v = g · t;  h = ½ · g · t²  (g ≈ 9,8 m/s²)', L('la aceleración, g, igual para todos sin aire', 'the acceleration, g, the same for everything without air', 'l’acceleració, g, igual per a tots sense aire')],
        ],
      },
      lista: L(
        ['De km/h a m/s se divide entre 3,6 (72 km/h = 20 m/s); de m/s a km/h se multiplica.', 'Si frena, la aceleración es negativa: el móvil pierde velocidad.'],
        ['To go from km/h to m/s divide by 3.6 (72 km/h = 20 m/s); from m/s to km/h, multiply.', 'When braking, the acceleration is negative: the object loses speed.'],
        ['De km/h a m/s es divideix entre 3,6 (72 km/h = 20 m/s); de m/s a km/h es multiplica.', 'Si frena, l’acceleració és negativa: el mòbil perd velocitat.'],
      ),
    },
    {
      titulo: L('Cómo leer las gráficas x-t y v-t', 'How to read x-t and v-t graphs', 'Com llegir les gràfiques x-t i v-t'),
      tabla: {
        columnas: L(['Movimiento', 'Gráfica x-t', 'Gráfica v-t'], ['Motion', 'x-t graph', 'v-t graph'], ['Moviment', 'Gràfica x-t', 'Gràfica v-t']),
        filas: [
          [L('Reposo', 'At rest', 'Repòs'), L('recta horizontal', 'horizontal line', 'recta horitzontal'), L('sobre el eje (v = 0)', 'on the axis (v = 0)', 'sobre l’eix (v = 0)')],
          ['MRU', L('recta inclinada (pendiente = v)', 'sloping line (gradient = v)', 'recta inclinada (pendent = v)'), L('recta horizontal', 'horizontal line', 'recta horitzontal')],
          [L('MRUA acelerando', 'Accelerating', 'MRUA accelerant'), L('curva cada vez más empinada (parábola)', 'curve getting steeper (parabola)', 'corba cada cop més empinada (paràbola)'), L('recta que sube (pendiente = a)', 'rising line (gradient = a)', 'recta que puja (pendent = a)')],
          [L('MRUA frenando', 'Slowing down', 'MRUA frenant'), L('curva que se va aplanando', 'curve that flattens out', 'corba que es va aplanant'), L('recta que baja hasta v = 0', 'falling line down to v = 0', 'recta que baixa fins a v = 0')],
        ],
      },
      lista: L(
        ['El área bajo la gráfica v-t es la distancia recorrida.'],
        ['The area under the v-t graph is the distance travelled.'],
        ['L’àrea sota la gràfica v-t és la distància recorreguda.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre MRU y MRUA?', 'What is the difference between uniform and uniformly accelerated motion?', 'Quina diferència hi ha entre MRU i MRUA?'),
      r: T('En el MRU la velocidad es constante y recorre lo mismo cada segundo; en el MRUA la velocidad cambia siempre lo mismo cada segundo, porque hay una aceleración constante.', 'In uniform motion the velocity is constant and the object covers the same distance every second; in uniformly accelerated motion the velocity changes by the same amount every second, because there is a constant acceleration.', 'En el MRU la velocitat és constant i recorre el mateix cada segon; en el MRUA la velocitat canvia sempre el mateix cada segon, perquè hi ha una acceleració constant.') },
    { p: T('¿Distancia recorrida y desplazamiento son lo mismo?', 'Are distance travelled and displacement the same?', 'Distància recorreguda i desplaçament són el mateix?'),
      r: T('No. La distancia suma todo el camino; el desplazamiento solo mira dónde empieza y dónde acaba. Si vas 300 m y vuelves 100 m, recorres 400 m pero te desplazas 200 m.', 'No. Distance adds up the whole path; displacement only looks at where it starts and ends. If you go 300 m and come back 100 m, you travel 400 m but your displacement is 200 m.', 'No. La distància suma tot el camí; el desplaçament només mira on comença i on acaba. Si vas 300 m i tornes 100 m, recorres 400 m però et desplaces 200 m.') },
  ],
  ejercicios: [
    { e: T('Un coche va a 72 km/h en MRU. ¿Cuántos metros recorre en 10 s?', 'A car travels at 72 km/h in uniform motion. How many metres does it cover in 10 s?', 'Un cotxe va a 72 km/h en MRU. Quants metres recorre en 10 s?'),
      s: T('72 ÷ 3,6 = 20 m/s. x = v · t = 20 · 10 = 200 m.', '72 ÷ 3.6 = 20 m/s. x = v · t = 20 × 10 = 200 m.', '72 ÷ 3,6 = 20 m/s. x = v · t = 20 · 10 = 200 m.') },
    { e: T('Una moto parte del reposo con a = 2 m/s². ¿Qué velocidad lleva y cuánto ha recorrido a los 5 s?', 'A motorbike starts from rest with a = 2 m/s². What is its speed, and how far has it gone, after 5 s?', 'Una moto surt del repòs amb a = 2 m/s². Quina velocitat porta i quant ha recorregut als 5 s?'),
      s: T('v = 0 + 2 · 5 = 10 m/s. x = ½ · 2 · 5² = 25 m.', 'v = 0 + 2 × 5 = 10 m/s. x = ½ × 2 × 5² = 25 m.', 'v = 0 + 2 · 5 = 10 m/s. x = ½ · 2 · 5² = 25 m.') },
    { e: T('Un coche a 20 m/s frena y se para en 4 s. ¿Cuál es su aceleración y cuántos metros recorre frenando?', 'A car at 20 m/s brakes and stops in 4 s. What is its acceleration and how far does it travel while braking?', 'Un cotxe a 20 m/s frena i s’atura en 4 s. Quina és la seva acceleració i quants metres recorre frenant?'),
      s: T('a = (0 − 20) ÷ 4 = −5 m/s². x = 20 · 4 + ½ · (−5) · 4² = 80 − 40 = 40 m.', 'a = (0 − 20) ÷ 4 = −5 m/s². x = 20 × 4 + ½ × (−5) × 4² = 80 − 40 = 40 m.', 'a = (0 − 20) ÷ 4 = −5 m/s². x = 20 · 4 + ½ · (−5) · 4² = 80 − 40 = 40 m.') },
    { e: T('Se deja caer una piedra desde el reposo. ¿Qué velocidad lleva y cuánto ha caído a los 3 s? (g = 9,8 m/s², sin aire)', 'A stone is dropped from rest. What is its speed, and how far has it fallen, after 3 s? (g = 9.8 m/s², no air)', 'Es deixa caure una pedra des del repòs. Quina velocitat porta i quant ha caigut als 3 s? (g = 9,8 m/s², sense aire)'),
      s: T('v = 9,8 · 3 = 29,4 m/s. h = ½ · 9,8 · 3² = 44,1 m.', 'v = 9.8 × 3 = 29.4 m/s. h = ½ × 9.8 × 3² = 44.1 m.', 'v = 9,8 · 3 = 29,4 m/s. h = ½ · 9,8 · 3² = 44,1 m.') },
    { e: T('Caminas 300 m hacia el norte y luego 100 m hacia el sur. ¿Distancia recorrida y desplazamiento?', 'You walk 300 m north and then 100 m south. Distance travelled and displacement?', 'Camines 300 m cap al nord i després 100 m cap al sud. Distància recorreguda i desplaçament?'),
      s: T('Distancia: 300 + 100 = 400 m. Desplazamiento: 300 − 100 = 200 m hacia el norte.', 'Distance: 300 + 100 = 400 m. Displacement: 300 − 100 = 200 m north.', 'Distància: 300 + 100 = 400 m. Desplaçament: 300 − 100 = 200 m cap al nord.') },
    { e: T('En una gráfica x-t, un móvil pasa de x = 10 m a x = 40 m en 6 s en línea recta. ¿Qué velocidad lleva?', 'On an x-t graph, an object goes from x = 10 m to x = 40 m in 6 s along a straight line. What is its velocity?', 'En una gràfica x-t, un mòbil passa de x = 10 m a x = 40 m en 6 s en línia recta. Quina velocitat porta?'),
      s: T('Es la pendiente: v = (40 − 10) ÷ 6 = 5 m/s.', 'It is the gradient: v = (40 − 10) ÷ 6 = 5 m/s.', 'És el pendent: v = (40 − 10) ÷ 6 = 5 m/s.') },
  ],
}

// ── GEOGRAFÍA ─────────────────────────────────────────────────────────────

// Fila país–capital: nombres {es, en, ca}; si un valor es string, vale igual
// en los tres idiomas.
const P = (pais, capital) => [pais, capital]
const N = (es, en = es, ca = es) => ({ es, en, ca })
const tablaPaises = filas => ({
  columnas: L(['País', 'Capital'], ['Country', 'Capital'], ['País', 'Capital']),
  filas,
})

const asia = {
  metaTitle: L('Asia: países y capitales por regiones, relieve y ríos (con tabla) — resumen y ejercicios', 'Asia: countries and capitals by region, relief and rivers (with table) — summary and practice questions', 'Àsia: països i capitals per regions, relleu i rius (amb taula) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Asia Oriental y Sudeste asiático: países y capitales', 'East and Southeast Asia: countries and capitals', 'Àsia Oriental i Sud-est asiàtic: països i capitals'),
      tabla: tablaPaises([
        P(N('China', 'China', 'Xina'), N('Pekín', 'Beijing', 'Pequín')),
        P(N('Japón', 'Japan', 'Japó'), N('Tokio', 'Tokyo', 'Tòquio')),
        P(N('Corea del Sur', 'South Korea', 'Corea del Sud'), N('Seúl', 'Seoul', 'Seül')),
        P(N('Corea del Norte', 'North Korea', 'Corea del Nord'), N('Pionyang', 'Pyongyang', 'Pyongyang')),
        P(N('Mongolia', 'Mongolia', 'Mongòlia'), N('Ulán Bator', 'Ulaanbaatar', 'Ulan Bator')),
        P(N('Vietnam'), N('Hanói', 'Hanoi', 'Hanoi')),
        P(N('Laos'), N('Vientián', 'Vientiane', 'Vientiane')),
        P(N('Camboya', 'Cambodia', 'Cambodja'), N('Nom Pen', 'Phnom Penh', 'Phnom Penh')),
        P(N('Tailandia', 'Thailand', 'Tailàndia'), 'Bangkok'),
        P(N('Birmania (Myanmar)', 'Myanmar (Burma)', 'Birmània (Myanmar)'), N('Naipyidó', 'Naypyidaw', 'Naypyidaw')),
        P(N('Malasia', 'Malaysia', 'Malàisia'), 'Kuala Lumpur'),
        P(N('Singapur', 'Singapore', 'Singapur'), N('Singapur', 'Singapore', 'Singapur')),
        P(N('Indonesia', 'Indonesia', 'Indonèsia'), N('Yakarta', 'Jakarta', 'Jakarta')),
        P(N('Filipinas', 'Philippines', 'Filipines'), 'Manila'),
        P(N('Brunéi', 'Brunei', 'Brunei'), 'Bandar Seri Begawan'),
        P(N('Timor Oriental', 'East Timor', 'Timor Oriental'), 'Dili'),
      ]),
    },
    {
      titulo: L('Asia del Sur y Asia Central: países y capitales', 'South and Central Asia: countries and capitals', 'Àsia del Sud i Àsia Central: països i capitals'),
      tabla: tablaPaises([
        P(N('India', 'India', 'Índia'), N('Nueva Delhi', 'New Delhi', 'Nova Delhi')),
        P(N('Pakistán', 'Pakistan', 'Pakistan'), 'Islamabad'),
        P(N('Bangladés', 'Bangladesh', 'Bangladesh'), N('Daca', 'Dhaka', 'Dhaka')),
        P(N('Sri Lanka'), 'Sri Jayawardenepura Kotte'),
        P(N('Nepal'), N('Katmandú', 'Kathmandu', 'Katmandú')),
        P(N('Bután', 'Bhutan', 'Bhutan'), N('Timbu', 'Thimphu', 'Thimphu')),
        P(N('Maldivas', 'Maldives', 'Maldives'), 'Malé'),
        P(N('Afganistán', 'Afghanistan', 'Afganistan'), 'Kabul'),
        P(N('Kazajistán', 'Kazakhstan', 'Kazakhstan'), N('Astaná', 'Astana', 'Astanà')),
        P(N('Uzbekistán', 'Uzbekistan', 'Uzbekistan'), N('Taskent', 'Tashkent', 'Taixkent')),
        P(N('Turkmenistán', 'Turkmenistan', 'Turkmenistan'), N('Asjabad', 'Ashgabat', 'Aixkhabad')),
        P(N('Tayikistán', 'Tajikistan', 'Tadjikistan'), N('Dusambé', 'Dushanbe', 'Duixanbe')),
        P(N('Kirguistán', 'Kyrgyzstan', 'Kirguizistan'), N('Biskek', 'Bishkek', 'Bixkek')),
      ]),
    },
    {
      titulo: L('Oriente Próximo y el Cáucaso: países y capitales', 'The Middle East and the Caucasus: countries and capitals', 'Pròxim Orient i el Caucas: països i capitals'),
      tabla: tablaPaises([
        P(N('Turquía', 'Turkey', 'Turquia'), 'Ankara'),
        P(N('Siria', 'Syria', 'Síria'), N('Damasco', 'Damascus', 'Damasc')),
        P(N('Líbano', 'Lebanon', 'Líban'), 'Beirut'),
        P(N('Israel'), N('Jerusalén (casi todas las embajadas están en Tel Aviv)', 'Jerusalem (most embassies are in Tel Aviv)', 'Jerusalem (gairebé totes les ambaixades són a Tel Aviv)')),
        P(N('Jordania', 'Jordan', 'Jordània'), N('Amán', 'Amman', 'Amman')),
        P(N('Irak', 'Iraq', 'Iraq'), N('Bagdad', 'Baghdad', 'Bagdad')),
        P(N('Irán', 'Iran', 'Iran'), N('Teherán', 'Tehran', 'Teheran')),
        P(N('Arabia Saudí', 'Saudi Arabia', 'Aràbia Saudita'), N('Riad', 'Riyadh', 'Riad')),
        P(N('Kuwait'), N('Kuwait', 'Kuwait City', 'Kuwait')),
        P(N('Baréin', 'Bahrain', 'Bahrain'), 'Manama'),
        P(N('Catar', 'Qatar', 'Qatar'), 'Doha'),
        P(N('Emiratos Árabes Unidos', 'United Arab Emirates', 'Emirats Àrabs Units'), N('Abu Dabi', 'Abu Dhabi', 'Abu Dhabi')),
        P(N('Omán', 'Oman', 'Oman'), N('Mascate', 'Muscat', 'Mascat')),
        P(N('Yemen', 'Yemen', 'Iemen'), N('Saná', 'Sanaa', 'Sanaa')),
        P(N('Georgia', 'Georgia', 'Geòrgia'), N('Tiflis', 'Tbilisi', 'Tbilissi')),
        P(N('Armenia', 'Armenia', 'Armènia'), N('Ereván', 'Yerevan', 'Erevan')),
        P(N('Azerbaiyán', 'Azerbaijan', 'Azerbaidjan'), N('Bakú', 'Baku', 'Bakú')),
      ]),
      lista: L(
        ['Rusia y Turquía son transcontinentales: tienen territorio en Europa y en Asia. Rusia se cuenta como país europeo (su capital, Moscú, está en Europa), aunque la mayor parte de su superficie, Siberia, es asiática.'],
        ['Russia and Turkey are transcontinental: they have land in both Europe and Asia. Russia is counted as a European country (its capital, Moscow, is in Europe), although most of its area, Siberia, is Asian.'],
        ['Rússia i Turquia són transcontinentals: tenen territori a Europa i a Àsia. Rússia es compta com a país europeu (la capital, Moscou, és a Europa), tot i que la major part de la superfície, Sibèria, és asiàtica.'],
      ),
    },
    {
      titulo: L('Los récords del relieve de Asia', 'Asia’s record-breaking landscape', 'Els rècords del relleu d’Àsia'),
      tabla: {
        columnas: L(['Récord', 'Dónde', 'Dato'], ['Record', 'Where', 'Fact'], ['Rècord', 'On', 'Dada']),
        filas: [
          [L('Montaña más alta del mundo', 'Highest mountain in the world', 'Muntanya més alta del món'), L('Everest (Himalaya, entre Nepal y China)', 'Everest (Himalayas, between Nepal and China)', 'Everest (Himàlaia, entre el Nepal i la Xina)'), '8.849 m'],
          [L('Punto más bajo de tierra firme', 'Lowest point on dry land', 'Punt més baix de terra ferma'), L('Orillas del mar Muerto', 'Shores of the Dead Sea', 'Vores del mar Mort'), L('unos 430 m bajo el nivel del mar', 'about 430 m below sea level', 'uns 430 m sota el nivell del mar')],
          [L('Río más largo de Asia', 'Longest river in Asia', 'Riu més llarg d’Àsia'), L('Yangtsé (China)', 'Yangtze (China)', 'Iang-tsé (Xina)'), L('unos 6.300 km', 'about 6,300 km', 'uns 6.300 km')],
          [L('Lago más grande del mundo', 'Largest lake in the world', 'Llac més gran del món'), L('Mar Caspio', 'Caspian Sea', 'Mar Càspia'), L('es un lago, aunque se llame mar', 'it is a lake, despite its name', 'és un llac, encara que es digui mar')],
          [L('Lago más profundo', 'Deepest lake', 'Llac més profund'), L('Baikal (Siberia, Rusia)', 'Baikal (Siberia, Russia)', 'Baikal (Sibèria, Rússia)'), L('más de 1.600 m', 'over 1,600 m', 'més de 1.600 m')],
          [L('Países más poblados', 'Most populous countries', 'Països més poblats'), L('India y China', 'India and China', 'Índia i Xina'), L('más de 1.400 millones cada uno', 'over 1.4 billion each', 'més de 1.400 milions cadascun')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cuántos países tiene Asia?', 'How many countries are there in Asia?', 'Quants països té Àsia?'),
      r: T('Unos 48, según cómo se cuenten Rusia y Turquía (transcontinentales) y territorios como Taiwán o Palestina, que no son miembros de pleno derecho de la ONU.', 'About 48, depending on how Russia and Turkey (transcontinental) and territories such as Taiwan or Palestine, which are not full UN members, are counted.', 'Uns 48, segons com es comptin Rússia i Turquia (transcontinentals) i territoris com Taiwan o Palestina, que no són membres de ple dret de l’ONU.') },
    { p: T('¿Qué separa Asia de Europa?', 'What separates Asia from Europe?', 'Què separa Àsia d’Europa?'),
      r: T('No hay mar entre ellas: la frontera se traza por los montes Urales, el río Ural, el mar Caspio, el Cáucaso y los estrechos del Bósforo y los Dardanelos.', 'There is no sea between them: the border is drawn along the Ural Mountains, the Ural River, the Caspian Sea, the Caucasus and the Bosporus and Dardanelles straits.', 'No hi ha mar entre elles: la frontera es traça pels Urals, el riu Ural, la mar Càspia, el Caucas i els estrets del Bòsfor i els Dardanels.') },
    { p: T('¿Cuáles son las regiones de Asia?', 'What are the regions of Asia?', 'Quines són les regions d’Àsia?'),
      r: T('Asia Oriental (China, Japón, Corea), el Sudeste asiático (Vietnam, Tailandia, Indonesia), Asia del Sur (India, Pakistán), Asia Central (los países terminados en -stán), Oriente Próximo (Turquía, Arabia, Irán) y Siberia, la parte asiática de Rusia.', 'East Asia (China, Japan, Korea), Southeast Asia (Vietnam, Thailand, Indonesia), South Asia (India, Pakistan), Central Asia (the countries ending in -stan), the Middle East (Turkey, Arabia, Iran) and Siberia, the Asian part of Russia.', 'Àsia Oriental (Xina, Japó, Corea), el Sud-est asiàtic (Vietnam, Tailàndia, Indonèsia), Àsia del Sud (Índia, Pakistan), Àsia Central (els països acabats en -stan), el Pròxim Orient (Turquia, Aràbia, Iran) i Sibèria, la part asiàtica de Rússia.') },
  ],
  ejercicios: [
    { e: T('¿Cuál es la capital de Kazajistán, el país más grande de Asia Central?', 'What is the capital of Kazakhstan, the largest country in Central Asia?', 'Quina és la capital del Kazakhstan, el país més gran d’Àsia Central?'),
      s: T('Astaná. La antigua capital, y ciudad más grande, es Almatý.', 'Astana. The former capital, and largest city, is Almaty.', 'Astanà. L’antiga capital, i la ciutat més gran, és Almati.') },
    { e: T('Une cada país con su capital: Japón, Corea del Sur, Tailandia, Irán. (Bangkok, Teherán, Tokio, Seúl)', 'Match each country to its capital: Japan, South Korea, Thailand, Iran. (Bangkok, Tehran, Tokyo, Seoul)', 'Uneix cada país amb la seva capital: Japó, Corea del Sud, Tailàndia, Iran. (Bangkok, Teheran, Tòquio, Seül)'),
      s: T('Japón–Tokio, Corea del Sur–Seúl, Tailandia–Bangkok, Irán–Teherán.', 'Japan–Tokyo, South Korea–Seoul, Thailand–Bangkok, Iran–Tehran.', 'Japó–Tòquio, Corea del Sud–Seül, Tailàndia–Bangkok, Iran–Teheran.') },
    { e: T('¿Qué cordillera separa la India de China y qué montaña récord está en ella?', 'Which mountain range separates India from China, and which record-breaking mountain is in it?', 'Quina serralada separa l’Índia de la Xina i quina muntanya rècord hi ha?'),
      s: T('El Himalaya, con el Everest (8.849 m), en la frontera entre Nepal y China.', 'The Himalayas, with Everest (8,849 m), on the border between Nepal and China.', 'L’Himàlaia, amb l’Everest (8.849 m), a la frontera entre el Nepal i la Xina.') },
    { e: T('¿Qué tienen en común Uzbekistán, Turkmenistán, Tayikistán y Kirguistán?', 'What do Uzbekistan, Turkmenistan, Tajikistan and Kyrgyzstan have in common?', 'Què tenen en comú l’Uzbekistan, el Turkmenistan, el Tadjikistan i el Kirguizistan?'),
      s: T('Son países de Asia Central, sin salida al mar, que formaron parte de la Unión Soviética hasta 1991. Con Kazajistán son los cinco «-stán» de Asia Central («-stán» significa «tierra de»).', 'They are landlocked Central Asian countries that were part of the Soviet Union until 1991. With Kazakhstan they are the five «-stans» of Central Asia («-stan» means «land of»).', 'Són països d’Àsia Central, sense sortida al mar, que van formar part de la Unió Soviètica fins al 1991. Amb el Kazakhstan són els cinc «-stan» d’Àsia Central («-stan» vol dir «terra de»).') },
    { e: T('¿El mar Caspio es un mar o un lago?', 'Is the Caspian Sea a sea or a lake?', 'La mar Càspia és un mar o un llac?'),
      s: T('Es un lago: está rodeado de tierra por todas partes y no comunica con el océano. Es el lago más grande del mundo.', 'It is a lake: it is surrounded by land on every side and does not connect with the ocean. It is the largest lake in the world.', 'És un llac: està envoltat de terra per tot arreu i no comunica amb l’oceà. És el llac més gran del món.') },
    { e: T('¿Cuál es la capital de la India? ¿Y su ciudad más poblada?', 'What is the capital of India? And its most populous city?', 'Quina és la capital de l’Índia? I la ciutat més poblada?'),
      s: T('La capital es Nueva Delhi; la ciudad más poblada, Bombay (Mumbai), según cómo se cuente el área metropolitana de Delhi.', 'The capital is New Delhi; the most populous city is Mumbai, depending on how the Delhi metropolitan area is counted.', 'La capital és Nova Delhi; la ciutat més poblada, Bombai (Mumbai), segons com es compti l’àrea metropolitana de Delhi.') },
  ],
}

const oceania = {
  metaTitle: L('Oceanía: países y capitales, Australia y las islas del Pacífico (con tabla) — resumen y ejercicios', 'Oceania: countries and capitals, Australia and the Pacific islands (with table) — summary and practice questions', 'Oceania: països i capitals, Austràlia i les illes del Pacífic (amb taula) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los 14 países de Oceanía y sus capitales', 'The 14 countries of Oceania and their capitals', 'Els 14 països d’Oceania i les seves capitals'),
      tabla: {
        columnas: L(['País', 'Capital', 'Región'], ['Country', 'Capital', 'Region'], ['País', 'Capital', 'Regió']),
        filas: [
          [N('Australia', 'Australia', 'Austràlia'), 'Canberra', 'Australasia'],
          [N('Nueva Zelanda', 'New Zealand', 'Nova Zelanda'), 'Wellington', N('Polinesia', 'Polynesia', 'Polinèsia')],
          [N('Papúa Nueva Guinea', 'Papua New Guinea', 'Papua Nova Guinea'), 'Port Moresby', N('Melanesia', 'Melanesia', 'Melanèsia')],
          [N('Fiyi', 'Fiji', 'Fiji'), 'Suva', N('Melanesia', 'Melanesia', 'Melanèsia')],
          [N('Islas Salomón', 'Solomon Islands', 'Illes Salomó'), 'Honiara', N('Melanesia', 'Melanesia', 'Melanèsia')],
          [N('Vanuatu'), 'Port Vila', N('Melanesia', 'Melanesia', 'Melanèsia')],
          [N('Samoa'), 'Apia', N('Polinesia', 'Polynesia', 'Polinèsia')],
          [N('Tonga'), N('Nukualofa', 'Nuku’alofa', 'Nuku’alofa'), N('Polinesia', 'Polynesia', 'Polinèsia')],
          [N('Tuvalu'), 'Funafuti', N('Polinesia', 'Polynesia', 'Polinèsia')],
          [N('Kiribati'), N('Tarawa Sur', 'South Tarawa', 'Tarawa Sud'), N('Micronesia', 'Micronesia', 'Micronèsia')],
          [N('Micronesia (Estados Federados)', 'Micronesia (Federated States)', 'Micronèsia (Estats Federats)'), 'Palikir', N('Micronesia', 'Micronesia', 'Micronèsia')],
          [N('Islas Marshall', 'Marshall Islands', 'Illes Marshall'), 'Majuro', N('Micronesia', 'Micronesia', 'Micronèsia')],
          [N('Palaos', 'Palau', 'Palau'), 'Ngerulmud', N('Micronesia', 'Micronesia', 'Micronèsia')],
          [N('Nauru'), N('Yaren (sin capital oficial)', 'Yaren (no official capital)', 'Yaren (sense capital oficial)'), N('Micronesia', 'Micronesia', 'Micronèsia')],
        ],
      },
      lista: L(
        ['Melanesia significa «islas negras», Micronesia «islas pequeñas» y Polinesia «muchas islas».', 'La capital de Australia es Canberra, no Sídney ni Melbourne: se construyó a propósito entre las dos para no elegir a ninguna.'],
        ['Melanesia means «black islands», Micronesia «small islands» and Polynesia «many islands».', 'Australia’s capital is Canberra, not Sydney or Melbourne: it was built on purpose between the two so as not to choose either.'],
        ['Melanèsia vol dir «illes negres», Micronèsia «illes petites» i Polinèsia «moltes illes».', 'La capital d’Austràlia és Canberra, no Sydney ni Melbourne: es va construir expressament entre totes dues per no triar-ne cap.'],
      ),
    },
    {
      titulo: L('Relieve, clima y animales', 'Landscape, climate and animals', 'Relleu, clima i animals'),
      tabla: {
        columnas: L(['Qué', 'Dónde', 'Dato'], ['What', 'Where', 'Fact'], ['Què', 'On', 'Dada']),
        filas: [
          [L('Gran Barrera de Coral', 'Great Barrier Reef', 'Gran Barrera de Corall'), L('Noreste de Australia', 'North-east Australia', 'Nord-est d’Austràlia'), L('el mayor arrecife de coral del mundo, más de 2.000 km', 'the largest coral reef in the world, over 2,000 km', 'l’escull de corall més gran del món, més de 2.000 km')],
          [L('Uluru', 'Uluru', 'Uluru'), L('Centro de Australia (outback)', 'Central Australia (the outback)', 'Centre d’Austràlia (outback)'), L('gran monolito de roca roja, sagrado para los aborígenes', 'a huge red rock monolith, sacred to Aboriginal people', 'gran monòlit de roca vermella, sagrat per als aborígens')],
          [L('Río más largo', 'Longest river', 'Riu més llarg'), L('Murray (Australia)', 'Murray (Australia)', 'Murray (Austràlia)'), L('unos 2.500 km', 'about 2,500 km', 'uns 2.500 km')],
          [L('Volcanes y géiseres', 'Volcanoes and geysers', 'Volcans i guèisers'), L('Nueva Zelanda', 'New Zealand', 'Nova Zelanda'), L('está sobre el borde de dos placas tectónicas', 'it lies on the boundary between two tectonic plates', 'és sobre la vora de dues plaques tectòniques')],
          [L('Marsupiales y monotremas', 'Marsupials and monotremes', 'Marsupials i monotremes'), L('Australia', 'Australia', 'Austràlia'), L('canguro y koala (crían en una bolsa); ornitorrinco (mamífero que pone huevos)', 'kangaroo and koala (they raise young in a pouch); platypus (a mammal that lays eggs)', 'cangur i coala (crien en una bossa); ornitorinc (mamífer que pon ous)')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cuántos países hay en Oceanía?', 'How many countries are there in Oceania?', 'Quants països hi ha a Oceania?'),
      r: T('Catorce países independientes. Además hay territorios que dependen de otros países, como la Polinesia Francesa, Nueva Caledonia (Francia), Guam (Estados Unidos) o Hawái, que es un estado de EE. UU.', 'Fourteen independent countries. There are also territories that belong to other countries, such as French Polynesia, New Caledonia (France), Guam (United States) or Hawaii, which is a US state.', 'Catorze països independents. A més hi ha territoris que depenen d’altres països, com la Polinèsia Francesa, Nova Caledònia (França), Guam (Estats Units) o Hawaii, que és un estat dels EUA.') },
    { p: T('¿Australia es un continente o un país?', 'Is Australia a continent or a country?', 'Austràlia és un continent o un país?'),
      r: T('Las dos cosas: es un país y ocupa casi toda la masa de tierra del continente, que en España se llama Oceanía e incluye también las islas del Pacífico.', 'Both: it is a country and it takes up almost all the land of the continent, which in Spain is called Oceania and also includes the Pacific islands.', 'Totes dues coses: és un país i ocupa gairebé tota la massa de terra del continent, que a Espanya s’anomena Oceania i inclou també les illes del Pacífic.') },
  ],
  ejercicios: [
    { e: T('¿Cuál es la capital de Australia?', 'What is the capital of Australia?', 'Quina és la capital d’Austràlia?'),
      s: T('Canberra. Sídney es la ciudad más grande, pero no la capital.', 'Canberra. Sydney is the largest city, but not the capital.', 'Canberra. Sydney és la ciutat més gran, però no la capital.') },
    { e: T('¿En qué región de Oceanía están Fiyi, Samoa y las Islas Marshall?', 'Which region of Oceania are Fiji, Samoa and the Marshall Islands in?', 'A quina regió d’Oceania són Fiji, Samoa i les Illes Marshall?'),
      s: T('Fiyi en Melanesia, Samoa en Polinesia y las Islas Marshall en Micronesia.', 'Fiji in Melanesia, Samoa in Polynesia and the Marshall Islands in Micronesia.', 'Fiji a Melanèsia, Samoa a Polinèsia i les Illes Marshall a Micronèsia.') },
    { e: T('¿Cuál es la capital de Nueva Zelanda?', 'What is the capital of New Zealand?', 'Quina és la capital de Nova Zelanda?'),
      s: T('Wellington, en la Isla Norte. La ciudad más grande es Auckland.', 'Wellington, on the North Island. The largest city is Auckland.', 'Wellington, a l’Illa del Nord. La ciutat més gran és Auckland.') },
    { e: T('¿Por qué Nueva Zelanda tiene volcanes, géiseres y terremotos, y el centro de Australia casi no?', 'Why does New Zealand have volcanoes, geysers and earthquakes, while central Australia has almost none?', 'Per què Nova Zelanda té volcans, guèisers i terratrèmols, i el centre d’Austràlia gairebé no?'),
      s: T('Porque Nueva Zelanda está sobre el límite entre dos placas tectónicas (la del Pacífico y la indoaustraliana) y Australia está en el centro de una placa.', 'Because New Zealand sits on the boundary between two tectonic plates (the Pacific and the Indo-Australian) and Australia is in the middle of a plate.', 'Perquè Nova Zelanda és sobre el límit entre dues plaques tectòniques (la del Pacífic i la indoaustraliana) i Austràlia és al centre d’una placa.') },
    { e: T('¿En qué hemisferio está casi toda Oceanía y en qué estación es Navidad allí?', 'Which hemisphere is almost all of Oceania in, and what season is Christmas there?', 'En quin hemisferi és gairebé tota Oceania i en quina estació és Nadal allà?'),
      s: T('En el hemisferio sur, así que las estaciones van al revés que en España: en Navidad es verano.', 'In the southern hemisphere, so the seasons are the other way round from Europe: Christmas is in summer.', 'A l’hemisferi sud, així que les estacions van al revés que a Espanya: per Nadal és estiu.') },
  ],
}

// Estados de EE. UU.: [es, en, ca, capital, región (N, M, S, O)]
const EST = [
  ['Alabama', 'Alabama', 'Alabama', 'Montgomery', 'S'], ['Alaska', 'Alaska', 'Alaska', 'Juneau', 'O'],
  ['Arizona', 'Arizona', 'Arizona', 'Phoenix', 'O'], ['Arkansas', 'Arkansas', 'Arkansas', 'Little Rock', 'S'],
  ['California', 'California', 'Califòrnia', 'Sacramento', 'O'], ['Carolina del Norte', 'North Carolina', 'Carolina del Nord', 'Raleigh', 'S'],
  ['Carolina del Sur', 'South Carolina', 'Carolina del Sud', 'Columbia', 'S'], ['Colorado', 'Colorado', 'Colorado', 'Denver', 'O'],
  ['Connecticut', 'Connecticut', 'Connecticut', 'Hartford', 'N'], ['Dakota del Norte', 'North Dakota', 'Dakota del Nord', 'Bismarck', 'M'],
  ['Dakota del Sur', 'South Dakota', 'Dakota del Sud', 'Pierre', 'M'], ['Delaware', 'Delaware', 'Delaware', 'Dover', 'S'],
  ['Florida', 'Florida', 'Florida', 'Tallahassee', 'S'], ['Georgia', 'Georgia', 'Geòrgia', 'Atlanta', 'S'],
  ['Hawái', 'Hawaii', 'Hawaii', 'Honolulu', 'O'], ['Idaho', 'Idaho', 'Idaho', 'Boise', 'O'],
  ['Illinois', 'Illinois', 'Illinois', 'Springfield', 'M'], ['Indiana', 'Indiana', 'Indiana', 'Indianápolis', 'M'],
  ['Iowa', 'Iowa', 'Iowa', 'Des Moines', 'M'], ['Kansas', 'Kansas', 'Kansas', 'Topeka', 'M'],
  ['Kentucky', 'Kentucky', 'Kentucky', 'Frankfort', 'S'], ['Luisiana', 'Louisiana', 'Louisiana', 'Baton Rouge', 'S'],
  ['Maine', 'Maine', 'Maine', 'Augusta', 'N'], ['Maryland', 'Maryland', 'Maryland', 'Annapolis', 'S'],
  ['Massachusetts', 'Massachusetts', 'Massachusetts', 'Boston', 'N'], ['Míchigan', 'Michigan', 'Michigan', 'Lansing', 'M'],
  ['Minnesota', 'Minnesota', 'Minnesota', 'Saint Paul', 'M'], ['Misisipi', 'Mississippi', 'Mississipí', 'Jackson', 'S'],
  ['Misuri', 'Missouri', 'Missouri', 'Jefferson City', 'M'], ['Montana', 'Montana', 'Montana', 'Helena', 'O'],
  ['Nebraska', 'Nebraska', 'Nebraska', 'Lincoln', 'M'], ['Nevada', 'Nevada', 'Nevada', 'Carson City', 'O'],
  ['Nueva Hampshire', 'New Hampshire', 'Nou Hampshire', 'Concord', 'N'], ['Nueva Jersey', 'New Jersey', 'Nova Jersey', 'Trenton', 'N'],
  ['Nuevo México', 'New Mexico', 'Nou Mèxic', 'Santa Fe', 'O'], ['Nueva York', 'New York', 'Nova York', 'Albany', 'N'],
  ['Ohio', 'Ohio', 'Ohio', 'Columbus', 'M'], ['Oklahoma', 'Oklahoma', 'Oklahoma', 'Oklahoma City', 'S'],
  ['Oregón', 'Oregon', 'Oregon', 'Salem', 'O'], ['Pensilvania', 'Pennsylvania', 'Pennsilvània', 'Harrisburg', 'N'],
  ['Rhode Island', 'Rhode Island', 'Rhode Island', 'Providence', 'N'], ['Tennessee', 'Tennessee', 'Tennessee', 'Nashville', 'S'],
  ['Texas', 'Texas', 'Texas', 'Austin', 'S'], ['Utah', 'Utah', 'Utah', 'Salt Lake City', 'O'],
  ['Vermont', 'Vermont', 'Vermont', 'Montpelier', 'N'], ['Virginia', 'Virginia', 'Virgínia', 'Richmond', 'S'],
  ['Virginia Occidental', 'West Virginia', 'Virgínia de l’Oest', 'Charleston', 'S'], ['Washington', 'Washington', 'Washington', 'Olympia', 'O'],
  ['Wisconsin', 'Wisconsin', 'Wisconsin', 'Madison', 'M'], ['Wyoming', 'Wyoming', 'Wyoming', 'Cheyenne', 'O'],
]
const REGION_EEUU = {
  N: N('Noreste', 'Northeast', 'Nord-est'),
  M: N('Medio Oeste', 'Midwest', 'Mig Oest'),
  S: N('Sur', 'South', 'Sud'),
  O: N('Oeste', 'West', 'Oest'),
}
export const ESTADOS_EEUU = EST

const eeuu = {
  metaTitle: L('Estados Unidos: los 50 estados y sus capitales (con tabla) — resumen y ejercicios', 'The United States: the 50 states and their capitals (with table) — summary and practice questions', 'Estats Units: els 50 estats i les seves capitals (amb taula) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los 50 estados de Estados Unidos y sus capitales', 'The 50 US states and their capitals', 'Els 50 estats dels Estats Units i les seves capitals'),
      texto: L(
        ['Muchas capitales no son la ciudad más famosa del estado: la de California es Sacramento (no Los Ángeles), la de Nueva York es Albany, la de Texas es Austin y la de Florida, Tallahassee.'],
        ['Many state capitals are not the state’s best-known city: California’s is Sacramento (not Los Angeles), New York’s is Albany, Texas’s is Austin and Florida’s is Tallahassee.'],
        ['Moltes capitals no són la ciutat més famosa de l’estat: la de Califòrnia és Sacramento (no Los Angeles), la de Nova York és Albany, la de Texas és Austin i la de Florida, Tallahassee.'],
      ),
      tabla: {
        columnas: L(['Estado', 'Capital', 'Región'], ['State', 'Capital', 'Region'], ['Estat', 'Capital', 'Regió']),
        filas: EST.map(([es, en, ca, cap, r]) => [N(es, en, ca), cap === 'Indianápolis' ? N('Indianápolis', 'Indianapolis', 'Indianapolis') : cap, REGION_EEUU[r]]),
      },
    },
    {
      titulo: L('Relieve y récords', 'Landscape and records', 'Relleu i rècords'),
      tabla: {
        columnas: L(['Qué', 'Dónde', 'Dato'], ['What', 'Where', 'Fact'], ['Què', 'On', 'Dada']),
        filas: [
          [L('Estado más grande', 'Largest state', 'Estat més gran'), 'Alaska', L('más del doble que Texas', 'more than twice the size of Texas', 'més del doble que Texas')],
          [L('Estado más pequeño', 'Smallest state', 'Estat més petit'), 'Rhode Island', L('menor que la provincia de Gerona', 'smaller than the province of Girona', 'més petit que la província de Girona')],
          [L('Estado más poblado', 'Most populous state', 'Estat més poblat'), N('California', 'California', 'Califòrnia'), L('unos 39 millones de habitantes', 'about 39 million people', 'uns 39 milions d’habitants')],
          [L('Gran río', 'Great river', 'Gran riu'), L('Misisipi-Misuri', 'Mississippi–Missouri', 'Mississipí-Missouri'), L('uno de los sistemas fluviales más largos del mundo', 'one of the longest river systems in the world', 'un dels sistemes fluvials més llargs del món')],
          [L('Cordilleras', 'Mountain ranges', 'Serralades'), L('Montañas Rocosas (oeste) y Apalaches (este)', 'Rocky Mountains (west) and Appalachians (east)', 'Muntanyes Rocoses (oest) i Apalatxes (est)'), L('entre ellas, las Grandes Llanuras', 'between them, the Great Plains', 'entre elles, les Grans Planes')],
          [L('Grandes Lagos', 'Great Lakes', 'Grans Llacs'), L('Frontera con Canadá', 'Border with Canada', 'Frontera amb el Canadà'), L('Superior, Míchigan, Hurón, Erie y Ontario', 'Superior, Michigan, Huron, Erie and Ontario', 'Superior, Michigan, Huron, Erie i Ontario')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cuál es la capital de Estados Unidos?', 'What is the capital of the United States?', 'Quina és la capital dels Estats Units?'),
      r: T('Washington D. C. (Distrito de Columbia), que no pertenece a ningún estado. No hay que confundirlo con el estado de Washington, en la costa del Pacífico, cuya capital es Olympia.', 'Washington, D.C. (District of Columbia), which does not belong to any state. Not to be confused with Washington State, on the Pacific coast, whose capital is Olympia.', 'Washington D. C. (Districte de Colúmbia), que no pertany a cap estat. No s’ha de confondre amb l’estat de Washington, a la costa del Pacífic, que té la capital a Olympia.') },
    { p: T('¿Por qué la bandera tiene 50 estrellas y 13 franjas?', 'Why does the flag have 50 stars and 13 stripes?', 'Per què la bandera té 50 estrelles i 13 franges?'),
      r: T('Cada estrella es un estado; las 13 franjas son las 13 colonias que se independizaron de Gran Bretaña en 1776.', 'Each star is a state; the 13 stripes are the 13 colonies that became independent from Britain in 1776.', 'Cada estrella és un estat; les 13 franges són les 13 colònies que es van independitzar de la Gran Bretanya el 1776.') },
  ],
  ejercicios: [
    { e: T('¿Cuál es la capital de California? ¿Y la de Texas?', 'What is the capital of California? And of Texas?', 'Quina és la capital de Califòrnia? I la de Texas?'),
      s: T('Sacramento y Austin. Los Ángeles y Houston son más grandes, pero no son capitales.', 'Sacramento and Austin. Los Angeles and Houston are bigger, but they are not capitals.', 'Sacramento i Austin. Los Angeles i Houston són més grans, però no són capitals.') },
    { e: T('¿Qué dos estados no limitan con ningún otro estado?', 'Which two states do not border any other state?', 'Quins dos estats no limiten amb cap altre estat?'),
      s: T('Alaska, entre Canadá y el estrecho de Bering, y Hawái, un archipiélago en el Pacífico.', 'Alaska, between Canada and the Bering Strait, and Hawaii, an archipelago in the Pacific.', 'Alaska, entre el Canadà i l’estret de Bering, i Hawaii, un arxipèlag al Pacífic.') },
    { e: T('¿Cuál es la capital del estado de Nueva York?', 'What is the capital of New York State?', 'Quina és la capital de l’estat de Nova York?'),
      s: T('Albany. La ciudad de Nueva York es la más grande del país, pero no es la capital de su estado.', 'Albany. New York City is the largest in the country, but it is not its state’s capital.', 'Albany. La ciutat de Nova York és la més gran del país, però no és la capital del seu estat.') },
    { e: T('Une cada estado con su capital: Florida, Georgia, Massachusetts, Colorado. (Boston, Denver, Tallahassee, Atlanta)', 'Match each state to its capital: Florida, Georgia, Massachusetts, Colorado. (Boston, Denver, Tallahassee, Atlanta)', 'Uneix cada estat amb la seva capital: Florida, Geòrgia, Massachusetts, Colorado. (Boston, Denver, Tallahassee, Atlanta)'),
      s: T('Florida–Tallahassee, Georgia–Atlanta, Massachusetts–Boston, Colorado–Denver.', 'Florida–Tallahassee, Georgia–Atlanta, Massachusetts–Boston, Colorado–Denver.', 'Florida–Tallahassee, Geòrgia–Atlanta, Massachusetts–Boston, Colorado–Denver.') },
    { e: T('¿Qué cordillera recorre el oeste de Estados Unidos y cuál el este?', 'Which mountain range runs through the west of the United States, and which through the east?', 'Quina serralada recorre l’oest dels Estats Units i quina l’est?'),
      s: T('Al oeste, las Montañas Rocosas; al este, los Apalaches, más bajos y antiguos.', 'In the west, the Rocky Mountains; in the east, the Appalachians, which are lower and older.', 'A l’oest, les Muntanyes Rocoses; a l’est, els Apalatxes, més baixos i antics.') },
  ],
}

// ── Ejercicios para los temas de gramática ya ampliados en octubre ───────

const sustantivos = {
  ejercicios: [
    { e: T('Subraya los sustantivos: «El perro de mi vecina ladra con mucha alegría».', 'Underline the nouns: «El perro de mi vecina ladra con mucha alegría».', 'Subratlla els substantius: «El perro de mi vecina ladra con mucha alegría».'),
      s: T('Perro, vecina y alegría.', 'Perro, vecina and alegría.', 'Perro, vecina i alegría.') },
    { e: T('¿Común o propio? Madrid, ciudad, Ebro, río, Lucía.', 'Common or proper? Madrid, ciudad, Ebro, río, Lucía.', 'Comú o propi? Madrid, ciudad, Ebro, río, Lucía.'),
      s: T('Propios (con mayúscula, nombran a uno en concreto): Madrid, Ebro, Lucía. Comunes: ciudad, río.', 'Proper (capitalised, naming one specific thing): Madrid, Ebro, Lucía. Common: ciudad, río.', 'Propis (amb majúscula, anomenen un de concret): Madrid, Ebro, Lucía. Comuns: ciudad, río.') },
    { e: T('¿Concreto o abstracto? mesa, miedo, libertad, manzana.', 'Concrete or abstract? mesa, miedo, libertad, manzana.', 'Concret o abstracte? mesa, miedo, libertad, manzana.'),
      s: T('Concretos (se perciben con los sentidos): mesa, manzana. Abstractos (ideas o sentimientos): miedo, libertad.', 'Concrete (perceived with the senses): mesa, manzana. Abstract (ideas or feelings): miedo, libertad.', 'Concrets (es perceben amb els sentits): mesa, manzana. Abstractes (idees o sentiments): miedo, libertad.') },
    { e: T('¿Qué sustantivos son colectivos? rebaño, oveja, orquesta, músico, enjambre.', 'Which nouns are collective? rebaño, oveja, orquesta, músico, enjambre.', 'Quins substantius són col·lectius? rebaño, oveja, orquesta, músico, enjambre.'),
      s: T('Rebaño, orquesta y enjambre: en singular nombran un grupo (de ovejas, músicos y abejas).', 'Rebaño, orquesta and enjambre: in the singular they name a group (of sheep, musicians and bees).', 'Rebaño, orquesta i enjambre: en singular anomenen un grup (d’ovelles, músics i abelles).') },
    { e: T('Escribe el femenino de: actor, gallo, el periodista.', 'Write the feminine of: actor, gallo, el periodista.', 'Escriu el femení de: actor, gallo, el periodista.'),
      s: T('Actriz, gallina y la periodista (solo cambia el artículo).', 'Actriz, gallina and la periodista (only the article changes).', 'Actriz, gallina i la periodista (només canvia l’article).') },
  ],
}

const adverbios = {
  ejercicios: [
    { e: T('Subraya los adverbios: «Mañana llegaremos muy temprano, seguramente».', 'Underline the adverbs: «Mañana llegaremos muy temprano, seguramente».', 'Subratlla els adverbis: «Mañana llegaremos muy temprano, seguramente».'),
      s: T('Mañana (tiempo), muy (cantidad), temprano (tiempo) y seguramente (duda o probabilidad).', 'Mañana (time), muy (quantity), temprano (time) and seguramente (doubt or probability).', 'Mañana (temps), muy (quantitat), temprano (temps) i seguramente (dubte o probabilitat).') },
    { e: T('Di de qué tipo es cada adverbio: aquí, ayer, despacio, no, quizás, bastante.', 'Say what type each adverb is: aquí, ayer, despacio, no, quizás, bastante.', 'Digues de quin tipus és cada adverbi: aquí, ayer, despacio, no, quizás, bastante.'),
      s: T('Aquí: lugar. Ayer: tiempo. Despacio: modo. No: negación. Quizás: duda. Bastante: cantidad.', 'Aquí: place. Ayer: time. Despacio: manner. No: negation. Quizás: doubt. Bastante: quantity.', 'Aquí: lloc. Ayer: temps. Despacio: manera. No: negació. Quizás: dubte. Bastante: quantitat.') },
    { e: T('Forma adverbios en -mente a partir de: rápido, fácil, tranquilo.', 'Form -mente adverbs from: rápido, fácil, tranquilo.', 'Forma adverbis en -mente a partir de: rápido, fácil, tranquilo.'),
      s: T('Rápidamente, fácilmente y tranquilamente: se añade -mente al femenino del adjetivo y se conserva su tilde.', 'Rápidamente, fácilmente and tranquilamente: -mente is added to the feminine form of the adjective, which keeps its accent.', 'Rápidamente, fácilmente i tranquilamente: s’afegeix -mente al femení de l’adjectiu i se’n conserva l’accent.') },
    { e: T('¿Adverbio o adjetivo? «Habla claro» y «Un cielo claro».', 'Adverb or adjective? «Habla claro» and «Un cielo claro».', 'Adverbi o adjectiu? «Habla claro» i «Un cielo claro».'),
      s: T('En «Habla claro» es adverbio (modifica al verbo y no varía). En «Un cielo claro» es adjetivo (acompaña al sustantivo: una noche clara).', 'In «Habla claro» it is an adverb (it modifies the verb and does not change). In «Un cielo claro» it is an adjective (it goes with the noun: una noche clara).', 'A «Habla claro» és adverbi (modifica el verb i no varia). A «Un cielo claro» és adjectiu (acompanya el substantiu: una noche clara).') },
    { e: T('Corrige: «Se sentó detrás mío».', 'Correct: «Se sentó detrás mío».', 'Corregeix: «Se sentó detrás mío».'),
      s: T('«Se sentó detrás de mí». Con detrás, delante, encima o cerca se usa de + pronombre, no el posesivo.', '«Se sentó detrás de mí». With detrás, delante, encima or cerca you use de + pronoun, not the possessive.', '«Se sentó detrás de mí». Amb detrás, delante, encima o cerca es fa servir de + pronom, no el possessiu.') },
  ],
}

const determinantes = {
  ejercicios: [
    { e: T('Subraya los determinantes: «Aquellos dos niños perdieron su pelota en el parque».', 'Underline the determiners: «Aquellos dos niños perdieron su pelota en el parque».', 'Subratlla els determinants: «Aquellos dos niños perdieron su pelota en el parque».'),
      s: T('Aquellos (demostrativo), dos (numeral), su (posesivo) y el (artículo, dentro de «en el parque»).', 'Aquellos (demonstrative), dos (numeral), su (possessive) and el (article, in «en el parque»).', 'Aquellos (demostratiu), dos (numeral), su (possessiu) i el (article, dins d’«en el parque»).') },
    { e: T('Di de qué tipo es cada determinante: «el», «mis», «esa», «algunos», «tercer», «¿qué?».', 'Say what type each determiner is: «el», «mis», «esa», «algunos», «tercer», «¿qué?».', 'Digues de quin tipus és cada determinant: «el», «mis», «esa», «algunos», «tercer», «¿qué?».'),
      s: T('El: artículo. Mis: posesivo. Esa: demostrativo. Algunos: indefinido. Tercer: numeral ordinal. ¿Qué?: interrogativo (¿qué libro?).', 'El: article. Mis: possessive. Esa: demonstrative. Algunos: indefinite. Tercer: ordinal numeral. ¿Qué?: interrogative (¿qué libro?).', 'El: article. Mis: possessiu. Esa: demostratiu. Algunos: indefinit. Tercer: numeral ordinal. ¿Qué?: interrogatiu (¿qué libro?).') },
    { e: T('¿Determinante o pronombre? «Mi bici es roja; la tuya, azul».', 'Determiner or pronoun? «Mi bici es roja; la tuya, azul».', 'Determinant o pronom? «Mi bici es roja; la tuya, azul».'),
      s: T('Mi es determinante (acompaña a «bici»); la tuya es pronombre (sustituye a «tu bici»).', 'Mi is a determiner (it goes with «bici»); la tuya is a pronoun (it replaces «tu bici»).', 'Mi és determinant (acompanya «bici»); la tuya és pronom (substitueix «tu bici»).') },
    { e: T('¿Por qué se dice «el agua» pero «las aguas» y «esta agua»?', 'Why do we say «el agua» but «las aguas» and «esta agua»?', 'Per què es diu «el agua» però «las aguas» i «esta agua»?'),
      s: T('Agua es femenino. Delante de un sustantivo femenino que empieza por a- o ha- tónica, el artículo la pasa a el solo en singular («el agua», «el águila»); los demás determinantes siguen en femenino.', 'Agua is feminine. Before a feminine noun starting with a stressed a- or ha-, the article la becomes el only in the singular («el agua», «el águila»); the other determiners stay feminine.', 'Agua és femení. Davant d’un substantiu femení que comença per a- o ha- tònica, l’article la passa a el només en singular («el agua», «el águila»); els altres determinants continuen en femení.') },
    { e: T('Completa con la forma correcta: «Vivo en el ___ piso» (primero) y «Es el ___ día» (tercero).', 'Fill in the right form: «Vivo en el ___ piso» (primero) and «Es el ___ día» (tercero).', 'Completa amb la forma correcta: «Vivo en el ___ piso» (primero) i «Es el ___ día» (tercero).'),
      s: T('«Vivo en el primer piso» y «Es el tercer día»: delante de un sustantivo masculino singular se acortan.', '«Vivo en el primer piso» and «Es el tercer día»: before a masculine singular noun they are shortened.', '«Vivo en el primer piso» i «Es el tercer día»: davant d’un substantiu masculí singular s’escurcen.') },
  ],
}

export const AMPLIACION = { pronombres, morfologia, adjetivos, nexos, verbos, disoluciones, movimiento, asia, oceania, eeuu, sustantivos, adverbios, determinantes }
