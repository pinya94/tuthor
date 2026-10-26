// Ranking de clase sin cuenta (cliente). El profe crea un ranking con su
// cuenta y reparte el código; el alumno se une con código + apodo y sus
// récords suben solos al acabar cada partida. Lo que escribe el alumno pasa
// por api/ranking-clase.js; aquí solo se lee y, el profe, modera.
//
// Firestore:
//   rankingsClase/{codigo}                 { teacherId, nombre, createdAt, cerrado, nAlumnos }
//   rankingsClase/{codigo}/alumnos/{disp}  { apodo, apodoKey, pid, unidoEn }   (solo el profe)
//   rankingsClase/{codigo}/entradas/{pid__juego}  { pid, apodo, juego, puntos, actualizado }
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { generaCodigo, normalizaCodigo } from './apodo'

const CLAVE = 'tuthor_ranking_clase'
const CLAVE_DISP = 'tuthor_dispositivo'

// ── Alumno ──────────────────────────────────────────────────────────────────
function leeLocal(k) { try { return localStorage.getItem(k) } catch { return null } }
function guardaLocal(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v) } catch { /* sin almacenamiento */ } }

export function dispositivo() {
  let d = leeLocal(CLAVE_DISP)
  if (!d || !/^[a-zA-Z0-9-]{16,40}$/.test(d)) {
    d = (globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`).slice(0, 40)
    guardaLocal(CLAVE_DISP, d)
  }
  return d
}

// { codigo, apodo, nombre, pid } o null
export function miRanking() {
  try { const x = JSON.parse(leeLocal(CLAVE) ?? 'null'); return x?.codigo ? x : null } catch { return null }
}
export function salirDelRanking() {
  guardaLocal(CLAVE, null)
  window.dispatchEvent(new Event('tuthor:ranking-clase'))
}

async function llama(cuerpo) {
  const r = await fetch('/api/ranking-clase', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) })
  let j = {}
  try { j = await r.json() } catch { /* respuesta vacía */ }
  if (!r.ok) throw new Error(j.error ?? 'red')
  return j
}

export async function unirse(codigoCrudo, apodo) {
  const codigo = normalizaCodigo(codigoCrudo)
  const j = await llama({ accion: 'unirse', codigo, dispositivo: dispositivo(), apodo })
  guardaLocal(CLAVE, JSON.stringify({ codigo, apodo: j.apodo, nombre: j.nombre, pid: j.pid }))
  window.dispatchEvent(new Event('tuthor:ranking-clase'))
  return j
}

// Sube el récord de una partida. Si el profe cerró o borró el ranking, o
// borró al alumno, se le saca de él para no seguir mandando en balde.
export async function enviarPuntos(juego, puntos) {
  const m = miRanking()
  if (!m) return null
  try {
    return await llama({ accion: 'puntos', codigo: m.codigo, dispositivo: dispositivo(), juego, puntos: Math.max(0, Math.round(Number(puntos) || 0)) })
  } catch (e) {
    if (['no_existe', 'no_unido'].includes(e.message)) salirDelRanking()
    return { error: e.message }
  }
}

// Mensajes de error del servidor, para la pantalla
export const ERRORES = {
  codigo: { es: 'Ese código no es válido: son 6 letras y números.', en: 'That code isn’t valid: it’s 6 letters and numbers.', ca: 'Aquest codi no és vàlid: són 6 lletres i números.' },
  no_existe: { es: 'No hay ningún ranking con ese código.', en: 'There’s no ranking with that code.', ca: 'No hi ha cap rànquing amb aquest codi.' },
  cerrado: { es: 'Tu profe ha cerrado este ranking.', en: 'Your teacher has closed this ranking.', ca: 'El teu profe ha tancat aquest rànquing.' },
  lleno: { es: 'Este ranking ya está lleno.', en: 'This ranking is already full.', ca: 'Aquest rànquing ja és ple.' },
  apodo_ocupado: { es: 'Ese apodo ya lo usa alguien de tu clase. Prueba otro.', en: 'Someone in your class already has that nickname. Try another.', ca: 'Aquest sobrenom ja el fa servir algú de la classe. Prova’n un altre.' },
  apodo_corto: { es: 'El apodo es demasiado corto.', en: 'The nickname is too short.', ca: 'El sobrenom és massa curt.' },
  apodo_largo: { es: 'El apodo puede tener 16 caracteres como mucho.', en: 'The nickname can be 16 characters at most.', ca: 'El sobrenom pot tenir 16 caràcters com a màxim.' },
  apodo_caracteres: { es: 'Usa solo letras, números y espacios.', en: 'Use only letters, numbers and spaces.', ca: 'Fes servir només lletres, números i espais.' },
  apodo_vetado: { es: 'Ese apodo no se puede usar.', en: 'That nickname can’t be used.', ca: 'Aquest sobrenom no es pot fer servir.' },
  red: { es: 'No se ha podido conectar. Prueba otra vez.', en: 'Couldn’t connect. Try again.', ca: 'No s’ha pogut connectar. Torna-ho a provar.' },
}

// ── Lectura (cualquiera con el código) ──────────────────────────────────────
export async function leeRanking(codigo) {
  const s = await getDoc(doc(db, 'rankingsClase', codigo))
  return s.exists() ? { codigo, ...s.data() } : null
}
// Todos los récords del ranking (una clase son unos cientos como mucho)
export async function leeEntradas(codigo, juego) {
  const col = collection(db, 'rankingsClase', codigo, 'entradas')
  const s = await getDocs(juego ? query(col, where('juego', '==', juego)) : col)
  return s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => b.puntos - a.puntos)
}

// Agrupa por juego: [{ juego, filas: [...] }] con los juegos de más jugadores primero
export function porJuego(entradas) {
  const m = new Map()
  for (const e of entradas) { if (!m.has(e.juego)) m.set(e.juego, []); m.get(e.juego).push(e) }
  return [...m.entries()].map(([juego, filas]) => ({ juego, filas: filas.sort((a, b) => b.puntos - a.puntos) }))
    .sort((a, b) => b.filas.length - a.filas.length || a.juego.localeCompare(b.juego))
}

// Posiciones con empates: 100, 80, 80, 50 → 1, 2, 2, 4
export function posiciones(filas) {
  return filas.map((f, i) => (i > 0 && f.puntos === filas[i - 1].puntos ? null : i + 1))
    .map((p, i, a) => { let k = i; while (a[k] == null) k--; return a[k] })
}

// ── Profe ───────────────────────────────────────────────────────────────────
export async function crearRanking(uid, nombre) {
  for (let i = 0; i < 5; i++) {
    const codigo = generaCodigo()
    if (await leeRanking(codigo)) continue
    await setDoc(doc(db, 'rankingsClase', codigo), { teacherId: uid, nombre: nombre.trim().slice(0, 60), createdAt: serverTimestamp(), cerrado: false, nAlumnos: 0 })
    return codigo
  }
  throw new Error('codigo')
}
export async function misRankings(uid) {
  const s = await getDocs(query(collection(db, 'rankingsClase'), where('teacherId', '==', uid)))
  return s.docs.map(d => ({ codigo: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
}
export const cerrarRanking = (codigo, cerrado) => updateDoc(doc(db, 'rankingsClase', codigo), { cerrado })
export const borrarEntrada = (codigo, id) => deleteDoc(doc(db, 'rankingsClase', codigo, 'entradas', id))

// Quita a un alumno: su apodo y todos sus récords (y deja el apodo libre)
export async function borrarAlumno(codigo, pid) {
  const [alumnos, entradas] = await Promise.all([
    getDocs(query(collection(db, 'rankingsClase', codigo, 'alumnos'), where('pid', '==', pid))),
    getDocs(query(collection(db, 'rankingsClase', codigo, 'entradas'), where('pid', '==', pid))),
  ])
  const lote = writeBatch(db)
  alumnos.docs.forEach(d => lote.delete(d.ref))
  entradas.docs.forEach(d => lote.delete(d.ref))
  await lote.commit()
}

export async function borrarRanking(codigo) {
  const [alumnos, entradas] = await Promise.all([
    getDocs(collection(db, 'rankingsClase', codigo, 'alumnos')),
    getDocs(collection(db, 'rankingsClase', codigo, 'entradas')),
  ])
  const docs = [...alumnos.docs, ...entradas.docs]
  for (let i = 0; i < docs.length; i += 400) {
    const lote = writeBatch(db)
    docs.slice(i, i + 400).forEach(d => lote.delete(d.ref))
    await lote.commit()
  }
  await deleteDoc(doc(db, 'rankingsClase', codigo))
}
