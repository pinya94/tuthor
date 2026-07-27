import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolGramaticaAdjetivos'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolGramaticaAdjetivosExamen() {
  return <ExamenMC titulo={{ es: 'Adjetivos', en: 'Adjectives', ca: 'Adjectius' }} emoji="🎨" nivelInfo={nivelInfo} backFallback="/estudiar/idiomas/espanol/gramatica" gameId="espanol-gramatica-adjetivos-test" />
}
