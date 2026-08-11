import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/historiaEdadModerna'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function HistoriaEdadModernaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Edad Moderna', en: 'The Early Modern Period', ca: 'Edat Moderna' }}
      emoji="⛵"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/edad-moderna"
      gameId="edad-moderna"
    />
  )
}
