import ExamenAlgebraBase from './ExamenAlgebraBase'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Coeficientes pequeños y una x fácil de despejar', en: 'Small coefficients and an easy x to isolate', ca: 'Coeficients petits i una x fàcil d\'aïllar' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'ESO', en: 'Secondary', ca: 'ESO' },
    hint: { es: 'Coeficientes hasta 5, positivos y negativos', en: 'Coefficients up to 5, positive and negative', ca: 'Coeficients fins a 5, positius i negatius' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Coeficientes hasta 9', en: 'Coefficients up to 9', ca: 'Coeficients fins a 9' } },
]

export default function SistemasEcuacionesExamen() {
  return (
    <ExamenAlgebraBase
      examen="sistemas-ecuaciones-test"
      emoji="🔗"
      badge={{ es: 'Examen · Álgebra', en: 'Exam · Algebra', ca: 'Examen · Àlgebra' }}
      title={{ es: '🔗 Sistemas de ecuaciones', en: '🔗 Simultaneous equations', ca: "🔗 Sistemes d'equacions" }}
      sub={{ es: 'Encuentra la x y la y que cumplen las dos ecuaciones', en: 'Find the x and y that satisfy both equations', ca: 'Troba la x i la y que compleixen les dues equacions' }}
      metaTitle={{ es: 'Examen de sistemas de ecuaciones', en: 'Simultaneous equations exam', ca: "Examen de sistemes d'equacions" }}
      metaDesc={{
        es: 'Examen de sistemas de dos ecuaciones con dos incógnitas. 10 sistemas distintos cada vez, sin tiempo, y la resolución por reducción paso a paso con su comprobación.',
        en: 'Exam on systems of two equations with two unknowns. 10 different systems every time, no timer, with the step-by-step elimination method and its check.',
        ca: "Examen de sistemes de dues equacions amb dues incògnites. 10 sistemes diferents cada vegada, sense temps, i la resolució per reducció pas a pas amb la comprovació.",
      }}
      levels={LEVELS}
      recurso="/recursos/ecuaciones"
    />
  )
}
