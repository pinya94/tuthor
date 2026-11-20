// Avisos de clase en TIEMPO REAL, compartidos por la barra lateral, la navbar
// y el aviso de reto en directo (un solo juego de escuchas para toda la web):
//
//   alumno con cuenta → nº de tareas sin hacer, si está en alguna clase y el
//                       reto en directo que su profe tenga abierto ahora
//   profe             → entregas nuevas de sus tareas desde la última vez que
//                       miró sus clases (marcarEntregasVistas)
//
// Antes las tareas pendientes se contaban una vez al entrar (si el profe
// mandaba deberes a mitad de sesión no se veían) y un reto en directo solo
// se veía entrando justo en «Mi clase». Nada de notificaciones push ni
// correos a alumnos (muchos son menores): todo dentro de la web.
//
// Cada dato se guarda con el uid al que pertenece y se descarta si ya no es
// el de la sesión: así no hace falta vaciar estado al cerrar sesión.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from './AuthContext'
import { getTeacherProfile, hasTeacherAccess } from '../lib/classes'

const AvisosClaseContext = createContext({ esProfe: false, enClase: null, pendientes: 0, retoDirecto: null, entregasNuevas: 0, marcarEntregasVistas: () => {} })

const CLAVE_VISTO = uid => `tuthor_entregas_visto_${uid}`
const SEIS_HORAS = 6 * 3600 * 1000
// La primera vez no hay marca: se pone «ahora» para no contar como nuevas
// todas las entregas de siempre.
function leerVisto(uid) {
  try {
    const v = Number(localStorage.getItem(CLAVE_VISTO(uid))) || 0
    if (v) return v
    const ahora = Date.now()
    localStorage.setItem(CLAVE_VISTO(uid), String(ahora))
    return ahora
  } catch { return Date.now() }
}
const de = (estado, uid) => (estado && estado.uid === uid ? estado.v : null)

export function AvisosClaseProvider({ children }) {
  const { user, childMode } = useAuth()
  const uid = user?.uid ?? null
  const [profe, setProfe] = useState(null)       // { uid, v: bool }
  const [tareas, setTareas] = useState(null)     // { uid, v: [tarea] }
  const [clases, setClases] = useState(null)     // { uid, v: [{ id, name }] }
  const [retos, setRetos] = useState({})         // classId → retos en directo abiertos
  const [entregas, setEntregas] = useState(null) // { uid, v: [ms] }
  const [visto, setVisto] = useState(null)       // { uid, v: ms }

  useEffect(() => {
    if (!uid || childMode) return
    let vivo = true
    getTeacherProfile(uid).then(p => { if (vivo) setProfe({ uid, v: hasTeacherAccess(p) }) }).catch(() => {})
    return () => { vivo = false }
  }, [uid, childMode])
  const esProfe = Boolean(uid) && !childMode && de(profe, uid) === true

  // Alumno: sus tareas, en vivo
  useEffect(() => {
    if (!uid) return
    return onSnapshot(query(collection(db, 'assignments'), where('studentIds', 'array-contains', uid)),
      s => setTareas({ uid, v: s.docs.map(d => d.data()) }), () => setTareas({ uid, v: [] }))
  }, [uid])

  // Alumno: sus clases, en vivo (para saber si está en alguna y escuchar sus retos)
  useEffect(() => {
    if (!uid) return
    return onSnapshot(query(collection(db, 'classes'), where('studentIds', 'array-contains', uid)),
      s => setClases({ uid, v: s.docs.map(d => ({ id: d.id, name: d.data().name })) }), () => setClases({ uid, v: [] }))
  }, [uid])
  const misClases = de(clases, uid)

  // Alumno: retos en directo de cada una de sus clases
  const idsClases = (misClases ?? []).map(c => c.id).join(',')
  useEffect(() => {
    if (!uid || !idsClases) return
    const nombres = Object.fromEntries((misClases ?? []).map(c => [c.id, c.name]))
    const bajas = idsClases.split(',').map(classId => onSnapshot(
      query(collection(db, 'rankingsClase'), where('classId', '==', classId)),
      s => setRetos(r => ({
        ...r,
        [classId]: s.docs.map(d => ({ codigo: d.id, ...d.data(), className: nombres[classId] }))
          .filter(x => x.modo === 'directo' && !x.cerrado && x.directo?.estado !== 'fin'
            && Date.now() - (x.createdAt?.toMillis?.() ?? 0) < SEIS_HORAS),
      })),
      () => {},
    ))
    return () => bajas.forEach(b => b())
  }, [uid, idsClases]) // eslint-disable-line react-hooks/exhaustive-deps

  // Profe: entregas a sus tareas, en vivo
  useEffect(() => {
    if (!uid || !esProfe) return
    return onSnapshot(query(collection(db, 'assignments'), where('teacherId', '==', uid)),
      s => {
        setVisto(v => (v && v.uid === uid ? v : { uid, v: leerVisto(uid) }))
        setEntregas({ uid, v: s.docs.flatMap(d => Object.values(d.data().completions ?? {})
          .filter(c => c?.done && c.completedAt?.toMillis).map(c => c.completedAt.toMillis())) })
      },
      () => setEntregas({ uid, v: [] }))
  }, [uid, esProfe])

  const marcarEntregasVistas = useCallback(() => {
    if (!uid) return
    const ahora = Date.now()
    try { localStorage.setItem(CLAVE_VISTO(uid), String(ahora)) } catch { /* sin almacenamiento */ }
    setVisto({ uid, v: ahora })
  }, [uid])

  const misTareas = de(tareas, uid)
  const pendientes = misTareas ? misTareas.filter(t => !t.completions?.[uid]?.done).length : 0
  const idsVivos = new Set(idsClases ? idsClases.split(',') : [])
  const retoDirecto = Object.entries(retos).filter(([id]) => idsVivos.has(id)).flatMap(([, rs]) => rs)
    .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))[0] ?? null
  const desde = de(visto, uid) ?? Infinity
  const entregasNuevas = esProfe ? (de(entregas, uid) ?? []).filter(ms => ms > desde).length : 0
  const enClase = misClases === null ? null : misClases.length > 0

  return (
    <AvisosClaseContext.Provider value={{ esProfe, enClase, pendientes, retoDirecto, entregasNuevas, marcarEntregasVistas }}>
      {children}
    </AvisosClaseContext.Provider>
  )
}

export function useAvisosClase() {
  return useContext(AvisosClaseContext)
}
