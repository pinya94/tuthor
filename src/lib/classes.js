import { db } from './firebase'
import {
  doc, collection, getDoc, setDoc, updateDoc,
  runTransaction, writeBatch, arrayUnion, serverTimestamp,
  query, where, orderBy, getDocs,
} from 'firebase/firestore'

// ── Alta de profesor ─────────────────────────────────────────────────────────
// "Profesor" es una capacidad que se activa sobre una cuenta ya existente
// (no un tipo de cuenta aparte): la misma persona puede seguir jugando como
// alumno. subscriptionStatus queda reservado desde el día 1 para el futuro
// gate de pago (ver firestore.rules / isTeacher).
export async function activateTeacherProfile(uid, { schoolName, stage }) {
  await setDoc(doc(db, 'users', uid), {
    teacherProfile: {
      active: true,
      schoolName,
      stage,
      createdAt: serverTimestamp(),
      subscriptionStatus: 'none',
    },
  }, { merge: true })
}

export async function getTeacherProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? (snap.data().teacherProfile ?? null) : null
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

export async function getTeacherClasses(teacherUid) {
  const snap = await getDocs(query(
    collection(db, 'classes'),
    where('teacherId', '==', teacherUid),
    orderBy('createdAt', 'desc'),
  ))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getClassWithStudents(classId) {
  const snap = await getDoc(doc(db, 'classes', classId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// ── Unión de un alumno a una clase por código ────────────────────────────────
export async function joinClassByCode(studentUid, rawCode) {
  const code = (rawCode || '').trim().toUpperCase()
  if (!code) return { ok: false, reason: 'empty' }

  const codeSnap = await getDoc(doc(db, 'classCodes', code))
  if (!codeSnap.exists()) return { ok: false, reason: 'not_found' }
  const { classId, teacherId } = codeSnap.data()

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
