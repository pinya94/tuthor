// Cazafiguras (lengua · las figuras literarias, ESO y Bachillerato). Solo castellano.
//
// Un juego de cazar, no de elegir:
//   caza      el texto con cada palabra tocable: toca las que forman la figura
//             que se pide (en fácil, con su definición a la vista)
//   empareja  tres o cuatro textos y sus figuras: une cada uno con la suya
//
// Un verso suele tener más de una figura (unos «verdes» de Lorca son anáfora
// y también epíteto…). Por eso cada ejemplo trae su figura principal Y la
// lista `tambien` de figuras que también tiene: esas nunca salen como opción
// falsa. Los versos citados son de autores muertos antes de 1946 (dominio
// público); los demás ejemplos son propios. Mismos nombres que el examen de
// figuras (src/data/espanolFiguras.js).

export const FIGURAS = {
  metafora: { nombre: 'Metáfora', nivel: 'facil', def: 'Identificar una cosa con otra con la que se parece, sin decir «como»: «tus ojos son luceros».' },
  comparacion: { nombre: 'Comparación', nivel: 'facil', def: 'Relacionar dos cosas que se parecen con una palabra que lo dice: como, igual que, parece…' },
  personificacion: { nombre: 'Personificación', nivel: 'facil', def: 'Dar a un animal, una cosa o una idea cualidades o acciones de persona.' },
  hiperbole: { nombre: 'Hipérbole', nivel: 'facil', def: 'Exagerar mucho, hasta lo imposible, para dar fuerza a lo que se dice.' },
  onomatopeya: { nombre: 'Onomatopeya', nivel: 'facil', def: 'Imitar un sonido con palabras: guau, tic tac, pum.' },
  anafora: { nombre: 'Anáfora', nivel: 'medio', def: 'Repetir una o varias palabras al principio de versos o frases seguidas.' },
  aliteracion: { nombre: 'Aliteración', nivel: 'medio', def: 'Repetir un mismo sonido (una letra) en palabras cercanas para crear un efecto sonoro.' },
  epiteto: { nombre: 'Epíteto', nivel: 'medio', def: 'Un adjetivo que dice una cualidad que el nombre ya tiene: «la blanca nieve».' },
  hiperbaton: { nombre: 'Hipérbaton', nivel: 'medio', def: 'Cambiar el orden normal de las palabras en la oración.' },
  antitesis: { nombre: 'Antítesis', nivel: 'medio', def: 'Contraponer dos palabras o ideas de significado opuesto.' },
  interrogacion: { nombre: 'Interrogación retórica', nivel: 'medio', def: 'Una pregunta que no espera respuesta: se hace para afirmar algo con más fuerza.' },
  paradoja: { nombre: 'Paradoja', nivel: 'dificil', def: 'Una idea que parece absurda o contradictoria, pero que esconde un sentido profundo.' },
  oximoron: { nombre: 'Oxímoron', nivel: 'dificil', def: 'Juntar dos palabras de significado opuesto que se aplican a lo mismo: «fuego helado».' },
  sinestesia: { nombre: 'Sinestesia', nivel: 'dificil', def: 'Mezclar sensaciones de sentidos distintos: «una voz dulce», «un color chillón».' },
  metonimia: { nombre: 'Metonimia', nivel: 'dificil', def: 'Nombrar una cosa con el nombre de otra relacionada con ella: el autor por la obra, el recipiente por el contenido…' },
  polisindeton: { nombre: 'Polisíndeton', nivel: 'dificil', def: 'Repetir conjunciones (y, ni…) más de lo necesario para dar intensidad.' },
  asindeton: { nombre: 'Asíndeton', nivel: 'dificil', def: 'Quitar las conjunciones entre palabras o frases para dar rapidez.' },
}
const ORDEN = ['facil', 'medio', 'dificil']

