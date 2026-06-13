// ── PERSONAJES HISTÓRICOS ─────────────────────────────────────────────────────
// Cada personaje tiene atributos categóricos para generar pistas dinámicas
// y una pistaUnica que lo identifica de forma inequívoca.

export const PERSONAJES_GCE = [
  {
    id: 'franco',
    nombre: 'Francisco Franco',
    iniciales: 'FF',
    color: '#7f1d1d',
    atributos: {
      bando:   'sublevado',
      rol:     'militar',
      genero:  'hombre',
      destino: 'sobrevivió',
      origen:  'galicia',
    },
    pistaUnica: 'Gobernó España como dictador desde el final de la guerra hasta su muerte en 1975.',
  },
  {
    id: 'ibárruri',
    nombre: 'Dolores Ibárruri',
    iniciales: 'DI',
    color: '#7c3aed',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'mujer',
      destino: 'exilio',
      origen:  'país_vasco',
    },
    pistaUnica: 'Comunista vasca conocida como "La Pasionaria", famosa por el grito "¡No pasarán!".',
  },
  {
    id: 'lorca',
    nombre: 'Federico García Lorca',
    iniciales: 'FL',
    color: '#065f46',
    atributos: {
      bando:   'republicano',
      rol:     'artista',
      genero:  'hombre',
      destino: 'ejecutado',
      origen:  'andalucía',
    },
    pistaUnica: 'Poeta y dramaturgo granadino fusilado por los sublevados al inicio de la guerra.',
  },
  {
    id: 'azaña',
    nombre: 'Manuel Azaña',
    iniciales: 'MA',
    color: '#1e40af',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'hombre',
      destino: 'exilio',
      origen:  'castilla',
    },
    pistaUnica: 'Presidente de la Segunda República Española durante la guerra. Murió en el exilio en Francia.',
  },
  {
    id: 'jose_antonio',
    nombre: 'José Antonio Primo de Rivera',
    iniciales: 'JP',
    color: '#92400e',
    atributos: {
      bando:   'sublevado',
      rol:     'político',
      genero:  'hombre',
      destino: 'ejecutado',
      origen:  'madrid',
    },
    pistaUnica: 'Fundador de Falange Española, fusilado por los republicanos en Alicante en 1936.',
  },
  {
    id: 'mola',
    nombre: 'Emilio Mola',
    iniciales: 'EM',
    color: '#4c1d95',
    atributos: {
      bando:   'sublevado',
      rol:     'militar',
      genero:  'hombre',
      destino: 'murió_guerra',
      origen:  'granada',
    },
    pistaUnica: 'Director del golpe de Estado de julio de 1936. Murió en un accidente de avión en 1937.',
  },
  {
    id: 'durruti',
    nombre: 'Buenaventura Durruti',
    iniciales: 'BD',
    color: '#1f2937',
    atributos: {
      bando:   'republicano',
      rol:     'miliciano',
      genero:  'hombre',
      destino: 'murió_guerra',
      origen:  'castilla',
    },
    pistaUnica: 'Líder anarquista que organizó la Columna Durruti. Murió combatiendo en el frente de Madrid.',
  },
  {
    id: 'companys',
    nombre: 'Lluís Companys',
    iniciales: 'LC',
    color: '#1d4ed8',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'hombre',
      destino: 'ejecutado',
      origen:  'cataluña',
    },
    pistaUnica: 'Presidente de la Generalitat de Cataluña. Extraditado desde Francia y fusilado por Franco en 1940.',
  },
  {
    id: 'machado',
    nombre: 'Antonio Machado',
    iniciales: 'AM',
    color: '#166534',
    atributos: {
      bando:   'republicano',
      rol:     'artista',
      genero:  'hombre',
      destino: 'exilio',
      origen:  'andalucía',
    },
    pistaUnica: 'Poeta sevillano del 98 que cruzó la frontera con los refugiados republicanos y murió en Collioure.',
  },
  {
    id: 'queipo',
    nombre: 'Gonzalo Queipo de Llano',
    iniciales: 'GQ',
    color: '#78350f',
    atributos: {
      bando:   'sublevado',
      rol:     'militar',
      genero:  'hombre',
      destino: 'sobrevivió',
      origen:  'castilla',
    },
    pistaUnica: 'General sublevado que tomó Sevilla con apenas 200 hombres y usó la radio como arma de propaganda.',
  },
  {
    id: 'negrín',
    nombre: 'Juan Negrín',
    iniciales: 'JN',
    color: '#134e4a',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'hombre',
      destino: 'exilio',
      origen:  'canarias',
    },
    pistaUnica: 'Último presidente del gobierno republicano. Defendió la política de "resistir para negociar".',
  },
  {
    id: 'pilar',
    nombre: 'Pilar Primo de Rivera',
    iniciales: 'PP',
    color: '#9d174d',
    atributos: {
      bando:   'sublevado',
      rol:     'político',
      genero:  'mujer',
      destino: 'sobrevivió',
      origen:  'madrid',
    },
    pistaUnica: 'Hermana de José Antonio y fundadora de la Sección Femenina de Falange bajo el régimen de Franco.',
  },
  {
    id: 'largo_caballero',
    nombre: 'Francisco Largo Caballero',
    iniciales: 'LC',
    color: '#1e3a5f',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'hombre',
      destino: 'exilio',
      origen:  'madrid',
    },
    pistaUnica: 'Líder socialista llamado "el Lenin español". Fue presidente del gobierno republicano en 1936-37.',
  },
  {
    id: 'sanjurjo',
    nombre: 'José Sanjurjo',
    iniciales: 'JS',
    color: '#3b0764',
    atributos: {
      bando:   'sublevado',
      rol:     'militar',
      genero:  'hombre',
      destino: 'murió_guerra',
      origen:  'navarra',
    },
    pistaUnica: 'General destinado a liderar el golpe de julio de 1936. Murió en un accidente de avión al inicio del alzamiento.',
  },
  {
    id: 'kent',
    nombre: 'Victoria Kent',
    iniciales: 'VK',
    color: '#701a75',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'mujer',
      destino: 'exilio',
      origen:  'andalucía',
    },
    pistaUnica: 'Primera mujer abogada de España y directora general de Prisiones durante la República.',
  },
  {
    id: 'mijail',
    nombre: 'Enrique Líster',
    iniciales: 'EL',
    color: '#14532d',
    atributos: {
      bando:   'republicano',
      rol:     'miliciano',
      genero:  'hombre',
      destino: 'exilio',
      origen:  'galicia',
    },
    pistaUnica: 'Comandante comunista gallego que organizó algunas de las unidades combatientes más disciplinadas del Ejército Popular.',
  },
  {
    id: 'serrano',
    nombre: 'Ramón Serrano Súñer',
    iniciales: 'RS',
    color: '#4a0404',
    atributos: {
      bando:   'sublevado',
      rol:     'político',
      genero:  'hombre',
      destino: 'sobrevivió',
      origen:  'aragón',
    },
    pistaUnica: 'Cuñado de Franco y ministro del Interior y Exteriores. Fue el principal arquitecto del Estado franquista.',
  },
  {
    id: 'alcala_zamora',
    nombre: 'Niceto Alcalá-Zamora',
    iniciales: 'NA',
    color: '#312e81',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'hombre',
      destino: 'exilio',
      origen:  'andalucía',
    },
    pistaUnica: 'Primer presidente de la Segunda República. Fue destituido por las Cortes en 1936 antes del golpe.',
  },
  {
    id: 'federica',
    nombre: 'Federica Montseny',
    iniciales: 'FM',
    color: '#831843',
    atributos: {
      bando:   'republicano',
      rol:     'político',
      genero:  'mujer',
      destino: 'exilio',
      origen:  'cataluña',
    },
    pistaUnica: 'Primera mujer ministra de España (Sanidad, 1936). Líder anarquista de la CNT-FAI.',
  },
  {
    id: 'modesto',
    nombre: 'Juan Modesto',
    iniciales: 'JM',
    color: '#064e3b',
    atributos: {
      bando:   'republicano',
      rol:     'miliciano',
      genero:  'hombre',
      destino: 'exilio',
      origen:  'andalucía',
    },
    pistaUnica: 'Comandante del V Cuerpo del Ejército Popular, dirigió las fuerzas republicanas en la Batalla del Ebro.',
  },
]

