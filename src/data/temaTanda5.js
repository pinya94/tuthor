// Quinta tanda del autocompletado (16-nov-2026): física (energía, leyes de
// Newton, presión y Arquímedes, movimiento circular), historia de España
// (siglo XIX, franquismo y Transición), la atmósfera y una página nueva de
// reacciones químicas. Las ampliaciones se suman en AMPLIACION (temaAmpliado.js);
// el MCU se añade a «movimiento», que ya estaba ampliado. g = 9,8 m/s².
const T = (es, en, ca) => ({ es, en, ca })
const L = T

// ── ENERGÍA ───────────────────────────────────────────────────────────────

const energia = {
  metaTitle: L('La energía: cinética, potencial, mecánica, trabajo y potencia (fórmulas) — resumen y ejercicios', 'Energy: kinetic, potential and mechanical energy, work and power (formulas) — summary and practice questions', 'L’energia: cinètica, potencial, mecànica, treball i potència (fórmules) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Fórmulas de la energía', 'Energy formulas', 'Fórmules de l’energia'),
      tabla: {
        columnas: L(['Magnitud', 'Fórmula', 'Unidad'], ['Quantity', 'Formula', 'Unit'], ['Magnitud', 'Fórmula', 'Unitat']),
        filas: [
          [L('Energía cinética (por moverse)', 'Kinetic energy (from moving)', 'Energia cinètica (per moure’s)'), 'Ec = ½ · m · v²', L('julio (J)', 'joule (J)', 'joule (J)')],
          [L('Energía potencial gravitatoria (por la altura)', 'Gravitational potential energy (from height)', 'Energia potencial gravitatòria (per l’alçada)'), 'Ep = m · g · h', 'J'],
          [L('Energía mecánica', 'Mechanical energy', 'Energia mecànica'), 'Em = Ec + Ep', 'J'],
          [L('Trabajo', 'Work', 'Treball'), L('W = F · d (fuerza en la dirección del movimiento)', 'W = F · d (force in the direction of motion)', 'W = F · d (força en la direcció del moviment)'), 'J'],
          [L('Potencia', 'Power', 'Potència'), 'P = W / t', L('vatio (W) = J/s', 'watt (W) = J/s', 'watt (W) = J/s')],
        ],
      },
      lista: L(
        ['g = 9,8 m/s² (en muchos ejercicios se redondea a 10).', '1 kWh (lo que mide la factura de la luz) = 3.600.000 J.', 'Si la velocidad se duplica, la energía cinética se multiplica por 4, porque va al cuadrado.'],
        ['g = 9.8 m/s² (often rounded to 10 in exercises).', '1 kWh (what the electricity bill measures) = 3,600,000 J.', 'If speed doubles, kinetic energy is multiplied by 4, because speed is squared.'],
        ['g = 9,8 m/s² (en molts exercicis s’arrodoneix a 10).', '1 kWh (el que mesura la factura de la llum) = 3.600.000 J.', 'Si la velocitat es duplica, l’energia cinètica es multiplica per 4, perquè va al quadrat.'],
      ),
    },
    {
      titulo: L('La conservación de la energía mecánica', 'Conservation of mechanical energy', 'La conservació de l’energia mecànica'),
      texto: L(
        ['Si no hay rozamiento, la energía mecánica se conserva: lo que pierde un cuerpo en energía potencial al caer lo gana en energía cinética. Por eso, desde una altura h, llega al suelo con v = √(2 · g · h), sea cual sea su masa. Si hay rozamiento, parte de la energía se transforma en calor, pero la energía total del universo sigue siendo la misma: no se crea ni se destruye, solo se transforma.'],
        ['With no friction, mechanical energy is conserved: whatever potential energy a falling object loses, it gains as kinetic energy. So from a height h it hits the ground at v = √(2 · g · h), whatever its mass. With friction, some energy turns into heat, but the total energy of the universe stays the same: it is neither created nor destroyed, only transformed.'],
        ['Si no hi ha fregament, l’energia mecànica es conserva: el que perd un cos en energia potencial en caure ho guanya en energia cinètica. Per això, des d’una alçada h, arriba a terra amb v = √(2 · g · h), sigui quina sigui la massa. Si hi ha fregament, part de l’energia es transforma en calor, però l’energia total de l’univers continua sent la mateixa: no es crea ni es destrueix, només es transforma.'],
      ),
    },
    {
      titulo: L('Fuentes de energía', 'Energy sources', 'Fonts d’energia'),
      tabla: {
        columnas: L(['Tipo', 'Fuentes', 'Ventaja / inconveniente'], ['Type', 'Sources', 'Advantage / drawback'], ['Tipus', 'Fonts', 'Avantatge / inconvenient']),
        filas: [
          [L('Renovables', 'Renewable', 'Renovables'), L('solar, eólica, hidráulica, biomasa, geotérmica, mareomotriz', 'solar, wind, hydroelectric, biomass, geothermal, tidal', 'solar, eòlica, hidràulica, biomassa, geotèrmica, mareomotriu'), L('no se agotan y apenas contaminan / dependen del sol, el viento o la lluvia', 'they do not run out and pollute little / they depend on sun, wind or rain', 'no s’esgoten i gairebé no contaminen / depenen del sol, el vent o la pluja')],
          [L('No renovables', 'Non-renewable', 'No renovables'), L('carbón, petróleo, gas natural, nuclear', 'coal, oil, natural gas, nuclear', 'carbó, petroli, gas natural, nuclear'), L('dan mucha energía de forma constante / se agotan; los fósiles emiten CO₂ y la nuclear deja residuos', 'they give lots of steady energy / they run out; fossil fuels emit CO₂ and nuclear leaves waste', 'donen molta energia de manera constant / s’esgoten; els fòssils emeten CO₂ i la nuclear deixa residus')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué es un julio?', 'What is a joule?', 'Què és un joule?'),
      r: T('La unidad de energía y de trabajo: es el trabajo que hace una fuerza de 1 newton al mover algo 1 metro. Subir una manzana (unos 100 g) un metro cuesta aproximadamente 1 julio.', 'The unit of energy and work: the work done by a 1-newton force moving something 1 metre. Lifting an apple (about 100 g) by one metre takes roughly 1 joule.', 'La unitat d’energia i de treball: és el treball que fa una força d’1 newton en moure una cosa 1 metre. Pujar una poma (uns 100 g) un metre costa aproximadament 1 joule.') },
  ],
  ejercicios: [
    { e: T('Un coche de 1.000 kg va a 20 m/s. ¿Cuál es su energía cinética?', 'A 1,000 kg car travels at 20 m/s. What is its kinetic energy?', 'Un cotxe de 1.000 kg va a 20 m/s. Quina és la seva energia cinètica?'),
      s: T('Ec = ½ · 1.000 · 20² = 500 · 400 = 200.000 J.', 'Ek = ½ · 1,000 · 20² = 500 · 400 = 200,000 J.', 'Ec = ½ · 1.000 · 20² = 500 · 400 = 200.000 J.') },
    { e: T('¿Qué energía potencial tiene una maceta de 2 kg en un balcón a 5 m de altura?', 'What potential energy does a 2 kg flowerpot have on a balcony 5 m up?', 'Quina energia potencial té un test de 2 kg en un balcó a 5 m d’alçada?'),
      s: T('Ep = 2 · 9,8 · 5 = 98 J.', 'Ep = 2 · 9.8 · 5 = 98 J.', 'Ep = 2 · 9,8 · 5 = 98 J.') },
    { e: T('Si esa maceta cae, ¿a qué velocidad llega al suelo (sin rozamiento)?', 'If that flowerpot falls, how fast does it hit the ground (no friction)?', 'Si aquest test cau, a quina velocitat arriba a terra (sense fregament)?'),
      s: T('Toda la Ep pasa a Ec: v = √(2 · 9,8 · 5) = √98 ≈ 9,9 m/s (unos 36 km/h).', 'All the Ep becomes Ek: v = √(2 · 9.8 · 5) = √98 ≈ 9.9 m/s (about 36 km/h).', 'Tota l’Ep passa a Ec: v = √(2 · 9,8 · 5) = √98 ≈ 9,9 m/s (uns 36 km/h).') },
    { e: T('Empujas una caja con 50 N a lo largo de 10 m en 20 s. ¿Qué trabajo haces y con qué potencia?', 'You push a box with 50 N for 10 m in 20 s. How much work do you do, and at what power?', 'Empenys una caixa amb 50 N al llarg de 10 m en 20 s. Quin treball fas i amb quina potència?'),
      s: T('W = 50 · 10 = 500 J. P = 500 / 20 = 25 W.', 'W = 50 · 10 = 500 J. P = 500 / 20 = 25 W.', 'W = 50 · 10 = 500 J. P = 500 / 20 = 25 W.') },
    { e: T('Un motor de 2 kW funciona 30 s. ¿Cuánta energía consume?', 'A 2 kW motor runs for 30 s. How much energy does it use?', 'Un motor de 2 kW funciona 30 s. Quanta energia consumeix?'),
      s: T('E = P · t = 2.000 W · 30 s = 60.000 J.', 'E = P · t = 2,000 W · 30 s = 60,000 J.', 'E = P · t = 2.000 W · 30 s = 60.000 J.') },
  ],
}

// ── DINÁMICA: LEYES DE NEWTON ─────────────────────────────────────────────

const dinamica = {
  metaTitle: L('Las leyes de Newton: inercia, F = m · a y acción y reacción, peso y rozamiento — resumen y ejercicios', 'Newton’s laws: inertia, F = m · a and action and reaction, weight and friction — summary and practice questions', 'Les lleis de Newton: inèrcia, F = m · a i acció i reacció, pes i fregament — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las tres leyes', 'The three laws', 'Les tres lleis'),
      tabla: {
        columnas: L(['Ley', 'Qué dice', 'Ejemplo'], ['Law', 'What it says', 'Example'], ['Llei', 'Què diu', 'Exemple']),
        filas: [
          [L('1.ª, de la inercia', '1st, inertia', '1a, de la inèrcia'), L('si la fuerza total es cero, un cuerpo sigue quieto o moviéndose en línea recta a velocidad constante', 'if the total force is zero, an object stays still or keeps moving in a straight line at constant speed', 'si la força total és zero, un cos continua quiet o movent-se en línia recta a velocitat constant'), L('al frenar el autobús, tu cuerpo sigue hacia delante', 'when the bus brakes, your body keeps going forward', 'quan frena l’autobús, el teu cos continua endavant')],
          [L('2.ª, fundamental', '2nd, F = m · a', '2a, fonamental'), L('la fuerza total produce una aceleración: F = m · a', 'the total force produces an acceleration: F = m · a', 'la força total produeix una acceleració: F = m · a'), L('con la misma fuerza, un carro vacío acelera más que uno lleno', 'with the same force, an empty trolley speeds up more than a full one', 'amb la mateixa força, un carro buit accelera més que un de ple')],
          [L('3.ª, de acción y reacción', '3rd, action and reaction', '3a, d’acció i reacció'), L('si A empuja a B, B empuja a A con una fuerza igual y contraria', 'if A pushes B, B pushes A with an equal and opposite force', 'si A empeny B, B empeny A amb una força igual i contrària'), L('al remar, empujas el agua hacia atrás y el agua empuja la barca hacia delante', 'when rowing, you push the water back and the water pushes the boat forward', 'en remar, empenys l’aigua enrere i l’aigua empeny la barca endavant')],
        ],
      },
    },
    {
      titulo: L('Las fuerzas de cada día', 'Everyday forces', 'Les forces de cada dia'),
      tabla: {
        columnas: L(['Fuerza', 'Fórmula', 'Hacia dónde'], ['Force', 'Formula', 'Direction'], ['Força', 'Fórmula', 'Cap a on']),
        filas: [
          [L('Peso', 'Weight', 'Pes'), 'P = m · g', L('vertical, hacia abajo', 'straight down', 'vertical, cap avall')],
          [L('Normal', 'Normal force', 'Normal'), L('la que hace falta para que no atraviese la superficie', 'whatever stops it going through the surface', 'la que cal perquè no travessi la superfície'), L('perpendicular a la superficie', 'perpendicular to the surface', 'perpendicular a la superfície')],
          [L('Rozamiento', 'Friction', 'Fregament'), 'Fr = μ · N', L('contraria al movimiento', 'against the motion', 'contrària al moviment')],
          [L('Tensión', 'Tension', 'Tensió'), L('la que transmite una cuerda', 'transmitted along a rope', 'la que transmet una corda'), L('a lo largo de la cuerda', 'along the rope', 'al llarg de la corda')],
        ],
      },
      lista: L(
        ['La masa (kg) es la cantidad de materia y no cambia; el peso (N) es la fuerza con que la Tierra nos atrae: en la Luna pesarías unas seis veces menos, con la misma masa.', 'En un plano inclinado de ángulo α, el peso se divide en P · sen α (hace bajar el cuerpo) y P · cos α (lo aprieta contra el plano y la normal lo compensa).', 'Las fuerzas de acción y reacción no se anulan, porque actúan sobre cuerpos distintos.'],
        ['Mass (kg) is the amount of matter and does not change; weight (N) is the force with which the Earth pulls you: on the Moon you would weigh about six times less, with the same mass.', 'On a slope at angle α, weight splits into P · sin α (pulling the object down the slope) and P · cos α (pressing it onto the slope, balanced by the normal force).', 'Action and reaction forces do not cancel out, because they act on different objects.'],
        ['La massa (kg) és la quantitat de matèria i no canvia; el pes (N) és la força amb què la Terra ens atreu: a la Lluna pesaries unes sis vegades menys, amb la mateixa massa.', 'En un pla inclinat d’angle α, el pes es divideix en P · sin α (fa baixar el cos) i P · cos α (l’empeny contra el pla i la normal el compensa).', 'Les forces d’acció i reacció no s’anul·len, perquè actuen sobre cossos diferents.'],
      ),
    },
  ],
  preguntas: [
    { p: T('Si empujo una pared y no se mueve, ¿la pared me empuja a mí?', 'If I push a wall and it does not move, does the wall push me?', 'Si empenyo una paret i no es mou, la paret m’empeny a mi?'),
      r: T('Sí, con la misma fuerza y en sentido contrario (3.ª ley). Por eso, si empujas la pared con patines puestos, el que se mueve hacia atrás eres tú.', 'Yes, with the same force in the opposite direction (3rd law). That is why, if you push the wall wearing roller skates, you are the one who rolls backwards.', 'Sí, amb la mateixa força i en sentit contrari (3a llei). Per això, si empenys la paret amb patins posats, qui es mou enrere ets tu.') },
  ],
  ejercicios: [
    { e: T('Una fuerza de 6 N actúa sobre un carro de 2 kg. ¿Qué aceleración le da?', 'A 6 N force acts on a 2 kg trolley. What acceleration does it give?', 'Una força de 6 N actua sobre un carro de 2 kg. Quina acceleració li dona?'),
      s: T('a = F / m = 6 / 2 = 3 m/s².', 'a = F / m = 6 / 2 = 3 m/s².', 'a = F / m = 6 / 2 = 3 m/s².') },
    { e: T('¿Cuánto pesa en la Tierra una persona de 60 kg?', 'What does a 60 kg person weigh on Earth?', 'Quant pesa a la Terra una persona de 60 kg?'),
      s: T('P = 60 · 9,8 = 588 N. Su masa sigue siendo 60 kg.', 'W = 60 · 9.8 = 588 N. Their mass is still 60 kg.', 'P = 60 · 9,8 = 588 N. La seva massa continua sent 60 kg.') },
    { e: T('Sobre una caja de 2 kg tiran 10 N hacia la derecha y 4 N hacia la izquierda. ¿Qué aceleración tiene?', 'A 2 kg box is pulled with 10 N to the right and 4 N to the left. What is its acceleration?', 'Sobre una caixa de 2 kg estiren 10 N cap a la dreta i 4 N cap a l’esquerra. Quina acceleració té?'),
      s: T('Fuerza total = 10 − 4 = 6 N hacia la derecha. a = 6 / 2 = 3 m/s² hacia la derecha.', 'Total force = 10 − 4 = 6 N to the right. a = 6 / 2 = 3 m/s² to the right.', 'Força total = 10 − 4 = 6 N cap a la dreta. a = 6 / 2 = 3 m/s² cap a la dreta.') },
    { e: T('Una caja de 10 kg está en el suelo y el coeficiente de rozamiento es 0,2. ¿Cuánto vale la fuerza de rozamiento?', 'A 10 kg box is on the floor and the coefficient of friction is 0.2. How big is the friction force?', 'Una caixa de 10 kg és a terra i el coeficient de fregament és 0,2. Quant val la força de fregament?'),
      s: T('En suelo horizontal, N = P = 10 · 9,8 = 98 N. Fr = 0,2 · 98 = 19,6 N.', 'On level ground, N = W = 10 · 9.8 = 98 N. Ff = 0.2 · 98 = 19.6 N.', 'En terra horitzontal, N = P = 10 · 9,8 = 98 N. Fr = 0,2 · 98 = 19,6 N.') },
    { e: T('Un bloque de 4 kg está en un plano inclinado 30°. ¿Qué parte del peso lo hace bajar?', 'A 4 kg block is on a 30° slope. What part of its weight pulls it down the slope?', 'Un bloc de 4 kg és en un pla inclinat 30°. Quina part del pes el fa baixar?'),
      s: T('P · sen 30° = 4 · 9,8 · 0,5 = 19,6 N.', 'W · sin 30° = 4 · 9.8 · 0.5 = 19.6 N.', 'P · sin 30° = 4 · 9,8 · 0,5 = 19,6 N.') },
  ],
}

