import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// Examen general: cualquier tarea (clases, sintaxis, morfología).
export default function AnalizaFrasesExamen() {
  return (
    <FrasesExamenBase
      gameId="analiza-frases-test"
      filter={null}
      levels={LEVELS_ALL}
      badge={{ es: 'Examen · Lengua', en: 'Exam · Language', ca: 'Examen · Llengua' }}
      title={{ es: '🧐 Examen Analiza la Frase', en: '🧐 Sentence Detective Exam', ca: '🧐 Examen Analitza la Frase' }}
      sub={{ es: 'Señala lo que se te pide en cada frase', en: 'Pick out what you’re asked for', ca: 'Assenyala el que et demanen a cada frase' }}
      metaTitle={{ es: 'Examen de Análisis de la Frase — Lengua', en: 'Sentence Analysis Exam — Language', ca: 'Examen d’Anàlisi de la Frase — Llengua' }}
      metaDesc={{ es: 'Examen de análisis gramatical y sintáctico: señala el sujeto, predicado, complementos, clases de palabras o género. 10 preguntas, sin tiempo, con explicación.', en: 'Grammar and syntax exam: point out the subject, predicate, objects, word classes or gender. 10 questions, no timer, with explanation.', ca: 'Examen d’anàlisi gramatical i sintàctica: assenyala el subjecte, predicat, complements, classes de paraules o gènere. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/analiza-frases-test"
    />
  )
}
