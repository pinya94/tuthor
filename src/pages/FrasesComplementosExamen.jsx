import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ESO } from '../data/frasesTasks'

// Complementos verbales: CD, CI y CC (desde ESO).
export default function FrasesComplementosExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-complementos-test"
      filter={['cd', 'ci', 'cc']}
      levels={LEVELS_ESO}
      badge={{ es: 'Examen · Complementos', en: 'Exam · Objects', ca: 'Examen · Complements' }}
      title={{ es: '🧐 Complementos (CD / CI / CC)', en: '🧐 Objects (DO / IO / Adverbials)', ca: '🧐 Complements (CD / CI / CC)' }}
      sub={{ es: 'Señala el complemento directo, indirecto o circunstancial', en: 'Pick out the direct, indirect or adverbial object', ca: 'Assenyala el complement directe, indirecte o circumstancial' }}
      metaTitle={{ es: 'Examen de Complementos CD, CI y CC — Sintaxis', en: 'Direct, Indirect & Adverbial Objects Exam', ca: 'Examen de Complements CD, CI i CC — Sintaxi' }}
      metaDesc={{ es: 'Examen de análisis sintáctico: señala el complemento directo (CD), indirecto (CI) y circunstancial (CC). 10 preguntas, sin tiempo, con explicación. ESO y Bachillerato.', en: 'Syntax exam: point out the direct object, indirect object and adverbials. 10 questions, no timer, with explanation.', ca: 'Examen d’anàlisi sintàctica: assenyala el CD, el CI i el CC. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/frases-complementos-test"
    />
  )
}
