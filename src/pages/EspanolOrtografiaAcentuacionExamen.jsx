import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolOrtografiaAcentuacion'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolOrtografiaAcentuacionExamen() {
  return <ExamenMC titulo={{ es: 'Acentuación', en: 'Accentuation', ca: 'Accentuació' }} emoji="´" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/ortografia" gameId="espanol-ortografia-acentuacion-test" />
}
