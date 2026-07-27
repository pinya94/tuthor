import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolGramaticaDeterminantes'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolGramaticaDeterminantesExamen() {
  return <ExamenMC titulo={{ es: 'Determinantes', en: 'Determiners', ca: 'Determinants' }} emoji="🔖" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/gramatica" gameId="espanol-gramatica-determinantes-test" />
}
