import ExamenAlgebraBase from './ExamenAlgebraBase'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'x² + bx + c = 0 y ecuaciones incompletas', en: 'x² + bx + c = 0 and incomplete equations', ca: 'x² + bx + c = 0 i equacions incompletes' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'ESO', en: 'Secondary', ca: 'ESO' },
    hint: { es: 'Con a distinto de 1 y soluciones dobles', en: 'With a other than 1 and double roots', ca: 'Amb a diferent d\'1 i solucions dobles' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Soluciones fraccionarias o sin solución real', en: 'Fractional roots or no real solution', ca: 'Solucions fraccionàries o sense solució real' } },
]

export default function EcuacionesSegundoGradoExamen() {
  return (
    <ExamenAlgebraBase
      examen="ecuaciones-segundo-grado-test"
      emoji="🧮"
      badge={{ es: 'Examen · Álgebra', en: 'Exam · Algebra', ca: 'Examen · Àlgebra' }}
      title={{ es: '🧮 Ecuaciones de segundo grado', en: '🧮 Quadratic equations', ca: '🧮 Equacions de segon grau' }}
      sub={{ es: 'Resuelve cada ecuación y escribe sus soluciones', en: 'Solve each equation and type its solutions', ca: 'Resol cada equació i escriu-ne les solucions' }}
      metaTitle={{ es: 'Examen de ecuaciones de segundo grado', en: 'Quadratic equations exam', ca: "Examen d'equacions de segon grau" }}
      metaDesc={{
        es: 'Examen de ecuaciones de segundo grado: completas, incompletas, con raíz doble o sin solución. 10 preguntas distintas cada vez, sin tiempo y con la resolución paso a paso.',
        en: 'Quadratic equations exam: complete, incomplete, with a double root or no solution. 10 different questions every time, no timer, with the step-by-step solution.',
        ca: "Examen d'equacions de segon grau: completes, incompletes, amb arrel doble o sense solució. 10 preguntes diferents cada vegada, sense temps i amb la resolució pas a pas.",
      }}
      levels={LEVELS}
      recurso="/recursos/ecuaciones"
    />
  )
}
