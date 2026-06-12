// Eventos históricos para el modo examen de Tuthor
// Cada evento: { id, nombre, descripcion, año, dificultad, categoria }

export const EVENTOS_HISTORIA = [

  // ── SEGUNDA GUERRA MUNDIAL ────────────────────────────────────────────────
  { id: 'wwii_01', nombre: "Inicio de la Segunda Guerra Mundial",   año: 1939, descripcion: "Alemania invade Polonia. Reino Unido y Francia declaran la guerra.",  dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_02', nombre: "Evacuación de Dunkerque",               año: 1940, descripcion: "330.000 soldados aliados evacuados bajo fuego nazi.",                  dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_03', nombre: "Batalla de Gran Bretaña",               año: 1940, descripcion: "La RAF defiende los cielos británicos de la Luftwaffe.",               dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_04', nombre: "Operación Barbarroja",                  año: 1941, descripcion: "Alemania invade la Unión Soviética con 3 millones de soldados.",       dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_05', nombre: "Ataque a Pearl Harbor",                 año: 1941, descripcion: "Japón ataca la base naval americana. EEUU entra en la guerra.",        dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_06', nombre: "Batalla de Stalingrado",                año: 1942, descripcion: "El punto de inflexión del frente oriental. Derrota nazi decisiva.",    dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_07', nombre: "Desembarco de Normandía (Día D)",       año: 1944, descripcion: "La mayor operación anfibia de la historia en las playas francesas.",   dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_08', nombre: "Liberación de París",                   año: 1944, descripcion: "Las tropas aliadas y la Resistencia liberan la capital francesa.",     dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_09', nombre: "Batalla de las Ardenas",                año: 1944, descripcion: "La última gran ofensiva alemana en el frente occidental.",             dificultad: "difícil", categoria: "wwii" },
  { id: 'wwii_10', nombre: "Rendición de Alemania",                 año: 1945, descripcion: "Firma del armisticio. Fin de la guerra en Europa.",                    dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_11', nombre: "Bombas atómicas sobre Japón",           año: 1945, descripcion: "Hiroshima y Nagasaki. El fin de la guerra en el Pacífico.",            dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_12', nombre: "Conferencia de Yalta",                  año: 1945, descripcion: "Churchill, Roosevelt y Stalin dividen el mundo de posguerra.",         dificultad: "difícil", categoria: "wwii" },

  // ── GUERRA CIVIL ESPAÑOLA ─────────────────────────────────────────────────
  { id: 'gce_01', nombre: "Segunda República Española",             año: 1931, descripcion: "Alfonso XIII parte al exilio. España se convierte en República.",      dificultad: "medio",   categoria: "gce" },
  { id: 'gce_02', nombre: "Revolución de Asturias",                 año: 1934, descripcion: "Mineros asturianos se levantan. El ejército reprime duramente.",        dificultad: "difícil", categoria: "gce" },
  { id: 'gce_03', nombre: "Victoria del Frente Popular",            año: 1936, descripcion: "La coalición de izquierdas gana las elecciones generales.",             dificultad: "medio",   categoria: "gce" },
  { id: 'gce_04', nombre: "Inicio de la Guerra Civil Española",     año: 1936, descripcion: "El golpe de estado de Franco inicia tres años de guerra fratricida.",  dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_05', nombre: "Bombardeo de Guernica",                  año: 1937, descripcion: "La Legión Cóndor nazi arrasa la ciudad vasca. Picasso lo inmortaliza.", dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_06', nombre: "Batalla del Ebro",                       año: 1938, descripcion: "La mayor batalla de la guerra civil. Derrota republicana definitiva.", dificultad: "medio",   categoria: "gce" },
  { id: 'gce_07', nombre: "Caída de Barcelona",                     año: 1939, descripcion: "Las tropas franquistas entran en Cataluña. El exilio masivo comienza.", dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_08', nombre: "Fin de la Guerra Civil Española",        año: 1939, descripcion: "Franco proclama el final de la guerra. Comienza la dictadura.",        dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_09', nombre: "Muerte de Franco",                       año: 1975, descripcion: "El dictador muere en la cama. Comienza la Transición Democrática.",    dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_10', nombre: "Constitución Española",                  año: 1978, descripcion: "España aprueba su carta magna. La democracia queda consolidada.",      dificultad: "fácil",   categoria: "gce" },

  // ── ANTIGUA ROMA ──────────────────────────────────────────────────────────
  { id: 'roma_01', nombre: "Fundación de Roma",                     año: -753, descripcion: "Según la leyenda, Rómulo funda la ciudad eterna a orillas del Tíber.", dificultad: "medio",   categoria: "roma" },
  { id: 'roma_02', nombre: "Nace la República Romana",              año: -509, descripcion: "Se expulsa al último rey etrusco. Roma pasa a ser república.",         dificultad: "difícil", categoria: "roma" },
  { id: 'roma_03', nombre: "Inicio de las Guerras Púnicas",         año: -264, descripcion: "Roma y Cartago luchan por el control del Mediterráneo.",               dificultad: "difícil", categoria: "roma" },
  { id: 'roma_04', nombre: "Cruce del Rubicón por César",           año:  -49, descripcion: "César desafía al Senado. Comienza la guerra civil romana.",            dificultad: "medio",   categoria: "roma" },
  { id: 'roma_05', nombre: "Asesinato de Julio César",              año:  -44, descripcion: "Los idus de marzo. 23 puñaladas en el Senado romano.",                 dificultad: "fácil",   categoria: "roma" },
  { id: 'roma_06', nombre: "Augusto, primer emperador",             año:  -27, descripcion: "Octavio recibe el título de Augusto. Comienza el Imperio Romano.",     dificultad: "medio",   categoria: "roma" },
  { id: 'roma_07', nombre: "Erupción del Vesubio",                  año:   79, descripcion: "Pompeya y Herculano quedan sepultadas bajo las cenizas volcánicas.",   dificultad: "fácil",   categoria: "roma" },
  { id: 'roma_08', nombre: "Edicto de Milán",                       año:  313, descripcion: "Constantino legaliza el cristianismo en el Imperio Romano.",           dificultad: "difícil", categoria: "roma" },
  { id: 'roma_09', nombre: "División del Imperio Romano",           año:  395, descripcion: "Teodosio divide el Imperio entre sus dos hijos.",                      dificultad: "difícil", categoria: "roma" },
  { id: 'roma_10', nombre: "Caída del Imperio Romano de Occidente", año:  476, descripcion: "Rómulo Augústulo es depuesto. Fin del mundo antiguo.",                 dificultad: "medio",   categoria: "roma" },

  // ── PRIMARIA: HITOS HISTÓRICOS BÁSICOS ───────────────────────────────────
  { id: 'pri_01', nombre: "Descubrimiento de América",              año: 1492, descripcion: "Cristóbal Colón llega a las Bahamas creyendo que era Asia.",           dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_02', nombre: "Caída del Imperio Romano de Occidente",  año:  476, descripcion: "Los bárbaros acaban con el gran Imperio Romano.",                       dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_03', nombre: "Revolución Francesa",                    año: 1789, descripcion: "El pueblo de Francia se rebela contra el rey. Nace la democracia.",     dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_04', nombre: "Llegada del hombre a la Luna",           año: 1969, descripcion: "Neil Armstrong da el primer paso humano en la Luna.",                   dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_05', nombre: "Primer vuelo de los hermanos Wright",    año: 1903, descripcion: "El primer avión de la historia vuela durante 12 segundos.",             dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_06', nombre: "Invención de la imprenta",               año: 1440, descripcion: "Gutenberg inventa la imprenta. Los libros llegan a todo el mundo.",     dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_07', nombre: "Caída del Muro de Berlín",               año: 1989, descripcion: "El muro que separaba una ciudad entera se derrumba.",                   dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_08', nombre: "Inicio de la Segunda Guerra Mundial",    año: 1939, descripcion: "El conflicto más grande de la historia comienza en Europa.",            dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_09', nombre: "Fundación de Roma",                      año: -753, descripcion: "Según la leyenda, Rómulo funda la ciudad más poderosa del mundo.",      dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_10', nombre: "Primer Juego Olímpico moderno",          año: 1896, descripcion: "Atenas acoge los primeros Juegos Olímpicos de la era moderna.",         dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_11', nombre: "Hundimiento del Titanic",                año: 1912, descripcion: "El barco más grande del mundo se hunde en su primer viaje.",            dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_12', nombre: "España gana el Mundial de fútbol",       año: 2010, descripcion: "La selección española gana su primer campeonato del mundo.",            dificultad: "fácil",   categoria: "primaria" },
  { id: 'pri_13', nombre: "Fin de la Edad Media",                   año: 1453, descripcion: "La caída de Constantinopla marca el fin de la Edad Media.",             dificultad: "medio",   categoria: "primaria" },
  { id: 'pri_14', nombre: "Revolución Industrial",                  año: 1760, descripcion: "Las máquinas de vapor cambian el trabajo y la vida de las personas.",   dificultad: "medio",   categoria: "primaria" },
  { id: 'pri_15', nombre: "Independencia de los Estados Unidos",    año: 1776, descripcion: "Las colonias americanas se declaran libres de Gran Bretaña.",           dificultad: "medio",   categoria: "primaria" },

  // ── INDEPENDENCIA AMERICANA ───────────────────────────────────────────────
  { id: 'usa_01', nombre: "Motín del Té de Boston",                 año: 1773, descripcion: "Colonos americanos arrojan té al mar protestando contra impuestos.",  dificultad: "medio",   categoria: "usa" },
  { id: 'usa_02', nombre: "Primer Congreso Continental",            año: 1774, descripcion: "Las colonias se unen por primera vez para coordinar su resistencia.", dificultad: "difícil", categoria: "usa" },
  { id: 'usa_03', nombre: "Declaración de Independencia",           año: 1776, descripcion: "Las 13 colonias se declaran nación libre e independiente.",           dificultad: "fácil",   categoria: "usa" },
  { id: 'usa_04', nombre: "Batalla de Saratoga",                    año: 1777, descripcion: "Victoria americana que convence a Francia de entrar en la guerra.",   dificultad: "difícil", categoria: "usa" },
  { id: 'usa_05', nombre: "Batalla de Yorktown",                    año: 1781, descripcion: "La última gran batalla. La rendición británica sella la independencia.", dificultad: "medio", categoria: "usa" },
  { id: 'usa_06', nombre: "Tratado de París",                       año: 1783, descripcion: "Gran Bretaña reconoce oficialmente la independencia americana.",      dificultad: "medio",   categoria: "usa" },
  { id: 'usa_07', nombre: "Constitución de los Estados Unidos",     año: 1787, descripcion: "Se redacta la constitución más duradera de la historia moderna.",     dificultad: "fácil",   categoria: "usa" },
  { id: 'usa_08', nombre: "George Washington, primer presidente",   año: 1789, descripcion: "Washington es elegido primer presidente de los Estados Unidos.",      dificultad: "fácil",   categoria: "usa" },
]

// ── CATÁLOGO DE EXÁMENES ─────────────────────────────────────────────────────
// niveles: ['eso', 'bachillerato'] — en qué niveles aparece este examen

export const EXAMENES_HISTORIA = [
  {
    id: 'primaria',
    nombre: 'Grandes hitos de la Historia',
    emoji: '🌍',
    descripcion: 'Los momentos más importantes que cambiaron el mundo',
    niveles: ['primaria'],
  },
  {
    id: 'gce',
    nombre: 'Guerra Civil Española',
    emoji: '🇪🇸',
    descripcion: 'De la República al franquismo — una herida en la historia de España',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'wwii',
    nombre: 'Segunda Guerra Mundial',
    emoji: '⚔️',
    descripcion: 'El conflicto que cambió el mundo para siempre',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'roma',
    nombre: 'Antigua Roma',
    emoji: '🏛️',
    descripcion: 'Desde Rómulo hasta la caída del Imperio Romano',
    niveles: ['eso', 'bachillerato'],
  },
  {
    id: 'usa',
    nombre: 'Independencia Americana',
    emoji: '🦅',
    descripcion: 'De la colonia británica a los Estados Unidos de América',
    niveles: ['bachillerato'],
  },
]

// ── HELPERS ───────────────────────────────────────────────────────────────────

export const PREGUNTAS_POR_EXAMEN = 10

export function getEventosPorCategoria(categoriaId) {
  const todos = EVENTOS_HISTORIA.filter(e => e.categoria === categoriaId)
  const mezclados = todos.sort(() => Math.random() - 0.5)
  return mezclados.slice(0, PREGUNTAS_POR_EXAMEN)
}

export function calcularMargen(categoriaId) {
  const todos = EVENTOS_HISTORIA.filter(e => e.categoria === categoriaId)
  const years = todos.map(e => e.año)
  const rango = Math.max(...years) - Math.min(...years)
  return Math.max(1, Math.round(rango / PREGUNTAS_POR_EXAMEN))
}

export function getExamenesPorNivel(nivel) {
  return EXAMENES_HISTORIA.filter(ex => ex.niveles.includes(nivel))
}
