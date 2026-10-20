import { Helmet } from 'react-helmet-async'
import { useLang } from '../context/LangContext'
import { idiomasDe } from '../lib/idiomasPagina'

const BASE_URL = 'https://www.tuthor.es'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`


const langPrefix = l => (l === 'es' ? '' : `/${l}`)

// Acepta paths con o sin prefijo de idioma y devuelve el path neutro.
const stripLangPrefix = p => (p || '/').replace(/^\/(en|ca)(?=\/|$)/, '') || '/'

/**
 * Meta única de la app: title, description, canonical por idioma,
 * Open Graph, Twitter y alternates hreflang.
 * `path` es el path SIN prefijo de idioma (p. ej. "/juegos/georush");
 * si llega con prefijo se normaliza. El idioma sale de LangContext,
 * `lang` solo hace falta fuera del provider.
 */
export default function SEOHead({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  lang: langProp,
  type = 'website',
  noindex = false,
}) {
  const { lang: ctxLang, tr } = useLang()
  const lang = langProp || ctxLang || 'es'
  const trF = tr || (o => o.es)

  // La marca va primero: en una pestaña estrecha el navegador corta por la
  // derecha, así que "Tuthor" tiene que ser lo primero que se lea o
  // desaparece del todo con muchas pestañas abiertas — pasaba con
  // "${title} | Tuthor", donde la marca era literalmente lo último.
  const fullTitle = title
    ? `Tuthor · ${title}`
    : trF({ es: 'Tuthor — Estudia con juegos', en: 'Tuthor — Study with games', ca: 'Tuthor — Estudia amb jocs' })
  const cleanPath = stripLangPrefix(path)
  const pagePath = cleanPath === '/' ? '' : cleanPath
  const canonicalUrl = `${BASE_URL}${langPrefix(lang)}${pagePath}`
  // Una página pedida en un idioma que no tiene (p. ej. /en/ de un examen solo
  // en castellano) no es una página de verdad: que Google no la indexe.
  const sinTraducir = lang !== 'es' && !idiomasDe(cleanPath).includes(lang)
  const ogLocale = lang === 'ca' ? 'ca_ES' : lang === 'en' ? 'en_GB' : 'es_ES'

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {(noindex || sinTraducir) && <meta name="robots" content={noindex ? 'noindex,nofollow' : 'noindex,follow'} />}

      {/* Alternates: solo los idiomas en que existe la página */}
      {idiomasDe(cleanPath).map(l => (
        <link key={l} rel="alternate" hrefLang={l} href={`${BASE_URL}${langPrefix(l)}${pagePath}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${pagePath}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content="Tuthor" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
