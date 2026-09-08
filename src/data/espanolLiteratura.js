// Literatura — primaria + ESO
//
// El bloque que faltaba en lengua: había 24 exámenes y todos de gramática y
// ortografía. Géneros y subgéneros, verso y prosa, métrica y rima, figuras
// retóricas y las obras que se citan en cualquier temario de la ESO.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── GÉNEROS ─────────────────────────────────────────────────────────────
  q('lit-01', 'primaria',
    { es: '¿Cuáles son los tres grandes géneros literarios?', en: 'What are the three great literary genres?', ca: 'Quins són els tres grans gèneres literaris?' },
    { es: ['Narrativo, lírico y dramático', 'Novela, cuento y fábula', 'Prosa, verso y teatro', 'Comedia, tragedia y drama'], en: ['Narrative, lyric and dramatic', 'Novel, short story and fable', 'Prose, verse and theatre', 'Comedy, tragedy and drama'], ca: ['Narratiu, líric i dramàtic', 'Novel·la, conte i faula', 'Prosa, vers i teatre', 'Comèdia, tragèdia i drama'] },
    { es: 'Narrativo, lírico y dramático', en: 'Narrative, lyric and dramatic', ca: 'Narratiu, líric i dramàtic' },
    '📚',
    { es: 'El narrativo cuenta una historia, el lírico expresa sentimientos y el dramático está escrito para representarse. No hay que confundir el género con la forma: un texto narrativo puede estar en verso y uno lírico en prosa.', en: 'Narrative tells a story, lyric expresses feelings and dramatic is written to be performed. Do not confuse genre with form: a narrative text can be in verse and a lyric one in prose.', ca: 'El narratiu explica una història, el líric expressa sentiments i el dramàtic està escrit per representar-se.' }),

  q('lit-02', 'primaria',
    { es: '¿Qué diferencia hay entre verso y prosa?', en: 'What is the difference between verse and prose?', ca: 'Quina diferència hi ha entre vers i prosa?' },
    { es: ['El verso va en líneas cortas con ritmo y medida; la prosa, seguida de margen a margen', 'El verso rima siempre y la prosa nunca', 'La prosa es más antigua', 'No hay ninguna diferencia real'], en: ['Verse comes in short measured lines with rhythm; prose runs margin to margin', 'Verse always rhymes and prose never does', 'Prose is older', 'There is no real difference'], ca: ['El vers va en línies curtes amb ritme i mesura; la prosa, seguida de marge a marge', 'El vers rima sempre i la prosa mai', 'La prosa és més antiga', 'No hi ha cap diferència real'] },
    { es: 'El verso va en líneas cortas con ritmo y medida; la prosa, seguida de margen a margen', en: 'Verse comes in short measured lines with rhythm; prose runs margin to margin', ca: 'El vers va en línies curtes amb ritme i mesura; la prosa, seguida de marge a marge' },
    '📝',
    { es: 'Se distingue a simple vista sin leer una palabra. Y ojo: hay verso sin rima, el llamado verso libre o blanco, así que rimar no es lo que define al verso, sino la medida y el ritmo.', en: 'You can tell at a glance without reading a word. And note: there is verse without rhyme, called free or blank verse, so rhyming is not what defines verse — measure and rhythm are.', ca: 'Es distingeix a simple vista. I compte: hi ha vers sense rima, l\'anomenat vers lliure.' }),

  q('lit-03', 'primaria',
    { es: '¿Qué es una fábula?', en: 'What is a fable?', ca: 'Què és una faula?' },
    { es: ['Un relato breve, casi siempre con animales, que termina en una moraleja', 'Una historia real de la antigüedad', 'Un poema muy largo', 'Una obra de teatro para niños'], en: ['A short tale, usually with animals, ending in a moral', 'A true story from antiquity', 'A very long poem', 'A play for children'], ca: ['Un relat breu, gairebé sempre amb animals, que acaba en una moralitat', 'Una història real de l\'antiguitat', 'Un poema molt llarg', 'Una obra de teatre per a nens'] },
    { es: 'Un relato breve, casi siempre con animales, que termina en una moraleja', en: 'A short tale, usually with animals, ending in a moral', ca: 'Un relat breu, gairebé sempre amb animals, que acaba en una moralitat' },
    '🦊',
    { es: 'Los animales hablan y actúan como personas, y cada uno representa un defecto o una virtud: la zorra es astuta, la hormiga trabajadora. Esopo y Samaniego son los fabulistas más conocidos.', en: 'The animals speak and act like people, each standing for a flaw or a virtue: the fox is cunning, the ant hard-working. Aesop and Samaniego are the best-known fabulists.', ca: 'Els animals parlen i actuen com a persones, i cadascun representa un defecte o una virtut.' }),

  q('lit-04', 'primaria',
    { es: '¿Quién cuenta la historia en un texto narrativo?', en: 'Who tells the story in a narrative text?', ca: 'Qui explica la història en un text narratiu?' },
    { es: ['El narrador', 'El autor', 'El protagonista siempre', 'El lector'], en: ['The narrator', 'The author', 'Always the main character', 'The reader'], ca: ['El narrador', 'L\'autor', 'Sempre el protagonista', 'El lector'] },
    { es: 'El narrador', en: 'The narrator', ca: 'El narrador' },
    '🗣️',
    { es: 'El autor es la persona real que escribe; el narrador es la voz que cuenta dentro del libro, y puede ser un personaje inventado. Por eso una novela escrita por un hombre puede estar narrada por una mujer sin ninguna contradicción.', en: 'The author is the real person who writes; the narrator is the voice telling the story inside the book, and can be an invented character. So a novel written by a man can be narrated by a woman with no contradiction.', ca: 'L\'autor és la persona real que escriu; el narrador és la veu que explica dins del llibre.' }),

  q('lit-05', 'primaria',
    { es: 'Si el narrador cuenta la historia diciendo "yo", ¿qué tipo de narrador es?', en: 'If the narrator tells the story saying "I", what kind of narrator is it?', ca: 'Si el narrador explica la història dient "jo", quin tipus de narrador és?' },
    { es: ['En primera persona', 'En tercera persona', 'Omnisciente', 'En segunda persona'], en: ['First person', 'Third person', 'Omniscient', 'Second person'], ca: ['En primera persona', 'En tercera persona', 'Omniscient', 'En segona persona'] },
    { es: 'En primera persona', en: 'First person', ca: 'En primera persona' },
    '👤',
    { es: 'Solo puede contar lo que ese personaje sabe, ve o siente, y por eso el lector se entera de las cosas a la vez que él. El narrador en tercera persona omnisciente, en cambio, lo sabe todo, incluso lo que piensan los demás.', en: 'It can only tell what that character knows, sees or feels, so the reader finds things out at the same time as they do. The third-person omniscient narrator, by contrast, knows everything, even what others think.', ca: 'Només pot explicar el que aquell personatge sap, veu o sent. L\'omniscient, en canvi, ho sap tot.' }),

  q('lit-06', 'primaria',
    { es: '¿Cuáles son las tres partes clásicas de la estructura de un cuento?', en: 'What are the three classic parts of a story\'s structure?', ca: 'Quines són les tres parts clàssiques de l\'estructura d\'un conte?' },
    { es: ['Planteamiento, nudo y desenlace', 'Principio, mitad y final feliz', 'Título, cuerpo y moraleja', 'Introducción, personajes y lugar'], en: ['Setup, complication and resolution', 'Start, middle and happy ending', 'Title, body and moral', 'Introduction, characters and setting'], ca: ['Plantejament, nus i desenllaç', 'Principi, meitat i final feliç', 'Títol, cos i moralitat', 'Introducció, personatges i lloc'] },
    { es: 'Planteamiento, nudo y desenlace', en: 'Setup, complication and resolution', ca: 'Plantejament, nus i desenllaç' },
    '📖',
    { es: 'En el planteamiento se presentan personajes y situación, en el nudo aparece el conflicto y en el desenlace se resuelve. El desenlace no tiene por qué ser feliz: que se resuelva no significa que acabe bien.', en: 'The setup introduces characters and situation, the complication brings the conflict and the resolution settles it. The ending need not be happy: being resolved does not mean ending well.', ca: 'Al plantejament es presenten personatges i situació, al nus apareix el conflicte i al desenllaç es resol.' }),

  q('lit-07', 'primaria',
    { es: '¿Qué es la rima en un poema?', en: 'What is rhyme in a poem?', ca: 'Què és la rima en un poema?' },
    { es: ['La repetición de sonidos al final de los versos, desde la última vocal acentuada', 'El número de sílabas de cada verso', 'La longitud del poema', 'El tema del que trata'], en: ['The repetition of sounds at the end of lines, from the last stressed vowel', 'The number of syllables in each line', 'The length of the poem', 'The subject it deals with'], ca: ['La repetició de sons al final dels versos, des de l\'última vocal accentuada', 'El nombre de síl·labes de cada vers', 'La llargada del poema', 'El tema de què tracta'] },
    { es: 'La repetición de sonidos al final de los versos, desde la última vocal acentuada', en: 'The repetition of sounds at the end of lines, from the last stressed vowel', ca: 'La repetició de sons al final dels versos, des de l\'última vocal accentuada' },
    '🎵',
    { es: 'No se cuenta desde el final de la palabra sino desde la última vocal que lleva el acento. Por eso "cantar" y "amar" riman, y también "casa" y "pasa".', en: 'It is counted not from the end of the word but from the last stressed vowel. That is why "cantar" and "amar" rhyme, and so do "casa" and "pasa".', ca: 'No es compta des del final de la paraula sinó des de l\'última vocal accentuada.' }),

  q('lit-08', 'primaria',
    { es: '¿Qué diferencia hay entre rima consonante y asonante?', en: 'What is the difference between full and assonant rhyme?', ca: 'Quina diferència hi ha entre rima consonant i assonant?' },
    { es: ['En la consonante coinciden vocales y consonantes; en la asonante, solo las vocales', 'En la asonante coinciden todos los sonidos', 'La consonante solo se usa en canciones', 'No existe la rima asonante'], en: ['In full rhyme vowels and consonants match; in assonance, only the vowels', 'In assonance every sound matches', 'Full rhyme is only used in songs', 'Assonant rhyme does not exist'], ca: ['A la consonant coincideixen vocals i consonants; a l\'assonant, només les vocals', 'A l\'assonant coincideixen tots els sons', 'La consonant només es fa servir en cançons', 'No existeix la rima assonant'] },
    { es: 'En la consonante coinciden vocales y consonantes; en la asonante, solo las vocales', en: 'In full rhyme vowels and consonants match; in assonance, only the vowels', ca: 'A la consonant coincideixen vocals i consonants; a l\'assonant, només les vocals' },
    '🔤',
    { es: '"Luna" y "cuna" riman en consonante porque suena igual todo; "luna" y "cuchara" riman en asonante porque solo coinciden la u y la a. El romance, la forma más popular de la poesía española, usa siempre asonante.', en: '"Luna" and "cuna" are full rhymes because everything sounds the same; "luna" and "cuchara" are assonant because only the u and the a match. The romance, the most popular Spanish verse form, always uses assonance.', ca: '"Luna" i "cuna" rimen en consonant; "luna" i "cuchara", en assonant.' }),

  q('lit-09', 'primaria',
    { es: '¿Qué es una estrofa?', en: 'What is a stanza?', ca: 'Què és una estrofa?' },
    { es: ['Un grupo de versos separado de los demás', 'Otro nombre para un verso', 'El título de un poema', 'La rima del final'], en: ['A group of lines set apart from the rest', 'Another name for a line', 'The title of a poem', 'The rhyme at the end'], ca: ['Un grup de versos separat dels altres', 'Un altre nom per a un vers', 'El títol d\'un poema', 'La rima del final'] },
    { es: 'Un grupo de versos separado de los demás', en: 'A group of lines set apart from the rest', ca: 'Un grup de versos separat dels altres' },
    '📄',
    { es: 'Es a un poema lo que el párrafo a un texto en prosa. Cada estrofa tiene nombre según cuántos versos lleve: pareado dos, terceto tres, cuarteto cuatro.', en: 'It is to a poem what a paragraph is to prose. Each stanza has a name according to its number of lines: couplet two, tercet three, quatrain four.', ca: 'És al poema el que el paràgraf al text en prosa. Cada estrofa té nom segons quants versos porti.' }),

  q('lit-10', 'primaria',
    { es: '¿Qué es una comparación o símil?', en: 'What is a simile?', ca: 'Què és una comparació o símil?' },
    { es: ['Relacionar dos cosas usando "como" o "parece"', 'Sustituir una cosa por otra sin avisar', 'Repetir la misma palabra', 'Exagerar mucho algo'], en: ['Linking two things using "like" or "as"', 'Replacing one thing with another without warning', 'Repeating the same word', 'Exaggerating something greatly'], ca: ['Relacionar dues coses fent servir "com" o "sembla"', 'Substituir una cosa per una altra sense avisar', 'Repetir la mateixa paraula', 'Exagerar molt una cosa'] },
    { es: 'Relacionar dos cosas usando "como" o "parece"', en: 'Linking two things using "like" or "as"', ca: 'Relacionar dues coses fent servir "com" o "sembla"' },
    '⚖️',
    { es: '"Sus ojos son como dos luceros" es una comparación, porque el "como" está a la vista. Si se quita el nexo y se dice "sus ojos son dos luceros", pasa a ser una metáfora: esa palabrita es lo único que las separa.', en: '"Her eyes are like two stars" is a simile, because the "like" is visible. Remove the link and say "her eyes are two stars" and it becomes a metaphor: that little word is all that separates them.', ca: '"Els seus ulls són com dos estels" és una comparació. Sense el nexe seria una metàfora.' }),

  q('lit-11', 'primaria',
    { es: '¿Qué es una metáfora?', en: 'What is a metaphor?', ca: 'Què és una metàfora?' },
    { es: ['Llamar a una cosa con el nombre de otra por su parecido', 'Comparar usando "como"', 'Repetir sonidos al final del verso', 'Dar vida a los objetos'], en: ['Calling one thing by the name of another because of a likeness', 'Comparing using "like"', 'Repeating sounds at the end of a line', 'Giving life to objects'], ca: ['Anomenar una cosa amb el nom d\'una altra pel seu semblant', 'Comparar fent servir "com"', 'Repetir sons al final del vers', 'Donar vida als objectes'] },
    { es: 'Llamar a una cosa con el nombre de otra por su parecido', en: 'Calling one thing by the name of another because of a likeness', ca: 'Anomenar una cosa amb el nom d\'una altra pel seu semblant' },
    '🌟',
    { es: '"El tiempo es oro" no dice que el tiempo sea un metal, sino que es valioso. Las usamos a diario sin darnos cuenta: "las patas de la mesa" o "el pie de la montaña" son metáforas tan gastadas que ya ni las notamos.', en: '"Time is gold" does not say time is a metal but that it is valuable. We use them daily without noticing: "the legs of the table" or "the foot of the mountain" are metaphors so worn we no longer see them.', ca: '"El temps és or" no diu que el temps sigui un metall, sinó que és valuós.' }),

  q('lit-12', 'primaria',
    { es: '"El viento susurraba entre los árboles". ¿Qué figura literaria es?', en: '"The wind whispered among the trees". What literary device is this?', ca: '"El vent xiuxiuejava entre els arbres". Quina figura literària és?' },
    { es: ['Personificación', 'Metáfora', 'Hipérbole', 'Comparación'], en: ['Personification', 'Metaphor', 'Hyperbole', 'Simile'], ca: ['Personificació', 'Metàfora', 'Hipèrbole', 'Comparació'] },
    { es: 'Personificación', en: 'Personification', ca: 'Personificació' },
    '🌬️',
    { es: 'Susurrar es algo que hacen las personas, no el viento: se le está dando una cualidad humana a algo que no la tiene. También se llama prosopopeya, y es la figura que sostiene todas las fábulas.', en: 'Whispering is something people do, not the wind: a human quality is given to something that lacks it. It is also called prosopopoeia, and it is the device holding up every fable.', ca: 'Xiuxiuejar és una cosa que fan les persones, no el vent: es dona una qualitat humana a una cosa que no en té.' }),

  q('lit-13', 'primaria',
    { es: '"Te lo he dicho un millón de veces". ¿Qué figura literaria es?', en: '"I have told you a million times". What literary device is this?', ca: '"T\'ho he dit un milió de vegades". Quina figura literària és?' },
    { es: ['Hipérbole', 'Metáfora', 'Personificación', 'Antítesis'], en: ['Hyperbole', 'Metaphor', 'Personification', 'Antithesis'], ca: ['Hipèrbole', 'Metàfora', 'Personificació', 'Antítesi'] },
    { es: 'Hipérbole', en: 'Hyperbole', ca: 'Hipèrbole' },
    '📢',
    { es: 'Es una exageración enorme y a propósito, que nadie entiende de forma literal. La usamos constantemente al hablar: "me muero de hambre", "hay una cola kilométrica".', en: 'It is a huge, deliberate exaggeration that nobody takes literally. We use it constantly in speech: "I am dying of hunger", "the queue is a mile long".', ca: 'És una exageració enorme i a propòsit, que ningú entén de manera literal.' }),

  q('lit-14', 'primaria',
    { es: '¿Qué es el protagonista de una historia?', en: 'What is the protagonist of a story?', ca: 'Què és el protagonista d\'una història?' },
    { es: ['El personaje principal, sobre el que gira la acción', 'El personaje que se opone al héroe', 'El que cuenta la historia', 'El personaje más simpático'], en: ['The main character, around whom the action turns', 'The character opposing the hero', 'The one who tells the story', 'The nicest character'], ca: ['El personatge principal, sobre el qual gira l\'acció', 'El personatge que s\'oposa a l\'heroi', 'El que explica la història', 'El personatge més simpàtic'] },
    { es: 'El personaje principal, sobre el que gira la acción', en: 'The main character, around whom the action turns', ca: 'El personatge principal, sobre el qual gira l\'acció' },
    '🎭',
    { es: 'El que se le opone es el antagonista. Ninguno de los dos tiene por qué caer bien: hay protagonistas detestables, y de hecho las historias suelen ser más interesantes cuando no son simplemente buenos.', en: 'The one opposing them is the antagonist. Neither has to be likeable: there are detestable protagonists, and stories are often more interesting when they are not simply good.', ca: 'El que s\'hi oposa és l\'antagonista. Cap dels dos ha de caure bé necessàriament.' }),

  q('lit-15', 'primaria',
    { es: 'En una obra de teatro, ¿qué son las acotaciones?', en: 'In a play, what are the stage directions?', ca: 'En una obra de teatre, què són les acotacions?' },
    { es: ['Las indicaciones del autor sobre cómo actuar, entre paréntesis y sin decirse en voz alta', 'Lo que dicen los personajes', 'El resumen del final', 'Los nombres de los actores'], en: ['The author\'s notes on how to act, in brackets and never spoken aloud', 'What the characters say', 'The summary of the ending', 'The actors\' names'], ca: ['Les indicacions de l\'autor sobre com actuar, entre parèntesis i sense dir-se en veu alta', 'El que diuen els personatges', 'El resum del final', 'Els noms dels actors'] },
    { es: 'Las indicaciones del autor sobre cómo actuar, entre paréntesis y sin decirse en voz alta', en: 'The author\'s notes on how to act, in brackets and never spoken aloud', ca: 'Les indicacions de l\'autor sobre com actuar, entre parèntesis i sense dir-se en veu alta' },
    '🎬',
    { es: 'Dicen quién entra, cómo se mueve o con qué tono habla. Son la marca de que un texto teatral está escrito para verse, no para leerse: en el teatro no hay narrador que explique nada.', en: 'They say who enters, how they move or in what tone they speak. They mark a play as written to be seen, not read: in theatre there is no narrator to explain anything.', ca: 'Diuen qui entra, com es mou o amb quin to parla. Al teatre no hi ha narrador que expliqui res.' }),

  q('lit-16', 'primaria',
    { es: '¿Qué es un mito?', en: 'What is a myth?', ca: 'Què és un mite?' },
    { es: ['Un relato tradicional con dioses y héroes que explica el mundo', 'Una noticia falsa', 'Un poema muy corto', 'Una obra de teatro griega'], en: ['A traditional tale with gods and heroes explaining the world', 'A piece of fake news', 'A very short poem', 'A Greek play'], ca: ['Un relat tradicional amb déus i herois que explica el món', 'Una notícia falsa', 'Un poema molt curt', 'Una obra de teatre grega'] },
    { es: 'Un relato tradicional con dioses y héroes que explica el mundo', en: 'A traditional tale with gods and heroes explaining the world', ca: 'Un relat tradicional amb déus i herois que explica el món' },
    '⚡',
    { es: 'Antes de la ciencia, los mitos explicaban de dónde viene el fuego, por qué hay estaciones o cómo nació el mundo. La leyenda se le parece, pero parte de un hecho o un lugar real y lo va agrandando.', en: 'Before science, myths explained where fire came from, why there are seasons or how the world began. A legend is similar, but starts from a real event or place and grows from there.', ca: 'Abans de la ciència, els mites explicaven d\'on ve el foc o per què hi ha estacions.' }),

  q('lit-17', 'primaria',
    { es: '¿Qué diferencia hay entre un cuento y una novela?', en: 'What is the difference between a short story and a novel?', ca: 'Quina diferència hi ha entre un conte i una novel·la?' },
    { es: ['El cuento es breve, con pocos personajes y una sola trama; la novela es larga y compleja', 'El cuento es solo para niños', 'La novela siempre es real', 'El cuento va en verso'], en: ['A short story is brief, with few characters and one plot; a novel is long and complex', 'Short stories are only for children', 'Novels are always true', 'Short stories are in verse'], ca: ['El conte és breu, amb pocs personatges i una sola trama; la novel·la és llarga i complexa', 'El conte és només per a nens', 'La novel·la sempre és real', 'El conte va en vers'] },
    { es: 'El cuento es breve, con pocos personajes y una sola trama; la novela es larga y compleja', en: 'A short story is brief, with few characters and one plot; a novel is long and complex', ca: 'El conte és breu, amb pocs personatges i una sola trama; la novel·la és llarga i complexa' },
    '📕',
    { es: 'No es solo cuestión de páginas: en un cuento todo apunta a un único efecto y no sobra nada, mientras que una novela puede permitirse varias tramas y personajes secundarios con vida propia.', en: 'It is not just a matter of length: in a short story everything points to a single effect with nothing to spare, while a novel can afford several plots and secondary characters with lives of their own.', ca: 'No és només qüestió de pàgines: en un conte tot apunta a un únic efecte i no hi sobra res.' }),

  q('lit-18', 'primaria',
    { es: '¿Quién escribió Don Quijote de la Mancha?', en: 'Who wrote Don Quixote?', ca: 'Qui va escriure Don Quixot de la Manxa?' },
    { es: ['Miguel de Cervantes', 'Lope de Vega', 'Federico García Lorca', 'Antonio Machado'], en: ['Miguel de Cervantes', 'Lope de Vega', 'Federico García Lorca', 'Antonio Machado'], ca: ['Miguel de Cervantes', 'Lope de Vega', 'Federico García Lorca', 'Antonio Machado'] },
    { es: 'Miguel de Cervantes', en: 'Miguel de Cervantes', ca: 'Miguel de Cervantes' },
    '🛡️',
    { es: 'Se publicó en dos partes, 1605 y 1615, y está considerada la primera novela moderna. Empezó como una burla de los libros de caballerías y acabó siendo mucho más que eso.', en: 'It came out in two parts, 1605 and 1615, and is considered the first modern novel. It began as a mockery of chivalric romances and ended up far more than that.', ca: 'Es va publicar en dues parts, 1605 i 1615, i està considerada la primera novel·la moderna.' }),

  q('lit-19', 'primaria',
    { es: '¿Qué es un poema lírico?', en: 'What is a lyric poem?', ca: 'Què és un poema líric?' },
    { es: ['Aquel en el que el poeta expresa sus sentimientos y su mundo interior', 'Aquel que cuenta una batalla', 'Aquel que se representa en un escenario', 'Aquel que siempre habla de amor'], en: ['One where the poet expresses feelings and inner world', 'One that tells of a battle', 'One performed on a stage', 'One that always speaks of love'], ca: ['Aquell en què el poeta expressa els seus sentiments i el seu món interior', 'Aquell que explica una batalla', 'Aquell que es representa en un escenari', 'Aquell que sempre parla d\'amor'] },
    { es: 'Aquel en el que el poeta expresa sus sentimientos y su mundo interior', en: 'One where the poet expresses feelings and inner world', ca: 'Aquell en què el poeta expressa els seus sentiments i el seu món interior' },
    '💭',
    { es: 'El nombre viene de la lira, el instrumento con el que se acompañaban estos poemas en Grecia. La letra de una canción actual es lírica en el sentido más literal del término.', en: 'The name comes from the lyre, the instrument that accompanied these poems in Greece. The lyrics of a modern song are lyric in the most literal sense.', ca: 'El nom ve de la lira, l\'instrument amb què s\'acompanyaven aquests poemes a Grècia.' }),

  q('lit-20', 'primaria',
    { es: '¿Qué es el diálogo en un texto?', en: 'What is dialogue in a text?', ca: 'Què és el diàleg en un text?' },
    { es: ['La conversación entre personajes, marcada con guiones o comillas', 'La descripción de un lugar', 'El resumen de la historia', 'La opinión del autor'], en: ['The conversation between characters, marked with dashes or quotes', 'The description of a place', 'The summary of the story', 'The author\'s opinion'], ca: ['La conversa entre personatges, marcada amb guions o cometes', 'La descripció d\'un lloc', 'El resum de la història', 'L\'opinió de l\'autor'] },
    { es: 'La conversación entre personajes, marcada con guiones o comillas', en: 'The conversation between characters, marked with dashes or quotes', ca: 'La conversa entre personatges, marcada amb guions o cometes' },
    '💬',
    { es: 'En español se marca con raya (—), no con guion corto. Es lo que hace que una historia avance sola: en teatro es prácticamente todo el texto, porque no hay otra forma de contar nada.', en: 'In Spanish it is marked with a dash (—), not a hyphen. It is what makes a story move by itself: in theatre it is nearly the whole text, because there is no other way to tell anything.', ca: 'En castellà es marca amb ratlla (—), no amb guionet. Al teatre és pràcticament tot el text.' }),

  q('lit-21', 'primaria',
    { es: '¿Qué es la moraleja de una fábula?', en: 'What is the moral of a fable?', ca: 'Què és la moralitat d\'una faula?' },
    { es: ['La enseñanza que se saca de la historia', 'El personaje principal', 'El lugar donde ocurre', 'El final triste'], en: ['The lesson drawn from the story', 'The main character', 'Where it takes place', 'The sad ending'], ca: ['L\'ensenyament que se n\'extreu de la història', 'El personatge principal', 'El lloc on passa', 'El final trist'] },
    { es: 'La enseñanza que se saca de la historia', en: 'The lesson drawn from the story', ca: 'L\'ensenyament que se n\'extreu de la història' },
    '💡',
    { es: 'Suele ir al final, en un par de versos o una frase, aunque a veces se deja implícita para que la deduzca quien lee. Es lo que distingue la fábula de un cuento de animales cualquiera.', en: 'It usually comes at the end, in a couple of lines or a sentence, though sometimes it is left implicit for the reader to work out. It is what sets a fable apart from any animal story.', ca: 'Sol anar al final, en un parell de versos o una frase, encara que de vegades es deixa implícita.' }),

  q('lit-22', 'primaria',
    { es: '¿Qué es una biografía?', en: 'What is a biography?', ca: 'Què és una biografia?' },
    { es: ['El relato de la vida de una persona escrito por otra', 'Una novela de aventuras', 'La vida contada por uno mismo', 'Un tipo de poema'], en: ['The account of a person\'s life written by someone else', 'An adventure novel', 'A life told by oneself', 'A kind of poem'], ca: ['El relat de la vida d\'una persona escrit per una altra', 'Una novel·la d\'aventures', 'La vida explicada per un mateix', 'Un tipus de poema'] },
    { es: 'El relato de la vida de una persona escrito por otra', en: 'The account of a person\'s life written by someone else', ca: 'El relat de la vida d\'una persona escrit per una altra' },
    '📔',
    { es: 'Si la escribe la propia persona sobre sí misma se llama autobiografía. El prefijo lo dice: "bio" es vida, "grafía" escritura y "auto" uno mismo.', en: 'If people write it about themselves it is an autobiography. The prefixes say it: "bio" is life, "graphy" writing and "auto" oneself.', ca: 'Si l\'escriu la mateixa persona sobre si mateixa s\'anomena autobiografia.' }),

  q('lit-23', 'primaria',
    { es: '¿Qué es una leyenda?', en: 'What is a legend?', ca: 'Què és una llegenda?' },
    { es: ['Un relato tradicional que parte de algo real y se va agrandando al contarse', 'Una historia totalmente inventada', 'El pie de una foto', 'Un libro de historia'], en: ['A traditional tale starting from something real and growing in the telling', 'A completely invented story', 'A photo caption', 'A history book'], ca: ['Un relat tradicional que parteix d\'una cosa real i es va fent gran en explicar-se', 'Una història totalment inventada', 'El peu d\'una foto', 'Un llibre d\'història'] },
    { es: 'Un relato tradicional que parte de algo real y se va agrandando al contarse', en: 'A traditional tale starting from something real and growing in the telling', ca: 'Un relat tradicional que parteix d\'una cosa real i es va fent gran en explicar-se' },
    '🏰',
    { es: 'Suele estar atada a un lugar concreto: una cueva, un puente, un castillo. Esa es la diferencia con el mito, que explica cuestiones generales del mundo y no un sitio en particular.', en: 'It is usually tied to a specific place: a cave, a bridge, a castle. That is the difference from a myth, which explains general questions about the world rather than one spot.', ca: 'Sol estar lligada a un lloc concret: una cova, un pont, un castell.' }),

  q('lit-24', 'primaria',
    { es: '¿Qué figura literaria se usa en "ruido de rotas rocas rueda"?', en: 'Which device is used in a line repeating the same sound, like "ruido de rotas rocas rueda"?', ca: 'Quina figura literària es fa servir a "soroll de trencades roques roda"?' },
    { es: ['Aliteración: se repite un mismo sonido', 'Hipérbole', 'Metáfora', 'Personificación'], en: ['Alliteration: the same sound is repeated', 'Hyperbole', 'Metaphor', 'Personification'], ca: ['Al·literació: es repeteix un mateix so', 'Hipèrbole', 'Metàfora', 'Personificació'] },
    { es: 'Aliteración: se repite un mismo sonido', en: 'Alliteration: the same sound is repeated', ca: 'Al·literació: es repeteix un mateix so' },
    '🔊',
    { es: 'Aquí la erre repetida imita el ruido de las piedras rodando: el sonido acompaña al significado. Los trabalenguas funcionan con el mismo recurso, solo que buscando el tropiezo en vez del efecto.', en: 'Here the repeated r imitates the noise of rolling stones: the sound backs up the meaning. Tongue-twisters use the same device, only aiming to trip you up rather than to create an effect.', ca: 'Aquí la erra repetida imita el soroll de les pedres rodant: el so acompanya el significat.' }),

  q('lit-25', 'primaria',
    { es: '¿Para qué sirve la descripción en un texto?', en: 'What is description for in a text?', ca: 'Per a què serveix la descripció en un text?' },
    { es: ['Para contar cómo son personas, lugares u objetos', 'Para hacer avanzar la acción', 'Para poner diálogos', 'Para resumir el final'], en: ['To tell what people, places or objects are like', 'To move the action forward', 'To add dialogue', 'To summarise the ending'], ca: ['Per explicar com són persones, llocs o objectes', 'Per fer avançar l\'acció', 'Per posar diàlegs', 'Per resumir el final'] },
    { es: 'Para contar cómo son personas, lugares u objetos', en: 'To tell what people, places or objects are like', ca: 'Per explicar com són persones, llocs o objectes' },
    '🖼️',
    { es: 'La narración cuenta qué pasa y la descripción cuenta cómo es: una avanza el tiempo y la otra lo detiene. Describir a una persona por fuera es una prosopografía; por dentro, una etopeya.', en: 'Narration tells what happens and description tells what things are like: one moves time forward, the other stops it. Describing a person outwardly is prosopography; inwardly, ethopoeia.', ca: 'La narració explica què passa i la descripció com és: una avança el temps i l\'altra el detura.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('lit-30', 'eso',
    { es: '¿Cuántos versos tiene un soneto y cómo se reparten?', en: 'How many lines does a sonnet have and how are they arranged?', ca: 'Quants versos té un sonet i com es reparteixen?' },
    { es: ['14: dos cuartetos y dos tercetos', '14 seguidos sin estrofas', '12: tres cuartetos', '16: cuatro cuartetos'], en: ['14: two quatrains and two tercets', '14 in a row with no stanzas', '12: three quatrains', '16: four quatrains'], ca: ['14: dos quartets i dos tercets', '14 seguits sense estrofes', '12: tres quartets', '16: quatre quartets'] },
    { es: '14: dos cuartetos y dos tercetos', en: '14: two quatrains and two tercets', ca: '14: dos quartets i dos tercets' },
    '🎼',
    { es: 'Son endecasílabos, versos de once sílabas, con rima consonante. Llegó de Italia en el siglo XVI y en español lo consolidaron Garcilaso y Boscán: es la forma fija más usada de nuestra poesía.', en: 'They are hendecasyllables, eleven-syllable lines, with full rhyme. It arrived from Italy in the 16th century and Garcilaso and Boscán established it in Spanish: the most used fixed form in our poetry.', ca: 'Són hendecasíl·labs, versos d\'onze síl·labes, amb rima consonant. Va arribar d\'Itàlia al segle XVI.' }),

  q('lit-31', 'eso',
    { es: '¿Cómo se llaman los versos de ocho sílabas o menos?', en: 'What are lines of eight syllables or fewer called?', ca: 'Com s\'anomenen els versos de vuit síl·labes o menys?' },
    { es: ['De arte menor', 'De arte mayor', 'Alejandrinos', 'Endecasílabos'], en: ['Minor art', 'Major art', 'Alexandrines', 'Hendecasyllables'], ca: ['D\'art menor', 'D\'art major', 'Alexandrins', 'Hendecasíl·labs'] },
    { es: 'De arte menor', en: 'Minor art', ca: 'D\'art menor' },
    '📏',
    { es: 'La frontera está en las ocho sílabas: hasta ocho es arte menor y de nueve en adelante, arte mayor. El octosílabo es el verso más popular en español, el del romancero y las coplas, porque encaja de forma natural con el ritmo del idioma.', en: 'The border is eight syllables: up to eight is minor art, from nine upwards major art. The octosyllable is the most popular Spanish line, that of ballads and folk songs, because it fits the language\'s natural rhythm.', ca: 'La frontera és a les vuit síl·labes. L\'octosíl·lab és el vers més popular en castellà.' }),

  q('lit-32', 'eso',
    { es: 'En "es hielo abrasador, es fuego helado", ¿qué figura hay?', en: 'In "burning ice, frozen fire", what device appears?', ca: 'A "és gel abrasador, és foc gelat", quina figura hi ha?' },
    { es: ['Antítesis: se enfrentan ideas contrarias', 'Aliteración', 'Hipérbaton', 'Anáfora'], en: ['Antithesis: opposing ideas are set against each other', 'Alliteration', 'Hyperbaton', 'Anaphora'], ca: ['Antítesi: s\'enfronten idees contràries', 'Al·literació', 'Hipèrbaton', 'Anàfora'] },
    { es: 'Antítesis: se enfrentan ideas contrarias', en: 'Antithesis: opposing ideas are set against each other', ca: 'Antítesi: s\'enfronten idees contràries' },
    '⚔️',
    { es: 'Es el arranque de un soneto de Quevedo sobre el amor, hecho entero de contrarios. Cuando la contradicción se aprieta en dos palabras pegadas —"hielo abrasador"— se llama además oxímoron.', en: 'It opens a Quevedo sonnet about love, built entirely of opposites. When the contradiction is squeezed into two adjoining words — "burning ice" — it is also called an oxymoron.', ca: 'És l\'arrencada d\'un sonet de Quevedo sobre l\'amor, fet sencer de contraris.' }),

  q('lit-33', 'eso',
    { es: '¿Qué es el hipérbaton?', en: 'What is hyperbaton?', ca: 'Què és l\'hipèrbaton?' },
    { es: ['Alterar el orden normal de las palabras en la frase', 'Repetir palabras al principio de varios versos', 'Exagerar una idea', 'Suprimir los nexos'], en: ['Altering the normal word order in a sentence', 'Repeating words at the start of several lines', 'Exaggerating an idea', 'Removing connectives'], ca: ['Alterar l\'ordre normal de les paraules a la frase', 'Repetir paraules al principi de diversos versos', 'Exagerar una idea', 'Suprimir els nexes'] },
    { es: 'Alterar el orden normal de las palabras en la frase', en: 'Altering the normal word order in a sentence', ca: 'Alterar l\'ordre normal de les paraules a la frase' },
    '🔀',
    { es: '"Del salón en el ángulo oscuro" en vez de "en el ángulo oscuro del salón". Se usa para encajar la métrica o para colocar al final la palabra que más pesa, y es marca de la casa del Barroco.', en: '"Of the room in the dark corner" instead of "in the dark corner of the room". It is used to fit the metre or to place the weightiest word last, and it is a Baroque trademark.', ca: 'Es fa servir per encaixar la mètrica o per col·locar al final la paraula que més pesa.' }),

  q('lit-34', 'eso',
    { es: '¿Qué es una anáfora?', en: 'What is anaphora?', ca: 'Què és una anàfora?' },
    { es: ['Repetir una o varias palabras al principio de versos o frases seguidas', 'Repetirlas al final', 'Cambiar el orden de la frase', 'Comparar dos cosas'], en: ['Repeating one or more words at the start of consecutive lines or sentences', 'Repeating them at the end', 'Changing the sentence order', 'Comparing two things'], ca: ['Repetir una o diverses paraules al principi de versos o frases seguides', 'Repetir-les al final', 'Canviar l\'ordre de la frase', 'Comparar dues coses'] },
    { es: 'Repetir una o varias palabras al principio de versos o frases seguidas', en: 'Repeating one or more words at the start of consecutive lines or sentences', ca: 'Repetir una o diverses paraules al principi de versos o frases seguides' },
    '🔁',
    { es: 'Da ritmo y machaca una idea hasta clavarla. No es exclusiva de la poesía: los grandes discursos la usan constantemente, porque lo que se repite al principio es lo que el oyente se lleva a casa.', en: 'It gives rhythm and hammers an idea home. It is not exclusive to poetry: great speeches use it constantly, because what is repeated at the start is what the listener takes away.', ca: 'Dona ritme i clava una idea. Els grans discursos la fan servir constantment.' }),

  q('lit-35', 'eso',
    { es: '¿Qué es el Siglo de Oro español?', en: 'What is the Spanish Golden Age?', ca: 'Què és el Segle d\'Or espanyol?' },
    { es: ['El periodo de esplendor literario de los siglos XVI y XVII', 'El siglo XIX entero', 'La Edad Media española', 'El siglo XVIII de la Ilustración'], en: ['The period of literary splendour in the 16th and 17th centuries', 'The whole 19th century', 'The Spanish Middle Ages', 'The 18th-century Enlightenment'], ca: ['El període d\'esplendor literària dels segles XVI i XVII', 'El segle XIX sencer', 'L\'Edat Mitjana espanyola', 'El segle XVIII de la Il·lustració'] },
    { es: 'El periodo de esplendor literario de los siglos XVI y XVII', en: 'The period of literary splendour in the 16th and 17th centuries', ca: 'El període d\'esplendor literària dels segles XVI i XVII' },
    '👑',
    { es: 'Cervantes, Lope de Vega, Quevedo, Góngora y Calderón, todos casi a la vez. Curiosamente coincide con la decadencia política y económica del imperio: el oro era el de la literatura, no el de las arcas.', en: 'Cervantes, Lope de Vega, Quevedo, Góngora and Calderón, almost all at once. Curiously it coincides with the empire\'s political and economic decline: the gold was literary, not in the treasury.', ca: 'Cervantes, Lope de Vega, Quevedo, Góngora i Calderón, tots gairebé alhora.' }),

  q('lit-36', 'eso',
    { es: '¿Qué es la novela picaresca?', en: 'What is the picaresque novel?', ca: 'Què és la novel·la picaresca?' },
    { es: ['Un relato en primera persona sobre un pícaro pobre que sobrevive con astucia', 'Una novela de caballeros y batallas', 'Una historia de amor pastoril', 'Una novela policíaca'], en: ['A first-person tale of a poor rogue surviving by his wits', 'A novel of knights and battles', 'A pastoral love story', 'A detective novel'], ca: ['Un relat en primera persona sobre un jove pobre que sobreviu amb astúcia', 'Una novel·la de cavallers i batalles', 'Una història d\'amor pastoril', 'Una novel·la policíaca'] },
    { es: 'Un relato en primera persona sobre un pícaro pobre que sobrevive con astucia', en: 'A first-person tale of a poor rogue surviving by his wits', ca: 'Un relat en primera persona sobre un jove pobre que sobreviu amb astúcia' },
    '🎩',
    { es: 'El Lazarillo de Tormes la inaugura a mediados del XVI, y es lo contrario de los libros de caballerías: el protagonista no es un héroe sino un muerto de hambre, y sirve para retratar por dentro una sociedad entera.', en: 'Lazarillo de Tormes opens it in the mid-16th century, and it is the opposite of chivalric romance: the hero is no hero but a starving boy, used to portray a whole society from within.', ca: 'El Lazarillo de Tormes la inaugura a mitjan segle XVI: el protagonista no és un heroi sinó un mort de gana.' }),

  q('lit-37', 'eso',
    { es: '¿Quién escribió La casa de Bernarda Alba y Bodas de sangre?', en: 'Who wrote The House of Bernarda Alba and Blood Wedding?', ca: 'Qui va escriure La casa de Bernarda Alba i Noces de sang?' },
    { es: ['Federico García Lorca', 'Antonio Machado', 'Miguel Hernández', 'Rafael Alberti'], en: ['Federico García Lorca', 'Antonio Machado', 'Miguel Hernández', 'Rafael Alberti'], ca: ['Federico García Lorca', 'Antonio Machado', 'Miguel Hernández', 'Rafael Alberti'] },
    { es: 'Federico García Lorca', en: 'Federico García Lorca', ca: 'Federico García Lorca' },
    '🌙',
    { es: 'Fue poeta y dramaturgo de la Generación del 27, y sus obras giran casi siempre en torno a mujeres atrapadas por normas sociales asfixiantes. Fue fusilado en 1936, al principio de la Guerra Civil.', en: 'A poet and playwright of the Generation of \'27, his works almost always turn on women trapped by suffocating social rules. He was shot in 1936, at the start of the Civil War.', ca: 'Poeta i dramaturg de la Generació del 27. Va ser afusellat el 1936, al principi de la Guerra Civil.' }),

  q('lit-38', 'eso',
    { es: '¿Qué es un tópico literario como el "carpe diem"?', en: 'What is a literary topos such as "carpe diem"?', ca: 'Què és un tòpic literari com el "carpe diem"?' },
    { es: ['Un tema que se repite en la literatura de todas las épocas', 'Una figura retórica', 'Un tipo de estrofa', 'Un error muy común'], en: ['A theme recurring in literature across all periods', 'A rhetorical device', 'A kind of stanza', 'A very common error'], ca: ['Un tema que es repeteix en la literatura de totes les èpoques', 'Una figura retòrica', 'Un tipus d\'estrofa', 'Un error molt comú'] },
    { es: 'Un tema que se repite en la literatura de todas las épocas', en: 'A theme recurring in literature across all periods', ca: 'Un tema que es repeteix en la literatura de totes les èpoques' },
    '⏳',
    { es: '"Carpe diem" es aprovecha el día; "tempus fugit", el tiempo se escapa; "ubi sunt", dónde están los que se fueron. Vienen de la literatura latina y siguen apareciendo hoy en canciones y películas.', en: '"Carpe diem" is seize the day; "tempus fugit", time flies; "ubi sunt", where are those who went. They come from Latin literature and still turn up today in songs and films.', ca: '"Carpe diem" és aprofita el dia; "tempus fugit", el temps s\'escapa. Vénen de la literatura llatina.' }),

  q('lit-39', 'eso',
    { es: '¿Qué caracteriza al Romanticismo del siglo XIX?', en: 'What characterises 19th-century Romanticism?', ca: 'Què caracteritza el Romanticisme del segle XIX?' },
    { es: ['El sentimiento y la libertad por encima de la razón y las reglas', 'La imitación estricta de los clásicos', 'El rechazo de toda emoción', 'La defensa de la razón sobre todo'], en: ['Feeling and freedom above reason and rules', 'Strict imitation of the classics', 'The rejection of all emotion', 'The defence of reason above all'], ca: ['El sentiment i la llibertat per damunt de la raó i les regles', 'La imitació estricta dels clàssics', 'El rebuig de tota emoció', 'La defensa de la raó per damunt de tot'] },
    { es: 'El sentimiento y la libertad por encima de la razón y las reglas', en: 'Feeling and freedom above reason and rules', ca: 'El sentiment i la llibertat per damunt de la raó i les regles' },
    '🌹',
    { es: 'Es la reacción contra la Ilustración, que lo fiaba todo a la razón. Aparecen la noche, las ruinas, la naturaleza desatada y el héroe rebelde. En España, Bécquer, Espronceda y el Duque de Rivas.', en: 'It is the reaction against the Enlightenment, which trusted everything to reason. Night, ruins, untamed nature and the rebel hero appear. In Spain: Bécquer, Espronceda and the Duke of Rivas.', ca: 'És la reacció contra la Il·lustració. Apareixen la nit, les ruïnes i l\'heroi rebel.' }),

  q('lit-40', 'eso',
    { es: '¿Qué es un romance en la métrica española?', en: 'What is a romance in Spanish metrics?', ca: 'Què és un romanç en la mètrica espanyola?' },
    { es: ['Una serie indefinida de octosílabos con rima asonante en los pares', 'Un poema de catorce versos', 'Una historia de amor en prosa', 'Una estrofa de cuatro versos'], en: ['An open-ended series of octosyllables with assonance in the even lines', 'A fourteen-line poem', 'A love story in prose', 'A four-line stanza'], ca: ['Una sèrie indefinida d\'octosíl·labs amb rima assonant als parells', 'Un poema de catorze versos', 'Una història d\'amor en prosa', 'Una estrofa de quatre versos'] },
    { es: 'Una serie indefinida de octosílabos con rima asonante en los pares', en: 'An open-ended series of octosyllables with assonance in the even lines', ca: 'Una sèrie indefinida d\'octosíl·labs amb rima assonant als parells' },
    '🎶',
    { es: 'Los impares quedan sueltos, sin rima. Nació para cantarse y transmitirse de memoria, y por eso es tan flexible: no tiene número fijo de versos y se puede alargar mientras dure la historia.', en: 'The odd lines are left free, unrhymed. It was born to be sung and passed on by memory, hence its flexibility: no fixed number of lines, extendable as long as the story lasts.', ca: 'Els senars queden solts, sense rima. Va néixer per cantar-se i transmetre\'s de memòria.' }),

  q('lit-41', 'eso',
    { es: '¿Qué es la sinalefa al medir un verso?', en: 'What is synalepha when scanning a line?', ca: 'Què és la sinalefa en mesurar un vers?' },
    { es: ['Unir en una sola sílaba la vocal final de una palabra y la inicial de la siguiente', 'Separar dos vocales seguidas', 'Añadir una sílaba al final', 'Quitar la última sílaba'], en: ['Merging a word\'s final vowel with the next word\'s initial vowel into one syllable', 'Splitting two consecutive vowels', 'Adding a syllable at the end', 'Removing the last syllable'], ca: ['Unir en una sola síl·laba la vocal final d\'una paraula i la inicial de la següent', 'Separar dues vocals seguides', 'Afegir una síl·laba al final', 'Treure l\'última síl·laba'] },
    { es: 'Unir en una sola sílaba la vocal final de una palabra y la inicial de la siguiente', en: 'Merging a word\'s final vowel with the next word\'s initial vowel into one syllable', ca: 'Unir en una sola síl·laba la vocal final d\'una paraula i la inicial de la següent' },
    '🔗',
    { es: 'En "la_alta torre" se cuenta una sílaba menos. Es la razón de que al contar sílabas a mano casi siempre salgan más de las que tiene el verso: hay que contar como se habla, no como se escribe.', en: 'In "la_alta torre" you count one syllable fewer. It is why counting syllables by hand almost always gives more than the line has: you must count as it is spoken, not as it is written.', ca: 'A "la_alta torre" es compta una síl·laba menys. Cal comptar com es parla, no com s\'escriu.' }),

  q('lit-42', 'eso',
    { es: '¿Qué diferencia hay entre tragedia y comedia en el teatro clásico?', en: 'What is the difference between tragedy and comedy in classical theatre?', ca: 'Quina diferència hi ha entre tragèdia i comèdia al teatre clàssic?' },
    { es: ['La tragedia acaba mal y trata temas graves; la comedia acaba bien y busca la risa', 'La tragedia es en verso y la comedia en prosa', 'La comedia es más larga', 'La tragedia no tiene personajes'], en: ['Tragedy ends badly with grave themes; comedy ends well and seeks laughter', 'Tragedy is in verse and comedy in prose', 'Comedy is longer', 'Tragedy has no characters'], ca: ['La tragèdia acaba malament i tracta temes greus; la comèdia acaba bé i busca el riure', 'La tragèdia és en vers i la comèdia en prosa', 'La comèdia és més llarga', 'La tragèdia no té personatges'] },
    { es: 'La tragedia acaba mal y trata temas graves; la comedia acaba bien y busca la risa', en: 'Tragedy ends badly with grave themes; comedy ends well and seeks laughter', ca: 'La tragèdia acaba malament i tracta temes greus; la comèdia acaba bé i busca el riure' },
    '🎭',
    { es: 'Las dos máscaras del teatro, una llorando y otra riendo, vienen justo de ahí. El drama queda en medio: temas serios pero sin el final catastrófico obligatorio de la tragedia.', en: 'The two theatre masks, one weeping and one laughing, come exactly from this. Drama sits in between: serious themes without tragedy\'s obligatory catastrophic ending.', ca: 'Les dues màscares del teatre vénen justament d\'aquí. El drama queda al mig.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 13 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
