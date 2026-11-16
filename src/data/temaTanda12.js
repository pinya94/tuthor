// Duodécima tanda (16-nov-2026): búsquedas del autocompletado sin página
// propia («reported speech exercises», «question tags exercises», «relative
// pronouns exercises», «some any much many», «ecuaciones de segundo grado
// incompletas», «el texto argumentativo 4 eso», «los sentidos del cuerpo
// humano»).
//   reported-speech, question-tags, relative-pronouns, some-any-much-many
//     → INGLES_BASICO (InglesGrammarTema)
//   ecuaciones-de-segundo-grado → MATEMATICAS_TEMA (MatematicasTemaExtra)
//   texto-argumentativo, los-sentidos → ESTUDIO_EXTRA (TemaEstudioExtra)
// En inglés el material (frases de ejemplo) va en inglés en los tres idiomas;
// solo se traduce la prosa (en: British English).
const T = (es, en, ca) => ({ es, en, ca })
const L = T

export const reportedSpeech = {
  metaTitle: L('Reported speech en inglés (estilo indirecto): cambios de tiempo, preguntas y órdenes — resumen y ejercicios', 'Reported speech: tense changes, questions and commands — summary and practice questions', 'Reported speech en anglès (estil indirecte): canvis de temps, preguntes i ordres — resum i exercicis'),
  metaDesc: L('Cómo pasar una frase a reported speech: tabla de cambios de tiempo verbal, de tiempo y lugar, say y tell, preguntas y órdenes, con ejercicios resueltos.', 'How to put a sentence into reported speech: tense changes, time and place words, say and tell, questions and commands, with solved exercises.', 'Com passar una frase a reported speech: taula de canvis de temps verbal, de temps i lloc, say i tell, preguntes i ordres, amb exercicis resolts.'),
  resumen: L(
    ['El reported speech (estilo indirecto) sirve para contar lo que ha dicho otra persona sin repetir sus palabras exactas. «I am tired», said Anna se convierte en Anna said (that) she was tired. Como lo contamos después, el verbo suele dar un paso atrás en el pasado (am → was), y cambian los pronombres y las palabras de tiempo y lugar (today → that day, here → there).', 'Las preguntas pierden la forma de pregunta (He asked me where I lived, no where did I live) y las órdenes se cuentan con tell + to (She told me to sit down). Si lo dicho sigue siendo verdad o el verbo introductor está en presente (He says…), el tiempo puede no cambiar.'],
    ['Reported speech is used to tell someone what another person said without repeating their exact words. «I am tired», said Anna becomes Anna said (that) she was tired. Because we report it later, the verb usually moves one step back into the past (am → was), and pronouns and words for time and place change too (today → that day, here → there).', 'Questions lose their question form (He asked me where I lived, not where did I live) and commands are reported with tell + to (She told me to sit down). If what was said is still true, or the reporting verb is in the present (He says…), the tense does not have to change.'],
    ['El reported speech (estil indirecte) serveix per explicar el que ha dit una altra persona sense repetir-ne les paraules exactes. «I am tired», said Anna es converteix en Anna said (that) she was tired. Com que ho expliquem després, el verb sol fer un pas enrere cap al passat (am → was), i canvien els pronoms i les paraules de temps i lloc (today → that day, here → there).', 'Les preguntes perden la forma de pregunta (He asked me where I lived, no where did I live) i les ordres s’expliquen amb tell + to (She told me to sit down). Si el que s’ha dit continua sent veritat o el verb introductor és en present (He says…), el temps pot no canviar.'],
  ),
  puntosClave: L(
    ['El verbo retrocede un tiempo: present simple → past simple, will → would, can → could.', 'Say + (that): She said that… · Tell + persona: She told me that…', 'Preguntas sí/no: asked if / whether + sujeto + verbo.', 'Preguntas con wh-: asked + where/what… + sujeto + verbo (sin do/did).', 'Órdenes: told + persona + (not) to + verbo.', 'Cambian now → then, today → that day, tomorrow → the next day, here → there.'],
    ['The verb moves back one tense: present simple → past simple, will → would, can → could.', 'Say + (that): She said that… · Tell + person: She told me that…', 'Yes/no questions: asked if / whether + subject + verb.', 'Wh- questions: asked + where/what… + subject + verb (no do/did).', 'Commands: told + person + (not) to + verb.', 'now → then, today → that day, tomorrow → the next day, here → there.'],
    ['El verb retrocedeix un temps: present simple → past simple, will → would, can → could.', 'Say + (that): She said that… · Tell + persona: She told me that…', 'Preguntes sí/no: asked if / whether + subjecte + verb.', 'Preguntes amb wh-: asked + where/what… + subjecte + verb (sense do/did).', 'Ordres: told + persona + (not) to + verb.', 'Canvien now → then, today → that day, tomorrow → the next day, here → there.'],
  ),
  secciones: [
    {
      titulo: L('Cambios de tiempo verbal', 'Tense changes', 'Canvis de temps verbal'),
      tabla: {
        columnas: L(['Estilo directo', 'Reported speech', 'Ejemplo'], ['Direct speech', 'Reported speech', 'Example'], ['Estil directe', 'Reported speech', 'Exemple']),
        filas: [
          ['present simple', 'past simple', '«I live in Leeds» → He said he lived in Leeds.'],
          ['present continuous', 'past continuous', '«I’m working» → She said she was working.'],
          ['present perfect', 'past perfect', '«I’ve finished» → He said he had finished.'],
          ['past simple', L('past perfect (o se queda)', 'past perfect (or no change)', 'past perfect (o es queda)'), '«I saw it» → She said she had seen it.'],
          ['will', 'would', '«I’ll help» → He said he would help.'],
          ['can', 'could', '«I can swim» → She said she could swim.'],
          ['must / have to', 'had to', '«I must go» → He said he had to go.'],
          ['am / is / are going to', 'was / were going to', '«We’re going to win» → They said they were going to win.'],
        ],
      },
    },
    {
      titulo: L('Palabras de tiempo y lugar', 'Time and place words', 'Paraules de temps i lloc'),
      tabla: {
        columnas: L(['Directo', 'Indirecto'], ['Direct', 'Reported'], ['Directe', 'Indirecte']),
        filas: [
          ['now', 'then / at that moment'],
          ['today / tonight', 'that day / that night'],
          ['tomorrow', 'the next day / the following day'],
          ['yesterday', 'the day before / the previous day'],
          ['next week', 'the following week'],
          ['last week', 'the week before / the previous week'],
          ['… ago', '… before'],
          ['here / this / these', 'there / that / those'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Pasa a reported speech: «I am hungry», said Tom.', 'Put into reported speech: «I am hungry», said Tom.', 'Passa a reported speech: «I am hungry», said Tom.'),
      s: T('Tom said (that) he was hungry. I → he y am → was.', 'Tom said (that) he was hungry. I → he and am → was.', 'Tom said (that) he was hungry. I → he i am → was.') },
    { e: T('Pasa a reported speech: «We will call you tomorrow», they told me.', 'Put into reported speech: «We will call you tomorrow», they told me.', 'Passa a reported speech: «We will call you tomorrow», they told me.'),
      s: T('They told me (that) they would call me the next day. will → would, you → me y tomorrow → the next day.', 'They told me (that) they would call me the next day. will → would, you → me and tomorrow → the next day.', 'They told me (that) they would call me the next day. will → would, you → me i tomorrow → the next day.') },
    { e: T('Pasa a reported speech: «Where do you live?», he asked me.', 'Put into reported speech: «Where do you live?», he asked me.', 'Passa a reported speech: «Where do you live?», he asked me.'),
      s: T('He asked me where I lived. Desaparece do, el sujeto va antes del verbo y no hay signo de interrogación.', 'He asked me where I lived. Do disappears, the subject goes before the verb and there is no question mark.', 'He asked me where I lived. Desapareix do, el subjecte va abans del verb i no hi ha signe d’interrogació.') },
    { e: T('Pasa a reported speech: «Are you coming to the party?», Sara asked.', 'Put into reported speech: «Are you coming to the party?», Sara asked.', 'Passa a reported speech: «Are you coming to the party?», Sara asked.'),
      s: T('Sara asked if (o whether) I was coming to the party. Pregunta de sí/no → if/whether.', 'Sara asked if (or whether) I was coming to the party. A yes/no question → if/whether.', 'Sara asked if (o whether) I was coming to the party. Pregunta de sí/no → if/whether.') },
    { e: T('Pasa a reported speech: «Don’t touch the cake!», Mum told us.', 'Put into reported speech: «Don’t touch the cake!», Mum told us.', 'Passa a reported speech: «Don’t touch the cake!», Mum told us.'),
      s: T('Mum told us not to touch the cake. Una orden negativa se cuenta con told + persona + not to.', 'Mum told us not to touch the cake. A negative command is reported with told + person + not to.', 'Mum told us not to touch the cake. Una ordre negativa s’explica amb told + persona + not to.') },
  ],
}

export const questionTags = {
  metaTitle: L('Question tags en inglés: cómo se forman (isn’t it?, don’t you?) y casos especiales — resumen y ejercicios', 'Question tags: how to form them (isn’t it?, don’t you?) and special cases — summary and practice', 'Question tags en anglès: com es formen (isn’t it?, don’t you?) i casos especials — resum i exercicis'),
  metaDesc: L('Las question tags en inglés: frase afirmativa con coletilla negativa y al revés, qué auxiliar usar, casos especiales (I am, let’s, imperativos) y ejercicios resueltos.', 'Question tags in English: positive sentence with a negative tag and vice versa, which auxiliary to use, special cases (I am, let’s, imperatives) and solved exercises.', 'Les question tags en anglès: frase afirmativa amb coda negativa i al revés, quin auxiliar fer servir, casos especials (I am, let’s, imperatius) i exercicis resolts.'),
  resumen: L(
    ['Las question tags son las coletillas que se añaden al final de una frase para pedir confirmación, como nuestro «¿verdad?» o «¿no?»: It’s cold, isn’t it? Se forman con el mismo auxiliar de la frase y el pronombre del sujeto. Si la frase es afirmativa, la coletilla es negativa; si la frase es negativa, la coletilla es afirmativa (You don’t eat meat, do you?).', 'Cuando la frase no tiene auxiliar (present simple o past simple), se usa do, does o did: She plays tennis, doesn’t she? Con entonación descendente solo pedimos que nos den la razón; con entonación ascendente es una pregunta de verdad.'],
    ['Question tags are the short questions added to the end of a sentence to ask for confirmation, like «right?»: It’s cold, isn’t it? They are formed with the same auxiliary as the sentence and the subject pronoun. If the sentence is positive, the tag is negative; if the sentence is negative, the tag is positive (You don’t eat meat, do you?).', 'When the sentence has no auxiliary (present simple or past simple), use do, does or did: She plays tennis, doesn’t she? With falling intonation we are just asking the listener to agree; with rising intonation it is a real question.'],
    ['Les question tags són les codes que s’afegeixen al final d’una frase per demanar confirmació, com el nostre «oi?» o «no?»: It’s cold, isn’t it? Es formen amb el mateix auxiliar de la frase i el pronom del subjecte. Si la frase és afirmativa, la coda és negativa; si la frase és negativa, la coda és afirmativa (You don’t eat meat, do you?).', 'Quan la frase no té auxiliar (present simple o past simple), es fa servir do, does o did: She plays tennis, doesn’t she? Amb entonació descendent només demanem que ens donin la raó; amb entonació ascendent és una pregunta de veritat.'],
  ),
  puntosClave: L(
    ['Afirmativa → tag negativa; negativa → tag afirmativa.', 'Se repite el auxiliar (is, have, can, will…) y el sujeto pasa a pronombre.', 'Sin auxiliar: do / does / did.', 'I am → aren’t I?', 'Let’s… → shall we?  ·  Imperativo → will you?', 'Nobody, nothing, never hacen la frase negativa: tag afirmativa.'],
    ['Positive → negative tag; negative → positive tag.', 'Repeat the auxiliary (is, have, can, will…) and turn the subject into a pronoun.', 'No auxiliary: do / does / did.', 'I am → aren’t I?', 'Let’s… → shall we?  ·  Imperative → will you?', 'Nobody, nothing and never make the sentence negative: positive tag.'],
    ['Afirmativa → tag negativa; negativa → tag afirmativa.', 'Es repeteix l’auxiliar (is, have, can, will…) i el subjecte passa a pronom.', 'Sense auxiliar: do / does / did.', 'I am → aren’t I?', 'Let’s… → shall we?  ·  Imperatiu → will you?', 'Nobody, nothing i never fan la frase negativa: tag afirmativa.'],
  ),
  secciones: [
    {
      titulo: L('Ejemplos por tiempo verbal', 'Examples by tense', 'Exemples per temps verbal'),
      tabla: {
        columnas: L(['Tiempo o verbo', 'Frase', 'Tag'], ['Tense or verb', 'Sentence', 'Tag'], ['Temps o verb', 'Frase', 'Tag']),
        filas: [
          ['to be', 'She is your sister,', 'isn’t she?'],
          ['present simple', 'You like pizza,', 'don’t you?'],
          ['present simple (he/she/it)', 'He doesn’t smoke,', 'does he?'],
          ['past simple', 'They won the match,', 'didn’t they?'],
          ['present perfect', 'You have seen it,', 'haven’t you?'],
          ['can', 'She can’t drive,', 'can she?'],
          ['will', 'It will rain,', 'won’t it?'],
          ['there is', 'There is a problem,', 'isn’t there?'],
        ],
      },
    },
    {
      titulo: L('Casos especiales', 'Special cases', 'Casos especials'),
      tabla: {
        columnas: L(['Caso', 'Ejemplo'], ['Case', 'Example'], ['Cas', 'Exemple']),
        filas: [
          ['I am', 'I’m late, aren’t I?'],
          ['Let’s', 'Let’s go, shall we?'],
          [L('Imperativo', 'Imperative', 'Imperatiu'), 'Close the door, will you?'],
          ['nobody / no one', 'Nobody called, did they?'],
          ['nothing', 'Nothing happened, did it?'],
          ['never', 'You never listen, do you?'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Añade la question tag: «You’re from Madrid, ___?»', 'Add the question tag: «You’re from Madrid, ___?»', 'Afegeix la question tag: «You’re from Madrid, ___?»'),
      s: T('aren’t you? Frase afirmativa con are → tag negativa con aren’t.', 'aren’t you? A positive sentence with are → negative tag with aren’t.', 'aren’t you? Frase afirmativa amb are → tag negativa amb aren’t.') },
    { e: T('Añade la question tag: «He played football yesterday, ___?»', 'Add the question tag: «He played football yesterday, ___?»', 'Afegeix la question tag: «He played football yesterday, ___?»'),
      s: T('didn’t he? No hay auxiliar y está en past simple → did, y en negativa.', 'didn’t he? There is no auxiliary and it is in the past simple → did, in the negative.', 'didn’t he? No hi ha auxiliar i és en past simple → did, i en negativa.') },
    { e: T('Añade la question tag: «Your parents haven’t arrived yet, ___?»', 'Add the question tag: «Your parents haven’t arrived yet, ___?»', 'Afegeix la question tag: «Your parents haven’t arrived yet, ___?»'),
      s: T('have they? Frase negativa → tag afirmativa; your parents → they.', 'have they? A negative sentence → positive tag; your parents → they.', 'have they? Frase negativa → tag afirmativa; your parents → they.') },
    { e: T('Añade la question tag: «I’m right, ___?» y «Let’s have a break, ___?»', 'Add the question tags: «I’m right, ___?» and «Let’s have a break, ___?»', 'Afegeix les question tags: «I’m right, ___?» i «Let’s have a break, ___?»'),
      s: T('aren’t I? (no amn’t I) y shall we?: son los dos casos especiales más preguntados.', 'aren’t I? (not amn’t I) and shall we?: the two special cases asked about most.', 'aren’t I? (no amn’t I) i shall we?: són els dos casos especials més preguntats.') },
  ],
}

export const relativePronouns = {
  metaTitle: L('Relative pronouns en inglés: who, which, that, whose, where y when (con ejemplos) — resumen y ejercicios', 'Relative pronouns: who, which, that, whose, where and when (with examples) — summary and practice', 'Relative pronouns en anglès: who, which, that, whose, where i when (amb exemples) — resum i exercicis'),
  metaDesc: L('Cuándo usar who, which, that, whose, where y when, la diferencia entre oraciones de relativo especificativas y explicativas, cuándo se puede omitir y ejercicios resueltos.', 'When to use who, which, that, whose, where and when, defining and non-defining relative clauses, when the pronoun can be left out, and solved exercises.', 'Quan fer servir who, which, that, whose, where i when, la diferència entre oracions de relatiu especificatives i explicatives, quan es pot ometre i exercicis resolts.'),
  resumen: L(
    ['Los pronombres relativos unen dos ideas en una sola frase y se refieren a algo que ya se ha nombrado: The girl who lives next door is a doctor. Who se usa para personas, which para cosas y animales, y that vale para las dos cosas. Whose indica posesión (the boy whose bike was stolen), where se usa para lugares y when para momentos.', 'Hay dos tipos de oraciones de relativo. Las especificativas (defining) dicen de quién o de qué hablamos y no llevan comas. Las explicativas (non-defining) añaden un dato extra, van entre comas y no admiten that: My brother, who lives in Paris, is coming.'],
    ['Relative pronouns join two ideas into one sentence and refer back to something already mentioned: The girl who lives next door is a doctor. Who is used for people, which for things and animals, and that works for both. Whose shows possession (the boy whose bike was stolen), where is used for places and when for times.', 'There are two kinds of relative clause. Defining clauses tell us which person or thing we mean and have no commas. Non-defining clauses add extra information, go between commas and cannot use that: My brother, who lives in Paris, is coming.'],
    ['Els pronoms relatius uneixen dues idees en una sola frase i es refereixen a alguna cosa ja esmentada: The girl who lives next door is a doctor. Who s’usa per a persones, which per a coses i animals, i that serveix per a totes dues. Whose indica possessió (the boy whose bike was stolen), where s’usa per a llocs i when per a moments.', 'Hi ha dos tipus d’oracions de relatiu. Les especificatives (defining) diuen de qui o de què parlem i no porten comes. Les explicatives (non-defining) afegeixen una dada extra, van entre comes i no admeten that: My brother, who lives in Paris, is coming.'],
  ),
  puntosClave: L(
    ['who → personas · which → cosas y animales · that → personas o cosas.', 'whose → posesión (cuyo) · where → lugares · when → momentos.', 'Especificativas: sin comas; that está permitido.', 'Explicativas: entre comas; nunca that.', 'En las especificativas se puede omitir el relativo si no es el sujeto: The book (that) I read.'],
    ['who → people · which → things and animals · that → people or things.', 'whose → possession · where → places · when → times.', 'Defining clauses: no commas; that is allowed.', 'Non-defining clauses: between commas; never that.', 'In defining clauses the pronoun can be left out if it is not the subject: The book (that) I read.'],
    ['who → persones · which → coses i animals · that → persones o coses.', 'whose → possessió (el qual, del qual) · where → llocs · when → moments.', 'Especificatives: sense comes; that està permès.', 'Explicatives: entre comes; mai that.', 'A les especificatives es pot ometre el relatiu si no és el subjecte: The book (that) I read.'],
  ),
  secciones: [
    {
      titulo: L('Los pronombres relativos', 'The relative pronouns', 'Els pronoms relatius'),
      tabla: {
        columnas: L(['Pronombre', 'Se usa para', 'Ejemplo'], ['Pronoun', 'Used for', 'Example'], ['Pronom', 'S’usa per a', 'Exemple']),
        filas: [
          ['who', L('personas', 'people', 'persones'), 'The man who called you is my uncle.'],
          ['which', L('cosas y animales', 'things and animals', 'coses i animals'), 'The film which we saw was great.'],
          ['that', L('personas o cosas (solo especificativas)', 'people or things (defining only)', 'persones o coses (només especificatives)'), 'The phone that I bought is broken.'],
          ['whose', L('posesión', 'possession', 'possessió'), 'That’s the girl whose dog bit me.'],
          ['where', L('lugares', 'places', 'llocs'), 'This is the town where I was born.'],
          ['when', L('momentos', 'times', 'moments'), 'I remember the day when we met.'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Completa con who, which o whose: «The woman ___ car was stolen called the police.»', 'Complete with who, which or whose: «The woman ___ car was stolen called the police.»', 'Completa amb who, which o whose: «The woman ___ car was stolen called the police.»'),
      s: T('whose: el coche es de la mujer (posesión).', 'whose: the car belongs to the woman (possession).', 'whose: el cotxe és de la dona (possessió).') },
    { e: T('Une las dos frases con un relativo: «I have a cat. It sleeps all day.»', 'Join the two sentences with a relative pronoun: «I have a cat. It sleeps all day.»', 'Uneix les dues frases amb un relatiu: «I have a cat. It sleeps all day.»'),
      s: T('I have a cat which (o that) sleeps all day. Es un animal → which o that.', 'I have a cat which (or that) sleeps all day. It is an animal → which or that.', 'I have a cat which (o that) sleeps all day. És un animal → which o that.') },
    { e: T('¿Por qué está mal «Madrid, that is the capital of Spain, is very big»?', 'Why is «Madrid, that is the capital of Spain, is very big» wrong?', 'Per què està malament «Madrid, that is the capital of Spain, is very big»?'),
      s: T('Es una explicativa (va entre comas) y en ellas no se usa that: Madrid, which is the capital of Spain, is very big.', 'It is a non-defining clause (between commas), and that cannot be used in them: Madrid, which is the capital of Spain, is very big.', 'És una explicativa (va entre comes) i en aquestes no s’usa that: Madrid, which is the capital of Spain, is very big.') },
    { e: T('¿En cuál se puede quitar el relativo? a) The boy who won the race is my cousin. b) The song that you sang was lovely.', 'In which one can the relative pronoun be left out? a) The boy who won the race is my cousin. b) The song that you sang was lovely.', 'En quina es pot treure el relatiu? a) The boy who won the race is my cousin. b) The song that you sang was lovely.'),
      s: T('En la b: The song you sang was lovely. En la a, who es el sujeto de won y no se puede omitir.', 'In b: The song you sang was lovely. In a, who is the subject of won and cannot be left out.', 'A la b: The song you sang was lovely. A la a, who és el subjecte de won i no es pot ometre.') },
  ],
}

export const someAny = {
  metaTitle: L('Some, any, much, many, a lot of, a few y a little en inglés (contables e incontables) — resumen y ejercicios', 'Some, any, much, many, a lot of, a few and a little (countable and uncountable) — summary and practice', 'Some, any, much, many, a lot of, a few i a little en anglès (comptables i incomptables) — resum i exercicis'),
  metaDesc: L('Cuándo usar some o any, much o many, a lot of, a few y a little, con sustantivos contables e incontables, how much y how many, y ejercicios resueltos.', 'When to use some or any, much or many, a lot of, a few and a little with countable and uncountable nouns, how much and how many, and solved exercises.', 'Quan fer servir some o any, much o many, a lot of, a few i a little, amb substantius comptables i incomptables, how much i how many, i exercicis resolts.'),
  resumen: L(
    ['Para elegir bien hay que saber si el sustantivo es contable (se puede contar: one apple, two apples) o incontable (no tiene plural: water, money, bread, information). Some y any sirven para cantidades sin precisar con los dos tipos: some se usa en frases afirmativas y en ofrecimientos o peticiones (Would you like some tea?), y any en negativas y preguntas (There isn’t any milk. Have you got any brothers?).', 'Para hablar de mucho, many va con contables en plural y much con incontables, sobre todo en negativas y preguntas (How many books? How much money?). En frases afirmativas lo normal es a lot of, que vale para los dos. Para «unos pocos» o «un poco», a few va con contables y a little con incontables.'],
    ['To choose correctly you need to know whether the noun is countable (it can be counted: one apple, two apples) or uncountable (it has no plural: water, money, bread, information). Some and any are used for unspecified amounts with both kinds: some in positive sentences and in offers or requests (Would you like some tea?), and any in negatives and questions (There isn’t any milk. Have you got any brothers?).', 'For large amounts, many goes with plural countable nouns and much with uncountable ones, especially in negatives and questions (How many books? How much money?). In positive sentences, a lot of is the usual choice and works with both. For small amounts, a few goes with countable nouns and a little with uncountable ones.'],
    ['Per triar bé cal saber si el substantiu és comptable (es pot comptar: one apple, two apples) o incomptable (no té plural: water, money, bread, information). Some i any serveixen per a quantitats indeterminades amb tots dos tipus: some s’usa en frases afirmatives i en oferiments o peticions (Would you like some tea?), i any en negatives i preguntes (There isn’t any milk. Have you got any brothers?).', 'Per parlar de molt, many va amb comptables en plural i much amb incomptables, sobretot en negatives i preguntes (How many books? How much money?). En frases afirmatives el normal és a lot of, que serveix per a tots dos. Per a «uns quants» o «una mica», a few va amb comptables i a little amb incomptables.'],
  ),
  puntosClave: L(
    ['Contables: tienen plural (apples, chairs). Incontables: sin plural (water, money, advice).', 'some: afirmativas, ofrecimientos y peticiones.', 'any: negativas y preguntas.', 'many + contable plural · much + incontable (sobre todo en negativas y preguntas).', 'a lot of / lots of: con los dos, sobre todo en afirmativas.', 'a few + contable · a little + incontable.'],
    ['Countable nouns have a plural (apples, chairs). Uncountable nouns do not (water, money, advice).', 'some: positive sentences, offers and requests.', 'any: negatives and questions.', 'many + plural countable · much + uncountable (mainly in negatives and questions).', 'a lot of / lots of: with both, mainly in positive sentences.', 'a few + countable · a little + uncountable.'],
    ['Comptables: tenen plural (apples, chairs). Incomptables: sense plural (water, money, advice).', 'some: afirmatives, oferiments i peticions.', 'any: negatives i preguntes.', 'many + comptable plural · much + incomptable (sobretot en negatives i preguntes).', 'a lot of / lots of: amb tots dos, sobretot en afirmatives.', 'a few + comptable · a little + incomptable.'],
  ),
  secciones: [
    {
      titulo: L('Con contables y con incontables', 'With countable and uncountable nouns', 'Amb comptables i amb incomptables'),
      tabla: {
        columnas: L(['', 'Contables (plural)', 'Incontables'], ['', 'Countable (plural)', 'Uncountable'], ['', 'Comptables (plural)', 'Incomptables']),
        filas: [
          [L('Afirmativa', 'Positive', 'Afirmativa'), 'some eggs · a lot of eggs', 'some sugar · a lot of sugar'],
          [L('Negativa', 'Negative', 'Negativa'), 'not any eggs · not many eggs', 'not any sugar · not much sugar'],
          [L('Pregunta', 'Question', 'Pregunta'), 'any eggs? · How many eggs?', 'any sugar? · How much sugar?'],
          [L('Poca cantidad', 'Small amount', 'Poca quantitat'), 'a few eggs', 'a little sugar'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Completa con some o any: «There aren’t ___ chairs in the room. Can I have ___ water, please?»', 'Complete with some or any: «There aren’t ___ chairs in the room. Can I have ___ water, please?»', 'Completa amb some o any: «There aren’t ___ chairs in the room. Can I have ___ water, please?»'),
      s: T('any (negativa) y some (es una petición, aunque sea pregunta).', 'any (negative) and some (it is a request, even though it is a question).', 'any (negativa) i some (és una petició, encara que sigui pregunta).') },
    { e: T('Completa con much o many: «How ___ people came? We haven’t got ___ time.»', 'Complete with much or many: «How ___ people came? We haven’t got ___ time.»', 'Completa amb much o many: «How ___ people came? We haven’t got ___ time.»'),
      s: T('many (people es contable en plural) y much (time es incontable).', 'many (people is a plural countable noun) and much (time is uncountable).', 'many (people és comptable en plural) i much (time és incomptable).') },
    { e: T('Completa con a few o a little: «I need ___ help. I’ve got ___ friends in London.»', 'Complete with a few or a little: «I need ___ help. I’ve got ___ friends in London.»', 'Completa amb a few o a little: «I need ___ help. I’ve got ___ friends in London.»'),
      s: T('a little help (help es incontable) y a few friends (friends es contable).', 'a little help (help is uncountable) and a few friends (friends is countable).', 'a little help (help és incomptable) i a few friends (friends és comptable).') },
    { e: T('Corrige el error: «I’ve got many homework today.»', 'Correct the mistake: «I’ve got many homework today.»', 'Corregeix l’error: «I’ve got many homework today.»'),
      s: T('I’ve got a lot of homework today. Homework es incontable (no se dice homeworks) y en afirmativa lo natural es a lot of.', 'I’ve got a lot of homework today. Homework is uncountable (there is no «homeworks») and a lot of is the natural choice in a positive sentence.', 'I’ve got a lot of homework today. Homework és incomptable (no es diu homeworks) i en afirmativa el natural és a lot of.') },
  ],
}

export const segundoGrado = {
  metaTitle: L('Ecuaciones de segundo grado: fórmula, incompletas y discriminante — resumen y ejercicios resueltos', 'Quadratic equations: the formula, incomplete equations and the discriminant — summary and solved exercises', 'Equacions de segon grau: fórmula, incompletes i discriminant — resum i exercicis resolts'),
  metaDesc: L('Cómo resolver ecuaciones de segundo grado completas con la fórmula, las incompletas sin ella, qué indica el discriminante y problemas paso a paso con solución.', 'How to solve complete quadratic equations with the formula, incomplete ones without it, what the discriminant tells you, and step-by-step problems with answers.', 'Com resoldre equacions de segon grau completes amb la fórmula, les incompletes sense, què indica el discriminant i problemes pas a pas amb solució.'),
  resumen: L(
    ['Una ecuación de segundo grado es la que, ordenada, queda como ax² + bx + c = 0, con a distinto de 0. Puede tener dos soluciones, una (doble) o ninguna real. Las completas se resuelven con la fórmula x = (−b ± √(b² − 4ac)) / 2a. El número de dentro de la raíz, b² − 4ac, se llama discriminante y dice cuántas soluciones hay antes de terminar la cuenta.', 'Las incompletas, en las que falta b o c, se resuelven más rápido sin fórmula: si falta b (ax² + c = 0) se despeja x² y se hace la raíz, con sus dos signos; si falta c (ax² + bx = 0) se saca factor común x y sale siempre la solución x = 0.'],
    ['A quadratic equation is one that, once rearranged, has the form ax² + bx + c = 0, with a not equal to 0. It can have two solutions, one (repeated) or no real solutions. Complete ones are solved with the formula x = (−b ± √(b² − 4ac)) / 2a. The number under the square root, b² − 4ac, is called the discriminant and tells you how many solutions there are before you finish the working.', 'Incomplete equations, where b or c is missing, are quicker to solve without the formula: if b is missing (ax² + c = 0), isolate x² and take the square root, with both signs; if c is missing (ax² + bx = 0), factorise out x, which always gives the solution x = 0.'],
    ['Una equació de segon grau és la que, ordenada, queda com ax² + bx + c = 0, amb a diferent de 0. Pot tenir dues solucions, una (doble) o cap de real. Les completes es resolen amb la fórmula x = (−b ± √(b² − 4ac)) / 2a. El nombre de dins de l’arrel, b² − 4ac, s’anomena discriminant i diu quantes solucions hi ha abans d’acabar el càlcul.', 'Les incompletes, en què falta b o c, es resolen més ràpid sense fórmula: si falta b (ax² + c = 0) s’aïlla x² i es fa l’arrel, amb els dos signes; si falta c (ax² + bx = 0) es treu factor comú x i surt sempre la solució x = 0.'],
  ),
  puntosClave: L(
    ['Forma general: ax² + bx + c = 0 (a ≠ 0). Ordena antes de identificar a, b y c.', 'Fórmula: x = (−b ± √(b² − 4ac)) / 2a.', 'Discriminante Δ = b² − 4ac: si Δ > 0, dos soluciones; si Δ = 0, una doble; si Δ < 0, ninguna real.', 'Incompleta sin b: ax² + c = 0 → x = ±√(−c/a).', 'Incompleta sin c: ax² + bx = 0 → x(ax + b) = 0 → x = 0 y x = −b/a.', 'Comprobación: x₁ + x₂ = −b/a y x₁ · x₂ = c/a.'],
    ['General form: ax² + bx + c = 0 (a ≠ 0). Rearrange before identifying a, b and c.', 'Formula: x = (−b ± √(b² − 4ac)) / 2a.', 'Discriminant Δ = b² − 4ac: if Δ > 0, two solutions; if Δ = 0, one repeated root; if Δ < 0, no real solutions.', 'Incomplete, no b: ax² + c = 0 → x = ±√(−c/a).', 'Incomplete, no c: ax² + bx = 0 → x(ax + b) = 0 → x = 0 and x = −b/a.', 'Check: x₁ + x₂ = −b/a and x₁ · x₂ = c/a.'],
    ['Forma general: ax² + bx + c = 0 (a ≠ 0). Ordena abans d’identificar a, b i c.', 'Fórmula: x = (−b ± √(b² − 4ac)) / 2a.', 'Discriminant Δ = b² − 4ac: si Δ > 0, dues solucions; si Δ = 0, una doble; si Δ < 0, cap de real.', 'Incompleta sense b: ax² + c = 0 → x = ±√(−c/a).', 'Incompleta sense c: ax² + bx = 0 → x(ax + b) = 0 → x = 0 i x = −b/a.', 'Comprovació: x₁ + x₂ = −b/a i x₁ · x₂ = c/a.'],
  ),
  secciones: [
    {
      titulo: L('Tipos y cómo se resuelven', 'Types and how to solve them', 'Tipus i com es resolen'),
      tabla: {
        columnas: L(['Tipo', 'Forma', 'Método', 'Ejemplo'], ['Type', 'Form', 'Method', 'Example'], ['Tipus', 'Forma', 'Mètode', 'Exemple']),
        filas: [
          [L('Completa', 'Complete', 'Completa'), 'ax² + bx + c = 0', L('fórmula', 'the formula', 'fórmula'), 'x² − 5x + 6 = 0 → x = 2, x = 3'],
          [L('Incompleta sin b', 'Incomplete, no b', 'Incompleta sense b'), 'ax² + c = 0', L('despejar x² y raíz ±', 'isolate x² and take ± root', 'aïllar x² i arrel ±'), '2x² − 18 = 0 → x = ±3'],
          [L('Incompleta sin c', 'Incomplete, no c', 'Incompleta sense c'), 'ax² + bx = 0', L('factor común x', 'factorise out x', 'factor comú x'), '3x² + 12x = 0 → x = 0, x = −4'],
          [L('Solo ax²', 'Only ax²', 'Només ax²'), 'ax² = 0', '—', '5x² = 0 → x = 0 (doble)'],
        ],
      },
    },
    {
      titulo: L('Qué dice el discriminante', 'What the discriminant tells you', 'Què diu el discriminant'),
      tabla: {
        columnas: L(['Δ = b² − 4ac', 'Soluciones', 'Ejemplo'], ['Δ = b² − 4ac', 'Solutions', 'Example'], ['Δ = b² − 4ac', 'Solucions', 'Exemple']),
        filas: [
          ['Δ > 0', L('dos soluciones distintas', 'two different solutions', 'dues solucions diferents'), 'x² − 5x + 6 = 0 → Δ = 1'],
          ['Δ = 0', L('una solución doble', 'one repeated solution', 'una solució doble'), 'x² − 6x + 9 = 0 → Δ = 0'],
          ['Δ < 0', L('ninguna solución real', 'no real solutions', 'cap solució real'), 'x² + 2x + 5 = 0 → Δ = −16'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Resuelve x² − 5x + 6 = 0.', 'Solve x² − 5x + 6 = 0.', 'Resol x² − 5x + 6 = 0.'),
      s: T('a = 1, b = −5, c = 6. Δ = 25 − 24 = 1. x = (5 ± 1) / 2 → x = 3 y x = 2. Comprobación: 3 + 2 = 5 = −b/a y 3 · 2 = 6 = c/a.', 'a = 1, b = −5, c = 6. Δ = 25 − 24 = 1. x = (5 ± 1) / 2 → x = 3 and x = 2. Check: 3 + 2 = 5 = −b/a and 3 × 2 = 6 = c/a.', 'a = 1, b = −5, c = 6. Δ = 25 − 24 = 1. x = (5 ± 1) / 2 → x = 3 i x = 2. Comprovació: 3 + 2 = 5 = −b/a i 3 · 2 = 6 = c/a.') },
    { e: T('Resuelve la incompleta 2x² − 18 = 0.', 'Solve the incomplete equation 2x² − 18 = 0.', 'Resol la incompleta 2x² − 18 = 0.'),
      s: T('2x² = 18 → x² = 9 → x = 3 y x = −3. No olvides la solución negativa.', '2x² = 18 → x² = 9 → x = 3 and x = −3. Do not forget the negative solution.', '2x² = 18 → x² = 9 → x = 3 i x = −3. No oblidis la solució negativa.') },
    { e: T('Resuelve la incompleta 3x² + 12x = 0.', 'Solve the incomplete equation 3x² + 12x = 0.', 'Resol la incompleta 3x² + 12x = 0.'),
      s: T('Factor común: 3x(x + 4) = 0. Un producto es 0 si lo es un factor: x = 0 o x + 4 = 0 → x = −4. Dividir entre x haría perder la solución x = 0.', 'Factorise: 3x(x + 4) = 0. A product is 0 if one factor is: x = 0 or x + 4 = 0 → x = −4. Dividing by x would lose the solution x = 0.', 'Factor comú: 3x(x + 4) = 0. Un producte és 0 si ho és un factor: x = 0 o x + 4 = 0 → x = −4. Dividir entre x faria perdre la solució x = 0.') },
    { e: T('Sin resolverla, ¿cuántas soluciones tiene x² + 2x + 5 = 0?', 'Without solving it, how many solutions does x² + 2x + 5 = 0 have?', 'Sense resoldre-la, quantes solucions té x² + 2x + 5 = 0?'),
      s: T('Δ = 2² − 4 · 1 · 5 = 4 − 20 = −16. Es negativo: no tiene soluciones reales (no existe la raíz de un número negativo).', 'Δ = 2² − 4 × 1 × 5 = 4 − 20 = −16. It is negative: there are no real solutions (a negative number has no real square root).', 'Δ = 2² − 4 · 1 · 5 = 4 − 20 = −16. És negatiu: no té solucions reals (no existeix l’arrel d’un nombre negatiu).') },
    { e: T('Un rectángulo mide 3 cm más de largo que de ancho y su área es 40 cm². ¿Cuánto miden sus lados?', 'A rectangle is 3 cm longer than it is wide and its area is 40 cm². How long are its sides?', 'Un rectangle fa 3 cm més de llarg que d’ample i la seva àrea és 40 cm². Quant fan els costats?'),
      s: T('Ancho x, largo x + 3: x(x + 3) = 40 → x² + 3x − 40 = 0. Δ = 9 + 160 = 169, √169 = 13. x = (−3 ± 13) / 2 → x = 5 o x = −8. Una longitud no puede ser negativa: ancho 5 cm y largo 8 cm.', 'Width x, length x + 3: x(x + 3) = 40 → x² + 3x − 40 = 0. Δ = 9 + 160 = 169, √169 = 13. x = (−3 ± 13) / 2 → x = 5 or x = −8. A length cannot be negative: width 5 cm and length 8 cm.', 'Amplada x, llargada x + 3: x(x + 3) = 40 → x² + 3x − 40 = 0. Δ = 9 + 160 = 169, √169 = 13. x = (−3 ± 13) / 2 → x = 5 o x = −8. Una longitud no pot ser negativa: amplada 5 cm i llargada 8 cm.') },
  ],
}

export const textoArgumentativo = {
  metaTitle: L('El texto argumentativo: estructura, tipos de argumentos y características (con ejemplo) — resumen y ejercicios', 'The argumentative text: structure, types of argument and features (with an example) — summary and practice', 'El text argumentatiu: estructura, tipus d’arguments i característiques (amb exemple) — resum i exercicis'),
  metaDesc: L('Qué es un texto argumentativo, sus partes (tesis, argumentos y conclusión), las estructuras deductiva, inductiva y encuadrada, los tipos de argumentos y ejercicios resueltos.', 'What an argumentative text is, its parts (thesis, arguments and conclusion), deductive, inductive and framed structures, types of argument and solved exercises.', 'Què és un text argumentatiu, les parts (tesi, arguments i conclusió), les estructures deductiva, inductiva i enquadrada, els tipus d’arguments i exercicis resolts.'),
  resumen: L(
    ['Un texto argumentativo defiende una opinión, la tesis, con razones (argumentos) para convencer al lector o hacerle cambiar de idea. Son argumentativos los artículos de opinión, las columnas, las cartas al director, los debates o los ensayos. Su estructura básica tiene tres partes: la tesis, el cuerpo argumentativo y la conclusión.', 'Según dónde aparezca la tesis, la estructura es deductiva o analizante (la tesis al principio y luego los argumentos), inductiva o sintetizante (primero los argumentos y la tesis al final) o encuadrada (la tesis al principio y se repite al final). Los argumentos pueden ser datos, ejemplos, citas de expertos, experiencias personales o relaciones de causa y efecto, y a menudo se adelanta y rebate la opinión contraria (contraargumentación).'],
    ['An argumentative text defends an opinion, the thesis, with reasons (arguments) to persuade readers or change their minds. Opinion pieces, columns, letters to the editor, debates and essays are all argumentative. Its basic structure has three parts: the thesis, the body of arguments and the conclusion.', 'Depending on where the thesis appears, the structure is deductive (thesis first, then the arguments), inductive (arguments first, thesis at the end) or framed (thesis at the start and repeated at the end). Arguments can be facts and figures, examples, quotations from experts, personal experience or cause and effect, and writers often anticipate and refute the opposing view (counter-argument).'],
    ['Un text argumentatiu defensa una opinió, la tesi, amb raons (arguments) per convèncer el lector o fer-lo canviar d’idea. Són argumentatius els articles d’opinió, les columnes, les cartes al director, els debats o els assajos. L’estructura bàsica té tres parts: la tesi, el cos argumentatiu i la conclusió.', 'Segons on aparegui la tesi, l’estructura és deductiva o analitzant (la tesi al principi i després els arguments), inductiva o sintetitzant (primer els arguments i la tesi al final) o enquadrada (la tesi al principi i es repeteix al final). Els arguments poden ser dades, exemples, cites d’experts, experiències personals o relacions de causa i efecte, i sovint s’avança i es rebat l’opinió contrària (contraargumentació).'],
  ),
  puntosClave: L(
    ['Intención: convencer o persuadir al receptor.', 'Partes: tesis (la idea que se defiende), cuerpo argumentativo y conclusión.', 'Deductiva: tesis al principio · Inductiva: tesis al final · Encuadrada: al principio y al final.', 'Contraargumento: se recoge la opinión contraria para rebatirla.', 'Rasgos de lengua: verbos de opinión (creo, considero), conectores (además, sin embargo, por tanto, en conclusión) y adjetivos valorativos.', 'Predomina la función apelativa, junto con la expresiva.'],
    ['Purpose: to convince or persuade the reader.', 'Parts: thesis (the idea defended), body of arguments and conclusion.', 'Deductive: thesis first · Inductive: thesis at the end · Framed: at the start and the end.', 'Counter-argument: the opposing view is presented in order to refute it.', 'Language features: opinion verbs (creo, considero), connectives (además, sin embargo, por tanto, en conclusión) and evaluative adjectives.', 'The conative (persuasive) function dominates, alongside the expressive one.'],
    ['Intenció: convèncer o persuadir el receptor.', 'Parts: tesi (la idea que es defensa), cos argumentatiu i conclusió.', 'Deductiva: tesi al principi · Inductiva: tesi al final · Enquadrada: al principi i al final.', 'Contraargument: es recull l’opinió contrària per rebatre-la.', 'Trets de llengua: verbs d’opinió (crec, considero), connectors (a més, tanmateix, per tant, en conclusió) i adjectius valoratius.', 'Predomina la funció apel·lativa, juntament amb l’expressiva.'],
  ),
  secciones: [
    {
      titulo: L('Tipos de argumentos', 'Types of argument', 'Tipus d’arguments'),
      tabla: {
        columnas: L(['Argumento', 'En qué se apoya', 'Ejemplo'], ['Argument', 'What it relies on', 'Example'], ['Argument', 'En què es basa', 'Exemple']),
        filas: [
          [L('De autoridad', 'Authority', 'D’autoritat'), L('la opinión de un experto o una institución', 'the view of an expert or an institution', 'l’opinió d’un expert o una institució'), L('«La OMS recomienda una hora diaria de ejercicio a los adolescentes.»', '«The WHO recommends an hour of exercise a day for teenagers.»', '«L’OMS recomana una hora diària d’exercici als adolescents.»')],
          [L('Datos o estadísticas', 'Facts and figures', 'Dades o estadístiques'), L('cifras comprobables', 'verifiable figures', 'xifres comprovables'), L('«Según una encuesta, el 70 % de los alumnos duerme menos de 8 horas.»', '«According to a survey, 70% of pupils sleep less than 8 hours.»', '«Segons una enquesta, el 70 % dels alumnes dorm menys de 8 hores.»')],
          [L('Ejemplo', 'Example', 'Exemple'), L('un caso concreto', 'a specific case', 'un cas concret'), L('«En Finlandia apenas hay deberes y los resultados son buenos.»', '«In Finland there is hardly any homework and results are good.»', '«A Finlàndia gairebé no hi ha deures i els resultats són bons.»')],
          [L('Experiencia personal', 'Personal experience', 'Experiència personal'), L('lo vivido por quien escribe', 'what the writer has lived through', 'el que ha viscut qui escriu'), L('«Desde que voy en bici al instituto, llego más despierto.»', '«Since I started cycling to school, I arrive more awake.»', '«Des que vaig en bici a l’institut, hi arribo més despert.»')],
          [L('Causa y efecto', 'Cause and effect', 'Causa i efecte'), L('una consecuencia lógica', 'a logical consequence', 'una conseqüència lògica'), L('«Si baja el precio del transporte público, habrá menos coches.»', '«If public transport gets cheaper, there will be fewer cars.»', '«Si baixa el preu del transport públic, hi haurà menys cotxes.»')],
          [L('Analogía', 'Analogy', 'Analogia'), L('una comparación con un caso parecido', 'a comparison with a similar case', 'una comparació amb un cas semblant'), L('«Estudiar sin descansar es como conducir sin repostar.»', '«Studying without a break is like driving without refuelling.»', '«Estudiar sense descansar és com conduir sense posar benzina.»')],
          [L('De la mayoría', 'Common opinion', 'De la majoria'), L('lo que piensa casi todo el mundo', 'what nearly everyone thinks', 'el que pensa gairebé tothom'), L('«Todo el mundo sabe que desayunar bien ayuda a rendir.»', '«Everyone knows a good breakfast helps you perform.»', '«Tothom sap que esmorzar bé ajuda a rendir.»')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Un texto empieza con varios datos sobre el plástico en el mar y termina: «Por todo ello, deberíamos prohibir las bolsas de un solo uso». ¿Qué estructura tiene?', 'A text begins with several facts about plastic in the sea and ends: «For all these reasons, single-use bags should be banned». What structure does it have?', 'Un text comença amb diverses dades sobre el plàstic al mar i acaba: «Per tot això, hauríem de prohibir les bosses d’un sol ús». Quina estructura té?'),
      s: T('Inductiva (o sintetizante): primero los argumentos y la tesis al final.', 'Inductive: the arguments come first and the thesis at the end.', 'Inductiva (o sintetitzant): primer els arguments i la tesi al final.') },
    { e: T('¿Qué tipo de argumento es «Los pediatras aconsejan no usar pantallas antes de dormir»?', 'What type of argument is «Paediatricians advise against screens before bedtime»?', 'Quin tipus d’argument és «Els pediatres aconsellen no fer servir pantalles abans de dormir»?'),
      s: T('De autoridad: se apoya en lo que dicen los expertos.', 'An argument from authority: it relies on what experts say.', 'D’autoritat: es basa en el que diuen els experts.') },
    { e: T('Localiza la tesis: «Hay quien piensa que el uniforme limita la libertad. Sin embargo, creo que es una buena medida: iguala a los alumnos y ahorra dinero a las familias».', 'Find the thesis: «Some people think school uniform limits freedom. However, I believe it is a good idea: it puts pupils on an equal footing and saves families money».', 'Localitza la tesi: «Hi ha qui pensa que l’uniforme limita la llibertat. Tanmateix, crec que és una bona mesura: iguala els alumnes i estalvia diners a les famílies».'),
      s: T('«El uniforme es una buena medida». La primera frase es un contraargumento (la opinión contraria) y «iguala» y «ahorra» son los argumentos.', '«School uniform is a good idea». The first sentence is a counter-argument (the opposing view) and «puts pupils on an equal footing» and «saves money» are the arguments.', '«L’uniforme és una bona mesura». La primera frase és un contraargument (l’opinió contrària) i «iguala» i «estalvia» són els arguments.') },
    { e: T('Di dos conectores para añadir un argumento y dos para introducir la conclusión.', 'Give two connectives to add an argument and two to introduce the conclusion (in Spanish).', 'Digues dos connectors per afegir un argument i dos per introduir la conclusió.'),
      s: T('Para añadir: además, asimismo, también, por otra parte. Para concluir: en conclusión, por tanto, en definitiva, en resumen.', 'To add: además, asimismo, también, por otra parte. To conclude: en conclusión, por tanto, en definitiva, en resumen.', 'Per afegir: a més, així mateix, també, d’altra banda. Per concloure: en conclusió, per tant, en definitiva, en resum.') },
  ],
}

export const losSentidos = {
  metaTitle: L('Los sentidos del cuerpo humano: vista, oído, olfato, gusto y tacto (órganos y partes) — resumen y ejercicios', 'The human senses: sight, hearing, smell, taste and touch (organs and parts) — summary and practice', 'Els sentits del cos humà: vista, oïda, olfacte, gust i tacte (òrgans i parts) — resum i exercicis'),
  metaDesc: L('Los cinco sentidos con su órgano, receptores y estímulo, las partes del ojo y del oído, los sabores, cómo llega la información al cerebro y ejercicios resueltos.', 'The five senses with their organ, receptors and stimulus, the parts of the eye and ear, the tastes, how information reaches the brain, and solved exercises.', 'Els cinc sentits amb el seu òrgan, receptors i estímul, les parts de l’ull i de l’oïda, els sabors, com arriba la informació al cervell i exercicis resolts.'),
  resumen: L(
    ['Los sentidos nos permiten recibir información del exterior. Cada órgano de los sentidos tiene receptores, células especializadas que captan un tipo de estímulo (luz, sonido, sustancias químicas, presión o temperatura) y lo transforman en impulsos nerviosos. Los nervios sensitivos llevan esos impulsos al encéfalo, que es donde de verdad vemos, oímos u olemos: el ojo capta la luz, pero la imagen se forma en el cerebro.', 'Son cinco: la vista (ojos), el oído (oídos), el olfato (nariz), el gusto (lengua) y el tacto (piel). Forman parte de la función de relación, junto con el sistema nervioso, que interpreta la información, y el aparato locomotor, que responde con movimientos.'],
    ['The senses let us take in information from our surroundings. Each sense organ has receptors, specialised cells that pick up one kind of stimulus (light, sound, chemicals, pressure or temperature) and turn it into nerve impulses. Sensory nerves carry these impulses to the brain, which is where we really see, hear or smell: the eye picks up light, but the image is formed in the brain.', 'There are five: sight (eyes), hearing (ears), smell (nose), taste (tongue) and touch (skin). They are part of the interaction function, together with the nervous system, which interprets the information, and the locomotor system, which responds with movement.'],
    ['Els sentits ens permeten rebre informació de l’exterior. Cada òrgan dels sentits té receptors, cèl·lules especialitzades que capten un tipus d’estímul (llum, so, substàncies químiques, pressió o temperatura) i el transformen en impulsos nerviosos. Els nervis sensitius porten aquests impulsos a l’encèfal, que és on de veritat veiem, sentim o olorem: l’ull capta la llum, però la imatge es forma al cervell.', 'Són cinc: la vista (ulls), l’oïda (orelles), l’olfacte (nas), el gust (llengua) i el tacte (pell). Formen part de la funció de relació, juntament amb el sistema nerviós, que interpreta la informació, i l’aparell locomotor, que respon amb moviments.'],
  ),
  puntosClave: L(
    ['Estímulo → receptor → nervio sensitivo → encéfalo (interpreta) → respuesta.', 'Vista: la luz llega a la retina (conos para el color, bastones para la poca luz).', 'Oído: el sonido hace vibrar el tímpano y los huesecillos; la cóclea lo convierte en impulsos.', 'El oído interno también controla el equilibrio (canales semicirculares).', 'Olfato y gusto captan sustancias químicas; por eso con la nariz tapada la comida «sabe» menos.', 'Tacto: la piel tiene receptores de presión, temperatura y dolor.'],
    ['Stimulus → receptor → sensory nerve → brain (interprets) → response.', 'Sight: light reaches the retina (cones for colour, rods for dim light).', 'Hearing: sound makes the eardrum and the ossicles vibrate; the cochlea turns it into impulses.', 'The inner ear also controls balance (semicircular canals).', 'Smell and taste detect chemicals; that is why food «tastes» of less with a blocked nose.', 'Touch: the skin has receptors for pressure, temperature and pain.'],
    ['Estímul → receptor → nervi sensitiu → encèfal (interpreta) → resposta.', 'Vista: la llum arriba a la retina (cons per al color, bastons per a la poca llum).', 'Oïda: el so fa vibrar el timpà i els ossets; la còclea el converteix en impulsos.', 'L’orella interna també controla l’equilibri (canals semicirculars).', 'L’olfacte i el gust capten substàncies químiques; per això amb el nas tapat el menjar «té» menys gust.', 'Tacte: la pell té receptors de pressió, temperatura i dolor.'],
  ),
  secciones: [
    {
      titulo: L('Los cinco sentidos', 'The five senses', 'Els cinc sentits'),
      tabla: {
        columnas: L(['Sentido', 'Órgano', 'Estímulo', 'Receptores'], ['Sense', 'Organ', 'Stimulus', 'Receptors'], ['Sentit', 'Òrgan', 'Estímul', 'Receptors']),
        filas: [
          [L('Vista', 'Sight', 'Vista'), L('ojo', 'eye', 'ull'), L('luz', 'light', 'llum'), L('fotorreceptores (conos y bastones) de la retina', 'photoreceptors (cones and rods) in the retina', 'fotoreceptors (cons i bastons) de la retina')],
          [L('Oído', 'Hearing', 'Oïda'), L('oído', 'ear', 'orella'), L('sonido (vibraciones)', 'sound (vibrations)', 'so (vibracions)'), L('mecanorreceptores de la cóclea (caracol)', 'mechanoreceptors in the cochlea', 'mecanoreceptors de la còclea (cargol)')],
          [L('Olfato', 'Smell', 'Olfacte'), L('nariz', 'nose', 'nas'), L('sustancias en el aire', 'substances in the air', 'substàncies a l’aire'), L('quimiorreceptores de la pituitaria amarilla', 'chemoreceptors in the olfactory epithelium', 'quimioreceptors de la pituïtària groga')],
          [L('Gusto', 'Taste', 'Gust'), L('lengua', 'tongue', 'llengua'), L('sustancias disueltas en la saliva', 'substances dissolved in saliva', 'substàncies dissoltes a la saliva'), L('quimiorreceptores de las papilas gustativas', 'chemoreceptors in the taste buds', 'quimioreceptors de les papil·les gustatives')],
          [L('Tacto', 'Touch', 'Tacte'), L('piel', 'skin', 'pell'), L('presión, temperatura, dolor', 'pressure, temperature, pain', 'pressió, temperatura, dolor'), L('mecanorreceptores, termorreceptores y receptores del dolor', 'mechanoreceptors, thermoreceptors and pain receptors', 'mecanoreceptors, termoreceptors i receptors del dolor')],
        ],
      },
    },
    {
      titulo: L('Partes del ojo y del oído', 'Parts of the eye and the ear', 'Parts de l’ull i de l’orella'),
      tabla: {
        columnas: L(['Parte', 'Qué hace'], ['Part', 'What it does'], ['Part', 'Què fa']),
        filas: [
          [L('Córnea', 'Cornea', 'Còrnia'), L('capa transparente de delante; deja pasar la luz y la desvía', 'clear front layer; lets light in and bends it', 'capa transparent del davant; deixa passar la llum i la desvia')],
          [L('Iris y pupila', 'Iris and pupil', 'Iris i pupil·la'), L('el iris (la parte de color) abre o cierra la pupila según la luz', 'the iris (the coloured part) opens or closes the pupil depending on the light', 'l’iris (la part de color) obre o tanca la pupil·la segons la llum')],
          [L('Cristalino', 'Lens', 'Cristal·lí'), L('lente que enfoca la imagen sobre la retina', 'focuses the image on the retina', 'lent que enfoca la imatge sobre la retina')],
          [L('Retina y nervio óptico', 'Retina and optic nerve', 'Retina i nervi òptic'), L('la retina capta la luz y el nervio óptico lleva la señal al cerebro', 'the retina detects light and the optic nerve carries the signal to the brain', 'la retina capta la llum i el nervi òptic porta el senyal al cervell')],
          [L('Oído externo', 'Outer ear', 'Orella externa'), L('pabellón auditivo y conducto auditivo: recogen el sonido', 'the pinna and ear canal collect sound', 'pavelló auditiu i conducte auditiu: recullen el so')],
          [L('Oído medio', 'Middle ear', 'Orella mitjana'), L('tímpano, martillo, yunque y estribo: transmiten la vibración', 'eardrum, hammer, anvil and stirrup pass on the vibration', 'timpà, martell, enclusa i estrep: transmeten la vibració')],
          [L('Oído interno', 'Inner ear', 'Orella interna'), L('cóclea (oír) y canales semicirculares y vestíbulo (equilibrio)', 'cochlea (hearing) and semicircular canals and vestibule (balance)', 'còclea (sentir) i canals semicirculars i vestíbul (equilibri)')],
        ],
      },
    },
    {
      titulo: L('Los sabores', 'The tastes', 'Els sabors'),
      texto: L(
        ['La lengua distingue cinco sabores básicos: dulce, salado, ácido, amargo y umami (el sabor de caldos, tomate maduro o queso curado). El famoso «mapa de la lengua», con cada sabor en una zona, es un mito: todas las zonas con papilas detectan todos los sabores. Gran parte de lo que llamamos sabor viene en realidad del olfato.'],
        ['The tongue tells apart five basic tastes: sweet, salty, sour, bitter and umami (the taste of stock, ripe tomato or mature cheese). The famous «tongue map», with each taste in its own area, is a myth: every area with taste buds detects every taste. Much of what we call flavour actually comes from smell.'],
        ['La llengua distingeix cinc sabors bàsics: dolç, salat, àcid, amarg i umami (el sabor dels brous, el tomàquet madur o el formatge curat). El famós «mapa de la llengua», amb cada sabor en una zona, és un mite: totes les zones amb papil·les detecten tots els sabors. Bona part del que anomenem gust ve en realitat de l’olfacte.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Qué le pasa a la pupila al entrar en una habitación oscura y para qué?', 'What happens to the pupil when you walk into a dark room, and why?', 'Què li passa a la pupil·la en entrar en una habitació fosca i per a què?'),
      s: T('Se dilata (se hace más grande) porque el iris se abre: así entra más luz a la retina. Con mucha luz ocurre lo contrario.', 'It dilates (gets bigger) because the iris opens: this lets more light reach the retina. In bright light the opposite happens.', 'Es dilata (es fa més gran) perquè l’iris s’obre: així entra més llum a la retina. Amb molta llum passa el contrari.') },
    { e: T('Ordena el camino del sonido: cóclea, conducto auditivo, tímpano, huesecillos, nervio auditivo, pabellón.', 'Put the path of sound in order: cochlea, ear canal, eardrum, ossicles, auditory nerve, pinna.', 'Ordena el camí del so: còclea, conducte auditiu, timpà, ossets, nervi auditiu, pavelló.'),
      s: T('Pabellón → conducto auditivo → tímpano → huesecillos (martillo, yunque, estribo) → cóclea → nervio auditivo → encéfalo.', 'Pinna → ear canal → eardrum → ossicles (hammer, anvil, stirrup) → cochlea → auditory nerve → brain.', 'Pavelló → conducte auditiu → timpà → ossets (martell, enclusa, estrep) → còclea → nervi auditiu → encèfal.') },
    { e: T('Si giras muy deprisa y te mareas, ¿qué parte del oído está implicada?', 'If you spin round quickly and feel dizzy, which part of the ear is involved?', 'Si gires molt de pressa i et mareges, quina part de l’orella hi està implicada?'),
      s: T('El oído interno: los canales semicirculares y el vestíbulo, que se encargan del equilibrio, no del oído.', 'The inner ear: the semicircular canals and the vestibule, which control balance rather than hearing.', 'L’orella interna: els canals semicirculars i el vestíbul, que s’encarreguen de l’equilibri, no de l’oïda.') },
    { e: T('¿Por qué la comida parece no saber a nada cuando estás resfriado?', 'Why does food seem to taste of nothing when you have a cold?', 'Per què sembla que el menjar no té gust quan estàs refredat?'),
      s: T('Porque con la nariz tapada los olores no llegan a la pituitaria, y buena parte del sabor de los alimentos se percibe por el olfato. La lengua sigue notando dulce, salado, ácido, amargo y umami.', 'Because with a blocked nose, smells cannot reach the olfactory receptors, and much of a food’s flavour is perceived through smell. The tongue still detects sweet, salty, sour, bitter and umami.', 'Perquè amb el nas tapat les olors no arriben a la pituïtària, i bona part del gust dels aliments es percep per l’olfacte. La llengua continua notant dolç, salat, àcid, amarg i umami.') },
  ],
}
