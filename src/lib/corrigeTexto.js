// ── Corrige el Texto: motor de corrección de textos ─────────────────────────
//
// Todo lo que ya había de ortografía en Tuthor enseña la palabra sola y te
// dice qué buscar: Pon la Tilde parte la palabra en sílabas, y los exámenes de
// b/v y g/j preguntan por una palabra concreta. Corregir es otra cosa: nadie
// te señala dónde está el fallo ni de qué tipo es, y hay que decidir palabra
// por palabra si esa está bien puesta. Eso es lo que hace este juego.
//
// TRES DECISIONES QUE LO SOSTIENEN
//
// 1. Los errores se SORTEAN en cada partida. Con veinte textos fijos y tres
//    por partida, siete partidas bastan para haberlo visto todo, y a partir de
//    ahí ya no se corrige: se recuerda dónde estaba el fallo. Cada texto se
//    guarda BIEN escrito y con una lista de trampas posibles; cada partida
//    estropea unas cuantas y deja el resto en paz.
//
// 2. Marcar una palabra correcta cuesta lo mismo que dejarse un error. Sin
//    eso, la estrategia ganadora es marcar las ochenta palabras del texto sin
//    leer ninguna, y el juego se rompe solo.
//
// 3. Se dice CUÁNTOS errores hay. Sin el número, el jugador nunca sabe si ha
//    terminado o le falta uno, y con el reloj corriendo eso es angustia, no
//    lectura. Es lo que hace cualquier ejercicio de corrección en papel.
//
// La puntuación es una sola cifra: el tiempo. Cada error sin marcar y cada
// palabra correcta marcada de más suman diez segundos al tiempo final. Así un
// lector lento pero minucioso puede ganar a uno rápido y descuidado, que es
// justo el hábito que interesa al corregir.
//
// ── TRES IDIOMAS, NO UNA TRADUCCIÓN ─────────────────────────────────────────
//
// El juego existe en castellano, inglés y catalán, y ninguno es la traducción
// del otro: cada lengua se escribe mal a su manera. En inglés no hay tildes ni
// b/v, pero hay their/there, consonantes que se doblan y letras que no suenan.
// En catalán hay ela geminada, accents oberts i tancats y una b/v que reparte
// al revés que la castellana. Por eso hay un banco por idioma (data/
// corrigeTexto{Es,En,Ca}.js) con sus propias familias de falta, y este motor
// es el mismo para los tres.

import * as ES from '../data/corrigeTextoEs'
import * as EN from '../data/corrigeTextoEn'
import * as CA from '../data/corrigeTextoCa'

export const BANCOS = { es: ES, en: EN, ca: CA }
export const IDIOMA_IDS = Object.keys(BANCOS)

// Todo lo que sale de aquí pasa por bancoDe, que no puede devolver undefined:
// un idioma desconocido cae al castellano en vez de reventar a mitad de
// partida, que es lo que pasaría con BANCOS[idioma].TEXTOS.
export const bancoDe = idioma => BANCOS[idioma] ?? BANCOS.es
export const familiasDe = idioma => bancoDe(idioma).FAMILIAS
export const nivelesDe = idioma => bancoDe(idioma).NIVELES
export const textosDe = idioma => bancoDe(idioma).TEXTOS
export const nivelIdsDe = idioma => Object.keys(nivelesDe(idioma))

export const TEXTOS_POR_PARTIDA = 3
// Lo que suma al tiempo final cada error sin marcar Y cada palabra correcta
// marcada de más. El mismo número para los dos casos a propósito: una sola
// regla que explicar, y ninguna de las dos formas de fallar sale más barata.
//
// DIEZ y no cinco, y esto lo decidió un test, no el gusto. Con cinco, leer
// deprisa dejándose la mitad de las faltas puntuaba MÁS que leer bien: un
// repaso cuidadoso de un texto cuesta cerca de un minuto y saca sus cinco
// fallos, o sea unos doce segundos de lectura por fallo encontrado; si
// saltárselo cuesta cinco, sale a cuenta no leer. La penalización tiene que
// ser mayor que el tiempo que se ahorra no mirando, o la prisa gana y el juego
// enseña justo lo contrario de lo que pretende. Hay test que lo comprueba.
export const PENALIZACION = 10
// De aquí se resta el tiempo final para tener puntos (más es mejor), porque el
// leaderboard ordena por `score` descendente y no sabe de segundos. Siete
// minutos es de sobra para tres textos incluso leyendo despacio.
export const TIEMPO_TOPE = 420

const rng = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const shuffle = arr => {
  const c = [...arr]
  for (let i = c.length - 1; i > 0; i--) {
    const j = rng(0, i)
    ;[c[i], c[j]] = [c[j], c[i]]
  }
  return c
}

