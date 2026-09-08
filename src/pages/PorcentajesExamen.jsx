import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/porcentajes'

const nivelInfo = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function PorcentajesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Proporcionalidad y Porcentajes', en: 'Proportion and Percentages', ca: 'Proporcionalitat i Percentatges' }}
      emoji="💯"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/matematicas"
      gameId="porcentajes"
    />
  )
}
