// ── El curso del alumno ──────────────────────────────────────────────────────
// Fuente ÚNICA del nivel elegido (primaria / ESO / bachillerato), que hasta
// ahora no existía en ningún sitio: cada pantalla volvía a preguntarlo y
// ninguna recordaba la respuesta de la anterior. El alumno de 3º de ESO veía
// los 91 temas del catálogo por sus tres niveles, cada vez que entraba.
//
// Dos almacenes, a propósito:
//
//   · localStorage — SIEMPRE, con o sin cuenta. Es el que se lee al arrancar,
//     de forma síncrona, para que las rejillas ya salgan filtradas en el
//     primer pintado (esperar a Firestore daría un parpadeo de "todo" a "lo
//     tuyo" en cada carga). También es lo único que tiene el visitante
//     anónimo, que es quien llega por SEO.
//   · users/{uid}.nivel — para quien tiene cuenta, y por tanto varios
//     dispositivos. Gana sobre el local cuando existe: es la respuesta que el
//     usuario dio "de verdad", no la que arrastra este navegador.
//
// Un campo plano en users/{uid} no toca ninguna de las guardas de
// firestore.rules (touchesPaidFields, touchesTeacherProfile...), así que no
// hace falta desplegar rules nuevas. El hijo en modo niño también puede
// escribirlo: es SU curso, y esas guardas solo le cierran teacherProfile.
//
// REGLA DE ORO: sin nivel elegido no se filtra NADA. `null` significa
// "enséñalo todo", que es exactamente el comportamiento que había antes de
// que este fichero existiera. La pregunta solo puede añadir, nunca esconder.

import { useSyncExternalStore } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { GRADOS, GRADO_IDS } from './mathEngine'

const STORAGE_KEY = 'tuthor:nivel'
// Separado del nivel a propósito: "no quiero decirlo" es una respuesta, y hay
// que recordarla. Sin esto, quien cierra la tarjeta se la vuelve a encontrar
// en la siguiente carga, que es justo lo que hace que una app se sienta
// pesada. Solo local: no merece un campo en Firestore ni un viaje de red.
const PREGUNTADO_KEY = 'tuthor:nivel-preguntado'

export const NIVEL_IDS = GRADO_IDS

// Los tres niveles, derivados de GRADOS para no mantener una segunda lista.
export const NIVELES = GRADO_IDS.map(id => ({
  id,
  emoji: GRADOS[id].emoji,
  edades: GRADOS[id].edades,
  label: {
    es: GRADOS[id].label,
    en: GRADOS[id].labelEn || GRADOS[id].label,
    ca: GRADOS[id].labelCa || GRADOS[id].label,
  },
}))

export function isNivel(valor) {
  return NIVEL_IDS.includes(valor)
}

export function nivelLabel(id, lang = 'es') {
  const n = NIVELES.find(x => x.id === id)
  return n ? (n.label[lang] ?? n.label.es) : null
}

// ── Almacén local ────────────────────────────────────────────────────────────
// Todo acceso a localStorage va envuelto: en Safari en privado, con las
// cookies bloqueadas o durante el prerender (donde no hay window) lanza, y un
// selector de curso no puede ser el motivo de que la app entera no arranque.

function leerLocal() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return isNivel(v) ? v : null
  } catch {
    return null
  }
}

function escribirLocal(nivel) {
  try {
    if (nivel === null) window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, nivel)
  } catch {
    // Sin localStorage el nivel dura lo que la pestaña. Aceptable: la cuenta
    // (si la hay) sigue guardándolo en Firestore.
  }
}

// ── "Ya se lo hemos preguntado" ──────────────────────────────────────────────
// La tarjeta de /app solo aparece si no hay nivel Y no se ha cerrado antes.
// Elegir curso también cuenta como preguntado, claro.

export function yaPreguntado() {
  try {
    return window.localStorage.getItem(PREGUNTADO_KEY) === '1'
  } catch {
    return false
  }
}

export function marcarPreguntado() {
  try {
    window.localStorage.setItem(PREGUNTADO_KEY, '1')
  } catch {
    // Sin localStorage la tarjeta reaparecerá. Molesto, no roto.
  }
  publicar({ preguntado: true })
}

