import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/disoluciones'

// Disoluciones (concentración, molaridad) es contenido de ESO: sin nivel Primaria.
const nivelInfo = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function DisolucionesExamen() {
  return <ExamenMC titulo={{ es: 'Disoluciones', en: 'Solutions', ca: 'Dissolucions' }} emoji="🧪" nivelInfo={nivelInfo} backFallback="/estudiar/quimica/disoluciones" gameId="disoluciones" />
}
