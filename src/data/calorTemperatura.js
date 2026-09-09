// Calor y Temperatura
//
// Este era el bloque con más riesgo de duplicar de los que quedaban, así que
// se miró antes qué dicen exactamente los dos bancos vecinos:
//
//   · energia.js habla del calor SOLO como una forma de energía dentro de las
//     cadenas de transformación ("química → térmica → mecánica"). Ni una
//     pregunta sobre qué es el calor frente a la temperatura.
//   · estadosMateria.js usa la temperatura SOLO como umbral de los cambios de
//     estado: a qué temperatura funde el hielo y a cuál hierve el agua.
//
// Así que aquí no se pregunta ni por las formas de energía ni por los puntos
// de fusión y ebullición del agua: eso ya tiene examen. Lo que queda —y no
// estaba en ninguna parte— es la distinción calor/temperatura, las escalas, la
// dilatación, las tres formas de transmisión, el equilibrio térmico y el calor
// específico.
//
// Los cálculos usan el calor específico del agua, 4180 J/(kg·°C), redondeado a
// 4200 donde el número redondo ayuda más que la precisión. Cada resultado se
// comprobó aparte antes de escribirlo.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── CALOR NO ES TEMPERATURA ─────────────────────────────────────────────
  q('ct-01', 'primaria',
    { es: '¿Qué es la temperatura de un cuerpo?', en: 'What is the temperature of a body?', ca: 'Què és la temperatura d\'un cos?' },
    { es: ['Una medida de lo rápido que se agitan sus partículas', 'La cantidad de calor que contiene', 'Su cantidad de energía total', 'Lo que pesa cuando está caliente'], en: ['A measure of how fast its particles jiggle', 'The amount of heat it contains', 'Its total amount of energy', 'What it weighs when hot'], ca: ['Una mesura de com de ràpid s\'agiten les seves partícules', 'La quantitat de calor que conté', 'La seva quantitat d\'energia total', 'El que pesa quan està calent'] },
    { es: 'Una medida de lo rápido que se agitan sus partículas', en: 'A measure of how fast its particles jiggle', ca: 'Una mesura de com de ràpid s\'agiten les seves partícules' },
    '🌡️',
    { es: 'La temperatura mide la agitación MEDIA de las partículas, no cuántas hay. Por eso una chispa a 1000 °C no te quema y un vaso de agua a 60 °C sí: la chispa está mucho más caliente, pero tiene poquísimas partículas.', en: 'Temperature measures the AVERAGE jiggling of particles, not how many there are. That is why a 1000 °C spark does not burn you and a 60 °C glass of water does.', ca: 'La temperatura mesura l\'agitació MITJANA de les partícules, no quantes n\'hi ha.' }),

  q('ct-02', 'eso',
    { es: '¿Cuál es la diferencia entre calor y temperatura?', en: 'What is the difference between heat and temperature?', ca: 'Quina és la diferència entre calor i temperatura?' },
    { es: ['El calor es energía que se transfiere; la temperatura es un estado del cuerpo', 'Son lo mismo con dos nombres', 'El calor se mide en grados y la temperatura en julios', 'La temperatura solo existe en los gases'], en: ['Heat is energy in transfer; temperature is a state of the body', 'They are the same thing twice named', 'Heat is measured in degrees and temperature in joules', 'Temperature only exists in gases'], ca: ['La calor és energia que es transfereix; la temperatura és un estat del cos', 'Són el mateix amb dos noms', 'La calor es mesura en graus i la temperatura en joules', 'La temperatura només existeix als gasos'] },
    { es: 'El calor es energía que se transfiere; la temperatura es un estado del cuerpo', en: 'Heat is energy in transfer; temperature is a state of the body', ca: 'La calor és energia que es transfereix; la temperatura és un estat del cos' },
    '↔️',
    { es: 'Un cuerpo TIENE temperatura pero no "tiene calor": el calor es lo que pasa de uno a otro cuando están a distinta temperatura. Se mide en julios, como cualquier energía, y la temperatura en grados.', en: 'A body HAS a temperature but does not "have heat": heat is what moves between two bodies at different temperatures. It is measured in joules, like any energy.', ca: 'Un cos TÉ temperatura però no "té calor": la calor és el que passa d\'un a un altre.' }),

  q('ct-03', 'eso',
    { es: '¿Hacia dónde va siempre el calor de forma espontánea?', en: 'Which way does heat always flow on its own?', ca: 'Cap a on va sempre la calor de manera espontània?' },
    { es: ['Del cuerpo más caliente al más frío', 'Del más frío al más caliente', 'Del más grande al más pequeño', 'Del más pesado al más ligero'], en: ['From the hotter body to the colder one', 'From colder to hotter', 'From bigger to smaller', 'From heavier to lighter'], ca: ['Del cos més calent al més fred', 'Del més fred al més calent', 'Del més gran al més petit', 'Del més pesat al més lleuger'] },
    { es: 'Del cuerpo más caliente al más frío', en: 'From the hotter body to the colder one', ca: 'Del cos més calent al més fred' },
    '➡️',
    { es: 'Nunca al revés por sí solo: para mover calor de lo frío a lo caliente hace falta una máquina que gaste energía, y eso es exactamente lo que hacen la nevera y el aire acondicionado.', en: 'Never the other way round by itself: moving heat from cold to hot needs a machine spending energy, which is exactly what a fridge does.', ca: 'Mai a l\'inrevés per si sol: per moure calor del fred al calent cal una màquina que gasti energia.' }),

  q('ct-04', 'primaria',
    { es: 'Al tocar un pomo de metal y una puerta de madera en la misma habitación, el metal parece más frío. ¿Por qué?', en: 'A metal handle feels colder than a wooden door in the same room. Why?', ca: 'En tocar un pom de metall i una porta de fusta a la mateixa habitació, el metall sembla més fred. Per què?' },
    { es: ['Porque el metal conduce el calor mejor y te lo roba más deprisa', 'Porque el metal está de verdad a menos temperatura', 'Porque la madera genera calor', 'Porque el metal es más pesado'], en: ['Because metal conducts heat better and takes yours away faster', 'Because the metal really is at a lower temperature', 'Because wood generates heat', 'Because metal is heavier'], ca: ['Perquè el metall condueix la calor millor i te la roba més de pressa', 'Perquè el metall està de debò a menys temperatura', 'Perquè la fusta genera calor', 'Perquè el metall és més pesat'] },
    { es: 'Porque el metal conduce el calor mejor y te lo roba más deprisa', en: 'Because metal conducts heat better and takes yours away faster', ca: 'Perquè el metall condueix la calor millor i te la roba més de pressa' },
    '🚪',
    { es: 'Los dos están a la misma temperatura: la de la habitación. Lo que notas no es la temperatura del objeto, es la VELOCIDAD a la que pierdes calor por la mano. Es de las confusiones más difíciles de quitarse.', en: 'Both are at the same temperature: the room\'s. What you feel is not the object\'s temperature but the SPEED at which your hand loses heat.', ca: 'Tots dos són a la mateixa temperatura: la de l\'habitació. El que notes és la VELOCITAT a què perds calor.' }),

  // ── ESCALAS ─────────────────────────────────────────────────────────────
  q('ct-05', 'eso',
    { es: '¿Cuál es la unidad de temperatura en el Sistema Internacional?', en: 'What is the SI unit of temperature?', ca: 'Quina és la unitat de temperatura al Sistema Internacional?' },
    { es: ['El kelvin (K)', 'El grado Celsius (°C)', 'El grado Fahrenheit (°F)', 'El julio (J)'], en: ['The kelvin (K)', 'The degree Celsius (°C)', 'The degree Fahrenheit (°F)', 'The joule (J)'], ca: ['El kelvin (K)', 'El grau Celsius (°C)', 'El grau Fahrenheit (°F)', 'El joule (J)'] },
    { es: 'El kelvin (K)', en: 'The kelvin (K)', ca: 'El kelvin (K)' },
    '📏',
    { es: 'Y se escribe sin el símbolo de grado: 300 K, no 300 °K. En la vida diaria se usa el Celsius, pero en las fórmulas de física y química hay que pasar a kelvin, porque es la única escala que empieza en el cero de verdad.', en: 'And it is written with no degree symbol: 300 K, not 300 °K. Everyday life uses Celsius, but physics formulas need kelvin.', ca: 'I s\'escriu sense el símbol de grau: 300 K, no 300 °K.' }),

  q('ct-06', 'eso',
    { es: '¿A cuántos kelvin equivalen 0 °C?', en: 'How many kelvin is 0 °C?', ca: 'A quants kelvin equivalen 0 °C?' },
    { es: ['273 K', '0 K', '100 K', '−273 K'], en: ['273 K', '0 K', '100 K', '−273 K'], ca: ['273 K', '0 K', '100 K', '−273 K'] },
    { es: '273 K', en: '273 K', ca: '273 K' },
    '🧊',
    { es: 'Para pasar de grados Celsius a kelvin se suman 273: 0 °C son 273 K y 25 °C son 298 K. Solo se suma, no se multiplica, porque un grado y un kelvin son igual de grandes.', en: 'To go from Celsius to kelvin you add 273: 0 °C is 273 K and 25 °C is 298 K. You only add, never multiply, because a degree and a kelvin are the same size.', ca: 'Per passar de graus Celsius a kelvin se sumen 273: 0 °C són 273 K.' }),

  q('ct-07', 'eso',
    { es: '¿Qué es el cero absoluto?', en: 'What is absolute zero?', ca: 'Què és el zero absolut?' },
    { es: ['La temperatura mínima posible, 0 K o −273 °C', 'La temperatura a la que se congela el agua', 'La temperatura del espacio exterior', 'Una temperatura que se alcanza en los congeladores'], en: ['The lowest possible temperature, 0 K or −273 °C', 'The temperature water freezes at', 'The temperature of outer space', 'A temperature reached in freezers'], ca: ['La temperatura mínima possible, 0 K o −273 °C', 'La temperatura a què es congela l\'aigua', 'La temperatura de l\'espai exterior', 'Una temperatura que s\'assoleix als congeladors'] },
    { es: 'La temperatura mínima posible, 0 K o −273 °C', en: 'The lowest possible temperature, 0 K or −273 °C', ca: 'La temperatura mínima possible, 0 K o −273 °C' },
    '❄️',
    { es: 'Es el punto en que la agitación de las partículas sería mínima, y por eso no hay nada más frío: no existen los kelvin negativos. Nunca se ha alcanzado del todo en un laboratorio, solo se han quedado a millonésimas.', en: 'It is where particle jiggling would be minimal, so nothing can be colder: there are no negative kelvin. It has never been fully reached in a lab.', ca: 'És el punt en què l\'agitació de les partícules seria mínima, i per això no hi ha res més fred.' }),

  q('ct-08', 'eso',
    { es: 'Un cuerpo está a 27 °C. ¿Cuál es su temperatura en kelvin?', en: 'A body is at 27 °C. What is its temperature in kelvin?', ca: 'Un cos està a 27 °C. Quina és la seva temperatura en kelvin?' },
    { es: ['300 K', '246 K', '27 K', '327 K'], en: ['300 K', '246 K', '27 K', '327 K'], ca: ['300 K', '246 K', '27 K', '327 K'] },
    { es: '300 K', en: '300 K', ca: '300 K' },
    '🔢',
    { es: '27 + 273 = 300 K. Si hubieras restado te saldrían 246 K, que es el error habitual: para SUBIR a kelvin se suma, y para bajar a Celsius se resta.', en: '27 + 273 = 300 K. Subtracting gives 246 K, the usual slip: going UP to kelvin you add, coming down to Celsius you subtract.', ca: '27 + 273 = 300 K.' }),

  // ── DILATACIÓN ──────────────────────────────────────────────────────────
  q('ct-09', 'primaria',
    { es: 'Al calentar un cuerpo sólido, ¿qué le suele pasar a su tamaño?', en: 'When you heat a solid, what usually happens to its size?', ca: 'En escalfar un cos sòlid, què li sol passar a la mida?' },
    { es: ['Se dilata: aumenta un poco', 'Se contrae', 'No cambia nunca', 'Se parte siempre'], en: ['It expands: it grows slightly', 'It shrinks', 'It never changes', 'It always cracks'], ca: ['Es dilata: augmenta una mica', 'Es contreu', 'No canvia mai', 'Es trenca sempre'] },
    { es: 'Se dilata: aumenta un poco', en: 'It expands: it grows slightly', ca: 'Es dilata: augmenta una mica' },
    '📈',
    { es: 'Las partículas se agitan más y se separan un poco, así que el cuerpo ocupa más. Al enfriarse se contrae. Es poquísimo, pero en un puente de cien metros son varios centímetros, y por eso llevan juntas de dilatación.', en: 'Particles jiggle more and separate slightly, so the body takes up more room. It is tiny, but on a hundred-metre bridge it is several centimetres.', ca: 'Les partícules s\'agiten més i se separen una mica, així que el cos ocupa més.' }),

  q('ct-10', 'eso',
    { es: '¿Por qué las vías del tren y los puentes llevan juntas o huecos?', en: 'Why do railway tracks and bridges have gaps or joints?', ca: 'Per què les vies del tren i els ponts porten juntes o buits?' },
    { es: ['Para dejar sitio a la dilatación cuando hace calor', 'Para ahorrar material', 'Para que el agua escurra', 'Para que el tren haga menos ruido'], en: ['To leave room for expansion in hot weather', 'To save material', 'So water drains away', 'So the train is quieter'], ca: ['Per deixar lloc a la dilatació quan fa calor', 'Per estalviar material', 'Perquè l\'aigua escoli', 'Perquè el tren faci menys soroll'] },
    { es: 'Para dejar sitio a la dilatación cuando hace calor', en: 'To leave room for expansion in hot weather', ca: 'Per deixar lloc a la dilatació quan fa calor' },
    '🌉',
    { es: 'Sin ese hueco, en verano el acero empujaría contra sí mismo y las vías se deformarían o el puente se agrietaría. Es una fuerza enorme: impedir que algo se dilate cuesta más que levantarlo.', en: 'Without the gap, steel would push against itself in summer and the track would buckle. The force is enormous: stopping expansion is harder than lifting the thing.', ca: 'Sense aquest buit, a l\'estiu l\'acer empenyeria contra si mateix i les vies es deformarien.' }),

  q('ct-11', 'eso',
    { es: 'Un tarro con la tapa metálica atascada se abre mejor si…', en: 'A jar with a stuck metal lid opens better if you…', ca: 'Un pot amb la tapa metàl·lica encallada s\'obre millor si…' },
    { es: ['Se calienta la tapa con agua caliente, para que se dilate', 'Se mete en el congelador', 'Se moja con agua fría', 'Se golpea con fuerza'], en: ['Warm the lid with hot water so it expands', 'Put it in the freezer', 'Wet it with cold water', 'Hit it hard'], ca: ['S\'escalfa la tapa amb aigua calenta, perquè es dilati', 'Es fica al congelador', 'Es mulla amb aigua freda', 'Es colpeja amb força'] },
    { es: 'Se calienta la tapa con agua caliente, para que se dilate', en: 'Warm the lid with hot water so it expands', ca: 'S\'escalfa la tapa amb aigua calenta, perquè es dilati' },
    '🍯',
    { es: 'El metal se dilata más que el vidrio y con más rapidez, así que la tapa se ensancha antes que el tarro y se suelta. Es la dilatación resolviendo un problema doméstico.', en: 'Metal expands more and faster than glass, so the lid widens before the jar does and lets go.', ca: 'El metall es dilata més que el vidre i més de pressa, així que la tapa s\'eixampla abans que el pot.' }),

  // ── CÓMO SE TRANSMITE ───────────────────────────────────────────────────
  q('ct-12', 'eso',
    { es: '¿Cuáles son las tres formas de transmisión del calor?', en: 'What are the three ways heat travels?', ca: 'Quines són les tres formes de transmissió de la calor?' },
    { es: ['Conducción, convección y radiación', 'Fusión, evaporación y sublimación', 'Sólido, líquido y gas', 'Conducción, compresión y reflexión'], en: ['Conduction, convection and radiation', 'Melting, evaporation and sublimation', 'Solid, liquid and gas', 'Conduction, compression and reflection'], ca: ['Conducció, convecció i radiació', 'Fusió, evaporació i sublimació', 'Sòlid, líquid i gas', 'Conducció, compressió i reflexió'] },
    { es: 'Conducción, convección y radiación', en: 'Conduction, convection and radiation', ca: 'Conducció, convecció i radiació' },
    '🔥',
    { es: 'Conducción por contacto directo, convección por movimiento del propio fluido y radiación sin necesidad de nada en medio. Una hoguera te calienta por las tres a la vez.', en: 'Conduction by direct contact, convection by the fluid moving, radiation with nothing in between. A bonfire warms you by all three at once.', ca: 'Conducció per contacte directe, convecció pel moviment del fluid i radiació sense necessitat de res al mig.' }),

  q('ct-13', 'eso',
    { es: 'El mango de una cuchara metálica dentro de una sopa caliente se calienta por…', en: 'The handle of a metal spoon in hot soup heats up by…', ca: 'El mànec d\'una cullera metàl·lica dins d\'una sopa calenta s\'escalfa per…' },
    { es: ['Conducción', 'Convección', 'Radiación', 'Evaporación'], en: ['Conduction', 'Convection', 'Radiation', 'Evaporation'], ca: ['Conducció', 'Convecció', 'Radiació', 'Evaporació'] },
    { es: 'Conducción', en: 'Conduction', ca: 'Conducció' },
    '🥄',
    { es: 'El calor pasa de partícula a partícula por el propio metal, sin que el metal se mueva de sitio. Es la forma típica en los sólidos, y los metales son los que mejor la hacen.', en: 'Heat passes particle to particle through the metal itself, without the metal moving. It is the typical way in solids.', ca: 'La calor passa de partícula a partícula pel mateix metall, sense que el metall es mogui de lloc.' }),

  q('ct-14', 'eso',
    { es: '¿Por qué el radiador de una habitación se coloca abajo y no en el techo?', en: 'Why is a room radiator placed low, not on the ceiling?', ca: 'Per què el radiador d\'una habitació es col·loca a baix i no al sostre?' },
    { es: ['Porque el aire caliente sube y así circula por toda la habitación (convección)', 'Porque abajo hace más frío', 'Porque el calor solo baja', 'Por comodidad de instalación'], en: ['Because warm air rises and so circulates round the whole room (convection)', 'Because it is colder down there', 'Because heat only travels downwards', 'For ease of installation'], ca: ['Perquè l\'aire calent puja i així circula per tota l\'habitació (convecció)', 'Perquè a baix fa més fred', 'Perquè la calor només baixa', 'Per comoditat d\'instal·lació'] },
    { es: 'Porque el aire caliente sube y así circula por toda la habitación (convección)', en: 'Because warm air rises and so circulates round the whole room (convection)', ca: 'Perquè l\'aire calent puja i així circula per tota l\'habitació (convecció)' },
    '♨️',
    { es: 'El aire caliente es menos denso, sube, se enfría arriba y vuelve a bajar: se forma una corriente que reparte el calor sola. Un radiador en el techo dejaría el suelo helado, y por eso el aire acondicionado sí va arriba.', en: 'Warm air is less dense, rises, cools at the top and comes back down: a current forms that spreads the heat by itself. That is why air conditioning does go up high.', ca: 'L\'aire calent és menys dens, puja, es refreda a dalt i torna a baixar: es forma un corrent.' }),

  q('ct-15', 'eso',
    { es: '¿Cómo llega el calor del Sol a la Tierra, si en el espacio no hay aire?', en: 'How does the Sun\'s heat reach Earth, if space has no air?', ca: 'Com arriba la calor del Sol a la Terra, si a l\'espai no hi ha aire?' },
    { es: ['Por radiación, que no necesita ningún medio material', 'Por conducción a través del vacío', 'Por convección de las partículas del espacio', 'Por el viento solar únicamente'], en: ['By radiation, which needs no material medium', 'By conduction through the vacuum', 'By convection of space particles', 'By the solar wind alone'], ca: ['Per radiació, que no necessita cap medi material', 'Per conducció a través del buit', 'Per convecció de les partícules de l\'espai', 'Només pel vent solar'] },
    { es: 'Por radiación, que no necesita ningún medio material', en: 'By radiation, which needs no material medium', ca: 'Per radiació, que no necessita cap medi material' },
    '☀️',
    { es: 'La radiación viaja como ondas electromagnéticas y atraviesa el vacío. Es la única de las tres formas que puede: la conducción y la convección necesitan materia por la que pasar.', en: 'Radiation travels as electromagnetic waves and crosses a vacuum. It is the only one of the three that can: the other two need matter.', ca: 'La radiació viatja com a ones electromagnètiques i travessa el buit.' }),

  q('ct-16', 'primaria',
    { es: '¿Por qué la ropa de abrigo te mantiene caliente?', en: 'Why does warm clothing keep you warm?', ca: 'Per què la roba d\'abric et manté calent?' },
    { es: ['Porque atrapa aire, que es mal conductor, y frena la salida de tu calor', 'Porque produce calor', 'Porque refleja el frío', 'Porque absorbe el frío del exterior'], en: ['Because it traps air, a poor conductor, slowing your heat from escaping', 'Because it produces heat', 'Because it reflects cold', 'Because it absorbs cold from outside'], ca: ['Perquè atrapa aire, que és mal conductor, i frena la sortida de la teva calor', 'Perquè produeix calor', 'Perquè reflecteix el fred', 'Perquè absorbeix el fred de fora'] },
    { es: 'Porque atrapa aire, que es mal conductor, y frena la salida de tu calor', en: 'Because it traps air, a poor conductor, slowing your heat from escaping', ca: 'Perquè atrapa aire, que és mal conductor, i frena la sortida de la teva calor' },
    '🧥',
    { es: 'El abrigo no da calor: lo guarda. El calor lo produce tu cuerpo, y la ropa solo pone un aislante en medio. Por eso un abrigo sobre un helado también funciona — evita que el calor de fuera ENTRE.', en: 'A coat does not give heat: it keeps it. Your body makes the heat and the clothing just puts an insulator in the way. That is why a coat over ice cream also works.', ca: 'L\'abric no dona calor: la guarda. La calor la produeix el teu cos.' }),

  q('ct-17', 'eso',
    { es: '¿Por qué un termo mantiene la temperatura de lo que lleva dentro?', en: 'Why does a vacuum flask keep its contents at temperature?', ca: 'Per què un termos manté la temperatura del que porta dins?' },
    { es: ['Porque corta las tres formas de transmisión: vacío, paredes reflectantes y tapón aislante', 'Porque calienta el líquido continuamente', 'Porque el metal conserva el calor', 'Porque impide que entre aire frío'], en: ['Because it blocks all three transfer routes: vacuum, reflective walls and an insulating stopper', 'Because it keeps heating the liquid', 'Because metal stores heat', 'Because it stops cold air getting in'], ca: ['Perquè talla les tres formes de transmissió: buit, parets reflectants i tap aïllant', 'Perquè escalfa el líquid contínuament', 'Perquè el metall conserva la calor', 'Perquè impedeix que entri aire fred'] },
    { es: 'Porque corta las tres formas de transmisión: vacío, paredes reflectantes y tapón aislante', en: 'Because it blocks all three transfer routes: vacuum, reflective walls and an insulating stopper', ca: 'Perquè talla les tres formes de transmissió: buit, parets reflectants i tap aïllant' },
    '🍵',
    { es: 'La doble pared con vacío corta la conducción y la convección, y el espejo interior devuelve la radiación. Por eso el mismo termo sirve para el café caliente y para el agua fría: no elige dirección.', en: 'The vacuum double wall blocks conduction and convection, and the mirrored inside bounces radiation back. That is why the same flask works for hot coffee and cold water.', ca: 'La doble paret amb buit talla la conducció i la convecció, i el mirall interior retorna la radiació.' }),

  // ── EQUILIBRIO TÉRMICO Y CALOR ESPECÍFICO ───────────────────────────────
  q('ct-18', 'eso',
    { es: 'Se juntan un cuerpo a 80 °C y otro a 20 °C. ¿Qué pasa al final?', en: 'A body at 80 °C is put with one at 20 °C. What happens in the end?', ca: 'S\'ajunten un cos a 80 °C i un altre a 20 °C. Què passa al final?' },
    { es: ['Acaban los dos a la misma temperatura, entre las dos iniciales', 'El caliente se queda a 80 °C', 'El frío baja aún más', 'Los dos suben de temperatura'], en: ['They both end at the same temperature, between the two starting ones', 'The hot one stays at 80 °C', 'The cold one gets even colder', 'Both get hotter'], ca: ['Acaben tots dos a la mateixa temperatura, entre les dues inicials', 'El calent es queda a 80 °C', 'El fred baixa encara més', 'Tots dos pugen de temperatura'] },
    { es: 'Acaban los dos a la misma temperatura, entre las dos iniciales', en: 'They both end at the same temperature, between the two starting ones', ca: 'Acaben tots dos a la mateixa temperatura, entre les dues inicials' },
    '⚖️',
    { es: 'Es el equilibrio térmico: el calor fluye del caliente al frío hasta que igualan temperaturas y deja de haber motivo para que fluya. No tiene por qué ser 50 °C: depende de cuánta masa tenga cada uno y de qué estén hechos.', en: 'This is thermal equilibrium: heat flows until temperatures match. It need not be 50 °C: it depends on each one\'s mass and material.', ca: 'És l\'equilibri tèrmic: la calor flueix del calent al fred fins que igualen temperatures.' }),

  q('ct-19', 'eso',
    { es: '¿Qué mide el calor específico de una sustancia?', en: 'What does a substance\'s specific heat measure?', ca: 'Què mesura la calor específica d\'una substància?' },
    { es: ['La energía necesaria para subir 1 °C un kilogramo de esa sustancia', 'La temperatura máxima que aguanta', 'La rapidez con que conduce el calor', 'La cantidad de calor que contiene'], en: ['The energy needed to raise one kilogram of it by 1 °C', 'The maximum temperature it withstands', 'How fast it conducts heat', 'How much heat it contains'], ca: ['L\'energia necessària per pujar 1 °C un quilogram d\'aquesta substància', 'La temperatura màxima que aguanta', 'La rapidesa amb què condueix la calor', 'La quantitat de calor que conté'] },
    { es: 'La energía necesaria para subir 1 °C un kilogramo de esa sustancia', en: 'The energy needed to raise one kilogram of it by 1 °C', ca: 'L\'energia necessària per pujar 1 °C un quilogram d\'aquesta substància' },
    '🔋',
    { es: 'Cuanto mayor es, más cuesta calentar esa sustancia. El agua lo tiene altísimo, y por eso tarda tanto en hervir y también tanto en enfriarse: es un almacén de calor extraordinario.', en: 'The higher it is, the harder that substance is to heat. Water\'s is very high, which is why it takes so long to boil and so long to cool.', ca: 'Com més gran és, més costa escalfar aquesta substància. L\'aigua el té altíssim.' }),

  q('ct-20', 'eso',
    { es: '¿Por qué el mar tarda mucho más que la arena en calentarse y en enfriarse?', en: 'Why does the sea take far longer than sand to heat up and cool down?', ca: 'Per què el mar triga molt més que la sorra a escalfar-se i a refredar-se?' },
    { es: ['Porque el agua tiene un calor específico mucho mayor', 'Porque el mar es más profundo', 'Porque la arena es de color más claro', 'Porque el agua refleja el sol'], en: ['Because water has a much higher specific heat', 'Because the sea is deeper', 'Because sand is lighter in colour', 'Because water reflects the sun'], ca: ['Perquè l\'aigua té una calor específica molt més gran', 'Perquè el mar és més profund', 'Perquè la sorra és de color més clar', 'Perquè l\'aigua reflecteix el sol'] },
    { es: 'Porque el agua tiene un calor específico mucho mayor', en: 'Because water has a much higher specific heat', ca: 'Perquè l\'aigua té una calor específica molt més gran' },
    '🏖️',
    { es: 'Por eso a mediodía la arena quema y el agua está fresca, y de noche pasa al revés. Y a escala grande es lo que suaviza el clima de la costa: el mar hace de termostato.', en: 'That is why at midday the sand burns and the water is cool, and at night it swaps. On a large scale it is what softens coastal climates.', ca: 'Per això al migdia la sorra crema i l\'aigua està fresca, i a la nit passa a l\'inrevés.' }),

  q('ct-21', 'eso',
    { es: '¿Cuánto calor hace falta para subir 10 °C un kilo de agua? (c = 4200 J/kg·°C)', en: 'How much heat is needed to raise one kilo of water by 10 °C? (c = 4200 J/kg·°C)', ca: 'Quanta calor cal per pujar 10 °C un quilo d\'aigua? (c = 4200 J/kg·°C)' },
    { es: ['42.000 J', '4.200 J', '420 J', '420.000 J'], en: ['42,000 J', '4,200 J', '420 J', '420,000 J'], ca: ['42.000 J', '4.200 J', '420 J', '420.000 J'] },
    { es: '42.000 J', en: '42,000 J', ca: '42.000 J' },
    '🔢',
    { es: 'Q = m · c · ΔT = 1 · 4200 · 10 = 42.000 J. Subir un solo grado ya cuesta 4200 J: es lo que hace que calentar agua sea de lo que más energía consume en una casa.', en: 'Q = m · c · ΔT = 1 · 4200 · 10 = 42,000 J. Raising it a single degree already costs 4200 J.', ca: 'Q = m · c · ΔT = 1 · 4200 · 10 = 42.000 J.' }),

  q('ct-22', 'eso',
    { es: 'En la fórmula Q = m · c · ΔT, ¿qué es ΔT?', en: 'In Q = m · c · ΔT, what is ΔT?', ca: 'A la fórmula Q = m · c · ΔT, què és ΔT?' },
    { es: ['La diferencia entre la temperatura final y la inicial', 'La temperatura final', 'La temperatura inicial', 'El tiempo que se calienta'], en: ['The difference between final and initial temperature', 'The final temperature', 'The initial temperature', 'The heating time'], ca: ['La diferència entre la temperatura final i la inicial', 'La temperatura final', 'La temperatura inicial', 'El temps que s\'escalfa'] },
    { es: 'La diferencia entre la temperatura final y la inicial', en: 'The difference between final and initial temperature', ca: 'La diferència entre la temperatura final i la inicial' },
    '📐',
    { es: 'La letra griega delta significa siempre "variación de". Y como es una diferencia, da igual usar grados Celsius o kelvin: subir 10 °C es subir 10 K, porque los dos escalones miden lo mismo.', en: 'The Greek delta always means "change in". And since it is a difference, Celsius or kelvin give the same number: a rise of 10 °C is a rise of 10 K.', ca: 'La lletra grega delta significa sempre "variació de". Com que és una diferència, tant se val Celsius com kelvin.' }),

  q('ct-23', 'eso',
    { es: 'Se dan 8.400 J a un kilo de agua (c = 4200 J/kg·°C). ¿Cuánto sube su temperatura?', en: '8,400 J is given to one kilo of water (c = 4200 J/kg·°C). How much does its temperature rise?', ca: 'Es donen 8.400 J a un quilo d\'aigua (c = 4200 J/kg·°C). Quant puja la temperatura?' },
    { es: ['2 °C', '4 °C', '8 °C', '0,5 °C'], en: ['2 °C', '4 °C', '8 °C', '0.5 °C'], ca: ['2 °C', '4 °C', '8 °C', '0,5 °C'] },
    { es: '2 °C', en: '2 °C', ca: '2 °C' },
    '🌡️',
    { es: 'Despejando: ΔT = Q / (m · c) = 8400 / (1 · 4200) = 2 °C. Ocho mil julios suenan a muchísimo y suben el agua dos grados: es la mejor forma de ver lo caro que sale calentar agua.', en: 'Rearranging: ΔT = Q / (m · c) = 8400 / (1 · 4200) = 2 °C. Eight thousand joules sounds huge and raises the water two degrees.', ca: 'ΔT = Q / (m · c) = 8400 / (1 · 4200) = 2 °C.' }),

  q('ct-24', 'eso',
    { es: 'Dos kilos de agua reciben el mismo calor que un kilo. ¿Cuál sube más de temperatura?', en: 'Two kilos of water get the same heat as one kilo. Which rises more in temperature?', ca: 'Dos quilos d\'aigua reben la mateixa calor que un quilo. Quin puja més de temperatura?' },
    { es: ['El de un kilo, porque hay menos masa que calentar', 'El de dos kilos', 'Suben lo mismo', 'Depende del recipiente'], en: ['The one-kilo one, because there is less mass to heat', 'The two-kilo one', 'They rise the same', 'It depends on the container'], ca: ['El d\'un quilo, perquè hi ha menys massa per escalfar', 'El de dos quilos', 'Pugen el mateix', 'Depèn del recipient'] },
    { es: 'El de un kilo, porque hay menos masa que calentar', en: 'The one-kilo one, because there is less mass to heat', ca: 'El d\'un quilo, perquè hi ha menys massa per escalfar' },
    '💧',
    { es: 'La misma energía repartida entre el doble de masa sube la mitad de temperatura. Es lo que hace que una olla llena tarde el doble que media olla con el mismo fuego.', en: 'The same energy shared between twice the mass gives half the temperature rise. It is why a full pot takes twice as long as a half pot on the same flame.', ca: 'La mateixa energia repartida entre el doble de massa puja la meitat de temperatura.' }),

  // ── EN LA VIDA DIARIA ───────────────────────────────────────────────────
  q('ct-25', 'primaria',
    { es: '¿Qué instrumento mide la temperatura?', en: 'Which instrument measures temperature?', ca: 'Quin instrument mesura la temperatura?' },
    { es: ['El termómetro', 'El barómetro', 'La balanza', 'El cronómetro'], en: ['The thermometer', 'The barometer', 'The scales', 'The stopwatch'], ca: ['El termòmetre', 'El baròmetre', 'La balança', 'El cronòmetre'] },
    { es: 'El termómetro', en: 'The thermometer', ca: 'El termòmetre' },
    '🌡️',
    { es: 'Los de toda la vida funcionan justo por la dilatación: el líquido de dentro se expande al calentarse y sube por el tubo. El barómetro, en cambio, mide presión.', en: 'The traditional ones work by expansion: the liquid inside grows when heated and rises up the tube. A barometer measures pressure instead.', ca: 'Els de tota la vida funcionen per la dilatació: el líquid de dins s\'expandeix i puja pel tub.' }),

  q('ct-26', 'primaria',
    { es: '¿Por qué las sartenes son de metal pero el mango de plástico o madera?', en: 'Why are pans metal but their handles plastic or wood?', ca: 'Per què les paelles són de metall però el mànec de plàstic o fusta?' },
    { es: ['El metal conduce bien el calor y el mango debe aislarlo de tu mano', 'Porque el plástico es más barato', 'Para que la sartén pese menos', 'Porque el metal se ensucia'], en: ['Metal conducts heat well and the handle must insulate your hand', 'Because plastic is cheaper', 'To make the pan lighter', 'Because metal gets dirty'], ca: ['El metall condueix bé la calor i el mànec ha d\'aïllar-la de la teva mà', 'Perquè el plàstic és més barat', 'Perquè la paella pesi menys', 'Perquè el metall s\'embruta'] },
    { es: 'El metal conduce bien el calor y el mango debe aislarlo de tu mano', en: 'Metal conducts heat well and the handle must insulate your hand', ca: 'El metall condueix bé la calor i el mànec ha d\'aïllar-la de la teva mà' },
    '🍳',
    { es: 'Dos materiales elegidos por lo contrario: uno para que el calor pase deprisa a la comida y otro para que no pase a la mano. Casi todo objeto que se calienta está diseñado así.', en: 'Two materials chosen for opposite reasons: one so heat reaches the food fast, the other so it does not reach your hand.', ca: 'Dos materials triats pel contrari: un perquè la calor passi de pressa i l\'altre perquè no passi a la mà.' }),

  q('ct-27', 'eso',
    { es: 'Un vaso de agua caliente y una piscina a la misma temperatura: ¿cuál tiene más energía térmica?', en: 'A glass of hot water and a pool at the same temperature: which has more thermal energy?', ca: 'Un got d\'aigua calenta i una piscina a la mateixa temperatura: quin té més energia tèrmica?' },
    { es: ['La piscina, porque tiene muchísimas más partículas', 'El vaso, porque está más concentrado', 'Los dos igual, porque están a la misma temperatura', 'Ninguno tiene energía térmica'], en: ['The pool, because it has vastly more particles', 'The glass, because it is more concentrated', 'The same, because they are at the same temperature', 'Neither has thermal energy'], ca: ['La piscina, perquè té moltíssimes més partícules', 'El got, perquè està més concentrat', 'Tots dos igual, perquè són a la mateixa temperatura', 'Cap dels dos té energia tèrmica'] },
    { es: 'La piscina, porque tiene muchísimas más partículas', en: 'The pool, because it has vastly more particles', ca: 'La piscina, perquè té moltíssimes més partícules' },
    '🏊',
    { es: 'Misma temperatura no es misma energía: la temperatura es la agitación media de CADA partícula y la energía térmica es la suma de todas. Es la otra cara de la chispa a 1000 °C que no quema.', en: 'Same temperature is not same energy: temperature is the average jiggle of EACH particle and thermal energy is the total of all of them.', ca: 'Mateixa temperatura no és mateixa energia: la temperatura és l\'agitació mitjana de CADA partícula.' }),

  q('ct-28', 'eso',
    { es: '¿Por qué en verano conviene vestir de blanco y no de negro?', en: 'Why is white better than black clothing in summer?', ca: 'Per què a l\'estiu convé vestir de blanc i no de negre?' },
    { es: ['Porque el blanco refleja más radiación y el negro la absorbe', 'Porque el negro pesa más', 'Porque el blanco deja pasar el aire', 'Porque el negro conduce el calor'], en: ['Because white reflects more radiation and black absorbs it', 'Because black is heavier', 'Because white lets air through', 'Because black conducts heat'], ca: ['Perquè el blanc reflecteix més radiació i el negre l\'absorbeix', 'Perquè el negre pesa més', 'Perquè el blanc deixa passar l\'aire', 'Perquè el negre condueix la calor'] },
    { es: 'Porque el blanco refleja más radiación y el negro la absorbe', en: 'Because white reflects more radiation and black absorbs it', ca: 'Perquè el blanc reflecteix més radiació i el negre l\'absorbeix' },
    '👕',
    { es: 'Es la transmisión por radiación aplicada a la ropa. Por eso las casas de los pueblos del sur se encalan de blanco y los paneles solares térmicos se pintan de negro: cada uno busca lo contrario.', en: 'Radiation transfer applied to clothes. It is why southern villages whitewash their houses and solar thermal panels are painted black.', ca: 'És la transmissió per radiació aplicada a la roba.' }),

  q('ct-29', 'eso',
    { es: '¿Por qué sentimos frío al salir mojados del agua, aunque haga calor?', en: 'Why do we feel cold coming out of water even in warm weather?', ca: 'Per què sentim fred en sortir mullats de l\'aigua, encara que faci calor?' },
    { es: ['Porque el agua al evaporarse se lleva calor de nuestra piel', 'Porque el agua está siempre fría', 'Porque el sol calienta menos la piel mojada', 'Porque el cuerpo deja de producir calor'], en: ['Because evaporating water takes heat from our skin', 'Because water is always cold', 'Because the sun heats wet skin less', 'Because the body stops making heat'], ca: ['Perquè l\'aigua en evaporar-se s\'emporta calor de la nostra pell', 'Perquè l\'aigua sempre és freda', 'Perquè el sol escalfa menys la pell mullada', 'Perquè el cos deixa de produir calor'] },
    { es: 'Porque el agua al evaporarse se lleva calor de nuestra piel', en: 'Because evaporating water takes heat from our skin', ca: 'Perquè l\'aigua en evaporar-se s\'emporta calor de la nostra pell' },
    '💦',
    { es: 'Evaporarse cuesta energía y esa energía la saca de lo que tenga más cerca, que es tu piel. Es exactamente el mecanismo del sudor: el cuerpo se refrigera obligando al agua a evaporarse encima.', en: 'Evaporating costs energy and it takes it from whatever is nearest, your skin. It is exactly how sweat works.', ca: 'Evaporar-se costa energia i l\'agafa del que tingui més a prop, que és la teva pell.' }),

  q('ct-30', 'eso',
    { es: '¿Por qué el agua de un botijo se mantiene fresca?', en: 'Why does water in a clay jug stay cool?', ca: 'Per què l\'aigua d\'un càntir es manté fresca?' },
    { es: ['Porque el barro rezuma un poco de agua que al evaporarse enfría el resto', 'Porque el barro es muy buen conductor', 'Porque el barro produce frío', 'Porque el agua no toca las paredes'], en: ['Because the clay seeps a little water that cools the rest as it evaporates', 'Because clay is a very good conductor', 'Because clay produces cold', 'Because the water does not touch the walls'], ca: ['Perquè el fang traspua una mica d\'aigua que en evaporar-se refreda la resta', 'Perquè el fang és molt bon conductor', 'Perquè el fang produeix fred', 'Perquè l\'aigua no toca les parets'] },
    { es: 'Porque el barro rezuma un poco de agua que al evaporarse enfría el resto', en: 'Because the clay seeps a little water that cools the rest as it evaporates', ca: 'Perquè el fang traspua una mica d\'aigua que en evaporar-se refreda la resta' },
    '🏺',
    { es: 'Mismo principio que el sudor, inventado hace siglos y sin gastar ni un vatio. Funciona mejor cuanto más seco y aireado esté el ambiente, y por eso en la costa húmeda enfría bastante menos.', en: 'The same principle as sweat, invented centuries ago with no power at all. It works better in dry, airy conditions.', ca: 'Mateix principi que la suor, inventat fa segles i sense gastar ni un watt.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 24 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
