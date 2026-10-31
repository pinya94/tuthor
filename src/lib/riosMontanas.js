// Ríos y Montañas (geografía física de España, Primaria y ESO).
//
// Un mapa de la península con los grandes ríos y sistemas montañosos dibujados
// con coordenadas reales: el nacimiento, ciudades por las que pasa cada río y su
// desembocadura; la línea de cumbres de cada sistema. Nada se elige de una lista:
//   busca      tocar en el mapa el río o el sistema que se pide
//   etiqueta   tres elementos numerados: cada nombre a su número
//   vertiente  cuatro ríos a su vertiente (cantábrica, atlántica, mediterránea)
//   extremos   tocar, entre cuatro puntos, dónde nace o dónde desemboca un río
//
// Datos de libro de texto y nada discutible: el Guadiana no se pregunta por su
// nacimiento (Ruidera u Ojos del Guadiana, según el libro) y en «extremos» no
// salen juntos ríos que nacen casi en el mismo sitio (Tajo, Júcar y Turia nacen
// todos en los Montes Universales).

export const T = (es, en, ca) => ({ es, en, ca })
export const tx = (o, l) => (o == null ? '' : typeof o === 'string' ? o : o[l] ?? o.es)
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)

export const VERTIENTES = {
  cantabrica: T('Cantábrica', 'Cantabrian', 'Cantàbrica'),
  atlantica: T('Atlántica', 'Atlantic', 'Atlàntica'),
  mediterranea: T('Mediterránea', 'Mediterranean', 'Mediterrània'),
}

// [lon, lat]: del nacimiento a la desembocadura
export const RIOS = [
  { id: 'mino', nombre: T('Miño', 'Miño', 'Minho'), vertiente: 'atlantica', nivel: 'facil',
    nace: T('en Meira (Lugo)', 'in Meira (Lugo)', 'a Meira (Lugo)'),
    desemboca: T('en el Atlántico, entre A Guarda y Portugal: hace de frontera', 'into the Atlantic, between A Guarda and Portugal: it forms the border', 'a l’Atlàntic, entre A Guarda i Portugal: fa de frontera'),
    puntos: [[-7.53, 43.2], [-7.56, 43.01], [-7.75, 42.65], [-7.86, 42.34], [-8.2, 42.15], [-8.64, 42.04], [-8.87, 41.88]] },
  { id: 'duero', nombre: T('Duero', 'Douro', 'Duero'), vertiente: 'atlantica', nivel: 'facil',
    nace: T('en los Picos de Urbión (Soria)', 'in the Picos de Urbión (Soria)', 'als Picos de Urbión (Sòria)'),
    desemboca: T('en el Atlántico, en Oporto (Portugal)', 'into the Atlantic, at Porto (Portugal)', 'a l’Atlàntic, a Porto (Portugal)'),
    puntos: [[-2.87, 41.99], [-2.5, 41.8], [-2.55, 41.5], [-3.0, 41.55], [-3.69, 41.67], [-4.3, 41.65], [-5.0, 41.5], [-5.4, 41.52], [-5.75, 41.5], [-6.3, 41.3], [-6.7, 41.05], [-7.4, 41.15], [-8.1, 41.1], [-8.67, 41.15]] },
  { id: 'tajo', nombre: T('Tajo', 'Tagus', 'Tajo'), vertiente: 'atlantica', nivel: 'facil',
    nace: T('en los Montes Universales (Teruel), en el Sistema Ibérico', 'in the Montes Universales (Teruel), in the Iberian System', 'als Montes Universales (Terol), al Sistema Ibèric'),
    desemboca: T('en el Atlántico, en Lisboa (Portugal): es el río más largo de la península', 'into the Atlantic, at Lisbon (Portugal): it is the longest river in the peninsula', 'a l’Atlàntic, a Lisboa (Portugal): és el riu més llarg de la península'),
    puntos: [[-1.7, 40.32], [-2.1, 40.55], [-2.6, 40.68], [-3.0, 40.45], [-3.35, 40.1], [-3.6, 40.03], [-4.02, 39.86], [-4.83, 39.96], [-5.6, 39.83], [-6.4, 39.7], [-6.88, 39.72], [-7.5, 39.55], [-8.1, 39.43], [-8.68, 39.23], [-9.0, 38.85], [-9.14, 38.7]] },
  { id: 'guadiana', nombre: T('Guadiana', 'Guadiana', 'Guadiana'), vertiente: 'atlantica', nivel: 'facil', naceDiscutido: true,
    nace: T('en La Mancha (Lagunas de Ruidera u Ojos del Guadiana, según el libro)', 'in La Mancha (the Ruidera lakes or Ojos del Guadiana, depending on the textbook)', 'a La Manxa (Llacunes de Ruidera o Ojos del Guadiana, segons el llibre)'),
    desemboca: T('en el Atlántico, en Ayamonte (Huelva): hace de frontera con Portugal', 'into the Atlantic, at Ayamonte (Huelva): it forms the border with Portugal', 'a l’Atlàntic, a Ayamonte (Huelva): fa de frontera amb Portugal'),
    puntos: [[-2.85, 38.95], [-3.5, 39.1], [-3.95, 39.05], [-4.8, 39.05], [-5.6, 38.95], [-6.34, 38.92], [-6.97, 38.88], [-7.3, 38.55], [-7.55, 38.15], [-7.66, 37.64], [-7.45, 37.3], [-7.4, 37.18]] },
  { id: 'guadalquivir', nombre: T('Guadalquivir', 'Guadalquivir', 'Guadalquivir'), vertiente: 'atlantica', nivel: 'facil',
    nace: T('en la Sierra de Cazorla (Jaén)', 'in the Sierra de Cazorla (Jaén)', 'a la Sierra de Cazorla (Jaén)'),
    desemboca: T('en el Atlántico, en Sanlúcar de Barrameda (Cádiz), junto a Doñana', 'into the Atlantic, at Sanlúcar de Barrameda (Cádiz), next to Doñana', 'a l’Atlàntic, a Sanlúcar de Barrameda (Cadis), al costat de Doñana'),
    puntos: [[-2.96, 37.86], [-3.0, 38.05], [-3.4, 37.98], [-3.8, 38.0], [-4.06, 38.04], [-4.78, 37.88], [-5.3, 37.7], [-5.99, 37.38], [-6.15, 37.05], [-6.36, 36.78]] },
  { id: 'ebro', nombre: T('Ebro', 'Ebro', 'Ebre'), vertiente: 'mediterranea', nivel: 'facil',
    nace: T('en Fontibre (Cantabria), en la Cordillera Cantábrica', 'in Fontibre (Cantabria), in the Cantabrian Mountains', 'a Fontibre (Cantàbria), a la Serralada Cantàbrica'),
    desemboca: T('en el Mediterráneo, formando el delta del Ebro (Tarragona): es el gran río de la vertiente mediterránea', 'into the Mediterranean, forming the Ebro delta (Tarragona): it is the great river of the Mediterranean basin', 'a la Mediterrània, formant el delta de l’Ebre (Tarragona): és el gran riu del vessant mediterrani'),
    puntos: [[-4.19, 43.0], [-3.7, 42.8], [-3.2, 42.75], [-2.95, 42.69], [-2.45, 42.47], [-2.0, 42.25], [-1.61, 42.06], [-0.88, 41.65], [-0.3, 41.35], [0.3, 41.37], [0.45, 41.05], [0.52, 40.81], [0.87, 40.72]] },
  { id: 'jucar', nombre: T('Júcar', 'Júcar', 'Xúquer'), vertiente: 'mediterranea', nivel: 'medio',
    nace: T('en los Montes Universales (Cuenca)', 'in the Montes Universales (Cuenca)', 'als Montes Universales (Conca)'),
    desemboca: T('en el Mediterráneo, en Cullera (Valencia)', 'into the Mediterranean, at Cullera (Valencia)', 'a la Mediterrània, a Cullera (València)'),
    puntos: [[-1.85, 40.38], [-2.0, 40.2], [-2.13, 40.07], [-2.1, 39.6], [-1.85, 39.25], [-1.4, 39.15], [-0.9, 39.2], [-0.43, 39.15], [-0.25, 39.17]] },
  { id: 'turia', nombre: T('Turia', 'Turia', 'Túria'), vertiente: 'mediterranea', nivel: 'medio',
    nace: T('en los Montes Universales (Teruel)', 'in the Montes Universales (Teruel)', 'als Montes Universales (Terol)'),
    desemboca: T('en el Mediterráneo, en Valencia', 'into the Mediterranean, at Valencia', 'a la Mediterrània, a València'),
    puntos: [[-1.67, 40.4], [-1.11, 40.34], [-0.95, 40.05], [-0.85, 39.75], [-0.55, 39.55], [-0.33, 39.45]] },
  { id: 'segura', nombre: T('Segura', 'Segura', 'Segura'), vertiente: 'mediterranea', nivel: 'medio',
    nace: T('en Pontones (Jaén), en las Sierras de Segura', 'in Pontones (Jaén), in the Segura mountains', 'a Pontones (Jaén), a les serres de Segura'),
    desemboca: T('en el Mediterráneo, en Guardamar del Segura (Alicante)', 'into the Mediterranean, at Guardamar del Segura (Alicante)', 'a la Mediterrània, a Guardamar del Segura (Alacant)'),
    puntos: [[-2.64, 38.08], [-2.2, 38.17], [-1.7, 38.23], [-1.35, 38.15], [-1.13, 37.98], [-0.94, 38.08], [-0.65, 38.1]] },
  { id: 'nalon', nombre: T('Nalón', 'Nalón', 'Nalón'), vertiente: 'cantabrica', nivel: 'medio',
    nace: T('en Tarna (Asturias), en la Cordillera Cantábrica', 'in Tarna (Asturias), in the Cantabrian Mountains', 'a Tarna (Astúries), a la Serralada Cantàbrica'),
    desemboca: T('en el Cantábrico, en San Esteban de Pravia (Asturias)', 'into the Bay of Biscay, at San Esteban de Pravia (Asturias)', 'al Cantàbric, a San Esteban de Pravia (Astúries)'),
    puntos: [[-5.25, 43.1], [-5.6, 43.25], [-5.85, 43.3], [-6.0, 43.42], [-6.08, 43.56]] },
  { id: 'nervion', nombre: T('Nervión', 'Nervión', 'Nervión'), vertiente: 'cantabrica', nivel: 'medio',
    nace: T('cerca de Orduña (entre Álava y Burgos)', 'near Orduña (between Álava and Burgos)', 'a prop d’Orduña (entre Àlaba i Burgos)'),
    desemboca: T('en el Cantábrico, por la ría de Bilbao', 'into the Bay of Biscay, through the Bilbao estuary', 'al Cantàbric, per la ria de Bilbao'),
    puntos: [[-3.03, 42.94], [-2.98, 43.05], [-2.96, 43.14], [-2.93, 43.26], [-3.02, 43.33]] },
]

