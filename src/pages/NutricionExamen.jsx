import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/nutricion'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function NutricionExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Nutrición', en: 'Nutrition', ca: 'Nutrició' }}
      emoji="🥗"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/biologia/nutricion"
      gameId="nutricion"
    />
  )
}
