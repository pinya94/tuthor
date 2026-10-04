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
//                          las preguntas que ya se hicieron.
import { db } from './firebase'
import {
  doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, serverTimestamp,
} from 'firebase/firestore'
import { limpiarExamen, corregirExamen, cursoSiguiente } from './examenModelo'

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
  const ref = await addDoc(collection(db, 'assignments'), {
    teacherId: uid, classId, className,
    kind: 'quiz', quizV: 2,
    gameId: null, category: null, level: null,
    title: ex.titulo,
    instrucciones: ex.instrucciones,
    quiz: ex.preguntas,
    examenId: examen.id ?? null,
    studentIds,
    dueDate: dueDate || null,
    createdAt: serverTimestamp(),
    completions: {},
  })
  return ref.id
}

// ── Entrega del alumno ─────────────────────────────────────────────────────
// Corrige lo automático al momento. Si hay preguntas de desarrollo, la nota
// queda provisional (pendientes > 0) hasta que el profesor las puntúe.
export async function entregarExamen(taskId, uid, preguntas, respuestas) {
  const c = corregirExamen(preguntas, respuestas)
  const entrada = {
    done: true, escala: 100, respuestas,
    score: c.score, passed: c.aprobado, nota: c.nota, obtenidos: c.obtenidos, max: c.max,
    pendientes: c.pendientes, revisado: c.pendientes === 0,
    completedAt: serverTimestamp(),
  }
  await updateDoc(doc(db, 'assignments', taskId), { [`completions.${uid}`]: entrada })
  return entrada
}

// ── Corrección del profesor ────────────────────────────────────────────────
// `manual`: puntos que pone el profesor por pregunta (desarrollo, o ajustes
// de una automática); `comentarios`: una nota por pregunta para el alumno.
export async function guardarCorreccion(taskId, uid, preguntas, completion, { manual, comentarios, comentarioGeneral }) {
  const c = corregirExamen(preguntas, completion.respuestas ?? {}, manual)
  const entrada = {
    ...completion,
    manual, comentarios, comentarioGeneral: comentarioGeneral ?? '',
    score: c.score, passed: c.aprobado, nota: c.nota, obtenidos: c.obtenidos, max: c.max,
    pendientes: c.pendientes, revisado: c.pendientes === 0,
    revisadoAt: serverTimestamp(),
  }
  await updateDoc(doc(db, 'assignments', taskId), { [`completions.${uid}`]: entrada })
  return entrada
}
