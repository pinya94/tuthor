import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/placasTectonicas'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function PlacasTectonicasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Placas Tectónicas', en: 'Tectonic Plates', ca: 'Plaques Tectòniques' }}
      emoji="🌋"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/geologia/placas-tectonicas"
      gameId="placas-tectonicas"
    />
  )
}
