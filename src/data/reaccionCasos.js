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
  {
    id: 'nino-perdido',
    situacion: {
      es: 'Ves a un niño pequeño solo, llorando, en medio de la calle. No hay ningún adulto cerca.',
      en: 'You see a small child alone, crying, in the middle of the street. No adult is nearby.',
      ca: 'Veus un nen petit sol, plorant, enmig del carrer. No hi ha cap adult a prop.',
    },
    opciones: [
      {
        texto: { es: 'Quedarte con él, tranquilizarlo y avisar a seguridad o a la policía', en: 'Stay with him, calm him down and alert security or the police', ca: 'Quedar-te amb ell, tranquil·litzar-lo i avisar seguretat o la policia' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Lo primero es contenerlo y no dejarlo solo mientras se avisa a personal de seguridad o policía, dando su descripción para localizar a su familia.', en: 'The first thing is to comfort him and not leave him alone while alerting security staff or police, giving his description to help find his family.', ca: 'El primer és contenir-lo i no deixar-lo sol mentre s\'avisa personal de seguretat o policia, donant la seva descripció per localitzar la família.' },
      },
      {
        texto: { es: 'Llevártelo tú mismo a buscar a sus padres por la zona', en: 'Take him yourself to look for his parents around the area', ca: 'Endur-te\'l tu mateix a buscar els seus pares per la zona' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Alejar al niño del sitio donde se perdió dificulta que sus padres lo encuentren y puede malinterpretarse; mejor quedarse en el sitio y avisar a personal de seguridad.', en: 'Moving the child away from where he got lost makes it harder for his parents to find him and can be misread; better to stay put and alert security staff.', ca: 'Allunyar el nen del lloc on es va perdre dificulta que els seus pares el trobin i es pot malinterpretar; millor quedar-se al lloc i avisar personal de seguretat.' },
      },
      {
        texto: { es: 'Pasar de largo, seguro que sus padres aparecen enseguida', en: 'Walk past, his parents will surely show up soon', ca: 'Passar de llarg, segur que els pares apareixen de seguida' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Dejar solo a un niño perdido lo expone a riesgos: siempre hay que quedarse con él y dar aviso.', en: 'Leaving a lost child alone exposes him to risks: you should always stay with him and raise the alarm.', ca: 'Deixar sol un nen perdut l\'exposa a riscos: sempre cal quedar-s\'hi i donar avís.' },
      },
    ],
  },
  {
    id: 'hipotermia-leve',
    ambiguo: true,
    situacion: {
      es: 'Encuentras a alguien parado junto a su coche averiado en pleno invierno: tiembla mucho, tiene la piel fría y le cuesta hablar con claridad.',
      en: 'You find someone standing by their broken-down car in the dead of winter: shivering hard, cold skin, struggling to speak clearly.',
      ca: 'Trobes algú aturat al costat del seu cotxe avariat en ple hivern: tremola molt, té la pell freda i li costa parlar amb claredat.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a un sitio abrigado, quitarle la ropa mojada y cubrirlo con mantas secas', en: 'Get him somewhere warm, remove wet clothing and cover him with dry blankets', ca: 'Portar-lo a un lloc abrigat, treure-li la roba mullada i cobrir-lo amb mantes seques' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Con hipotermia leve, lo primero es alejarlo del frío, quitar ropa mojada y abrigarlo con mantas secas; el calentamiento debe ser progresivo.', en: 'With mild hypothermia, the first step is to get him away from the cold, remove wet clothing and wrap him in dry blankets; warming should be gradual.', ca: 'Amb hipotèrmia lleu, el primer és allunyar-lo del fred, treure-li roba mullada i abrigar-lo amb mantes seques; l\'escalfament ha de ser progressiu.' },
      },
      {
        texto: { es: 'Frotarle con fuerza los brazos y las piernas para que entre en calor', en: 'Vigorously rub his arms and legs to warm him up', ca: 'Fregar-li amb força els braços i les cames perquè agafi calor' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Frotar o masajear las extremidades puede enviar sangre fría al centro del cuerpo y bajar aún más la temperatura interna.', en: 'Rubbing or massaging the limbs can send cold blood to the body\'s core and lower the internal temperature even further.', ca: 'Fregar o massatjar les extremitats pot enviar sang freda al centre del cos i baixar encara més la temperatura interna.' },
      },
      {
        texto: { es: 'Darle un trago de alcohol para que entre en calor', en: 'Give him a shot of alcohol to warm him up', ca: 'Donar-li un glop d\'alcohol perquè agafi calor' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'El alcohol da sensación de calor pero en realidad hace que el cuerpo pierda temperatura más rápido: mejor una bebida caliente sin alcohol.', en: 'Alcohol gives a feeling of warmth but actually makes the body lose heat faster: a warm non-alcoholic drink is better.', ca: 'L\'alcohol dona sensació de calor però en realitat fa que el cos perdi temperatura més ràpid: millor una beguda calenta sense alcohol.' },
      },
    ],
  },
  {
    id: 'hipotermia-grave',
    situacion: {
      es: 'La misma persona, tras un rato a la intemperie, deja de temblar, está muy confusa y apenas puede mantenerse en pie.',
      en: 'The same person, after a while in the cold, stops shivering, is very confused and can barely stand.',
      ca: 'La mateixa persona, després d\'una estona a la intempèrie, deixa de tremolar, està molt confusa i a penes es pot mantenir dreta.',
    },
    opciones: [
      {
        texto: { es: 'Llamar al 112 de inmediato: dejar de temblar es señal de que ha empeorado mucho', en: 'Call emergency services immediately: no longer shivering is a sign it has gotten much worse', ca: 'Trucar al 112 de seguida: deixar de tremolar és senyal que ha empitjorat molt' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Confusión extrema y dejar de temblar son señales de hipotermia grave, una emergencia que necesita atención médica ya.', en: 'Extreme confusion and no longer shivering are signs of severe hypothermia, an emergency that needs medical care now.', ca: 'Confusió extrema i deixar de tremolar són senyals d\'hipotèrmia greu, una emergència que necessita atenció mèdica ja.' },
      },
      {
        texto: { es: 'Pensar que ya está mejorando, porque ha dejado de temblar', en: 'Assume he\'s improving, since he\'s stopped shivering', ca: 'Pensar que ja està millorant, perquè ha deixat de tremolar' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Dejar de temblar en hipotermia no es mejoría: es una señal de que el cuerpo ya no puede generar calor y la situación es grave.', en: 'No longer shivering in hypothermia isn\'t improvement: it\'s a sign the body can no longer generate heat and the situation is serious.', ca: 'Deixar de tremolar en hipotèrmia no és millora: és senyal que el cos ja no pot generar calor i la situació és greu.' },
      },
      {
        texto: { es: 'Meterla en una ducha de agua muy caliente para recuperar la temperatura rápido', en: 'Put her in a very hot shower to warm up quickly', ca: 'Ficar-la en una dutxa d\'aigua molt calenta per recuperar la temperatura ràpid' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El calor directo e intenso puede provocar arritmias peligrosas en una hipotermia grave: el recalentamiento debe ser progresivo y supervisado.', en: 'Direct, intense heat can cause dangerous arrhythmias in severe hypothermia: rewarming should be gradual and supervised.', ca: 'La calor directa i intensa pot provocar arrítmies perilloses en una hipotèrmia greu: el reescalfament ha de ser progressiu i supervisat.' },
      },
    ],
  },
  {
    id: 'congelacion-dedos',
    situacion: {
      es: 'Tras esquiar varias horas, notas los dedos de una mano muy fríos, duros y de color blanquecino.',
      en: 'After several hours of skiing, you notice your fingers are very cold, hard and pale white.',
      ca: 'Després d\'esquiar diverses hores, notes els dits d\'una mà molt freds, durs i de color blanquinós.',
    },
    opciones: [
      {
        texto: { es: 'Entrar en calor poco a poco, metiendo la mano bajo la axila o en agua templada', en: 'Warm up gradually by tucking the hand under your arm or in lukewarm water', ca: 'Escalfar-se a poc a poc, ficant la mà sota l\'aixella o en aigua tèbia' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Ante una posible congelación, el calentamiento debe ser gradual: bajo la axila o en agua templada (no caliente), nunca con calor directo.', en: 'With possible frostbite, warming should be gradual: under the arm or in lukewarm (not hot) water, never direct heat.', ca: 'Davant una possible congelació, l\'escalfament ha de ser gradual: sota l\'aixella o en aigua tèbia (no calenta), mai amb calor directa.' },
      },
      {
        texto: { es: 'Frotarte los dedos con nieve para reactivar la circulación', en: 'Rub your fingers with snow to get the circulation going', ca: 'Fregar-te els dits amb neu per reactivar la circulació' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Frotar la piel congelada, con nieve o de cualquier otra forma, puede dañar aún más el tejido.', en: 'Rubbing frostbitten skin, with snow or anything else, can damage the tissue even further.', ca: 'Fregar la pell congelada, amb neu o de qualsevol altra manera, pot malmetre encara més el teixit.' },
      },
      {
        texto: { es: 'Acercar la mano a una estufa para calentarla rápido', en: 'Hold your hand near a heater to warm it up quickly', ca: 'Acostar la mà a una estufa per escalfar-la ràpid' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'La piel congelada no siente bien el calor y puede quemarse sin darte cuenta con una fuente de calor directa.', en: 'Frostbitten skin doesn\'t sense heat well and can get burned without you noticing from a direct heat source.', ca: 'La pell congelada no sent bé la calor i es pot cremar sense adonar-te\'n amb una font de calor directa.' },
      },
    ],
  },
  {
    id: 'bebe-coche-caliente',
    situacion: {
      es: 'Ves a un bebé solo dentro de un coche cerrado, aparcado al sol, en pleno verano.',
      en: 'You see a baby alone inside a closed car, parked in the sun, in the middle of summer.',
      ca: 'Veus un nadó sol dins d\'un cotxe tancat, aparcat al sol, en ple estiu.',
    },
    opciones: [
      {
        texto: { es: 'Llamar al 112 de inmediato: la temperatura del coche puede subir muchísimo en minutos', en: 'Call emergency services immediately: the car\'s temperature can rise dramatically within minutes', ca: 'Trucar al 112 de seguida: la temperatura del cotxe pot pujar moltíssim en minuts' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Un coche cerrado al sol puede subir 20°C en menos de una hora: es una emergencia real, no se espera a ver qué pasa.', en: 'A closed car in the sun can heat up 20°C in under an hour: this is a real emergency, you don\'t wait and see.', ca: 'Un cotxe tancat al sol pot pujar 20°C en menys d\'una hora: és una emergència real, no s\'espera a veure què passa.' },
      },
      {
        texto: { es: 'Esperar junto al coche a que vuelvan sus padres, sin hacer nada más', en: 'Wait by the car for the parents to return, without doing anything else', ca: 'Esperar al costat del cotxe que tornin els pares, sense fer res més' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Un bebé solo en un coche caliente puede sufrir un golpe de calor grave en minutos: no se puede esperar sin avisar a emergencias.', en: 'A baby alone in a hot car can suffer a serious heatstroke within minutes: you can\'t just wait without alerting emergency services.', ca: 'Un nadó sol en un cotxe calent pot patir un cop de calor greu en minuts: no es pot esperar sense avisar emergències.' },
      },
      {
        texto: { es: 'Marcharte, seguro que sus padres vuelven enseguida', en: 'Walk away, his parents will surely be back soon', ca: 'Marxar, segur que els pares tornen de seguida' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Ignorar a un bebé solo en un coche caliente puede costarle la vida: siempre hay que avisar a emergencias.', en: 'Ignoring a baby alone in a hot car can cost his life: emergency services must always be alerted.', ca: 'Ignorar un nadó sol en un cotxe calent li pot costar la vida: sempre cal avisar emergències.' },
      },
    ],
  },
  {
    id: 'monoxido-carbono',
    situacion: {
      es: 'Toda tu familia amanece con dolor de cabeza, mareo y náuseas después de dormir con la caldera encendida. No hay ninguna otra explicación clara.',
      en: 'Your whole family wakes up with headaches, dizziness and nausea after sleeping with the boiler on. There\'s no other clear explanation.',
      ca: 'Tota la teva família es desperta amb mal de cap, marejos i nàusees després de dormir amb la caldera encesa. No hi ha cap altra explicació clara.',
    },
    opciones: [
      {
        texto: { es: 'Abrir puertas y ventanas, salir de casa y llamar a emergencias', en: 'Open doors and windows, leave the house and call emergency services', ca: 'Obrir portes i finestres, sortir de casa i trucar a emergències' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Dolor de cabeza, mareo y náuseas en toda la casa tras dormir con una caldera puede ser monóxido de carbono: hay que ventilar, salir y pedir ayuda.', en: 'Headache, dizziness and nausea throughout the house after sleeping with a boiler on can be carbon monoxide: ventilate, get out and call for help.', ca: 'Mal de cap, marejos i nàusees a tota la casa després de dormir amb una caldera pot ser monòxid de carboni: cal ventilar, sortir i demanar ajuda.' },
      },
      {
        texto: { es: 'Tomar un analgésico para el dolor de cabeza y seguir con el día en casa', en: 'Take a painkiller for the headache and carry on with the day at home', ca: 'Prendre un analgèsic pel mal de cap i seguir el dia a casa' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Quedarse en un ambiente con posible monóxido de carbono mientras solo se trata el síntoma puede agravar la intoxicación.', en: 'Staying in an environment with possible carbon monoxide while only treating the symptom can worsen the poisoning.', ca: 'Quedar-se en un ambient amb possible monòxid de carboni mentre només es tracta el símptoma pot agreujar la intoxicació.' },
      },
      {
        texto: { es: 'Abrir una ventana y esperar a ver si se pasa a lo largo del día', en: 'Open a window and wait to see if it passes over the day', ca: 'Obrir una finestra i esperar a veure si es passa al llarg del dia' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Con sospecha de monóxido de carbono no basta con abrir una ventana: hay que salir de casa y pedir ayuda, no quedarse a esperar.', en: 'With suspected carbon monoxide, opening a window isn\'t enough: you need to leave the house and get help, not stay and wait.', ca: 'Amb sospita de monòxid de carboni no n\'hi ha prou amb obrir una finestra: cal sortir de casa i demanar ajuda, no quedar-se a esperar.' },
      },
    ],
  },
  {
    id: 'intoxicacion-etilica',
    situacion: {
      es: 'En una fiesta, un amigo ha bebido mucho y ya no responde bien: contesta a duras penas y parece muy adormilado.',
      en: 'At a party, a friend has had too much to drink and isn\'t responding well: he barely answers and seems very drowsy.',
      ca: 'En una festa, un amic ha begut molt i ja no respon bé: contesta a penes i sembla molt adormit.',
    },
    opciones: [
      {
        texto: { es: 'Ponerlo en posición lateral de seguridad, vigilarlo sin dejarlo solo y llamar al 112 si empeora', en: 'Put him in the recovery position, watch him without leaving him alone, and call emergency services if he worsens', ca: 'Posar-lo en posició lateral de seguretat, vigilar-lo sense deixar-lo sol i trucar al 112 si empitjora' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Muchas muertes por intoxicación etílica son por ahogamiento con el propio vómito: la posición lateral de seguridad y no dejarlo solo son claves.', en: 'Many alcohol-poisoning deaths happen from choking on one\'s own vomit: the recovery position and not leaving him alone are key.', ca: 'Moltes morts per intoxicació etílica són per ofegament amb el propi vòmit: la posició lateral de seguretat i no deixar-lo sol són claus.' },
      },
      {
        texto: { es: 'Dejarlo dormir solo en una habitación para que se le pase', en: 'Let him sleep it off alone in a room', ca: 'Deixar-lo dormir sol en una habitació perquè se li passi' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Dejarlo solo es peligroso: si vomita mientras duerme boca arriba puede ahogarse sin que nadie se dé cuenta.', en: 'Leaving him alone is dangerous: if he vomits while sleeping on his back, he could choke without anyone noticing.', ca: 'Deixar-lo sol és perillós: si vomita mentre dorm boca amunt es pot ofegar sense que ningú se n\'adoni.' },
      },
      {
        texto: { es: 'Darle café bien cargado para que se espabile', en: 'Give him strong coffee to sober him up', ca: 'Donar-li cafè ben carregat perquè s\'espavili' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'El café no elimina el alcohol del cuerpo ni lo hace estar menos intoxicado: solo da una falsa sensación de que está mejor.', en: 'Coffee doesn\'t remove alcohol from the body or make him less intoxicated: it just gives a false sense that he\'s better.', ca: 'El cafè no elimina l\'alcohol del cos ni fa que estigui menys intoxicat: només dona una falsa sensació que està millor.' },
      },
    ],
  },
  {
    id: 'golpe-cabeza-nino-leve',
    ambiguo: true,
    situacion: {
      es: 'Un niño se golpea la cabeza jugando en el parque. Llora un momento, pero enseguida vuelve a jugar con normalidad.',
      en: 'A child bumps his head playing in the park. He cries for a moment, but soon goes back to playing normally.',
      ca: 'Un nen es colpeja el cap jugant al parc. Plora un moment, però de seguida torna a jugar amb normalitat.',
    },
    opciones: [
      {
        texto: { es: 'Tranquilizarlo y vigilarlo en casa durante las horas siguientes', en: 'Calm him down and watch him at home over the next few hours', ca: 'Tranquil·litzar-lo i vigilar-lo a casa durant les hores següents' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Sin pérdida de conocimiento y volviendo a jugar con normalidad, basta con vigilarlo en casa por si aparecen señales de alarma.', en: 'Without loss of consciousness and going back to normal play, it\'s enough to watch him at home in case warning signs appear.', ca: 'Sense pèrdua de coneixement i tornant a jugar amb normalitat, n\'hi ha prou amb vigilar-lo a casa per si apareixen senyals d\'alarma.' },
      },
      {
        texto: { es: 'Llevarlo a urgencias ahora mismo por si acaso', en: 'Take him to the ER right away just in case', ca: 'Portar-lo a urgències ara mateix per si de cas' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin señales de alarma (pérdida de conocimiento, vómitos, somnolencia excesiva), no hace falta urgencias: basta con observarlo en casa.', en: 'Without warning signs (loss of consciousness, vomiting, excessive drowsiness), the ER isn\'t needed: watching him at home is enough.', ca: 'Sense senyals d\'alarma (pèrdua de coneixement, vòmits, somnolència excessiva), no cal urgències: n\'hi ha prou amb observar-lo a casa.' },
      },
      {
        texto: { es: 'No volver a pensar en ello, los golpes de niño no tienen importancia', en: 'Not think about it again, kids\' bumps don\'t matter', ca: 'No tornar-hi a pensar, els cops de nen no tenen importància' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Aunque parezca leve, conviene vigilar al niño las horas siguientes por si aparecen señales de alarma que sí requieran atención médica.', en: 'Even if it seems mild, the child should be watched over the following hours in case warning signs appear that do need medical attention.', ca: 'Encara que sembli lleu, convé vigilar el nen les hores següents per si apareixen senyals d\'alarma que sí que requereixin atenció mèdica.' },
      },
    ],
  },
  {
    id: 'golpe-cabeza-nino-alarma',
    situacion: {
      es: 'El mismo niño, un rato después de golpearse la cabeza, vomita dos veces y está muy somnoliento, distinto a como es normalmente.',
      en: 'The same child, a while after bumping his head, vomits twice and is very drowsy, unlike his usual self.',
      ca: 'El mateix nen, una estona després de colpejar-se el cap, vomita dues vegades i està molt somnolent, diferent de com és normalment.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a urgencias ahora: vomitar varias veces y estar muy somnoliento son señales de alarma', en: 'Take him to the ER now: vomiting repeatedly and being very drowsy are warning signs', ca: 'Portar-lo a urgències ara: vomitar diverses vegades i estar molt somnolent són senyals d\'alarma' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Vómitos repetidos y somnolencia excesiva tras un golpe en la cabeza son señales de alarma que requieren valoración médica sin esperar.', en: 'Repeated vomiting and excessive drowsiness after a head bump are warning signs that need medical evaluation without delay.', ca: 'Vòmits repetits i somnolència excessiva després d\'un cop al cap són senyals d\'alarma que requereixen valoració mèdica sense esperar.' },
      },
      {
        texto: { es: 'Dejarlo dormir mucho, seguro que está simplemente cansado', en: 'Let him sleep it off, he\'s probably just tired', ca: 'Deixar-lo dormir molt, segur que només està cansat' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Confundir señales de alarma con simple cansancio puede retrasar la detección de una lesión interna importante.', en: 'Mistaking warning signs for simple tiredness can delay detecting a significant internal injury.', ca: 'Confondre senyals d\'alarma amb simple cansament pot retardar la detecció d\'una lesió interna important.' },
      },
      {
        texto: { es: 'Darle de comer para que recupere fuerzas', en: 'Give him food to regain his strength', ca: 'Donar-li de menjar perquè recuperi forces' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con vómitos y señales de alarma tras un golpe en la cabeza, lo prioritario es buscar atención médica, no darle de comer.', en: 'With vomiting and warning signs after a head bump, the priority is seeking medical attention, not feeding him.', ca: 'Amb vòmits i senyals d\'alarma després d\'un cop al cap, el prioritari és buscar atenció mèdica, no donar-li de menjar.' },
      },
    ],
  },
  {
    id: 'ictus-fast',
    situacion: {
      es: 'Tu padre, mientras habláis, se le cae de golpe media cara, no puede levantar un brazo, y las palabras le salen arrastradas y confusas.',
      en: 'While talking with your father, one side of his face suddenly droops, he can\'t raise one arm, and his words come out slurred and confused.',
      ca: 'El teu pare, mentre parleu, se li cau de cop mitja cara, no pot aixecar un braç, i les paraules li surten arrossegades i confuses.',
    },
    opciones: [
      {
        texto: { es: 'Llamar al 112 de inmediato y anotar la hora en que empezaron los síntomas', en: 'Call emergency services immediately and note the time the symptoms started', ca: 'Trucar al 112 de seguida i anotar l\'hora en què van començar els símptomes' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Cara caída, debilidad en un brazo y habla confusa son las señales FAST de un ictus: cada minuto cuenta, y saber la hora exacta ayuda al tratamiento.', en: 'Facial droop, arm weakness and slurred speech are the FAST signs of a stroke: every minute counts, and knowing the exact time helps treatment.', ca: 'Cara caiguda, debilitat en un braç i parla confusa són les senyals FAST d\'un ictus: cada minut compta, i saber l\'hora exacta ajuda al tractament.' },
      },
      {
        texto: { es: 'Darle algo de comer con azúcar, seguro que es una bajada de tensión', en: 'Give him something sugary to eat, it\'s probably just low blood pressure', ca: 'Donar-li alguna cosa de menjar amb sucre, segur que és una baixada de tensió' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'No se le debe dar comida ni bebida: si es un ictus, puede tener dificultad para tragar y atragantarse, y se pierde tiempo crucial.', en: 'He shouldn\'t be given food or drink: if it\'s a stroke, he may have trouble swallowing and could choke, and crucial time is lost.', ca: 'No se li ha de donar menjar ni beure: si és un ictus, pot tenir dificultat per empassar i ennuegar-se, i es perd temps crucial.' },
      },
      {
        texto: { es: 'Esperar a ver si se le pasa solo en un rato', en: 'Wait to see if it passes on its own in a while', ca: 'Esperar a veure si se li passa sol en una estona' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Ante un posible ictus, cada minuto sin tratamiento aumenta el daño cerebral: no se espera, se llama ya.', en: 'With a possible stroke, every minute without treatment increases brain damage: you don\'t wait, you call right away.', ca: 'Davant un possible ictus, cada minut sense tractament augmenta el dany cerebral: no s\'espera, es truca ja.' },
      },
    ],
  },
  {
    id: 'crisis-ansiedad',
    ambiguo: true,
    situacion: {
      es: 'Un amigo empieza a respirar muy rápido, dice que no puede respirar bien y que siente que se va a morir, aunque está consciente y hablando.',
      en: 'A friend starts breathing very fast, says he can\'t breathe properly and feels like he\'s going to die, though he\'s conscious and talking.',
      ca: 'Un amic comença a respirar molt ràpid, diu que no pot respirar bé i que sent que es morirà, encara que està conscient i parlant.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a un sitio tranquilo y ayudarlo a respirar despacio, inhalando por la nariz y soltando el aire por la boca', en: 'Take him somewhere calm and help him breathe slowly, inhaling through the nose and out through the mouth', ca: 'Portar-lo a un lloc tranquil i ajudar-lo a respirar a poc a poc, inhalant pel nas i traient l\'aire per la boca' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'En una crisis de ansiedad, calmar el entorno y guiar una respiración lenta ayuda a cortar la hiperventilación.', en: 'In an anxiety attack, calming the environment and guiding slow breathing helps stop hyperventilation.', ca: 'En una crisi d\'ansietat, calmar l\'entorn i guiar una respiració lenta ajuda a tallar la hiperventilació.' },
      },
      {
        texto: { es: 'Llamar a una ambulancia de inmediato, sin más', en: 'Call an ambulance immediately, without doing anything else', ca: 'Trucar a una ambulància de seguida, sense més' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Una crisis de ansiedad sin otras señales de alarma no suele necesitar ambulancia: primero se intenta calmar y guiar la respiración.', en: 'An anxiety attack without other warning signs usually doesn\'t need an ambulance: first try to calm him and guide his breathing.', ca: 'Una crisi d\'ansietat sense altres senyals d\'alarma no sol necessitar ambulància: primer s\'intenta calmar i guiar la respiració.' },
      },
      {
        texto: { es: 'Decirle que se calme y dejarlo solo un rato para que se le pase', en: 'Tell him to calm down and leave him alone for a while', ca: 'Dir-li que es calmi i deixar-lo sol una estona perquè se li passi' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Dejarlo solo no ayuda: acompañarlo y guiar la respiración es mucho más efectivo que decirle simplemente que se calme.', en: 'Leaving him alone doesn\'t help: staying with him and guiding his breathing is much more effective than just telling him to calm down.', ca: 'Deixar-lo sol no ajuda: acompanyar-lo i guiar la respiració és molt més efectiu que dir-li simplement que es calmi.' },
      },
    ],
  },
  {
    id: 'aplastamiento-mueble',
    situacion: {
      es: 'A un operario se le cae encima un mueble pesado y le queda atrapada una pierna. Está consciente, pero no puede moverla.',
      en: 'A heavy piece of furniture falls on a worker, trapping his leg. He\'s conscious, but can\'t move it.',
      ca: 'A un operari se li cau a sobre un moble pesat i li queda atrapada una cama. Està conscient, però no la pot moure.',
    },
    opciones: [
      {
        texto: { es: 'Llamar al 112 y no intentar liberarlo de golpe tú solo', en: 'Call emergency services and don\'t try to free him abruptly on your own', ca: 'Trucar al 112 i no intentar alliberar-lo de cop tu sol' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Liberar de golpe una extremidad atrapada mucho tiempo puede liberar sustancias tóxicas a la sangre y provocar un paro cardíaco: hace falta personal preparado.', en: 'Suddenly freeing a limb trapped for a long time can release toxic substances into the blood and cause cardiac arrest: trained personnel are needed.', ca: 'Alliberar de cop una extremitat atrapada molta estona pot alliberar substàncies tòxiques a la sang i provocar una aturada cardíaca: cal personal preparat.' },
      },
      {
        texto: { es: 'Tirar del mueble entre varias personas para sacarlo cuanto antes', en: 'Pull the furniture off with several people to get him out as fast as possible', ca: 'Estirar el moble entre diverses persones per treure\'l com abans millor' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Liberar bruscamente a alguien atrapado mucho tiempo puede ser tan peligroso como seguir atrapado: hace falta preparación médica antes de retirar el peso.', en: 'Abruptly freeing someone trapped for a long time can be as dangerous as staying trapped: medical preparation is needed before removing the weight.', ca: 'Alliberar bruscament algú atrapat molta estona pot ser tan perillós com seguir atrapat: cal preparació mèdica abans de retirar el pes.' },
      },
      {
        texto: { es: 'Dejarlo esperando solo mientras vas a buscar ayuda', en: 'Leave him waiting alone while you go look for help', ca: 'Deixar-lo esperant sol mentre vas a buscar ajuda' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Mejor llamar desde donde estás y quedarte acompañándolo y vigilando su estado hasta que llegue ayuda.', en: 'It\'s better to call from where you are and stay with him, watching his condition until help arrives.', ca: 'Millor trucar des d\'on ets i quedar-te acompanyant-lo i vigilant el seu estat fins que arribi ajuda.' },
      },
    ],
  },
  {
    id: 'mordedura-perro',
    situacion: {
      es: 'Un perro callejero te muerde en la pierna. La piel se ha roto y sangra un poco.',
      en: 'A stray dog bites your leg. The skin is broken and bleeding a little.',
      ca: 'Un gos vagabund et mossega la cama. La pell s\'ha trencat i sagna una mica.',
    },
    opciones: [
      {
        texto: { es: 'Lavar la herida con agua abundante varios minutos y acudir a un centro médico en las próximas horas', en: 'Wash the wound with plenty of water for several minutes and see a doctor within the next few hours', ca: 'Rentar la ferida amb aigua abundant uns minuts i anar a un centre mèdic en les properes hores' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Lavar bien la herida reduce el riesgo de infección, y al ser un perro callejero conviene que valoren si hace falta vacuna antitetánica o antirrábica.', en: 'Washing the wound thoroughly reduces infection risk, and since it\'s a stray dog, it should be assessed for tetanus or rabies vaccination.', ca: 'Rentar bé la ferida redueix el risc d\'infecció, i en ser un gos vagabund convé que valorin si cal vacuna antitetànica o antiràbica.' },
      },
      {
        texto: { es: 'Echar alcohol o yodo directamente en la herida', en: 'Pour alcohol or iodine directly on the wound', ca: 'Tirar alcohol o iode directament a la ferida' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Los productos irritantes no son lo primero: lo prioritario es lavar bien con agua antes de aplicar cualquier otra cosa.', en: 'Irritant products aren\'t the first step: the priority is washing well with water before applying anything else.', ca: 'Els productes irritants no són el primer: el prioritari és rentar bé amb aigua abans d\'aplicar qualsevol altra cosa.' },
      },
      {
        texto: { es: 'No darle importancia, ya cicatrizará sola', en: 'Not worry about it, it\'ll heal on its own', ca: 'No donar-hi importància, ja cicatritzarà sola' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Una mordedura de un perro desconocido, sin saber si está vacunado, necesita valoración médica por el riesgo de infección o rabia.', en: 'A bite from an unknown dog, without knowing if it\'s vaccinated, needs medical assessment because of infection or rabies risk.', ca: 'Una mossegada d\'un gos desconegut, sense saber si està vacunat, necessita valoració mèdica pel risc d\'infecció o ràbia.' },
      },
    ],
  },
  {
    id: 'fiebre-alta-bebe',
    situacion: {
      es: 'Un bebé de 2 meses tiene 38.2°C de fiebre y está muy decaído, apenas reacciona.',
      en: 'A 2-month-old baby has a 38.2°C fever and is very listless, barely reacting.',
      ca: 'Un nadó de 2 mesos té 38.2°C de febre i està molt decaigut, a penes reacciona.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a urgencias sin esperar', en: 'Take him to the ER without waiting', ca: 'Portar-lo a urgències sense esperar' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'En bebés muy pequeños, la fiebre junto con decaimiento importante es señal de alarma que requiere valoración médica sin esperar.', en: 'In very young babies, fever combined with significant listlessness is a warning sign that needs medical evaluation without delay.', ca: 'En nadons molt petits, la febre juntament amb decaïment important és senyal d\'alarma que requereix valoració mèdica sense esperar.' },
      },
      {
        texto: { es: 'Darle un antitérmico y esperar a ver cómo sigue mañana', en: 'Give him a fever reducer and see how he is tomorrow', ca: 'Donar-li un antitèrmic i esperar a veure com segueix demà' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'En un bebé tan pequeño, la fiebre con decaimiento no se maneja solo con antitérmico en casa: hace falta que lo valore un médico ya.', en: 'In such a young baby, fever with listlessness isn\'t managed with just a fever reducer at home: he needs to be seen by a doctor now.', ca: 'En un nadó tan petit, la febre amb decaïment no es maneja només amb antitèrmic a casa: cal que el valori un metge ja.' },
      },
      {
        texto: { es: 'Bañarlo en agua muy fría para bajarle la temperatura rápido', en: 'Bathe him in very cold water to bring his temperature down fast', ca: 'Banyar-lo en aigua molt freda per baixar-li la temperatura ràpid' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El agua muy fría puede provocarle escalofríos y que suba de nuevo la temperatura interna, además de no ser lo prioritario ahora mismo.', en: 'Very cold water can cause shivering and make his internal temperature rise again, and it\'s not the priority right now anyway.', ca: 'L\'aigua molt freda li pot provocar calfreds i que pugi de nou la temperatura interna, a més de no ser el prioritari ara mateix.' },
      },
    ],
  },
  {
    id: 'calambres-calor-deporte',
    ambiguo: true,
    situacion: {
      es: 'Corriendo una carrera popular en un día caluroso, te empiezan a dar calambres fuertes en las piernas.',
      en: 'Running a race on a hot day, you start getting strong cramps in your legs.',
      ca: 'Corrent una cursa popular en un dia calorós, et comencen a fer rampes fortes a les cames.',
    },
    opciones: [
      {
        texto: { es: 'Parar, descansar a la sombra y beber agua o una bebida con electrolitos', en: 'Stop, rest in the shade and drink water or a drink with electrolytes', ca: 'Parar, descansar a l\'ombra i beure aigua o una beguda amb electròlits' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Los calambres por calor se deben a la pérdida de líquidos y sales al sudar: parar, descansar e hidratarse es lo correcto.', en: 'Heat cramps are caused by fluid and salt loss from sweating: stopping, resting and rehydrating is the right response.', ca: 'Les rampes per calor es deuen a la pèrdua de líquids i sals en suar: parar, descansar i hidratar-se és el correcte.' },
      },
      {
        texto: { es: 'Seguir corriendo, ya se pasará el calambre solo', en: 'Keep running, the cramp will pass on its own', ca: 'Seguir corrent, ja se li passarà la rampa sola' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Seguir esforzándote con calambres por calor puede llevar a un cuadro más grave, como un agotamiento por calor.', en: 'Continuing to push through heat cramps can lead to a more serious condition, like heat exhaustion.', ca: 'Seguir esforçant-te amb rampes per calor pot portar a un quadre més greu, com un esgotament per calor.' },
      },
      {
        texto: { es: 'Llamar a una ambulancia de inmediato', en: 'Call an ambulance immediately', ca: 'Trucar a una ambulància de seguida' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Un calambre por calor que mejora al parar y beber no suele necesitar ambulancia; solo si no mejora en una hora hace falta buscar ayuda médica.', en: 'A heat cramp that improves after stopping and drinking usually doesn\'t need an ambulance; only if it doesn\'t improve within an hour is medical help needed.', ca: 'Una rampa per calor que millora en parar i beure no sol necessitar ambulància; només si no millora en una hora cal buscar ajuda mèdica.' },
      },
    ],
  },
  {
    id: 'incendio-humo',
    situacion: {
      es: 'Sales de un piso en llamas y el pasillo está lleno de humo espeso.',
      en: 'You\'re escaping a flat that\'s on fire and the hallway is full of thick smoke.',
      ca: 'Surts d\'un pis en flames i el passadís està ple de fum espès.',
    },
    opciones: [
      {
        texto: { es: 'Agacharte y avanzar a gatas hacia la salida, cubriéndote la boca y la nariz', en: 'Crouch down and crawl toward the exit, covering your mouth and nose', ca: 'Ajupir-te i avançar a gates cap a la sortida, cobrint-te la boca i el nas' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El humo tóxico sube con el calor: el aire más respirable está cerca del suelo, así que hay que agacharse para salir.', en: 'Toxic smoke rises with the heat: the most breathable air is near the ground, so you need to crouch down to get out.', ca: 'El fum tòxic puja amb la calor: l\'aire més respirable és a prop del terra, així que cal ajupir-se per sortir.' },
      },
      {
        texto: { es: 'Usar el ascensor para bajar cuanto antes', en: 'Use the elevator to get down as fast as possible', ca: 'Fer servir l\'ascensor per baixar com abans millor' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El hueco del ascensor se llena de humo y puede fallar durante un incendio: nunca se usa, siempre las escaleras.', en: 'The elevator shaft fills with smoke and can fail during a fire: never use it, always take the stairs.', ca: 'El buit de l\'ascensor s\'omple de fum i pot fallar durant un incendi: mai s\'utilitza, sempre les escales.' },
      },
      {
        texto: { es: 'Caminar erguido y deprisa hacia la salida para llegar antes', en: 'Walk upright and fast toward the exit to get there sooner', ca: 'Caminar dret i de pressa cap a la sortida per arribar abans' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Caminar erguido en un pasillo con humo espeso hace que respires el aire más tóxico, que se concentra arriba.', en: 'Walking upright in a hallway full of thick smoke means breathing the most toxic air, which collects up high.', ca: 'Caminar dret en un passadís amb fum espès fa que respiris l\'aire més tòxic, que es concentra a dalt.' },
      },
    ],
  },
  {
    id: 'quemadura-solar-ampollas',
    situacion: {
      es: 'Tras un día en la playa sin protección, tienes la piel muy roja, caliente, y te han salido ampollas.',
      en: 'After a day at the beach without protection, your skin is very red, hot, and blisters have appeared.',
      ca: 'Després d\'un dia a la platja sense protecció, tens la pell molt vermella, calenta, i t\'han sortit butllofes.',
    },
    opciones: [
      {
        texto: { es: 'Refrescar la piel con agua templada, hidratarte bien y no tocar las ampollas', en: 'Cool the skin with lukewarm water, hydrate well and leave the blisters alone', ca: 'Refrescar la pell amb aigua tèbia, hidratar-te bé i no tocar les butllofes' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Las ampollas intactas protegen la piel nueva de infecciones: no se tocan, y refrescar la piel más beber agua ayuda a la recuperación.', en: 'Intact blisters protect the new skin from infection: leave them alone, and cooling the skin plus drinking water helps recovery.', ca: 'Les butllofes intactes protegeixen la pell nova d\'infeccions: no es toquen, i refrescar la pell més beure aigua ajuda a la recuperació.' },
      },
      {
        texto: { es: 'Reventar las ampollas para que se sequen antes', en: 'Pop the blisters so they dry out faster', ca: 'Rebentar les butllofes perquè s\'assequin abans' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Reventar una ampolla deja la piel nueva expuesta y aumenta mucho el riesgo de infección.', en: 'Popping a blister exposes the new skin underneath and greatly increases the risk of infection.', ca: 'Rebentar una butllofa deixa la pell nova exposada i augmenta molt el risc d\'infecció.' },
      },
      {
        texto: { es: 'Ponerte hielo directamente sobre las ampollas', en: 'Put ice directly on the blisters', ca: 'Posar-te gel directament sobre les butllofes' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El hielo directo puede dañar más una piel ya quemada: se usa agua templada, no hielo.', en: 'Direct ice can further damage already-burned skin: use lukewarm water, not ice.', ca: 'El gel directe pot malmetre més una pell ja cremada: es fa servir aigua tèbia, no gel.' },
      },
    ],
  },
  {
    id: 'pila-boton',
    situacion: {
      es: 'Ves a un niño pequeño con una pila de botón en la mano y sospechas que se ha tragado una.',
      en: 'You see a small child with a button battery in his hand and suspect he\'s swallowed one.',
      ca: 'Veus un nen petit amb una pila de botó a la mà i sospites que se n\'ha empassat una.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a urgencias de inmediato, sin esperar a ver síntomas', en: 'Take him to the ER immediately, without waiting for symptoms', ca: 'Portar-lo a urgències de seguida, sense esperar a veure símptomes' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Una pila de botón puede causar quemaduras muy graves por dentro en menos de dos horas: es una urgencia real aunque el niño parezca estar bien.', en: 'A button battery can cause very serious internal burns in under two hours: it\'s a real emergency even if the child seems fine.', ca: 'Una pila de botó pot causar cremades molt greus per dins en menys de dues hores: és una urgència real encara que el nen sembli estar bé.' },
      },
      {
        texto: { es: 'Esperar a ver si le da algún síntoma antes de hacer nada', en: 'Wait to see if he develops any symptoms before doing anything', ca: 'Esperar a veure si li dona algun símptoma abans de fer res' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'El daño de una pila de botón puede empezar antes de que aparezcan síntomas claros: no se espera, se va a urgencias ya.', en: 'Damage from a button battery can start before clear symptoms appear: don\'t wait, go to the ER now.', ca: 'El dany d\'una pila de botó pot començar abans que apareguin símptomes clars: no s\'espera, es va a urgències ja.' },
      },
      {
        texto: { es: 'Provocarle el vómito para que la expulse', en: 'Induce vomiting to get it out', ca: 'Provocar-li el vòmit perquè l\'expulsi' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Provocar el vómito puede hacer que la pila dañe el esófago al subir: nunca se hace, hay que ir a urgencias.', en: 'Inducing vomiting can make the battery damage the esophagus on the way up: never do this, go to the ER instead.', ca: 'Provocar el vòmit pot fer que la pila malmeti l\'esòfag en pujar: mai es fa, cal anar a urgències.' },
      },
    ],
  },
  {
    id: 'clavo-oxidado-sucio',
    situacion: {
      es: 'Pisas un clavo oxidado y sucio en un jardín descuidado. Te hace una herida punzante y no recuerdas si estás vacunado del tétanos.',
      en: 'You step on a rusty, dirty nail in an overgrown garden. It punctures your skin and you don\'t remember if you\'re vaccinated against tetanus.',
      ca: 'Trepitges un clau oxidat i brut en un jardí descuidat. Et fa una ferida punxant i no recordes si estàs vacunat del tètanus.',
    },
    opciones: [
      {
        texto: { es: 'Lavar bien la herida con agua y jabón, y acudir a un centro de salud para valorar la vacuna', en: 'Wash the wound well with soap and water, and go to a health centre to check on the vaccine', ca: 'Rentar bé la ferida amb aigua i sabó, i anar a un centre de salut per valorar la vacuna' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'No es el óxido en sí, sino la suciedad, lo que puede transmitir la bacteria del tétanos: hay que lavar bien y que valoren si necesitas un refuerzo de vacuna.', en: 'It\'s not the rust itself but the dirt that can carry the tetanus bacteria: wash well and get assessed for a vaccine booster.', ca: 'No és l\'òxid en si, sinó la brutícia, el que pot transmetre el bacteri del tètanus: cal rentar bé i que valorin si necessites un reforç de vacuna.' },
      },
      {
        texto: { es: 'No darle importancia porque es una herida pequeña', en: 'Not worry about it because it\'s a small wound', ca: 'No donar-hi importància perquè és una ferida petita' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Las heridas punzantes y sucias son precisamente las que más riesgo tienen de tétanos, aunque parezcan pequeñas.', en: 'Puncture wounds that are dirty are precisely the ones with the highest tetanus risk, even if they look small.', ca: 'Les ferides punxants i brutes són precisament les que més risc tenen de tètanus, encara que semblin petites.' },
      },
      {
        texto: { es: 'Echar lejía en la herida para desinfectarla bien', en: 'Pour bleach on the wound to disinfect it thoroughly', ca: 'Tirar lleixiu a la ferida per desinfectar-la bé' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'La lejía daña gravemente el tejido: para desinfectar una herida se usa agua y jabón, o un antiséptico adecuado, nunca lejía.', en: 'Bleach severely damages tissue: to disinfect a wound, use soap and water, or a proper antiseptic — never bleach.', ca: 'El lleixiu danya greument el teixit: per desinfectar una ferida es fa servir aigua i sabó, o un antisèptic adequat, mai lleixiu.' },
      },
    ],
  },
  {
    id: 'picadura-medusa',
    situacion: {
      es: 'Nadando en el mar, sientes un escozor fuerte al rozar una medusa. Se te queda una marca roja en la piel.',
      en: 'Swimming in the sea, you feel a sharp sting after brushing against a jellyfish. A red mark is left on your skin.',
      ca: 'Nadant al mar, sents un escalfament fort en fregar una medusa. Et queda una marca vermella a la pell.',
    },
    opciones: [
      {
        texto: { es: 'Lavar la zona con agua de mar (no dulce) y aplicar frío sin frotar', en: 'Rinse the area with seawater (not fresh water) and apply cold without rubbing', ca: 'Rentar la zona amb aigua de mar (no dolça) i aplicar fred sense fregar' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El agua dulce puede hacer que resten restos de la medusa liberen más veneno: se usa agua de mar, y luego frío sin frotar para el dolor.', en: 'Fresh water can trigger remaining jellyfish stingers to release more venom: use seawater, then cold without rubbing for the pain.', ca: 'L\'aigua dolça pot fer que les restes de la medusa alliberin més verí: es fa servir aigua de mar, i després fred sense fregar pel dolor.' },
      },
      {
        texto: { es: 'Frotar la zona con arena para quitar los restos', en: 'Rub the area with sand to remove the remains', ca: 'Fregar la zona amb sorra per treure les restes' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Frotar, con arena o con lo que sea, puede activar más células urticantes que aún queden en la piel y empeorar el dolor.', en: 'Rubbing, with sand or anything else, can trigger more stinging cells still on the skin and worsen the pain.', ca: 'Fregar, amb sorra o amb qualsevol cosa, pot activar més cèl·lules urticants que encara quedin a la pell i empitjorar el dolor.' },
      },
      {
        texto: { es: 'Echarse orina en la zona, es un remedio casero conocido', en: 'Urinate on the area, it\'s a well-known home remedy', ca: 'Fer-se pipí a la zona, és un remei casolà conegut' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Es un mito sin base científica: la orina no desactiva el veneno y puede incluso activar más células urticantes.', en: 'This is a myth with no scientific basis: urine doesn\'t neutralize the venom and can even trigger more stinging cells.', ca: 'És un mite sense base científica: l\'orina no desactiva el verí i pot fins i tot activar més cèl·lules urticants.' },
      },
    ],
  },
  {
    id: 'autoheimlich',
    situacion: {
      es: 'Estás comiendo solo en casa y notas que te has atragantado del todo: no puedes toser ni hablar, y no hay nadie más contigo.',
      en: 'You\'re eating alone at home and realize you\'re completely choking: you can\'t cough or speak, and there\'s no one else with you.',
      ca: 'Estàs menjant sol a casa i notes que t\'has ennuegat del tot: no pots tossir ni parlar, i no hi ha ningú més amb tu.',
    },
    opciones: [
      {
        texto: { es: 'Hacerte compresiones abdominales apoyando el abdomen sobre el respaldo de una silla', en: 'Give yourself abdominal thrusts by leaning your abdomen against the back of a chair', ca: 'Fer-te compressions abdominals recolzant l\'abdomen sobre el respatller d\'una cadira' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Solo y sin poder pedir ayuda, apoyar el abdomen sobre el respaldo de una silla y empujar hacia dentro y arriba genera más presión que hacerlo solo con las manos.', en: 'Alone and unable to call for help, leaning your abdomen against a chair back and pushing inward and upward generates more pressure than doing it with your hands alone.', ca: 'Sol i sense poder demanar ajuda, recolzar l\'abdomen sobre el respatller d\'una cadira i empènyer cap endins i amunt genera més pressió que fer-ho només amb les mans.' },
      },
      {
        texto: { es: 'Tumbarte en el suelo y esperar a que alguien llegue', en: 'Lie down on the floor and wait for someone to arrive', ca: 'Estirar-te a terra i esperar que arribi algú' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con una obstrucción total, esperar sin actuar es muy peligroso: hay que intentar desobstruirse uno mismo mientras se pueda.', en: 'With total obstruction, waiting without acting is very dangerous: you should try to clear it yourself while you still can.', ca: 'Amb una obstrucció total, esperar sense actuar és molt perillós: cal intentar desobstruir-se un mateix mentre es pugui.' },
      },
      {
        texto: { es: 'Beber agua para intentar que el bocado baje', en: 'Drink water to try to wash the food down', ca: 'Beure aigua per intentar que la mossegada baixi' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Con la vía aérea bloqueada, beber agua no ayuda a que baje el objeto y puede empeorar la obstrucción.', en: 'With the airway blocked, drinking water doesn\'t help move the object down and can worsen the obstruction.', ca: 'Amb la via aèria bloquejada, beure aigua no ajuda que baixi l\'objecte i pot empitjorar l\'obstrucció.' },
      },
    ],
  },
  {
    id: 'golpe-ojo-pelota',
    situacion: {
      es: 'Jugando al fútbol, un balonazo te da de lleno en el ojo. Te duele mucho y ves un poco borroso.',
      en: 'Playing football, a ball hits you square in the eye. It hurts a lot and your vision is a bit blurry.',
      ca: 'Jugant a futbol, una pilotada et dona de ple a l\'ull. Et fa molt mal i hi veus una mica borrós.',
    },
    opciones: [
      {
        texto: { es: 'Aplicar frío alrededor del ojo, sin presionar, y acudir a que lo revisen', en: 'Apply cold around the eye, without pressing, and get it checked', ca: 'Aplicar fred al voltant de l\'ull, sense pressionar, i anar perquè el revisin' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El frío suave alrededor (nunca sobre el propio ojo) reduce la inflamación, y un golpe fuerte en el ojo siempre debe revisarlo un especialista.', en: 'Gentle cold around the area (never on the eye itself) reduces swelling, and a hard blow to the eye should always be checked by a specialist.', ca: 'El fred suau al voltant (mai sobre el propi ull) redueix la inflamació, i un cop fort a l\'ull sempre l\'ha de revisar un especialista.' },
      },
      {
        texto: { es: 'Presionar el ojo con la mano para calmar el dolor', en: 'Press on the eye with your hand to ease the pain', ca: 'Prémer l\'ull amb la mà per calmar el dolor' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Presionar un ojo golpeado puede agravar una lesión interna: nunca se presiona directamente sobre el globo ocular.', en: 'Pressing on an injured eye can worsen an internal injury: never press directly on the eyeball.', ca: 'Prémer un ull colpejat pot agreujar una lesió interna: mai es pressiona directament sobre el globus ocular.' },
      },
      {
        texto: { es: 'Lavarte el ojo con agua abundante', en: 'Rinse your eye with plenty of water', ca: 'Rentar-te l\'ull amb aigua abundant' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Lavar con agua es lo indicado ante un químico en el ojo, pero no ante un golpe: aquí lo que hace falta es frío suave y valoración médica.', en: 'Rinsing with water is right for a chemical in the eye, but not for a blow: what\'s needed here is gentle cold and medical assessment.', ca: 'Rentar amb aigua és el que toca davant un químic a l\'ull, però no davant un cop: aquí el que cal és fred suau i valoració mèdica.' },
      },
    ],
  },
  {
    id: 'anafilaxia-segunda-dosis',
    situacion: {
      es: 'Alguien con anafilaxia ya recibió una dosis de su autoinyector de adrenalina hace 10 minutos, pero sigue con dificultad para respirar.',
      en: 'Someone with anaphylaxis already received a dose from their adrenaline auto-injector 10 minutes ago, but is still struggling to breathe.',
      ca: 'Algú amb anafilaxi ja ha rebut una dosi del seu autoinjector d\'adrenalina fa 10 minuts, però segueix amb dificultat per respirar.',
    },
    opciones: [
      {
        texto: { es: 'Ponerle una segunda dosis si la tiene disponible, y seguir esperando al 112', en: 'Give a second dose if available, and keep waiting for emergency services', ca: 'Posar-li una segona dosi si en té disponible, i seguir esperant el 112' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Si no mejora entre 5 y 15 minutos, se puede repetir la dosis de adrenalina si hay una disponible, sin dejar de esperar a emergencias.', en: 'If there\'s no improvement within 5 to 15 minutes, the adrenaline dose can be repeated if one is available, while still waiting for emergency services.', ca: 'Si no millora entre 5 i 15 minuts, es pot repetir la dosi d\'adrenalina si n\'hi ha una disponible, sense deixar d\'esperar emergències.' },
      },
      {
        texto: { es: 'Pensar que una dosis siempre es suficiente y no hacer nada más', en: 'Assume one dose is always enough and do nothing else', ca: 'Pensar que una dosi sempre n\'hi ha prou i no fer res més' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'A veces hace falta una segunda dosis si los síntomas no mejoran: no actuar puede dejar a la persona sin el tratamiento que necesita.', en: 'Sometimes a second dose is needed if symptoms don\'t improve: not acting can leave the person without the treatment they need.', ca: 'De vegades cal una segona dosi si els símptomes no milloren: no actuar pot deixar la persona sense el tractament que necessita.' },
      },
      {
        texto: { es: 'Cancelar el aviso al 112 porque ya se ha puesto el autoinyector', en: 'Cancel the call to emergency services since the auto-injector was already used', ca: 'Cancel·lar l\'avís al 112 perquè ja s\'ha posat l\'autoinjector' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Siempre hay que ir a urgencias tras usar el autoinyector, aunque mejore: puede haber una segunda reacción horas después.', en: 'You should always go to the ER after using the auto-injector, even if things improve: a second reaction can happen hours later.', ca: 'Sempre cal anar a urgències després de fer servir l\'autoinjector, encara que millori: pot haver-hi una segona reacció hores després.' },
      },
    ],
  },
  {
    id: 'alergia-leve',
    ambiguo: true,
    situacion: {
      es: 'Después de comer algo nuevo, te salen unas ronchas rojas que pican en el brazo, pero respiras con normalidad y no te hincha la cara.',
      en: 'After eating something new, you get some itchy red hives on your arm, but you\'re breathing normally and your face isn\'t swelling.',
      ca: 'Després de menjar alguna cosa nova, et surten unes rovellons vermells que piquen al braç, però respires amb normalitat i no se t\'infla la cara.',
    },
    opciones: [
      {
        texto: { es: 'Observarte, tomar un antihistamínico si lo tienes y vigilar si aparecen más síntomas', en: 'Watch yourself, take an antihistamine if you have one, and monitor for more symptoms', ca: 'Observar-te, prendre un antihistamínic si en tens i vigilar si apareixen més símptomes' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Ronchas leves sin dificultad para respirar ni hinchazón en la cara no son anafilaxia: se puede tratar con antihistamínico y vigilar la evolución.', en: 'Mild hives without breathing trouble or facial swelling aren\'t anaphylaxis: it can be treated with an antihistamine while watching how it develops.', ca: 'Rovellons lleus sense dificultat per respirar ni inflor a la cara no són anafilaxi: es pot tractar amb antihistamínic i vigilar l\'evolució.' },
      },
      {
        texto: { es: 'Llamar al 112 de inmediato como si fuera una anafilaxia', en: 'Call emergency services immediately as if it were anaphylaxis', ca: 'Trucar al 112 de seguida com si fos una anafilaxi' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Sin dificultad para respirar ni hinchazón facial, no hace falta tratarlo como una emergencia; sí hay que vigilar por si los síntomas evolucionan.', en: 'Without breathing trouble or facial swelling, it doesn\'t need to be treated as an emergency; you should still watch in case symptoms progress.', ca: 'Sense dificultat per respirar ni inflor facial, no cal tractar-ho com una emergència; sí que cal vigilar per si els símptomes evolucionen.' },
      },
      {
        texto: { es: 'No hacer nada, seguro que se pasa solo sin más', en: 'Do nothing, it\'ll surely pass on its own', ca: 'No fer res, segur que es passa sol sense més' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Aunque sea leve, conviene vigilar por si la reacción avanza hacia dificultad para respirar o hinchazón, señales de que sí sería una emergencia.', en: 'Even if mild, you should watch in case the reaction progresses to breathing trouble or swelling, signs that it would become an emergency.', ca: 'Encara que sigui lleu, convé vigilar per si la reacció avança cap a dificultat per respirar o inflor, senyals que sí que seria una emergència.' },
      },
    ],
  },
  {
    id: 'inconsciente-vomita',
    situacion: {
      es: 'Una persona inconsciente que respira empieza a vomitar mientras está tumbada boca arriba.',
      en: 'An unconscious person who is breathing starts vomiting while lying on their back.',
      ca: 'Una persona inconscient que respira comença a vomitar mentre està estirada boca amunt.',
    },
    opciones: [
      {
        texto: { es: 'Girarla rápido de lado, hacia ti, para que el vómito salga por la boca', en: 'Quickly roll her onto her side, toward you, so the vomit comes out through her mouth', ca: 'Girar-la ràpid de costat, cap a tu, perquè el vòmit surti per la boca' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Girarla de lado impide que el vómito bloquee la vía aérea o pase a los pulmones: es la base de la posición lateral de seguridad.', en: 'Rolling her onto her side prevents the vomit from blocking the airway or entering the lungs: this is the basis of the recovery position.', ca: 'Girar-la de costat impedeix que el vòmit bloquegi la via aèria o passi als pulmons: és la base de la posició lateral de seguretat.' },
      },
      {
        texto: { es: 'Dejarla boca arriba y limpiarle la boca con los dedos', en: 'Leave her on her back and clean her mouth out with your fingers', ca: 'Deixar-la boca amunt i netejar-li la boca amb els dits' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Boca arriba, el vómito puede bajar directamente hacia los pulmones antes de que te dé tiempo a limpiar nada: lo urgente es girarla.', en: 'On her back, vomit can go straight down toward the lungs before you have time to clean anything: the urgent thing is to roll her over.', ca: 'Boca amunt, el vòmit pot baixar directament cap als pulmons abans que tinguis temps de netejar res: l\'urgent és girar-la.' },
      },
      {
        texto: { es: 'Incorporarla y sentarla para que no se atragante', en: 'Sit her up so she doesn\'t choke', ca: 'Incorporar-la i asseure-la perquè no s\'ennuegui' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Sentar a alguien inconsciente no protege la vía aérea igual que ponerla de lado, y sin fuerza para sostenerse puede volver a caer.', en: 'Sitting an unconscious person up doesn\'t protect the airway the way putting her on her side does, and without the strength to hold herself up she could fall again.', ca: 'Asseure algú inconscient no protegeix la via aèria igual que posar-la de costat, i sense força per sostenir-se es pot tornar a caure.' },
      },
    ],
  },
  {
    id: 'reaccion-medicamento',
    situacion: {
      es: 'Tras tomar un medicamento nuevo, te salen ronchas por todo el cuerpo y notas la garganta un poco rara, aunque respiras bien.',
      en: 'After taking a new medication, hives break out all over your body and your throat feels a bit odd, though you\'re breathing fine.',
      ca: 'Després de prendre un medicament nou, et surten rovellons per tot el cos i notes la gola una mica estranya, encara que respires bé.',
    },
    opciones: [
      {
        texto: { es: 'Dejar de tomar el medicamento y contactar con un médico o farmacéutico para que valore la reacción', en: 'Stop taking the medication and contact a doctor or pharmacist to assess the reaction', ca: 'Deixar de prendre el medicament i contactar amb un metge o farmacèutic perquè valori la reacció' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Ronchas generalizadas y una sensación rara en la garganta pueden ser el inicio de una reacción alérgica: hay que dejar el medicamento y buscar valoración cuanto antes.', en: 'Widespread hives and an odd feeling in the throat can be the start of an allergic reaction: stop the medication and seek assessment as soon as possible.', ca: 'Rovellons generalitzats i una sensació estranya a la gola poden ser l\'inici d\'una reacció al·lèrgica: cal deixar el medicament i buscar valoració com abans millor.' },
      },
      {
        texto: { es: 'Tomar otra dosis por si el cuerpo se acostumbra', en: 'Take another dose in case the body gets used to it', ca: 'Prendre una altra dosi per si el cos s\'hi acostuma' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Repetir la dosis de algo a lo que ya estás reaccionando puede empeorar mucho la reacción alérgica.', en: 'Repeating a dose of something you\'re already reacting to can make the allergic reaction much worse.', ca: 'Repetir la dosi d\'una cosa a la qual ja estàs reaccionant pot empitjorar molt la reacció al·lèrgica.' },
      },
      {
        texto: { es: 'No darle importancia a la sensación en la garganta y seguir con tu día', en: 'Ignore the feeling in your throat and carry on with your day', ca: 'No donar importància a la sensació a la gola i seguir amb el teu dia' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Una sensación rara en la garganta puede ser el primer aviso de que la vía aérea se está afectando: no se ignora.', en: 'An odd feeling in the throat can be the first warning that the airway is being affected: it shouldn\'t be ignored.', ca: 'Una sensació estranya a la gola pot ser el primer avís que la via aèria s\'està afectant: no s\'ignora.' },
      },
    ],
  },
  {
    id: 'esguince-tobillo',
    ambiguo: true,
    situacion: {
      es: 'Jugando al fútbol, te tuerces el tobillo. Duele e hincha un poco, pero puedes apoyar el pie con cuidado.',
      en: 'Playing football, you twist your ankle. It hurts and swells a bit, but you can put weight on it carefully.',
      ca: 'Jugant a futbol, et gires el turmell. Fa mal i s\'infla una mica, però pots recolzar el peu amb compte.',
    },
    opciones: [
      {
        texto: { es: 'Reposo, hielo envuelto en un paño, compresión suave y elevar el pie', en: 'Rest, ice wrapped in a cloth, gentle compression and elevate the foot', ca: 'Repòs, gel embolicat en un drap, compressió suau i elevar el peu' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El protocolo básico para un esguince leve es reposo, hielo, compresión y elevación: reduce la hinchazón y el dolor.', en: 'The basic protocol for a mild sprain is rest, ice, compression and elevation: it reduces swelling and pain.', ca: 'El protocol bàsic per a un esquinç lleu és repòs, gel, compressió i elevació: redueix la inflor i el dolor.' },
      },
      {
        texto: { es: 'Seguir jugando, el calentamiento hará que se pase', en: 'Keep playing, staying warmed up will make it go away', ca: 'Seguir jugant, l\'escalfament farà que se li passi' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Seguir forzando un tobillo torcido puede empeorar la lesión de los ligamentos.', en: 'Continuing to push a twisted ankle can worsen the ligament injury.', ca: 'Seguir forçant un turmell girat pot empitjorar la lesió dels lligaments.' },
      },
      {
        texto: { es: 'Ir a urgencias en ambulancia de inmediato', en: 'Go to the ER by ambulance immediately', ca: 'Anar a urgències en ambulància de seguida' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Si puedes apoyar el pie y no hay deformidad, no hace falta ambulancia: con reposo, hielo, compresión y elevación suele bastar, y si no mejora se puede acudir por tu cuenta.', en: 'If you can bear weight and there\'s no deformity, an ambulance isn\'t needed: rest, ice, compression and elevation are usually enough, and you can go in yourself if it doesn\'t improve.', ca: 'Si pots recolzar el peu i no hi ha deformitat, no cal ambulància: amb repòs, gel, compressió i elevació sol bastar, i si no millora es pot anar pel teu compte.' },
      },
    ],
  },
  {
    id: 'objeto-punzante-tragado',
    situacion: {
      es: 'Un niño se ha tragado un palillo de dientes mientras jugaba con él en la boca.',
      en: 'A child has swallowed a toothpick while playing with it in his mouth.',
      ca: 'Un nen s\'ha empassat un escuradents mentre hi jugava a la boca.',
    },
    opciones: [
      {
        texto: { es: 'Llevarlo a urgencias, aunque respire y hable con normalidad', en: 'Take him to the ER, even though he\'s breathing and talking normally', ca: 'Portar-lo a urgències, encara que respiri i parli amb normalitat' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'A diferencia de un objeto pequeño y romo, uno puntiagudo como un palillo sí necesita valoración en urgencias, porque puede perforar el tubo digestivo por dentro.', en: 'Unlike a small, blunt object, a sharp one like a toothpick does need ER evaluation, because it can perforate the digestive tract from the inside.', ca: 'A diferència d\'un objecte petit i rom, un de punxegut com un escuradents sí que necessita valoració a urgències, perquè pot perforar el tub digestiu per dins.' },
      },
      {
        texto: { es: 'No preocuparte, seguro que pasa solo como cualquier otro objeto pequeño', en: 'Don\'t worry, it\'ll surely pass just like any other small object', ca: 'No preocupar-te, segur que passa sol com qualsevol altre objecte petit' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'Los objetos puntiagudos son distintos de los romos: tienen riesgo real de perforar el intestino y no se tratan igual que una canica.', en: 'Sharp objects are different from blunt ones: they have a real risk of perforating the intestine and aren\'t treated the same as a marble.', ca: 'Els objectes punxeguts són diferents dels roms: tenen risc real de perforar l\'intestí i no es tracten igual que una bala de vidre.' },
      },
      {
        texto: { es: 'Darle mucho pan para que arrastre el palillo hacia abajo', en: 'Give him lots of bread to help push the toothpick down', ca: 'Donar-li molt pa perquè arrossegui l\'escuradents cap avall' },
        esCorrecta: false, esPeligrosa: true,
        explicacion: { es: 'No hay evidencia de que comer pan ayude con un objeto punzante tragado, y puede retrasar la atención médica que sí hace falta.', en: 'There\'s no evidence that eating bread helps with a swallowed sharp object, and it can delay the medical attention that\'s actually needed.', ca: 'No hi ha evidència que menjar pa ajudi amb un objecte punxegut empassat, i pot retardar l\'atenció mèdica que sí que cal.' },
      },
    ],
  },
  {
    id: 'ampolla-rozadura',
    ambiguo: true,
    situacion: {
      es: 'Con zapatos nuevos, te sale una ampolla grande en el talón que aún no se ha roto.',
      en: 'With new shoes, you get a large blister on your heel that hasn\'t broken yet.',
      ca: 'Amb sabates noves, et surt una butllofa grossa al taló que encara no s\'ha trencat.',
    },
    opciones: [
      {
        texto: { es: 'Dejarla intacta, cubrirla con un apósito y evitar que siga rozando', en: 'Leave it intact, cover it with a dressing and stop it rubbing further', ca: 'Deixar-la intacta, cobrir-la amb un apòsit i evitar que segueixi fregant' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'Una ampolla intacta protege la piel nueva de debajo de infecciones: lo mejor es dejarla cerrada y protegerla del roce.', en: 'An intact blister protects the new skin underneath from infection: it\'s best to leave it closed and shield it from friction.', ca: 'Una butllofa intacta protegeix la pell nova de sota d\'infeccions: el millor és deixar-la tancada i protegir-la del fregament.' },
      },
      {
        texto: { es: 'Reventarla con una aguja para aliviar la presión', en: 'Pop it with a needle to relieve the pressure', ca: 'Rebentar-la amb una agulla per alleujar la pressió' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Reventarla no es necesario y aumenta el riesgo de infección: es mejor dejarla intacta salvo que moleste mucho al caminar.', en: 'Popping it isn\'t necessary and increases infection risk: it\'s better to leave it intact unless it really hinders walking.', ca: 'Rebentar-la no és necessari i augmenta el risc d\'infecció: és millor deixar-la intacta tret que molesti molt en caminar.' },
      },
      {
        texto: { es: 'Ir a urgencias por una simple ampolla', en: 'Go to the ER for a simple blister', ca: 'Anar a urgències per una simple butllofa' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Una ampolla normal por roce no necesita urgencias: solo si aparecen signos de infección (pus, mucho enrojecimiento, fiebre) haría falta consultar.', en: 'A normal friction blister doesn\'t need the ER: only if signs of infection appear (pus, a lot of redness, fever) would a doctor be needed.', ca: 'Una butllofa normal per fregament no necessita urgències: només si apareixen signes d\'infecció (pus, molt vermellor, febre) caldria consultar.' },
      },
    ],
  },
  {
    id: 'reaccion-planta',
    ambiguo: true,
    situacion: {
      es: 'De excursión, rozas sin querer una ortiga y te queda la piel roja, con picor y pequeñas ronchas en el brazo.',
      en: 'On a hike, you accidentally brush against a nettle and your skin turns red, itchy, with small welts on your arm.',
      ca: 'D\'excursió, freges sense voler una ortiga i et queda la pell vermella, amb picor i petits rovellons al braç.',
    },
    opciones: [
      {
        texto: { es: 'Lavar la zona con agua fría y evitar rascarte', en: 'Wash the area with cold water and avoid scratching', ca: 'Rentar la zona amb aigua freda i evitar gratar-te' },
        esCorrecta: true, esPeligrosa: false,
        explicacion: { es: 'El agua fría calma el picor de una reacción a una planta urticante, y rascarse solo empeora la irritación.', en: 'Cold water soothes the itching from a stinging-plant reaction, and scratching only makes the irritation worse.', ca: 'L\'aigua freda calma la picor d\'una reacció a una planta urticant, i gratar-se només empitjora la irritació.' },
      },
      {
        texto: { es: 'Rascarte bien fuerte para calmar el picor', en: 'Scratch hard to relieve the itching', ca: 'Gratar-te ben fort per calmar la picor' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Rascarse con fuerza irrita más la piel y puede hacer que el picor dure más.', en: 'Scratching hard irritates the skin further and can make the itching last longer.', ca: 'Gratar-se amb força irrita més la pell i pot fer que la picor duri més.' },
      },
      {
        texto: { es: 'Ir a urgencias por una simple rozadura con una planta', en: 'Go to the ER for a simple brush against a plant', ca: 'Anar a urgències per un simple frec amb una planta' },
        esCorrecta: false, esPeligrosa: false,
        explicacion: { es: 'Una reacción leve a una planta como la ortiga se cuida en casa; solo haría falta consultar si aparece hinchazón importante o dificultad para respirar.', en: 'A mild reaction to a plant like a nettle is looked after at home; a doctor would only be needed if significant swelling or breathing trouble appears.', ca: 'Una reacció lleu a una planta com l\'ortiga es cuida a casa; només caldria consultar si apareix inflor important o dificultat per respirar.' },
      },
    ],
  },
]
