// Detective de Textos (lengua · los textos, Primaria y ESO). Solo castellano.
//
// Tres clases de pista:
//   tipo       un fragmento → narración, descripción, diálogo, exposición,
//              argumentación o instrucción
//   elemento   una escena de comunicación → quién es el emisor, el receptor,
//              el canal, el código o el mensaje. Las opciones salen de la
//              MISMA escena: así solo una puede ser la buena.
//   funcion    una frase → la función del lenguaje que domina
//
// Fragmentos propios, escritos para que tengan una sola tipología clara (nada
// de noticias, que mezclan narración y exposición). En las funciones, cada
// frase trae `tambien` con las que también podría tener, y esas no salen
// como opción falsa (una pregunta sobre una palabra es metalingüística pero
// también apelativa). Mismos nombres que el examen de textos.

export const TIPOS = {
  narracion: { nombre: 'Narración', pista: 'Cuenta hechos que les pasan a unos personajes en un lugar y un tiempo: hay acciones en pasado y algo que sucede.' },
  descripcion: { nombre: 'Descripción', pista: 'Dice cómo es algo o alguien: abundan los adjetivos y no pasa nada, no hay acción.' },
  dialogo: { nombre: 'Diálogo', pista: 'Reproduce lo que dicen los personajes, con rayas (—) para cada intervención.' },
  exposicion: { nombre: 'Exposición', pista: 'Explica un tema de forma objetiva para que se entienda, sin opiniones: es el texto de los libros de texto y las enciclopedias.' },
  argumentacion: { nombre: 'Argumentación', pista: 'Defiende una opinión (creo que, hay que, deberían) y la apoya con razones (porque, además).' },
  instruccion: { nombre: 'Instrucción', pista: 'Dice paso a paso cómo hacer algo, con verbos en imperativo (bate, añade, pulsa) y en orden.' },
}
const NIVEL_TIPO = { narracion: 'facil', descripcion: 'facil', dialogo: 'facil', instruccion: 'facil', exposicion: 'medio', argumentacion: 'medio' }

// [tipo, texto, formato] — el formato no se dibuja: delataría el tipo
export const FRAGMENTOS = [
  ['narracion', 'Aquella mañana, Lucía salió de casa antes de lo normal. Al doblar la esquina, un perro empezó a seguirla, y no se separó de ella hasta la puerta del colegio.', 'libro'],
  ['narracion', 'Hace muchos años, un pastor perdió una oveja. La buscó durante tres días por el monte, hasta que la encontró dormida junto al río.', 'libro'],
  ['narracion', 'Cuando sonó el timbre, todos salieron corriendo al patio. Pablo tropezó en la escalera, se levantó de un salto y llegó el primero a la portería.', 'libro'],
  ['descripcion', 'La casa era pequeña y blanca, con un tejado rojo y dos ventanas azules. Delante tenía un jardín lleno de rosas y un banco de madera.', 'libro'],
  ['descripcion', 'Mi abuelo es alto y delgado, tiene el pelo blanco y unas gafas redondas. Su voz es grave y tranquila, y siempre huele a colonia de limón.', 'libro'],
  ['descripcion', 'El salón era amplio y luminoso. Las paredes, de color crema, estaban llenas de cuadros, y en el centro había una alfombra roja muy antigua.', 'libro'],
  ['dialogo', '—¿Vienes al cine esta tarde? —preguntó Marta.\n—No puedo, mañana tengo examen —respondió Pablo.\n—Pues otro día será.', 'libro'],
  ['dialogo', '—Buenos días, ¿qué desea?\n—Una barra de pan y seis magdalenas.\n—Aquí tiene. Son tres euros.', 'libro'],
  ['dialogo', '—¿Has visto mis llaves?\n—Estaban encima de la mesa.\n—Ya no están. ¡Qué raro!', 'libro'],
  ['exposicion', 'Los volcanes se forman cuando el magma del interior de la Tierra sale a la superficie. Según su actividad, pueden ser activos, dormidos o extintos.', 'enciclopedia'],
  ['exposicion', 'El corazón es un músculo que bombea la sangre por todo el cuerpo. En reposo, el de un adulto late unas setenta veces por minuto.', 'enciclopedia'],
  ['exposicion', 'Las abejas viven en colmenas formadas por una reina, miles de obreras y los zánganos. Las obreras recogen el néctar de las flores y fabrican la miel.', 'enciclopedia'],
  ['argumentacion', 'Creo que los deberes deberían reducirse, porque los alumnos necesitan tiempo para descansar. Además, el juego también es una forma de aprender.', 'opinion'],
  ['argumentacion', 'Hay que cerrar el centro de la ciudad a los coches: el aire estaría más limpio, las calles serían más seguras y los comercios ganarían clientes.', 'opinion'],
  ['argumentacion', 'En mi opinión, los móviles no deberían estar en clase, ya que distraen a los alumnos y dificultan que presten atención al profesor.', 'opinion'],
  ['instruccion', 'Bate dos huevos en un cuenco y añade una pizca de sal. Calienta el aceite en la sartén, vierte la mezcla y remueve hasta que cuaje.', 'receta'],
  ['instruccion', 'Para apagar el ordenador, guarda tus archivos, pulsa el botón de inicio y elige «Apagar». Espera a que la pantalla se quede en negro.', 'manual'],
  ['instruccion', 'Coloca las fichas en la casilla de salida. Tira el dado por turnos y avanza tantas casillas como indique. Gana quien llegue primero a la meta.', 'manual'],
]

