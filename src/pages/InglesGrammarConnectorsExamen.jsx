import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/inglesGrammarConnectors'

const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: () => PREGUNTAS_ESO },
}

const otroExamen = {
  path: '/examen/ingles-pos-connectors-test', emoji: '🧐',
  label: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' },
  desc: { es: 'Con la mecánica del juego, sobre frases en inglés', en: 'Using the game mechanic, on English sentences', ca: 'Amb la mecànica del joc, sobre frases en anglès' },
}

export default function InglesGrammarConnectorsExamen() {
  return <ExamenMC titulo={{ es: 'Prepositions & Conjunctions', en: 'Prepositions & Conjunctions', ca: 'Prepositions & Conjunctions' }} emoji="🔗" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar" gameId="ingles-grammar-connectors-test" otroExamen={otroExamen} />
}
