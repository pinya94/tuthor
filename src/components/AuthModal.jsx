import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authErrorKey } from '../lib/authErrors'
import { useLang } from '../context/LangContext'

// Mensajes de error por clave estable (ver authErrorKey en lib/authErrors).
// bad_credentials es deliberadamente ambiguo: con la protección de
// enumeración de emails de Firebase no sabemos —ni queremos decir— si el
// fallo fue el email o la contraseña.
const ERRORS = {
  email_taken:     { es: 'Ya existe una cuenta con ese email. Inicia sesión.', en: 'An account with that email already exists. Sign in instead.', ca: 'Ja existeix un compte amb aquest email. Inicia sessió.' },
  invalid_email:   { es: 'Ese email no parece válido.', en: "That email doesn't look valid.", ca: 'Aquest email no sembla vàlid.' },
  weak_password:   { es: 'La contraseña debe tener al menos 6 caracteres.', en: 'Password must be at least 6 characters.', ca: 'La contrasenya ha de tenir com a mínim 6 caràcters.' },
  bad_credentials: { es: 'Email o contraseña incorrectos.', en: 'Wrong email or password.', ca: 'Email o contrasenya incorrectes.' },
  bad_code:        { es: 'Ese código no es válido. Pídeselo otra vez a tu padre o a tu madre.', en: "That code isn't valid. Ask your parent for it again.", ca: 'Aquest codi no és vàlid. Demana\'l un altre cop al teu pare o a la teva mare.' },
  too_many:        { es: 'Demasiados intentos. Espera unos minutos.', en: 'Too many attempts. Wait a few minutes.', ca: 'Massa intents. Espera uns minuts.' },
  network:         { es: 'Sin conexión. Comprueba tu red.', en: 'No connection. Check your network.', ca: 'Sense connexió. Comprova la teva xarxa.' },
  unknown:         { es: 'Algo ha fallado. Inténtalo de nuevo.', en: 'Something went wrong. Please try again.', ca: 'Alguna cosa ha fallat. Torna-ho a intentar.' },
  google:          { es: 'No se pudo iniciar sesión con Google. Inténtalo de nuevo.', en: 'Could not sign in with Google. Please try again.', ca: "No s'ha pogut iniciar sessió amb Google. Torna-ho a intentar." },
}

const INPUT = 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors'

