// ── DIAGNÓSTICO ──────────────────────────────────────────────────────────────
// Mecánica tipo "¿Quién es Quién?" para Ciencias: tablero de candidatos visible
// desde el inicio, pistas que se van acumulando (no sustituyen a la anterior,
// a diferencia de quien-es-quien) y el jugador descarta activamente hasta
// quedarse con uno solo y confirmar.
//
// Cada tema tiene un mazo fijo de `candidatos` (siempre los mismos 8, todos
// visibles) y varias `rondas` (una por candidato posible como respuesta), así
// un mismo tema da varias partidas distintas sin repetirse dentro de una
// sesión — ver Diagnostico.jsx (barajarRondas).
//
// Regla de contenido: la pista 1 es siempre genérica (no descarta a nadie).
// Cada pista siguiente debe descartar candidatos reales del tablero — nunca
// vale para dos candidatos igual de bien. Contenido de nivel Primaria/ESO.

const COLORES = ['#7f1d1d', '#92400e', '#166534', '#1d4ed8', '#7c3aed', '#831843', '#134e4a', '#1f2937']

function candidatos(lista) {
  return lista.map((c, i) => ({ ...c, color: COLORES[i % COLORES.length] }))
}

export const TEMAS_DIAGNOSTICO = [
  // ── SISTEMA DIGESTIVO ────────────────────────────────────────────────────
  {
    id: 'sistema-digestivo',
    subject: 'ciencias',
    emoji: '🍽️',
    titulo: { es: 'Sistema Digestivo', en: 'Digestive System', ca: 'Sistema Digestiu' },
    candidatos: candidatos([
      { id: 'estomago', iniciales: 'ES', nombre: { es: 'Estómago', en: 'Stomach', ca: 'Estómac' } },
      { id: 'higado', iniciales: 'HI', nombre: { es: 'Hígado', en: 'Liver', ca: 'Fetge' } },
      { id: 'pancreas', iniciales: 'PA', nombre: { es: 'Páncreas', en: 'Pancreas', ca: 'Pàncrees' } },
      { id: 'esofago', iniciales: 'EF', nombre: { es: 'Esófago', en: 'Esophagus', ca: 'Esòfag' } },
      { id: 'intestino-delgado', iniciales: 'ID', nombre: { es: 'Intestino delgado', en: 'Small intestine', ca: 'Intestí prim' } },
      { id: 'intestino-grueso', iniciales: 'IG', nombre: { es: 'Intestino grueso', en: 'Large intestine', ca: 'Intestí gros' } },
      { id: 'vesicula', iniciales: 'VB', nombre: { es: 'Vesícula biliar', en: 'Gallbladder', ca: 'Vesícula biliar' } },
      { id: 'recto', iniciales: 'RE', nombre: { es: 'Recto', en: 'Rectum', ca: 'Recte' } },
    ]),
    rondas: [
      {
        respuesta: 'estomago',
        pistas: [
          { es: 'Tengo forma de bolsa y estoy justo debajo del diafragma.', en: "I'm shaped like a pouch and sit right below the diaphragm.", ca: 'Tinc forma de bossa i estic just sota el diafragma.' },
          { es: 'Produzco ácido clorhídrico y una enzima llamada pepsina.', en: 'I produce hydrochloric acid and an enzyme called pepsin.', ca: 'Produeixo àcid clorhídric i un enzim anomenat pepsina.' },
          { es: 'Descompongo las proteínas antes de que pasen al intestino delgado.', en: 'I break down proteins before they move on to the small intestine.', ca: "Descompongo les proteïnes abans que passin a l'intestí prim." },
        ],
        dato_extra: { es: 'Su revestimiento interno se renueva cada pocos días para no ser dañado por su propio ácido.', en: "Its inner lining renews itself every few days so it isn't damaged by its own acid.", ca: 'El seu revestiment intern es renova cada pocs dies perquè el seu propi àcid no el faci malbé.' },
      },
      {
        respuesta: 'higado',
        pistas: [
          { es: 'Soy el órgano interno más grande del cuerpo, situado en la parte superior derecha del abdomen.', en: 'I\'m the largest internal organ in the body, located in the upper right side of the abdomen.', ca: "Soc l'òrgan intern més gran del cos, situat a la part superior dreta de l'abdomen." },
          { es: 'Produzco bilis para digerir las grasas.', en: 'I produce bile to digest fats.', ca: 'Produeixo bilis per digerir els greixos.' },
          { es: 'También filtro toxinas de la sangre y almaceno energía en forma de glucógeno.', en: 'I also filter toxins from the blood and store energy as glycogen.', ca: 'També filtro toxines de la sang i emmagatzemo energia en forma de glucogen.' },
        ],
        dato_extra: { es: 'Es uno de los pocos órganos humanos capaces de regenerarse parcialmente aunque se le extirpe una parte.', en: "It's one of the few human organs able to partly regrow even after part of it is removed.", ca: "És un dels pocs òrgans humans capaços de regenerar-se parcialment encara que se n'extirpi una part." },
      },
      {
        respuesta: 'pancreas',
        pistas: [
          { es: 'Estoy detrás del estómago y tengo forma alargada, como una pera aplanada.', en: "I'm behind the stomach and have an elongated shape, like a flattened pear.", ca: "Estic darrere de l'estómac i tinc una forma allargada, com una pera aplanada." },
          { es: 'Produzco enzimas digestivas y también la insulina.', en: 'I produce digestive enzymes and also insulin.', ca: 'Produeixo enzims digestius i també la insulina.' },
          { es: 'Mi jugo ayuda a digerir grasas, proteínas e hidratos de carbono en el intestino delgado.', en: 'My juice helps digest fats, proteins and carbohydrates in the small intestine.', ca: "El meu suc ajuda a digerir greixos, proteïnes i hidrats de carboni a l'intestí prim." },
        ],
        dato_extra: { es: 'Solo una pequeña parte de sus células fabrica insulina; el resto produce enzimas digestivas.', en: "Only a small part of its cells make insulin; the rest produce digestive enzymes.", ca: 'Només una petita part de les seves cèl·lules fabrica insulina; la resta produeix enzims digestius.' },
      },
      {
        respuesta: 'esofago',
        pistas: [
          { es: 'Soy un tubo muscular que conecta la garganta con el estómago.', en: "I'm a muscular tube that connects the throat to the stomach.", ca: 'Soc un tub muscular que connecta la gola amb l\'estómac.' },
          { es: 'Empujo la comida hacia abajo con movimientos ondulantes; yo no la digiero.', en: "I push food downward with wave-like movements; I don't digest it.", ca: 'Empenyo el menjar cap avall amb moviments ondulants; jo no el digereixo.' },
          { es: 'Mido unos 25 centímetros y no fabrico jugos digestivos propios.', en: "I'm about 25 centimetres long and I don't make my own digestive juices.", ca: 'Faig uns 25 centímetres i no fabrico sucs digestius propis.' },
        ],
        dato_extra: { es: 'Cuando tragas, un pequeño colgajo llamado epiglotis cierra la tráquea para que la comida no vaya a los pulmones.', en: "When you swallow, a small flap called the epiglottis closes off the windpipe so food doesn't go into the lungs.", ca: 'Quan empasses, un petit tou anomenat epiglotis tanca la tràquea perquè el menjar no vagi als pulmons.' },
      },
      {
        respuesta: 'intestino-delgado',
        pistas: [
          { es: 'Soy el tramo más largo del tubo digestivo: puedo medir hasta 6 o 7 metros.', en: "I'm the longest stretch of the digestive tract: I can be up to 6 or 7 metres long.", ca: 'Soc el tram més llarg del tub digestiu: puc fer fins a 6 o 7 metres.' },
          { es: 'Aquí se absorbe la mayoría de los nutrientes de los alimentos.', en: 'Most nutrients from food are absorbed here, in me.', ca: "Aquí s'absorbeix la majoria dels nutrients dels aliments." },
          { es: 'Mi interior está cubierto de pliegues y vellosidades para aumentar la superficie de absorción.', en: 'My inside is covered in folds and tiny villi to increase the absorbing surface.', ca: "El meu interior està cobert de plecs i vellositats per augmentar la superfície d'absorció." },
        ],
        dato_extra: { es: 'Si se estirara del todo, su superficie interna sería casi tan grande como una pista de tenis.', en: "If fully unfolded, its inner surface would be almost as large as a tennis court.", ca: 'Si s\'estirés del tot, la seva superfície interna seria gairebé tan gran com una pista de tennis.' },
      },
      {
        respuesta: 'intestino-grueso',
        pistas: [
          { es: 'Voy después del intestino delgado y soy más corto pero más ancho que él.', en: "I come after the small intestine, and I'm shorter but wider than it.", ca: "Vaig després de l'intestí prim i soc més curt però més ample que ell." },
          { es: 'Aquí se absorbe principalmente agua y se forman las heces.', en: 'Mostly water is absorbed here, and stool is formed.', ca: "Aquí s'absorbeix principalment aigua i s'hi formen les femtes." },
          { es: 'Albergo bacterias beneficiosas que ayudan a fabricar algunas vitaminas.', en: 'I host helpful bacteria that help make some vitamins.', ca: 'Allotjo bacteris beneficiosos que ajuden a fabricar algunes vitamines.' },
        ],
        dato_extra: { es: 'Alberga billones de bacterias que forman parte de la microbiota intestinal.', en: 'It hosts trillions of bacteria that make up the gut microbiota.', ca: 'Allotja bilions de bacteris que formen part de la microbiota intestinal.' },
      },
      {
        respuesta: 'vesicula',
        pistas: [
          { es: 'Soy un pequeño saco en forma de pera situado bajo el hígado.', en: "I'm a small pear-shaped sac located under the liver.", ca: 'Soc un petit sac en forma de pera situat sota el fetge.' },
          { es: 'Almaceno y concentro la bilis que produce el hígado; yo no la fabrico.', en: "I store and concentrate the bile the liver produces; I don't make it myself.", ca: "Emmagatzemo i concentro la bilis que produeix el fetge; jo no la fabrico." },
          { es: 'Me contraigo al comer grasas para liberar la bilis hacia el intestino delgado.', en: 'I contract when you eat fatty food to release bile into the small intestine.', ca: "Em contrec quan menges greixos per alliberar la bilis cap a l'intestí prim." },
        ],
        dato_extra: { es: 'Se puede vivir perfectamente sin ella si hay que extirparla; el hígado sigue produciendo bilis igualmente.', en: 'You can live perfectly well without it if it needs removing; the liver keeps producing bile anyway.', ca: 'Es pot viure perfectament sense ella si cal extirpar-la; el fetge continua produint bilis igualment.' },
      },
      {
        respuesta: 'recto',
        pistas: [
          { es: 'Soy el tramo final del tubo digestivo, justo antes del ano.', en: "I'm the final stretch of the digestive tract, right before the anus.", ca: "Soc el tram final del tub digestiu, just abans de l'anus." },
          { es: 'Almaceno las heces hasta el momento de la defecación.', en: 'I store stool until it\'s time to go to the bathroom.', ca: 'Emmagatzemo les femtes fins al moment de la defecació.' },
          { es: 'Mis paredes se estiran y avisan al cerebro cuando toca ir al baño.', en: "My walls stretch and signal the brain when it's time to go.", ca: "Les meves parets s'estiren i avisen el cervell quan toca anar al bany." },
        ],
        dato_extra: { es: 'Puede estirarse para almacenar heces durante varias horas antes de que sientas la necesidad urgente de ir al baño.', en: 'It can stretch to hold stool for several hours before you feel the urgent need to go.', ca: "Pot estirar-se per emmagatzemar femtes durant diverses hores abans que sentis la necessitat urgent d'anar al bany." },
      },
    ],
  },

  // ── SISTEMA NERVIOSO Y SENSORIAL ─────────────────────────────────────────
  {
    id: 'sistema-nervioso',
    subject: 'ciencias',
    emoji: '🧠',
    titulo: { es: 'Sistema Nervioso y Sensorial', en: 'Nervous & Sensory System', ca: 'Sistema Nerviós i Sensorial' },
    candidatos: candidatos([
      { id: 'cerebro', iniciales: 'CE', nombre: { es: 'Cerebro', en: 'Brain', ca: 'Cervell' } },
      { id: 'cerebelo', iniciales: 'CB', nombre: { es: 'Cerebelo', en: 'Cerebellum', ca: 'Cerebel' } },
      { id: 'medula-espinal', iniciales: 'ME', nombre: { es: 'Médula espinal', en: 'Spinal cord', ca: 'Medul·la espinal' } },
      { id: 'nervio-optico', iniciales: 'NO', nombre: { es: 'Nervio óptico', en: 'Optic nerve', ca: 'Nervi òptic' } },
      { id: 'retina', iniciales: 'RT', nombre: { es: 'Retina', en: 'Retina', ca: 'Retina' } },
      { id: 'oido-interno', iniciales: 'OI', nombre: { es: 'Oído interno', en: 'Inner ear', ca: 'Oïda interna' } },
      { id: 'piel-receptores', iniciales: 'PI', nombre: { es: 'Piel (receptores táctiles)', en: 'Skin (touch receptors)', ca: 'Pell (receptors tàctils)' } },
      { id: 'neurona', iniciales: 'NU', nombre: { es: 'Neurona', en: 'Neuron', ca: 'Neurona' } },
    ]),
    rondas: [
      {
        respuesta: 'cerebro',
        pistas: [
          { es: 'Soy el órgano más grande y complejo del sistema nervioso, y ocupo casi toda la cavidad craneal.', en: 'I\'m the largest and most complex organ of the nervous system, filling almost the whole skull cavity.', ca: "Soc l'òrgan més gran i complex del sistema nerviós, i ocupo gairebé tota la cavitat cranial." },
          { es: 'Me divido en dos hemisferios y controlo el pensamiento, el lenguaje y las decisiones voluntarias.', en: 'I\'m divided into two hemispheres and I control thought, language and voluntary decisions.', ca: 'Em divideixo en dos hemisferis i controlo el pensament, el llenguatge i les decisions voluntàries.' },
          { es: 'Mi corteza arrugada aumenta la superficie disponible para procesar información.', en: 'My wrinkled outer layer increases the surface available for processing information.', ca: 'La meva escorça arrugada augmenta la superfície disponible per processar informació.' },
        ],
        dato_extra: { es: 'Consume cerca del 20% de la energía de todo el cuerpo aunque solo pesa alrededor de un 2% de tu peso.', en: "It uses about 20% of the whole body's energy even though it only weighs around 2% of your body weight.", ca: "Consumeix prop del 20% de l'energia de tot el cos tot i que només pesa al voltant d'un 2% del teu pes." },
      },
      {
        respuesta: 'cerebelo',
        pistas: [
          { es: 'Estoy en la parte posterior e inferior del cráneo, debajo del cerebro.', en: "I'm at the back and bottom of the skull, below the brain.", ca: 'Soc a la part posterior i inferior del crani, sota el cervell.' },
          { es: 'Coordino el equilibrio y los movimientos precisos del cuerpo, aunque no inicio las decisiones voluntarias.', en: "I coordinate balance and precise body movements, though I don't initiate voluntary decisions.", ca: 'Coordino l\'equilibri i els moviments precisos del cos, encara que no inicio les decisions voluntàries.' },
          { es: 'Si me dañan, una persona puede tener problemas para caminar en línea recta aunque sus músculos funcionen bien.', en: "If I'm damaged, a person may struggle to walk in a straight line even if their muscles work fine.", ca: 'Si em fan mal, una persona pot tenir problemes per caminar en línia recta encara que els músculs li funcionin bé.' },
        ],
        dato_extra: { es: 'Contiene más neuronas que el resto del cerebro junto, a pesar de ser mucho más pequeño.', en: 'It contains more neurons than the rest of the brain combined, despite being much smaller.', ca: 'Conté més neurones que la resta del cervell junt, tot i ser molt més petit.' },
      },
      {
        respuesta: 'medula-espinal',
        pistas: [
          { es: 'Soy un cordón largo protegido por la columna vertebral; no estoy dentro del cráneo.', en: "I'm a long cord protected by the spine; I'm not inside the skull.", ca: 'Soc un cordó llarg protegit per la columna vertebral; no soc dins del crani.' },
          { es: 'Conecto el cerebro con el resto del cuerpo y gestiono reflejos rápidos, como retirar la mano de algo caliente.', en: 'I connect the brain with the rest of the body and manage quick reflexes, like pulling a hand away from something hot.', ca: "Connecto el cervell amb la resta del cos i gestiono reflexos ràpids, com retirar la mà d'una cosa calenta." },
          { es: 'Una lesión en mí puede causar parálisis por debajo del punto dañado.', en: 'An injury to me can cause paralysis below the damaged point.', ca: 'Una lesió en mi pot causar paràlisi per sota del punt danyat.' },
        ],
        dato_extra: { es: 'Los reflejos que gestiono, como retirar la mano del fuego, ocurren antes de que el cerebro se entere del dolor.', en: 'The reflexes I manage, like pulling a hand away from fire, happen before the brain even registers the pain.', ca: "Els reflexos que gestiono, com retirar la mà del foc, passen abans que el cervell s'assabenti del dolor." },
      },
      {
        respuesta: 'nervio-optico',
        pistas: [
          { es: 'Soy un cable de fibras nerviosas que sale de la parte posterior del ojo.', en: "I'm a cable of nerve fibres that comes out of the back of the eye.", ca: "Soc un cable de fibres nervioses que surt de la part posterior de l'ull." },
          { es: 'Llevo la información visual ya captada por el ojo hasta el cerebro; yo no la capto directamente.', en: "I carry the visual information already captured by the eye to the brain; I don't capture it myself.", ca: "Porto la informació visual ja captada per l'ull fins al cervell; jo no la capto directament." },
          { es: 'En el punto donde salgo del ojo no hay receptores de luz: es el llamado punto ciego.', en: 'Where I leave the eye there are no light receptors: it\'s called the blind spot.', ca: "Al punt on surto de l'ull no hi ha receptors de llum: és l'anomenat punt cec." },
        ],
        dato_extra: { es: 'Cada uno de tus ojos tiene un punto ciego, pero no lo notas porque el cerebro rellena esa zona con información inventada.', en: "Each of your eyes has a blind spot, but you don't notice it because the brain fills that area in with made-up information.", ca: "Cada un dels teus ulls té un punt cec, però no te n'adones perquè el cervell omple aquella zona amb informació inventada." },
      },
      {
        respuesta: 'retina',
        pistas: [
          { es: 'Soy una capa fina que recubre el interior del fondo del ojo.', en: "I'm a thin layer lining the inside of the back of the eye.", ca: "Soc una capa fina que recobreix l'interior del fons de l'ull." },
          { es: 'Contengo los receptores de luz, conos y bastones, que convierten la luz en señales nerviosas.', en: 'I contain the light receptors, cones and rods, that turn light into nerve signals.', ca: 'Continc els receptors de llum, cons i bastons, que converteixen la llum en senyals nervioses.' },
          { es: 'Los bastones me permiten ver con poca luz, y los conos, distinguir los colores.', en: 'Rods let me see in low light, and cones let me tell colours apart.', ca: 'Els bastons em permeten veure amb poca llum, i els cons, distingir els colors.' },
        ],
        dato_extra: { es: 'Tiene más de 100 millones de receptores de luz, aunque solo unos pocos millones son conos para el color.', en: 'It has more than 100 million light receptors, though only a few million are colour-sensing cones.', ca: 'Té més de 100 milions de receptors de llum, tot i que només uns quants milions són cons per al color.' },
      },
      {
        respuesta: 'oido-interno',
        pistas: [
          { es: 'Soy una estructura llena de líquido escondida dentro del hueso del cráneo; no se ve desde fuera.', en: "I'm a fluid-filled structure hidden inside the skull bone; you can't see me from outside.", ca: "Soc una estructura plena de líquid amagada dins de l'os del crani; no es veu des de fora." },
          { es: 'Contengo la cóclea, que transforma las vibraciones del sonido en señales nerviosas, y el sistema del equilibrio.', en: 'I contain the cochlea, which turns sound vibrations into nerve signals, and the balance system.', ca: 'Continc la còclea, que transforma les vibracions del so en senyals nervioses, i el sistema de l\'equilibri.' },
          { es: 'Gracias a mí también sabes si tu cabeza está inclinada, incluso con los ojos cerrados.', en: 'Thanks to me you also know if your head is tilted, even with your eyes closed.', ca: 'Gràcies a mi també saps si el teu cap està inclinat, fins i tot amb els ulls tancats.' },
        ],
        dato_extra: { es: 'El mismo líquido que usas para el equilibrio es el que, si se mueve de golpe, te produce mareo o vértigo.', en: 'The same fluid you use for balance is what causes dizziness or vertigo if it suddenly sloshes around.', ca: "El mateix líquid que fas servir per a l'equilibri és el que, si es mou de cop, et provoca marejos o vertigen." },
      },
      {
        respuesta: 'piel-receptores',
        pistas: [
          { es: 'Soy el órgano sensorial más extenso del cuerpo: te cubro por completo.', en: "I'm the largest sensory organ in the body: I cover you completely.", ca: "Soc l'òrgan sensorial més extens del cos: et cobreixo per complet." },
          { es: 'Tengo receptores especializados que detectan el tacto, la presión, el dolor y la temperatura.', en: 'I have specialised receptors that detect touch, pressure, pain and temperature.', ca: 'Tinc receptors especialitzats que detecten el tacte, la pressió, el dolor i la temperatura.' },
          { es: 'Mis yemas de los dedos son una de las zonas con mayor densidad de receptores táctiles.', en: 'My fingertips are one of the areas with the highest density of touch receptors.', ca: 'Els meus tous dels dits són una de les zones amb més densitat de receptors tàctils.' },
        ],
        dato_extra: { es: 'Tienes distinta densidad de receptores según la zona: las yemas de los dedos tienen muchos más que la espalda.', en: 'You have a different density of receptors depending on the area: fingertips have far more than the back.', ca: "Tens diferent densitat de receptors segons la zona: els tous dels dits en tenen molts més que l'esquena." },
      },
      {
        respuesta: 'neurona',
        pistas: [
          { es: 'Soy la unidad básica y microscópica del sistema nervioso, no un órgano completo.', en: "I'm the basic, microscopic unit of the nervous system, not a whole organ.", ca: 'Soc la unitat bàsica i microscòpica del sistema nerviós, no un òrgan complet.' },
          { es: 'Tengo un cuerpo celular, ramificaciones llamadas dendritas y una prolongación llamada axón.', en: 'I have a cell body, branches called dendrites and an extension called an axon.', ca: 'Tinc un cos cel·lular, ramificacions anomenades dendrites i una prolongació anomenada axó.' },
          { es: 'Me comunico con otras como yo mediante impulsos eléctricos y sustancias químicas, a través de las sinapsis.', en: 'I communicate with others like me through electrical impulses and chemicals, via synapses.', ca: 'Em comunico amb altres com jo mitjançant impulsos elèctrics i substàncies químiques, a través de les sinapsis.' },
        ],
        dato_extra: { es: 'Algunas de tus neuronas más largas, como las de la pierna, pueden medir más de un metro de longitud.', en: 'Some of your longest neurons, like those in the leg, can be over a metre long.', ca: 'Algunes de les teves neurones més llargues, com les de la cama, poden fer més d\'un metre de longitud.' },
      },
    ],
  },

  // ── ROCAS Y MINERALES ────────────────────────────────────────────────────
  {
    id: 'rocas-minerales',
    subject: 'ciencias',
    emoji: '🪨',
    titulo: { es: 'Rocas y Minerales', en: 'Rocks & Minerals', ca: 'Roques i Minerals' },
    candidatos: candidatos([
      { id: 'granito', iniciales: 'GR', nombre: { es: 'Granito', en: 'Granite', ca: 'Granit' } },
      { id: 'marmol', iniciales: 'MA', nombre: { es: 'Mármol', en: 'Marble', ca: 'Marbre' } },
      { id: 'caliza', iniciales: 'CA', nombre: { es: 'Caliza', en: 'Limestone', ca: 'Calcària' } },
      { id: 'basalto', iniciales: 'BA', nombre: { es: 'Basalto', en: 'Basalt', ca: 'Basalt' } },
      { id: 'cuarzo', iniciales: 'CU', nombre: { es: 'Cuarzo', en: 'Quartz', ca: 'Quars' } },
      { id: 'pizarra', iniciales: 'PZ', nombre: { es: 'Pizarra', en: 'Slate', ca: 'Pissarra' } },
      { id: 'arenisca', iniciales: 'AR', nombre: { es: 'Arenisca', en: 'Sandstone', ca: 'Gres' } },
      { id: 'obsidiana', iniciales: 'OB', nombre: { es: 'Obsidiana', en: 'Obsidian', ca: 'Obsidiana' } },
    ]),
    rondas: [
      {
        respuesta: 'granito',
        pistas: [
          { es: 'Me formo por el enfriamiento muy lento del magma en el interior de la Tierra, por eso tengo cristales grandes y visibles a simple vista.', en: 'I form from magma cooling very slowly deep inside the Earth, which is why I have large crystals you can see with the naked eye.', ca: "Em formo pel refredament molt lent del magma a l'interior de la Terra, per això tinc cristalls grans i visibles a simple vista." },
          { es: 'Estoy compuesto principalmente por cuarzo, feldespato y mica, lo que me da un aspecto moteado en blanco, gris, rosa y negro.', en: 'I\'m made mainly of quartz, feldspar and mica, which gives me a speckled look in white, grey, pink and black.', ca: "Estic compost principalment per quars, feldespat i mica, cosa que em dona un aspecte pigallat en blanc, gris, rosa i negre." },
          { es: 'Soy muy resistente y se me usa mucho en encimeras de cocina y en la construcción.', en: "I'm very tough, and I'm widely used for kitchen countertops and in construction.", ca: "Soc molt resistent i se'm fa servir molt en taulells de cuina i en la construcció." },
        ],
        dato_extra: { es: 'Soy una de las rocas más comunes en la corteza continental terrestre y formo buena parte de las montañas.', en: "I'm one of the most common rocks in the Earth's continental crust and I make up much of many mountains.", ca: "Soc una de les roques més comunes a l'escorça continental terrestre i formo bona part de les muntanyes." },
      },
      {
        respuesta: 'basalto',
        pistas: [
          { es: 'También me formo por enfriamiento del magma, pero en la superficie y muy rápido, así que mis cristales son diminutos.', en: 'I also form from cooling magma, but at the surface and very fast, so my crystals are tiny.', ca: 'També em formo pel refredament del magma, però a la superfície i molt ràpid, així que els meus cristalls són diminuts.' },
          { es: 'Soy de color oscuro, casi negro o gris verdoso, y formo la mayor parte del fondo oceánico.', en: "I'm dark coloured, almost black or greenish grey, and I make up most of the ocean floor.", ca: 'Soc de color fosc, gairebé negre o gris verdós, i formo la major part del fons oceànic.' },
          { es: 'Cuando me enfrío en columnas muy regulares puedo formar paisajes como la Calzada del Gigante, en Irlanda.', en: "When I cool into very regular columns I can form landscapes like the Giant's Causeway in Ireland.", ca: 'Quan em refredo en columnes molt regulars puc formar paisatges com la Calçada del Gegant, a Irlanda.' },
        ],
        dato_extra: { es: 'La Luna y Marte también tienen basalto en su superficie, formado de manera muy parecida al de la Tierra.', en: "The Moon and Mars also have basalt on their surface, formed in a very similar way to Earth's.", ca: "La Lluna i Mart també tenen basalt a la seva superfície, format d'una manera molt semblant al de la Terra." },
      },
      {
        respuesta: 'obsidiana',
        pistas: [
          { es: 'Me formo por un enfriamiento tan rápido de la lava que no me da tiempo a formar cristales.', en: "I form when lava cools so fast that I don't have time to form crystals.", ca: 'Em formo per un refredament tan ràpid de la lava que no em dona temps a formar cristalls.' },
          { es: 'Tengo aspecto de vidrio oscuro y brillante, y una fractura curva y cortante.', en: 'I look like dark, glossy glass, and I break with a sharp, curved edge.', ca: 'Tinc aspecte de vidre fosc i brillant, i una fractura corba i tallant.' },
          { es: 'Los pueblos prehistóricos me usaban para fabricar puntas de flecha y cuchillos muy afilados.', en: 'Prehistoric peoples used me to make arrowheads and very sharp knives.', ca: "Els pobles prehistòrics em feien servir per fabricar puntes de fletxa i ganivets molt esmolats." },
        ],
        dato_extra: { es: 'A pesar de parecer una roca, técnicamente soy un vidrio volcánico porque me enfrié demasiado rápido para cristalizar.', en: "Even though I look like a rock, I'm technically volcanic glass because I cooled too fast to crystallise.", ca: "Tot i semblar una roca, tècnicament soc un vidre volcànic perquè em vaig refredar massa ràpid per cristal·litzar." },
      },
      {
        respuesta: 'marmol',
        pistas: [
          { es: 'Nazco cuando otra roca, la caliza, se somete a mucho calor y presión bajo tierra: soy una roca metamórfica.', en: "I'm born when another rock, limestone, is subjected to a lot of heat and pressure underground: I'm a metamorphic rock.", ca: 'Neixo quan una altra roca, la calcària, se sotmet a molta calor i pressió sota terra: soc una roca metamòrfica.' },
          { es: 'Mis cristales de calcita se reorganizan y suelo tener vetas de colores que recorren mi superficie.', en: 'My calcite crystals rearrange themselves, and I usually have colourful veins running across my surface.', ca: 'Els meus cristalls de calcita es reorganitzen i solc tenir vetes de colors que recorren la meva superfície.' },
          { es: 'Los escultores me han usado durante siglos porque se me puede pulir hasta dejarme muy liso y brillante.', en: "Sculptors have used me for centuries because I can be polished until I'm very smooth and shiny.", ca: "Els escultors m'han fet servir durant segles perquè se'm pot polir fins a deixar-me molt llis i brillant." },
        ],
        dato_extra: { es: 'El famoso David de Miguel Ángel está esculpido en un solo bloque de mármol de Carrara.', en: "Michelangelo's famous David is carved from a single block of Carrara marble.", ca: 'El famós David de Miquel Àngel està esculpit en un sol bloc de marbre de Carrara.' },
      },
      {
        respuesta: 'pizarra',
        pistas: [
          { es: 'También nazco por presión y calor sobre otra roca, en mi caso sobre arcilla, así que también soy metamórfica.', en: "I'm also born from pressure and heat on another rock, in my case on clay, so I'm metamorphic too.", ca: 'També neixo per pressió i calor sobre una altra roca, en el meu cas sobre argila, així que també soc metamòrfica.' },
          { es: 'Me parto fácilmente en láminas planas y delgadas, siguiendo los planos por los que crecieron mis minerales.', en: 'I split easily into thin, flat sheets, following the planes along which my minerals grew.', ca: 'Em parteixo fàcilment en làmines planes i primes, seguint els plans pels quals van créixer els meus minerals.' },
          { es: 'Por eso se me ha usado tradicionalmente para hacer tejados y para las antiguas pizarras de escribir en la escuela.', en: "That's why I've traditionally been used for roof tiles and for the old writing slates used in schools.", ca: "Per això se m'ha fet servir tradicionalment per fer teulades i per a les antigues pissarres d'escriure a l'escola." },
        ],
        dato_extra: { es: 'Antiguamente los estudiantes escribían con tiza sobre pizarras porque la superficie es lisa y se puede borrar.', en: 'In the past students used to write with chalk on slate boards because the surface is smooth and can be wiped clean.', ca: 'Antigament els estudiants escrivien amb guix sobre pissarres perquè la superfície és llisa i es pot esborrar.' },
      },
      {
        respuesta: 'caliza',
        pistas: [
          { es: 'Me formo en el fondo del mar a partir de restos de conchas y esqueletos de seres marinos acumulados durante millones de años.', en: 'I form on the seafloor from the remains of shells and skeletons of marine creatures, piled up over millions of years.', ca: "Em formo al fons del mar a partir de restes de closques i esquelets d'éssers marins acumulats durant milions d'anys." },
          { es: 'Estoy compuesta principalmente por carbonato cálcico, y reacciono burbujeando si me echan un ácido como el vinagre.', en: "I'm made mainly of calcium carbonate, and I fizz if an acid like vinegar is poured on me.", ca: "Estic composta principalment per carbonat càlcic, i reacciono fent bombolles si m'hi tiren un àcid com el vinagre." },
          { es: 'El agua de lluvia puede disolverme poco a poco, y así se forman cuevas y estalactitas.', en: 'Rainwater can slowly dissolve me, forming caves and stalactites over time.', ca: "L'aigua de pluja em pot dissoldre a poc a poc, i així es formen coves i estalactites." },
        ],
        dato_extra: { es: 'Los famosos acantilados blancos de Dover, en Inglaterra, están formados casi enteramente por caliza.', en: 'The famous white cliffs of Dover, in England, are made almost entirely of limestone.', ca: 'Els famosos penya-segats blancs de Dover, a Anglaterra, estan formats gairebé íntegrament per calcària.' },
      },
      {
        respuesta: 'arenisca',
        pistas: [
          { es: 'Me formo cuando granos de arena se compactan y cementan juntos durante mucho tiempo.', en: 'I form when grains of sand are compacted and cemented together over a long time.', ca: 'Em formo quan grans de sorra es compacten i cimenten junts durant molt de temps.' },
          { es: 'Se pueden ver mis granos a simple vista, y mi color varía entre el amarillo, el rojo y el marrón según lo que los cemente.', en: "My grains can be seen with the naked eye, and my colour ranges from yellow to red to brown depending on what cements them.", ca: 'Es poden veure els meus grans a simple vista, i el meu color varia entre el groc, el vermell i el marró segons el que els cimenta.' },
          { es: 'Monumentos como muchos castillos y catedrales antiguas están construidos conmigo, porque soy fácil de tallar.', en: "Monuments like many old castles and cathedrals are built with me, because I'm easy to carve.", ca: "Monuments com molts castells i catedrals antigues estan construïts amb mi, perquè soc fàcil de tallar." },
        ],
        dato_extra: { es: 'El color rojizo de muchas areniscas se debe a pequeñas cantidades de óxido de hierro entre sus granos.', en: "The reddish colour of many sandstones comes from small amounts of iron oxide between their grains.", ca: 'El color rogenc de molts gresos es deu a petites quantitats d\'òxid de ferro entre els seus grans.' },
      },
      {
        respuesta: 'cuarzo',
        pistas: [
          { es: 'A diferencia de las demás, no soy una roca formada por varios minerales, sino un mineral yo solo.', en: "Unlike the others, I'm not a rock made of several minerals, but a single mineral on my own.", ca: 'A diferència de les altres, no soc una roca formada per diversos minerals, sinó un mineral jo sol.' },
          { es: 'Estoy formado por sílice y suelo aparecer en forma de cristales alargados y de seis caras.', en: 'I\'m made of silica and I usually appear as elongated, six-sided crystals.', ca: 'Estic format per sílice i solc aparèixer en forma de cristalls allargats i de sis cares.' },
          { es: 'Soy uno de los minerales más duros y comunes de la corteza terrestre, y en variedades como el cuarzo rosa o la amatista se me usa en joyería.', en: "I'm one of the hardest and most common minerals in the Earth's crust, and in varieties like rose quartz or amethyst I'm used in jewellery.", ca: "Soc un dels minerals més durs i comuns de l'escorça terrestre, i en varietats com el quars rosa o l'ametista se'm fa servir en joieria." },
        ],
        dato_extra: { es: 'Al aplicarme presión genero electricidad, un efecto que se usa para mantener la hora exacta en muchos relojes.', en: 'When pressure is applied to me I generate electricity, an effect used to keep exact time in many clocks.', ca: "Quan se m'aplica pressió genero electricitat, un efecte que es fa servir per mantenir l'hora exacta en molts rellotges." },
      },
    ],
  },

  // ── ESTADOS Y CAMBIOS DE LA MATERIA ──────────────────────────────────────
  {
    id: 'estados-materia',
    subject: 'ciencias',
    emoji: '🧪',
    titulo: { es: 'Estados y Cambios de la Materia', en: 'States & Changes of Matter', ca: 'Estats i Canvis de la Matèria' },
    candidatos: candidatos([
      { id: 'solido', iniciales: 'SO', nombre: { es: 'Sólido', en: 'Solid', ca: 'Sòlid' } },
      { id: 'liquido', iniciales: 'LI', nombre: { es: 'Líquido', en: 'Liquid', ca: 'Líquid' } },
      { id: 'gas', iniciales: 'GA', nombre: { es: 'Gas', en: 'Gas', ca: 'Gas' } },
      { id: 'plasma', iniciales: 'PL', nombre: { es: 'Plasma', en: 'Plasma', ca: 'Plasma' } },
      { id: 'fusion', iniciales: 'FU', nombre: { es: 'Fusión', en: 'Melting', ca: 'Fusió' } },
      { id: 'evaporacion', iniciales: 'EV', nombre: { es: 'Evaporación', en: 'Evaporation', ca: 'Evaporació' } },
      { id: 'sublimacion', iniciales: 'SU', nombre: { es: 'Sublimación', en: 'Sublimation', ca: 'Sublimació' } },
      { id: 'condensacion', iniciales: 'CO', nombre: { es: 'Condensación', en: 'Condensation', ca: 'Condensació' } },
    ]),
    rondas: [
      {
        respuesta: 'solido',
        pistas: [
          { es: 'Mis partículas están muy juntas y ordenadas, y apenas se mueven de su sitio.', en: 'My particles are packed closely together and ordered, and barely move from their place.', ca: 'Les meves partícules estan molt juntes i ordenades, i tot just es mouen del seu lloc.' },
          { es: 'Tengo forma y volumen propios y fijos: no me adapto al recipiente que me contiene.', en: "I have my own fixed shape and volume: I don't adapt to the container that holds me.", ca: "Tinc forma i volum propis i fixos: no m'adapto al recipient que em conté." },
          { es: 'Ejemplos de mí son el hielo, una piedra o un trozo de madera.', en: 'Examples of me are ice, a rock or a piece of wood.', ca: 'Exemples de mi són el gel, una pedra o un tros de fusta.' },
        ],
        dato_extra: { es: 'Algunos sólidos, como el vidrio, en realidad no tienen sus partículas tan ordenadas como un sólido cristalino típico.', en: "Some solids, like glass, don't actually have their particles as ordered as a typical crystalline solid.", ca: "Alguns sòlids, com el vidre, en realitat no tenen les seves partícules tan ordenades com un sòlid cristal·lí típic." },
      },
      {
        respuesta: 'liquido',
        pistas: [
          { es: 'Mis partículas están juntas pero pueden moverse y deslizarse unas sobre otras.', en: 'My particles are close together but can move and slide past one another.', ca: 'Les meves partícules estan juntes però es poden moure i lliscar unes sobre les altres.' },
          { es: 'Tengo un volumen fijo pero no forma propia: adopto la forma del recipiente que me contiene.', en: 'I have a fixed volume but no shape of my own: I take the shape of the container that holds me.', ca: 'Tinc un volum fix però no forma pròpia: adopto la forma del recipient que em conté.' },
          { es: 'Ejemplos de mí son el agua, el aceite o la leche a temperatura ambiente.', en: 'Examples of me are water, oil or milk at room temperature.', ca: "Exemples de mi són l'aigua, l'oli o la llet a temperatura ambient." },
        ],
        dato_extra: { es: 'El agua es una de las pocas sustancias que, en su forma sólida, el hielo, ocupa más espacio que en forma líquida.', en: "Water is one of the few substances whose solid form, ice, takes up more space than its liquid form.", ca: "L'aigua és una de les poques substàncies que, en la seva forma sòlida, el gel, ocupa més espai que en forma líquida." },
      },
      {
        respuesta: 'gas',
        pistas: [
          { es: 'Mis partículas están muy separadas entre sí y se mueven libremente a gran velocidad.', en: 'My particles are spread far apart and move freely at high speed.', ca: 'Les meves partícules estan molt separades entre si i es mouen lliurement a gran velocitat.' },
          { es: 'No tengo ni forma ni volumen fijos: ocupo todo el espacio disponible del recipiente.', en: 'I have neither a fixed shape nor a fixed volume: I fill all the available space in the container.', ca: 'No tinc ni forma ni volum fixos: ocupo tot l\'espai disponible del recipient.' },
          { es: 'Ejemplos de mí son el aire que respiras o el vapor que sale de una olla hirviendo.', en: 'Examples of me are the air you breathe or the steam coming off a boiling pot.', ca: "Exemples de mi són l'aire que respires o el vapor que surt d'una olla bullint." },
        ],
        dato_extra: { es: 'El olor que asocias al gas butano o propano en realidad se añade a propósito, porque de forma natural no huelen.', en: "The smell you associate with butane or propane gas is actually added on purpose, since naturally they have no odour.", ca: "L'olor que associes al gas butà o propà en realitat s'hi afegeix a propòsit, perquè de forma natural no fan olor." },
      },
      {
        respuesta: 'plasma',
        pistas: [
          { es: 'Soy un cuarto estado de la materia, menos conocido que los otros tres.', en: "I'm a fourth state of matter, less well known than the other three.", ca: 'Soc un quart estat de la matèria, menys conegut que els altres tres.' },
          { es: 'Me formo cuando un gas recibe tanta energía que sus átomos pierden electrones, así que estoy formado por partículas cargadas eléctricamente.', en: "I form when a gas gets so much energy that its atoms lose electrons, so I'm made of electrically charged particles.", ca: "Em formo quan un gas rep tanta energia que els seus àtoms perden electrons, així que estic format per partícules carregades elèctricament." },
          { es: 'Puedes verme en un rayo, en una aurora boreal o en el interior de las estrellas, como el Sol.', en: 'You can see me in a lightning bolt, in the northern lights, or inside stars like the Sun.', ca: 'Em pots veure en un llamp, en una aurora boreal o a l\'interior de les estrelles, com el Sol.' },
        ],
        dato_extra: { es: 'Se calcula que más del 99% de la materia visible del universo está en estado de plasma, principalmente en las estrellas.', en: "It's estimated that over 99% of the visible matter in the universe is in the plasma state, mainly inside stars.", ca: "Es calcula que més del 99% de la matèria visible de l'univers és en estat de plasma, principalment a les estrelles." },
      },
      {
        respuesta: 'fusion',
        pistas: [
          { es: 'Soy el paso de un estado sólido a un estado líquido.', en: "I'm the change from a solid state to a liquid state.", ca: "Soc el pas d'un estat sòlid a un estat líquid." },
          { es: 'Ocurro cuando una sustancia sólida recibe calor y alcanza su punto de fusión, por ejemplo 0°C en el agua.', en: 'I happen when a solid substance gets heat and reaches its melting point, for example 0°C for water.', ca: 'Passo quan una substància sòlida rep calor i arriba al seu punt de fusió, per exemple 0°C en l\'aigua.' },
          { es: 'Es lo que le pasa a un cubito de hielo cuando lo sacas del congelador y lo dejas a temperatura ambiente.', en: "It's what happens to an ice cube when you take it out of the freezer and leave it at room temperature.", ca: "És el que li passa a un cubet de gel quan el treus del congelador i el deixes a temperatura ambient." },
        ],
        dato_extra: { es: "En física, 'fusión' también se usa para cuando dos núcleos atómicos se unen, algo totalmente distinto a este cambio de estado.", en: "In physics, 'fusion' is also used for when two atomic nuclei join together, something completely different from this change of state.", ca: "En física, 'fusió' també es fa servir per quan dos nuclis atòmics s'uneixen, una cosa totalment diferent d'aquest canvi d'estat." },
      },
      {
        respuesta: 'evaporacion',
        pistas: [
          { es: 'Soy el paso de un estado líquido a un estado gaseoso.', en: "I'm the change from a liquid state to a gaseous state.", ca: "Soc el pas d'un estat líquid a un estat gasós." },
          { es: 'Ocurro de forma lenta y solo en la superficie del líquido, incluso sin llegar a la temperatura de ebullición.', en: 'I happen slowly and only at the surface of the liquid, even without reaching boiling temperature.', ca: "Passo de manera lenta i només a la superfície del líquid, fins i tot sense arribar a la temperatura d'ebullició." },
          { es: 'Es lo que hace que un charco de agua desaparezca poco a poco con el sol, aunque nunca haya llegado a hervir.', en: "It's what makes a puddle of water slowly disappear in the sun, even though it never boiled.", ca: "És el que fa que un bassal d'aigua desaparegui a poc a poc amb el sol, encara que mai hagi arribat a bullir." },
        ],
        dato_extra: { es: 'El sudor te refresca precisamente porque, al evaporarse sobre tu piel, absorbe calor de tu cuerpo.', en: 'Sweat cools you down precisely because, as it evaporates on your skin, it absorbs heat from your body.', ca: 'La suor et refresca precisament perquè, en evaporar-se sobre la teva pell, absorbeix calor del teu cos.' },
      },
      {
        respuesta: 'sublimacion',
        pistas: [
          { es: 'Soy un cambio de estado, pero me salto el paso intermedio: voy directamente de sólido a gas, sin pasar por líquido.', en: "I'm a change of state, but I skip the middle step: I go directly from solid to gas, without becoming liquid.", ca: 'Soc un canvi d\'estat, però em salto el pas intermedi: vaig directament de sòlid a gas, sense passar per líquid.' },
          { es: 'Solo unas pocas sustancias hacen esto en condiciones normales, como el hielo seco o el yodo.', en: 'Only a few substances do this under normal conditions, like dry ice or iodine.', ca: 'Només unes poques substàncies fan això en condicions normals, com el gel sec o el iode.' },
          { es: "Por eso el hielo seco 'humea' sin dejar charco de agua a su alrededor: se convierte directamente en gas.", en: "That's why dry ice 'smokes' without leaving a puddle around it: it turns directly into gas.", ca: "Per això el gel sec 'fumeja' sense deixar cap bassal d'aigua al voltant: es converteix directament en gas." },
        ],
        dato_extra: { es: 'La nieve o el hielo también pueden sublimar poco a poco incluso sin llegar a los 0°C, sobre todo si hace viento y hay poca humedad.', en: "Snow or ice can also slowly sublimate even without reaching 0°C, especially when it's windy and the air is dry.", ca: 'La neu o el gel també poden sublimar a poc a poc fins i tot sense arribar als 0°C, sobretot si fa vent i hi ha poca humitat.' },
      },
      {
        respuesta: 'condensacion',
        pistas: [
          { es: 'Soy el paso contrario a la evaporación: de un estado gaseoso a un estado líquido.', en: "I'm the opposite of evaporation: from a gaseous state to a liquid state.", ca: "Soc el pas contrari a l'evaporació: d'un estat gasós a un estat líquid." },
          { es: 'Ocurro cuando un gas pierde energía, se enfría, al entrar en contacto con una superficie fría.', en: 'I happen when a gas loses energy, cools down, on contact with a cold surface.', ca: 'Passo quan un gas perd energia, es refreda, en entrar en contacte amb una superfície freda.' },
          { es: 'Es lo que forma el vaho en un espejo del baño o las gotas de agua fuera de un vaso con bebida fría.', en: "It's what forms the fog on a bathroom mirror or the water droplets on the outside of a cold drink glass.", ca: 'És el que forma la boira en un mirall del bany o les gotes d\'aigua fora d\'un got amb beguda freda.' },
        ],
        dato_extra: { es: 'Las nubes se forman porque el vapor de agua se condensa alrededor de diminutas partículas de polvo en el aire.', en: 'Clouds form because water vapour condenses around tiny dust particles in the air.', ca: "Els núvols es formen perquè el vapor d'aigua es condensa al voltant de diminutes partícules de pols a l'aire." },
      },
    ],
  },

  // ── TABLA PERIÓDICA BÁSICA ───────────────────────────────────────────────
  {
    id: 'tabla-periodica',
    subject: 'ciencias',
    emoji: '⚗️',
    titulo: { es: 'Tabla Periódica Básica', en: 'Basic Periodic Table', ca: 'Taula Periòdica Bàsica' },
    candidatos: candidatos([
      { id: 'oxigeno', iniciales: 'O', nombre: { es: 'Oxígeno', en: 'Oxygen', ca: 'Oxigen' } },
      { id: 'hidrogeno', iniciales: 'H', nombre: { es: 'Hidrógeno', en: 'Hydrogen', ca: 'Hidrogen' } },
      { id: 'carbono', iniciales: 'C', nombre: { es: 'Carbono', en: 'Carbon', ca: 'Carboni' } },
      { id: 'hierro', iniciales: 'Fe', nombre: { es: 'Hierro', en: 'Iron', ca: 'Ferro' } },
      { id: 'oro', iniciales: 'Au', nombre: { es: 'Oro', en: 'Gold', ca: 'Or' } },
      { id: 'sodio', iniciales: 'Na', nombre: { es: 'Sodio', en: 'Sodium', ca: 'Sodi' } },
      { id: 'calcio', iniciales: 'Ca', nombre: { es: 'Calcio', en: 'Calcium', ca: 'Calci' } },
      { id: 'helio', iniciales: 'He', nombre: { es: 'Helio', en: 'Helium', ca: 'Heli' } },
    ]),
    rondas: [
      {
        respuesta: 'oxigeno',
        pistas: [
          { es: 'Soy un gas incoloro e inodoro que forma parte de aproximadamente el 21% del aire que respiras.', en: "I'm a colourless, odourless gas that makes up about 21% of the air you breathe.", ca: "Soc un gas incolor i inodor que forma part d'aproximadament el 21% de l'aire que respires." },
          { es: 'Los seres vivos te necesitamos para respirar, y las plantas me liberan durante la fotosíntesis.', en: 'Living things need me to breathe, and plants release me during photosynthesis.', ca: "Els éssers vius et necessitem per respirar, i les plantes m'alliberen durant la fotosíntesi." },
          { es: 'Mi símbolo es O, y cuando me combino con el hidrógeno formo el agua.', en: 'My symbol is O, and when I combine with hydrogen I form water.', ca: "El meu símbol és O, i quan em combino amb l'hidrogen formo l'aigua." },
        ],
        dato_extra: { es: 'Hace unos 2.400 millones de años apenas había oxígeno libre en la atmósfera; lo liberaron organismos fotosintéticos poco a poco.', en: 'About 2.4 billion years ago there was barely any free oxygen in the atmosphere; photosynthetic organisms released it little by little.', ca: "Fa uns 2.400 milions d'anys tot just hi havia oxigen lliure a l'atmosfera; el van alliberar organismes fotosintètics a poc a poc." },
      },
      {
        respuesta: 'hidrogeno',
        pistas: [
          { es: 'Soy el elemento más ligero y abundante de todo el universo.', en: "I'm the lightest and most abundant element in the entire universe.", ca: "Soc l'element més lleuger i abundant de tot l'univers." },
          { es: 'Soy un gas muy inflamable, y junto con el oxígeno formo el agua.', en: 'I\'m a highly flammable gas, and together with oxygen I form water.', ca: "Soc un gas molt inflamable, i juntament amb l'oxigen formo l'aigua." },
          { es: 'Mi símbolo es H, y las estrellas como el Sol me fusionan en su núcleo para producir energía.', en: 'My symbol is H, and stars like the Sun fuse me in their core to produce energy.', ca: 'El meu símbol és H, i les estrelles com el Sol em fusionen al seu nucli per produir energia.' },
        ],
        dato_extra: { es: 'Soy tan abundante que se estima que formo cerca del 75% de toda la masa del universo.', en: "I'm so abundant that I'm estimated to make up about 75% of all the mass in the universe.", ca: "Soc tan abundant que es calcula que formo prop del 75% de tota la massa de l'univers." },
      },
      {
        respuesta: 'carbono',
        pistas: [
          { es: 'Formo la base química de toda la vida conocida en la Tierra: estoy en todas las moléculas de los seres vivos.', en: "I form the chemical basis of all known life on Earth: I'm in every molecule of living things.", ca: "Formo la base química de tota la vida coneguda a la Terra: soc a totes les molècules dels éssers vius." },
          { es: 'Puedo formar más compuestos distintos que casi cualquier otro elemento, y también existo en formas puras muy distintas entre sí.', en: 'I can form more different compounds than almost any other element, and I also exist in pure forms very different from each other.', ca: 'Puc formar més compostos diferents que gairebé qualsevol altre element, i també existeixo en formes pures molt diferents entre si.' },
          { es: 'Mi símbolo es C, y según cómo se ordenen mis átomos puedo ser tan blando como el grafito de un lápiz o tan duro como un diamante.', en: 'My symbol is C, and depending on how my atoms are arranged I can be as soft as pencil graphite or as hard as a diamond.', ca: "El meu símbol és C, i segons com s'ordenin els meus àtoms puc ser tan tou com el grafit d'un llapis o tan dur com un diamant." },
        ],
        dato_extra: { es: 'El grafeno, una lámina de carbono de un solo átomo de grosor, es uno de los materiales más resistentes jamás medidos.', en: 'Graphene, a sheet of carbon just one atom thick, is one of the strongest materials ever measured.', ca: "El grafè, una làmina de carboni d'un sol àtom de gruix, és un dels materials més resistents mai mesurats." },
      },
      {
        respuesta: 'hierro',
        pistas: [
          { es: 'Soy un metal muy usado desde la Antigüedad para fabricar herramientas y armas.', en: 'I\'m a metal widely used since ancient times to make tools and weapons.', ca: "Soc un metall molt utilitzat des de l'Antiguitat per fabricar eines i armes." },
          { es: 'Formo parte de la hemoglobina de tu sangre, que transporta el oxígeno por tu cuerpo.', en: "I'm part of the haemoglobin in your blood, which carries oxygen around your body.", ca: "Formo part de l'hemoglobina de la teva sang, que transporta l'oxigen pel teu cos." },
          { es: 'Mi símbolo es Fe, y si me expongo al oxígeno y a la humedad, me oxido y aparece el óxido rojizo que conoces como herrumbre.', en: 'My symbol is Fe, and if I\'m exposed to oxygen and moisture, I rust and the reddish oxide you know as rust appears.', ca: "El meu símbol és Fe, i si m'exposo a l'oxigen i la humitat, m'oxido i apareix l'òxid vermellós que coneixes com a rovell." },
        ],
        dato_extra: { es: 'El núcleo de la Tierra está compuesto principalmente de hierro, lo que genera el campo magnético que nos protege.', en: "The Earth's core is made mainly of iron, which generates the magnetic field that protects us.", ca: 'El nucli de la Terra està compost principalment de ferro, cosa que genera el camp magnètic que ens protegeix.' },
      },
      {
        respuesta: 'oro',
        pistas: [
          { es: 'Soy un metal muy valorado desde la Antigüedad por mi color amarillo brillante y mi rareza.', en: 'I\'m a metal highly valued since ancient times for my bright yellow colour and my rarity.', ca: "Soc un metall molt valorat des de l'Antiguitat pel meu color groc brillant i la meva raresa." },
          { es: 'No me oxido ni pierdo el brillo con el tiempo, por eso se me usa en joyería.', en: "I don't rust or lose my shine over time, which is why I'm used in jewellery.", ca: "No m'oxido ni perdo la brillantor amb el temps, per això se'm fa servir en joieria." },
          { es: 'Mi símbolo es Au, y soy tan maleable que con un solo gramo se puede hacer un hilo de más de un kilómetro.', en: "My symbol is Au, and I'm so malleable that a single gram of me can be drawn into a wire over a kilometre long.", ca: "El meu símbol és Au, i soc tan mal·leable que amb un sol gram es pot fer un fil de més d'un quilòmetre." },
        ],
        dato_extra: { es: 'Según algunas teorías, casi todo el oro de la Tierra llegó por impactos de meteoritos hace miles de millones de años.', en: 'According to some theories, almost all the gold on Earth arrived via meteorite impacts billions of years ago.', ca: 'Segons algunes teories, gairebé tot l\'or de la Terra va arribar per impactes de meteorits fa milers de milions d\'anys.' },
      },
      {
        respuesta: 'sodio',
        pistas: [
          { es: 'Soy un metal tan reactivo que, si me pones en contacto con agua, reacciono de forma violenta y explosiva.', en: "I'm such a reactive metal that if I'm put in contact with water, I react violently, even explosively.", ca: 'Soc un metall tan reactiu que, si em poses en contacte amb aigua, reacciono de forma violenta i explosiva.' },
          { es: 'Combinado con el cloro formo la sal común que usas en la cocina.', en: 'Combined with chlorine I form the common table salt you use in the kitchen.', ca: 'Combinat amb el clor formo la sal comuna que fas servir a la cuina.' },
          { es: 'Mi símbolo es Na, y también soy esencial para que tus nervios y músculos funcionen correctamente.', en: 'My symbol is Na, and I\'m also essential for your nerves and muscles to work properly.', ca: 'El meu símbol és Na, i també soc essencial perquè els teus nervis i músculs funcionin correctament.' },
        ],
        dato_extra: { es: 'El sodio metálico puro no existe libre en la naturaleza porque reacciona de inmediato con el agua o el oxígeno del aire.', en: "Pure metallic sodium doesn't exist free in nature because it reacts immediately with water or the oxygen in the air.", ca: "El sodi metàl·lic pur no existeix lliure a la natura perquè reacciona immediatament amb l'aigua o l'oxigen de l'aire." },
      },
      {
        respuesta: 'calcio',
        pistas: [
          { es: 'Soy un metal esencial para los seres vivos, aunque en la naturaleza casi nunca aparezco solo.', en: "I'm a metal essential for living things, though in nature I almost never appear on my own.", ca: 'Soc un metall essencial per als éssers vius, tot i que a la natura gairebé mai apareixo sol.' },
          { es: 'Formo parte de tus huesos y tus dientes, dándoles dureza.', en: "I'm part of your bones and teeth, giving them hardness.", ca: 'Formo part dels teus ossos i les teves dents, donant-los duresa.' },
          { es: 'Mi símbolo es Ca, y también estoy presente en la caliza y en la cáscara de huevo.', en: "My symbol is Ca, and I'm also present in limestone and in eggshells.", ca: 'El meu símbol és Ca, i també soc present a la calcària i a la closca d\'ou.' },
        ],
        dato_extra: { es: 'Soy el mineral más abundante en el cuerpo humano, y casi todo yo estoy concentrado en los huesos y los dientes.', en: "I'm the most abundant mineral in the human body, and almost all of me is concentrated in the bones and teeth.", ca: "Soc el mineral més abundant del cos humà, i gairebé tot jo estic concentrat als ossos i les dents." },
      },
      {
        respuesta: 'helio',
        pistas: [
          { es: 'Soy un gas tan ligero que hace que los globos floten en el aire.', en: "I'm a gas so light that I make balloons float in the air.", ca: 'Soc un gas tan lleuger que fa que els globus surin per l\'aire.' },
          { es: 'Soy un gas noble: casi nunca reacciono ni me combino con otros elementos.', en: "I'm a noble gas: I almost never react or combine with other elements.", ca: 'Soc un gas noble: gairebé mai reacciono ni em combino amb altres elements.' },
          { es: 'Mi símbolo es He, y si respiras un poco de mí tu voz suena más aguda, aunque no es nada recomendable hacerlo.', en: 'My symbol is He, and if you breathe a bit of me your voice sounds higher-pitched, though it\'s not recommended at all.', ca: "El meu símbol és He, i si en respires una mica la teva veu sona més aguda, encara que no és gens recomanable fer-ho." },
        ],
        dato_extra: { es: 'Me descubrieron primero en el Sol, analizando su luz, antes de encontrarme en la Tierra.', en: 'I was first discovered on the Sun, by analysing its light, before being found on Earth.', ca: "Em van descobrir primer al Sol, analitzant-ne la llum, abans de trobar-me a la Terra." },
      },
    ],
  },
]

export function getTemaDiagnostico(id) {
  return TEMAS_DIAGNOSTICO.find(t => t.id === id) ?? null
}