export const ELEMENTOS = {
  emisor: { nombre: 'Emisor', def: 'quien envía el mensaje' },
  receptor: { nombre: 'Receptor', def: 'quien recibe el mensaje' },
  mensaje: { nombre: 'Mensaje', def: 'lo que se comunica' },
  canal: { nombre: 'Canal', def: 'el medio físico por el que viaja el mensaje' },
  codigo: { nombre: 'Código', def: 'el sistema de signos que comparten emisor y receptor' },
}
export const ESCENAS = [
  { emoji: '📱', t: 'Ana le escribe un wasap a su padre: «Llego tarde, no me esperéis para cenar».',
    emisor: 'Ana', receptor: 'Su padre', mensaje: 'Que llegará tarde a cenar', canal: 'El móvil (un wasap)', codigo: 'El castellano escrito' },
  { emoji: '🏫', t: 'En clase, el profesor explica a sus alumnos cómo se forman las nubes.',
    emisor: 'El profesor', receptor: 'Los alumnos', mensaje: 'Cómo se forman las nubes', canal: 'El aire, por el que viaja la voz', codigo: 'El castellano oral' },
  { emoji: '⚽', t: 'El árbitro toca el silbato tres veces y los jugadores dejan de jugar: el partido ha terminado.',
    emisor: 'El árbitro', receptor: 'Los jugadores', mensaje: 'Que el partido ha terminado', canal: 'El aire, por el que viaja el sonido', codigo: 'Los toques de silbato del reglamento' },
  { emoji: '🚦', t: 'El semáforo de los peatones se pone en rojo y la gente se queda en la acera.',
    emisor: 'El semáforo', receptor: 'Los peatones', mensaje: 'Que no se puede cruzar', canal: 'La luz', codigo: 'Los colores del semáforo' },
  { emoji: '✉️', t: 'Desde el campamento, Luis escribe una carta a su abuela para contarle que se lo está pasando muy bien.',
    emisor: 'Luis', receptor: 'Su abuela', mensaje: 'Que se lo está pasando muy bien', canal: 'El papel de la carta', codigo: 'El castellano escrito' },
  { emoji: '📻', t: 'Por la radio, la locutora anuncia a los oyentes que mañana lloverá en toda la costa.',
    emisor: 'La locutora', receptor: 'Los oyentes', mensaje: 'Que mañana lloverá en la costa', canal: 'Las ondas de radio', codigo: 'El castellano oral' },
  { emoji: '👐', t: 'Clara, que es sorda, le dice a su amiga Elena en lengua de signos que la espera a la salida.',
    emisor: 'Clara', receptor: 'Elena', mensaje: 'Que la espera a la salida', canal: 'La luz: los gestos se ven', codigo: 'La lengua de signos' },
]
const NIVEL_ELEMENTO = { emisor: 'facil', receptor: 'facil', mensaje: 'facil', canal: 'medio', codigo: 'medio' }

