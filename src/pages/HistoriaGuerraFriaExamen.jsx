import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaGuerraFria'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaGuerraFriaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Guerra Fría', en: 'The Cold War', ca: 'Guerra Freda' }}
      emoji="🚀"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/guerra-fria"
      gameId="guerra-fria"
    />
  )
}
