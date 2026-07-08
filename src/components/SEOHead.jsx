import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tuthor.es'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEOHead({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  lang = 'es',
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title ? `${title} | Tuthor` : 'Tuthor — Estudia con juegos'
  const canonicalUrl = `${BASE_URL}${path}`
  const htmlLang = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es'
  const ogLocale = lang === 'ca' ? 'ca_ES' : lang === 'en' ? 'en_GB' : 'es_ES'

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

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
