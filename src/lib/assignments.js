import { db } from './firebase'
import {
  doc, collection, addDoc, updateDoc, serverTimestamp,
  query, where, getDocs,
} from 'firebase/firestore'

// Todas las queries usan como mucho un único filtro (== o array-contains) y
// nunca orderBy en la propia query: combinar un filtro de igualdad con un
// orderBy en otro campo exige un índice compuesto que este proyecto no
// despliega (ver getTeacherClasses en src/lib/classes.js para el mismo
// patrón). El orden se hace siempre en el cliente.
function sortByCreatedAtDesc(docs) {
  return docs.sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
}

// category: opcional, solo para tareas de catálogo ligadas a un tema
// concreto (ver src/lib/examTopics.js — p.ej. gameId 'linea-temporal' +
// category 'gce' = "Guerra Civil Española, Línea Temporal"). Sin tema,
// la tarea se completa jugando ese gameId con cualquier periodo.
export async function createAssignment(teacherId, classId, className, { kind, gameId, title, studentIds, dueDate, category }) {
  await addDoc(collection(db, 'assignments'), {
    teacherId, classId, className,
    kind,
    gameId: kind === 'catalog' ? gameId : null,
    category: kind === 'catalog' ? (category || null) : null,
    title: kind === 'text' ? title : null,
    studentIds,
    dueDate: dueDate || null,
    createdAt: serverTimestamp(),
    completions: {},
  })
}

export async function getClassAssignments(classId) {
  const snap = await getDocs(query(collection(db, 'assignments'), where('classId', '==', classId)))
  return sortByCreatedAtDesc(snap.docs.map(d => ({ id: d.id, ...d.data() })))
}

export async function getStudentAssignments(uid) {
  const snap = await getDocs(query(collection(db, 'assignments'), where('studentIds', 'array-contains', uid)))
  return sortByCreatedAtDesc(snap.docs.map(d => ({ id: d.id, ...d.data() })))
}

// Finalización manual (solo tareas de texto libre): la marca el profesor.
export async function markManualCompletion(taskId, uid, done) {
  await updateDoc(doc(db, 'assignments', taskId), {
    [`completions.${uid}`]: done ? { done: true, completedAt: serverTimestamp() } : { done: false },
  })
}

// Finalización automática al jugar: llamada fire-and-forget desde
// saveActivity (src/lib/activity.js). Una sola query (array-contains, sin
// segundo filtro) para no arriesgarse con índices; se filtra por gameId (y
// category si la tarea tiene tema) en JS ya que el nº de tareas por alumno
// es pequeño. Una tarea sin tema (category null) se completa jugando ese
// gameId con cualquier periodo; una tarea con tema solo se completa
// jugando ESE periodo, no cualquiera.
export async function recordAssignmentCompletion(uid, gameId, category, { score, passed, timeSpent }) {
  const snap = await getDocs(query(collection(db, 'assignments'), where('studentIds', 'array-contains', uid)))
  const matches = snap.docs.filter(d => {
    const data = d.data()
    // Solo tareas aún no hechas: repetir un juego ya completado no debe
    // volver a anunciar "tarea completada" en la pantalla final.
    return data.kind === 'catalog' && data.gameId === gameId
      && (!data.category || data.category === category)
      && !data.completions?.[uid]?.done
  })
  await Promise.all(matches.map(d => updateDoc(d.ref, {
    [`completions.${uid}`]: {
      done: true,
      score: score ?? null,
      passed: passed ?? null,
      timeSpent: timeSpent || 0,
      completedAt: serverTimestamp(),
    },
  })))
  // Para el aviso de GameEndScreen ("✅ Tarea de 3º ESO A completada")
  return matches.map(d => ({ className: d.data().className }))
}
