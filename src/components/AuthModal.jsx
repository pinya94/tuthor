import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { authErrorKey } from '../lib/authErrors'
import { CHILD_CODE_LOGIN_ENABLED } from '../lib/childCode'

// Una sola forma de entrar mientras CHILD_CODE_LOGIN_ENABLED esté a false
// (ver lib/childCode.js): Google. El modo código —el hijo entra en la misma
// cuenta sin contraseña, en modo restringido (api/child-login.js)— sigue
// aquí, escondido, no borrado: con el muro apagado, jugar ya no exige la
// cuenta del padre, así que no hace falta esa puerta de entrada.
// No hay registro con email y contraseña a propósito: una contraseña más que
// recordar, que recuperar y que se acaba compartiendo con el crío.
const ERRORS = {
  google:    { es: 'No se pudo iniciar sesión con Google. Inténtalo de nuevo.', en: 'Could not sign in with Google. Please try again.', ca: "No s'ha pogut iniciar sessió amb Google. Torna-ho a intentar." },
  bad_code:  { es: 'Ese código no es válido. Pídeselo otra vez a tu padre o a tu madre.', en: "That code isn't valid. Ask your parent for it again.", ca: 'Aquest codi no és vàlid. Demana\'l un altre cop al teu pare o a la teva mare.' },
  too_many:  { es: 'Demasiados intentos. Espera unos minutos.', en: 'Too many attempts. Wait a few minutes.', ca: 'Massa intents. Espera uns minuts.' },
  network:   { es: 'Sin conexión. Comprueba tu red.', en: 'No connection. Check your network.', ca: 'Sense connexió. Comprova la teva xarxa.' },
  unknown:   { es: 'Algo ha fallado. Inténtalo de nuevo.', en: 'Something went wrong. Please try again.', ca: 'Alguna cosa ha fallat. Torna-ho a intentar.' },
}

// `onSuccess` se llama tras entrar de verdad, en lugar de onClose. Sin él, el
// usuario acaba donde estaba: el niño que teclea su código se queda mirando la
// landing de venta, y quien inicia sesión para pagar tiene que volver a pulsar
// el plan. Cerrar el modal no es lo mismo que haber entrado.
export default function AuthModal({ onClose, onSuccess, defaultMode = 'login' }) {
  const { loginWithGoogle, loginWithChildCode } = useAuth()
  const done = onSuccess ?? onClose
  // Puede montarse fuera del LangProvider: tr cae al español
  let tr = obj => obj.es
  try { const ctx = useLang(); if (ctx?.tr) tr = ctx.tr } catch { /* fuera del provider */ }

  // CHILD_CODE_LOGIN_ENABLED=false fuerza 'login' pase lo que sea defaultMode:
  // sin esto, un caller que aún pidiera defaultMode="child" (ninguno lo hace
  // hoy) colaría el modo escondido por la puerta de atrás.
  const [mode, setMode]         = useState(CHILD_CODE_LOGIN_ENABLED ? defaultMode : 'login') // login | child
  const [code, setCode]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [errorKey, setErrorKey] = useState('')

  // Escape cierra. Antes solo se salía clicando el fondo, que no es evidente
  // ni alcanzable con teclado: quien abría el modal sin querer (los botones
  // de Pro lo abren) se quedaba encerrado salvo que adivinara dónde pinchar.
  useEffect(() => {
    if (!onClose) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function switchMode(next) {
    setMode(next); setErrorKey(''); setCode('')
  }

  async function handleGoogle() {
    setLoading(true); setErrorKey('')
    try { await loginWithGoogle(); done() }
    catch { setErrorKey('google') }
    finally { setLoading(false) }
  }

  async function handleChildSubmit(e) {
    e.preventDefault()
    setLoading(true); setErrorKey('')
    try {
      await loginWithChildCode(code)
      done()
    } catch (err) {
      setErrorKey(authErrorKey(err))
    } finally {
      setLoading(false)
    }
  }

  const isChild = mode === 'child'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 pt-8 pb-6 text-center">
          <span className="text-4xl block mb-3">{isChild ? '🧒' : '📚'}</span>
          <h2 className="text-xl font-black text-white mb-1">
            {isChild
              ? tr({ es: 'Entrar con tu código', en: 'Sign in with your code', ca: 'Entrar amb el teu codi' })
              : tr({ es: 'Acceder a Tuthor', en: 'Sign in to Tuthor', ca: 'Accedir a Tuthor' })}
          </h2>
          <p className="text-white/40 text-sm mb-6">
            {isChild
              ? tr({ es: 'El código que te han dado tus padres. No hace falta contraseña.', en: 'The code your parents gave you. No password needed.', ca: "El codi que t'han donat els teus pares. No cal contrasenya." })
              : tr({ es: 'Guarda tu progreso, rachas y puntuaciones', en: 'Save your progress, streaks and scores', ca: 'Desa el teu progrés, ratxes i puntuacions' })}
          </p>

          {isChild ? (
            <form onSubmit={handleChildSubmit} className="space-y-3">
              {/* Mayúsculas y monoespaciada: el código se copia a mano y así no
                  se confunden caracteres. Los guiones y espacios los limpia el
                  servidor, no hace falta acertar el formato exacto. */}
              <input type="text" required value={code} onChange={e => setCode(e.target.value)}
                autoComplete="off" autoCapitalize="characters" autoCorrect="off" spellCheck={false}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-mono tracking-[0.2em] text-center uppercase text-white placeholder-white/25 outline-none focus:border-violet-500 transition-colors"
                placeholder="XXXX-XXXX-XXXX" />

              {errorKey && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-left">
                  {tr(ERRORS[errorKey] ?? ERRORS.unknown)}
                </p>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black rounded-xl transition-colors text-sm">
                {loading
                  ? tr({ es: 'Un momento…', en: 'One moment…', ca: 'Un moment…' })
                  : tr({ es: 'Entrar', en: 'Sign in', ca: 'Entrar' })}
              </button>
            </form>
          ) : (
            <>
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-base"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading
                  ? tr({ es: 'Entrando...', en: 'Signing in...', ca: 'Entrant...' })
                  : tr({ es: 'Continuar con Google', en: 'Continue with Google', ca: 'Continuar amb Google' })}
              </button>

              {errorKey && (
                <p className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {tr(ERRORS[errorKey] ?? ERRORS.unknown)}
                </p>
              )}
            </>
          )}

          {CHILD_CODE_LOGIN_ENABLED && (
            <div className="mt-6 pt-4 border-t border-white/5">
              <button onClick={() => switchMode(isChild ? 'login' : 'child')}
                className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">
                {isChild
                  ? tr({ es: '← Soy el padre o la madre', en: "← I'm the parent", ca: '← Sóc el pare o la mare' })
                  : tr({ es: '🧒 Soy peque: entrar con mi código', en: "🧒 I'm a kid: sign in with my code", ca: '🧒 Sóc petit: entrar amb el meu codi' })}
              </button>
            </div>
          )}

          {!isChild && (
            <p className="mt-4 text-white/20 text-xs">
              {tr({
                es: 'Al entrar aceptas que tus partidas se guarden en tu cuenta',
                en: 'By signing in you agree that your games will be saved to your account',
                ca: 'En entrar acceptes que les teves partides es desin al teu compte',
              })}
            </p>
          )}
        </div>

        <button onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
