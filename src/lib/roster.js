// Alumnos "sin cuenta todavía". El profesor escribe solo un nombre y esa
// ficha aparece YA en el aula, la asistencia y las notas — con su propio id,
// sin ninguna cuenta de Tuthor detrás. Cuando el alumno de verdad se registra
// y se une a la clase con el código normal, ve estas fichas y puede decir
// "esa soy yo": api/merge-placeholder.js traslada entonces su sitio, sus
// faltas y sus notas al uid real, y la ficha desaparece.
//
// El id de la ficha NUNCA es un uid de Firebase (no hay cuenta que lo genere)
// y lleva el prefijo PLACEHOLDER_PREFIX a propósito: cualquier código que
// reciba un id puede saber si es una ficha temporal sin tener que consultar
// nada, con esCuentaReal().

export const PLACEHOLDER_PREFIX = 'ph_'

export const esFicha = id => typeof id === 'string' && id.startsWith(PLACEHOLDER_PREFIX)
export const esCuentaReal = id => typeof id === 'string' && id.length > 0 && !esFicha(id)

const ALFABETO_ID = 'abcdefghijklmnopqrstuvwxyz0123456789'
const LARGO_ID = 16

export function generarIdFicha(rand = Math.random) {
  let id = ''
  for (let i = 0; i < LARGO_ID; i++) id += ALFABETO_ID[Math.floor(rand() * ALFABETO_ID.length)]
  return PLACEHOLDER_PREFIX + id
}

// Las fichas de una clase, en orden alfabético — como cualquier lista de
// clase en papel, y estable aunque se hayan creado en otro orden.
export function fichasDe(clase) {
  return Object.entries(clase?.roster ?? {})
    .map(([id, entry]) => ({ id, name: entry?.name ?? '', addedAt: entry?.addedAt ?? null }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

// La misma forma que un alumno real (loadStudent, en ProfesorClase.jsx), para
// que Aula/Asistencia/Notas no tengan que saber que las fichas existen: para
// ellos es un alumno más, solo que sin actividad todavía.
export function comoAlumno(ficha) {
  return {
    uid: ficha.id, name: ficha.name, coins: 0, streak: 0, totalTime: 0, examsTaken: 0,
    subjectEntries: [], esFicha: true,
  }
}
