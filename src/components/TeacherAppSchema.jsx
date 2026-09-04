import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tuthor.es'

// JSON-LD SoftwareApplication para la LP de profesores (/profesores) — el
// resto del sitio son Course/Quiz para un alumno que busca jugar; esta es la
// única página pensada para un profesor que busca gestionar su clase, así
// que lleva su propio schema con ese enfoque.
//
// Sin aggregateRating: no hay reseñas reales que declarar, e inventarlas es
// justo el tipo de dato estructurado que penaliza Google (mismo criterio que
// CourseSchema/QuizSchema, que tampoco fingen valoraciones).
//
// offers con price "0": es verdad mientras dure la beta gratuita (ver
// TEACHER_BETA_CODE en classes.js) — si el acceso vuelve a ser de pago, este
// precio hay que actualizarlo a la vez que el resto de la página.
const COPY = {
  es: {
    name: 'Tuthor para profesores',
    description: 'Pasar lista, poner notas, crear tus propios exámenes tipo test y gestionar la clase entera desde el móvil.',
    features: ['Pasar lista', 'Notas por trimestre', 'Exámenes propios tipo test', 'Plano de la clase y modo puntos', 'Boletín para familias'],
  },
  en: {
    name: 'Tuthor for teachers',
    description: 'Take attendance, grade your students, build your own multiple-choice quizzes and run the whole classroom from your phone.',
    features: ['Attendance', 'Grades by term', 'Custom multiple-choice quizzes', 'Seating plan and points mode', 'Report for families'],
  },
  ca: {
    name: 'Tuthor per a professors',
    description: 'Passar llista, posar notes, crear els teus propis exàmens tipus test i gestionar tota la classe des del mòbil.',
    features: ['Passar llista', 'Notes per trimestre', 'Exàmens propis tipus test', 'Plànol de la classe i mode punts', 'Butlletí per a famílies'],
  },
}

export default function TeacherAppSchema({ lang = 'es' }) {
  const prefix = lang === 'es' ? '' : `/${lang}`
  const url = `${BASE_URL}${prefix}/profesores`
  const c = COPY[lang] || COPY.es

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': c.name,
    'description': c.description,
    'url': url,
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EUR',
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Tuthor',
      'url': BASE_URL,
    },
    'featureList': c.features,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
