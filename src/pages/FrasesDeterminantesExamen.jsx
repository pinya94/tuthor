import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// Analiza la Frase enfocado en artículos y determinantes.
export default function FrasesDeterminantesExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-determinantes-test"
      filter={['articulo', 'determinante']}
      levels={LEVELS_ALL}
      badge={{ es: 'Examen · Determinantes', en: 'Exam · Determiners', ca: 'Examen · Determinants' }}
      title={{ es: '🧐 Artículos y Determinantes', en: '🧐 Articles and Determiners', ca: '🧐 Articles i Determinants' }}
      sub={{ es: 'En cada frase, marca los artículos y determinantes', en: 'In each sentence, mark the articles and determiners', ca: 'A cada frase, marca els articles i determinants' }}
      metaTitle={{ es: 'Examen de Artículos y Determinantes — señálalos en la frase', en: 'Articles & Determiners Exam — spot them in the sentence', ca: 'Examen d\'Articles i Determinants — assenyala\'ls a la frase' }}
      metaDesc={{ es: 'Practica los artículos y determinantes con la mecánica del juego: aparece una frase y los señalas. 10 preguntas, sin tiempo, con explicación. Primaria, ESO y Bachillerato.', en: 'Practise articles and determiners with the game mechanic: a sentence appears and you point them out. 10 questions, no timer, with explanation.', ca: 'Practica els articles i determinants amb la mecànica del joc: apareix una frase i els assenyales. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-determinantes-test"
    />
  )
}
