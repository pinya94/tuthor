import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaWwii'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaWwiiExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Segunda Guerra Mundial', en: 'World War II', ca: 'Segona Guerra Mundial' }}
      emoji="⚔️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/wwii"
      gameId="wwii"
    />
  )
}
