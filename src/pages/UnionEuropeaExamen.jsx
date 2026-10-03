import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/unionEuropea'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function UnionEuropeaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'La Unión Europea', en: 'The European Union', ca: 'La Unió Europea' }}
      emoji="⭐"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/geografia"
      gameId="geografia-ue-test"
    />
  )
}
