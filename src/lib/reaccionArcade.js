// ── Reacción: motor del modo arcade (roguelike) ─────────────────────────────
// En vez de vidas, un único reloj compartido para toda la partida: empieza
// bajo, cada acierto suma poco tiempo y cada fallo resta mucho más de lo
// que se gana con un acierto (para que los fallos pesen de verdad). La
// partida acaba cuando el reloj llega a 0.
//
// Los casos se reparten como un mazo que se baraja entero al empezar y se
// van sacando sin reposición: nunca se repite ninguno. Si se llega a
// resolver el mazo entero, la partida termina ahí — no tiene sentido
// repreguntar los mismos casos.
//
// Cada cierto número de aciertos se ofrece elegir 1 de 3 mejoras (mismo
// patrón que el modo roguelike de Acércate: src/pages/AcercateRoguelike.jsx).

export const RELOJ_INICIAL_MS = 30000
export const ACIERTO_MS = 6000
export const FALLO_MS = 25000
export const MEJORA_CADA = 5

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Mazo nuevo barajado entero (un único pase, sin reposición). Los casos
// "ambiguos" (proporcionalidad, sin opción peligrosa) se apartan de las
// primeras rondas para no confundir al principio, sin dejar de barajar
// el resto.
export function barajarMazo(casos) {
  const mazo = shuffle(casos)
  const ULTIMA_RONDA_TEMPRANA = Math.min(5, mazo.length - 1)
  for (let i = 0; i <= ULTIMA_RONDA_TEMPRANA; i++) {
    if (mazo[i].ambiguo && mazo.length > ULTIMA_RONDA_TEMPRANA + 1) {
      const j = ULTIMA_RONDA_TEMPRANA + 1 + Math.floor(Math.random() * (mazo.length - ULTIMA_RONDA_TEMPRANA - 1))
      ;[mazo[i], mazo[j]] = [mazo[j], mazo[i]]
    }
  }
  return mazo
}

// Puntos por caso acertado: base + racha (+50% cada 5 aciertos, hasta x2) +
// multiplicador de mejoras elegidas en la run.
export function puntosPorCaso(racha, multiplicador = 1) {
  const multRacha = 1 + Math.min(2, Math.floor(racha / 5)) * 0.5
  return Math.round(100 * multRacha * multiplicador)
}

export const MEJORAS = [
  {
    id: 'tiempo', emoji: '⏱️',
    label: { es: '+5 segundos', en: '+5 seconds', ca: '+5 segons' },
    desc: { es: 'Añade 5s al reloj ahora mismo', en: 'Adds 5s to the clock right now', ca: 'Afegeix 5s al rellotge ara mateix' },
  },
  {
    id: 'escudo', emoji: '🛡️',
    label: { es: 'Segunda oportunidad', en: 'Second chance', ca: 'Segona oportunitat' },
    desc: { es: 'El próximo fallo no resta tiempo', en: 'The next mistake won\'t cost you time', ca: 'El proper error no resta temps' },
  },
  {
    id: 'multiplicador', emoji: '✨',
    label: { es: '×1.3 puntos', en: '×1.3 points', ca: '×1.3 punts' },
    desc: { es: 'Multiplica tus puntos el resto de la partida', en: 'Multiplies your points for the rest of the run', ca: 'Multiplica els teus punts la resta de la partida' },
  },
]
