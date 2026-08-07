// ── Acceso de pago ───────────────────────────────────────────────────────────
// Punto ÚNICO que decide si una cuenta puede usar el producto de pago (juegos
// y exámenes). Mismo papel que hasTeacherAccess() en classes.js, y por el
// mismo motivo: la condición se consulta desde la navbar, desde el muro de
// cada juego y desde el panel, y triplicarla garantiza que algún día
// diverjan.
//
// Qué NO gatea: las páginas de funnel SEO (/info/*, /estudiar/*) son gratis
// para todo el mundo, con y sin sesión. Ver docs/monetizacion.md.
//
// Las cuatro vías de acceso, por orden de evaluación:
//   1. legacyFree  — grandfathering: cuentas anteriores al muro, gratis de por
//                    vida. Lo pone scripts/backfill-legacy-free.mjs con Admin.
//   2. subscription — plan familiar de pago (Stripe → api/stripe-webhook.js).
//   3. teacherProfile — el profesor tiene acceso al producto, no solo al panel.
//   4. patrocinio  — alumno de un profesor con la suscripción viva.
//
// IMPORTANTE: nada de esto es una barrera criptográfica. El contenido va en el
// bundle de JS, así que quien sepa abrir las devtools entra igual. El muro
// existe para el 99% que no lo hará, no para el 1% que sí. La barrera de
// verdad son las rules de Firestore sobre los DATOS (progreso, stats), y que
// `subscription` y `legacyFree` solo los pueda escribir Admin — nunca el
// cliente, que si no se autoconcede el plan con una línea en la consola.

import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'
import { hasTeacherAccess } from './classes'

// Estados de Stripe que dan acceso. `past_due` entra a propósito: Stripe
// reintenta el cobro varios días y echar a una familia el mismo día que le
// caduca la tarjeta genera más bajas que impagos evita. `unpaid` y `canceled`
// no entran: ahí Stripe ya se rindió.
export const ACTIVE_STATUSES = ['active', 'trialing', 'past_due']

export const PLANS = {
  family_monthly: { price: 9.99,  interval: 'month', label: { es: 'Mensual', en: 'Monthly', ca: 'Mensual' } },
  family_annual:  { price: 69.99, interval: 'year',  label: { es: 'Anual',   en: 'Annual',  ca: 'Anual' } },
}

// Lo que se ahorra pagando el año de golpe. Se calcula en vez de escribirse a
// mano porque es el número que va en el copy de la landing ("ahorras un 42 %"),
// y un precio que cambia sin que cambie el reclamo es publicidad engañosa.
export function annualSavings() {
  const twelveMonths = PLANS.family_monthly.price * 12
  const annual = PLANS.family_annual.price
  return {
    amount: Math.round((twelveMonths - annual) * 100) / 100,
    percent: Math.round((1 - annual / twelveMonths) * 100),
    equivalentMonthly: Math.round((annual / 12) * 100) / 100,
  }
}

// ── Predicados puros ─────────────────────────────────────────────────────────
// Todos reciben datos ya leídos y devuelven un booleano: se pueden testear sin
// tocar Firestore y se pueden llamar en render sin await.

export function hasActiveSubscription(subscription) {
  return ACTIVE_STATUSES.includes(subscription?.status)
}

// `userData` es el doc users/{uid} tal cual — UNA sola lectura resuelve el
// acceso, incluido el patrocinio.
//
// El patrocinio (alumno de un profesor que paga) NO se resuelve leyendo el doc
// del profesor: las rules no lo permiten y abrirlas expondría su doc entero
// (email incluido) a treinta críos. Va denormalizado en `sponsoredByTeacher`
// dentro del doc del propio alumno, que escribe Admin desde el webhook cuando
// la suscripción del profesor cambia y al unirse a la clase.
export function hasAccess(userData) {
  return accessReason(userData) !== null
}

// Por qué tiene acceso — para que la UI diga "eres usuario fundador" o "acceso
// vía tu profesor" en vez de un genérico. null si no tiene.
export function accessReason(userData) {
  if (!userData) return null
  if (userData.legacyFree === true) return 'legacy'
  if (hasActiveSubscription(userData.subscription)) return 'subscription'
  if (hasTeacherAccess(userData.teacherProfile)) return 'teacher'
  if (userData.sponsoredByTeacher?.active === true) return 'sponsored'
  return null
}

// Una suscripción que sigue dando acceso pero que el usuario debería arreglar
// ya (tarjeta rechazada) o que se acaba pronto (cancelada a fin de periodo).
// Devuelve null si no hay nada que avisar.
export function subscriptionWarning(subscription) {
  if (!subscription) return null
  if (subscription.status === 'past_due') return 'payment_failed'
  if (subscription.cancelAtPeriodEnd === true) return 'ending'
  return null
}

// ── Carga ────────────────────────────────────────────────────────────────────

// Resuelve el acceso de un uid con UNA lectura. Un fallo de red no debe
// abrir el muro ni cerrarlo a quien ha pagado: se propaga la excepción y
// decide quien llame (el muro muestra "no hemos podido comprobar tu cuenta"
// y un reintento, no un "paga").
export async function loadAccess(uid) {
  if (!uid) return { allowed: false, reason: null, warning: null, userData: null }

  const snap = await getDoc(doc(db, 'users', uid))
  const userData = snap.exists() ? snap.data() : null

  return {
    allowed: hasAccess(userData),
    reason: accessReason(userData),
    warning: subscriptionWarning(userData?.subscription),
    userData,
  }
}
