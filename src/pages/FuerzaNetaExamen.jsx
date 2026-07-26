import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/fuerzaNetaExamen'

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

export default function FuerzaNetaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Fuerza Neta', en: 'Net Force', ca: 'Força Neta' }}
      emoji="🧭"
      nivelInfo={nivelInfo}
      backFallback="/juegos/fuerza-neta"
      gameId="fuerza-neta-test"
    />
  )
}
