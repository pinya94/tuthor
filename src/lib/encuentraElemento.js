// Encuentra el Elemento — lógica pura (sin React). La usan el juego
// (src/pages/EncuentraElemento.jsx) y el examen (EncuentraElementoExamen.jsx).
//
// El reto: dada una pista sobre un elemento, tocar SU celda en la tabla
// periódica. A diferencia de Rayos X (un punto en una silueta, sin más
// referencia visual), aquí cada celda YA enseña su símbolo y su número
// atómico — como una tabla periódica de verdad — así que la pista no puede
// limitarse a repetir esos mismos datos sin más: tiene que obligar a
// TRADUCIR (nombre → símbolo) o a RAZONAR la posición (categoría + grupo +
// periodo → celda), no solo a escanear visualmente.
//
// Los datos de los 71 elementos curados (periodos 1-6 completos, símbolo,
// nombre es/en/ca, Z, grupo, periodo, categoría, niveles) viven en
// data/tablaperiodica.js — fuente única que ya usa el examen de teoría
// (TablaPeriodicaExamen.jsx). Este juego no inventa una segunda tabla de
// datos, solo una forma nueva de preguntar sobre la misma.
import { ELEMENTOS, TIPOS } from '../data/tablaperiodica'

// facil/medio/dificil (dificultad de la UI, la elige el jugador o la fija
// LEVELS del examen) → qué subconjunto de niveles curriculares se juega.
// Reutiliza el mismo campo `niveles` que ya filtra TablaPeriodicaExamen.
const NIVEL_POR_DIFICULTAD = { facil: 'primaria', medio: 'eso', dificil: 'bachillerato' }

// Qué tipos de pista entran en cada dificultad. 'nombre' es la más directa
// (traducir nombre→símbolo) y está en las tres; 'z' (número atómico) se
// añade en ESO; 'categoria' (categoría + grupo + periodo, hay que RAZONAR
// la posición en la tabla, no solo traducir un dato) solo en Bachillerato.
const TIPOS_PISTA = {
  facil:   ['nombre'],
  medio:   ['nombre', 'z'],
  dificil: ['nombre', 'z', 'categoria'],
}

function poolPara(uiDiff) {
  const nivel = NIVEL_POR_DIFICULTAD[uiDiff] || 'primaria'
  return ELEMENTOS.filter(e => e.niveles.includes(nivel))
}

// Pista para un elemento ya elegido — la usa genRound() de aquí abajo, que
// es lo que consumen arcade y examen por igual (con reposición: contra el
// reloj, un mazo sin repetir se agotaría antes de que acabase el tiempo en
// fácil, que solo tiene 12 elementos).
export function genPista(elemento, uiDiff, rand = Math.random) {
  const pool = TIPOS_PISTA[uiDiff] || ['nombre']
  return { elemento, clueType: pool[Math.floor(rand() * pool.length)] }
}

// ¿La celda tocada es la del elemento de la pista?
export function isCorrectGuess(pista, elementoTocado) {
  return elementoTocado?.symbol === pista.elemento.symbol
}

// Texto de la pista en el idioma activo. Centralizado aquí (no en cada
// página) porque arcade y examen tienen que describir la MISMA pista de la
// MISMA forma — si cada uno la redactara a mano podrían acabar diciendo
// cosas distintas para el mismo `clueType`.
const NOMBRE_KEY = { es: 'nombre', en: 'nombreEn', ca: 'nombreCa' }
const GRUPO_PERIODO_LABEL = {
  es: { grupo: 'Grupo', periodo: 'Periodo' },
  en: { grupo: 'Group', periodo: 'Period' },
  ca: { grupo: 'Grup', periodo: 'Període' },
}

export function pistaTexto(pista, l) {
  const lang = l === 'en' ? 'en' : l === 'ca' ? 'ca' : 'es'
  const { elemento, clueType } = pista
  if (clueType === 'z') return `Z = ${elemento.z}`
  if (clueType === 'categoria') {
    const tipo = TIPOS[elemento.tipo]
    const tipoLabel = lang === 'en' ? tipo.labelEn : lang === 'ca' ? tipo.labelCa : tipo.label
    const gp = GRUPO_PERIODO_LABEL[lang]
    return `${tipoLabel} · ${gp.grupo} ${elemento.grupo} · ${gp.periodo} ${elemento.periodo}`
  }
  return elemento[NOMBRE_KEY[lang]] // 'nombre'
}

// Ronda con reposición: cada llamada es un sorteo independiente (elemento +
// pista), mismo patrón que Balanza/Circuito Cerrado. La usan tanto el
// arcade (contrarreloj: no puede agotar un mazo) como el examen (10
// preguntas vía MechanicExam).
export function genRound(uiDiff, rand = Math.random) {
  const pool = poolPara(uiDiff)
  const elemento = pool[Math.floor(rand() * pool.length)]
  return genPista(elemento, uiDiff, rand)
}

export function isCorrect(round, answer) {
  return isCorrectGuess(round, answer)
}