// ── PRESIÓN Y FLUIDOS ─────────────────────────────────────────────────────

const presionFluidos = {
  metaTitle: L('La presión y los fluidos: presión hidrostática, principio de Pascal y de Arquímedes — resumen y ejercicios', 'Pressure and fluids: pressure in liquids, Pascal’s and Archimedes’ principles — summary and practice questions', 'La pressió i els fluids: pressió hidrostàtica, principi de Pascal i d’Arquimedes — resum i exercicis'),
  secciones: [
    {
      titulo: L('Fórmulas', 'Formulas', 'Fórmules'),
      tabla: {
        columnas: L(['Magnitud', 'Fórmula', 'Unidad'], ['Quantity', 'Formula', 'Unit'], ['Magnitud', 'Fórmula', 'Unitat']),
        filas: [
          [L('Presión', 'Pressure', 'Pressió'), 'p = F / S', L('pascal (Pa) = N/m²', 'pascal (Pa) = N/m²', 'pascal (Pa) = N/m²')],
          [L('Presión hidrostática (en un líquido)', 'Pressure in a liquid', 'Pressió hidrostàtica (en un líquid)'), 'p = d · g · h', 'Pa'],
          [L('Principio de Pascal (prensa hidráulica)', 'Pascal’s principle (hydraulic press)', 'Principi de Pascal (premsa hidràulica)'), 'F₁ / S₁ = F₂ / S₂', 'N, m²'],
          [L('Empuje (principio de Arquímedes)', 'Upthrust (Archimedes’ principle)', 'Empenta (principi d’Arquimedes)'), L('E = d del líquido · g · V sumergido', 'U = density of liquid · g · V submerged', 'E = d del líquid · g · V submergit'), 'N'],
          [L('Presión atmosférica normal', 'Standard atmospheric pressure', 'Pressió atmosfèrica normal'), L('1 atm = 101.325 Pa = 760 mmHg', '1 atm = 101,325 Pa = 760 mmHg', '1 atm = 101.325 Pa = 760 mmHg'), 'Pa, atm, mmHg'],
        ],
      },
    },
    {
      titulo: L('Flotar o hundirse', 'Floating or sinking', 'Surar o enfonsar-se'),
      lista: L(
        ['Un cuerpo sumergido en un líquido recibe un empuje hacia arriba igual al peso del líquido que desaloja (Arquímedes).', 'Si el peso es mayor que el empuje máximo, se hunde; si es menor, flota y queda sumergido solo en parte. Equivale a comparar densidades: flota lo que es menos denso que el líquido.', 'Un cuerpo que flota tiene sumergida la fracción d cuerpo / d líquido: un hielo (0,92 g/cm³) en agua deja fuera solo un 8 %.', 'La presión en un líquido solo depende de la profundidad y de su densidad, no de la forma del recipiente: por eso los buzos notan más presión cuanto más bajan.'],
        ['An object immersed in a liquid gets an upward push equal to the weight of the liquid it displaces (Archimedes).', 'If its weight is greater than the maximum upthrust, it sinks; if smaller, it floats, only partly under. It is the same as comparing densities: anything less dense than the liquid floats.', 'A floating object has the fraction d object / d liquid under the surface: ice (0.92 g/cm³) in water leaves only 8 % showing.', 'Pressure in a liquid depends only on depth and density, not on the shape of the container: that is why divers feel more pressure the deeper they go.'],
        ['Un cos submergit en un líquid rep una empenta cap amunt igual al pes del líquid que desallotja (Arquimedes).', 'Si el pes és més gran que l’empenta màxima, s’enfonsa; si és més petit, sura i queda submergit només en part. Equival a comparar densitats: sura el que és menys dens que el líquid.', 'Un cos que sura té submergida la fracció d cos / d líquid: un glaçó (0,92 g/cm³) a l’aigua només en deixa fora un 8 %.', 'La pressió en un líquid només depèn de la profunditat i de la densitat, no de la forma del recipient: per això els bussos noten més pressió com més baixen.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Por qué un barco de hierro flota?', 'Why does an iron ship float?', 'Per què sura un vaixell de ferro?'),
      r: T('Porque es hueco: en conjunto (hierro más el aire de dentro) es menos denso que el agua, y desaloja tanta agua que el empuje iguala su peso. Una bola maciza del mismo hierro se hundiría.', 'Because it is hollow: overall (iron plus the air inside) it is less dense than water, and it displaces so much water that the upthrust equals its weight. A solid ball of the same iron would sink.', 'Perquè és buit: en conjunt (ferro més l’aire de dins) és menys dens que l’aigua, i desallotja tanta aigua que l’empenta iguala el pes. Una bola massissa del mateix ferro s’enfonsaria.') },
  ],
  ejercicios: [
    { e: T('Una persona de 600 N está de pie sobre 0,02 m² de suela. ¿Qué presión hace sobre el suelo?', 'A 600 N person stands on 0.02 m² of shoe sole. What pressure do they put on the floor?', 'Una persona de 600 N està dreta sobre 0,02 m² de sola. Quina pressió fa sobre el terra?'),
      s: T('p = 600 / 0,02 = 30.000 Pa. Con esquís (más superficie) la presión sería mucho menor y no se hundiría en la nieve.', 'p = 600 / 0.02 = 30,000 Pa. On skis (more area) the pressure would be much lower and they would not sink into the snow.', 'p = 600 / 0,02 = 30.000 Pa. Amb esquís (més superfície) la pressió seria molt menor i no s’enfonsaria a la neu.') },
    { e: T('¿Qué presión hace el agua a 10 m de profundidad? (d = 1.000 kg/m³)', 'What pressure does water exert at a depth of 10 m? (d = 1,000 kg/m³)', 'Quina pressió fa l’aigua a 10 m de fondària? (d = 1.000 kg/m³)'),
      s: T('p = 1.000 · 9,8 · 10 = 98.000 Pa: casi una atmósfera más, que se suma a la del aire.', 'p = 1,000 · 9.8 · 10 = 98,000 Pa: almost one extra atmosphere, on top of the air’s.', 'p = 1.000 · 9,8 · 10 = 98.000 Pa: gairebé una atmosfera més, que se suma a la de l’aire.') },
    { e: T('Un objeto de 0,002 m³ se sumerge entero en agua. ¿Qué empuje recibe? Si pesa 50 N, ¿cuánto «pesa» dentro del agua?', 'A 0.002 m³ object is fully immersed in water. What upthrust does it get? If it weighs 50 N, what does it «weigh» in the water?', 'Un objecte de 0,002 m³ se submergeix sencer a l’aigua. Quina empenta rep? Si pesa 50 N, quant «pesa» dins l’aigua?'),
      s: T('E = 1.000 · 9,8 · 0,002 = 19,6 N. Peso aparente = 50 − 19,6 = 30,4 N. Como el peso es mayor que el empuje, se hunde.', 'U = 1,000 · 9.8 · 0.002 = 19.6 N. Apparent weight = 50 − 19.6 = 30.4 N. As the weight is bigger than the upthrust, it sinks.', 'E = 1.000 · 9,8 · 0,002 = 19,6 N. Pes aparent = 50 − 19,6 = 30,4 N. Com que el pes és més gran que l’empenta, s’enfonsa.') },
    { e: T('En una prensa hidráulica, el émbolo pequeño mide 0,01 m² y el grande 0,5 m². Si se empuja el pequeño con 200 N, ¿qué fuerza hace el grande?', 'In a hydraulic press, the small piston is 0.01 m² and the large one 0.5 m². If you push the small one with 200 N, what force does the large one exert?', 'En una premsa hidràulica, l’èmbol petit fa 0,01 m² i el gran 0,5 m². Si s’empeny el petit amb 200 N, quina força fa el gran?'),
      s: T('F₂ = 200 · 0,5 / 0,01 = 10.000 N: la superficie es 50 veces mayor y la fuerza también.', 'F₂ = 200 · 0.5 / 0.01 = 10,000 N: the area is 50 times bigger, and so is the force.', 'F₂ = 200 · 0,5 / 0,01 = 10.000 N: la superfície és 50 vegades més gran i la força també.') },
  ],
}

// ── MOVIMIENTO CIRCULAR UNIFORME (se añade a «movimiento») ─────────────────

export const mcu = {
  seccion: {
    titulo: L('Movimiento circular uniforme (MCU)', 'Uniform circular motion', 'Moviment circular uniforme (MCU)'),
    tabla: {
      columnas: L(['Magnitud', 'Fórmula', 'Unidad'], ['Quantity', 'Formula', 'Unit'], ['Magnitud', 'Fórmula', 'Unitat']),
      filas: [
        [L('Velocidad angular', 'Angular velocity', 'Velocitat angular'), 'ω = φ / t', 'rad/s'],
        [L('Periodo (lo que tarda una vuelta)', 'Period (time for one turn)', 'Període (el que triga una volta)'), 'T = 2π / ω', 's'],
        [L('Frecuencia (vueltas por segundo)', 'Frequency (turns per second)', 'Freqüència (voltes per segon)'), 'f = 1 / T', L('hercio (Hz)', 'hertz (Hz)', 'hertz (Hz)')],
        [L('Velocidad lineal', 'Linear speed', 'Velocitat lineal'), 'v = ω · r', 'm/s'],
        [L('Aceleración centrípeta', 'Centripetal acceleration', 'Acceleració centrípeta'), 'a = v² / r', 'm/s²'],
      ],
    },
    texto: L(
      ['En el MCU la rapidez no cambia, pero la dirección sí: por eso hay aceleración, dirigida hacia el centro (centrípeta). Para pasar de revoluciones por minuto a rad/s se multiplica por 2π y se divide entre 60.'],
      ['In uniform circular motion the speed does not change, but the direction does: that is why there is an acceleration, pointing to the centre (centripetal). To convert revolutions per minute to rad/s, multiply by 2π and divide by 60.'],
      ['En el MCU la rapidesa no canvia, però la direcció sí: per això hi ha acceleració, dirigida cap al centre (centrípeta). Per passar de revolucions per minut a rad/s es multiplica per 2π i es divideix entre 60.'],
    ),
  },
  ejercicios: [
    { e: T('Una rueda de 0,5 m de radio gira a 30 rpm. Calcula ω, el periodo, la velocidad del borde y su aceleración centrípeta.', 'A wheel of radius 0.5 m turns at 30 rpm. Work out ω, the period, the speed of the rim and its centripetal acceleration.', 'Una roda de 0,5 m de radi gira a 30 rpm. Calcula ω, el període, la velocitat de la vora i l’acceleració centrípeta.'),
      s: T('ω = 30 · 2π / 60 = π ≈ 3,14 rad/s. T = 2π / π = 2 s. v = π · 0,5 ≈ 1,57 m/s. a = 1,57² / 0,5 ≈ 4,93 m/s².', 'ω = 30 · 2π / 60 = π ≈ 3.14 rad/s. T = 2π / π = 2 s. v = π · 0.5 ≈ 1.57 m/s. a = 1.57² / 0.5 ≈ 4.93 m/s².', 'ω = 30 · 2π / 60 = π ≈ 3,14 rad/s. T = 2π / π = 2 s. v = π · 0,5 ≈ 1,57 m/s. a = 1,57² / 0,5 ≈ 4,93 m/s².') },
  ],
}

// ── ESPAÑA EN EL SIGLO XIX ────────────────────────────────────────────────

const espanaXix = {
  metaTitle: L('España en el siglo XIX: Guerra de la Independencia, Constitución de 1812, Sexenio y Restauración — resumen', 'Spain in the 19th century: the Peninsular War, the 1812 Constitution and the Restoration — summary and questions', 'Espanya al segle XIX: Guerra del Francès, Constitució de 1812, Sexenni i Restauració — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las etapas del siglo', 'The stages of the century', 'Les etapes del segle'),
      tabla: {
        columnas: L(['Etapa', 'Fechas', 'Qué pasó'], ['Period', 'Dates', 'What happened'], ['Etapa', 'Dates', 'Què va passar']),
        filas: [
          [L('Guerra de la Independencia', 'Peninsular War (War of Independence)', 'Guerra del Francès (de la Independència)'), '1808-1814', L('Napoleón invade España y pone de rey a su hermano José I; los españoles resisten y en Cádiz se reúnen las Cortes', 'Napoleon invades Spain and makes his brother Joseph I king; Spaniards resist and the Cortes meet in Cádiz', 'Napoleó envaeix Espanya i hi posa de rei el seu germà Josep I; els espanyols resisteixen i a Cadis es reuneixen les Corts')],
          [L('Reinado de Fernando VII', 'Reign of Ferdinand VII', 'Regnat de Ferran VII'), '1814-1833', L('vuelve el absolutismo; Trienio Liberal (1820-1823); se independizan casi todas las colonias de América', 'absolutism returns; the Liberal Triennium (1820-1823); almost all the American colonies become independent', 'torna l’absolutisme; Trienni Liberal (1820-1823); s’independitzen gairebé totes les colònies d’Amèrica')],
          [L('Reinado de Isabel II', 'Reign of Isabella II', 'Regnat d’Isabel II'), '1833-1868', L('guerras carlistas; liberales moderados y progresistas; desamortización de Mendizábal (1836); acaba con la revolución de 1868, «la Gloriosa»', 'the Carlist Wars; moderate and progressive liberals; Mendizábal’s confiscation of Church lands (1836); it ends with the 1868 revolution, «la Gloriosa»', 'guerres carlines; liberals moderats i progressistes; desamortització de Mendizábal (1836); acaba amb la revolució de 1868, «la Gloriosa»')],
          [L('Sexenio Democrático', 'Democratic Sexennium', 'Sexenni Democràtic'), '1868-1874', L('Constitución de 1869; reinado de Amadeo I de Saboya (1871-1873); Primera República (1873-1874)', 'the 1869 Constitution; reign of Amadeo I of Savoy (1871-1873); the First Republic (1873-1874)', 'Constitució de 1869; regnat d’Amadeu I de Savoia (1871-1873); Primera República (1873-1874)')],
          [L('Restauración', 'Restoration', 'Restauració'), L('1874 en adelante', '1874 onwards', 'des del 1874'), L('vuelven los Borbones con Alfonso XII; Constitución de 1876; Cánovas y Sagasta se turnan en el gobierno; en 1898 se pierden Cuba, Puerto Rico y Filipinas', 'the Bourbons return with Alfonso XII; the 1876 Constitution; Cánovas and Sagasta take turns in government; in 1898 Cuba, Puerto Rico and the Philippines are lost', 'tornen els Borbons amb Alfons XII; Constitució de 1876; Cánovas i Sagasta es tornen al govern; el 1898 es perden Cuba, Puerto Rico i les Filipines')],
        ],
      },
    },
    {
      titulo: L('La Constitución de 1812, «la Pepa»', 'The 1812 Constitution, «la Pepa»', 'La Constitució de 1812, «la Pepa»'),
      lista: L(
        ['Se aprobó en Cádiz el 19 de marzo de 1812, día de San José: de ahí su apodo.', 'Soberanía nacional: el poder viene de la nación, no del rey.', 'División de poderes: legislativo (Cortes con el rey), ejecutivo (rey) y judicial (tribunales).', 'Sufragio universal masculino indirecto, igualdad ante la ley y libertad de imprenta; el catolicismo, religión oficial.', 'Apenas estuvo en vigor: Fernando VII la anuló en 1814, volvió en el Trienio Liberal y otra vez brevemente en 1836.'],
        ['It was approved in Cádiz on 19 March 1812, Saint Joseph’s day: hence its nickname.', 'National sovereignty: power comes from the nation, not the king.', 'Separation of powers: legislative (Cortes with the king), executive (king) and judicial (courts).', 'Indirect universal male suffrage, equality before the law and press freedom; Catholicism as the official religion.', 'It was hardly in force: Ferdinand VII annulled it in 1814; it returned in the Liberal Triennium and briefly again in 1836.'],
        ['Es va aprovar a Cadis el 19 de març de 1812, dia de Sant Josep: d’aquí el sobrenom.', 'Sobirania nacional: el poder ve de la nació, no del rei.', 'Divisió de poders: legislatiu (Corts amb el rei), executiu (rei) i judicial (tribunals).', 'Sufragi universal masculí indirecte, igualtat davant la llei i llibertat d’impremta; el catolicisme, religió oficial.', 'Gairebé no va ser vigent: Ferran VII la va anul·lar el 1814, va tornar al Trienni Liberal i un altre cop breument el 1836.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Qué fue el turnismo de la Restauración?', 'What was the turnismo of the Restoration?', 'Què va ser el torn de partits de la Restauració?'),
      r: T('Un sistema pactado por Cánovas (conservadores) y Sagasta (liberales) para alternarse en el gobierno. Las elecciones se amañaban con el caciquismo: los caciques de cada zona controlaban el voto para que ganase el partido al que le tocaba.', 'A system agreed by Cánovas (Conservatives) and Sagasta (Liberals) to take turns in government. Elections were rigged through caciquismo: local bosses controlled the vote so that the party whose turn it was would win.', 'Un sistema pactat per Cánovas (conservadors) i Sagasta (liberals) per alternar-se al govern. Les eleccions s’amanyaven amb el caciquisme: els cacics de cada zona controlaven el vot perquè guanyés el partit a qui tocava.') },
  ],
  ejercicios: [
    { e: T('Ordena: Primera República, Constitución de 1812, revolución de 1868, desastre del 98, Trienio Liberal.', 'Put in order: the First Republic, the 1812 Constitution, the 1868 revolution, the 1898 disaster, the Liberal Triennium.', 'Ordena: Primera República, Constitució de 1812, revolució de 1868, desastre del 98, Trienni Liberal.'),
      s: T('Constitución de 1812 → Trienio Liberal (1820-1823) → revolución de 1868 → Primera República (1873) → desastre del 98.', '1812 Constitution → Liberal Triennium (1820-1823) → 1868 revolution → First Republic (1873) → 1898 disaster.', 'Constitució de 1812 → Trienni Liberal (1820-1823) → revolució de 1868 → Primera República (1873) → desastre del 98.') },
    { e: T('¿Qué territorios perdió España en 1898 y frente a qué país?', 'Which territories did Spain lose in 1898, and to which country?', 'Quins territoris va perdre Espanya el 1898 i davant de quin país?'),
      s: T('Cuba, Puerto Rico y Filipinas, tras la guerra con Estados Unidos. Fue el fin del imperio colonial en América y Asia.', 'Cuba, Puerto Rico and the Philippines, after the war with the United States. It was the end of the colonial empire in America and Asia.', 'Cuba, Puerto Rico i les Filipines, després de la guerra amb els Estats Units. Va ser la fi de l’imperi colonial a Amèrica i Àsia.') },
    { e: T('Di dos principios liberales de la Constitución de 1812.', 'Give two liberal principles of the 1812 Constitution.', 'Digues dos principis liberals de la Constitució de 1812.'),
      s: T('Por ejemplo, la soberanía nacional y la división de poderes (también la igualdad ante la ley o la libertad de imprenta).', 'For example, national sovereignty and separation of powers (also equality before the law or press freedom).', 'Per exemple, la sobirania nacional i la divisió de poders (també la igualtat davant la llei o la llibertat d’impremta).') },
  ],
}

