import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// Morfología: género (femenino/masculino) y número (singular/plural). Desde ESO.
// Nota: en inglés no hay género, así que en EN solo saldrían singular/plural.
export default function FrasesMorfologiaExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-morfologia-test"
      filter={['femenino', 'masculino', 'singular', 'plural']}
      levels={LEVELS_ESO}
      badge={{ es: 'Examen · Morfología', en: 'Exam · Morphology', ca: 'Examen · Morfologia' }}
      title={{ es: '🧐 Género y Número', en: '🧐 Gender and Number', ca: '🧐 Gènere i Nombre' }}
      sub={{ es: 'Señala las palabras en femenino, masculino, singular o plural', en: 'Pick out the feminine, masculine, singular or plural words', ca: 'Assenyala les paraules en femení, masculí, singular o plural' }}
      metaTitle={{ es: 'Examen de Género y Número — Morfología', en: 'Gender and Number Exam — Morphology', ca: 'Examen de Gènere i Nombre — Morfologia' }}
      metaDesc={{ es: 'Examen de morfología: señala las palabras en femenino, masculino, singular o plural. 10 preguntas, sin tiempo, con explicación. ESO y Bachillerato.', en: 'Morphology exam: point out feminine, masculine, singular or plural words. 10 questions, no timer, with explanation.', ca: 'Examen de morfologia: assenyala les paraules en femení, masculí, singular o plural. 10 preguntes, sense temps.' }}
      metaPath="/examen/frases-morfologia-test"
    />
  )
}
