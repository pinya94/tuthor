import { opcionesDeExamen, correctaDeExamen, preguntaDeExamen } from './espanolMaterial'

// Ortografía: Puntuación — primaria + ESO
//
// El cuarto tema del bloque. A diferencia de acentuación o g/j, aquí una coma
// mal puesta no es una falta menor: cambia lo que dice la frase. Por eso casi
// todas las preguntas parten de un ejemplo donde el significado se mueve.
// Las opciones pasan por opcionesDeExamen: cuando son palabras castellanas que
// la pregunta analiza, se enseñan igual en los tres idiomas. Traducirlas
// cambiaba de qué iba la pregunta y a veces la volvía falsa — la explicación
// larga está en espanolMaterial.js.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta: preguntaDeExamen(pregunta), opciones: opcionesDeExamen(opciones), correcta: correctaDeExamen(opciones, correcta), emoji, explicacion }
}

export const PREGUNTAS = [

  q('pu-01', 'primaria',
    { es: '¿Para qué sirve el punto y seguido?', en: 'What is a full stop within a paragraph for?', ca: 'Per a què serveix el punt i seguit?' },
    { es: ['Para separar oraciones que siguen tratando del mismo asunto', 'Para cambiar de tema por completo', 'Para terminar el texto', 'Para hacer una pausa breve dentro de la frase'], en: ['To separate sentences still dealing with the same subject', 'To change topic completely', 'To end the text', 'To make a short pause inside a sentence'], ca: ['Per separar oracions que continuen tractant del mateix assumpte', 'Per canviar de tema completament', 'Per acabar el text', 'Per fer una pausa breu dins de la frase'] },
    { es: 'Para separar oraciones que siguen tratando del mismo asunto', en: 'To separate sentences still dealing with the same subject', ca: 'Per separar oracions que continuen tractant del mateix assumpte' },
    '⏺️',
    { es: 'Los tres puntos se diferencian por cuánto separan: el seguido cierra una oración, el aparte cierra un párrafo y cambia de idea, y el final cierra el texto entero.', en: 'The three kinds of stop differ in how much they separate: one closes a sentence, one closes a paragraph and shifts idea, and the last closes the whole text.', ca: 'Els tres punts es diferencien per quant separen: el seguit tanca una oració i el a part tanca un paràgraf.' }),

  q('pu-02', 'primaria',
    { es: '¿Qué signo se usa para separar los elementos de una enumeración?', en: 'Which mark separates the items of a list?', ca: 'Quin signe es fa servir per separar els elements d\'una enumeració?' },
    { es: ['La coma', 'El punto', 'Los dos puntos', 'El punto y coma siempre'], en: ['The comma', 'The full stop', 'The colon', 'Always the semicolon'], ca: ['La coma', 'El punt', 'Els dos punts', 'Sempre el punt i coma'] },
    { es: 'La coma', en: 'The comma', ca: 'La coma' },
    '➕',
    { es: '"Compré pan, leche, huevos y fruta". Fíjate en que antes de la "y" final NO va coma: es el error más repetido, y viene de copiar el inglés, donde a veces sí se pone.', en: '"I bought bread, milk, eggs and fruit". Note that there is NO comma before the final "and": it is the commonest error, copied from English, where it is sometimes used.', ca: 'Fixa\'t que abans de la "i" final NO hi va coma: és l\'error més repetit.' }),

  q('pu-03', 'primaria',
    { es: '¿Dónde se ponen los signos de interrogación en español?', en: 'Where do question marks go in Spanish?', ca: 'On es posen els signes d\'interrogació en castellà?' },
    { es: ['Al principio y al final de la pregunta', 'Solo al final', 'Solo al principio', 'Donde uno quiera'], en: ['At the beginning and at the end of the question', 'Only at the end', 'Only at the beginning', 'Wherever you like'], ca: ['Al principi i al final de la pregunta', 'Només al final', 'Només al principi', 'On un vulgui'] },
    { es: 'Al principio y al final de la pregunta', en: 'At the beginning and at the end of the question', ca: 'Al principi i al final de la pregunta' },
    '❓',
    { es: 'El español es de los pocos idiomas que abre los signos, y no es un capricho: como el orden de las palabras no cambia al preguntar, sin el signo de apertura no sabrías con qué entonación empezar a leer en voz alta.', en: 'Spanish is one of the few languages that opens these marks, and it is not a whim: since word order does not change in questions, without the opening mark you would not know what intonation to start reading aloud with.', ca: 'El castellà és dels pocs idiomes que obre els signes, i no és un caprici: l\'ordre de les paraules no canvia en preguntar.' }),

  q('pu-04', 'primaria',
    { es: '¿Cuándo se usan los dos puntos?', en: 'When is a colon used?', ca: 'Quan es fan servir els dos punts?' },
    { es: ['Antes de una enumeración, una cita o una explicación de lo anterior', 'Para separar palabras de una lista', 'Al final de cada párrafo', 'Para marcar una pregunta'], en: ['Before a list, a quotation or an explanation of what came before', 'To separate words in a list', 'At the end of each paragraph', 'To mark a question'], ca: ['Abans d\'una enumeració, una citació o una explicació de l\'anterior', 'Per separar paraules d\'una llista', 'Al final de cada paràgraf', 'Per marcar una pregunta'] },
    { es: 'Antes de una enumeración, una cita o una explicación de lo anterior', en: 'Before a list, a quotation or an explanation of what came before', ca: 'Abans d\'una enumeració, una citació o una explicació de l\'anterior' },
    '⏸️',
    { es: 'Anuncian que viene algo: "Tenía tres opciones: correr, esconderse o pelear". Después de dos puntos se sigue en minúscula, salvo si empieza una cita textual o un texto nuevo.', en: 'They announce that something is coming: "He had three options: run, hide or fight". After a colon you continue in lower case, unless a direct quotation or a new text begins.', ca: 'Anuncien que ve alguna cosa. Després de dos punts se segueix en minúscula, tret que comenci una citació.' }),

  q('pu-05', 'primaria',
    { es: 'Cuando llamamos a alguien por su nombre dentro de una frase, ¿qué lleva?', en: 'When we address someone by name inside a sentence, what does it take?', ca: 'Quan cridem algú pel seu nom dins d\'una frase, què porta?' },
    { es: ['Se separa con comas: "Marta, ven aquí"', 'No lleva nada', 'Lleva dos puntos delante', 'Lleva punto y coma'], en: ['It is set off with commas: "Marta, come here"', 'It takes nothing', 'It takes a colon before it', 'It takes a semicolon'], ca: ['Se separa amb comes: "Marta, vine aquí"', 'No porta res', 'Porta dos punts al davant', 'Porta punt i coma'] },
    { es: 'Se separa con comas: "Marta, ven aquí"', en: 'It is set off with commas: "Marta, come here"', ca: 'Se separa amb comes: "Marta, vine aquí"' },
    '🗣️',
    { es: 'Se llama vocativo y siempre va entre comas. La diferencia es enorme: "Vamos a comer, niños" es una invitación y "Vamos a comer niños" es otra cosa muy distinta.', en: 'It is called a vocative and always goes between commas. The difference is huge: "Let\'s eat, kids" is an invitation and "Let\'s eat kids" is something else entirely.', ca: 'S\'anomena vocatiu i sempre va entre comes: "Anem a menjar, nens" no és el mateix que "Anem a menjar nens".' }),

  q('pu-06', 'primaria',
    { es: '¿Se pone coma entre el sujeto y el verbo?', en: 'Do you put a comma between subject and verb?', ca: 'Es posa coma entre el subjecte i el verb?' },
    { es: ['No, nunca', 'Sí, siempre', 'Solo si el sujeto es largo', 'Solo en preguntas'], en: ['No, never', 'Yes, always', 'Only if the subject is long', 'Only in questions'], ca: ['No, mai', 'Sí, sempre', 'Només si el subjecte és llarg', 'Només en preguntes'] },
    { es: 'No, nunca', en: 'No, never', ca: 'No, mai' },
    '🚫',
    { es: 'Aunque al leer en voz alta hagas una pausa, esa coma no se escribe: "Los niños de mi clase, juegan al fútbol" está mal. Es de las faltas de puntuación más frecuentes justamente porque la pausa se oye.', en: 'Even if you pause when reading aloud, that comma is not written: "The children in my class, play football" is wrong. It is one of the commonest punctuation errors precisely because the pause is audible.', ca: 'Encara que en llegir en veu alta facis una pausa, aquesta coma no s\'escriu.' }),

  q('pu-07', 'primaria',
    { es: '¿Qué signo se usa en español para marcar el diálogo de un personaje?', en: 'Which mark introduces a character\'s speech in Spanish?', ca: 'Quin signe es fa servir en castellà per marcar el diàleg d\'un personatge?' },
    { es: ['La raya (—)', 'Las comillas siempre', 'El guion corto (-)', 'Los paréntesis'], en: ['The dash (—)', 'Always quotation marks', 'The short hyphen (-)', 'Brackets'], ca: ['La ratlla (—)', 'Sempre les cometes', 'El guionet (-)', 'Els parèntesis'] },
    { es: 'La raya (—)', en: 'The dash (—)', ca: 'La ratlla (—)' },
    '💬',
    { es: 'La raya es más larga que el guion y no es lo mismo: el guion corto une palabras (teórico-práctico) y parte palabras a final de línea. En inglés se usan comillas para el diálogo, y de ahí viene la confusión.', en: 'The dash is longer than the hyphen and is not the same: the hyphen joins words and splits them at line ends. English uses quotation marks for speech, which is where the confusion comes from.', ca: 'La ratlla és més llarga que el guionet i no és el mateix. En anglès es fan servir cometes per al diàleg.' }),

  q('pu-08', 'primaria',
    { es: '¿Para qué sirven los puntos suspensivos (…)?', en: 'What are ellipsis dots (…) for?', ca: 'Per a què serveixen els punts suspensius (…)?' },
    { es: ['Para dejar algo en suspenso, sin terminar', 'Para separar una lista', 'Para marcar una pregunta', 'Para terminar un texto'], en: ['To leave something hanging, unfinished', 'To separate a list', 'To mark a question', 'To end a text'], ca: ['Per deixar alguna cosa en suspens, sense acabar', 'Per separar una llista', 'Per marcar una pregunta', 'Per acabar un text'] },
    { es: 'Para dejar algo en suspenso, sin terminar', en: 'To leave something hanging, unfinished', ca: 'Per deixar alguna cosa en suspens, sense acabar' },
    '⋯',
    { es: 'Son siempre tres, ni dos ni cinco. Sirven para dejar una frase abierta, para insinuar sin decir o para señalar que se ha cortado una cita.', en: 'There are always three, not two or five. They leave a sentence open, hint without saying, or show that a quotation has been cut.', ca: 'Són sempre tres, ni dos ni cinc. Serveixen per deixar una frase oberta o insinuar sense dir.' }),

  q('pu-09', 'primaria',
    { es: '¿Qué signo lleva una frase que expresa sorpresa o emoción fuerte?', en: 'Which mark does a sentence expressing surprise or strong emotion take?', ca: 'Quin signe porta una frase que expressa sorpresa o emoció forta?' },
    { es: ['Los signos de exclamación, al principio y al final', 'Solo un punto', 'Los dos puntos', 'Comillas'], en: ['Exclamation marks, at the beginning and the end', 'Just a full stop', 'A colon', 'Quotation marks'], ca: ['Els signes d\'exclamació, al principi i al final', 'Només un punt', 'Els dos punts', 'Cometes'] },
    { es: 'Los signos de exclamación, al principio y al final', en: 'Exclamation marks, at the beginning and the end', ca: 'Els signes d\'exclamació, al principi i al final' },
    '❗',
    { es: 'Igual que la interrogación, se abren y se cierran. Y no se acumulan: escribir "¡¡¡Qué fuerte!!!" no es correcto, aunque se vea a todas horas en mensajes.', en: 'Like question marks, they open and close. And they do not stack: writing "!!!Wow!!!" is not correct, however often it appears in messages.', ca: 'Igual que la interrogació, s\'obren i es tanquen. I no s\'acumulen.' }),

  q('pu-10', 'primaria',
    { es: '¿Se escribe punto después de los signos de interrogación o exclamación?', en: 'Do you write a full stop after a question or exclamation mark?', ca: 'S\'escriu punt després dels signes d\'interrogació o exclamació?' },
    { es: ['No: el signo de cierre ya hace de punto', 'Sí, siempre', 'Solo si la frase es larga', 'Solo con exclamación'], en: ['No: the closing mark already acts as a full stop', 'Yes, always', 'Only if the sentence is long', 'Only with exclamations'], ca: ['No: el signe de tancament ja fa de punt', 'Sí, sempre', 'Només si la frase és llarga', 'Només amb exclamació'] },
    { es: 'No: el signo de cierre ya hace de punto', en: 'No: the closing mark already acts as a full stop', ca: 'No: el signe de tancament ja fa de punt' },
    '✅',
    { es: '"¿Vienes? Te espero" es correcto; "¿Vienes?. Te espero" no. Sí puede ir coma después, si la frase sigue: "¿Vienes?, pregunté".', en: '"Are you coming? I\'ll wait" is right; adding a stop after the question mark is not. A comma can follow if the sentence continues: "Are you coming?, I asked".', ca: 'El signe de tancament ja fa de punt. Sí que hi pot anar coma després, si la frase continua.' }),

  q('pu-11', 'primaria',
    { es: 'En "Madrid, la capital de España, tiene tres millones de habitantes", ¿qué hacen las comas?', en: 'In "Madrid, the capital of Spain, has three million people", what do the commas do?', ca: 'A "Madrid, la capital d\'Espanya, té tres milions d\'habitants", què fan les comes?' },
    { es: ['Encierran una explicación que se podría quitar sin romper la frase', 'Separan una enumeración', 'Marcan una pausa para respirar', 'Separan el sujeto del verbo'], en: ['They enclose an explanation that could be removed without breaking the sentence', 'They separate a list', 'They mark a pause for breath', 'They separate subject from verb'], ca: ['Tanquen una explicació que es podria treure sense trencar la frase', 'Separen una enumeració', 'Marquen una pausa per respirar', 'Separen el subjecte del verb'] },
    { es: 'Encierran una explicación que se podría quitar sin romper la frase', en: 'They enclose an explanation that could be removed without breaking the sentence', ca: 'Tanquen una explicació que es podria treure sense trencar la frase' },
    '📎',
    { es: 'Se llama inciso o aposición explicativa, y la prueba es taparlo: si la frase sigue teniendo sentido, las comas están bien puestas. Y van siempre las dos: abrir el inciso y no cerrarlo es una falta.', en: 'It is called a parenthetical, and the test is covering it up: if the sentence still makes sense, the commas are right. And both are needed: opening one without closing it is an error.', ca: 'S\'anomena incís, i la prova és tapar-lo: si la frase continua tenint sentit, les comes estan ben posades.' }),

  q('pu-12', 'primaria',
    { es: '¿Para qué sirven las comillas?', en: 'What are quotation marks for?', ca: 'Per a què serveixen les cometes?' },
    { es: ['Para reproducir palabras textuales o destacar una palabra', 'Para separar frases', 'Para marcar preguntas', 'Para terminar un párrafo'], en: ['To reproduce exact words or highlight a word', 'To separate sentences', 'To mark questions', 'To end a paragraph'], ca: ['Per reproduir paraules textuals o destacar una paraula', 'Per separar frases', 'Per marcar preguntes', 'Per acabar un paràgraf'] },
    { es: 'Para reproducir palabras textuales o destacar una palabra', en: 'To reproduce exact words or highlight a word', ca: 'Per reproduir paraules textuals o destacar una paraula' },
    '💭',
    { es: 'También sirven para marcar ironía o para citar el título de un artículo o una canción. En español las de primer nivel son las angulares («»), aunque en la práctica se usan casi siempre las inglesas ("").', en: 'They also mark irony or cite the title of an article or song. In Spanish the first-level marks are the angular ones («»), though in practice the English ones ("") are almost always used.', ca: 'També serveixen per marcar ironia o citar un títol. En castellà les de primer nivell són les angulars («»).' }),

  q('pu-13', 'primaria',
    { es: '¿Qué hace el punto y aparte?', en: 'What does a paragraph break stop do?', ca: 'Què fa el punt i a part?' },
    { es: ['Cierra un párrafo porque se pasa a otra idea', 'Cierra una oración dentro del mismo tema', 'Termina el texto entero', 'Marca una pausa muy corta'], en: ['It closes a paragraph because a new idea begins', 'It closes a sentence within the same topic', 'It ends the whole text', 'It marks a very short pause'], ca: ['Tanca un paràgraf perquè es passa a una altra idea', 'Tanca una oració dins del mateix tema', 'Acaba el text sencer', 'Marca una pausa molt curta'] },
    { es: 'Cierra un párrafo porque se pasa a otra idea', en: 'It closes a paragraph because a new idea begins', ca: 'Tanca un paràgraf perquè es passa a una altra idea' },
    '📄',
    { es: 'Después se empieza en una línea nueva. Un texto sin puntos y aparte se lee fatal aunque esté bien escrito: los párrafos son lo que da aire y estructura visible a lo que cuentas.', en: 'After it you start on a new line. A text with no paragraph breaks reads terribly even when well written: paragraphs are what give air and visible structure to what you say.', ca: 'Després es comença en una línia nova. Els paràgrafs donen aire i estructura visible.' }),

  q('pu-14', 'primaria',
    { es: '"No, espera" y "No espera": ¿cambia el significado?', en: '"No, wait" and "No wait": does the meaning change?', ca: '"No, espera" i "No espera": canvia el significat?' },
    { es: ['Sí: con coma es una orden; sin coma dice que alguien no espera', 'No, es lo mismo', 'Solo cambia la entonación', 'La segunda está mal escrita'], en: ['Yes: with a comma it is an order; without it, it says someone is not waiting', 'No, it is the same', 'Only the intonation changes', 'The second one is misspelled'], ca: ['Sí: amb coma és una ordre; sense coma diu que algú no espera', 'No, és el mateix', 'Només canvia l\'entonació', 'La segona està mal escrita'] },
    { es: 'Sí: con coma es una orden; sin coma dice que alguien no espera', en: 'Yes: with a comma it is an order; without it, it says someone is not waiting', ca: 'Sí: amb coma és una ordre; sense coma diu que algú no espera' },
    '↔️',
    { es: 'Una coma de una sola pulsación cambia la frase entera. Por eso la puntuación no es adorno ni cuestión de gusto: es parte del significado, igual que las palabras.', en: 'A single keystroke of a comma changes the whole sentence. That is why punctuation is not decoration or a matter of taste: it is part of the meaning, just like the words.', ca: 'Una coma canvia la frase sencera. La puntuació no és adorn: és part del significat.' }),

  q('pu-15', 'primaria',
    { es: '¿Qué signo va después de "Querido Juan" en una carta?', en: 'Which mark follows "Dear Juan" in a Spanish letter?', ca: 'Quin signe va després de "Estimat Joan" en una carta?' },
    { es: ['Dos puntos', 'Coma', 'Punto', 'Nada'], en: ['A colon', 'A comma', 'A full stop', 'Nothing'], ca: ['Dos punts', 'Coma', 'Punt', 'Res'] },
    { es: 'Dos puntos', en: 'A colon', ca: 'Dos punts' },
    '✉️',
    { es: 'En español el saludo de una carta o un correo lleva dos puntos, y después se empieza en otra línea y con mayúscula. En inglés se usa coma, y de ahí viene que se vea tanto la coma también en español.', en: 'In Spanish the greeting of a letter or email takes a colon, then you start on a new line with a capital. English uses a comma, which is why commas turn up so often in Spanish too.', ca: 'En castellà la salutació d\'una carta porta dos punts. En anglès es fa servir coma.' }),

  q('pu-16', 'primaria',
    { es: '¿Para qué sirven los paréntesis?', en: 'What are brackets for?', ca: 'Per a què serveixen els parèntesis?' },
    { es: ['Para meter un dato o aclaración secundaria dentro de la frase', 'Para marcar el diálogo', 'Para separar una enumeración', 'Para citar palabras textuales'], en: ['To insert a secondary detail or clarification inside the sentence', 'To mark dialogue', 'To separate a list', 'To quote exact words'], ca: ['Per ficar una dada o aclariment secundari dins de la frase', 'Per marcar el diàleg', 'Per separar una enumeració', 'Per citar paraules textuals'] },
    { es: 'Para meter un dato o aclaración secundaria dentro de la frase', en: 'To insert a secondary detail or clarification inside the sentence', ca: 'Per ficar una dada o aclariment secundari dins de la frase' },
    '🔠',
    { es: 'Se parecen a las comas de inciso, pero separan más: lo que va en paréntesis se nota más ajeno a la frase. Se usan mucho para fechas y siglas: "Cervantes (1547-1616)".', en: 'They resemble parenthetical commas but separate more: what goes in brackets feels more foreign to the sentence. They are much used for dates and acronyms: "Cervantes (1547-1616)".', ca: 'S\'assemblen a les comes d\'incís, però separen més. Es fan servir molt per a dates i sigles.' }),

  q('pu-17', 'primaria',
    { es: 'En una enumeración larga, ¿antes de la "y" final va coma?', en: 'In a long list, does a comma go before the final "and"?', ca: 'En una enumeració llarga, abans de la "i" final hi va coma?' },
    { es: ['No, en español no', 'Sí, siempre', 'Solo si hay más de cinco elementos', 'Solo en textos formales'], en: ['No, not in Spanish', 'Yes, always', 'Only with more than five items', 'Only in formal texts'], ca: ['No, en castellà no', 'Sí, sempre', 'Només si hi ha més de cinc elements', 'Només en textos formals'] },
    { es: 'No, en español no', en: 'No, not in Spanish', ca: 'No, en castellà no' },
    '🔗',
    { es: 'En inglés existe la llamada coma de Oxford, opcional, y de ahí se copia el error. En español solo se pone si hace falta para evitar una confusión de verdad, no por norma.', en: 'English has the optional Oxford comma, and the error is copied from there. In Spanish you only use it if it genuinely avoids confusion, not as a rule.', ca: 'En anglès existeix la coma d\'Oxford, opcional, i d\'aquí es copia l\'error.' }),

  q('pu-18', 'primaria',
    { es: '¿Qué signo separa las horas de los minutos en español?', en: 'Which mark separates hours from minutes in Spanish?', ca: 'Quin signe separa les hores dels minuts en castellà?' },
    { es: ['Los dos puntos: 17:30', 'La coma: 17,30', 'El punto y coma', 'El guion'], en: ['A colon: 17:30', 'A comma: 17,30', 'A semicolon', 'A hyphen'], ca: ['Els dos punts: 17:30', 'La coma: 17,30', 'El punt i coma', 'El guionet'] },
    { es: 'Los dos puntos: 17:30', en: 'A colon: 17:30', ca: 'Els dos punts: 17:30' },
    '🕔',
    { es: 'También se admite el punto (17.30). Lo que no vale es la coma, que en español se reserva para los decimales: 17,30 son diecisiete unidades y treinta centésimas, no las cinco y media.', en: 'A full stop is also accepted (17.30). What does not work is the comma, reserved in Spanish for decimals: 17,30 means seventeen point three, not half past five.', ca: 'També s\'admet el punt. El que no val és la coma, que en castellà es reserva per als decimals.' }),

  q('pu-19', 'primaria',
    { es: '¿Se pone coma antes de "porque"?', en: 'Do you put a comma before "porque" (because)?', ca: 'Es posa coma abans de "perquè"?' },
    { es: ['Solo a veces, cuando explica y no cuando indica la causa directa', 'Sí, siempre', 'No, nunca', 'Solo al final de la frase'], en: ['Only sometimes, when it explains rather than giving the direct cause', 'Yes, always', 'No, never', 'Only at the end of a sentence'], ca: ['Només de vegades, quan explica i no quan indica la causa directa', 'Sí, sempre', 'No, mai', 'Només al final de la frase'] },
    { es: 'Solo a veces, cuando explica y no cuando indica la causa directa', en: 'Only sometimes, when it explains rather than giving the direct cause', ca: 'Només de vegades, quan explica i no quan indica la causa directa' },
    '🤔',
    { es: '"No fui porque llovía" dice el motivo de no ir. "No fui, porque llovía" explica algo que ya se sabía. La coma cambia el matiz, y por eso no hay una regla de "siempre" ni de "nunca".', en: '"I did not go because it was raining" gives the reason. "I did not go, because it was raining" explains something already known. The comma shifts the nuance, so there is no "always" or "never" rule.', ca: 'La coma canvia el matís, i per això no hi ha una regla de "sempre" ni de "mai".' }),

  q('pu-20', 'primaria',
    { es: '¿Qué va después de conectores como "sin embargo", "por tanto" o "además" al principio de frase?', en: 'What follows connectors like "however" or "therefore" at the start of a sentence?', ca: 'Què va després de connectors com "tanmateix" o "per tant" al principi de frase?' },
    { es: ['Una coma', 'Dos puntos', 'Nada', 'Un punto y coma'], en: ['A comma', 'A colon', 'Nothing', 'A semicolon'], ca: ['Una coma', 'Dos punts', 'Res', 'Un punt i coma'] },
    { es: 'Una coma', en: 'A comma', ca: 'Una coma' },
    '🔀',
    { es: '"Sin embargo, no vino". Es una de las pocas reglas de coma que no admite discusión, y sirve para localizar de un vistazo cómo se encadenan las ideas de un texto.', en: '"However, he did not come". It is one of the few comma rules beyond argument, and it helps you see at a glance how a text chains its ideas.', ca: '"Tanmateix, no va venir". És una de les poques regles de coma que no admet discussió.' }),

  q('pu-21', 'primaria',
    { es: 'Después de un punto, ¿cómo se sigue escribiendo?', en: 'After a full stop, how do you continue writing?', ca: 'Després d\'un punt, com se segueix escrivint?' },
    { es: ['Con mayúscula', 'Con minúscula', 'Depende de la palabra', 'Con mayúscula solo al inicio del párrafo'], en: ['With a capital letter', 'With a lower-case letter', 'It depends on the word', 'Only at the start of the paragraph'], ca: ['Amb majúscula', 'Amb minúscula', 'Depèn de la paraula', 'Amb majúscula només a l\'inici del paràgraf'] },
    { es: 'Con mayúscula', en: 'With a capital letter', ca: 'Amb majúscula' },
    '🔡',
    { es: 'Siempre, sea punto y seguido o punto y aparte. Es distinto de los dos puntos, después de los cuales se sigue en minúscula salvo que empiece una cita.', en: 'Always, whether the stop ends a sentence or a paragraph. It differs from the colon, after which you continue in lower case unless a quotation begins.', ca: 'Sempre, sigui punt i seguit o punt i a part. És diferent dels dos punts.' }),

  q('pu-22', 'primaria',
    { es: '¿Qué signo se usa para partir una palabra al final de la línea?', en: 'Which mark splits a word at the end of a line?', ca: 'Quin signe es fa servir per partir una paraula al final de la línia?' },
    { es: ['El guion corto (-)', 'La raya (—)', 'Los puntos suspensivos', 'La barra (/)'], en: ['The hyphen (-)', 'The dash (—)', 'Ellipsis dots', 'The slash (/)'], ca: ['El guionet (-)', 'La ratlla (—)', 'Els punts suspensius', 'La barra (/)'] },
    { es: 'El guion corto (-)', en: 'The hyphen (-)', ca: 'El guionet (-)' },
    '➖',
    { es: 'Y se parte por sílabas, nunca por cualquier sitio. El guion también une palabras compuestas (teórico-práctico) y rangos de números, y no debe confundirse con la raya del diálogo, que es más larga.', en: 'And it splits by syllables, never anywhere. The hyphen also joins compound words and number ranges, and must not be confused with the dialogue dash, which is longer.', ca: 'I es parteix per síl·labes, mai per qualsevol lloc. També uneix paraules compostes.' }),

  q('pu-23', 'primaria',
    { es: 'En "Si llueve no salgo", ¿hace falta coma?', en: 'In "If it rains I will not go out", is a comma needed?', ca: 'A "Si plou no surto", cal coma?' },
    { es: ['Sí: "Si llueve, no salgo", porque la condición va delante', 'No, nunca lleva', 'Solo si la frase es larga', 'Hay que poner punto y coma'], en: ['Yes: "If it rains, I will not go out", because the condition comes first', 'No, never', 'Only if the sentence is long', 'A semicolon is needed'], ca: ['Sí: "Si plou, no surto", perquè la condició va al davant', 'No, mai en porta', 'Només si la frase és llarga', 'Cal posar punt i coma'] },
    { es: 'Sí: "Si llueve, no salgo", porque la condición va delante', en: 'Yes: "If it rains, I will not go out", because the condition comes first', ca: 'Sí: "Si plou, no surto", perquè la condició va al davant' },
    '🌧️',
    { es: 'Cuando la subordinada se adelanta al verbo principal, se marca con coma. Si va detrás, no hace falta: "No salgo si llueve" se escribe sin nada en medio.', en: 'When the subordinate clause is moved ahead of the main verb, a comma marks it. If it follows, none is needed: "I will not go out if it rains" takes nothing in between.', ca: 'Quan la subordinada s\'avança al verb principal, es marca amb coma. Si va darrere, no cal.' }),

  q('pu-24', 'primaria',
    { es: '¿Cuántos puntos suspensivos hay que escribir?', en: 'How many ellipsis dots should you write?', ca: 'Quants punts suspensius cal escriure?' },
    { es: ['Tres, siempre', 'Los que hagan falta', 'Dos', 'Entre tres y seis'], en: ['Three, always', 'As many as needed', 'Two', 'Between three and six'], ca: ['Tres, sempre', 'Els que calguin', 'Dos', 'Entre tres i sis'] },
    { es: 'Tres, siempre', en: 'Three, always', ca: 'Tres, sempre' },
    '⋯',
    { es: 'Ni dos ni cinco ni una fila entera. Y si la frase termina ahí, esos tres puntos ya cierran: no se añade un cuarto punto para acabar la oración.', en: 'Not two, not five, not a whole row. And if the sentence ends there, those three dots already close it: you do not add a fourth to finish the sentence.', ca: 'Ni dos ni cinc. I si la frase acaba aquí, aquests tres punts ja tanquen.' }),

  q('pu-25', 'primaria',
    { es: '¿Por qué es importante puntuar bien?', en: 'Why does punctuating well matter?', ca: 'Per què és important puntuar bé?' },
    { es: ['Porque organiza las ideas y puede cambiar el significado de la frase', 'Porque queda más bonito', 'Porque lo pide el profesor', 'Porque alarga el texto'], en: ['Because it organises ideas and can change a sentence\'s meaning', 'Because it looks nicer', 'Because the teacher asks for it', 'Because it makes the text longer'], ca: ['Perquè organitza les idees i pot canviar el significat de la frase', 'Perquè queda més bonic', 'Perquè ho demana el professor', 'Perquè allarga el text'] },
    { es: 'Porque organiza las ideas y puede cambiar el significado de la frase', en: 'Because it organises ideas and can change a sentence\'s meaning', ca: 'Perquè organitza les idees i pot canviar el significat de la frase' },
    '🎯',
    { es: 'El ejemplo clásico es un testamento sin comas que se puede leer de varias maneras según dónde se pongan. Puntuar es decidir cómo tiene que leerse lo que has escrito.', en: 'The classic example is a will without commas that can be read several ways depending on where they go. Punctuating is deciding how what you wrote must be read.', ca: 'Puntuar és decidir com s\'ha de llegir el que has escrit.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('pu-30', 'eso',
    { es: '¿Cuándo se usa el punto y coma?', en: 'When is the semicolon used?', ca: 'Quan es fa servir el punt i coma?' },
    { es: ['Para separar oraciones muy relacionadas, o elementos de una lista que ya llevan comas dentro', 'Cuando la coma queda corta y el punto largo, sin más criterio', 'Solo antes de "pero"', 'Para terminar párrafos'], en: ['To separate closely related clauses, or list items that already contain commas', 'When a comma is too short and a stop too long, with no further criterion', 'Only before "but"', 'To end paragraphs'], ca: ['Per separar oracions molt relacionades, o elements d\'una llista que ja porten comes a dins', 'Quan la coma queda curta i el punt llarg, sense més criteri', 'Només abans de "però"', 'Per acabar paràgrafs'] },
    { es: 'Para separar oraciones muy relacionadas, o elementos de una lista que ya llevan comas dentro', en: 'To separate closely related clauses, or list items that already contain commas', ca: 'Per separar oracions molt relacionades, o elements d\'una llista que ja porten comes a dins' },
    '⏳',
    { es: 'El segundo uso es el más claro: "Vinieron Ana, la vecina; Luis, su hermano; y Marta". Sin el punto y coma no se sabría dónde acaba cada persona. Es el signo peor entendido y por eso el menos usado.', en: 'The second use is the clearest: "Ana, the neighbour; Luis, her brother; and Marta came". Without semicolons you could not tell where each person ends. It is the least understood mark and therefore the least used.', ca: 'El segon ús és el més clar: sense el punt i coma no se sabria on acaba cada persona.' }),

  q('pu-31', 'eso',
    { es: 'En "Los alumnos, que aprobaron, celebraron" frente a "Los alumnos que aprobaron celebraron", ¿qué cambia?', en: 'In "The pupils, who passed, celebrated" versus "The pupils who passed celebrated", what changes?', ca: 'A "Els alumnes, que van aprovar, van celebrar" davant de "Els alumnes que van aprovar van celebrar", què canvia?' },
    { es: ['Con comas celebraron todos; sin comas, solo los que aprobaron', 'No cambia nada', 'Con comas celebraron menos alumnos', 'La segunda está mal escrita'], en: ['With commas they all celebrated; without commas, only those who passed', 'Nothing changes', 'With commas fewer pupils celebrated', 'The second is incorrect'], ca: ['Amb comes van celebrar tots; sense comes, només els que van aprovar', 'No canvia res', 'Amb comes van celebrar menys alumnes', 'La segona està mal escrita'] },
    { es: 'Con comas celebraron todos; sin comas, solo los que aprobaron', en: 'With commas they all celebrated; without commas, only those who passed', ca: 'Amb comes van celebrar tots; sense comes, només els que van aprovar' },
    '🎓',
    { es: 'Es la diferencia entre una subordinada explicativa, que va entre comas y solo añade información, y una especificativa, que va sin comas y RESTRINGE de quién hablamos. Dos comas cambian cuánta gente aprobó.', en: 'It is the difference between a non-defining relative clause, in commas, adding information, and a defining one, without commas, which RESTRICTS who we mean. Two commas change how many passed.', ca: 'És la diferència entre una subordinada explicativa, entre comes, i una d\'especificativa, sense comes, que RESTRINGEIX.' }),

  q('pu-32', 'eso',
    { es: '¿Qué es una coma elíptica?', en: 'What is an elliptical comma?', ca: 'Què és una coma el·líptica?' },
    { es: ['La que sustituye a un verbo que se omite: "Yo pedí sopa; ella, ensalada"', 'La que separa el sujeto del verbo', 'La que va antes de "y"', 'La que cierra un inciso'], en: ['One replacing an omitted verb: "I ordered soup; she, salad"', 'One separating subject from verb', 'One before "and"', 'One closing a parenthetical'], ca: ['La que substitueix un verb que s\'omet: "Jo vaig demanar sopa; ella, amanida"', 'La que separa el subjecte del verb', 'La que va abans de "i"', 'La que tanca un incís'] },
    { es: 'La que sustituye a un verbo que se omite: "Yo pedí sopa; ella, ensalada"', en: 'One replacing an omitted verb: "I ordered soup; she, salad"', ca: 'La que substitueix un verb que s\'omet: "Jo vaig demanar sopa; ella, amanida"' },
    '✂️',
    { es: 'Esa coma ocupa el hueco de "pidió" y evita repetirlo. Es la única situación en la que aparece una coma justo detrás del sujeto, y precisamente por eso no contradice la regla de no separar sujeto y verbo: el verbo no está.', en: 'That comma fills the gap left by "ordered" and avoids repeating it. It is the only case where a comma appears right after the subject, and precisely for that reason it does not break the subject-verb rule: the verb is absent.', ca: 'Aquesta coma ocupa el buit del verb i evita repetir-lo. És l\'única situació en què apareix una coma just darrere del subjecte.' }),

  q('pu-33', 'eso',
    { es: '¿Cómo se puntúa una cita textual dentro de una frase?', en: 'How is a direct quotation punctuated inside a sentence?', ca: 'Com es puntua una citació textual dins d\'una frase?' },
    { es: ['Con dos puntos y comillas: Dijo: "Vendré mañana"', 'Solo con comillas, sin dos puntos', 'Con paréntesis', 'Con raya al principio'], en: ['With a colon and quotation marks: He said: "I will come tomorrow"', 'Only with quotation marks, no colon', 'With brackets', 'With a dash at the start'], ca: ['Amb dos punts i cometes: Va dir: "Vindré demà"', 'Només amb cometes, sense dos punts', 'Amb parèntesis', 'Amb ratlla al principi'] },
    { es: 'Con dos puntos y comillas: Dijo: "Vendré mañana"', en: 'With a colon and quotation marks: He said: "I will come tomorrow"', ca: 'Amb dos punts i cometes: Va dir: "Vindré demà"' },
    '💬',
    { es: 'Y dentro de las comillas se empieza con mayúscula, porque es una frase entera de otra persona. Si en vez de citar literalmente se cuenta lo que dijo, desaparece todo: "Dijo que vendría mañana".', en: 'And inside the quotation marks you start with a capital, because it is someone else\'s whole sentence. If instead of quoting you report what was said, it all goes: "He said he would come tomorrow".', ca: 'I dins de les cometes es comença amb majúscula. Si es conta el que va dir, desapareix tot.' }),

  q('pu-34', 'eso',
    { es: 'En un diálogo con raya, ¿cómo se marca lo que dice el narrador después de la intervención?', en: 'In dash dialogue, how is the narrator\'s comment after a line marked?', ca: 'En un diàleg amb ratlla, com es marca el que diu el narrador després de la intervenció?' },
    { es: ['Con otra raya, sin espacio: —Vamos —dijo Ana.', 'Con comillas', 'Con paréntesis', 'No se marca de ninguna forma'], en: ['With another dash, no space: "Let\'s go" —said Ana.', 'With quotation marks', 'With brackets', 'It is not marked at all'], ca: ['Amb una altra ratlla, sense espai: —Anem —va dir l\'Anna.', 'Amb cometes', 'Amb parèntesis', 'No es marca de cap manera'] },
    { es: 'Con otra raya, sin espacio: —Vamos —dijo Ana.', en: 'With another dash, no space: "Let\'s go" —said Ana.', ca: 'Amb una altra ratlla, sense espai: —Anem —va dir l\'Anna.' },
    '📖',
    { es: 'La raya va pegada a la palabra que sigue, sin espacio en medio. Y el verbo de habla empieza en minúscula aunque venga después de un punto o una interrogación, porque no es una frase nueva.', en: 'The dash sits flush against the following word, with no space. And the speech verb starts lower case even after a full stop or question mark, because it is not a new sentence.', ca: 'La ratlla va enganxada a la paraula que segueix. I el verb de parla comença en minúscula.' }),

  q('pu-35', 'eso',
    { es: '¿Se escribe coma delante de "pero"?', en: 'Is there a comma before "pero" (but)?', ca: 'S\'escriu coma davant de "però"?' },
    { es: ['Sí, cuando une dos oraciones', 'No, nunca', 'Solo al final de la frase', 'Solo en textos literarios'], en: ['Yes, when it joins two clauses', 'No, never', 'Only at the end of a sentence', 'Only in literary texts'], ca: ['Sí, quan uneix dues oracions', 'No, mai', 'Només al final de la frase', 'Només en textos literaris'] },
    { es: 'Sí, cuando une dos oraciones', en: 'Yes, when it joins two clauses', ca: 'Sí, quan uneix dues oracions' },
    '↔️',
    { es: '"Quería ir, pero no pude". Lo mismo vale para "aunque", "sino" y "mas". La coma marca que llega un giro, y es de las pocas que casi nunca sobra.', en: '"I wanted to go, but I could not". The same holds for "although" and "yet". The comma signals a turn is coming, and it is one of the few that is almost never superfluous.', ca: 'La coma marca que arriba un gir, i és de les poques que gairebé mai no sobra.' }),

  q('pu-36', 'eso',
    { es: '¿Qué diferencia hay entre la raya y el guion?', en: 'What is the difference between the dash and the hyphen?', ca: 'Quina diferència hi ha entre la ratlla i el guionet?' },
    { es: ['La raya (—) marca diálogos e incisos; el guion (-) une o parte palabras', 'Son el mismo signo con dos nombres', 'El guion es más largo', 'La raya solo se usa en poesía'], en: ['The dash (—) marks dialogue and parentheticals; the hyphen (-) joins or splits words', 'They are the same mark with two names', 'The hyphen is longer', 'The dash is only used in poetry'], ca: ['La ratlla (—) marca diàlegs i incisos; el guionet (-) uneix o parteix paraules', 'Són el mateix signe amb dos noms', 'El guionet és més llarg', 'La ratlla només es fa servir en poesia'] },
    { es: 'La raya (—) marca diálogos e incisos; el guion (-) une o parte palabras', en: 'The dash (—) marks dialogue and parentheticals; the hyphen (-) joins or splits words', ca: 'La ratlla (—) marca diàlegs i incisos; el guionet (-) uneix o parteix paraules' },
    '📏',
    { es: 'Se confunden porque en el teclado el guion está a mano y la raya no. Pero son signos distintos con funciones distintas, y usar el corto para un diálogo es una falta, no un atajo tipográfico.', en: 'They get confused because the hyphen is on the keyboard and the dash is not. But they are different marks with different jobs, and using the short one for dialogue is an error, not a typographic shortcut.', ca: 'Es confonen perquè al teclat el guionet és a mà i la ratlla no. Però són signes diferents.' }),

  q('pu-37', 'eso',
    { es: '¿Qué signo se usa para introducir una consecuencia o una conclusión de lo dicho?', en: 'Which mark introduces a consequence or conclusion of what was said?', ca: 'Quin signe es fa servir per introduir una conseqüència o conclusió del que s\'ha dit?' },
    { es: ['Los dos puntos', 'El punto y coma', 'Los puntos suspensivos', 'El guion'], en: ['The colon', 'The semicolon', 'Ellipsis dots', 'The hyphen'], ca: ['Els dos punts', 'El punt i coma', 'Els punts suspensius', 'El guionet'] },
    { es: 'Los dos puntos', en: 'The colon', ca: 'Els dos punts' },
    '➡️',
    { es: '"No estudió nada: suspendió". Los dos puntos hacen ellos solos el trabajo de un "por eso", y por eso una frase con dos puntos suele quedar más corta y más contundente que la misma con conector.', en: '"He did not study at all: he failed". The colon does the work of a "therefore" on its own, which is why a sentence with a colon usually ends up shorter and punchier than the same one with a connector.', ca: 'Els dos punts fan ells sols la feina d\'un "per això".' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 8 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
