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
// Las cinco vías de acceso, por orden de evaluación:
//   1. legacyFree  — grandfathering: cuentas anteriores al muro, gratis de por
//                    vida. Lo pone scripts/backfill-legacy-free.mjs con Admin.
//   2. subscription — plan familiar de pago (Stripe → api/stripe-webhook.js).
//   3. teacherProfile — el profesor tiene acceso al producto, no solo al panel.
//   4. patrocinio  — alumno de un profesor con la suscripción viva.
//   5. referralBonusUntil — mes(es) de Pro gratis por invitar (api/apply-
//                    referral.js). Independiente de Stripe a propósito: no
//                    toca facturación real, solo una fecha límite en el doc.
//
// IMPORTANTE: nada de esto es una barrera criptográfica. El contenido va en el
// bundle de JS, así que quien sepa abrir las devtools entra igual. El muro
// existe para el 99% que no lo hará, no para el 1% que sí. La barrera de
// verdad son las rules de Firestore sobre los DATOS (progreso, stats), y que
// `subscription` y `legacyFree` solo los pueda escribir Admin — nunca el
// cliente, que si no se autoconcede el plan con una línea en la consola.

import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from './firebase'
import { hasTeacherAccess } from './classes'
import { useAuth } from '../context/AuthContext'

// Estados de Stripe que dan acceso. `past_due` entra a propósito: Stripe
// reintenta el cobro varios días y echar a una familia el mismo día que le
// caduca la tarjeta genera más bajas que impagos evita. `unpaid` y `canceled`
// no entran: ahí Stripe ya se rindió.
export const ACTIVE_STATUSES = ['active', 'trialing', 'past_due']

// Un solo plan familiar desde que el muro de juegos/exámenes está apagado
// (ver paidRoutes.js): ya no hay mensual/anual con descuento por adelantar
// — Pro es un único precio mensual, así que no hay "ahorra pagando el año"
// que anunciar (por eso ya no existe annualSavings()).
export const PLANS = {
  pro: { price: 1.99, interval: 'month', label: { es: 'Pro', en: 'Pro', ca: 'Pro' } },
}

// Fuera de PLANS a propósito (ver el test "los planes del cliente son solo
// familiares" en access.test.js): el plan de profesor se vende en su propia
// página (Profesores.jsx), no en la landing de familias, y colarlo en PLANS
// lo sacaría también ahí. Aun así necesita UNA fuente de verdad — antes vivía
// escrito a mano en Profesores.jsx ("50€/año", ya obsoleto) y quedaba
// desincronizado del precio real de Stripe cada vez que este cambiaba.
export const TEACHER_PLAN = {
  price: 99.99,
  interval: 'month',
  label: { es: 'Mensual', en: 'Monthly', ca: 'Mensual' },
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

// referralBonusUntil se guarda como epoch millis (número plano, no Timestamp
// de Firestore) a propósito: así este predicado se testea con objetos JS
// normales, igual que hasActiveSubscription, sin tener que simular el SDK.
export function hasReferralBonus(userData) {
  return typeof userData?.referralBonusUntil === 'number' && userData.referralBonusUntil > Date.now()
}

// Por qué tiene acceso — para que la UI diga "eres usuario fundador" o "acceso
// vía tu profesor" en vez de un genérico. null si no tiene.
export function accessReason(userData) {
  if (!userData) return null
  if (userData.legacyFree === true) return 'legacy'
  if (hasActiveSubscription(userData.subscription)) return 'subscription'
  if (hasTeacherAccess(userData.teacherProfile)) return 'teacher'
  if (userData.sponsoredByTeacher?.active === true) return 'sponsored'
  if (hasReferralBonus(userData)) return 'referral'
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

// El resultado se cachea por uid: sin esto, cada navegación a un juego o a un
// examen sería una lectura más de Firestore, y el alumno que va saltando de
// juego en juego pagaría una por pantalla.
//
// No caduca sola. Se limpia al cambiar de sesión y, sobre todo, justo después
// de pagar (PagoGracias): si no, el recién suscrito arrastraría el "no tiene
// acceso" que se cacheó un minuto antes y se comería el muro que acaba de
// pagar por saltarse.
const accessCache = new Map()

export function clearAccessCache(uid) {
  if (uid) accessCache.delete(uid)
  else accessCache.clear()
}

export async function loadAccessCached(uid) {
  if (!uid) return loadAccess(uid)
  if (accessCache.has(uid)) return accessCache.get(uid)
  const result = await loadAccess(uid)
  accessCache.set(uid, result)
  return result
}

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

// ── Hook de conveniencia ────────────────────────────────────────────────────
// "¿Esta cuenta es Pro?" lo necesita más de un sitio ahora que el muro ya no
// protege páginas enteras (ver paidRoutes.js): el panel de Perfil.jsx para
// decidir qué secciones enseña completas, IgraalCard para no mostrarse a
// quien ya paga por quitar publicidad. Sin este hook, cada uno repetiría el
// mismo patrón loadAccessCached + useEffect (que ya vivía, por separado, en
// SubscriptionCard.jsx).
//
// Devuelve `null` mientras no se sabe todavía — un fallo de red no debe
// leerse como "no es Pro" (le ocultaría a un Pro real sus propias secciones
// por un error pasajero), así que se queda en null en vez de resolver a
// `allowed: false`.

// ── Publicidad y venta de Pro EN PAUSA (sept. 2026) ──────────────────────────
// Decisión del usuario: nada de publicidad en los raíles ni de pedir
// suscripción mientras el sitio está creciendo — "dar todo gratis sin
// problema, sin pedir suscripción". SideRails, SupportBlock, ProUpsell,
// IgraalCard y el desglose de pago de Perfil.jsx (ProLock) ya se escondían
// solos con `if (access.allowed) return null` / `if (!isPro) return
// <ProLock/>` en cuanto la cuenta era Pro — así que basta con que este hook
// diga "todo el mundo tiene acceso" para que los cinco desaparezcan a la vez,
// sin tocarlos uno a uno ni desmontar nada.
//
// A propósito NO toca loadAccess/accessReason/hasAccess: MiPlan.jsx (vía
// SubscriptionCard, que llama a loadAccess directamente, nunca a este hook)
// sigue enseñando el estado REAL de Stripe — quien ya paga puede seguir
// gestionando su suscripción, y quien quiera apoyar el proyecto pagando
// igualmente puede seguir haciéndolo desde ahí. Este interruptor solo apaga
// el EMPUJE (anuncios/CTAs), no el cobro en sí, que sigue intacto.
//
// Para reactivar cuando haya tráfico que lo justifique: MONETIZATION_ENABLED
// a true, sin tocar nada más.
const MONETIZATION_ENABLED = false
const FREE_FOR_ALL = { allowed: true, reason: 'free_for_all', warning: null, userData: null }

export function useAccessStatus() {
  const { user } = useAuth()
  const [access, setAccess] = useState(MONETIZATION_ENABLED ? null : FREE_FOR_ALL)

  useEffect(() => {
    if (!MONETIZATION_ENABLED) return
    let alive = true
    // Sin sesión, se resuelve igual por la cadena de promesas (en vez de un
    // setState síncrono en el cuerpo del efecto — react-hooks/set-state-in-effect):
    // Promise.resolve() encadena la misma rama .then() que el caso con uid.
    const pending = user
      ? loadAccessCached(user.uid)
      : Promise.resolve({ allowed: false, reason: null, warning: null, userData: null })
    pending.then(r => { if (alive) setAccess(r) }).catch(() => { /* se queda en null */ })
    return () => { alive = false }
  }, [user])

  return access
}
