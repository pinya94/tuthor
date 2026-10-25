// Coma a Coma (lengua · la puntuación, Primaria y ESO). Solo castellano.
//
// Una frase con un hueco (▢) y cuatro signos para elegir: coma, punto y
// coma, dos puntos, punto… o nada. En las preguntas: ¿ ? y ¡ ! a la vez.
// En los niveles altos también: «¿por qué va ahí ese signo?».
//
// La puntuación tiene muchas comas opcionales (tras una subordinada corta,
// antes de «por eso»…). Por eso el banco está hecho a mano y cada frase
// trae sus opciones falsas escritas a mano: nunca se ofrece como «mal» un
// signo que la RAE admita en ese hueco. Las frases no se traducen: son el
// material (ver memoria «Español: material vs prosa»).

// [regla, frase con ▢, signo bueno, signos malos, nivel]
// En las de pareja (¿?, ¡!) el signo es «¿|?» y la frase lleva dos ▢.
const F = (regla, t, ok, mal, nivel) => ({ regla, t, ok, mal, nivel })
export const FRASES = [
  // Vocativo
  F('vocativo', 'Ven aquí▢ Juan.', ',', [';', ':', ''], 'facil'),
  F('vocativo', 'Marta▢ ¿has terminado los deberes?', ',', [';', ':', ''], 'facil'),
  F('vocativo', 'Gracias por venir▢ amigos.', ',', [';', ':', ''], 'facil'),
  F('vocativo', 'Oye▢ Luis, ¿me prestas el boli?', ',', [';', ':', ''], 'medio'),
  // Enumeración
  F('enumeracion', 'Compré pan▢ leche y huevos.', ',', [';', ':', ''], 'facil'),
  F('enumeracion', 'Compré pan, leche▢ y huevos.', '', [',', ';', ':'], 'facil'),
  F('enumeracion', 'En el estuche llevo lápices, gomas▢ y una regla.', '', [',', ';', ':'], 'facil'),
  F('enumeracion', 'Mi hermana toca el piano▢ la guitarra y el violín.', ',', [';', ':', ''], 'facil'),
  // Preguntas y exclamaciones (pareja)
  F('interrogacion', '▢Vienes mañana a la fiesta▢', '¿|?', ['|?', '¡|!', '¿|.'], 'facil'),
  F('interrogacion', '▢Cuántos años tienes▢', '¿|?', ['|?', '¡|!', '¿|.'], 'facil'),
  F('interrogacion', '▢Dónde has dejado las llaves▢', '¿|?', ['|?', '¡|!', '¿|.'], 'facil'),
  F('interrogacion', 'Juan, ▢sabes dónde está mi móvil▢', '¿|?', ['|?', '¡|!', '¿|.'], 'medio'),
  F('exclamacion', '▢Qué frío hace hoy▢', '¡|!', ['|!', '¿|?', '¡|?'], 'facil'),
  F('exclamacion', '▢Qué bonito es este paisaje▢', '¡|!', ['|!', '¿|?', '¡|?'], 'facil'),
  // Sí y no al responder
  F('respuesta', 'Sí▢ me gustaría ir contigo.', ',', [';', ':', ''], 'facil'),
  F('respuesta', 'No▢ gracias, ya he comido.', ',', [';', ':', ''], 'facil'),
  // Interjección
  F('interjeccion', '¡Ay▢ qué daño me he hecho!', ',', [';', ':', ''], 'facil'),
  // Conectores
  F('conector', 'Estudió mucho. Sin embargo▢ suspendió el examen.', ',', [';', ':', ''], 'medio'),
  F('conector', 'Ha llovido toda la noche. Por tanto▢ el partido se suspende.', ',', [';', ':', ''], 'medio'),
  F('conector', 'Es un mamífero, es decir▢ da de mamar a sus crías.', ',', [';', '.', ''], 'medio'),
  F('conector', 'Además▢ tienes que traer el libro de lectura.', ',', [';', ':', ''], 'medio'),
  // Pero y sino
  F('adversativa', 'Quería ir al concierto▢ pero no quedaban entradas.', ',', [':', '.', ''], 'medio'),
  F('adversativa', 'No es rojo▢ sino granate.', ',', [':', ';', ''], 'medio'),
  // Nada entre sujeto y verbo, ni entre verbo y complemento
  F('sujeto', 'Los alumnos que aprobaron el examen▢ recibieron un diploma.', '', [',', ';', ':'], 'medio'),
  F('sujeto', 'El perro de mis vecinos▢ ladra toda la noche.', '', [',', ';', ':'], 'facil'),
  F('sujeto', 'Todos los que quieran venir a la excursión▢ deben traer la autorización firmada.', '', [',', ';', ':'], 'dificil'),
  F('complemento', 'Le regalé▢ un libro a mi hermana.', '', [',', ';', ':'], 'medio'),
  // Incisos, aposiciones y explicativas
  F('inciso', 'Madrid▢ la capital de España, tiene más de tres millones de habitantes.', ',', [':', ';', ''], 'medio'),
  F('inciso', 'Cervantes, autor del Quijote▢ murió en 1616.', ',', [':', ';', ''], 'medio'),
  F('inciso', 'El concierto, según dicen▢ fue un éxito.', ',', [':', ';', ''], 'medio'),
  F('inciso', 'Mi profesora▢ que es muy simpática, nos puso un examen sorpresa.', ',', [':', ';', ''], 'dificil'),
  F('especificativa', 'Los coches que estaban mal aparcados▢ fueron multados.', '', [',', ';', ':'], 'dificil'),
  // Dos puntos
  F('dospuntos', 'Tengo tres hermanos▢ Ana, Luis y Pedro.', ':', [';', '.', ''], 'medio'),
  F('dospuntos', 'Querido Juan▢ Te escribo desde Roma.', ':', [',', ';', ''], 'medio'),
  F('dospuntos', 'Mi abuela siempre dice▢ «Más vale tarde que nunca».', ':', [',', ';', ''], 'medio'),
  F('dospuntos', 'Ingredientes▢ harina, huevos, azúcar y leche.', ':', [',', ';', ''], 'medio'),
  // Punto y coma, y coma del verbo omitido
  F('puntoycoma', 'Unos prefieren la playa▢ otros, la montaña.', ';', [':', '.', ''], 'dificil'),
  F('puntoycoma', 'En verano vamos a la playa▢ en invierno, a la sierra.', ';', [':', '.', ''], 'dificil'),
  F('elipsis', 'Juan estudia Medicina; Ana▢ Derecho.', ',', [':', ';', ''], 'dificil'),
  F('elipsis', 'Yo pedí pescado; mi hermano▢ carne.', ',', [':', ';', ''], 'dificil'),
  // Lugar y fecha
  F('fecha', 'Sevilla▢ 12 de octubre de 2026', ',', [':', ';', ''], 'medio'),
]

