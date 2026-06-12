import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ onClose }) {
  const { loginWithGoogle, registerWithUsername, loginWithUsername } = useAuth()
  const [tab, setTab] = useState('google') // 'google' | 'crear' | 'entrar'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGoogle() {
    setLoading(true); setError('')
    try { await loginWithGoogle(); onClose() }
    catch (e) { setError('No se pudo iniciar sesión con Google.') }
    finally { setLoading(false) }
  }

  async function handleUsername(e) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return
    setLoading(true); setError('')
    try {
      if (tab === 'crear') await registerWithUsername(username.trim(), password)
      else await loginWithUsername(username.trim(), password)
      onClose()
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('Ese nombre de usuario ya existe.')
      else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') setError('Usuario o contraseña incorrectos.')
      else if (err.code === 'auth/weak-password') setError('La contraseña debe tener al menos 6 caracteres.')
      else setError('Algo salió mal. Inténtalo de nuevo.')
    }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-black text-white">Acceder a Tuthor</h2>
          <p className="text-white/40 text-sm mt-1">Guarda tu progreso y rachas</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 px-6">
          {[
            { id: 'google', label: 'Google' },
            { id: 'crear', label: 'Crear cuenta' },
            { id: 'entrar', label: 'Ya tengo cuenta' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setError('') }}
              className={`pb-3 mr-5 text-sm font-semibold border-b-2 transition-all ${
                tab === t.id ? 'border-violet-500 text-white' : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="px-6 py-5">
          {/* Tab Google */}
          {tab === 'google' && (
            <div className="space-y-4">
              <p className="text-white/50 text-sm">Entra con tu cuenta de Google. Rápido y sin contraseñas.</p>
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading ? 'Entrando...' : 'Continuar con Google'}
              </button>
            </div>
          )}

          {/* Tab Crear cuenta / Entrar */}
          {(tab === 'crear' || tab === 'entrar') && (
            <form onSubmit={handleUsername} className="space-y-4">
              {tab === 'crear' && (
                <p className="text-white/50 text-sm">Sin email — solo elige un nombre y contraseña. Perfecto para estudiantes.</p>
              )}
              <div>
                <label className="text-white/50 text-xs font-semibold uppercase tracking-widest block mb-1.5">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value.replace(/\s/g, ''))}
                  placeholder="ej. superestudiante99"
                  maxLength={20}
                  className="w-full bg-white/5 border border-white/15 focus:border-violet-500 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-colors"
                  autoFocus
                />
                {tab === 'crear' && (
                  <p className="text-white/25 text-xs mt-1">Solo letras, números y guiones. Sin espacios.</p>
                )}
              </div>
              <div>
                <label className="text-white/50 text-xs font-semibold uppercase tracking-widest block mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={tab === 'crear' ? 'Mínimo 6 caracteres' : '••••••'}
                  className="w-full bg-white/5 border border-white/15 focus:border-violet-500 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-30 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {loading ? '...' : tab === 'crear' ? 'Crear cuenta →' : 'Entrar →'}
              </button>

              {tab === 'crear' && (
                <p className="text-center text-white/25 text-xs">
                  ¿Ya tienes cuenta?{' '}
                  <button type="button" onClick={() => { setTab('entrar'); setError('') }} className="text-violet-400 hover:text-violet-300">
                    Inicia sesión
                  </button>
                </p>
              )}
              {tab === 'entrar' && (
                <p className="text-center text-white/25 text-xs">
                  ¿No tienes cuenta?{' '}
                  <button type="button" onClick={() => { setTab('crear'); setError('') }} className="text-violet-400 hover:text-violet-300">
                    Créala aquí
                  </button>
                </p>
              )}
            </form>
          )}
        </div>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
