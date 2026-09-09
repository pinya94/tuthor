// Geografía humana — población y actividades económicas
//
// Geografía era, hasta ahora, geografía FÍSICA y de localización: países,
// capitales, mapas, coordenadas, relieve, ríos y clima. El bloque de población
// y actividades económicas —que es un tercio largo del temario de 3º de ESO— no
// estaba en ningún banco: "densidad de población", "pirámide de población",
// "sector primario" y "éxodo rural" no aparecían ni una vez en todo el repo.
//
// El vocabulario es el de los libros de texto españoles y ese fue el criterio
// al escribirlo: tasa de natalidad, crecimiento vegetativo, saldo migratorio,
// población activa, sectores primario/secundario/terciario. Un alumno tiene que
// reconocer aquí las palabras exactas con las que le van a preguntar en clase.
//
// LOS DATOS. Las cifras de población envejecen, así que se han elegido de
// forma que sigan siendo ciertas durante años: se dan redondeadas ("unos 48
// millones", "más de 8.000 millones") y las preguntas que exigen precisión son
// de CÁLCULO, no de memoria. La densidad de España se cruzó con los datos que
// el propio repo ya tiene en paises.js (47,4 millones sobre 505.990 km² = 94
// hab/km²), para que dos partes del sitio no digan cosas distintas.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── DENSIDAD Y DISTRIBUCIÓN ─────────────────────────────────────────────
  q('gh-01', 'primaria',
    { es: '¿Qué es la densidad de población?', en: 'What is population density?', ca: 'Què és la densitat de població?' },
    { es: ['El número de habitantes por kilómetro cuadrado', 'El número total de habitantes', 'La superficie de un país', 'Cuánta gente nace cada año'], en: ['The number of inhabitants per square kilometre', 'The total number of inhabitants', 'A country\'s area', 'How many people are born each year'], ca: ['El nombre d\'habitants per quilòmetre quadrat', 'El nombre total d\'habitants', 'La superfície d\'un país', 'Quanta gent neix cada any'] },
    { es: 'El número de habitantes por kilómetro cuadrado', en: 'The number of inhabitants per square kilometre', ca: 'El nombre d\'habitants per quilòmetre quadrat' },
    '👥',
    { es: 'Es lo que distingue "mucha gente" de "gente apretada". Rusia tiene más habitantes que los Países Bajos y aun así está mucho más vacía: la densidad relaciona la población con el espacio que ocupa.', en: 'It tells "a lot of people" apart from "people packed in". Russia has more inhabitants than the Netherlands yet is far emptier: density relates population to space.', ca: 'És el que distingeix "molta gent" de "gent atapeïda".' }),

  q('gh-02', 'eso',
    { es: 'Un territorio de 20.000 km² tiene 2.000.000 de habitantes. ¿Cuál es su densidad?', en: 'A territory of 20,000 km² has 2,000,000 inhabitants. What is its density?', ca: 'Un territori de 20.000 km² té 2.000.000 d\'habitants. Quina és la seva densitat?' },
    { es: ['100 hab/km²', '10 hab/km²', '1.000 hab/km²', '40.000 hab/km²'], en: ['100 inhab/km²', '10 inhab/km²', '1,000 inhab/km²', '40,000 inhab/km²'], ca: ['100 hab/km²', '10 hab/km²', '1.000 hab/km²', '40.000 hab/km²'] },
    { es: '100 hab/km²', en: '100 inhab/km²', ca: '100 hab/km²' },
    '🔢',
    { es: 'Densidad = habitantes ÷ superficie = 2.000.000 ÷ 20.000 = 100 hab/km². Como en cualquier unidad con barra, la barra dice la operación: habitantes ENTRE kilómetros cuadrados.', en: 'Density = inhabitants ÷ area = 2,000,000 ÷ 20,000 = 100 inhab/km². As with any unit with a slash, the slash tells you the operation.', ca: 'Densitat = habitants ÷ superfície = 2.000.000 ÷ 20.000 = 100 hab/km².' }),

  q('gh-03', 'eso',
    { es: '¿Cuál es aproximadamente la población de España?', en: 'Roughly what is Spain\'s population?', ca: 'Quina és aproximadament la població d\'Espanya?' },
    { es: ['Unos 48 millones de habitantes', 'Unos 25 millones', 'Unos 80 millones', 'Unos 120 millones'], en: ['About 48 million', 'About 25 million', 'About 80 million', 'About 120 million'], ca: ['Uns 48 milions d\'habitants', 'Uns 25 milions', 'Uns 80 milions', 'Uns 120 milions'] },
    { es: 'Unos 48 millones de habitantes', en: 'About 48 million', ca: 'Uns 48 milions d\'habitants' },
    '🇪🇸',
    { es: 'Con unos 506.000 km² de superficie, eso da una densidad de unos 94 habitantes por km²: parecida a la media europea y muy por debajo de países como los Países Bajos o Bélgica.', en: 'With about 506,000 km², that gives a density of roughly 94 inhabitants per km²: close to the European average and far below the Netherlands or Belgium.', ca: 'Amb uns 506.000 km², això dona una densitat d\'uns 94 habitants per km².' }),

  q('gh-04', 'eso',
    { es: '¿Cómo se reparte la población en España?', en: 'How is Spain\'s population distributed?', ca: 'Com es reparteix la població a Espanya?' },
    { es: ['Concentrada en la costa y en Madrid, con el interior muy vacío', 'Repartida por igual en todo el territorio', 'Concentrada en el interior', 'Concentrada solo en el norte'], en: ['Concentrated on the coast and in Madrid, with a very empty interior', 'Evenly spread across the country', 'Concentrated inland', 'Concentrated only in the north'], ca: ['Concentrada a la costa i a Madrid, amb l\'interior molt buit', 'Repartida per igual a tot el territori', 'Concentrada a l\'interior', 'Concentrada només al nord'] },
    { es: 'Concentrada en la costa y en Madrid, con el interior muy vacío', en: 'Concentrated on the coast and in Madrid, with a very empty interior', ca: 'Concentrada a la costa i a Madrid, amb l\'interior molt buit' },
    '🗺️',
    { es: 'Es una de las distribuciones más desiguales de Europa: la periferia y la capital concentran a la mayoría, mientras provincias del interior bajan de 10 hab/km². De ahí la expresión "la España vaciada".', en: 'It is one of Europe\'s most uneven distributions: the coastal rim and the capital hold most people, while interior provinces fall below 10 inhab/km².', ca: 'És una de les distribucions més desiguals d\'Europa: la perifèria i la capital concentren la majoria.' }),

  q('gh-05', 'eso',
    { es: '¿Cuántos habitantes tiene aproximadamente el planeta?', en: 'Roughly how many people live on the planet?', ca: 'Quants habitants té aproximadament el planeta?' },
    { es: ['Más de 8.000 millones', 'Unos 800 millones', 'Unos 3.000 millones', 'Más de 50.000 millones'], en: ['More than 8 billion', 'About 800 million', 'About 3 billion', 'More than 50 billion'], ca: ['Més de 8.000 milions', 'Uns 800 milions', 'Uns 3.000 milions', 'Més de 50.000 milions'] },
    { es: 'Más de 8.000 millones', en: 'More than 8 billion', ca: 'Més de 8.000 milions' },
    '🌍',
    { es: 'Se superaron los 8.000 millones en 2022. Para hacerse una idea del ritmo: en 1900 éramos unos 1.600 millones, así que la población se ha multiplicado por cinco en poco más de un siglo.', en: 'We passed 8 billion in 2022. For scale: in 1900 there were about 1.6 billion, so population has multiplied fivefold in little over a century.', ca: 'Es van superar els 8.000 milions el 2022.' }),

  // ── NATALIDAD, MORTALIDAD Y CRECIMIENTO ─────────────────────────────────
  q('gh-06', 'eso',
    { es: '¿Qué mide la tasa de natalidad?', en: 'What does the birth rate measure?', ca: 'Què mesura la taxa de natalitat?' },
    { es: ['Los nacimientos por cada 1.000 habitantes en un año', 'El número total de nacimientos', 'Los hijos que tiene cada mujer', 'La proporción de niños en la población'], en: ['Births per 1,000 inhabitants in a year', 'The total number of births', 'Children per woman', 'The share of children in the population'], ca: ['Els naixements per cada 1.000 habitants en un any', 'El nombre total de naixements', 'Els fills que té cada dona', 'La proporció de nens a la població'] },
    { es: 'Los nacimientos por cada 1.000 habitantes en un año', en: 'Births per 1,000 inhabitants in a year', ca: 'Els naixements per cada 1.000 habitants en un any' },
    '👶',
    { es: 'Se mide "por mil" y no en total para poder comparar países de tamaños distintos. En España ronda el 7 ‰, de las más bajas del mundo; en varios países africanos supera el 35 ‰.', en: 'It is per thousand, not a total, so countries of different sizes can be compared. Spain is around 7 ‰, among the world\'s lowest.', ca: 'Es mesura "per mil" i no en total per poder comparar països de mides diferents.' }),

  q('gh-07', 'eso',
    { es: '¿Cómo se calcula el crecimiento natural o vegetativo de una población?', en: 'How is the natural or vegetative growth of a population worked out?', ca: 'Com es calcula el creixement natural o vegetatiu d\'una població?' },
    { es: ['Restando la tasa de mortalidad a la de natalidad', 'Sumando las dos tasas', 'Multiplicándolas', 'Restando la emigración a la inmigración'], en: ['By subtracting the death rate from the birth rate', 'By adding both rates', 'By multiplying them', 'By subtracting emigration from immigration'], ca: ['Restant la taxa de mortalitat a la de natalitat', 'Sumant les dues taxes', 'Multiplicant-les', 'Restant l\'emigració a la immigració'] },
    { es: 'Restando la tasa de mortalidad a la de natalidad', en: 'By subtracting the death rate from the birth rate', ca: 'Restant la taxa de mortalitat a la de natalitat' },
    '➖',
    { es: 'Natalidad − mortalidad. Se llama "natural" o "vegetativo" porque solo cuenta nacimientos y defunciones: la gente que entra o sale del país va aparte, en el saldo migratorio.', en: 'Births − deaths. It is called "natural" because it counts only births and deaths: people moving in or out go separately, in the migration balance.', ca: 'Natalitat − mortalitat. Es diu "natural" perquè només compta naixements i defuncions.' }),

  q('gh-08', 'eso',
    { es: 'Un país tiene una natalidad del 9 ‰ y una mortalidad del 10 ‰. ¿Cuál es su crecimiento vegetativo?', en: 'A country has a 9 ‰ birth rate and a 10 ‰ death rate. What is its natural growth?', ca: 'Un país té una natalitat del 9 ‰ i una mortalitat del 10 ‰. Quin és el seu creixement vegetatiu?' },
    { es: ['−1 ‰: la población disminuye por sí sola', '19 ‰', '1 ‰', '90 ‰'], en: ['−1 ‰: the population shrinks by itself', '19 ‰', '1 ‰', '90 ‰'], ca: ['−1 ‰: la població disminueix per si sola', '19 ‰', '1 ‰', '90 ‰'] },
    { es: '−1 ‰: la población disminuye por sí sola', en: '−1 ‰: the population shrinks by itself', ca: '−1 ‰: la població disminueix per si sola' },
    '📉',
    { es: '9 − 10 = −1 ‰. Un crecimiento vegetativo negativo significa que mueren más personas de las que nacen, que es exactamente la situación de España y de buena parte de Europa desde hace años.', en: '9 − 10 = −1 ‰. Negative natural growth means more people die than are born, which is exactly Spain\'s situation.', ca: '9 − 10 = −1 ‰. Un creixement vegetatiu negatiu significa que moren més persones de les que neixen.' }),

  q('gh-09', 'eso',
    { es: '¿Qué es el saldo migratorio?', en: 'What is the migration balance?', ca: 'Què és el saldo migratori?' },
    { es: ['La diferencia entre los que llegan a un país y los que se van', 'El número de personas que emigran', 'El dinero que envían los emigrantes', 'La población total extranjera'], en: ['The difference between arrivals and departures', 'The number of people who emigrate', 'The money emigrants send home', 'The total foreign population'], ca: ['La diferència entre els que arriben a un país i els que se\'n van', 'El nombre de persones que emigren', 'Els diners que envien els emigrants', 'La població total estrangera'] },
    { es: 'La diferencia entre los que llegan a un país y los que se van', en: 'The difference between arrivals and departures', ca: 'La diferència entre els que arriben a un país i els que se\'n van' },
    '✈️',
    { es: 'Inmigrantes − emigrantes. Si es positivo, el país gana población por migración. En España lleva años siendo positivo, y es lo único que impide que la población baje pese al crecimiento vegetativo negativo.', en: 'Immigrants − emigrants. If positive, the country gains people through migration. In Spain it has been positive for years.', ca: 'Immigrants − emigrants. Si és positiu, el país guanya població per migració.' }),

  q('gh-10', 'eso',
    { es: 'El crecimiento REAL de la población de un país se obtiene…', en: 'A country\'s REAL population growth is found by…', ca: 'El creixement REAL de la població d\'un país s\'obté…' },
    { es: ['Sumando el crecimiento vegetativo y el saldo migratorio', 'Solo con el crecimiento vegetativo', 'Solo con el saldo migratorio', 'Restando ambos'], en: ['Adding natural growth and the migration balance', 'From natural growth alone', 'From the migration balance alone', 'By subtracting one from the other'], ca: ['Sumant el creixement vegetatiu i el saldo migratori', 'Només amb el creixement vegetatiu', 'Només amb el saldo migratori', 'Restant tots dos'] },
    { es: 'Sumando el crecimiento vegetativo y el saldo migratorio', en: 'Adding natural growth and the migration balance', ca: 'Sumant el creixement vegetatiu i el saldo migratori' },
    '➕',
    { es: 'Una población cambia por dos vías: nacer y morir, o entrar y salir. Por eso España puede crecer en habitantes teniendo más defunciones que nacimientos: lo compensa la inmigración.', en: 'A population changes two ways: being born and dying, or moving in and out. That is why Spain can grow while having more deaths than births.', ca: 'Una població canvia per dues vies: néixer i morir, o entrar i sortir.' }),

  q('gh-11', 'primaria',
    { es: '¿Qué diferencia hay entre emigrante e inmigrante?', en: 'What is the difference between an emigrant and an immigrant?', ca: 'Quina diferència hi ha entre emigrant i immigrant?' },
    { es: ['Es la misma persona vista desde el país que deja o desde el que llega', 'El emigrante se va por trabajo y el inmigrante por estudios', 'El inmigrante vuelve y el emigrante no', 'Son cosas sin relación'], en: ['It is the same person seen from the country they leave or the one they reach', 'Emigrants move for work, immigrants for study', 'Immigrants return, emigrants do not', 'They are unrelated things'], ca: ['És la mateixa persona vista des del país que deixa o des del que arriba', 'L\'emigrant se\'n va per feina i l\'immigrant per estudis', 'L\'immigrant torna i l\'emigrant no', 'Són coses sense relació'] },
    { es: 'Es la misma persona vista desde el país que deja o desde el que llega', en: 'It is the same person seen from the country they leave or the one they reach', ca: 'És la mateixa persona vista des del país que deixa o des del que arriba' },
    '🧳',
    { es: 'Quien sale de un país es emigrante para ese país e inmigrante para el que le recibe. Los españoles que se fueron a Alemania en los sesenta eran las dos cosas a la vez, según quién lo contara.', en: 'Someone leaving a country is an emigrant there and an immigrant where they arrive. The Spaniards who went to Germany in the sixties were both at once.', ca: 'Qui surt d\'un país és emigrant per a aquest país i immigrant per al que el rep.' }),

  // ── PIRÁMIDE Y ENVEJECIMIENTO ───────────────────────────────────────────
  q('gh-12', 'eso',
    { es: '¿Qué representa una pirámide de población?', en: 'What does a population pyramid show?', ca: 'Què representa una piràmide de població?' },
    { es: ['La población dividida por edad y por sexo', 'La riqueza de cada grupo social', 'El número de habitantes de cada ciudad', 'La evolución de la población en el tiempo'], en: ['The population split by age and sex', 'The wealth of each social group', 'The population of each city', 'Population change over time'], ca: ['La població dividida per edat i per sexe', 'La riquesa de cada grup social', 'El nombre d\'habitants de cada ciutat', 'L\'evolució de la població en el temps'] },
    { es: 'La población dividida por edad y por sexo', en: 'The population split by age and sex', ca: 'La població dividida per edat i per sexe' },
    '📊',
    { es: 'Un gráfico de barras horizontales: cada barra es un grupo de edad, los hombres a un lado y las mujeres al otro. Su FORMA cuenta la historia demográfica de un país de un vistazo.', en: 'A horizontal bar chart: each bar is an age group, men on one side and women on the other. Its SHAPE tells a country\'s demographic story at a glance.', ca: 'Un gràfic de barres horitzontals: cada barra és un grup d\'edat, homes a un costat i dones a l\'altre.' }),

  q('gh-13', 'eso',
    { es: 'Una pirámide de población ancha por abajo y muy estrecha arriba indica…', en: 'A population pyramid wide at the base and very narrow at the top shows…', ca: 'Una piràmide de població ampla per baix i molt estreta a dalt indica…' },
    { es: ['Una población joven, con alta natalidad y baja esperanza de vida', 'Una población envejecida', 'Una población que emigra mucho', 'Un país muy rico'], en: ['A young population, with high birth rates and low life expectancy', 'An ageing population', 'A population that emigrates a lot', 'A very rich country'], ca: ['Una població jove, amb alta natalitat i baixa esperança de vida', 'Una població envellida', 'Una població que emigra molt', 'Un país molt ric'] },
    { es: 'Una población joven, con alta natalidad y baja esperanza de vida', en: 'A young population, with high birth rates and low life expectancy', ca: 'Una població jove, amb alta natalitat i baixa esperança de vida' },
    '🔺',
    { es: 'Es la pirámide "de verdad", con forma triangular: nacen muchos y pocos llegan a viejos. Es la típica de los países menos desarrollados, y era la de España a principios del siglo XX.', en: 'It is the "true" pyramid, triangular: many are born and few grow old. Typical of less developed countries, and Spain\'s own shape in the early 20th century.', ca: 'És la piràmide "de debò", amb forma triangular: neixen molts i pocs arriben a vells.' }),

  q('gh-14', 'eso',
    { es: 'La pirámide de población de España tiene hoy forma de urna: estrecha abajo y ancha en el centro. ¿Qué significa?', en: 'Spain\'s population pyramid is urn-shaped today: narrow at the base, wide in the middle. What does that mean?', ca: 'La piràmide de població d\'Espanya té avui forma d\'urna: estreta a baix i ampla al centre. Què significa?' },
    { es: ['Que la población está envejecida: nacen pocos y hay muchos adultos y mayores', 'Que hay muchos niños', 'Que emigran los mayores', 'Que la población crece muy rápido'], en: ['The population is ageing: few births and many adults and elderly', 'There are many children', 'The elderly emigrate', 'The population grows very fast'], ca: ['Que la població està envellida: neixen pocs i hi ha molts adults i grans', 'Que hi ha molts nens', 'Que emigren els grans', 'Que la població creix molt de pressa'] },
    { es: 'Que la población está envejecida: nacen pocos y hay muchos adultos y mayores', en: 'The population is ageing: few births and many adults and elderly', ca: 'Que la població està envellida: neixen pocs i hi ha molts adults i grans' },
    '🏺',
    { es: 'La base estrecha son los pocos nacimientos de las últimas décadas y el ensanchamiento del centro, las generaciones numerosas de los años sesenta y setenta que hoy están en la edad adulta.', en: 'The narrow base is the few births of recent decades and the bulge in the middle is the large generations of the sixties and seventies, now middle-aged.', ca: 'La base estreta són els pocs naixements de les últimes dècades.' }),

  q('gh-15', 'eso',
    { es: '¿Cuál es la principal consecuencia del envejecimiento de la población?', en: 'What is the main consequence of an ageing population?', ca: 'Quina és la principal conseqüència de l\'envelliment de la població?' },
    { es: ['Menos trabajadores tienen que sostener a más pensionistas y más gasto sanitario', 'Hay que construir más colegios', 'Aumenta el paro juvenil automáticamente', 'Baja la esperanza de vida'], en: ['Fewer workers must support more pensioners and higher health spending', 'More schools must be built', 'Youth unemployment automatically rises', 'Life expectancy falls'], ca: ['Menys treballadors han de sostenir més pensionistes i més despesa sanitària', 'Cal construir més escoles', 'Augmenta l\'atur juvenil automàticament', 'Baixa l\'esperança de vida'] },
    { es: 'Menos trabajadores tienen que sostener a más pensionistas y más gasto sanitario', en: 'Fewer workers must support more pensioners and higher health spending', ca: 'Menys treballadors han de sostenir més pensionistes i més despesa sanitària' },
    '👴',
    { es: 'El sistema de pensiones español es de reparto: lo que cotizan los que trabajan hoy paga las pensiones de hoy. Si la proporción se desequilibra, el sistema se tensiona — de ahí que sea un debate político constante.', en: 'The Spanish pension system is pay-as-you-go: today\'s contributions pay today\'s pensions. If the ratio shifts, the system comes under strain.', ca: 'El sistema de pensions espanyol és de repartiment: el que cotitzen els que treballen avui paga les pensions d\'avui.' }),

  q('gh-16', 'eso',
    { es: '¿Qué es la esperanza de vida?', en: 'What is life expectancy?', ca: 'Què és l\'esperança de vida?' },
    { es: ['Los años que se espera que viva de media una persona al nacer', 'La edad de la persona más longeva del país', 'La edad de jubilación', 'La edad media de la población'], en: ['The average number of years a newborn is expected to live', 'The age of the oldest person in the country', 'The retirement age', 'The average age of the population'], ca: ['Els anys que s\'espera que visqui de mitjana una persona en néixer', 'L\'edat de la persona més longeva del país', 'L\'edat de jubilació', 'L\'edat mitjana de la població'] },
    { es: 'Los años que se espera que viva de media una persona al nacer', en: 'The average number of years a newborn is expected to live', ca: 'Els anys que s\'espera que visqui de mitjana una persona en néixer' },
    '❤️',
    { es: 'En España supera los 83 años y es de las más altas del mundo. Es un buen indicador del nivel de vida porque resume sanidad, alimentación y seguridad en un solo número.', en: 'In Spain it is over 83 years, among the world\'s highest. It is a good living-standards indicator because it sums up health care, food and safety in one number.', ca: 'A Espanya supera els 83 anys i és de les més altes del món.' }),

  q('gh-17', 'eso',
    { es: '¿Qué fue el éxodo rural en España?', en: 'What was the rural exodus in Spain?', ca: 'Què va ser l\'èxode rural a Espanya?' },
    { es: ['El traslado masivo de población del campo a las ciudades, sobre todo en los años 60', 'La emigración de españoles a América', 'La vuelta de la gente al campo', 'La llegada de inmigrantes al campo'], en: ['The mass move of people from countryside to cities, mainly in the 1960s', 'Spaniards emigrating to the Americas', 'People returning to the countryside', 'Immigrants arriving in rural areas'], ca: ['El trasllat massiu de població del camp a les ciutats, sobretot als anys 60', 'L\'emigració d\'espanyols a Amèrica', 'El retorn de la gent al camp', 'L\'arribada d\'immigrants al camp'] },
    { es: 'El traslado masivo de población del campo a las ciudades, sobre todo en los años 60', en: 'The mass move of people from countryside to cities, mainly in the 1960s', ca: 'El trasllat massiu de població del camp a les ciutats, sobretot als anys 60' },
    '🏙️',
    { es: 'La mecanización del campo dejó sin trabajo a mucha gente justo cuando la industria de Madrid, Barcelona y el País Vasco lo ofrecía. Es la causa directa de la despoblación del interior que se sigue notando hoy.', en: 'Farm mechanisation left many jobless just as industry in Madrid, Barcelona and the Basque Country was hiring. It directly caused the interior depopulation still felt today.', ca: 'La mecanització del camp va deixar sense feina molta gent just quan la indústria n\'oferia.' }),

  // ── LOS SECTORES ECONÓMICOS ─────────────────────────────────────────────
  q('gh-18', 'primaria',
    { es: '¿Cuáles son los tres sectores económicos?', en: 'What are the three economic sectors?', ca: 'Quins són els tres sectors econòmics?' },
    { es: ['Primario, secundario y terciario', 'Agrícola, urbano y rural', 'Público, privado y mixto', 'Nacional, regional y local'], en: ['Primary, secondary and tertiary', 'Agricultural, urban and rural', 'Public, private and mixed', 'National, regional and local'], ca: ['Primari, secundari i terciari', 'Agrícola, urbà i rural', 'Públic, privat i mixt', 'Nacional, regional i local'] },
    { es: 'Primario, secundario y terciario', en: 'Primary, secondary and tertiary', ca: 'Primari, secundari i terciari' },
    '🏭',
    { es: 'Se ordenan según lo cerca que están de la materia prima: el primario la obtiene, el secundario la transforma y el terciario presta servicios. Un tomate pasa por los tres antes de llegar a tu plato.', en: 'They are ordered by closeness to the raw material: primary gets it, secondary transforms it, tertiary provides services. A tomato passes through all three.', ca: 'S\'ordenen segons com de prop estan de la matèria primera.' }),

  q('gh-19', 'primaria',
    { es: '¿Qué actividades pertenecen al sector primario?', en: 'Which activities belong to the primary sector?', ca: 'Quines activitats pertanyen al sector primari?' },
    { es: ['Agricultura, ganadería, pesca, minería y explotación forestal', 'Fábricas y construcción', 'Comercio, transporte y turismo', 'Investigación y tecnología'], en: ['Farming, livestock, fishing, mining and forestry', 'Factories and construction', 'Trade, transport and tourism', 'Research and technology'], ca: ['Agricultura, ramaderia, pesca, mineria i explotació forestal', 'Fàbriques i construcció', 'Comerç, transport i turisme', 'Recerca i tecnologia'] },
    { es: 'Agricultura, ganadería, pesca, minería y explotación forestal', en: 'Farming, livestock, fishing, mining and forestry', ca: 'Agricultura, ramaderia, pesca, mineria i explotació forestal' },
    '🌾',
    { es: 'Todo lo que se saca directamente de la naturaleza. Es el sector que menos gente emplea en España —menos del 5 %— y aun así el que produce lo que comemos: emplear a pocos no es lo mismo que ser poco importante.', en: 'Everything taken straight from nature. It employs the fewest people in Spain — under 5 % — and still produces what we eat.', ca: 'Tot el que es treu directament de la natura. És el sector que menys gent ocupa a Espanya.' }),

  q('gh-20', 'eso',
    { es: '¿Qué hace el sector secundario?', en: 'What does the secondary sector do?', ca: 'Què fa el sector secundari?' },
    { es: ['Transforma las materias primas en productos elaborados', 'Obtiene las materias primas de la naturaleza', 'Presta servicios a las personas', 'Investiga nuevas tecnologías'], en: ['It turns raw materials into finished products', 'It takes raw materials from nature', 'It provides services to people', 'It researches new technology'], ca: ['Transforma les matèries primeres en productes elaborats', 'Obté les matèries primeres de la natura', 'Presta serveis a les persones', 'Investiga noves tecnologies'] },
    { es: 'Transforma las materias primas en productos elaborados', en: 'It turns raw materials into finished products', ca: 'Transforma les matèries primeres en productes elaborats' },
    '⚙️',
    { es: 'Industria, construcción, energía y artesanía. Convierte el trigo en harina y la harina en pan, o el mineral de hierro en acero y el acero en un coche.', en: 'Industry, construction, energy and crafts. It turns wheat into flour and flour into bread, or iron ore into steel and steel into a car.', ca: 'Indústria, construcció, energia i artesania.' }),

  q('gh-21', 'eso',
    { es: '¿A qué sector pertenece un profesor, un médico o un camarero?', en: 'Which sector do a teacher, a doctor or a waiter belong to?', ca: 'A quin sector pertany un professor, un metge o un cambrer?' },
    { es: ['Al terciario o de servicios', 'Al primario', 'Al secundario', 'A ninguno'], en: ['The tertiary or services sector', 'The primary sector', 'The secondary sector', 'None'], ca: ['Al terciari o de serveis', 'Al primari', 'Al secundari', 'A cap'] },
    { es: 'Al terciario o de servicios', en: 'The tertiary or services sector', ca: 'Al terciari o de serveis' },
    '🏥',
    { es: 'El terciario no fabrica nada: presta servicios. Es el más amplio con diferencia — comercio, transporte, sanidad, educación, turismo, banca y administración están todos ahí.', en: 'The tertiary sector makes nothing: it provides services. It is by far the broadest — trade, transport, health, education, tourism, banking and government are all in it.', ca: 'El terciari no fabrica res: presta serveis. És el més ampli amb diferència.' }),

  q('gh-22', 'eso',
    { es: '¿Qué sector emplea a más gente en España?', en: 'Which sector employs the most people in Spain?', ca: 'Quin sector ocupa més gent a Espanya?' },
    { es: ['El terciario, con alrededor de tres de cada cuatro trabajadores', 'El primario', 'El secundario', 'Están los tres igualados'], en: ['The tertiary sector, with around three in four workers', 'The primary sector', 'The secondary sector', 'All three are equal'], ca: ['El terciari, amb al voltant de tres de cada quatre treballadors', 'El primari', 'El secundari', 'Estan els tres igualats'] },
    { es: 'El terciario, con alrededor de tres de cada cuatro trabajadores', en: 'The tertiary sector, with around three in four workers', ca: 'El terciari, amb al voltant de tres de cada quatre treballadors' },
    '🛎️',
    { es: 'Es la marca de una economía desarrollada: cuanto más avanza un país, más se desplaza el empleo del campo y la fábrica hacia los servicios. En España pesa especialmente por el turismo.', en: 'It is the mark of a developed economy: the more a country advances, the more jobs shift from field and factory to services. In Spain tourism weighs especially heavily.', ca: 'És la marca d\'una economia desenvolupada: com més avança un país, més es desplaça l\'ocupació cap als serveis.' }),

  q('gh-23', 'eso',
    { es: '¿Qué es el sector cuaternario?', en: 'What is the quaternary sector?', ca: 'Què és el sector quaternari?' },
    { es: ['El de las actividades muy especializadas: investigación, tecnología e información', 'El de la agricultura moderna', 'El de las energías renovables', 'El del comercio internacional'], en: ['Highly specialised activities: research, technology and information', 'Modern agriculture', 'Renewable energy', 'International trade'], ca: ['El de les activitats molt especialitzades: recerca, tecnologia i informació', 'El de l\'agricultura moderna', 'El de les energies renovables', 'El del comerç internacional'] },
    { es: 'El de las actividades muy especializadas: investigación, tecnología e información', en: 'Highly specialised activities: research, technology and information', ca: 'El de les activitats molt especialitzades: recerca, tecnologia i informació' },
    '🔬',
    { es: 'Es un desgajamiento reciente del terciario: I+D, informática, consultoría, biotecnología. Se separa porque tiene un peso económico muy alto con relativamente poco empleo.', en: 'A recent offshoot of the tertiary sector: R&D, computing, consultancy, biotech. It is separated out because it carries high economic weight with relatively few jobs.', ca: 'És una escissió recent del terciari: R+D, informàtica, consultoria, biotecnologia.' }),

  // ── TRABAJO Y ECONOMÍA ──────────────────────────────────────────────────
  q('gh-24', 'eso',
    { es: '¿Quién forma la población activa?', en: 'Who makes up the active population?', ca: 'Qui forma la població activa?' },
    { es: ['Los que trabajan y los que buscan trabajo', 'Solo los que tienen trabajo', 'Todos los mayores de 16 años', 'Toda la población del país'], en: ['Those working and those looking for work', 'Only those with a job', 'Everyone over 16', 'The whole population'], ca: ['Els que treballen i els que busquen feina', 'Només els que tenen feina', 'Tots els majors de 16 anys', 'Tota la població del país'] },
    { es: 'Los que trabajan y los que buscan trabajo', en: 'Those working and those looking for work', ca: 'Els que treballen i els que busquen feina' },
    '💼',
    { es: 'Ocupados + parados. Quedan fuera los estudiantes, los jubilados y quienes no buscan empleo: son la población inactiva. Por eso "parado" no es lo mismo que "inactivo".', en: 'Employed + unemployed. Students, pensioners and those not seeking work are outside it: they are the inactive population. "Unemployed" is not the same as "inactive".', ca: 'Ocupats + aturats. Queden fora els estudiants i els jubilats: són la població inactiva.' }),

  q('gh-25', 'eso',
    { es: 'De 20 millones de activos, 3 millones están en paro. ¿Cuál es la tasa de paro?', en: 'Of 20 million active people, 3 million are unemployed. What is the unemployment rate?', ca: 'De 20 milions d\'actius, 3 milions estan a l\'atur. Quina és la taxa d\'atur?' },
    { es: ['15 %', '3 %', '30 %', '6,7 %'], en: ['15 %', '3 %', '30 %', '6.7 %'], ca: ['15 %', '3 %', '30 %', '6,7 %'] },
    { es: '15 %', en: '15 %', ca: '15 %' },
    '📉',
    { es: '3 ÷ 20 = 0,15, es decir el 15 %. Ojo al denominador: se divide entre los ACTIVOS, no entre la población total. Dividir entre la población entera daría un número mucho menor y sin sentido.', en: '3 ÷ 20 = 0.15, i.e. 15 %. Watch the denominator: you divide by the ACTIVE population, not the total. Using the whole population gives a much smaller, meaningless figure.', ca: '3 ÷ 20 = 0,15, és a dir el 15 %. Es divideix entre els ACTIUS, no entre la població total.' }),

  q('gh-26', 'eso',
    { es: '¿Qué diferencia hay entre agricultura de secano y de regadío?', en: 'What is the difference between dry and irrigated farming?', ca: 'Quina diferència hi ha entre agricultura de secà i de regadiu?' },
    { es: ['La de secano solo se riega con la lluvia; la de regadío recibe agua aportada', 'La de secano es en invierno y la de regadío en verano', 'La de secano usa máquinas y la de regadío no', 'La de regadío es siempre ecológica'], en: ['Dry farming relies on rain alone; irrigated farming gets added water', 'Dry farming is winter and irrigated is summer', 'Dry farming uses machines and irrigated does not', 'Irrigated farming is always organic'], ca: ['La de secà només es rega amb la pluja; la de regadiu rep aigua aportada', 'La de secà és a l\'hivern i la de regadiu a l\'estiu', 'La de secà fa servir màquines i la de regadiu no', 'La de regadiu és sempre ecològica'] },
    { es: 'La de secano solo se riega con la lluvia; la de regadío recibe agua aportada', en: 'Dry farming relies on rain alone; irrigated farming gets added water', ca: 'La de secà només es rega amb la pluja; la de regadiu rep aigua aportada' },
    '🌱',
    { es: 'En España el secano es la trilogía mediterránea —trigo, vid y olivo— y el regadío, las huertas de Valencia, Murcia y el Ebro. El regadío produce mucho más por hectárea, pero consume la mayor parte del agua del país.', en: 'In Spain dry farming is the Mediterranean trio — wheat, vine and olive — and irrigation is the market gardens of Valencia, Murcia and the Ebro.', ca: 'A Espanya el secà és la trilogia mediterrània —blat, vinya i olivera— i el regadiu, les hortes.' }),

  q('gh-27', 'eso',
    { es: '¿En qué se diferencia la ganadería intensiva de la extensiva?', en: 'How does intensive livestock farming differ from extensive?', ca: 'En què es diferencia la ramaderia intensiva de l\'extensiva?' },
    { es: ['La intensiva cría muchos animales en poco espacio y con pienso; la extensiva los deja pastar', 'La intensiva es de vacas y la extensiva de cerdos', 'La intensiva es ecológica', 'La extensiva produce más por animal'], en: ['Intensive raises many animals in little space on feed; extensive lets them graze', 'Intensive is cattle and extensive is pigs', 'Intensive is organic', 'Extensive produces more per animal'], ca: ['La intensiva cria molts animals en poc espai i amb pinso; l\'extensiva els deixa pasturar', 'La intensiva és de vaques i l\'extensiva de porcs', 'La intensiva és ecològica', 'L\'extensiva produeix més per animal'] },
    { es: 'La intensiva cría muchos animales en poco espacio y con pienso; la extensiva los deja pastar', en: 'Intensive raises many animals in little space on feed; extensive lets them graze', ca: 'La intensiva cria molts animals en poc espai i amb pinso; l\'extensiva els deixa pasturar' },
    '🐄',
    { es: 'La intensiva produce más y más barato, pero consume mucha agua y energía y genera purines. La extensiva rinde menos y mantiene el paisaje y el suelo. Es una de las decisiones ambientales más discutidas del campo español.', en: 'Intensive produces more, more cheaply, but uses much water and energy. Extensive yields less and maintains the landscape and soil.', ca: 'La intensiva produeix més i més barat, però consumeix molta aigua i energia.' }),

  q('gh-28', 'eso',
    { es: '¿Qué es un caladero?', en: 'What is a fishing ground?', ca: 'Què és un caladero?' },
    { es: ['Una zona del mar rica en peces donde se faena', 'Un puerto pesquero', 'Un tipo de red de pesca', 'Una lonja donde se vende el pescado'], en: ['A fish-rich area of sea where boats work', 'A fishing port', 'A type of fishing net', 'A market where fish is sold'], ca: ['Una zona del mar rica en peixos on es pesca', 'Un port pesquer', 'Un tipus de xarxa de pesca', 'Una llotja on es ven el peix'] },
    { es: 'Una zona del mar rica en peces donde se faena', en: 'A fish-rich area of sea where boats work', ca: 'Una zona del mar rica en peixos on es pesca' },
    '🐟',
    { es: 'España tiene una de las flotas mayores de la UE y faena en caladeros propios y ajenos. La sobrepesca es el problema central del sector: si se pesca más deprisa de lo que el pez se reproduce, el caladero se agota.', en: 'Spain has one of the EU\'s largest fleets and works both home and foreign grounds. Overfishing is the sector\'s central problem.', ca: 'Espanya té una de les flotes més grans de la UE. La sobrepesca és el problema central del sector.' }),

  q('gh-29', 'eso',
    { es: '¿Por qué el turismo es tan importante en la economía española?', en: 'Why is tourism so important to the Spanish economy?', ca: 'Per què el turisme és tan important en l\'economia espanyola?' },
    { es: ['Aporta una parte muy grande del PIB y del empleo, sobre todo en costa e islas', 'Porque no necesita trabajadores', 'Porque sustituye al sector primario', 'Porque es igual todo el año'], en: ['It provides a very large share of GDP and jobs, especially on the coast and islands', 'Because it needs no workers', 'Because it replaces the primary sector', 'Because it is the same all year'], ca: ['Aporta una part molt gran del PIB i de l\'ocupació, sobretot a costa i illes', 'Perquè no necessita treballadors', 'Perquè substitueix el sector primari', 'Perquè és igual tot l\'any'] },
    { es: 'Aporta una parte muy grande del PIB y del empleo, sobre todo en costa e islas', en: 'It provides a very large share of GDP and jobs, especially on the coast and islands', ca: 'Aporta una part molt gran del PIB i de l\'ocupació, sobretot a costa i illes' },
    '🏖️',
    { es: 'España es de los países más visitados del mundo. Tiene su cara B: el empleo es muy estacional, presiona el precio de la vivienda y concentra el desarrollo en la costa dejando el interior atrás.', en: 'Spain is among the world\'s most visited countries. There is a flip side: jobs are highly seasonal and it pushes up housing costs.', ca: 'Espanya és dels països més visitats del món, però l\'ocupació és molt estacional.' }),

  q('gh-30', 'eso',
    { es: '¿Qué mide el PIB de un país?', en: 'What does a country\'s GDP measure?', ca: 'Què mesura el PIB d\'un país?' },
    { es: ['El valor de todos los bienes y servicios producidos en un año', 'El dinero que tiene el Estado', 'La población total', 'Lo que cobra de media un trabajador'], en: ['The value of all goods and services produced in a year', 'The money the State holds', 'The total population', 'The average worker\'s pay'], ca: ['El valor de tots els béns i serveis produïts en un any', 'Els diners que té l\'Estat', 'La població total', 'El que cobra de mitjana un treballador'] },
    { es: 'El valor de todos los bienes y servicios producidos en un año', en: 'The value of all goods and services produced in a year', ca: 'El valor de tots els béns i serveis produïts en un any' },
    '💶',
    { es: 'Producto Interior Bruto. Para comparar países se usa el PIB per cápita, que lo divide entre los habitantes: China tiene un PIB enorme y un PIB per cápita mucho menor que el de Noruega.', en: 'Gross Domestic Product. To compare countries you use GDP per capita, dividing by population.', ca: 'Producte Interior Brut. Per comparar països s\'usa el PIB per càpita.' }),

  q('gh-31', 'eso',
    { es: '¿Qué es la deslocalización industrial?', en: 'What is industrial offshoring?', ca: 'Què és la deslocalització industrial?' },
    { es: ['Trasladar la producción a países donde fabricar cuesta menos', 'Cerrar una fábrica definitivamente', 'Cambiar de producto', 'Vender la empresa al Estado'], en: ['Moving production to countries where making things costs less', 'Closing a factory for good', 'Changing product', 'Selling the firm to the State'], ca: ['Traslladar la producció a països on fabricar costa menys', 'Tancar una fàbrica definitivament', 'Canviar de producte', 'Vendre l\'empresa a l\'Estat'] },
    { es: 'Trasladar la producción a países donde fabricar cuesta menos', en: 'Moving production to countries where making things costs less', ca: 'Traslladar la producció a països on fabricar costa menys' },
    '🌐',
    { es: 'Es una de las consecuencias más visibles de la globalización: la empresa sigue siendo europea pero fabrica en Asia. Abarata el producto y destruye empleo industrial en el país de origen.', en: 'One of globalisation\'s most visible effects: the firm stays European but manufactures in Asia. It makes goods cheaper and destroys industrial jobs at home.', ca: 'És una de les conseqüències més visibles de la globalització.' }),

  q('gh-32', 'eso',
    { es: '¿Qué es el desarrollo sostenible?', en: 'What is sustainable development?', ca: 'Què és el desenvolupament sostenible?' },
    { es: ['Cubrir las necesidades de hoy sin comprometer las de las generaciones futuras', 'Crecer económicamente lo más rápido posible', 'Dejar de usar recursos naturales', 'Producir solo en el propio país'], en: ['Meeting today\'s needs without compromising future generations\'', 'Growing economically as fast as possible', 'Stopping the use of natural resources', 'Producing only within your own country'], ca: ['Cobrir les necessitats d\'avui sense comprometre les de les generacions futures', 'Créixer econòmicament tan de pressa com es pugui', 'Deixar d\'utilitzar recursos naturals', 'Produir només al propi país'] },
    { es: 'Cubrir las necesidades de hoy sin comprometer las de las generaciones futuras', en: 'Meeting today\'s needs without compromising future generations\'', ca: 'Cobrir les necessitats d\'avui sense comprometre les de les generacions futures' },
    '♻️',
    { es: 'Es la definición del Informe Brundtland de 1987 y la que piden los exámenes. No dice "no crecer": dice crecer sin gastarse el capital natural que necesitarán los que vengan detrás.', en: 'It is the 1987 Brundtland Report definition. It does not say "do not grow": it says grow without spending the natural capital those after us will need.', ca: 'És la definició de l\'Informe Brundtland de 1987. No diu "no créixer".' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 28 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
