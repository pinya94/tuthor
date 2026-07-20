// ── Casos rápidos de "Reacción" (arcade estilo Papers, Please) ──────────────
// Cada caso es una situación corta + 2-4 acciones puras (sin mezclar el
// síntoma dentro de la opción). Sin explicaciones a mitad de partida: el
// jugador ve un destello de color y pasa al siguiente caso; las
// explicaciones se guardan para el resumen final.
//
// Contenido contrastado con Cruz Roja Española, Mayo Clinic y MedlinePlus.
// TODO(revisión sanitaria): que lo revise alguien con formación oficial en
// primeros auxilios antes de publicar — esto es material educativo, no un
// sustituto.

export const DISCLAIMER = {
  es: 'Este juego es educativo y no sustituye una formación oficial en primeros auxilios.',
  en: 'This game is educational and does not replace official first-aid training.',
  ca: 'Aquest joc és educatiu i no substitueix una formació oficial en primers auxilis.',
}

export const CASOS = [
  {
    id: 'desmayo-normal',
    situacion: {
      es: 'Un señor se desmaya en la calle y respira con normalidad.',
      en: 'A man faints in the street and is breathing normally.',
      ca: 'Un home es desmaia al carrer i respira amb normalitat.',
    },
    opciones: [
      {
        texto: { es: 'Colocarlo en posición lateral de seguridad', en: 'Put him in the recovery position', ca: 'Col·locar-lo en posició lateral de seguretat' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Con respiración normal, la posición lateral de seguridad mantiene la vía aérea libre mientras se recupera.', en: 'With normal breathing, the recovery position keeps the airway clear while he comes round.', ca: 'Amb respiració normal, la posició lateral de seguretat manté la via aèria lliure mentre es recupera.' },
      },
      {
        texto: { es: 'Darle algo de beber para que reaccione', en: 'Give him something to drink to wake him up', ca: 'Donar-li alguna cosa de beure perquè reaccioni' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Nunca se da de beber ni comer a alguien inconsciente: puede atragantarse.', en: 'Never give food or drink to someone unconscious: they could choke.', ca: 'Mai es dona de beure ni menjar a algú inconscient: es pot ennuegar.' },
      },
      {
        texto: { es: 'Sentarlo apoyado contra una pared', en: 'Sit him up against a wall', ca: 'Asseure\'l recolzat contra una paret' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'No es peligroso, pero sentado la vía aérea no queda tan protegida como tumbado de lado.', en: 'Not dangerous, but sitting up doesn\'t protect the airway as well as lying on his side.', ca: 'No és perillós, però assegut la via aèria no queda tan protegida com ajagut de costat.' },
      },
    ],
  },
  {
    id: 'quemadura-plancha',
    situacion: {
      es: 'Una niña se quema la mano con la plancha: la piel está roja pero no hay ampollas.',
      en: 'A girl burns her hand on the iron: the skin is red but there are no blisters.',
      ca: 'Una nena es crema la mà amb la planxa: la pell està vermella però no hi ha butllofes.',
    },
    opciones: [
      {
        texto: { es: 'Agua fría del grifo durante unos 20 minutos', en: 'Cool running tap water for about 20 minutes', ca: 'Aigua freda de l\'aixeta durant uns 20 minuts' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El agua fría (no helada) corriendo un buen rato reduce el daño en el tejido y calma el dolor.', en: 'Cool (not icy) running water for a good while reduces tissue damage and eases the pain.', ca: 'L\'aigua freda (no gelada) corrent una bona estona redueix el dany al teixit i calma el dolor.' },
      },
      {
        texto: { es: 'Hielo directo sobre la quemadura', en: 'Ice directly on the burn', ca: 'Gel directe sobre la cremada' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El frío extremo del hielo puede lesionar aún más el tejido ya dañado.', en: 'The extreme cold of ice can injure the already-damaged tissue even more.', ca: 'El fred extrem del gel pot lesionar encara més el teixit ja malmès.' },
      },
      {
        texto: { es: 'Pomada casera o aceite sobre la quemadura', en: 'Home-made ointment or oil on the burn', ca: 'Pomada casolana o oli sobre la cremada' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Aceites y pomadas caseras irritan la lesión, dificultan valorarla y aumentan el riesgo de infección.', en: 'Home oils and ointments irritate the wound, make it harder to assess and raise the infection risk.', ca: 'Olis i pomades casolanes irriten la lesió, dificulten valorar-la i augmenten el risc d\'infecció.' },
      },
    ],
  },
  {
    id: 'corte-cuter',
    situacion: {
      es: 'Un compañero se corta con un cúter: sangra, pero no a chorros.',
      en: 'A coworker cuts himself with a box cutter: it\'s bleeding, but not spurting.',
      ca: 'Un company es talla amb un cúter: sagna, però no a raig.',
    },
    opciones: [
      {
        texto: { es: 'Presión directa sobre la herida con un paño limpio', en: 'Direct pressure on the wound with a clean cloth', ca: 'Pressió directa sobre la ferida amb un drap net' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'La presión directa es la primera acción ante cualquier sangrado: permite que la sangre coagule.', en: 'Direct pressure is the first response to any bleeding: it lets the blood clot.', ca: 'La pressió directa és la primera acció davant qualsevol sagnat: permet que la sang coaguli.' },
      },
      {
        texto: { es: 'Un torniquete en el brazo', en: 'A tourniquet on the arm', ca: 'Un torniquet al braç' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El torniquete es el último recurso, solo si la presión directa no basta ante una hemorragia grave. Aquí es excesivo.', en: 'A tourniquet is a last resort, only if direct pressure fails to stop severe bleeding. Here it\'s excessive.', ca: 'El torniquet és l\'últim recurs, només si la pressió directa no n\'hi ha prou davant una hemorràgia greu. Aquí és excessiu.' },
      },
      {
        texto: { es: 'Alcohol directamente en la herida abierta', en: 'Alcohol directly on the open wound', ca: 'Alcohol directament a la ferida oberta' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'El alcohol irrita el tejido y no es la prioridad: lo primero es parar la hemorragia con presión.', en: 'Alcohol irritates the tissue and isn\'t the priority: the first thing is to stop the bleeding with pressure.', ca: 'L\'alcohol irrita el teixit i no és la prioritat: el primer és aturar l\'hemorràgia amb pressió.' },
      },
    ],
  },
  {
    id: 'picadura-abeja',
    ambiguo: true,
    situacion: {
      es: 'Le pica mucho un brazo tras una picadura de abeja, sin hinchazón en la cara ni falta de aire.',
      en: 'Their arm is very itchy after a bee sting, with no facial swelling or shortness of breath.',
      ca: 'Li pica molt un braç després d\'una picada d\'abella, sense inflor a la cara ni falta d\'aire.',
    },
    opciones: [
      {
        texto: { es: 'Retirar el aguijón raspando y lavar la zona', en: 'Scrape the stinger out and wash the area', ca: 'Retirar l\'agulló raspant i rentar la zona' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Raspar con un borde fino (una tarjeta) saca el aguijón sin apretar el saco de veneno.', en: 'Scraping with a thin edge (like a card) removes the stinger without squeezing the venom sac.', ca: 'Raspar amb una vora fina (una targeta) treu l\'agulló sense prémer el sac de verí.' },
      },
      {
        texto: { es: 'Llamar al 112 de inmediato', en: 'Call emergency services immediately', ca: 'Trucar al 112 de seguida' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin hinchazón facial ni problemas para respirar no es una emergencia: solo lo sería si hay signos de reacción alérgica grave.', en: 'Without facial swelling or breathing trouble this isn\'t an emergency: it only would be with signs of a severe allergic reaction.', ca: 'Sense inflor facial ni problemes per respirar no és una emergència: només ho seria amb signes de reacció al·lèrgica greu.' },
      },
      {
        texto: { es: 'Apretar la zona con los dedos para sacar el veneno', en: 'Squeeze the area with your fingers to get the venom out', ca: 'Prémer la zona amb els dits per treure el verí' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Apretar o usar pinzas puede inyectar más veneno del saco: mejor raspar que apretar.', en: 'Squeezing or using tweezers can inject more venom from the sac: scraping beats squeezing.', ca: 'Prémer o usar pinces pot injectar més verí del sac: millor raspar que prémer.' },
      },
    ],
  },
  {
    id: 'atragantamiento-parcial',
    situacion: {
      es: 'Un amigo se atraganta comiendo, pero tose fuerte y puede hablar.',
      en: 'A friend is choking while eating, but is coughing forcefully and can speak.',
      ca: 'Un amic s\'ennuega menjant, però tus fort i pot parlar.',
    },
    opciones: [
      {
        texto: { es: 'Animarle a seguir tosiendo', en: 'Encourage them to keep coughing', ca: 'Animar-lo a seguir tossint' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Con obstrucción parcial (tos eficaz, puede hablar) la propia tos es lo más efectivo para expulsar el objeto.', en: 'With partial obstruction (effective cough, can speak) their own cough is the most effective way to expel the object.', ca: 'Amb obstrucció parcial (tos eficaç, pot parlar) la mateixa tos és el més efectiu per expulsar l\'objecte.' },
      },
      {
        texto: { es: 'Golpearle la espalda ya mismo', en: 'Give them back blows right away', ca: 'Copejar-li l\'esquena de seguida' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con obstrucción parcial no se dan golpes en la espalda: podrían empeorar la obstrucción en vez de dejar que la tos haga su trabajo.', en: 'With partial obstruction you don\'t give back blows: it could worsen the obstruction instead of letting the cough do its job.', ca: 'Amb obstrucció parcial no es donen cops a l\'esquena: podrien empitjorar l\'obstrucció en comptes de deixar que la tos faci la seva feina.' },
      },
      {
        texto: { es: 'Hacerle la maniobra de Heimlich ya', en: 'Do the Heimlich maneuver right away', ca: 'Fer-li la maniobra de Heimlich ja' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'La maniobra de Heimlich es para obstrucción total. Aquí puede toser y hablar: aún no toca.', en: 'The Heimlich maneuver is for total obstruction. Here they can cough and speak: it\'s not time yet.', ca: 'La maniobra de Heimlich és per a obstrucció total. Aquí pot tossir i parlar: encara no toca.' },
      },
    ],
  },
  {
    id: 'anafilaxia',
    situacion: {
      es: 'Alguien alérgico a frutos secos se hincha la cara y le cuesta respirar tras comer algo.',
      en: 'Someone allergic to nuts has facial swelling and trouble breathing after eating something.',
      ca: 'Algú al·lèrgic a fruits secs se li infla la cara i li costa respirar després de menjar alguna cosa.',
    },
    opciones: [
      {
        texto: { es: 'Llamar al 112 y usar su autoinyector de adrenalina si lo lleva', en: 'Call emergency services and use their adrenaline auto-injector if they carry one', ca: 'Trucar al 112 i fer servir el seu autoinjector d\'adrenalina si el porta' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'La anafilaxia se trata con adrenalina cuanto antes: sin ella, no tratada, puede matar en menos de media hora.', en: 'Anaphylaxis is treated with adrenaline as soon as possible: untreated, it can kill in under half an hour.', ca: 'L\'anafilaxi es tracta amb adrenalina com abans millor: sense ella, no tractada, pot matar en menys de mitja hora.' },
      },
      {
        texto: { es: 'Darle un antihistamínico y esperar en casa', en: 'Give them an antihistamine and wait at home', ca: 'Donar-li un antihistamínic i esperar a casa' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Un antihistamínico no basta ante una anafilaxia: hace falta adrenalina y atención de emergencias ya.', en: 'An antihistamine isn\'t enough for anaphylaxis: it needs adrenaline and emergency care right away.', ca: 'Un antihistamínic no n\'hi ha prou davant una anafilaxi: cal adrenalina i atenció d\'emergències ja.' },
      },
      {
        texto: { es: 'Tumbarle y darle agua', en: 'Lay them down and give them water', ca: 'Estirar-lo i donar-li aigua' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Sin llamar a emergencias ni usar adrenalina se pierde el tiempo que más importa; además, darle agua con dificultad para respirar puede hacer que se atragante.', en: 'Without calling emergency services or using adrenaline you lose the time that matters most; also, giving water while they struggle to breathe risks choking.', ca: 'Sense trucar a emergències ni fer servir adrenalina es perd el temps que més importa; a més, donar-li aigua amb dificultat per respirar pot fer que s\'ennuegui.' },
      },
    ],
  },
  {
    id: 'fractura-ciclista',
    situacion: {
      es: 'Un ciclista se cae, consciente, quejándose de mucho dolor en una pierna que parece deformada.',
      en: 'A cyclist falls, is conscious, and complains of severe pain in a leg that looks deformed.',
      ca: 'Un ciclista cau, conscient, queixant-se de molt dolor en una cama que sembla deformada.',
    },
    opciones: [
      {
        texto: { es: 'No moverlo y llamar al 112', en: 'Don\'t move him and call emergency services', ca: 'No moure\'l i trucar al 112' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Ante una posible fractura no se mueve a la persona ni se intenta recolocar el hueso: hay que inmovilizar y pedir ayuda profesional.', en: 'With a possible fracture you don\'t move the person or try to reset the bone: immobilize and call for professional help.', ca: 'Davant una possible fractura no es mou la persona ni s\'intenta recol·locar l\'os: cal immobilitzar i demanar ajuda professional.' },
      },
      {
        texto: { es: 'Enderezarle la pierna para que esté más cómodo', en: 'Straighten his leg so he\'s more comfortable', ca: 'Endreçar-li la cama perquè estigui més còmode' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'No se debe intentar recolocar un hueso: puede dañar más tejido, vasos o nervios cercanos.', en: 'You should never try to reset a bone: it can damage more tissue, blood vessels or nearby nerves.', ca: 'No s\'ha d\'intentar recol·locar un os: pot malmetre més teixit, vasos o nervis propers.' },
      },
      {
        texto: { es: 'Ayudarle a levantarse y andar hasta el coche', en: 'Help him get up and walk to the car', ca: 'Ajudar-lo a aixecar-se i caminar fins al cotxe' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Mover a alguien con una posible fractura puede aumentar el dolor, el sangrado interno y el daño en los tejidos.', en: 'Moving someone with a possible fracture can increase pain, internal bleeding and tissue damage.', ca: 'Moure algú amb una possible fractura pot augmentar el dolor, el sagnat intern i el dany als teixits.' },
      },
    ],
  },
  {
    id: 'dolor-pecho',
    situacion: {
      es: 'Tu abuelo siente un dolor fuerte en el pecho y el brazo izquierdo.',
      en: 'Your grandfather feels severe pain in his chest and left arm.',
      ca: 'El teu avi sent un dolor fort al pit i al braç esquerre.',
    },
    opciones: [
      {
        texto: { es: 'Llamar al 112 de inmediato y no dejarlo solo', en: 'Call emergency services immediately and don\'t leave him alone', ca: 'Trucar al 112 de seguida i no deixar-lo sol' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Dolor en el pecho que baja al brazo puede ser un infarto: hay que llamar a emergencias ya, antes que ninguna otra cosa.', en: 'Chest pain radiating down the arm can mean a heart attack: call emergency services right away, before anything else.', ca: 'Dolor al pit que baixa al braç pot ser un infart: cal trucar a emergències ja, abans que cap altra cosa.' },
      },
      {
        texto: { es: 'Darle una aspirina y esperar a ver si mejora', en: 'Give him an aspirin and wait to see if he improves', ca: 'Donar-li una aspirina i esperar a veure si millora' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Un posible infarto no admite esperar: hay que llamar al 112 ya. La aspirina, si procede, la indica el propio servicio de emergencias.', en: 'A possible heart attack can\'t wait: call emergency services now. Aspirin, if appropriate, should be guided by the emergency dispatcher.', ca: 'Un possible infart no admet esperar: cal trucar al 112 ja. L\'aspirina, si escau, la indica el mateix servei d\'emergències.' },
      },
      {
        texto: { es: 'Que se acueste y descanse, seguro que se pasa', en: 'Have him lie down and rest, it\'ll probably pass', ca: 'Que s\'ajegui i descansi, segur que se li passa' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Restar importancia a estos síntomas retrasa una atención que puede salvarle la vida.', en: 'Dismissing these symptoms delays care that could save his life.', ca: 'Restar importància a aquests símptomes retarda una atenció que li pot salvar la vida.' },
      },
    ],
  },
  {
    id: 'canica-nino',
    situacion: {
      es: 'Un niño se ha tragado una canica pero respira, tose y habla con normalidad.',
      en: 'A child has swallowed a marble but is breathing, coughing and talking normally.',
      ca: 'Un nen s\'ha empassat una bala de vidre però respira, tus i parla amb normalitat.',
    },
    opciones: [
      {
        texto: { es: 'Observarlo y vigilar que la expulse con normalidad', en: 'Watch him and check that it passes normally', ca: 'Observar-lo i vigilar que l\'expulsi amb normalitat' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Sin síntomas de obstrucción, un objeto pequeño y romo suele pasar solo por el aparato digestivo.', en: 'Without signs of obstruction, a small, blunt object usually passes through the digestive system on its own.', ca: 'Sense símptomes d\'obstrucció, un objecte petit i rom sol passar sol per l\'aparell digestiu.' },
      },
      {
        texto: { es: 'Provocarle el vómito', en: 'Induce vomiting', ca: 'Provocar-li el vòmit' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Nunca se provoca el vómito ante un objeto tragado: puede atascarse al subir o dañar el esófago.', en: 'Never induce vomiting for a swallowed object: it can get stuck coming back up or damage the food pipe.', ca: 'Mai es provoca el vòmit davant un objecte empassat: pot encallar-se en pujar o malmetre l\'esòfag.' },
      },
      {
        texto: { es: 'Hacerle compresiones abdominales por si acaso', en: 'Give him abdominal thrusts just in case', ca: 'Fer-li compressions abdominals per si de cas' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Sin signos de obstrucción, las compresiones abdominales no son necesarias y pueden lesionar costillas u órganos.', en: 'Without signs of obstruction, abdominal thrusts aren\'t needed and can injure ribs or organs.', ca: 'Sense signes d\'obstrucció, les compressions abdominals no calen i poden lesionar costelles o òrgans.' },
      },
    ],
  },
  {
    id: 'desmayo-breve',
    ambiguo: true,
    situacion: {
      es: 'Alguien se desmaya un segundo; ya está despierto, hablando, y no se ha golpeado la cabeza.',
      en: 'Someone faints for a second; they\'re already awake, talking, and didn\'t hit their head.',
      ca: 'Algú es desmaia un segon; ja està despert, parlant, i no s\'ha copejat el cap.',
    },
    opciones: [
      {
        texto: { es: 'Sentarlo, darle aire y ofrecerle agua cuando esté del todo despierto', en: 'Sit them down, give them air and offer water once fully awake', ca: 'Asseure\'l, fer-li aire i oferir-li aigua quan estigui del tot despert' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Recuperado y sin señales de alarma (dolor de pecho, no poder hablar o moverse), basta con dejarlo reposar un momento.', en: 'Once recovered and with no warning signs (chest pain, inability to speak or move), just let them rest a moment.', ca: 'Recuperat i sense senyals d\'alarma (dolor de pit, no poder parlar o moure\'s), n\'hi ha prou de deixar-lo reposar un moment.' },
      },
      {
        texto: { es: 'Llamar a una ambulancia ya', en: 'Call an ambulance right away', ca: 'Trucar a una ambulància ja' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin señales de alarma, un desmayo breve y ya recuperado no necesita ambulancia — aunque conviene que un médico lo revise más adelante.', en: 'Without warning signs, a brief faint that\'s already resolved doesn\'t need an ambulance — though it\'s worth getting it checked by a doctor later.', ca: 'Sense senyals d\'alarma, un desmai breu i ja recuperat no necessita ambulància — encara que convé que un metge ho revisi més endavant.' },
      },
      {
        texto: { es: 'No darle importancia y que siga con lo que hacía', en: 'Not worry about it and let them carry on', ca: 'No donar-hi importància i que segueixi amb el que feia' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Aunque no sea grave, conviene observarlo un rato y no dejarlo solo por si el desmayo se repite.', en: 'Even if it\'s not serious, it\'s worth watching them for a while and not leaving them alone in case it happens again.', ca: 'Encara que no sigui greu, convé observar-lo una estona i no deixar-lo sol per si el desmai es repeteix.' },
      },
    ],
  },
  {
    id: 'motorista-consciente',
    situacion: {
      es: 'Un motorista se cae en el arcén: está consciente, se queja de dolor en la pierna, y lleva el casco puesto.',
      en: 'A motorcyclist falls onto the road shoulder: conscious, complaining of leg pain, still wearing their helmet.',
      ca: 'Un motorista cau al voral: està conscient, es queixa de dolor a la cama, i porta el casc posat.',
    },
    opciones: [
      {
        texto: { es: 'Señalizar la zona y llamar al 112, sin moverlo ni quitarle el casco', en: 'Mark the area as a hazard and call emergency services, without moving him or removing the helmet', ca: 'Senyalitzar la zona i trucar al 112, sense moure\'l ni treure-li el casc' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El casco solo lo retira personal sanitario, salvo que impida respirar. Moverlo puede agravar una posible lesión de columna.', en: 'Only medical staff should remove the helmet, unless it\'s blocking breathing. Moving him could worsen a possible spinal injury.', ca: 'El casc només el retira personal sanitari, tret que impedeixi respirar. Moure\'l pot agreujar una possible lesió de columna.' },
      },
      {
        texto: { es: 'Quitarle el casco para que esté más cómodo', en: 'Remove his helmet so he\'s more comfortable', ca: 'Treure-li el casc perquè estigui més còmode' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Quitar el casco sin necesidad, y sin la técnica adecuada entre dos personas, puede dañar el cuello o la columna.', en: 'Removing the helmet without need, and without the proper two-person technique, can injure the neck or spine.', ca: 'Treure el casc sense necessitat, i sense la tècnica adequada entre dues persones, pot malmetre el coll o la columna.' },
      },
      {
        texto: { es: 'Arrastrarlo por los brazos hasta la acera', en: 'Drag him by the arms onto the pavement', ca: 'Arrossegar-lo pels braços fins a la vorera' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Sin peligro inmediato (fuego, tráfico encima), no se mueve a alguien con posibles lesiones: podría agravarlas.', en: 'Without immediate danger (fire, oncoming traffic), you don\'t move someone with possible injuries: it could make them worse.', ca: 'Sense perill immediat (foc, trànsit a sobre), no es mou algú amb possibles lesions: podria agreujar-les.' },
      },
    ],
  },
  {
    id: 'motorista-inconsciente',
    situacion: {
      es: 'Un motorista caído no responde a tu voz, pero notas que respira con normalidad. Lleva el casco puesto.',
      en: 'A fallen motorcyclist doesn\'t respond to your voice, but you can see they\'re breathing normally. Still wearing their helmet.',
      ca: 'Un motorista caigut no respon a la teva veu, però notes que respira amb normalitat. Porta el casc posat.',
    },
    opciones: [
      {
        texto: { es: 'No moverlo ni tocarle el casco, y llamar al 112 mientras lo vigilas', en: 'Don\'t move him or touch the helmet, and call emergency services while watching him', ca: 'No moure\'l ni tocar-li el casc, i trucar al 112 mentre el vigiles' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Si respira con normalidad no hace falta tocar el casco ni moverlo: solo avisar a emergencias y vigilarlo hasta que lleguen.', en: 'If they\'re breathing normally there\'s no need to touch the helmet or move them: just alert emergency services and watch over them.', ca: 'Si respira amb normalitat no cal tocar el casc ni moure\'l: només avisar emergències i vigilar-lo fins que arribin.' },
      },
      {
        texto: { es: 'Quitarle el casco para comprobar si reacciona', en: 'Remove the helmet to check if he responds', ca: 'Treure-li el casc per comprovar si reacciona' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con respiración normal no hay motivo para tocar el casco: hacerlo sin necesidad añade riesgo de lesión cervical.', en: 'With normal breathing there\'s no reason to touch the helmet: doing so unnecessarily adds a risk of neck injury.', ca: 'Amb respiració normal no hi ha motiu per tocar el casc: fer-ho sense necessitat afegeix risc de lesió cervical.' },
      },
      {
        texto: { es: 'Zarandearlo con fuerza para que despierte', en: 'Shake him hard to wake him up', ca: 'Sacsejar-lo fort perquè es desperti' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Zarandear a alguien que podría tener una lesión de columna puede agravarla seriamente.', en: 'Shaking someone who might have a spinal injury can seriously worsen it.', ca: 'Sacsejar algú que podria tenir una lesió de columna la pot agreujar seriosament.' },
      },
    ],
  },
  {
    id: 'hipoglucemia-consciente',
    situacion: {
      es: 'Una persona diabética suda frío, tiembla y está confusa, pero consciente y puede tragar.',
      en: 'Someone with diabetes is cold and sweaty, shaky and confused, but conscious and able to swallow.',
      ca: 'Una persona diabètica sua fred, tremola i està confusa, però conscient i pot empassar.',
    },
    opciones: [
      {
        texto: { es: 'Darle algo de azúcar de absorción rápida: zumo, un azucarillo o un refresco azucarado', en: 'Give them fast-acting sugar: juice, a sugar cube or a sugary soda', ca: 'Donar-li alguna cosa de sucre d\'absorció ràpida: suc, un sucrat o un refresc ensucrat' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Son síntomas de hipoglucemia (azúcar bajo): consciente y pudiendo tragar, la regla es dar 15g de azúcar rápido y esperar unos minutos.', en: 'These are hypoglycemia (low blood sugar) symptoms: while conscious and able to swallow, the rule is 15g of fast sugar and waiting a few minutes.', ca: 'Són símptomes d\'hipoglucèmia (sucre baix): conscient i podent empassar, la regla és donar 15g de sucre ràpid i esperar uns minuts.' },
      },
      {
        texto: { es: 'Ponerle su dosis de insulina para bajarle el azúcar', en: 'Give them their insulin dose to lower their blood sugar', ca: 'Posar-li la seva dosi d\'insulina per baixar-li el sucre' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El azúcar ya está bajo: ponerle insulina lo bajaría todavía más y puede ser gravísimo. Es justo lo contrario de lo que hace falta.', en: 'Their blood sugar is already low: giving insulin would lower it further and can be very serious. It\'s the exact opposite of what\'s needed.', ca: 'El sucre ja és baix: posar-li insulina el baixaria encara més i pot ser molt greu. És justament el contrari del que cal.' },
      },
      {
        texto: { es: 'Esperar a que se le pase solo, sin hacer nada', en: 'Wait for it to pass on its own, without doing anything', ca: 'Esperar que se li passi sol, sense fer res' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin azúcar, una hipoglucemia puede empeorar hasta la pérdida de conciencia: no cuesta nada dársela ya.', en: 'Without sugar, hypoglycemia can worsen into loss of consciousness: there\'s no reason not to give it right away.', ca: 'Sense sucre, una hipoglucèmia pot empitjorar fins a la pèrdua de coneixement: no costa res donar-la ja.' },
      },
    ],
  },
  {
    id: 'hipoglucemia-inconsciente',
    situacion: {
      es: 'Una persona diabética no responde y está inconsciente, pero respira.',
      en: 'Someone with diabetes doesn\'t respond and is unconscious, but breathing.',
      ca: 'Una persona diabètica no respon i està inconscient, però respira.',
    },
    opciones: [
      {
        texto: { es: 'Colocarla en posición lateral de seguridad y llamar al 112, sin darle nada por la boca', en: 'Put them in the recovery position and call emergency services, without giving anything by mouth', ca: 'Col·locar-la en posició lateral de seguretat i trucar al 112, sense donar-li res per la boca' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Inconsciente no se le da nada de comer ni beber: se le coloca de lado, protegiendo la vía aérea, y se llama a emergencias.', en: 'Unconscious, they shouldn\'t be given anything to eat or drink: put them on their side to protect the airway, and call emergency services.', ca: 'Inconscient no se li dona res de menjar ni beure: es col·loca de costat, protegint la via aèria, i es truca a emergències.' },
      },
      {
        texto: { es: 'Meterle azúcar o zumo en la boca aunque esté inconsciente', en: 'Put sugar or juice in their mouth even though unconscious', ca: 'Ficar-li sucre o suc a la boca encara que estigui inconscient' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Dar de comer o beber a alguien inconsciente puede hacer que se atragante: nunca se hace por la boca sin que esté despierto.', en: 'Giving food or drink to someone unconscious can make them choke: never do it by mouth unless they\'re awake.', ca: 'Donar de menjar o beure a algú inconscient pot fer que s\'ennuegui: mai es fa per la boca sense que estigui despert.' },
      },
      {
        texto: { es: 'Esperar a que despierte por sí sola para actuar', en: 'Wait for them to wake up on their own before acting', ca: 'Esperar que es desperti sola per actuar' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Una hipoglucemia con pérdida de conciencia es una emergencia: hay que llamar ya, no esperar a que se recupere sola.', en: 'Hypoglycemia with loss of consciousness is an emergency: call now, don\'t wait for them to recover on their own.', ca: 'Una hipoglucèmia amb pèrdua de coneixement és una emergència: cal trucar ja, no esperar que es recuperi sola.' },
      },
    ],
  },
  {
    id: 'fiebre-nino-leve',
    ambiguo: true,
    situacion: {
      es: 'Tu hijo tiene 38°C de fiebre desde esta mañana, pero juega con normalidad y come bien.',
      en: 'Your child has had a 38°C fever since this morning, but is playing normally and eating well.',
      ca: 'El teu fill té 38°C de febre des d\'aquest matí, però juga amb normalitat i menja bé.',
    },
    opciones: [
      {
        texto: { es: 'Quedarte en casa, controlar la fiebre y que descanse', en: 'Stay home, monitor the fever and let them rest', ca: 'Quedar-te a casa, controlar la febre i que descansi' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Fiebre moderada sin otros síntomas de alarma en un niño que juega y come con normalidad no es una urgencia: se controla en casa.', en: 'A moderate fever with no other warning signs in a child who\'s playing and eating normally isn\'t an emergency: manage it at home.', ca: 'Febre moderada sense altres símptomes d\'alarma en un nen que juga i menja amb normalitat no és una urgència: es controla a casa.' },
      },
      {
        texto: { es: 'Ir a urgencias ahora mismo', en: 'Go to the ER right now', ca: 'Anar a urgències ara mateix' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin señales de alarma (decaimiento, dificultad para respirar, manchas en la piel...) no hace falta urgencias: satura el servicio sin necesidad.', en: 'Without warning signs (lethargy, breathing trouble, skin rashes...) the ER isn\'t needed: it just adds strain to the service for no reason.', ca: 'Sense senyals d\'alarma (decaïment, dificultat per respirar, taques a la pell...) no cal urgències: satura el servei sense necessitat.' },
      },
      {
        texto: { es: 'Darle un antibiótico que sobró de la última vez', en: 'Give them leftover antibiotics from last time', ca: 'Donar-li un antibiòtic que va sobrar de l\'última vegada' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'La mayoría de fiebres son virales: un antibiótico no ayuda y automedicarse sin indicación médica es peligroso.', en: 'Most fevers are viral: an antibiotic won\'t help, and self-medicating without medical guidance is dangerous.', ca: 'La majoria de febres són virals: un antibiòtic no ajuda i automedicar-se sense indicació mèdica és perillós.' },
      },
    ],
  },
  {
    id: 'dolor-cabeza-subito',
    situacion: {
      es: 'Tienes el peor dolor de cabeza de tu vida: ha empezado de golpe y ves borroso.',
      en: 'You have the worst headache of your life: it started suddenly and your vision is blurry.',
      ca: 'Tens el pitjor mal de cap de la teva vida: ha començat de cop i hi veus borrós.',
    },
    opciones: [
      {
        texto: { es: 'Ir a urgencias ahora', en: 'Go to the ER now', ca: 'Anar a urgències ara' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Un dolor de cabeza súbito, intensísimo y con cambios de visión es una señal de alarma que puede indicar algo grave: no se espera.', en: 'A sudden, extremely intense headache with vision changes is a warning sign that can indicate something serious: don\'t wait.', ca: 'Un mal de cap sobtat, intensíssim i amb canvis de visió és una senyal d\'alarma que pot indicar alguna cosa greu: no s\'espera.' },
      },
      {
        texto: { es: 'Tomar un analgésico y esperar en casa a ver si se pasa', en: 'Take a painkiller and wait at home to see if it passes', ca: 'Prendre un analgèsic i esperar a casa a veure si es passa' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con estas señales de alarma, esperar en casa retrasa un diagnóstico que puede ser urgente.', en: 'With these warning signs, waiting at home delays a diagnosis that could be urgent.', ca: 'Amb aquestes senyals d\'alarma, esperar a casa retarda un diagnòstic que pot ser urgent.' },
      },
      {
        texto: { es: 'Pedir cita con el médico de cabecera para dentro de unos días', en: 'Book an appointment with your GP for a few days from now', ca: 'Demanar cita amb el metge de capçalera per d\'aquí uns dies' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Estas señales de alarma no admiten esperar días a una cita programada: hace falta valoración urgente ya.', en: 'These warning signs can\'t wait days for a scheduled appointment: urgent evaluation is needed now.', ca: 'Aquestes senyals d\'alarma no admeten esperar dies a una cita programada: cal valoració urgent ja.' },
      },
    ],
  },
  {
    id: 'lunar-cambiante',
    ambiguo: true,
    situacion: {
      es: 'Notas un lunar que ha cambiado de forma y de color en los últimos meses, sin dolor ni sangrado.',
      en: 'You notice a mole that has changed shape and colour over the last few months, with no pain or bleeding.',
      ca: 'Notes un piga que ha canviat de forma i de color en els últims mesos, sense dolor ni sagnat.',
    },
    opciones: [
      {
        texto: { es: 'Pedir cita con el dermatólogo en los próximos días', en: 'Book an appointment with a dermatologist in the coming days', ca: 'Demanar cita amb el dermatòleg en els propers dies' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Un lunar que cambia de forma o color no es una urgencia, pero sí debe valorarlo un especialista sin dejarlo pasar mucho tiempo.', en: 'A mole changing shape or colour isn\'t an emergency, but a specialist should assess it without letting too much time pass.', ca: 'Un piga que canvia de forma o color no és una urgència, però sí que l\'ha de valorar un especialista sense deixar-ho passar gaire temps.' },
      },
      {
        texto: { es: 'Ir a urgencias ahora mismo', en: 'Go to the ER right now', ca: 'Anar a urgències ara mateix' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin sangrado activo ni otra urgencia, no hace falta ir a urgencias: lo adecuado es una cita con el especialista.', en: 'Without active bleeding or another emergency, the ER isn\'t needed: the right move is a specialist appointment.', ca: 'Sense sagnat actiu ni una altra urgència, no cal anar a urgències: el correcte és una cita amb l\'especialista.' },
      },
      {
        texto: { es: 'No hacer nada, seguro que no es importante', en: 'Do nothing, it\'s surely not important', ca: 'No fer res, segur que no és important' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Un lunar que cambia es precisamente la señal que hay que vigilar: ignorarlo puede retrasar el diagnóstico de algo serio.', en: 'A changing mole is exactly the sign to watch for: ignoring it can delay diagnosis of something serious.', ca: 'Un piga que canvia és precisament la senyal que cal vigilar: ignorar-ho pot retardar el diagnòstic d\'alguna cosa seriosa.' },
      },
    ],
  },
  {
    id: 'catarro-comun',
    ambiguo: true,
    situacion: {
      es: 'Te duele un poco la garganta y tienes mocos desde ayer, sin fiebre alta ni dificultad para tragar o respirar.',
      en: 'Your throat hurts a little and you\'ve had a runny nose since yesterday, with no high fever or trouble swallowing or breathing.',
      ca: 'Et fa mal una mica la gola i tens mocs des d\'ahir, sense febre alta ni dificultat per empassar o respirar.',
    },
    opciones: [
      {
        texto: { es: 'Quedarte en casa, descansar e hidratarte', en: 'Stay home, rest and stay hydrated', ca: 'Quedar-te a casa, descansar i hidratar-te' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Un catarro común sin señales de alarma se cuida en casa: descanso, líquidos y tiempo.', en: 'A common cold with no warning signs is looked after at home: rest, fluids and time.', ca: 'Un refredat comú sense senyals d\'alarma es cuida a casa: descans, líquids i temps.' },
      },
      {
        texto: { es: 'Pedir cita urgente con el médico de cabecera para hoy mismo', en: 'Book an urgent same-day appointment with your GP', ca: 'Demanar cita urgent amb el metge de capçalera per avui mateix' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin señales de alarma, un catarro leve no necesita una cita urgente: puede cuidarse en casa unos días.', en: 'Without warning signs, a mild cold doesn\'t need an urgent appointment: it can be managed at home for a few days.', ca: 'Sense senyals d\'alarma, un refredat lleu no necessita una cita urgent: es pot cuidar a casa uns dies.' },
      },
      {
        texto: { es: 'Tomar antibióticos que tenías guardados de otra vez', en: 'Take leftover antibiotics from another time', ca: 'Prendre antibiòtics que tenies guardats d\'una altra vegada' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'La mayoría de catarros son víricos: los antibióticos no sirven y automedicarse sin indicación es un riesgo real.', en: 'Most colds are viral: antibiotics don\'t help, and self-medicating without guidance is a real risk.', ca: 'La majoria de refredats són vírics: els antibiòtics no serveixen i automedicar-se sense indicació és un risc real.' },
      },
    ],
  },
  {
    id: 'dolor-abdominal-agudo',
    situacion: {
      es: 'Dolor abdominal muy intenso y repentino en la parte baja derecha del abdomen, con fiebre y vómitos.',
      en: 'Very intense, sudden abdominal pain in the lower right abdomen, with fever and vomiting.',
      ca: 'Dolor abdominal molt intens i sobtat a la part baixa dreta de l\'abdomen, amb febre i vòmits.',
    },
    opciones: [
      {
        texto: { es: 'Ir a urgencias ahora', en: 'Go to the ER now', ca: 'Anar a urgències ara' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Dolor intenso y repentino en esa zona, con fiebre y vómitos, es una presentación clásica de apendicitis: requiere valoración urgente.', en: 'Intense, sudden pain in that area, with fever and vomiting, is a classic appendicitis presentation: it needs urgent assessment.', ca: 'Dolor intens i sobtat en aquesta zona, amb febre i vòmits, és una presentació clàssica d\'apendicitis: requereix valoració urgent.' },
      },
      {
        texto: { es: 'Tomar un laxante para aliviar la tripa', en: 'Take a laxative to ease the stomach', ca: 'Prendre un laxant per alleujar la panxa' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Ante un posible abdomen agudo, un laxante puede empeorar las cosas: hace falta valoración médica, no automedicarse.', en: 'With a possible acute abdomen, a laxative can make things worse: it needs medical assessment, not self-medication.', ca: 'Davant un possible abdomen agut, un laxant pot empitjorar les coses: cal valoració mèdica, no automedicar-se.' },
      },
      {
        texto: { es: 'Esperar unos días a ver si se pasa antes de pedir cita', en: 'Wait a few days to see if it passes before booking an appointment', ca: 'Esperar uns dies a veure si es passa abans de demanar cita' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Un posible apéndice inflamado puede perforarse si se espera: no se deja pasar el tiempo con estos síntomas.', en: 'A possibly inflamed appendix can rupture if you wait: you don\'t let time pass with these symptoms.', ca: 'Un possible apèndix inflamat es pot perforar si s\'espera: no es deixa passar el temps amb aquests símptomes.' },
      },
    ],
  },
  {
    id: 'ahogamiento-consciente',
    situacion: {
      es: 'Sacas a alguien de la piscina: tose, respira y está consciente, aunque aturdido.',
      en: 'You pull someone out of the pool: they\'re coughing, breathing and conscious, though dazed.',
      ca: 'Treus algú de la piscina: tus, respira i està conscient, encara que atordit.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a un lugar seguro, abrigarlo y buscar valoración médica aunque parezca estar bien', en: 'Move them somewhere safe, keep them warm, and seek medical evaluation even if they seem fine', ca: 'Portar-lo a un lloc segur, abrigar-lo i buscar valoració mèdica encara que sembli estar bé' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Un casi ahogamiento puede tener complicaciones horas después (agua en los pulmones) aunque la persona respire con normalidad al principio.', en: 'A near-drowning can have complications hours later (water in the lungs) even if the person is breathing normally at first.', ca: 'Un quasi ofegament pot tenir complicacions hores després (aigua als pulmons) encara que la persona respiri amb normalitat al principi.' },
      },
      {
        texto: { es: 'Ponerlo boca abajo y presionarle el abdomen para sacarle el agua', en: 'Lay them face down and press their abdomen to force the water out', ca: 'Posar-lo boca avall i pressionar-li l\'abdomen per treure-li l\'aigua' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Presionar el abdomen para "sacar el agua" no es un primer auxilio recomendado: puede provocar vómito y que lo aspire.', en: 'Pressing the abdomen to "force out the water" isn\'t a recommended first-aid technique: it can cause vomiting and aspiration.', ca: 'Pressionar l\'abdomen per "treure l\'aigua" no és un primer auxili recomanat: pot provocar vòmit i que ho aspiri.' },
      },
      {
        texto: { es: 'Dejarlo descansar sin más, seguro que no pasa nada', en: 'Just let them rest, it\'s surely nothing', ca: 'Deixar-lo descansar sense més, segur que no passa res' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Aunque respire con normalidad, conviene vigilarlo y que lo valore un médico por el riesgo de complicaciones tardías.', en: 'Even if they\'re breathing normally, they should be watched and seen by a doctor because of the risk of delayed complications.', ca: 'Encara que respiri amb normalitat, convé vigilar-lo i que el valori un metge pel risc de complicacions tardanes.' },
      },
    ],
  },
  {
    id: 'ahogamiento-inconsciente',
    situacion: {
      es: 'Sacas a un niño de la piscina: no responde y no respira con normalidad.',
      en: 'You pull a child out of the pool: they don\'t respond and aren\'t breathing normally.',
      ca: 'Treus un nen de la piscina: no respon i no respira amb normalitat.',
    },
    opciones: [
      {
        texto: { es: 'Empezar la RCP de inmediato y que alguien llame al 112', en: 'Start CPR immediately and have someone call emergency services', ca: 'Començar la RCP de seguida i que algú truqui al 112' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Sin respiración normal tras sacarlo del agua, lo prioritario es empezar la reanimación cardiopulmonar ya, sin retrasarla.', en: 'Without normal breathing after being pulled from the water, the priority is to start CPR right away, without delay.', ca: 'Sense respiració normal després de treure\'l de l\'aigua, el prioritari és començar la reanimació cardiopulmonar ja, sense retardar-la.' },
      },
      {
        texto: { es: 'Ponerlo boca abajo para que expulse el agua antes de hacer nada más', en: 'Lay them face down to expel the water before doing anything else', ca: 'Posar-lo boca avall perquè expulsi l\'aigua abans de fer res més' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Intentar sacar el agua primero retrasa la RCP, que es lo que de verdad puede salvarle la vida.', en: 'Trying to drain the water first delays CPR, which is what can actually save their life.', ca: 'Intentar treure l\'aigua primer retarda la RCP, que és el que de veritat li pot salvar la vida.' },
      },
      {
        texto: { es: 'Esperar unos minutos a ver si reacciona solo', en: 'Wait a few minutes to see if they come round on their own', ca: 'Esperar uns minuts a veure si reacciona sol' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Sin respiración, cada minuto sin RCP reduce mucho las opciones: no se espera a ver qué pasa.', en: 'Without breathing, every minute without CPR greatly reduces the chances: you don\'t wait and see.', ca: 'Sense respiració, cada minut sense RCP redueix molt les opcions: no s\'espera a veure què passa.' },
      },
    ],
  },
  {
    id: 'convulsion-epileptica',
    situacion: {
      es: 'Alguien cae al suelo y todo su cuerpo empieza a sacudirse en una convulsión.',
      en: 'Someone falls to the ground and their whole body starts shaking in a seizure.',
      ca: 'Algú cau a terra i tot el seu cos comença a sacsejar-se en una convulsió.',
    },
    opciones: [
      {
        texto: { es: 'Apartar objetos con los que se pueda golpear y ponerle algo blando bajo la cabeza', en: 'Move away anything they could hit and put something soft under their head', ca: 'Apartar objectes amb què es pugui copejar i posar-li alguna cosa tova sota el cap' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'No se puede detener una convulsión: lo único que hace falta es protegerle de golpes hasta que pase sola.', en: 'A seizure can\'t be stopped: all that\'s needed is to protect them from injury until it passes on its own.', ca: 'No es pot aturar una convulsió: l\'única cosa que cal és protegir-lo de cops fins que passi sola.' },
      },
      {
        texto: { es: 'Sujetarle con fuerza para que pare de temblar', en: 'Hold them down firmly to stop the shaking', ca: 'Subjectar-lo amb força perquè pari de tremolar' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Sujetarlo no detiene la convulsión y puede provocarle una lesión, como una fractura o una luxación.', en: 'Holding them down doesn\'t stop the seizure and can cause an injury, like a fracture or dislocation.', ca: 'Subjectar-lo no atura la convulsió i li pot provocar una lesió, com una fractura o una luxació.' },
      },
      {
        texto: { es: 'Meterle algo en la boca para que no se trague la lengua', en: 'Put something in their mouth so they don\'t swallow their tongue', ca: 'Ficar-li alguna cosa a la boca perquè no s\'empassi la llengua' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Es un mito: es físicamente imposible tragarse la lengua. Meter algo en la boca puede romperle un diente o bloquearle la vía aérea.', en: 'This is a myth: it\'s physically impossible to swallow your tongue. Putting something in the mouth can break a tooth or block the airway.', ca: 'És un mite: és físicament impossible empassar-se la llengua. Ficar alguna cosa a la boca li pot trencar una dent o bloquejar-li la via aèria.' },
      },
    ],
  },
  {
    id: 'golpe-calor',
    situacion: {
      es: 'Un corredor se desploma en un día de mucho calor: está confuso, con la piel muy caliente y seca, apenas suda.',
      en: 'A runner collapses on a very hot day: confused, with hot, dry skin, barely sweating.',
      ca: 'Un corredor s\'esfondra en un dia de molta calor: està confús, amb la pell molt calenta i seca, gairebé no sua.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a la sombra, quitarle ropa de más y refrescarlo con agua fría mientras llamas al 112', en: 'Move them to the shade, remove excess clothing and cool them with cold water while calling emergency services', ca: 'Portar-lo a l\'ombra, treure-li roba de més i refrescar-lo amb aigua freda mentre truques al 112' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Confusión, piel caliente y seca y apenas sudor son señales de golpe de calor: es una emergencia que requiere enfriar activamente y pedir ayuda.', en: 'Confusion, hot dry skin and barely sweating are heatstroke signs: it\'s an emergency that needs active cooling and calling for help.', ca: 'Confusió, pell calenta i seca i gairebé sense suor són senyals de cop de calor: és una emergència que requereix refredar activament i demanar ajuda.' },
      },
      {
        texto: { es: 'Darle una aspirina para bajarle la temperatura', en: 'Give them an aspirin to lower their temperature', ca: 'Donar-li una aspirina per baixar-li la temperatura' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El golpe de calor no es fiebre por infección: los antitérmicos no ayudan y pueden ser perjudiciales en esta situación.', en: 'Heatstroke isn\'t a fever from infection: fever-reducing drugs don\'t help and can be harmful in this situation.', ca: 'El cop de calor no és febre per infecció: els antitèrmics no ajuden i poden ser perjudicials en aquesta situació.' },
      },
      {
        texto: { es: 'Taparlo con una manta para que no coja frío', en: 'Cover them with a blanket so they don\'t get cold', ca: 'Tapar-lo amb una manta perquè no agafi fred' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Taparlo impide justo lo que necesita: perder el calor que le está poniendo en peligro.', en: 'Covering them prevents exactly what they need: losing the heat that\'s putting them in danger.', ca: 'Tapar-lo impedeix justament el que necessita: perdre la calor que el posa en perill.' },
      },
    ],
  },
  {
    id: 'descarga-electrica',
    situacion: {
      es: 'Alguien recibe una descarga con un electrodoméstico y sigue en contacto con la corriente.',
      en: 'Someone gets shocked by an appliance and is still in contact with the current.',
      ca: 'Algú rep una descàrrega amb un electrodomèstic i segueix en contacte amb el corrent.',
    },
    opciones: [
      {
        texto: { es: 'Cortar la corriente, o apartarlo con algo de madera o plástico seco, antes de tocarlo', en: 'Cut the power, or push them away with something dry made of wood or plastic, before touching them', ca: 'Tallar el corrent, o apartar-lo amb alguna cosa de fusta o plàstic sec, abans de tocar-lo' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Tocar a alguien que sigue en contacto con la corriente puede electrocutarte también a ti: primero hay que cortarla o apartarla sin conducir la electricidad.', en: 'Touching someone still in contact with the current can electrocute you too: first cut it or push it away without conducting electricity yourself.', ca: 'Tocar algú que segueix en contacte amb el corrent et pot electrocutar també a tu: primer cal tallar-lo o apartar-lo sense conduir l\'electricitat.' },
      },
      {
        texto: { es: 'Tirar de él con las manos para separarlo de la corriente', en: 'Pull them away with your bare hands', ca: 'Estirar-lo amb les mans per separar-lo del corrent' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Si sigue en contacto con la corriente, tocarlo directamente puede electrocutarte a ti también.', en: 'If they\'re still in contact with the current, touching them directly can electrocute you too.', ca: 'Si segueix en contacte amb el corrent, tocar-lo directament et pot electrocutar a tu també.' },
      },
      {
        texto: { es: 'Echarle agua para que reaccione', en: 'Splash water on them to wake them up', ca: 'Tirar-li aigua perquè reaccioni' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El agua conduce la electricidad: echarla cerca de una fuente eléctrica activa es muy peligroso.', en: 'Water conducts electricity: pouring it near a live electrical source is very dangerous.', ca: 'L\'aigua condueix l\'electricitat: tirar-la a prop d\'una font elèctrica activa és molt perillós.' },
      },
    ],
  },
  {
    id: 'hemorragia-nasal',
    situacion: {
      es: 'A alguien le empieza a sangrar la nariz de repente, sin haberse golpeado.',
      en: 'Someone\'s nose suddenly starts bleeding, without having been hit.',
      ca: 'A algú li comença a sagnar el nas de sobte, sense haver-se copejat.',
    },
    opciones: [
      {
        texto: { es: 'Sentarlo inclinado hacia delante y apretar la parte blanda de la nariz unos minutos', en: 'Sit them leaning forward and pinch the soft part of the nose for a few minutes', ca: 'Asseure\'l inclinat cap endavant i prémer la part tova del nas uns minuts' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Inclinarse hacia delante evita tragar sangre, y la presión directa sobre la nariz corta la mayoría de los sangrados nasales.', en: 'Leaning forward avoids swallowing blood, and direct pressure on the nose stops most nosebleeds.', ca: 'Inclinar-se cap endavant evita empassar sang, i la pressió directa sobre el nas talla la majoria de sagnats nasals.' },
      },
      {
        texto: { es: 'Echarle la cabeza hacia atrás', en: 'Tilt their head back', ca: 'Tirar-li el cap enrere' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con la cabeza hacia atrás la sangre baja por la garganta, lo que puede provocar náuseas o vómitos en vez de cortar el sangrado.', en: 'With the head tilted back, blood runs down the throat, which can cause nausea or vomiting instead of stopping the bleed.', ca: 'Amb el cap enrere la sang baixa per la gola, la qual cosa pot provocar nàusees o vòmits en comptes de tallar el sagnat.' },
      },
      {
        texto: { es: 'Que se suene fuerte la nariz para limpiarla', en: 'Have them blow their nose hard to clear it', ca: 'Que es moqui fort per netejar-se el nas' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sonarse fuerte justo después puede remover el coágulo que se está formando y reiniciar el sangrado.', en: 'Blowing hard right after can dislodge the clot that\'s forming and restart the bleeding.', ca: 'Mocar-se fort just després pot remoure el coàgul que s\'està formant i reiniciar el sagnat.' },
      },
    ],
  },
  {
    id: 'quimico-en-ojo',
    situacion: {
      es: 'Le salpica un producto de limpieza en un ojo y le escuece mucho.',
      en: 'A cleaning product splashes into their eye and it stings badly.',
      ca: 'Li esquitxa un producte de neteja a un ull i li pica molt.',
    },
    opciones: [
      {
        texto: { es: 'Lavar el ojo con agua abundante durante varios minutos, sin frotar', en: 'Rinse the eye with plenty of water for several minutes, without rubbing', ca: 'Rentar l\'ull amb aigua abundant durant diversos minuts, sense fregar' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El lavado inmediato y abundante con agua es lo más importante: diluye el producto y protege el ojo.', en: 'Immediate, abundant rinsing with water is the most important thing: it dilutes the product and protects the eye.', ca: 'El rentat immediat i abundant amb aigua és el més important: dilueix el producte i protegeix l\'ull.' },
      },
      {
        texto: { es: 'Frotarse el ojo para quitarse el producto', en: 'Rub the eye to get the product out', ca: 'Fregar-se l\'ull per treure\'s el producte' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Frotar puede extender el químico por el ojo y dañar más la córnea.', en: 'Rubbing can spread the chemical across the eye and damage the cornea further.', ca: 'Fregar pot estendre el químic per l\'ull i danyar més la còrnia.' },
      },
      {
        texto: { es: 'Taparse el ojo con una venda y esperar a que escueza menos', en: 'Cover the eye with a bandage and wait for it to sting less', ca: 'Tapar-se l\'ull amb una bena i esperar que piqui menys' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Tapar el ojo sin lavarlo antes deja el producto químico actuando y empeora la lesión.', en: 'Covering the eye without rinsing it first leaves the chemical acting and worsens the injury.', ca: 'Tapar l\'ull sense rentar-lo abans deixa el producte químic actuant i empitjora la lesió.' },
      },
    ],
  },
  {
    id: 'rcp-esperar',
    situacion: {
      es: 'Vas a hacer RCP a un adulto que no respira. ¿Hay que esperar a que llegue la ambulancia para empezar?',
      en: 'You\'re about to give CPR to an adult who isn\'t breathing. Should you wait for the ambulance before starting?',
      ca: 'Vas a fer RCP a un adult que no respira. Cal esperar que arribi l\'ambulància per començar?',
    },
    opciones: [
      {
        texto: { es: 'No, hay que empezar la RCP ya mismo', en: 'No, CPR should start right away', ca: 'No, cal començar la RCP ja mateix' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Cada minuto sin RCP reduce mucho las probabilidades de que la persona sobreviva: no se espera a que llegue nadie.', en: 'Every minute without CPR greatly reduces the chances of survival: you don\'t wait for anyone to arrive.', ca: 'Cada minut sense RCP redueix molt les probabilitats que la persona sobrevisqui: no s\'espera que arribi ningú.' },
      },
      {
        texto: { es: 'Sí, mejor esperar a personal sanitario', en: 'Yes, better to wait for medical staff', ca: 'Sí, millor esperar personal sanitari' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Esperar sin hacer nada reduce drásticamente las opciones de reanimar a la persona: la RCP la puede hacer cualquiera mientras llega ayuda.', en: 'Waiting and doing nothing drastically lowers the chances of reviving the person: anyone can perform CPR while help is on its way.', ca: 'Esperar sense fer res redueix dràsticament les opcions de reanimar la persona: la RCP la pot fer qualsevol mentre arriba ajuda.' },
      },
    ],
  },
  {
    id: 'alcohol-fiebre-nino',
    situacion: {
      es: 'Un familiar te dice que hay que frotar alcohol en la piel de un niño para bajarle la fiebre. ¿Es buena idea?',
      en: 'A relative tells you to rub alcohol on a child\'s skin to bring down their fever. Is that a good idea?',
      ca: 'Un familiar et diu que cal fregar alcohol a la pell d\'un nen per baixar-li la febre. És bona idea?',
    },
    opciones: [
      {
        texto: { es: 'No, puede ser peligroso: mejor un paño fresco o un antitérmico', en: 'No, it can be dangerous: better a cool cloth or a fever reducer', ca: 'No, pot ser perillós: millor un drap fresc o un antitèrmic' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El alcohol se absorbe por la piel y también se inhala: hay casos documentados de niños intoxicados o en coma por este remedio casero.', en: 'Alcohol is absorbed through the skin and also inhaled: there are documented cases of children poisoned or in a coma from this home remedy.', ca: 'L\'alcohol s\'absorbeix per la pell i també s\'inhala: hi ha casos documentats de nens intoxicats o en coma per aquest remei casolà.' },
      },
      {
        texto: { es: 'Sí, es un remedio casero seguro', en: 'Yes, it\'s a safe home remedy', ca: 'Sí, és un remei casolà segur' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Es un mito peligroso: el alcohol en la piel de un niño puede absorberse y provocar una intoxicación grave.', en: 'It\'s a dangerous myth: alcohol on a child\'s skin can be absorbed and cause serious poisoning.', ca: 'És un mite perillós: l\'alcohol a la pell d\'un nen es pot absorbir i provocar una intoxicació greu.' },
      },
    ],
  },
  {
    id: 'orden-presion-elevar',
    situacion: {
      es: 'Alguien se corta y sangra bastante de una pierna. ¿Qué va primero: presionar la herida o levantarle la pierna?',
      en: 'Someone cuts their leg and it\'s bleeding quite a bit. Which comes first: pressing the wound or raising the leg?',
      ca: 'Algú es talla i sagna força d\'una cama. Què va primer: pressionar la ferida o alçar-li la cama?',
    },
    opciones: [
      {
        texto: { es: 'Presionar la herida primero; ya con la presión puesta, se puede levantar la pierna', en: 'Press the wound first; once pressure is applied, the leg can be raised', ca: 'Pressionar la ferida primer; ja amb la pressió posada, es pot alçar la cama' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'La prioridad siempre es cortar la hemorragia con presión directa; levantar la extremidad ayuda, pero no sustituye la presión.', en: 'The priority is always to stop the bleeding with direct pressure; raising the limb helps, but doesn\'t replace pressure.', ca: 'La prioritat sempre és tallar l\'hemorràgia amb pressió directa; alçar l\'extremitat ajuda, però no substitueix la pressió.' },
      },
      {
        texto: { es: 'Levantarle la pierna primero y presionar después', en: 'Raise the leg first and press afterwards', ca: 'Alçar-li la cama primer i pressionar després' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Levantar sin presionar antes no corta el sangrado: la presión directa va siempre primero.', en: 'Raising it without pressing first doesn\'t stop the bleeding: direct pressure always comes first.', ca: 'Alçar sense pressionar abans no talla el sagnat: la pressió directa va sempre primer.' },
      },
    ],
  },
  {
    id: 'orden-enfriar-cubrir',
    situacion: {
      es: 'Alguien se quema con aceite caliente. ¿Qué va primero: enfriar la zona con agua o cubrirla?',
      en: 'Someone burns themselves with hot oil. Which comes first: cooling the area with water or covering it?',
      ca: 'Algú es crema amb oli calent. Què va primer: refredar la zona amb aigua o cobrir-la?',
    },
    opciones: [
      {
        texto: { es: 'Enfriar con agua fría primero; cubrir con un paño limpio después si hace falta', en: 'Cool with cold water first; cover with a clean cloth afterwards if needed', ca: 'Refredar amb aigua freda primer; cobrir amb un drap net després si cal' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El agua fría es lo primero: reduce el daño en el tejido. Cubrir antes de enfriar deja que el calor siga actuando.', en: 'Cold water comes first: it reduces tissue damage. Covering before cooling lets the heat keep doing damage.', ca: 'L\'aigua freda és el primer: redueix el dany al teixit. Cobrir abans de refredar deixa que la calor segueixi actuant.' },
      },
      {
        texto: { es: 'Cubrir la quemadura primero y enfriarla después', en: 'Cover the burn first and cool it afterwards', ca: 'Cobrir la cremada primer i refredar-la després' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Cubrir antes de enfriar retrasa lo más importante: el agua fría, que limita el daño mientras antes se aplique.', en: 'Covering before cooling delays the most important step: cold water, which limits damage the sooner it\'s applied.', ca: 'Cobrir abans de refredar retarda el més important: l\'aigua freda, que limita el dany com més aviat s\'apliqui.' },
      },
    ],
  },
  {
    id: 'dolor-espalda-mayor',
    situacion: {
      es: 'Tu vecino de 78 años, que toma medicación para el corazón, se queja de un dolor repentino y muy fuerte en la espalda, entre los omóplatos, que no mejora aunque cambie de postura. Está pálido y sudoroso.',
      en: 'Your 78-year-old neighbour, who takes heart medication, complains of sudden, very intense pain in his back, between the shoulder blades, that doesn\'t improve when he changes position. He\'s pale and sweaty.',
      ca: 'El teu veí de 78 anys, que pren medicació per al cor, es queixa d\'un dolor sobtat i molt fort a l\'esquena, entre els omòplats, que no millora encara que canviï de postura. Està pàl·lid i suat.',
    },
    opciones: [
      {
        texto: { es: 'Llamar al 112 ahora mismo', en: 'Call emergency services right now', ca: 'Trucar al 112 ara mateix' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Dolor de espalda súbito e intenso que no cambia con la postura, en una persona mayor con cardiopatía, palidez y sudoración, es una combinación de señales de alarma de un problema grave del corazón o los vasos sanguíneos.', en: 'Sudden, intense back pain unchanged by position, in an older person with heart disease, pallor and sweating, is a combination of warning signs of a serious heart or blood vessel problem.', ca: 'Dolor d\'esquena sobtat i intens que no canvia amb la postura, en una persona gran amb cardiopatia, pal·lidesa i suor, és una combinació de senyals d\'alarma d\'un problema greu del cor o dels vasos sanguinis.' },
      },
      {
        texto: { es: 'Darle un analgésico y ver cómo evoluciona en casa', en: 'Give him a painkiller and see how he does at home', ca: 'Donar-li un analgèsic i veure com evoluciona a casa' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con estas señales de alarma, esperar en casa retrasa una atención que puede ser urgente.', en: 'With these warning signs, waiting at home delays care that could be urgent.', ca: 'Amb aquestes senyals d\'alarma, esperar a casa retarda una atenció que pot ser urgent.' },
      },
      {
        texto: { es: 'Aplicarle calor en la zona para relajar el músculo', en: 'Apply heat to the area to relax the muscle', ca: 'Aplicar-li calor a la zona per relaxar el múscul' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Tratarlo como si fuera un dolor muscular retrasa reconocer una posible urgencia médica real detrás del dolor.', en: 'Treating it as if it were muscle pain delays recognizing a possible real medical emergency behind the pain.', ca: 'Tractar-ho com si fos un dolor muscular retarda reconèixer una possible urgència mèdica real darrere del dolor.' },
      },
      {
        texto: { es: 'Ayudarle a hacer estiramientos suaves', en: 'Help him do some gentle stretches', ca: 'Ajudar-lo a fer estiraments suaus' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Hacer esfuerzo físico ante un posible problema cardiovascular grave puede empeorar la situación.', en: 'Physical exertion during a possible serious cardiovascular problem can make things worse.', ca: 'Fer esforç físic davant un possible problema cardiovascular greu pot empitjorar la situació.' },
      },
    ],
  },
]
