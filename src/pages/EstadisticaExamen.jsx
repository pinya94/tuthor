import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/estadistica'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EstadisticaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Estadística y Probabilidad', en: 'Statistics and Probability', ca: 'Estadística i Probabilitat' }}
      emoji="📊"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/matematicas/estadistica"
      gameId="estadistica"
    />
  )
}
