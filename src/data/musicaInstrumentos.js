// Los instrumentos y sus familias — Música, Primaria + ESO. Las familias de la
// orquesta (cuerda frotada, pulsada y percutida; viento madera y metal;
// percusión afinada y no afinada), cómo produce el sonido cada una, y en ESO la
// clasificación de Hornbostel-Sachs (cordófonos, aerófonos, membranófonos,
// idiófonos y electrófonos), las lengüetas y la colocación en la orquesta.
//
// Las trampas clásicas, a propósito: la flauta travesera y el saxofón son de
// metal pero de viento MADERA, y el piano es de cuerda (percutida). La familia
// la decide cómo se produce el sonido, no el material.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  // La correcta se guarda como TEXTO (lo que leen ExamenMC y las tarjetas
  // imprimibles de lib/tarjetasExamen.js): el de la primera opción.
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const O = (es, en, ca) => ({ es, en, ca })

const FAM = {
  cuerda: ["Cuerda", "Strings", "Corda"],
  madera: ["Viento madera", "Woodwind", "Vent fusta"],
  metal: ["Viento metal", "Brass", "Vent metall"],
  percusion: ["Percusión", "Percussion", "Percussió"],
}
// Opciones de familia: la buena primero y las otras tres detrás.
const familias = buena => {
  const orden = [buena, ...Object.keys(FAM).filter(k => k !== buena)]
  return O(orden.map(k => FAM[k][0]), orden.map(k => FAM[k][1]), orden.map(k => FAM[k][2]))
}

