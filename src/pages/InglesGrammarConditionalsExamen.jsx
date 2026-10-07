import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/inglesGrammarConditionals'

const nivelInfo = {
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Sixth Form', en: 'Sixth Form', ca: 'Sixth Form' }, pool: () => PREGUNTAS_BACH },
}

export default function InglesGrammarConditionalsExamen() {
  return <ExamenMC titulo={{ es: 'Conditionals & Wishes', en: 'Conditionals & Wishes', ca: 'Conditionals & Wishes' }} emoji="🔀" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar" gameId="ingles-grammar-conditionals-test" />
}
