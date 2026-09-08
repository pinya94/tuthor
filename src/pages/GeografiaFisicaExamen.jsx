import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/geografiaFisica'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function GeografiaFisicaExamen() {
  return <ExamenMC titulo={{ es: 'Geografía Física', en: 'Physical Geography', ca: 'Geografia Física' }} emoji="⛰️" nivelInfo={nivelInfo} backFallback="/estudiar/geografia" gameId="geografia-fisica-test" />
}
