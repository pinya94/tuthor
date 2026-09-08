// Ortografía: G y J — primaria + ESO
//
// El tercer tema del bloque, junto a acentuación y b/v. Aquí el problema no es
// solo la regla: la g y la j solo suenan igual delante de e y de i, y la mitad
// de las dudas se resuelven sabiendo exactamente cuándo hay que dudar.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  q('gj-01', 'primaria',
    { es: '¿Delante de qué vocales suenan igual la G y la J?', en: 'Before which vowels do G and J sound the same in Spanish?', ca: 'Davant de quines vocals sonen igual la G i la J?' },
    { es: ['Delante de E y de I', 'Delante de A, O y U', 'Delante de todas', 'Nunca suenan igual'], en: ['Before E and I', 'Before A, O and U', 'Before all of them', 'They never sound the same'], ca: ['Davant d\'E i d\'I', 'Davant d\'A, O i U', 'Davant de totes', 'Mai sonen igual'] },
    { es: 'Delante de E y de I', en: 'Before E and I', ca: 'Davant d\'E i d\'I' },
    '🔤',
    { es: 'Ahí está todo el problema: "gente" y "jefe" suenan igual y por eso hay que pensar. Con a, o, u no hay duda posible, porque "ga" y "ja" suenan distinto: nadie se equivoca escribiendo "gato" o "jarra".', en: 'That is where the whole problem lies: "gente" and "jefe" sound alike, so you have to think. With a, o, u there is no doubt, because "ga" and "ja" sound different: nobody misspells "gato" or "jarra".', ca: 'Aquí és on hi ha tot el problema: "gente" i "jefe" sonen igual. Amb a, o, u no hi ha dubte possible.' }),

  q('gj-02', 'primaria',
    { es: '¿Cómo se escribe el sonido fuerte de la G delante de E o I, como en "guerra"?', en: 'How is the hard G sound written before E or I, as in "guerra"?', ca: 'Com s\'escriu el so fort de la G davant d\'E o I, com a "guerra"?' },
    { es: ['Con GU: gue, gui', 'Con G sola: ge, gi', 'Con J', 'Con GÜ siempre'], en: ['With GU: gue, gui', 'With G alone: ge, gi', 'With J', 'Always with GÜ'], ca: ['Amb GU: gue, gui', 'Amb G sola: ge, gi', 'Amb J', 'Sempre amb GÜ'] },
    { es: 'Con GU: gue, gui', en: 'With GU: gue, gui', ca: 'Amb GU: gue, gui' },
    '🛡️',
    { es: 'Esa u no se pronuncia: está solo para endurecer la g. Por eso "guerra" suena "gerra" y no "guerra" con u. Con a, o, u no hace ninguna falta: "gato", "gota", "gusano".', en: 'That u is not pronounced: it is there only to harden the g. So "guerra" sounds like "gerra". With a, o, u it is not needed at all: "gato", "gota", "gusano".', ca: 'Aquesta u no es pronuncia: hi és només per endurir la g.' }),

  q('gj-03', 'primaria',
    { es: '¿Para qué sirve la diéresis en palabras como "pingüino"?', en: 'What is the diaeresis for in words like "pingüino"?', ca: 'Per a què serveix la dièresi en paraules com "pingüino"?' },
    { es: ['Para indicar que la U sí se pronuncia', 'Para marcar el acento', 'Para separar sílabas', 'Para hacer la palabra plural'], en: ['To show that the U is pronounced', 'To mark the stress', 'To split syllables', 'To make the word plural'], ca: ['Per indicar que la U sí que es pronuncia', 'Per marcar l\'accent', 'Per separar síl·labes', 'Per fer la paraula plural'] },
    { es: 'Para indicar que la U sí se pronuncia', en: 'To show that the U is pronounced', ca: 'Per indicar que la U sí que es pronuncia' },
    '🐧',
    { es: 'Sin los dos puntitos, "pinguino" se leería "pinguino" con la u muda. Solo aparece en güe y güi: vergüenza, cigüeña, lingüística. En ningún otro sitio del español se usa.', en: 'Without the two dots, "pinguino" would be read with a silent u. It only appears in güe and güi: vergüenza, cigüeña, lingüística. Nowhere else in Spanish.', ca: 'Sense els dos punts, la u seria muda. Només apareix a güe i güi: vergüenza, cigüeña.' }),

  q('gj-04', 'primaria',
    { es: '¿Cómo se escribe: "cogí" o "cojí"?', en: 'Which is correct: "cogí" or "cojí"?', ca: 'Com s\'escriu: "cogí" o "cojí"?' },
    { es: ['Cogí', 'Cojí', 'Las dos son correctas', 'Coguí'], en: ['Cogí', 'Cojí', 'Both are correct', 'Coguí'], ca: ['Cogí', 'Cojí', 'Totes dues són correctes', 'Coguí'] },
    { es: 'Cogí', en: 'Cogí', ca: 'Cogí' },
    '✋',
    { es: 'Los verbos terminados en -ger y -gir mantienen la g en casi todas sus formas: coger, cogí, cogía. La excepción es delante de a y o, donde se escribe j para conservar el sonido: cojo, coja.', en: 'Verbs ending in -ger and -gir keep the g in nearly every form: coger, cogí, cogía. The exception is before a and o, where j is written to keep the sound: cojo, coja.', ca: 'Els verbs acabats en -ger i -gir mantenen la g: coger, cogí. L\'excepció és davant d\'a i o: cojo, coja.' }),

  q('gj-05', 'primaria',
    { es: 'Se escriben con G las palabras que terminan en...', en: 'Words with G end in...', ca: 'S\'escriuen amb G les paraules que acaben en...' },
    { es: ['-gente, -gencia: inteligente, urgencia', '-jero, -jera: viajero', '-aje: garaje', '-jería: cerrajería'], en: ['-gente, -gencia: inteligente, urgencia', '-jero, -jera: viajero', '-aje: garaje', '-jería: cerrajería'], ca: ['-gente, -gencia: inteligente, urgencia', '-jero, -jera: viajero', '-aje: garaje', '-jería: cerrajería'] },
    { es: '-gente, -gencia: inteligente, urgencia', en: '-gente, -gencia: inteligente, urgencia', ca: '-gente, -gencia: inteligente, urgencia' },
    '🧠',
    { es: 'Inteligente, urgente, agencia, emergencia: todas con g. Las otras tres opciones son justo las terminaciones que van con j, así que aprender las dos listas a la vez ahorra la mitad de las dudas.', en: 'Inteligente, urgente, agencia, emergencia: all with g. The other three options are exactly the endings taking j, so learning both lists together saves half the doubts.', ca: 'Inteligente, urgente, agencia: totes amb g. Les altres tres opcions són justament les terminacions amb j.' }),

  q('gj-06', 'primaria',
    { es: '¿Cómo se escriben las palabras terminadas en el sonido "-aje", como el sitio donde se guarda el coche?', en: 'How are words ending in the "-aje" sound written, like the place where a car is kept?', ca: 'Com s\'escriuen les paraules acabades en el so "-aje", com el lloc on es guarda el cotxe?' },
    { es: ['Con J: garaje, viaje, paisaje', 'Con G: garage, viage', 'De las dos formas', 'Con GU'], en: ['With J: garaje, viaje, paisaje', 'With G: garage, viage', 'Either way', 'With GU'], ca: ['Amb J: garaje, viaje, paisaje', 'Amb G: garage, viage', 'De totes dues maneres', 'Amb GU'] },
    { es: 'Con J: garaje, viaje, paisaje', en: 'With J: garaje, viaje, paisaje', ca: 'Amb J: garaje, viaje, paisaje' },
    '🚗',
    { es: 'Todas las terminadas en -aje y -eje van con j: equipaje, mensaje, hereje. La forma "garage" es la francesa y en español no vale, aunque se vea escrita en muchos carteles.', en: 'All words ending in -aje and -eje take j: equipaje, mensaje, hereje. The spelling "garage" is French and is not valid in Spanish, however often it appears on signs.', ca: 'Totes les acabades en -aje i -eje van amb j: equipaje, mensaje, hereje.' }),

  q('gj-07', 'primaria',
    { es: '¿Cómo se escribe la palabra que significa "persona que viaja"?', en: 'How do you write the word meaning "someone who travels"?', ca: 'Com s\'escriu la paraula que significa "persona que viatja"?' },
    { es: ['Viajero', 'Viagero', 'Viaguero', 'Biajero'], en: ['Viajero', 'Viagero', 'Viaguero', 'Biajero'], ca: ['Viajero', 'Viagero', 'Viaguero', 'Biajero'] },
    { es: 'Viajero', en: 'Viajero', ca: 'Viajero' },
    '🧳',
    { es: 'Las terminaciones -jero, -jera y -jería van siempre con j: extranjero, relojería, consejero. Solo hay una excepción que conviene tener fichada: "ligero".', en: 'The endings -jero, -jera and -jería always take j: extranjero, relojería, consejero. There is just one exception worth noting: "ligero".', ca: 'Les terminacions -jero, -jera i -jería van sempre amb j. Només hi ha una excepció: "ligero".' }),

  q('gj-08', 'primaria',
    { es: '¿Cómo se escribe el nombre de la ciencia que estudia los seres vivos?', en: 'How is the name of the science studying living things written?', ca: 'Com s\'escriu el nom de la ciència que estudia els éssers vius?' },
    { es: ['Biología', 'Biolojía', 'Biologuía', 'Viología'], en: ['Biología', 'Biolojía', 'Biologuía', 'Viología'], ca: ['Biología', 'Biolojía', 'Biologuía', 'Viología'] },
    { es: 'Biología', en: 'Biología', ca: 'Biología' },
    '🧬',
    { es: 'Todas las palabras acabadas en -logía, -gogía y -gia van con g: geología, pedagogía, magia. Como son muchísimas y todas cumplen la regla, es de las más rentables de aprenderse.', en: 'Every word ending in -logía, -gogía and -gia takes g: geología, pedagogía, magia. Since there are so many and they all follow the rule, it is one of the most profitable to learn.', ca: 'Totes les paraules acabades en -logía, -gogía i -gia van amb g: geología, pedagogía, magia.' }),

  q('gj-09', 'primaria',
    { es: '¿Cuál de estas palabras está bien escrita?', en: 'Which of these words is spelled correctly?', ca: 'Quina d\'aquestes paraules està ben escrita?' },
    { es: ['Gigante', 'Jigante', 'Guigante', 'Jiganté'], en: ['Gigante', 'Jigante', 'Guigante', 'Jiganté'], ca: ['Gigante', 'Jigante', 'Guigante', 'Jiganté'] },
    { es: 'Gigante', en: 'Gigante', ca: 'Gigante' },
    '🦣',
    { es: 'Lleva dos veces el sonido suave y las dos con g. Es una de esas palabras que hay que memorizar sin regla que ayude: por eso conviene leer mucho, que es como se fijan.', en: 'It carries the soft sound twice, both with g. It is one of those words to memorise with no rule to help: which is why reading a lot matters, since that is how they stick.', ca: 'Porta dues vegades el so suau i totes dues amb g. És una paraula que cal memoritzar.' }),

  q('gj-10', 'primaria',
    { es: 'El verbo "dejar" en pasado, ¿cómo se escribe?', en: 'How is the verb "dejar" written in the past?', ca: 'El verb "dejar" en passat, com s\'escriu?' },
    { es: ['Dejé', 'Degé', 'Dejgé', 'Deguí'], en: ['Dejé', 'Degé', 'Dejgé', 'Deguí'], ca: ['Dejé', 'Degé', 'Dejgé', 'Deguí'] },
    { es: 'Dejé', en: 'Dejé', ca: 'Dejé' },
    '👋',
    { es: 'Si el infinitivo ya lleva j, todas sus formas la mantienen: dejar, dejé, dejemos. La regla general es útil: mirar cómo se escribe el infinitivo resuelve casi todas las dudas verbales.', en: 'If the infinitive already has j, every form keeps it: dejar, dejé, dejemos. The general rule helps: checking the infinitive settles nearly every verb doubt.', ca: 'Si l\'infinitiu ja porta j, totes les seves formes la mantenen: dejar, dejé, dejemos.' }),

  q('gj-11', 'primaria',
    { es: '¿Cómo se escribe la palabra que significa "sentir vergüenza"?', en: 'How do you write the Spanish word for shame?', ca: 'Com s\'escriu la paraula que significa "sentir vergonya"?' },
    { es: ['Vergüenza', 'Verguenza', 'Vergüensa', 'Berguenza'], en: ['Vergüenza', 'Verguenza', 'Vergüensa', 'Berguenza'], ca: ['Vergüenza', 'Verguenza', 'Vergüensa', 'Berguenza'] },
    { es: 'Vergüenza', en: 'Vergüenza', ca: 'Vergüenza' },
    '😳',
    { es: 'Sin diéresis se leería "verguenza" con la u muda, que no es como suena. Es de las palabras donde más se olvidan los dos puntos, junto con "cigüeña" y "antigüedad".', en: 'Without the diaeresis it would be read with a silent u, which is not how it sounds. It is one of the words where the dots are most often forgotten, along with "cigüeña" and "antigüedad".', ca: 'Sense dièresi es llegiria amb la u muda. És de les paraules on més s\'obliden els dos punts.' }),

  q('gj-12', 'primaria',
    { es: '¿Cuál de estas palabras se escribe con J?', en: 'Which of these words is spelled with J?', ca: 'Quina d\'aquestes paraules s\'escriu amb J?' },
    { es: ['Ejército', 'Egército', 'Eguército', 'Ejérzito'], en: ['Ejército', 'Egército', 'Eguército', 'Ejérzito'], ca: ['Ejército', 'Egército', 'Eguército', 'Ejérzito'] },
    { es: 'Ejército', en: 'Ejército', ca: 'Ejército' },
    '🛡️',
    { es: 'Va con j, igual que "ejercicio", "ejemplo" y "ejecutar". Todas empiezan por eje-, y esa es la pista: las palabras que empiezan así van con j casi sin excepción.', en: 'It takes j, like "ejercicio", "ejemplo" and "ejecutar". All start with eje-, and that is the clue: words beginning that way take j almost without exception.', ca: 'Va amb j, igual que "ejercicio", "ejemplo" i "ejecutar". Totes comencen per eje-.' }),

  q('gj-13', 'primaria',
    { es: '¿Cómo se escribe el nombre del insecto que da miel?', en: 'How is the Spanish word for the honey-making insect written?', ca: 'Com s\'escriu el nom de l\'insecte que fa mel?' },
    { es: ['Abeja', 'Abega', 'Aveja', 'Abegua'], en: ['Abeja', 'Abega', 'Aveja', 'Abegua'], ca: ['Abeja', 'Abega', 'Aveja', 'Abegua'] },
    { es: 'Abeja', en: 'Abeja', ca: 'Abeja' },
    '🐝',
    { es: 'Con j, y además con b, así que junta las dos dudas ortográficas más frecuentes en una sola palabra corta. La j entre vocales es muy común: oveja, teja, hoja.', en: 'With j and also with b, so it packs the two commonest spelling doubts into one short word. J between vowels is very common: oveja, teja, hoja.', ca: 'Amb j i a més amb b. La j entre vocals és molt comuna: oveja, teja, hoja.' }),

  q('gj-14', 'primaria',
    { es: '¿Cómo se escribe la palabra que significa "movimiento del cuerpo o la cara"?', en: 'How do you write the Spanish word for a bodily or facial gesture?', ca: 'Com s\'escriu la paraula que significa "moviment del cos o la cara"?' },
    { es: ['Gesto', 'Jesto', 'Guesto', 'Gguesto'], en: ['Gesto', 'Jesto', 'Guesto', 'Gguesto'], ca: ['Gesto', 'Jesto', 'Guesto', 'Gguesto'] },
    { es: 'Gesto', en: 'Gesto', ca: 'Gesto' },
    '🙋',
    { es: 'Con g, como toda su familia: gesticular, gestión, gestor. Cuando dudes, prueba a pensar en palabras emparentadas: si una lleva g, las demás también.', en: 'With g, like its whole family: gesticular, gestión, gestor. When in doubt, think of related words: if one takes g, so do the rest.', ca: 'Amb g, com tota la seva família: gesticular, gestión, gestor.' }),

  q('gj-15', 'primaria',
    { es: '¿Cómo se escribe el nombre del objeto que sirve para medir el tiempo y llevamos en la muñeca?', en: 'How do you write the Spanish word for the timepiece worn on the wrist?', ca: 'Com s\'escriu el nom de l\'objecte que serveix per mesurar el temps al canell?' },
    { es: ['Reloj', 'Reloge', 'Relog', 'Rreloj'], en: ['Reloj', 'Reloge', 'Relog', 'Rreloj'], ca: ['Reloj', 'Reloge', 'Relog', 'Rreloj'] },
    { es: 'Reloj', en: 'Reloj', ca: 'Reloj' },
    '⌚',
    { es: 'Acaba en j, que es una letra rarísima en final de palabra: solo pasa en reloj, boj, carcaj y poco más. El plural es "relojes", con la j conservada.', en: 'It ends in j, a very rare final letter in Spanish: only reloj, boj, carcaj and few others. The plural is "relojes", keeping the j.', ca: 'Acaba en j, una lletra raríssima en final de paraula. El plural és "relojes".' }),

  q('gj-16', 'primaria',
    { es: '¿Cuál está bien escrita?', en: 'Which one is spelled correctly?', ca: 'Quina està ben escrita?' },
    { es: ['Página', 'Págima', 'Pájina', 'Paguina'], en: ['Página', 'Págima', 'Pájina', 'Paguina'], ca: ['Página', 'Págima', 'Pájina', 'Paguina'] },
    { es: 'Página', en: 'Página', ca: 'Página' },
    '📄',
    { es: 'Con g y con tilde en la primera sílaba, porque es esdrújula. Es una palabra que se escribe a todas horas y se falla mucho justamente por lo corriente que es.', en: 'With g and an accent on the first syllable, because it is proparoxytone. It is written all the time and often misspelled precisely because it is so ordinary.', ca: 'Amb g i amb accent a la primera síl·laba, perquè és esdrúixola.' }),

  q('gj-17', 'primaria',
    { es: '¿Cómo se escribe el nombre del animal de granja que da lana?', en: 'How do you write the Spanish word for the wool-giving farm animal?', ca: 'Com s\'escriu el nom de l\'animal de granja que dona llana?' },
    { es: ['Oveja', 'Ovega', 'Obeja', 'Oveia'], en: ['Oveja', 'Ovega', 'Obeja', 'Oveia'], ca: ['Oveja', 'Ovega', 'Obeja', 'Oveia'] },
    { es: 'Oveja', en: 'Oveja', ca: 'Oveja' },
    '🐑',
    { es: 'Con v y con j. La terminación -eja va casi siempre con j: oreja, ceja, pareja, madeja. Es una de esas familias que, una vez vistas juntas, ya no se fallan.', en: 'With v and j. The ending -eja almost always takes j: oreja, ceja, pareja, madeja. One of those families that, once seen together, stop being missed.', ca: 'Amb v i amb j. La terminació -eja va gairebé sempre amb j: oreja, ceja, pareja.' }),

  q('gj-18', 'primaria',
    { es: '¿Cómo se escribe el verbo que significa "elegir entre varias cosas"?', en: 'How do you write the Spanish verb meaning "to choose"?', ca: 'Com s\'escriu el verb que significa "triar entre diverses coses"?' },
    { es: ['Escoger', 'Escojer', 'Escoguer', 'Ezcoger'], en: ['Escoger', 'Escojer', 'Escoguer', 'Ezcoger'], ca: ['Escoger', 'Escojer', 'Escoguer', 'Ezcoger'] },
    { es: 'Escoger', en: 'Escoger', ca: 'Escoger' },
    '👉',
    { es: 'Termina en -ger, así que va con g: como proteger, recoger o encoger. Ojo con las formas "escojo" y "escoja", que sí llevan j porque van delante de o y de a.', en: 'It ends in -ger, so it takes g: like proteger, recoger or encoger. Watch out for "escojo" and "escoja", which do take j because they come before o and a.', ca: 'Acaba en -ger, així que va amb g. Compte amb "escojo" i "escoja", que sí que porten j.' }),

  q('gj-19', 'primaria',
    { es: '¿Cómo se escribe el nombre de la planta que se pone en las comidas y huele mucho?', en: 'How do you write the Spanish name of the green herb sprinkled on food?', ca: 'Com s\'escriu el nom de la planta que es posa als menjars i fa molta olor?' },
    { es: ['Perejil', 'Peregil', 'Pereguil', 'Perejíl'], en: ['Perejil', 'Peregil', 'Pereguil', 'Perejíl'], ca: ['Perejil', 'Peregil', 'Pereguil', 'Perejíl'] },
    { es: 'Perejil', en: 'Perejil', ca: 'Perejil' },
    '🌿',
    { es: 'Con j y sin tilde: es aguda terminada en l, y las agudas solo se acentúan si acaban en n, s o vocal. Dos reglas distintas en una sola palabra.', en: 'With j and no accent: it is oxytone ending in l, and oxytones only take an accent when ending in n, s or a vowel. Two different rules in one word.', ca: 'Amb j i sense accent: és aguda acabada en l, i les agudes només s\'accentuen si acaben en n, s o vocal.' }),

  q('gj-20', 'primaria',
    { es: '¿Cuál de estas palabras lleva G?', en: 'Which of these words takes G?', ca: 'Quina d\'aquestes paraules porta G?' },
    { es: ['Región', 'Rejión', 'Reguión', 'Rregión'], en: ['Región', 'Rejión', 'Reguión', 'Rregión'], ca: ['Región', 'Rejión', 'Reguión', 'Rregión'] },
    { es: 'Región', en: 'Región', ca: 'Región' },
    '🗺️',
    { es: 'Las terminaciones -gión, -gional y -gioso van con g: religión, regional, prodigioso. Como casi todas las palabras de este grupo son cultas y frecuentes, la regla renta mucho.', en: 'The endings -gión, -gional and -gioso take g: religión, regional, prodigioso. As nearly all words in this group are formal and frequent, the rule pays off.', ca: 'Les terminacions -gión, -gional i -gioso van amb g: religión, regional, prodigioso.' }),

  q('gj-21', 'primaria',
    { es: '¿Cómo se escribe la palabra que significa "hombre muy fuerte de los cuentos"?', en: 'How do you write the Spanish word for a fairy-tale ogre?', ca: 'Com s\'escriu la paraula que significa "home molt fort dels contes"?' },
    { es: ['Ogro', 'Ojro', 'Ogaro', 'Hogro'], en: ['Ogro', 'Ojro', 'Ogaro', 'Hogro'], ca: ['Ogro', 'Ojro', 'Ogaro', 'Hogro'] },
    { es: 'Ogro', en: 'Ogro', ca: 'Ogro' },
    '👹',
    { es: 'Aquí ni siquiera hay duda posible: la g va delante de r, no de e ni de i, así que suena fuerte y solo puede escribirse de una forma. Sirve para recordar dónde está el problema de verdad.', en: 'Here there is no possible doubt: the g comes before r, not e or i, so it sounds hard and can only be written one way. A reminder of where the real problem lies.', ca: 'Aquí no hi ha dubte possible: la g va davant de r, així que sona forta.' }),

  q('gj-22', 'primaria',
    { es: '¿Cómo se escribe el nombre del lugar donde se arreglan relojes?', en: 'How do you write the Spanish word for a watchmaker\'s shop?', ca: 'Com s\'escriu el nom del lloc on s\'arreglen rellotges?' },
    { es: ['Relojería', 'Relogería', 'Relojeria', 'Reloguería'], en: ['Relojería', 'Relogería', 'Relojeria', 'Reloguería'], ca: ['Relojería', 'Relogería', 'Relojeria', 'Reloguería'] },
    { es: 'Relojería', en: 'Relojería', ca: 'Relojería' },
    '⌚',
    { es: 'Con j por la terminación -jería, y con tilde en la i porque hay hiato: la i tónica junto a otra vocal siempre se acentúa, coincida o no con las reglas generales.', en: 'With j because of the -jería ending, and with an accent on the i because there is a hiatus: a stressed i next to another vowel always takes an accent, whatever the general rules say.', ca: 'Amb j per la terminació -jería, i amb accent a la i perquè hi ha hiat.' }),

  q('gj-23', 'primaria',
    { es: '¿Cuál está bien escrita?', en: 'Which one is correct?', ca: 'Quina està ben escrita?' },
    { es: ['Imagen', 'Imajen', 'Imaguen', 'Ymagen'], en: ['Imagen', 'Imajen', 'Imaguen', 'Ymagen'], ca: ['Imagen', 'Imajen', 'Imaguen', 'Ymagen'] },
    { es: 'Imagen', en: 'Imagen', ca: 'Imagen' },
    '🖼️',
    { es: 'Con g, y el plural es "imágenes", con tilde: al añadir sílaba se convierte en esdrújula y hay que marcarla. La palabra cambia de acentuación aunque no cambie de sonido.', en: 'With g, and the plural is "imágenes", with an accent: adding a syllable makes it proparoxytone and it must be marked. The word changes accentuation without changing sound.', ca: 'Amb g, i el plural és "imágenes", amb accent: en afegir síl·laba es converteix en esdrúixola.' }),

  q('gj-24', 'primaria',
    { es: '¿Cómo se escribe el nombre de la persona que viene de otro país?', en: 'How do you write the Spanish word for someone from another country?', ca: 'Com s\'escriu el nom de la persona que ve d\'un altre país?' },
    { es: ['Extranjero', 'Extrangero', 'Estranjero', 'Extranguero'], en: ['Extranjero', 'Extrangero', 'Estranjero', 'Extranguero'], ca: ['Extranjero', 'Extrangero', 'Estranjero', 'Extranguero'] },
    { es: 'Extranjero', en: 'Extranjero', ca: 'Extranjero' },
    '🌍',
    { es: 'Con j por la terminación -jero, y con x, no con s: viene de "extra", fuera. Es una palabra que junta las dos dificultades y por eso se falla a menudo de las dos maneras.', en: 'With j because of the -jero ending, and with x, not s: it comes from "extra", outside. The word combines both difficulties, which is why it is missed both ways.', ca: 'Amb j per la terminació -jero, i amb x, no amb s: ve d\'"extra", fora.' }),

  q('gj-25', 'primaria',
    { es: 'Si dudas entre G y J en una palabra, ¿qué truco ayuda?', en: 'If you hesitate between G and J in a word, what trick helps?', ca: 'Si dubtes entre G i J en una paraula, quin truc ajuda?' },
    { es: ['Pensar en palabras de la misma familia: si una lleva g, las demás también', 'Escribir siempre g, que es más frecuente', 'Escribir siempre j, que suena más fuerte', 'Poner la que quede más bonita'], en: ['Think of words in the same family: if one has g, so do the rest', 'Always write g, it is commoner', 'Always write j, it sounds stronger', 'Use whichever looks nicer'], ca: ['Pensar en paraules de la mateixa família: si una porta g, les altres també', 'Escriure sempre g, que és més freqüent', 'Escriure sempre j, que sona més fort', 'Posar la que quedi més bonica'] },
    { es: 'Pensar en palabras de la misma familia: si una lleva g, las demás también', en: 'Think of words in the same family: if one has g, so do the rest', ca: 'Pensar en paraules de la mateixa família: si una porta g, les altres també' },
    '💡',
    { es: 'Si dudas en "eleg…", piensa en "elegante" o "elegir". Funciona porque la ortografía respeta la raíz de la palabra, y por eso las familias se escriben igual aunque cambien de sonido.', en: 'If you hesitate over "eleg…", think of "elegante" or "elegir". It works because spelling respects the word\'s root, so families are written alike even when the sound changes.', ca: 'Funciona perquè l\'ortografia respecta l\'arrel de la paraula.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('gj-30', 'eso',
    { es: 'El verbo "proteger" en primera persona del presente, ¿cómo se escribe?', en: 'How is the verb "proteger" written in the first person present?', ca: 'El verb "proteger" en primera persona del present, com s\'escriu?' },
    { es: ['Protejo', 'Protego', 'Protejgo', 'Proteguo'], en: ['Protejo', 'Protego', 'Protejgo', 'Proteguo'], ca: ['Protejo', 'Protego', 'Protejgo', 'Proteguo'] },
    { es: 'Protejo', en: 'Protejo', ca: 'Protejo' },
    '🛡️',
    { es: 'El infinitivo lleva g, pero delante de o hay que cambiar a j para que el sonido no se endurezca: "protego" sonaría con g fuerte. Es un cambio ortográfico, no una irregularidad del verbo.', en: 'The infinitive takes g, but before o you must switch to j so the sound does not harden: "protego" would sound with a hard g. It is a spelling change, not a verb irregularity.', ca: 'L\'infinitiu porta g, però davant d\'o cal canviar a j perquè el so no s\'enduri.' }),

  q('gj-31', 'eso',
    { es: '¿Cuál es la excepción a la regla de que -jero y -jera van con J?', en: 'What is the exception to the rule that -jero and -jera take J?', ca: 'Quina és l\'excepció a la regla que -jero i -jera van amb J?' },
    { es: ['Ligero', 'Extranjero', 'Consejero', 'Relojero'], en: ['Ligero', 'Extranjero', 'Consejero', 'Relojero'], ca: ['Ligero', 'Extranjero', 'Consejero', 'Relojero'] },
    { es: 'Ligero', en: 'Ligero', ca: 'Ligero' },
    '🍃',
    { es: '"Ligero" se escribe con g pese a terminar en -gero. Las excepciones hay que aprendérselas de una en una, pero tiene una ventaja: son tan pocas que caben en la cabeza.', en: '"Ligero" is written with g despite ending in -gero. Exceptions must be learned one by one, but there is an upside: there are so few they fit in your head.', ca: '"Ligero" s\'escriu amb g malgrat acabar en -gero. Les excepcions són tan poques que caben al cap.' }),

  q('gj-32', 'eso',
    { es: '¿Cómo se escriben las formas del pretérito de "traer" y "decir"?', en: 'How are the preterite forms of "traer" and "decir" written?', ca: 'Com s\'escriuen les formes del pretèrit de "traer" i "decir"?' },
    { es: ['Traje, dije: con J', 'Trage, dige: con G', 'Trague, digue', 'Trajé, dijé con tilde'], en: ['Traje, dije: with J', 'Trage, dige: with G', 'Trague, digue', 'Trajé, dijé with an accent'], ca: ['Traje, dije: amb J', 'Trage, dige: amb G', 'Trague, digue', 'Trajé, dijé amb accent'] },
    { es: 'Traje, dije: con J', en: 'Traje, dije: with J', ca: 'Traje, dije: amb J' },
    '📦',
    { es: 'Son los llamados pretéritos fuertes en -je: traje, dije, conduje, produje, redujo. Ninguno lleva tilde, porque el acento no cae en la última sílaba aunque lo parezca al oírlos.', en: 'These are the so-called strong preterites in -je: traje, dije, conduje, produje, redujo. None takes an accent, because the stress does not fall on the last syllable even if it sounds that way.', ca: 'Són els anomenats pretèrits forts en -je: traje, dije, conduje, produje.' }),

  q('gj-33', 'eso',
    { es: '¿Por qué "coger" lleva G y "cojo" lleva J, siendo el mismo verbo?', en: 'Why does "coger" take G and "cojo" take J, being the same verb?', ca: 'Per què "coger" porta G i "cojo" porta J, sent el mateix verb?' },
    { es: ['Porque delante de A y O la G sonaría fuerte, así que se cambia a J para mantener el sonido', 'Porque son verbos distintos', 'Porque "cojo" es un error admitido', 'Por capricho de la norma'], en: ['Because before A and O the G would sound hard, so it switches to J to keep the sound', 'Because they are different verbs', 'Because "cojo" is an accepted error', 'Because the rule is arbitrary'], ca: ['Perquè davant d\'A i O la G sonaria forta, així que es canvia a J per mantenir el so', 'Perquè són verbs diferents', 'Perquè "cojo" és un error admès', 'Per caprici de la norma'] },
    { es: 'Porque delante de A y O la G sonaría fuerte, así que se cambia a J para mantener el sonido', en: 'Because before A and O the G would sound hard, so it switches to J to keep the sound', ca: 'Perquè davant d\'A i O la G sonaria forta, així que es canvia a J per mantenir el so' },
    '🔄',
    { es: 'La ortografía cambia justo para que la pronunciación NO cambie. Pasa igual al revés con -car y -gar: "sacar" hace "saqué" y "llegar" hace "llegué", por el mismo motivo.', en: 'The spelling changes precisely so the pronunciation does NOT. The same happens in reverse with -car and -gar: "sacar" gives "saqué" and "llegar" gives "llegué", for the same reason.', ca: 'L\'ortografia canvia justament perquè la pronunciació NO canviï. Passa igual amb -car i -gar.' }),

  q('gj-34', 'eso',
    { es: '¿Cuál de estas palabras se escribe con G?', en: 'Which of these words is written with G?', ca: 'Quina d\'aquestes paraules s\'escriu amb G?' },
    { es: ['Cónyuge', 'Cónyuje', 'Conyuge sin tilde', 'Cónjuge'], en: ['Cónyuge', 'Cónyuje', 'Conyuge with no accent', 'Cónjuge'], ca: ['Cónyuge', 'Cónyuje', 'Conyuge sense accent', 'Cónjuge'] },
    { es: 'Cónyuge', en: 'Cónyuge', ca: 'Cónyuge' },
    '💍',
    { es: 'Con g y con tilde por esdrújula. Es una palabra que se ve escrita mal a menudo, incluso en documentos oficiales, porque el sonido no da ninguna pista y no tiene familia que ayude.', en: 'With g and an accent as a proparoxytone. It is often seen misspelled, even in official documents, because the sound gives no clue and it has no helpful word family.', ca: 'Amb g i amb accent per esdrúixola. Es veu escrita malament sovint, fins i tot en documents oficials.' }),

  q('gj-35', 'eso',
    { es: 'Las palabras que empiezan por "geo-", ¿con qué se escriben y por qué?', en: 'Words starting with "geo-": how are they written and why?', ca: 'Les paraules que comencen per "geo-", amb què s\'escriuen i per què?' },
    { es: ['Con G, porque "geo" significa tierra en griego', 'Con J, por el sonido', 'Con GU', 'Depende de la palabra'], en: ['With G, because "geo" means earth in Greek', 'With J, because of the sound', 'With GU', 'It depends on the word'], ca: ['Amb G, perquè "geo" significa terra en grec', 'Amb J, pel so', 'Amb GU', 'Depèn de la paraula'] },
    { es: 'Con G, porque "geo" significa tierra en griego', en: 'With G, because "geo" means earth in Greek', ca: 'Amb G, perquè "geo" significa terra en grec' },
    '🌐',
    { es: 'Geografía, geología, geometría, geólogo: todas comparten raíz y todas con g. Conocer el significado de los prefijos griegos resuelve muchas dudas de golpe, porque la raíz nunca cambia de grafía.', en: 'Geografía, geología, geometría, geólogo: all share a root and all take g. Knowing what Greek prefixes mean settles many doubts at once, since the root never changes its spelling.', ca: 'Geografía, geología, geometría: totes comparteixen arrel i totes amb g.' }),

  q('gj-36', 'eso',
    { es: 'El verbo "conducir" en pretérito, tercera persona, ¿cómo se escribe?', en: 'How do you write the Spanish preterite of "conducir" in the third person?', ca: 'Com s\'escriu el pretèrit de "conducir" en tercera persona?' },
    { es: ['Condujo', 'Condugo', 'Conduzo', 'Conduglo'], en: ['Condujo', 'Condugo', 'Conduzo', 'Conduglo'], ca: ['Condujo', 'Condugo', 'Conduzo', 'Conduglo'] },
    { es: 'Condujo', en: 'Condujo', ca: 'Condujo' },
    '🚙',
    { es: 'Con j, como todos los verbos en -ducir: produjo, redujo, tradujo. Y sin tilde: "condujo" es llana acabada en vocal. No confundir con "conduje", que es la primera persona.', en: 'With j, like every verb in -ducir: produjo, redujo, tradujo. And no accent: "condujo" is paroxytone ending in a vowel. Not to be confused with "conduje", the first person.', ca: 'Amb j, com tots els verbs en -ducir: produjo, redujo, tradujo. I sense accent.' }),

  q('gj-37', 'eso',
    { es: '¿Qué tienen en común "jinete", "jirafa" y "jengibre"?', en: 'What do "jinete", "jirafa" and "jengibre" have in common?', ca: 'Què tenen en comú "jinete", "jirafa" i "jengibre"?' },
    { es: ['Llevan J delante de E o I sin seguir ninguna regla: hay que memorizarlas', 'Todas vienen del latín', 'Todas son animales', 'Todas se pueden escribir con G también'], en: ['They take J before E or I following no rule: they must be memorised', 'They all come from Latin', 'They are all animals', 'They can all be written with G too'], ca: ['Porten J davant d\'E o I sense seguir cap regla: cal memoritzar-les', 'Totes vénen del llatí', 'Totes són animals', 'Totes es poden escriure amb G també'] },
    { es: 'Llevan J delante de E o I sin seguir ninguna regla: hay que memorizarlas', en: 'They take J before E or I following no rule: they must be memorised', ca: 'Porten J davant d\'E o I sense seguir cap regla: cal memoritzar-les' },
    '🦒',
    { es: 'Muchas vienen del árabe, y por eso escapan a las reglas construidas sobre el latín y el griego. Las reglas cubren la mayoría de los casos, pero no todos: para el resto solo vale leer y fijarse.', en: 'Many come from Arabic, escaping rules built on Latin and Greek. The rules cover most cases but not all: for the rest, only reading and noticing work.', ca: 'Moltes vénen de l\'àrab, i per això escapen a les regles construïdes sobre el llatí i el grec.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 8 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
