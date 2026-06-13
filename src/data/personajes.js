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
    pistaUnica: 'Gobernó España como dictador desde el final de la guerra hasta su muerte en 1975.' },
  { id: 'ibárruri',        nombre: 'Dolores Ibárruri',              iniciales: 'DI', color: '#7c3aed', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Comunista vasca conocida como "La Pasionaria", famosa por el grito "¡No pasarán!".' },
  { id: 'lorca',           nombre: 'Federico García Lorca',         iniciales: 'FL', color: '#065f46', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'artista',        genero: 'hombre', destino: 'ejecutado',     pais: 'españa' },
    pistaUnica: 'Poeta y dramaturgo granadino fusilado por los sublevados al inicio de la guerra.' },
  { id: 'azaña',           nombre: 'Manuel Azaña',                  iniciales: 'MA', color: '#1e40af', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Presidente de la Segunda República durante la guerra. Murió en el exilio en Francia.' },
  { id: 'jose_antonio',    nombre: 'José Antonio Primo de Rivera',  iniciales: 'JP', color: '#92400e', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'ejecutado',     pais: 'españa' },
    pistaUnica: 'Fundador de Falange Española, fusilado por los republicanos en Alicante en 1936.' },
  { id: 'mola',            nombre: 'Emilio Mola',                   iniciales: 'EM', color: '#4c1d95', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'militar',        genero: 'hombre', destino: 'murió_conflicto', pais: 'españa' },
    pistaUnica: 'Director del golpe de Estado de julio de 1936. Murió en un accidente de avión en 1937.' },
  { id: 'durruti',         nombre: 'Buenaventura Durruti',          iniciales: 'BD', color: '#1f2937', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'revolucionario', genero: 'hombre', destino: 'murió_conflicto', pais: 'españa' },
    pistaUnica: 'Líder anarquista que organizó la Columna Durruti. Murió combatiendo en el frente de Madrid.' },
  { id: 'companys',        nombre: 'Lluís Companys',                iniciales: 'LC', color: '#1d4ed8', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'ejecutado',     pais: 'españa' },
    pistaUnica: 'Presidente de la Generalitat de Cataluña, extraditado desde Francia y fusilado por Franco en 1940.' },
  { id: 'machado',         nombre: 'Antonio Machado',               iniciales: 'AM', color: '#166534', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'artista',        genero: 'hombre', destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Poeta sevillano del 98 que cruzó la frontera con los refugiados republicanos y murió en Collioure.' },
  { id: 'queipo',          nombre: 'Gonzalo Queipo de Llano',       iniciales: 'GQ', color: '#78350f', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'militar',        genero: 'hombre', destino: 'sobrevivió',    pais: 'españa' },
    pistaUnica: 'General sublevado que tomó Sevilla con 200 hombres y usó la radio como arma de propaganda.' },
  { id: 'negrín',          nombre: 'Juan Negrín',                   iniciales: 'JN', color: '#134e4a', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'hombre', destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Último presidente del gobierno republicano. Defendió la política de "resistir para negociar".' },
  { id: 'pilar',           nombre: 'Pilar Primo de Rivera',         iniciales: 'PP', color: '#9d174d', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'sobrevivió',    pais: 'españa' },
    pistaUnica: 'Hermana de José Antonio y fundadora de la Sección Femenina de Falange bajo el franquismo.' },
  { id: 'federica',        nombre: 'Federica Montseny',             iniciales: 'FM', color: '#831843', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Primera mujer ministra de España (Sanidad, 1936). Líder anarquista de la CNT-FAI.' },
  { id: 'kent',            nombre: 'Victoria Kent',                 iniciales: 'VK', color: '#701a75', categoria: 'gce',
    atributos: { epoca: 'siglo_xx', rol: 'político',       genero: 'mujer',  destino: 'exilio',        pais: 'españa' },
    pistaUnica: 'Primera mujer abogada de España y directora general de Prisiones durante la República.' },
]

