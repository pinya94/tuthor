import { createContext, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import es from '../i18n/es'
import en from '../i18n/en'

const TRANSLATIONS = { es, en }
const LANGS = ['es', 'en']
const DEFAULT_LANG = 'es'

const LangContext = createContext({ lang: 'es', t: k => k, localPath: p => p, switchLang: () => {} })

export function LangProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const lang = location.pathname.startsWith('/en') ? 'en' : 'es'

  const t = useMemo(() => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG]
    return (key, fallback) => dict[key] ?? fallback ?? key
  }, [lang])

  function localPath(path) {
    if (lang === 'es') return path
    return `/en${path === '/' ? '' : path}`
  }

  function switchLang(newLang) {
    const currentPath = location.pathname
    if (newLang === 'en') {
      if (!currentPath.startsWith('/en')) {
        navigate(`/en${currentPath === '/' ? '' : currentPath}`)
      }
    } else {
      if (currentPath.startsWith('/en')) {
        const stripped = currentPath.replace(/^\/en/, '') || '/'
        navigate(stripped)
      }
    }
  }

  return (
    <LangContext.Provider value={{ lang, t, localPath, switchLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
