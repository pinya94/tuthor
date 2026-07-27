import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// "Analyse the Sentence" mechanic on ENGLISH sentences: spot the nouns.
export default function InglesNounsExamen() {
  return (
    <FrasesExamenBase
      gameId="ingles-pos-nouns-test"
      filter={['sustantivo']}
      levels={LEVELS_ALL}
      sentenceLang="en"
      subjectSchema="English"
      badge={{ es: 'Examen · Nouns', en: 'Exam · Nouns', ca: 'Examen · Nouns' }}
      title={{ es: '🧐 Spot the Nouns', en: '🧐 Spot the Nouns', ca: '🧐 Spot the Nouns' }}
      sub={{ es: 'En cada frase en inglés, marca solo los sustantivos (nouns)', en: 'In each sentence, mark only the nouns', ca: 'A cada frase en anglès, marca només els substantius (nouns)' }}
      metaTitle={{ es: 'Nouns — señala los sustantivos en inglés', en: 'Nouns Exam — spot them in the sentence', ca: 'Nouns — assenyala els substantius en anglès' }}
      metaDesc={{ es: 'Practica los sustantivos en inglés con la mecánica del juego: aparece una frase en inglés y señalas los nouns. 10 preguntas, sin tiempo.', en: 'Practise English nouns with the game mechanic: an English sentence appears and you point out the nouns. 10 questions, no timer.', ca: 'Practica els substantius en anglès amb la mecànica del joc: apareix una frase en anglès i assenyales els nouns. 10 preguntes, sense temps.' }}
      metaPath="/examen/ingles-pos-nouns-test"
    />
  )
}
