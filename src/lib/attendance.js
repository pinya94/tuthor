import { db } from './firebase'
import { doc, collection, getDoc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore'

// Asistencia de una clase: un documento por día lectivo, en
// classes/{classId}/attendance/{YYYY-MM-DD}.
//
// Solo se guarda a quien NO está presente:
//
//   marks = { '<uid>': 'ausente' | 'retraso' | 'justificada' }
//
// Es como se pasa lista en papel —se apuntan las faltas, no las asistencias— y
// además mantiene el documento diminuto. Lo que distingue "hoy no ha faltado
// nadie" de "hoy no he pasado lista" es que el DOCUMENTO EXISTA: sin doc, el
// día no está pasado.
//
// Esa decisión tiene una consecuencia buena y hay que saberla: un alumno que
// se une a la clase en marzo no aparece como ausente en todos los días de
// febrero, porque no hay ninguna marca suya. Con el criterio contrario
// (guardar presentes) saldría con el curso entero de faltas.

export const ESTADOS = ['presente', 'ausente', 'retraso', 'justificada']

export const ESTADO_META = {
  presente:    { emoji: '·',  color: 'presente',    label: { es: 'Presente', en: 'Present', ca: 'Present' } },
  ausente:     { emoji: '✕',  color: 'ausente',     label: { es: 'Falta', en: 'Absent', ca: 'Falta' } },
  retraso:     { emoji: '⏱', color: 'retraso',     label: { es: 'Retraso', en: 'Late', ca: 'Retard' } },
  justificada: { emoji: '✓',  color: 'justificada', label: { es: 'Justificada', en: 'Excused', ca: 'Justificada' } },
}

// El id del día en hora LOCAL. Con toISOString() una clase de las 18:00 en
// España se guardaría en el día siguiente durante media hora al año, y en otras
// zonas horarias siempre: el registro de asistencia es del día del profesor, no
// del meridiano de Greenwich.
export function diaISO(fecha = new Date()) {
  const p = n => String(n).padStart(2, '0')
  return `${fecha.getFullYear()}-${p(fecha.getMonth() + 1)}-${p(fecha.getDate())}`
}

// Los días de un mes hasta hoy: no tiene sentido pedirle a Firestore los días
// que aún no han pasado.
export function diasDelMes(fecha = new Date()) {
  const año = fecha.getFullYear()
  const mes = fecha.getMonth()
  const hoy = new Date()
  const ultimo = (año === hoy.getFullYear() && mes === hoy.getMonth())
    ? hoy.getDate()
    : new Date(año, mes + 1, 0).getDate()
  return Array.from({ length: ultimo }, (_, i) => diaISO(new Date(año, mes, i + 1)))
}

export function estadoDe(marks, uid) {
  return marks?.[uid] ?? 'presente'
}

// Un toque cicla al siguiente estado. Pasar lista son treinta decisiones
// seguidas: un menú desplegable por alumno lo convierte en noventa toques.
export function siguienteEstado(actual) {
  const i = ESTADOS.indexOf(actual)
  return ESTADOS[(i + 1) % ESTADOS.length]
}

// 'presente' no se guarda: es la ausencia de marca. Así el documento solo
// contiene lo que de verdad ha pasado.
export function conMarca(marks, uid, estado) {
  const nuevo = { ...(marks || {}) }
  if (estado === 'presente') delete nuevo[uid]
  else nuevo[uid] = estado
  return nuevo
}

export function resumenDelDia(marks, studentIds = []) {
  const cuenta = { presente: 0, ausente: 0, retraso: 0, justificada: 0 }
  for (const uid of studentIds) cuenta[estadoDe(marks, uid)]++
  return cuenta
}

// Cuántas lleva cada alumno en el periodo cargado. `dias` es un objeto
// { 'YYYY-MM-DD': marks } — el mismo que devuelve getAttendanceMonth.
export function totalesPorAlumno(dias, studentIds = []) {
  const total = Object.fromEntries(studentIds.map(uid => [uid, { ausente: 0, retraso: 0, justificada: 0 }]))
  for (const marks of Object.values(dias || {})) {
    for (const [uid, estado] of Object.entries(marks || {})) {
      if (total[uid] && total[uid][estado] !== undefined) total[uid][estado]++
    }
  }
  return total
}

// ── Firestore ────────────────────────────────────────────────────────────────
const diaRef = (classId, day) => doc(db, 'classes', classId, 'attendance', day)

export async function getAttendance(classId, day) {
  const snap = await getDoc(diaRef(classId, day))
  return snap.exists() ? (snap.data().marks ?? {}) : null // null = día sin pasar
}

export async function setAttendance(classId, day, marks) {
  await setDoc(diaRef(classId, day), { marks, updatedAt: serverTimestamp() })
}

// El mes entero de una vez. Es UNA query a la subcolección en vez de 30
// lecturas por id: la subcolección de una clase solo tiene sus propios días,
// así que traerla entera y filtrar en el cliente sale más barato que pedir día
// a día, y no necesita ningún índice.
export async function getAttendanceMonth(classId, fecha = new Date()) {
  const snap = await getDocs(collection(db, 'classes', classId, 'attendance'))
  const delMes = new Set(diasDelMes(fecha))
  const dias = {}
  for (const d of snap.docs) {
    if (delMes.has(d.id)) dias[d.id] = d.data().marks ?? {}
  }
  return dias
}
