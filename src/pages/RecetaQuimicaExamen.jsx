import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaReceta from '../components/recetaQuimica/PreguntaReceta'
import { genRound, esCorrecta, schemaQuestion } from '../lib/recetaQuimica'

// Examen con la mecánica de La Receta Química: las mismas ecuaciones, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Masa molar, moles y proporciones', en: 'Molar mass, moles and ratios', ca: 'Massa molar, mols i proporcions' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Coeficientes, Avogadro y gramos', en: 'Coefficients, Avogadro and grams', ca: 'Coeficients, Avogadro i grams' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'De gramos a gramos y reactivo limitante', en: 'Grams to grams and limiting reactant', ca: 'De grams a grams i reactiu limitant' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaReceta ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function RecetaQuimicaExamen() {
  return (
    <MechanicExam
      gameId="receta-quimica-test"
      emoji="🥣"
      badge={{ es: 'Examen · Estequiometría', en: 'Exam · Stoichiometry', ca: 'Examen · Estequiometria' }}
      title={{ es: 'Examen de estequiometría', en: 'Stoichiometry Exam', ca: 'Examen d’estequiometria' }}
      sub={{ es: 'Moles, masa molar, proporciones y reactivo limitante', en: 'Moles, molar mass, ratios and limiting reactant', ca: 'Mols, massa molar, proporcions i reactiu limitant' }}
      metaTitle={{ es: 'Examen de estequiometría: moles, masa molar y reactivo limitante', en: 'Stoichiometry exam: moles, molar mass and limiting reactant', ca: 'Examen d’estequiometria: mols, massa molar i reactiu limitant' }}
      metaDesc={{ es: 'Examen de estequiometría con la ecuación dibujada: masa molar, gramos a moles, proporciones con los coeficientes, gramos a gramos, número de Avogadro y reactivo limitante. 10 preguntas, tres niveles.', en: 'Stoichiometry exam with the equation drawn: molar mass, grams to moles, ratios from coefficients, grams to grams, Avogadro’s number and limiting reactant. 10 questions, three levels.', ca: 'Examen d’estequiometria amb l’equació dibuixada: massa molar, grams a mols, proporcions amb els coeficients, grams a grams, nombre d’Avogadro i reactiu limitant. 10 preguntes, tres nivells.' }}
      metaPath="/examen/receta-quimica-test"
      subjectSchema="Química"
      backGamePath="/juegos/receta-quimica"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
