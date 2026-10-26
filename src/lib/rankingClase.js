// Retos de clase sin cuenta (cliente). El profe crea un reto con su cuenta y
// reparte el código; el alumno se une con código + apodo. Tres modos:
//   ranking  sus récords de cualquier juego suben solos al acabar cada partida
//   deberes  un examen (con su nivel y una nota del profe); cuenta su mejor nota
//   directo  el profe lleva la partida desde la pizarra; los móviles responden
// Lo que escribe el alumno pasa por api/ranking-clase.js; aquí se lee y el
// profe modera y, en directo, lleva el ritmo.
//
// Firestore:
//   rankingsClase/{codigo}                 { teacherId, nombre, createdAt, cerrado,
//                                            modo, examen, nivel, nPreguntas, segundos, nota, classId,
//                                            directo: { estado, i, inicio, ronda } }
//   rankingsClase/{codigo}/marcador/{pid}  { pid, apodo, puntos, aciertos }           (directo)
//   rankingsClase/{codigo}/respuestas/{pid__i}  { pid, i, correcta, puntos }        (directo)
//   rankingsClase/{codigo}/alumnos/{disp}  { apodo, apodoKey, pid, unidoEn }   (solo el profe)
//   rankingsClase/{codigo}/entradas/{pid__juego}  { pid, apodo, juego, puntos, actualizado }
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp, writeBatch, onSnapshot, getCountFromServer } from 'firebase/firestore'
import { db } from './firebase'
import { generaCodigo, normalizaCodigo } from './apodo'

const CLAVE = 'tuthor_ranking_clase'
const CLAVE_RETOS = 'tuthor_retos' // { codigo: { apodo, nombre, pid, modo } } de todos los retos en que está
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

