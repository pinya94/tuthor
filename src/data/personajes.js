// ── PERSONAJES HISTÓRICOS ─────────────────────────────────────────────────────
// Atributos universales que funcionan en todas las épocas:
//   epoca    → periodo histórico
//   rol      → función del personaje
//   genero   → hombre | mujer
//   destino  → cómo terminó
//   pais     → país o civilización de origen

// ── GUERRA CIVIL ESPAÑOLA ─────────────────────────────────────────────────────
export const PERSONAJES_GCE = [
  { id: 'franco',          nombre: 'Francisco Franco',              iniciales: 'FF', color: '#7f1d1d', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'militar',        genero: 'hombre', destino: 'sobrevivió',    pais: 'españa' },
    pistaUnica: 'Gobernó España como dictador desde el final de la guerra hasta su muerte en 1975.',
    pistaUnicaEn: 'Ruled Spain as dictator from the end of the war until his death in 1975.' },
  { id: 'ibárruri',        nombre: 'Dolores Ibárruri',              iniciales: 'DI', color: '#7c3aed', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Comunista vasca conocida como "La Pasionaria", famosa por el grito "¡No pasarán!".',
    pistaUnicaEn: 'Basque communist known as "La Pasionaria", famous for the cry "They shall not pass!".' },
  { id: 'lorca',           nombre: 'Federico García Lorca',         iniciales: 'FL', color: '#065f46', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'artista',        genero: 'hombre', destino: 'ejecutado',     pais: 'españa' },
    pistaUnica: 'Poeta y dramaturgo granadino fusilado por los sublevados al inicio de la guerra.',
    pistaUnicaEn: 'Poet and playwright from Granada, shot by the rebels at the start of the war.' },
  { id: 'azaña',           nombre: 'Manuel Azaña',                  iniciales: 'MA', color: '#1e40af', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Presidente de la Segunda República durante la guerra. Murió en el exilio en Francia.',
    pistaUnicaEn: 'President of the Second Republic during the war. Died in exile in France.' },
  { id: 'jose_antonio',    nombre: 'José Antonio Primo de Rivera',  iniciales: 'JP', color: '#92400e', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'ejecutado',     pais: 'españa' },
    pistaUnica: 'Fundador de Falange Española, fusilado por los republicanos en Alicante en 1936.',
    pistaUnicaEn: 'Founder of the Spanish Falange, shot by the Republicans in Alicante in 1936.' },
  { id: 'mola',            nombre: 'Emilio Mola',                   iniciales: 'EM', color: '#4c1d95', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'militar',        genero: 'hombre', destino: 'murió_conflicto', pais: 'españa' },
    pistaUnica: 'Director del golpe de Estado de julio de 1936. Murió en un accidente de avión en 1937.',
    pistaUnicaEn: 'Director of the July 1936 coup d\'etat. Died in a plane crash in 1937.' },
  { id: 'durruti',         nombre: 'Buenaventura Durruti',          iniciales: 'BD', color: '#1f2937', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'revolucionario', genero: 'hombre', destino: 'murió_conflicto', pais: 'españa' },
    pistaUnica: 'Líder anarquista que organizó la Columna Durruti. Murió combatiendo en el frente de Madrid.',
    pistaUnicaEn: 'Anarchist leader who organized the Durruti Column. Died fighting on the Madrid front.' },
  { id: 'companys',        nombre: 'Lluís Companys',                iniciales: 'LC', color: '#1d4ed8', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'ejecutado',     pais: 'españa' },
    pistaUnica: 'Presidente de la Generalitat de Cataluña, extraditado desde Francia y fusilado por Franco en 1940.',
    pistaUnicaEn: 'President of the Generalitat of Catalonia, extradited from France and shot by Franco in 1940.' },
  { id: 'machado',         nombre: 'Antonio Machado',               iniciales: 'AM', color: '#166534', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'artista',        genero: 'hombre', destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Poeta sevillano del 98 que cruzó la frontera con los refugiados republicanos y murió en Collioure.',
    pistaUnicaEn: 'Sevillian poet of the Generation of \'98 who crossed the border with Republican refugees and died in Collioure.' },
  { id: 'queipo',          nombre: 'Gonzalo Queipo de Llano',       iniciales: 'GQ', color: '#78350f', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'militar',        genero: 'hombre', destino: 'sobrevivió',    pais: 'españa' },
    pistaUnica: 'General sublevado que tomó Sevilla con 200 hombres y usó la radio como arma de propaganda.',
    pistaUnicaEn: 'Rebel general who took Seville with 200 men and used radio as a propaganda weapon.' },
  { id: 'negrín',          nombre: 'Juan Negrín',                   iniciales: 'JN', color: '#134e4a', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Último presidente del gobierno republicano. Defendió la política de "resistir para negociar".',
    pistaUnicaEn: 'Last prime minister of the Republican government. Championed the policy of "resist to negotiate".' },
  { id: 'pilar',           nombre: 'Pilar Primo de Rivera',         iniciales: 'PP', color: '#9d174d', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'sobrevivió',    pais: 'españa' },
    pistaUnica: 'Hermana de José Antonio y fundadora de la Sección Femenina de Falange bajo el franquismo.',
    pistaUnicaEn: 'Sister of Jose Antonio and founder of the Women\'s Section of the Falange under Franco\'s regime.' },
  { id: 'federica',        nombre: 'Federica Montseny',             iniciales: 'FM', color: '#831843', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Primera mujer ministra de España (Sanidad, 1936). Líder anarquista de la CNT-FAI.',
    pistaUnicaEn: 'First female minister in Spain (Health, 1936). Anarchist leader of the CNT-FAI.' },
  { id: 'kent',            nombre: 'Victoria Kent',                 iniciales: 'VK', color: '#701a75', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Primera mujer abogada de España y directora general de Prisiones durante la República.',
    pistaUnicaEn: 'First female lawyer in Spain and Director General of Prisons during the Republic.' },
]

