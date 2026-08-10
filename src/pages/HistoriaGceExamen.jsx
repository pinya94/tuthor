import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaGce'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaGceExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Guerra Civil Española', en: 'Spanish Civil War', ca: 'Guerra Civil Espanyola' }}
      emoji="⚔️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/gce"
      gameId="gce"
    />
  )
}
