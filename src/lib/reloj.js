// ¿Qué hora es? — lógica del juego del reloj analógico. La usan el juego
// (src/pages/RelojHoras.jsx) y el examen (RelojHorasExamen.jsx).
//
// Se da una hora (en digital y en palabras) y el jugador coloca las manecillas
// del reloj. Objetivo: leer y poner la hora, medida del tiempo de Primaria.
//   · Fácil:   en punto y y media (:00, :30).
//   · Medio:   los cuartos (:00, :15, :30, :45).
//   · Difícil: cualquier minuto de 5 en 5.

const DIFS = {
  facil:   { minutos: [0, 30] },
  medio:   { minutos: [0, 15, 30, 45] },
  dificil: { minutos: Array.from({ length: 12 }, (_, i) => i * 5) }, // 0,5,…,55
}

const pick = (arr, rand) => arr[Math.floor(rand() * arr.length)]

export function nuevaHora(difId = 'facil', rand = Math.random) {
  const dif = DIFS[difId] ?? DIFS.facil
  const hora = 1 + Math.floor(rand() * 12)   // 1..12
  const minuto = pick(dif.minutos, rand)
  return { hora, minuto }
}

export function formatoDigital(hora, minuto) {
  return `${hora}:${String(minuto).padStart(2, '0')}`
}

// La hora "siguiente" para las expresiones con "menos / to" (12 → 1).
const siguiente = h => (h === 12 ? 1 : h + 1)

function horaPalabra(h, lang) {
  if (lang === 'en') return `${h}`
  if (h === 1) return lang === 'ca' ? 'la una' : 'la una'
  return lang === 'ca' ? `les ${h}` : `las ${h}`
}

// La hora en palabras. El digital se muestra siempre como ancla, así que esto
// refuerza el vocabulario (y cuarto / y media / menos cuarto…).
export function enPalabras(hora, minuto, lang = 'es') {
  const H = horaPalabra(hora, lang)
  const sig = siguiente(hora)
  const Hsig = horaPalabra(sig, lang)
  const resto = 60 - minuto

  if (lang === 'en') {
    if (minuto === 0) return `${H} o'clock`
    if (minuto === 15) return `quarter past ${H}`
    if (minuto === 30) return `half past ${H}`
    if (minuto === 45) return `quarter to ${sig}`
    if (minuto < 30) return `${minuto} past ${H}`
    return `${resto} to ${sig}`
  }
  if (lang === 'ca') {
    if (minuto === 0) return `${H} en punt`
    if (minuto === 15) return `${H} i quart`
    if (minuto === 30) return `${H} i mitja`
    if (minuto === 45) return `${Hsig} menys quart`
    if (minuto < 30) return `${H} i ${minuto}`
    return `${Hsig} menys ${resto}`
  }
  // es
  if (minuto === 0) return `${H} en punto`
  if (minuto === 15) return `${H} y cuarto`
  if (minuto === 30) return `${H} y media`
  if (minuto === 45) return `${Hsig} menos cuarto`
  if (minuto < 30) return `${H} y ${minuto}`
  return `${Hsig} menos ${resto}`
}

// ¿La hora puesta coincide con la pedida? La hora del reloj es 1..12; el 0 del
// slot horario equivale a las 12.
export function esCorrecta(objetivo, puesta) {
  return objetivo.hora === puesta.hora && objetivo.minuto === puesta.minuto
}

// Paso de minutos permitido al arrastrar, según la dificultad: en fácil y medio
// se ajusta de 5 en 5 (más fácil de clavar); en difícil, de 5 en 5 también,
// porque las horas objetivo son múltiplos de 5.
export function pasoMinuto() {
  return 5
}