// ── Store en memoria ─────────────────────────────────────────────────────────
// Un store de módulo en vez de un Context para no tener que envolver la app en
// otro provider: TemarioGrid y las páginas de tema se pintan en sitios muy
// distintos del árbol, y algunas fuera de los providers actuales. Con
// useSyncExternalStore todos los consumidores se enteran del cambio a la vez.
//
// El estado es UN objeto inmutable que solo se reemplaza cuando algo cambia
// de verdad. useSyncExternalStore compara por identidad: devolver un objeto
// nuevo en cada lectura provocaría un bucle de renders.

let estado = typeof window === 'undefined'
  ? { nivel: null, preguntado: false }
  : { nivel: leerLocal(), preguntado: yaPreguntado() }

const suscriptores = new Set()

function publicar(cambios) {
  const siguiente = { ...estado, ...cambios }
  if (siguiente.nivel === estado.nivel && siguiente.preguntado === estado.preguntado) return
  estado = siguiente
  for (const fn of suscriptores) fn()
}

function suscribir(fn) {
  suscriptores.add(fn)
  return () => suscriptores.delete(fn)
}

function snapshot() {
  return estado
}

// El servidor (prerender) nunca tiene nivel: pinta el catálogo entero, que es
// además lo que debe indexar un crawler. Constante para que su identidad no
// cambie entre lecturas.
const ESTADO_SERVIDOR = { nivel: null, preguntado: false }
function snapshotServidor() {
  return ESTADO_SERVIDOR
}

// Cambia el nivel en memoria + localStorage y avisa a quien lo esté mirando.
// `uid` opcional: con cuenta, además lo sube a Firestore.
export function setNivel(nivel, uid = null) {
  const valor = isNivel(nivel) ? nivel : null
  if (valor !== estado.nivel) {
    escribirLocal(valor)
    publicar({ nivel: valor })
  }
  // Elegir curso ya es responder: no hay que volver a preguntar.
  if (valor) marcarPreguntado()
  if (uid) guardarEnCuenta(uid, valor)
}

export function getNivel() {
  return estado.nivel
}

async function guardarEnCuenta(uid, nivel) {
  try {
    await setDoc(doc(db, 'users', uid), { nivel }, { merge: true })
  } catch {
    // Que no se guarde en la nube no puede romper la navegación: el local ya
    // está escrito y la sesión sigue filtrando bien.
  }
}

// Al iniciar sesión: la cuenta manda. Si el doc ya tiene nivel se adopta; si
// no lo tiene pero este navegador sí, se sube (así quien eligió curso sin
// cuenta y luego se registra no pierde la respuesta).
export async function sincronizarNivel(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid))
    const remoto = snap.exists() ? snap.data().nivel : null
    if (isNivel(remoto)) {
      if (remoto !== estado.nivel) {
        escribirLocal(remoto)
        publicar({ nivel: remoto })
      }
      marcarPreguntado()
      return remoto
    }
    if (estado.nivel) await guardarEnCuenta(uid, estado.nivel)
    return estado.nivel
  } catch {
    return estado.nivel
  }
}

// ── Hooks ────────────────────────────────────────────────────────────────────

// El nivel actual (o null = sin elegir = enséñalo todo).
export function useNivel() {
  return useSyncExternalStore(suscribir, snapshot, snapshotServidor).nivel
}

// ¿Hay que enseñarle la tarjeta del curso? Solo a quien no ha elegido nivel Y
// no la ha cerrado nunca. En el prerender siempre false: un crawler no tiene
// que indexar una pregunta.
export function useDebePreguntarNivel() {
  const s = useSyncExternalStore(suscribir, snapshot, snapshotServidor)
  return !s.nivel && !s.preguntado
}

// ── Filtrado ─────────────────────────────────────────────────────────────────
// El predicado que usan las rejillas. Un item SIN `niveles` declarados vale
// para todos (no se puede afirmar que no sea de su curso), y sin nivel elegido
// pasa todo. Lo mismo hacía TemarioGrid con su filtro 'todas'.
export function coincideNivel(item, nivel) {
  if (!nivel) return true
  if (!item?.niveles?.length) return true
  return item.niveles.includes(nivel)
}
