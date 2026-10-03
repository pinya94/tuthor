import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/maquinas'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function MaquinasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Máquinas y Mecanismos', en: 'Machines and Mechanisms', ca: 'Màquines i Mecanismes' }}
      emoji="⚙️"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/fisica/maquinas"
      gameId="maquinas"
    />
  )
}
