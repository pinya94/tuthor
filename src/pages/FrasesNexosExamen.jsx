import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// Analiza la Frase enfocado en nexos: preposiciones y conjunciones (desde ESO).
// Las conjunciones lucen en las oraciones compuestas.
export default function FrasesNexosExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-nexos-test"
      filter={['preposicion', 'conjuncion']}
      levels={LEVELS_ESO}
      badge={{ es: 'Examen · Nexos', en: 'Exam · Connectors', ca: 'Examen · Nexes' }}
      title={{ es: '🧐 Preposiciones y Conjunciones', en: '🧐 Prepositions and Conjunctions', ca: '🧐 Preposicions i Conjuncions' }}
      sub={{ es: 'En cada frase, marca las preposiciones y conjunciones', en: 'In each sentence, mark the prepositions and conjunctions', ca: 'A cada frase, marca les preposicions i conjuncions' }}
      metaTitle={{ es: 'Examen de Preposiciones y Conjunciones — señálalas en la frase', en: 'Prepositions & Conjunctions Exam — spot them in the sentence', ca: 'Examen de Preposicions i Conjuncions — assenyala\'ls a la frase' }}
      metaDesc={{ es: 'Practica los nexos con la mecánica del juego: aparece una frase y señalas las preposiciones y conjunciones (las oraciones compuestas tienen conjunciones). 10 preguntas, sin tiempo, con explicación. ESO y Bachillerato.', en: 'Practise connectors with the game mechanic: a sentence appears and you point out the prepositions and conjunctions. 10 questions, no timer, with explanation.', ca: 'Practica els nexes amb la mecànica del joc: apareix una frase i assenyales les preposicions i conjuncions. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-nexos-test"
    />
  )
}