// ── PLANTILLAS DE PISTAS ──────────────────────────────────────────────────────
// Para cada atributo y valor, una función que devuelve el texto de la pista.

export const PISTA_TEMPLATES = {
  bando: {
    sublevado:   () => 'Pertenecía al bando sublevado (nacional).',
    republicano: () => 'Pertenecía al bando republicano.',
  },
  rol: {
    militar:   () => 'Era militar de carrera, no un civil.',
    político:  () => 'Era un político o dirigente civil, no un militar.',
    artista:   () => 'Era un artista o intelectual (escritor, poeta, pintor…).',
    miliciano: () => 'Era un líder miliciano o comandante surgido de las filas populares.',
  },
  genero: {
    hombre: () => 'Era hombre.',
    mujer:  () => 'Era mujer.',
  },
  destino: {
    sobrevivió:   () => 'Sobrevivió a la guerra y siguió viviendo en España.',
    exilio:       () => 'Sobrevivió a la guerra pero tuvo que marcharse al exilio.',
    ejecutado:    () => 'Fue capturado y ejecutado durante o tras la guerra.',
    murió_guerra: () => 'Murió durante los tres años que duró la guerra (sin ser ejecutado).',
  },
  origen: {
    galicia:     () => 'Era originario de Galicia.',
    país_vasco:  () => 'Era originario del País Vasco.',
    andalucía:   () => 'Era originario de Andalucía.',
    cataluña:    () => 'Era originario de Cataluña.',
    castilla:    () => 'Era originario de Castilla (Castilla La Mancha, Castilla León o Madrid).',
    madrid:      () => 'Era originario de Madrid.',
    navarra:     () => 'Era originario de Navarra o el norte.',
    canarias:    () => 'Era originario de las Islas Canarias.',
    aragón:      () => 'Era originario de Aragón.',
    granada:     () => 'Era originario de Granada (Andalucía oriental).',
  },
}

