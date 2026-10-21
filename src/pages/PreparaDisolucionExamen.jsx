import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaDisolucion from '../components/disoluciones/PreguntaDisolucion'
import { genRound, esCorrecta, schemaQuestion } from '../lib/disoluciones'

// Examen con la mecánica de Prepara la Disolución: los mismos vasos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Soluto y disolvente, g/L y comparar vasos', en: 'Solute and solvent, g/L and comparing beakers', ca: 'Solut i dissolvent, g/L i comparar gots' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Gramos necesarios, % en masa y solubilidad', en: 'Grams needed, % by mass and solubility', ca: 'Grams necessaris, % en massa i solubilitat' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Diluir, molaridad y despejar el volumen', en: 'Dilution, molarity and solving for volume', ca: 'Diluir, molaritat i aïllar el volum' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaDisolucion ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function PreparaDisolucionExamen() {
  return (
    <MechanicExam
      gameId="prepara-disolucion-test"
      emoji="💧"
      badge={{ es: 'Examen · Disoluciones', en: 'Exam · Solutions', ca: 'Examen · Dissolucions' }}
      title={{ es: 'Examen de disoluciones', en: 'Solutions Exam', ca: 'Examen de dissolucions' }}
      sub={{ es: 'Concentración en g/L, % en masa, solubilidad, diluir y molaridad', en: 'Concentration in g/L, % by mass, solubility, dilution and molarity', ca: 'Concentració en g/L, % en massa, solubilitat, diluir i molaritat' }}
      metaTitle={{ es: 'Examen de disoluciones: concentración, g/L y % en masa', en: 'Solutions exam: concentration, g/L and % by mass', ca: 'Examen de dissolucions: concentració, g/L i % en massa' }}
      metaDesc={{ es: 'Examen de disoluciones con vasos dibujados: soluto y disolvente, concentración en g/L, porcentaje en masa, solubilidad, diluir y molaridad, con la cuenta explicada. 10 preguntas, tres niveles.', en: 'Solutions exam with drawn beakers: solute and solvent, concentration in g/L, percentage by mass, solubility, dilution and molarity, with the working explained. 10 questions, three levels.', ca: 'Examen de dissolucions amb gots dibuixats: solut i dissolvent, concentració en g/L, percentatge en massa, solubilitat, diluir i molaritat, amb el compte explicat. 10 preguntes, tres nivells.' }}
      metaPath="/examen/prepara-disolucion-test"
      subjectSchema="Química"
      backGamePath="/juegos/prepara-disolucion"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
