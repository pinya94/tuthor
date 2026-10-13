// Señal a Señal (vida práctica · seguridad vial, Primaria y ESO).
//
// Dos mecánicas, ninguna de elegir texto:
//   monta      te dan el significado y construyes la señal eligiendo la FORMA
//              (marco) y el DIBUJO (símbolo); la señal se dibuja mientras la
//              montas. La bici sale con tres marcos distintos (peligro,
//              prohibición, obligación) y el peatón con dos: lo que se aprende
//              es justo lo que dice la forma y el color.
//   clasifica  salen cuatro señales y cada una se coloca en su tipo.
//
// Las situaciones de peatón, ciclista y pasajero viven en el examen de
// Seguridad Vial (data/seguridadVial.js): eran preguntas de test, no juego.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const tx = (o, l) => o[l] ?? o.es

export const TIPOS = {
  peligro: { nombre: T('Peligro', 'Warning', 'Perill'), forma: T('Triángulo blanco con borde rojo: avisa de un peligro que viene.', 'White triangle with a red border: it warns of a hazard ahead.', 'Triangle blanc amb vora vermella: avisa d’un perill que ve.') },
  prohibicion: { nombre: T('Prohibición', 'Prohibition', 'Prohibició'), forma: T('Círculo con borde rojo: prohíbe algo.', 'Circle with a red border: it forbids something.', 'Cercle amb vora vermella: prohibeix alguna cosa.') },
  obligacion: { nombre: T('Obligación', 'Mandatory', 'Obligació'), forma: T('Círculo azul: obliga a hacer algo.', 'Blue circle: it tells you what you must do.', 'Cercle blau: obliga a fer alguna cosa.') },
  indicacion: { nombre: T('Indicación', 'Information', 'Indicació'), forma: T('Cuadrado o rectángulo azul: informa.', 'Blue square or rectangle: it gives information.', 'Quadrat o rectangle blau: informa.') },
  prioridad: { nombre: T('Prioridad', 'Priority', 'Prioritat'), forma: T('Forma única (octógono de STOP, triángulo invertido): dice quién pasa primero.', 'Unique shape (STOP octagon, upside-down triangle): it says who goes first.', 'Forma única (octògon de STOP, triangle invertit): diu qui passa primer.') },
}
export const ORDEN_TIPOS = ['peligro', 'prohibicion', 'obligacion', 'indicacion', 'prioridad']

// Marcos: la forma y el color de fondo. `oscuro`: el símbolo va en blanco.
export const MARCOS = {
  peligro: { tipo: 'peligro', nombre: T('Triángulo de borde rojo', 'Red-bordered triangle', 'Triangle de vora vermella') },
  prohibicion: { tipo: 'prohibicion', nombre: T('Círculo de borde rojo', 'Red-bordered circle', 'Cercle de vora vermella') },
  prohibicionAzul: { tipo: 'prohibicion', oscuro: true, nombre: T('Círculo azul con borde rojo', 'Blue circle with a red border', 'Cercle blau amb vora vermella') },
  rojoLleno: { tipo: 'prohibicion', oscuro: true, nombre: T('Círculo todo rojo', 'Solid red circle', 'Cercle tot vermell') },
  obligacion: { tipo: 'obligacion', oscuro: true, nombre: T('Círculo azul', 'Blue circle', 'Cercle blau') },
  indicacion: { tipo: 'indicacion', oscuro: true, nombre: T('Cuadrado azul', 'Blue square', 'Quadrat blau') },
  octogono: { tipo: 'prioridad', oscuro: true, nombre: T('Octógono rojo', 'Red octagon', 'Octògon vermell') },
  ceda: { tipo: 'prioridad', nombre: T('Triángulo al revés', 'Upside-down triangle', 'Triangle del revés') },
}
export const SIMBOLOS = {
  curva: T('Curva', 'Bend', 'Corba'),
  peaton: T('Peatón', 'Pedestrian', 'Vianant'),
  semaforo: T('Semáforo', 'Traffic light', 'Semàfor'),
  bici: T('Bicicleta', 'Bicycle', 'Bicicleta'),
  n50: T('50', '50', '50'),
  n30: T('30', '30', '30'),
  flecha: T('Flecha', 'Arrow', 'Fletxa'),
  P: T('P', 'P', 'P'),
  H: T('H', 'H', 'H'),
  sinSalida: T('Calle cortada', 'Dead end', 'Carrer tallat'),
  barra: T('Una barra', 'One bar', 'Una barra'),
  aspa: T('Un aspa (X)', 'A cross (X)', 'Una creu (X)'),
  stop: T('STOP', 'STOP', 'STOP'),
  vacio: T('Nada', 'Nothing', 'Res'),
}

