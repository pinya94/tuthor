import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/electricidad'

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

export default function ElectricidadExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Electricidad', en: 'Electricity', ca: 'Electricitat' }}
      emoji="💡"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/fisica/electricidad"
      gameId="electricidad"
    />
  )
}
