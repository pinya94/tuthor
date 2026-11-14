// Páginas de estudio sueltas con mucha demanda escolar (autocompletado de
// Google, nov-2026) y sin página propia hasta ahora:
//   /estudiar/idiomas/espanol/literatura/generos-literarios
//   /estudiar/idiomas/espanol/literatura/figuras-literarias
//   /estudiar/geografia/continentes-y-oceanos
// Se fusionan en CONTENIDO_TEMA con la clave = slug. Los ejemplos de figuras
// son inventados o de autores de dominio público (Bécquer, Santa Teresa).

const T = (es, en, ca) => ({ es, en, ca })
const L = T

const generosLiterarios = {
  metaTitle: L('Los géneros literarios: lírica, narrativa y teatro, con sus subgéneros — resumen y ejercicios', 'Literary genres: poetry, narrative and drama, with their subgenres — summary and practice questions', 'Els gèneres literaris: lírica, narrativa i teatre, amb els subgèneres — resum i exercicis'),
  metaDesc: L('Los tres géneros literarios (lírico, narrativo y dramático), sus rasgos y subgéneros (novela, cuento, fábula, tragedia, comedia, oda, elegía…), el narrador y ejercicios resueltos.', 'The three literary genres (lyric, narrative and dramatic), their features and subgenres (novel, short story, fable, tragedy, comedy, ode, elegy…) and solved exercises.', 'Els tres gèneres literaris (líric, narratiu i dramàtic), els trets i subgèneres (novel·la, conte, faula, tragèdia, comèdia, oda, elegia…), el narrador i exercicis resolts.'),
  resumen: L(
    ['Las obras literarias se agrupan en tres grandes géneros según cómo se dirigen al lector. La lírica expresa los sentimientos y las emociones de un yo poético, normalmente en verso. La narrativa cuenta una historia a través de un narrador, en prosa o en verso. Y el teatro (género dramático) presenta la historia directamente con el diálogo de los personajes, para ser representada.', 'Cada género se divide en subgéneros: la novela y el cuento son narrativos; la tragedia y la comedia, teatrales; la oda y la elegía, líricos. Muchos libros añaden un cuarto grupo, el didáctico, para los textos que enseñan o argumentan, como el ensayo o la fábula con moraleja.'],
    ['Literary works are grouped into three main genres according to how they address the reader. Lyric poetry expresses the feelings and emotions of a poetic voice, usually in verse. Narrative tells a story through a narrator, in prose or verse. And drama presents the story directly through the characters’ dialogue, to be performed.', 'Each genre is divided into subgenres: the novel and the short story are narrative; tragedy and comedy belong to drama; the ode and the elegy are lyric. Many textbooks add a fourth group, didactic writing, for texts that teach or argue, such as the essay or the fable with a moral.'],
    ['Les obres literàries s’agrupen en tres grans gèneres segons com s’adrecen al lector. La lírica expressa els sentiments i les emocions d’un jo poètic, normalment en vers. La narrativa explica una història a través d’un narrador, en prosa o en vers. I el teatre (gènere dramàtic) presenta la història directament amb el diàleg dels personatges, per ser representada.', 'Cada gènere es divideix en subgèneres: la novel·la i el conte són narratius; la tragèdia i la comèdia, teatrals; l’oda i l’elegia, lírics. Molts llibres hi afegeixen un quart grup, el didàctic, per als textos que ensenyen o argumenten, com l’assaig o la faula amb moralitat.'],
  ),
  puntosClave: L(
    ['Lírica: sentimientos de un yo poético, casi siempre en verso.', 'Narrativa: un narrador cuenta una historia (novela, cuento, leyenda…).', 'Teatro: diálogo de personajes, pensado para representarse.', 'El narrador puede contar en 1.ª persona (protagonista o testigo) o en 3.ª (omnisciente u observador).', 'Estructura de una historia: planteamiento, nudo y desenlace.', 'Género didáctico (según el libro): ensayo, fábula, sátira.'],
    ['Lyric: the feelings of a poetic voice, almost always in verse.', 'Narrative: a narrator tells a story (novel, short story, legend…).', 'Drama: characters’ dialogue, meant to be performed.', 'The narrator can tell the story in the 1st person (protagonist or witness) or the 3rd (omniscient or observer).', 'A story’s structure: opening, complication and resolution.', 'Didactic genre (in some textbooks): essay, fable, satire.'],
    ['Lírica: sentiments d’un jo poètic, gairebé sempre en vers.', 'Narrativa: un narrador explica una història (novel·la, conte, llegenda…).', 'Teatre: diàleg de personatges, pensat per representar-se.', 'El narrador pot explicar en 1a persona (protagonista o testimoni) o en 3a (omniscient o observador).', 'Estructura d’una història: plantejament, nus i desenllaç.', 'Gènere didàctic (segons el llibre): assaig, faula, sàtira.'],
  ),
  secciones: [
    {
      titulo: L('Los tres géneros y sus subgéneros', 'The three genres and their subgenres', 'Els tres gèneres i els subgèneres'),
      tabla: {
        columnas: L(['Género', 'Rasgos', 'Subgéneros', 'Obra de ejemplo'], ['Genre', 'Features', 'Subgenres', 'Example work'], ['Gènere', 'Trets', 'Subgèneres', 'Obra d’exemple']),
        filas: [
          [L('Lírico', 'Lyric', 'Líric'), L('expresa sentimientos; yo poético; verso, ritmo e imágenes', 'expresses feelings; poetic voice; verse, rhythm and imagery', 'expressa sentiments; jo poètic; vers, ritme i imatges'), L('oda (alabanza), elegía (dolor por una pérdida), égloga (pastores y amor), canción, sátira', 'ode (praise), elegy (grief for a loss), eclogue (shepherds and love), song, satire', 'oda (lloança), elegia (dolor per una pèrdua), ègloga (pastors i amor), cançó, sàtira'), 'Rimas, de Bécquer'],
          [L('Narrativo', 'Narrative', 'Narratiu'), L('un narrador cuenta hechos de unos personajes en un espacio y un tiempo', 'a narrator tells what happens to characters in a place and time', 'un narrador explica fets d’uns personatges en un espai i un temps'), L('novela, cuento, leyenda, mito, fábula, epopeya, cantar de gesta', 'novel, short story, legend, myth, fable, epic, chanson de geste', 'novel·la, conte, llegenda, mite, faula, epopeia, cantar de gesta'), 'Don Quijote, de Cervantes'],
          [L('Dramático (teatro)', 'Dramatic (drama)', 'Dramàtic (teatre)'), L('diálogo y acotaciones; actos y escenas; se representa', 'dialogue and stage directions; acts and scenes; it is performed', 'diàleg i acotacions; actes i escenes; es representa'), L('tragedia, comedia, drama; menores: entremés, sainete, auto sacramental', 'tragedy, comedy, drama; minor forms: entremés, sainete, auto sacramental', 'tragèdia, comèdia, drama; menors: entremès, sainet, acte sacramental'), 'La vida es sueño, de Calderón'],
        ],
      },
    },
    {
      titulo: L('El narrador y la estructura de una historia', 'The narrator and the structure of a story', 'El narrador i l’estructura d’una història'),
      tabla: {
        columnas: L(['Tipo de narrador', 'Persona', 'Qué sabe', 'Ejemplo'], ['Type of narrator', 'Person', 'What they know', 'Example'], ['Tipus de narrador', 'Persona', 'Què sap', 'Exemple']),
        filas: [
          [L('Protagonista', 'Protagonist', 'Protagonista'), '1.ª', L('lo que vive y siente él mismo', 'what they live and feel themselves', 'el que viu i sent ell mateix'), '«Aquella mañana me desperté sin saber dónde estaba.»'],
          [L('Testigo', 'Witness', 'Testimoni'), '1.ª', L('lo que ve, pero no es el protagonista', 'what they see, but they are not the protagonist', 'el que veu, però no és el protagonista'), '«Vi a Marta cruzar la plaza con prisa.»'],
          [L('Omnisciente', 'Omniscient', 'Omniscient'), '3.ª', L('todo, incluso lo que piensan los personajes', 'everything, even what the characters think', 'tot, fins i tot el que pensen els personatges'), '«Marta cruzó la plaza; temía que nadie la creyera.»'],
          [L('Observador', 'Observer', 'Observador'), '3.ª', L('solo lo que se ve desde fuera, como una cámara', 'only what can be seen from outside, like a camera', 'només el que es veu des de fora, com una càmera'), '«Marta cruzó la plaza y se detuvo ante la puerta.»'],
        ],
      },
      lista: L(
        ['Planteamiento: se presentan los personajes, el lugar y el problema. Nudo: el conflicto se complica. Desenlace: el conflicto se resuelve (o no).'],
        ['Opening: the characters, the setting and the problem are introduced. Complication: the conflict grows. Resolution: the conflict is resolved (or not).'],
        ['Plantejament: es presenten els personatges, el lloc i el problema. Nus: el conflicte es complica. Desenllaç: el conflicte es resol (o no).'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Cuáles son los géneros literarios?', 'What are the literary genres?', 'Quins són els gèneres literaris?'),
      r: T('Los tres principales son el lírico (poesía de sentimientos), el narrativo (historias contadas por un narrador) y el dramático (teatro). Algunos libros añaden el didáctico (ensayo, fábula).', 'The three main ones are lyric (poetry of feelings), narrative (stories told by a narrator) and dramatic (drama). Some textbooks add didactic writing (essay, fable).', 'Els tres principals són el líric (poesia de sentiments), el narratiu (històries explicades per un narrador) i el dramàtic (teatre). Alguns llibres hi afegeixen el didàctic (assaig, faula).') },
    { p: T('¿Qué diferencia hay entre novela y cuento?', 'What is the difference between a novel and a short story?', 'Quina diferència hi ha entre novel·la i conte?'),
      r: T('La extensión y la complejidad: el cuento es breve, con pocos personajes y una sola acción; la novela es larga, con más personajes, varias acciones y más descripción.', 'Length and complexity: a short story is brief, with few characters and a single plot; a novel is long, with more characters, several plots and more description.', 'L’extensió i la complexitat: el conte és breu, amb pocs personatges i una sola acció; la novel·la és llarga, amb més personatges, diverses accions i més descripció.') },
    { p: T('¿Un poema siempre es lírico?', 'Is a poem always lyric?', 'Un poema sempre és líric?'),
      r: T('No. El verso es la forma, no el género: el Cantar de mio Cid está en verso y es narrativo (cuenta una historia), y muchas obras de teatro del Siglo de Oro también están en verso.', 'No. Verse is the form, not the genre: the Cantar de mio Cid is in verse and is narrative (it tells a story), and many Golden Age plays are in verse too.', 'No. El vers és la forma, no el gènere: el Cantar de mio Cid està en vers i és narratiu (explica una història), i moltes obres de teatre del Segle d’Or també estan en vers.') },
  ],
  ejercicios: [
    { e: T('¿A qué subgénero pertenece cada texto? a) Relato breve con animales que hablan y una moraleja. b) Historia larga en prosa con muchos personajes. c) Obra de teatro que acaba con la muerte del protagonista. d) Poema de dolor por la muerte de un ser querido.', 'Which subgenre is each text? a) A short story with talking animals and a moral. b) A long prose story with many characters. c) A play that ends with the protagonist’s death. d) A poem of grief for the death of a loved one.', 'A quin subgènere pertany cada text? a) Relat breu amb animals que parlen i una moralitat. b) Història llarga en prosa amb molts personatges. c) Obra de teatre que acaba amb la mort del protagonista. d) Poema de dolor per la mort d’un ésser estimat.'),
      s: T('a) Fábula. b) Novela. c) Tragedia. d) Elegía.', 'a) Fable. b) Novel. c) Tragedy. d) Elegy.', 'a) Faula. b) Novel·la. c) Tragèdia. d) Elegia.') },
    { e: T('¿Qué tipo de narrador hay en «Me miré en el espejo y no me reconocí»? ¿Y en «Luis entró en casa; estaba seguro de que nadie lo había visto»?', 'What type of narrator is there in «Me miré en el espejo y no me reconocí»? And in «Luis entró en casa; estaba seguro de que nadie lo había visto»?', 'Quin tipus de narrador hi ha a «Me miré en el espejo y no me reconocí»? I a «Luis entró en casa; estaba seguro de que nadie lo había visto»?'),
      s: T('El primero, narrador protagonista (1.ª persona). El segundo, omnisciente: cuenta en 3.ª persona y sabe lo que piensa Luis.', 'The first, a protagonist narrator (1st person). The second, omniscient: it uses the 3rd person and knows what Luis thinks.', 'El primer, narrador protagonista (1a persona). El segon, omniscient: explica en 3a persona i sap què pensa Luis.') },
    { e: T('Di el género de: una obra con acotaciones y personajes que dialogan; un texto en verso que expresa la tristeza del poeta; una leyenda sobre el origen de un lago.', 'Give the genre of: a work with stage directions and characters in dialogue; a text in verse expressing the poet’s sadness; a legend about how a lake came to be.', 'Digues el gènere de: una obra amb acotacions i personatges que dialoguen; un text en vers que expressa la tristesa del poeta; una llegenda sobre l’origen d’un llac.'),
      s: T('Teatro (dramático), lírico y narrativo.', 'Drama (dramatic), lyric and narrative.', 'Teatre (dramàtic), líric i narratiu.') },
    { e: T('Ordena las partes de un cuento: «Por fin encontraron el tesoro y volvieron a casa» / «Había una vez dos hermanos que vivían junto al bosque» / «Una noche, una tormenta los dejó perdidos».', 'Put the parts of a story in order: «Por fin encontraron el tesoro y volvieron a casa» / «Había una vez dos hermanos que vivían junto al bosque» / «Una noche, una tormenta los dejó perdidos».', 'Ordena les parts d’un conte: «Por fin encontraron el tesoro y volvieron a casa» / «Había una vez dos hermanos que vivían junto al bosque» / «Una noche, una tormenta los dejó perdidos».'),
      s: T('Planteamiento: «Había una vez…». Nudo: «Una noche, una tormenta…». Desenlace: «Por fin encontraron…».', 'Opening: «Había una vez…». Complication: «Una noche, una tormenta…». Resolution: «Por fin encontraron…».', 'Plantejament: «Había una vez…». Nus: «Una noche, una tormenta…». Desenllaç: «Por fin encontraron…».') },
    { e: T('¿Qué es una acotación y en qué género aparece?', 'What is a stage direction and in which genre does it appear?', 'Què és una acotació i en quin gènere apareix?'),
      s: T('Es la indicación del autor sobre el lugar, los gestos o los movimientos de los personajes, normalmente entre paréntesis o en cursiva. Aparece en el teatro.', 'It is the author’s note about the setting, gestures or movements of the characters, usually in brackets or italics. It appears in drama.', 'És la indicació de l’autor sobre el lloc, els gestos o els moviments dels personatges, normalment entre parèntesis o en cursiva. Apareix al teatre.') },
  ],
}

const figurasLiterarias = {
  metaTitle: L('Figuras literarias: qué son, tipos y ejemplos (con tabla) — resumen y ejercicios resueltos', 'Spanish literary devices: what they are, types and examples (table) — summary and solved exercises', 'Figures literàries: què són, tipus i exemples (amb taula) — resum i exercicis resolts'),
  metaDesc: L('Las figuras literarias más importantes con su definición y ejemplos: metáfora, comparación, personificación, hipérbole, anáfora, aliteración, antítesis, hipérbaton… y ejercicios.', 'The main Spanish literary devices with definitions and examples: metaphor, simile, personification, hyperbole, anaphora, alliteration, antithesis, hyperbaton… and exercises.', 'Les figures literàries més importants amb la definició i exemples: metàfora, comparació, personificació, hipèrbole, anàfora, al·literació, antítesi, hipèrbaton… i exercicis.'),
  resumen: L(
    ['Las figuras literarias (o recursos estilísticos) son formas de usar el lenguaje que se salen de lo habitual para embellecer un texto, darle fuerza o llamar la atención. Aparecen sobre todo en la poesía, pero también en la publicidad, las canciones y el habla de todos los días («me muero de hambre» es una hipérbole).', 'Se suelen agrupar en tres tipos: las que juegan con los sonidos (aliteración, onomatopeya), las que juegan con el orden y la repetición de las palabras (anáfora, hipérbaton, polisíndeton) y las que juegan con el significado (metáfora, comparación, personificación, hipérbole, antítesis).'],
    ['Literary devices (or stylistic resources) are ways of using language that break from the usual to make a text more beautiful, give it force or catch attention. They appear above all in poetry, but also in advertising, songs and everyday speech («me muero de hambre», «I’m starving to death», is a hyperbole).', 'They are usually grouped into three kinds: those that play with sounds (alliteration, onomatopoeia), those that play with the order and repetition of words (anaphora, hyperbaton, polysyndeton) and those that play with meaning (metaphor, simile, personification, hyperbole, antithesis).'],
    ['Les figures literàries (o recursos estilístics) són maneres de fer servir el llenguatge que surten de l’habitual per embellir un text, donar-li força o cridar l’atenció. Apareixen sobretot en la poesia, però també en la publicitat, les cançons i la parla de cada dia («me muero de hambre» és una hipèrbole).', 'Se solen agrupar en tres tipus: les que juguen amb els sons (al·literació, onomatopeia), les que juguen amb l’ordre i la repetició de les paraules (anàfora, hipèrbaton, polisíndeton) i les que juguen amb el significat (metàfora, comparació, personificació, hipèrbole, antítesi).'],
  ),
  puntosClave: L(
    ['Comparación: une dos cosas con un nexo («como», «cual»).', 'Metáfora: identifica dos cosas sin nexo («tus ojos son luceros»).', 'Personificación: da rasgos humanos a lo que no lo es.', 'Hipérbole: exageración.', 'Anáfora: repetir palabras al principio de varios versos o frases.', 'Hipérbaton: alterar el orden normal de la frase.'],
    ['Simile: links two things with a connector («como», «cual»).', 'Metaphor: identifies two things without a connector («tus ojos son luceros»).', 'Personification: gives human traits to something that is not human.', 'Hyperbole: exaggeration.', 'Anaphora: repeating words at the start of several lines or sentences.', 'Hyperbaton: changing the normal word order.'],
    ['Comparació: uneix dues coses amb un nexe («como», «cual»).', 'Metàfora: identifica dues coses sense nexe («tus ojos son luceros»).', 'Personificació: dona trets humans al que no ho és.', 'Hipèrbole: exageració.', 'Anàfora: repetir paraules al principi de diversos versos o frases.', 'Hipèrbaton: alterar l’ordre normal de la frase.'],
  ),
  secciones: [
    {
      titulo: L('Tabla de figuras literarias con ejemplos', 'Table of literary devices with examples', 'Taula de figures literàries amb exemples'),
      tabla: {
        columnas: L(['Figura', 'Qué hace', 'Ejemplo'], ['Device', 'What it does', 'Example'], ['Figura', 'Què fa', 'Exemple']),
        filas: [
          [L('Comparación o símil', 'Simile', 'Comparació o símil'), L('relaciona dos elementos con un nexo comparativo', 'links two things with a comparing word', 'relaciona dos elements amb un nexe comparatiu'), '«Tus ojos brillan como luceros.»'],
          [L('Metáfora', 'Metaphor', 'Metàfora'), L('identifica un elemento con otro, sin nexo', 'identifies one thing with another, without a connector', 'identifica un element amb un altre, sense nexe'), '«Las perlas de tu boca» (los dientes).'],
          [L('Personificación', 'Personification', 'Personificació'), L('atribuye cualidades humanas a animales u objetos', 'gives human qualities to animals or objects', 'atribueix qualitats humanes a animals o objectes'), '«El viento susurraba entre los árboles.»'],
          [L('Hipérbole', 'Hyperbole', 'Hipèrbole'), L('exagera mucho', 'exaggerates greatly', 'exagera molt'), '«Te lo he dicho un millón de veces.»'],
          [L('Anáfora', 'Anaphora', 'Anàfora'), L('repite palabras al inicio de versos o frases', 'repeats words at the start of lines or sentences', 'repeteix paraules a l’inici de versos o frases'), '«Cada día te espero, cada día te busco, cada día te nombro.»'],
          [L('Aliteración', 'Alliteration', 'Al·literació'), L('repite un sonido', 'repeats a sound', 'repeteix un so'), '«Con el ala aleve del leve abanico» (Rubén Darío: la l)'],
          [L('Onomatopeya', 'Onomatopoeia', 'Onomatopeia'), L('imita un sonido real', 'imitates a real sound', 'imita un so real'), '«El tictac del reloj no me deja dormir.»'],
          [L('Antítesis', 'Antithesis', 'Antítesi'), L('enfrenta ideas contrarias', 'sets opposite ideas against each other', 'contraposa idees contràries'), '«Unos ríen y otros lloran.»'],
          [L('Paradoja', 'Paradox', 'Paradoxa'), L('une ideas que parecen contradictorias pero encierran un sentido', 'joins ideas that seem contradictory but make sense', 'uneix idees que semblen contradictòries però tenen sentit'), '«Vivo sin vivir en mí» (Santa Teresa de Jesús).'],
          [L('Hipérbaton', 'Hyperbaton', 'Hipèrbaton'), L('altera el orden lógico de la frase', 'changes the logical order of the sentence', 'altera l’ordre lògic de la frase'), '«Del salón en el ángulo oscuro» (Bécquer).'],
          [L('Epíteto', 'Epithet', 'Epítet'), L('adjetivo que repite una cualidad propia del nombre', 'adjective repeating a quality the noun already has', 'adjectiu que repeteix una qualitat pròpia del nom'), '«La blanca nieve.»'],
          [L('Polisíndeton', 'Polysyndeton', 'Polisíndeton'), L('repite conjunciones', 'repeats conjunctions', 'repeteix conjuncions'), '«Y corre y salta y grita y ríe.»'],
          [L('Asíndeton', 'Asyndeton', 'Asíndeton'), L('suprime las conjunciones', 'leaves out conjunctions', 'suprimeix les conjuncions'), '«Llegué, vi, vencí.»'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre metáfora y comparación?', 'What is the difference between a metaphor and a simile?', 'Quina diferència hi ha entre metàfora i comparació?'),
      r: T('La comparación usa un nexo (como, cual, igual que): «tus dientes son blancos como perlas». La metáfora lo identifica directamente, sin nexo: «las perlas de tu boca».', 'A simile uses a connector (como, cual, igual que): «tus dientes son blancos como perlas». A metaphor identifies it directly, without one: «las perlas de tu boca».', 'La comparació fa servir un nexe (como, cual, igual que): «tus dientes son blancos como perlas». La metàfora ho identifica directament, sense nexe: «las perlas de tu boca».') },
    { p: T('¿Una frase puede tener varias figuras a la vez?', 'Can one sentence contain several devices at once?', 'Una frase pot tenir diverses figures alhora?'),
      r: T('Sí, es muy frecuente: «El sol, cansado, se acostó tras los montes» tiene a la vez personificación (el sol se cansa y se acuesta) y metáfora (acostarse por ponerse).', 'Yes, very often: «El sol, cansado, se acostó tras los montes» is at once personification (the sun gets tired and goes to bed) and metaphor (going to bed for setting).', 'Sí, és molt freqüent: «El sol, cansado, se acostó tras los montes» té alhora personificació (el sol es cansa i se’n va a dormir) i metàfora (anar a dormir per pondre’s).') },
  ],
  ejercicios: [
    { e: T('¿Qué figura hay en «Tu risa es un rayo de sol»?', 'Which device is in «Tu risa es un rayo de sol»?', 'Quina figura hi ha a «Tu risa es un rayo de sol»?'), s: T('Metáfora: identifica la risa con un rayo de sol, sin nexo.', 'Metaphor: it identifies the laugh with a ray of sunshine, without a connector.', 'Metàfora: identifica el riure amb un raig de sol, sense nexe.') },
    { e: T('¿Y en «Tu risa es como un rayo de sol»?', 'And in «Tu risa es como un rayo de sol»?', 'I a «Tu risa es como un rayo de sol»?'), s: T('Comparación: ahora aparece el nexo «como».', 'Simile: now the connector «como» appears.', 'Comparació: ara apareix el nexe «como».') },
    { e: T('Identifica la figura: «La luna nos miraba en silencio».', 'Identify the device: «La luna nos miraba en silencio».', 'Identifica la figura: «La luna nos miraba en silencio».'), s: T('Personificación: la luna «mira», una acción humana.', 'Personification: the moon «looks», a human action.', 'Personificació: la lluna «mira», una acció humana.') },
    { e: T('Identifica la figura: «Tengo tanta hambre que me comería una vaca».', 'Identify the device: «Tengo tanta hambre que me comería una vaca».', 'Identifica la figura: «Tengo tanta hambre que me comería una vaca».'), s: T('Hipérbole: una exageración.', 'Hyperbole: an exaggeration.', 'Hipèrbole: una exageració.') },
    { e: T('¿Qué figura hay en «Y llora y grita y patalea»? ¿Y si se dice «Llora, grita, patalea»?', 'Which device is in «Y llora y grita y patalea»? And if you say «Llora, grita, patalea»?', 'Quina figura hi ha a «Y llora y grita y patalea»? I si es diu «Llora, grita, patalea»?'), s: T('La primera, polisíndeton (repite «y»); la segunda, asíndeton (quita las conjunciones).', 'The first, polysyndeton (it repeats «y»); the second, asyndeton (it drops the conjunctions).', 'La primera, polisíndeton (repeteix «y»); la segona, asíndeton (treu les conjuncions).') },
    { e: T('Escribe el orden normal de «Del salón en el ángulo oscuro» y di qué figura es.', 'Write «Del salón en el ángulo oscuro» in normal word order and name the device.', 'Escriu l’ordre normal de «Del salón en el ángulo oscuro» i digues quina figura és.'), s: T('«En el ángulo oscuro del salón». Es un hipérbaton.', '«En el ángulo oscuro del salón». It is a hyperbaton.', '«En el ángulo oscuro del salón». És un hipèrbaton.') },
  ],
}

const continentesOceanos = {
  metaTitle: L('Los continentes y los océanos del mundo: nombres, tamaño y mapa — resumen y ejercicios', 'The world’s continents and oceans: names, size and where they are — summary and practice questions', 'Els continents i els oceans del món: noms, mida i mapa — resum i exercicis'),
  metaDesc: L('Cuáles son los continentes y los océanos, ordenados por tamaño, con su superficie y población, dónde está cada uno, la diferencia entre mar y océano y ejercicios resueltos.', 'Which the continents and oceans are, ordered by size, with their area and population, where each one is, the difference between a sea and an ocean, and solved exercises.', 'Quins són els continents i els oceans, ordenats per mida, amb la superfície i la població, on és cadascun, la diferència entre mar i oceà i exercicis resolts.'),
  resumen: L(
    ['Las tierras emergidas del planeta se agrupan en continentes. En España se estudian seis: Asia, América, África, Antártida, Europa y Oceanía (o cinco, si no se cuenta la Antártida, que no tiene población permanente). En otros países se separa América en dos y se cuentan siete.', 'El agua salada ocupa más de dos terceras partes de la superficie de la Tierra y se divide en cinco océanos: Pacífico, Atlántico, Índico, Antártico (o Austral) y Ártico. El Pacífico es el más grande y profundo: en él está la fosa de las Marianas, de unos 11.000 metros.'],
    ['The planet’s land is grouped into continents. In Spain, six are studied: Asia, America, Africa, Antarctica, Europe and Oceania (or five, leaving out Antarctica, which has no permanent population). Other countries split America in two and count seven.', 'Salt water covers more than two thirds of the Earth’s surface and is divided into five oceans: the Pacific, Atlantic, Indian, Southern (Antarctic) and Arctic. The Pacific is the largest and deepest: it holds the Mariana Trench, about 11,000 metres deep.'],
    ['Les terres emergides del planeta s’agrupen en continents. A Espanya se n’estudien sis: Àsia, Amèrica, Àfrica, l’Antàrtida, Europa i Oceania (o cinc, si no es compta l’Antàrtida, que no té població permanent). En altres països se separa Amèrica en dues i se’n compten set.', 'L’aigua salada ocupa més de dues terceres parts de la superfície de la Terra i es divideix en cinc oceans: Pacífic, Atlàntic, Índic, Antàrtic (o Austral) i Àrtic. El Pacífic és el més gran i profund: s’hi troba la fossa de les Marianes, d’uns 11.000 metres.'],
  ),
  puntosClave: L(
    ['Continentes de mayor a menor: Asia, América, África, Antártida, Europa y Oceanía.', 'Asia es el más grande y el más poblado; Oceanía, el más pequeño.', 'Océanos de mayor a menor: Pacífico, Atlántico, Índico, Antártico y Ártico.', 'El Pacífico ocupa casi un tercio del planeta.', 'Un mar es más pequeño que un océano y suele estar rodeado en parte de tierra (el Mediterráneo).', 'España tiene costa en el océano Atlántico y en el mar Mediterráneo.'],
    ['Continents from largest to smallest: Asia, America, Africa, Antarctica, Europe and Oceania.', 'Asia is the largest and most populous; Oceania, the smallest.', 'Oceans from largest to smallest: Pacific, Atlantic, Indian, Southern and Arctic.', 'The Pacific covers almost a third of the planet.', 'A sea is smaller than an ocean and is usually partly enclosed by land (the Mediterranean).', 'Spain has a coast on the Atlantic Ocean and the Mediterranean Sea.'],
    ['Continents de més gran a més petit: Àsia, Amèrica, Àfrica, l’Antàrtida, Europa i Oceania.', 'Àsia és el més gran i el més poblat; Oceania, el més petit.', 'Oceans de més gran a més petit: Pacífic, Atlàntic, Índic, Antàrtic i Àrtic.', 'El Pacífic ocupa gairebé un terç del planeta.', 'Un mar és més petit que un oceà i sol estar envoltat en part de terra (la Mediterrània).', 'Espanya té costa a l’oceà Atlàntic i al mar Mediterrani.'],
  ),
  secciones: [
    {
      titulo: L('Los continentes, de mayor a menor', 'The continents, from largest to smallest', 'Els continents, de més gran a més petit'),
      tabla: {
        columnas: L(['Continente', 'Superficie', 'Población', 'Un dato'], ['Continent', 'Area', 'Population', 'A fact'], ['Continent', 'Superfície', 'Població', 'Una dada']),
        filas: [
          [L('Asia', 'Asia', 'Àsia'), L('unos 44 millones de km²', 'about 44 million km²', 'uns 44 milions de km²'), L('más de 4.700 millones', 'over 4.7 billion', 'més de 4.700 milions'), L('el Everest, la montaña más alta', 'Everest, the highest mountain', 'l’Everest, la muntanya més alta')],
          [L('América', 'America', 'Amèrica'), L('unos 42 millones de km²', 'about 42 million km²', 'uns 42 milions de km²'), L('unos 1.000 millones', 'about 1 billion', 'uns 1.000 milions'), L('el Amazonas, el río más caudaloso', 'the Amazon, the river with the most water', 'l’Amazones, el riu més cabalós')],
          [L('África', 'Africa', 'Àfrica'), L('unos 30 millones de km²', 'about 30 million km²', 'uns 30 milions de km²'), L('unos 1.500 millones', 'about 1.5 billion', 'uns 1.500 milions'), L('el Sáhara, el mayor desierto cálido', 'the Sahara, the largest hot desert', 'el Sàhara, el desert càlid més gran')],
          [L('Antártida', 'Antarctica', 'Antàrtida'), L('unos 14 millones de km²', 'about 14 million km²', 'uns 14 milions de km²'), L('sin población permanente', 'no permanent population', 'sense població permanent'), L('cubierta de hielo; el lugar más frío', 'covered in ice; the coldest place', 'coberta de gel; el lloc més fred')],
          [L('Europa', 'Europe', 'Europa'), L('unos 10 millones de km²', 'about 10 million km²', 'uns 10 milions de km²'), L('unos 745 millones', 'about 745 million', 'uns 745 milions'), L('separada de Asia por los Urales', 'separated from Asia by the Urals', 'separada d’Àsia pels Urals')],
          [L('Oceanía', 'Oceania', 'Oceania'), L('unos 8,5 millones de km²', 'about 8.5 million km²', 'uns 8,5 milions de km²'), L('unos 45 millones', 'about 45 million', 'uns 45 milions'), L('Australia y miles de islas', 'Australia and thousands of islands', 'Austràlia i milers d’illes')],
        ],
      },
    },
    {
      titulo: L('Los cinco océanos', 'The five oceans', 'Els cinc oceans'),
      tabla: {
        columnas: L(['Océano', 'Dónde está', 'Superficie'], ['Ocean', 'Where it is', 'Area'], ['Oceà', 'On és', 'Superfície']),
        filas: [
          [L('Pacífico', 'Pacific', 'Pacífic'), L('entre Asia y Oceanía al oeste y América al este', 'between Asia and Oceania to the west and America to the east', 'entre Àsia i Oceania a l’oest i Amèrica a l’est'), L('unos 165 millones de km²', 'about 165 million km²', 'uns 165 milions de km²')],
          [L('Atlántico', 'Atlantic', 'Atlàntic'), L('entre América al oeste y Europa y África al este', 'between America to the west and Europe and Africa to the east', 'entre Amèrica a l’oest i Europa i Àfrica a l’est'), L('unos 106 millones de km²', 'about 106 million km²', 'uns 106 milions de km²')],
          [L('Índico', 'Indian', 'Índic'), L('entre África, Asia y Oceanía', 'between Africa, Asia and Oceania', 'entre Àfrica, Àsia i Oceania'), L('unos 73 millones de km²', 'about 73 million km²', 'uns 73 milions de km²')],
          [L('Antártico (Austral)', 'Southern (Antarctic)', 'Antàrtic (Austral)'), L('alrededor de la Antártida', 'around Antarctica', 'al voltant de l’Antàrtida'), L('unos 20 millones de km²', 'about 20 million km²', 'uns 20 milions de km²')],
          [L('Ártico', 'Arctic', 'Àrtic'), L('alrededor del Polo Norte', 'around the North Pole', 'al voltant del Pol Nord'), L('unos 14 millones de km²', 'about 14 million km²', 'uns 14 milions de km²')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cuántos continentes hay: cinco, seis o siete?', 'How many continents are there: five, six or seven?', 'Quants continents hi ha: cinc, sis o set?'),
      r: T('Depende del modelo. En España se suelen contar seis (o cinco poblados, sin la Antártida). En los países de habla inglesa se separan América del Norte y América del Sur y se cuentan siete.', 'It depends on the model. Spain usually counts six (or five inhabited ones, without Antarctica). English-speaking countries split North and South America and count seven.', 'Depèn del model. A Espanya se’n solen comptar sis (o cinc de poblats, sense l’Antàrtida). Als països de parla anglesa se separen Amèrica del Nord i del Sud i se’n compten set.') },
    { p: T('¿Qué diferencia hay entre un mar y un océano?', 'What is the difference between a sea and an ocean?', 'Quina diferència hi ha entre un mar i un oceà?'),
      r: T('El océano es una gran masa de agua salada que separa continentes. El mar es más pequeño y suele estar rodeado en parte por tierra, como el Mediterráneo, que se comunica con el Atlántico por el estrecho de Gibraltar.', 'An ocean is a huge body of salt water separating continents. A sea is smaller and usually partly enclosed by land, like the Mediterranean, which connects with the Atlantic through the Strait of Gibraltar.', 'L’oceà és una gran massa d’aigua salada que separa continents. El mar és més petit i sol estar envoltat en part per terra, com la Mediterrània, que es comunica amb l’Atlàntic per l’estret de Gibraltar.') },
  ],
  ejercicios: [
    { e: T('¿Cuál es el continente más grande? ¿Y el más pequeño?', 'Which is the largest continent? And the smallest?', 'Quin és el continent més gran? I el més petit?'), s: T('Asia es el más grande; Oceanía, el más pequeño.', 'Asia is the largest; Oceania, the smallest.', 'Àsia és el més gran; Oceania, el més petit.') },
    { e: T('¿Qué océano separa Europa de América? ¿Y cuál baña a la vez África, Asia y Oceanía?', 'Which ocean separates Europe from America? And which one washes Africa, Asia and Oceania at once?', 'Quin oceà separa Europa d’Amèrica? I quin banya alhora Àfrica, Àsia i Oceania?'), s: T('El Atlántico separa Europa de América; el Índico baña África, Asia y Oceanía.', 'The Atlantic separates Europe from America; the Indian Ocean washes Africa, Asia and Oceania.', 'L’Atlàntic separa Europa d’Amèrica; l’Índic banya Àfrica, Àsia i Oceania.') },
    { e: T('Ordena los océanos de mayor a menor.', 'Order the oceans from largest to smallest.', 'Ordena els oceans de més gran a més petit.'), s: T('Pacífico, Atlántico, Índico, Antártico y Ártico.', 'Pacific, Atlantic, Indian, Southern and Arctic.', 'Pacífic, Atlàntic, Índic, Antàrtic i Àrtic.') },
    { e: T('¿Qué continente no tiene población permanente y por qué?', 'Which continent has no permanent population, and why?', 'Quin continent no té població permanent i per què?'), s: T('La Antártida: está casi toda cubierta de hielo y es el lugar más frío de la Tierra. Solo hay científicos en bases temporales.', 'Antarctica: it is almost entirely covered in ice and is the coldest place on Earth. Only scientists live there, in temporary bases.', 'L’Antàrtida: està gairebé tota coberta de gel i és el lloc més fred de la Terra. Només hi ha científics en bases temporals.') },
    { e: T('¿El Mediterráneo es un océano? ¿Qué aguas bañan las costas de España?', 'Is the Mediterranean an ocean? Which waters wash the coasts of Spain?', 'La Mediterrània és un oceà? Quines aigües banyen les costes d’Espanya?'), s: T('No, es un mar. España tiene costa en el mar Mediterráneo y en el océano Atlántico (incluido el mar Cantábrico, que forma parte de él).', 'No, it is a sea. Spain has coasts on the Mediterranean Sea and the Atlantic Ocean (including the Cantabrian Sea, which is part of it).', 'No, és un mar. Espanya té costa al mar Mediterrani i a l’oceà Atlàntic (inclòs el mar Cantàbric, que en forma part).') },
  ],
}

export const ESTUDIO_EXTRA = {
  'generos-literarios': generosLiterarios,
  'figuras-literarias': figurasLiterarias,
  'continentes-y-oceanos': continentesOceanos,
}
