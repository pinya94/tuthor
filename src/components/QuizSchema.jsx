import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tuthor.es'

/**
 * JSON-LD Quiz schema for exam pages (also reused for game pages behind the
 * paywall — ver AccessGate.jsx — con kind='LearningResource', que no implica
 * preguntas).
 * props:
 *   name        string   — exam title (in page language)
 *   description string   — short description
 *   path        string   — canonical path, e.g. '/examen/funciones'
 *   lang        string   — 'es' | 'en' | 'ca'
 *   subject     string   — topic/subject (e.g. 'Funciones matemáticas')
 *   level       string   — 'primary' | 'secondary' | 'highschool'  (default: 'secondary')
 *   questions   Array    — optional: [{ question, correctAnswer, wrongAnswers: [] }]
 *   kind        string   — '@type' schema.org, 'Quiz' (default) o 'LearningResource'
 *   isAccessibleForFree boolean — default true. AccessGate lo pone a false en
 *     la pantalla de muro (Locked): mismo patrón que documenta Google para
 *     contenido de pago — no ocultar del todo la página, marcarla como tal.
 */
export default function QuizSchema({ name, description, path, lang = 'es', subject, level = 'secondary', questions, teaches, kind = 'Quiz', isAccessibleForFree = true }) {
  const url  = `${BASE_URL}${lang === 'es' ? '' : `/${lang}`}${path}`
  const inLang = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const eduLevel = level === 'primary'
    ? 'https://schema.org/PrimaryEducation'
    : level === 'highschool'
    ? 'https://schema.org/HighSchool'
    : 'https://schema.org/SecondaryEducation'

  // Cuántas preguntas se publican en el JSON-LD. Antes eran 10 y ahora 30:
  // decisión explícita del usuario ("publica muchas, no me preocupa que lo
  // encuentren en Google, porque Tuthor luego sirve para entrenar"). El tope
  // no es pudor, es peso de página — cada pregunta con sus cuatro opciones
  // son ~300 bytes en el HTML de TODAS las visitas, y pasado cierto punto se
  // paga en tiempo de carga sin ganar nada en indexación.
  const MAX_SCHEMA_QUESTIONS = 30

  // eduQuestionType + learningResourceType: es lo que pide Google para los
  // resultados enriquecidos de "problemas de práctica" (education Q&A). Sin
  // ellos el bloque se indexa como texto pero no opta a ese formato.
  const hasPart = questions?.slice(0, MAX_SCHEMA_QUESTIONS).map(q => ({
    '@type': 'Question',
    'eduQuestionType': 'Multiple choice',
    'learningResourceType': 'Practice problem',
    'name': q.question,
    'text': q.question,
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
    '@type': kind,
    'name': name,
    'description': description,
    'url': url,
    'inLanguage': inLang,
    'isAccessibleForFree': isAccessibleForFree,
    'learningResourceType': kind === 'Quiz' ? 'Quiz' : undefined,
    'educationalLevel': { '@type': 'DefinedTerm', 'name': eduLevel },
    // El número REAL de preguntas del temario, no el de las publicadas ni un
    // 10 inventado: antes, sin `questions`, declaraba 10 preguntas en páginas
    // que no traían ninguna. Declarar algo que el propio HTML desmiente es
    // justo lo que hace desconfiar a un validador de datos estructurados.
    'numberOfQuestions': kind === 'Quiz' ? questions?.length : undefined,
    'about': subject ? { '@type': 'Thing', 'name': subject } : undefined,
    // `teaches` es la propiedad de schema.org para "qué se aprende usando
    // esto". Importa sobre todo en los ejercicios VISUALES (portero,
    // trayectoria, geomapa…), donde el enunciado es un dibujo y no se puede
    // publicar como pregunta sin que pierda el sentido: en vez de inventar un
    // texto que no se corresponde con la página, se declara con honestidad
    // qué se practica. Es además como se busca ("ejercicios para practicar
    // razonamiento espacial").
    'teaches': teaches?.length
      ? teaches.map(t => ({ '@type': 'DefinedTerm', 'name': t }))
      : undefined,
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
