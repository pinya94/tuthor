// Acceso compartido a Firebase Admin para los endpoints de /api.
// El prefijo _ evita que Vercel lo publique como ruta.
//
// Admin NO pasa por firestore.rules: es server-to-server, no un usuario
// autenticado. Por eso es lo único que puede escribir los campos que dan
// acceso de pago (subscription, legacyFree, childCode) — ver touchesPaidFields()
// en firestore.rules.
//
// TODO se inicializa de forma perezosa, y a propósito. Hacerlo en el cuerpo del
// módulo (que es como estaba) significa que cualquier fallo —una variable de
// entorno ausente, un módulo que el empaquetador no incluyó— revienta al
// importar, antes de que exista un handler. Vercel entonces solo puede
// responder FUNCTION_INVOCATION_FAILED, sin decir qué ha pasado. Con la
// inicialización dentro de una función, el error es capturable y se puede
// registrar y devolver con sentido.
import { initializeApp, cert, getApps } from 'firebase-admin/app'

let appReady = false

function ensureApp() {
  if (appReady || getApps().length) { appReady = true; return }
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT
  if (!raw) throw new Error('falta la variable de entorno FIREBASE_SERVICE_ACCOUNT')
  let credentials
  try {
    credentials = JSON.parse(raw)
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT no es JSON válido')
  }
  initializeApp({ credential: cert(credentials) })
  appReady = true
}

// Import dinámico con string literal: sigue siendo rastreable por el
// empaquetador de Vercel, pero si aun así faltara el módulo el fallo ocurre
// aquí dentro —capturable— y no al cargar el fichero.
export async function getDb() {
  ensureApp()
  const { getFirestore } = await import('firebase-admin/firestore')
  return getFirestore()
}

// OJO con la versión de Node: verifyIdToken pasa por jwks-rsa, que es CommonJS
// y hace require('jose'), y jose 6 es solo ESM. require() de un módulo ESM no
// existe hasta Node 22.12, así que en Node 18 o 20 esto revienta con
// "require() of ES Module ... not supported". De ahí el campo `engines` en
// package.json: no es cosmético, es lo que mantiene vivos los endpoints que
// verifican tokens (create-checkout y child-code).
//
// createCustomToken no se ve afectado: firma con la clave del service account
// y no toca jwks-rsa. Por eso child-login funcionaba mientras los otros dos no.
export async function getAdminAuth() {
  ensureApp()
  const { getAuth } = await import('firebase-admin/auth')
  return getAuth()
}

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

// Envoltorio común de los handlers: convierte una excepción en un 500 con
// traza en los logs. `detail` viaja al cliente solo si DEBUG_API está puesta,
// para poder diagnosticar un despliegue sin acceso a la consola de Vercel sin
// dejar las tripas expuestas de forma permanente.
export function fail(res, err, where) {
  console.error(`${where} error:`, err)
  const body = { error: 'unknown' }
  if (process.env.DEBUG_API) body.detail = err?.message ?? String(err)
  return res.status(500).json(body)
}
