// Continentes y Océanos: se pide un continente, un océano, un mar o el
// continente de un país, y se toca en el mapa del mundo.
//
//   continente  tocar cualquier país de ese continente
//   pais        «¿En qué continente está Kenia?» → tocar ese continente
//   oceano      tocar el punto de ese océano (hay varios puntos por océano)
//   ruta        «Un barco va de España a Brasil: ¿qué océano cruza?» → punto
//   mar         tocar el punto de ese mar o golfo
//
// El mapa es equirectangular (lon/lat → x/y lineal): así un punto se coloca
// con sus coordenadas tal cual y, al tocar un país que está a caballo entre
// dos continentes, se puede saber DÓNDE se ha tocado.
//
// Regla de la casa: nunca marcar mal lo que un libro de texto aceptaría. Por
// eso los países transcontinentales (Turquía, el Cáucaso, Kazajistán, Chipre)
// valen para Europa y para Asia, Rusia se parte por los Urales (60° E),
// Canarias vale para Europa y África, y la mitad indonesia de Nueva Guinea
// para Asia y Oceanía. Los mares que forman parte de un océano (Caribe,
// Arábigo…) solo se preguntan en su propio nivel, donde no hay puntos de
// océano con los que confundirse.

export const tx = (o, l) => o[l] ?? o.es
const T = (es, en, ca) => ({ es, en, ca })

export const CONTINENTES = {
  europa: { nombre: T('Europa', 'Europe', 'Europa'), etiqueta: [15, 52],
    dato: T('Europa va del Atlántico a los montes Urales y del océano Glacial Ártico al Mediterráneo. Es uno de los continentes más pequeños, pero de los más poblados.', 'Europe stretches from the Atlantic to the Ural Mountains and from the Arctic Ocean to the Mediterranean. It is one of the smallest continents but one of the most densely populated.', 'Europa va de l’Atlàntic als monts Urals i de l’oceà Glacial Àrtic a la Mediterrània. És un dels continents més petits, però dels més poblats.') },
  asia: { nombre: T('Asia', 'Asia', 'Àsia'), etiqueta: [95, 45],
    dato: T('Asia es el continente más grande y el más poblado: ahí están China y la India. Los Urales la separan de Europa.', 'Asia is the largest and most populated continent: China and India are there. The Urals separate it from Europe.', 'Àsia és el continent més gran i el més poblat: hi ha la Xina i l’Índia. Els Urals la separen d’Europa.') },
  africa: { nombre: T('África', 'Africa', 'l’Àfrica'), etiqueta: [20, 5],
    dato: T('África la cruza el ecuador por la mitad. El estrecho de Gibraltar la separa de Europa por solo 14 km, y el canal de Suez, de Asia.', 'The equator crosses Africa through the middle. The Strait of Gibraltar separates it from Europe by only 14 km, and the Suez Canal from Asia.', 'L’equador travessa l’Àfrica pel mig. L’estret de Gibraltar la separa d’Europa per només 14 km, i el canal de Suez, d’Àsia.') },
  america: { nombre: T('América', 'the Americas', 'Amèrica'), etiqueta: [-100, 40],
    dato: T('América va casi de polo a polo: América del Norte, Central y del Sur. El Atlántico la separa de Europa y África, y el Pacífico, de Asia y Oceanía.', 'The Americas run almost from pole to pole: North, Central and South America. The Atlantic separates them from Europe and Africa, and the Pacific from Asia and Oceania.', 'Amèrica va gairebé de pol a pol: Amèrica del Nord, Central i del Sud. L’Atlàntic la separa d’Europa i l’Àfrica, i el Pacífic, d’Àsia i Oceania.') },
  oceania: { nombre: T('Oceanía', 'Oceania', 'Oceania'), etiqueta: [140, -25],
    dato: T('Oceanía es el continente más pequeño: Australia, Nueva Zelanda, Nueva Guinea y miles de islas del Pacífico.', 'Oceania is the smallest continent: Australia, New Zealand, New Guinea and thousands of Pacific islands.', 'Oceania és el continent més petit: Austràlia, Nova Zelanda, Nova Guinea i milers d’illes del Pacífic.') },
  antartida: { nombre: T('la Antártida', 'Antarctica', 'l’Antàrtida'), etiqueta: [0, -80],
    dato: T('La Antártida, alrededor del polo sur, está cubierta de hielo y no tiene población permanente: solo bases científicas.', 'Antarctica, around the South Pole, is covered in ice and has no permanent population: only research stations.', 'L’Antàrtida, al voltant del pol sud, està coberta de gel i no té població permanent: només bases científiques.') },
}

