import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaVerso from '../components/mideVerso/PreguntaVerso'
import { genRound, esCorrecta } from '../lib/mideVerso'

// Examen con la mecánica de Mide el verso: los mismos poemas, sin reloj.
// Sin schemaQuestion: sin el poema delante no hay pregunta.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Octosílabos, acento final y rima', en: 'Eight-syllable lines, final stress and rhyme', ca: 'Octosíl·labs, accent final i rima' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Versos de 7 a 11 sílabas y su nombre', en: 'Lines of 7 to 11 syllables and their names', ca: 'Versos de 7 a 11 síl·labes i el seu nom' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Alejandrinos y estrofas', en: 'Alexandrines and stanzas', ca: 'Alexandrins i estrofes' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaVerso ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function MideElVersoExamen() {
  return (
    <MechanicExam
      gameId="mide-el-verso-test"
      emoji="✒️"
      badge={{ es: 'Examen · Métrica', en: 'Exam · Metre', ca: 'Examen · Mètrica' }}
      title={{ es: 'Examen de métrica', en: 'Spanish Metre Exam', ca: 'Examen de mètrica' }}
      sub={{ es: 'Sílabas, rima y estrofas en versos clásicos', en: 'Syllables, rhyme and stanzas in classic verse', ca: 'Síl·labes, rima i estrofes en versos clàssics' }}
      metaTitle={{ es: 'Examen de métrica: sílabas, sinalefa, rima y estrofas', en: 'Spanish metre exam: syllables, synalepha, rhyme and stanzas', ca: 'Examen de mètrica: síl·labes, sinalefa, rima i estrofes' }}
      metaDesc={{ es: 'Examen de métrica con versos de Garcilaso, Quevedo, Bécquer, Machado y Lorca: cuenta sílabas con sinalefa y acento final, clasifica la rima y reconoce redondillas, cuartetos y romances.', en: 'Spanish metre exam with lines by Garcilaso, Quevedo, Bécquer, Machado and Lorca: count syllables, classify rhyme and recognise stanzas.', ca: 'Examen de mètrica amb versos de Garcilaso, Quevedo, Bécquer, Machado i Lorca: compta síl·labes amb sinalefa i accent final, classifica la rima i reconeix estrofes.' }}
      metaPath="/examen/mide-el-verso-test"
      subjectSchema="Lengua Castellana y Literatura"
      backGamePath="/juegos/mide-el-verso"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