// Qué cuenta como palabra en los tres idiomas. Además de las letras acentuadas
// hacen falta dos cosas que el castellano no usa:
//   · el apóstrofo, para que "don't" y "l'hivern" sean UNA palabra. Sin él,
//     "don't" se parte en "don" y "t" y la trampa de apóstrofo no se puede
//     poner sobre un solo trozo.
//   · el punt volat, para que "col·legi" no se rompa en dos.
// Todo lo demás (espacios, comas, dos puntos) queda como separador intocable,
// así que la puntuación del texto no se puede marcar ni estropear.
const RE_PALABRA = /[A-Za-zÀ-ÖØ-öø-ÿ·]+(?:['’][A-Za-zÀ-ÖØ-öø-ÿ]+)*/g

// Parte el texto en piezas alternando palabra y separador. Se trabaja SIEMPRE
// sobre esta lista y nunca sobre la cadena: una palabra puede repetirse, y un
// replace() de cadena estropearía la primera aparición en vez de la que toca.
export function tokenizar(texto) {
  const piezas = []
  let ultimo = 0
  for (const m of texto.matchAll(RE_PALABRA)) {
    if (m.index > ultimo) piezas.push({ palabra: false, s: texto.slice(ultimo, m.index) })
    piezas.push({ palabra: true, s: m[0] })
    ultimo = m.index + m[0].length
  }
  if (ultimo < texto.length) piezas.push({ palabra: false, s: texto.slice(ultimo) })
  return piezas
}

// Trampas de este texto que valen para este nivel.
export function trampasUsables(texto, nivel, idioma = 'es') {
  const niveles = nivelesDe(idioma)
  const fams = niveles[nivel]?.familias ?? niveles.medio.familias
  return texto.trampas.filter(([, , fam]) => fams.includes(fam))
}

// La familia de "palabra bien escrita puesta donde no va" se llama distinto en
// cada banco porque el nombre sale en pantalla, pero es la misma idea y la que
// define el nivel difícil.
const HOMOFONOS = ['homofono', 'homofon']

// Una ronda = un texto ya estropeado, con sus piezas listas para pintar.
export function generarRonda(textoId, nivel = 'medio', idioma = 'es') {
  const textos = textosDe(idioma)
  const niveles = nivelesDe(idioma)
  const texto = textos.find(t => t.id === textoId) ?? textos[0]
  const cfg = niveles[nivel] ?? niveles.medio
  const usables = trampasUsables(texto, nivel, idioma)

  // En difícil entra SIEMPRE un homófono si el texto tiene alguno. Si se
  // dejara al azar puro, la mitad de los textos difíciles no traerían ninguno
  // y el nivel sería el medio con un fallo más, que no es lo prometido.
  const homofonos = usables.filter(([, , fam]) => HOMOFONOS.includes(fam))
  const forzada = cfg.familias.some(f => HOMOFONOS.includes(f)) && homofonos.length > 0
    ? [shuffle(homofonos)[0]]
    : []
  const resto = shuffle(usables.filter(t => !forzada.includes(t)))
  const elegidas = [...forzada, ...resto].slice(0, Math.min(cfg.errores, usables.length))

  const piezas = tokenizar(texto.texto)
  const palabras = piezas.map((p, i) => (p.palabra ? i : -1)).filter(i => i >= 0)
  const tokens = piezas.map(p => ({ ...p, error: false, correcta: null, familia: null }))

  for (const [correcta, mal, familia] of elegidas) {
    const i = palabras.find(k => piezas[k].s === correcta)
    if (i == null) continue
    tokens[i] = { palabra: true, s: mal, error: true, correcta, familia }
  }

  return {
    id: texto.id, emoji: texto.emoji, titulo: texto.titulo,
    nivel, idioma, tokens,
    nErrores: tokens.filter(t => t.error).length,
  }
}

// Tres textos distintos. `evitar` deja fuera los de la partida anterior para
// que jugar dos seguidas no repita el mismo texto con otros fallos.
export function generarPartida(nivel = 'medio', evitar = [], idioma = 'es') {
  const ids = textosDe(idioma).map(t => t.id)
  const libres = ids.filter(id => !evitar.includes(id))
  const pool = libres.length >= TEXTOS_POR_PARTIDA ? libres : ids
  return shuffle(pool).slice(0, TEXTOS_POR_PARTIDA).map(id => generarRonda(id, nivel, idioma))
}

// El tiempo que cuenta: el del reloj más la penalización de todo lo que no se
// vio y de todo lo que se marcó sin estar mal.
export function tiempoFinal({ segundos = 0, sinMarcar = 0, deMas = 0 } = {}) {
  return segundos + PENALIZACION * (sinMarcar + deMas)
}

export function puntosDe(final) {
  return Math.max(0, Math.round(TIEMPO_TOPE - final))
}

export function formatoTiempo(segundos) {
  const s = Math.max(0, Math.round(segundos))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