export const OCEANOS = {
  pacifico: { nombre: T('el océano Pacífico', 'the Pacific Ocean', 'l’oceà Pacífic'), puntos: [[-140, 5], [165, 12]],
    dato: T('El Pacífico es el océano más grande y más profundo: ocupa casi un tercio de la Tierra, entre América, Asia y Oceanía.', 'The Pacific is the largest and deepest ocean: it covers almost a third of the Earth, between the Americas, Asia and Oceania.', 'El Pacífic és l’oceà més gran i més profund: ocupa gairebé un terç de la Terra, entre Amèrica, Àsia i Oceania.') },
  atlantico: { nombre: T('el océano Atlántico', 'the Atlantic Ocean', 'l’oceà Atlàntic'), puntos: [[-40, 30], [-15, -25]],
    dato: T('El Atlántico es el segundo océano más grande. Separa América de Europa y África, y baña las costas del oeste de España.', 'The Atlantic is the second largest ocean. It separates the Americas from Europe and Africa.', 'L’Atlàntic és el segon oceà més gran. Separa Amèrica d’Europa i l’Àfrica, i banya les costes de l’oest d’Espanya.') },
  indico: { nombre: T('el océano Índico', 'the Indian Ocean', 'l’oceà Índic'), puntos: [[78, -22]],
    dato: T('El Índico está entre África, Asia y Australia. Es el más cálido de los océanos.', 'The Indian Ocean lies between Africa, Asia and Australia. It is the warmest of the oceans.', 'L’Índic és entre l’Àfrica, Àsia i Austràlia. És el més càlid dels oceans.') },
  artico: { nombre: T('el océano Glacial Ártico', 'the Arctic Ocean', 'l’oceà Glacial Àrtic'), puntos: [[100, 83], [-160, 77]],
    dato: T('El Ártico rodea el polo norte. Es el océano más pequeño y gran parte del año está helado.', 'The Arctic Ocean surrounds the North Pole. It is the smallest ocean and much of it is frozen for most of the year.', 'L’Àrtic envolta el pol nord. És l’oceà més petit i bona part de l’any està glaçat.') },
  antartico: { nombre: T('el océano Glacial Antártico (Austral)', 'the Southern Ocean', 'l’oceà Glacial Antàrtic (Austral)'), puntos: [[60, -61], [-120, -64]],
    dato: T('El Antártico o Austral rodea la Antártida, al sur de los 60° de latitud sur.', 'The Southern Ocean surrounds Antarctica, south of 60° South.', 'L’Antàrtic o Austral envolta l’Antàrtida, al sud dels 60° de latitud sud.') },
}

