import MechanicExam from '../components/MechanicExam'
import PreguntaMensajero from '../components/elMensajero/PreguntaMensajero'
import { genRound, esCorrecta, schemaQuestion } from '../lib/elMensajero'

// Examen con la mecánica de El Mensajero: las mismas frases, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Pronombre y tiempo verbal', en: 'Pronoun and tense', ca: 'Pronom i temps verbal' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Más tiempos y today → that day', en: 'More tenses and today → that day', ca: 'Més temps i today → that day' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Preguntas y órdenes', en: 'Questions and commands', ca: 'Preguntes i ordres' } },
]

export default function ElMensajeroExamen() {
  return (
    <MechanicExam
      gameId="el-mensajero-test"
      emoji="📨"
      badge={{ es: 'Examen · Inglés', en: 'Exam · English', ca: 'Examen · Anglès' }}
      title={{ es: 'Reported Speech', en: 'Reported Speech', ca: 'Reported Speech' }}
      sub={{ es: 'Del estilo directo al indirecto', en: 'From direct to reported speech', ca: 'De l’estil directe a l’indirecte' }}
      metaTitle={{ es: 'Examen de reported speech (estilo indirecto en inglés) con el juego El Mensajero', en: 'Reported speech exam (with The Messenger game)', ca: 'Examen de reported speech (estil indirecte en anglès) amb el joc El Missatger' }}
      metaDesc={{ es: 'Examen de reported speech: pasa 10 frases al estilo indirecto rellenando los huecos. Pronombres, tiempos verbales, palabras de tiempo y lugar, preguntas y órdenes, con la explicación de cada cambio.', en: 'Reported speech exam: put 10 sentences into reported speech by filling the gaps. Pronouns, tenses, time and place words, questions and commands, with every change explained.', ca: 'Examen de reported speech: passa 10 frases a l’estil indirecte omplint els buits. Pronoms, temps verbals, paraules de temps i lloc, preguntes i ordres, amb l’explicació de cada canvi.' }}
      metaPath="/examen/el-mensajero-test"
      subjectSchema="Inglés"
      backGamePath="/juegos/el-mensajero"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaMensajero key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