// ── LA ATMÓSFERA ──────────────────────────────────────────────────────────

const atmosfera = {
  metaTitle: L('La atmósfera: capas, composición, efecto invernadero y cambio climático — resumen y ejercicios', 'The atmosphere: layers, composition, the greenhouse effect and climate change — summary and practice questions', 'L’atmosfera: capes, composició, efecte hivernacle i canvi climàtic — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las capas de la atmósfera', 'The layers of the atmosphere', 'Les capes de l’atmosfera'),
      tabla: {
        columnas: L(['Capa', 'Altura (aprox.)', 'Qué pasa en ella'], ['Layer', 'Height (approx.)', 'What happens there'], ['Capa', 'Alçada (aprox.)', 'Què hi passa']),
        filas: [
          [L('Troposfera', 'Troposphere', 'Troposfera'), L('0-12 km (8 en los polos, 18 en el ecuador)', '0-12 km (8 at the poles, 18 at the equator)', '0-12 km (8 als pols, 18 a l’equador)'), L('aquí vivimos y hay nubes, lluvia y viento; la temperatura baja al subir', 'where we live, with clouds, rain and wind; temperature falls with height', 'aquí vivim i hi ha núvols, pluja i vent; la temperatura baixa en pujar')],
          [L('Estratosfera', 'Stratosphere', 'Estratosfera'), '12-50 km', L('la capa de ozono, que absorbe la radiación ultravioleta; la temperatura sube', 'the ozone layer, which absorbs ultraviolet radiation; temperature rises', 'la capa d’ozó, que absorbeix la radiació ultraviolada; la temperatura puja')],
          [L('Mesosfera', 'Mesosphere', 'Mesosfera'), '50-85 km', L('la capa más fría (unos −90 °C); los meteoritos se queman: estrellas fugaces', 'the coldest layer (about −90 °C); meteors burn up: shooting stars', 'la capa més freda (uns −90 °C); els meteorits es cremen: estels fugaços')],
          [L('Termosfera', 'Thermosphere', 'Termosfera'), L('85-600 km', '85-600 km', '85-600 km'), L('temperaturas muy altas, auroras polares; por aquí orbita la Estación Espacial', 'very high temperatures, polar auroras; the Space Station orbits here', 'temperatures molt altes, aurores polars; per aquí orbita l’Estació Espacial')],
          [L('Exosfera', 'Exosphere', 'Exosfera'), L('más de 600 km', 'above 600 km', 'més de 600 km'), L('el aire casi desaparece y da paso al espacio', 'the air almost vanishes and gives way to space', 'l’aire gairebé desapareix i dona pas a l’espai')],
        ],
      },
    },
    {
      titulo: L('De qué está hecho el aire', 'What air is made of', 'De què està fet l’aire'),
      tabla: {
        columnas: L(['Gas', 'Proporción'], ['Gas', 'Share'], ['Gas', 'Proporció']),
        filas: [
          [L('Nitrógeno (N₂)', 'Nitrogen (N₂)', 'Nitrogen (N₂)'), L('alrededor del 78 %', 'about 78 %', 'al voltant del 78 %')],
          [L('Oxígeno (O₂)', 'Oxygen (O₂)', 'Oxigen (O₂)'), L('alrededor del 21 %', 'about 21 %', 'al voltant del 21 %')],
          [L('Argón (Ar)', 'Argon (Ar)', 'Argó (Ar)'), L('casi el 1 %', 'almost 1 %', 'gairebé l’1 %')],
          [L('Dióxido de carbono (CO₂)', 'Carbon dioxide (CO₂)', 'Diòxid de carboni (CO₂)'), L('alrededor del 0,04 %, y subiendo', 'about 0.04 %, and rising', 'al voltant del 0,04 %, i pujant')],
          [L('Vapor de agua', 'Water vapour', 'Vapor d’aigua'), L('variable, según el lugar y el día', 'variable, depending on place and day', 'variable, segons el lloc i el dia')],
        ],
      },
      texto: L(
        ['El efecto invernadero es natural y necesario: el CO₂ y el vapor de agua retienen parte del calor que emite la Tierra, y sin ellos la temperatura media sería de unos −18 °C en lugar de unos 15 °C. El problema es que al quemar carbón, petróleo y gas añadimos CO₂, el efecto se refuerza y el planeta se calienta: es el cambio climático, con más olas de calor, sequías, deshielo y subida del nivel del mar.'],
        ['The greenhouse effect is natural and necessary: CO₂ and water vapour trap some of the heat the Earth gives off, and without them the average temperature would be about −18 °C instead of about 15 °C. The problem is that burning coal, oil and gas adds CO₂, the effect gets stronger and the planet warms: this is climate change, with more heatwaves, droughts, melting ice and rising sea levels.'],
        ['L’efecte hivernacle és natural i necessari: el CO₂ i el vapor d’aigua retenen part de la calor que emet la Terra, i sense ells la temperatura mitjana seria d’uns −18 °C en lloc d’uns 15 °C. El problema és que en cremar carbó, petroli i gas hi afegim CO₂, l’efecte es reforça i el planeta s’escalfa: és el canvi climàtic, amb més onades de calor, sequeres, desglaç i pujada del nivell del mar.'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Es lo mismo el agujero de la capa de ozono que el cambio climático?', 'Is the hole in the ozone layer the same as climate change?', 'És el mateix el forat de la capa d’ozó que el canvi climàtic?'),
      r: T('No. El agujero de ozono deja pasar más radiación ultravioleta y lo causaron unos gases (los CFC) que ya están prohibidos; se está recuperando poco a poco. El cambio climático lo causa el aumento de gases de efecto invernadero, sobre todo el CO₂.', 'No. The ozone hole lets more ultraviolet radiation through and was caused by gases (CFCs) that are now banned; it is slowly recovering. Climate change is caused by the rise in greenhouse gases, mainly CO₂.', 'No. El forat d’ozó deixa passar més radiació ultraviolada i el van causar uns gasos (els CFC) que ja estan prohibits; s’està recuperant a poc a poc. El canvi climàtic el causa l’augment de gasos d’efecte hivernacle, sobretot el CO₂.') },
  ],
  ejercicios: [
    { e: T('Ordena las capas de abajo arriba: mesosfera, troposfera, exosfera, estratosfera, termosfera.', 'Put the layers in order from the bottom up: mesosphere, troposphere, exosphere, stratosphere, thermosphere.', 'Ordena les capes de baix a dalt: mesosfera, troposfera, exosfera, estratosfera, termosfera.'),
      s: T('Troposfera → estratosfera → mesosfera → termosfera → exosfera.', 'Troposphere → stratosphere → mesosphere → thermosphere → exosphere.', 'Troposfera → estratosfera → mesosfera → termosfera → exosfera.') },
    { e: T('En 100 litros de aire, ¿cuántos litros hay más o menos de nitrógeno y de oxígeno?', 'In 100 litres of air, roughly how many litres are nitrogen and how many oxygen?', 'En 100 litres d’aire, quants litres hi ha més o menys de nitrogen i d’oxigen?'),
      s: T('Unos 78 L de nitrógeno y 21 L de oxígeno; el litro que falta es casi todo argón.', 'About 78 L of nitrogen and 21 L of oxygen; the remaining litre is almost all argon.', 'Uns 78 L de nitrogen i 21 L d’oxigen; el litre que falta és gairebé tot argó.') },
    { e: T('En la troposfera la temperatura baja unos 6,5 °C por kilómetro. Si a nivel del mar hay 20 °C, ¿qué temperatura habrá a 3 km?', 'In the troposphere temperature falls by about 6.5 °C per kilometre. If it is 20 °C at sea level, what will it be at 3 km?', 'A la troposfera la temperatura baixa uns 6,5 °C per quilòmetre. Si a nivell del mar hi ha 20 °C, quina temperatura hi haurà a 3 km?'),
      s: T('20 − 3 · 6,5 = 20 − 19,5 = 0,5 °C.', '20 − 3 · 6.5 = 20 − 19.5 = 0.5 °C.', '20 − 3 · 6,5 = 20 − 19,5 = 0,5 °C.') },
  ],
}