// Línea de cumbres de cada sistema
export const MONTES = [
  { id: 'pirineos', nombre: T('Pirineos', 'Pyrenees', 'Pirineus'), nivel: 'facil',
    puntos: [[-1.75, 43.15], [-1.0, 42.95], [0.0, 42.75], [1.0, 42.6], [2.0, 42.45], [3.0, 42.45]] },
  { id: 'cantabrica', nombre: T('Cordillera Cantábrica', 'Cantabrian Mountains', 'Serralada Cantàbrica'), nivel: 'facil',
    puntos: [[-7.0, 42.85], [-6.2, 43.0], [-5.3, 43.05], [-4.6, 43.08], [-3.8, 43.05], [-3.2, 43.05]] },
  { id: 'central', nombre: T('Sistema Central', 'Central System', 'Sistema Central'), nivel: 'facil',
    puntos: [[-7.0, 40.2], [-6.2, 40.25], [-5.3, 40.25], [-4.5, 40.55], [-3.9, 40.85], [-3.4, 41.15]] },
  { id: 'iberico', nombre: T('Sistema Ibérico', 'Iberian System', 'Sistema Ibèric'), nivel: 'facil',
    puntos: [[-3.3, 42.15], [-2.7, 41.95], [-1.9, 41.75], [-1.6, 41.2], [-1.6, 40.5], [-1.0, 40.15], [-0.5, 39.95]] },
  { id: 'morena', nombre: T('Sierra Morena', 'Sierra Morena', 'Serra Morena'), nivel: 'facil',
    puntos: [[-7.2, 38.0], [-6.2, 38.05], [-5.3, 38.15], [-4.3, 38.3], [-3.3, 38.45], [-2.6, 38.5]] },
  { id: 'beticos', nombre: T('Sistemas Béticos', 'Baetic System', 'Sistemes Bètics'), nivel: 'facil',
    puntos: [[-5.6, 36.6], [-4.6, 36.85], [-3.6, 37.0], [-3.0, 37.08], [-2.3, 37.4], [-1.5, 37.9], [-0.6, 38.5], [0.1, 38.75]] },
  { id: 'galaico', nombre: T('Macizo Galaico', 'Galician Massif', 'Massís Galaic'), nivel: 'medio',
    puntos: [[-8.3, 42.6], [-7.6, 42.3], [-7.1, 42.15]] },
  { id: 'toledo', nombre: T('Montes de Toledo', 'Toledo Mountains', 'Muntanyes de Toledo'), nivel: 'medio',
    puntos: [[-5.4, 39.45], [-4.8, 39.5], [-4.2, 39.55], [-3.8, 39.45]] },
  { id: 'catalana', nombre: T('Cordillera Costero-Catalana', 'Catalan Coastal Range', 'Serralada Litoral Catalana'), nivel: 'medio',
    puntos: [[0.6, 40.9], [1.3, 41.3], [2.1, 41.6], [2.8, 42.0]] },
]

