import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolOrtografiaLetras'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolOrtografiaLetrasExamen() {
  return <ExamenMC titulo={{ es: 'H, LL/Y y C/Z', en: 'H, LL/Y and C/Z', ca: 'H, LL/Y i C/Z' }} emoji="✍️" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/ortografia" gameId="espanol-ortografia-letras-test" />
}
