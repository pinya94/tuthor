import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/constitucion'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function ConstitucionExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'La Constitución y el Estado', en: 'The Constitution and the State', ca: 'La Constitució i l’Estat' }}
      emoji="📜"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/geografia"
      gameId="geografia-constitucion-test"
    />
  )
}
