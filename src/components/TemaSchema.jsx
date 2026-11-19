// Datos estructurados (JSON-LD) de una página de estudio con contenido propio:
// LearningResource (qué es la página) + FAQPage con sus preguntas frecuentes.
// Hasta nov-2026 las páginas de estudio no llevaban ninguno, y son las que
// traen casi todas las impresiones de Google («pronombres», «adverbios»…).
// Va con Helmet, así que el prerender lo deja en el HTML estático.
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const BASE_URL = 'https://www.tuthor.es'
const sinEtiquetas = t => String(t).replace(/<[^>]+>/g, '').trim()

export default function TemaSchema({ c, lang }) {
  const { pathname } = useLocation()
  const pick = obj => obj?.[lang] ?? obj?.es
  const url = BASE_URL + pathname.replace(/\/$/, '')
  const nombre = pick(c.metaTitle)
  const recurso = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: nombre,
    description: pick(c.metaDesc),
    url,
    inLanguage: lang,
    isAccessibleForFree: true,
    learningResourceType: 'Study guide',
    provider: { '@type': 'Organization', name: 'Tuthor', url: BASE_URL },
    ...(c.puntosClave ? { teaches: pick(c.puntosClave).slice(0, 6).map(sinEtiquetas) } : {}),
  }
  const faq = c.preguntas?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.preguntas.map(q => ({
      '@type': 'Question',
      name: sinEtiquetas(pick(q.p)),
      acceptedAnswer: { '@type': 'Answer', text: sinEtiquetas(pick(q.r)) },
    })),
  } : null
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(recurso)}</script>
      {faq && <script type="application/ld+json">{JSON.stringify(faq)}</script>}
    </Helmet>
  )
}
