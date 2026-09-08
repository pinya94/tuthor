import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/musicaRitmo'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function MusicaRitmoExamen() {
  return <ExamenMC titulo={{ es: 'Ritmo', en: 'Rhythm', ca: 'Ritme' }} emoji="🥁" nivelInfo={nivelInfo} backFallback="/estudiar/musica" gameId="musica-ritmo-test" />
}
