import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/formulacionQuimica'

// Formulación química (valencias, nomenclatura) es contenido de ESO: sin Primaria.
const nivelInfo = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function FormulacionQuimicaExamen() {
  return <ExamenMC titulo={{ es: 'Formulación Química', en: 'Chemical Formulas', ca: 'Formulació Química' }} emoji="🔤" nivelInfo={nivelInfo} backFallback="/estudiar/quimica/formulacion" gameId="formulacion" />
}
