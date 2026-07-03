import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolGramaticaVerbos'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolGramaticaVerbosExamen() {
  return <ExamenMC titulo={{ es: 'Verbos', en: 'Verbs', ca: 'Verbs' }} emoji="🏃" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/gramatica" gameId="espanol-gramatica-verbos-test" />
}
