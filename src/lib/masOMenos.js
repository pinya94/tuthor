// ¿Más o Menos?: racha de comparaciones de geografía. Sale un dato conocido
// (Cataluña: 8,0 millones de habitantes) y otro lugar: ¿más o menos? Al
// responder, el nuevo pasa a ser el que hay que superar. Cada pocas rondas
// cambia la magnitud: población, superficie, altura de montañas y longitud
// de ríos.
//
// Para que la respuesta no sea discutible:
//   · población, sin ciudades (municipio y área metropolitana dan órdenes
//     distintos: París tiene menos que Madrid o muchísimos más);
//   · superficie, sin países con dos cifras «oficiales» (Francia con o sin
//     ultramar, Noruega con o sin Svalbard, Marruecos con o sin el Sáhara);
//   · ríos, sin el Misisipi (con o sin el Misuri);
//   · margen mínimo entre los dos datos según lo fiable que es la magnitud
//     (MARGEN): una altura apenas varía entre fuentes; un río, hasta un 10 %.
// Datos aproximados de 2024 (población: ONU e INE; superficies y alturas
// oficiales; ríos, valores habituales en los libros de texto).

const T = (es, en, ca) => ({ es, en, ca })
const I = (id, nombre, v, extra = {}) => ({ id, nombre, v, ...extra })

