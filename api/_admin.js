// Inicialización compartida de Firebase Admin para los endpoints de /api.
// El prefijo _ evita que Vercel lo publique como ruta.
//
// Admin NO pasa por firestore.rules: es server-to-server, no un usuario
// autenticado. Por eso es lo único que puede escribir los campos que dan
// acceso de pago (subscription, legacyFree, childCode) — ver touchesPaidFields()
// en firestore.rules.
//
// api/stripe-webhook.js mantiene su propia inicialización a propósito: es
// código de cobro en producción y no merece la pena tocarlo para ahorrar seis
// líneas.
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

if (!getApps().length) {
  initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) })
}

export const db = getFirestore()
export const adminAuth = getAuth()

// Alfabeto sin caracteres que un niño pueda confundir al teclear (sin 0/O ni
// 1/I/L). Mismo criterio que los códigos de clase en src/lib/classes.js.
export const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
export const CODE_LENGTH = 12

// Deja el código en su forma canónica: mayúsculas y sin nada que no sea
// alfanumérico. Así da igual que el niño lo escriba con guiones, espacios o en
// minúsculas — el padre se lo habrá pasado copiado de cualquier manera.
export function normalizeCode(raw) {
  return String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '')
}
