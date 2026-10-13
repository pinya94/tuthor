// Detective de Textos (lengua · los textos, Primaria y ESO). Solo castellano.
//
// Un juego de colocar, no de elegir:
//   esquema    una escena de comunicación y su esquema: emisor → mensaje →
//              receptor, con canal y código; cada ficha de la escena a su hueco
//   textos     tres fragmentos, cada uno a su tipología
//   funciones  tres frases, cada una a la función del lenguaje que domina
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
  facil:   { tipos: ['esquema', 'textos', 'textos'], hasta: 'facil', huecos: ['emisor', 'mensaje', 'receptor'] },
  medio:   { tipos: ['esquema', 'textos', 'funciones'], hasta: 'medio', huecos: ['emisor', 'mensaje', 'receptor', 'canal', 'codigo'] },
  dificil: { tipos: ['esquema', 'textos', 'funciones', 'funciones'], hasta: 'dificil', huecos: ['emisor', 'mensaje', 'receptor', 'canal', 'codigo'] },
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
    if (intento < 20 && recientes.includes(r.clave)) continue
    recientes.push(r.clave)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'esquema') {
      const k = Math.floor(rand() * ESCENAS.length)
      // En fácil, tres huecos y una ficha de más (el canal) para despistar.
      const fichas = baraja(rand, nivel === 'facil' ? [...cfg.huecos, 'canal'] : cfg.huecos)
      return { ...base, clave: `esq${k}`, k, huecos: cfg.huecos, fichas, bueno: 'esquema:0' }
    }

    if (tipo === 'textos') {
      // Tres fragmentos de tipos distintos; las cajas, sus tipos y uno más.
      const disp = Object.keys(TIPOS).filter(t => cabe(NIVEL_TIPO[t], cfg.hasta))
      const tipos = baraja(rand, disp).slice(0, 3)
      const items = tipos.map(t => elige(rand, FRAGMENTOS.map((f, i) => i).filter(i => FRAGMENTOS[i][0] === t)))
      const extra = baraja(rand, disp.filter(t => !tipos.includes(t)))[0]
      return { ...base, clave: `tx${items.join()}`, items: baraja(rand, items), cajas: baraja(rand, [...tipos, extra]), bueno: 'clasifica:0' }
    }

    // funciones: tres frases de funciones distintas; ninguna podría ir en la
    // caja de otra (campo tambien), ni en la caja extra.
    const disp = Object.keys(FUNCIONES).filter(f => cabe(FUNCIONES[f].nivel, cfg.hasta))
    const items = []
    for (const i of baraja(rand, FRASES.map((_, j) => j).filter(j => disp.includes(FRASES[j][0])))) {
      const f = FRASES[i]
      if (items.some(j => FRASES[j][0] === f[0] || FRASES[j][3].includes(f[0]) || f[3].includes(FRASES[j][0]))) continue
      items.push(i)
      if (items.length === 3) break
    }
    if (items.length < 3) continue
    const mains = items.map(i => FRASES[i][0])
    const extra = baraja(rand, Object.keys(FUNCIONES).filter(f => !mains.includes(f) && !items.some(i => FRASES[i][3].includes(f))))[0]
    if (!extra) continue
    return { ...base, clave: `fn${items.join()}`, items: baraja(rand, items), cajas: baraja(rand, [...mains, extra]), bueno: 'clasifica:0' }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «esquema:fallos» o «clasifica:fallos».
export const esCorrecta = (r, o) => o === r.bueno
export const cajaDe = (r, i) => (r.tipo === 'textos' ? FRAGMENTOS[i][0] : FRASES[i][0])

// ── Textos ────────────────────────────────────────────────────────────────
export const nombreCaja = (r, c) => (r.tipo === 'textos' ? TIPOS[c].nombre : FUNCIONES[c].nombre)
export const textoItem = (r, i) => (r.tipo === 'textos' ? FRAGMENTOS[i][1] : FRASES[i][1])
export function enunciado(r) {
  if (r.tipo === 'esquema') return 'Coloca cada pieza en su sitio del esquema de la comunicación'
  if (r.tipo === 'textos') return '¿Qué tipo de texto es cada fragmento?'
  return '¿Qué función del lenguaje domina en cada frase?'
}
export function explicacion(r) {
  if (r.tipo === 'esquema') {
    const e = ESCENAS[r.k]
    return `El emisor es ${ELEMENTOS.emisor.def} (${e.emisor}); el receptor, ${ELEMENTOS.receptor.def} (${e.receptor}); el mensaje, ${ELEMENTOS.mensaje.def}. El canal es ${ELEMENTOS.canal.def} (${e.canal.toLowerCase()}) y el código, ${ELEMENTOS.codigo.def} (${e.codigo.toLowerCase()}).`
  }
  if (r.tipo === 'textos') return r.cajas.filter(c => r.items.some(i => cajaDe(r, i) === c)).map(c => `${TIPOS[c].nombre}: ${TIPOS[c].pista}`).join(' ')
  return r.cajas.filter(c => r.items.some(i => cajaDe(r, i) === c)).map(c => `${FUNCIONES[c].nombre.split(' (')[0]}: ${FUNCIONES[c].pista}`).join(' ')
}
// Para los buscadores y el examen en texto: una pregunta de cada mecánica.
export function schemaQuestion(r) {
  if (r.tipo === 'esquema') {
    const e = ESCENAS[r.k]
    return { question: `${e.t} ¿Cuál es el canal?`, correctAnswer: e.canal, wrongAnswers: ['emisor', 'receptor', 'codigo'].map(x => e[x]) }
  }
  const i = r.items[0]
  return {
    question: `«${textoItem(r, i).replace(/\n/g, ' ')}» ${r.tipo === 'textos' ? '¿Qué tipo de texto es?' : '¿Qué función del lenguaje domina?'}`,
    correctAnswer: nombreCaja(r, cajaDe(r, i)),
    wrongAnswers: r.cajas.filter(c => c !== cajaDe(r, i) && !(r.tipo === 'funciones' && FRASES[i][3].includes(c))).map(c => nombreCaja(r, c)),
  }
}
