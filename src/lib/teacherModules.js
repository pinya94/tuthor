// Los módulos del aula del profesor.
//
// La idea: un profesor usa dos o tres cosas de estas, no las seis. Un panel
// que se lo enseña todo a la vez es un panel que no se usa. Así que cada clase
// guarda qué módulos quiere ver (classes/{id}.modules) y el resto ni aparece
// en la barra de pestañas.
//
// Este fichero es la fuente única: de aquí salen las pestañas, la pantalla de
// ajustes y los valores por defecto de una clase recién creada. Añadir un
// módulo = una entrada aquí + su caso en ProfesorClase.jsx. Si falta el caso,
// el test de invariantes lo dice.
//
// `nucleo: true` marca lo que no se puede apagar: sin alumnos ni tareas la
// clase no es nada, y esconderlos solo serviría para que alguien se quedara
// sin saber dónde estaba su propio trabajo.

export const TEACHER_MODULES = {
  aula: {
    emoji: '💺', nucleo: false, porDefecto: true,
    label: { es: 'Aula', en: 'Classroom', ca: 'Aula' },
    desc: {
      es: 'El plano de la clase con los pupitres: colocas a cada alumno en su sitio, sacas a uno al azar y abres sus resultados tocando su mesa.',
      en: 'The classroom floor plan: seat each student, pick one at random and open their results by tapping their desk.',
      ca: "El plànol de la classe amb els pupitres: col·loques cada alumne al seu lloc, en treus un a l'atzar i obres els seus resultats tocant la seva taula.",
    },
  },
  deberes: {
    emoji: '📚', nucleo: true, porDefecto: true,
    label: { es: 'Deberes', en: 'Homework', ca: 'Deures' },
    desc: {
      es: 'Lo que mandas: juegos y exámenes de Tuthor, que se marcan solos al jugarlos, y tareas de fuera (una ficha, unas páginas del libro), que marcas tú.',
      en: 'What you set: Tuthor games and exams, which tick themselves off, and outside work (a worksheet, pages of the book) that you tick off yourself.',
      ca: 'El que manes: jocs i exàmens de Tuthor, que es marquen sols, i tasques de fora (una fitxa, unes pàgines del llibre), que marques tu.',
    },
  },
  alumnos: {
    emoji: '📊', nucleo: true, porDefecto: true,
    label: { es: 'Alumnos', en: 'Students', ca: 'Alumnes' },
    desc: {
      es: 'La lista con monedas, racha, tiempo y exámenes de cada uno, y el desglose materia a materia al abrir a un alumno.',
      en: 'The list with each student\u2019s coins, streak, time and exams, plus a subject-by-subject breakdown when you open one.',
      ca: 'La llista amb monedes, ratxa, temps i exàmens de cadascú, i el desglossament matèria a matèria en obrir un alumne.',
    },
  },
}

export const MODULE_IDS = Object.keys(TEACHER_MODULES)

// Los módulos por defecto de una clase que todavía no ha tocado los ajustes.
// Nunca se escriben al crearla: una clase sin `modules` se lee así, y solo
// pasa a tener el campo cuando el profesor cambia algo. Así una clase antigua
// se comporta como una nueva sin migrar nada.
export const MODULOS_POR_DEFECTO = Object.fromEntries(
  MODULE_IDS.map(id => [id, TEACHER_MODULES[id].porDefecto]),
)

export function moduleEnabled(clase, id) {
  if (!TEACHER_MODULES[id]) return false
  if (TEACHER_MODULES[id].nucleo) return true
  return clase?.modules?.[id] ?? TEACHER_MODULES[id].porDefecto
}

// Los ids activos, SIEMPRE en el orden de TEACHER_MODULES: el orden de las
// pestañas no puede depender de en qué orden los fue activando el profesor.
export function enabledModuleIds(clase) {
  return MODULE_IDS.filter(id => moduleEnabled(clase, id))
}
