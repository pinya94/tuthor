import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// Analiza la Frase enfocado SOLO en pronombres (desde ESO).
export default function FrasesPronombresExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-pronombres-test"
      filter={['pronombre']}
      levels={LEVELS_ESO}
      badge={{ es: 'Examen · Pronombres', en: 'Exam · Pronouns', ca: 'Examen · Pronoms' }}
      title={{ es: '🧐 Señala los Pronombres', en: '🧐 Spot the Pronouns', ca: '🧐 Assenyala els Pronoms' }}
      sub={{ es: 'En cada frase, marca solo los pronombres', en: 'In each sentence, mark only the pronouns', ca: 'A cada frase, marca només els pronoms' }}
      metaTitle={{ es: 'Examen de Pronombres — señálalos en la frase', en: 'Pronouns Exam — spot them in the sentence', ca: 'Examen de Pronoms — assenyala\'ls a la frase' }}
      metaDesc={{ es: 'Practica los pronombres con la mecánica del juego: aparece una frase y señalas solo los pronombres. 10 preguntas, sin tiempo, con explicación. ESO y Bachillerato.', en: 'Practise pronouns with the game mechanic: a sentence appears and you point out only the pronouns. 10 questions, no timer, with explanation.', ca: 'Practica els pronoms amb la mecànica del joc: apareix una frase i assenyales només els pronoms. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-pronombres-test"
    />
  )
}
