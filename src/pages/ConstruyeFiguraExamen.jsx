import MechanicExam from '../components/MechanicExam'
import PreguntaFigura from '../components/construyeFigura/PreguntaFigura'
import { genRound, esCorrecta, schemaQuestion } from '../lib/construyeFigura'

// Examen con la mecánica de Construye la Figura: diez figuras, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Área y rectángulos', en: 'Area and rectangles', ca: 'Àrea i rectangles' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Área y perímetro a la vez', en: 'Area and perimeter together', ca: 'Àrea i perímetre alhora' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Perímetro máximo y mínimo', en: 'Longest and shortest perimeter', ca: 'Perímetre màxim i mínim' } },
]

export default function ConstruyeFiguraExamen() {
  return (
    <MechanicExam
      gameId="construye-figura-test"
      emoji="🔲"
      badge={{ es: 'Examen · Matemáticas', en: 'Exam · Maths', ca: 'Examen · Matemàtiques' }}
      title={{ es: 'Área y perímetro', en: 'Area and Perimeter', ca: 'Àrea i perímetre' }}
      sub={{ es: 'Dibuja en la cuadrícula la figura que se pide', en: 'Draw the shape you are asked for on the grid', ca: 'Dibuixa a la quadrícula la figura que es demana' }}
      metaTitle={{ es: 'Examen de área y perímetro en cuadrícula', en: 'Area and perimeter exam on a grid', ca: 'Examen d’àrea i perímetre en quadrícula' }}
      metaDesc={{ es: 'Examen de área y perímetro: dibuja en una cuadrícula figuras con el área y el perímetro que se piden, rectángulos y el mayor o menor perímetro posible. 10 preguntas en tres niveles.', en: 'Area and perimeter exam: draw shapes on a grid with the area and perimeter you are asked for, rectangles and the longest or shortest possible perimeter. 10 questions on three levels.', ca: 'Examen d’àrea i perímetre: dibuixa en una quadrícula figures amb l’àrea i el perímetre que es demanen, rectangles i el perímetre més gran o més petit possible. 10 preguntes en tres nivells.' }}
      metaPath="/examen/construye-figura-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/construye-figura"
      playLabel={{ es: 'Modo arcade (contrarreloj)', en: 'Arcade mode (against the clock)', ca: 'Mode arcade (contrarellotge)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaFigura key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} mostrarArea={round.nivel === 'medio'} />}
    />
  )
}