export const MARES = {
  mediterraneo: { nombre: T('el mar Mediterráneo', 'the Mediterranean Sea', 'el mar Mediterrani'), punto: [18, 35],
    dato: T('El Mediterráneo está entre Europa, África y Asia, y se une al Atlántico por el estrecho de Gibraltar.', 'The Mediterranean lies between Europe, Africa and Asia, and joins the Atlantic at the Strait of Gibraltar.', 'La Mediterrània és entre Europa, l’Àfrica i Àsia, i s’uneix a l’Atlàntic per l’estret de Gibraltar.') },
  negro: { nombre: T('el mar Negro', 'the Black Sea', 'el mar Negre'), punto: [34, 43.3],
    dato: T('El mar Negro está entre Europa y Asia, con Turquía al sur y Ucrania al norte.', 'The Black Sea lies between Europe and Asia, with Turkey to the south and Ukraine to the north.', 'El mar Negre és entre Europa i Àsia, amb Turquia al sud i Ucraïna al nord.') },
  baltico: { nombre: T('el mar Báltico', 'the Baltic Sea', 'el mar Bàltic'), punto: [18.5, 55.8],
    dato: T('El Báltico está en el norte de Europa, entre Suecia, Finlandia, los países bálticos, Polonia y Alemania.', 'The Baltic is in northern Europe, between Sweden, Finland, the Baltic states, Poland and Germany.', 'El Bàltic és al nord d’Europa, entre Suècia, Finlàndia, els països bàltics, Polònia i Alemanya.') },
  norte: { nombre: T('el mar del Norte', 'the North Sea', 'el mar del Nord'), punto: [3, 56],
    dato: T('El mar del Norte está entre Gran Bretaña, Noruega, Dinamarca, Alemania y los Países Bajos.', 'The North Sea lies between Great Britain, Norway, Denmark, Germany and the Netherlands.', 'El mar del Nord és entre la Gran Bretanya, Noruega, Dinamarca, Alemanya i els Països Baixos.') },
  rojo: { nombre: T('el mar Rojo', 'the Red Sea', 'el mar Roig'), punto: [38.7, 20],
    dato: T('El mar Rojo es un mar estrecho entre África y la península arábiga; el canal de Suez lo une con el Mediterráneo.', 'The Red Sea is a narrow sea between Africa and the Arabian Peninsula; the Suez Canal links it to the Mediterranean.', 'El mar Roig és un mar estret entre l’Àfrica i la península Aràbiga; el canal de Suez l’uneix amb la Mediterrània.') },
  caribe: { nombre: T('el mar Caribe', 'the Caribbean Sea', 'el mar Carib'), punto: [-75, 15],
    dato: T('El Caribe está entre América Central, el norte de América del Sur y las Antillas (Cuba, Jamaica, La Española…).', 'The Caribbean lies between Central America, the north of South America and the Antilles (Cuba, Jamaica, Hispaniola…).', 'El Carib és entre Amèrica Central, el nord d’Amèrica del Sud i les Antilles (Cuba, Jamaica, l’Espanyola…).') },
  'golfo-mexico': { nombre: T('el golfo de México', 'the Gulf of Mexico', 'el golf de Mèxic'), punto: [-90, 25],
    dato: T('El golfo de México lo rodean México, Estados Unidos y Cuba.', 'The Gulf of Mexico is surrounded by Mexico, the United States and Cuba.', 'El golf de Mèxic l’envolten Mèxic, els Estats Units i Cuba.') },
  bengala: { nombre: T('el golfo de Bengala', 'the Bay of Bengal', 'el golf de Bengala'), punto: [88, 15],
    dato: T('El golfo de Bengala está al este de la India, con Bangladés al norte y Birmania al este.', 'The Bay of Bengal lies east of India, with Bangladesh to the north and Myanmar to the east.', 'El golf de Bengala és a l’est de l’Índia, amb Bangladesh al nord i Birmània a l’est.') },
  'china-meridional': { nombre: T('el mar de China Meridional', 'the South China Sea', 'el mar de la Xina Meridional'), punto: [114, 13],
    dato: T('El mar de China Meridional está entre el sur de China, Vietnam, Filipinas y Borneo.', 'The South China Sea lies between southern China, Vietnam, the Philippines and Borneo.', 'El mar de la Xina Meridional és entre el sud de la Xina, Vietnam, les Filipines i Borneo.') },
}

