// Presión y fluidos — el bloque de física que no estaba en ninguna parte
//
// Antes de escribirlo se buscó "presión" en los quince bancos de ciencias del
// repo: cero ocurrencias. Ni en fuerzas, ni en energía, ni en estados de la
// materia. Es de los pocos bloques del temario de ESO que no tocaba nada de lo
// que ya había, y por eso se eligió: cinemática, que era el otro candidato,
// habría duplicado media docena de preguntas de MRU y MRUA que fuerzas.js ya
// tiene.
//
// Los cálculos con números salen redondos a propósito (superficies de 2 m²,
// 0,01 m², 0,02 m²): la pregunta es si se entiende que la presión reparte la
// fuerza entre la superficie, no si se sabe dividir 47 entre 3,8. Cada
// resultado se comprobó con una calculadora aparte antes de escribirlo —una
// división mal hecha es JavaScript perfectamente válido y no la caza ni el
// lint ni ningún test.
//
// La densidad del agua se toma como 1000 kg/m³ y g como 10 N/kg, que es el
// convenio de los libros de ESO. En bachillerato g = 9,8; donde importa, la
// pregunta lo dice.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── QUÉ ES LA PRESIÓN ───────────────────────────────────────────────────
  q('pf-01', 'primaria',
    { es: '¿Por qué un cuchillo afilado corta mejor que uno romo, aunque hagas la misma fuerza?', en: 'Why does a sharp knife cut better than a blunt one, with the same force?', ca: 'Per què un ganivet esmolat talla millor que un d\'espuntat, amb la mateixa força?' },
    { es: ['Porque concentra la fuerza en una superficie mucho menor', 'Porque el metal afilado es más duro', 'Porque pesa menos', 'Porque se calienta más'], en: ['Because it concentrates the force on a much smaller area', 'Because sharp metal is harder', 'Because it weighs less', 'Because it heats up more'], ca: ['Perquè concentra la força en una superfície molt menor', 'Perquè el metall esmolat és més dur', 'Perquè pesa menys', 'Perquè s\'escalfa més'] },
    { es: 'Porque concentra la fuerza en una superficie mucho menor', en: 'Because it concentrates the force on a much smaller area', ca: 'Perquè concentra la força en una superfície molt menor' },
    '🔪',
    { es: 'La presión es fuerza dividida entre superficie. Afilar no añade fuerza: reduce la superficie sobre la que se reparte, y con la misma fuerza la presión se dispara. Por eso afilar un cuchillo lo hace cortar más sin que tú empujes más.', en: 'Pressure is force divided by area. Sharpening adds no force: it shrinks the area the force spreads over, so with the same force the pressure shoots up.', ca: 'La pressió és força dividida per superfície. Esmolar no afegeix força: redueix la superfície on es reparteix.' }),

  q('pf-02', 'primaria',
    { es: '¿Cuál es la unidad de presión en el Sistema Internacional?', en: 'What is the SI unit of pressure?', ca: 'Quina és la unitat de pressió al Sistema Internacional?' },
    { es: ['El pascal (Pa)', 'El newton (N)', 'El julio (J)', 'El vatio (W)'], en: ['The pascal (Pa)', 'The newton (N)', 'The joule (J)', 'The watt (W)'], ca: ['El pascal (Pa)', 'El newton (N)', 'El joule (J)', 'El watt (W)'] },
    { es: 'El pascal (Pa)', en: 'The pascal (Pa)', ca: 'El pascal (Pa)' },
    '📏',
    { es: 'Un pascal es un newton repartido sobre un metro cuadrado. Es una unidad pequeñísima: la presión atmosférica son unos 101.000 Pa, por eso se habla de hectopascales o de bares en la práctica.', en: 'One pascal is one newton spread over one square metre. It is a tiny unit: atmospheric pressure is about 101,000 Pa, which is why hectopascals or bars are used in practice.', ca: 'Un pascal és un newton repartit sobre un metre quadrat. És una unitat petitíssima.' }),

  q('pf-03', 'primaria',
    { es: '¿Por qué las raquetas de nieve evitan que te hundas?', en: 'Why do snowshoes stop you sinking?', ca: 'Per què les raquetes de neu eviten que t\'enfonsis?' },
    { es: ['Porque reparten tu peso en mucha más superficie y bajan la presión', 'Porque pesan menos que las botas', 'Porque la nieve se congela debajo', 'Porque te empujan hacia arriba'], en: ['Because they spread your weight over much more area, lowering the pressure', 'Because they weigh less than boots', 'Because the snow freezes underneath', 'Because they push you upwards'], ca: ['Perquè reparteixen el teu pes en molta més superfície i baixen la pressió', 'Perquè pesen menys que les botes', 'Perquè la neu es congela a sota', 'Perquè t\'empenyen cap amunt'] },
    { es: 'Porque reparten tu peso en mucha más superficie y bajan la presión', en: 'Because they spread your weight over much more area, lowering the pressure', ca: 'Perquè reparteixen el teu pes en molta més superfície i baixen la pressió' },
    '🎿',
    { es: 'Sigues pesando lo mismo: lo que cambia es la superficie de apoyo. Es el mismo truco al revés que el del cuchillo — allí interesa mucha presión y aquí interesa poquísima. Los camellos tienen las patas anchas por la misma razón en la arena.', en: 'You still weigh the same: what changes is the contact area. It is the knife trick in reverse — there you want high pressure, here you want as little as possible.', ca: 'Segueixes pesant el mateix: el que canvia és la superfície de suport. És el truc del ganivet a l\'inrevés.' }),

  q('pf-04', 'primaria',
    { es: 'Un bloque pesa 100 N y apoya sobre una superficie de 2 m². ¿Qué presión ejerce?', en: 'A block weighs 100 N and rests on a 2 m² area. What pressure does it exert?', ca: 'Un bloc pesa 100 N i recolza sobre una superfície de 2 m². Quina pressió exerceix?' },
    { es: ['50 Pa', '200 Pa', '100 Pa', '2 Pa'], en: ['50 Pa', '200 Pa', '100 Pa', '2 Pa'], ca: ['50 Pa', '200 Pa', '100 Pa', '2 Pa'] },
    { es: '50 Pa', en: '50 Pa', ca: '50 Pa' },
    '🧱',
    { es: 'P = F / S = 100 N ÷ 2 m² = 50 Pa. La fuerza se REPARTE entre la superficie, así que se divide. Si multiplicaras te saldría 200 Pa, que es el error clásico: cuanta más superficie, MENOS presión.', en: 'P = F / A = 100 N ÷ 2 m² = 50 Pa. The force is SPREAD over the area, so you divide. Multiplying gives 200 Pa, the classic slip: more area means LESS pressure.', ca: 'P = F / S = 100 N ÷ 2 m² = 50 Pa. La força es REPARTEIX entre la superfície, per tant es divideix.' }),

  q('pf-05', 'primaria',
    { es: 'Si apoyas el mismo bloque sobre una cara más pequeña, ¿qué le pasa a la presión?', en: 'If you rest the same block on a smaller face, what happens to the pressure?', ca: 'Si recolzes el mateix bloc sobre una cara més petita, què li passa a la pressió?' },
    { es: ['Aumenta, porque la misma fuerza se reparte en menos superficie', 'Disminuye', 'No cambia, porque el peso es el mismo', 'Se hace cero'], en: ['It increases, because the same force spreads over less area', 'It decreases', 'It stays the same, since the weight is the same', 'It becomes zero'], ca: ['Augmenta, perquè la mateixa força es reparteix en menys superfície', 'Disminueix', 'No canvia, perquè el pes és el mateix', 'Es fa zero'] },
    { es: 'Aumenta, porque la misma fuerza se reparte en menos superficie', en: 'It increases, because the same force spreads over less area', ca: 'Augmenta, perquè la mateixa força es reparteix en menys superfície' },
    '⬇️',
    { es: 'El peso no cambia al girar el bloque, pero la presión sí. Es lo que hace que un mismo objeto se hunda en la arena de canto y no de plano.', en: 'The weight does not change when you turn the block, but the pressure does. That is why the same object sinks into sand on its edge but not flat.', ca: 'El pes no canvia en girar el bloc, però la pressió sí.' }),

  q('pf-06', 'primaria',
    { es: '¿Por qué las chinchetas y los clavos tienen la punta muy fina?', en: 'Why do drawing pins and nails have a very fine point?', ca: 'Per què les xinxetes i els claus tenen la punta molt fina?' },
    { es: ['Para que una fuerza pequeña produzca una presión enorme en la punta', 'Para que pesen menos', 'Para que entren más despacio', 'Para que no se doblen'], en: ['So a small force produces enormous pressure at the tip', 'So they weigh less', 'So they go in more slowly', 'So they do not bend'] , ca: ['Perquè una força petita produeixi una pressió enorme a la punta', 'Perquè pesin menys', 'Perquè entrin més a poc a poc', 'Perquè no es dobleguin'] },
    { es: 'Para que una fuerza pequeña produzca una presión enorme en la punta', en: 'So a small force produces enormous pressure at the tip', ca: 'Perquè una força petita produeixi una pressió enorme a la punta' },
    '📌',
    { es: 'La cabeza es ancha para que tu dedo aguante sin dolor y la punta finísima para que ahí la presión sea brutal. La misma fuerza, dos superficies distintas y dos efectos opuestos en el mismo objeto.', en: 'The head is wide so your finger does not hurt and the tip is razor-thin so the pressure there is brutal. Same force, two areas, two opposite effects in one object.', ca: 'El cap és ample perquè el teu dit aguanti i la punta finíssima perquè allà la pressió sigui brutal.' }),

  // ── PRESIÓN EN LÍQUIDOS ─────────────────────────────────────────────────
  q('pf-07', 'primaria',
    { es: 'Al bucear, ¿qué pasa con la presión a medida que bajas?', en: 'When diving, what happens to pressure as you go deeper?', ca: 'En bussejar, què passa amb la pressió a mesura que baixes?' },
    { es: ['Aumenta cuanto más profundo estás', 'Disminuye', 'Se mantiene igual a cualquier profundidad', 'Solo aumenta si el agua está fría'], en: ['It increases the deeper you go', 'It decreases', 'It stays the same at any depth', 'It only rises if the water is cold'], ca: ['Augmenta com més profund estàs', 'Disminueix', 'Es manté igual a qualsevol profunditat', 'Només augmenta si l\'aigua és freda'] },
    { es: 'Aumenta cuanto más profundo estás', en: 'It increases the deeper you go', ca: 'Augmenta com més profund estàs' },
    '🤿',
    { es: 'Encima de ti hay cada vez más agua, y todo ese peso empuja. Por eso duelen los oídos al bajar: la presión de fuera crece y la de dentro del oído todavía no.', en: 'There is more and more water above you, and all that weight pushes down. That is why your ears hurt going down: outside pressure grows and your ear has not caught up.', ca: 'A sobre teu hi ha cada cop més aigua, i tot aquest pes empeny.' }),

  q('pf-08', 'primaria',
    { es: '¿Hacia dónde empuja la presión de un líquido sobre un objeto sumergido?', en: 'In which direction does a liquid press on a submerged object?', ca: 'Cap a on empeny la pressió d\'un líquid sobre un objecte submergit?' },
    { es: ['En todas direcciones', 'Solo hacia abajo', 'Solo hacia arriba', 'Solo hacia los lados'], en: ['In every direction', 'Only downwards', 'Only upwards', 'Only sideways'], ca: ['En totes direccions', 'Només cap avall', 'Només cap amunt', 'Només cap als costats'] },
    { es: 'En todas direcciones', en: 'In every direction', ca: 'En totes direccions' },
    '🔄',
    { es: 'Un fluido aprieta por todos lados a la vez, no solo desde arriba. Es lo que distingue la presión de un líquido del peso de una piedra encima: la piedra empuja hacia abajo y el agua, también contra los costados y desde debajo.', en: 'A fluid squeezes from all sides at once, not just from above. That is what tells liquid pressure apart from the weight of a rock on top.', ca: 'Un fluid pitja per tots costats alhora, no només des de dalt.' }),

  q('pf-09', 'eso',
    { es: 'Dos recipientes de formas muy distintas se llenan de agua hasta la misma altura. ¿Dónde es mayor la presión en el fondo?', en: 'Two very differently shaped containers are filled with water to the same height. Where is the pressure at the bottom greater?', ca: 'Dos recipients de formes molt diferents s\'omplen d\'aigua fins a la mateixa alçada. On és major la pressió al fons?' },
    { es: ['Es la misma en los dos: solo depende de la altura', 'En el más ancho, que tiene más agua', 'En el más estrecho', 'En el que pese más'], en: ['The same in both: it only depends on height', 'In the wider one, which holds more water', 'In the narrower one', 'In whichever weighs more'], ca: ['És la mateixa als dos: només depèn de l\'alçada', 'Al més ample, que té més aigua', 'Al més estret', 'Al que pesi més'] },
    { es: 'Es la misma en los dos: solo depende de la altura', en: 'The same in both: it only depends on height', ca: 'És la mateixa als dos: només depèn de l\'alçada' },
    '🏺',
    { es: 'Es la paradoja hidrostática y sorprende a todo el mundo: la presión en el fondo depende de la ALTURA del líquido y de su densidad, no de cuántos litros haya. Un tubo finísimo de dos metros da la misma presión en el fondo que una piscina de dos metros.', en: 'This is the hydrostatic paradox: pressure at the bottom depends on the HEIGHT of the liquid and its density, not on how many litres there are. A very thin two-metre tube gives the same bottom pressure as a two-metre pool.', ca: 'És la paradoxa hidrostàtica: la pressió al fons depèn de l\'ALÇADA del líquid i de la seva densitat, no de quants litres hi hagi.' }),

  q('pf-10', 'eso',
    { es: '¿Qué presión ejerce el agua a 10 m de profundidad? (densidad 1000 kg/m³, g = 10 N/kg)', en: 'What pressure does water exert at 10 m depth? (density 1000 kg/m³, g = 10 N/kg)', ca: 'Quina pressió exerceix l\'aigua a 10 m de profunditat? (densitat 1000 kg/m³, g = 10 N/kg)' },
    { es: ['100.000 Pa', '10.000 Pa', '1.000 Pa', '1.000.000 Pa'], en: ['100,000 Pa', '10,000 Pa', '1,000 Pa', '1,000,000 Pa'], ca: ['100.000 Pa', '10.000 Pa', '1.000 Pa', '1.000.000 Pa'] },
    { es: '100.000 Pa', en: '100,000 Pa', ca: '100.000 Pa' },
    '🌊',
    { es: 'P = d · g · h = 1000 · 10 · 10 = 100.000 Pa. Y ese número no es casualidad: es aproximadamente una atmósfera. Cada 10 metros de agua añaden una atmósfera entera, que es la regla que usan los buceadores.', en: 'P = d · g · h = 1000 · 10 · 10 = 100,000 Pa. That number is no coincidence: it is roughly one atmosphere. Every 10 metres of water adds a whole atmosphere, the rule divers use.', ca: 'P = d · g · h = 1000 · 10 · 10 = 100.000 Pa, que és aproximadament una atmosfera.' }),

  q('pf-11', 'eso',
    { es: 'En la fórmula P = d · g · h de la presión hidrostática, ¿qué es h?', en: 'In the hydrostatic pressure formula P = d · g · h, what is h?', ca: 'A la fórmula P = d · g · h de la pressió hidrostàtica, què és h?' },
    { es: ['La profundidad a la que estás, medida desde la superficie', 'La altura total del recipiente', 'La anchura del recipiente', 'La altura del objeto sumergido'], en: ['The depth you are at, measured from the surface', 'The total height of the container', 'The width of the container', 'The height of the submerged object'], ca: ['La profunditat on ets, mesurada des de la superfície', 'L\'alçada total del recipient', 'L\'amplada del recipient', 'L\'alçada de l\'objecte submergit'] },
    { es: 'La profundidad a la que estás, medida desde la superficie', en: 'The depth you are at, measured from the surface', ca: 'La profunditat on ets, mesurada des de la superfície' },
    '📐',
    { es: 'Es la columna de líquido que tienes ENCIMA. Por eso a media altura de un depósito la presión es la mitad que en el fondo, aunque el depósito sea el mismo.', en: 'It is the column of liquid ABOVE you. That is why halfway up a tank the pressure is half what it is at the bottom, in the very same tank.', ca: 'És la columna de líquid que tens A SOBRE.' }),

  q('pf-12', 'eso',
    { es: 'Un submarino baja de 10 m a 20 m. ¿Cómo cambia la presión del agua sobre él?', en: 'A submarine goes from 10 m to 20 m deep. How does the water pressure on it change?', ca: 'Un submarí baixa de 10 m a 20 m. Com canvia la pressió de l\'aigua sobre ell?' },
    { es: ['Se duplica, porque la profundidad se duplica', 'Se cuadruplica', 'No cambia', 'Se reduce a la mitad'], en: ['It doubles, because the depth doubles', 'It quadruples', 'It does not change', 'It halves'], ca: ['Es duplica, perquè la profunditat es duplica', 'Es quadruplica', 'No canvia', 'Es redueix a la meitat'] },
    { es: 'Se duplica, porque la profundidad se duplica', en: 'It doubles, because the depth doubles', ca: 'Es duplica, perquè la profunditat es duplica' },
    '🚢',
    { es: 'La presión hidrostática crece en proporción directa a la profundidad: al doble de hondo, el doble de presión. No se cuadruplica — eso pasaría si la fórmula llevara h al cuadrado, y no lo lleva.', en: 'Hydrostatic pressure grows in direct proportion to depth: twice as deep, twice the pressure. It does not quadruple — that would need h squared, and it is not squared.', ca: 'La pressió hidrostàtica creix en proporció directa a la profunditat.' }),

  q('pf-13', 'eso',
    { es: 'En unos vasos comunicantes de formas distintas, ¿a qué altura queda el líquido?', en: 'In communicating vessels of different shapes, what level does the liquid settle at?', ca: 'En uns vasos comunicants de formes diferents, a quina alçada queda el líquid?' },
    { es: ['A la misma altura en todos', 'Más alto en el vaso más estrecho', 'Más alto en el más ancho', 'Depende del orden en que se llenen'], en: ['At the same height in all of them', 'Higher in the narrowest one', 'Higher in the widest one', 'It depends on the filling order'], ca: ['A la mateixa alçada en tots', 'Més alt al vas més estret', 'Més alt al més ample', 'Depèn de l\'ordre en què s\'omplin'] },
    { es: 'A la misma altura en todos', en: 'At the same height in all of them', ca: 'A la mateixa alçada en tots' },
    '⚗️',
    { es: 'Es la consecuencia directa de que la presión dependa solo de la altura: si en un lado subiera más, habría más presión abajo por ese lado y el líquido se movería hasta igualarlo. Es el principio del nivel de agua de albañil y de los depósitos de las casas.', en: 'It follows directly from pressure depending only on height: if one side were higher there would be more pressure below on that side and the liquid would move until it evened out.', ca: 'És la conseqüència directa que la pressió depengui només de l\'alçada.' }),

  // ── PRINCIPIO DE PASCAL ─────────────────────────────────────────────────
  q('pf-14', 'eso',
    { es: '¿Qué dice el principio de Pascal?', en: 'What does Pascal\'s principle say?', ca: 'Què diu el principi de Pascal?' },
    { es: ['La presión aplicada a un líquido encerrado se transmite íntegra a todos sus puntos', 'Los líquidos empujan hacia arriba a los cuerpos sumergidos', 'La presión disminuye con la altura', 'Todo cuerpo sumergido desplaza su volumen'], en: ['Pressure applied to an enclosed liquid is transmitted undiminished to every point', 'Liquids push submerged bodies upwards', 'Pressure falls with height', 'Every submerged body displaces its volume'], ca: ['La pressió aplicada a un líquid tancat es transmet íntegra a tots els seus punts', 'Els líquids empenyen cap amunt els cossos submergits', 'La pressió disminueix amb l\'alçada', 'Tot cos submergit desplaça el seu volum'] },
    { es: 'La presión aplicada a un líquido encerrado se transmite íntegra a todos sus puntos', en: 'Pressure applied to an enclosed liquid is transmitted undiminished to every point', ca: 'La pressió aplicada a un líquid tancat es transmet íntegra a tots els seus punts' },
    '🔧',
    { es: 'Un líquido no se comprime, así que si aprietas por un sitio, ese apretón llega entero a todas partes. Es lo que hace posibles los frenos del coche: pisas un pedal y las cuatro ruedas frenan a la vez.', en: 'A liquid does not compress, so if you squeeze at one point the squeeze arrives whole everywhere. It is what makes car brakes possible: you press one pedal and all four wheels brake at once.', ca: 'Un líquid no es comprimeix, així que si pitges per un lloc, aquesta pressió arriba sencera a tot arreu.' }),

  q('pf-15', 'eso',
    { es: '¿Por qué una prensa hidráulica levanta un coche con poca fuerza?', en: 'Why can a hydraulic press lift a car with little force?', ca: 'Per què una premsa hidràulica aixeca un cotxe amb poca força?' },
    { es: ['Porque la misma presión sobre un pistón mucho más grande da mucha más fuerza', 'Porque el aceite pesa poco', 'Porque el coche pierde peso al subir', 'Porque el líquido se comprime'], en: ['Because the same pressure on a much bigger piston gives far more force', 'Because oil is light', 'Because the car loses weight as it rises', 'Because the liquid compresses'], ca: ['Perquè la mateixa pressió sobre un pistó molt més gran dona molta més força', 'Perquè l\'oli pesa poc', 'Perquè el cotxe perd pes en pujar', 'Perquè el líquid es comprimeix'] },
    { es: 'Porque la misma presión sobre un pistón mucho más grande da mucha más fuerza', en: 'Because the same pressure on a much bigger piston gives far more force', ca: 'Perquè la mateixa pressió sobre un pistó molt més gran dona molta més força' },
    '🚗',
    { es: 'Si el pistón grande tiene 50 veces más superficie, la misma presión se convierte en 50 veces más fuerza. No sale energía de la nada: el pistón pequeño recorre mucha distancia y el grande sube muy poquito.', en: 'If the big piston has 50 times the area, the same pressure becomes 50 times the force. No free energy: the small piston travels a long way and the big one rises very little.', ca: 'Si el pistó gran té 50 vegades més superfície, la mateixa pressió es converteix en 50 vegades més força.' }),

  q('pf-16', 'eso',
    { es: 'En una prensa hidráulica se aprieta el pistón pequeño (0,01 m²) con 20 N. ¿Qué presión hay en el líquido?', en: 'In a hydraulic press the small piston (0.01 m²) is pushed with 20 N. What is the pressure in the liquid?', ca: 'En una premsa hidràulica es pitja el pistó petit (0,01 m²) amb 20 N. Quina pressió hi ha al líquid?' },
    { es: ['2.000 Pa', '0,2 Pa', '200 Pa', '20 Pa'], en: ['2,000 Pa', '0.2 Pa', '200 Pa', '20 Pa'], ca: ['2.000 Pa', '0,2 Pa', '200 Pa', '20 Pa'] },
    { es: '2.000 Pa', en: '2,000 Pa', ca: '2.000 Pa' },
    '⚙️',
    { es: 'P = F / S = 20 N ÷ 0,01 m² = 2.000 Pa. Dividir entre un número menor que uno hace crecer el resultado, que es justo la idea de la prensa: una superficie diminuta convierte poca fuerza en mucha presión.', en: 'P = F / A = 20 N ÷ 0.01 m² = 2,000 Pa. Dividing by a number under one makes the result grow, which is the whole idea of the press.', ca: 'P = F / S = 20 N ÷ 0,01 m² = 2.000 Pa.' }),

  // ── PRINCIPIO DE ARQUÍMEDES ─────────────────────────────────────────────
  q('pf-17', 'primaria',
    { es: '¿Por qué en el agua parece que pesas menos?', en: 'Why do you seem to weigh less in water?', ca: 'Per què a l\'aigua sembla que peses menys?' },
    { es: ['Porque el agua te empuja hacia arriba con una fuerza llamada empuje', 'Porque pierdes masa al mojarte', 'Porque la gravedad es menor bajo el agua', 'Porque el agua te enfría'], en: ['Because water pushes you up with a force called buoyancy', 'Because you lose mass when wet', 'Because gravity is weaker underwater', 'Because water cools you'], ca: ['Perquè l\'aigua t\'empeny cap amunt amb una força anomenada empenta', 'Perquè perds massa en mullar-te', 'Perquè la gravetat és menor sota l\'aigua', 'Perquè l\'aigua et refreda'] },
    { es: 'Porque el agua te empuja hacia arriba con una fuerza llamada empuje', en: 'Because water pushes you up with a force called buoyancy', ca: 'Perquè l\'aigua t\'empeny cap amunt amb una força anomenada empenta' },
    '🏊',
    { es: 'Sigues pesando exactamente lo mismo: lo que pasa es que hay una segunda fuerza hacia arriba que cancela parte del peso. Eso es el empuje, y por eso en el agua puedes levantar a alguien que en tierra no podrías.', en: 'You still weigh exactly the same: there is simply a second, upward force cancelling part of your weight. That is buoyancy.', ca: 'Segueixes pesant exactament el mateix: hi ha una segona força cap amunt que cancel·la part del pes.' }),

  q('pf-18', 'eso',
    { es: 'Según el principio de Arquímedes, ¿a qué es igual el empuje sobre un cuerpo sumergido?', en: 'By Archimedes\' principle, what does the buoyant force equal?', ca: 'Segons el principi d\'Arquimedes, a què és igual l\'empenta sobre un cos submergit?' },
    { es: ['Al peso del líquido que el cuerpo desaloja', 'Al peso del propio cuerpo', 'A la mitad del peso del cuerpo', 'Al volumen del cuerpo'], en: ['The weight of the liquid the body displaces', 'The weight of the body itself', 'Half the body\'s weight', 'The body\'s volume'], ca: ['Al pes del líquid que el cos desallotja', 'Al pes del mateix cos', 'A la meitat del pes del cos', 'Al volum del cos'] },
    { es: 'Al peso del líquido que el cuerpo desaloja', en: 'The weight of the liquid the body displaces', ca: 'Al pes del líquid que el cos desallotja' },
    '🛁',
    { es: 'No es el peso del cuerpo ni su volumen a secas: es lo que PESA el líquido que ha tenido que apartarse. Por eso un mismo objeto flota mejor en agua salada, que es más densa y por tanto pesa más por litro desalojado.', en: 'Not the body\'s weight, nor its volume alone: it is what the displaced liquid WEIGHS. That is why the same object floats better in salt water, which is denser.', ca: 'No és el pes del cos ni el seu volum: és el que PESA el líquid que s\'ha hagut d\'apartar.' }),

  q('pf-19', 'primaria',
    { es: '¿Qué determina que un objeto flote o se hunda en el agua?', en: 'What decides whether an object floats or sinks in water?', ca: 'Què determina que un objecte suri o s\'enfonsi a l\'aigua?' },
    { es: ['Su densidad comparada con la del agua', 'Solo su peso', 'Solo su tamaño', 'Su color'], en: ['Its density compared with the water\'s', 'Its weight alone', 'Its size alone', 'Its colour'], ca: ['La seva densitat comparada amb la de l\'aigua', 'Només el seu pes', 'Només la seva mida', 'El seu color'] },
    { es: 'Su densidad comparada con la del agua', en: 'Its density compared with the water\'s', ca: 'La seva densitat comparada amb la de l\'aigua' },
    '🍎',
    { es: 'No es el peso: un barco de acero de miles de toneladas flota y un tornillo de diez gramos se hunde. Lo que cuenta es cuánto pesa CADA LITRO del objeto comparado con un litro de agua.', en: 'Not the weight: a steel ship of thousands of tonnes floats and a ten-gram screw sinks. What counts is how much EACH LITRE of the object weighs against a litre of water.', ca: 'No és el pes: un vaixell d\'acer de milers de tones sura i un cargol de deu grams s\'enfonsa.' }),

  q('pf-20', 'eso',
    { es: '¿Por qué flota un barco de acero, si el acero se hunde?', en: 'Why does a steel ship float, if steel sinks?', ca: 'Per què sura un vaixell d\'acer, si l\'acer s\'enfonsa?' },
    { es: ['Porque su casco encierra mucho aire y su densidad media es menor que la del agua', 'Porque el acero flota si está pintado', 'Porque el mar es más denso que un río', 'Porque los motores lo empujan hacia arriba'], en: ['Because its hull encloses a lot of air, so its average density is below water\'s', 'Because painted steel floats', 'Because the sea is denser than a river', 'Because the engines push it up'], ca: ['Perquè el seu casc tanca molt aire i la seva densitat mitjana és menor que la de l\'aigua', 'Perquè l\'acer sura si està pintat', 'Perquè el mar és més dens que un riu', 'Perquè els motors l\'empenyen cap amunt'] },
    { es: 'Porque su casco encierra mucho aire y su densidad media es menor que la del agua', en: 'Because its hull encloses a lot of air, so its average density is below water\'s', ca: 'Perquè el seu casc tanca molt aire i la seva densitat mitjana és menor que la de l\'aigua' },
    '⚓',
    { es: 'La densidad que cuenta es la del conjunto barco + aire de dentro, no la del material. Si el casco se agujerea, el aire se va, entra agua, la densidad media sube por encima de la del agua y el barco se hunde.', en: 'The density that counts is the ship plus the air inside, not the material. Hole the hull, the air leaves, water enters, the average density rises above water\'s and it sinks.', ca: 'La densitat que compta és la del conjunt vaixell + aire de dins, no la del material.' }),

  q('pf-21', 'eso',
    { es: 'Un submarino quiere sumergirse. ¿Qué hace?', en: 'A submarine wants to dive. What does it do?', ca: 'Un submarí vol submergir-se. Què fa?' },
    { es: ['Llenar de agua sus tanques de lastre para aumentar su densidad media', 'Vaciar los tanques de agua', 'Acelerar los motores hacia abajo', 'Aumentar su volumen'], en: ['Fill its ballast tanks with water to raise its average density', 'Empty its water tanks', 'Point the engines down and accelerate', 'Increase its volume'], ca: ['Omplir d\'aigua els seus tancs de llast per augmentar la densitat mitjana', 'Buidar els tancs d\'aigua', 'Accelerar els motors cap avall', 'Augmentar el seu volum'] },
    { es: 'Llenar de agua sus tanques de lastre para aumentar su densidad media', en: 'Fill its ballast tanks with water to raise its average density', ca: 'Omplir d\'aigua els seus tancs de llast per augmentar la densitat mitjana' },
    '🔱',
    { es: 'Cambia su densidad a voluntad: agua dentro para bajar, aire comprimido para expulsarla y subir. El volumen exterior no cambia; lo que cambia es cuánto pesa ese mismo volumen.', en: 'It changes its density at will: water in to go down, compressed air to push it out and rise. The outside volume never changes; what changes is how much that volume weighs.', ca: 'Canvia la seva densitat a voluntat: aigua dins per baixar, aire comprimit per expulsar-la i pujar.' }),

  q('pf-22', 'eso',
    { es: 'Un objeto pesa 50 N en el aire y 30 N sumergido en agua. ¿Cuánto vale el empuje?', en: 'An object weighs 50 N in air and 30 N submerged in water. What is the buoyant force?', ca: 'Un objecte pesa 50 N a l\'aire i 30 N submergit en aigua. Quant val l\'empenta?' },
    { es: ['20 N', '80 N', '30 N', '50 N'], en: ['20 N', '80 N', '30 N', '50 N'], ca: ['20 N', '80 N', '30 N', '50 N'] },
    { es: '20 N', en: '20 N', ca: '20 N' },
    '⚖️',
    { es: 'El empuje es exactamente lo que "desaparece" del peso: 50 − 30 = 20 N. Esa diferencia se puede medir con un dinamómetro en clase, y es la forma más directa de comprobar el principio de Arquímedes sin fórmulas.', en: 'Buoyancy is exactly what "vanishes" from the weight: 50 − 30 = 20 N. You can measure that difference with a spring scale in class.', ca: 'L\'empenta és exactament el que "desapareix" del pes: 50 − 30 = 20 N.' }),

  q('pf-23', 'eso',
    { es: '¿Por qué es más fácil flotar en el Mar Muerto que en una piscina?', en: 'Why is it easier to float in the Dead Sea than in a pool?', ca: 'Per què és més fàcil surar al Mar Mort que en una piscina?' },
    { es: ['Porque su agua tiene tanta sal que es mucho más densa y el empuje es mayor', 'Porque está más caliente', 'Porque es menos profundo', 'Porque hay menos gravedad allí'], en: ['Because its water is so salty it is much denser, so buoyancy is greater', 'Because it is warmer', 'Because it is shallower', 'Because gravity is weaker there'], ca: ['Perquè la seva aigua té tanta sal que és molt més densa i l\'empenta és major', 'Perquè està més calenta', 'Perquè és menys profund', 'Perquè hi ha menys gravetat'] },
    { es: 'Porque su agua tiene tanta sal que es mucho más densa y el empuje es mayor', en: 'Because its water is so salty it is much denser, so buoyancy is greater', ca: 'Perquè la seva aigua té tanta sal que és molt més densa i l\'empenta és major' },
    '🧂',
    { es: 'Cada litro desalojado pesa bastante más que un litro de agua dulce, así que el empuje sube sin que tú cambies nada. Es el mismo motivo por el que un huevo se hunde en agua y flota si le echas mucha sal.', en: 'Each displaced litre weighs considerably more than a litre of fresh water, so buoyancy rises without you changing anything. Same reason an egg sinks in water and floats in very salty water.', ca: 'Cada litre desallotjat pesa bastant més que un litre d\'aigua dolça, així que l\'empenta puja.' }),

  // ── PRESIÓN ATMOSFÉRICA ─────────────────────────────────────────────────
  q('pf-24', 'primaria',
    { es: '¿Qué es la presión atmosférica?', en: 'What is atmospheric pressure?', ca: 'Què és la pressió atmosfèrica?' },
    { es: ['La presión que ejerce el peso del aire de la atmósfera sobre todo lo que hay debajo', 'El peso de las nubes', 'La fuerza del viento', 'La temperatura del aire'], en: ['The pressure from the weight of the atmosphere\'s air on everything below', 'The weight of the clouds', 'The force of the wind', 'The temperature of the air'], ca: ['La pressió que exerceix el pes de l\'aire de l\'atmosfera sobre tot el que hi ha a sota', 'El pes dels núvols', 'La força del vent', 'La temperatura de l\'aire'] },
    { es: 'La presión que ejerce el peso del aire de la atmósfera sobre todo lo que hay debajo', en: 'The pressure from the weight of the atmosphere\'s air on everything below', ca: 'La pressió que exerceix el pes de l\'aire de l\'atmosfera sobre tot el que hi ha a sota' },
    '🌍',
    { es: 'El aire pesa, aunque no lo notes: tienes encima una columna de decenas de kilómetros de atmósfera. No la notas porque tu cuerpo empuja hacia fuera con la misma presión, igual que un pez no nota el agua.', en: 'Air has weight, even if you cannot feel it: there are tens of kilometres of atmosphere above you. You do not notice because your body pushes out with the same pressure.', ca: 'L\'aire pesa, encara que no ho notis: tens a sobre una columna de desenes de quilòmetres d\'atmosfera.' }),

  q('pf-25', 'eso',
    { es: '¿Qué le pasa a la presión atmosférica a medida que subes una montaña?', en: 'What happens to atmospheric pressure as you climb a mountain?', ca: 'Què li passa a la pressió atmosfèrica a mesura que puges una muntanya?' },
    { es: ['Disminuye, porque queda menos aire por encima', 'Aumenta', 'No cambia', 'Aumenta solo de noche'], en: ['It falls, because there is less air above you', 'It rises', 'It stays the same', 'It only rises at night'], ca: ['Disminueix, perquè queda menys aire per sobre', 'Augmenta', 'No canvia', 'Augmenta només de nit'] },
    { es: 'Disminuye, porque queda menos aire por encima', en: 'It falls, because there is less air above you', ca: 'Disminueix, perquè queda menys aire per sobre' },
    '⛰️',
    { es: 'Es la misma idea que bucear, pero al revés: cuanto más subes, menos columna de aire te queda encima. Por eso a mucha altitud cuesta respirar y el agua hierve antes de los 100 °C.', en: 'It is the diving idea in reverse: the higher you go, the less air column is left above you. That is why breathing is hard at altitude and water boils below 100 °C.', ca: 'És la mateixa idea que bussejar, però a l\'inrevés: com més puges, menys columna d\'aire et queda a sobre.' }),

  q('pf-26', 'eso',
    { es: '¿Cuánto vale aproximadamente la presión atmosférica a nivel del mar?', en: 'Roughly how much is atmospheric pressure at sea level?', ca: 'Quant val aproximadament la pressió atmosfèrica al nivell del mar?' },
    { es: ['Unos 101.000 Pa (1 atm, 1013 hPa)', 'Unos 100 Pa', 'Unos 10 Pa', 'Unos 10.000.000 Pa'], en: ['About 101,000 Pa (1 atm, 1013 hPa)', 'About 100 Pa', 'About 10 Pa', 'About 10,000,000 Pa'], ca: ['Uns 101.000 Pa (1 atm, 1013 hPa)', 'Uns 100 Pa', 'Uns 10 Pa', 'Uns 10.000.000 Pa'] },
    { es: 'Unos 101.000 Pa (1 atm, 1013 hPa)', en: 'About 101,000 Pa (1 atm, 1013 hPa)', ca: 'Uns 101.000 Pa (1 atm, 1013 hPa)' },
    '🌡️',
    { es: 'Es el valor que da el hombre del tiempo en hectopascales: 1013 hPa es la presión normal. Por encima se habla de anticiclón (buen tiempo) y por debajo, de borrasca.', en: 'It is the figure weather forecasts give in hectopascals: 1013 hPa is normal. Above that means high pressure and fair weather; below, a low.', ca: 'És el valor que dona l\'home del temps en hectopascals: 1013 hPa és la pressió normal.' }),

  q('pf-27', 'eso',
    { es: '¿Quién demostró con una columna de mercurio que el aire ejerce presión?', en: 'Who proved with a column of mercury that air exerts pressure?', ca: 'Qui va demostrar amb una columna de mercuri que l\'aire exerceix pressió?' },
    { es: ['Torricelli', 'Newton', 'Arquímedes', 'Galileo'], en: ['Torricelli', 'Newton', 'Archimedes', 'Galileo'], ca: ['Torricelli', 'Newton', 'Arquimedes', 'Galileu'] },
    { es: 'Torricelli', en: 'Torricelli', ca: 'Torricelli' },
    '🧪',
    { es: 'Torricelli llenó un tubo de mercurio, lo volcó en una cubeta y vio que la columna se quedaba en 760 mm en vez de vaciarse: era el aire de fuera el que la sostenía. De ahí vienen los "760 mmHg" y el barómetro.', en: 'Torricelli filled a tube with mercury, upended it in a dish and saw the column hold at 760 mm instead of emptying: the outside air was holding it up. Hence "760 mmHg" and the barometer.', ca: 'Torricelli va omplir un tub de mercuri i va veure que la columna es quedava a 760 mm: era l\'aire de fora el que la sostenia.' }),

  q('pf-28', 'primaria',
    { es: '¿Por qué sube el refresco cuando bebes con una pajita?', en: 'Why does the drink rise when you use a straw?', ca: 'Per què puja el refresc quan beus amb una palleta?' },
    { es: ['Porque al aspirar bajas la presión dentro y la atmósfera empuja el líquido hacia arriba', 'Porque tiras del líquido con la boca', 'Porque el líquido se hace más ligero', 'Porque la pajita atrae el líquido'], en: ['Because sucking lowers the pressure inside and the atmosphere pushes the liquid up', 'Because you pull the liquid with your mouth', 'Because the liquid gets lighter', 'Because the straw attracts the liquid'], ca: ['Perquè en aspirar baixes la pressió dins i l\'atmosfera empeny el líquid cap amunt', 'Perquè estires el líquid amb la boca', 'Perquè el líquid es fa més lleuger', 'Perquè la palleta atreu el líquid'] },
    { es: 'Porque al aspirar bajas la presión dentro y la atmósfera empuja el líquido hacia arriba', en: 'Because sucking lowers the pressure inside and the atmosphere pushes the liquid up', ca: 'Perquè en aspirar baixes la pressió dins i l\'atmosfera empeny el líquid cap amunt' },
    '🥤',
    { es: 'No estás tirando del líquido: estás quitando aire de la pajita. Quien hace el trabajo es la presión atmosférica, que empuja la superficie del vaso. En el vacío, una pajita no funcionaría por mucho que aspirases.', en: 'You are not pulling the liquid: you are removing air from the straw. Atmospheric pressure does the work, pushing on the surface in the glass. In a vacuum a straw would not work at all.', ca: 'No estàs estirant el líquid: estàs traient aire de la palleta. Qui fa la feina és la pressió atmosfèrica.' }),

  q('pf-29', 'primaria',
    { es: '¿Por qué se pega una ventosa a un cristal liso?', en: 'Why does a suction cup stick to smooth glass?', ca: 'Per què s\'enganxa una ventosa a un vidre llis?' },
    { es: ['Porque al apretarla se saca el aire de dentro y la presión atmosférica la aprieta contra el cristal', 'Porque tiene pegamento', 'Porque el cristal la atrae magnéticamente', 'Porque el plástico se funde un poco'], en: ['Because pressing it out expels the air inside and atmospheric pressure squeezes it against the glass', 'Because it has glue', 'Because glass attracts it magnetically', 'Because the plastic melts slightly'], ca: ['Perquè en pitjar-la se\'n treu l\'aire i la pressió atmosfèrica la pitja contra el vidre', 'Perquè té pegament', 'Perquè el vidre l\'atreu magnèticament', 'Perquè el plàstic es fon una mica'] },
    { es: 'Porque al apretarla se saca el aire de dentro y la presión atmosférica la aprieta contra el cristal', en: 'Because pressing it out expels the air inside and atmospheric pressure squeezes it against the glass', ca: 'Perquè en pitjar-la se\'n treu l\'aire i la pressió atmosfèrica la pitja contra el vidre' },
    '💨',
    { es: 'Dentro queda casi vacío y fuera sigue habiendo una atmósfera entera empujando. Necesita una superficie lisa porque en una pared rugosa el aire se cuela por los huecos y se acabó el efecto.', en: 'Inside is nearly empty and outside a whole atmosphere keeps pushing. It needs a smooth surface because on a rough wall air sneaks in through the gaps.', ca: 'Dins queda gairebé buit i fora segueix havent-hi una atmosfera sencera empenyent.' }),

  q('pf-30', 'eso',
    { es: '¿Por qué en una olla a presión la comida se hace antes?', en: 'Why does food cook faster in a pressure cooker?', ca: 'Per què en una olla a pressió el menjar es fa abans?' },
    { es: ['Porque al subir la presión el agua hierve por encima de 100 °C', 'Porque el vapor cocina más rápido que el agua', 'Porque el metal conduce mejor el calor', 'Porque la comida absorbe la presión'], en: ['Because higher pressure makes water boil above 100 °C', 'Because steam cooks faster than water', 'Because the metal conducts heat better', 'Because the food absorbs the pressure'], ca: ['Perquè en pujar la pressió l\'aigua bull per sobre de 100 °C', 'Perquè el vapor cuina més ràpid que l\'aigua', 'Perquè el metall condueix millor la calor', 'Perquè el menjar absorbeix la pressió'] },
    { es: 'Porque al subir la presión el agua hierve por encima de 100 °C', en: 'Because higher pressure makes water boil above 100 °C', ca: 'Perquè en pujar la pressió l\'aigua bull per sobre de 100 °C' },
    '🍲',
    { es: 'La temperatura de ebullición depende de la presión. Encerrando el vapor, la olla llega a unos 120 °C y a esa temperatura las reacciones de la cocción van mucho más deprisa. En alta montaña pasa lo contrario: el agua hierve antes y todo tarda más.', en: 'Boiling temperature depends on pressure. By trapping steam, the pot reaches about 120 °C and cooking reactions run much faster. High in the mountains the opposite happens.', ca: 'La temperatura d\'ebullició depèn de la pressió: tancant el vapor, l\'olla arriba a uns 120 °C.' }),

  q('pf-31', 'eso',
    { es: '¿Por qué se te taponan los oídos al despegar un avión?', en: 'Why do your ears block when a plane takes off?', ca: 'Per què se t\'embussen les orelles en enlairar-se un avió?' },
    { es: ['Porque la presión exterior baja deprisa y la del oído medio tarda en igualarse', 'Porque el ruido daña el tímpano', 'Porque el aire del avión es más denso', 'Porque la velocidad comprime la cabeza'], en: ['Because outside pressure drops fast and the middle ear takes time to equalise', 'Because noise damages the eardrum', 'Because cabin air is denser', 'Because speed compresses your head'], ca: ['Perquè la pressió exterior baixa de pressa i la de l\'oïda mitjana triga a igualar-se', 'Perquè el soroll danya el timpà', 'Perquè l\'aire de l\'avió és més dens', 'Perquè la velocitat comprimeix el cap'] },
    { es: 'Porque la presión exterior baja deprisa y la del oído medio tarda en igualarse', en: 'Because outside pressure drops fast and the middle ear takes time to equalise', ca: 'Perquè la pressió exterior baixa de pressa i la de l\'oïda mitjana triga a igualar-se' },
    '👂',
    { es: 'El tímpano queda con más presión por dentro que por fuera y se abomba. Tragar saliva o bostezar abre la trompa de Eustaquio y deja pasar aire: por eso funciona ese truco y no otro.', en: 'The eardrum ends up with more pressure inside than out and bulges. Swallowing or yawning opens the Eustachian tube and lets air through.', ca: 'El timpà queda amb més pressió per dins que per fora i es bomba. Empassar saliva obre la trompa d\'Eustaqui.' }),

  q('pf-32', 'eso',
    { es: 'Se saca el aire de una lata cerrada. ¿Qué le ocurre?', en: 'The air is pumped out of a sealed can. What happens to it?', ca: 'Es treu l\'aire d\'una llauna tancada. Què li passa?' },
    { es: ['Se aplasta, porque la presión atmosférica exterior ya no está compensada', 'Se hincha', 'No le pasa nada', 'Se calienta y explota'], en: ['It is crushed, because outside atmospheric pressure is no longer balanced', 'It swells', 'Nothing happens', 'It heats up and explodes'], ca: ['S\'aixafa, perquè la pressió atmosfèrica exterior ja no està compensada', 'S\'infla', 'No li passa res', 'S\'escalfa i explota'] },
    { es: 'Se aplasta, porque la presión atmosférica exterior ya no está compensada', en: 'It is crushed, because outside atmospheric pressure is no longer balanced', ca: 'S\'aixafa, perquè la pressió atmosfèrica exterior ja no està compensada' },
    '🥫',
    { es: 'La atmósfera siempre estuvo empujando la lata por fuera; lo que la mantenía con forma era el aire de dentro empujando igual. Al quitarlo, gana la de fuera. Es el experimento que enseña que la presión atmosférica no es una idea abstracta.', en: 'The atmosphere was always pushing on the can from outside; the air inside pushing back was what kept its shape. Remove it and the outside wins.', ca: 'L\'atmosfera sempre va estar empenyent la llauna per fora; el que la mantenia amb forma era l\'aire de dins.' }),

  q('pf-33', 'eso',
    { es: 'Un mismo cuerpo se sumerge del todo a 2 m y luego a 8 m. ¿Cambia el empuje que recibe?', en: 'The same body is fully submerged at 2 m and then at 8 m. Does the buoyant force change?', ca: 'Un mateix cos se submergeix del tot a 2 m i després a 8 m. Canvia l\'empenta que rep?' },
    { es: ['No: si está completamente sumergido, desaloja el mismo volumen a cualquier profundidad', 'Sí, es cuatro veces mayor a 8 m', 'Sí, es menor a 8 m', 'Sí, se duplica'], en: ['No: fully submerged, it displaces the same volume at any depth', 'Yes, four times greater at 8 m', 'Yes, smaller at 8 m', 'Yes, it doubles'], ca: ['No: si està completament submergit, desallotja el mateix volum a qualsevol profunditat', 'Sí, és quatre vegades major a 8 m', 'Sí, és menor a 8 m', 'Sí, es duplica'] },
    { es: 'No: si está completamente sumergido, desaloja el mismo volumen a cualquier profundidad', en: 'No: fully submerged, it displaces the same volume at any depth', ca: 'No: si està completament submergit, desallotja el mateix volum a qualsevol profunditat' },
    '🎈',
    { es: 'Es la confusión más común del tema: la PRESIÓN sí crece con la profundidad, pero el EMPUJE no, porque depende del volumen desalojado y ese ya no cambia una vez el cuerpo está dentro del todo.', en: 'The commonest mix-up here: PRESSURE does grow with depth, but BUOYANCY does not, because it depends on displaced volume and that stops changing once the body is fully under.', ca: 'La PRESSIÓ sí que creix amb la profunditat, però l\'EMPENTA no: depèn del volum desallotjat.' }),

  q('pf-34', 'eso',
    { es: 'Una persona de 600 N de peso se apoya sobre un solo pie de 0,02 m². ¿Qué presión ejerce en el suelo?', en: 'A 600 N person stands on one foot of area 0.02 m². What pressure do they exert on the floor?', ca: 'Una persona de 600 N de pes es recolza sobre un sol peu de 0,02 m². Quina pressió exerceix a terra?' },
    { es: ['30.000 Pa', '12 Pa', '3.000 Pa', '600 Pa'], en: ['30,000 Pa', '12 Pa', '3,000 Pa', '600 Pa'], ca: ['30.000 Pa', '12 Pa', '3.000 Pa', '600 Pa'] },
    { es: '30.000 Pa', en: '30,000 Pa', ca: '30.000 Pa' },
    '🦶',
    { es: 'P = 600 ÷ 0,02 = 30.000 Pa. Con los dos pies apoyados sería la mitad, 15.000 Pa: la misma persona ejerce el doble de presión a la pata coja sin haber engordado nada.', en: 'P = 600 ÷ 0.02 = 30,000 Pa. On both feet it would be half, 15,000 Pa: the same person exerts twice the pressure on one leg without gaining any weight.', ca: 'P = 600 ÷ 0,02 = 30.000 Pa. Amb els dos peus seria la meitat, 15.000 Pa.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 20 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
