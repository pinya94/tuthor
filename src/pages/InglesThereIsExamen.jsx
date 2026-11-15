import ExamenMC from '../components/ExamenMC'
import { BANCOS_BASICO } from '../data/inglesBasicoExamenes'

// Examen tipo test de un básico de inglés; los bancos de los cinco viven en
// inglesBasicoExamenes.js. El gameId va literal (el test de retos lo lee).
const banco = BANCOS_BASICO['there-is-there-are']
const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: banco.primaria },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: banco.eso },
}

export default function InglesThereIsExamen() {
  return <ExamenMC titulo={{ es: 'There is / There are', en: 'There is / There are', ca: 'There is / There are' }} emoji="📍" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar/there-is-there-are" gameId="ingles-grammar-there-is-there-are-test" />
}
