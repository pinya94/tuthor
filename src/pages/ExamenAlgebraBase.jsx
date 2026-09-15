import { useCallback, useRef } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaExacta from '../components/PreguntaExacta'
import { genRound, comprobar, schemaPregunta } from '../lib/examenesAlgebra'

// Base de los tres exámenes de álgebra generados (segundo grado, sistemas y
// rectas). Usan MechanicExam como el resto de exámenes con mecánica: diez
// preguntas, sin reloj, nota final. En vez de volver a un juego, el enlace de
// vuelta lleva al recurso que resuelve ese mismo tipo de ejercicio paso a paso.

// Cuántas preguntas recuerda para no repetir. MechanicExam genera las diez de
// golpe, y en el nivel fácil el espacio de ecuaciones es pequeño: sin memoria,
// dos iguales en un mismo examen serían habituales. Vive por montaje, no en el
// módulo, para no arrastrarse de un examen al siguiente.
const MEMORIA = 30

const RESOLVER = { es: 'Resolver mis ejercicios', en: 'Solve my exercises', ca: 'Resoldre els meus exercicis' }
const VOLVER = { es: '← Resolverlo paso a paso', en: '← Solve it step by step', ca: '← Resoldre-ho pas a pas' }

export default function ExamenAlgebraBase({ examen, emoji, badge, title, sub, metaTitle, metaDesc, levels, recurso }) {
  const vistos = useRef([])
  const generar = useCallback(nivel => {
    let ronda = genRound(examen, nivel)
    for (let i = 0; i < 25 && vistos.current.includes(ronda.clave); i++) ronda = genRound(examen, nivel)
    vistos.current = [ronda.clave, ...vistos.current].slice(0, MEMORIA)
    return ronda
  }, [examen])

  return (
    <MechanicExam
      gameId={examen}
      emoji={emoji}
      badge={badge}
      title={title}
      sub={sub}
      metaTitle={metaTitle}
      metaDesc={metaDesc}
      metaPath={`/examen/${examen}`}
      subjectSchema="Matemáticas"
      backGamePath={recurso}
      backLabel={VOLVER}
      playLabel={RESOLVER}
      levels={levels}
      genRound={generar}
      isCorrect={(ronda, respuesta) => comprobar(ronda, respuesta)}
      schemaQuestion={schemaPregunta}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <PreguntaExacta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
