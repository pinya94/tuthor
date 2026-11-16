// Undécima tanda (16-nov-2026): búsquedas sin página propia del autocompletado
// (will y going to 5, pasado continuo 4, pronombres en inglés 4, texto
// expositivo 5 / argumentativo 3 / narración 3, provincias de España 4).
//   future, past-continuous, pronouns → INGLES_BASICO (InglesGrammarTema)
//   tipos-de-texto, provincias-de-espana → ESTUDIO_EXTRA (TemaEstudioExtra)
// En inglés el material (frases de ejemplo) va en inglés en los tres idiomas;
// en lengua, en castellano. Solo se traduce la prosa.
const T = (es, en, ca) => ({ es, en, ca })
const L = T

export const future = {
  metaTitle: L('El futuro en inglés: will, going to y present continuous (diferencias y ejemplos) — resumen y ejercicios', 'Future forms in English: will, going to and the present continuous — summary and practice questions', 'El futur en anglès: will, going to i present continuous (diferències i exemples) — resum i exercicis'),
  metaDesc: L('Cuándo usar will, going to o el present continuous para hablar del futuro en inglés, cómo se forman y ejercicios resueltos con la explicación de cada respuesta.', 'When to use will, going to or the present continuous to talk about the future, how to form them, and worked exercises with every answer explained.', 'Quan fer servir will, going to o el present continuous per parlar del futur en anglès, com es formen i exercicis resolts amb l’explicació de cada resposta.'),
  resumen: L(
    ['El inglés no tiene un único tiempo futuro: elige la forma según lo seguro o lo planeado que sea lo que va a pasar. Will sirve para predicciones, promesas y decisiones que se toman en el momento (I’ll help you!). Going to, para planes ya decididos y para predicciones con pruebas delante (Look at those clouds: it’s going to rain). Y el present continuous, para citas y planes fijados con hora y lugar (I’m meeting Sara at six).'],
    ['English has no single future tense: it chooses a form depending on how certain or planned the event is. Will is for predictions, promises and decisions made on the spot (I’ll help you!). Going to is for plans already decided and for predictions based on evidence (Look at those clouds: it’s going to rain). The present continuous is for arrangements fixed with a time and place (I’m meeting Sara at six).'],
    ['L’anglès no té un únic temps futur: tria la forma segons com de segur o planificat és el que passarà. Will serveix per a prediccions, promeses i decisions que es prenen en el moment (I’ll help you!). Going to, per a plans ja decidits i per a prediccions amb proves al davant (Look at those clouds: it’s going to rain). I el present continuous, per a cites i plans fixats amb hora i lloc (I’m meeting Sara at six).'],
  ),
  puntosClave: L(
    ['Will + verbo: predicciones, promesas, ofrecimientos y decisiones en el momento.', 'Am/is/are going to + verbo: planes decididos y predicciones con pruebas.', 'Present continuous: citas y planes con fecha y hora.', 'Negativa de will: won’t (will not).', 'Después de will no va «to»: I will go, no I will to go.'],
    ['Will + verb: predictions, promises, offers and on-the-spot decisions.', 'Am/is/are going to + verb: decided plans and predictions with evidence.', 'Present continuous: arrangements with a date and time.', 'Negative of will: won’t (will not).', 'No «to» after will: I will go, not I will to go.'],
    ['Will + verb: prediccions, promeses, oferiments i decisions en el moment.', 'Am/is/are going to + verb: plans decidits i prediccions amb proves.', 'Present continuous: cites i plans amb data i hora.', 'Negativa de will: won’t (will not).', 'Després de will no hi va «to»: I will go, no I will to go.'],
  ),
  secciones: [
    {
      titulo: L('Cuál usar', 'Which one to use', 'Quin fer servir'),
      tabla: {
        columnas: L(['Forma', 'Cuándo', 'Ejemplo'], ['Form', 'When', 'Example'], ['Forma', 'Quan', 'Exemple']),
        filas: [
          ['will', L('decisión en el momento', 'decision made on the spot', 'decisió en el moment'), 'The phone is ringing. I’ll answer it.'],
          ['will', L('predicción u opinión', 'prediction or opinion', 'predicció o opinió'), 'I think Spain will win.'],
          ['will', L('promesa u ofrecimiento', 'promise or offer', 'promesa o oferiment'), 'I won’t tell anyone.'],
          ['going to', L('plan ya decidido', 'plan already decided', 'pla ja decidit'), 'We’re going to visit Rome this summer.'],
          ['going to', L('predicción con pruebas', 'prediction with evidence', 'predicció amb proves'), 'Be careful! You’re going to fall.'],
          ['present continuous', L('cita o plan con hora y lugar', 'arrangement with a time and place', 'cita o pla amb hora i lloc'), 'I’m seeing the dentist on Monday.'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Completa: «A: I’m cold. B: I ___ close the window.» (will / am going to)', 'Complete: «A: I’m cold. B: I ___ close the window.» (will / am going to)', 'Completa: «A: I’m cold. B: I ___ close the window.» (will / am going to)'),
      s: T('will (I’ll close the window): B lo decide en ese momento, al oír a A.', 'will (I’ll close the window): B decides at that moment, on hearing A.', 'will (I’ll close the window): B ho decideix en aquell moment, en sentir A.') },
    { e: T('Completa: «Look at that car! It ___ crash.» (will / is going to)', 'Complete: «Look at that car! It ___ crash.» (will / is going to)', 'Completa: «Look at that car! It ___ crash.» (will / is going to)'),
      s: T('is going to: es una predicción con pruebas delante (lo estás viendo).', 'is going to: it is a prediction with evidence in front of you (you can see it).', 'is going to: és una predicció amb proves al davant (ho estàs veient).') },
    { e: T('Pon en negativa y en pregunta: «She will come to the party.»', 'Make negative and question forms: «She will come to the party.»', 'Posa en negativa i en pregunta: «She will come to the party.»'),
      s: T('She won’t (will not) come to the party. / Will she come to the party?', 'She won’t (will not) come to the party. / Will she come to the party?', 'She won’t (will not) come to the party. / Will she come to the party?') },
    { e: T('¿Qué forma usarías? «Ya he comprado los billetes: este verano ___ (visit) Londres.»', 'Which form would you use? «I’ve already bought the tickets: this summer I ___ (visit) London.»', 'Quina forma faries servir? «Ja he comprat els bitllets: aquest estiu ___ (visit) Londres.»'),
      s: T('I’m going to visit London (plan decidido) o I’m visiting London (ya está organizado). Will no: no es una decisión del momento.', 'I’m going to visit London (decided plan) or I’m visiting London (already arranged). Not will: it is not an on-the-spot decision.', 'I’m going to visit London (pla decidit) o I’m visiting London (ja està organitzat). Will no: no és una decisió del moment.') },
  ],
}

export const pastContinuous = {
  metaTitle: L('Past continuous en inglés (pasado continuo): cómo se forma y cuándo se usa con when y while — resumen', 'The past continuous: form and use, with when and while — summary and practice questions', 'Past continuous en anglès (passat continu): com es forma i quan s’usa amb when i while — resum i exercicis'),
  metaDesc: L('El pasado continuo en inglés (was/were + -ing): afirmativa, negativa y pregunta, cuándo se usa, la diferencia con el past simple y frases con when y while.', 'The past continuous (was/were + -ing): positive, negative and questions, when to use it, how it differs from the past simple, and sentences with when and while.', 'El passat continu en anglès (was/were + -ing): afirmativa, negativa i pregunta, quan s’usa, la diferència amb el past simple i frases amb when i while.'),
  resumen: L(
    ['El past continuous cuenta una acción que estaba en marcha en un momento del pasado: At eight o’clock I was having dinner. Se forma con was o were y el verbo con -ing. Muchas veces aparece junto al past simple: la acción larga va en continuous y la corta que la interrumpe, en simple (I was walking home when it started to rain).'],
    ['The past continuous describes an action that was in progress at a moment in the past: At eight o’clock I was having dinner. It is formed with was or were and the -ing form of the verb. It often appears with the past simple: the longer action goes in the continuous and the short one that interrupts it in the simple (I was walking home when it started to rain).'],
    ['El past continuous explica una acció que estava en marxa en un moment del passat: At eight o’clock I was having dinner. Es forma amb was o were i el verb amb -ing. Sovint apareix amb el past simple: l’acció llarga va en continuous i la curta que la interromp, en simple (I was walking home when it started to rain).'],
  ),
  puntosClave: L(
    ['Forma: was / were + verbo-ing.', 'I, he, she, it → was; you, we, they → were.', 'Acción en marcha en un momento del pasado.', 'Con when: la acción corta (past simple) interrumpe a la larga (past continuous).', 'Con while: dos acciones largas a la vez (While I was cooking, he was reading).'],
    ['Form: was / were + verb-ing.', 'I, he, she, it → was; you, we, they → were.', 'An action in progress at a moment in the past.', 'With when: the short action (past simple) interrupts the long one (past continuous).', 'With while: two long actions at the same time (While I was cooking, he was reading).'],
    ['Forma: was / were + verb-ing.', 'I, he, she, it → was; you, we, they → were.', 'Acció en marxa en un moment del passat.', 'Amb when: l’acció curta (past simple) interromp la llarga (past continuous).', 'Amb while: dues accions llargues alhora (While I was cooking, he was reading).'],
  ),
  secciones: [
    {
      titulo: L('Cómo se forma', 'How it is formed', 'Com es forma'),
      tabla: {
        columnas: L(['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta'], ['Subject', 'Positive', 'Negative', 'Question'], ['Subjecte', 'Afirmativa', 'Negativa', 'Pregunta']),
        filas: [
          ['I / he / she / it', 'she was playing', 'she wasn’t playing', 'Was she playing?'],
          ['you / we / they', 'they were playing', 'they weren’t playing', 'Were they playing?'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Completa: «I ___ (watch) TV when the phone ___ (ring).»', 'Complete: «I ___ (watch) TV when the phone ___ (ring).»', 'Completa: «I ___ (watch) TV when the phone ___ (ring).»'),
      s: T('I was watching TV when the phone rang. La acción larga (ver la tele) en continuous; la corta que la interrumpe (sonar), en simple.', 'I was watching TV when the phone rang. The long action (watching TV) in the continuous; the short one that interrupts it (ringing) in the simple.', 'I was watching TV when the phone rang. L’acció llarga (mirar la tele) en continuous; la curta que la interromp (sonar), en simple.') },
    { e: T('Completa: «While my brother ___ (study), I ___ (play) video games.»', 'Complete: «While my brother ___ (study), I ___ (play) video games.»', 'Completa: «While my brother ___ (study), I ___ (play) video games.»'),
      s: T('was studying / was playing: dos acciones largas a la vez, unidas por while.', 'was studying / was playing: two long actions at the same time, joined by while.', 'was studying / was playing: dues accions llargues alhora, unides per while.') },
    { e: T('Pon en pregunta: «They were sleeping at midnight.»', 'Make it a question: «They were sleeping at midnight.»', 'Posa en pregunta: «They were sleeping at midnight.»'),
      s: T('Were they sleeping at midnight?', 'Were they sleeping at midnight?', 'Were they sleeping at midnight?') },
    { e: T('¿Past simple o past continuous? «Yesterday I ___ (go) to the cinema.»', 'Past simple or past continuous? «Yesterday I ___ (go) to the cinema.»', 'Past simple o past continuous? «Yesterday I ___ (go) to the cinema.»'),
      s: T('went (past simple): es una acción terminada, sin un momento concreto en el que estuviera en marcha.', 'went (past simple): it is a finished action, with no particular moment when it was in progress.', 'went (past simple): és una acció acabada, sense un moment concret en què estigués en marxa.') },
  ],
}

export const pronouns = {
  metaTitle: L('Los pronombres en inglés: personales, de objeto, posesivos y reflexivos (tabla) — resumen y ejercicios', 'English pronouns: subject, object, possessive and reflexive (table) — summary and practice questions', 'Els pronoms en anglès: personals, d’objecte, possessius i reflexius (taula) — resum i exercicis'),
  metaDesc: L('La tabla de los pronombres en inglés (I, me, my, mine, myself…), cuándo se usa cada uno y los errores más comunes, con ejercicios resueltos.', 'The table of English pronouns (I, me, my, mine, myself…), when to use each one and the most common mistakes, with worked exercises.', 'La taula dels pronoms en anglès (I, me, my, mine, myself…), quan s’usa cadascun i els errors més comuns, amb exercicis resolts.'),
  resumen: L(
    ['Los pronombres sustituyen a un nombre. En inglés cambian según su función: de sujeto antes del verbo (She likes music), de objeto después del verbo o de una preposición (I like her), adjetivos posesivos delante de un nombre (her book), pronombres posesivos solos (The book is hers) y reflexivos cuando la acción vuelve sobre el sujeto (She hurt herself).', 'El sujeto casi nunca se puede omitir en inglés, aunque en castellano sí: «Llueve» es It’s raining, y «Es tarde», It’s late.'],
    ['Pronouns replace a noun. In English they change with their job: subject before the verb (She likes music), object after a verb or preposition (I like her), possessive adjectives before a noun (her book), possessive pronouns on their own (The book is hers) and reflexives when the action goes back to the subject (She hurt herself).', 'The subject can almost never be left out in English, unlike in Spanish: «Llueve» is It’s raining, and «Es tarde» is It’s late.'],
    ['Els pronoms substitueixen un nom. En anglès canvien segons la funció: de subjecte davant del verb (She likes music), d’objecte després del verb o d’una preposició (I like her), adjectius possessius davant d’un nom (her book), pronoms possessius sols (The book is hers) i reflexius quan l’acció torna sobre el subjecte (She hurt herself).', 'El subjecte gairebé mai no es pot ometre en anglès, tot i que en català sí: «Plou» és It’s raining, i «És tard», It’s late.'],
  ),
  puntosClave: L(
    ['Sujeto: I, you, he, she, it, we, they.', 'Objeto: me, you, him, her, it, us, them.', 'Adjetivo posesivo (+ nombre): my, your, his, her, its, our, their.', 'Pronombre posesivo (solo): mine, yours, his, hers, ours, theirs.', 'Reflexivo: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.', '«Its» (de it) no lleva apóstrofo; «it’s» es it is.'],
    ['Subject: I, you, he, she, it, we, they.', 'Object: me, you, him, her, it, us, them.', 'Possessive adjective (+ noun): my, your, his, her, its, our, their.', 'Possessive pronoun (alone): mine, yours, his, hers, ours, theirs.', 'Reflexive: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.', '«Its» (of it) has no apostrophe; «it’s» means it is.'],
    ['Subjecte: I, you, he, she, it, we, they.', 'Objecte: me, you, him, her, it, us, them.', 'Adjectiu possessiu (+ nom): my, your, his, her, its, our, their.', 'Pronom possessiu (sol): mine, yours, his, hers, ours, theirs.', 'Reflexiu: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.', '«Its» (d’it) no porta apòstrof; «it’s» és it is.'],
  ),
  secciones: [
    {
      titulo: L('La tabla completa', 'The full table', 'La taula completa'),
      tabla: {
        columnas: L(['Sujeto', 'Objeto', 'Adj. posesivo', 'Pron. posesivo', 'Reflexivo'], ['Subject', 'Object', 'Possessive adj.', 'Possessive pron.', 'Reflexive'], ['Subjecte', 'Objecte', 'Adj. possessiu', 'Pron. possessiu', 'Reflexiu']),
        filas: [
          ['I', 'me', 'my', 'mine', 'myself'],
          ['you', 'you', 'your', 'yours', 'yourself'],
          ['he', 'him', 'his', 'his', 'himself'],
          ['she', 'her', 'her', 'hers', 'herself'],
          ['it', 'it', 'its', '—', 'itself'],
          ['we', 'us', 'our', 'ours', 'ourselves'],
          ['you', 'you', 'your', 'yours', 'yourselves'],
          ['they', 'them', 'their', 'theirs', 'themselves'],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Completa: «Can you help ___ (I)? ___ (I) can’t open the door.»', 'Complete: «Can you help ___ (I)? ___ (I) can’t open the door.»', 'Completa: «Can you help ___ (I)? ___ (I) can’t open the door.»'),
      s: T('me / I: después del verbo help va el pronombre de objeto (me); delante de can’t, el de sujeto (I).', 'me / I: after the verb help comes the object pronoun (me); before can’t, the subject pronoun (I).', 'me / I: després del verb help va el pronom d’objecte (me); davant de can’t, el de subjecte (I).') },
    { e: T('Completa: «This isn’t my pen. It’s ___ (she).»', 'Complete: «This isn’t my pen. It’s ___ (she).»', 'Completa: «This isn’t my pen. It’s ___ (she).»'),
      s: T('hers: va solo, sin nombre detrás, así que es el pronombre posesivo.', 'hers: it stands alone, with no noun after it, so it is the possessive pronoun.', 'hers: va sol, sense nom al darrere, així que és el pronom possessiu.') },
    { e: T('Completa: «They enjoyed ___ at the party.»', 'Complete: «They enjoyed ___ at the party.»', 'Completa: «They enjoyed ___ at the party.»'),
      s: T('themselves: la acción vuelve sobre el sujeto (they), así que va el reflexivo.', 'themselves: the action goes back to the subject (they), so the reflexive is needed.', 'themselves: l’acció torna sobre el subjecte (they), així que hi va el reflexiu.') },
    { e: T('¿«its» o «it’s»? «The dog wagged ___ tail. ___ a happy dog.»', '«its» or «it’s»? «The dog wagged ___ tail. ___ a happy dog.»', '«its» o «it’s»? «The dog wagged ___ tail. ___ a happy dog.»'),
      s: T('its (posesivo: su cola) / It’s (it is: es un perro feliz).', 'its (possessive: its tail) / It’s (it is: it is a happy dog).', 'its (possessiu: la seva cua) / It’s (it is: és un gos feliç).') },
  ],
}

export const tiposTexto = {
  metaTitle: L('Los tipos de texto: narrativo, descriptivo, expositivo, argumentativo, dialogado e instructivo — resumen', 'Text types: narrative, descriptive, expository, argumentative, dialogue and instructions — summary and practice', 'Els tipus de text: narratiu, descriptiu, expositiu, argumentatiu, dialogat i instructiu — resum i exercicis'),
  metaDesc: L('Los tipos de texto explicados con sus rasgos y ejemplos: narración, descripción, exposición, argumentación, diálogo e instrucciones, con ejercicios resueltos.', 'Text types explained with their features and examples: narration, description, exposition, argument, dialogue and instructions, with worked exercises.', 'Els tipus de text explicats amb els seus trets i exemples: narració, descripció, exposició, argumentació, diàleg i instruccions, amb exercicis resolts.'),
  resumen: L(
    ['Cada texto tiene una intención, y según ella cambia su forma. Si cuenta hechos que pasan uno tras otro, es narrativo; si dice cómo es algo, descriptivo; si explica un tema para que se entienda, expositivo; si defiende una opinión para convencer, argumentativo; si reproduce una conversación, dialogado; y si da pasos u órdenes, instructivo.', 'Los tipos casi nunca aparecen puros: una novela narra, describe y tiene diálogos; un artículo de opinión expone datos para argumentar. Para clasificar un texto hay que fijarse en lo que predomina y en para qué se escribió.'],
    ['Every text has a purpose, and its form changes with it. If it tells events one after another, it is narrative; if it says what something is like, descriptive; if it explains a topic so it can be understood, expository; if it defends an opinion to persuade, argumentative; if it reproduces a conversation, dialogue; and if it gives steps or orders, instructive.', 'The types hardly ever appear pure: a novel narrates, describes and has dialogue; an opinion piece sets out facts in order to argue. To classify a text, look at what dominates and why it was written.'],
    ['Cada text té una intenció, i segons aquesta en canvia la forma. Si explica fets que passen l’un rere l’altre, és narratiu; si diu com és una cosa, descriptiu; si explica un tema perquè s’entengui, expositiu; si defensa una opinió per convèncer, argumentatiu; si reprodueix una conversa, dialogat; i si dona passos o ordres, instructiu.', 'Els tipus gairebé mai no apareixen purs: una novel·la narra, descriu i té diàlegs; un article d’opinió exposa dades per argumentar. Per classificar un text cal fixar-se en el que predomina i en per a què es va escriure.'],
  ),
  puntosClave: L(
    ['Narrativo: cuenta hechos; narrador, personajes, tiempo y lugar; planteamiento, nudo y desenlace.', 'Descriptivo: dice cómo es algo; muchos adjetivos.', 'Expositivo: explica un tema de forma objetiva; introducción, desarrollo y conclusión.', 'Argumentativo: defiende una tesis con argumentos para convencer.', 'Dialogado: varias voces que hablan por turnos (teatro, entrevista).', 'Instructivo: pasos u órdenes, con imperativo o infinitivo (receta, manual).'],
    ['Narrative: tells events; narrator, characters, time and place; beginning, complication and resolution.', 'Descriptive: says what something is like; lots of adjectives.', 'Expository: explains a topic objectively; introduction, body and conclusion.', 'Argumentative: defends a thesis with arguments to persuade.', 'Dialogue: several voices taking turns (drama, interview).', 'Instructive: steps or orders, in the imperative or infinitive (recipe, manual).'],
    ['Narratiu: explica fets; narrador, personatges, temps i lloc; plantejament, nus i desenllaç.', 'Descriptiu: diu com és una cosa; molts adjectius.', 'Expositiu: explica un tema de manera objectiva; introducció, desenvolupament i conclusió.', 'Argumentatiu: defensa una tesi amb arguments per convèncer.', 'Dialogat: diverses veus que parlen per torns (teatre, entrevista).', 'Instructiu: passos o ordres, amb imperatiu o infinitiu (recepta, manual).'],
  ),
  secciones: [
    {
      titulo: L('Los seis tipos', 'The six types', 'Els sis tipus'),
      tabla: {
        columnas: L(['Tipo', 'Para qué', 'Rasgos', 'Ejemplos'], ['Type', 'Purpose', 'Features', 'Examples'], ['Tipus', 'Per a què', 'Trets', 'Exemples']),
        filas: [
          [L('Narrativo', 'Narrative', 'Narratiu'), L('contar hechos', 'to tell events', 'explicar fets'), L('verbos de acción en pasado, conectores de tiempo (después, de pronto)', 'action verbs in the past, time connectives (then, suddenly)', 'verbs d’acció en passat, connectors de temps (després, de sobte)'), L('cuento, novela, noticia', 'short story, novel, news report', 'conte, novel·la, notícia')],
          [L('Descriptivo', 'Descriptive', 'Descriptiu'), L('decir cómo es algo', 'to say what something is like', 'dir com és una cosa'), L('adjetivos, comparaciones, verbos ser y estar', 'adjectives, similes, verbs like «to be»', 'adjectius, comparacions, verbs ser i estar'), L('retrato, guía de viaje', 'portrait, travel guide', 'retrat, guia de viatge')],
          [L('Expositivo', 'Expository', 'Expositiu'), L('explicar e informar', 'to explain and inform', 'explicar i informar'), L('lenguaje objetivo, tecnicismos, presente, esquemas y ejemplos', 'objective language, technical words, present tense, diagrams and examples', 'llenguatge objectiu, tecnicismes, present, esquemes i exemples'), L('libro de texto, enciclopedia', 'textbook, encyclopaedia', 'llibre de text, enciclopèdia')],
          [L('Argumentativo', 'Argumentative', 'Argumentatiu'), L('convencer', 'to persuade', 'convèncer'), L('tesis + argumentos (datos, ejemplos, citas de expertos) + conclusión; conectores como «por tanto», «sin embargo»', 'thesis + arguments (facts, examples, expert quotes) + conclusion; connectives like «therefore», «however»', 'tesi + arguments (dades, exemples, cites d’experts) + conclusió; connectors com «per tant», «tanmateix»'), L('artículo de opinión, debate, anuncio', 'opinion piece, debate, advert', 'article d’opinió, debat, anunci')],
          [L('Dialogado', 'Dialogue', 'Dialogat'), L('reproducir una conversación', 'to reproduce a conversation', 'reproduir una conversa'), L('turnos de palabra, rayas o nombres de personajes, preguntas', 'turn-taking, dashes or character names, questions', 'torns de paraula, ratlles o noms de personatges, preguntes'), L('obra de teatro, entrevista', 'play, interview', 'obra de teatre, entrevista')],
          [L('Instructivo', 'Instructive', 'Instructiu'), L('indicar cómo hacer algo', 'to show how to do something', 'indicar com fer una cosa'), L('imperativo o infinitivo, pasos numerados', 'imperative or infinitive, numbered steps', 'imperatiu o infinitiu, passos numerats'), L('receta, manual, normas', 'recipe, manual, rules', 'recepta, manual, normes')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('¿Qué tipo de texto es? «El corazón es un músculo con cuatro cavidades que bombea la sangre por todo el cuerpo.»', 'Which text type is it? «El corazón es un músculo con cuatro cavidades que bombea la sangre por todo el cuerpo.»', 'Quin tipus de text és? «El corazón es un músculo con cuatro cavidades que bombea la sangre por todo el cuerpo.»'),
      s: T('Expositivo: explica un tema de forma objetiva, con un tecnicismo (cavidades) y en presente.', 'Expository: it explains a topic objectively, with a technical word (cavidades) and in the present tense.', 'Expositiu: explica un tema de manera objectiva, amb un tecnicisme (cavidades) i en present.') },
    { e: T('¿Qué tipo de texto es? «Los deberes deberían limitarse: los niños necesitan tiempo para jugar, y varios estudios muestran que más deberes no significa mejores notas.»', 'Which text type is it? «Los deberes deberían limitarse: los niños necesitan tiempo para jugar, y varios estudios muestran que más deberes no significa mejores notas.»', 'Quin tipus de text és? «Los deberes deberían limitarse: los niños necesitan tiempo para jugar, y varios estudios muestran que más deberes no significa mejores notas.»'),
      s: T('Argumentativo: hay una tesis (los deberes deberían limitarse) y dos argumentos, uno de ellos basado en estudios.', 'Argumentative: there is a thesis (homework should be limited) and two arguments, one of them based on studies.', 'Argumentatiu: hi ha una tesi (els deures s’haurien de limitar) i dos arguments, un d’ells basat en estudis.') },
    { e: T('¿Qué tipo de texto es? «Bate los huevos, añade la harina poco a poco y hornea 20 minutos a 180 °C.»', 'Which text type is it? «Bate los huevos, añade la harina poco a poco y hornea 20 minutos a 180 °C.»', 'Quin tipus de text és? «Bate los huevos, añade la harina poco a poco y hornea 20 minutos a 180 °C.»'),
      s: T('Instructivo: da pasos en imperativo (bate, añade, hornea).', 'Instructive: it gives steps in the imperative (bate, añade, hornea).', 'Instructiu: dona passos en imperatiu (bate, añade, hornea).') },
    { e: T('Ordena las partes de una narración: desenlace, planteamiento, nudo.', 'Order the parts of a narrative: resolution, beginning, complication.', 'Ordena les parts d’una narració: desenllaç, plantejament, nus.'),
      s: T('Planteamiento (presenta personajes y situación) → nudo (surge el problema) → desenlace (se resuelve).', 'Beginning (introduces characters and situation) → complication (the problem arises) → resolution (it is solved).', 'Plantejament (presenta personatges i situació) → nus (sorgeix el problema) → desenllaç (es resol).') },
  ],
}

export const provincias = {
  metaTitle: L('Las provincias de España y sus comunidades autónomas: las 50 provincias y sus capitales — resumen', 'Spain’s provinces and autonomous communities: all 50 provinces and their capitals — summary and practice', 'Les províncies d’Espanya i les seves comunitats autònomes: les 50 províncies i les capitals — resum'),
  metaDesc: L('Las 50 provincias de España ordenadas por comunidad autónoma, con la capital de cada comunidad, las provincias cuya capital tiene otro nombre y ejercicios resueltos.', 'Spain’s 50 provinces listed by autonomous community, with each community’s capital, the provinces whose capital has a different name, and worked exercises.', 'Les 50 províncies d’Espanya ordenades per comunitat autònoma, amb la capital de cada comunitat, les províncies amb capital de nom diferent i exercicis resolts.'),
  resumen: L(
    ['España se organiza en 17 comunidades autónomas y 2 ciudades autónomas (Ceuta y Melilla). Las comunidades se dividen a su vez en 50 provincias, que se crearon en 1833 y casi siempre llevan el nombre de su capital. Siete comunidades tienen una sola provincia (uniprovinciales) y la que más tiene es Castilla y León, con nueve.'],
    ['Spain is organised into 17 autonomous communities and 2 autonomous cities (Ceuta and Melilla). The communities are in turn divided into 50 provinces, created in 1833, which almost always take the name of their capital. Seven communities have just one province, and the one with the most is Castile and León, with nine.'],
    ['Espanya s’organitza en 17 comunitats autònomes i 2 ciutats autònomes (Ceuta i Melilla). Les comunitats es divideixen al seu torn en 50 províncies, creades el 1833, que gairebé sempre porten el nom de la capital. Set comunitats tenen una sola província (uniprovincials) i la que en té més és Castella i Lleó, amb nou.'],
  ),
  puntosClave: L(
    ['17 comunidades autónomas, 50 provincias y 2 ciudades autónomas (Ceuta y Melilla).', 'Castilla y León es la comunidad con más provincias (9); Andalucía tiene 8.', 'Uniprovinciales: Asturias, Cantabria, La Rioja, Navarra, Madrid, Murcia e Illes Balears.', 'Canarias tiene dos provincias y dos capitales: Las Palmas de Gran Canaria y Santa Cruz de Tenerife.', 'Las provincias se crearon en 1833 (reforma de Javier de Burgos).'],
    ['17 autonomous communities, 50 provinces and 2 autonomous cities (Ceuta and Melilla).', 'Castile and León has the most provinces (9); Andalusia has 8.', 'Single-province communities: Asturias, Cantabria, La Rioja, Navarre, Madrid, Murcia and the Balearic Islands.', 'The Canary Islands have two provinces and two capitals: Las Palmas de Gran Canaria and Santa Cruz de Tenerife.', 'The provinces were created in 1833 (Javier de Burgos’s reform).'],
    ['17 comunitats autònomes, 50 províncies i 2 ciutats autònomes (Ceuta i Melilla).', 'Castella i Lleó és la comunitat amb més províncies (9); Andalusia en té 8.', 'Uniprovincials: Astúries, Cantàbria, la Rioja, Navarra, Madrid, Múrcia i les Illes Balears.', 'Canàries té dues províncies i dues capitals: Las Palmas de Gran Canaria i Santa Cruz de Tenerife.', 'Les províncies es van crear el 1833 (reforma de Javier de Burgos).'],
  ),
  secciones: [
    {
      titulo: L('Comunidades y provincias', 'Communities and provinces', 'Comunitats i províncies'),
      tabla: {
        columnas: L(['Comunidad', 'Provincias', 'Capital de la comunidad'], ['Community', 'Provinces', 'Capital of the community'], ['Comunitat', 'Províncies', 'Capital de la comunitat']),
        filas: [
          ['Andalucía', 'Almería, Cádiz, Córdoba, Granada, Huelva, Jaén, Málaga, Sevilla', 'Sevilla'],
          ['Aragón', 'Huesca, Teruel, Zaragoza', 'Zaragoza'],
          [L('Principado de Asturias', 'Asturias', 'Principat d’Astúries'), 'Asturias', 'Oviedo'],
          ['Illes Balears', 'Illes Balears', 'Palma'],
          ['Canarias', 'Las Palmas, Santa Cruz de Tenerife', L('Las Palmas de Gran Canaria y Santa Cruz de Tenerife (compartida)', 'Las Palmas de Gran Canaria and Santa Cruz de Tenerife (shared)', 'Las Palmas de Gran Canaria i Santa Cruz de Tenerife (compartida)')],
          ['Cantabria', 'Cantabria', 'Santander'],
          ['Castilla-La Mancha', 'Albacete, Ciudad Real, Cuenca, Guadalajara, Toledo', 'Toledo'],
          ['Castilla y León', 'Ávila, Burgos, León, Palencia, Salamanca, Segovia, Soria, Valladolid, Zamora', L('Valladolid (sede de las instituciones)', 'Valladolid (seat of its institutions)', 'Valladolid (seu de les institucions)')],
          ['Cataluña', 'Barcelona, Girona, Lleida, Tarragona', 'Barcelona'],
          [L('Comunidad Valenciana', 'Valencian Community', 'Comunitat Valenciana'), 'Alicante, Castellón, Valencia', 'Valencia'],
          ['Extremadura', 'Badajoz, Cáceres', 'Mérida'],
          ['Galicia', 'A Coruña, Lugo, Ourense, Pontevedra', 'Santiago de Compostela'],
          [L('Comunidad de Madrid', 'Community of Madrid', 'Comunitat de Madrid'), 'Madrid', 'Madrid'],
          [L('Región de Murcia', 'Region of Murcia', 'Regió de Múrcia'), 'Murcia', 'Murcia'],
          [L('Comunidad Foral de Navarra', 'Navarre', 'Comunitat Foral de Navarra'), 'Navarra', 'Pamplona'],
          [L('País Vasco', 'Basque Country', 'País Basc'), 'Álava, Gipuzkoa, Bizkaia', L('Vitoria-Gasteiz (sede de las instituciones)', 'Vitoria-Gasteiz (seat of its institutions)', 'Vitòria-Gasteiz (seu de les institucions)')],
          ['La Rioja', 'La Rioja', 'Logroño'],
        ],
      },
      texto: L(
        ['Casi todas las provincias se llaman como su capital. Las que no: Asturias (Oviedo), Illes Balears (Palma), Cantabria (Santander), Navarra (Pamplona), La Rioja (Logroño), Álava (Vitoria-Gasteiz), Gipuzkoa (San Sebastián) y Bizkaia (Bilbao).'],
        ['Almost every province is named after its capital. The exceptions: Asturias (Oviedo), the Balearic Islands (Palma), Cantabria (Santander), Navarre (Pamplona), La Rioja (Logroño), Álava (Vitoria-Gasteiz), Gipuzkoa (San Sebastián) and Bizkaia (Bilbao).'],
        ['Gairebé totes les províncies es diuen com la capital. Les que no: Astúries (Oviedo), Illes Balears (Palma), Cantàbria (Santander), Navarra (Pamplona), la Rioja (Logronyo), Àlaba (Vitòria-Gasteiz), Guipúscoa (Sant Sebastià) i Biscaia (Bilbao).'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Cuántas provincias tienen Andalucía, Cataluña y Galicia?', 'How many provinces do Andalusia, Catalonia and Galicia have?', 'Quantes províncies tenen Andalusia, Catalunya i Galícia?'),
      s: T('Andalucía, 8; Cataluña, 4; Galicia, 4.', 'Andalusia, 8; Catalonia, 4; Galicia, 4.', 'Andalusia, 8; Catalunya, 4; Galícia, 4.') },
    { e: T('¿A qué comunidad pertenecen Soria, Cuenca y Teruel?', 'Which community do Soria, Cuenca and Teruel belong to?', 'A quina comunitat pertanyen Sòria, Conca i Terol?'),
      s: T('Soria, a Castilla y León; Cuenca, a Castilla-La Mancha; Teruel, a Aragón.', 'Soria to Castile and León; Cuenca to Castile-La Mancha; Teruel to Aragon.', 'Sòria, a Castella i Lleó; Conca, a Castella-la Manxa; Terol, a l’Aragó.') },
    { e: T('Di las siete comunidades uniprovinciales.', 'Name the seven single-province communities.', 'Digues les set comunitats uniprovincials.'),
      s: T('Asturias, Cantabria, La Rioja, Navarra, Comunidad de Madrid, Región de Murcia e Illes Balears.', 'Asturias, Cantabria, La Rioja, Navarre, the Community of Madrid, the Region of Murcia and the Balearic Islands.', 'Astúries, Cantàbria, la Rioja, Navarra, Comunitat de Madrid, Regió de Múrcia i Illes Balears.') },
    { e: T('Comprueba que salen 50: suma las provincias de todas las comunidades.', 'Check that it makes 50: add up the provinces of every community.', 'Comprova que en surten 50: suma les províncies de totes les comunitats.'),
      s: T('8 + 3 + 1 + 1 + 2 + 1 + 5 + 9 + 4 + 3 + 2 + 4 + 1 + 1 + 1 + 3 + 1 = 50.', '8 + 3 + 1 + 1 + 2 + 1 + 5 + 9 + 4 + 3 + 2 + 4 + 1 + 1 + 1 + 3 + 1 = 50.', '8 + 3 + 1 + 1 + 2 + 1 + 5 + 9 + 4 + 3 + 2 + 4 + 1 + 1 + 1 + 3 + 1 = 50.') },
  ],
}
