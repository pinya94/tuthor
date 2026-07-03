import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/ecosistemas'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function EcosistemasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Ecosistemas', en: 'Ecosystems', ca: 'Ecosistemes' }}
      emoji="🌍"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica"
      gameId="ecosistemas"
    />
  )
}
