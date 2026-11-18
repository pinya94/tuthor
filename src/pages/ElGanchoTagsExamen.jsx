import MechanicExam from '../components/MechanicExam'
import PreguntaGancho from '../components/elGancho/PreguntaGancho'
import { genRonda, esCorrecta, schemaQuestion } from '../lib/elGancho'

// Examen con la mecánica de El Gancho, solo con frases de question-tags.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: "Con be (is, are, was)", en: "With be (is, are, was)", ca: "Amb be (is, are, was)" } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: "do, did, can, will, have", en: "do, did, can, will, have", ca: "do, did, can, will, have" } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: "I’m, let’s, nobody, never…", en: "I’m, let’s, nobody, never…", ca: "I’m, let’s, nobody, never…" } },
]

const genRound = (difficulty = 'facil') => genRonda(difficulty, { tema: 'question-tags' })

export default function ElGanchoTagsExamen() {
  return (
    <MechanicExam
      gameId="el-gancho-tags-test"
      emoji="❓"
      badge={{ es: 'Examen · Inglés', en: 'Exam · English', ca: 'Examen · Anglès' }}
      title={{ es: "Question tags", en: "Question Tags", ca: "Question tags" }}
      sub={{ es: "Pon la coletilla: isn’t she?, didn’t they?, aren’t I?…", en: "Add the tag: isn’t she?, didn’t they?, aren’t I?…", ca: "Posa la coletilla: isn’t she?, didn’t they?, aren’t I?…" }}
      metaTitle={{ es: "Examen de question tags en inglés (con el juego El Gancho)", en: "Question tags exam (with The Hook game)", ca: "Examen de question tags en anglès (amb el joc El Ganxo)" }}
      metaDesc={{ es: "Examen de question tags: elige la coletilla correcta con be, do, did, can, will, I’m, let’s, nobody o there is. 10 preguntas en tres niveles, con la regla de cada fallo.", en: "Question tags exam: choose the right tag with be, do, did, can, will, I’m, let’s, nobody or there is. 10 questions on three levels, with the rule for every mistake.", ca: "Examen de question tags: tria la coletilla correcta amb be, do, did, can, will, I’m, let’s, nobody o there is. 10 preguntes en tres nivells, amb la regla de cada error." }}
      metaPath="/examen/el-gancho-tags-test"
      subjectSchema="Inglés"
      backGamePath="/juegos/el-gancho"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaGancho key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
