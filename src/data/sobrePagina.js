// Texto propio para portadas de materia y juegos que servían al buscador poco
// más que una lista de botones (memoria «adsense-contenido-poco-valor»). Lo
// pinta SobreExamenAuto al final de la página según la URL (sin prefijo de
// idioma), con el título de bloque de cada entrada.
const T = (es, en, ca) => ({ es, en, ca })

export const SOBRE_PAGINA = {
  '/estudiar/idiomas': {
    titulo: T('Idiomas en Tuthor', 'Languages on Tuthor', 'Idiomes a Tuthor'),
    parrafos: [
      T('Aquí están el castellano y el inglés tal y como se estudian en Primaria y ESO: gramática por temas, ortografía, literatura y textos en Español; tiempos verbales, la pasiva, el orden de la frase y la ortografía en English. Cada tema tiene su examen tipo test con explicación y, muchos, un juego con la misma materia.',
        'Here are Spanish and English as they are studied at primary and secondary school: grammar by topic, spelling, literature and text types in Spanish; tenses, the passive, word order and spelling in English. Each topic has its multiple-choice exam with explanations and many have a game on the same content.',
        'Aquí hi ha el castellà i l’anglès tal com s’estudien a Primària i ESO: gramàtica per temes, ortografia, literatura i textos en Castellà; temps verbals, la passiva, l’ordre de la frase i l’ortografia en English. Cada tema té el seu examen tipus test amb explicació i, molts, un joc amb la mateixa matèria.'),
    ],
  },
  '/estudiar/idiomas/espanol': {
    titulo: T('Qué hay en Español', 'What is in Spanish', 'Què hi ha a Castellà'),
    parrafos: [
      T('Cinco bloques del temario de Lengua castellana. Gramática: las clases de palabras, el género y el número y la sintaxis de la oración. Ortografía: tildes, b y v, g y j y puntuación. Literatura: géneros, autores y métrica. Los textos: tipologías, funciones del lenguaje, coherencia y cohesión. Y las figuras literarias, para reconocerlas en versos y frases.',
        'Five blocks of the Spanish language syllabus. Grammar: word classes, gender and number, and sentence syntax. Spelling: accents, b and v, g and j, and punctuation. Literature: genres, authors and metre. Text types: genres, language functions, coherence and cohesion. And figures of speech, to recognise them in verse and prose.',
        'Cinc blocs del temari de Llengua castellana. Gramàtica: les classes de paraules, el gènere i el nombre i la sintaxi de l’oració. Ortografia: accents, b i v, g i j i puntuació. Literatura: gèneres, autors i mètrica. Els textos: tipologies, funcions del llenguatge, coherència i cohesió. I les figures literàries, per reconèixer-les en versos i frases.'),
      T('Los ejemplos y las palabras que se analizan están siempre en castellano, también si lees la web en inglés o en catalán: lo que se estudia es el español, y traducirlo cambiaría la respuesta.',
        'The examples and the words being analysed are always in Spanish, even if you read the site in English or Catalan: what you are studying is Spanish, and translating it would change the answer.',
        'Els exemples i les paraules que s’analitzen són sempre en castellà, també si llegeixes el web en anglès o en català: el que s’estudia és el castellà, i traduir-lo canviaria la resposta.'),
    ],
  },
  '/estudiar/idiomas/espanol/gramatica': {
    titulo: T('Cómo se estudia la gramática aquí', 'How grammar is studied here', 'Com s’estudia la gramàtica aquí'),
    parrafos: [
      T('Cada tema tiene una página con la teoría breve y dos formas de examinarse: un test de opción múltiple y otra en la que se señala la palabra sobre una frase real, que es como se pregunta en clase. Se empieza por las clases de palabras —sustantivo, adjetivo, determinante, pronombre, verbo, adverbio y nexos— y se termina en la sintaxis de la oración: sujeto, predicado y complementos.',
        'Each topic has a page with brief theory and two ways to be tested: a multiple-choice quiz and another where you point to the word in a real sentence, which is how it is asked in class. It starts with word classes — noun, adjective, determiner, pronoun, verb, adverb and connectors — and ends with sentence syntax: subject, predicate and complements.',
        'Cada tema té una pàgina amb la teoria breu i dues maneres d’examinar-se: un test d’opció múltiple i una altra en què s’assenyala la paraula sobre una frase real, que és com es pregunta a classe. Es comença per les classes de paraules —substantiu, adjectiu, determinant, pronom, verb, adverbi i nexes— i s’acaba a la sintaxi de l’oració: subjecte, predicat i complements.'),
    ],
  },
  '/estudiar/idiomas/espanol/ortografia': {
    titulo: T('Ortografía para practicar de verdad', 'Spelling you actually practise', 'Ortografia per practicar de debò'),
    parrafos: [
      T('Cuatro temas con examen propio —acentuación, b y v, g y j, y puntuación— y dos juegos para aplicarlos. En Pon la Tilde se decide primero si la palabra lleva tilde y después dónde. En Corrige el Texto hay que encontrar las faltas escondidas en un texto sin que nadie diga dónde están, que es lo más parecido a repasar un examen propio.',
        'Four topics with their own exam — accents, b and v, g and j, and punctuation — and two games to apply them. In Pon la Tilde you first decide whether the word takes an accent and then where. In Corrige el Texto you find the mistakes hidden in a text without being told where they are, which is the closest thing to checking your own exam.',
        'Quatre temes amb examen propi —accentuació, b i v, g i j, i puntuació— i dos jocs per aplicar-los. A Pon la Tilde es decideix primer si la paraula porta accent i després on. A Corrige el Texto cal trobar les faltes amagades en un text sense que ningú digui on són, que és el més semblant a repassar un examen propi.'),
    ],
  },
  '/estudiar/idiomas/ingles': {
    titulo: T('Inglés en Tuthor', 'English on Tuthor', 'Anglès a Tuthor'),
    parrafos: [
      T('Tres bloques: la gramática (los tiempos verbales, los artículos, la pasiva y las clases de palabras), el orden de las palabras en la frase, que se practica ordenándola jugando, y la ortografía, buscando las faltas de un texto en inglés. Los enunciados están en tu idioma y el material, en inglés.',
        'Three blocks: grammar (tenses, articles, the passive and word classes), word order, practised by putting sentences in order as a game, and spelling, by finding the mistakes in an English text. Instructions are in your language and the material is in English.',
        'Tres blocs: la gramàtica (els temps verbals, els articles, la passiva i les classes de paraules), l’ordre de les paraules a la frase, que es practica ordenant-la jugant, i l’ortografia, buscant les faltes d’un text en anglès. Els enunciats són en el teu idioma i el material, en anglès.'),
    ],
  },
  '/estudiar/idiomas/ingles/grammar': {
    titulo: T('La gramática inglesa, tema a tema', 'English grammar, topic by topic', 'La gramàtica anglesa, tema a tema'),
    parrafos: [
      T('Cinco temas de gramática —Present Simple, Past Simple, Present Perfect, los artículos y la pasiva— se pueden examinar tipo test o montando la frase con piezas, y La Pieza que Falta los mezcla todos a contrarreloj. Además, las seis clases de palabras (nouns, verbs, adjectives, adverbs, pronouns y connectors) tienen examen propio.',
        'Five grammar topics — Present Simple, Past Simple, Present Perfect, articles and the passive — can be tested as a quiz or by building the sentence from pieces, and La Pieza que Falta mixes them all against the clock. The six word classes (nouns, verbs, adjectives, adverbs, pronouns and connectors) also have their own exams.',
        'Cinc temes de gramàtica —Present Simple, Past Simple, Present Perfect, els articles i la passiva— es poden examinar tipus test o muntant la frase amb peces, i La Pieza que Falta els barreja tots a contrarellotge. A més, les sis classes de paraules (nouns, verbs, adjectives, adverbs, pronouns i connectors) tenen examen propi.'),
    ],
  },
  '/estudiar/musica': {
    titulo: T('Lenguaje musical', 'Music theory', 'Llenguatge musical'),
    parrafos: [
      T('Tres temas de la asignatura de Música. Notas: leer el pentagrama y tocar cada nota en un piano en pantalla, o en uno de verdad conectado por MIDI. Ritmo: figuras y silencios, compases simples y compuestos, puntillo, ligadura y síncopa. Instrumentos: las familias de la orquesta, cómo produce el sonido cada una y la clasificación de Hornbostel-Sachs.',
        'Three topics from the Music syllabus. Notes: reading the staff and playing each note on an on-screen piano, or a real one connected via MIDI. Rhythm: note values and rests, simple and compound time, dots, ties and syncopation. Instruments: the families of the orchestra, how each produces sound and the Hornbostel-Sachs classification.',
        'Tres temes de l’assignatura de Música. Notes: llegir el pentagrama i tocar cada nota en un piano a la pantalla, o en un de real connectat per MIDI. Ritme: figures i silencis, compassos simples i compostos, punt, lligadura i síncopa. Instruments: les famílies de l’orquestra, com produeix el so cadascuna i la classificació de Hornbostel-Sachs.'),
    ],
  },
  '/estudiar/economia': {
    titulo: T('Economía para la vida y para el instituto', 'Economics for life and for school', 'Economia per a la vida i per a l’institut'),
    parrafos: [
      T('Tres temas. Finanzas personales: la inflación, el interés compuesto, las deudas y cómo detectar una estafa, lo que cualquiera necesita antes de su primer sueldo. El mercado: oferta, demanda, equilibrio y por qué suben o bajan los precios, de 4.º de ESO y Bachillerato. Y el punto de equilibrio de una empresa, el cálculo clásico de Economía de la Empresa de 2.º de Bachillerato.',
        'Three topics. Personal finance: inflation, compound interest, debt and how to spot a scam, which everyone needs before their first pay cheque. The market: supply, demand, equilibrium and why prices go up or down. And a company’s break-even point, the classic Business Economics calculation.',
        'Tres temes. Finances personals: la inflació, l’interès compost, els deutes i com detectar una estafa, el que qualsevol necessita abans del primer sou. El mercat: oferta, demanda, equilibri i per què pugen o baixen els preus, de 4t d’ESO i Batxillerat. I el punt d’equilibri d’una empresa, el càlcul clàssic d’Economia de l’Empresa de 2n de Batxillerat.'),
    ],
  },
  '/juegos/portadas': {
    titulo: T('Cómo se juega', 'How to play', 'Com es juga'),
    parrafos: [
      T('Sale la portada de un periódico del día de un acontecimiento histórico —la llegada a la Luna, el descubrimiento del ADN, el final de una guerra— y hay que decidir si el titular es verdadero o si tiene un error escondido en la fecha, el lugar, la persona o el hecho. Después de cada respuesta se explica qué pasó de verdad.',
        'A newspaper front page from the day of a historic event appears — the Moon landing, the discovery of DNA, the end of a war — and you decide whether the headline is true or hides an error in the date, place, person or event. After each answer, what really happened is explained.',
        'Surt la portada d’un diari del dia d’un fet històric —l’arribada a la Lluna, el descobriment de l’ADN, la fi d’una guerra— i cal decidir si el titular és vertader o si té un error amagat a la data, el lloc, la persona o el fet. Després de cada resposta s’explica què va passar de debò.'),
      T('Se juega contra el reloj: acertar suma segundos y fallar los resta. En fácil se empieza con 60 segundos, en medio con 30 y en difícil con 20, y cada acierto da más puntos cuanto más alto es el nivel.',
        'You play against the clock: right answers add seconds and wrong ones take them away. On easy you start with 60 seconds, on medium with 30 and on hard with 20, and each correct answer scores more the higher the level.',
        'Es juga contra rellotge: encertar suma segons i fallar en resta. En fàcil es comença amb 60 segons, en mitjà amb 30 i en difícil amb 20, i cada encert dona més punts com més alt és el nivell.'),
    ],
  },
  '/juegos/pentagrama-path': {
    titulo: T('Cómo se juega', 'How to play', 'Com es juga'),
    parrafos: [
      T('Una partitura que no se acaba: las notas van apareciendo en el pentagrama y hay que tocarlas en el piano a tiempo. Cada nota se juzga dos veces, si la tecla es la buena y si llega en su momento, y solo la nota perfecta en las dos cosas evita perder una vida.',
        'A score that never ends: notes keep appearing on the staff and you play them on the piano in time. Each note is judged twice, for the right key and for arriving on time, and only a note that is perfect on both saves you from losing a life.',
        'Una partitura que no s’acaba: les notes van apareixent al pentagrama i cal tocar-les al piano a temps. Cada nota es jutja dues vegades, si la tecla és la bona i si arriba al seu moment, i només la nota perfecta en les dues coses evita perdre una vida.'),
      T('La dificultad sube sola a medida que avanzas: más tempo, menos margen, ritmos y alteraciones. De vez en cuando se puede elegir un premio, como una vida extra o un tempo más lento. Funciona con el teclado en pantalla o con un piano MIDI conectado (en Chrome o Edge).',
        'The difficulty rises on its own as you go: faster tempo, less margin, rhythms and accidentals. Every so often you can pick a bonus, such as an extra life or a slower tempo. It works with the on-screen keyboard or a connected MIDI piano (in Chrome or Edge).',
        'La dificultat puja sola a mesura que avances: més tempo, menys marge, ritmes i alteracions. De tant en tant es pot triar un premi, com una vida extra o un tempo més lent. Funciona amb el teclat a la pantalla o amb un piano MIDI connectat (a Chrome o Edge).'),
    ],
  },
}
