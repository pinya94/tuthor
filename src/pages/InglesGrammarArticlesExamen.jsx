import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/inglesGrammarArticles'

const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: () => PREGUNTAS_ESO },
}

export default function InglesGrammarArticlesExamen() {
  return <ExamenMC titulo={{ es: 'Articles', en: 'Articles', ca: 'Articles' }} emoji="📖" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar" gameId="ingles-grammar-articles-test" />
}
