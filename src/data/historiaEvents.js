// Eventos históricos para el modo examen de Tuthor
// Cada evento: { id, nombre, descripcion, año, dificultad, categoria }

export const EVENTOS_HISTORIA = [

  // ── SEGUNDA GUERRA MUNDIAL ────────────────────────────────────────────────
  { id: 'wwii_01', nombre: "Inicio de la Segunda Guerra Mundial",   año: 1939,             descripcion: "Alemania invade Polonia. Reino Unido y Francia declaran la guerra.",  dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_02', nombre: "Evacuación de Dunkerque",               año: 1940, mes:  5,    descripcion: "330.000 soldados aliados evacuados bajo fuego nazi.",                  dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_03', nombre: "Batalla de Gran Bretaña",               año: 1940, mes:  7,    descripcion: "La RAF defiende los cielos británicos de la Luftwaffe.",               dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_04', nombre: "Operación Barbarroja",                  año: 1941, mes:  6,    descripcion: "Alemania invade la Unión Soviética con 3 millones de soldados.",       dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_05', nombre: "Ataque a Pearl Harbor",                 año: 1941, mes: 12,    descripcion: "Japón ataca la base naval americana. EEUU entra en la guerra.",        dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_06', nombre: "Batalla de Stalingrado",                año: 1942,             descripcion: "El punto de inflexión del frente oriental. Derrota nazi decisiva.",    dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_07', nombre: "Desembarco de Normandía (Día D)",       año: 1944, mes:  6,    descripcion: "La mayor operación anfibia de la historia en las playas francesas.",   dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_08', nombre: "Liberación de París",                   año: 1944, mes:  8,    descripcion: "Las tropas aliadas y la Resistencia liberan la capital francesa.",     dificultad: "medio",   categoria: "wwii" },
  { id: 'wwii_09', nombre: "Batalla de las Ardenas",                año: 1944, mes: 12,    descripcion: "La última gran ofensiva alemana en el frente occidental.",             dificultad: "difícil", categoria: "wwii" },
  { id: 'wwii_12', nombre: "Conferencia de Yalta",                  año: 1945, mes:  2,    descripcion: "Churchill, Roosevelt y Stalin dividen el mundo de posguerra.",         dificultad: "difícil", categoria: "wwii" },
  { id: 'wwii_10', nombre: "Rendición de Alemania",                 año: 1945, mes:  5,    descripcion: "Firma del armisticio. Fin de la guerra en Europa.",                    dificultad: "fácil",   categoria: "wwii" },
  { id: 'wwii_11', nombre: "Bombas atómicas sobre Japón",           año: 1945, mes:  8,    descripcion: "Hiroshima y Nagasaki. El fin de la guerra en el Pacífico.",            dificultad: "fácil",   categoria: "wwii" },

  // ── GUERRA CIVIL ESPAÑOLA ─────────────────────────────────────────────────
  { id: 'gce_01', nombre: "Segunda República Española",             año: 1931,             descripcion: "Alfonso XIII parte al exilio. España se convierte en República.",      dificultad: "medio",   categoria: "gce" },
  { id: 'gce_02', nombre: "Revolución de Asturias",                 año: 1934,             descripcion: "Mineros asturianos se levantan. El ejército reprime duramente.",        dificultad: "difícil", categoria: "gce" },
  { id: 'gce_03', nombre: "Victoria del Frente Popular",            año: 1936, mes:  2,    descripcion: "La coalición de izquierdas gana las elecciones generales.",             dificultad: "medio",   categoria: "gce" },
  { id: 'gce_04', nombre: "Inicio de la Guerra Civil Española",     año: 1936, mes:  7,    descripcion: "El golpe de estado de Franco inicia tres años de guerra fratricida.",  dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_05', nombre: "Bombardeo de Guernica",                  año: 1937,             descripcion: "La Legión Cóndor nazi arrasa la ciudad vasca. Picasso lo inmortaliza.", dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_06', nombre: "Batalla del Ebro",                       año: 1938,             descripcion: "La mayor batalla de la guerra civil. Derrota republicana definitiva.", dificultad: "medio",   categoria: "gce" },
  { id: 'gce_07', nombre: "Caída de Barcelona",                     año: 1939, mes:  1,    descripcion: "Las tropas franquistas entran en Cataluña. El exilio masivo comienza.", dificultad: "fácil",   categoria: "gce" },
  { id: 'gce_08', nombre: "Fin de la Guerra Civil Española",        año: 1939, mes:  4,    descripcion: "Franco proclama el final de la guerra. Comienza la dictadura.",        dificultad: "fácil",   categoria: "gce" },
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

  // ── EVENTOS GLOBALES (para Línea Temporal) ────────────────────────────────
  { id: 'glob_01', nombre: "Invasión árabe de la Península Ibérica",  año:  711, descripcion: "Los musulmanes cruzan el Estrecho de Gibraltar y conquistan casi toda España.", dificultad: "medio",   categoria: "global" },
  { id: 'glob_02', nombre: "Coronación de Carlomagno",                año:  800, descripcion: "El papa León III corona a Carlomagno como emperador de Occidente en Roma.",      dificultad: "medio",   categoria: "global" },
  { id: 'glob_03', nombre: "Batalla de Hastings",                     año: 1066, descripcion: "Guillermo el Conquistador derrota al rey Harold. Nace la Inglaterra medieval.",  dificultad: "medio",   categoria: "global" },
  { id: 'glob_04', nombre: "Primera Cruzada",                         año: 1096, descripcion: "El papa Urbano II convoca a los cristianos a liberar Jerusalén.",                dificultad: "difícil", categoria: "global" },
  { id: 'glob_05', nombre: "Magna Carta",                             año: 1215, descripcion: "El rey Juan sin Tierra firma la primera carta de derechos de la historia.",      dificultad: "medio",   categoria: "global" },
  { id: 'glob_06', nombre: "Peste Negra en Europa",                   año: 1347, descripcion: "La pandemia de peste bubónica mata a un tercio de la población europea.",        dificultad: "fácil",   categoria: "global" },
  { id: 'glob_07', nombre: "Caída de Constantinopla",                 año: 1453, descripcion: "Los otomanos conquistan la capital del Imperio Bizantino. Fin de la Edad Media.", dificultad: "fácil",  categoria: "global" },
  { id: 'glob_08', nombre: "Reforma Protestante",                     año: 1517, descripcion: "Lutero clava sus 95 tesis. Europa se divide entre católicos y protestantes.",    dificultad: "medio",   categoria: "global" },
  { id: 'glob_09', nombre: "Revolución Inglesa (Gloriosa)",           año: 1688, descripcion: "El parlamento inglés limita el poder del rey. Nace la democracia moderna.",      dificultad: "difícil", categoria: "global" },
  { id: 'glob_10', nombre: "Revolución Americana",                    año: 1776, descripcion: "Las colonias americanas se declaran independientes de Gran Bretaña.",            dificultad: "fácil",   categoria: "global" },
  { id: 'glob_11', nombre: "Revolución Francesa",                     año: 1789, descripcion: "El pueblo toma la Bastilla. Fin del Antiguo Régimen en Francia.",               dificultad: "fácil",   categoria: "global" },
  { id: 'glob_12', nombre: "Batalla de Waterloo",                     año: 1815, descripcion: "Napoleón sufre su derrota definitiva. Fin del Imperio napoleónico.",             dificultad: "fácil",   categoria: "global" },
  { id: 'glob_13', nombre: "Abolición de la esclavitud en EEUU",      año: 1865, descripcion: "La Guerra Civil americana termina. Lincoln promulga la 13ª enmienda.",          dificultad: "fácil",   categoria: "global" },
  { id: 'glob_14', nombre: "Revolución Rusa",                         año: 1917, descripcion: "Los bolcheviques toman el poder. Nace la Unión Soviética.",                      dificultad: "fácil",   categoria: "global" },
  { id: 'glob_15', nombre: "Gran Depresión",                          año: 1929, descripcion: "El crack de Wall Street hunde la economía mundial durante una década.",          dificultad: "fácil",   categoria: "global" },
  { id: 'glob_16', nombre: "Creación de la ONU",                      año: 1945, descripcion: "Tras la Segunda Guerra Mundial, 51 países fundan la Organización de Naciones Unidas.", dificultad: "medio", categoria: "global" },
  { id: 'glob_17', nombre: "Declaración Universal de los DDHH",       año: 1948, descripcion: "La ONU proclama los derechos fundamentales de todos los seres humanos.",        dificultad: "medio",   categoria: "global" },
  { id: 'glob_18', nombre: "Sputnik, primer satélite artificial",     año: 1957, descripcion: "La URSS lanza el primer objeto fabricado por el hombre al espacio.",            dificultad: "medio",   categoria: "global" },
  { id: 'glob_19', nombre: "Llegada del hombre a la Luna",            año: 1969, descripcion: "Neil Armstrong da el primer paso humano fuera de la Tierra.",                   dificultad: "fácil",   categoria: "global" },
  { id: 'glob_20', nombre: "Caída del Muro de Berlín",                año: 1989, descripcion: "Alemania se reúne. Comienza el fin de la Guerra Fría.",                         dificultad: "fácil",   categoria: "global" },
  { id: 'glob_21', nombre: "Disolución de la Unión Soviética",        año: 1991, descripcion: "El bloque comunista se desintegra. Fin de la Guerra Fría.",                      dificultad: "medio",   categoria: "global" },
  { id: 'glob_22', nombre: "Atentados del 11 de septiembre",          año: 2001, descripcion: "Al-Qaeda derriba las Torres Gemelas. El mundo cambia para siempre.",            dificultad: "fácil",   categoria: "global" },
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

// Valor de ordenación: año * 100 + mes (0 si no hay mes).
// Permite desempatar eventos del mismo año cuando ambos tienen mes conocido.
export function sortValue(e) {
  return e.año * 100 + (e.mes ?? 0)
}

// Posición correcta donde insertar `card` en la línea temporal `tl` (ya ordenada).
// Usa mes como desempate si ambos eventos lo tienen; si no, empata por año.
export function getCorrectPos(card, tl) {
  const cardVal = sortValue(card)
  const idx = tl.findIndex(e => {
    if (e.año === card.año && (e.mes == null || card.mes == null)) return false
    return sortValue(e) > cardVal
  })
  return idx === -1 ? tl.length : idx
}

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

// Devuelve eventos únicos por año para Línea Temporal (sin años repetidos)
// Prefiere categorías con descripciones ricas sobre 'primaria'
export function getEventosLineaTemporal() {
  const byYear = new Map()
  for (const e of EVENTOS_HISTORIA) {
    const existing = byYear.get(e.año)
    if (!existing || existing.categoria === 'primaria') {
      byYear.set(e.año, e)
    }
  }
  return [...byYear.values()].sort(() => Math.random() - 0.5)
}

// Ordena un array de eventos por año+mes para inicializar la línea temporal.
export function sortEventos(eventos) {
  return [...eventos].sort((a, b) => sortValue(a) - sortValue(b))
}

// Hash determinista de un string → número entero positivo.
function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

// Genera 3 años incorrectos plausibles para un evento dado.
// Los offsets son deterministas (basados en el id) para que la pregunta
// sea siempre la misma el mismo día.
function wrongYears(evento) {
  const base = hashStr(evento.id)
  const rango = Math.max(10, Math.abs(evento.año) > 500 ? 200 : 15)
  const pool = []
  let seed = base
  while (pool.length < 3) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const offset = (seed % rango) + 1
    const signed = seed % 2 === 0 ? offset : -offset
    const candidate = evento.año + signed
    if (!pool.includes(candidate) && candidate !== evento.año) pool.push(candidate)
  }
  return pool
}

// Convierte eventos históricos en preguntas de opción múltiple del formato
// PREGUNTAS_DIARIAS para que el banco diario incluya todos los eventos.
export function eventosToPreguntas(eventos) {
  return eventos.map(e => {
    const wrongOpts = wrongYears(e)
    const opciones = [e.año, ...wrongOpts]
      .sort(() => {
        // Orden determinista usando hash del id para que las opciones
        // no cambien entre renders
        const h = hashStr(e.id + String(e.año))
        return ((h >>> 0) % 3) - 1
      })
      .map(y => y < 0 ? `${Math.abs(y)} a.C.` : String(y))
    const correctaStr = e.año < 0 ? `${Math.abs(e.año)} a.C.` : String(e.año)
    return {
      id: `auto_${e.id}`,
      pregunta: `¿En qué año ocurrió: "${e.nombre}"?`,
      opciones,
      correcta: correctaStr,
      categoria: `Historia · ${e.dificultad === 'fácil' ? 'Primaria' : e.dificultad === 'medio' ? 'ESO' : 'Bachillerato'}`,
      explicacion: e.descripcion,
    }
  })
}