// ── SEGUNDA GUERRA MUNDIAL ─────────────────────────────────────────────────────
export const PERSONAJES_WWII = [
  { id: 'hitler',      nombre: 'Adolf Hitler',           iniciales: 'AH', color: '#450a0a', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'murió_conflicto', pais: 'alemania' },
    pistaUnica: 'Dictador alemán que desencadenó la Segunda Guerra Mundial y ordenó el Holocausto.' },
  { id: 'churchill',   nombre: 'Winston Churchill',      iniciales: 'WC', color: '#1e3a5f', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'sobrevivió',      pais: 'uk' },
    pistaUnica: 'Primer ministro británico que lideró la resistencia aliada con sus célebres discursos.' },
  { id: 'roosevelt',   nombre: 'Franklin D. Roosevelt',  iniciales: 'FR', color: '#1e40af', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'murió_conflicto', pais: 'eeuu' },
    pistaUnica: 'Presidente de EEUU que llevó al país a la guerra. Murió antes de ver la victoria, en abril de 1945.' },
  { id: 'stalin',      nombre: 'Iósif Stalin',           iniciales: 'IS', color: '#14532d', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'sobrevivió',      pais: 'urss' },
    pistaUnica: 'Dictador soviético que transformó la URSS en potencia industrial y venció en el frente del Este.' },
  { id: 'mussolini',   nombre: 'Benito Mussolini',        iniciales: 'BM', color: '#713f12', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'ejecutado',       pais: 'italia' },
    pistaUnica: 'Fundador del fascismo italiano, aliado de Hitler. Fue capturado y fusilado en 1945.' },
  { id: 'rommel',      nombre: 'Erwin Rommel',            iniciales: 'ER', color: '#3b0764', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'ejecutado',       pais: 'alemania' },
    pistaUnica: 'El "Zorro del Desierto", general alemán imbatible en el norte de África. Obligado a suicidarse por Hitler.' },
  { id: 'eisenhower',  nombre: 'Dwight Eisenhower',       iniciales: 'DE', color: '#164e63', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu' },
    pistaUnica: 'Comandante supremo aliado que organizó el Desembarco de Normandía. Luego fue presidente de EEUU.' },
  { id: 'anne_frank',  nombre: 'Anne Frank',              iniciales: 'AF', color: '#7f1d1d', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'víctima',    genero: 'mujer',  destino: 'ejecutado',       pais: 'alemania' },
    pistaUnica: 'Niña judía alemana que se ocultó en Ámsterdam y escribió su diario. Murió en Bergen-Belsen.' },
  { id: 'de_gaulle',   nombre: 'Charles de Gaulle',       iniciales: 'CG', color: '#1e3a8a', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'francia' },
    pistaUnica: 'Líder de la Francia Libre desde Londres. Encabezó la liberación de París en 1944.' },
  { id: 'himmler',     nombre: 'Heinrich Himmler',        iniciales: 'HH', color: '#422006', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'político',   genero: 'hombre', destino: 'murió_conflicto', pais: 'alemania' },
    pistaUnica: 'Jefe de las SS y arquitecto del Holocausto. Se suicidó tras ser capturado en 1945.' },
  { id: 'montgomery',  nombre: 'Bernard Montgomery',      iniciales: 'BM', color: '#0c4a6e', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'uk' },
    pistaUnica: 'General británico que venció a Rommel en El Alamein, el primer gran giro aliado en la guerra.' },
  { id: 'curie_irene', nombre: 'Irène Joliot-Curie',      iniciales: 'IC', color: '#4a044e', categoria: 'wwii',
    atributos: { epoca: 'siglo_xx', rol: 'científico', genero: 'mujer',  destino: 'sobrevivió',      pais: 'francia' },
    pistaUnica: 'Hija de Marie Curie y Premio Nobel de Química 1935. Vivió la ocupación nazi en Francia.' },
]

