import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'

const STORAGE_KEY = 'tuthor_cookie_consent'

export function useCookieConsent() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export function saveCookieConsent(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, ts: Date.now() }))
}

const CATEGORIES = {
  es: [
    { id: 'essential', label: 'Esenciales', desc: 'Necesarias para que la app funcione: sesión de usuario, preferencias básicas. No se pueden desactivar.', required: true },
    { id: 'analytics', label: 'Analítica', desc: 'Nos ayudan a entender cómo se usa Tuthor (Vercel Analytics). No recopilan datos personales identificables.', required: false },
  ],
  en: [
    { id: 'essential', label: 'Essential', desc: 'Required for the app to work: user session, basic preferences. Cannot be disabled.', required: true },
    { id: 'analytics', label: 'Analytics', desc: 'Help us understand how Tuthor is used (Vercel Analytics). No personally identifiable data is collected.', required: false },
  ],
}

export default function CookieBanner({ onConsent }) {
  let lang = 'es'
  try { const ctx = useLang(); lang = ctx.lang } catch {}
  const en = lang === 'en'
  const cats = CATEGORIES[lang] || CATEGORIES.es

  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState({ essential: true, analytics: true })

  useEffect(() => {
    const saved = useCookieConsent()
    if (!saved) setVisible(true)
  }, [])

  function accept(custom) {
    const chosen = custom ?? { essential: true, analytics: true }
    saveCookieConsent(chosen)
    setVisible(false)
    onConsent?.(chosen)
  }

  function reject() {
    accept({ essential: true, analytics: false })
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-end justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" />

      <div className="relative pointer-events-auto w-full sm:max-w-xl mx-auto mb-0 sm:mb-6 sm:mx-4">
        <div className="bg-[#0d0d1a]/95 border border-white/10 backdrop-blur-xl rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 sm:p-6">

          {!showPrefs ? (
            <>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl select-none">🍪</span>
                <div>
                  <h2 className="text-white font-bold text-base leading-tight">{en ? 'We use cookies' : 'Usamos cookies'}</h2>
                  <p className="text-white/50 text-xs mt-0.5">
                    {en
                      ? 'Tuthor uses essential cookies to work and, with your permission, analytics cookies to improve the experience. '
                      : 'Tuthor utiliza cookies esenciales para funcionar y, con tu permiso, cookies de analítica para mejorar la experiencia. '}
                    <button onClick={() => setShowPrefs(true)}
                      className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
                      {en ? 'More info' : 'Más información'}
                    </button>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button onClick={() => accept()}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
                  {en ? 'Accept all' : 'Aceptar todo'}
                </button>
                <button onClick={reject}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl border border-white/10 transition-all">
                  {en ? 'Essential only' : 'Solo esenciales'}
                </button>
                <button onClick={() => setShowPrefs(true)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-sm font-medium px-4 py-2.5 rounded-xl border border-white/10 transition-all">
                  {en ? 'Customise' : 'Personalizar'}
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setShowPrefs(false)}
                className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs mb-4 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {en ? 'Back' : 'Volver'}
              </button>

              <h2 className="text-white font-bold text-base mb-1">{en ? 'Cookie preferences' : 'Preferencias de cookies'}</h2>
              <p className="text-white/40 text-xs mb-4">
                {en ? 'You can enable or disable each category. Essential cookies are always required.' : 'Puedes activar o desactivar cada categoría. Las cookies esenciales son siempre necesarias.'}
              </p>

              <div className="flex flex-col gap-3 mb-5">
                {cats.map(cat => (
                  <div key={cat.id} className="flex items-start gap-3 bg-white/5 rounded-xl p-3.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{cat.label}</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{cat.desc}</p>
                    </div>
                    <button disabled={cat.required}
                      onClick={() => setPrefs(p => ({ ...p, [cat.id]: !p[cat.id] }))}
                      className={`mt-0.5 flex-shrink-0 w-10 h-5 rounded-full transition-all relative
                        ${cat.required ? 'bg-violet-600/40 cursor-not-allowed' : prefs[cat.id] ? 'bg-violet-600' : 'bg-white/10'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${prefs[cat.id] ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-white/25 text-[10px] leading-relaxed mb-4">
                {en
                  ? 'Under GDPR (EU) 2016/679, you have the right to withdraw your consent at any time from the app settings. For more information see our '
                  : 'De acuerdo con el RGPD (UE) 2016/679 y la LSSI-CE, tienes derecho a retirar tu consentimiento en cualquier momento desde la configuración de la app. Para más información consulta nuestra '}
                <a href="/privacidad" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                  {en ? 'Privacy Policy' : 'Política de privacidad'}
                </a>.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => accept(prefs)}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
                  {en ? 'Save preferences' : 'Guardar preferencias'}
                </button>
                <button onClick={() => accept()}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-sm font-medium px-4 py-2.5 rounded-xl border border-white/10 transition-all">
                  {en ? 'Accept all' : 'Aceptar todo'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