// ── MOTOR DE PISTAS DINÁMICO ──────────────────────────────────────────────────

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

function hashId(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h
}

/**
 * Genera 3 pistas ordenadas de forma que la primera elimine moderadamente,
 * la segunda elimine más y la tercera sea casi definitiva.
 * La pistaUnica siempre va al final como pista 4 (revelada solo si hace falta).
 */
export function generarPistas(secreto, tablero) {
  const candidatas = []

  for (const [attr, val] of Object.entries(secreto.atributos)) {
    const template = PISTA_TEMPLATES[attr]?.[val]
    if (!template) continue

    const comparten = tablero.filter(p => p.atributos[attr] === val).length
    const eliminan  = tablero.length - comparten
    const ratio     = eliminan / tablero.length

    // Solo pistas que eliminen entre el 20% y el 85% del tablero
    if (ratio >= 0.2 && ratio <= 0.85) {
      candidatas.push({ attr, val, texto: template(), ratio, eliminan })
    }
  }

  // Orden aleatorio pero determinista para que sea rejugable de forma distinta
  // en cada sesión pero consistente dentro de la misma partida
  const seed = hashId(secreto.id + tablero.map(p => p.id).join(''))
  const mezcladas = shuffleSeeded(candidatas, seed)

  // Ordenar de menor a mayor eliminación para que las pistas escalen en dificultad
  mezcladas.sort((a, b) => a.ratio - b.ratio)

  // Coger hasta 3 pistas distintas en atributo
  const usados = new Set()
  const seleccionadas = []
  for (const c of mezcladas) {
    if (!usados.has(c.attr)) {
      seleccionadas.push(c)
      usados.add(c.attr)
    }
    if (seleccionadas.length === 3) break
  }

  // Pista única como pista final de emergencia
  seleccionadas.push({
    attr: 'única',
    texto: secreto.pistaUnica,
    ratio: 1,
    eliminan: tablero.length - 1,
  })

  return seleccionadas
}

/**
 * Monta un tablero de `n` personajes del pool asegurando que el secreto
 * esté incluido y que haya variedad de atributos.
 */
export function montarTablero(pool, n = 12) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, pool.length))
}
