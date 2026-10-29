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

export const ELEMENTOS = [...RIOS.map(r => ({ ...r, clase: 'rio' })), ...MONTES.map(m => ({ ...m, clase: 'monte' }))]
export const elemento = id => ELEMENTOS.find(e => e.id === id)
export const nombre = (id, l) => tx(elemento(id).nombre, l)
const ORDEN = { facil: 0, medio: 1, dificil: 2 }
// Lo que se ve en el mapa en cada nivel
export const delNivel = nivel => ELEMENTOS.filter(e => ORDEN[e.nivel] <= ORDEN[nivel])

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
// El punto donde va el número o el nombre de cada elemento
export const medio = e => e.puntos[Math.floor(e.puntos.length / 2)]

let seq = 0
const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const visibles = delNivel(nivel)
  const rios = visibles.filter(e => e.clase === 'rio')
  for (let intento = 0; ; intento++) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }
    let r
    if (tipo === 'busca') {
      r = { ...base, objetivo: elige(rand, visibles).id }
    } else if (tipo === 'etiqueta') {
      // tres elementos (al menos un río y un sistema) y un nombre de más
      const tres = baraja(rand, visibles).slice(0, 3)
      if (!tres.some(e => e.clase === 'rio') || !tres.some(e => e.clase === 'monte')) continue
      // los tres números, bien separados en el mapa (no se pueden pisar)
      if (tres.some((a, i) => tres.some((b, j) => i < j && dist(medio(a), medio(b)) < 1.8))) continue
      const sobra = elige(rand, visibles.filter(e => !tres.includes(e)))
      r = { ...base, marcados: tres.map(e => e.id), fichas: baraja(rand, [...tres.map(e => e.id), sobra.id]) }
    } else if (tipo === 'vertiente') {
      const cuatro = baraja(rand, rios).slice(0, 4)
      // al menos dos vertientes distintas; la cantábrica solo si hay ríos cantábricos en el nivel
      if (new Set(cuatro.map(e => e.vertiente)).size < 2) continue
      r = { ...base, rios: cuatro.map(e => e.id), vertientes: Object.keys(VERTIENTES).filter(v => nivel !== 'facil' || v !== 'cantabrica') }
    } else {
      const que = elige(rand, ['nace', 'desemboca'])
      const pool = rios.filter(e => que === 'desemboca' || !e.naceDiscutido)
      const obj = elige(rand, pool)
      const punto = e => (que === 'nace' ? e.puntos[0] : e.puntos[e.puntos.length - 1])
      // tres puntos más, de otros ríos y separados (nada de tres nacimientos juntos)
      const otros = []
      for (const e of baraja(rand, pool.filter(x => x !== obj))) {
        if ([obj, ...otros].every(x => dist(punto(x), punto(e)) > 0.9)) otros.push(e)
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
    case 'vertiente': return s(l, '¿A qué mar va cada río? Toca un río y luego su vertiente', 'Which sea does each river flow into? Tap a river, then its drainage basin', 'A quin mar va cada riu? Toca un riu i després el seu vessant')
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
    case 'vertiente': return s(l,
      'Vertiente cantábrica: ríos cortos y caudalosos que bajan de la Cordillera Cantábrica. Atlántica: los grandes ríos de la Meseta (Miño, Duero, Tajo, Guadiana) y el Guadalquivir. Mediterránea: el Ebro y los ríos levantinos (Júcar, Turia, Segura).',
      'Cantabrian basin: short rivers with plenty of water coming down from the Cantabrian Mountains. Atlantic: the big rivers of the Meseta (Miño, Douro, Tagus, Guadiana) and the Guadalquivir. Mediterranean: the Ebro and the eastern rivers (Júcar, Turia, Segura).',
      'Vessant cantàbric: rius curts i cabalosos que baixen de la Serralada Cantàbrica. Atlàntic: els grans rius de la Meseta (Minho, Duero, Tajo, Guadiana) i el Guadalquivir. Mediterrani: l’Ebre i els rius de llevant (Xúquer, Túria, Segura).')
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
}

export function textoRespuesta(r, l) {
  switch (r.tipo) {
    case 'busca': return nombre(r.objetivo, l)
    case 'etiqueta': return r.marcados.map((id, i) => `${i + 1}: ${nombre(id, l)}`).join(', ')
    case 'vertiente': return r.rios.map(id => `${nombre(id, l)} → ${tx(VERTIENTES[elemento(id).vertiente], l)}`).join(', ')
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
    : r.tipo === 'etiqueta' ? s(l, 'Sitúa en el mapa de España estos ríos y sistemas montañosos', 'Place these rivers and mountain ranges on the map of Spain', 'Situa al mapa d’Espanya aquests rius i sistemes muntanyosos')
    : r.tipo === 'busca' ? s(l, `¿Dónde está ${nombre(r.objetivo, l)} en el mapa de España?`, `Where is ${nombre(r.objetivo, l)} on the map of Spain?`, `On és ${nombre(r.objetivo, l)} al mapa d’Espanya?`)
    : enunciado(r, l).replace(/ Toca el punto| Tap the point| Toca el punt/, '')
  const respuesta = r.tipo === 'busca' ? explicacion(r, l) : textoRespuesta(r, l)
  return { question: pregunta, correctAnswer: respuesta, wrongAnswers: [] }
}
