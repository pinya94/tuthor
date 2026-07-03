import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/cuerpoHumano'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function CuerpoHumanoExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Cuerpo Humano', en: 'Human Body', ca: 'Cos Humà' }}
      emoji="🫀"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica"
      gameId="cuerpo-humano"
    />
  )
}
