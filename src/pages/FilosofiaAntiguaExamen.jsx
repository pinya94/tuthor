import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACH } from '../data/filosofiaAntigua'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACH },
}

export default function FilosofiaAntiguaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Filosofía antigua y medieval', en: 'Ancient and Medieval Philosophy', ca: 'Filosofia antiga i medieval' }}
      emoji="🏛️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/filosofia"
      gameId="filosofia-antigua"
    />
  )
}