export const CATEGORIAS = {
  poblacion: {
    emoji: '👥', margen: 1.25,
    mas: T('Más habitantes', 'More people', 'Més habitants'), menos: T('Menos habitantes', 'Fewer people', 'Menys habitants'),
    pregunta: T('¿Tiene más o menos habitantes?', 'Does it have more or fewer people?', 'Té més o menys habitants?'),
    items: [
      I('china', T('China', 'China', 'Xina'), 1410e6), I('eeuu', T('EE. UU.', 'USA', 'EUA'), 335e6),
      I('indonesia', T('Indonesia', 'Indonesia', 'Indonèsia'), 278e6), I('brasil', T('Brasil', 'Brazil', 'Brasil'), 216e6),
      I('rusia', T('Rusia', 'Russia', 'Rússia'), 144e6), I('mexico', T('México', 'Mexico', 'Mèxic'), 129e6),
      I('japon', T('Japón', 'Japan', 'Japó'), 124e6), I('egipto', T('Egipto', 'Egypt', 'Egipte'), 112e6),
      I('turquia', T('Turquía', 'Turkey', 'Turquia'), 85e6), I('alemania', T('Alemania', 'Germany', 'Alemanya'), 84e6),
      I('francia', T('Francia', 'France', 'França'), 68e6), I('reino-unido', T('Reino Unido', 'United Kingdom', 'Regne Unit'), 68e6),
      I('italia', T('Italia', 'Italy', 'Itàlia'), 59e6), I('kenia', T('Kenia', 'Kenya', 'Kenya'), 55e6),
      I('corea-sur', T('Corea del Sur', 'South Korea', 'Corea del Sud'), 51.7e6), I('espana', T('España', 'Spain', 'Espanya'), 48.6e6),
      I('argentina', T('Argentina', 'Argentina', 'Argentina'), 46e6), I('canada', T('Canadá', 'Canada', 'Canadà'), 40e6),
      I('marruecos', T('Marruecos', 'Morocco', 'el Marroc'), 37e6), I('australia', T('Australia', 'Australia', 'Austràlia'), 27e6),
      I('chile', T('Chile', 'Chile', 'Xile'), 19.6e6), I('paises-bajos', T('Países Bajos', 'Netherlands', 'Països Baixos'), 17.9e6),
      I('belgica', T('Bélgica', 'Belgium', 'Bèlgica'), 11.8e6), I('portugal', T('Portugal', 'Portugal', 'Portugal'), 10.6e6),
      I('suecia', T('Suecia', 'Sweden', 'Suècia'), 10.5e6), I('suiza', T('Suiza', 'Switzerland', 'Suïssa'), 8.9e6),
      I('noruega', T('Noruega', 'Norway', 'Noruega'), 5.5e6), I('irlanda', T('Irlanda', 'Ireland', 'Irlanda'), 5.3e6),
      I('nueva-zelanda', T('Nueva Zelanda', 'New Zealand', 'Nova Zelanda'), 5.2e6), I('islandia', T('Islandia', 'Iceland', 'Islàndia'), 390e3),
      I('andorra', T('Andorra', 'Andorra', 'Andorra'), 80e3),
      // Comunidades autónomas (INE 2024)
      I('c-andalucia', T('Andalucía', 'Andalusia', 'Andalusia'), 8.6e6, { esp: true }), I('c-cataluna', T('Cataluña', 'Catalonia', 'Catalunya'), 8.0e6, { esp: true }),
      I('c-madrid', T('Comunidad de Madrid', 'Madrid region', 'Comunitat de Madrid'), 7.0e6, { esp: true }), I('c-valencia', T('Comunidad Valenciana', 'Valencian Community', 'Comunitat Valenciana'), 5.3e6, { esp: true }),
      I('c-galicia', T('Galicia', 'Galicia', 'Galícia'), 2.7e6, { esp: true }), I('c-cyl', T('Castilla y León', 'Castile and León', 'Castella i Lleó'), 2.4e6, { esp: true }),
      I('c-pais-vasco', T('País Vasco', 'Basque Country', 'País Basc'), 2.2e6, { esp: true }), I('c-canarias', T('Canarias', 'Canary Islands', 'Canàries'), 2.2e6, { esp: true }),
      I('c-murcia', T('Región de Murcia', 'Murcia', 'Regió de Múrcia'), 1.55e6, { esp: true }), I('c-aragon', T('Aragón', 'Aragon', 'Aragó'), 1.35e6, { esp: true }),
      I('c-baleares', T('Baleares', 'Balearic Islands', 'Balears'), 1.2e6, { esp: true }), I('c-extremadura', T('Extremadura', 'Extremadura', 'Extremadura'), 1.05e6, { esp: true }),
      I('c-asturias', T('Asturias', 'Asturias', 'Astúries'), 1.0e6, { esp: true }), I('c-navarra', T('Navarra', 'Navarre', 'Navarra'), 680e3, { esp: true }),
      I('c-cantabria', T('Cantabria', 'Cantabria', 'Cantàbria'), 590e3, { esp: true }), I('c-rioja', T('La Rioja', 'La Rioja', 'La Rioja'), 320e3, { esp: true }),
    ],
  },
  superficie: {
    emoji: '🗺️', margen: 1.15,
    // «más superficie» y no «más grande»: así no hay que concordar el género
    mas: T('Más superficie', 'Bigger', 'Més superfície'), menos: T('Menos superficie', 'Smaller', 'Menys superfície'),
    pregunta: T('¿Tiene más o menos superficie?', 'Is it bigger or smaller?', 'Té més o menys superfície?'),
    items: [
      I('rusia', T('Rusia', 'Russia', 'Rússia'), 17098e3), I('canada', T('Canadá', 'Canada', 'Canadà'), 9985e3),
      I('eeuu', T('EE. UU.', 'USA', 'EUA'), 9834e3), I('china', T('China', 'China', 'Xina'), 9597e3),
      I('brasil', T('Brasil', 'Brazil', 'Brasil'), 8516e3), I('australia', T('Australia', 'Australia', 'Austràlia'), 7692e3),
      I('india', T('India', 'India', 'Índia'), 3287e3), I('argentina', T('Argentina', 'Argentina', 'Argentina'), 2780e3),
      I('mexico', T('México', 'Mexico', 'Mèxic'), 1964e3), I('egipto', T('Egipto', 'Egypt', 'Egipte'), 1002e3),
      I('turquia', T('Turquía', 'Turkey', 'Turquia'), 783.5e3), I('chile', T('Chile', 'Chile', 'Xile'), 756e3),
      I('kenia', T('Kenia', 'Kenya', 'Kenya'), 580e3), I('espana', T('España', 'Spain', 'Espanya'), 506e3),
      I('japon', T('Japón', 'Japan', 'Japó'), 378e3), I('alemania', T('Alemania', 'Germany', 'Alemanya'), 357.6e3),
      I('italia', T('Italia', 'Italy', 'Itàlia'), 302e3), I('nueva-zelanda', T('Nueva Zelanda', 'New Zealand', 'Nova Zelanda'), 268e3),
      I('reino-unido', T('Reino Unido', 'United Kingdom', 'Regne Unit'), 242.5e3), I('grecia', T('Grecia', 'Greece', 'Grècia'), 132e3),
      I('cuba', T('Cuba', 'Cuba', 'Cuba'), 109.9e3), I('islandia', T('Islandia', 'Iceland', 'Islàndia'), 103e3),
      I('corea-sur', T('Corea del Sur', 'South Korea', 'Corea del Sud'), 100.4e3), I('portugal', T('Portugal', 'Portugal', 'Portugal'), 92.2e3),
      I('irlanda', T('Irlanda', 'Ireland', 'Irlanda'), 70.3e3), I('paises-bajos', T('Países Bajos', 'Netherlands', 'Països Baixos'), 41.85e3),
      I('suiza', T('Suiza', 'Switzerland', 'Suïssa'), 41.3e3), I('belgica', T('Bélgica', 'Belgium', 'Bèlgica'), 30.7e3),
      I('andorra', T('Andorra', 'Andorra', 'Andorra'), 468),
      I('c-cyl', T('Castilla y León', 'Castile and León', 'Castella i Lleó'), 94226, { esp: true }), I('c-andalucia', T('Andalucía', 'Andalusia', 'Andalusia'), 87599, { esp: true }),
      I('c-clm', T('Castilla-La Mancha', 'Castilla-La Mancha', 'Castella-la Manxa'), 79409, { esp: true }), I('c-aragon', T('Aragón', 'Aragon', 'Aragó'), 47720, { esp: true }),
      I('c-extremadura', T('Extremadura', 'Extremadura', 'Extremadura'), 41635, { esp: true }), I('c-cataluna', T('Cataluña', 'Catalonia', 'Catalunya'), 32108, { esp: true }),
      I('c-galicia', T('Galicia', 'Galicia', 'Galícia'), 29575, { esp: true }), I('c-valencia', T('Comunidad Valenciana', 'Valencian Community', 'Comunitat Valenciana'), 23255, { esp: true }),
      I('c-murcia', T('Región de Murcia', 'Murcia', 'Regió de Múrcia'), 11314, { esp: true }), I('c-asturias', T('Asturias', 'Asturias', 'Astúries'), 10604, { esp: true }),
      I('c-madrid', T('Comunidad de Madrid', 'Madrid region', 'Comunitat de Madrid'), 8028, { esp: true }), I('c-canarias', T('Canarias', 'Canary Islands', 'Canàries'), 7447, { esp: true }),
      I('c-pais-vasco', T('País Vasco', 'Basque Country', 'País Basc'), 7234, { esp: true }), I('c-cantabria', T('Cantabria', 'Cantabria', 'Cantàbria'), 5321, { esp: true }),
      I('c-baleares', T('Baleares', 'Balearic Islands', 'Balears'), 4992, { esp: true }),
    ],
  },
  altura: {
    emoji: '⛰️', margen: 1.08,
    // masculino: «el Teide», «el Kilimanjaro» (todos los picos de la lista lo son)
    mas: T('Más alto', 'Higher', 'Més alt'), menos: T('Más bajo', 'Lower', 'Més baix'),
    pregunta: T('¿Es más alto o más bajo?', 'Is it higher or lower?', 'És més alt o més baix?'),
    items: [
      I('everest', T('Everest (Asia)', 'Everest (Asia)', 'Everest (Àsia)'), 8849), I('k2', T('K2 (Asia)', 'K2 (Asia)', 'K2 (Àsia)'), 8611),
      I('aconcagua', T('Aconcagua (América)', 'Aconcagua (South America)', 'Aconcagua (Amèrica)'), 6961), I('denali', T('Denali (América)', 'Denali (North America)', 'Denali (Amèrica)'), 6190),
      I('kilimanjaro', T('Kilimanjaro (África)', 'Kilimanjaro (Africa)', 'Kilimanjaro (Àfrica)'), 5895), I('elbrus', T('Elbrús (Europa)', 'Elbrus (Europe)', 'Elbrus (Europa)'), 5642),
      I('mont-blanc', T('Mont Blanc (Alpes)', 'Mont Blanc (Alps)', 'Mont Blanc (Alps)'), 4806), I('cervino', T('Cervino (Alpes)', 'Matterhorn (Alps)', 'Cerví (Alps)'), 4478),
      I('fuji', T('Monte Fuji (Japón)', 'Mount Fuji (Japan)', 'Mont Fuji (Japó)'), 3776), I('teide', T('Teide (Canarias)', 'Teide (Canary Islands)', 'Teide (Canàries)'), 3715),
      I('mulhacen', T('Mulhacén (Sierra Nevada)', 'Mulhacén (Sierra Nevada)', 'Mulhacén (Sierra Nevada)'), 3479), I('aneto', T('Aneto (Pirineos)', 'Aneto (Pyrenees)', 'Aneto (Pirineus)'), 3404),
      I('olimpo', T('Olimpo (Grecia)', 'Mount Olympus (Greece)', 'Olimp (Grècia)'), 2918), I('naranjo', T('Naranjo de Bulnes (Picos de Europa)', 'Naranjo de Bulnes (Picos de Europa)', 'Naranjo de Bulnes (Picos d’Europa)'), 2519),
      I('almanzor', T('Almanzor (Gredos)', 'Almanzor (Gredos)', 'Almanzor (Gredos)'), 2591), I('moncayo', T('Moncayo (Sistema Ibérico)', 'Moncayo (Iberian System)', 'Moncayo (Sistema Ibèric)'), 2314),
      I('kosciuszko', T('Kosciuszko (Australia)', 'Kosciuszko (Australia)', 'Kosciuszko (Austràlia)'), 2228), I('ben-nevis', T('Ben Nevis (Escocia)', 'Ben Nevis (Scotland)', 'Ben Nevis (Escòcia)'), 1345),
      I('vesubio', T('Vesubio (Italia)', 'Vesuvius (Italy)', 'Vesuvi (Itàlia)'), 1281),
    ],
  },
  rios: {
    emoji: '🌊', margen: 1.35,
    mas: T('Más largo', 'Longer', 'Més llarg'), menos: T('Más corto', 'Shorter', 'Més curt'),
    pregunta: T('¿Es más largo o más corto?', 'Is it longer or shorter?', 'És més llarg o més curt?'),
    items: [
      I('nilo', T('Nilo', 'Nile', 'Nil'), 6650), I('amazonas', T('Amazonas', 'Amazon', 'Amazones'), 6400),
      I('yangtse', T('Yangtsé', 'Yangtze', 'Iang-tsé'), 6300), I('congo', T('Congo', 'Congo', 'Congo'), 4700),
      I('mekong', T('Mekong', 'Mekong', 'Mekong'), 4350), I('niger', T('Níger', 'Niger', 'Níger'), 4180),
      I('volga', T('Volga', 'Volga', 'Volga'), 3530), I('danubio', T('Danubio', 'Danube', 'Danubi'), 2850),
      I('ganges', T('Ganges', 'Ganges', 'Ganges'), 2525), I('orinoco', T('Orinoco', 'Orinoco', 'Orinoco'), 2140),
      I('rin', T('Rin', 'Rhine', 'Rin'), 1230), I('elba', T('Elba', 'Elbe', 'Elba'), 1094),
      I('tajo', T('Tajo', 'Tagus', 'Tajo'), 1007), I('loira', T('Loira', 'Loire', 'Loira'), 1006),
      I('ebro', T('Ebro', 'Ebro', 'Ebre'), 930), I('duero', T('Duero', 'Douro', 'Duero'), 897),
      I('sena', T('Sena', 'Seine', 'Sena'), 777), I('guadiana', T('Guadiana', 'Guadiana', 'Guadiana'), 744),
      I('guadalquivir', T('Guadalquivir', 'Guadalquivir', 'Guadalquivir'), 657), I('jucar', T('Júcar', 'Júcar', 'Xúquer'), 509),
      I('tiber', T('Tíber', 'Tiber', 'Tíber'), 406), I('tamesis', T('Támesis', 'Thames', 'Tàmesi'), 346),
      I('mino', T('Miño', 'Minho', 'Miño'), 340),
    ],
  },
}

