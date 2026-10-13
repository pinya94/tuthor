import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaMensaje from '../components/ojoAlMensaje/PreguntaMensaje'
import { genRound, esCorrecta, schemaQuestion } from '../lib/ojoAlMensaje'

// Examen con la mecánica de Ojo al Mensaje: los mismos mensajes, sin reloj.
// Tocar trampas y veredicto viven dentro de PreguntaMensaje (montada con key
// por pregunta), que responde una sola vez «veredicto:faltan:fallos».
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Timos y peligros claros', en: 'Clear scams and dangers', ca: 'Estafes i perills clars' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'También mensajes de fiar', en: 'Safe messages too', ca: 'També missatges de fiar' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Trampas casi invisibles', en: 'Almost invisible traps', ca: 'Trampes gairebé invisibles' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaMensaje ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function OjoAlMensajeExamen() {
  return (
    <MechanicExam
      gameId="ojo-al-mensaje-test"
      emoji="🎣"
      badge={{ es: 'Examen · Internet seguro', en: 'Exam · Online safety', ca: 'Examen · Internet segur' }}
      title={{ es: 'Examen de mensajes trampa', en: 'Trap Messages Exam', ca: 'Examen de missatges trampa' }}
      sub={{ es: 'Encuentra las trampas y decide', en: 'Find the traps and decide', ca: 'Troba les trampes i decideix' }}
      metaTitle={{ es: 'Examen de internet seguro: timos, phishing y peligros', en: 'Online safety exam: scams, phishing and dangers', ca: 'Examen d’internet segur: estafes, pesca i perills' }}
      metaDesc={{ es: 'Examen de internet seguro con mensajes reales de ejemplo: encuentra el remitente raro, el enlace falso o el secreto, y decide si es de fiar, un timo o un peligro. 10 preguntas.', en: 'Online safety exam with sample messages: find the odd sender, the fake link or the secret, and decide if it’s safe, a scam or a danger. 10 questions.', ca: 'Examen d’internet segur amb missatges d’exemple: troba el remitent estrany, l’enllaç fals o el secret, i decideix si és de fiar, una estafa o un perill. 10 preguntes.' }}
      metaPath="/examen/ojo-al-mensaje-test"
      subjectSchema="Vida Práctica"
      backGamePath="/juegos/ojo-al-mensaje"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
