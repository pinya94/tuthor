// ── Escenarios de Primeros Auxilios (Estudiar > Vida Práctica) ──────────────
// Cada escenario es una secuencia lineal de pasos (no un árbol): los pasos
// 'orden' se mezclan y hay que arrastrarlos a su posicionCorrecta; los pasos
// 'decision' aparecen fijos en su posicionEnSecuencia y bloquean el avance
// hasta elegir una opción. Las opciones no derivan a ramas distintas — cada
// una solo se marca esCorrecta/esPeligrosa para el resumen final.
//
// Esta es la práctica "en profundidad", tema a tema, pensada para aprender
// el protocolo completo sin prisa (sin reloj ni puntuación) — para
// practicar rápido y con más variedad de casos, ver el juego Reacción
// (/juegos/reaccion); para un test tipo examen, ver /examen/primeros-auxilios.
//
// TODO(revisión sanitaria): el contenido sigue el protocolo estándar de SVB
// (Cruz Roja / European Resuscitation Council / Mayo Clinic / MedlinePlus)
// tal y como lo conoce un no sanitario. Antes de publicar, que lo revise
// alguien con formación oficial en primeros auxilios — esto es material
// educativo, no un sustituto.

export const DISCLAIMER = {
  es: 'Este contenido es educativo y no sustituye una formación oficial en primeros auxilios.',
  en: 'This content is educational and does not replace official first-aid training.',
  ca: 'Aquest contingut és educatiu i no substitueix una formació oficial en primers auxilis.',
}

