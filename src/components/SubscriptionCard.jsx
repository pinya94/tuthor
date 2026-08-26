import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { loadAccess, PLANS, TEACHER_PLAN } from '../lib/access'
import { openBillingPortal, startCheckout } from '../lib/checkout'

// "Mi plan": qué tiene contratado esta cuenta y el botón para gestionarlo.
//
// El botón de gestionar (Customer Portal de Stripe) solo aparece si hay
// stripeCustomerId, sin mirar el acceso actual: alguien cuya suscripción
// caducó sigue necesitando ver sus facturas o volver a suscribirse, y ese es
// justo el sitio para hacerlo. legacyFree y patrocinado no tienen customer
// (nunca pasaron por Checkout), así que no hay nada que gestionar en Stripe.
//
// No se monta en una sesión de hijo, igual que ChildCodeCard: la suscripción
// es cosa del padre. El servidor la rechaza también (create-portal-session.js
// mira el claim childMode), esto solo evita enseñar un botón que fallaría.
export default function SubscriptionCard() {
  const { user, childMode } = useAuth()
  const { tr, localPath } = useLang()
  const [access, setAccess] = useState(null) // { reason, warning, userData }
  const [loading, setLoading] = useState(true)
  const [opening, setOpening] = useState(false)
  const [error, setError] = useState(false)
  // Compra directa de Pro, sin pasar por la landing (ver checkout() más
  // abajo) — mismo patrón que runCheckout en Landing.jsx.
  const [buying, setBuying] = useState(false)
  const [buyError, setBuyError] = useState(null) // null | true | string (detalle)

  useEffect(() => {
    if (!user || childMode) return
    let alive = true
    loadAccess(user.uid)
      .then(({ reason, warning, userData }) => { if (alive) setAccess({ reason, warning, userData }) })
      .catch(() => { if (alive) setError(true) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [user, childMode])

  if (!user || childMode) return null

  async function handleManage() {
    setOpening(true); setError(false)
    try {
      await openBillingPortal(localPath('/mi-plan'))
    } catch {
      setError(true)
      setOpening(false)
    }
  }

  async function handleBuyPro() {
    setBuying(true); setBuyError(null)
    try {
      await startCheckout('pro')
    } catch (err) {
      setBuyError(err?.detail ?? true)
      setBuying(false)
    }
  }

  if (loading) {
    return <section className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="h-12 rounded-xl bg-white/5 animate-pulse" /></section>
  }

  // No hay doc de usuario o no se pudo leer: nada que mostrar, mejor que un
  // error a la vista.
  if (!access) return null

  const { reason, warning, userData } = access
  const customerId = userData?.stripeCustomerId
  const plan = userData?.subscription?.plan

  // Sin stripeCustomerId no hay nada que gestionar en Stripe: legacyFree,
  // patrocinado, o una cuenta que nunca ha llegado a pagar.
  if (!customerId) {
    if (reason === 'legacy') {
      return (
        <section className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
          <h3 className="text-white font-black text-base mb-1">✨ {tr({ es: 'Acceso fundador', en: 'Founding access', ca: 'Accés fundador' })}</h3>
          <p className="text-white/50 text-sm">
            {tr({
              es: 'Tu cuenta es anterior al plan de pago: tienes acceso gratis de por vida. No hay nada que gestionar aquí.',
              en: 'Your account predates the paid plan: you have free access for life. Nothing to manage here.',
              ca: 'El teu compte és anterior al pla de pagament: tens accés gratis de per vida. No hi ha res a gestionar aquí.',
            })}
          </p>
        </section>
      )
    }
    if (reason === 'sponsored') {
      return (
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-white font-black text-base mb-1">🎓 {tr({ es: 'Acceso vía tu profesor', en: 'Access via your teacher', ca: 'Accés via el teu professor' })}</h3>
          <p className="text-white/50 text-sm">
            {tr({
              es: 'Tu profesor paga esta cuenta como parte de su clase. No hay nada que gestionar aquí.',
              en: 'Your teacher pays for this account as part of their class. Nothing to manage here.',
              ca: 'El teu professor paga aquest compte com a part de la seva classe. No hi ha res a gestionar aquí.',
            })}
          </p>
        </section>
      )
    }
    // Cuenta que nunca ha pagado: aquí es donde se compra Pro sin salir de
    // la app — antes esta rama no enseñaba nada (return null), así que la
    // única forma de hacerse Pro era volver a la landing y su ancla
    // #precios. Mismo checkout que la landing (startCheckout), solo que
    // disparado desde dentro.
    const price = PLANS.pro.price.toFixed(2).replace('.', ',')
    return (
      <section className="rounded-2xl border border-violet-500/25 bg-violet-500/5 p-5">
        <h3 className="text-white font-black text-base mb-1">✨ {tr({ es: 'Hazte Pro', en: 'Go Pro', ca: 'Fes-te Pro' })}</h3>
        <p className="text-white/50 text-sm mb-4">
          {tr({
            es: `${price} € / mes — sin publicidad y con el panel de seguimiento completo (por juego, por materia, historial de monedas).`,
            en: `€${price} / month — no ads and the full tracking panel (by game, by subject, coin history).`,
            ca: `${price} € / mes — sense publicitat i amb el panell de seguiment complet (per joc, per matèria, historial de monedes).`,
          })}
        </p>
        <button onClick={handleBuyPro} disabled={buying}
          className="rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 px-5 py-2.5 text-sm font-bold text-white transition-colors">
          {buying
            ? tr({ es: 'Abriendo…', en: 'Opening…', ca: 'Obrint…' })
            : tr({ es: 'Hazte Pro →', en: 'Go Pro →', ca: 'Fes-te Pro →' })}
        </button>
        {buyError && (
          <p className="mt-3 text-red-400 text-sm">
            {tr({ es: 'No hemos podido abrir la pasarela de pago. Inténtalo de nuevo.', en: "We couldn't open the payment page. Please try again.", ca: 'No hem pogut obrir la passarel·la de pagament. Torna-ho a intentar.' })}
          </p>
        )}
      </section>
    )
  }

  // El precio solo se enseña si `reason` confirma que la suscripción da
  // acceso AHORA — no basta con que `plan` tenga un valor: una suscripción
  // cancelada conserva el último plan en el doc y mostraría un precio que ya
  // no se está pagando.
  const planPrice = reason === 'subscription' && plan && PLANS[plan]
    ? `${PLANS[plan].price.toFixed(2).replace('.', ',')} € / ${tr({ es: PLANS[plan].interval === 'year' ? 'año' : 'mes', en: PLANS[plan].interval === 'year' ? 'year' : 'month', ca: PLANS[plan].interval === 'year' ? 'any' : 'mes' })}`
    : reason === 'teacher'
      ? `${TEACHER_PLAN.price.toFixed(2).replace('.', ',')} € / ${tr({ es: 'mes', en: 'month', ca: 'mes' })}`
      : null

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      {planPrice ? (
        <>
          <p className="text-white/50 text-sm mb-1">{planPrice}</p>
          <p className="text-white/35 text-xs mb-4">
            {tr({ es: '✓ Sin publicidad · ✓ Panel de seguimiento completo', en: '✓ No ads · ✓ Full tracking panel', ca: '✓ Sense publicitat · ✓ Panell de seguiment complet' })}
          </p>
        </>
      ) : (
        <p className="text-white/50 text-sm mb-4">
          {tr({ es: 'Sin suscripción activa. Puedes ver tus facturas o volver a suscribirte.', en: 'No active subscription. You can view your invoices or subscribe again.', ca: 'Sense subscripció activa. Pots veure les teves factures o tornar a subscriure\'t.' })}
        </p>
      )}

      {warning === 'payment_failed' && (
        <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {tr({ es: 'El último cobro no se ha podido procesar. Actualiza tu método de pago para no perder el acceso.', en: "Your last payment couldn't go through. Update your payment method to avoid losing access.", ca: 'L\'últim cobrament no s\'ha pogut processar. Actualitza el teu mètode de pagament per no perdre l\'accés.' })}
        </p>
      )}
      {warning === 'ending' && (
        <p className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-300">
          {tr({ es: 'Tu plan no se renovará: sigue activo hasta el final del periodo ya pagado.', en: "Your plan won't renew: it stays active until the end of the period you've already paid for.", ca: 'El teu pla no es renovarà: continua actiu fins al final del període ja pagat.' })}
        </p>
      )}

      <button onClick={handleManage} disabled={opening}
        className="rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 px-5 py-2.5 text-sm font-bold text-white transition-colors">
        {opening
          ? tr({ es: 'Abriendo…', en: 'Opening…', ca: 'Obrint…' })
          : tr({ es: 'Gestionar suscripción', en: 'Manage subscription', ca: 'Gestionar subscripció' })}
      </button>

      {error && (
        <p className="mt-3 text-red-400 text-sm">
          {tr({ es: 'No se ha podido abrir la gestión de tu suscripción. Inténtalo de nuevo.', en: "Couldn't open your subscription management. Please try again.", ca: 'No s\'ha pogut obrir la gestió de la teva subscripció. Torna-ho a intentar.' })}
        </p>
      )}
    </section>
  )
}
