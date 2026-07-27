import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// Analiza la Frase enfocado SOLO en verbos: aparecen frases (incluidas
// compuestas, con varios verbos) y señalas todos los verbos.
export default function FrasesVerbosExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-verbos-test"
      filter={['verbo']}
      levels={LEVELS_ALL}
      badge={{ es: 'Examen · Verbos', en: 'Exam · Verbs', ca: 'Examen · Verbs' }}
      title={{ es: '🧐 Señala los Verbos', en: '🧐 Spot the Verbs', ca: '🧐 Assenyala els Verbs' }}
      sub={{ es: 'En cada frase, marca todos los verbos', en: 'In each sentence, mark all the verbs', ca: 'A cada frase, marca tots els verbs' }}
      metaTitle={{ es: 'Examen de Verbos — señálalos en la frase', en: 'Verbs Exam — spot them in the sentence', ca: 'Examen de Verbs — assenyala\'ls a la frase' }}
      metaDesc={{ es: 'Practica los verbos con la mecánica del juego: aparece una frase y señalas todos los verbos (las oraciones compuestas tienen varios). 10 preguntas, sin tiempo, con explicación. Primaria, ESO y Bachillerato.', en: 'Practise verbs with the game mechanic: a sentence appears and you point out all the verbs (compound sentences have several). 10 questions, no timer, with explanation.', ca: 'Practica els verbs amb la mecànica del joc: apareix una frase i assenyales tots els verbs (les oracions compostes en tenen diversos). 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-verbos-test"
    />
  )
}
