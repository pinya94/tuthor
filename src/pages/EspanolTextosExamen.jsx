import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/espanolTextos'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO', en: 'Secondary', ca: 'ESO' }, pool: () => PREGUNTAS_ESO },
}

export default function EspanolTextosExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Los Textos', en: 'Types of Text', ca: 'Els Textos' }}
      emoji="📝"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/idiomas/espanol"
      gameId="espanol-textos-test"
    />
  )
}