// Los retos en que está este dispositivo (deberes y directo no cambian el
// ranking libre de miRanking)
function retos() { try { return JSON.parse(leeLocal(CLAVE_RETOS) ?? '{}') ?? {} } catch { return {} } }
export const miembroDe = codigo => retos()[codigo] ?? null
function olvida(codigo) {
  const r = retos(); delete r[codigo]; guardaLocal(CLAVE_RETOS, JSON.stringify(r))
  if (miRanking()?.codigo === codigo) guardaLocal(CLAVE, null)
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
  const yo = { codigo, apodo: j.apodo, nombre: j.nombre, pid: j.pid, modo: j.modo }
  guardaLocal(CLAVE_RETOS, JSON.stringify({ ...retos(), [codigo]: yo }))
  if ((j.modo ?? 'ranking') === 'ranking') guardaLocal(CLAVE, JSON.stringify(yo))
  window.dispatchEvent(new Event('tuthor:ranking-clase'))
  return { ...j, codigo }
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

// La nota de un examen de deberes (aciertos sobre 10, en puntos 0-100)
export async function enviarNota(codigo, examen, puntos) {
  try {
    return await llama({ accion: 'puntos', codigo, dispositivo: dispositivo(), juego: examen, puntos: Math.round(puntos) })
  } catch (e) {
    if (['no_existe', 'no_unido'].includes(e.message)) olvida(codigo)
    return { error: e.message }
  }
}
// Una respuesta en directo (el acierto lo calcula el propio juego)
export async function responder(codigo, i, correcta) {
  try {
    return await llama({ accion: 'responde', codigo, dispositivo: dispositivo(), i, correcta: !!correcta })
  } catch (e) {
    if (['no_existe', 'no_unido'].includes(e.message)) olvida(codigo)
    return { error: e.message }
  }
}

// Mensajes de error del servidor, para la pantalla
export const ERRORES = {
  codigo: { es: 'Ese código no es válido: son 6 letras y números.', en: 'That code isn’t valid: it’s 6 letters and numbers.', ca: 'Aquest codi no és vàlid: són 6 lletres i números.' },
  no_existe: { es: 'No hay ningún ranking con ese código.', en: 'There’s no ranking with that code.', ca: 'No hi ha cap rànquing amb aquest codi.' },
  otro_juego: { es: 'Este reto es de otro juego.', en: 'This challenge is for a different game.', ca: 'Aquest repte és d’un altre joc.' },
  tarde: { es: 'Se acabó el tiempo de esta pregunta.', en: 'Time’s up for this question.', ca: 'S’ha acabat el temps d’aquesta pregunta.' },
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

// En directo: el ranking y sus récords, avisando en cuanto cambian (la
// pizarra se actualiza al momento). Devuelve la función para dejar de escuchar.
export function escuchaRanking(codigo, { onRanking, onEntradas, onError }) {
  const fuera1 = onSnapshot(doc(db, 'rankingsClase', codigo),
    s => onRanking(s.exists() ? { codigo, ...s.data() } : null), onError)
  const fuera2 = onSnapshot(collection(db, 'rankingsClase', codigo, 'entradas'),
    s => onEntradas(s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => b.puntos - a.puntos)), onError)
  return () => { fuera1(); fuera2() }
}
// En directo: el reto (con su estado) y una colección suya, al momento
export const escuchaReto = (codigo, cb, onError) =>
  onSnapshot(doc(db, 'rankingsClase', codigo), s => cb(s.exists() ? { codigo, ...s.data() } : null), onError)
export const escuchaColeccion = (codigo, col, cb, filtro) =>
  onSnapshot(filtro ? query(collection(db, 'rankingsClase', codigo, col), where(...filtro)) : collection(db, 'rankingsClase', codigo, col),
    s => cb(s.docs.map(d => ({ id: d.id, ...d.data() }))), () => cb([]))

// ── Pizarra (el profe lleva el ritmo) ───────────────────────────────────────
// La pregunta va como texto JSON: la genera la pizarra con el generador del
// juego y así TODOS los móviles ven la misma (y Firestore no admite listas
// dentro de listas, que algunas rondas llevan).
export const lanzaPregunta = (codigo, i, ronda) =>
  updateDoc(doc(db, 'rankingsClase', codigo), { directo: { estado: 'pregunta', i, inicio: serverTimestamp(), ronda: JSON.stringify(ronda) } })
export const muestraSolucion = (codigo, dir) =>
  updateDoc(doc(db, 'rankingsClase', codigo), { directo: { ...dir, estado: 'solucion' } })
export const terminaDirecto = (codigo, dir) =>
  updateDoc(doc(db, 'rankingsClase', codigo), { directo: { ...dir, estado: 'fin' } })
// Volver a jugar: borra marcador y respuestas y vuelve a la sala
export async function reiniciaDirecto(codigo) {
  const cols = await Promise.all(['marcador', 'respuestas'].map(c => getDocs(collection(db, 'rankingsClase', codigo, c))))
  const docs = cols.flatMap(c => c.docs)
  for (let i = 0; i < docs.length; i += 400) {
    const lote = writeBatch(db)
    docs.slice(i, i + 400).forEach(d => lote.delete(d.ref))
    await lote.commit()
  }
  await updateDoc(doc(db, 'rankingsClase', codigo), { directo: { estado: 'sala', i: -1 } })
}

// Cuántos alumnos se han unido (solo lo puede contar el profe)
export async function cuentaAlumnos(codigo) {
  return (await getCountFromServer(collection(db, 'rankingsClase', codigo, 'alumnos'))).data().count
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
export const crearRanking = (uid, nombre) => crearReto(uid, { nombre, modo: 'ranking' })
// opciones: { nombre, modo, examen, nivel, nPreguntas, segundos, nota, classId }
export async function crearReto(uid, o) {
  const datos = { teacherId: uid, nombre: String(o.nombre).trim().slice(0, 60), createdAt: serverTimestamp(), cerrado: false, modo: o.modo ?? 'ranking' }
  if (datos.modo !== 'ranking') {
    Object.assign(datos, { examen: o.examen, nivel: o.nivel ?? 0, nPreguntas: o.nPreguntas ?? 10 })
    if (datos.modo === 'directo') datos.segundos = o.segundos ?? 30
  }
  if (o.nota?.trim()) datos.nota = o.nota.trim().slice(0, 400)
  if (o.classId) datos.classId = o.classId
  for (let i = 0; i < 5; i++) {
    const codigo = generaCodigo()
    if (await leeRanking(codigo)) continue
    await setDoc(doc(db, 'rankingsClase', codigo), datos)
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
  const cols = await Promise.all(['alumnos', 'entradas', 'marcador', 'respuestas'].map(c => getDocs(collection(db, 'rankingsClase', codigo, c))))
  const docs = cols.flatMap(c => c.docs)
  for (let i = 0; i < docs.length; i += 400) {
    const lote = writeBatch(db)
    docs.slice(i, i + 400).forEach(d => lote.delete(d.ref))
    await lote.commit()
  }
  await deleteDoc(doc(db, 'rankingsClase', codigo))
}

// El nivel del reto en los niveles de un examen (no todos tienen tres)
export function nivelDelReto(levels, nivel = 0) {
  const lv = levels?.[Math.min(nivel, (levels?.length ?? 1) - 1)] ?? levels?.[0]
  return { lv, difficulty: lv?.difficulty ?? lv?.key ?? lv }
}