export const REGLAS = {
  vocativo: { nombre: 'Vocativo', expl: 'El vocativo (el nombre de la persona a la que se habla) se separa siempre con coma, vaya al principio, en medio o al final.' },
  enumeracion: { nombre: 'Enumeración', expl: 'Los elementos de una enumeración se separan con comas, pero el último va unido con y, sin coma delante.' },
  interrogacion: { nombre: 'Signos de interrogación', expl: 'En español la pregunta se abre con ¿ y se cierra con ?, justo donde empieza y acaba la pregunta, aunque no sea al principio de la frase.' },
  exclamacion: { nombre: 'Signos de exclamación', expl: 'La exclamación se abre con ¡ y se cierra con !: en español los dos signos son obligatorios.' },
  respuesta: { nombre: 'Sí o no al responder', expl: 'Sí y no, cuando responden a algo, van seguidos de coma.' },
  interjeccion: { nombre: 'Interjección', expl: 'La interjección (ay, oh, uf) se separa con coma del resto de la exclamación.' },
  conector: { nombre: 'Conector', expl: 'Los conectores como sin embargo, por tanto, además o es decir van seguidos de coma.' },
  adversativa: { nombre: 'Pero y sino', expl: 'Delante de pero y sino, que oponen dos ideas, se escribe coma.' },
  sujeto: { nombre: 'Sujeto y verbo', expl: 'Nunca se escribe coma entre el sujeto y el verbo, aunque el sujeto sea largo: es una de las faltas más comunes.' },
  complemento: { nombre: 'Verbo y complemento', expl: 'Entre el verbo y sus complementos no se escribe coma.' },
  inciso: { nombre: 'Inciso o aposición', expl: 'Lo que interrumpe la frase para aclarar algo (un inciso, una aposición o una oración explicativa) va entre dos comas.' },
  especificativa: { nombre: 'Relativa especificativa', expl: 'Si la oración con que dice cuáles (solo los coches mal aparcados), no lleva comas; con comas significaría que todos estaban mal aparcados.' },
  dospuntos: { nombre: 'Dos puntos', expl: 'Los dos puntos anuncian lo que viene: una enumeración, una cita textual o el texto de una carta tras el saludo (nunca coma tras «Querido Juan»).' },
  puntoycoma: { nombre: 'Punto y coma', expl: 'El punto y coma separa dos oraciones relacionadas cuando dentro ya hay comas (aquí, la del verbo que no se repite).' },
  elipsis: { nombre: 'Verbo omitido', expl: 'Cuando no se repite un verbo que ya se ha dicho, su lugar lo ocupa una coma: «Ana, Derecho» = «Ana estudia Derecho».' },
  fecha: { nombre: 'Lugar y fecha', expl: 'Entre el lugar y la fecha, como en el encabezamiento de una carta, se escribe coma.' },
}
// Reglas que hablan de un signo que sí está (para «¿por qué va ese signo?»).
const CON_SIGNO = Object.keys(REGLAS).filter(k => !['sujeto', 'complemento', 'especificativa', 'enumeracion'].includes(k))

