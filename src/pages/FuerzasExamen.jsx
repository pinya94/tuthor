import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/fuerzas'

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

export default function FuerzasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Fuerzas y Movimiento', en: 'Forces and Motion', ca: 'Forces i Moviment' }}
      emoji="⚡"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/fisica/fuerzas"
      gameId="fuerzas"
    />
  )
}
