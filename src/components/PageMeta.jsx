import SEOHead from './SEOHead'

// Wrapper legacy: la implementación única de meta es SEOHead.
// Código nuevo debe importar SEOHead directamente.
export default function PageMeta({ title, description, path, lang, noIndex = false }) {
  return (
    <SEOHead
      title={title}
      description={description}
      path={path}
      lang={lang}
      noindex={noIndex}
    />
  )
}