// ── SEGUNDA GUERRA MUNDIAL ─────────────────────────────────────────────────────
export const PERSONAJES_WWII = [
  { id: 'hitler',      nombre: 'Adolf Hitler',           iniciales: 'AH', color: '#450a0a', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'murió_conflicto', pais: 'alemania' },
    pistaUnica: 'Dictador alemán que desencadenó la Segunda Guerra Mundial y ordenó el Holocausto.',
    pistaUnicaEn: 'German dictator who triggered World War II and ordered the Holocaust.' },
  { id: 'churchill',   nombre: 'Winston Churchill',      iniciales: 'WC', color: '#1e3a5f', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'sobrevivió',      pais: 'uk' },
    pistaUnica: 'Primer ministro británico que lideró la resistencia aliada con sus célebres discursos.',
    pistaUnicaEn: 'British Prime Minister who led the Allied resistance with his famous speeches.' },
  { id: 'roosevelt',   nombre: 'Franklin D. Roosevelt',  iniciales: 'FR', color: '#1e40af', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'murió_conflicto', pais: 'eeuu' },
    pistaUnica: 'Presidente de EEUU que llevó al país a la guerra. Murió antes de ver la victoria, en abril de 1945.',
    pistaUnicaEn: 'US President who led the country into the war. Died before seeing victory, in April 1945.' },
  { id: 'stalin',      nombre: 'Iósif Stalin',           iniciales: 'IS', color: '#14532d', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'sobrevivió',      pais: 'urss' },
    pistaUnica: 'Dictador soviético que transformó la URSS en potencia industrial y venció en el frente del Este.',
    pistaUnicaEn: 'Soviet dictator who transformed the USSR into an industrial power and won on the Eastern Front.' },
  { id: 'mussolini',   nombre: 'Benito Mussolini',        iniciales: 'BM', color: '#713f12', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'ejecutado',       pais: 'italia' },
    pistaUnica: 'Fundador del fascismo italiano, aliado de Hitler. Fue capturado y fusilado en 1945.',
    pistaUnicaEn: 'Founder of Italian fascism, allied with Hitler. Was captured and shot in 1945.' },
  { id: 'rommel',      nombre: 'Erwin Rommel',            iniciales: 'ER', color: '#3b0764', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'ejecutado',       pais: 'alemania' },
    pistaUnica: 'El "Zorro del Desierto", general alemán imbatible en el norte de África. Obligado a suicidarse por Hitler.',
    pistaUnicaEn: 'The "Desert Fox", unbeatable German general in North Africa. Forced to commit suicide by Hitler.' },
  { id: 'eisenhower',  nombre: 'Dwight Eisenhower',       iniciales: 'DE', color: '#164e63', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu' },
    pistaUnica: 'Comandante supremo aliado que organizó el Desembarco de Normandía. Luego fue presidente de EEUU.',
    pistaUnicaEn: 'Supreme Allied Commander who organized the Normandy landings. Later became US President.' },
  { id: 'anne_frank',  nombre: 'Anne Frank',              iniciales: 'AF', color: '#7f1d1d', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'víctima',    genero: 'mujer',  destino: 'ejecutado',       pais: 'alemania' },
    pistaUnica: 'Niña judía alemana que se ocultó en Ámsterdam y escribió su diario. Murió en Bergen-Belsen.',
    pistaUnicaEn: 'German Jewish girl who hid in Amsterdam and wrote her diary. Died in Bergen-Belsen.' },
  { id: 'de_gaulle',   nombre: 'Charles de Gaulle',       iniciales: 'CG', color: '#1e3a8a', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'francia' },
    pistaUnica: 'Líder de la Francia Libre desde Londres. Encabezó la liberación de París en 1944.',
    pistaUnicaEn: 'Leader of Free France from London. Led the liberation of Paris in 1944.' },
  { id: 'himmler',     nombre: 'Heinrich Himmler',        iniciales: 'HH', color: '#422006', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'murió_conflicto', pais: 'alemania' },
    pistaUnica: 'Jefe de las SS y arquitecto del Holocausto. Se suicidó tras ser capturado en 1945.',
    pistaUnicaEn: 'Head of the SS and architect of the Holocaust. Committed suicide after being captured in 1945.' },
  { id: 'montgomery',  nombre: 'Bernard Montgomery',      iniciales: 'BM', color: '#0c4a6e', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'uk' },
    pistaUnica: 'General británico que venció a Rommel en El Alamein, el primer gran giro aliado en la guerra.',
    pistaUnicaEn: 'British general who defeated Rommel at El Alamein, the first major Allied turning point in the war.' },
  { id: 'curie_irene', nombre: 'Irène Joliot-Curie',      iniciales: 'IC', color: '#4a044e', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'científico', genero: 'mujer',  destino: 'sobrevivió',      pais: 'francia' },
    pistaUnica: 'Hija de Marie Curie y Premio Nobel de Química 1935. Vivió la ocupación nazi en Francia.',
    pistaUnicaEn: 'Daughter of Marie Curie and Nobel Prize in Chemistry 1935. Lived through the Nazi occupation of France.' },
]

