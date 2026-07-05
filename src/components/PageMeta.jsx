import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tuthor.es'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function PageMeta({ title, description, path, lang = 'es', noIndex = false }) {
  const fullTitle = title ? `${title} | Tuthor` : 'Tuthor — Aprende jugando'
  const canonical = `${BASE_URL}${lang === 'es' ? '' : `/${lang}`}${path ?? ''}`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang === 'ca' ? 'ca_ES' : 'es_ES'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Helmet>
  )
}
