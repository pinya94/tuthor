// La Biblioteca (lengua · literatura española, ESO y Bachillerato). Solo castellano.
//
// Las obras de la literatura española que se estudian en el instituto, como
// libros de una estantería: se colocan en sus baldas (ver las mecánicas más abajo).
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

// Mecánicas (nada de elegir entre cuatro):
//   estanteria  baldas por época, en orden; cada libro a la suya (las obras
//               de época discutida no salen)
//   generos     cada libro a su balda de género (sin las de género mixto)
//   autores     unir títulos con autores
//   orden       colocar cuatro libros de cuatro épocas en orden
//   rasgos      unir la descripción de cada movimiento con su época
export const NIVELES = {
  facil:   { tipos: ['autores', 'autores', 'generos'] },
  medio:   { tipos: ['autores', 'generos', 'estanteria', 'estanteria'] },
  dificil: { tipos: ['estanteria', 'orden', 'orden', 'rasgos'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const idx = e => ORDEN_EPOCAS.indexOf(e)
let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    if (intento < 20 && r.libros.some(k => recientes.includes(k))) continue
    recientes.push(...r.libros)
    while (recientes.length > 10) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const iObras = OBRAS.map((o, i) => i)
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'autores') {
      // Tres obras de tres autores distintos.
      const libros = []
      for (const k of baraja(rand, iObras)) {
        if (libros.some(j => OBRAS[j].autor === OBRAS[k].autor)) continue
        libros.push(k)
        if (libros.length === 3) break
      }
      return { ...base, libros, autores: baraja(rand, libros.map(k => OBRAS[k].autor)), bueno: 'autores:0' }
    }

    if (tipo === 'generos') {
      const libros = baraja(rand, iObras.filter(i => OBRAS[i].genero)).slice(0, 4)
      if (new Set(libros.map(k => OBRAS[k].genero)).size < 2) continue
      return { ...base, libros, cajas: Object.keys(GENEROS), bueno: 'clasifica:0' }
    }

    if (tipo === 'estanteria') {
      // Tres libros de tres épocas; las baldas, sus épocas y una vecina, en orden.
      const epocas = baraja(rand, ORDEN_EPOCAS).slice(0, 3)
      const libros = epocas.map(e => iObras.filter(i => OBRAS[i].epoca === e && !OBRAS[i].sinEpoca))
      if (libros.some(l => !l.length)) continue
      const elegidos = libros.map(l => elige(rand, l))
      const vecina = baraja(rand, ORDEN_EPOCAS.filter(e => !epocas.includes(e) && epocas.some(x => Math.abs(idx(x) - idx(e)) === 1)))[0]
      if (!vecina) continue
      return { ...base, libros: baraja(rand, elegidos), cajas: [...epocas, vecina].sort((a, b) => idx(a) - idx(b)), bueno: 'clasifica:0' }
    }

    if (tipo === 'orden') {
      const epocas = baraja(rand, ORDEN_EPOCAS).slice(0, 4)
      const libros = epocas.map(e => elige(rand, iObras.filter(i => OBRAS[i].epoca === e)))
      const ord = [...libros].sort((a, b) => OBRAS[a].anyo - OBRAS[b].anyo)
      return { ...base, libros, bueno: ord.join(',') }
    }

    // rasgos: tres épocas con su descripción
    const epocas = baraja(rand, ORDEN_EPOCAS).slice(0, 3)
    return { ...base, libros: [], epocas, nombres: baraja(rand, epocas), bueno: 'rasgos:0' }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «autores:fallos», «clasifica:fallos», «rasgos:fallos»; orden,
// los índices de las obras en el orden colocado.
export const esCorrecta = (r, o) => String(o) === r.bueno
export const cajaDe = (r, k) => (r.tipo === 'generos' ? OBRAS[k].genero : OBRAS[k].epoca)

// ── Textos ────────────────────────────────────────────────────────────────
const de = o => (o.autor === 'Anónimo' ? 'obra anónima' : `de ${o.autor}`)
export const anyo = o => (o.anyo === 1200 ? 'h. 1200' : String(o.anyo))
export const nombreCaja = (r, c) => (r.tipo === 'generos' ? GENEROS[c].nombre : EPOCAS[c].nombre)
export function enunciado(r) {
  return {
    autores: 'Une cada libro con su autor',
    generos: 'Coloca cada libro en la balda de su género',
    estanteria: 'Coloca cada libro en la balda de su época',
    orden: 'Coloca los libros en orden, del más antiguo al más moderno',
    rasgos: 'Une cada descripción con su época',
  }[r.tipo]
}
export function explicacion(r) {
  if (r.tipo === 'autores') return r.libros.map(k => `«${OBRAS[k].titulo}», ${de(OBRAS[k])}`).join(' · ') + '.'
  if (r.tipo === 'generos') return r.libros.map(k => `«${OBRAS[k].titulo}»: ${GENEROS[OBRAS[k].genero].nombre.toLowerCase()}`).join(' · ') + `. Narrativo: ${GENEROS.narrativo.pista}; lírico: ${GENEROS.lirico.pista}; dramático: ${GENEROS.dramatico.pista}.`
  if (r.tipo === 'estanteria') return r.libros.map(k => `«${OBRAS[k].titulo}» (${anyo(OBRAS[k])}): ${EPOCAS[OBRAS[k].epoca].nombre}`).join(' · ') + '.'
  if (r.tipo === 'orden') return `De más antiguo a más moderno: ${r.bueno.split(',').map(k => `${OBRAS[k].titulo} (${anyo(OBRAS[k])})`).join(' → ')}.`
  return r.epocas.map(e => `${EPOCAS[e].nombre}: ${EPOCAS[e].rasgos[0]}`).join(' ')
}
// Para los buscadores y el examen en texto: una pregunta de cada mecánica.
export function schemaQuestion(r) {
  if (r.tipo === 'rasgos') {
    const e = r.epocas[0]
    return { question: `${EPOCAS[e].rasgos[0]} ¿Qué época o movimiento tiene estos rasgos?`, correctAnswer: EPOCAS[e].nombre, wrongAnswers: r.epocas.slice(1).map(x => EPOCAS[x].nombre) }
  }
  if (r.tipo === 'orden') {
    const ord = r.bueno.split(',')
    return { question: '¿Cuál de estas obras es la más antigua?', correctAnswer: OBRAS[ord[0]].titulo, wrongAnswers: ord.slice(1).map(k => OBRAS[k].titulo) }
  }
  const o = OBRAS[r.libros[0]]
  if (r.tipo === 'autores') return { question: `«${o.titulo}». ¿Quién escribió esta obra?`, correctAnswer: o.autor, wrongAnswers: r.libros.slice(1).map(k => OBRAS[k].autor) }
  const c = cajaDe(r, r.libros[0])
  return { question: `«${o.titulo}», ${de(o)}. ${r.tipo === 'generos' ? '¿A qué género literario pertenece?' : '¿A qué época o movimiento pertenece?'}`, correctAnswer: nombreCaja(r, c), wrongAnswers: r.cajas.filter(x => x !== c).map(x => nombreCaja(r, x)) }
}
