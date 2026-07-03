import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolGramaticaSustantivos'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolGramaticaSustantivosExamen() {
  return <ExamenMC titulo={{ es: 'Sustantivos', en: 'Nouns', ca: 'Substantius' }} emoji="📚" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/gramatica" gameId="espanol-gramatica-sustantivos-test" />
}
