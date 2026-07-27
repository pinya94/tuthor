import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// "Analyse the Sentence" mechanic on ENGLISH sentences: spot the adverbs.
export default function InglesAdverbsExamen() {
  return (
    <FrasesExamenBase
      gameId="ingles-pos-adverbs-test"
      filter={['adverbio']}
      levels={LEVELS_ESO}
      sentenceLang="en"
      subjectSchema="English"
      badge={{ es: 'Examen · Adverbs', en: 'Exam · Adverbs', ca: 'Examen · Adverbs' }}
      title={{ es: '🧐 Spot the Adverbs', en: '🧐 Spot the Adverbs', ca: '🧐 Spot the Adverbs' }}
      sub={{ es: 'En cada frase en inglés, marca solo los adverbios (adverbs)', en: 'In each sentence, mark only the adverbs', ca: 'A cada frase en anglès, marca només els adverbis (adverbs)' }}
      metaTitle={{ es: 'Adverbs — señala los adverbios en inglés', en: 'Adverbs Exam — spot them in the sentence', ca: 'Adverbs — assenyala els adverbis en anglès' }}
      metaDesc={{ es: 'Practica los adverbios en inglés con la mecánica del juego: aparece una frase en inglés y señalas los adverbs. 10 preguntas, sin tiempo.', en: 'Practise English adverbs with the game mechanic: an English sentence appears and you point out the adverbs. 10 questions, no timer.', ca: 'Practica els adverbis en anglès amb la mecànica del joc: apareix una frase en anglès i assenyales els adverbs. 10 preguntes, sense temps.' }}
      metaPath="/examen/ingles-pos-adverbs-test"
    />
  )
}
