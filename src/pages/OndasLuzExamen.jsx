import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/ondasLuz'

const nivelInfo = {
  primaria: {
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    pool: () => PREGUNTAS_PRIMARIA,
  },
  eso: {
    label: { es: 'ESO', en: 'Secondary', ca: 'ESO' },
    pool: () => PREGUNTAS_ESO,
  },
}

export default function OndasLuzExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Ondas y Luz', en: 'Waves and Light', ca: 'Ones i Llum' }}
      emoji="🌊"
      nivelInfo={nivelInfo}
      backFallback="/estudiar/quimica/ondas-luz"
      gameId="ondas-luz"
    />
  )
}
