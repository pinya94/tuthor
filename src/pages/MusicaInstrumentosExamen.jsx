import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/musicaInstrumentos'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function MusicaInstrumentosExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Los Instrumentos', en: 'Musical Instruments', ca: 'Els Instruments' }}
      emoji="🎻"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/musica"
      gameId="musica-instrumentos-test"
    />
  )
}