// [id, marco, símbolo, significado]
const S = (id, marco, simbolo, sig) => ({ id, marco, simbolo, tipo: MARCOS[marco].tipo, sig })
export const SENALES = [
  S('stop', 'octogono', 'stop', T('STOP: detenerse siempre y ceder el paso', 'STOP: always stop and give way', 'STOP: aturar-se sempre i cedir el pas')),
  S('ceda', 'ceda', 'vacio', T('Ceda el paso', 'Give way', 'Cediu el pas')),
  S('curva', 'peligro', 'curva', T('Peligro: curva hacia la derecha', 'Warning: bend to the right', 'Perill: corba cap a la dreta')),
  S('peatonesPeligro', 'peligro', 'peaton', T('Peligro: paso de peatones cerca', 'Warning: pedestrian crossing ahead', 'Perill: pas de vianants a prop')),
  S('semaforoPeligro', 'peligro', 'semaforo', T('Peligro: semáforos cerca', 'Warning: traffic lights ahead', 'Perill: semàfors a prop')),
  S('ciclistasPeligro', 'peligro', 'bici', T('Peligro: ciclistas', 'Warning: cyclists', 'Perill: ciclistes')),
  S('direccionProhibida', 'rojoLleno', 'barra', T('Dirección prohibida: no se puede entrar', 'No entry', 'Direcció prohibida: no s’hi pot entrar')),
  S('maxima50', 'prohibicion', 'n50', T('Velocidad máxima: 50 km/h', 'Maximum speed: 50 km/h', 'Velocitat màxima: 50 km/h')),
  S('noEstacionar', 'prohibicionAzul', 'barra', T('Estacionamiento prohibido (sí se puede parar un momento)', 'No parking (stopping briefly is allowed)', 'Estacionament prohibit (sí que es pot parar un moment)')),
  S('noParar', 'prohibicionAzul', 'aspa', T('Parada y estacionamiento prohibidos', 'No stopping or parking', 'Parada i estacionament prohibits')),
  S('noBicis', 'prohibicion', 'bici', T('Prohibido el paso a bicicletas', 'No cycling', 'Prohibit el pas a bicicletes')),
  S('derecha', 'obligacion', 'flecha', T('Obligatorio girar a la derecha', 'Turn right only', 'Obligatori girar a la dreta')),
  S('carrilBici', 'obligacion', 'bici', T('Vía reservada para bicicletas', 'Route for cycles only', 'Via reservada per a bicicletes')),
  S('minima30', 'obligacion', 'n30', T('Velocidad mínima: 30 km/h', 'Minimum speed: 30 km/h', 'Velocitat mínima: 30 km/h')),
  S('peatonesInd', 'indicacion', 'peaton', T('Aquí hay un paso de peatones', 'Pedestrian crossing here', 'Aquí hi ha un pas de vianants')),
  S('aparcamiento', 'indicacion', 'P', T('Aparcamiento', 'Parking', 'Aparcament')),
  S('hospital', 'indicacion', 'H', T('Hospital', 'Hospital', 'Hospital')),
  S('sinSalida', 'indicacion', 'sinSalida', T('Calle sin salida', 'No through road', 'Carrer sense sortida')),
]
export const senal = id => SENALES.find(x => x.id === id)
// La señal que forman un marco y un símbolo (o null si no existe).
export const senalDe = (marco, simbolo) => SENALES.find(x => x.marco === marco && x.simbolo === simbolo) ?? null