// [figura, texto, autor (o null), palabras que la forman, también tiene…]
const E = (fig, t, autor, marca, tambien = []) => ({ fig, t, autor, marca, tambien })
export const EJEMPLOS = [
  E('metafora', 'Tus ojos son dos luceros.', null, ['son dos luceros'], ['hiperbole']),
  E('metafora', 'Nuestras vidas son los ríos / que van a dar en la mar, / que es el morir.', 'Jorge Manrique', ['vidas son los ríos', 'la mar, / que es el morir']),
  E('metafora', 'El tiempo es oro.', null, ['es oro']),
  E('metafora', 'Las perlas de su boca brillaron al sonreír.', null, ['perlas de su boca']),
  E('comparacion', 'Tus ojos brillan como dos luceros.', null, ['como dos luceros'], ['hiperbole']),
  E('comparacion', 'Era fuerte como un roble.', null, ['como un roble']),
  E('comparacion', 'Su piel era blanca como la nieve.', null, ['como la nieve']),
  E('comparacion', 'Se quedó quieto igual que una estatua.', null, ['igual que una estatua']),
  E('personificacion', 'La ciudad dormía bajo la lluvia.', null, ['La ciudad dormía']),
  E('personificacion', 'El reloj nos miraba desde la pared, impaciente.', null, ['El reloj nos miraba', 'impaciente']),
  E('personificacion', 'La luna se asomó, curiosa, a la ventana.', null, ['La luna se asomó, curiosa']),
  E('personificacion', 'El viejo coche protestaba en cada cuesta.', null, ['coche protestaba']),
  E('hiperbole', 'Te lo he dicho un millón de veces.', null, ['un millón de veces']),
  E('hiperbole', 'Tengo tanta hambre que me comería un elefante.', null, ['me comería un elefante']),
  E('hiperbole', 'Lloró ríos de lágrimas.', null, ['ríos de lágrimas'], ['metafora']),
  E('hiperbole', 'Érase un hombre a una nariz pegado.', 'Francisco de Quevedo', ['un hombre a una nariz pegado'], ['hiperbaton']),
  E('onomatopeya', 'El perro hizo guau, guau toda la noche.', null, ['guau, guau']),
  E('onomatopeya', 'Tic, tac, sonaba el reloj de la cocina.', null, ['Tic, tac']),
  E('onomatopeya', '¡Pum! La puerta se cerró de golpe.', null, ['¡Pum!']),
  E('onomatopeya', 'Las ranas cantaban croac en la charca.', null, ['croac'], ['personificacion']),
  E('anafora', 'Verde que te quiero verde. / Verde viento. Verdes ramas.', 'Federico García Lorca', ['Verde', 'Verde', 'Verdes'], ['aliteracion', 'epiteto', 'sinestesia', 'metafora']),
  E('anafora', 'Quiero que vengas, quiero que te quedes, quiero que no te vayas nunca.', null, ['Quiero', 'quiero', 'quiero']),
  E('anafora', 'Por ti el silencio de la selva umbrosa, / por ti la esquividad y apartamiento / del solitario monte me agradaba.', 'Garcilaso de la Vega', ['Por ti', 'por ti'], ['epiteto', 'hiperbaton']),
  E('aliteracion', 'En el silencio solo se escuchaba / un susurro de abejas que sonaba.', 'Garcilaso de la Vega', ['silencio solo se escuchaba', 'susurro', 'sonaba'], ['onomatopeya']),
  E('aliteracion', 'Tres tristes tigres tragaban trigo en un trigal.', null, ['Tres tristes tigres tragaban trigo en un trigal']),
  E('aliteracion', 'El ruido con que rueda la ronca tempestad.', 'José Zorrilla', ['ruido', 'rueda', 'ronca'], ['personificacion']),
  E('epiteto', 'La blanca nieve cubría todo el campo.', null, ['blanca nieve']),
  E('epiteto', 'Untó el pan con dulce miel.', null, ['dulce miel']),
  E('epiteto', 'La verde hierba crecía junto al río.', null, ['verde hierba']),
  E('hiperbaton', 'Del salón en el ángulo oscuro, / de su dueña tal vez olvidada, / silenciosa y cubierta de polvo / veíase el arpa.', 'Gustavo Adolfo Bécquer', ['Del salón en el ángulo oscuro', 'veíase el arpa'], ['personificacion']),
  E('hiperbaton', 'Volverán las oscuras golondrinas / en tu balcón sus nidos a colgar.', 'Gustavo Adolfo Bécquer', ['sus nidos a colgar'], ['epiteto']),
  E('hiperbaton', 'De los sueños el mejor es este.', null, ['De los sueños el mejor']),
  E('antitesis', 'Unos ríen mientras otros lloran.', null, ['ríen', 'lloran']),
  E('antitesis', 'Ayer naciste y morirás mañana.', 'Luis de Góngora', ['Ayer naciste', 'morirás mañana']),
  E('antitesis', 'Es tan fácil empezar y tan difícil terminar.', null, ['fácil empezar', 'difícil terminar']),
  E('interrogacion', '¿Hasta cuándo vamos a soportar esto?', null, ['¿Hasta cuándo vamos a soportar esto?']),
  E('interrogacion', '¿Quién no ha soñado alguna vez con volar?', null, ['¿Quién no ha soñado alguna vez con volar?']),
  E('interrogacion', '¿Acaso no te lo advertí mil veces?', null, ['¿Acaso no te lo advertí'], ['hiperbole']),
  E('paradoja', 'Vivo sin vivir en mí, / y tan alta vida espero, / que muero porque no muero.', 'Santa Teresa de Jesús', ['Vivo sin vivir en mí', 'muero porque no muero'], ['antitesis']),
  E('paradoja', 'Solo sé que no sé nada.', null, ['Solo sé que no sé nada'], ['antitesis']),
  E('paradoja', 'Para ganarlo todo hay que estar dispuesto a perderlo todo.', null, ['ganarlo todo', 'perderlo todo'], ['antitesis']),
  E('oximoron', 'Es hielo abrasador, es fuego helado.', 'Francisco de Quevedo', ['hielo abrasador', 'fuego helado'], ['metafora', 'paradoja', 'antitesis', 'anafora']),
  E('oximoron', 'Se oía un silencio atronador.', null, ['silencio atronador'], ['paradoja', 'sinestesia', 'antitesis']),
  E('sinestesia', 'Una voz dulce me habló al oído.', null, ['voz dulce'], ['epiteto']),
  E('sinestesia', 'Llevaba una camisa de colores chillones.', null, ['colores chillones']),
  E('sinestesia', 'Se respiraba un aire amarillo de tarde de verano.', null, ['aire amarillo'], ['metafora']),
  E('metonimia', 'Leí a Cervantes durante el verano.', null, ['Leí a Cervantes']),
  E('metonimia', 'Se bebió dos vasos de agua fresca.', null, ['dos vasos']),
  E('metonimia', 'En el museo había un Picasso precioso.', null, ['un Picasso']),
  E('polisindeton', 'Y corre, y salta, y grita, y ríe sin parar.', null, ['Y', 'y', 'y', 'y'], ['anafora']),
  E('polisindeton', 'No tiene ni casa ni coche ni amigos ni ganas de nada.', null, ['ni', 'ni', 'ni', 'ni']),
  E('asindeton', 'Llegué, vi, vencí.', 'Julio César', ['Llegué, vi, vencí']),
  E('asindeton', 'Acude, corre, vuela, / traspasa la alta sierra, ocupa el llano.', 'Fray Luis de León', ['Acude, corre, vuela'], ['epiteto']),
]

