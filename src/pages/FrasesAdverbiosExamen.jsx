import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// Analiza la Frase enfocado SOLO en adverbios (desde ESO).
export default function FrasesAdverbiosExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-adverbios-test"
      filter={['adverbio']}
      levels={LEVELS_ESO}
      badge={{ es: 'Examen · Adverbios', en: 'Exam · Adverbs', ca: 'Examen · Adverbis' }}
      title={{ es: '🧐 Señala los Adverbios', en: '🧐 Spot the Adverbs', ca: '🧐 Assenyala els Adverbis' }}
      sub={{ es: 'En cada frase, marca solo los adverbios', en: 'In each sentence, mark only the adverbs', ca: 'A cada frase, marca només els adverbis' }}
      metaTitle={{ es: 'Examen de Adverbios — señálalos en la frase', en: 'Adverbs Exam — spot them in the sentence', ca: 'Examen d\'Adverbis — assenyala\'ls a la frase' }}
      metaDesc={{ es: 'Practica los adverbios con la mecánica del juego: aparece una frase y señalas solo los adverbios. 10 preguntas, sin tiempo, con explicación. ESO y Bachillerato.', en: 'Practise adverbs with the game mechanic: a sentence appears and you point out only the adverbs. 10 questions, no timer, with explanation.', ca: 'Practica els adverbis amb la mecànica del joc: apareix una frase i assenyales només els adverbis. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-adverbios-test"
    />
  )
}
