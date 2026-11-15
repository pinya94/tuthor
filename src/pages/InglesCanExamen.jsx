import ExamenMC from '../components/ExamenMC'
import { BANCOS_BASICO } from '../data/inglesBasicoExamenes'

// Examen tipo test de un básico de inglés; los bancos de los cinco viven en
// inglesBasicoExamenes.js. El gameId va literal (el test de retos lo lee).
const banco = BANCOS_BASICO['can']
const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: banco.primaria },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: banco.eso },
}

export default function InglesCanExamen() {
  return <ExamenMC titulo={{ es: 'Can / Can’t', en: 'Can / Can’t', ca: 'Can / Can’t' }} emoji="💪" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar/can" gameId="ingles-grammar-can-test" />
}
