// Primeros auxilios — protocolo de atragantamiento (obstrucción total de la
// vía aérea en un adulto). Contenido contrastado con Cruz Roja Española,
// Mayo Clinic y MedlinePlus (ver enlaces en el resumen de la sesión que creó
// este fichero). Aun así, es material educativo: no sustituye una formación
// oficial en primeros auxilios.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const PREGUNTAS = [
  q('pa-01', 'atragantamiento',
    {
      es: 'Tu amigo se lleva las manos al cuello mientras come: no puede hablar ni toser bien. ¿Qué es lo primero que haces?',
      en: 'Your friend grabs their throat while eating: they can\'t speak or cough properly. What\'s the first thing you do?',
      ca: 'El teu amic es porta les mans al coll mentre menja: no pot parlar ni tossir bé. Què fas primer?',
    },
    {
      es: ['Confirmar en voz alta si se está atragantando y si puede toser', 'Darle golpes en la espalda de inmediato', 'Ofrecerle agua para que trague mejor', 'Hacerle la maniobra de Heimlich sin preguntar nada'],
      en: ['Confirm out loud whether they\'re choking and if they can cough', 'Give them back blows immediately', 'Offer them water to help it go down', 'Do the Heimlich maneuver without asking anything'],
      ca: ['Confirmar en veu alta si s\'està ennuegant i si pot tossir', 'Donar-li cops a l\'esquena de seguida', 'Oferir-li aigua perquè s\'empassi millor', 'Fer-li la maniobra de Heimlich sense preguntar res'],
    },
    { es: 'Confirmar en voz alta si se está atragantando y si puede toser', en: 'Confirm out loud whether they\'re choking and if they can cough', ca: 'Confirmar en veu alta si s\'està ennuegant i si pot tossir' },
    '✋',
    {
      es: 'Antes de actuar hay que distinguir obstrucción parcial (tose, puede hablar) de total (no puede toser, hablar ni respirar): el protocolo es distinto en cada caso.',
      en: 'Before acting you need to tell partial obstruction (coughing, can speak) apart from total (can\'t cough, speak or breathe): the protocol differs for each.',
      ca: 'Abans d\'actuar cal distingir obstrucció parcial (tus, pot parlar) de total (no pot tossir, parlar ni respirar): el protocol és diferent en cada cas.',
    }
  ),
  q('pa-02', 'atragantamiento',
    {
      es: 'No responde con palabras, no tose y hace gestos de ahogo. ¿Qué haces?',
      en: 'They don\'t answer, can\'t cough, and are gesturing that they\'re choking. What do you do?',
      ca: 'No respon amb paraules, no tus i fa gestos d\'ofec. Què fas?',
    },
    {
      es: ['Actuar de inmediato: empezar la maniobra de desobstrucción', 'Darle un vaso de agua para que la trague', 'Esperar un poco a ver si se le pasa solo', 'Sentarlo y decirle que respire hondo'],
      en: ['Act immediately: start the choking maneuver', 'Give them a glass of water to swallow', 'Wait a bit to see if it passes on its own', 'Sit them down and tell them to breathe deeply'],
      ca: ['Actuar de seguida: començar la maniobra de desobstrucció', 'Donar-li un got d\'aigua perquè s\'ho empassi', 'Esperar una mica a veure si se li passa sol', 'Asseure\'l i dir-li que respiri fons'],
    },
    { es: 'Actuar de inmediato: empezar la maniobra de desobstrucción', en: 'Act immediately: start the choking maneuver', ca: 'Actuar de seguida: començar la maniobra de desobstrucció' },
    '🚨',
    {
      es: 'Sin tos ni entrada de aire es una obstrucción total: hay que actuar ya. El agua puede desplazar el objeto y agravar la obstrucción; nunca se ofrece líquido durante un atragantamiento.',
      en: 'No cough and no air movement means total obstruction: act now. Water can shift the object and worsen the obstruction; never offer liquid during choking.',
      ca: 'Sense tos ni entrada d\'aire és una obstrucció total: cal actuar ja. L\'aigua pot desplaçar l\'objecte i agreujar l\'obstrucció; mai s\'ofereix líquid durant un ennuegament.',
    }
  ),
  q('pa-03', 'atragantamiento',
    {
      es: 'Vas a intentar desbloquear la vía aérea con golpes en la espalda. ¿Cómo te colocas primero?',
      en: 'You\'re about to try clearing the airway with back blows. How do you position yourself first?',
      ca: 'Vas a intentar desbloquejar la via aèria amb cops a l\'esquena. Com et col·loques primer?',
    },
    {
      es: ['A su lado, inclinando su tronco hacia delante', 'Detrás de él, sin inclinarlo, para no asustarlo', 'Delante suya, cara a cara', 'Tumbado en el suelo boca abajo'],
      en: ['To their side, leaning their torso forward', 'Behind them, without leaning them, so as not to scare them', 'In front of them, face to face', 'Lying on the ground face down'],
      ca: ['Al seu costat, inclinant el tronc cap endavant', 'Darrere seu, sense inclinar-lo, per no espantar-lo', 'Al davant seu, cara a cara', 'Estirat a terra bocaterrosa'],
    },
    { es: 'A su lado, inclinando su tronco hacia delante', en: 'To their side, leaning their torso forward', ca: 'Al seu costat, inclinant el tronc cap endavant' },
    '🧍',
    {
      es: 'Inclinar el tronco hacia delante ayuda a que el objeto salga por la boca en vez de seguir hacia dentro con cada golpe.',
      en: 'Leaning the torso forward helps the object come out through the mouth instead of moving further in with each blow.',
      ca: 'Inclinar el tronc cap endavant ajuda que l\'objecte surti per la boca en comptes de seguir cap endins amb cada cop.',
    }
  ),
  q('pa-04', 'atragantamiento',
    {
      es: 'Ya lo tienes colocado con el tronco inclinado hacia delante. ¿Qué haces ahora?',
      en: 'You\'ve got them positioned with their torso leaning forward. What do you do now?',
      ca: 'Ja el tens col·locat amb el tronc inclinat cap endavant. Què fas ara?',
    },
    {
      es: ['Darle hasta 5 golpes secos entre los omóplatos con el talón de la mano', 'Darle un masaje suave en la espalda', 'Esperar a que tosa por sí solo', 'Empezar directamente con las compresiones abdominales'],
      en: ['Give up to 5 sharp blows between the shoulder blades with the heel of your hand', 'Give them a gentle back massage', 'Wait for them to cough it up on their own', 'Start straight away with abdominal thrusts'],
      ca: ['Donar-li fins a 5 cops secs entre els omòplats amb el taló de la mà', 'Fer-li un massatge suau a l\'esquena', 'Esperar que tussi per si sol', 'Començar directament amb les compressions abdominals'],
    },
    { es: 'Darle hasta 5 golpes secos entre los omóplatos con el talón de la mano', en: 'Give up to 5 sharp blows between the shoulder blades with the heel of your hand', ca: 'Donar-li fins a 5 cops secs entre els omòplats amb el taló de la mà' },
    '👋',
    {
      es: 'El protocolo empieza siempre por hasta 5 golpes secos interescapulares antes de pasar a las compresiones abdominales.',
      en: 'The protocol always starts with up to 5 sharp blows between the shoulder blades before moving to abdominal thrusts.',
      ca: 'El protocol comença sempre amb fins a 5 cops secs interescapulars abans de passar a les compressions abdominals.',
    }
  ),
  q('pa-05', 'atragantamiento',
    {
      es: 'Le has dado 5 golpes en la espalda y sigue sin poder respirar. ¿Qué haces?',
      en: 'You\'ve given 5 back blows and they still can\'t breathe. What do you do?',
      ca: 'Li has donat 5 cops a l\'esquena i encara no pot respirar. Què fas?',
    },
    {
      es: ['Pasar a las compresiones abdominales (maniobra de Heimlich)', 'Meterle los dedos en la boca a ciegas para sacar el objeto', 'Repetir los golpes en la espalda otras 5 veces', 'Darle la vuelta y ponerlo boca arriba a esperar'],
      en: ['Move on to abdominal thrusts (Heimlich maneuver)', 'Blindly sweep their mouth with your fingers to grab the object', 'Repeat back blows 5 more times', 'Turn them over onto their back and wait'],
      ca: ['Passar a les compressions abdominals (maniobra de Heimlich)', 'Ficar-li els dits a la boca a cegues per treure l\'objecte', 'Repetir els cops a l\'esquena 5 vegades més', 'Girar-lo boca amunt i esperar'],
    },
    { es: 'Pasar a las compresiones abdominales (maniobra de Heimlich)', en: 'Move on to abdominal thrusts (Heimlich maneuver)', ca: 'Passar a les compressions abdominals (maniobra de Heimlich)' },
    '🔄',
    {
      es: 'Si los golpes en la espalda no liberan la vía aérea, el protocolo alterna con 5 compresiones abdominales. Buscar el objeto a ciegas con los dedos puede empujarlo más adentro.',
      en: 'If back blows don\'t clear the airway, the protocol alternates with 5 abdominal thrusts. Blindly fishing for the object with your fingers can push it further in.',
      ca: 'Si els cops a l\'esquena no alliberen la via aèria, el protocol alterna amb 5 compressions abdominals. Buscar l\'objecte a cegues amb els dits el pot empènyer més endins.',
    }
  ),
  q('pa-06', 'atragantamiento',
    {
      es: 'Vas a hacer la maniobra de Heimlich. ¿Cómo la haces?',
      en: 'You\'re about to do the Heimlich maneuver. How do you do it?',
      ca: 'Vas a fer la maniobra de Heimlich. Com la fas?',
    },
    {
      es: ['Rodeando su abdomen por detrás y haciendo hasta 5 compresiones hacia dentro y arriba', 'Apretando fuerte su pecho con ambas manos', 'Golpeando su estómago con el puño', 'Sacudiéndolo por los hombros'],
      en: ['Wrapping your arms around their abdomen from behind and giving up to 5 inward-and-upward thrusts', 'Pressing hard on their chest with both hands', 'Punching their stomach with your fist', 'Shaking them by the shoulders'],
      ca: ['Envoltant el seu abdomen per darrere i fent fins a 5 compressions cap endins i amunt', 'Prement fort el seu pit amb totes dues mans', 'Colpejant el seu estómac amb el puny', 'Sacsejant-lo per les espatlles'],
    },
    { es: 'Rodeando su abdomen por detrás y haciendo hasta 5 compresiones hacia dentro y arriba', en: 'Wrapping your arms around their abdomen from behind and giving up to 5 inward-and-upward thrusts', ca: 'Envoltant el seu abdomen per darrere i fent fins a 5 compressions cap endins i amunt' },
    '🤝',
    {
      es: 'La maniobra de Heimlich es una compresión abdominal hacia dentro y arriba, no un golpe ni una presión en el pecho.',
      en: 'The Heimlich maneuver is an inward-and-upward abdominal thrust, not a punch or chest pressure.',
      ca: 'La maniobra de Heimlich és una compressió abdominal cap endins i amunt, no un cop ni una pressió al pit.',
    }
  ),
  q('pa-07', 'atragantamiento',
    {
      es: 'A mitad de las compresiones abdominales, pierde el conocimiento. ¿Qué haces?',
      en: 'Midway through the abdominal thrusts, they lose consciousness. What do you do?',
      ca: 'A mig de les compressions abdominals, perd el coneixement. Què fas?',
    },
    {
      es: ['Túmbale en el suelo, llama al 112 e inicia RCP', 'Sigue haciendo compresiones abdominales de pie', 'Espera a que reaccione antes de llamar', 'Siéntalo en una silla y dale aire'],
      en: ['Lay them on the ground, call emergency services and start CPR', 'Keep doing abdominal thrusts standing up', 'Wait for them to come round before calling', 'Sit them in a chair and fan them'],
      ca: ['Estira\'l a terra, truca al 112 i inicia la RCP', 'Segueix fent compressions abdominals dret', 'Espera que reaccioni abans de trucar', 'Asseu-lo en una cadira i fes-li aire'],
    },
    { es: 'Túmbale en el suelo, llama al 112 e inicia RCP', en: 'Lay them on the ground, call emergency services and start CPR', ca: 'Estira\'l a terra, truca al 112 i inicia la RCP' },
    '📞',
    {
      es: 'Ante la pérdida de conciencia, el protocolo es tumbar a la persona, avisar a emergencias e iniciar reanimación cardiopulmonar de inmediato, sin esperar ni seguir con compresiones de pie.',
      en: 'When consciousness is lost, the protocol is to lay the person down, alert emergency services and start CPR immediately, without waiting or continuing thrusts while standing.',
      ca: 'Davant la pèrdua de coneixement, el protocol és estirar la persona, avisar emergències i iniciar la reanimació cardiopulmonar de seguida, sense esperar ni seguir amb compressions dret.',
    }
  ),
]

export const PREGUNTAS_ATRAGANTAMIENTO = PREGUNTAS
