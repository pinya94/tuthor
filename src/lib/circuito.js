// Circuito Cerrado — lógica pura (sin React). La usan el juego
// (src/pages/CircuitoCerrado.jsx) y el examen (CircuitoCerradoExamen.jsx).
//
// El reto: dado un circuito ya dibujado (pila + interruptores + bombillas),
// predecir ANTES de comprobar QUÉ BOMBILLAS SE ENCIENDEN. Dos estados,
// encendida o apagada, que es lo que pide el currículo (Primaria: circuito
// abierto/cerrado; ESO: serie y paralelo).
//
// Antes había 9 esquemas fijos dibujados a mano (3 por nivel) y en una partida
// se repetían enseguida. Ahora cada circuito es un ÁRBOL serie/paralelo que se
// genera al azar a partir de plantillas por nivel —con el orden de los tramos,
// el de las ramas y el estado de cada interruptor sorteados— y lo resuelve un
// solver de verdad. Mismo concepto, cientos de circuitos distintos.
//
// Nodos del árbol:
//   { t: 'b', id }              bombilla
//   { t: 'f', id }              bombilla fundida (no conduce; solo en difícil)
//   { t: 's', id, cerrado }     interruptor
//   { t: 'ser', hijos: [...] }  tramos en serie (uno detrás de otro)
//   { t: 'par', hijos: [...] }  ramas en paralelo
//
// Física (componentes ideales):
//   · una bombilla luce si le llega corriente por un camino cerrado;
//   · en serie, un tramo abierto (interruptor abierto o bombilla fundida) corta
//     todo el camino;
//   · en paralelo, si una rama es un ATAJO cerrado sin bombillas, la corriente
//     va toda por él y las demás ramas se quedan sin corriente (cortocircuito);
//     si no, cada rama cerrada recibe corriente por su cuenta.
// El generador descarta los circuitos que cortocircuitan la propia pila.

// ── Solver ─────────────────────────────────────────────────────────────────
export function conduce(n) {
  if (n.t === 'b') return true
  if (n.t === 'f') return false
  if (n.t === 's') return n.cerrado
  if (n.t === 'ser') return n.hijos.every(conduce)
  return n.hijos.some(conduce)
}

// ¿Es un camino cerrado SIN resistencia (solo cable e interruptores cerrados)?
export function atajo(n) {
  if (n.t === 'b' || n.t === 'f') return false
  if (n.t === 's') return n.cerrado
  if (n.t === 'ser') return n.hijos.every(atajo)
  return n.hijos.some(atajo)
}

// Estado de cada bombilla y, si está apagada, por qué: 'abierto' (no hay
// camino cerrado) o 'corto' (un atajo de al lado se lleva la corriente).
export function resolver(arbol) {
  const estados = {}, causas = {}
  function reparte(n, recibe, causa) {
    if (n.t === 'b') {
      estados[n.id] = recibe ? 'encendida' : 'apagada'
      if (!recibe) causas[n.id] = causa
      return
    }
    if (n.t === 'f' || n.t === 's') return
    if (n.t === 'ser') { n.hijos.forEach(h => reparte(h, recibe, causa)); return }
    if (!recibe) { n.hijos.forEach(h => reparte(h, false, causa)); return }
    const hayAtajo = n.hijos.some(atajo)
    for (const h of n.hijos) {
      if (hayAtajo) reparte(h, atajo(h), 'corto')
      else reparte(h, conduce(h), 'abierto')
    }
  }
  reparte(arbol, conduce(arbol), 'abierto')
  return { estados, causas }
}

// ── Generador ──────────────────────────────────────────────────────────────
const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]
const mezcla = (arr, rand) => [...arr].sort(() => rand() - 0.5)

// Plantillas con los elementos como letras: B bombilla, S interruptor,
// F fundida; ser(...) y par(...) los agrupan. Al instanciarlas se baraja el
// orden de los tramos y de las ramas, y cada S se sortea abierto/cerrado.
const ser = (...h) => ({ t: 'ser', hijos: h })
const par = (...h) => ({ t: 'par', hijos: h })
const B = { t: 'b' }, S = { t: 's' }, F = { t: 'f' }

const PLANTILLAS = {
  // Primaria: un camino; el interruptor lo abre o lo cierra. Con dos, en serie
  // hacen falta los dos (Y); en paralelo basta uno (O).
  facil: [
    ser(S, B), ser(S, S, B), ser(S, B, B), ser(B, S, B), ser(par(S, S), B), ser(S, B, S),
    ser(par(S, S), B, B),
  ],
  // ESO: serie frente a paralelo; ramas independientes y troncos comunes.
  medio: [
    par(ser(S, B), ser(S, B)), ser(S, par(B, B)), ser(S, par(ser(S, B), B)),
    par(ser(S, B), ser(S, B), ser(S, B)), ser(B, par(ser(S, B), ser(S, B))),
    ser(S, B, par(B, ser(S, B))), ser(par(S, S), par(B, B)), ser(S, par(ser(B, B), ser(S, B))),
    par(ser(S, B, B), ser(S, B)), ser(S, par(B, ser(S, B), ser(S, B))),
  ],
  // Difícil: atajos que cortocircuitan, fundidas que cortan y caminos
  // anidados.
  dificil: [
    ser(S, par(B, S)), ser(S, B, par(B, S)), ser(S, par(ser(B, B), S)),
    ser(S, par(B, ser(S, B), S)), ser(B, par(ser(B, S), ser(S, B)), B),
    par(ser(S, B, F), ser(S, B)), ser(S, par(ser(B, F), B)), ser(S, B, par(ser(S, B), S)),
    ser(par(ser(S, B), S), par(B, ser(S, B))), ser(S, par(ser(B, par(B, S)), ser(S, B))),
    par(ser(S, B, B), ser(S, par(B, S))),
  ],
}

