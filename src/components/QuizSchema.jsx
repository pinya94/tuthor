import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tuthor.es'

/**
 * JSON-LD Quiz schema for exam pages.
 * props:
 *   name        string   — exam title (in page language)
 *   description string   — short description
 *   path        string   — canonical path, e.g. '/examen/funciones'
 *   lang        string   — 'es' | 'en' | 'ca'
 *   subject     string   — topic/subject (e.g. 'Funciones matemáticas')
 *   level       string   — 'primary' | 'secondary' | 'highschool'  (default: 'secondary')
 *   questions   Array    — optional: [{ question, correctAnswer, wrongAnswers: [] }]
 */
export default function QuizSchema({ name, description, path, lang = 'es', subject, level = 'secondary', questions }) {
  const url  = `${BASE_URL}${lang === 'es' ? '' : `/${lang}`}${path}`
  const inLang = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const eduLevel = level === 'primary'
    ? 'https://schema.org/PrimaryEducation'
    : level === 'highschool'
    ? 'https://schema.org/HighSchool'
    : 'https://schema.org/SecondaryEducation'

  const hasPart = questions?.slice(0, 10).map(q => ({
    '@type': 'Question',
    'name': q.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': q.correctAnswer,
    },
    ...(q.wrongAnswers?.length ? {
      'suggestedAnswer': q.wrongAnswers.map(a => ({ '@type': 'Answer', 'text': a })),
    } : {}),
  }))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    'name': name,
    'description': description,
    'url': url,
    'inLanguage': inLang,
    'learningResourceType': 'Quiz',
    'educationalLevel': { '@type': 'DefinedTerm', 'name': eduLevel },
    'numberOfQuestions': questions?.length ?? 10,
    'about': subject ? { '@type': 'Thing', 'name': subject } : undefined,
    'provider': {
      '@type': 'Organization',
      'name': 'Tuthor',
      'url': BASE_URL,
    },
    ...(hasPart?.length ? { hasPart } : {}),
  }

  // Remove undefined values
  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k])

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
