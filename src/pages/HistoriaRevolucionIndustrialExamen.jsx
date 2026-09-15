import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaRevolucionIndustrial'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaRevolucionIndustrialExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Revolución Industrial', en: 'The Industrial Revolution', ca: 'Revolució Industrial' }}
      emoji="🏭"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/revolucion-industrial"
      gameId="revolucion-industrial"
    />
  )
}
