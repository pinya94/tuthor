import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/disoluciones'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function DisolucionesExamen() {
  return <ExamenMC titulo={{ es: 'Disoluciones', en: 'Solutions', ca: 'Dissolucions' }} emoji="🧪" nivelInfo={nivelInfo} backFallback="/estudiar/quimica/disoluciones" gameId="disoluciones" />
}
