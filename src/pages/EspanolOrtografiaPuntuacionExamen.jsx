import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolOrtografiaPuntuacion'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolOrtografiaPuntuacionExamen() {
  return <ExamenMC titulo={{ es: 'Puntuación', en: 'Punctuation', ca: 'Puntuació' }} emoji="❓" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/ortografia" gameId="espanol-ortografia-puntuacion-test" />
}