// ── PERSONAJES GLOBALES (mezcla de épocas) ─────────────────────────────────────
export const PERSONAJES_GLOBAL = [
  { id: 'napoleon',    nombre: 'Napoleón Bonaparte',     iniciales: 'NB', color: '#1c1917', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'militar',    genero: 'hombre', destino: 'exilio',          pais: 'francia' },
    pistaUnica: 'Emperador de los franceses que conquistó Europa y fue derrotado definitivamente en Waterloo.',
    pistaUnicaEn: 'Emperor of the French who conquered Europe and was definitively defeated at Waterloo.' },
  { id: 'robespierre', nombre: 'Maximilien Robespierre', iniciales: 'MR', color: '#7f1d1d', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'político',   genero: 'hombre', destino: 'ejecutado',       pais: 'francia' },
    pistaUnica: 'Líder del Comité de Salvación Pública durante el Terror. Guillotinado por sus propios aliados.',
    pistaUnicaEn: 'Leader of the Committee of Public Safety during the Terror. Guillotined by his own allies.' },
  { id: 'cesar',       nombre: 'Julio César',            iniciales: 'JC', color: '#92400e', categoria: 'global',
    atributos: { epoca: 'antiguedad', rol: 'militar',   genero: 'hombre', destino: 'ejecutado',       pais: 'roma' },
    pistaUnica: 'General romano que cruzó el Rubicón y conquistó las Galias. Asesinado en los idus de marzo.',
    pistaUnicaEn: 'Roman general who crossed the Rubicon and conquered Gaul. Assassinated on the Ides of March.' },
  { id: 'cleopatra',   nombre: 'Cleopatra VII',          iniciales: 'CL', color: '#b45309', categoria: 'global',
    atributos: { epoca: 'antiguedad', rol: 'político',  genero: 'mujer',  destino: 'murió_conflicto', pais: 'egipto' },
    pistaUnica: 'Última faraona del Egipto ptolemaico. Se alió con César y Marco Antonio para defender su reino.',
    pistaUnicaEn: 'Last pharaoh of Ptolemaic Egypt. Allied with Caesar and Mark Antony to defend her kingdom.' },
  { id: 'alejandro',   nombre: 'Alejandro Magno',        iniciales: 'AM', color: '#1e3a8a', categoria: 'global',
    atributos: { epoca: 'antiguedad', rol: 'militar',   genero: 'hombre', destino: 'murió_conflicto', pais: 'grecia' },
    pistaUnica: 'Rey macedonio que conquistó el mayor imperio de la Antigüedad, desde Grecia hasta la India.',
    pistaUnicaEn: 'Macedonian king who conquered the largest empire of Antiquity, from Greece to India.' },
  { id: 'washington',  nombre: 'George Washington',      iniciales: 'GW', color: '#14532d', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu' },
    pistaUnica: 'Comandante del ejército revolucionario y primer presidente de los Estados Unidos.',
    pistaUnicaEn: 'Commander of the revolutionary army and first President of the United States.' },
  { id: 'marie_curie', nombre: 'Marie Curie',            iniciales: 'MC', color: '#4a044e', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'científico',  genero: 'mujer',  destino: 'sobrevivió',      pais: 'francia' },
    pistaUnica: 'Primera persona en ganar dos Premios Nobel (Física y Química). Descubrió el radio y el polonio.',
    pistaUnicaEn: 'First person to win two Nobel Prizes (Physics and Chemistry). Discovered radium and polonium.' },
  { id: 'lincoln',     nombre: 'Abraham Lincoln',        iniciales: 'AL', color: '#1e3a5f', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'político',   genero: 'hombre', destino: 'ejecutado',       pais: 'eeuu' },
    pistaUnica: 'Presidente que abolió la esclavitud en EEUU. Fue asesinado en un teatro en Washington en 1865.',
    pistaUnicaEn: 'President who abolished slavery in the US. Was assassinated in a theater in Washington in 1865.' },
  { id: 'lenin',       nombre: 'Vladímir Lenin',         iniciales: 'VL', color: '#7f1d1d', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'revolucionario', genero: 'hombre', destino: 'sobrevivió',   pais: 'urss' },
    pistaUnica: 'Líder de la Revolución Bolchevique de 1917 y fundador de la Unión Soviética.',
    pistaUnicaEn: 'Leader of the Bolshevik Revolution of 1917 and founder of the Soviet Union.' },
  { id: 'gandhi',      nombre: 'Mahatma Gandhi',         iniciales: 'MG', color: '#78350f', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'revolucionario', genero: 'hombre', destino: 'ejecutado',    pais: 'india' },
    pistaUnica: 'Líder de la independencia india a través de la resistencia no violenta. Asesinado en 1948.',
    pistaUnicaEn: 'Leader of Indian independence through nonviolent resistance. Assassinated in 1948.' },
  { id: 'eleonor',     nombre: 'Eleanor Roosevelt',      iniciales: 'ER', color: '#134e4a', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'político',    genero: 'mujer',  destino: 'sobrevivió',      pais: 'eeuu' },
    pistaUnica: 'Primera dama de EEUU y arquitecta de la Declaración Universal de los Derechos Humanos de 1948.',
    pistaUnicaEn: 'First Lady of the US and architect of the Universal Declaration of Human Rights of 1948.' },
  { id: 'mandela',     nombre: 'Nelson Mandela',         iniciales: 'NM', color: '#1f2937', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'político',    genero: 'hombre', destino: 'sobrevivió',      pais: 'sudafrica' },
    pistaUnica: 'Estuvo 27 años encarcelado bajo el apartheid. Fue el primer presidente negro de Sudáfrica.',
    pistaUnicaEn: 'Spent 27 years imprisoned under apartheid. Was the first black president of South Africa.' },
]

