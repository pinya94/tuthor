// Datos de los órganos y partes del cuerpo para el juego Rayos X
// (src/pages/RayosX.jsx) y su lógica (src/lib/rayosX.js). Mismo espíritu que
// planetas.js para Órbita: el `dato` es un hecho concreto y verificable, no
// una curiosidad vaga.
//
// Solo entran partes con una posición inequívoca vistas de frente — por eso
// no hay médula espinal (estructura de la espalda, ambigua de frente) ni
// riñones (están a los lados/detrás, se solaparían con estómago/hígado sin
// poder distinguirse). Ojos, boca y tráquea sí entran: cabeza y cuello dan
// sitio de sobra para verlos por separado sin ambigüedad de profundidad. Lo
// mismo para el sistema óseo/articular: solo huesos y articulaciones de
// brazo/pierna, que se ven bien de frente y sin solaparse entre ellos (nada
// de columna ni costillas por detrás).
//
// Posición (x,y) en el sistema de coordenadas de SiluetaCuerpo.jsx —
// coincide con el viewBox nativo de public/img/cuerpo-humano.svg
// (0 0 147.998 318.455, vista frontal real, no un dibujo a mano). Medidas a
// ojo sobre el propio SVG con una cuadrícula de referencia superpuesta (no
// a ojo sobre una miniatura pequeña): cabeza 2-32 (mentón ~32), torso ancho
// y sin apenas cintura de 50 a 140, ingle hacia 170, brazo derecho hombro
// ~95→codo ~128→muñeca ~155, pierna derecha cadera ~172→rodilla ~233→
// tobillo ~295. Brazo y pierna van siempre del lado derecho (x>74, el mismo
// convenio que ya usaban estómago/hígado) — es simetría bilateral, el lado
// es una elección arbitraria, no hace falta repetir cada hueso a los dos
// lados. Cubren los 5 sistemas que ya trata el examen teórico de Cuerpo
// Humano (src/data/cuerpoHumano.js) más el óseo/articular, que no tiene
// examen propio todavía: nervioso, circulatorio, respiratorio, digestivo y
// óseo.
//
// `radio`: tolerancia propia de cada órgano (unidades del viewBox), no una
// sola compartida por todos — un órgano pequeño y bien delimitado como el
// corazón pide más precisión que uno grande y repartido por el abdomen como
// los intestinos. Se usa en lib/rayosX.js: un clic cuenta si cae dentro del
// radio del órgano preguntado, sin comparar contra los demás (así el mismo
// punto puede caer dentro de dos radios que se solapan sin ser injusto —
// cada pregunta solo mira el radio del órgano que toca esa ronda). Los
// radios son deliberadamente generosos: el reto es saber la zona general,
// no acertar un punto exacto al milímetro.
//
// Para huesos largos (húmero, radio, cúbito, fémur, tibia, peroné) un
// círculo centrado en un punto se queda corto — un clic en cualquier punto
// a lo largo del hueso es igual de correcto, no solo el centro. Esos usan
// `organoLargo()`: dos extremos (x1,y1)-(x2,y2) y un `radio` que es el
// grosor a cada lado del segmento (una "cápsula"), no un radio circular.
// isCorrectGuess/evaluarClick miden la distancia al SEGMENTO, no al punto.
function organo(id, sistema, x, y, radio, color, nombre, funcion, dato) {
  return { id, sistema, x, y, radio, color, nombre, funcion, dato }
}

function organoLargo(id, sistema, x1, y1, x2, y2, radio, color, nombre, funcion, dato) {
  const x = (x1 + x2) / 2, y = (y1 + y2) / 2
  return { id, sistema, x, y, radio, color, nombre, funcion, dato, segmento: { x1, y1, x2, y2 } }
}

export const SISTEMAS = {
  nervioso:     { es: 'Sistema Nervioso',     en: 'Nervous System',     ca: 'Sistema Nerviós' },
  circulatorio: { es: 'Sistema Circulatorio', en: 'Circulatory System', ca: 'Sistema Circulatori' },
  respiratorio: { es: 'Sistema Respiratorio', en: 'Respiratory System', ca: 'Sistema Respiratori' },
  digestivo:    { es: 'Sistema Digestivo',    en: 'Digestive System',   ca: 'Sistema Digestiu' },
  oseo:         { es: 'Sistema Óseo y Articular', en: 'Skeletal & Joint System', ca: 'Sistema Ossi i Articular' },
}

