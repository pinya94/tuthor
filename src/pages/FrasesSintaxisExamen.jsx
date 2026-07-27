import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// Sintaxis: solo sujeto, predicado y núcleo del sujeto.
export default function FrasesSintaxisExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-sintaxis-test"
      filter={['sujeto', 'predicado', 'nucleo-sujeto']}
      levels={LEVELS_ALL}
      badge={{ es: 'Examen · Sintaxis', en: 'Exam · Syntax', ca: 'Examen · Sintaxi' }}
      title={{ es: '🧐 Sujeto y Predicado', en: '🧐 Subject and Predicate', ca: '🧐 Subjecte i Predicat' }}
      sub={{ es: 'Señala el sujeto, el predicado y su núcleo', en: 'Pick out the subject, predicate and head', ca: 'Assenyala el subjecte, el predicat i el nucli' }}
      metaTitle={{ es: 'Examen de Sujeto y Predicado — Sintaxis', en: 'Subject and Predicate Exam — Syntax', ca: 'Examen de Subjecte i Predicat — Sintaxi' }}
      metaDesc={{ es: 'Examen de sintaxis: señala el sujeto, el predicado y el núcleo del sujeto en cada frase. 10 preguntas, sin tiempo, con explicación. Para Primaria, ESO y Bachillerato.', en: 'Syntax exam: point out the subject, predicate and head of the subject. 10 questions, no timer, with explanation.', ca: 'Examen de sintaxi: assenyala el subjecte, el predicat i el nucli del subjecte. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-sintaxis-test"
    />
  )
}