// Parejas que se confunden: salen antes como opción falsa.
const CONFUNDE = {
  metafora: ['comparacion', 'personificacion', 'hiperbole'], comparacion: ['metafora', 'hiperbole', 'personificacion'],
  personificacion: ['metafora', 'comparacion', 'hiperbole'], hiperbole: ['metafora', 'comparacion', 'personificacion'],
  onomatopeya: ['aliteracion', 'personificacion', 'hiperbole'], anafora: ['aliteracion', 'polisindeton', 'hiperbaton'],
  aliteracion: ['anafora', 'onomatopeya', 'epiteto'], epiteto: ['sinestesia', 'metafora', 'hiperbaton'],
  hiperbaton: ['antitesis', 'epiteto', 'anafora'], antitesis: ['paradoja', 'oximoron', 'comparacion'],
  interrogacion: ['hiperbole', 'antitesis', 'anafora'], paradoja: ['antitesis', 'oximoron', 'metafora'],
  oximoron: ['antitesis', 'paradoja', 'sinestesia'], sinestesia: ['epiteto', 'metafora', 'oximoron'],
  metonimia: ['metafora', 'comparacion', 'sinestesia'], polisindeton: ['asindeton', 'anafora', 'aliteracion'],
  asindeton: ['polisindeton', 'anafora', 'hiperbaton'],
}

// ── Palabras del texto ────────────────────────────────────────────────────
// El texto se trocea en palabras (con su puntuación pegada) y «/» de verso.
// Cada palabra se puede tocar. `marcadas` son las que forman la figura.
export function palabras(e) {
  const out = []
  const re = /\S+/g
  let m
  while ((m = re.exec(e.t))) out.push({ t: m[0], ini: m.index, fin: m.index + m[0].length, verso: m[0] === '/' })
  return out
}
export function marcadas(e) {
  const ps = palabras(e)
  const sel = new Set()
  let desde = 0
  for (const mk of e.marca) {
    const i = e.t.indexOf(mk, desde)
    if (i < 0) continue
    const f = i + mk.length
    ps.forEach((p, k) => { if (!p.verso && p.ini < f && p.fin > i) sel.add(k) })
    desde = f
  }
  return [...sel].sort((a, b) => a - b)
}
// Vale si se tocan al menos el 60 % de las palabras de la figura y como mucho
// una de sobra (dos si la figura es larga).
export function cazaBien(e, tocadas) {
  const T = marcadas(e)
  const aciertos = tocadas.filter(k => T.includes(k)).length
  const sobran = tocadas.length - aciertos
  return aciertos >= Math.ceil(T.length * 0.6) && sobran <= (T.length >= 4 ? 2 : 1)
}

