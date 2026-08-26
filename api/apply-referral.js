// Acredita una invitación: quien invitó gana un mes de Pro gratis cuando la
// persona invitada crea una cuenta nueva de verdad.
//
// Por qué en el servidor con Admin y no un updateDoc del cliente: dar acceso
// (aunque sea temporal) es exactamente lo que touchesPaidFields() en
// firestore.rules prohíbe escribir al propio usuario — si no, cualquiera se
// autoconcede meses de Pro editando su doc desde la consola. Este endpoint es
// la única puerta, igual que api/stripe-webhook.js para las suscripciones de
// verdad.
//
// El disparador es "se ha registrado" (isNewUser de Firebase), no "se ha
// hecho Pro" — decisión explícita del usuario, sabiendo que es más fácil de
// abusar que exigir un pago real. Las dos defensas que sí lleva: un mismo
// invitado solo puede acreditarse UNA vez (idempotente, por si el cliente
// reintenta) y el banco de meses tiene un tope (MAX_BANKED_MONTHS) para que
// una granja de cuentas no acumule Pro gratis indefinido.
import { getDb, getAdminAuth, fail } from './_admin.js'

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000
const MAX_BANKED_MONTHS = 12

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })

  const authHeader = String(req.headers.authorization ?? '')
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' })

  let db, decoded
  try {
    db = await getDb()
    const adminAuth = await getAdminAuth()
    try {
      decoded = await adminAuth.verifyIdToken(authHeader.slice(7))
    } catch {
      return res.status(401).json({ error: 'unauthorized' })
    }
  } catch (err) {
    return fail(res, err, 'apply-referral/init')
  }

  // El invitado es quien llama: una sesión de hijo no es un registro nuevo
  // (comparte uid con el padre), así que no debería llegar aquí nunca — se
  // rechaza igual, por si acaso.
  if (decoded.childMode === true) return res.status(403).json({ error: 'child_session' })

  const referredUid = decoded.uid
  const referrerUid = String(req.body?.referrerUid ?? '')
  if (!referrerUid) return res.status(400).json({ error: 'missing_referrer' })
  if (referrerUid === referredUid) return res.status(400).json({ error: 'self_referral' })

  try {
    const referredRef = db.doc(`users/${referredUid}`)
    const referrerRef = db.doc(`users/${referrerUid}`)

    const result = await db.runTransaction(async tx => {
      const [referredSnap, referrerSnap] = await Promise.all([tx.get(referredRef), tx.get(referrerRef)])

      if (!referrerSnap.exists) return { ok: false, reason: 'referrer_not_found' }
      // Ya acreditado: no es un error, es que el cliente ha reintentado (o el
      // efecto de React se ha vuelto a disparar). Responder OK sin repetir el
      // premio es más correcto que un 4xx que el cliente no sabría manejar.
      if (referredSnap.exists && referredSnap.data().referredBy) return { ok: true, already: true }

      const now = Date.now()
      const referrerData = referrerSnap.data() ?? {}
      const currentUntil = typeof referrerData.referralBonusUntil === 'number' ? referrerData.referralBonusUntil : 0
      const base = Math.max(currentUntil, now)
      const cap = now + MAX_BANKED_MONTHS * ONE_MONTH_MS
      const nextUntil = Math.min(base + ONE_MONTH_MS, cap)

      tx.set(referredRef, { referredBy: referrerUid, referredAt: now }, { merge: true })
      tx.set(referrerRef, {
        referralBonusUntil: nextUntil,
        referralCount: (referrerData.referralCount ?? 0) + 1,
      }, { merge: true })

      return { ok: true, already: false }
    })

    if (!result.ok) return res.status(404).json({ error: result.reason })
    return res.status(200).json({ ok: true })
  } catch (err) {
    return fail(res, err, 'apply-referral')
  }
}
