// Ranking general «Top de hoy» y «Top del mes» (fase 3 de la portada de
// juegos, nov-2026). Cuenta PUNTOS = las monedas que da cada partida
// (computeCoins, que ya iguala los juegos entre sí), nunca el tiempo jugado:
// decisión del usuario, para no premiar estar enganchado.
//
// Privacidad: muchos jugadores son menores, así que aquí NO se publica el
// nombre ni la foto de la cuenta. Cada uno sale con un APODO AUTOMÁTICO fijo,
// sacado de su uid («Erizo Veloz 42»), sin texto libre que moderar. En
// Firestore se guarda solo la clave del apodo («3-7-42»); el texto se pinta en
// el idioma de quien mira.
//
// Firestore: rankings/{periodo}/entries/{uid} = { apodo, puntos, updatedAt }
// con periodo 'd-AAAA-MM-DD' (día) o 'm-AAAA-MM' (mes), en hora de España.
// Las rules solo dejan sumar 0-500 por escritura y una cada 15 s.
import { doc, setDoc, getDocs, getDoc, collection, query, orderBy, limit, where, getCountFromServer, increment, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

// Animales en masculino en los tres idiomas (para que el adjetivo concuerde)
// y emojis de Unicode ≤ 11 (Windows 10, ver emoji-support.test.js).
export const ANIMALES = [
  { emoji: '🦔', es: 'Erizo', en: 'Hedgehog', ca: 'Eriçó' },
  { emoji: '🐺', es: 'Lobo', en: 'Wolf', ca: 'Llop' },
  { emoji: '🦉', es: 'Búho', en: 'Owl', ca: 'Mussol' },
  { emoji: '🐯', es: 'Tigre', en: 'Tiger', ca: 'Tigre' },
  { emoji: '🐬', es: 'Delfín', en: 'Dolphin', ca: 'Dofí' },
  { emoji: '🐨', es: 'Koala', en: 'Koala', ca: 'Koala' },
  { emoji: '🐼', es: 'Panda', en: 'Panda', ca: 'Panda' },
  { emoji: '🦅', es: 'Halcón', en: 'Hawk', ca: 'Falcó' },
  { emoji: '🐧', es: 'Pingüino', en: 'Penguin', ca: 'Pingüí' },
  { emoji: '🐻', es: 'Oso', en: 'Bear', ca: 'Ós' },
  { emoji: '🦁', es: 'León', en: 'Lion', ca: 'Lleó' },
  { emoji: '🐱', es: 'Gato', en: 'Cat', ca: 'Gat' },
  { emoji: '🐴', es: 'Caballo', en: 'Horse', ca: 'Cavall' },
  { emoji: '🐲', es: 'Dragón', en: 'Dragon', ca: 'Drac' },
  { emoji: '🐙', es: 'Pulpo', en: 'Octopus', ca: 'Pop' },
  { emoji: '🦊', es: 'Zorro', en: 'Fox', ca: 'Guineu' },
]
// Adjetivos invariables en castellano; en catalán, la forma que va con el
// animal (Guineu es femenino: lleva su propia forma).
export const ADJETIVOS = [
  { es: 'Veloz', en: 'Swift', ca: 'Veloç', caF: 'Veloç' },
  { es: 'Valiente', en: 'Brave', ca: 'Valent', caF: 'Valenta' },
  { es: 'Feliz', en: 'Happy', ca: 'Feliç', caF: 'Feliç' },
  { es: 'Audaz', en: 'Bold', ca: 'Audaç', caF: 'Audaç' },
  { es: 'Genial', en: 'Great', ca: 'Genial', caF: 'Genial' },
  { es: 'Brillante', en: 'Bright', ca: 'Brillant', caF: 'Brillant' },
  { es: 'Ágil', en: 'Nimble', ca: 'Àgil', caF: 'Àgil' },
  { es: 'Tenaz', en: 'Tough', ca: 'Tenaç', caF: 'Tenaç' },
  { es: 'Alegre', en: 'Cheerful', ca: 'Alegre', caF: 'Alegre' },
  { es: 'Amable', en: 'Kind', ca: 'Amable', caF: 'Amable' },
  { es: 'Fuerte', en: 'Strong', ca: 'Fort', caF: 'Forta' },
  { es: 'Sagaz', en: 'Clever', ca: 'Sagaç', caF: 'Sagaç' },
]
const FEMENINO_CA = new Set([15]) // Guineu

// Clave fija del apodo a partir del uid: «animal-adjetivo-número»
export function apodoDe(uid) {
  let h = 2166136261
  for (const c of String(uid)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0 }
  const a = h % ANIMALES.length
  const j = Math.floor(h / ANIMALES.length) % ADJETIVOS.length
  const n = 10 + (Math.floor(h / (ANIMALES.length * ADJETIVOS.length)) % 90)
  return `${a}-${j}-${n}`
}

// { emoji, texto } en el idioma pedido
export function apodoTexto(clave, lang = 'es') {
  const [a, j, n] = String(clave).split('-').map(Number)
  const an = ANIMALES[a] ?? ANIMALES[0], ad = ADJETIVOS[j] ?? ADJETIVOS[0]
  const L = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const texto = L === 'en' ? `${ad.en} ${an.en} ${n}`
    : L === 'ca' ? `${an.ca} ${FEMENINO_CA.has(a) ? ad.caF : ad.ca} ${n}`
    : `${an.es} ${ad.es} ${n}`
  return { emoji: an.emoji, texto }
}

// Fecha en España (el «hoy» del ranking no cambia a la 1:00 por UTC)
function fechaEspana(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}
export function periodos(d = new Date()) {
  const f = fechaEspana(d)
  return { hoy: `d-${f}`, mes: `m-${f.slice(0, 7)}` }
}

const entrada = (periodo, uid) => doc(db, 'rankings', periodo, 'entries', uid)
const entradas = periodo => collection(db, 'rankings', periodo, 'entries')

// Suma los puntos de una partida al día y al mes. No crítico: si falla
// (sin red, demasiado seguido), la partida ya está guardada igual.
export async function sumarAlRanking(uid, puntos) {
  const p = Math.min(Math.max(0, Math.round(puntos || 0)), 500)
  if (!uid || p <= 0) return
  const { hoy, mes } = periodos()
  const datos = { apodo: apodoDe(uid), puntos: increment(p), updatedAt: serverTimestamp() }
  await Promise.all([hoy, mes].map(per => setDoc(entrada(per, uid), datos, { merge: true }).catch(() => {})))
}

export async function getTop(periodo, n = 20) {
  try {
    const snap = await getDocs(query(entradas(periodo), orderBy('puntos', 'desc'), limit(n)))
    return snap.docs.map(d => ({ uid: d.id, ...d.data() }))
  } catch { return [] }
}

// { puesto, puntos, total } del jugador, o null si aún no ha puntuado
export async function getMiPuesto(periodo, uid) {
  if (!uid) return null
  try {
    const mio = await getDoc(entrada(periodo, uid))
    if (!mio.exists()) return null
    const puntos = mio.data().puntos || 0
    const [encima, total] = await Promise.all([
      getCountFromServer(query(entradas(periodo), where('puntos', '>', puntos))),
      getCountFromServer(entradas(periodo)),
    ])
    return { puesto: encima.data().count + 1, puntos, total: total.data().count }
  } catch { return null }
}
