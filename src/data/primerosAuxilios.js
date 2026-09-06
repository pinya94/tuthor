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
  q('pa-08', 'atragantamiento',
    {
      es: 'Se ha atragantado pero tose con fuerza y consigue decirte "me he atragantado". ¿Qué haces?',
      en: 'They are choking but coughing hard and manage to tell you "I\'m choking". What do you do?',
      ca: 'S\'ha ennuegat però tus amb força i aconsegueix dir-te "m\'he ennuegat". Què fas?',
    },
    {
      es: ['Animarle a seguir tosiendo y quedarte vigilando', 'Darle 5 golpes en la espalda de inmediato', 'Hacerle la maniobra de Heimlich', 'Darle golpecitos mientras bebe agua'],
      en: ['Encourage them to keep coughing and stay watching', 'Give 5 back blows immediately', 'Perform the Heimlich maneuver', 'Pat their back while they drink water'],
      ca: ['Animar-lo a seguir tossint i quedar-te vigilant', 'Donar-li 5 cops a l\'esquena de seguida', 'Fer-li la maniobra de Heimlich', 'Donar-li copets mentre beu aigua'],
    },
    { es: 'Animarle a seguir tosiendo y quedarte vigilando', en: 'Encourage them to keep coughing and stay watching', ca: 'Animar-lo a seguir tossint i quedar-te vigilant' },
    '🗣️',
    {
      es: 'Si tose con fuerza, la obstrucción es parcial y la tos es el mecanismo más eficaz que existe para expulsar el objeto: golpearle la espalda puede desplazarlo y convertir una obstrucción parcial en total. Te quedas al lado sin actuar, listo por si deja de toser.',
      en: 'If they are coughing forcefully the obstruction is partial, and coughing is the most effective way there is to expel the object: hitting their back can shift it and turn a partial obstruction into a complete one. You stay beside them without acting, ready in case the coughing stops.',
      ca: 'Si tus amb força, l\'obstrucció és parcial i la tos és el mecanisme més eficaç que hi ha per expulsar l\'objecte: colpejar-li l\'esquena pot desplaçar-lo i convertir una obstrucció parcial en total. Et quedes al costat sense actuar, a punt per si deixa de tossir.',
    }
  ),
  q('pa-09', 'atragantamiento',
    {
      es: '¿Cuándo hay que llamar al 112 en un atragantamiento?',
      en: 'When should you call the emergency number during a choking episode?',
      ca: 'Quan cal trucar al 112 en un ennuegament?',
    },
    {
      es: ['Solo si la persona pierde el conocimiento', 'En cuanto la obstrucción es total, mientras alguien empieza las maniobras', 'Solo después de intentarlo todo sin éxito', 'Nunca: el atragantamiento se resuelve siempre en casa'],
      en: ['Only if the person loses consciousness', 'As soon as the obstruction is complete, while someone starts the maneuvers', 'Only after trying everything without success', 'Never: choking is always sorted out at home'],
      ca: ['Només si la persona perd el coneixement', 'Tan bon punt l\'obstrucció és total, mentre algú comença les maniobres', 'Només després d\'intentar-ho tot sense èxit', 'Mai: l\'ennuegament es resol sempre a casa'],
    },
    { es: 'En cuanto la obstrucción es total, mientras alguien empieza las maniobras', en: 'As soon as the obstruction is complete, while someone starts the maneuvers', ca: 'Tan bon punt l\'obstrucció és total, mentre algú comença les maniobres' },
    '☎️',
    {
      es: 'Se llama YA, sin esperar a ver si se resuelve: el cerebro aguanta muy poco sin oxígeno y la ambulancia tarda en llegar. Si hay más gente, uno llama y otro sigue con las maniobras; si estás solo, pon el altavoz del móvil y sigue actuando mientras hablas.',
      en: 'You call straight away, without waiting to see if it resolves: the brain lasts very little without oxygen and an ambulance takes time to arrive. If there are other people, one calls while another continues the maneuvers; if you are alone, put the phone on speaker and keep acting while you talk.',
      ca: 'Es truca JA, sense esperar a veure si es resol: el cervell aguanta molt poc sense oxigen i l\'ambulància triga a arribar. Si hi ha més gent, un truca i un altre segueix amb les maniobres; si estàs sol, posa l\'altaveu del mòbil i continua actuant mentre parles.',
    }
  ),
  q('pa-10', 'atragantamiento',
    {
      es: 'Ves el objeto asomando en la boca. ¿Puedes meter los dedos para sacarlo?',
      en: 'You can see the object at the mouth. Can you put your fingers in to pull it out?',
      ca: 'Veus l\'objecte que treu el cap a la boca. Pots ficar-hi els dits per treure\'l?',
    },
    {
      es: ['Sí, siempre que lo VEAS y puedas cogerlo; a ciegas nunca', 'Sí, hay que barrer la boca con el dedo aunque no se vea nada', 'No, nunca se toca la boca', 'Solo si la persona está consciente'],
      en: ['Yes, as long as you can SEE it and grasp it; never blindly', 'Yes, you should sweep the mouth with a finger even if you see nothing', 'No, you never touch the mouth', 'Only if the person is conscious'],
      ca: ['Sí, sempre que el VEGIS i el puguis agafar; a cegues mai', 'Sí, cal escombrar la boca amb el dit encara que no es vegi res', 'No, mai es toca la boca', 'Només si la persona està conscient'],
    },
    { es: 'Sí, siempre que lo VEAS y puedas cogerlo; a ciegas nunca', en: 'Yes, as long as you can SEE it and grasp it; never blindly', ca: 'Sí, sempre que el VEGIS i el puguis agafar; a cegues mai' },
    '🚫',
    {
      es: 'El barrido a ciegas con el dedo está desaconsejado desde hace años: lo más probable es empujar el objeto más adentro y encajarlo del todo. Solo se retira lo que se ve claramente y se puede pinzar con los dedos.',
      en: 'Blind finger sweeps have been advised against for years: the likeliest result is pushing the object further in and wedging it completely. You only remove what you can clearly see and pinch with your fingers.',
      ca: 'L\'escombrada a cegues amb el dit està desaconsellada des de fa anys: el més probable és empènyer l\'objecte més endins i encaixar-lo del tot. Només es retira allò que es veu clarament i es pot pinçar amb els dits.',
    }
  ),
  q('pa-11', 'atragantamiento',
    {
      es: 'Un bebé de 8 meses se atraganta. ¿Se le hace la maniobra de Heimlich?',
      en: 'An 8-month-old baby is choking. Do you perform the Heimlich maneuver?',
      ca: 'Un nadó de 8 mesos s\'ennuega. Se li fa la maniobra de Heimlich?',
    },
    {
      es: ['Sí, igual que a un adulto pero más suave', 'No: en menores de 1 año se alternan golpes en la espalda y compresiones en el pecho', 'Sí, pero solo si pesa más de 8 kg', 'No se hace nada, solo esperar a la ambulancia'],
      en: ['Yes, the same as an adult but gentler', 'No: in babies under 1 you alternate back blows and chest thrusts', 'Yes, but only if they weigh over 8 kg', 'You do nothing, just wait for the ambulance'],
      ca: ['Sí, igual que a un adult però més suau', 'No: en menors d\'1 any s\'alternen cops a l\'esquena i compressions al pit', 'Sí, però només si pesa més de 8 kg', 'No es fa res, només esperar l\'ambulància'],
    },
    { es: 'No: en menores de 1 año se alternan golpes en la espalda y compresiones en el pecho', en: 'No: in babies under 1 you alternate back blows and chest thrusts', ca: 'No: en menors d\'1 any s\'alternen cops a l\'esquena i compressions al pit' },
    '👶',
    {
      es: 'En un bebé las compresiones abdominales pueden dañar órganos internos, así que no se usan. El protocolo es distinto: boca abajo sobre el antebrazo con la cabeza más baja, 5 golpes entre los omóplatos, y luego boca arriba, 5 compresiones en el centro del pecho con dos dedos.',
      en: 'In a baby, abdominal thrusts can injure internal organs, so they are not used. The protocol is different: face down along your forearm with the head lower than the body, 5 blows between the shoulder blades, then face up, 5 chest thrusts in the centre of the chest with two fingers.',
      ca: 'En un nadó les compressions abdominals poden danyar òrgans interns, així que no s\'usen. El protocol és diferent: de boca terrosa sobre l\'avantbraç amb el cap més baix, 5 cops entre els omòplats, i després de boca amunt, 5 compressions al centre del pit amb dos dits.',
    }
  ),
  q('pa-12', 'atragantamiento',
    {
      es: 'Te atragantas estando solo en casa y no puedes toser ni hablar. ¿Qué haces?',
      en: 'You are choking alone at home and cannot cough or speak. What do you do?',
      ca: 'T\'ennuegues estant sol a casa i no pots tossir ni parlar. Què fas?',
    },
    {
      es: ['Esperar sentado a que se pase', 'Llamar al 112 y comprimirte el abdomen contra el respaldo de una silla', 'Beber agua rápido', 'Tumbarte boca arriba'],
      en: ['Sit and wait for it to pass', 'Call the emergency number and thrust your abdomen against the back of a chair', 'Drink water quickly', 'Lie down on your back'],
      ca: ['Esperar assegut que se\'t passi', 'Trucar al 112 i comprimir-te l\'abdomen contra el respatller d\'una cadira', 'Beure aigua de pressa', 'Ajeure\'t de boca amunt'],
    },
    { es: 'Llamar al 112 y comprimirte el abdomen contra el respaldo de una silla', en: 'Call the emergency number and thrust your abdomen against the back of a chair', ca: 'Trucar al 112 i comprimir-te l\'abdomen contra el respatller d\'una cadira' },
    '💺',
    {
      es: 'Puedes hacerte la maniobra tú mismo: cierras un puño sobre el abdomen, por encima del ombligo, y empujas hacia dentro y hacia arriba, o te dejas caer con esa zona sobre el respaldo de una silla o el borde de una mesa. Llama primero aunque no puedas hablar: desde un móvil, la llamada abierta ya localiza y activa la ayuda.',
      en: 'You can do the maneuver on yourself: make a fist over your abdomen, above the navel, and push inwards and upwards, or drop that area onto the back of a chair or the edge of a table. Call first even if you cannot speak: from a mobile, an open call already locates you and triggers help.',
      ca: 'Pots fer-te la maniobra tu mateix: tanques un puny sobre l\'abdomen, per damunt del melic, i empenys cap endins i cap amunt, o et deixes caure amb aquella zona sobre el respatller d\'una cadira o la vora d\'una taula. Truca primer encara que no puguis parlar: des d\'un mòbil, la trucada oberta ja localitza i activa l\'ajuda.',
    }
  ),
  q('pa-13', 'atragantamiento',
    {
      es: 'La persona atragantada está embarazada de muchos meses. ¿Dónde comprimes?',
      en: 'The choking person is heavily pregnant. Where do you apply the thrusts?',
      ca: 'La persona ennuegada està embarassada de molts mesos. On comprimeixes?',
    },
    {
      es: ['En el abdomen, igual que siempre', 'En el centro del pecho, no en el abdomen', 'En la parte baja del vientre', 'No se comprime: solo golpes en la espalda'],
      en: ['On the abdomen, the same as always', 'In the centre of the chest, not the abdomen', 'On the lower belly', 'You do not compress: back blows only'],
      ca: ['A l\'abdomen, igual que sempre', 'Al centre del pit, no a l\'abdomen', 'A la part baixa del ventre', 'No es comprimeix: només cops a l\'esquena'],
    },
    { es: 'En el centro del pecho, no en el abdomen', en: 'In the centre of the chest, not the abdomen', ca: 'Al centre del pit, no a l\'abdomen' },
    '🤲',
    {
      es: 'Con un embarazo avanzado no hay sitio en el abdomen y comprimir ahí pondría en riesgo al bebé, así que las compresiones se pasan al centro del pecho, sobre el esternón. La misma adaptación vale para una persona muy obesa, donde el abdomen no se abarca. Los golpes en la espalda no cambian.',
      en: 'In advanced pregnancy there is no room in the abdomen and compressing there would put the baby at risk, so the thrusts move to the centre of the chest, over the sternum. The same adaptation applies to a very obese person, where you cannot get your arms round the abdomen. Back blows are unchanged.',
      ca: 'Amb un embaràs avançat no hi ha lloc a l\'abdomen i comprimir-hi posaria en risc el nadó, així que les compressions passen al centre del pit, sobre l\'estèrnum. La mateixa adaptació val per a una persona molt obesa, on l\'abdomen no s\'abasta. Els cops a l\'esquena no canvien.',
    }
  ),
  q('pa-14', 'atragantamiento',
    {
      es: 'Alternas golpes en la espalda y compresiones abdominales. ¿Cuántos de cada tanda?',
      en: 'You alternate back blows and abdominal thrusts. How many in each round?',
      ca: 'Alternes cops a l\'esquena i compressions abdominals. Quants de cada tanda?',
    },
    {
      es: ['1 y 1', '5 y 5', '10 y 10', '3 y 7'],
      en: ['1 and 1', '5 and 5', '10 and 10', '3 and 7'],
      ca: ['1 i 1', '5 i 5', '10 i 10', '3 i 7'],
    },
    { es: '5 y 5', en: '5 and 5', ca: '5 i 5' },
    '🔁',
    {
      es: '5 golpes interescapulares y 5 compresiones abdominales, y se repite el ciclo mientras la persona siga consciente y obstruida. Se comprueba después de cada tanda por si el objeto ha salido: en cuanto vuelve a toser o a hablar, se para.',
      en: '5 blows between the shoulder blades and 5 abdominal thrusts, repeating the cycle while the person remains conscious and obstructed. You check after each round in case the object has come out: as soon as they cough or speak again, you stop.',
      ca: '5 cops interescapulars i 5 compressions abdominals, i es repeteix el cicle mentre la persona segueixi conscient i obstruïda. Es comprova després de cada tanda per si l\'objecte ha sortit: quan torna a tossir o a parlar, s\'atura.',
    }
  ),
  q('pa-15', 'atragantamiento',
    {
      es: 'El objeto sale y la persona vuelve a respirar bien. ¿Se acabó?',
      en: 'The object comes out and the person breathes normally again. Is it over?',
      ca: 'L\'objecte surt i la persona torna a respirar bé. S\'ha acabat?',
    },
    {
      es: ['Sí, si respira bien ya no hay nada que hacer', 'No: debe verla un médico, sobre todo si se le hicieron compresiones', 'No, hay que hacerle igualmente el Heimlich una vez más', 'Sí, pero solo si fue un niño'],
      en: ['Yes, if they are breathing there is nothing left to do', 'No: they should be seen by a doctor, especially if thrusts were performed', 'No, you should do the Heimlich once more anyway', 'Yes, but only if it was a child'],
      ca: ['Sí, si respira bé ja no hi ha res a fer', 'No: l\'ha de veure un metge, sobretot si se li van fer compressions', 'No, cal fer-li igualment el Heimlich una vegada més', 'Sí, però només si va ser un nen'],
    },
    { es: 'No: debe verla un médico, sobre todo si se le hicieron compresiones', en: 'No: they should be seen by a doctor, especially if thrusts were performed', ca: 'No: l\'ha de veure un metge, sobretot si se li van fer compressions' },
    '🏥',
    {
      es: 'Las compresiones abdominales son eficaces pero pueden lesionar órganos internos sin que se note en el momento. Además puede quedar un trozo del objeto en la vía aérea. Por eso, después de un atragantamiento con maniobras, siempre hay valoración médica.',
      en: 'Abdominal thrusts are effective but can injure internal organs without it being obvious at the time. A fragment of the object may also remain in the airway. That is why, after choking that required maneuvers, there is always a medical check.',
      ca: 'Les compressions abdominals són eficaces però poden lesionar òrgans interns sense que es noti en el moment. A més pot quedar un tros de l\'objecte a la via aèria. Per això, després d\'un ennuegament amb maniobres, sempre hi ha valoració mèdica.',
    }
  ),
]

export const PREGUNTAS_ATRAGANTAMIENTO = PREGUNTAS
