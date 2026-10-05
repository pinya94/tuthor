// Exámenes del profesor (v2) en Firestore: la biblioteca, las imágenes, la
// asignación a una clase, la entrega del alumno y la corrección. El modelo y
// la corrección pura están en examenModelo.js.
//
// Colecciones (ver firestore.rules):
//   examenesProfesor/{id}  la biblioteca: solo la lee y la toca su profesor.
//                          Sobrevive a las clases: es lo que se reutiliza
//                          de un curso a otro.
//   imagenesExamen/{id}    una imagen (foto o dibujo) comprimida como data URL.
//                          No se usa Storage: en proyectos nuevos exige el plan
//                          de pago, y una imagen de examen comprimida cabe de
//                          sobra en un documento (< 1 MB). El id es aleatorio;
//                          la lee cualquier usuario con sesión (la necesitan
//                          los alumnos de la tarea) y solo la crea o borra su
//                          dueño.
//   assignments/{id}       la tarea: lleva una COPIA del examen (quizV: 2), para
//                          que retocar el examen el curso que viene no cambie
//                          las preguntas que ya se hicieron. Sin soluciones.
//   assignments/{id}/privado/soluciones
//                          las soluciones de esa copia. El profesor la lee
//                          siempre; el alumno, solo cuando ya ha entregado.
//
// El alumno escribe solo { done, respuestas, completedAt } (lo exigen las
// reglas). La nota la calcula y la guarda el panel del profesor: al abrir la
// clase (autocorregir) y al corregir a mano (guardarCorreccion).
import { db } from './firebase'
import {
  doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, serverTimestamp, writeBatch,
} from 'firebase/firestore'
import { limpiarExamen, cursoSiguiente, separarSoluciones, unirSoluciones, calificar, sinCalificar } from './examenModelo'

// ── Biblioteca ─────────────────────────────────────────────────────────────
export async function listarExamenes(uid) {
  const snap = await getDocs(query(collection(db, 'examenesProfesor'), where('teacherId', '==', uid)))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.updatedAt?.toMillis?.() ?? 0) - (a.updatedAt?.toMillis?.() ?? 0))
}

export async function getExamen(id) {
  const snap = await getDoc(doc(db, 'examenesProfesor', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function crearExamen(uid, examen) {
  const ref = await addDoc(collection(db, 'examenesProfesor'), {
    ...limpiarExamen(examen), teacherId: uid, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function guardarExamen(id, examen) {
  await updateDoc(doc(db, 'examenesProfesor', id), { ...limpiarExamen(examen), updatedAt: serverTimestamp() })
}

// «Copiar para el curso que viene»: mismo examen, curso escolar siguiente.
export async function duplicarExamen(uid, examen, { siguienteCurso = false, sufijo = '' } = {}) {
  const copia = {
    ...examen,
    titulo: `${examen.titulo}${sufijo}`.slice(0, 120),
    cursoEscolar: siguienteCurso ? cursoSiguiente(examen.cursoEscolar) : examen.cursoEscolar,
  }
  return crearExamen(uid, copia)
}

export async function borrarExamen(id) {
  await deleteDoc(doc(db, 'examenesProfesor', id))
}

// ── Imágenes ───────────────────────────────────────────────────────────────
const cacheImagenes = new Map()

export async function guardarImagen(uid, { data, w, h }) {
  const ref = await addDoc(collection(db, 'imagenesExamen'), { ownerId: uid, data, w, h, createdAt: serverTimestamp() })
  cacheImagenes.set(ref.id, { data, w, h })
  return { id: ref.id, w, h }
}

export async function getImagen(id) {
  if (cacheImagenes.has(id)) return cacheImagenes.get(id)
  const snap = await getDoc(doc(db, 'imagenesExamen', id))
  const img = snap.exists() ? { data: snap.data().data, w: snap.data().w, h: snap.data().h } : null
  if (img) cacheImagenes.set(id, img)
  return img
}

// ── Asignar a una clase ────────────────────────────────────────────────────
export async function asignarExamen(uid, { classId, className }, examen, { studentIds, dueDate }) {
  const ex = limpiarExamen(examen)
  const { publicas, soluciones } = separarSoluciones(ex.preguntas)
  // Tarea y soluciones en un solo lote: o se crean las dos o ninguna.
  const ref = doc(collection(db, 'assignments'))
  const lote = writeBatch(db)
  lote.set(ref, {
    teacherId: uid, classId, className,
    kind: 'quiz', quizV: 2,
    gameId: null, category: null, level: null,
    title: ex.titulo,
    instrucciones: ex.instrucciones,
    quiz: publicas,
    examenId: examen.id ?? null,
    studentIds,
    dueDate: dueDate || null,
    createdAt: serverTimestamp(),
    completions: {},
  })
  lote.set(doc(db, 'assignments', ref.id, 'privado', 'soluciones'), { teacherId: uid, soluciones })
  await lote.commit()
  return ref.id
}

// Las soluciones de una tarea (null si no hay: tareas que se asignaron con
// las soluciones dentro, antes de separarlas). Al alumno que aún no ha
// entregado las reglas se las niegan.
export async function getSoluciones(taskId) {
  const snap = await getDoc(doc(db, 'assignments', taskId, 'privado', 'soluciones'))
  return snap.exists() ? snap.data().soluciones ?? null : null
}

// Las preguntas completas (con soluciones) de una tarea.
export async function preguntasCompletas(task) {
  return unirSoluciones(task.quiz, await getSoluciones(task.id))
}

// ── Entrega del alumno ─────────────────────────────────────────────────────
// Solo las respuestas: la nota no la escribe el alumno (las reglas no le
// dejan). Su pantalla de resultado la calcula leyendo las soluciones, que ya
// puede ver porque ha entregado.
export async function entregarExamen(taskId, uid, respuestas) {
  const entrada = { done: true, respuestas, completedAt: serverTimestamp() }
  await updateDoc(doc(db, 'assignments', taskId), { [`completions.${uid}`]: entrada })
  return entrada
}

// ── Nota automática, desde el panel del profesor ──────────────────────────
// Pone nota a las entregas que aún no la tienen. Se llama al abrir la clase:
// lo automático queda calificado y el desarrollo, marcado como pendiente.
// Devuelve las entradas nuevas por uid ({} si no había nada que hacer).
export async function autocorregir(task, preguntas) {
  const nuevas = {}
  for (const [uid, c] of Object.entries(task.completions ?? {})) {
    if (sinCalificar(c)) nuevas[uid] = { ...c, ...calificar(preguntas, c.respuestas ?? {}, c.manual ?? {}) }
  }
  if (!Object.keys(nuevas).length) return nuevas
  await updateDoc(doc(db, 'assignments', task.id),
    Object.fromEntries(Object.entries(nuevas).map(([uid, e]) => [`completions.${uid}`, e])))
  return nuevas
}

// ── Corrección del profesor ────────────────────────────────────────────────
// `manual`: puntos que pone el profesor por pregunta (desarrollo, o ajustes
// de una automática); `comentarios`: una nota por pregunta para el alumno.
// `preguntas`: las completas, con soluciones.
export async function guardarCorreccion(taskId, uid, preguntas, completion, { manual, comentarios, comentarioGeneral }) {
  const entrada = {
    ...completion,
    manual, comentarios, comentarioGeneral: comentarioGeneral ?? '',
    ...calificar(preguntas, completion.respuestas ?? {}, manual),
    revisadoAt: serverTimestamp(),
  }
  await updateDoc(doc(db, 'assignments', taskId), { [`completions.${uid}`]: entrada })
  return entrada
}