export const SCENARIOS = [
  {
    id: 'atragantamiento',
    titulo: { es: 'Atragantamiento', en: 'Choking', ca: 'Ennuegament' },
    emoji: '✋',
    situacionInicial: {
      texto: {
        es: 'Estás comiendo con un amigo. De repente se lleva las manos al cuello: no puede hablar ni toser, y hace gestos de ahogo.',
        en: 'You are eating with a friend. Suddenly they grab their throat: they cannot speak or cough, and gesture that they are choking.',
        ca: 'Estàs menjant amb un amic. De sobte es porta les mans al coll: no pot parlar ni tossir, i fa gestos d\'ofec.',
      },
      icono: '✋',
    },
    pasos: [
      {
        id: 'p1', tipo: 'orden', posicionCorrecta: 1,
        texto: {
          es: 'Confirma en voz alta: "¿Te estás atragantando? ¿Puedes toser?"',
          en: 'Confirm out loud: "Are you choking? Can you cough?"',
          ca: 'Confirma en veu alta: "T\'estàs ennuegant? Pots tossir?"',
        },
      },
      {
        id: 'd1', tipo: 'decision', posicionEnSecuencia: 2,
        pregunta: {
          es: 'No responde con palabras, no tose y sigue haciendo gestos de ahogo.',
          en: 'They don\'t answer, can\'t cough, and keep gesturing that they\'re choking.',
          ca: 'No respon amb paraules, no tus i segueix fent gestos d\'ofec.',
        },
        opciones: [
          {
            texto: { es: 'Actúa de inmediato: empieza la maniobra de desobstrucción', en: 'Act immediately: start the choking maneuver', ca: 'Actua de seguida: comença la maniobra de desobstrucció' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Sin tos ni entrada de aire es una obstrucción total: hay que actuar ya, no esperar.',
              en: 'No cough and no air movement means total obstruction: act now, don\'t wait.',
              ca: 'Sense tos ni entrada d\'aire és una obstrucció total: cal actuar ja, no esperar.',
            },
          },
          {
            texto: { es: 'Dale un vaso de agua para que la trague', en: 'Give them a glass of water to swallow', ca: 'Dona\'ls un got d\'aigua perquè el s\'empassin' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'El agua puede desplazar el objeto y agravar la obstrucción de la vía aérea. Nunca se ofrece líquido durante un atragantamiento.',
              en: 'Water can shift the object and worsen the airway obstruction. Never offer liquid during choking.',
              ca: 'L\'aigua pot desplaçar l\'objecte i agreujar l\'obstrucció de la via aèria. Mai s\'ofereix líquid durant un ennuegament.',
            },
          },
          {
            texto: { es: 'Espera un poco a ver si se le pasa solo', en: 'Wait a bit to see if it passes on its own', ca: 'Espera una mica a veure si se li passa sol' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Con obstrucción total, cada segundo cuenta: esperar retrasa la maniobra de desobstrucción.',
              en: 'With total obstruction, every second counts: waiting delays the maneuver that clears the airway.',
              ca: 'Amb obstrucció total, cada segon compta: esperar retarda la maniobra de desobstrucció.',
            },
          },
        ],
      },
      {
        id: 'p2', tipo: 'orden', posicionCorrecta: 3,
        texto: {
          es: 'Colócate a su lado, inclínale el tronco hacia delante',
          en: 'Stand to their side, lean their torso forward',
          ca: 'Col·loca\'t al seu costat, inclina-li el tronc cap endavant',
        },
      },
      {
        id: 'p3', tipo: 'orden', posicionCorrecta: 4,
        texto: {
          es: 'Dale hasta 5 golpes secos entre los omóplatos con el talón de la mano',
          en: 'Give up to 5 sharp blows between the shoulder blades with the heel of your hand',
          ca: 'Dona-li fins a 5 cops secs entre els omòplats amb el taló de la mà',
        },
      },
      {
        id: 'd2', tipo: 'decision', posicionEnSecuencia: 5,
        pregunta: {
          es: 'Le has dado 5 golpes en la espalda y sigue sin poder respirar.',
          en: 'You\'ve given 5 back blows and they still can\'t breathe.',
          ca: 'Li has donat 5 cops a l\'esquena i encara no pot respirar.',
        },
        opciones: [
          {
            texto: { es: 'Pasa a las compresiones abdominales (maniobra de Heimlich)', en: 'Move on to abdominal thrusts (Heimlich maneuver)', ca: 'Passa a les compressions abdominals (maniobra de Heimlich)' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Si los golpes en la espalda no liberan la vía aérea, el protocolo pasa a compresiones abdominales.',
              en: 'If back blows don\'t clear the airway, the protocol moves on to abdominal thrusts.',
              ca: 'Si els cops a l\'esquena no alliberen la via aèria, el protocol passa a compressions abdominals.',
            },
          },
          {
            texto: { es: 'Métele los dedos en la boca a ciegas para sacar el objeto', en: 'Blindly sweep the mouth with your fingers to grab the object', ca: 'Fica-li els dits a la boca a cegues per treure l\'objecte' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Buscar el objeto a ciegas con los dedos puede empujarlo más adentro y bloquear aún más la vía aérea.',
              en: 'Blindly fishing for the object can push it further in and block the airway even more.',
              ca: 'Buscar l\'objecte a cegues amb els dits el pot empènyer més endins i bloquejar encara més la via aèria.',
            },
          },
          {
            texto: { es: 'Repite los golpes en la espalda otras 5 veces', en: 'Repeat back blows 5 more times', ca: 'Repeteix els cops a l\'esquena 5 vegades més' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'El protocolo alterna 5 golpes y 5 compresiones, no repite solo golpes indefinidamente.',
              en: 'The protocol alternates 5 blows and 5 thrusts, not blows on repeat indefinitely.',
              ca: 'El protocol alterna 5 cops i 5 compressions, no repeteix només cops indefinidament.',
            },
          },
        ],
      },
      {
        id: 'p4', tipo: 'orden', posicionCorrecta: 6,
        texto: {
          es: 'Rodea su abdomen por detrás y haz hasta 5 compresiones hacia dentro y arriba (maniobra de Heimlich)',
          en: 'Wrap your arms around their abdomen from behind and give up to 5 inward-and-upward thrusts (Heimlich maneuver)',
          ca: 'Envolta el seu abdomen per darrere i fes fins a 5 compressions cap endins i amunt (maniobra de Heimlich)',
        },
      },
      {
        id: 'd3', tipo: 'decision', posicionEnSecuencia: 7,
        pregunta: {
          es: 'A mitad de las compresiones abdominales, pierde el conocimiento.',
          en: 'Midway through the abdominal thrusts, they lose consciousness.',
          ca: 'A mig de les compressions abdominals, perd el coneixement.',
        },
        opciones: [
          {
            texto: { es: 'Túmbale en el suelo, llama al 112 e inicia RCP', en: 'Lay them on the ground, call emergency services and start CPR', ca: 'Estira\'l a terra, truca al 112 i inicia la RCP' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Ante la pérdida de conciencia, el protocolo es avisar a emergencias e iniciar reanimación cardiopulmonar.',
              en: 'When consciousness is lost, the protocol is to alert emergency services and start CPR.',
              ca: 'Davant la pèrdua de coneixement, el protocol és avisar emergències i iniciar la reanimació cardiopulmonar.',
            },
          },
          {
            texto: { es: 'Sigue haciendo compresiones abdominales de pie', en: 'Keep doing abdominal thrusts standing up', ca: 'Segueix fent compressions abdominals dret' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Las compresiones abdominales de pie no tienen sentido ni son seguras con la persona inconsciente; hay que tumbarla y pasar a RCP.',
              en: 'Standing abdominal thrusts make no sense and aren\'t safe once the person is unconscious; lay them down and switch to CPR.',
              ca: 'Les compressions abdominals dret no tenen sentit ni són segures amb la persona inconscient; cal estirar-la i passar a RCP.',
            },
          },
          {
            texto: { es: 'Espera a que reaccione antes de llamar', en: 'Wait for them to come round before calling', ca: 'Espera que reaccioni abans de trucar' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Ante una pérdida de conciencia por atragantamiento hay que llamar a emergencias de inmediato, no esperar.',
              en: 'When someone loses consciousness from choking you call emergency services immediately, not wait.',
              ca: 'Davant una pèrdua de coneixement per ennuegament cal trucar a emergències de seguida, no esperar.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'quemadura',
    titulo: { es: 'Quemadura', en: 'Burn', ca: 'Cremada' },
    emoji: '🔥',
    situacionInicial: {
      texto: {
        es: 'Estás cocinando con un familiar y se le vuelca encima una olla de agua hirviendo en el antebrazo. Grita de dolor y la piel se enrojece al momento.',
        en: 'You\'re cooking with a family member and a pot of boiling water spills onto their forearm. They cry out in pain and the skin turns red right away.',
        ca: 'Estàs cuinant amb un familiar i se li vessa a sobre una olla d\'aigua bullint a l\'avantbraç. Crida de dolor i la pell es posa vermella a l\'instant.',
      },
      icono: '🔥',
    },
    pasos: [
      {
        id: 'p1', tipo: 'orden', posicionCorrecta: 1,
        texto: {
          es: 'Apártalo de la fuente de calor y retira ropa o joyas que no estén pegadas a la piel de la zona',
          en: 'Move them away from the heat source and remove clothing or jewellery not stuck to the skin in that area',
          ca: 'Aparta\'l de la font de calor i retira roba o joies que no estiguin enganxades a la pell de la zona',
        },
      },
      {
        id: 'd1', tipo: 'decision', posicionEnSecuencia: 2,
        pregunta: {
          es: 'Tiene la piel muy roja y ya empiezan a salir ampollas.',
          en: 'The skin is very red and blisters are already starting to appear.',
          ca: 'Té la pell molt vermella i ja comencen a sortir butllofes.',
        },
        opciones: [
          {
            texto: { es: 'Poner la zona bajo agua fría del grifo cuanto antes', en: 'Put the area under cool running tap water as soon as possible', ca: 'Posar la zona sota aigua freda de l\'aixeta com abans millor' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'El agua fría corriendo reduce el daño en el tejido cuanto antes se aplique: es la primera medida ante cualquier quemadura.',
              en: 'Cool running water reduces tissue damage the sooner it\'s applied: it\'s the first response to any burn.',
              ca: 'L\'aigua freda corrent redueix el dany al teixit com abans s\'apliqui: és la primera mesura davant qualsevol cremada.',
            },
          },
          {
            texto: { es: 'Aplicar hielo directamente sobre la quemadura', en: 'Apply ice directly to the burn', ca: 'Aplicar gel directament sobre la cremada' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'El frío extremo del hielo puede lesionar aún más el tejido ya dañado: se usa agua fría, nunca hielo.',
              en: 'The extreme cold of ice can injure the already-damaged tissue even more: use cool water, never ice.',
              ca: 'El fred extrem del gel pot lesionar encara més el teixit ja malmès: s\'usa aigua freda, mai gel.',
            },
          },
          {
            texto: { es: 'Esperar a ver si mejora sola antes de hacer nada', en: 'Wait to see if it improves on its own before doing anything', ca: 'Esperar a veure si millora sola abans de fer res' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Cuanto antes se enfríe la quemadura, menos daño se acumula: esperar sin actuar empeora el resultado.',
              en: 'The sooner the burn is cooled, the less damage accumulates: waiting without acting makes the outcome worse.',
              ca: 'Com abans es refredi la cremada, menys dany s\'acumula: esperar sense actuar empitjora el resultat.',
            },
          },
        ],
      },
      {
        id: 'p2', tipo: 'orden', posicionCorrecta: 3,
        texto: {
          es: 'Mantén la zona bajo el agua fría (no helada) durante unos 20 minutos',
          en: 'Keep the area under cool (not icy) water for about 20 minutes',
          ca: 'Mantén la zona sota l\'aigua freda (no gelada) durant uns 20 minuts',
        },
      },
      {
        id: 'd2', tipo: 'decision', posicionEnSecuencia: 4,
        pregunta: {
          es: 'Mientras tiene el agua puesta, alguien te sugiere ponerle pasta de dientes o mantequilla para calmar el escozor.',
          en: 'While the water is running, someone suggests putting toothpaste or butter on it to ease the sting.',
          ca: 'Mentre té l\'aigua posada, algú et suggereix posar-hi pasta de dents o mantega per calmar l\'escalfor.',
        },
        opciones: [
          {
            texto: { es: 'No poner nada casero: seguir solo con agua', en: 'Don\'t put anything home-made on it: stick with just water', ca: 'No posar-hi res casolà: seguir només amb aigua' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Aceites, pomadas caseras y pasta de dientes irritan la lesión, dificultan valorarla y aumentan el riesgo de infección.',
              en: 'Oils, home remedies and toothpaste irritate the wound, make it harder to assess, and raise the infection risk.',
              ca: 'Olis, pomades casolanes i pasta de dents irriten la lesió, dificulten valorar-la i augmenten el risc d\'infecció.',
            },
          },
          {
            texto: { es: 'Ponerle mantequilla o pasta de dientes en la quemadura', en: 'Put butter or toothpaste on the burn', ca: 'Posar-hi mantega o pasta de dents a la cremada' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Son remedios caseros sin base médica que empeoran la herida y pueden favorecer una infección.',
              en: 'These are home remedies with no medical basis that make the wound worse and can encourage infection.',
              ca: 'Són remeis casolans sense base mèdica que empitjoren la ferida i poden afavorir una infecció.',
            },
          },
          {
            texto: { es: 'Ponerle una pomada del botiquín sin consultar antes', en: 'Put on an ointment from the medicine cabinet without checking first', ca: 'Posar-hi una pomada de la farmaciola sense consultar abans' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Sin saber si esa pomada es adecuada para quemaduras, mejor no improvisar: agua fría y, después, un profesional que valore qué usar.',
              en: 'Without knowing if that ointment is right for burns, it\'s better not to improvise: cool water, then a professional to decide what to use.',
              ca: 'Sense saber si aquella pomada és adequada per a cremades, millor no improvisar: aigua freda i, després, un professional que valori què fer servir.',
            },
          },
        ],
      },
      {
        id: 'p3', tipo: 'orden', posicionCorrecta: 5,
        texto: {
          es: 'Cubre la quemadura con un paño limpio o un apósito que no se pegue, sin apretar',
          en: 'Cover the burn with a clean cloth or a non-stick dressing, without pressing tightly',
          ca: 'Cobreix la cremada amb un drap net o un apòsit que no s\'enganxi, sense prémer',
        },
      },
      {
        id: 'd3', tipo: 'decision', posicionEnSecuencia: 6,
        pregunta: {
          es: 'Le han salido varias ampollas grandes y la quemadura ocupa buena parte del antebrazo.',
          en: 'Several large blisters have appeared and the burn covers a good part of the forearm.',
          ca: 'Li han sortit diverses butllofes grosses i la cremada ocupa bona part de l\'avantbraç.',
        },
        opciones: [
          {
            texto: { es: 'Acudir a que la valore un médico, sin reventar las ampollas', en: 'Get it checked by a doctor, without popping the blisters', ca: 'Anar perquè la valori un metge, sense rebentar les butllofes' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Una quemadura extensa con ampollas grandes necesita valoración médica; las ampollas intactas protegen la piel nueva de debajo.',
              en: 'An extensive burn with large blisters needs medical evaluation; intact blisters protect the new skin underneath.',
              ca: 'Una cremada extensa amb butllofes grosses necessita valoració mèdica; les butllofes intactes protegeixen la pell nova de sota.',
            },
          },
          {
            texto: { es: 'Reventar las ampollas con una aguja para que baje la hinchazón', en: 'Pop the blisters with a needle to bring the swelling down', ca: 'Rebentar les butllofes amb una agulla perquè baixi la inflor' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Reventar una ampolla deja la piel nueva expuesta y aumenta mucho el riesgo de infección.',
              en: 'Popping a blister exposes the new skin and greatly increases the risk of infection.',
              ca: 'Rebentar una butllofa deixa la pell nova exposada i augmenta molt el risc d\'infecció.',
            },
          },
          {
            texto: { es: 'Quedarse en casa sin más, seguro que se cura sola', en: 'Just stay home, it\'ll surely heal on its own', ca: 'Quedar-se a casa sense més, segur que es cura sola' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Una quemadura extensa con ampollas grandes debe valorarla un profesional, no dejarla evolucionar sin supervisión.',
              en: 'An extensive burn with large blisters should be assessed by a professional, not left to develop unsupervised.',
              ca: 'Una cremada extensa amb butllofes grosses l\'ha de valorar un professional, no deixar-la evolucionar sense supervisió.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'desmayo',
    titulo: { es: 'Desmayo', en: 'Fainting', ca: 'Desmai' },
    emoji: '😵',
    situacionInicial: {
      texto: {
        es: 'Estás con un amigo cuando de repente se desploma y pierde el conocimiento un momento.',
        en: 'You\'re with a friend when they suddenly collapse and lose consciousness for a moment.',
        ca: 'Estàs amb un amic quan de sobte s\'ensorra i perd el coneixement un moment.',
      },
      icono: '😵',
    },
    pasos: [
      {
        id: 'p1', tipo: 'orden', posicionCorrecta: 1,
        texto: {
          es: 'Comprueba si responde: háblale y sacúdele suavemente por los hombros',
          en: 'Check if they respond: talk to them and gently shake their shoulders',
          ca: 'Comprova si respon: parla-li i sacseja\'l suaument per les espatlles',
        },
      },
      {
        id: 'd1', tipo: 'decision', posicionEnSecuencia: 2,
        pregunta: {
          es: 'No responde ni a tu voz ni al contacto.',
          en: 'They don\'t respond to your voice or touch.',
          ca: 'No respon ni a la teva veu ni al contacte.',
        },
        opciones: [
          {
            texto: { es: 'Comprobar si respira con normalidad, acercando la mejilla a su boca y mirando si el pecho se mueve', en: 'Check if they\'re breathing normally, by putting your cheek near their mouth and watching if the chest moves', ca: 'Comprovar si respira amb normalitat, acostant la galta a la seva boca i mirant si el pit es mou' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Antes de mover o colocar a alguien inconsciente hay que comprobar que respira con normalidad: de eso depende el siguiente paso.',
              en: 'Before moving or positioning someone unconscious, you need to check they\'re breathing normally: the next step depends on it.',
              ca: 'Abans de moure o col·locar algú inconscient cal comprovar que respira amb normalitat: d\'això depèn el següent pas.',
            },
          },
          {
            texto: { es: 'Darle una bofetada fuerte para que reaccione', en: 'Give them a hard slap to make them react', ca: 'Donar-li una bufetada forta perquè reaccioni' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Golpear a alguien inconsciente no ayuda a que reaccione y puede añadir una lesión innecesaria.',
              en: 'Hitting someone unconscious doesn\'t help them come round and can add an unnecessary injury.',
              ca: 'Colpejar algú inconscient no ajuda que reaccioni i pot afegir una lesió innecessària.',
            },
          },
          {
            texto: { es: 'Levantarlo y sentarlo apoyado contra la pared', en: 'Lift them up and sit them against a wall', ca: 'Aixecar-lo i asseure\'l recolzat contra la paret' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Antes de moverlo hay que comprobar la respiración: sentado, la vía aérea no queda tan protegida como tumbado de lado.',
              en: 'Before moving them, you need to check their breathing: sitting up doesn\'t protect the airway as well as lying on their side.',
              ca: 'Abans de moure\'l cal comprovar la respiració: assegut, la via aèria no queda tan protegida com ajagut de costat.',
            },
          },
        ],
      },
      {
        id: 'p2', tipo: 'orden', posicionCorrecta: 3,
        texto: {
          es: 'Como respira con normalidad, colócalo en posición lateral de seguridad',
          en: 'Since they\'re breathing normally, put them in the recovery position',
          ca: 'Com que respira amb normalitat, col·loca\'l en posició lateral de seguretat',
        },
      },
      {
        id: 'p3', tipo: 'orden', posicionCorrecta: 4,
        texto: {
          es: 'Afloja cualquier ropa apretada, como el cuello o el cinturón',
          en: 'Loosen any tight clothing, like the collar or belt',
          ca: 'Afluixa qualsevol roba ajustada, com el coll o el cinturó',
        },
      },
      {
        id: 'd2', tipo: 'decision', posicionEnSecuencia: 5,
        pregunta: {
          es: 'Al caer se ha golpeado la cabeza y notas un poco de sangre en el cuero cabelludo.',
          en: 'When they fell, they hit their head and you notice a little blood on their scalp.',
          ca: 'En caure s\'ha copejat el cap i notes una mica de sang al cuir cabellut.',
        },
        opciones: [
          {
            texto: { es: 'No moverlo bruscamente, controlar la sangre con presión suave y llamar al 112 si aparece alguna señal de alarma', en: 'Don\'t move them roughly, control the bleeding with gentle pressure, and call emergency services if any warning sign appears', ca: 'No moure\'l bruscament, controlar la sang amb pressió suau i trucar al 112 si apareix alguna senyal d\'alarma' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Con un golpe en la cabeza al caer, hay que evitar movimientos bruscos por si hay lesión en el cuello, y vigilar señales de alarma.',
              en: 'With a head injury from a fall, avoid rough movements in case there\'s a neck injury, and watch for warning signs.',
              ca: 'Amb un cop al cap en caure, cal evitar moviments bruscos per si hi ha lesió al coll, i vigilar senyals d\'alarma.',
            },
          },
          {
            texto: { es: 'Incorporarlo rápido y llevarlo a un sofá', en: 'Quickly sit them up and take them to a sofa', ca: 'Incorporar-lo ràpid i portar-lo a un sofà' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Mover bruscamente a alguien que se ha golpeado la cabeza puede agravar una posible lesión en el cuello o la columna.',
              en: 'Roughly moving someone who has hit their head can worsen a possible neck or spinal injury.',
              ca: 'Moure bruscament algú que s\'ha copejat el cap pot agreujar una possible lesió al coll o a la columna.',
            },
          },
          {
            texto: { es: 'Limpiar la herida frotando fuerte con agua oxigenada', en: 'Clean the wound by scrubbing hard with hydrogen peroxide', ca: 'Netejar la ferida fregant fort amb aigua oxigenada' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Frotar fuerte una herida en la cabeza puede empeorarla: se limpia con suavidad, sin frotar, y se prioriza vigilar señales de alarma.',
              en: 'Scrubbing a head wound hard can make it worse: clean gently without scrubbing, and prioritize watching for warning signs.',
              ca: 'Fregar fort una ferida al cap la pot empitjorar: es neteja amb suavitat, sense fregar, i es prioritza vigilar senyals d\'alarma.',
            },
          },
        ],
      },
      {
        id: 'p4', tipo: 'orden', posicionCorrecta: 6,
        texto: {
          es: 'Eleva ligeramente sus piernas, unos 30 centímetros, mientras se recupera',
          en: 'Slightly raise their legs, about 30 centimetres, while they recover',
          ca: 'Eleva lleugerament les seves cames, uns 30 centímetres, mentre es recupera',
        },
      },
      {
        id: 'd3', tipo: 'decision', posicionEnSecuencia: 7,
        pregunta: {
          es: 'Al cabo de un minuto recupera el conocimiento y empieza a hablar, pero dice que le duele mucho el pecho.',
          en: 'After a minute they regain consciousness and start talking, but say their chest hurts a lot.',
          ca: 'Al cap d\'un minut recupera el coneixement i comença a parlar, però diu que li fa molt mal el pit.',
        },
        opciones: [
          {
            texto: { es: 'Llamar al 112: el dolor de pecho tras un desmayo es una señal de alarma', en: 'Call emergency services: chest pain after fainting is a warning sign', ca: 'Trucar al 112: el dolor de pit després d\'un desmai és una senyal d\'alarma' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Un desmayo con dolor en el pecho al recuperarse no es un desmayo simple: hay que llamar a emergencias para descartar algo más grave.',
              en: 'Fainting with chest pain on recovery isn\'t a simple faint: call emergency services to rule out something more serious.',
              ca: 'Un desmai amb dolor al pit en recuperar-se no és un desmai simple: cal trucar a emergències per descartar alguna cosa més greu.',
            },
          },
          {
            texto: { es: 'Darle de comer y beber enseguida para que recupere fuerzas', en: 'Give them food and drink right away to regain their strength', ca: 'Donar-li de menjar i beure de seguida perquè recuperi forces' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Justo después de recuperar el conocimiento hay riesgo de atragantarse, y además se estaría ignorando una señal de alarma real.',
              en: 'Right after regaining consciousness there\'s a choking risk, and it would also mean ignoring a real warning sign.',
              ca: 'Just després de recuperar el coneixement hi ha risc d\'ennuegar-se, i a més s\'estaria ignorant una senyal d\'alarma real.',
            },
          },
          {
            texto: { es: 'Dejar que se levante enseguida y siga con lo que hacía', en: 'Let them get up right away and carry on with what they were doing', ca: 'Deixar que s\'aixequi de seguida i segueixi amb el que feia' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Restar importancia al dolor de pecho tras un desmayo retrasa una atención que puede ser urgente.',
              en: 'Dismissing chest pain after fainting delays care that could be urgent.',
              ca: 'Restar importància al dolor de pit després d\'un desmai retarda una atenció que pot ser urgent.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'corte',
    titulo: { es: 'Corte con sangrado', en: 'Cut with bleeding', ca: 'Tall amb sagnat' },
    emoji: '🔴',
    situacionInicial: {
      texto: {
        es: 'Un compañero se hace un corte profundo en el antebrazo con una herramienta y sangra abundantemente.',
        en: 'A coworker gets a deep cut on their forearm with a tool and is bleeding heavily.',
        ca: 'Un company es fa un tall profund a l\'avantbraç amb una eina i sagna abundantment.',
      },
      icono: '🔴',
    },
    pasos: [
      {
        id: 'p1', tipo: 'orden', posicionCorrecta: 1,
        texto: {
          es: 'Protégete las manos como puedas (guantes si los tienes) antes de tocar la herida',
          en: 'Protect your hands as best you can (gloves if you have them) before touching the wound',
          ca: 'Protegeix-te les mans com puguis (guants si en tens) abans de tocar la ferida',
        },
      },
      {
        id: 'p2', tipo: 'orden', posicionCorrecta: 2,
        texto: {
          es: 'Presiona la herida con fuerza usando un paño limpio o una gasa',
          en: 'Press firmly on the wound with a clean cloth or gauze',
          ca: 'Pressiona la ferida amb força fent servir un drap net o una gasa',
        },
      },
      {
        id: 'd1', tipo: 'decision', posicionEnSecuencia: 3,
        pregunta: {
          es: 'La gasa se empapa de sangre enseguida.',
          en: 'The gauze soaks through with blood right away.',
          ca: 'La gasa s\'amara de sang de seguida.',
        },
        opciones: [
          {
            texto: { es: 'Añadir más gasas encima sin retirar la primera, y seguir presionando', en: 'Add more gauze on top without removing the first layer, and keep pressing', ca: 'Afegir més gases a sobre sense retirar la primera, i seguir pressionant' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Retirar la gasa empapada puede romper el coágulo que se está formando: se añaden capas encima sin quitar la primera.',
              en: 'Removing the soaked gauze can break the clot that\'s forming: add layers on top without removing the first one.',
              ca: 'Retirar la gasa amarada pot trencar el coàgul que s\'està formant: s\'afegeixen capes a sobre sense treure la primera.',
            },
          },
          {
            texto: { es: 'Quitar la gasa empapada para poner una limpia', en: 'Remove the soaked gauze to put on a clean one', ca: 'Treure la gasa amarada per posar-ne una de neta' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Retirar la gasa que ya está haciendo presión puede romper el coágulo que se está formando y hacer que sangre más.',
              en: 'Removing gauze that\'s already applying pressure can break the forming clot and cause more bleeding.',
              ca: 'Retirar la gasa que ja fa pressió pot trencar el coàgul que s\'està formant i fer que sagni més.',
            },
          },
          {
            texto: { es: 'Lavar la herida con agua antes de seguir presionando', en: 'Wash the wound with water before continuing to press', ca: 'Rentar la ferida amb aigua abans de seguir pressionant' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Con una hemorragia activa, lo prioritario es no dejar de presionar: parar para lavar retrasa lo que de verdad importa ahora.',
              en: 'With active bleeding, the priority is to keep pressing: stopping to wash delays what really matters right now.',
              ca: 'Amb una hemorràgia activa, el prioritari és no deixar de pressionar: parar per rentar retarda el que de veritat importa ara.',
            },
          },
        ],
      },
      {
        id: 'p3', tipo: 'orden', posicionCorrecta: 4,
        texto: {
          es: 'Si puedes, eleva el brazo por encima del nivel del corazón mientras sigues presionando',
          en: 'If possible, raise the arm above heart level while you keep pressing',
          ca: 'Si pots, eleva el braç per sobre el nivell del cor mentre segueixes pressionant',
        },
      },
      {
        id: 'd2', tipo: 'decision', posicionEnSecuencia: 5,
        pregunta: {
          es: 'Después de varios minutos de presión firme, sigue sangrando mucho y ya has empapado varias gasas.',
          en: 'After several minutes of firm pressure, it\'s still bleeding heavily and you\'ve soaked through several dressings.',
          ca: 'Després de diversos minuts de pressió ferma, segueix sagnant molt i ja has amarat diverses gases.',
        },
        opciones: [
          {
            texto: { es: 'Seguir presionando con más fuerza y llamar al 112', en: 'Keep pressing harder and call emergency services', ca: 'Seguir pressionant amb més força i trucar al 112' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Si la presión directa no basta tras varios minutos, hay que reforzarla y pedir ayuda: es una hemorragia que no cede sola.',
              en: 'If direct pressure isn\'t enough after several minutes, reinforce it and call for help: this is bleeding that won\'t stop on its own.',
              ca: 'Si la pressió directa no n\'hi ha prou després de diversos minuts, cal reforçar-la i demanar ajuda: és una hemorràgia que no cedeix sola.',
            },
          },
          {
            texto: { es: 'Ponerle un torniquete en el brazo de inmediato', en: 'Put a tourniquet on the arm right away', ca: 'Posar-li un torniquet al braç de seguida' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'El torniquete es el último recurso, cuando la presión directa ya ha fallado del todo: antes de eso, se sigue presionando y se pide ayuda.',
              en: 'A tourniquet is the last resort, once direct pressure has completely failed: before that, keep pressing and call for help.',
              ca: 'El torniquet és l\'últim recurs, quan la pressió directa ja ha fallat del tot: abans d\'això, se segueix pressionant i es demana ajuda.',
            },
          },
          {
            texto: { es: 'Dejar de presionar un momento para ver si ya ha parado', en: 'Stop pressing for a moment to check if it has stopped', ca: 'Deixar de pressionar un moment per veure si ja ha parat' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Soltar la presión para "comprobar" interrumpe la coagulación que se está formando y puede hacer que sangre más.',
              en: 'Releasing pressure to "check" interrupts the clot that\'s forming and can make it bleed more.',
              ca: 'Deixar anar la pressió per "comprovar" interromp la coagulació que s\'està formant i pot fer que sagni més.',
            },
          },
        ],
      },
      {
        id: 'p4', tipo: 'orden', posicionCorrecta: 6,
        texto: {
          es: 'Cuando el sangrado esté controlado, cubre la herida con un vendaje sin apretar en exceso',
          en: 'Once the bleeding is under control, cover the wound with a bandage without wrapping too tightly',
          ca: 'Quan el sagnat estigui controlat, cobreix la ferida amb un embenat sense estrènyer en excés',
        },
      },
      {
        id: 'd3', tipo: 'decision', posicionEnSecuencia: 7,
        pregunta: {
          es: 'A pesar de todo, la hemorragia no para y ahora hay signos de mareo y palidez.',
          en: 'Despite everything, the bleeding won\'t stop and now there are signs of dizziness and paleness.',
          ca: 'Malgrat tot, l\'hemorràgia no para i ara hi ha signes de marejament i pal·lidesa.',
        },
        opciones: [
          {
            texto: { es: 'Aplicar ahora sí un torniquete por encima de la herida, anotar la hora y llamar al 112', en: 'Now apply a tourniquet above the wound, note the time, and call emergency services', ca: 'Aplicar ara sí un torniquet per sobre la ferida, anotar l\'hora i trucar al 112' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Con una hemorragia grave que no cede y signos de mareo y palidez, el torniquete ya está justificado como último recurso.',
              en: 'With severe bleeding that won\'t stop and signs of dizziness and paleness, a tourniquet is now justified as a last resort.',
              ca: 'Amb una hemorràgia greu que no cedeix i signes de marejament i pal·lidesa, el torniquet ja està justificat com a últim recurs.',
            },
          },
          {
            texto: { es: 'Esperar un poco más antes de hacer nada distinto', en: 'Wait a bit longer before doing anything different', ca: 'Esperar una mica més abans de fer res diferent' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Con signos de mareo y palidez, la persona puede estar entrando en shock por la pérdida de sangre: no es momento de esperar más.',
              en: 'With signs of dizziness and paleness, the person may be going into shock from blood loss: this is not the time to wait longer.',
              ca: 'Amb signes de marejament i pal·lidesa, la persona pot estar entrant en xoc per la pèrdua de sang: no és moment d\'esperar més.',
            },
          },
          {
            texto: { es: 'Aplicar el torniquete pero sin anotar la hora', en: 'Apply the tourniquet but without noting the time', ca: 'Aplicar el torniquet però sense anotar l\'hora' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'La hora es importante para el personal médico, que necesita saber cuánto tiempo lleva puesto el torniquete.',
              en: 'The time matters to medical staff, who need to know how long the tourniquet has been on.',
              ca: 'L\'hora és important pel personal mèdic, que necessita saber quant de temps porta posat el torniquet.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'picadura',
    titulo: { es: 'Picadura y alergia', en: 'Sting and allergy', ca: 'Picada i al·lèrgia' },
    emoji: '🐝',
    situacionInicial: {
      texto: {
        es: 'En un picnic, a alguien le pica una avispa en el brazo. Poco después, empieza a notar la garganta rara y le cuesta respirar.',
        en: 'At a picnic, a wasp stings someone\'s arm. Shortly after, their throat starts feeling odd and they struggle to breathe.',
        ca: 'En un pícnic, a algú li pica una vespa al braç. Poc després, comença a notar la gola estranya i li costa respirar.',
      },
      icono: '🐝',
    },
    pasos: [
      {
        id: 'p1', tipo: 'orden', posicionCorrecta: 1,
        texto: {
          es: 'Retira el aguijón raspando con un borde fino, sin apretar la zona',
          en: 'Remove the stinger by scraping it with a thin edge, without squeezing the area',
          ca: 'Retira l\'agulló raspant amb una vora fina, sense prémer la zona',
        },
      },
      {
        id: 'd1', tipo: 'decision', posicionEnSecuencia: 2,
        pregunta: {
          es: 'Se le empieza a hinchar la cara y respira con dificultad.',
          en: 'Their face starts swelling and they\'re breathing with difficulty.',
          ca: 'Se li comença a inflar la cara i respira amb dificultat.',
        },
        opciones: [
          {
            texto: { es: 'Llamar al 112 de inmediato: son señales de una reacción alérgica grave (anafilaxia)', en: 'Call emergency services immediately: these are signs of a severe allergic reaction (anaphylaxis)', ca: 'Trucar al 112 de seguida: són senyals d\'una reacció al·lèrgica greu (anafilaxi)' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Hinchazón facial y dificultad para respirar tras una picadura son señales de anafilaxia: hay que llamar a emergencias ya.',
              en: 'Facial swelling and breathing trouble after a sting are signs of anaphylaxis: call emergency services now.',
              ca: 'Inflor facial i dificultat per respirar després d\'una picada són senyals d\'anafilaxi: cal trucar a emergències ja.',
            },
          },
          {
            texto: { es: 'Darle un antihistamínico y esperar a ver si mejora en casa', en: 'Give them an antihistamine and wait to see if they improve at home', ca: 'Donar-li un antihistamínic i esperar a veure si millora a casa' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Un antihistamínico no basta ante una anafilaxia: hace falta adrenalina y atención de emergencias, no esperar en casa.',
              en: 'An antihistamine isn\'t enough for anaphylaxis: it needs adrenaline and emergency care, not waiting at home.',
              ca: 'Un antihistamínic no n\'hi ha prou davant una anafilaxi: cal adrenalina i atenció d\'emergències, no esperar a casa.',
            },
          },
          {
            texto: { es: 'Aplicar hielo en la picadura y esperar un poco más', en: 'Apply ice to the sting and wait a bit longer', ca: 'Aplicar gel a la picada i esperar una mica més' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Con hinchazón facial y dificultad para respirar, el hielo en la picadura no es la prioridad: hay que llamar a emergencias ya.',
              en: 'With facial swelling and breathing trouble, ice on the sting isn\'t the priority: call emergency services now.',
              ca: 'Amb inflor facial i dificultat per respirar, el gel a la picada no és la prioritat: cal trucar a emergències ja.',
            },
          },
        ],
      },
      {
        id: 'p2', tipo: 'orden', posicionCorrecta: 3,
        texto: {
          es: 'Pregunta si lleva un autoinyector de adrenalina encima',
          en: 'Ask if they carry an adrenaline auto-injector',
          ca: 'Pregunta si porta un autoinjector d\'adrenalina a sobre',
        },
      },
      {
        id: 'd2', tipo: 'decision', posicionEnSecuencia: 4,
        pregunta: {
          es: 'Sí lleva un autoinyector de adrenalina.',
          en: 'They do carry an adrenaline auto-injector.',
          ca: 'Sí que porta un autoinjector d\'adrenalina.',
        },
        opciones: [
          {
            texto: { es: 'Ayudarle a usarlo de inmediato, inyectando en el lateral del muslo', en: 'Help them use it immediately, injecting into the side of the thigh', ca: 'Ajudar-lo a fer-lo servir de seguida, injectant al lateral de la cuixa' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'El tratamiento esencial de la anafilaxia es la adrenalina, y es fundamental administrarla cuanto antes.',
              en: 'The essential treatment for anaphylaxis is adrenaline, and it\'s crucial to give it as soon as possible.',
              ca: 'El tractament essencial de l\'anafilaxi és l\'adrenalina, i és fonamental administrar-la com abans millor.',
            },
          },
          {
            texto: { es: 'Esperar a que lleguen los servicios de emergencia sin usarlo', en: 'Wait for emergency services to arrive without using it', ca: 'Esperar que arribin els serveis d\'emergència sense fer-lo servir' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Esperar sin usar la adrenalina disponible pierde un tiempo crucial: se administra ya, mientras llega ayuda.',
              en: 'Waiting without using the available adrenaline wastes crucial time: give it now, while help is on the way.',
              ca: 'Esperar sense fer servir l\'adrenalina disponible perd un temps crucial: s\'administra ja, mentre arriba ajuda.',
            },
          },
          {
            texto: { es: 'Guardarlo para dárselo al personal sanitario cuando llegue', en: 'Keep it to hand over to medical staff when they arrive', ca: 'Guardar-lo per donar-lo al personal sanitari quan arribi' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'El autoinyector está pensado para usarse en el momento, no para guardarlo: cada minuto sin adrenalina importa.',
              en: 'The auto-injector is meant to be used right away, not saved: every minute without adrenaline matters.',
              ca: 'L\'autoinjector està pensat per fer-se servir en el moment, no per guardar-lo: cada minut sense adrenalina importa.',
            },
          },
        ],
      },
      {
        id: 'p3', tipo: 'orden', posicionCorrecta: 5,
        texto: {
          es: 'Túmbale con las piernas algo elevadas, salvo que le cueste respirar, en cuyo caso mantenlo semisentado',
          en: 'Lay them down with legs slightly raised, unless they\'re struggling to breathe, in which case keep them semi-sitting',
          ca: 'Estira\'l amb les cames una mica elevades, tret que li costi respirar, i en aquest cas mantén-lo semiassegut',
        },
      },
      {
        id: 'd3', tipo: 'decision', posicionEnSecuencia: 6,
        pregunta: {
          es: 'Han pasado 10 minutos desde la primera dosis y sigue con dificultad para respirar.',
          en: '10 minutes have passed since the first dose and they\'re still struggling to breathe.',
          ca: 'Han passat 10 minuts des de la primera dosi i segueix amb dificultat per respirar.',
        },
        opciones: [
          {
            texto: { es: 'Ponerle una segunda dosis de adrenalina si tiene otra disponible', en: 'Give a second dose of adrenaline if another one is available', ca: 'Posar-li una segona dosi d\'adrenalina si en té una altra disponible' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Si no mejora entre 5 y 15 minutos, se puede repetir la dosis de adrenalina si hay una disponible, sin dejar de esperar a emergencias.',
              en: 'If there\'s no improvement within 5 to 15 minutes, the adrenaline dose can be repeated if one is available, while still waiting for emergency services.',
              ca: 'Si no millora entre 5 i 15 minuts, es pot repetir la dosi d\'adrenalina si n\'hi ha una disponible, sense deixar d\'esperar emergències.',
            },
          },
          {
            texto: { es: 'Pensar que una dosis siempre basta y no hacer nada más', en: 'Assume one dose is always enough and do nothing else', ca: 'Pensar que una dosi sempre n\'hi ha prou i no fer res més' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'A veces hace falta una segunda dosis si los síntomas no mejoran: no actuar puede dejar a la persona sin el tratamiento que necesita.',
              en: 'Sometimes a second dose is needed if symptoms don\'t improve: not acting can leave the person without the treatment they need.',
              ca: 'De vegades cal una segona dosi si els símptomes no milloren: no actuar pot deixar la persona sense el tractament que necessita.',
            },
          },
          {
            texto: { es: 'Darle agua para que se calme', en: 'Give them water to calm down', ca: 'Donar-li aigua perquè es calmi' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Con dificultad para respirar, dar agua puede hacer que se atragante, y no sustituye la adrenalina que hace falta.',
              en: 'With breathing difficulty, giving water can cause choking, and it doesn\'t replace the adrenaline that\'s needed.',
              ca: 'Amb dificultat per respirar, donar aigua pot fer que s\'ennuegui, i no substitueix l\'adrenalina que cal.',
            },
          },
        ],
      },
    ],
  },
]
