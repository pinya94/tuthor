import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaArbol from '../components/arbolVida/PreguntaArbol'
import { genRound, esCorrecta, schemaQuestion } from '../lib/arbolVida'

// Examen con la mecánica de Árbol de la Vida: los mismos árboles, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Darwin, pruebas y qué apareció antes', en: 'Darwin, evidence and what came first', ca: 'Darwin, proves i què va aparèixer abans' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Árboles evolutivos y tipos de órganos', en: 'Evolutionary trees and kinds of organs', ca: 'Arbres evolutius i tipus d’òrgans' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Parentescos con trampa e historia de la vida', en: 'Tricky relationships and the history of life', ca: 'Parentius amb parany i història de la vida' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaArbol ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function ArbolVidaExamen() {
  return (
    <MechanicExam
      gameId="arbol-vida-test"
      emoji="🦒"
      badge={{ es: 'Examen · Evolución', en: 'Exam · Evolution', ca: 'Examen · Evolució' }}
      title={{ es: 'Examen de evolución', en: 'Evolution Exam', ca: 'Examen d’evolució' }}
      sub={{ es: 'Árboles evolutivos, Darwin, órganos y pruebas', en: 'Evolutionary trees, Darwin, organs and evidence', ca: 'Arbres evolutius, Darwin, òrgans i proves' }}
      metaTitle={{ es: 'Examen de evolución: Darwin, Lamarck y árboles evolutivos', en: 'Evolution exam: Darwin, Lamarck and evolutionary trees', ca: 'Examen d’evolució: Darwin, Lamarck i arbres evolutius' }}
      metaDesc={{ es: 'Examen de evolución con árboles dibujados: parentescos entre especies, selección natural frente a Lamarck, órganos homólogos, análogos y vestigiales, pruebas de la evolución e historia de la vida. 10 preguntas, tres niveles.', en: 'Evolution exam with drawn trees: relationships between species, natural selection versus Lamarck, homologous, analogous and vestigial organs, evidence for evolution and the history of life. 10 questions, three levels.', ca: 'Examen d’evolució amb arbres dibuixats: parentius entre espècies, selecció natural davant Lamarck, òrgans homòlegs, anàlegs i vestigials, proves de l’evolució i història de la vida. 10 preguntes, tres nivells.' }}
      metaPath="/examen/arbol-vida-test"
      subjectSchema="Biología"
      backGamePath="/juegos/arbol-vida"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
