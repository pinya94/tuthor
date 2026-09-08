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

  q('pa-30', 'atragantamiento',
    { es: '¿Cuál es la señal universal del atragantamiento?', en: 'What is the universal choking sign?', ca: 'Quin és el senyal universal de l\'ofegament?' },
    { es: ['Llevarse las dos manos al cuello', 'Levantar un brazo', 'Toser tapándose la boca', 'Señalar el estómago'], en: ['Bringing both hands to the throat', 'Raising one arm', 'Coughing while covering the mouth', 'Pointing at the stomach'], ca: ['Portar-se les dues mans al coll', 'Aixecar un braç', 'Tossir tapant-se la boca', 'Assenyalar l\'estómac'] },
    { es: 'Llevarse las dos manos al cuello', en: 'Bringing both hands to the throat', ca: 'Portar-se les dues mans al coll' },
    '🆘',
    { es: 'Se enseña precisamente porque quien se atraganta de verdad no puede pedir ayuda hablando. Es un gesto reconocido en todo el mundo, y verlo debe bastar para empezar a actuar sin perder tiempo preguntando.', en: 'It is taught precisely because someone truly choking cannot ask for help out loud. It is recognised worldwide, and seeing it should be enough to start acting without wasting time asking.', ca: 'S\'ensenya precisament perquè qui s\'ofega de debò no pot demanar ajuda parlant. És un gest reconegut arreu del món.' }),

  q('pa-31', 'atragantamiento',
    { es: 'Alguien se está atragantando. ¿Le das agua o un trozo de pan para que "baje" el objeto?', en: 'Someone is choking. Do you give them water or a piece of bread to push the object down?', ca: 'Algú s\'està ofegant. Li dones aigua o un tros de pa perquè "baixi" l\'objecte?' },
    { es: ['No: nunca se da nada de comer ni de beber durante un atragantamiento', 'Sí, agua siempre ayuda', 'Sí, pero solo pan', 'Solo si la persona lo pide'], en: ['No: you never give anything to eat or drink during a choking episode', 'Yes, water always helps', 'Yes, but only bread', 'Only if the person asks for it'], ca: ['No: mai no es dona res per menjar ni per beure durant un ofegament', 'Sí, l\'aigua sempre ajuda', 'Sí, però només pa', 'Només si la persona ho demana'] },
    { es: 'No: nunca se da nada de comer ni de beber durante un atragantamiento', en: 'No: you never give anything to eat or drink during a choking episode', ca: 'No: mai no es dona res per menjar ni per beure durant un ofegament' },
    '🚫',
    { es: 'Es una de las creencias más extendidas y más peligrosas. Si la vía aérea está obstruida, el líquido no puede bajar: se queda encima del objeto, puede encajarlo más y además se va a los pulmones. Solo se hacen las maniobras.', en: 'It is one of the commonest and most dangerous beliefs. If the airway is blocked the liquid cannot go down: it sits on top of the object, can wedge it further and goes into the lungs. Only the manoeuvres are done.', ca: 'És una de les creences més esteses i més perilloses. Si la via aèria està obstruïda, el líquid no pot baixar.' }),

  q('pa-32', 'atragantamiento',
    { es: 'En la maniobra de Heimlich a un adulto, ¿dónde colocas el puño?', en: 'In the Heimlich manoeuvre on an adult, where do you place your fist?', ca: 'En la maniobra de Heimlich a un adult, on col·loques el puny?' },
    { es: ['En el abdomen, por encima del ombligo y por debajo del esternón', 'Justo sobre el ombligo', 'En el centro del pecho, sobre el esternón', 'En la parte baja del vientre'], en: ['On the abdomen, above the navel and below the breastbone', 'Right on the navel', 'In the centre of the chest, on the breastbone', 'On the lower belly'], ca: ['A l\'abdomen, per damunt del melic i per sota de l\'estèrnum', 'Just sobre el melic', 'Al centre del pit, sobre l\'estèrnum', 'A la part baixa del ventre'] },
    { es: 'En el abdomen, por encima del ombligo y por debajo del esternón', en: 'On the abdomen, above the navel and below the breastbone', ca: 'A l\'abdomen, per damunt del melic i per sota de l\'estèrnum' },
    '✊',
    { es: 'El punto importa: demasiado arriba se golpea la punta del esternón y se puede fracturar, y demasiado abajo la compresión no empuja el diafragma y no sirve de nada. La otra mano agarra el puño y se empuja hacia dentro y hacia arriba.', en: 'The spot matters: too high strikes the tip of the breastbone and can fracture it, too low and the thrust does not push the diaphragm at all. The other hand grips the fist and you push inwards and upwards.', ca: 'El punt importa: massa amunt es colpeja la punta de l\'estèrnum i massa avall la compressió no empeny el diafragma.' }),

  q('pa-33', 'atragantamiento',
    { es: 'Un niño de 5 años se atraganta y no puede toser. ¿Se le hace la maniobra de Heimlich?', en: 'A 5-year-old is choking and cannot cough. Do you use the Heimlich manoeuvre?', ca: 'Un nen de 5 anys s\'ofega i no pot tossir. Se li fa la maniobra de Heimlich?' },
    { es: ['Sí, igual que a un adulto pero arrodillándote y con menos fuerza', 'No, en niños nunca se usa', 'Solo si pesa más de 30 kilos', 'No, hay que esperar a la ambulancia'], en: ['Yes, as with an adult but kneeling and with less force', 'No, it is never used on children', 'Only if they weigh over 30 kilos', 'No, you must wait for the ambulance'], ca: ['Sí, igual que a un adult però agenollant-te i amb menys força', 'No, en nens no es fa servir mai', 'Només si pesa més de 30 quilos', 'No, cal esperar l\'ambulància'] },
    { es: 'Sí, igual que a un adulto pero arrodillándote y con menos fuerza', en: 'Yes, as with an adult but kneeling and with less force', ca: 'Sí, igual que a un adult però agenollant-te i amb menys força' },
    '🧒',
    { es: 'La frontera está en el año de edad: por debajo no se comprime el abdomen y se alternan golpes en la espalda con compresiones en el pecho; por encima sí vale el Heimlich, adaptando la fuerza al tamaño del niño y poniéndose a su altura.', en: 'The dividing line is one year of age: below it the abdomen is not compressed and you alternate back blows with chest thrusts; above it the Heimlich does apply, with force adapted to the child\'s size and you at their height.', ca: 'La frontera és l\'any d\'edat: per sota no es comprimeix l\'abdomen; per sobre sí que val el Heimlich, adaptant la força.' }),

  q('pa-34', 'atragantamiento',
    { es: 'La persona pierde el conocimiento y empiezas la RCP. ¿Cuál es el ciclo en un adulto?', en: 'The person loses consciousness and you start CPR. What is the cycle in an adult?', ca: 'La persona perd el coneixement i comences la RCP. Quin és el cicle en un adult?' },
    { es: ['30 compresiones en el pecho y 2 ventilaciones', '10 compresiones y 5 ventilaciones', 'Solo ventilaciones', '5 compresiones y 1 ventilación'], en: ['30 chest compressions and 2 rescue breaths', '10 compressions and 5 breaths', 'Breaths only', '5 compressions and 1 breath'], ca: ['30 compressions al pit i 2 ventilacions', '10 compressions i 5 ventilacions', 'Només ventilacions', '5 compressions i 1 ventilació'] },
    { es: '30 compresiones en el pecho y 2 ventilaciones', en: '30 chest compressions and 2 rescue breaths', ca: '30 compressions al pit i 2 ventilacions' },
    '❤️',
    { es: 'Es el mismo ciclo que en cualquier parada, y se repite sin parar hasta que llegue ayuda. Si no te ves capaz de dar las ventilaciones, hacer solo las compresiones sigue siendo muchísimo mejor que no hacer nada.', en: 'It is the same cycle as in any cardiac arrest, repeated without stopping until help arrives. If you do not feel able to give the breaths, compressions alone are still far better than doing nothing.', ca: 'És el mateix cicle que en qualsevol aturada. Si no et veus capaç de fer les ventilacions, fer només les compressions ja és molt millor que res.' }),

  q('pa-35', 'atragantamiento',
    { es: '¿Hasta cuándo se siguen los ciclos de golpes y compresiones?', en: 'How long do you keep up the cycles of blows and thrusts?', ca: 'Fins quan se segueixen els cicles de cops i compressions?' },
    { es: ['Hasta que el objeto salga, llegue ayuda o la persona pierda el conocimiento', 'Como máximo tres tandas', 'Un minuto exacto', 'Hasta que la persona se canse'], en: ['Until the object comes out, help arrives or the person loses consciousness', 'Three rounds at most', 'Exactly one minute', 'Until the person gets tired'], ca: ['Fins que l\'objecte surti, arribi ajuda o la persona perdi el coneixement', 'Com a màxim tres tandes', 'Un minut exacte', 'Fins que la persona es cansi'] },
    { es: 'Hasta que el objeto salga, llegue ayuda o la persona pierda el conocimiento', en: 'Until the object comes out, help arrives or the person loses consciousness', ca: 'Fins que l\'objecte surti, arribi ajuda o la persona perdi el coneixement' },
    '🔁',
    { es: 'No hay un número máximo de intentos: mientras la persona siga consciente y obstruida, se sigue. Si pierde el conocimiento cambia el protocolo y se pasa a tumbarla en el suelo e iniciar RCP.', en: 'There is no maximum number of attempts: while the person is conscious and obstructed, you continue. If they lose consciousness the protocol changes: lay them on the floor and start CPR.', ca: 'No hi ha un nombre màxim d\'intents: mentre la persona segueixi conscient i obstruïda, es continua.' }),

  q('pa-36', 'atragantamiento',
    { es: '¿Qué costumbre reduce el riesgo de atragantarse comiendo?', en: 'Which habit lowers the risk of choking while eating?', ca: 'Quin costum redueix el risc d\'ofegar-se menjant?' },
    { es: ['Comer sentado, sin prisa y masticando bien, sin hablar ni reír con la boca llena', 'Beber mucha agua mientras se come', 'Comer de pie para tragar mejor', 'Comer deprisa para acabar antes'], en: ['Eating seated, unhurried and chewing well, without talking or laughing with your mouth full', 'Drinking a lot of water while eating', 'Eating standing up to swallow better', 'Eating fast to finish sooner'], ca: ['Menjar assegut, sense pressa i mastegant bé, sense parlar ni riure amb la boca plena', 'Beure molta aigua mentre es menja', 'Menjar dret per empassar millor', 'Menjar de pressa per acabar abans'] },
    { es: 'Comer sentado, sin prisa y masticando bien, sin hablar ni reír con la boca llena', en: 'Eating seated, unhurried and chewing well, without talking or laughing with your mouth full', ca: 'Menjar assegut, sense pressa i mastegant bé, sense parlar ni riure amb la boca plena' },
    '🍽️',
    { es: 'Al reír o hablar con comida en la boca se abre la vía aérea justo cuando no debería, y ahí es donde ocurren muchos atragantamientos. Correr o jugar con algo en la boca es especialmente peligroso en niños pequeños.', en: 'Laughing or talking with food in your mouth opens the airway exactly when it should not be, and that is where many choking episodes happen. Running or playing with something in the mouth is especially dangerous for small children.', ca: 'En riure o parlar amb menjar a la boca s\'obre la via aèria just quan no hauria d\'obrir-se.' }),

  q('pa-37', 'atragantamiento',
    { es: '¿Por qué los niños pequeños se atragantan más que los adultos?', en: 'Why do small children choke more than adults?', ca: 'Per què els nens petits s\'ofeguen més que els adults?' },
    { es: ['Tienen la vía aérea más estrecha, aún no mastican bien y se llevan objetos a la boca', 'Comen más cantidad', 'Tienen los pulmones más pequeños', 'Respiran más deprisa'], en: ['Their airway is narrower, they cannot chew well yet and they put objects in their mouths', 'They eat larger amounts', 'Their lungs are smaller', 'They breathe faster'], ca: ['Tenen la via aèria més estreta, encara no masteguen bé i es porten objectes a la boca', 'Mengen més quantitat', 'Tenen els pulmons més petits', 'Respiren més de pressa'] },
    { es: 'Tienen la vía aérea más estrecha, aún no mastican bien y se llevan objetos a la boca', en: 'Their airway is narrower, they cannot chew well yet and they put objects in their mouths', ca: 'Tenen la via aèria més estreta, encara no masteguen bé i es porten objectes a la boca' },
    '👶',
    { es: 'Con la dentición incompleta no pueden triturar bien, y explorar el mundo llevándose cosas a la boca es normal a esa edad. Por eso el atragantamiento es una de las principales causas de accidente doméstico en menores de tres años.', en: 'With incomplete teeth they cannot grind food properly, and exploring the world by mouth is normal at that age. That is why choking is a leading cause of household accident in children under three.', ca: 'Amb la dentició incompleta no poden triturar bé, i explorar el món portant-se coses a la boca és normal a aquesta edat.' }),

  q('pa-38', 'atragantamiento',
    { es: '¿Por qué hay tanta prisa en un atragantamiento total?', en: 'Why is there such urgency in a complete choking episode?', ca: 'Per què hi ha tanta pressa en un ofegament total?' },
    { es: ['Porque el cerebro empieza a sufrir daño a los pocos minutos sin oxígeno', 'Porque el objeto se disuelve', 'Porque la ambulancia cobra por minuto', 'Porque la persona puede vomitar'], en: ['Because the brain starts suffering damage within a few minutes without oxygen', 'Because the object dissolves', 'Because the ambulance charges by the minute', 'Because the person may vomit'], ca: ['Perquè el cervell comença a patir dany als pocs minuts sense oxigen', 'Perquè l\'objecte es dissol', 'Perquè l\'ambulància cobra per minut', 'Perquè la persona pot vomitar'] },
    { es: 'Porque el cerebro empieza a sufrir daño a los pocos minutos sin oxígeno', en: 'Because the brain starts suffering damage within a few minutes without oxygen', ca: 'Perquè el cervell comença a patir dany als pocs minuts sense oxigen' },
    '⏱️',
    { es: 'Se habla de unos cuatro a seis minutos, y una ambulancia rara vez llega en ese tiempo. Por eso quien está delante tiene que actuar: no se trata de sustituir a los sanitarios, sino de ganar los minutos que ellos no pueden.', en: 'Roughly four to six minutes is the figure, and an ambulance rarely arrives that fast. That is why whoever is present must act: not to replace the medics, but to win the minutes they cannot.', ca: 'Es parla d\'uns quatre a sis minuts, i una ambulància poques vegades arriba en aquest temps.' }),

  q('pa-39', 'atragantamiento',
    { es: '¿Cuáles son alimentos de más riesgo de atragantamiento en niños pequeños?', en: 'Which foods carry the highest choking risk for small children?', ca: 'Quins són els aliments amb més risc d\'ofegament en nens petits?' },
    { es: ['Frutos secos enteros, uvas enteras, salchichas en rodajas y caramelos duros', 'El puré y la sopa', 'El yogur y el plátano', 'El pan mojado en leche'], en: ['Whole nuts, whole grapes, sliced sausages and hard sweets', 'Purée and soup', 'Yoghurt and banana', 'Bread soaked in milk'], ca: ['Fruits secs sencers, raïm sencer, salsitxes a rodanxes i caramels durs', 'El puré i la sopa', 'El iogurt i el plàtan', 'El pa mullat amb llet'] },
    { es: 'Frutos secos enteros, uvas enteras, salchichas en rodajas y caramelos duros', en: 'Whole nuts, whole grapes, sliced sausages and hard sweets', ca: 'Fruits secs sencers, raïm sencer, salsitxes a rodanxes i caramels durs' },
    '🍇',
    { es: 'Lo que tienen en común es el tamaño y la forma: redondos, duros o resbaladizos, del calibre justo para tapar una vía aérea pequeña. La recomendación habitual es no dar frutos secos enteros antes de los 5 años y cortar uvas y salchichas a lo largo.', en: 'What they share is size and shape: round, hard or slippery, exactly the calibre to block a small airway. The usual advice is no whole nuts before age 5, and to cut grapes and sausages lengthwise.', ca: 'El que tenen en comú és la mida i la forma: rodons, durs o relliscosos, del calibre just per tapar una via aèria petita.' }),

]

export const PREGUNTAS_ATRAGANTAMIENTO = PREGUNTAS
