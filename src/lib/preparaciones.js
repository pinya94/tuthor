import { PREPARACIONES, GRUPOS } from '../data/preparaciones'

// Lógica de "¿qué es lo señalado?": sale una foto real con una zona rodeada
// y hay que decir qué es, entre varias opciones.
//
// La diferencia con el modo célula (microscopio.js) es a propósito: allí se
// PULSA el orgánulo, y se puede porque cada uno es una forma del SVG. Sobre
// una foto no hay formas, así que la zona viene ya señalada y lo que se
// evalúa es reconocerla. Es también lo que hace que valga una foto imperfecta
// o algo desenfocado: con opciones, lo que se pregunta es qué es eso, no
// dónde está exactamente.
//
// Todo aquí es puro (sin React): entra una semilla, sale la ronda.

export const OPCIONES_POR_RONDA = 4

export function preparacionesDe(grupoId) {
  if (!grupoId || grupoId === 'todas') return PREPARACIONES
  return PREPARACIONES.filter(p => p.grupo === grupoId)
}

// Los grupos que de verdad tienen preparaciones detrás, en el orden de
// GRUPOS. Uno vacío no debe salir como filtro: sería un botón que no lleva
// a ninguna parte.
export function gruposDisponibles() {
  return Object.keys(GRUPOS).filter(id => PREPARACIONES.some(p => p.grupo === id))
}

const nombreEn = (zona, lang) => zona.nombre[lang] ?? zona.nombre.es

// Los distractores salen PRIMERO de la misma preparación (las otras partes
// del mismo bicho), y solo si no llegan a cuatro se completan con zonas de
// otras. Preguntar por la antena de un piojo ofreciendo "cristal cúbico" no
// es una pregunta: la respuesta se adivina sin saber nada.
export function opcionesPara(preparacion, zona, lang = 'es') {
  const correcta = nombreEn(zona, lang)
  const vistos = new Set([correcta])
  const otras = []

  for (const z of preparacion.zonas) {
    const n = nombreEn(z, lang)
    if (!vistos.has(n)) { vistos.add(n); otras.push(n) }
  }
  for (const p of PREPARACIONES) {
    if (p.id === preparacion.id) continue
    for (const z of p.zonas) {
      const n = nombreEn(z, lang)
      if (!vistos.has(n)) { vistos.add(n); otras.push(n) }
    }
  }

  return [correcta, ...otras.slice(0, OPCIONES_POR_RONDA - 1)]
}

// Una ronda: qué foto, qué zona se señala y con qué opciones. `aleatorio`
// se inyecta (por defecto Math.random) para poder fijarlo en los tests y
// que la ronda sea reproducible.
export function nuevaRonda(grupoId = 'todas', lang = 'es', aleatorio = Math.random) {
  const pool = preparacionesDe(grupoId)
  if (pool.length === 0) return null

  const preparacion = pool[Math.floor(aleatorio() * pool.length)]
  const zona = preparacion.zonas[Math.floor(aleatorio() * preparacion.zonas.length)]

  return { preparacion, zona, opciones: barajar(opcionesPara(preparacion, zona, lang), aleatorio) }
}

// Fisher-Yates. Sin esto la respuesta correcta sería siempre la primera
// opción y el juego se resolvería sin mirar la foto.
export function barajar(lista, aleatorio = Math.random) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}
