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
]
