import MechanicExam from '../components/MechanicExam'
import PreguntaVerbo from '../components/montaVerbo/PreguntaVerbo'
import { genRound, esCorrecta, schemaQuestion } from '../lib/montaVerbo'

// Examen con la mecánica de Monta el Verbo: diez tablas, sin reloj. Solo en
// castellano (ver games.js idiomas).
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Presente, perfecto simple y futuro', en: 'Present, simple past and future', ca: 'Present, passat simple i futur' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Imperfecto, condicional y compuestos', en: 'Imperfect, conditional and compound tenses', ca: 'Imperfet, condicional i compostos' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Subjuntivo e irregulares', en: 'Subjunctive and irregular verbs', ca: 'Subjuntiu i irregulars' } },
]

export default function MontaVerboExamen() {
  return (
    <MechanicExam
      gameId="monta-el-verbo-test"
      emoji="🛠️"
      badge={{ es: 'Examen · Lengua', en: 'Exam · Spanish', ca: 'Examen · Castellà' }}
      title={{ es: 'Conjugación verbal', en: 'Spanish verb conjugation', ca: 'Conjugació verbal' }}
      sub={{ es: 'Completa la tabla de cada tiempo con las terminaciones', en: 'Complete each tense table with the endings', ca: 'Completa la taula de cada temps amb les terminacions' }}
      metaTitle={{ es: 'Examen de conjugación de verbos (tablas de los tiempos verbales)', en: 'Spanish verb conjugation exam', ca: 'Examen de conjugació de verbs en castellà' }}
      metaDesc={{ es: 'Examen de conjugación: completa las tablas de presente, pretérito perfecto simple, imperfecto, futuro, condicional, tiempos compuestos, subjuntivo e irregulares. 10 tablas en tres niveles.', en: 'Spanish conjugation exam: complete the tables of each tense. 10 tables on three levels.', ca: 'Examen de conjugació en castellà: completa les taules de cada temps verbal. 10 taules en tres nivells.' }}
      metaPath="/examen/monta-el-verbo-test"
      subjectSchema="Lengua"
      backGamePath="/juegos/monta-el-verbo"
      playLabel={{ es: 'Modo arcade (contrarreloj)', en: 'Arcade mode (against the clock)', ca: 'Mode arcade (contrarellotge)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaVerbo key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
