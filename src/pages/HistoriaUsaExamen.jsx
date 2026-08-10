import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_BACHILLERATO } from '../data/historiaUsa'

const NIVEL_INFO = {
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaUsaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Independencia Americana', en: 'American Independence', ca: 'Independència Americana' }}
      emoji="🦅"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/usa"
      gameId="usa"
    />
  )
}
