// Circuito Cerrado — lógica pura (sin React). La usan el juego
// (src/pages/CircuitoCerrado.jsx) y el examen (CircuitoCerradoExamen.jsx).
//
// El reto: dado un circuito ya dibujado (batería + interruptor(es) +
// bombilla(s)), predecir ANTES de comprobar cómo va a brillar cada
// bombilla. No es solo encendida/apagada — igual que en la vida real, una
// bombilla en serie con otra brilla más TENUE que si estuviera sola (se
// reparten la misma pila), mientras que en paralelo cada rama recibe la
// pila entera y brilla a tope. Ese contraste es el concepto que se pone a
// prueba, no solo "¿pasa corriente sí o no?".
//
//   apagada   — no le llega corriente (interruptor abierto en su camino, o
//               cualquiera en su mismo lazo en serie lo está)
//   tenue     — le llega corriente pero repartida con otra bombilla del
//               mismo lazo en serie
//   brillante — le llega toda la corriente de la pila: sola en su lazo, o
//               en su propia rama en paralelo
//
// Cuatro esquemas fijos, de menor a mayor complejidad. La fórmula de cada
// bombilla está escrita a mano por esquema (no hay un solver genérico de
// circuitos): el espacio es pequeño y cerrado, y así el porqué de cada
// resultado es trazable línea a línea.
//
//   simple   — 1 interruptor + 1 bombilla en un único lazo. Sola en su
//              lazo, nunca puede salir "tenue": o brilla a tope o no
//              brilla. El único factor es el interruptor. (Primaria)
//   serie    — 1 interruptor + 2 bombillas en el MISMO lazo: si el
//              interruptor está abierto, las dos se apagan (no hay camino
//              alternativo); si no, las dos brillan TENUE — comparten la
//              misma pila. (ESO)
//   paralelo — 1 interruptor (en el tronco común) + 2 bombillas en ramas
//              independientes: cada una brilla a tope si el interruptor
//              está cerrado (su rama recibe la pila entera). (ESO)
//   mixto    — una bombilla "tronco" en serie con el interruptor principal
//              — brilla tenue cuando funciona, porque reparte corriente
//              con lo que viene detrás — que después se reparte en dos
//              ramas en paralelo (una con su propio interruptor): esas
//              SÍ pueden brillar a tope, cada una en su propia rama, pero
//              solo si el tronco está encendido primero.
//              (Bachillerato)

const TYPE_POOLS = {
  facil:   ['simple'],
  medio:   ['serie', 'paralelo'],
  dificil: ['mixto'],
}

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]
// Interruptor: sesgado a más veces cerrado que abierto — un circuito
// siempre abierto es menos instructivo (nunca hay nada que predecir bien).
const cerrado = rand => rand() < 0.6

function genSimple(rand) {
  const c1 = cerrado(rand)
  return {
    tipo: 'simple',
    bombillas: [{ id: 'b1', estado: c1 ? 'brillante' : 'apagada' }],
    interruptores: [{ id: 'i1', cerrado: c1 }],
  }
}

function genSerie(rand) {
  const c1 = cerrado(rand)
  // En serie: el interruptor abierto apaga las DOS (no hay camino
  // alternativo). Si está cerrado, las dos reparten la misma pila → tenue,
  // nunca a tope.
  const estado = c1 ? 'tenue' : 'apagada'
  return {
    tipo: 'serie',
    bombillas: [
      { id: 'b1', estado },
      { id: 'b2', estado },
    ],
    interruptores: [{ id: 'i1', cerrado: c1 }],
  }
}

function genParalelo(rand) {
  const c1 = cerrado(rand)
  // En paralelo: el interruptor del tronco corta a las dos por igual; la
  // que recibe corriente lo hace entera — siempre a tope, nunca tenue.
  return {
    tipo: 'paralelo',
    bombillas: [
      { id: 'b1', estado: c1 ? 'brillante' : 'apagada' },
      { id: 'b2', estado: c1 ? 'brillante' : 'apagada' },
    ],
    interruptores: [{ id: 'i1', cerrado: c1 }],
  }
}

function genMixto(rand) {
  const c1 = cerrado(rand)
  const c2 = cerrado(rand)
  const tronco = c1
  return {
    tipo: 'mixto',
    bombillas: [
      // El tronco reparte corriente con lo que venga detrás (las dos ramas):
      // cuando funciona, siempre tenue, nunca a tope.
      { id: 'b1', estado: tronco ? 'tenue' : 'apagada' },
      // Las ramas, en cambio, reciben la pila entera cada una: a tope si
      // llega corriente hasta ellas, apagada si no.
      { id: 'b2', estado: tronco && c2 ? 'brillante' : 'apagada' },
      { id: 'b3', estado: tronco ? 'brillante' : 'apagada' },
    ],
    interruptores: [
      { id: 'i1', cerrado: c1 },
      { id: 'i2', cerrado: c2 },
    ],
  }
}

const GENERADORES = { simple: genSimple, serie: genSerie, paralelo: genParalelo, mixto: genMixto }

// `uiDiff`: 'facil' | 'medio' | 'dificil' (el juego elige esto directamente;
// el examen lo obtiene de LEVELS[].difficulty — ver CircuitoCerradoExamen.jsx,
// mismo mapeo primaria→facil/eso→medio/bachillerato→dificil que Fuerza Neta).
export function genRound(uiDiff, rand = Math.random) {
  const pool = TYPE_POOLS[uiDiff] || ['simple']
  return GENERADORES[pick(pool, rand)](rand)
}

// ¿Coincide la predicción del jugador con la realidad? `prediccion` es un
// Map id de bombilla → 'apagada'|'tenue'|'brillante' (las que no se han
// tocado cuentan como 'apagada', su estado inicial). Todo o nada, igual que
// Órbita/Balanza: la pregunta de fondo es binaria — ¿entiendes este
// circuito o no? — no "cuánto" de él.
export function isCorrect(round, prediccion) {
  return round.bombillas.every(b => (prediccion.get(b.id) ?? 'apagada') === b.estado)
}
