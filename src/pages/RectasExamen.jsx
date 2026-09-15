import ExamenAlgebraBase from './ExamenAlgebraBase'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Recta por dos puntos y con pendiente y punto', en: 'Line through two points, and from slope and point', ca: 'Recta per dos punts i amb pendent i punt' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'ESO', en: 'Secondary', ca: 'ESO' },
    hint: { es: 'Y además, dónde se cortan dos rectas', en: 'Plus where two lines cross', ca: 'I a més, on es tallen dues rectes' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Con pendientes fraccionarias', en: 'With fractional slopes', ca: 'Amb pendents fraccionaris' } },
]

export default function RectasExamen() {
  return (
    <ExamenAlgebraBase
      examen="rectas-test"
      emoji="📏"
      badge={{ es: 'Examen · Funciones', en: 'Exam · Functions', ca: 'Examen · Funcions' }}
      title={{ es: '📏 Rectas: pendiente y puntos', en: '📏 Lines: slope and points', ca: '📏 Rectes: pendent i punts' }}
      sub={{ es: 'Halla la ecuación de la recta o dónde se cortan dos', en: 'Find the equation of the line or where two cross', ca: "Troba l'equació de la recta o on es tallen dues" }}
      metaTitle={{ es: 'Examen de rectas: pendiente, puntos y corte', en: 'Straight lines exam: slope, points and crossing', ca: 'Examen de rectes: pendent, punts i tall' }}
      metaDesc={{
        es: 'Examen de rectas: la recta que pasa por dos puntos, con pendiente y un punto, y el punto de corte de dos rectas. 10 preguntas distintas cada vez, con la resolución paso a paso.',
        en: 'Straight lines exam: the line through two points, from a slope and a point, and where two lines cross. 10 different questions every time, with step-by-step solutions.',
        ca: 'Examen de rectes: la recta que passa per dos punts, amb pendent i un punt, i el punt de tall de dues rectes. 10 preguntes diferents cada vegada, amb la resolució pas a pas.',
      }}
      levels={LEVELS}
      recurso="/recursos/funciones/recta-dos-puntos"
    />
  )
}