// Cociente mínimo y máximo entre los dos datos por nivel (y nunca menos que
// el margen de la magnitud)
export const NIVELES = {
  facil: { min: 2, max: Infinity },
  medio: { min: 1.3, max: 2 },
  dificil: { min: 1, max: 1.45 },
}
const CAMBIO = 0.3 // probabilidad de cambiar de magnitud en cada ronda

export const item = (cat, id) => CATEGORIAS[cat].items.find(x => x.id === id)
const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]
const cociente = (a, b) => Math.max(a.v, b.v) / Math.min(a.v, b.v)

function vale(cat, a, b, nivel) {
  const N = NIVELES[nivel], c = cociente(a, b)
  return a.id !== b.id && c >= Math.max(N.min, CATEGORIAS[cat].margen) && c <= N.max
}

export function genRonda(nivel = 'facil', { rand = Math.random, anterior = null } = {}) {
  let cat = anterior?.cat, prev = anterior ? item(anterior.cat, anterior.id) : null
  if (!prev || rand() < CAMBIO) { cat = elige(rand, Object.keys(CATEGORIAS)); prev = elige(rand, CATEGORIAS[cat].items) }
  for (let intento = 0; intento < 2; intento++) {
    const opciones = CATEGORIAS[cat].items.filter(x => vale(cat, prev, x, nivel))
    if (opciones.length) {
      const act = elige(rand, opciones)
      return { id: `${nivel}:${cat}:${prev.id}:${act.id}`, nivel, cat, anterior: prev.id, actual: act.id, respuesta: act.v > prev.v ? 'mas' : 'menos' }
    }
    // sin pareja posible: otro punto de partida
    cat = elige(rand, Object.keys(CATEGORIAS)); prev = elige(rand, CATEGORIAS[cat].items)
  }
  return genRonda(nivel, { rand })
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, x) => x === r.respuesta

