import ExamenMC from '../components/ExamenMC'
import { PREGUNTAS_PRIMARIA, PREGUNTAS_ESO } from '../data/mezclasMateria'

const NIVEL_INFO = {
  primaria: { label: { es: 'Primaria', en: 'Primary',   ca: 'Primària' }, pool: () => PREGUNTAS_PRIMARIA },
  eso:      { label: { es: 'ESO',      en: 'Secondary', ca: 'ESO'      }, pool: () => PREGUNTAS_ESO      },
}

export default function MezclasExamen() {
  return (
    <ExamenMC
      titulo={{ es: 'Mezclas y Separación', en: 'Mixtures & Separation', ca: 'Mescles i Separació' }}
      emoji="🔀"
      nivelInfo={NIVEL_INFO}
      backFallback="/estudiar/quimica/mezclas-separacion"
      gameId="mezclas-separacion"
    />
  )
}