// ── El mundo ──────────────────────────────────────────────────────────────
// «¿A qué océano va?»: Atlántico, Pacífico, Índico o Ártico. Los que acaban en
// un mar cerrado o casi (Nilo y Danubio al Mediterráneo y al Negro, el Volga al
// Caspio) llevan vertiente null: salen en el resto de preguntas, no en esa.
// El nacimiento del Nilo, el Amazonas y el Congo se discute: no se pregunta.
export const OCEANOS = {
  atlantico: T('Atlántico', 'Atlantic', 'Atlàntic'),
  pacifico: T('Pacífico', 'Pacific', 'Pacífic'),
  indico: T('Índico', 'Indian', 'Índic'),
  artico: T('Ártico', 'Arctic', 'Àrtic'),
}
const RIOS_MUNDO = [
  { id: 'nilo', nombre: T('Nilo', 'Nile', 'Nil'), vertiente: null, nivel: 'facil', naceDiscutido: true,
    nace: T('en la región de los Grandes Lagos de África (sale del lago Victoria)', 'in the African Great Lakes region (it flows out of Lake Victoria)', 'a la regió dels Grans Llacs d’Àfrica (surt del llac Victòria)'),
    desemboca: T('en el Mediterráneo, en un gran delta junto a El Cairo (Egipto)', 'into the Mediterranean, in a great delta near Cairo (Egypt)', 'a la Mediterrània, en un gran delta a prop del Caire (Egipte)'),
    puntos: [[33.2, 0.4], [32.5, 3.5], [31.6, 9.5], [32.5, 15.6], [33.0, 19.0], [31.0, 22.0], [32.9, 24.1], [31.2, 27.2], [31.2, 30.0], [31.0, 31.4]] },
  { id: 'amazonas', nombre: T('Amazonas', 'Amazon', 'Amazones'), vertiente: 'atlantico', nivel: 'facil', naceDiscutido: true,
    nace: T('en los Andes de Perú', 'in the Andes of Peru', 'als Andes del Perú'),
    desemboca: T('en el Atlántico, en Brasil: es el río más caudaloso del mundo', 'into the Atlantic, in Brazil: it carries more water than any other river', 'a l’Atlàntic, al Brasil: és el riu més cabalós del món'),
    puntos: [[-72.5, -15.5], [-73.0, -13.0], [-73.5, -9.0], [-73.25, -3.75], [-69.9, -4.2], [-65.0, -3.5], [-60.0, -3.1], [-54.7, -2.4], [-51.5, -1.0], [-50.0, 0.0]] },
  { id: 'misisipi', nombre: T('Misisipi', 'Mississippi', 'Mississipí'), vertiente: 'atlantico', nivel: 'facil',
    nace: T('en el lago Itasca (Minnesota, Estados Unidos)', 'at Lake Itasca (Minnesota, United States)', 'al llac Itasca (Minnesota, Estats Units)'),
    desemboca: T('en el golfo de México (océano Atlántico), cerca de Nueva Orleans', 'into the Gulf of Mexico (Atlantic Ocean), near New Orleans', 'al golf de Mèxic (oceà Atlàntic), a prop de Nova Orleans'),
    puntos: [[-95.2, 47.2], [-93.3, 45.0], [-91.2, 43.0], [-90.2, 38.6], [-90.05, 35.15], [-91.1, 32.3], [-91.2, 30.45], [-90.07, 29.95], [-89.3, 29.1]] },
  { id: 'yangtse', nombre: T('Yangtsé', 'Yangtze', 'Iang-Tsé'), vertiente: 'pacifico', nivel: 'facil',
    nace: T('en la meseta del Tíbet (China)', 'on the Tibetan Plateau (China)', 'a l’altiplà del Tibet (Xina)'),
    desemboca: T('en el mar de China Oriental (Pacífico), en Shanghái: es el río más largo de Asia', 'into the East China Sea (Pacific), at Shanghai: it is the longest river in Asia', 'al mar de la Xina Oriental (Pacífic), a Xangai: és el riu més llarg d’Àsia'),
    puntos: [[91.0, 33.4], [96.5, 32.5], [99.3, 28.0], [100.2, 26.9], [102.5, 26.5], [104.6, 28.8], [106.5, 29.6], [111.3, 30.7], [114.3, 30.6], [118.8, 32.1], [121.8, 31.4]] },
  { id: 'danubio', nombre: T('Danubio', 'Danube', 'Danubi'), vertiente: null, nivel: 'facil',
    nace: T('en la Selva Negra (Alemania)', 'in the Black Forest (Germany)', 'a la Selva Negra (Alemanya)'),
    desemboca: T('en el mar Negro, en un delta entre Rumanía y Ucrania; pasa por Viena, Budapest y Belgrado', 'into the Black Sea, in a delta between Romania and Ukraine; it flows through Vienna, Budapest and Belgrade', 'al mar Negre, en un delta entre Romania i Ucraïna; passa per Viena, Budapest i Belgrad'),
    puntos: [[8.5, 47.95], [10.0, 48.4], [12.1, 49.0], [16.4, 48.2], [19.05, 47.5], [18.9, 45.8], [20.5, 44.8], [22.6, 44.6], [25.0, 43.7], [27.9, 44.1], [29.6, 45.2]] },
  { id: 'ganges', nombre: T('Ganges', 'Ganges', 'Ganges'), vertiente: 'indico', nivel: 'facil',
    nace: T('en un glaciar del Himalaya (India)', 'in a Himalayan glacier (India)', 'en una glacera de l’Himàlaia (Índia)'),
    desemboca: T('en el golfo de Bengala (Índico), en un gran delta con el Brahmaputra', 'into the Bay of Bengal (Indian Ocean), in a great delta shared with the Brahmaputra', 'al golf de Bengala (Índic), en un gran delta amb el Brahmaputra'),
    puntos: [[79.0, 30.9], [78.2, 29.95], [80.35, 26.45], [83.0, 25.3], [85.1, 25.6], [88.0, 24.5], [89.0, 21.8]] },
  { id: 'congo', nombre: T('Congo', 'Congo', 'Congo'), vertiente: 'atlantico', nivel: 'medio', naceDiscutido: true,
    nace: T('en el sureste de la República Democrática del Congo', 'in the south-east of the Democratic Republic of the Congo', 'al sud-est de la República Democràtica del Congo'),
    desemboca: T('en el Atlántico: cruza dos veces el ecuador', 'into the Atlantic: it crosses the equator twice', 'a l’Atlàntic: travessa dues vegades l’equador'),
    puntos: [[26.5, -11.5], [25.7, -7.0], [25.2, 0.5], [22.0, 1.5], [18.3, 0.0], [16.3, -2.5], [15.3, -4.3], [12.3, -6.0]] },
  { id: 'niger', nombre: T('Níger', 'Niger', 'Níger'), vertiente: 'atlantico', nivel: 'medio',
    nace: T('en las montañas de Guinea, muy cerca del Atlántico', 'in the mountains of Guinea, very close to the Atlantic', 'a les muntanyes de Guinea, molt a prop de l’Atlàntic'),
    desemboca: T('en el golfo de Guinea (Atlántico), en Nigeria, tras dar una gran curva por el Sahel', 'into the Gulf of Guinea (Atlantic), in Nigeria, after a great bend through the Sahel', 'al golf de Guinea (Atlàntic), a Nigèria, després de fer una gran corba pel Sahel'),
    puntos: [[-10.5, 9.1], [-8.0, 12.65], [-3.0, 16.8], [2.1, 13.5], [5.5, 10.0], [6.7, 7.8], [6.0, 4.5]] },
  { id: 'volga', nombre: T('Volga', 'Volga', 'Volga'), vertiente: null, nivel: 'medio',
    nace: T('en las colinas de Valdái (Rusia)', 'in the Valdai Hills (Russia)', 'als turons de Valdai (Rússia)'),
    desemboca: T('en el mar Caspio, un mar cerrado: es el río más largo de Europa', 'into the Caspian Sea, an enclosed sea: it is the longest river in Europe', 'al mar Caspi, un mar tancat: és el riu més llarg d’Europa'),
    puntos: [[32.5, 57.2], [35.9, 56.85], [39.9, 57.6], [44.0, 56.3], [49.1, 55.8], [50.1, 53.2], [44.5, 48.7], [48.0, 46.35], [48.0, 45.9]] },
  { id: 'lena', nombre: T('Lena', 'Lena', 'Lena'), vertiente: 'artico', nivel: 'medio',
    nace: T('en los montes junto al lago Baikal (Siberia)', 'in the mountains by Lake Baikal (Siberia)', 'a les muntanyes al costat del llac Baikal (Sibèria)'),
    desemboca: T('en el océano Ártico, en un gran delta helado gran parte del año', 'into the Arctic Ocean, in a great delta that is frozen for much of the year', 'a l’oceà Àrtic, en un gran delta glaçat bona part de l’any'),
    puntos: [[106.5, 54.0], [110.0, 57.5], [118.0, 60.5], [129.7, 62.0], [127.0, 70.0], [126.5, 73.0]] },
  { id: 'mackenzie', nombre: T('Mackenzie', 'Mackenzie', 'Mackenzie'), vertiente: 'artico', nivel: 'medio',
    nace: T('en el Gran Lago del Esclavo (Canadá)', 'at Great Slave Lake (Canada)', 'al Gran Llac de l’Esclau (Canadà)'),
    desemboca: T('en el océano Ártico, en el mar de Beaufort', 'into the Arctic Ocean, in the Beaufort Sea', 'a l’oceà Àrtic, al mar de Beaufort'),
    puntos: [[-115.5, 61.5], [-120.0, 63.0], [-124.0, 65.0], [-128.5, 66.5], [-135.0, 68.8]] },
]
const MONTES_MUNDO = [
  { id: 'himalaya', nombre: T('Himalaya', 'Himalayas', 'Himàlaia'), nivel: 'facil',
    puntos: [[73.0, 35.0], [78.0, 32.0], [84.0, 28.5], [88.0, 27.8], [92.0, 27.8], [95.0, 29.0]] },
  { id: 'andes', nombre: T('Andes', 'Andes', 'Andes'), nivel: 'facil',
    puntos: [[-73.0, 10.0], [-76.0, 4.0], [-78.0, -1.0], [-77.0, -8.0], [-72.0, -15.0], [-68.0, -20.0], [-69.0, -28.0], [-70.0, -35.0], [-72.0, -42.0], [-73.0, -50.0]] },
  { id: 'rocosas', nombre: T('Montañas Rocosas', 'Rocky Mountains', 'Muntanyes Rocoses'), nivel: 'facil',
    puntos: [[-128.0, 60.0], [-122.0, 54.0], [-117.0, 50.0], [-112.0, 46.0], [-109.0, 42.0], [-106.0, 38.0], [-106.0, 34.0]] },
  { id: 'alpes', nombre: T('Alpes', 'Alps', 'Alps'), nivel: 'facil',
    puntos: [[6.0, 44.0], [7.0, 45.9], [9.5, 46.5], [12.0, 47.0], [15.0, 47.3]] },
  { id: 'atlas', nombre: T('Atlas', 'Atlas Mountains', 'Atles'), nivel: 'facil',
    puntos: [[-9.5, 30.5], [-6.0, 31.5], [-3.0, 33.0], [1.0, 34.3], [6.0, 35.2], [9.5, 36.0]] },
  { id: 'urales', nombre: T('Urales', 'Urals', 'Urals'), nivel: 'facil',
    puntos: [[59.0, 51.0], [59.5, 55.0], [59.0, 60.0], [60.0, 64.0], [65.0, 68.0]] },
  { id: 'apalaches', nombre: T('Apalaches', 'Appalachians', 'Apalatxes'), nivel: 'medio',
    puntos: [[-84.5, 34.0], [-81.0, 37.0], [-78.0, 39.5], [-75.0, 41.5], [-72.0, 43.5], [-69.0, 46.0]] },
  { id: 'gran-divisoria', nombre: T('Gran Cordillera Divisoria', 'Great Dividing Range', 'Gran Serralada Divisòria'), nivel: 'medio',
    puntos: [[145.0, -15.0], [147.0, -22.0], [150.0, -29.0], [148.0, -36.0]] },
  { id: 'caucaso', nombre: T('Cáucaso', 'Caucasus', 'Caucas'), nivel: 'medio',
    puntos: [[40.0, 43.3], [44.0, 42.7], [48.0, 41.2]] },
  { id: 'escandinavos', nombre: T('Montes Escandinavos', 'Scandinavian Mountains', 'Muntanyes Escandinaves'), nivel: 'medio',
    puntos: [[6.0, 59.0], [9.0, 62.0], [14.0, 65.0], [18.0, 68.5], [21.0, 69.5]] },
]

