import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolLiteratura'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolLiteraturaExamen() {
  return <ExamenMC titulo={{ es: 'Literatura', en: 'Literature', ca: 'Literatura' }} emoji="🖋️" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol" gameId="espanol-literatura-test" />
}
