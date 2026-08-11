import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/historiaAntigua'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function HistoriaAntiguaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Edad Antigua', en: 'Antiquity', ca: 'Edat Antiga' }}
      emoji="🏛️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/antigua"
      gameId="antigua"
    />
  )
}
