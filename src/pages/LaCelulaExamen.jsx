import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO } from '../data/celula'

const NIVEL_INFO = {
  eso: { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function LaCelulaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'La Célula', en: 'The Cell', ca: 'La Cèl·lula' }}
      emoji="🔬"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/biologia/celula"
      gameId="celula"
    />
  )
}
