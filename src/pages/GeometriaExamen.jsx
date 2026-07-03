import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/geometria'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function GeometriaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Geometría', en: 'Geometry', ca: 'Geometria' }}
      emoji="📐"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/matematicas/geometria"
      gameId="geometria"
    />
  )
}
