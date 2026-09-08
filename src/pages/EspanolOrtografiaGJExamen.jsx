import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolOrtografiaGJ'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolOrtografiaGJExamen() {
  return <ExamenMC titulo={{ es: 'G y J', en: 'G and J', ca: 'G i J' }} emoji="🔡" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/ortografia" gameId="espanol-ortografia-gj-test" />
}
