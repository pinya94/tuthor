// Música: Ritmo — figuras, silencios y compases
//
// Rellena el hueco que ya estaba marcado en MusicaIndex como `ready: false`
// ("Compases, figuras y silencios"). Con esto música pasa de un examen a dos.
//
// Todas las duraciones se dan en compás de 4/4, donde la negra vale un
// tiempo: es la referencia que se usa siempre en clase y sin ella las figuras
// no tienen un valor fijo del que hablar.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  q('rit-01', 'primaria',
    { es: '¿Qué es una figura musical?', en: 'What is a note value?', ca: 'Què és una figura musical?' },
    { es: ['Un signo que indica cuánto dura un sonido', 'Un signo que indica qué nota es', 'El dibujo de un instrumento', 'La letra de una canción'], en: ['A sign showing how long a sound lasts', 'A sign showing which note it is', 'A drawing of an instrument', 'The lyrics of a song'], ca: ['Un signe que indica quant dura un so', 'Un signe que indica quina nota és', 'El dibuix d\'un instrument', 'La lletra d\'una cançó'] },
    { es: 'Un signo que indica cuánto dura un sonido', en: 'A sign showing how long a sound lasts', ca: 'Un signe que indica quant dura un so' },
    '🎵',
    { es: 'La figura dice la DURACIÓN; la altura —si es do, re o mi— la dice la posición en el pentagrama. Son dos informaciones distintas en el mismo símbolo, y por eso una negra puede ser cualquier nota.', en: 'The note value gives the DURATION; the pitch — whether it is C, D or E — comes from its position on the staff. Two different pieces of information in one symbol, which is why a crotchet can be any note.', ca: 'La figura diu la DURADA; l\'altura la diu la posició al pentagrama. Per això una negra pot ser qualsevol nota.' }),

  q('rit-02', 'primaria',
    { es: 'En un compás de 4/4, ¿cuántos tiempos dura una redonda?', en: 'In 4/4 time, how many beats does a semibreve last?', ca: 'En un compàs de 4/4, quants temps dura una rodona?' },
    { es: ['4 tiempos', '2 tiempos', '1 tiempo', '8 tiempos'], en: ['4 beats', '2 beats', '1 beat', '8 beats'], ca: ['4 temps', '2 temps', '1 temps', '8 temps'] },
    { es: '4 tiempos', en: '4 beats', ca: '4 temps' },
    '⚪',
    { es: 'Es la figura más larga de las que se usan normalmente y ocupa ella sola un compás entero de 4/4. Se dibuja como un círculo hueco sin plica, y todas las demás salen de ir partiéndola por la mitad.', en: 'It is the longest value in common use and fills a whole 4/4 bar by itself. It is drawn as a hollow circle with no stem, and every other value comes from halving it.', ca: 'És la figura més llarga d\'ús normal i ocupa ella sola un compàs sencer de 4/4.' }),

  q('rit-03', 'primaria',
    { es: 'En 4/4, ¿cuántos tiempos dura una blanca?', en: 'In 4/4, how many beats does a minim last?', ca: 'En 4/4, quants temps dura una blanca?' },
    { es: ['2 tiempos', '4 tiempos', '1 tiempo', 'Medio tiempo'], en: ['2 beats', '4 beats', '1 beat', 'Half a beat'], ca: ['2 temps', '4 temps', '1 temps', 'Mig temps'] },
    { es: '2 tiempos', en: '2 beats', ca: '2 temps' },
    '🎶',
    { es: 'Es la mitad de una redonda: caben dos blancas en un compás de 4/4. Se dibuja como la redonda pero con plica, el palito vertical.', en: 'It is half a semibreve: two minims fit in a 4/4 bar. It is drawn like the semibreve but with a stem, the vertical line.', ca: 'És la meitat d\'una rodona: hi caben dues blanques en un compàs de 4/4.' }),

  q('rit-04', 'primaria',
    { es: 'En 4/4, ¿cuántos tiempos dura una negra?', en: 'In 4/4, how many beats does a crotchet last?', ca: 'En 4/4, quants temps dura una negra?' },
    { es: ['1 tiempo', '2 tiempos', 'Medio tiempo', '4 tiempos'], en: ['1 beat', '2 beats', 'Half a beat', '4 beats'], ca: ['1 temps', '2 temps', 'Mig temps', '4 temps'] },
    { es: '1 tiempo', en: '1 beat', ca: '1 temps' },
    '⚫',
    { es: 'Es la figura de referencia: cuando llevas el pulso de una canción con el pie, normalmente estás marcando negras. Se dibuja con la cabeza rellena y plica.', en: 'It is the reference value: when you tap your foot to a song you are usually marking crotchets. It is drawn with a filled head and a stem.', ca: 'És la figura de referència: quan portes el pols amb el peu, normalment marques negres.' }),

  q('rit-05', 'primaria',
    { es: '¿Cuántas corcheas caben en una negra?', en: 'How many quavers fit in a crotchet?', ca: 'Quantes corxeres caben en una negra?' },
    { es: ['2', '4', '1', '8'], en: ['2', '4', '1', '8'], ca: ['2', '4', '1', '8'] },
    { es: '2', en: '2', ca: '2' },
    '🎼',
    { es: 'Cada figura vale la mitad que la anterior: redonda, blanca, negra, corchea, semicorchea. Por eso en una negra caben 2 corcheas y 4 semicorcheas, sin necesidad de memorizar cada caso.', en: 'Each value is half the previous one: semibreve, minim, crotchet, quaver, semiquaver. So a crotchet holds 2 quavers and 4 semiquavers, with no need to memorise each case.', ca: 'Cada figura val la meitat que l\'anterior. Per això en una negra hi caben 2 corxeres i 4 semicorxeres.' }),

  q('rit-06', 'primaria',
    { es: '¿Qué es un silencio en música?', en: 'What is a rest in music?', ca: 'Què és un silenci en música?' },
    { es: ['Un signo que indica una pausa con una duración concreta', 'El final de la canción', 'Una nota muy baja', 'Un error de escritura'], en: ['A sign showing a pause of a specific length', 'The end of the song', 'A very low note', 'A writing error'], ca: ['Un signe que indica una pausa amb una durada concreta', 'El final de la cançó', 'Una nota molt baixa', 'Un error d\'escriptura'] },
    { es: 'Un signo que indica una pausa con una duración concreta', en: 'A sign showing a pause of a specific length', ca: 'Un signe que indica una pausa amb una durada concreta' },
    '🤫',
    { es: 'Cada figura tiene su silencio equivalente: hay silencio de redonda, de blanca, de negra. Callar también se mide, y por eso el silencio ocupa su sitio exacto en el compás igual que una nota.', en: 'Every note value has its matching rest: semibreve rest, minim rest, crotchet rest. Silence is measured too, so a rest takes its exact place in the bar just like a note.', ca: 'Cada figura té el seu silenci equivalent. Callar també es mesura.' }),

  q('rit-07', 'primaria',
    { es: '¿Qué es el compás en una partitura?', en: 'What is a bar in a score?', ca: 'Què és el compàs en una partitura?' },
    { es: ['Cada trozo en que se divide la música, separado por líneas verticales', 'La velocidad de la canción', 'El nombre de la nota más grave', 'El instrumento que marca el ritmo'], en: ['Each chunk the music is divided into, separated by vertical lines', 'The speed of the song', 'The name of the lowest note', 'The instrument keeping time'], ca: ['Cada tros en què es divideix la música, separat per línies verticals', 'La velocitat de la cançó', 'El nom de la nota més greu', 'L\'instrument que marca el ritme'] },
    { es: 'Cada trozo en que se divide la música, separado por líneas verticales', en: 'Each chunk the music is divided into, separated by vertical lines', ca: 'Cada tros en què es divideix la música, separat per línies verticals' },
    '📏',
    { es: 'Esas líneas se llaman barras de compás. Todos los compases de una pieza tienen la misma duración, y eso es justo lo que hace que la música se pueda seguir y contar.', en: 'Those lines are called bar lines. Every bar in a piece lasts the same, and that is exactly what makes music followable and countable.', ca: 'Aquestes línies s\'anomenen barres de compàs. Tots els compassos d\'una peça duren el mateix.' }),

  q('rit-08', 'primaria',
    { es: 'En el compás 4/4, ¿qué significa el número de arriba?', en: 'In 4/4 time, what does the top number mean?', ca: 'En el compàs 4/4, què significa el nombre de dalt?' },
    { es: ['Cuántos tiempos hay en cada compás', 'Qué figura vale un tiempo', 'La velocidad de la pieza', 'Cuántos compases tiene la canción'], en: ['How many beats are in each bar', 'Which value gets one beat', 'The speed of the piece', 'How many bars the song has'], ca: ['Quants temps hi ha a cada compàs', 'Quina figura val un temps', 'La velocitat de la peça', 'Quants compassos té la cançó'] },
    { es: 'Cuántos tiempos hay en cada compás', en: 'How many beats are in each bar', ca: 'Quants temps hi ha a cada compàs' },
    '4️⃣',
    { es: 'Y el de abajo dice qué figura ocupa un tiempo: el 4 significa negra. Así que 4/4 es "cuatro negras por compás", y 3/4 es "tres negras por compás", el compás del vals.', en: 'And the bottom number says which value takes one beat: 4 means crotchet. So 4/4 is "four crotchets per bar", and 3/4 is "three crotchets per bar", the waltz time.', ca: 'I el de baix diu quina figura ocupa un temps: el 4 significa negra. Així 3/4 és el compàs del vals.' }),

  q('rit-09', 'primaria',
    { es: '¿Cuál es el compás típico de un vals?', en: 'What is the typical time signature of a waltz?', ca: 'Quin és el compàs típic d\'un vals?' },
    { es: ['3/4', '4/4', '2/4', '6/8'], en: ['3/4', '4/4', '2/4', '6/8'], ca: ['3/4', '4/4', '2/4', '6/8'] },
    { es: '3/4', en: '3/4', ca: '3/4' },
    '💃',
    { es: 'Tres tiempos por compás, con el primero más fuerte: ese "UN-dos-tres" es lo que hace que se baile girando. El 4/4 en cambio es el compás de casi toda la música pop y rock.', en: 'Three beats per bar with the first one strongest: that "ONE-two-three" is what makes you turn as you dance. 4/4, by contrast, is the time of nearly all pop and rock.', ca: 'Tres temps per compàs, amb el primer més fort: aquest "UN-dos-tres" és el que fa que es balli girant.' }),

  q('rit-10', 'primaria',
    { es: '¿Qué es el pulso en música?', en: 'What is the beat in music?', ca: 'Què és el pols en música?' },
    { es: ['El latido regular que se marca con el pie al escuchar', 'La nota más aguda', 'El final de cada compás', 'El volumen de la música'], en: ['The regular pulse you tap your foot to', 'The highest note', 'The end of each bar', 'The volume of the music'], ca: ['El batec regular que es marca amb el peu en escoltar', 'La nota més aguda', 'El final de cada compàs', 'El volum de la música'] },
    { es: 'El latido regular que se marca con el pie al escuchar', en: 'The regular pulse you tap your foot to', ca: 'El batec regular que es marca amb el peu en escoltar' },
    '👣',
    { es: 'Es constante, como el tictac de un reloj, y no depende de las notas que suenen encima. El ritmo son las figuras concretas; el pulso es la rejilla invisible sobre la que se colocan.', en: 'It is constant, like a clock ticking, and does not depend on the notes above it. Rhythm is the actual note values; the beat is the invisible grid they sit on.', ca: 'És constant, com el tic-tac d\'un rellotge. El ritme són les figures; el pols és la graella invisible.' }),

  q('rit-11', 'primaria',
    { es: '¿Qué hace un puntillo detrás de una nota?', en: 'What does a dot after a note do?', ca: 'Què fa un puntet darrere d\'una nota?' },
    { es: ['Alarga la nota la mitad de su valor', 'La acorta a la mitad', 'La repite dos veces', 'La hace más fuerte'], en: ['It lengthens the note by half its value', 'It halves it', 'It repeats it twice', 'It makes it louder'], ca: ['Allarga la nota la meitat del seu valor', 'L\'escurça a la meitat', 'La repeteix dues vegades', 'La fa més forta'] },
    { es: 'Alarga la nota la mitad de su valor', en: 'It lengthens the note by half its value', ca: 'Allarga la nota la meitat del seu valor' },
    '⏺️',
    { es: 'Una blanca vale 2 tiempos, así que una blanca con puntillo vale 3: los 2 suyos más 1, que es la mitad. Una negra con puntillo vale 1 tiempo y medio.', en: 'A minim is 2 beats, so a dotted minim is 3: its own 2 plus 1, which is half. A dotted crotchet is one and a half beats.', ca: 'Una blanca val 2 temps, així que una blanca amb puntet val 3. Una negra amb puntet val un temps i mig.' }),

  q('rit-12', 'primaria',
    { es: '¿Para qué sirve la ligadura entre dos notas iguales?', en: 'What is a tie between two identical notes for?', ca: 'Per a què serveix la lligadura entre dues notes iguals?' },
    { es: ['Para sumar sus duraciones y tocarlas como una sola nota larga', 'Para tocarlas dos veces seguidas', 'Para bajarlas de tono', 'Para acortarlas'], en: ['To add their durations and play them as one long note', 'To play them twice in a row', 'To lower their pitch', 'To shorten them'], ca: ['Per sumar les seves durades i tocar-les com una sola nota llarga', 'Per tocar-les dues vegades seguides', 'Per abaixar-les de to', 'Per escurçar-les'] },
    { es: 'Para sumar sus duraciones y tocarlas como una sola nota larga', en: 'To add their durations and play them as one long note', ca: 'Per sumar les seves durades i tocar-les com una sola nota llarga' },
    '🔗',
    { es: 'Es la forma de escribir una nota que se prolonga de un compás al siguiente, porque una nota no puede cruzar la barra de compás. Dos negras ligadas suenan como una blanca.', en: 'It is how you write a note that carries over into the next bar, since a note cannot cross a bar line. Two tied crotchets sound like one minim.', ca: 'És la manera d\'escriure una nota que es prolonga d\'un compàs al següent. Dues negres lligades sonen com una blanca.' }),

  q('rit-13', 'primaria',
    { es: 'En un compás de 4/4, ¿cuántas negras caben?', en: 'How many crotchets fit in a 4/4 bar?', ca: 'En un compàs de 4/4, quantes negres hi caben?' },
    { es: ['4', '2', '8', '16'], en: ['4', '2', '8', '16'], ca: ['4', '2', '8', '16'] },
    { es: '4', en: '4', ca: '4' },
    '🥁',
    { es: 'Lo dice el propio compás: cuatro tiempos, y la negra vale uno. También cabrían dos blancas, una redonda, u ocho corcheas: lo que importa es que la suma dé exactamente cuatro tiempos.', en: 'The time signature says it: four beats, and a crotchet is one. Two minims, one semibreve or eight quavers would also fit: what matters is that the total is exactly four beats.', ca: 'Ho diu el mateix compàs: quatre temps, i la negra en val un.' }),

  q('rit-14', 'primaria',
    { es: '¿Qué indica el tempo de una pieza?', en: 'What does the tempo of a piece indicate?', ca: 'Què indica el tempo d\'una peça?' },
    { es: ['La velocidad a la que se toca', 'El número de compases', 'Qué instrumento la toca', 'Si es alegre o triste'], en: ['The speed at which it is played', 'The number of bars', 'Which instrument plays it', 'Whether it is happy or sad'], ca: ['La velocitat a què es toca', 'El nombre de compassos', 'Quin instrument la toca', 'Si és alegre o trista'] },
    { es: 'La velocidad a la que se toca', en: 'The speed at which it is played', ca: 'La velocitat a què es toca' },
    '⏱️',
    { es: 'Se escribe con palabras italianas: largo es muy lento, andante es a paso de marcha, allegro es rápido y presto muy rápido. Hoy se añade además una cifra de pulsos por minuto.', en: 'It is written with Italian words: largo very slow, andante at a walking pace, allegro fast and presto very fast. Today a beats-per-minute figure is added too.', ca: 'S\'escriu amb paraules italianes: largo molt lent, andante a pas de marxa, allegro ràpid.' }),

  q('rit-15', 'primaria',
    { es: '¿Qué significa "allegro"?', en: 'What does "allegro" mean?', ca: 'Què significa "allegro"?' },
    { es: ['Rápido y animado', 'Muy lento', 'A media voz', 'Fuerte'], en: ['Fast and lively', 'Very slow', 'Half voice', 'Loud'], ca: ['Ràpid i animat', 'Molt lent', 'A mitja veu', 'Fort'] },
    { es: 'Rápido y animado', en: 'Fast and lively', ca: 'Ràpid i animat' },
    '🏃',
    { es: 'Los términos de tempo van en italiano porque fue en Italia donde se fijó la notación moderna, en los siglos XVII y XVIII. Por eso una partitura se lee igual en cualquier país.', en: 'Tempo terms are in Italian because modern notation was fixed in Italy in the 17th and 18th centuries. That is why a score reads the same in any country.', ca: 'Els termes de tempo van en italià perquè va ser a Itàlia on es va fixar la notació moderna.' }),

  q('rit-16', 'primaria',
    { es: '¿Qué es un silencio de negra?', en: 'What is a crotchet rest?', ca: 'Què és un silenci de negra?' },
    { es: ['Una pausa que dura un tiempo, lo mismo que una negra', 'Una nota muy corta', 'El final del compás', 'Una pausa de cuatro tiempos'], en: ['A pause lasting one beat, the same as a crotchet', 'A very short note', 'The end of the bar', 'A four-beat pause'], ca: ['Una pausa que dura un temps, el mateix que una negra', 'Una nota molt curta', 'El final del compàs', 'Una pausa de quatre temps'] },
    { es: 'Una pausa que dura un tiempo, lo mismo que una negra', en: 'A pause lasting one beat, the same as a crotchet', ca: 'Una pausa que dura un temps, el mateix que una negra' },
    '🔇',
    { es: 'Cada silencio dura exactamente lo mismo que su figura. Al contar un compás hay que sumar notas y silencios juntos: si el total no cuadra con el compás, algo está mal escrito.', en: 'Each rest lasts exactly as long as its note value. When counting a bar you add notes and rests together: if the total does not match the time signature, something is miswritten.', ca: 'Cada silenci dura exactament el mateix que la seva figura. En comptar un compàs cal sumar notes i silencis.' }),

  q('rit-17', 'primaria',
    { es: '¿Cuántas semicorcheas caben en una negra?', en: 'How many semiquavers fit in a crotchet?', ca: 'Quantes semicorxeres caben en una negra?' },
    { es: ['4', '2', '8', '16'], en: ['4', '2', '8', '16'], ca: ['4', '2', '8', '16'] },
    { es: '4', en: '4', ca: '4' },
    '🎶',
    { es: 'La semicorchea es la mitad de la corchea, y la corchea la mitad de la negra: 2 × 2 = 4. Se distinguen por los corchetes de la plica: la corchea lleva uno y la semicorchea dos.', en: 'A semiquaver is half a quaver, and a quaver half a crotchet: 2 × 2 = 4. They are told apart by the flags on the stem: a quaver has one, a semiquaver two.', ca: 'La semicorxera és la meitat de la corxera, i la corxera la meitat de la negra: 2 × 2 = 4.' }),

  q('rit-18', 'primaria',
    { es: '¿Dónde está el tiempo más fuerte de un compás?', en: 'Where is the strongest beat of a bar?', ca: 'On és el temps més fort d\'un compàs?' },
    { es: ['En el primero', 'En el último', 'En el del medio', 'Todos suenan igual de fuertes'], en: ['On the first', 'On the last', 'In the middle', 'They are all equally strong'], ca: ['Al primer', 'A l\'últim', 'Al del mig', 'Tots sonen igual de forts'] },
    { es: 'En el primero', en: 'On the first', ca: 'Al primer' },
    '💥',
    { es: 'Ese acento natural en el primer tiempo es lo que permite reconocer dónde empieza cada compás solo escuchando, sin ver la partitura. Es también lo que distingue un vals de una marcha.', en: 'That natural accent on the first beat lets you hear where each bar starts without seeing the score. It is also what tells a waltz from a march.', ca: 'Aquest accent natural al primer temps permet reconèixer on comença cada compàs només escoltant.' }),

  q('rit-19', 'primaria',
    { es: 'Si en un compás de 4/4 hay una blanca, ¿cuántos tiempos quedan libres?', en: 'If a 4/4 bar contains a minim, how many beats are left?', ca: 'Si en un compàs de 4/4 hi ha una blanca, quants temps queden lliures?' },
    { es: ['2', '1', '3', 'Ninguno'], en: ['2', '1', '3', 'None'], ca: ['2', '1', '3', 'Cap'] },
    { es: '2', en: '2', ca: '2' },
    '➖',
    { es: '4 − 2 = 2. Esos dos tiempos hay que rellenarlos con lo que sea: dos negras, cuatro corcheas, un silencio de blanca… pero el compás tiene que cuadrar exactamente.', en: '4 − 2 = 2. Those two beats must be filled with something: two crotchets, four quavers, a minim rest… but the bar has to add up exactly.', ca: '4 − 2 = 2. Aquests dos temps s\'han d\'omplir amb el que sigui, però el compàs ha de quadrar.' }),

  q('rit-20', 'primaria',
    { es: '¿Qué es la doble barra final en una partitura?', en: 'What is the final double bar line in a score?', ca: 'Què és la doble barra final en una partitura?' },
    { es: ['La línea doble que marca el final de la obra', 'Una repetición', 'Un cambio de compás', 'Un silencio muy largo'], en: ['The double line marking the end of the piece', 'A repeat', 'A change of time signature', 'A very long rest'], ca: ['La línia doble que marca el final de l\'obra', 'Una repetició', 'Un canvi de compàs', 'Un silenci molt llarg'] },
    { es: 'La línea doble que marca el final de la obra', en: 'The double line marking the end of the piece', ca: 'La línia doble que marca el final de l\'obra' },
    '🏁',
    { es: 'La segunda línea es más gruesa. No hay que confundirla con la barra de repetición, que lleva dos puntos y manda volver atrás para tocar otra vez un trozo.', en: 'The second line is thicker. Do not confuse it with the repeat sign, which has two dots and sends you back to play a section again.', ca: 'La segona línia és més gruixuda. No s\'ha de confondre amb la barra de repetició, que porta dos punts.' }),

  q('rit-21', 'primaria',
    { es: '¿Qué es el ritmo de una canción?', en: 'What is the rhythm of a song?', ca: 'Què és el ritme d\'una cançó?' },
    { es: ['La combinación de duraciones de las notas y los silencios', 'La velocidad a la que va', 'Lo alta o baja que suena', 'El instrumento que la toca'], en: ['The combination of note and rest durations', 'The speed it goes at', 'How high or low it sounds', 'The instrument playing it'], ca: ['La combinació de durades de les notes i els silencis', 'La velocitat a què va', 'Com d\'alt o baix sona', 'L\'instrument que la toca'] },
    { es: 'La combinación de duraciones de las notas y los silencios', en: 'The combination of note and rest durations', ca: 'La combinació de durades de les notes i els silencis' },
    '🎵',
    { es: 'Por eso una canción se reconoce dando palmas, sin cantar ni una nota: el ritmo va por su cuenta y ya identifica la pieza. Melodía y ritmo son dos cosas separadas.', en: 'That is why you can recognise a song by clapping, without singing a single note: rhythm stands on its own and already identifies the piece. Melody and rhythm are two separate things.', ca: 'Per això una cançó es reconeix picant de mans, sense cantar cap nota.' }),

  q('rit-22', 'primaria',
    { es: '¿Cuánto dura un silencio de redonda?', en: 'How long is a semibreve rest?', ca: 'Quant dura un silenci de rodona?' },
    { es: ['4 tiempos, o el compás entero', '1 tiempo', '2 tiempos', 'Medio tiempo'], en: ['4 beats, or the whole bar', '1 beat', '2 beats', 'Half a beat'], ca: ['4 temps, o el compàs sencer', '1 temps', '2 temps', 'Mig temps'] },
    { es: '4 tiempos, o el compás entero', en: '4 beats, or the whole bar', ca: '4 temps, o el compàs sencer' },
    '🔇',
    { es: 'Se dibuja como un rectangulito colgado de la cuarta línea del pentagrama. Por convenio se usa para indicar un compás entero en silencio, sea cual sea el compás.', en: 'It is drawn as a small rectangle hanging from the fourth line of the staff. By convention it marks a whole bar of silence, whatever the time signature.', ca: 'Es dibuixa com un rectangle penjat de la quarta línia. Per conveni indica un compàs sencer en silenci.' }),

  q('rit-23', 'primaria',
    { es: '¿Qué instrumento de la orquesta se encarga sobre todo del ritmo?', en: 'Which orchestral section is mainly in charge of rhythm?', ca: 'Quin instrument de l\'orquestra s\'encarrega sobretot del ritme?' },
    { es: ['La percusión', 'El violín', 'La flauta', 'El arpa'], en: ['Percussion', 'The violin', 'The flute', 'The harp'], ca: ['La percussió', 'El violí', 'La flauta', 'L\'arpa'] },
    { es: 'La percusión', en: 'Percussion', ca: 'La percussió' },
    '🥁',
    { es: 'Se toca golpeando o sacudiendo: timbales, caja, platillos, triángulo. Algunos, como los timbales, sí dan notas afinadas; otros, como la caja, solo marcan el ritmo sin altura definida.', en: 'It is played by striking or shaking: timpani, snare drum, cymbals, triangle. Some, like the timpani, do give tuned pitches; others, like the snare, only mark rhythm with no definite pitch.', ca: 'Es toca colpejant o sacsejant. Alguns, com els timbals, sí que donen notes afinades.' }),

  q('rit-24', 'primaria',
    { es: 'Cuando se escribe 2/4, ¿cuántos tiempos tiene cada compás?', en: 'When 2/4 is written, how many beats are in each bar?', ca: 'Quan s\'escriu 2/4, quants temps té cada compàs?' },
    { es: ['2', '4', '8', '6'], en: ['2', '4', '8', '6'], ca: ['2', '4', '8', '6'] },
    { es: '2', en: '2', ca: '2' },
    '2️⃣',
    { es: 'Dos negras por compás, con acento en la primera: es el compás de las marchas y de los pasodobles, porque encaja con el paso de los dos pies al andar.', en: 'Two crotchets per bar with the accent on the first: it is the time of marches and pasodobles, because it matches the two-footed walking step.', ca: 'Dues negres per compàs, amb accent a la primera: és el compàs de les marxes i els pasdobles.' }),

  q('rit-25', 'primaria',
    { es: '¿Qué diferencia hay entre pulso y tempo?', en: 'What is the difference between beat and tempo?', ca: 'Quina diferència hi ha entre pols i tempo?' },
    { es: ['El pulso es el latido regular; el tempo es lo rápido o lento que va ese latido', 'Son exactamente lo mismo', 'El pulso es el volumen y el tempo la altura', 'El tempo solo existe en la percusión'], en: ['The beat is the regular pulse; the tempo is how fast or slow that pulse goes', 'They are exactly the same', 'Beat is volume and tempo is pitch', 'Tempo only exists in percussion'], ca: ['El pols és el batec regular; el tempo és com de ràpid o lent va aquest batec', 'Són exactament el mateix', 'El pols és el volum i el tempo l\'altura', 'El tempo només existeix a la percussió'] },
    { es: 'El pulso es el latido regular; el tempo es lo rápido o lento que va ese latido', en: 'The beat is the regular pulse; the tempo is how fast or slow that pulse goes', ca: 'El pols és el batec regular; el tempo és com de ràpid o lent va aquest batec' },
    '⏱️',
    { es: 'La misma canción se puede tocar despacio o deprisa —cambia el tempo— y el pulso sigue existiendo igual, solo que más separado o más junto. Uno es qué se cuenta y el otro a qué velocidad.', en: 'The same song can be played slow or fast — the tempo changes — and the beat still exists, just further apart or closer. One is what you count, the other how fast.', ca: 'La mateixa cançó es pot tocar a poc a poc o de pressa: canvia el tempo i el pols continua existint.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('rit-30', 'eso',
    { es: 'En el compás 6/8, ¿qué indica el número de abajo?', en: 'In 6/8 time, what does the bottom number indicate?', ca: 'En el compàs 6/8, què indica el nombre de baix?' },
    { es: ['Que la figura que vale un tiempo es la corchea', 'Que hay ocho compases', 'Que la pieza va muy rápida', 'Que se toca con ocho instrumentos'], en: ['That the value getting one beat is the quaver', 'That there are eight bars', 'That the piece is very fast', 'That it is played by eight instruments'], ca: ['Que la figura que val un temps és la corxera', 'Que hi ha vuit compassos', 'Que la peça va molt ràpida', 'Que es toca amb vuit instruments'] },
    { es: 'Que la figura que vale un tiempo es la corchea', en: 'That the value getting one beat is the quaver', ca: 'Que la figura que val un temps és la corxera' },
    '8️⃣',
    { es: 'El número de abajo es un código: 2 es blanca, 4 es negra, 8 es corchea, 16 es semicorchea. Sale de la fracción — la corchea es 1/8 de redonda — y por eso los denominadores son siempre potencias de dos.', en: 'The bottom number is a code: 2 is minim, 4 crotchet, 8 quaver, 16 semiquaver. It comes from the fraction — a quaver is 1/8 of a semibreve — which is why denominators are always powers of two.', ca: 'El nombre de baix és un codi: 2 és blanca, 4 negra, 8 corxera. Surt de la fracció.' }),

  q('rit-31', 'eso',
    { es: '¿Qué diferencia hay entre un compás simple y uno compuesto?', en: 'What is the difference between simple and compound time?', ca: 'Quina diferència hi ha entre un compàs simple i un de compost?' },
    { es: ['En el simple cada tiempo se divide en dos partes; en el compuesto, en tres', 'El compuesto tiene más compases', 'El simple es siempre más rápido', 'El compuesto solo se usa en percusión'], en: ['In simple time each beat splits in two; in compound time, in three', 'Compound time has more bars', 'Simple time is always faster', 'Compound time is only used in percussion'], ca: ['Al simple cada temps es divideix en dues parts; al compost, en tres', 'El compost té més compassos', 'El simple és sempre més ràpid', 'El compost només es fa servir a la percussió'] },
    { es: 'En el simple cada tiempo se divide en dos partes; en el compuesto, en tres', en: 'In simple time each beat splits in two; in compound time, in three', ca: 'Al simple cada temps es divideix en dues parts; al compost, en tres' },
    '🔢',
    { es: 'En 4/4 cada negra se parte en dos corcheas; en 6/8 el pulso real son dos grupos de tres corcheas. Por eso 6/8 no se siente como seis golpes sino como dos, y suena a balanceo.', en: 'In 4/4 each crotchet splits into two quavers; in 6/8 the real pulse is two groups of three quavers. That is why 6/8 does not feel like six hits but two, with a swaying feel.', ca: 'En 4/4 cada negra es parteix en dues corxeres; en 6/8 el pols real són dos grups de tres corxeres.' }),

  q('rit-32', 'eso',
    { es: '¿Qué es una síncopa?', en: 'What is syncopation?', ca: 'Què és una síncope?' },
    { es: ['Una nota que empieza en parte débil y se prolonga sobre la fuerte', 'Una nota muy corta', 'Un silencio al final del compás', 'Un cambio de tempo'], en: ['A note starting on a weak part and carrying over the strong one', 'A very short note', 'A rest at the end of the bar', 'A change of tempo'], ca: ['Una nota que comença en part feble i es prolonga sobre la forta', 'Una nota molt curta', 'Un silenci al final del compàs', 'Un canvi de tempo'] },
    { es: 'Una nota que empieza en parte débil y se prolonga sobre la fuerte', en: 'A note starting on a weak part and carrying over the strong one', ca: 'Una nota que comença en part feble i es prolonga sobre la forta' },
    '🎷',
    { es: 'Desplaza el acento a donde no lo esperas, y eso es lo que hace que la música "enganche". Es la base rítmica del jazz, del funk y de buena parte de la música latina.', en: 'It shifts the accent to where you do not expect it, and that is what makes music feel catchy. It is the rhythmic basis of jazz, funk and much Latin music.', ca: 'Desplaça l\'accent on no l\'esperes. És la base rítmica del jazz, el funk i bona part de la música llatina.' }),

  q('rit-33', 'eso',
    { es: '¿Qué es la anacrusa?', en: 'What is an anacrusis?', ca: 'Què és l\'anacrusi?' },
    { es: ['Una o varias notas antes del primer compás completo, en parte débil', 'El último compás de la pieza', 'Un silencio inicial obligatorio', 'Un cambio de compás'], en: ['One or more notes before the first complete bar, on a weak beat', 'The last bar of the piece', 'A compulsory opening rest', 'A change of time signature'], ca: ['Una o diverses notes abans del primer compàs complet, en part feble', 'L\'últim compàs de la peça', 'Un silenci inicial obligatori', 'Un canvi de compàs'] },
    { es: 'Una o varias notas antes del primer compás completo, en parte débil', en: 'One or more notes before the first complete bar, on a weak beat', ca: 'Una o diverses notes abans del primer compàs complet, en part feble' },
    '➡️',
    { es: 'Es el "arranque" de muchas canciones: el "cumple-" de "Cumpleaños feliz" cae antes del primer tiempo fuerte. El compás inicial queda incompleto y esos tiempos se recuperan en el último.', en: 'It is the pick-up of many songs: the "hap-" of "Happy Birthday" falls before the first strong beat. The opening bar is incomplete and those beats are recovered in the last one.', ca: 'És l\'arrencada de moltes cançons. El compàs inicial queda incomplet i aquests temps es recuperen a l\'últim.' }),

  q('rit-34', 'eso',
    { es: '¿Cuánto dura una negra con puntillo en un compás de 4/4?', en: 'How long is a dotted crotchet in 4/4?', ca: 'Quant dura una negra amb puntet en un compàs de 4/4?' },
    { es: ['Un tiempo y medio', 'Dos tiempos', 'Medio tiempo', 'Tres tiempos'], en: ['One and a half beats', 'Two beats', 'Half a beat', 'Three beats'], ca: ['Un temps i mig', 'Dos temps', 'Mig temps', 'Tres temps'] },
    { es: 'Un tiempo y medio', en: 'One and a half beats', ca: 'Un temps i mig' },
    '⏺️',
    { es: 'La negra vale 1 y el puntillo añade la mitad, 0,5: total 1,5. Por eso una negra con puntillo suele ir seguida de una corchea, que aporta el medio tiempo que falta para completar dos.', en: 'The crotchet is 1 and the dot adds half, 0.5: total 1.5. That is why a dotted crotchet is usually followed by a quaver, supplying the half beat needed to complete two.', ca: 'La negra val 1 i el puntet hi afegeix la meitat, 0,5: total 1,5.' }),

  q('rit-35', 'eso',
    { es: '¿Qué es un tresillo?', en: 'What is a triplet?', ca: 'Què és un treset?' },
    { es: ['Tres notas tocadas en el tiempo que normalmente ocuparían dos', 'Tres compases seguidos iguales', 'Un acorde de tres notas', 'Tres silencios seguidos'], en: ['Three notes played in the time normally taken by two', 'Three identical bars in a row', 'A three-note chord', 'Three rests in a row'], ca: ['Tres notes tocades en el temps que normalment ocuparien dues', 'Tres compassos seguits iguals', 'Un acord de tres notes', 'Tres silencis seguits'] },
    { es: 'Tres notas tocadas en el tiempo que normalmente ocuparían dos', en: 'Three notes played in the time normally taken by two', ca: 'Tres notes tocades en el temps que normalment ocuparien dues' },
    '3️⃣',
    { es: 'Se marca con un 3 encima del grupo. Sirve para meter una división ternaria dentro de un compás simple, que de otro modo solo permite dividir entre dos.', en: 'It is marked with a 3 above the group. It lets you fit a three-way division inside simple time, which otherwise only divides in two.', ca: 'Es marca amb un 3 damunt del grup. Serveix per ficar una divisió ternària dins d\'un compàs simple.' }),

  q('rit-36', 'eso',
    { es: '¿Qué significa el calderón sobre una nota?', en: 'What does a fermata over a note mean?', ca: 'Què significa el calderó sobre una nota?' },
    { es: ['Que se alarga más de su duración, a criterio del intérprete', 'Que se toca más fuerte', 'Que se repite', 'Que se calla'], en: ['That it is held longer than its value, at the performer\'s discretion', 'That it is played louder', 'That it is repeated', 'That it is silenced'], ca: ['Que s\'allarga més de la seva durada, a criteri de l\'intèrpret', 'Que es toca més fort', 'Que es repeteix', 'Que es calla'] },
    { es: 'Que se alarga más de su duración, a criterio del intérprete', en: 'That it is held longer than its value, at the performer\'s discretion', ca: 'Que s\'allarga més de la seva durada, a criteri de l\'intèrpret' },
    '🌙',
    { es: 'Es un semicírculo con un punto dentro. Rompe a propósito la regularidad del compás y suele aparecer al final de una frase o de la obra, donde el tiempo se estira para cerrar.', en: 'It is a semicircle with a dot inside. It deliberately breaks the regularity of the bar and usually appears at the end of a phrase or the piece, where time stretches to close.', ca: 'És un semicercle amb un punt a dins. Trenca a propòsit la regularitat del compàs.' }),

  q('rit-37', 'eso',
    { es: 'Un compás de 3/4 lleva una blanca. ¿Qué falta para completarlo?', en: 'A 3/4 bar has a minim. What is missing to complete it?', ca: 'Un compàs de 3/4 porta una blanca. Què falta per completar-lo?' },
    { es: ['Una negra o un silencio de negra', 'Otra blanca', 'Una redonda', 'Nada, ya está completo'], en: ['A crotchet or a crotchet rest', 'Another minim', 'A semibreve', 'Nothing, it is already complete'], ca: ['Una negra o un silenci de negra', 'Una altra blanca', 'Una rodona', 'Res, ja està complet'] },
    { es: 'Una negra o un silencio de negra', en: 'A crotchet or a crotchet rest', ca: 'Una negra o un silenci de negra' },
    '🧮',
    { es: '3/4 son tres tiempos y la blanca ocupa dos, así que queda uno: una negra, dos corcheas o un silencio de negra. En 3/4 no cabe una redonda, que vale cuatro.', en: '3/4 is three beats and the minim takes two, leaving one: a crotchet, two quavers or a crotchet rest. A semibreve, worth four, does not fit in 3/4.', ca: '3/4 són tres temps i la blanca n\'ocupa dos, així que en queda un.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 8 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
