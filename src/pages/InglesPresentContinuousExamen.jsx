import ExamenMC from '../components/ExamenMC'
import { BANCOS_BASICO } from '../data/inglesBasicoExamenes'

// Examen tipo test de un básico de inglés; los bancos de los cinco viven en
// inglesBasicoExamenes.js. El gameId va literal (el test de retos lo lee).
const banco = BANCOS_BASICO['present-continuous']
const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: banco.primaria },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: banco.eso },
}

export default function InglesPresentContinuousExamen() {
  return <ExamenMC titulo={{ es: 'Present Continuous', en: 'Present Continuous', ca: 'Present Continuous' }} emoji="⏳" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/ingles/grammar/present-continuous" gameId="ingles-grammar-present-continuous-test" />
}
