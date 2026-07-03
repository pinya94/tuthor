import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/algebra'

const nivelInfo = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function AlgebraExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Álgebra', en: 'Algebra', ca: 'Àlgebra' }}
      emoji="🔣"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/matematicas/algebra"
      gameId="algebra"
    />
  )
}