function instancia(p, rand, cont) {
  if (p.t === 'b') return { t: 'b', id: `b${++cont.b}` }
  if (p.t === 'f') return { t: 'f', id: `f${++cont.f}` }
  // Interruptor sesgado a cerrado: un circuito siempre abierto enseña poco.
  if (p.t === 's') return { t: 's', id: `i${++cont.s}`, cerrado: rand() < 0.6 }
  return { t: p.t, hijos: mezcla(p.hijos, rand).map(h => instancia(h, rand, cont)) }
}

// Las bombillas se numeran en el orden en que se dibujan (izquierda a derecha,
// arriba abajo), para que «la 2» de la explicación sea la que se ve como 2.
function renumera(arbol) {
  let b = 0, s = 0, f = 0
  ;(function rec(n) {
    if (n.t === 'b') n.id = `b${++b}`
    else if (n.t === 's') n.id = `i${++s}`
    else if (n.t === 'f') n.id = `f${++f}`
    else n.hijos.forEach(rec)
  })(arbol)
}

const hojas = (n, t) => (n.t === t ? [n] : n.hijos ? n.hijos.flatMap(h => hojas(h, t)) : [])

export const firma = n => (n.t === 's' ? (n.cerrado ? 'S' : 's') : n.t === 'b' ? 'B' : n.t === 'f' ? 'F' : `${n.t}(${n.hijos.map(firma).join(',')})`)

export function genRound(uiDiff, rand = Math.random) {
  const plantillas = PLANTILLAS[uiDiff] || PLANTILLAS.facil
  for (let intento = 0; ; intento++) {
    const arbol = instancia(pick(plantillas, rand), rand, { b: 0, s: 0, f: 0 })
    renumera(arbol)
    if (atajo(arbol)) continue // la pila en cortocircuito: no es un circuito que se monte
    const { estados, causas } = resolver(arbol)
    const bombillas = hojas(arbol, 'b').map(b => ({ id: b.id, estado: estados[b.id], causa: causas[b.id] }))
    // Casi nunca todo apagado: predecir «nada luce» siempre enseña poco.
    if (bombillas.every(b => b.estado === 'apagada') && rand() < 0.7 && intento < 20) continue
    return {
      tipo: 'arbol',
      nivel: uiDiff,
      arbol,
      bombillas,
      interruptores: hojas(arbol, 's').map(s => ({ id: s.id, cerrado: s.cerrado })),
      fundidas: hojas(arbol, 'f').map(f => f.id),
    }
  }
}

// ¿Coincide la predicción del jugador con la realidad? `prediccion` es un Map
// id de bombilla → 'apagada'|'encendida' (las no tocadas cuentan como
// 'apagada'). Todo o nada: ¿entiendes este circuito o no?
export function isCorrect(round, prediccion) {
  return round.bombillas.every(b => (prediccion.get(b.id) ?? 'apagada') === b.estado)
}

// El porqué, bombilla a bombilla, con el número que se ve en el dibujo.
export function explicacion(round, l = 'es') {
  const tx = (es, en, ca) => ({ es, en, ca })[l] ?? es
  const hayFundida = round.fundidas?.length > 0
  return round.bombillas.map(b => {
    const n = b.id.slice(1)
    if (b.estado === 'encendida') return tx(`${n}: encendida, tiene un camino cerrado de un polo de la pila al otro.`, `${n}: on, it has a closed path from one battery terminal to the other.`, `${n}: encesa, té un camí tancat d’un pol de la pila a l’altre.`)
    if (b.causa === 'corto') return tx(`${n}: apagada, un atajo cerrado sin bombillas a su lado se lleva toda la corriente (cortocircuito).`, `${n}: off, a closed shortcut with no bulbs beside it takes all the current (short circuit).`, `${n}: apagada, una drecera tancada sense bombetes al seu costat s’emporta tot el corrent (curtcircuit).`)
    return hayFundida
      ? tx(`${n}: apagada, su camino está cortado por un interruptor abierto o por una bombilla fundida.`, `${n}: off, its path is broken by an open switch or a blown bulb.`, `${n}: apagada, el seu camí està tallat per un interruptor obert o per una bombeta fosa.`)
      : tx(`${n}: apagada, hay un interruptor abierto en su camino.`, `${n}: off, there is an open switch on its path.`, `${n}: apagada, hi ha un interruptor obert al seu camí.`)
  })
}

export const ESTADO_LABELS = {
  apagada:   { es: 'apagada', en: 'off', ca: 'apagada' },
  encendida: { es: 'encendida', en: 'on', ca: 'encesa' },
}
