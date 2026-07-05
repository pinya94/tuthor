import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tuthor.es'

/**
 * JSON-LD BreadcrumbList schema.
 * props:
 *   lang   string  — 'es' | 'en' | 'ca'
 *   items  Array   — [{ name, path }]  (path without lang prefix, e.g. '/estudiar/matematicas')
 */
export default function BreadcrumbSchema({ lang = 'es', items }) {
  const prefix = lang === 'es' ? '' : `/${lang}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.name,
      'item': `${BASE_URL}${prefix}${item.path}`,
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
