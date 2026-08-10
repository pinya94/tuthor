import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA } from '../data/historiaHitos'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
}

export default function HistoriaHitosExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Grandes Hitos de la Historia', en: 'Great Milestones of History', ca: 'Grans Fites de la Història' }}
      emoji="🌍"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/historia/primaria"
      gameId="primaria"
    />
  )
}
