import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaEspanaXIX'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaEspanaXIXExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'España en el siglo XIX', en: 'Spain in the 19th Century', ca: 'Espanya al segle XIX' }}
      emoji="🎩"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/espana-xix"
      gameId="espana-xix"
    />
  )
}
