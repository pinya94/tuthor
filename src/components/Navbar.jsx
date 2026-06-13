import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MAIN_CARDS } from '../data/constants'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [avatarMenu, setAvatarMenu] = useState(false)
  const { user, logout } = useAuth()

  const authLoading = user === undefined

  return (
    <>
      <nav className="relative z-50 bg-black/30 border-b border-white/10 backdrop-blur-md">
        <div className="h-16 flex items-center justify-between px-4 sm:px-8">

          {/* Logo */}
          <button onClick={() => { navigate('/'); setMenuOpen(false) }} className="hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Tuthor" className="h-7 w-auto" />
          </button>

          {/* Nav escritorio */}
          <div className="hidden sm:flex items-center gap-1">
            {MAIN_CARDS.map(c => (
              <button
                key={c.id}
                onClick={() => navigate(c.path)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${location.pathname.startsWith(c.path)
                    ? 'bg-violet-600 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Auth escritorio */}
          <div className="hidden sm:flex items-center gap-2">
            {!authLoading && !user && (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
              >
                Entrar
              </button>
            )}
            {!authLoading && user && (
              <div className="relative">
                <button
                  onClick={() => setAvatarMenu(o => !o)}
                  className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all"
                >
                  {user.photoURL
                    ? <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
                    : <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-black text-white">{user.displayName?.[0]?.toUpperCase()}</div>
                  }
                  <span className="text-white/80 text-sm font-medium max-w-[100px] truncate">{user.displayName?.split(' ')[0]}</span>
                  <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {avatarMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-[#0d0d1a] border border-white/10 backdrop-blur-md rounded-xl overflow-hidden w-44 shadow-xl z-50">
                    <button onClick={() => { navigate('/perfil'); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                      👤 Mi perfil
                    </button>
                    <button onClick={() => { navigate('/comunidad'); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors border-t border-white/5">
                      🤝 Comunidad
                    </button>
                    {['consiguetualgogratis@gmail.com','consiguetualgogratis@tuthor.app'].includes(user?.email) && (
                      <button onClick={() => { navigate('/admin'); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-amber-400/70 hover:text-amber-300 hover:bg-white/10 transition-colors border-t border-white/5">
                        🛠️ Admin
                      </button>
                    )}
                    <button onClick={() => { logout(); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors border-t border-white/5">
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburguesa móvil */}
          <button className="sm:hidden text-white/70 hover:text-white p-2" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen
              ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="sm:hidden border-t border-white/10 bg-black/50 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
            {MAIN_CARDS.map(c => (
              <button key={c.id} onClick={() => { navigate(c.path); setMenuOpen(false) }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${location.pathname.startsWith(c.path) ? 'bg-violet-600 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                {c.title}
              </button>
            ))}
            <div className="border-t border-white/10 pt-2 mt-1">
              {!authLoading && !user && (
                <button onClick={() => { setShowAuth(true); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                  🔑 Entrar
                </button>
              )}
              {!authLoading && user && (
                <>
                  <button onClick={() => { navigate('/perfil'); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    👤 Mi perfil
                  </button>
                  <button onClick={() => { navigate('/comunidad'); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    🤝 Comunidad
                  </button>
                  {['consiguetualgogratis@gmail.com','consiguetualgogratis@tuthor.app'].includes(user?.email) && (
                    <button onClick={() => { navigate('/admin'); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-amber-400/70 hover:text-amber-300 hover:bg-white/10 transition-all">
                      🛠️ Admin
                    </button>
                  )}
                  <button onClick={() => { logout(); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-all">
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
