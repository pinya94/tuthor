import FrasesExamenBase from './FrasesExamenBase'
import { LEVELS_ALL } from '../data/frasesTasks'

// Clases de palabras: sustantivos, adjetivos, verbos, artículos, pronombres…
export default function FrasesClasesExamen() {
  return (
    <FrasesExamenBase
      gameId="frases-clases-test"
      filter={['sustantivo', 'adjetivo', 'verbo', 'articulo', 'pronombre', 'adverbio', 'preposicion', 'conjuncion', 'determinante']}
      levels={LEVELS_ALL}
      badge={{ es: 'Examen · Clases de palabras', en: 'Exam · Word classes', ca: 'Examen · Classes de paraules' }}
      title={{ es: '🧐 Clases de Palabras', en: '🧐 Word Classes', ca: '🧐 Classes de Paraules' }}
      sub={{ es: 'Señala los sustantivos, adjetivos, verbos…', en: 'Pick out the nouns, adjectives, verbs…', ca: 'Assenyala els substantius, adjectius, verbs…' }}
      metaTitle={{ es: 'Examen de Clases de Palabras — Gramática', en: 'Word Classes Exam — Grammar', ca: 'Examen de Classes de Paraules — Gramàtica' }}
      metaDesc={{ es: 'Examen de gramática: señala los sustantivos, adjetivos, verbos, artículos, pronombres, adverbios y preposiciones. 10 preguntas, sin tiempo, con explicación.', en: 'Grammar exam: point out nouns, adjectives, verbs, articles, pronouns, adverbs and prepositions. 10 questions, no timer.', ca: 'Examen de gramàtica: assenyala els substantius, adjectius, verbs, articles, pronoms, adverbis i preposicions. 10 preguntes, sense temps.' }}
      metaPath="/examen/frases-clases-test"
    />
  )
}
