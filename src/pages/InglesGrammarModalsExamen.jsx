import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/inglesGrammarModals'

const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: () => PREGUNTAS_ESO },
}

export default function InglesGrammarModalsExamen() {
  return <ExamenMC titulo={{ es: 'Modal Verbs', en: 'Modal Verbs', ca: 'Modal Verbs' }} emoji="🔑" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar" gameId="ingles-grammar-modals-test" />
}
