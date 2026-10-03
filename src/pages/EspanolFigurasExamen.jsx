import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/espanolFiguras'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function EspanolFigurasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Figuras Literarias', en: 'Figures of Speech', ca: 'Figures Literàries' }}
      emoji="🎭"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/idiomas/espanol"
      gameId="espanol-figuras-test"
    />
  )
}
