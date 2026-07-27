import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// Analiza la Frase enfocado SOLO en sustantivos: aparecen frases y señalas los
// sustantivos. Misma mecánica del juego, como examen del tema.
export default function FrasesSustantivosExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-sustantivos-test"
      filter={['sustantivo']}
      levels={LEVELS_ALL}
      badge={{ es: 'Examen · Sustantivos', en: 'Exam · Nouns', ca: 'Examen · Substantius' }}
      title={{ es: '🧐 Señala los Sustantivos', en: '🧐 Spot the Nouns', ca: '🧐 Assenyala els Substantius' }}
      sub={{ es: 'En cada frase, marca solo los sustantivos', en: 'In each sentence, mark only the nouns', ca: 'A cada frase, marca només els substantius' }}
      metaTitle={{ es: 'Examen de Sustantivos — señálalos en la frase', en: 'Nouns Exam — spot them in the sentence', ca: 'Examen de Substantius — assenyala\'ls a la frase' }}
      metaDesc={{ es: 'Practica los sustantivos con la mecánica del juego: aparece una frase y señalas solo los sustantivos. 10 preguntas, sin tiempo, con explicación. Primaria, ESO y Bachillerato.', en: 'Practise nouns with the game mechanic: a sentence appears and you point out only the nouns. 10 questions, no timer, with explanation.', ca: 'Practica els substantius amb la mecànica del joc: apareix una frase i assenyales només els substantius. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-sustantivos-test"
    />
  )
}
