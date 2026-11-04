import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/representacionTierra'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function RepresentacionTierraExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'La representación de la Tierra', en: 'Representing the Earth', ca: 'La representació de la Terra' }}
      emoji="🧭"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/geografia"
      gameId="geografia-representacion-test"
    />
  )
}
