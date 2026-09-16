// ── El mapa del temario ──────────────────────────────────────────────────────
// Materia → tema → actividades, para TODA la plataforma, derivado entero de
// los registros. Cero contenido escrito a mano aquí: si mañana se añade un
// tema a topicCatalog.js, aparece en el mapa sin tocar este fichero.
//
// Por qué existe: hasta ahora no había ninguna página que contestara "¿qué
// hay en Tuthor?". Los 137 exámenes eran invisibles —solo se llegaba a ellos
// desde la ficha de un tema, desde Google o desde una tarea del profesor— y
// las 223 combinaciones de tema y actividad no se veían juntas en ningún
// sitio. Un padre que quería saber de qué se examina su hijo no tenía dónde
// mirar, y un alumno no podía saber qué le faltaba.
//
// Las tres preguntas que tiene que contestar la misma página:
//   · padre    — ¿qué hay aquí?
//   · alumno   — ¿qué me falta?
//   · profesor — ¿qué puedo mandar?
//
// De dónde sale cada cosa:
//   · qué materias y temas existen     → topicCatalog.js (fuente única)
//   · cómo se llaman                   → SUBJECTS de statsAggregation.js
//   · a dónde lleva cada actividad     → topicRoute() de topicCatalog.js
//   · qué ha hecho ya el alumno        → stats/global (statsByCategory/Game)

import {
  TOPIC_CATALOG, TOPIC_SUBJECT_IDS, topicIds, topicFormats, topicRoute, topicTask,
} from './topicCatalog'
import { SUBJECTS } from './statsAggregation'
import { coincideNivel } from './nivel'

// ── Construcción ─────────────────────────────────────────────────────────────

// Un tema con sus actividades ya resueltas (etiqueta, emoji, niveles, ruta).
function construirTema(materia, temaId, subj, lang) {
  const lbl = subj?.examLabels?.[temaId]
  const formatos = topicFormats(materia, temaId).map(f => ({
    id: f.id,
    label: f.label?.[lang] || f.label?.es || f.id,
    emoji: f.emoji,
    niveles: f.niveles,
    // Sin nivel en la URL: la página del formato elige el suyo por defecto.
    // Fijar uno aquí obligaría a decidir cuál, y el mapa no es quien decide.
    ruta: topicRoute(materia, temaId, f.id),
  }))
  // OJO con de dónde salen los niveles. NO se derivan de los formatos: un
  // formato con `niveles: []` es uno que no tiene DIFICULTAD (los tipo test,
  // ¿Quién es quién?), no un tema que valga para todos los cursos. Son dos
  // ejes distintos y confundirlos hacía que casi ningún tema se filtrara.
  //
  // El curso del tema lo declara el propio catálogo. Hoy solo lo hacen 21 de
  // los 98 temas (historia entera y los modos de cálculo); los otros 77 llevan
  // esa información en el `const TEMAS` de su página de materia
  // (QuimicaIndex.jsx, GeografiaIndex.jsx…), privado y sin exportar. Hasta que
  // eso viva en topicCatalog.js, un tema sin niveles declarados vale para
  // cualquier curso — que es la regla de oro de siempre: si no consta, no se
  // esconde.
  const niveles = TOPIC_CATALOG[materia]?.temas?.[temaId]?.niveles ?? []
  return {
    id: temaId,
    label: lbl?.[lang] || lbl?.es || temaId,
    niveles,
    formatos,
  }
}

// El mapa completo. `lang` decide en qué idioma vienen ya las etiquetas, para
// que la página no tenga que resolver traducciones por su cuenta.
export function construirTemario(lang = 'es') {
  return TOPIC_SUBJECT_IDS.map(materia => {
    const subj = SUBJECTS.find(s => s.id === materia)
    const temas = topicIds(materia)
      .map(t => construirTema(materia, t, subj, lang))
      // Un tema sin ninguna actividad jugable no se enseña: sería una fila
      // que promete algo y no lleva a ningún sitio.
      .filter(t => t.formatos.length > 0)
    return {
      id: materia,
      label: subj?.label?.[lang] || subj?.label?.es || materia,
      emoji: subj?.emoji ?? '📚',
      temas,
      numActividades: temas.reduce((n, t) => n + t.formatos.length, 0),
    }
  }).filter(m => m.temas.length > 0)
}

// ── Filtrado por curso ───────────────────────────────────────────────────────
// Misma regla de oro que en lib/nivel.js: sin curso elegido no se esconde
// nada, y un tema que no declara curso vale para todos.
//
// Aquí el filtro SÍ oculta, a diferencia de TemarioGrid, que atenúa: el mapa
// se lee de arriba abajo y una lista de 223 filas medio en gris no se lee. La
// pastilla "Todas" está siempre a la vista para volver al índice entero.
//
// Los 98 temas declaran curso desde septiembre de 2026 (antes eran 21, y el
// resto lo llevaba el `const TEMAS` privado de cada página de materia). Un
// test de invariantes impide que entre un tema nuevo sin declararlo, porque
// ese tema aparecería en los tres cursos sin que nadie se enterase.
export function filtrarPorNivel(temario, nivel) {
  if (!nivel) return temario
  return temario
    .map(m => {
      const temas = m.temas.filter(t => coincideNivel(t, nivel))
      return { ...m, temas, numActividades: temas.reduce((n, t) => n + t.formatos.length, 0) }
    })
    .filter(m => m.temas.length > 0)
}

// ── Cifras ───────────────────────────────────────────────────────────────────

export function contarTemario(temario) {
  return {
    materias: temario.length,
    temas: temario.reduce((n, m) => n + m.temas.length, 0),
    actividades: temario.reduce((n, m) => n + m.numActividades, 0),
  }
}

// ── Progreso ─────────────────────────────────────────────────────────────────
// Qué temas ha tocado ya el alumno. Deliberadamente MODESTO: dice "has hecho
// algo de este tema", no "lo has completado". Marcar completitud exigiría
// saber qué cuenta como acabar cada formato, y varios (los exámenes
// compartidos entre temas, con tracksTopic: false) ni siquiera pueden decir
// qué tema se jugó — ver resolveFormat en topicCatalog.js. Prometer menos y
// acertar siempre es mejor que un porcentaje que a veces miente.

// Una actividad está tocada si su category registró partidas. Para las que no
// saben decir el tema, vale con haber jugado ese juego.
function actividadTocada(materia, temaId, formatoId, statsByGame, statsByCategory) {
  const t = topicTask(materia, temaId, formatoId)
  if (!t) return false
  if ((statsByCategory?.[t.category]?.plays ?? 0) > 0) return true
  return (statsByGame?.[t.gameId]?.plays ?? 0) > 0
}

// Devuelve un Set con los `${materia}/${tema}` que el alumno ya ha tocado.
// Sin stats (visitante sin cuenta) devuelve un Set vacío: el mapa se pinta
// igual, solo que sin marcas.
export function temasTocados(stats) {
  const tocados = new Set()
  if (!stats) return tocados
  const statsByGame = stats.statsByGame || {}
  const statsByCategory = stats.statsByCategory || {}
  for (const materia of TOPIC_SUBJECT_IDS) {
    for (const temaId of topicIds(materia)) {
      for (const f of topicFormats(materia, temaId)) {
        if (actividadTocada(materia, temaId, f.id, statsByGame, statsByCategory)) {
          tocados.add(`${materia}/${temaId}`)
          break
        }
      }
    }
  }
  return tocados
}
