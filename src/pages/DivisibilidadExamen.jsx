import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/divisibilidad'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function DivisibilidadExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Divisibilidad', en: 'Divisibility', ca: 'Divisibilitat' }}
      emoji="🌳"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/matematicas"
      gameId="divisibilidad"
    />
  )
}
