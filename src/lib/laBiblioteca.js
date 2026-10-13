// La Biblioteca (lengua · literatura española, ESO y Bachillerato). Solo castellano.
//
// Las obras de la literatura española que se estudian en el instituto, como
// libros de una estantería. Se pregunta:
//   autor   quién escribió la obra
//   genero  narrativo, lírico o dramático
//   epoca   el periodo o movimiento (de la Edad Media a la posguerra)
//   rasgo   qué movimiento se reconoce por estos rasgos
//   orden   cuál de cuatro obras es la más antigua
//
// Solo títulos, autores y fechas (datos), sin citar texto. Las obras cuya
// clasificación discuten los libros no salen en la pregunta que la necesita:
// el Quijote (1605, entre Renacimiento y Barroco) y Luces de bohemia
// (Valle-Inclán, ¿98 o modernismo?) no salen en «época»; el Libro de buen
// amor, que mezcla géneros, no sale en «género». La Celestina (obra de
// transición) se queda fuera.

export const EPOCAS = {
  'edad-media': { nombre: 'Edad Media (s. XII-XV)', rasgos: ['Obras muchas veces anónimas, en verso, transmitidas por juglares o escritas por clérigos con intención didáctica: cantares de gesta y cuentos con moraleja.'] },
  renacimiento: { nombre: 'Renacimiento (s. XVI)', rasgos: ['Imitación de los clásicos grecolatinos e italianos: llegan el soneto y el endecasílabo, la naturaleza idealizada y el amor platónico; también la mística.'] },
  barroco: { nombre: 'Barroco (s. XVII)', rasgos: ['Desengaño, paso del tiempo y contrastes; poesía culterana (Góngora) y conceptista (Quevedo), y la comedia nueva que llena los corrales de comedias.'] },
  neoclasicismo: { nombre: 'Neoclasicismo (s. XVIII)', rasgos: ['La razón y el buen gusto: la literatura debe enseñar, y el teatro respeta la regla de las tres unidades.'] },
  romanticismo: { nombre: 'Romanticismo (1.ª mitad del s. XIX)', rasgos: ['Libertad, sentimientos desbordados, el yo del autor, rebeldía y ambientes nocturnos y misteriosos.'] },
  realismo: { nombre: 'Realismo (2.ª mitad del s. XIX)', rasgos: ['Retrato fiel y objetivo de la sociedad de su tiempo, sobre todo la burguesía, en novelas largas con narrador omnisciente.'] },
  modernismo: { nombre: 'Modernismo (finales del s. XIX)', rasgos: ['La belleza por la belleza: musicalidad, colores, cisnes y princesas, ambientes exóticos. Su gran poeta es Rubén Darío.'] },
  g98: { nombre: 'Generación del 98', rasgos: ['Preocupación por España tras perder las últimas colonias, el paisaje de Castilla y un estilo sobrio y personal.'] },
  g27: { nombre: 'Generación del 27', rasgos: ['Poetas que unen tradición (romances, Góngora) y vanguardia, con metáforas audaces; casi todos eran amigos y muchos se exiliaron tras la guerra civil.'] },
  posguerra: { nombre: 'Posguerra (1940-1960)', rasgos: ['Tras la guerra civil: angustia existencial, censura y realismo social; en la novela, el tremendismo.'] },
}
export const ORDEN_EPOCAS = Object.keys(EPOCAS)

export const GENEROS = {
  narrativo: { nombre: 'Narrativo', pista: 'cuenta una historia con narrador, personajes y acción (novelas, cuentos, cantares de gesta)' },
  lirico: { nombre: 'Lírico', pista: 'expresa los sentimientos del poeta, casi siempre en verso' },
  dramatico: { nombre: 'Dramático', pista: 'está escrito para representarse: diálogos de personajes y acotaciones' },
}

