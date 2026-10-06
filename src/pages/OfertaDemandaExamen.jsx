import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaMercado from '../components/ofertaDemanda/PreguntaMercado'
import { genRound, esCorrecta, schemaQuestion } from '../lib/ofertaDemanda'

// Examen con la mecánica de Oferta y demanda: las mismas noticias y ecuaciones, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Qué curva se desplaza y hacia dónde', en: 'Which curve shifts and which way', ca: 'Quina corba es desplaça i cap a on' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Desplazamientos, movimientos a lo largo y efecto sobre el precio', en: 'Shifts, movements along and effect on price', ca: 'Desplaçaments, moviments al llarg i efecte sobre el preu' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Equilibrio con ecuaciones, escasez y excedentes', en: 'Equilibrium with equations, shortages and surpluses', ca: 'Equilibri amb equacions, escassetat i excedents' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaMercado ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function OfertaDemandaExamen() {
  return (
    <MechanicExam
      gameId="oferta-demanda-test"
      emoji="🛒"
      badge={{ es: 'Examen · El mercado', en: 'Exam · The market', ca: 'Examen · El mercat' }}
      title={{ es: 'Examen de Oferta y demanda', en: 'Supply and Demand Exam', ca: 'Examen d’Oferta i demanda' }}
      sub={{ es: 'Desplazamientos de las curvas y equilibrio del mercado', en: 'Curve shifts and market equilibrium', ca: 'Desplaçaments de les corbes i equilibri del mercat' }}
      metaTitle={{ es: 'Examen de oferta y demanda: curvas, equilibrio y precio', en: 'Supply and demand exam: curves, equilibrium and price', ca: 'Examen d’oferta i demanda: corbes, equilibri i preu' }}
      metaDesc={{ es: 'Examen de oferta y demanda con noticias reales: qué curva se desplaza, qué pasa con el precio y la cantidad, y cálculo del equilibrio, la escasez y el excedente con ecuaciones. 10 preguntas, tres niveles.', en: 'Supply and demand exam with real-world news: which curve shifts, what happens to price and quantity, and working out equilibrium, shortage and surplus with equations. 10 questions, three levels.', ca: 'Examen d’oferta i demanda amb notícies reals: quina corba es desplaça, què passa amb el preu i la quantitat, i càlcul de l’equilibri, l’escassetat i l’excedent amb equacions. 10 preguntes, tres nivells.' }}
      metaPath="/examen/oferta-demanda-test"
      subjectSchema="Economía"
      backGamePath="/juegos/oferta-demanda"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