// ── INDEPENDENCIA AMERICANA ────────────────────────────────────────────────────
export const PERSONAJES_USA = [
  { id: 'washington_usa',  nombre: 'George Washington',      iniciales: 'GW', color: '#14532d', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'militar',        genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Comandante del ejército continental y primer presidente de los Estados Unidos.',
    pistaUnicaEn: 'Commander of the Continental Army and first President of the United States.' },
  { id: 'jefferson',       nombre: 'Thomas Jefferson',        iniciales: 'TJ', color: '#1e3a8a', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'político',       genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Principal redactor de la Declaración de Independencia y tercer presidente de EEUU.',
    pistaUnicaEn: 'Principal author of the Declaration of Independence and third US President.' },
  { id: 'franklin',        nombre: 'Benjamin Franklin',       iniciales: 'BF', color: '#78350f', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'científico',     genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Inventor, diplomático y Padre Fundador. Negoció la alianza con Francia que fue clave para la independencia.',
    pistaUnicaEn: 'Inventor, diplomat, and Founding Father. Negotiated the alliance with France that was key to independence.' },
  { id: 'hamilton',        nombre: 'Alexander Hamilton',      iniciales: 'AH', color: '#4c1d95', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'político',       genero: 'hombre', destino: 'murió_conflicto', pais: 'eeuu'   },
    pistaUnica: 'Primer secretario del Tesoro de EEUU. Murió en un duelo contra el vicepresidente Aaron Burr en 1804.',
    pistaUnicaEn: 'First Secretary of the Treasury of the US. Died in a duel against Vice President Aaron Burr in 1804.' },
  { id: 'adams_john',      nombre: 'John Adams',              iniciales: 'JA', color: '#1e3a5f', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'político',       genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Primer vicepresidente y segundo presidente de EEUU. Defensor del proceso independentista en el Congreso.',
    pistaUnicaEn: 'First Vice President and second President of the US. Champion of the independence movement in Congress.' },
  { id: 'paine',           nombre: 'Thomas Paine',            iniciales: 'TP', color: '#7f1d1d', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'revolucionario', genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Panfletista cuyo "Sentido Común" convenció a miles de colonos de declarar la independencia.',
    pistaUnicaEn: 'Pamphleteer whose "Common Sense" convinced thousands of colonists to declare independence.' },
  { id: 'samuel_adams',    nombre: 'Samuel Adams',            iniciales: 'SA', color: '#134e4a', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'revolucionario', genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Organizó el Motín del Té de Boston y fue uno de los principales agitadores del movimiento independentista.',
    pistaUnicaEn: 'Organized the Boston Tea Party and was one of the main agitators of the independence movement.' },
  { id: 'patrick_henry',   nombre: 'Patrick Henry',           iniciales: 'PH', color: '#065f46', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'político',       genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: '"Dadme la libertad o dadme la muerte." Orador que inflamó el espíritu revolucionario en Virginia.',
    pistaUnicaEn: '"Give me liberty or give me death." Orator who inflamed the revolutionary spirit in Virginia.' },
  { id: 'paul_revere',     nombre: 'Paul Revere',             iniciales: 'PR', color: '#1f2937', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'revolucionario', genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Platero de Boston famoso por su cabalgata nocturna avisando de la llegada de las tropas británicas.',
    pistaUnicaEn: 'Boston silversmith famous for his midnight ride warning of the arrival of British troops.' },
  { id: 'hancock',         nombre: 'John Hancock',            iniciales: 'JH', color: '#92400e', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'político',       genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu'   },
    pistaUnica: 'Presidente del Congreso Continental. Su firma en la Declaración de Independencia es la más reconocible.',
    pistaUnicaEn: 'President of the Continental Congress. His signature on the Declaration of Independence is the most recognizable.' },
  { id: 'benedict_arnold', nombre: 'Benedict Arnold',         iniciales: 'BA', color: '#450a0a', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'militar',        genero: 'hombre', destino: 'sobrevivió',      pais: 'uk'     },
    pistaUnica: 'General americano que traicionó a los colonos pasándose al bando británico. Su nombre es sinónimo de traición.',
    pistaUnicaEn: 'American general who betrayed the colonists by defecting to the British side. His name is synonymous with treason.' },
  { id: 'lafayette',       nombre: 'Marqués de Lafayette',    iniciales: 'ML', color: '#1e40af', categoria: 'usa',
    atributos: { epoca: 'siglo_xviii', rol: 'militar',        genero: 'hombre', destino: 'sobrevivió',      pais: 'francia'},
    pistaUnica: 'Noble francés que cruzó el Atlántico para luchar junto a Washington. Clave en la victoria de Yorktown.',
    pistaUnicaEn: 'French nobleman who crossed the Atlantic to fight alongside Washington. Key to the victory at Yorktown.' },
]