export const PREGUNTAS = [
  // ── Primaria ────────────────────────────────────────────────────────────
  q('in-01', 'primaria', '🎻',
    T("¿A qué familia pertenece el violín?", "Which family does the violin belong to?", "A quina família pertany el violí?"),
    familias('cuerda'),
    T("El violín suena al frotar sus cuerdas con un arco: es de cuerda frotada, como la viola, el violonchelo y el contrabajo.",
      "The violin sounds when its strings are rubbed with a bow: it is a bowed string instrument, like the viola, cello and double bass.",
      "El violí sona en fregar les cordes amb un arc: és de corda fregada, com la viola, el violoncel i el contrabaix.")),

  q('in-02', 'primaria', '🎺',
    T("¿A qué familia pertenece la trompeta?", "Which family does the trumpet belong to?", "A quina família pertany la trompeta?"),
    familias('metal'),
    T("Se toca haciendo vibrar los labios dentro de una boquilla, igual que el trombón, la trompa y la tuba.",
      "It is played by buzzing the lips into a mouthpiece, just like the trombone, horn and tuba.",
      "Es toca fent vibrar els llavis dins d’un broquet, igual que el trombó, la trompa i la tuba.")),

  q('in-03', 'primaria', '🌬️',
    T("La flauta travesera es de metal. ¿A qué familia pertenece?", "The flute is made of metal. Which family does it belong to?", "La flauta travessera és de metall. A quina família pertany?"),
    familias('madera'),
    T("Es de viento madera aunque esté hecha de metal: la familia la decide cómo suena, no el material. El aire choca contra un bisel, sin labios que vibren en una boquilla.",
      "It is a woodwind even though it is made of metal: the family depends on how it sounds, not the material. The air hits an edge, with no lips buzzing in a mouthpiece.",
      "És de vent fusta encara que sigui de metall: la família la decideix com sona, no el material. L’aire xoca contra un bisell, sense llavis que vibrin en un broquet.")),

  q('in-04', 'primaria', '🥁',
    T("¿A qué familia pertenece el tambor?", "Which family does the drum belong to?", "A quina família pertany el tambor?"),
    familias('percusion'),
    T("Los instrumentos de percusión suenan al golpearlos, sacudirlos o frotarlos. El tambor suena al golpear su parche.",
      "Percussion instruments sound when they are struck, shaken or scraped. A drum sounds when its skin is hit.",
      "Els instruments de percussió sonen en colpejar-los, sacsejar-los o fregar-los. El tambor sona en colpejar-ne el parx.")),

  q('in-05', 'primaria', '📏',
    T("¿Cuál es el instrumento más grave de la familia de cuerda frotada?", "Which is the lowest-pitched bowed string instrument?", "Quin és l’instrument més greu de la família de corda fregada?"),
    O(["El contrabajo", "El violín", "La viola", "El violonchelo"],
      ["The double bass", "The violin", "The viola", "The cello"],
      ["El contrabaix", "El violí", "La viola", "El violoncel"]),
    T("Ordenados de agudo a grave: violín, viola, violonchelo y contrabajo. El más grande es el más grave.",
      "From high to low: violin, viola, cello and double bass. The biggest is the lowest.",
      "Ordenats d’agut a greu: violí, viola, violoncel i contrabaix. El més gran és el més greu.")),

  q('in-06', 'primaria', '🎸',
    T("¿Cómo se toca la guitarra española?", "How is the Spanish guitar played?", "Com es toca la guitarra espanyola?"),
    O(["Pulsando las cuerdas con los dedos: es de cuerda pulsada", "Frotando las cuerdas con un arco", "Soplando por un agujero", "Golpeando las cuerdas con martillos"],
      ["By plucking the strings with the fingers: it is a plucked string instrument", "By rubbing the strings with a bow", "By blowing into a hole", "By hitting the strings with hammers"],
      ["Puntejant les cordes amb els dits: és de corda polsada", "Fregant les cordes amb un arc", "Bufant per un forat", "Colpejant les cordes amb martells"]),
    T("La guitarra, el arpa, el laúd y la bandurria son de cuerda pulsada: la cuerda se pellizca con los dedos o con una púa.",
      "The guitar, harp, lute and bandurria are plucked string instruments: the string is plucked with the fingers or a pick.",
      "La guitarra, l’arpa, el llaüt i la bandúrria són de corda polsada: la corda es pessiga amb els dits o amb una pua.")),

  q('in-07', 'primaria', '🎹',
    T("¿A qué familia pertenece el piano?", "Which family does the piano belong to?", "A quina família pertany el piano?"),
    O(["Cuerda percutida: cada tecla mueve un macillo que golpea unas cuerdas", "Viento madera", "Viento metal", "No tiene familia: es electrónico"],
      ["Struck strings: each key moves a hammer that hits some strings", "Woodwind", "Brass", "It has no family: it is electronic"],
      ["Corda percudida: cada tecla mou un martellet que colpeja unes cordes", "Vent fusta", "Vent metall", "No té família: és electrònic"]),
    T("Dentro del piano hay más de 200 cuerdas tensas. Al pulsar una tecla, un macillo forrado de fieltro las golpea, y por eso es de cuerda percutida.",
      "Inside a piano there are more than 200 tight strings. When you press a key, a felt-covered hammer hits them, which is why it is a struck string instrument.",
      "Dins del piano hi ha més de 200 cordes tibants. En prémer una tecla, un martellet folrat de feltre les colpeja, i per això és de corda percudida.")),

  q('in-08', 'primaria', '👄',
    T("¿Cómo suenan los instrumentos de viento metal?", "How do brass instruments make their sound?", "Com sonen els instruments de vent metall?"),
    O(["Vibrando los labios del músico dentro de una boquilla", "Con una caña que vibra", "Con cuerdas dentro del tubo", "Golpeando el tubo"],
      ["By the player’s lips buzzing inside a mouthpiece", "With a reed that vibrates", "With strings inside the tube", "By hitting the tube"],
      ["Fent vibrar els llavis del músic dins d’un broquet", "Amb una canya que vibra", "Amb cordes dins del tub", "Colpejant el tub"]),
    T("Los labios hacen de lengüeta. El músico cambia la nota apretando más o menos los labios y alargando el tubo con pistones o con una vara.",
      "The lips act as the reed. The player changes the note by tightening the lips and lengthening the tube with valves or a slide.",
      "Els llavis fan de llengüeta. El músic canvia la nota estrenyent més o menys els llavis i allargant el tub amb pistons o amb una vara.")),

  q('in-09', 'primaria', '↔️',
    T("¿Qué instrumento cambia de nota moviendo una vara que alarga el tubo?", "Which instrument changes note by moving a slide that lengthens the tube?", "Quin instrument canvia de nota movent una vara que allarga el tub?"),
    O(["El trombón", "La trompeta", "El clarinete", "La tuba"],
      ["The trombone", "The trumpet", "The clarinet", "The tuba"],
      ["El trombó", "La trompeta", "El clarinet", "La tuba"]),
    T("El trombón de varas es de viento metal. Al estirar la vara el tubo se alarga y la nota se hace más grave.",
      "The slide trombone is a brass instrument. Pushing the slide out makes the tube longer and the note lower.",
      "El trombó de vares és de vent metall. En estirar la vara el tub s’allarga i la nota es fa més greu.")),

  q('in-10', 'primaria', '🔊',
    T("En general, dentro de una misma familia, ¿qué instrumento suena más grave?", "In general, within the same family, which instrument sounds lowest?", "En general, dins d’una mateixa família, quin instrument sona més greu?"),
    O(["El más grande", "El más pequeño", "El más brillante", "El que se toca más fuerte"],
      ["The biggest one", "The smallest one", "The shiniest one", "The one played loudest"],
      ["El més gran", "El més petit", "El més brillant", "El que es toca més fort"]),
    T("Cuerdas más largas y tubos más largos vibran más despacio y dan notas más graves: el contrabajo frente al violín, la tuba frente a la trompeta.",
      "Longer strings and longer tubes vibrate more slowly and give lower notes: the double bass compared with the violin, the tuba compared with the trumpet.",
      "Cordes més llargues i tubs més llargs vibren més a poc a poc i donen notes més greus: el contrabaix davant del violí, la tuba davant de la trompeta.")),

  q('in-11', 'primaria', '🎼',
    T("¿Cuál de estos instrumentos de percusión puede tocar melodías con notas distintas?", "Which of these percussion instruments can play melodies with different notes?", "Quin d’aquests instruments de percussió pot tocar melodies amb notes diferents?"),
    O(["El xilófono", "Los platillos", "La caja", "El bombo"],
      ["The xylophone", "The cymbals", "The snare drum", "The bass drum"],
      ["El xilòfon", "Els platerets", "La caixa", "El bombo"]),
    T("El xilófono es percusión de sonido determinado: cada lámina da una nota. Los platillos, la caja y el bombo dan un sonido sin altura definida.",
      "The xylophone is tuned percussion: each bar gives a note. Cymbals, snare drum and bass drum give a sound without a definite pitch.",
      "El xilòfon és percussió de so determinat: cada làmina dona una nota. Els platerets, la caixa i el bombo donen un so sense altura definida.")),

  q('in-12', 'primaria', '💃',
    T("¿A qué familia pertenecen las castañuelas?", "Which family do castanets belong to?", "A quina família pertanyen les castanyoles?"),
    familias('percusion'),
    T("Son dos piezas cóncavas de madera que se golpean entre sí. Son típicas de la música popular española y del flamenco.",
      "They are two hollow pieces of wood that are clicked together. They are typical of Spanish folk music and flamenco.",
      "Són dues peces còncaves de fusta que es colpegen entre si. Són típiques de la música popular espanyola i del flamenc.")),

  q('in-13', 'primaria', '🎷',
    T("El saxofón es de metal. ¿A qué familia pertenece?", "The saxophone is made of metal. Which family does it belong to?", "El saxòfon és de metall. A quina família pertany?"),
    familias('madera'),
    T("Suena gracias a una lengüeta de caña que vibra contra la boquilla, como el clarinete. Por eso es de viento madera aunque sea de metal.",
      "It sounds thanks to a cane reed vibrating against the mouthpiece, like the clarinet. That is why it is a woodwind even though it is made of metal.",
      "Sona gràcies a una llengüeta de canya que vibra contra el broquet, com el clarinet. Per això és de vent fusta encara que sigui de metall.")),

  q('in-14', 'primaria', '🎵',
    T("¿Cuál de estos instrumentos es de cuerda?", "Which of these instruments is a string instrument?", "Quin d’aquests instruments és de corda?"),
    O(["El arpa", "El clarinete", "La tuba", "El xilófono"],
      ["The harp", "The clarinet", "The tuba", "The xylophone"],
      ["L’arpa", "El clarinet", "La tuba", "El xilòfon"]),
    T("El arpa tiene decenas de cuerdas que se pulsan con los dedos. El clarinete es viento madera, la tuba viento metal y el xilófono percusión.",
      "The harp has dozens of strings plucked with the fingers. The clarinet is woodwind, the tuba brass and the xylophone percussion.",
      "L’arpa té desenes de cordes que es puntegen amb els dits. El clarinet és vent fusta, la tuba vent metall i el xilòfon percussió.")),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('in-15', 'eso', '🔔',
    T("En la clasificación de Hornbostel-Sachs, ¿qué es un idiófono?", "In the Hornbostel-Sachs classification, what is an idiophone?", "En la classificació de Hornbostel-Sachs, què és un idiòfon?"),
    O(["Un instrumento que suena al vibrar su propio cuerpo, sin cuerdas ni membranas", "Un instrumento con una piel tensa", "Un instrumento de cuerda muy antiguo", "Un instrumento que necesita electricidad"],
      ["An instrument that sounds when its own body vibrates, without strings or membranes", "An instrument with a stretched skin", "A very old string instrument", "An instrument that needs electricity"],
      ["Un instrument que sona en vibrar el seu propi cos, sense cordes ni membranes", "Un instrument amb una pell tibant", "Un instrument de corda molt antic", "Un instrument que necessita electricitat"]),
    T("Xilófono, castañuelas, platillos, triángulo o campanas son idiófonos. Esta clasificación ordena los instrumentos por lo que vibra: cuerda, aire, membrana, el propio cuerpo o un circuito.",
      "Xylophone, castanets, cymbals, triangle or bells are idiophones. This system groups instruments by what vibrates: a string, air, a membrane, the body itself or a circuit.",
      "Xilòfon, castanyoles, platerets, triangle o campanes són idiòfons. Aquesta classificació ordena els instruments pel que vibra: corda, aire, membrana, el mateix cos o un circuit.")),

  q('in-16', 'eso', '👏',
    T("¿Cuál de estos instrumentos es un membranófono?", "Which of these instruments is a membranophone?", "Quin d’aquests instruments és un membranòfon?"),
    O(["El pandero", "El triángulo", "La flauta dulce", "El violonchelo"],
      ["The frame drum (pandero)", "The triangle", "The recorder", "The cello"],
      ["El pandero", "El triangle", "La flauta dolça", "El violoncel"]),
    T("Los membranófonos suenan al vibrar una membrana tensa (un parche): pandero, tambor, bongós o timbales. El triángulo es un idiófono.",
      "Membranophones sound when a stretched membrane (a drumhead) vibrates: frame drum, drum, bongos or timpani. The triangle is an idiophone.",
      "Els membranòfons sonen en vibrar una membrana tibant (un parx): pandero, tambor, bongos o timbales. El triangle és un idiòfon.")),

  q('in-17', 'eso', '🎶',
    T("¿Cuál de estos instrumentos es de doble lengüeta?", "Which of these instruments uses a double reed?", "Quin d’aquests instruments és de doble llengüeta?"),
    O(["El oboe", "El clarinete", "La flauta travesera", "El saxofón"],
      ["The oboe", "The clarinet", "The flute", "The saxophone"],
      ["L’oboè", "El clarinet", "La flauta travessera", "El saxòfon"]),
    T("El oboe y el fagot se tocan con dos cañas atadas que vibran una contra otra. El clarinete y el saxofón usan una sola lengüeta, y la flauta, ninguna.",
      "The oboe and bassoon are played with two cane blades tied together that vibrate against each other. The clarinet and saxophone use a single reed, and the flute none at all.",
      "L’oboè i el fagot es toquen amb dues canyes lligades que vibren l’una contra l’altra. El clarinet i el saxòfon fan servir una sola llengüeta, i la flauta, cap.")),

  q('in-18', 'eso', '🎵',
    T("¿Cuál es el instrumento más grave de la familia de viento madera de la orquesta?", "Which is the lowest-pitched woodwind instrument in the orchestra?", "Quin és l’instrument més greu de la família de vent fusta de l’orquestra?"),
    O(["El contrafagot", "El flautín", "El oboe", "El clarinete"],
      ["The contrabassoon", "The piccolo", "The oboe", "The clarinet"],
      ["El contrafagot", "El flautí", "L’oboè", "El clarinet"]),
    T("El contrafagot tiene casi seis metros de tubo doblado sobre sí mismo. En el otro extremo está el flautín, el más agudo de toda la orquesta.",
      "The contrabassoon has almost six metres of tubing folded back on itself. At the other extreme is the piccolo, the highest in the whole orchestra.",
      "El contrafagot té gairebé sis metres de tub doblegat sobre si mateix. A l’altre extrem hi ha el flautí, el més agut de tota l’orquestra.")),

  q('in-19', 'eso', '🎻',
    T("¿Qué instrumentos forman un cuarteto de cuerda?", "Which instruments make up a string quartet?", "Quins instruments formen un quartet de corda?"),
    O(["Dos violines, una viola y un violonchelo", "Cuatro violines", "Violín, guitarra, arpa y piano", "Piano, violín, viola y violonchelo"],
      ["Two violins, a viola and a cello", "Four violins", "Violin, guitar, harp and piano", "Piano, violin, viola and cello"],
      ["Dos violins, una viola i un violoncel", "Quatre violins", "Violí, guitarra, arpa i piano", "Piano, violí, viola i violoncel"]),
    T("Es la formación de cámara más famosa desde Haydn, en el siglo XVIII. El contrabajo no suele formar parte de él.",
      "It has been the most famous chamber ensemble since Haydn, in the 18th century. The double bass is not usually part of it.",
      "És la formació de cambra més famosa des de Haydn, al segle XVIII. El contrabaix no en sol formar part.")),

  q('in-20', 'eso', '📍',
    T("En una orquesta sinfónica, ¿qué familia se sienta más cerca del director?", "In a symphony orchestra, which family sits closest to the conductor?", "En una orquestra simfònica, quina família seu més a prop del director?"),
    O(["La cuerda", "La percusión", "El viento metal", "El viento madera"],
      ["The strings", "The percussion", "The brass", "The woodwind"],
      ["La corda", "La percussió", "El vent metall", "El vent fusta"]),
    T("La colocación va de menos a más volumen: la cuerda delante, en abanico; detrás, el viento madera; luego el viento metal, y al fondo la percusión, que es la que más suena.",
      "The layout goes from quietest to loudest: strings in front, in a fan; behind them the woodwind; then the brass, and at the back the percussion, the loudest of all.",
      "La col·locació va de menys a més volum: la corda al davant, en ventall; darrere, el vent fusta; després el vent metall, i al fons la percussió, que és la que més sona.")),

  q('in-21', 'eso', '🎛️',
    T("¿Cuál de estos instrumentos es un electrófono?", "Which of these instruments is an electrophone?", "Quin d’aquests instruments és un electròfon?"),
    O(["El sintetizador", "El órgano de tubos", "El clave", "El arpa"],
      ["The synthesiser", "The pipe organ", "The harpsichord", "The harp"],
      ["El sintetitzador", "L’orgue de tubs", "El clavicèmbal", "L’arpa"]),
    T("En el sintetizador el sonido lo generan circuitos electrónicos. El órgano de tubos, aunque tenga teclado, es un aerófono: el sonido sale del aire en los tubos.",
      "In a synthesiser the sound is generated by electronic circuits. The pipe organ, although it has a keyboard, is an aerophone: the sound comes from air in the pipes.",
      "Al sintetitzador el so el generen circuits electrònics. L’orgue de tubs, encara que tingui teclat, és un aeròfon: el so surt de l’aire als tubs.")),

  q('in-22', 'eso', '🥁',
    T("¿Qué tienen de especial los timbales de la orquesta?", "What is special about orchestral timpani?", "Què tenen d’especial les timbales de l’orquestra?"),
    O(["Son membranófonos afinados: con un pedal se tensa el parche y cambia la nota", "Son de viento metal", "No se pueden afinar", "Suenan con un arco"],
      ["They are tuned membranophones: a pedal tightens the drumhead and changes the note", "They are brass instruments", "They cannot be tuned", "They are played with a bow"],
      ["Són membranòfons afinats: amb un pedal es tensa el parx i canvia la nota", "Són de vent metall", "No es poden afinar", "Sonen amb un arc"]),
    T("Cuanto más tenso está el parche, más aguda es la nota. Por eso el timbalero puede tocar notas concretas, a diferencia del bombo.",
      "The tighter the drumhead, the higher the note. That is why the timpanist can play specific notes, unlike the bass drum.",
      "Com més tibant és el parx, més aguda és la nota. Per això el timbaler pot tocar notes concretes, a diferència del bombo.")),

  q('in-23', 'eso', '📯',
    T("¿Qué instrumento de viento metal tiene el tubo enrollado en círculo y se toca con una mano dentro de la campana?", "Which brass instrument has its tubing coiled in a circle and is played with one hand inside the bell?", "Quin instrument de vent metall té el tub enrotllat en cercle i es toca amb una mà dins de la campana?"),
    O(["La trompa", "La trompeta", "El trombón", "La tuba"],
      ["The French horn", "The trumpet", "The trombone", "The tuba"],
      ["La trompa", "La trompeta", "El trombó", "La tuba"]),
    T("La trompa viene de los cuernos de caza. La mano dentro de la campana ayuda a afinar y a suavizar el sonido.",
      "The horn comes from hunting horns. The hand inside the bell helps tune and soften the sound.",
      "La trompa ve de les banyes de caça. La mà dins de la campana ajuda a afinar i a suavitzar el so.")),

  q('in-24', 'eso', '🏛️',
    T("¿En qué se diferencia el clave (clavicémbalo) del piano?", "How does the harpsichord differ from the piano?", "En què es diferencia el clavicèmbal del piano?"),
    O(["En el clave unas púas pellizcan las cuerdas; en el piano, macillos las golpean", "El clave no tiene cuerdas", "El clave es de viento", "No se diferencian: son el mismo instrumento"],
      ["In the harpsichord quills pluck the strings; in the piano, hammers strike them", "The harpsichord has no strings", "The harpsichord is a wind instrument", "There is no difference: they are the same instrument"],
      ["Al clavicèmbal unes pues pessiguen les cordes; al piano, martellets les colpegen", "El clavicèmbal no té cordes", "El clavicèmbal és de vent", "No es diferencien: són el mateix instrument"]),
    T("Por eso el clave apenas puede tocar más fuerte o más suave, y el piano sí: su nombre completo, pianoforte, significa «suave-fuerte».",
      "That is why the harpsichord can barely play louder or softer, while the piano can: its full name, pianoforte, means «soft-loud».",
      "Per això el clavicèmbal amb prou feines pot tocar més fort o més suau, i el piano sí: el seu nom complet, pianoforte, vol dir «suau-fort».")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
