// Seguridad Vial — peatón, bici y patinete
//
// Segundo bloque de vida práctica, junto a primeros auxilios. Material
// educativo contrastado con la normativa de la DGT vigente; donde una norma
// depende de la ordenanza de cada municipio (el casco en patinete, por
// ejemplo), la pregunta lo dice en vez de dar una regla única.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── COMO PEATÓN ─────────────────────────────────────────────────────────
  q('sv-01', 'primaria',
    { es: '¿Por dónde hay que cruzar la calle siempre que se pueda?', en: 'Where should you always cross the road if possible?', ca: 'Per on cal creuar el carrer sempre que es pugui?' },
    { es: ['Por el paso de peatones', 'Por donde esté más cerca', 'Entre los coches aparcados', 'Corriendo por cualquier sitio'], en: ['At the pedestrian crossing', 'Wherever is nearest', 'Between parked cars', 'Running anywhere'], ca: ['Pel pas de vianants', 'Per on sigui més a prop', 'Entre els cotxes aparcats', 'Corrent per qualsevol lloc'] },
    { es: 'Por el paso de peatones', en: 'At the pedestrian crossing', ca: 'Pel pas de vianants' },
    '🚸',
    { es: 'Ahí es donde el conductor espera encontrarte y donde tiene obligación de cederte el paso. Cruzar entre coches aparcados es especialmente peligroso porque apareces de golpe donde nadie te está buscando.', en: 'That is where a driver expects you and where they must give way. Crossing between parked cars is especially dangerous because you appear suddenly where nobody is looking for you.', ca: 'És on el conductor espera trobar-te i on té obligació de cedir-te el pas.' }),

  q('sv-02', 'primaria',
    { es: 'Antes de cruzar, aunque el semáforo esté en verde, ¿qué hay que hacer?', en: 'Before crossing, even on a green light, what should you do?', ca: 'Abans de creuar, encara que el semàfor estigui en verd, què cal fer?' },
    { es: ['Mirar a ambos lados y asegurarse de que los coches se han parado', 'Cruzar directamente sin mirar', 'Correr para ir más rápido', 'Esperar a que cruce otra persona'], en: ['Look both ways and check the cars have stopped', 'Cross straight away without looking', 'Run to be quicker', 'Wait for someone else to cross'], ca: ['Mirar a banda i banda i assegurar-se que els cotxes s\'han aturat', 'Creuar directament sense mirar', 'Córrer per anar més ràpid', 'Esperar que creui una altra persona'] },
    { es: 'Mirar a ambos lados y asegurarse de que los coches se han parado', en: 'Look both ways and check the cars have stopped', ca: 'Mirar a banda i banda i assegurar-se que els cotxes s\'han aturat' },
    '👀',
    { es: 'El verde te da el derecho, no la garantía: un conductor puede no verte o no llegar a frenar. Mirar cuesta un segundo y es lo único que no depende de que los demás hagan las cosas bien.', en: 'Green gives you the right of way, not a guarantee: a driver may not see you or may not stop in time. Looking takes a second and is the only thing that does not depend on others doing it right.', ca: 'El verd et dona el dret, no la garantia: un conductor pot no veure\'t o no arribar a frenar.' }),

  q('sv-03', 'primaria',
    { es: '¿Por qué parte de la acera conviene caminar?', en: 'Which part of the pavement should you walk on?', ca: 'Per quina part de la vorera convé caminar?' },
    { es: ['Por la parte de dentro, lo más lejos posible de la calzada', 'Por el borde, junto a los coches', 'Por el medio de la calzada', 'Da igual'], en: ['On the inside, as far from the road as possible', 'On the edge, next to the cars', 'Down the middle of the road', 'It makes no difference'], ca: ['Per la part de dins, com més lluny millor de la calçada', 'Per la vora, al costat dels cotxes', 'Pel mig de la calçada', 'Tant és'] },
    { es: 'Por la parte de dentro, lo más lejos posible de la calzada', en: 'On the inside, as far from the road as possible', ca: 'Per la part de dins, com més lluny millor de la calçada' },
    '🚶',
    { es: 'Unos pocos pasos de separación son suficientes para que un coche que se sube al bordillo o un retrovisor no te alcancen. Es una costumbre que no cuesta nada y evita el tipo de accidente más tonto.', en: 'A few steps of separation are enough to keep a car mounting the kerb or a wing mirror from reaching you. It is a free habit that avoids the silliest kind of accident.', ca: 'Uns pocs passos de separació són suficients perquè un cotxe que puja a la vorera no t\'abasti.' }),

  q('sv-04', 'primaria',
    { es: 'Si no hay acera en una carretera, ¿por dónde debe andar un peatón?', en: 'With no pavement on a road, where should a pedestrian walk?', ca: 'Si no hi ha vorera en una carretera, per on ha de caminar un vianant?' },
    { es: ['Por la izquierda, de frente a los coches que vienen', 'Por la derecha, de espaldas al tráfico', 'Por el centro', 'Por donde sea, con cuidado'], en: ['On the left, facing oncoming cars', 'On the right, with your back to traffic', 'In the centre', 'Anywhere, carefully'], ca: ['Per l\'esquerra, de cara als cotxes que vénen', 'Per la dreta, d\'esquena al trànsit', 'Pel centre', 'Per on sigui, amb compte'] },
    { es: 'Por la izquierda, de frente a los coches que vienen', en: 'On the left, facing oncoming cars', ca: 'Per l\'esquerra, de cara als cotxes que vénen' },
    '🛣️',
    { es: 'Así ves llegar los coches y puedes apartarte a tiempo. Es justo al revés que en bici, que va por la derecha: el peatón mira de frente y el ciclista circula con el tráfico.', en: 'That way you see cars coming and can step aside in time. It is the opposite of cycling, which keeps right: the pedestrian faces the traffic, the cyclist moves with it.', ca: 'Així veus arribar els cotxes i pots apartar-te a temps. És just al revés que en bici.' }),

  q('sv-05', 'primaria',
    { es: '¿Por qué es peligroso cruzar mirando el móvil o con auriculares?', en: 'Why is it dangerous to cross while looking at your phone or wearing earphones?', ca: 'Per què és perillós creuar mirant el mòbil o amb auriculars?' },
    { es: ['Porque pierdes la vista y el oído, que son los dos sentidos que te avisan', 'Porque está prohibido llevar móvil', 'Porque se te puede caer', 'Porque molesta a los conductores'], en: ['Because you lose sight and hearing, the two senses that warn you', 'Because carrying a phone is banned', 'Because you might drop it', 'Because it annoys drivers'], ca: ['Perquè perds la vista i l\'oïda, que són els dos sentits que t\'avisen', 'Perquè està prohibit portar mòbil', 'Perquè se\'t pot caure', 'Perquè molesta els conductors'] },
    { es: 'Porque pierdes la vista y el oído, que son los dos sentidos que te avisan', en: 'Because you lose sight and hearing, the two senses that warn you', ca: 'Perquè perds la vista i l\'oïda, que són els dos sentits que t\'avisen' },
    '📵',
    { es: 'Un coche eléctrico o una bici no hacen casi ruido, así que el oído importa más de lo que parece. Lo razonable es apartar el móvil y bajarse un auricular en los pocos segundos que dura cruzar.', en: 'An electric car or a bike make almost no noise, so hearing matters more than you would think. The sensible thing is to put the phone away and pull out an earphone for the few seconds crossing takes.', ca: 'Un cotxe elèctric o una bici no fan gairebé soroll, així que l\'oïda importa més del que sembla.' }),

  q('sv-06', 'primaria',
    { es: 'Acabas de bajar del autobús y quieres cruzar. ¿Qué haces?', en: 'You have just got off the bus and want to cross. What do you do?', ca: 'Acabes de baixar de l\'autobús i vols creuar. Què fas?' },
    { es: ['Esperar a que el autobús se vaya y cruzar por un paso de peatones', 'Cruzar por delante del autobús', 'Cruzar por detrás corriendo', 'Cruzar entre el autobús y la acera'], en: ['Wait for the bus to leave and cross at a crossing', 'Cross in front of the bus', 'Run across behind it', 'Cross between the bus and the pavement'], ca: ['Esperar que l\'autobús marxi i creuar per un pas de vianants', 'Creuar per davant de l\'autobús', 'Creuar per darrere corrent', 'Creuar entre l\'autobús i la vorera'] },
    { es: 'Esperar a que el autobús se vaya y cruzar por un paso de peatones', en: 'Wait for the bus to leave and cross at a crossing', ca: 'Esperar que l\'autobús marxi i creuar per un pas de vianants' },
    '🚌',
    { es: 'El autobús es una pared que tapa: ni tú ves lo que viene ni los conductores te ven a ti. Esperar veinte segundos a que arranque es lo que convierte una situación ciega en una normal.', en: 'The bus is a wall: you cannot see what is coming and drivers cannot see you. Waiting twenty seconds for it to pull away turns a blind situation into an ordinary one.', ca: 'L\'autobús és una paret que tapa: ni tu veus el que ve ni els conductors et veuen a tu.' }),

  q('sv-07', 'primaria',
    { es: '¿Qué significa un semáforo peatonal en verde intermitente?', en: 'What does a flashing green pedestrian light mean?', ca: 'Què significa un semàfor de vianants en verd intermitent?' },
    { es: ['Que está a punto de ponerse rojo: si no has empezado, no cruces', 'Que puedes cruzar tranquilamente', 'Que el semáforo está averiado', 'Que solo pueden cruzar los adultos'], en: ['It is about to turn red: if you have not started, do not cross', 'You can cross calmly', 'The light is broken', 'Only adults may cross'], ca: ['Que està a punt de posar-se vermell: si no has començat, no creuis', 'Que pots creuar tranquil·lament', 'Que el semàfor està avariat', 'Que només poden creuar els adults'] },
    { es: 'Que está a punto de ponerse rojo: si no has empezado, no cruces', en: 'It is about to turn red: if you have not started, do not cross', ca: 'Que està a punt de posar-se vermell: si no has començat, no creuis' },
    '🚦',
    { es: 'Es un aviso, no una invitación a correr. Si ya estás cruzando, termina sin acelerar; si estás en la acera, espera al siguiente verde, que llega en menos de un minuto.', en: 'It is a warning, not an invitation to run. If you are already crossing, finish without rushing; if you are on the pavement, wait for the next green, less than a minute away.', ca: 'És un avís, no una invitació a córrer. Si ja estàs creuant, acaba sense accelerar.' }),

  q('sv-08', 'primaria',
    { es: '¿Por qué hay que llevar ropa clara o reflectantes de noche?', en: 'Why wear light clothing or reflectors at night?', ca: 'Per què cal portar roba clara o reflectants de nit?' },
    { es: ['Porque de noche un conductor puede no verte hasta estar muy cerca', 'Porque es más bonito', 'Porque lo dice la moda', 'Porque abriga más'], en: ['Because at night a driver may not see you until very close', 'Because it looks nicer', 'Because fashion says so', 'Because it is warmer'], ca: ['Perquè de nit un conductor pot no veure\'t fins que és molt a prop', 'Perquè és més bonic', 'Perquè ho diu la moda', 'Perquè abriga més'] },
    { es: 'Porque de noche un conductor puede no verte hasta estar muy cerca', en: 'Because at night a driver may not see you until very close', ca: 'Perquè de nit un conductor pot no veure\'t fins que és molt a prop' },
    '🦺',
    { es: 'Vestido de oscuro, un peatón se distingue a unos 25 metros; con reflectantes, a más de 100. A la velocidad de una carretera, esa diferencia son varios segundos, que es justo lo que hace falta para frenar.', en: 'Dressed in dark clothes a pedestrian is visible at about 25 metres; with reflectors, over 100. At road speed that gap is several seconds, exactly what is needed to brake.', ca: 'Vestit de fosc, un vianant es distingeix a uns 25 metres; amb reflectants, a més de 100.' }),

  // ── EN EL COCHE ─────────────────────────────────────────────────────────
  q('sv-09', 'primaria',
    { es: '¿Quién tiene que llevar cinturón de seguridad en un coche?', en: 'Who must wear a seat belt in a car?', ca: 'Qui ha de portar cinturó de seguretat en un cotxe?' },
    { es: ['Todos los ocupantes, delante y detrás', 'Solo el conductor', 'Solo los de delante', 'Solo en carretera, no en ciudad'], en: ['Everyone, front and back', 'Only the driver', 'Only those in front', 'Only on the open road, not in town'], ca: ['Tots els ocupants, davant i darrere', 'Només el conductor', 'Només els del davant', 'Només a carretera, no a ciutat'] },
    { es: 'Todos los ocupantes, delante y detrás', en: 'Everyone, front and back', ca: 'Tots els ocupants, davant i darrere' },
    '🔒',
    { es: 'Es obligatorio en todas las plazas y en cualquier trayecto, por corto que sea. La mayoría de los accidentes ocurren cerca de casa y a poca velocidad, que es justo cuando más gente se lo salta.', en: 'It is compulsory in every seat and on any trip, however short. Most crashes happen close to home and at low speed, which is exactly when people skip it most.', ca: 'És obligatori a totes les places i en qualsevol trajecte, per curt que sigui.' }),

  q('sv-10', 'primaria',
    { es: '¿Hasta qué estatura hay que usar sistema de retención infantil (sillita o elevador) en España?', en: 'Up to what height must a child restraint be used in Spain?', ca: 'Fins a quina estatura cal fer servir sistema de retenció infantil a Espanya?' },
    { es: ['Hasta los 135 cm de altura', 'Hasta los 8 años', 'Hasta los 100 cm', 'No es obligatorio'], en: ['Up to 135 cm tall', 'Up to age 8', 'Up to 100 cm', 'It is not compulsory'], ca: ['Fins als 135 cm d\'alçada', 'Fins als 8 anys', 'Fins als 100 cm', 'No és obligatori'] },
    { es: 'Hasta los 135 cm de altura', en: 'Up to 135 cm tall', ca: 'Fins als 135 cm d\'alçada' },
    '👶',
    { es: 'La norma va por estatura y no por edad, porque lo que importa es dónde cae el cinturón: en alguien bajito pasa por el cuello y por la tripa en vez de por el hombro y la cadera, y en un frenazo eso hace daño en vez de proteger.', en: 'The rule goes by height, not age, because what matters is where the belt sits: on a short person it crosses the neck and belly instead of shoulder and hip, and in a crash that injures instead of protecting.', ca: 'La norma va per estatura i no per edat, perquè el que importa és on cau el cinturó.' }),

  q('sv-11', 'primaria',
    { es: '¿Por qué lado del coche conviene bajarse cuando está aparcado en la calle?', en: 'Which side should you get out of a car parked on the street?', ca: 'Per quin costat del cotxe convé baixar quan està aparcat al carrer?' },
    { es: ['Por el lado de la acera', 'Por el lado de la calzada', 'Por el que quede más cerca', 'Da igual si vas rápido'], en: ['On the pavement side', 'On the road side', 'Whichever is nearest', 'It does not matter if you are quick'], ca: ['Pel costat de la vorera', 'Pel costat de la calçada', 'Pel que quedi més a prop', 'Tant és si vas ràpid'] },
    { es: 'Por el lado de la acera', en: 'On the pavement side', ca: 'Pel costat de la vorera' },
    '🚪',
    { es: 'Abrir la puerta hacia la calzada sin mirar es una de las causas más frecuentes de accidente con ciclistas y motos. Si no queda más remedio, se mira por el retrovisor y por encima del hombro antes de abrir.', en: 'Opening the door onto the road without looking is one of the commonest causes of crashes with cyclists and motorbikes. If there is no choice, check the mirror and over your shoulder first.', ca: 'Obrir la porta cap a la calçada sense mirar és una de les causes més freqüents d\'accident amb ciclistes.' }),

  // ── BICI Y PATINETE ─────────────────────────────────────────────────────
  q('sv-12', 'primaria',
    { es: '¿Por qué parte de la calzada circula una bicicleta?', en: 'Which part of the road does a bicycle ride on?', ca: 'Per quina part de la calçada circula una bicicleta?' },
    { es: ['Por la derecha, en el mismo sentido que los coches', 'Por la izquierda, de frente a los coches', 'Por el centro', 'Por la acera'], en: ['On the right, in the same direction as cars', 'On the left, facing the cars', 'In the centre', 'On the pavement'], ca: ['Per la dreta, en el mateix sentit que els cotxes', 'Per l\'esquerra, de cara als cotxes', 'Pel centre', 'Per la vorera'] },
    { es: 'Por la derecha, en el mismo sentido que los coches', en: 'On the right, in the same direction as cars', ca: 'Per la dreta, en el mateix sentit que els cotxes' },
    '🚲',
    { es: 'La bici es un vehículo y sigue las mismas reglas que los coches. Ir en sentido contrario multiplica la velocidad del choque y es de los errores más peligrosos que se ven en ciudad.', en: 'A bike is a vehicle and follows the same rules as cars. Riding against traffic multiplies the impact speed and is one of the most dangerous errors seen in cities.', ca: 'La bici és un vehicle i segueix les mateixes regles que els cotxes. Anar en sentit contrari és molt perillós.' }),

  q('sv-13', 'primaria',
    { es: '¿Cómo avisa un ciclista de que va a girar?', en: 'How does a cyclist signal a turn?', ca: 'Com avisa un ciclista que girarà?' },
    { es: ['Extendiendo el brazo hacia el lado al que va a girar', 'Tocando el timbre', 'Frenando de golpe', 'No hace falta avisar'], en: ['By extending the arm towards the turn', 'By ringing the bell', 'By braking hard', 'No signal is needed'], ca: ['Estenent el braç cap al costat on girarà', 'Tocant el timbre', 'Frenant de cop', 'No cal avisar'] },
    { es: 'Extendiendo el brazo hacia el lado al que va a girar', en: 'By extending the arm towards the turn', ca: 'Estenent el braç cap al costat on girarà' },
    '👉',
    { es: 'La bici no tiene intermitentes, así que el brazo hace de señal. Hay que sacarlo con antelación y volver a agarrar el manillar antes de girar, no durante.', en: 'A bike has no indicators, so the arm is the signal. Put it out in advance and get back on the handlebars before turning, not during.', ca: 'La bici no té intermitents, així que el braç fa de senyal. Cal treure\'l amb antelació.' }),

  q('sv-14', 'primaria',
    { es: '¿Cuándo es obligatorio el casco en bicicleta en España?', en: 'When is a cycle helmet compulsory in Spain?', ca: 'Quan és obligatori el casc en bicicleta a Espanya?' },
    { es: ['Siempre en carretera, y en ciudad para los menores de 16 años', 'Nunca es obligatorio', 'Solo para adultos', 'Solo de noche'], en: ['Always on the open road, and in town for under-16s', 'Never compulsory', 'Only for adults', 'Only at night'], ca: ['Sempre a carretera, i a ciutat per als menors de 16 anys', 'Mai és obligatori', 'Només per a adults', 'Només de nit'] },
    { es: 'Siempre en carretera, y en ciudad para los menores de 16 años', en: 'Always on the open road, and in town for under-16s', ca: 'Sempre a carretera, i a ciutat per als menors de 16 anys' },
    '⛑️',
    { es: 'Que en ciudad no sea obligatorio para un adulto no significa que no convenga: la mayoría de las lesiones graves en bici son en la cabeza, y a 20 km/h una caída ya basta.', en: 'That it is not compulsory for adults in town does not mean it is not worth it: most serious cycling injuries are head injuries, and a fall at 20 km/h is already enough.', ca: 'Que a ciutat no sigui obligatori per a un adult no vol dir que no convingui.' }),

  q('sv-15', 'primaria',
    { es: '¿Puede un patinete eléctrico circular por la acera?', en: 'Can an electric scooter ride on the pavement?', ca: 'Pot un patinet elèctric circular per la vorera?' },
    { es: ['No: la acera es de los peatones', 'Sí, si va despacio', 'Sí, si toca el timbre', 'Solo por las tardes'], en: ['No: the pavement is for pedestrians', 'Yes, if it goes slowly', 'Yes, if it rings a bell', 'Only in the afternoon'], ca: ['No: la vorera és dels vianants', 'Sí, si va a poc a poc', 'Sí, si toca el timbre', 'Només a les tardes'] },
    { es: 'No: la acera es de los peatones', en: 'No: the pavement is for pedestrians', ca: 'No: la vorera és dels vianants' },
    '🛴',
    { es: 'Está prohibido en toda España, y también circular por vías interurbanas o autopistas. El patinete eléctrico es un vehículo, no un juguete, y por eso tiene sus propias normas y sus propias multas.', en: 'It is banned throughout Spain, as is riding on interurban roads or motorways. An electric scooter is a vehicle, not a toy, and so has its own rules and its own fines.', ca: 'Està prohibit a tot Espanya, i també circular per vies interurbanes o autopistes.' }),

  q('sv-16', 'primaria',
    { es: '¿Pueden ir dos personas en un patinete eléctrico?', en: 'Can two people ride one electric scooter?', ca: 'Poden anar dues persones en un patinet elèctric?' },
    { es: ['No: está diseñado y homologado para una sola persona', 'Sí, si las dos llevan casco', 'Sí, si van despacio', 'Solo si son menores'], en: ['No: it is designed and approved for one person', 'Yes, if both wear helmets', 'Yes, if they go slowly', 'Only if they are minors'], ca: ['No: està dissenyat i homologat per a una sola persona', 'Sí, si totes dues porten casc', 'Sí, si van a poc a poc', 'Només si són menors'] },
    { es: 'No: está diseñado y homologado para una sola persona', en: 'No: it is designed and approved for one person', ca: 'No: està dissenyat i homologat per a una sola persona' },
    '🛴',
    { es: 'Con dos personas el patinete pesa mucho más, frena peor y se desestabiliza en cualquier bache. Además es una infracción sancionable, igual que llevar auriculares o usar el móvil montado.', en: 'With two people the scooter is far heavier, brakes worse and destabilises at any bump. It is also a punishable offence, like wearing earphones or using a phone while riding.', ca: 'Amb dues persones el patinet pesa molt més, frena pitjor i es desestabilitza a qualsevol sotrac.' }),

  q('sv-17', 'primaria',
    { es: '¿Qué luces debe llevar una bici de noche?', en: 'What lights must a bike have at night?', ca: 'Quins llums ha de portar una bici de nit?' },
    { es: ['Luz blanca delante, roja detrás y elementos reflectantes', 'Solo una luz delante', 'Ninguna, basta con las farolas', 'Solo reflectantes'], en: ['A white light in front, red behind and reflectors', 'Just one light in front', 'None, streetlights are enough', 'Only reflectors'], ca: ['Llum blanc davant, vermell darrere i elements reflectants', 'Només un llum davant', 'Cap, n\'hi ha prou amb els fanals', 'Només reflectants'] },
    { es: 'Luz blanca delante, roja detrás y elementos reflectantes', en: 'A white light in front, red behind and reflectors', ca: 'Llum blanc davant, vermell darrere i elements reflectants' },
    '💡',
    { es: 'Los colores no son decorativos: al ver una luz blanca sabes que ese vehículo viene de frente, y con la roja, que se aleja. Es el mismo código que usan coches, motos y barcos.', en: 'The colours are not decoration: a white light tells you the vehicle is coming towards you, a red one that it is going away. It is the same code used by cars, motorbikes and boats.', ca: 'Els colors no són decoratius: el blanc indica que ve de front i el vermell que s\'allunya.' }),

  q('sv-18', 'primaria',
    { es: '¿Qué es el punto ciego de un camión?', en: 'What is a lorry\'s blind spot?', ca: 'Què és l\'angle mort d\'un camió?' },
    { es: ['La zona alrededor del camión que el conductor no ve ni por los retrovisores', 'La parte trasera de la carga', 'El faro que no funciona', 'La cabina sin ventanas'], en: ['The area around the lorry the driver cannot see, even in the mirrors', 'The rear of the load', 'The headlight that does not work', 'The windowless cab'], ca: ['La zona al voltant del camió que el conductor no veu ni pels retrovisors', 'La part del darrere de la càrrega', 'El far que no funciona', 'La cabina sense finestres'] },
    { es: 'La zona alrededor del camión que el conductor no ve ni por los retrovisores', en: 'The area around the lorry the driver cannot see, even in the mirrors', ca: 'La zona al voltant del camió que el conductor no veu ni pels retrovisors' },
    '🚚',
    { es: 'En un camión grande esa zona puede tragarse a varias personas, sobre todo por delante y por el lado derecho. La regla práctica: si tú no ves la cara del conductor, él no te ve a ti.', en: 'On a large lorry that area can swallow several people, especially in front and on the right. The practical rule: if you cannot see the driver\'s face, they cannot see you.', ca: 'La regla pràctica: si tu no veus la cara del conductor, ell no et veu a tu.' }),

  q('sv-19', 'primaria',
    { es: '¿Qué significa la señal octogonal roja con la palabra STOP?', en: 'What does the red octagonal STOP sign mean?', ca: 'Què significa el senyal octogonal vermell amb la paraula STOP?' },
    { es: ['Detención obligatoria: hay que parar del todo antes de seguir', 'Reducir la velocidad', 'Prohibido el paso siempre', 'Prioridad de paso'], en: ['Compulsory stop: you must come to a complete halt', 'Slow down', 'No entry at any time', 'You have priority'], ca: ['Detenció obligatòria: cal aturar-se del tot abans de continuar', 'Reduir la velocitat', 'Prohibit el pas sempre', 'Prioritat de pas'] },
    { es: 'Detención obligatoria: hay que parar del todo antes de seguir', en: 'Compulsory stop: you must come to a complete halt', ca: 'Detenció obligatòria: cal aturar-se del tot abans de continuar' },
    '🛑',
    { es: 'Es la única señal con forma de octógono, y no por casualidad: se reconoce incluso de espaldas o con nieve encima, cuando no se lee la palabra. Ceder el paso es un triángulo invertido y no obliga a parar si está libre.', en: 'It is the only octagonal sign, and not by chance: it is recognisable even from behind or under snow, when the word cannot be read. Give way is an inverted triangle and does not require stopping if the road is clear.', ca: 'És l\'únic senyal amb forma d\'octàgon, i no per casualitat: es reconeix fins i tot d\'esquena.' }),

  q('sv-20', 'primaria',
    { es: '¿Qué forma tienen las señales de prohibición?', en: 'What shape are prohibition signs?', ca: 'Quina forma tenen els senyals de prohibició?' },
    { es: ['Redondas con borde rojo', 'Triangulares', 'Cuadradas azules', 'Rombos amarillos'], en: ['Round with a red border', 'Triangular', 'Blue squares', 'Yellow diamonds'], ca: ['Rodones amb vora vermella', 'Triangulars', 'Quadrades blaves', 'Rombes grocs'] },
    { es: 'Redondas con borde rojo', en: 'Round with a red border', ca: 'Rodones amb vora vermella' },
    '⛔',
    { es: 'La forma ya dice el tipo antes de mirar el dibujo: redonda es obligación o prohibición, triangular es peligro, y cuadrada o rectangular azul es información. Por eso se entienden en cualquier país.', en: 'The shape already says the type before you read the symbol: round is obligation or prohibition, triangular is danger, and blue squares or rectangles are information. That is why they work in any country.', ca: 'La forma ja diu el tipus abans de mirar el dibuix: rodona és prohibició, triangular perill i blava informació.' }),

  q('sv-21', 'primaria',
    { es: '¿Qué se debe hacer al oír la sirena de una ambulancia siendo peatón?', en: 'As a pedestrian, what should you do on hearing an ambulance siren?', ca: 'Què cal fer en sentir la sirena d\'una ambulància com a vianant?' },
    { es: ['No cruzar y quedarse quieto en la acera hasta que pase', 'Cruzar rápido antes de que llegue', 'Hacerle señales', 'Seguir cruzando normal'], en: ['Do not cross and stay put on the pavement until it passes', 'Cross quickly before it arrives', 'Signal to it', 'Keep crossing as normal'], ca: ['No creuar i quedar-se quiet a la vorera fins que passi', 'Creuar ràpid abans que arribi', 'Fer-li senyals', 'Continuar creuant normal'] },
    { es: 'No cruzar y quedarse quieto en la acera hasta que pase', en: 'Do not cross and stay put on the pavement until it passes', ca: 'No creuar i quedar-se quiet a la vorera fins que passi' },
    '🚑',
    { es: 'Los vehículos de emergencia pueden saltarse un semáforo en rojo, así que el verde deja de ser fiable. Y quedarse quieto ayuda: lo que descoloca a un conductor es que alguien se mueva de forma imprevisible.', en: 'Emergency vehicles may cross a red light, so green stops being reliable. Staying still helps: what throws a driver is someone moving unpredictably.', ca: 'Els vehicles d\'emergència poden saltar-se un semàfor en vermell, així que el verd deixa de ser fiable.' }),

  q('sv-22', 'primaria',
    { es: '¿Por qué no se debe jugar ni correr cerca de coches aparcados?', en: 'Why should you not play or run near parked cars?', ca: 'Per què no s\'ha de jugar ni córrer prop de cotxes aparcats?' },
    { es: ['Porque un coche puede arrancar sin verte, y tú apareces de golpe en la calzada', 'Porque se puede rayar la pintura', 'Porque está prohibido por ley', 'Porque molesta a los vecinos'], en: ['Because a car may pull out without seeing you, and you appear suddenly in the road', 'Because you might scratch the paint', 'Because it is against the law', 'Because it annoys the neighbours'], ca: ['Perquè un cotxe pot arrencar sense veure\'t, i tu apareixes de cop a la calçada', 'Perquè es pot ratllar la pintura', 'Perquè està prohibit per llei', 'Perquè molesta els veïns'] },
    { es: 'Porque un coche puede arrancar sin verte, y tú apareces de golpe en la calzada', en: 'Because a car may pull out without seeing you, and you appear suddenly in the road', ca: 'Perquè un cotxe pot arrencar sense veure\'t, i tu apareixes de cop a la calçada' },
    '⚠️',
    { es: 'Un niño detrás de un coche queda por debajo de la luneta y es literalmente invisible desde el asiento del conductor. Por eso muchos atropellos infantiles ocurren a velocidad casi cero, en maniobras de aparcamiento.', en: 'A child behind a car is below the rear window and literally invisible from the driver\'s seat. That is why many child collisions happen at almost zero speed, during parking manoeuvres.', ca: 'Un nen darrere d\'un cotxe queda per sota de la lluneta i és literalment invisible des del seient del conductor.' }),

  q('sv-23', 'primaria',
    { es: '¿Se puede cruzar en diagonal para acortar?', en: 'Can you cross diagonally to save time?', ca: 'Es pot creuar en diagonal per escurçar?' },
    { es: ['No: se cruza en línea recta, que es el camino más corto y más previsible', 'Sí, si no vienen coches', 'Sí, si vas con prisa', 'Solo en calles anchas'], en: ['No: cross in a straight line, the shortest and most predictable path', 'Yes, if no cars are coming', 'Yes, if you are in a hurry', 'Only on wide streets'], ca: ['No: es creua en línia recta, que és el camí més curt i més previsible', 'Sí, si no vénen cotxes', 'Sí, si tens pressa', 'Només en carrers amples'] },
    { es: 'No: se cruza en línea recta, que es el camino más corto y más previsible', en: 'No: cross in a straight line, the shortest and most predictable path', ca: 'No: es creua en línia recta, que és el camí més curt i més previsible' },
    '📐',
    { es: 'En diagonal pasas más tiempo en la calzada y encima haces algo que el conductor no espera. En seguridad vial ser previsible vale casi tanto como ser rápido.', en: 'Going diagonally keeps you on the road longer and does something the driver does not expect. In road safety, being predictable is worth almost as much as being quick.', ca: 'En diagonal passes més temps a la calçada i a més fas una cosa que el conductor no espera.' }),

  q('sv-24', 'primaria',
    { es: 'Vas en bici por un carril bici y un peatón se cruza. ¿Qué haces?', en: 'You are on a cycle lane and a pedestrian steps across. What do you do?', ca: 'Vas en bici per un carril bici i un vianant es creua. Què fas?' },
    { es: ['Frenar y avisar con el timbre, sin esquivarlo a toda velocidad', 'Acelerar para pasar antes', 'Esquivarlo sin frenar', 'Gritarle'], en: ['Brake and ring the bell, without swerving past at speed', 'Speed up to get past first', 'Swerve without braking', 'Shout at them'], ca: ['Frenar i avisar amb el timbre, sense esquivar-lo a tota velocitat', 'Accelerar per passar abans', 'Esquivar-lo sense frenar', 'Cridar-li'] },
    { es: 'Frenar y avisar con el timbre, sin esquivarlo a toda velocidad', en: 'Brake and ring the bell, without swerving past at speed', ca: 'Frenar i avisar amb el timbre, sense esquivar-lo a tota velocitat' },
    '🔔',
    { es: 'El peatón es siempre la parte más frágil, aunque esté donde no debe. Esquivar sin frenar sale mal muy a menudo, porque la gente se aparta hacia el lado que no esperas.', en: 'The pedestrian is always the most fragile party, even when in the wrong place. Swerving without braking often goes badly, because people step aside the way you do not expect.', ca: 'El vianant és sempre la part més fràgil, encara que estigui on no ha d\'estar.' }),

  q('sv-25', 'primaria',
    { es: '¿Qué hay que revisar en una bici antes de salir?', en: 'What should you check on a bike before setting off?', ca: 'Què cal revisar en una bici abans de sortir?' },
    { es: ['Frenos, presión de las ruedas y luces', 'Solo el sillín', 'Solo el timbre', 'Nada, si funcionó ayer'], en: ['Brakes, tyre pressure and lights', 'Only the saddle', 'Only the bell', 'Nothing, if it worked yesterday'], ca: ['Frens, pressió de les rodes i llums', 'Només el selló', 'Només el timbre', 'Res, si va funcionar ahir'] },
    { es: 'Frenos, presión de las ruedas y luces', en: 'Brakes, tyre pressure and lights', ca: 'Frens, pressió de les rodes i llums' },
    '🔧',
    { es: 'Con las ruedas poco hinchadas se frena peor y se pincha más. Comprobarlo lleva medio minuto, y los frenos son lo único que no puedes arreglar sobre la marcha si fallan.', en: 'Under-inflated tyres brake worse and puncture more. Checking takes half a minute, and the brakes are the one thing you cannot fix on the move if they fail.', ca: 'Amb les rodes poc inflades es frena pitjor i es punxa més. Comprovar-ho triga mig minut.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('sv-30', 'eso',
    { es: '¿Qué es la distancia de detención de un vehículo?', en: 'What is a vehicle\'s stopping distance?', ca: 'Què és la distància de detenció d\'un vehicle?' },
    { es: ['La suma de la distancia de reacción y la de frenado', 'Solo lo que recorre frenando', 'La distancia hasta el coche de delante', 'Lo que se tarda en arrancar'], en: ['Reaction distance plus braking distance', 'Only the distance covered while braking', 'The gap to the car in front', 'How long it takes to start'], ca: ['La suma de la distància de reacció i la de frenada', 'Només el que recorre frenant', 'La distància fins al cotxe del davant', 'El que es triga a arrencar'] },
    { es: 'La suma de la distancia de reacción y la de frenado', en: 'Reaction distance plus braking distance', ca: 'La suma de la distància de reacció i la de frenada' },
    '📏',
    { es: 'La de reacción es lo que recorre el coche mientras el conductor procesa y mueve el pie: alrededor de un segundo, que a 100 km/h son casi 28 metros recorridos sin frenar todavía.', en: 'Reaction distance is what the car covers while the driver processes and moves their foot: about a second, which at 100 km/h is nearly 28 metres before braking even starts.', ca: 'La de reacció és el que recorre el cotxe mentre el conductor processa i mou el peu: prop d\'un segon.' }),

  q('sv-31', 'eso',
    { es: 'Si un coche duplica su velocidad, ¿qué le pasa a la distancia de frenado?', en: 'If a car doubles its speed, what happens to the braking distance?', ca: 'Si un cotxe duplica la velocitat, què li passa a la distància de frenada?' },
    { es: ['Se multiplica aproximadamente por cuatro', 'Se duplica', 'Se mantiene igual', 'Se reduce a la mitad'], en: ['It roughly quadruples', 'It doubles', 'It stays the same', 'It halves'], ca: ['Es multiplica aproximadament per quatre', 'Es duplica', 'Es manté igual', 'Es redueix a la meitat'] },
    { es: 'Se multiplica aproximadamente por cuatro', en: 'It roughly quadruples', ca: 'Es multiplica aproximadament per quatre' },
    '📈',
    { es: 'Porque la energía cinética depende del CUADRADO de la velocidad. Es la razón física de que los límites en ciudad estén en 30 o 50: no es una diferencia de tiempo, es una diferencia de supervivencia en un atropello.', en: 'Because kinetic energy depends on the SQUARE of the speed. It is the physical reason city limits are 30 or 50: it is not a difference in journey time but in survival if someone is hit.', ca: 'Perquè l\'energia cinètica depèn del QUADRAT de la velocitat.' }),

  q('sv-32', 'eso',
    { es: '¿Por qué aumenta la distancia de frenado con la calzada mojada?', en: 'Why does braking distance grow on a wet road?', ca: 'Per què augmenta la distància de frenada amb la calçada mullada?' },
    { es: ['Porque el agua reduce el rozamiento entre neumático y asfalto', 'Porque los frenos se mojan por dentro', 'Porque el coche pesa más', 'Porque el motor pierde potencia'], en: ['Because water reduces the friction between tyre and asphalt', 'Because the brakes get wet inside', 'Because the car weighs more', 'Because the engine loses power'], ca: ['Perquè l\'aigua redueix el fregament entre pneumàtic i asfalt', 'Perquè els frens es mullen per dins', 'Perquè el cotxe pesa més', 'Perquè el motor perd potència'] },
    { es: 'Porque el agua reduce el rozamiento entre neumático y asfalto', en: 'Because water reduces the friction between tyre and asphalt', ca: 'Perquè l\'aigua redueix el fregament entre pneumàtic i asfalt' },
    '🌧️',
    { es: 'Puede llegar a duplicarse. Si hay mucha agua y el dibujo del neumático está gastado, aparece el aquaplaning: la rueda flota sobre una película de agua y deja de dirigir y de frenar del todo.', en: 'It can double. With a lot of water and worn tread, aquaplaning appears: the wheel floats on a film of water and stops steering and braking altogether.', ca: 'Pot arribar a duplicar-se. Amb molta aigua i el dibuix gastat apareix l\'aquaplaning.' }),

  q('sv-33', 'eso',
    { es: '¿Qué tasa de alcohol se permite a quien conduce un patinete eléctrico?', en: 'What alcohol limit applies to someone riding an electric scooter?', ca: 'Quina taxa d\'alcohol es permet a qui condueix un patinet elèctric?' },
    { es: ['La misma que a cualquier conductor: se le aplican los mismos controles y sanciones', 'No se les aplica ningún límite', 'El doble que a un coche', 'Solo si van por carretera'], en: ['The same as any driver: the same tests and penalties apply', 'No limit applies to them', 'Double that of a car', 'Only if riding on the open road'], ca: ['La mateixa que a qualsevol conductor: se li apliquen els mateixos controls i sancions', 'No se\'ls aplica cap límit', 'El doble que a un cotxe', 'Només si van per carretera'] },
    { es: 'La misma que a cualquier conductor: se le aplican los mismos controles y sanciones', en: 'The same as any driver: the same tests and penalties apply', ca: 'La mateixa que a qualsevol conductor: se li apliquen els mateixos controls i sancions' },
    '🚫',
    { es: 'Un patinete es legalmente un vehículo, así que su conductor pasa controles de alcohol y drogas y puede ser multado igual. Mucha gente lo descubre en la multa, no antes.', en: 'A scooter is legally a vehicle, so its rider faces alcohol and drug tests and can be fined the same. Many people find this out from the fine, not before.', ca: 'Un patinet és legalment un vehicle, així que el seu conductor passa controls d\'alcohol i pot ser multat igual.' }),

  q('sv-34', 'eso',
    { es: '¿Por qué el móvil al volante es tan peligroso aunque sea un segundo?', en: 'Why is a phone at the wheel so dangerous even for a second?', ca: 'Per què el mòbil al volant és tan perillós encara que sigui un segon?' },
    { es: ['A 120 km/h se recorren 33 metros por segundo: mirar el móvil es conducir a ciegas', 'Porque las manos se ocupan', 'Porque baja la batería', 'Porque distrae a los demás conductores'], en: ['At 120 km/h you cover 33 metres a second: looking at a phone is driving blind', 'Because your hands are busy', 'Because the battery drains', 'Because it distracts other drivers'], ca: ['A 120 km/h es recorren 33 metres per segon: mirar el mòbil és conduir a cegues', 'Perquè les mans s\'ocupen', 'Perquè baixa la bateria', 'Perquè distreu els altres conductors'] },
    { es: 'A 120 km/h se recorren 33 metros por segundo: mirar el móvil es conducir a ciegas', en: 'At 120 km/h you cover 33 metres a second: looking at a phone is driving blind', ca: 'A 120 km/h es recorren 33 metres per segon: mirar el mòbil és conduir a cegues' },
    '📱',
    { es: 'Leer un mensaje corto son unos cinco segundos, es decir más de 150 metros sin mirar la carretera, casi dos campos de fútbol. Es la distracción que más accidentes mortales provoca.', en: 'Reading a short message takes about five seconds, over 150 metres without looking at the road — nearly two football pitches. It is the distraction causing the most fatal crashes.', ca: 'Llegir un missatge curt són uns cinc segons: més de 150 metres sense mirar la carretera.' }),

  q('sv-35', 'eso',
    { es: '¿Para qué sirve la regla de los dos segundos entre vehículos?', en: 'What is the two-second rule between vehicles for?', ca: 'Per a què serveix la regla dels dos segons entre vehicles?' },
    { es: ['Para mantener una distancia de seguridad que sirve a cualquier velocidad', 'Para adelantar más rápido', 'Para ahorrar combustible', 'Para saber cuándo cambiar de marcha'], en: ['To keep a safe gap that works at any speed', 'To overtake faster', 'To save fuel', 'To know when to change gear'], ca: ['Per mantenir una distància de seguretat que serveix a qualsevol velocitat', 'Per avançar més ràpid', 'Per estalviar combustible', 'Per saber quan canviar de marxa'] },
    { es: 'Para mantener una distancia de seguridad que sirve a cualquier velocidad', en: 'To keep a safe gap that works at any speed', ca: 'Per mantenir una distància de seguretat que serveix a qualsevol velocitat' },
    '⏱️',
    { es: 'Se elige un punto fijo de la carretera y se cuentan dos segundos desde que lo pasa el coche de delante. Funciona a cualquier velocidad porque cuanto más rápido vas, más metros ocupan esos dos segundos. Con lluvia se doblan.', en: 'Pick a fixed point on the road and count two seconds from when the car ahead passes it. It works at any speed because the faster you go, the more metres those two seconds cover. In rain, double it.', ca: 'Funciona a qualsevol velocitat perquè com més ràpid vas, més metres ocupen aquests dos segons.' }),

  q('sv-36', 'eso',
    { es: '¿Qué es un vehículo de movilidad personal (VMP) según la DGT?', en: 'What is a personal mobility vehicle (PMV) under Spanish rules?', ca: 'Què és un vehicle de mobilitat personal (VMP) segons la DGT?' },
    { es: ['Un vehículo de una plaza, como el patinete eléctrico, con normas propias de circulación', 'Cualquier bicicleta', 'Un ciclomotor de menos de 50 cc', 'Un coche pequeño de ciudad'], en: ['A one-seat vehicle, like an electric scooter, with its own traffic rules', 'Any bicycle', 'A moped under 50 cc', 'A small city car'], ca: ['Un vehicle d\'una plaça, com el patinet elèctric, amb normes pròpies de circulació', 'Qualsevol bicicleta', 'Un ciclomotor de menys de 50 cc', 'Un cotxe petit de ciutat'] },
    { es: 'Un vehículo de una plaza, como el patinete eléctrico, con normas propias de circulación', en: 'A one-seat vehicle, like an electric scooter, with its own traffic rules', ca: 'Un vehicle d\'una plaça, com el patinet elèctric, amb normes pròpies de circulació' },
    '🛴',
    { es: 'No es ni peatón ni bicicleta: tiene su propia categoría. Puede circular por calzada urbana y carril bici, nunca por acera ni por vías interurbanas, y el uso del casco depende de la ordenanza de cada municipio.', en: 'It is neither pedestrian nor bicycle: it has its own category. It may use urban roads and cycle lanes, never pavements or interurban roads, and helmet use depends on each town\'s bylaws.', ca: 'No és ni vianant ni bicicleta: té la seva pròpia categoria. El casc depèn de l\'ordenança de cada municipi.' }),

  q('sv-37', 'eso',
    { es: '¿Por qué la velocidad en muchas calles de ciudad se ha limitado a 30 km/h?', en: 'Why has the speed limit on many city streets been set at 30 km/h?', ca: 'Per què la velocitat en molts carrers de ciutat s\'ha limitat a 30 km/h?' },
    { es: ['Porque a esa velocidad un atropello es mucho menos probable que sea mortal', 'Para que los coches gasten menos', 'Para reducir el ruido solamente', 'Para recaudar más multas'], en: ['Because at that speed a collision is far less likely to be fatal', 'So cars use less fuel', 'Only to reduce noise', 'To collect more fines'], ca: ['Perquè a aquesta velocitat un atropellament és molt menys probable que sigui mortal', 'Perquè els cotxes gastin menys', 'Només per reduir el soroll', 'Per recaptar més multes'] },
    { es: 'Porque a esa velocidad un atropello es mucho menos probable que sea mortal', en: 'Because at that speed a collision is far less likely to be fatal', ca: 'Perquè a aquesta velocitat un atropellament és molt menys probable que sigui mortal' },
    '🐢',
    { es: 'La diferencia entre 30 y 50 km/h no son veinte números: es que la probabilidad de morir atropellado se multiplica varias veces. Y en un trayecto urbano corto, la diferencia de tiempo real es de pocos minutos.', en: 'The gap between 30 and 50 km/h is not twenty numbers: the probability of dying when hit multiplies several times over. And on a short urban trip the real time difference is a few minutes.', ca: 'La diferència entre 30 i 50 km/h no són vint números: la probabilitat de morir atropellat es multiplica.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 8 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