export const FUNCIONES = {
  expresiva: { nombre: 'Expresiva (o emotiva)', pista: 'Expresa los sentimientos o el estado de ánimo de quien habla: suele llevar exclamaciones e interjecciones.', nivel: 'medio' },
  apelativa: { nombre: 'Apelativa (o conativa)', pista: 'Busca que el receptor haga algo: órdenes, ruegos, preguntas, imperativos y vocativos.', nivel: 'medio' },
  referencial: { nombre: 'Referencial (o representativa)', pista: 'Informa de forma objetiva sobre la realidad, sin emociones: es la de las noticias y los libros de texto.', nivel: 'medio' },
  fatica: { nombre: 'Fática', pista: 'Sirve para abrir, mantener o cerrar el contacto, o comprobar que el canal funciona: «¿me oyes?», «bueno…», «vale, vale».', nivel: 'dificil' },
  metalinguistica: { nombre: 'Metalingüística', pista: 'Usa la lengua para hablar de la propia lengua: de palabras, de su significado o de su gramática.', nivel: 'dificil' },
  poetica: { nombre: 'Poética (o estética)', pista: 'Cuida la forma del mensaje para que sea bello: ritmo, rima, figuras literarias.', nivel: 'dificil' },
}
// [función, frase, autor, también]
export const FRASES = [
  ['expresiva', '¡Qué alegría me da verte por fin!', null, []],
  ['expresiva', '¡Ay, qué daño me he hecho en el pie!', null, []],
  ['expresiva', '¡Uf, qué miedo he pasado en esa película!', null, []],
  ['apelativa', 'Cierra la puerta al salir, por favor.', null, []],
  ['apelativa', '¡Niños, recoged los juguetes ahora mismo!', null, ['expresiva']],
  ['apelativa', '¿Me ayudas a llevar estas bolsas?', null, []],
  ['referencial', 'El agua hierve a cien grados.', null, []],
  ['referencial', 'Madrid es la capital de España.', null, []],
  ['referencial', 'El tren a Sevilla sale a las ocho y cuarto.', null, []],
  ['fatica', '¿Hola? ¿Me oyes? ¿Sigues ahí?', null, ['apelativa']],
  ['fatica', 'Sí, sí, claro, te escucho.', null, []],
  ['fatica', 'Bueno, pues nada, ya hablamos.', null, []],
  ['metalinguistica', '«Casa» es un sustantivo común.', null, ['referencial']],
  ['metalinguistica', '¿Qué significa la palabra «efímero»?', null, ['apelativa']],
  ['metalinguistica', '«Árbol» lleva tilde porque es llana y no acaba en n, s ni vocal.', null, ['referencial']],
  ['poetica', 'Con diez cañones por banda, / viento en popa, a toda vela.', 'José de Espronceda', []],
  ['poetica', 'Volverán las oscuras golondrinas / en tu balcón sus nidos a colgar.', 'Gustavo Adolfo Bécquer', []],
  ['poetica', 'Verde que te quiero verde. / Verde viento. Verdes ramas.', 'Federico García Lorca', ['expresiva']],
]

