// Correos de novedades de Tuthor (actualizaciones, petición de opiniones…).
//
// Solo entra quien lo ACEPTA en su perfil: es la condición legal para enviar
// comunicaciones por correo (LSSI art. 21 y RGPD), y por eso el interruptor
// empieza apagado. La preferencia vive en users/{uid} (`newsletter` +
// `newsletterAt`, la fecha en que se activó o desactivó, que sirve de prueba
// del consentimiento).
//
// La lista no se guarda en ningún sitio aparte: el panel de administración la
// genera en el momento desde Firestore, cuyas reglas ya solo dejan leer
// users/* a su dueño y a los administradores, y la descarga como CSV.
import { db } from './firebase'
import { doc, getDoc, setDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore'

export async function getNovedades(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() && snap.data().newsletter === true
}

export async function setNovedades(uid, valor) {
  await setDoc(doc(db, 'users', uid), { newsletter: !!valor, newsletterAt: serverTimestamp() }, { merge: true })
}

const fecha = ts => (ts?.toDate ? ts.toDate().toISOString().slice(0, 10) : '')

// Suscritos con correo (solo administradores: lo imponen las reglas).
export async function listarSuscritos() {
  const snap = await getDocs(query(collection(db, 'users'), where('newsletter', '==', true)))
  return snap.docs
    .map(d => d.data())
    .filter(u => u.email)
    .map(u => ({ nombre: u.name ?? '', email: u.email, alta: fecha(u.createdAt), suscrito: fecha(u.newsletterAt), ultimoAcceso: fecha(u.lastLogin) }))
    .sort((a, b) => a.email.localeCompare(b.email))
}

// CSV con BOM (Excel lo abre con tildes bien) y comillas escapadas.
export function aCsv(filas) {
  const cols = ['nombre', 'email', 'alta', 'suscrito', 'ultimoAcceso']
  const celda = v => `"${String(v ?? '').replace(/"/g, '""')}"`
  return '﻿' + [cols.join(','), ...filas.map(f => cols.map(c => celda(f[c])).join(','))].join('\r\n')
}
