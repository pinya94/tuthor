import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaTrigo from '../components/anguloRecto/PreguntaTrigo'
import { genRound, esCorrecta, schemaQuestion } from '../lib/anguloRecto'

// Examen con la mecánica de Ángulo Recto: los mismos triángulos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Razones como fracción, qué razón usar y Pitágoras', en: 'Ratios as fractions, which ratio to use and Pythagoras', ca: 'Raons com a fracció, quina raó fer servir i Pitàgores' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Calcular lados y ángulos notables', en: 'Finding sides and special angles', ca: 'Calcular costats i angles notables' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Calcular ángulos y problemas', en: 'Finding angles and word problems', ca: 'Calcular angles i problemes' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaTrigo ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function AnguloRectoExamen() {
  return (
    <MechanicExam
      gameId="angulo-recto-test"
      emoji="📐"
      badge={{ es: 'Examen · Trigonometría', en: 'Exam · Trigonometry', ca: 'Examen · Trigonometria' }}
      title={{ es: 'Examen de trigonometría', en: 'Trigonometry Exam', ca: 'Examen de trigonometria' }}
      sub={{ es: 'Seno, coseno y tangente con el triángulo dibujado', en: 'Sine, cosine and tangent with the triangle drawn', ca: 'Sinus, cosinus i tangent amb el triangle dibuixat' }}
      metaTitle={{ es: 'Examen de trigonometría: seno, coseno y tangente', en: 'Trigonometry exam: sine, cosine and tangent', ca: 'Examen de trigonometria: sinus, cosinus i tangent' }}
      metaDesc={{ es: 'Examen de trigonometría con triángulos rectángulos dibujados: razones trigonométricas, Pitágoras, ángulos de 30°, 45° y 60°, calcular lados y ángulos y problemas resueltos. 10 preguntas, tres niveles.', en: 'Trigonometry exam with drawn right-angled triangles: trig ratios, Pythagoras, 30°, 45° and 60° angles, finding sides and angles and worked problems. 10 questions, three levels.', ca: 'Examen de trigonometria amb triangles rectangles dibuixats: raons trigonomètriques, Pitàgores, angles de 30°, 45° i 60°, calcular costats i angles i problemes resolts. 10 preguntes, tres nivells.' }}
      metaPath="/examen/angulo-recto-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/angulo-recto"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
