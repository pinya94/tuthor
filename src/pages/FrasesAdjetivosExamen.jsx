import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// Analiza la Frase enfocado SOLO en adjetivos.
export default function FrasesAdjetivosExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-adjetivos-test"
      filter={['adjetivo']}
      levels={LEVELS_ALL}
      badge={{ es: 'Examen · Adjetivos', en: 'Exam · Adjectives', ca: 'Examen · Adjectius' }}
      title={{ es: '🧐 Señala los Adjetivos', en: '🧐 Spot the Adjectives', ca: '🧐 Assenyala els Adjectius' }}
      sub={{ es: 'En cada frase, marca solo los adjetivos', en: 'In each sentence, mark only the adjectives', ca: 'A cada frase, marca només els adjectius' }}
      metaTitle={{ es: 'Examen de Adjetivos — señálalos en la frase', en: 'Adjectives Exam — spot them in the sentence', ca: 'Examen d\'Adjectius — assenyala\'ls a la frase' }}
      metaDesc={{ es: 'Practica los adjetivos con la mecánica del juego: aparece una frase y señalas solo los adjetivos. 10 preguntas, sin tiempo, con explicación. Primaria, ESO y Bachillerato.', en: 'Practise adjectives with the game mechanic: a sentence appears and you point out only the adjectives. 10 questions, no timer, with explanation.', ca: 'Practica els adjectius amb la mecànica del joc: apareix una frase i assenyales només els adjectius. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-adjetivos-test"
    />
  )
}
