import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/gramaticaIngles'

const nivelInfo = {
  primaria: { label: { es: 'Primary', en: 'Primary', ca: 'Primary' }, pool: () => PREGUNTAS_PRIMARIA },
  eso: { label: { es: 'Secondary', en: 'Secondary', ca: 'Secondary' }, pool: () => PREGUNTAS_ESO },
}

export default function InglesExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'English Grammar', en: 'English Grammar', ca: 'English Grammar' }}
      emoji="🇬🇧"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/idiomas/ingles"
      gameId="ingles"
    />
  )
}
