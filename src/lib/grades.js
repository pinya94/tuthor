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
// Las notas de los exámenes de Tuthor SÍ se pueden traer aquí, pero no se
// mezclan solas: las trae el profesor con un botón, y llegan como una columna
// más que él puede editar o borrar. Este cuaderno sigue siendo suyo.
//
// Durante un tiempo no se pudo, y el motivo está registrado: los "score" no
// estaban en la misma escala entre mecánicas (ExamenMC guardaba aciertos×100 y
// las otras dos, porcentaje), así que convertir habría sido adivinar. Eso se
// arregló en el origen —ahora los tres guardan porcentaje y lo marcan con
// `escala: 100`— y por eso la conversión ya no inventa nada. Lo que no trae esa
// marca sigue sin convertirse: ver notaDeCompletion.

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

// ── Traer al cuaderno una tarea de Tuthor ────────────────────────────────────
// Un profesor manda "Examen de la célula" a 25 alumnos, Tuthor lo corrige y
// guarda la nota de cada uno… y hasta ahora el profesor tecleaba esas 25 notas
// a mano en este cuaderno. Eso es trabajo administrativo puro, y de los pocos
// que Tuthor SÍ puede quitar: es el único que tiene los datos, porque es el
// único que corrige.
//
// La conversión es porcentaje ÷ 10. Lo único delicado es de qué se puede fiar:
// una finalización solo se convierte si trae `escala: 100`. Las antiguas no lo
// dicen, y ExamenMC guardaba entonces aciertos×100 —un "score: 800" podía ser
// un 8 o un 800—, así que no se adivinan: se quedan sin nota y el profesor la
// pone a mano. Poner un 10 donde había un 1 sería mucho peor que no poner nada.
export const ESCALA_PORCENTAJE = 100

export function notaDeCompletion(completion) {
  if (!completion?.done) return null
  if (completion.escala !== ESCALA_PORCENTAJE) return null
  const score = completion.score
  if (typeof score !== 'number' || !Number.isFinite(score)) return null
  return Math.min(Math.max(Math.round(score), 0), 100) / 10
}

// Las notas de una tarea listas para una columna: { uid: nota }. Quien no la
// haya hecho no aparece, que en este cuaderno es "sin nota" y no un cero.
export function notasDeTarea(tarea) {
  const values = {}
  for (const [uid, completion] of Object.entries(tarea?.completions ?? {})) {
    const nota = notaDeCompletion(completion)
    if (nota !== null) values[uid] = nota
  }
  return values
}

// Cuántas notas saldrían de una tarea, para poder decirlo ANTES de crear la
// columna: "Examen de la célula · 23 notas" es lo que deja decidir si vale la
// pena traerla o si todavía falta gente por hacerla.
export const cuantasNotasTiene = tarea => Object.keys(notasDeTarea(tarea)).length

// ── Ponderaciones ────────────────────────────────────────────────────────────
// Cada columna pesa lo que diga su `peso`; si no lo trae, 1. Antes la media era
// la media aritmética de las columnas, y para casi cualquier profesor eso es
// otra nota distinta de la suya: "exámenes 60%, libreta 20%, actitud 20%" no se
// puede expresar contando todo igual, así que el cuaderno daba un número que
// había que volver a calcular aparte.
//
// El peso es RELATIVO (×1, ×2, ×3), no un porcentaje que deba sumar 100. Así
// añadir una columna a mitad de trimestre no obliga a retocar las demás, que es
// justo cuando se añaden. El porcentaje real se calcula y se enseña al lado.
export const PESO_POR_DEFECTO = 1
export const PESO_MAX = 10

export function pesoValido(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= PESO_MAX
}

export const pesoDe = columna => (pesoValido(columna?.peso) ? columna.peso : PESO_POR_DEFECTO)

// Peso 0 = "esta no cuenta para la media": una nota informativa, o un examen
// que el departamento decidió no contar. Es distinto de borrar la columna — la
// nota sigue a la vista, simplemente no pesa.
export function porcentajeDeColumna(columnas, colId) {
  const total = columnas.reduce((suma, c) => suma + pesoDe(c), 0)
  if (total <= 0) return 0
  return (pesoDe(columnas.find(c => c.id === colId)) / total) * 100
}

export function promedioColumna(columna) {
  const notas = Object.values(columna?.values ?? {}).filter(notaValida)
  if (!notas.length) return null
  return notas.reduce((a, b) => a + b, 0) / notas.length
}

// Media ponderada del alumno. Solo entran las columnas donde tiene nota, así
// que el reparto se hace entre lo que ha hecho: a quien le falta el examen que
// pesa 3, la media no se le hunde — se calcula con el resto. Es lo contrario de
// tratar la falta como un cero, que es una decisión del profesor y no del
// programa.
export function promedioAlumno(columnas, uid) {
  let suma = 0
  let pesos = 0
  for (const c of columnas) {
    const nota = c.values?.[uid]
    if (!notaValida(nota)) continue
    const peso = pesoDe(c)
    if (peso <= 0) continue
    suma += nota * peso
    pesos += peso
  }
  return pesos > 0 ? suma / pesos : null
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

// El peso se guarda como número; pesoDe() se encarga de que una columna que no
// lo traiga (todas las de antes de esta función) valga 1 y siga contando igual
// que siempre. Así no hace falta migrar nada.
export async function setColumnPeso(classId, colId, peso) {
  await updateDoc(doc(columnasRef(classId), colId), { peso, updatedAt: serverTimestamp() })
}

// Crea la columna de una tarea con sus notas ya dentro. Son dos escrituras y
// no una a propósito: firestore.rules exige que una columna nazca con
// `values == {}` (para que nadie pueda crear un cuaderno entero de golpe), así
// que se crea vacía y se rellena con un único update. Dos escrituras siguen
// siendo muchísimo menos que las 25 que hacía el profesor tecleando.
export async function crearColumnaConNotas(classId, nombre, trimestre, values) {
  const id = await createGradeColumn(classId, nombre, trimestre)
  await updateDoc(doc(columnasRef(classId), id), { values, updatedAt: serverTimestamp() })
  return id
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
