import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/evolucion'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function EvolucionExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Evolución', en: 'Evolution', ca: 'Evolució' }}
      emoji="🧬"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/biologia/evolucion"
      gameId="evolucion"
    />
  )
}
