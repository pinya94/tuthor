import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { loadAccess } from '../lib/access'
import { getChildCode, formatChildCode } from '../lib/childCode'
import SEOHead from '../components/SEOHead'

// Página de vuelta del checkout. NO concede nada: esta URL se puede escribir a
// mano y el acceso lo da el webhook (api/stripe-webhook.js) al confirmar el
// cobro con Stripe. Aquí solo se agradece y se espera a que el webhook llegue.
//
// Ese retraso es real: entre que Stripe cobra y su evento nos alcanza pasan
// desde décimas hasta unos segundos. Por eso se reintenta la lectura en vez de
// decidir a la primera — un "algo ha fallado" a los dos segundos de haber
// pagado es la peor pantalla posible.
const RETRY_MS = 2000
const MAX_TRIES = 8

export default function PagoGracias() {
  const { tr, localPath } = useLang()
  const { user } = useAuth()
  const [state, setState] = useState('waiting') // waiting | ready | slow
  const [childCode, setChildCode] = useState(null)

  useEffect(() => {
    if (!user) return
    let alive = true
    let tries = 0

    async function check() {
      if (!alive) return
      tries++
      try {
        const { allowed } = await loadAccess(user.uid)
        if (!alive) return
        if (allowed) {
          setState('ready')
          // El código es lo primero que necesita el padre: sin él, el hijo no
          // puede entrar y la compra no le sirve de nada todavía.
          getChildCode().then(c => { if (alive) setChildCode(c) }).catch(() => {})
          return
        }
      } catch { /* reintentamos igual */ }

      if (tries >= MAX_TRIES) { setState('slow'); return }
      setTimeout(check, RETRY_MS)
    }

    check()
    return () => { alive = false }
  }, [user])

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white px-5 py-20 text-slate-900">
      <SEOHead path="/pago/gracias" noindex
        title={tr({ es: 'Gracias por tu compra', en: 'Thanks for your purchase', ca: 'Gràcies per la teva compra' })}
        description={tr({ es: 'Confirmación de suscripción a Tuthor.', en: 'Tuthor subscription confirmation.', ca: 'Confirmació de subscripció a Tuthor.' })}
      />

      <div className="mx-auto max-w-lg text-center">
        <span className="text-6xl">{state === 'ready' ? '🎉' : '⏳'}</span>

        <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
          {state === 'ready'
            ? tr({ es: '¡Ya está!', en: "You're all set!", ca: 'Ja està!' })
            : tr({ es: 'Confirmando el pago…', en: 'Confirming your payment…', ca: 'Confirmant el pagament…' })}
        </h1>

        {state === 'waiting' && (
          <p className="mt-4 text-slate-600">
            {tr({
              es: 'Estamos esperando la confirmación de Stripe. Suele tardar unos segundos, no cierres esta página.',
              en: "We're waiting for Stripe to confirm. It usually takes a few seconds — don't close this page.",
              ca: 'Estem esperant la confirmació de Stripe. Sol trigar uns segons, no tanquis aquesta pàgina.',
            })}
          </p>
        )}

        {state === 'slow' && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {tr({
              es: 'El pago se ha realizado, pero la confirmación está tardando más de lo normal. Recarga en un minuto; si sigue igual, escríbenos y lo resolvemos.',
              en: "Your payment went through, but confirmation is taking longer than usual. Reload in a minute; if it persists, get in touch and we'll sort it.",
              ca: 'El pagament s\'ha fet, però la confirmació està trigant més del normal. Recarrega en un minut; si continua igual, escriu-nos i ho resolem.',
            })}
          </p>
        )}

        {state === 'ready' && (
          <>
            <p className="mt-4 text-slate-600">
              {tr({
                es: 'Tu suscripción está activa. Este es el código para que entre tu hijo, sin contraseña:',
                en: "Your subscription is active. Here's the code for your child to sign in, no password needed:",
                ca: 'La teva subscripció està activa. Aquest és el codi perquè entri el teu fill, sense contrasenya:',
              })}
            </p>

            <div className="mt-5 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
              {childCode ? (
                <code className="block select-all font-mono text-xl font-black tracking-[0.2em] text-slate-900">
                  {formatChildCode(childCode)}
                </code>
              ) : (
                <div className="mx-auto h-7 w-52 animate-pulse rounded bg-slate-100" />
              )}
              <p className="mt-3 text-xs text-slate-500">
                {tr({
                  es: 'Lo tienes siempre en tu perfil, y puedes cambiarlo cuando quieras.',
                  en: "It's always in your profile, and you can change it whenever you like.",
                  ca: 'El tens sempre al teu perfil, i el pots canviar quan vulguis.',
                })}
              </p>
            </div>

            <Link to={localPath('/app')}
              className="mt-7 inline-block rounded-xl bg-violet-600 px-8 py-4 font-black text-white transition-colors hover:bg-violet-500">
              {tr({ es: 'Entrar a Tuthor', en: 'Open Tuthor', ca: 'Entrar a Tuthor' })}
            </Link>
          </>
        )}

        {!user && (
          <p className="mt-6 text-sm text-slate-500">
            {tr({
              es: 'Inicia sesión con la misma cuenta con la que has pagado para ver tu suscripción.',
              en: 'Sign in with the same account you paid with to see your subscription.',
              ca: 'Inicia sessió amb el mateix compte amb què has pagat per veure la teva subscripció.',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
