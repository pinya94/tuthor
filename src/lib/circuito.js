// Circuito Cerrado — lógica pura (sin React). La usan el juego
// (src/pages/CircuitoCerrado.jsx) y el examen (CircuitoCerradoExamen.jsx).
//
// El reto: dado un circuito ya dibujado (batería + interruptores + bombillas),
// predecir ANTES de comprobar QUÉ BOMBILLAS SE ENCIENDEN. Solo hay dos estados
// —encendida o apagada—, que es justo lo que dice el currículo (Primaria:
// circuito abierto/cerrado; ESO: asociación en serie y paralelo). No inventamos
// niveles de brillo: una bombilla luce si le llega corriente por un camino
// cerrado, y no luce si su camino está abierto… o si un interruptor en paralelo
// la cortocircuita y la corriente la esquiva.
//
// Lo que se aprende, por dificultad:
//   · Fácil (Primaria): el interruptor cierra el circuito. Dos en serie (hacen
//     falta los dos, Y) o dos caminos en paralelo (basta uno, O).
//   · Medio (ESO): serie vs paralelo. En serie un interruptor las controla a
//     todas; en paralelo, cada rama con su interruptor es INDEPENDIENTE (una
//     puede lucir y la otra no).
//   · Difícil (ESO/Bach): recorridos con trampa — un interruptor en paralelo
//     con una bombilla la cortocircuita (la corriente la esquia), y troncos
//     que reparten hacia ramas independientes.
//
// La fórmula de cada bombilla está escrita a mano por esquema (no hay solver
// genérico): el espacio es pequeño y cerrado, y así el porqué de cada resultado
// es trazable línea a línea.

const TYPE_POOLS = {
  facil:   ['simple', 'serie-and', 'paralelo-or'],
  medio:   ['serie-dos', 'paralelo-tronco', 'paralelo-ramas'],
  dificil: ['bypass', 'serie-bypass', 'mixto'],
}

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]
// Interruptor: sesgado a más veces cerrado que abierto — un circuito siempre
// abierto es menos instructivo (nunca hay nada que predecir bien).
const cerrado = rand => rand() < 0.6
const E = on => (on ? 'encendida' : 'apagada')
const sw = (id, c) => ({ id, cerrado: c })

// ── Fácil ──────────────────────────────────────────────────────────────────
function genSimple(rand) {
  const c1 = cerrado(rand)
  return { tipo: 'simple', bombillas: [{ id: 'b1', estado: E(c1) }], interruptores: [sw('i1', c1)] }
}

// Dos interruptores EN SERIE con una bombilla (lógica Y): solo enciende si LOS
// DOS están cerrados.
function genSerieAnd(rand) {
  const c1 = cerrado(rand), c2 = cerrado(rand)
  return { tipo: 'serie-and', bombillas: [{ id: 'b1', estado: E(c1 && c2) }], interruptores: [sw('i1', c1), sw('i2', c2)] }
}

// Dos interruptores EN PARALELO (dos caminos) hacia una bombilla (lógica O):
// basta con que UNO esté cerrado para que llegue corriente.
function genParaleloOr(rand) {
  const c1 = cerrado(rand), c2 = cerrado(rand)
  return { tipo: 'paralelo-or', bombillas: [{ id: 'b1', estado: E(c1 || c2) }], interruptores: [sw('i1', c1), sw('i2', c2)] }
}

// ── Medio ──────────────────────────────────────────────────────────────────
// Dos bombillas EN SERIE con un solo interruptor: se encienden o apagan LAS DOS
// a la vez (un solo camino).
function genSerieDos(rand) {
  const c1 = cerrado(rand)
  const e = E(c1)
  return { tipo: 'serie-dos', bombillas: [{ id: 'b1', estado: e }, { id: 'b2', estado: e }], interruptores: [sw('i1', c1)] }
}

// Dos bombillas EN PARALELO con un interruptor común en el tronco: las controla
// a las dos a la vez (contraste con "una por rama").
function genParaleloTronco(rand) {
  const c1 = cerrado(rand)
  const e = E(c1)
  return { tipo: 'paralelo-tronco', bombillas: [{ id: 'b1', estado: e }, { id: 'b2', estado: e }], interruptores: [sw('i1', c1)] }
}

// Dos bombillas EN PARALELO, cada rama con SU interruptor: independientes — una
// puede lucir y la otra no. La idea central de "en paralelo".
function genParaleloRamas(rand) {
  const c1 = cerrado(rand), c2 = cerrado(rand)
  return {
    tipo: 'paralelo-ramas',
    bombillas: [{ id: 'b1', estado: E(c1) }, { id: 'b2', estado: E(c2) }],
    interruptores: [sw('i1', c1), sw('i2', c2)],
  }
}

// ── Difícil ─────────────────────────────────────────────────────────────────
// Un interruptor en PARALELO con la bombilla (bypass): al cerrarlo, la corriente
// la esquiva por el atajo y la bombilla se APAGA aunque el circuito esté cerrado.
// b1 luce solo si el principal está cerrado Y el atajo abierto.
function genBypass(rand) {
  const c1 = cerrado(rand) // principal
  const c2 = cerrado(rand) // atajo en paralelo con b1
  return { tipo: 'bypass', bombillas: [{ id: 'b1', estado: E(c1 && !c2) }], interruptores: [sw('i1', c1), sw('i2', c2)] }
}

// Dos bombillas en serie, con un atajo que rodea SOLO a la segunda: si el atajo
// se cierra, la corriente esquiva b2 (se apaga) pero sigue pasando por b1.
function genSerieBypass(rand) {
  const c1 = cerrado(rand) // principal
  const c2 = cerrado(rand) // atajo alrededor de b2
  return {
    tipo: 'serie-bypass',
    bombillas: [{ id: 'b1', estado: E(c1) }, { id: 'b2', estado: E(c1 && !c2) }],
    interruptores: [sw('i1', c1), sw('i2', c2)],
  }
}

