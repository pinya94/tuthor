function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('sx-01', 'primaria',
    { es: '¿Qué es el sujeto de una oración?', en: 'What is the subject of a sentence?', ca: 'Què és el subjecte d\'una oració?' },
    { es: ['El verbo principal', 'De quién o de qué trata la oración', 'El objeto de la acción', 'El lugar donde ocurre la acción'], en: ['The main verb', 'Who or what the sentence is about', 'The object of the action', 'The place where the action occurs'], ca: ['El verb principal', 'De qui o de què tracta l\'oració', 'L\'objecte de l\'acció', 'El lloc on ocorre l\'acció'] },
    1, '🔍',
    { es: 'El sujeto es de quien o de qué habla el verbo. En "María come manzanas", el sujeto es "María". Se puede encontrar preguntando: ¿Quién come? → María.', en: 'The subject is who or what the verb is about. In "María come manzanas", the subject is "María". Ask: ¿Quién come? → María.', ca: 'El subjecte és de qui o de què parla el verb. En "La Maria menja pomes", el subjecte és "la Maria".' }),

  q('sx-02', 'primaria',
    { es: 'En "Los niños juegan en el parque", ¿cuál es el sujeto?', en: 'In "Los niños juegan en el parque", what is the subject?', ca: 'En "Els nens juguen al parc", quin és el subjecte?' },
    { es: ['juegan', 'en el parque', 'Los niños', 'parque'], en: ['play', 'in the park', 'The children', 'park'], ca: ['juguen', 'al parc', 'Els nens', 'parc'] },
    2, '⚽',
    { es: '"Los niños" es el sujeto. Pregunta: ¿Quiénes juegan? → Los niños. El sujeto concuerda con el verbo en número y persona.', en: '"Los niños" (the children) is the subject. Ask: Who plays? → Los niños.', ca: '"Els nens" és el subjecte. Pregunta: Qui juga? → Els nens.' }),

  q('sx-03', 'primaria',
    { es: '¿Qué es el predicado?', en: 'What is the predicate?', ca: 'Què és el predicat?' },
    { es: ['Solo el verbo', 'El sujeto y el verbo', 'Todo lo que se dice del sujeto (incluye el verbo)', 'Solo los complementos'], en: ['Only the verb', 'The subject and the verb', 'Everything said about the subject (including the verb)', 'Only the complements'], ca: ['Només el verb', 'El subjecte i el verb', 'Tot el que es diu del subjecte (inclou el verb)', 'Només els complements'] },
    2, '🗣️',
    { es: 'El predicado es todo lo que se dice del sujeto, incluido el verbo y sus complementos. En "María come manzanas en el parque", el predicado es "come manzanas en el parque".', en: 'The predicate is everything said about the subject, including verb and complements. In "María come manzanas en el parque", the predicate is "come manzanas en el parque".', ca: 'El predicat és tot el que es diu del subjecte, inclòs el verb i els complements.' }),

  q('sx-04', 'primaria',
    { es: 'En "Ella compró un libro", ¿cuál es el complemento directo?', en: 'In "Ella compró un libro", what is the direct object?', ca: 'En "Ella va comprar un llibre", quin és el complement directe?' },
    { es: ['Ella', 'compró', 'un libro', 'ninguno'], en: ['She', 'bought', 'a book', 'none'], ca: ['Ella', 'va comprar', 'un llibre', 'cap'] },
    2, '📚',
    { es: '"Un libro" es el complemento directo. Pregunta: ¿Qué compró? → un libro. El CD recibe directamente la acción del verbo y se sustituye por lo/la/los/las.', en: '"Un libro" is the direct object. Ask: What did she buy? → a book. The DO receives the verb\'s action directly.', ca: '"Un llibre" és el complement directe. Pregunta: Què va comprar? → un llibre.' }),

  q('sx-05', 'primaria',
    { es: '¿Cómo se identifica el complemento directo (CD)?', en: 'How do you identify the direct object?', ca: 'Com s\'identifica el complement directe?' },
    { es: ['Preguntando ¿dónde?', 'Sustituyéndolo por le/les', 'Preguntando ¿qué? o ¿a quién? y sustituyendo por lo/la', 'Preguntando ¿cuándo?'], en: ['Asking where?', 'Replacing with le/les', 'Asking what? or who? and replacing with lo/la', 'Asking when?'], ca: ['Preguntant on?', 'Substituint per li/els', 'Preguntant què? o a qui? i substituint per el/la', 'Preguntant quan?'] },
    2, '🎯',
    { es: 'CD: responde a ¿qué? o ¿a quién? y se puede sustituir por lo/la/los/las. "Comí una pizza" → ¿Qué comí? → una pizza → la comí. ✓ Es CD.', en: 'DO: answers what? or who? and can be replaced by lo/la/los/las. "I ate a pizza" → ¿Qué comí? → pizza → la comí. ✓ It\'s a DO.', ca: 'CD: respon a "què?" o "a qui?" i es pot substituir per el/la/els/les.' }),

  q('sx-06', 'eso',
    { es: 'En "Di el libro a María", ¿cuál es el complemento indirecto?', en: 'In "Di el libro a María", what is the indirect object?', ca: 'En "Vaig donar el llibre a la Maria", quin és el complement indirecte?' },
    { es: ['el libro', 'di', 'a María', 'ninguno'], en: ['the book', 'gave', 'to María', 'none'], ca: ['el llibre', 'vaig donar', 'a la Maria', 'cap'] },
    2, '🎁',
    { es: '"A María" es el complemento indirecto. Pregunta: ¿A quién di el libro? → a María. El CI se sustituye por le/les. "Le di el libro."', en: '"A María" is the indirect object. Ask: To whom did I give the book? → to María. IO replaced by le/les.', ca: '"A la Maria" és el complement indirecte. Pregunta: A qui vaig donar el llibre? → a la Maria.' }),

  q('sx-07', 'eso',
    { es: '¿Qué es un complemento circunstancial?', en: 'What is a circumstantial complement?', ca: 'Què és un complement circumstancial?' },
    { es: ['El que recibe la acción del verbo', 'El que indica las circunstancias de la acción (lugar, tiempo, modo...)', 'El sujeto cuando va detrás del verbo', 'El atributo del predicado nominal'], en: ['The one that receives the verb\'s action', 'The one indicating circumstances of the action (place, time, manner...)', 'The subject when it comes after the verb', 'The attribute of the nominal predicate'], ca: ['El que rep l\'acció del verb', 'El que indica les circumstàncies de l\'acció (lloc, temps, manera...)', 'El subjecte quan va darrere del verb', 'L\'atribut del predicat nominal'] },
    1, '🗺️',
    { es: 'El CC indica las circunstancias de la acción: de lugar (dónde), tiempo (cuándo), modo (cómo), causa (por qué), etc. "Estudió ayer en su cuarto" → "ayer" = CC de tiempo; "en su cuarto" = CC de lugar.', en: 'The CC indicates action circumstances: place (where), time (when), manner (how), cause (why). "He studied yesterday in his room" → "yesterday" = CC time; "in his room" = CC place.', ca: 'El CC indica les circumstàncies de l\'acció: lloc (on), temps (quan), manera (com), causa (per què).' }),

  q('sx-08', 'eso',
    { es: 'En "El cielo es azul", ¿qué función tiene "azul"?', en: 'In "El cielo es azul", what is the function of "azul"?', ca: 'En "El cel és blau", quina funció té "blau"?' },
    { es: ['Complemento directo', 'Complemento indirecto', 'Atributo', 'Complemento circunstancial'], en: ['Direct object', 'Indirect object', 'Attribute/Predicative complement', 'Circumstantial complement'], ca: ['Complement directe', 'Complement indirecte', 'Atribut', 'Complement circumstancial'] },
    2, '🔵',
    { es: '"Azul" es el atributo. Los verbos copulativos (ser, estar, parecer) + adjetivo o sustantivo → ese adjetivo/sustantivo es el atributo. "El cielo es azul" = predicado nominal.', en: '"Azul" is the attribute (predicative complement). Copulative verbs (ser, estar, parecer) + adjective/noun → attribute. "El cielo es azul" = nominal predicate.', ca: '"Blau" és l\'atribut. Els verbs copulatius (ser, estar, semblar) + adjectiu → atribut.' }),

  q('sx-09', 'eso',
    { es: 'Identifica el tipo de oración: "El ladrón fue detenido por la policía."', en: 'Identify the type of sentence: "El ladrón fue detenido por la policía."', ca: 'Identifica el tipus d\'oració: "El lladre va ser detingut per la policia."' },
    { es: ['Activa', 'Pasiva', 'Impersonal', 'Atributiva'], en: ['Active', 'Passive', 'Impersonal', 'Attributive'], ca: ['Activa', 'Passiva', 'Impersonal', 'Atributiva'] },
    1, '👮',
    { es: 'Oración pasiva: sujeto paciente ("el ladrón") + ser + participio ("detenido") + complemento agente ("por la policía"). El sujeto gramatical recibe la acción.', en: 'Passive sentence: patient subject ("el ladrón") + ser + past participle ("detenido") + agent complement ("por la policía").', ca: 'Oració passiva: subjecte pacient + ser + participi + complement agent.' }),

  q('sx-10', 'eso',
    { es: '¿Cuál de estas oraciones es impersonal?', en: 'Which of these sentences is impersonal?', ca: 'Quina d\'aquestes oracions és impersonal?' },
    { es: ['Ella llueve mucho.', 'Llueve mucho.', 'El cielo llueve.', 'Nosotros llovemos.'], en: ['She rains a lot.', 'It rains a lot.', 'The sky rains.', 'We rain.'], ca: ['Ella plou molt.', 'Plou molt.', 'El cel plou.', 'Nosaltres plovem.'] },
    1, '🌧️',
    { es: '"Llueve" es una oración impersonal: no tiene sujeto gramatical. Los verbos meteorológicos (llover, nevar, tronar, amanecer) son impersonales en español.', en: '"Llueve" is impersonal: no grammatical subject. Meteorological verbs (llover, nevar, tronar) are impersonal in Spanish.', ca: '"Plou" és impersonal: no té subjecte gramatical. Els verbs meteorològics (ploure, nevar, tronar) són impersonals.' }),

  q('sx-11', 'eso',
    { es: '¿Qué tipo de oración compuesta es "Estudié mucho, pero suspendí"?', en: 'What type of compound sentence is "Estudié mucho, pero suspendí"?', ca: 'Quin tipus d\'oració composta és "Vaig estudiar molt, però vaig suspendre"?' },
    { es: ['Subordinada', 'Yuxtapuesta', 'Coordinada adversativa', 'Coordinada copulativa'], en: ['Subordinate', 'Juxtaposed', 'Adversative coordinate', 'Copulative coordinate'], ca: ['Subordinada', 'Juxtaposada', 'Coordinada adversativa', 'Coordinada copulativa'] },
    2, '⚖️',
    { es: 'Oración coordinada adversativa: dos proposiciones unidas por "pero", "sino", "aunque", "sin embargo". Las dos proposiciones tienen sentido opuesto.', en: 'Adversative coordinate sentence: two clauses joined by "pero" (but), expressing opposition.', ca: 'Oració coordinada adversativa: dues proposicions unides per "però", "sinó", "tanmateix".' }),

  q('sx-12', 'eso',
    { es: 'En "Creo que mañana lloverá", ¿qué tipo de oración subordinada es "que mañana lloverá"?', en: 'In "Creo que mañana lloverá", what type of subordinate clause is "que mañana lloverá"?', ca: 'En "Crec que demà plourà", quin tipus de clàusula subordinada és "que demà plourà"?' },
    { es: ['Adjetiva', 'Adverbial', 'Sustantiva', 'Nominal de relativo'], en: ['Adjective clause', 'Adverbial clause', 'Noun clause', 'Nominal relative clause'], ca: ['Adjectiva', 'Adverbial', 'Substantiva', 'Nominal de relatiu'] },
    2, '💭',
    { es: 'Oración subordinada sustantiva: funciona como sustantivo (puede ser sujeto, CD, etc.). "Que mañana lloverá" = CD de "creo" (¿Qué creo? → que lloverá).', en: 'Noun clause: functions as a noun (can be subject, DO, etc.). "Que mañana lloverá" = DO of "creo" (What do I believe? → that it will rain).', ca: 'Clàusula subordinada substantiva: funciona com a substantiu. "Que demà plourà" = CD de "crec".' }),

  q('sx-13', 'eso',
    { es: '"El hombre que vive al lado es médico." ¿Qué tipo de subordinada es "que vive al lado"?', en: '"El hombre que vive al lado es médico." What type of subordinate clause is "que vive al lado"?', ca: '"L\'home que viu al costat és metge." Quin tipus de clàusula és "que viu al costat"?' },
    { es: ['Sustantiva', 'Adjetiva (de relativo)', 'Adverbial de lugar', 'Coordinada'], en: ['Noun clause', 'Adjective (relative) clause', 'Adverbial of place', 'Coordinate clause'], ca: ['Substantiva', 'Adjectiva (de relatiu)', 'Adverbial de lloc', 'Coordinada'] },
    1, '👨',
    { es: 'Oración subordinada adjetiva (o de relativo): modifica a un sustantivo (antecedente). "Que vive al lado" modifica a "el hombre". Introducida por pronombre relativo: que, quien, cual.', en: 'Adjective (relative) clause: modifies a noun (antecedent). "Que vive al lado" modifies "el hombre". Introduced by a relative pronoun: que, quien, cual.', ca: 'Clàusula subordinada adjectiva (o de relatiu): modifica un substantiu. "Que viu al costat" modifica "l\'home".' }),

  q('sx-14', 'eso',
    { es: '¿Cuál es la función de "ayer" en "Ayer fui al médico"?', en: 'What is the function of "ayer" in "Ayer fui al médico"?', ca: 'Quina és la funció de "ahir" en "Ahir vaig anar al metge"?' },
    { es: ['Sujeto', 'Complemento directo', 'Complemento circunstancial de tiempo', 'Atributo'], en: ['Subject', 'Direct object', 'Adverbial of time', 'Attribute'], ca: ['Subjecte', 'Complement directe', 'Complement circumstancial de temps', 'Atribut'] },
    2, '📅',
    { es: '"Ayer" es un complemento circunstancial de tiempo: indica cuándo ocurrió la acción. Responde a la pregunta ¿cuándo?', en: '"Ayer" is an adverbial of time: it indicates when the action happened. Answers the question: when?', ca: '"Ahir" és un complement circumstancial de temps: indica quan va ocórrer l\'acció.' }),

  q('sx-15', 'eso',
    { es: '"Se venden pisos." ¿Qué tipo de construcción es?', en: '"Se venden pisos." What type of construction is this?', ca: '"Es venen pisos." Quin tipus de construcció és?' },
    { es: ['Pasiva refleja', 'Pasiva perifrástica', 'Activa pronominal', 'Oración impersonal con se'], en: ['Reflexive passive (pasiva refleja)', 'Periphrastic passive', 'Active pronominal', 'Impersonal with se'], ca: ['Passiva reflexa', 'Passiva perifràstica', 'Activa pronominal', 'Impersonal amb es'] },
    0, '🏠',
    { es: '"Se venden pisos" es una pasiva refleja (o pasiva con se): se + verbo en activa. El sujeto paciente ("pisos") concuerda con el verbo ("venden" = plural). No hay agente expreso.', en: '"Se venden pisos" is a "pasiva refleja" (reflexive passive): se + active verb. The patient subject ("pisos") agrees with the verb (plural).', ca: '"Es venen pisos" és una passiva reflexa: es + verb actiu. El subjecte pacient ("pisos") concorda amb el verb (plural).' }),

  q('sx-16', 'primaria',
    { es: "En \"el perro corre\", ¿cuál es el sujeto?", en: "In \"el perro corre\", what is the subject?", ca: "A \"el gos corre\", quin és el subjecte?" },
    { es: ["el perro","corre","el","perro corre"], en: ["el perro","corre","el","perro corre"], ca: ["el gos","corre","el","gos corre"] },
    0, '🐕',
    { es: "El sujeto es quien realiza la acción: \"el perro\". Se encuentra preguntando ¿quién corre?", en: "The subject does the action: \"el perro\" (the dog). Ask: who runs?", ca: "El subjecte és qui fa l'acció: \"el gos\". Es troba preguntant qui corre." }),

  q('sx-17', 'primaria',
    { es: "¿Qué es el predicado de una oración?", en: "What is the predicate of a sentence?", ca: "Què és el predicat d'una oració?" },
    { es: ["Lo que se dice del sujeto","Quien hace la acción","El artículo","El adjetivo"], en: ["Lo que se dice del sujeto","Quien hace la acción","El artículo","El adjetivo"], ca: ["El que es diu del subjecte","Qui fa l'acció","L'article","L'adjectiu"] },
    0, '💬',
    { es: "El predicado es todo lo que se dice del sujeto, y su núcleo es siempre un verbo.", en: "The predicate is everything said about the subject; its head is a verb.", ca: "El predicat és tot el que es diu del subjecte, i el seu nucli és un verb." }),

  q('sx-18', 'primaria',
    { es: "En \"María come manzanas\", ¿cuál es el núcleo del predicado?", en: "In \"María come manzanas\", what is the head of the predicate?", ca: "A \"Maria menja pomes\", quin és el nucli del predicat?" },
    { es: ["María","come","manzanas","come manzanas"], en: ["María","come","manzanas","come manzanas"], ca: ["Maria","menja","pomes","menja pomes"] },
    1, '🍎',
    { es: "El núcleo del predicado es el verbo: \"come\". \"Manzanas\" es su complemento directo.", en: "The head of the predicate is the verb: \"come\" (eats).", ca: "El nucli del predicat és el verb: \"menja\"." }),

  q('sx-19', 'primaria',
    { es: "¿Cuántas palabras forman el sujeto en \"los niños pequeños juegan\"?", en: "How many words form the subject in \"los niños pequeños juegan\"?", ca: "Quantes paraules formen el subjecte a \"els nens petits juguen\"?" },
    { es: ["Una","Dos","Tres","Cuatro"], en: ["Una","Dos","Tres","Cuatro"], ca: ["Una","Dues","Tres","Quatre"] },
    2, '🧒',
    { es: "El sujeto es todo el grupo \"los niños pequeños\": determinante, sustantivo y adjetivo.", en: "The subject is the whole group \"los niños pequeños\": three words.", ca: "El subjecte és tot el grup \"els nens petits\": tres paraules." }),

  q('sx-20', 'primaria',
    { es: "En \"ayer llovió mucho\", ¿hay sujeto?", en: "In \"ayer llovió mucho\", is there a subject?", ca: "A \"ahir va ploure molt\", hi ha subjecte?" },
    { es: ["Sí, \"ayer\"","Sí, \"mucho\"","No, es una oración impersonal","Sí, \"llovió\""], en: ["Sí, \"ayer\"","Sí, \"mucho\"","No, es una oración impersonal","Sí, \"llovió\""], ca: ["Sí, \"ahir\"","Sí, \"molt\"","No, és una oració impersonal","Sí, \"va ploure\""] },
    2, '🌧️',
    { es: "Los verbos meteorológicos (llover, nevar, amanecer) no tienen sujeto: nadie hace la acción. Son impersonales.", en: "Weather verbs have no subject: nobody performs the action.", ca: "Els verbs meteorològics no tenen subjecte: ningú no fa l'acció." }),

  q('sx-21', 'primaria',
    { es: "¿Cómo se localiza el sujeto de una oración?", en: "How do you find the subject of a sentence?", ca: "Com es localitza el subjecte d'una oració?" },
    { es: ["Es siempre la primera palabra","Preguntando ¿quién? al verbo","Es siempre un nombre propio","Va detrás del verbo"], en: ["Es siempre la primera palabra","Preguntando ¿quién? al verbo","Es siempre un nombre propio","Va detrás del verbo"], ca: ["És sempre la primera paraula","Preguntant qui? al verb","És sempre un nom propi","Va darrere del verb"] },
    1, '🔍',
    { es: "Se pregunta ¿quién? al verbo. Y ojo: el sujeto NO siempre va delante — \"llegaron los invitados\".", en: "Ask \"who?\" to the verb. The subject does not always come first.", ca: "Es pregunta qui? al verb. I compte: el subjecte no sempre va davant." }),

  q('sx-22', 'eso',
    { es: "En \"le di el libro a Ana\", ¿qué es \"a Ana\"?", en: "In \"le di el libro a Ana\", what is \"a Ana\"?", ca: "A \"li vaig donar el llibre a l'Anna\", què és \"a l'Anna\"?" },
    { es: ["Complemento directo","Complemento indirecto","Sujeto","Complemento circunstancial"], en: ["Complemento directo","Complemento indirecto","Sujeto","Complemento circunstancial"], ca: ["Complement directe","Complement indirecte","Subjecte","Complement circumstancial"] },
    1, '🎁',
    { es: "El indirecto recibe el beneficio de la acción y se sustituye por \"le/les\": \"le di el libro\". El directo es \"el libro\".", en: "The indirect object receives the benefit and is replaced by \"le/les\".", ca: "L'indirecte rep el benefici de l'acció i se substitueix per \"li\"." }),

  q('sx-23', 'eso',
    { es: "¿Qué tipo de oración es \"Ana es enfermera\"?", en: "What kind of sentence is \"Ana es enfermera\"?", ca: "Quin tipus d'oració és \"L'Anna és infermera\"?" },
    { es: ["Predicativa","Atributiva (copulativa)","Impersonal","Pasiva"], en: ["Predicativa","Atributiva (copulativa)","Impersonal","Pasiva"], ca: ["Predicativa","Atributiva (copulativa)","Impersonal","Passiva"] },
    1, '🔗',
    { es: "Con ser, estar o parecer la oración es copulativa, y lo que va detrás es un atributo, no un complemento directo.", en: "With ser/estar/parecer the sentence is copulative and what follows is an attribute.", ca: "Amb ser, estar o semblar l'oració és copulativa i el que va darrere és un atribut." }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