// Países de los que se pregunta el continente: solo los de un solo continente
// sin discusión (nada de Turquía, Rusia, Egipto o Indonesia).
export const PAISES = {
  kenia: { nombre: T('Kenia', 'Kenya', 'Kenya'), c: 'africa' },
  nigeria: { nombre: T('Nigeria', 'Nigeria', 'Nigèria'), c: 'africa' },
  marruecos: { nombre: T('Marruecos', 'Morocco', 'el Marroc'), c: 'africa' },
  sudafrica: { nombre: T('Sudáfrica', 'South Africa', 'Sud-àfrica'), c: 'africa' },
  etiopia: { nombre: T('Etiopía', 'Ethiopia', 'Etiòpia'), c: 'africa' },
  madagascar: { nombre: T('Madagascar', 'Madagascar', 'Madagascar'), c: 'africa' },
  argentina: { nombre: T('Argentina', 'Argentina', 'l’Argentina'), c: 'america' },
  peru: { nombre: T('Perú', 'Peru', 'el Perú'), c: 'america' },
  canada: { nombre: T('Canadá', 'Canada', 'el Canadà'), c: 'america' },
  mexico: { nombre: T('México', 'Mexico', 'Mèxic'), c: 'america' },
  cuba: { nombre: T('Cuba', 'Cuba', 'Cuba'), c: 'america' },
  colombia: { nombre: T('Colombia', 'Colombia', 'Colòmbia'), c: 'america' },
  japon: { nombre: T('Japón', 'Japan', 'el Japó'), c: 'asia' },
  india: { nombre: T('la India', 'India', 'l’Índia'), c: 'asia' },
  tailandia: { nombre: T('Tailandia', 'Thailand', 'Tailàndia'), c: 'asia' },
  'arabia-saudi': { nombre: T('Arabia Saudí', 'Saudi Arabia', 'l’Aràbia Saudita'), c: 'asia' },
  vietnam: { nombre: T('Vietnam', 'Vietnam', 'el Vietnam'), c: 'asia' },
  mongolia: { nombre: T('Mongolia', 'Mongolia', 'Mongòlia'), c: 'asia' },
  filipinas: { nombre: T('Filipinas', 'the Philippines', 'les Filipines'), c: 'asia' },
  noruega: { nombre: T('Noruega', 'Norway', 'Noruega'), c: 'europa' },
  polonia: { nombre: T('Polonia', 'Poland', 'Polònia'), c: 'europa' },
  islandia: { nombre: T('Islandia', 'Iceland', 'Islàndia'), c: 'europa' },
  finlandia: { nombre: T('Finlandia', 'Finland', 'Finlàndia'), c: 'europa' },
  grecia: { nombre: T('Grecia', 'Greece', 'Grècia'), c: 'europa' },
  australia: { nombre: T('Australia', 'Australia', 'Austràlia'), c: 'oceania' },
  'nueva-zelanda': { nombre: T('Nueva Zelanda', 'New Zealand', 'Nova Zelanda'), c: 'oceania' },
  'papua-nueva-guinea': { nombre: T('Papúa Nueva Guinea', 'Papua New Guinea', 'Papua Nova Guinea'), c: 'oceania' },
  fiyi: { nombre: T('Fiyi', 'Fiji', 'Fiji'), c: 'oceania' },
}

// Travesías de un barco por el camino más corto: el océano que hay en medio
// no admite discusión en ninguna.
const LUGAR = {
  espana: [T('España', 'Spain', 'Espanya'), [-4, 40]],
  brasil: [T('Brasil', 'Brazil', 'el Brasil'), [-47, -12]],
  portugal: [T('Portugal', 'Portugal', 'Portugal'), [-8.3, 39.6]],
  cuba: [T('Cuba', 'Cuba', 'Cuba'), [-79, 21.8]],
  japon: [T('Japón', 'Japan', 'el Japó'), [138.5, 36]],
  california: [T('California (EE. UU.)', 'California (USA)', 'Califòrnia (EUA)'), [-120, 37]],
  chile: [T('Chile', 'Chile', 'Xile'), [-71, -33]],
  'nueva-zelanda': [T('Nueva Zelanda', 'New Zealand', 'Nova Zelanda'), [174, -40]],
  sudafrica: [T('Sudáfrica', 'South Africa', 'Sud-àfrica'), [25, -29]],
  australia: [T('Australia', 'Australia', 'Austràlia'), [134, -25]],
  india: [T('la India', 'India', 'l’Índia'), [78, 21]],
  madagascar: [T('Madagascar', 'Madagascar', 'Madagascar'), [46.8, -19]],
  peru: [T('Perú', 'Peru', 'el Perú'), [-75, -10]],
  argentina: [T('Argentina', 'Argentina', 'l’Argentina'), [-64, -34]],
  marruecos: [T('Marruecos', 'Morocco', 'el Marroc'), [-6, 32]],
  'estados-unidos-este': [T('Nueva York (EE. UU.)', 'New York (USA)', 'Nova York (EUA)'), [-74, 40.7]],
}
export const lugar = id => ({ id, nombre: LUGAR[id][0], coord: LUGAR[id][1] })