const BASICOS = ['peligro', 'prohibicion', 'obligacion', 'indicacion']
export const NIVELES = {
  // marcos que se ofrecen, cuántos dibujos, y si los marcos llevan su tipo escrito
  facil:   { tipos: ['monta', 'monta', 'clasifica'], marcos: BASICOS, simbolos: 3, pistas: true, clases: BASICOS },
  medio:   { tipos: ['monta', 'monta', 'clasifica'], marcos: [...BASICOS, 'prohibicionAzul'], simbolos: 4, pistas: false, clases: BASICOS },
  dificil: { tipos: ['monta', 'monta', 'clasifica'], marcos: Object.keys(MARCOS), simbolos: 6, pistas: false, clases: ORDEN_TIPOS },
}
export const senalesDe = nivel => {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  return SENALES.filter(x => cfg.marcos.includes(x.marco))
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo, pistas: cfg.pistas }
  const pool = senalesDe(nivel)
  if (tipo === 'clasifica') {
    // Cuatro señales, de al menos tres tipos distintos.
    for (;;) {
      const ids = baraja(rand, pool.filter(x => cfg.clases.includes(x.tipo))).slice(0, 4).map(x => x.id)
      if (new Set(ids.map(i => senal(i).tipo)).size >= 3) return { ...base, senales: ids, clases: cfg.clases }
    }
  }
  let sn
  for (let i = 0; i < 30; i++) { sn = elige(rand, pool); if (!recientes.includes(sn.id)) break }
  recientes.push(sn.id)
  if (recientes.length > 6) recientes.shift()
  // Dibujos: el bueno, los que comparten marco con él (es donde se confunde)
  // y otros. El vacío solo existe con el triángulo al revés.
  const vecinos = [...new Set(pool.filter(x => x.marco === sn.marco || x.simbolo === sn.simbolo).map(x => x.simbolo))]
  const otros = [...new Set(pool.map(x => x.simbolo))]
  const sims = [sn.simbolo]
  for (const x of [...baraja(rand, vecinos), ...baraja(rand, otros)]) {
    if (sims.length >= cfg.simbolos) break
    if (!sims.includes(x)) sims.push(x)
  }
  return { ...base, senal: sn.id, marcos: cfg.marcos, simbolos: baraja(rand, sims), bueno: `${sn.marco}:${sn.simbolo}` }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuestas: «marco:símbolo» en monta; «clasifica:fallos» en clasifica.
export function esCorrecta(r, o) {
  if (r.tipo === 'clasifica') return o === 'clasifica:0'
  return o === r.bueno
}

// ── Textos ────────────────────────────────────────────────────────────────
export function enunciado(r, l) {
  if (r.tipo === 'clasifica') return s(l, 'Coloca cada señal en su tipo', 'Put each sign in its type', 'Col·loca cada senyal al seu tipus')
  return s(l, 'Monta la señal que dice:', 'Build the sign that means:', 'Munta el senyal que diu:')
}
export function explicacion(r, l, o) {
  if (r.tipo === 'clasifica') {
    return r.senales.map(i => { const sn = senal(i); return `${tx(sn.sig, l)}: ${tx(TIPOS[sn.tipo].nombre, l).toLowerCase()}` }).join(' · ')
  }
  const sn = senal(r.senal)
  let t = `${tx(MARCOS[sn.marco].nombre, l)} + ${tx(SIMBOLOS[sn.simbolo], l).toLowerCase()}. ${tx(TIPOS[sn.tipo].forma, l)}`
  const [m, si] = String(o ?? '').split(':')
  const otra = m && si ? senalDe(m, si) : null
  if (otra && otra.id !== sn.id) t += ' ' + s(l, `La que has montado es otra: «${tx(otra.sig, l)}».`, `The one you built is a different sign: “${tx(otra.sig, l)}”.`, `La que has muntat és una altra: «${tx(otra.sig, l)}».`)
  return t
}
export function schemaQuestion(r, l) {
  if (r.tipo === 'clasifica') {
    const sn = senal(r.senales[0])
    return {
      question: s(l, `¿De qué tipo es la señal «${tx(sn.sig, l)}»?`, `What type is the “${tx(sn.sig, l)}” sign?`, `De quin tipus és el senyal «${tx(sn.sig, l)}»?`),
      correctAnswer: tx(TIPOS[sn.tipo].nombre, l),
      wrongAnswers: r.clases.filter(t => t !== sn.tipo).slice(0, 3).map(t => tx(TIPOS[t].nombre, l)),
    }
  }
  const sn = senal(r.senal)
  const forma = m => `${tx(MARCOS[m].nombre, l)} + ${tx(SIMBOLOS[sn.simbolo], l).toLowerCase()}`
  return {
    question: s(l, `¿Cómo es la señal «${tx(sn.sig, l)}»?`, `What does the “${tx(sn.sig, l)}” sign look like?`, `Com és el senyal «${tx(sn.sig, l)}»?`),
    correctAnswer: forma(sn.marco),
    wrongAnswers: r.marcos.filter(m => m !== sn.marco).slice(0, 3).map(forma),
  }
}
