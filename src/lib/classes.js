import { db } from './firebase'
import {
  doc, collection, getDoc, setDoc, updateDoc,
  runTransaction, writeBatch, arrayUnion, serverTimestamp,
  query, where, getDocs,
} from 'firebase/firestore'

// ── Alta de profesor ─────────────────────────────────────────────────────────
// "Profesor" es una capacidad que se activa sobre una cuenta ya existente
// (no un tipo de cuenta aparte): la misma persona puede seguir jugando como
// alumno.
//
// subscriptionStatus NO se escribe aquí: es de Firebase Admin (el webhook de
// Stripe) y firestore.rules rechaza este setDoc si lo incluye —
// touchesTeacherSubStatus(). Escribirlo desde el cliente era regalar acceso de
// pago a quien abriera la consola.
//
// promoCode es obligatorio mientras no haya cobro: firestore.rules compara
// el código hardcodeado (hasValidPromoCode(), de prueba por ahora) antes de
// dejar pasar active:true la primera vez (becomesTeacher()) — un código
// inválido hace que este setDoc falle con permission-denied, no solo una
// validación de UI.
export async function activateTeacherProfile(uid, { schoolName, stage, promoCode }) {
  await setDoc(doc(db, 'users', uid), {
    teacherProfile: {
      active: true,
      schoolName,
      stage,
      promoCode,
      createdAt: serverTimestamp(),
    },
  }, { merge: true })
}

export async function getTeacherProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? (snap.data().teacherProfile ?? null) : null
}

// Guarda centro/ciclo SIN activar todavía la cuenta — se llama justo antes
// de redirigir a Stripe, para no perder esos datos del formulario. active
// se deja explícitamente en false (no ausente) para que becomesTeacher()
// en firestore.rules lo evalúe sin ambigüedad y no exija código: el webhook
// de Stripe (api/stripe-webhook.js) es quien pondrá active:true más tarde,
// con Firebase Admin, que no pasa por estas rules.
export async function saveTeacherProfileDraft(uid, { schoolName, stage }) {
  await setDoc(doc(db, 'users', uid), {
    teacherProfile: {
      active: false,
      schoolName,
      stage,
    },
  }, { merge: true })
}

// Punto único para no triplicar esta condición entre Navbar.jsx,
// ProfesorPanel.jsx y firestore.rules (isTeacher() — esa sí duplicada a la
// fuerza, las rules no pueden importar JS).
export function hasTeacherAccess(profile) {
  if (!profile?.active) return false
  if (profile.promoCode === 'L4FXL3') return true
  return ['active', 'trialing'].includes(profile.subscriptionStatus)
}

// ── Códigos de clase ─────────────────────────────────────────────────────────
// Alfabeto sin ambigüedades (sin 0/O ni 1/I). Si se cambia aquí, hay que
// replicar el regex en firestore.rules (classes/{classId}.code).
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

export function generateClassCode() {
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  }
  return code
}

// Crea la clase con un código único, reintentando si hay colisión (poco
// probable: 32^6 combinaciones). classCodes/{code} es un puente de solo
// lectura "código → classId" para que un alumno que aún no se ha unido
// pueda resolverlo sin tener permiso para leer /classes directamente.
export async function createClass(teacherUid, name) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateClassCode()
    const codeRef = doc(db, 'classCodes', code)
    const classRef = doc(collection(db, 'classes'))
    try {
      await runTransaction(db, async tx => {
        const codeSnap = await tx.get(codeRef)
        if (codeSnap.exists()) throw new Error('code_collision')
        tx.set(codeRef, { classId: classRef.id, teacherId: teacherUid, createdAt: serverTimestamp() })
        tx.set(classRef, {
          teacherId: teacherUid, name, code, studentIds: [],
          createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        })
      })
      return { classId: classRef.id, code }
    } catch (e) {
      if (e.message !== 'code_collision') throw e
    }
  }
  throw new Error('could_not_generate_code')
}

// Ordenado en el cliente (no en la query) para no depender de un índice
// compuesto de Firestore (where + orderBy en campos distintos): las clases
// de un profesor son pocas, no hace falta paginar.
export async function getTeacherClasses(teacherUid) {
  const snap = await getDocs(query(collection(db, 'classes'), where('teacherId', '==', teacherUid)))
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
}

export async function getClassWithStudents(classId) {
  const snap = await getDoc(doc(db, 'classes', classId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// Clases a las que un alumno se ha unido (array-contains, un único filtro:
// la regla de /classes lo permite porque coincide exactamente con la
// condición `uid in studentIds` de allow read). Orden en el cliente, mismo
// motivo que getTeacherClasses.
export async function getStudentClasses(studentUid) {
  const snap = await getDocs(query(collection(db, 'classes'), where('studentIds', 'array-contains', studentUid)))
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
}

// ── Unión de un alumno a una clase por código ────────────────────────────────
export async function joinClassByCode(studentUid, rawCode) {
  const code = (rawCode || '').trim().toUpperCase()
  if (!code) return { ok: false, reason: 'empty' }

  const codeSnap = await getDoc(doc(db, 'classCodes', code))
  if (!codeSnap.exists()) return { ok: false, reason: 'not_found' }
  const { classId, teacherId } = codeSnap.data()

  // Un alumno solo puede leer la clase si ya está en studentIds (ver rules):
  // si la lectura funciona y ya está en la lista, es un reintento del mismo
  // código. Si falla por permisos, es la primera vez — seguimos al join.
  try {
    const classSnap = await getDoc(doc(db, 'classes', classId))
    if (classSnap.exists() && classSnap.data().studentIds?.includes(studentUid)) {
      return { ok: false, reason: 'already_joined' }
    }
  } catch { /* sin permiso de lectura todavía: primera vez, seguimos */ }

  const batch = writeBatch(db)
  batch.update(doc(db, 'classes', classId), {
    studentIds: arrayUnion(studentUid),
    updatedAt: serverTimestamp(),
  })
  batch.update(doc(db, 'users', studentUid), {
    linkedTeacherIds: arrayUnion(teacherId),
  })
  await batch.commit()
  return { ok: true, classId }
}

// ── Aula: módulos y plano de pupitres ────────────────────────────────────────
// Los dos viven en el propio doc de la clase y no en subcolecciones porque se
// leen SIEMPRE con ella (la pestaña activa depende de los módulos, y el plano
// se pinta en cuanto entras): una subcolección sería una lectura extra por
// cada visita para guardar dos objetos pequeños.
//
// firestore.rules limita al profesor a tocar name/modules/seating/updatedAt de
// su clase, así que estas dos funciones son las únicas escrituras posibles
// desde el cliente. Cambiar esa lista exige desplegar las rules a mano:
//   npx firebase-tools deploy --only firestore:rules
export async function setClassModules(classId, modules) {
  await updateDoc(doc(db, 'classes', classId), { modules, updatedAt: serverTimestamp() })
}

// seating = { rows, cols, spots: { uid: índice } }, con índice = fila*cols+col.
// Se guarda uid → sitio y no sitio → uid a propósito: un alumno solo puede
// estar en un sitio, y así es imposible representar lo contrario. Al pintar se
// invierte (mesas() en src/lib/seating.js, que es donde vive toda la lógica
// del plano y donde están sus tests).
export async function setClassSeating(classId, seating) {
  await updateDoc(doc(db, 'classes', classId), { seating, updatedAt: serverTimestamp() })
}
