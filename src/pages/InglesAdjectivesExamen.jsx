import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// "Analyse the Sentence" mechanic on ENGLISH sentences: spot the adjectives.
export default function InglesAdjectivesExamen() {
  return (
    <FrasesExamenBase
      gameId="ingles-pos-adjectives-test"
      filter={['adjetivo']}
      levels={LEVELS_ALL}
      sentenceLang="en"
      subjectSchema="English"
      badge={{ es: 'Examen · Adjectives', en: 'Exam · Adjectives', ca: 'Examen · Adjectives' }}
      title={{ es: '🧐 Spot the Adjectives', en: '🧐 Spot the Adjectives', ca: '🧐 Spot the Adjectives' }}
      sub={{ es: 'En cada frase en inglés, marca solo los adjetivos (adjectives)', en: 'In each sentence, mark only the adjectives', ca: 'A cada frase en anglès, marca només els adjectius (adjectives)' }}
      metaTitle={{ es: 'Adjectives — señala los adjetivos en inglés', en: 'Adjectives Exam — spot them in the sentence', ca: 'Adjectives — assenyala els adjectius en anglès' }}
      metaDesc={{ es: 'Practica los adjetivos en inglés con la mecánica del juego: aparece una frase en inglés y señalas los adjectives. 10 preguntas, sin tiempo.', en: 'Practise English adjectives with the game mechanic: an English sentence appears and you point out the adjectives. 10 questions, no timer.', ca: 'Practica els adjectius en anglès amb la mecànica del joc: apareix una frase en anglès i assenyales els adjectives. 10 preguntes, sense temps.' }}
      metaPath="/examen/ingles-pos-adjectives-test"
    />
  )
}
