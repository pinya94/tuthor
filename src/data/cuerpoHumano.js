// Cuerpo Humano — sistemas digestivo, circulatorio, nervioso, respiratorio
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const PREGUNTAS = [

  // ── SISTEMA DIGESTIVO ────────────────────────────────────────────────────────
  q('cd-01','primaria',
    { es:'¿Cuál es el orden correcto del sistema digestivo?', en:'What is the correct order of the digestive system?', ca:'Quin és l\'ordre correcte del sistema digestiu?' },
    { es:['Boca → esófago → estómago → intestino delgado → intestino grueso','Boca → estómago → esófago → intestino grueso → intestino delgado','Boca → intestino delgado → estómago → esófago → intestino grueso','Boca → esófago → intestino delgado → estómago → intestino grueso'], en:['Mouth → oesophagus → stomach → small intestine → large intestine','Mouth → stomach → oesophagus → large intestine → small intestine','Mouth → small intestine → stomach → oesophagus → large intestine','Mouth → oesophagus → small intestine → stomach → large intestine'], ca:['Boca → esòfag → estómac → intestí prim → intestí gros','Boca → estómac → esòfag → intestí gros → intestí prim','Boca → intestí prim → estómac → esòfag → intestí gros','Boca → esòfag → intestí prim → estómac → intestí gros'] },
    { es:'Boca → esófago → estómago → intestino delgado → intestino grueso', en:'Mouth → oesophagus → stomach → small intestine → large intestine', ca:'Boca → esòfag → estómac → intestí prim → intestí gros' },
    '🦷',
    { es:'El recorrido del alimento: boca (masticación) → faringe → esófago → estómago (digestión química) → intestino delgado (absorción) → intestino grueso (agua y residuos) → recto → ano.', en:'The food\'s journey: mouth (chewing) → pharynx → oesophagus → stomach (chemical digestion) → small intestine (absorption) → large intestine (water and waste) → rectum → anus.', ca:'El recorregut de l\'aliment: boca (mastegació) → faringe → esòfag → estómac (digestió química) → intestí prim (absorció) → intestí gros (aigua i residus) → recte → anus.' },
  ),
  q('cd-02','primaria',
    { es:'¿Dónde se absorben principalmente los nutrientes de los alimentos?', en:'Where are the nutrients from food mainly absorbed?', ca:'On s\'absorbeixen principalment els nutrients dels aliments?' },
    { es:['En el estómago','En el intestino delgado','En el intestino grueso','En el hígado'], en:['In the stomach','In the small intestine','In the large intestine','In the liver'], ca:['A l\'estómac','A l\'intestí prim','A l\'intestí gros','Al fetge'] },
    { es:'En el intestino delgado', en:'In the small intestine', ca:'A l\'intestí prim' },
    '🍽️',
    { es:'El intestino delgado (6-7 m de largo) es donde se absorben los nutrientes gracias a las vellosidades intestinales, que aumentan la superficie de absorción. El hígado y el páncreas vierten enzimas digestivas en el intestino delgado.', en:'The small intestine (6-7 m long) is where nutrients are absorbed thanks to intestinal villi, which increase the absorption surface. The liver and pancreas pour digestive enzymes into the small intestine.', ca:'L\'intestí prim (6-7 m de llarg) és on s\'absorbeixen els nutrients gràcies a les vellositats intestinals, que augmenten la superfície d\'absorció. El fetge i el pàncrees aboquen enzims digestius a l\'intestí prim.' },
  ),
  q('cd-03','eso',
    { es:'¿Cuál es la función principal del hígado en la digestión?', en:'What is the main function of the liver in digestion?', ca:'Quina és la funció principal del fetge en la digestió?' },
    { es:['Producir ácido clorhídrico','Producir bilis para emulsionar las grasas','Absorber el agua de los alimentos','Almacenar glucosa en forma de glucógeno únicamente'], en:['Produce hydrochloric acid','Produce bile to emulsify fats','Absorb water from food','Store glucose as glycogen only'], ca:['Produir àcid clorhídric','Produir bilis per emulsionar els greixos','Absorbir l\'aigua dels aliments','Emmagatzemar glucosa en forma de glucogen únicament'] },
    { es:'Producir bilis para emulsionar las grasas', en:'Produce bile to emulsify fats', ca:'Produir bilis per emulsionar els greixos' },
    '❤️',
    { es:'El hígado produce bilis, que se almacena en la vesícula biliar y se vierte al intestino delgado para emulsionar (fragmentar) las grasas. También desintoxica la sangre, regula la glucosa y produce proteínas plasmáticas.', en:'The liver produces bile, which is stored in the gallbladder and poured into the small intestine to emulsify (break down) fats. It also detoxifies the blood, regulates glucose and produces plasma proteins.', ca:'El fetge produeix bilis, que s\'emmagatzema a la vesícula biliar i s\'aboca a l\'intestí prim per emulsionar (fragmentar) els greixos. També desintoxica la sang, regula la glucosa i produeix proteïnes plasmàtiques.' },
  ),

  // ── SISTEMA CIRCULATORIO ─────────────────────────────────────────────────────
  q('cc-01','primaria',
    { es:'¿Cuál es el órgano principal del sistema circulatorio?', en:'What is the main organ of the circulatory system?', ca:'Quin és l\'òrgan principal del sistema circulatori?' },
    { es:['El pulmón','El hígado','El corazón','El riñón'], en:['The lung','The liver','The heart','The kidney'], ca:['El pulmó','El fetge','El cor','El ronyó'] },
    { es:'El corazón', en:'The heart', ca:'El cor' },
    '❤️',
    { es:'El corazón es el órgano central del sistema circulatorio. Es un músculo hueco (miocardio) que bombea la sangre por todo el cuerpo. Tiene 4 cavidades: 2 aurículas (reciben sangre) y 2 ventrículos (la expulsan). Late unas 70 veces por minuto en reposo.', en:'The heart is the central organ of the circulatory system. It is a hollow muscle (myocardium) that pumps blood throughout the body. It has 4 chambers: 2 atria (receive blood) and 2 ventricles (expel it). It beats about 70 times per minute at rest.', ca:'El cor és l\'òrgan central del sistema circulatori. És un múscul buit (miocardi) que bombeja la sang per tot el cos. Té 4 cavitats: 2 aurícules (reben sang) i 2 ventricles (l\'expulsen). Bat unes 70 vegades per minut en repòs.' },
  ),
  q('cc-02','primaria',
    { es:'¿Qué tipo de vaso sanguíneo lleva sangre oxigenada desde el corazón al cuerpo?', en:'Which type of blood vessel carries oxygenated blood from the heart to the body?', ca:'Quin tipus de vas sanguini porta sang oxigenada des del cor cap al cos?' },
    { es:['Venas','Capilares','Arterias','Linfáticos'], en:['Veins','Capillaries','Arteries','Lymphatics'], ca:['Venes','Capil·lars','Artèries','Limfàtics'] },
    { es:'Arterias', en:'Arteries', ca:'Artèries' },
    '❤️',
    { es:'Arterias: llevan sangre del corazón al cuerpo (con presión, pared gruesa). Venas: devuelven la sangre al corazón (pared más fina, con válvulas). Capilares: vasos microscópicos donde ocurre el intercambio de gases y nutrientes con las células.', en:'Arteries: carry blood from the heart to the body (under pressure, thick wall). Veins: return blood to the heart (thinner wall, with valves). Capillaries: microscopic vessels where gas and nutrient exchange with cells occurs.', ca:'Artèries: porten sang del cor al cos (amb pressió, paret gruixuda). Venes: retornen la sang al cor (paret més prima, amb vàlvules). Capil·lars: vasos microscòpics on es produeix l\'intercanvi de gasos i nutrients amb les cèl·lules.' },
  ),
  q('cc-03','eso',
    { es:'¿Qué diferencia hay entre la circulación mayor y la menor (pulmonar)?', en:'What is the difference between systemic and pulmonary circulation?', ca:'Quina diferència hi ha entre la circulació major i la menor (pulmonar)?' },
    { es:['La mayor va al corazón y la menor al cuerpo','La mayor va del corazón a todo el cuerpo; la menor va del corazón a los pulmones y regresa','Son lo mismo con distinto nombre','La menor es la que va a los órganos internos únicamente'], en:['Systemic goes to the heart and pulmonary to the body','Systemic goes from the heart to the whole body; pulmonary goes from the heart to the lungs and back','They are the same with different names','The pulmonary only goes to the internal organs'], ca:['La major va al cor i la menor al cos','La major va del cor a tot el cos; la menor va del cor als pulmons i torna','Són el mateix amb nom diferent','La menor és la que va als òrgans interns únicament'] },
    { es:'La mayor va del corazón a todo el cuerpo; la menor va del corazón a los pulmones y regresa', en:'Systemic goes from the heart to the whole body; pulmonary goes from the heart to the lungs and back', ca:'La major va del cor a tot el cos; la menor va del cor als pulmons i torna' },
    '🔄',
    { es:'Circulación menor o pulmonar: ventrículo derecho → pulmones (oxigenación) → aurícula izquierda. Circulación mayor o sistémica: ventrículo izquierdo → todo el cuerpo (entrega O₂) → aurícula derecha.', en:'Pulmonary (minor) circulation: right ventricle → lungs (oxygenation) → left atrium. Systemic (major) circulation: left ventricle → whole body (O₂ delivery) → right atrium.', ca:'Circulació menor o pulmonar: ventricle dret → pulmons (oxigenació) → aurícula esquerra. Circulació major o sistèmica: ventricle esquerre → tot el cos (lliurament O₂) → aurícula dreta.' },
  ),

  // ── SISTEMA RESPIRATORIO ─────────────────────────────────────────────────────
  q('cr-01','primaria',
    { es:'¿Cuál es la función principal del sistema respiratorio?', en:'What is the main function of the respiratory system?', ca:'Quina és la funció principal del sistema respiratori?' },
    { es:['Transportar nutrientes','Intercambiar oxígeno y dióxido de carbono con la sangre','Filtrar la sangre','Producir hormonas'], en:['Transport nutrients','Exchange oxygen and carbon dioxide with the blood','Filter the blood','Produce hormones'], ca:['Transportar nutrients','Intercanviar oxigen i diòxid de carboni amb la sang','Filtrar la sang','Produir hormones'] },
    { es:'Intercambiar oxígeno y dióxido de carbono con la sangre', en:'Exchange oxygen and carbon dioxide with the blood', ca:'Intercanviar oxigen i diòxid de carboni amb la sang' },
    '🌬️',
    { es:'Los pulmones intercambian gases: toman O₂ del aire y lo pasan a la sangre, y recogen CO₂ de la sangre para expulsarlo. Este intercambio ocurre en los alvéolos pulmonares, que tienen una superficie total de unos 70 m².', en:'The lungs exchange gases: they take O₂ from the air and pass it to the blood, and collect CO₂ from the blood to expel it. This exchange occurs in the pulmonary alveoli, which have a total surface area of about 70 m².', ca:'Els pulmons intercanvien gasos: prenen O₂ de l\'aire i el passen a la sang, i recullen CO₂ de la sang per expulsar-lo. Aquest intercanvi es produeix als alvèols pulmonars, que tenen una superfície total d\'uns 70 m².' },
  ),
  q('cr-02','primaria',
    { es:'¿Cómo se llaman las pequeñas bolsas de aire de los pulmones donde ocurre el intercambio de gases?', en:'What are the tiny air sacs in the lungs where gas exchange occurs called?', ca:'Com s\'anomenen les petites bosses d\'aire dels pulmons on es produeix l\'intercanvi de gasos?' },
    { es:['Bronquios','Bronquiolos','Alvéolos','Tráquea'], en:['Bronchi','Bronchioles','Alveoli','Trachea'], ca:['Bronquis','Bronquíols','Alvèols','Tràquea'] },
    { es:'Alvéolos', en:'Alveoli', ca:'Alvèols' },
    '🌬️',
    { es:'Camino del aire: nariz → faringe → laringe → tráquea → bronquios → bronquiolos → alvéolos. Los alvéolos están rodeados de capilares donde se intercambia O₂ (entra a la sangre) y CO₂ (sale hacia el aire).', en:'Air path: nose → pharynx → larynx → trachea → bronchi → bronchioles → alveoli. The alveoli are surrounded by capillaries where O₂ (enters the blood) and CO₂ (leaves into the air) are exchanged.', ca:'Camí de l\'aire: nas → faringe → laringe → tràquea → bronquis → bronquíols → alvèols. Els alvèols estan envoltats de capil·lars on s\'intercanvia O₂ (entra a la sang) i CO₂ (surt cap a l\'aire).' },
  ),
  q('cr-03','eso',
    { es:'¿Qué músculo es el principal responsable de la inspiración (entrada de aire)?', en:'Which muscle is mainly responsible for inspiration (air intake)?', ca:'Quin múscul és el principal responsable de la inspiració (entrada d\'aire)?' },
    { es:['El corazón','Los pulmones','El diafragma','Los intercostales únicamente'], en:['The heart','The lungs','The diaphragm','The intercostals only'], ca:['El cor','Els pulmons','El diafragma','Els intercostals únicament'] },
    { es:'El diafragma', en:'The diaphragm', ca:'El diafragma' },
    '💨',
    { es:'El diafragma es un músculo en forma de cúpula bajo los pulmones. Al contraerse (inspiración), baja y los pulmones se expanden para aspirar aire. Al relajarse (espiración), sube y expulsa el aire. Los músculos intercostales también ayudan.', en:'The diaphragm is a dome-shaped muscle below the lungs. When it contracts (inspiration), it moves down and the lungs expand to draw in air. When it relaxes (expiration), it moves up and expels the air. The intercostal muscles also help.', ca:'El diafragma és un múscul en forma de cúpula sota els pulmons. En contraure\'s (inspiració), baixa i els pulmons s\'expandeixen per aspirar aire. En relaxar-se (espiració), puja i expulsa l\'aire. Els músculs intercostals també ajuden.' },
  ),

  // ── SISTEMA NERVIOSO ─────────────────────────────────────────────────────────
  q('cn-01','primaria',
    { es:'¿Cuáles son las dos partes principales del sistema nervioso?', en:'What are the two main parts of the nervous system?', ca:'Quines són les dues parts principals del sistema nerviós?' },
    { es:['Sistema motor y sensorial','Sistema central y periférico','Sistema voluntario e involuntario','Sistema simpático y parasimpático'], en:['Motor and sensory system','Central and peripheral system','Voluntary and involuntary system','Sympathetic and parasympathetic system'], ca:['Sistema motor i sensorial','Sistema central i perifèric','Sistema voluntari i involuntari','Sistema simpàtic i parasimpàtic'] },
    { es:'Sistema central y periférico', en:'Central and peripheral system', ca:'Sistema central i perifèric' },
    '🧠',
    { es:'Sistema Nervioso Central (SNC): encéfalo (cerebro, cerebelo, bulbo) + médula espinal. Sistema Nervioso Periférico (SNP): todos los nervios que conectan el SNC con el resto del cuerpo (órganos, músculos, piel).', en:'Central Nervous System (CNS): brain (cerebrum, cerebellum, brainstem) + spinal cord. Peripheral Nervous System (PNS): all the nerves connecting the CNS with the rest of the body (organs, muscles, skin).', ca:'Sistema Nerviós Central (SNC): encèfal (cervell, cerebel, bulb) + medul·la espinal. Sistema Nerviós Perifèric (SNP): tots els nervis que connecten el SNC amb la resta del cos (òrgans, músculs, pell).' },
  ),
  q('cn-02','primaria',
    { es:'¿Cómo se llaman las células del sistema nervioso que transmiten los impulsos nerviosos?', en:'What are the cells of the nervous system that transmit nerve impulses called?', ca:'Com s\'anomenen les cèl·lules del sistema nerviós que transmeten els impulsos nerviosos?' },
    { es:['Eritrocitos','Neuronas','Leucocitos','Plaquetas'], en:['Red blood cells','Neurons','White blood cells','Platelets'], ca:['Eritròcits','Neurones','Leucòcits','Plaquetes'] },
    { es:'Neuronas', en:'Neurons', ca:'Neurones' },
    '🧠',
    { es:'Las neuronas son las células nerviosas que transmiten impulsos eléctricos. Tienen un cuerpo celular, dendritas (reciben señales) y un axón (envía señales). La unión entre neuronas se llama sinapsis. El cerebro humano tiene unos 86 000 millones de neuronas.', en:'Neurons are nerve cells that transmit electrical impulses. They have a cell body, dendrites (receive signals) and an axon (sends signals). The junction between neurons is called a synapse. The human brain has about 86 billion neurons.', ca:'Les neurones són les cèl·lules nervioses que transmeten impulsos elèctrics. Tenen un cos cel·lular, dendrites (reben senyals) i un axó (envia senyals). La unió entre neurones s\'anomena sinapsi. El cervell humà té uns 86 000 milions de neurones.' },
  ),
  q('cn-03','eso',
    { es:'¿Qué parte del encéfalo controla el equilibrio y la coordinación de los movimientos?', en:'Which part of the brain controls balance and movement coordination?', ca:'Quina part de l\'encèfal controla l\'equilibri i la coordinació dels moviments?' },
    { es:['El cerebro','El cerebelo','El bulbo raquídeo','La médula espinal'], en:['The cerebrum','The cerebellum','The medulla oblongata','The spinal cord'], ca:['El cervell','El cerebel','El bulb raquidi','La medul·la espinal'] },
    { es:'El cerebelo', en:'The cerebellum', ca:'El cerebel' },
    '🧠',
    { es:'Cerebro: pensamiento, memoria, lenguaje, emociones. Cerebelo: equilibrio y coordinación de movimientos. Bulbo raquídeo: funciones vitales automáticas (respiración, latido cardíaco). Médula espinal: conduce impulsos entre el cerebro y el cuerpo; controla reflejos.', en:'Cerebrum: thinking, memory, language, emotions. Cerebellum: balance and coordination of movements. Medulla oblongata: automatic vital functions (breathing, heartbeat). Spinal cord: conducts impulses between the brain and the body; controls reflexes.', ca:'Cervell: pensament, memòria, llenguatge, emocions. Cerebel: equilibri i coordinació de moviments. Bulb raquidi: funcions vitals automàtiques (respiració, batec cardíac). Medul·la espinal: condueix impulsos entre el cervell i el cos; controla reflexos.' },
  ),
  q('cn-04','eso',
    { es:'¿Qué es un acto reflejo?', en:'What is a reflex action?', ca:'Què és un acte reflex?' },
    { es:['Una respuesta voluntaria a un estímulo lento','Una respuesta involuntaria y rápida a un estímulo, que no pasa por el cerebro','Una orden consciente del cerebro al músculo','Una respuesta emocional a un estímulo externo'], en:['A voluntary response to a slow stimulus','An involuntary and rapid response to a stimulus that does not pass through the brain','A conscious order from the brain to the muscle','An emotional response to an external stimulus'], ca:['Una resposta voluntària a un estímul lent','Una resposta involuntària i ràpida a un estímul, que no passa pel cervell','Una ordre conscient del cervell al múscul','Una resposta emocional a un estímul extern'] },
    { es:'Una respuesta involuntaria y rápida a un estímulo, que no pasa por el cerebro', en:'An involuntary and rapid response to a stimulus that does not pass through the brain', ca:'Una resposta involuntària i ràpida a un estímul, que no passa pel cervell' },
    '⚡',
    { es:'El arco reflejo: estímulo → receptor sensorial → neurona sensorial → médula espinal → neurona motora → efector (músculo/glándula). Ejemplo: retirar la mano del fuego. La señal no llega al cerebro antes de la respuesta, por eso es más rápida.', en:'The reflex arc: stimulus → sensory receptor → sensory neuron → spinal cord → motor neuron → effector (muscle/gland). Example: pulling your hand away from fire. The signal does not reach the brain before the response, which is why it is faster.', ca:'L\'arc reflex: estímul → receptor sensorial → neurona sensorial → medul·la espinal → neurona motora → efector (múscul/glàndula). Exemple: retirar la mà del foc. El senyal no arriba al cervell abans de la resposta, per això és més ràpida.' },
  ),

  q('cd-04', 'primaria',
    { es: "¿Dónde empieza la digestión?", en: "Where does digestion start?", ca: "On comença la digestió?" },
    { es: ["En el estómago","En la boca","En el intestino","En el hígado"], en: ["In the stomach","In the mouth","In the intestine","In the liver"], ca: ["A l'estómac","A la boca","A l'intestí","Al fetge"] },
    { es: "En la boca", en: "In the mouth", ca: "A la boca" },
    '👄',
    { es: "Empieza en la boca: los dientes trituran y la saliva ya rompe los almidones. Cuando la comida llega al estómago, la digestión lleva rato en marcha.", en: "It starts in the mouth: teeth grind and saliva already breaks down starches.", ca: "Comença a la boca: les dents trituren i la saliva ja trenca els midons." }),

  q('cc-04', 'primaria',
    { es: "¿Cuántas cavidades tiene el corazón humano?", en: "How many chambers does the human heart have?", ca: "Quantes cavitats té el cor humà?" },
    { es: ["Dos","Tres","Cuatro","Cinco"], en: ["Two","Three","Four","Five"], ca: ["Dues","Tres","Quatre","Cinc"] },
    { es: "Cuatro", en: "Four", ca: "Quatre" },
    '❤️',
    { es: "Cuatro: dos aurículas arriba y dos ventrículos abajo. El lado derecho manda sangre a los pulmones y el izquierdo al resto del cuerpo.", en: "Four: two atria and two ventricles. The right side pumps to the lungs, the left to the rest of the body.", ca: "Quatre: dues aurícules i dos ventricles." }),

  q('cr-04', 'primaria',
    { es: "¿Qué gas tomamos del aire al respirar?", en: "Which gas do we take from the air when we breathe?", ca: "Quin gas prenem de l'aire en respirar?" },
    { es: ["Dióxido de carbono","Oxígeno","Nitrógeno","Hidrógeno"], en: ["Carbon dioxide","Oxygen","Nitrogen","Hydrogen"], ca: ["Diòxid de carboni","Oxigen","Nitrogen","Hidrogen"] },
    { es: "Oxígeno", en: "Oxygen", ca: "Oxigen" },
    '💨',
    { es: "Tomamos oxígeno y soltamos dióxido de carbono. El intercambio ocurre en los alvéolos, unos saquitos diminutos al final de los bronquios.", en: "We take in oxygen and release carbon dioxide, exchanged in the alveoli.", ca: "Prenem oxigen i deixem anar diòxid de carboni, als alvèols." }),

  q('cn-05', 'primaria',
    { es: "¿Qué órgano dirige todo el sistema nervioso?", en: "Which organ directs the whole nervous system?", ca: "Quin òrgan dirigeix tot el sistema nerviós?" },
    { es: ["El corazón","El cerebro","El pulmón","El estómago"], en: ["The heart","The brain","The lung","The stomach"], ca: ["El cor","El cervell","El pulmó","L'estómac"] },
    { es: "El cerebro", en: "The brain", ca: "El cervell" },
    '🧠',
    { es: "El cerebro recibe la información de los sentidos, la interpreta y manda las órdenes. La médula espinal es la autopista que las lleva.", en: "The brain receives information from the senses, interprets it and sends orders.", ca: "El cervell rep la informació dels sentits, la interpreta i envia les ordres." }),

  q('cd-05', 'primaria',
    { es: "¿Para qué sirve el esqueleto?", en: "What is the skeleton for?", ca: "Per a què serveix l'esquelet?" },
    { es: ["Solo para andar","Para sostener el cuerpo y proteger los órganos","Para digerir","Para respirar"], en: ["Only for walking","To support the body and protect the organs","To digest","To breathe"], ca: ["Només per caminar","Per sostenir el cos i protegir els òrgans","Per digerir","Per respirar"] },
    { es: "Para sostener el cuerpo y proteger los órganos", en: "To support the body and protect the organs", ca: "Per sostenir el cos i protegir els òrgans" },
    '🦴',
    { es: "Sostiene, da forma y protege: el cráneo guarda el cerebro y las costillas el corazón y los pulmones. Además, dentro de los huesos se fabrica la sangre.", en: "It supports, shapes and protects — and blood is made inside the bones.", ca: "Sosté, dona forma i protegeix; a més, dins dels ossos es fabrica la sang." }),

  q('cc-05', 'eso',
    { es: "¿Qué diferencia hay entre una arteria y una vena?", en: "What is the difference between an artery and a vein?", ca: "Quina diferència hi ha entre una artèria i una vena?" },
    { es: ["Ninguna","La arteria sale del corazón y la vena vuelve a él","La arteria siempre lleva sangre limpia","La vena es más gruesa siempre"], en: ["None","The artery leaves the heart and the vein returns to it","Arteries always carry clean blood","Veins are always thicker"], ca: ["Cap","L'artèria surt del cor i la vena hi torna","L'artèria sempre porta sang neta","La vena sempre és més gruixuda"] },
    { es: "La arteria sale del corazón y la vena vuelve a él", en: "The artery leaves the heart and the vein returns to it", ca: "L'artèria surt del cor i la vena hi torna" },
    '❤️',
    { es: "La diferencia es la DIRECCIÓN, no el tipo de sangre: la arteria pulmonar sale del corazón con sangre pobre en oxígeno, y la vena pulmonar vuelve con sangre rica.", en: "The difference is direction, not blood type: the pulmonary artery carries oxygen-poor blood away from the heart.", ca: "La diferència és la DIRECCIÓ, no el tipus de sang." }),

  q('cr-05', 'eso',
    { es: "¿Qué músculo hace posible la respiración?", en: "Which muscle makes breathing possible?", ca: "Quin múscul fa possible la respiració?" },
    { es: ["El bíceps","El diafragma","El corazón","El tríceps"], en: ["The biceps","The diaphragm","The heart","The triceps"], ca: ["El bíceps","El diafragma","El cor","El tríceps"] },
    { es: "El diafragma", en: "The diaphragm", ca: "El diafragma" },
    '💨',
    { es: "El diafragma separa el tórax del abdomen. Al contraerse baja, el pecho se agranda y entra el aire; al relajarse sube y el aire sale.", en: "The diaphragm contracts and flattens, the chest expands and air comes in.", ca: "El diafragma es contrau i baixa, el pit s'eixampla i entra l'aire." }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO      = PREGUNTAS
