import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolGramaticaSintaxis'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolGramaticaSintaxisExamen() {
  return <ExamenMC titulo={{ es: 'Sintaxis', en: 'Syntax', ca: 'Sintaxi' }} emoji="🔬" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/gramatica" gameId="espanol-gramatica-sintaxis-test" />
}