// Pool combinado para el modo global
export const PERSONAJES_TODOS = [
  ...PERSONAJES_GCE,
  ...PERSONAJES_WWII,
  ...PERSONAJES_GLOBAL,
  ...PERSONAJES_USA,
]

// ── PLANTILLAS DE PISTAS ──────────────────────────────────────────────────────
export const PISTA_TEMPLATES = {
  epoca: {
    antiguedad:  () => 'Vivió en la Antigüedad (antes del año 500 d.C.).',
    siglo_xviii: () => 'Vivió en el siglo XVIII (entre 1700 y 1800).',
    siglo_xix:   () => 'Vivió en el siglo XIX o a principios del XX (antes de 1914).',
    siglo_xx:    () => 'Vivió en el siglo XX (entre las dos guerras mundiales o después).',
  },
  rol: {
    militar:        () => 'Era militar de carrera, no un político ni un civil.',
    político:       () => 'Era político o dirigente civil, no un militar.',
    artista:        () => 'Era artista o intelectual (escritor, poeta, pintor…).',
    científico:     () => 'Era científico o académico.',
    revolucionario: () => 'Era un líder revolucionario o activista, no un cargo institucional.',
    víctima:        () => 'No era ni político ni militar: fue una víctima civil del conflicto.',
  },
  genero: {
    hombre: () => 'Era hombre.',
    mujer:  () => 'Era mujer.',
  },
  destino: {
    sobrevivió:       () => 'Sobrevivió al conflicto o periodo y murió de vejez o enfermedad.',
    exilio:           () => 'Sobrevivió al conflicto pero tuvo que marchar al exilio.',
    ejecutado:        () => 'Fue capturado o asesinado: lo ejecutaron.',
    murió_conflicto:  () => 'Murió durante el conflicto, sin ser ejecutado formalmente.',
  },
  pais: {
    españa:      () => 'Era español o representaba a España.',
    alemania:    () => 'Era alemán o representaba a Alemania.',
    uk:          () => 'Era británico o representaba al Reino Unido.',
    eeuu:        () => 'Era estadounidense o representaba a los Estados Unidos.',
    francia:     () => 'Era francés o representaba a Francia.',
    italia:      () => 'Era italiano o representaba a Italia.',
    urss:        () => 'Era soviético o representaba a la Unión Soviética.',
    roma:        () => 'Era romano o representaba a la República/Imperio Romano.',
    grecia:      () => 'Era griego o representaba a la Grecia antigua.',
    egipto:      () => 'Era egipcio o representaba al Antiguo Egipto.',
    india:       () => 'Era indio o luchaba por la independencia de la India.',
    sudafrica:   () => 'Era sudafricano o luchaba contra el apartheid.',
  },
}