// Orden de arriba abajo del cuerpo (cabeza → pecho → abdomen), como los
// planetas van de más cerca a más lejos del Sol.
export const ORGANOS = [
  organo('cerebro', 'nervioso', 74, 10, 13, '#a78bfa',
    { es: 'Cerebro', en: 'Brain', ca: 'Cervell' },
    { es: 'Controla todo el cuerpo y procesa la información de los sentidos.', en: 'Controls the whole body and processes information from the senses.', ca: 'Controla tot el cos i processa la informació dels sentits.' },
    { es: 'Consume cerca del 20% de la energía diaria del cuerpo aunque pesa solo un 2% del peso corporal.', en: 'It uses about 20% of the body\'s daily energy despite weighing only 2% of body weight.', ca: 'Consumeix prop del 20% de l\'energia diària del cos tot i pesar només un 2% del pes corporal.' }),

  organo('ojos', 'nervioso', 74, 19, 9, '#67e8f9',
    { es: 'Ojos', en: 'Eyes', ca: 'Ulls' },
    { es: 'Captan la luz y la convierten en señales que el cerebro interpreta como imágenes.', en: 'Capture light and turn it into signals the brain interprets as images.', ca: 'Capten la llum i la converteixen en senyals que el cervell interpreta com a imatges.' },
    { es: 'Cada ojo tiene más de 100 millones de células sensibles a la luz — más que píxeles tiene la mayoría de cámaras de móvil.', en: 'Each eye has over 100 million light-sensitive cells — more than the pixel count of most phone cameras.', ca: 'Cada ull té més de 100 milions de cèl·lules sensibles a la llum — més que píxels té la majoria de càmeres de mòbil.' }),

  organo('boca', 'digestivo', 74, 29, 9, '#f472b6',
    { es: 'Boca', en: 'Mouth', ca: 'Boca' },
    { es: 'Primer paso de la digestión: los dientes trituran el alimento y la saliva empieza a descomponerlo.', en: 'The first step of digestion: teeth grind up food and saliva starts breaking it down.', ca: 'Primer pas de la digestió: les dents trituren l\'aliment i la saliva comença a descompondre\'l.' },
    { es: 'Produce entre 1 y 1,5 litros de saliva al día, con enzimas que ya empiezan a descomponer el almidón antes de tragar.', en: 'It produces between 1 and 1.5 litres of saliva a day, with enzymes that start breaking down starch before you even swallow.', ca: 'Produeix entre 1 i 1,5 litres de saliva al dia, amb enzims que ja comencen a descompondre el midó abans d\'empassar.' }),

  organo('traquea', 'respiratorio', 74, 41, 10, '#7dd3fc',
    { es: 'Tráquea', en: 'Trachea', ca: 'Tràquea' },
    { es: 'Conduce el aire entre la garganta y los pulmones, protegida por anillos de cartílago.', en: 'Carries air between the throat and the lungs, protected by rings of cartilage.', ca: 'Condueix l\'aire entre la gola i els pulmons, protegida per anells de cartílag.' },
    { es: 'Sus anillos de cartílago tienen forma de C, abiertos por detrás, para dejar sitio al esófago cuando tragamos.', en: 'Its cartilage rings are C-shaped, open at the back, to leave room for the oesophagus when we swallow.', ca: 'Els seus anells de cartílag tenen forma de C, oberts per darrere, per deixar lloc a l\'esòfag quan empassem.' }),

  organo('pulmones', 'respiratorio', 74, 70, 28, '#60a5fa',
    { es: 'Pulmones', en: 'Lungs', ca: 'Pulmons' },
    { es: 'Intercambian oxígeno y dióxido de carbono con la sangre al respirar.', en: 'Exchange oxygen and carbon dioxide with the blood when breathing.', ca: 'Intercanvien oxigen i diòxid de carboni amb la sang en respirar.' },
    { es: 'Si se estirara toda su superficie interna, cubriría casi una pista de tenis: unos 70 metros cuadrados.', en: 'If their whole inner surface were unfolded, it would cover almost a tennis court: about 70 square metres.', ca: 'Si s\'estirés tota la seva superfície interna, cobriria gairebé una pista de tennis: uns 70 metres quadrats.' }),

  organo('corazon', 'circulatorio', 64, 80, 15, '#f87171',
    { es: 'Corazón', en: 'Heart', ca: 'Cor' },
    { es: 'Bombea la sangre por todo el cuerpo a través de venas y arterias.', en: 'Pumps blood around the whole body through veins and arteries.', ca: 'Bombeja la sang per tot el cos a través de venes i artèries.' },
    { es: 'Late unas 100.000 veces al día, bombeando la sangre a través de casi 100.000 km de vasos sanguíneos.', en: 'It beats around 100,000 times a day, pumping blood through nearly 100,000 km of blood vessels.', ca: 'Batega unes 100.000 vegades al dia, bombejant la sang a través de gairebé 100.000 km de vasos sanguinis.' }),

  organo('diafragma', 'respiratorio', 74, 93, 16, '#38bdf8',
    { es: 'Diafragma', en: 'Diaphragm', ca: 'Diafragma' },
    { es: 'Músculo que se contrae y relaja para impulsar la respiración.', en: 'Muscle that contracts and relaxes to drive breathing.', ca: 'Múscul que es contrau i relaxa per impulsar la respiració.' },
    { es: 'Al contraerse baja y aplana su forma de cúpula, dejando más espacio a los pulmones para llenarse de aire.', en: 'When it contracts it flattens its dome shape, leaving more room for the lungs to fill with air.', ca: 'En contraure\'s baixa i aplana la seva forma de cúpula, deixant més espai als pulmons per omplir-se d\'aire.' }),

  organo('estomago', 'digestivo', 62, 107, 18, '#fb923c',
    { es: 'Estómago', en: 'Stomach', ca: 'Estómac' },
    { es: 'Descompone los alimentos con ácido y enzimas digestivas.', en: 'Breaks down food with acid and digestive enzymes.', ca: 'Descompon els aliments amb àcid i enzims digestius.' },
    { es: 'Su ácido gástrico tiene un pH tan bajo como 1,5 — capaz de disolver metal, aunque el propio estómago se protege con una capa de moco.', en: 'Its gastric acid can have a pH as low as 1.5 — strong enough to dissolve metal, though the stomach itself is protected by a layer of mucus.', ca: 'El seu àcid gàstric pot tenir un pH tan baix com 1,5 — capaç de dissoldre metall, tot i que el mateix estómac es protegeix amb una capa de moc.' }),

  organo('higado', 'digestivo', 87, 107, 19, '#c2884d',
    { es: 'Hígado', en: 'Liver', ca: 'Fetge' },
    { es: 'Filtra la sangre y produce bilis para digerir las grasas.', en: 'Filters the blood and produces bile to digest fats.', ca: 'Filtra la sang i produeix bilis per digerir els greixos.' },
    { es: 'Es el único órgano interno capaz de regenerarse: puede recuperar su tamaño incluso perdiendo hasta un 75%.', en: 'It is the only internal organ that can regenerate: it can recover its size even after losing up to 75% of it.', ca: 'És l\'únic òrgan intern capaç de regenerar-se: pot recuperar la seva mida encara que en perdi fins a un 75%.' }),

  organo('intestinos', 'digestivo', 74, 125, 24, '#fbbf24',
    { es: 'Intestinos', en: 'Intestines', ca: 'Intestins' },
    { es: 'Absorben los nutrientes y el agua de los alimentos ya digeridos.', en: 'Absorb nutrients and water from already-digested food.', ca: 'Absorbeixen els nutrients i l\'aigua dels aliments ja digerits.' },
    { es: 'El intestino delgado mide unos 6-7 metros — más largo que el propio cuerpo, enrollado para caber en el abdomen.', en: 'The small intestine is about 6-7 metres long — longer than the body itself, coiled up to fit inside the abdomen.', ca: 'L\'intestí prim fa uns 6-7 metres — més llarg que el propi cos, enrotllat per cabre dins l\'abdomen.' }),

  // Sistema óseo/articular — brazo y pierna derechos (ver nota de arriba).
  organo('clavicula', 'oseo', 90, 56, 12, '#94a3b8',
    { es: 'Clavícula', en: 'Collarbone', ca: 'Clavícula' },
    { es: 'Une el esternón con el hombro y sirve de puntal para que el brazo se mueva con libertad.', en: 'Connects the breastbone to the shoulder and acts as a strut so the arm can move freely.', ca: 'Uneix l\'estèrnum amb l\'espatlla i fa de puntal perquè el braç es mogui amb llibertat.' },
    { es: 'Es de los huesos que más se rompen en caídas sobre el hombro o el brazo extendido, y de los primeros en empezar a osificarse antes de nacer.', en: 'It is one of the most commonly broken bones in falls onto the shoulder or an outstretched arm, and one of the first to start ossifying before birth.', ca: 'És dels ossos que més es trenquen en caigudes sobre l\'espatlla o el braç estès, i dels primers a començar a ossificar-se abans de néixer.' }),

  organoLargo('humero', 'oseo', 100, 95, 128, 128, 13, '#cbd5e1',
    { es: 'Húmero', en: 'Humerus', ca: 'Húmer' },
    { es: 'Hueso largo del brazo, entre el hombro y el codo, donde se anclan los músculos que lo mueven.', en: 'The long bone of the upper arm, between the shoulder and the elbow, anchoring the muscles that move it.', ca: 'Os llarg del braç, entre l\'espatlla i el colze, on s\'ancoren els músculs que el mouen.' },
    { es: 'Es el hueso más largo y grueso del brazo — un golpe en su extremo inferior, cerca del codo, es el famoso "hueso de la risa".', en: 'It is the longest, thickest bone in the arm — a knock near its lower end, by the elbow, is the famous "funny bone".', ca: 'És l\'os més llarg i gruixut del braç — un cop al seu extrem inferior, a prop del colze, és el famós "os de la rialla".' }),

  organo('codo', 'oseo', 128, 128, 10, '#e2e8f0',
    { es: 'Codo', en: 'Elbow', ca: 'Colze' },
    { es: 'Articulación que une el húmero con el radio y el cúbito, y permite doblar el brazo.', en: 'The joint connecting the humerus to the radius and ulna, letting the arm bend.', ca: 'Articulació que uneix l\'húmer amb el radi i el cúbit, i permet doblegar el braç.' },
    { es: 'Es una articulación de bisagra: solo se dobla en un plano, a diferencia del hombro, que gira en casi todas direcciones.', en: 'It is a hinge joint: it only bends in one plane, unlike the shoulder, which rotates in almost every direction.', ca: 'És una articulació de frontissa: només es doblega en un pla, a diferència de l\'espatlla, que gira en gairebé totes direccions.' }),

  organoLargo('radio', 'oseo', 130, 130, 133, 153, 8, '#cbd5e1',
    { es: 'Radio', en: 'Radius', ca: 'Radi' },
    { es: 'Uno de los dos huesos del antebrazo, del lado del pulgar, entre el codo y la muñeca.', en: 'One of the two forearm bones, on the thumb side, between the elbow and the wrist.', ca: 'Un dels dos ossos de l\'avantbraç, del costat del polze, entre el colze i el canell.' },
    { es: 'Al girar la palma de la mano hacia arriba o abajo, es el radio el que gira sobre el cúbito — el cúbito apenas se mueve.', en: 'When you turn your palm up or down, it is the radius that rotates around the ulna — the ulna barely moves.', ca: 'En girar el palmell de la mà cap amunt o avall, és el radi el que gira sobre el cúbit — el cúbit tot just es mou.' }),

  organoLargo('cubito', 'oseo', 126, 130, 122, 153, 8, '#e2e8f0',
    { es: 'Cúbito', en: 'Ulna', ca: 'Cúbit' },
    { es: 'El otro hueso del antebrazo, del lado del meñique, entre el codo y la muñeca.', en: 'The other forearm bone, on the little-finger side, between the elbow and the wrist.', ca: 'L\'altre os de l\'avantbraç, del costat del dit petit, entre el colze i el canell.' },
    { es: 'Su extremo superior forma la punta del codo — el hueso que notas al apoyarlo sobre la mesa.', en: 'Its upper end forms the point of the elbow — the bone you feel when you rest it on a table.', ca: 'El seu extrem superior forma la punta del colze — l\'os que notes en recolzar-lo sobre la taula.' }),

  organo('muneca', 'oseo', 128, 155, 9, '#e2e8f0',
    { es: 'Muñeca', en: 'Wrist', ca: 'Canell' },
    { es: 'Articulación entre el antebrazo y la mano, formada por ocho huesos pequeños (los carpianos).', en: 'The joint between the forearm and the hand, made up of eight small bones (the carpals).', ca: 'Articulació entre l\'avantbraç i la mà, formada per vuit ossos petits (els carpians).' },
    { es: 'Sus ocho huesos carpianos son de los últimos del cuerpo en terminar de osificarse, sobre los 18-25 años.', en: 'Its eight carpal bones are among the last in the body to finish ossifying, around age 18-25.', ca: 'Els seus vuit ossos carpians són dels últims del cos a acabar d\'ossificar-se, cap als 18-25 anys.' }),

  organoLargo('femur', 'oseo', 90, 172, 95, 233, 14, '#cbd5e1',
    { es: 'Fémur', en: 'Femur', ca: 'Fèmur' },
    { es: 'Hueso del muslo, entre la cadera y la rodilla — el que soporta más peso del cuerpo.', en: 'The thigh bone, between the hip and the knee — the one that bears the most weight in the body.', ca: 'Os de la cuixa, entre el maluc i el genoll — el que suporta més pes del cos.' },
    { es: 'Es el hueso más largo, fuerte y pesado del cuerpo humano: puede soportar hasta unas 30 veces el peso corporal sin romperse.', en: 'It is the longest, strongest and heaviest bone in the human body: it can bear roughly 30 times body weight without breaking.', ca: 'És l\'os més llarg, fort i pesat del cos humà: pot suportar fins a unes 30 vegades el pes corporal sense trencar-se.' }),

  organo('rotula', 'oseo', 95, 233, 10, '#e2e8f0',
    { es: 'Rótula', en: 'Kneecap', ca: 'Ròtula' },
    { es: 'Hueso pequeño y móvil situado delante de la rodilla, que protege la articulación.', en: 'A small, mobile bone in front of the knee that protects the joint.', ca: 'Os petit i mòbil situat davant del genoll, que protegeix l\'articulació.' },
    { es: 'Es el hueso sesamoideo (dentro de un tendón) más grande del cuerpo — no está unida directamente a otro hueso, sino sujeta por tendones.', en: 'It is the largest sesamoid bone (embedded in a tendon) in the body — it is not directly joined to another bone, just held in place by tendons.', ca: 'És l\'os sesamoide (dins d\'un tendó) més gran del cos — no està unida directament a cap altre os, sinó subjectada per tendons.' }),

  organoLargo('tibia', 'oseo', 95, 233, 92, 295, 8, '#cbd5e1',
    { es: 'Tibia', en: 'Tibia', ca: 'Tíbia' },
    { es: 'Hueso principal de la espinilla, el que soporta el peso del cuerpo entre la rodilla y el tobillo.', en: 'The main shin bone, bearing the body\'s weight between the knee and the ankle.', ca: 'Os principal de l\'espinyera, el que suporta el pes del cos entre el genoll i el turmell.' },
    { es: 'Es el segundo hueso más largo del cuerpo tras el fémur, y el más superficial — por eso un golpe en la espinilla duele tanto.', en: 'It is the second longest bone in the body after the femur, and the most superficial — which is why a knock on the shin hurts so much.', ca: 'És el segon os més llarg del cos després del fèmur, i el més superficial — per això un cop a l\'espinyera fa tant de mal.' }),

  organoLargo('perone', 'oseo', 99, 233, 100, 295, 7, '#e2e8f0',
    { es: 'Peroné', en: 'Fibula', ca: 'Peroné' },
    { es: 'Hueso fino situado junto a la tibia, en la parte externa de la pierna.', en: 'A thin bone next to the tibia, on the outer side of the leg.', ca: 'Os prim situat al costat de la tíbia, a la part externa de la cama.' },
    { es: 'Apenas soporta peso (menos del 10% de la carga de la pierna) — su función principal es dar estabilidad al tobillo.', en: 'It bears almost no weight (under 10% of the leg\'s load) — its main job is to give the ankle stability.', ca: 'Tot just suporta pes (menys del 10% de la càrrega de la cama) — la seva funció principal és donar estabilitat al turmell.' }),

  organo('tobillo', 'oseo', 94, 295, 9, '#cbd5e1',
    { es: 'Tobillo', en: 'Ankle', ca: 'Turmell' },
    { es: 'Articulación entre la pierna (tibia y peroné) y el pie, formada por el hueso astrágalo.', en: 'The joint between the leg (tibia and fibula) and the foot, formed by the talus bone.', ca: 'Articulació entre la cama (tíbia i peroné) i el peu, formada per l\'os astràgal.' },
    { es: 'Es una de las articulaciones que más se lesiona por esguinces — soporta hasta 1,5 veces el peso corporal al caminar.', en: 'It is one of the joints most often injured by sprains — it bears up to 1.5 times body weight when walking.', ca: 'És una de les articulacions que més es lesiona per esquinços — suporta fins a 1,5 vegades el pes corporal en caminar.' }),
]

export function getOrgano(id) {
  return ORGANOS.find(o => o.id === id)
}