// ── FRANQUISMO Y TRANSICIÓN ───────────────────────────────────────────────

const franquismo = {
  metaTitle: L('El franquismo y la Transición española: etapas, Constitución de 1978 y 23-F — resumen y ejercicios', 'Francoism and the Spanish transition to democracy: stages, the 1978 Constitution and 23-F — summary and questions', 'El franquisme i la Transició espanyola: etapes, Constitució de 1978 i 23-F — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las etapas del franquismo', 'The stages of Francoism', 'Les etapes del franquisme'),
      tabla: {
        columnas: L(['Etapa', 'Fechas', 'Cómo fue'], ['Stage', 'Dates', 'What it was like'], ['Etapa', 'Dates', 'Com va ser']),
        filas: [
          [L('Posguerra y autarquía', 'Post-war years and autarky', 'Postguerra i autarquia'), '1939-1959', L('represión, hambre y cartillas de racionamiento (hasta 1952); aislamiento internacional que se rompe con los acuerdos con EE. UU. (1953) y la entrada en la ONU (1955)', 'repression, hunger and ration books (until 1952); international isolation, broken by the agreements with the USA (1953) and joining the UN (1955)', 'repressió, fam i cartilles de racionament (fins al 1952); aïllament internacional que es trenca amb els acords amb els EUA (1953) i l’entrada a l’ONU (1955)')],
          [L('Desarrollismo', 'Economic boom (desarrollismo)', 'Desenvolupisme'), '1959-1975', L('Plan de Estabilización (1959): crecimiento económico, turismo, emigración a Europa y éxodo del campo a las ciudades; la dictadura sigue', 'the 1959 Stabilisation Plan: economic growth, tourism, emigration to Europe and a move from countryside to cities; the dictatorship continues', 'Pla d’Estabilització (1959): creixement econòmic, turisme, emigració a Europa i èxode del camp a les ciutats; la dictadura continua')],
          [L('Final', 'The end', 'Final'), '1973-1975', L('ETA asesina a Carrero Blanco (1973); Franco muere el 20 de noviembre de 1975', 'ETA kills Carrero Blanco (1973); Franco dies on 20 November 1975', 'ETA assassina Carrero Blanco (1973); Franco mor el 20 de novembre de 1975')],
        ],
      },
    },
    {
      titulo: L('La Transición, paso a paso', 'The transition, step by step', 'La Transició, pas a pas'),
      tabla: {
        columnas: L(['Fecha', 'Qué pasó'], ['Date', 'What happened'], ['Data', 'Què va passar']),
        filas: [
          [L('22-11-1975', '22-11-1975', '22-11-1975'), L('Juan Carlos I es proclamado rey', 'Juan Carlos I is proclaimed king', 'Joan Carles I és proclamat rei')],
          [L('julio de 1976', 'July 1976', 'juliol de 1976'), L('Adolfo Suárez, presidente del Gobierno', 'Adolfo Suárez becomes prime minister', 'Adolfo Suárez, president del Govern')],
          [L('diciembre de 1976', 'December 1976', 'desembre de 1976'), L('referéndum de la Ley para la Reforma Política: las Cortes franquistas abren paso a la democracia', 'referendum on the Political Reform Act: the Francoist Cortes open the way to democracy', 'referèndum de la Llei per a la Reforma Política: les Corts franquistes obren pas a la democràcia')],
          [L('abril de 1977', 'April 1977', 'abril de 1977'), L('se legaliza el Partido Comunista', 'the Communist Party is legalised', 'es legalitza el Partit Comunista')],
          [L('15-6-1977', '15-6-1977', '15-6-1977'), L('primeras elecciones democráticas desde 1936; gana la UCD de Suárez', 'first democratic elections since 1936; Suárez’s UCD wins', 'primeres eleccions democràtiques des del 1936; guanya la UCD de Suárez')],
          [L('octubre de 1977', 'October 1977', 'octubre de 1977'), L('Pactos de la Moncloa, contra la crisis económica', 'the Moncloa Pacts, to tackle the economic crisis', 'Pactes de la Moncloa, contra la crisi econòmica')],
          [L('6-12-1978', '6-12-1978', '6-12-1978'), L('se aprueba en referéndum la Constitución', 'the Constitution is approved by referendum', 's’aprova en referèndum la Constitució')],
          [L('23-2-1981', '23-2-1981', '23-2-1981'), L('intento de golpe de Estado (23-F), que fracasa', 'attempted coup (23-F), which fails', 'intent de cop d’Estat (23-F), que fracassa')],
          [L('octubre de 1982', 'October 1982', 'octubre de 1982'), L('gana el PSOE de Felipe González: para muchos historiadores, fin de la Transición', 'Felipe González’s PSOE wins: for many historians, the end of the transition', 'guanya el PSOE de Felipe González: per a molts historiadors, fi de la Transició')],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Por qué el Día de la Constitución es el 6 de diciembre?', 'Why is Constitution Day on 6 December?', 'Per què el Dia de la Constitució és el 6 de desembre?'),
      r: T('Porque ese día de 1978 los españoles aprobaron la Constitución en referéndum. Las Cortes la habían aprobado antes, el 31 de octubre, y el rey la sancionó el 27 de diciembre.', 'Because on that day in 1978 Spaniards approved the Constitution by referendum. Parliament had passed it earlier, on 31 October, and the king signed it into law on 27 December.', 'Perquè aquell dia del 1978 els espanyols van aprovar la Constitució en referèndum. Les Corts l’havien aprovada abans, el 31 d’octubre, i el rei la va sancionar el 27 de desembre.') },
  ],
  ejercicios: [
    { e: T('Ordena: Pactos de la Moncloa, muerte de Franco, 23-F, primeras elecciones, referéndum de la Constitución.', 'Put in order: the Moncloa Pacts, Franco’s death, 23-F, the first elections, the Constitution referendum.', 'Ordena: Pactes de la Moncloa, mort de Franco, 23-F, primeres eleccions, referèndum de la Constitució.'),
      s: T('Muerte de Franco (1975) → primeras elecciones (junio de 1977) → Pactos de la Moncloa (octubre de 1977) → referéndum de la Constitución (1978) → 23-F (1981).', 'Franco’s death (1975) → first elections (June 1977) → Moncloa Pacts (October 1977) → Constitution referendum (1978) → 23-F (1981).', 'Mort de Franco (1975) → primeres eleccions (juny de 1977) → Pactes de la Moncloa (octubre de 1977) → referèndum de la Constitució (1978) → 23-F (1981).') },
    { e: T('¿Cuántos años gobernó Franco desde el final de la Guerra Civil (abril de 1939) hasta su muerte (noviembre de 1975)?', 'How many years did Franco rule from the end of the Civil War (April 1939) until his death (November 1975)?', 'Quants anys va governar Franco des del final de la Guerra Civil (abril de 1939) fins a la seva mort (novembre de 1975)?'),
      s: T('Unos 36 años y medio (de abril de 1939 a noviembre de 1975).', 'About 36 and a half years (April 1939 to November 1975).', 'Uns 36 anys i mig (d’abril de 1939 a novembre de 1975).') },
    { e: T('¿Qué fue la Ley para la Reforma Política y por qué fue importante?', 'What was the Political Reform Act and why did it matter?', 'Què va ser la Llei per a la Reforma Política i per què va ser important?'),
      s: T('Una ley de 1976, aprobada por las propias Cortes franquistas y en referéndum, que permitió elegir un parlamento democrático. Se pasó de la dictadura a la democracia «de la ley a la ley», sin romper con la legalidad.', 'A 1976 law, passed by the Francoist Cortes themselves and by referendum, that made it possible to elect a democratic parliament. Spain moved from dictatorship to democracy «from law to law», without breaking with legality.', 'Una llei del 1976, aprovada per les mateixes Corts franquistes i en referèndum, que va permetre escollir un parlament democràtic. Es va passar de la dictadura a la democràcia «de la llei a la llei», sense trencar amb la legalitat.') },
  ],
}

