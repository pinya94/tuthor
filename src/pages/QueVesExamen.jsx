import MechanicExam from '../components/MechanicExam'
import PreguntaQueVes from '../components/queVes/PreguntaQueVes'
import { genRound, esCorrecta, schemaQuestion } from '../lib/queVes'

// Examen con la mecánica de ¿Qué Ves?: diez escenas, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Un hueco por frase', en: 'One gap per sentence', ca: 'Un buit per frase' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'La gramática y el dibujo', en: 'Grammar and the picture', ca: 'La gramàtica i el dibuix' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Preguntas y negativas', en: 'Questions and negatives', ca: 'Preguntes i negatives' } },
]

export default function QueVesExamen() {
  return (
    <MechanicExam
      gameId="que-ves-test"
      emoji="👀"
      badge={{ es: 'Examen · Inglés', en: 'Exam · English', ca: 'Examen · Anglès' }}
      title={{ es: 'Look and Write', en: 'Look and Write', ca: 'Look and Write' }}
      sub={{ es: 'Mira el dibujo y completa la frase', en: 'Look at the picture and complete the sentence', ca: 'Mira el dibuix i completa la frase' }}
      metaTitle={{ es: 'Examen de inglés para Primaria: there is, have got, can y present continuous (con dibujo)', en: 'Young learners’ English exam: there is, have got, can and the present continuous', ca: 'Examen d’anglès per a Primària: there is, have got, can i present continuous (amb dibuix)' }}
      metaDesc={{ es: 'Examen de inglés básico con una escena dibujada: completa 10 frases con there is / there are, has got, can, el present continuous y los posesivos, con la explicación de cada una.', en: 'Basic English exam with a picture: complete 10 sentences with there is / there are, has got, can, the present continuous and possessives, each one explained.', ca: 'Examen d’anglès bàsic amb una escena dibuixada: completa 10 frases amb there is / there are, has got, can, el present continuous i els possessius, amb l’explicació de cadascuna.' }}
      metaPath="/examen/que-ves-test"
      subjectSchema="Inglés"
      backGamePath="/juegos/que-ves"
      playLabel={{ es: 'Modo arcade (150s)', en: 'Arcade mode (150s)', ca: 'Mode arcade (150s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaQueVes key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