export const PISTA_TEMPLATES_EN = {
  epoca: {
    antiguedad:  () => 'Lived in Antiquity (before 500 AD).',
    siglo_xviii: () => 'Lived in the 18th century (1700–1800).',
    siglo_xix:   () => 'Lived in the 19th or early 20th century (before 1914).',
    siglo_xx:    () => 'Lived in the 20th century (between or after the World Wars).',
  },
  rol: {
    militar:        () => 'Was a career soldier, not a politician or civilian.',
    político:       () => 'Was a politician or civil leader, not a soldier.',
    artista:        () => 'Was an artist or intellectual (writer, poet, painter…).',
    científico:     () => 'Was a scientist or academic.',
    revolucionario: () => 'Was a revolutionary leader or activist, not a state official.',
    víctima:        () => 'Was neither a politician nor a soldier: a civilian victim of the conflict.',
  },
  genero: {
    hombre: () => 'Was male.',
    mujer:  () => 'Was female.',
  },
  destino: {
    sobrevivió:       () => 'Survived the conflict and died of old age or illness.',
    exilio:           () => 'Survived the conflict but had to go into exile.',
    ejecutado:        () => 'Was captured or killed: executed.',
    murió_conflicto:  () => 'Died during the conflict, without being formally executed.',
  },
  pais: {
    españa:      () => 'Was Spanish or represented Spain.',
    alemania:    () => 'Was German or represented Germany.',
    uk:          () => 'Was British or represented the United Kingdom.',
    eeuu:        () => 'Was American or represented the United States.',
    francia:     () => 'Was French or represented France.',
    italia:      () => 'Was Italian or represented Italy.',
    urss:        () => 'Was Soviet or represented the USSR.',
    roma:        () => 'Was Roman or represented the Roman Republic/Empire.',
    grecia:      () => 'Was Greek or represented ancient Greece.',
    egipto:      () => 'Was Egyptian or represented ancient Egypt.',
    india:       () => 'Was Indian or fought for Indian independence.',
    sudafrica:   () => 'Was South African or fought against apartheid.',
  },
}

