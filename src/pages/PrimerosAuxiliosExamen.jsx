import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ATRAGANTAMIENTO } from '../data/primerosAuxilios'

const nivelInfo = {
  atragantamiento: {
    label: { es: 'Atragantamiento', en: 'Choking', ca: 'Ennuegament' },
    pool: () => PREGUNTAS_ATRAGANTAMIENTO,
  },
  // TODO: más niveles cuando haya contenido (quemadura, desmayo, corte, picadura)
}

export default function PrimerosAuxiliosExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Primeros Auxilios', en: 'First Aid', ca: 'Primers Auxilis' }}
      emoji="🚑"
      nivelInfo={nivelInfo}
      backFallback="/juegos"
      gameId="primeros-auxilios"
    />
  )
}
