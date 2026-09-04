import { db } from './firebase'
import {
  doc, collection, addDoc, deleteDoc, getDocs, updateDoc, deleteField, serverTimestamp, query, orderBy,
} from 'firebase/firestore'

// El cuaderno de notas de una clase — lógica pura (este fichero) + acceso a
// Firestore (al final).
//
// Una columna = una evaluación ("Examen tema 3", "Trabajo en grupo"), con un
// mapa uid → nota. Es el mismo patrón que la asistencia (un documento por
// "cosa que pasa", con un mapa de alumnos dentro) y por la misma razón: leer
// el cuaderno entero es UNA query a la subcolección, no una por alumno.
//
// A diferencia de la asistencia, aquí SÍ se guarda a todo el mundo con nota:
// "sin nota todavía" y "ha sacado un 0" son cosas distintas, así que la
// ausencia de la clave es lo primero y un 0 explícito lo segundo.
//
// Las notas de los exámenes de Tuthor (Deberes, Alumnos) no se mezclan aquí a
// propósito: sus "score" no están en la misma escala entre mecánicas (unas
// dan puntos, otras porcentaje) y forzarlas a una nota del 0 al 10 inventaría
// una conversión que nadie ha pedido. Este cuaderno es del profesor.

export const NOTA_MIN = 0
export const NOTA_MAX = 10
export const APROBADO = 5

export function notaValida(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= NOTA_MIN && v <= NOTA_MAX
}

// Del texto de un input a una nota o null. null = "bórrala", no "es cero": el
// profesor borra el campo para decir "no hay nota", nunca para decir "un 0".
export function parseNota(texto) {
  const t = String(texto ?? '').trim().replace(',', '.')
  if (t === '') return null
  const n = Number(t)
  if (!Number.isFinite(n)) return undefined // entrada no numérica: se ignora, no se guarda
  return Math.round(Math.min(Math.max(n, NOTA_MIN), NOTA_MAX) * 10) / 10 // un decimal
}

export function promedioColumna(columna) {
  const notas = Object.values(columna?.values ?? {}).filter(notaValida)
  if (!notas.length) return null
  return notas.reduce((a, b) => a + b, 0) / notas.length
}

export function promedioAlumno(columnas, uid) {
  const notas = columnas.map(c => c.values?.[uid]).filter(notaValida)
  if (!notas.length) return null
  return notas.reduce((a, b) => a + b, 0) / notas.length
}

export const suspenso = nota => nota != null && nota < APROBADO

// ── Firestore ────────────────────────────────────────────────────────────────
const columnasRef = classId => collection(db, 'classes', classId, 'gradeColumns')

export async function getGradeColumns(classId) {
  // orderBy(createdAt) y no el orden de sortByCreatedAtDesc de otras listas:
  // las columnas de un cuaderno se leen de izquierda a derecha en el orden en
  // que se crearon, como en cualquier cuaderno de notas en papel.
  const snap = await getDocs(query(columnasRef(classId), orderBy('createdAt', 'asc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// trimestre es opcional ('1'/'2'/'3', o null si el profesor no quiere
// clasificarla): sirve para organizar el propio cuaderno cuando hay muchas
// columnas a lo largo del curso, filtrando por trimestre en Notas.jsx. Se
// preselecciona con trimestreDe() (src/lib/report.js) al crear la columna,
// pero es solo una sugerencia — el profesor la cambia si no encaja.
export async function createGradeColumn(classId, name, trimestre = null) {
  const ref = await addDoc(columnasRef(classId), {
    name, trimestre: trimestre || null, values: {}, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function renameGradeColumn(classId, colId, name) {
  await updateDoc(doc(columnasRef(classId), colId), { name, updatedAt: serverTimestamp() })
}

export async function setColumnTrimestre(classId, colId, trimestre) {
  await updateDoc(doc(columnasRef(classId), colId), { trimestre: trimestre || null, updatedAt: serverTimestamp() })
}

export async function setGrade(classId, colId, uid, nota) {
  // Borrar una nota es updateDoc con deleteField(), no reescribir todo el
  // mapa: dos profesores no deberían poder pisarse notas de otros alumnos por
  // guardar el documento entero a la vez.
  await updateDoc(doc(columnasRef(classId), colId), {
    [`values.${uid}`]: nota === null ? deleteField() : nota,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteGradeColumn(classId, colId) {
  await deleteDoc(doc(columnasRef(classId), colId))
}
