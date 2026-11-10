import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaFabrica from '../components/fabricaPalabras/PreguntaFabrica'
import { genRound, esCorrecta, schemaQuestion } from '../lib/fabricaPalabras'

// Examen con la mecánica de La Fábrica de Palabras: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'eso', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Sufijos de oficios y tiendas, sinónimos y antónimos', en: 'Job and shop suffixes, synonyms and antonyms', ca: 'Sufixos d’oficis i botigues, sinònims i antònims' } },
  { key: 'eso4', emoji: '💛', difficulty: 'medio',
    label: { es: '5.º-6.º y 1.º ESO', en: 'Years 6-8', ca: '5è-6è i 1r ESO' },
    hint: { es: 'Prefijos, negación y más sufijos', en: 'Prefixes, negation and more suffixes', ca: 'Prefixos, negació i més sufixos' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'ESO', en: 'Secondary', ca: 'ESO' },
    hint: { es: 'Im- o i-, sufijos de cualidad y sinónimos cultos', en: 'Im- or i-, quality suffixes and formal synonyms', ca: 'Im- o i-, sufixos de qualitat i sinònims cultes' } },
]

// Estado propio (lo que ha construido): ver la nota de hooks en CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaFabrica ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function FabricaPalabrasExamen() {
  return (
    <MechanicExam
      gameId="fabrica-palabras-test"
      emoji="🏭"
      badge={{ es: 'Examen · Vocabulario', en: 'Exam · Vocabulary', ca: 'Examen · Vocabulari' }}
      title={{ es: 'Examen de prefijos, sufijos, sinónimos y antónimos', en: 'Prefixes, Suffixes, Synonyms and Antonyms Exam', ca: 'Examen de prefixos, sufixos, sinònims i antònims' }}
      sub={{ es: 'Monta palabras y une parejas', en: 'Build words and match pairs', ca: 'Munta paraules i uneix parelles' }}
      metaTitle={{ es: 'Ejercicios de prefijos y sufijos, sinónimos y antónimos con solución', en: 'Spanish prefixes, suffixes, synonyms and antonyms: practice with answers', ca: 'Exercicis de prefixos i sufixos, sinònims i antònims en castellà amb solució' }}
      metaDesc={{ es: 'Ejercicios interactivos de vocabulario: forma palabras con prefijos y sufijos (zapatero, imposible, rehacer) y une sinónimos y antónimos. 10 preguntas en tres niveles, con solución.', en: 'Interactive Spanish vocabulary practice: build words with prefixes and suffixes and match synonyms and antonyms. 10 questions on three levels, with answers.', ca: 'Exercicis interactius de vocabulari en castellà: forma paraules amb prefixos i sufixos i uneix sinònims i antònims. 10 preguntes en tres nivells, amb solució.' }}
      metaPath="/examen/fabrica-palabras-test"
      subjectSchema="Lengua"
      backGamePath="/juegos/fabrica-palabras"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
