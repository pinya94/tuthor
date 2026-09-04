import { db } from './firebase'
import { doc, collection, addDoc, deleteDoc, getDocs, serverTimestamp } from 'firebase/firestore'

// El cuaderno de observaciones del profesor: notas fechadas sobre un alumno
// ("se ha portado genial ayudando a un compañero", "tercera vez que no trae
// el material", "hablado con la familia") — el equivalente digital de la
// libreta que cualquier profesor ya lleva encima.
//
// Cada nota es un documento suelto en classes/{classId}/observations, no una
// entrada dentro de un documento por alumno: a diferencia de la asistencia
// (30 alumnos como mucho, cabe en un mapa) o las notas (unas pocas columnas),
// aquí no hay un límite natural de "cuántas notas caben en un documento" — un
// curso entero puede acumular cientos. Una colección plana con un filtro por
// uid es lo que escala sin tener que decidir de antemano cuántas caben.
//
// Es TEACHER-ONLY, más estrictamente que la asistencia: una nota de
// comportamiento es justo el tipo de dato que un alumno no debería poder leer
// sobre sí mismo sin que el profesor decida enseñárselo primero.

export const TAGS = ['positiva', 'neutra', 'negativa']

export const TAG_META = {
  positiva: { emoji: '👍', color: 'text-green-400 border-green-500/30 bg-green-500/10', label: { es: 'Positiva', en: 'Positive', ca: 'Positiva' } },
  neutra:   { emoji: '📝', color: 'text-white/60 border-white/15 bg-white/5', label: { es: 'Neutra', en: 'Neutral', ca: 'Neutra' } },
  negativa: { emoji: '⚠️', color: 'text-red-400 border-red-500/30 bg-red-500/10', label: { es: 'Negativa', en: 'Negative', ca: 'Negativa' } },
}

export const TEXTO_MAX = 500

export function textoValido(texto) {
  const t = (texto ?? '').trim()
  return t.length >= 1 && t.length <= TEXTO_MAX
}

// Agrupa por alumno y ordena cada grupo de más reciente a más antigua — así
// se lee como un cuaderno, la última anotación primero. Alumnos sin ninguna
// nota no aparecen: no hay nada que agrupar.
export function porAlumno(observaciones) {
  const grupos = new Map()
  for (const o of observaciones) {
    if (!grupos.has(o.uid)) grupos.set(o.uid, [])
    grupos.get(o.uid).push(o)
  }
  for (const lista of grupos.values()) {
    lista.sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
  }
  return grupos
}

// El feed de "lo último" de toda la clase, sin agrupar — para abrir el
// módulo y ver de un vistazo qué se ha anotado estos días, sin tener que
// elegir un alumno primero.
export function masRecientes(observaciones, limite = 20) {
  return [...observaciones]
    .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
    .slice(0, limite)
}

// El "marcador" de un alumno: positivas suman, negativas restan, neutras no
// cuentan (son informativas — "hablado con la familia" no es ni un punto a
// favor ni en contra). No hay un número aparte que llevar: se deriva de las
// mismas notas del cuaderno, así que nunca puede desincronizarse del texto
// que las explica. Lo usa el modo puntos del Aula (tocar la mesa = +1/−1).
export function puntosDe(observaciones, uid) {
  return observaciones
    .filter(o => o.uid === uid)
    .reduce((acc, o) => acc + (o.tag === 'positiva' ? 1 : o.tag === 'negativa' ? -1 : 0), 0)
}

// ── Firestore ────────────────────────────────────────────────────────────────
const coleccion = classId => collection(db, 'classes', classId, 'observations')

export async function getClassObservations(classId) {
  const snap = await getDocs(coleccion(classId))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function addObservation(classId, uid, text, tag) {
  const ref = await addDoc(coleccion(classId), { uid, text, tag, createdAt: serverTimestamp() })
  return ref.id
}

// Sin edición a propósito: una nota mal escrita se borra y se vuelve a
// escribir, en vez de mantener una regla de "quién puede tocar qué campo" en
// firestore.rules para un caso que ocurre poco.
export async function deleteObservation(classId, obsId) {
  await deleteDoc(doc(coleccion(classId), obsId))
}
