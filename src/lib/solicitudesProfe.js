// Solicitudes de acceso a la beta de profesores, para quien llega sin la
// palabra de la beta. El profe la pide desde /profesores (con su cuenta: el
// acceso se da a una cuenta concreta) y un administrador la aprueba o rechaza
// desde /admin. Aprobar pasa por api/aprobar-profe.js (Admin SDK): la cuenta
// pasa a ser de profe al momento, sin palabra.
//
// Firestore: solicitudesProfe/{uid}  { uid, email, nombre, centro, etapa,
//   materias, mensaje, estado: 'pendiente' | 'aprobada' | 'rechazada', createdAt }
import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, auth } from './firebase'

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

// Admin
export async function listarSolicitudes() {
  const s = await getDocs(query(collection(db, 'solicitudesProfe'), orderBy('createdAt', 'desc')))
  return s.docs.map(d => ({ id: d.id, ...d.data() }))
}
export async function resolverSolicitud(uid, accion) {
  const token = await auth.currentUser.getIdToken()
  const r = await fetch('/api/aprobar-profe', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ uid, accion }),
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error ?? 'red')
  return j
}