export const RUTAS = [
  { id: 'espana-brasil', a: 'espana', b: 'brasil', o: 'atlantico' },
  { id: 'portugal-cuba', a: 'portugal', b: 'cuba', o: 'atlantico' },
  { id: 'marruecos-nueva-york', a: 'marruecos', b: 'estados-unidos-este', o: 'atlantico' },
  { id: 'argentina-sudafrica', a: 'argentina', b: 'sudafrica', o: 'atlantico' },
  { id: 'japon-california', a: 'japon', b: 'california', o: 'pacifico' },
  { id: 'chile-nueva-zelanda', a: 'chile', b: 'nueva-zelanda', o: 'pacifico' },
  { id: 'peru-australia', a: 'peru', b: 'australia', o: 'pacifico' },
  { id: 'sudafrica-australia', a: 'sudafrica', b: 'australia', o: 'indico' },
  { id: 'india-madagascar', a: 'india', b: 'madagascar', o: 'indico' },
]

// ── País del mapa → continente ────────────────────────────────────────────
// Nombres tal como vienen en world-atlas/countries-110m (el test comprueba
// que no queda ninguno sin asignar).
const POR_NOMBRE = {}
const pon = (c, nombres) => nombres.split('|').forEach(n => { POR_NOMBRE[n] = c })
pon('europa', 'Norway|France|Sweden|Belarus|Ukraine|Poland|Austria|Hungary|Moldova|Romania|Lithuania|Latvia|Estonia|Germany|Bulgaria|Greece|Albania|Croatia|Switzerland|Luxembourg|Belgium|Netherlands|Portugal|Spain|Ireland|Italy|Denmark|United Kingdom|Iceland|Slovenia|Finland|Slovakia|Czechia|Bosnia and Herz.|Macedonia|Serbia|Montenegro|Kosovo')
pon('europa+asia', 'Russia|Kazakhstan|Turkey|Georgia|Azerbaijan|Armenia|Cyprus|N. Cyprus')
pon('asia', 'Uzbekistan|Indonesia|Timor-Leste|Israel|Lebanon|Palestine|Jordan|United Arab Emirates|Qatar|Kuwait|Iraq|Oman|Cambodia|Thailand|Laos|Myanmar|Vietnam|North Korea|South Korea|Mongolia|India|Bangladesh|Bhutan|Nepal|Pakistan|Afghanistan|Tajikistan|Kyrgyzstan|Turkmenistan|Iran|Syria|Sri Lanka|China|Taiwan|Philippines|Malaysia|Brunei|Japan|Yemen|Saudi Arabia')
pon('africa', 'Tanzania|W. Sahara|Dem. Rep. Congo|Somalia|Kenya|Sudan|Chad|South Africa|Lesotho|Zimbabwe|Botswana|Namibia|Senegal|Mali|Mauritania|Benin|Niger|Nigeria|Cameroon|Togo|Ghana|Côte d\'Ivoire|Guinea|Guinea-Bissau|Liberia|Sierra Leone|Burkina Faso|Central African Rep.|Congo|Gabon|Eq. Guinea|Zambia|Malawi|Mozambique|eSwatini|Angola|Burundi|Madagascar|Gambia|Tunisia|Algeria|Eritrea|Morocco|Egypt|Libya|Ethiopia|Djibouti|Somaliland|Uganda|Rwanda|S. Sudan')
pon('america', 'Canada|United States of America|Argentina|Chile|Haiti|Dominican Rep.|Bahamas|Falkland Is.|Greenland|Mexico|Uruguay|Brazil|Bolivia|Peru|Colombia|Panama|Costa Rica|Nicaragua|Honduras|El Salvador|Guatemala|Belize|Venezuela|Guyana|Suriname|Ecuador|Puerto Rico|Jamaica|Cuba|Paraguay|Trinidad and Tobago')
pon('oceania', 'Fiji|Papua New Guinea|Vanuatu|New Caledonia|Solomon Is.|New Zealand|Australia')
pon('antartida', 'Antarctica')
// Sin continente que preguntar (islas subantárticas sueltas): no se pueden tocar
export const SIN_CONTINENTE = ['Fr. S. Antarctic Lands']

