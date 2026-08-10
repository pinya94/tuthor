import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/rocasMinerales'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function RocasMineralesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Rocas y Minerales', en: 'Rocks & Minerals', ca: 'Roques i Minerals' }}
      emoji="⛰️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/geologia/rocas-minerales"
      gameId="rocas-minerales"
    />
  )
}
