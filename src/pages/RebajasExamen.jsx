import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaRebajas from '../components/rebajas/PreguntaRebajas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/rebajas'

// Examen con la mecánica de Rebajas: las mismas etiquetas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Descuentos redondos: cuánto pagas y cuánto ahorras', en: 'Round discounts: what you pay and save', ca: 'Descomptes rodons: quant pagues i quant estalvies' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Qué % es, el IVA y comparar ofertas', en: 'What % it is, VAT and comparing deals', ca: 'Quin % és, l’IVA i comparar ofertes' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Precio de antes, quitar el IVA y descuentos encadenados', en: 'Old price, removing VAT and chained discounts', ca: 'Preu d’abans, treure l’IVA i descomptes encadenats' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaRebajas ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function RebajasExamen() {
  return (
    <MechanicExam
      gameId="rebajas-test"
      emoji="🛍️"
      badge={{ es: 'Examen · Porcentajes', en: 'Exam · Percentages', ca: 'Examen · Percentatges' }}
      title={{ es: 'Examen de Rebajas', en: 'Sale! Exam', ca: 'Examen de Rebaixes' }}
      sub={{ es: 'Descuentos, IVA y ofertas: porcentajes de la vida real', en: 'Discounts, VAT and deals: real-life percentages', ca: 'Descomptes, IVA i ofertes: percentatges de la vida real' }}
      metaTitle={{ es: 'Examen de porcentajes: descuentos, IVA y rebajas', en: 'Percentages exam: discounts, VAT and sales', ca: 'Examen de percentatges: descomptes, IVA i rebaixes' }}
      metaDesc={{ es: 'Examen de porcentajes con etiquetas de tienda: precio con descuento, qué % es, el IVA, el precio de antes, rebajas encadenadas y ofertas 3×2. 10 preguntas, tres niveles.', en: 'Percentages exam with shop tags: discounted price, what % it is, VAT, the old price, chained sales and 3-for-2 deals. 10 questions, three levels.', ca: 'Examen de percentatges amb etiquetes de botiga: preu amb descompte, quin % és, l’IVA, el preu d’abans, rebaixes encadenades i ofertes 3×2. 10 preguntes, tres nivells.' }}
      metaPath="/examen/rebajas-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/rebajas"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
