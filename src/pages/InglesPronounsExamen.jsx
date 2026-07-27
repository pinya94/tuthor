import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// "Analyse the Sentence" mechanic on ENGLISH sentences: spot the pronouns.
export default function InglesPronounsExamen() {
  return (
    <FrasesExamenBase
      gameId="ingles-pos-pronouns-test"
      filter={['pronombre']}
      levels={LEVELS_ESO}
      sentenceLang="en"
      subjectSchema="English"
      badge={{ es: 'Examen · Pronouns', en: 'Exam · Pronouns', ca: 'Examen · Pronouns' }}
      title={{ es: '🧐 Spot the Pronouns', en: '🧐 Spot the Pronouns', ca: '🧐 Spot the Pronouns' }}
      sub={{ es: 'En cada frase en inglés, marca solo los pronombres (pronouns)', en: 'In each sentence, mark only the pronouns', ca: 'A cada frase en anglès, marca només els pronoms (pronouns)' }}
      metaTitle={{ es: 'Pronouns — señala los pronombres en inglés', en: 'Pronouns Exam — spot them in the sentence', ca: 'Pronouns — assenyala els pronoms en anglès' }}
      metaDesc={{ es: 'Practica los pronombres en inglés con la mecánica del juego: aparece una frase en inglés y señalas los pronouns. 10 preguntas, sin tiempo.', en: 'Practise English pronouns with the game mechanic: an English sentence appears and you point out the pronouns. 10 questions, no timer.', ca: 'Practica els pronoms en anglès amb la mecànica del joc: apareix una frase en anglès i assenyales els pronouns. 10 preguntes, sense temps.' }}
      metaPath="/examen/ingles-pos-pronouns-test"
    />
  )
}
