// Geografía Física — relieve, ríos y clima
//
// Geografía tenía cinco exámenes y los cinco eran juegos de mapa: señalar
// países, adivinar por pistas, coordenadas. No había ni una pregunta de
// teoría, aunque las siete fichas de estudio por continente ya existían.
// Aquí van los conceptos, con España como caso principal porque es el que
// se estudia con más detalle en primaria y ESO.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── RELIEVE ─────────────────────────────────────────────────────────────
  q('gf-01', 'primaria',
    { es: '¿Qué es el relieve de un territorio?', en: 'What is the relief of a territory?', ca: 'Què és el relleu d\'un territori?' },
    { es: ['El conjunto de formas de la superficie: montañas, valles, llanuras', 'El clima que tiene', 'Los ríos que lo cruzan', 'La gente que vive en él'], en: ['The set of surface shapes: mountains, valleys, plains', 'Its climate', 'The rivers crossing it', 'The people living in it'], ca: ['El conjunt de formes de la superfície: muntanyes, valls, planes', 'El clima que té', 'Els rius que el creuen', 'La gent que hi viu'] },
    { es: 'El conjunto de formas de la superficie: montañas, valles, llanuras', en: 'The set of surface shapes: mountains, valleys, plains', ca: 'El conjunt de formes de la superfície: muntanyes, valls, planes' },
    '⛰️',
    { es: 'Lo modelan dos fuerzas opuestas: las placas tectónicas lo levantan desde dentro y la erosión lo desgasta desde fuera. Por eso las montañas jóvenes son altas y puntiagudas, y las viejas, bajas y redondeadas.', en: 'Two opposing forces shape it: tectonic plates raise it from within and erosion wears it down from outside. That is why young mountains are high and jagged, and old ones low and rounded.', ca: 'El modelen dues forces oposades: les plaques el lleven des de dins i l\'erosió el desgasta des de fora.' }),

  q('gf-02', 'primaria',
    { es: '¿Qué es una meseta?', en: 'What is a plateau?', ca: 'Què és un altiplà?' },
    { es: ['Una llanura elevada, alta pero plana', 'Una montaña muy puntiaguda', 'Un valle profundo', 'Una isla pequeña'], en: ['A raised plain, high but flat', 'A very sharp mountain', 'A deep valley', 'A small island'], ca: ['Una plana elevada, alta però plana', 'Una muntanya molt punxeguda', 'Una vall profunda', 'Una illa petita'] },
    { es: 'Una llanura elevada, alta pero plana', en: 'A raised plain, high but flat', ca: 'Una plana elevada, alta però plana' },
    '🏔️',
    { es: 'La Meseta Central ocupa el corazón de la península ibérica y está a unos 600-700 metros de altura. Es lo que hace que España sea el segundo país más montañoso de Europa por altitud media, después de Suiza.', en: 'The Central Plateau occupies the heart of the Iberian Peninsula at some 600-700 metres. It is why Spain is Europe\'s second most mountainous country by average altitude, after Switzerland.', ca: 'La Meseta Central ocupa el cor de la península ibèrica, a uns 600-700 metres d\'altura.' }),

  q('gf-03', 'primaria',
    { es: '¿Qué es una península?', en: 'What is a peninsula?', ca: 'Què és una península?' },
    { es: ['Una porción de tierra rodeada de agua por todas partes menos por una', 'Una tierra rodeada de agua por completo', 'Un grupo de islas', 'Una entrada del mar en la tierra'], en: ['A piece of land surrounded by water on all sides but one', 'Land completely surrounded by water', 'A group of islands', 'An inlet of the sea into the land'], ca: ['Una porció de terra envoltada d\'aigua per totes bandes menys per una', 'Una terra envoltada d\'aigua completament', 'Un grup d\'illes', 'Una entrada del mar a la terra'] },
    { es: 'Una porción de tierra rodeada de agua por todas partes menos por una', en: 'A piece of land surrounded by water on all sides but one', ca: 'Una porció de terra envoltada d\'aigua per totes bandes menys per una' },
    '🗺️',
    { es: 'Esa parte que queda unida al continente se llama istmo cuando es muy estrecha. Si el agua rodeara la tierra por completo sería una isla, y varias islas juntas forman un archipiélago, como el balear o el canario.', en: 'The part still joined to the mainland is called an isthmus when very narrow. If water surrounded it completely it would be an island, and several islands together form an archipelago, like the Balearic or Canary ones.', ca: 'La part que queda unida al continent s\'anomena istme quan és molt estreta.' }),

  q('gf-04', 'primaria',
    { es: '¿Cuál es el pico más alto de España?', en: 'What is the highest peak in Spain?', ca: 'Quin és el pic més alt d\'Espanya?' },
    { es: ['El Teide, en Tenerife', 'El Mulhacén, en Sierra Nevada', 'El Aneto, en los Pirineos', 'El Moncayo'], en: ['Teide, in Tenerife', 'Mulhacén, in Sierra Nevada', 'Aneto, in the Pyrenees', 'Moncayo'], ca: ['El Teide, a Tenerife', 'El Mulhacén, a Sierra Nevada', 'L\'Aneto, als Pirineus', 'El Moncayo'] },
    { es: 'El Teide, en Tenerife', en: 'Teide, in Tenerife', ca: 'El Teide, a Tenerife' },
    '🌋',
    { es: 'Mide 3.715 metros y es un volcán. La pregunta se falla mucho porque el Mulhacén, con 3.479, es el más alto de la PENÍNSULA, pero no de España: las Canarias también cuentan.', en: 'It is 3,715 metres and a volcano. The question is often missed because Mulhacén, at 3,479, is the highest on the PENINSULA but not in Spain: the Canaries count too.', ca: 'Fa 3.715 metres i és un volcà. El Mulhacén, amb 3.479, és el més alt de la PENÍNSULA, però no d\'Espanya.' }),

  q('gf-05', 'primaria',
    { es: '¿Qué cordillera separa España de Francia?', en: 'Which mountain range separates Spain from France?', ca: 'Quina serralada separa Espanya de França?' },
    { es: ['Los Pirineos', 'Los Alpes', 'La Cordillera Cantábrica', 'Sierra Nevada'], en: ['The Pyrenees', 'The Alps', 'The Cantabrian Range', 'Sierra Nevada'], ca: ['Els Pirineus', 'Els Alps', 'La Serralada Cantàbrica', 'Sierra Nevada'] },
    { es: 'Los Pirineos', en: 'The Pyrenees', ca: 'Els Pirineus' },
    '⛰️',
    { es: 'Recorren unos 430 km de mar a mar, del Cantábrico al Mediterráneo, y su pico más alto es el Aneto, con 3.404 metros. Han hecho de frontera natural durante toda la historia.', en: 'They run some 430 km from sea to sea, Cantabrian to Mediterranean, and their highest peak is Aneto at 3,404 metres. They have served as a natural border throughout history.', ca: 'Recorren uns 430 km de mar a mar, i el seu pic més alt és l\'Aneto, amb 3.404 metres.' }),

  q('gf-06', 'primaria',
    { es: '¿Qué es un valle?', en: 'What is a valley?', ca: 'Què és una vall?' },
    { es: ['El terreno llano y bajo entre dos montañas', 'La cima de una montaña', 'Una llanura junto al mar', 'Un río muy ancho'], en: ['The low flat land between two mountains', 'The top of a mountain', 'A plain by the sea', 'A very wide river'], ca: ['El terreny pla i baix entre dues muntanyes', 'El cim d\'una muntanya', 'Una plana vora el mar', 'Un riu molt ample'] },
    { es: 'El terreno llano y bajo entre dos montañas', en: 'The low flat land between two mountains', ca: 'El terreny pla i baix entre dues muntanyes' },
    '🏞️',
    { es: 'Casi siempre lo ha excavado un río a lo largo de miles de años. Los valles en forma de V los hace el agua; los que tienen forma de U, más anchos y de fondo plano, los excavó un glaciar.', en: 'A river has almost always carved it over thousands of years. V-shaped valleys are made by water; U-shaped ones, wider with flat floors, were carved by a glacier.', ca: 'Gairebé sempre l\'ha excavat un riu. Les valls en forma de V les fa l\'aigua; les de forma d\'U, una glacera.' }),

  q('gf-07', 'primaria',
    { es: '¿Qué es un cabo?', en: 'What is a cape?', ca: 'Què és un cap?' },
    { es: ['Una lengua de tierra que entra en el mar', 'Una entrada del mar en la tierra', 'Una montaña costera', 'Una playa muy larga'], en: ['A tongue of land jutting into the sea', 'An inlet of sea into the land', 'A coastal mountain', 'A very long beach'], ca: ['Una llengua de terra que entra al mar', 'Una entrada del mar a la terra', 'Una muntanya costanera', 'Una platja molt llarga'] },
    { es: 'Una lengua de tierra que entra en el mar', en: 'A tongue of land jutting into the sea', ca: 'Una llengua de terra que entra al mar' },
    '🌊',
    { es: 'Es lo contrario de un golfo, que es el mar el que entra en la tierra. En España están el cabo de Gata, el de Finisterre o el de Creus; y golfos, el de Vizcaya y el de Cádiz.', en: 'It is the opposite of a gulf, where the sea enters the land. In Spain there are Cape Gata, Finisterre or Creus; and gulfs, Biscay and Cádiz.', ca: 'És el contrari d\'un golf, on és el mar el que entra a la terra.' }),

  // ── RÍOS ────────────────────────────────────────────────────────────────
  q('gf-08', 'primaria',
    { es: '¿Cómo se llama el lugar donde nace un río?', en: 'What is the place where a river is born called?', ca: 'Com s\'anomena el lloc on neix un riu?' },
    { es: ['El nacimiento o la fuente', 'La desembocadura', 'El cauce', 'El afluente'], en: ['The source', 'The mouth', 'The riverbed', 'The tributary'], ca: ['El naixement o la font', 'La desembocadura', 'La llera', 'L\'afluent'] },
    { es: 'El nacimiento o la fuente', en: 'The source', ca: 'El naixement o la font' },
    '💧',
    { es: 'Donde termina, en el mar o en otro río, es la desembocadura. Por el camino recibe afluentes, que son los ríos más pequeños que se le unen, y todo el terreno que le manda agua es su cuenca.', en: 'Where it ends, in the sea or another river, is the mouth. Along the way it takes in tributaries, the smaller rivers joining it, and all the land sending it water is its basin.', ca: 'On acaba és la desembocadura. Pel camí rep afluents, i tot el terreny que li envia aigua és la seva conca.' }),

  q('gf-09', 'primaria',
    { es: '¿Cuál es el río más largo de la península ibérica?', en: 'What is the longest river in the Iberian Peninsula?', ca: 'Quin és el riu més llarg de la península ibèrica?' },
    { es: ['El Tajo', 'El Ebro', 'El Duero', 'El Guadalquivir'], en: ['The Tagus', 'The Ebro', 'The Douro', 'The Guadalquivir'], ca: ['El Tajo', 'L\'Ebre', 'El Duero', 'El Guadalquivir'] },
    { es: 'El Tajo', en: 'The Tagus', ca: 'El Tajo' },
    '🏞️',
    { es: 'Mide algo más de 1.000 km y desemboca en Lisboa, ya en Portugal. El Ebro es más corto pero lleva más agua: es el más caudaloso de España, y el único grande que va al Mediterráneo.', en: 'It is just over 1,000 km and flows out at Lisbon, in Portugal. The Ebro is shorter but carries more water: it is Spain\'s largest by flow, and the only big one going to the Mediterranean.', ca: 'Fa poc més de 1.000 km i desemboca a Lisboa. L\'Ebre és més curt però porta més aigua.' }),

  q('gf-10', 'primaria',
    { es: '¿A qué mar u océano van la mayoría de los ríos españoles?', en: 'Which sea or ocean do most Spanish rivers flow into?', ca: 'A quin mar o oceà van la majoria dels rius espanyols?' },
    { es: ['Al Atlántico, porque la Meseta se inclina hacia el oeste', 'Al Mediterráneo', 'Al Cantábrico', 'Se reparten por igual'], en: ['The Atlantic, because the plateau tilts westwards', 'The Mediterranean', 'The Cantabrian Sea', 'They split evenly'], ca: ['A l\'Atlàntic, perquè la Meseta s\'inclina cap a l\'oest', 'Al Mediterrani', 'Al Cantàbric', 'Es reparteixen per igual'] },
    { es: 'Al Atlántico, porque la Meseta se inclina hacia el oeste', en: 'The Atlantic, because the plateau tilts westwards', ca: 'A l\'Atlàntic, perquè la Meseta s\'inclina cap a l\'oest' },
    '🧭',
    { es: 'Duero, Tajo y Guadiana cruzan la Península de este a oeste siguiendo esa pendiente, y por eso son largos. Los mediterráneos son cortos y con poca agua, porque nacen cerca de la costa.', en: 'The Douro, Tagus and Guadiana cross the peninsula west along that slope, which is why they are long. The Mediterranean ones are short with little water, rising close to the coast.', ca: 'Duero, Tajo i Guadiana creuen la Península d\'est a oest seguint aquest pendent.' }),

  q('gf-11', 'primaria',
    { es: '¿Qué es un afluente?', en: 'What is a tributary?', ca: 'Què és un afluent?' },
    { es: ['Un río que desemboca en otro río', 'El final de un río', 'Un lago artificial', 'El agua subterránea'], en: ['A river flowing into another river', 'The end of a river', 'An artificial lake', 'Groundwater'], ca: ['Un riu que desemboca en un altre riu', 'El final d\'un riu', 'Un llac artificial', 'L\'aigua subterrània'] },
    { es: 'Un río que desemboca en otro río', en: 'A river flowing into another river', ca: 'Un riu que desemboca en un altre riu' },
    '🔀',
    { es: 'Cuantos más afluentes recibe un río, más caudal lleva río abajo. Por eso un río es siempre más ancho cerca de la desembocadura que en su nacimiento, aunque llueva lo mismo.', en: 'The more tributaries a river takes in, the more water it carries downstream. That is why a river is always wider near its mouth than at its source, even with the same rainfall.', ca: 'Com més afluents rep un riu, més cabal porta riu avall.' }),

  q('gf-12', 'primaria',
    { es: '¿Qué es el caudal de un río?', en: 'What is a river\'s flow?', ca: 'Què és el cabal d\'un riu?' },
    { es: ['La cantidad de agua que lleva', 'Su longitud total', 'La profundidad máxima', 'La velocidad de la corriente'], en: ['The amount of water it carries', 'Its total length', 'Its maximum depth', 'The speed of the current'], ca: ['La quantitat d\'aigua que porta', 'La seva longitud total', 'La profunditat màxima', 'La velocitat del corrent'] },
    { es: 'La cantidad de agua que lleva', en: 'The amount of water it carries', ca: 'La quantitat d\'aigua que porta' },
    '🌊',
    { es: 'Se mide en metros cúbicos por segundo y cambia mucho a lo largo del año: crece con las lluvias y el deshielo, y baja en verano. En España esa diferencia es enorme, y por eso hay tantos embalses.', en: 'It is measured in cubic metres per second and varies greatly through the year: it rises with rain and snowmelt and drops in summer. In Spain that swing is huge, which is why there are so many reservoirs.', ca: 'Es mesura en metres cúbics per segon i canvia molt al llarg de l\'any.' }),

  q('gf-13', 'primaria',
    { es: '¿Cuál es el río más caudaloso del mundo?', en: 'Which is the world\'s largest river by flow?', ca: 'Quin és el riu més cabalós del món?' },
    { es: ['El Amazonas', 'El Nilo', 'El Misisipi', 'El Danubio'], en: ['The Amazon', 'The Nile', 'The Mississippi', 'The Danube'], ca: ['L\'Amazones', 'El Nil', 'El Mississipí', 'El Danubi'] },
    { es: 'El Amazonas', en: 'The Amazon', ca: 'L\'Amazones' },
    '🌎',
    { es: 'Lleva él solo cerca de la quinta parte del agua dulce que llega al mar en todo el planeta. Su cuenca es la mayor del mundo, y en ella está la selva amazónica.', en: 'On its own it carries close to a fifth of all the fresh water reaching the sea on the planet. Its basin is the world\'s largest, and holds the Amazon rainforest.', ca: 'Porta ell sol prop de la cinquena part de l\'aigua dolça que arriba al mar de tot el planeta.' }),

  // ── CLIMA ───────────────────────────────────────────────────────────────
  q('gf-14', 'primaria',
    { es: '¿Qué diferencia hay entre tiempo atmosférico y clima?', en: 'What is the difference between weather and climate?', ca: 'Quina diferència hi ha entre temps atmosfèric i clima?' },
    { es: ['El tiempo es cómo está hoy; el clima es lo habitual a lo largo de muchos años', 'Son lo mismo', 'El clima cambia cada día', 'El tiempo dura una estación'], en: ['Weather is how it is today; climate is what is usual over many years', 'They are the same', 'Climate changes every day', 'Weather lasts a season'], ca: ['El temps és com està avui; el clima és el que és habitual al llarg de molts anys', 'Són el mateix', 'El clima canvia cada dia', 'El temps dura una estació'] },
    { es: 'El tiempo es cómo está hoy; el clima es lo habitual a lo largo de muchos años', en: 'Weather is how it is today; climate is what is usual over many years', ca: 'El temps és com està avui; el clima és el que és habitual al llarg de molts anys' },
    '🌦️',
    { es: 'Un día frío en agosto es tiempo, no clima. Se considera clima la media de al menos treinta años, y por eso el cambio climático no se demuestra con un verano suelto sino con series muy largas.', en: 'A cold day in August is weather, not climate. Climate is the average of at least thirty years, which is why climate change is not shown by one odd summer but by very long series.', ca: 'Un dia fred a l\'agost és temps, no clima. Es considera clima la mitjana de com a mínim trenta anys.' }),

  q('gf-15', 'primaria',
    { es: '¿Qué factores influyen más en el clima de un lugar?', en: 'Which factors most affect a place\'s climate?', ca: 'Quins factors influeixen més en el clima d\'un lloc?' },
    { es: ['La latitud, la altitud y la distancia al mar', 'Solo la latitud', 'El número de habitantes', 'La hora del día'], en: ['Latitude, altitude and distance from the sea', 'Latitude only', 'The number of inhabitants', 'The time of day'], ca: ['La latitud, l\'altitud i la distància al mar', 'Només la latitud', 'El nombre d\'habitants', 'L\'hora del dia'] },
    { es: 'La latitud, la altitud y la distancia al mar', en: 'Latitude, altitude and distance from the sea', ca: 'La latitud, l\'altitud i la distància al mar' },
    '🌡️',
    { es: 'Cuanto más lejos del ecuador, más frío; cuanto más alto, más frío también, unos 6 °C menos por cada 1.000 metros. Y el mar suaviza: la costa tiene inviernos menos duros y veranos menos calurosos que el interior.', en: 'The further from the equator, the colder; the higher, colder too, about 6 °C less per 1,000 metres. And the sea softens: coasts have milder winters and cooler summers than inland.', ca: 'Com més lluny de l\'equador, més fred; com més alt, també més fred. I el mar suavitza.' }),

  q('gf-16', 'primaria',
    { es: '¿Qué caracteriza al clima mediterráneo?', en: 'What characterises the Mediterranean climate?', ca: 'Què caracteritza el clima mediterrani?' },
    { es: ['Veranos secos y calurosos e inviernos suaves, con lluvias en otoño y primavera', 'Lluvias abundantes todo el año', 'Frío intenso todo el año', 'Lluvias solo en verano'], en: ['Dry hot summers and mild winters, with rain in autumn and spring', 'Heavy rain all year', 'Intense cold all year', 'Rain only in summer'], ca: ['Estius secs i calorosos i hiverns suaus, amb pluges a la tardor i la primavera', 'Pluges abundants tot l\'any', 'Fred intens tot l\'any', 'Pluges només a l\'estiu'] },
    { es: 'Veranos secos y calurosos e inviernos suaves, con lluvias en otoño y primavera', en: 'Dry hot summers and mild winters, with rain in autumn and spring', ca: 'Estius secs i calorosos i hiverns suaus, amb pluges a la tardor i la primavera' },
    '🌞',
    { es: 'Es el clima de la mayor parte de España. La sequía de verano es su rasgo definitorio, y explica la vegetación adaptada: olivo, encina, romero, plantas de hoja dura que pierden poca agua.', en: 'It is the climate of most of Spain. The summer drought is its defining feature, and explains the adapted vegetation: olive, holm oak, rosemary — hard-leaved plants that lose little water.', ca: 'És el clima de la major part d\'Espanya. La sequera d\'estiu és el seu tret definitori.' }),

  q('gf-17', 'primaria',
    { es: '¿Qué clima tiene el norte de España, la llamada "España verde"?', en: 'What climate does northern Spain, the "green Spain", have?', ca: 'Quin clima té el nord d\'Espanya, l\'anomenada "Espanya verda"?' },
    { es: ['Oceánico: lluvias abundantes todo el año y temperaturas suaves', 'Desértico', 'Mediterráneo seco', 'Subtropical'], en: ['Oceanic: abundant rain all year and mild temperatures', 'Desert', 'Dry Mediterranean', 'Subtropical'], ca: ['Oceànic: pluges abundants tot l\'any i temperatures suaus', 'Desèrtic', 'Mediterrani sec', 'Subtropical'] },
    { es: 'Oceánico: lluvias abundantes todo el año y temperaturas suaves', en: 'Oceanic: abundant rain all year and mild temperatures', ca: 'Oceànic: pluges abundants tot l\'any i temperatures suaus' },
    '🌧️',
    { es: 'Galicia, Asturias, Cantabria y el País Vasco. Las borrascas del Atlántico chocan contra la Cordillera Cantábrica y descargan ahí toda el agua: por eso está tan verde y por eso al otro lado llueve mucho menos.', en: 'Galicia, Asturias, Cantabria and the Basque Country. Atlantic depressions hit the Cantabrian Range and dump all their water there: hence the green, and hence far less rain on the other side.', ca: 'Galícia, Astúries, Cantàbria i el País Basc. Les borrasques de l\'Atlàntic xoquen contra la Serralada Cantàbrica.' }),

  q('gf-18', 'primaria',
    { es: '¿Por qué en Canarias no hace frío en invierno?', en: 'Why is winter not cold in the Canary Islands?', ca: 'Per què a Canàries no fa fred a l\'hivern?' },
    { es: ['Por su latitud, cerca del trópico, y por el mar que las rodea', 'Porque son islas volcánicas', 'Porque están muy altas', 'Porque tienen muchos árboles'], en: ['Because of their latitude, near the tropic, and the sea around them', 'Because they are volcanic islands', 'Because they are very high', 'Because they have many trees'], ca: ['Per la seva latitud, prop del tròpic, i pel mar que les envolta', 'Perquè són illes volcàniques', 'Perquè són molt altes', 'Perquè tenen molts arbres'] },
    { es: 'Por su latitud, cerca del trópico, y por el mar que las rodea', en: 'Because of their latitude, near the tropic, and the sea around them', ca: 'Per la seva latitud, prop del tròpic, i pel mar que les envolta' },
    '🏝️',
    { es: 'Están frente a la costa africana, a la altura del Sáhara, y el océano suaviza las temperaturas todo el año. Su clima se llama subtropical, y es el único de ese tipo en toda Europa.', en: 'They lie off the African coast, level with the Sahara, and the ocean softens temperatures all year. Their climate is called subtropical, the only one of its kind in Europe.', ca: 'Són davant de la costa africana, a l\'altura del Sàhara, i l\'oceà suavitza les temperatures.' }),

  q('gf-19', 'primaria',
    { es: '¿Qué instrumento mide la cantidad de lluvia caída?', en: 'Which instrument measures rainfall?', ca: 'Quin instrument mesura la quantitat de pluja caiguda?' },
    { es: ['El pluviómetro', 'El termómetro', 'El barómetro', 'La veleta'], en: ['The rain gauge', 'The thermometer', 'The barometer', 'The weather vane'], ca: ['El pluviòmetre', 'El termòmetre', 'El baròmetre', 'El penell'] },
    { es: 'El pluviómetro', en: 'The rain gauge', ca: 'El pluviòmetre' },
    '☔',
    { es: 'Se mide en litros por metro cuadrado, que es lo mismo que milímetros de altura de agua. Cada instrumento va con su magnitud: termómetro la temperatura, barómetro la presión, anemómetro el viento.', en: 'It is measured in litres per square metre, the same as millimetres of water depth. Each instrument has its quantity: thermometer for temperature, barometer for pressure, anemometer for wind.', ca: 'Es mesura en litres per metre quadrat, que és el mateix que mil·límetres d\'alçada d\'aigua.' }),

  q('gf-20', 'primaria',
    { es: '¿Qué es un climograma?', en: 'What is a climate graph?', ca: 'Què és un climograma?' },
    { es: ['Un gráfico que muestra temperaturas y lluvias de un lugar a lo largo del año', 'Un mapa de países', 'Un dibujo de las nubes', 'Una lista de ciudades'], en: ['A graph showing a place\'s temperatures and rainfall through the year', 'A map of countries', 'A drawing of clouds', 'A list of cities'], ca: ['Un gràfic que mostra temperatures i pluges d\'un lloc al llarg de l\'any', 'Un mapa de països', 'Un dibuix dels núvols', 'Una llista de ciutats'] },
    { es: 'Un gráfico que muestra temperaturas y lluvias de un lugar a lo largo del año', en: 'A graph showing a place\'s temperatures and rainfall through the year', ca: 'Un gràfic que mostra temperatures i pluges d\'un lloc al llarg de l\'any' },
    '📊',
    { es: 'Las temperaturas van en una línea y las lluvias en barras, mes a mes. Con solo mirarlo se identifica el clima: si las barras se hunden en julio y agosto, es mediterráneo casi seguro.', en: 'Temperatures go as a line and rainfall as bars, month by month. One look identifies the climate: if the bars collapse in July and August, it is almost certainly Mediterranean.', ca: 'Les temperatures van en una línia i les pluges en barres, mes a mes.' }),

  q('gf-21', 'primaria',
    { es: '¿Cuántos continentes hay y cuál es el más grande?', en: 'How many continents are there and which is the biggest?', ca: 'Quants continents hi ha i quin és el més gran?' },
    { es: ['Seis o siete según el modelo, y el más grande es Asia', 'Cinco, y el más grande es África', 'Siete, y el más grande es América', 'Cuatro, y el más grande es Europa'], en: ['Six or seven depending on the model, and the biggest is Asia', 'Five, and the biggest is Africa', 'Seven, and the biggest is America', 'Four, and the biggest is Europe'], ca: ['Sis o set segons el model, i el més gran és Àsia', 'Cinc, i el més gran és Àfrica', 'Set, i el més gran és Amèrica', 'Quatre, i el més gran és Europa'] },
    { es: 'Seis o siete según el modelo, y el más grande es Asia', en: 'Six or seven depending on the model, and the biggest is Asia', ca: 'Sis o set segons el model, i el més gran és Àsia' },
    '🌏',
    { es: 'El número cambia según se cuente América como una o como dos, y según se incluya la Antártida. Asia es el mayor con diferencia y además el más poblado: allí vive más de la mitad de la humanidad.', en: 'The number varies depending on whether America counts as one or two, and whether Antarctica is included. Asia is by far the largest and also the most populated: over half of humanity lives there.', ca: 'El nombre canvia segons es compti Amèrica com una o com dues. Àsia és el major i el més poblat.' }),

  q('gf-22', 'primaria',
    { es: '¿Cuál es el océano más grande del planeta?', en: 'Which is the planet\'s largest ocean?', ca: 'Quin és l\'oceà més gran del planeta?' },
    { es: ['El Pacífico', 'El Atlántico', 'El Índico', 'El Ártico'], en: ['The Pacific', 'The Atlantic', 'The Indian', 'The Arctic'], ca: ['El Pacífic', 'L\'Atlàntic', 'L\'Índic', 'L\'Àrtic'] },
    { es: 'El Pacífico', en: 'The Pacific', ca: 'El Pacífic' },
    '🌊',
    { es: 'Ocupa él solo casi un tercio de la superficie de la Tierra, más que todos los continentes juntos. Le siguen el Atlántico, el Índico, el Antártico y el Ártico, que es el más pequeño y el único cubierto de hielo.', en: 'On its own it covers nearly a third of Earth\'s surface, more than all the continents together. Then come the Atlantic, Indian, Antarctic and Arctic, the smallest and the only ice-covered one.', ca: 'Ocupa ell sol gairebé un terç de la superfície de la Terra, més que tots els continents junts.' }),

  q('gf-23', 'primaria',
    { es: '¿Qué es la erosión y qué la provoca?', en: 'What is erosion and what causes it?', ca: 'Què és l\'erosió i què la provoca?' },
    { es: ['El desgaste del relieve por el agua, el viento, el hielo y los cambios de temperatura', 'El levantamiento de montañas', 'La formación de volcanes', 'El movimiento de las placas'], en: ['The wearing down of relief by water, wind, ice and temperature changes', 'The raising of mountains', 'The formation of volcanoes', 'The movement of plates'], ca: ['El desgast del relleu per l\'aigua, el vent, el gel i els canvis de temperatura', 'L\'aixecament de muntanyes', 'La formació de volcans', 'El moviment de les plaques'] },
    { es: 'El desgaste del relieve por el agua, el viento, el hielo y los cambios de temperatura', en: 'The wearing down of relief by water, wind, ice and temperature changes', ca: 'El desgast del relleu per l\'aigua, el vent, el gel i els canvis de temperatura' },
    '💨',
    { es: 'Es lenta pero no para nunca, y con el tiempo suficiente arrasa una cordillera entera. Los ríos son el agente erosivo más potente en tierra: el Colorado excavó el Gran Cañón él solo.', en: 'It is slow but never stops, and given enough time it levels a whole mountain range. Rivers are the strongest erosive agent on land: the Colorado carved the Grand Canyon alone.', ca: 'És lenta però no s\'atura mai. Els rius són l\'agent erosiu més potent en terra.' }),

  q('gf-24', 'primaria',
    { es: '¿Qué es un archipiélago?', en: 'What is an archipelago?', ca: 'Què és un arxipèlag?' },
    { es: ['Un conjunto de islas próximas entre sí', 'Una isla muy grande', 'Una península alargada', 'Un mar cerrado'], en: ['A group of islands close together', 'A very large island', 'A long peninsula', 'A closed sea'], ca: ['Un conjunt d\'illes pròximes entre si', 'Una illa molt gran', 'Una península allargada', 'Un mar tancat'] },
    { es: 'Un conjunto de islas próximas entre sí', en: 'A group of islands close together', ca: 'Un conjunt d\'illes pròximes entre si' },
    '🏝️',
    { es: 'España tiene dos: el balear en el Mediterráneo y el canario en el Atlántico. El canario es de origen volcánico, y por eso sus islas son montañosas y tienen playas de arena negra.', en: 'Spain has two: the Balearics in the Mediterranean and the Canaries in the Atlantic. The Canaries are volcanic, which is why their islands are mountainous with black sand beaches.', ca: 'Espanya en té dos: el balear al Mediterrani i el canari a l\'Atlàntic, aquest d\'origen volcànic.' }),

  q('gf-25', 'primaria',
    { es: '¿Para qué sirve un embalse?', en: 'What is a reservoir for?', ca: 'Per a què serveix un embassament?' },
    { es: ['Para almacenar agua de un río y usarla cuando hace falta', 'Para limpiar el agua del mar', 'Para evitar terremotos', 'Para medir la lluvia'], en: ['To store river water and use it when needed', 'To clean seawater', 'To prevent earthquakes', 'To measure rainfall'], ca: ['Per emmagatzemar aigua d\'un riu i fer-la servir quan cal', 'Per netejar l\'aigua del mar', 'Per evitar terratrèmols', 'Per mesurar la pluja'] },
    { es: 'Para almacenar agua de un río y usarla cuando hace falta', en: 'To store river water and use it when needed', ca: 'Per emmagatzemar aigua d\'un riu i fer-la servir quan cal' },
    '🌊',
    { es: 'España es uno de los países con más embalses del mundo, y no por casualidad: con veranos secos y ríos de caudal irregular, guardar agua del invierno es la única forma de tenerla en agosto. Además producen electricidad.', en: 'Spain has one of the world\'s highest numbers of reservoirs, and not by chance: with dry summers and irregular river flows, storing winter water is the only way to have it in August. They also generate electricity.', ca: 'Espanya és un dels països amb més embassaments del món: amb estius secs, guardar aigua de l\'hivern és l\'única manera.' }),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('gf-30', 'eso',
    { es: '¿Qué son las vertientes hidrográficas de España?', en: 'What are Spain\'s hydrographic slopes?', ca: 'Què són els vessants hidrogràfics d\'Espanya?' },
    { es: ['Las tres agrupaciones de ríos según el mar al que van: cantábrica, atlántica y mediterránea', 'Las tres cordilleras principales', 'Los tres tipos de clima', 'Las tres mesetas'], en: ['The three groupings of rivers by the sea they reach: Cantabrian, Atlantic and Mediterranean', 'The three main mountain ranges', 'The three climate types', 'The three plateaus'], ca: ['Les tres agrupacions de rius segons el mar on van: cantàbrica, atlàntica i mediterrània', 'Les tres serralades principals', 'Els tres tipus de clima', 'Les tres mesetes'] },
    { es: 'Las tres agrupaciones de ríos según el mar al que van: cantábrica, atlántica y mediterránea', en: 'The three groupings of rivers by the sea they reach: Cantabrian, Atlantic and Mediterranean', ca: 'Les tres agrupacions de rius segons el mar on van: cantàbrica, atlàntica i mediterrània' },
    '🧭',
    { es: 'La atlántica es con diferencia la mayor: Duero, Tajo, Guadiana y Guadalquivir. La cantábrica tiene ríos cortos pero muy caudalosos, y la mediterránea, cortos e irregulares salvo el Ebro.', en: 'The Atlantic is by far the largest: Douro, Tagus, Guadiana and Guadalquivir. The Cantabrian has short but very full rivers, and the Mediterranean short irregular ones except the Ebro.', ca: 'L\'atlàntica és de bon tros la major. La cantàbrica té rius curts però molt cabalosos.' }),

  q('gf-31', 'eso',
    { es: '¿Qué es el efecto Foehn?', en: 'What is the Foehn effect?', ca: 'Què és l\'efecte Foehn?' },
    { es: ['El aire descarga lluvia al subir una montaña y baja seco y cálido por la otra ladera', 'El calentamiento de las ciudades', 'La brisa que sopla del mar', 'El frío de las cumbres'], en: ['Air drops its rain climbing a mountain and comes down dry and warm on the other side', 'The warming of cities', 'The breeze blowing off the sea', 'The cold of summits'], ca: ['L\'aire descarrega pluja en pujar una muntanya i baixa sec i càlid per l\'altre vessant', 'L\'escalfament de les ciutats', 'La brisa que bufa del mar', 'El fred dels cims'] },
    { es: 'El aire descarga lluvia al subir una montaña y baja seco y cálido por la otra ladera', en: 'Air drops its rain climbing a mountain and comes down dry and warm on the other side', ca: 'L\'aire descarrega pluja en pujar una muntanya i baixa sec i càlid per l\'altre vessant' },
    '⛰️',
    { es: 'Explica que Asturias sea verde y la vertiente sur de la Cordillera Cantábrica mucho más seca, o el contraste entre las dos caras de los Pirineos. A la zona seca se la llama "sombra pluviométrica".', en: 'It explains why Asturias is green and the southern side of the Cantabrian Range much drier, or the contrast between the two faces of the Pyrenees. The dry zone is called a rain shadow.', ca: 'Explica que Astúries sigui verda i el vessant sud de la Serralada Cantàbrica molt més sec.' }),

  q('gf-32', 'eso',
    { es: '¿Qué es el régimen fluvial de un río?', en: 'What is a river\'s regime?', ca: 'Què és el règim fluvial d\'un riu?' },
    { es: ['La variación de su caudal a lo largo del año y de qué depende', 'Su longitud total', 'El país por el que pasa', 'La calidad de su agua'], en: ['How its flow varies over the year and what it depends on', 'Its total length', 'The country it crosses', 'The quality of its water'], ca: ['La variació del seu cabal al llarg de l\'any i de què depèn', 'La seva longitud total', 'El país per on passa', 'La qualitat de la seva aigua'] },
    { es: 'La variación de su caudal a lo largo del año y de qué depende', en: 'How its flow varies over the year and what it depends on', ca: 'La variació del seu cabal al llarg de l\'any i de què depèn' },
    '📈',
    { es: 'Puede ser pluvial, si depende de las lluvias, o nival, si depende del deshielo: un río nival crece en primavera aunque no llueva. Muchos ríos españoles son mixtos, nivo-pluviales.', en: 'It can be pluvial, depending on rain, or nival, depending on snowmelt: a nival river rises in spring even without rain. Many Spanish rivers are mixed, nivo-pluvial.', ca: 'Pot ser pluvial, si depèn de les pluges, o nival, si depèn del desglaç.' }),

  q('gf-33', 'eso',
    { es: '¿Qué cordilleras rodean la Meseta Central?', en: 'Which ranges surround the Central Plateau?', ca: 'Quines serralades envolten la Meseta Central?' },
    { es: ['El Macizo Galaico, la Cordillera Cantábrica, el Sistema Ibérico y Sierra Morena', 'Solo los Pirineos', 'Los Alpes y los Pirineos', 'Sierra Nevada y los Pirineos'], en: ['The Galician Massif, Cantabrian Range, Iberian System and Sierra Morena', 'Only the Pyrenees', 'The Alps and Pyrenees', 'Sierra Nevada and the Pyrenees'], ca: ['El Massís Galaic, la Serralada Cantàbrica, el Sistema Ibèric i Sierra Morena', 'Només els Pirineus', 'Els Alps i els Pirineus', 'Sierra Nevada i els Pirineus'] },
    { es: 'El Macizo Galaico, la Cordillera Cantábrica, el Sistema Ibérico y Sierra Morena', en: 'The Galician Massif, Cantabrian Range, Iberian System and Sierra Morena', ca: 'El Massís Galaic, la Serralada Cantàbrica, el Sistema Ibèric i Sierra Morena' },
    '🗺️',
    { es: 'La Meseta queda cercada por montañas casi por todos lados, y por dentro la parte en dos el Sistema Central. Ese aislamiento explica su clima extremo: inviernos muy fríos y veranos muy calurosos.', en: 'The plateau is ringed by mountains on nearly every side, and split in two inside by the Central System. That isolation explains its extreme climate: very cold winters and very hot summers.', ca: 'La Meseta queda encerclada per muntanyes gairebé per tots costats, i per dins la parteix el Sistema Central.' }),

  q('gf-34', 'eso',
    { es: '¿Por qué el interior peninsular tiene inviernos más fríos y veranos más calurosos que la costa?', en: 'Why does the peninsula\'s interior have colder winters and hotter summers than the coast?', ca: 'Per què l\'interior peninsular té hiverns més freds i estius més calorosos que la costa?' },
    { es: ['Por la continentalidad: sin el mar cerca, nada suaviza las temperaturas', 'Porque está más al norte', 'Porque llueve más', 'Porque hay más ciudades'], en: ['Because of continentality: with no sea nearby, nothing moderates temperatures', 'Because it is further north', 'Because it rains more', 'Because there are more cities'], ca: ['Per la continentalitat: sense el mar a prop, res no suavitza les temperatures', 'Perquè és més al nord', 'Perquè hi plou més', 'Perquè hi ha més ciutats'] },
    { es: 'Por la continentalidad: sin el mar cerca, nada suaviza las temperaturas', en: 'Because of continentality: with no sea nearby, nothing moderates temperatures', ca: 'Per la continentalitat: sense el mar a prop, res no suavitza les temperatures' },
    '🌡️',
    { es: 'El agua tarda mucho más que la tierra en calentarse y en enfriarse, así que actúa de amortiguador. Por eso la amplitud térmica —la diferencia entre el mes más cálido y el más frío— crece hacia el interior.', en: 'Water heats and cools far more slowly than land, so it acts as a buffer. That is why thermal range — the gap between the warmest and coldest month — grows inland.', ca: 'L\'aigua triga molt més que la terra a escalfar-se i a refredar-se, així que fa d\'amortidor.' }),

  q('gf-35', 'eso',
    { es: '¿Qué es la latitud y en qué unidades se mide?', en: 'What is latitude and in what units is it measured?', ca: 'Què és la latitud i en quines unitats es mesura?' },
    { es: ['La distancia angular al ecuador, medida en grados', 'La distancia al meridiano de Greenwich, en kilómetros', 'La altura sobre el nivel del mar', 'La distancia al polo, en kilómetros'], en: ['The angular distance from the equator, in degrees', 'The distance from Greenwich, in kilometres', 'Height above sea level', 'Distance to the pole, in kilometres'], ca: ['La distància angular a l\'equador, mesurada en graus', 'La distància al meridià de Greenwich, en quilòmetres', 'L\'alçada sobre el nivell del mar', 'La distància al pol, en quilòmetres'] },
    { es: 'La distancia angular al ecuador, medida en grados', en: 'The angular distance from the equator, in degrees', ca: 'La distància angular a l\'equador, mesurada en graus' },
    '🌐',
    { es: 'Va de 0° en el ecuador a 90° en los polos, y se dice norte o sur. La longitud es la otra coordenada, de 0° en Greenwich a 180°, este u oeste. Con las dos se localiza cualquier punto del planeta.', en: 'It runs from 0° at the equator to 90° at the poles, north or south. Longitude is the other coordinate, 0° at Greenwich to 180°, east or west. Together they locate any point on the planet.', ca: 'Va de 0° a l\'equador a 90° als pols. La longitud és l\'altra coordenada, de 0° a Greenwich a 180°.' }),

  q('gf-36', 'eso',
    { es: '¿Qué es una depresión en el relieve, como la del Ebro o la del Guadalquivir?', en: 'What is a depression in relief, like the Ebro or Guadalquivir ones?', ca: 'Què és una depressió en el relleu, com la de l\'Ebre o la del Guadalquivir?' },
    { es: ['Una zona hundida y llana entre relieves más altos, rellenada por sedimentos', 'Un pico muy alto', 'Un tipo de clima seco', 'Una isla continental'], en: ['A sunken flat area between higher relief, filled with sediment', 'A very high peak', 'A type of dry climate', 'A continental island'], ca: ['Una zona enfonsada i plana entre relleus més alts, reomplerta per sediments', 'Un pic molt alt', 'Un tipus de clima sec', 'Una illa continental'] },
    { es: 'Una zona hundida y llana entre relieves más altos, rellenada por sedimentos', en: 'A sunken flat area between higher relief, filled with sediment', ca: 'Una zona enfonsada i plana entre relleus més alts, reomplerta per sediments' },
    '🏞️',
    { es: 'Las dos grandes depresiones españolas tienen forma triangular y suelos muy fértiles, porque el río lleva siglos depositando materiales. Por eso concentran buena parte de la agricultura del país.', en: 'Spain\'s two great depressions are triangular with very fertile soils, because the river has deposited material for centuries. Hence they hold much of the country\'s farming.', ca: 'Les dues grans depressions espanyoles tenen forma triangular i sòls molt fèrtils.' }),

  q('gf-37', 'eso',
    { es: '¿Qué caracteriza al clima de montaña?', en: 'What characterises a mountain climate?', ca: 'Què caracteritza el clima de muntanya?' },
    { es: ['Temperaturas bajas todo el año y precipitaciones abundantes, muchas en forma de nieve', 'Calor seco todo el año', 'Lluvias solo en verano', 'Temperaturas suaves y constantes'], en: ['Low temperatures all year and abundant precipitation, much of it snow', 'Dry heat all year', 'Rain only in summer', 'Mild constant temperatures'], ca: ['Temperatures baixes tot l\'any i precipitacions abundants, moltes en forma de neu', 'Calor seca tot l\'any', 'Pluges només a l\'estiu', 'Temperatures suaus i constants'] },
    { es: 'Temperaturas bajas todo el año y precipitaciones abundantes, muchas en forma de nieve', en: 'Low temperatures all year and abundant precipitation, much of it snow', ca: 'Temperatures baixes tot l\'any i precipitacions abundants, moltes en forma de neu' },
    '🏔️',
    { es: 'Aparece por encima de unos 1.500 metros, sea cual sea el clima de alrededor: Sierra Nevada está en Andalucía y tiene nieve buena parte del año. La altitud pesa más que la latitud en estos casos.', en: 'It appears above around 1,500 metres, whatever the surrounding climate: Sierra Nevada is in Andalusia and has snow much of the year. Altitude outweighs latitude here.', ca: 'Apareix per damunt d\'uns 1.500 metres, sigui quin sigui el clima del voltant.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 8 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