// Continente(s) válidos al tocar un país en (lon, lat). Lista vacía = no cuenta.
export function continentesDe(nombre, lon, lat) {
  const base = POR_NOMBRE[nombre]
  if (!base) return []
  if (nombre === 'Russia') return [lon < 60 && lon > 0 ? 'europa' : 'asia']
  if (nombre === 'France' && lon < -20) return ['america'] // Guayana Francesa
  if (nombre === 'Spain' && lat < 31) return ['europa', 'africa'] // Canarias
  if (nombre === 'Indonesia' && lon > 130.5) return ['asia', 'oceania'] // Nueva Guinea
  if (nombre === 'United States of America' && lon < -150 && lat < 30) return ['america', 'oceania'] // Hawái
  return base.split('+')
}
// Para colorear al corregir: ¿este país es de ese continente? Se pinta el país
// entero, así que los trozos sueltos (Guayana Francesa, Nueva Guinea indonesia)
// no tiñen a Francia de América ni a Indonesia de Oceanía; tocarlos sí cuenta.
export const tocaContinente = (nombre, c) => (POR_NOMBRE[nombre] ?? '').split('+').includes(c)
export const nombresMapeados = () => Object.keys(POR_NOMBRE)

// ── Niveles y rondas ──────────────────────────────────────────────────────
export const NIVELES = {
  facil: { tipos: ['continente', 'oceano'] },
  medio: { tipos: ['continente', 'oceano', 'pais', 'pais'] },
  dificil: { tipos: ['mar', 'mar', 'ruta', 'pais'] },
}

const pick = (arr, rand) => arr[Math.floor(rand() * arr.length)]

// Memoria corta para no repetir lo mismo dos rondas seguidas (el arcade y el
// examen piden rondas de una en una).
const recientes = []
function elige(ids, rand) {
  const libres = ids.filter(id => !recientes.includes(id))
  const id = pick(libres.length ? libres : ids, rand)
  recientes.push(id)
  if (recientes.length > Math.min(8, Math.floor(ids.length / 2))) recientes.shift()
  return id
}

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const tipo = pick(NIVELES[nivel].tipos, rand)
  if (tipo === 'continente') {
    const k = elige(Object.keys(CONTINENTES).map(c => `continente:${c}`), rand).split(':')[1]
    return { id: `continente:${k}`, tipo, nivel, objetivo: k }
  }
  if (tipo === 'oceano') {
    const k = elige(Object.keys(OCEANOS).map(o => `oceano:${o}`), rand).split(':')[1]
    return { id: `oceano:${k}`, tipo, nivel, objetivo: k }
  }
  if (tipo === 'mar') {
    const k = elige(Object.keys(MARES).map(m => `mar:${m}`), rand).split(':')[1]
    return { id: `mar:${k}`, tipo, nivel, objetivo: k }
  }
  if (tipo === 'pais') {
    const k = elige(Object.keys(PAISES).map(p => `pais:${p}`), rand).split(':')[1]
    return { id: `pais:${k}`, tipo, nivel, pais: k, objetivo: PAISES[k].c }
  }
  const id = elige(RUTAS.map(r => `ruta:${r.id}`), rand).split(':')[1]
  const r = RUTAS.find(x => x.id === id)
  return { id: `ruta:${id}`, tipo, nivel, ruta: id, a: r.a, b: r.b, objetivo: r.o }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuestas: «c:europa+asia» (continentes válidos del sitio tocado),
// «o:atlantico» (punto de océano) o «m:negro» (punto de mar).
export const enContinente = r => r.tipo === 'continente' || r.tipo === 'pais'
export const enOceano = r => r.tipo === 'oceano' || r.tipo === 'ruta'
export function esCorrecta(r, x) {
  if (!x) return false
  const [k, v] = x.split(':')
  if (enContinente(r)) return k === 'c' && v.split('+').includes(r.objetivo)
  if (enOceano(r)) return k === 'o' && v === r.objetivo
  return k === 'm' && v === r.objetivo
}

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const cap = t => t.charAt(0).toUpperCase() + t.slice(1)
export const nombreObjetivo = (r, l) => tx(
  enContinente(r) ? CONTINENTES[r.objetivo].nombre : enOceano(r) ? OCEANOS[r.objetivo].nombre : MARES[r.objetivo].nombre, l)