export const NIVELES = {
  facil:   { tipos: ['tipo', 'tipo', 'elemento'], hasta: 'facil' },
  medio:   { tipos: ['tipo', 'elemento', 'funcion', 'funcion'], hasta: 'medio' },
  dificil: { tipos: ['tipo', 'elemento', 'funcion', 'funcion', 'funcion'], hasta: 'dificil' },
}
const ORDEN = ['facil', 'medio', 'dificil']
const cabe = (nivelCosa, hasta) => ORDEN.indexOf(nivelCosa) <= ORDEN.indexOf(hasta)

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    const tema = `${r.tipo}:${r.k}:${r.pide ?? ''}`
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

  if (tipo === 'tipo') {
    const disp = Object.keys(TIPOS).filter(t => cabe(NIVEL_TIPO[t], cfg.hasta))
    const k = elige(rand, FRAGMENTOS.map((f, i) => [f, i]).filter(([f]) => disp.includes(f[0])))[1]
    const bueno = FRAGMENTOS[k][0]
    const otras = baraja(rand, disp.filter(t => t !== bueno)).slice(0, 3)
    return { ...base, k, bueno, opciones: baraja(rand, [bueno, ...otras]) }
  }
  if (tipo === 'elemento') {
    const k = Math.floor(rand() * ESCENAS.length)
    const disp = Object.keys(ELEMENTOS).filter(e => cabe(NIVEL_ELEMENTO[e], cfg.hasta))
    const pide = elige(rand, nivel === 'facil' ? disp : disp.filter(e => nivel !== 'dificil' || ['canal', 'codigo', 'mensaje'].includes(e)))
    // Las opciones son los demás elementos de la misma escena.
    const otras = baraja(rand, Object.keys(ELEMENTOS).filter(e => e !== pide)).slice(0, 3)
    return { ...base, k, pide, bueno: pide, opciones: baraja(rand, [pide, ...otras]) }
  }
  // funcion
  const disp = Object.keys(FUNCIONES).filter(f => cabe(FUNCIONES[f].nivel, cfg.hasta))
  const pool = FRASES.map((f, i) => [f, i]).filter(([f]) => disp.includes(f[0]))
  const nuevas = pool.filter(([f]) => FUNCIONES[f[0]].nivel === cfg.hasta)
  const [f, k] = elige(rand, nivel === 'dificil' && rand() < 0.6 ? nuevas : pool)
  // Primero las del nivel; si no llegan a tres (en medio solo hay tres funciones), cualquiera.
  const vale = x => x !== f[0] && !f[3].includes(x)
  const otras = [...new Set([...baraja(rand, disp.filter(vale)), ...baraja(rand, Object.keys(FUNCIONES).filter(vale))])].slice(0, 3)
  return { ...base, k, bueno: f[0], opciones: baraja(rand, [f[0], ...otras]) }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export function textoOpcion(o, r) {
  if (r.tipo === 'tipo') return TIPOS[o].nombre
  if (r.tipo === 'elemento') return ESCENAS[r.k][o]
  return FUNCIONES[o].nombre
}
export function enunciado(r) {
  if (r.tipo === 'tipo') return '¿Qué tipo de texto es?'
  if (r.tipo === 'elemento') return `¿Cuál es el ${ELEMENTOS[r.pide].nombre.toLowerCase()}?`
  return '¿Qué función del lenguaje domina?'
}
export function explicacion(r) {
  if (r.tipo === 'tipo') return `${TIPOS[r.bueno].nombre}: ${TIPOS[r.bueno].pista}`
  if (r.tipo === 'elemento') {
    const e = ESCENAS[r.k]
    return `El ${ELEMENTOS[r.pide].nombre.toLowerCase()} es ${ELEMENTOS[r.pide].def}. En esta escena: emisor, ${e.emisor}; receptor, ${e.receptor}; mensaje, ${e.mensaje}; canal, ${e.canal}; código, ${e.codigo}.`
  }
  const f = FRASES[r.k]
  const tambien = f[3].length ? ` (También tiene algo de ${f[3].map(x => FUNCIONES[x].nombre.split(' ')[0].toLowerCase()).join(' y ')}, por eso no sale como opción.)` : ''
  return `${FUNCIONES[r.bueno].nombre}: ${FUNCIONES[r.bueno].pista}${tambien}`
}
export function schemaQuestion(r) {
  const q = r.tipo === 'tipo' ? `«${FRAGMENTOS[r.k][1].replace(/\n/g, ' ')}» ` : r.tipo === 'elemento' ? `${ESCENAS[r.k].t} ` : `«${FRASES[r.k][1]}» `
  return {
    question: `${q}${enunciado(r)}`,
    correctAnswer: textoOpcion(r.bueno, r),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r)),
  }
}