const PISTA_NEG_TEMPLATES_EN = {
  epoca: {
    antiguedad:  () => 'Did not live in Antiquity: their story is more recent.',
    siglo_xviii: () => 'Did not live in the 18th century: belongs to another era.',
    siglo_xix:   () => 'Did not live in the 19th century: belongs to another era.',
    siglo_xx:    () => 'Not from the 20th century: lived before the World Wars.',
  },
  rol: {
    militar:        () => 'Was not a career soldier.',
    político:       () => 'Was not a politician or civil leader.',
    artista:        () => 'Was not an artist or intellectual.',
    científico:     () => 'Was not a scientist or academic.',
    revolucionario: () => 'Was not a revolutionary leader or activist.',
    víctima:        () => 'Was not a civilian victim: had an active role.',
  },
  genero: {
    hombre: () => 'Was not male.',
    mujer:  () => 'Was not female.',
  },
  destino: {
    sobrevivió:       () => 'Did not survive and die of old age.',
    exilio:           () => 'Did not end up in exile.',
    ejecutado:        () => 'Was not executed or captured.',
    murió_conflicto:  () => 'Did not die during combat.',
  },
  pais: {
    españa:      () => 'Was not Spanish.',
    alemania:    () => 'Was not German.',
    uk:          () => 'Was not British.',
    eeuu:        () => 'Was not American.',
    francia:     () => 'Was not French.',
    italia:      () => 'Was not Italian.',
    urss:        () => 'Was not Soviet.',
    roma:        () => 'Was not Roman.',
    grecia:      () => 'Was not ancient Greek.',
    egipto:      () => 'Was not ancient Egyptian.',
    india:       () => 'Did not fight for Indian independence.',
    sudafrica:   () => 'Was not South African.',
  },
}

// ── PLANTILLAS DE PISTAS NEGATIVAS ───────────────────────────────────────────
const PISTA_NEG_TEMPLATES = {
  epoca: {
    antiguedad:  () => 'No vivió en la Antigüedad: su historia es más reciente.',
    siglo_xviii: () => 'No vivió en el siglo XVIII: pertenece a otra época.',
    siglo_xix:   () => 'No vivió en el siglo XIX: pertenece a otra época.',
    siglo_xx:    () => 'No es del siglo XX: vivió antes de las guerras mundiales.',
  },
  rol: {
    militar:        () => 'No era militar de carrera.',
    político:       () => 'No era político ni dirigente civil.',
    artista:        () => 'No era artista ni intelectual.',
    científico:     () => 'No era científico ni académico.',
    revolucionario: () => 'No era un líder revolucionario ni activista.',
    víctima:        () => 'No fue una víctima civil: tenía un rol activo.',
  },
  genero: {
    hombre: () => 'No era hombre.',
    mujer:  () => 'No era mujer.',
  },
  destino: {
    sobrevivió:       () => 'No sobrevivió al conflicto muriendo de vejez.',
    exilio:           () => 'No terminó en el exilio.',
    ejecutado:        () => 'No fue ejecutado ni capturado.',
    murió_conflicto:  () => 'No murió durante el combate.',
  },
  pais: {
    españa:      () => 'No era español ni representaba a España.',
    alemania:    () => 'No era alemán ni representaba a Alemania.',
    uk:          () => 'No era británico ni representaba al Reino Unido.',
    eeuu:        () => 'No era estadounidense.',
    francia:     () => 'No era francés ni representaba a Francia.',
    italia:      () => 'No era italiano ni representaba a Italia.',
    urss:        () => 'No era soviético ni representaba a la URSS.',
    roma:        () => 'No era romano.',
    grecia:      () => 'No era griego de la Antigüedad.',
    egipto:      () => 'No era egipcio del mundo antiguo.',
    india:       () => 'No luchaba por la independencia de la India.',
    sudafrica:   () => 'No era sudafricano.',
  },
}

