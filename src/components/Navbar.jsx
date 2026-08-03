import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MAIN_CARDS } from '../data/constants'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getTeacherProfile } from '../lib/classes'
import AuthModal from './AuthModal'

const LANGS = [
  { code: 'es', flag: 'es', label: 'Español' },
  { code: 'en', flag: 'gb', label: 'English' },
  { code: 'ca', flag: 'ad', label: 'Català' },
]

function LangSelector({ lang, switchLang, onPick }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANGS.find(l => l.code === lang) || LANGS[0]

  useEffect(() => {
    if (!open) return
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-white/60 hover:text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-all text-sm"
      >
        <img src={`https://flagcdn.com/w40/${current.flag}.png`} alt={current.label} width={20} height={15} className="rounded-sm" />
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-[#0d0d1a] border border-white/10 backdrop-blur-md rounded-xl overflow-hidden w-40 shadow-xl z-50">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => { switchLang(l.code); setOpen(false); onPick?.() }}
              className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${
                l.code === lang ? 'bg-violet-600/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <img src={`https://flagcdn.com/w40/${l.flag}.png`} alt={l.label} width={20} height={15} className="rounded-sm" />
              <span className="font-medium">{l.label}</span>
              {l.code === lang && <span className="ml-auto text-violet-400 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [avatarMenu, setAvatarMenu] = useState(false)
  const { user, logout } = useAuth()
  const { lang, t, localPath, switchLang } = useLang()

  const authLoading = user === undefined

  // "Clase" es un único punto de entrada, pero no todos pueden crear
  // clases: solo una cuenta con la capacidad de profesor activa va al
  // panel de creación; cualquier otra va a su perfil, donde ya tiene la
  // tarjeta para unirse a una clase con un código.
  async function goToClase() {
    const profile = user ? await getTeacherProfile(user.uid).catch(() => null) : null
    navigate(localPath(profile?.active ? '/profesor' : '/perfil'))
  }

  const navLabels = {
    estudiar: t('nav.estudiar'),
    juegos: t('nav.juegos'),
    diaria: t('nav.diaria'),
  }

  return (
    <>
      <nav className="relative z-50 bg-black/30 border-b border-white/10 backdrop-blur-md">
        <div className="h-16 flex items-center justify-between px-4 sm:px-8">

          {/* Logo */}
          <button onClick={() => { navigate(localPath('/')); setMenuOpen(false) }} className="hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Tuthor" className="h-7 w-auto" />
          </button>

          {/* Nav escritorio */}
          <div className="hidden sm:flex items-center gap-1">
            {MAIN_CARDS.map(c => {
              const dest = localPath(c.path)
              const isActive = location.pathname === dest || location.pathname.startsWith(dest + '/')
              return (
                <button
                  key={c.id}
                  onClick={() => navigate(dest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive ? 'bg-violet-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                >
                  {navLabels[c.id] || c.title}
                </button>
              )
            })}
          </div>

          {/* Auth escritorio + idioma */}
          <div className="hidden sm:flex items-center gap-2">
            <LangSelector lang={lang} switchLang={switchLang} />
            {!authLoading && !user && (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
              >
                {t('nav.entrar')}
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
                    <button onClick={() => { navigate(localPath('/perfil')); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                      👤 {t('nav.perfil')}
                    </button>
                    <button onClick={() => { navigate(localPath('/tienda')); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors border-t border-white/5">
                      🛍 {lang === 'en' ? 'Shop' : lang === 'ca' ? 'Botiga' : 'Tienda'}
                    </button>
                    <button onClick={() => { goToClase(); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors border-t border-white/5">
                      🎓 {t('nav.clase')}
                    </button>
                    {['pinya1994@gmail.com','consiguetualgogratis@gmail.com','consiguetualgogratis@tuthor.app'].includes(user?.email) && (
                      <button onClick={() => { navigate(localPath('/admin')); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-amber-400/70 hover:text-amber-300 hover:bg-white/10 transition-colors border-t border-white/5">
                        🛠️ Admin
                      </button>
                    )}
                    <button onClick={() => { logout(); setAvatarMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors border-t border-white/5">
                      {t('nav.cerrarSesion')}
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
            {MAIN_CARDS.map(c => {
              const dest = localPath(c.path)
              return (
                <button key={c.id} onClick={() => { navigate(dest); setMenuOpen(false) }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${location.pathname === dest || location.pathname.startsWith(dest + '/') ? 'bg-violet-600 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                  {navLabels[c.id] || c.title}
                </button>
              )
            })}
            <div className="border-t border-white/10 pt-2 mt-1">
              <LangSelector lang={lang} switchLang={switchLang} onPick={() => setMenuOpen(false)} />
              {!authLoading && !user && (
                <button onClick={() => { setShowAuth(true); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                  🔑 {t('nav.entrar')}
                </button>
              )}
              {!authLoading && user && (
                <>
                  <button onClick={() => { navigate(localPath('/perfil')); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    👤 {t('nav.perfil')}
                  </button>
                  <button onClick={() => { navigate(localPath('/tienda')); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    🛍 {lang === 'en' ? 'Shop' : lang === 'ca' ? 'Botiga' : 'Tienda'}
                  </button>
                  <button onClick={() => { goToClase(); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    🎓 {t('nav.clase')}
                  </button>
                  {['pinya1994@gmail.com','consiguetualgogratis@gmail.com','consiguetualgogratis@tuthor.app'].includes(user?.email) && (
                    <button onClick={() => { navigate(localPath('/admin')); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-amber-400/70 hover:text-amber-300 hover:bg-white/10 transition-all">
                      🛠️ {t('nav.admin')}
                    </button>
                  )}
                  <button onClick={() => { logout(); setMenuOpen(false) }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-all">
                    {t('nav.cerrarSesion')}
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
