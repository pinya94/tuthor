import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/historiaPrehistoria'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function HistoriaPrehistoriaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Prehistoria', en: 'Prehistory', ca: 'Prehistòria' }}
      emoji="🦴"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/prehistoria"
      gameId="prehistoria"
    />
  )
}
