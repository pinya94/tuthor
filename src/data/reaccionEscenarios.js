// ── Reacción: escenarios encadenados (arcade) ───────────────────────────────
// Cada escenario es una secuencia de fases: cada fase es una decisión de 4
// opciones con destello de color al elegir (igual que un caso suelto), pero
// al resolverla se avanza automáticamente a la fase siguiente del MISMO
// escenario en vez de volver al mazo — así se nota la progresión real de una
// emergencia ("5 golpes sin éxito → toca Heimlich → si pierde el
// conocimiento → toca RCP").
//
// Una opción puede llevar `saltaEscenario: true`: representa un error de
// seguridad de la propia escena (por ejemplo, acercarte a una carretera sin
// comprobar el tráfico). Elegirla corta el escenario ahí mismo — no hay
// fases siguientes, la explicación dice por qué ya no puedes seguir
// ayudando — pero la partida continúa con el siguiente escenario.
//
// Contenido contrastado con Cruz Roja, Mayo Clinic, MedlinePlus y SEMES
// (mismas fuentes que reaccionCasos.js y primerosAuxiliosEscenarios.js).
// TODO(revisión sanitaria): que lo revise alguien con formación oficial en
// primeros auxilios antes de publicar.

export const ESCENARIOS = [
  {
    id: 'atragantamiento',
    titulo: { es: 'Atragantamiento', en: 'Choking', ca: 'Ennuegament' },
    pasos: [
      {
        situacion: {
          es: 'Un amigo se lleva las manos al cuello mientras come: no puede hablar ni toser bien. ¿Qué haces primero?',
          en: 'A friend grabs their throat while eating: they can\'t speak or cough properly. What do you do first?',
          ca: 'Un amic es porta les mans al coll mentre menja: no pot parlar ni tossir bé. Què fas primer?',
        },
        opciones: [
          { texto: { es: 'Confirmar en voz alta si se está atragantando y si puede toser', en: 'Confirm out loud whether they\'re choking and if they can cough', ca: 'Confirmar en veu alta si s\'està ennuegant i si pot tossir' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Antes de actuar hay que distinguir obstrucción parcial (tose, puede hablar) de total: el protocolo es distinto en cada caso.', en: 'Before acting you need to tell partial obstruction (coughing, can speak) apart from total: the protocol differs for each.', ca: 'Abans d\'actuar cal distingir obstrucció parcial (tus, pot parlar) de total: el protocol és diferent en cada cas.' } },
          { texto: { es: 'Darle golpes en la espalda de inmediato', en: 'Give them back blows right away', ca: 'Donar-li cops a l\'esquena de seguida' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Sin saber si es obstrucción parcial o total, los golpes son prematuros: primero se confirma.', en: 'Without knowing if it\'s partial or total obstruction, blows are premature: confirm first.', ca: 'Sense saber si és obstrucció parcial o total, els cops són prematurs: primer es confirma.' } },
          { texto: { es: 'Ofrecerle agua para que trague mejor', en: 'Offer them water to help it go down', ca: 'Oferir-li aigua perquè s\'empassi millor' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'El agua puede desplazar el objeto y agravar la obstrucción: nunca se ofrece líquido durante un atragantamiento.', en: 'Water can shift the object and worsen the obstruction: never offer liquid during choking.', ca: 'L\'aigua pot desplaçar l\'objecte i agreujar l\'obstrucció: mai s\'ofereix líquid durant un ennuegament.' } },
          { texto: { es: 'Hacerle la maniobra de Heimlich sin comprobar nada', en: 'Do the Heimlich maneuver without checking anything', ca: 'Fer-li la maniobra de Heimlich sense comprovar res' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Actuar sin confirmar primero puede ser innecesario o incluso perjudicial si en realidad puede toser.', en: 'Acting without confirming first can be unnecessary or even harmful if they can actually still cough.', ca: 'Actuar sense confirmar primer pot ser innecessari o fins i tot perjudicial si en realitat encara pot tossir.' } },
        ],
      },
      {
        situacion: {
          es: 'No responde con palabras, no tose y hace gestos de ahogo. ¿Qué haces?',
          en: 'They don\'t answer, can\'t cough, and are gesturing that they\'re choking. What do you do?',
          ca: 'No respon amb paraules, no tus i fa gestos d\'ofec. Què fas?',
        },
        opciones: [
          { texto: { es: 'Actuar de inmediato: empezar a darle golpes en la espalda', en: 'Act immediately: start giving back blows', ca: 'Actuar de seguida: començar a donar-li cops a l\'esquena' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Sin tos ni entrada de aire es una obstrucción total: hay que actuar ya, no esperar.', en: 'No cough and no air movement means total obstruction: act now, don\'t wait.', ca: 'Sense tos ni entrada d\'aire és una obstrucció total: cal actuar ja, no esperar.' } },
          { texto: { es: 'Darle un vaso de agua', en: 'Give them a glass of water', ca: 'Donar-li un got d\'aigua' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'El agua puede agravar la obstrucción de la vía aérea. Nunca se ofrece líquido durante un atragantamiento.', en: 'Water can worsen the airway obstruction. Never offer liquid during choking.', ca: 'L\'aigua pot agreujar l\'obstrucció de la via aèria. Mai s\'ofereix líquid durant un ennuegament.' } },
          { texto: { es: 'Esperar un poco a ver si se le pasa solo', en: 'Wait a bit to see if it passes on its own', ca: 'Esperar una mica a veure si se li passa sol' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Con obstrucción total, cada segundo cuenta: esperar retrasa la maniobra de desobstrucción.', en: 'With total obstruction, every second counts: waiting delays the maneuver.', ca: 'Amb obstrucció total, cada segon compta: esperar retarda la maniobra de desobstrucció.' } },
          { texto: { es: 'Sentarlo y decirle que respire hondo', en: 'Sit them down and tell them to breathe deeply', ca: 'Asseure\'l i dir-li que respiri fons' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Con la vía aérea bloqueada no puede respirar hondo aunque quiera: hace falta actuar, no pedirle calma.', en: 'With the airway blocked they can\'t breathe deeply no matter what: action is needed, not asking for calm.', ca: 'Amb la via aèria bloquejada no pot respirar fons encara que vulgui: cal actuar, no demanar-li calma.' } },
        ],
      },
      {
        situacion: {
          es: 'Le has dado 5 golpes en la espalda y sigue sin poder respirar. ¿Qué haces?',
          en: 'You\'ve given 5 back blows and they still can\'t breathe. What do you do?',
          ca: 'Li has donat 5 cops a l\'esquena i encara no pot respirar. Què fas?',
        },
        opciones: [
          { texto: { es: 'Pasar a las compresiones abdominales (maniobra de Heimlich)', en: 'Move on to abdominal thrusts (Heimlich maneuver)', ca: 'Passar a les compressions abdominals (maniobra de Heimlich)' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Si los golpes en la espalda no liberan la vía aérea, el protocolo pasa a compresiones abdominales.', en: 'If back blows don\'t clear the airway, the protocol moves on to abdominal thrusts.', ca: 'Si els cops a l\'esquena no alliberen la via aèria, el protocol passa a compressions abdominals.' } },
          { texto: { es: 'Meterle los dedos en la boca a ciegas', en: 'Blindly sweep their mouth with your fingers', ca: 'Ficar-li els dits a la boca a cegues' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Buscar el objeto a ciegas puede empujarlo más adentro y bloquear aún más la vía aérea.', en: 'Blindly fishing for the object can push it further in and block the airway even more.', ca: 'Buscar l\'objecte a cegues el pot empènyer més endins i bloquejar encara més la via aèria.' } },
          { texto: { es: 'Repetir los golpes en la espalda otras 5 veces', en: 'Repeat back blows 5 more times', ca: 'Repetir els cops a l\'esquena 5 vegades més' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'El protocolo alterna 5 golpes y 5 compresiones, no repite solo golpes indefinidamente.', en: 'The protocol alternates 5 blows and 5 thrusts, not blows on repeat.', ca: 'El protocol alterna 5 cops i 5 compressions, no repeteix només cops indefinidament.' } },
          { texto: { es: 'Darle la vuelta y ponerlo boca arriba a esperar', en: 'Turn them onto their back and wait', ca: 'Girar-lo boca amunt i esperar' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Esperar sin actuar retrasa el protocolo que puede liberar la vía aérea.', en: 'Waiting without acting delays the protocol that can clear the airway.', ca: 'Esperar sense actuar retarda el protocol que pot alliberar la via aèria.' } },
        ],
      },
      {
        situacion: {
          es: 'A mitad de las compresiones abdominales, pierde el conocimiento. ¿Qué haces?',
          en: 'Midway through the abdominal thrusts, they lose consciousness. What do you do?',
          ca: 'A mig de les compressions abdominals, perd el coneixement. Què fas?',
        },
        opciones: [
          { texto: { es: 'Tumbarlo en el suelo, llamar al 112 e iniciar RCP', en: 'Lay them on the ground, call emergency services and start CPR', ca: 'Estirar-lo a terra, trucar al 112 i iniciar la RCP' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Ante la pérdida de conciencia, el protocolo es avisar a emergencias e iniciar reanimación cardiopulmonar.', en: 'When consciousness is lost, alert emergency services and start CPR.', ca: 'Davant la pèrdua de coneixement, el protocol és avisar emergències i iniciar la reanimació cardiopulmonar.' } },
          { texto: { es: 'Seguir las compresiones abdominales de pie', en: 'Keep doing abdominal thrusts standing up', ca: 'Seguir fent les compressions abdominals dret' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'De pie no tiene sentido ni es seguro con la persona inconsciente: hay que tumbarla y pasar a RCP.', en: 'Standing thrusts make no sense and aren\'t safe once unconscious: lay them down and switch to CPR.', ca: 'Dret no té sentit ni és segur amb la persona inconscient: cal estirar-la i passar a RCP.' } },
          { texto: { es: 'Esperar a que reaccione antes de llamar', en: 'Wait for them to come round before calling', ca: 'Esperar que reaccioni abans de trucar' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Ante una pérdida de conciencia hay que llamar a emergencias de inmediato, no esperar.', en: 'When consciousness is lost you call emergency services immediately, not wait.', ca: 'Davant una pèrdua de coneixement cal trucar a emergències de seguida, no esperar.' } },
          { texto: { es: 'Sentarlo en una silla y darle aire', en: 'Sit them in a chair and fan them', ca: 'Asseure\'l en una cadira i fer-li aire' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Inconsciente, sentarlo no protege la vía aérea ni sustituye la RCP que hace falta ya.', en: 'Unconscious, sitting them up doesn\'t protect the airway or replace the CPR that\'s needed now.', ca: 'Inconscient, asseure\'l no protegeix la via aèria ni substitueix la RCP que cal ja.' } },
        ],
      },
    ],
  },

  {
    id: 'quemadura',
    titulo: { es: 'Quemadura', en: 'Burn', ca: 'Cremada' },
    pasos: [
      {
        situacion: {
          es: 'Se le vuelca una olla de agua hirviendo en el antebrazo. Ya lo has apartado del calor. La piel está muy roja y empiezan a salir ampollas. ¿Qué haces?',
          en: 'A pot of boiling water spills onto their forearm. You\'ve already moved them away from the heat. The skin is very red and blisters are starting. What do you do?',
          ca: 'Se li vessa una olla d\'aigua bullint a l\'avantbraç. Ja l\'has apartat de la calor. La pell està molt vermella i comencen a sortir butllofes. Què fas?',
        },
        opciones: [
          { texto: { es: 'Poner la zona bajo agua fría del grifo cuanto antes', en: 'Put the area under cool tap water as soon as possible', ca: 'Posar la zona sota aigua freda de l\'aixeta com abans millor' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'El agua fría corriendo reduce el daño en el tejido cuanto antes se aplique.', en: 'Cool running water reduces tissue damage the sooner it\'s applied.', ca: 'L\'aigua freda corrent redueix el dany al teixit com abans s\'apliqui.' } },
          { texto: { es: 'Aplicar hielo directamente sobre la quemadura', en: 'Apply ice directly to the burn', ca: 'Aplicar gel directament sobre la cremada' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'El frío extremo del hielo puede lesionar aún más el tejido ya dañado.', en: 'The extreme cold of ice can injure the already-damaged tissue even more.', ca: 'El fred extrem del gel pot lesionar encara més el teixit ja malmès.' } },
          { texto: { es: 'Esperar a ver si mejora sola', en: 'Wait to see if it improves on its own', ca: 'Esperar a veure si millora sola' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Cuanto antes se enfríe la quemadura, menos daño se acumula: esperar empeora el resultado.', en: 'The sooner the burn is cooled, the less damage accumulates: waiting makes it worse.', ca: 'Com abans es refredi la cremada, menys dany s\'acumula: esperar empitjora el resultat.' } },
          { texto: { es: 'Ponerle una pomada del botiquín sin consultar antes', en: 'Put on an ointment from the medicine cabinet without checking first', ca: 'Posar-hi una pomada de la farmaciola sense consultar abans' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Sin saber si es adecuada, mejor no improvisar: el agua fría es lo primero, siempre.', en: 'Without knowing if it\'s appropriate, better not to improvise: cool water always comes first.', ca: 'Sense saber si és adequada, millor no improvisar: l\'aigua freda és el primer, sempre.' } },
        ],
      },
      {
        situacion: {
          es: 'Lleva el agua puesta un rato. Alguien te sugiere ponerle pasta de dientes o mantequilla para el escozor. ¿Qué haces?',
          en: 'The water\'s been running a while. Someone suggests toothpaste or butter for the sting. What do you do?',
          ca: 'Porta l\'aigua posada una estona. Algú et suggereix posar-hi pasta de dents o mantega per l\'escalfor. Què fas?',
        },
        opciones: [
          { texto: { es: 'No poner nada casero: seguir solo con agua', en: 'Don\'t put anything home-made on it: stick with water', ca: 'No posar-hi res casolà: seguir només amb aigua' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Aceites, pomadas caseras y pasta de dientes irritan la lesión y aumentan el riesgo de infección.', en: 'Oils, home remedies and toothpaste irritate the wound and raise the infection risk.', ca: 'Olis, pomades casolanes i pasta de dents irriten la lesió i augmenten el risc d\'infecció.' } },
          { texto: { es: 'Ponerle mantequilla o pasta de dientes', en: 'Put butter or toothpaste on it', ca: 'Posar-hi mantega o pasta de dents' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Son remedios caseros sin base médica que empeoran la herida y pueden favorecer una infección.', en: 'These are home remedies with no medical basis that make the wound worse and can encourage infection.', ca: 'Són remeis casolans sense base mèdica que empitjoren la ferida i poden afavorir una infecció.' } },
          { texto: { es: 'Ponerle una pomada del botiquín sin consultar antes', en: 'Put on an ointment from the medicine cabinet without checking first', ca: 'Posar-hi una pomada de la farmaciola sense consultar abans' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Sin indicación médica, mejor no improvisar mientras el agua sigue haciendo su trabajo.', en: 'Without medical guidance, better not to improvise while the water keeps doing its job.', ca: 'Sense indicació mèdica, millor no improvisar mentre l\'aigua segueix fent la seva feina.' } },
          { texto: { es: 'Cubrir con papel de aluminio para que enfríe más rápido', en: 'Cover with aluminium foil to cool it faster', ca: 'Cobrir amb paper d\'alumini perquè refredi més ràpid' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'El papel de aluminio no enfría nada y solo interrumpe el único tratamiento que sí funciona: el agua.', en: 'Aluminium foil doesn\'t cool anything and just interrupts the one treatment that actually works: water.', ca: 'El paper d\'alumini no refreda res i només interromp l\'únic tractament que sí funciona: l\'aigua.' } },
        ],
      },
      {
        situacion: {
          es: 'Le han salido varias ampollas grandes y la quemadura ocupa buena parte del antebrazo. ¿Qué haces?',
          en: 'Several large blisters have appeared and the burn covers a good part of the forearm. What do you do?',
          ca: 'Li han sortit diverses butllofes grosses i la cremada ocupa bona part de l\'avantbraç. Què fas?',
        },
        opciones: [
          { texto: { es: 'Acudir a que la valore un médico, sin reventar las ampollas', en: 'Get it checked by a doctor, without popping the blisters', ca: 'Anar perquè la valori un metge, sense rebentar les butllofes' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Una quemadura extensa con ampollas grandes necesita valoración médica; las ampollas intactas protegen la piel de debajo.', en: 'An extensive burn with large blisters needs medical evaluation; intact blisters protect the skin underneath.', ca: 'Una cremada extensa amb butllofes grosses necessita valoració mèdica; les butllofes intactes protegeixen la pell de sota.' } },
          { texto: { es: 'Reventarlas con una aguja para que baje la hinchazón', en: 'Pop them with a needle to bring the swelling down', ca: 'Rebentar-les amb una agulla perquè baixi la inflor' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Reventar una ampolla expone la piel nueva y aumenta mucho el riesgo de infección.', en: 'Popping a blister exposes the new skin and greatly increases the infection risk.', ca: 'Rebentar una butllofa exposa la pell nova i augmenta molt el risc d\'infecció.' } },
          { texto: { es: 'Quedarse en casa sin más', en: 'Just stay home', ca: 'Quedar-se a casa sense més' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Una quemadura extensa con ampollas grandes debe valorarla un profesional.', en: 'An extensive burn with large blisters should be assessed by a professional.', ca: 'Una cremada extensa amb butllofes grosses l\'ha de valorar un professional.' } },
          { texto: { es: 'Cubrirla con un vendaje muy apretado para protegerla', en: 'Cover it with a very tight bandage to protect it', ca: 'Cobrir-la amb un embenat molt estret per protegir-la' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Un vendaje muy apretado sobre una zona hinchada puede cortar la circulación.', en: 'A very tight bandage over a swollen area can cut off circulation.', ca: 'Un embenat molt estret sobre una zona inflada pot tallar la circulació.' } },
        ],
      },
    ],
  },

  {
    id: 'corte',
    titulo: { es: 'Corte con sangrado', en: 'Cut with bleeding', ca: 'Tall amb sagnat' },
    pasos: [
      {
        situacion: {
          es: 'Un compañero se hace un corte profundo en el antebrazo con una herramienta y sangra mucho. ¿Qué haces primero?',
          en: 'A coworker gets a deep cut on their forearm with a tool and is bleeding heavily. What do you do first?',
          ca: 'Un company es fa un tall profund a l\'avantbraç amb una eina i sagna molt. Què fas primer?',
        },
        opciones: [
          { texto: { es: 'Presionar la herida con fuerza con un paño limpio', en: 'Press firmly on the wound with a clean cloth', ca: 'Pressionar la ferida amb força amb un drap net' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'La presión directa es la primera acción ante cualquier sangrado: permite que la sangre coagule.', en: 'Direct pressure is the first response to any bleeding: it lets the blood clot.', ca: 'La pressió directa és la primera acció davant qualsevol sagnat: permet que la sang coaguli.' } },
          { texto: { es: 'Ponerle un torniquete de inmediato', en: 'Put a tourniquet on right away', ca: 'Posar-li un torniquet de seguida' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'El torniquete es el último recurso: primero se prueba con presión directa.', en: 'A tourniquet is the last resort: direct pressure comes first.', ca: 'El torniquet és l\'últim recurs: primer es prova amb pressió directa.' } },
          { texto: { es: 'Lavar la herida con agua antes de nada', en: 'Wash the wound with water before anything else', ca: 'Rentar la ferida amb aigua abans de res' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Con una hemorragia activa, lo prioritario es no dejar de presionar: lavar puede esperar.', en: 'With active bleeding, the priority is to keep pressing: washing can wait.', ca: 'Amb una hemorràgia activa, el prioritari és no deixar de pressionar: rentar pot esperar.' } },
          { texto: { es: 'Elevarle el brazo sin presionar la herida', en: 'Raise the arm without pressing on the wound', ca: 'Alçar el braç sense pressionar la ferida' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Elevar ayuda, pero no sustituye la presión directa, que es lo esencial.', en: 'Raising helps, but it doesn\'t replace direct pressure, which is essential.', ca: 'Alçar ajuda, però no substitueix la pressió directa, que és l\'essencial.' } },
        ],
      },
      {
        situacion: {
          es: 'La gasa se empapa de sangre enseguida. ¿Qué haces?',
          en: 'The gauze soaks through with blood right away. What do you do?',
          ca: 'La gasa s\'amara de sang de seguida. Què fas?',
        },
        opciones: [
          { texto: { es: 'Añadir más gasas encima sin retirar la primera', en: 'Add more gauze on top without removing the first', ca: 'Afegir més gases a sobre sense retirar la primera' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Retirar la gasa empapada puede romper el coágulo que se está formando.', en: 'Removing the soaked gauze can break the forming clot.', ca: 'Retirar la gasa amarada pot trencar el coàgul que s\'està formant.' } },
          { texto: { es: 'Quitar la gasa empapada para poner una limpia', en: 'Remove the soaked gauze to put on a clean one', ca: 'Treure la gasa amarada per posar-ne una de neta' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Retirar la gasa que ya hace presión puede romper el coágulo y hacer que sangre más.', en: 'Removing gauze that\'s already pressing can break the clot and cause more bleeding.', ca: 'Retirar la gasa que ja fa pressió pot trencar el coàgul i fer que sagni més.' } },
          { texto: { es: 'Lavar la herida con agua antes de seguir presionando', en: 'Wash the wound with water before continuing to press', ca: 'Rentar la ferida amb aigua abans de seguir pressionant' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Con hemorragia activa, no se interrumpe la presión para lavar.', en: 'With active bleeding, you don\'t interrupt pressure to wash.', ca: 'Amb hemorràgia activa, no s\'interromp la pressió per rentar.' } },
          { texto: { es: 'Dejar de presionar un momento para comprobar', en: 'Stop pressing for a moment to check', ca: 'Deixar de pressionar un moment per comprovar' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Soltar la presión para "comprobar" interrumpe la coagulación y puede hacer que sangre más.', en: 'Releasing pressure to "check" interrupts clotting and can make it bleed more.', ca: 'Deixar anar la pressió per "comprovar" interromp la coagulació i pot fer que sagni més.' } },
        ],
      },
      {
        situacion: {
          es: 'Tras varios minutos de presión firme, sigue sangrando mucho. ¿Qué haces?',
          en: 'After several minutes of firm pressure, it\'s still bleeding heavily. What do you do?',
          ca: 'Després de diversos minuts de pressió ferma, segueix sagnant molt. Què fas?',
        },
        opciones: [
          { texto: { es: 'Seguir presionando con más fuerza y llamar al 112', en: 'Keep pressing harder and call emergency services', ca: 'Seguir pressionant amb més força i trucar al 112' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Si la presión no basta tras varios minutos, hay que reforzarla y pedir ayuda.', en: 'If pressure isn\'t enough after several minutes, reinforce it and call for help.', ca: 'Si la pressió no n\'hi ha prou després de diversos minuts, cal reforçar-la i demanar ajuda.' } },
          { texto: { es: 'Ponerle un torniquete de inmediato', en: 'Put a tourniquet on right away', ca: 'Posar-li un torniquet de seguida' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'El torniquete se reserva para cuando la presión directa falla del todo y hay signos de shock: aún no es el caso.', en: 'A tourniquet is reserved for when direct pressure fails completely and there are signs of shock: not yet the case.', ca: 'El torniquet es reserva per quan la pressió directa falla del tot i hi ha signes de xoc: encara no és el cas.' } },
          { texto: { es: 'Dejar de presionar para ver si ya ha parado', en: 'Stop pressing to see if it has stopped', ca: 'Deixar de pressionar per veure si ja ha parat' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Soltar la presión interrumpe la coagulación que se está formando.', en: 'Releasing pressure interrupts the clot that\'s forming.', ca: 'Deixar anar la pressió interromp la coagulació que s\'està formant.' } },
          { texto: { es: 'Elevar el brazo y dejar de presionar', en: 'Raise the arm and stop pressing', ca: 'Alçar el braç i deixar de pressionar' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Elevar sin presionar no corta una hemorragia que no ha cedido con presión directa.', en: 'Raising without pressing doesn\'t stop bleeding that hasn\'t responded to direct pressure.', ca: 'Alçar sense pressionar no talla una hemorràgia que no ha cedit amb pressió directa.' } },
        ],
      },
      {
        situacion: {
          es: 'A pesar de todo, la hemorragia no para y aparecen signos de mareo y palidez. ¿Qué haces?',
          en: 'Despite everything, the bleeding won\'t stop and signs of dizziness and paleness appear. What do you do?',
          ca: 'Malgrat tot, l\'hemorràgia no para i apareixen signes de marejament i pal·lidesa. Què fas?',
        },
        opciones: [
          { texto: { es: 'Aplicar ahora sí un torniquete, anotar la hora y llamar al 112', en: 'Now apply a tourniquet, note the time, and call emergency services', ca: 'Aplicar ara sí un torniquet, anotar l\'hora i trucar al 112' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Con hemorragia grave que no cede y signos de shock, el torniquete ya está justificado.', en: 'With severe bleeding that won\'t stop and signs of shock, a tourniquet is now justified.', ca: 'Amb hemorràgia greu que no cedeix i signes de xoc, el torniquet ja està justificat.' } },
          { texto: { es: 'Esperar un poco más antes de hacer nada distinto', en: 'Wait a bit longer before doing anything different', ca: 'Esperar una mica més abans de fer res diferent' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Con signos de shock, la persona no puede esperar más: hay que actuar ya.', en: 'With signs of shock, the person can\'t wait any longer: act now.', ca: 'Amb signes de xoc, la persona no pot esperar més: cal actuar ja.' } },
          { texto: { es: 'Aplicar el torniquete pero sin anotar la hora', en: 'Apply the tourniquet but without noting the time', ca: 'Aplicar el torniquet però sense anotar l\'hora' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'La hora es importante para el personal médico, que necesita saber cuánto tiempo lleva puesto.', en: 'The time matters to medical staff, who need to know how long it\'s been on.', ca: 'L\'hora és important pel personal mèdic, que necessita saber quant de temps porta posat.' } },
          { texto: { es: 'Aflojar la presión para que descanse la zona', en: 'Ease off the pressure to let the area rest', ca: 'Afluixar la pressió perquè descansi la zona' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Con signos de shock, aflojar la única medida que frena la hemorragia empeora la situación.', en: 'With signs of shock, easing off the one thing slowing the bleeding makes things worse.', ca: 'Amb signes de xoc, afluixar l\'única mesura que frena l\'hemorràgia empitjora la situació.' } },
        ],
      },
    ],
  },

  {
    id: 'picadura',
    titulo: { es: 'Picadura y alergia', en: 'Sting and allergy', ca: 'Picada i al·lèrgia' },
    pasos: [
      {
        situacion: {
          es: 'En un picnic, a alguien le pica una avispa en el brazo. ¿Qué haces primero?',
          en: 'At a picnic, a wasp stings someone\'s arm. What do you do first?',
          ca: 'En un pícnic, a algú li pica una vespa al braç. Què fas primer?',
        },
        opciones: [
          { texto: { es: 'Retirar el aguijón raspando, sin apretar la zona', en: 'Remove the stinger by scraping, without squeezing the area', ca: 'Retirar l\'agulló raspant, sense prémer la zona' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Raspar con un borde fino saca el aguijón sin apretar el saco de veneno.', en: 'Scraping with a thin edge removes the stinger without squeezing the venom sac.', ca: 'Raspar amb una vora fina treu l\'agulló sense prémer el sac de verí.' } },
          { texto: { es: 'Apretar la zona para sacar el veneno', en: 'Squeeze the area to get the venom out', ca: 'Prémer la zona per treure el verí' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Apretar puede inyectar más veneno del saco: mejor raspar que apretar.', en: 'Squeezing can inject more venom from the sac: scraping beats squeezing.', ca: 'Prémer pot injectar més verí del sac: millor raspar que prémer.' } },
          { texto: { es: 'Ponerle hielo directo mucho rato', en: 'Put ice directly on it for a long time', ca: 'Posar-hi gel directe molta estona' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'El frío corto alivia, pero mucho rato de hielo directo puede dañar la piel sin necesidad.', en: 'Brief cold helps, but a long time of direct ice can needlessly damage the skin.', ca: 'El fred curt alleuja, però molta estona de gel directe pot danyar la pell sense necessitat.' } },
          { texto: { es: 'Darle un antihistamínico antes de mirar nada más', en: 'Give an antihistamine before checking anything else', ca: 'Donar-li un antihistamínic abans de mirar res més' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Antes de medicar, lo primero es retirar el aguijón y vigilar cómo evoluciona.', en: 'Before medicating, the first thing is to remove the stinger and watch how it develops.', ca: 'Abans de medicar, el primer és retirar l\'agulló i vigilar com evoluciona.' } },
        ],
      },
      {
        situacion: {
          es: 'Poco después, se le empieza a hinchar la cara y respira con dificultad. ¿Qué haces?',
          en: 'Shortly after, their face starts swelling and they\'re struggling to breathe. What do you do?',
          ca: 'Poc després, se li comença a inflar la cara i respira amb dificultat. Què fas?',
        },
        opciones: [
          { texto: { es: 'Llamar al 112 de inmediato: son señales de anafilaxia', en: 'Call emergency services immediately: these are signs of anaphylaxis', ca: 'Trucar al 112 de seguida: són senyals d\'anafilaxi' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Hinchazón facial y dificultad para respirar tras una picadura son señales de anafilaxia.', en: 'Facial swelling and breathing trouble after a sting are signs of anaphylaxis.', ca: 'Inflor facial i dificultat per respirar després d\'una picada són senyals d\'anafilaxi.' } },
          { texto: { es: 'Darle un antihistamínico y esperar en casa', en: 'Give an antihistamine and wait at home', ca: 'Donar-li un antihistamínic i esperar a casa' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Un antihistamínico no basta ante una anafilaxia: hace falta adrenalina y emergencias.', en: 'An antihistamine isn\'t enough for anaphylaxis: it needs adrenaline and emergency care.', ca: 'Un antihistamínic no n\'hi ha prou davant una anafilaxi: cal adrenalina i emergències.' } },
          { texto: { es: 'Aplicar hielo y esperar un poco más', en: 'Apply ice and wait a bit longer', ca: 'Aplicar gel i esperar una mica més' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Con hinchazón facial y dificultad para respirar, el hielo no es la prioridad: hay que llamar ya.', en: 'With facial swelling and breathing trouble, ice isn\'t the priority: call now.', ca: 'Amb inflor facial i dificultat per respirar, el gel no és la prioritat: cal trucar ja.' } },
          { texto: { es: 'Darle agua para que se calme', en: 'Give them water to calm down', ca: 'Donar-li aigua perquè es calmi' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Con dificultad para respirar, dar agua puede hacer que se atragante.', en: 'With breathing difficulty, giving water can cause choking.', ca: 'Amb dificultat per respirar, donar aigua pot fer que s\'ennuegui.' } },
        ],
      },
      {
        situacion: {
          es: 'Sí lleva un autoinyector de adrenalina encima. ¿Qué haces?',
          en: 'They do carry an adrenaline auto-injector. What do you do?',
          ca: 'Sí que porta un autoinjector d\'adrenalina a sobre. Què fas?',
        },
        opciones: [
          { texto: { es: 'Ayudarle a usarlo de inmediato, en el lateral del muslo', en: 'Help them use it immediately, in the side of the thigh', ca: 'Ajudar-lo a fer-lo servir de seguida, al lateral de la cuixa' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'El tratamiento esencial de la anafilaxia es la adrenalina cuanto antes.', en: 'The essential treatment for anaphylaxis is adrenaline as soon as possible.', ca: 'El tractament essencial de l\'anafilaxi és l\'adrenalina com abans millor.' } },
          { texto: { es: 'Esperar a que lleguen los servicios de emergencia sin usarlo', en: 'Wait for emergency services without using it', ca: 'Esperar que arribin els serveis d\'emergència sense fer-lo servir' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Esperar sin usar la adrenalina disponible pierde un tiempo crucial.', en: 'Waiting without using the available adrenaline wastes crucial time.', ca: 'Esperar sense fer servir l\'adrenalina disponible perd un temps crucial.' } },
          { texto: { es: 'Guardarlo para dárselo al personal sanitario', en: 'Keep it to hand to medical staff', ca: 'Guardar-lo per donar-lo al personal sanitari' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'El autoinyector está pensado para usarse en el momento, no para guardarlo.', en: 'The auto-injector is meant to be used right away, not saved.', ca: 'L\'autoinjector està pensat per fer-se servir en el moment, no per guardar-lo.' } },
          { texto: { es: 'Usarlo solo si pierde el conocimiento', en: 'Only use it if they lose consciousness', ca: 'Fer-lo servir només si perd el coneixement' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'No hace falta esperar a que empeore tanto: con estos síntomas ya toca usarlo.', en: 'There\'s no need to wait for it to get that much worse: with these symptoms it\'s already time to use it.', ca: 'No cal esperar que empitjori tant: amb aquests símptomes ja toca fer-lo servir.' } },
        ],
      },
      {
        situacion: {
          es: 'Han pasado 10 minutos desde la primera dosis y sigue con dificultad para respirar. ¿Qué haces?',
          en: '10 minutes have passed since the first dose and they\'re still struggling to breathe. What do you do?',
          ca: 'Han passat 10 minuts des de la primera dosi i segueix amb dificultat per respirar. Què fas?',
        },
        opciones: [
          { texto: { es: 'Ponerle una segunda dosis si tiene otra disponible', en: 'Give a second dose if another is available', ca: 'Posar-li una segona dosi si en té una altra disponible' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Si no mejora entre 5 y 15 minutos, se puede repetir la dosis si hay una disponible.', en: 'If there\'s no improvement within 5 to 15 minutes, the dose can be repeated if one is available.', ca: 'Si no millora entre 5 i 15 minuts, es pot repetir la dosi si n\'hi ha una disponible.' } },
          { texto: { es: 'Pensar que una dosis siempre basta', en: 'Assume one dose is always enough', ca: 'Pensar que una dosi sempre n\'hi ha prou' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'A veces hace falta una segunda dosis si los síntomas no mejoran.', en: 'Sometimes a second dose is needed if symptoms don\'t improve.', ca: 'De vegades cal una segona dosi si els símptomes no milloren.' } },
          { texto: { es: 'Darle agua para que se calme', en: 'Give them water to calm down', ca: 'Donar-li aigua perquè es calmi' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Con dificultad para respirar, dar agua puede hacer que se atragante y no sustituye la adrenalina.', en: 'With breathing difficulty, water can cause choking and doesn\'t replace adrenaline.', ca: 'Amb dificultat per respirar, donar aigua pot fer que s\'ennuegui i no substitueix l\'adrenalina.' } },
          { texto: { es: 'Esperar más tiempo antes de repetir la dosis', en: 'Wait longer before repeating the dose', ca: 'Esperar més temps abans de repetir la dosi' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Pasados los 5-15 minutos sin mejora, esperar más solo retrasa un tratamiento que ya toca.', en: 'Past 5-15 minutes without improvement, waiting longer only delays treatment that\'s already due.', ca: 'Passats els 5-15 minuts sense millora, esperar més només retarda un tractament que ja toca.' } },
        ],
      },
    ],
  },

  {
    id: 'desmayo',
    titulo: { es: 'Desmayo', en: 'Fainting', ca: 'Desmai' },
    pasos: [
      {
        situacion: {
          es: 'Estás con un amigo cuando de repente se desploma y pierde el conocimiento. ¿Qué haces primero?',
          en: 'You\'re with a friend when they suddenly collapse and lose consciousness. What do you do first?',
          ca: 'Estàs amb un amic quan de sobte s\'ensorra i perd el coneixement. Què fas primer?',
        },
        opciones: [
          { texto: { es: 'Comprobar si responde: hablarle y sacudirle los hombros', en: 'Check if they respond: talk to them and shake their shoulders', ca: 'Comprovar si respon: parlar-li i sacsejar-li les espatlles' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Antes de mover o colocar a alguien inconsciente hay que comprobar si responde.', en: 'Before moving or positioning someone unconscious, check if they respond.', ca: 'Abans de moure o col·locar algú inconscient cal comprovar si respon.' } },
          { texto: { es: 'Darle una bofetada fuerte', en: 'Give them a hard slap', ca: 'Donar-li una bufetada forta' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Golpear a alguien inconsciente no ayuda a que reaccione y puede añadir una lesión.', en: 'Hitting someone unconscious doesn\'t help them come round and can add an injury.', ca: 'Colpejar algú inconscient no ajuda que reaccioni i pot afegir una lesió.' } },
          { texto: { es: 'Levantarlo y sentarlo contra la pared', en: 'Lift them up and sit them against a wall', ca: 'Aixecar-lo i asseure\'l contra la paret' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Antes de moverlo hay que comprobar cómo está: sentado, la vía aérea queda menos protegida.', en: 'Before moving them, check their state first: sitting up protects the airway less.', ca: 'Abans de moure\'l cal comprovar com està: assegut, la via aèria queda menys protegida.' } },
          { texto: { es: 'Darle de beber para que reaccione', en: 'Give them something to drink to wake them up', ca: 'Donar-li de beure perquè reaccioni' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Nunca se da de beber a alguien inconsciente: puede atragantarse.', en: 'Never give a drink to someone unconscious: they could choke.', ca: 'Mai es dona de beure a algú inconscient: es pot ennuegar.' } },
        ],
      },
      {
        situacion: {
          es: 'No responde, pero compruebas que respira con normalidad. ¿Qué haces?',
          en: 'They don\'t respond, but you check they\'re breathing normally. What do you do?',
          ca: 'No respon, però comproves que respira amb normalitat. Què fas?',
        },
        opciones: [
          { texto: { es: 'Colocarlo en posición lateral de seguridad', en: 'Put them in the recovery position', ca: 'Col·locar-lo en posició lateral de seguretat' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Con respiración normal, la posición lateral de seguridad mantiene la vía aérea libre.', en: 'With normal breathing, the recovery position keeps the airway clear.', ca: 'Amb respiració normal, la posició lateral de seguretat manté la via aèria lliure.' } },
          { texto: { es: 'Dejarlo boca arriba y esperar', en: 'Leave them on their back and wait', ca: 'Deixar-lo boca amunt i esperar' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Boca arriba la vía aérea queda menos protegida que de lado.', en: 'On their back, the airway is less protected than on their side.', ca: 'Boca amunt la via aèria queda menys protegida que de costat.' } },
          { texto: { es: 'Sentarlo doblado hacia delante', en: 'Sit them bent forward', ca: 'Asseure\'l doblegat cap endavant' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Inconsciente, sentarlo no es tan seguro como la posición lateral tumbada.', en: 'Unconscious, sitting them up isn\'t as safe as the lying recovery position.', ca: 'Inconscient, asseure\'l no és tan segur com la posició lateral ajaguda.' } },
          { texto: { es: 'Darle de beber para que despierte antes', en: 'Give them a drink to wake up faster', ca: 'Donar-li de beure perquè es desperti abans' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Inconsciente, dar de beber tiene riesgo real de atragantamiento.', en: 'Unconscious, giving a drink has a real choking risk.', ca: 'Inconscient, donar de beure té risc real d\'ennuegament.' } },
        ],
      },
      {
        situacion: {
          es: 'Al cabo de un minuto recupera el conocimiento pero dice que le duele mucho el pecho. ¿Qué haces?',
          en: 'After a minute they regain consciousness but say their chest hurts a lot. What do you do?',
          ca: 'Al cap d\'un minut recupera el coneixement però diu que li fa molt mal el pit. Què fas?',
        },
        opciones: [
          { texto: { es: 'Llamar al 112: el dolor de pecho tras un desmayo es señal de alarma', en: 'Call emergency services: chest pain after fainting is a warning sign', ca: 'Trucar al 112: el dolor de pit després d\'un desmai és senyal d\'alarma' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Un desmayo con dolor en el pecho al recuperarse no es un desmayo simple.', en: 'Fainting with chest pain on recovery isn\'t a simple faint.', ca: 'Un desmai amb dolor al pit en recuperar-se no és un desmai simple.' } },
          { texto: { es: 'Darle de comer y beber para que recupere fuerzas', en: 'Give them food and drink to regain strength', ca: 'Donar-li de menjar i beure perquè recuperi forces' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Justo tras recuperar el conocimiento hay riesgo de atragantarse, y se ignoraría una señal real.', en: 'Right after regaining consciousness there\'s a choking risk, and it ignores a real warning sign.', ca: 'Just després de recuperar el coneixement hi ha risc d\'ennuegar-se, i s\'ignoraria una senyal real.' } },
          { texto: { es: 'Dejar que se levante enseguida y siga con lo suyo', en: 'Let them get up right away and carry on', ca: 'Deixar que s\'aixequi de seguida i segueixi amb el seu' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Restar importancia al dolor de pecho retrasa una atención que puede ser urgente.', en: 'Dismissing chest pain delays care that could be urgent.', ca: 'Restar importància al dolor de pit retarda una atenció que pot ser urgent.' } },
          { texto: { es: 'Esperar un rato a ver si se pasa el dolor', en: 'Wait a while to see if the pain passes', ca: 'Esperar una estona a veure si es passa el dolor' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'El dolor de pecho tras un desmayo no se espera a que se pase solo.', en: 'Chest pain after fainting isn\'t something you wait out.', ca: 'El dolor de pit després d\'un desmai no s\'espera que se li passi sol.' } },
        ],
      },
    ],
  },

  {
    id: 'motorista',
    titulo: { es: 'Accidente de moto', en: 'Motorcycle accident', ca: 'Accident de moto' },
    pasos: [
      {
        situacion: {
          es: 'Un motorista se cae en una carretera con tráfico circulando cerca. Está consciente y se queja de dolor en la pierna. ¿Qué haces?',
          en: 'A motorcyclist falls on a road with traffic passing nearby. They\'re conscious and complaining of leg pain. What do you do?',
          ca: 'Un motorista cau en una carretera amb trànsit circulant a prop. Està conscient i es queixa de dolor a la cama. Què fas?',
        },
        opciones: [
          { texto: { es: 'Comprobar que no hay peligro (tráfico) y señalizar la zona antes de acercarte', en: 'Check there\'s no danger (traffic) and mark the area before approaching', ca: 'Comprovar que no hi ha perill (trànsit) i senyalitzar la zona abans d\'acostar-t\'hi' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Proteger la escena es siempre el primer paso: sin eso, quien socorre puede convertirse en una segunda víctima.', en: 'Protecting the scene always comes first: without it, the rescuer can become a second victim.', ca: 'Protegir l\'escena és sempre el primer pas: sense això, qui socorre pot convertir-se en una segona víctima.' } },
          { texto: { es: 'Acercarte directamente a auxiliarle, sin comprobar el tráfico', en: 'Go straight to help them, without checking the traffic', ca: 'Acostar-t\'hi directament per auxiliar-lo, sense comprovar el trànsit' }, esCorrecta: false, esPeligrosa: true, saltaEscenario: true, explicacion: { es: 'Te has acercado sin comprobar el tráfico ni señalizar: podrías haber sido atropellado tú también. Ahora tú también estás herido y no puedes ni ayudarle ni pedir ayuda. Proteger la escena va siempre antes que socorrer.', en: 'You approached without checking traffic or marking the scene: you could have been hit too. Now you\'re injured as well, and you can\'t help them or call for help. Protecting the scene always comes before rescuing.', ca: 'T\'has acostat sense comprovar el trànsit ni senyalitzar: podries haver estat atropellat tu també. Ara tu també estàs ferit i no pots ni ajudar-lo ni demanar ajuda. Protegir l\'escena va sempre abans que socórrer.' } },
          { texto: { es: 'Quitarle el casco para que esté más cómodo', en: 'Remove his helmet so he\'s more comfortable', ca: 'Treure-li el casc perquè estigui més còmode' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'El casco solo lo retira personal sanitario, salvo que impida respirar: quitarlo sin necesidad puede dañar el cuello.', en: 'Only medical staff should remove the helmet, unless it\'s blocking breathing: removing it unnecessarily can injure the neck.', ca: 'El casc només el retira personal sanitari, tret que impedeixi respirar: treure\'l sense necessitat pot malmetre el coll.' } },
          { texto: { es: 'Quedarte parado esperando a que alguien más pare', en: 'Just stand there waiting for someone else to stop', ca: 'Quedar-te aturat esperant que algú més pari' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Esperar sin hacer nada retrasa la ayuda: comprobar la seguridad y señalizar no cuesta nada y protege a todos.', en: 'Waiting and doing nothing delays help: checking safety and marking the area costs nothing and protects everyone.', ca: 'Esperar sense fer res retarda l\'ajuda: comprovar la seguretat i senyalitzar no costa res i protegeix tothom.' } },
        ],
      },
      {
        situacion: {
          es: 'Ya con la zona señalizada, te acercas: no responde a tu voz pero respira con normalidad. Lleva el casco puesto. ¿Qué haces?',
          en: 'With the area now marked, you approach: they don\'t respond to your voice but are breathing normally. Still wearing their helmet. What do you do?',
          ca: 'Ja amb la zona senyalitzada, t\'hi acostes: no respon a la teva veu però respira amb normalitat. Porta el casc posat. Què fas?',
        },
        opciones: [
          { texto: { es: 'No tocarle el casco ni moverlo, y llamar al 112 mientras lo vigilas', en: 'Don\'t touch the helmet or move him, and call emergency services while watching him', ca: 'No tocar-li el casc ni moure\'l, i trucar al 112 mentre el vigiles' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Si respira con normalidad no hace falta tocar el casco ni moverlo: solo avisar y vigilar.', en: 'If he\'s breathing normally there\'s no need to touch the helmet or move him: just alert and watch.', ca: 'Si respira amb normalitat no cal tocar el casc ni moure\'l: només avisar i vigilar.' } },
          { texto: { es: 'Quitarle el casco para comprobar si reacciona', en: 'Remove the helmet to check if he responds', ca: 'Treure-li el casc per comprovar si reacciona' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Con respiración normal no hay motivo para tocar el casco: añade riesgo de lesión cervical.', en: 'With normal breathing there\'s no reason to touch the helmet: it adds a risk of neck injury.', ca: 'Amb respiració normal no hi ha motiu per tocar el casc: afegeix risc de lesió cervical.' } },
          { texto: { es: 'Zarandearlo con fuerza para que despierte', en: 'Shake him hard to wake him up', ca: 'Sacsejar-lo fort perquè es desperti' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Zarandear a alguien con posible lesión de columna puede agravarla seriamente.', en: 'Shaking someone with a possible spinal injury can seriously worsen it.', ca: 'Sacsejar algú amb possible lesió de columna la pot agreujar seriosament.' } },
          { texto: { es: 'Moverlo a la acera para que no estorbe', en: 'Move him onto the pavement so he\'s not in the way', ca: 'Moure\'l a la vorera perquè no faci nosa' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Sin peligro inmediato ya (la zona está señalizada), no se mueve a alguien con posibles lesiones.', en: 'Without immediate danger now (the area is marked), you don\'t move someone with possible injuries.', ca: 'Sense perill immediat ja (la zona està senyalitzada), no es mou algú amb possibles lesions.' } },
        ],
      },
    ],
  },

  {
    id: 'hipoglucemia',
    titulo: { es: 'Hipoglucemia', en: 'Hypoglycemia', ca: 'Hipoglucèmia' },
    pasos: [
      {
        situacion: {
          es: 'Una persona diabética suda frío, tiembla y está confusa, pero consciente y puede tragar. ¿Qué haces?',
          en: 'Someone with diabetes is cold and sweaty, shaky and confused, but conscious and able to swallow. What do you do?',
          ca: 'Una persona diabètica sua fred, tremola i està confusa, però conscient i pot empassar. Què fas?',
        },
        opciones: [
          { texto: { es: 'Darle azúcar de absorción rápida: zumo, un azucarillo', en: 'Give fast-acting sugar: juice, a sugar cube', ca: 'Donar-li sucre d\'absorció ràpida: suc, un sucrat' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Son síntomas de hipoglucemia: consciente y pudiendo tragar, se da azúcar rápido.', en: 'These are hypoglycemia symptoms: while conscious and able to swallow, give fast sugar.', ca: 'Són símptomes d\'hipoglucèmia: conscient i podent empassar, es dona sucre ràpid.' } },
          { texto: { es: 'Ponerle su dosis de insulina', en: 'Give them their insulin dose', ca: 'Posar-li la seva dosi d\'insulina' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'El azúcar ya está bajo: la insulina lo bajaría todavía más y puede ser gravísimo.', en: 'Blood sugar is already low: insulin would lower it further and can be very serious.', ca: 'El sucre ja és baix: la insulina el baixaria encara més i pot ser molt greu.' } },
          { texto: { es: 'Esperar a que se le pase solo', en: 'Wait for it to pass on its own', ca: 'Esperar que se li passi sol' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Sin azúcar, la hipoglucemia puede empeorar hasta la pérdida de conciencia.', en: 'Without sugar, hypoglycemia can worsen into loss of consciousness.', ca: 'Sense sucre, la hipoglucèmia pot empitjorar fins a la pèrdua de coneixement.' } },
          { texto: { es: 'Darle un café para que se espabile', en: 'Give them a coffee to perk up', ca: 'Donar-li un cafè perquè s\'espavili' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'El café no sube el azúcar en sangre: hace falta azúcar de verdad, no cafeína.', en: 'Coffee doesn\'t raise blood sugar: real sugar is needed, not caffeine.', ca: 'El cafè no puja el sucre en sang: cal sucre de veritat, no cafeïna.' } },
        ],
      },
      {
        situacion: {
          es: 'No mejora y acaba perdiendo el conocimiento. ¿Qué haces?',
          en: 'They don\'t improve and end up losing consciousness. What do you do?',
          ca: 'No millora i acaba perdent el coneixement. Què fas?',
        },
        opciones: [
          { texto: { es: 'Posición lateral de seguridad y llamar al 112, sin darle nada por la boca', en: 'Recovery position and call emergency services, without giving anything by mouth', ca: 'Posició lateral de seguretat i trucar al 112, sense donar-li res per la boca' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Inconsciente no se le da nada de comer ni beber: se coloca de lado y se llama a emergencias.', en: 'Unconscious, they shouldn\'t be given anything to eat or drink: put them on their side and call.', ca: 'Inconscient no se li dona res de menjar ni beure: es col·loca de costat i es truca a emergències.' } },
          { texto: { es: 'Meterle azúcar o zumo en la boca aunque esté inconsciente', en: 'Put sugar or juice in their mouth even though unconscious', ca: 'Ficar-li sucre o suc a la boca encara que estigui inconscient' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Dar de comer o beber a alguien inconsciente puede hacer que se atragante.', en: 'Giving food or drink to someone unconscious can make them choke.', ca: 'Donar de menjar o beure a algú inconscient pot fer que s\'ennuegui.' } },
          { texto: { es: 'Esperar a que despierte sola', en: 'Wait for them to wake up on their own', ca: 'Esperar que es desperti sola' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Una hipoglucemia con pérdida de conciencia es una emergencia: hay que llamar ya.', en: 'Hypoglycemia with loss of consciousness is an emergency: call now.', ca: 'Una hipoglucèmia amb pèrdua de coneixement és una emergència: cal trucar ja.' } },
          { texto: { es: 'Ponerle su insulina para intentar estabilizarla', en: 'Give them insulin to try to stabilise them', ca: 'Posar-li la insulina per intentar estabilitzar-la' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'La insulina bajaría aún más un azúcar ya peligrosamente bajo.', en: 'Insulin would lower an already dangerously low blood sugar even further.', ca: 'La insulina baixaria encara més un sucre ja perillosament baix.' } },
        ],
      },
    ],
  },

  {
    id: 'ahogamiento',
    titulo: { es: 'Ahogamiento', en: 'Drowning', ca: 'Ofegament' },
    pasos: [
      {
        situacion: {
          es: 'Sacas a alguien de la piscina: no responde y no respira con normalidad. ¿Qué haces?',
          en: 'You pull someone out of the pool: they don\'t respond and aren\'t breathing normally. What do you do?',
          ca: 'Treus algú de la piscina: no respon i no respira amb normalitat. Què fas?',
        },
        opciones: [
          { texto: { es: 'Empezar la RCP de inmediato y que alguien llame al 112', en: 'Start CPR immediately and have someone call emergency services', ca: 'Començar la RCP de seguida i que algú truqui al 112' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Sin respiración normal, lo prioritario es empezar la RCP ya, sin retrasarla.', en: 'Without normal breathing, the priority is to start CPR right away, without delay.', ca: 'Sense respiració normal, el prioritari és començar la RCP ja, sense retardar-la.' } },
          { texto: { es: 'Ponerlo boca abajo para que expulse el agua antes', en: 'Lay them face down to expel the water first', ca: 'Posar-lo boca avall perquè expulsi l\'aigua abans' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Intentar sacar el agua primero retrasa la RCP, que es lo que puede salvarle la vida.', en: 'Trying to drain the water first delays CPR, which is what can save their life.', ca: 'Intentar treure l\'aigua primer retarda la RCP, que és el que li pot salvar la vida.' } },
          { texto: { es: 'Esperar unos minutos a ver si reacciona', en: 'Wait a few minutes to see if they come round', ca: 'Esperar uns minuts a veure si reacciona' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Sin respiración, cada minuto sin RCP reduce mucho las opciones.', en: 'Without breathing, every minute without CPR greatly reduces the chances.', ca: 'Sense respiració, cada minut sense RCP redueix molt les opcions.' } },
          { texto: { es: 'Darle golpes en la espalda como si se atragantara', en: 'Give back blows as if they were choking', ca: 'Donar-li cops a l\'esquena com si s\'ennueguéssim' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'No respira con normalidad tras salir del agua: lo que hace falta es RCP, no golpes de atragantamiento.', en: 'Not breathing normally after coming out of the water: what\'s needed is CPR, not choking blows.', ca: 'No respira amb normalitat després de sortir de l\'aigua: el que cal és RCP, no cops d\'ennuegament.' } },
        ],
      },
      {
        situacion: {
          es: 'Tras un rato de RCP, empieza a toser y a respirar por sí solo. ¿Qué haces?',
          en: 'After a while of CPR, they start coughing and breathing on their own. What do you do?',
          ca: 'Després d\'una estona de RCP, comença a tossir i a respirar per si sol. Què fas?',
        },
        opciones: [
          { texto: { es: 'Colocarlo en posición lateral de seguridad y seguir vigilándolo hasta que llegue ayuda', en: 'Put them in the recovery position and keep watching until help arrives', ca: 'Col·locar-lo en posició lateral de seguretat i seguir vigilant-lo fins que arribi ajuda' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Al recuperar la respiración se coloca de lado y se sigue vigilando: puede haber complicaciones después.', en: 'Once breathing returns they\'re put on their side and watched: complications can appear later.', ca: 'En recuperar la respiració es col·loca de costat i se segueix vigilant: hi pot haver complicacions després.' } },
          { texto: { es: 'Darle de beber agua para que se recupere', en: 'Give them water to drink to help recover', ca: 'Donar-li aigua per beure perquè es recuperi' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Justo tras recuperar la respiración hay riesgo de atragantarse con cualquier líquido.', en: 'Right after breathing returns there\'s a choking risk with any liquid.', ca: 'Just després de recuperar la respiració hi ha risc d\'ennuegar-se amb qualsevol líquid.' } },
          { texto: { es: 'Dejar de llamar a emergencias, ya que ha mejorado', en: 'Stop calling emergency services since they\'ve improved', ca: 'Deixar de trucar a emergències, ja que ha millorat' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Un casi ahogamiento puede tener complicaciones horas después: siempre hace falta valoración médica.', en: 'A near-drowning can have complications hours later: medical evaluation is always needed.', ca: 'Un quasi ofegament pot tenir complicacions hores després: sempre cal valoració mèdica.' } },
          { texto: { es: 'Sentarlo enseguida y que camine un poco', en: 'Sit them up right away and have them walk a bit', ca: 'Asseure\'l de seguida i que camini una mica' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Justo después de una RCP conviene dejarlo tumbado y tranquilo, no ponerlo a caminar.', en: 'Right after CPR it\'s best to keep them lying down and calm, not walking around.', ca: 'Just després d\'una RCP convé deixar-lo ajagut i tranquil, no posar-lo a caminar.' } },
        ],
      },
    ],
  },

  {
    id: 'golpe-cabeza-nino',
    titulo: { es: 'Golpe en la cabeza (niño)', en: 'Head bump (child)', ca: 'Cop al cap (nen)' },
    pasos: [
      {
        situacion: {
          es: 'Un niño se golpea la cabeza jugando en el parque. Llora un momento pero enseguida vuelve a jugar. ¿Qué haces?',
          en: 'A child bumps his head playing in the park. He cries for a moment but soon goes back to playing. What do you do?',
          ca: 'Un nen es colpeja el cap jugant al parc. Plora un moment però de seguida torna a jugar. Què fas?',
        },
        opciones: [
          { texto: { es: 'Tranquilizarlo y vigilarlo en casa las horas siguientes', en: 'Calm him down and watch him at home over the next few hours', ca: 'Tranquil·litzar-lo i vigilar-lo a casa les hores següents' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Sin pérdida de conocimiento y volviendo a jugar con normalidad, basta con vigilarlo por si aparecen señales de alarma.', en: 'Without loss of consciousness and playing normally again, it\'s enough to watch him for warning signs.', ca: 'Sense pèrdua de coneixement i tornant a jugar amb normalitat, n\'hi ha prou amb vigilar-lo per si apareixen senyals d\'alarma.' } },
          { texto: { es: 'Llevarlo a urgencias ahora mismo por si acaso', en: 'Take him to the ER right away just in case', ca: 'Portar-lo a urgències ara mateix per si de cas' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Sin señales de alarma, no hace falta urgencias: basta con observarlo en casa.', en: 'Without warning signs, the ER isn\'t needed: watching him at home is enough.', ca: 'Sense senyals d\'alarma, no cal urgències: n\'hi ha prou amb observar-lo a casa.' } },
          { texto: { es: 'No pensar más en ello', en: 'Not think about it again', ca: 'No tornar-hi a pensar' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Aunque parezca leve, conviene vigilarlo las horas siguientes por si aparecen señales de alarma.', en: 'Even if it seems mild, he should be watched over the next few hours in case warning signs appear.', ca: 'Encara que sembli lleu, convé vigilar-lo les hores següents per si apareixen senyals d\'alarma.' } },
          { texto: { es: 'Darle un analgésico fuerte enseguida', en: 'Give him a strong painkiller right away', ca: 'Donar-li un analgèsic fort de seguida' }, esCorrecta: false, esPeligrosa: false, explicacion: { es: 'Sin dolor importante ni indicación médica, no hace falta medicar de entrada: mejor observar primero.', en: 'Without significant pain or medical guidance, there\'s no need to medicate right away: better to observe first.', ca: 'Sense dolor important ni indicació mèdica, no cal medicar d\'entrada: millor observar primer.' } },
        ],
      },
      {
        situacion: {
          es: 'Un rato después, vomita dos veces y está muy somnoliento, distinto de lo normal. ¿Qué haces?',
          en: 'A while later, he vomits twice and is very drowsy, unlike his usual self. What do you do?',
          ca: 'Una estona després, vomita dues vegades i està molt somnolent, diferent del normal. Què fas?',
        },
        opciones: [
          { texto: { es: 'Llevarlo a urgencias ahora: son señales de alarma', en: 'Take him to the ER now: these are warning signs', ca: 'Portar-lo a urgències ara: són senyals d\'alarma' }, esCorrecta: true, esPeligrosa: false, explicacion: { es: 'Vómitos repetidos y somnolencia excesiva tras un golpe en la cabeza requieren valoración médica sin esperar.', en: 'Repeated vomiting and excessive drowsiness after a head bump need medical evaluation without delay.', ca: 'Vòmits repetits i somnolència excessiva després d\'un cop al cap requereixen valoració mèdica sense esperar.' } },
          { texto: { es: 'Dejarlo dormir mucho, seguro que solo está cansado', en: 'Let him sleep a lot, he\'s probably just tired', ca: 'Deixar-lo dormir molt, segur que només està cansat' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Confundir señales de alarma con cansancio puede retrasar la detección de una lesión interna importante.', en: 'Mistaking warning signs for tiredness can delay detecting a significant internal injury.', ca: 'Confondre senyals d\'alarma amb cansament pot retardar la detecció d\'una lesió interna important.' } },
          { texto: { es: 'Darle de comer para que recupere fuerzas', en: 'Give him food to regain his strength', ca: 'Donar-li de menjar perquè recuperi forces' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Con vómitos y señales de alarma, lo prioritario es buscar atención médica, no darle de comer.', en: 'With vomiting and warning signs, the priority is seeking medical attention, not feeding him.', ca: 'Amb vòmits i senyals d\'alarma, el prioritari és buscar atenció mèdica, no donar-li de menjar.' } },
          { texto: { es: 'Esperar a ver si se le pasa por la noche', en: 'Wait to see if it passes overnight', ca: 'Esperar a veure si se li passa a la nit' }, esCorrecta: false, esPeligrosa: true, explicacion: { es: 'Con estas señales de alarma no se espera a la noche: hace falta valorarlo ya.', en: 'With these warning signs you don\'t wait until night: he needs to be assessed now.', ca: 'Amb aquestes senyals d\'alarma no s\'espera a la nit: cal valorar-lo ja.' } },
        ],
      },
    ],
  },
]
