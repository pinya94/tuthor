import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_ESO, PREGUNTAS_BACHILLERATO } from '../data/historiaRevolucionFrancesa'

const NIVEL_INFO = {
  eso:          { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
  bachillerato: { label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, pool: () => PREGUNTAS_BACHILLERATO },
}

export default function HistoriaRevolucionFrancesaExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Revolución Francesa y Napoleón', en: 'The French Revolution and Napoleon', ca: 'Revolució Francesa i Napoleó' }}
      emoji="⚜️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/revolucion-francesa"
      gameId="revolucion-francesa"
    />
  )
}
