import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/energia'

const nivelInfo = {
  primaria: {
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    pool: () => PREGUNTAS_PRIMARIA,
  },
  eso: {
    label: { es: 'ESO', en: 'Secondary', ca: 'ESO' },
    pool: () => PREGUNTAS_ESO,
  },
}

export default function EnergiaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Energía', en: 'Energy', ca: 'Energia' }}
      emoji="🔋"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/fisica/energia"
      gameId="energia"
    />
  )
}