// ── MOTOR DE PISTAS DINÁMICO ──────────────────────────────────────────────────

function hashId(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h
}

function shuffleSeeded(arr, seed) {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generarPistas(secreto, tablero, lang = 'es') {
  const en = lang === 'en'
  const posTemplates = en ? PISTA_TEMPLATES_EN : PISTA_TEMPLATES
  const negTemplates = en ? PISTA_NEG_TEMPLATES_EN : PISTA_NEG_TEMPLATES
  const seed = hashId(secreto.id + tablero.map(p => p.id).join(''))

  // ── Pistas positivas (lo que SÍ es) ────────────────────────────────────────
  const positivas = []
  for (const [attr, val] of Object.entries(secreto.atributos)) {
    const template = posTemplates[attr]?.[val]
    if (!template) continue
    const comparten = tablero.filter(p => p.atributos[attr] === val).length
    const eliminan  = tablero.length - comparten
    const ratio     = eliminan / tablero.length
    if (ratio >= 0.15 && ratio <= 0.9) {
      positivas.push({ attr, val, texto: template(), ratio, negativa: false })
    }
  }
  const mezcladas = shuffleSeeded(positivas, seed)
  mezcladas.sort((a, b) => a.ratio - b.ratio)
  const usados = new Set()
  const seleccionadas = []
  for (const c of mezcladas) {
    if (!usados.has(c.attr)) { seleccionadas.push(c); usados.add(c.attr) }
    if (seleccionadas.length === 3) break
  }

  // ── Pista única (la más específica) ────────────────────────────────────────
  seleccionadas.push({ attr: 'única', texto: (en && secreto.pistaUnicaEn) || secreto.pistaUnica, ratio: 1, negativa: false })

  // ── Pistas negativas (lo que NO es) ────────────────────────────────────────
  // Busca valores que existen en el tablero pero el secreto NO tiene
  const negativas = []
  const attrsUsados = new Set(seleccionadas.map(c => c.attr))
  for (const attr of Object.keys(PISTA_NEG_TEMPLATES)) {
    const secretoVal = secreto.atributos[attr]
    // Valores distintos al secreto que aparecen en el tablero
    const valsEnTablero = [...new Set(tablero.map(p => p.atributos[attr]).filter(v => v && v !== secretoVal))]
    for (const val of valsEnTablero) {
      const template = negTemplates[attr]?.[val]
      if (!template) continue
      const afectan = tablero.filter(p => p.atributos[attr] === val).length
      const ratio   = afectan / tablero.length
      // Solo si elimina al menos 1 y no más del 85%
      if (ratio >= 0.08 && ratio <= 0.85) {
        negativas.push({ attr: `neg_${attr}_${val}`, val, texto: template(), ratio, negativa: true })
      }
    }
  }
  // Ordenar por cuántos elimina (más útiles primero), mezclar con seed
  negativas.sort((a, b) => b.ratio - a.ratio)
  const negMezcladas = shuffleSeeded(negativas, seed + 1)
  // Añadir hasta 4 pistas negativas sin repetir atributo
  const attrsNegUsados = new Set()
  for (const c of negMezcladas) {
    const baseAttr = c.attr.replace(/^neg_/, '').split('_')[0]
    if (!attrsNegUsados.has(baseAttr) && !attrsUsados.has(baseAttr)) {
      seleccionadas.push(c)
      attrsNegUsados.add(baseAttr)
    }
    if (attrsNegUsados.size >= 4) break
  }

  return seleccionadas
}

export function montarTablero(pool, n = 12) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(n, pool.length))
}