// ── Estados Unidos ────────────────────────────────────────────────────────
// «¿A qué mar va?»: Pacífico, golfo de México o Atlántico. Las Rocosas reparten
// las aguas. El Misuri y el Ohio son afluentes del Misisipi (`afluenteDe`): su
// «desembocadura» es la confluencia y su mar, el golfo de México.
export const MARES_EEUU = {
  pacifico: T('Pacífico', 'Pacific', 'Pacífic'),
  golfo: T('Golfo de México', 'Gulf of Mexico', 'Golf de Mèxic'),
  atlantico: T('Atlántico', 'Atlantic', 'Atlàntic'),
}
const RIOS_EEUU = [
  { id: 'misisipi-eeuu', nombre: T('Misisipi', 'Mississippi', 'Mississipí'), vertiente: 'golfo', nivel: 'facil',
    nace: T('en el lago Itasca (Minnesota)', 'at Lake Itasca (Minnesota)', 'al llac Itasca (Minnesota)'),
    desemboca: T('en el golfo de México, en un gran delta junto a Nueva Orleans', 'into the Gulf of Mexico, in a great delta near New Orleans', 'al golf de Mèxic, en un gran delta al costat de Nova Orleans'),
    puntos: [[-95.2, 47.24], [-94.2, 46.4], [-93.27, 44.98], [-91.6, 44.0], [-90.7, 42.5], [-91.1, 40.8], [-90.2, 38.63], [-89.2, 37.0], [-89.6, 36.0], [-90.05, 35.15], [-91.0, 33.4], [-90.9, 32.3], [-91.4, 31.0], [-91.19, 30.45], [-90.07, 29.95], [-89.25, 29.15]] },
  { id: 'misuri', nombre: T('Misuri', 'Missouri', 'Missouri'), vertiente: 'golfo', nivel: 'facil', afluenteDe: 'misisipi-eeuu',
    nace: T('en las Montañas Rocosas de Montana', 'in the Rocky Mountains of Montana', 'a les Muntanyes Rocoses de Montana'),
    desemboca: T('en el Misisipi, junto a San Luis (Misuri): es el río más largo de Estados Unidos', 'into the Mississippi, near St Louis (Missouri): it is the longest river in the United States', 'al Mississipí, al costat de Saint Louis (Missouri): és el riu més llarg dels Estats Units'),
    puntos: [[-111.5, 45.9], [-111.3, 47.5], [-108.9, 47.6], [-104.0, 48.0], [-101.3, 47.5], [-100.8, 46.8], [-100.35, 44.37], [-97.4, 42.9], [-96.0, 41.25], [-94.6, 39.1], [-92.3, 38.6], [-90.2, 38.8]] },
  { id: 'colorado', nombre: T('Colorado', 'Colorado', 'Colorado'), vertiente: 'pacifico', nivel: 'facil',
    nace: T('en las Montañas Rocosas de Colorado', 'in the Rocky Mountains of Colorado', 'a les Muntanyes Rocoses de Colorado'),
    desemboca: T('en el golfo de California (Pacífico), en México, tras excavar el Gran Cañón; hoy le llega muy poca agua', 'into the Gulf of California (Pacific), in Mexico, after carving the Grand Canyon; very little water reaches it today', 'al golf de Califòrnia (Pacífic), a Mèxic, després d’excavar el Gran Canyó; avui hi arriba molt poca aigua'),
    puntos: [[-105.85, 40.47], [-106.3, 39.6], [-108.5, 39.1], [-109.5, 38.6], [-110.6, 37.5], [-111.5, 36.9], [-112.1, 36.1], [-114.0, 36.0], [-114.6, 35.0], [-114.6, 33.6], [-114.7, 32.7], [-114.9, 31.8]] },
  { id: 'bravo', nombre: T('Río Bravo', 'Rio Grande', 'Riu Bravo'), vertiente: 'golfo', nivel: 'facil',
    nace: T('en las Montañas Rocosas de Colorado', 'in the Rocky Mountains of Colorado', 'a les Muntanyes Rocoses de Colorado'),
    desemboca: T('en el golfo de México; desde El Paso hace de frontera con México', 'into the Gulf of Mexico; from El Paso onwards it forms the border with Mexico', 'al golf de Mèxic; des d’El Paso fa de frontera amb Mèxic'),
    puntos: [[-107.4, 37.8], [-106.6, 37.3], [-106.05, 35.7], [-106.65, 35.08], [-106.9, 33.3], [-106.48, 31.76], [-104.5, 30.0], [-103.0, 29.0], [-101.0, 29.8], [-100.5, 28.7], [-99.5, 27.5], [-98.0, 26.1], [-97.15, 25.95]] },
  { id: 'columbia', nombre: T('Columbia', 'Columbia', 'Columbia'), vertiente: 'pacifico', nivel: 'facil',
    nace: T('en las Montañas Rocosas de Canadá', 'in the Canadian Rocky Mountains', 'a les Muntanyes Rocoses del Canadà'),
    desemboca: T('en el Pacífico, entre Oregón y Washington', 'into the Pacific, between Oregon and Washington', 'al Pacífic, entre Oregon i Washington'),
    puntos: [[-115.85, 50.2], [-117.0, 49.0], [-118.2, 48.0], [-119.5, 47.0], [-119.3, 46.2], [-120.5, 45.7], [-121.5, 45.65], [-122.7, 45.6], [-123.9, 46.25]] },
  { id: 'ohio', nombre: T('Ohio', 'Ohio', 'Ohio'), vertiente: 'golfo', nivel: 'medio', afluenteDe: 'misisipi-eeuu',
    nace: T('en Pittsburgh (Pensilvania), al juntarse dos ríos de los Apalaches', 'in Pittsburgh (Pennsylvania), where two Appalachian rivers meet', 'a Pittsburgh (Pennsilvània), on s’ajunten dos rius dels Apalatxes'),
    desemboca: T('en el Misisipi, en Cairo (Illinois)', 'into the Mississippi, at Cairo (Illinois)', 'al Mississipí, a Cairo (Illinois)'),
    puntos: [[-80.0, 40.44], [-80.7, 40.0], [-81.6, 38.9], [-82.6, 38.4], [-84.5, 39.1], [-85.76, 38.25], [-87.6, 37.95], [-88.6, 37.1], [-89.18, 37.0]] },
  { id: 'hudson', nombre: T('Hudson', 'Hudson', 'Hudson'), vertiente: 'atlantico', nivel: 'medio',
    nace: T('en los montes Adirondack (Nueva York)', 'in the Adirondack Mountains (New York)', 'a les muntanyes Adirondack (Nova York)'),
    desemboca: T('en el Atlántico, en la ciudad de Nueva York', 'into the Atlantic, in New York City', 'a l’Atlàntic, a la ciutat de Nova York'),
    puntos: [[-74.06, 44.1], [-73.7, 43.3], [-73.75, 42.65], [-73.95, 41.7], [-74.02, 40.7]] },
  { id: 'potomac', nombre: T('Potomac', 'Potomac', 'Potomac'), vertiente: 'atlantico', nivel: 'medio',
    nace: T('en los Apalaches (Virginia Occidental)', 'in the Appalachians (West Virginia)', 'als Apalatxes (Virgínia de l’Oest)'),
    desemboca: T('en la bahía de Chesapeake (Atlántico), tras pasar por Washington', 'into Chesapeake Bay (Atlantic), after flowing through Washington', 'a la badia de Chesapeake (Atlàntic), després de passar per Washington'),
    puntos: [[-79.49, 39.19], [-78.3, 39.6], [-77.5, 39.3], [-77.05, 38.9], [-76.3, 38.0]] },
]
const MONTES_EEUU = [
  { id: 'rocosas-eeuu', nombre: T('Montañas Rocosas', 'Rocky Mountains', 'Muntanyes Rocoses'), nivel: 'facil',
    puntos: [[-117.0, 49.0], [-114.0, 47.5], [-111.0, 45.5], [-109.0, 43.0], [-107.0, 40.5], [-105.7, 39.0], [-106.0, 37.0], [-105.6, 35.6]] },
  { id: 'apalaches-eeuu', nombre: T('Apalaches', 'Appalachian Mountains', 'Apalatxes'), nivel: 'facil',
    puntos: [[-85.0, 34.3], [-83.5, 35.6], [-81.5, 37.0], [-79.5, 38.5], [-77.5, 40.5], [-75.5, 41.5], [-73.8, 42.5], [-71.5, 44.3], [-69.0, 45.5]] },
  { id: 'sierra-nevada-eeuu', nombre: T('Sierra Nevada', 'Sierra Nevada', 'Sierra Nevada'), nivel: 'facil',
    puntos: [[-121.5, 40.2], [-120.3, 39.0], [-119.5, 38.0], [-118.5, 36.6], [-118.2, 35.6]] },
  { id: 'cascadas', nombre: T('Cordillera de las Cascadas', 'Cascade Range', 'Serralada de les Cascades'), nivel: 'medio',
    puntos: [[-121.0, 49.0], [-121.7, 47.0], [-121.7, 45.4], [-122.0, 43.5], [-122.2, 41.5]] },
  { id: 'costera-eeuu', nombre: T('Cordillera Costera', 'Pacific Coast Ranges', 'Serralada Costanera'), nivel: 'medio',
    puntos: [[-123.9, 46.0], [-123.8, 43.0], [-123.6, 40.5], [-122.5, 38.0], [-121.0, 35.5], [-119.5, 34.4]] },
]

