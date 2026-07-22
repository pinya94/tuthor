import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/seresVivos'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function SeresVivosExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Seres Vivos', en: 'Living Things', ca: 'Éssers Vius' }}
      emoji="🌱"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/biologia/seres-vivos"
      gameId="seres-vivos"
    />
  )
}
