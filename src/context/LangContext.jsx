import { createContext, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import es from '../i18n/es'
import en from '../i18n/en'
import ca from '../i18n/ca'

const TRANSLATIONS = { es, en, ca }
const LANGS = ['es', 'en', 'ca']
const DEFAULT_LANG = 'es'

const LangContext = createContext({ lang: 'es', t: k => k, localPath: p => p, switchLang: () => {} })

export function LangProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const lang = location.pathname.startsWith('/ca') ? 'ca'
    : location.pathname.startsWith('/en') ? 'en'
    : 'es'

  const t = useMemo(() => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG]
    return (key, fallback) => dict[key] ?? fallback ?? key
  }, [lang])

  function localPath(path) {
    if (lang === 'es') return path
    const prefix = `/${lang}`
    return `${prefix}${path === '/' ? '' : path}`
  }

  function switchLang(newLang) {
    const currentPath = location.pathname
    const stripped = currentPath.replace(/^\/(en|ca)/, '') || '/'
    if (newLang === 'es') {
      navigate(stripped)
    } else {
      navigate(`/${newLang}${stripped === '/' ? '' : stripped}`)
    }
  }

  function lt(obj, field = 'title') {
    if (lang === 'en') {
      const enKey = field + 'En'
      if (obj[enKey]) return obj[enKey]
    }
    if (lang === 'ca') {
      const caKey = field + 'Ca'
      if (obj[caKey]) return obj[caKey]
    }
    return obj[field]
  }

  // Patrón estándar para textos traducidos: tr({ es: '...', en: '...', ca: '...' }).
  // Cae al español si falta el idioma activo. Añadir un idioma nuevo = añadir
  // su clave en los objetos + una entrada en LANGS (sin ternarios por página).
  function tr(obj) {
    if (!obj) return ''
    return obj[lang] ?? obj[DEFAULT_LANG] ?? ''
  }

  return (
    <LangContext.Provider value={{ lang, t, lt, tr, localPath, switchLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
