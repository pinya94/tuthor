import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/balanzaExamen'

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

export default function BalanzaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Palancas y Momentos', en: 'Levers & Moments', ca: 'Palanques i Moments' }}
      emoji="⚖️"
      nivelInfo={nivelInfo}
      backFallback="/juegos/balanza"
      gameId="balanza-test"
    />
  )
}
