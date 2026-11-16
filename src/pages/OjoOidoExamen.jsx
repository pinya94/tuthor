import MechanicExam from '../components/MechanicExam'
import PreguntaOjoOido from '../components/ojoOido/PreguntaOjoOido'
import { genRound, esCorrecta, schemaQuestion } from '../lib/ojoOido'

// Examen con la mecánica de Ojo y Oído: las mismas rondas, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Las partes por su nombre', en: 'Parts by name', ca: 'Les parts pel nom' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Las partes por su función', en: 'Parts by what they do', ca: 'Les parts per la funció' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'El camino de la luz y del sonido', en: 'The path of light and sound', ca: 'El camí de la llum i del so' } },
]

export default function OjoOidoExamen() {
  return (
    <MechanicExam
      gameId="ojo-y-oido-test"
      emoji="👂"
      badge={{ es: 'Examen · Biología', en: 'Exam · Biology', ca: 'Examen · Biologia' }}
      title={{ es: 'El ojo y el oído', en: 'The Eye and the Ear', ca: 'L’ull i l’orella' }}
      sub={{ es: 'Toca las partes en el dibujo', en: 'Tap the parts on the drawing', ca: 'Toca les parts al dibuix' }}
      metaTitle={{ es: 'Examen de los sentidos: partes del ojo y del oído (con el juego Ojo y Oído)', en: 'Senses exam: parts of the eye and ear (with the Eye and Ear game)', ca: 'Examen dels sentits: parts de l’ull i de l’orella (amb el joc Ull i Orella)' }}
      metaDesc={{ es: 'Examen de las partes del ojo y del oído: tócalas en el dibujo por su nombre o por su función y sigue el camino de la luz y del sonido. 10 preguntas en tres niveles, con la explicación de cada una.', en: 'Exam on the parts of the eye and ear: tap them on the drawing by name or by function and follow the path of light and sound. 10 questions on three levels, each explained.', ca: 'Examen de les parts de l’ull i de l’orella: toca-les al dibuix pel nom o per la funció i segueix el camí de la llum i del so. 10 preguntes en tres nivells, amb l’explicació de cadascuna.' }}
      metaPath="/examen/ojo-y-oido-test"
      subjectSchema="Biología"
      backGamePath="/juegos/ojo-y-oido"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaOjoOido key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
