import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// "Analyse the Sentence" mechanic on ENGLISH sentences: prepositions & conjunctions.
export default function InglesConnectorsExamen() {
  return (
    <FrasesExamenBase
      gameId="ingles-pos-connectors-test"
      filter={['preposicion', 'conjuncion']}
      levels={LEVELS_ESO}
      sentenceLang="en"
      subjectSchema="English"
      badge={{ es: 'Examen · Connectors', en: 'Exam · Connectors', ca: 'Examen · Connectors' }}
      title={{ es: '🧐 Prepositions & Conjunctions', en: '🧐 Prepositions & Conjunctions', ca: '🧐 Prepositions & Conjunctions' }}
      sub={{ es: 'En cada frase en inglés, marca las preposiciones y conjunciones', en: 'In each sentence, mark the prepositions and conjunctions', ca: 'A cada frase en anglès, marca les preposicions i conjuncions' }}
      metaTitle={{ es: 'Connectors — preposiciones y conjunciones en inglés', en: 'Connectors Exam — spot them in the sentence', ca: 'Connectors — preposicions i conjuncions en anglès' }}
      metaDesc={{ es: 'Practica los nexos en inglés con la mecánica del juego: aparece una frase en inglés y señalas las preposiciones y conjunciones. 10 preguntas, sin tiempo.', en: 'Practise English connectors with the game mechanic: an English sentence appears and you point out prepositions and conjunctions. 10 questions, no timer.', ca: 'Practica els nexes en anglès amb la mecànica del joc: apareix una frase en anglès i assenyales les preposicions i conjuncions. 10 preguntes, sense temps.' }}
      metaPath="/examen/ingles-pos-connectors-test"
    />
  )
}
