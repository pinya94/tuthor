import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getChildCode, rotateChildCode, formatChildCode, CHILD_CODE_LOGIN_ENABLED } from '../lib/childCode'

// El código con el que el hijo entra en esta cuenta sin contraseña.
//
// No se monta en una sesión de hijo: es la propia cuenta, así que sin esa
// comprobación el niño vería el código y podría rotarlo (dejando fuera a un
// hermano). El servidor lo rechaza igualmente por el claim childMode — esto
// solo evita enseñar un botón que va a fallar.
export default function ChildCodeCard() {
  const { user, childMode } = useAuth()
  const { tr } = useLang()
  const [code, setCode]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [rotating, setRotating] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [copied, setCopied]   = useState(false)
  const [error, setError]     = useState(false)

  useEffect(() => {
    if (!CHILD_CODE_LOGIN_ENABLED || !user || childMode) return
    let alive = true
    getChildCode()
      .then(c => { if (alive) setCode(c) })
      .catch(() => { if (alive) setError(true) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [user, childMode])

  if (!CHILD_CODE_LOGIN_ENABLED || !user || childMode) return null

  async function handleRotate() {
    setRotating(true); setError(false)
    try {
      setCode(await rotateChildCode())
      setConfirming(false)
    } catch { setError(true) }
    finally { setRotating(false) }
  }

  function handleCopy() {
    navigator.clipboard?.writeText(code)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => { /* sin permiso de portapapeles: el código está a la vista */ })
  }

  return (
    <section className="rounded-2xl border border-violet-500/25 bg-violet-500/5 p-5">
      <h3 className="text-white font-black text-base mb-1">
        🧒 {tr({ es: 'Código de tu hijo', en: "Your child's code", ca: 'Codi del teu fill' })}
      </h3>
      <p className="text-white/50 text-sm mb-4">
        {tr({
          es: 'Con este código entra en esta cuenta sin contraseña. Podrá jugar y hacer exámenes, pero no ver este panel ni tocar la suscripción.',
          en: 'With this code they sign in to this account without a password. They can play and take exams, but not see this panel or touch the subscription.',
          ca: 'Amb aquest codi entra en aquest compte sense contrasenya. Podrà jugar i fer exàmens, però no veure aquest panell ni tocar la subscripció.',
        })}
      </p>

      {loading ? (
        <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
      ) : error && !code ? (
        <p className="text-red-400 text-sm">
          {tr({ es: 'No hemos podido cargar el código. Recarga la página.', en: "We couldn't load the code. Reload the page.", ca: 'No hem pogut carregar el codi. Torna a carregar la pàgina.' })}
        </p>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-lg tracking-[0.2em] text-white text-center select-all">
              {formatChildCode(code)}
            </code>
            <button onClick={handleCopy}
              className="shrink-0 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm font-bold transition-colors">
              {copied
                ? tr({ es: '✓ Copiado', en: '✓ Copied', ca: '✓ Copiat' })
                : tr({ es: 'Copiar', en: 'Copy', ca: 'Copiar' })}
            </button>
          </div>

          {confirming ? (
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
              <p className="text-amber-200/90 text-sm mb-3">
                {tr({
                  es: 'El código actual dejará de funcionar al instante. Tendrás que darle el nuevo a tu hijo.',
                  en: 'The current code stops working immediately. You’ll need to give your child the new one.',
                  ca: 'El codi actual deixarà de funcionar a l’instant. Hauràs de donar el nou al teu fill.',
                })}
              </p>
              <div className="flex gap-2">
                <button onClick={handleRotate} disabled={rotating}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-sm font-bold transition-colors">
                  {rotating
                    ? tr({ es: 'Generando…', en: 'Generating…', ca: 'Generant…' })
                    : tr({ es: 'Sí, cambiar', en: 'Yes, change it', ca: 'Sí, canviar' })}
                </button>
                <button onClick={() => setConfirming(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm font-bold transition-colors">
                  {tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' })}
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => { setConfirming(true); setError(false) }}
              className="mt-3 text-white/30 hover:text-white/60 text-xs transition-colors">
              {tr({ es: 'Generar un código nuevo', en: 'Generate a new code', ca: 'Generar un codi nou' })}
            </button>
          )}

          {error && code && (
            <p className="mt-3 text-red-400 text-sm">
              {tr({ es: 'No se ha podido cambiar el código. Inténtalo de nuevo.', en: "Couldn't change the code. Please try again.", ca: 'No s\'ha pogut canviar el codi. Torna-ho a intentar.' })}
            </p>
          )}
        </>
      )}
    </section>
  )
}
