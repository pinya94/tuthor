import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/movimiento'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function MovimientoExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'El Movimiento', en: 'Motion', ca: 'El Moviment' }}
      emoji="🏎️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/fisica/movimiento"
      gameId="movimiento"
    />
  )
}
