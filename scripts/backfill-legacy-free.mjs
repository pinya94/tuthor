// ── Grandfathering: acceso gratis de por vida a las cuentas anteriores al muro
//
// Marca `legacyFree: true` en todos los users/{uid} que ya existan. A partir de
// ahí, accessReason() (src/lib/access.js) les da acceso permanente sin pasar
// por Stripe.
//
// ESTE SCRIPT TIENE FECHA LÍMITE: hay que ejecutarlo ANTES de que el muro esté
// vivo en producción. En cuanto se publique el muro, las cuentas nuevas se
// mezclan con las viejas y ya no hay forma de distinguirlas — el createdAt no
// sirve de corte porque el despliegue no es instantáneo y quien se registre
// durante el rollout quedaría del lado equivocado.
//
// Usa Firebase Admin a propósito: `legacyFree` es un campo que firestore.rules
// prohíbe escribir al cliente (touchesPaidFields), justamente para que nadie se
// autoconceda el acceso. Admin no pasa por las rules.
//
// Uso:
//   node scripts/backfill-legacy-free.mjs              → simulacro, no escribe
//   node scripts/backfill-legacy-free.mjs --apply      → escribe de verdad
//   node scripts/backfill-legacy-free.mjs --apply --since=2024-01-01
//                                                      → solo los que entraron
//                                                        desde esa fecha
//
// Credenciales: la misma variable que usa api/stripe-webhook.js.
//   PowerShell:  $env:FIREBASE_SERVICE_ACCOUNT = (Get-Content sa.json -Raw)
//   bash:        export FIREBASE_SERVICE_ACCOUNT="$(cat sa.json)"
// También vale GOOGLE_APPLICATION_CREDENTIALS con la ruta al JSON.

import { readFileSync } from 'node:fs'
import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

const APPLY = process.argv.includes('--apply')
const sinceArg = process.argv.find(a => a.startsWith('--since='))
const SINCE = sinceArg ? new Date(sinceArg.split('=')[1]) : null

if (SINCE && Number.isNaN(SINCE.getTime())) {
  console.error('--since necesita una fecha válida, p. ej. --since=2024-01-01')
  process.exit(1)
}

// Firestore admite hasta 500 escrituras por lote; 400 deja margen y hace los
// reintentos más baratos si uno falla.
const BATCH_SIZE = 400
const PAGE_SIZE = 1000

function credential() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT
  if (raw) return cert(JSON.parse(raw))
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (path) return cert(JSON.parse(readFileSync(path, 'utf8')))
  return applicationDefault()
}

if (!getApps().length) initializeApp({ credential: credential() })
const db = getFirestore()

async function main() {
  console.log(APPLY
    ? '⚠  MODO REAL: se van a escribir cambios en Firestore.'
    : '🔍 Simulacro (sin --apply): no se escribe nada.')
  if (SINCE) console.log(`   Filtro: solo cuentas con lastLogin/createdAt desde ${SINCE.toISOString().slice(0, 10)}`)
  console.log('')

  let cursor = null
  let scanned = 0, marked = 0, already = 0, skipped = 0
  // Se pagina por __name__ (el id del doc) en vez de por createdAt: es el
  // único campo que TODOS los docs tienen garantizado y con orden total, así
  // que ningún usuario se queda fuera ni sale dos veces.
  for (;;) {
    let q = db.collection('users').orderBy('__name__').limit(PAGE_SIZE)
    if (cursor) q = q.startAfter(cursor)
    const snap = await q.get()
    if (snap.empty) break
    cursor = snap.docs[snap.docs.length - 1]

    let batch = db.batch()
    let pending = 0

    for (const docSnap of snap.docs) {
      scanned++
      const data = docSnap.data()

      // Idempotente: si ya está marcado, no se vuelve a tocar. Así el script
      // se puede relanzar sin miedo si se corta a medias.
      if (data.legacyFree === true) { already++; continue }

      if (SINCE) {
        const ts = data.lastLogin ?? data.createdAt
        const date = ts?.toDate?.() ?? null
        if (!date || date < SINCE) { skipped++; continue }
      }

      marked++
      if (APPLY) {
        batch.set(docSnap.ref, {
          legacyFree: true,
          legacyFreeAt: FieldValue.serverTimestamp(),
        }, { merge: true })
        pending++
        if (pending >= BATCH_SIZE) {
          await batch.commit()
          batch = db.batch()
          pending = 0
        }
      }
    }

    if (APPLY && pending > 0) await batch.commit()
    console.log(`  … ${scanned} cuentas revisadas`)
  }

  console.log('')
  console.log(`Revisadas:            ${scanned}`)
  console.log(`Ya estaban marcadas:  ${already}`)
  console.log(`${APPLY ? 'Marcadas ahora:      ' : 'Se marcarían:        '} ${marked}`)
  if (SINCE) console.log(`Fuera del filtro:     ${skipped}`)
  console.log('')
  if (!APPLY && marked > 0) {
    console.log('Repite con --apply para escribirlo de verdad.')
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1) })