// [título, autor, época, año, género (null = no se pregunta), sin época (true = no se pregunta)]
const O = (titulo, autor, epoca, anyo, genero, sinEpoca = false) => ({ titulo, autor, epoca, anyo, genero, sinEpoca })
export const OBRAS = [
  O('Cantar de mio Cid', 'Anónimo', 'edad-media', 1200, 'narrativo'),
  O('Milagros de Nuestra Señora', 'Gonzalo de Berceo', 'edad-media', 1250, 'narrativo'),
  O('El conde Lucanor', 'Don Juan Manuel', 'edad-media', 1335, 'narrativo'),
  O('Libro de buen amor', 'Juan Ruiz, Arcipreste de Hita', 'edad-media', 1343, null),
  O('Coplas por la muerte de su padre', 'Jorge Manrique', 'edad-media', 1476, 'lirico'),
  O('Égloga I', 'Garcilaso de la Vega', 'renacimiento', 1535, 'lirico'),
  O('Lazarillo de Tormes', 'Anónimo', 'renacimiento', 1554, 'narrativo'),
  O('Oda a la vida retirada', 'Fray Luis de León', 'renacimiento', 1570, 'lirico'),
  O('Cántico espiritual', 'San Juan de la Cruz', 'renacimiento', 1578, 'lirico'),
  O('Don Quijote de la Mancha', 'Miguel de Cervantes', 'barroco', 1605, 'narrativo', true),
  O('Fábula de Polifemo y Galatea', 'Luis de Góngora', 'barroco', 1612, null),
  O('Fuenteovejuna', 'Lope de Vega', 'barroco', 1619, 'dramatico'),
  O('Historia de la vida del Buscón', 'Francisco de Quevedo', 'barroco', 1626, 'narrativo'),
  O('El burlador de Sevilla', 'Tirso de Molina', 'barroco', 1630, 'dramatico'),
  O('La vida es sueño', 'Pedro Calderón de la Barca', 'barroco', 1635, 'dramatico'),
  O('Cartas marruecas', 'José Cadalso', 'neoclasicismo', 1789, null),
  O('El sí de las niñas', 'Leandro Fernández de Moratín', 'neoclasicismo', 1806, 'dramatico'),
  O('Canción del pirata', 'José de Espronceda', 'romanticismo', 1835, 'lirico'),
  O('Don Álvaro o la fuerza del sino', 'Duque de Rivas', 'romanticismo', 1835, 'dramatico'),
  O('Don Juan Tenorio', 'José Zorrilla', 'romanticismo', 1844, 'dramatico'),
  O('Rimas', 'Gustavo Adolfo Bécquer', 'romanticismo', 1871, 'lirico'),
  O('La Regenta', 'Leopoldo Alas, «Clarín»', 'realismo', 1884, 'narrativo'),
  O('Los pazos de Ulloa', 'Emilia Pardo Bazán', 'realismo', 1886, 'narrativo'),
  O('Fortunata y Jacinta', 'Benito Pérez Galdós', 'realismo', 1887, 'narrativo'),
  O('Prosas profanas', 'Rubén Darío', 'modernismo', 1896, 'lirico'),
  O('Sonatas', 'Ramón del Valle-Inclán', 'modernismo', 1902, 'narrativo'),
  O('El árbol de la ciencia', 'Pío Baroja', 'g98', 1911, 'narrativo'),
  O('Campos de Castilla', 'Antonio Machado', 'g98', 1912, 'lirico'),
  O('Niebla', 'Miguel de Unamuno', 'g98', 1914, 'narrativo'),
  O('Luces de bohemia', 'Ramón del Valle-Inclán', 'g98', 1924, 'dramatico', true),
  O('Marinero en tierra', 'Rafael Alberti', 'g27', 1925, 'lirico'),
  O('Romancero gitano', 'Federico García Lorca', 'g27', 1928, 'lirico'),
  O('Cántico', 'Jorge Guillén', 'g27', 1928, 'lirico'),
  O('La voz a ti debida', 'Pedro Salinas', 'g27', 1933, 'lirico'),
  O('La casa de Bernarda Alba', 'Federico García Lorca', 'g27', 1936, 'dramatico'),
  O('La familia de Pascual Duarte', 'Camilo José Cela', 'posguerra', 1942, 'narrativo'),
  O('Nada', 'Carmen Laforet', 'posguerra', 1945, 'narrativo'),
  O('Historia de una escalera', 'Antonio Buero Vallejo', 'posguerra', 1949, 'dramatico'),
  O('El camino', 'Miguel Delibes', 'posguerra', 1950, 'narrativo'),
]

