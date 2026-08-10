// Grandes Hitos de la Historia — banco de preguntas del examen de teoría (Primaria).
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-hitos.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('hitos-01', 'primaria',
    { es: '¿Qué antigua civilización construyó las pirámides?', en: 'Which ancient civilisation built the pyramids?', ca: 'Quina civilització antiga va construir les piràmides?' },
    { es: ['El Antiguo Egipto', 'La Antigua Grecia', 'El Imperio Romano', 'Mesopotamia'], en: ['Ancient Egypt', 'Ancient Greece', 'The Roman Empire', 'Mesopotamia'], ca: ['L\'Antic Egipte', 'L\'Antiga Grècia', 'L\'Imperi Romà', 'Mesopotàmia'] },
    { es: 'El Antiguo Egipto', en: 'Ancient Egypt', ca: 'L\'Antic Egipte' },
    '🔺',
    { es: 'Los antiguos egipcios construyeron las grandes pirámides y también inventaron los jeroglíficos, un sistema de escritura con dibujos.', en: 'The ancient Egyptians built the great pyramids and also invented hieroglyphics, a writing system made of pictures.', ca: 'Els antics egipcis van construir les grans piràmides i també van inventar els jeroglífics, un sistema d\'escriptura amb dibuixos.' }),

  q('hitos-02', 'primaria',
    { es: '¿En qué antigua civilización se inventó la escritura cuneiforme?', en: 'In which ancient civilisation was cuneiform writing invented?', ca: 'En quina antiga civilització es va inventar l\'escriptura cuneïforme?' },
    { es: ['Mesopotamia', 'Egipto', 'Grecia', 'Roma'], en: ['Mesopotamia', 'Egypt', 'Greece', 'Rome'], ca: ['Mesopotàmia', 'Egipte', 'Grècia', 'Roma'] },
    { es: 'Mesopotamia', en: 'Mesopotamia', ca: 'Mesopotàmia' },
    '📜',
    { es: 'En Mesopotamia se inventó la escritura cuneiforme, una de las formas de escritura más antiguas del mundo, hecha con marcas en tablillas de barro.', en: 'Cuneiform writing was invented in Mesopotamia, one of the oldest writing systems in the world, made with marks on clay tablets.', ca: 'A Mesopotàmia es va inventar l\'escriptura cuneïforme, una de les formes d\'escriptura més antigues del món, feta amb marques en tauletes de fang.' }),

  q('hitos-03', 'primaria',
    { es: '¿Qué antigua civilización inventó la democracia?', en: 'Which ancient civilisation invented democracy?', ca: 'Quina antiga civilització va inventar la democràcia?' },
    { es: ['La Antigua Grecia', 'El Antiguo Egipto', 'Mesopotamia', 'El Imperio Romano'], en: ['Ancient Greece', 'Ancient Egypt', 'Mesopotamia', 'The Roman Empire'], ca: ['L\'Antiga Grècia', 'L\'Antic Egipte', 'Mesopotàmia', 'L\'Imperi Romà'] },
    { es: 'La Antigua Grecia', en: 'Ancient Greece', ca: 'L\'Antiga Grècia' },
    '🏛️',
    { es: 'La Antigua Grecia nos dio la democracia (que los ciudadanos voten las decisiones) y también fue cuna de grandes filósofos.', en: 'Ancient Greece gave us democracy (citizens voting on decisions) and was also the birthplace of great philosophers.', ca: 'L\'Antiga Grècia ens va donar la democràcia (que els ciutadans votin les decisions) i també va ser bressol de grans filòsofs.' }),

  q('hitos-04', 'primaria',
    { es: '¿En qué año llegó Cristóbal Colón a América?', en: 'In what year did Christopher Columbus reach America?', ca: 'En quin any va arribar Cristòfor Colom a Amèrica?' },
    { es: ['1492', '1450', '1519', '1969'], en: ['1492', '1450', '1519', '1969'], ca: ['1492', '1450', '1519', '1969'] },
    { es: '1492', en: '1492', ca: '1492' },
    '⛵',
    { es: 'Cristóbal Colón llegó a América en 1492. No hay que confundirlo con Magallanes, que dio la primera vuelta al mundo entre 1519 y 1522.', en: 'Christopher Columbus reached America in 1492. Do not confuse him with Magellan, who completed the first circumnavigation of the world between 1519 and 1522.', ca: 'Cristòfor Colom va arribar a Amèrica el 1492. No l\'hem de confondre amb Magallanes, que va fer la primera volta al món entre el 1519 i el 1522.' }),

  q('hitos-05', 'primaria',
    { es: '¿Quién inventó la imprenta en 1450?', en: 'Who invented the printing press in 1450?', ca: 'Qui va inventar la impremta el 1450?' },
    { es: ['Gutenberg', 'Colón', 'Galileo', 'Newton'], en: ['Gutenberg', 'Columbus', 'Galileo', 'Newton'], ca: ['Gutenberg', 'Colom', 'Galileu', 'Newton'] },
    { es: 'Gutenberg', en: 'Gutenberg', ca: 'Gutenberg' },
    '📚',
    { es: 'Gutenberg inventó la imprenta en 1450, lo que permitió fabricar libros mucho más rápido y barato — un cambio enorme para la historia del conocimiento.', en: 'Gutenberg invented the printing press in 1450, making it possible to produce books much faster and cheaper — a huge change for the history of knowledge.', ca: 'Gutenberg va inventar la impremta el 1450, la qual cosa va permetre fabricar llibres molt més ràpid i barat — un canvi enorme per a la història del coneixement.' }),

  q('hitos-06', 'primaria',
    { es: '¿Quién completó la primera vuelta al mundo (1519-1522)?', en: 'Who completed the first circumnavigation of the world (1519-1522)?', ca: 'Qui va completar la primera volta al món (1519-1522)?' },
    { es: ['La expedición de Magallanes', 'Colón', 'Gutenberg', 'Galileo'], en: ['Magellan\'s expedition', 'Columbus', 'Gutenberg', 'Galileo'], ca: ['L\'expedició de Magallanes', 'Colom', 'Gutenberg', 'Galileu'] },
    { es: 'La expedición de Magallanes', en: 'Magellan\'s expedition', ca: 'L\'expedició de Magallanes' },
    '🌍',
    { es: 'La expedición de Magallanes (terminada por Elcano tras su muerte) completó la primera vuelta al mundo entre 1519 y 1522, demostrando que la Tierra era redonda de forma práctica.', en: 'Magellan\'s expedition (finished by Elcano after his death) completed the first circumnavigation of the world between 1519 and 1522, practically proving the Earth was round.', ca: 'L\'expedició de Magallanes (acabada per Elcano després de la seva mort) va completar la primera volta al món entre el 1519 i el 1522, demostrant de forma pràctica que la Terra era rodona.' }),

  q('hitos-07', 'primaria',
    { es: '¿Quién inventó el telescopio y observó el cielo con él en 1609?', en: 'Who invented the telescope and used it to observe the sky in 1609?', ca: 'Qui va inventar el telescopi i va observar el cel amb ell el 1609?' },
    { es: ['Galileo', 'Newton', 'Colón', 'Gutenberg'], en: ['Galileo', 'Newton', 'Columbus', 'Gutenberg'], ca: ['Galileu', 'Newton', 'Colom', 'Gutenberg'] },
    { es: 'Galileo', en: 'Galileo', ca: 'Galileu' },
    '🔭',
    { es: 'Galileo perfeccionó el telescopio en 1609 y lo usó para observar el cielo, dando un gran impulso a la revolución científica.', en: 'Galileo perfected the telescope in 1609 and used it to observe the sky, giving a great boost to the scientific revolution.', ca: 'Galileu va perfeccionar el telescopi el 1609 i el va fer servir per observar el cel, donant un gran impuls a la revolució científica.' }),

  q('hitos-08', 'primaria',
    { es: '¿Cuándo tuvo lugar la Primera Guerra Mundial?', en: 'When did the First World War take place?', ca: 'Quan va tenir lloc la Primera Guerra Mundial?' },
    { es: ['1914-1918', '1939-1945', '1969-1975', '1989-1991'], en: ['1914-1918', '1939-1945', '1969-1975', '1989-1991'], ca: ['1914-1918', '1939-1945', '1969-1975', '1989-1991'] },
    { es: '1914-1918', en: '1914-1918', ca: '1914-1918' },
    '⚔️',
    { es: 'La Primera Guerra Mundial duró de 1914 a 1918. Veinte años después estallaría la Segunda Guerra Mundial (1939-1945).', en: 'The First World War lasted from 1914 to 1918. Twenty years later the Second World War would break out (1939-1945).', ca: 'La Primera Guerra Mundial va durar del 1914 al 1918. Vint anys després esclataria la Segona Guerra Mundial (1939-1945).' }),

  q('hitos-09', 'primaria',
    { es: '¿En qué año llegó el ser humano a la Luna por primera vez?', en: 'In what year did humans first land on the Moon?', ca: 'En quin any va arribar l\'ésser humà a la Lluna per primera vegada?' },
    { es: ['1969', '1945', '1989', '1492'], en: ['1969', '1945', '1989', '1492'], ca: ['1969', '1945', '1989', '1492'] },
    { es: '1969', en: '1969', ca: '1969' },
    '🌕',
    { es: 'En 1969, los astronautas del Apolo 11 pisaron la Luna por primera vez en la historia — uno de los hitos más recordados del siglo XX.', en: 'In 1969, the Apollo 11 astronauts walked on the Moon for the first time in history — one of the most remembered milestones of the 20th century.', ca: 'El 1969, els astronautes de l\'Apollo 11 van trepitjar la Lluna per primera vegada en la història — una de les fites més recordades del segle XX.' }),

  q('hitos-10', 'primaria',
    { es: '¿Qué famoso muro cayó en 1989?', en: 'Which famous wall fell in 1989?', ca: 'Quin famós mur va caure el 1989?' },
    { es: ['El Muro de Berlín', 'La Gran Muralla China', 'El Muro de Adriano', 'La Muralla de Ávila'], en: ['The Berlin Wall', 'The Great Wall of China', 'Hadrian\'s Wall', 'The walls of Ávila'], ca: ['El Mur de Berlín', 'La Gran Muralla Xinesa', 'El Mur d\'Adrià', 'La Muralla d\'Àvila'] },
    { es: 'El Muro de Berlín', en: 'The Berlin Wall', ca: 'El Mur de Berlín' },
    '🧱',
    { es: 'El Muro de Berlín, que dividía la ciudad en dos desde 1961, cayó en 1989 — un símbolo del final de la Guerra Fría y de la división de Europa.', en: 'The Berlin Wall, which had divided the city in two since 1961, fell in 1989 — a symbol of the end of the Cold War and the division of Europe.', ca: 'El Mur de Berlín, que dividia la ciutat en dos des del 1961, va caure el 1989 — un símbol del final de la Guerra Freda i de la divisió d\'Europa.' }),

  q('hitos-11', 'primaria',
    { es: '¿Qué construyeron los antiguos romanos que todavía se usa como modelo en ingeniería?', en: 'What did the ancient Romans build that is still used as an engineering model today?', ca: 'Què van construir els antics romans que encara es fa servir com a model en enginyeria?' },
    { es: ['Carreteras, acueductos y puentes', 'Pirámides', 'Templos con jeroglíficos', 'Rascacielos'], en: ['Roads, aqueducts and bridges', 'Pyramids', 'Temples with hieroglyphics', 'Skyscrapers'], ca: ['Carreteres, aqüeductes i ponts', 'Piràmides', 'Temples amb jeroglífics', 'Gratacels'] },
    { es: 'Carreteras, acueductos y puentes', en: 'Roads, aqueducts and bridges', ca: 'Carreteres, aqüeductes i ponts' },
    '🌉',
    { es: 'Los romanos fueron grandes ingenieros: construyeron carreteras, acueductos y puentes tan sólidos que muchos siguen en pie hoy, dos mil años después.', en: 'The Romans were great engineers: they built roads, aqueducts and bridges so solid that many are still standing today, two thousand years later.', ca: 'Els romans van ser grans enginyers: van construir carreteres, aqüeductes i ponts tan sòlids que molts encara es dempeus avui, dos mil anys després.' }),

  q('hitos-12', 'primaria',
    { es: '¿Qué inventó Gutenberg que cambió para siempre la forma de compartir el conocimiento?', en: 'What did Gutenberg invent that changed the way knowledge was shared forever?', ca: 'Què va inventar Gutenberg que va canviar per sempre la forma de compartir el coneixement?' },
    { es: ['La imprenta', 'El telescopio', 'La brújula', 'El papel'], en: ['The printing press', 'The telescope', 'The compass', 'Paper'], ca: ['La impremta', 'El telescopi', 'La brúixola', 'El paper'] },
    { es: 'La imprenta', en: 'The printing press', ca: 'La impremta' },
    '🖨️',
    { es: 'Antes de la imprenta de Gutenberg (1450), los libros se copiaban a mano, uno por uno. Con la imprenta se pudieron hacer muchas copias rápido, y el conocimiento llegó a mucha más gente.', en: 'Before Gutenberg\'s printing press (1450), books were copied by hand, one at a time. With the printing press, many copies could be made quickly, and knowledge reached far more people.', ca: 'Abans de la impremta de Gutenberg (1450), els llibres es copiaven a mà, un per un. Amb la impremta es van poder fer moltes còpies ràpid, i el coneixement va arribar a molta més gent.' }),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS
