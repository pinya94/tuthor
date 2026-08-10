import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaFranquismo'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaFranquismoExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Franquismo y Transición', en: 'Francoism & Transition', ca: 'Franquisme i Transició' }}
      emoji="🕊️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/franquismo"
      gameId="franquismo"
    />
  )
}
