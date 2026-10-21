import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaCiencia'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaCienciaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Historia de la ciencia', en: 'History of Science', ca: 'Història de la ciència' }}
      emoji="🔬"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/ciencia"
      gameId="historia-ciencia"
    />
  )
}
