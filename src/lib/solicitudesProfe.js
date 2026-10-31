// Alta de profesores, abierta desde el 31-oct-2026: el profe rellena sus datos
// en /profesores, su cuenta pasa a ser de profe AL MOMENTO (con la palabra de la
// beta, que la app pone sola) y queda una solicitud «pendiente» de validar. Un
// administrador la revisa en /admin (api/aprobar-profe.js): la valida, pide que
// corrija o aporte datos (la nota sale en el panel del profe) o la rechaza.
//
// Firestore: solicitudesProfe/{uid}  { uid, email, nombre, centro, etapa,
//   materias, mensaje, estado: 'pendiente' | 'aprobada' | 'rectificar' | 'rechazada',
//   nota?, createdAt }
import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, auth } from './firebase'
import { activateTeacherProfile, TEACHER_BETA_CODE } from './classes'

export async function miSolicitud(uid) {
  const s = await getDoc(doc(db, 'solicitudesProfe', uid))
  return s.exists() ? s.data() : null
}

export async function pedirAcceso(user, { nombre, centro, etapa, materias, mensaje }) {
  await setDoc(doc(db, 'solicitudesProfe', user.uid), {
    uid: user.uid, email: user.email ?? '',
    nombre: nombre.trim().slice(0, 80), centro: centro.trim().slice(0, 120), etapa,
    materias: materias.trim().slice(0, 120), mensaje: mensaje.trim().slice(0, 600),
    estado: 'pendiente', createdAt: serverTimestamp(),
  })
}

// El alta: la cuenta de profe ya activa y la solicitud para revisarla. Primero
// la cuenta: si la solicitud no se puede escribir (p. ej. ya hay una aprobada
// de antes, que las rules no dejan reescribir), el profe entra igual.
export async function darseDeAltaProfe(user, datos) {
  await activateTeacherProfile(user.uid, { schoolName: datos.centro.trim(), stage: datos.etapa, promoCode: TEACHER_BETA_CODE })
  await pedirAcceso(user, datos).catch(err => console.warn('[alta profe] solicitud no guardada:', err?.code ?? err))
}

// Admin
export async function listarSolicitudes() {
  const s = await getDocs(query(collection(db, 'solicitudesProfe'), orderBy('createdAt', 'desc')))
  return s.docs.map(d => ({ id: d.id, ...d.data() }))
}
export async function resolverSolicitud(uid, accion, nota = '') {
  const token = await auth.currentUser.getIdToken()
  const r = await fetch('/api/aprobar-profe', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ uid, accion, nota }),
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error ?? 'red')
  return j
}