export const NIVELES = {
  facil:   { tipos: ['signo'], frases: ['facil'] },
  medio:   { tipos: ['signo', 'signo', 'signo', 'regla'], frases: ['facil', 'medio'] },
  dificil: { tipos: ['signo', 'signo', 'regla'], frases: ['medio', 'dificil'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []

// La ronda clásica (una frase con opciones): la usan las mecánicas y el
// texto del schema (ver «Mecánicas» al final).
function genUna(nivel, { rand = Math.random, tipo: tipoFijo = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = tipoFijo ?? elige(rand, cfg.tipos)
  const pool = FRASES.map((f, i) => [f, i]).filter(([f]) => cfg.frases.includes(f.nivel) && (tipo === 'signo' || CON_SIGNO.includes(f.regla)))
  const [f, i] = elige(rand, pool)
  const base = { id: ++seq, nivel, tipo, frase: i }
  if (tipo === 'signo') return { ...base, bueno: f.ok, opciones: baraja(rand, [f.ok, ...f.mal]) }
  const otras = baraja(rand, CON_SIGNO.filter(k => k !== f.regla)).slice(0, 3)
  return { ...base, bueno: f.regla, opciones: baraja(rand, [f.regla, ...otras]) }
}


// ── Textos ────────────────────────────────────────────────────────────────
export const frase = r => FRASES[r.frase]
// La frase con el signo puesto en el hueco (o los dos de la pareja).
export function conSigno(t, signo) {
  const [a, b] = signo.includes('|') ? signo.split('|') : [signo, signo]
  let n = 0
  return t.replace(/▢/g, () => (n++ === 0 ? a : b))
}
export const NOMBRE_SIGNO = { ',': 'coma', ';': 'punto y coma', ':': 'dos puntos', '.': 'punto', '': 'ningún signo' }

export function textoOpcion(o, r) {
  if (r.tipo === 'regla') return REGLAS[o].nombre
  if (o.includes('|')) { const [a, b] = o.split('|'); return `${a || '–'} … ${b || '–'}` }
  return o === '' ? 'Nada' : `${o}  (${NOMBRE_SIGNO[o]})`
}

function enunciadoViejo(r) {
  return r.tipo === 'regla' ? '¿Por qué va ahí ese signo?' : frase(r).ok.includes('|') ? '¿Qué signos van en los huecos?' : '¿Qué signo va en el hueco?'
}

function explicacionVieja(r) {
  const f = frase(r)
  return `${REGLAS[f.regla].expl} → ${conSigno(f.t, f.ok)}`
}

function schemaVieja(r) {
  const f = frase(r)
  const t = r.tipo === 'regla' ? conSigno(f.t, f.ok) : f.t.replace(/▢/g, ' ___ ')
  return {
    question: `${t} — ${enunciadoViejo(r)}`,
    correctAnswer: textoOpcion(r.bueno, r),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genUna sigue dando la ronda y el texto del schema):
//   puntua    (signo)  tres frases con huecos; tocando cada hueco se cambia el
//                      signo. Cada hueco solo ofrece su signo bueno y sus tres
//                      malos escritos a mano: nunca un signo que la RAE admita.
//   empareja  (regla)  tres frases con el signo puesto, cada una con su regla
export const MECANICA_DE_TIPO = { signo: 'puntua', regla: 'empareja' }

export function genRonda(nivel = 'facil', opts = {}) {
  const rand = opts.rand ?? Math.random
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  for (let intento = 0; ; intento++) {
    const r = { ...genUna(nivel, { rand, tipo }), mecanica: MECANICA_DE_TIPO[tipo] }
    const pool = FRASES.map((f, i) => [f, i]).filter(([f]) => cfg.frases.includes(f.nivel) && (tipo === 'signo' || CON_SIGNO.includes(f.regla)))
    // Tres frases de reglas distintas (en emparejar, además, cada regla una vez)
    const items = []
    for (const [f, i] of baraja(rand, pool)) {
      if (items.length === 3) break
      if (items.some(j => FRASES[j].regla === f.regla)) continue
      items.push(i)
    }
    if (items.length < 3) continue
    if (intento < 20 && items.some(i => recientes.includes(i))) continue
    recientes.push(...items)
    while (recientes.length > 9) recientes.shift()
    r.items = items
    if (tipo === 'signo') r.signos = Object.fromEntries(items.map(i => [i, baraja(rand, [FRASES[i].ok, ...FRASES[i].mal])]))
    else r.reglas = baraja(rand, items.map(i => FRASES[i].regla))
    return r
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

export function respuestaBuena(r) {
  if (r.mecanica === 'puntua') return 'puntua:0'
  if (r.mecanica === 'empareja') return 'empareja:0'
  return r.bueno
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  return o === respuestaBuena(r)
}
export const isCorrect = esCorrecta

export function enunciado(r) {
  if (r.mecanica === 'puntua') return 'Puntúa las frases: toca cada hueco hasta poner el signo que va (o ninguno)'
  if (r.mecanica === 'empareja') return '¿Por qué va ahí cada signo? Une cada frase con su regla'
  return enunciadoViejo(r)
}

export function explicacion(r) {
  if (r.mecanica) return r.items.map(i => `${REGLAS[FRASES[i].regla].nombre}: ${conSigno(FRASES[i].t, FRASES[i].ok)}`).join(' · ')
  return explicacionVieja(r)
}

export function schemaQuestion(r) {
  return schemaVieja(r)
}