export const NIVELES = {
  facil:   { tipos: ['caza', 'caza', 'empareja'], hasta: 'facil', parejas: 3, pista: true },
  medio:   { tipos: ['caza', 'caza', 'empareja'], hasta: 'medio', parejas: 3, pista: false },
  dificil: { tipos: ['caza', 'empareja'], hasta: 'dificil', parejas: 4, pista: false },
}
const disponibles = hasta => Object.keys(FIGURAS).filter(f => ORDEN.indexOf(FIGURAS[f].nivel) <= ORDEN.indexOf(hasta))

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
    if (intento < 20 && r.ejemplos.some(i => recientes.includes(i))) continue
    recientes.push(...r.ejemplos)
    while (recientes.length > 8) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const disp = disponibles(cfg.hasta)
  const tipo = elige(rand, cfg.tipos)
  const pool = EJEMPLOS.map((e, i) => i).filter(i => disp.includes(EJEMPLOS[i].fig))
  const nuevas = pool.filter(i => FIGURAS[EJEMPLOS[i].fig].nivel === cfg.hasta)
  if (tipo === 'caza') {
    const i = elige(rand, nivel !== 'facil' && rand() < 0.6 ? nuevas : pool)
    return { id: ++seq, nivel, tipo, ejemplos: [i], pista: cfg.pista, bueno: 'caza:ok' }
  }
  // empareja: versos de figuras distintas, y ninguno tiene también la figura de otro.
  for (;;) {
    const elegidos = []
    for (const i of baraja(rand, pool)) {
      const e = EJEMPLOS[i]
      if (elegidos.some(j => EJEMPLOS[j].fig === e.fig || EJEMPLOS[j].tambien.includes(e.fig) || e.tambien.includes(EJEMPLOS[j].fig))) continue
      elegidos.push(i)
      if (elegidos.length === cfg.parejas) break
    }
    if (elegidos.length < cfg.parejas) continue
    return { id: ++seq, nivel, tipo, ejemplos: elegidos, figuras: baraja(rand, elegidos.map(i => EJEMPLOS[i].fig)), bueno: 'empareja:0' }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: caza → «caza:ok» o «caza:no»; empareja → «empareja:fallos».
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export const ejemplo = r => EJEMPLOS[r.ejemplos[0]]
export const enunciado = r => (r.tipo === 'caza'
  ? `Toca las palabras que forman la ${FIGURAS[ejemplo(r).fig].nombre.toLowerCase()}`
  : 'Une cada texto con su figura literaria')

export function explicacion(r) {
  if (r.tipo === 'empareja') return r.ejemplos.map(i => `«${EJEMPLOS[i].marca.slice(0, 3).join(' … ')}»: ${FIGURAS[EJEMPLOS[i].fig].nombre.toLowerCase()}`).join(' · ') + '.'
  const e = ejemplo(r)
  const f = FIGURAS[e.fig]
  const tambien = e.tambien.length ? ` Este texto también tiene ${e.tambien.map(x => FIGURAS[x].nombre.toLowerCase()).join(' y ')}.` : ''
  return `${f.nombre}: ${f.def} Aquí, en «${e.marca.join(' … ')}».${tambien}`
}

// Trozos del texto marcando las palabras de la figura (en orden de aparición).
export function trozos(e) {
  const out = []
  let resto = e.t
  for (const m of e.marca) {
    const i = resto.indexOf(m)
    if (i < 0) continue
    if (i > 0) out.push([resto.slice(0, i), false])
    out.push([m, true])
    resto = resto.slice(i + m.length)
  }
  if (resto) out.push([resto, false])
  return out
}

// Para los buscadores y el examen en texto: «¿qué figura hay?», con falsas que
// no estén en el texto (ni la principal ni las de `tambien`).
export function schemaQuestion(r) {
  const e = ejemplo(r)
  const vale = f => f !== e.fig && !e.tambien.includes(f)
  const falsas = [...new Set([...CONFUNDE[e.fig], ...Object.keys(FIGURAS)].filter(vale))].slice(0, 3)
  return {
    question: `«${e.t}» ¿Qué figura literaria hay aquí?`,
    correctAnswer: FIGURAS[e.fig].nombre,
    wrongAnswers: falsas.map(f => FIGURAS[f].nombre),
  }
}
