import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tuthor.es'

/**
 * JSON-LD Course schema for study hub pages.
 * props:
 *   name        string  — course name
 *   description string  — short description
 *   path        string  — canonical path, e.g. '/estudiar/matematicas/funciones'
 *   lang        string  — 'es' | 'en' | 'ca'
 *   subject     string  — e.g. 'Matemáticas'
 *   level       string  — 'primary' | 'secondary' | 'highschool'
 */
export default function CourseSchema({ name, description, path, lang = 'es', subject, level = 'secondary' }) {
  const prefix = lang === 'es' ? '' : `/${lang}`
  const url    = `${BASE_URL}${prefix}${path}`
  const inLang = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const eduLevel = level === 'primary'
    ? 'https://schema.org/PrimaryEducation'
    : level === 'highschool'
    ? 'https://schema.org/HighSchool'
    : 'https://schema.org/SecondaryEducation'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': name,
    'description': description,
    'url': url,
    'inLanguage': inLang,
    'educationalLevel': { '@type': 'DefinedTerm', 'name': eduLevel },
    'about': subject ? { '@type': 'Thing', 'name': subject } : undefined,
    'provider': {
      '@type': 'Organization',
      'name': 'Tuthor',
      'url': BASE_URL,
      'sameAs': BASE_URL,
    },
    'isAccessibleForFree': true,
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'online',
      'url': url,
    },
  }

  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k])

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
