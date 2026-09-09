import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/formulacionQuimica'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function FormulacionQuimicaExamen() {
  return <ExamenMC titulo={{ es: 'Formulación Química', en: 'Chemical Formulas', ca: 'Formulació Química' }} emoji="🔤" nivelInfo={nivelInfo} backFallback="/estudiar/quimica/formulacion" gameId="formulacion" />
}