// ── PERSONAJES GLOBALES (mezcla de épocas) ─────────────────────────────────────
export const PERSONAJES_GLOBAL = [
  { id: 'napoleon',    nombre: 'Napoleón Bonaparte',     iniciales: 'NB', color: '#1c1917', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'militar',    genero: 'hombre', destino: 'exilio',          pais: 'francia' },
    pistaUnica: 'Emperador de los franceses que conquistó Europa y fue derrotado definitivamente en Waterloo.' },
  { id: 'robespierre', nombre: 'Maximilien Robespierre', iniciales: 'MR', color: '#7f1d1d', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'político',   genero: 'hombre', destino: 'ejecutado',       pais: 'francia' },
    pistaUnica: 'Líder del Comité de Salvación Pública durante el Terror. Guillotinado por sus propios aliados.' },
  { id: 'cesar',       nombre: 'Julio César',            iniciales: 'JC', color: '#92400e', categoria: 'global',
    atributos: { epoca: 'antiguedad', rol: 'militar',   genero: 'hombre', destino: 'ejecutado',       pais: 'roma' },
    pistaUnica: 'General romano que cruzó el Rubicón y conquistó las Galias. Asesinado en los idus de marzo.' },
  { id: 'cleopatra',   nombre: 'Cleopatra VII',          iniciales: 'CL', color: '#b45309', categoria: 'global',
    atributos: { epoca: 'antiguedad', rol: 'político',  genero: 'mujer',  destino: 'murió_conflicto', pais: 'egipto' },
    pistaUnica: 'Última faraona del Egipto ptolemaico. Se alió con César y Marco Antonio para defender su reino.' },
  { id: 'alejandro',   nombre: 'Alejandro Magno',        iniciales: 'AM', color: '#1e3a8a', categoria: 'global',
    atributos: { epoca: 'antiguedad', rol: 'militar',   genero: 'hombre', destino: 'murió_conflicto', pais: 'grecia' },
    pistaUnica: 'Rey macedonio que conquistó el mayor imperio de la Antigüedad, desde Grecia hasta la India.' },
  { id: 'washington',  nombre: 'George Washington',      iniciales: 'GW', color: '#14532d', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'militar',    genero: 'hombre', destino: 'sobrevivió',      pais: 'eeuu' },
    pistaUnica: 'Comandante del ejército revolucionario y primer presidente de los Estados Unidos.' },
  { id: 'marie_curie', nombre: 'Marie Curie',            iniciales: 'MC', color: '#4a044e', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'científico',  genero: 'mujer',  destino: 'sobrevivió',      pais: 'francia' },
    pistaUnica: 'Primera persona en ganar dos Premios Nobel (Física y Química). Descubrió el radio y el polonio.' },
  { id: 'lincoln',     nombre: 'Abraham Lincoln',        iniciales: 'AL', color: '#1e3a5f', categoria: 'global',
    atributos: { epoca: 'siglo_xix', rol: 'político',   genero: 'hombre', destino: 'ejecutado',       pais: 'eeuu' },
    pistaUnica: 'Presidente que abolió la esclavitud en EEUU. Fue asesinado en un teatro en Washington en 1865.' },
  { id: 'lenin',       nombre: 'Vladímir Lenin',         iniciales: 'VL', color: '#7f1d1d', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'revolucionario', genero: 'hombre', destino: 'sobrevivió',   pais: 'urss' },
    pistaUnica: 'Líder de la Revolución Bolchevique de 1917 y fundador de la Unión Soviética.' },
  { id: 'gandhi',      nombre: 'Mahatma Gandhi',         iniciales: 'MG', color: '#78350f', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'revolucionario', genero: 'hombre', destino: 'ejecutado',    pais: 'india' },
    pistaUnica: 'Líder de la independencia india a través de la resistencia no violenta. Asesinado en 1948.' },
  { id: 'eleonor',     nombre: 'Eleanor Roosevelt',      iniciales: 'ER', color: '#134e4a', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'político',    genero: 'mujer',  destino: 'sobrevivió',      pais: 'eeuu' },
    pistaUnica: 'Primera dama de EEUU y arquitecta de la Declaración Universal de los Derechos Humanos de 1948.' },
  { id: 'mandela',     nombre: 'Nelson Mandela',         iniciales: 'NM', color: '#1f2937', categoria: 'global',
    atributos: { epoca: 'siglo_xx', rol: 'político',    genero: 'hombre', destino: 'sobrevivió',      pais: 'sudafrica' },
    pistaUnica: 'Estuvo 27 años encarcelado bajo el apartheid. Fue el primer presidente negro de Sudáfrica.' },
]

// Pool combinado para el modo global
export const PERSONAJES_TODOS = [
  ...PERSONAJES_GCE,
  ...PERSONAJES_WWII,
  ...PERSONAJES_GLOBAL,
]

// ── PLANTILLAS DE PISTAS ──────────────────────────────────────────────────────
export const PISTA_TEMPLATES = {
  epoca: {
    antiguedad:  () => 'Vivió en la Antigüedad (antes del año 500 d.C.).',
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

// ── PLANTILLAS DE PISTAS NEGATIVAS ───────────────────────────────────────────
const PISTA_NEG_TEMPLATES = {
  epoca: {
    antiguedad:  () => 'No vivió en la Antigüedad: su historia es más reciente.',
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

export function generarPistas(secreto, tablero) {
  const seed = hashId(secreto.id + tablero.map(p => p.id).join(''))

  // ── Pistas positivas (lo que SÍ es) ────────────────────────────────────────
  const positivas = []
  for (const [attr, val] of Object.entries(secreto.atributos)) {
    const template = PISTA_TEMPLATES[attr]?.[val]
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
  seleccionadas.push({ attr: 'única', texto: secreto.pistaUnica, ratio: 1, negativa: false })

  // ── Pistas negativas (lo que NO es) ────────────────────────────────────────
  // Busca valores que existen en el tablero pero el secreto NO tiene
  const negativas = []
  const attrsUsados = new Set(seleccionadas.map(c => c.attr))
  for (const attr of Object.keys(PISTA_NEG_TEMPLATES)) {
    const secretoVal = secreto.atributos[attr]
    // Valores distintos al secreto que aparecen en el tablero
    const valsEnTablero = [...new Set(tablero.map(p => p.atributos[attr]).filter(v => v && v !== secretoVal))]
    for (const val of valsEnTablero) {
      const template = PISTA_NEG_TEMPLATES[attr]?.[val]
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
