import MechanicExam from '../components/MechanicExam'
import PreguntaGancho from '../components/elGancho/PreguntaGancho'
import { genRonda, esCorrecta, schemaQuestion } from '../lib/elGancho'

// Examen de un toque por frase (antes «El Gancho»: era un test, no un juego), solo con frases de relative-pronouns.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: "who, which, where", en: "who, which, where", ca: "who, which, where" } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: "whose, when", en: "whose, when", ca: "whose, when" } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: "Entre comas, which = lo cual, what", en: "Between commas, which for a whole clause, what", ca: "Entre comes, which = la qual cosa, what" } },
]

const genRound = (difficulty = 'facil') => genRonda(difficulty, { tema: 'relative-pronouns' })

export default function ElGanchoRelativosExamen() {
  return (
    <MechanicExam
      gameId="el-gancho-relativos-test"
      emoji="🔗"
      badge={{ es: 'Examen · Inglés', en: 'Exam · English', ca: 'Examen · Anglès' }}
      title={{ es: "Relative pronouns", en: "Relative Pronouns", ca: "Relative pronouns" }}
      sub={{ es: "who, which, where, whose, when… y nunca that entre comas", en: "who, which, where, whose, when… and never that between commas", ca: "who, which, where, whose, when… i mai that entre comes" }}
      metaTitle={{ es: "Examen de relative pronouns en inglés (con el juego El Gancho)", en: "Relative pronouns exam (with The Hook game)", ca: "Examen de relative pronouns en anglès (amb el joc El Ganxo)" }}
      metaDesc={{ es: "Examen de relative pronouns: who, which, where, whose, when y what, con oraciones entre comas. 10 preguntas en tres niveles, con la regla de cada fallo.", en: "Relative pronouns exam: who, which, where, whose, when and what, including non-defining clauses. 10 questions on three levels, with the rule for every mistake.", ca: "Examen de relative pronouns: who, which, where, whose, when i what, amb oracions entre comes. 10 preguntes en tres nivells, amb la regla de cada error." }}
      metaPath="/examen/el-gancho-relativos-test"
      subjectSchema="Inglés"
      backGamePath="/estudiar/idiomas/ingles/grammar/relative-pronouns"
      backLabel={{ es: '← Teoría de relative pronouns', en: '← relative pronouns theory', ca: '← Teoria de relative pronouns' }}
      playLabel={{ es: '📖 Repasar la teoría', en: '📖 Review the theory', ca: '📖 Repassar la teoria' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaGancho key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
