import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/quimicaOrganica'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function QuimicaOrganicaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Química Orgánica', en: 'Organic Chemistry', ca: 'Química Orgànica' }}
      emoji="⛽"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/quimica-organica"
      gameId="quimica-organica"
    />
  )
}
