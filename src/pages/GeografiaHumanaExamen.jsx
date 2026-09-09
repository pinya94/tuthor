import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/geografiaHumana'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function GeografiaHumanaExamen() {
  return <ExamenMC titulo={{ es: 'Geografía Humana', en: 'Human Geography', ca: 'Geografia Humana' }} emoji="👥" nivelInfo={nivelInfo} backFallback="/estudiar/geografia" gameId="geografia-humana-test" />
}