// ── Regiones ──────────────────────────────────────────────────────────────
// Cada mapa con sus ríos, sus sistemas y sus «vertientes» (a qué mar o
// océano va cada río). El juego las mezcla; cada examen es de una sola.
//   mapa        encuadre (Mercator), atlas y color de la tierra que se estudia
//   sepNumeros  separación mínima (en grados) entre los números de «etiqueta»
//   sepPuntos   ídem entre los cuatro puntos de «extremos»
export const REGIONES = {
  espana: {
    id: 'espana',
    nombre: T('España', 'Spain', 'Espanya'),
    mapa: { center: [-3.3, 40.0], scale: 3000, atlas: 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json', tierras: { 724: '#334155', 620: '#2B3648' } },
    sepNumeros: 1.8, sepPuntos: 0.9,
    vertientes: VERTIENTES,
    pregunta: T('¿A qué mar va cada río? Toca un río y luego su vertiente', 'Which sea does each river flow into? Tap a river, then its drainage basin', 'A quin mar va cada riu? Toca un riu i després el seu vessant'),
    // la cantábrica no sale en fácil: sus ríos son del nivel medio
    vertientesFacil: ['atlantica', 'mediterranea'],
    expVertiente: T(
      'Vertiente cantábrica: ríos cortos y caudalosos que bajan de la Cordillera Cantábrica. Atlántica: los grandes ríos de la Meseta (Miño, Duero, Tajo, Guadiana) y el Guadalquivir. Mediterránea: el Ebro y los ríos levantinos (Júcar, Turia, Segura).',
      'Cantabrian basin: short rivers with plenty of water coming down from the Cantabrian Mountains. Atlantic: the big rivers of the Meseta (Miño, Douro, Tagus, Guadiana) and the Guadalquivir. Mediterranean: the Ebro and the eastern rivers (Júcar, Turia, Segura).',
      'Vessant cantàbric: rius curts i cabalosos que baixen de la Serralada Cantàbrica. Atlàntic: els grans rius de la Meseta (Minho, Duero, Tajo, Guadiana) i el Guadalquivir. Mediterrani: l’Ebre i els rius de llevant (Xúquer, Túria, Segura).'),
    rios: RIOS, montes: MONTES,
  },
  mundo: {
    id: 'mundo',
    nombre: T('el mundo', 'the world', 'el món'),
    mapa: { center: [15, 18], scale: 125, atlas: 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', tierras: null },
    sepNumeros: 28, sepPuntos: 14,
    vertientes: OCEANOS,
    pregunta: T('¿A qué océano va cada río? Toca un río y luego su océano', 'Which ocean does each river flow into? Tap a river, then its ocean', 'A quin oceà va cada riu? Toca un riu i després el seu oceà'),
    // el Ártico no sale en fácil: sus ríos (Lena, Mackenzie) son del nivel medio
    vertientesFacil: ['atlantico', 'pacifico', 'indico'],
    expVertiente: T(
      'Los ríos de América del Sur y de África occidental (Amazonas, Congo, Níger) van al Atlántico, como el Misisipi por el golfo de México. Los grandes ríos de China, como el Yangtsé, van al Pacífico; el Ganges, al Índico. Los de Siberia y el norte de Canadá (Lena, Mackenzie), al Ártico.',
      'The rivers of South America and West Africa (Amazon, Congo, Niger) flow into the Atlantic, as does the Mississippi through the Gulf of Mexico. The great rivers of China, like the Yangtze, flow into the Pacific; the Ganges into the Indian Ocean. Those of Siberia and northern Canada (Lena, Mackenzie) flow into the Arctic.',
      'Els rius d’Amèrica del Sud i de l’Àfrica occidental (Amazones, Congo, Níger) van a l’Atlàntic, com el Mississipí pel golf de Mèxic. Els grans rius de la Xina, com l’Iang-Tsé, van al Pacífic; el Ganges, a l’Índic. Els de Sibèria i el nord del Canadà (Lena, Mackenzie), a l’Àrtic.'),
    rios: RIOS_MUNDO, montes: MONTES_MUNDO,
  },
  eeuu: {
    id: 'eeuu',
    nombre: T('Estados Unidos', 'the United States', 'els Estats Units'),
    mapa: { center: [-96.5, 38.5], scale: 760, atlas: 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json', tierras: { 840: '#334155' } },
    sepNumeros: 5, sepPuntos: 2.5,
    vertientes: MARES_EEUU,
    pregunta: T('¿A qué mar va cada río? Toca un río y luego su mar', 'Which sea does each river flow into? Tap a river, then its sea', 'A quin mar va cada riu? Toca un riu i després el seu mar'),
    // el Atlántico no sale en fácil: sus ríos (Hudson, Potomac) son del nivel medio
    vertientesFacil: ['pacifico', 'golfo'],
    expVertiente: T(
      'Las Montañas Rocosas reparten las aguas: al oeste, los ríos van al Pacífico (el Columbia, y el Colorado por el golfo de California). Al este, casi todo acaba en el Misisipi y con él en el golfo de México (el Misuri y el Ohio son sus afluentes), igual que el Río Bravo. Al otro lado de los Apalaches, el Hudson y el Potomac van al Atlántico.',
      'The Rocky Mountains divide the waters: to the west, rivers flow into the Pacific (the Columbia, and the Colorado through the Gulf of California). To the east, almost everything ends up in the Mississippi and with it in the Gulf of Mexico (the Missouri and the Ohio are its tributaries), as does the Rio Grande. Beyond the Appalachians, the Hudson and the Potomac flow into the Atlantic.',
      'Les Muntanyes Rocoses reparteixen les aigües: a l’oest, els rius van al Pacífic (el Columbia, i el Colorado pel golf de Califòrnia). A l’est, gairebé tot acaba al Mississipí i amb ell al golf de Mèxic (el Missouri i l’Ohio en són afluents), igual que el Riu Bravo. A l’altra banda dels Apalatxes, el Hudson i el Potomac van a l’Atlàntic.'),
    rios: RIOS_EEUU, montes: MONTES_EEUU,
  },
}
export const regionDe = r => REGIONES[r?.region ?? 'espana']

export const ELEMENTOS = Object.values(REGIONES).flatMap(g => [
  ...g.rios.map(r => ({ ...r, clase: 'rio', region: g.id })),
  ...g.montes.map(m => ({ ...m, clase: 'monte', region: g.id })),
])
export const elemento = id => ELEMENTOS.find(e => e.id === id)
export const nombre = (id, l) => tx(elemento(id).nombre, l)
const ORDEN = { facil: 0, medio: 1, dificil: 2 }
// Lo que se ve en el mapa en cada nivel
export const delNivel = (nivel, region = 'espana') => ELEMENTOS.filter(e => e.region === region && ORDEN[e.nivel] <= ORDEN[nivel])

export const NIVELES = {
  facil:   { tipos: ['busca', 'busca', 'busca', 'etiqueta', 'etiqueta'] },
  medio:   { tipos: ['busca', 'busca', 'etiqueta', 'vertiente', 'vertiente'] },
  dificil: { tipos: ['busca', 'etiqueta', 'vertiente', 'extremos', 'extremos'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const dist = ([a, b], [c, d]) => Math.hypot(a - c, b - d)
// Una clave de `pesos` al azar, según su peso
const eligePeso = (rand, pesos) => {
  const ks = Object.keys(pesos).filter(k => REGIONES[k] && pesos[k] > 0)
  let x = rand() * ks.reduce((t, k) => t + pesos[k], 0)
  for (const k of ks) { x -= pesos[k]; if (x < 0) return k }
  return ks[ks.length - 1]
}
// El punto donde va el número o el nombre de cada elemento
export const medio = e => e.puntos[Math.floor(e.puntos.length / 2)]

let seq = 0
const recientes = []
// `region`: la de un examen. Sin ella (el juego) se elige una en cada ronda;
// `pesos` dice cuánto sale cada una (p. ej. más España en castellano).
// `prefiere`: ids que aún no han salido (el juego recorre una región entera
// antes de pasar a la siguiente): si hay, la ronda incluye alguno.
export function genRonda(nivel = 'facil', { rand = Math.random, region = null, pesos = null, prefiere = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (let intento = 0; ; intento++) {
    const reg = REGIONES[region ?? eligePeso(rand, pesos ?? Object.fromEntries(Object.keys(REGIONES).map(k => [k, 1])))]
    const visibles = delNivel(nivel, reg.id)
    const rios = visibles.filter(e => e.clase === 'rio')
    const tipo = elige(rand, cfg.tipos)
    const pendiente = prefiere?.length && intento < 30 ? (e => prefiere.includes(e.id)) : null
    const deLosPendientes = xs => (pendiente && xs.some(pendiente) ? xs.filter(pendiente) : xs)
    const base = { id: ++seq, nivel, tipo, region: reg.id }
    let r
    if (tipo === 'busca') {
      r = { ...base, objetivo: elige(rand, deLosPendientes(visibles)).id }
    } else if (tipo === 'etiqueta') {
      // tres elementos (al menos un río y un sistema) y un nombre de más
      const tres = baraja(rand, visibles).slice(0, 3)
      if (pendiente && visibles.some(pendiente) && !tres.some(pendiente)) continue
      if (!tres.some(e => e.clase === 'rio') || !tres.some(e => e.clase === 'monte')) continue
      // los tres números, bien separados en el mapa (no se pueden pisar)
      if (tres.some((a, i) => tres.some((b, j) => i < j && dist(medio(a), medio(b)) < reg.sepNumeros))) continue
      const sobra = elige(rand, visibles.filter(e => !tres.includes(e)))
      r = { ...base, marcados: tres.map(e => e.id), fichas: baraja(rand, [...tres.map(e => e.id), sobra.id]) }
    } else if (tipo === 'vertiente') {
      // solo los que van a un océano (o vertiente) sin discusión
      const conVertiente = rios.filter(e => e.vertiente)
      if (conVertiente.length < 4) continue
      const cuatro = baraja(rand, conVertiente).slice(0, 4)
      // a este tipo no le queda nada pendiente (solo faltan montañas): otro tipo
      if (pendiente && !cuatro.some(pendiente)) continue
      // al menos dos vertientes distintas
      if (new Set(cuatro.map(e => e.vertiente)).size < 2) continue
      r = { ...base, rios: cuatro.map(e => e.id), vertientes: nivel === 'facil' && reg.vertientesFacil ? reg.vertientesFacil : Object.keys(reg.vertientes) }
    } else {
      const que = elige(rand, ['nace', 'desemboca'])
      const pool = rios.filter(e => que === 'desemboca' || !e.naceDiscutido)
      if (pendiente && !pool.some(pendiente)) continue
      const obj = elige(rand, deLosPendientes(pool))
      const punto = e => (que === 'nace' ? e.puntos[0] : e.puntos[e.puntos.length - 1])
      // tres puntos más, de otros ríos y separados (nada de tres nacimientos juntos)
      const otros = []
      for (const e of baraja(rand, pool.filter(x => x !== obj))) {
        if ([obj, ...otros].every(x => dist(punto(x), punto(e)) > reg.sepPuntos)) otros.push(e)
        if (otros.length === 3) break
      }
      if (otros.length < 3) continue
      r = { ...base, que, objetivo: obj.id, puntos: baraja(rand, [obj, ...otros].map(e => e.id)) }
    }
    const tema = `${tipo}${r.objetivo ?? r.marcados?.join() ?? r.rios?.join()}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Los ríos y montañas que «salen» en una ronda (para saber cuándo se ha
// recorrido una región entera)
export function elementosDe(r) {
  if (r.tipo === 'etiqueta') return r.marcados
  if (r.tipo === 'vertiente') return r.rios
  return [r.objetivo]
}

// Respuestas: busca → id tocado; etiqueta → [id del 1, id del 2, id del 3];
// vertiente → { rioId: vertiente }; extremos → id del río cuyo punto se toca.
export function esCorrecta(r, o) {
  if (o == null) return false
  switch (r.tipo) {
    case 'busca': return o === r.objetivo
    case 'etiqueta': return Array.isArray(o) && r.marcados.every((id, i) => o[i] === id)
    case 'vertiente': return typeof o === 'object' && r.rios.every(id => o[id] === elemento(id).vertiente)
    default: return o === r.objetivo
  }
}

// ── Textos ────────────────────────────────────────────────────────────────
export function enunciado(r, l) {
  switch (r.tipo) {
    case 'busca': {
      const e = elemento(r.objetivo)
      return e.clase === 'rio'
        ? s(l, `Toca el río ${tx(e.nombre, l)}`, `Tap the river ${tx(e.nombre, l)}`, `Toca el riu ${tx(e.nombre, l)}`)
        : s(l, `Toca: ${tx(e.nombre, l)}`, `Tap: ${tx(e.nombre, l)}`, `Toca: ${tx(e.nombre, l)}`)
    }
    case 'etiqueta': return s(l, 'Pon cada nombre en su número: toca un nombre y luego el número del mapa (sobra uno)', 'Put each name on its number: tap a name, then the number on the map (one is left over)', 'Posa cada nom al seu número: toca un nom i després el número del mapa (en sobra un)')
    case 'vertiente': return tx(regionDe(r).pregunta, l)
    default: {
      const n = nombre(r.objetivo, l)
      return r.que === 'nace'
        ? s(l, `¿Dónde nace el ${n}? Toca el punto`, `Where does the ${n} rise? Tap the point`, `On neix el ${n}? Toca el punt`)
        : s(l, `¿Dónde desemboca el ${n}? Toca el punto`, `Where does the ${n} flow into the sea? Tap the point`, `On desemboca el ${n}? Toca el punt`)
    }
  }
}

function frase(e, l) {
  if (e.clase === 'monte') return tx(e.nombre, l)
  return s(l, `${tx(e.nombre, l)}: nace ${tx(e.nace, l)} y desemboca ${tx(e.desemboca, l)}.`, `${tx(e.nombre, l)}: it rises ${tx(e.nace, l)} and flows ${tx(e.desemboca, l)}.`, `${tx(e.nombre, l)}: neix ${tx(e.nace, l)} i desemboca ${tx(e.desemboca, l)}.`)
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'busca': {
      const e = elemento(r.objetivo)
      if (e.clase === 'rio') return frase(e, l)
      return s(l, `${tx(e.nombre, l)}: la línea marrón del mapa. ${PISTA_MONTE[e.id]?.es ?? ''}`, `${tx(e.nombre, l)}: the brown line on the map. ${PISTA_MONTE[e.id]?.en ?? ''}`, `${tx(e.nombre, l)}: la línia marró del mapa. ${PISTA_MONTE[e.id]?.ca ?? ''}`)
    }
    case 'etiqueta': return r.marcados.map((id, i) => `${i + 1} = ${nombre(id, l)}`).join(' · ')
    case 'vertiente': return tx(regionDe(r).expVertiente, l)
    default: return frase(elemento(r.objetivo), l)
  }
}

// Una frase para situar cada sistema (de libro, sin datos discutibles)
const PISTA_MONTE = {
  pirineos: T('Hace de frontera con Francia, de Navarra a Girona.', 'It forms the border with France, from Navarre to Girona.', 'Fa de frontera amb França, de Navarra a Girona.'),
  cantabrica: T('Recorre el norte, paralela a la costa cantábrica.', 'It runs across the north, parallel to the Bay of Biscay coast.', 'Recorre el nord, paral·lela a la costa cantàbrica.'),
  central: T('Divide la Meseta en dos: la norte (Duero) y la sur (Tajo y Guadiana). Incluye Gredos y Guadarrama.', 'It splits the Meseta in two: the north (Douro) and the south (Tagus and Guadiana). It includes Gredos and Guadarrama.', 'Divideix la Meseta en dues: la nord (Duero) i la sud (Tajo i Guadiana). Inclou Gredos i Guadarrama.'),
  iberico: T('Cierra la Meseta por el este, de La Rioja a Valencia. Allí nacen el Duero, el Tajo, el Júcar y el Turia.', 'It closes off the Meseta to the east, from La Rioja to Valencia. The Douro, Tagus, Júcar and Turia rise there.', 'Tanca la Meseta per l’est, de La Rioja a València. Hi neixen el Duero, el Tajo, el Xúquer i el Túria.'),
  morena: T('Cierra la Meseta por el sur y la separa del valle del Guadalquivir.', 'It closes off the Meseta to the south and separates it from the Guadalquivir valley.', 'Tanca la Meseta pel sud i la separa de la vall del Guadalquivir.'),
  beticos: T('Al sur del Guadalquivir; aquí está Sierra Nevada, con el Mulhacén, la cumbre más alta de la península.', 'South of the Guadalquivir; Sierra Nevada is here, with Mulhacén, the highest peak in the peninsula.', 'Al sud del Guadalquivir; aquí hi ha Sierra Nevada, amb el Mulhacén, el cim més alt de la península.'),
  galaico: T('Un macizo antiguo y desgastado en el sureste de Galicia.', 'An old, worn-down massif in south-east Galicia.', 'Un massís antic i desgastat al sud-est de Galícia.'),
  toledo: T('Montes bajos en la Meseta sur, entre el Tajo y el Guadiana.', 'Low mountains on the southern Meseta, between the Tagus and the Guadiana.', 'Muntanyes baixes a la Meseta sud, entre el Tajo i el Guadiana.'),
  catalana: T('Paralela a la costa de Cataluña.', 'It runs parallel to the coast of Catalonia.', 'Paral·lela a la costa de Catalunya.'),
  himalaya: T('Entre la India y el Tíbet; aquí está el Everest, la montaña más alta del mundo.', 'Between India and Tibet; Everest, the highest mountain in the world, is here.', 'Entre l’Índia i el Tibet; aquí hi ha l’Everest, la muntanya més alta del món.'),
  andes: T('Recorren toda la costa del Pacífico de América del Sur: es la cordillera más larga del mundo.', 'They run along the whole Pacific coast of South America: the longest mountain range in the world.', 'Recorren tota la costa del Pacífic d’Amèrica del Sud: és la serralada més llarga del món.'),
  rocosas: T('Al oeste de América del Norte, de Canadá a Nuevo México.', 'In western North America, from Canada to New Mexico.', 'A l’oest d’Amèrica del Nord, del Canadà a Nou Mèxic.'),
  alpes: T('En el centro de Europa: Francia, Suiza, Italia y Austria.', 'In central Europe: France, Switzerland, Italy and Austria.', 'Al centre d’Europa: França, Suïssa, Itàlia i Àustria.'),
  atlas: T('En el norte de África: Marruecos, Argelia y Túnez.', 'In North Africa: Morocco, Algeria and Tunisia.', 'Al nord d’Àfrica: el Marroc, Algèria i Tunísia.'),
  urales: T('En Rusia, de norte a sur: marcan la frontera entre Europa y Asia.', 'In Russia, running north to south: they mark the border between Europe and Asia.', 'A Rússia, de nord a sud: marquen la frontera entre Europa i Àsia.'),
  apalaches: T('En el este de Estados Unidos: unas montañas muy antiguas y desgastadas.', 'In the eastern United States: very old, worn-down mountains.', 'A l’est dels Estats Units: unes muntanyes molt antigues i desgastades.'),
  'gran-divisoria': T('A lo largo de la costa este de Australia.', 'Along the east coast of Australia.', 'Al llarg de la costa est d’Austràlia.'),
  caucaso: T('Entre el mar Negro y el mar Caspio.', 'Between the Black Sea and the Caspian Sea.', 'Entre el mar Negre i el mar Caspi.'),
  escandinavos: T('Recorren Noruega y Suecia, de sur a norte.', 'They run through Norway and Sweden, from south to north.', 'Recorren Noruega i Suècia, de sud a nord.'),
  'rocosas-eeuu': T('Recorren el oeste de norte a sur y reparten las aguas entre el Pacífico y el golfo de México.', 'They run through the west from north to south and divide the waters between the Pacific and the Gulf of Mexico.', 'Recorren l’oest de nord a sud i reparteixen les aigües entre el Pacífic i el golf de Mèxic.'),
  'apalaches-eeuu': T('En el este, de Alabama a Maine: unas montañas muy antiguas y desgastadas.', 'In the east, from Alabama to Maine: very old, worn-down mountains.', 'A l’est, d’Alabama a Maine: unes muntanyes molt antigues i desgastades.'),
  'sierra-nevada-eeuu': T('En California; aquí está el monte Whitney, el más alto de los 48 estados contiguos.', 'In California; Mount Whitney, the highest peak in the contiguous 48 states, is here.', 'A Califòrnia; aquí hi ha el mont Whitney, el més alt dels 48 estats contigus.'),
  cascadas: T('En el noroeste, de Washington al norte de California: está llena de volcanes, como el Santa Helena.', 'In the north-west, from Washington to northern California: it is full of volcanoes, such as Mount St Helens.', 'Al nord-oest, de Washington al nord de Califòrnia: és plena de volcans, com el Saint Helens.'),
  'costera-eeuu': T('Pegada a la costa del Pacífico, de Washington al sur de California.', 'Along the Pacific coast, from Washington to southern California.', 'Arran de la costa del Pacífic, de Washington al sud de Califòrnia.'),
}

export function textoRespuesta(r, l) {
  switch (r.tipo) {
    case 'busca': return nombre(r.objetivo, l)
    case 'etiqueta': return r.marcados.map((id, i) => `${i + 1}: ${nombre(id, l)}`).join(', ')
    case 'vertiente': return r.rios.map(id => `${nombre(id, l)} → ${tx(regionDe(r).vertientes[elemento(id).vertiente], l)}`).join(', ')
    default: {
      const e = elemento(r.objetivo)
      return r.que === 'nace' ? tx(e.nace, l) : tx(e.desemboca, l)
    }
  }
}

// Las preguntas de ejemplo del schema (sin opciones: en el juego no las hay)
export function schemaQuestion(r, l) {
  const pregunta = r.tipo === 'vertiente'
    ? s(l, `¿A qué vertiente pertenecen ${r.rios.map(id => nombre(id, l)).join(', ')}?`, `Which drainage basin do ${r.rios.map(id => nombre(id, l)).join(', ')} belong to?`, `A quin vessant pertanyen ${r.rios.map(id => nombre(id, l)).join(', ')}?`)
    : r.tipo === 'etiqueta' ? s(l, `Sitúa en el mapa (${tx(regionDe(r).nombre, l)}) estos ríos y sistemas montañosos`, `Place these rivers and mountain ranges on the map (${tx(regionDe(r).nombre, l)})`, `Situa al mapa (${tx(regionDe(r).nombre, l)}) aquests rius i sistemes muntanyosos`)
    : r.tipo === 'busca' ? s(l, `¿Dónde está ${nombre(r.objetivo, l)} en el mapa (${tx(regionDe(r).nombre, l)})?`, `Where is ${nombre(r.objetivo, l)} on the map (${tx(regionDe(r).nombre, l)})?`, `On és ${nombre(r.objetivo, l)} al mapa (${tx(regionDe(r).nombre, l)})?`)
    : enunciado(r, l).replace(/ Toca el punto| Tap the point| Toca el punt/, '')
  const respuesta = r.tipo === 'busca' ? explicacion(r, l) : textoRespuesta(r, l)
  return { question: pregunta, correctAnswer: respuesta, wrongAnswers: [] }
}