export default function AuthModal({ onClose, defaultMode = 'login' }) {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword, loginWithChildCode } = useAuth()
  // Puede montarse fuera del LangProvider: tr cae al español
  let tr = obj => obj.es
  try { const ctx = useLang(); if (ctx?.tr) tr = ctx.tr } catch { /* fuera del provider */ }

  const [mode, setMode]         = useState(defaultMode) // login | register | reset | child
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [errorKey, setErrorKey] = useState('')
  const [sent, setSent]         = useState(false)

  function switchMode(next) {
    setMode(next); setErrorKey(''); setSent(false); setPassword(''); setCode('')
  }

  async function handleGoogle() {
    setLoading(true); setErrorKey('')
    try { await loginWithGoogle(); onClose() }
    catch { setErrorKey('google') }
    finally { setLoading(false) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setErrorKey('')
    try {
      if (mode === 'child') {
        await loginWithChildCode(code)
        onClose()
      } else if (mode === 'register') {
        await registerWithEmail(email, password, name.trim())
        onClose()
      } else if (mode === 'login') {
        await loginWithEmail(email, password)
        onClose()
      } else {
        await resetPassword(email)
        setSent(true)
      }
    } catch (err) {
      setErrorKey(authErrorKey(err))
    } finally {
      setLoading(false)
    }
  }

  const title = {
    login:    { es: 'Acceder a Tuthor', en: 'Sign in to Tuthor', ca: 'Accedir a Tuthor' },
    register: { es: 'Crear tu cuenta', en: 'Create your account', ca: 'Crear el teu compte' },
    reset:    { es: 'Recuperar contraseña', en: 'Reset your password', ca: 'Recuperar contrasenya' },
    child:    { es: 'Entrar con tu código', en: 'Sign in with your code', ca: 'Entrar amb el teu codi' },
  }[mode]

  const subtitle = {
    login:    { es: 'Guarda tu progreso, rachas y puntuaciones', en: 'Save your progress, streaks and scores', ca: 'Desa el teu progrés, ratxes i puntuacions' },
    register: { es: 'Usa un email real: lo necesitarás para recuperar la cuenta', en: "Use a real email: you'll need it to recover your account", ca: 'Fes servir un email real: el necessitaràs per recuperar el compte' },
    reset:    { es: 'Te enviamos un enlace para crear una nueva', en: 'We\'ll email you a link to set a new one', ca: 'T\'enviem un enllaç per crear-ne una de nova' },
    child:    { es: 'El código que te han dado tus padres. No hace falta contraseña.', en: "The code your parents gave you. No password needed.", ca: 'El codi que t\'han donat els teus pares. No cal contrasenya.' },
  }[mode]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 pt-8 pb-6 text-center">
          <span className="text-4xl block mb-3">📚</span>
          <h2 className="text-xl font-black text-white mb-1">{tr(title)}</h2>
          <p className="text-white/40 text-sm mb-6">{tr(subtitle)}</p>

          {sent ? (
            <div className="text-left">
              <p className="text-sm text-white/70 bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-3">
                {tr({
                  es: 'Si existe una cuenta con ese email, te hemos enviado un enlace para cambiar la contraseña. Revisa también el spam.',
                  en: "If an account exists with that email, we've sent a link to change the password. Check your spam folder too.",
                  ca: "Si existeix un compte amb aquest email, t'hem enviat un enllaç per canviar la contrasenya. Revisa també el correu brossa.",
                })}
              </p>
              <button onClick={() => switchMode('login')}
                className="mt-4 w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-colors text-sm">
                {tr({ es: 'Volver a iniciar sesión', en: 'Back to sign in', ca: 'Tornar a iniciar sessió' })}
              </button>
            </div>
          ) : (
            <>
              {(mode === 'login' || mode === 'register') && (
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

                  <div className="flex items-center gap-3 my-5">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-white/25 text-xs font-semibold uppercase tracking-wider">
                      {tr({ es: 'o', en: 'or', ca: 'o' })}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                {mode === 'child' ? (
                  // Mayúsculas y monoespaciada: el código se lee para copiarlo
                  // a mano y así no se confunden caracteres. Los guiones y los
                  // espacios los limpia el servidor, no hace falta acertar el
                  // formato exacto.
                  <input type="text" required value={code} onChange={e => setCode(e.target.value)}
                    autoComplete="off" autoCapitalize="characters" autoCorrect="off" spellCheck={false}
                    className={`${INPUT} font-mono tracking-[0.2em] text-center uppercase`}
                    placeholder="XXXX-XXXX-XXXX" />
                ) : (
                  <>
                    {mode === 'register' && (
                      <input type="text" required value={name} onChange={e => setName(e.target.value)}
                        autoComplete="name" className={INPUT}
                        placeholder={tr({ es: 'Tu nombre', en: 'Your name', ca: 'El teu nom' })} />
                    )}

                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      autoComplete="email" className={INPUT}
                      placeholder={tr({ es: 'Email', en: 'Email', ca: 'Email' })} />

                    {mode !== 'reset' && (
                      <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                        minLength={6}
                        autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                        className={INPUT}
                        placeholder={tr({ es: 'Contraseña', en: 'Password', ca: 'Contrasenya' })} />
                    )}
                  </>
                )}

                {errorKey && (
                  <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {tr(ERRORS[errorKey] ?? ERRORS.unknown)}
                  </p>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black rounded-xl transition-colors text-sm">
                  {loading
                    ? tr({ es: 'Un momento…', en: 'One moment…', ca: 'Un moment…' })
                    : mode === 'register'
                    ? tr({ es: 'Crear cuenta', en: 'Create account', ca: 'Crear compte' })
                    : mode === 'login' || mode === 'child'
                    ? tr({ es: 'Entrar', en: 'Sign in', ca: 'Entrar' })
                    : tr({ es: 'Enviar enlace', en: 'Send link', ca: 'Enviar enllaç' })}
                </button>
              </form>

              <div className="mt-5 space-y-2 text-xs">
                {mode === 'login' && (
                  <>
                    <p className="text-white/40">
                      {tr({ es: '¿No tienes cuenta?', en: "Don't have an account?", ca: 'No tens compte?' })}{' '}
                      <button onClick={() => switchMode('register')} className="text-violet-400 hover:text-violet-300 font-bold">
                        {tr({ es: 'Regístrate', en: 'Sign up', ca: "Registra't" })}
                      </button>
                    </p>
                    <button onClick={() => switchMode('reset')} className="text-white/30 hover:text-white/60 transition-colors">
                      {tr({ es: 'He olvidado mi contraseña', en: 'I forgot my password', ca: 'He oblidat la contrasenya' })}
                    </button>
                    <p className="pt-3 mt-3 border-t border-white/5">
                      <button onClick={() => switchMode('child')} className="text-violet-400 hover:text-violet-300 font-bold">
                        {tr({ es: '🧒 Entrar con mi código', en: '🧒 Sign in with my code', ca: '🧒 Entrar amb el meu codi' })}
                      </button>
                    </p>
                  </>
                )}
                {mode === 'child' && (
                  <button onClick={() => switchMode('login')} className="text-white/30 hover:text-white/60 transition-colors">
                    {tr({ es: '← Soy el padre o la madre', en: '← I\'m the parent', ca: '← Sóc el pare o la mare' })}
                  </button>
                )}
                {mode === 'register' && (
                  <p className="text-white/40">
                    {tr({ es: '¿Ya tienes cuenta?', en: 'Already have an account?', ca: 'Ja tens compte?' })}{' '}
                    <button onClick={() => switchMode('login')} className="text-violet-400 hover:text-violet-300 font-bold">
                      {tr({ es: 'Inicia sesión', en: 'Sign in', ca: 'Inicia sessió' })}
                    </button>
                  </p>
                )}
                {mode === 'reset' && (
                  <button onClick={() => switchMode('login')} className="text-white/30 hover:text-white/60 transition-colors">
                    {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
                  </button>
                )}
              </div>

              {(mode === 'login' || mode === 'register') && (
                <p className="mt-6 text-white/20 text-xs">
                  {tr({
                    es: 'Al entrar aceptas que tus partidas se guarden en tu cuenta',
                    en: 'By signing in you agree that your games will be saved to your account',
                    ca: 'En entrar acceptes que les teves partides es desin al teu compte',
                  })}
                </p>
              )}
            </>
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