// Tronco + dos ramas: el tronco (i1) debe estar cerrado para que llegue
// corriente; luego cada rama depende de su propio camino (b3 directo, b2 tras i2).
function genMixto(rand) {
  const c1 = cerrado(rand), c2 = cerrado(rand)
  return {
    tipo: 'mixto',
    bombillas: [
      { id: 'b1', estado: E(c1) },        // en el tronco
      { id: 'b2', estado: E(c1 && c2) },  // rama con interruptor
      { id: 'b3', estado: E(c1) },        // rama directa
    ],
    interruptores: [sw('i1', c1), sw('i2', c2)],
  }
}

const GENERADORES = {
  simple: genSimple, 'serie-and': genSerieAnd, 'paralelo-or': genParaleloOr,
  'serie-dos': genSerieDos, 'paralelo-tronco': genParaleloTronco, 'paralelo-ramas': genParaleloRamas,
  bypass: genBypass, 'serie-bypass': genSerieBypass, mixto: genMixto,
}

// `uiDiff`: 'facil' | 'medio' | 'dificil'. El juego lo elige directamente; el
// examen lo obtiene de LEVELS[].difficulty (mismo mapeo primaria→facil,
// eso→medio, bachillerato→dificil que Fuerza Neta).
export function genRound(uiDiff, rand = Math.random) {
  const pool = TYPE_POOLS[uiDiff] || ['simple']
  return GENERADORES[pick(pool, rand)](rand)
}

// ¿Coincide la predicción del jugador con la realidad? `prediccion` es un Map
// id de bombilla → 'apagada'|'encendida' (las no tocadas cuentan como
// 'apagada', su estado inicial). Todo o nada: ¿entiendes este circuito o no?
export function isCorrect(round, prediccion) {
  return round.bombillas.every(b => (prediccion.get(b.id) ?? 'apagada') === b.estado)
}

// El porqué de cada circuito: la lección que lo acompaña, por esquema. Es lo que
// convierte un fallo en aprendizaje. La página la traduce y la muestra al
// revelar. Clave estable = round.tipo.
export function motivoRonda(round) {
  return round.tipo
}

// Textos compartidos por el juego y el examen (datos, no lógica de React):
// viven aquí, junto a la física que describen, para no duplicarlos.
export const MOTIVOS = {
  simple:            { es: 'El interruptor cierra el circuito: cerrado, la bombilla enciende; abierto, se apaga.', en: 'The switch closes the circuit: closed, the bulb lights; open, it goes off.', ca: 'L\'interruptor tanca el circuit: tancat, la bombeta encén; obert, s\'apaga.' },
  'serie-and':       { es: 'Dos interruptores en serie: la bombilla solo enciende si LOS DOS están cerrados.', en: 'Two switches in series: the bulb only lights if BOTH are closed.', ca: 'Dos interruptors en sèrie: la bombeta només encén si TOTS DOS estan tancats.' },
  'paralelo-or':     { es: 'Dos caminos en paralelo: basta con que UN interruptor esté cerrado para que encienda.', en: 'Two parallel paths: just ONE switch closed is enough for it to light.', ca: 'Dos camins en paral·lel: n\'hi ha prou que UN interruptor estigui tancat perquè encengui.' },
  'serie-dos':       { es: 'Dos bombillas en serie con un interruptor: se encienden o se apagan LAS DOS a la vez.', en: 'Two bulbs in series with one switch: BOTH turn on or off together.', ca: 'Dues bombetes en sèrie amb un interruptor: s\'encenen o s\'apaguen TOTES DUES alhora.' },
  'paralelo-tronco': { es: 'Dos bombillas en paralelo con un interruptor común: las controla a las dos a la vez.', en: 'Two bulbs in parallel with a shared switch: it controls both at once.', ca: 'Dues bombetes en paral·lel amb un interruptor comú: les controla totes dues alhora.' },
  'paralelo-ramas':  { es: 'Cada bombilla en su rama con su interruptor: son independientes, una puede lucir y la otra no.', en: 'Each bulb in its own branch with its own switch: independent — one can light while the other stays off.', ca: 'Cada bombeta a la seva branca amb el seu interruptor: independents, una pot lluir i l\'altra no.' },
  bypass:            { es: 'El interruptor en paralelo cortocircuita la bombilla: si lo cierras, la corriente la esquiva y se apaga.', en: 'The parallel switch short-circuits the bulb: if you close it, current bypasses the bulb and it goes off.', ca: 'L\'interruptor en paral·lel curtcircuita la bombeta: si el tanques, el corrent l\'esquiva i s\'apaga.' },
  'serie-bypass':    { es: 'El atajo rodea la segunda bombilla: al cerrarlo, la corriente la esquiva (se apaga), pero la primera sigue encendida.', en: 'The shortcut goes around the second bulb: closing it, current bypasses it (off), but the first stays on.', ca: 'La drecera envolta la segona bombeta: en tancar-la, el corrent l\'esquiva (s\'apaga), però la primera segueix encesa.' },
  mixto:             { es: 'El tronco debe estar cerrado para que llegue corriente; luego cada rama depende de su propio interruptor.', en: 'The trunk must be closed for current to arrive; then each branch depends on its own switch.', ca: 'El tronc ha d\'estar tancat perquè arribi corrent; després cada branca depèn del seu propi interruptor.' },
}

export const ESTADO_LABELS = {
  apagada:   { es: 'apagada', en: 'off', ca: 'apagada' },
  encendida: { es: 'encendida', en: 'on', ca: 'encesa' },
}
