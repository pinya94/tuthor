import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/historiaEdadMedia'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function HistoriaEdadMediaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Edad Media', en: 'The Middle Ages', ca: 'Edat Mitjana' }}
      emoji="🏰"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/edad-media"
      gameId="edad-media"
    />
  )
}