export function enunciado(r, l) {
  if (r.tipo === 'continente') return s(l, `Toca ${tx(CONTINENTES[r.objetivo].nombre, 'es')}`, `Tap ${tx(CONTINENTES[r.objetivo].nombre, 'en')}`, `Toca ${tx(CONTINENTES[r.objetivo].nombre, 'ca')}`)
  if (r.tipo === 'oceano' || r.tipo === 'mar') return s(l, `Toca ${nombreObjetivo(r, 'es')}`, `Tap ${nombreObjetivo(r, 'en')}`, `Toca ${nombreObjetivo(r, 'ca')}`)
  if (r.tipo === 'pais') {
    const p = PAISES[r.pais].nombre
    return s(l, `¿En qué continente está ${tx(p, 'es')}? Toca el continente`, `Which continent is ${tx(p, 'en')} in? Tap the continent`, `A quin continent és ${tx(p, 'ca')}? Toca el continent`)
  }
  const a = lugar(r.a).nombre, b = lugar(r.b).nombre
  return s(l, `Un barco va de ${tx(a, 'es')} a ${tx(b, 'es')} por el camino más corto. ¿Qué océano cruza?`, `A ship sails from ${tx(a, 'en')} to ${tx(b, 'en')} by the shortest route. Which ocean does it cross?`, `Un vaixell va de ${tx(a, 'ca')} a ${tx(b, 'ca')} pel camí més curt. Quin oceà travessa?`)
}

export function explicacion(r, l) {
  if (r.tipo === 'pais') {
    const p = tx(PAISES[r.pais].nombre, l)
    return `${s(l, `${cap(p)} está en ${tx(CONTINENTES[r.objetivo].nombre, 'es')}.`, `${cap(p)} is in ${tx(CONTINENTES[r.objetivo].nombre, 'en')}.`, `${cap(p)} és a ${tx(CONTINENTES[r.objetivo].nombre, 'ca')}.`)} ${tx(CONTINENTES[r.objetivo].dato, l)}`
  }
  if (r.tipo === 'ruta') {
    const a = tx(lugar(r.a).nombre, l), b = tx(lugar(r.b).nombre, l)
    return `${s(l, `Entre ${a} y ${b} está ${nombreObjetivo(r, 'es')}.`, `Between ${a} and ${b} lies ${nombreObjetivo(r, 'en')}.`, `Entre ${a} i ${b} hi ha ${nombreObjetivo(r, 'ca')}.`)} ${tx(OCEANOS[r.objetivo].dato, l)}`
  }
  const d = enContinente(r) ? CONTINENTES[r.objetivo].dato : enOceano(r) ? OCEANOS[r.objetivo].dato : MARES[r.objetivo].dato
  return tx(d, l)
}

// Pregunta tipo test para el JSON-LD del examen. Solo las que se entienden
// sin mapa (el continente de un país, el océano de una travesía): «toca
// Europa» no es una pregunta fuera del dibujo, y MechanicExam se salta los null.
export function schemaQuestion(r, l) {
  if (r.tipo !== 'pais' && r.tipo !== 'ruta') return null
  const nombres = r.tipo === 'pais' ? Object.values(CONTINENTES) : Object.values(OCEANOS)
  const buena = cap(nombreObjetivo(r, l))
  const malas = nombres.map(n => cap(tx(n.nombre, l))).filter(n => n !== buena).slice(0, 3)
  const question = r.tipo === 'pais'
    ? s(l, `¿En qué continente está ${tx(PAISES[r.pais].nombre, 'es')}?`, `Which continent is ${tx(PAISES[r.pais].nombre, 'en')} in?`, `A quin continent és ${tx(PAISES[r.pais].nombre, 'ca')}?`)
    : enunciado(r, l)
  return { question, correctAnswer: buena, wrongAnswers: malas }
}
