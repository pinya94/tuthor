import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaRoma'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaRomaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Antigua Roma', en: 'Ancient Rome', ca: 'Antiga Roma' }}
      emoji="🏛️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/roma"
      gameId="roma"
    />
  )
}