export const NIVELES = {
  facil:   { tipos: ['autor', 'autor', 'genero'] },
  medio:   { tipos: ['autor', 'genero', 'epoca', 'epoca', 'rasgo'] },
  dificil: { tipos: ['autor', 'epoca', 'rasgo', 'orden', 'orden'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const idx = e => ORDEN_EPOCAS.indexOf(e)
// Épocas cercanas primero: son las que de verdad se confunden.
const cercanas = e => [...ORDEN_EPOCAS].filter(x => x !== e).sort((a, b) => Math.abs(idx(a) - idx(e)) - Math.abs(idx(b) - idx(e)))

let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    // Por obra, no por tipo: que no salga la misma obra dos veces seguidas con otra pregunta.
    const tema = r.obra != null ? `obra:${r.obra}` : `${r.tipo}:${r.bueno}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 8) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo }
  const iObras = OBRAS.map((o, i) => i)

  if (tipo === 'autor') {
    const k = elige(rand, iObras)
    const o = OBRAS[k]
    // Autores de épocas cercanas, sin repetir nombre (ni el «Anónimo» bueno).
    const otros = [...new Set(OBRAS.filter(x => x.autor !== o.autor).sort((a, b) => Math.abs(idx(a.epoca) - idx(o.epoca)) - Math.abs(idx(b.epoca) - idx(o.epoca))).slice(0, 8).map(x => x.autor))]
    return { ...base, obra: k, bueno: o.autor, opciones: baraja(rand, [o.autor, ...baraja(rand, otros).slice(0, 3)]) }
  }
  if (tipo === 'genero') {
    const k = elige(rand, iObras.filter(i => OBRAS[i].genero))
    return { ...base, obra: k, bueno: OBRAS[k].genero, opciones: Object.keys(GENEROS) }
  }
  if (tipo === 'epoca') {
    const k = elige(rand, iObras.filter(i => !OBRAS[i].sinEpoca))
    const e = OBRAS[k].epoca
    const otras = baraja(rand, cercanas(e).slice(0, 4)).slice(0, 3)
    return { ...base, obra: k, bueno: e, opciones: [e, ...otras].sort((a, b) => idx(a) - idx(b)) }
  }
  if (tipo === 'rasgo') {
    const e = elige(rand, ORDEN_EPOCAS)
    const otras = baraja(rand, cercanas(e).slice(0, 4)).slice(0, 3)
    return { ...base, bueno: e, opciones: [e, ...otras].sort((a, b) => idx(a) - idx(b)) }
  }
  // orden: cuatro obras de cuatro épocas distintas; la buena, la más antigua
  const epocas = baraja(rand, ORDEN_EPOCAS).slice(0, 4)
  const ks = epocas.map(e => elige(rand, iObras.filter(i => OBRAS[i].epoca === e)))
  const bueno = ks.reduce((a, b) => (OBRAS[a].anyo <= OBRAS[b].anyo ? a : b))
  return { ...base, bueno, opciones: baraja(rand, ks) }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export const obra = r => (r.obra != null ? OBRAS[r.obra] : null)
const de = o => (o.autor === 'Anónimo' ? 'obra anónima' : `de ${o.autor}`)
export function textoOpcion(o, r) {
  if (r.tipo === 'genero') return GENEROS[o].nombre
  if (r.tipo === 'epoca' || r.tipo === 'rasgo') return EPOCAS[o].nombre
  if (r.tipo === 'orden') return `${OBRAS[o].titulo}`
  return o
}
export function enunciado(r) {
  return {
    autor: '¿Quién escribió esta obra?',
    genero: '¿A qué género literario pertenece?',
    epoca: '¿A qué época o movimiento pertenece?',
    rasgo: '¿Qué época o movimiento tiene estos rasgos?',
    orden: '¿Cuál de estas obras es la más antigua?',
  }[r.tipo]
}
export function explicacion(r) {
  const o = obra(r)
  if (r.tipo === 'autor') return `«${o.titulo}» es ${o.autor === 'Anónimo' ? 'anónimo' : `de ${o.autor}`} (${o.anyo === 1200 ? 'hacia 1200' : o.anyo}), ${EPOCAS[o.epoca].nombre.replace(/ \(.*\)/, '')}.`
  if (r.tipo === 'genero') return `«${o.titulo}» es del género ${GENEROS[o.genero].nombre.toLowerCase()}: ${GENEROS[o.genero].pista}.`
  if (r.tipo === 'epoca') return `«${o.titulo}», ${de(o)} (${o.anyo === 1200 ? 'hacia 1200' : o.anyo}): ${EPOCAS[o.epoca].nombre}. ${EPOCAS[o.epoca].rasgos[0]}`
  if (r.tipo === 'rasgo') return `${EPOCAS[r.bueno].nombre}: ${EPOCAS[r.bueno].rasgos[0]}`
  const orden = [...r.opciones].sort((a, b) => OBRAS[a].anyo - OBRAS[b].anyo)
  return `De más antigua a más moderna: ${orden.map(k => `${OBRAS[k].titulo} (${OBRAS[k].anyo === 1200 ? 'h. 1200' : OBRAS[k].anyo})`).join(' → ')}.`
}
export function schemaQuestion(r) {
  const o = obra(r)
  const q = r.tipo === 'rasgo' ? `${EPOCAS[r.bueno].rasgos[0]} ` : o ? `«${o.titulo}»${r.tipo === 'autor' ? '' : `, ${de(o)}`}. ` : ''
  return {
    question: `${q}${enunciado(r)}`,
    correctAnswer: textoOpcion(r.bueno, r),
    wrongAnswers: r.opciones.filter(x => x !== r.bueno).map(x => textoOpcion(x, r)),
  }
}