// ── Textos ────────────────────────────────────────────────────────────────
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const miles = (n, l) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, l === 'en' ? ',' : '.')
// Millones: un decimal por debajo de 100 (8,0) y enteros por encima (1.410)
const dec = (n, l) => (n < 100 ? n.toFixed(1).replace('.', l === 'en' ? '.' : ',') : miles(n, l))
export function valor(cat, v, l) {
  if (cat === 'poblacion') {
    if (v >= 1e6) return s(l, `${dec(v / 1e6, l)} millones de habitantes`, `${dec(v / 1e6, l)} million people`, `${dec(v / 1e6, l)} milions d’habitants`)
    return s(l, `${miles(v, l)} habitantes`, `${miles(v, l)} people`, `${miles(v, l)} habitants`)
  }
  if (cat === 'superficie') return `${miles(v, l)} km²`
  if (cat === 'altura') return `${miles(v, l)} m`
  return `${miles(v, l)} km`
}
export const nombre = (cat, id, l) => item(cat, id).nombre[l]

export function explicacion(r, l) {
  const a = item(r.cat, r.anterior), b = item(r.cat, r.actual), c = cociente(a, b)
  const veces = c >= 2 ? s(l, ` (unas ${Math.round(c)} veces)`, ` (about ${Math.round(c)} times)`, ` (unes ${Math.round(c)} vegades)`) : ''
  const C = CATEGORIAS[r.cat]
  const comp = (r.respuesta === 'mas' ? C.mas : C.menos)[l].toLowerCase()
  const nota = s(l, ' Datos aproximados de 2024.', ' Approximate 2024 figures.', ' Dades aproximades del 2024.')
  // verbo: «tiene» en población y superficie, «es» en altura y ríos; en inglés, has/is
  const tiene = r.cat === 'poblacion' || r.cat === 'superficie'
  const verbo = l === 'en' ? (r.cat === 'poblacion' ? 'has' : 'is') : tiene ? s(l, 'tiene', 'has', 'té') : s(l, 'es', 'is', 'és')
  const que = s(l, 'que', 'than', 'que')
  const sin = n => n.replace(/ (.*)$/, '') // sin la región entre paréntesis de las montañas
  return `${sin(b.nombre[l])} (${valor(r.cat, b.v, l)}) ${verbo} ${comp} ${que} ${sin(a.nombre[l])} (${valor(r.cat, a.v, l)})${veces}.${r.cat === 'poblacion' || r.cat === 'rios' ? nota : ''}`
}

export function schemaQuestion(r, l) {
  const C = CATEGORIAS[r.cat], a = item(r.cat, r.anterior), b = item(r.cat, r.actual)
  const question = `${a.nombre[l]}: ${valor(r.cat, a.v, l)}. ${b.nombre[l]}: ${C.pregunta[l]}`
  const bien = (r.respuesta === 'mas' ? C.mas : C.menos)[l], mal = (r.respuesta === 'mas' ? C.menos : C.mas)[l]
  return { question, correctAnswer: bien, wrongAnswers: [mal, s(l, 'Igual', 'The same', 'Igual'), s(l, 'No se puede saber', 'It cannot be known', 'No es pot saber')] }
}
