import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolOrtografiaBV'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolOrtografiaBVExamen() {
  return <ExamenMC titulo={{ es: 'B y V', en: 'B and V', ca: 'B i V' }} emoji="🔤" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/ortografia" gameId="espanol-ortografia-bv-test" />
}
