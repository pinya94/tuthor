import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaTrigo from '../components/anguloRecto/PreguntaTrigo'
import { genRound, esCorrecta, schemaQuestion } from '../lib/anguloRecto'

// Examen con la mecánica de Ángulo Recto: los mismos triángulos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Montar razones con los lados, nombrarlos y Pitágoras', en: 'Build ratios from the sides, name them, and Pythagoras', ca: 'Muntar raons amb els costats, anomenar-los i Pitàgores' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Teclear lados y completar la tabla de notables', en: 'Type sides and complete the special angles table', ca: 'Teclejar costats i completar la taula de notables' } },
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
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
