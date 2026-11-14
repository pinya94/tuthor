// Páginas de estudio de inglés básico (Primaria y 1.º-2.º ESO):
// /estudiar/idiomas/ingles/grammar/<slug>. Mucha demanda en el autocompletado
// de Google (nov-2026: «present continuous exercises», «have got exercises
// pdf», «there is there are wordwall», «possessive adjectives exercises»,
// «can can't») y ninguna página. Se fusiona en CONTENIDO_TEMA (clave = slug).
// Material en inglés en los tres idiomas; la prosa se traduce (en: British).

const T = (es, en, ca) => ({ es, en, ca })
const L = T

const presentContinuous = {
  metaTitle: L('Present continuous en inglés: cómo se forma, cuándo se usa y -ing — resumen y ejercicios', 'The present continuous: form, uses and -ing spelling — summary and practice questions', 'Present continuous en anglès: com es forma, quan s’usa i -ing — resum i exercicis'),
  metaDesc: L('Cómo se forma el present continuous (am/is/are + -ing) en afirmativa, negativa y pregunta, la ortografía de -ing, cuándo se usa y la diferencia con el present simple.', 'How to form the present continuous (am/is/are + -ing) in positive, negative and question forms, -ing spelling, when to use it and how it differs from the present simple.', 'Com es forma el present continuous (am/is/are + -ing) en afirmativa, negativa i pregunta, l’ortografia de -ing, quan s’usa i la diferència amb el present simple.'),
  resumen: L(
    ['El present continuous se usa para lo que está pasando ahora mismo (I am reading), para situaciones temporales (She is staying with her aunt this week) y para planes ya decididos (We are flying to Rome on Friday). Se forma con el verbo to be (am, is, are) y el verbo principal acabado en -ing.', 'Para negar se añade not (I am not playing, he isn’t playing) y para preguntar se pone el verbo to be delante del sujeto (Are you playing?). Algunos verbos de estado, como know, like o want, casi nunca van en continuous.'],
    ['The present continuous is used for what is happening right now (I am reading), for temporary situations (She is staying with her aunt this week) and for fixed plans (We are flying to Rome on Friday). It is formed with the verb to be (am, is, are) and the main verb ending in -ing.', 'To make it negative, add not (I am not playing, he isn’t playing); to ask, put the verb to be before the subject (Are you playing?). Some state verbs, such as know, like or want, are hardly ever used in the continuous.'],
    ['El present continuous s’usa per al que està passant ara mateix (I am reading), per a situacions temporals (She is staying with her aunt this week) i per a plans ja decidits (We are flying to Rome on Friday). Es forma amb el verb to be (am, is, are) i el verb principal acabat en -ing.', 'Per negar s’hi afegeix not (I am not playing, he isn’t playing) i per preguntar es posa el verb to be davant del subjecte (Are you playing?). Alguns verbs d’estat, com know, like o want, gairebé mai no van en continuous.'],
  ),
  puntosClave: L(
    ['Forma: am / is / are + verbo-ing.', 'Usos: ahora mismo, situaciones temporales y planes futuros.', 'Palabras pista: now, right now, at the moment, today, Look!, Listen!', 'Negativa: am not / isn’t / aren’t + -ing.', 'Pregunta: Am / Is / Are + sujeto + -ing?', 'Verbos de estado (know, like, want) van en present simple.'],
    ['Form: am / is / are + verb-ing.', 'Uses: right now, temporary situations and future plans.', 'Signal words: now, right now, at the moment, today, Look!, Listen!', 'Negative: am not / isn’t / aren’t + -ing.', 'Question: Am / Is / Are + subject + -ing?', 'State verbs (know, like, want) take the present simple.'],
    ['Forma: am / is / are + verb-ing.', 'Usos: ara mateix, situacions temporals i plans futurs.', 'Paraules pista: now, right now, at the moment, today, Look!, Listen!', 'Negativa: am not / isn’t / aren’t + -ing.', 'Pregunta: Am / Is / Are + subjecte + -ing?', 'Els verbs d’estat (know, like, want) van en present simple.'],
  ),
  secciones: [
    {
      titulo: L('Cómo se forma', 'How it is formed', 'Com es forma'),
      tabla: {
        columnas: L(['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta'], ['Subject', 'Positive', 'Negative', 'Question'], ['Subjecte', 'Afirmativa', 'Negativa', 'Pregunta']),
        filas: [
          ['I', 'I am (I’m) eating', 'I am not (I’m not) eating', 'Am I eating?'],
          ['he / she / it', 'she is (she’s) eating', 'she is not (isn’t) eating', 'Is she eating?'],
          ['you / we / they', 'they are (they’re) eating', 'they are not (aren’t) eating', 'Are they eating?'],
        ],
      },
    },
    {
      titulo: L('Ortografía de -ing', '-ing spelling', 'Ortografia de -ing'),
      tabla: {
        columnas: L(['Caso', 'Regla', 'Ejemplos'], ['Case', 'Rule', 'Examples'], ['Cas', 'Regla', 'Exemples']),
        filas: [
          [L('General', 'General', 'General'), '+ -ing', 'play → playing, read → reading'],
          [L('Acaba en -e muda', 'Ends in silent -e', 'Acaba en -e muda'), L('pierde la -e', 'drop the -e', 'perd la -e'), 'write → writing, dance → dancing'],
          [L('Consonante-vocal-consonante tónica', 'Stressed consonant-vowel-consonant', 'Consonant-vocal-consonant tònica'), L('dobla la última consonante', 'double the last consonant', 'dobla l’última consonant'), 'run → running, swim → swimming, sit → sitting'],
          [L('Acaba en -ie', 'Ends in -ie', 'Acaba en -ie'), 'ie → y', 'lie → lying, die → dying'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cuándo uso present continuous y cuándo present simple?', 'When do I use the present continuous and when the present simple?', 'Quan faig servir el present continuous i quan el present simple?'),
      r: T('Present simple para hábitos y verdades (I play football on Saturdays); present continuous para lo que pasa ahora o estos días (I am playing football now).', 'Present simple for habits and facts (I play football on Saturdays); present continuous for what is happening now or around now (I am playing football now).', 'Present simple per a hàbits i veritats (I play football on Saturdays); present continuous per al que passa ara o aquests dies (I am playing football now).') },
  ],
  ejercicios: [
    { e: 'Look! It ___ (rain).', s: 'is raining' },
    { e: T('Escribe la forma -ing: swim, make, study, sit.', 'Write the -ing form: swim, make, study, sit.', 'Escriu la forma -ing: swim, make, study, sit.'), s: 'swimming, making, studying, sitting' },
    { e: T('Pon en negativa: «They are watching TV».', 'Make it negative: «They are watching TV».', 'Posa-ho en negativa: «They are watching TV».'), s: 'They aren’t (are not) watching TV.' },
    { e: T('Haz la pregunta: she / do / her homework / now.', 'Make the question: she / do / her homework / now.', 'Fes la pregunta: she / do / her homework / now.'), s: 'Is she doing her homework now?' },
    { e: T('¿Simple o continuous? «I ___ (go) to school by bus every day» y «Right now I ___ (walk) home».', 'Simple or continuous? «I ___ (go) to school by bus every day» and «Right now I ___ (walk) home».', 'Simple o continuous? «I ___ (go) to school by bus every day» i «Right now I ___ (walk) home».'), s: 'go (habit) / am walking (now)' },
  ],
}

const haveGot = {
  metaTitle: L('Have got y has got en inglés: afirmativa, negativa y preguntas — resumen y ejercicios', 'Have got and has got: positive, negative and questions — summary and practice questions', 'Have got i has got en anglès: afirmativa, negativa i preguntes — resum i exercicis'),
  metaDesc: L('Cómo se usa have got / has got para hablar de lo que tienes (posesiones, familia, aspecto), sus formas en afirmativa, negativa y pregunta, y la diferencia con have. Con ejercicios.', 'How to use have got / has got to talk about what you have (belongings, family, appearance), its positive, negative and question forms, and how it differs from have.', 'Com s’usa have got / has got per parlar del que tens (possessions, família, aspecte), les formes en afirmativa, negativa i pregunta, i la diferència amb have. Amb exercicis.'),
  resumen: L(
    ['Have got significa «tener» y se usa para posesiones (I have got a bike), familia (She has got two brothers), aspecto físico (He has got blue eyes) y enfermedades (I have got a cold). Con he, she e it se usa has got; con el resto, have got.', 'A diferencia de los demás verbos, have got no usa do para negar ni preguntar: se niega con haven’t got / hasn’t got y se pregunta poniendo have o has delante (Have you got a pet?). Es más frecuente en inglés británico; en americano se dice más I have / Do you have…?'],
    ['Have got means «to have» and is used for belongings (I have got a bike), family (She has got two brothers), appearance (He has got blue eyes) and illnesses (I have got a cold). With he, she and it you use has got; with the rest, have got.', 'Unlike other verbs, have got does not use do in negatives or questions: the negative is haven’t got / hasn’t got and to ask you put have or has first (Have you got a pet?). It is more common in British English; American English prefers I have / Do you have…?'],
    ['Have got vol dir «tenir» i s’usa per a possessions (I have got a bike), família (She has got two brothers), aspecte físic (He has got blue eyes) i malalties (I have got a cold). Amb he, she i it s’usa has got; amb la resta, have got.', 'A diferència dels altres verbs, have got no fa servir do per negar ni preguntar: es nega amb haven’t got / hasn’t got i es pregunta posant have o has al davant (Have you got a pet?). És més freqüent en anglès britànic; en americà es diu més I have / Do you have…?'],
  ),
  puntosClave: L(
    ['I / you / we / they → have got (’ve got).', 'he / she / it → has got (’s got).', 'Negativa: haven’t got / hasn’t got.', 'Pregunta: Have you got…? / Has she got…?', 'Respuestas cortas: Yes, I have. / No, she hasn’t.', 'Sin do: «Do you have got» es incorrecto.'],
    ['I / you / we / they → have got (’ve got).', 'he / she / it → has got (’s got).', 'Negative: haven’t got / hasn’t got.', 'Question: Have you got…? / Has she got…?', 'Short answers: Yes, I have. / No, she hasn’t.', 'No do: «Do you have got» is wrong.'],
    ['I / you / we / they → have got (’ve got).', 'he / she / it → has got (’s got).', 'Negativa: haven’t got / hasn’t got.', 'Pregunta: Have you got…? / Has she got…?', 'Respostes curtes: Yes, I have. / No, she hasn’t.', 'Sense do: «Do you have got» és incorrecte.'],
  ),
  secciones: [
    {
      titulo: L('Formas de have got', 'Forms of have got', 'Formes de have got'),
      tabla: {
        columnas: L(['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta', 'Respuesta corta'], ['Subject', 'Positive', 'Negative', 'Question', 'Short answer'], ['Subjecte', 'Afirmativa', 'Negativa', 'Pregunta', 'Resposta curta']),
        filas: [
          ['I / you / we / they', 'I have got (I’ve got) a dog', 'I haven’t got a dog', 'Have you got a dog?', 'Yes, I have. / No, I haven’t.'],
          ['he / she / it', 'she has got (she’s got) a dog', 'she hasn’t got a dog', 'Has she got a dog?', 'Yes, she has. / No, she hasn’t.'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Es lo mismo have got que have?', 'Is have got the same as have?', 'És el mateix have got que have?'),
      r: T('Para hablar de lo que se tiene, sí: «I have got a car» = «I have a car». Pero have también sirve para acciones (have breakfast, have a shower), y ahí no se puede usar have got.', 'For talking about what you have, yes: «I have got a car» = «I have a car». But have is also used for actions (have breakfast, have a shower), and there have got cannot be used.', 'Per parlar del que es té, sí: «I have got a car» = «I have a car». Però have també serveix per a accions (have breakfast, have a shower), i aquí no es pot fer servir have got.') },
  ],
  ejercicios: [
    { e: 'My sister ___ (have got) long hair.', s: 'has got' },
    { e: T('Pon en negativa: «We have got a garden».', 'Make it negative: «We have got a garden».', 'Posa-ho en negativa: «We have got a garden».'), s: 'We haven’t got a garden.' },
    { e: T('Haz la pregunta y da una respuesta corta afirmativa: he / a computer.', 'Make the question and give a short positive answer: he / a computer.', 'Fes la pregunta i dona una resposta curta afirmativa: he / a computer.'), s: 'Has he got a computer? — Yes, he has.' },
    { e: T('Corrige: «Do you have got any brothers?».', 'Correct: «Do you have got any brothers?».', 'Corregeix: «Do you have got any brothers?».'), s: T('«Have you got any brothers?» (o «Do you have any brothers?», sin got).', '«Have you got any brothers?» (or «Do you have any brothers?», without got).', '«Have you got any brothers?» (o «Do you have any brothers?», sense got).') },
  ],
}

const thereIs = {
  metaTitle: L('There is y there are en inglés: singular, plural, some, any y preguntas — resumen y ejercicios', 'There is and there are: singular, plural, some, any and questions — summary and practice questions', 'There is i there are en anglès: singular, plural, some, any i preguntes — resum i exercicis'),
  metaDesc: L('Cuándo se usa there is y there are (hay), en afirmativa, negativa y pregunta, con some, any, a/an y how many, y en pasado (there was / there were). Con ejercicios.', 'When to use there is and there are, in positive, negative and question forms, with some, any, a/an and how many, and in the past (there was / there were). With exercises.', 'Quan s’usa there is i there are (hi ha), en afirmativa, negativa i pregunta, amb some, any, a/an i how many, i en passat (there was / there were). Amb exercicis.'),
  resumen: L(
    ['There is y there are significan «hay». There is va con un sustantivo en singular o incontable (There is a cat in the garden, There is some milk) y there are, con plural (There are three books on the table).', 'En negativa se usa there isn’t / there aren’t, normalmente con any en plural (There aren’t any apples). Para preguntar se invierte el orden: Is there…? / Are there…? Y para preguntar cantidades, How many… are there? En pasado: there was / there were.'],
    ['There is and there are mean «hay» (there is/are something somewhere). There is goes with a singular or uncountable noun (There is a cat in the garden, There is some milk) and there are with plurals (There are three books on the table).', 'The negative is there isn’t / there aren’t, usually with any in the plural (There aren’t any apples). To ask, swap the order: Is there…? / Are there…? And to ask about quantity, How many… are there? In the past: there was / there were.'],
    ['There is i there are volen dir «hi ha». There is va amb un substantiu en singular o incomptable (There is a cat in the garden, There is some milk) i there are, amb plural (There are three books on the table).', 'En negativa es fa servir there isn’t / there aren’t, normalment amb any en plural (There aren’t any apples). Per preguntar s’inverteix l’ordre: Is there…? / Are there…? I per preguntar quantitats, How many… are there? En passat: there was / there were.'],
  ),
  puntosClave: L(
    ['There is + singular o incontable; there are + plural.', 'Afirmativa con some; negativa y pregunta con any.', 'Pregunta: Is there…? / Are there…?', 'Cantidad: How many + plural + are there?', 'Pasado: there was / there were.', 'Respuestas cortas: Yes, there is. / No, there aren’t.'],
    ['There is + singular or uncountable; there are + plural.', 'Positive with some; negative and question with any.', 'Question: Is there…? / Are there…?', 'Quantity: How many + plural + are there?', 'Past: there was / there were.', 'Short answers: Yes, there is. / No, there aren’t.'],
    ['There is + singular o incomptable; there are + plural.', 'Afirmativa amb some; negativa i pregunta amb any.', 'Pregunta: Is there…? / Are there…?', 'Quantitat: How many + plural + are there?', 'Passat: there was / there were.', 'Respostes curtes: Yes, there is. / No, there aren’t.'],
  ),
  secciones: [
    {
      titulo: L('Formas de there is / there are', 'Forms of there is / there are', 'Formes de there is / there are'),
      tabla: {
        columnas: L(['', 'Singular', 'Plural'], ['', 'Singular', 'Plural'], ['', 'Singular', 'Plural']),
        filas: [
          [L('Afirmativa', 'Positive', 'Afirmativa'), 'There is (there’s) a sofa.', 'There are some chairs.'],
          [L('Negativa', 'Negative', 'Negativa'), 'There isn’t a sofa.', 'There aren’t any chairs.'],
          [L('Pregunta', 'Question', 'Pregunta'), 'Is there a sofa?', 'Are there any chairs?'],
          [L('Respuesta corta', 'Short answer', 'Resposta curta'), 'Yes, there is. / No, there isn’t.', 'Yes, there are. / No, there aren’t.'],
          [L('Pasado', 'Past', 'Passat'), 'There was a sofa.', 'There were some chairs.'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Se dice «There is some milk» o «There are some milk»?', 'Is it «There is some milk» or «There are some milk»?', 'Es diu «There is some milk» o «There are some milk»?'),
      r: T('«There is some milk»: milk es incontable y va en singular, como water, bread o money.', '«There is some milk»: milk is uncountable and takes the singular, like water, bread or money.', '«There is some milk»: milk és incomptable i va en singular, com water, bread o money.') },
  ],
  ejercicios: [
    { e: '___ a big tree in the park. / ___ two swings.', s: 'There is / There are' },
    { e: T('Completa con some o any: «There aren’t ___ eggs» y «There are ___ bananas».', 'Fill in some or any: «There aren’t ___ eggs» and «There are ___ bananas».', 'Completa amb some o any: «There aren’t ___ eggs» i «There are ___ bananas».'), s: 'any / some' },
    { e: T('Haz la pregunta: a bank / near here.', 'Make the question: a bank / near here.', 'Fes la pregunta: a bank / near here.'), s: 'Is there a bank near here?' },
    { e: T('Pregunta cuántos alumnos hay en tu clase.', 'Ask how many pupils there are in your class.', 'Pregunta quants alumnes hi ha a la teva classe.'), s: 'How many pupils are there in your class?' },
    { e: T('Pasa al pasado: «There are a lot of people».', 'Put it into the past: «There are a lot of people».', 'Passa-ho al passat: «There are a lot of people».'), s: 'There were a lot of people.' },
  ],
}

const possessives = {
  metaTitle: L('Adjetivos y pronombres posesivos en inglés (my, your… mine, yours) y el genitivo sajón — ejercicios', 'Possessive adjectives and pronouns (my, your… mine, yours) and possessive ’s — summary and practice', 'Adjectius i pronoms possessius en anglès (my, your… mine, yours) i el genitiu saxó — exercicis'),
  metaDesc: L('Tabla de adjetivos posesivos (my, your, his, her, its, our, their) y pronombres posesivos (mine, yours…), la diferencia entre ellos, el genitivo sajón (’s) y ejercicios resueltos.', 'Table of possessive adjectives (my, your, his, her, its, our, their) and possessive pronouns (mine, yours…), the difference between them, the possessive ’s and solved exercises.', 'Taula d’adjectius possessius (my, your, his, her, its, our, their) i pronoms possessius (mine, yours…), la diferència entre ells, el genitiu saxó (’s) i exercicis resolts.'),
  resumen: L(
    ['Los adjetivos posesivos (my, your, his, her, its, our, their) van siempre delante de un sustantivo: my bag, their house. No cambian aunque el sustantivo sea plural (my books) y dependen del poseedor, no de la cosa: his mother es «la madre de él» y her father, «el padre de ella».', 'Los pronombres posesivos (mine, yours, his, hers, ours, theirs) van solos, sin sustantivo, porque lo sustituyen: «This bag is mine». Para decir de quién es algo con un nombre se usa el genitivo sajón: Tom’s bike, my parents’ car.'],
    ['Possessive adjectives (my, your, his, her, its, our, their) always go before a noun: my bag, their house. They do not change for plural nouns (my books) and depend on the owner, not the thing: his mother is a male owner’s mother and her father, a female owner’s father.', 'Possessive pronouns (mine, yours, his, hers, ours, theirs) stand alone, without a noun, because they replace it: «This bag is mine». To say whose something is with a name, use the possessive ’s: Tom’s bike, my parents’ car.'],
    ['Els adjectius possessius (my, your, his, her, its, our, their) van sempre davant d’un substantiu: my bag, their house. No canvien encara que el substantiu sigui plural (my books) i depenen del posseïdor, no de la cosa: his mother és «la mare d’ell» i her father, «el pare d’ella».', 'Els pronoms possessius (mine, yours, his, hers, ours, theirs) van sols, sense substantiu, perquè el substitueixen: «This bag is mine». Per dir de qui és una cosa amb un nom es fa servir el genitiu saxó: Tom’s bike, my parents’ car.'],
  ),
  puntosClave: L(
    ['Adjetivo posesivo + sustantivo: my book, her cat.', 'Pronombre posesivo, solo: It’s mine.', 'His = de él; her = de ella; its = de una cosa o animal.', 'No llevan s en plural: my books (no «mys»).', 'Genitivo sajón: Ana’s phone; en plural acabado en -s, solo apóstrofo: the girls’ room.', 'Its (posesivo) no lleva apóstrofo; it’s = it is.'],
    ['Possessive adjective + noun: my book, her cat.', 'Possessive pronoun, alone: It’s mine.', 'His = a male owner’s; her = a female owner’s; its = a thing’s or animal’s.', 'They take no s in the plural: my books (not «mys»).', 'Possessive ’s: Ana’s phone; for plurals ending in -s, just the apostrophe: the girls’ room.', 'Its (possessive) has no apostrophe; it’s = it is.'],
    ['Adjectiu possessiu + substantiu: my book, her cat.', 'Pronom possessiu, sol: It’s mine.', 'His = d’ell; her = d’ella; its = d’una cosa o animal.', 'No porten s en plural: my books (no «mys»).', 'Genitiu saxó: Ana’s phone; en plural acabat en -s, només apòstrof: the girls’ room.', 'Its (possessiu) no porta apòstrof; it’s = it is.'],
  ),
  secciones: [
    {
      titulo: L('Tabla de posesivos', 'Possessives table', 'Taula de possessius'),
      tabla: {
        columnas: L(['Pronombre sujeto', 'Adjetivo posesivo', 'Pronombre posesivo', 'Ejemplo'], ['Subject pronoun', 'Possessive adjective', 'Possessive pronoun', 'Example'], ['Pronom subjecte', 'Adjectiu possessiu', 'Pronom possessiu', 'Exemple']),
        filas: [
          ['I', 'my', 'mine', 'It’s my pen. It’s mine.'],
          ['you', 'your', 'yours', 'It’s your pen. It’s yours.'],
          ['he', 'his', 'his', 'It’s his pen. It’s his.'],
          ['she', 'her', 'hers', 'It’s her pen. It’s hers.'],
          ['it', 'its', '—', 'The dog wagged its tail.'],
          ['we', 'our', 'ours', 'It’s our car. It’s ours.'],
          ['they', 'their', 'theirs', 'It’s their car. It’s theirs.'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cómo traduzco «su»?', 'How do I translate the Spanish «su»?', 'Com tradueixo «su»?'),
      r: T('Depende de quién sea el dueño: his (de él), her (de ella), its (de una cosa o animal), their (de ellos) o your (de usted). «Su casa» puede ser his house, her house o their house.', 'It depends on the owner: his (male), her (female), its (a thing or animal), their (several people) or your (formal you). «Su casa» can be his house, her house or their house.', 'Depèn de qui sigui l’amo: his (d’ell), her (d’ella), its (d’una cosa o animal), their (d’ells) o your (de vostè). «Su casa» pot ser his house, her house o their house.') },
  ],
  ejercicios: [
    { e: '(she) This is ___ bike. / (they) ___ house is big.', s: 'her / Their' },
    { e: T('Cambia por un pronombre posesivo: «This is my book» → «This book is ___».', 'Replace with a possessive pronoun: «This is my book» → «This book is ___».', 'Canvia per un pronom possessiu: «This is my book» → «This book is ___».'), s: 'mine' },
    { e: T('¿Its o it’s? «___ raining» y «The cat is eating ___ food».', 'Its or it’s? «___ raining» and «The cat is eating ___ food».', 'Its o it’s? «___ raining» i «The cat is eating ___ food».'), s: 'It’s raining / its food' },
    { e: T('Escribe con genitivo sajón: «el coche de mi padre» y «la habitación de las chicas».', 'Write with the possessive ’s: «my father’s car» and «the girls’ room» from «el coche de mi padre» and «la habitación de las chicas».', 'Escriu amb genitiu saxó: «el cotxe del meu pare» i «l’habitació de les noies».'), s: 'my father’s car / the girls’ room' },
  ],
}

const can = {
  metaTitle: L('Can y can’t en inglés: habilidad, permiso y peticiones — resumen y ejercicios', 'Can and can’t: ability, permission and requests — summary and practice questions', 'Can i can’t en anglès: habilitat, permís i peticions — resum i exercicis'),
  metaDesc: L('Cómo se usa can / can’t para hablar de habilidades, pedir permiso y hacer peticiones, sus reglas (sin -s, sin to, sin do), could como pasado y ejercicios resueltos.', 'How to use can / can’t for abilities, asking permission and making requests, its rules (no -s, no to, no do), could as its past and solved exercises.', 'Com s’usa can / can’t per parlar d’habilitats, demanar permís i fer peticions, les regles (sense -s, sense to, sense do), could com a passat i exercicis resolts.'),
  resumen: L(
    ['Can sirve para decir lo que alguien sabe o puede hacer (I can swim), para pedir permiso (Can I go to the toilet?) y para pedir algo (Can you help me?). En negativa es can’t o cannot: She can’t drive.', 'Es un verbo modal, así que tiene reglas especiales: es igual para todas las personas (he can, no «he cans»), el verbo que lo sigue va sin to (I can play, no «can to play») y pregunta y niega sin do (Can you…? / I can’t…). Su pasado es could: When I was five, I could read.'],
    ['Can is used to say what someone is able to do (I can swim), to ask for permission (Can I go to the toilet?) and to ask for something (Can you help me?). The negative is can’t or cannot: She can’t drive.', 'It is a modal verb, so it has special rules: it is the same for every person (he can, not «he cans»), the verb after it has no to (I can play, not «can to play») and it forms questions and negatives without do (Can you…? / I can’t…). Its past is could: When I was five, I could read.'],
    ['Can serveix per dir el que algú sap o pot fer (I can swim), per demanar permís (Can I go to the toilet?) i per demanar alguna cosa (Can you help me?). En negativa és can’t o cannot: She can’t drive.', 'És un verb modal, així que té regles especials: és igual per a totes les persones (he can, no «he cans»), el verb que el segueix va sense to (I can play, no «can to play») i pregunta i nega sense do (Can you…? / I can’t…). El seu passat és could: When I was five, I could read.'],
  ),
  puntosClave: L(
    ['Habilidad: I can swim. Permiso: Can I…? Petición: Can you…?', 'Igual para todas las personas: he can, they can.', 'Verbo sin to detrás: can play.', 'Negativa: can’t / cannot. Pregunta: Can + sujeto + verbo?', 'Respuestas cortas: Yes, I can. / No, I can’t.', 'Pasado: could / couldn’t.'],
    ['Ability: I can swim. Permission: Can I…? Request: Can you…?', 'Same for every person: he can, they can.', 'Verb after it without to: can play.', 'Negative: can’t / cannot. Question: Can + subject + verb?', 'Short answers: Yes, I can. / No, I can’t.', 'Past: could / couldn’t.'],
    ['Habilitat: I can swim. Permís: Can I…? Petició: Can you…?', 'Igual per a totes les persones: he can, they can.', 'Verb sense to darrere: can play.', 'Negativa: can’t / cannot. Pregunta: Can + subjecte + verb?', 'Respostes curtes: Yes, I can. / No, I can’t.', 'Passat: could / couldn’t.'],
  ),
  secciones: [
    {
      titulo: L('Formas y usos de can', 'Forms and uses of can', 'Formes i usos de can'),
      tabla: {
        columnas: L(['', 'Ejemplo', 'Uso'], ['', 'Example', 'Use'], ['', 'Exemple', 'Ús']),
        filas: [
          [L('Afirmativa', 'Positive', 'Afirmativa'), 'She can play the guitar.', L('habilidad', 'ability', 'habilitat')],
          [L('Negativa', 'Negative', 'Negativa'), 'I can’t (cannot) swim.', L('falta de habilidad', 'lack of ability', 'falta d’habilitat')],
          [L('Pregunta', 'Question', 'Pregunta'), 'Can I open the window?', L('permiso', 'permission', 'permís')],
          [L('Pregunta', 'Question', 'Pregunta'), 'Can you pass me the salt?', L('petición', 'request', 'petició')],
          [L('Respuesta corta', 'Short answer', 'Resposta curta'), 'Yes, you can. / No, you can’t.', '—'],
          [L('Pasado', 'Past', 'Passat'), 'I could ride a bike when I was six.', L('habilidad en el pasado', 'past ability', 'habilitat en el passat')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Can o could para pedir algo?', 'Can or could for asking something?', 'Can o could per demanar alguna cosa?'),
      r: T('Los dos valen; could es más educado: «Could you help me, please?».', 'Both work; could is more polite: «Could you help me, please?».', 'Tots dos valen; could és més educat: «Could you help me, please?».') },
  ],
  ejercicios: [
    { e: T('Corrige: «My brother cans speak French».', 'Correct: «My brother cans speak French».', 'Corregeix: «My brother cans speak French».'), s: 'My brother can speak French.' },
    { e: T('Pon en negativa y en pregunta: «You can use my phone».', 'Make it negative and a question: «You can use my phone».', 'Posa-ho en negativa i en pregunta: «You can use my phone».'), s: 'You can’t use my phone. / Can you use my phone?' },
    { e: T('Pide permiso para ir al baño.', 'Ask permission to go to the toilet.', 'Demana permís per anar al lavabo.'), s: 'Can I go to the toilet, please?' },
    { e: T('Pasa al pasado: «I can’t swim».', 'Put it into the past: «I can’t swim».', 'Passa-ho al passat: «I can’t swim».'), s: 'I couldn’t swim.' },
  ],
}

export const INGLES_BASICO = {
  'present-continuous': presentContinuous,
  'have-got': haveGot,
  'there-is-there-are': thereIs,
  possessives,
  can,
}
