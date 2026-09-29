// Preferencia de fondo de la app: 'liso' (plano, limpio, sin animación) o
// 'bosque' (la ilustración pixel-art con luciérnagas de siempre).
//
// Vive en localStorage y no en Firestore: es una preferencia de este
// navegador, funciona sin cuenta y no merece una lectura de red al arrancar.
// Cualquier acceso a localStorage va en try/catch: en modo privado, con los
// datos del sitio bloqueados o durante el prerender puede lanzar o no existir,
// y en ese caso se usa el valor por defecto sin romper nada.
import { useSyncExternalStore } from 'react'

export const FONDOS = ['liso', 'bosque']
export const FONDO_POR_DEFECTO = 'liso'

const CLAVE = 'tuthor-fondo'
const EVENTO = 'tuthor-fondo-cambio'

// Solo se usa si localStorage no deja guardar: el cambio dura lo que la pestaña.
let memoria = null

export function getFondo() {
  try {
    const v = window.localStorage.getItem(CLAVE)
    if (FONDOS.includes(v)) return v
  } catch { /* sin acceso: cae a memoria o al defecto */ }
  return memoria ?? FONDO_POR_DEFECTO
}

export function setFondo(valor) {
  if (!FONDOS.includes(valor)) return
  try { window.localStorage.setItem(CLAVE, valor) } catch { memoria = valor }
  window.dispatchEvent(new Event(EVENTO))
}

function suscribir(cb) {
  window.addEventListener(EVENTO, cb)
  window.addEventListener('storage', cb) // lo cambiaron en otra pestaña
  return () => {
    window.removeEventListener(EVENTO, cb)
    window.removeEventListener('storage', cb)
  }
}

export function useFondo() {
  return useSyncExternalStore(suscribir, getFondo, () => FONDO_POR_DEFECTO)
}
