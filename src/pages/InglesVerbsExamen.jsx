import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// "Analyse the Sentence" mechanic on ENGLISH sentences: spot the verbs.
export default function InglesVerbsExamen() {
  return (
    <FrasesExamenBase
      gameId="ingles-pos-verbs-test"
      filter={['verbo']}
      levels={LEVELS_ALL}
      sentenceLang="en"
      subjectSchema="English"
      badge={{ es: 'Examen · Verbs', en: 'Exam · Verbs', ca: 'Examen · Verbs' }}
      title={{ es: '🧐 Spot the Verbs', en: '🧐 Spot the Verbs', ca: '🧐 Spot the Verbs' }}
      sub={{ es: 'En cada frase en inglés, marca todos los verbos (verbs)', en: 'In each sentence, mark all the verbs', ca: 'A cada frase en anglès, marca tots els verbs' }}
      metaTitle={{ es: 'Verbs — señala los verbos en inglés', en: 'Verbs Exam — spot them in the sentence', ca: 'Verbs — assenyala els verbs en anglès' }}
      metaDesc={{ es: 'Practica los verbos en inglés con la mecánica del juego: aparece una frase en inglés y señalas los verbs (las compuestas tienen varios). 10 preguntas, sin tiempo.', en: 'Practise English verbs with the game mechanic: an English sentence appears and you point out the verbs. 10 questions, no timer.', ca: 'Practica els verbs en anglès amb la mecànica del joc: apareix una frase en anglès i assenyales els verbs. 10 preguntes, sense temps.' }}
      metaPath="/examen/ingles-pos-verbs-test"
    />
  )
}
