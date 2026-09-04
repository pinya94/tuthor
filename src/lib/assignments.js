import { db } from './firebase'
import {
  doc, getDoc, collection, addDoc, updateDoc, deleteField, serverTimestamp,
  query, where, getDocs,
} from 'firebase/firestore'
import { taskMatchesPlay } from './topicCatalog'
import { corregirQuiz } from './quiz'

// Todas las queries usan como mucho un único filtro (== o array-contains) y
// nunca orderBy en la propia query: combinar un filtro de igualdad con un
// orderBy en otro campo exige un índice compuesto que este proyecto no
// despliega (ver getTeacherClasses en src/lib/classes.js para el mismo
// patrón). El orden se hace siempre en el cliente.
function sortByCreatedAtDesc(docs) {
  return docs.sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
}

// Modelo uniforme materia → tema → formato → nivel (src/lib/topicCatalog.js):
//   gameId    el juego/examen con el que se hace
//   category  el tema (lo que la página guarda en saveActivity → completa sola)
//   level     el nivel, si el formato lo usa; solo para enrutar al destino
// Sin tema (category null) la tarea se completa jugando ese gameId, sin más.
//
// 'quiz' es la cuarta clase: un examen propio del profesor (src/lib/quiz.js),
// con las preguntas metidas en la propia tarea en vez de referenciar un
// gameId del catálogo. title sirve de nombre visible, igual que en 'text'.
export async function createAssignment(teacherId, classId, className, { kind, gameId, title, studentIds, dueDate, category, level, quiz }) {
  await addDoc(collection(db, 'assignments'), {
    teacherId, classId, className,
    kind,
    gameId: kind === 'catalog' ? gameId : null,
    category: kind === 'catalog' ? (category || null) : null,
    level: kind === 'catalog' ? (level || null) : null,
    title: kind === 'text' || kind === 'quiz' ? title : null,
    quiz: kind === 'quiz' ? quiz : null,
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

// Para la pantalla del alumno que responde un examen propio: una tarea
// suelta por su id, en vez de la lista entera de sus tareas.
export async function getAssignment(taskId) {
  const snap = await getDoc(doc(db, 'assignments', taskId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
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

// "Falta": el profesor cierra una tarea que un alumno no ha hecho y no va a
// hacer ya, para que deje de contar como pendiente para siempre. A
// diferencia de markManualCompletion, vale para las DOS clases de tarea —de
// texto y de catálogo—: un juego no se puede "marcar hecho" sin jugarlo,
// pero sí se puede cerrar como falta si el plazo pasó.
//
// Desmarcar borra el campo entero (deleteField), no lo pone a false: así
// vuelve a "sin decidir todavía" en vez de a un tercer estado ambiguo.
export async function markMissed(taskId, uid, missed) {
  await updateDoc(doc(db, 'assignments', taskId), {
    [`completions.${uid}`]: missed ? { done: false, falta: true, markedAt: serverTimestamp() } : deleteField(),
  })
}

// Lo mismo para varios alumnos a la vez —los que siguen pendientes de una
// tarea vencida—, en una sola escritura en vez de una por alumno.
export async function markMissedBulk(taskId, uids) {
  if (uids.length === 0) return
  const updates = {}
  for (const uid of uids) updates[`completions.${uid}`] = { done: false, falta: true, markedAt: serverTimestamp() }
  await updateDoc(doc(db, 'assignments', taskId), updates)
}

// Finalización automática al jugar: llamada fire-and-forget desde
// saveActivity (src/lib/activity.js). Una sola query (array-contains, sin
// segundo filtro) para no arriesgarse con índices; el match se decide en JS
// con taskMatchesPlay (topicCatalog.js) ya que el nº de tareas por alumno es
// pequeño. Esa función sabe qué formatos pueden decir el tema jugado y
// cuáles no (tracksTopic), así que aquí no se duplica esa regla.
export async function recordAssignmentCompletion(uid, gameId, category, { score, passed, timeSpent }) {
  const snap = await getDocs(query(collection(db, 'assignments'), where('studentIds', 'array-contains', uid)))
  const matches = snap.docs.filter(d => {
    const data = d.data()
    // Solo tareas aún no hechas: repetir un juego ya completado no debe
    // volver a anunciar "tarea completada" en la pantalla final.
    return !data.completions?.[uid]?.done && taskMatchesPlay(data, { gameId, category })
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

// El alumno envía su intento de un examen propio del profesor. La corrección
// (corregirQuiz, en quiz.js) es la MISMA función que usa la vista previa del
// profesor al crear el examen, así que no hay dos criterios de "aprobado" que
// puedan desincronizarse. Escribe solo su propia entrada de completions, que
// es justo lo único que las rules dejan tocar a un alumno.
export async function submitQuiz(taskId, uid, quiz, respuestas) {
  const { score, passed } = corregirQuiz(quiz, respuestas)
  await updateDoc(doc(db, 'assignments', taskId), {
    [`completions.${uid}`]: { done: true, score, passed, respuestas, completedAt: serverTimestamp() },
  })
  return { score, passed }
}