// ── LAS REACCIONES QUÍMICAS (página nueva) ────────────────────────────────

export const reaccionesQuimicas = {
  metaTitle: L('Las reacciones químicas: qué son, cómo se ajustan, tipos y ley de Lavoisier — resumen y ejercicios', 'Chemical reactions: what they are, how to balance them, types and Lavoisier’s law — summary and practice questions', 'Les reaccions químiques: què són, com s’ajusten, tipus i llei de Lavoisier — resum i exercicis'),
  metaDesc: L('Qué es una reacción química, en qué se diferencia de un cambio físico, cómo ajustar una ecuación, los tipos de reacciones y qué afecta a su velocidad. Con ejercicios resueltos.', 'What a chemical reaction is, how it differs from a physical change, how to balance an equation, the types of reaction and what affects their rate. With worked exercises.', 'Què és una reacció química, en què es diferencia d’un canvi físic, com ajustar una equació, els tipus de reaccions i què n’afecta la velocitat. Amb exercicis resolts.'),
  resumen: L(
    ['En una reacción química unas sustancias, los reactivos, se transforman en otras distintas, los productos: los átomos se separan y se vuelven a unir de otra forma. Se nota porque cambia el color, sale un gas, aparece un sólido, se desprende luz o calor. En un cambio físico, en cambio, la sustancia sigue siendo la misma (el hielo que se funde sigue siendo agua).', 'Las reacciones se escriben con ecuaciones químicas, y como los átomos no se crean ni se destruyen (ley de Lavoisier), tiene que haber los mismos átomos de cada elemento a los dos lados: por eso se ajustan, poniendo números delante de las fórmulas.'],
    ['In a chemical reaction, some substances, the reactants, turn into different ones, the products: atoms come apart and join up again in a new way. You can tell because the colour changes, a gas is given off, a solid appears, or light or heat is released. In a physical change, by contrast, the substance stays the same (melting ice is still water).', 'Reactions are written as chemical equations, and since atoms are neither created nor destroyed (Lavoisier’s law), there must be the same atoms of each element on both sides: that is why equations are balanced, by putting numbers in front of the formulas.'],
    ['En una reacció química unes substàncies, els reactius, es transformen en altres de diferents, els productes: els àtoms se separen i es tornen a unir d’una altra manera. Es nota perquè canvia el color, surt un gas, apareix un sòlid, es desprèn llum o calor. En un canvi físic, en canvi, la substància continua sent la mateixa (el gel que es fon continua sent aigua).', 'Les reaccions s’escriuen amb equacions químiques, i com que els àtoms no es creen ni es destrueixen (llei de Lavoisier), hi ha d’haver els mateixos àtoms de cada element als dos costats: per això s’ajusten, posant nombres davant de les fórmules.'],
  ),
  puntosClave: L(
    ['Reactivos → productos.', 'Ley de Lavoisier: la masa de los reactivos es igual a la de los productos.', 'Para ajustar se cambian los coeficientes (los números de delante), nunca los subíndices.', 'Tipos: síntesis, descomposición, sustitución, combustión y neutralización.', 'Van más deprisa con más temperatura, más concentración, más superficie de contacto o un catalizador.', 'Exotérmicas desprenden calor; endotérmicas lo absorben.'],
    ['Reactants → products.', 'Lavoisier’s law: the mass of the reactants equals the mass of the products.', 'To balance, change the coefficients (the numbers in front), never the subscripts.', 'Types: synthesis, decomposition, displacement, combustion and neutralisation.', 'They go faster with higher temperature, higher concentration, more surface area or a catalyst.', 'Exothermic reactions give out heat; endothermic ones take it in.'],
    ['Reactius → productes.', 'Llei de Lavoisier: la massa dels reactius és igual a la dels productes.', 'Per ajustar es canvien els coeficients (els nombres del davant), mai els subíndexs.', 'Tipus: síntesi, descomposició, substitució, combustió i neutralització.', 'Van més de pressa amb més temperatura, més concentració, més superfície de contacte o un catalitzador.', 'Les exotèrmiques desprenen calor; les endotèrmiques l’absorbeixen.'],
  ),
  secciones: [
    {
      titulo: L('Tipos de reacciones', 'Types of reaction', 'Tipus de reaccions'),
      tabla: {
        columnas: L(['Tipo', 'Esquema', 'Ejemplo ajustado'], ['Type', 'Pattern', 'Balanced example'], ['Tipus', 'Esquema', 'Exemple ajustat']),
        filas: [
          [L('Síntesis', 'Synthesis', 'Síntesi'), 'A + B → AB', '2 H₂ + O₂ → 2 H₂O'],
          [L('Descomposición', 'Decomposition', 'Descomposició'), 'AB → A + B', '2 H₂O → 2 H₂ + O₂'],
          [L('Sustitución', 'Displacement', 'Substitució'), 'A + BC → AC + B', 'Zn + 2 HCl → ZnCl₂ + H₂'],
          [L('Combustión', 'Combustion', 'Combustió'), L('combustible + O₂ → CO₂ + H₂O', 'fuel + O₂ → CO₂ + H₂O', 'combustible + O₂ → CO₂ + H₂O'), 'CH₄ + 2 O₂ → CO₂ + 2 H₂O'],
          [L('Neutralización', 'Neutralisation', 'Neutralització'), L('ácido + base → sal + agua', 'acid + base → salt + water', 'àcid + base → sal + aigua'), 'HCl + NaOH → NaCl + H₂O'],
        ],
      },
    },
    {
      titulo: L('Cómo ajustar una ecuación', 'How to balance an equation', 'Com ajustar una equació'),
      lista: L(
        ['Cuenta los átomos de cada elemento a cada lado.', 'Ajusta primero los elementos que aparecen en una sola sustancia de cada lado; deja para el final el hidrógeno y el oxígeno.', 'Pon coeficientes delante de las fórmulas; no toques los subíndices, porque cambiarías la sustancia (H₂O no es H₂O₂).', 'Comprueba al final que todo cuadra. Ejemplo: CH₄ + O₂ → CO₂ + H₂O se ajusta como CH₄ + 2 O₂ → CO₂ + 2 H₂O (1 C, 4 H y 4 O a cada lado).'],
        ['Count the atoms of each element on each side.', 'Balance first the elements that appear in only one substance on each side; leave hydrogen and oxygen until last.', 'Put coefficients in front of the formulas; do not touch the subscripts, as that changes the substance (H₂O is not H₂O₂).', 'Check at the end that everything matches. Example: CH₄ + O₂ → CO₂ + H₂O balances as CH₄ + 2 O₂ → CO₂ + 2 H₂O (1 C, 4 H and 4 O on each side).'],
        ['Compta els àtoms de cada element a cada costat.', 'Ajusta primer els elements que apareixen en una sola substància de cada costat; deixa per al final l’hidrogen i l’oxigen.', 'Posa coeficients davant de les fórmules; no toquis els subíndexs, perquè canviaries la substància (H₂O no és H₂O₂).', 'Comprova al final que tot quadra. Exemple: CH₄ + O₂ → CO₂ + H₂O s’ajusta com CH₄ + 2 O₂ → CO₂ + 2 H₂O (1 C, 4 H i 4 O a cada costat).'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Cómo sé si un cambio es físico o químico?', 'How can I tell whether a change is physical or chemical?', 'Com sé si un canvi és físic o químic?'),
      r: T('Pregúntate si al final hay una sustancia nueva. Fundir, hervir, disolver o romper son cambios físicos: la sustancia sigue siendo la misma. Quemar, oxidarse, cocinar o fermentar son químicos: aparecen sustancias distintas, y normalmente no se puede volver atrás fácilmente.', 'Ask yourself whether there is a new substance at the end. Melting, boiling, dissolving or breaking are physical changes: the substance stays the same. Burning, rusting, cooking or fermenting are chemical: new substances appear, and you usually cannot easily go back.', 'Pregunta’t si al final hi ha una substància nova. Fondre, bullir, dissoldre o trencar són canvis físics: la substància continua sent la mateixa. Cremar, oxidar-se, cuinar o fermentar són químics: apareixen substàncies diferents, i normalment no es pot tornar enrere fàcilment.') },
  ],
  ejercicios: [
    { e: T('Ajusta: H₂ + O₂ → H₂O.', 'Balance: H₂ + O₂ → H₂O.', 'Ajusta: H₂ + O₂ → H₂O.'),
      s: T('2 H₂ + O₂ → 2 H₂O. Comprobación: 4 H y 2 O a cada lado.', '2 H₂ + O₂ → 2 H₂O. Check: 4 H and 2 O on each side.', '2 H₂ + O₂ → 2 H₂O. Comprovació: 4 H i 2 O a cada costat.') },
    { e: T('Ajusta: N₂ + H₂ → NH₃.', 'Balance: N₂ + H₂ → NH₃.', 'Ajusta: N₂ + H₂ → NH₃.'),
      s: T('N₂ + 3 H₂ → 2 NH₃. Comprobación: 2 N y 6 H a cada lado.', 'N₂ + 3 H₂ → 2 NH₃. Check: 2 N and 6 H on each side.', 'N₂ + 3 H₂ → 2 NH₃. Comprovació: 2 N i 6 H a cada costat.') },
    { e: T('Ajusta la combustión del propano: C₃H₈ + O₂ → CO₂ + H₂O.', 'Balance the combustion of propane: C₃H₈ + O₂ → CO₂ + H₂O.', 'Ajusta la combustió del propà: C₃H₈ + O₂ → CO₂ + H₂O.'),
      s: T('Primero el C (3 CO₂), después el H (4 H₂O) y por último el O: 3 · 2 + 4 = 10 átomos → 5 O₂. Queda C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.', 'First C (3 CO₂), then H (4 H₂O) and finally O: 3 · 2 + 4 = 10 atoms → 5 O₂. Result: C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.', 'Primer el C (3 CO₂), després l’H (4 H₂O) i per acabar l’O: 3 · 2 + 4 = 10 àtoms → 5 O₂. Queda C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.') },
    { e: T('Si 12 g de carbono reaccionan con 32 g de oxígeno, ¿cuánto CO₂ se forma?', 'If 12 g of carbon react with 32 g of oxygen, how much CO₂ forms?', 'Si 12 g de carboni reaccionen amb 32 g d’oxigen, quant CO₂ es forma?'),
      s: T('44 g, por la ley de Lavoisier: la masa total no cambia (12 + 32 = 44).', '44 g, by Lavoisier’s law: total mass does not change (12 + 32 = 44).', '44 g, per la llei de Lavoisier: la massa total no canvia (12 + 32 = 44).') },
    { e: T('¿Físico o químico? a) Fundir hielo. b) Quemar papel. c) Oxidarse un clavo. d) Disolver sal en agua.', 'Physical or chemical? a) Melting ice. b) Burning paper. c) A nail rusting. d) Dissolving salt in water.', 'Físic o químic? a) Fondre gel. b) Cremar paper. c) Oxidar-se un clau. d) Dissoldre sal en aigua.'),
      s: T('a) Físico. b) Químico. c) Químico. d) Físico (si se evapora el agua, la sal sigue ahí).', 'a) Physical. b) Chemical. c) Chemical. d) Physical (if the water evaporates, the salt is still there).', 'a) Físic. b) Químic. c) Químic. d) Físic (si s’evapora l’aigua, la sal continua allà).') },
  ],
}

export const AMPLIACION_T5 = { energia, dinamica, 'presion-fluidos': presionFluidos, 'espana-xix': espanaXix, 'atmosfera-clima': atmosfera, franquismo }
